<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WechatUser;
use App\Models\WechatPermission;
use App\Models\WechatRolePermission;

class WechatRolePermissionController extends Controller
{
    /**
     * 显示角色权限管理页面
     */
    public function index()
    {
        // 获取所有角色
        $roles = WechatUser::$roleNames;

        // 获取所有权限（按分组）
        $permissions = WechatPermission::active()
            ->ordered()
            ->get()
            ->groupBy('group');

        // 获取每个角色已分配的权限
        $rolePermissions = [];
        foreach (array_keys($roles) as $role) {
            $rolePermissions[$role] = WechatRolePermission::getPermissionIdsByRole($role);
        }

        return view('admin.wechat-roles.index', compact('roles', 'permissions', 'rolePermissions'));
    }

    /**
     * 显示单个角色的权限管理
     */
    public function show($role)
    {
        if (!isset(WechatUser::$roleNames[$role])) {
            return redirect()->route('admin.wechat-roles.index')
                ->with('error', '角色不存在');
        }

        $roleName = WechatUser::$roleNames[$role];

        // 获取所有权限（按分组）
        $permissions = WechatPermission::active()
            ->ordered()
            ->get()
            ->groupBy('group');

        // 获取当前角色已分配的权限
        $assignedPermissions = WechatRolePermission::getPermissionIdsByRole($role);

        return view('admin.wechat-roles.show', compact('role', 'roleName', 'permissions', 'assignedPermissions'));
    }

    /**
     * 更新角色权限
     */
    public function update(Request $request, $role)
    {
        if (!isset(WechatUser::$roleNames[$role])) {
            return response()->json([
                'success' => false,
                'message' => '角色不存在'
            ], 404);
        }

        $request->validate([
            'permissions' => 'nullable|array',
            'permissions.*' => 'exists:wechat_permissions,id'
        ]);

        $permissionIds = $request->input('permissions', []);

        // 同步角色权限
        WechatRolePermission::syncRolePermissions($role, $permissionIds);

        return response()->json([
            'success' => true,
            'message' => '权限更新成功'
        ]);
    }

    /**
     * 获取角色权限（API）
     */
    public function getPermissions($role)
    {
        if (!isset(WechatUser::$roleNames[$role])) {
            return response()->json([
                'success' => false,
                'message' => '角色不存在'
            ], 404);
        }

        $permissions = WechatRolePermission::getPermissionIdsByRole($role);

        return response()->json([
            'success' => true,
            'data' => $permissions
        ]);
    }

    /**
     * 批量更新所有角色权限
     */
    public function batchUpdate(Request $request)
    {
        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'array',
        ]);

        foreach ($request->input('roles', []) as $role => $permissions) {
            if (!isset(WechatUser::$roleNames[$role])) {
                continue;
            }

            WechatRolePermission::syncRolePermissions($role, $permissions);
        }

        return response()->json([
            'success' => true,
            'message' => '所有角色权限更新成功'
        ]);
    }

    /**
     * 复制角色权限
     */
    public function copy(Request $request)
    {
        $request->validate([
            'from_role' => 'required|string',
            'to_role' => 'required|string',
        ]);

        $fromRole = $request->input('from_role');
        $toRole = $request->input('to_role');

        if (!isset(WechatUser::$roleNames[$fromRole]) || !isset(WechatUser::$roleNames[$toRole])) {
            return response()->json([
                'success' => false,
                'message' => '角色不存在'
            ], 404);
        }

        // 获取源角色的权限
        $permissions = WechatRolePermission::getPermissionIdsByRole($fromRole);

        // 复制到目标角色
        WechatRolePermission::syncRolePermissions($toRole, $permissions);

        return response()->json([
            'success' => true,
            'message' => '权限复制成功'
        ]);
    }
}
