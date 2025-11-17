import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$5 } from './p-4e9d44f6.js';
import { d as defineCustomElement$4 } from './p-3b29dda1.js';
import { d as defineCustomElement$3 } from './p-f5f0b499.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';
import { d as defineCustomElement$1 } from './p-3570bda3.js';
import { d as debounce } from './p-1dca17d1.js';

const rtkChannelSelectorViewCss = ".scrollbar {\n  /* For Firefox */\n  scrollbar-width: thin;\n  scrollbar-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent);\n}\n\n/* For WebKit */\n.scrollbar::-webkit-scrollbar {\n  height: var(--rtk-space-1\\.5, 6px);\n  width: var(--rtk-space-1\\.5, 6px);\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-background, transparent);\n}\n\n.scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)));\n}\n\n\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));\n  position: relative;\n  z-index: 10;\n  height: var(--rtk-space-12, 48px);\n  min-height: 48px;\n}\n\n.dropdown-trigger {\n  height: 100%;\n  width: 100%;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  padding: var(--rtk-space-4, 16px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));\n  font-size: 14px;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  cursor: pointer;\n  position: absolute;\n  z-index: 20;\n}\n\n.dropdown-trigger span {\n  display: flex;\n  flex: 1 1 0%;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.dropdown-trigger rtk-icon {\n  margin-left: var(--rtk-space-1, 4px);\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n  flex-shrink: 0;\n}\n\n@container chatcontainer (height < 360px) {\n  .dropdown-trigger {\n    padding: var(--rtk-space-2, 8px);\n  }\n  .dropdown {\n    top: var(--rtk-space-8, 32px) !important;\n  }\n  .search-container {\n    padding-left: var(--rtk-space-0, 0px) !important;\n    padding-right: var(--rtk-space-0, 0px) !important;\n    padding-top: var(--rtk-space-0, 0px) !important;\n    padding-bottom: var(--rtk-space-0, 0px) !important;\n  }\n  input {\n    height: var(--rtk-space-8, 32px) !important;\n    border-radius: var(--rtk-border-radius-none, 0) !important;\n  }\n  .channel {\n    height: var(--rtk-space-8, 32px) !important;\n    border-radius: var(--rtk-border-radius-sm, 4px) !important;\n  }\n  .avatar-icon {\n    height: var(--rtk-space-3, 12px) !important;\n    width: var(--rtk-space-3, 12px) !important;\n    padding: var(--rtk-space-1, 4px) !important;\n  }\n\n  rtk-avatar {\n    height: var(--rtk-space-5, 20px) !important;\n    width: var(--rtk-space-5, 20px) !important;\n  }\n}\n\n.dropdown {\n  position: absolute;\n  width: 100%;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));\n  top: var(--rtk-space-12, 48px);\n  z-index: 10;\n  animation: 0.3s slide-down ease;\n}\n\n.dropdown .channels-container {\n  max-height: var(--rtk-space-80, 320px);\n}\n\n.list {\n  display: flex;\n  flex-direction: column;\n}\n\n.list .channel .channel-data {\n  align-items: flex-start;\n}\n\n.unread-count {\n  display: flex;\n  justify-content: center;\n  height: var(--rtk-space-5, 20px);\n  min-width: var(--rtk-space-3, 12px);\n  border-radius: 9999px;\n  padding-left: var(--rtk-space-1, 4px);\n  padding-right: var(--rtk-space-1, 4px);\n  font-size: 12px;\n  line-height: 1.25rem;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n}\n\ninput {\n  height: var(--rtk-space-9, 36px);\n  width: 100%;\n  padding-left: var(--rtk-space-3, 12px);\n  padding-right: var(--rtk-space-3, 12px);\n  box-sizing: border-box;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  border-radius: var(--rtk-border-radius-sm, 4px);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\n.search-container {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 0;\n  flex-basis: auto;\n  align-items: center;\n  padding-top: var(--rtk-space-3, 12px);\n  padding-bottom: var(--rtk-space-3, 12px);\n  padding-left: var(--rtk-space-2, 8px);\n  padding-right: var(--rtk-space-2, 8px);\n  border-bottom: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-700, 44 44 44));\n}\n\n.search-container rtk-icon {\n  margin-left: calc(var(--rtk-space-8, 32px) * -1);\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n  color: rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76));\n}\n\n.channels-container {\n  display: flex;\n  flex-direction: column;\n  gap: var(--rtk-space-1, 4px);\n  padding: var(--rtk-space-2, 8px);\n  flex: 1 1 auto;\n  overflow-y: auto;\n}\n\n.channel {\n  flex-shrink: 0;\n  box-sizing: border-box;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  background-color: transparent;\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  cursor: pointer;\n  border-radius: var(--rtk-border-radius-md, 8px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--rtk-space-2, 8px);\n  height: var(--rtk-space-16, 64px);\n  width: 100%;\n  padding-left: var(--rtk-space-2, 8px);\n  padding-right: var(--rtk-space-3, 12px);\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.channel:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n}\n\n.channel .channel-data {\n  flex: 1 1 0%;\n  align-items: center;\n  justify-content: space-between;\n  display: flex;\n  gap: var(--rtk-space-2, 8px);\n}\n\n.channel .name {\n  font-size: 16px;\n}\n\n.channel .name, \n  .channel .last-message {\n  max-width: var(--rtk-space-40, 160px);\n  text-align: left;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n}\n\n.channel .no-message {\n  font-style: italic;\n}\n\n.channel rtk-avatar {\n  height: var(--rtk-space-12, 48px);\n  width: var(--rtk-space-12, 48px);\n  overflow: clip;\n  border-radius: 9999px;\n  font-size: 14px;\n}\n\n.channel .avatar-icon {\n  height: var(--rtk-space-6, 24px);\n  width: var(--rtk-space-6, 24px);\n  padding: var(--rtk-space-3, 12px);\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n  overflow: clip;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n}\n\n.channel time, \n  .channel .last-message {\n  font-size: 12px;\n  color: rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76));\n}\n\n.channel.active {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n}\n\n.channel.active .unread-count {\n  background-color: rgb(var(--rtk-colors-text-on-brand-800, var(--rtk-colors-text-800, 255 255 255 / 0.76)));\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity));\n}\n\n.channel.active time {\n  color: rgb(var(--rtk-colors-text-on-brand-800, var(--rtk-colors-text-800, 255 255 255 / 0.76)));\n}\n\n.channel.active .last-message {\n  color: rgb(var(--rtk-colors-text-on-brand-700, var(--rtk-colors-text-700, 255 255 255 / 0.64)));\n}\n\n.channel.active rtk-avatar {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n}\n\n.col {\n  gap: var(--rtk-space-1, 4px);\n  display: flex;\n  flex-direction: column;\n}\n\n.channel-meta {\n  flex-shrink: 0;\n  align-items: flex-end;\n}\n\n@keyframes slide-down {\n  from {\n    transform: translateY(-50px);\n  }\n  to {\n    transform: translateY(0%);\n  }\n}\n";
const RtkChannelSelectorViewStyle0 = rtkChannelSelectorViewCss;

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
const RtkChannelSelectorView = /*@__PURE__*/ proxyCustomElement(class RtkChannelSelectorView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.channelChange = createEvent(this, "channelChange", 7);
        /** Disables search bar (default = false) */
        this.disableSearch = false;
        /** Hides avatar (default = false) */
        this.hideAvatar = false;
        /** Icon Pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Render as dropdown or list (default = list) */
        this.viewAs = 'list';
        this.searchQuery = '';
        this.showDropdown = false;
        this.calculateListHeight = debounce(() => {
            if (this.viewAs === 'list' && this.$listEl) {
                let height = 0;
                const slotEl = this.$el.shadowRoot.querySelector('slot[name="header"]');
                if (slotEl) {
                    slotEl.assignedElements().forEach((e) => (height += e.offsetHeight));
                }
                if (this.$searchEl) {
                    height += this.$searchEl.offsetHeight;
                }
                this.$listEl.style.height = `${window.innerHeight - height - 16}px`;
            }
        }, 60);
        this.getFilteredChannels = () => {
            if (this.searchQuery.trim() === '') {
                return this.channels;
            }
            return this.channels.filter((channel) => {
                return channel['name'].toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        };
        this.toggleDropdown = () => {
            this.showDropdown = !this.showDropdown;
        };
        this.getChannelById = (id) => {
            return this.channels.find((channel) => channel.id === id);
        };
        this.getTotalUnreads = () => {
            return this.channels.reduce((acc, curr) => {
                return acc + curr.unreadCount;
            }, 0);
        };
        this.onChannelClickHandler = (channel) => {
            this.channelChange.emit(channel);
            if (this.viewAs === 'dropdown') {
                this.showDropdown = false;
            }
        };
    }
    connectedCallback() {
        this.resizeObserver = new ResizeObserver(this.calculateListHeight);
    }
    componentDidLoad() {
        this.resizeObserver.observe(this.$el);
        this.calculateListHeight();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.calculateListHeight.cancel();
    }
    getTimeLabel(messageDate) {
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
        const filteredChannels = this.getFilteredChannels();
        const shouldShowDropdown = this.viewAs === 'list' || (this.viewAs === 'dropdown' && this.showDropdown);
        return (h(Host, { key: 'adc8ab4b9c8c865998588fbd9766296f18b3e48e' }, this.viewAs === 'list' && h("slot", { key: 'e5740725a4349472ca2eb1fb0816eb2311a99838', name: "header" }), shouldShowDropdown && (h("div", { key: '425adc920c28e0421e07bb0bd9f61b31c42fcda9', class: {
                dropdown: this.viewAs === 'dropdown',
                scrollbar: this.viewAs === 'dropdown',
                list: this.viewAs === 'list',
            } }, !this.disableSearch && (h("div", { key: '9fbbc48d8489f2a6490729fac1fecdef1838e84a', class: "search-container", ref: (el) => (this.$searchEl = el) }, h("input", { key: 'f7fb43662d50274f80380b735ef9f5fc0b215442', type: "text", placeholder: this.t('chat.search_conversations'), value: this.searchQuery, onInput: (e) => (this.searchQuery = e.target.value) }), h("rtk-icon", { key: 'af76e65a1397d2a6e557a28b687e26aef641c568', icon: this.iconPack.search }))), h("div", { key: '0711a9cfcc811269a5020dc41030c0daee5cc8bf', class: "channels-container scrollbar", ref: (el) => (this.$listEl = el) }, filteredChannels.map((channel) => {
            return (h("button", { class: { channel: true, active: this.selectedChannelId === channel.id }, onClick: () => this.onChannelClickHandler(channel) }, !this.hideAvatar && (h("div", null, channel.icon ? (h("rtk-icon", { class: "avatar-icon", icon: this.iconPack[channel.icon] })) : (h("rtk-avatar", { participant: {
                    name: channel.name,
                    picture: channel.avatarUrl,
                } })))), h("div", { class: "channel-data" }, h("div", { class: "col" }, h("div", { class: "name" }, channel.name), channel.latestMessage && (h("div", { class: {
                    'last-message': true,
                    'no-message': !channel.latestMessage,
                } }, h("rtk-text-message-view", { isMarkdown: true, text: channel.latestMessage })))), h("div", { class: "col channel-meta" }, channel.latestMessageTime && (h("time", { class: "time" }, this.getTimeLabel(channel.latestMessageTime))), channel.unreadCount > 0 && (h("div", { class: "unread-count" }, channel.unreadCount))))));
        })))), this.viewAs === 'dropdown' && (h("button", { key: '0c87f90d6d0fe22284995ab7259689f80a862829', class: "dropdown-trigger", onClick: this.toggleDropdown }, h("span", { key: 'd1a364f2c5c57d19702d0b8707ca661c1dc4c14f' }, this.selectedChannelId &&
            `${this.t('to')} ${this.getChannelById(this.selectedChannelId).name}`, this.getTotalUnreads() > 0 && (h("div", { key: 'bf789f9df82851825bc6ea12a19a5f37ab74aefe', class: "unread-count" }, this.getTotalUnreads()))), h("rtk-icon", { key: 'c0d03f883f4c46b2698be0f197751fc0470717ea', icon: this.showDropdown ? this.iconPack.chevron_up : this.iconPack.chevron_down })))));
    }
    get $el() { return this; }
    static get style() { return RtkChannelSelectorViewStyle0; }
}, [1, "rtk-channel-selector-view", {
        "channels": [16],
        "selectedChannelId": [1, "selected-channel-id"],
        "disableSearch": [4, "disable-search"],
        "hideAvatar": [4, "hide-avatar"],
        "iconPack": [16],
        "t": [16],
        "viewAs": [1, "view-as"],
        "searchQuery": [32],
        "showDropdown": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkChannelSelectorView.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChannelSelectorView.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-channel-selector-view", "rtk-avatar", "rtk-icon", "rtk-markdown-view", "rtk-spinner", "rtk-text-message-view"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-channel-selector-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChannelSelectorView);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-text-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkChannelSelectorView as R, defineCustomElement as d };
