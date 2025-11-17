@extends('admin.layouts.app')

@section('title', '添加标签')

@section('header')
<div class="sm:flex sm:items-center sm:justify-between">
    <div>
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">添加标签</h1>
        <p class="mt-2 text-sm text-gray-700">创建新的文档标签。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0">
        <a href="{{ route('admin.document-tags.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="max-w-2xl">
    <form method="POST" action="{{ route('admin.document-tags.store') }}" class="space-y-6">
        @csrf
        
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6 space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">
                        标签名称 <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" id="name" required value="{{ old('name') }}"
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
                        <option value="">请选择颜色</option>
                        @foreach(\App\Models\DocumentTag::COLORS as $colorKey => $colorName)
                            <option value="{{ $colorKey }}" {{ old('color') == $colorKey ? 'selected' : '' }}>
                                {{ $colorName }}
                            </option>
                        @endforeach
                    </select>
                    @error('color')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                    <p class="mt-1 text-xs text-gray-500">选择标签的显示颜色</p>
                </div>

                <div>
                    <label for="sort_order" class="block text-sm font-medium text-gray-700">
                        排序 <span class="text-red-500">*</span>
                    </label>
                    <input type="number" name="sort_order" id="sort_order" required min="0" 
                           value="{{ old('sort_order', 0) }}"
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
                        <option value="1" {{ old('status', '1') == '1' ? 'selected' : '' }}>启用</option>
                        <option value="0" {{ old('status') == '0' ? 'selected' : '' }}>禁用</option>
                    </select>
                    @error('status')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <div class="flex justify-end space-x-3">
            <a href="{{ route('admin.document-tags.index') }}" class="btn-secondary">取消</a>
            <button type="submit" class="btn-primary">保存</button>
        </div>
    </form>
</div>
@endsection
