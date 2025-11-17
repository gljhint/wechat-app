@extends('admin.layouts.app')

@section('title', '用户管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">用户管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理所有微信用户的账户信息和状态。</p>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- Filters -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <form method="GET" action="{{ route('admin.users.index') }}" class="grid grid-cols-1 gap-4 sm:grid-cols-5">
                <!-- Search -->
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700">搜索</label>
                    <input type="text" name="search" id="search"
                           class="form-input mt-1"
                           placeholder="姓名、昵称、手机号..."
                           value="{{ request('search') }}">
                </div>

                <!-- Department -->
                <div>
                    <label for="department" class="block text-sm font-medium text-gray-700">部门</label>
                    <select name="department" id="department" class="form-select mt-1">
                        <option value="">全部部门</option>
                        @foreach($departments ?? [] as $dept)
                            <option value="{{ $dept }}" {{ request('department') == $dept ? 'selected' : '' }}>
                                {{ $dept }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Role -->
                <div>
                    <label for="role" class="block text-sm font-medium text-gray-700">角色</label>
                    <select name="role" id="role" class="form-select mt-1">
                        <option value="">全部角色</option>
                        <option value="unassigned" {{ request('role') == 'unassigned' ? 'selected' : '' }}>
                            🔴 未分配角色
                        </option>
                        @foreach(\App\Models\WechatUser::$roleNames as $roleKey => $roleName)
                            <option value="{{ $roleKey }}" {{ request('role') == $roleKey ? 'selected' : '' }}>
                                {{ $roleName }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- Status -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
                    <select name="status" id="status" class="form-select mt-1">
                        <option value="">全部状态</option>
                        <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>正常</option>
                        <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>禁用</option>
                    </select>
                </div>

                <!-- Actions -->
                <div class="flex items-end space-x-2">
                    <button type="submit" class="btn-primary">
                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        搜索
                    </button>
                    <a href="{{ route('admin.users.index') }}" class="btn-secondary">重置</a>
                </div>
            </form>
        </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">用户列表</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        共 {{ $users->total() ?? 0 }} 个用户
                    </p>
                </div>
                <div class="flex space-x-2">
                    <select id="bulk-action" class="form-select text-sm">
                        <option value="">批量操作</option>
                        <option value="enable">启用选中</option>
                        <option value="disable">禁用选中</option>
                        <option value="assign_role">分配角色</option>
                        <option value="export">导出选中</option>
                    </select>
                    <button type="button" onclick="handleBulkAction()" class="btn-primary text-sm">
                        执行
                    </button>
                </div>
            </div>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" id="select-all">
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            用户信息
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            联系方式
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            部门职位
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            角色
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            状态
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            最后登录
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">操作</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($users ?? [] as $user)
                    <tr class="hover:bg-gray-50">
                        <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 user-checkbox" value="{{ $user->id }}">
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <img class="h-10 w-10 rounded-full" 
                                         src="{{ $user->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($user->nickname) . '&color=7F9CF5&background=EBF4FF' }}" 
                                         alt="{{ $user->nickname }}">
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ $user->real_name ?: $user->nickname }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        工号: {{ $user->employee_id ?: '未设置' }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $user->phone ?: '未设置' }}</div>
                            <div class="text-sm text-gray-500">{{ $user->email ?: '未设置' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $user->department ?: '未分配' }}</div>
                            <div class="text-sm text-gray-500">{{ $user->position ?: '未设置' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @if($user->role)
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    @if($user->role === 'admin') bg-purple-100 text-purple-800
                                    @elseif($user->role === 'ministry') bg-blue-100 text-blue-800
                                    @elseif($user->role === 'member') bg-green-100 text-green-800
                                    @elseif($user->role === 'pre_member') bg-yellow-100 text-yellow-800
                                    @elseif($user->role === 'seeker') bg-orange-100 text-orange-800
                                    @elseif($user->role === 'external') bg-gray-100 text-gray-800
                                    @endif">
                                    {{ $user->role_name }}
                                </span>
                            @else
                                <button onclick="showRoleModal({{ $user->id }}, '{{ $user->real_name ?: $user->nickname }}')"
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer">
                                    🔴 未分配
                                </button>
                            @endif
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $user->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $user->status_text }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $user->last_login_at ? $user->last_login_at->diffForHumans() : '从未登录' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center justify-end space-x-2">
                                <a href="{{ route('admin.users.show', $user) }}"
                                   class="text-primary-600 hover:text-primary-900"
                                   title="查看详情">查看</a>
                                <a href="{{ route('admin.users.edit', $user) }}"
                                   class="text-gray-600 hover:text-gray-900"
                                   title="编辑用户">编辑</a>
                                @if($user->role)
                                    <button type="button"
                                            class="text-orange-600 hover:text-orange-900"
                                            onclick="showRoleModal({{ $user->id }}, '{{ $user->real_name ?: $user->nickname }}')"
                                            title="修改角色">
                                        角色
                                    </button>
                                @else
                                    <button type="button"
                                            class="text-blue-600 hover:text-blue-900"
                                            onclick="showRoleModal({{ $user->id }}, '{{ $user->real_name ?: $user->nickname }}')"
                                            title="分配角色">
                                        分配
                                    </button>
                                @endif
                                <button type="button"
                                        class="text-{{ $user->status ? 'red' : 'green' }}-600 hover:text-{{ $user->status ? 'red' : 'green' }}-900"
                                        onclick="toggleUserStatus({{ $user->id }}, {{ $user->status ? 'false' : 'true' }})">
                                    {{ $user->status ? '禁用' : '启用' }}
                                </button>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="px-6 py-12 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            <p class="mt-2 text-sm text-gray-500">暂无用户数据</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if(isset($users) && $users->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            {{ $users->links() }}
        </div>
        @endif
    </div>
</div>
@endsection

<!-- 角色分配模态框 -->
<div id="roleModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    分配角色
                </h3>
                <button onclick="closeRoleModal()" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="mb-4">
                <p class="text-sm text-gray-500 mb-4">
                    为用户 <strong id="modalUserName" class="text-gray-900"></strong> 分配角色
                </p>

                <label for="modalRoleSelect" class="block text-sm font-medium text-gray-700 mb-2">
                    选择角色
                </label>
                <select id="modalRoleSelect" class="form-select w-full">
                    <option value="">请选择角色</option>
                    @foreach(\App\Models\WechatUser::$roleNames as $roleKey => $roleName)
                        <option value="{{ $roleKey }}">{{ $roleName }}</option>
                    @endforeach
                </select>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-xs text-yellow-700">
                            角色说明：
                        </p>
                        <ul class="text-xs text-yellow-700 mt-1 list-disc list-inside">
                            <li>管理员：拥有最高权限</li>
                            <li>服侍组：核心服侍人员</li>
                            <li>成员组：正式成员</li>
                            <li>准成员组：准备加入的成员</li>
                            <li>慕道组：正在了解的人</li>
                            <li>外教会：其他教会的访客</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-end space-x-3">
                @if(request()->route('user'))
                <button type="button"
                        onclick="removeRole()"
                        class="btn-secondary text-red-600 hover:text-red-700">
                    移除角色
                </button>
                @endif
                <button type="button"
                        onclick="closeRoleModal()"
                        class="btn-secondary">
                    取消
                </button>
                <button type="button"
                        onclick="assignRole()"
                        class="btn-primary">
                    确认分配
                </button>
            </div>
        </div>
    </div>
</div>

<!-- 批量角色分配模态框 -->
<div id="bulkRoleModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full hidden z-50">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    批量分配角色
                </h3>
                <button onclick="closeBulkRoleModal()" class="text-gray-400 hover:text-gray-500">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div class="mb-4">
                <p class="text-sm text-gray-500 mb-4">
                    已选择 <strong id="bulkModalCount" class="text-gray-900">0</strong> 个用户
                </p>

                <label for="bulkModalRoleSelect" class="block text-sm font-medium text-gray-700 mb-2">
                    选择角色
                </label>
                <select id="bulkModalRoleSelect" class="form-select w-full">
                    <option value="">请选择角色</option>
                    @foreach(\App\Models\WechatUser::$roleNames as $roleKey => $roleName)
                        <option value="{{ $roleKey }}">{{ $roleName }}</option>
                    @endforeach
                </select>
            </div>

            <div class="flex items-center justify-end space-x-3">
                <button type="button"
                        onclick="closeBulkRoleModal()"
                        class="btn-secondary">
                    取消
                </button>
                <button type="button"
                        onclick="confirmBulkAssignRole()"
                        class="btn-primary">
                    确认分配
                </button>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    // 全选功能
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.user-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // 批量操作
    let bulkSelectedUsers = [];

    function handleBulkAction() {
        const action = document.getElementById('bulk-action').value;
        bulkSelectedUsers = Array.from(document.querySelectorAll('.user-checkbox:checked'))
            .map(cb => cb.value);

        if (!action || bulkSelectedUsers.length === 0) {
            alert('请选择用户和操作类型');
            return;
        }

        // 如果是分配角色操作，显示批量角色选择模态框
        if (action === 'assign_role') {
            document.getElementById('bulkModalCount').textContent = bulkSelectedUsers.length;
            document.getElementById('bulkRoleModal').classList.remove('hidden');
            return;
        }

        // 其他批量操作
        const actionText = {
            'enable': '启用',
            'disable': '禁用',
            'export': '导出'
        }[action];

        if (confirm(`确定要对 ${bulkSelectedUsers.length} 个用户执行"${actionText}"操作吗？`)) {
            executeBulkAction(action, bulkSelectedUsers);
        }

        // 重置选择
        document.getElementById('bulk-action').value = '';
    }

    function executeBulkAction(action, userIds, role = null) {
        const payload = {
            action: action,
            user_ids: userIds
        };

        if (role) {
            payload.role = role;
        }

        fetch('{{ route("admin.users.bulk") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message || '操作成功');
                location.reload();
            } else {
                alert(data.message || '操作失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('操作失败，请重试');
        });
    }

    // 切换用户状态
    function toggleUserStatus(userId, newStatus) {
        const statusText = newStatus ? '启用' : '禁用';
        
        if (confirm(`确定要${statusText}此用户吗？`)) {
            fetch(`/admin/users/${userId}/toggle-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    status: newStatus
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || '操作失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('操作失败，请重试');
            });
        }
    }

    // ========== 角色管理相关函数 ==========
    let currentUserId = null;

    // 显示单个用户角色分配模态框
    function showRoleModal(userId, userName) {
        currentUserId = userId;
        document.getElementById('modalUserName').textContent = userName;
        document.getElementById('roleModal').classList.remove('hidden');
    }

    // 关闭单个用户角色分配模态框
    function closeRoleModal() {
        currentUserId = null;
        document.getElementById('roleModal').classList.add('hidden');
        document.getElementById('modalRoleSelect').value = '';
    }

    // 分配角色给单个用户
    function assignRole() {
        const role = document.getElementById('modalRoleSelect').value;

        if (!role) {
            alert('请选择角色');
            return;
        }

        if (!currentUserId) {
            alert('用户ID无效');
            return;
        }

        fetch(`/admin/users/${currentUserId}/assign-role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ role: role })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message || '角色分配成功');
                closeRoleModal();
                location.reload();
            } else {
                alert(data.message || '角色分配失败');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('操作失败，请重试');
        });
    }

    // 移除用户角色
    function removeRole() {
        if (!currentUserId) {
            alert('用户ID无效');
            return;
        }

        if (confirm('确定要移除该用户的角色吗？移除后用户将无法访问系统。')) {
            fetch(`/admin/users/${currentUserId}/remove-role`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message || '角色已移除');
                    closeRoleModal();
                    location.reload();
                } else {
                    alert(data.message || '操作失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('操作失败，请重试');
            });
        }
    }

    // 关闭批量角色分配模态框
    function closeBulkRoleModal() {
        document.getElementById('bulkRoleModal').classList.add('hidden');
        document.getElementById('bulkModalRoleSelect').value = '';
        document.getElementById('bulk-action').value = '';
    }

    // 确认批量分配角色
    function confirmBulkAssignRole() {
        const role = document.getElementById('bulkModalRoleSelect').value;

        if (!role) {
            alert('请选择角色');
            return;
        }

        if (confirm(`确定要为 ${bulkSelectedUsers.length} 个用户分配"${getChineseRoleName(role)}"角色吗？`)) {
            executeBulkAction('assign_role', bulkSelectedUsers, role);
            closeBulkRoleModal();
        }
    }

    // 获取角色中文名称
    function getChineseRoleName(role) {
        const roleNames = {
            'admin': '管理员',
            'ministry': '服侍组',
            'member': '成员组',
            'pre_member': '准成员组',
            'seeker': '慕道组',
            'external': '外教会'
        };
        return roleNames[role] || role;
    }
</script>
@endpush