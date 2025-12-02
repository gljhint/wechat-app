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
        Schema::create('bible_explanation_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('explanation_id')->constrained('bible_reading_explanations')->onDelete('cascade')->comment('关联的解释ID');
            $table->foreignId('user_id')->constrained('wechat_users')->onDelete('cascade')->comment('投票用户ID');
            $table->tinyInteger('vote_type')->comment('投票类型：1点赞，-1踩');
            $table->timestamps();

            $table->unique(['explanation_id', 'user_id'], 'unique_vote');
            $table->index('explanation_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bible_explanation_votes');
    }
};
