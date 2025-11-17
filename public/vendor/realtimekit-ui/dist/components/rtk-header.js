import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { R as Render } from './p-60fdbd75.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

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
const RtkHeader$1 = /*@__PURE__*/ proxyCustomElement(class RtkHeader extends H {
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
        return (h(Host, { key: '1f3b7e1a0a0895e6429c12ddb44470ef35a30d23' }, !this.disableRender && h(Render, { key: '3b1525e4f4aaac177b466e4c72be4b7492bd404f', element: "rtk-header", defaults: defaults, onlyChildren: true }), h("slot", { key: '6f770052362e6daa803638e0857de41c2c894ed3' })));
    }
    static get style() { return RtkHeaderStyle0; }
}, [1, "rtk-header", {
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
], RtkHeader$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkHeader$1.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkHeader$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkHeader$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkHeader$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-header"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkHeader$1);
            }
            break;
    } });
}
defineCustomElement$1();

const RtkHeader = RtkHeader$1;
const defineCustomElement = defineCustomElement$1;

export { RtkHeader, defineCustomElement };
