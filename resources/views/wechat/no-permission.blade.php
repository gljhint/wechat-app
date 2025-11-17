@extends('wechat.layouts.app')

@php($hideTabbar = true)
@php($showBack = false)

@section('title', '无权限访问')
@section('navbar-title', '无权限访问')

@push('styles')
<style>
    .no-permission-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 20px;
        background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
    }

    .no-permission-card {
        width: 100%;
        max-width: 340px;
        background: #fff;
        border-radius: 24px;
        padding: 40px 24px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        text-align: center;
    }

    .no-permission-card__icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 48px;
        margin: 0 auto 24px;
        box-shadow: 0 8px 20px rgba(255, 152, 0, 0.3);
    }

    .no-permission-card__title {
        font-size: 24px;
        font-weight: 600;
        color: #212529;
        margin-bottom: 12px;
    }

    .no-permission-card__message {
        font-size: 15px;
        color: #6c757d;
        line-height: 1.6;
        margin-bottom: 24px;
    }

    .no-permission-card__info {
        background: #f8f9fa;
        border-radius: 16px;
        padding: 20px;
        margin: 24px 0;
        text-align: left;
    }

    .no-permission-card__info-title {
        font-size: 14px;
        font-weight: 600;
        color: #495057;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
    }

    .no-permission-card__info-title::before {
        content: "ℹ️";
        margin-right: 8px;
        font-size: 16px;
    }

    .no-permission-card__info-list {
        font-size: 13px;
        color: #6c757d;
        line-height: 1.8;
        margin: 0;
        padding-left: 24px;
    }

    .no-permission-card__info-list li {
        margin-bottom: 8px;
    }

    .no-permission-card__contact {
        background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
        border-radius: 16px;
        padding: 16px;
        font-size: 13px;
        color: #495057;
        margin-top: 20px;
    }

    .no-permission-card__contact strong {
        display: block;
        font-size: 14px;
        margin-bottom: 8px;
        color: #212529;
    }

    .no-permission-card__button {
        margin-top: 24px;
        border-radius: 20px;
        padding: 14px 32px;
    }
</style>
@endpush

@section('content')
<div class="no-permission-page">
    <div class="no-permission-card">
        <div class="no-permission-card__icon">🚫</div>
        <h1 class="no-permission-card__title">访问受限</h1>

        @if(session('error'))
            <!-- 特定权限错误 -->
            <p class="no-permission-card__message">
                {{ session('error') }}
            </p>

            <div class="no-permission-card__info">
                <div class="no-permission-card__info-title">为什么看到这个页面？</div>
                <ul class="no-permission-card__info-list">
                    <li>您的账号已有角色，但该角色没有访问此功能的权限</li>
                    <li>不同角色拥有不同的功能权限</li>
                    <li>这是为了确保系统安全和数据保护</li>
                </ul>
            </div>

            <div class="no-permission-card__info">
                <div class="no-permission-card__info-title">我该怎么做？</div>
                <ul class="no-permission-card__info-list">
                    <li><strong>确认需求</strong> - 确认您是否真的需要此功能权限</li>
                    <li><strong>联系管理员</strong> - 请通过企业内部渠道联系管理员</li>
                    <li><strong>等待授权</strong> - 管理员会在后台为您的角色分配相应权限</li>
                </ul>
            </div>
        @else
            <!-- 未分配角色 -->
            <p class="no-permission-card__message">
                您的账号尚未分配访问角色，暂时无法使用系统功能。
            </p>

            <div class="no-permission-card__info">
                <div class="no-permission-card__info-title">为什么看到这个页面？</div>
                <ul class="no-permission-card__info-list">
                    <li>您的账号已成功登录，但还未被管理员分配角色</li>
                    <li>所有用户必须由管理员分配角色后才能访问系统</li>
                    <li>这是为了确保系统安全和数据保护</li>
                </ul>
            </div>

            <div class="no-permission-card__info">
                <div class="no-permission-card__info-title">我该怎么做？</div>
                <ul class="no-permission-card__info-list">
                    <li><strong>不能自行申请角色</strong> - 系统不支持自助申请功能</li>
                    <li><strong>联系管理员</strong> - 请通过企业内部渠道联系管理员</li>
                    <li><strong>等待分配</strong> - 管理员会在后台为您分配合适的角色</li>
                </ul>
            </div>
        @endif

        <div class="no-permission-card__contact">
            <strong>💡 温馨提示</strong>
            请联系系统管理员，以便管理员为您分配角色或权限。
        </div>

        <button class="weui-btn weui-btn_default no-permission-card__button" onclick="/">
            刷新页面
        </button>
    </div>
</div>
@endsection

@push('scripts')
<script>
// 每30秒自动刷新检查权限
setTimeout(function() {
    console.log('自动检查权限...');
    location.reload();
}, 30000);
</script>
@endpush
