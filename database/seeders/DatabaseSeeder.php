<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,  // 会创建角色、权限和管理员
            WechatPermissionSeeder::class,
            // AdminSeeder::class,  // 不需要，RolePermissionSeeder 已经创建了管理员
        ]);
    }
}
