@extends('wechat.layouts.app')

@section('title', '群二维码')
@section('navbar-title', '群二维码')

@push('styles')
<style>
    .qrcode-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding: 24px 16px 96px;
    }

    .qrcode-card {
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 12px 32px rgba(16, 30, 54, 0.08);
        padding: 28px 20px;
        text-align: center;
        margin-bottom: 20px;
    }

    .qrcode-card__avatar {
        width: 96px;
        height: 96px;
        border-radius: 24px;
        overflow: hidden;
        margin: 0 auto 16px;
        background: #e6e8ef;
    }

    .qrcode-card__avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .qrcode-card__name {
        font-size: 20px;
        font-weight: 600;
        color: #111;
        margin-bottom: 4px;
    }

    .qrcode-card__meta {
        font-size: 13px;
        color: #8f9499;
        margin-bottom: 16px;
    }

    .qrcode-image-box {
        padding: 18px;
        border-radius: 16px;
        background: #f5f7fa;
        margin-bottom: 12px;
    }

    .qrcode-image {
        width: 240px;
        height: 240px;
        background: #fff;
        border-radius: 12px;
        border: 1px solid #e3e6ed;
    }

    .qrcode-tip {
        font-size: 13px;
        color: #666;
        margin-top: 8px;
    }

    .qrcode-actions {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .qrcode-actions .weui-btn {
        width: 100%;
    }

    .qrcode-placeholder {
        padding: 60px 20px;
        color: #9ea3a9;
        background: #f5f7fa;
        border-radius: 16px;
    }

    .qrcode-placeholder__icon {
        font-size: 48px;
        margin-bottom: 12px;
        display: block;
    }
</style>
@endpush

@section('content')
<div class="qrcode-page" id="qrcodeContent">
    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">加载中...</span>
    </div>
</div>
@endsection

@push('scripts')
<script>
const loadingHtml = '<div class="weui-loadmore"><i class="weui-loading"></i><span class="weui-loadmore__tips">加载中...</span></div>';

let groupId = null;
let groupData = null;
let isAdmin = false;

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    groupId = params.get('group_id');

    if (!groupId) {
        utils.toast('群组不存在', { type: 'top' });
        setTimeout(() => history.back(), 1500);
        return;
    }

    document.getElementById('qrcodeContent').innerHTML = loadingHtml;
    utils.loading('加载中...');

    try {
        await loadGroupData();
        await determinePermission();
        renderQRCode();
    } catch (error) {
        console.error('初始化二维码失败:', error);
        showError(error.message || '加载失败，请重试');
    } finally {
        utils.hideLoading();
    }
});

function loadGroupData() {
    return axios.get(`/wechat/chat/groups/${groupId}`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '加载失败');
            }
            groupData = response.data.data;
        })
        .catch(error => {
            throw new Error(error.response?.data?.message || '加载失败，请重试');
        });
}

function determinePermission() {
    return axios.get('/wechat/user')
        .then(response => {
            if (response.data.code !== 200) {
                return;
            }
            const userId = response.data.data.id;
            const member = groupData?.members?.find(item => item.user_id === userId);
            isAdmin = Boolean(member && (member.role === 1 || member.role === 2));
        })
        .catch(() => {
            isAdmin = false;
        });
}

function renderQRCode() {
    if (!groupData) {
        return;
    }

    const name = escapeHtml(groupData.name || '群聊');
    const avatar = escapeHtml(groupData.avatar || '/default-group-avatar.png');
    const memberCount = groupData.member_count ?? (groupData.members?.length || 0);
    const qrcodeUrl = groupData.qrcode_url ? escapeHtml(groupData.qrcode_url) : '';

    let html = `
        <div class="qrcode-card">
            <div class="qrcode-card__avatar">
                <img src="${avatar}" alt="${name}" loading="lazy">
            </div>
            <div class="qrcode-card__name">${name}</div>
            <div class="qrcode-card__meta">${memberCount} 人</div>
    `;

    if (qrcodeUrl) {
        html += `
            <div class="qrcode-image-box">
                <img src="${qrcodeUrl}" alt="群二维码" class="qrcode-image" loading="lazy">
                <div class="qrcode-tip">扫描二维码加入群聊</div>
            </div>
        `;
    } else if (isAdmin) {
        html += `
            <div class="qrcode-placeholder">
                <span class="qrcode-placeholder__icon">📱</span>
                <div>还未生成群二维码</div>
                <div style="margin-top: 6px; font-size: 13px;">点击下方按钮即可生成。</div>
            </div>
        `;
    } else {
        html += `
            <div class="qrcode-placeholder">
                <span class="qrcode-placeholder__icon">🔒</span>
                <div>群二维码尚未生成</div>
                <div style="margin-top: 6px; font-size: 13px;">请联系群主或管理员获取。</div>
            </div>
        `;
    }

    html += '</div>';

    const actions = [];

    if (qrcodeUrl) {
        actions.push('<a href="javascript:;" class="weui-btn weui-btn_default" onclick="downloadQRCode()">下载二维码</a>');
    }

    if (isAdmin) {
        actions.push(`<a href="javascript:;" class="weui-btn weui-btn_primary" onclick="generateQRCode()">${qrcodeUrl ? '重新生成' : '生成群二维码'}</a>`);
    }

    if (actions.length) {
        html += `<div class="qrcode-actions">${actions.join('')}</div>`;
    }

    document.getElementById('qrcodeContent').innerHTML = html;
}

function generateQRCode() {
    utils.loading('生成中...');
    axios.post(`/wechat/chat/groups/${groupId}/qrcode`)
        .then(response => {
            if (response.data.code !== 200) {
                throw new Error(response.data.message || '生成失败');
            }
            utils.toast('生成成功');
            groupData.qrcode_url = response.data.data.qrcode_url;
            renderQRCode();
        })
        .catch(error => {
            console.error('生成二维码失败:', error);
            utils.toast(error.response?.data?.message || '生成失败，请稍后重试', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

function downloadQRCode() {
    if (!groupData?.qrcode_url) {
        utils.toast('二维码不存在', { type: 'top' });
        return;
    }

    const link = document.createElement('a');
    link.href = groupData.qrcode_url;
    link.download = `群二维码_${groupData.name || 'group'}.png`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    utils.toast('下载中...', { type: 'text', duration: 1200 });
}

function showError(message) {
    document.getElementById('qrcodeContent').innerHTML = `
        <div class="weui-msg">
            <div class="weui-msg__icon-area">
                <i class="weui-icon-info weui-icon_msg" aria-hidden="true"></i>
            </div>
            <div class="weui-msg__text-area">
                <h2 class="weui-msg__title">${escapeHtml(message || '加载失败')}</h2>
                <p class="weui-msg__desc">请检查网络后重试。</p>
            </div>
            <div class="weui-msg__opr-area">
                <a href="javascript:;" class="weui-btn weui-btn_primary" onclick="reloadQRCode()">重新加载</a>
            </div>
        </div>
    `;
}

function reloadQRCode() {
    document.getElementById('qrcodeContent').innerHTML = loadingHtml;
    utils.loading('加载中...');
    loadGroupData()
        .then(() => determinePermission())
        .then(() => renderQRCode())
        .catch(error => {
            console.error('重新加载失败:', error);
            showError(error.message || '加载失败，请重试');
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
</script>
@endpush
