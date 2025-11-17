@extends('wechat.layouts.app')

@section('title', '系统设置')
@section('navbar-title', '系统设置')

@push('styles')
<style>
    .settings-page {
        padding-bottom: 88px;
        background-color: #f5f5f5;
    }

    .settings-section {
        margin: 12px;
        background-color: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .settings-section-title {
        padding: 16px;
        font-size: 14px;
        color: #999;
        font-weight: 500;
        border-bottom: 1px solid #f5f5f5;
    }

    .settings-item {
        display: flex;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid #f5f5f5;
        transition: background-color 0.2s;
    }

    .settings-item:last-child {
        border-bottom: none;
    }

    .settings-item:active {
        background-color: #f5f5f5;
    }

    .settings-icon {
        width: 44px;
        height: 44px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        margin-right: 12px;
        flex-shrink: 0;
    }

    .settings-icon.blue {
        background-color: rgba(24, 144, 255, 0.12);
    }

    .settings-icon.green {
        background-color: rgba(7, 193, 96, 0.12);
    }

    .settings-content {
        flex: 1;
        min-width: 0;
    }

    .settings-title {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        margin-bottom: 4px;
    }

    .settings-desc {
        font-size: 13px;
        color: #999;
    }

    .settings-arrow {
        color: #c7c7cc;
        font-size: 18px;
        margin-left: 8px;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 16px;
    }

    .stat-card {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
    }

    .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #07c160;
        margin-bottom: 4px;
    }

    .stat-label {
        font-size: 13px;
        color: #666;
    }
</style>
@endpush

@section('content')
<div class="settings-page">
    <!-- 统计信息 -->
    <div class="settings-section">
        <div class="settings-section-title">数据统计</div>
        <div class="stats-grid" id="statsGrid">
            <div class="weui-loadmore">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">加载中...</span>
            </div>
        </div>
    </div>

    <!-- 管理功能 -->
    <div class="settings-section">
        <div class="settings-section-title">管理功能</div>

        <a href="/settings/users" class="settings-item">
            <div class="settings-icon blue">👥</div>
            <div class="settings-content">
                <div class="settings-title">用户角色管理</div>
                <div class="settings-desc">为用户分配角色权限</div>
            </div>
            <span class="settings-arrow">›</span>
        </a>

        <a href="/settings/tasks" class="settings-item">
            <div class="settings-icon green">📝</div>
            <div class="settings-content">
                <div class="settings-title">学习任务发布</div>
                <div class="settings-desc">创建和管理每日学习任务</div>
            </div>
            <span class="settings-arrow">›</span>
        </a>
    </div>
</div>
@endsection

@push('scripts')
<script>
// 加载统计数据
function loadStatistics() {
    axios.get('/wechat/system/users/statistics')
        .then(response => {
            if (response.data.code === 200) {
                renderStatistics(response.data.data);
            } else {
                utils.toast(response.data.message || '加载失败', { type: 'top' });
            }
        })
        .catch(() => {
            document.getElementById('statsGrid').innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: #999; padding: 20px;">
                    加载失败
                </div>
            `;
        });
}

function renderStatistics(data) {
    const grid = document.getElementById('statsGrid');
    if (!grid || !data || !Array.isArray(data)) return;

    let html = '';
    data.forEach(role => {
        html += `
            <div class="stat-card">
                <div class="stat-value">${role.count}</div>
                <div class="stat-label">${role.name}</div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    loadStatistics();
});
</script>
@endpush
