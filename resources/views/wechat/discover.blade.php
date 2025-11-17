@extends('wechat.layouts.app')

@section('title', '发现')
@section('navbar-title', '发现')

@push('styles')
<style>
    .discover-section {
        margin-top: 12px;
        background-color: #fff;
        border-radius: 12px;
        overflow: hidden;
    }

    .discover-section .weui-cell {
        padding: 16px;
        align-items: center;
    }

    .discover-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        margin-right: 12px;
    }

    .discover-icon svg {
        width: 24px;
        height: 24px;
        fill: #fff;
    }

    .discover-icon.blue {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .discover-icon.green {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }

    .discover-icon.orange {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }

    .discover-icon.purple {
        background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    }

    .discover-title {
        font-size: 16px;
        color: #111;
        margin-bottom: 4px;
    }

    .discover-desc {
        font-size: 13px;
        color: #999;
    }

    .discover-badge {
        display: inline-block;
        background-color: #ff4d4f;
        color: #fff;
        font-size: 10px;
        padding: 2px 6px;
        border-radius: 10px;
        margin-left: 8px;
    }
</style>
@endpush

@section('content')
<!-- 学习资源 -->
<div class="weui-cells weui-cells_access discover-section">
    <a class="weui-cell weui-cell_access" href="/materials" id="materialsLink">
        <div class="weui-cell__hd">
            <span class="discover-icon blue" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z"/>
                </svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p class="discover-title">教会资料</p>
            <p class="discover-desc">查看教会相关资料</p>
        </div>
    </a>
</div>

<!-- 直播互动 -->
<div class="weui-cells weui-cells_access discover-section">
    <a class="weui-cell weui-cell_access" href="/wechat/live" id="liveLink">
        <div class="weui-cell__hd">
            <span class="discover-icon green" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M3 2.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5M1 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm9.534 4.172a1 1 0 0 1 0 1.656L7.56 10.841A1 1 0 0 1 6 10.012V5.988a1 1 0 0 1 1.56-.829z" clip-rule="evenodd"/></svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p class="discover-title">在线会议室</p>
            <p class="discover-desc">参加在线会议</p>
        </div>
    </a>
</div>


<!-- 颂主圣诗 -->
<div class="weui-cells weui-cells_access discover-section">
    <a class="weui-cell weui-cell_access" href="{{ route('wechat.songs.349.index') }}" id="songs349Link">
        <div class="weui-cell__hd">
            <span class="discover-icon orange" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z"/>
                </svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p class="discover-title">颂主圣诗（349首）</p>
            <p class="discover-desc">新版349首圣诗歌曲</p>
        </div>
    </a>
    <a class="weui-cell weui-cell_access" href="{{ route('wechat.songs.870.index') }}" id="songs870Link">
        <div class="weui-cell__hd">
            <span class="discover-icon purple" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17C6 19.21 7.79 21 10 21C12.21 21 14 19.21 14 17V7H18V3H12Z"/>
                </svg>
            </span>
        </div>
        <div class="weui-cell__bd">
            <p class="discover-title">颂主圣诗（870首）</p>
            <p class="discover-desc">完整870首圣诗歌曲</p>
        </div>
    </a>
</div>
@endsection

@push('scripts')
<script>
// 检查用户权限,如果没有权限则隐藏对应菜单
function checkPermissions() {
    axios.get('/wechat/user')
        .then(response => {
            if (response.data.code === 200) {
                const user = response.data.data;
                // 这里可以根据用户权限动态显示/隐藏功能
                // 暂时保留,后续如果需要权限控制可以在这里实现
            }
        })
        .catch(() => {
            // 获取用户信息失败,不影响页面显示
        });
}

document.addEventListener('DOMContentLoaded', function() {
    checkPermissions();
});
</script>
@endpush
