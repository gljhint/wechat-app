@extends('admin.layouts.app')

@section('title', '查看学习任务')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">查看学习任务</h1>
        <p class="mt-2 text-sm text-gray-700">{{ $dailyTask->task_date->format('Y-m-d') }} 的学习任务详情</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-3">
        <a href="{{ route('admin.daily-tasks.edit', $dailyTask) }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            编辑
        </a>
        <a href="{{ route('admin.daily-tasks.index') }}" class="btn-secondary">
            返回列表
        </a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 任务统计 -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="bg-white rounded-lg shadow px-6 py-4">
            <dt class="text-sm font-medium text-gray-500">任务状态</dt>
            <dd class="mt-1">
                @if($dailyTask->status)
                <span class="inline-flex px-2 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">启用</span>
                @else
                <span class="inline-flex px-2 py-1 text-sm font-semibold bg-gray-100 text-gray-800 rounded-full">禁用</span>
                @endif
            </dd>
        </div>
        <div class="bg-white rounded-lg shadow px-6 py-4">
            <dt class="text-sm font-medium text-gray-500">打卡人数</dt>
            <dd class="mt-1 text-3xl font-semibold text-blue-600">{{ $dailyTask->checkins_count }}</dd>
        </div>
        <div class="bg-white rounded-lg shadow px-6 py-4">
            <dt class="text-sm font-medium text-gray-500">完成人数</dt>
            <dd class="mt-1 text-3xl font-semibold text-green-600">{{ $dailyTask->completed_checkins_count }}</dd>
        </div>
    </div>

    <!-- 任务内容 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">任务内容</h2>
        </div>
        <div class="px-6 py-6 space-y-6">
            <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">每天读经</h3>
                <div class="prose prose-sm max-w-none bg-gray-50 rounded-lg p-4">
                    {!! $dailyTask->bible_reading !!}
                </div>
            </div>
            <div>
                <h3 class="text-sm font-medium text-gray-500 mb-2">每天灵修</h3>
                <div class="prose prose-sm max-w-none bg-gray-50 rounded-lg p-4">
                    {!! $dailyTask->devotional !!}
                </div>
            </div>
        </div>
    </div>

    <!-- 打卡用户列表 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">打卡记录</h2>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">读经</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">灵修</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">打卡时间</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($dailyTask->checkins as $checkin)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="h-10 w-10 flex-shrink-0">
                                    <img class="h-10 w-10 rounded-full object-cover"
                                         src="{{ $checkin->user->avatar_url ?? '/images/default-avatar.png' }}"
                                         alt="">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">{{ $checkin->user->real_name ?? $checkin->user->nickname ?? '未知用户' }}</div>
                                    @if($checkin->user->nickname && $checkin->user->real_name)
                                    <div class="text-sm text-gray-500">{{ $checkin->user->nickname }}</div>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">已完成</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">已完成</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $checkin->created_at->format('Y-m-d H:i') }}
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="px-6 py-12 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <p class="mt-2 text-sm text-gray-500">暂无打卡记录</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection

