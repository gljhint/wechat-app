<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatGroupAnnouncement extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'user_id',
        'title',
        'content',
        'is_pinned',
    ];

    const UNPINNED = 0;
    const PINNED = 1;

    /**
     * 所属群组
     */
    public function group()
    {
        return $this->belongsTo(ChatGroup::class, 'group_id');
    }

    /**
     * 发布者
     */
    public function user()
    {
        return $this->belongsTo(WechatUser::class, 'user_id');
    }

    /**
     * 是否置顶
     */
    public function isPinned()
    {
        return $this->is_pinned === self::PINNED;
    }

    /**
     * 作用域：置顶公告
     */
    public function scopePinned($query)
    {
        return $query->where('is_pinned', self::PINNED);
    }

    /**
     * 作用域：按群组筛选
     */
    public function scopeByGroup($query, $groupId)
    {
        return $query->where('group_id', $groupId);
    }
}
