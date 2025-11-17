@extends('admin.layouts.app')

@section('title', '创建管理员')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">创建管理员</h1>
        <p class="mt-2 text-sm text-gray-700">创建新的系统管理员账户。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="{{ route('admin.admins.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.admins.store') }}" class="space-y-6">
        @csrf
        
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
                               value="{{ old('name') }}"
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
                               value="{{ old('username') }}"
                               class="form-input mt-1 @error('username') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="用于登录的用户名">
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
                               value="{{ old('email') }}"
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
                               value="{{ old('phone') }}"
                               class="form-input mt-1 @error('phone') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('phone')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- 账户设置 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">账户设置</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 密码 -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">密码 <span class="text-red-500">*</span></label>
                        <input type="password" 
                               name="password" 
                               id="password" 
                               required
                               class="form-input mt-1 @error('password') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="至少6位字符">
                        @error('password')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 确认密码 -->
                    <div>
                        <label for="password_confirmation" class="block text-sm font-medium text-gray-700">确认密码 <span class="text-red-500">*</span></label>
                        <input type="password" 
                               name="password_confirmation" 
                               id="password_confirmation" 
                               required
                               class="form-input mt-1"
                               placeholder="请再次输入密码">
                    </div>
                </div>

                <!-- 状态 -->
                <div class="mt-6">
                    <label class="block text-sm font-medium text-gray-700">账户状态</label>
                    <div class="mt-2 space-y-2">
                        <div class="flex items-center">
                            <input id="status_active" 
                                   name="status" 
                                   type="radio" 
                                   value="1" 
                                   {{ old('status', '1') == '1' ? 'checked' : '' }}
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
                                   {{ old('status') == '0' ? 'checked' : '' }}
                                   class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600">
                            <label for="status_inactive" class="ml-3 block text-sm font-medium text-gray-700">
                                禁用
                                <span class="text-gray-500">- 管理员无法登录系统</span>
                            </label>
                        </div>
                    </div>
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
                                   {{ in_array($role->id, old('roles', [])) ? 'checked' : '' }}
                                   class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="role_{{ $role->id }}" class="font-medium text-gray-700">
                                {{ $role->display_name }}
                            </label>
                            @if($role->description)
                            <p class="text-gray-500">{{ $role->description }}</p>
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

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.admins.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">
                <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                创建管理员
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
                let strength = 0;
                
                if (password.length >= 6) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;
                
                // 可以添加密码强度指示器
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
    });
</script>
@endpush