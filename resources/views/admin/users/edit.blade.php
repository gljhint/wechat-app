@extends('admin.layouts.app')

@section('title', '编辑用户')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑用户</h1>
        <p class="mt-2 text-sm text-gray-700">编辑用户的基本信息和设置。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.users.show', $user) }}" class="btn-secondary">查看详情</a>
        <a href="{{ route('admin.users.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.users.update', $user) }}" class="space-y-6">
        @csrf
        @method('PUT')
        
        <!-- 基本信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 真实姓名 -->
                    <div>
                        <label for="real_name" class="block text-sm font-medium text-gray-700">真实姓名</label>
                        <input type="text" 
                               name="real_name" 
                               id="real_name" 
                               value="{{ old('real_name', $user->real_name) }}"
                               class="form-input mt-1 @error('real_name') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('real_name')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 工号 -->
                    <div>
                        <label for="employee_id" class="block text-sm font-medium text-gray-700">工号</label>
                        <input type="text" 
                               name="employee_id" 
                               id="employee_id" 
                               value="{{ old('employee_id', $user->employee_id) }}"
                               class="form-input mt-1 @error('employee_id') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('employee_id')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 手机号 -->
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">手机号</label>
                        <input type="text" 
                               name="phone" 
                               id="phone" 
                               value="{{ old('phone', $user->phone) }}"
                               class="form-input mt-1 @error('phone') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('phone')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 邮箱 -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">邮箱</label>
                        <input type="email" 
                               name="email" 
                               id="email" 
                               value="{{ old('email', $user->email) }}"
                               class="form-input mt-1 @error('email') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror">
                        @error('email')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 部门 -->
                    <div>
                        <label for="department" class="block text-sm font-medium text-gray-700">部门</label>
                        <input type="text" 
                               name="department" 
                               id="department" 
                               value="{{ old('department', $user->department) }}"
                               class="form-input mt-1 @error('department') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               list="departments">
                        <datalist id="departments">
                            <option value="技术部">
                            <option value="市场部">
                            <option value="人事部">
                            <option value="财务部">
                            <option value="行政部">
                            <option value="运营部">
                        </datalist>
                        @error('department')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 职位 -->
                    <div>
                        <label for="position" class="block text-sm font-medium text-gray-700">职位</label>
                        <input type="text" 
                               name="position" 
                               id="position" 
                               value="{{ old('position', $user->position) }}"
                               class="form-input mt-1 @error('position') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               list="positions">
                        <datalist id="positions">
                            <option value="经理">
                            <option value="主管">
                            <option value="专员">
                            <option value="助理">
                            <option value="实习生">
                        </datalist>
                        @error('position')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- 系统设置 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">系统设置</h3>

                <div class="space-y-6">
                    <!-- 用户角色 -->
                    <div>
                        <label for="role" class="block text-sm font-medium text-gray-700">用户角色 <span class="text-red-500">*</span></label>
                        <select name="role"
                                id="role"
                                class="form-select mt-1 @error('role') border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 @enderror"
                                onchange="updateRoleDescription()">
                            <option value="">未分配角色</option>
                            @foreach(\App\Models\WechatUser::$roleNames as $roleKey => $roleName)
                                <option value="{{ $roleKey }}"
                                        {{ old('role', $user->role) == $roleKey ? 'selected' : '' }}
                                        data-description="{{ getRoleDescription($roleKey) }}">
                                    {{ $roleName }}
                                </option>
                            @endforeach
                        </select>

                        <div id="roleDescription" class="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700 rounded" style="{{ old('role', $user->role) ? '' : 'display:none;' }}">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <p id="roleDescriptionText"></p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-700 rounded">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-2">
                                    <strong>重要提醒：</strong>用户必须分配角色后才能访问系统。未分配角色的用户登录后会被拦截并提示联系管理员。
                                </div>
                            </div>
                        </div>

                        @error('role')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 状态 -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">账户状态</label>
                        <div class="mt-2 space-y-2">
                            <div class="flex items-center">
                                <input id="status_active"
                                       name="status"
                                       type="radio"
                                       value="1"
                                       {{ old('status', $user->status) == 1 ? 'checked' : '' }}
                                       class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600">
                                <label for="status_active" class="ml-3 block text-sm font-medium text-gray-700">
                                    正常
                                    <span class="text-gray-500">- 用户可以正常使用系统</span>
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input id="status_inactive"
                                       name="status"
                                       type="radio"
                                       value="0"
                                       {{ old('status', $user->status) == 0 ? 'checked' : '' }}
                                       class="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-600">
                                <label for="status_inactive" class="ml-3 block text-sm font-medium text-gray-700">
                                    禁用
                                    <span class="text-gray-500">- 用户无法登录和使用系统</span>
                                </label>
                            </div>
                        </div>
                        @error('status')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        @php
        function getRoleDescription($role) {
            $descriptions = [
                'admin' => '管理员拥有系统最高权限，可以管理所有用户和内容。',
                'ministry' => '服侍组成员负责核心服侍工作，具有较高的权限和责任。',
                'member' => '正式成员，拥有完整的系统访问权限，可以参与所有活动。',
                'pre_member' => '准成员正在了解和融入，具有部分访问权限。',
                'seeker' => '慕道组成员正在探索和学习，具有基础访问权限。',
                'external' => '外教会访客，可以查看公开内容，权限受限。',
            ];
            return $descriptions[$role] ?? '';
        }
        @endphp

        <!-- 微信信息（只读） -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">微信信息</h3>
                <div class="bg-gray-50 rounded-lg p-4">
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">微信昵称</label>
                            <p class="mt-1 text-sm text-gray-900">{{ $user->nickname }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">OpenID</label>
                            <p class="mt-1 text-sm text-gray-900 font-mono">{{ $user->openid }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">UnionID</label>
                            <p class="mt-1 text-sm text-gray-900 font-mono">{{ $user->unionid ?: '未绑定' }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700">注册时间</label>
                            <p class="mt-1 text-sm text-gray-900">{{ $user->created_at->format('Y-m-d H:i:s') }}</p>
                        </div>
                    </div>
                    <div class="mt-3 text-xs text-gray-500">
                        <svg class="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        微信相关信息由系统自动获取，无法手动修改。
                    </div>
                </div>
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.users.show', $user) }}" class="btn-secondary">取消</a>
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
    // 表单验证和交互增强
    document.addEventListener('DOMContentLoaded', function() {
        // 工号格式提示
        const employeeIdInput = document.getElementById('employee_id');
        if (employeeIdInput) {
            employeeIdInput.addEventListener('input', function() {
                // 可以添加工号格式验证逻辑
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

        // 邮箱格式提示
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value;
                if (email && !isValidEmail(email)) {
                    this.classList.add('border-yellow-300');
                } else {
                    this.classList.remove('border-yellow-300');
                }
            });
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // 初始化角色描述
        updateRoleDescription();
    });

    // 更新角色描述
    function updateRoleDescription() {
        const roleSelect = document.getElementById('role');
        const roleDescription = document.getElementById('roleDescription');
        const roleDescriptionText = document.getElementById('roleDescriptionText');

        const selectedOption = roleSelect.options[roleSelect.selectedIndex];
        const description = selectedOption.getAttribute('data-description');

        if (description) {
            roleDescriptionText.textContent = description;
            roleDescription.style.display = 'block';
        } else {
            roleDescription.style.display = 'none';
        }
    }
</script>
@endpush