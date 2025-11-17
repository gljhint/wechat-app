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
        Schema::table('live_streams', function (Blueprint $table) {
            // 修改 streamer_id 为可空,因为固定直播室模式下创建时不需要主播
            $table->unsignedBigInteger('streamer_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            // 恢复为不可空
            $table->unsignedBigInteger('streamer_id')->nullable(false)->change();
        });
    }
};
