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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('权限名称');
            $table->string('slug')->unique()->comment('权限标识');
            $table->string('module')->comment('模块名称');
            $table->string('description')->nullable()->comment('权限描述');
            $table->tinyInteger('status')->default(1)->comment('状态：0禁用，1正常');
            $table->integer('sort_order')->default(0)->comment('排序');
            $table->timestamps();
            
            $table->index(['slug', 'status']);
            $table->index(['module', 'status']);
            $table->index(['status', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
