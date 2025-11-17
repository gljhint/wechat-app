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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique()->comment('管理员用户名');
            $table->string('email')->unique()->comment('邮箱');
            $table->string('password')->comment('密码');
            $table->string('name')->comment('姓名');
            $table->string('avatar')->nullable()->comment('头像');
            $table->string('phone')->nullable()->comment('手机号');
            $table->tinyInteger('status')->default(1)->comment('状态：0禁用，1正常');
            $table->tinyInteger('is_super')->default(0)->comment('是否超级管理员：0否，1是');
            $table->timestamp('last_login_at')->nullable()->comment('最后登录时间');
            $table->string('last_login_ip')->nullable()->comment('最后登录IP');
            $table->timestamp('email_verified_at')->nullable()->comment('邮箱验证时间');
            $table->string('remember_token')->nullable()->comment('记住我令牌');
            $table->timestamps();
            
            $table->index(['username', 'status']);
            $table->index(['email', 'status']);
            $table->index(['is_super', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
