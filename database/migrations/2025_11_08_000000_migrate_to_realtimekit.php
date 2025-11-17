<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * 将 Cloudflare Calls (SFU) 迁移到 RealtimeKit
     */
    public function up(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            // 删除旧的 Calls API 字段
            $table->dropIndex(['cf_session_id']);
            $table->dropColumn([
                'cf_app_id',
                'cf_session_id',
                'cf_session_data',
                'cf_tracks'
            ]);

            // 添加 RealtimeKit 字段
            $table->string('rtk_meeting_id')->nullable()->after('cover_image')->comment('RealtimeKit Meeting ID');
            $table->string('rtk_session_id')->nullable()->after('rtk_meeting_id')->comment('当前直播 Session ID (每次开播不同)');
            $table->json('rtk_meeting_data')->nullable()->after('rtk_session_id')->comment('Meeting 元数据');
            $table->string('rtk_recording_id')->nullable()->after('rtk_meeting_data')->comment('录制 ID (如果启用)');
            $table->timestamp('rtk_session_started_at')->nullable()->after('rtk_recording_id')->comment('当前 Session 开始时间');

            // 添加索引
            $table->index('rtk_meeting_id');
            $table->index('rtk_session_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            // 删除 RealtimeKit 字段
            $table->dropIndex(['rtk_meeting_id']);
            $table->dropIndex(['rtk_session_id']);
            $table->dropColumn([
                'rtk_meeting_id',
                'rtk_session_id',
                'rtk_meeting_data',
                'rtk_recording_id',
                'rtk_session_started_at'
            ]);

            // 恢复 Calls 字段
            $table->string('cf_app_id')->nullable()->after('cover_image');
            $table->string('cf_session_id')->nullable()->after('cf_app_id');
            $table->json('cf_session_data')->nullable()->after('cf_session_id');
            $table->json('cf_tracks')->nullable()->after('cf_session_data');
            $table->index('cf_session_id');
        });
    }
};
