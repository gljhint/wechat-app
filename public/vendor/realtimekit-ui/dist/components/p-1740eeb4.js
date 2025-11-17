import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$1 } from './p-1391bef0.js';

const rtkConfirmationModalCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:var(--rtk-border-radius-md, 8px);padding:var(--rtk-space-8, 32px);width:100%;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));width:400px;max-width:80%}.leave-modal{width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--rtk-space-0, 0px)}.leave-modal .content{font-size:14px}.leave-modal p{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px)}.leave-meeting{display:flex;flex-direction:row;justify-content:space-between;gap:var(--rtk-space-4, 16px)}.leave-meeting rtk-button{color:rgb(var(--rtk-colors-text-1000, 255 255 255));flex:1 1 0%}.br-secondary-btn{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.br-secondary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}";
const RtkConfirmationModalStyle0 = rtkConfirmationModalCss;

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
const RtkConfirmationModal = /*@__PURE__*/ proxyCustomElement(class RtkConfirmationModal extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        this.keyPressListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.close = () => {
            this.states.activeConfirmationModal.onClose(this.stateUpdate, this.states, this.meeting);
            this.stateUpdate.emit({ activeConfirmationModal: { active: false } });
            this.states.activeConfirmationModal = { active: false };
        };
        this.onConfirmation = async () => {
            this.states.activeConfirmationModal.onClick(this.stateUpdate, this.states, this.meeting);
            this.stateUpdate.emit({ activeConfirmationModal: { active: false } });
            this.states.activeConfirmationModal = { active: false };
        };
    }
    connectedCallback() {
        document.addEventListener('keydown', this.keyPressListener);
    }
    componentDidLoad() { }
    disconnectedCallback() {
        document.removeEventListener('keydown', this.keyPressListener);
    }
    render() {
        var _a, _b;
        const state = this.states.activeConfirmationModal;
        return (h(Host, { key: 'c79124361c70a80d200f4021c7483038f330b683' }, h("div", { key: 'a1c812cc2742b0eca2525416e67579864a8c0ae7', class: "leave-modal" }, h("div", { key: '21edbc34bdd1c996707d297abf86a1c04a487396', class: "header" }, h("h2", { key: 'a7c77cf1a39bc46b787b851d51a5cd37695e44eb', class: "title" }, state.header ? this.t(state.header) : this.t('cta.confirmation'))), state.content && h("p", { key: '25ceecc3c208442821795ebf0a1a981b5130d1d9', class: "message" }, this.t(state.content)), h("div", { key: 'f081c0544fb467787cbfea432575d4a16a1c42c3', class: "content" }, h("div", { key: 'a7cf64611e6a516624310fbe0c119c279bec682d', class: "leave-meeting" }, h("rtk-button", { key: '469b16b167d943f369f9995c9b0d20225108303a', variant: "secondary", title: state.cancelText ? this.t(state.cancelText) : this.t('cancel'), onClick: this.close, class: "br-secondary-btn" }, state.cancelText ? this.t(state.cancelText) : this.t('cancel')), h("rtk-button", { key: '5fc8427e0b0c51fad3a4d033f1d6c4b4399477f3', onClick: () => this.onConfirmation(), variant: (_b = (_a = this.states.activeConfirmationModal) === null || _a === void 0 ? void 0 : _a.variant) !== null && _b !== void 0 ? _b : 'danger', title: state.ctaText ? this.t(state.ctaText) : this.t('yes') }, state.ctaText ? this.t(state.ctaText) : this.t('yes')))))));
    }
    static get style() { return RtkConfirmationModalStyle0; }
}, [1, "rtk-confirmation-modal", {
        "meeting": [16],
        "states": [16],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkConfirmationModal.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkConfirmationModal.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkConfirmationModal.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkConfirmationModal.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-confirmation-modal", "rtk-button"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-confirmation-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkConfirmationModal);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkConfirmationModal as R, defineCustomElement as d };
