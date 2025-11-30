@php($hideTabbar = true)

@extends('wechat.layouts.app')

@section('title', '群聊')
@section('navbar-title', '群聊')

@push('styles')
<style>
    /* ===== 页面整体布局 ===== */
    .group-chat-page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        background: #f5f6f7;
        z-index: 1000;
    }
    /* ===== 头部区域 ===== */
    .group-chat__header {
        position: relative;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-bottom: 1px solid #edf0f4;
        background: #fff;
        flex-shrink: 0;
    }

    .back-btn {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #1a1a1a;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s ease;
    }

    .back-btn:active {
        background: rgba(0, 0, 0, 0.05);
    }

    .group-chat__header-content {
        flex: 1;
        text-align: center;
        padding: 0 48px;
    }

    .group-chat__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .group-chat__subtitle {
        font-size: 12px;
        color: #9e9e9e;
        margin-top: 4px;
    }

    .group-chat__more {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #1a1a1a;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s ease;
    }

    .group-chat__more:active {
        background: rgba(0, 0, 0, 0.05);
    }

    /* ===== 消息区域 ===== */
    .group-chat__messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px 14px 20px;
    }

    .messages-placeholder {
        text-align: center;
        color: #9e9e9e;
        padding: 40px 0;
        font-size: 14px;
    }

    .group-chat__message-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 18px;
    }

    .group-chat__message-item.mine {
        flex-direction: row-reverse;
    }

    .group-chat__avatar {
        width: 42px;
        height: 42px;
        border-radius: 6px;
        background: #eceff4;
        object-fit: cover;
    }

    .group-chat__bubble-wrap {
        max-width: 72%;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .group-chat__name {
        font-size: 12px;
        color: #9aa0a6;
    }

    .group-chat__message-item.mine .group-chat__name {
        text-align: right;
    }

    .group-chat__bubble {
        background: #f6f7fb;
        border-radius: 18px;
        padding: 12px 16px;
        font-size: 14px;
        color: #111;
        line-height: 1.6;
        box-shadow: 0 8px 18px rgba(16, 30, 54, 0.08);
        word-break: break-word;
    }

    .group-chat__message-item.mine .group-chat__bubble {
        background: #07c160;
        color: #fff;
    }

    .group-chat__time {
        font-size: 11px;
        color: #b2b8c5;
    }

    /* 图片消息样式 */
    .message-image {
        max-width: 200px;
        max-height: 200px;
        border-radius: 8px;
        cursor: pointer;
        display: block;
    }

    /* 文件消息样式 */
    .message-file {
        background: #fff;
        border: 1px solid #e5e5e5;
        border-radius: 8px;
        padding: 12px;
        min-width: 180px;
        max-width: 240px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }

    .file-icon-svg {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .file-icon-svg svg {
        width: 48px;
        height: 48px;
        display: block;
    }

    .file-info {
        flex: 1;
        min-width: 0;
    }

    .file-name {
        font-size: 14px;
        color: #111;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .file-size {
        font-size: 12px;
        color: #999;
    }

    /* ===== 输入区域 ===== */
    .group-chat__input {
        background: #fff;
        border-top: 1px solid #edf0f4;
        padding: 12px 16px;
        flex-shrink: 0;
        display: flex;
        align-items: flex-end;
        gap: 12px;
    }

    .group-chat__attach-btn {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border: none;
        background: none;
        color: #9e9e9e;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.2s ease;
        margin-bottom: 5px;
        font-size: 24px;
    }

    .group-chat__attach-btn:active {
        background: rgba(0, 0, 0, 0.05);
        transform: scale(0.95);
    }

    .group-chat__input-wrapper {
        flex: 1;
        min-width: 0;
    }

    .group-chat__input-field {
        width: 100%;
        min-height: 40px;
        max-height: 120px;
        border: none;
        border-radius: 10px;
        padding: 10px 8px;
        font-size: 14px;
        background: #f6f7f9;
        transition: background 0.2s ease;
        resize: none;
        line-height: 1.4;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        overflow-y: auto;
        box-sizing: border-box;
    }

    .group-chat__input-field:focus {
        background: #fff;
        box-shadow: 0 0 0 1px rgba(7, 193, 96, 0.35);
        outline: none;
    }

    .group-chat__send-btn {
        flex-shrink: 0;
        min-width: 72px;
        height: 40px;
        margin-bottom: 5px;
    }

    .group-chat__send-btn:disabled {
        opacity: 0.5;
    }

    .group-chat__loadmore {
        margin: 4px auto 18px;
        cursor: pointer;
    }
</style>
@endpush

@section('content')
<div class="group-chat-page">
    <!-- 头部区域 -->
    <div class="group-chat__header">
        <a href="javascript:history.back();" class="back-btn">
            ←
        </a>
        <div class="group-chat__header-content">
            <div class="group-chat__title" id="groupName">加载中...</div>
            <div class="group-chat__subtitle" id="groupInfo"></div>
        </div>
        <a class="group-chat__more" href="javascript:;" onclick="showGroupDetail()" aria-label="群聊详情">
            ···
        </a>
    </div>

    <!-- 消息区域 -->
    <div class="group-chat__messages" id="messagesWrapper">
        <div class="weui-loadmore" id="messagesPlaceholder">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载聊天记录...</span>
        </div>
    </div>

    <!-- 输入区域 -->
    <div class="group-chat__input">
        <button type="button" class="group-chat__attach-btn" onclick="showAttachMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"/></g></svg>
        </button>
        <div class="group-chat__input-wrapper">
            <textarea id="messageInput" class="group-chat__input-field" placeholder="输入消息" autocomplete="off" rows="1"></textarea>
        </div>
        <button type="button" class="weui-btn weui-btn_primary weui-btn_mini group-chat__send-btn" id="sendBtn" onclick="sendMessage()">发送</button>
    </div>

    <!-- 隐藏的文件上传input -->
    <input type="file" id="imageUpload" accept="image/*" style="display: none;" onchange="handleImageUpload(event)">
    <input type="file" id="fileUpload" accept="*/*" style="display: none;" onchange="handleFileUpload(event)">
</div>
@endsection

@push('scripts')
<script>
const loadingHtml = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中...</span></div>';

let groupId = null;
let currentUser = null;
let groupData = null;
let messages = [];
let currentPage = 1;
let hasMore = true;
let isLoading = false;
let latestMessageId = null;
let pollTimer = null;
let isPolling = false;

const PAGE_SIZE = 20;
const POLL_INTERVAL = 5000;
const SCROLL_THRESHOLD = 140;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    groupId = params.get('group_id');

    if (!groupId) {
        utils.toast('群组不存在', { type: 'top' });
        setTimeout(() => history.back(), 1500);
        return;
    }

    const wrapper = document.getElementById('messagesWrapper');
    wrapper.addEventListener('scroll', handleScroll);

    utils.loading('加载中...');
    document.getElementById('messagesWrapper').innerHTML = loadingHtml;

    try {
        await Promise.all([fetchCurrentUser(), loadGroupDetail()]);
        await loadMessages({ page: 1, replace: true, forceScroll: true });
        bindInputEvents();
        startPolling();
        document.addEventListener('visibilitychange', handleVisibilityChange);
    } catch (error) {
        console.error('初始化群聊失败:', error);
        showError(error.message || '群聊加载失败，请稍后重试');
    } finally {
        utils.hideLoading();
    }
});

function bindInputEvents() {
    const input = document.getElementById('messageInput');

    // 自动调整 textarea 高度
    input.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Enter 发送,Shift+Enter 换行
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
}

function handleScroll() {
    if (!hasMore || isLoading) {
        return;
    }
    const wrapper = document.getElementById('messagesWrapper');
    if (wrapper.scrollTop <= 40) {
        loadOlderMessages();
    }
}

function fetchCurrentUser() {
    if (currentUser) {
        return Promise.resolve(currentUser);
    }
    return axios.get('/wechat/user')
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '未登录');
            }
            currentUser = response.data.data;
            return currentUser;
        });
}

function loadGroupDetail() {
    return axios.get(`/wechat/chat/groups/${groupId}`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '群组信息获取失败');
            }
            groupData = response.data.data;
            document.getElementById('groupName').textContent = groupData.name;
            document.getElementById('groupInfo').textContent = `${groupData.member_count || 0} 人`;
        });
}

function loadMessages({ page = 1, replace = false, forceScroll = false, preserveScroll = null, suppressError = false } = {}) {
    isLoading = true;

    return axios.get(`/wechat/chat/groups/${groupId}/messages`, {
        params: { page, limit: PAGE_SIZE }
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '加载消息失败');
        }

        const data = response.data.data || {};
        const list = data.messages || [];
        hasMore = Boolean(data.pagination?.has_more);
        currentPage = replace ? page : Math.max(currentPage, page);

        messages = replace ? list : list.concat(messages);

        const latestCandidate = data.pagination?.latest_id ?? (messages.length ? messages[messages.length - 1].id : null);
        if (latestCandidate !== null && latestCandidate !== undefined) {
            latestMessageId = latestCandidate;
        } else if (latestMessageId === null) {
            latestMessageId = 0;
        }

        renderMessages({ forceScroll });

        if (preserveScroll) {
            const wrapper = document.getElementById('messagesWrapper');
            const delta = wrapper.scrollHeight - preserveScroll.prevHeight;
            wrapper.scrollTop = preserveScroll.prevScroll + delta;
        }
    }).catch(error => {
        console.error('加载群消息失败:', error);
        if (!suppressError) {
            showError('加载失败，请稍后重试');
        }
        if (!suppressError) {
            throw error;
        }
    }).finally(() => {
        isLoading = false;
    });
}

function loadOlderMessages() {
    if (isLoading || !hasMore) {
        return;
    }
    const wrapper = document.getElementById('messagesWrapper');
    const preserveScroll = {
        prevHeight: wrapper.scrollHeight,
        prevScroll: wrapper.scrollTop
    };

    loadMessages({
        page: currentPage + 1,
        replace: false,
        forceScroll: false,
        preserveScroll,
        suppressError: true
    }).catch(() => {});
}

function startPolling() {
    stopPolling();
    pollTimer = setInterval(fetchLatestMessages, POLL_INTERVAL);
}

function fetchLatestMessages() {
    if (isPolling || latestMessageId === null) {
        return;
    }
    isPolling = true;

    axios.get(`/wechat/chat/groups/${groupId}/messages`, {
        params: { after_id: latestMessageId, limit: 50 }
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '获取最新消息失败');
        }

        const payload = response.data.data || {};
        const list = payload.messages || [];

        if (!list.length) {
            return;
        }

        const wrapper = document.getElementById('messagesWrapper');
        const stickToBottom = utils.isNearBottom(wrapper, SCROLL_THRESHOLD);
        let incomingCount = 0;

        list.forEach(message => {
            messages.push(message);
            if (currentUser && message.from_user_id !== currentUser.id) {
                incomingCount++;
            }
        });

        latestMessageId = payload.pagination?.latest_id || messages[messages.length - 1].id;
        renderMessages({ forceScroll: stickToBottom });

        if (incomingCount > 0 && !stickToBottom) {
            const toastText = groupData ? `群聊「${groupData.name}」有新消息` : '群聊有新消息';
            utils.incrementBadge(incomingCount);
            utils.notifyIncoming({ message: toastText });
        }
    }).catch(error => {
        console.error('轮询最新消息失败:', error);
    }).finally(() => {
        isPolling = false;
    });
}

function renderMessages({ forceScroll = false } = {}) {
    const wrapper = document.getElementById('messagesWrapper');
    const placeholder = document.getElementById('messagesPlaceholder');

    if (!messages.length) {
        const emptyHtml = `
            <div class="weui-msg">
                <div class="weui-msg__icon-area">
                    <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
                </div>
                <div class="weui-msg__text-area">
                    <h2 class="weui-msg__title">暂无消息</h2>
                    <p class="weui-msg__desc">发送第一条消息，开启讨论吧。</p>
                </div>
            </div>
        `;
        if (placeholder) {
            placeholder.outerHTML = emptyHtml;
        } else {
            wrapper.innerHTML = emptyHtml;
        }
        return;
    }

    const shouldStick = forceScroll || utils.isNearBottom(wrapper, SCROLL_THRESHOLD);

    if (placeholder) {
        placeholder.remove();
    }

    const parts = [];

    if (hasMore) {
        parts.push('<div class="weui-loadmore weui-loadmore_line group-chat__loadmore" role="button" onclick="loadOlderMessages()"><span class="weui-loadmore__tips">点击加载更多</span></div>');
    }

    messages.forEach(message => {
        const isMine = currentUser && message.from_user_id === currentUser.id;
        const sender = message.from_user || {};
        const displayName = escapeHtml(sender.real_name || sender.nickname || '成员');
        const avatar = escapeHtml(sender.avatar_url || '/default-avatar.png');
        const bubble = formatMessageContent(message);
        const time = utils.formatTime(message.created_at);

        const bubbleClass = isMine ? 'group-chat__bubble group-chat__bubble--mine' : 'group-chat__bubble';
        const bubbleStyle = isMine ? 'cursor: pointer;' : '';
        const onClickAttr = isMine ? `data-message-id="${message.id}"` : '';

        parts.push(`
            <div class="group-chat__message-item ${isMine ? 'mine' : ''}">
                <img src="${avatar}" alt="${displayName}" class="group-chat__avatar" loading="lazy">
                <div class="group-chat__bubble-wrap">
                    <span class="group-chat__name">${displayName}</span>
                    <div class="${bubbleClass}" style="${bubbleStyle}" ${onClickAttr}>${bubble}</div>
                    <span class="group-chat__time">${time}</span>
                </div>
            </div>
        `);
    });

    wrapper.innerHTML = parts.join('');

    // 为自己的消息绑定长按事件
    document.querySelectorAll('[data-message-id]').forEach(el => {
        let pressTimer = null;
        const handlePress = () => {
            pressTimer = setTimeout(() => {
                const msgId = el.getAttribute('data-message-id');
                const message = messages.find(m => m.id == msgId);
                if (message) showGroupRecallMenu(message);
            }, 500);
        };
        const handleRelease = () => {
            if (pressTimer) clearTimeout(pressTimer);
        };

        el.addEventListener('touchstart', handlePress);
        el.addEventListener('touchend', handleRelease);
        el.addEventListener('touchmove', handleRelease);
        el.addEventListener('mousedown', handlePress);
        el.addEventListener('mouseup', handleRelease);
        el.addEventListener('mouseleave', handleRelease);
    });

    if (shouldStick) {
        requestAnimationFrame(scrollToBottom);
    }
}

function formatMessageContent(message) {
    switch (Number(message.message_type)) {
        case 2: // 图片
            return `<img src="${escapeHtml(message.media_url)}" alt="图片" class="message-image" onclick="previewImage('${escapeHtml(message.media_url)}')">`;

        case 3: // 语音
            return `<div class="message-voice">
                        <i class="weui-icon-voice" style="font-size: 20px;"></i>
                        <span>${message.duration || 0}"</span>
                    </div>`;

        case 4: // 视频
            return `<video src="${escapeHtml(message.media_url)}" controls style="max-width: 200px; border-radius: 8px;"></video>`;

        case 5: // 文件
            const fileName = message.original_name || message.content || '未知文件';
            const fileSize = message.media_size ? formatFileSize(message.media_size) : '未知大小';
            const fileExt = fileName.includes('.') ? fileName.split('.').pop().toLowerCase() : 'file';
            const mediaUrl = escapeHtml(message.media_url);
            const fileIconSVG = getFileIconSVG(fileExt);

            // 所有文件都支持点击跳转到预览页
            return `<div class="message-file" onclick="openFilePreview('${mediaUrl}', '${escapeHtml(fileName)}')">
                        <div class="file-icon-svg">${fileIconSVG}</div>
                        <div class="file-info">
                            <div class="file-name">${escapeHtml(fileName)}</div>
                            <div class="file-size">${fileSize}</div>
                            <div style="font-size: 11px; color: #07c160; margin-top: 2px;">点击查看</div>
                        </div>
                    </div>`;

        default: // 文本
            return escapeHtml(message.content || '');
    }
}

function scrollToBottom() {
    const wrapper = document.getElementById('messagesWrapper');
    wrapper.scrollTop = wrapper.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const content = input.value.trim();
    if (!content) {
        utils.topTips('请输入内容');
        return;
    }

    const sendBtn = document.getElementById('sendBtn');
    sendBtn.classList.add('weui-btn_disabled');
    sendBtn.setAttribute('aria-disabled', 'true');

    axios.post('/wechat/chat/groups/send', {
        group_id: groupId,
        content,
        message_type: 1
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '发送失败');
        }
        input.value = '';
        input.style.height = 'auto'; // 重置高度
        const message = response.data.data;
        messages.push(message);
        latestMessageId = message.id;
        renderMessages({ forceScroll: true });
    }).catch(error => {
        console.error('发送消息失败:', error);
        utils.toast(error.response?.data?.message || '发送失败，请稍后重试', { type: 'top' });
    }).finally(() => {
        sendBtn.classList.remove('weui-btn_disabled');
        sendBtn.setAttribute('aria-disabled', 'false');
        input.focus(); // 发送后重新聚焦
    });
}

// ===== 文件上传功能 =====

/**
 * 显示附件菜单
 */
function showAttachMenu() {
    weui.actionSheet([
        {
            label: '发送图片',
            onClick: function() {
                document.getElementById('imageUpload').click();
            }
        },
        {
            label: '发送文件',
            onClick: function() {
                document.getElementById('fileUpload').click();
            }
        }
    ], [
        {
            label: '取消',
            onClick: function() {}
        }
    ]);
}

/**
 * 处理图片上传
 */
async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 重置input,允许重复选择同一文件
    event.target.value = '';

    // 验证文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
        weui.alert('图片大小不能超过10MB');
        return;
    }

    await uploadFile(file, 'image');
}

/**
 * 处理文件上传
 */
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // 重置input
    event.target.value = '';

    // 验证文件大小 (100MB)
    if (file.size > 100 * 1024 * 1024) {
        weui.alert('文件大小不能超过100MB');
        return;
    }

    await uploadFile(file, 'file');
}

/**
 * 上传文件到R2
 */
async function uploadFile(file, type) {
    const formData = new FormData();
    formData.append(type === 'image' ? 'image' : 'file', file);

    showUploadProgress();

    try {
        // 1. 上传文件到R2
        const uploadResponse = await axios.post(
            type === 'image' ? '/wechat/chat/upload/image' : '/wechat/chat/upload/file',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    updateUploadProgress(percentCompleted);
                }
            }
        );

        if (uploadResponse.data.code !== 200) {
            throw new Error(uploadResponse.data.message || '上传失败');
        }

        // 2. 发送媒体消息
        await sendMediaMessage(uploadResponse.data.data, type);

        // 成功 - 关闭进度框
        hideUploadProgress();

    } catch (error) {
        // 失败 - 关闭进度框并显示错误
        hideUploadProgress();
        console.error('文件上传失败:', error);

        const errorMsg = error.response?.data?.message || error.message || '上传失败,请重试';
        weui.alert(errorMsg);
    }
}

/**
 * 发送媒体消息
 */
async function sendMediaMessage(uploadResult, type) {
    const messageType = type === 'image' ? 2 : 5; // 2=图片, 5=文件

    try {
        const response = await axios.post('/wechat/chat/groups/send', {
            group_id: groupId,
            message_type: messageType,
            content: type === 'file' ? uploadResult.original_name : null,
            media_url: uploadResult.url,
            media_type: uploadResult.mime_type,
            media_size: uploadResult.size,
            original_filename: uploadResult.original_name
        });

        if (response.data.code === 200) {
            // 添加到消息列表
            const newMessage = response.data.data;
            messages.push(newMessage);

            // 重新渲染消息列表(包含新消息)
            renderMessages({ forceScroll: true });

            // 更新最新消息ID
            latestMessageId = newMessage.id;

        } else {
            throw new Error(response.data.message || '发送失败');
        }

    } catch (error) {
        console.error('发送媒体消息失败:', error);
        throw error;
    }
}

/**
 * 显示上传进度
 */
function showUploadProgress() {
    const dialog = document.createElement('div');
    dialog.id = 'uploadProgressDialog';
    dialog.innerHTML = `
        <div class="weui-mask"></div>
        <div class="weui-toast" style="display: block;">
            <div class="weui-progress">
                <div class="weui-progress__bar">
                    <div id="uploadProgressFill" class="weui-progress__inner-bar" style="width: 0%;"></div>
                </div>
            </div>
            <p class="weui-toast__content" id="uploadProgressText">0%</p>
        </div>
    `;
    document.body.appendChild(dialog);
}

/**
 * 更新上传进度
 */
function updateUploadProgress(percent) {
    const fill = document.getElementById('uploadProgressFill');
    const text = document.getElementById('uploadProgressText');
    if (fill) fill.style.width = percent + '%';
    if (text) text.textContent = percent + '%';
}

/**
 * 隐藏上传进度
 */
function hideUploadProgress() {
    const dialog = document.getElementById('uploadProgressDialog');
    if (dialog) {
        dialog.remove();
    }
}

/**
 * 格式化文件大小
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * 根据文件扩展名获取SVG图标
 */
function getFileIconSVG(ext) {
    ext = ext.toLowerCase();

    const iconMap = {
        // 文档类
        'pdf': { color: '#E74C3C', icon: 'PDF' },
        'doc': { color: '#2C5898', icon: 'DOC' },
        'docx': { color: '#2C5898', icon: 'DOC' },
        'xls': { color: '#1D6F42', icon: 'XLS' },
        'xlsx': { color: '#1D6F42', icon: 'XLS' },
        'ppt': { color: '#D24726', icon: 'PPT' },
        'pptx': { color: '#D24726', icon: 'PPT' },
        'txt': { color: '#95A5A6', icon: 'TXT' },

        // 压缩包
        'zip': { color: '#F39C12', icon: 'ZIP' },
        'rar': { color: '#F39C12', icon: 'RAR' },
        '7z': { color: '#F39C12', icon: '7Z' },
        'tar': { color: '#F39C12', icon: 'TAR' },
        'gz': { color: '#F39C12', icon: 'GZ' },

        // 图片
        'jpg': { color: '#3498DB', icon: 'JPG' },
        'jpeg': { color: '#3498DB', icon: 'JPG' },
        'png': { color: '#3498DB', icon: 'PNG' },
        'gif': { color: '#3498DB', icon: 'GIF' },
        'svg': { color: '#3498DB', icon: 'SVG' },
        'webp': { color: '#3498DB', icon: 'IMG' },

        // 音视频
        'mp3': { color: '#9B59B6', icon: 'MP3' },
        'mp4': { color: '#9B59B6', icon: 'MP4' },
        'avi': { color: '#9B59B6', icon: 'AVI' },
        'mov': { color: '#9B59B6', icon: 'MOV' },
        'wav': { color: '#9B59B6', icon: 'WAV' },

        // 代码
        'js': { color: '#F7DF1E', icon: 'JS' },
        'php': { color: '#777BB4', icon: 'PHP' },
        'py': { color: '#3776AB', icon: 'PY' },
        'java': { color: '#007396', icon: 'JAVA' },
        'html': { color: '#E34F26', icon: 'HTML' },
        'css': { color: '#1572B6', icon: 'CSS' },
        'json': { color: '#000000', icon: 'JSON' },
        'xml': { color: '#E44D26', icon: 'XML' },
    };

    const fileInfo = iconMap[ext] || { color: '#7F8C8D', icon: ext.toUpperCase().substring(0, 3) || 'FILE' };

    return `
        <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="4" width="32" height="40" rx="2" fill="${fileInfo.color}" opacity="0.1"/>
            <path d="M36 4H14L8 10V44C8 45.1 8.9 46 10 46H38C39.1 46 40 45.1 40 44V8C40 5.8 38.2 4 36 4Z" fill="${fileInfo.color}"/>
            <path d="M14 4V8C14 9.1 13.1 10 12 10H8L14 4Z" fill="${fileInfo.color}" opacity="0.6"/>
            <text x="24" y="32" font-family="Arial, sans-serif" font-size="9" font-weight="bold" fill="white" text-anchor="middle">${fileInfo.icon}</text>
        </svg>
    `;
}

/**
 * 图片预览
 */
function previewImage(url) {
    //只使用previewImage，config 乱写都行
    wx.config({
        appId: '1234',
        timestamp: '123',
        nonceStr: '123',
        signature: '123',
        jsApiList: []
    });
    wx.ready(function () {
        // 在这里调用 API
        wx.checkJsApi({
            jsApiList: [
                'previewImage'
            ],
        });
        wx.previewImage({
            current: url,
            urls: [url]
        });
    });
}

/**
 * 打开文件预览页面
 */
function openFilePreview(url, filename) {
    const previewUrl = `/wechat/chat/file-preview?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
    window.location.href = previewUrl;
}

/**
 * 下载文件
 */
function downloadFile(url, filename) {
    // 创建一个隐藏的a标签触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || '文件';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function showGroupDetail() {
    location.href = `/chat/group-detail?group_id=${groupId}`;
}

function showError(message) {
    document.getElementById('messagesWrapper').innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">${escapeHtml(message || '加载失败')}</h2>
                <p class="weui-msg__desc">请检查网络后重试。</p>
            </div>
            <div class="weui-msg__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_primary" onclick="retryLoadMessages()">重新加载</a>
            </div>
        </div>
    `;
}

function retryLoadMessages() {
    loadMessages({ page: 1, replace: true, forceScroll: true });
}

function stopPolling() {
    if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        stopPolling();
    } else {
        if (latestMessageId !== null) {
            fetchLatestMessages();
        }
        startPolling();
    }
}

function escapeHtml(str = '') {
    return String(str).replace(/[&<>'"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
    }[char] || char));
}

/**
 * 显示撤回菜单
 */
function showGroupRecallMenu(message) {
    const now = new Date();
    const msgTime = new Date(message.created_at);
    const diffSeconds = Math.floor((now - msgTime) / 1000);
    const canRecall = diffSeconds <= 600; // 10分钟内可撤回

    const actions = [];

    if (canRecall) {
        actions.push({
            label: '撤回消息',
            onClick: function() {
                recallGroupMessage(message.id);
            }
        });
    } else {
        actions.push({
            label: '消息已超过10分钟，无法撤回',
            onClick: function() {}
        });
    }

    weui.actionSheet(actions, [
        {
            label: '取消',
            onClick: function() {}
        }
    ]);
}

/**
 * 撤回群消息
 */
function recallGroupMessage(messageId) {
    axios.post(`/wechat/chat/groups/${groupId}/message/${messageId}/recall`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '撤回失败');
            }

            // 从消息列表中删除该消息
            messages = messages.filter(m => m.id !== messageId);
            renderMessages({ forceScroll: false });

            utils.toast('消息已撤回');
        })
        .catch(error => {
            console.error('撤回消息失败:', error);
            utils.toast(error.response?.data?.message || error.message || '撤回失败');
        });
}

window.addEventListener('beforeunload', stopPolling);
</script>
@endpush
