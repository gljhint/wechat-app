<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\AdminLog;
use Illuminate\Support\Facades\Auth;

class AdminLogMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // 只记录已认证的管理员操作
        if (Auth::guard('admin')->check()) {
            $this->logAdminAction($request, $response);
        }

        return $response;
    }

    private function logAdminAction($request, $response)
    {
        // 跳过某些不需要记录的路由
        $skipRoutes = [
            'admin.dashboard',
            'admin.login',
            'admin.logout',
        ];

        $routeName = $request->route() ? $request->route()->getName() : null;
        
        if (in_array($routeName, $skipRoutes)) {
            return;
        }

        // 跳过 GET 请求（除了导出操作）
        if ($request->isMethod('GET') && !$request->has('export')) {
            return;
        }

        // 解析操作信息
        $actionInfo = $this->parseAction($request);
        
        if (!$actionInfo) {
            return;
        }

        // 记录日志
        AdminLog::create([
            'admin_id' => Auth::guard('admin')->id(),
            'action' => $actionInfo['action'],
            'model' => $actionInfo['model'],
            'model_id' => $actionInfo['model_id'],
            'description' => $actionInfo['description'],
            'old_values' => $actionInfo['old_values'],
            'new_values' => $actionInfo['new_values'],
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'status_code' => $response->getStatusCode(),
        ]);
    }

    private function parseAction($request)
    {
        $method = $request->method();
        $routeName = $request->route() ? $request->route()->getName() : null;
        $parameters = $request->route() ? $request->route()->parameters() : [];

        // 解析路由信息
        if (!$routeName) {
            return null;
        }

        $routeParts = explode('.', $routeName);
        if (count($routeParts) < 3) {
            return null;
        }

        $resource = $routeParts[1]; // users, roles, etc.
        $action = $routeParts[2]; // index, store, update, etc.

        // 映射资源到模型
        $resourceToModel = [
            'users' => 'App\Models\WechatUser',
            'admins' => 'App\Models\Admin',
            'roles' => 'App\Models\Role',
            'permissions' => 'App\Models\Permission',
            'checkins' => 'App\Models\UserCheckin',
            'documents' => 'App\Models\UserDocument',
            'messages' => 'App\Models\ChatMessage',
        ];

        $model = $resourceToModel[$resource] ?? null;
        $modelId = null;
        $oldValues = null;
        $newValues = null;

        // 获取模型ID
        foreach ($parameters as $key => $value) {
            if (in_array($key, array_keys($resourceToModel))) {
                $modelId = is_object($value) ? $value->id : $value;
                break;
            }
        }

        // 生成描述
        $description = $this->generateDescription($resource, $action, $request, $parameters);

        // 获取新值（对于创建和更新操作）
        if (in_array($action, ['store', 'update']) && $request->isMethod('POST') || $request->isMethod('PUT')) {
            $newValues = $request->except(['_token', '_method', 'password', 'password_confirmation']);
        }

        return [
            'action' => $this->mapAction($action, $method),
            'model' => $model,
            'model_id' => $modelId,
            'description' => $description,
            'old_values' => $oldValues,
            'new_values' => $newValues,
        ];
    }

    private function mapAction($routeAction, $method)
    {
        $actionMap = [
            'store' => 'create',
            'update' => 'update',
            'destroy' => 'delete',
            'bulk' => 'bulk',
            'export' => 'export',
            'sync' => 'sync',
            'toggle-status' => 'update',
        ];

        if (isset($actionMap[$routeAction])) {
            return $actionMap[$routeAction];
        }

        // 根据HTTP方法推断
        switch ($method) {
            case 'POST':
                return 'create';
            case 'PUT':
            case 'PATCH':
                return 'update';
            case 'DELETE':
                return 'delete';
            default:
                return 'view';
        }
    }

    private function generateDescription($resource, $action, $request, $parameters)
    {
        $resourceNames = [
            'users' => '用户',
            'admins' => '管理员',
            'roles' => '角色',
            'permissions' => '权限',
            'checkins' => '打卡记录',
            'documents' => '文档',
            'messages' => '消息',
        ];

        $actionNames = [
            'store' => '创建',
            'update' => '更新',
            'destroy' => '删除',
            'bulk' => '批量操作',
            'export' => '导出',
            'sync' => '同步',
            'toggle-status' => '切换状态',
        ];

        $resourceName = $resourceNames[$resource] ?? $resource;
        $actionName = $actionNames[$action] ?? $action;

        // 特殊处理
        if ($action === 'bulk') {
            $bulkAction = $request->input('action', '操作');
            return "{$actionName}{$resourceName}（{$bulkAction}）";
        }

        if ($action === 'export') {
            return "导出{$resourceName}数据";
        }

        if ($action === 'sync' && $resource === 'permissions') {
            return '同步系统权限';
        }

        return "{$actionName}{$resourceName}";
    }
}