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
        // 微信端权限表
        Schema::create('wechat_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('权限名称');
            $table->string('slug')->unique()->comment('权限标识');
            $table->string('group')->default('default')->comment('权限分组');
            $table->text('description')->nullable()->comment('权限描述');
            $table->integer('sort_order')->default(0)->comment('排序');
            $table->boolean('status')->default(1)->comment('状态：1-启用 0-禁用');
            $table->timestamps();

            $table->index('group');
            $table->index('status');
        });

        // 角色权限关联表
        Schema::create('wechat_role_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('role')->comment('角色标识：admin, ministry, member等');
            $table->unsignedBigInteger('permission_id')->comment('权限ID');
            $table->timestamps();

            $table->index('role');
            $table->foreign('permission_id')
                  ->references('id')
                  ->on('wechat_permissions')
                  ->onDelete('cascade');

            $table->unique(['role', 'permission_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wechat_role_permissions');
        Schema::dropIfExists('wechat_permissions');
    }
};
