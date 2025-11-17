@extends('admin.layouts.app')

@section('title', '系统信息')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">系统信息</h1>
        <p class="mt-2 text-sm text-gray-700">管理系统的全局配置和参数设置。</p>
    </div>
    <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none space-x-2">
        <button type="button" onclick="clearCache()" class="btn-secondary">
            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            清除缓存
        </button>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 系统信息 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">系统信息</h3>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                    <dt class="text-sm font-medium text-gray-500">PHP版本</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ PHP_VERSION }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">Laravel版本</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ app()->version() }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">服务器时间</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ now()->format('Y-m-d H:i:s') }}</dd>
                </div>
                <div>
                    <dt class="text-sm font-medium text-gray-500">时区</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ config('app.timezone') }}</dd>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
    function clearCache() {
        if (confirm('确定要清除系统缓存吗？')) {
            fetch('{{ route("admin.settings.cache.clear") }}', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('缓存清除成功');
                } else {
                    alert(data.message || '清除失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('清除失败，请重试');
            });
        }
    }

    function exportSettings() {
        window.location.href = '{{ route("admin.settings") }}?export=1';
    }

    function testEmail() {
        const email = prompt('请输入测试邮箱地址：');
        if (email) {
            fetch('/admin/settings/test-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ email: email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('测试邮件发送成功');
                } else {
                    alert(data.message || '发送失败');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('发送失败，请重试');
            });
        }
    }

    // 表单提交时的确认
    document.querySelector('form').addEventListener('submit', function(e) {
        const maintenanceMode = document.getElementById('maintenance_mode').checked;
        if (maintenanceMode) {
            if (!confirm('您启用了维护模式，这将导致系统对普通用户不可用。确定要继续吗？')) {
                e.preventDefault();
                return false;
            }
        }
    });
</script>
@endpush