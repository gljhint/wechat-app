<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Session;
use App\Models\WechatUser;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 注册 Blade 权限检查指令
        $this->registerBladeDirectives();

        // 为所有微信端视图注入当前用户
        $this->registerViewComposers();
    }

    /**
     * 注册自定义 Blade 指令
     */
    protected function registerBladeDirectives(): void
    {
        // @can('permission.name') ... @endcan
        Blade::if('wechatCan', function ($permission) {
            $userId = Session::get('wechat_user_id');
            if (!$userId) {
                return false;
            }

            $user = WechatUser::find($userId);
            return $user && $user->hasPermission($permission);
        });

        // @canAny(['permission1', 'permission2']) ... @endcanAny
        Blade::if('wechatCanAny', function ($permissions) {
            $userId = Session::get('wechat_user_id');
            if (!$userId) {
                return false;
            }

            $user = WechatUser::find($userId);
            return $user && $user->hasAnyPermission($permissions);
        });

        // @canAll(['permission1', 'permission2']) ... @endcanAll
        Blade::if('wechatCanAll', function ($permissions) {
            $userId = Session::get('wechat_user_id');
            if (!$userId) {
                return false;
            }

            $user = WechatUser::find($userId);
            return $user && $user->hasAllPermissions($permissions);
        });

        // @cannot('permission.name') ... @endcannot
        Blade::if('wechatCannot', function ($permission) {
            $userId = Session::get('wechat_user_id');
            if (!$userId) {
                return true;
            }

            $user = WechatUser::find($userId);
            return !$user || !$user->hasPermission($permission);
        });
    }

    /**
     * 注册视图组合器
     */
    protected function registerViewComposers(): void
    {
        // 为所有微信端视图注入当前用户
        View::composer('wechat.*', function ($view) {
            $userId = Session::get('wechat_user_id');
            if ($userId && !$view->offsetExists('currentUser')) {
                $user = WechatUser::find($userId);
                $view->with('currentUser', $user);
            }
        });
    }
}
