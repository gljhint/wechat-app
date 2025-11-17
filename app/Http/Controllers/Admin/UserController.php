<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WechatUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = WechatUser::query();

        // 搜索
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nickname', 'like', "%{$search}%")
                  ->orWhere('real_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // 部门筛选
        if ($request->filled('department')) {
            $query->where('department', $request->department);
        }

        // 状态筛选
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // 角色筛选
        if ($request->filled('role')) {
            if ($request->role === 'unassigned') {
                $query->whereNull('role');
            } else {
                $query->where('role', $request->role);
            }
        }

        $users = $query->latest()->paginate(20);

        // 获取所有部门用于筛选
        $departments = WechatUser::whereNotNull('department')
                                ->distinct()
                                ->pluck('department')
                                ->filter();

        return view('admin.users.index', compact('users', 'departments'));
    }

    public function show(WechatUser $user)
    {
        $user->load(['checkins' => function($query) {
            $query->latest()->take(10);
        }, 'documents' => function($query) {
            $query->latest()->take(10);
        }]);

        return view('admin.users.show', compact('user'));
    }

    public function edit(WechatUser $user)
    {
        return view('admin.users.edit', compact('user'));
    }

    public function update(Request $request, WechatUser $user)
    {
        $validated = $request->validate([
            'real_name' => 'nullable|string|max:50',
            'employee_id' => 'nullable|string|max:20|unique:wechat_users,employee_id,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'department' => 'nullable|string|max:50',
            'position' => 'nullable|string|max:50',
            'status' => 'required|boolean',
            'role' => 'nullable|in:' . implode(',', WechatUser::getAvailableRoles()),
        ]);

        $user->update($validated);

        return redirect()->route('admin.users.index')
                        ->with('success', '用户信息更新成功');
    }

    public function destroy(WechatUser $user)
    {
        // 软删除或物理删除
        $user->delete();

        return response()->json([
            'success' => true,
            'message' => '用户删除成功'
        ]);
    }

    public function toggleStatus(Request $request, WechatUser $user)
    {
        $request->validate([
            'status' => 'required|boolean'
        ]);

        $user->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => $request->status ? '用户已启用' : '用户已禁用'
        ]);
    }

    public function assignRole(Request $request, WechatUser $user)
    {
        $request->validate([
            'role' => 'required|in:' . implode(',', WechatUser::getAvailableRoles()),
        ]);

        $user->update(['role' => $request->role]);

        return response()->json([
            'success' => true,
            'message' => '角色分配成功'
        ]);
    }

    public function removeRole(WechatUser $user)
    {
        $user->update(['role' => null]);

        return response()->json([
            'success' => true,
            'message' => '角色已移除'
        ]);
    }

    public function bulk(Request $request)
    {
        $request->validate([
            'action' => 'required|in:enable,disable,export,assign_role',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:wechat_users,id',
            'role' => 'required_if:action,assign_role|nullable|in:' . implode(',', WechatUser::getAvailableRoles()),
        ]);

        $users = WechatUser::whereIn('id', $request->user_ids);

        switch ($request->action) {
            case 'enable':
                $users->update(['status' => 1]);
                $message = '批量启用成功';
                break;
            case 'disable':
                $users->update(['status' => 0]);
                $message = '批量禁用成功';
                break;
            case 'assign_role':
                $users->update(['role' => $request->role]);
                $message = '批量分配角色成功';
                break;
            case 'export':
                return $this->exportUsers($users->get());
        }

        return response()->json([
            'success' => true,
            'message' => $message
        ]);
    }

    private function exportUsers($users)
    {
        $csvData = [];
        $csvData[] = ['姓名', '工号', '手机号', '邮箱', '部门', '职位', '角色', '状态', '注册时间', '最后登录'];

        foreach ($users as $user) {
            $csvData[] = [
                $user->real_name ?: $user->nickname,
                $user->employee_id ?: '',
                $user->phone ?: '',
                $user->email ?: '',
                $user->department ?: '',
                $user->position ?: '',
                $user->role_name,
                $user->status ? '正常' : '禁用',
                $user->created_at->format('Y-m-d H:i:s'),
                $user->last_login_at ? $user->last_login_at->format('Y-m-d H:i:s') : ''
            ];
        }

        $filename = '用户数据_' . date('Y-m-d_H-i-s') . '.csv';
        
        $output = fopen('php://temp', 'w');
        fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF)); // UTF-8 BOM
        
        foreach ($csvData as $row) {
            fputcsv($output, $row);
        }
        
        rewind($output);
        $csv = stream_get_contents($output);
        fclose($output);

        return Response::make($csv, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
