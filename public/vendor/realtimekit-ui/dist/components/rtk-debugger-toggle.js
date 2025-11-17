import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { h as useLanguage, e as defaultIconPack } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-c5b6ed4f.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkDebuggerToggleCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkDebuggerToggleStyle0 = rtkDebuggerToggleCss;

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
const RtkDebuggerToggle$1 = /*@__PURE__*/ proxyCustomElement(class RtkDebuggerToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Language */
        this.t = useLanguage();
        /** Icon pack */
        this.iconPack = defaultIconPack;
    }
    toggleDebugger() {
        var _a;
        this.stateUpdate.emit({
            activeDebugger: !((_a = this.states) === null || _a === void 0 ? void 0 : _a.activeDebugger),
            activeMoreMenu: false,
        });
    }
    render() {
        return (h(Host, { key: '5675d28a2da23df6c54e79827b0adf37ef128cd9', title: this.t('Troubleshooting') }, h("rtk-controlbar-button", { key: 'b8e16bbfb77fe9c4d50e872ed4eaecf351816a98', size: this.size, iconPack: this.iconPack, onClick: () => this.toggleDebugger(), icon: this.iconPack.debug, label: this.t('Troubleshooting'), variant: this.variant })));
    }
    static get style() { return RtkDebuggerToggleStyle0; }
}, [1, "rtk-debugger-toggle", {
        "variant": [513],
        "meeting": [16],
        "states": [16],
        "t": [16],
        "iconPack": [16],
        "size": [513]
    }]);
__decorate([
    SyncWithStore()
], RtkDebuggerToggle$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkDebuggerToggle$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkDebuggerToggle$1.prototype, "t", void 0);
__decorate([
    SyncWithStore()
], RtkDebuggerToggle$1.prototype, "iconPack", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-debugger-toggle", "rtk-controlbar-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-debugger-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkDebuggerToggle$1);
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

const RtkDebuggerToggle = RtkDebuggerToggle$1;
const defineCustomElement = defineCustomElement$1;

export { RtkDebuggerToggle, defineCustomElement };
