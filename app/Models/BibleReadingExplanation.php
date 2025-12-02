<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BibleReadingExplanation extends Model
{
    use HasFactory;

    protected $fillable = [
        'daily_task_id',
        'explanation',
        'model_used',
        'likes_count',
        'dislikes_count',
        'status',
        'error_message',
    ];

    protected $casts = [
        'status' => 'integer',
        'likes_count' => 'integer',
        'dislikes_count' => 'integer',
    ];

    /**
     * 关联每日任务
     */
    public function dailyTask()
    {
        return $this->belongsTo(DailyTask::class);
    }

    /**
     * 关联投票记录
     */
    public function votes()
    {
        return $this->hasMany(BibleExplanationVote::class, 'explanation_id');
    }

    /**
     * 检查是否需要重新生成（踩的数量超过5）
     */
    public function shouldRegenerate(): bool
    {
        return $this->dislikes_count > 5;
    }
}
