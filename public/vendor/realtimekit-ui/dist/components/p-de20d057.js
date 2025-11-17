import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { f as formatDateTime, e as elapsedDuration } from './p-382270d8.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { e as defaultIconPack } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { d as defineCustomElement$6 } from './p-4e9d44f6.js';
import { d as defineCustomElement$5 } from './p-3b29dda1.js';
import { d as defineCustomElement$4 } from './p-919e71b8.js';
import { d as defineCustomElement$3 } from './p-5205ea87.js';
import { d as defineCustomElement$2 } from './p-a9d80b81.js';
import { d as defineCustomElement$1 } from './p-a59a9c97.js';

const rtkMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.message-wrapper{display:flex;flex-direction:row-reverse;gap:var(--rtk-space-2, 8px)}.message-wrapper.incoming{flex-direction:row}.message{display:flex;flex-direction:column}.header{margin-bottom:var(--rtk-space-1, 4px);align-self:flex-end;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));font-size:14px;font-weight:600}.incoming .header{align-self:flex-start}.body{display:flex;flex-direction:column;min-width:var(--rtk-space-24, 96px);font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));font-size:14px;line-height:1.375;position:relative}.body .metadata{margin-top:var(--rtk-space-2, 8px);align-self:flex-end;font-size:10px}.bubble{max-width:var(--rtk-space-96, 384px);padding:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));border-radius:var(--rtk-border-radius-md, 8px)}.incoming .bubble{width:-moz-fit-content;width:fit-content;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.avatar{display:none}rtk-menu{position:absolute;right:var(--rtk-space-0, 0px);top:var(--rtk-space-0, 0px);border-radius:var(--rtk-border-radius-lg, 12px)}rtk-menu rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);cursor:pointer}.actions{display:flex;align-items:center;justify-content:center;padding-left:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1, 4px);padding-right:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-md, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;background:radial-gradient(\n    at top right,\n    rgb(var(--rtk-colors-brand-300, 73 124 253)) 60%,\n    rgba(255, 255, 255, 0) 80%\n  )}.actions rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.incoming .actions{background:radial-gradient(\n      at top right,\n      rgb(var(--rtk-colors-background-800, 30 30 30)) 60%,\n      rgba(255, 255, 255, 0) 80%\n    )}.incoming .actions rtk-icon{color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.incoming rtk-avatar{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}@media (min-width: 400px){.avatar{display:flex;width:var(--rtk-space-6, 24px)}.avatar rtk-avatar{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);font-size:10px;overflow:clip;border-radius:9999px}}@media (hover: hover){rtk-menu{visibility:hidden}.body:hover rtk-menu{visibility:visible}}";
const RtkMessageViewStyle0 = rtkMessageViewCss;

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
const RtkMessageView = /*@__PURE__*/ proxyCustomElement(class RtkMessageView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onAction = createEvent(this, "action", 7);
        /** List of actions to show in menu */
        this.actions = [];
        /** Appearance */
        this.variant = 'bubble';
        /** Render */
        this.viewType = 'outgoing';
        /** Hides avatar */
        this.hideAvatar = false;
        /** Hides author display label */
        this.hideAuthorName = false;
        /** Hides metadata (time) */
        this.hideMetadata = false;
        /** Icon pack */
        this.iconPack = defaultIconPack;
    }
    renderActions() {
        return (h("rtk-menu", { placement: "top-end", offset: 1 }, h("button", { slot: "trigger", class: "actions" }, h("rtk-icon", { icon: this.iconPack.chevron_down })), h("rtk-menu-list", null, this.actions.map((action) => (h("rtk-menu-item", { onClick: () => this.onAction.emit(action.id) }, action.icon && h("rtk-icon", { icon: action.icon, slot: "start" }), action.label))))));
    }
    render() {
        return (h(Host, { key: '9fafe4370eee525631023ecde39b3293059e8c22' }, h("div", { key: '1718981905d4458d0862c34c3c342f7335f0921b', class: { 'message-wrapper': true, [this.viewType]: true } }, !this.hideAvatar && (h("aside", { key: 'c6ea0c46283a7faa4bb937cb4196e2e1d548c721', class: "avatar", part: "avatar" }, h("rtk-avatar", { key: 'e3181a831b75b5c79f212da64076dbf6b47fecca', participant: { name: this.authorName, picture: this.avatarUrl }, size: "sm" }))), h("div", { key: '5565b5711055f1cd543cfaa36c03789b82fb94fa', class: "message", part: "message" }, !this.hideAuthorName && h("div", { key: '613098d825ba1c33aaca53579c883a306ed1239d', class: "header" }, this.authorName), h("div", { key: '166dd3e4fb33876cd74f94a7ac193064e8778f81', class: { body: true, bubble: this.variant === 'bubble' } }, h("slot", { key: 'd04e722b66c4d7cb7c20952a9e7c70d048e66410' }), !this.hideMetadata && !!this.time && (h("div", { key: 'f12d8c9dd8320202a6906c10298d3357aff5d762', class: "metadata", title: formatDateTime(this.time) }, elapsedDuration(this.time, new Date(Date.now())))), this.actions.length !== 0 && this.renderActions())))));
    }
    static get style() { return RtkMessageViewStyle0; }
}, [1, "rtk-message-view", {
        "actions": [16],
        "variant": [1],
        "viewType": [1, "view-type"],
        "avatarUrl": [1, "avatar-url"],
        "hideAvatar": [4, "hide-avatar"],
        "authorName": [1, "author-name"],
        "hideAuthorName": [4, "hide-author-name"],
        "hideMetadata": [4, "hide-metadata"],
        "time": [16],
        "iconPack": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkMessageView.prototype, "iconPack", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-message-view", "rtk-avatar", "rtk-icon", "rtk-menu", "rtk-menu-item", "rtk-menu-list", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-message-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMessageView);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-menu-list":
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

export { RtkMessageView as R, defineCustomElement as d };
