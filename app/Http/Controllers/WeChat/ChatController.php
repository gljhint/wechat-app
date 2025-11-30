<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChatMessageResource;
use App\Models\ChatMessage;
use App\Models\WechatUser;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ChatController extends Controller
{
    /**
     * 聊天首页
     */
    public function index(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        $user = WechatUser::find($userId);
        
        // 获取最近的聊天消息(转换为Resource)
        $recentMessagesRaw = ChatMessage::with(['fromUser', 'toUser'])
            ->where(function($query) use ($userId) {
                $query->where('from_user_id', $userId)
                      ->orWhere('to_user_id', $userId);
            })
            ->orderBy('created_at', 'desc')
            ->limit(50)
            ->get()
            ->reverse();

        // 转换为Resource以解密
        $recentMessages = ChatMessageResource::collection($recentMessagesRaw);

        return view('wechat.chat', compact('user', 'recentMessages'));
    }

    /**
     * 发送消息
     */
    public function sendMessage(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'content' => 'nullable|string|max:1000',
            'message_type' => 'nullable',
            'to_user_id' => 'required|integer|exists:wechat_users,id',
            'media_url' => 'nullable|string|max:255',
            'media_type' => 'nullable|string|max:50',
            'media_size' => 'nullable|integer|min:1',
            'duration' => 'nullable|integer|min:1',
            'original_filename' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'code' => 422,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        if ((int) $request->to_user_id === (int) $userId) {
            return response()->json([
                'code' => 400,
                'message' => '不能给自己发送消息',
            ], 400);
        }

        $recipient = WechatUser::where('status', WechatUser::STATUS_ACTIVE)
            ->find($request->to_user_id);

        if (!$recipient) {
            return response()->json([
                'code' => 404,
                'message' => '接收人不可用',
            ], 404);
        }

        $messageType = $this->normalizeMessageType($request->input('message_type'));

        if (is_null($messageType)) {
            return response()->json([
                'code' => 422,
                'message' => '不支持的消息类型',
            ], 422);
        }

        if ($messageType === ChatMessage::TYPE_TEXT) {
            if (!filled($request->content)) {
                return response()->json([
                    'code' => 422,
                    'message' => '消息内容不能为空',
                ], 422);
            }
        } else {
            if (!$request->filled('media_url')) {
                return response()->json([
                    'code' => 422,
                    'message' => '请提供有效的媒体地址',
                ], 422);
            }
        }

        try {
            $message = ChatMessage::create([
                'from_user_id' => $userId,
                'to_user_id' => $request->to_user_id,
                'content' => $messageType === ChatMessage::TYPE_TEXT ? $request->content : null,
                'message_type' => $messageType,
                'media_url' => $messageType === ChatMessage::TYPE_TEXT ? null : $request->media_url,
                'media_type' => $request->media_type,
                'media_size' => $request->media_size,
                'duration' => $request->duration,
                'original_filename' => $request->original_filename,
                'is_read' => ChatMessage::UNREAD,
            ]);

            // 加载关联数据
            $message->load(['fromUser', 'toUser']);

            return response()->json([
                'code' => 200,
                'message' => '发送成功',
                'data' => new ChatMessageResource($message)
            ]);

        } catch (\Exception $e) {
            Log::error('发送消息失败: ' . $e->getMessage());
            
            return response()->json([
                'code' => 500,
                'message' => '发送失败，请重试',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取单个聊天对象信息
     */
    public function showContact($contactId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $contact = WechatUser::where('status', WechatUser::STATUS_ACTIVE)
            ->find($contactId);

        if (!$contact) {
            return response()->json([
                'code' => 404,
                'message' => '用户不存在或已禁用'
            ], 404);
        }

        return response()->json([
            'code' => 200,
            'data' => [
                'id' => $contact->id,
                'nickname' => $contact->nickname,
                'real_name' => $contact->real_name,
                'display_name' => $contact->real_name ?: $contact->nickname,
                'avatar_url' => $contact->avatar_url,
                'department' => $contact->department,
                'position' => $contact->position,
            ]
        ]);
    }

    /**
     * 获取聊天历史
     */
    public function getMessages(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'chat_with' => 'nullable|exists:wechat_users,id',
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:100',
            'after_id' => 'nullable|integer|min:1',
        ]);

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        $offset = ($page - 1) * $limit;
        $afterId = $request->get('after_id');

        if ($afterId) {
            // 增量模式下不需要分页偏移
            $page = 1;
            $offset = 0;
        }

        $query = ChatMessage::with(['fromUser', 'toUser'])
                           ->where('is_recalled', ChatMessage::NOT_RECALLED);

        if ($request->chat_with) {
            // 私聊消息
            $chatWithId = $request->chat_with;
            $query->where(function($q) use ($userId, $chatWithId) {
                $q->where(function($subQ) use ($userId, $chatWithId) {
                    $subQ->where('from_user_id', $userId)
                         ->where('to_user_id', $chatWithId);
                })->orWhere(function($subQ) use ($userId, $chatWithId) {
                    $subQ->where('from_user_id', $chatWithId)
                         ->where('to_user_id', $userId);
                });
            });
        } else {
            // 所有相关消息
            $query->where(function($q) use ($userId) {
                $q->where('from_user_id', $userId)
                  ->orWhere('to_user_id', $userId);
            });
        }

        if ($afterId) {
            $query->where('id', '>', $afterId);
        }

        if ($afterId) {
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
     * 标记消息为已读
     */
    public function markAsRead(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'message_ids' => 'required|array',
            'message_ids.*' => 'exists:chat_messages,id',
        ]);

        try {
            ChatMessage::whereIn('id', $request->message_ids)
                       ->where('to_user_id', $userId)
                       ->update([
                           'is_read' => 1,
                           'read_at' => now()
                       ]);

            return response()->json([
                'code' => 200,
                'message' => '标记成功'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => '操作失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取未读消息数量
     */
    public function getUnreadCount(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $unreadCount = ChatMessage::where('to_user_id', $userId)
                                 ->where('is_read', 0)
                                 ->count();

        return response()->json([
            'code' => 200,
            'data' => [
                'unread_count' => $unreadCount
            ]
        ]);
    }

    /**
     * 删除消息
     */
    public function deleteMessage(Request $request, $messageId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $message = ChatMessage::find($messageId);

        if (!$message) {
            return response()->json([
                'code' => 404,
                'message' => '消息不存在'
            ], 404);
        }

        // 只能删除自己发送的消息
        if ($message->from_user_id !== $userId) {
            return response()->json([
                'code' => 403,
                'message' => '无权删除此消息'
            ], 403);
        }

        try {
            $message->delete();

            return response()->json([
                'code' => 200,
                'message' => '删除成功'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'code' => 500,
                'message' => '删除失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 撤回消息
     */
    public function recallMessage(Request $request, $messageId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $message = ChatMessage::find($messageId);

        if (!$message) {
            return response()->json([
                'code' => 404,
                'message' => '消息不存在'
            ], 404);
        }

        // 只能撤回自己发送的消息
        if ($message->from_user_id !== $userId) {
            return response()->json([
                'code' => 403,
                'message' => '无权撤回此消息'
            ], 403);
        }

        // 检查是否已经撤回
        if ($message->is_recalled) {
            return response()->json([
                'code' => 400,
                'message' => '消息已撤回'
            ], 400);
        }

        // 检查撤回时间限制（10分钟内）
        $recallTimeLimit = 10 * 60; // 10分钟
        $messageAge = now()->diffInSeconds($message->created_at);

        if ($messageAge > $recallTimeLimit) {
            return response()->json([
                'code' => 400,
                'message' => '消息发送超过2分钟，无法撤回'
            ], 400);
        }

        try {
            $message->recall();

            // 广播撤回事件（如果有实时推送）
            $this->broadcastRecall($message);

            return response()->json([
                'code' => 200,
                'message' => '撤回成功',
                'data' => new ChatMessageResource($message->fresh())
            ]);

        } catch (\Exception $e) {
            Log::error('撤回消息失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => '撤回失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 广播撤回事件
     */
    protected function broadcastRecall(ChatMessage $message)
    {
        // 如果有WebSocket或其他实时推送机制，在这里实现
        // 目前留空，前端通过轮询获取撤回状态
    }

    /**
     * 获取聊天联系人列表
     */
    public function getContacts(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        // 获取有过聊天记录的用户
        $contactIds = ChatMessage::where(function($query) use ($userId) {
                         $query->where('from_user_id', $userId)
                               ->orWhere('to_user_id', $userId);
                     })
                     ->selectRaw('CASE
                                 WHEN from_user_id = ? THEN to_user_id
                                 ELSE from_user_id
                                 END as contact_id', [$userId])
                     ->distinct()
                     ->pluck('contact_id')
                     ->filter();

        $contacts = WechatUser::whereIn('id', $contactIds)
                             ->where('status', WechatUser::STATUS_ACTIVE)
                             ->get();

        // 获取每个联系人的最后一条消息
        foreach ($contacts as $contact) {
            $lastMessage = ChatMessage::where(function($query) use ($userId, $contact) {
                               $query->where(function($subQ) use ($userId, $contact) {
                                   $subQ->where('from_user_id', $userId)
                                        ->where('to_user_id', $contact->id);
                               })->orWhere(function($subQ) use ($userId, $contact) {
                                   $subQ->where('from_user_id', $contact->id)
                                        ->where('to_user_id', $userId);
                               });
                           })
                           ->orderBy('created_at', 'desc')
                           ->first();

            $contact->last_message = $lastMessage ? new ChatMessageResource($lastMessage) : null;

            // 获取未读消息数
            $contact->unread_count = ChatMessage::where('from_user_id', $contact->id)
                                               ->where('to_user_id', $userId)
                                               ->where('is_read', 0)
                                               ->count();
        }

        // 按最后消息时间排序
        $contacts = $contacts->sortByDesc(function($contact) {
            return $contact->last_message ? $contact->last_message->created_at : null;
        })->values();

        return response()->json([
            'code' => 200,
            'data' => $contacts
        ]);
    }

    /**
     * 获取可发起聊天的用户
     */
    public function availableContacts(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $limit = (int) $request->get('limit', 20);
        $limit = max(1, min($limit, 100));
        $page = (int) $request->get('page', 1);
        $search = trim((string) $request->get('search', ''));

        $query = WechatUser::query()
            ->select('id', 'nickname', 'real_name', 'avatar_url', 'department', 'position')
            ->where('status', WechatUser::STATUS_ACTIVE)
            ->whereNotNull('role')
            ->where('role', '!=', '')
            ->where('id', '!=', $userId);

        if ($search !== '') {
            $query->where(function($q) use ($search) {
                $like = '%' . Str::lower($search) . '%';
                $q->whereRaw('LOWER(nickname) LIKE ?', [$like])
                  ->orWhereRaw('LOWER(real_name) LIKE ?', [$like])
                  ->orWhereRaw('LOWER(department) LIKE ?', [$like])
                  ->orWhereRaw('LOWER(position) LIKE ?', [$like]);
            });
        }

        $paginator = $query
            ->orderByRaw('COALESCE(NULLIF(real_name, \'\'), nickname) ASC')
            ->orderBy('id')
            ->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'code' => 200,
            'data' => [
                'users' => $paginator->items(),
                'pagination' => [
                    'page' => $paginator->currentPage(),
                    'limit' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'has_more' => $paginator->hasMorePages(),
                ],
            ],
        ]);
    }

    /**
     * 标准化消息类型
     */
    private function normalizeMessageType($type)
    {
        if (is_null($type) || $type === '') {
            return ChatMessage::TYPE_TEXT;
        }

        if (is_numeric($type)) {
            $intType = (int) $type;

            return in_array($intType, [
                ChatMessage::TYPE_TEXT,
                ChatMessage::TYPE_IMAGE,
                ChatMessage::TYPE_VOICE,
                ChatMessage::TYPE_VIDEO,
                ChatMessage::TYPE_FILE,
            ], true) ? $intType : null;
        }

        $map = [
            'text' => ChatMessage::TYPE_TEXT,
            'image' => ChatMessage::TYPE_IMAGE,
            'voice' => ChatMessage::TYPE_VOICE,
            'audio' => ChatMessage::TYPE_VOICE,
            'video' => ChatMessage::TYPE_VIDEO,
            'file' => ChatMessage::TYPE_FILE,
        ];

        $key = strtolower(trim($type));

        return $map[$key] ?? null;
    }

    /**
     * 上传图片
     */
    public function uploadImage(Request $request, FileUploadService $uploadService)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,gif,webp|max:10240', // 10MB
        ]);

        try {
            $result = $uploadService->uploadImage(
                $request->file('image'),
                $userId,
                true  // 压缩图片
            );

            return response()->json([
                'code' => 200,
                'message' => '上传成功',
                'data' => $result
            ]);

        } catch (\Exception $e) {
            Log::error('图片上传失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 上传文件
     */
    public function uploadFile(Request $request, FileUploadService $uploadService)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'file' => 'required|file|max:102400', // 100MB
        ]);

        try {
            $result = $uploadService->uploadFile(
                $request->file('file'),
                $userId
            );

            return response()->json([
                'code' => 200,
                'message' => '上传成功',
                'data' => $result
            ]);

        } catch (\Exception $e) {
            Log::error('文件上传失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 从微信临时素材上传
     * 前端通过微信JS SDK获取media_id后,调用此接口转存到R2
     */
    public function uploadFromWechat(Request $request, FileUploadService $uploadService)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'media_url' => 'required|url',
            'type' => 'required|in:image,file,voice,video',
        ]);

        try {
            $result = $uploadService->uploadFromWechatMedia(
                $request->media_url,
                $userId,
                $request->type
            );

            return response()->json([
                'code' => 200,
                'message' => '上传成功',
                'data' => $result
            ]);

        } catch (\Exception $e) {
            Log::error('微信媒体上传失败: ' . $e->getMessage());

            return response()->json([
                'code' => 500,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 文件预览页面
     */
    public function filePreview(Request $request)
    {
        $url = $request->get('url');
        $filename = $request->get('filename', '文件');
        $type = $request->get('type'); // audio, video, pdf, image, other

        if (!$url) {
            abort(404, '文件不存在');
        }

        // 如果没有指定type,根据文件名推断
        if (!$type && $filename) {
            $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            $type = $this->guessFileType($ext);
        }

        // 获取文件大小(用于微信预览)
        $filesize = 0;
        try {
            // 尝试获取远程文件大小
            $headers = @get_headers($url, 1);
            if ($headers && isset($headers['Content-Length'])) {
                $filesize = is_array($headers['Content-Length'])
                    ? end($headers['Content-Length'])
                    : $headers['Content-Length'];
            }
        } catch (\Exception $e) {
            \Log::warning('获取文件大小失败: ' . $e->getMessage());
        }

        return view('wechat.file-preview', compact('url', 'filename', 'type', 'filesize'));
    }

    /**
     * 根据文件扩展名推断类型
     */
    private function guessFileType($ext)
    {
        $audioExts = ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'];
        $videoExts = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'];
        $imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'];
        $officeExts = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'];

        if (in_array($ext, $audioExts)) {
            return 'audio';
        } elseif (in_array($ext, $videoExts)) {
            return 'video';
        } elseif ($ext === 'pdf') {
            return 'pdf';
        } elseif (in_array($ext, $imageExts)) {
            return 'image';
        } elseif (in_array($ext, $officeExts)) {
            return 'office'; // Office文档类型
        } else {
            return 'other';
        }
    }

}
