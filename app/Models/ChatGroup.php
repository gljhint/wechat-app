<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'avatar',
        'qrcode_url',
        'description',
        'owner_id',
        'member_count',
        'status',
    ];

    protected $casts = [
        'joined_at' => 'datetime',
    ];

    const STATUS_ACTIVE = 1;
    const STATUS_DISBANDED = 0;

    /**
     * 群主
     */
    public function owner()
    {
        return $this->belongsTo(WechatUser::class, 'owner_id');
    }

    /**
     * 群成员
     */
    public function members()
    {
        return $this->hasMany(ChatGroupMember::class, 'group_id');
    }

    /**
     * 群消息
     */
    public function messages()
    {
        return $this->hasMany(ChatMessage::class, 'group_id');
    }

    /**
     * 获取最后一条消息
     */
    public function lastMessage()
    {
        return $this->hasOne(ChatMessage::class, 'group_id')->latest();
    }

    /**
     * 群公告
     */
    public function announcements()
    {
        return $this->hasMany(ChatGroupAnnouncement::class, 'group_id');
    }

    /**
     * 获取置顶公告
     */
    public function pinnedAnnouncement()
    {
        return $this->hasOne(ChatGroupAnnouncement::class, 'group_id')
                    ->where('is_pinned', ChatGroupAnnouncement::PINNED)
                    ->latest();
    }
}
