import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { c as computePosition, o as offset, f as flip, s as shift } from './p-769bb885.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkMenuCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:inline-block;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}#menu-list{position:absolute;z-index:20;display:none}";
const RtkMenuStyle0 = rtkMenuCss;

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
const RtkMenu = /*@__PURE__*/ proxyCustomElement(class RtkMenu extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.clickedThis = false;
        /** Placement of menu */
        this.placement = 'bottom-end';
        /** Offset in px */
        this.offset = 10;
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.handleOutsideClick = () => {
            // handles clicking on other menu triggers
            if (!this.clickedThis) {
                // if other trigger is clicked, hide this menu-list
                this.menuListEl.style.display = 'none';
            }
            // reset the value
            this.clickedThis = false;
        };
    }
    componentDidLoad() {
        document.addEventListener('click', this.handleOutsideClick);
        this.update();
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick);
    }
    update() {
        computePosition(this.triggerEl, this.menuListEl, {
            placement: this.placement,
            middleware: [offset(this.offset), flip(), shift({ padding: 5 })],
        }).then(({ x, y }) => {
            Object.assign(this.menuListEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
    render() {
        return (h(Host, { key: 'a814ea3dde902a15cb6fb0db8a9c2409c240537f' }, h("span", { key: 'de2447524c6a1787a6b9442ccb9c3d56a33e9f4f', id: "trigger", ref: (el) => (this.triggerEl = el), onClick: () => {
                this.clickedThis = true;
                if (this.menuListEl.style.display !== 'block') {
                    this.menuListEl.style.display = 'block';
                    this.update();
                }
                else {
                    this.menuListEl.style.display = 'none';
                }
            } }, h("slot", { key: 'fb566f431ceca452fad8b564cfb777bc90411a02', name: "trigger" })), h("span", { key: '50b030d301e54677d19cc21dadcec53f566b14cf', part: "menu-list", id: "menu-list", ref: (el) => (this.menuListEl = el) }, h("slot", { key: '59ce6c30c39155fec448114fd25752585d95c87d' }))));
    }
    static get style() { return RtkMenuStyle0; }
}, [1, "rtk-menu", {
        "size": [513],
        "placement": [1],
        "offset": [2],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkMenu.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkMenu.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-menu"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-menu":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMenu);
            }
            break;
    } });
}
defineCustomElement();

export { RtkMenu as R, defineCustomElement as d };
