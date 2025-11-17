@extends('wechat.layouts.app')

@section('title', '学习任务发布')
@section('navbar-title', '学习任务发布')

@push('styles')
<style>
    .tasks-page {
        padding-bottom: 88px;
        background-color: #f5f5f5;
    }

    .task-form {
        margin: 12px;
        background-color: #fff;
        border-radius: 12px;
        padding: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-label {
        display: block;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        margin-bottom: 8px;
    }

    .form-label .required {
        color: #f5222d;
        margin-left: 2px;
    }

    .form-input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ededed;
        border-radius: 8px;
        font-size: 15px;
        box-sizing: border-box;
    }

    .form-textarea {
        width: 100%;
        min-height: 100px;
        padding: 10px 12px;
        border: 1px solid #ededed;
        border-radius: 8px;
        font-size: 15px;
        resize: vertical;
        box-sizing: border-box;
        font-family: inherit;
    }

    .form-input:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #07c160;
    }

    .form-help {
        font-size: 12px;
        color: #999;
        margin-top: 6px;
    }

    .submit-btn {
        width: 100%;
        padding: 14px;
        background-color: #07c160;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        margin-top: 8px;
    }

    .submit-btn:active {
        background-color: #06ad56;
    }

    .submit-btn:disabled {
        background-color: #c7c7cc;
    }

    .task-list {
        margin: 12px;
    }

    .task-item {
        background-color: #fff;
        border-radius: 12px;
        padding: 16px;
        margin-bottom: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    .task-date {
        font-size: 14px;
        font-weight: 600;
        color: #07c160;
        margin-bottom: 8px;
    }

    .task-content {
        font-size: 14px;
        color: #666;
        line-height: 1.6;
    }

    .task-label {
        font-weight: 500;
        color: #333;
        margin-top: 8px;
    }

    .section-title {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin: 20px 12px 12px;
    }

    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #999;
    }
</style>
@endpush

@section('content')
<div class="tasks-page">
    <!-- 发布任务表单 -->
    <div class="task-form">
        <form id="taskForm">
            <div class="form-group">
                <label class="form-label">
                    任务日期<span class="required">*</span>
                </label>
                <input
                    type="date"
                    id="taskDate"
                    class="form-input"
                    required
                />
                <div class="form-help">选择要发布任务的日期（只能选择今天及以后的日期）</div>
            </div>

            <div class="form-group">
                <label class="form-label">
                    读经内容<span class="required">*</span>
                </label>
                <textarea
                    id="bibleReading"
                    class="form-textarea"
                    placeholder="例如：创世记 1-3章"
                    required
                ></textarea>
                <div class="form-help">填写当日的读经范围</div>
            </div>

            <div class="form-group">
                <label class="form-label">
                    灵修内容<span class="required">*</span>
                </label>
                <textarea
                    id="devotional"
                    class="form-textarea"
                    placeholder="填写灵修思考、祷告要点等"
                    required
                ></textarea>
                <div class="form-help">填写灵修材料或思考题</div>
            </div>

            <button type="submit" class="submit-btn">发布任务</button>
        </form>
    </div>

    <!-- 近期任务列表 -->
    <div class="section-title">近期任务</div>
    <div class="task-list" id="taskList">
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
// 设置日期输入框的最小值为今天
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDate').setAttribute('min', today);
    document.getElementById('taskDate').value = today;

    loadRecentTasks();
});

// 提交表单
document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const taskDate = document.getElementById('taskDate').value;
    const bibleReading = document.getElementById('bibleReading').value.trim();
    const devotional = document.getElementById('devotional').value.trim();

    if (!taskDate || !bibleReading || !devotional) {
        utils.toast('请填写所有必填项', { type: 'error' });
        return;
    }

    const loading = weui.loading('发布中...');

    axios.post('/wechat/system/tasks', {
        task_date: taskDate,
        bible_reading: bibleReading,
        devotional: devotional,
        status: 1
    })
    .then(response => {
        loading.hide();
        if (response.data.code === 200) {
            utils.toast('任务发布成功', { type: 'success' });
            // 清空表单
            document.getElementById('bibleReading').value = '';
            document.getElementById('devotional').value = '';
            // 设置下一天的日期
            const nextDate = new Date(taskDate);
            nextDate.setDate(nextDate.getDate() + 1);
            document.getElementById('taskDate').value = nextDate.toISOString().split('T')[0];
            // 重新加载任务列表
            loadRecentTasks();
        } else {
            utils.toast(response.data.message || '发布失败', { type: 'error' });
        }
    })
    .catch(error => {
        loading.hide();
        const message = error.response?.data?.message || '网络错误';
        utils.toast(message, { type: 'error' });
    });
});

// 加载近期任务
function loadRecentTasks() {
    const today = new Date().toISOString().split('T')[0];

    axios.get('/wechat/system/tasks', {
        params: {
            start_date: today
        }
    })
    .then(response => {
        if (response.data.code === 200) {
            renderTasks(response.data.data);
        } else {
            renderTasks([]);
        }
    })
    .catch(() => {
        renderTasks([]);
    });
}

// 渲染任务列表
function renderTasks(tasks) {
    const list = document.getElementById('taskList');
    if (!list) return;

    if (!tasks || tasks.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <p>暂无近期任务</p>
            </div>
        `;
        return;
    }

    let html = '';
    tasks.forEach(task => {
        const date = new Date(task.task_date);
        const formattedDate = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        html += `
            <div class="task-item">
                <div class="task-date">${formattedDate}</div>
                <div class="task-content">
                    <div class="task-label">读经：</div>
                    ${task.bible_reading}
                </div>
                <div class="task-content">
                    <div class="task-label">灵修：</div>
                    ${task.devotional}
                </div>
            </div>
        `;
    });

    list.innerHTML = html;
}
</script>
@endpush
