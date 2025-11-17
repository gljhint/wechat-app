<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AdminLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'action',
        'model',
        'model_id',
        'description',
        'old_values',
        'new_values',
        'ip_address',
        'user_agent',
        'method',
        'url',
        'status_code',
    ];

    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'status_code' => 'integer',
    ];

    // 管理员关联
    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }

    // 获取操作类型的中文描述
    public function getActionTextAttribute()
    {
        $actions = [
            'create' => '创建',
            'update' => '更新',
            'delete' => '删除',
            'login' => '登录',
            'logout' => '登出',
            'view' => '查看',
            'export' => '导出',
            'import' => '导入',
            'bulk' => '批量操作',
            'sync' => '同步',
            'clear_cache' => '清除缓存',
            'backup' => '备份',
            'restore' => '恢复',
        ];

        return $actions[$this->action] ?? $this->action;
    }

    // 获取模型的中文名称
    public function getModelTextAttribute()
    {
        $models = [
            'App\Models\WechatUser' => '微信用户',
            'App\Models\Admin' => '管理员',
            'App\Models\Role' => '角色',
            'App\Models\Permission' => '权限',
            'App\Models\UserCheckin' => '打卡记录',
            'App\Models\UserDocument' => '文档',
            'App\Models\ChatMessage' => '消息',
        ];

        return $models[$this->model] ?? $this->model;
    }

    // 获取状态颜色
    public function getStatusColorAttribute()
    {
        if ($this->status_code >= 200 && $this->status_code < 300) {
            return 'green';
        } elseif ($this->status_code >= 300 && $this->status_code < 400) {
            return 'yellow';
        } elseif ($this->status_code >= 400 && $this->status_code < 500) {
            return 'orange';
        } else {
            return 'red';
        }
    }

    // 作用域：按管理员筛选
    public function scopeByAdmin($query, $adminId)
    {
        return $query->where('admin_id', $adminId);
    }

    // 作用域：按操作类型筛选
    public function scopeByAction($query, $action)
    {
        return $query->where('action', $action);
    }

    // 作用域：按模型筛选
    public function scopeByModel($query, $model)
    {
        return $query->where('model', $model);
    }

    // 作用域：按日期范围筛选
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    // 记录操作日志
    public static function record($action, $description, $model = null, $modelId = null, $oldValues = null, $newValues = null)
    {
        $request = request();
        
        return static::create([
            'admin_id' => auth('admin')->id(),
            'action' => $action,
            'model' => $model,
            'model_id' => $modelId,
            'description' => $description,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'status_code' => 200,
        ]);
    }
}