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
        Schema::create('bible_reading_explanations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_task_id')->constrained('daily_tasks')->onDelete('cascade')->comment('关联的每日任务ID');
            $table->text('explanation')->nullable()->comment('AI生成的解释内容');
            $table->string('model_used', 100)->nullable()->comment('使用的AI模型');
            $table->integer('likes_count')->default(0)->comment('点赞数量');
            $table->integer('dislikes_count')->default(0)->comment('踩的数量');
            $table->tinyInteger('status')->default(1)->comment('状态：1成功，0失败');
            $table->text('error_message')->nullable()->comment('错误信息');
            $table->timestamps();

            $table->index('daily_task_id');
            $table->index('created_at');
            $table->index('dislikes_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_reading_explanations');
    }
};
