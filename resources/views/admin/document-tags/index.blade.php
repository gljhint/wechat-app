@extends('admin.layouts.app')

@section('title', '标签管理')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">标签管理</h1>
        <p class="mt-2 text-sm text-gray-700">管理文档标签，用于微信端文档筛选。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <a href="{{ route('admin.document-tags.create') }}" class="btn-primary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            添加标签
        </a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <form method="GET" action="{{ route('admin.document-tags.index') }}" class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                    <label for="search" class="block text-sm font-medium text-gray-700">搜索</label>
                    <input type="text" name="search" id="search" class="form-input mt-1" placeholder="标签名称..." value="{{ request('search') }}">
                </div>
                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">状态</label>
                    <select name="status" id="status" class="form-select mt-1">
                        <option value="">全部状态</option>
                        <option value="1" {{ request('status') == '1' ? 'selected' : '' }}>启用</option>
                        <option value="0" {{ request('status') == '0' ? 'selected' : '' }}>禁用</option>
                    </select>
                </div>
                <div class="flex items-end space-x-2">
                    <button type="submit" class="btn-primary">筛选</button>
                    <a href="{{ route('admin.document-tags.index') }}" class="btn-secondary">重置</a>
                </div>
            </form>
        </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">标签列表</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">共 {{ $tags->total() ?? 0 }} 个标签</p>
        </div>
        
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">标签名称</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">颜色</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">排序</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">创建时间</th>
                        <th class="relative px-6 py-3"><span class="sr-only">操作</span></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($tags ?? [] as $tag)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-{{ $tag->color }}-100 text-{{ $tag->color }}-800">
                                {{ $tag->name }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $tag->color_text }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $tag->sort_order }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $tag->status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $tag->status_text }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $tag->created_at->format('Y-m-d H:i') }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="{{ route('admin.document-tags.edit', $tag) }}" class="text-primary-600 hover:text-primary-900">编辑</a>
                            <button type="button" class="ml-3 text-red-600 hover:text-red-900" onclick="deleteTag({{ $tag->id }})">删除</button>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="6" class="px-6 py-12 text-center">
                            <p class="text-sm text-gray-500">暂无标签数据</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        @if(isset($tags) && $tags->hasPages())
        <div class="bg-white px-4 py-3 border-t border-gray-200">{{ $tags->links() }}</div>
        @endif
    </div>
</div>
@endsection

@push('scripts')
<script>
function deleteTag(tagId) {
    if (confirm('确定要删除此标签吗？')) {
        fetch(`/admin/document-tags/${tagId}`, {
            method: 'DELETE',
            headers: {'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content}
        }).then(r => r.json()).then(d => d.success ? location.reload() : alert(d.message));
    }
}
</script>
@endpush
