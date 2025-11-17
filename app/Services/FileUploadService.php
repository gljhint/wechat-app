<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

/**
 * 文件上传服务
 *
 * 支持上传到 Cloudflare R2
 * 自动处理图片压缩、文件类型验证等
 */
class FileUploadService
{
    // 文件大小限制 (字节)
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;   // 10MB
    const MAX_FILE_SIZE = 100 * 1024 * 1024;   // 100MB

    /**
     * 上传图片到R2
     *
     * @param UploadedFile $file 上传的文件
     * @param int $userId 用户ID
     * @param bool $compress 是否压缩(默认true)
     * @return array ['url' => string, 'path' => string, 'size' => int, 'mime_type' => string]
     * @throws \Exception
     */
    public function uploadImage(UploadedFile $file, int $userId, bool $compress = true): array
    {
        // 验证文件
        $this->validateImage($file);

        // 生成文件路径 (保留原始文件名)
        $path = $this->generatePath(
            'images',
            $userId,
            $file->getClientOriginalExtension(),
            $file->getClientOriginalName()  // 传递原始文件名
        );

        // 如果需要压缩且安装了intervention/image
        if ($compress && class_exists(Image::class)) {
            $compressedImage = $this->compressImage($file);
            Storage::disk('r2')->put($path, $compressedImage, 'public');
            $size = strlen($compressedImage);
        } else {
            // 直接上传原图
            Storage::disk('r2')->putFileAs(
                dirname($path),
                $file,
                basename($path),
                'public'
            );
            $size = $file->getSize();
        }

        // 获取R2公网URL
        $url = Storage::disk('r2')->url($path);

        return [
            'url' => $url,
            'path' => $path,
            'size' => $size,
            'mime_type' => $file->getMimeType(),
            'original_name' => $file->getClientOriginalName(),
        ];
    }

    /**
     * 上传文件到R2
     *
     * @param UploadedFile $file 上传的文件
     * @param int $userId 用户ID
     * @return array ['url' => string, 'path' => string, 'size' => int, 'mime_type' => string]
     * @throws \Exception
     */
    public function uploadFile(UploadedFile $file, int $userId): array
    {
        // 验证文件
        $this->validateFile($file);

        // 生成文件路径 (保留原始文件名)
        $path = $this->generatePath(
            'files',
            $userId,
            $file->getClientOriginalExtension(),
            $file->getClientOriginalName()  // 传递原始文件名
        );

        // 上传到R2
        Storage::disk('r2')->putFileAs(
            dirname($path),
            $file,
            basename($path),
            'public'
        );

        // 获取R2公网URL
        $url = Storage::disk('r2')->url($path);

        return [
            'url' => $url,
            'path' => $path,
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'original_name' => $file->getClientOriginalName(),
        ];
    }

    /**
     * 上传微信临时素材(从URL下载后上传到R2)
     *
     * @param string $mediaUrl 微信媒体URL
     * @param int $userId 用户ID
     * @param string $type 类型: image, file, voice, video
     * @return array
     * @throws \Exception
     */
    public function uploadFromWechatMedia(string $mediaUrl, int $userId, string $type = 'image'): array
    {
        // 从微信下载文件
        $tempFile = $this->downloadFromUrl($mediaUrl);

        try {
            // 根据类型处理
            if ($type === 'image') {
                $extension = $this->guessExtensionFromUrl($mediaUrl, 'jpg');
                $path = $this->generatePath('images', $userId, $extension);
            } else {
                $extension = $this->guessExtensionFromUrl($mediaUrl, 'bin');
                $path = $this->generatePath('files', $userId, $extension);
            }

            // 上传到R2
            Storage::disk('r2')->put($path, file_get_contents($tempFile), 'public');

            // 获取文件信息
            $size = filesize($tempFile);
            $mimeType = mime_content_type($tempFile);

            // 删除临时文件
            @unlink($tempFile);

            return [
                'url' => Storage::disk('r2')->url($path),
                'path' => $path,
                'size' => $size,
                'mime_type' => $mimeType,
                'original_name' => basename($mediaUrl),
            ];

        } catch (\Exception $e) {
            // 清理临时文件
            @unlink($tempFile);
            throw $e;
        }
    }

    /**
     * 验证图片文件
     *
     * @param UploadedFile $file
     * @throws \Exception
     */
    private function validateImage(UploadedFile $file): void
    {
        // 检查文件是否有效
        if (!$file->isValid()) {
            throw new \Exception('文件上传失败,请重试');
        }

        // 检查文件大小
        if ($file->getSize() > self::MAX_IMAGE_SIZE) {
            throw new \Exception('图片大小不能超过10MB');
        }

        // 不再检查文件类型和MIME类型,允许任何格式
    }

    /**
     * 验证普通文件
     *
     * @param UploadedFile $file
     * @throws \Exception
     */
    private function validateFile(UploadedFile $file): void
    {
        // 检查文件是否有效
        if (!$file->isValid()) {
            throw new \Exception('文件上传失败,请重试');
        }

        // 检查文件大小
        if ($file->getSize() > self::MAX_FILE_SIZE) {
            throw new \Exception('文件大小不能超过100MB');
        }

        // 不再限制文件类型,允许任何格式
    }

    /**
     * 压缩图片
     *
     * @param UploadedFile $file
     * @return string 压缩后的图片内容
     */
    private function compressImage(UploadedFile $file): string
    {
        try {
            $image = Image::make($file);

            // 如果宽度超过1920,按比例缩放
            if ($image->width() > 1920) {
                $image->resize(1920, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }

            // 压缩质量
            return $image->encode(null, 85)->encoded;

        } catch (\Exception $e) {
            // 如果压缩失败,返回原文件内容
            return file_get_contents($file->getRealPath());
        }
    }

    /**
     * 生成存储路径
     *
     * @param string $type 类型: images, files, voices, videos
     * @param int $userId 用户ID
     * @param string $extension 文件扩展名
     * @param string|null $originalName 原始文件名(如果提供则保留)
     * @return string
     */
    private function generatePath(string $type, int $userId, string $extension, ?string $originalName = null): string
    {
        $date = date('Y/m/d');

        if ($originalName) {
            // 保留原始文件名,但添加随机前缀避免重名
            $randomPrefix = Str::random(8);
            // 清理文件名,移除特殊字符
            $safeName = preg_replace('/[^a-zA-Z0-9_\-\.·\x{4e00}-\x{9fa5}]/u', '_', $originalName);
            $filename = $randomPrefix . '_' . $safeName;
        } else {
            // 随机文件名
            $filename = Str::random(40) . '.' . strtolower($extension);
        }

        return "chat/{$type}/{$date}/{$userId}/{$filename}";
    }

    /**
     * 从URL下载文件到临时目录
     *
     * @param string $url
     * @return string 临时文件路径
     * @throws \Exception
     */
    private function downloadFromUrl(string $url): string
    {
        $tempFile = tempnam(sys_get_temp_dir(), 'wechat_media_');

        $context = stream_context_create([
            'http' => [
                'timeout' => 30,
                'user_agent' => 'Mozilla/5.0',
            ]
        ]);

        $content = @file_get_contents($url, false, $context);

        if ($content === false) {
            throw new \Exception('无法下载微信媒体文件');
        }

        file_put_contents($tempFile, $content);

        return $tempFile;
    }

    /**
     * 从URL猜测文件扩展名
     *
     * @param string $url
     * @param string $default
     * @return string
     */
    private function guessExtensionFromUrl(string $url, string $default = 'bin'): string
    {
        $path = parse_url($url, PHP_URL_PATH);
        $extension = pathinfo($path, PATHINFO_EXTENSION);

        return $extension ?: $default;
    }

    /**
     * 删除R2文件
     *
     * @param string $path R2路径
     * @return bool
     */
    public function deleteFile(string $path): bool
    {
        try {
            return Storage::disk('r2')->delete($path);
        } catch (\Exception $e) {
            \Log::error('删除R2文件失败: ' . $e->getMessage(), ['path' => $path]);
            return false;
        }
    }
}
