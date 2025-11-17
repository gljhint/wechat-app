@extends('wechat.layouts.app')

@section('title', '直播')
@section('navbar-title', '直播会场')

@push('styles')
<style>
    .live-index-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding-bottom: 90px;
    }

    .live-hero {
        padding: 20px 16px 16px;
        background: linear-gradient(135deg, #4c6ef5 0%, #5a8dee 100%);
        color: #fff;
        border-radius: 0 0 28px 28px;
        box-shadow: 0 12px 40px rgba(76, 110, 245, 0.26);
        margin-bottom: 16px;
    }

    .live-hero__stats {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 12px 0;
    }

    .live-hero__stat {
        text-align: center;
        font-size: 13px;
        opacity: 0.92;
    }

    .live-hero__number {
        display: block;
        font-size: 28px;
        font-weight: 700;
        color: #fff;
    }

    .live-categories {
        padding: 0 16px 12px;
    }

    .live-categories__list {
        display: flex;
        gap: 10px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .live-category-chip {
        flex-shrink: 0;
        padding: 7px 16px;
        border-radius: 999px;
        background: #eef1fb;
        color: #2f45c5;
        font-size: 13px;
        transition: all 0.2s ease;
    }

    .live-category-chip.active {
        background: #2f45c5;
        color: #fff;
        box-shadow: 0 8px 16px rgba(47, 69, 197, 0.25);
    }

    .live-section {
        margin: 0 16px 16px;
    }

    .live-section__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 10px;
    }

    .live-section__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .live-grid {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .live-card {
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 10px 28px rgba(16, 30, 54, 0.08);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .live-card__cover {
        position: relative;
        width: 100%;
        padding-top: 40%;
        background: #e7eaf3;
    }

    .live-card__cover img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .live-card__badge {
        position: absolute;
        top: 8px;
        left: 8px;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        background: rgba(250, 82, 82, 0.92);
    }

    .live-card__badge--scheduled {
        background: rgba(33, 150, 243, 0.92);
    }

    .live-card__badge--idle {
        background: rgba(158, 163, 169, 0.92);
    }

    .live-card__viewers {
        position: absolute;
        bottom: 12px;
        right: 12px;
        padding: 4px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.65);
        color: #fff;
        font-size: 12px;
        font-weight: 600;
        display: none; /* 默认隐藏,有人才显示 */
    }

    .live-card__viewers.show {
        display: block;
    }

    .live-card__info {
        padding: 20px;
    }

    .live-card__title {
        font-size: 20px;
        font-weight: 700;
        color: #111;
        margin-bottom: 10px;
        line-height: 1.4;
    }

    .live-card__meta {
        font-size: 15px;
        color: #8f9499;
    }
    .live-empty {
        padding: 48px 16px;
        text-align: center;
        color: #9ea3a9;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(16, 30, 54, 0.06);
    }

    .create-live-fab {
        position: fixed;
        right: 20px;
        bottom: 90px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #07c160 0%, #04a652 100%);
        color: #fff;
        font-size: 24px;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 12px 32px rgba(7, 193, 96, 0.25);
        z-index: 1600;
    }

    .create-live-fab.show {
        display: flex;
    }
</style>
@endpush

@section('content')
<div class="live-index-page">

    <section class="live-section">
        <div class="live-section__header">
            <h3 class="live-section__title">会议室</h3>
        </div>
        <div class="live-grid">
            @foreach($allRooms as $room)
                <article class="live-card" data-room-id="{{ $room->id }}" onclick="openLive({{ $room->id }})">
                    <div class="live-card__cover">
                        <img src="{{ $room->cover_image?'/storage/'.$room->cover_image:'/images/meetings-banner.webp' }}" alt="{{ $room->title }}" loading="lazy">
                        <span class="live-card__badge live-card__badge--idle" data-status-badge>空闲</span>
                        <span class="live-card__viewers" data-viewer-count>
                            👥 <span data-count>0</span>
                        </span>
                    </div>
                    <div class="live-card__info">
                        <h4 class="live-card__title">{{ $room->title }}</h4>
                        <div class="live-card__meta">
                            <span data-meta-text>等待开播</span>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>
    </section>

</div>
@endsection

@push('scripts')
<script>
const routes = {
    show: '/wechat/live',
    allStats: '/wechat/live/api/all-stats'
};

let updateInterval = null;

// 打开直播间
function openLive(id) {
    location.href = `${routes.show}/${id}`;
}

// 更新房间状态
function updateRoomStatus(roomId, status, viewerCount) {
    const card = document.querySelector(`[data-room-id="${roomId}"]`);
    if (!card) return;

    const badge = card.querySelector('[data-status-badge]');
    const viewerEl = card.querySelector('[data-viewer-count]');
    const countEl = card.querySelector('[data-count]');
    const metaText = card.querySelector('[data-meta-text]');

    const isLive = status === 'live' && viewerCount > 0;

    // 更新徽章
    if (badge) {
        badge.textContent = isLive ? '🔴 直播中' : '空闲';
        badge.className = 'live-card__badge ' + (isLive ? '' : 'live-card__badge--idle');
    }

    // 更新人数显示
    if (viewerEl && countEl) {
        countEl.textContent = viewerCount;
        if (isLive) {
            viewerEl.classList.add('show');
        } else {
            viewerEl.classList.remove('show');
        }
    }

    // 更新底部文字
    if (metaText) {
        metaText.textContent = isLive ? '点击进入' : '等待开播';
    }
}

// 获取所有房间状态
async function fetchAllStats() {
    try {
        const response = await fetch(routes.allStats);
        const result = await response.json();

        if (result.code === 200 && result.data) {
            result.data.forEach(room => {
                updateRoomStatus(room.id, room.status, room.viewer_count);
            });
        }
    } catch (error) {
        console.error('获取直播状态失败:', error);
    }
}

// 页面加载时立即获取一次
document.addEventListener('DOMContentLoaded', () => {
    fetchAllStats();

    // 每10秒自动刷新状态
    updateInterval = setInterval(fetchAllStats, 10000);
});

// 页面卸载时清除定时器
window.addEventListener('beforeunload', () => {
    if (updateInterval) {
        clearInterval(updateInterval);
    }
});
</script>
@endpush
