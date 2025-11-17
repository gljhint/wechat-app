# 颂主圣诗功能使用说明

## 功能概述
已成功将"颂主圣诗"功能集成到微信端应用中，包含349首圣诗歌曲的展示、搜索和播放功能。

## 文件结构

### 1. 视图文件
- `resources/views/wechat/songs-index.blade.php` - 歌曲列表页面
- `resources/views/wechat/songs-show.blade.php` - 歌曲详情页面

### 2. 控制器
- `app/Http/Controllers/WeChat/SongController.php` - 歌曲业务逻辑处理

### 3. 配置文件
- `config/songs349.php` - 歌曲数据文件（来自原 songs.php）
- `config/app.php` - 添加了 `song_base_url` 配置项

### 4. 路由
- `/wechat/songs` - 歌曲列表
- `/wechat/songs/{id}` - 歌曲详情
- `/wechat/songs/api/search` - 搜索API

## 主要功能

### 1. 歌曲列表
- **两种视图模式**：
  - 序号列表：紧凑型网格布局，每行显示4个序号
  - 详细列表：完整显示序号和歌曲标题
- **实时搜索**：支持按歌曲序号或标题搜索
- **响应式设计**：自动适配不同屏幕尺寸

### 2. 歌曲详情
- **歌词图片展示**：
  - 支持单图或多图展示
  - 多图时显示页码指示器（如 1/2）
  - 点击图片可放大预览（使用微信JS-SDK）
- **音频播放**：
  - 内置HTML5音频播放器
  - 支持播放控制（播放/暂停/进度条/音量）
- **返回导航**：快速返回列表页面

### 3. 微信功能集成
- **图片预览**：使用微信JS-SDK实现原生图片预览体验
- **分享功能**：预留了微信分享接口（需配置）

## 配置说明

### 环境变量配置
在 `.env` 文件中添加：

```env
# 颂主圣诗资源地址
SONG_BASE_URL=https://fuyin.xiangbolin.com/songzhu/

# 微信公众号配置（如果还没配置的话）
WECHAT_OFFICIAL_ACCOUNT_APPID=your_app_id
WECHAT_OFFICIAL_ACCOUNT_SECRET=your_app_secret
```

### 微信JS-SDK配置
控制器中已实现JS-SDK签名逻辑，但需要确保：
1. 微信公众号的 `app_id` 和 `secret` 已正确配置
2. 在微信公众平台设置JS接口安全域名
3. 已添加IP白名单

## 数据结构

歌曲数据格式（`config/songs349.php`）：

```php
$songs = array(
    1 => array(
        'title' => '圣哉、圣哉、圣哉',
        'image' => 'lyric/1.圣哉、圣哉、圣哉.jpg',  // 单图
        'mp3' => 'mp3/1.圣哉、圣哉、圣哉.mp3'     // 可选
    ),
    94 => array(
        'title' => '我曾漂流',
        'image' => ['lyric/94.我曾漂流1.jpg','lyric/94.我曾漂流2.jpg']  // 多图
    ),
);
```

## 访问路径

### 用户访问
1. 打开微信应用
2. 点击底部导航 "发现"
3. 点击 "颂主圣诗" 菜单
4. 选择歌曲查看详情

### 直接访问
- 列表页：`https://your-domain.com/wechat/songs`
- 详情页：`https://your-domain.com/wechat/songs/1`（数字为歌曲序号）

## 权限设置
目前所有登录用户都可以访问此功能。如需限制权限，可以在路由中添加权限中间件：

```php
Route::prefix('songs')->name('songs.')
    ->middleware('check.permission:songs.view')  // 添加权限检查
    ->group(function () {
        // ...
    });
```

## 性能优化
- **数据缓存**：歌曲数据自动缓存3600秒（1小时）
- **Access Token缓存**：微信access_token缓存7000秒
- **懒加载**：图片按需加载，提高首屏速度

## 注意事项

### 1. 资源文件路径
确保以下资源文件可以访问：
- 歌词图片：`https://fuyin.xiangbolin.com/songzhu/lyric/*.jpg`
- 音频文件：`https://fuyin.xiangbolin.com/songzhu/mp3/*.mp3`

### 2. 微信环境
- 图片预览功能只在微信环境下生效
- 非微信环境会降级处理

### 3. 浏览器兼容
- 音频播放器使用HTML5标准，支持所有现代浏览器
- 建议使用MP3格式音频以获得最佳兼容性

## 问题排查

### 1. 页面404错误
```bash
# 清除路由缓存
php artisan route:clear

# 检查路由是否注册
php artisan route:list | grep songs
```

### 2. 数据不显示
```bash
# 清除配置和应用缓存
php artisan config:clear
php artisan cache:clear

# 检查数据文件是否存在
ls -la config/songs349.php
```

### 3. 微信JS-SDK报错
- 检查微信公众号配置是否正确
- 确认域名已在微信公众平台添加
- 查看浏览器控制台的错误信息

### 4. 图片或音频无法加载
- 检查 `SONG_BASE_URL` 配置是否正确
- 确认资源服务器允许跨域访问
- 检查文件路径是否正确


## 技术栈
- Laravel 10.x
- Blade模板引擎
- WeUI样式框架
- 微信JS-SDK 1.6.0
- HTML5 Audio API
