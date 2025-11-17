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
        Schema::create('daily_tasks', function (Blueprint $table) {
            $table->id();
            $table->date('task_date')->unique()->comment('任务日期');
            $table->text('bible_reading')->nullable()->comment('每天读经内容');
            $table->text('devotional')->nullable()->comment('每天灵修内容');
            $table->tinyInteger('status')->default(1)->comment('状态：1启用，0禁用');
            $table->timestamps();

            $table->index('task_date');
            $table->index(['task_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_tasks');
    }
};
