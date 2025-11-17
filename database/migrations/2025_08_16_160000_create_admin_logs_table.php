<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('admin_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('admin_id')->nullable()->comment('管理员ID');
            $table->string('action', 100)->comment('操作类型');
            $table->string('model', 100)->nullable()->comment('操作模型');
            $table->unsignedBigInteger('model_id')->nullable()->comment('模型ID');
            $table->string('description')->comment('操作描述');
            $table->json('old_values')->nullable()->comment('旧值');
            $table->json('new_values')->nullable()->comment('新值');
            $table->string('ip_address', 45)->nullable()->comment('IP地址');
            $table->text('user_agent')->nullable()->comment('用户代理');
            $table->string('method', 10)->comment('请求方法');
            $table->string('url')->comment('请求URL');
            $table->integer('status_code')->default(200)->comment('响应状态码');
            $table->timestamps();

            $table->foreign('admin_id')->references('id')->on('admins')->onDelete('set null');
            $table->index(['admin_id', 'created_at']);
            $table->index(['action', 'created_at']);
            $table->index('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('admin_logs');
    }
};