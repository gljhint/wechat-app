'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');

const rtkWaitingScreenCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.centered{display:flex;flex-direction:column;align-items:center}rtk-logo{margin-bottom:var(--rtk-space-8, 32px);height:var(--rtk-space-12, 48px)}p{font-size:16px;border-radius:var(--rtk-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding-left:var(--rtk-space-8, 32px);padding-right:var(--rtk-space-8, 32px);padding-top:var(--rtk-space-4, 16px);padding-bottom:var(--rtk-space-4, 16px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}";
const RtkWaitingScreenStyle0 = rtkWaitingScreenCss;

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
const RtkWaitingScreen = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    render() {
        return (index$1.h(index$1.Host, { key: '5f35f594c3c621db03b7d29397ebc5436bb8cb0d' }, index$1.h("slot", { key: '7e5eb00806056651b1fdd9cce1b7ff758a44afc2' }, index$1.h("div", { key: 'dd9dc281d1592383d23ad7045fa38f231140ec7e', class: "centered", part: "content" }, index$1.h("rtk-logo", { key: '59bbcae1ba6cc66d5a0e3b0994b9801c1eeb1884', meeting: this.meeting, config: this.config, part: "logo", t: this.t }), index$1.h("p", { key: 'b7dfb63fc063abf5eeb8cba203cb842f504d2d87' }, this.t('waitlist.body_text'))))));
    }
};
__decorate([
    index.SyncWithStore()
], RtkWaitingScreen.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkWaitingScreen.prototype, "config", void 0);
__decorate([
    index.SyncWithStore()
], RtkWaitingScreen.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkWaitingScreen.prototype, "t", void 0);
RtkWaitingScreen.style = RtkWaitingScreenStyle0;

exports.rtk_waiting_screen = RtkWaitingScreen;
