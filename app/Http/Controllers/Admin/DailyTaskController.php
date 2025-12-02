<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DailyTask;
use App\Models\BibleReadingExplanation;
use App\Models\BibleExplanationVote;
use App\Services\OpenRouterService;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DailyTaskController extends Controller
{
    public function index(Request $request)
    {
        $query = DailyTask::query();

        // 日期筛选
        if ($request->has('date') && $request->date) {
            $query->whereDate('task_date', $request->date);
        }

        // 日期范围筛选
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('task_date', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('task_date', '<=', $request->end_date);
        }

        // 状态筛选
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $tasks = $query->withCount(['checkins', 'completedCheckins'])
                      ->latest('task_date')
                      ->paginate(20);

        // 统计数据
        $today = Carbon::today()->toDateString();
        $todayTask = DailyTask::withCount(['checkins', 'completedCheckins'])
            ->where('task_date', $today)
            ->first();
        $totalTasks = DailyTask::count();
        $activeTasks = DailyTask::where('status', 1)->count();

        return view('admin.daily-tasks.index', compact('tasks', 'todayTask', 'totalTasks', 'activeTasks'));
    }

    public function create()
    {
        return view('admin.daily-tasks.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_date' => 'required|date|unique:daily_tasks,task_date',
            'bible_reading' => 'required|string',
            'devotional' => 'required|string',
            'status' => 'required|boolean',
        ], [
            'task_date.unique' => '该日期已存在学习任务，请选择其他日期',
        ]);

        DailyTask::create($validated);

        return redirect()->route('admin.daily-tasks.index')
                        ->with('success', '学习任务创建成功');
    }

    public function show(DailyTask $dailyTask)
    {
        $dailyTask->loadCount(['checkins', 'completedCheckins']);
        $dailyTask->load(['checkins.user' => function($query) {
            $query->select('id', 'nickname', 'real_name', 'avatar_url');
        }]);

        return view('admin.daily-tasks.show', compact('dailyTask'));
    }

    public function edit(DailyTask $dailyTask)
    {
        return view('admin.daily-tasks.edit', compact('dailyTask'));
    }

    public function update(Request $request, DailyTask $dailyTask)
    {
        $validated = $request->validate([
            'task_date' => 'required|date|unique:daily_tasks,task_date,' . $dailyTask->id,
            'bible_reading' => 'required|string',
            'devotional' => 'required|string',
            'status' => 'required|boolean',
        ], [
            'task_date.unique' => '该日期已存在学习任务，请选择其他日期',
        ]);

        $dailyTask->update($validated);

        return redirect()->route('admin.daily-tasks.index')
                        ->with('success', '学习任务更新成功');
    }

    public function destroy(DailyTask $dailyTask)
    {
        // 检查是否有打卡记录
        if ($dailyTask->checkins()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => '该任务已有用户打卡记录，无法删除'
            ], 400);
        }

        $dailyTask->delete();

        return response()->json([
            'success' => true,
            'message' => '学习任务删除成功'
        ]);
    }

    /**
     * 批量创建任务
     */
    public function batchCreate(Request $request)
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'bible_reading' => 'required|string',
            'devotional' => 'required|string',
        ]);

        $start = Carbon::parse($validated['start_date']);
        $end = Carbon::parse($validated['end_date']);

        $created = 0;
        while ($start->lte($end)) {
            $exists = DailyTask::where('task_date', $start->toDateString())->exists();

            if (!$exists) {
                DailyTask::create([
                    'task_date' => $start->toDateString(),
                    'bible_reading' => $validated['bible_reading'],
                    'devotional' => $validated['devotional'],
                    'status' => 1,
                ]);
                $created++;
            }

            $start->addDay();
        }

        return response()->json([
            'success' => true,
            'message' => "成功创建 {$created} 个学习任务"
        ]);
    }

    /**
     * 生成AI解释
     */
    public function generateExplanation(DailyTask $dailyTask, OpenRouterService $openRouterService)
    {
        try {
            // 检查是否已经有解释
            if ($dailyTask->explanation) {
                return response()->json([
                    'success' => false,
                    'message' => '该任务已有AI解释，请先删除旧的解释再重新生成'
                ], 400);
            }

            // 调用OpenRouter API生成解释
            $result = $openRouterService->generateBibleExplanation($dailyTask->bible_reading);

            if (!$result['success']) {
                return response()->json([
                    'success' => false,
                    'message' => 'AI解释生成失败：' . $result['error_message']
                ], 500);
            }

            // 保存解释到数据库
            $explanation = BibleReadingExplanation::create([
                'daily_task_id' => $dailyTask->id,
                'explanation' => $result['explanation'],
                'model_used' => $result['model_used'],
                'status' => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'AI解释生成成功',
                'data' => $explanation
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '生成AI解释时发生错误：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 重新生成AI解释
     */
    public function regenerateExplanation(DailyTask $dailyTask, OpenRouterService $openRouterService)
    {
        try {
            // 删除旧的解释
            if ($dailyTask->explanation) {
                $dailyTask->explanation->delete();
            }

            // 调用OpenRouter API生成解释
            $result = $openRouterService->generateBibleExplanation($dailyTask->bible_reading);

            if (!$result['success']) {
                // 保存失败记录
                BibleReadingExplanation::create([
                    'daily_task_id' => $dailyTask->id,
                    'status' => 0,
                    'error_message' => $result['error_message'],
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'AI解释生成失败：' . $result['error_message']
                ], 500);
            }

            // 保存新的解释
            $explanation = BibleReadingExplanation::create([
                'daily_task_id' => $dailyTask->id,
                'explanation' => $result['explanation'],
                'model_used' => $result['model_used'],
                'status' => 1,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'AI解释重新生成成功',
                'data' => $explanation
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '重新生成AI解释时发生错误：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 删除AI解释
     */
    public function deleteExplanation(DailyTask $dailyTask)
    {
        try {
            if (!$dailyTask->explanation) {
                return response()->json([
                    'success' => false,
                    'message' => '该任务没有AI解释'
                ], 404);
            }

            $dailyTask->explanation->delete();

            return response()->json([
                'success' => true,
                'message' => 'AI解释删除成功'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '删除AI解释时发生错误：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 对AI解释投票（点赞或踩）
     */
    public function voteExplanation(Request $request, BibleReadingExplanation $explanation)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:wechat_users,id',
                'vote_type' => 'required|in:1,-1', // 1=点赞, -1=踩
            ]);

            DB::beginTransaction();

            // 检查用户是否已经投过票
            $existingVote = BibleExplanationVote::where('explanation_id', $explanation->id)
                ->where('user_id', $validated['user_id'])
                ->first();

            if ($existingVote) {
                // 如果已经投过相同的票，取消投票
                if ($existingVote->vote_type == $validated['vote_type']) {
                    // 更新统计
                    if ($existingVote->vote_type == 1) {
                        $explanation->decrement('likes_count');
                    } else {
                        $explanation->decrement('dislikes_count');
                    }
                    $existingVote->delete();

                    DB::commit();
                    return response()->json([
                        'success' => true,
                        'message' => '取消投票成功',
                        'data' => [
                            'likes_count' => $explanation->fresh()->likes_count,
                            'dislikes_count' => $explanation->fresh()->dislikes_count,
                        ]
                    ]);
                } else {
                    // 如果投了不同的票，更换投票
                    // 减少旧的计数
                    if ($existingVote->vote_type == 1) {
                        $explanation->decrement('likes_count');
                    } else {
                        $explanation->decrement('dislikes_count');
                    }

                    // 增加新的计数
                    if ($validated['vote_type'] == 1) {
                        $explanation->increment('likes_count');
                    } else {
                        $explanation->increment('dislikes_count');
                    }

                    // 更新投票记录
                    $existingVote->update(['vote_type' => $validated['vote_type']]);
                }
            } else {
                // 创建新的投票
                BibleExplanationVote::create([
                    'explanation_id' => $explanation->id,
                    'user_id' => $validated['user_id'],
                    'vote_type' => $validated['vote_type'],
                ]);

                // 更新统计
                if ($validated['vote_type'] == 1) {
                    $explanation->increment('likes_count');
                } else {
                    $explanation->increment('dislikes_count');
                }
            }

            $explanation = $explanation->fresh();

            // 检查是否需要自动重新生成（踩的数量超过5）
            $shouldRegenerate = false;
            if ($explanation->shouldRegenerate()) {
                $shouldRegenerate = true;
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => '投票成功',
                'data' => [
                    'likes_count' => $explanation->likes_count,
                    'dislikes_count' => $explanation->dislikes_count,
                    'should_regenerate' => $shouldRegenerate,
                ]
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => '投票失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取用户对某个解释的投票状态
     */
    public function getUserVote(Request $request, BibleReadingExplanation $explanation)
    {
        try {
            $userId = $request->input('user_id');

            if (!$userId) {
                return response()->json([
                    'success' => false,
                    'message' => '缺少user_id参数'
                ], 400);
            }

            $vote = BibleExplanationVote::where('explanation_id', $explanation->id)
                ->where('user_id', $userId)
                ->first();

            return response()->json([
                'success' => true,
                'data' => [
                    'has_voted' => $vote ? true : false,
                    'vote_type' => $vote ? $vote->vote_type : null,
                    'likes_count' => $explanation->likes_count,
                    'dislikes_count' => $explanation->dislikes_count,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '获取投票状态失败：' . $e->getMessage()
            ], 500);
        }
    }
    
}
