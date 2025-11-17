@extends('admin.layouts.app')

@section('title', '个人资料')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">个人资料</h1>
        <p class="mt-2 text-sm text-gray-700">管理您的个人信息和账户设置。</p>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    @if(session('success'))
    <div class="rounded-md bg-green-50 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-green-800">{{ session('success') }}</p>
            </div>
        </div>
    </div>
    @endif

    <!-- 个人信息卡片 -->
    <div class="bg-white shadow rounded-lg" x-data="{ editMode: false }">
        <div class="px-4 py-5 sm:p-6">
            <div class="md:grid md:grid-cols-3 md:gap-6">
                <!-- 头像区域 -->
                <div class="md:col-span-1">
                    <div class="flex flex-col items-center">
                        <div class="relative group">
                            <img class="h-32 w-32 rounded-full object-cover ring-4 ring-gray-100"
                                 src="{{ $admin->avatar ?? 'https://ui-avatars.com/api/?name=' . urlencode($admin->name) . '&color=7F9CF5&background=EBF4FF&size=256' }}"
                                 alt="{{ $admin->name }}">
                            <button type="button"
                                    onclick="document.getElementById('avatarInput').click()"
                                    class="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all">
                                <svg class="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <h3 class="mt-4 text-lg font-medium text-gray-900">{{ $admin->name }}</h3>
                        <p class="text-sm text-gray-500">{{ $admin->username }}</p>
                        <div class="mt-3 flex flex-wrap gap-2 justify-center">
                            @foreach($admin->roles as $role)
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                                {{ $role->display_name }}
                            </span>
                            @endforeach
                        </div>
                    </div>
                </div>

                <!-- 表单区域 -->
                <div class="mt-5 md:mt-0 md:col-span-2">
                    <form method="POST" action="{{ route('admin.profile') }}">
                        @csrf
                        @method('PUT')

                        <div class="space-y-6">
                            <div>
                                <label for="name" class="block text-sm font-medium text-gray-700">姓名 <span class="text-red-500">*</span></label>
                                <input type="text"
                                       name="name"
                                       id="name"
                                       value="{{ old('name', $admin->name) }}"
                                       required
                                       class="form-input mt-1 @error('name') border-red-300 @enderror">
                                @error('name')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="username" class="block text-sm font-medium text-gray-700">用户名</label>
                                <input type="text"
                                       value="{{ $admin->username }}"
                                       disabled
                                       class="form-input mt-1 bg-gray-50 cursor-not-allowed">
                                <p class="mt-1 text-xs text-gray-500">用户名不可修改</p>
                            </div>

                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">邮箱 <span class="text-red-500">*</span></label>
                                <input type="email"
                                       name="email"
                                       id="email"
                                       value="{{ old('email', $admin->email) }}"
                                       required
                                       class="form-input mt-1 @error('email') border-red-300 @enderror">
                                @error('email')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700">手机号</label>
                                <input type="text"
                                       name="phone"
                                       id="phone"
                                       value="{{ old('phone', $admin->phone) }}"
                                       class="form-input mt-1 @error('phone') border-red-300 @enderror"
                                       placeholder="请输入手机号">
                                @error('phone')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="avatar" class="block text-sm font-medium text-gray-700">头像URL</label>
                                <input type="url"
                                       name="avatar"
                                       id="avatarInput"
                                       value="{{ old('avatar', $admin->avatar) }}"
                                       class="form-input mt-1 @error('avatar') border-red-300 @enderror"
                                       placeholder="https://example.com/avatar.jpg">
                                @error('avatar')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                                @enderror
                                <p class="mt-1 text-xs text-gray-500">请输入完整的图片链接地址</p>
                            </div>

                            <div class="border-t border-gray-200 pt-6">
                                <div class="flex justify-between items-center">
                                    <button type="button"
                                            onclick="openChangePasswordModal()"
                                            class="btn-secondary">
                                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                        修改密码
                                    </button>
                                    <button type="submit" class="btn-primary">
                                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                        保存更改
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- 账户信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">账户信息</h3>
            <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                    <dt class="text-sm font-medium text-gray-500">账号状态</dt>
                    <dd class="mt-1 text-sm text-gray-900">
                        @if($admin->status === 1)
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            正常
                        </span>
                        @else
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            已禁用
                        </span>
                        @endif
                    </dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">最后登录时间</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $admin->last_login_at ? $admin->last_login_at->format('Y-m-d H:i:s') : '从未登录' }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">最后登录IP</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $admin->last_login_ip ?? '-' }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">账号创建时间</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ $admin->created_at->format('Y-m-d H:i:s') }}</dd>
                </div>
            </dl>
        </div>
    </div>
</div>

<!-- 修改密码模态框 -->
<div id="changePasswordModal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
            <form id="changePasswordForm">
                @csrf
                @method('PUT')
                <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    </div>
                    <div class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900">修改密码</h3>
                        <div class="mt-4 space-y-4">
                            <div>
                                <label for="current_password" class="block text-sm font-medium text-gray-700">当前密码</label>
                                <input type="password"
                                       name="current_password"
                                       id="current_password"
                                       required
                                       class="form-input mt-1">
                            </div>
                            <div>
                                <label for="new_password" class="block text-sm font-medium text-gray-700">新密码</label>
                                <input type="password"
                                       name="new_password"
                                       id="new_password"
                                       required
                                       minlength="6"
                                       class="form-input mt-1">
                                <p class="mt-1 text-xs text-gray-500">密码长度至少6位</p>
                            </div>
                            <div>
                                <label for="new_password_confirmation" class="block text-sm font-medium text-gray-700">确认新密码</label>
                                <input type="password"
                                       name="new_password_confirmation"
                                       id="new_password_confirmation"
                                       required
                                       class="form-input mt-1">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button type="submit" class="btn-primary w-full sm:ml-3 sm:w-auto">确认修改</button>
                    <button type="button" onclick="closeChangePasswordModal()" class="btn-secondary mt-3 w-full sm:mt-0 sm:w-auto">取消</button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function openChangePasswordModal() {
        document.getElementById('changePasswordModal').classList.remove('hidden');
    }

    function closeChangePasswordModal() {
        document.getElementById('changePasswordModal').classList.add('hidden');
        document.getElementById('changePasswordForm').reset();
    }

    // 修改密码表单提交
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('{{ route('admin.password.change') }}', {
            method: 'PUT',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                alert(data.message);
                closeChangePasswordModal();
            } else {
                alert(data.message || '修改失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('修改失败，请重试');
        });
    });

    // 头像预览
    document.getElementById('avatarInput')?.addEventListener('input', function(e) {
        const url = e.target.value;
        if (url) {
            const img = document.querySelector('img[alt="{{ $admin->name }}"]');
            if (img) {
                img.src = url;
            }
        }
    });
</script>
@endpush
