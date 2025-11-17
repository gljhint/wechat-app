# 微信项目管理系统

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-10.x-FF2D20?style=flat-square&logo=laravel" alt="Laravel">
  <img src="https://img.shields.io/badge/PHP-8.1+-777BB4?style=flat-square&logo=php" alt="PHP">
  <img src="https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat-square&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License">
</p>

基于 Laravel 10 构建的微信管理系统，提供成员管理、学习打卡、端到端加密聊天、在线直播、文档分享等解决方案。

项目说明：该项目会使用到微信公众号登录，而使用公众号登录又要有已经备案的域名；流程是这样的：用户打开项目页面，会要求公众号登录，在管理后台可以看到所有登录的用户，后台认证用户身份（会给到相应的权限），才能正常进入项目，没有认证用户一律禁止访问。这样可以在微信中打开链接时系统自动完成登录 + 权限认证，进入页面就可以使用所有功能，老少皆可操作，学习成本低。

要注意的是，要有认证的公众号和备案的域名，公众号和域名（可以使用二级域名）不发敏感内容，这就是内部应用，公众号只是用来登录的，别人也不知道干什么，相对来说是安全的。

## ✨ 核心特性

### 🔐 端到端加密聊天
- **完全隐私保护**：采用 AES-256-CBC 加密，管理员无法查看聊天内容
- **私聊与群聊**：支持一对一私聊和群组聊天
- **多媒体消息**：文本、图片、视频、文件支持
- **群组管理**：群创建、解散、邀请、踢人、群头像自动生成
- **自动清理**：可配置聊天记录保留天数，自动清理过期消息

### 📖 学习打卡系统
- 每日学习任务发布（读经 + 灵修）
- 打卡记录与补打卡功能
- 打卡历史统计与查询
- 管理员可查看所有成员打卡情况

### 📺 在线直播会议
- 基于 **Cloudflare RealtimeKit** 的高质量音视频通话
- 模仿zoom会议
- 权限控制（按角色授权）
- 本地化优化（中文语言包 + 本地资源托管）


### 📁 文档管理
- 文档上传、下载、预览
- 标签分类管理
- 基于角色的可见性控制
- Cloudflare R2 对象存储（兼容 S3）

### 👥 完善的权限系统
- **6 种角色**：管理员、服侍组、成员组、准成员组、慕道组、外教会
- **双端权限分离**：微信端和后台管理端独立权限配置
- **细粒度控制**：支持功能级权限（如 `chat.view`, `live.create`）
- **角色可见性**：文档、直播可按角色设置可见范围

### 🛡️ 安全特性
- 端到端加密消息存储
- 权限中间件验证
- 微信 OAuth 认证
- 密钥派生机制（从 APP_KEY 派生对话密钥）

## 📋 系统要求

- **PHP** >= 8.1
- **MySQL** >= 8.0
- **Composer** >= 2.0
- **Node.js** >= 16.x（用于管理后台，已经编译好，可以不用安装）
- **微信公众号**（已认证）
- **Cloudflare R2 账号**（或其他 S3 兼容存储）
- **Cloudflare RealtimeKit 账号**（用于直播功能）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/gljhint/wechat-app.git
cd wechat-app
```

### 2. 安装依赖

```bash
# 安装 PHP 依赖
composer install

# 安装前端依赖 （可以不安装）
npm install
```

### 3. 环境配置

```bash
# 复制环境变量文件
cp .env.example .env

# 生成应用密钥（⚠️ 重要：此密钥用于加密聊天消息，一旦生成切勿修改！）
php artisan key:generate
```

**编辑 `.env` 文件，配置以下必要参数：**

```env
# 应用基础配置
APP_NAME=教会管理系统
APP_URL=https://your-domain.com

# 数据库配置
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# 微信公众号配置
WECHAT_OFFICIAL_ACCOUNT_APPID=your_appid
WECHAT_OFFICIAL_ACCOUNT_SECRET=your_secret
WECHAT_OFFICIAL_ACCOUNT_TOKEN=your_token
WECHAT_OFFICIAL_ACCOUNT_AES_KEY=your_aes_key

# Cloudflare R2 存储配置
FILESYSTEM_DISK=r2
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET=your_bucket_name
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
R2_URL=https://your-custom-domain.com

# Cloudflare RealtimeKit 直播配置
CLOUDFLARE_REALTIME_ORG_ID=your_org_id
CLOUDFLARE_REALTIME_API_KEY=your_api_key

# 聊天记录保留配置（可选）
CHAT_RETENTION_DAYS=90  # 保留 90 天，设为 0 永久保存
CHAT_AUTO_CLEANUP_ENABLED=true
CHAT_STORAGE_DISK=r2

```

### 4. 数据库迁移

```bash
# 运行迁移
php artisan migrate

# 运行种子文件（创建默认角色、权限和管理员账号）
php artisan db:seed
```
登录后台 `https://your-domain.com/admin/login`

**默认管理员账号：**
- 用户名：`admin`
- 密码：`admin123456`
- 邮箱：`admin@example.com`

⚠️ **请在首次登录后立即修改密码！**

### 5. 构建前端资源（已经编译好，可以不用安装）

```bash
# 开发模式（热重载）
npm run dev

# 生产模式（压缩优化）
npm run build
```

### 6. 启动开发服务器

```bash
php artisan serve
```

访问 `http://localhost:8000`

## 📖 详细文档

### 核心文档
- [安装部署指南](docs/INSTALLATION.md) - 从零开始部署系统
- [功能说明文档](docs/FEATURES.md) - 详细功能介绍和使用指南

### 技术文档
- [端到端加密原理](docs/CHAT_ENCRYPTION_README.md) - 聊天加密技术详解
- [直播功能集成](docs/REALTIMEKIT_INTEGRATION.md) - Cloudflare RealtimeKit 集成指南
- [文件上传功能](docs/FILE_UPLOAD_README.md) - 文件上传实现说明

### 功能模块文档
- [学习任务系统](docs/学习任务系统实现文档.md) - 打卡功能实现文档
- [权限系统说明](docs/BLADE_PERMISSIONS.md) - 权限控制详解
- [颂主圣诗功能](docs/SONGS_README.md) - 圣诗模块说明

## 🏗️ 技术架构

### 后端
- **框架**：Laravel 10.x
- **数据库**：MySQL 8.0+
- **缓存/队列**：Redis
- **对象存储**：Cloudflare R2（兼容 S3 API）
- **音视频**：Cloudflare RealtimeKit

### 前端
- **模板引擎**：Blade
- **UI 框架**：Tailwind CSS + WeUI
- **组件库**：Vue 3 + Headless UI
- **构建工具**：Vite
- **HTTP 客户端**：Axios

### 核心依赖
```json
{
  "overtrue/laravel-wechat": "^7.3",      // 微信 SDK
  "league/flysystem-aws-s3-v3": "^3.0",   // S3 存储
  "intervention/image": "^3.11",          // 图片处理
  "@cloudflare/realtimekit": "^1.2.0",    // 直播核心
  "@cloudflare/realtimekit-ui": "^1.0.6"  // 直播 UI
}
```

## 🗂️ 项目结构

```
weixin-app/
├── app/
│   ├── Console/
│   │   ├── Commands/
│   │   │   └── CleanupChatMessages.php      # 聊天记录清理命令
│   │   └── Kernel.php                       # 定时任务配置
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/                       # 后台管理控制器
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── LiveController.php
│   │   │   │   ├── MessageController.php
│   │   │   │   └── ...
│   │   │   └── WeChat/                      # 微信端控制器
│   │   │       ├── ChatController.php
│   │   │       ├── LiveController.php
│   │   │       ├── CheckinController.php
│   │   │       └── ...
│   │   └── Middleware/
│   │       ├── Authenticate.php
│   │       ├── CheckUserRole.php            # 角色验证中间件
│   │       └── CheckWechatPermission.php    # 权限验证中间件
│   ├── Models/                              # 数据模型
│   │   ├── WechatUser.php
│   │   ├── ChatMessage.php
│   │   ├── LiveStream.php
│   │   └── ...
│   └── Services/                            # 业务服务层
│       ├── CloudflareRealtimeService.php    # 直播服务
│       ├── ChatEncryptionService.php        # 加密服务
│       └── GroupAvatarService.php           # 群头像生成
├── config/
│   ├── chat.php                             # 聊天配置
│   ├── live.php                             # 直播权限配置
│   ├── easywechat.php                       # 微信配置
│   ├── songs349.php                         # 圣诗配置
│   └── ...
├── database/
│   └── migrations/                          # 数据库迁移文件
├── resources/
│   └── views/
│       ├── admin/                           # 后台管理界面
│       └── wechat/                          # 微信端界面
├── routes/
│   ├── web.php                              # 微信端路由
│   └── admin.php                            # 后台管理路由
└── public/
    ├── vendor/realtimekit/                  # 本地化直播资源
    └── ...
```

## ⚙️ 核心功能配置

### 聊天记录保留策略

在 `config/chat.php` 或 `.env` 中配置：

```php
// 保留 90 天
CHAT_RETENTION_DAYS=90

// 永久保存
CHAT_RETENTION_DAYS=0

// 启用自动清理
CHAT_AUTO_CLEANUP_ENABLED=true
```

### 角色权限配置

系统内置 6 种角色：

| 角色 | 代码 | 权限级别 |
|------|------|----------|
| 管理员 | `admin` | 最高权限 |
| 服侍组 | `ministry` | 高级权限 |
| 成员组 | `member` | 标准权限 |
| 准成员组 | `pre_member` | 受限权限 |
| 慕道组 | `seeker` | 基础权限 |
| 外教会 | `external` | 基础权限 |


## 🔧 常用命令

```bash
# 数据库迁移
php artisan migrate

# 清理聊天记录（手动触发）
php artisan chat:cleanup-messages

# 查看队列任务
php artisan queue:work

# 清除缓存
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# 重新构建前端资源
npm run build
```

## ⚠️ 重要安全提示

### 1. APP_KEY 备份
端到端加密依赖 `APP_KEY` 派生密钥，**APP_KEY 一旦丢失或变更，所有历史加密消息将永久无法解密！**

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🙏 致谢

- [Laravel](https://laravel.com/) - 优雅的 PHP 框架
- [EasyWeChat](https://easywechat.com/) - 微信 SDK
- [Cloudflare RealtimeKit](https://realtime.cloudflare.com/) - 音视频服务
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [WeUI](https://weui.io/) - 微信官方 UI 库

## 📧 联系方式

- Email: gljhint@gmail.com

---

