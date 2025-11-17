<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 创建超级管理员
        Admin::create([
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin123'),
            'name' => '超级管理员',
            'status' => Admin::STATUS_ACTIVE,
            'is_super' => 1,
        ]);

        $this->command->info('超级管理员创建成功！');
        $this->command->info('用户名: admin');
        $this->command->info('密码: admin123');
    }
}
