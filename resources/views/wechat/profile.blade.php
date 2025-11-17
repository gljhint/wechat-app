@extends('wechat.layouts.app')

@section('title', '我的')
@section('navbar-title', '我的')

@push('styles')
<style>
    .profile-card {
        margin-top: 12px;
        background-color: #fff;
        border-radius: 12px;
        overflow: hidden;
    }

    .profile-card .weui-cell {
        align-items: center;
    }

    .profile-avatar {
        width: 68px;
        height: 68px;
        border-radius: 12px;
        object-fit: cover;
    }

    .profile-name {
        font-size: 18px;
        color: #111;
        margin-bottom: 4px;
    }

    .profile-meta {
        color: #808080;
        font-size: 13px;
    }

    .menu-section {
        margin: 12px 0;
        background-color: #fff;
        border-radius: 12px;
        overflow: hidden;
    }

    .menu-section .weui-cell {
        padding: 16px;
    }

    .menu-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
    }

    .menu-icon svg {
        width: 22px;
        height: 22px;
        fill: #666;
    }
</style>
@endpush

@section('content')
<div class="weui-cells profile-card">
    <div class="weui-cell weui-cell_active">
        <div class="weui-cell__hd" style="margin-right: 16px;">
            <img src="/default-avatar.png" class="profile-avatar" id="profileAvatar" alt="头像">
        </div>
        <div class="weui-cell__bd">
            <p class="profile-name" id="profileName">加载中...</p>
            <p class="profile-meta" id="profileDept">--</p>
        </div>
    </div>
</div>

<div class="weui-cells weui-cells_access menu-section">
    <a class="weui-cell weui-cell_access" href="/wechat/checkin/history">
        <div class="weui-cell__hd">
            <span class="menu-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                </svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p>读经记录</p>
        </div>
    </a>
    <a class="weui-cell weui-cell_access" href="/wechat/checkin/management" id="checkinManagementLink" style="display: none;">
        <div class="weui-cell__hd">
            <span class="menu-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"/>
                </svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p>打卡排行</p>
        </div>
    </a>
    <a class="weui-cell weui-cell_access" href="/profile/settings">
        <div class="weui-cell__hd">
            <span class="menu-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.68 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.69 4.8 12C4.8 12.31 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z"/>
                </svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p>个人设置</p>
        </div>
    </a>
</div>

@endsection

@push('scripts')
<script>
function loadUserInfo() {
    utils.loading('加载中...');
    axios.get('/wechat/user')
        .then(response => {
            if (response.data.code === 200) {
                const user = response.data.data;
                document.getElementById('profileName').textContent = user.real_name || user.nickname;
                document.getElementById('profileDept').textContent = '微信昵称：' + user.nickname;
                if (user.avatar_url) {
                    document.getElementById('profileAvatar').src = user.avatar_url;
                }

                // 检查是否有查看他人打卡的权限
                checkManagementPermission(user);
            } else {
                utils.toast(response.data.message || '获取用户信息失败', { type: 'top' });
            }
        })
        .catch(() => {
            utils.toast('获取用户信息失败', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

function checkManagementPermission(user) {
    // 检查用户是否有 checkin.view.others 权限
    // 这里通过尝试访问打卡管理页面来判断
    axios.get('/wechat/checkin/management')
        .then(response => {
            // 如果能访问，显示入口
            if (response.status === 200) {
                document.getElementById('checkinManagementLink').style.display = '';
            }
        })
        .catch(error => {
            // 403 或其他错误表示没有权限，不显示入口
            console.log('用户没有打卡管理权限');
        });
}

document.addEventListener('DOMContentLoaded', loadUserInfo);
</script>
@endpush
