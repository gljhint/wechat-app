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
        Schema::create('chat_group_announcements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id')->comment('群组ID');
            $table->unsignedBigInteger('user_id')->comment('发布者ID');
            $table->string('title', 100)->comment('公告标题');
            $table->text('content')->comment('公告内容');
            $table->tinyInteger('is_pinned')->default(0)->comment('是否置顶：0否，1是');
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('chat_groups')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->index(['group_id', 'created_at']);
        });

        // 为chat_groups表添加二维码字段
        Schema::table('chat_groups', function (Blueprint $table) {
            $table->string('qrcode_url')->nullable()->after('avatar')->comment('群二维码URL');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chat_groups', function (Blueprint $table) {
            $table->dropColumn('qrcode_url');
        });

        Schema::dropIfExists('chat_group_announcements');
    }
};
