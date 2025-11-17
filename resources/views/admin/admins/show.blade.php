@extends('admin.layouts.app')

@section('title', '管理员详情')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">管理员详情</h1>
        <p class="mt-2 text-sm text-gray-700">查看管理员的详细信息和权限配置。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        @if($admin->id !== auth('admin')->id())
        <a href="{{ route('admin.admins.edit', $admin) }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            编辑管理员
        </a>
        @endif
        <a href="{{ route('admin.admins.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 管理员基本信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="sm:flex sm:items-center">
                    <div class="flex-shrink-0">
                        <div class="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                            <span class="text-2xl font-medium text-primary-700">
                                {{ mb_substr($admin->name, 0, 1) }}
                            </span>
                        </div>
                    </div>
                    <div class="mt-4 sm:ml-6 sm:mt-0">
                        <h3 class="text-lg font-medium text-gray-900">
                            {{ $admin->name }}
                            <span class="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $admin->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $admin->status ? '正常' : '禁用' }}
                            </span>
                            @if($admin->id === auth('admin')->id())
                            <span class="ml-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                当前账户
                            </span>
                            @endif
                        </h3>
                        <p class="text-sm text-gray-500">@{{ $admin->username }}</p>
                        <p class="text-sm text-gray-500">创建时间：{{ $admin->created_at->format('Y-m-d H:i:s') }}</p>
                    </div>
                </div>
                @if($admin->id !== auth('admin')->id())
                <div class="mt-4 sm:mt-0">
                    <button type="button" 
                            onclick="toggleAdminStatus({{ $admin->id }}, {{ $admin->status ? 'false' : 'true' }})"
                            class="btn-{{ $admin->status ? 'red' : 'green' }}">
                        {{ $admin->status ? '禁用账户' : '启用账户' }}
                    </button>
                </div>
                @endif
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
                        <dt class="text-sm font-medium text-gray-500">姓名</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $admin->name }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">用户名</dt>
                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ $admin->username }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">邮箱</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $admin->email }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">手机号</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $admin->phone ?: '未设置' }}</dd>
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
                        <dt class="text-sm font-medium text-gray-500">账户ID</dt>
                        <dd class="mt-1 text-sm text-gray-900 font-mono">{{ $admin->id }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">创建时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $admin->created_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">最后更新</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $admin->updated_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">最后登录</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $admin->last_login_at ? $admin->last_login_at->format('Y-m-d H:i:s') : '从未登录' }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>

    <!-- 角色权限信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">角色权限</h3>
            
            @if($admin->roles->count() > 0)
            <div class="space-y-6">
                @foreach($admin->roles as $role)
                <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-center justify-between mb-3">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                    <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3">
                                <h4 class="text-sm font-medium text-gray-900">{{ $role->display_name }}</h4>
                                @if($role->description)
                                <p class="text-xs text-gray-500">{{ $role->description }}</p>
                                @endif
                            </div>
                        </div>
                        <span class="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                            {{ $role->permissions->count() }} 个权限
                        </span>
                    </div>
                    
                    @if($role->permissions->count() > 0)
                    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        @foreach($role->permissions->groupBy('group') as $group => $permissions)
                        <div class="bg-gray-50 rounded p-3">
                            <h5 class="text-xs font-medium text-gray-700 mb-2">{{ $group }}</h5>
                            <div class="space-y-1">
                                @foreach($permissions as $permission)
                                <div class="flex items-center text-xs text-gray-600">
                                    <svg class="h-3 w-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    {{ $permission->display_name }}
                                </div>
                                @endforeach
                            </div>
                        </div>
                        @endforeach
                    </div>
                    @else
                    <p class="text-sm text-gray-500">此角色暂无具体权限</p>
                    @endif
                </div>
                @endforeach
            </div>
            @else
            <div class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p class="mt-2 text-sm text-gray-500">暂未分配任何角色</p>
                <p class="text-xs text-gray-400">请编辑管理员信息来分配角色</p>
            </div>
            @endif
        </div>
    </div>

    <!-- 操作历史 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">最近活动</h3>
            <div class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="mt-2 text-sm text-gray-500">暂无活动记录</p>
                <p class="text-xs text-gray-400">操作日志功能开发中</p>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function toggleAdminStatus(adminId, newStatus) {
        const statusText = newStatus ? '启用' : '禁用';
        
        if (confirm(`确定要${statusText}此管理员吗？`)) {
            fetch(`/admin/admins/${adminId}/toggle-status`, {
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