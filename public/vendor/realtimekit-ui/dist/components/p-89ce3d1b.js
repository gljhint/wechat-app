import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkPollFormCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.create-poll{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px);display:flex;flex:1 1 0%;flex-direction:column;padding:var(--rtk-space-3, 12px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.create-poll p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px);text-align:center}.create-poll textarea{display:flex;border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);font-family:var(--rtk-font-family, sans-serif);border-width:var(--rtk-border-width-none, 0);border-style:none;font-weight:500;outline:2px solid transparent;outline-offset:2px;margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px);resize:vertical;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.create-poll textarea:focus{outline-style:solid;outline-offset:2px;outline-color:rgb(var(--rtk-colors-background-600, 60 60 60))}.option{display:flex;flex-direction:row;align-items:center;margin-bottom:var(--rtk-space-3, 12px);width:100%}.option input{width:100%;border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.remove-option{margin-left:var(--rtk-space-2, 8px);width:var(--rtk-space-10, 40px);border-radius:var(--rtk-border-radius-sm, 4px)}.add-option{margin-bottom:var(--rtk-space-3, 12px)}label{margin-bottom:var(--rtk-space-3, 12px)}.error-text{margin-top:var(--rtk-space-3, 12px);text-align:center;font-size:12px;--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkPollFormStyle0 = rtkPollFormCss;

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkPoll = /*@__PURE__*/ proxyCustomElement(class RtkPoll extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onCreate = createEvent(this, "rtkCreatePoll", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Options */
        this.options = ['', ''];
        this.anonymous = false;
        this.hideVotes = true;
    }
    removeOption(index) {
        var _a;
        this.options = this.options.filter((_, ind) => ind !== index);
        if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === 1)
            this.error = undefined;
    }
    addOption() {
        this.options = [...this.options, ''];
    }
    updateOption(ev, index) {
        var _a;
        this.options[index] = ev.target.value;
        if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === 1)
            this.error = undefined;
    }
    handleSubmit() {
        const pollObject = {
            question: this.question.value,
            options: this.options,
            anonymous: this.anonymous,
            hideVotes: this.anonymous ? true : this.hideVotes,
        };
        if (!pollObject.question) {
            this.error = {
                code: 0,
                message: this.t('polls.errors.question_required'),
            };
            return;
        }
        if (this.options.filter((op) => op.trim() === '').length > 0) {
            this.error = {
                code: 1,
                message: this.t('polls.errors.empty_option'),
            };
            return;
        }
        this.onCreate.emit(pollObject);
    }
    render() {
        return (h(Host, { key: '625bbf35e528f16b4a982a159c3631af1d444a85' }, h("div", { key: 'f0d20f8d5e53d1f8fd5063b7e533dc50d8184dc5', class: "create-poll" }, h("p", { key: '2dbcff9b0828790c4315e62f45c139f30971b72c' }, this.t('polls.question')), h("textarea", { key: '6ff40a7fe19cded416f45474065b9361de83d5a2', onInput: () => {
                if (this.error && this.error.code === 0)
                    this.error = undefined;
            }, ref: (e) => (this.question = e), placeholder: this.t('polls.question.placeholder') }), this.options.map((item, index) => (h("div", { class: "option" }, h("input", { placeholder: this.t('polls.option.placeholder'), value: item, onInput: (event) => this.updateOption(event, index) }), index > 1 && (h("rtk-button", { kind: "icon", class: "auto remove-option", variant: "secondary", onClick: () => this.removeOption(index) }, h("rtk-icon", { icon: this.iconPack.subtract })))))), h("rtk-button", { key: '565c530735bf27e14b0a5ee33afca6f45b1e4fc5', class: "add-option", variant: "secondary", onClick: () => this.addOption() }, this.t('polls.option')), h("label", { key: 'c38d4c9bee1c086cb481a94b17853749d5de6b63' }, h("input", { key: '64f21e59d497ae0182da74064d96ad66a522515d', id: "anonymous", type: "checkbox", onChange: (e) => (this.anonymous = e.target.checked) }), this.t('polls.results.anon')), h("label", { key: 'ec293dc473b4d9d0df7fe9d93e036ff28c0ea3d1' }, h("input", { key: 'bef5ee43cee42d3c16927efc810ad4b76cb8994b', id: "hideVotes", type: "checkbox", disabled: this.anonymous, checked: this.anonymous ? true : this.hideVotes, onChange: (e) => (this.hideVotes = e.target.checked) }), this.t('polls.results.hide')), h("rtk-button", { key: '7b5646a77576a2836370d16dc2104d267c573de2', kind: "wide", onClick: () => this.handleSubmit() }, this.t('polls.create')), this.error && h("span", { key: 'd51a6301dba0c3686a5f1e59ebdc98eccfa7488b', class: "error-text" }, this.error.message))));
    }
    static get style() { return RtkPollFormStyle0; }
}, [1, "rtk-poll-form", {
        "iconPack": [16],
        "t": [16],
        "options": [32],
        "anonymous": [32],
        "hideVotes": [32],
        "error": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkPoll.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkPoll.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-poll-form", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-poll-form":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkPoll);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkPoll as R, defineCustomElement as d };
