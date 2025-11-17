@extends('wechat.layouts.app')

@section('title', '资料')
@section('navbar-title', '资料')

@push('styles')
<style>
    .materials-page {
        padding-bottom: 88px;
    }

    .materials-page .weui-search-bar {
        margin: 12px 12px 4px;
        overflow: hidden;
    }

    .category-scroll {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px;
        margin: 0 12px 12px;
        background-color: #fff;
        border-radius: 12px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .category-chip {
        flex-shrink: 0;
        padding: 6px 16px;
        border-radius: 999px;
        font-size: 14px;
        border: 1px solid #ededed;
        color: #666;
        background-color: #fff;
        transition: all 0.2s ease;
    }

    .category-chip.active {
        border-color: #07c160;
        background-color: rgba(7, 193, 96, 0.12);
        color: #07c160;
        font-weight: 600;
    }

    .category-chip:focus-visible {
        outline: 2px solid #07c160;
        outline-offset: 2px;
    }

    .materials-cells {
        margin: 0 12px 16px;
        border-radius: 12px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
    }

    .materials-icon {
        margin-right: 12px;
        font-size: 26px;
    }

    .materials-title {
        font-size: 16px;
        color: #111;
        font-weight: 600;
        margin-bottom: 4px;
    }

    .materials-meta {
        font-size: 13px;
        color: #848587;
    }

    .materials-empty-icon {
        width: 72px;
        height: 72px;
        fill: #c5d9ff;
    }
</style>
@endpush

@section('content')
<div class="materials-page">
    <div class="weui-search-bar" id="docSearchBar">
        <form class="weui-search-bar__form" onsubmit="return false;">
            <div class="weui-search-bar__box">
                <i class="weui-icon-search"></i>
                <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索文档" />
                <a class="weui-icon-clear" id="searchClear"></a>
            </div>
            <label class="weui-search-bar__label" id="searchText">
                <i class="weui-icon-search"></i>
                <span>搜索文档</span>
            </label>
        </form>
        <a class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
    </div>

    <div class="category-scroll" id="categories" role="tablist">
        <button type="button" class="category-chip active" data-category="">全部</button>
    </div>

    <div id="docList">
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script>
let currentTagId = '';
let searchTimer = null;

function setCategoryChips(tags) {
    const container = document.getElementById('categories');
    if (!container) return;

    const available = new Set((tags || []).map(tag => tag.id));
    if (currentTagId && !available.has(currentTagId)) {
        currentTagId = '';
    }

    const fragment = document.createDocumentFragment();

    const createChip = (text, tagId, color = null) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'category-chip';
        button.dataset.tagId = tagId || '';
        if ((tagId || '') === (currentTagId || '')) {
            button.classList.add('active');
        }
        button.textContent = text;
        fragment.appendChild(button);
    };

    createChip('全部', '');

    (tags || []).forEach(tag => {
        const count = typeof tag.document_count === 'number' ? ` (${tag.document_count})` : '';
        createChip(`${tag.name}${count}`, tag.id, tag.color);
    });

    container.innerHTML = '';
    container.appendChild(fragment);
}

function showDocumentsLoading() {
    const list = document.getElementById('docList');
    if (!list) return;
    list.innerHTML = `
        <div class="weui-loadmore">
            <i class="weui-loading"></i>
            <span class="weui-loadmore__tips">加载中...</span>
        </div>
    `;
}

function renderDocuments(documents) {
    const list = document.getElementById('docList');
    if (!list) return;

    if (!documents || documents.length === 0) {
        list.innerHTML = `
            <div class="weui-msg">
                <div class="weui-msg__icon-area">
                    <svg class="materials-empty-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"></path>
                    </svg>
                </div>
                <div class="weui-msg__text-area">
                    <h2 class="weui-msg__title">暂无文档</h2>
                    <p class="weui-msg__desc">换个标签或关键词试试吧。</p>
                </div>
            </div>
        `;
        return;
    }

    let html = '<div class="weui-cells weui-cells_access materials-cells">';
    documents.forEach(doc => {
        const title = doc.title || doc.original_name || '未命名文件';
        const size = utils.formatFileSize(doc.file_size || 0);
        const time = utils.formatTime(doc.created_at);

        // 显示标签
        let tagsHtml = '';
        if (doc.tags && doc.tags.length > 0) {
            tagsHtml = doc.tags.map(tag =>
                `<span style="display: inline-block; margin-left: 4px; padding: 2px 8px; font-size: 11px; border-radius: 999px; background-color: rgba(7, 193, 96, 0.12); color: #07c160;">${tag.name}</span>`
            ).join('');
        }

        // 根据类型显示不同图标
        let icon = '📄';
        if (doc.type === 'video') {
            icon = '🎬';
        } else if (doc.type === 'audio') {
            icon = '🎵';
        }

        html += `
            <a href="javascript:;" class="weui-cell weui-cell_access" onclick="previewDoc(${doc.id})">
                <div class="weui-cell__hd materials-icon" aria-hidden="true">${icon}</div>
                <div class="weui-cell__bd">
                    <p class="materials-title">${title}${tagsHtml}</p>
                    <p class="materials-meta">${size} · ${time}</p>
                </div>
                <div class="weui-cell__ft"></div>
            </a>
        `;
    });
    html += '</div>';
    list.innerHTML = html;
}

function filterByTag(tagId) {
    currentTagId = tagId;
    document.querySelectorAll('.category-chip').forEach(button => {
        button.classList.toggle('active', (button.dataset.tagId || '') === (tagId || ''));
    });
    fetchDocuments();
}

function previewDoc(id) {
    location.href = `/wechat/documents/${id}/preview`;
}

function setupCategoryEvents() {
    const container = document.getElementById('categories');
    if (!container) return;

    container.addEventListener('click', event => {
        const chip = event.target.closest('.category-chip');
        if (!chip || !container.contains(chip)) {
            return;
        }
        const tagId = chip.dataset.tagId || '';
        if ((tagId || '') === (currentTagId || '')) {
            return;
        }
        filterByTag(tagId);
    });
}

function fetchCategories() {
    axios.get('/wechat/documents/categories')
        .then(response => {
            if (response.data.code === 200) {
                setCategoryChips(response.data.data);
            } else {
                utils.toast(response.data.message || '标签加载失败', { type: 'top' });
            }
        })
        .catch(() => {
            utils.toast('标签加载失败，请稍后重试', { type: 'top' });
        });
}

function fetchDocuments({ showLoading = true } = {}) {
    if (showLoading) {
        showDocumentsLoading();
    }

    const params = {};
    if (currentTagId) {
        params.tag_id = currentTagId;
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value.trim()) {
        params.search = searchInput.value.trim();
    }

    axios.get('/wechat/documents/list', { params })
        .then(response => {
            if (response.data.code === 200) {
                renderDocuments(response.data.data.documents || []);
            } else {
                utils.toast(response.data.message || '文档加载失败', { type: 'top' });
                renderDocuments([]);
            }
        })
        .catch(() => {
            renderDocuments([]);
            utils.toast('文档加载失败，请稍后再试', { type: 'top' });
        });
}

function setupSearchBar() {
    const searchBar = document.getElementById('docSearchBar');
    const searchInput = document.getElementById('searchInput');
    const searchLabel = document.getElementById('searchText');
    const searchClear = document.getElementById('searchClear');
    const searchCancel = document.getElementById('searchCancel');

    if (!searchInput) return;

    const resetSearch = () => {
        searchInput.value = '';
        searchBar.classList.remove('weui-search-bar_focusing');
        fetchDocuments({ showLoading: true });
    };

    if (searchLabel) {
        searchLabel.addEventListener('click', () => {
            searchBar.classList.add('weui-search-bar_focusing');
            searchInput.focus();
        });
    }

    searchInput.addEventListener('focus', () => {
        searchBar.classList.add('weui-search-bar_focusing');
    });

    searchInput.addEventListener('blur', () => {
        if (!searchInput.value.trim()) {
            searchBar.classList.remove('weui-search-bar_focusing');
        }
    });

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => fetchDocuments({ showLoading: false }), 300);
    });

    if (searchClear) {
        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            fetchDocuments({ showLoading: false });
        });
    }

    if (searchCancel) {
        searchCancel.addEventListener('click', resetSearch);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupSearchBar();
    setupCategoryEvents();
    fetchCategories();
    fetchDocuments({ showLoading: true });
});
</script>
@endpush
