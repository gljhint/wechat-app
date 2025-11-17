@extends('admin.layouts.app')

@section('title', '编辑角色')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑角色</h1>
        <p class="mt-2 text-sm text-gray-700">编辑角色信息和权限配置。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.roles.show', $role) }}" class="btn-secondary">查看详情</a>
        <a href="{{ route('admin.roles.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.roles.update', $role) }}" class="space-y-6">
        @csrf
        @method('PUT')
        
        <!-- 基本信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 角色标识 -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">
                            角色标识
                            @if(in_array($role->name, ['super-admin', 'admin', 'hr', 'employee']))
                            <span class="text-red-500 text-xs">(系统角色，不可修改)</span>
                            @else
                            <span class="text-red-500">*</span>
                            @endif
                        </label>
                        <input type="text" 
                               name="name" 
                               id="name" 
                               value="{{ old('name', $role->name) }}"
                               {{ in_array($role->name, ['super-admin', 'admin', 'hr', 'employee']) ? 'readonly' : 'required' }}
                               class="form-input mt-1 {{ in_array($role->name, ['super-admin', 'admin', 'hr', 'employee']) ? 'bg-gray-100' : '' }} @error('name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="例如：manager">
                        @error('name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 显示名称 -->
                    <div>
                        <label for="display_name" class="block text-sm font-medium text-gray-700">显示名称 <span class="text-red-500">*</span></label>
                        <input type="text" 
                               name="display_name" 
                               id="display_name" 
                               required
                               value="{{ old('display_name', $role->display_name) }}"
                               class="form-input mt-1 @error('display_name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="例如：部门经理">
                        @error('display_name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <!-- 描述 -->
                <div class="mt-6">
                    <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                    <textarea name="description" 
                              id="description" 
                              rows="3" 
                              class="form-textarea mt-1 @error('description') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                              placeholder="角色描述...">{{ old('description', $role->description) }}</textarea>
                    @error('description')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <!-- 权限分配 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-medium text-gray-900">权限分配</h3>
                    @if($role->name !== 'super-admin')
                    <div class="flex space-x-2">
                        <button type="button" onclick="selectAllPermissions()" class="text-sm text-primary-600 hover:text-primary-900">全选</button>
                        <span class="text-gray-300">|</span>
                        <button type="button" onclick="clearAllPermissions()" class="text-sm text-primary-600 hover:text-primary-900">清空</button>
                    </div>
                    @endif
                </div>
                
                @if($role->name === 'super-admin')
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h4 class="text-sm font-medium text-blue-800">超级管理员</h4>
                            <div class="mt-2 text-sm text-blue-700">
                                <p>超级管理员拥有系统所有权限，无需手动配置。</p>
                            </div>
                        </div>
                    </div>
                </div>
                @else
                <div id="permissions-container">
                    <div class="space-y-6">
                        @foreach($grouped_permissions ?? [] as $group => $permissions)
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="text-sm font-medium text-gray-900">{{ $group }}</h4>
                                <div class="flex space-x-2">
                                    <button type="button" onclick="selectGroupPermissions('{{ $group }}')" class="text-xs text-primary-600 hover:text-primary-900">全选</button>
                                    <span class="text-gray-300 text-xs">|</span>
                                    <button type="button" onclick="clearGroupPermissions('{{ $group }}')" class="text-xs text-primary-600 hover:text-primary-900">清空</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" data-group="{{ $group }}">
                                @foreach($permissions as $permission)
                                <div class="relative flex items-start">
                                    <div class="flex h-5 items-center">
                                        <input id="permission_{{ $permission->id }}" 
                                               name="permissions[]" 
                                               type="checkbox" 
                                               value="{{ $permission->id }}"
                                               {{ $role->permissions->contains($permission->id) ? 'checked' : '' }}
                                               class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 permission-checkbox"
                                               data-group="{{ $group }}">
                                    </div>
                                    <div class="ml-3 text-sm">
                                        <label for="permission_{{ $permission->id }}" class="font-medium text-gray-700">
                                            {{ $permission->display_name }}
                                        </label>
                                        @if($permission->description)
                                        <p class="text-gray-500 text-xs">{{ $permission->description }}</p>
                                        @endif
                                    </div>
                                </div>
                                @endforeach
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
                
                @if(empty($grouped_permissions))
                <div class="text-center py-8">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">暂无可分配的权限</p>
                    <p class="text-xs text-gray-400">请先创建权限后再分配</p>
                </div>
                @endif
                @endif
            </div>
        </div>

        <!-- 角色统计信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">角色统计</h3>
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div class="text-center">
                        <div class="text-2xl font-semibold text-gray-900">{{ $role->admins->count() }}</div>
                        <div class="text-sm text-gray-500">使用此角色的管理员</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-semibold text-gray-900">{{ $role->permissions->count() }}</div>
                        <div class="text-sm text-gray-500">已分配权限数量</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-semibold text-gray-900">{{ $role->created_at->diffInDays() }}</div>
                        <div class="text-sm text-gray-500">创建天数</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.roles.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">
                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                </svg>
                保存更改
            </button>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
    // 权限选择功能
    function selectAllPermissions() {
        const checkboxes = document.querySelectorAll('.permission-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    }

    function clearAllPermissions() {
        const checkboxes = document.querySelectorAll('.permission-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    function selectGroupPermissions(group) {
        const checkboxes = document.querySelectorAll(`.permission-checkbox[data-group="${group}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    }

    function clearGroupPermissions(group) {
        const checkboxes = document.querySelectorAll(`.permission-checkbox[data-group="${group}"]`);
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // 表单验证
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('form');
        const nameInput = document.getElementById('name');
        
        // 角色名称格式验证
        if (nameInput && !nameInput.readOnly) {
            nameInput.addEventListener('input', function() {
                // 转换为小写并替换空格为下划线
                this.value = this.value.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_-]/g, '');
            });
        }

        // 表单提交前验证
        form.addEventListener('submit', function(e) {
            const checkedPermissions = document.querySelectorAll('.permission-checkbox:checked');
            
            if (checkedPermissions.length === 0 && {{ $role->name === 'super-admin' ? 'false' : 'true' }}) {
                if (!confirm('您没有为此角色分配任何权限，确定要继续吗？')) {
                    e.preventDefault();
                    return false;
                }
            }
        });
    });
</script>
@endpush