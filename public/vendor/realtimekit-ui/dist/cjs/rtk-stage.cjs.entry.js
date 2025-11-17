'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');

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
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'b0f0bb2c16e9965cc7f646624118a8cee13538a5' }, index$1.h("slot", { key: '9555e0c26d9ab23b6fb02e1e1d4025eaaf6df704' })));
    }
};
__decorate([
    index.SyncWithStore()
], RtkStage.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkStage.prototype, "t", void 0);
RtkStage.style = RtkStageStyle0;

exports.rtk_stage = RtkStage;
