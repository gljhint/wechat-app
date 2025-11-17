import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-c5b6ed4f.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkSettingsToggleCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkSettingsToggleStyle0 = rtkSettingsToggleCss;

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
const RtkSettingsToggle$1 = /*@__PURE__*/ proxyCustomElement(class RtkSettingsToggle extends H {
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
    }
    toggleSettings() {
        const updatePartial = { activeSettings: true, activeMoreMenu: false };
        this.states = Object.assign(Object.assign({}, this.states), updatePartial);
        this.stateUpdate.emit(updatePartial);
    }
    render() {
        const text = this.t('settings');
        return (h(Host, { key: 'a35e91bc92a802afd3eaf6f3211d1db7693413d1', title: text }, h("rtk-controlbar-button", { key: '03fb21e343891459262180be282065331a6140a3', part: "controlbar-button", size: this.size, iconPack: this.iconPack, onClick: () => this.toggleSettings(), icon: this.iconPack.settings, label: text, variant: this.variant })));
    }
    static get style() { return RtkSettingsToggleStyle0; }
}, [1, "rtk-settings-toggle", {
        "variant": [513],
        "states": [16],
        "size": [513],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkSettingsToggle$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkSettingsToggle$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkSettingsToggle$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-settings-toggle", "rtk-controlbar-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-settings-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkSettingsToggle$1);
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

const RtkSettingsToggle = RtkSettingsToggle$1;
const defineCustomElement = defineCustomElement$1;

export { RtkSettingsToggle, defineCustomElement };
