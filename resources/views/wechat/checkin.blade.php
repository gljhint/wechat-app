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

    .ai-explanation-toggle {
        margin-top: 12px;
        padding: 10px 16px;
        background: #f8f9fb;
        border-radius: 8px;
        border: none;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #576b95;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
    }

    .ai-explanation-toggle:active {
        background: #e8ecf1;
    }

    .ai-explanation-toggle svg {
        width: 16px;
        height: 16px;
        fill: currentColor;
        transition: transform 0.3s;
    }

    .ai-explanation-toggle.expanded svg {
        transform: rotate(180deg);
    }

    .ai-explanation-content {
        margin-top: 12px;
        padding: 16px;
        background: #f8fafb;
        border-radius: 8px;
        font-size: 14px;
        line-height: 1.8;
        color: #333;
        white-space: pre-wrap;
        word-break: break-word;
        display: none;
    }

    .ai-explanation-content.show {
        display: block;
    }

    .ai-actions {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #e5e9ef;
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .ai-vote-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 6px;
        border: 1px solid #e5e9ef;
        background: #fff;
        font-size: 14px;
        color: #666;
        cursor: pointer;
        transition: all 0.2s;
    }

    .ai-vote-btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
    }

    .ai-vote-btn:active {
        transform: scale(0.96);
    }

    .ai-vote-btn.active {
        border-color: #4bb0ff;
        background: #f0f7ff;
        color: #4bb0ff;
    }

    .ai-vote-btn.like.active {
        border-color: #07c160;
        background: #e7f8ed;
        color: #07c160;
    }

    .ai-vote-btn.dislike.active {
        border-color: #fa5151;
        background: #fff1f1;
        color: #fa5151;
    }

    .ai-generate-btn {
        padding: 10px 20px;
        background: linear-gradient(135deg, #4bb0ff 0%, #446dff 100%);
        color: #fff;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .ai-generate-btn:active {
        transform: scale(0.96);
        opacity: 0.9;
    }

    .ai-generate-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .ai-warning {
        padding: 10px 12px;
        background: #fff7e6;
        border-left: 3px solid #ff9900;
        border-radius: 4px;
        font-size: 13px;
        color: #d97706;
        margin-bottom: 12px;
    }

    .ai-disclaimer {
        margin-top: 12px;
        padding: 8px 12px;
        background: #f0f0f0;
        border-radius: 4px;
        font-size: 12px;
        color: #666;
        line-height: 1.6;
    }

    .ai-explanation-content h1,
    .ai-explanation-content h2,
    .ai-explanation-content h3 {
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 8px;
        color: #333;
    }

    .ai-explanation-content h1 { font-size: 18px; }
    .ai-explanation-content h2 { font-size: 16px; }
    .ai-explanation-content h3 { font-size: 15px; }

    .ai-explanation-content strong {
        font-weight: 600;
        color: #333;
    }

    .ai-explanation-content ul,
    .ai-explanation-content ol {
        margin: 8px 0;
        padding-left: 20px;
    }

    .ai-explanation-content li {
        margin: 4px 0;
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

            <!-- AI解释折叠区 -->
            <button class="ai-explanation-toggle" onclick="toggleAIExplanation()">
                <span>
                    <svg style="width:16px;height:16px;fill:currentColor;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
                    AI解释
                </span>
                <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </button>

            <div class="ai-explanation-content" id="aiExplanationContent" data-task-id="{{ $todayTask->id }}">
                <!-- AI解释内容将在这里动态加载 -->
                <div style="text-align:center;padding:20px;color:#999;">
                    <svg style="width:48px;height:48px;fill:#ddd;margin-bottom:8px;" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <div>加载中...</div>
                </div>
            </div>
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

// AI解释相关变量
let aiExplanationData = null;
let isExplanationLoaded = false;

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

// ===== AI解释功能 =====

// 简单的 Markdown 转 HTML 函数
function simpleMarkdownToHtml(text) {
    // 转义 HTML 特殊字符
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 标题: ### 标题 -> <h3>标题</h3>
    text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // 粗体: **文本** -> <strong>文本</strong>
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // 列表项: - 项目 或 · 项目
    text = text.replace(/^[·-] (.+)$/gm, '<li>$1</li>');

    // 将连续的 li 包裹在 ul 中
    text = text.replace(/(<li>.*<\/li>\n?)+/g, function(match) {
        return '<ul>' + match + '</ul>';
    });

    // 换行处理
    text = text.replace(/\n/g, '<br>');

    return text;
}

// 展开/折叠AI解释
function toggleAIExplanation() {
    const toggle = document.querySelector('.ai-explanation-toggle');
    const content = document.getElementById('aiExplanationContent');

    toggle.classList.toggle('expanded');
    content.classList.toggle('show');

    // 首次打开时加载数据
    if (content.classList.contains('show') && !isExplanationLoaded) {
        loadAIExplanation();
    }
}

// 加载AI解释
function loadAIExplanation() {
    const content = document.getElementById('aiExplanationContent');
    const taskId = content.getAttribute('data-task-id');

    axios.get(`/wechat/bible-explanations/task/${taskId}`)
        .then(response => {
            isExplanationLoaded = true;

            if (response.data.success) {
                aiExplanationData = response.data.data;
                renderAIExplanation(aiExplanationData);
            } else {
                // 没有解释，显示生成按钮
                renderNoExplanation();
            }
        })
        .catch(error => {
            console.error('加载AI解释错误:', error);
            if (error.response && error.response.status === 404) {
                renderNoExplanation();
            } else {
                content.innerHTML = '<div style="text-align:center;padding:20px;color:#fa5151;">加载失败，请重试</div>';
            }
        });
}

// 渲染AI解释内容
function renderAIExplanation(data) {
    const content = document.getElementById('aiExplanationContent');
    const shouldRegenerate = data.dislikes_count > 5;

    let html = '';

    if (shouldRegenerate) {
        html += `<div class="ai-warning">
            <svg style="width:14px;height:14px;fill:currentColor;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
            该解释踩数已超过5次，建议重新生成
        </div>`;
    }

    // 将 Markdown 转换为 HTML
    const htmlContent = simpleMarkdownToHtml(data.explanation);
    html += `<div style="margin-bottom:12px;">${htmlContent}</div>`;


    // 添加免责声明
    html += `<div class="ai-disclaimer">
        <svg style="width:14px;height:14px;fill:currentColor;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg>这是由AI生成的内容，内容可能是错的，仅供参考。${shouldRegenerate ? '' : '踩的数量大于5可以重新生成。'}
    </div>`;

    html += `<div class="ai-actions">
        <button class="ai-vote-btn like ${data.user_vote === 1 ? 'active' : ''}" onclick="voteExplanation(1)">
            <svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
            <span>${data.likes_count}</span>
        </button>
        <button class="ai-vote-btn dislike ${data.user_vote === -1 ? 'active' : ''}" onclick="voteExplanation(-1)">
            <svg viewBox="0 0 24 24"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>
            <span>${data.dislikes_count}</span>
        </button>`;

    if (shouldRegenerate) {
        html += `<button class="ai-generate-btn" onclick="regenerateExplanation()">重新生成</button>`;
    }

    html += `</div>`;

    content.innerHTML = html;
}

// 渲染无解释状态
function renderNoExplanation() {
    const content = document.getElementById('aiExplanationContent');
    content.innerHTML = `
        <div style="text-align:center;padding:20px;">
            <svg style="width:48px;height:48px;fill:#ddd;margin-bottom:8px;" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>
            <div style="color:#999;margin-bottom:16px;">暂无AI解释</div>
            <button class="ai-generate-btn" onclick="generateExplanation()">生成解释</button>
        </div>
    `;
}

// 生成AI解释
function generateExplanation() {
    const content = document.getElementById('aiExplanationContent');
    const taskId = content.getAttribute('data-task-id');

    utils.loading('生成中...');

    axios.post(`/wechat/bible-explanations/task/${taskId}/generate`)
        .then(response => {
            if (response.data.success) {
                utils.toast('生成成功！');
                // 重新加载解释
                isExplanationLoaded = false;
                loadAIExplanation();
            } else {
                utils.toast(response.data.message || '生成失败', { type: 'top' });
            }
        })
        .catch(error => {
            console.error('生成AI解释错误:', error);
            utils.toast('生成失败，请重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

// 重新生成AI解释
function regenerateExplanation() {
    utils.confirm({
        message: '确认重新生成AI解释？',
        confirmText: '确认',
        onConfirm: () => {
            const content = document.getElementById('aiExplanationContent');
            const taskId = content.getAttribute('data-task-id');

            utils.loading('重新生成中...');

            axios.post(`/wechat/bible-explanations/task/${taskId}/regenerate`)
                .then(response => {
                    if (response.data.success) {
                        utils.toast('重新生成成功！');
                        // 重新加载解释
                        isExplanationLoaded = false;
                        loadAIExplanation();
                    } else {
                        utils.toast(response.data.message || '生成失败', { type: 'top' });
                    }
                })
                .catch(error => {
                    console.error('重新生成AI解释错误:', error);
                    utils.toast('生成失败，请重试', { type: 'top' });
                })
                .finally(() => {
                    utils.hideLoading();
                });
        }
    });
}

// 投票
function voteExplanation(voteType) {
    if (!aiExplanationData) return;

    axios.post(`/wechat/bible-explanations/${aiExplanationData.id}/vote`, {
        vote_type: voteType
    })
        .then(response => {
            if (response.data.success) {
                // 更新数据
                aiExplanationData.likes_count = response.data.data.likes_count;
                aiExplanationData.dislikes_count = response.data.data.dislikes_count;
                aiExplanationData.user_vote = response.data.data.user_vote;

                // 重新渲染
                renderAIExplanation(aiExplanationData);

                // 如果需要重新生成，提示用户
                if (response.data.data.should_regenerate) {
                    utils.toast('该解释踩数已超过5次，建议重新生成');
                }
            } else {
                utils.toast(response.data.message || '投票失败', { type: 'top' });
            }
        })
        .catch(error => {
            console.error('投票错误:', error);
            utils.toast('投票失败，请重试', { type: 'top' });
        });
}
</script>
@endpush
