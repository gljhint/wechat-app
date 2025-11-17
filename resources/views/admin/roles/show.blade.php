@extends('admin.layouts.app')

@section('title', '角色详情')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">角色详情</h1>
        <p class="mt-2 text-sm text-gray-700">查看角色的详细信息和权限设置。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <button type="button" onclick="openPermissionModal()" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            权限设置
        </button>
        <a href="{{ route('admin.roles.edit', $role) }}" class="btn-secondary">编辑角色</a>
        <a href="{{ route('admin.roles.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 角色基本信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-start sm:justify-between">
                <div class="sm:flex sm:items-start">
                    <div class="flex-shrink-0">
                        <div class="h-20 w-20 rounded-lg bg-{{ $role->color ?? 'primary' }}-100 flex items-center justify-center">
                            {!! $role->icon ?? '<svg class="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>' !!}
                        </div>
                    </div>
                    <div class="mt-4 sm:ml-6 sm:mt-0">
                        <h3 class="text-lg font-medium text-gray-900">
                            {{ $role->display_name }}
                            <span class="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-{{ $role->color ?? 'primary' }}-100 text-{{ $role->color ?? 'primary' }}-800">
                                {{ $role->name }}
                            </span>
                        </h3>
                        <p class="text-sm text-gray-500">{{ $role->description ?: '暂无描述' }}</p>
                        <p class="text-sm text-gray-500">创建时间：{{ $role->created_at->format('Y-m-d H:i:s') }}</p>
                    </div>
                </div>
                <div class="mt-4 sm:mt-0">
                    <div class="text-right">
                        <div class="text-sm text-gray-500">角色ID</div>
                        <div class="text-lg font-medium text-gray-900">#{{ $role->id }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 统计信息 -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">管理员数量</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $role->admins_count ?? 0 }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">权限数量</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $role->permissions_count ?? 0 }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">系统角色</dt>
                            <dd class="text-lg font-medium text-gray-900">
                                {{ in_array($role->name, ['super-admin', 'admin']) ? '是' : '否' }}
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 角色成员 -->
    @if($role->admins && $role->admins->count() > 0)
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">角色成员</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">拥有此角色的管理员列表</p>
        </div>
        <div class="divide-y divide-gray-200">
            @foreach($role->admins as $admin)
            <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                            <img class="h-10 w-10 rounded-full" 
                                 src="{{ $admin->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($admin->name) . '&color=7F9CF5&background=EBF4FF' }}" 
                                 alt="{{ $admin->name }}">
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ $admin->name }}</div>
                            <div class="text-sm text-gray-500">{{ $admin->email }}</div>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $admin->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                            {{ $admin->status ? '正常' : '禁用' }}
                        </span>
                        <a href="{{ route('admin.admins.show', $admin) }}" class="text-primary-600 hover:text-primary-900 text-sm">查看</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
    @endif

    <!-- 角色权限 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">角色权限</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">此角色拥有的系统权限</p>
                </div>
                <button type="button" onclick="openPermissionModal()" class="btn-secondary">
                    <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    编辑权限
                </button>
            </div>
        </div>
        
        @if($role->permissions && $role->permissions->count() > 0)
        <div class="px-4 py-5 sm:p-6">
            @php $groupedPermissions = $role->permissions->groupBy('group') @endphp
            
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                @foreach($groupedPermissions as $group => $permissions)
                <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="text-sm font-medium text-gray-900 mb-3">{{ $group }}</h4>
                    <div class="space-y-2">
                        @foreach($permissions as $permission)
                        <div class="flex items-center">
                            <svg class="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span class="text-sm text-gray-700">{{ $permission->display_name }}</span>
                        </div>
                        @endforeach
                    </div>
                </div>
                @endforeach
            </div>
        </div>
        @else
        <div class="px-4 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p class="mt-2 text-sm text-gray-500">暂无权限设置</p>
            <button type="button" onclick="openPermissionModal()" class="mt-2 btn-primary">
                设置权限
            </button>
        </div>
        @endif
    </div>

    <!-- 角色详细信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">详细信息</h3>
        </div>
        <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <dt class="text-sm font-medium text-gray-500">角色名称</dt>
                    <dd class="mt-1 text-sm text-gray-900 font-mono">{{ $role->name }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">显示名称</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $role->display_name }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">描述</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $role->description ?: '暂无描述' }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">系统内置</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                        {{ in_array($role->name, ['super-admin', 'admin']) ? '是' : '否' }}
                    </dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">创建时间</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $role->created_at->format('Y-m-d H:i:s') }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">更新时间</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $role->updated_at->format('Y-m-d H:i:s') }}</dd>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 权限设置模态框 -->
<div id="permissionModal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 sm:align-middle">
            <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">权限设置 - {{ $role->display_name }}</h3>
                    <div id="permissionContent" class="mt-4">
                        <!-- 权限列表将通过 JavaScript 动态加载 -->
                    </div>
                </div>
            </div>
            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button type="button" onclick="savePermissions()" class="btn-primary w-full sm:ml-3 sm:w-auto">保存设置</button>
                <button type="button" onclick="closePermissionModal()" class="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto">取消</button>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function openPermissionModal() {
        document.getElementById('permissionModal').classList.remove('hidden');
        loadPermissions();
    }

    function closePermissionModal() {
        document.getElementById('permissionModal').classList.add('hidden');
    }

    function loadPermissions() {
        fetch(`/admin/roles/{{ $role->id }}/permissions`)
            .then(response => response.json())
            .then(data => {
                const content = document.getElementById('permissionContent');
                let html = '<div class="space-y-4">';
                
                Object.keys(data.grouped_permissions).forEach(group => {
                    html += `
                        <div>
                            <h4 class="text-sm font-medium text-gray-900 mb-2">${group}</h4>
                            <div class="space-y-2">
                    `;
                    
                    data.grouped_permissions[group].forEach(permission => {
                        const checked = data.role_permissions.includes(permission.id) ? 'checked' : '';
                        html += `
                            <label class="flex items-center">
                                <input type="checkbox" name="permissions[]" value="${permission.id}" ${checked}
                                       class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                                <span class="ml-2 text-sm text-gray-700">${permission.display_name}</span>
                            </label>
                        `;
                    });
                    
                    html += '</div></div>';
                });
                
                html += '</div>';
                content.innerHTML = html;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('加载权限失败');
            });
    }

    function savePermissions() {
        const checkboxes = document.querySelectorAll('#permissionContent input[type="checkbox"]:checked');
        const permissions = Array.from(checkboxes).map(cb => cb.value);
        
        fetch(`/admin/roles/{{ $role->id }}/permissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ permissions })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                closePermissionModal();
                location.reload();
            } else {
                alert(data.message || '保存失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('保存失败，请重试');
        });
    }

    // 点击模态框外部关闭
    document.getElementById('permissionModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePermissionModal();
        }
    });
</script>
@endpush