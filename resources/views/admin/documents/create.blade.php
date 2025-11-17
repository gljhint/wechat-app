@extends('admin.layouts.app')

@section('title', '上传文档')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">上传文档</h1>
        <p class="mt-2 text-sm text-gray-700">为用户上传新的文档和资料。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="{{ route('admin.documents.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-4xl mx-auto">
    <form method="POST" action="{{ route('admin.documents.store') }}" enctype="multipart/form-data" class="space-y-6">
        @csrf
        
        <!-- 基本信息 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <!-- 文档标题 -->
                    <div class="sm:col-span-2">
                        <label for="title" class="block text-sm font-medium text-gray-700">
                            文档标题 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               name="title" 
                               id="title" 
                               required
                               value="{{ old('title') }}"
                               class="form-input mt-1 @error('title') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                               placeholder="请输入文档标题">
                        @error('title')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 文档类型 -->
                    <div>
                        <label for="type" class="block text-sm font-medium text-gray-700">
                            文档类型 <span class="text-red-500">*</span>
                        </label>
                        <select name="type" id="type" required
                                class="form-select mt-1 @error('type') border-red-300 @enderror">
                            <option value="">请选择类型</option>
                            <option value="document" {{ old('type') == 'document' ? 'selected' : '' }}>文档</option>
                            <option value="video" {{ old('type') == 'video' ? 'selected' : '' }}>视频</option>
                            <option value="audio" {{ old('type') == 'audio' ? 'selected' : '' }}>音频</option>
                        </select>
                        @error('type')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 状态 -->
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700">
                            状态 <span class="text-red-500">*</span>
                        </label>
                        <select name="status"
                                id="status"
                                required
                                class="form-select mt-1 @error('status') border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500 @enderror">
                            <option value="1" {{ old('status', '1') == '1' ? 'selected' : '' }}>启用</option>
                            <option value="0" {{ old('status') == '0' ? 'selected' : '' }}>禁用</option>
                        </select>
                        @error('status')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <!-- 描述 -->
                    <div class="sm:col-span-2">
                        <label for="description" class="block text-sm font-medium text-gray-700">描述</label>
                        <textarea name="description" 
                                  id="description" 
                                  rows="4" 
                                  class="form-textarea mt-1 @error('description') border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500 @enderror"
                                  placeholder="请输入文档描述...">{{ old('description') }}</textarea>
                        @error('description')
                            <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- 文件上传 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">文件上传</h3>
                
                <div>
                    <label for="file" class="block text-sm font-medium text-gray-700">
                        选择文件 <span class="text-red-500">*</span>
                    </label>
                    <div id="upload-area" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div class="space-y-1 text-center w-full">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600 justify-center">
                                <label for="file" class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                                    <span>点击上传文件</span>
                                    <input id="file"
                                           type="file"
                                           required
                                           class="sr-only @error('file') border-red-300 @enderror">
                                </label>
                                <p class="pl-1">或拖拽文件到此处</p>
                            </div>
                            <p class="text-xs text-gray-500">支持 PDF、Word、Excel、PPT、图片、音视频、压缩包等格式，最大 1GB</p>
                            <div id="file-selected-info" class="hidden mt-3">
                                <div class="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <div class="flex items-center space-x-2 text-sm">
                                        <svg class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span id="selected-file-name" class="font-medium text-gray-900"></span>
                                        <span id="selected-file-size" class="text-gray-500"></span>
                                    </div>
                                    <button type="button" id="upload-btn" class="btn-primary text-sm py-1.5 px-4">
                                        <svg class="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        上传文件
                                    </button>
                                </div>
                            </div>
                            <div id="upload-progress" class="hidden mt-4 w-full">
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div id="progress-bar" class="bg-primary-600 h-2.5 rounded-full transition-all duration-300" style="width: 0%"></div>
                                </div>
                                <p id="progress-text" class="text-xs text-gray-600 mt-1">上传中... 0%</p>
                            </div>
                            <div id="file-uploaded-info" class="hidden mt-3">
                                <div class="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
                                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="font-medium">文件已上传成功</span>
                                    <span id="uploaded-file-name" class="text-gray-600"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 隐藏字段存储上传的文件信息 -->
                    <input type="hidden" id="temp_file_path" name="temp_file_path">
                    <input type="hidden" id="original_name" name="original_name">
                    <input type="hidden" id="file_size" name="file_size">
                    <input type="hidden" id="mime_type" name="mime_type">
                    @error('file')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <!-- 标签选择 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-medium text-gray-900">标签选择</h3>
                    <a href="{{ route('admin.document-tags.index') }}"
                       target="_blank"
                       class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
                        <svg class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        管理标签
                    </a>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-3">
                        文档标签
                    </label>
                    <p class="text-xs text-gray-500 mb-3">为文档添加标签，方便微信端筛选</p>

                    @php
                        $oldTags = old('tags', []);
                    @endphp

                    <div class="space-y-2">
                        @forelse($tags ?? [] as $tag)
                            <div class="flex items-center">
                                <input type="checkbox"
                                       id="tag_{{ $tag->id }}"
                                       name="tags[]"
                                       value="{{ $tag->id }}"
                                       {{ in_array($tag->id, $oldTags) ? 'checked' : '' }}
                                       class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                                <label for="tag_{{ $tag->id }}" class="ml-3 text-sm">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-{{ $tag->color }}-100 text-{{ $tag->color }}-800">
                                        {{ $tag->name }}
                                    </span>
                                </label>
                            </div>
                        @empty
                            <p class="text-sm text-gray-500">暂无可用标签，请先<a href="{{ route('admin.document-tags.create') }}" class="text-primary-600">创建标签</a></p>
                        @endforelse
                    </div>
                </div>
            </div>
        </div>

        <!-- 可见角色设置 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">可见角色设置</h3>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-3">
                        可见角色
                    </label>
                    <p class="text-xs text-gray-500 mb-3">选择可以查看该文档的角色，不选择表示所有人可见</p>

                    @php
                        $oldVisibleRoles = old('visible_roles', []);
                    @endphp

                    <div class="space-y-2">
                        @foreach(\App\Models\WechatUser::$roleNames as $roleKey => $roleName)
                            <div class="flex items-center">
                                <input type="checkbox"
                                       id="role_{{ $roleKey }}"
                                       name="visible_roles[]"
                                       value="{{ $roleKey }}"
                                       {{ in_array($roleKey, $oldVisibleRoles) ? 'checked' : '' }}
                                       class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                                <label for="role_{{ $roleKey }}" class="ml-3 text-sm">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-{{ \App\Models\WechatUser::getRoleBadgeClass($roleKey) }}-100 text-{{ \App\Models\WechatUser::getRoleBadgeClass($roleKey) }}-800">
                                        {{ $roleName }}
                                    </span>
                                </label>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.documents.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">
                保存文档
            </button>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function() {
        const fileInput = document.getElementById('file');
        const fileSelectedInfo = document.getElementById('file-selected-info');
        const fileUploadedInfo = document.getElementById('file-uploaded-info');
        const uploadProgress = document.getElementById('upload-progress');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const uploadArea = document.getElementById('upload-area');
        const uploadBtn = document.getElementById('upload-btn');

        let isUploading = false;
        let selectedFile = null;
        let uploadedFileData = null;

        // 文件选择事件 - 只显示信息，不自动上传
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // 文件大小检查(1GB)
                if (file.size > 1024 * 1024 * 1024) {
                    alert('文件大小不能超过 1GB');
                    fileInput.value = '';
                    return;
                }

                selectedFile = file;
                showSelectedFile(file);
            }
        });

        // 显示已选择的文件
        function showSelectedFile(file) {
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
            document.getElementById('selected-file-name').textContent = file.name;
            document.getElementById('selected-file-size').textContent = `(${fileSize} MB)`;
            fileSelectedInfo.classList.remove('hidden');
            fileUploadedInfo.classList.add('hidden');
        }

        // 点击上传按钮
        uploadBtn.addEventListener('click', function() {
            if (selectedFile) {
                uploadFileToR2(selectedFile);
            }
        });

        // 拖拽上传
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.classList.add('border-primary-500', 'bg-primary-50');
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('border-primary-500', 'bg-primary-50');
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.classList.remove('border-primary-500', 'bg-primary-50');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                if (file.size > 1024 * 1024 * 1024) {
                    alert('文件大小不能超过 1GB');
                    return;
                }
                selectedFile = file;
                fileInput.files = files;
                showSelectedFile(file);
            }
        });

        // 上传文件到R2
        async function uploadFileToR2(file) {
            if (isUploading) {
                alert('正在上传中，请稍候...');
                return;
            }

            // 文件大小检查(1GB)
            if (file.size > 1024 * 1024 * 1024) {
                alert('文件大小不能超过 1GB');
                return;
            }

            isUploading = true;
            fileSelectedInfo.classList.add('hidden');
            uploadProgress.classList.remove('hidden');

            try {
                // 确保 content_type 有值
                const contentType = file.type || 'application/octet-stream';

                // 1. 获取预签名URL
                const presignResponse = await fetch('{{ route('admin.documents.presigned-upload-url') }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({
                        filename: file.name,
                        content_type: contentType
                    })
                });

                const presignData = await presignResponse.json();

                if (!presignData.success) {
                    throw new Error(presignData.message || '获取上传地址失败');
                }

                // 2. 直接上传到R2 - 使用后端返回的 content_type 确保一致性
                await uploadToR2(file, presignData.data.upload_url, presignData.data.content_type);

                // 3. 保存文件信息到隐藏字段
                uploadedFileData = presignData.data;
                document.getElementById('temp_file_path').value = presignData.data.file_path;
                document.getElementById('original_name').value = file.name;
                document.getElementById('file_size').value = file.size;
                document.getElementById('mime_type').value = contentType;

                // 4. 显示成功信息
                document.getElementById('uploaded-file-name').textContent = file.name;
                fileUploadedInfo.classList.remove('hidden');
                uploadProgress.classList.add('hidden');

            } catch (error) {
                alert('上传失败：' + error.message);
                console.error('Upload error:', error);
                uploadProgress.classList.add('hidden');
            } finally {
                isUploading = false;
            }
        }

        // 上传到R2（带进度）
        function uploadToR2(file, uploadUrl, contentType) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                // 监听上传进度
                xhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        progressBar.style.width = percent + '%';
                        progressText.textContent = `上传中... ${percent}%`;
                    }
                });

                xhr.addEventListener('load', function() {
                    if (xhr.status === 200) {
                        progressBar.style.width = '100%';
                        progressText.textContent = '上传完成 100%';
                        resolve();
                    } else {
                        reject(new Error(`上传失败 (${xhr.status}): ${xhr.statusText || xhr.responseText}`));
                    }
                });

                xhr.addEventListener('error', function() {
                    reject(new Error('网络错误'));
                });

                xhr.addEventListener('abort', function() {
                    reject(new Error('上传已取消'));
                });

                // 上传到R2 - 使用与预签名URL一致的Content-Type
                xhr.open('PUT', uploadUrl);
                xhr.setRequestHeader('Content-Type', contentType);
                xhr.send(file);
            });
        }

        // 表单提交验证
        const form = document.querySelector('form');
        form.addEventListener('submit', function(e) {
            const title = document.getElementById('title').value.trim();
            const type = document.getElementById('type').value;
            const tempFilePath = document.getElementById('temp_file_path').value;

            if (!title || !type || !tempFilePath) {
                e.preventDefault();
                alert('请填写所有必填字段并上传文件');
                return false;
            }

            if (isUploading) {
                e.preventDefault();
                alert('文件正在上传中，请稍候...');
                return false;
            }
        });
    });
</script>
@endpush