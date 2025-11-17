<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;
use App\Models\WechatUser;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
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

            // 保存intended URL，登录后跳转回来
            Session::put('wechat_intended_url', $request->fullUrl());
            return redirect()->route('wechat.auth.redirect');
        }

        // 获取用户信息
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

        // 检查用户是否有角色
        if (!$user->hasRole()) {
            if ($request->expectsJson()) {
                return response()->json([
                    'code' => 403,
                    'message' => '您还没有访问权限，请联系管理员分配角色'
                ], 403);
            }

            // 跳转到无权限页面
            return redirect()->route('no.permission');
        }
        return $next($request);
    }
}
