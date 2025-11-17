<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    /**
     * 显示登录页面
     */
    public function showLoginForm()
    {
        return view('admin.auth.login');
    }

    /**
     * 处理登录
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'captcha' => 'nullable|string',
        ]);

        $credentials = $request->only('username', 'password');
        
        // 查找管理员
        $admin = Admin::where('username', $credentials['username'])
            ->orWhere('email', $credentials['username'])
            ->first();

        if (!$admin) {
            return back()->withErrors([
                'username' => '用户名或密码错误',
            ])->withInput($request->except('password'));
        }

        if ($admin->status !== Admin::STATUS_ACTIVE) {
            return back()->withErrors([
                'username' => '账号已被禁用',
            ])->withInput($request->except('password'));
        }

        if (!Hash::check($credentials['password'], $admin->password)) {
            return back()->withErrors([
                'username' => '用户名或密码错误',
            ])->withInput($request->except('password'));
        }

        // 登录成功，更新登录信息
        $admin->update([
            'last_login_at' => now(),
            'last_login_ip' => $request->ip(),
        ]);

        // 存储登录信息
        Auth::guard('admin')->login($admin, $request->filled('remember'));
        Session::put('admin_id', $admin->id);
        Session::put('admin', $admin->load('roles.permissions'));

        return redirect()->intended(route('admin.dashboard'));
    }

    /**
     * 退出登录
     */
    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        Session::forget('admin_id');
        Session::forget('admin');
        
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    /**
     * 修改密码
     */
    public function changePassword(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        
        if (!$admin) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $request->validate([
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if (!Hash::check($request->current_password, $admin->password)) {
            return response()->json([
                'code' => 400,
                'message' => '当前密码错误'
            ], 400);
        }

        $admin->update([
            'password' => Hash::make($request->new_password)
        ]);

        return response()->json([
            'code' => 200,
            'message' => '密码修改成功'
        ]);
    }

    /**
     * 个人资料页面
     */
    public function profile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return redirect()->route('admin.login');
        }

        $admin->load('roles');

        return view('admin.profile', compact('admin'));
    }

    /**
     * 更新个人资料
     */
    public function updateProfile(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return redirect()->route('admin.login');
        }

        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:admins,email,' . $admin->id,
            'phone' => 'nullable|string|max:20',
            'avatar' => 'nullable|url|max:500',
        ]);

        $admin->update($request->only('name', 'email', 'phone', 'avatar'));

        return redirect()->route('admin.profile')->with('success', '个人资料更新成功');
    }
}
