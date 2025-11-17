<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = Admin::with('roles');

        // 搜索
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('username', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // 状态筛选
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $admins = $query->latest()->paginate(20);
        
        return view('admin.admins.index', compact('admins'));
    }

    public function create()
    {
        $roles = Role::all();
        return view('admin.admins.create', compact('roles'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'username' => 'required|string|max:50|unique:admins,username',
            'email' => 'required|email|max:100|unique:admins,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'nullable|string|max:20',
            'status' => 'required|boolean',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id'
        ]);

        $validated['password'] = Hash::make($validated['password']);
        
        $admin = Admin::create($validated);
        
        // 分配角色
        if (!empty($validated['roles'])) {
            $admin->roles()->sync($validated['roles']);
        }

        return redirect()->route('admin.admins.index')
                        ->with('success', '管理员创建成功');
    }

    public function show(Admin $admin)
    {
        $admin->load(['roles.permissions']);
        return view('admin.admins.show', compact('admin'));
    }

    public function edit(Admin $admin)
    {
        $roles = Role::all();
        $admin->load('roles');
        return view('admin.admins.edit', compact('admin', 'roles'));
    }

    public function update(Request $request, Admin $admin)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'username' => ['required', 'string', 'max:50', Rule::unique('admins')->ignore($admin->id)],
            'email' => ['required', 'email', 'max:100', Rule::unique('admins')->ignore($admin->id)],
            'phone' => 'nullable|string|max:20',
            'status' => 'required|boolean',
            'roles' => 'array',
            'roles.*' => 'exists:roles,id'
        ]);

        // 如果提供了新密码
        if ($request->filled('password')) {
            $request->validate([
                'password' => 'required|string|min:6|confirmed'
            ]);
            $validated['password'] = Hash::make($request->password);
        }

        $admin->update($validated);
        
        // 更新角色
        $admin->roles()->sync($validated['roles'] ?? []);

        return redirect()->route('admin.admins.index')
                        ->with('success', '管理员信息更新成功');
    }

    public function destroy(Admin $admin)
    {
        // 不能删除自己
        if ($admin->id === auth('admin')->id()) {
            return response()->json([
                'success' => false,
                'message' => '不能删除自己的账户'
            ], 400);
        }

        // 不能删除超级管理员
        if ($admin->hasRole('super-admin')) {
            return response()->json([
                'success' => false,
                'message' => '不能删除超级管理员'
            ], 400);
        }

        $admin->delete();

        return response()->json([
            'success' => true,
            'message' => '管理员删除成功'
        ]);
    }

    public function toggleStatus(Request $request, Admin $admin)
    {
        $request->validate([
            'status' => 'required|boolean'
        ]);

        // 不能禁用自己
        if ($admin->id === auth('admin')->id()) {
            return response()->json([
                'success' => false,
                'message' => '不能禁用自己的账户'
            ], 400);
        }

        $admin->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => $request->status ? '管理员已启用' : '管理员已禁用'
        ]);
    }
}