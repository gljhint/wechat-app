'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const index = require('./index-77d3cd4a.js');
const uiStore = require('./ui-store-4edab2a5.js');

const rtkInformationTooltipCss = ":host{margin-left:var(--rtk-space-2, 8px);margin-right:var(--rtk-space-2, 8px);cursor:pointer}.tooltip-container{position:relative;display:flex;flex-direction:row;align-items:center}.tooltip-container rtk-icon{cursor:pointer;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.tooltip-container rtk-icon:hover+.tooltip{display:flex !important}.tooltip{position:absolute;margin-left:var(--rtk-space-2, 8px);display:none !important;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--rtk-space-2, 8px);font-weight:400;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));z-index:50;display:flex;min-width:var(--rtk-space-60, 240px);flex-direction:column;--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);left:14px}";
const RtkInformationTooltipStyle0 = rtkInformationTooltipCss;

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
const RtkInformationTooltip = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
    }
    render() {
        return (index$1.h(index$1.Host, { key: '71ecafbad168eb980530eb5e524f9b243ac49fc7' }, index$1.h("div", { key: 'beb675be20de89080d7fdeefb47367c5ab201a73', class: "tooltip-container" }, index$1.h("rtk-icon", { key: '8e135030eb60115c1f2a49ad71caedbd9e1b50e8', icon: this.iconPack.info, size: "sm" }), index$1.h("div", { key: '9b4c277f0d2c9311258c24f1001bf763936adde3', class: "tooltip" }, index$1.h("slot", { key: '66c6b7895cd23271cca393cc12dc075c1bf14923', name: "tootlip-text" })))));
    }
};
__decorate([
    index.SyncWithStore()
], RtkInformationTooltip.prototype, "iconPack", void 0);
RtkInformationTooltip.style = RtkInformationTooltipStyle0;

exports.rtk_information_tooltip = RtkInformationTooltip;
