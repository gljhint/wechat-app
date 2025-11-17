<?php

namespace App\Models;

use App\Services\ChatEncryptionService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Contracts\Encryption\DecryptException;

class ChatMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'from_user_id',
        'to_user_id',
        'group_id',
        'message_type',
        'content',
        'media_url',
        'media_type',
        'media_size',
        'duration',
        'is_read',
        'read_at',
        'is_recalled',
        'recalled_at',
        'encryption_key',
        'encryption_iv',
        'is_encrypted',
        'original_filename',
    ];

    protected $casts = [
        'message_type' => 'integer',
        'media_size' => 'integer',
        'duration' => 'integer',
        'is_read' => 'integer',
        'is_recalled' => 'integer',
        'is_encrypted' => 'boolean',
        'read_at' => 'datetime',
        'recalled_at' => 'datetime',
    ];

    /**
     * 模型启动事件
     */
    protected static function boot()
    {
        parent::boot();

        // 保存前自动加密
        static::saving(function ($message) {
            $encryptionService = app(ChatEncryptionService::class);
            $needsEncryption = false;

            // 判断是否为群聊消息
            $isGroup = !is_null($message->group_id);

            // 加密文本内容
            if ($message->isDirty('content') && !empty($message->content)) {
                // 检查是否已经是加密格式(Base64)
                if (!$message->is_encrypted || !self::isBase64($message->content)) {
                    // 群聊消息用 group_id，私聊消息用 to_user_id
                    $recipientId = $isGroup ? $message->group_id : $message->to_user_id;

                    if ($recipientId) {
                        $encrypted = $encryptionService->encryptMessage(
                            $message->content,
                            $message->from_user_id,
                            $recipientId,
                            $isGroup  // 传递是否为群聊标识
                        );

                        $message->content = $encrypted['encrypted_content'];
                        $message->encryption_key = $encrypted['encryption_key'];
                        $message->encryption_iv = $encrypted['encryption_iv'];
                        $needsEncryption = true;
                    }
                }
            }

            // 加密媒体URL (图片、文件等)
            if ($message->isDirty('media_url') && !empty($message->media_url)) {
                // 检查URL是否已经加密过(加密后的URL不是http/https开头)
                if (!str_starts_with($message->media_url, 'http')) {
                    // 可能已经加密,跳过
                } else {
                    // 明文URL,需要加密
                    $message->media_url = $encryptionService->encryptMediaUrl($message->media_url);
                    $needsEncryption = true;
                }
            }

            // 标记为已加密
            if ($needsEncryption) {
                $message->is_encrypted = true;
            }
        });
    }

    /**
     * 检查字符串是否是Base64编码
     */
    private static function isBase64($string): bool
    {
        if (empty($string) || strlen($string) < 10) {
            return false;
        }

        // Base64字符串只包含A-Z, a-z, 0-9, +, /, =
        if (!preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $string)) {
            return false;
        }

        // 尝试解码
        $decoded = base64_decode($string, true);
        if ($decoded === false) {
            return false;
        }

        // 重新编码,看是否一致
        return base64_encode($decoded) === $string;
    }

    // 消息类型常量
    const TYPE_TEXT = 1;
    const TYPE_IMAGE = 2;
    const TYPE_VOICE = 3;
    const TYPE_VIDEO = 4;
    const TYPE_FILE = 5;

    // 阅读状态常量
    const UNREAD = 0;
    const READ = 1;

    // 撤回状态常量
    const NOT_RECALLED = 0;
    const RECALLED = 1;

    // 发送者关联
    public function fromUser(): BelongsTo
    {
        return $this->belongsTo(WechatUser::class, 'from_user_id');
    }

    // 接收者关联
    public function toUser(): BelongsTo
    {
        return $this->belongsTo(WechatUser::class, 'to_user_id');
    }

    // 群组关联
    public function group(): BelongsTo
    {
        return $this->belongsTo(ChatGroup::class, 'group_id');
    }

    // 是否是群聊消息
    public function isGroupMessage()
    {
        return !is_null($this->group_id);
    }

    // 获取消息类型文本
    public function getMessageTypeTextAttribute()
    {
        return match($this->message_type) {
            self::TYPE_TEXT => '文本',
            self::TYPE_IMAGE => '图片',
            self::TYPE_VOICE => '语音',
            self::TYPE_VIDEO => '视频',
            self::TYPE_FILE => '文件',
            default => '未知'
        };
    }

    // 获取消息显示内容
    public function getDisplayContentAttribute()
    {
        if ($this->is_recalled) {
            return '消息已撤回';
        }

        return match($this->message_type) {
            self::TYPE_TEXT => $this->getDecryptedContent(),
            self::TYPE_IMAGE => '[图片]',
            self::TYPE_VOICE => '[语音]',
            self::TYPE_VIDEO => '[视频]',
            self::TYPE_FILE => '[文件]',
            default => '未知消息'
        };
    }

    /**
     * 获取解密后的消息内容
     * 只有对话双方可以解密
     *
     * @param int|null $currentUserId 当前用户ID,不传则从Auth获取
     * @return string
     */
    public function getDecryptedContent(?int $currentUserId = null): string
    {
        // 如果未加密,直接返回
        if (!$this->is_encrypted) {
            return $this->content ?? '';
        }

        // 检查必要字段
        if (empty($this->content) || empty($this->encryption_key) || empty($this->encryption_iv)) {
            return '[加密消息无法解密]';
        }

        // 获取当前用户ID (优先用传入的,否则从session或auth获取)
        if ($currentUserId === null) {
            $currentUserId = session('wechat_user_id') ?? auth()->id();
        }

        // 如果仍然是null,说明用户未登录
        if ($currentUserId === null) {
            return '[请登录后查看]';
        }

        // 判断是否为群聊消息
        $isGroup = !is_null($this->group_id);

        // 群聊消息用 group_id，私聊消息用 to_user_id
        $recipientId = $isGroup ? $this->group_id : $this->to_user_id;

        if (!$recipientId) {
            return '[消息数据异常]';
        }

        // 验证权限
        $encryptionService = app(ChatEncryptionService::class);

        if (!$encryptionService->canDecrypt($currentUserId, $this->from_user_id, $recipientId, $isGroup)) {
            return '[无权限查看此消息]';
        }

        // 如果是群聊,需要额外检查用户是否是群成员
        if ($isGroup) {
            $isMember = \App\Models\ChatGroupMember::where('group_id', $this->group_id)
                ->where('user_id', $currentUserId)
                ->exists();

            if (!$isMember) {
                return '[您不是该群成员]';
            }
        }

        try {
            return $encryptionService->decryptMessage(
                $this->content,
                $this->encryption_key,
                $this->encryption_iv,
                $this->from_user_id,
                $recipientId,
                $isGroup  // 传递是否为群聊标识
            );
        } catch (DecryptException $e) {
            \Log::error('消息解密失败', [
                'message_id' => $this->id,
                'is_group' => $isGroup,
                'error' => $e->getMessage()
            ]);
            return '[消息解密失败]';
        }
    }

    /**
     * 获取解密后的媒体URL
     *
     * @return string|null
     */
    public function getDecryptedMediaUrl(): ?string
    {
        if (empty($this->media_url)) {
            return null;
        }

        // 如果未加密,直接返回
        if (!$this->is_encrypted) {
            return $this->media_url;
        }

        try {
            $encryptionService = app(ChatEncryptionService::class);
            return $encryptionService->decryptMediaUrl($this->media_url);
        } catch (DecryptException $e) {
            \Log::error('媒体URL解密失败', [
                'message_id' => $this->id,
                'error' => $e->getMessage()
            ]);
            return null;
        }
    }

    // 标记为已读
    public function markAsRead()
    {
        if (!$this->is_read) {
            $this->update([
                'is_read' => self::READ,
                'read_at' => now()
            ]);
        }
    }

    // 撤回消息
    public function recall()
    {
        $this->update([
            'is_recalled' => self::RECALLED,
            'recalled_at' => now()
        ]);
    }

    // 作用域：未读消息
    public function scopeUnread($query)
    {
        return $query->where('is_read', self::UNREAD);
    }

    // 作用域：按类型筛选
    public function scopeByType($query, $type)
    {
        return $query->where('message_type', $type);
    }

    // 作用域：聊天记录
    public function scopeConversation($query, $user1Id, $user2Id)
    {
        return $query->where(function($q) use ($user1Id, $user2Id) {
            $q->where(['from_user_id' => $user1Id, 'to_user_id' => $user2Id])
              ->orWhere(['from_user_id' => $user2Id, 'to_user_id' => $user1Id]);
        })->where('is_recalled', self::NOT_RECALLED)
          ->orderBy('created_at');
    }
}
