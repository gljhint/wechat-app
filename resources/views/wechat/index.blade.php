@extends('wechat.layouts.app')

@section('title', '微信应用首页')
@section('navbar-title', '功能总览')

@push('styles')
<style>
    .home-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding-bottom: 96px;
    }

    .home-hero {
        margin: 16px;
        padding: 20px;
        border-radius: 20px;
        background: linear-gradient(135deg, #4c6ef5 0%, #5a8dee 100%);
        color: #fff;
        box-shadow: 0 16px 40px rgba(76, 110, 245, 0.25);
    }

    .home-hero__title {
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .home-hero__subtitle {
        font-size: 13px;
        opacity: 0.85;
    }

    .home-hero__stats {
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
    }

    .home-hero__stat {
        flex: 1;
        text-align: center;
    }

    .home-hero__number {
        display: block;
        font-size: 24px;
        font-weight: 700;
    }

    .home-hero__label {
        font-size: 12px;
        opacity: 0.82;
    }

    .home-quick-actions {
        margin: 16px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 12px;
    }

    .home-card {
        background: #fff;
        border-radius: 16px;
        padding: 16px;
        box-shadow: 0 10px 26px rgba(16, 30, 54, 0.06);
        display: flex;
        flex-direction: column;
        gap: 10px;
        cursor: pointer;
        transition: transform 0.15s ease;
    }

    .home-card:active {
        transform: scale(0.98);
    }

    .home-card__icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: #f0f4ff;
        color: #365df8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
    }

    .home-card__title {
        font-size: 15px;
        font-weight: 600;
        color: #111;
    }

    .home-card__desc {
        font-size: 12px;
        color: #8f9499;
        line-height: 1.6;
    }

    .home-news {
        margin: 0 16px 16px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 12px 34px rgba(16, 30, 54, 0.08);
        overflow: hidden;
    }

    .home-news__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 20px 10px;
    }

    .home-news__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
    }

    .home-news__more {
        font-size: 12px;
        color: #576b95;
    }

    .home-news__list {
        padding: 0 20px 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    .home-news__item {
        display: flex;
        gap: 12px;
        align-items: center;
    }

    .home-news__thumb {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        background: #f0f3ff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .home-news__content {
        flex: 1;
    }

    .home-news__heading {
        font-size: 14px;
        font-weight: 600;
        color: #111;
        margin-bottom: 4px;
    }

    .home-news__desc {
        font-size: 12px;
        color: #8f9499;
        line-height: 1.6;
    }
</style>
@endpush

@section('content')
<div class="home-page">
    <section class="home-hero">
        <div class="home-hero__title">欢迎回来 👋</div>
        <p class="home-hero__subtitle">快速预览当前状态并跳转到常用功能。</p>
        <div class="home-hero__stats">
            <div class="home-hero__stat">
                <span class="home-hero__number">{{ $liveStreamsCount ?? 3 }}</span>
                <span class="home-hero__label">直播进行中</span>
            </div>
            <div class="home-hero__stat">
                <span class="home-hero__number">{{ $materialCount ?? 24 }}</span>
                <span class="home-hero__label">知识资料</span>
            </div>
            <div class="home-hero__stat">
                <span class="home-hero__number">{{ $taskCompletion ?? '96%' }}</span>
                <span class="home-hero__label">学习完成率</span>
            </div>
        </div>
    </section>

    <section class="home-quick-actions">
        <div class="home-card" onclick="navigateTo('{{ route('list') }}')">
            <span class="home-card__icon">📋</span>
            <span class="home-card__title">列表展示</span>
            <span class="home-card__desc">查看通用列表组件与媒体样式示例。</span>
        </div>
        <div class="home-card" onclick="navigateTo('{{ route('form') }}')">
            <span class="home-card__icon">📝</span>
            <span class="home-card__title">表单组件</span>
            <span class="home-card__desc">体验输入、选择、校验等表单交互。</span>
        </div>
        <div class="home-card" onclick="navigateTo('{{ route('profile') }}')">
            <span class="home-card__icon">👤</span>
            <span class="home-card__title">个人中心</span>
            <span class="home-card__desc">查看个人资料、统计及操作入口。</span>
        </div>
        <div class="home-card" onclick="handleQuickAction('toast')">
            <span class="home-card__icon">🔔</span>
            <span class="home-card__title">消息提示</span>
            <span class="home-card__desc">使用 WeUI 提示组件展示通知或提醒。</span>
        </div>
        <div class="home-card" onclick="handleQuickAction('dialog')">
            <span class="home-card__icon">💬</span>
            <span class="home-card__title">确认对话</span>
            <span class="home-card__desc">调起模态对话框进行二次确认。</span>
        </div>
        <div class="home-card" onclick="handleQuickAction('actions')">
            <span class="home-card__icon">⚙️</span>
            <span class="home-card__title">操作菜单</span>
            <span class="home-card__desc">展示操作菜单或底部弹出列表。</span>
        </div>
    </section>

    <section class="home-news">
        <div class="home-news__header">
            <h3 class="home-news__title">最新动态</h3>
            <span class="home-news__more" onclick="handleQuickAction('more')">查看更多</span>
        </div>
        <div class="home-news__list">
            <article class="home-news__item" onclick="handleQuickAction('update')">
                <span class="home-news__thumb">🚀</span>
                <div class="home-news__content">
                    <h4 class="home-news__heading">应用更新</h4>
                    <p class="home-news__desc">新增直播、资料、群聊等模块的 WeUI 适配，体验更一致。</p>
                </div>
            </article>
            <article class="home-news__item" onclick="handleQuickAction('notice')">
                <span class="home-news__thumb">🛠</span>
                <div class="home-news__content">
                    <h4 class="home-news__heading">系统维护</h4>
                    <p class="home-news__desc">今晚 22:00 - 23:30 进行系统维护，届时可能短暂影响访问。</p>
                </div>
            </article>
        </div>
    </section>
</div>
@endsection

@push('scripts')
<script>
const actions = {
    toast() {
        utils.toast('这是一条示例通知', { duration: 2000, type: 'text' });
    },
    dialog() {
        utils.confirm({
            message: '确定要执行这个操作吗？',
            onConfirm: () => utils.toast('已确认操作'),
            onCancel: () => utils.topTips('已取消')
        });
    },
    actions() {
        utils.actionSheet([
            { label: '示例菜单 1', onClick: () => utils.toast('选择了菜单 1') },
            { label: '示例菜单 2', onClick: () => utils.toast('选择了菜单 2') }
        ]);
    },
    more() {
        utils.toast('更多内容开发中');
    },
    update() {
        utils.toast('应用更新详情请联系管理员');
    },
    notice() {
        utils.alert({ message: '维护期间如遇问题，请稍后再试。' });
    }
};

function navigateTo(url) {
    if (!url) {
        utils.toast('功能开发中');
        return;
    }
    window.location.href = url;
}

function handleQuickAction(type) {
    const handler = actions[type];
    if (typeof handler === 'function') {
        handler();
    }
}
</script>
@endpush
