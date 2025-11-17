<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use EasyWeChat\OfficialAccount\Application;

class SongController extends Controller
{
    /**
     * 显示349首版本歌曲列表
     */
    public function index349()
    {
        $songs = $this->getSongsData('349');
        $version = '349';
        $hideTabbar = true;

        return view('wechat.songs-index', compact('songs', 'version', 'hideTabbar'));
    }

    /**
     * 显示870首版本歌曲列表
     */
    public function index870()
    {
        $songs = $this->getSongsData('870');
        $version = '870';
        $hideTabbar = true;

        return view('wechat.songs-index', compact('songs', 'version', 'hideTabbar'));
    }

    /**
     * 显示349首版本歌曲详情
     */
    public function show349($id)
    {
        return $this->showSong($id, '349');
    }

    /**
     * 显示870首版本歌曲详情
     */
    public function show870($id)
    {
        return $this->showSong($id, '870');
    }

    /**
     * 显示歌曲详情（通用方法）
     */
    private function showSong($id, $version)
    {
        $songs = $this->getSongsData($version);

        if (!isset($songs[$id])) {
            abort(404, '歌曲不存在');
        }

        $song = $songs[$id];
        $songNumber = $id;
        $baseUrl = $version === '349'
            ? 'https://fuyin.xiangbolin.com/songzhu/'
            : 'https://fuyin.xiangbolin.com/songzhushengshi/';

        // 获取微信JS-SDK配置
        $wxConfig = $this->getWeChatJsConfig();
        $hideTabbar = true;

        return view('wechat.songs-show', compact('song', 'songNumber', 'baseUrl', 'wxConfig', 'version', 'hideTabbar'));
    }

    /**
     * 获取歌曲数据
     */
    private function getSongsData($version = '349')
    {
        // 使用缓存提高性能
        return Cache::remember("songs_data_{$version}", 3600, function () use ($version) {
            $songsFile = config_path("songs{$version}.php");

            if (!file_exists($songsFile)) {
                throw new \Exception("歌曲数据文件不存在: songs{$version}.php");
            }

            // 加载歌曲数据
            include $songsFile;

            // 返回歌曲数组
            return $songs ?? [];
        });
    }

    /**
     * 获取微信JS-SDK配置
     */
    private function getWeChatJsConfig()
    {
        $app = app(Application::class);
        $url = request()->url();

        // 使用 EasyWeChat 生成 JSSDK 配置
        return $app->getUtils()->buildJsSdkConfig(
            url: $url,
            jsApiList: ['previewImage'],
            openTagList: [],
            debug: false
        );
    }
}
