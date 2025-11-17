<?php

return [
    /*
    |--------------------------------------------------------------------------
    | 直播权限配置
    |--------------------------------------------------------------------------
    |
    | 通过以下配置来控制哪些企业微信用户可以发起直播。
    | - host_user_ids:      允许发起直播的 wechat_users 表主键 ID 列表
    | - host_employee_ids:  允许发起直播的员工工号列表
    | - host_departments:   允许发起直播的部门名称（不区分大小写）
    | - host_positions:     允许发起直播的职位名称（不区分大小写）
    |
    | 可以通过环境变量进行快速配置，例如：
    | LIVE_HOST_USER_IDS=1,2,3
    | LIVE_HOST_EMPLOYEE_IDS=A001,B002
    | LIVE_HOST_DEPARTMENTS=运营部,教学部
    | LIVE_HOST_POSITIONS=管理员,主持人
    |
    */

    'host_user_ids' => collect(explode(',', env('LIVE_HOST_USER_IDS', '')))
        ->map(fn($value) => (int) trim($value))
        ->filter()
        ->unique()
        ->values()
        ->all(),

    'host_employee_ids' => collect(explode(',', env('LIVE_HOST_EMPLOYEE_IDS', '')))
        ->map(fn($value) => trim($value))
        ->filter()
        ->unique()
        ->values()
        ->all(),

    'host_departments' => collect(explode(',', env('LIVE_HOST_DEPARTMENTS', '')))
        ->map(fn($value) => trim($value))
        ->filter()
        ->unique()
        ->values()
        ->all(),

    'host_positions' => collect(explode(',', env('LIVE_HOST_POSITIONS', '')))
        ->map(fn($value) => trim($value))
        ->filter()
        ->unique()
        ->values()
        ->all(),
];
