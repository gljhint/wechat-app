<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserCheckin;
use App\Models\WechatUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;

class CheckinController extends Controller
{
    public function index(Request $request)
    {
        $query = UserCheckin::with(['user', 'dailyTask']);

        // 用户筛选
        if ($request->has('user_id') && $request->user_id) {
            $query->where('user_id', $request->user_id);
        }

        // 完成状态筛选
        if ($request->has('is_completed') && $request->is_completed !== '') {
            $query->where('is_completed', $request->is_completed);
        }

        // 日期筛选
        if ($request->has('date') && $request->date) {
            $query->whereDate('checkin_date', $request->date);
        }

        // 日期范围筛选
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('checkin_date', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('checkin_date', '<=', $request->end_date);
        }

        $checkins = $query->latest('checkin_date')->paginate(20);

        // 获取用户列表用于筛选
        $users = WechatUser::select('id', 'nickname', 'real_name')->get();

        // 今日统计数据
        $today = Carbon::today()->toDateString();
        $todayCheckins = UserCheckin::where('checkin_date', $today)->count();
        $todayCompleted = UserCheckin::where('checkin_date', $today)->where('is_completed', 1)->count();
        $todayIncomplete = UserCheckin::where('checkin_date', $today)->where('is_completed', 0)->count();

        return view('admin.checkins.index', compact(
            'checkins', 'users', 'todayCheckins', 'todayCompleted', 'todayIncomplete'
        ));
    }

    public function show(UserCheckin $checkin)
    {
        $checkin->load('user');
        return view('admin.checkins.show', compact('checkin'));
    }

    public function edit(UserCheckin $checkin)
    {
        $checkin->load('user');
        return view('admin.checkins.edit', compact('checkin'));
    }

    public function update(Request $request, UserCheckin $checkin)
    {
        $validated = $request->validate([
            'is_completed' => 'nullable|boolean',
            'remark' => 'nullable|string|max:500',
        ]);

        if (isset($validated['is_completed']) && $validated['is_completed'] && !$checkin->completed_at) {
            $validated['completed_at'] = now();
        }

        $checkin->update($validated);

        return redirect()->route('admin.checkins.index')
                        ->with('success', '打卡记录更新成功');
    }

    public function destroy(UserCheckin $checkin)
    {
        $checkin->delete();

        return response()->json([
            'success' => true,
            'message' => '打卡记录删除成功'
        ]);
    }

    public function statistics(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->get('end_date', Carbon::now()->endOfMonth()->toDateString());

        // 总打卡记录数
        $totalCheckins = UserCheckin::whereBetween('checkin_date', [$startDate, $endDate])->count();

        // 按完成状态统计
        $completedCount = UserCheckin::whereBetween('checkin_date', [$startDate, $endDate])
                                     ->where('is_completed', 1)
                                     ->count();
        $incompleteCount = $totalCheckins - $completedCount;

        // 按日期统计
        $dailyCheckins = UserCheckin::whereBetween('checkin_date', [$startDate, $endDate])
                                  ->selectRaw('checkin_date as date,
                                              count(*) as total,
                                              sum(is_completed) as completed')
                                  ->groupBy('date')
                                  ->orderBy('date')
                                  ->get();

        // 用户打卡排行
        $userRanking = UserCheckin::with('user')
                                ->whereBetween('checkin_date', [$startDate, $endDate])
                                ->where('is_completed', 1)
                                ->selectRaw('user_id, count(*) as checkin_count')
                                ->groupBy('user_id')
                                ->orderByDesc('checkin_count')
                                ->limit(10)
                                ->get();

        return view('admin.checkins.statistics', compact(
            'totalCheckins', 'completedCount', 'incompleteCount', 'dailyCheckins', 'userRanking', 'startDate', 'endDate'
        ));
    }

    public function export(Request $request)
    {
        $query = UserCheckin::with('user');

        // 应用筛选条件
        if ($request->has('user_id') && $request->user_id) {
            $query->where('user_id', $request->user_id);
        }
        if ($request->has('is_completed') && $request->is_completed !== '') {
            $query->where('is_completed', $request->is_completed);
        }
        if ($request->has('start_date') && $request->start_date) {
            $query->whereDate('checkin_date', '>=', $request->start_date);
        }
        if ($request->has('end_date') && $request->end_date) {
            $query->whereDate('checkin_date', '<=', $request->end_date);
        }

        $checkins = $query->latest('checkin_date')->get();

        $csvData = [];
        $csvData[] = ['用户', '日期', '完成状态', '完成时间', '备注'];

        foreach ($checkins as $checkin) {
            $csvData[] = [
                $checkin->user->real_name ?: $checkin->user->nickname,
                $checkin->checkin_date,
                $checkin->is_completed ? '已完成' : '未完成',
                $checkin->completed_at ? $checkin->completed_at->format('Y-m-d H:i:s') : '',
                $checkin->remark ?: ''
            ];
        }

        $filename = '打卡记录_' . date('Y-m-d_H-i-s') . '.csv';

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