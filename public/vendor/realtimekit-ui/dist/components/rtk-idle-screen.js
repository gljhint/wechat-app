import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-3b29dda1.js';
import { d as defineCustomElement$3 } from './p-c2d72f31.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

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
const RtkIdleScreen$1 = /*@__PURE__*/ proxyCustomElement(class RtkIdleScreen extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
    static get style() { return RtkIdleScreenStyle0; }
}, [1, "rtk-idle-screen", {
        "meeting": [16],
        "config": [16],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkIdleScreen$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkIdleScreen$1.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkIdleScreen$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkIdleScreen$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-idle-screen", "rtk-icon", "rtk-logo", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-idle-screen":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkIdleScreen$1);
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-logo":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const RtkIdleScreen = RtkIdleScreen$1;
const defineCustomElement = defineCustomElement$1;

export { RtkIdleScreen, defineCustomElement };
