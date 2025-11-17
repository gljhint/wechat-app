<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\WechatUser;
use App\Models\UserCheckin;
use App\Models\DailyTask;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class CheckinController extends Controller
{
    /**
     * 获取今日学习任务和打卡页面
     */
    public function index(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return redirect()->route('wechat.login');
        }

        $user = WechatUser::find($userId);

        // 支持查看指定日期的任务,但不能超过今天
        $viewDate = $request->get('date');
        if ($viewDate) {
            try {
                $targetDate = Carbon::parse($viewDate);
                // 不能查看未来日期
                if ($targetDate->isFuture()) {
                    $targetDate = Carbon::today();
                }
            } catch (\Exception $e) {
                $targetDate = Carbon::today();
            }
        } else {
            $targetDate = Carbon::today();
        }

        $dateString = $targetDate->toDateString();
        $isToday = $targetDate->isToday();

        // 获取该日期的学习任务
        $todayTask = DailyTask::getTaskByDate($dateString);

        // 获取该日期的打卡记录
        $todayCheckin = UserCheckin::where('user_id', $userId)
            ->whereDate('checkin_date', $dateString)
            ->first();

        // 获取本月统计
        $now = Carbon::now();
        $monthStart = $now->copy()->startOfMonth()->toDateString();
        $monthEnd = $now->copy()->endOfMonth()->toDateString();

        $assignedDays = DailyTask::whereBetween('task_date', [$monthStart, $monthEnd])
            ->where('status', 1)
            ->count();

        $completedDays = UserCheckin::where('user_id', $userId)
            ->whereBetween('checkin_date', [$monthStart, $monthEnd])
            ->where('is_completed', 1)
            ->distinct()
            ->count('checkin_date');

        $monthlyStats = [
            'total_days' => $assignedDays,
            'completed_days' => $completedDays,
            'completion_rate' => $assignedDays > 0 ? round(($completedDays / $assignedDays) * 100) : 0,
        ];

        // 获取最近打卡记录
        $recentCheckins = UserCheckin::with('dailyTask')
            ->where('user_id', $userId)
            ->orderBy('checkin_date', 'desc')
            ->limit(10)
            ->get();

        return view('wechat.checkin', compact('user', 'todayTask', 'todayCheckin', 'monthlyStats', 'recentCheckins', 'targetDate', 'isToday'));
    }

    /**
     * 完成学习任务打卡
     */
    public function complete(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => '未登录'
            ], 401);
        }

        $today = today();

        // 获取今日学习任务
        $todayTask = DailyTask::getTodayTask();

        if (!$todayTask) {
            return response()->json([
                'success' => false,
                'message' => '今日暂无学习任务'
            ], 400);
        }

        // 检查是否已完成打卡
        $existingCheckin = UserCheckin::where('user_id', $userId)
            ->whereDate('checkin_date', $today)
            ->first();

        if ($existingCheckin && $existingCheckin->is_completed) {
            return response()->json([
                'success' => false,
                'message' => '今日已完成打卡'
            ], 400);
        }

        try {
            // 创建或更新打卡记录
            $checkin = UserCheckin::updateOrCreate(
                [
                    'user_id' => $userId,
                    'checkin_date' => $today
                ],
                [
                    'daily_task_id' => $todayTask->id,
                    'is_completed' => 1,
                    'completed_at' => now()
                ]
            );

            return response()->json([
                'success' => true,
                'message' => '打卡成功！',
                'data' => $checkin
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '打卡失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取历史打卡记录
     */
    public function history(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return redirect()->route('wechat.auth');
        }

        return view('wechat.checkin-history');
    }

    /**
     * 获取历史打卡数据 (API)
     */
    public function historyData(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => '未登录'
            ], 401);
        }

        $year = $request->get('year', now()->year);
        $month = $request->get('month', now()->month);

        $checkins = UserCheckin::with('dailyTask')
            ->where('user_id', $userId)
            ->whereYear('checkin_date', $year)
            ->whereMonth('checkin_date', $month)
            ->orderBy('checkin_date', 'desc')
            ->get();

        // 计算连续打卡天数(从今天往前推)
        $continuousDays = 0;
        $checkDate = Carbon::today();

        while (true) {
            $dateStr = $checkDate->toDateString();

            // 查询该日期的打卡记录
            $hasCheckin = UserCheckin::where('user_id', $userId)
                ->whereDate('checkin_date', $dateStr)
                ->where('is_completed', 1)
                ->exists();

            if ($hasCheckin) {
                $continuousDays++;
                $checkDate->subDay();
            } else {
                break;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $checkins,
            'continuous_days' => $continuousDays
        ]);
    }

    /**
     * 获取学习任务详情
     */
    public function taskDetail(Request $request, $date)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => '未登录'
            ], 401);
        }

        try {
            $formattedDate = Carbon::parse($date)->toDateString();
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '日期格式不正确'
            ], 422);
        }

        $task = DailyTask::getTaskByDate($formattedDate);

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => '该日期无学习任务'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'task' => $task,
                'checkin' => UserCheckin::where('user_id', $userId)
                    ->whereDate('checkin_date', $formattedDate)
                    ->first()
            ]
        ]);
    }

    /**
     * 补打卡功能
     */
    public function makeup(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => '未登录'
            ], 401);
        }

        // 验证日期参数
        $request->validate([
            'date' => 'required|date_format:Y-m-d|before_or_equal:today'
        ]);

        // 直接使用日期字符串,避免时区转换问题
        $checkinDate = $request->date;

        // 检查该日期是否有学习任务
        $task = DailyTask::getTaskByDate($checkinDate);
        

        if (!$task) {
            return response()->json([
                'success' => false,
                'message' => '该日期没有学习任务，无法打卡'
            ], 400);
        }

        // 检查是否已经打过卡
        $existingCheckin = UserCheckin::where('user_id', $userId)
            ->whereDate('checkin_date', $checkinDate)
            ->first();

        if ($existingCheckin && $existingCheckin->is_completed) {
            return response()->json([
                'success' => false,
                'message' => '该日期已完成打卡'
            ], 400);
        }

        try {
            // 创建或更新打卡记录
            $checkin = UserCheckin::updateOrCreate(
                [
                    'user_id' => $userId,
                    'checkin_date' => $checkinDate
                ],
                [
                    'daily_task_id' => $task->id,
                    'is_completed' => 1,
                    'completed_at' => now()
                ]
            );

            return response()->json([
                'success' => true,
                'message' => '补打卡成功！',
                'data' => $checkin
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '补打卡失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 查看所有用户打卡情况（管理员）
     */
    public function viewAll()
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return redirect()->route('wechat.login');
        }

        return view('wechat.checkin-management');
    }

    /**
     * 获取所有用户打卡数据（API）
     */
    public function getAllCheckinsData(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => '未登录'
            ], 401);
        }

        $year = $request->get('year', now()->year);
        $month = $request->get('month', now()->month);

        // 获取本月所有有角色的用户
        $users = WechatUser::whereNotNull('role')
            ->where('role', '!=', '')
            ->orderBy('nickname')
            ->get();

        // 获取本月打卡数据
        $checkins = UserCheckin::with(['user', 'dailyTask'])
            ->whereYear('checkin_date', $year)
            ->whereMonth('checkin_date', $month)
            ->where('is_completed', 1)
            ->orderBy('checkin_date', 'desc')
            ->get();

        // 按用户分组统计
        $userStats = [];
        foreach ($users as $user) {
            $userCheckins = $checkins->where('user_id', $user->id);

            $userStats[] = [
                'user_id' => $user->id,
                'nickname' => $user->nickname,
                'avatar_url' => $user->avatar_url,
                'real_name' => $user->real_name,
                'checkin_count' => $userCheckins->count(),
                'checkins' => $userCheckins->map(function ($checkin) {
                    return [
                        'id' => $checkin->id,
                        'checkin_date' => $checkin->checkin_date,
                        'completed_at' => $checkin->completed_at,
                        'task_title' => $checkin->dailyTask->title ?? '每日读经',
                        'task_content' => $checkin->dailyTask->content ?? '',
                    ];
                })->values()
            ];
        }

        // 按打卡次数排序
        usort($userStats, function ($a, $b) {
            return $b['checkin_count'] - $a['checkin_count'];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'users' => $userStats,
                'total_users' => count($users),
                'total_checkins' => $checkins->count(),
            ]
        ]);
    }
}