# Blade 权限检查指令使用文档

## 概述

在微信端视图中，我们提供了一套自定义 Blade 指令来检查用户权限，方便在前端隐藏用户没有权限访问的按钮和功能。

---

## 可用的 Blade 指令

### 1. `@wechatCan` - 检查单个权限

检查用户是否拥有某个权限，如果有则显示内容。

**语法：**
```blade
@wechatCan('permission.name')
    <!-- 有权限时显示的内容 -->
@endwechatCan
```

**示例：**
```blade
@wechatCan('chat.send')
<button onclick="sendMessage()">发送消息</button>
@endwechatCan

@wechatCan('document.upload')
<a href="/upload">上传文档</a>
@endwechatCan
```

---

### 2. `@wechatCanAny` - 检查多个权限（或）

检查用户是否拥有**任意一个**权限，只要有其中一个就显示内容。

**语法：**
```blade
@wechatCanAny(['permission1', 'permission2', 'permission3'])
    <!-- 拥有任意一个权限时显示的内容 -->
@endwechatCanAny
```

**示例：**
```blade
@wechatCanAny(['chat.send', 'chat.group.create'])
<div class="new-chat-btn" onclick="showMenu()">+</div>
@endwechatCanAny

@wechatCanAny(['document.upload', 'document.manage'])
<button>管理文档</button>
@endwechatCanAny
```

---

### 3. `@wechatCanAll` - 检查多个权限（且）

检查用户是否拥有**所有**权限，必须同时拥有所有权限才显示内容。

**语法：**
```blade
@wechatCanAll(['permission1', 'permission2', 'permission3'])
    <!-- 拥有所有权限时显示的内容 -->
@endwechatCanAll
```

**示例：**
```blade
@wechatCanAll(['chat.group.manage', 'chat.group.announce'])
<button>高级群管理</button>
@endwechatCanAll

@wechatCanAll(['live.create', 'live.manage'])
<button>创建并管理直播</button>
@endwechatCanAll
```

---

### 4. `@wechatCannot` - 检查没有权限

检查用户是否**没有**某个权限，如果没有则显示内容（与 `@wechatCan` 相反）。

**语法：**
```blade
@wechatCannot('permission.name')
    <!-- 没有权限时显示的内容 -->
@endwechatCannot
```

**示例：**
```blade
@wechatCannot('chat.send')
<div class="tip">您没有发送消息的权限，请联系管理员</div>
@endwechatCannot

@wechatCannot('live.create')
<button disabled>您无法创建直播</button>
@endwechatCannot
```

---

## 完整示例

### 示例 1：聊天页面的新建按钮

```blade
<!-- 只有拥有发送消息或创建群聊权限的用户才显示新建按钮 -->
@wechatCanAny(['chat.send', 'chat.group.create'])
<div class="new-chat-btn" id="newChatBtn" onclick="showNewChatMenu()">
    +
</div>
@endwechatCanAny

<!-- 新建菜单 -->
<div id="newChatMenu" class="weui-actionsheet">
    <div class="weui-actionsheet__menu">
        <!-- 只有拥有发送消息权限的用户才显示"发起私聊"选项 -->
        @wechatCan('chat.send')
        <div class="weui-actionsheet__cell" onclick="newPrivateChat()">
            <span class="action-icon">💬</span> 发起私聊
        </div>
        @endwechatCan

        <!-- 只有拥有创建群聊权限的用户才显示"创建群聊"选项 -->
        @wechatCan('chat.group.create')
        <div class="weui-actionsheet__cell" onclick="newGroupChat()">
            <span class="action-icon">👥</span> 创建群聊
        </div>
        @endwechatCan
    </div>
</div>
```

---

### 示例 2：群聊详情页面

```blade
<!-- 普通成员可以查看群信息 -->
@wechatCan('chat.view')
<div class="group-info">
    <h3>{{ $group->name }}</h3>
    <p>成员：{{ $group->members_count }} 人</p>
</div>
@endwechatCan

<!-- 只有管理员可以邀请成员 -->
@wechatCan('chat.group.manage')
<button onclick="inviteMembers()">邀请成员</button>
@endwechatCan

<!-- 只有有发布公告权限的用户可以发布群公告 -->
@wechatCan('chat.group.announce')
<button onclick="publishAnnouncement()">发布公告</button>
@endwechatCan

<!-- 只有管理员可以解散群聊 -->
@wechatCan('chat.group.manage')
<button class="danger" onclick="disbandGroup()">解散群聊</button>
@endwechatCan
```

---

### 示例 3：文档管理页面

```blade
<!-- 所有人都可以查看文档列表 -->
@wechatCan('document.view')
<div class="document-list">
    @foreach($documents as $doc)
        <div class="document-item">
            <h4>{{ $doc->title }}</h4>

            <!-- 有下载权限才显示下载按钮 -->
            @wechatCan('document.download')
            <button onclick="download({{ $doc->id }})">下载</button>
            @endwechatCan

            <!-- 有管理权限才显示编辑和删除按钮 -->
            @wechatCan('document.manage')
            <button onclick="edit({{ $doc->id }})">编辑</button>
            <button onclick="delete({{ $doc->id }})">删除</button>
            @endwechatCan
        </div>
    @endforeach
</div>
@endwechatCan

<!-- 有上传权限才显示上传按钮 -->
@wechatCan('document.upload')
<button class="upload-btn" onclick="showUploadDialog()">上传文档</button>
@endwechatCan
```

---

### 示例 4：直播页面

```blade
<!-- 所有人都可以观看直播列表 -->
@wechatCan('live.view')
<div class="live-list">
    @foreach($streams as $stream)
        <div class="live-item" onclick="viewStream({{ $stream->id }})">
            <h4>{{ $stream->title }}</h4>
            <span class="viewers">{{ $stream->viewers }} 人在线</span>
        </div>
    @endforeach
</div>
@endwechatCan

<!-- 有评论权限才显示评论区 -->
@wechatCan('live.comment')
<div class="comment-section">
    <input type="text" placeholder="发表评论..." />
    <button onclick="sendComment()">发送</button>
</div>
@endwechatCan

<!-- 有创建直播权限才显示创建按钮 -->
@wechatCan('live.create')
<button class="create-live-btn" onclick="createLive()">
    发起直播
</button>
@endwechatCan
```

---

### 示例 5：个人中心页面

```blade
@wechatCan('profile.view')
<div class="profile-info">
    <img src="{{ $user->avatar }}" alt="头像">
    <h3>{{ $user->nickname }}</h3>
    <p>{{ $user->role_name }}</p>
</div>
@endwechatCan

@wechatCan('profile.edit')
<button onclick="editProfile()">编辑资料</button>
@endwechatCan

@wechatCannot('profile.edit')
<p class="tip">您无法编辑个人资料</p>
@endwechatCannot
```

---

### 示例 6：组合使用

```blade
<!-- 必须同时拥有创建和管理权限 -->
@wechatCanAll(['live.create', 'live.manage'])
<button>高级直播控制</button>
@endwechatCanAll

<!-- 拥有任意一个管理权限 -->
@wechatCanAny(['chat.group.manage', 'document.manage', 'live.manage'])
<a href="/admin-panel">管理面板</a>
@endwechatCanAny

<!-- 检查是否没有某个权限 -->
@wechatCannot('chat.send')
<div class="alert">
    您当前没有发送消息的权限，如需开通请联系管理员
</div>
@endwechatCannot
```

---

## 系统权限列表

### 聊天功能 (chat.*)
- `chat.view` - 查看聊天
- `chat.send` - 发送消息
- `chat.group.create` - 创建群聊
- `chat.group.manage` - 管理群聊
- `chat.group.announce` - 发布群公告

### 打卡功能 (checkin.*)
- `checkin.daily` - 每日打卡
- `checkin.view` - 查看打卡记录
- `checkin.view.others` - 查看他人打卡

### 文档功能 (document.*)
- `document.view` - 查看文档
- `document.download` - 下载文档
- `document.upload` - 上传文档
- `document.manage` - 管理文档

### 直播功能 (live.*)
- `live.view` - 观看直播
- `live.comment` - 直播评论
- `live.create` - 发起直播
- `live.manage` - 管理直播

### 个人中心 (profile.*)
- `profile.view` - 查看个人资料
- `profile.edit` - 编辑个人资料

### 系统功能 (system.*)
- `system.settings` - 系统设置

---

## 注意事项

### 1. **性能优化**

为了避免每次都查询数据库，View Composer 会自动将当前用户注入到所有 `wechat.*` 视图中，变量名为 `$currentUser`。

### 2. **权限缓存**

用户权限会在登录时加载，但如果管理员在后台修改了权限，需要用户重新登录才能生效。

### 3. **前后端一致性**

- **前端权限检查**：只是隐藏按钮，提升用户体验
- **后端权限验证**：真正的安全保障，在路由中使用中间件

**务必确保前后端权限检查一致！**

### 4. **嵌套使用**

可以嵌套使用权限指令：

```blade
@wechatCan('chat.view')
    <div class="chat-container">
        @wechatCan('chat.send')
            <button>发送</button>
        @endwechatCan

        @wechatCan('chat.group.create')
            <button>创建群聊</button>
        @endwechatCan
    </div>
@endwechatCan
```

---

## 实现原理

这些 Blade 指令定义在 `App\Providers\AppServiceProvider` 中：

```php
// 注册 Blade 指令
Blade::if('wechatCan', function ($permission) {
    $userId = Session::get('wechat_user_id');
    if (!$userId) return false;

    $user = WechatUser::find($userId);
    return $user && $user->hasPermission($permission);
});
```

每个指令都会：
1. 从 Session 获取当前用户 ID
2. 查询用户信息
3. 调用 `WechatUser` 模型的权限检查方法
4. 返回布尔值决定是否显示内容

---

## 常见问题

### Q1: 为什么我的权限指令不生效？

**A:** 检查以下几点：
1. 确保 `AppServiceProvider` 已注册（默认已注册）
2. 清除视图缓存：`php artisan view:clear`
3. 确保用户已登录并有 Session
4. 检查权限名称是否正确（区分大小写）

### Q2: 如何调试权限问题？

**A:** 在视图中临时添加：
```blade
@if(isset($currentUser))
    <p>当前用户：{{ $currentUser->nickname }}</p>
    <p>角色：{{ $currentUser->role }}</p>
    <p>权限：{{ implode(', ', $currentUser->permissionSlugs()) }}</p>
@else
    <p>未登录</p>
@endif
```

### Q3: 能否在控制器中使用这些方法？

**A:** 可以！在控制器中直接使用：
```php
$user = WechatUser::find($userId);
if ($user->hasPermission('chat.send')) {
    // 有权限
}
```

---

## 总结

使用这些 Blade 指令，你可以轻松地在视图层面根据用户权限控制界面元素的显示，提升用户体验。记住：

- ✅ 前端隐藏按钮 - 用户体验
- ✅ 后端权限验证 - 安全保障
- ✅ 两者必须一致 - 最佳实践
