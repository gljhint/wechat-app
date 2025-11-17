<?php

namespace App\Http\Controllers\WeChat;

use App\Http\Controllers\Controller;
use App\Models\UserDocument;
use App\Models\WechatUser;
use App\Models\DocumentTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    /**
     * 文档列表页面
     */
    public function index(Request $request)
    {
        $userId = Session::get('wechat_user_id');
        $user = WechatUser::find($userId);

        // 获取所有启用的标签
        $tags = DocumentTag::where('status', 1)
                          ->orderBy('sort_order')
                          ->get();

        // 获取最近文档
        $recentDocuments = UserDocument::with('tags')
                                      ->where('status', 1)
                                      ->visibleToUser($user)
                                      ->orderBy('updated_at', 'desc')
                                      ->limit(10)
                                      ->get();

        return view('wechat.materials', compact('user', 'tags', 'recentDocuments'));
    }

    /**
     * 获取文档列表
     */
    public function getDocuments(Request $request)
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
            'tag_id' => 'nullable|exists:document_tags,id',
            'search' => 'nullable|string|max:100',
            'page' => 'integer|min:1',
            'limit' => 'integer|min:1|max:50',
            'sort_by' => 'in:title,file_size,created_at,updated_at',
            'sort_order' => 'in:asc,desc',
        ]);

        $page = $request->get('page', 1);
        $limit = $request->get('limit', 20);
        $offset = ($page - 1) * $limit;

        // 微信端只能查看公开文档（并应用角色可见性过滤）
        $query = UserDocument::with('tags')
                            ->where('status', 1)
                            ->visibleToUser($user);

        // 标签过滤
        if ($request->tag_id) {
            $query->whereHas('tags', function($q) use ($request) {
                $q->where('document_tags.id', $request->tag_id);
            });
        }

        // 搜索过滤
        if ($request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('original_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 排序
        $sortBy = $request->get('sort_by', 'updated_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // 先计算总数
        $total = $query->count();

        $documents = $query->offset($offset)
                          ->limit($limit)
                          ->get()
                          ->map(function($doc) {
                              return [
                                  'id' => $doc->id,
                                  'title' => $doc->title,
                                  'description' => $doc->description,
                                  'type' => $doc->type,
                                  'original_name' => $doc->original_name,
                                  'file_size' => $doc->file_size,
                                  'mime_type' => $doc->mime_type,
                                  'created_at' => $doc->created_at,
                                  'updated_at' => $doc->updated_at,
                                  'tags' => $doc->tags->map(function($tag) {
                                      return [
                                          'id' => $tag->id,
                                          'name' => $tag->name,
                                          'color' => $tag->color
                                      ];
                                  })
                              ];
                          });

        return response()->json([
            'code' => 200,
            'data' => [
                'documents' => $documents,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'has_more' => ($offset + $limit) < $total
                ]
            ]
        ]);
    }

    /**
     * 上传文档（微信端不支持上传，由管理后台上传）
     */
    public function upload(Request $request)
    {
        return response()->json([
            'code' => 403,
            'message' => '微信端不支持上传文档，请联系管理员'
        ], 403);
    }

    /**
     * 下载文档
     */
    public function download(Request $request, $documentId)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $user = WechatUser::find($userId);

        // 微信端只能下载公开文档
        $document = UserDocument::where('id', $documentId)
                                ->where('status', 1)
                                ->first();

        if (!$document) {
            return response()->json([
                'code' => 404,
                'message' => '文档不存在或无权访问'
            ], 404);
        }

        // 检查角色可见性
        if (!$document->isVisibleToUser($user)) {
            return response()->json([
                'code' => 403,
                'message' => '您没有权限访问该文档'
            ], 403);
        }

        try {
            $filePath = storage_path('app/public/' . $document->file_path);
            
            if (!file_exists($filePath)) {
                return response()->json([
                    'code' => 404,
                    'message' => '文件不存在'
                ], 404);
            }

            // 更新下载次数
            $document->increment('download_count');

            return response()->download($filePath, $document->original_name);

        } catch (\Exception $e) {
            Log::error('文档下载失败: ' . $e->getMessage());
            
            return response()->json([
                'code' => 500,
                'message' => '下载失败',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * 预览文档（返回视图页面）
     */
    public function preview(Request $request, $documentId)
    {
        $userId = Session::get('wechat_user_id');
        $user = WechatUser::find($userId);

        // 微信端只能预览公开文档
        $document = UserDocument::where('id', $documentId)
                                ->where('status', 1)
                                ->first();

        if (!$document) {
            abort(404, '文档不存在或无权访问');
        }

        // 检查角色可见性
        if (!$document->isVisibleToUser($user)) {
            abort(403, '您没有权限访问该文档');
        }

        // 更新查看次数（如果需要的话）
        // $document->increment('view_count');

        // 获取文件URL
        $fileUrl = env('R2_URL') . '/' . $document->file_path;

        // 判断文件类型
        $fileType = $this->getFileType($document->mime_type, $document->original_name);

        return view('wechat.document-preview', [
            'document' => $document,
            'fileUrl' => $fileUrl,
            'fileType' => $fileType,
            'downloadUrl' => route('wechat.documents.download', $document->id)
        ]);
    }

    /**
     * 根据 MIME 类型和文件名判断文件类型
     */
    private function getFileType($mimeType, $filename)
    {
        // 图片类型
        if (str_starts_with($mimeType, 'image/')) {
            return 'image';
        }

        // 视频类型
        if (str_starts_with($mimeType, 'video/')) {
            return 'video';
        }

        // 音频类型
        if (str_starts_with($mimeType, 'audio/')) {
            return 'audio';
        }

        // PDF
        if ($mimeType === 'application/pdf') {
            return 'pdf';
        }

        // 文本类型
        if (str_starts_with($mimeType, 'text/')) {
            return 'text';
        }

        // 根据扩展名判断
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        $typeMap = [
            'mp3' => 'audio',
            'wav' => 'audio',
            'ogg' => 'audio',
            'mp4' => 'video',
            'webm' => 'video',
            'mov' => 'video',
            'avi' => 'video',
            'pdf' => 'pdf',
            'doc' => 'office',
            'docx' => 'office',
            'xls' => 'office',
            'xlsx' => 'office',
            'ppt' => 'office',
            'pptx' => 'office',
        ];

        return $typeMap[$extension] ?? 'unknown';
    }

    /**
     * 删除文档（微信端不支持，由管理后台管理）
     */
    public function delete(Request $request, $documentId)
    {
        return response()->json([
            'code' => 403,
            'message' => '微信端不支持删除文档，请联系管理员'
        ], 403);
    }

    /**
     * 更新文档信息（微信端不支持，由管理后台管理）
     */
    public function update(Request $request, $documentId)
    {
        return response()->json([
            'code' => 403,
            'message' => '微信端不支持修改文档，请联系管理员'
        ], 403);
    }

    /**
     * 获取文档标签列表
     */
    public function getCategories(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $user = WechatUser::find($userId);

        // 获取所有启用的标签，并统计每个标签下的文档数量
        $tags = DocumentTag::where('status', 1)
                          ->orderBy('sort_order')
                          ->get()
                          ->map(function($tag) use ($user) {
                              // 统计该标签下可见的文档数量
                              $count = UserDocument::where('status', 1)
                                                   ->visibleToUser($user)
                                                   ->whereHas('tags', function($q) use ($tag) {
                                                       $q->where('document_tags.id', $tag->id);
                                                   })
                                                   ->count();

                              return [
                                  'id' => $tag->id,
                                  'name' => $tag->name,
                                  'color' => $tag->color,
                                  'document_count' => $count
                              ];
                          })
                          ->filter(function($tag) {
                              // 只返回有文档的标签
                              return $tag['document_count'] > 0;
                          })
                          ->values();

        return response()->json([
            'code' => 200,
            'data' => $tags
        ]);
    }

    /**
     * 获取文档统计信息
     */
    public function getStatistics(Request $request)
    {
        $userId = Session::get('wechat_user_id');

        if (!$userId) {
            return response()->json([
                'code' => 401,
                'message' => '未登录'
            ], 401);
        }

        $user = WechatUser::find($userId);

        // 微信端只统计公开文档（并应用角色可见性过滤）
        $query = UserDocument::where('status', 1)->visibleToUser($user);

        $stats = [
            'total_documents' => $query->count(),
            'total_size' => $query->sum('file_size'),
            'total_downloads' => $query->sum('download_count'),
            'categories_count' => $query->distinct('category')->count('category'),
            'recent_uploads' => (clone $query)->where('created_at', '>=', now()->subDays(7))->count(),
        ];

        // 格式化文件大小
        $stats['total_size_formatted'] = $this->formatBytes($stats['total_size']);

        return response()->json([
            'code' => 200,
            'data' => $stats
        ]);
    }

    /**
     * 格式化字节大小
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}
