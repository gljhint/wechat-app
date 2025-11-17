# 安装部署指南

本文档详细介绍微信管理系统的安装和部署流程，包括开发环境、测试环境和生产环境的配置。

## 📋 目录

- [环境要求](#环境要求)
- [开发环境安装](#开发环境安装)
- [生产环境部署](#生产环境部署)
- [微信公众号配置](#微信公众号配置)
- [Cloudflare 服务配置](#cloudflare-服务配置)
- [常见问题](#常见问题)

## 环境要求

### 基础环境
- **PHP** >= 8.1
  - 必需扩展：OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath, Fileinfo, GD
- **MySQL** >= 8.0 或 MariaDB >= 10.3
- **Composer** >= 2.0
- **Node.js** >= 16.x
- **npm** >= 8.x 或 **yarn** >= 1.22

### 可选但推荐
- **Redis** >= 5.0（用于缓存和队列）
- **Nginx** >= 1.18 或 **Apache** >= 2.4

### 第三方服务
- **微信公众号**（已认证，用于用户登录）
- **Cloudflare R2**（对象存储，可替换为 AWS S3）
- **Cloudflare RealtimeKit**（音视频服务）

---

## 开发环境安装

### 1. 克隆项目

```bash
git clone https://github.com/gljhint/wechat-app.git
cd wechat-app
```

### 2. 安装 PHP 依赖

```bash
composer install
```


### 3. 安装前端依赖

```bash
npm install

# 或使用 yarn
yarn install
```

### 4. 环境变量配置

#### 4.1 复制环境变量文件

```bash
cp .env.example .env
```

#### 4.2 生成应用密钥

```bash
php artisan key:generate
```

> **⚠️ 重要警告**：生成的 `APP_KEY` 用于加密聊天消息，**请务必备份此密钥！** 一旦丢失或修改，所有历史加密消息将永久无法解密！

#### 4.3 配置数据库

编辑 `.env` 文件：

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
```

#### 4.4 配置微信公众号（详见[微信公众号配置](#微信公众号配置)）

```env
WECHAT_OFFICIAL_ACCOUNT_APPID=wxxxxxxxxxxxxxxxxxxx
WECHAT_OFFICIAL_ACCOUNT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WECHAT_OFFICIAL_ACCOUNT_TOKEN=your_custom_token
WECHAT_OFFICIAL_ACCOUNT_AES_KEY=your_aes_key_43_chars
```

#### 4.5 配置 Cloudflare R2 存储

```env
FILESYSTEM_DISK=r2

R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET=your-bucket-name
R2_ENDPOINT=https://xxxxxxxxxxxxxxxx.r2.cloudflarestorage.com
R2_URL=https://your-custom-domain.com  # 自定义域名（可选）
```

#### 4.6 配置 Cloudflare RealtimeKit 直播

```env
CLOUDFLARE_REALTIME_ORG_ID=your-organization-id
CLOUDFLARE_REALTIME_API_KEY=your-api-key
```

### 5. 数据库初始化


#### 5.1 运行迁移

```bash
php artisan migrate
```

#### 5.2 运行种子文件（创建默认角色、权限和管理员）

```bash
php artisan db:seed
```

**创建的默认管理员账号：**
- 用户名：`admin`
- 密码：`admin123456`
- 邮箱：`admin@example.com`

⚠️ **重要提示**：
- 请在首次登录后立即修改密码
- 生产环境部署后必须更改默认密码
- 建议使用强密码（至少 12 位，包含大小写字母、数字和符号）

登录后台 `https://your-domain.com/admin/login`

### 6. 构建前端资源

```bash
# 开发模式（热重载）
npm run dev

# 生产模式（压缩优化）
npm run build
```

### 7. 创建存储链接

```bash
php artisan storage:link
```

### 8. 启动开发服务器

```bash
php artisan serve
```

访问 `http://localhost:8000`

### 9. 启动队列监听（可选）

另开一个终端窗口：

```bash
php artisan queue:work
```

---


## 微信公众号配置

### 1. 注册微信公众号

1. 访问 [微信公众平台](https://mp.weixin.qq.com/)
2. 注册服务号（需要企业认证）
3. 完成认证流程

### 2. 获取配置参数

登录公众号后台，进入「开发」-「基本配置」：

- **AppID**：开发者ID
- **AppSecret**：开发者密码
- **Token**：自定义（建议使用随机字符串）
- **EncodingAESKey**：消息加密密钥（点击随机生成）

### 3. 配置服务器地址

在「基本配置」中设置服务器配置：

- **URL**：`https://your-domain.com/wechat/serve`
- **Token**：与 `.env` 中 `WECHAT_OFFICIAL_ACCOUNT_TOKEN` 一致
- **EncodingAESKey**：与 `.env` 中 `WECHAT_OFFICIAL_ACCOUNT_AES_KEY` 一致
- **消息加密方式**：选择「安全模式（推荐）」

点击「提交」验证。

### 4. 配置 OAuth 回调域名

在「网页授权域名」中添加：

```
your-domain.com
```

**注意**：不要加 `https://` 和后缀路径。

### 5. 配置 JS 接口安全域名

在「JS 接口安全域名」中添加：

```
your-domain.com
```

---

## Cloudflare 服务配置

### 1. Cloudflare R2 存储

#### 1.1 创建 R2 存储桶

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入「R2」服务
3. 点击「Create bucket」
4. 输入存储桶名称（如 `weixin-app-files`）

#### 1.2 生成 API Token

1. 进入「R2」-「Manage R2 API Tokens」
2. 点击「Create API Token」
3. 设置权限：`Object Read & Write`
4. 复制 `Access Key ID` 和 `Secret Access Key`

#### 1.3 配置自定义域名（可选）

1. 在存储桶设置中点击「Connect domain」
2. 输入自定义域名（如 `files.your-domain.com`）
3. 按提示添加 DNS 记录

#### 1.4 更新 .env 配置

```env
R2_ACCESS_KEY_ID=your_access_key_id
R2_SECRET_ACCESS_KEY=your_secret_access_key
R2_BUCKET=weixin-app-files
R2_ENDPOINT=https://xxxxxx.r2.cloudflarestorage.com
R2_URL=https://files.your-domain.com
```

### 2. Cloudflare RealtimeKit

#### 2.1 创建 Organization

1. 访问 [Cloudflare RealtimeKit Dashboard](https://dash.realtime.cloudflare.com/)
2. 创建新的 Organization

#### 2.2 生成 API Key

1. 进入「Developer Portal」
2. 生成 API Key
3. 复制 `Organization ID` 和 `API Key`

#### 2.3 更新 .env 配置

```env
CLOUDFLARE_REALTIME_ORG_ID=your-organization-id
CLOUDFLARE_REALTIME_API_KEY=your-api-key
```

---

## 常见问题

### 1. 聊天消息无法解密

**原因**：`APP_KEY` 被修改或丢失。

**解决方案**：
- 从备份恢复原 `APP_KEY`
- 如果无备份，历史消息将永久无法解密


### 2. 文件上传失败

**原因**：
- R2 配置错误
- PHP 文件大小限制

**解决方案**：
- 检查 R2 配置是否正确
- 调整 `php.ini` 中 `upload_max_filesize` 和 `post_max_size`
- 检查 Nginx 的 `client_max_body_size`


---

## 下一步

安装完成后，请参考以下文档：

- [功能说明文档](FEATURES.md) - 了解系统功能
- [端到端加密原理](CHAT_ENCRYPTION_README.md) - 理解加密机制
- [直播功能集成](REALTIMEKIT_INTEGRATION.md) - 直播功能详解

---
