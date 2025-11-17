import { p as proxyCustomElement, H, h } from './p-c3592601.js';
import { e as defaultIconPack } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { a as sanitizeLink } from './p-338c7261.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { g as getExtension, a as getFileSize, d as downloadFile } from './p-9fc565cf.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkFileMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.file{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px);min-width:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.file .file-data{margin-left:var(--rtk-space-1, 4px);flex:1 1 0%}.file .file-data .name{word-break:break-all;color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.file .file-data .file-data-split{margin-top:var(--rtk-space-0\\.5, 2px);display:flex;align-items:center;font-size:12px}.file .file-data .file-data-split .ext{margin-right:var(--rtk-space-2, 8px);text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.file .file-data .file-data-split .divider{height:var(--rtk-space-4, 16px);width:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.file .file-data .file-data-split .size{margin-left:var(--rtk-space-2, 8px)}";
const RtkFileMessageViewStyle0 = rtkFileMessageViewCss;

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
const RtkFileMessageView = /*@__PURE__*/ proxyCustomElement(class RtkFileMessageView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Icon pack */
        this.iconPack = defaultIconPack;
    }
    render() {
        return (h("div", { key: 'd2cbeddc138f81c05da1656ee7f59c170e83bd1e', class: "file" }, h("rtk-button", { key: 'b0ee90c3493c24e938b6ea88a317c642e4afc003', variant: "secondary", kind: "icon", onClick: () => downloadFile(sanitizeLink(this.url), { name: this.name, fallbackName: 'file' }), part: "button" }, h("rtk-icon", { key: 'c1b25c655b5c87bf95948abfa461f8b58ff79195', icon: this.iconPack.download })), h("div", { key: 'c961a8ce93d4ff4405590787a88b5a9bbdbf56ab', class: "file-data" }, h("div", { key: 'bd178354d166c7816d6fabb72f7bba70fd711415', class: "name" }, this.name), h("div", { key: '59a791ae9f94a13b4005a0d8f79d09687fe3fc4c', class: "file-data-split" }, h("div", { key: 'b31421fdf786d92eed0decec9d3b247530413aa9', class: "ext" }, getExtension(this.name)), h("span", { key: '7a0a2a188b3e0b6bee0cf54d3afe29c2454788bb', class: "divider" }), h("div", { key: 'b217b87fa0737732aae10662b82d337d7258e6d7', class: "size" }, getFileSize(this.size))))));
    }
    static get style() { return RtkFileMessageViewStyle0; }
}, [1, "rtk-file-message-view", {
        "name": [1],
        "size": [2],
        "url": [1],
        "iconPack": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkFileMessageView.prototype, "iconPack", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-file-message-view", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-file-message-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkFileMessageView);
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

export { RtkFileMessageView as R, defineCustomElement as d };
