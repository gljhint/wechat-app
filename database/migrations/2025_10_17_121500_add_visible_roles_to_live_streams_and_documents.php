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
        // 为直播表添加可见角色字段
        Schema::table('live_streams', function (Blueprint $table) {
            $table->json('visible_roles')->nullable()->after('status')
                  ->comment('可见角色（JSON数组）：null表示所有人可见');
        });

        // 为文档表添加可见角色字段
        Schema::table('user_documents', function (Blueprint $table) {
            $table->json('visible_roles')->nullable()->after('is_public')
                  ->comment('可见角色（JSON数组）：null表示所有人可见');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            $table->dropColumn('visible_roles');
        });

        Schema::table('user_documents', function (Blueprint $table) {
            $table->dropColumn('visible_roles');
        });
    }
};
