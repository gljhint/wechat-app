@extends('wechat.layouts.app')

@section('title', $document->title ?? '文档预览')
@section('navbar-title', $document->title ?? '文档预览')

@push('styles')
<style>
    .preview-page {
        padding: 0;
        background-color: #000;
        display: flex;
        flex-direction: column;
    }

    .preview-container {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #000;
    }

    .preview-image {
        max-width: 100%;
        max-height: 100vh;
        object-fit: contain;
    }

    .preview-video,
    .preview-audio {
        width: 100%;
        max-width: 100%;
        outline: none;
    }

    .preview-video {
        max-height: 100vh;
    }

    .preview-audio {
        background-color: #fff;
        border-radius: 8px;
    }

    .preview-pdf {
        width: 100%;
        height: 100vh;
        border: none;
    }

    .preview-text {
        width: 100%;
        height: 100%;
        background-color: #fff;
        color: #333;
        padding: 20px;
        overflow-y: auto;
        white-space: pre-wrap;
        word-wrap: break-word;
        font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.6;
    }

    .preview-unsupported {
        text-align: center;
        padding: 60px 20px;
        color: #fff;
    }

    .preview-unsupported .icon {
        font-size: 64px;
        margin-bottom: 20px;
    }

    .preview-unsupported .title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .preview-unsupported .desc {
        font-size: 14px;
        color: #999;
        margin-bottom: 24px;
    }

    .preview-info {
        background-color: #fff;
        padding: 16px;
        border-top: 1px solid #ededed;
    }

    .info-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        font-size: 14px;
        color: #666;
    }

    .info-item .label {
        color: #999;
    }

    .info-item .value {
        color: #333;
        font-weight: 500;
    }

    .preview-actions {
        padding: 16px;
        background-color: #fff;
        border-top: 1px solid #ededed;
    }

    .action-btn {
        width: 100%;
        padding-top: 14px;
        padding-bottom: 14px;
        background-color: #07c160;
        color: #fff;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        text-decoration: none;
        display: block;
        transition: background-color 0.2s;
    }

    .action-btn:active {
        background-color: #06ad56;
    }

    /* 音频播放器自定义样式 */
    .audio-player-wrapper {
        width: 100%;
        background-color: #fff;
        padding: 40px 20px;
    }

    .audio-info {
        text-align: center;
        margin-bottom: 24px;
    }

    .audio-icon {
        font-size: 80px;
        margin-bottom: 16px;
    }

    .audio-title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
    }

    .audio-meta {
        font-size: 13px;
        color: #999;
    }

    /* Office文档提示 */
    .office-preview {
        background-color: #fff;
        text-align: center;
        padding: 60px 20px;
    }

    .office-preview .icon {
        font-size: 64px;
        margin-bottom: 20px;
    }

    .office-preview .title {
        font-size: 18px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
    }

    .office-preview .desc {
        font-size: 14px;
        color: #999;
        margin-bottom: 24px;
    }
</style>
@endpush

@section('content')
<div class="preview-page">
    <div class="preview-container">
        @if($fileType === 'image')
            {{-- 图片预览 --}}
            <img src="{{ $fileUrl }}" alt="{{ $document->title }}" class="preview-image">

        @elseif($fileType === 'video')
            {{-- 视频预览 --}}
            <video class="preview-video" controls playsinline>
                <source src="{{ $fileUrl }}" type="{{ $document->mime_type }}">
                您的浏览器不支持视频播放
            </video>

        @elseif($fileType === 'audio')
            {{-- 音频预览 --}}
            <div class="audio-player-wrapper">
                <div class="audio-info">
                    <div class="audio-icon">🎵</div>
                    <div class="audio-title">{{ $document->title ?? $document->original_name }}</div>
                    <div class="audio-meta">{{ $document->mime_type }}</div>
                </div>
                <audio class="preview-audio" controls>
                    <source src="{{ $fileUrl }}" type="{{ $document->mime_type }}">
                    您的浏览器不支持音频播放
                </audio>
            </div>

        @elseif($fileType === 'pdf')
            {{-- PDF预览 --}}
            <iframe src="{{ $fileUrl }}" class="preview-pdf"></iframe>

        @elseif($fileType === 'text')
            {{-- 文本预览 --}}
            <div class="preview-text" id="textContent">
                <div class="weui-loadmore">
                    <i class="weui-loading"></i>
                    <span class="weui-loadmore__tips">加载中...</span>
                </div>
            </div>

        @elseif($fileType === 'office')
            {{-- Office文档 --}}
            <div class="office-preview">
                <div class="icon">📄</div>
                <div class="title">Office 文档</div>
                <div class="desc">
                    {{ $document->original_name }}<br>
                    此类型文件需要下载后使用对应应用打开
                </div>
                <a href="{{ $downloadUrl }}" class="action-btn" style="max-width: 300px; margin: 0 auto;">
                    下载文档
                </a>
            </div>

        @else
            {{-- 不支持的文件类型 --}}
            <div class="preview-unsupported">
                <div class="icon">📦</div>
                <div class="title">暂不支持在线预览</div>
                <div class="desc">
                    {{ $document->original_name }}<br>
                    {{ $document->mime_type }}
                </div>
                <a href="{{ $downloadUrl }}" class="action-btn" style="max-width: 300px; margin: 0 auto;">
                    下载文件
                </a>
            </div>
        @endif
    </div>

    @if(in_array($fileType, ['image', 'video', 'audio', 'pdf']))
        {{-- 文件信息 --}}
        <div class="preview-info">
            <div class="info-item">
                <span class="label">文件名</span>
                <span class="value">{{ $document->original_name }}</span>
            </div>
            <div class="info-item">
                <span class="label">文件大小</span>
                <span class="value" id="fileSize">{{ number_format($document->file_size / 1024, 2) }} KB</span>
            </div>
            @if($document->description)
            <div class="info-item">
                <span class="label">描述</span>
                <span class="value">{{ $document->description }}</span>
            </div>
            @endif
        </div>

        {{-- 下载按钮 --}}
        {{-- <div class="preview-actions">
            <a href="{{ $downloadUrl }}" class="action-btn">下载文件</a>
        </div> --}}
    @endif
</div>
@endsection

@push('scripts')
<script>
// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

document.addEventListener('DOMContentLoaded', () => {
    // 更新文件大小显示
    const fileSizeElement = document.getElementById('fileSize');
    if (fileSizeElement) {
        const bytes = {{ $document->file_size }};
        fileSizeElement.textContent = formatFileSize(bytes);
    }

    @if($fileType === 'text')
    // 加载文本内容
    fetch('{{ $fileUrl }}')
        .then(response => response.text())
        .then(text => {
            const container = document.getElementById('textContent');
            if (container) {
                container.textContent = text;
            }
        })
        .catch(error => {
            const container = document.getElementById('textContent');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; color: #999; padding: 40px 20px;">
                        <p>加载失败</p>
                        <p style="font-size: 12px; margin-top: 8px;">${error.message}</p>
                    </div>
                `;
            }
        });
    @endif

    // 视频播放优化
    const video = document.querySelector('.preview-video');
    if (video) {
        // 微信内置浏览器优化
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('x5-playsinline', 'true');
        video.setAttribute('x5-video-player-type', 'h5');
        video.setAttribute('x5-video-player-fullscreen', 'true');
    }

    // 音频播放优化
    const audio = document.querySelector('.preview-audio');
    if (audio) {
        audio.addEventListener('error', (e) => {
            console.error('音频加载失败:', e);
            utils.toast('音频加载失败，请稍后重试', { type: 'top' });
        });
    }

    // 图片长按保存提示（仅在微信环境）
    const image = document.querySelector('.preview-image');
    if (image && utils.isWeixin()) {
        let pressTimer = null;
        image.addEventListener('touchstart', () => {
            pressTimer = setTimeout(() => {
                utils.toast('长按图片可保存到相册', { type: 'top' });
            }, 500);
        });
        image.addEventListener('touchend', () => {
            clearTimeout(pressTimer);
        });
        image.addEventListener('touchmove', () => {
            clearTimeout(pressTimer);
        });
    }
});
</script>
@endpush
