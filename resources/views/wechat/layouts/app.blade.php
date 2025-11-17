<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', '企业微信助手')</title>

    <!-- WeUI CSS -->
    <link rel="stylesheet" href="/css/weui.min.css">
    <script src="/js/weui.min.js"></script>

    <style>
        body {
            background-color: #f8f8f8;
        }

        .page-content {
            min-height: 100vh;
            padding: 0 0 16px;
        }

        body.with-tabbar .page-content {
            padding-bottom: 72px;
        }

        .weui-tabbar--fixed {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }

        .weui-tabbar__icon {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0;
        }

        .weui-tabbar__icon svg {
            width: 24px;
            height: 24px;
            fill: #999;
            transition: fill 0.2s ease;
        }

        .weui-bar__item_on .weui-tabbar__icon svg {
            fill: #07c160;
        }

        .weui-tabbar__icon .weui-badge {
            position: absolute;
            top: -6px;
            right: -12px;
        }

        .weui-tabbar__label {
            margin-top: 4px !important;
            font-size: 10px;
        }
    </style>

    @stack('styles')
</head>
<body class="{{ (!isset($hideTabbar) || !$hideTabbar) ? 'with-tabbar' : '' }}">
    <!-- 页面内容 -->
    <div class="page-content">
        @yield('content')
    </div>

    <!-- 底部导航 -->
    @if(!isset($hideTabbar) || !$hideTabbar)
        <nav class="weui-tabbar weui-tabbar--fixed" role="navigation">
            <a href="{{ route('chat') }}" class="weui-tabbar__item {{ request()->routeIs('chat') ? 'weui-bar__item_on' : '' }}">
                <span class="weui-tabbar__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 13.75 2.45 15.4 3.24 16.84L2 22L7.16 20.76C8.6 21.55 10.25 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.54 20 9.14 19.64 7.89 19L7.5 18.82L4.41 19.59L5.18 16.5L5 16.11C4.36 14.86 4 13.46 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
                    </svg>
                    <span id="tabbarChatBadge" class="weui-badge" style="display: none;"></span>
                </span>
                <p class="weui-tabbar__label">消息</p>
            </a>
            <a href="{{ route('checkin') }}" class="weui-tabbar__item {{ request()->routeIs('checkin*') ? 'weui-bar__item_on' : '' }}">
                <span class="weui-tabbar__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1C10.7 1 9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                    </svg>
                </span>
                <p class="weui-tabbar__label">读经</p>
            </a>
            <a href="{{ route('discover') }}" class="weui-tabbar__item {{ request()->routeIs('discover*') ? 'weui-bar__item_on' : '' }}">
                <span class="weui-tabbar__icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M11.307 9.739L15 9l-.739 3.693a2 2 0 0 1-1.568 1.569L9 15l.739-3.693a2 2 0 0 1 1.568-1.568"/></g></svg>
                </span>
                <p class="weui-tabbar__label">发现</p>
            </a>
            <a href="{{ route('profile') }}" class="weui-tabbar__item {{ request()->routeIs('profile*') ? 'weui-bar__item_on' : '' }}">
                <span class="weui-tabbar__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                    </svg>
                </span>
                <p class="weui-tabbar__label">我的</p>
            </a>
        </nav>
    @endif

    <!-- WeChat JS SDK -->
    <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>

    <!-- Axios -->
    <script src="/js/axios.min.js"></script>

    <script>
        // 配置 Axios
        axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').content;
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';



        // 全局工具函数
        (function() {
            let audioContext = null;
            let chatBadgeCount = 0;
            let activeLoading = null;

            const safeCall = (fn, ...args) => {
                if (typeof fn === 'function') {
                    fn(...args);
                }
            };

            window.utils = {
                toast: function(message, options) {
                    if (!message) {
                        return;
                    }

                    options = options || {};
                    var duration = options.duration != null ? options.duration : 1500;
                    var type = options.type || 'success';
                    var className = options.className;
                    var callback = options.callback;

                    if (type === 'loading') {
                        this.loading(message);
                        setTimeout(function() { window.utils.hideLoading(); }, duration);
                        return;
                    }

                    if (type === 'top') {
                        weui.topTips(message, { duration: duration });
                        safeCall(callback);
                        return;
                    }

                    if (type === 'text') {
                        weui.toast(message, {
                            duration: duration,
                            className: ['weui-toast--text', className].filter(Boolean).join(' '),
                            callback: callback
                        });
                        return;
                    }

                    weui.toast(message, {
                        duration: duration,
                        className: className,
                        callback: callback
                    });
                },

                topTips: function(message, duration) {
                    if (!message) {
                        return;
                    }
                    weui.topTips(message, { duration: duration != null ? duration : 2000 });
                },

                alert: function(options) {
                    options = options || {};
                    return weui.dialog({
                        title: options.title || '提示',
                        content: options.message || '',
                        buttons: [
                            {
                                label: options.confirmText || '确定',
                                type: 'primary',
                                onClick: function() { safeCall(options.onConfirm); }
                            }
                        ]
                    });
                },

                confirm: function(options) {
                    options = options || {};
                    return weui.dialog({
                        title: options.title || '提示',
                        content: options.message || '',
                        buttons: [
                            {
                                label: options.cancelText || '取消',
                                type: 'default',
                                onClick: function() { safeCall(options.onCancel); }
                            },
                            {
                                label: options.confirmText || '确定',
                                type: 'primary',
                                onClick: function() { safeCall(options.onConfirm); }
                            }
                        ]
                    });
                },

                actionSheet: function(items, onCancel) {
                    var menus = (items || []).map(function(item) {
                        return {
                            label: item.label || item.text,
                            onClick: function() { safeCall(item.onClick); }
                        };
                    });
                    return weui.actionSheet(menus, [
                        {
                            label: '取消',
                            onClick: function() { safeCall(onCancel); }
                        }
                    ], {
                        className: 'weui-actionsheet__wrap'
                    });
                },

                loading: function(message) {
                    if (activeLoading) {
                        activeLoading.hide();
                    }
                    activeLoading = weui.loading(message || '加载中...');
                    return activeLoading;
                },

                hideLoading: function() {
                    if (activeLoading) {
                        activeLoading.hide();
                        activeLoading = null;
                    }
                },

                formatTime: function(date) {
                    var d = new Date(date);
                    var now = new Date();
                    var diff = now - d;

                    if (diff < 60000) return '刚刚';
                    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
                    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
                    if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';

                    return d.toLocaleDateString('zh-CN');
                },

                formatFileSize: function(bytes) {
                    if (bytes === 0) return '0 B';
                    var k = 1024;
                    var sizes = ['B', 'KB', 'MB', 'GB'];
                    var i = Math.floor(Math.log(bytes) / Math.log(k));
                    return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
                },

                isNearBottom: function(element, threshold) {
                    if (!element) {
                        return true;
                    }
                    var limit = threshold != null ? threshold : 120;
                    var distance = element.scrollHeight - (element.scrollTop + element.clientHeight);
                    return distance <= limit;
                },

                vibrate: function(pattern) {
                    if (navigator.vibrate) {
                        navigator.vibrate(pattern || [60, 30, 60]);
                    }
                },

                playTone: function(options) {
                    options = options || {};
                    var frequency = options.frequency != null ? options.frequency : 880;
                    var duration = options.duration != null ? options.duration : 0.25;
                    var Context = window.AudioContext || window.webkitAudioContext;

                    if (!Context) {
                        return;
                    }

                    if (!audioContext) {
                        audioContext = new Context();
                    }

                    if (audioContext.state === 'suspended') {
                        audioContext.resume().catch(function() {});
                    }

                    var oscillator = audioContext.createOscillator();
                    var gain = audioContext.createGain();
                    var now = audioContext.currentTime;

                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(frequency, now);

                    gain.gain.setValueAtTime(0.0001, now);
                    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
                    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

                    oscillator.connect(gain);
                    gain.connect(audioContext.destination);

                    oscillator.start(now);
                    oscillator.stop(now + duration + 0.02);
                },

                notifyIncoming: function(options) {
                    options = options || {};
                    if (options.message) {
                        this.toast(options.message, { type: 'text', duration: 2200 });
                    }

                    if (options.vibrate !== false) {
                        this.vibrate();
                    }

                    if (options.sound !== false) {
                        this.playTone(options.tone);
                    }
                },

                updateChatBadge: function(total) {
                    var badge = document.getElementById('tabbarChatBadge');
                    if (!badge) {
                        return;
                    }

                    chatBadgeCount = Math.max(0, Number(total) || 0);

                    if (chatBadgeCount <= 0) {
                        badge.style.display = 'none';
                        badge.textContent = '';
                        badge.removeAttribute('title');
                        return;
                    }

                    var display = chatBadgeCount > 99 ? '99+' : chatBadgeCount;
                    badge.textContent = display;
                    badge.title = '未读消息 ' + chatBadgeCount;
                    badge.style.display = 'inline-block';
                },

                adjustBadge: function(delta) {
                    if (!delta) {
                        return;
                    }
                    this.updateChatBadge(chatBadgeCount + delta);
                },

                incrementBadge: function(count) {
                    this.adjustBadge(count != null ? count : 1);
                },

                decrementBadge: function(count) {
                    var value = count != null ? count : 1;
                    this.adjustBadge(-Math.abs(value));
                },

                getBadgeCount: function() {
                    return chatBadgeCount;
                }
            };
        })();


    </script>

    @stack('scripts')
</body>
</html>
