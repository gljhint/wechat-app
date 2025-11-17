@extends('admin.layouts.app')

@section('title', '文档详情')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">文档详情</h1>
        <p class="mt-2 text-sm text-gray-700">查看文档的详细信息。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.documents.download', $document) }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            下载文件
        </a>
        <a href="{{ route('admin.documents.edit', $document) }}" class="btn-secondary">编辑</a>
        <a href="{{ route('admin.documents.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 文档基本信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-start sm:justify-between">
                <div class="sm:flex sm:items-start">
                    <div class="flex-shrink-0">
                        <div class="h-20 w-20 rounded-lg bg-blue-100 flex items-center justify-center">
                            @php
                                $extension = pathinfo($document->original_name, PATHINFO_EXTENSION);
                                $iconClass = match(strtolower($extension)) {
                                    'pdf' => 'text-red-600',
                                    'doc', 'docx' => 'text-blue-600',
                                    'xls', 'xlsx' => 'text-green-600',
                                    'ppt', 'pptx' => 'text-orange-600',
                                    'jpg', 'jpeg', 'png', 'gif' => 'text-purple-600',
                                    default => 'text-gray-600'
                                };
                            @endphp
                            <svg class="h-12 w-12 {{ $iconClass }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </div>
                    <div class="mt-4 sm:ml-6 sm:mt-0">
                        <h3 class="text-lg font-medium text-gray-900">
                            {{ $document->title }}
                            <span class="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $document->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $document->status ? '启用' : '禁用' }}
                            </span>
                        </h3>
                        <p class="text-sm text-gray-500">{{ $document->original_name }}</p>
                        <p class="text-sm text-gray-500">类型：{{ $document->type }} | 大小：{{ number_format($document->file_size / 1024 / 1024, 2) }} MB</p>
                    </div>
                </div>
                <div class="mt-4 sm:mt-0">
                    <div class="text-right">
                        <div class="text-sm text-gray-500">文档ID</div>
                        <div class="text-lg font-medium text-gray-900">#{{ $document->id }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 详细信息 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- 文档信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">文档信息</h3>
                <dl class="space-y-3">
                    <div>
                        <dt class="text-sm font-medium text-gray-500">文档标题</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $document->title }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">文档类型</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $document->type }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">文件格式</dt>
                        <dd class="mt-1 text-sm text-gray-900 uppercase">{{ strtoupper($extension) }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">文件大小</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ number_format($document->file_size / 1024 / 1024, 2) }} MB</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">状态</dt>
                        <dd class="mt-1">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $document->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $document->status ? '启用' : '禁用' }}
                            </span>
                        </dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">上传时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $document->created_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                    <div>
                        <dt class="text-sm font-medium text-gray-500">更新时间</dt>
                        <dd class="mt-1 text-sm text-gray-900">{{ $document->updated_at->format('Y-m-d H:i:s') }}</dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>

    <!-- 描述信息 -->
    @if($document->description)
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">描述信息</h3>
            <div class="bg-gray-50 rounded-lg p-4">
                <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ $document->description }}</p>
            </div>
        </div>
    </div>
    @endif

    <!-- 文件预览区域 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">文件预览</h3>
            
            @if(in_array(strtolower($extension), ['jpg', 'jpeg', 'png', 'gif']))
                <!-- 图片预览 -->
                <div class="text-center">
                    <img src="{{ Storage::url($document->file_path) }}" 
                         alt="{{ $document->title }}" 
                         class="mx-auto max-w-full h-auto rounded-lg shadow-lg"
                         style="max-height: 500px;">
                </div>
            @elseif(strtolower($extension) == 'pdf')
                <!-- PDF预览 -->
                <div class="bg-gray-100 rounded-lg p-8 text-center">
                    <svg class="mx-auto h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h4 class="text-lg font-medium text-gray-900 mb-2">PDF 文档</h4>
                    <p class="text-sm text-gray-500 mb-4">{{ $document->original_name }}</p>
                    <div class="space-x-2">
                        <a href="{{ route('admin.documents.download', $document) }}" class="btn-primary">
                            下载查看
                        </a>
                        <button type="button" onclick="openPdfPreview()" class="btn-secondary">
                            在线预览
                        </button>
                    </div>
                </div>
            @else
                <!-- 其他文件类型 -->
                <div class="bg-gray-100 rounded-lg p-8 text-center">
                    <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h4 class="text-lg font-medium text-gray-900 mb-2">{{ strtoupper($extension) }} 文档</h4>
                    <p class="text-sm text-gray-500 mb-4">{{ $document->original_name }}</p>
                    <a href="{{ route('admin.documents.download', $document) }}" class="btn-primary">
                        下载查看
                    </a>
                </div>
            @endif
        </div>
    </div>

    <!-- 操作日志 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">操作记录</h3>
            <div class="flow-root">
                <ul class="-mb-8">
                    <li>
                        <div class="relative pb-8">
                            <div class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></div>
                            <div class="relative flex space-x-3">
                                <div>
                                    <span class="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                        <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p class="text-sm text-gray-500">文档创建 <span class="font-medium text-gray-900">{{ $document->title }}</span></p>
                                    </div>
                                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                        {{ $document->created_at->format('m/d H:i') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    @if($document->created_at != $document->updated_at)
                    <li>
                        <div class="relative pb-8">
                            <div class="relative flex space-x-3">
                                <div>
                                    <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                        <svg class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </span>
                                </div>
                                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p class="text-sm text-gray-500">文档信息更新</p>
                                    </div>
                                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                                        {{ $document->updated_at->format('m/d H:i') }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    @endif
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- PDF预览模态框 -->
<div id="pdfModal" class="fixed inset-0 z-50 overflow-y-auto hidden">
    <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-96">
            <div class="flex items-center justify-between p-4 border-b">
                <h3 class="text-lg font-medium">{{ $document->title }}</h3>
                <button type="button" onclick="closePdfPreview()" class="text-gray-400 hover:text-gray-600">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div class="p-4 h-full">
                <iframe id="pdfFrame" src="" class="w-full h-full rounded"></iframe>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function openPdfPreview() {
        const modal = document.getElementById('pdfModal');
        const iframe = document.getElementById('pdfFrame');
        iframe.src = '{{ Storage::url($document->file_path) }}';
        modal.classList.remove('hidden');
    }

    function closePdfPreview() {
        const modal = document.getElementById('pdfModal');
        const iframe = document.getElementById('pdfFrame');
        iframe.src = '';
        modal.classList.add('hidden');
    }

    // 点击模态框外部关闭
    document.getElementById('pdfModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePdfPreview();
        }
    });
</script>
@endpush