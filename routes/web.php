<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeChat\LiveController;
use App\Http\Controllers\WeChat\AuthController;
use App\Http\Controllers\WeChat\ChatController;
use App\Http\Controllers\WeChat\ChatGroupController;
use App\Http\Controllers\WeChat\CheckinController;
use App\Http\Controllers\WeChat\DocumentController;
use App\Http\Controllers\WeChat\SystemController;
use App\Http\Controllers\WeChat\SongController;
use App\Http\Controllers\WeChat\BibleExplanationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// 微信登录页面
Route::get('/login', function () {
    return view('wechat.login');
})->name('login');

// 无权限页面（只需要登录,不需要角色）
Route::get('/no-permission', function () {
    return view('wechat.no-permission');
})->name('no.permission')->middleware(['web', 'wechat.auth']);

// 需要登录并有角色的页面
Route::middleware(['web', 'check.role'])->group(function () {
    // 聊天页面（主页）- 需要查看聊天权限
    Route::get('/', function () {
        return view('wechat.chat');
    })->middleware('check.permission:chat.view')->name('chat');

    // 私聊会话页面 - 需要查看聊天权限
    Route::get('/chat/conversation', function () {
        return view('wechat.chat-conversation');
    })->middleware('check.permission:chat.view')->name('chat.conversation');

    // 打卡页面（需要打卡权限）
    Route::get('/checkin', [CheckinController::class, 'index'])
        ->middleware('check.permission:checkin.daily')
        ->name('checkin');

    // 资料页面 - 需要查看文档权限
    Route::get('/materials', function () {
        return view('wechat.materials');
    })->middleware('check.permission:document.view')->name('materials');

    // 个人中心 - 需要查看个人资料权限
    Route::get('/profile', function () {
        return view('wechat.profile');
    })->middleware('check.permission:profile.view')->name('profile');

    // 个人资料设置 - 所有登录用户可访问
    Route::get('/profile/settings', function () {
        return view('wechat.profile-settings');
    })->name('profile.settings');

    // 发现页面 - 所有登录用户可访问
    Route::get('/discover', function () {
        return view('wechat.discover');
    })->name('discover');

    // 系统设置 - 需要系统设置权限
    Route::get('/settings', function () {
        return view('wechat.settings');
    })->middleware('check.permission:system.settings')->name('settings');

    // 用户角色管理页面
    Route::get('/settings/users', function () {
        return view('wechat.settings-users');
    })->middleware('check.permission:system.settings')->name('settings.users');

    // 学习任务管理页面
    Route::get('/settings/tasks', function () {
        return view('wechat.settings-tasks');
    })->middleware('check.permission:system.settings')->name('settings.tasks');

    // 发起聊天页面 - 需要发送消息权限
    Route::get('/new-chat', function () {
        return view('wechat.new-chat');
    })->middleware('check.permission:chat.send')->name('new-chat');

    // 群聊消息页面 - 需要查看聊天权限
    Route::get('/chat/group', function () {
        return view('wechat.chat-group');
    })->middleware('check.permission:chat.view')->name('chat.group');

    // 群聊详情页面 - 需要查看聊天权限
    Route::get('/chat/group-detail', function () {
        return view('wechat.chat-group-detail');
    })->middleware('check.permission:chat.view')->name('chat.group.detail');

    // 创建群聊页面 - 需要创建群聊权限
    Route::get('/chat/create-group', function () {
        return view('wechat.chat-create-group');
    })->middleware('check.permission:chat.group.create')->name('chat.create.group');

    // 群二维码页面 - 仅需登录（权限由API控制）
    Route::get('/chat/group-qrcode', function () {
        return view('wechat.chat-group-qrcode');
    })->name('chat.group.qrcode');
});

// 保留的示例页面
Route::get('/list', function () {
    return view('wechat.list');
})->name('list');

Route::get('/form', function () {
    return view('wechat.form');
})->name('form');

// 原Laravel欢迎页面（保留作为参考）
Route::get('/welcome', function () {
    return view('welcome');
})->name('welcome');

// 微信相关路由
Route::prefix('wechat')->name('wechat.')->group(function () {
    // 微信授权
    Route::get('/auth/redirect', [AuthController::class, 'redirectToWechat'])->name('auth.redirect');
    Route::get('/oauth/callback', [AuthController::class, 'handleWechatCallback'])->name('auth.callback');
    Route::post('/auth/login', [AuthController::class, 'loginWithCode'])->name('auth.login');
    Route::get('/auth/check', [AuthController::class, 'checkWechatAuth'])->name('auth.check');
    
    // 需要登录并有角色的路由
    Route::middleware(['web', 'check.role'])->group(function () {
        // 用户相关 - 需要查看个人资料权限
        Route::get('/user', [AuthController::class, 'user'])
            ->middleware('check.permission:profile.view')
            ->name('user');
        // 更新个人资料 - 所有登录用户可访问
        Route::post('/user/profile', [AuthController::class, 'updateProfile'])
            ->name('user.profile');
        Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

        // 聊天功能 - 需要相应权限
        Route::middleware('check.permission:chat.view')->group(function () {
            Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
            Route::get('/chat/messages', [ChatController::class, 'getMessages'])->name('chat.messages');
            Route::post('/chat/read', [ChatController::class, 'markAsRead'])->name('chat.read');
            Route::get('/chat/unread', [ChatController::class, 'getUnreadCount'])->name('chat.unread');
            Route::get('/chat/contacts', [ChatController::class, 'getContacts'])->name('chat.contacts');
            Route::get('/chat/contacts/{contact}', [ChatController::class, 'showContact'])->name('chat.contacts.show');
            Route::get('/chat/available-users', [ChatController::class, 'availableContacts'])->name('chat.available');
            Route::get('/chat/file-preview', [ChatController::class, 'filePreview'])->name('chat.file.preview');
        });

        Route::post('/chat/send', [ChatController::class, 'sendMessage'])
            ->middleware('check.permission:chat.send')
            ->name('chat.send');
        Route::delete('/chat/message/{messageId}', [ChatController::class, 'deleteMessage'])
            ->middleware('check.permission:chat.send')
            ->name('chat.delete');
        Route::post('/chat/message/{messageId}/recall', [ChatController::class, 'recallMessage'])
            ->middleware('check.permission:chat.send')
            ->name('chat.recall');

        // 文件上传路由
        Route::post('/chat/upload/image', [ChatController::class, 'uploadImage'])
            ->middleware('check.permission:chat.send')
            ->name('chat.upload.image');
        Route::post('/chat/upload/file', [ChatController::class, 'uploadFile'])
            ->middleware('check.permission:chat.send')
            ->name('chat.upload.file');
        Route::post('/chat/upload/wechat', [ChatController::class, 'uploadFromWechat'])
            ->middleware('check.permission:chat.send')
            ->name('chat.upload.wechat');

        // 群聊功能 - 需要相应权限
        Route::middleware('check.permission:chat.view')->group(function () {
            Route::get('/chat/groups', [ChatGroupController::class, 'getGroups'])->name('chat.groups.list');
            Route::get('/chat/groups/{groupId}', [ChatGroupController::class, 'getGroupDetail'])->name('chat.groups.detail');
            Route::get('/chat/groups/{groupId}/messages', [ChatGroupController::class, 'getGroupMessages'])->name('chat.groups.messages');
        });

        Route::post('/chat/groups', [ChatGroupController::class, 'createGroup'])
            ->middleware('check.permission:chat.group.create')
            ->name('chat.groups.create');
        Route::put('/chat/groups/{groupId}', [ChatGroupController::class, 'updateGroup'])
            ->name('chat.groups.update');
        Route::post('/chat/groups/send', [ChatGroupController::class, 'sendGroupMessage'])
            ->middleware('check.permission:chat.send')
            ->name('chat.groups.send');
        Route::post('/chat/groups/{groupId}/message/{messageId}/recall', [ChatGroupController::class, 'recallGroupMessage'])
            ->middleware('check.permission:chat.send')
            ->name('chat.groups.recall');
        Route::post('/chat/groups/{groupId}/invite', [ChatGroupController::class, 'inviteMembers'])
            ->name('chat.groups.invite');
        Route::delete('/chat/groups/{groupId}/members/{memberId}', [ChatGroupController::class, 'removeMember'])
            ->name('chat.groups.remove.member');
        Route::post('/chat/groups/{groupId}/leave', [ChatGroupController::class, 'leaveGroup'])
            ->name('chat.groups.leave');
        Route::delete('/chat/groups/{groupId}', [ChatGroupController::class, 'disbandGroup'])
            ->name('chat.groups.disband');

        // 群二维码功能
        Route::post('/chat/groups/{groupId}/qrcode', [ChatGroupController::class, 'generateQRCode'])
            ->middleware('check.permission:chat.group.manage')
            ->name('chat.groups.qrcode');

        // 学习打卡功能（需要权限）
        Route::middleware('check.permission:checkin.daily')->group(function () {
            Route::post('/checkin/complete', [CheckinController::class, 'complete'])
                ->middleware('throttle:5,1')
                ->name('checkin.complete');
            Route::post('/checkin/makeup', [CheckinController::class, 'makeup'])
                ->middleware('throttle:10,1')
                ->name('checkin.makeup');
            Route::get('/checkin/history', [CheckinController::class, 'history'])->name('checkin.history');
            Route::get('/api/checkin/history', [CheckinController::class, 'historyData'])->name('checkin.history.data');
            Route::get('/checkin/task/{date}', [CheckinController::class, 'taskDetail'])->name('checkin.task');

            // AI解释功能
            Route::get('/bible-explanations/task/{dailyTaskId}', [BibleExplanationController::class, 'show'])->name('bible-explanations.show');
            Route::post('/bible-explanations/{explanation}/vote', [BibleExplanationController::class, 'vote'])
                ->middleware('throttle:10,1')
                ->name('bible-explanations.vote');
            Route::post('/bible-explanations/task/{dailyTaskId}/generate', [BibleExplanationController::class, 'generate'])
                ->middleware('throttle:5,1')
                ->name('bible-explanations.generate');
            Route::post('/bible-explanations/task/{dailyTaskId}/regenerate', [BibleExplanationController::class, 'regenerate'])
                ->middleware('throttle:5,1')
                ->name('bible-explanations.regenerate');
        });

        // 查看他人打卡功能（需要权限）
        Route::middleware('check.permission:checkin.view.others')->group(function () {
            Route::get('/checkin/management', [CheckinController::class, 'viewAll'])->name('checkin.management');
            Route::get('/api/checkin/all', [CheckinController::class, 'getAllCheckinsData'])->name('checkin.all.data');
        });

        // 文档功能 - 需要相应权限
        Route::middleware('check.permission:document.view')->group(function () {
            Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
            Route::get('/documents/list', [DocumentController::class, 'getDocuments'])->name('documents.list');
            Route::get('/documents/{documentId}/preview', [DocumentController::class, 'preview'])->name('documents.preview');
            Route::get('/documents/categories', [DocumentController::class, 'getCategories'])->name('documents.categories');
            Route::get('/documents/statistics', [DocumentController::class, 'getStatistics'])->name('documents.statistics');
        });

        Route::get('/documents/{documentId}/download', [DocumentController::class, 'download'])
            ->middleware('check.permission:document.download')
            ->name('documents.download');
        Route::post('/documents/upload', [DocumentController::class, 'upload'])
            ->middleware('check.permission:document.upload')
            ->name('documents.upload');
        Route::delete('/documents/{documentId}', [DocumentController::class, 'delete'])
            ->middleware('check.permission:document.manage')
            ->name('documents.delete');
        Route::put('/documents/{documentId}', [DocumentController::class, 'update'])
            ->middleware('check.permission:document.manage')
            ->name('documents.update');

        // 直播功能 - 固定直播室模式
        Route::prefix('live')->name('live.')->group(function () {
            // 观看直播 - 需要观看权限
            Route::middleware('check.permission:live.view')->group(function () {
                Route::get('/', [LiveController::class, 'index'])->name('index');
                Route::get('/{roomId}', [LiveController::class, 'show'])->name('show');
                Route::get('/{roomId}/stats', [LiveController::class, 'getStats'])->name('stats');

                // 获取所有直播间实时状态 (批量)
                Route::get('/api/all-stats', [LiveController::class, 'getAllStats'])->name('all-stats');

                // 观众 Token
                Route::post('/{roomId}/token/viewer', [LiveController::class, 'getViewerToken'])->name('token.viewer');
            });

            // 直播管理 - 需要开播权限
            Route::middleware('check.permission:live.create')->group(function () {
                // 结束直播
                Route::post('/{roomId}/end', [LiveController::class, 'endLive'])->name('end');
            });
        });

        // 系统设置功能 - 需要系统设置权限
        Route::middleware('check.permission:system.settings')->group(function () {
            Route::get('/system/users', [SystemController::class, 'getUserList'])->name('system.users.list');
            Route::post('/system/users/assign-role', [SystemController::class, 'assignRole'])->name('system.users.assign-role');
            Route::get('/system/users/statistics', [SystemController::class, 'getRoleStatistics'])->name('system.users.statistics');
            Route::post('/system/tasks', [SystemController::class, 'createTask'])->name('system.tasks.create');

            Route::get('/system/tasks', [SystemController::class, 'getTaskList'])->name('system.tasks.list');
        });
        // 颂主圣诗功能（所有登录用户可访问）
        // 349首版本
        Route::prefix('songs-349')->name('songs.349.')->group(function () {
            Route::get('/', [SongController::class, 'index349'])->name('index');
            Route::get('/{id}', [SongController::class, 'show349'])->name('show');
        });

        // 870首版本
        Route::prefix('songs-870')->name('songs.870.')->group(function () {
            Route::get('/', [SongController::class, 'index870'])->name('index');
            Route::get('/{id}', [SongController::class, 'show870'])->name('show');
        });
    });
});

// 管理员后台路由
require __DIR__.'/admin.php';
