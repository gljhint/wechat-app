import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkOverlayModalCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / 0.6);position:fixed;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);z-index:50}rtk-icon{height:var(--rtk-space-20, 80px)}h2{margin:var(--rtk-space-2, 8px);font-weight:500}p{margin:var(--rtk-space-0, 0px);font-size:16px}";
const RtkOverlayModalStyle0 = rtkOverlayModalCss;

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
const RtkOverlayModal = /*@__PURE__*/ proxyCustomElement(class RtkOverlayModal extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    connectedCallback() {
        if (this.states.activeOverlayModal.timeout) {
            setTimeout(() => {
                this.stateUpdate.emit({ activeOverlayModal: { active: false } });
            }, this.states.activeOverlayModal.timeout);
        }
    }
    render() {
        return (h(Host, { key: 'c767e575975cc837f1f484932c5c916d5d7e4522' }, h("rtk-icon", { key: '0f4e8e81e1fa985852cbe4055203ca3095ae8ebe', icon: this.states.activeOverlayModal.icon }), h("h2", { key: '1af8c19bc19e93b279cf396903a91d3ae7192eda' }, this.states.activeOverlayModal.title), h("p", { key: '226aacfe32b70ba4e1a01b1e4875af3fd39b559a' }, this.states.activeOverlayModal.description)));
    }
    static get style() { return RtkOverlayModalStyle0; }
}, [1, "rtk-overlay-modal", {
        "meeting": [16],
        "states": [16],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkOverlayModal.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkOverlayModal.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkOverlayModal.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkOverlayModal.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-overlay-modal", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-overlay-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkOverlayModal);
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkOverlayModal as R, defineCustomElement as d };
