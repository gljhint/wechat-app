<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    /**
     * 上传图片
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:10240', // 最大10MB
        ]);

        return $this->uploadFile($request->file('file'), 'images');
    }

    /**
     * 上传文档
     */
    public function uploadDocument(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar|max:51200', // 最大50MB
        ]);

        return $this->uploadFile($request->file('file'), 'documents');
    }

    /**
     * 上传视频
     */
    public function uploadVideo(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:mp4,avi,mov,wmv,flv,mkv|max:204800', // 最大200MB
        ]);

        return $this->uploadFile($request->file('file'), 'videos');
    }

    /**
     * 通用上传
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:51200', // 最大50MB
        ]);

        return $this->uploadFile($request->file('file'), 'uploads');
    }

    /**
     * 文件上传核心逻辑
     */
    protected function uploadFile($file, $folder = 'uploads')
    {
        try {
            // 获取文件信息
            $originalName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $mimeType = $file->getMimeType();
            $size = $file->getSize();

            // 生成唯一文件名
            $fileName = date('Y/m/d') . '/' . Str::random(32) . '.' . $extension;
            $path = $folder . '/' . $fileName;

            // 上传到 R2
            $disk = Storage::disk('r2');
            $uploaded = $disk->put($path, file_get_contents($file->getRealPath()));

            if (!$uploaded) {
                return response()->json([
                    'success' => false,
                    'message' => '文件上传失败'
                ], 500);
            }

            // 获取文件URL
            $url = config('filesystems.disks.r2.url') . '/' . $path;

            return response()->json([
                'success' => true,
                'message' => '上传成功',
                'data' => [
                    'path' => $path,
                    'url' => $url,
                    'original_name' => $originalName,
                    'mime_type' => $mimeType,
                    'size' => $size,
                    'extension' => $extension,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '上传失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 删除文件
     */
    public function delete(Request $request)
    {
        $request->validate([
            'path' => 'required|string'
        ]);

        try {
            $disk = Storage::disk('r2');

            if (!$disk->exists($request->path)) {
                return response()->json([
                    'success' => false,
                    'message' => '文件不存在'
                ], 404);
            }

            $disk->delete($request->path);

            return response()->json([
                'success' => true,
                'message' => '删除成功'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '删除失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 获取文件列表
     */
    public function list(Request $request)
    {
        $folder = $request->input('folder', '');

        try {
            $disk = Storage::disk('r2');
            $files = $disk->files($folder);

            $fileList = array_map(function($file) use ($disk) {
                return [
                    'path' => $file,
                    'url' => config('filesystems.disks.r2.url') . '/' . $file,
                    'size' => $disk->size($file),
                    'last_modified' => $disk->lastModified($file),
                ];
            }, $files);

            return response()->json([
                'success' => true,
                'data' => $fileList
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '获取文件列表失败：' . $e->getMessage()
            ], 500);
        }
    }
}
