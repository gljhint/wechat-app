import { p as proxyCustomElement, H, d as createEvent, h } from './p-c3592601.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkFilePickerButtonCss = ":host{}";
const RtkFilePickerButtonStyle0 = rtkFilePickerButtonCss;

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
const RtkFilePickerButton = /*@__PURE__*/ proxyCustomElement(class RtkFilePickerButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onFileChange = createEvent(this, "fileChange", 7);
        /** Icon */
        this.icon = 'attach';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.uploadFile = () => {
            const input = this.fileInputField;
            input.type = 'file';
            if (this.filter) {
                input.accept = this.filter;
            }
            input.onchange = (e) => {
                const { validity, files: [file], } = e.target;
                if (validity.valid) {
                    this.onFileChange.emit(file);
                }
            };
            input.click();
        };
    }
    connectedCallback() {
        this.fileInputField = document.createElement('input');
    }
    disconnectedCallback() {
        // For GC
        this.fileInputField = undefined;
    }
    render() {
        const label = this.label || this.t('chat.send_file');
        const icon = this.iconPack[this.icon];
        return (h("rtk-tooltip", { key: '90e405f39792f7ea0430c55e9b5ba0da72ce2a4a', label: label }, h("rtk-button", { key: 'f0957e7a9668afd9e25e866ea2acbb6891123bbe', variant: "ghost", kind: "icon", onClick: () => this.uploadFile(), title: label }, h("rtk-icon", { key: '1955f524343683974831b28629291428637aa8fc', icon: icon }))));
    }
    static get style() { return RtkFilePickerButtonStyle0; }
}, [1, "rtk-file-picker-button", {
        "filter": [1],
        "label": [1],
        "icon": [1],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkFilePickerButton.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkFilePickerButton.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-file-picker-button", "rtk-button", "rtk-icon", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-file-picker-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkFilePickerButton);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkFilePickerButton as R, defineCustomElement as d };
