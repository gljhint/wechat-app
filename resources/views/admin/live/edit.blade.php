@extends('admin.layouts.app')

@section('title', '编辑直播室')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">编辑直播室</h1>
        <p class="mt-2 text-sm text-gray-700">修改直播室的基本信息。</p>
    </div>
</div>
@endsection

@section('content')
<form action="{{ route('admin.live.update', $room->id) }}" method="POST" enctype="multipart/form-data" class="space-y-6">
    @csrf
    @method('PUT')

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
                           value="{{ old('title', $room->title) }}"
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
                              placeholder="请输入直播室描述">{{ old('description', $room->description) }}</textarea>
                    @error('description')
                        <p class="mt-2 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <!-- 当前封面 -->
                @if($room->cover_image)
                    <div class="sm:col-span-6">
                        <label class="block text-sm font-medium text-gray-700">当前封面</label>
                        <img src="{{ $room->cover_image?'/storage/'.$room->cover_image:'/images/meetings-banner.webp' }}" alt="当前封面" class="mt-2 h-32 w-auto rounded-lg shadow">
                    </div>
                @endif

                <!-- 封面图片 -->
                <div class="sm:col-span-6">
                    <label for="cover_image" class="block text-sm font-medium text-gray-700">
                        {{ $room->cover_image ? '更换封面图片（可选）' : '封面图片' }}
                    </label>
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
                                   {{ old('is_public', $room->is_public) ? 'checked' : '' }}
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
                            $selectedRoles = old('visible_roles', $room->visible_roles ?? []);
                        @endphp
                        @foreach($roles as $value => $label)
                            <div class="flex items-center">
                                <input id="role_{{ $value }}"
                                       name="visible_roles[]"
                                       type="checkbox"
                                       value="{{ $value }}"
                                       {{ in_array($value, $selectedRoles) ? 'checked' : '' }}
                                       class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                                <label for="role_{{ $value }}" class="ml-3 text-sm text-gray-700">{{ $label }}</label>
                            </div>
                        @endforeach
                    </div>
                </div>

                <!-- 状态信息 -->
                <div class="sm:col-span-6 border-t border-gray-200 pt-6">
                    <h3 class="text-sm font-medium text-gray-900 mb-4">状态信息</h3>
                    <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <div>
                            <dt class="text-sm font-medium text-gray-500">当前状态</dt>
                            <dd class="mt-1">
                                @if($room->status === 'live')
                                    <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                        使用中
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        空闲
                                    </span>
                                @endif
                            </dd>
                        </div>
                        @if($room->rtk_meeting_id)
                            <div>
                                <dt class="text-sm font-medium text-gray-500">Meeting ID</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    <code class="text-xs bg-gray-100 px-2 py-1 rounded">{{ $room->rtk_meeting_id }}</code>
                                </dd>
                            </div>
                        @endif
                    </dl>
                </div>
            </div>
        </div>
    </div>

    <!-- 操作按钮 -->
    <div class="flex justify-end gap-x-3">
        <a href="{{ route('admin.live.index') }}" class="btn-secondary">取消</a>
        <button type="submit" class="btn-primary">保存修改</button>
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
