@extends('wechat.layouts.app')

@section('title', '列表示例')
@section('navbar-title', '列表示例')

@push('styles')
<style>
    .list-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding-bottom: 72px;
    }

    .list-section {
        margin: 16px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 12px 28px rgba(16, 30, 54, 0.08);
        overflow: hidden;
    }

    .list-section__header {
        padding: 18px 20px 10px;
    }

    .list-section__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
        margin: 0;
    }

    .list-section__subtitle {
        font-size: 12px;
        color: #8f9499;
        margin-top: 4px;
    }

    .media-card {
        display: flex;
        gap: 12px;
        padding: 14px 20px;
        border-top: 1px solid #f0f2f6;
    }

    .media-card:first-of-type {
        border-top: none;
    }

    .media-card__thumb {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: #eef1f6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    .media-card__body {
        flex: 1;
    }

    .media-card__title {
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 4px;
        color: #111;
    }

    .media-card__desc {
        font-size: 12px;
        color: #8f9499;
        line-height: 1.6;
    }

    .list-page .weui-cells {
        margin: 0;
        border-radius: 0;
        background: transparent;
    }

    .list-page .weui-cell {
        background: #fff;
    }

    .list-action {
        color: #576b95;
        font-size: 13px;
    }

    .list-page .weui-cells:before,
    .list-page .weui-cells:after {
        display: none;
    }
</style>
@endpush

@section('content')
<div class="list-page">
    <section class="list-section">
        <div class="list-section__header">
            <h2 class="list-section__title">基础列表</h2>
            <p class="list-section__subtitle">WeUI 列表项支持说明文字、附加箭头及图标。</p>
        </div>
        <div class="weui-cells">
            <a class="weui-cell weui-cell_active" role="button" onclick="handleListAction('basic')">
                <div class="weui-cell__bd">
                    <p>基础列表项</p>
                </div>
                <div class="weui-cell__ft">说明文字</div>
            </a>
            <a class="weui-cell weui-cell_access weui-cell_active" role="button" onclick="handleListAction('detail')">
                <div class="weui-cell__bd">
                    <p>带箭头的列表项</p>
                </div>
                <div class="weui-cell__ft list-action">查看详情</div>
            </a>
            <a class="weui-cell weui-cell_access weui-cell_active" role="button" onclick="handleListAction('icon')">
                <div class="weui-cell__hd">
                    <img src="/images/icons/list-icon.svg" alt="icon" style="width: 24px; display: block; margin-right: 12px;">
                </div>
                <div class="weui-cell__bd">
                    <p>带图标的列表项</p>
                </div>
                <div class="weui-cell__ft list-action">查看</div>
            </a>
        </div>
    </section>

    <section class="list-section">
        <div class="list-section__header">
            <h2 class="list-section__title">媒体列表</h2>
            <p class="list-section__subtitle">适合展示图文摘要、提示与状态信息。</p>
        </div>
        <article class="media-card" role="button" onclick="handleListAction('update')">
            <div class="media-card__thumb">🚀</div>
            <div class="media-card__body">
                <h3 class="media-card__title">功能更新</h3>
                <p class="media-card__desc">新增直播、资料模块的 WeUI 化改造，样式与交互更加统一。</p>
            </div>
        </article>
        <article class="media-card" role="button" onclick="handleListAction('notice')">
            <div class="media-card__thumb">🛠</div>
            <div class="media-card__body">
                <h3 class="media-card__title">系统通知</h3>
                <p class="media-card__desc">系统维护时间：本周五 22:00 - 23:30，请提前保存当前工作。</p>
            </div>
        </article>
    </section>

    <section class="list-section">
        <div class="list-section__header">
            <h2 class="list-section__title">表单列表</h2>
            <p class="list-section__subtitle">示例包含输入框、选择器与开关。</p>
        </div>
        <form class="weui-cells weui-cells_form" id="inlineForm">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label" for="inlineName">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" id="inlineName" placeholder="请输入姓名">
                </div>
            </div>
            <div class="weui-cell weui-cell_select weui-cell_select-before">
                <div class="weui-cell__hd">
                    <select class="weui-select" id="inlineCountry">
                        <option value="+86">+86</option>
                        <option value="+1">+1</option>
                        <option value="+852">+852</option>
                    </select>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" id="inlineMobile" placeholder="请输入手机号">
                </div>
            </div>
            <div class="weui-cell weui-cell_switch">
                <div class="weui-cell__bd">接收推送通知</div>
                <div class="weui-cell__ft">
                    <input class="weui-switch" type="checkbox" id="inlineNotify" checked>
                </div>
            </div>
        </form>
    </section>
</div>
@endsection

@push('scripts')
<script>
function handleListAction(type) {
    switch (type) {
        case 'basic':
            utils.toast('这是一个基础列表项示例');
            break;
        case 'detail':
        case 'icon':
        case 'update':
        case 'notice':
            utils.toast('功能开发中，敬请期待');
            break;
        default:
            utils.toast('操作未实现');
    }
}

document.getElementById('inlineForm').addEventListener('submit', event => {
    event.preventDefault();
});
</script>
@endpush
