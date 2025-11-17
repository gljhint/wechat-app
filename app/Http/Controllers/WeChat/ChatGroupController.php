<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\ChatGroup;
use App\Models\ChatGroupMember;
use App\Models\ChatGroupAnnouncement;
use App\Models\ChatMessage;
use App\Models\WechatUser;
use App\Http\Resources\ChatMessageResource;
use App\Services\GroupAvatarService;
use App\Jobs\GenerateGroupAvatarJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ChatGroupController extends Controller
{
    /**
     * 创建群组
     */
    public function createGroup(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'name' => 'required|string|max:50',
            'avatar' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500',
            'member_ids' => 'required|array|min:1',
            'member_ids.*' => 'exists:wechat_users,id',
        ]);

        try {
            DB::beginTransaction();

            // 创建群组
            $group = ChatGroup::create([
                'name' => $request->name,
                'avatar' => $request->avatar,
                'description' => $request->description,
                'owner_id' => $userId,
                'member_count' => count($request->member_ids) + 1, // 包括群主
                'status' => ChatGroup::STATUS_ACTIVE,
            ]);

            // 添加群主
            ChatGroupMember::create([
                'group_id' => $group->id,
                'user_id' => $userId,
                'role' => ChatGroupMember::ROLE_OWNER,
                'joined_at' => now(),
            ]);

            // 添加成员
            foreach ($request->member_ids as $memberId) {
                if ($memberId != $userId) {
                    ChatGroupMember::create([
                        'group_id' => $group->id,
                        'user_id' => $memberId,
                        'role' => ChatGroupMember::ROLE_MEMBER,
                        'joined_at' => now(),
                    ]);
                }
            }

            DB::commit();

            $group->load(['owner', 'members.user']);

            // 异步生成群头像(不阻塞用户) - 后台进程执行
            $this->generateAvatarAsync($group->id);

            return response()->json([
                'code' => 200,
                'message' => '创建成功',
                'data' => $group->fresh(['owner', 'members.user'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('创建群组失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '创建失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取群组列表
     */
    public function getGroups(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        // 获取用户加入的所有群组
        $groups = ChatGroup::whereHas('members', function($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->where('status', ChatGroup::STATUS_ACTIVE)
                ->with(['owner', 'lastMessage.fromUser'])
                ->get();

        // 添加未读消息数并转换lastMessage为Resource
        foreach ($groups as $group) {
            // 转换lastMessage为ChatMessageResource(自动解密)
            if ($group->lastMessage) {
                $group->last_message = new ChatMessageResource($group->lastMessage);
            } else {
                $group->last_message = null;
            }

            // 移除原始的lastMessage关联(避免返回加密数据)
            unset($group->lastMessage);

            // 获取未读消息数
            $group->unread_count = ChatMessage::where('group_id', $group->id)
                ->where('from_user_id', '!=', $userId)
                ->where('is_read', 0)
                ->count();
        }

        // 按最后消息时间排序
        $groups = $groups->sortByDesc(function($group) {
            return $group->last_message ? $group->last_message->created_at : $group->created_at;
        })->values();

        return response()->json([
            'code' => 200,
            'data' => $groups
        ]);
    }

    /**
     * 获取群组详情
     */
    public function getGroupDetail(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $group = ChatGroup::with(['owner', 'members.user'])
                         ->find($groupId);

        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 检查是否是群成员
        $isMember = $group->members->contains('user_id', $userId);
        if (!$isMember) {
            return response()->json([
                'code' => 403,
                'message' => '您不是该群成员'
            ], 403);
        }

        return response()->json([
            'code' => 200,
            'data' => $group
        ]);
    }

    /**
     * 发送群消息
     */
    public function sendGroupMessage(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'group_id' => 'required|exists:chat_groups,id',
            'content' => 'nullable|string|max:1000',
            'message_type' => 'in:1,2,3,4,5',
            'media_url' => 'nullable|string',
            'media_type' => 'nullable|string',
            'media_size' => 'nullable|integer',
            'original_filename' => 'nullable|string',
        ]);

        // 检查是否是群成员
        $member = ChatGroupMember::where('group_id', $request->group_id)
                                ->where('user_id', $userId)
                                ->first();

        if (!$member) {
            return response()->json([
                'code' => 403,
                'message' => '您不是该群成员'
            ], 403);
        }

        // 检查是否被禁言
        if ($member->mute) {
            return response()->json([
                'code' => 403,
                'message' => '您已被禁言'
            ], 403);
        }

        try {
            $message = ChatMessage::create([
                'from_user_id' => $userId,
                'to_user_id' => null, // 群消息没有接收者
                'group_id' => $request->group_id,
                'content' => $request->content,
                'message_type' => $request->message_type ?? 1,
                'media_url' => $request->media_url,
                'media_type' => $request->media_type,
                'media_size' => $request->media_size,
                'original_filename' => $request->original_filename,
                'is_read' => 0,
            ]);

            $message->load(['fromUser', 'group']);

            return response()->json([
                'code' => 200,
                'message' => '发送成功',
                'data' => new ChatMessageResource($message)
            ]);

        } catch (\Exception $e) {
            Log::error('发送群消息失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '发送失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取群消息历史
     */
    public function getGroupMessages(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        // 检查是否是群成员
        $isMember = ChatGroupMember::where('group_id', $groupId)
                                   ->where('user_id', $userId)
                                   ->exists();

        if (!$isMember) {
            return response()->json([
                'code' => 403,
                'message' => '您不是该群成员'
            ], 403);
        }

        // 标记该群所有消息为已读(当用户打开群聊时)
        // 注意: 群聊的is_read字段是简化设计,只要有人读过就标记为已读
        if (!$request->has('after_id')) {
            // 只在首次加载时标记已读,轮询时不标记
            ChatMessage::where('group_id', $groupId)
                ->where('from_user_id', '!=', $userId)
                ->where('is_read', 0)
                ->update([
                    'is_read' => 1,
                    'read_at' => now()
                ]);
        }

        $request->validate([
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:100',
            'after_id' => 'nullable|integer|min:0',
        ]);

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        $offset = ($page - 1) * $limit;
        $afterId = $request->get('after_id');

        $query = ChatMessage::with(['fromUser'])
            ->where('group_id', $groupId);

        if ($afterId) {
            $query->where('id', '>', $afterId);
            $messages = $query->orderBy('created_at')
                ->limit($limit)
                ->get()
                ->values();

            $lastMessage = $messages->last();

            return response()->json([
                'code' => 200,
                'data' => [
                    'messages' => ChatMessageResource::collection($messages),
                    'pagination' => [
                        'page' => 1,
                        'limit' => $limit,
                        'has_more' => $messages->count() === $limit,
                        'latest_id' => $lastMessage ? $lastMessage->id : $afterId,
                    ]
                ]
            ]);
        }

        $messages = $query->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get()
            ->reverse()
            ->values();

        $lastMessage = $messages->last();

        return response()->json([
            'code' => 200,
            'data' => [
                'messages' => ChatMessageResource::collection($messages),
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'has_more' => $messages->count() === $limit,
                    'latest_id' => $lastMessage ? $lastMessage->id : null,
                ]
            ]
        ]);
    }

    /**
     * 邀请成员加入群组
     */
    public function inviteMembers(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'member_ids' => 'required|array|min:1',
            'member_ids.*' => 'exists:wechat_users,id',
        ]);

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 检查权限（群主或管理员）
        $member = ChatGroupMember::where('group_id', $groupId)
                                ->where('user_id', $userId)
                                ->first();

        if (!$member || !$member->hasAdminPermission()) {
            return response()->json([
                'code' => 403,
                'message' => '无权限'
            ], 403);
        }

        try {
            DB::beginTransaction();

            $addedCount = 0;
            foreach ($request->member_ids as $memberId) {
                // 检查是否已是成员
                $exists = ChatGroupMember::where('group_id', $groupId)
                                        ->where('user_id', $memberId)
                                        ->exists();

                if (!$exists) {
                    ChatGroupMember::create([
                        'group_id' => $groupId,
                        'user_id' => $memberId,
                        'role' => ChatGroupMember::ROLE_MEMBER,
                        'joined_at' => now(),
                    ]);
                    $addedCount++;
                }
            }

            // 更新成员数量
            $group->increment('member_count', $addedCount);

            DB::commit();

            // 如果成员数 <= 9,异步生成群头像
            if (GroupAvatarService::shouldRegenerate($group->fresh())) {
                $this->generateAvatarAsync($group->id);
            }

            return response()->json([
                'code' => 200,
                'message' => "成功邀请 {$addedCount} 名成员"
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('邀请成员失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '邀请失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 更新群组信息(仅群主)
     */
    public function updateGroup(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 只有群主可以修改群信息
        if ($group->owner_id != $userId) {
            return response()->json([
                'code' => 403,
                'message' => '只有群主可以修改群信息'
            ], 403);
        }

        $request->validate([
            'name' => 'nullable|string|max:50',
            'avatar' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500',
        ]);

        try {
            $updateData = [];

            if ($request->has('name')) {
                $updateData['name'] = $request->name;
            }

            if ($request->has('avatar')) {
                $updateData['avatar'] = $request->avatar;
            }

            if ($request->has('description')) {
                $updateData['description'] = $request->description;
            }

            if (empty($updateData)) {
                return response()->json([
                    'code' => 400,
                    'message' => '没有需要更新的内容'
                ], 400);
            }

            $group->update($updateData);
            $group->load(['owner', 'members.user']);

            return response()->json([
                'code' => 200,
                'message' => '更新成功',
                'data' => $group
            ]);

        } catch (\Exception $e) {
            Log::error('更新群组信息失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '更新失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 退出群组
     */
    public function leaveGroup(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 群主不能直接退出，需要先转让群主
        if ($group->owner_id == $userId) {
            return response()->json([
                'code' => 403,
                'message' => '群主需要先转让群主身份才能退出'
            ], 403);
        }

        $member = ChatGroupMember::where('group_id', $groupId)
                                ->where('user_id', $userId)
                                ->first();

        if (!$member) {
            return response()->json([
                'code' => 404,
                'message' => '您不是该群成员'
            ], 404);
        }

        try {
            DB::beginTransaction();

            $member->delete();
            $group->decrement('member_count');

            DB::commit();

            return response()->json([
                'code' => 200,
                'message' => '退出成功'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('退出群组失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '退出失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 移除群成员（群主或管理员）
     */
    public function removeMember(Request $request, $groupId, $memberId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 检查权限（群主或管理员）
        $operatorMember = ChatGroupMember::where('group_id', $groupId)
                                        ->where('user_id', $userId)
                                        ->first();

        if (!$operatorMember || !$operatorMember->hasAdminPermission()) {
            return response()->json([
                'code' => 403,
                'message' => '只有群主和管理员可以移除成员'
            ], 403);
        }

        $targetMemberId = $memberId;

        // 不能移除群主
        if ($group->owner_id == $targetMemberId) {
            return response()->json([
                'code' => 403,
                'message' => '不能移除群主'
            ], 403);
        }

        // 不能移除自己
        if ($targetMemberId == $userId) {
            return response()->json([
                'code' => 403,
                'message' => '不能移除自己，请使用退出群组功能'
            ], 403);
        }

        // 查找目标成员
        $targetMember = ChatGroupMember::where('group_id', $groupId)
                                      ->where('user_id', $targetMemberId)
                                      ->first();

        if (!$targetMember) {
            return response()->json([
                'code' => 404,
                'message' => '该用户不是群成员'
            ], 404);
        }

        // 管理员不能移除其他管理员或群主（只有群主可以）
        if ($operatorMember->role == ChatGroupMember::ROLE_ADMIN &&
            $targetMember->role >= ChatGroupMember::ROLE_ADMIN) {
            return response()->json([
                'code' => 403,
                'message' => '管理员不能移除其他管理员'
            ], 403);
        }

        try {
            DB::beginTransaction();

            $targetMember->delete();
            $group->decrement('member_count');

            DB::commit();

            // 如果成员数 <= 9,异步重新生成群头像
            if (GroupAvatarService::shouldRegenerate($group->fresh())) {
                $this->generateAvatarAsync($group->id);
            }

            return response()->json([
                'code' => 200,
                'message' => '移除成功'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('移除群成员失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '移除失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 解散群组（仅群主）
     */
    public function disbandGroup(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        if ($group->owner_id != $userId) {
            return response()->json([
                'code' => 403,
                'message' => '只有群主可以解散群组'
            ], 403);
        }

        try {
            $group->update(['status' => ChatGroup::STATUS_DISBANDED]);

            return response()->json([
                'code' => 200,
                'message' => '解散成功'
            ]);

        } catch (\Exception $e) {
            Log::error('解散群组失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '解散失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 发布群公告
     */
    public function publishAnnouncement(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'required|string|max:1000',
            'is_pinned' => 'boolean',
        ]);

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 检查权限（群主或管理员）
        $member = ChatGroupMember::where('group_id', $groupId)
                                ->where('user_id', $userId)
                                ->first();

        if (!$member || !$member->hasAdminPermission()) {
            return response()->json([
                'code' => 403,
                'message' => '只有群主和管理员可以发布公告'
            ], 403);
        }

        try {
            DB::beginTransaction();

            // 如果要置顶，取消其他公告的置顶
            if ($request->is_pinned) {
                ChatGroupAnnouncement::where('group_id', $groupId)
                    ->where('is_pinned', 1)
                    ->update(['is_pinned' => 0]);
            }

            $announcement = ChatGroupAnnouncement::create([
                'group_id' => $groupId,
                'user_id' => $userId,
                'title' => $request->title,
                'content' => $request->content,
                'is_pinned' => $request->is_pinned ?? 0,
            ]);

            $announcement->load('user');

            DB::commit();

            return response()->json([
                'code' => 200,
                'message' => '发布成功',
                'data' => $announcement
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('发布公告失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '发布失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取群公告列表
     */
    public function getAnnouncements(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        // 检查是否是群成员
        $isMember = ChatGroupMember::where('group_id', $groupId)
                                   ->where('user_id', $userId)
                                   ->exists();

        if (!$isMember) {
            return response()->json([
                'code' => 403,
                'message' => '您不是该群成员'
            ], 403);
        }

        $announcements = ChatGroupAnnouncement::with('user')
                                             ->where('group_id', $groupId)
                                             ->orderBy('is_pinned', 'desc')
                                             ->orderBy('created_at', 'desc')
                                             ->get();

        return response()->json([
            'code' => 200,
            'data' => $announcements
        ]);
    }

    /**
     * 删除群公告
     */
    public function deleteAnnouncement(Request $request, $groupId, $announcementId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $announcement = ChatGroupAnnouncement::where('id', $announcementId)
                                            ->where('group_id', $groupId)
                                            ->first();

        if (!$announcement) {
            return response()->json([
                'code' => 404,
                'message' => '公告不存在'
            ], 404);
        }

        // 检查权限（发布者或群主/管理员）
        $member = ChatGroupMember::where('group_id', $groupId)
                                ->where('user_id', $userId)
                                ->first();

        if ($announcement->user_id !== $userId && (!$member || !$member->hasAdminPermission())) {
            return response()->json([
                'code' => 403,
                'message' => '无权删除此公告'
            ], 403);
        }

        try {
            $announcement->delete();

            return response()->json([
                'code' => 200,
                'message' => '删除成功'
            ]);

        } catch (\Exception $e) {
            Log::error('删除公告失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '删除失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 生成群二维码
     */
    public function generateQRCode(Request $request, $groupId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $group = ChatGroup::find($groupId);
        if (!$group) {
            return response()->json([
                'code' => 404,
                'message' => '群组不存在'
            ], 404);
        }

        // 检查权限（群主或管理员）
        $member = ChatGroupMember::where('group_id', $groupId)
                                ->where('user_id', $userId)
                                ->first();

        if (!$member || !$member->hasAdminPermission()) {
            return response()->json([
                'code' => 403,
                'message' => '只有群主和管理员可以生成二维码'
            ], 403);
        }

        try {
            // 生成二维码内容（群组加入链接）
            $joinUrl = url("/wechat/chat/group/join?group_id={$groupId}");

            // 生成二维码图片
            $qrCode = QrCode::format('png')
                           ->size(300)
                           ->margin(1)
                           ->generate($joinUrl);

            // 保存二维码到public目录
            $qrCodePath = "qrcodes/group_{$groupId}.png";
            $fullPath = public_path($qrCodePath);

            // 确保目录存在
            $dir = dirname($fullPath);
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }

            file_put_contents($fullPath, $qrCode);

            // 更新群组二维码URL
            $qrCodeUrl = url($qrCodePath);
            $group->update(['qrcode_url' => $qrCodeUrl]);

            return response()->json([
                'code' => 200,
                'message' => '生成成功',
                'data' => [
                    'qrcode_url' => $qrCodeUrl,
                    'join_url' => $joinUrl
                ]
            ]);

        } catch (\Exception $e) {
            Log::error('生成二维码失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '生成失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 后台异步生成群头像 - 使用shutdown函数在响应后执行
     */
    private function generateAvatarAsync($groupId)
    {
        // 注册shutdown函数,在HTTP响应发送后执行
        register_shutdown_function(function() use ($groupId) {
            try {
                // 关闭FastCGI连接,让用户立即收到响应
                if (function_exists('fastcgi_finish_request')) {
                    fastcgi_finish_request();
                }

                // 现在在后台执行生成头像
                $group = ChatGroup::with(['members.user'])->find($groupId);
                if ($group && GroupAvatarService::shouldRegenerate($group)) {
                    GroupAvatarService::generateGroupAvatar($group);
                }
            } catch (\Exception $e) {
                Log::error("异步生成群头像失败: {$groupId}, " . $e->getMessage());
            }
        });
    }
}
