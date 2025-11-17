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