<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class WechatPermission extends Model
{
    use HasFactory;

    protected $table = 'wechat_permissions';

    protected $fillable = [
        'name',
        'slug',
        'group',
        'description',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
        'sort_order' => 'integer',
    ];

    // 权限分组常量
    const GROUP_CHAT = 'chat';           // 聊天功能
    const GROUP_LIVE = 'live';           // 直播功能
    const GROUP_DOCUMENT = 'document';   // 文档功能
    const GROUP_CHECKIN = 'checkin';     // 打卡功能
    const GROUP_PROFILE = 'profile';     // 个人中心
    const GROUP_SYSTEM = 'system';       // 系统功能

    // 权限分组名称
    public static $groupNames = [
        self::GROUP_CHAT => '聊天功能',
        self::GROUP_LIVE => '直播功能',
        self::GROUP_DOCUMENT => '文档功能',
        self::GROUP_CHECKIN => '打卡功能',
        self::GROUP_PROFILE => '个人中心',
        self::GROUP_SYSTEM => '系统功能',
    ];

    // 拥有此权限的角色（多对多）
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(
            WechatUser::class,
            'wechat_role_permissions',
            'permission_id',
            'role',
            'id',
            'role'
        );
    }

    // 获取分组名称
    public function getGroupNameAttribute(): string
    {
        return self::$groupNames[$this->group] ?? $this->group;
    }

    // 作用域：启用的权限
    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    // 作用域：按分组筛选
    public function scopeByGroup($query, $group)
    {
        return $query->where('group', $group);
    }

    // 作用域：排序
    public function scopeOrdered($query)
    {
        return $query->orderBy('group')->orderBy('sort_order')->orderBy('name');
    }

    /**
     * 获取所有权限分组
     */
    public static function getGroups(): array
    {
        return [
            self::GROUP_CHAT,
            self::GROUP_LIVE,
            self::GROUP_DOCUMENT,
            self::GROUP_CHECKIN,
            self::GROUP_PROFILE,
            self::GROUP_SYSTEM,
        ];
    }

    /**
     * 默认权限配置
     */
    public static function getDefaultPermissions(): array
    {
        return [
            // 聊天功能
            ['name' => '查看聊天', 'slug' => 'chat.view', 'group' => self::GROUP_CHAT, 'description' => '可以查看聊天列表和消息', 'sort_order' => 1],
            ['name' => '发送消息', 'slug' => 'chat.send', 'group' => self::GROUP_CHAT, 'description' => '可以发送私聊消息', 'sort_order' => 2],
            ['name' => '创建群聊', 'slug' => 'chat.group.create', 'group' => self::GROUP_CHAT, 'description' => '可以创建新群聊', 'sort_order' => 3],
            ['name' => '管理群聊', 'slug' => 'chat.group.manage', 'group' => self::GROUP_CHAT, 'description' => '可以管理群聊（解散、踢人等）', 'sort_order' => 4],
            ['name' => '发布群公告', 'slug' => 'chat.group.announce', 'group' => self::GROUP_CHAT, 'description' => '可以发布群公告', 'sort_order' => 5],

            // 直播功能
            ['name' => '观看直播', 'slug' => 'live.view', 'group' => self::GROUP_LIVE, 'description' => '可以观看直播', 'sort_order' => 1],
            ['name' => '直播评论', 'slug' => 'live.comment', 'group' => self::GROUP_LIVE, 'description' => '可以在直播中发表评论', 'sort_order' => 2],
            ['name' => '发起直播', 'slug' => 'live.create', 'group' => self::GROUP_LIVE, 'description' => '可以发起直播', 'sort_order' => 3],
            ['name' => '管理直播', 'slug' => 'live.manage', 'group' => self::GROUP_LIVE, 'description' => '可以管理所有直播', 'sort_order' => 4],

            // 文档功能
            ['name' => '查看文档', 'slug' => 'document.view', 'group' => self::GROUP_DOCUMENT, 'description' => '可以查看文档列表和内容', 'sort_order' => 1],
            ['name' => '下载文档', 'slug' => 'document.download', 'group' => self::GROUP_DOCUMENT, 'description' => '可以下载文档', 'sort_order' => 2],
            ['name' => '上传文档', 'slug' => 'document.upload', 'group' => self::GROUP_DOCUMENT, 'description' => '可以上传新文档', 'sort_order' => 3],
            ['name' => '管理文档', 'slug' => 'document.manage', 'group' => self::GROUP_DOCUMENT, 'description' => '可以编辑、删除文档', 'sort_order' => 4],

            // 打卡功能
            ['name' => '每日打卡', 'slug' => 'checkin.daily', 'group' => self::GROUP_CHECKIN, 'description' => '可以进行每日学习打卡', 'sort_order' => 1],
            ['name' => '查看打卡记录', 'slug' => 'checkin.view', 'group' => self::GROUP_CHECKIN, 'description' => '可以查看自己的打卡记录', 'sort_order' => 2],
            ['name' => '查看他人打卡', 'slug' => 'checkin.view.others', 'group' => self::GROUP_CHECKIN, 'description' => '可以查看其他人的打卡记录', 'sort_order' => 3],

            // 个人中心
            ['name' => '查看个人资料', 'slug' => 'profile.view', 'group' => self::GROUP_PROFILE, 'description' => '可以查看个人资料', 'sort_order' => 1],
            ['name' => '编辑个人资料', 'slug' => 'profile.edit', 'group' => self::GROUP_PROFILE, 'description' => '可以编辑个人资料', 'sort_order' => 2],

            // 系统功能
            ['name' => '系统设置', 'slug' => 'system.settings', 'group' => self::GROUP_SYSTEM, 'description' => '可以访问系统设置', 'sort_order' => 1],
        ];
    }
}
