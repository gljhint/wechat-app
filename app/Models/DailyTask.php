<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_date',
        'bible_reading',
        'devotional',
        'status',
    ];

    protected $casts = [
        'task_date' => 'date',
        'status' => 'integer',
    ];

    /**
     * 获取该任务的所有打卡记录
     */
    public function checkins()
    {
        return $this->hasMany(UserCheckin::class, 'daily_task_id');
    }

    /**
     * 获取已完成的打卡记录
     */
    public function completedCheckins()
    {
        return $this->hasMany(UserCheckin::class, 'daily_task_id')->where('is_completed', 1);
    }

    /**
     * 获取今天的学习任务
     */
    public static function getTodayTask()
    {
        return self::where('task_date', today())
                   ->where('status', 1)
                   ->first();
    }

    /**
     * 获取指定日期的学习任务
     */
    public static function getTaskByDate($date)
    {
        return self::where('task_date', $date)
                   ->where('status', 1)
                   ->first();
    }
}
