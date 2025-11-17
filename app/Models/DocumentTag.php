<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class DocumentTag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'sort_order' => 'integer',
        'status' => 'integer',
    ];

    // 状态常量
    const STATUS_DISABLED = 0;
    const STATUS_ACTIVE = 1;

    // 颜色常量
    const COLORS = [
        'red' => '红色',
        'orange' => '橙色',
        'yellow' => '黄色',
        'green' => '绿色',
        'blue' => '蓝色',
        'indigo' => '靛蓝',
        'purple' => '紫色',
        'pink' => '粉色',
        'gray' => '灰色',
    ];

    // 关联文档
    public function documents(): BelongsToMany
    {
        return $this->belongsToMany(UserDocument::class, 'document_document_tag', 'document_tag_id', 'user_document_id')
                    ->withTimestamps();
    }

    // 作用域：启用的标签
    public function scopeActive($query)
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    // 获取状态文本
    public function getStatusTextAttribute(): string
    {
        return $this->status === self::STATUS_ACTIVE ? '启用' : '禁用';
    }

    // 获取颜色文本
    public function getColorTextAttribute(): string
    {
        return self::COLORS[$this->color] ?? '灰色';
    }
}
