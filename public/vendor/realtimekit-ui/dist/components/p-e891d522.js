import { p as proxyCustomElement, H, d as createEvent, h } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { a as sanitizeLink } from './p-338c7261.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as downloadFile } from './p-9fc565cf.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-a59a9c97.js';

const rtkImageMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.image-spinner{cursor:wait}.image-errored{cursor:not-allowed}.image{display:block;font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));position:relative;height:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);cursor:pointer}.image img{display:none;height:100%;width:100%;border-radius:var(--rtk-border-radius-sm, 4px);-o-object-fit:cover;object-fit:cover}.image .image-spinner{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.image .image-spinner rtk-spinner{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}.image .image-errored{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);background-color:rgba(var(--rtk-colors-danger, 255 45 45) / 0.1);--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.image .actions{display:none;height:var(--rtk-space-8, 32px);align-items:center;position:absolute;top:var(--rtk-space-2, 8px);right:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.image .actions .action{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);border-radius:var(--rtk-border-radius-none, 0);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.image .actions .action:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.image.loaded img{display:block}.image.loaded .image-spinner{display:none}.image:hover .actions,.image:focus .actions{display:flex}";
const RtkImageMessageViewStyle0 = rtkImageMessageViewCss;

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
const RtkImageMessageView = /*@__PURE__*/ proxyCustomElement(class RtkImageMessageView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onPreview = createEvent(this, "preview", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.status = 'loading';
    }
    render() {
        return (h("div", { key: '259bdc1102c6026dd10388ae759f67608c777b5f', class: { image: true, loaded: this.status === 'loaded' } }, h("img", { key: 'dbcb8d497fee3710f4474ec3ac0ce9a9b4f1bb49', src: sanitizeLink(this.url), onLoad: () => {
                this.status = 'loaded';
            }, onError: () => {
                this.status = 'errored';
            }, onClick: () => {
                if (this.status === 'loaded') {
                    this.onPreview.emit(this.url);
                }
            } }), this.status === 'loading' && (h("div", { key: 'b0ecfada4428e1cb8c3625cc4ce3d2a5bae058ab', class: "image-spinner", title: this.t('chat.img.loading'), "aria-label": this.t('chat.img.loading') }, h("rtk-spinner", { key: 'fff61c6522d8bcb7de1345bb6505721ee6c6325e', iconPack: this.iconPack }))), this.status === 'errored' && (h("div", { key: 'c07e2cf6e9a94d375802c974e519d859ab48aa9b', class: "image-errored", title: this.t('chat.error.img_not_found'), "aria-label": this.t('chat.error.img_not_found') }, h("rtk-icon", { key: '83108f4f0396d77778463601a4f18d8593b0ffe7', icon: this.iconPack.image_off }))), this.status === 'loaded' && (h("div", { key: '96b5aafbd94eec920ae1cad14f09ab4a44571bd7', class: "actions" }, h("rtk-button", { key: 'a87ec11cc8de472aeb356689b49b6b366bd67f28', class: "action", variant: "secondary", kind: "icon", onClick: () => {
                this.onPreview.emit(this.url);
            } }, h("rtk-icon", { key: '543478c786b709ac477d4482874608c0b394b27c', icon: this.iconPack.full_screen_maximize })), h("rtk-button", { key: '6ce6d94a965688c7ec6ee64f79a4d13dda9651e3', class: "action", variant: "secondary", kind: "icon", onClick: () => downloadFile(this.url, { fallbackName: 'image' }) }, h("rtk-icon", { key: '3b1d67fbdd667e0d006e342c37f6e78c90fd2e34', icon: this.iconPack.download }))))));
    }
    static get style() { return RtkImageMessageViewStyle0; }
}, [1, "rtk-image-message-view", {
        "url": [1],
        "iconPack": [16],
        "t": [16],
        "status": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkImageMessageView.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkImageMessageView.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-image-message-view", "rtk-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-image-message-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkImageMessageView);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkImageMessageView as R, defineCustomElement as d };
