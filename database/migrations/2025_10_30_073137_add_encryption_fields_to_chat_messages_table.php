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
            // 修改content字段为加密内容(更长的存储空间)
            $table->mediumText('content')->nullable()->change();

            // 添加加密相关字段
            $table->text('encryption_key')->nullable()->after('content')->comment('加密的消息密钥');
            $table->string('encryption_iv')->nullable()->after('encryption_key')->comment('加密初始化向量');
            $table->boolean('is_encrypted')->default(false)->after('encryption_iv')->comment('是否已加密');

            // 媒体URL也加密
            $table->text('media_url')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            $table->dropColumn(['encryption_key', 'encryption_iv', 'is_encrypted']);
            $table->text('content')->nullable()->change();
            $table->string('media_url')->nullable()->change();
        });
    }
};
