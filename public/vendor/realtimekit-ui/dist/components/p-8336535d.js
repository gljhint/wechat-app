import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { h as useLanguage, e as defaultIconPack } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$3 } from './p-4e9d44f6.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-a59a9c97.js';

const rtkChannelDetailsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;flex-direction:column;width:var(--rtk-space-72, 288px);padding-top:var(--rtk-space-5, 20px);padding-bottom:var(--rtk-space-5, 20px);padding-left:var(--rtk-space-8, 32px);padding-right:var(--rtk-space-8, 32px)}header{font-size:20px}rtk-spinner{margin-top:var(--rtk-space-10, 40px);margin-bottom:var(--rtk-space-10, 40px);margin-left:auto;margin-right:auto}ul{margin-left:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-6, 24px);margin-bottom:var(--rtk-space-4, 16px);height:var(--rtk-space-48, 192px);padding:var(--rtk-space-0, 0px);overflow-y:auto;list-style-type:none;display:flex;flex-direction:column;gap:var(--rtk-space-2, 8px)}ul li{margin-right:var(--rtk-space-2, 8px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px);padding:var(--rtk-space-2, 8px);cursor:pointer;border-radius:var(--rtk-border-radius-sm, 4px)}ul li:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}ul li rtk-avatar{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}";
const RtkChannelDetailsStyle0 = rtkChannelDetailsCss;

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
const RtkChannelDetails = /*@__PURE__*/ proxyCustomElement(class RtkChannelDetails extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Language */
        this.t = useLanguage();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** List of channel members */
        this.members = [];
    }
    renderMembers() {
        return (h("ul", { class: "scrollbar" }, this.members.map((member) => {
            return (h("li", null, h("rtk-avatar", { participant: { name: member.name, picture: member.picture }, size: "sm" }), h("span", null, member.name)));
        })));
    }
    render() {
        return (h(Host, { key: 'cc8b22dae541a200e63d0d6b286f7ad380a53f09' }, h("header", { key: 'e481f5db77f40f53cac0c6aeae28752ddab505cb' }, this.t('chat.channel_members')), this.renderMembers()));
    }
    static get style() { return RtkChannelDetailsStyle0; }
}, [1, "rtk-channel-details", {
        "channel": [16],
        "t": [16],
        "iconPack": [16],
        "members": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkChannelDetails.prototype, "t", void 0);
__decorate([
    SyncWithStore()
], RtkChannelDetails.prototype, "iconPack", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-channel-details", "rtk-avatar", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-channel-details":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChannelDetails);
            }
            break;
        case "rtk-avatar":
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

export { RtkChannelDetails as R, defineCustomElement as d };
