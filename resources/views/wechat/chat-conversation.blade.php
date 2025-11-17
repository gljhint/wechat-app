@php($hideTabbar = true)
@php($showBack = true)

@extends('wechat.layouts.app')

@section('title', '聊天')
@section('navbar-title', '聊天')

@push('styles')
<style>
    .conversation-page {
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

    .conversation-header {
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

    .conversation-header-content {
        flex: 1;
        text-align: center;
        padding: 0 48px;
    }

    .conversation-title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .conversation-subtitle {
        font-size: 12px;
        color: #9e9e9e;
        margin-top: 4px;
    }

    .messages-wrapper {
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

    .message-item {
        display: flex;
        margin-bottom: 18px;
        align-items: flex-start;
        gap: 10px;
    }

    .message-item.mine {
        flex-direction: row-reverse;
    }

    .message-avatar {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        object-fit: cover;
        background: #d8d8d8;
    }

    .message-bubble-wrap {
        max-width: 72%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .message-name {
        font-size: 12px;
        color: #9a9a9a;
    }

    .message-item.mine .message-name {
        text-align: right;
    }

    .message-bubble {
        background: #fff;
        border-radius: 16px;
        padding: 10px 14px;
        line-height: 1.6;
        font-size: 14px;
        color: #1a1a1a;
        box-shadow: 0 6px 20px rgba(16, 30, 54, 0.06);
        word-break: break-word;
    }

    .message-item.mine .message-bubble {
        background: #07c160;
        color: #fff;
    }

    .message-time {
        font-size: 11px;
        color: #b2b2b2;
    }

    .message-read-status {
        font-size: 11px;
        color: #b2b2b2;
        margin-top: 1px;
    }

    .message-item.mine .message-read-status {
        text-align: right;
    }

    .conversation-loadmore {
        margin: 12px auto;
        width: fit-content;
        cursor: pointer;
    }

    .conversation-input {
        background: #fff;
        border-top: 1px solid #edf0f4;
        padding: 12px 16px;
        flex-shrink: 0;
        display: flex;
        align-items: flex-end;
        gap: 12px;
    }

    .message-input-wrapper {
        flex: 1;
        min-width: 0;
    }

    .message-input {
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

    .message-input:focus {
        background: #fff;
        box-shadow: 0 0 0 1px rgba(7, 193, 96, 0.35);
        outline: none;
    }

    .send-btn {
        flex-shrink: 0;
        min-width: 72px;
        height: 40px;
        margin-bottom: 5px;
    }

    .send-btn:disabled {
        opacity: 0.5;
    }

    .input-tool-btn {
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
    }

    .input-tool-btn:active {
        background: rgba(0, 0, 0, 0.05);
        transform: scale(0.95);
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
    }

    .file-icon {
        width: 40px;
        height: 40px;
        background: #07c160;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 20px;
        flex-shrink: 0;
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
        color: #9e9e9e;
    }

    /* 上传进度 */
    .upload-progress {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 20px 30px;
        border-radius: 8px;
        text-align: center;
        z-index: 9999;
    }

    .upload-progress-bar {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        margin-top: 10px;
        overflow: hidden;
    }

    .upload-progress-fill {
        height: 100%;
        background: #07c160;
        width: 0%;
        transition: width 0.3s ease;
    }

    .error-placeholder {
        padding: 48px 16px;
        text-align: center;
        color: #9e9e9e;
        font-size: 14px;
    }
</style>
@endpush

@section('content')
<div class="conversation-page">
    <div class="conversation-header">
        <a href="javascript:history.back();" class="back-btn">
            ←
        </a>
        <div class="conversation-header-content">
            <div class="conversation-title" id="contactName">加载中...</div>
            <div class="conversation-subtitle" id="contactSubtitle"></div>
        </div>
    </div>

    <div class="messages-wrapper" id="messagesWrapper">
        <div class="weui-loadmore" id="messagesPlaceholder">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载聊天记录...</span>
        </div>
    </div>

    <div class="conversation-input">
        <button type="button" class="input-tool-btn" onclick="showUploadOptions()">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"/></g></svg>
        </button>
        <div class="message-input-wrapper">
            <textarea id="messageInput" class="message-input" placeholder="输入消息" autocomplete="off" rows="1"></textarea>
        </div>
        <button type="button" class="weui-btn weui-btn_primary weui-btn_mini send-btn" id="sendBtn" onclick="sendMessage()">发送</button>
    </div>

    <!-- 隐藏的文件上传input -->
    <input type="file" id="imageUpload" accept="image/*" style="display: none;" onchange="handleImageUpload(event)">
    <input type="file" id="fileUpload" accept="*/*" style="display: none;" onchange="handleFileUpload(event)">
</div>
@endsection

@push('scripts')
<script>
let chatWithId = null;
let currentUser = null;
let contactProfile = null;
let messages = [];
let currentPage = 1;
let hasMore = true;
let isLoading = false;
let latestMessageId = null;
let pollTimer = null;
let isPolling = false;
const pageSize = 20;
const POLL_INTERVAL = 5000;
const SCROLL_THRESHOLD = 120;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    chatWithId = params.get('user_id');

    if (!chatWithId) {
        utils.toast('缺少聊天对象');
        setTimeout(() => history.back(), 1200);
        return;
    }

    Promise.all([
        fetchCurrentUser(),
        fetchContactProfile()
    ]).then(() => {
        loadMessages();
        bindInputEvents();
        startPolling();
        document.addEventListener('visibilitychange', handleVisibilityChange);
    }).catch(error => {
        console.error('初始化会话失败:', error);
        renderError('聊天加载失败，请稍后重试');
    });
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

function fetchCurrentUser() {
    return axios.get('/wechat/user')
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '未登录');
            }

            currentUser = response.data.data;
        });
}

function fetchContactProfile() {
    return axios.get(`/wechat/chat/contacts/${chatWithId}`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '无法获取联系人信息');
            }

            contactProfile = response.data.data;
            updateHeader();
        })
        .catch(error => {
            console.error('获取联系人失败:', error);
            utils.toast('对方信息不可用');
            throw error;
        });
}

function updateHeader() {
    document.getElementById('contactName').textContent = contactProfile.display_name || contactProfile.nickname;

    const info = [];
    if (contactProfile.department) info.push(contactProfile.department);
    if (contactProfile.position) info.push(contactProfile.position);

    document.getElementById('contactSubtitle').textContent = info.join(' | ');
}

function loadMessages(loadMore = false) {
    if (isLoading || (!hasMore && loadMore)) {
        return;
    }

    isLoading = true;
    const targetPage = loadMore ? currentPage + 1 : currentPage;

    axios.get('/wechat/chat/messages', {
        params: {
            chat_with: chatWithId,
            page: targetPage,
            limit: pageSize
        }
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '获取消息失败');
        }

        const { messages: list, pagination } = response.data.data;
        const container = document.getElementById('messagesWrapper');
        const stickToBottom = loadMore ? false : utils.isNearBottom(container, SCROLL_THRESHOLD);

        if (loadMore) {
            messages = [...list, ...messages];
            currentPage = targetPage;
        } else {
            messages = list;
            currentPage = targetPage;
        }

        hasMore = pagination.has_more;
        const latestCandidate = pagination.latest_id ?? (messages.length ? messages[messages.length - 1].id : null);
        if (latestCandidate !== null) {
            latestMessageId = latestCandidate;
        } else if (latestMessageId === null) {
            latestMessageId = 0;
        }
        renderMessages({ forceScroll: stickToBottom || !loadMore });
        markIncomingMessagesAsRead(stickToBottom || !loadMore);
    }).catch(error => {
        console.error('加载消息失败:', error);
        if (!messages.length) {
            renderError('暂时无法加载消息');
        }
    }).finally(() => {
        isLoading = false;
    });
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

    axios.get('/wechat/chat/messages', {
        params: {
            chat_with: chatWithId,
            after_id: latestMessageId,
            limit: 50
        }
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '获取最新消息失败');
        }

        const { messages: list, pagination } = response.data.data;

        if (!list || list.length === 0) {
            return;
        }

        const container = document.getElementById('messagesWrapper');
        const stickToBottom = utils.isNearBottom(container, SCROLL_THRESHOLD);
        let incomingCount = 0;

        let needsRerender = false;
        list.forEach(message => {
            // 检查消息是否已存在(避免重复)
            const existingIndex = messages.findIndex(m => m.id === message.id);
            if (existingIndex === -1) {
                // 新消息
                messages.push(message);
                needsRerender = true;
                if (currentUser && message.to_user_id === currentUser.id) {
                    incomingCount++;
                }
            } else {
                // 已存在的消息,检查是否已读状态更新了
                const existing = messages[existingIndex];
                if (Number(existing.is_read) !== Number(message.is_read)) {
                    messages[existingIndex] = message;
                    needsRerender = true;
                }
            }
        });

        if (!needsRerender) {
            return;
        }

        latestMessageId = pagination.latest_id || messages[messages.length - 1].id;
        renderMessages({ forceScroll: stickToBottom });
        markIncomingMessagesAsRead(stickToBottom);

        if (incomingCount > 0 && !stickToBottom) {
            utils.incrementBadge(incomingCount);
            utils.notifyIncoming({ message: '收到新消息' });
        }
    }).catch(error => {
        console.error('轮询最新消息失败:', error);
    }).finally(() => {
        isPolling = false;
    });
}

function renderMessages(options = {}) {
    const { forceScroll = false } = options;
    const container = document.getElementById('messagesWrapper');
    const placeholder = document.getElementById('messagesPlaceholder');

    if (!messages.length) {
        const emptyHtml = '<div class="messages-placeholder" id="messagesPlaceholder">暂无消息，开始聊天吧～</div>';
        if (placeholder) {
            placeholder.outerHTML = emptyHtml;
        } else {
            container.innerHTML = emptyHtml;
        }
        return;
    }

    const shouldStick = forceScroll || utils.isNearBottom(container, SCROLL_THRESHOLD);

    if (placeholder) {
        placeholder.remove();
    }

    const fragment = document.createDocumentFragment();

    if (hasMore) {
        const loadMoreNode = document.createElement('div');
        loadMoreNode.className = 'weui-loadmore weui-loadmore_line conversation-loadmore';
        const tips = document.createElement('span');
        tips.className = 'weui-loadmore__tips';
        tips.textContent = '点击加载更多';
        loadMoreNode.appendChild(tips);
        loadMoreNode.addEventListener('click', () => loadMessages(true));
        fragment.appendChild(loadMoreNode);
    }

    messages.forEach(message => {
        const isMine = message.from_user_id === currentUser.id;
        const item = document.createElement('div');
        item.className = `message-item ${isMine ? 'mine' : ''}`;

        const avatar = document.createElement('img');
        avatar.className = 'message-avatar';
        avatar.src = isMine ? (currentUser.avatar_url || '/default-avatar.png') : (contactProfile.avatar_url || '/default-avatar.png');
        avatar.alt = isMine ? currentUser.nickname : contactProfile.display_name;

        const bubbleWrap = document.createElement('div');
        bubbleWrap.className = 'message-bubble-wrap';

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.innerHTML = formatMessageContent(message);

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = utils.formatTime(message.created_at);

        bubbleWrap.appendChild(bubble);
        bubbleWrap.appendChild(time);

        // 只在自己发送的消息上显示已读状态
        if (isMine) {
            const readStatus = document.createElement('div');
            readStatus.className = 'message-read-status';
            readStatus.textContent = Number(message.is_read) === 1 ? '对方已读' : '未读';
            bubbleWrap.appendChild(readStatus);
        }

        item.appendChild(avatar);
        item.appendChild(bubbleWrap);

        fragment.appendChild(item);
    });

    container.innerHTML = '';
    container.appendChild(fragment);

    if (shouldStick) {
        setTimeout(scrollToBottom, 0);
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

function escapeHtml(str) {
    return (str || '').replace(/[&<>"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
    })[char]);
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

    const sendButton = document.getElementById('sendBtn');
    sendButton.disabled = true;
    sendButton.classList.add('weui-btn_disabled');

    axios.post('/wechat/chat/send', {
        to_user_id: chatWithId,
        content,
        message_type: 'text'
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '发送失败');
        }

        input.value = '';
        input.style.height = 'auto'; // 重置高度
        messages.push(response.data.data);
        latestMessageId = response.data.data.id;
        renderMessages({ forceScroll: true });
        markIncomingMessagesAsRead();
    }).catch(error => {
        console.error('发送消息失败:', error);
        utils.toast(error.response?.data?.message || '发送失败,请稍后重试');
    }).finally(() => {
        sendButton.disabled = false;
        sendButton.classList.remove('weui-btn_disabled');
        input.focus(); // 发送后重新聚焦
    });
}

function markIncomingMessagesAsRead(force = false) {
    if (!currentUser) {
        return;
    }

    if (!force) {
        const container = document.getElementById('messagesWrapper');
        if (container && !utils.isNearBottom(container, SCROLL_THRESHOLD)) {
            return;
        }
    }

    const unreadIds = messages
        .filter(message => message.to_user_id === currentUser.id && Number(message.is_read) === 0)
        .map(message => message.id);

    if (!unreadIds.length) {
        return;
    }

    axios.post('/wechat/chat/read', {
        message_ids: unreadIds
    }).then(() => {
        utils.decrementBadge(unreadIds.length);
    }).catch(error => {
        console.error('标记已读失败:', error);
    });
}

function renderError(text) {
    const wrapper = document.getElementById('messagesWrapper');
    wrapper.innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">${text || '暂时无法加载消息'}</h2>
                <p class="weui-msg__desc">稍后再试试，或检查网络连接。</p>
            </div>
        </div>
    `;
}

function stopPolling() {
    if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
}

window.addEventListener('beforeunload', stopPolling);

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

// ===== 文件上传功能 =====

/**
 * 显示上传选项
 */
function showUploadOptions() {
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

    // 验证文件类型
    if (!file.type.startsWith('image/')) {
        weui.alert('请选择图片文件');
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

    // 验证文件大小 (50MB)
    if (file.size > 50 * 1024 * 1024) {
        weui.alert('文件大小不能超过50MB');
        return;
    }

    await uploadFile(file, 'file');
}

/**
 * 上传文件到R2
 */
async function uploadFile(file, type) {
    // 显示上传进度
    showUploadProgress();

    const formData = new FormData();
    formData.append(type === 'image' ? 'image' : 'file', file);

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

        // 2. 发送消息
        await sendMediaMessage(uploadResponse.data.data, type);

        // 3. 成功 - 关闭进度框
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
        const response = await axios.post('/wechat/chat/send', {
            to_user_id: chatWithId,
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
        weui.alert(error.response?.data?.message || error.message || '发送失败,请重试');
        throw error; // 抛出错误让上层知道失败了
    }
}

/**
 * 显示上传进度
 */
function showUploadProgress() {
    const dialog = document.createElement('div');
    dialog.className = 'upload-progress';
    dialog.id = 'uploadProgress';
    dialog.innerHTML = `
        <div>上传中...</div>
        <div class="upload-progress-bar">
            <div class="upload-progress-fill" id="uploadProgressFill"></div>
        </div>
        <div id="uploadProgressText" style="margin-top: 10px; font-size: 12px;">0%</div>
    `;
    document.body.appendChild(dialog);
    return dialog;
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
    const dialog = document.getElementById('uploadProgress');
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
    weui.gallery(url, {
        className: 'custom-classname',
        onDelete: function () {
            // 可以添加删除图片功能
        }
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
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

</script>
@endpush
