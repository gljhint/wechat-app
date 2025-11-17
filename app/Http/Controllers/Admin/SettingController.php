<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;

class SettingController extends Controller
{
    public function index()
    {
        $settings = [
          
        ];

        return view('admin.settings.index', compact('settings'));
    }

    public function clearCache()
    {
        try {
            // 清除应用缓存
            Artisan::call('cache:clear');
            
            // 清除配置缓存
            Artisan::call('config:clear');
            
            // 清除视图缓存
            Artisan::call('view:clear');
            
            // 清除路由缓存
            Artisan::call('route:clear');

            return response()->json([
                'success' => true,
                'message' => '缓存清理成功'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '缓存清理失败：' . $e->getMessage()
            ], 500);
        }
    }

    public function systemInfo()
    {
        $info = [
            // PHP 信息
            'php_version' => PHP_VERSION,
            'php_extensions' => get_loaded_extensions(),
            
            // Laravel 信息
            'laravel_version' => app()->version(),
            'app_env' => config('app.env'),
            'app_debug' => config('app.debug'),
            
            // 服务器信息
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            'server_name' => $_SERVER['SERVER_NAME'] ?? 'Unknown',
            'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
            
            // 数据库信息
            'database_driver' => config('database.default'),
            'database_host' => config('database.connections.' . config('database.default') . '.host'),
            'database_name' => config('database.connections.' . config('database.default') . '.database'),
            
            // 缓存信息
            'cache_driver' => config('cache.default'),
            'session_driver' => config('session.driver'),
            'queue_driver' => config('queue.default'),
            
            // 存储信息
            'filesystem_driver' => config('filesystems.default'),
            'upload_max_filesize' => ini_get('upload_max_filesize'),
            'post_max_size' => ini_get('post_max_size'),
            'memory_limit' => ini_get('memory_limit'),
            
            // 系统负载
            'memory_usage' => memory_get_usage(true),
            'memory_peak_usage' => memory_get_peak_usage(true),
            'disk_free_space' => disk_free_space('/'),
            'disk_total_space' => disk_total_space('/'),
        ];

        return view('admin.settings.system-info', compact('info'));
    }

    private function formatBytes($bytes, $precision = 2)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
}