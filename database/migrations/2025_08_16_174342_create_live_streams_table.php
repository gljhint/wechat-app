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
        Schema::create('live_streams', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('stream_key')->unique();
            $table->string('stream_url')->nullable();
            $table->string('play_url')->nullable();
            $table->string('hls_url')->nullable();
            $table->string('rtmp_url')->nullable();
            $table->enum('status', ['scheduled', 'live', 'ended', 'cancelled'])->default('scheduled');
            $table->enum('quality', ['360p', '480p', '720p', '1080p'])->default('720p');
            $table->integer('viewer_count')->default(0);
            $table->integer('max_viewers')->default(0);
            $table->integer('like_count')->default(0);
            $table->integer('comment_count')->default(0);
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('duration')->default(0); // 秒
            $table->json('settings')->nullable(); // 直播设置
            $table->string('category')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_public')->default(true);
            $table->boolean('allow_comments')->default(true);
            $table->boolean('record_enabled')->default(false);
            $table->string('record_url')->nullable();
            $table->unsignedBigInteger('streamer_id'); // 主播ID
            $table->string('created_ip', 45)->nullable();
            $table->timestamps();

            $table->index(['status', 'scheduled_at']);
            $table->index(['streamer_id', 'status']);
            $table->index('category');
            $table->foreign('streamer_id')->references('id')->on('wechat_users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('live_streams');
    }
};
