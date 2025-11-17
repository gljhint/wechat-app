<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;

/**
 * 消息管理控制器 - 仅统计功能
 *
 * ⚠️ 隐私保护声明:
 * 出于用户隐私保护考虑,聊天消息已采用端到端加密
 * 管理员无法查看具体聊天内容,只能查看统计数据
 * 包括:消息数量、类型分布、活跃用户等聚合数据
 *
 */
class MessageController extends Controller
{

    /**
     * 消息统计 - 仅聚合数据
     * 不涉及具体聊天内容,只显示统计信息
     */
    public function index(Request $request)
    {
        // 获取日期范围,默认为本月
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->get('end_date', Carbon::now()->toDateString());

        // 转换为完整的时间戳范围
        $startDateTime = Carbon::parse($startDate)->startOfDay();
        $endDateTime = Carbon::parse($endDate)->endOfDay();

        // 总消息数
        $totalMessages = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])->count();

        // 按类型统计
        $messagesByType = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                   ->selectRaw('message_type, count(*) as count')
                                   ->groupBy('message_type')
                                   ->get()
                                   ->mapWithKeys(function($item) {
                                       return [$this->getTypeText($item->message_type) => $item->count];
                                   });

        // 按日期统计
        $dailyMessages = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                  ->selectRaw('DATE(created_at) as date, count(*) as count')
                                  ->groupBy('date')
                                  ->orderBy('date')
                                  ->get();

        // 按小时统计(热力图)
        $hourlyMessages = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                   ->selectRaw('HOUR(created_at) as hour, count(*) as count')
                                   ->groupBy('hour')
                                   ->orderBy('hour')
                                   ->pluck('count', 'hour');

        // 活跃用户排行(只显示昵称和消息数,不显示内容)
        $activeUsers = ChatMessage::with('fromUser:id,nickname')
                                ->whereBetween('created_at', [$startDateTime, $endDateTime])
                                ->selectRaw('from_user_id, count(*) as message_count')
                                ->groupBy('from_user_id')
                                ->orderByDesc('message_count')
                                ->limit(10)
                                ->get();

        // 已读率统计
        $readRate = [
            'total' => ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])->count(),
            'read' => ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                ->where('is_read', ChatMessage::READ)
                                ->count(),
        ];
        $readRate['rate'] = $readRate['total'] > 0
            ? round(($readRate['read'] / $readRate['total']) * 100, 2)
            : 0;

        // 撤回率统计
        $recallRate = [
            'total' => ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])->count(),
            'recalled' => ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                    ->where('is_recalled', ChatMessage::RECALLED)
                                    ->count(),
        ];
        $recallRate['rate'] = $recallRate['total'] > 0
            ? round(($recallRate['recalled'] / $recallRate['total']) * 100, 2)
            : 0;

        // 会话对数(去重统计有多少对用户在聊天)
        $conversationCount = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                      ->selectRaw('LEAST(from_user_id, to_user_id) as user1, GREATEST(from_user_id, to_user_id) as user2')
                                      ->distinct()
                                      ->count();

        return view('admin.messages.statistics', compact(
            'totalMessages',
            'messagesByType',
            'dailyMessages',
            'hourlyMessages',
            'activeUsers',
            'readRate',
            'recallRate',
            'conversationCount',
            'startDate',
            'endDate'
        ));
    }

    /**
     * 导出统计报表(不含聊天内容)
     */
    public function exportStatistics(Request $request)
    {
        $startDate = $request->get('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->get('end_date', Carbon::now()->toDateString());

        // 转换为完整的时间戳范围
        $startDateTime = Carbon::parse($startDate)->startOfDay();
        $endDateTime = Carbon::parse($endDate)->endOfDay();

        $csvData = [];
        $csvData[] = ['聊天统计报表'];
        $csvData[] = ['统计周期', $startDate . ' 至 ' . $endDate];
        $csvData[] = [];

        // 总体统计
        $totalMessages = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])->count();
        $csvData[] = ['总消息数', $totalMessages];

        // 按类型统计
        $csvData[] = [];
        $csvData[] = ['消息类型统计'];
        $csvData[] = ['类型', '数量', '占比'];

        $messagesByType = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                   ->selectRaw('message_type, count(*) as count')
                                   ->groupBy('message_type')
                                   ->get();

        foreach ($messagesByType as $item) {
            $percentage = $totalMessages > 0 ? round(($item->count / $totalMessages) * 100, 2) : 0;
            $csvData[] = [
                $this->getTypeText($item->message_type),
                $item->count,
                $percentage . '%'
            ];
        }

        // 按日期统计
        $csvData[] = [];
        $csvData[] = ['每日消息统计'];
        $csvData[] = ['日期', '消息数'];

        $dailyMessages = ChatMessage::whereBetween('created_at', [$startDateTime, $endDateTime])
                                  ->selectRaw('DATE(created_at) as date, count(*) as count')
                                  ->groupBy('date')
                                  ->orderBy('date')
                                  ->get();

        foreach ($dailyMessages as $daily) {
            $csvData[] = [$daily->date, $daily->count];
        }

        $filename = '聊天统计报表_' . date('Y-m-d_H-i-s') . '.csv';

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

    /**
     * 获取消息类型文本
     */
    private function getTypeText($type)
    {
        return match($type) {
            ChatMessage::TYPE_TEXT => '文本',
            ChatMessage::TYPE_IMAGE => '图片',
            ChatMessage::TYPE_VOICE => '语音',
            ChatMessage::TYPE_VIDEO => '视频',
            ChatMessage::TYPE_FILE => '文件',
            default => '未知'
        };
    }
}