@extends('wechat.layouts.app')

@section('title', '学习打卡')
@section('navbar-title', '学习打卡')

@push('styles')
<style>
    .task-card {
        margin: 12px;
        border-radius: 12px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
    }

    .task-header {
        padding: 20px 24px 16px;
        background: linear-gradient(135deg, #4bb0ff 0%, #446dff 100%);
        color: #fff;
    }

    .task-header__date {
        font-size: 13px;
        opacity: 0.9;
        margin-bottom: 6px;
    }

    .task-header__title {
        font-size: 20px;
        font-weight: 600;
    }

    .task-body {
        padding: 0 24px 20px;
        background-color: #fff;
    }

    .task-section + .task-section {
        border-top: 1px solid #f1f1f1;
        margin-top: 16px;
        padding-top: 16px;
    }

    .task-section__title {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 10px;
    }

    .task-section__title svg {
        width: 22px;
        height: 22px;
        margin-right: 8px;
        fill: #4bb0ff;
    }

    .task-section__content {
        font-size: 15px;
        line-height: 1.8;
        color: #555;
        white-space: pre-wrap;
        word-break: break-word;
    }

    .checkin-opr {
        margin: 24px 16px 32px;
    }

    .checkin-opr .weui-btn {
        border-radius: 28px;
    }

    .stats-card,
    .recent-list {
        margin: 0 12px 16px;
        border-radius: 12px;
        overflow: hidden;
        background: #fff;
    }

    .stats-grid {
        display: flex;
        gap: 12px;
        padding: 16px 18px 22px;
    }

    .stat-item {
        flex: 1;
        text-align: center;
        border-radius: 12px;
        background: #f8f9fb;
        padding: 16px 10px;
    }

    .stat-value {
        font-size: 26px;
        font-weight: 700;
        color: #4bb0ff;
        margin-bottom: 6px;
    }

    .stat-label {
        font-size: 13px;
        color: #888;
    }

    .recent-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 18px;
        border-top: 1px solid #f3f3f3;
    }

    .recent-item:first-child {
        border-top: none;
    }

    .recent-date {
        font-size: 15px;
        color: #333;
    }

    .recent-status {
        font-size: 13px;
        padding: 4px 12px;
        border-radius: 999px;
    }

    .recent-status.completed {
        background: #e7f8ed;
        color: #07c160;
    }

    .recent-status.incomplete {
        background: #fff1f1;
        color: #fa5151;
    }

    .no-task-icon {
        width: 72px;
        height: 72px;
        fill: #c5d9ff;
    }

    .nav-btn {
        transition: all 0.2s ease;
    }

    .nav-btn:active:not(:disabled) {
        transform: scale(0.95);
        background: #e8ecf1 !important;
    }

    .nav-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
</style>
@endpush

@section('content')
@if($todayTask && $todayTask->status == 1)
<div class="task-card">
    <div class="task-header">
        <div class="task-header__date">{{ $targetDate->locale('zh_CN')->isoFormat('YYYY年M月D日 dddd') }}</div>
        <div class="task-header__title">{{ $isToday ? '今日学习任务' : '学习任务' }}</div>
    </div>
    <div class="task-body">
        <div class="task-section">
            <div class="task-section__title">
                <svg viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
                每天读经
            </div>
            <div class="task-section__content">{!! $todayTask->bible_reading !!}</div>
        </div>
        <div class="task-section">
            <div class="task-section__title">
                <svg viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
                每天灵修
            </div>
            <div class="task-section__content">{!! $todayTask->devotional !!}</div>
        </div>
    </div>
</div>

<div class="checkin-opr">
    @if($todayCheckin && $todayCheckin->is_completed)
        <button class="weui-btn weui-btn_default" disabled>
            已完成
            <small style="display:block;font-size:13px;font-weight:400;margin-top:6px;color:#666;">
                {{ $todayCheckin->completed_at->format('H:i') }} 完成打卡
            </small>
        </button>
    @elseif($isToday)
        <button class="weui-btn weui-btn_primary" onclick="completeTask(this)">完成学习并打卡</button>
    @else
        <button class="weui-btn weui-btn_default" disabled>
            历史任务
        </button>
    @endif
</div>
@else
<div class="weui-msg">
    <div class="weui-msg__icon-area">
        <svg class="no-task-icon" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"/></svg>
    </div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">今日暂无学习任务</h2>
        <p class="weui-msg__desc">请留意后续通知，保持灵修节奏。</p>
    </div>
</div>
@endif

<div class="stats-card weui-panel weui-panel_access">
    <div class="weui-panel__hd">本月统计</div>
    <div class="weui-panel__bd">
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-value">{{ $monthlyStats['total_days'] ?? 0 }}</div>
                <div class="stat-label">应学天数</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">{{ $monthlyStats['completed_days'] ?? 0 }}</div>
                <div class="stat-label">已完成天数</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">{{ $monthlyStats['completion_rate'] ?? 0 }}%</div>
                <div class="stat-label">完成率</div>
            </div>
        </div>
    </div>
</div>

<!-- 日期导航 -->
<div class="date-navigation" style="margin: 0 12px 30px;">
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);">
        <button id="prevDayBtn" class="nav-btn" style="border: none; background: #f5f7fa; color: #333; padding: 8px 16px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 4px;">
            <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            上一天
        </button>
        <div id="currentDateDisplay" style="font-size: 15px; font-weight: 600; color: #333;">
            {{ $targetDate->locale('zh_CN')->isoFormat('M月D日') }}
        </div>
        <button id="nextDayBtn" class="nav-btn" style="border: none; background: #f5f7fa; color: #333; padding: 8px 16px; border-radius: 8px; font-size: 14px; display: flex; align-items: center; gap: 4px;" {{ $isToday ? 'disabled' : '' }}>
            下一天
            <svg style="width: 16px; height: 16px; fill: currentColor;" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>
    </div>
</div>

@if(count($recentCheckins ?? []) > 0)
<div class="recent-list weui-panel weui-panel_access">
    <div class="weui-panel__hd">最近打卡记录</div>
    <div class="weui-panel__bd">
        @foreach($recentCheckins as $checkin)
        <div class="recent-item">
            <div class="recent-date">
                @php
                    $date = \Carbon\Carbon::parse($checkin->checkin_date)->locale('zh_CN');
                @endphp
                {{ $date->format('m月d日') }}
                @if($checkin->dailyTask)
                    <small style="color:#999;margin-left:6px;">{{ $date->isoFormat('dddd') }}</small>
                @endif
            </div>
            <span class="recent-status {{ $checkin->is_completed ? 'completed' : 'incomplete' }}">
                {{ $checkin->is_completed ? '已完成' : '未完成' }}
            </span>
        </div>
        @endforeach
    </div>
</div>
@endif
@endsection


@push('scripts')
<script>
// 当前查看的日期
let currentDate = new Date('{{ $targetDate->toDateString() }}');
const today = new Date('{{ now()->toDateString() }}');

// 日期导航
document.getElementById('prevDayBtn').addEventListener('click', function() {
    navigateDate(-1);
});

document.getElementById('nextDayBtn').addEventListener('click', function() {
    navigateDate(1);
});

function navigateDate(offset) {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + offset);

    // 不能超过今天
    if (newDate > today) {
        return;
    }

    // 格式化日期为 YYYY-MM-DD
    const dateString = newDate.toISOString().split('T')[0];

    // 跳转到新日期
    window.location.href = '/checkin?date=' + dateString;
}

// 禁用/启用按钮样式
function updateButtonStates() {
    const nextBtn = document.getElementById('nextDayBtn');
    const isToday = currentDate.toDateString() === today.toDateString();

    if (isToday) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.4';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

updateButtonStates();

function completeTask(button) {
    utils.confirm({
        message: '确认已完成今日学习任务？',
        confirmText: '确认',
        onConfirm: () => {
            const target = button;
            target.disabled = true;
            target.textContent = '提交中...';
            utils.loading('提交中...');

            axios.post('/wechat/checkin/complete')
                .then(response => {
                    if (response.data.success) {
                        utils.toast('打卡成功！');
                        setTimeout(() => {
                            window.location.reload();
                        }, 800);
                    } else {
                        utils.toast(response.data.message || '打卡失败', { type: 'top' });
                        target.disabled = false;
                        target.textContent = '完成学习并打卡';
                    }
                })
                .catch(error => {
                    console.error('打卡错误:', error);
                    utils.toast('网络错误，请重试', { type: 'top' });
                    target.disabled = false;
                    target.textContent = '完成学习并打卡';
                })
                .finally(() => {
                    utils.hideLoading();
                });
        }
    });
}
</script>
@endpush
