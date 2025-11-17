import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkCounterCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;flex-direction:row;align-items:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));width:-moz-fit-content;width:fit-content;border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-1, 4px)}p{margin:var(--rtk-space-0, 0px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px)}input{margin:var(--rtk-space-0, 0px);width:var(--rtk-space-6, 24px);padding:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-sm, 1px);border-style:solid;border-color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));text-align:center;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));border-radius:var(--rtk-border-radius-sm, 4px);font-size:16px;outline:2px solid transparent;outline-offset:2px;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{margin:var(--rtk-space-0, 0px);appearance:none;-webkit-appearance:none}input[type='number']{-moz-appearance:textfield}";
const RtkCounterStyle0 = rtkCounterCss;

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
const RtkCounter = /*@__PURE__*/ proxyCustomElement(class RtkCounter extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onChange = createEvent(this, "valueChange", 7);
        /** Input */
        this.input = '1';
        /** Minimum value */
        this.minValue = 0;
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    connectedCallback() {
        this.watchStateHandler(this.input);
        this.input = this.value.toString();
    }
    watchStateHandler(input) {
        this.onChange.emit(input);
    }
    increment() {
        this.input = Math.max(parseInt(this.input) + 1, this.minValue).toString();
    }
    decrement() {
        this.input = Math.max(this.minValue, parseInt(this.input) - 1).toString();
    }
    render() {
        return (h(Host, { key: '151ffb29ae91788d05b46f4c795b817c20a35b90' }, h("rtk-button", { key: '9568cb52875c92f57597033cc7b396fa5c2d0371', kind: "icon", variant: "ghost", onClick: () => this.decrement() }, h("rtk-icon", { key: '8ef248b64e90f01bd1f78db5048db148d7c374c9', icon: this.iconPack.subtract })), h("input", { key: '376d604bb62a6c9013e7361da51de8f05f34c870', type: "number", value: this.input, min: this.minValue, onInput: (e) => {
                const val = parseInt(e.target.value, 10);
                if (isNaN(val) || val < this.minValue) {
                    this.input = this.minValue.toString();
                }
                else {
                    this.input = val.toString();
                }
            } }), h("rtk-button", { key: 'cea8491840c69cf3856e97d97b5c4f34abf45e55', kind: "icon", variant: "ghost", onClick: () => this.increment() }, h("rtk-icon", { key: 'cb2146960e8c8368cce69fb8d8a696078bcea2fc', icon: this.iconPack.add }))));
    }
    static get watchers() { return {
        "input": ["watchStateHandler"]
    }; }
    static get style() { return RtkCounterStyle0; }
}, [1, "rtk-counter", {
        "size": [513],
        "value": [2],
        "minValue": [2, "min-value"],
        "iconPack": [16],
        "t": [16],
        "input": [32]
    }, undefined, {
        "input": ["watchStateHandler"]
    }]);
__decorate([
    SyncWithStore()
], RtkCounter.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkCounter.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-counter", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-counter":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkCounter);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
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

export { RtkCounter as R, defineCustomElement as d };
