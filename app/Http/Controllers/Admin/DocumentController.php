<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserDocument;
use App\Models\DocumentTag;
use App\Models\WechatUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use Aws\S3\S3Client;

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = UserDocument::with(['tags']);

        // 搜索
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 类型筛选
        if ($request->filled('type') && $request->type) {
            $query->where('type', $request->type);
        }

        // 标签筛选
        if ($request->filled('tag_id') && $request->tag_id) {
            $query->byTag($request->tag_id);
        }

        // 状态筛选
        if ($request->filled('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $documents = $query->latest()->paginate(20);

        // 获取标签列表用于筛选
        $tags = DocumentTag::active()->orderBy('sort_order')->get();

        // 统计数据
        $totalDocuments = UserDocument::count();
        $enabledDocuments = UserDocument::where('status', 1)->count();
        $todayUploads = UserDocument::whereDate('created_at', today())->count();
        $totalSize = $this->formatFileSize(UserDocument::sum('file_size'));

        return view('admin.documents.index', compact(
            'documents', 'tags', 'totalDocuments', 'enabledDocuments', 'todayUploads', 'totalSize'
        ));
    }

    public function create()
    {
        $tags = DocumentTag::active()->orderBy('sort_order')->get();
        return view('admin.documents.create', compact('tags'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:document,video,audio',
            'temp_file_path' => 'required_without:file|string', // 预上传的临时路径
            'file' => 'nullable|file|max:1048576', // 1GB，兼容旧的直接上传
            'original_name' => 'nullable|string',
            'file_size' => 'nullable|integer',
            'mime_type' => 'nullable|string',
            'status' => 'required|boolean',
            'visible_roles' => 'nullable|array',
            'visible_roles.*' => 'string|in:admin,ministry,member,pre_member,seeker,external',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:document_tags,id',
        ]);

        // 处理文件：优先使用预上传路径，兼容直接上传
        if ($request->has('temp_file_path') && $request->temp_file_path) {
            // 从临时目录移动到正式目录
            $path = $this->moveFromTemp($request->temp_file_path);

            $validated['file_path'] = $path;
            $validated['file_size'] = $request->file_size;
            $validated['file_type'] = $request->mime_type;
            $validated['mime_type'] = $request->mime_type;
            $validated['original_name'] = $request->original_name;
            $validated['filename'] = basename($path);
            $validated['category'] = $this->detectCategory($request->mime_type);
        } elseif ($request->hasFile('file')) {
            // 兼容旧的直接上传方式
            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('documents', $filename, 'r2');

            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
            $validated['file_type'] = $file->getClientMimeType();
            $validated['mime_type'] = $file->getClientMimeType();
            $validated['original_name'] = $file->getClientOriginalName();
            $validated['filename'] = $filename;
            $validated['category'] = $this->detectCategory($file->getClientMimeType());
        }

        // 处理可见角色
        if (!$request->has('visible_roles') || empty($request->visible_roles)) {
            $validated['visible_roles'] = null;
        }

        // user_id设为null，is_public默认为1（公开）
        $validated['user_id'] = null;
        $validated['is_public'] = 1;

        $document = UserDocument::create($validated);

        // 关联标签
        if ($request->has('tags') && !empty($request->tags)) {
            $document->tags()->sync($request->tags);
        }

        return redirect()->route('admin.documents.index')
                        ->with('success', '文档创建成功');
    }

    public function show(UserDocument $document)
    {
        $document->load(['tags']);
        return view('admin.documents.show', compact('document'));
    }

    public function edit(UserDocument $document)
    {
        $tags = DocumentTag::active()->orderBy('sort_order')->get();
        $document->load('tags');
        return view('admin.documents.edit', compact('document', 'tags'));
    }

    public function update(Request $request, UserDocument $document)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:document,video,audio',
            'temp_file_path' => 'nullable|string', // 预上传的临时路径
            'file' => 'nullable|file|max:1048576', // 1GB，兼容旧的直接上传
            'original_name' => 'nullable|string',
            'file_size' => 'nullable|integer',
            'mime_type' => 'nullable|string',
            'status' => 'required|boolean',
            'visible_roles' => 'nullable|array',
            'visible_roles.*' => 'string|in:admin,ministry,member,pre_member,seeker,external',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:document_tags,id',
        ]);

        // 处理文件更新：优先使用预上传路径，兼容直接上传
        if ($request->has('temp_file_path') && $request->temp_file_path) {
            // 删除旧文件（从 R2）
            if ($document->file_path && Storage::disk('r2')->exists($document->file_path)) {
                Storage::disk('r2')->delete($document->file_path);
            }

            // 从临时目录移动到正式目录
            $path = $this->moveFromTemp($request->temp_file_path);

            $validated['file_path'] = $path;
            $validated['file_size'] = $request->file_size;
            $validated['file_type'] = $request->mime_type;
            $validated['mime_type'] = $request->mime_type;
            $validated['original_name'] = $request->original_name;
            $validated['filename'] = basename($path);
            $validated['category'] = $this->detectCategory($request->mime_type);
        } elseif ($request->hasFile('file')) {
            // 兼容旧的直接上传方式
            // 删除旧文件（从 R2）
            if ($document->file_path && Storage::disk('r2')->exists($document->file_path)) {
                Storage::disk('r2')->delete($document->file_path);
            }

            $file = $request->file('file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('documents', $filename, 'r2');

            $validated['file_path'] = $path;
            $validated['file_size'] = $file->getSize();
            $validated['file_type'] = $file->getClientMimeType();
            $validated['mime_type'] = $file->getClientMimeType();
            $validated['original_name'] = $file->getClientOriginalName();
            $validated['filename'] = $filename;
            $validated['category'] = $this->detectCategory($file->getClientMimeType());
        } else {
            // 没有上传新文件时，移除文件相关字段，避免将其更新为null
            unset($validated['original_name'], $validated['file_size'], $validated['mime_type']);
        }

        // 处理可见角色，如果没有选择则设为 null（所有人可见）
        if (!$request->has('visible_roles') || empty($request->visible_roles)) {
            $validated['visible_roles'] = null;
        }

        // 确保is_public为1
        $validated['is_public'] = 1;

        $document->update($validated);

        // 同步标签
        if ($request->has('tags')) {
            $document->tags()->sync($request->tags ?? []);
        }

        return redirect()->route('admin.documents.index')
                        ->with('success', '文档更新成功');
    }

    public function destroy(UserDocument $document)
    {
        // 删除文件（从 R2）
        if ($document->file_path && Storage::disk('r2')->exists($document->file_path)) {
            Storage::disk('r2')->delete($document->file_path);
        }

        $document->delete();

        return response()->json([
            'success' => true,
            'message' => '文档删除成功'
        ]);
    }

    public function download(UserDocument $document)
    {
        if (!$document->file_path || !Storage::disk('r2')->exists($document->file_path)) {
            abort(404, '文件不存在');
        }

        // 生成 5 分钟有效期的临时签名 URL，直接重定向让用户从 R2 下载
        // 优点：不占用服务器带宽和内存，大文件也不会有问题
        $temporaryUrl = Storage::disk('r2')->temporaryUrl(
            $document->file_path,
            now()->addMinutes(5),
            [
                'ResponseContentDisposition' => 'attachment; filename="' . $document->original_name . '"',
                'ResponseContentType' => $document->mime_type ?? 'application/octet-stream',
            ]
        );

        return redirect($temporaryUrl);
    }

    public function bulk(Request $request)
    {
        $request->validate([
            'action' => 'required|in:enable,disable,delete,export',
            'document_ids' => 'required|array',
            'document_ids.*' => 'exists:user_documents,id'
        ]);

        $documents = UserDocument::whereIn('id', $request->document_ids);

        switch ($request->action) {
            case 'enable':
                $documents->update(['status' => 1]);
                $message = '批量启用成功';
                break;
            case 'disable':
                $documents->update(['status' => 0]);
                $message = '批量禁用成功';
                break;
            case 'delete':
                $documentsToDelete = $documents->get();
                foreach ($documentsToDelete as $doc) {
                    if ($doc->file_path && Storage::disk('r2')->exists($doc->file_path)) {
                        Storage::disk('r2')->delete($doc->file_path);
                    }
                }
                $documents->delete();
                $message = '批量删除成功';
                break;
        }

        return response()->json([
            'success' => true,
            'message' => $message
        ]);
    }

    private function formatFileSize($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, 2) . ' ' . $units[$pow];
    }

    private function detectCategory($mimeType)
    {
        // 视频类型
        if (str_starts_with($mimeType, 'video/')) {
            return 'video';
        }

        // 音频类型
        if (str_starts_with($mimeType, 'audio/')) {
            return 'audio';
        }

        // 默认为文档
        return 'document';
    }

    /**
     * 获取R2预签名上传URL（客户端直接上传）
     * 支持相对安全的文档格式
     */
    public function getPresignedUploadUrl(Request $request)
    {
        $request->validate([
            'filename' => 'required|string',
            'content_type' => 'required|string',
        ]);

        // 安全的文件格式白名单（MIME类型）
        $allowedMimes = [
            // 文档
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            // 图片
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            // 音频
            'audio/mpeg',
            'audio/wav',
            'audio/ogg',
            'audio/mp4',
            // 视频
            'video/mp4',
            'video/mpeg',
            'video/quicktime',
            'video/x-msvideo',
            // 压缩包
            'application/zip',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
        ];

        if (!in_array($request->content_type, $allowedMimes)) {
            return response()->json([
                'success' => false,
                'message' => '不支持的文件格式。仅支持：PDF、Word、Excel、PPT、图片、音视频、压缩包等常见格式。'
            ], 422);
        }

        // 生成唯一文件名
        $uniqueFilename = time() . '_' . uniqid() . '_' . $request->filename;
        $filePath = 'documents/temp/' . $uniqueFilename;

        try {
            // 创建S3客户端
            $client = new S3Client([
                'version' => 'latest',
                'region' => config('filesystems.disks.r2.region'),
                'endpoint' => config('filesystems.disks.r2.endpoint'),
                'use_path_style_endpoint' => config('filesystems.disks.r2.use_path_style_endpoint'),
                'credentials' => [
                    'key' => config('filesystems.disks.r2.key'),
                    'secret' => config('filesystems.disks.r2.secret'),
                ],
            ]);

            // 生成预签名URL（15分钟有效期）
            $command = $client->getCommand('PutObject', [
                'Bucket' => config('filesystems.disks.r2.bucket'),
                'Key' => $filePath,
                'ContentType' => $request->content_type,
            ]);

            $presignedRequest = $client->createPresignedRequest($command, '+15 minutes');
            $presignedUrl = (string) $presignedRequest->getUri();

            return response()->json([
                'success' => true,
                'data' => [
                    'upload_url' => $presignedUrl,
                    'file_path' => $filePath,
                    'filename' => $uniqueFilename,
                    'content_type' => $request->content_type,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '生成上传URL失败：' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * 从临时路径移动文件到正式目录
     */
    private function moveFromTemp($tempPath)
    {
        if (!Storage::disk('r2')->exists($tempPath)) {
            throw new \Exception('临时文件不存在');
        }

        // 生成新的正式路径
        $filename = basename($tempPath);
        $newPath = 'documents/' . $filename;

        // 复制文件到正式目录
        Storage::disk('r2')->copy($tempPath, $newPath);

        // 删除临时文件
        Storage::disk('r2')->delete($tempPath);

        return $newPath;
    }
}