@php($hideTabbar = true)

@extends('wechat.layouts.app')

@section('title', '群聊详情')
@section('navbar-title', '群聊详情')

@push('styles')
<style>
    .group-detail-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding-bottom: 72px;
    }

    .group-card {
        text-align: center;
        padding: 24px 16px 20px;
        background: #ffffff;
        box-shadow: 0 8px 24px rgba(16, 30, 54, 0.06);
        border-radius: 18px;
        margin: 16px;
    }

    .group-card__avatar {
        width: 96px;
        height: 96px;
        border-radius: 20px;
        overflow: hidden;
        margin: 0 auto 12px;
        background: #e5e6eb;
    }

    .group-card__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .group-card__name {
        font-size: 20px;
        font-weight: 600;
        color: #111;
        margin-bottom: 6px;
    }

    .group-card__desc {
        font-size: 13px;
        color: #8f9499;
        line-height: 1.6;
        word-break: break-word;
    }

    .group-section {
        margin: 0 16px 16px;
        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 8px 24px rgba(16, 30, 54, 0.04);
    }

    .group-section__title {
        padding: 16px 18px 0;
        font-size: 14px;
        color: #909399;
    }

    .group-members-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
        gap: 16px;
        padding: 18px;
    }

    .group-member-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        text-align: center;
    }

    .group-member-card__avatar {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: #eceff4;
        object-fit: cover;
    }

    .group-member-name {
        font-size: 13px;
        color: #111;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 72px;
    }

    .group-member-role {
        font-size: 11px;
        color: #07c160;
    }

    .group-member-card__invite {
        border: 1px dashed #cfd3dc;
        border-radius: 16px;
        padding: 16px 0;
        background: #f9fafc;
        color: #07c160;
        font-weight: 600;
    }

    .group-member-card__invite .group-member-card__plus {
        font-size: 24px;
        line-height: 1;
    }

    .group-member-card__invite:active {
        background: #eef8f1;
    }

    .group-member-card {
        position: relative;
    }

    .group-member-remove {
        position: absolute;
        top: -6px;
        right: -6px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fa5151;
        color: #fff;
        border: 2px solid #fff;
        font-size: 14px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        cursor: pointer;
        box-shadow: 0 2px 6px rgba(250, 81, 81, 0.3);
    }

    .group-member-remove:active {
        background: #e63e3e;
        transform: scale(0.95);
    }

    .group-info-cells .weui-cell__bd p {
        font-weight: 500;
        color: #111;
    }

    .group-info-cells .weui-cell__ft {
        color: #8f9499;
    }

    .group-actions {
        margin: 0 16px 16px;
        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 8px 24px rgba(16, 30, 54, 0.04);
    }

    .group-action-danger .weui-cell__bd p {
        color: #fa5151;
    }

    .group-action-danger .weui-cell__ft::after {
        border-color: rgba(250, 81, 81, 0.35);
    }

    .group-members__invite-button {
        margin: 0 16px 24px;
    }

    .group-members__invite-button .weui-btn {
        width: 100%;
    }

    .invite-mask {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.45);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        z-index: 2000;
    }

    .invite-mask.show {
        opacity: 1;
        pointer-events: auto;
    }

    .invite-dialog {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 80vh;
        background: #ffffff;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -12px 32px rgba(16, 30, 54, 0.12);
        transform: translateY(100%);
        transition: transform 0.25s ease;
        display: flex;
        flex-direction: column;
        z-index: 2001;
    }

    .invite-dialog.show {
        transform: translateY(0);
    }

    .invite-dialog__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px 12px;
        border-bottom: 1px solid #f0f1f4;
    }

    .invite-dialog__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .invite-dialog__close {
        border: none;
        background: none;
        font-size: 22px;
        line-height: 1;
        color: #999;
        padding: 4px;
    }

    .invite-dialog__search {
        padding: 12px 20px;
        border-bottom: 1px solid #f0f1f4;
    }

    .invite-dialog__body {
        padding: 0 20px 12px;
        overflow-y: auto;
        flex: 1;
    }

    .invite-dialog__footer {
        padding: 16px 20px 24px;
        display: flex;
        gap: 12px;
    }

    .invite-dialog__footer .weui-btn {
        flex: 1;
    }

    .invite-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        background: #f2f3f5;
        margin-right: 12px;
    }

    .invite-option__body {
        display: flex;
        align-items: center;
    }

    .invite-text {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .invite-name {
        font-size: 15px;
        color: #111;
    }

    .invite-meta {
        font-size: 12px;
        color: #8f9499;
    }

    .invite-empty,
    .invite-loading {
        text-align: center;
        color: #9ea3a9;
        font-size: 13px;
        padding: 32px 0;
    }

    .invite-loadmore {
        margin: 10px auto 24px;
        cursor: pointer;
    }

    /* 编辑群信息弹窗 */
    .edit-dialog {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        max-height: 80vh;
        background: #ffffff;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -12px 32px rgba(16, 30, 54, 0.12);
        transform: translateY(100%);
        transition: transform 0.25s ease;
        display: flex;
        flex-direction: column;
        z-index: 2001;
    }

    .edit-dialog.show {
        transform: translateY(0);
    }

    .edit-dialog__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px 12px;
        border-bottom: 1px solid #f0f1f4;
    }

    .edit-dialog__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .edit-dialog__close {
        border: none;
        background: none;
        font-size: 22px;
        line-height: 1;
        color: #999;
        padding: 4px;
    }

    .edit-dialog__body {
        padding: 20px;
        overflow-y: auto;
        flex: 1;
    }

    .edit-dialog__footer {
        padding: 16px 20px 24px;
        display: flex;
        gap: 12px;
        border-top: 1px solid #f0f1f4;
    }

    .edit-dialog__footer .weui-btn {
        flex: 1;
    }
</style>
@endpush

@section('content')
<div class="group-detail-page" id="groupContent">
    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">加载中...</span>
    </div>
</div>

<div class="invite-mask" id="inviteMask"></div>
<div class="invite-dialog" id="inviteDialog" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="invite-dialog__header">
        <div class="invite-dialog__title">邀请成员</div>
        <button type="button" class="invite-dialog__close" onclick="closeInviteDialog()" aria-label="关闭">×</button>
    </div>
    <div class="invite-dialog__body" id="inviteList">
        <div class="invite-loading">加载中...</div>
    </div>
    <div class="invite-dialog__footer">
        <a href="javascript:;" class="weui-btn weui-btn_primary weui-btn_disabled" id="inviteConfirmBtn" onclick="submitInvites()" aria-disabled="true">邀请</a>
    </div>
</div>

<div class="invite-mask" id="editMask"></div>
<div class="edit-dialog" id="editDialog" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="edit-dialog__header">
        <div class="edit-dialog__title">编辑群信息</div>
        <button type="button" class="edit-dialog__close" onclick="closeEditDialog()" aria-label="关闭">×</button>
    </div>
    <div class="edit-dialog__body">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">群名称</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" id="editGroupName" maxlength="50" placeholder="请输入群名称">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">群描述</label></div>
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" id="editGroupDescription" maxlength="500" placeholder="请输入群描述(选填)" rows="3"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="edit-dialog__footer">
        <a href="javascript:;" class="weui-btn weui-btn_primary" id="editConfirmBtn" onclick="submitGroupEdit()">保存</a>
    </div>
</div>
@endsection

@push('scripts')
<script>
const routes = {
    chat: @json(route('chat')),
    qrcode: '/chat/group-qrcode'
};

const loadingHtml = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中...</span></div>';

let groupId = null;
let groupData = null;
let currentUserId = null;
let userRole = null;

const inviteState = {
    keyword: '',
    users: [],
    selected: new Set(),
    page: 1,
    hasMore: false,
    loading: false
};

let inviteSearchTimer = null;
let inviteEventsBound = false;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    groupId = params.get('group_id');

    if (!groupId) {
        utils.toast('群组不存在', { type: 'top' });
        setTimeout(() => history.back(), 1500);
        return;
    }

    const mask = document.getElementById('inviteMask');
    if (mask) {
        mask.addEventListener('click', closeInviteDialog);
    }

    document.getElementById('groupContent').innerHTML = loadingHtml;
    utils.loading('加载中...');

    await loadCurrentUser();
    await loadGroupDetail();

    utils.hideLoading();
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
            console.error('获取用户信息失败:', error);
            utils.toast('无法获取当前用户信息', { type: 'top' });
            return null;
        });
}

async function loadGroupDetail(options = {}) {
    const { showLoading = false } = options;

    if (showLoading) {
        document.getElementById('groupContent').innerHTML = loadingHtml;
    }

    try {
        const response = await axios.get(`/wechat/chat/groups/${groupId}`);
        if (response.data.code !== 200) {
            throw new Error(response.data.message || '加载失败');
        }

        groupData = response.data.data;
        findUserRole();
        renderGroupDetail();
    } catch (error) {
        console.error('加载群组信息失败:', error);
        showError(error.response?.data?.message || error.message || '加载失败，请重试');
    }
}

function findUserRole() {
    userRole = null;
    if (!groupData || !Array.isArray(groupData.members) || !currentUserId) {
        return;
    }

    const member = groupData.members.find(item => item.user_id === currentUserId);
    if (member) {
        userRole = member.role;
    }
}

function renderGroupDetail() {
    if (!groupData) {
        return;
    }

    const groupName = escapeHtml(groupData.name);
    const groupDescription = groupData.description ? `<div class="group-card__desc">${escapeHtml(groupData.description)}</div>` : '';
    const memberCount = groupData.member_count ?? (Array.isArray(groupData.members) ? groupData.members.length : 0);

    const isOwner = groupData.owner_id === currentUserId;
    const isAdmin = isOwner || userRole >= 1;  // 管理员(1)和群主(2)都有权限

    const membersHtml = (groupData.members || [])
        .sort((a, b) => {
            // 群主排第一，管理员第二，普通成员第三
            if (a.role !== b.role) return b.role - a.role;
            return 0;
        })
        .map(member => {
            const user = member.user || {};
            const name = escapeHtml(user.real_name || user.nickname || '成员');
            const avatar = escapeHtml(user.avatar_url || '/default-avatar.png');
            const roleLabel = member.role === 2 ? '群主' : (member.role === 1 ? '管理员' : '');
            const memberId = member.user_id;
            const isCurrentUser = memberId === currentUserId;
            const isMemberOwner = member.role === 2;

            // 管理员/群主可以删除普通成员，群主可以删除管理员，不能删除自己和群主
            let canRemove = false;
            if (isAdmin && !isCurrentUser && !isMemberOwner) {
                if (isOwner) {
                    // 群主可以删除所有人（除了自己）
                    canRemove = true;
                } else if (userRole === 1 && member.role === 0) {
                    // 管理员只能删除普通成员
                    canRemove = true;
                }
            }

            const removeButton = canRemove ? `
                <button type="button" class="group-member-remove" onclick="confirmRemoveMember(${memberId}, '${name.replace(/'/g, "\\'")}')" title="移除">
                    <span>×</span>
                </button>
            ` : '';

            return `
                <div class="group-member-card">
                    <img src="${avatar}" alt="${name}" class="group-member-card__avatar" loading="lazy">
                    <span class="group-member-name">${name}</span>
                    ${roleLabel ? `<span class="group-member-role">${roleLabel}</span>` : ''}
                    ${removeButton}
                </div>
            `;
        }).join('');

    const inviteButtonHtml = isAdmin ? `
        <button type="button" class="group-member-card group-member-card__invite" onclick="openInviteDialog()">
            <span class="group-member-card__plus">＋</span>
            <span class="group-member-name">邀请</span>
        </button>
    ` : '';

    const ownerName = escapeHtml(groupData.owner?.real_name || groupData.owner?.nickname || '未知');
    const createdAt = groupData.created_at ? utils.formatTime(groupData.created_at) : '—';

    const cardHtml = `
        <div class="group-card">
            <div class="group-card__avatar">
                <img src="${escapeHtml(groupData.avatar || '/default-group-avatar.png')}" alt="${groupName}" loading="lazy">
            </div>
            <div class="group-card__name">${groupName}</div>
            ${groupDescription}
        </div>
    `;

    const membersSection = `
        <div class="group-section">
            <div class="group-section__title">群成员（${memberCount}）</div>
            <div class="group-members-grid">
                ${membersHtml || '<div class="group-member-card"><span class="group-member-name">暂无成员</span></div>'}
                ${inviteButtonHtml}
            </div>
        </div>
    `;

    const infoSection = `
        <div class="group-section">
            <div class="weui-cells group-info-cells">
                <div class="weui-cell">
                    <div class="weui-cell__bd"><p>群名称</p></div>
                    <div class="weui-cell__ft">${groupName}</div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd"><p>群主</p></div>
                    <div class="weui-cell__ft">${ownerName}</div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__bd"><p>创建时间</p></div>
                    <div class="weui-cell__ft">${createdAt}</div>
                </div>
            </div>
        </div>
    `;

    const actionsSection = `
        <div class="group-actions weui-cells weui-cells_access">
            ${isOwner ? `
                <div class="weui-cell weui-cell_access" role="button" onclick="openEditDialog()">
                    <div class="weui-cell__bd"><p>编辑群信息</p></div>
                    <div class="weui-cell__ft"></div>
                </div>
                <div class="weui-cell weui-cell_access group-action-danger" role="button" onclick="confirmDisbandGroup()">
                    <div class="weui-cell__bd"><p>解散群聊</p></div>
                    <div class="weui-cell__ft"></div>
                </div>
            ` : `
                <div class="weui-cell weui-cell_access group-action-danger" role="button" onclick="confirmLeaveGroup()">
                    <div class="weui-cell__bd"><p>退出群聊</p></div>
                    <div class="weui-cell__ft"></div>
                </div>
            `}
        </div>
    `;

    document.getElementById('groupContent').innerHTML = cardHtml + membersSection + infoSection + actionsSection;
}

function confirmLeaveGroup() {
    utils.confirm({
        message: '确定要退出这个群聊吗？',
        onConfirm: () => leaveGroup()
    });
}

function leaveGroup() {
    utils.loading('正在退出...');
    axios.post(`/wechat/chat/groups/${groupId}/leave`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '退出失败');
            }
            utils.toast('已退出群聊');
            setTimeout(() => {
                location.href = routes.chat;
            }, 1000);
        })
        .catch(error => {
            console.error('退出群聊失败:', error);
            utils.toast(error.response?.data?.message || '操作失败，请重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

function confirmDisbandGroup() {
    utils.confirm({
        message: '解散后群聊将被删除，所有成员将无法再访问，确定要解散吗？',
        confirmText: '解散',
        onConfirm: () => disbandGroup()
    });
}

function disbandGroup() {
    utils.loading('正在解散...');
    axios.delete(`/wechat/chat/groups/${groupId}`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '解散失败');
            }
            utils.toast('群聊已解散');
            setTimeout(() => {
                location.href = routes.chat;
            }, 1000);
        })
        .catch(error => {
            console.error('解散群聊失败:', error);
            utils.toast(error.response?.data?.message || '操作失败，请重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

function viewQRCode() {
    location.href = `${routes.qrcode}?group_id=${groupId}`;
}

function showError(message) {
    document.getElementById('groupContent').innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">${escapeHtml(message || '加载失败')}</h2>
                <p class="weui-msg__desc">请检查网络后重新尝试。</p>
            </div>
            <div class="weui-msg__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_primary" onclick="loadGroupDetail({ showLoading: true })">重新加载</a>
            </div>
        </div>
    `;
}

function openInviteDialog() {
    if (!groupData) {
        return;
    }

    inviteState.keyword = '';
    inviteState.users = [];
    inviteState.selected.clear();
    inviteState.page = 1;
    inviteState.hasMore = false;

    const searchInput = document.getElementById('inviteSearchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    if (!inviteEventsBound) {
        setupInviteDialogEvents();
        setupInviteScrollLoad();
        inviteEventsBound = true;
    }

    document.getElementById('inviteMask').classList.add('show');
    const dialog = document.getElementById('inviteDialog');
    dialog.classList.add('show');
    dialog.setAttribute('aria-hidden', 'false');

    loadInviteCandidates();
}

function closeInviteDialog() {
    const mask = document.getElementById('inviteMask');
    const dialog = document.getElementById('inviteDialog');
    mask.classList.remove('show');
    dialog.classList.remove('show');
    dialog.setAttribute('aria-hidden', 'true');
}

function setupInviteDialogEvents() {
    const searchInput = document.getElementById('inviteSearchInput');
    const clearBtn = document.getElementById('inviteSearchClear');

    if (searchInput) {
        searchInput.addEventListener('input', event => {
            inviteState.keyword = event.target.value.trim();
            clearTimeout(inviteSearchTimer);
            inviteSearchTimer = setTimeout(() => {
                // 重置分页状态并重新加载
                inviteState.page = 1;
                inviteState.users = [];
                loadInviteCandidates(1, false);
            }, 300);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', event => {
            event.preventDefault();
            if (searchInput) {
                searchInput.value = '';
            }
            inviteState.keyword = '';
            // 重置分页状态并重新加载
            inviteState.page = 1;
            inviteState.users = [];
            loadInviteCandidates(1, false);
        });
    }
}

function loadInviteCandidates(page = 1, append = false) {
    if (inviteState.loading) {
        return;
    }

    inviteState.loading = true;

    if (!append) {
        document.getElementById('inviteList').innerHTML = '<div class="invite-loading">加载中...</div>';
    } else {
        // 添加加载指示器
        appendInviteLoadingIndicator();
    }

    const params = { page, limit: 50 };  // 改为50人/页
    if (inviteState.keyword) {
        params.search = inviteState.keyword;
    }

    axios.get('/wechat/chat/available-users', { params })
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '获取成员失败');
            }

            const existingIds = new Set((groupData?.members || []).map(item => item.user_id));
            const { users, pagination } = response.data.data;
            const filtered = (users || []).filter(user => !existingIds.has(user.id));

            inviteState.users = append ? inviteState.users.concat(filtered) : filtered;
            inviteState.page = pagination.page;
            inviteState.hasMore = Boolean(pagination.has_more);

            renderInviteList();
        })
        .catch(error => {
            console.error('加载可邀请成员失败:', error);
            document.getElementById('inviteList').innerHTML = `<div class="invite-empty">${escapeHtml(error.response?.data?.message || '加载失败，请稍后重试')}</div>`;
        })
        .finally(() => {
            inviteState.loading = false;
            updateInviteConfirmButton();
        });
}

function renderInviteList() {
    const listEl = document.getElementById('inviteList');

    // 移除旧的加载指示器
    removeInviteLoadingIndicator();

    if (!inviteState.users.length) {
        listEl.innerHTML = '<div class="invite-empty">暂无可邀请成员</div>';
        updateInviteConfirmButton();
        return;
    }

    const itemsHtml = inviteState.users.map(user => {
        const id = Number(user.id);
        const checked = inviteState.selected.has(id) ? 'checked' : '';
        const name = escapeHtml(user.real_name || user.nickname || '成员');
        const avatar = escapeHtml(user.avatar_url || '/default-avatar.png');
        const metaParts = [];
        if (user.department) metaParts.push(user.department);
        if (user.position) metaParts.push(user.position);
        if (!metaParts.length && user.nickname) metaParts.push(`昵称：${escapeHtml(user.nickname)}`);
        const meta = metaParts.join(' · ');

        return `
            <label class="weui-cell weui-cell_active weui-check__label invite-option" data-user-id="${id}">
                <div class="weui-cell__hd invite-option__checkbox">
                    <input type="checkbox" class="weui-check" ${checked}>
                    <span class="weui-icon-checked"></span>
                </div>
                <div class="weui-cell__bd invite-option__body">
                    <img src="${avatar}" alt="${name}" class="invite-avatar" loading="lazy">
                    <div class="invite-text">
                        <span class="invite-name">${name}</span>
                        <span class="invite-meta">${meta}</span>
                    </div>
                </div>
            </label>
        `;
    }).join('');

    listEl.innerHTML = `<div class="weui-cells weui-cells_checkbox">${itemsHtml}</div>`;

    listEl.querySelectorAll('.invite-option').forEach(option => {
        option.addEventListener('click', event => {
            event.preventDefault();
            const userId = Number(option.dataset.userId);
            toggleInviteSelection(userId);
        });
    });

    // 显示"已全部加载"提示
    if (!inviteState.hasMore && inviteState.users.length > 0) {
        const noMoreHtml = `
            <div class="weui-loadmore weui-loadmore_line invite-no-more" style="padding: 12px 0;">
                <span class="weui-loadmore__tips" style="color: #999; font-size: 13px;">已加载全部 (共 ${inviteState.users.length} 人)</span>
            </div>
        `;
        listEl.insertAdjacentHTML('beforeend', noMoreHtml);
    }

    updateInviteConfirmButton();
}

function toggleInviteSelection(userId) {
    if (inviteState.selected.has(userId)) {
        inviteState.selected.delete(userId);
    } else {
        inviteState.selected.add(userId);
    }

    renderInviteList();
}

function updateInviteConfirmButton() {
    const confirmBtn = document.getElementById('inviteConfirmBtn');
    if (!confirmBtn) {
        return;
    }

    const count = inviteState.selected.size;
    confirmBtn.textContent = count > 0 ? `邀请（${count}）` : '邀请';
    const disabled = inviteState.loading || count === 0;
    confirmBtn.classList.toggle('weui-btn_disabled', disabled);
    confirmBtn.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    confirmBtn.disabled = disabled;
}

function submitInvites() {
    if (!inviteState.selected.size) {
        utils.topTips('请选择要邀请的成员');
        return;
    }

    updateInviteConfirmButton();
    utils.loading('邀请中...');

    axios.post(`/wechat/chat/groups/${groupId}/invite`, {
        member_ids: Array.from(inviteState.selected)
    })
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '邀请失败');
            }
            utils.toast(response.data.message || '邀请成功');
            closeInviteDialog();
            loadGroupDetail({ showLoading: true });
        })
        .catch(error => {
            console.error('邀请成员失败:', error);
            utils.toast(error.response?.data?.message || '邀请失败，请稍后重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
            updateInviteConfirmButton();
        });
}

function confirmRemoveMember(memberId, memberName) {
    if (!groupId || !memberId) {
        return;
    }

    utils.confirm({
        message: `确认要将 "${memberName}" 移出群聊吗？`,
        title: '移除成员',
        confirmText: '确定',
        onConfirm: () => {
            removeMember(memberId);
        }
    });
}

function removeMember(memberId) {
    utils.loading('移除中...');

    axios.delete(`/wechat/chat/groups/${groupId}/members/${memberId}`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '移除失败');
            }
            utils.toast(response.data.message || '移除成功');
            loadGroupDetail({ showLoading: true });
        })
        .catch(error => {
            console.error('移除成员失败:', error);
            utils.toast(error.response?.data?.message || '移除失败，请稍后重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

function escapeHtml(str = '') {
    return String(str).replace(/[&<>'"]/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
    }[char] || char));
}

function setupInviteScrollLoad() {
    const listEl = document.getElementById('inviteList');

    listEl.addEventListener('scroll', () => {
        if (inviteState.loading || !inviteState.hasMore) return;

        const scrollTop = listEl.scrollTop;
        const scrollHeight = listEl.scrollHeight;
        const clientHeight = listEl.clientHeight;

        // 当滚动到距离底部 100px 时开始加载
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadInviteCandidates(inviteState.page + 1, true);
        }
    });
}

function appendInviteLoadingIndicator() {
    const listEl = document.getElementById('inviteList');
    const existingLoading = listEl.querySelector('.invite-load-more');

    if (!existingLoading) {
        const loadMoreHtml = `
            <div class="weui-loadmore invite-load-more" style="padding: 12px 0;">
                <i class="weui-loading"></i>
                <span class="weui-loadmore__tips">加载更多...</span>
            </div>
        `;
        listEl.insertAdjacentHTML('beforeend', loadMoreHtml);
    }
}

function removeInviteLoadingIndicator() {
    const listEl = document.getElementById('inviteList');
    const indicators = listEl.querySelectorAll('.invite-load-more, .invite-no-more');
    indicators.forEach(el => el.remove());
}

// ========== 编辑群信息功能 ==========
function openEditDialog() {
    if (!groupData) {
        return;
    }

    // 填充当前值
    document.getElementById('editGroupName').value = groupData.name || '';
    document.getElementById('editGroupDescription').value = groupData.description || '';

    // 显示弹窗
    const editMask = document.getElementById('editMask');
    const editDialog = document.getElementById('editDialog');

    if (editMask) {
        editMask.classList.add('show');
        editMask.onclick = closeEditDialog;
    }

    if (editDialog) {
        editDialog.classList.add('show');
        editDialog.setAttribute('aria-hidden', 'false');
    }
}

function closeEditDialog() {
    const editMask = document.getElementById('editMask');
    const editDialog = document.getElementById('editDialog');

    if (editMask) {
        editMask.classList.remove('show');
        editMask.onclick = null;
    }

    if (editDialog) {
        editDialog.classList.remove('show');
        editDialog.setAttribute('aria-hidden', 'true');
    }
}

function submitGroupEdit() {
    const name = document.getElementById('editGroupName').value.trim();
    const description = document.getElementById('editGroupDescription').value.trim();

    if (!name) {
        utils.topTips('请输入群名称');
        return;
    }

    if (name.length > 50) {
        utils.topTips('群名称不能超过50个字符');
        return;
    }

    if (description.length > 500) {
        utils.topTips('群描述不能超过500个字符');
        return;
    }

    // 检查是否有修改
    if (name === groupData.name && description === (groupData.description || '')) {
        utils.topTips('没有任何修改');
        return;
    }

    utils.loading('保存中...');

    const updateData = {
        name: name
    };

    // 只有描述有变化时才传
    if (description !== (groupData.description || '')) {
        updateData.description = description;
    }

    axios.put(`/wechat/chat/groups/${groupId}`, updateData)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '更新失败');
            }
            utils.toast('更新成功');
            closeEditDialog();
            // 刷新群信息
            loadGroupDetail({ showLoading: true });
        })
        .catch(error => {
            console.error('更新群信息失败:', error);
            utils.toast(error.response?.data?.message || '更新失败,请稍后重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}
</script>
@endpush
