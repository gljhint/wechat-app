@extends('wechat.layouts.app')

@php($hideTabbar = true)
@php($showBack = false)

@section('title', '登录')
@section('navbar-title', '账户登录')

@push('styles')
<style>
    .login-page {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 32px 20px;
        background: linear-gradient(135deg, #4c6ef5 0%, #775efc 100%);
        color: #fff;
    }

    .login-card {
        width: 100%;
        max-width: 320px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 24px;
        padding: 26px 24px;
        box-shadow: 0 20px 50px rgba(38, 56, 120, 0.24);
        backdrop-filter: blur(18px);
    }

    .login-card__logo {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.16);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 36px;
        margin: 0 auto 16px;
    }

    .login-card__title {
        text-align: center;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 6px;
    }

    .login-card__subtitle {
        text-align: center;
        font-size: 13px;
        opacity: 0.8;
        margin-bottom: 20px;
    }

    .login-card__button {
        width: 100%;
        margin-top: 18px;
        border-radius: 26px;
    }

    .login-card__tips {
        background: rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        padding: 16px 18px;
        margin-top: 24px;
        font-size: 12px;
        line-height: 1.6;
    }
</style>
@endpush

@section('content')
<div class="login-page">
    <div class="login-card">
        <div class="login-card__logo">WX</div>
        <h1 class="login-card__title">企业微信助手</h1>
        <p class="login-card__subtitle">请使用企业微信扫码或手机号登录系统</p>

        <a href="{{ route('wechat.auth.redirect') }}" class="weui-btn weui-btn_primary login-card__button" id="loginBtn">立即登录</a>

        <section class="login-card__tips">
            <strong style="display:block;margin-bottom:6px;">登录说明</strong>
            <ul style="padding-left:18px;margin:0;">
                <li>请确保微信已绑定手机号并具备访问权限。</li>
                <li>系统仅供内部成员使用，未经授权禁止登陆。</li>
                <li>如遇登录问题，请联系管理员获取帮助。</li>
            </ul>
        </section>
    </div>
</div>
@endsection

@push('scripts')
<script>
document.getElementById('loginBtn').addEventListener('click', function() {
    utils.loading('跳转中...');
});
</script>
@endpush
