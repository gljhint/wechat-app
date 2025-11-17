<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * 优化数据库索引以提升查询性能
     */
    public function up(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            // 1. 为私聊查询优化 - 接收者查看消息列表(最常用)
            // SELECT * FROM chat_messages WHERE to_user_id = ? AND is_read = 0 ORDER BY created_at DESC
            $table->index(['to_user_id', 'is_read', 'created_at'], 'idx_to_user_read_time');

            // 2. 为发送者查看自己发送的消息优化
            // SELECT * FROM chat_messages WHERE from_user_id = ? ORDER BY created_at DESC
            $table->index(['from_user_id', 'created_at'], 'idx_from_user_time');

            // 3. 为群聊未读消息优化
            // SELECT * FROM chat_messages WHERE group_id = ? AND is_read = 0
            $table->index(['group_id', 'is_read', 'created_at'], 'idx_group_read_time');

            // 4. 为消息撤回功能优化
            // SELECT * FROM chat_messages WHERE id = ? AND is_recalled = 0
            $table->index(['is_recalled', 'created_at'], 'idx_recalled_time');
        });

        Schema::table('wechat_users', function (Blueprint $table) {
            // 5. 为查询可用用户优化 (availableContacts 方法)
            // SELECT * FROM wechat_users WHERE status = 1 AND role IS NOT NULL
            $table->index(['status', 'role'], 'idx_status_role');

            // 6. 为真实姓名搜索优化
            $table->index('real_name', 'idx_real_name');

            // 7. 为最后登录时间查询优化
            $table->index(['status', 'last_login_at'], 'idx_status_last_login');
        });

        Schema::table('chat_groups', function (Blueprint $table) {
            // 8. 为查询活跃群组优化
            // SELECT * FROM chat_groups WHERE status = 1 AND member_count > 0
            $table->index(['status', 'member_count', 'created_at'], 'idx_status_members_time');

            // 9. 为群主查询自己的群优化
            $table->index(['owner_id', 'status'], 'idx_owner_status');
        });

        Schema::table('chat_group_members', function (Blueprint $table) {
            // 10. 为查询群成员列表优化
            // SELECT * FROM chat_group_members WHERE group_id = ? ORDER BY joined_at
            $table->index(['group_id', 'joined_at'], 'idx_group_joined');

            // 11. 为查询用户所在的所有群优化
            // SELECT * FROM chat_group_members WHERE user_id = ? ORDER BY created_at DESC
            $table->index(['user_id', 'created_at'], 'idx_user_created');

            // 12. 为查询群管理员优化
            // SELECT * FROM chat_group_members WHERE group_id = ? AND role IN (1, 2)
            $table->index(['group_id', 'role'], 'idx_group_role');
        });

        Schema::table('user_documents', function (Blueprint $table) {
            // 13. 为文档搜索优化 (按标题)
            $table->index('title', 'idx_title');

            // 14. 为按下载次数排序优化
            // SELECT * FROM user_documents WHERE status = 1 ORDER BY download_count DESC
            $table->index(['status', 'download_count'], 'idx_status_downloads');

            // 15. 为按更新时间排序优化
            $table->index(['status', 'updated_at'], 'idx_status_updated');
        });
        

        Schema::table('user_checkins', function (Blueprint $table) {
            // 16. 为查询某用户某月打卡记录优化
            // SELECT * FROM user_checkins WHERE user_id = ? AND checkin_date BETWEEN ? AND ?
            // 已有 index(['user_id', 'checkin_date', 'is_completed'])

            // 17. 为统计某日期所有人打卡优化
            $table->index(['checkin_date', 'is_completed'], 'idx_date_completed');

            // 18. 为按任务查询打卡记录优化
            $table->index(['daily_task_id', 'is_completed'], 'idx_task_completed');
        });

        // 18. 如果使用了 wechat_role_permissions 表的话
        if (Schema::hasTable('wechat_role_permissions')) {
            Schema::table('wechat_role_permissions', function (Blueprint $table) {
                // 为查询某角色的所有权限优化 (已有 index('role'))
                // 为查询某权限被哪些角色使用优化
                $table->index('permission_id', 'idx_permission');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            $table->dropIndex('idx_to_user_read_time');
            $table->dropIndex('idx_from_user_time');
            $table->dropIndex('idx_group_read_time');
            $table->dropIndex('idx_recalled_time');
        });

        Schema::table('wechat_users', function (Blueprint $table) {
            $table->dropIndex('idx_status_role');
            $table->dropIndex('idx_real_name');
            $table->dropIndex('idx_status_last_login');
        });

        Schema::table('chat_groups', function (Blueprint $table) {
            $table->dropIndex('idx_status_members_time');
            $table->dropIndex('idx_owner_status');
        });

        Schema::table('chat_group_members', function (Blueprint $table) {
            $table->dropIndex('idx_group_joined');
            $table->dropIndex('idx_user_created');
            $table->dropIndex('idx_group_role');
        });

        Schema::table('user_documents', function (Blueprint $table) {
            $table->dropIndex('idx_title');
            $table->dropIndex('idx_status_downloads');
            $table->dropIndex('idx_status_updated');
        });

        Schema::table('user_checkins', function (Blueprint $table) {
            $table->dropIndex('idx_date_completed');
            $table->dropIndex('idx_task_completed');
        });

        if (Schema::hasTable('wechat_role_permissions')) {
            Schema::table('wechat_role_permissions', function (Blueprint $table) {
                $table->dropIndex('idx_permission');
            });
        }
    }
};
