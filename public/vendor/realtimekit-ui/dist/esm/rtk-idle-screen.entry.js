import { r as registerInstance, h, H as Host } from './index-c1fb98bb.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './ui-store-0098d5c6.js';
import { S as SyncWithStore } from './index-914449da.js';

const rtkIdleScreenCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{height:100%;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.ctr{display:flex;flex-direction:column;align-items:center;gap:var(--rtk-space-8, 32px)}rtk-logo.loaded{height:var(--rtk-space-12, 48px)}rtk-spinner{height:var(--rtk-space-12, 48px);width:var(--rtk-space-12, 48px);--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}";
const RtkIdleScreenStyle0 = rtkIdleScreenCss;

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
const RtkIdleScreen = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Config object */
        this.config = createDefaultConfig();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    render() {
        return (h(Host, { key: 'c5eff1252dc42e20190130962994d713b95b922b' }, h("slot", { key: '99a385d737fba394bcce3340d7ceaa49fe290580' }, h("div", { key: '484cfb782b699eea5be2eac7c003dcaea922177a', class: "ctr", part: "container" }, h("rtk-logo", { key: '0e190078187680faec1df09a7a50bc80d405a978', meeting: this.meeting, config: this.config, t: this.t, part: "logo" }), h("rtk-spinner", { key: 'f00bae50ccb13120714d2d94c9629747824b5eaa', "aria-label": "Idle, waiting for meeting data", part: "spinner", iconPack: this.iconPack })))));
    }
};
__decorate([
    SyncWithStore()
], RtkIdleScreen.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkIdleScreen.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkIdleScreen.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkIdleScreen.prototype, "t", void 0);
RtkIdleScreen.style = RtkIdleScreenStyle0;

export { RtkIdleScreen as rtk_idle_screen };
