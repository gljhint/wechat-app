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
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('from_user_id')->comment('发送者ID');
            $table->unsignedBigInteger('to_user_id')->comment('接收者ID');
            $table->tinyInteger('message_type')->default(1)->comment('消息类型：1文本，2图片，3语音，4视频，5文件');
            $table->text('content')->nullable()->comment('消息内容');
            $table->string('media_url')->nullable()->comment('媒体文件URL');
            $table->string('media_type')->nullable()->comment('媒体文件类型');
            $table->unsignedBigInteger('media_size')->nullable()->comment('媒体文件大小');
            $table->integer('duration')->nullable()->comment('语音/视频时长（秒）');
            $table->tinyInteger('is_read')->default(0)->comment('是否已读：0未读，1已读');
            $table->timestamp('read_at')->nullable()->comment('阅读时间');
            $table->tinyInteger('is_recalled')->default(0)->comment('是否撤回：0正常，1已撤回');
            $table->timestamp('recalled_at')->nullable()->comment('撤回时间');
            $table->timestamps();
            
            $table->foreign('from_user_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->foreign('to_user_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->index(['from_user_id', 'to_user_id', 'created_at']);
            $table->index(['to_user_id', 'is_read']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
