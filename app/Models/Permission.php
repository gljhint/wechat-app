<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'display_name',
        'group',
        'description',
        'is_system',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'status' => 'integer',
        'sort_order' => 'integer',
        'is_system' => 'boolean',
    ];

    // 状态常量
    const STATUS_DISABLED = 0;
    const STATUS_ACTIVE = 1;

    // 角色关联
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }

    // 获取状态文本
    public function getStatusTextAttribute()
    {
        return $this->status === self::STATUS_ACTIVE ? '启用' : '禁用';
    }

    // 作用域：活跃权限
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // 作用域：按模块筛选
    public function scopeByModule($query, $module)
    {
        return $query->where('module', $module);
    }

    // 作用域：按排序
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
