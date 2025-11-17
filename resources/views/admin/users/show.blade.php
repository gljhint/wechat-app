@extends('admin.layouts.app')

@section('title', '用户详情')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">用户详情</h1>
        <p class="mt-2 text-sm text-gray-700">查看用户的详细信息和活动记录。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.users.edit', $user) }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            编辑用户
        </a>
        <a href="{{ route('admin.users.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 用户基本信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="sm:flex sm:items-center">
                    <div class="flex-shrink-0">
                        <img class="h-20 w-20 rounded-full" 
                             src="{{ $user->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user->nickname) . '&color=7F9CF5&background=EBF4FF&size=200' }}" 
                             alt="{{ $user->nickname }}">
                    </div>
                    <div class="mt-4 sm:ml-6 sm:mt-0">
                        <h3 class="text-lg font-medium text-gray-900">
                            {{ $user->real_name ?: $user->nickname }}
                            <span class="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $user->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $user->status_text }}
                            </span>
                        </h3>
                        <p class="text-sm text-gray-500">{{ $user->nickname }}</p>
                        <p class="text-sm text-gray-500">注册时间：{{ $user->created_at->format('Y-m-d H:i:s') }}</p>
                    </div>
                </div>
                <div class="mt-4 sm:mt-0">
                    <button type="button" 
                            onclick="toggleUserStatus({{ $user->id }}, {{ $user->status ? 'false' : 'true' }})"
                            class="btn-{{ $user->status ? 'red' : 'green' }}">
                        {{ $user->status ? '禁用用户' : '启用用户' }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 详细信息卡片 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- 个人信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">个人信息</h3>
                <dl class="space-y-3">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">真实姓名</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->real_name ?: '未设置' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">工号</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->employee_id ?: '未设置' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">手机号</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->phone ?: '未设置' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">邮箱</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->email ?: '未设置' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">部门</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->department ?: '未分配' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">职位</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->position ?: '未设置' }}</dd>
                    </div>
                </dl>
            </div>
        </div>

        <!-- 系统信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">系统信息</h3>
                <dl class="space-y-3">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">微信OpenID</dt>
                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ $user->openid }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">微信UnionID</dt>
                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ $user->unionid ?: '未绑定' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">注册时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->created_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">最后登录</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->last_login_at ? $user->last_login_at->format('Y-m-d H:i:s') : '从未登录' }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">最后活动</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $user->updated_at->diffForHumans() }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>

    <!-- 活动统计 -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">打卡次数</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $user->checkins->count() }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">文档数量</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $user->documents->count() }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">消息数量</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $user->sentMessages->count() + $user->receivedMessages->count() }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 最近打卡记录 -->
    @if($user->checkins->count() > 0)
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">最近打卡记录</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地点</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">地址</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @foreach($user->checkins->take(5) as $checkin)
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $checkin->type === 'in' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800' }}">
                                    {{ $checkin->type === 'in' ? '上班' : '下班' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $checkin->checkin_time->format('Y-m-d H:i:s') }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $checkin->location ?: '-' }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-900">
                                {{ $checkin->address ?: '-' }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            @if($user->checkins->count() > 5)
            <div class="mt-4">
                <a href="{{ route('admin.checkins.index', ['user_id' => $user->id]) }}" class="text-primary-600 hover:text-primary-900 text-sm font-medium">
                    查看全部打卡记录 →
                </a>
            </div>
            @endif
        </div>
    </div>
    @endif

    <!-- 最近文档 -->
    @if($user->documents->count() > 0)
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">最近文档</h3>
            <div class="space-y-3">
                @foreach($user->documents->take(5) as $document)
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <div class="flex-shrink-0">
                            <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-900">{{ $document->title }}</p>
                            <p class="text-xs text-gray-500">{{ $document->created_at->format('Y-m-d H:i') }}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $document->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $document->status ? '启用' : '禁用' }}
                        </span>
                        <a href="{{ route('admin.documents.show', $document) }}" class="text-primary-600 hover:text-primary-900 text-sm">查看</a>
                    </div>
                </div>
                @endforeach
            </div>
            @if($user->documents->count() > 5)
            <div class="mt-4">
                <a href="{{ route('admin.documents.index', ['user_id' => $user->id]) }}" class="text-primary-600 hover:text-primary-900 text-sm font-medium">
                    查看全部文档 →
                </a>
            </div>
            @endif
        </div>
    </div>
    @endif
</div>
@endsection

@push('scripts')
<script>
    function toggleUserStatus(userId, newStatus) {
        const statusText = newStatus ? '启用' : '禁用';
        
        if (confirm(`确定要${statusText}此用户吗？`)) {
            fetch(`/admin/users/${userId}/toggle-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    status: newStatus
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || '操作失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('操作失败，请重试');
            });
        }
    }
</script>
@endpush