@extends('admin.layouts.app')

@section('title', '学习任务管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">学习任务管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理每日读经和灵修内容</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="{{ route('admin.daily-tasks.create') }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            创建任务
        </a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="bg-white rounded-lg shadow px-6 py-4">
            <dt class="text-sm font-medium text-gray-500">总任务数</dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ $totalTasks }}</dd>
        </div>
        <div class="bg-white rounded-lg shadow px-6 py-4">
            <dt class="text-sm font-medium text-gray-500">启用任务</dt>
            <dd class="mt-1 text-3xl font-semibold text-green-600">{{ $activeTasks }}</dd>
        </div>
        <div class="bg-white rounded-lg shadow px-6 py-4">
            <dt class="text-sm font-medium text-gray-500">今日完成人数</dt>
            <dd class="mt-1 text-3xl font-semibold text-blue-600">{{ $todayTask ? $todayTask->completed_checkins_count : 0 }}</dd>
        </div>
    </div>

    <!-- 任务列表 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日期</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">打卡人数</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">完成人数</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($tasks as $task)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            @php
                                $taskDate = $task->task_date->locale('zh_CN');
                            @endphp
                            <div class="text-sm font-medium text-gray-900">{{ $taskDate->format('Y-m-d') }}</div>
                            <div class="text-sm text-gray-500">{{ $taskDate->isoFormat('dddd') }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($task->status)
                            <span class="inline-flex px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">启用</span>
                            @else
                            <span class="inline-flex px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">禁用</span>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $task->checkins_count }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $task->completed_checkins_count }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="{{ route('admin.daily-tasks.show', $task) }}" class="text-blue-600 hover:text-blue-900 mr-3">查看</a>
                            <a href="{{ route('admin.daily-tasks.edit', $task) }}" class="text-primary-600 hover:text-primary-900 mr-3">编辑</a>
                            <button type="button" onclick="deleteTask({{ $task->id }})" class="text-red-600 hover:text-red-900">删除</button>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="5" class="px-6 py-12 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p class="mt-2 text-sm text-gray-500">暂无学习任务</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if($tasks->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200">
            {{ $tasks->links() }}
        </div>
        @endif
    </div>
</div>
@endsection

@push('scripts')
<script>
function deleteTask(taskId) {
    if (confirm('确定要删除此学习任务吗？')) {
        fetch(`/admin/daily-tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            } else {
                alert(data.message);
            }
        });
    }
}
</script>
@endpush
