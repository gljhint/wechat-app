@extends('admin.layouts.app')

@section('title', '编辑标签')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑标签</h1>
        <p class="mt-2 text-sm text-gray-700">修改标签信息。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0">
        <a href="{{ route('admin.document-tags.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-2xl">
    <form method="POST" action="{{ route('admin.document-tags.update', $documentTag) }}" class="space-y-6">
        @csrf
        @method('PUT')
        
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6 space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                        标签名称 <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" id="name" required 
                           value="{{ old('name', $documentTag->name) }}"
                           class="form-input mt-1 @error('name') border-red-300 @enderror"
                           placeholder="请输入标签名称">
                    @error('name')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="color" class="block text-sm font-medium text-gray-700">
                        标签颜色 <span class="text-red-500">*</span>
                    </label>
                    <select name="color" id="color" required class="form-select mt-1 @error('color') border-red-300 @enderror">
                        @foreach(\App\Models\DocumentTag::COLORS as $colorKey => $colorName)
                            <option value="{{ $colorKey }}" 
                                {{ old('color', $documentTag->color) == $colorKey ? 'selected' : '' }}>
                                {{ $colorName }}
                            </option>
                        @endforeach
                    </select>
                    @error('color')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="sort_order" class="block text-sm font-medium text-gray-700">
                        排序 <span class="text-red-500">*</span>
                    </label>
                    <input type="number" name="sort_order" id="sort_order" required min="0" 
                           value="{{ old('sort_order', $documentTag->sort_order) }}"
                           class="form-input mt-1 @error('sort_order') border-red-300 @enderror"
                           placeholder="数字越小越靠前">
                    @error('sort_order')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="status" class="block text-sm font-medium text-gray-700">
                        状态 <span class="text-red-500">*</span>
                    </label>
                    <select name="status" id="status" required class="form-select mt-1 @error('status') border-red-300 @enderror">
                        <option value="1" {{ old('status', $documentTag->status) == '1' ? 'selected' : '' }}>启用</option>
                        <option value="0" {{ old('status', $documentTag->status) == '0' ? 'selected' : '' }}>禁用</option>
                    </select>
                    @error('status')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.document-tags.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">更新</button>
        </div>
    </form>
</div>
@endsection
