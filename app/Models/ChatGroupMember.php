<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatGroupMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'user_id',
        'role',
        'nickname',
        'mute',
        'joined_at',
    ];

    protected $casts = [
        'joined_at' => 'datetime',
    ];

    const ROLE_MEMBER = 0;
    const ROLE_ADMIN = 1;
    const ROLE_OWNER = 2;

    /**
     * 所属群组
     */
    public function group()
    {
        return $this->belongsTo(ChatGroup::class, 'group_id');
    }

    /**
     * 成员用户
     */
    public function user()
    {
        return $this->belongsTo(WechatUser::class, 'user_id');
    }

    /**
     * 是否是群主
     */
    public function isOwner()
    {
        return $this->role === self::ROLE_OWNER;
    }

    /**
     * 是否是管理员
     */
    public function isAdmin()
    {
        return $this->role === self::ROLE_ADMIN;
    }

    /**
     * 是否有管理权限
     */
    public function hasAdminPermission()
    {
        return $this->role >= self::ROLE_ADMIN;
    }
}
