@extends('wechat.layouts.app')

@section('title', '群公告')
@section('navbar-title', '群公告')

@push('styles')
<style>
    .announcements-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding: 16px 16px 96px;
    }

    .announcement-card {
        background: #ffffff;
        border-radius: 18px;
        padding: 18px;
        margin-bottom: 14px;
        box-shadow: 0 10px 26px rgba(16, 30, 54, 0.06);
    }

    .announcement-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
    }

    .announcement-card__title {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        font-size: 16px;
        font-weight: 600;
        color: #111;
        word-break: break-word;
    }

    .announcement-card__badge {
        display: inline-flex;
        align-items: center;
        padding: 0 8px;
        height: 22px;
        border-radius: 999px;
        font-size: 12px;
        color: #ffffff;
        background: linear-gradient(135deg, #fa5151 0%, #ff8a65 100%);
    }

    .announcement-card__delete {
        border: none;
        background: none;
        color: #fa5151;
        font-size: 13px;
        padding: 4px 0;
    }

    .announcement-card__content {
        font-size: 14px;
        color: #444;
        line-height: 1.7;
        margin-bottom: 12px;
        word-break: break-word;
    }

    .announcement-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #8f9499;
    }

    .announcement-card__author {
        color: #576b95;
    }

    .announcement-empty {
        text-align: center;
        color: #9ea3a9;
        padding: 64px 16px;
    }

    .floating-publish-btn {
        position: fixed;
        right: 20px;
        bottom: 88px;
        width: 56px;
        height: 56px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #07c160 0%, #04a652 100%);
        color: #fff;
        font-size: 28px;
        line-height: 1;
        box-shadow: 0 12px 32px rgba(7, 193, 96, 0.3);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1500;
    }

    .floating-publish-btn.show {
        display: flex;
    }

    .publish-mask {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 2000;
    }

    .publish-mask.show {
        opacity: 1;
        pointer-events: auto;
    }

    .publish-dialog {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 80vh;
        background: #fff;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -12px 36px rgba(16, 30, 54, 0.16);
        transform: translateY(100%);
        transition: transform 0.25s ease;
        display: flex;
        flex-direction: column;
        z-index: 2001;
    }

    .publish-dialog.show {
        transform: translateY(0);
    }

    .publish-dialog__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px 12px;
        border-bottom: 1px solid #eff1f5;
    }

    .publish-dialog__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .publish-dialog__close {
        border: none;
        background: none;
        font-size: 22px;
        line-height: 1;
        color: #999;
        padding: 4px;
    }

    .publish-dialog__body {
        padding: 16px 20px;
        overflow-y: auto;
        flex: 1;
    }

    .publish-form-group {
        margin-bottom: 18px;
    }

    .publish-form-label {
        font-size: 14px;
        color: #333;
        margin-bottom: 8px;
        display: block;
    }

    .publish-input,
    .publish-textarea {
        width: 100%;
        border: 1px solid #e2e3e9;
        border-radius: 12px;
        padding: 12px 14px;
        font-size: 14px;
        background: #f9fafc;
        box-sizing: border-box;
        transition: border 0.2s ease;
    }

    .publish-input:focus,
    .publish-textarea:focus {
        border-color: #07c160;
        background: #fff;
        outline: none;
    }

    .publish-textarea {
        min-height: 120px;
        resize: vertical;
    }

    .publish-checkbox {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #666;
    }

    .publish-dialog__footer {
        padding: 12px 20px 24px;
        display: flex;
        gap: 12px;
    }

    .publish-dialog__footer .weui-btn {
        flex: 1;
    }
</style>
@endpush

@section('content')
<div class="announcements-page">
    <div id="announcementsList">
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    </div>
</div>

<button type="button" class="floating-publish-btn" id="publishFab" aria-label="发布公告" onclick="showPublishDialog()">＋</button>

<div class="publish-mask" id="publishMask"></div>
<div class="publish-dialog" id="publishDialog" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="publish-dialog__header">
        <div class="publish-dialog__title">发布公告</div>
        <button type="button" class="publish-dialog__close" aria-label="关闭" onclick="closePublishDialog()">×</button>
    </div>
    <div class="publish-dialog__body">
        <div class="publish-form-group">
            <label for="announcementTitle" class="publish-form-label">标题 *</label>
            <input type="text" id="announcementTitle" class="publish-input" placeholder="请输入公告标题" maxlength="100">
        </div>
        <div class="publish-form-group">
            <label for="announcementContent" class="publish-form-label">内容 *</label>
            <textarea id="announcementContent" class="publish-textarea" placeholder="请输入公告内容" maxlength="1000"></textarea>
        </div>
        <label class="publish-checkbox">
            <input type="checkbox" id="announcementPinned">
            置顶公告
        </label>
    </div>
    <div class="publish-dialog__footer">
        <a href="javascript:;" class="weui-btn weui-btn_default" onclick="closePublishDialog()">取消</a>
        <a href="javascript:;" class="weui-btn weui-btn_primary" id="publishConfirmBtn" onclick="publishAnnouncement()">发布</a>
    </div>
</div>
@endsection

@push('scripts')
<script>
const loadingHtml = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中...</span></div>';

let groupId = null;
let announcements = [];
let currentUserId = null;
let isAdmin = false;
let groupInfo = null;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    groupId = params.get('group_id');

    if (!groupId) {
        utils.toast('群组不存在', { type: 'top' });
        setTimeout(() => history.back(), 1500);
        return;
    }

    utils.loading('加载中...');
    document.getElementById('announcementsList').innerHTML = loadingHtml;

    await Promise.all([
        loadCurrentUser(),
        loadGroupInfo()
    ]);

    if (groupInfo && currentUserId) {
        const member = groupInfo.members?.find(item => item.user_id === currentUserId);
        isAdmin = Boolean(member && (member.role === 1 || member.role === 2));
    }

    await loadAnnouncements();
    utils.hideLoading();

    const fab = document.getElementById('publishFab');
    if (fab) {
        fab.classList.toggle('show', isAdmin);
    }

    const mask = document.getElementById('publishMask');
    if (mask) {
        mask.addEventListener('click', closePublishDialog);
    }
});

function loadCurrentUser() {
    if (currentUserId) {
        return Promise.resolve(currentUserId);
    }

    return axios.get('/wechat/user')
        .then(response => {
            if (response.data.code === 200) {
                currentUserId = response.data.data.id;
                return currentUserId;
            }
            throw new Error(response.data.message || '无法获取当前用户');
        })
        .catch(error => {
            console.error('获取当前用户失败:', error);
            utils.toast('无法获取当前用户信息', { type: 'top' });
            return null;
        });
}

function loadGroupInfo() {
    return axios.get(`/wechat/chat/groups/${groupId}`)
        .then(response => {
            if (response.data.code === 200) {
                groupInfo = response.data.data;
            }
        })
        .catch(error => {
            console.error('加载群信息失败:', error);
        });
}

function loadAnnouncements() {
    return axios.get(`/wechat/chat/groups/${groupId}/announcements`)
        .then(response => {
            if (response.data.code === 200) {
                announcements = response.data.data || [];
                renderAnnouncements(announcements);
            } else {
                showError(response.data.message);
            }
        })
        .catch(error => {
            console.error('加载公告失败:', error);
            showError(error.response?.data?.message || '加载失败，请重试');
        });
}

function renderAnnouncements(list) {
    const container = document.getElementById('announcementsList');

    if (!list || list.length === 0) {
        container.innerHTML = `
            <div class="announcement-empty">
                <div style="font-size: 42px; margin-bottom: 12px;">📢</div>
                <div>暂无群公告</div>
                ${isAdmin ? '<div style="margin-top: 8px; font-size: 13px;">点击右下角按钮发布公告</div>' : ''}
            </div>
        `;
        return;
    }

    const html = list.map(item => {
        const title = escapeHtml(item.title);
        const content = escapeHtml(item.content || '').replace(/
/g, '<br>');
        const pinned = item.is_pinned ? '<span class="announcement-card__badge">置顶</span>' : '';
        const author = escapeHtml(item.user?.real_name || item.user?.nickname || '未名');
        const publishedAt = utils.formatTime(item.created_at);
        const canDelete = isAdmin || item.user_id === currentUserId;

        return `
            <div class="announcement-card">
                <div class="announcement-card__header">
                    <div class="announcement-card__title">${pinned}${title}</div>
                    ${canDelete ? `<button type="button" class="announcement-card__delete" onclick="deleteAnnouncement(${item.id})">删除</button>` : ''}
                </div>
                <div class="announcement-card__content">${content}</div>
                <div class="announcement-card__footer">
                    <span class="announcement-card__author">${author}</span>
                    <span>${publishedAt}</span>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

function showError(message) {
    document.getElementById('announcementsList').innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">${escapeHtml(message || '加载失败')}</h2>
                <p class="weui-msg__desc">请检查网络后重试。</p>
            </div>
            <div class="weui-msg__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_primary" onclick="loadAnnouncements()">重新加载</a>
            </div>
        </div>
    `;
}

function showPublishDialog() {
    if (!isAdmin) {
        return;
    }

    resetPublishForm();
    document.getElementById('publishMask').classList.add('show');
    const dialog = document.getElementById('publishDialog');
    dialog.classList.add('show');
    dialog.setAttribute('aria-hidden', 'false');
    document.getElementById('announcementTitle').focus();
}

function closePublishDialog() {
    document.getElementById('publishMask').classList.remove('show');
    const dialog = document.getElementById('publishDialog');
    dialog.classList.remove('show');
    dialog.setAttribute('aria-hidden', 'true');
}

function resetPublishForm() {
    document.getElementById('announcementTitle').value = '';
    document.getElementById('announcementContent').value = '';
    document.getElementById('announcementPinned').checked = false;
}

function publishAnnouncement() {
    const titleInput = document.getElementById('announcementTitle');
    const contentInput = document.getElementById('announcementContent');
    const pinnedCheckbox = document.getElementById('announcementPinned');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) {
        utils.topTips('请输入公告标题');
        return;
    }

    if (!content) {
        utils.topTips('请输入公告内容');
        return;
    }

    const confirmBtn = document.getElementById('publishConfirmBtn');
    confirmBtn.classList.add('weui-btn_disabled');
    confirmBtn.setAttribute('aria-disabled', 'true');

    utils.loading('发布中...');

    axios.post(`/wechat/chat/groups/${groupId}/announcements`, {
        title,
        content,
        is_pinned: pinnedCheckbox.checked ? 1 : 0
    })
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '发布失败');
            }
            utils.toast('发布成功');
            closePublishDialog();
            return loadAnnouncements();
        })
        .catch(error => {
            console.error('发布公告失败:', error);
            utils.toast(error.response?.data?.message || '发布失败，请稍后重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
            confirmBtn.classList.remove('weui-btn_disabled');
            confirmBtn.setAttribute('aria-disabled', 'false');
        });
}

function deleteAnnouncement(id) {
    utils.confirm({
        message: '确定要删除这条公告吗？',
        confirmText: '删除',
        onConfirm: () => {
            utils.loading('删除中...');
            axios.delete(`/wechat/chat/groups/${groupId}/announcements/${id}`)
                .then(response => {
                    if (response.data.code !== 200) {
                        throw new Error(response.data.message || '删除失败');
                    }
                    utils.toast('删除成功');
                    return loadAnnouncements();
                })
                .catch(error => {
                    console.error('删除公告失败:', error);
                    utils.toast(error.response?.data?.message || '删除失败，请稍后重试', { type: 'top' });
                })
                .finally(() => {
                    utils.hideLoading();
                });
        }
    });
}

function escapeHtml(str = '') {
    return String(str).replace(/[&<>'"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        ''': '&#39;',
        '"': '&quot;'
    }[char] || char));
}
</script>
@endpush
