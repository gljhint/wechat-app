import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$c } from './p-4e9d44f6.js';
import { d as defineCustomElement$b } from './p-1391bef0.js';
import { d as defineCustomElement$a } from './p-f5c29229.js';
import { d as defineCustomElement$9 } from './p-63b4ff6e.js';
import { d as defineCustomElement$8 } from './p-3b29dda1.js';
import { d as defineCustomElement$7 } from './p-4a792ea5.js';
import { d as defineCustomElement$6 } from './p-919e71b8.js';
import { d as defineCustomElement$5 } from './p-5205ea87.js';
import { d as defineCustomElement$4 } from './p-a9d80b81.js';
import { d as defineCustomElement$3 } from './p-ff8e5929.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';
import { d as defineCustomElement$1 } from './p-317b41b0.js';

const rtkChatSearchResultsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:100%;flex-direction:column;position:relative;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}";
const RtkChatSearchResultsStyle0 = rtkChatSearchResultsCss;

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
const RtkChatSearchResults = /*@__PURE__*/ proxyCustomElement(class RtkChatSearchResults extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.pageSize = 50;
        this.searchMessages = async (timestamp, size, reversed) => {
            return this.meeting.chat.searchMessages(this.query, {
                channelId: this.channelId,
                timestamp,
                size,
                reversed,
            });
        };
        this.nodeRenderer = (messages) => {
            return messages.map((message) => (h("rtk-chat-message", { key: message.id, message: message, disableControls: true })));
        };
    }
    render() {
        return (h(Host, { key: '9947c793cb766158d4ed3d81871bbdb8b60274af' }, h("rtk-paginated-list", { key: '0d91dc8818b08c7ed053728074c483f159811a41', pageSize: this.pageSize, pagesAllowed: 3, fetchData: this.searchMessages, createNodes: this.nodeRenderer, selectedItemId: this.query })));
    }
    static get style() { return RtkChatSearchResultsStyle0; }
}, [1, "rtk-chat-search-results", {
        "meeting": [16],
        "query": [1],
        "channelId": [1, "channel-id"],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkChatSearchResults.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkChatSearchResults.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChatSearchResults.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-chat-search-results", "rtk-avatar", "rtk-button", "rtk-chat-message", "rtk-file-message", "rtk-icon", "rtk-image-message", "rtk-menu", "rtk-menu-item", "rtk-menu-list", "rtk-paginated-list", "rtk-spinner", "rtk-text-message"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-chat-search-results":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChatSearchResults);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "rtk-chat-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "rtk-file-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "rtk-image-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "rtk-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-menu-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-paginated-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-text-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkChatSearchResults as R, defineCustomElement as d };
