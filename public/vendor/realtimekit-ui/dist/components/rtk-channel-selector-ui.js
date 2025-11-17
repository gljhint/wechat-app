import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { T as TextMessageView } from './p-a2f4f9e3.js';
import { d as defineCustomElement$5 } from './p-4e9d44f6.js';
import { d as defineCustomElement$4 } from './p-1391bef0.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkChannelSelectorUiCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{display:flex}.container{display:flex;height:100%;width:var(--rtk-space-96, 384px);flex-direction:column;position:absolute;--tw-translate-x:calc(var(--rtk-space-96, 384px) * -1);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-top-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-sm, 1px);border-left-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-right-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-border-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}@keyframes fade{0%{opacity:0}100%{opacity:1}}.overlay-container{width:100vw;--tw-translate-x:var(--rtk-space-96, 384px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;animation:fade 0.8s}.overlay-container .sidebar-btn{position:static;padding:var(--rtk-space-4, 16px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.sidebar-btn{position:absolute;right:calc(var(--rtk-space-9, 36px) * -1);top:var(--rtk-space-4, 16px);height:var(--rtk-space-8, 32px);width:var(--rtk-space-7, 28px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-radius:var(--rtk-border-radius-sm, 4px)}@media (orientation: landscape) and (min-width: 400px){.container{position:static;--tw-translate-x:var(--rtk-space-0, 0px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sidebar-btn,.overlay-container{display:none}}.search-wrapper{display:flex;align-items:center;gap:var(--rtk-space-2, 8px);padding:var(--rtk-space-2, 8px);border-left-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-border-opacity))}.search{position:sticky;box-sizing:border-box;display:flex;align-items:center;border-radius:var(--rtk-border-radius-sm, 4px);margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);height:var(--rtk-space-8, 32px);width:100%}.search .search-icon{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);padding:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));border-top-right-radius:var(--rtk-border-radius-sm, 4px);border-bottom-right-radius:var(--rtk-border-radius-sm, 4px)}.search input{box-sizing:border-box;width:100%;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);padding-left:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;font-size:14px;line-height:1.25rem}.search input::-moz-placeholder{color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.search input::placeholder{color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.search input{border-top-left-radius:var(--rtk-border-radius-sm, 4px);border-bottom-left-radius:var(--rtk-border-radius-sm, 4px)}.channel-container{box-sizing:border-box;display:flex;flex-direction:column;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);overflow-y:scroll}.channel-container .channel{display:flex;align-items:center;justify-content:space-between;gap:var(--rtk-space-2, 8px);padding:var(--rtk-space-0, 0px);border-left-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-border-opacity))}.channel-container .channel:hover{cursor:pointer;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-900, var(--rtk-colors-text-900, 255 255 255 / 0.88)))}.channel-container .channel:hover .latest-msg-time,.channel-container .channel:hover .latest-msg,.channel-container .channel:hover .latest-msg.new{color:rgb(var(--rtk-colors-text-on-brand-700, var(--rtk-colors-text-700, 255 255 255 / 0.64)))}.channel-container .channel-display{display:flex;gap:var(--rtk-space-2, 8px);align-self:center;padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-0, 0px)}.channel-container .channel-display rtk-avatar{height:var(--rtk-space-9, 36px);width:var(--rtk-space-9, 36px);flex-shrink:0;font-size:12px}.channel-container .channel-display rtk-icon{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);flex-shrink:0;padding:var(--rtk-space-2, 8px);border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.channel-container .channel-card{width:100%;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-left:var(--rtk-space-1, 4px)}.channel-container .channel-card .channel-name{max-width:var(--rtk-space-60, 240px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;font-weight:500}.channel-container .channel-card .latest-msg{margin:var(--rtk-space-0, 0px);max-width:var(--rtk-space-56, 224px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px}.channel-container .channel-card .latest-msg.new{font-weight:200;font-style:italic;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.channel-container .channel-card .latest-msg-time{font-size:12px;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.channel-container .channel-meta{width:var(--rtk-space-12, 48px);display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;gap:var(--rtk-space-1\\.5, 6px);font-size:12px;font-weight:600}.channel-container .new-msgs-count{height:var(--rtk-space-4, 16px);min-width:var(--rtk-space-4, 16px);padding-top:1px;padding-bottom:1px;padding-left:2px;padding-right:2px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-success, 98 165 4) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));border-radius:var(--rtk-border-radius-sm, 4px);text-align:center;font-size:12px}.channel-container .selected{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-900, var(--rtk-colors-text-900, 255 255 255 / 0.88)))}.channel-container .selected .latest-msg-time,.channel-container .selected .latest-msg,.channel-container .selected .latest-msg.new{color:rgb(var(--rtk-colors-text-on-brand-700, var(--rtk-colors-text-700, 255 255 255 / 0.64)))}.channel-container .highlight .channel-title span{font-weight:700}.latest-msg p{margin:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-1, 4px);display:inline-block}.latest-msg blockquote{display:none}.recent-message-row{margin-bottom:var(--rtk-space-2, 8px);display:flex;width:100%;flex-direction:row;justify-content:space-between}";
const RtkChannelSelectorUiStyle0 = rtkChannelSelectorUiCss;

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
const RtkChannelSelectorUi$1 = /*@__PURE__*/ proxyCustomElement(class RtkChannelSelectorUi extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.channelChanged = createEvent(this, "channelChanged", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** show recent message in channel */
        this.showRecentMessage = false;
        this.isHidden = false;
        this.searchQuery = '';
        this.handleResize = (e) => {
            this.isHidden = !e.matches;
        };
        this.channelSelected = (channelId) => {
            this.channelChanged.emit(channelId);
            this.onRevealClicked();
        };
        this.onSearchInput = (e) => {
            this.searchQuery = e.target.value;
        };
        this.onRevealClicked = () => {
            if (this.matchMedia.matches)
                return;
            this.isHidden = !this.isHidden;
        };
        this.renderChannelDisplayPic = (channel) => {
            const hasDisplayPic = channel.displayPictureUrl && channel.displayPictureUrl.length !== 0;
            if (channel.isDirectMessage || hasDisplayPic) {
                return (h("div", { class: "channel-display" }, h("rtk-avatar", { participant: {
                        name: channel.displayName,
                        picture: channel.displayPictureUrl,
                    } })));
            }
            else {
                return (h("div", { class: "channel-display" }, h("rtk-icon", { icon: this.iconPack.people, slot: "start" })));
            }
        };
        this.renderRecentMessage = (channel) => {
            if (!channel.latestMessage)
                return h("p", { class: "latest-msg new" }, this.t('chat.start_conversation'));
            let senderFragment = channel.isDirectMessage ? '' : `${channel.latestMessage.displayName}: `;
            if (channel.latestMessage.type === 'text') {
                return (h("p", { class: "latest-msg" }, senderFragment, h(TextMessageView, { message: channel.latestMessage.message })));
            }
            // non text
            let messageFragment = '';
            if (channel.latestMessage.type === 'image') {
                messageFragment = this.t('image');
            }
            else if (channel.latestMessage.type === 'file') {
                messageFragment = this.t('file');
            }
            return h("p", { class: "latest-msg" }, `${senderFragment}${messageFragment}`);
        };
    }
    connectedCallback() {
        this.matchMedia = window.matchMedia(`(orientation: landscape) and (min-width: 400px)`);
        this.matchMedia.addEventListener('change', this.handleResize);
        this.isHidden = !this.matchMedia.matches;
    }
    disconnectedCallback() {
        this.matchMedia.removeEventListener('change', this.handleResize);
    }
    componentDidRender() {
        this.$el.style.transform = this.isHidden ? 'translateX(-380px)' : 'translateX(0)';
    }
    getTimeLabel(message) {
        const messageDate = message.time;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay() - 1);
        if (messageDate.toDateString() === today.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        else if (messageDate.toDateString() === yesterday.toDateString()) {
            return this.t('date.yesteday');
        }
        else if (messageDate > firstDayOfWeek) {
            const weekdays = [
                'date.sunday',
                'date.monday',
                'date.tuesday',
                'date.wednesday',
                'date.thursday',
                'date.friday',
                'date.saturday',
            ];
            return this.t(weekdays[messageDate.getDay()]);
        }
        else {
            return Intl.DateTimeFormat([], {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(messageDate);
        }
    }
    render() {
        return (h(Host, { key: '5a2393ac0ac3f67bfae1acf2ec06c2e3ced317f7' }, h("div", { key: '73361a84f8078584b80bca96f1f1f9c9f04d74b9', class: "container", ref: (el) => (this.$el = el) }, this.isHidden && (h("rtk-button", { key: 'ea1f4caf8e5e7aeb633cdec506952fad6f168900', kind: "icon", variant: "ghost", size: "md", onClick: this.onRevealClicked, class: "sidebar-btn" }, h("rtk-icon", { key: '165420751ca42a7fe1040152bae366964e2dfe9f', icon: this.isHidden ? this.iconPack.chevron_left : this.iconPack.dismiss }))), h("slot", { key: '4a04c6acd67fd6a243e66cbadfb527f70c95c416', name: "header" }), h("div", { key: 'd994d7c80ddab2ab5d87e8b7bfbaf24283f400f6', class: "search-wrapper" }, h("div", { key: '6d3c72ccf0576bb1c682c9b687fd769f8720501a', class: "search" }, h("input", { key: '65eaf233392c435772a3a2da1a33f819e4760f66', type: "search", autocomplete: "off", placeholder: this.t('chat.search_conversations'), onInput: this.onSearchInput }), h("rtk-icon", { key: 'c70df6fb76af5815837461f4f9382631acc8f336', icon: this.iconPack.search, class: "search-icon" }))), h("div", { key: '9b298879a017f3ac5c0919ec5869cb644839c31f', class: "channel-container scrollbar", role: "list" }, this.channels
            .filter((channel) => this.searchQuery === '' || channel.displayName.includes(this.searchQuery))
            .map((channel) => {
            return (h("div", { class: {
                    channel: true,
                    selected: channel.id === this.selectedChannelId,
                    highlight: !!channel.unreadCount,
                }, role: "listitem", onClick: () => {
                    this.channelSelected(channel.id);
                } }, this.renderChannelDisplayPic(channel), h("div", { class: "channel-card", "is-direct-message": channel.isDirectMessage }, h("div", { class: 'recent-message-row' }, h("span", { class: "channel-name" }, channel.displayName), channel.latestMessage && (h("span", { class: "latest-msg-time" }, this.getTimeLabel(channel.latestMessage)))), h("div", { class: 'recent-message-row' }, this.renderRecentMessage(channel), channel.unreadCount > 0 && channel.id !== this.selectedChannelId ? (h("span", { class: "new-msgs-count" }, channel.unreadCount < 99 ? channel.unreadCount : '99+')) : null))));
        }))), !this.isHidden && (h("div", { key: '3d760da990293e4ed28a2408d9db7987012c2bd4', class: "overlay-container" }, h("rtk-button", { key: 'ae83483508d71df77f4de75a92d99b89d148eefe', kind: "icon", variant: "ghost", size: "md", onClick: this.onRevealClicked, class: "sidebar-btn" }, h("rtk-icon", { key: '482ab05f50c151ee956611db128cdd197df6ad11', icon: this.isHidden ? this.iconPack.chevron_left : this.iconPack.dismiss }))))));
    }
    static get style() { return RtkChannelSelectorUiStyle0; }
}, [1, "rtk-channel-selector-ui", {
        "channels": [16],
        "selectedChannelId": [1, "selected-channel-id"],
        "iconPack": [16],
        "t": [16],
        "showRecentMessage": [4, "show-recent-message"],
        "isHidden": [32],
        "searchQuery": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkChannelSelectorUi$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChannelSelectorUi$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-channel-selector-ui", "rtk-avatar", "rtk-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-channel-selector-ui":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChannelSelectorUi$1);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-button":
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
    } });
}
defineCustomElement$1();

const RtkChannelSelectorUi = RtkChannelSelectorUi$1;
const defineCustomElement = defineCustomElement$1;

export { RtkChannelSelectorUi, defineCustomElement };
