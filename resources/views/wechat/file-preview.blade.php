@php($hideTabbar = true)
@php($showBack = true)

@extends('wechat.layouts.app')

@section('title', $filename)
@section('navbar-title', $filename)

@push('styles')
<style>
    .file-preview-page {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        background: #000;
        z-index: 1000;
    }
    .preview-header {
        position: relative;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.85);
        color: #fff;
        flex-shrink: 0;
        z-index: 10;
    }

    .back-btn {
        position: absolute;
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.2s ease;
    }

    .back-btn:active {
        background: rgba(255, 255, 255, 0.1);
    }

    .preview-title {
        flex: 1;
        text-align: center;
        padding: 0 48px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .preview-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        overflow: auto;
        background: #000;
    }

    .preview-footer {
        background: rgba(0, 0, 0, 0.85);
        padding: 12px 16px;
        display: flex;
        justify-content: center;
        gap: 12px;
        flex-shrink: 0;
    }

    /* 音频播放器样式 */
    .audio-player {
        width: 100%;
        max-width: 600px;
        background: #1a1a1a;
        border-radius: 16px;
        padding: 30px;
    }

    .audio-player audio {
        width: 100%;
        outline: none;
    }

    .audio-info {
        text-align: center;
        color: #fff;
        margin-bottom: 20px;
    }

    .audio-icon {
        font-size: 64px;
        margin-bottom: 16px;
        color: #07c160;
    }

    .audio-filename {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 8px;
        word-break: break-all;
    }

    /* 视频播放器样式 */
    .video-player {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
    }

    .video-player video {
        width: 100%;
        height: auto;
        max-height: calc(100vh - 140px);
        border-radius: 8px;
    }

    /* PDF预览样式 */
    .pdf-viewer {
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .pdf-viewer iframe,
    .pdf-viewer embed {
        width: 100%;
        height: 100%;
        border: none;
    }

    /* 图片预览样式 */
    .image-viewer {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-viewer img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    /* 不支持预览的文件 */
    .unsupported-file {
        text-align: center;
        color: #fff;
        padding: 40px 20px;
    }

    .unsupported-icon {
        font-size: 72px;
        color: #666;
        margin-bottom: 20px;
    }

    .unsupported-text {
        font-size: 16px;
        color: #999;
        margin-bottom: 8px;
    }

    .unsupported-filename {
        font-size: 14px;
        color: #666;
        word-break: break-all;
    }

    /* 按钮样式 */
    .action-btn {
        min-width: 120px;
        height: 44px;
        border-radius: 8px;
        border: none;
        font-size: 15px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .btn-download {
        background: #07c160;
        color: #fff;
    }

    .btn-download:active {
        background: #06ad56;
        transform: scale(0.98);
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    .btn-secondary:active {
        background: rgba(255, 255, 255, 0.15);
        transform: scale(0.98);
    }

    /* PDF加载提示 */
    .pdf-loading {
        text-align: center;
        color: #fff;
        padding: 40px;
    }

    .pdf-loading .weui-loading {
        margin-bottom: 12px;
    }
</style>
@endpush

@section('content')
<div class="file-preview-page">
    <div class="preview-header">
        <a href="javascript:history.back();" class="back-btn">
            ←
        </a>
        <div class="preview-title">{{ $filename }}</div>
    </div>

    <div class="preview-content">
        @if($type === 'audio')
            {{-- 音频播放器 --}}
            <div class="audio-player">
                <div class="audio-info">
                    <div class="audio-icon">🎵</div>
                    <div class="audio-filename">{{ $filename }}</div>
                </div>
                <audio controls autoplay>
                    <source src="{{ $url }}" type="audio/mpeg">
                    <source src="{{ $url }}" type="audio/ogg">
                    <source src="{{ $url }}" type="audio/wav">
                    您的浏览器不支持音频播放
                </audio>
            </div>

        @elseif($type === 'video')
            {{-- 视频播放器 --}}
            <div class="video-player">
                <video controls autoplay playsinline>
                    <source src="{{ $url }}" type="video/mp4">
                    <source src="{{ $url }}" type="video/webm">
                    您的浏览器不支持视频播放
                </video>
            </div>

        @elseif($type === 'pdf')
            {{-- PDF预览 --}}
            <div class="pdf-viewer" id="pdfViewer">
                <div class="pdf-loading">
                    <i class="weui-loading"></i>
                    <div style="margin-top: 12px;">正在加载PDF...</div>
                </div>
            </div>

        @elseif($type === 'image')
            {{-- 图片预览 --}}
            <div class="image-viewer">
                <img src="{{ $url }}" alt="{{ $filename }}">
            </div>

        @elseif($type === 'office')
            {{-- Office文档预览(PPT/Word/Excel) --}}
            <div class="pdf-viewer" id="officeViewer">
                <div class="pdf-loading">
                    <i class="weui-loading"></i>
                    <div style="margin-top: 12px;">正在加载文档...</div>
                </div>
            </div>

        @else
            {{-- 不支持预览的文件 --}}
            <div class="unsupported-file">
                <div class="unsupported-icon">📄</div>
                <div class="unsupported-text">该文件格式暂不支持在线预览</div>
                <div class="unsupported-filename">{{ $filename }}</div>
            </div>
        @endif
    </div>

    <div class="preview-footer">
        <button type="button" class="action-btn btn-download" onclick="downloadFile()">
            下载文件
        </button>
    </div>
</div>
@endsection

@push('scripts')
<script>
const fileUrl = @json($url);
const fileName = @json($filename);
const fileType = @json($type);

// 下载文件
function downloadFile() {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


// PDF预览初始化
@if($type === 'pdf')
document.addEventListener('DOMContentLoaded', () => {
    const viewer = "/pdfjs/web/viewer.html?file=" + encodeURIComponent(fileUrl);
    const pdfViewer = document.getElementById("pdfViewer");
    pdfViewer.innerHTML = `
        <iframe 
            src="${viewer}" 
            style="width:100%;height:100%;border:none;"
        ></iframe>
    `;
});
@endif

// Office文档预览初始化
@if($type === 'office')
document.addEventListener('DOMContentLoaded', () => {
    const officeViewer = document.getElementById('officeViewer');
    const originalFileUrl = fileUrl;

    // 使用微软Office Online Viewer
    const useMicrosoftViewer = () => {
        const encodedUrl = encodeURIComponent(originalFileUrl);
        officeViewer.innerHTML = `<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=${encodedUrl}" frameborder="0"></iframe>`;
    };

    // 备选方案:提示用户下载
    const showDownloadTip = () => {
        officeViewer.innerHTML = `
            <div class="unsupported-file">
                <div class="unsupported-icon">📄</div>
                <div class="unsupported-text">Office文档预览服务暂时不可用</div>
                <div class="unsupported-filename">{{ $filename }}</div>
                <button type="button" class="action-btn btn-download" onclick="downloadFile()" style="margin-top: 20px;">
                    立即下载查看
                </button>
            </div>
        `;
    };

    try {
        // 使用微软Office Online Viewer(在国内可访问)
        useMicrosoftViewer();

        // 8秒后检测加载失败则提示下载
        setTimeout(() => {
            const iframe = officeViewer.querySelector('iframe');
            if (!iframe || iframe.offsetHeight === 0) {
                console.log('Office Viewer加载失败,提示用户下载');
                showDownloadTip();
            }
        }, 8000);
    } catch (error) {
        console.error('Office文档加载失败:', error);
        showDownloadTip();
    }
});
@endif

// 图片双击缩放
@if($type === 'image')
document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector('.image-viewer img');
    let isZoomed = false;

    img.addEventListener('dblclick', () => {
        if (isZoomed) {
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.width = 'auto';
        } else {
            img.style.maxWidth = 'none';
            img.style.maxHeight = 'none';
            img.style.width = '100%';
        }
        isZoomed = !isZoomed;
    });
});
@endif
</script>
@endpush