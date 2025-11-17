<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminPermissionMiddleware
{
    public function handle(Request $request, Closure $next, $permission = null)
    {
        // 检查是否已认证
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }

        $admin = Auth::guard('admin')->user();

        // 超级管理员跳过权限检查
        if ($admin->hasRole('super-admin')) {
            return $next($request);
        }

        // 检查权限
        if ($permission && !$admin->hasPermission($permission)) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => '权限不足'
                ], 403);
            }
            
            abort(403, '权限不足');
        }

        return $next($request);
    }
}