<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\WechatUser;
use App\Models\DailyTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class SystemController extends Controller
{
    /**
     * 获取用户列表（用于角色分配）
     */
    public function getUserList(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $currentUser = WechatUser::find($userId);

        // 检查权限
        if (!$currentUser->hasPermission('system.settings')) {
            return response()->json([
                'code' => 403,
                'message' => '没有权限'
            ], 403);
        }

        $request->validate([
            'search' => 'nullable|string|max:50',
            'role' => 'nullable|string',
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:50',
        ]);

        $query = WechatUser::where('status', WechatUser::STATUS_ACTIVE);

        // 搜索过滤
        if ($request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('nickname', 'like', "%{$search}%")
                  ->orWhere('real_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%");
            });
        }

        // 角色过滤
        if ($request->role) {
            $query->where('role', $request->role);
        }

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        $total = $query->count();
        $offset = ($page - 1) * $limit;

        $users = $query->offset($offset)
                      ->limit($limit)
                      ->orderBy('created_at', 'desc')
                      ->get()
                      ->map(function($user) {
                          return [
                              'id' => $user->id,
                              'nickname' => $user->nickname,
                              'real_name' => $user->real_name,
                              'avatar_url' => $user->avatar_url,
                              'role' => $user->role,
                              'role_name' => $user->role_name,
                              'phone' => $user->phone,
                              'employee_id' => $user->employee_id,
                              'created_at' => $user->created_at,
                          ];
                      });

        return response()->json([
            'code' => 200,
            'data' => [
                'users' => $users,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'has_more' => ($offset + $limit) < $total
                ]
            ]
        ]);
    }

    /**
     * 分配用户角色
     */
    public function assignRole(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $currentUser = WechatUser::find($userId);

        // 检查权限
        if (!$currentUser->hasPermission('system.settings')) {
            return response()->json([
                'code' => 403,
                'message' => '没有权限'
            ], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:wechat_users,id',
            'role' => 'required|in:admin,ministry,member,pre_member,seeker,external'
        ]);

        $targetUser = WechatUser::find($request->user_id);

        if (!$targetUser) {
            return response()->json([
                'code' => 404,
                'message' => '用户不存在'
            ], 404);
        }

        // 安全检查：禁止修改自己的角色
        if ($targetUser->id === $currentUser->id) {
            return response()->json([
                'code' => 403,
                'message' => '不能修改自己的角色'
            ], 403);
        }

        // 安全检查：非admin不能操作admin用户
        if ($currentUser->role !== WechatUser::ROLE_ADMIN && $targetUser->role === WechatUser::ROLE_ADMIN) {
            return response()->json([
                'code' => 403,
                'message' => '无权操作管理员用户'
            ], 403);
        }

        // 安全检查：非admin不能将用户设置为admin
        if ($currentUser->role !== WechatUser::ROLE_ADMIN && $request->role === WechatUser::ROLE_ADMIN) {
            return response()->json([
                'code' => 403,
                'message' => '无权设置管理员角色'
            ], 403);
        }

        try {
            $oldRole = $targetUser->role;
            $targetUser->role = $request->role;
            $targetUser->save();

            // 记录操作日志
            Log::info('微信端角色变更', [
                'operator_id' => $currentUser->id,
                'operator_name' => $currentUser->nickname,
                'target_user_id' => $targetUser->id,
                'target_user_name' => $targetUser->nickname,
                'old_role' => $oldRole,
                'new_role' => $request->role,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'code' => 200,
                'message' => '角色分配成功',
                'data' => [
                    'user_id' => $targetUser->id,
                    'old_role' => $oldRole,
                    'new_role' => $request->role,
                    'role_name' => WechatUser::$roleNames[$request->role] ?? $request->role
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('角色分配失败: ' . $e->getMessage());
            return response()->json([
                'code' => 500,
                'message' => '操作失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 创建学习任务
     */
    public function createTask(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $currentUser = WechatUser::find($userId);

        // 检查权限
        if (!$currentUser->hasPermission('system.settings')) {
            return response()->json([
                'code' => 403,
                'message' => '没有权限'
            ], 403);
        }

        $request->validate([
            'task_date' => 'required|date|after_or_equal:today',
            'bible_reading' => 'required|string|max:500',
            'devotional' => 'required|string|max:1000',
            'status' => 'nullable|boolean',
        ]);

        try {
            // 检查该日期是否已有任务
            $existing = DailyTask::where('task_date', $request->task_date)->first();

            if ($existing) {
                return response()->json([
                    'code' => 400,
                    'message' => '该日期已存在学习任务'
                ], 400);
            }

            $task = DailyTask::create([
                'task_date' => $request->task_date,
                'bible_reading' => $request->bible_reading,
                'devotional' => $request->devotional,
                'status' => $request->status ?? 1,
            ]);

            // 记录操作日志
            Log::info('微信端创建学习任务', [
                'operator_id' => $currentUser->id,
                'operator_name' => $currentUser->nickname,
                'task_id' => $task->id,
                'task_date' => $request->task_date,
                'ip' => $request->ip(),
            ]);

            return response()->json([
                'code' => 200,
                'message' => '学习任务创建成功',
                'data' => $task
            ]);
        } catch (\Exception $e) {
            Log::error('创建学习任务失败: ' . $e->getMessage());
            return response()->json([
                'code' => 500,
                'message' => '操作失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取学习任务列表
     */
    public function getTaskList(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $currentUser = WechatUser::find($userId);

        // 检查权限
        if (!$currentUser->hasPermission('system.settings')) {
            return response()->json([
                'code' => 403,
                'message' => '没有权限'
            ], 403);
        }

        $request->validate([
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'status' => 'nullable|boolean',
        ]);

        $query = DailyTask::query();

        // 日期范围过滤
        if ($request->start_date) {
            $query->whereDate('task_date', '>=', $request->start_date);
        }
        if ($request->end_date) {
            $query->whereDate('task_date', '<=', $request->end_date);
        }

        // 状态过滤
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $tasks = $query->orderBy('task_date', 'desc')
                      ->limit(30)
                      ->get();

        return response()->json([
            'code' => 200,
            'data' => $tasks
        ]);
    }

    /**
     * 获取角色统计信息
     */
    public function getRoleStatistics(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $currentUser = WechatUser::find($userId);

        // 检查权限
        if (!$currentUser->hasPermission('system.settings')) {
            return response()->json([
                'code' => 403,
                'message' => '没有权限'
            ], 403);
        }

        $statistics = DB::table('wechat_users')
            ->select('role', DB::raw('count(*) as count'))
            ->where('status', WechatUser::STATUS_ACTIVE)
            ->groupBy('role')
            ->get()
            ->mapWithKeys(function($item) {
                return [$item->role => $item->count];
            })
            ->toArray();

        // 补充所有角色（包括没有用户的角色）
        $allRoles = [];
        foreach (WechatUser::$roleNames as $role => $name) {
            $allRoles[] = [
                'role' => $role,
                'name' => $name,
                'count' => $statistics[$role] ?? 0
            ];
        }

        return response()->json([
            'code' => 200,
            'data' => $allRoles
        ]);
    }
}
