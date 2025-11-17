<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('user_checkins', function (Blueprint $table) {
            // 删除旧的上下班打卡相关字段
            $table->dropColumn([
                'checkin_time',
                'checkout_time',
                'work_duration',
                'checkin_location',
                'checkout_location',
                'checkin_latitude',
                'checkin_longitude',
                'checkout_latitude',
                'checkout_longitude',
                'checkin_status'
            ]);

            // 添加学习任务相关字段
            $table->unsignedBigInteger('daily_task_id')->nullable()->after('user_id')->comment('学习任务ID');
            $table->timestamp('completed_at')->nullable()->after('checkin_date')->comment('完成时间');
            $table->tinyInteger('is_completed')->default(0)->after('completed_at')->comment('是否完成：1已完成，0未完成');

            // 添加外键
            $table->foreign('daily_task_id')->references('id')->on('daily_tasks')->onDelete('set null');

            // 更新索引
            $table->index(['user_id', 'checkin_date', 'is_completed']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_checkins', function (Blueprint $table) {
            // 删除新字段
            $table->dropForeign(['daily_task_id']);
            $table->dropColumn(['daily_task_id', 'completed_at', 'is_completed']);

            // 恢复旧字段
            $table->time('checkin_time')->nullable()->comment('签到时间');
            $table->time('checkout_time')->nullable()->comment('签退时间');
            $table->integer('work_duration')->default(0)->comment('工作时长（分钟）');
            $table->string('checkin_location')->nullable()->comment('签到地点');
            $table->string('checkout_location')->nullable()->comment('签退地点');
            $table->decimal('checkin_latitude', 10, 7)->nullable()->comment('签到纬度');
            $table->decimal('checkin_longitude', 10, 7)->nullable()->comment('签到经度');
            $table->decimal('checkout_latitude', 10, 7)->nullable()->comment('签退纬度');
            $table->decimal('checkout_longitude', 10, 7)->nullable()->comment('签退经度');
            $table->tinyInteger('checkin_status')->default(1)->comment('签到状态：1正常，2迟到，3早退');
        });
    }
};
