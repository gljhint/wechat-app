@extends('wechat.layouts.app')

@section('title', '用户角色管理')
@section('navbar-title', '用户角色管理')

@push('styles')
<style>
    .users-page {
        padding-bottom: 88px;
        background-color: #f5f5f5;
    }

    .search-box {
        padding: 12px;
        background-color: #fff;
        margin-bottom: 12px;
    }

    .search-input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ededed;
        border-radius: 8px;
        font-size: 15px;
    }

    .role-filter {
        display: flex;
        gap: 8px;
        padding: 12px;
        overflow-x: auto;
        background-color: #fff;
        margin-bottom: 12px;
    }

    .role-chip {
        flex-shrink: 0;
        padding: 6px 14px;
        border-radius: 999px;
        font-size: 13px;
        border: 1px solid #ededed;
        background-color: #fff;
        color: #666;
        white-space: nowrap;
    }

    .role-chip.active {
        border-color: #07c160;
        background-color: rgba(7, 193, 96, 0.12);
        color: #07c160;
        font-weight: 600;
    }

    .user-list {
        margin: 0 12px 12px;
    }

    .user-item {
        display: flex;
        align-items: center;
        padding: 14px;
        background-color: #fff;
        border-radius: 12px;
        margin-bottom: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
        flex-shrink: 0;
        object-fit: cover;
    }

    .user-info {
        flex: 1;
        min-width: 0;
    }

    .user-name {
        font-size: 16px;
        font-weight: 500;
        color: #333;
        margin-bottom: 4px;
    }

    .user-meta {
        font-size: 13px;
        color: #999;
    }

    .user-role {
        padding: 4px 10px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
    }

    .user-role.admin {
        background-color: rgba(245, 34, 45, 0.12);
        color: #f5222d;
    }

    .user-role.ministry {
        background-color: rgba(24, 144, 255, 0.12);
        color: #1890ff;
    }

    .user-role.member {
        background-color: rgba(7, 193, 96, 0.12);
        color: #07c160;
    }

    .user-role.pre_member {
        background-color: rgba(250, 173, 20, 0.12);
        color: #faad14;
    }

    .user-role.seeker {
        background-color: rgba(114, 46, 209, 0.12);
        color: #722ed1;
    }

    .user-role.external {
        background-color: rgba(128, 128, 128, 0.12);
        color: #808080;
    }

    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #999;
    }

    .loading-state {
        text-align: center;
        padding: 40px 20px;
    }
</style>
@endpush

@section('content')
<div class="users-page">
    <!-- 搜索框 -->
    <div class="search-box">
        <input
            type="search"
            class="search-input"
            id="searchInput"
            placeholder="搜索用户（昵称、姓名、手机号、工号）"
        />
    </div>

    <!-- 角色筛选 -->
    <div class="role-filter" id="roleFilter">
        <button class="role-chip active" data-role="">全部</button>
        <button class="role-chip" data-role="admin">管理员</button>
        <button class="role-chip" data-role="ministry">服侍组</button>
        <button class="role-chip" data-role="member">成员组</button>
        <button class="role-chip" data-role="pre_member">准成员组</button>
        <button class="role-chip" data-role="seeker">慕道组</button>
        <button class="role-chip" data-role="external">外教会</button>
    </div>

    <!-- 用户列表 -->
    <div class="user-list" id="userList">
        <div class="loading-state">
            <div class="weui-loadmore">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">加载中...</span>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let currentRole = '';
let searchTimer = null;

const roleNames = {
    'admin': '管理员',
    'ministry': '服侍组',
    'member': '成员组',
    'pre_member': '准成员组',
    'seeker': '慕道组',
    'external': '外教会'
};

// 加载用户列表
function loadUsers({ showLoading = true } = {}) {
    if (showLoading) {
        document.getElementById('userList').innerHTML = `
            <div class="loading-state">
                <div class="weui-loadmore">
                    <i class="weui-loading"></i>
                    <span class="weui-loadmore__tips">加载中...</span>
                </div>
            </div>
        `;
    }

    const params = {};
    if (currentRole) params.role = currentRole;

    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        params.search = searchInput.value.trim();
    }

    axios.get('/wechat/system/users', { params })
        .then(response => {
            if (response.data.code === 200) {
                renderUsers(response.data.data.users);
            } else {
                utils.toast(response.data.message || '加载失败', { type: 'top' });
                renderUsers([]);
            }
        })
        .catch(() => {
            renderUsers([]);
            utils.toast('加载失败，请稍后重试', { type: 'top' });
        });
}

// 渲染用户列表
function renderUsers(users) {
    const list = document.getElementById('userList');
    if (!list) return;

    if (!users || users.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <p>暂无用户</p>
            </div>
        `;
        return;
    }

    let html = '';
    users.forEach(user => {
        const roleClass = user.role || 'member';
        const roleName = user.role_name || '未设置';
        html += `
            <div class="user-item" onclick="selectUser(${user.id}, '${user.nickname}', '${user.role}')">
                <img src="${user.avatar_url || '/images/default-avatar.png'}" alt="${user.nickname}" class="user-avatar">
                <div class="user-info">
                    <div class="user-name">${user.real_name || user.nickname}</div>
                    <div class="user-meta">${user.phone || user.employee_id || 'ID: ' + user.id}</div>
                </div>
                <div class="user-role ${roleClass}">${roleName}</div>
            </div>
        `;
    });

    list.innerHTML = html;
}

// 选择用户，弹出角色选择
function selectUser(userId, userName, currentRole) {
    const roleOptions = Object.entries(roleNames).map(([role, name]) => {
        const isSelected = role === currentRole;
        return {
            label: name + (isSelected ? ' (当前)' : ''),
            value: role
        };
    });

    weui.actionSheet(roleOptions, [
        {
            label: '取消',
            onClick: function() {}
        }
    ], {
        title: `为 ${userName} 分配角色`,
        className: 'custom-actionsheet'
    }).then(index => {
        if (index < roleOptions.length) {
            const selectedRole = roleOptions[index].value;
            if (selectedRole === currentRole) {
                utils.toast('角色未改变', { type: 'top' });
                return;
            }
            confirmAssignRole(userId, userName, selectedRole);
        }
    });
}

// 确认分配角色
function confirmAssignRole(userId, userName, newRole) {
    weui.confirm(
        `确认将 ${userName} 的角色修改为 ${roleNames[newRole]} 吗？`,
        {
            title: '确认操作',
            buttons: [
                { label: '取消', type: 'default' },
                { label: '确定', type: 'primary' }
            ]
        }
    ).then(() => {
        assignRole(userId, newRole);
    });
}

// 分配角色
function assignRole(userId, role) {
    const loading = weui.loading('处理中...');

    axios.post('/wechat/system/users/assign-role', {
        user_id: userId,
        role: role
    })
    .then(response => {
        loading.hide();
        if (response.data.code === 200) {
            utils.toast('角色分配成功', { type: 'success' });
            loadUsers({ showLoading: false });
        } else {
            utils.toast(response.data.message || '操作失败', { type: 'error' });
        }
    })
    .catch(error => {
        loading.hide();
        const message = error.response?.data?.message || '网络错误';
        utils.toast(message, { type: 'error' });
    });
}

// 角色筛选
document.getElementById('roleFilter').addEventListener('click', (e) => {
    const chip = e.target.closest('.role-chip');
    if (!chip) return;

    document.querySelectorAll('.role-chip').forEach(btn => btn.classList.remove('active'));
    chip.classList.add('active');

    currentRole = chip.dataset.role || '';
    loadUsers();
});

// 搜索
document.getElementById('searchInput').addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
        loadUsers({ showLoading: false });
    }, 300);
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});
</script>
@endpush
