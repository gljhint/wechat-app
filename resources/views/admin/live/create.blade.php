@extends('admin.layouts.app')

@section('title', '新建直播室')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">新建直播室</h1>
        <p class="mt-2 text-sm text-gray-700">创建一个新的固定直播室。</p>
    </div>
</div>
@endsection

@section('content')
<form action="{{ route('admin.live.store') }}" method="POST" enctype="multipart/form-data" class="space-y-6">
    @csrf

    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <!-- 直播室名称 -->
                <div class="sm:col-span-4">
                    <label for="title" class="block text-sm font-medium text-gray-700">
                        直播室名称 <span class="text-red-500">*</span>
                    </label>
                    <input type="text"
                           name="title"
                           id="title"
                           value="{{ old('title') }}"
                           class="form-input mt-1 @error('title') border-red-300 @enderror"
                           placeholder="例如:第一直播室"
                           required>
                    @error('title')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- 描述 -->
                <div class="sm:col-span-6">
                    <label for="description" class="block text-sm font-medium text-gray-700">直播室描述</label>
                    <textarea name="description"
                              id="description"
                              rows="4"
                              class="form-textarea mt-1 @error('description') border-red-300 @enderror"
                              placeholder="请输入直播室描述">{{ old('description') }}</textarea>
                    @error('description')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- 封面图片 -->
                <div class="sm:col-span-6">
                    <label for="cover_image" class="block text-sm font-medium text-gray-700">封面图片</label>
                    <div class="mt-2 flex items-center gap-x-3">
                        <div id="preview-container" class="hidden">
                            <img id="preview-image" src="" alt="封面预览" class="h-32 w-auto rounded-lg shadow">
                        </div>
                        <label for="cover_image" class="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <span>选择图片</span>
                            <input id="cover_image"
                                   name="cover_image"
                                   type="file"
                                   accept="image/*"
                                   class="sr-only">
                        </label>
                        <p class="text-xs text-gray-500">建议尺寸 16:9，大小不超过 2MB</p>
                    </div>
                    @error('cover_image')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- 公开设置 -->
                <div class="sm:col-span-6">
                    <div class="flex items-start">
                        <div class="flex h-6 items-center">
                            <input id="is_public"
                                   name="is_public"
                                   type="checkbox"
                                   value="1"
                                   {{ old('is_public', true) ? 'checked' : '' }}
                                   class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                        </div>
                        <div class="ml-3 text-sm leading-6">
                            <label for="is_public" class="font-medium text-gray-900">公开直播室</label>
                            <p class="text-gray-500">关闭后只有指定角色可见</p>
                        </div>
                    </div>
                </div>

                <!-- 可见角色 -->
                <div class="sm:col-span-6">
                    <label class="block text-sm font-medium text-gray-700">可见角色</label>
                    <p class="text-sm text-gray-500">不选择表示所有人可见</p>
                    <div class="mt-4 space-y-2">
                        @php
                            $roles = [
                                'admin' => '管理员',
                                'ministry' => '服事',
                                'member' => '成员',
                                'pre_member' => '准成员',
                                'seeker' => '慕道友',
                                'external' => '外教会'
                            ];
                        @endphp
                        @foreach($roles as $value => $label)
                            <div class="flex items-center">
                                <input id="role_{{ $value }}"
                                       name="visible_roles[]"
                                       type="checkbox"
                                       value="{{ $value }}"
                                       {{ in_array($value, old('visible_roles', [])) ? 'checked' : '' }}
                                       class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                                <label for="role_{{ $value }}" class="ml-3 text-sm text-gray-700">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-end gap-x-3">
        <a href="{{ route('admin.live.index') }}" class="btn-secondary">取消</a>
        <button type="submit" class="btn-primary">创建直播室</button>
    </div>
</form>
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const coverInput = document.getElementById('cover_image');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');

    coverInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                previewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            previewContainer.classList.add('hidden');
        }
    });
});
</script>
@endpush
