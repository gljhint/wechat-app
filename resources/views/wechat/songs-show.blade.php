@extends('wechat.layouts.app')

@section('title', $songNumber . ' ' . $song['title'])

@section('content')
<div class="song-detail-container">
    <div class="song-detail-header">
        <a href="{{ route('wechat.songs.' . $version . '.index') }}" class="back-link">
            <i class="back-icon">←</i>
        </a>
        <h1>{{ $songNumber }} {{ $song['title'] }}</h1>
    </div>

    <div class="song-content">
        <div class="song-images">
            @if(is_array($song['image']))
                @foreach($song['image'] as $index => $image)
                <div class="image-wrapper" data-index="{{ $index }}">
                    <img src="{{ $baseUrl . $image }}"
                         alt="{{ $song['title'] }}"
                         class="song-image"
                         data-src="{{ $baseUrl . $image }}">
                    @if(count($song['image']) > 1)
                    <div class="image-indicator">{{ $index + 1 }}/{{ count($song['image']) }}</div>
                    @endif
                </div>
                @endforeach
            @else
            <div class="image-wrapper">
                <img src="{{ $baseUrl . $song['image'] }}"
                     alt="{{ $song['title'] }}"
                     class="song-image"
                     data-src="{{ $baseUrl . $song['image'] }}">
            </div>
            @endif
        </div>

        @if(isset($song['mp3']) && !empty($song['mp3']))
        <div class="audio-section">
            <div class="audio-header">
                <i class="audio-icon">🎵</i>
                <span>音频播放</span>
            </div>
            <div class="audio-player">
                <audio id="audioPlayer" controls preload="metadata">
                    <source src="{{ $baseUrl . $song['mp3'] }}" type="audio/mpeg">
                    您的浏览器不支持音频播放。
                </audio>
            </div>
        </div>
        @endif
    </div>
</div>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.song-detail-container {
    min-height: 100vh;
    background-color: #f8f4e8;
    padding-bottom: 60px;
}

.song-detail-header {
    background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
    color: #fff8e7;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.back-link {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff8e7;
    text-decoration: none;
    font-size: 24px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s;
}

.back-link:active {
    background-color: rgba(255, 255, 255, 0.1);
}

.song-detail-header h1 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.4;
    padding: 0 50px;
}

.song-content {
    padding: 15px;
}

.song-meta {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e8d9c5;
}

.meta-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}

.meta-item:not(:last-child) {
    border-bottom: 1px solid #f8f4e8;
}

.meta-label {
    color: #8b4513;
    font-weight: 500;
    font-size: 14px;
}

.meta-value {
    color: #4a4a4a;
    font-size: 16px;
}

.song-images {
    margin-bottom: 15px;
}

.image-wrapper {
    position: relative;
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 1px solid #e8d9c5;
}

.song-image {
    width: 100%;
    height: auto;
    display: block;
    cursor: pointer;
    transition: transform 0.3s;
}

.song-image:active {
    transform: scale(0.98);
}

.image-indicator {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(139, 69, 19, 0.8);
    color: #fff8e7;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.audio-section {
    background: #fff;
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e8d9c5;
}

.audio-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    color: #8b4513;
    font-weight: 500;
    font-size: 16px;
}

.audio-icon {
    font-style: normal;
    font-size: 20px;
}

.audio-player {
    width: 100%;
}

.audio-player audio {
    width: 100%;
    height: 45px;
    outline: none;
    border-radius: 25px;
}

.song-tips {
    background: linear-gradient(135deg, #fff8e7 0%, #f8f4e8 100%);
    border-radius: 12px;
    padding: 12px 15px;
    text-align: center;
    color: #8b4513;
    font-size: 14px;
    border: 1px solid #e8d9c5;
}

/* Loading状态 */
.song-image[data-loading="true"] {
    opacity: 0.5;
}

@media (max-width: 375px) {
    .song-detail-header h1 {
        font-size: 16px;
    }
}

@media (min-width: 768px) {
    .song-detail-container {
        max-width: 800px;
        margin: 0 auto;
    }
}
</style>

<script src="//res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 微信JS-SDK配置
    wx.config({
        debug: false,
        appId: '{{ $wxConfig["appId"] }}',
        timestamp: '{{ $wxConfig["timestamp"] }}',
        nonceStr: '{{ $wxConfig["nonceStr"] }}',
        signature: '{{ $wxConfig["signature"] }}',
        jsApiList: ['previewImage']
    });

    wx.ready(function() {
        // 收集所有图片URL
        const imageUrls = [];
        document.querySelectorAll('.song-image').forEach(img => {
            imageUrls.push(img.dataset.src);
        });

        // 为每张图片添加点击事件
        document.querySelectorAll('.song-image').forEach((img, index) => {
            img.addEventListener('click', function() {
                wx.previewImage({
                    current: imageUrls[index],
                    urls: imageUrls
                });
            });
        });
    });

    wx.error(function(res) {
        console.error('微信JS-SDK配置失败:', res);
        // 降级处理：使用普通的图片查看
        document.querySelectorAll('.song-image').forEach((img) => {
            img.addEventListener('click', function() {
                // 可以实现一个简单的图片预览功能
                alert('图片预览功能需要微信环境支持');
            });
        });
    });

    // 音频播放状态管理
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.addEventListener('play', function() {
            console.log('开始播放');
        });

        audioPlayer.addEventListener('pause', function() {
            console.log('暂停播放');
        });

        audioPlayer.addEventListener('ended', function() {
            console.log('播放结束');
        });
    }
});
</script>
@endsection
