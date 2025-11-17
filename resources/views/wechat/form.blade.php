@extends('wechat.layouts.app')

@section('title', '表单示例')
@section('navbar-title', '表单示例')

@push('styles')
<style>
    .form-page {
        min-height: 100vh;
        background: #f6f7fb;
        padding-bottom: 96px;
    }

    .form-section {
        margin: 16px;
        background: #fff;
        border-radius: 18px;
        box-shadow: 0 12px 28px rgba(16, 30, 54, 0.08);
        overflow: hidden;
    }

    .form-section__header {
        padding: 18px 20px 10px;
    }

    .form-section__title {
        font-size: 16px;
        font-weight: 600;
        color: #111;
        margin: 0;
    }

    .form-section__subtitle {
        font-size: 12px;
        color: #8f9499;
        margin-top: 4px;
    }

    .form-page .weui-cells {
        margin: 0;
        border-radius: 0;
    }

    .form-actions {
        margin: 24px 16px 0;
        display: grid;
        gap: 12px;
    }
</style>
@endpush

@section('content')
<div class="form-page">
    <form id="demoForm">
        <section class="form-section">
            <div class="form-section__header">
                <h2 class="form-section__title">基础输入</h2>
                <p class="form-section__subtitle">常见的文本、邮箱与手机号输入场景。</p>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label" for="formName">姓名</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" id="formName" name="name" type="text" placeholder="请输入姓名" required>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label" for="formMobile">手机</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" id="formMobile" name="mobile" type="tel" placeholder="请输入手机号" pattern="[0-9]*" required>
                    </div>
                    <div class="weui-cell__ft">
                        <i class="weui-icon-info"></i>
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label" for="formEmail">邮箱</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" id="formEmail" name="email" type="email" placeholder="请输入邮箱">
                    </div>
                </div>
            </div>
        </section>

        <section class="form-section">
            <div class="form-section__header">
                <h2 class="form-section__title">选择与开关</h2>
                <p class="form-section__subtitle">使用选择器、开关与单选/多选按钮。</p>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd"><label class="weui-label" for="formCity">城市</label></div>
                    <div class="weui-cell__bd">
                        <select class="weui-select" id="formCity" name="city">
                            <option value="">请选择</option>
                            <option value="beijing">北京</option>
                            <option value="shanghai">上海</option>
                            <option value="guangzhou">广州</option>
                            <option value="shenzhen">深圳</option>
                        </select>
                    </div>
                </div>
                <div class="weui-cell weui-cell_switch">
                    <div class="weui-cell__bd">接收推送通知</div>
                    <div class="weui-cell__ft">
                        <input class="weui-switch" type="checkbox" name="notification" checked>
                    </div>
                </div>
                <div class="weui-cell weui-cell_switch">
                    <div class="weui-cell__bd">自动同步数据</div>
                    <div class="weui-cell__ft">
                        <input class="weui-switch" type="checkbox" name="sync">
                    </div>
                </div>
            </div>
            <div class="weui-cells weui-cells_radio">
                <label class="weui-cell weui-check__label" for="genderMale">
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="gender" id="genderMale" value="male" checked>
                        <span class="weui-icon-checked"></span>
                    </div>
                    <div class="weui-cell__bd">
                        <p>男</p>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="genderFemale">
                    <div class="weui-cell__hd">
                        <input type="radio" class="weui-check" name="gender" id="genderFemale" value="female">
                        <span class="weui-icon-checked"></span>
                    </div>
                    <div class="weui-cell__bd">
                        <p>女</p>
                    </div>
                </label>
            </div>
            <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" for="hobbyReading">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" id="hobbyReading" name="hobby[]" value="reading" checked>
                        <span class="weui-icon-checked"></span>
                    </div>
                    <div class="weui-cell__bd"><p>阅读</p></div>
                </label>
                <label class="weui-cell weui-check__label" for="hobbyTravel">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" id="hobbyTravel" name="hobby[]" value="travel">
                        <span class="weui-icon-checked"></span>
                    </div>
                    <div class="weui-cell__bd"><p>旅行</p></div>
                </label>
                <label class="weui-cell weui-check__label" for="hobbySports">
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" id="hobbySports" name="hobby[]" value="sports">
                        <span class="weui-icon-checked"></span>
                    </div>
                    <div class="weui-cell__bd"><p>运动</p></div>
                </label>
            </div>
        </section>

        <section class="form-section">
            <div class="form-section__header">
                <h2 class="form-section__title">文本与滑块</h2>
                <p class="form-section__subtitle">展示多行文本输入以及滑块控件。</p>
            </div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__bd">
                        <textarea class="weui-textarea" id="feedback" name="feedback" placeholder="请输入您的意见和建议" rows="3" maxlength="200"></textarea>
                        <div class="weui-textarea-counter"><span id="feedbackCount">0</span>/200</div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_slider">
                    <div class="weui-cell__bd">
                        <div class="weui-slider-box">
                            <div class="weui-slider" id="prioritySlider">
                                <div class="weui-slider__inner">
                                    <div class="weui-slider__track" style="width: 50%;"></div>
                                    <div class="weui-slider__handler" style="left: 50%;"></div>
                                </div>
                            </div>
                            <div class="weui-slider-box__value" id="priorityValue">50</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="form-actions">
            <button class="weui-btn weui-btn_primary" type="submit">提交</button>
            <button class="weui-btn weui-btn_default" type="button" onclick="resetForm()">重置</button>
        </div>
    </form>
</div>
@endsection

@push('scripts')
<script>
const feedbackInput = document.getElementById('feedback');
if (feedbackInput) {
    feedbackInput.addEventListener('input', () => {
        document.getElementById('feedbackCount').textContent = feedbackInput.value.length;
    });
}

const sliderElement = document.getElementById('prioritySlider');
let sliderInstance = null;
if (sliderElement && typeof weui !== 'undefined') {
    sliderInstance = weui.slider('#prioritySlider', {
        step: 1,
        defaultValue: 50,
        onChange(value) {
            document.getElementById('priorityValue').textContent = value;
        }
    });
}

function resetForm() {
    const form = document.getElementById('demoForm');
    form.reset();
    document.getElementById('feedbackCount').textContent = '0';
    document.getElementById('priorityValue').textContent = '50';
    if (sliderInstance && typeof sliderInstance.updateValue === 'function') {
        sliderInstance.updateValue(50);
    }
    utils.toast('已重置表单');
}

document.getElementById('demoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = this.name.value.trim();
    const mobile = this.mobile.value.trim();

    if (!name) {
        utils.topTips('请输入姓名');
        return;
    }

    if (!mobile) {
        utils.topTips('请输入手机号');
        return;
    }

    utils.loading('正在提交...');
    setTimeout(() => {
        utils.hideLoading();
        utils.toast('提交成功');
    }, 800);
});
</script>
@endpush
