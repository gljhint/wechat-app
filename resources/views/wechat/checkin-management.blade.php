@extends('wechat.layouts.app')

@section('title', '打卡管理')
@section('navbar-title', '打卡管理')

@push('styles')
<style>
    .management-page {
        min-height: 100vh;
        background: #f5f6f7;
    }

    .month-selector {
        background: #fff;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .month-nav-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #f6f7f9;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 18px;
        transition: background 0.2s;
    }

    .month-nav-btn:active {
        background: #e8e9eb;
    }

    .month-nav-btn:disabled {
        opacity: 0.3;
        pointer-events: none;
    }

    .month-display {
        font-size: 17px;
        font-weight: 600;
        color: #111;
    }

    .overview-stats {
        background: #fff;
        margin: 0 0 12px;
        padding: 20px 16px;
    }

    .stats-grid {
        display: flex;
        gap: 12px;
    }

    .stat-box {
        flex: 1;
        text-align: center;
        padding: 16px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: #fff;
    }

    .stat-box:nth-child(2) {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .stat-value {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 4px;
    }

    .stat-label {
        font-size: 12px;
        opacity: 0.9;
    }

    .user-list {
        background: #fff;
        margin-bottom: 16px;
    }

    .user-item {
        padding: 16px;
        border-bottom: 1px solid #f0f0f0;
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: background 0.2s;
    }

    .user-item:active {
        background: #f8f9fa;
    }

    .user-item:last-child {
        border-bottom: none;
    }

    .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: 6px;
        flex-shrink: 0;
    }

    .user-info {
        flex: 1;
        min-width: 0;
    }

    .user-name {
        font-size: 16px;
        font-weight: 600;
        color: #111;
        margin-bottom: 4px;
    }

    .user-role {
        font-size: 13px;
        color: #666;
    }

    .checkin-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 56px;
        height: 32px;
        padding: 0 12px;
        background: linear-gradient(135deg, #4bb0ff 0%, #446dff 100%);
        border-radius: 16px;
        color: #fff;
        font-size: 16px;
        font-weight: 700;
    }

    .checkin-badge.zero {
        background: #e8e9eb;
        color: #999;
    }

    .user-details {
        background: #fff;
        padding: 20px 16px;
        margin-bottom: 12px;
        display: none;
    }

    .user-details.active {
        display: block;
    }

    .details-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid #f0f0f0;
    }

    .details-avatar {
        width: 56px;
        height: 56px;
        border-radius: 6px;
    }

    .details-info {
        flex: 1;
    }

    .details-name {
        font-size: 18px;
        font-weight: 600;
        color: #111;
        margin-bottom: 4px;
    }

    .details-role {
        font-size: 14px;
        color: #666;
    }

    .checkin-list-title {
        font-size: 15px;
        font-weight: 600;
        color: #111;
        margin-bottom: 12px;
    }

    .checkin-item {
        padding: 12px;
        background: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 8px;
    }

    .checkin-date {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin-bottom: 6px;
    }

    .checkin-time {
        font-size: 12px;
        color: #999;
    }

    .empty-state {
        padding: 60px 20px;
        text-align: center;
    }

    .empty-icon {
        font-size: 48px;
        margin-bottom: 12px;
        opacity: 0.3;
    }

    .empty-text {
        font-size: 14px;
        color: #999;
    }
</style>
@endpush

@section('content')
<div class="management-page">
    <!-- 月份选择器 -->
    <div class="month-selector">
        <button type="button" class="month-nav-btn" id="prevMonth" onclick="changeMonth(-1)">
            ‹
        </button>
        <div class="month-display" id="monthDisplay">加载中...</div>
        <button type="button" class="month-nav-btn" id="nextMonth" onclick="changeMonth(1)">
            ›
        </button>
    </div>

    <!-- 统计概览 -->
    <div class="overview-stats">
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-value" id="totalUsers">0</div>
                <div class="stat-label">总用户数</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" id="totalCheckins">0</div>
                <div class="stat-label">总打卡数</div>
            </div>
        </div>
    </div>

    <!-- 用户列表 -->
    <div class="user-list" id="userList">
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    </div>

    <!-- 用户详情（动态展开） -->
    <div class="user-details" id="userDetails"></div>
</div>
@endsection

@push('scripts')
<script>
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
let allData = [];
let selectedUserId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadData();
});

function changeMonth(delta) {
    currentMonth += delta;

    if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    } else if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    }

    updateMonthDisplay();
    loadData();
}

function updateMonthDisplay() {
    const now = new Date();
    const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === (now.getMonth() + 1);

    document.getElementById('monthDisplay').textContent = `${currentYear}年${currentMonth}月`;
    document.getElementById('nextMonth').disabled = isCurrentMonth;
}

function loadData() {
    const listContainer = document.getElementById('userList');
    const detailsContainer = document.getElementById('userDetails');

    listContainer.innerHTML = `
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    `;
    detailsContainer.classList.remove('active');
    selectedUserId = null;

    axios.get('/wechat/api/checkin/all', {
        params: {
            year: currentYear,
            month: currentMonth
        }
    })
    .then(response => {
        if (response.data.success) {
            allData = response.data.data;
            renderUserList();
            updateStats();
            updateMonthDisplay();
        } else {
            utils.toast(response.data.message || '加载失败', { type: 'top' });
            renderEmpty('加载失败');
        }
    })
    .catch(error => {
        console.error('加载数据失败:', error);
        utils.toast('加载失败，请重试', { type: 'top' });
        renderEmpty('加载失败');
    });
}

function renderUserList() {
    const listContainer = document.getElementById('userList');

    if (!allData.users || allData.users.length === 0) {
        renderEmpty('暂无用户数据');
        return;
    }

    let html = '';
    allData.users.forEach(user => {
        const badgeClass = user.checkin_count === 0 ? 'zero' : '';
        html += `
            <div class="user-item" onclick="toggleUserDetails(${user.user_id})">
                <img class="user-avatar" src="${user.avatar_url || '/default-avatar.png'}" alt="${user.nickname}">
                <div class="user-info">
                    <div class="user-name">${user.real_name??user.nickname}</div>
                </div>
                <div class="checkin-badge ${badgeClass}">${user.checkin_count} 次</div>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

function toggleUserDetails(userId) {
    const detailsContainer = document.getElementById('userDetails');

    if (selectedUserId === userId) {
        // 关闭详情
        detailsContainer.classList.remove('active');
        selectedUserId = null;
        return;
    }

    selectedUserId = userId;
    const user = allData.users.find(u => u.user_id === userId);

    if (!user) return;

    let checkinsHtml = '';
    if (user.checkins && user.checkins.length > 0) {
        user.checkins.forEach(checkin => {
            const date = new Date(checkin.checkin_date);
            const dateStr = `${date.getMonth() + 1}月${date.getDate()}日`;
            const timeStr = new Date(checkin.completed_at).toLocaleString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
            });

            checkinsHtml += `
                <div class="checkin-item">
                    <div class="checkin-date">${dateStr} - ${checkin.task_title}</div>
                    <div class="checkin-time">完成时间：${timeStr}</div>
                </div>
            `;
        });
    } else {
        checkinsHtml = '<div class="empty-state"><div class="empty-icon">📝</div><div class="empty-text">本月暂无打卡记录</div></div>';
    }

    detailsContainer.innerHTML = `
        <div class="details-header">
            <img class="details-avatar" src="${user.avatar_url || '/default-avatar.png'}" alt="${user.nickname}">
            <div class="details-info">
                <div class="details-name">${user.real_name??user.nickname}</div>
            </div>
        </div>
        <div class="checkin-list-title">本月打卡记录 (${user.checkin_count}次)</div>
        ${checkinsHtml}
    `;

    detailsContainer.classList.add('active');

    // 滚动到详情区域
    setTimeout(() => {
        detailsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function renderEmpty(message) {
    const listContainer = document.getElementById('userList');
    listContainer.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">👥</div>
            <div class="empty-text">${message}</div>
        </div>
    `;
}

function updateStats() {
    document.getElementById('totalUsers').textContent = allData.total_users || 0;
    document.getElementById('totalCheckins').textContent = allData.total_checkins || 0;
}
</script>
@endpush
