<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::withCount(['admins', 'permissions'])->paginate(15);

        return view('admin.roles.index', compact('roles'));
    }

    public function create()
    {
        return view('admin.roles.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:roles,name',
            'display_name' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        // 确保角色名称是小写且使用下划线
        $validated['name'] = Str::slug($validated['name'], '_');

        Role::create($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => '角色创建成功'
            ]);
        }

        return redirect()->route('admin.roles.index')
                        ->with('success', '角色创建成功');
    }

    public function show(Role $role)
    {
        $role->load(['permissions', 'admins']);
        
        return view('admin.roles.show', compact('role'));
    }

    public function edit(Role $role)
    {
        $role->load(['permissions', 'admins']);
        
        // 获取所有权限，按分组
        $grouped_permissions = Permission::all()->groupBy('group');
        
        return view('admin.roles.edit', compact('role', 'grouped_permissions'));
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'display_name' => 'required|string|max:100',
            'description' => 'nullable|string|max:255',
        ]);

        // 系统内置角色不允许修改名称
        if (!in_array($role->name, ['super-admin', 'admin', 'hr', 'employee'])) {
            $validated['name'] = Str::slug($request->name ?? $role->name, '_');
            $request->validate([
                'name' => 'required|string|max:50|unique:roles,name,' . $role->id,
            ]);
        }

        $role->update($validated);

        return redirect()->route('admin.roles.index')
                        ->with('success', '角色更新成功');
    }

    public function destroy(Role $role)
    {
        // 检查是否为系统内置角色
        if (in_array($role->name, ['super-admin', 'admin', 'hr', 'employee'])) {
            return response()->json([
                'success' => false,
                'message' => '系统内置角色不能删除'
            ], 400);
        }

        // 检查是否有管理员在使用此角色
        if ($role->admins()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => '该角色下还有管理员，无法删除'
            ], 400);
        }

        $role->delete();

        return response()->json([
            'success' => true,
            'message' => '角色删除成功'
        ]);
    }

    public function updatePermissions(Request $request, Role $role)
    {
        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id'
        ]);

        // 超级管理员角色不允许修改权限
        if ($role->name === 'super-admin') {
            return response()->json([
                'success' => false,
                'message' => '超级管理员角色权限不可修改'
            ], 400);
        }

        $role->permissions()->sync($request->permissions ?? []);

        return response()->json([
            'success' => true,
            'message' => '权限设置成功'
        ]);
    }

    public function getPermissions(Role $role)
    {
        // 获取所有权限，按分组
        $allPermissions = Permission::all()->groupBy('group');
        
        // 获取当前角色的权限ID
        $rolePermissions = $role->permissions->pluck('id')->toArray();

        return response()->json([
            'grouped_permissions' => $allPermissions,
            'role_permissions' => $rolePermissions
        ]);
    }
}
