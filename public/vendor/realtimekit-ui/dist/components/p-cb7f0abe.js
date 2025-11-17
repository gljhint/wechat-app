import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$7 } from './p-4e9d44f6.js';
import { d as defineCustomElement$6 } from './p-1391bef0.js';
import { d as defineCustomElement$5 } from './p-8336535d.js';
import { d as defineCustomElement$4 } from './p-dc9eb0c2.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkChannelHeaderCss = "header{box-sizing:border-box;height:var(--rtk-space-16, 64px);width:100%;padding:var(--rtk-space-4, 16px);display:flex;justify-content:space-between;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));border-left-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-border-opacity))}header.searching{justify-content:flex-end}header.searching .channel-details{display:none}header .channel-details{display:flex;flex-grow:1;flex-direction:column;justify-content:center;height:var(--rtk-space-9, 36px);width:var(--rtk-space-1, 4px)}header .channel-details .name{font-weight:500}header .channel-details .members{margin-top:var(--rtk-space-0\\.5, 2px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}header .channel-tools{display:flex;flex-shrink:0;justify-content:flex-end;gap:var(--rtk-space-1, 4px);min-width:var(--rtk-space-24, 96px)}header .channel-tools rtk-tooltip{height:var(--rtk-space-8, 32px);width:var(--rtk-space-10, 40px);display:flex}header .search-input{height:var(--rtk-space-8, 32px);width:var(--rtk-space-48, 192px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}header .name{font-size:16px}header .br-primary-btn{background-color:transparent}header .br-primary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}@media (orientation: landscape) and (min-width: 400px){header.searching .channel-details{display:flex}}.back-btn{margin-right:var(--rtk-space-3, 12px)}";
const RtkChannelHeaderStyle0 = rtkChannelHeaderCss;

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
const RtkChannelHeader = /*@__PURE__*/ proxyCustomElement(class RtkChannelHeader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.search = createEvent(this, "search", 7);
        this.searchDismissed = createEvent(this, "searchDismissed", 7);
        this.back = createEvent(this, "back", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.showChannelDetailsDialog = false;
        this.showSearchBar = false;
        this.members = [];
        /** Show back button */
        this.showBackButton = false;
    }
    onChannelChanged() {
        if (this.$searchInput)
            this.$searchInput.value = '';
        this.showSearchBar = false;
        if (!this.channel.isDirectMessage) {
            this.meeting.chat.getChannelMembers(this.channel.id).then((members) => {
                this.members = members;
            });
        }
    }
    connectedCallback() {
        this.onChannelChanged();
    }
    renderChannelDetails() {
        return (h("rtk-dialog", { open: true, onRtkDialogClose: () => {
                this.showChannelDetailsDialog = false;
            }, iconPack: this.iconPack, t: this.t }, h("rtk-channel-details", { members: this.members, channel: this.channel })));
    }
    render() {
        if (!this.channel) {
            return null;
        }
        return (h(Host, null, this.showChannelDetailsDialog && this.renderChannelDetails(), h("header", { class: {
                searching: this.showSearchBar,
            } }, this.showBackButton && (h("rtk-button", { kind: "icon", variant: "secondary", class: "back-btn", onClick: () => {
                this.back.emit();
            } }, h("rtk-icon", { icon: this.iconPack.chevron_left }))), h("div", { class: "channel-details" }, h("span", { class: "name" }, this.channel.displayName), !this.channel.isDirectMessage && (h("span", { class: "members" }, this.members.map((member) => member.name).join(', ')))), h("div", { class: "channel-tools" }, !this.channel.isDirectMessage && (h("rtk-tooltip", { label: this.t('chat.channel_members'), variant: "primary" }, h("rtk-button", { kind: "button", variant: "secondary", size: "md", onClick: () => {
                this.showChannelDetailsDialog = !this.showChannelDetailsDialog;
            }, class: "br-primary-btn" }, h("rtk-icon", { icon: this.iconPack.people }))))))));
    }
    static get watchers() { return {
        "channel": ["onChannelChanged"]
    }; }
    static get style() { return RtkChannelHeaderStyle0; }
}, [0, "rtk-channel-header", {
        "meeting": [16],
        "channel": [16],
        "iconPack": [16],
        "t": [16],
        "showBackButton": [4, "show-back-button"],
        "showChannelDetailsDialog": [32],
        "showSearchBar": [32],
        "members": [32]
    }, undefined, {
        "channel": ["onChannelChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkChannelHeader.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkChannelHeader.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChannelHeader.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-channel-header", "rtk-avatar", "rtk-button", "rtk-channel-details", "rtk-dialog", "rtk-icon", "rtk-spinner", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-channel-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChannelHeader);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-channel-details":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-spinner":
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

export { RtkChannelHeader as R, defineCustomElement as d };
