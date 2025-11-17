import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkStageCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block;position:relative;overflow:hidden}";
const RtkStageStyle0 = rtkStageCss;

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
const RtkStage$1 = /*@__PURE__*/ proxyCustomElement(class RtkStage extends H {
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
    render() {
        return (h(Host, { key: 'b0f0bb2c16e9965cc7f646624118a8cee13538a5' }, h("slot", { key: '9555e0c26d9ab23b6fb02e1e1d4025eaaf6df704' })));
    }
    static get style() { return RtkStageStyle0; }
}, [1, "rtk-stage", {
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkStage$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkStage$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-stage"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-stage":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkStage$1);
            }
            break;
    } });
}
defineCustomElement$1();

const RtkStage = RtkStage$1;
const defineCustomElement = defineCustomElement$1;

export { RtkStage, defineCustomElement };
