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
        Schema::create('wechat_users', function (Blueprint $table) {
            $table->id();
            $table->string('openid')->unique()->comment('微信OpenID');
            $table->string('unionid')->nullable()->unique()->comment('微信UnionID');
            $table->string('nickname')->comment('微信昵称');
            $table->string('avatar_url')->nullable()->comment('头像URL');
            $table->tinyInteger('gender')->default(0)->comment('性别：0未知，1男，2女');
            $table->string('country')->nullable()->comment('国家');
            $table->string('province')->nullable()->comment('省份');
            $table->string('city')->nullable()->comment('城市');
            $table->string('language')->default('zh_CN')->comment('语言');
            $table->string('employee_id')->nullable()->unique()->comment('员工工号');
            $table->string('real_name')->nullable()->comment('真实姓名');
            $table->string('phone')->nullable()->comment('手机号');
            $table->string('email')->nullable()->comment('邮箱');
            $table->string('department')->nullable()->comment('部门');
            $table->string('position')->nullable()->comment('职位');
            $table->date('entry_date')->nullable()->comment('入职日期');
            $table->tinyInteger('status')->default(1)->comment('状态：0禁用，1正常');
            $table->timestamp('last_login_at')->nullable()->comment('最后登录时间');
            $table->json('wechat_info')->nullable()->comment('微信原始信息JSON');
            $table->timestamps();
            
            $table->index(['openid', 'status']);
            $table->index(['employee_id', 'status']);
            $table->index(['department', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wechat_users');
    }
};
