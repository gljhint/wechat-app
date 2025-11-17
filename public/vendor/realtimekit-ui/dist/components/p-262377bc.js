import { p as proxyCustomElement, H, d as createEvent, h } from './p-c3592601.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkTextComposerViewCss = ".chat-input {\n  position: relative;\n  z-index: 10;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  border-top-left-radius: var(--rtk-border-radius-md, 8px);\n  border-top-right-radius: var(--rtk-border-radius-md, 8px)\n}\n\n  .chat-input textarea {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  box-sizing: border-box;\n  padding: var(--rtk-space-3, 12px);\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255))\n}\n\n  .chat-input textarea::-moz-placeholder {\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255))\n}\n\n  .chat-input textarea::placeholder {\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255))\n}\n\n  .chat-input textarea {\n  font-family: var(--rtk-font-family, sans-serif);\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  resize: none;\n  overflow-y: auto;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  min-height: 60px;\n  font-size: 14px\n}\n\n@container chatcontainer (height < 360px) {\n  textarea {\n    height: 30px !important;\n    min-height: 30px !important\n  }\n}\n\n.text-error {\n  left: var(--rtk-space-0, 0px);\n  z-index: 10;\n  margin-top: var(--rtk-space-1, 4px);\n  margin-left: var(--rtk-space-1, 4px);\n  display: flex;\n  width: -moz-fit-content;\n  width: fit-content;\n  align-items: center;\n  justify-content: flex-start;\n  border-radius: var(--rtk-border-radius-sm, 4px);\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--rtk-colors-warning, 255 205 7) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n  padding-left: var(--rtk-space-2, 8px);\n  padding-right: var(--rtk-space-2, 8px);\n  font-size: 12px;\n  font-weight: 600;\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-warning, 255 205 7) / var(--tw-text-opacity));\n  border: 1px solid\n}\n\n#warning-indicator {\n  margin-right: var(--rtk-space-1, 4px);\n  height: var(--rtk-space-3, 12px);\n  width: var(--rtk-space-3, 12px)\n}\n\n.text-error.breached {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-border-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))\n}";
const RtkTextComposerViewStyle0 = rtkTextComposerViewCss;

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
const RtkTextComposerView = /*@__PURE__*/ proxyCustomElement(class RtkTextComposerView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onTextChange = createEvent(this, "textChange", 7);
        /** Disable the text input (default = false) */
        this.disabled = false;
        /** Boolean to indicate if rate limit is breached */
        this.rateLimitBreached = false;
        /** Keydown event handler function */
        this.keyDownHandler = () => { };
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.maxLengthBreached = 0;
        this.onInputHandler = () => {
            const text = this.$textArea.value.trim();
            this.maybeResize(text);
            this.checkLength(text);
            this.onTextChange.emit(text);
        };
        this.maybeResize = (text) => {
            const newLines = [...text.matchAll(/\n/g)].length;
            this.$textArea.style.height = `${Math.min(200, 60 + 20 * newLines)}px`;
        };
    }
    componentDidLoad() {
        if (this.maxLength) {
            this.$textArea.maxLength = this.maxLength;
        }
        const text = this.$textArea.value.trim();
        if (text !== '') {
            this.maybeResize(text);
        }
        this.$textArea.focus();
    }
    /** Sets value of the text input */
    async setText(text, focus = false) {
        this.$textArea.value = text;
        this.maybeResize(text);
        if (focus) {
            this.$textArea.focus();
        }
        this.checkLength(text);
        this.onTextChange.emit(text);
    }
    checkLength(text) {
        // unicode code length
        const textLen = text.length;
        if (textLen + 10 >= this.maxLength) {
            this.maxLengthBreached = text.length;
        }
        else if (textLen + 10 < this.maxLength && this.maxLengthBreached > 0) {
            this.maxLengthBreached = 0;
        }
    }
    render() {
        return (h("div", { key: '16cc81323e6fb16e4d4a6622895ed7edc80f2db9', class: "chat-input", part: "chat-input-container" }, this.maxLengthBreached > 0 && (h("div", { key: '05fde7b4f3e084e464fcc3276f0ce1e0d909e6a7', class: 'text-error ' + (this.maxLengthBreached === this.maxLength ? 'breached' : '') }, h("rtk-icon", { key: 'd4101bf8933a9873605e88fbb617d8ae38bb56a1', id: "warning-indicator", icon: this.iconPack.warning, part: "warning-indicator" }), ' ', this.maxLengthBreached, " / ", this.maxLength, " ", this.t('chat.max_limit_warning'))), this.rateLimitBreached && (h("div", { key: '779a1c58114de2cce65a13ee3ea8cb308f7cd68a', class: 'text-error breached' }, h("rtk-icon", { key: '9dedd14d826b1437f434d92c985659ecc3bc1842', id: "warning-indicator", icon: this.iconPack.warning, part: "warning-indicator" }), ' ', this.t('chat.rate_limit_error'))), h("textarea", { key: 'f45f8f812ad668a86d2d0a22926bf437be44cbc9', ref: (el) => (this.$textArea = el), placeholder: this.placeholder, disabled: this.disabled, onInput: this.onInputHandler, onKeyDown: this.keyDownHandler, part: "chat-input", value: this.value })));
    }
    static get style() { return RtkTextComposerViewStyle0; }
}, [1, "rtk-text-composer-view", {
        "disabled": [4],
        "placeholder": [1],
        "value": [1],
        "maxLength": [2, "max-length"],
        "rateLimitBreached": [4, "rate-limit-breached"],
        "keyDownHandler": [16],
        "iconPack": [16],
        "t": [16],
        "maxLengthBreached": [32],
        "setText": [64]
    }]);
__decorate([
    SyncWithStore()
], RtkTextComposerView.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkTextComposerView.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-text-composer-view", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-text-composer-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkTextComposerView);
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

export { RtkTextComposerView as R, defineCustomElement as d };
