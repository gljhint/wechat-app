import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { h as useLanguage, e as defaultIconPack } from './p-74e01969.js';
import { d as downloadFile } from './p-9fc565cf.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { f as formatName, s as shorten } from './p-338c7261.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';

const rtkImageViewerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{width:1140px;max-width:100%;box-sizing:border-box;display:flex;flex-direction:column;padding:var(--rtk-space-6, 24px);padding-top:var(--rtk-space-5, 20px);overflow-y:auto;color:rgb(var(--rtk-colors-text-1000, 255 255 255));z-index:40;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}.displayName{font-weight:700}.image-ctr{margin-top:var(--rtk-space-2, 8px);box-sizing:border-box;display:flex;justify-content:center;overflow:hidden}.actions{display:flex;align-items:center;justify-content:flex-end;gap:var(--rtk-space-2, 8px)}img{box-sizing:border-box;display:block;max-height:100%;max-width:100%;-o-object-fit:contain;object-fit:contain}.header{display:flex;align-items:center;justify-content:space-between;padding-bottom:var(--rtk-space-4, 16px)}.shared-by-user{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}:host([size='sm']) .header{flex-direction:column}:host([size='sm']) .header .actions{margin-top:var(--rtk-space-4, 16px)}";
const RtkImageViewerStyle0 = rtkImageViewerCss;

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
const RtkImageViewer$1 = /*@__PURE__*/ proxyCustomElement(class RtkImageViewer extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.close = createEvent(this, "close", 7);
        /** Language */
        this.t = useLanguage();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        this.keypressListener = (e) => {
            if (e.key === 'Escape') {
                this.close.emit();
            }
        };
        this.handleOutsideClick = () => this.close.emit();
    }
    connectedCallback() {
        document.addEventListener('keydown', this.keypressListener);
        document.addEventListener('click', this.handleOutsideClick);
    }
    disconnectedCallback() {
        document.removeEventListener('keydown', this.keypressListener);
        document.removeEventListener('click', this.handleOutsideClick);
    }
    render() {
        return (h(Host, { key: 'f7d65ee86716b9bea4ff1839df12647fa03bc053', class: "scrollbar", onClick: (e) => e.stopPropagation() }, h("div", { key: '30715a0e1d52250815411be7a4339c47a9c050ff', class: "header" }, h("div", { key: '69bcd74cea972c9663f46549b1c62b08afd94558', class: "shared-by-user" }, this.t('chat.img.shared_by'), ' ', h("span", { key: '86b7f0095054d490e0a534d2c5df3733503dde72', class: "displayName" }, formatName(shorten(this.image.displayName)))), h("div", { key: '84b428b667da741f420753a0c58ef6a04169f765', class: "actions" }, h("rtk-button", { key: 'dce9d2b6c6e4b7dcfb429839762a0f350dc474df', onClick: () => downloadFile(this.image.link, { fallbackName: 'image' }) }, h("rtk-icon", { key: 'f9a6b1fbd5f770555ba4bc7267fff7ca6102f097', icon: this.iconPack.download, slot: "start" }), "Download"), h("rtk-button", { key: '4051efa57da483dc628769fdd1e754a49fd389b7', kind: "icon", variant: "secondary", onClick: () => this.close.emit() }, h("rtk-icon", { key: 'ee1e43b0f89ad76c5cad6db21d6f8759c5d87a89', icon: this.iconPack.dismiss })))), h("div", { key: '752ab0206aa1b1e9447f9814210bcaa346dfab5d', class: "image-ctr" }, h("img", { key: '7de531b58aa5aad94ab03d500d34d13c37b43ba1', src: this.image.link }))));
    }
    static get style() { return RtkImageViewerStyle0; }
}, [1, "rtk-image-viewer", {
        "image": [16],
        "size": [513],
        "t": [16],
        "iconPack": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkImageViewer$1.prototype, "t", void 0);
__decorate([
    SyncWithStore()
], RtkImageViewer$1.prototype, "iconPack", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-image-viewer", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-image-viewer":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkImageViewer$1);
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
    } });
}
defineCustomElement$1();

const RtkImageViewer = RtkImageViewer$1;
const defineCustomElement = defineCustomElement$1;

export { RtkImageViewer, defineCustomElement };
