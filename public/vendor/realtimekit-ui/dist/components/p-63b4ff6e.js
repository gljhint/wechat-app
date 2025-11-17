import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { C as ChatHead } from './p-febe3ebc.js';
import { a as sanitizeLink } from './p-338c7261.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { g as getExtension, a as getFileSize, d as downloadFile } from './p-9fc565cf.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

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
const RtkFileMessage = /*@__PURE__*/ proxyCustomElement(class RtkFileMessage extends H {
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
        const link = sanitizeLink(this.message.link);
        return (h(Host, { key: '771fc8ccb2700a3fba83f04676a0c4396c1a8a41' }, !this.isContinued && (h(ChatHead, { key: 'ef2d83897dcae870bb7a2b0eeef397585b873b77', name: this.message.displayName, time: this.message.time, now: this.now })), h("div", { key: '841039fcad32f254653bd490a98f268479345b44', class: {
                body: true,
                bubble: this.showBubble,
            }, part: "body" }, h("div", { key: '65e3c8aafa4e9fa55a24264685bb0cf20841048a', class: "file" }, h("div", { key: '1b1e97b1518c5471964ea91889f4500fc0e01e03', class: "file-data" }, h("div", { key: 'ff9d3071b528162f6e796ccb49e2472df2e8d364', class: "name" }, this.message.name), h("div", { key: '1d3ccb1f5bc2a94983de216e77a8ebc0ae07d669', class: "file-data-split" }, h("div", { key: 'ebab32b642e097b3c1c1903269a8d76fbd586f5c', class: "ext" }, getExtension(this.message.name)), h("span", { key: '81ee3600ba18a7689706504befebcf02697a56e7', class: "divider" }), h("div", { key: 'e969a8d6221d8af560a26510c38a92406a18ef2a', class: "size" }, getFileSize(this.message.size)))), h("rtk-button", { key: '482c27659f71cfebf9f88fdf538e32baa6b87073', variant: "secondary", kind: "icon", onClick: () => downloadFile(link, { name: this.message.name, fallbackName: 'file' }), part: "button" }, h("rtk-icon", { key: '4efaeb927b4ea2010eed09227eb7f511b9253017', icon: this.iconPack.download }))))));
    }
}, [0, "rtk-file-message", {
        "message": [16],
        "now": [16],
        "isContinued": [516, "is-continued"],
        "iconPack": [16],
        "t": [16],
        "showBubble": [4, "show-bubble"]
    }]);
__decorate([
    SyncWithStore()
], RtkFileMessage.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkFileMessage.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-file-message", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-file-message":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkFileMessage);
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

export { RtkFileMessage as R, defineCustomElement as d };
