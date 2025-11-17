@extends('admin.layouts.app')

@section('title', '管理员管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">管理员管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理系统管理员账户和权限分配。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="{{ route('admin.admins.create') }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            创建管理员
        </a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 筛选器 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <form method="GET" action="{{ route('admin.admins.index') }}" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <!-- 搜索 -->
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700">搜索</label>
                    <input type="text" name="search" id="search" 
                           class="form-input mt-1"
                           placeholder="姓名、用户名、邮箱..."
                           value="{{ request('search') }}">
                </div>
                
                <!-- 状态 -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
                    <select name="status" id="status" class="form-select mt-1">
                        <option value="">全部状态</option>
                        <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>正常</option>
                        <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>禁用</option>
                    </select>
                </div>
                
                <!-- 操作 -->
                <div class="flex items-end space-x-2">
                    <button type="submit" class="btn-primary">
                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        搜索
                    </button>
                    <a href="{{ route('admin.admins.index') }}" class="btn-secondary">重置</a>
                </div>
            </form>
        </div>
    </div>

    <!-- 管理员列表 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">管理员列表</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                共 {{ $admins->total() ?? 0 }} 个管理员
            </p>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            管理员信息
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            联系方式
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            角色权限
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            状态
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            最后登录
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">操作</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($admins ?? [] as $admin)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                                        <span class="text-sm font-medium text-primary-700">
                                            {{ mb_substr($admin->name, 0, 1) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ $admin->name }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ $admin->username }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $admin->email }}</div>
                            <div class="text-sm text-gray-500">{{ $admin->phone ?: '未设置' }}</div>
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex flex-wrap gap-1">
                                @foreach($admin->roles ?? [] as $role)
                                <span class="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                    {{ $role->display_name }}
                                </span>
                                @endforeach
                                @if(count($admin->roles ?? []) == 0)
                                <span class="text-xs text-gray-500">未分配角色</span>
                                @endif
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $admin->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $admin->status ? '正常' : '禁用' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $admin->last_login_at ? $admin->last_login_at->diffForHumans() : '从未登录' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center space-x-2">
                                <a href="{{ route('admin.admins.show', $admin) }}" 
                                   class="text-primary-600 hover:text-primary-900">查看</a>
                                <a href="{{ route('admin.admins.edit', $admin) }}" 
                                   class="text-gray-600 hover:text-gray-900">编辑</a>
                                @if($admin->id !== auth('admin')->id())
                                <button type="button" 
                                        class="text-{{ $admin->status ? 'red' : 'green' }}-600 hover:text-{{ $admin->status ? 'red' : 'green' }}-900"
                                        onclick="toggleAdminStatus({{ $admin->id }}, {{ $admin->status ? 'false' : 'true' }})">
                                    {{ $admin->status ? '禁用' : '启用' }}
                                </button>
                                @if(!$admin->hasRole('super-admin'))
                                <button type="button" 
                                        class="text-red-600 hover:text-red-900"
                                        onclick="deleteAdmin({{ $admin->id }})">
                                    删除
                                </button>
                                @endif
                                @endif
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="px-6 py-12 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p class="mt-2 text-sm text-gray-500">暂无管理员数据</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- 分页 -->
        @if(isset($admins) && $admins->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            {{ $admins->links() }}
        </div>
        @endif
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

    function deleteAdmin(adminId) {
        if (confirm('确定要删除此管理员吗？此操作不可恢复。')) {
            fetch(`/admin/admins/${adminId}`, {
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
</script>
@endpush