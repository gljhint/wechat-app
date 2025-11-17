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
        Schema::create('user_checkins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('用户ID');
            $table->date('checkin_date')->comment('打卡日期');
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
            $table->string('remark')->nullable()->comment('备注');
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->unique(['user_id', 'checkin_date']);
            $table->index(['user_id', 'checkin_date']);
            $table->index(['checkin_date', 'checkin_status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_checkins');
    }
};
