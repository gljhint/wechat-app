import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-c5b6ed4f.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkMoreToggleCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;flex-direction:column;overflow:visible}.more-menu{position:absolute;right:calc(var(--rtk-space-24, 96px) * -1);bottom:var(--rtk-space-16, 64px);z-index:50;margin-bottom:var(--rtk-space-3, 12px);box-sizing:border-box;max-height:60vh;width:var(--rtk-space-64, 256px);overflow:auto;border-radius:var(--rtk-border-radius-md, 8px);border-width:var(--rtk-border-width-sm, 1px);border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));outline:2px solid transparent;outline-offset:2px;display:flex;flex-direction:column;align-items:stretch}:host([size='sm']) .more-menu{bottom:var(--rtk-space-10, 40px)}.more-menu::-webkit-scrollbar{height:var(--rtk-space-0, 0px);width:var(--rtk-space-1\\.5, 6px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}.more-menu::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}";
const RtkMoreToggleStyle0 = rtkMoreToggleCss;

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
const RtkMoreToggle$1 = /*@__PURE__*/ proxyCustomElement(class RtkMoreToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.handleKeyDown = ({ key }) => {
            if (key === 'Escape') {
                this.stateUpdate.emit({ activeMoreMenu: false });
            }
        };
        this.handleOnClick = (e) => {
            if (!e.composedPath().includes(this.host) && this.states.activeMoreMenu) {
                this.stateUpdate.emit({ activeMoreMenu: false });
            }
        };
        this.toggleMoreMenu = () => {
            this.stateUpdate.emit({ activeMoreMenu: !this.states.activeMoreMenu });
        };
    }
    connectedCallback() {
        /** A11y */
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('click', this.handleOnClick);
        // };
    }
    disconnectedCallback() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('click', this.handleOnClick);
    }
    render() {
        const text = this.t('more');
        return (h(Host, { key: '8cee20061968a6658b164929fa725c0d56f3c5f4', title: text }, this.states.activeMoreMenu && (h("div", { key: '1cf7d2a85d4d1626a0c469d77c91131e9f86b451', class: "more-menu" }, h("slot", { key: '3c1507fa6561127f2d1a4f9d53899dece5d933a2', name: "more-elements" }))), h("rtk-controlbar-button", { key: '76ea4f7d1a55abc6928c6b6c55d89382d46b34e3', size: this.size, iconPack: this.iconPack, onClick: (e) => {
                e.stopPropagation();
                this.toggleMoreMenu();
            }, icon: this.iconPack.horizontal_dots, label: text, part: "controlbar-button" }), h("slot", { key: 'e38000e817552abd2b20668885effaf8a0b73592', name: "expanded" })));
    }
    get host() { return this; }
    static get style() { return RtkMoreToggleStyle0; }
}, [1, "rtk-more-toggle", {
        "states": [16],
        "size": [513],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkMoreToggle$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkMoreToggle$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkMoreToggle$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-more-toggle", "rtk-controlbar-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-more-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMoreToggle$1);
            }
            break;
        case "rtk-controlbar-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-icon":
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

const RtkMoreToggle = RtkMoreToggle$1;
const defineCustomElement = defineCustomElement$1;

export { RtkMoreToggle, defineCustomElement };
