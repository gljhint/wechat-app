<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 创建权限
        $permissions = [
            // 用户管理权限
            ['name' => '查看用户列表', 'slug' => 'users.index', 'module' => 'users', 'description' => '查看微信用户列表'],
            ['name' => '查看用户详情', 'slug' => 'users.show', 'module' => 'users', 'description' => '查看用户详细信息'],
            ['name' => '编辑用户信息', 'slug' => 'users.edit', 'module' => 'users', 'description' => '编辑用户基本信息'],
            ['name' => '禁用用户', 'slug' => 'users.disable', 'module' => 'users', 'description' => '禁用/启用用户账号'],
            
            // 打卡管理权限
            ['name' => '查看打卡记录', 'slug' => 'checkins.index', 'module' => 'checkins', 'description' => '查看用户打卡记录'],
            ['name' => '导出打卡数据', 'slug' => 'checkins.export', 'module' => 'checkins', 'description' => '导出打卡统计数据'],
            ['name' => '修改打卡记录', 'slug' => 'checkins.edit', 'module' => 'checkins', 'description' => '修改用户打卡记录'],
            
            // 文档管理权限
            ['name' => '查看文档列表', 'slug' => 'documents.index', 'module' => 'documents', 'description' => '查看用户文档列表'],
            ['name' => '下载文档', 'slug' => 'documents.download', 'module' => 'documents', 'description' => '下载用户文档'],
            ['name' => '删除文档', 'slug' => 'documents.delete', 'module' => 'documents', 'description' => '删除用户文档'],
            
            // 聊天管理权限
            ['name' => '查看聊天记录', 'slug' => 'messages.index', 'module' => 'messages', 'description' => '查看用户聊天记录'],
            ['name' => '删除聊天记录', 'slug' => 'messages.delete', 'module' => 'messages', 'description' => '删除聊天记录'],
            
            // 系统管理权限
            ['name' => '管理员管理', 'slug' => 'admins.manage', 'module' => 'system', 'description' => '管理员账号管理'],
            ['name' => '角色管理', 'slug' => 'roles.manage', 'module' => 'system', 'description' => '角色权限管理'],
            ['name' => '权限管理', 'slug' => 'permissions.manage', 'module' => 'system', 'description' => '权限配置管理'],
            ['name' => '系统设置', 'slug' => 'system.settings', 'module' => 'system', 'description' => '系统配置设置'],
        ];

        foreach ($permissions as $index => $permission) {
            DB::table('permissions')->insert([
                'name' => $permission['name'],
                'slug' => $permission['slug'],
                'module' => $permission['module'],
                'description' => $permission['description'],
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 创建角色
        $roles = [
            ['name' => '超级管理员', 'slug' => 'super_admin', 'description' => '拥有所有权限的超级管理员'],
            ['name' => 'HR管理员', 'slug' => 'hr_admin', 'description' => '人事管理员，管理用户和打卡'],
            ['name' => '文档管理员', 'slug' => 'doc_admin', 'description' => '文档管理员，管理文档资料'],
            ['name' => '普通管理员', 'slug' => 'basic_admin', 'description' => '普通管理员，基础查看权限'],
        ];

        foreach ($roles as $index => $role) {
            DB::table('roles')->insert([
                'name' => $role['name'],
                'slug' => $role['slug'],
                'description' => $role['description'],
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 为角色分配权限
        $rolePermissions = [
            // 超级管理员拥有所有权限
            'super_admin' => [
                'users.index', 'users.show', 'users.edit', 'users.disable',
                'checkins.index', 'checkins.export', 'checkins.edit',
                'documents.index', 'documents.download', 'documents.delete',
                'messages.index', 'messages.delete',
                'admins.manage', 'roles.manage', 'permissions.manage', 'system.settings'
            ],
            // HR管理员
            'hr_admin' => [
                'users.index', 'users.show', 'users.edit',
                'checkins.index', 'checkins.export', 'checkins.edit'
            ],
            // 文档管理员
            'doc_admin' => [
                'users.index', 'users.show',
                'documents.index', 'documents.download', 'documents.delete'
            ],
            // 普通管理员
            'basic_admin' => [
                'users.index', 'users.show',
                'checkins.index',
                'documents.index', 'documents.download',
                'messages.index'
            ],
        ];

        foreach ($rolePermissions as $roleSlug => $permissionSlugs) {
            $role = DB::table('roles')->where('slug', $roleSlug)->first();
            
            foreach ($permissionSlugs as $permissionSlug) {
                $permission = DB::table('permissions')->where('slug', $permissionSlug)->first();
                
                if ($role && $permission) {
                    DB::table('role_permissions')->insert([
                        'role_id' => $role->id,
                        'permission_id' => $permission->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        }

        // 创建默认超级管理员
        $adminId = DB::table('admins')->insertGetId([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123456'),
            'name' => '超级管理员',
            'is_super' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // 为超级管理员分配角色
        $superAdminRole = DB::table('roles')->where('slug', 'super_admin')->first();
        if ($superAdminRole) {
            DB::table('admin_roles')->insert([
                'admin_id' => $adminId,
                'role_id' => $superAdminRole->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
