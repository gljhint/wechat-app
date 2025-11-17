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
        Schema::table('user_documents', function (Blueprint $table) {
            // 先添加type字段（如果不存在）
            if (!Schema::hasColumn('user_documents', 'type')) {
                $table->string('type')->default('document')->comment('文档类型：video视频、audio音频、document文档')->after('title');
            } else {
                // 如果存在，修改字段属性
                $table->string('type')->default('document')->comment('文档类型：video视频、audio音频、document文档')->change();
            }

            // user_id改为可空
            $table->unsignedBigInteger('user_id')->nullable()->change();

            // 添加type字段索引
            if (!Schema::hasColumn('user_documents', 'type')) {
                $table->index('type');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_documents', function (Blueprint $table) {
            $table->string('type')->nullable()->comment('文档类型')->change();
            $table->unsignedBigInteger('user_id')->nullable(false)->change();
            $table->dropIndex(['type']);
        });
    }
};
