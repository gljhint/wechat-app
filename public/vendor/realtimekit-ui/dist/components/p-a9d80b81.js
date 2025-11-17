import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkMenuListCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;width:-moz-max-content;width:max-content;flex-direction:column;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;border-radius:var(--rtk-border-radius-sm, 4px);--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}";
const RtkMenuListStyle0 = rtkMenuListCss;

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
const RtkMenuList = /*@__PURE__*/ proxyCustomElement(class RtkMenuList extends H {
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
        return (h(Host, { key: 'c0974bc340294b197aa8310e5a9913126ac22c48' }, h("slot", { key: '1a660db36c713285203569957959663497803c5e' })));
    }
    static get style() { return RtkMenuListStyle0; }
}, [1, "rtk-menu-list", {
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkMenuList.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkMenuList.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-menu-list"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-menu-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMenuList);
            }
            break;
    } });
}
defineCustomElement();

export { RtkMenuList as R, defineCustomElement as d };
