@extends('admin.layouts.app')

@section('title', '编辑打卡记录')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑打卡记录</h1>
        <p class="mt-2 text-sm text-gray-700">调整学习打卡记录的完成状态与备注。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.checkins.show', $checkin) }}" class="btn-secondary">查看详情</a>
        <a href="{{ route('admin.checkins.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
@php
    $user = $checkin->user;
    $task = $checkin->dailyTask;
@endphp

<div class="max-w-3xl mx-auto space-y-6">
    <form method="POST" action="{{ route('admin.checkins.update', $checkin) }}" class="space-y-6">
        @csrf
        @method('PUT')

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">员工信息</h3>
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-12 w-12 rounded-full object-cover" src="{{ $user?->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user?->nickname ?? 'User') . '&color=7F9CF5&background=EBF4FF' }}" alt="{{ $user?->nickname ?? 'User' }}">
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ $user?->real_name ?: ($user?->nickname ?: '已删除用户') }}</div>
                        <div class="text-sm text-gray-500">{{ $user?->department ?: '未分配部门' }}{{ $user?->position ? ' · ' . $user->position : '' }}</div>
                    </div>
                    <div class="ml-auto text-sm text-gray-500">记录编号 #{{ $checkin->id }}</div>
                </div>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">打卡信息</h3>
                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">打卡日期</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ optional($checkin->checkin_date)->format('Y年m月d日') ?? '未记录' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">完成时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ optional($checkin->completed_at)->format('Y年m月d日 H:i') ?? '尚未完成' }}</dd>
                    </div>
                    <div class="sm:col-span-2">
                        <dt class="text-sm font-medium text-gray-500">关联任务</dt>
                        <dd class="mt-1 text-sm text-gray-900">
                            @if($task)
                                {{ optional($task->task_date)->format('Y-m-d') ?? '未设置日期' }} · 灵修：{{ $task->devotional ?: '未设置' }}
                            @else
                                无关联任务
                            @endif
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6 space-y-6">
                <h3 class="text-lg font-medium text-gray-900">记录调整</h3>

                <div>
                    <label for="is_completed" class="block text-sm font-medium text-gray-700">完成状态 <span class="text-red-500">*</span></label>
                    <select name="is_completed" id="is_completed" class="form-select mt-1 @error('is_completed') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        <option value="1" {{ old('is_completed', $checkin->is_completed) == 1 ? 'selected' : '' }}>已完成</option>
                        <option value="0" {{ old('is_completed', $checkin->is_completed) == 0 ? 'selected' : '' }}>未完成</option>
                    </select>
                    @error('is_completed')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                    <p class="mt-1 text-xs text-gray-500">选择“已完成”且尚未记录完成时间时，系统会自动写入当前时间。</p>
                </div>

                <div>
                    <label for="remark" class="block text-sm font-medium text-gray-700">备注</label>
                    <textarea name="remark" id="remark" rows="4" class="form-textarea mt-1 @error('remark') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror" placeholder="记录补充说明（最多500字）">{{ old('remark', $checkin->remark) }}</textarea>
                    @error('remark')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                    <p class="mt-1 text-xs text-gray-500">备注仅对管理员可见，便于说明调整原因。</p>
                </div>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">系统记录</h3>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">创建时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $checkin->created_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">最后更新</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $checkin->updated_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.checkins.show', $checkin) }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">
                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                </svg>
                保存修改
            </button>
        </div>
    </form>
</div>
@endsection
