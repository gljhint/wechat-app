<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * 清理 live_streams 表的冗余字段
 *
 * 删除原因:
 * - RealtimeKit SDK 自动处理评论、观众、点赞等功能
 * - 不需要在数据库中存储这些实时数据
 * - 简化架构,减少数据冗余
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            // 删除观众统计相关字段 (RealtimeKit getParticipants 实时获取)
            $table->dropColumn([
                'viewer_count',
                'max_viewers',
            ]);

            // 删除评论点赞统计 (RealtimeKit SDK 自己处理)
            $table->dropColumn([
                'like_count',
                'comment_count',
            ]);

            // 删除冗余的 RealtimeKit 字段
            $table->dropColumn([
                'rtk_session_id',       // 不需要存储 Session ID
                'rtk_meeting_data',     // 不需要存储完整 Meeting 数据
                'rtk_recording_id',     // 录制功能暂不使用
                'rtk_session_started_at', // 用 started_at 即可
            ]);

            // 删除业务冗余字段
            $table->dropColumn([
                'duration',             // 可以通过 started_at 和 ended_at 计算
                'settings',             // 不需要额外设置
                'tags',                 // 分类已够用
                'allow_comments',       // SDK 自己控制
                'record_enabled',       // 录制功能暂不使用
                'record_url',           // 录制功能暂不使用
                'created_ip',           // 不需要记录 IP
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            // 恢复观众统计字段
            $table->integer('viewer_count')->default(0)->after('status');
            $table->integer('max_viewers')->default(0)->after('viewer_count');

            // 恢复评论点赞字段
            $table->integer('like_count')->default(0)->after('max_viewers');
            $table->integer('comment_count')->default(0)->after('like_count');

            // 恢复 RealtimeKit 字段
            $table->string('rtk_session_id')->nullable()->after('rtk_meeting_id');
            $table->json('rtk_meeting_data')->nullable()->after('rtk_session_id');
            $table->string('rtk_recording_id')->nullable()->after('rtk_meeting_data');
            $table->timestamp('rtk_session_started_at')->nullable()->after('rtk_recording_id');

            // 恢复业务字段
            $table->integer('duration')->default(0)->comment('直播时长(秒)')->after('ended_at');
            $table->json('settings')->nullable()->after('category');
            $table->json('tags')->nullable()->after('settings');
            $table->boolean('allow_comments')->default(true)->after('is_public');
            $table->boolean('record_enabled')->default(false)->after('allow_comments');
            $table->string('record_url')->nullable()->after('record_enabled');
            $table->string('created_ip', 45)->nullable()->after('streamer_id');
        });
    }
};
