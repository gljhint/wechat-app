@extends('wechat.layouts.app')

@section('title', '颂主圣诗')

@section('content')
<div class="songs-container">
    <div class="songs-header">
        <a href="{{ route('discover') }}" class="back-link">
            <i class="back-icon">←</i>
        </a>
        <h1>颂主圣诗</h1>
        <p class="subtitle">（{{ $version }}首）</p>
    </div>

    <div class="search-box">
        <input type="text" id="searchInput" placeholder="搜索歌曲...">
        <i class="search-icon">🔍</i>
    </div>

    <div class="view-toggle">
        <button id="compactView" class="active">序号列表</button>
        <button id="detailedView">详细列表</button>
    </div>

    <div class="song-list compact" id="songList">
        @foreach($songs as $number => $song)
        <a href="{{ route('wechat.songs.' . $version . '.show', $number) }}" class="song-link">
            <div class="song-item compact" data-number="{{ $number }}" data-title="{{ $song['title'] }}">
                <div class="song-info compact">
                    <div class="song-number compact">{{ $number }}</div>
                    <div class="song-title compact">{{ $song['title'] }}</div>
                </div>
            </div>
        </a>
        @endforeach
    </div>
</div>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.songs-container {
    min-height: 100vh;
    background-color: #f8f4e8;
    padding-bottom: 60px;
}

.songs-header {
    background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
    color: #fff8e7;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: relative;
}

.back-link {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #fff8e7;
    text-decoration: none;
    font-size: 24px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s;
}

.back-link:active {
    background-color: rgba(255, 255, 255, 0.1);
}

.songs-header h1 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 5px;
}

.subtitle {
    font-size: 14px;
    opacity: 0.9;
}

.search-box {
    margin: 15px;
    position: relative;
}

.search-box input {
    width: 100%;
    padding: 12px 40px 12px 15px;
    border: 1px solid #d4b483;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
    background-color: #fff;
    color: #4a4a4a;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-style: normal;
}

.view-toggle {
    text-align: center;
    margin: 15px;
    display: flex;
    gap: 10px;
    justify-content: center;
}

.view-toggle button {
    flex: 1;
    max-width: 150px;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: #e8d9c5;
    color: #4a4a4a;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 14px;
    font-weight: 500;
}

.view-toggle button.active {
    background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
    color: #fff8e7;
    box-shadow: 0 2px 6px rgba(139, 69, 19, 0.3);
}

.song-list {
    display: grid;
    gap: 10px;
    padding: 0 10px;
}

.song-list.compact {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
}

.song-list.detailed {
    grid-template-columns: 1fr;
}

.song-link {
    text-decoration: none;
    color: inherit;
}

.song-item {
    background: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    transition: all 0.3s;
    border: 1px solid #e8d9c5;
}

.song-item:active {
    transform: scale(0.98);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.song-item.compact {
    padding: 12px 8px;
    text-align: center;
}

.song-info.compact {
    display: block;
}

.song-number {
    color: #8b4513;
    font-size: 18px;
    font-weight: bold;
}

.song-number.compact {
    font-size: 20px;
    margin-bottom: 0;
}

.song-title {
    font-size: 16px;
    color: #4a4a4a;
    margin-left: 10px;
}

.song-title.compact {
    display: none;
}

/* 详细视图样式 */
.song-list.detailed .song-item {
    padding: 15px;
}

.song-list.detailed .song-item.compact {
    padding: 15px;
    text-align: left;
}

.song-list.detailed .song-info.compact {
    display: flex;
    align-items: center;
}

.song-list.detailed .song-title.compact {
    display: block;
    font-size: 16px;
}

.song-list.detailed .song-number.compact {
    font-size: 18px;
    margin-right: 10px;
    min-width: 40px;
}

/* 隐藏的歌曲项 */
.song-link.hidden {
    display: none;
}

@media (max-width: 375px) {
    .song-list.compact {
        grid-template-columns: repeat(3, 1fr);
    }

    .song-number.compact {
        font-size: 18px;
    }
}

@media (min-width: 768px) {
    .songs-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .song-list.compact {
        grid-template-columns: repeat(8, 1fr);
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const songList = document.getElementById('songList');
    const compactViewBtn = document.getElementById('compactView');
    const detailedViewBtn = document.getElementById('detailedView');
    const songLinks = document.querySelectorAll('.song-link');

    // 搜索功能
    searchInput.addEventListener('input', function(e) {
        const searchText = e.target.value.toLowerCase().trim();

        // 如果有搜索内容，自动切换到详细视图
        if (searchText && songList.classList.contains('compact')) {
            switchView(false);
        }

        songLinks.forEach(link => {
            const item = link.querySelector('.song-item');
            const title = item.dataset.title.toLowerCase();
            const number = item.dataset.number.toLowerCase();

            if (title.includes(searchText) || number.includes(searchText)) {
                link.classList.remove('hidden');
            } else {
                link.classList.add('hidden');
            }
        });
    });

    // 视图切换功能
    function switchView(isCompact) {
        if (isCompact) {
            songList.classList.add('compact');
            songList.classList.remove('detailed');
        } else {
            songList.classList.remove('compact');
            songList.classList.add('detailed');
        }

        compactViewBtn.classList.toggle('active', isCompact);
        detailedViewBtn.classList.toggle('active', !isCompact);
    }

    compactViewBtn.addEventListener('click', () => switchView(true));
    detailedViewBtn.addEventListener('click', () => switchView(false));
});
</script>
@endsection
