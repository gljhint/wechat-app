import { r as registerInstance, c as createEvent, h, H as Host } from './index-c1fb98bb.js';
import { e as defaultIconPack, h as useLanguage } from './ui-store-0098d5c6.js';
import { S as SyncWithStore } from './index-914449da.js';

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
const RtkStage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    render() {
        return (h(Host, { key: 'b0f0bb2c16e9965cc7f646624118a8cee13538a5' }, h("slot", { key: '9555e0c26d9ab23b6fb02e1e1d4025eaaf6df704' })));
    }
};
__decorate([
    SyncWithStore()
], RtkStage.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkStage.prototype, "t", void 0);
RtkStage.style = RtkStageStyle0;

export { RtkStage as rtk_stage };
