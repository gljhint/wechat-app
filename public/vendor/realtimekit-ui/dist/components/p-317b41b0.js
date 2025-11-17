import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { h as hasOnlyEmojis } from './p-338c7261.js';
import { C as ChatHead } from './p-febe3ebc.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { T as TextMessageView } from './p-a2f4f9e3.js';

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
const RtkTextMessage = /*@__PURE__*/ proxyCustomElement(class RtkTextMessage extends H {
    constructor() {
        super();
        this.__registerHost();
        /** Date object of now, to calculate distance between dates */
        this.now = new Date();
        /** Whether the message is continued by same user */
        this.isContinued = false;
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** show message in bubble */
        this.showBubble = false;
    }
    render() {
        return (h(Host, { key: '74b8d7a70a5960c4350061055ded0fa8838084ae' }, !this.isContinued && (h(ChatHead, { key: 'c0819a75eb645eff5ac6ccd7bdb54e7dbdce9876', name: this.message.displayName, time: this.message.time, now: this.now })), h("div", { key: 'f06fbf9a9e4680cc426c183d9ee09bfad452a5ad', class: {
                body: true,
                bubble: this.showBubble,
            }, part: "body" }, h("div", { key: '2755f1cefa98695843569934c414d6b2fbf158e5', class: { text: true, emoji: hasOnlyEmojis(this.message.message) } }, h(TextMessageView, { key: '52e0ae4b7710d970cb1915fc4059abef212b12fd', message: this.message.message })))));
    }
}, [0, "rtk-text-message", {
        "message": [16],
        "now": [16],
        "isContinued": [516, "is-continued"],
        "iconPack": [16],
        "t": [16],
        "showBubble": [4, "show-bubble"]
    }]);
__decorate([
    SyncWithStore()
], RtkTextMessage.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkTextMessage.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-text-message"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-text-message":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkTextMessage);
            }
            break;
    } });
}
defineCustomElement();

export { RtkTextMessage as R, defineCustomElement as d };
