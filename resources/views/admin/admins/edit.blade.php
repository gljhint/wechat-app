@extends('admin.layouts.app')

@section('title', '编辑管理员')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑管理员</h1>
        <p class="mt-2 text-sm text-gray-700">编辑管理员的基本信息和权限配置。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.admins.show', $admin) }}" class="btn-secondary">查看详情</a>
        <a href="{{ route('admin.admins.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.admins.update', $admin) }}" class="space-y-6">
        @csrf
        @method('PUT')
        
        <!-- 基本信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 姓名 -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">姓名 <span class="text-red-500">*</span></label>
                        <input type="text" 
                               name="name" 
                               id="name" 
                               required
                               value="{{ old('name', $admin->name) }}"
                               class="form-input mt-1 @error('name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 用户名 -->
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700">用户名 <span class="text-red-500">*</span></label>
                        <input type="text" 
                               name="username" 
                               id="username" 
                               required
                               value="{{ old('username', $admin->username) }}"
                               class="form-input mt-1 @error('username') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('username')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 邮箱 -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">邮箱 <span class="text-red-500">*</span></label>
                        <input type="email" 
                               name="email" 
                               id="email" 
                               required
                               value="{{ old('email', $admin->email) }}"
                               class="form-input mt-1 @error('email') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('email')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 手机号 -->
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">手机号</label>
                        <input type="text" 
                               name="phone" 
                               id="phone" 
                               value="{{ old('phone', $admin->phone) }}"
                               class="form-input mt-1 @error('phone') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('phone')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- 密码设置 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">密码设置</h3>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="ml-3">
                            <p class="text-sm text-blue-700">
                                如果不需要修改密码，请留空。只有在需要重置密码时才填写新密码。
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 新密码 -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">新密码</label>
                        <input type="password" 
                               name="password" 
                               id="password" 
                               class="form-input mt-1 @error('password') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="留空表示不修改密码">
                        @error('password')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 确认密码 -->
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">确认新密码</label>
                        <input type="password" 
                               name="password_confirmation" 
                               id="password_confirmation" 
                               class="form-input mt-1"
                               placeholder="请再次输入新密码">
                    </div>
                </div>
            </div>
        </div>

        <!-- 账户设置 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">账户设置</h3>
                
                <!-- 状态 -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700">账户状态</label>
                    @if($admin->id === auth('admin')->id())
                    <!-- 编辑自己时，disabled的radio不会提交，需要用隐藏字段保留原值 -->
                    <input type="hidden" name="status" value="{{ $admin->status }}">
                    @endif
                    <div class="mt-2 space-y-2">
                        <div class="flex items-center">
                            <input id="status_active"
                                   name="status"
                                   type="radio"
                                   value="1"
                                   {{ old('status', $admin->status) == 1 ? 'checked' : '' }}
                                   {{ $admin->id === auth('admin')->id() ? 'disabled' : '' }}
                                   class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600">
                            <label for="status_active" class="ml-3 block text-sm font-medium text-gray-700">
                                正常
                                <span class="text-gray-500">- 管理员可以正常登录使用</span>
                            </label>
                        </div>
                        <div class="flex items-center">
                            <input id="status_inactive"
                                   name="status"
                                   type="radio"
                                   value="0"
                                   {{ old('status', $admin->status) == 0 ? 'checked' : '' }}
                                   {{ $admin->id === auth('admin')->id() ? 'disabled' : '' }}
                                   class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600">
                            <label for="status_inactive" class="ml-3 block text-sm font-medium text-gray-700">
                                禁用
                                <span class="text-gray-500">- 管理员无法登录系统</span>
                            </label>
                        </div>
                    </div>
                    @if($admin->id === auth('admin')->id())
                    <p class="mt-2 text-xs text-gray-500">注意：您无法修改自己的账户状态</p>
                    @endif
                    @error('status')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <!-- 角色分配 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">角色分配</h3>
                <div class="space-y-3">
                    @foreach($roles as $role)
                    <div class="relative flex items-start">
                        <div class="flex h-5 items-center">
                            <input id="role_{{ $role->id }}" 
                                   name="roles[]" 
                                   type="checkbox" 
                                   value="{{ $role->id }}"
                                   {{ $admin->roles->contains($role->id) ? 'checked' : '' }}
                                   class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="role_{{ $role->id }}" class="font-medium text-gray-700">
                                {{ $role->display_name }}
                                @if($role->name === 'super-admin')
                                <span class="inline-flex px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full ml-1">
                                    超级管理员
                                </span>
                                @endif
                            </label>
                            @if($role->description)
                            <p class="text-gray-500">{{ $role->description }}</p>
                            @endif
                            @if($role->permissions->count() > 0)
                            <p class="text-xs text-gray-400 mt-1">{{ $role->permissions->count() }} 个权限</p>
                            @endif
                        </div>
                    </div>
                    @endforeach
                </div>
                @error('roles')
                    <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                @enderror
                
                @if($roles->isEmpty())
                <div class="text-center py-4">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-500">暂无可分配的角色</p>
                    <p class="text-xs text-gray-400">请先创建角色后再分配</p>
                </div>
                @endif
            </div>
        </div>

        <!-- 系统信息（只读） -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">系统信息</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">管理员ID</label>
                            <p class="mt-1 text-sm text-gray-900 font-mono">{{ $admin->id }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">创建时间</label>
                            <p class="mt-1 text-sm text-gray-900">{{ $admin->created_at->format('Y-m-d H:i:s') }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">最后更新</label>
                            <p class="mt-1 text-sm text-gray-900">{{ $admin->updated_at->format('Y-m-d H:i:s') }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">最后登录</label>
                            <p class="mt-1 text-sm text-gray-900">{{ $admin->last_login_at ? $admin->last_login_at->format('Y-m-d H:i:s') : '从未登录' }}</p>
                        </div>
                    </div>
                    <div class="mt-3 text-xs text-gray-500">
                        <svg class="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        系统信息由系统自动维护，无法手动修改。
                    </div>
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.admins.show', $admin) }}" class="btn-secondary">取消</a>
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
    document.addEventListener('DOMContentLoaded', function() {
        // 用户名格式验证
        const usernameInput = document.getElementById('username');
        if (usernameInput) {
            usernameInput.addEventListener('input', function() {
                // 只允许字母、数字、下划线
                this.value = this.value.replace(/[^a-zA-Z0-9_]/g, '');
            });
        }

        // 密码强度提示
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('password_confirmation');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value;
                if (password && password.length < 6) {
                    this.setCustomValidity('密码至少需要6位字符');
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // 确认密码验证
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', function() {
                const password = passwordInput.value;
                const confirmPassword = this.value;
                
                if (confirmPassword && password !== confirmPassword) {
                    this.setCustomValidity('密码不匹配');
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // 手机号格式验证
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                const phone = this.value.replace(/\D/g, '');
                if (phone.length > 11) {
                    this.value = phone.substring(0, 11);
                }
            });
        }

        // 表单提交前验证
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (password && password !== confirmPassword) {
                e.preventDefault();
                alert('密码和确认密码不匹配');
                confirmPasswordInput.focus();
                return false;
            }
        });
    });
</script>
@endpush