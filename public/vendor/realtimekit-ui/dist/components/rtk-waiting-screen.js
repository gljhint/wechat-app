import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$2 } from './p-c2d72f31.js';

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
const RtkWaitingScreen$1 = /*@__PURE__*/ proxyCustomElement(class RtkWaitingScreen extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Config */
        this.config = createDefaultConfig();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    render() {
        return (h(Host, { key: '5f35f594c3c621db03b7d29397ebc5436bb8cb0d' }, h("slot", { key: '7e5eb00806056651b1fdd9cce1b7ff758a44afc2' }, h("div", { key: 'dd9dc281d1592383d23ad7045fa38f231140ec7e', class: "centered", part: "content" }, h("rtk-logo", { key: '59bbcae1ba6cc66d5a0e3b0994b9801c1eeb1884', meeting: this.meeting, config: this.config, part: "logo", t: this.t }), h("p", { key: 'b7dfb63fc063abf5eeb8cba203cb842f504d2d87' }, this.t('waitlist.body_text'))))));
    }
    static get style() { return RtkWaitingScreenStyle0; }
}, [1, "rtk-waiting-screen", {
        "meeting": [16],
        "config": [16],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkWaitingScreen$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkWaitingScreen$1.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkWaitingScreen$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkWaitingScreen$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-waiting-screen", "rtk-logo"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-waiting-screen":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkWaitingScreen$1);
            }
            break;
        case "rtk-logo":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const RtkWaitingScreen = RtkWaitingScreen$1;
const defineCustomElement = defineCustomElement$1;

export { RtkWaitingScreen, defineCustomElement };
