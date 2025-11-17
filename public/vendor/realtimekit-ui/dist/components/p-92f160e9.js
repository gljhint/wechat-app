import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkBroadcastMessageModalCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:var(--rtk-border-radius-md, 8px);padding:var(--rtk-space-4, 16px);width:100%;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));width:400px;max-width:80%}.content-col{display:flex;width:100%;flex-direction:column}h2{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-2, 8px)}.content-row{display:flex;width:100%;flex-direction:row}.content-row rtk-button{margin-top:var(--rtk-space-4, 16px);width:100%}textarea{margin-top:var(--rtk-space-3, 12px);resize:none;border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;font-family:var(--rtk-font-family, sans-serif);outline:2px solid transparent;outline-offset:2px;height:var(--rtk-space-16, 64px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--rtk-space-2, 8px);color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}textarea::-moz-placeholder{color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}textarea::placeholder{color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}select{border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;padding-top:var(--rtk-space-3, 12px);padding-bottom:var(--rtk-space-3, 12px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);outline:2px solid transparent;outline-offset:2px;border-right-width:var(--rtk-border-width-md, 2px);border-style:solid;border-color:transparent;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}p{margin:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-2, 8px);width:100%;text-align:center;font-size:14px;--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));display:flex;flex-direction:row;align-items:center;justify-content:center}p rtk-icon{margin-left:var(--rtk-space-1, 4px);height:var(--rtk-space-5, 20px)}";
const RtkBroadcastMessageModalStyle0 = rtkBroadcastMessageModalCss;

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
const RtkBroadcastMessageModal = /*@__PURE__*/ proxyCustomElement(class RtkBroadcastMessageModal extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Broadcast message state */
        this.messagePayload = {
            to: 'Everyone',
            message: '',
        };
        this.successMessage = false;
    }
    close() {
        var _a;
        (_a = this.stateUpdate) === null || _a === void 0 ? void 0 : _a.emit({ activeBroadcastMessageModal: false });
    }
    sendMessage() {
        // TODO:(ishita1805) Send this.messagePayload to webcore.
        this.successMessage = true;
        setTimeout(() => {
            this.close();
        }, 2000);
    }
    render() {
        return (h(Host, { key: '4d23ce819f004fd0e14a4c9062e21f1321c46495' }, h("div", { key: 'f0814536068dd268c1aec9d80c45cc6817fe184b', class: "content-col" }, h("h2", { key: '5b0caef4e9f93d1a18c7bba8a269f10d95f5d290' }, "Broadcast message to"), h("select", { key: '8f32291fa522cf7a5947caf54178327e1574f103', onChange: (e) => {
                this.messagePayload = Object.assign(Object.assign({}, this.messagePayload), { to: e.target.value });
            } }, h("option", { key: 'b09bb9b952ade48788bf8ab15645a1a45dab6935' }, "Everyone"), h("option", { key: '177d1af8eaeaa77393a9b2e477fca32563c05290' }, "List of rooms")), h("textarea", { key: 'b592528751cb63fa8c107b2b63455bfed0b3f3cb', placeholder: "Type message here...", onInput: (e) => {
                this.messagePayload = Object.assign(Object.assign({}, this.messagePayload), { message: e.target.value });
            } }), this.successMessage ? (h("p", null, "Message sent to ", this.messagePayload.to, h("rtk-icon", { icon: this.iconPack.checkmark }))) : (h("div", { class: "content-row" }, h("rtk-button", { onClick: () => this.close(), variant: "secondary" }, "Cancel"), "\u2002", h("rtk-button", { variant: "primary", onClick: () => this.sendMessage() }, "Send"))))));
    }
    static get style() { return RtkBroadcastMessageModalStyle0; }
}, [1, "rtk-broadcast-message-modal", {
        "meeting": [16],
        "states": [16],
        "iconPack": [16],
        "t": [16],
        "messagePayload": [32],
        "successMessage": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkBroadcastMessageModal.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkBroadcastMessageModal.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkBroadcastMessageModal.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkBroadcastMessageModal.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-broadcast-message-modal", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-broadcast-message-modal":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkBroadcastMessageModal);
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

export { RtkBroadcastMessageModal as R, defineCustomElement as d };
