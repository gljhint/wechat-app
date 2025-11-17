<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\LiveStream;
use App\Models\WechatUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use App\Services\CloudflareRealtimeService;

/**
 * 直播控制器 - 基于 Cloudflare RealtimeKit
 *
 * 核心理念:
 * - RealtimeKit SDK 自动处理: 音视频、聊天、参与者管理
 * - 后端只负责: 创建 Meeting、生成 Token、管理直播状态
 */
class LiveController extends Controller
{
    protected $realtimeService;

    public function __construct(CloudflareRealtimeService $realtimeService)
    {
        $this->realtimeService = $realtimeService;
    }

    /**
     * 直播列表页面 - 固定会议室模式
     * 显示所有会议室，根据status区分直播中/空闲
     */
    public function index(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        $user = WechatUser::find($userId);

        // 获取所有会议室,并过滤用户有权限查看的
        $allRooms = LiveStream::orderBy('id')->get()->filter(function($room) use ($user) {
            return $room->isVisibleToUser($user);
        });

        return view('wechat.live.index', compact('allRooms'));
    }

    /**
     * 进入直播室 - 固定直播室模式
     *
     * 逻辑:
     * - 用户进入直播室,自动判断角色
     */
    public function show(Request $request, $roomId)
    {
        $userId = Session::get('wechat_user_id');
        $user = WechatUser::find($userId);
        $stream = LiveStream::find($roomId);

        if (!$stream) {
            return redirect()->route('wechat.live.index')->with('error', '直播室不存在');
        }

        // 检查可见性权限
        if (!$stream->isVisibleToUser($user)) {
            return redirect()->route('wechat.live.index')->with('error', '您没有权限访问该直播室');
        }

        if (!$stream->rtk_meeting_id) {
            return redirect()->route('wechat.live.index')->with('error', '直播室未配置,请联系管理员');
        }

        try {
            $participantData = $this->realtimeService->addParticipant($stream->rtk_meeting_id, [
                'preset_name' => $user->role == 'admin'? 'group_call_host':'group_call_participant',
                'name' => $user->real_name ?? $user->nickname,
                'picture' => $user->avatar_url ?? null,
                'custom_participant_id' => (string)$userId,
            ]);

            if (!$participantData || !isset($participantData['token'])) {
                return redirect()->route('wechat.live.index')->with('error', '无法加入直播');
            }

            $authToken = $participantData['token'];

            return view('wechat.live.show', compact('stream', 'authToken'));

        } catch (\Exception $e) {
            Log::error('生成观众 Token 失败: ' . $e->getMessage());
            return redirect()->route('wechat.live.index')->with('error', '无法加入直播');
        }
    }

    /**
     * 生成观众 Token
     */
    public function getViewerToken(Request $request, $streamId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json(['code' => 401, 'message' => '未登录'], 401);
        }

        $user = WechatUser::find($userId);
        $stream = LiveStream::find($streamId);

        if (!$stream) {
            return response()->json(['code' => 404, 'message' => '直播不存在'], 404);
        }

        // 检查可见性权限
        if (!$stream->isVisibleToUser($user)) {
            return response()->json(['code' => 403, 'message' => '您没有权限访问该直播室'], 403);
        }

        if (!$stream->rtk_meeting_id) {
            return response()->json(['code' => 400, 'message' => 'Meeting 未创建'], 400);
        }

        if (!$stream->isLive()) {
            return response()->json(['code' => 400, 'message' => '直播尚未开始'], 400);
        }

        try {

            $participantData = $this->realtimeService->addParticipant($stream->rtk_meeting_id, [
                'preset_name' => 'group_call_viewer',
                'name' => $user->nickname ?? '观众',
                'picture' => $user->avatar ?? null,
                'custom_participant_id' => (string)$userId,
            ]);

            if (!$participantData || !isset($participantData['token'])) {
                return response()->json(['code' => 500, 'message' => '生成 Token 失败'], 500);
            }

            return response()->json([
                'code' => 200,
                'data' => [
                    'token' => $participantData['token'],
                    'meeting_id' => $stream->rtk_meeting_id,
                    'participant_id' => $participantData['id'],
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('生成观众 Token 失败: ' . $e->getMessage());
            return response()->json(['code' => 500, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * 结束直播 - 固定直播室模式
     *
     * 注意:
     * - 不再删除 Meeting(Meeting 永久存在)
     * - 只更新直播室状态为 ended
     * - 下次可以重新进入同一个直播室
     */
    public function endLive(Request $request, $roomId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json(['code' => 401, 'message' => '未登录'], 401);
        }

        $room = LiveStream::find($roomId);

        if (!$room) {
            return response()->json(['code' => 404, 'message' => '直播室不存在'], 404);
        }

        // 只有当前主播或管理员可以结束直播
        $user = WechatUser::find($userId);
        if ($room->streamer_id !== $userId && !$user->isAdmin()) {
            return response()->json(['code' => 403, 'message' => '无权操作'], 403);
        }

        try {
            // 注意:不再调用 endMeeting(),Meeting 保持存在
            // 只更新数据库状态
            $room->endLive();

            return response()->json([
                'code' => 200,
                'message' => '直播已结束'
            ]);

        } catch (\Exception $e) {
            Log::error('结束直播失败: ' . $e->getMessage(), ['room_id' => $roomId]);
            return response()->json(['code' => 500, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * 获取所有直播间的实时状态 (批量)
     * 只返回用户有权限查看的直播室
     */
    public function getAllStats(Request $request)
    {
        try {
            $userId = Session::get('wechat_user_id');
            $user = WechatUser::find($userId);

            // 获取用户有权限查看的直播室
            $allRooms = LiveStream::orderBy('id')->get()->filter(function($room) use ($user) {
                return $room->isVisibleToUser($user);
            });
            $stats = [];

            foreach ($allRooms as $room) {
                $viewerCount = 0;
                $isLive = false;

                // 只有当直播间有 meeting_id 且状态是 live 时才查询实时状态
                if ($room->rtk_meeting_id && $room->status === LiveStream::STATUS_LIVE) {
                    try {
                        // 使用 active-session API 获取实时在线人数
                        $sessionData = $this->realtimeService->getActiveSession($room->rtk_meeting_id);

                        if ($sessionData && isset($sessionData['live_participants'])) {
                            $viewerCount = $sessionData['live_participants']; // 实时在线人数
                            $isLive = $viewerCount > 0; // 有人就算直播中
                        }
                    } catch (\Exception $e) {
                        Log::warning('获取房间实时状态失败: ' . $e->getMessage(), ['room_id' => $room->id]);
                    }
                }

                $stats[] = [
                    'id' => $room->id,
                    'status' => $isLive ? 'live' : 'idle',
                    'viewer_count' => $viewerCount,
                    'title' => $room->title,
                ];
            }
            return response()->json([
                'code' => 200,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            Log::error('获取所有直播间状态失败: ' . $e->getMessage());
            return response()->json(['code' => 500, 'message' => '获取失败'], 500);
        }
    }

    /**
     * 获取直播统计 (实时从 RealtimeKit 获取)
     */
    public function getStats(Request $request, $streamId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json(['code' => 401, 'message' => '未登录'], 401);
        }

        $user = WechatUser::find($userId);
        $stream = LiveStream::find($streamId);

        if (!$stream) {
            return response()->json(['code' => 404, 'message' => '直播不存在'], 404);
        }

        // 检查可见性权限
        if (!$stream->isVisibleToUser($user)) {
            return response()->json(['code' => 403, 'message' => '您没有权限访问该直播室'], 403);
        }

        try {
            // 从 RealtimeKit 获取实时参与者
            $participantsData = $this->realtimeService->getParticipants($stream->rtk_meeting_id);

            $participants = $participantsData['data'] ?? [];
            $totalCount = $participantsData['paging']['total_count'] ?? count($participants);

            $stats = [
                'status' => $stream->status,
                'viewer_count' => $totalCount, // 实时在线人数
                'started_at' => $stream->started_at?->toISOString(),
                'duration' => $stream->started_at ? now()->diffInSeconds($stream->started_at) : 0,
                'participants' => array_map(function($p) {
                    return [
                        'name' => $p['name'] ?? '匿名',
                        'picture' => $p['picture'] ?? null,
                    ];
                }, $participants),
            ];

            return response()->json([
                'code' => 200,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            Log::error('获取直播统计失败: ' . $e->getMessage());
            return response()->json(['code' => 500, 'message' => '获取失败'], 500);
        }
    }
}