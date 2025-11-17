@extends('admin.layouts.app')

@section('title', '消息统计')

@section('header')
<div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">消息统计</h1>
        <p class="mt-2 text-sm text-gray-700">
            <svg class="inline h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            出于隐私保护,仅显示统计数据,不包含具体聊天内容
        </p>
    </div>
</div>
@endsection

@section('content')
<div class="space-y-6">
    <!-- 日期范围选择器 -->
    <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
            <form method="GET" action="{{ route('admin.messages.index') }}" class="flex flex-col sm:flex-row gap-4 items-end">
                <div class="flex-1">
                    <label for="start_date" class="block text-sm font-medium text-gray-700">开始日期</label>
                    <input type="date" name="start_date" id="start_date"
                           class="form-input mt-1 w-full"
                           value="{{ $startDate }}">
                </div>
                <div class="flex-1">
                    <label for="end_date" class="block text-sm font-medium text-gray-700">结束日期</label>
                    <input type="date" name="end_date" id="end_date"
                           class="form-input mt-1 w-full"
                           value="{{ $endDate }}">
                </div>
                <div class="flex gap-2">
                    <button type="submit" class="btn-primary">
                        <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        更新
                    </button>
                    <button type="button" onclick="setQuickRange('today')" class="btn-secondary text-sm">今天</button>
                    <button type="button" onclick="setQuickRange('week')" class="btn-secondary text-sm">本周</button>
                    <button type="button" onclick="setQuickRange('month')" class="btn-secondary text-sm">本月</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 核心指标卡片 -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- 总消息数 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">总消息数</dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl font-semibold text-gray-900">{{ number_format($totalMessages) }}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <!-- 会话对数 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">会话对数</dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl font-semibold text-gray-900">{{ number_format($conversationCount) }}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <!-- 已读率 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">已读率</dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl font-semibold text-gray-900">{{ $readRate['rate'] }}%</div>
                                <div class="ml-2 text-sm text-gray-500">{{ number_format($readRate['read']) }}/{{ number_format($readRate['total']) }}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>

        <!-- 撤回率 -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex items-center">
                    <div class="flex-shrink-0 bg-amber-500 rounded-md p-3">
                        <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                    </div>
                    <div class="ml-5 w-0 flex-1">
                        <dl>
                            <dt class="text-sm font-medium text-gray-500 truncate">撤回率</dt>
                            <dd class="flex items-baseline">
                                <div class="text-2xl font-semibold text-gray-900">{{ $recallRate['rate'] }}%</div>
                                <div class="ml-2 text-sm text-gray-500">{{ number_format($recallRate['recalled']) }}/{{ number_format($recallRate['total']) }}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 消息类型分布 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">消息类型分布</h3>
                <canvas id="messageTypeChart"></canvas>
            </div>
        </div>

        <!-- 每日消息趋势 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">每日消息趋势</h3>
                <canvas id="dailyMessageChart"></canvas>
            </div>
        </div>
    </div>

    <!-- 热力图和排行榜 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 小时分布热力图 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">24小时消息分布</h3>
                <canvas id="hourlyHeatmapChart"></canvas>
            </div>
        </div>

        <!-- 活跃用户排行 -->
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">活跃用户排行 TOP 10</h3>
                <div class="flow-root">
                    <ul role="list" class="-my-5 divide-y divide-gray-200">
                        @forelse($activeUsers as $index => $activeUser)
                        <li class="py-4">
                            <div class="flex items-center space-x-4">
                                <div class="flex-shrink-0">
                                    <span class="inline-flex items-center justify-center h-8 w-8 rounded-full {{ $index < 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' : 'bg-gray-200 text-gray-600' }}">
                                        <span class="text-sm font-semibold">{{ $index + 1 }}</span>
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900 truncate">
                                        {{ $activeUser->fromUser->nickname ?? '未知用户' }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        消息数: {{ number_format($activeUser->message_count) }}
                                    </p>
                                </div>
                                <div>
                                    <div class="flex items-center">
                                        @php
                                            $maxCount = $activeUsers->first()->message_count ?? 1;
                                            $percentage = ($activeUser->message_count / $maxCount) * 100;
                                        @endphp
                                        <div class="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                            <div class="bg-blue-600 h-2 rounded-full" style="width: {{ $percentage }}%"></div>
                                        </div>
                                        <span class="text-sm text-gray-600">{{ round($percentage) }}%</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        @empty
                        <li class="py-12 text-center">
                            <p class="text-sm text-gray-500">暂无数据</p>
                        </li>
                        @endforelse
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
    // 快速日期范围设置
    function setQuickRange(range) {
        const today = new Date();
        let startDate, endDate = today;

        switch(range) {
            case 'today':
                startDate = today;
                break;
            case 'week':
                startDate = new Date(today);
                startDate.setDate(today.getDate() - 7);
                break;
            case 'month':
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
        }

        document.getElementById('start_date').value = formatDate(startDate);
        document.getElementById('end_date').value = formatDate(endDate);

        // 自动提交表单
        document.querySelector('form').submit();
    }

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // Chart.js 配置
    Chart.defaults.font.family = 'Inter, system-ui, sans-serif';

    // 消息类型饼图
    const messageTypeCtx = document.getElementById('messageTypeChart').getContext('2d');
    new Chart(messageTypeCtx, {
        type: 'doughnut',
        data: {
            labels: {!! json_encode(array_keys($messagesByType->toArray())) !!},
            datasets: [{
                data: {!! json_encode(array_values($messagesByType->toArray())) !!},
                backgroundColor: [
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });

    // 每日消息折线图
    const dailyMessageCtx = document.getElementById('dailyMessageChart').getContext('2d');
    new Chart(dailyMessageCtx, {
        type: 'line',
        data: {
            labels: {!! json_encode($dailyMessages->pluck('date')->toArray()) !!},
            datasets: [{
                label: '消息数',
                data: {!! json_encode($dailyMessages->pluck('count')->toArray()) !!},
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });

    // 24小时热力图
    const hourlyCtx = document.getElementById('hourlyHeatmapChart').getContext('2d');
    const hourlyData = {!! json_encode($hourlyMessages) !!};
    const hours = Array.from({length: 24}, (_, i) => i);
    const hourlyValues = hours.map(h => hourlyData[h] || 0);

    new Chart(hourlyCtx, {
        type: 'bar',
        data: {
            labels: hours.map(h => `${h}:00`),
            datasets: [{
                label: '消息数',
                data: hourlyValues,
                backgroundColor: hourlyValues.map(v => {
                    const max = Math.max(...hourlyValues);
                    const intensity = max > 0 ? v / max : 0;
                    return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`;
                }),
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
</script>
@endpush
