import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { C as ChatHead } from './p-febe3ebc.js';
import { a as sanitizeLink } from './p-338c7261.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { d as downloadFile } from './p-9fc565cf.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-a59a9c97.js';

const rtkImageMessageCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.image-spinner{cursor:wait}.image-errored{cursor:not-allowed}";
const RtkImageMessageStyle0 = rtkImageMessageCss;

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
const RtkImageMessage = /*@__PURE__*/ proxyCustomElement(class RtkImageMessage extends H {
    constructor() {
        super();
        this.__registerHost();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
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
        this.status = 'loading';
    }
    render() {
        return (h(Host, { key: '7e0fc95aff5f4db94f4ec0ba3c4dcd4d2ee9ffa6' }, !this.isContinued && (h(ChatHead, { key: 'cc7f214502f49fe2869f3e9bdfd797926987ef74', name: this.message.displayName, time: this.message.time, now: this.now })), h("div", { key: '2e61a7320c1941df7c0d13082a9257e47ec5df58', class: {
                body: true,
                bubble: this.showBubble,
            }, part: "body" }, h("div", { key: 'bf2eec18c82aae79f31c40d44711ec7db2ab5bf1', class: { image: true, loaded: this.status === 'loaded' } }, h("img", { key: 'acb8f5ef169bd0c663dbc74c1d43b4186f81004a', src: sanitizeLink(this.message.link), onLoad: () => {
                this.status = 'loaded';
            }, onError: () => {
                this.status = 'errored';
            }, onClick: () => {
                if (this.status === 'loaded') {
                    this.stateUpdate.emit({ image: this.message });
                }
            } }), this.status === 'loading' && (h("div", { key: '92a6610a937088e03200f9048146da0e4f749054', class: "image-spinner", title: this.t('chat.img.loading'), "aria-label": this.t('chat.img.loading') }, h("rtk-spinner", { key: 'b85fa3e9dd0580f1d7e18360e74670a933e74367', iconPack: this.iconPack }))), this.status === 'errored' && (h("div", { key: 'b1046aff30dfe244498c957799f33c3a7c26ecb8', class: "image-errored", title: this.t('chat.error.img_not_found'), "aria-label": this.t('chat.error.img_not_found') }, h("rtk-icon", { key: '833e3ea7f7734a17450c98077e52b9db4fb5404a', icon: this.iconPack.image_off }))), this.status === 'loaded' && (h("div", { key: '2545e3685f6e586b4fdc1304da08bbece5ec2cda', class: "actions" }, h("rtk-button", { key: 'bb5e37862d82702f6350f48c275100825dd494fa', class: "action", variant: "secondary", kind: "icon", onClick: () => {
                this.stateUpdate.emit({ image: this.message });
            } }, h("rtk-icon", { key: '247f754dfe4c9b63634906105a71bb2146154eaa', icon: this.iconPack.full_screen_maximize })), h("rtk-button", { key: 'ab2712266ddce6f79abf1fca68379abcb4a3c9a1', class: "action", variant: "secondary", kind: "icon", onClick: () => downloadFile(this.message.link, { fallbackName: 'image' }) }, h("rtk-icon", { key: 'ffafa0e22d7752b125d0e1e50cfc03d858d29365', icon: this.iconPack.download }))))))));
    }
    static get style() { return RtkImageMessageStyle0; }
}, [0, "rtk-image-message", {
        "message": [16],
        "now": [16],
        "isContinued": [516, "is-continued"],
        "iconPack": [16],
        "t": [16],
        "showBubble": [4, "show-bubble"],
        "status": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkImageMessage.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkImageMessage.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-image-message", "rtk-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-image-message":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkImageMessage);
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
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkImageMessage as R, defineCustomElement as d };
