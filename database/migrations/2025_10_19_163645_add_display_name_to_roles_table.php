<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->string('display_name')->after('name')->nullable()->comment('显示名称');
        });

        // 将现有的 name 复制到 display_name
        DB::table('roles')->update([
            'display_name' => DB::raw('name')
        ]);

        // 然后修改 name 为标识符格式 (如果需要的话,这里先保持不变)
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('roles', function (Blueprint $table) {
            $table->dropColumn('display_name');
        });
    }
};
