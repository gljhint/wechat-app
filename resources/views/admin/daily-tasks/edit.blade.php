@extends('admin.layouts.app')

@section('title', '编辑学习任务')

@push('styles')
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet">
<style>
    .quill-editor {
        background-color: white;
    }
    .quill-editor .ql-editor {
        min-height: 200px;
        font-size: 14px;
    }
    .quill-editor.ql-container {
        font-family: inherit;
    }
</style>
@endpush

@section('content')
<div class="max-w-3xl mx-auto">
    <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">编辑学习任务</h2>
        </div>

        <form method="POST" action="{{ route('admin.daily-tasks.update', $dailyTask) }}" class="px-6 py-6 space-y-6" id="taskForm">
            @csrf
            @method('PUT')

            <div>
                <label for="task_date" class="block text-sm font-medium text-gray-700">任务日期 <span class="text-red-500">*</span></label>
                <input type="date"
                       name="task_date"
                       id="task_date"
                       value="{{ old('task_date', $dailyTask->task_date->format('Y-m-d')) }}"
                       required
                       class="form-input mt-1 @error('task_date') border-red-300 @enderror">
                @error('task_date')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="bible_reading" class="block text-sm font-medium text-gray-700">每天读经 <span class="text-red-500">*</span></label>
                <div id="bible_reading_editor" class="quill-editor mt-1 @error('bible_reading') border-red-300 @enderror"></div>
                <textarea name="bible_reading"
                          id="bible_reading"
                          style="display:none;">{{ old('bible_reading', $dailyTask->bible_reading) }}</textarea>
                @error('bible_reading')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="devotional" class="block text-sm font-medium text-gray-700">每天灵修 <span class="text-red-500">*</span></label>
                <div id="devotional_editor" class="quill-editor mt-1 @error('devotional') border-red-300 @enderror"></div>
                <textarea name="devotional"
                          id="devotional"
                          style="display:none;">{{ old('devotional', $dailyTask->devotional) }}</textarea>
                @error('devotional')
                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label class="flex items-center">
                    <input type="hidden" name="status" value="0">
                    <input type="checkbox"
                           name="status"
                           value="1"
                           {{ old('status', $dailyTask->status) ? 'checked' : '' }}
                           class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600">
                    <span class="ml-2 text-sm text-gray-700">启用此任务</span>
                </label>
            </div>

            <div class="flex justify-end space-x-3 pt-6 border-t">
                <a href="{{ route('admin.daily-tasks.index') }}" class="btn-secondary">取消</a>
                <button type="submit" class="btn-primary">更新任务</button>
            </div>
        </form>
    </div>
</div>
@endsection

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
<script>
    // 初始化 Quill 编辑器
    const bibleReadingQuill = new Quill('#bible_reading_editor', {
        theme: 'snow',
        placeholder: '输入读经内容...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
            ]
        }
    });

    const devotionalQuill = new Quill('#devotional_editor', {
        theme: 'snow',
        placeholder: '输入灵修内容...',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link'],
                ['clean']
            ]
        }
    });

    // 加载现有内容
    const bibleReadingValue = document.getElementById('bible_reading').value;
    const devotionalValue = document.getElementById('devotional').value;

    if (bibleReadingValue) {
        bibleReadingQuill.root.innerHTML = bibleReadingValue;
    }
    if (devotionalValue) {
        devotionalQuill.root.innerHTML = devotionalValue;
    }

    // 表单提交时将 Quill 内容同步到隐藏的 textarea
    document.getElementById('taskForm').addEventListener('submit', function(e) {
        document.getElementById('bible_reading').value = bibleReadingQuill.root.innerHTML;
        document.getElementById('devotional').value = devotionalQuill.root.innerHTML;
    });
</script>
@endpush
