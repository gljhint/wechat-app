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
        Schema::table('chat_messages', function (Blueprint $table) {
            // 先删除外键约束
            $table->dropForeign(['to_user_id']);

            // 修改字段为 nullable
            $table->unsignedBigInteger('to_user_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            // 恢复为 NOT NULL
            $table->unsignedBigInteger('to_user_id')->nullable(false)->change();

            // 恢复外键约束
            $table->foreign('to_user_id')->references('id')->on('wechat_users')->onDelete('cascade');
        });
    }
};
