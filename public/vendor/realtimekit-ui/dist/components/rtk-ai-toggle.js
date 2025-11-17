import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-c5b6ed4f.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkAiToggleCss = ":host{display:block}:host([data-hidden]){display:none}";
const RtkAiToggleStyle0 = rtkAiToggleCss;

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
const RtkAiToggle$1 = /*@__PURE__*/ proxyCustomElement(class RtkAiToggle extends H {
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
        this.aiActive = false;
    }
    statesChanged(s) {
        const states = s;
        this.aiActive = states.activeAI;
    }
    toggleAI() {
        var _a;
        this.aiActive = !((_a = this.states) === null || _a === void 0 ? void 0 : _a.activeAI);
        this.stateUpdate.emit({
            activeAI: this.aiActive,
            activeMoreMenu: false,
            activeSidebar: false,
        });
    }
    render() {
        var _a, _b;
        if (!this.meeting)
            return null;
        const text = this.t('ai.meeting_ai');
        if (!((_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.permissions).transcriptionEnabled) {
            return h(Host, { "data-hidden": true });
        }
        return (h(Host, { title: text }, h("rtk-controlbar-button", { part: "controlbar-button", size: this.size, iconPack: this.iconPack, class: { active: this.aiActive }, onClick: () => this.toggleAI(), icon: this.iconPack.meeting_ai, label: text, variant: this.variant, brandIcon: true })));
    }
    static get watchers() { return {
        "states": ["statesChanged"]
    }; }
    static get style() { return RtkAiToggleStyle0; }
}, [1, "rtk-ai-toggle", {
        "variant": [513],
        "states": [16],
        "meeting": [16],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "aiActive": [32]
    }, undefined, {
        "states": ["statesChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkAiToggle$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkAiToggle$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkAiToggle$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkAiToggle$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-ai-toggle", "rtk-controlbar-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-ai-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkAiToggle$1);
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

const RtkAiToggle = RtkAiToggle$1;
const defineCustomElement = defineCustomElement$1;

export { RtkAiToggle, defineCustomElement };
