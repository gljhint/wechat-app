<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WechatPermission;

class WechatPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 禁用外键约束
        \DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // 清空现有权限
        WechatPermission::truncate();

        // 启用外键约束
        \DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 插入默认权限
        $permissions = WechatPermission::getDefaultPermissions();

        foreach ($permissions as $permission) {
            WechatPermission::create($permission);
        }

        $this->command->info('微信端权限初始化完成！共创建 ' . count($permissions) . ' 个权限。');
    }
}
