# 聊天文件上传功能 - 使用说明

## 功能概述

支持在微信端聊天中上传**图片**和**文件**,所有文件存储到 **Cloudflare R2** 云存储,URL自动加密保护隐私。

## 🎯 支持的功能

1. ✅ **图片上传** - 支持 JPG, PNG, GIF, WEBP,最大10MB
2. ✅ **文件上传** - 支持 PDF, DOC, XLS, ZIP等,最大50MB
3. ✅ **自动压缩** - 图片超过1920px自动缩放压缩
4. ✅ **加密存储** - URL加密存储,保护隐私
5. ✅ **图片预览** - 点击图片全屏查看
6. ✅ **文件下载** - 点击文件直接下载
7. ✅ **上传进度** - 实时显示上传百分比

## 📁 文件结构

### 后端文件

1. **[app/Services/FileUploadService.php](app/Services/FileUploadService.php)** - 文件上传服务
   - `uploadImage()` - 上传图片到R2
   - `uploadFile()` - 上传文件到R2
   - `uploadFromWechatMedia()` - 从微信临时素材上传
   - `deleteFile()` - 删除R2文件

2. **[app/Http/Controllers/WeChat/ChatController.php](app/Http/Controllers/WeChat/ChatController.php)** - 新增3个接口
   - `uploadImage()` - POST `/wechat/chat/upload/image`
   - `uploadFile()` - POST `/wechat/chat/upload/file`
   - `uploadFromWechat()` - POST `/wechat/chat/upload/wechat`

3. **[routes/web.php](routes/web.php)** - 路由配置
   ```php
   Route::post('/chat/upload/image', [ChatController::class, 'uploadImage']);
   Route::post('/chat/upload/file', [ChatController::class, 'uploadFile']);
   Route::post('/chat/upload/wechat', [ChatController::class, 'uploadFromWechat']);
   ```

4. **[app/Models/ChatMessage.php](app/Models/ChatMessage.php)** - 修复加密逻辑
   - `boot()` - 自动加密 `media_url`
   - `isBase64()` - 检测是否已加密

### 前端文件

1. **[resources/views/wechat/chat-conversation.blade.php](resources/views/wechat/chat-conversation.blade.php)**
   - 新增"+"按钮 - 触发上传选项
   - 上传进度条
   - 图片/文件显示样式
   - JavaScript上传逻辑

## 🚀 使用方式


用户点击输入框旁边的 **"+"** 按钮,选择:
- **发送图片** - 从手机相册选择图片
- **发送文件** - 从文件管理器选择文件

#### 上传流程:
```
1. 用户选择文件
   ↓
2. 前端验证(大小、类型)
   ↓
3. 上传到服务器 (显示进度)
   ↓
4. 服务器上传到R2 (自动压缩图片)
   ↓
5. URL自动加密存储
   ↓
6. 发送聊天消息
   ↓
7. 对方接收并解密显示
```


## 🔐 加密机制

### URL加密过程:

```php
// 1. 上传到R2,获取明文URL
$url = "https://r2.example.com/chat/images/2025/10/30/1/abc123.jpg";

// 2. 使用Laravel Crypt加密
$encryptedUrl = Crypt::encryptString($url);
// 结果: "eyJpdiI6IkNwdlNST2M5SnZBSUl..."

// 3. 存储到数据库
$message->media_url = $encryptedUrl;
$message->is_encrypted = true;
```

### URL解密过程:

```php
// 1. 从数据库读取
$encryptedUrl = $message->media_url;

// 2. ChatMessageResource自动解密
$decryptedUrl = $message->getDecryptedMediaUrl();
// 结果: "https://r2.example.com/chat/images/..."

// 3. 返回给前端
return ['media_url' => $decryptedUrl];
```

### 安全特性:

- ✅ **数据库存储密文** - 数据库泄露也无法直接访问文件
- ✅ **API返回明文** - 前端可正常使用
- ✅ **自动加解密** - 对开发者透明
- ✅ **基于APP_KEY** - 密钥管理安全