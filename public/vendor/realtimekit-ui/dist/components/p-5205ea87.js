import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkMenuItemCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;align-items:center;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);cursor:pointer;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;color:rgb(var(--rtk-colors-text-1000, 255 255 255));font-size:14px}::slotted([slot='start']){margin-right:var(--rtk-space-2, 8px)}::slotted([slot='end']){margin-left:var(--rtk-space-2, 8px)}:host(:hover){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}:host(.red){--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkMenuItemStyle0 = rtkMenuItemCss;

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
const RtkMenuItem = /*@__PURE__*/ proxyCustomElement(class RtkMenuItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    render() {
        return (h(Host, { key: 'f0316fee5ac5fd2124ee26ac2664172007ad1c54' }, h("slot", { key: '994a3a27f743462a3ae0a4c95bc5de672119fdb6', name: "start" }), h("slot", { key: '24594ecaffb46a4b0458032596570fee37e6ae00' }), h("slot", { key: '4ede22267a24a37c508591b0148a1e1b2c391fc9', name: "end" })));
    }
    static get style() { return RtkMenuItemStyle0; }
}, [1, "rtk-menu-item", {
        "size": [513],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkMenuItem.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkMenuItem.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-menu-item"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-menu-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMenuItem);
            }
            break;
    } });
}
defineCustomElement();

export { RtkMenuItem as R, defineCustomElement as d };
