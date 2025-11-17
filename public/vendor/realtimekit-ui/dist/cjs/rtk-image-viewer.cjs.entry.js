'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const file = require('./file-33e9ed90.js');
const index = require('./index-77d3cd4a.js');
const string = require('./string-a410fab6.js');

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
const RtkImageViewer = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.close = index$1.createEvent(this, "close", 7);
        /** Language */
        this.t = uiStore.useLanguage();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
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
        return (index$1.h(index$1.Host, { key: 'f7d65ee86716b9bea4ff1839df12647fa03bc053', class: "scrollbar", onClick: (e) => e.stopPropagation() }, index$1.h("div", { key: '30715a0e1d52250815411be7a4339c47a9c050ff', class: "header" }, index$1.h("div", { key: '69bcd74cea972c9663f46549b1c62b08afd94558', class: "shared-by-user" }, this.t('chat.img.shared_by'), ' ', index$1.h("span", { key: '86b7f0095054d490e0a534d2c5df3733503dde72', class: "displayName" }, string.formatName(string.shorten(this.image.displayName)))), index$1.h("div", { key: '84b428b667da741f420753a0c58ef6a04169f765', class: "actions" }, index$1.h("rtk-button", { key: 'dce9d2b6c6e4b7dcfb429839762a0f350dc474df', onClick: () => file.downloadFile(this.image.link, { fallbackName: 'image' }) }, index$1.h("rtk-icon", { key: 'f9a6b1fbd5f770555ba4bc7267fff7ca6102f097', icon: this.iconPack.download, slot: "start" }), "Download"), index$1.h("rtk-button", { key: '4051efa57da483dc628769fdd1e754a49fd389b7', kind: "icon", variant: "secondary", onClick: () => this.close.emit() }, index$1.h("rtk-icon", { key: 'ee1e43b0f89ad76c5cad6db21d6f8759c5d87a89', icon: this.iconPack.dismiss })))), index$1.h("div", { key: '752ab0206aa1b1e9447f9814210bcaa346dfab5d', class: "image-ctr" }, index$1.h("img", { key: '7de531b58aa5aad94ab03d500d34d13c37b43ba1', src: this.image.link }))));
    }
};
__decorate([
    index.SyncWithStore()
], RtkImageViewer.prototype, "t", void 0);
__decorate([
    index.SyncWithStore()
], RtkImageViewer.prototype, "iconPack", void 0);
RtkImageViewer.style = RtkImageViewerStyle0;

exports.rtk_image_viewer = RtkImageViewer;
