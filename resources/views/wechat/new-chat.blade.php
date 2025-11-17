@php($hideTabbar = true)
@php($showBack = true)

@extends('wechat.layouts.app')

@section('title', '发起聊天')
@section('navbar-title', '发起聊天')

@push('styles')
<style>
    .new-chat-page {
        min-height: 100vh;
        background: #f6f7fb;
    }

    .new-chat__search {
        padding: 16px 16px 12px;
    }

    .new-chat__list {
        margin: 0 16px 16px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 12px 28px rgba(16, 30, 54, 0.08);
        overflow: hidden;
    }

    .new-chat__empty,
    .new-chat__error,
    .new-chat__loading {
        padding: 48px 16px;
        text-align: center;
        color: #8f9499;
        font-size: 13px;
    }

    .new-chat__error button {
        margin-top: 12px;
    }

    .new-chat__loadmore {
        text-align: center;
        padding: 12px 0 16px;
        color: #576b95;
        font-size: 13px;
    }
</style>
@endpush

@section('content')
<div class="new-chat-page">
    <div class="new-chat__search">
        <div class="weui-search-bar" id="contactSearchBar">
            <form class="weui-search-bar__form" onsubmit="return false;">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索姓名/部门/职位" autocomplete="off">
                    <a class="weui-icon-clear" id="searchClear"></a>
                </div>
                <label class="weui-search-bar__label" id="searchLabel">
                    <i class="weui-icon-search"></i>
                    <span>搜索联系人</span>
                </label>
            </form>
            <a class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
        </div>
    </div>

    <div class="new-chat__list" id="contactsContainer">
        <div class="new-chat__loading">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let contacts = [];
let pagination = { page: 1, has_more: false };
let searchKeyword = '';
let isLoading = false;
let debounceTimer = null;

const conversationUrl = '{{ route('chat.conversation') }}';
const SCROLL_THRESHOLD = 100; // 距离底部100px时触发加载

document.addEventListener('DOMContentLoaded', () => {
    setupSearchBar();
    loadContacts();
    setupScrollListener();
});

function setupSearchBar() {
    const searchBar = document.getElementById('contactSearchBar');
    const searchInput = document.getElementById('searchInput');
    const searchLabel = document.getElementById('searchLabel');
    const searchClear = document.getElementById('searchClear');
    const searchCancel = document.getElementById('searchCancel');

    const activate = () => {
        searchBar.classList.add('weui-search-bar_focusing');
        searchInput.focus();
    };

    if (searchLabel) {
        searchLabel.addEventListener('click', activate);
    }

    searchInput.addEventListener('focus', activate);
    searchInput.addEventListener('blur', () => {
        if (!searchInput.value.trim()) {
            searchBar.classList.remove('weui-search-bar_focusing');
        }
    });

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            searchKeyword = searchInput.value.trim();
            loadContacts(1, false);
        }, 250);
    });

    if (searchClear) {
        searchClear.addEventListener('click', event => {
            event.preventDefault();
            searchInput.value = '';
            searchKeyword = '';
            loadContacts(1, false);
            searchInput.focus();
        });
    }

    if (searchCancel) {
        searchCancel.addEventListener('click', () => {
            searchInput.value = '';
            searchKeyword = '';
            loadContacts(1, false);
            searchBar.classList.remove('weui-search-bar_focusing');
        });
    }
}

function setupScrollListener() {
    window.addEventListener('scroll', () => {
        // 检查是否滚动到接近底部
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        const distanceToBottom = scrollHeight - (scrollTop + clientHeight);

        // 当距离底部小于阈值且还有更多数据时,自动加载
        if (distanceToBottom < SCROLL_THRESHOLD && pagination.has_more && !isLoading) {
            loadContacts(pagination.page + 1, true);
        }
    });
}

function loadContacts(page = 1, append = false) {
    if (isLoading) {
        return;
    }

    isLoading = true;
    if (!append) {
        showLoading();
    }

    axios.get('/wechat/chat/available-users', {
        params: {
            page,
            limit: 20,
            search: searchKeyword || undefined
        }
    }).then(response => {
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '获取联系人失败');
        }

        const { users, pagination: pager } = response.data.data;
        contacts = append ? contacts.concat(users || []) : (users || []);
        pagination = {
            page: pager.page,
            has_more: Boolean(pager.has_more)
        };

        renderContacts();
    }).catch(error => {
        console.error('加载联系人失败:', error);
        renderError(error.response?.data?.message || '加载失败,请稍后重试');
    }).finally(() => {
        isLoading = false;
    });
}

function renderContacts() {
    const container = document.getElementById('contactsContainer');

    if (!contacts.length) {
        container.innerHTML = `
            <div class="new-chat__empty">
                <div style="font-size: 42px; margin-bottom: 12px;">🗂</div>
                <div>${searchKeyword ? '未找到匹配的联系人' : '暂无可用联系人'}</div>
            </div>
        `;
        return;
    }

    const list = document.createElement('div');
    list.className = 'weui-cells';

    contacts.forEach(contact => {
        const cell = document.createElement('a');
        cell.className = 'weui-cell weui-cell_active';
        cell.setAttribute('role', 'button');
        cell.addEventListener('click', () => startChat(contact.id));

        const hd = document.createElement('div');
        hd.className = 'weui-cell__hd';
        hd.style.marginRight = '12px';
        hd.innerHTML = `<img src="${escapeHtml(contact.avatar_url || '/default-avatar.png')}" alt="${escapeHtml(contact.real_name || contact.nickname || '联系人')}" style="width:44px;height:44px;border-radius:12px;object-fit:cover;background:#eceff4;">`;

        const bd = document.createElement('div');
        bd.className = 'weui-cell__bd';
        const displayName = escapeHtml(contact.real_name || contact.nickname || '未命名用户');
        const metaParts = [];
        if (contact.department) metaParts.push(contact.department);
        if (contact.position) metaParts.push(contact.position);
        if (!metaParts.length && contact.nickname) metaParts.push(`昵称：${escapeHtml(contact.nickname)}`);

        bd.innerHTML = `
            <p style="font-weight:600;color:#111;">${displayName}</p>
            <p style="font-size:12px;color:#8f9499;">${metaParts.join(' · ') || '暂无更多信息'}</p>
        `;

        cell.appendChild(hd);
        cell.appendChild(bd);
        list.appendChild(cell);
    });

    if (pagination.has_more && isLoading) {
        const loadMore = document.createElement('div');
        loadMore.className = 'new-chat__loadmore';
        loadMore.innerHTML = '<i class="weui-loading"></i> <span>加载中...</span>';
        list.appendChild(loadMore);
    }

    container.innerHTML = '';
    container.appendChild(list);
}

function showLoading() {
    document.getElementById('contactsContainer').innerHTML = `
        <div class="new-chat__loading">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    `;
}

function renderError(message) {
    document.getElementById('contactsContainer').innerHTML = `
        <div class="new-chat__error">
            <div style="margin-bottom: 8px;">${escapeHtml(message)}</div>
            <button type="button" class="weui-btn weui-btn_mini weui-btn_primary" onclick="loadContacts(${pagination.page}, ${contacts.length > 0})">重新加载</button>
        </div>
    `;
}

function startChat(userId) {
    window.location.href = `${conversationUrl}?user_id=${userId}`;
}

function escapeHtml(str = '') {
    return String(str).replace(/[&<>'\"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\'': '&#39;',
        '"': '&quot;'
    }[char] || char));
}
</script>
@endpush
