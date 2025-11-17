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
        // 群聊表
        Schema::create('chat_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('群名称');
            $table->string('avatar')->nullable()->comment('群头像');
            $table->text('description')->nullable()->comment('群描述');
            $table->unsignedBigInteger('owner_id')->comment('群主ID');
            $table->integer('member_count')->default(0)->comment('成员数量');
            $table->tinyInteger('status')->default(1)->comment('状态：0已解散，1正常');
            $table->timestamps();

            $table->foreign('owner_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->index(['status', 'created_at']);
        });

        // 群成员表
        Schema::create('chat_group_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id')->comment('群ID');
            $table->unsignedBigInteger('user_id')->comment('用户ID');
            $table->tinyInteger('role')->default(0)->comment('角色：0普通成员，1管理员，2群主');
            $table->string('nickname')->nullable()->comment('群昵称');
            $table->tinyInteger('mute')->default(0)->comment('是否禁言：0否，1是');
            $table->timestamp('joined_at')->nullable()->comment('加入时间');
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('chat_groups')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->unique(['group_id', 'user_id']);
            $table->index(['user_id', 'created_at']);
        });

        // 修改聊天消息表，添加群聊支持
        Schema::table('chat_messages', function (Blueprint $table) {
            $table->unsignedBigInteger('group_id')->nullable()->after('to_user_id')->comment('群ID');
            $table->foreign('group_id')->references('id')->on('chat_groups')->onDelete('cascade');
            $table->index(['group_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chat_messages', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropColumn('group_id');
        });

        Schema::dropIfExists('chat_group_members');
        Schema::dropIfExists('chat_groups');
    }
};
