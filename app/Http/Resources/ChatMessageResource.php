<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * 聊天消息资源
 *
 * 自动处理消息解密,确保API返回解密后的内容
 */
class ChatMessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // 获取当前用户ID (优先从session,否则从auth)
        $currentUserId = session('wechat_user_id') ?? auth()->id();

        // 解密消息内容
        $decryptedContent = null;
        if ($this->message_type === \App\Models\ChatMessage::TYPE_TEXT && $this->is_encrypted) {
            // 传入currentUserId,避免Resource中再次获取
            $decryptedContent = $this->getDecryptedContent($currentUserId);
        } else {
            $decryptedContent = $this->content;
        }

        // 解密媒体URL
        $decryptedMediaUrl = null;
        if ($this->media_url && $this->is_encrypted) {
            $decryptedMediaUrl = $this->getDecryptedMediaUrl();
        } else {
            $decryptedMediaUrl = $this->media_url;
        }

        return [
            'id' => $this->id,
            'from_user_id' => $this->from_user_id,
            'to_user_id' => $this->to_user_id,
            'message_type' => $this->message_type,
            'message_type_text' => $this->message_type_text,

            // 返回解密后的内容
            'content' => $decryptedContent,
            'display_content' => $this->display_content,

            // 返回解密后的媒体URL
            'media_url' => $decryptedMediaUrl,
            'media_type' => $this->media_type,
            'media_size' => $this->media_size,
            'duration' => $this->duration,

            // 原始文件名(从数据库直接获取)
            'original_name' => $this->original_filename,

            // 状态信息
            'is_read' => $this->is_read,
            'read_at' => $this->read_at?->toISOString(),
            'is_recalled' => $this->is_recalled,
            'recalled_at' => $this->recalled_at?->toISOString(),

            // 时间戳
            'created_at' => $this->created_at->toISOString(),
            'updated_at' => $this->updated_at->toISOString(),

            // 关联用户信息
            'from_user' => $this->whenLoaded('fromUser', function() {
                return [
                    'id' => $this->fromUser->id,
                    'nickname' => $this->fromUser->nickname,
                    'real_name' => $this->fromUser->real_name,
                    'avatar_url' => $this->fromUser->avatar_url,
                    'display_name' => $this->fromUser->real_name ?: $this->fromUser->nickname,
                ];
            }),

            'to_user' => $this->whenLoaded('toUser', function() {
                return [
                    'id' => $this->toUser->id,
                    'nickname' => $this->toUser->nickname,
                    'real_name' => $this->toUser->real_name,
                    'avatar_url' => $this->toUser->avatar_url,
                    'display_name' => $this->toUser->real_name ?: $this->toUser->nickname,
                ];
            }),

            // 不返回加密相关字段
            // 'encryption_key' => 隐藏
            // 'encryption_iv' => 隐藏
            // 'is_encrypted' => 隐藏 (前端不需要知道)
        ];
    }
}
