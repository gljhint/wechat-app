@extends('admin.layouts.app')

@section('title', '文档管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">文档管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理用户上传的文档和资料。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.documents.create') }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            上传文档
        </a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 筛选器 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <form method="GET" action="{{ route('admin.documents.index') }}" class="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <!-- 搜索 -->
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700">搜索</label>
                    <input type="text" name="search" id="search" 
                           class="form-input mt-1"
                           placeholder="标题、描述..."
                           value="{{ request('search') }}">
                </div>
                
                <!-- 类型筛选 -->
                <div>
                    <label for="type" class="block text-sm font-medium text-gray-700">文档类型</label>
                    <select name="type" id="type" class="form-select mt-1">
                        <option value="">全部类型</option>
                        <option value="document" {{ request('type') == 'document' ? 'selected' : '' }}>文档</option>
                        <option value="video" {{ request('type') == 'video' ? 'selected' : '' }}>视频</option>
                        <option value="audio" {{ request('type') == 'audio' ? 'selected' : '' }}>音频</option>
                    </select>
                </div>

                <!-- 标签筛选 -->
                <div>
                    <label for="tag_id" class="block text-sm font-medium text-gray-700">标签</label>
                    <select name="tag_id" id="tag_id" class="form-select mt-1">
                        <option value="">全部标签</option>
                        @foreach($tags ?? [] as $tag)
                            <option value="{{ $tag->id }}" {{ request('tag_id') == $tag->id ? 'selected' : '' }}>
                                {{ $tag->name }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <!-- 状态筛选 -->
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
                    <select name="status" id="status" class="form-select mt-1">
                        <option value="">全部状态</option>
                        <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>启用</option>
                        <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>禁用</option>
                    </select>
                </div>
                
                <!-- 操作 -->
                <div class="sm:col-span-4 flex items-end space-x-2">
                    <button type="submit" class="btn-primary">
                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        筛选
                    </button>
                    <a href="{{ route('admin.documents.index') }}" class="btn-secondary">重置</a>
                </div>
            </form>
        </div>
    </div>

    <!-- 统计概览 -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">总文档数</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $totalDocuments ?? 0 }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">启用文档</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $enabledDocuments ?? 0 }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">今日上传</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $todayUploads ?? 0 }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <svg class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">存储空间</dt>
                            <dd class="text-lg font-medium text-gray-900">{{ $totalSize ?? '0 MB' }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 文档列表 -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">文档列表</h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                        共 {{ $documents->total() ?? 0 }} 个文档
                    </p>
                </div>
                <div class="flex space-x-2">
                    <select id="bulk-action" class="form-select text-sm" onchange="handleBulkAction()">
                        <option value="">批量操作</option>
                        <option value="enable">启用选中</option>
                        <option value="disable">禁用选中</option>
                        <option value="delete">删除选中</option>
                        <option value="export">导出选中</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" id="select-all">
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            文档信息
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            标签
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            类型/大小
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            状态
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            上传时间
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">操作</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($documents ?? [] as $document)
                    <tr class="hover:bg-gray-50">
                        <td class="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 document-checkbox" value="{{ $document->id }}">
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                    <div class="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
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
                                        <svg class="h-6 w-6 {{ $iconClass }}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ $document->title }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ $document->original_name }}
                                    </div>
                                    @if($document->description)
                                    <div class="text-xs text-gray-400 mt-1">
                                        {{ Str::limit($document->description, 50) }}
                                    </div>
                                    @endif
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex flex-wrap gap-1">
                                @forelse($document->tags as $tag)
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-{{ $tag->color }}-100 text-{{ $tag->color }}-800">
                                        {{ $tag->name }}
                                    </span>
                                @empty
                                    <span class="text-sm text-gray-400">无标签</span>
                                @endforelse
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $document->type_text }}</div>
                            <div class="text-sm text-gray-500">{{ $document->file_size_text }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $document->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $document->status ? '启用' : '禁用' }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $document->created_at->format('Y-m-d H:i') }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center space-x-2">
                                <a href="{{ route('admin.documents.show', $document) }}" 
                                   class="text-primary-600 hover:text-primary-900">查看</a>
                                <a href="{{ route('admin.documents.download', $document) }}" 
                                   class="text-blue-600 hover:text-blue-900">下载</a>
                                <a href="{{ route('admin.documents.edit', $document) }}" 
                                   class="text-gray-600 hover:text-gray-900">编辑</a>
                                <button type="button" 
                                        class="text-red-600 hover:text-red-900"
                                        onclick="deleteDocument({{ $document->id }})">
                                    删除
                                </button>
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="7" class="px-6 py-12 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p class="mt-2 text-sm text-gray-500">暂无文档数据</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- 分页 -->
        @if(isset($documents) && $documents->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            {{ $documents->links() }}
        </div>
        @endif
    </div>
</div>
@endsection

@push('scripts')
<script>
    // 全选功能
    document.getElementById('select-all').addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.document-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // 批量操作
    function handleBulkAction() {
        const action = document.getElementById('bulk-action').value;
        const selectedDocuments = Array.from(document.querySelectorAll('.document-checkbox:checked'))
            .map(cb => cb.value);

        if (!action || selectedDocuments.length === 0) {
            alert('请选择文档和操作类型');
            return;
        }

        if (confirm(`确定要对 ${selectedDocuments.length} 个文档执行"${action}"操作吗？`)) {
            fetch('{{ route("admin.documents.bulk") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({
                    action: action,
                    document_ids: selectedDocuments
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || '操作失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('操作失败，请重试');
            });
        }

        document.getElementById('bulk-action').value = '';
    }

    function deleteDocument(documentId) {
        if (confirm('确定要删除此文档吗？此操作不可恢复。')) {
            fetch(`/admin/documents/${documentId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    location.reload();
                } else {
                    alert(data.message || '删除失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('删除失败，请重试');
            });
        }
    }
</script>
@endpush