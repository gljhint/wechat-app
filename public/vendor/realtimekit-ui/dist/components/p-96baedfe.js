import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$d } from './p-4e9d44f6.js';
import { d as defineCustomElement$c } from './p-1391bef0.js';
import { d as defineCustomElement$b } from './p-27f15618.js';
import { d as defineCustomElement$a } from './p-3b29dda1.js';
import { d as defineCustomElement$9 } from './p-e891d522.js';
import { d as defineCustomElement$8 } from './p-f5f0b499.js';
import { d as defineCustomElement$7 } from './p-919e71b8.js';
import { d as defineCustomElement$6 } from './p-5205ea87.js';
import { d as defineCustomElement$5 } from './p-a9d80b81.js';
import { d as defineCustomElement$4 } from './p-de20d057.js';
import { d as defineCustomElement$3 } from './p-ff8e5929.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';
import { d as defineCustomElement$1 } from './p-3570bda3.js';

const rtkChatMessagesUiPaginatedCss = ":host{display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));flex:1 0 0px}";
const RtkChatMessagesUiPaginatedStyle0 = rtkChatMessagesUiPaginatedCss;

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
const RtkChatMessagesUiPaginated = /*@__PURE__*/ proxyCustomElement(class RtkChatMessagesUiPaginated extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.editMessageInit = createEvent(this, "editMessageInit", 7);
        this.onPinMessage = createEvent(this, "pinMessage", 7);
        this.onDeleteMessage = createEvent(this, "deleteMessage", 7);
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Whether to align chat bubbles to the left */
        this.leftAlign = false;
        this.permissionsChanged = false;
        this.pageSize = 25;
        this.lastReadMessageIndex = -1;
        this.permissionsUpdateListener = () => {
            this.permissionsChanged = !this.permissionsChanged;
        };
        this.maybeMarkChannelAsRead = (messages) => {
            if (!this.selectedChannelId)
                return;
            if (messages.length === 0)
                return;
            if (this.lastReadMessageIndex !== -1)
                return;
            const latestMsg = messages.at(0).time > messages.at(-1).time ? messages.at(0) : messages.at(-1);
            if (!latestMsg.channelIndex)
                return;
            this.lastReadMessageIndex = parseInt(latestMsg.channelIndex, 10);
            this.meeting.chat.markLastReadMessage(this.selectedChannelId, latestMsg);
        };
        this.getChatMessages = async (timestamp, size, reversed) => {
            const { messages } = await this.meeting.chat.getMessages(timestamp, size, reversed, undefined, this.selectedChannelId);
            this.maybeMarkChannelAsRead(messages);
            return messages;
        };
        this.createChatNodes = (data) => {
            /**
             * NOTE(callmetarush): When between pages the message's isContinued
             * will fail in current implementation
             */
            return data.map((message, idx) => {
                var _a;
                const isContinued = message.userId === ((_a = data[idx - 1]) === null || _a === void 0 ? void 0 : _a.userId);
                return this.createChatNode(message, isContinued);
            });
        };
        this.disconnectMeeting = (meeting) => {
            var _a, _b;
            (_a = meeting === null || meeting === void 0 ? void 0 : meeting.chat) === null || _a === void 0 ? void 0 : _a.removeListener('chatUpdate', this.chatUpdateListener);
            (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.self.permissions.removeListener('permissionsUpdate', this.permissionsUpdateListener);
        };
        this.getMessageActions = (message) => {
            const actions = [];
            // const isSelf = this.meeting.self.userId === message.userId;
            // const chatMessagePermissions = this.meeting.self.permissions?.chatMessage;
            // const canEdit =
            //   chatMessagePermissions === undefined
            //     ? isSelf
            //     : chatMessagePermissions.canEdit === 'ALL' ||
            //       (chatMessagePermissions.canEdit === 'SELF' && isSelf);
            // const canDelete =
            //   chatMessagePermissions === undefined
            //     ? isSelf
            //     : chatMessagePermissions.canDelete === 'ALL' ||
            //       (chatMessagePermissions.canDelete === 'SELF' && isSelf);
            if (this.meeting.self.permissions.pinParticipant) {
                actions.push({
                    id: 'pin_message',
                    label: message.pinned ? this.t('unpin') : this.t('pin'),
                    icon: this.iconPack.pin,
                });
            }
            // if (canDelete) {
            //   actions.push({
            //     id: 'delete_message',
            //     label: this.t('chat.delete_msg'),
            //     icon: this.iconPack.delete,
            //   });
            // }
            return actions;
        };
        this.onMessageActionHandler = (actionId, message) => {
            switch (actionId) {
                case 'pin_message':
                    this.onPinMessage.emit(message);
                    break;
                case 'delete_message':
                    this.onDeleteMessage.emit(message);
                    break;
            }
        };
        this.createChatNode = (message, isContinued) => {
            var _a, _b, _c, _d;
            if (message.targetUserIds.length !== 0)
                return null; // don't render private messages
            let displayPicture;
            if (this.meeting.meta.viewType === 'CHAT') {
                displayPicture = (_a = this.meeting.participants.all
                    .toArray()
                    .find((p) => p.userId === message.userId)) === null || _a === void 0 ? void 0 : _a.picture;
            }
            else {
                if (this.meeting.self.userId === message.userId) {
                    displayPicture = this.meeting.self.picture;
                }
                else {
                    displayPicture =
                        (_c = (_b = this.meeting.participants.joined
                            .toArray()
                            .find((member) => member.userId === message.userId)) === null || _b === void 0 ? void 0 : _b.picture) !== null && _c !== void 0 ? _c : (_d = this.meeting.participants.waitlisted.toArray().find((p) => p.userId === message.userId)) === null || _d === void 0 ? void 0 : _d.picture;
                }
            }
            return (h("div", { class: { pinned: message.pinned } }, h("div", { class: "message-wrapper" }, h("rtk-message-view", { time: message.time, actions: this.getMessageActions(message), authorName: message.displayName, avatarUrl: displayPicture, hideAuthorName: isContinued, viewType: 'incoming', variant: "bubble", onAction: (event) => this.onMessageActionHandler(event.detail, message) }, h("div", null, h("div", { class: "body" }, message.type === 'text' && (h("rtk-text-message-view", { text: message.message, isMarkdown: true })), message.type === 'file' && (h("rtk-file-message-view", { name: message.name, url: message.link, size: message.size })), message.type === 'image' && (h("rtk-image-message-view", { url: message.link, onPreview: () => {
                    this.stateUpdate.emit({ image: message });
                } }))), message.pinned && (h("div", { class: "pin-icon", part: "pin-icon" }, h("rtk-icon", { icon: this.iconPack.pin, size: "sm" }))))))));
        };
        this.chatUpdateListener = (data) => {
            if (this.selectedChannelId && data.message.channelId !== this.selectedChannelId)
                return;
            if (data.action === 'add') {
                this.$paginatedListRef.onNewNode(data.message);
                this.lastReadMessageIndex = -1;
                this.maybeMarkChannelAsRead([data.message]);
            }
            else if (data.action === 'delete') {
                this.$paginatedListRef.onNodeDelete(data.message.id);
            }
            else if (data.action === 'edit') {
                this.$paginatedListRef.onNodeUpdate(data.message.id, data.message);
            }
        };
    }
    componentDidLoad() {
        const slotted = this.host.shadowRoot.querySelector('slot');
        if (!slotted)
            return;
        this.children = slotted.assignedElements()[0];
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        this.disconnectMeeting(this.meeting);
    }
    meetingChanged(meeting, oldMeeting) {
        var _a;
        if (oldMeeting != undefined)
            this.disconnectMeeting(oldMeeting);
        if (meeting && !meeting.chat)
            return;
        if (meeting != null) {
            (_a = meeting.chat) === null || _a === void 0 ? void 0 : _a.addListener('chatUpdate', this.chatUpdateListener);
            meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
        }
        this.permissionsUpdateListener();
    }
    channelChanged() {
        this.lastReadMessageIndex = -1;
    }
    render() {
        return (h(Host, { key: 'd0ae21ca32589c18ede4b1e4b4682f5b82b58320' }, h("rtk-paginated-list", { key: 'bff3bdae7c6bbefed8dd8b478ac60370067c75a6', ref: (el) => (this.$paginatedListRef = el), pageSize: this.pageSize, pagesAllowed: 3, fetchData: this.getChatMessages, createNodes: this.createChatNodes, selectedItemId: this.selectedChannelId, emptyListLabel: this.t('chat.empty_channel') }, h("slot", { key: '043cfe627a1056c2267dd00705ff33e7e96f1f89' }))));
    }
    get host() { return this; }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "selectedChannelId": ["channelChanged"]
    }; }
    static get style() { return RtkChatMessagesUiPaginatedStyle0; }
}, [1, "rtk-chat-messages-ui-paginated", {
        "meeting": [16],
        "selectedChannel": [16],
        "selectedChannelId": [1, "selected-channel-id"],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "leftAlign": [4, "left-align"],
        "children": [32],
        "permissionsChanged": [32]
    }, undefined, {
        "meeting": ["meetingChanged"],
        "selectedChannelId": ["channelChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkChatMessagesUiPaginated.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkChatMessagesUiPaginated.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChatMessagesUiPaginated.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-chat-messages-ui-paginated", "rtk-avatar", "rtk-button", "rtk-file-message-view", "rtk-icon", "rtk-image-message-view", "rtk-markdown-view", "rtk-menu", "rtk-menu-item", "rtk-menu-list", "rtk-message-view", "rtk-paginated-list", "rtk-spinner", "rtk-text-message-view"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-chat-messages-ui-paginated":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChatMessagesUiPaginated);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "rtk-file-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "rtk-image-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "rtk-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "rtk-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-menu-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-message-view":
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
        case "rtk-text-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkChatMessagesUiPaginated as R, defineCustomElement as d };
