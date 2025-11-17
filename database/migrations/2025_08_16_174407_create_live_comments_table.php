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
        Schema::create('live_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('stream_id');
            $table->unsignedBigInteger('user_id');
            $table->text('content');
            $table->enum('type', ['text', 'emoji', 'gift'])->default('text');
            $table->json('extra_data')->nullable(); // 额外数据，如礼物信息
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_deleted')->default(false);
            $table->string('user_ip', 45)->nullable();
            $table->timestamps();

            $table->index(['stream_id', 'created_at']);
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
        Schema::dropIfExists('live_comments');
    }
};
