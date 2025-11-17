@extends('admin.layouts.app')

@section('title', '微信端角色权限管理')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">微信端角色权限管理</h1>
        <p class="mt-2 text-sm text-gray-700">为不同角色配置微信端功能访问权限。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" onclick="saveAllRoles()" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
            </svg>
            保存所有权限
        </button>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 说明卡片 -->
    <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm text-blue-700">
                    <strong>权限说明：</strong>
                    勾选权限后，该角色的用户才能访问对应功能。<strong>管理员角色默认拥有所有权限。</strong>
                    修改权限后记得点击"保存所有权限"按钮。
                </p>
            </div>
        </div>
    </div>

    <!-- 权限配置表格 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-64">
                            功能权限
                        </th>
                        @foreach($roles as $roleKey => $roleName)
                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div class="flex flex-col items-center space-y-2">
                                <span>{{ $roleName }}</span>
                                <button type="button"
                                        onclick="toggleRoleAll('{{ $roleKey }}')"
                                        class="text-xs text-blue-600 hover:text-blue-800">
                                    全选/取消
                                </button>
                            </div>
                        </th>
                        @endforeach
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($permissions as $group => $groupPermissions)
                    <!-- 分组标题行 -->
                    <tr class="bg-gray-100">
                        <td colspan="{{ count($roles) + 1 }}" class="px-6 py-3">
                            <h3 class="text-sm font-semibold text-gray-700">
                                {{ \App\Models\WechatPermission::$groupNames[$group] ?? $group }}
                            </h3>
                        </td>
                    </tr>

                    <!-- 权限行 -->
                    @foreach($groupPermissions as $permission)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm font-medium text-gray-900">{{ $permission->name }}</div>
                            <div class="text-xs text-gray-500">{{ $permission->description }}</div>
                        </td>
                        @foreach($roles as $roleKey => $roleName)
                        <td class="px-6 py-4 whitespace-nowrap text-center">
                            @if($roleKey === 'admin')
                                <span class="text-green-600 text-sm">✓ 默认拥有</span>
                            @else
                                <input type="checkbox"
                                       class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded role-permission"
                                       data-role="{{ $roleKey }}"
                                       data-permission="{{ $permission->id }}"
                                       {{ in_array($permission->id, $rolePermissions[$roleKey] ?? []) ? 'checked' : '' }}>
                            @endif
                        </td>
                        @endforeach
                    </tr>
                    @endforeach
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <!-- 快捷操作 -->
    <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">快捷操作</h3>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <!-- 复制权限 -->
            <div class="border rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-900 mb-3">复制角色权限</h4>
                <div class="space-y-2">
                    <select id="copyFromRole" class="form-select text-sm w-full">
                        <option value="">从角色...</option>
                        @foreach($roles as $roleKey => $roleName)
                            <option value="{{ $roleKey }}">{{ $roleName }}</option>
                        @endforeach
                    </select>
                    <select id="copyToRole" class="form-select text-sm w-full">
                        <option value="">到角色...</option>
                        @foreach($roles as $roleKey => $roleName)
                            <option value="{{ $roleKey }}">{{ $roleName }}</option>
                        @endforeach
                    </select>
                    <button type="button" onclick="copyRolePermissions()" class="btn-secondary w-full text-sm">
                        复制权限
                    </button>
                </div>
            </div>

            <!-- 权限统计 -->
            <div class="border rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-900 mb-3">权限统计</h4>
                <div class="space-y-2">
                    @foreach($roles as $roleKey => $roleName)
                        @if($roleKey !== 'admin')
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">{{ $roleName }}:</span>
                            <span class="font-medium" id="stat-{{ $roleKey }}">
                                {{ count($rolePermissions[$roleKey] ?? []) }} / {{ $permissions->flatten()->count() }}
                            </span>
                        </div>
                        @endif
                    @endforeach
                </div>
            </div>

            <!-- 预设方案 -->
            <div class="border rounded-lg p-4">
                <h4 class="text-sm font-medium text-gray-900 mb-3">预设方案</h4>
                <div class="space-y-2">
                    <button type="button" onclick="applyPreset('full')" class="btn-secondary w-full text-sm">
                        全部权限
                    </button>
                    <button type="button" onclick="applyPreset('view')" class="btn-secondary w-full text-sm">
                        仅查看权限
                    </button>
                    <button type="button" onclick="applyPreset('clear')" class="btn-secondary w-full text-sm text-red-600 hover:text-red-700">
                        清空权限
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    // 切换角色的所有权限
    function toggleRoleAll(role) {
        if (role === 'admin') return;

        const checkboxes = document.querySelectorAll(`input[data-role="${role}"]`);
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);

        checkboxes.forEach(cb => {
            cb.checked = !allChecked;
        });

        updateStatistics();
    }

    // 更新统计信息
    function updateStatistics() {
        const roles = @json(array_keys($roles));

        roles.forEach(role => {
            if (role === 'admin') return;

            const checkboxes = document.querySelectorAll(`input[data-role="${role}"]`);
            const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
            const totalCount = checkboxes.length;

            const statElement = document.getElementById(`stat-${role}`);
            if (statElement) {
                statElement.textContent = `${checkedCount} / ${totalCount}`;
            }
        });
    }

    // 保存所有角色权限
    function saveAllRoles() {
        const roles = {};
        const checkboxes = document.querySelectorAll('.role-permission');

        checkboxes.forEach(cb => {
            const role = cb.dataset.role;
            const permissionId = parseInt(cb.dataset.permission);

            if (!roles[role]) {
                roles[role] = [];
            }

            if (cb.checked) {
                roles[role].push(permissionId);
            }
        });

        fetch('{{ route("admin.wechat-roles.batch-update") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({ roles: roles })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('✓ ' + data.message);
            } else {
                alert('✗ ' + (data.message || '保存失败'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('✗ 保存失败，请重试');
        });
    }

    // 复制角色权限
    function copyRolePermissions() {
        const fromRole = document.getElementById('copyFromRole').value;
        const toRole = document.getElementById('copyToRole').value;

        if (!fromRole || !toRole) {
            alert('请选择源角色和目标角色');
            return;
        }

        if (fromRole === toRole) {
            alert('源角色和目标角色不能相同');
            return;
        }

        if (toRole === 'admin') {
            alert('管理员角色拥有所有权限，无需复制');
            return;
        }

        if (!confirm(`确定要将"${getChineseRoleName(fromRole)}"的权限复制到"${getChineseRoleName(toRole)}"吗？`)) {
            return;
        }

        fetch('{{ route("admin.wechat-roles.copy") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify({
                from_role: fromRole,
                to_role: toRole
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('✓ ' + data.message);
                location.reload();
            } else {
                alert('✗ ' + (data.message || '复制失败'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('✗ 复制失败，请重试');
        });
    }

    // 应用预设方案
    function applyPreset(type) {
        const selectedRole = prompt('请输入要应用的角色（ministry/member/pre_member/seeker/external）：');

        if (!selectedRole || selectedRole === 'admin') {
            alert('角色无效');
            return;
        }

        const checkboxes = document.querySelectorAll(`input[data-role="${selectedRole}"]`);

        if (checkboxes.length === 0) {
            alert('角色不存在');
            return;
        }

        if (!confirm(`确定要为"${getChineseRoleName(selectedRole)}"应用预设方案吗？`)) {
            return;
        }

        checkboxes.forEach(cb => {
            const permissionSlug = cb.closest('tr').querySelector('.text-sm.font-medium').textContent.trim();

            switch(type) {
                case 'full':
                    cb.checked = true;
                    break;
                case 'view':
                    // 仅勾选"查看"类权限
                    cb.checked = permissionSlug.includes('查看') || permissionSlug.includes('观看');
                    break;
                case 'clear':
                    cb.checked = false;
                    break;
            }
        });

        updateStatistics();
    }

    // 获取角色中文名
    function getChineseRoleName(role) {
        const roleNames = @json($roles);
        return roleNames[role] || role;
    }

    // 监听复选框变化，实时更新统计
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.role-permission').forEach(cb => {
            cb.addEventListener('change', updateStatistics);
        });

        updateStatistics();
    });
</script>
@endpush
