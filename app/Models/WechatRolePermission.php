<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WechatRolePermission extends Model
{
    use HasFactory;

    protected $table = 'wechat_role_permissions';

    protected $fillable = [
        'role',
        'permission_id',
    ];

    // 关联权限
    public function permission(): BelongsTo
    {
        return $this->belongsTo(WechatPermission::class, 'permission_id');
    }

    /**
     * 获取指定角色的所有权限ID
     */
    public static function getPermissionIdsByRole(string $role): array
    {
        return static::where('role', $role)
            ->pluck('permission_id')
            ->toArray();
    }

    /**
     * 获取指定角色的所有权限
     */
    public static function getPermissionsByRole(string $role)
    {
        return WechatPermission::whereIn('id', static::getPermissionIdsByRole($role))
            ->active()
            ->ordered()
            ->get();
    }

    /**
     * 为角色批量分配权限
     */
    public static function syncRolePermissions(string $role, array $permissionIds): void
    {
        // 删除旧的权限
        static::where('role', $role)->delete();

        // 添加新的权限
        $data = array_map(function($permissionId) use ($role) {
            return [
                'role' => $role,
                'permission_id' => $permissionId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $permissionIds);

        if (!empty($data)) {
            static::insert($data);
        }
    }
}
