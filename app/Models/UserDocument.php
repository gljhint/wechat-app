<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Storage;

class UserDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'type',
        'filename',
        'original_name',
        'file_path',
        'file_type',
        'mime_type',
        'file_size',
        'category',
        'description',
        'download_count',
        'is_public',
        'visible_roles',
        'status',
    ];

    protected $casts = [
        'file_size' => 'integer',
        'download_count' => 'integer',
        'is_public' => 'integer',
        'visible_roles' => 'array',
        'status' => 'integer',
    ];

    // 状态常量
    const STATUS_DELETED = 0;
    const STATUS_NORMAL = 1;

    // 公开状态常量
    const PRIVATE_FILE = 0;
    const PUBLIC_FILE = 1;

    // 文档类型常量
    const TYPE_DOCUMENT = 'document';
    const TYPE_VIDEO = 'video';
    const TYPE_AUDIO = 'audio';

    // 文档类型中文名称
    const TYPE_NAMES = [
        self::TYPE_DOCUMENT => '文档',
        self::TYPE_VIDEO => '视频',
        self::TYPE_AUDIO => '音频',
    ];

    // 文档分类
    const CATEGORIES = [
        'pdf' => 'PDF文档',
        'office' => 'Office文档',
        'image' => '图片',
        'video' => '视频',
        'audio' => '音频',
        'other' => '其他'
    ];

    // 用户关联
    public function user(): BelongsTo
    {
        return $this->belongsTo(WechatUser::class, 'user_id');
    }

    // 标签关联
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(DocumentTag::class, 'document_document_tag', 'user_document_id', 'document_tag_id')
                    ->withTimestamps();
    }

    // 获取文件大小文本
    public function getFileSizeTextAttribute()
    {
        $size = $this->file_size;
        if ($size < 1024) {
            return $size . 'B';
        } elseif ($size < 1048576) {
            return round($size / 1024, 2) . 'KB';
        } elseif ($size < 1073741824) {
            return round($size / 1048576, 2) . 'MB';
        } else {
            return round($size / 1073741824, 2) . 'GB';
        }
    }

    // 获取类型文本
    public function getTypeTextAttribute(): string
    {
        return self::TYPE_NAMES[$this->type] ?? '文档';
    }

    // 获取分类文本
    public function getCategoryTextAttribute()
    {
        return self::CATEGORIES[$this->category] ?? '其他';
    }

    // 获取状态文本
    public function getStatusTextAttribute()
    {
        return $this->status === self::STATUS_NORMAL ? '正常' : '已删除';
    }

    // 获取公开状态文本
    public function getPublicTextAttribute()
    {
        return $this->is_public === self::PUBLIC_FILE ? '公开' : '私有';
    }

    // 获取文件URL
    public function getFileUrlAttribute()
    {
        return Storage::url($this->file_path);
    }

    // 增加下载次数
    public function incrementDownloadCount()
    {
        $this->increment('download_count');
    }

    // 作用域：正常文档
    public function scopeNormal($query)
    {
        return $query->where('status', self::STATUS_NORMAL);
    }

    // 作用域：公开文档
    public function scopePublic($query)
    {
        return $query->where('is_public', self::PUBLIC_FILE);
    }

    // 作用域：按类型筛选
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // 作用域：按分类筛选
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // 作用域：按文件类型筛选
    public function scopeByFileType($query, $fileType)
    {
        return $query->where('file_type', $fileType);
    }

    // 作用域：按标签筛选
    public function scopeByTag($query, $tagId)
    {
        return $query->whereHas('tags', function($q) use ($tagId) {
            $q->where('document_tags.id', $tagId);
        });
    }

    /**
     * 检查用户是否可以查看该文档
     */
    public function isVisibleToUser(?WechatUser $user): bool
    {
        // 管理员可以查看所有文档
        if ($user && $user->isAdmin()) {
            return true;
        }

        // 文档创建者可以查看
        if ($user && $user->id === $this->user_id) {
            return true;
        }

        // 如果没有设置可见角色（null），则所有人可见
        if (is_null($this->visible_roles) || empty($this->visible_roles)) {
            return true;
        }

        // 检查用户角色是否在可见角色列表中
        if ($user && $user->role && in_array($user->role, $this->visible_roles)) {
            return true;
        }

        return false;
    }

    /**
     * 作用域：用户可见的文档
     */
    public function scopeVisibleToUser($query, ?WechatUser $user)
    {
        // 管理员可以查看所有
        if ($user && $user->isAdmin()) {
            return $query;
        }

        return $query->where(function($q) use ($user) {
            // 没有设置可见角色的文档
            $q->whereNull('visible_roles')
              ->orWhereJsonLength('visible_roles', 0);

            // 或者用户角色在可见角色列表中
            if ($user && $user->role) {
                $q->orWhereJsonContains('visible_roles', $user->role);
            }

            // 或者是用户自己创建的文档
            if ($user) {
                $q->orWhere('user_id', $user->id);
            }
        });
    }

    /**
     * 获取可见角色文本
     */
    public function getVisibleRolesTextAttribute(): string
    {
        if (is_null($this->visible_roles) || empty($this->visible_roles)) {
            return '所有人可见';
        }

        $roleNames = array_map(function($role) {
            return WechatUser::$roleNames[$role] ?? $role;
        }, $this->visible_roles);

        return implode('、', $roleNames);
    }
}
