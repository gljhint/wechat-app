@extends('admin.layouts.app')

@section('title', '创建角色')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">创建角色</h1>
        <p class="mt-2 text-sm text-gray-700">为系统创建新的角色并设置相应权限。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="{{ route('admin.roles.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.roles.store') }}" class="space-y-6">
        @csrf
        
        <!-- 基本信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 角色名称 -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">
                            角色名称 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               name="name" 
                               id="name" 
                               required
                               value="{{ old('name') }}"
                               class="form-input mt-1 @error('name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="例如：manager">
                        @error('name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-xs text-gray-500">角色名称应为英文，只能包含字母、数字、下划线和连字符。</p>
                    </div>

                    <!-- 显示名称 -->
                    <div>
                        <label for="display_name" class="block text-sm font-medium text-gray-700">
                            显示名称 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               name="display_name" 
                               id="display_name" 
                               required
                               value="{{ old('display_name') }}"
                               class="form-input mt-1 @error('display_name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="例如：部门经理">
                        @error('display_name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-xs text-gray-500">在界面中显示的角色名称，可使用中文。</p>
                    </div>

                    <!-- 描述 -->
                    <div class="sm:col-span-2">
                        <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                        <textarea name="description" 
                                  id="description" 
                                  rows="4" 
                                  class="form-textarea mt-1 @error('description') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                                  placeholder="请输入角色描述...">{{ old('description') }}</textarea>
                        @error('description')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- 权限设置 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">权限设置</h3>
                <p class="text-sm text-gray-600 mb-4">选择此角色拥有的系统权限。</p>
                
                @if(isset($groupedPermissions) && count($groupedPermissions) > 0)
                <div class="space-y-6">
                    @foreach($groupedPermissions as $group => $permissions)
                    <div class="border border-gray-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="text-sm font-medium text-gray-900">{{ $group }}</h4>
                            <div class="flex items-center space-x-2">
                                <button type="button" 
                                        onclick="selectAllInGroup('group-{{ $loop->index }}')"
                                        class="text-xs text-primary-600 hover:text-primary-900">
                                    全选
                                </button>
                                <button type="button" 
                                        onclick="deselectAllInGroup('group-{{ $loop->index }}')"
                                        class="text-xs text-gray-600 hover:text-gray-900">
                                    取消全选
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" data-group="group-{{ $loop->index }}">
                            @foreach($permissions as $permission)
                            <label class="flex items-center">
                                <input type="checkbox" 
                                       name="permissions[]" 
                                       value="{{ $permission->id }}" 
                                       {{ in_array($permission->id, old('permissions', [])) ? 'checked' : '' }}
                                       class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                                <span class="ml-2 text-sm text-gray-700">{{ $permission->display_name }}</span>
                            </label>
                            @endforeach
                        </div>
                    </div>
                    @endforeach
                </div>
                @else
                <div class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">暂无可分配的权限</p>
                </div>
                @endif
            </div>
        </div>

        <!-- 预览信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">创建预览</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                                <svg class="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900" id="preview-display-name">新角色</div>
                            <div class="text-sm text-gray-500" id="preview-name">role-name</div>
                            <div class="text-sm text-gray-500" id="preview-description">角色描述</div>
                        </div>
                        <div class="ml-auto">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
                                新建角色
                            </span>
                        </div>
                    </div>
                    <div class="mt-3 flex items-center justify-between text-sm">
                        <span class="text-gray-500">选中权限数量：</span>
                        <span class="font-medium text-gray-900" id="selected-permissions-count">0</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.roles.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">
                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                创建角色
            </button>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 实时预览功能
        const nameInput = document.getElementById('name');
        const displayNameInput = document.getElementById('display_name');
        const descriptionInput = document.getElementById('description');
        
        const previewName = document.getElementById('preview-name');
        const previewDisplayName = document.getElementById('preview-display-name');
        const previewDescription = document.getElementById('preview-description');
        const selectedPermissionsCount = document.getElementById('selected-permissions-count');

        function updatePreview() {
            previewName.textContent = nameInput.value || 'role-name';
            previewDisplayName.textContent = displayNameInput.value || '新角色';
            previewDescription.textContent = descriptionInput.value || '角色描述';
            
            // 更新选中权限数量
            const checkedPermissions = document.querySelectorAll('input[name="permissions[]"]:checked');
            selectedPermissionsCount.textContent = checkedPermissions.length;
        }

        nameInput.addEventListener('input', updatePreview);
        displayNameInput.addEventListener('input', updatePreview);
        descriptionInput.addEventListener('input', updatePreview);

        // 权限选择变化时更新计数
        document.addEventListener('change', function(e) {
            if (e.target.name === 'permissions[]') {
                updatePreview();
            }
        });

        // 表单验证
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const name = nameInput.value.trim();
            const displayName = displayNameInput.value.trim();
            
            if (!name || !displayName) {
                e.preventDefault();
                alert('请填写角色名称和显示名称');
                return false;
            }

            // 验证角色名称格式
            const namePattern = /^[a-zA-Z0-9_-]+$/;
            if (!namePattern.test(name)) {
                e.preventDefault();
                alert('角色名称只能包含字母、数字、下划线和连字符');
                nameInput.focus();
                return false;
            }
        });

        // 初始化预览
        updatePreview();
    });

    function selectAllInGroup(groupClass) {
        const group = document.querySelector(`[data-group="${groupClass}"]`);
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // 更新权限计数
        const selectedPermissionsCount = document.getElementById('selected-permissions-count');
        const totalChecked = document.querySelectorAll('input[name="permissions[]"]:checked');
        selectedPermissionsCount.textContent = totalChecked.length;
    }

    function deselectAllInGroup(groupClass) {
        const group = document.querySelector(`[data-group="${groupClass}"]`);
        const checkboxes = group.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // 更新权限计数
        const selectedPermissionsCount = document.getElementById('selected-permissions-count');
        const totalChecked = document.querySelectorAll('input[name="permissions[]"]:checked');
        selectedPermissionsCount.textContent = totalChecked.length;
    }
</script>
@endpush