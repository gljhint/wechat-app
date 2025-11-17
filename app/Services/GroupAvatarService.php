<?php

namespace App\Services;

use App\Models\ChatGroup;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class GroupAvatarService
{
    /**
     * 生成群组头像(3x3宫格)
     *
     * @param ChatGroup $group
     * @return string|null 返回生成的头像URL,失败返回null
     */
    public static function generateGroupAvatar(ChatGroup $group): ?string
    {
        try {
            // 加载成员信息
            $group->load(['members.user']);
            $members = $group->members->sortBy('joined_at')->take(9);

            if ($members->isEmpty()) {
                return null;
            }

            $memberCount = $members->count();

            // 计算宫格布局
            $layout = self::getLayout($memberCount);
            $gridSize = $layout['gridSize'];
            $cellSize = 50; // 每个头像单元格大小
            $canvasSize = $cellSize * $gridSize;

            // 创建画布
            $manager = new ImageManager(new Driver());
            $canvas = $manager->create($canvasSize, $canvasSize)->fill('#f0f1f4');

            // 拼接头像
            $index = 0;
            foreach ($members as $member) {
                if ($index >= 9) break;

                $user = $member->user;
                $avatarUrl = $user->avatar_url ?? public_path('default-avatar.png');

                // 如果是远程URL,先下载
                if (filter_var($avatarUrl, FILTER_VALIDATE_URL)) {
                    $avatarUrl = self::downloadAvatar($avatarUrl);
                    if (!$avatarUrl) {
                        $avatarUrl = public_path('default-avatar.png');
                    }
                }

                try {
                    $avatar = $manager->read($avatarUrl);
                    $avatar->cover($cellSize, $cellSize);

                    // 计算位置
                    $row = intdiv($index, $gridSize);
                    $col = $index % $gridSize;

                    // 居中偏移(如果不足填满宫格)
                    $offsetX = ($canvasSize - ($gridSize * $cellSize)) / 2;
                    $offsetY = ($canvasSize - ($gridSize * $cellSize)) / 2;

                    $x = $col * $cellSize + $offsetX;
                    $y = $row * $cellSize + $offsetY;

                    $canvas->place($avatar, 'top-left', (int)$x, (int)$y);
                } catch (\Exception $e) {
                    Log::warning("加载头像失败: {$avatarUrl}, " . $e->getMessage());
                }

                $index++;
            }

            // 保存图片
            $fileName = "group_{$group->id}.png";
            $savePath = public_path("avatars/groups/{$fileName}");

            // 确保目录存在
            $dir = dirname($savePath);
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }

            $canvas->toPng()->save($savePath);

            $avatarUrl = url("avatars/groups/{$fileName}?".time());

            // 更新数据库
            $group->update(['avatar' => $avatarUrl]);

            return $avatarUrl;

        } catch (\Exception $e) {
            Log::error("生成群组头像失败: " . $e->getMessage(), [
                'group_id' => $group->id,
                'trace' => $e->getTraceAsString()
            ]);
            return null;
        }
    }

    /**
     * 根据成员数量决定宫格布局
     */
    private static function getLayout(int $memberCount): array
    {
        if ($memberCount == 1) {
            return ['gridSize' => 1];
        } elseif ($memberCount <= 4) {
            return ['gridSize' => 2];
        } else {
            return ['gridSize' => 3];
        }
    }

    /**
     * 下载远程头像到临时文件
     */
    private static function downloadAvatar(string $url): ?string
    {
        try {
            $tempFile = tempnam(sys_get_temp_dir(), 'avatar_');
            $content = @file_get_contents($url, false, stream_context_create([
                'http' => [
                    'timeout' => 5,
                    'user_agent' => 'Mozilla/5.0'
                ]
            ]));

            if ($content === false) {
                return null;
            }

            file_put_contents($tempFile, $content);
            return $tempFile;
        } catch (\Exception $e) {
            Log::warning("下载头像失败: {$url}, " . $e->getMessage());
            return null;
        }
    }

    /**
     * 判断是否需要重新生成头像
     * 1. 成员数 <= 9 时需要生成
     * 2. 没有头像时,即使成员数 > 9 也要生成一次
     */
    public static function shouldRegenerate(ChatGroup $group): bool
    {
        // 如果成员数 <= 9,肯定要生成
        if ($group->member_count <= 9) {
            return true;
        }
        // 如果成员数 > 9,但是没有头像,也要生成一次(取前9个成员)
        return empty($group->avatar);
    }
}
