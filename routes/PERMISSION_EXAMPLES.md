# 微信端权限控制使用示例

## 1. 基础用法：在路由中应用权限

```php
// web.php

// 方式1：使用中间件参数指定权限
Route::middleware(['check.permission:chat.send'])->group(function () {
    Route::post('/chat/send', [ChatController::class, 'sendMessage']);
});

// 方式2：单个路由添加权限
Route::post('/chat/groups', [ChatGroupController::class, 'createGroup'])
    ->middleware('check.permission:chat.group.create');

// 方式3：整个分组添加权限
Route::middleware(['check.permission:live.create'])->group(function () {
    Route::get('/live/create', [LiveController::class, 'createForm']);
    Route::post('/live/create', [LiveController::class, 'create']);
});
```

## 2. 控制器中检查权限

```php
// ChatController.php

use App\Models\WechatUser;
use Illuminate\Support\Facades\Session;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        $user = WechatUser::find($userId);

        // 检查单个权限
        if (!$user->hasPermission('chat.send')) {
            return response()->json(['error' => '您没有发送消息的权限'], 403);
        }

        // 检查任意权限
        if (!$user->hasAnyPermission(['chat.send', 'chat.group.send'])) {
            return response()->json(['error' => '您没有发送权限'], 403);
        }

        // 检查所有权限
        if (!$user->hasAllPermissions(['chat.view', 'chat.send'])) {
            return response()->json(['error' => '权限不足'], 403);
        }

        // 业务逻辑...
    }
}
```

## 3. Blade模板中检查权限

```php
// chat.blade.php

@php
    $user = session('wechat_user');
@endphp

<!-- 根据权限显示/隐藏功能 -->
@if($user && $user->hasPermission('chat.send'))
    <button onclick="sendMessage()">发送消息</button>
@else
    <p class="text-gray-500">您没有发送消息的权限</p>
@endif

@if($user && $user->hasPermission('chat.group.create'))
    <a href="/chat/create-group">创建群聊</a>
@endif

@if($user && $user->isAdmin())
    <div class="admin-panel">管理员面板</div>
@endif
```

## 4. 已定义的权限列表

### 聊天功能 (chat)
- `chat.view` - 查看聊天
- `chat.send` - 发送消息
- `chat.group.create` - 创建群聊
- `chat.group.manage` - 管理群聊
- `chat.group.announce` - 发布群公告

### 直播功能 (live)
- `live.view` - 观看直播
- `live.comment` - 直播评论
- `live.create` - 发起直播
- `live.manage` - 管理直播

### 文档功能 (document)
- `document.view` - 查看文档
- `document.download` - 下载文档
- `document.upload` - 上传文档
- `document.manage` - 管理文档

### 打卡功能 (checkin)
- `checkin.daily` - 每日打卡
- `checkin.view` - 查看打卡记录
- `checkin.view.others` - 查看他人打卡

### 个人中心 (profile)
- `profile.view` - 查看个人资料
- `profile.edit` - 编辑个人资料

### 系统功能 (system)
- `system.settings` - 系统设置

## 5. 推荐的权限配置方案

### 管理员 (admin)
✓ 所有权限（默认）

### 服侍组 (ministry)
```
✓ 所有聊天功能
✓ 发起直播、管理直播
✓ 上传文档、管理文档
✓ 查看他人打卡
```

### 成员组 (member)
```
✓ 查看聊天、发送消息、创建群聊
✓ 观看直播、评论
✓ 查看文档、下载文档
✓ 每日打卡
```

### 准成员组 (pre_member)
```
✓ 查看聊天、发送消息
✓ 观看直播、评论
✓ 查看文档、下载文档
✓ 每日打卡
```

### 慕道组 (seeker)
```
✓ 查看聊天
✓ 观看直播
✓ 查看文档
```

### 外教会 (external)
```
✓ 查看聊天
✓ 观看直播
✓ 查看文档
```

## 6. 实际应用示例

```php
// routes/web.php

Route::prefix('wechat')->middleware(['check.role'])->group(function () {

    // 聊天功能 - 需要查看权限
    Route::get('/chat', [ChatController::class, 'index'])
        ->middleware('check.permission:chat.view');

    // 发送消息 - 需要发送权限
    Route::post('/chat/send', [ChatController::class, 'sendMessage'])
        ->middleware('check.permission:chat.send');

    // 创建群聊 - 需要创建群聊权限
    Route::post('/chat/groups', [ChatGroupController::class, 'createGroup'])
        ->middleware('check.permission:chat.group.create');

    // 发起直播 - 需要发起直播权限
    Route::post('/live/create', [LiveController::class, 'create'])
        ->middleware('check.permission:live.create');

    // 上传文档 - 需要上传文档权限
    Route::post('/documents/upload', [DocumentController::class, 'upload'])
        ->middleware('check.permission:document.upload');
});
```

## 7. 注意事项

1. **管理员自动拥有所有权限**，无需配置
2. **没有角色的用户会被拦截**到"无权限页面"
3. **权限中间件可以叠加使用**
4. **修改权限后立即生效**，无需用户重新登录
5. **在后台配置权限**：访问 `/admin/wechat-roles`
