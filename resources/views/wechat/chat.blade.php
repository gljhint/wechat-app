@extends('wechat.layouts.app')

@section('title', '消息')
@section('navbar-title', '消息')

@push('styles')
<style>
    .chat-page {
        min-height: calc(100vh - 88px);
    }

    .search-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 12px 12px 4px;
    }

    .weui-search-bar {
        flex: 1;
        margin: 0;
        overflow: hidden;
    }

    .search-new-btn {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #07c160;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 2px 8px rgba(7, 193, 96, 0.25);
        transition: all 0.3s ease;
    }

    .search-new-btn:active {
        transform: scale(0.92);
    }

    /* 搜索激活时隐藏新建按钮 */
    .weui-search-bar_focusing ~ .search-new-btn {
        opacity: 0;
        pointer-events: none;
        width: 0;
        overflow: hidden;
    }

    .chat-cells {
        margin: 8px 12px 16px;
        border-radius: 12px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
    }

    .chat-cells .weui-cell {
        align-items: center;
    }

    .chat-avatar-wrap {
        position: relative;
        margin-right: 14px;
    }

    .chat-avatar {
        width: 48px;
        height: 48px;
        border-radius: 6px;
        object-fit: cover;
        background: #f0f0f0;
    }

    .chat-unread-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background: #fa5151;
        color: #fff;
        font-size: 10px;
        min-width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 999px;
        padding: 0 4px;
    }

    .chat-info {
        min-width: 0;
    }

    .chat-name {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .chat-preview {
        font-size: 13px;
        color: #7f7f7f;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .chat-time {
        font-size: 12px;
        color: #b2b2b2;
        margin-left: 8px;
    }


    .empty-state {
        padding: 56px 16px;
        text-align: center;
        color: #9BA1A6;
    }

    .empty-state .empty-icon {
        font-size: 42px;
        margin-bottom: 12px;
        display: block;
    }

    /* 新建菜单样式 */
    .weui-actionsheet {
        z-index: 5000;
    }

    .weui-actionsheet__cell {
        padding: 14px 16px;
        font-size: 16px;
    }

    .action-icon {
        font-size: 20px;
        margin-right: 8px;
    }

    .weui-mask {
        z-index: 4999;
    }

    /* 对话类型标识 */
    .chat-type-badge {
        position: absolute;
        bottom: -2px;
        right: -2px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
</style>
@endpush

@section('content')
<!-- 搜索栏与新建按钮 -->
<div class="search-wrapper">
    <div class="weui-search-bar" id="chatSearchBar">
        <form class="weui-search-bar__form" onsubmit="return false;">
            <div class="weui-search-bar__box">
                <i class="weui-icon-search"></i>
                <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" />
                <a class="weui-icon-clear" id="searchClear"></a>
            </div>
            <label class="weui-search-bar__label" id="searchText">
                <i class="weui-icon-search"></i>
                <span>搜索</span>
            </label>
        </form>
        <a class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
    </div>

    @wechatCanAny(['chat.send', 'chat.group.create'])
    <div class="search-new-btn" id="newChatBtn" onclick="showNewChatMenu()">
        +
    </div>
    @endwechatCanAny
</div>

<!-- 统一对话列表 -->
<div class="chat-list" id="conversationsList">
    <div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中...</span></div>
</div>

<!-- 新建菜单 -->
<div id="newChatMenu" class="weui-actionsheet" style="display: none;">
    <div class="weui-actionsheet__menu">
        @wechatCan('chat.send')
        <div class="weui-actionsheet__cell" onclick="newPrivateChat()">
            <span class="action-icon">💬</span> 发起私聊
        </div>
        @endwechatCan

        @wechatCan('chat.group.create')
        <div class="weui-actionsheet__cell" onclick="newGroupChat()">
            <span class="action-icon">👥</span> 创建群聊
        </div>
        @endwechatCan
    </div>
    <div class="weui-actionsheet__action">
        <div class="weui-actionsheet__cell" onclick="hideNewChatMenu()">取消</div>
    </div>
</div>
<div id="newChatMask" class="weui-mask" style="display: none;" onclick="hideNewChatMenu()"></div>
@endsection

@push('scripts')
<script>
let contacts = [];
let groups = [];
let conversations = []; // 统一的对话列表
let searchTimeout;
let unreadSnapshot = {};
let pollTimer = null;

const conversationUrl = '{{ route('chat.conversation') }}';
const POLL_INTERVAL = 10000;

// 页面加载时获取数据
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('chatSearchBar');
    const searchInput = document.getElementById('searchInput');
    const searchLabel = document.getElementById('searchText');
    const searchClear = document.getElementById('searchClear');
    const searchCancel = document.getElementById('searchCancel');

    const resetSearch = () => {
        searchInput.value = '';
        searchBar.classList.remove('weui-search-bar_focusing');
        searchInput.blur();
        renderConversations(conversations);
    };

    if (searchLabel) {
        searchLabel.addEventListener('click', () => {
            searchBar.classList.add('weui-search-bar_focusing');
            searchInput.focus();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchBar.classList.add('weui-search-bar_focusing');
        });

        searchInput.addEventListener('blur', () => {
            if (!searchInput.value.trim()) {
                searchBar.classList.remove('weui-search-bar_focusing');
            }
        });

        searchInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            const value = e.target.value;
            searchTimeout = setTimeout(() => {
                filterConversations(value);
            }, 300);
        });
    }

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            renderConversations(conversations);
        });
    }

    if (searchCancel) {
        searchCancel.addEventListener('click', resetSearch);
    }

    Promise.all([
        loadContacts({ silent: true }),
        loadGroups({ silent: true })
    ]).then(() => {
        startPolling();
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', stopPolling);
    });
});

// 合并并排序对话列表
function mergeConversations() {
    const allConversations = [];

    // 添加私聊对话
    contacts.forEach(contact => {
        allConversations.push({
            type: 'private',
            id: contact.id,
            data: contact,
            lastMessageTime: contact.last_message ? new Date(contact.last_message.created_at).getTime() : 0,
            unreadCount: contact.unread_count || 0
        });
    });

    // 添加群聊对话
    groups.forEach(group => {
        allConversations.push({
            type: 'group',
            id: group.id,
            data: group,
            lastMessageTime: group.last_message ? new Date(group.last_message.created_at).getTime() : 0,
            unreadCount: group.unread_count || 0
        });
    });

    // 按最后消息时间倒序排序
    allConversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

    conversations = allConversations;
    return conversations;
}

// 加载联系人列表
function loadContacts({ silent = false } = {}) {
    return axios.get('/wechat/chat/contacts')
        .then(response => {
            if (response.data.code === 200) {
                updateContacts(response.data.data, { silent });
            } else {
                showError(response.data.message);
            }
        })
        .catch(error => {
            console.error('加载联系人失败:', error);
            if (!silent) {
                showError('加载失败，请重试');
            }
        });
}

function updateContacts(list, { silent }) {
    contacts = list || [];

    contacts.forEach(contact => {
        const unread = contact.unread_count || 0;
        const key = `private_${contact.id}`;
        const previous = unreadSnapshot[key] || 0;
        if (!silent && unread > previous) {
            const name = contact.real_name || contact.nickname || '联系人';
            utils.notifyIncoming({ message: `${name} 有新消息` });
        }
        unreadSnapshot[key] = unread;
    });

    mergeConversations();
    renderConversations(conversations);
    refreshTotalUnread();
}

// 渲染统一对话列表
function renderConversations(list) {
    const chatList = document.getElementById('conversationsList');

    if (!list || list.length === 0) {
        chatList.innerHTML = `
            <div class="weui-msg">
                <div class="weui-msg__icon-area">
                    <span class="empty-icon" aria-hidden="true">💬</span>
                </div>
                <div class="weui-msg__text-area">
                    <h2 class="weui-msg__title">暂无对话</h2>
                    <p class="weui-msg__desc">点击右下角按钮开始聊天</p>
                </div>
            </div>
        `;
        return;
    }

    let html = '<div class="weui-cells weui-cells_access chat-cells">';
    list.forEach(conversation => {
        const isGroup = conversation.type === 'group';
        const data = conversation.data;
        const lastMessage = data.last_message;

        let messagePreview = '暂无消息';
        if (lastMessage) {
            if (isGroup && lastMessage.from_user) {
                const senderName = lastMessage.from_user.real_name?lastMessage.from_user.real_name:lastMessage.from_user.nickname;
                messagePreview = `${senderName ? senderName + ': ' : ''}${getMessagePreview(lastMessage)}`;
            } else {
                messagePreview = getMessagePreview(lastMessage);
            }
        }

        const messageTime = lastMessage ? utils.formatTime(lastMessage.created_at) : '';
        const unreadCount = conversation.unreadCount;

        let avatar, displayName, clickHandler;
        if (isGroup) {
            avatar = data.avatar || '/default-group-avatar.png';
            displayName = `${data.name || '群聊'} (${data.member_count || 0})`;
            clickHandler = `openGroupChat(${data.id})`;
        } else {
            avatar = data.avatar_url || '/default-avatar.png';
            displayName = data.real_name || data.nickname || '联系人';
            clickHandler = `openChat(${data.id})`;
        }

        html += `
            <a href="javascript:;" class="weui-cell weui-cell_access" onclick="${clickHandler}">
                <div class="weui-cell__hd">
                    <div class="chat-avatar-wrap">
                        <img src="${avatar}" class="chat-avatar" alt="${displayName}">
                        ${unreadCount > 0 ? `<span class="chat-unread-badge">${unreadCount > 99 ? '99+' : unreadCount}</span>` : ''}
                    </div>
                </div>
                <div class="weui-cell__bd chat-info">
                    <p class="chat-name">${displayName}</p>
                    <p class="chat-preview">${messagePreview}</p>
                </div>
                <div class="weui-cell__ft">
                    <span class="chat-time">${messageTime}</span>
                </div>
            </a>
        `;
    });
    html += '</div>';
    chatList.innerHTML = html;
}


// 获取消息预览文本
function getMessagePreview(message) {
    // 优先使用 display_content (已解密+格式化),否则使用 content
    if (message.display_content) {
        return message.display_content;
    }

    switch(parseInt(message.message_type)) {
        case 1:
            // 文本消息: 使用content(已通过ChatMessageResource解密)
            return message.content || '新消息';
        case 2:
            return '[图片]';
        case 3:
            return '[语音]';
        case 4:
            return '[视频]';
        case 5:
            return '[文件]';
        default:
            return message.content || '新消息';
    }
}

// 搜索过滤
function filterConversations(keyword) {
    if (!keyword.trim()) {
        renderConversations(conversations);
        return;
    }

    const filtered = conversations.filter(conversation => {
        const data = conversation.data;
        if (conversation.type === 'group') {
            const name = (data.name || '').toLowerCase();
            return name.includes(keyword.toLowerCase());
        } else {
            const name = (data.real_name || data.nickname || '').toLowerCase();
            return name.includes(keyword.toLowerCase());
        }
    });

    renderConversations(filtered);
}

// 打开聊天窗口
function openChat(userId) {
    location.href = `${conversationUrl}?user_id=${userId}`;
}

// 加载群组列表
function loadGroups({ silent = false } = {}) {
    return axios.get('/wechat/chat/groups')
        .then(response => {
            if (response.data.code === 200) {
                updateGroups(response.data.data, { silent });
            } else {
                showError(response.data.message);
            }
        })
        .catch(error => {
            console.error('加载群组失败:', error);
            if (!silent) {
                showError('加载失败，请重试');
            }
        });
}

function updateGroups(list, { silent }) {
    groups = list || [];

    groups.forEach(group => {
        const unread = group.unread_count || 0;
        const key = `group_${group.id}`;
        const previous = unreadSnapshot[key] || 0;
        if (!silent && unread > previous) {
            utils.notifyIncoming({ message: `群聊「${group.name}」有新消息` });
        }
        unreadSnapshot[key] = unread;
    });

    mergeConversations();
    renderConversations(conversations);
    refreshTotalUnread();
}


// 打开群聊窗口
function openGroupChat(groupId) {
    location.href = `/chat/group?group_id=${groupId}`;
}

// 显示新建菜单
function showNewChatMenu() {
    document.getElementById('newChatMenu').style.display = 'block';
    document.getElementById('newChatMask').style.display = 'block';
    // 添加显示动画
    setTimeout(() => {
        document.getElementById('newChatMenu').classList.add('weui-actionsheet_toggle');
        document.getElementById('newChatMask').classList.add('weui-fade-enter');
    }, 0);
}

// 隐藏新建菜单
function hideNewChatMenu() {
    const menu = document.getElementById('newChatMenu');
    const mask = document.getElementById('newChatMask');
    menu.classList.remove('weui-actionsheet_toggle');
    mask.classList.remove('weui-fade-enter');
    setTimeout(() => {
        menu.style.display = 'none';
        mask.style.display = 'none';
    }, 300);
}

// 新建私聊
function newPrivateChat() {
    location.href = '{{ route("new-chat") }}';
}

// 新建群聊
function newGroupChat() {
    location.href = '{{ route("chat.create.group") }}';
}

// 显示错误信息
function showError(message) {
    const container = document.getElementById('conversationsList');
    container.innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <span class="empty-icon" aria-hidden="true">⚠️</span>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">加载失败</h2>
                <p class="weui-msg__desc">${message}</p>
            </div>
            <div class="weui-msg__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_primary" onclick="location.reload()">重新加载</a>
            </div>
        </div>
    `;
}


function startPolling() {
    stopPolling();
    pollTimer = setInterval(() => {
        if (!document.hidden) {
            Promise.all([
                loadContacts({ silent: false }),
                loadGroups({ silent: false })
            ]);
        }
    }, POLL_INTERVAL);
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
        Promise.all([
            loadContacts({ silent: false }),
            loadGroups({ silent: false })
        ]).finally(startPolling);
    }
}

function refreshTotalUnread() {
    const contactUnread = contacts.reduce((total, contact) => total + (contact.unread_count || 0), 0);
    const groupUnread = groups.reduce((total, group) => total + (group.unread_count || 0), 0);
    const overall = contactUnread + groupUnread;
    utils.updateChatBadge(overall);
}

refreshTotalUnread();
</script>
@endpush