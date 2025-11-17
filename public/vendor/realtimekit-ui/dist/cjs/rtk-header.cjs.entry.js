'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index$2 = require('./index-821d14b7.js');
const index = require('./index-77d3cd4a.js');

const rtkHeaderCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:var(--rtk-space-12, 48px);align-items:center;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding-left:var(--rtk-space-4, 16px);padding-right:var(--rtk-space-4, 16px)}@media only screen and (max-device-height: 480px) and (orientation: landscape){:host{display:none !important}}@media only screen and (max-height: 480px) and (orientation: landscape){:host{display:none !important}}";
const RtkHeaderStyle0 = rtkHeaderCss;

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
const RtkHeader = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Variant */
        this.variant = 'solid';
        /** Whether to render the default UI */
        this.disableRender = false;
        /** Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon Pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    render() {
        const defaults = {
            meeting: this.meeting,
            config: this.config,
            states: this.states,
            t: this.t,
            iconPack: this.iconPack,
            size: this.size,
        };
        return (index$1.h(index$1.Host, { key: '1f3b7e1a0a0895e6429c12ddb44470ef35a30d23' }, !this.disableRender && index$1.h(index$2.Render, { key: '3b1525e4f4aaac177b466e4c72be4b7492bd404f', element: "rtk-header", defaults: defaults, onlyChildren: true }), index$1.h("slot", { key: '6f770052362e6daa803638e0857de41c2c894ed3' })));
    }
};
__decorate([
    index.SyncWithStore()
], RtkHeader.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkHeader.prototype, "config", void 0);
__decorate([
    index.SyncWithStore()
], RtkHeader.prototype, "states", void 0);
__decorate([
    index.SyncWithStore()
], RtkHeader.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkHeader.prototype, "t", void 0);
RtkHeader.style = RtkHeaderStyle0;

exports.rtk_header = RtkHeader;
