@extends('wechat.layouts.app')

@section('title', '个人设置')

@push('styles')
<style>
    .page-content {
        background-color: #f8f8f8;
    }

    .navbar {
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: #fff;
        border-bottom: 1px solid #e5e5e5;
        padding: 12px 16px;
        display: flex;
        align-items: center;
    }

    .navbar-back {
        padding: 8px;
        margin-left: -8px;
        cursor: pointer;
    }

    .navbar-back svg {
        width: 20px;
        height: 20px;
        fill: #000;
    }

    .navbar-title {
        flex: 1;
        text-align: center;
        font-size: 17px;
        font-weight: 500;
        margin-right: 36px;
    }

    .settings-form {
        margin-top: 12px;
        background-color: #fff;
        border-radius: 12px;
        overflow: hidden;
    }

    .form-cell {
        padding: 16px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
    }

    .form-cell:last-child {
        border-bottom: none;
    }

    .form-label {
        width: 85px;
        color: #111;
        font-size: 16px;
    }

    .form-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        color: #111;
        background: transparent;
    }

    .form-input::placeholder {
        color: #999;
    }

    .form-input:disabled {
        color: #999;
    }

    .save-button {
        margin: 24px 16px;
    }

    .weui-btn_primary {
        background-color: #07c160;
    }

    .form-tips {
        padding: 12px 16px;
        color: #999;
        font-size: 13px;
        line-height: 1.5;
    }
</style>
@endpush

@section('content')
<!-- 导航栏 -->
<div class="navbar">
    <div class="navbar-back" onclick="history.back()">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"/>
        </svg>
    </div>
    <div class="navbar-title">个人设置</div>
</div>

<!-- 设置表单 -->
<div class="settings-form">
    <div class="form-cell">
        <label class="form-label">真实姓名</label>
        <input type="text" class="form-input" id="realNameInput" placeholder="请输入真实姓名" maxlength="50">
    </div>
    <div class="form-cell">
        <label class="form-label">手机号</label>
        <input type="tel" class="form-input" id="phoneInput" placeholder="选填" maxlength="20">
    </div>
</div>

<div class="form-tips">
    提示:修改个人信息后,请点击保存按钮保存更改。
</div>

<!-- 保存按钮 -->
<div class="save-button">
    <button class="weui-btn weui-btn_primary" id="saveButton">保存</button>
</div>
@endsection

@push('scripts')
<script>
let currentUser = null;

// 加载用户信息
function loadUserInfo() {
    utils.loading('加载中...');
    axios.get('/wechat/user')
        .then(response => {
            if (response.data.code === 200) {
                currentUser = response.data.data;
                document.getElementById('realNameInput').value = currentUser.real_name || '';
                document.getElementById('phoneInput').value = currentUser.phone || '';
            } else {
                utils.toast(response.data.message || '获取用户信息失败', { type: 'top' });
            }
        })
        .catch(() => {
            utils.toast('获取用户信息失败', { type: 'top' });
        })
        .finally(() => {
            utils.hideLoading();
        });
}

// 保存设置
function saveSettings() {
    const realName = document.getElementById('realNameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();

    // 验证手机号格式(选填,如果填了就要验证格式)
    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
        utils.toast('请输入正确的手机号', { type: 'top' });
        return;
    }

    utils.loading('保存中...');

    axios.post('/wechat/user/profile', {
        real_name: realName,
        phone: phone
    })
    .then(response => {
        if (response.data.code === 200) {
            utils.toast('保存成功', { type: 'success' });
            currentUser = response.data.data;
            setTimeout(() => {
                history.back();
            }, 1500);
        } else {
            utils.toast(response.data.message || '保存失败', { type: 'top' });
        }
    })
    .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0][0];
            utils.toast(firstError, { type: 'top' });
        } else {
            utils.toast(error.response?.data?.message || '保存失败', { type: 'top' });
        }
    })
    .finally(() => {
        utils.hideLoading();
    });
}

// 绑定事件
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    document.getElementById('saveButton').addEventListener('click', saveSettings);
});
</script>
@endpush
