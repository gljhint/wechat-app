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
        Schema::create('live_viewers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('stream_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamp('joined_at')->nullable();
            $table->timestamp('left_at')->nullable();
            $table->integer('watch_duration')->default(0); // 观看时长（秒）
            $table->string('viewer_ip', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->boolean('is_liked')->default(false);
            $table->json('interaction_data')->nullable(); // 互动数据
            $table->timestamps();

            $table->unique(['stream_id', 'user_id']);
            $table->index(['stream_id', 'joined_at']);
            $table->index('user_id');
            $table->foreign('stream_id')->references('id')->on('live_streams')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('wechat_users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_viewers');
    }
};
