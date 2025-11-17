@extends('admin.layouts.app')

@section('title', '编辑权限')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑权限</h1>
        <p class="mt-2 text-sm text-gray-700">修改系统权限的基本信息和属性。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.permissions.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.permissions.update', $permission) }}" class="space-y-6">
        @csrf
        @method('PUT')
        
        <!-- 当前权限信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">当前权限信息</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <div class="h-12 w-12 rounded-lg bg-{{ $permission->color ?? 'blue' }}-100 flex items-center justify-center">
                                <svg class="h-6 w-6 text-{{ $permission->color ?? 'blue' }}-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ $permission->display_name }}</div>
                            <div class="text-sm text-gray-500 font-mono">{{ $permission->name }}</div>
                            <div class="text-sm text-gray-500">{{ $permission->group }}</div>
                        </div>
                        <div class="ml-auto">
                            @if($permission->is_system)
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                系统权限
                            </span>
                            @else
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                自定义权限
                            </span>
                            @endif
                        </div>
                    </div>
                    <div class="mt-3 text-xs text-gray-500">
                        创建时间：{{ $permission->created_at->format('Y-m-d H:i:s') }}
                        @if($permission->updated_at != $permission->created_at)
                        | 最后修改：{{ $permission->updated_at->format('Y-m-d H:i:s') }}
                        @endif
                    </div>
                </div>
            </div>
        </div>

        <!-- 基本信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 权限标识 -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">
                            权限标识 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               name="name" 
                               id="name" 
                               required
                               value="{{ old('name', $permission->name) }}"
                               {{ $permission->is_system ? 'readonly' : '' }}
                               class="form-input mt-1 @error('name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror {{ $permission->is_system ? 'bg-gray-50' : '' }}"
                               placeholder="例如：users.create">
                        @error('name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        @if($permission->is_system)
                            <p class="mt-1 text-xs text-gray-500">系统权限标识不可修改。</p>
                        @else
                            <p class="mt-1 text-xs text-gray-500">权限标识应为英文，建议使用模块.操作的格式。</p>
                        @endif
                    </div>

                    <!-- 权限名称 -->
                    <div>
                        <label for="display_name" class="block text-sm font-medium text-gray-700">
                            权限名称 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               name="display_name" 
                               id="display_name" 
                               required
                               value="{{ old('display_name', $permission->display_name) }}"
                               class="form-input mt-1 @error('display_name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="例如：创建用户">
                        @error('display_name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-xs text-gray-500">在界面中显示的权限名称，可使用中文。</p>
                    </div>

                    <!-- 权限分组 -->
                    <div>
                        <label for="group" class="block text-sm font-medium text-gray-700">
                            权限分组 <span class="text-red-500">*</span>
                        </label>
                        <select name="group" 
                                id="group" 
                                required
                                class="form-select mt-1 @error('group') border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 @enderror">
                            <option value="">选择分组</option>
                            <option value="用户管理" {{ old('group', $permission->group) == '用户管理' ? 'selected' : '' }}>用户管理</option>
                            <option value="打卡管理" {{ old('group', $permission->group) == '打卡管理' ? 'selected' : '' }}>打卡管理</option>
                            <option value="文档管理" {{ old('group', $permission->group) == '文档管理' ? 'selected' : '' }}>文档管理</option>
                            <option value="消息管理" {{ old('group', $permission->group) == '消息管理' ? 'selected' : '' }}>消息管理</option>
                            <option value="角色管理" {{ old('group', $permission->group) == '角色管理' ? 'selected' : '' }}>角色管理</option>
                            <option value="权限管理" {{ old('group', $permission->group) == '权限管理' ? 'selected' : '' }}>权限管理</option>
                            <option value="系统管理" {{ old('group', $permission->group) == '系统管理' ? 'selected' : '' }}>系统管理</option>
                            <option value="其他" {{ old('group', $permission->group) == '其他' ? 'selected' : '' }}>其他</option>
                        </select>
                        @error('group')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-xs text-gray-500">权限所属的功能分组。</p>
                    </div>

                    <!-- 权限颜色 -->
                    <div>
                        <label for="color" class="block text-sm font-medium text-gray-700">权限颜色</label>
                        <select name="color" 
                                id="color" 
                                class="form-select mt-1 @error('color') border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 @enderror">
                            <option value="">默认</option>
                            <option value="blue" {{ old('color', $permission->color) == 'blue' ? 'selected' : '' }}>蓝色</option>
                            <option value="green" {{ old('color', $permission->color) == 'green' ? 'selected' : '' }}>绿色</option>
                            <option value="yellow" {{ old('color', $permission->color) == 'yellow' ? 'selected' : '' }}>黄色</option>
                            <option value="red" {{ old('color', $permission->color) == 'red' ? 'selected' : '' }}>红色</option>
                            <option value="purple" {{ old('color', $permission->color) == 'purple' ? 'selected' : '' }}>紫色</option>
                            <option value="indigo" {{ old('color', $permission->color) == 'indigo' ? 'selected' : '' }}>靛蓝</option>
                            <option value="pink" {{ old('color', $permission->color) == 'pink' ? 'selected' : '' }}>粉色</option>
                            <option value="gray" {{ old('color', $permission->color) == 'gray' ? 'selected' : '' }}>灰色</option>
                        </select>
                        @error('color')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-xs text-gray-500">权限图标的颜色主题。</p>
                    </div>

                    <!-- 描述 -->
                    <div class="sm:col-span-2">
                        <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                        <textarea name="description" 
                                  id="description" 
                                  rows="4" 
                                  class="form-textarea mt-1 @error('description') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                                  placeholder="请输入权限描述...">{{ old('description', $permission->description) }}</textarea>
                        @error('description')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <p class="mt-1 text-xs text-gray-500">详细描述此权限的作用和使用场景。</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 权限使用情况 -->
        @if($permission->roles && $permission->roles->count() > 0)
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">权限使用情况</h3>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h4 class="text-sm font-medium text-blue-800">权限分配情况</h4>
                            <div class="mt-2 text-sm text-blue-700">
                                <p class="mb-2">此权限已分配给以下角色：</p>
                                <div class="flex flex-wrap gap-2">
                                    @foreach($permission->roles as $role)
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-800 rounded-full">
                                        {{ $role->display_name }}
                                    </span>
                                    @endforeach
                                </div>
                                <p class="mt-2 text-xs">修改此权限可能会影响这些角色的功能。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif

        <!-- 系统信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">系统信息</h3>
                
                @if($permission->is_system)
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <h4 class="text-sm font-medium text-yellow-800">系统权限提醒</h4>
                            <div class="mt-2 text-sm text-yellow-700">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>这是系统内置权限，权限标识不可修改</li>
                                    <li>请谨慎修改系统权限的基本信息</li>
                                    <li>修改后可能影响系统的正常功能</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                @endif
                
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">权限ID</label>
                        <p class="mt-1 text-sm text-gray-900 font-mono">#{{ $permission->id }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">权限类型</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $permission->is_system ? '系统权限' : '自定义权限' }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">创建时间</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $permission->created_at->format('Y-m-d H:i:s') }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">最后修改</label>
                        <p class="mt-1 text-sm text-gray-900">{{ $permission->updated_at->format('Y-m-d H:i:s') }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.permissions.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">
                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                </svg>
                保存修改
            </button>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 表单验证
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const displayName = document.getElementById('display_name').value.trim();
            const group = document.getElementById('group').value;
            
            if (!name || !displayName || !group) {
                e.preventDefault();
                alert('请填写所有必填字段');
                return false;
            }

            // 验证权限标识格式（如果不是系统权限）
            @if(!$permission->is_system)
            const namePattern = /^[a-zA-Z0-9._-]+$/;
            if (!namePattern.test(name)) {
                e.preventDefault();
                alert('权限标识只能包含字母、数字、点号、下划线和连字符');
                document.getElementById('name').focus();
                return false;
            }
            @endif

            // 确认修改
            if (!confirm('确定要保存对此权限的修改吗？')) {
                e.preventDefault();
                return false;
            }
        });

        // 实时预览颜色变化
        const colorSelect = document.getElementById('color');
        colorSelect.addEventListener('change', function() {
            // 这里可以添加颜色预览功能
            console.log('Selected color:', this.value);
        });
    });
</script>
@endpush