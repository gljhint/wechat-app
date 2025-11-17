@extends('admin.layouts.app')

@section('title', '直播室详情')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">直播室详情</h1>
        <p class="mt-2 text-sm text-gray-700">查看直播室的详细信息。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <a href="{{ route('admin.live.edit', $room->id) }}" class="btn-secondary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            编辑
        </a>
        <a href="{{ route('admin.live.index') }}" class="btn-secondary">返回列表</a>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- 主要信息 -->
        <div class="lg:col-span-2">
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">基本信息</h3>

                    @if($room->cover_image)
                        <div class="mb-6">
                            <img src="{{ $room->cover_image?'/storage/'.$room->cover_image:'/images/meetings-banner.webp' }}" alt="封面" class="w-full h-auto rounded-lg shadow-md">
                        </div>
                    @endif

                    <dl class="divide-y divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">直播室ID</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ $room->id }}</dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">直播室名称</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 font-semibold">{{ $room->title }}</dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">描述</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ $room->description ?: '-' }}</dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">当前状态</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                @php
                                    $isLive = false;
                                    $viewerCount = 0;
                                    if ($room->rtk_meeting_id) {
                                        try {
                                            $realtimeService = app(\App\Services\CloudflareRealtimeService::class);
                                            $sessionData = $realtimeService->getActiveSession($room->rtk_meeting_id);
                                            if ($sessionData && isset($sessionData['live_participants'])) {
                                                $viewerCount = $sessionData['live_participants'];
                                                $isLive = $viewerCount > 0;
                                            }
                                        } catch (\Exception $e) {
                                            // 获取失败，默认空闲
                                        }
                                    }
                                @endphp
                                @if($isLive)
                                    <span class="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        <span class="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                        使用中 ({{ $viewerCount }}人在线)
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                        空闲
                                    </span>
                                @endif
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">公开设置</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                @if($room->is_public)
                                    <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                        公开
                                    </span>
                                @else
                                    <span class="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                        仅限指定角色
                                    </span>
                                @endif
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">可见权限</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{{ $room->visible_roles_text }}</dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">创建时间</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {{ $room->created_at->format('Y年m月d日 H:i:s') }}
                            </dd>
                        </div>

                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt class="text-sm font-medium text-gray-500">更新时间</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {{ $room->updated_at->format('Y年m月d日 H:i:s') }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>

        <!-- 侧边栏 -->
        <div class="lg:col-span-1">
            <!-- 技术信息 -->
            <div class="bg-white shadow rounded-lg mb-6">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">技术信息</h3>
                    <dl class="space-y-4">
                        @if($room->rtk_meeting_id)
                            <div>
                                <dt class="text-sm font-medium text-gray-500">RealtimeKit Meeting ID</dt>
                                <dd class="mt-1 text-xs text-gray-900 font-mono bg-gray-50 p-2 rounded break-all">
                                    {{ $room->rtk_meeting_id }}
                                </dd>
                            </div>
                        @else
                            <div>
                                <p class="text-sm text-gray-500">尚未创建 Meeting</p>
                            </div>
                        @endif

                        @if($room->started_at)
                            <div>
                                <dt class="text-sm font-medium text-gray-500">最近开播时间</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ $room->started_at->format('Y-m-d H:i:s') }}
                                </dd>
                            </div>
                        @endif

                        @if($room->ended_at)
                            <div>
                                <dt class="text-sm font-medium text-gray-500">最近停播时间</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    {{ $room->ended_at->format('Y-m-d H:i:s') }}
                                </dd>
                            </div>
                        @endif
                    </dl>
                </div>
            </div>

            <!-- 操作 -->
            <div class="bg-white shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">操作</h3>
                    <div class="space-y-3">
                        <a href="{{ route('admin.live.edit', $room->id) }}" class="btn-secondary w-full">
                            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            编辑直播室
                        </a>

                        @if($isLive)
                            <form method="POST" action="{{ route('admin.live.force-end', $room->id) }}"
                                  onsubmit="return confirm('确定要强制结束该直播吗？')">
                                @csrf
                                <button type="submit" class="w-full inline-flex justify-center items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                                    <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                                    </svg>
                                    强制结束直播
                                </button>
                            </form>
                        @else
                            <form method="POST" action="{{ route('admin.live.destroy', $room->id) }}"
                                  onsubmit="return confirm('确定要删除该直播室吗？此操作无法恢复！')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="w-full inline-flex justify-center items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                                    <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                    删除直播室
                                </button>
                            </form>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
