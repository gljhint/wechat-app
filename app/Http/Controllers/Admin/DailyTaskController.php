<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DailyTask;
use Illuminate\Http\Request;
use Carbon\Carbon;

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
}
