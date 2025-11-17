<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'slug',
        'description',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'status' => 'integer',
        'sort_order' => 'integer',
    ];

    // 状态常量
    const STATUS_DISABLED = 0;
    const STATUS_ACTIVE = 1;

    // 权限关联
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }

    // 管理员关联
    public function admins(): BelongsToMany
    {
        return $this->belongsToMany(Admin::class, 'admin_roles');
    }

    // 获取状态文本
    public function getStatusTextAttribute()
    {
        return $this->status === self::STATUS_ACTIVE ? '启用' : '禁用';
    }

    // 作用域：活跃角色
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // 作用域：按排序
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
