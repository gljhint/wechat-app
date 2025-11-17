@extends('wechat.layouts.app')

@section('title', '创建群聊')
@section('navbar-title', '创建群聊')

@push('styles')
<style>
    .create-group-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding-bottom: 180px; /* 为按钮和底部导航栏留出空间 */
    }

    .create-group__search {
        padding: 16px 16px 0;
    }

    .create-group__selected {
        margin: 12px 16px;
        padding: 14px;
        border-radius: 16px;
        background: #ffffff;
        box-shadow: 0 10px 24px rgba(16, 30, 54, 0.06);
    }

    .create-group__selected-label {
        font-size: 13px;
        color: #8f9499;
        margin-bottom: 10px;
    }

    .create-group__selected-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .create-group__tag {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        border-radius: 999px;
        background: #f0f4ff;
        color: #2f5be7;
        font-size: 13px;
        line-height: 1;
    }

    .create-group__tag button {
        border: none;
        background: none;
        color: inherit;
        font-size: 16px;
        margin-left: 6px;
    }

    .create-group__list {
        margin: 16px;
        border-radius: 16px;
        overflow-y: auto;
        background: #ffffff;
        box-shadow: 0 10px 24px rgba(16, 30, 54, 0.04);
        max-height: calc(100vh - 360px);
    }

    .create-group__form {
        margin: 16px;
        padding: 18px;
        border-radius: 16px;
        background: #ffffff;
        box-shadow: 0 10px 28px rgba(16, 30, 54, 0.08);
        display: none;
    }

    .create-group__footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 80px; /* 避开底部导航栏 */
        padding: 16px 20px 26px;
        background: linear-gradient(180deg, rgba(246, 247, 251, 0) 0%, #f6f7fb 35%, #f6f7fb 100%);
        z-index: 999; /* 确保在内容之上，但在导航栏之下 */
    }

    .create-group__footer .weui-btn {
        width: 100%;
    }
</style>
@endpush

@section('content')
<div class="create-group-page">
    <div class="create-group__search">
        <div class="weui-search-bar" id="contactSearchBar">
            <form class="weui-search-bar__form" onsubmit="return false;">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索联系人" autocomplete="off" />
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

    <div class="create-group__selected">
        <div class="create-group__selected-label">已选择 <span id="selectedCount">0</span></div>
        <div class="create-group__selected-list" id="selectedList"></div>
    </div>

    <div class="create-group__list" id="contactsList">
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    </div>

    <div class="create-group__form" id="groupInfoSection">
        <div class="weui-cells__title">群聊信息</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">群名称</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" id="groupName" placeholder="请输入群名称" maxlength="50">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" id="groupDescription" placeholder="请输入群简介（可选）" rows="4" maxlength="500"></textarea>
                    <div class="weui-textarea-counter"><span id="descCount">0</span>/500</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="create-group__footer" id="footerButtons">
    <!-- 第一步：选择联系人 -->
    <div id="step1Buttons">
        <a href="javascript:;" class="weui-btn weui-btn_primary weui-btn_disabled" id="nextStepBtn" onclick="handleNextStep()" aria-disabled="true">下一步</a>
    </div>
    <!-- 第二步：填写群信息 -->
    <div id="step2Buttons" style="display:none;">
        <a href="javascript:;" class="weui-btn weui-btn_default" onclick="handleBackStep()" style="margin-bottom:12px;">返回</a>
        <a href="javascript:;" class="weui-btn weui-btn_primary" id="createGroupBtn" onclick="createGroup()">创建群聊</a>
    </div>
</div>
@endsection

@push('scripts')
<script>
const loadingHtml = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中...</span></div>';

let contacts = [];
let filteredContacts = [];
let selectedMembers = [];
let searchTimer = null;
let isInfoStep = false;
let currentPage = 1;
let hasMore = true;
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
    setupSearchBar();
    loadContacts();
    updateSelectedList();
    document.getElementById('groupDescription').addEventListener('input', updateDescriptionCount);
    updateDescriptionCount();
    setupScrollLoad();
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
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => filterContacts(searchInput.value.trim()), 250);
    });

    if (searchClear) {
        searchClear.addEventListener('click', event => {
            event.preventDefault();
            searchInput.value = '';
            filterContacts('');
            searchInput.focus();
        });
    }

    if (searchCancel) {
        searchCancel.addEventListener('click', () => {
            searchInput.value = '';
            filterContacts('');
            searchBar.classList.remove('weui-search-bar_focusing');
        });
    }
}

function loadContacts(resetPage = true) {
    if (isLoading) return;

    if (resetPage) {
        currentPage = 1;
        contacts = [];
        hasMore = true;
        document.getElementById('contactsList').innerHTML = loadingHtml;
    } else {
        if (!hasMore) return;
        appendLoadingIndicator();
    }

    isLoading = true;

    axios.get('/wechat/chat/available-users', {
        params: {
            page: currentPage,
            limit: 50  // 每次加载 50 人
        }
    })
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '加载联系人失败');
            }

            const newUsers = response.data.data?.users || [];
            const pagination = response.data.data?.pagination || {};

            contacts = [...contacts, ...newUsers];
            filteredContacts = contacts;
            hasMore = pagination.has_more || false;

            renderContacts();
            removeLoadingIndicator();

            if (hasMore) {
                currentPage++;
            }
        })
        .catch(error => {
            console.error('加载联系人失败:', error);
            if (currentPage === 1) {
                showError(error.response?.data?.message || '加载联系人失败,请稍后重试');
            } else {
                utils.topTips('加载失败,请稍后重试');
                removeLoadingIndicator();
            }
        })
        .finally(() => {
            isLoading = false;
        });
}

function renderContacts() {
    const container = document.getElementById('contactsList');

    // 移除旧的加载和提示元素
    const oldIndicators = container.querySelectorAll('.load-more-indicator, .no-more-indicator');
    oldIndicators.forEach(el => el.remove());

    if (!filteredContacts.length) {
        container.innerHTML = `
            <div class="weui-msg">
                <div class="weui-msg__icon-area">
                    <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
                </div>
                <div class="weui-msg__text-area">
                    <h2 class="weui-msg__title">暂无联系人</h2>
                    <p class="weui-msg__desc">尝试调整搜索关键词。</p>
                </div>
            </div>
        `;
        return;
    }

    const items = filteredContacts.map(contact => {
        const id = Number(contact.id);
        const checked = selectedMembers.some(member => member.id === id) ? 'checked' : '';
        const displayName = escapeHtml(contact.real_name || contact.nickname || '联系人');
        const avatar = escapeHtml(contact.avatar_url || '/default-avatar.png');

        return `
            <label class="weui-cell weui-cell_active weui-check__label" data-user-id="${id}">
                <div class="weui-cell__hd">
                    <input type="checkbox" class="weui-check" ${checked}>
                    <span class="weui-icon-checked"></span>
                </div>
                <div class="weui-cell__bd" style="display:flex;align-items:center;gap:12px;">
                    <img src="${avatar}" alt="${displayName}" style="width:40px;height:40px;border-radius:12px;object-fit:cover;background:#eceff4;">
                    <span>${displayName}</span>
                </div>
            </label>
        `;
    }).join('');

    container.innerHTML = `<div class="weui-cells weui-cells_checkbox">${items}</div>`;

    container.querySelectorAll('.weui-check__label').forEach(label => {
        label.addEventListener('click', event => {
            event.preventDefault();
            const userId = Number(label.dataset.userId);
            const contact = contacts.find(item => item.id === userId);
            if (!contact) {
                return;
            }
            toggleMember(userId, contact.real_name || contact.nickname || '联系人');
        });
    });

    // 渲染完成后检查是否需要显示"已全部加载"提示
    if (!hasMore && contacts.length > 0) {
        removeLoadingIndicator();
    }
}

function toggleMember(userId, name) {
    const existingIndex = selectedMembers.findIndex(member => member.id === userId);
    if (existingIndex > -1) {
        selectedMembers.splice(existingIndex, 1);
    } else {
        selectedMembers.push({ id: userId, name: name });
    }

    updateSelectedList();
    renderContacts();
    updatePrimaryButton();
}

function updateSelectedList() {
    const listEl = document.getElementById('selectedList');
    const countEl = document.getElementById('selectedCount');

    countEl.textContent = selectedMembers.length;

    if (!selectedMembers.length) {
        listEl.innerHTML = '<span style="color:#b4bac1;font-size:13px;">请选择群成员</span>';
        return;
    }

    listEl.innerHTML = selectedMembers.map(member => {
        const safeName = escapeHtml(member.name);
        return `
            <span class="create-group__tag">
                ${safeName}
                <button type="button" aria-label="移除" onclick="removeMember(${member.id})">×</button>
            </span>
        `;
    }).join('');
}

function removeMember(userId) {
    const index = selectedMembers.findIndex(member => member.id === userId);
    if (index > -1) {
        selectedMembers.splice(index, 1);
    }
    updateSelectedList();
    renderContacts();
    updatePrimaryButton();
}

function updatePrimaryButton() {
    const btn = document.getElementById('nextStepBtn');
    const enabled = selectedMembers.length > 0;
    btn.classList.toggle('weui-btn_disabled', !enabled);
    btn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
}

function handleNextStep() {
    if (selectedMembers.length === 0) {
        utils.topTips('请至少选择 1 位成员');
        return;
    }

    if (selectedMembers.length < 2) {
        utils.topTips('创建群聊至少需要 2 位成员');
        return;
    }

    showGroupInfoSection();
}

function handleBackStep() {
    isInfoStep = false;

    // 显示联系人列表和搜索
    document.getElementById('contactsList').style.display = 'block';
    document.getElementById('searchInput').disabled = false;

    // 隐藏群信息表单
    document.getElementById('groupInfoSection').style.display = 'none';

    // 切换按钮组
    document.getElementById('step1Buttons').style.display = 'block';
    document.getElementById('step2Buttons').style.display = 'none';
}

function showGroupInfoSection() {
    isInfoStep = true;

    // 隐藏联系人列表和搜索
    document.getElementById('contactsList').style.display = 'none';
    document.getElementById('contactSearchBar').classList.remove('weui-search-bar_focusing');
    document.getElementById('searchInput').disabled = true;

    // 显示群信息表单
    document.getElementById('groupInfoSection').style.display = 'block';

    // 切换按钮组
    document.getElementById('step1Buttons').style.display = 'none';
    document.getElementById('step2Buttons').style.display = 'block';

    // 自动填充默认群名称
    const defaultName = selectedMembers.slice(0, 3).map(member => member.name).join('、');
    document.getElementById('groupName').value = defaultName ? `${defaultName}的群聊` : '';

    // 聚焦到群名称输入框
    setTimeout(() => {
        document.getElementById('groupName').focus();
    }, 100);
}

function createGroup() {
    const nameInput = document.getElementById('groupName');
    const descInput = document.getElementById('groupDescription');
    const groupName = nameInput.value.trim();
    const groupDescription = descInput.value.trim();

    if (!groupName) {
        utils.topTips('请输入群名称');
        nameInput.focus();
        return;
    }

    const btn = document.getElementById('createGroupBtn');
    btn.classList.add('weui-btn_disabled');
    btn.setAttribute('aria-disabled', 'true');

    utils.loading('创建中...');

    axios.post('/wechat/chat/groups', {
        name: groupName,
        description: groupDescription,
        member_ids: selectedMembers.map(member => member.id)
    })
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '创建失败');
            }
            utils.toast('创建成功');
            const groupId = response.data.data?.id;
            setTimeout(() => {
                if (groupId) {
                    location.href = `/chat/group?group_id=${groupId}`;
                } else {
                    location.href = '{{ route('chat') }}';
                }
            }, 800);
        })
        .catch(error => {
            console.error('创建群聊失败:', error);
            utils.toast(error.response?.data?.message || '创建失败，请稍后重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
            btn.classList.remove('weui-btn_disabled');
            btn.setAttribute('aria-disabled', 'false');
        });
}

function filterContacts(keyword) {
    if (!keyword) {
        filteredContacts = contacts;
    } else {
        const lower = keyword.toLowerCase();
        filteredContacts = contacts.filter(contact => {
            const nickname = (contact.nickname || '').toLowerCase();
            const realName = (contact.real_name || '').toLowerCase();
            return nickname.includes(lower) || realName.includes(lower);
        });
    }
    renderContacts();

    // 如果当前显示的联系人少于20个且还有更多数据，提示用户
    if (filteredContacts.length < 20 && hasMore && !keyword) {
        // 自动加载更多
        setTimeout(() => {
            if (!isLoading && hasMore) {
                loadContacts(false);
            }
        }, 300);
    }
}

function updateDescriptionCount() {
    const value = document.getElementById('groupDescription').value || '';
    document.getElementById('descCount').textContent = value.length;
}

function showError(message) {
    document.getElementById('contactsList').innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">${escapeHtml(message || '加载失败')}</h2>
                <p class="weui-msg__desc">请检查网络后再次尝试。</p>
            </div>
            <div class="weui-msg__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_primary" onclick="loadContacts()">重新加载</a>
            </div>
        </div>
    `;
}

function escapeHtml(str = '') {
    return String(str).replace(/[&<>'"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
    }[char] || char));
}

function setupScrollLoad() {
    const container = document.getElementById('contactsList');

    container.addEventListener('scroll', () => {
        if (isInfoStep || isLoading || !hasMore) return;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        // 当滚动到距离底部 100px 时开始加载
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadContacts(false);
        }
    });
}

function appendLoadingIndicator() {
    const container = document.getElementById('contactsList');
    const existingLoading = container.querySelector('.load-more-indicator');

    if (!existingLoading) {
        const loadMoreHtml = `
            <div class="weui-loadmore load-more-indicator" style="padding: 16px 0;">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">加载更多...</span>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', loadMoreHtml);
    }
}

function removeLoadingIndicator() {
    const container = document.getElementById('contactsList');
    const loadingIndicator = container.querySelector('.load-more-indicator');

    if (loadingIndicator) {
        loadingIndicator.remove();
    }

    // 如果没有更多数据，显示提示
    if (!hasMore && contacts.length > 0) {
        const existingEnd = container.querySelector('.no-more-indicator');
        if (!existingEnd) {
            const noMoreHtml = `
                <div class="weui-loadmore weui-loadmore_line no-more-indicator" style="padding: 16px 0;">
                    <span class="weui-loadmore__tips" style="color: #999; font-size: 13px;">已加载全部联系人 (共 ${contacts.length} 人)</span>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', noMoreHtml);
        }
    }
}
</script>
@endpush
