import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-c5b6ed4f.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkLeaveButtonCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkLeaveButtonStyle0 = rtkLeaveButtonCss;

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
const RtkLeaveButton$1 = /*@__PURE__*/ proxyCustomElement(class RtkLeaveButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.leave = () => {
            this.stateUpdate.emit({ activeLeaveConfirmation: true });
        };
    }
    render() {
        const text = this.t('leave');
        return (h(Host, { key: '9a760243cdb8a409f96b2e44b07e84495ecf8ba6', label: text }, h("rtk-controlbar-button", { key: '5a45791756d7e448493b4968876820230d7ce81f', size: this.size, iconPack: this.iconPack, class: "leave red-icon", onClick: this.leave, icon: this.iconPack.call_end, label: text, variant: this.variant, part: "controlbar-button" })));
    }
    static get style() { return RtkLeaveButtonStyle0; }
}, [1, "rtk-leave-button", {
        "variant": [513],
        "size": [513],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkLeaveButton$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkLeaveButton$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-leave-button", "rtk-controlbar-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-leave-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkLeaveButton$1);
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

const RtkLeaveButton = RtkLeaveButton$1;
const defineCustomElement = defineCustomElement$1;

export { RtkLeaveButton, defineCustomElement };
