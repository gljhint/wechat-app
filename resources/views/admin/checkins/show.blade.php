@extends('admin.layouts.app')

@section('title', '打卡详情')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">打卡详情</h1>
        <p class="mt-2 text-sm text-gray-700">查看学习打卡记录的详细信息。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.checkins.edit', $checkin) }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            编辑记录
        </a>
        <a href="{{ route('admin.checkins.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
@php
    $user = $checkin->user;
    $task = $checkin->dailyTask;
@endphp

<div class="space-y-6">
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="sm:flex sm:items-center">
                    <div class="flex-shrink-0">
                        <img class="h-20 w-20 rounded-full object-cover" src="{{ $user?->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user?->nickname ?? 'User') . '&color=7F9CF5&background=EBF4FF&size=200' }}" alt="{{ $user?->nickname ?? 'User' }}">
                    </div>
                    <div class="mt-4 sm:ml-6 sm:mt-0">
                        <h3 class="text-lg font-medium text-gray-900">
                            {{ $user?->real_name ?: ($user?->nickname ?: '已删除用户') }}
                        </h3>
                        <p class="text-sm text-gray-500">{{ $user?->department ?: '未分配部门' }}{{ $user?->position ? ' · ' . $user->position : '' }}</p>
                        <p class="mt-2 text-sm text-gray-500">打卡日期：{{ optional($checkin->checkin_date)->format('Y-m-d') ?? '未记录' }}</p>
                    </div>
                </div>
                <div class="mt-4 sm:mt-0 text-right space-y-2">
                    <div>
                        @if($checkin->is_completed)
                            <span class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">已完成</span>
                        @else
                            <span class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800">未完成</span>
                        @endif
                    </div>
                    <div class="text-sm text-gray-500">记录编号 #{{ $checkin->id }}</div>
                    <div class="text-sm text-gray-500">创建于 {{ $checkin->created_at->format('Y-m-d H:i:s') }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">记录信息</h3>
                <dl class="space-y-3">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">打卡日期</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ optional($checkin->checkin_date)->format('Y年m月d日') ?? '未记录' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">完成时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ optional($checkin->completed_at)->format('Y年m月d日 H:i') ?? '尚未完成' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">完成状态</dt>
                        <dd class="mt-1 text-sm text-gray-900">
                            @if($checkin->is_completed)
                                已完成
                            @else
                                未完成
                            @endif
                        </dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">最后更新</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $checkin->updated_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                </dl>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">关联的学习任务</h3>
                @if($task)
                    <dl class="space-y-3">
                        <div>
                            <dt class="text-sm font-medium text-gray-500">任务日期</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ optional($task->task_date)->format('Y年m月d日') ?? '未设置' }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">灵修内容</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $task->devotional ?: '未设置' }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">读经安排</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $task->bible_reading ?: '未设置' }}</dd>
                        </div>
                        <div>
                            <dt class="text-sm font-medium text-gray-500">任务状态</dt>
                            <dd class="mt-1 text-sm text-gray-900">{{ $task->status === 1 ? '进行中' : '已停用' }}</dd>
                        </div>
                    </dl>
                @else
                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
                        此打卡记录未关联具体学习任务。
                    </div>
                @endif
            </div>
        </div>
    </div>

    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">备注信息</h3>
            @if($checkin->remark)
                <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-900 leading-6">
                    {{ $checkin->remark }}
                </div>
            @else
                <p class="text-sm text-gray-500">暂无备注。</p>
            @endif
        </div>
    </div>
</div>
@endsection
