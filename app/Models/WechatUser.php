<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class WechatUser extends Model
{
    use HasFactory;

    protected $table = 'wechat_users';

    protected $fillable = [
        'openid',
        'unionid',
        'nickname',
        'avatar_url',
        'gender',
        'country',
        'province',
        'city',
        'language',
        'employee_id',
        'real_name',
        'phone',
        'email',
        'department',
        'position',
        'entry_date',
        'status',
        'role',
        'last_login_at',
        'wechat_info',
    ];

    protected $casts = [
        'wechat_info' => 'array',
        'last_login_at' => 'datetime',
        'entry_date' => 'date',
        'gender' => 'integer',
        'status' => 'integer',
    ];

    // 状态常量
    const STATUS_DISABLED = 0;
    const STATUS_ACTIVE = 1;

    // 性别常量
    const GENDER_UNKNOWN = 0;
    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;

    // 角色常量
    const ROLE_ADMIN = 'admin';           // 管理员
    const ROLE_MINISTRY = 'ministry';     // 服侍组
    const ROLE_MEMBER = 'member';         // 成员组
    const ROLE_PRE_MEMBER = 'pre_member'; // 准成员组
    const ROLE_SEEKER = 'seeker';         // 慕道组
    const ROLE_EXTERNAL = 'external';     // 外教会

    // 角色中文名称映射
    public static $roleNames = [
        self::ROLE_ADMIN => '管理员',
        self::ROLE_MINISTRY => '服侍组',
        self::ROLE_MEMBER => '成员组',
        self::ROLE_PRE_MEMBER => '准成员组',
        self::ROLE_SEEKER => '慕道组',
        self::ROLE_EXTERNAL => '外教会',
    ];

    // 关联打卡记录
    public function checkins(): HasMany
    {
        return $this->hasMany(UserCheckin::class, 'user_id');
    }

    // 关联文档
    public function documents(): HasMany
    {
        return $this->hasMany(UserDocument::class, 'user_id');
    }

    // 发送的消息
    public function sentMessages(): HasMany
    {
        return $this->hasMany(ChatMessage::class, 'from_user_id');
    }

    // 接收的消息
    public function receivedMessages(): HasMany
    {
        return $this->hasMany(ChatMessage::class, 'to_user_id');
    }

    // 获取今日打卡记录
    public function todayCheckin()
    {
        return $this->checkins()->whereDate('checkin_date', today())->first();
    }

    // 获取本月打卡统计
    public function monthlyCheckinStats()
    {
        return $this->checkins()
            ->whereYear('checkin_date', now()->year)
            ->whereMonth('checkin_date', now()->month)
            ->count();
    }

    // 获取未读消息数量
    public function unreadMessagesCount()
    {
        return $this->receivedMessages()->where('is_read', 0)->count();
    }

    /**
     * 判断当前用户是否具备主播权限
     */
    public function canHostLive(): bool
    {
        // 首先判断是否配置了允许的用户、工号或所属组织
        $config = config('live', []);

        $idWhitelist = collect(data_get($config, 'host_user_ids', []))
            ->map(fn($value) => (int) $value)
            ->filter();

        if ($idWhitelist->isNotEmpty() && $idWhitelist->contains((int) $this->id)) {
            return true;
        }

        $employeeWhitelist = collect(data_get($config, 'host_employee_ids', []))
            ->map(fn($value) => (string) $value)
            ->filter();

        if ($employeeWhitelist->isNotEmpty() && $this->employee_id && $employeeWhitelist->contains($this->employee_id)) {
            return true;
        }

        $departmentWhitelist = collect(data_get($config, 'host_departments', []))
            ->map(fn($value) => Str::lower(trim($value)))
            ->filter();

        if (
            $departmentWhitelist->isNotEmpty()
            && $this->department
            && $departmentWhitelist->contains(Str::lower($this->department))
        ) {
            return true;
        }

        $positionWhitelist = collect(data_get($config, 'host_positions', []))
            ->map(fn($value) => Str::lower(trim($value)))
            ->filter();

        if (
            $positionWhitelist->isNotEmpty()
            && $this->position
            && $positionWhitelist->contains(Str::lower($this->position))
        ) {
            return true;
        }

        // 无配置命中时，尝试检查是否存在匹配的后台管理员账号
        if ($this->hasLinkedAdminAccount()) {
            return true;
        }

        return false;
    }

    /**
     * 是否存在已关联的后台管理员账号
     */
    protected function hasLinkedAdminAccount(): bool
    {
        $query = Admin::query();
        $hasCondition = false;

        if ($this->email) {
            $query->where('email', $this->email);
            $hasCondition = true;
        }

        if ($this->phone) {
            $query->when($hasCondition, fn($q) => $q->orWhere('phone', $this->phone), fn($q) => $q->where('phone', $this->phone));
            $hasCondition = true;
        }

        if ($this->employee_id) {
            $query->when($hasCondition, fn($q) => $q->orWhere('username', $this->employee_id), fn($q) => $q->where('username', $this->employee_id));
            $hasCondition = true;
        }

        if (! $hasCondition) {
            return false;
        }

        return $query->where('status', Admin::STATUS_ACTIVE)->exists();
    }

    // 获取性别文本
    public function getGenderTextAttribute()
    {
        return match($this->gender) {
            self::GENDER_MALE => '男',
            self::GENDER_FEMALE => '女',
            default => '未知'
        };
    }

    // 获取状态文本
    public function getStatusTextAttribute()
    {
        return $this->status === self::STATUS_ACTIVE ? '正常' : '禁用';
    }

    // 作用域：活跃用户
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // 作用域：按部门筛选
    public function scopeByDepartment($query, $department)
    {
        return $query->where('department', $department);
    }

    // 判断用户是否有角色
    public function hasRole(): bool
    {
        return !is_null($this->role);
    }

    // 判断用户是否是管理员
    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    // 判断用户是否属于某个角色
    public function hasRoleOf(string $role): bool
    {
        return $this->role === $role;
    }

    // 判断用户是否属于某些角色之一
    public function hasAnyRole(array $roles): bool
    {
        return in_array($this->role, $roles);
    }

    // 获取角色中文名称
    public function getRoleNameAttribute(): string
    {
        return self::$roleNames[$this->role] ?? '未分配';
    }

    // 获取所有可用角色列表
    public static function getAvailableRoles(): array
    {
        return [
            self::ROLE_ADMIN,
            self::ROLE_MINISTRY,
            self::ROLE_MEMBER,
            self::ROLE_PRE_MEMBER,
            self::ROLE_SEEKER,
            self::ROLE_EXTERNAL,
        ];
    }

    // 获取角色徽章样式类
    public static function getRoleBadgeClass(string $role): string
    {
        return match($role) {
            self::ROLE_ADMIN => 'red',
            self::ROLE_MINISTRY => 'purple',
            self::ROLE_MEMBER => 'blue',
            self::ROLE_PRE_MEMBER => 'green',
            self::ROLE_SEEKER => 'yellow',
            self::ROLE_EXTERNAL => 'gray',
            default => 'gray'
        };
    }

    // ============ 权限相关方法 ============

    /**
     * 获取用户的所有权限
     */
    public function permissions()
    {
        if (!$this->role) {
            return collect([]);
        }

        return WechatRolePermission::getPermissionsByRole($this->role);
    }

    /**
     * 获取用户的所有权限slug
     */
    public function permissionSlugs(): array
    {
        return $this->permissions()->pluck('slug')->toArray();
    }

    /**
     * 检查用户是否有某个权限
     */
    public function hasPermission(string $permission): bool
    {
        // 管理员拥有所有权限
        if ($this->isAdmin()) {
            return true;
        }

        // 没有角色则没有权限
        if (!$this->role) {
            return false;
        }

        return in_array($permission, $this->permissionSlugs());
    }

    /**
     * 检查用户是否有任意一个权限
     */
    public function hasAnyPermission(array $permissions): bool
    {
        // 管理员拥有所有权限
        if ($this->isAdmin()) {
            return true;
        }

        foreach ($permissions as $permission) {
            if ($this->hasPermission($permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 检查用户是否有所有权限
     */
    public function hasAllPermissions(array $permissions): bool
    {
        // 管理员拥有所有权限
        if ($this->isAdmin()) {
            return true;
        }

        foreach ($permissions as $permission) {
            if (!$this->hasPermission($permission)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 检查用户能否访问某个路由
     */
    public function canAccessRoute(string $routeName): bool
    {
        // 管理员可以访问所有路由
        if ($this->isAdmin()) {
            return true;
        }

        // 路由权限映射
        $routePermissions = config('wechat_permissions.route_permissions', []);

        if (!isset($routePermissions[$routeName])) {
            // 如果路由没有配置权限要求，则默认需要登录即可访问
            return true;
        }

        return $this->hasPermission($routePermissions[$routeName]);
    }
}
