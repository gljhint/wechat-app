<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'admins';

    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'avatar',
        'phone',
        'status',
        'is_super',
        'last_login_at',
        'last_login_ip',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'status' => 'integer',
        'is_super' => 'integer',
    ];

    // 状态常量
    const STATUS_DISABLED = 0;
    const STATUS_ACTIVE = 1;

    // 角色关联
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'admin_roles');
    }

    // 获取所有权限
    public function permissions()
    {
        return $this->roles()
            ->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->unique('id');
    }

    // 检查是否有特定权限
    public function hasPermission($permissionSlug)
    {
        if ($this->is_super) {
            return true;
        }

        return $this->permissions()->contains('slug', $permissionSlug);
    }

    // 检查是否有特定角色
    public function hasRole($roleSlug)
    {
        return $this->roles()->where('slug', $roleSlug)->exists();
    }

    // 是否为超级管理员
    public function isSuperAdmin()
    {
        return $this->is_super === 1;
    }

    // 获取状态文本
    public function getStatusTextAttribute()
    {
        return $this->status === self::STATUS_ACTIVE ? '正常' : '禁用';
    }

    // 作用域：活跃管理员
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // 作用域：超级管理员
    public function scopeSuperAdmin($query)
    {
        return $query->where('is_super', 1);
    }
}
