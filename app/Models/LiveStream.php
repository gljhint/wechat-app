<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class LiveStream extends Model
{
    use HasFactory;

    const STATUS_SCHEDULED = 'scheduled';
    const STATUS_LIVE = 'live';
    const STATUS_ENDED = 'ended';
    const STATUS_CANCELLED = 'cancelled';

    protected $fillable = [
        // 基础信息 (用户填写)
        'title',                   // 直播标题 (必填)
        'streamer_id',            // 主播 ID (自动)

        // RealtimeKit 关联 (自动生成)
        'rtk_meeting_id',         // Meeting ID

        // 状态管理 (自动维护)
        'status',                 // live/ended/scheduled
        'started_at',             // 开始时间
        'ended_at',               // 结束时间

        // 可选字段
        'description',            // 描述 (可选)
        'cover_image',            // 封面 (可选)
        'scheduled_at',           // 预约时间 (可选)
        'is_public',              // 是否公开 (默认 true)
        'category',               // 分类 (可选)
        'visible_roles',          // 可见角色 (可选)
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'is_public' => 'boolean',
        'visible_roles' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($stream) {
            // RealtimeKit Meeting 在 Controller 中通过 Service 创建后设置
        });
    }

    /**
     * 关联主播用户
     */
    public function streamer()
    {
        return $this->belongsTo(WechatUser::class, 'streamer_id');
    }

    /**
     * 检查是否正在直播
     */
    public function isLive()
    {
        return $this->status === self::STATUS_LIVE;
    }

    /**
     * 检查是否已结束
     */
    public function isEnded()
    {
        return $this->status === self::STATUS_ENDED;
    }

    /**
     * 检查是否已取消
     */
    public function isCancelled()
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    /**
     * 开始直播
     */
    public function startLive()
    {
        $this->update([
            'status' => self::STATUS_LIVE,
            'started_at' => now(),
        ]);
    }

    /**
     * 结束直播
     */
    public function endLive()
    {
        $this->update([
            'status' => self::STATUS_ENDED,
            'ended_at' => now(),
        ]);
    }

    /**
     * 格式化直播时长
     */
    public function getFormattedDurationAttribute()
    {
        if ($this->duration <= 0) return '00:00';
        
        $hours = floor($this->duration / 3600);
        $minutes = floor(($this->duration % 3600) / 60);
        $seconds = $this->duration % 60;
        
        if ($hours > 0) {
            return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
        }
        
        return sprintf('%02d:%02d', $minutes, $seconds);
    }

    /**
     * 获取状态文本
     */
    public function getStatusTextAttribute()
    {
        switch ($this->status) {
            case self::STATUS_SCHEDULED:
                return '预告';
            case self::STATUS_LIVE:
                return '直播中';
            case self::STATUS_ENDED:
                return '已结束';
            case self::STATUS_CANCELLED:
                return '已取消';
            default:
                return '未知';
        }
    }

    /**
     * 作用域：正在直播的
     */
    public function scopeLive($query)
    {
        return $query->where('status', self::STATUS_LIVE);
    }

    /**
     * 作用域：公开的
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * 作用域：按分类
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * 作用域：按状态
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * 检查用户是否可以查看该直播
     */
    public function isVisibleToUser(?WechatUser $user): bool
    {
        // 管理员可以查看所有直播
        if ($user && $user->isAdmin()) {
            return true;
        }

        // 主播自己可以查看
        if ($user && $user->id === $this->streamer_id) {
            return true;
        }

        // 如果没有设置可见角色（null），则所有人可见
        if (is_null($this->visible_roles) || empty($this->visible_roles)) {
            return true;
        }

        // 检查用户角色是否在可见角色列表中
        if ($user && $user->role && in_array($user->role, $this->visible_roles)) {
            return true;
        }

        return false;
    }

    /**
     * 作用域：用户可见的直播
     */
    public function scopeVisibleToUser($query, ?WechatUser $user)
    {
        // 管理员可以查看所有
        if ($user && $user->isAdmin()) {
            return $query;
        }

        return $query->where(function($q) use ($user) {
            // 没有设置可见角色的直播
            $q->whereNull('visible_roles')
              ->orWhereJsonLength('visible_roles', 0);

            // 或者用户角色在可见角色列表中
            if ($user && $user->role) {
                $q->orWhereJsonContains('visible_roles', $user->role);
            }

            // 或者是用户自己创建的直播
            if ($user) {
                $q->orWhere('streamer_id', $user->id);
            }
        });
    }

    /**
     * 获取可见角色文本
     */
    public function getVisibleRolesTextAttribute(): string
    {
        if (is_null($this->visible_roles) || empty($this->visible_roles)) {
            return '所有人可见';
        }

        $roleNames = array_map(function($role) {
            return WechatUser::$roleNames[$role] ?? $role;
        }, $this->visible_roles);

        return implode('、', $roleNames);
    }
}