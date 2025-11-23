<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserCheckin extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'daily_task_id',
        'checkin_date',
        'completed_at',
        'is_completed',
        'remark',
    ];

    protected $casts = [
        'checkin_date' => 'date:Y-m-d', // 强制格式化为纯日期字符串,不做时区转换
        'completed_at' => 'datetime',
        'is_completed' => 'integer',
    ];

    /**
     * 用户关联
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(WechatUser::class, 'user_id');
    }

    /**
     * 学习任务关联
     */
    public function dailyTask(): BelongsTo
    {
        return $this->belongsTo(DailyTask::class, 'daily_task_id');
    }

    /**
     * 获取完成状态文本
     */
    public function getStatusTextAttribute()
    {
        return $this->is_completed ? '已完成' : '未完成';
    }

    /**
     * 作用域：按日期筛选
     */
    public function scopeByDate($query, $date)
    {
        return $query->whereDate('checkin_date', $date);
    }

    /**
     * 作用域：按月份筛选
     */
    public function scopeByMonth($query, $year, $month)
    {
        return $query->whereYear('checkin_date', $year)
                    ->whereMonth('checkin_date', $month);
    }

    /**
     * 作用域：已完成
     */
    public function scopeCompleted($query)
    {
        return $query->where('is_completed', 1);
    }

    /**
     * 作用域：未完成
     */
    public function scopeIncomplete($query)
    {
        return $query->where('is_completed', 0);
    }
}
