<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WechatUser;
use App\Models\UserCheckin;
use App\Models\UserDocument;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 统计数据
        $stats = [
            'total_users' => WechatUser::count(),
            'today_checkins' => UserCheckin::whereDate('created_at', today())->count(),
            'total_documents' => UserDocument::count(),
            'total_messages' => ChatMessage::count(),
            'today_messages' => ChatMessage::whereDate('created_at', today())->count(),
        ];

        // 最近活动
        $recent_activities = $this->getRecentActivities();

        return view('admin.dashboard', compact('stats', 'recent_activities'));
    }


    private function getRecentActivities()
    {
        $activities = [];

        // 最新用户注册
        $newUsers = WechatUser::latest()->take(3)->get();
        foreach ($newUsers as $user) {
            $activities[] = [
                'description' => "新用户 {$user->nickname} 注册了账户",
                'time' => $user->created_at->diffForHumans(),
                'color' => 'bg-green-500',
                'icon' => '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24"><path fill="#fff" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"/></svg>'
            ];
        }

        // 最新打卡记录
        $checkins = UserCheckin::with('user')->latest()->take(2)->get();
        foreach ($checkins as $checkin) {
            $activities[] = [
                'description' => "{$checkin->user->nickname} 进行了打卡",
                'time' => $checkin->created_at->diffForHumans(),
                'color' => 'bg-blue-500',
                'icon' => '<svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
            ];
        }

        // 按时间排序
        usort($activities, function($a, $b) {
            return strtotime($b['time']) - strtotime($a['time']);
        });

        return array_slice($activities, 0, 8);
    }
}