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
        Schema::create('user_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('用户ID');
            $table->string('title')->comment('文档标题');
            $table->string('filename')->comment('文件名');
            $table->string('original_name')->comment('原始文件名');
            $table->string('file_path')->comment('文件路径');
            $table->string('file_type')->comment('文件类型');
            $table->string('mime_type')->comment('MIME类型');
            $table->unsignedBigInteger('file_size')->comment('文件大小（字节）');
            $table->string('category')->default('other')->comment('文档分类');
            $table->text('description')->nullable()->comment('文档描述');
            $table->integer('download_count')->default(0)->comment('下载次数');
            $table->tinyInteger('is_public')->default(0)->comment('是否公开：0私有，1公开');
            $table->tinyInteger('status')->default(1)->comment('状态：0删除，1正常');
            $table->timestamps();
            
            $table->foreign('user_id')->references('id')->on('wechat_users')->onDelete('cascade');
            $table->index(['user_id', 'status']);
            $table->index(['category', 'status']);
            $table->index(['file_type', 'status']);
            $table->index(['is_public', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_documents');
    }
};
