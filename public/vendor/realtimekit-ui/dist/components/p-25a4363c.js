import { p as proxyCustomElement, H, h } from './p-c3592601.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkEmojiPickerButtonCss = ":host{}";
const RtkEmojiPickerButtonStyle0 = rtkEmojiPickerButtonCss;

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
const RtkEmojiPickerButton = /*@__PURE__*/ proxyCustomElement(class RtkEmojiPickerButton extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    render() {
        return (h("rtk-tooltip", { key: '9826128cb78d2cb79a21b4dcb877ecc1ab020090', label: this.t('chat.send_emoji') }, h("rtk-button", { key: '07fd6bcc6ffdb58278c843748f771a2597f8edcd', variant: "ghost", kind: "icon", class: { active: this.isActive }, title: this.t('chat.send_emoji') }, h("rtk-icon", { key: '30f352d18771bd542d9ca4ff1a4615ef5958ec7d', icon: this.iconPack.emoji_multiple }))));
    }
    static get style() { return RtkEmojiPickerButtonStyle0; }
}, [1, "rtk-emoji-picker-button", {
        "iconPack": [16],
        "t": [16],
        "isActive": [4, "is-active"]
    }]);
__decorate([
    SyncWithStore()
], RtkEmojiPickerButton.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkEmojiPickerButton.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-emoji-picker-button", "rtk-button", "rtk-icon", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-emoji-picker-button":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkEmojiPickerButton);
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

export { RtkEmojiPickerButton as R, defineCustomElement as d };
