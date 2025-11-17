# Cloudflare RealtimeKit 集成指南


## 📋 前置准备

### 1. 注册  Cloudflare RealtimeKit 

访问 https://dash.realtime.cloudflare.com/  创建 API Keys，得到 
Organization ID 和 API Key

### 2. 配置环境变量

在 `.env` 文件中添加:

```bash
CLOUDFLARE_REALTIME_ORG_ID=your_org_id
CLOUDFLARE_REALTIME_API_KEY=your_api_key
```

RealtimeKit 的费用方面还没有确定，现在是 Beta 阶段，后期如果费用高，会改为使用 Realtime SFU 和 TURN Service，这都有免费额度，一般是够用。
---

