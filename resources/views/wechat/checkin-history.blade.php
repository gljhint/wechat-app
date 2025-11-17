@extends('wechat.layouts.app')

@section('title', '学习日历')
@section('navbar-title', '学习日历')

@push('styles')
<style>
    .calendar-page {
        min-height: 100vh;
        background: #f5f6f7;
        padding-bottom: 20px;
    }

    /* 月份选择器 */
    .month-selector {
        background: #fff;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    .month-nav-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #f6f7f9;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 20px;
        transition: all 0.2s;
    }

    .month-nav-btn:active {
        background: #e8e9eb;
        transform: scale(0.95);
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

    /* 统计卡片 */
    .stats-summary {
        background: #fff;
        margin: 0 12px 12px;
        padding: 20px 16px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    .achievement-title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
        margin-bottom: 16px;
        text-align: center;
    }

    .stats-grid {
        display: flex;
        gap: 12px;
        margin-bottom: 20px;
    }

    .stat-box {
        flex: 1;
        text-align: center;
        padding: 16px 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: #fff;
    }

    .stat-box:nth-child(2) {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .stat-box:nth-child(3) {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .stat-icon {
        font-size: 24px;
        margin-bottom: 6px;
    }

    .stat-value {
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 4px;
    }

    .stat-label {
        font-size: 12px;
        opacity: 0.9;
    }

    /* 徽章容器 */
    .badges-container {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 16px;
        border-top: 1px solid #f0f0f0;
    }

    .badge-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 12px;
        border-radius: 12px;
        background: #f6f7f9;
        min-width: 80px;
    }

    .badge-item.unlocked {
        background: linear-gradient(135deg, #fff5e6 0%, #ffe6cc 100%);
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .badge-icon {
        font-size: 32px;
        filter: grayscale(100%);
        opacity: 0.4;
    }

    .badge-item.unlocked .badge-icon {
        filter: grayscale(0%);
        opacity: 1;
    }

    .badge-name {
        font-size: 12px;
        color: #666;
        font-weight: 600;
    }

    .badge-item.unlocked .badge-name {
        color: #d97706;
    }

    /* 日历容器 */
    .calendar-container {
        background: #fff;
        margin: 0 12px;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }

    /* 星期标题 */
    .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
        margin-bottom: 8px;
    }

    .weekday {
        text-align: center;
        font-size: 13px;
        color: #999;
        font-weight: 600;
        padding: 8px 0;
    }

    /* 日历格子 */
    .calendar-grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
    }

    .calendar-day {
        aspect-ratio: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        position: relative;
        transition: all 0.2s;
        background: #f6f7f9;
        border: 2px solid transparent;
    }

    .calendar-day.empty {
        background: transparent;
        pointer-events: none;
    }

    .calendar-day.future {
        opacity: 0.4;
        pointer-events: none;
    }

    .calendar-day.today {
        border-color: #576cd6;
    }

    .calendar-day.checked {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .calendar-day.unchecked {
        background: #fff;
        border: 1px solid #e5e5e5;
    }

    .calendar-day.unchecked:active {
        transform: scale(0.95);
        background: #f9f9f9;
    }

    .day-number {
        font-size: 15px;
        font-weight: 600;
        color: #333;
        margin-bottom: 2px;
    }

    .calendar-day.checked .day-number {
        color: #fff;
    }

    .day-status {
        font-size: 16px;
        line-height: 1;
        color: #fff;
    }

    /* 图例说明 */
    .calendar-legend {
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #f0f0f0;
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #666;
    }

    .legend-box {
        width: 20px;
        height: 20px;
        border-radius: 4px;
    }

    .legend-box.checked {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .legend-box.unchecked {
        background: #fff;
        border: 1px solid #e5e5e5;
    }

    .legend-box.today {
        background: #f6f7f9;
        border: 2px solid #576cd6;
    }

    /* 详情弹窗 */
    .day-detail-popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        animation: fadeIn 0.2s;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    .detail-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
        border-radius: 16px 16px 0 0;
        padding: 20px;
        max-height: 70vh;
        overflow-y: auto;
        animation: slideUp 0.3s;
    }

    @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }

    .detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #f0f0f0;
    }

    .detail-title {
        font-size: 18px;
        font-weight: 600;
        color: #111;
    }

    .detail-close {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #f6f7f9;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #666;
    }

    .detail-body {
        padding: 12px 0;
    }

    .task-info {
        margin-bottom: 16px;
    }

    .task-label {
        font-size: 13px;
        color: #999;
        margin-bottom: 6px;
    }

    .task-value {
        font-size: 15px;
        color: #333;
        line-height: 1.6;
    }

    .makeup-action {
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #f0f0f0;
    }

    .makeup-btn-large {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        transition: opacity 0.2s;
    }

    .makeup-btn-large:active {
        opacity: 0.8;
    }

    .empty-state {
        padding: 60px 20px;
        text-align: center;
    }

    .empty-icon {
        font-size: 56px;
        margin-bottom: 12px;
        opacity: 0.3;
    }

    .empty-text {
        font-size: 15px;
        color: #999;
    }
</style>
@endpush

@section('content')
<div class="calendar-page">
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

    
    <!-- 成就徽章 -->
    <div class="stats-summary">
        <div class="achievement-title">本月成就</div>
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-value" id="workdayCheckins">0</div>
                <div class="stat-label">本月读经</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" id="currentStreak">0</div>
                <div class="stat-label">连续打卡</div>
            </div>
            <div class="stat-box">
                <div class="stat-value" id="bestStreak">0</div>
                <div class="stat-label">最佳记录</div>
            </div>
        </div>
    </div>

    <!-- 日历视图 -->
    <div class="calendar-container" id="calendarContainer">
        <!-- 星期标题 -->
        <div class="weekdays">
            <div class="weekday">日</div>
            <div class="weekday">一</div>
            <div class="weekday">二</div>
            <div class="weekday">三</div>
            <div class="weekday">四</div>
            <div class="weekday">五</div>
            <div class="weekday">六</div>
        </div>

        <!-- 日历格子 -->
        <div class="calendar-grid" id="calendarGrid">
            <div class="weui-loadmore">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">加载中...</span>
            </div>
        </div>

        <!-- 图例 -->
        <div class="calendar-legend">
            <div class="legend-item">
                <div class="legend-box checked"></div>
                <span>已打卡</span>
            </div>
            <div class="legend-item">
                <div class="legend-box unchecked"></div>
                <span>未打卡</span>
            </div>
            <div class="legend-item">
                <div class="legend-box today"></div>
                <span>今天</span>
            </div>
        </div>
    </div>
</div>

<!-- 日期详情弹窗 -->
<div class="day-detail-popup" id="dayDetailPopup">
    <div class="detail-content">
        <div class="detail-header">
            <div class="detail-title" id="detailDate">详情</div>
            <button class="detail-close" onclick="closeDetail()">×</button>
        </div>
        <div class="detail-body" id="detailBody">
            <!-- 动态内容 -->
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;
let historyData = [];
let checkinMap = {};

document.addEventListener('DOMContentLoaded', function() {
    loadHistory();

    // 点击弹窗背景关闭
    document.getElementById('dayDetailPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeDetail();
        }
    });
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
    loadHistory();
}

function updateMonthDisplay() {
    const now = new Date();
    const isCurrentMonth = currentYear === now.getFullYear() && currentMonth === (now.getMonth() + 1);

    document.getElementById('monthDisplay').textContent = `${currentYear}年${currentMonth}月`;
    document.getElementById('nextMonth').disabled = isCurrentMonth;
}

function loadHistory() {
    const gridContainer = document.getElementById('calendarGrid');

    gridContainer.innerHTML = `
        <div class="weui-loadmore" style="grid-column: 1 / -1;">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    `;

    axios.get('/wechat/api/checkin/history', {
        params: {
            year: currentYear,
            month: currentMonth
        }
    })
    .then(response => {
        if (response.data.success) {
            historyData = response.data.data || [];
            renderCalendar();
            updateStats(response.data.continuous_days || 0);
            updateMonthDisplay();
        } else {
            utils.toast(response.data.message || '加载失败', { type: 'top' });
            renderEmpty('加载失败');
        }
    })
    .catch(error => {
        console.error('加载历史记录失败:', error);
        utils.toast('加载失败，请重试', { type: 'top' });
        renderEmpty('加载失败');
    });
}

function renderCalendar() {
    const gridContainer = document.getElementById('calendarGrid');

    // 创建打卡记录映射
    checkinMap = {};
    if (historyData) {
        historyData.forEach(item => {
            // 提取日期部分 YYYY-MM-DD (兼容时间戳格式)
            const dateKey = item.checkin_date.split('T')[0];
            checkinMap[dateKey] = item;
        });
    }

    // 获取本月第一天是星期几 (0=周日, 1=周一, ...)
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

    // 获取本月天数
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    // 今天的日期字符串(使用本地时区)
    const nowDate = new Date();
    const today = `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}-${String(nowDate.getDate()).padStart(2, '0')}`;

    let html = '';

    // 填充空白格子（对齐星期）
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }

    // 渲染每一天
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(currentYear, currentMonth - 1, day);
        
        // 使用本地日期格式,避免时区问题
        const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isFuture = dateStr > today;
        const isToday = dateStr === today;
        const checkin = checkinMap[dateStr];
        const isChecked = checkin && checkin.is_completed;
      
        let dayClass = 'calendar-day';
        let statusIcon = '';

        if (isFuture) {
            dayClass += ' future';
        } else if (isChecked) {
            dayClass += ' checked';
            statusIcon = '<div class="day-status">✓</div>';
        } else {
            dayClass += ' unchecked';
        }

        if (isToday) {
            dayClass += ' today';
        }

        const clickHandler = !isFuture ? `onclick="showDayDetail('${dateStr}')"` : '';

        html += `
            <div class="${dayClass}" ${clickHandler}>
                <div class="day-number">${day}</div>
                ${statusIcon}
            </div>
        `;
    }

    gridContainer.innerHTML = html;
}

function renderEmpty(message) {
    const gridContainer = document.getElementById('calendarGrid');
    gridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-icon">📅</div>
            <div class="empty-text">${message}</div>
        </div>
    `;
}

function updateStats(continuousDays = 0) {
    if (!historyData) return;

    // 获取本月所有已打卡的日期
    const checkedDates = historyData
        .filter(item => item.is_completed == 1 || item.is_completed === true)
        .map(item => item.checkin_date.split('T')[0])
        .sort();

    // 1. 计算打卡天数（排除周日）
    let workdayCheckins = 0;
    checkedDates.forEach(dateStr => {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay();
        // 0=周日需要休息，1-6都需要打卡
        if (dayOfWeek !== 0) {
            workdayCheckins++;
        }
    });

    // 2. 计算当前连击（从今天往前连续打卡的天数）
    let currentStreak = 0;
    const today = new Date();
    let checkDate = new Date(today);

    while (true) {
        const dayOfWeek = checkDate.getDay();

        // 跳过周日
        if (dayOfWeek === 0) {
            checkDate.setDate(checkDate.getDate() - 1);
            continue;
        }

        const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;

        if (checkedDates.includes(dateStr)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    // 3. 计算最佳连击（本月最长连续打卡天数,排除周日）
    let bestStreak = 0;
    let tempStreak = 0;
    let lastCheckinDay = null;

    checkedDates.forEach(dateStr => {
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay();

        // 只统计周一到周六
        if (dayOfWeek === 0) return;

        if (!lastCheckinDay) {
            tempStreak = 1;
        } else {
            // 检查是否是连续的打卡日
            const diffDays = Math.floor((date - lastCheckinDay) / (1000 * 60 * 60 * 24));
            // 如果相差1天,或者间隔1个周日(相差2天且上一个是周六,当前是周一)
            const lastDayOfWeek = lastCheckinDay.getDay();
            const isConsecutive = diffDays === 1 || (diffDays === 2 && lastDayOfWeek === 6 && dayOfWeek === 1);

            if (isConsecutive) {
                tempStreak++;
            } else {
                tempStreak = 1;
            }
        }

        bestStreak = Math.max(bestStreak, tempStreak);
        lastCheckinDay = date;
    });

    // 更新显示
    document.getElementById('workdayCheckins').textContent = workdayCheckins;
    document.getElementById('currentStreak').textContent = currentStreak;
    document.getElementById('bestStreak').textContent = bestStreak;

}

// 显示日期详情
function showDayDetail(dateStr) {
    const checkin = checkinMap[dateStr];
    // 解析日期字符串 YYYY-MM-DD
    const parts = dateStr.split('-');
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    const displayDate = `${date.getMonth() + 1}月${date.getDate()}日`;
    const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];

    document.getElementById('detailDate').textContent = `${displayDate} ${weekDay}`;

    let bodyHtml = '';

    if (checkin && checkin.is_completed) {
        // 已打卡
        const task = checkin.daily_task;
        bodyHtml = `
            <div class="task-info">
                <div class="task-label">打卡状态</div>
                <div class="task-value">✅ 已完成</div>
            </div>
        `;

        if (checkin.completed_at) {
            const completedTime = new Date(checkin.completed_at);
            bodyHtml += `
                <div class="task-info">
                    <div class="task-label">打卡时间</div>
                    <div class="task-value">${completedTime.toLocaleString('zh-CN')}</div>
                </div>
            `;
        }
    } else {
        // 未打卡
        bodyHtml = `
            <div class="task-info">
                <div class="task-label">打卡状态</div>
                <div class="task-value" style="color: #999;">❌ 未打卡</div>
            </div>
            <div class="makeup-action">
                <button class="makeup-btn-large" onclick="handleMakeup('${dateStr}')">
                    补打卡
                </button>
            </div>
        `;
    }

    document.getElementById('detailBody').innerHTML = bodyHtml;
    document.getElementById('dayDetailPopup').style.display = 'block';
}

// 关闭详情弹窗
function closeDetail() {
    document.getElementById('dayDetailPopup').style.display = 'none';
}

// 处理补打卡
function handleMakeup(date) {
    closeDetail();

    weui.confirm('确认要补打卡吗？', {
        title: '补打卡确认',
        buttons: [{
            label: '取消',
            type: 'default'
        }, {
            label: '确认',
            type: 'primary',
            onClick: function() {
                performMakeup(date);
            }
        }]
    });
}

function performMakeup(date) {
    const loading = weui.loading('提交中...');

    axios.post('/wechat/checkin/makeup', {
        date: date
    })
    .then(response => {
        loading.hide();

        if (response.data.success) {
            weui.toast('补打卡成功！', {
                duration: 2000,
                className: 'custom-toast'
            });

            // 重新加载数据
            setTimeout(() => {
                loadHistory();
            }, 500);
        } else {
            weui.alert(response.data.message || '补打卡失败', {
                title: '提示'
            });
        }
    })
    .catch(error => {
        loading.hide();
        console.error('补打卡失败:', error);

        const message = error.response?.data?.message || '补打卡失败，请重试';
        weui.alert(message, {
            title: '错误'
        });
    });
}
</script>
@endpush

