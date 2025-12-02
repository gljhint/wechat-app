<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\CheckinController;
use App\Http\Controllers\Admin\DocumentController;
use App\Http\Controllers\Admin\DocumentTagController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\LiveController;
use App\Http\Controllers\Admin\UploadController;
use App\Http\Controllers\Admin\DailyTaskController;
use App\Http\Controllers\Admin\WechatRolePermissionController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| 管理员后台路由
|
*/

// 管理员登录路由（不需要认证）
Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
    // 登录相关
    Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('login', [LoginController::class, 'login']);
    
    // 需要认证的路由
    Route::middleware(['auth:admin', 'admin.log'])->group(function () {
        // 登出
        Route::post('logout', [LoginController::class, 'logout'])->name('logout');
        
        // 个人资料
        Route::get('profile', [LoginController::class, 'profile'])->name('profile');
        Route::put('profile', [LoginController::class, 'updateProfile']);
        Route::put('password', [LoginController::class, 'changePassword'])->name('password.change');
        
        // 仪表盘
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('dashboard', [DashboardController::class, 'index']);
        
        // 用户管理
        Route::resource('users', UserController::class)->except(['create', 'store']);
        Route::post('users/bulk', [UserController::class, 'bulk'])->name('users.bulk');
        Route::post('users/{user}/toggle-status', [UserController::class, 'toggleStatus'])->name('users.toggle-status');
        Route::post('users/{user}/assign-role', [UserController::class, 'assignRole'])->name('users.assign-role');
        Route::post('users/{user}/remove-role', [UserController::class, 'removeRole'])->name('users.remove-role');

        // 微信端角色权限管理
        Route::prefix('wechat-roles')->name('wechat-roles.')->group(function () {
            Route::get('/', [WechatRolePermissionController::class, 'index'])->name('index');
            Route::get('/{role}', [WechatRolePermissionController::class, 'show'])->name('show');
            Route::post('/{role}/update', [WechatRolePermissionController::class, 'update'])->name('update');
            Route::get('/{role}/permissions', [WechatRolePermissionController::class, 'getPermissions'])->name('permissions');
            Route::post('/batch-update', [WechatRolePermissionController::class, 'batchUpdate'])->name('batch-update');
            Route::post('/copy', [WechatRolePermissionController::class, 'copy'])->name('copy');
        });

        // 学习任务管理
        Route::resource('daily-tasks', DailyTaskController::class);
        Route::post('daily-tasks/batch', [DailyTaskController::class, 'batchCreate'])->name('daily-tasks.batch');
        Route::post('daily-tasks/{dailyTask}/generate-explanation', [DailyTaskController::class, 'generateExplanation'])->name('daily-tasks.generate-explanation');
        Route::post('daily-tasks/{dailyTask}/regenerate-explanation', [DailyTaskController::class, 'regenerateExplanation'])->name('daily-tasks.regenerate-explanation');
        Route::delete('daily-tasks/{dailyTask}/delete-explanation', [DailyTaskController::class, 'deleteExplanation'])->name('daily-tasks.delete-explanation');

        // 打卡管理
        Route::resource('checkins', CheckinController::class)->only(['index', 'show', 'edit', 'update', 'destroy']);
        Route::get('checkins/export', [CheckinController::class, 'export'])->name('checkins.export');
        Route::get('checkins/statistics', [CheckinController::class, 'statistics'])->name('checkins.statistics');
        
        // 文档管理
        Route::resource('documents', DocumentController::class);
        Route::post('documents/bulk', [DocumentController::class, 'bulk'])->name('documents.bulk');
        Route::get('documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');
        Route::post('documents/presigned-upload-url', [DocumentController::class, 'getPresignedUploadUrl'])->name('documents.presigned-upload-url');

        // 文档标签管理
        Route::resource('document-tags', DocumentTagController::class)->except(['show']);

        // 消息管理
        Route::resource('messages', MessageController::class)->only(['index', 'show', 'destroy']);
        Route::post('messages/bulk', [MessageController::class, 'bulk'])->name('messages.bulk');
        Route::get('messages/export', [MessageController::class, 'export'])->name('messages.export');
        
        // 直播室管理
        Route::resource('live', LiveController::class);
        Route::post('live/bulk', [LiveController::class, 'bulk'])->name('live.bulk');
        Route::post('live/{id}/force-end', [LiveController::class, 'forceEnd'])->name('live.force-end');
        
        // 文件上传
        Route::prefix('upload')->group(function () {
            Route::post('image', [UploadController::class, 'uploadImage'])->name('upload.image');
            Route::post('document', [UploadController::class, 'uploadDocument'])->name('upload.document');
            Route::post('video', [UploadController::class, 'uploadVideo'])->name('upload.video');
            Route::post('/', [UploadController::class, 'upload'])->name('upload');
            Route::delete('delete', [UploadController::class, 'delete'])->name('upload.delete');
            Route::get('list', [UploadController::class, 'list'])->name('upload.list');
        });

        // 需要超级管理员权限的路由
        Route::middleware(['admin.permission:system.manage'])->group(function () {
            // 管理员管理
            Route::resource('admins', AdminController::class);
            Route::post('admins/{admin}/toggle-status', [AdminController::class, 'toggleStatus'])->name('admins.toggle-status');
            
            // 角色管理
            Route::resource('roles', RoleController::class);
            Route::post('roles/{role}/permissions', [RoleController::class, 'updatePermissions'])->name('roles.permissions.update');
            Route::get('roles/{role}/permissions', [RoleController::class, 'getPermissions']);
            
            // 权限管理
            Route::resource('permissions', PermissionController::class);
            Route::post('permissions/sync', [PermissionController::class, 'sync'])->name('permissions.sync');
            
            // 系统设置
            Route::get('settings', [SettingController::class, 'index'])->name('settings');
            Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
            Route::post('settings/cache/clear', [SettingController::class, 'clearCache'])->name('settings.cache.clear');
        });
    });
});