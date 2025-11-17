@extends('admin.layouts.app')

@section('title', '打卡管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">打卡管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理员工学习打卡记录，查看完成情况并导出数据。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.checkins.statistics') }}" class="btn-secondary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            考勤统计
        </a>
    </div>
</div>
@endsection

@section('content')
@php
    $todayCompletionRate = $todayCheckins > 0
        ? round(($todayCompleted / max(1, $todayCheckins)) * 100, 1)
        : 0;
@endphp

<div class="space-y-6">
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <form method="GET" action="{{ route('admin.checkins.index') }}" class="grid grid-cols-1 gap-4 sm:grid-cols-5">
                <div>
                    <label for="user_id" class="block text-sm font-medium text-gray-700">员工</label>
                    <select name="user_id" id="user_id" class="form-select mt-1">
                        <option value="">全部员工</option>
                        @foreach($users ?? [] as $user)
                            <option value="{{ $user->id }}" {{ (string)request('user_id') === (string)$user->id ? 'selected' : '' }}>
                                {{ $user->real_name ?: $user->nickname }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="is_completed" class="block text-sm font-medium text-gray-700">完成状态</label>
                    <select name="is_completed" id="is_completed" class="form-select mt-1">
                        <option value="">全部状态</option>
                        <option value="1" {{ request('is_completed') === '1' ? 'selected' : '' }}>已完成</option>
                        <option value="0" {{ request('is_completed') === '0' ? 'selected' : '' }}>未完成</option>
                    </select>
                </div>

                <div>
                    <label for="start_date" class="block text-sm font-medium text-gray-700">开始日期</label>
                    <input type="date" name="start_date" id="start_date" class="form-input mt-1" value="{{ request('start_date') }}">
                </div>

                <div>
                    <label for="end_date" class="block text-sm font-medium text-gray-700">结束日期</label>
                    <input type="date" name="end_date" id="end_date" class="form-input mt-1" value="{{ request('end_date') }}">
                </div>

                <div class="flex items-end space-x-2">
                    <button type="submit" class="btn-primary">
                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        筛选
                    </button>
                    <a href="{{ route('admin.checkins.index') }}" class="btn-secondary">重置</a>
                </div>
            </form>
        </div>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <dt class="text-sm font-medium text-gray-500 truncate">今日打卡提交</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ $todayCheckins }}</dd>
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <dt class="text-sm font-medium text-gray-500 truncate">今日已完成</dt>
                <dd class="mt-1 text-3xl font-semibold text-green-600">{{ $todayCompleted }}</dd>
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <dt class="text-sm font-medium text-gray-500 truncate">今日未完成</dt>
                <dd class="mt-1 text-3xl font-semibold text-red-600">{{ $todayIncomplete }}</dd>
            </div>
        </div>
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <dt class="text-sm font-medium text-gray-500 truncate">完成率</dt>
                <dd class="mt-1 text-3xl font-semibold text-primary-600">{{ $todayCompletionRate }}<span class="text-base">%</span></dd>
            </div>
        </div>
    </div>

    <div class="bg-white shadow overflow-hidden rounded-lg">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">员工</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学习任务</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">打卡日期</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">完成时间</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">备注</th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($checkins as $checkin)
                        @php
                            $user = $checkin->user;
                            $task = $checkin->dailyTask;
                        @endphp
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img class="h-10 w-10 rounded-full object-cover" src="{{ $user?->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user?->nickname ?? 'User') . '&color=7F9CF5&background=EBF4FF' }}" alt="{{ $user?->nickname ?? 'User' }}">
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ $user?->real_name ?: ($user?->nickname ?: '已删除用户') }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ $user?->department ?: '未分配部门' }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($task)
                                    <div class="text-sm text-gray-900">{{ optional($task->task_date)->format('Y-m-d') }} 灵修</div>
                                @else
                                    <div class="text-sm text-gray-500">无关联任务</div>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ optional($checkin->checkin_date)->format('Y-m-d') ?? '未记录' }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ optional($checkin->completed_at)->format('Y-m-d H:i') ?? '未记录' }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                @if($checkin->is_completed)
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已完成</span>
                                @else
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">未完成</span>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900 max-w-xs truncate" title="{{ $checkin->remark ?? '-' }}">
                                    {{ $checkin->remark ?: '-' }}
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex items-center justify-end space-x-2">
                                    <a href="{{ route('admin.checkins.show', $checkin) }}" class="text-primary-600 hover:text-primary-900">查看</a>
                                    <a href="{{ route('admin.checkins.edit', $checkin) }}" class="text-gray-600 hover:text-gray-900">编辑</a>
                                    <button type="button" class="text-red-600 hover:text-red-900" onclick="deleteCheckin({{ $checkin->id }})">删除</button>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="px-6 py-12 text-center">
                                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p class="mt-2 text-sm text-gray-500">暂无打卡记录</p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if(isset($checkins) && $checkins->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            {{ $checkins->withQueryString()->links() }}
        </div>
        @endif
    </div>
</div>
@endsection

@push('scripts')
<script>
    function deleteCheckin(checkinId) {
        if (confirm('确定要删除此打卡记录吗？此操作不可恢复。')) {
            fetch(`/admin/checkins/${checkinId}`, {
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
                    alert(data.message || '删除失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('删除失败，请重试');
            });
        }
    }

    function exportCheckins() {
        const params = new URLSearchParams(window.location.search);
        params.set('export', '1');
        window.location.href = '{{ route("admin.checkins.export") }}?' + params.toString();
    }

    document.addEventListener('DOMContentLoaded', function() {
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = document.getElementById('start_date');
        const endDateInput = document.getElementById('end_date');

        if (startDateInput && !startDateInput.value) {
            startDateInput.value = today;
        }
        if (endDateInput && !endDateInput.value) {
            endDateInput.value = today;
        }
    });
</script>
@endpush
