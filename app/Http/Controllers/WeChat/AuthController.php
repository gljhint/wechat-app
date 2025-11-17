<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\WechatUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use EasyWeChat\Kernel\Exceptions\Exception as EasyWeChatException;
use EasyWeChat\OfficialAccount\Application;


class AuthController extends Controller
{
    /**
     * 获取微信授权URL
     */
    public function redirectToWechat(Request $request)
    {
        try {
            $app = app(Application::class);
            $oauth = $app->getOAuth();

            // 获取回调地址
            $callbackUrl = config('easywechat.official_account.default.oauth.callback');
            if (!str_starts_with($callbackUrl, 'http')) {
                $callbackUrl = url($callbackUrl);
            }

            // 生成授权跳转链接（返回的是字符串URL）
            // 使用 snsapi_base 静默授权（测试号通常只支持这个）
            $authUrl = $oauth->scopes(['snsapi_userinfo'])->redirect($callbackUrl);

            if ($request->expectsJson()) {
                return response()->json([
                    'code' => 200,
                    'data' => [
                        'auth_url' => $authUrl
                    ]
                ]);
            }

            return redirect($authUrl);
            
        } catch (EasyWeChatException $e) {
            Log::error('微信授权重定向失败: ' . $e->getMessage());
            
            return response()->json([
                'code' => 500,
                'message' => '获取授权链接失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 微信授权回调
     */
    public function handleWechatCallback(Request $request)
    {
        try {
            $app = app(Application::class);
            $oauth = $app->getOAuth();

            // 获取 code
            $code = $request->get('code');
            if (!$code) {
                throw new \Exception('授权失败，缺少code参数');
            }

            // 通过 code 获取用户信息（snsapi_base 只返回 openid）
            $wechatUser = $oauth->userFromCode($code);
            $wechatUserInfo = $wechatUser->toArray();

            //Log::info('微信用户信息: ', $wechatUserInfo);

            // 获取 openid（snsapi_base 场景下的关键字段）
            $openid = $wechatUserInfo['id'] ?? $wechatUserInfo['openid'] ?? null;

            if (!$openid) {
                throw new \Exception('未获取到用户 OpenID');
            }

            // 查找或创建用户
            $user = WechatUser::where('openid', $openid)->first();

            if (!$user) {
                // snsapi_base 只有 openid，其他信息用默认值
                $user = WechatUser::create([
                    'openid' => $openid,
                    'unionid' => $wechatUserInfo['unionid'] ?? null,
                    'nickname' => $wechatUserInfo['nickname'] ?? $wechatUserInfo['name'] ?? '微信用户_' . substr($openid, -6),
                    'avatar_url' => $wechatUserInfo['avatar'] ?? null,
                    'gender' => isset($wechatUserInfo['sex']) ? $this->parseGender($wechatUserInfo['sex']) : 0,
                    'country' => $wechatUserInfo['country'] ?? null,
                    'province' => $wechatUserInfo['province'] ?? null,
                    'city' => $wechatUserInfo['city'] ?? null,
                    'language' => $wechatUserInfo['language'] ?? 'zh_CN',
                    'wechat_info' => $wechatUserInfo,
                    'last_login_at' => now(),
                ]);
            } else {
                // 更新登录时间和可能的额外信息
                $updateData = [
                    'last_login_at' => now(),
                    'wechat_info' => $wechatUserInfo,
                ];

                // 如果有新的用户信息（snsapi_userinfo 场景），则更新
                if (isset($wechatUserInfo['nickname'])) {
                    $updateData['nickname'] = $wechatUserInfo['nickname'];
                }
                if (isset($wechatUserInfo['avatar'])) {
                    $updateData['avatar_url'] = $wechatUserInfo['avatar'];
                }

                $user->update($updateData);
            }

            // 存储用户会话
            Session::put('wechat_user_id', $user->id);
            Session::put('wechat_user', $user);

            // 重定向到之前访问的页面或首页
            $redirectUrl = Session::pull('wechat_intended_url', route('chat'));

            return redirect($redirectUrl)->with('success', '登录成功');

        } catch (EasyWeChatException $e) {
            Log::error('微信授权回调失败: ' . $e->getMessage());
            
            return redirect('/wechat/login')->with('error', '登录失败: ' . $e->getMessage());
        } catch (\Exception $e) {
            Log::error('微信登录处理失败: ' . $e->getMessage());
            
            return redirect('/wechat/login')->with('error', '登录失败，请重试');
        }
    }

    /**
     * 使用code直接登录（适用于小程序或自定义授权流程）
     */
    public function loginWithCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        try {
            $app = app(Application::class);
            $oauth = $app->getOAuth();

            // 通过code获取用户信息
            $wechatUser = $oauth->userFromCode($request->code);
            $wechatUserInfo = $wechatUser->toArray();

            $openid = $wechatUserInfo['id'] ?? $wechatUserInfo['openid'] ?? null;

            if (!$openid) {
                throw new \Exception('未获取到用户 OpenID');
            }

            // 查找或创建用户
            $user = WechatUser::where('openid', $openid)->first();

            if (!$user) {
                $user = WechatUser::create([
                    'openid' => $openid,
                    'unionid' => $wechatUserInfo['unionid'] ?? null,
                    'nickname' => $wechatUserInfo['nickname'] ?? $wechatUserInfo['name'] ?? '微信用户_' . substr($openid, -6),
                    'avatar_url' => $wechatUserInfo['avatar'] ?? null,
                    'gender' => isset($wechatUserInfo['sex']) ? $this->parseGender($wechatUserInfo['sex']) : 0,
                    'country' => $wechatUserInfo['country'] ?? null,
                    'province' => $wechatUserInfo['province'] ?? null,
                    'city' => $wechatUserInfo['city'] ?? null,
                    'language' => $wechatUserInfo['language'] ?? 'zh_CN',
                    'wechat_info' => $wechatUserInfo,
                    'last_login_at' => now(),
                ]);
            } else {
                $updateData = [
                    'last_login_at' => now(),
                    'wechat_info' => $wechatUserInfo,
                ];

                if (isset($wechatUserInfo['nickname'])) {
                    $updateData['nickname'] = $wechatUserInfo['nickname'];
                }
                if (isset($wechatUserInfo['avatar'])) {
                    $updateData['avatar_url'] = $wechatUserInfo['avatar'];
                }

                $user->update($updateData);
            }

            // 存储用户会话
            Session::put('wechat_user_id', $user->id);
            Session::put('wechat_user', $user);

            return response()->json([
                'code' => 200,
                'message' => '登录成功',
                'data' => [
                    'user' => $user,
                    'token' => $this->generateToken($user),
                ]
            ]);

        } catch (EasyWeChatException $e) {
            Log::error('微信Code登录失败: ' . $e->getMessage());
            
            return response()->json([
                'code' => 500,
                'message' => '登录失败: ' . $e->getMessage(),
                'error' => $e->getMessage()
            ], 500);
        } catch (\Exception $e) {
            Log::error('微信登录失败: ' . $e->getMessage());
            
            return response()->json([
                'code' => 500,
                'message' => '登录失败，请重试',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取当前用户信息
     */
    public function user(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $user = WechatUser::find($userId);
        
        if (!$user || $user->status !== WechatUser::STATUS_ACTIVE) {
            return response()->json([
                'code' => 403,
                'message' => '用户已被禁用'
            ], 403);
        }

        return response()->json([
            'code' => 200,
            'data' => $user
        ]);
    }

    /**
     * 退出登录
     */
    public function logout(Request $request)
    {
        Session::forget('wechat_user_id');
        Session::forget('wechat_user');

        return response()->json([
            'code' => 200,
            'message' => '退出成功'
        ]);
    }

    /**
     * 更新用户资料
     */
    public function updateProfile(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        
        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $user = WechatUser::find($userId);
        
        $request->validate([
            'real_name' => 'nullable|string|max:50',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'employee_id' => 'nullable|string|max:50|unique:wechat_users,employee_id,' . $user->id,
        ]);

        $user->update($request->only([
            'real_name',
            'phone', 
            'email',
            'employee_id'
        ]));

        return response()->json([
            'code' => 200,
            'message' => '更新成功',
            'data' => $user
        ]);
    }

    /**
     * 解析微信性别字段
     */
    private function parseGender($sex)
    {
        switch ($sex) {
            case 1:
                return 1; // 男
            case 2:
                return 2; // 女
            default:
                return 0; // 未知
        }
    }

    /**
     * 检查微信授权状态
     */
    public function checkWechatAuth(Request $request)
    {
        try {
            $app = app(Application::class);
            $oauth = $app->getOAuth();
            $isInWechat = strpos($request->header('user-agent', ''), 'MicroMessenger') !== false;
            
            return response()->json([
                'code' => 200,
                'data' => [
                    'is_in_wechat' => $isInWechat,
                    'oauth_url' => $isInWechat ? $oauth->redirect() : null,
                    'can_oauth' => $isInWechat
                ]
            ]);
            
        } catch (EasyWeChatException $e) {
            return response()->json([
                'code' => 500,
                'message' => '检查授权状态失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 生成用户令牌
     */
    private function generateToken($user)
    {
        return base64_encode($user->id . '|' . $user->openid . '|' . time());
    }
}
