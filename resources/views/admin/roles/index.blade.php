@extends('admin.layouts.app')

@section('title', '角色管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">角色管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理系统角色和权限分配。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" 
                class="btn-primary"
                onclick="openCreateModal()">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            创建角色
        </button>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- Roles Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        @forelse($roles ?? [] as $role)
        <div class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                    </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-medium text-gray-900">{{ $role->display_name }}</h3>
                        <div class="relative">
                            <button type="button" 
                                    class="rounded-full bg-white p-1.5 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    onclick="toggleDropdown('role-{{ $role->id }}-menu')">
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                            <div id="role-{{ $role->id }}-menu" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
                                <a href="{{ route('admin.roles.edit', $role) }}" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">编辑角色</a>
                                <button type="button" onclick="openPermissionModal({{ $role->id }})" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">权限设置</button>
                                @if(!in_array($role->name, ['super-admin', 'admin']))
                                <button type="button" onclick="deleteRole({{ $role->id }})" class="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50">删除角色</button>
                                @endif
                            </div>
                        </div>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ $role->description }}</p>
                    <div class="mt-3">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-500">成员数量</span>
                            <span class="font-medium text-gray-900">{{ $role->admins_count ?? 0 }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm mt-1">
                            <span class="text-gray-500">权限数量</span>
                            <span class="font-medium text-gray-900">{{ $role->permissions_count ?? 0 }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-full text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <p class="mt-2 text-sm text-gray-500">暂无角色数据</p>
        </div>
        @endforelse
    </div>

    <!-- 分页 -->
    @if(isset($roles) && $roles->hasPages())
    <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        {{ $roles->links() }}
    </div>
    @endif
</div>

<!-- 创建角色模态框 -->
<div id="createRoleModal" class="fixed inset-0 z-50 overflow-y-auto hidden" x-data="{ open: false }">
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
            <form id="createRoleForm" method="POST" action="{{ route('admin.roles.store') }}">
                @csrf
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                    </div>
                    <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">创建新角色</h3>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">角色名称</label>
                                <input type="text" name="name" id="name" required 
                                       class="form-input mt-1" placeholder="例如：manager">
                            </div>
                            <div>
                                <label for="display_name" class="block text-sm font-medium text-gray-700">显示名称</label>
                                <input type="text" name="display_name" id="display_name" required 
                                       class="form-input mt-1" placeholder="例如：部门经理">
                            </div>
                            <div>
                                <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                                <textarea name="description" id="description" rows="3" 
                                          class="form-textarea mt-1" placeholder="角色描述..."></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="submit" class="btn-primary w-full sm:ml-3 sm:w-auto">创建角色</button>
                    <button type="button" onclick="closeCreateModal()" class="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto">取消</button>
                </div>
            </form>
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
                    <h3 class="text-lg font-medium leading-6 text-gray-900">权限设置</h3>
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
    let currentRoleId = null;

    function toggleDropdown(id) {
        const dropdown = document.getElementById(id);
        dropdown.classList.toggle('hidden');
    }

    function openCreateModal() {
        document.getElementById('createRoleModal').classList.remove('hidden');
    }

    function closeCreateModal() {
        document.getElementById('createRoleModal').classList.add('hidden');
        document.getElementById('createRoleForm').reset();
    }

    function openPermissionModal(roleId) {
        currentRoleId = roleId;
        document.getElementById('permissionModal').classList.remove('hidden');
        loadPermissions(roleId);
    }

    function closePermissionModal() {
        document.getElementById('permissionModal').classList.add('hidden');
        currentRoleId = null;
    }

    function loadPermissions(roleId) {
        fetch(`/admin/roles/${roleId}/permissions`)
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
        if (!currentRoleId) return;
        
        const checkboxes = document.querySelectorAll('#permissionContent input[type="checkbox"]:checked');
        const permissions = Array.from(checkboxes).map(cb => cb.value);
        
        fetch(`/admin/roles/${currentRoleId}/permissions`, {
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

    function deleteRole(roleId) {
        if (confirm('确定要删除此角色吗？此操作不可恢复。')) {
            fetch(`/admin/roles/${roleId}`, {
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

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('[id$="-menu"]');
        dropdowns.forEach(dropdown => {
            if (!event.target.closest('.relative')) {
                dropdown.classList.add('hidden');
            }
        });
    });
</script>
@endpush