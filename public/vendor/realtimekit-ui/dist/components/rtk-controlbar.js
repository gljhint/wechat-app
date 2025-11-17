import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { R as Render } from './p-60fdbd75.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

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
const RtkControlbar$1 = /*@__PURE__*/ proxyCustomElement(class RtkControlbar extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Variant */
        this.variant = 'solid';
        /** Whether to render the default UI */
        this.disableRender = false;
        /** Config */
        this.config = createDefaultConfig();
        /** Icon Pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
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
        return (h(Host, { key: '65680394a70e60ccdb25b0a872ab433610e1b8b7' }, !this.disableRender && (h(Render, { key: '244f8d28e5a18483193a8a62fabd7550c06c110d', element: "rtk-controlbar", defaults: defaults, onlyChildren: true })), h("slot", { key: 'e77d170e9292b6b1c0962c196ea9232ea4372294' })));
    }
    static get style() { return RtkControlbarStyle0; }
}, [1, "rtk-controlbar", {
        "variant": [513],
        "disableRender": [4, "disable-render"],
        "meeting": [16],
        "config": [16],
        "states": [16],
        "iconPack": [16],
        "t": [16],
        "size": [513]
    }]);
__decorate([
    SyncWithStore()
], RtkControlbar$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkControlbar$1.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkControlbar$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkControlbar$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkControlbar$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-controlbar"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-controlbar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkControlbar$1);
            }
            break;
    } });
}
defineCustomElement$1();

const RtkControlbar = RtkControlbar$1;
const defineCustomElement = defineCustomElement$1;

export { RtkControlbar, defineCustomElement };
