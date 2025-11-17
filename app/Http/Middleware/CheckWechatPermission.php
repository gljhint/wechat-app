<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;
use App\Models\WechatUser;

class CheckWechatPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string|null  $permission  需要的权限（可选）
     */
    public function handle(Request $request, Closure $next, string $permission = null): Response
    {
        $userId = Session::get('wechat_user_id');

        // 未登录
        if (!$userId) {
            if ($request->expectsJson()) {
                return response()->json([
                    'code' => 401,
                    'message' => '请先登录'
                ], 401);
            }

            Session::put('wechat_intended_url', $request->fullUrl());
            return redirect()->route('wechat.auth.redirect');
        }
    
        // 获取用户
        $user = WechatUser::find($userId);

        // 用户不存在或被禁用
        if (!$user || $user->status !== WechatUser::STATUS_ACTIVE) {
            Session::forget('wechat_user_id');
            Session::forget('wechat_user');

            if ($request->expectsJson()) {
                return response()->json([
                    'code' => 403,
                    'message' => '账号已被禁用'
                ], 403);
            }

            return redirect()->route('login')->with('error', '账号已被禁用');
        }

        // 检查是否有角色
        if (!$user->hasRole()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'code' => 403,
                    'message' => '您还没有访问权限，请联系管理员分配角色'
                ], 403);
            }

            return redirect()->route('no.permission');
        }

        // 如果指定了权限，检查用户是否有该权限
        if ($permission && !$user->hasPermission($permission)) {
            if ($request->expectsJson()) {
                return response()->json([
                    'code' => 403,
                    'message' => '您没有权限执行此操作'
                ], 403);
            }

            // 重定向到无权限页面，避免无限循环
            return redirect()->route('no.permission')->with('error', '您没有权限执行此操作');
        }

        return $next($request);
    }
}
