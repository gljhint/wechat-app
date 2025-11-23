<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $stream->title }}</title>

    <!-- Polyfills - 必须最先加载 -->
    <script src="/js/polyfills.js"></script>

    <!-- RealtimeKit Core (本地托管 - IIFE 版本) - 必须在 UI 之前加载 -->
    <script src="/vendor/realtimekit-core/dist/index.iife.js"></script>

    <!-- 中文翻译配置 - 必须在 UI 加载之前定义 -->
    <script src="/js/realtimekit-lang-zh-CN.js"></script>

    <!-- 屏幕常亮脚本 -->
    <script>
        // 屏幕常亮：优先使用 Wake Lock API，降级到 Audio 播放
        (function keepScreenAwake() {
            let wakeLock = null;
            let fallbackAudio = null;

            // 方案1：尝试使用标准 Wake Lock API
            async function tryWakeLockAPI() {
                if (!('wakeLock' in navigator)) {
                    console.log('× Wake Lock API 不支持，降级到音频方案');
                    return false;
                }

                try {
                    wakeLock = await navigator.wakeLock.request('screen');
                    console.log('✓ 屏幕常亮已启用（Wake Lock API）');

                    // 监听 wake lock 释放事件
                    wakeLock.addEventListener('release', () => {
                        console.log('Wake Lock 已释放');
                    });

                    return true;
                } catch (err) {
                    console.log('× Wake Lock API 请求失败:', err.message, '- 降级到音频方案');
                    return false;
                }
            }

            // 方案2：降级方案 - 使用无声音频循环播放
            function useFallbackAudio() {
                try {
                    // 创建 AudioContext 生成无声音频
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();

                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    gainNode.gain.value = 0.001; // 几乎无声
                    oscillator.frequency.value = 20; // 低频，人耳几乎听不到
                    oscillator.start(0);

                    console.log('✓ 屏幕常亮已启用（Audio 降级方案）');

                    // 保存引用以便清理
                    fallbackAudio = { audioContext, oscillator, gainNode };
                } catch (err) {
                    console.warn('× 音频降级方案也失败:', err);
                }
            }

            // 重新获取 wake lock
            async function reacquireWakeLock() {
                if (!document.hidden && wakeLock !== null && wakeLock.released) {
                    try {
                        wakeLock = await navigator.wakeLock.request('screen');
                        console.log('✓ Wake Lock 已重新获取');
                    } catch (err) {
                        console.warn('重新获取 Wake Lock 失败:', err);
                    }
                }
            }

            // 初始化
            async function init() {
                const wakeLockSuccess = await tryWakeLockAPI();

                if (!wakeLockSuccess) {
                    // Wake Lock API 失败，使用降级方案
                    useFallbackAudio();
                } else {
                    // Wake Lock API 成功，监听页面可见性变化
                    document.addEventListener('visibilitychange', reacquireWakeLock);
                }
            }

            // 页面加载后启动
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', init);
            } else {
                init();
            }
        })();
    </script>

    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Microsoft YaHei", sans-serif;
            background: #000;
            color: #fff;
            overflow: hidden;
        }

        rtk-meeting {
            width: 100vw;
            height: 100vh;
        }

        /* 加载提示 */
        #loading {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 9999;
        }

        #loading.hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div id="loading">
        <div>正在加载直播...</div>
    </div>
    <rtk-ui-provider id="ui-provider">
        <rtk-meeting id="my-meeting"></rtk-meeting>
    </rtk-ui-provider>

    <!-- RealtimeKit UI Components (本地托管) - 使用 ES Module -->
    <script type="module">
        // 从不同的模块导入
        import { defineCustomElements } from '/vendor/realtimekit-ui/dist/esm/loader.js';
        import { extendConfig } from '/vendor/realtimekit-ui/dist/esm/index.js';

        // 定义 Web Components
        defineCustomElements();

        // 创建中文翻译函数
        const zhCNTranslator = window.createZhCNTranslator();

        // 使用 extendConfig 创建包含中文翻译的配置
        const uiConfig = extendConfig({
            // 这里可以添加其他UI配置
        });

        // 等待 DOM 加载完成
        document.addEventListener('DOMContentLoaded', async () => {
            const authToken = '{{ $authToken }}';
            const loadingEl = document.getElementById('loading');

            if (!authToken) {
                alert('无法加入直播:Token 缺失');
                window.location.href = '/wechat/live';
                return;
            }

            try {
                // 初始化 RealtimeKit Client
                const meeting = await RealtimeKitClient.init({
                    authToken,
                    defaults: {
                        audio: false, // 默认关闭观众音频
                        video: false, // 默认关闭观众视频
                    },
                });

                const meetingElement = document.getElementById('my-meeting');
                const providerElement = document.getElementById('ui-provider');

                // 配置 UI Provider - 只设置翻译和配置
                providerElement.config = uiConfig;
                providerElement.t = zhCNTranslator; // 设置中文翻译函数

                // 配置会议组件 - 只在这里设置 meeting (避免重复 join)
                meetingElement.showSetupScreen = false;
                meetingElement.config = uiConfig;
                meetingElement.t = zhCNTranslator;
                meetingElement.meeting = meeting; // 最后设置,触发 join

                // 隐藏加载提示
                loadingEl.classList.add('hidden');

                console.log('✓ 直播已就绪 (中文界面)');
            } catch (err) {
                console.error('初始化失败:', err);
                loadingEl.innerHTML = '<div style="color: #f00;">无法加入直播: ' + err.message + '</div>';
                setTimeout(() => {
                    window.location.href = '/wechat/live';
                }, 3000);
            }
        });
    </script>
</body>
</html>