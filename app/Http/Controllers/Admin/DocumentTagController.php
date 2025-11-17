<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DocumentTag;
use Illuminate\Http\Request;

class DocumentTagController extends Controller
{
    public function index(Request $request)
    {
        $query = DocumentTag::query();

        // 搜索
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        // 状态筛选
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $tags = $query->orderBy('sort_order')->orderBy('id', 'desc')->paginate(20);

        return view('admin.document-tags.index', compact('tags'));
    }

    public function create()
    {
        return view('admin.document-tags.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:document_tags,name',
            'color' => 'required|string|in:red,orange,yellow,green,blue,indigo,purple,pink,gray',
            'sort_order' => 'required|integer|min:0',
            'status' => 'required|boolean',
        ]);

        DocumentTag::create($validated);

        return redirect()->route('admin.document-tags.index')
                        ->with('success', '标签创建成功');
    }

    public function edit(DocumentTag $documentTag)
    {
        return view('admin.document-tags.edit', compact('documentTag'));
    }

    public function update(Request $request, DocumentTag $documentTag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:document_tags,name,' . $documentTag->id,
            'color' => 'required|string|in:red,orange,yellow,green,blue,indigo,purple,pink,gray',
            'sort_order' => 'required|integer|min:0',
            'status' => 'required|boolean',
        ]);

        $documentTag->update($validated);

        return redirect()->route('admin.document-tags.index')
                        ->with('success', '标签更新成功');
    }

    public function destroy(DocumentTag $documentTag)
    {
        $documentTag->delete();

        return response()->json([
            'success' => true,
            'message' => '标签删除成功'
        ]);
    }
}
