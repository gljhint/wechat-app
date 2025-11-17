<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LiveStream;
use App\Services\CloudflareRealtimeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class LiveController extends Controller
{
    protected $realtimeService;

    public function __construct(CloudflareRealtimeService $realtimeService)
    {
        $this->realtimeService = $realtimeService;
    }

    /**
     * 直播室列表（固定房间管理）
     *
     * 注意：状态判断逻辑
     * - 不依赖数据库的 status 字段
     * - 通过 RealtimeKit getActiveSession() 获取实时在线人数
     * - 有人(live_participants > 0) = 使用中
     * - 无人(live_participants = 0 或无 session) = 空闲
     */
    public function index(Request $request)
    {
        $query = LiveStream::query();

        // 搜索过滤
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 排序
        $sortBy = $request->get('sort_by', 'id');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $rooms = $query->get();

        // 统计数据 - 基于实时在线人数判断
        $liveCount = 0;
        foreach ($rooms as $room) {
            if ($room->rtk_meeting_id) {
                try {
                    $sessionData = $this->realtimeService->getActiveSession($room->rtk_meeting_id);
                    if ($sessionData && isset($sessionData['live_participants']) && $sessionData['live_participants'] > 0) {
                        $liveCount++;
                        // 临时存储实时在线人数，供视图使用
                        $room->current_viewer_count = $sessionData['live_participants'];
                    } else {
                        $room->current_viewer_count = 0;
                    }
                } catch (\Exception $e) {
                    Log::warning('获取房间实时状态失败: ' . $e->getMessage(), ['room_id' => $room->id]);
                    $room->current_viewer_count = 0;
                }
            } else {
                $room->current_viewer_count = 0;
            }
        }

        $stats = [
            'total' => $rooms->count(),
            'live' => $liveCount,
            'idle' => $rooms->count() - $liveCount,
        ];

        return view('admin.live.index', compact('rooms', 'stats'));
    }
    
    /**
     * 显示直播室详情
     */
    public function show($id)
    {
        $room = LiveStream::findOrFail($id);
        return view('admin.live.show', compact('room'));
    }
    
    /**
     * 创建直播室
     */
    public function create()
    {
        return view('admin.live.create');
    }
    
    /**
     * 保存直播室
     *
     * 注意：
     * - 管理端创建固定直播室时，同步创建 RealtimeKit Meeting
     * - Meeting 与直播室绑定，微信端用户直接使用固定的 Meeting ID
     * - 只存储基础信息：title, description, cover_image, is_public, visible_roles
     * - streamer_id 在微信端开播时设置
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
            'cover_image' => 'nullable|image|max:2048',
            'is_public' => 'boolean',
            'visible_roles' => 'nullable|array',
            'visible_roles.*' => 'string|in:admin,ministry,member,pre_member,seeker,external',
        ]);

        try {
            // 1. 先创建 RealtimeKit Meeting
            $meetingData = $this->realtimeService->createMeeting([
                'title' => $request->title,
                'preferred_region' => 'ap-south-1', // 亚太区域
            ]);

            if (!$meetingData || !isset($meetingData['id'])) {
                return back()->withInput()
                    ->with('error', '创建 RealtimeKit Meeting 失败，请重试');
            }

            // 2. 创建直播室记录
            $data = [
                'title' => $request->title,
                'is_public' => $request->boolean('is_public', true),
                'status' => LiveStream::STATUS_SCHEDULED, // 默认空闲状态
                'streamer_id' => null, // 初始为空，实际开播时会更新为真实主播
                'rtk_meeting_id' => $meetingData['id'], // 固定的 Meeting ID
            ];

            // 可选字段
            if ($request->filled('description')) {
                $data['description'] = $request->description;
            }

            if ($request->hasFile('cover_image')) {
                $path = $request->file('cover_image')->store('live/covers', 'public');
                $data['cover_image'] = $path;
            }

            // 处理可见角色：空数组或未选择 = null（所有人可见）
            if (!$request->has('visible_roles') || empty($request->visible_roles)) {
                $data['visible_roles'] = null;
            } else {
                $data['visible_roles'] = $request->visible_roles;
            }

            LiveStream::create($data);

            return redirect()->route('admin.live.index')
                ->with('success', '直播室创建成功');

        } catch (\Exception $e) {
            Log::error('创建直播室失败: ' . $e->getMessage());
            return back()->withInput()
                ->with('error', '创建失败: ' . $e->getMessage());
        }
    }
    
    /**
     * 编辑直播室
     */
    public function edit($id)
    {
        $room = LiveStream::findOrFail($id);
        return view('admin.live.edit', compact('room'));
    }
    
    /**
     * 更新直播室
     *
     * 注意：
     * - 只允许修改基础信息（title, description, cover_image, is_public, visible_roles）
     * - 不允许修改 Meeting 相关字段（rtk_meeting_id, status, started_at, ended_at 等）
     * - Meeting 字段由微信端自动管理
     */
    public function update(Request $request, $id)
    {
        $room = LiveStream::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
            'cover_image' => 'nullable|image|max:2048',
            'is_public' => 'boolean',
            'visible_roles' => 'nullable|array',
            'visible_roles.*' => 'string|in:admin,ministry,member,pre_member,seeker,external',
        ]);

        $data = [
            'title' => $request->title,
            'is_public' => $request->boolean('is_public', true),
        ];

        // 可选字段
        if ($request->filled('description')) {
            $data['description'] = $request->description;
        } else {
            $data['description'] = null;
        }

        // 处理封面图片上传
        if ($request->hasFile('cover_image')) {
            // 删除旧图片
            if ($room->cover_image) {
                Storage::disk('public')->delete($room->cover_image);
            }

            $data['cover_image'] = $request->file('cover_image')
                ->store('live/covers', 'public');
        }

        // 处理可见角色：空数组或未选择 = null（所有人可见）
        if (!$request->has('visible_roles') || empty($request->visible_roles)) {
            $data['visible_roles'] = null;
        } else {
            $data['visible_roles'] = $request->visible_roles;
        }

        $room->update($data);

        return redirect()->route('admin.live.index')
            ->with('success', '直播室更新成功');
    }
    
    /**
     * 删除直播室
     *
     * 注意：
     * - 需检查实时在线人数，禁止删除使用中的直播室
     * - 删除直播室时，同步删除 RealtimeKit Meeting
     */
    public function destroy($id)
    {
        $room = LiveStream::findOrFail($id);

        // 检查是否有人在线
        $isLive = false;
        if ($room->rtk_meeting_id) {
            try {
                $sessionData = $this->realtimeService->getActiveSession($room->rtk_meeting_id);
                if ($sessionData && isset($sessionData['live_participants']) && $sessionData['live_participants'] > 0) {
                    $isLive = true;
                }
            } catch (\Exception $e) {
                Log::warning('检查房间状态失败: ' . $e->getMessage(), ['room_id' => $room->id]);
            }
        }

        if ($isLive) {
            return back()->with('error', '直播室正在使用中，无法删除');
        }

        try {
            // 删除 RealtimeKit Meeting
            if ($room->rtk_meeting_id) {
                try {
                    $this->realtimeService->endMeeting($room->rtk_meeting_id);
                    Log::info('删除直播室时结束 Meeting', ['room_id' => $room->id, 'meeting_id' => $room->rtk_meeting_id]);
                } catch (\Exception $e) {
                    Log::warning('删除 Meeting 失败，继续删除直播室: ' . $e->getMessage(), ['room_id' => $room->id]);
                    // 即使 Meeting 删除失败，也继续删除直播室记录
                }
            }

            // 删除封面图片
            if ($room->cover_image) {
                Storage::disk('public')->delete($room->cover_image);
            }

            $room->delete();

            return redirect()->route('admin.live.index')
                ->with('success', '直播室删除成功');

        } catch (\Exception $e) {
            Log::error('删除直播室失败: ' . $e->getMessage(), ['room_id' => $room->id]);
            return back()->with('error', '删除失败: ' . $e->getMessage());
        }
    }


    /**
     * 强制结束直播（管理员操作）
     *
     * 注意：检查实时在线人数，确认有人在线才允许强制结束
     */
    public function forceEnd($id)
    {
        $room = LiveStream::findOrFail($id);

        // 检查是否有 Meeting ID
        if (!$room->rtk_meeting_id) {
            return back()->with('error', '该直播室尚未开启会议');
        }

        // 检查是否有人在线
        $isLive = false;
        try {
            $sessionData = $this->realtimeService->getActiveSession($room->rtk_meeting_id);
            if ($sessionData && isset($sessionData['live_participants']) && $sessionData['live_participants'] > 0) {
                $isLive = true;
            }
        } catch (\Exception $e) {
            Log::error('检查房间状态失败: ' . $e->getMessage(), ['room_id' => $room->id]);
            return back()->with('error', '无法获取直播室状态');
        }

        if (!$isLive) {
            return back()->with('error', '该直播室当前无人在线');
        }

        // 结束 Meeting
        try {
            $this->realtimeService->endMeeting($room->rtk_meeting_id);
            $room->endLive();
            return back()->with('success', '直播已强制结束');
        } catch (\Exception $e) {
            Log::error('强制结束直播失败: ' . $e->getMessage(), ['room_id' => $room->id]);
            return back()->with('error', '强制结束失败: ' . $e->getMessage());
        }
    }
}