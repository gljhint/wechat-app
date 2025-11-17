<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::with('roles')->get();
        $grouped_permissions = $permissions->groupBy('group');
        
        return view('admin.permissions.index', compact('grouped_permissions'));
    }

    public function create()
    {
        return view('admin.permissions.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:permissions,name',
            'display_name' => 'required|string|max:100',
            'group' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
        ]);

        // 确保权限名称格式正确
        $validated['name'] = Str::lower(str_replace(' ', '.', $validated['name']));

        Permission::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => '权限创建成功'
            ]);
        }

        return redirect()->route('admin.permissions.index')
                        ->with('success', '权限创建成功');
    }

    public function show(Permission $permission)
    {
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'permission' => $permission
            ]);
        }

        $permission->load(['roles']);
        return view('admin.permissions.show', compact('permission'));
    }

    public function edit(Permission $permission)
    {
        return view('admin.permissions.edit', compact('permission'));
    }

    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate([
            'display_name' => 'required|string|max:100',
            'group' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
        ]);

        // 系统权限不允许修改名称
        if (!$permission->is_system && $request->has('name')) {
            $validated['name'] = Str::lower(str_replace(' ', '.', $request->name));
            $request->validate([
                'name' => 'required|string|max:100|unique:permissions,name,' . $permission->id,
            ]);
        }

        $permission->update($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => '权限更新成功'
            ]);
        }

        return redirect()->route('admin.permissions.index')
                        ->with('success', '权限更新成功');
    }

    public function destroy(Permission $permission)
    {
        // 检查是否为系统权限
        if ($permission->is_system) {
            return response()->json([
                'success' => false,
                'message' => '系统权限不能删除'
            ], 400);
        }

        // 检查是否有角色在使用此权限
        if ($permission->roles()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => '该权限已被角色使用，无法删除'
            ], 400);
        }

        $permission->delete();

        return response()->json([
            'success' => true,
            'message' => '权限删除成功'
        ]);
    }

    public function sync()
    {
        $systemPermissions = [
            // 用户管理
            [
                'name' => 'users.view',
                'display_name' => '查看用户',
                'group' => '用户管理',
                'description' => '查看用户列表和详情',
                'is_system' => true
            ],
            [
                'name' => 'users.edit',
                'display_name' => '编辑用户',
                'group' => '用户管理',
                'description' => '编辑用户信息',
                'is_system' => true
            ],
            [
                'name' => 'users.delete',
                'display_name' => '删除用户',
                'group' => '用户管理',
                'description' => '删除用户账户',
                'is_system' => true
            ],
            [
                'name' => 'users.export',
                'display_name' => '导出用户',
                'group' => '用户管理',
                'description' => '导出用户数据',
                'is_system' => true
            ],

            // 打卡管理
            [
                'name' => 'checkins.view',
                'display_name' => '查看打卡',
                'group' => '打卡管理',
                'description' => '查看打卡记录',
                'is_system' => true
            ],
            [
                'name' => 'checkins.edit',
                'display_name' => '编辑打卡',
                'group' => '打卡管理',
                'description' => '编辑打卡记录',
                'is_system' => true
            ],
            [
                'name' => 'checkins.export',
                'display_name' => '导出打卡',
                'group' => '打卡管理',
                'description' => '导出打卡数据',
                'is_system' => true
            ],

            // 文档管理
            [
                'name' => 'documents.view',
                'display_name' => '查看文档',
                'group' => '文档管理',
                'description' => '查看文档列表',
                'is_system' => true
            ],
            [
                'name' => 'documents.create',
                'display_name' => '创建文档',
                'group' => '文档管理',
                'description' => '创建新文档',
                'is_system' => true
            ],
            [
                'name' => 'documents.edit',
                'display_name' => '编辑文档',
                'group' => '文档管理',
                'description' => '编辑文档内容',
                'is_system' => true
            ],
            [
                'name' => 'documents.delete',
                'display_name' => '删除文档',
                'group' => '文档管理',
                'description' => '删除文档',
                'is_system' => true
            ],

            // 消息管理
            [
                'name' => 'messages.view',
                'display_name' => '查看消息',
                'group' => '消息管理',
                'description' => '查看聊天消息',
                'is_system' => true
            ],
            [
                'name' => 'messages.delete',
                'display_name' => '删除消息',
                'group' => '消息管理',
                'description' => '删除聊天消息',
                'is_system' => true
            ],

            // 系统管理
            [
                'name' => 'system.manage',
                'display_name' => '系统管理',
                'group' => '系统管理',
                'description' => '管理系统设置、角色权限',
                'is_system' => true
            ],
            [
                'name' => 'admins.view',
                'display_name' => '查看管理员',
                'group' => '系统管理',
                'description' => '查看管理员列表',
                'is_system' => true
            ],
            [
                'name' => 'admins.create',
                'display_name' => '创建管理员',
                'group' => '系统管理',
                'description' => '创建新管理员',
                'is_system' => true
            ],
            [
                'name' => 'roles.manage',
                'display_name' => '角色管理',
                'group' => '系统管理',
                'description' => '管理角色和权限',
                'is_system' => true
            ],
        ];

        $created = 0;
        $updated = 0;

        foreach ($systemPermissions as $permissionData) {
            $permission = Permission::updateOrCreate(
                ['name' => $permissionData['name']],
                $permissionData
            );

            if ($permission->wasRecentlyCreated) {
                $created++;
            } else {
                $updated++;
            }
        }

        return response()->json([
            'success' => true,
            'message' => "权限同步完成，创建 {$created} 个，更新 {$updated} 个"
        ]);
    }
}