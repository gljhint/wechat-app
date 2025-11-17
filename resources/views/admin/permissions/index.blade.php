@extends('admin.layouts.app')

@section('title', '权限管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">权限管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理系统权限节点和功能控制。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <button type="button" 
                class="btn-secondary"
                onclick="syncPermissions()">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            同步权限
        </button>
        <button type="button" 
                class="btn-primary"
                onclick="openCreateModal()">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            创建权限
        </button>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 权限分组 -->
    @forelse($grouped_permissions ?? [] as $group => $permissions)
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">{{ $group }}</h3>
            <p class="mt-1 text-sm text-gray-500">共 {{ count($permissions) }} 个权限</p>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            权限名称
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            权限标识
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            描述
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            相关角色
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">操作</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($permissions as $permission)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-8 w-8">
                                    <div class="h-8 w-8 rounded-lg bg-{{ $permission->color ?? 'blue' }}-100 flex items-center justify-center">
                                        <svg class="h-4 w-4 text-{{ $permission->color ?? 'blue' }}-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ $permission->display_name }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-mono bg-gray-100 text-gray-800 rounded">
                                {{ $permission->name }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div class="text-sm text-gray-900">{{ $permission->description ?: '暂无描述' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex flex-wrap gap-1">
                                @foreach($permission->roles ?? [] as $role)
                                <span class="inline-flex px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">
                                    {{ $role->display_name }}
                                </span>
                                @endforeach
                                @if(count($permission->roles ?? []) == 0)
                                <span class="text-xs text-gray-500">未分配</span>
                                @endif
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center space-x-2">
                                <button type="button"
                                        onclick="editPermission({{ $permission->id }})"
                                        class="text-primary-600 hover:text-primary-900">编辑</button>
                                @if(!$permission->is_system)
                                <button type="button"
                                        onclick="deletePermission({{ $permission->id }})"
                                        class="text-red-600 hover:text-red-900">删除</button>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    @empty
    <div class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <p class="mt-2 text-sm text-gray-500">暂无权限数据</p>
    </div>
    @endforelse
</div>

<!-- 创建权限模态框 -->
<div id="createPermissionModal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
            <form id="createPermissionForm" method="POST" action="{{ route('admin.permissions.store') }}">
                @csrf
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">创建新权限</h3>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">权限标识</label>
                                <input type="text" name="name" id="name" required 
                                       class="form-input mt-1" placeholder="例如：users.create">
                            </div>
                            <div>
                                <label for="display_name" class="block text-sm font-medium text-gray-700">权限名称</label>
                                <input type="text" name="display_name" id="display_name" required 
                                       class="form-input mt-1" placeholder="例如：创建用户">
                            </div>
                            <div>
                                <label for="group" class="block text-sm font-medium text-gray-700">权限分组</label>
                                <select name="group" id="group" required class="form-select mt-1">
                                    <option value="">选择分组</option>
                                    <option value="用户管理">用户管理</option>
                                    <option value="打卡管理">打卡管理</option>
                                    <option value="文档管理">文档管理</option>
                                    <option value="消息管理">消息管理</option>
                                    <option value="系统管理">系统管理</option>
                                </select>
                            </div>
                            <div>
                                <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                                <textarea name="description" id="description" rows="3" 
                                          class="form-textarea mt-1" placeholder="权限描述..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="submit" class="btn-primary w-full sm:ml-3 sm:w-auto">创建权限</button>
                    <button type="button" onclick="closeCreateModal()" class="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto">取消</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- 编辑权限模态框 -->
<div id="editPermissionModal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
            <form id="editPermissionForm" method="POST">
                @csrf
                @method('PUT')
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">编辑权限</h3>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label for="edit_name" class="block text-sm font-medium text-gray-700">权限标识</label>
                                <input type="text" name="name" id="edit_name" required 
                                       class="form-input mt-1" readonly>
                            </div>
                            <div>
                                <label for="edit_display_name" class="block text-sm font-medium text-gray-700">权限名称</label>
                                <input type="text" name="display_name" id="edit_display_name" required 
                                       class="form-input mt-1">
                            </div>
                            <div>
                                <label for="edit_group" class="block text-sm font-medium text-gray-700">权限分组</label>
                                <select name="group" id="edit_group" required class="form-select mt-1">
                                    <option value="">选择分组</option>
                                    <option value="用户管理">用户管理</option>
                                    <option value="打卡管理">打卡管理</option>
                                    <option value="文档管理">文档管理</option>
                                    <option value="消息管理">消息管理</option>
                                    <option value="系统管理">系统管理</option>
                                </select>
                            </div>
                            <div>
                                <label for="edit_description" class="block text-sm font-medium text-gray-700">描述</label>
                                <textarea name="description" id="edit_description" rows="3" 
                                          class="form-textarea mt-1"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="submit" class="btn-primary w-full sm:ml-3 sm:w-auto">更新权限</button>
                    <button type="button" onclick="closeEditModal()" class="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto">取消</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function openCreateModal() {
        document.getElementById('createPermissionModal').classList.remove('hidden');
    }

    function closeCreateModal() {
        document.getElementById('createPermissionModal').classList.add('hidden');
        document.getElementById('createPermissionForm').reset();
    }

    function openEditModal() {
        document.getElementById('editPermissionModal').classList.remove('hidden');
    }

    function closeEditModal() {
        document.getElementById('editPermissionModal').classList.add('hidden');
        document.getElementById('editPermissionForm').reset();
    }

    function editPermission(permissionId) {
        fetch(`/admin/permissions/${permissionId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const permission = data.permission;
                    document.getElementById('edit_name').value = permission.name;
                    document.getElementById('edit_display_name').value = permission.display_name;
                    document.getElementById('edit_group').value = permission.group;
                    document.getElementById('edit_description').value = permission.description || '';
                    
                    document.getElementById('editPermissionForm').action = `/admin/permissions/${permissionId}`;
                    openEditModal();
                } else {
                    alert(data.message || '获取权限信息失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('获取权限信息失败');
            });
    }

    function deletePermission(permissionId) {
        if (confirm('确定要删除此权限吗？此操作不可恢复。')) {
            fetch(`/admin/permissions/${permissionId}`, {
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

    function syncPermissions() {
        if (confirm('确定要同步权限吗？这将自动创建系统中的权限节点。')) {
            fetch('/admin/permissions/sync', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    location.reload();
                } else {
                    alert(data.message || '同步失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('同步失败，请重试');
            });
        }
    }

    // 表单提交处理
    document.getElementById('createPermissionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                closeCreateModal();
                location.reload();
            } else {
                alert(data.message || '创建失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('创建失败，请重试');
        });
    });

    document.getElementById('editPermissionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                closeEditModal();
                location.reload();
            } else {
                alert(data.message || '更新失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('更新失败，请重试');
        });
    });
</script>
@endpush