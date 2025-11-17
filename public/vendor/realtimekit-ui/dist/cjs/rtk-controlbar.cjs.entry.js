'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index$2 = require('./index-821d14b7.js');
const index = require('./index-77d3cd4a.js');

const rtkControlbarCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{box-sizing:border-box;display:flex;align-items:center;gap:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding-left:var(--rtk-space-4, 16px);padding-right:var(--rtk-space-4, 16px);position:relative;z-index:10}@media only screen and (max-device-height: 480px) and (orientation: landscape){:host{padding-top:var(--rtk-space-0, 0px) !important}}";
const RtkControlbarStyle0 = rtkControlbarCss;

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
const RtkControlbar = class {
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
        return (index$1.h(index$1.Host, { key: '65680394a70e60ccdb25b0a872ab433610e1b8b7' }, !this.disableRender && (index$1.h(index$2.Render, { key: '244f8d28e5a18483193a8a62fabd7550c06c110d', element: "rtk-controlbar", defaults: defaults, onlyChildren: true })), index$1.h("slot", { key: 'e77d170e9292b6b1c0962c196ea9232ea4372294' })));
    }
};
__decorate([
    index.SyncWithStore()
], RtkControlbar.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkControlbar.prototype, "config", void 0);
__decorate([
    index.SyncWithStore()
], RtkControlbar.prototype, "states", void 0);
__decorate([
    index.SyncWithStore()
], RtkControlbar.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkControlbar.prototype, "t", void 0);
RtkControlbar.style = RtkControlbarStyle0;

exports.rtk_controlbar = RtkControlbar;
