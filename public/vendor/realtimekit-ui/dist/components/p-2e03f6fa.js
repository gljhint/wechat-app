import { p as proxyCustomElement, H, d as createEvent, h, F as Fragment, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage, K as usePaginatedChat, L as FlagsmithFeatureFlags } from './p-74e01969.js';
import { h as handleFilesDataTransfer, g as generateChatGroupKey, T as TEMPORARY_CHANNEL_PREFIX, i as isDirectMessageChannel, d as alphabeticalSorter, f as getDMComparator, s as stripOutReplyBlock, j as parseMessageForTarget } from './p-0abe4b8a.js';
import { c as chatUnreadTimestamps } from './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$Q } from './p-4e9d44f6.js';
import { d as defineCustomElement$P } from './p-b0a32a7d.js';
import { d as defineCustomElement$O } from './p-17453290.js';
import { d as defineCustomElement$N } from './p-f6995a6b.js';
import { d as defineCustomElement$M } from './p-92f160e9.js';
import { d as defineCustomElement$L } from './p-1391bef0.js';
import { d as defineCustomElement$K } from './p-30b81dcd.js';
import { d as defineCustomElement$J } from './p-8336535d.js';
import { d as defineCustomElement$I } from './p-cb7f0abe.js';
import { d as defineCustomElement$H } from './p-632e7c39.js';
import { d as defineCustomElement$G } from './p-ac49fc4f.js';
import { d as defineCustomElement$F } from './p-f5c29229.js';
import { d as defineCustomElement$E } from './p-08f6162d.js';
import { d as defineCustomElement$D } from './p-96baedfe.js';
import { d as defineCustomElement$C } from './p-0c5aab6d.js';
import { d as defineCustomElement$B } from './p-1740eeb4.js';
import { d as defineCustomElement$A } from './p-61a18b1f.js';
import { d as defineCustomElement$z } from './p-60025dc2.js';
import { d as defineCustomElement$y } from './p-84847c17.js';
import { d as defineCustomElement$x } from './p-55f81a3e.js';
import { d as defineCustomElement$w } from './p-be80c5b1.js';
import { d as defineCustomElement$v } from './p-a34d743e.js';
import { d as defineCustomElement$u } from './p-dc9eb0c2.js';
import { d as defineCustomElement$t } from './p-31ccb362.js';
import { d as defineCustomElement$s } from './p-f45ceaa6.js';
import { d as defineCustomElement$r } from './p-c8b8a942.js';
import { d as defineCustomElement$q } from './p-25a4363c.js';
import { d as defineCustomElement$p } from './p-63b4ff6e.js';
import { d as defineCustomElement$o } from './p-27f15618.js';
import { d as defineCustomElement$n } from './p-4a4c2102.js';
import { d as defineCustomElement$m } from './p-3b29dda1.js';
import { d as defineCustomElement$l } from './p-4a792ea5.js';
import { d as defineCustomElement$k } from './p-e891d522.js';
import { d as defineCustomElement$j } from './p-d3c93bcf.js';
import { d as defineCustomElement$i } from './p-654f389d.js';
import { d as defineCustomElement$h } from './p-c2d72f31.js';
import { d as defineCustomElement$g } from './p-f5f0b499.js';
import { d as defineCustomElement$f } from './p-919e71b8.js';
import { d as defineCustomElement$e } from './p-5205ea87.js';
import { d as defineCustomElement$d } from './p-a9d80b81.js';
import { d as defineCustomElement$c } from './p-de20d057.js';
import { d as defineCustomElement$b } from './p-d1fe3ce0.js';
import { d as defineCustomElement$a } from './p-3ae9e606.js';
import { d as defineCustomElement$9 } from './p-e41c8029.js';
import { d as defineCustomElement$8 } from './p-ba531eb3.js';
import { d as defineCustomElement$7 } from './p-ff8e5929.js';
import { d as defineCustomElement$6 } from './p-866a285b.js';
import { d as defineCustomElement$5 } from './p-a59a9c97.js';
import { d as defineCustomElement$4 } from './p-262377bc.js';
import { d as defineCustomElement$3 } from './p-317b41b0.js';
import { d as defineCustomElement$2 } from './p-3570bda3.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkChatCss = ":host {\n  line-height: initial;\n  font-family: var(--rtk-font-family, sans-serif);\n\n  font-feature-settings: normal;\n  font-variation-settings: normal;\n}\n\np {\n  margin: var(--rtk-space-0, 0px);\n  padding: var(--rtk-space-0, 0px);\n}\n\n.scrollbar {\n  /* For Firefox */\n  scrollbar-width: thin;\n  scrollbar-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent);\n}\n\n/* For WebKit */\n.scrollbar::-webkit-scrollbar {\n  height: var(--rtk-space-1\\.5, 6px);\n  width: var(--rtk-space-1\\.5, 6px);\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-background, transparent);\n}\n\n.scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)));\n}\n\n\n:host {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-direction: column;\n  font-size: 14px;\n  position: relative;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\nh3 {\n  margin: var(--rtk-space-0, 0px);\n  display: flex;\n  height: var(--rtk-space-12, 48px);\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 400;\n  color: rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));\n  text-align: center;\n}\n\n#dropzone {\n  position: absolute;\n  top: var(--rtk-space-0, 0px);\n  right: var(--rtk-space-0, 0px);\n  bottom: var(--rtk-space-0, 0px);\n  left: var(--rtk-space-0, 0px);\n  z-index: 10;\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));\n}\n\n#dropzone.active {\n  display: flex;\n  animation: 0.2s slide-up ease-in;\n}\n\nrtk-chat-messages-ui,\nrtk-chat-messages-ui-paginated {\n  flex: 1 0 0;\n}\n\nrtk-chat-composer-view {\n  margin: var(--rtk-space-2, 8px);\n}\n\n.chat-container {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-direction: row;\n  container-type: size;\n  container-name: chatcontainer;\n}\n\n@container chatcontainer (height < 360px) {\n  rtk-channel-selector-view {\n    height: var(--rtk-space-8, 32px);\n    min-height: 24px;\n  }\n}\n\n.chat {\n  display: flex;\n  flex: 1 1 0%;\n  flex-direction: column;\n}\n\n.banner {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.banner .welcome-new-channel {\n  width: var(--rtk-space-48, 192px);\n}\n\n.banner .create-channel-illustration {\n  height: var(--rtk-space-40, 160px);\n  width: var(--rtk-space-40, 160px);\n}\n\n.channel-selector-header {\n  box-sizing: border-box;\n  height: var(--rtk-space-16, 64px);\n  padding: var(--rtk-space-4, 16px);\n  display: flex;\n  justify-content: space-between;\n  border-bottom: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-700, 44 44 44));\n}\n\n.channel-selector-header .channel-create-btn {\n  width: var(--rtk-space-8, 32px);\n  justify-content: center;\n}\n\n.channel-selector-header .channel-create-btn:hover {\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));\n}\n\n.view-chats-btn {\n  margin-top: var(--rtk-space-4, 16px);\n}\n\n.selector-container {\n  z-index: 50;\n  width: 100%;\n  max-width: var(--rtk-space-80, 320px);\n  border-right: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n}\n\n.selector-container.hide {\n  display: none;\n}\n\n.mobile-close-btn {\n  display: none;\n}\n\n.selector-container.mobile {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  position: absolute;\n  top: var(--rtk-space-0, 0px);\n  right: var(--rtk-space-0, 0px);\n  bottom: var(--rtk-space-0, 0px);\n  left: var(--rtk-space-0, 0px);\n  background-color: rgba(var(--rtk-colors-background-1000, 8 8 8) / 0.6);\n  display: flex;\n}\n\n.selector-container.mobile rtk-channel-selector-view {\n  max-width: var(--rtk-space-96, 384px);\n    animation: 0.3s swipe-in;\n}\n\n.selector-container.mobile .mobile-close-btn {\n  margin-top: var(--rtk-space-4, 16px);\n  margin-bottom: var(--rtk-space-4, 16px);\n  margin-left: var(--rtk-space-6, 24px);\n  margin-right: var(--rtk-space-6, 24px);\n  display: block;\n}\n\n.pinned-messages-header {\n  display: flex;\n  align-items: center;\n  gap: var(--rtk-space-2, 8px);\n  padding: var(--rtk-space-2, 8px);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.pinned-messages-header rtk-icon {\n  height: var(--rtk-space-3, 12px);\n  width: var(--rtk-space-3, 12px);\n}\n\n.pinned-messages-header:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n}\n\n.pinned-messages-header.active {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n}\n\n@keyframes swipe-in {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n";
const RtkChatStyle0 = rtkChatCss;

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
const RtkChat = /*@__PURE__*/ proxyCustomElement(class RtkChat extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        this.chatUpdateListener = ({ message }) => {
            if (message.channelId)
                return;
            if (!this.displayFilter || this.displayFilter(message)) {
                this.addToChatGroup(message);
                // shallow copy to trigger render
                this.chatGroups = Object.assign({}, this.chatGroups);
            }
        };
        this.chatPermissionUpdateListener = () => {
            this.canSend = this.meeting.self.permissions.chatPublic.canSend;
            this.canSendTextMessage = this.meeting.self.permissions.chatPublic.text;
            this.canSendFiles = this.meeting.self.permissions.chatPublic.files;
        };
        /** Config */
        this.config = createDefaultConfig();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** disables private chat */
        this.disablePrivateChat = false;
        /** Can current user pin/unpin messages */
        this.canPinMessages = false;
        /**
         * @deprecated
         * Beta API, will change in future
         * List of target presets allowed as private chat recipient
         */
        this.privatePresetFilter = [];
        /**
         * @deprecated
         * Beta API, will change in future
         * A filter function for messages to be displayed
         */
        this.displayFilter = undefined;
        this.unreadCountGroups = {};
        this.chatGroups = { everyone: [] };
        this.selectedGroup = 'everyone';
        this.now = new Date();
        this.dropzoneActivated = false;
        this.showLatestMessageButton = false;
        this.canSend = false;
        this.canSendTextMessage = false;
        this.canSendFiles = false;
        this.canPrivateMessage = false;
        this.canSendPrivateTexts = false;
        this.canSendPrivateFiles = false;
        this.emojiPickerEnabled = false;
        this.chatRecipientId = 'everyone';
        this.participants = [];
        this.channels = [];
        this.editingMessage = null;
        this.replyMessage = null;
        this.searchQuery = '';
        this.selectorState = 'hide';
        this.creatingChannel = false;
        this.showPinnedMessages = false;
        this.channelMap = new Map();
        this.onDragOver = (e) => {
            e.preventDefault();
            this.dropzoneActivated = true;
        };
        this.onDragLeave = () => {
            this.dropzoneActivated = false;
        };
        this.onDrop = (e) => {
            e.preventDefault();
            this.dropzoneActivated = false;
            handleFilesDataTransfer(e.dataTransfer.items, (type, file) => {
                var _a, _b, _c, _d;
                switch (type) {
                    case 'image':
                        if (this.isFileMessagingAllowed()) {
                            (_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.chat) === null || _b === void 0 ? void 0 : _b.sendImageMessage(file, this.getRecipientPeerIds());
                        }
                        break;
                    case 'file':
                        if (this.isFileMessagingAllowed()) {
                            (_d = (_c = this.meeting) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.sendFileMessage(file, this.getRecipientPeerIds());
                        }
                        break;
                }
            });
        };
        this.disconnectMeeting = (meeting) => {
            var _a, _b, _c, _d, _e, _f;
            if (this.isPrivateChatSupported()) {
                meeting === null || meeting === void 0 ? void 0 : meeting.participants.joined.removeListener('participantJoined', this.onParticipantUpdate);
                meeting === null || meeting === void 0 ? void 0 : meeting.participants.joined.removeListener('participantLeft', this.onParticipantUpdate);
            }
            (_a = meeting === null || meeting === void 0 ? void 0 : meeting.chat) === null || _a === void 0 ? void 0 : _a.removeListener('chatUpdate', this.chatUpdateListener);
            (_b = meeting === null || meeting === void 0 ? void 0 : meeting.chat) === null || _b === void 0 ? void 0 : _b.removeListener('channelCreate', this.onChannelCreateOrUpdate);
            (_c = meeting === null || meeting === void 0 ? void 0 : meeting.chat) === null || _c === void 0 ? void 0 : _c.removeListener('channelUpdate', this.onChannelCreateOrUpdate);
            (_d = meeting === null || meeting === void 0 ? void 0 : meeting.chat) === null || _d === void 0 ? void 0 : _d.removeListener('channelMessageUpdate', this.onChannelCreateOrUpdate);
            (_f = (_e = meeting === null || meeting === void 0 ? void 0 : meeting.participants) === null || _e === void 0 ? void 0 : _e.all) === null || _f === void 0 ? void 0 : _f.removeListener('participantsUpdate', this.onChannelCreateOrUpdate);
            meeting.self.permissions.removeListener('*', this.chatPermissionUpdateListener);
        };
        this.getFilteredParticipants = () => {
            if (this.privatePresetFilter.length === 0)
                return this.participants;
            return this.participants.filter((p) => this.privatePresetFilter.includes(p.presetName));
        };
        this.onParticipantUpdate = () => {
            this.participants = this.meeting.participants.joined
                .toArray()
                .filter((p) => this.privatePresetFilter.length === 0 || this.privatePresetFilter.includes(p.presetName));
            // if selected participant leaves, reset state to everyone
            if (this.selectedParticipant && !this.participants.includes(this.selectedParticipant)) {
                this.selectedParticipant = null;
                this.chatRecipientId = this.selectedGroup = 'everyone';
            }
        };
        this.usePaginatedChat = () => {
            if (this.isGroupCall && this.showPinnedMessages)
                return false;
            return this.selectedGroup === 'everyone' && usePaginatedChat(this.meeting);
        };
        this.updateUnreadCountGroups = (obj) => {
            this.unreadCountGroups = Object.assign(Object.assign({}, this.unreadCountGroups), obj);
        };
        this.isPrivateChatSupported = () => {
            return this.canPrivateMessage && !this.disablePrivateChat;
        };
        this.updateRecipients = (event) => {
            const { id } = event.detail;
            this.chatRecipientId = id;
            this.selectedParticipant = this.participants.find((p) => p.userId === id);
            if (this.chatRecipientId !== 'everyone') {
                const allParticipants = [this.chatRecipientId, this.meeting.self.userId];
                const targetKey = generateChatGroupKey(allParticipants);
                this.selectedGroup = targetKey;
            }
            else {
                this.selectedGroup = 'everyone';
            }
            this.updateUnreadCountGroups({ [this.selectedGroup]: 0 });
        };
        this.isTextMessagingAllowed = () => {
            if (this.chatRecipientId === 'everyone') {
                // public chat
                return this.canSend && this.canSendTextMessage;
            }
            // private chat
            return this.canPrivateMessage && this.canSendPrivateTexts;
        };
        this.isFileMessagingAllowed = () => {
            if (this.chatRecipientId === 'everyone') {
                // public chat
                return this.canSend && this.canSendFiles;
            }
            // private chat
            return this.canPrivateMessage && this.canSendPrivateFiles;
        };
        this.onChannelChanged = (e) => {
            const channel = e.detail;
            if (channel.id.includes(TEMPORARY_CHANNEL_PREFIX)) {
                this.createDMChannel(channel.id.replace(TEMPORARY_CHANNEL_PREFIX, ''));
            }
            else {
                this.selectedChannelId = channel.id;
            }
            this.cleanup();
            if (this.selectorState !== 'desktop') {
                this.selectorState = 'hide';
            }
        };
        this.createDMChannel = async (memberId) => {
            this.creatingChannel = true;
            const newChannel = await this.meeting.chat.createChannel('Direct Message', [memberId], {
                visibility: 'private',
                isDirectMessage: true,
            });
            this.creatingChannel = false;
            this.selectedChannelId = newChannel.id;
        };
        this.cleanup = () => {
            this.editingMessage = null;
            this.replyMessage = null;
            this.searchQuery = '';
        };
        this.onQuotedMessageDismiss = () => {
            this.replyMessage = null;
        };
        this.onChannelCreateOrUpdate = (channel) => {
            if (channel) {
                this.channelMap.set(channel.id, channel);
            }
            else {
                this.meeting.chat.channels.forEach((chan) => this.channelMap.set(chan.id, chan));
            }
            const allChannels = Array.from(this.channelMap.values());
            const channels = allChannels
                .filter((channel) => !isDirectMessageChannel(channel))
                .sort((a, b) => alphabeticalSorter(a.displayName, b.displayName));
            const membersWithChannel = allChannels.filter(isDirectMessageChannel).map((channel) => {
                return Object.assign(Object.assign({}, channel), { displayName: this.getMemberDisplayName(channel) });
            });
            const membersWithoutChannel = this.meeting.participants.all
                .toArray()
                .filter((member) => {
                if (member.userId === this.meeting.self.userId)
                    return false;
                const matcher = getDMComparator([this.meeting.self.userId, member.userId]);
                return membersWithChannel.every((channel) => getDMComparator(channel.memberIds) !== matcher);
            })
                .map((member) => {
                return {
                    id: `${TEMPORARY_CHANNEL_PREFIX}${member.userId}`,
                    displayName: member.name,
                    displayPictureUrl: member.picture,
                    isDirectMessage: true,
                    unreadCount: 0,
                };
            });
            const dms = [...membersWithChannel, ...membersWithoutChannel].sort((a, b) => alphabeticalSorter(a.displayName, b.displayName));
            this.channels = [...channels, ...dms];
            // select channel only if it is created in db
            const nonTemporaryChannel = [...channels, ...membersWithChannel];
            if (!this.selectedChannelId && nonTemporaryChannel.length !== 0) {
                this.selectedChannelId = nonTemporaryChannel[0].id;
            }
        };
        this.getMemberDisplayName = (channel) => {
            var _a;
            let id;
            if (channel.memberIds.length === 1) {
                // channel with self
                id = channel.memberIds[0];
            }
            else {
                id =
                    channel.memberIds[0] === this.meeting.self.userId
                        ? channel.memberIds[1]
                        : channel.memberIds[0];
            }
            const member = this.meeting.participants.all.toArray().find((member) => member.userId === id);
            return (_a = member === null || member === void 0 ? void 0 : member.name) !== null && _a !== void 0 ? _a : id;
        };
        this.onNewMessageHandler = async (e) => {
            const message = e.detail;
            if (this.isChatViewType) {
                await this.meeting.chat.sendMessageToChannel(message, this.selectedChannelId, this.replyMessage
                    ? {
                        replyTo: this.replyMessage,
                    }
                    : {});
                this.replyMessage = null;
            }
            else {
                this.meeting.chat.sendMessage(message, this.getRecipientPeerIds());
            }
        };
        this.onEditMessageHandler = async (e) => {
            var _a, _b;
            await ((_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.chat) === null || _b === void 0 ? void 0 : _b.editTextMessage(this.editingMessage.id, e.detail, this.editingMessage.channelId));
            this.editingMessage = null;
        };
        this.onEditCancel = () => {
            this.editingMessage = null;
        };
        this.onSearchHandler = async (e) => {
            this.searchQuery = e.detail;
        };
        this.onSearchDismissed = () => {
            this.searchQuery = '';
        };
        this.onChannelCreateClicked = () => {
            this.stateUpdate.emit({ activeChannelCreator: true });
        };
        this.onPinMessage = (event) => {
            const message = event.detail;
            if (message.pinned) {
                this.meeting.chat.unpin(message.id);
            }
            else {
                this.meeting.chat.pin(message.id);
            }
        };
        this.onDeleteMessage = (event) => {
            const message = event.detail;
            this.meeting.chat.deleteMessage(message.id);
        };
        this.getChannelItems = () => {
            return this.channels.map((channel) => {
                const result = {
                    id: channel.id,
                    name: channel.displayName,
                    avatarUrl: channel.displayPictureUrl,
                };
                if (channel.latestMessage) {
                    result.latestMessage =
                        channel.latestMessage.type === 'text'
                            ? stripOutReplyBlock(channel.latestMessage.message)
                            : '';
                    result.latestMessageTime = channel.latestMessage.time;
                }
                return result;
            });
        };
        this.getPrivateChatRecipients = () => {
            const participants = this.getFilteredParticipants().map((participant) => {
                const key = generateChatGroupKey([participant.userId, this.meeting.self.userId]);
                const result = {
                    id: participant.userId,
                    name: participant.name,
                    avatarUrl: participant.picture,
                    unreadCount: this.unreadCountGroups[key],
                };
                return result;
            });
            const everyone = {
                id: 'everyone',
                name: this.t('chat.everyone'),
                icon: 'participants',
                unreadCount: this.unreadCountGroups['everyone'],
            };
            return [everyone, ...participants];
        };
        this.onTogglePinnedMessages = () => {
            this.showPinnedMessages = !this.showPinnedMessages;
        };
        this.renderPinnedMessagesHeader = () => {
            if (this.meeting.chat.pinned.length === 0)
                return null;
            return (h("rtk-tooltip", { label: this.t('chat.toggle_pinned_msgs') }, h("div", { class: { 'pinned-messages-header': true, active: this.showPinnedMessages }, onClick: this.onTogglePinnedMessages }, h("rtk-icon", { icon: this.iconPack.pin }), this.t('chat.pinned_msgs'), ` (${this.meeting.chat.pinned.length})`)));
        };
    }
    connectedCallback() {
        if (!this.meeting)
            return;
        this.meetingChanged(this.meeting);
        if (this.meeting && !this.meeting.chat) {
            return;
        }
        if (this.isFileMessagingAllowed()) {
            this.host.addEventListener('dragover', this.onDragOver);
            this.host.addEventListener('dragleave', this.onDragLeave);
            this.host.addEventListener('drop', this.onDrop);
        }
    }
    onEditMessageInit(event) {
        if (event.detail.flags.isReply) {
            this.replyMessage = event.detail.payload;
        }
        else if (event.detail.flags.isEdit) {
            this.editingMessage = event.detail.payload;
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.disconnectMeeting(this.meeting);
        this.host.removeEventListener('dragover', this.onDragOver);
        this.host.removeEventListener('dragleave', this.onDragLeave);
        this.host.removeEventListener('drop', this.onDrop);
    }
    meetingChanged(meeting, oldMeeting) {
        var _a, _b, _c, _d, _e, _f;
        if (oldMeeting != undefined)
            this.disconnectMeeting(oldMeeting);
        if (meeting && !meeting.chat)
            return;
        if (meeting != null) {
            this.canSend = meeting.self.permissions.chatPublic.canSend;
            this.canSendTextMessage = meeting.self.permissions.chatPublic.text;
            this.canSendFiles = meeting.self.permissions.chatPublic.files;
            this.canPrivateMessage = !!(((_a = meeting.self.permissions.chatPrivate) === null || _a === void 0 ? void 0 : _a.canSend) ||
                ((_b = meeting.self.permissions.chatPrivate) === null || _b === void 0 ? void 0 : _b.canReceive));
            this.canSendPrivateTexts = !!((_c = meeting.self.permissions.chatPrivate) === null || _c === void 0 ? void 0 : _c.text);
            this.canSendPrivateFiles = !!((_d = meeting.self.permissions.chatPrivate) === null || _d === void 0 ? void 0 : _d.files);
            this.canPinMessages =
                ((_e = meeting === null || meeting === void 0 ? void 0 : meeting.__internals__) === null || _e === void 0 ? void 0 : _e.features.hasFeature(FlagsmithFeatureFlags.PINNED_MESSAGES)) &&
                    meeting.self.permissions.pinParticipant;
            this.isGroupCall = meeting.meta.viewType === 'GROUP_CALL';
            this.isChatViewType = meeting.meta.viewType === 'CHAT';
            if (this.isChatViewType) {
                this.onChannelCreateOrUpdate();
                const validChannels = this.channels.filter((channel) => !channel.id.includes(TEMPORARY_CHANNEL_PREFIX));
                if (validChannels.length) {
                    this.selectedChannelId = this.channels[0].id;
                }
                if (this.resizeObserver) {
                    this.resizeObserver.disconnect();
                }
                this.resizeObserver = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        if (entry.contentBoxSize[0].inlineSize < 758) {
                            this.selectorState = 'hide';
                        }
                        else {
                            this.selectorState = 'desktop';
                        }
                    }
                });
                if (this.isChatViewType) {
                    this.resizeObserver.observe(this.host);
                }
            }
            this.initializeChatGroups();
            // shallow copy to trigger render
            this.chatGroups = Object.assign({}, this.chatGroups);
            meeting.self.permissions.on('*', this.chatPermissionUpdateListener);
            this.onParticipantUpdate();
            (_f = meeting.chat) === null || _f === void 0 ? void 0 : _f.addListener('chatUpdate', this.chatUpdateListener);
            if (this.isPrivateChatSupported()) {
                meeting.participants.joined.addListener('participantJoined', this.onParticipantUpdate);
                meeting.participants.joined.addListener('participantLeft', this.onParticipantUpdate);
            }
            if (this.isChatViewType) {
                meeting.chat.addListener('channelCreate', this.onChannelCreateOrUpdate);
                meeting.chat.addListener('channelUpdate', this.onChannelCreateOrUpdate);
                meeting.chat.addListener('channelMessageUpdate', this.onChannelCreateOrUpdate);
                meeting.participants.all.addListener('participantsUpdate', this.onChannelCreateOrUpdate);
            }
        }
    }
    chatGroupsChanged(chatGroups) {
        var _a, _b;
        if (!this.isPrivateChatSupported()) {
            return;
        }
        const unreadCounts = {};
        for (const key in chatGroups) {
            const lastReadTimestamp = (_a = chatUnreadTimestamps[key]) !== null && _a !== void 0 ? _a : 0;
            unreadCounts[key] = chatGroups[key].filter((c) => c.type == 'chat' &&
                c.message.time > lastReadTimestamp &&
                c.message.userId !== this.meeting.self.userId).length;
            if (key ===
                generateChatGroupKey([this.meeting.self.userId, (_b = this.selectedParticipant) === null || _b === void 0 ? void 0 : _b.userId]) ||
                (key === 'everyone' && this.selectedParticipant === null)) {
                unreadCounts[key] = 0;
                chatUnreadTimestamps[key] = new Date();
            }
        }
        this.updateUnreadCountGroups(unreadCounts);
    }
    initializeChatGroups() {
        var _a;
        (_a = this.meeting.chat) === null || _a === void 0 ? void 0 : _a.messages.forEach((message) => {
            if (!this.displayFilter || this.displayFilter(message)) {
                this.addToChatGroup(message);
            }
        });
    }
    onDisplayFilterChanged(newFilter, oldFilter) {
        if (newFilter !== oldFilter) {
            this.chatGroups = {};
            this.initializeChatGroups();
        }
    }
    addToChatGroup(message) {
        var _a;
        const parsedMessage = parseMessageForTarget(message);
        let key = 'everyone';
        if (((_a = parsedMessage.targetUserIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const allParticipants = new Set([
                parsedMessage.userId,
                ...parsedMessage.targetUserIds,
            ]);
            key = generateChatGroupKey(Array.from(allParticipants));
        }
        if (this.chatGroups[key] === undefined)
            this.chatGroups[key] = [];
        let isEditedMessage = false;
        let messages = [];
        this.chatGroups[key].forEach((chat) => {
            if (chat.type === 'chat' && chat.message.id === message.id) {
                isEditedMessage = true;
                messages.push({ type: 'chat', message: parsedMessage });
            }
            else {
                messages.push(chat);
            }
        });
        if (!isEditedMessage) {
            messages.push({ type: 'chat', message: parsedMessage });
        }
        this.chatGroups[key] = messages;
    }
    getRecipientPeerIds() {
        let peerIds = [];
        if (this.chatRecipientId !== 'everyone') {
            peerIds = [this.selectedParticipant.id];
        }
        return peerIds;
    }
    channelSwitchListener(e) {
        this.onChannelChanged(e);
    }
    renderHeadlessComponents() {
        return (h(Fragment, null, h("rtk-dialog-manager", { meeting: this.meeting }), h("rtk-notifications", { meeting: this.meeting })));
    }
    renderComposerUI() {
        var _a, _b, _c;
        if (this.isChatViewType && this.channels.length === 0)
            return null;
        if (this.isChatViewType && this.searchQuery !== '')
            return null;
        if (this.isChatViewType && !this.selectedChannelId)
            return null;
        if (this.chatRecipientId === 'everyone') {
            if (!this.canSendTextMessage && !this.canSendFiles)
                return null;
        }
        else {
            if (!this.canSendPrivateTexts && !this.canSendPrivateFiles)
                return null;
        }
        const uiProps = { iconPack: this.iconPack, t: this.t, size: this.size };
        const message = this.editingMessage ? this.editingMessage.message : '';
        const quotedMessage = this.replyMessage ? this.replyMessage.message : '';
        return (h("rtk-chat-composer-view", Object.assign({ message: message, storageKey: (_a = this.selectedChannelId) !== null && _a !== void 0 ? _a : `draft-${this.selectedChannelId}`, quotedMessage: quotedMessage, isEditing: !!this.editingMessage, canSendTextMessage: this.isTextMessagingAllowed(), canSendFiles: this.isFileMessagingAllowed(), disableEmojiPicker: !!((_c = (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.__internals__) === null || _c === void 0 ? void 0 : _c.features.hasFeature(FlagsmithFeatureFlags.DISABLE_EMOJI_PICKER)), maxLength: this.meeting.chat.maxTextLimit, rateLimits: this.meeting.chat.rateLimits, inputTextPlaceholder: this.t('chat.message_placeholder'), onNewMessage: this.onNewMessageHandler, onEditMessage: this.onEditMessageHandler, onEditCancel: this.onEditCancel, onQuotedMessageDismiss: this.onQuotedMessageDismiss }, uiProps), h("slot", { name: "chat-addon", slot: "chat-addon" })));
    }
    renderFullChat() {
        if (this.creatingChannel) {
            return (h("div", { class: "banner" }, h("rtk-spinner", { size: "lg" })));
        }
        if (this.channels.length === 0 || !this.selectedChannelId) {
            return (h("div", { class: "banner" }, h("rtk-icon", { icon: this.iconPack.create_channel_illustration, slot: "start", class: 'create-channel-illustration' }), h("rtk-button", { kind: "wide", variant: "primary", size: "md", onClick: this.onChannelCreateClicked, class: "welcome-new-channel" }, h("rtk-icon", { icon: this.iconPack.add, slot: "start" }), h("span", null, this.t('chat.new_channel'))), (this.selectorState === 'mobile' || this.selectorState === 'hide') && (h("rtk-button", { kind: "button", variant: "secondary", size: "md", class: "view-chats-btn", onClick: () => {
                    this.selectorState = 'mobile';
                } }, h("rtk-icon", { icon: this.iconPack.chat, slot: "start" }), h("span", null, this.t('chat.view_chats'))))));
        }
        const selectedChannel = this.channels.find((channel) => channel.id === this.selectedChannelId);
        return (h("div", { class: "chat" }, h("rtk-channel-header", { slot: "header", meeting: this.meeting, channel: selectedChannel, onSearch: this.onSearchHandler, onSearchDismissed: this.onSearchDismissed, showBackButton: this.selectorState === 'mobile' || this.selectorState === 'hide', onBack: () => {
                this.selectorState = 'mobile';
            } }), this.searchQuery !== '' && (h("rtk-chat-search-results", { meeting: this.meeting, query: this.searchQuery, channelId: this.selectedChannelId })), this.searchQuery === '' && (h("rtk-chat-messages-ui-paginated", { meeting: this.meeting, size: this.size, iconPack: this.iconPack, t: this.t, selectedChannelId: this.selectedChannelId, selectedChannel: selectedChannel }))));
    }
    render() {
        var _a, _b;
        if (!this.meeting) {
            return null;
        }
        const uiProps = { iconPack: this.iconPack, t: this.t, size: this.size };
        const selfUserId = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.userId;
        let chatMessages = this.chatGroups[this.selectedGroup] || [];
        if (this.showPinnedMessages && this.meeting.chat.pinned.length !== 0) {
            chatMessages = chatMessages.filter((chat) => chat.type === 'chat' && chat.message.pinned);
        }
        return (h(Host, null, this.isChatViewType && this.renderHeadlessComponents(), h("div", { class: "chat-container" }, this.isChatViewType && (h("div", { class: { 'selector-container': true, [this.selectorState]: true } }, h("rtk-channel-selector-view", { channels: this.getChannelItems(), selectedChannelId: this.selectedChannelId, onChannelChange: this.onChannelChanged, t: this.t }, h("div", { class: "channel-selector-header", slot: "header" }, h("rtk-logo", { meeting: this.meeting, config: this.config, t: this.t }), h("rtk-tooltip", { label: this.t('chat.new_channel') }, h("rtk-button", { kind: "button", variant: "ghost", size: "md", onClick: this.onChannelCreateClicked, class: "channel-create-btn" }, h("rtk-icon", { icon: this.iconPack.add }))))), h("rtk-button", { kind: "icon", variant: "ghost", class: "mobile-close-btn", onClick: () => (this.selectorState = 'hide') }, h("rtk-icon", { icon: this.iconPack.dismiss })))), h("div", { class: "chat" }, this.isFileMessagingAllowed() && (h("div", { id: "dropzone", class: { active: this.dropzoneActivated }, part: "dropzone" }, h("rtk-icon", { icon: this.iconPack.attach }), h("p", null, this.t('chat.send_attachment')))), this.renderPinnedMessagesHeader(), this.isPrivateChatSupported() && (h("rtk-channel-selector-view", { channels: this.getPrivateChatRecipients(), selectedChannelId: ((_b = this.selectedParticipant) === null || _b === void 0 ? void 0 : _b.userId) || 'everyone', onChannelChange: this.updateRecipients, t: this.t, viewAs: "dropdown" })), this.isChatViewType ? (this.renderFullChat()) : this.usePaginatedChat() ? (h("rtk-chat-messages-ui-paginated", { meeting: this.meeting, onPinMessage: this.onPinMessage, onDeleteMessage: this.onDeleteMessage, size: this.size, iconPack: this.iconPack, t: this.t })) : (h("rtk-chat-messages-ui", Object.assign({ messages: chatMessages, selfUserId: selfUserId, selectedGroup: this.selectedGroup, onPinMessage: this.onPinMessage, canPinMessages: this.canPinMessages }, uiProps))), this.renderComposerUI()))));
    }
    get host() { return this; }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "chatGroups": ["chatGroupsChanged"],
        "displayFilter": ["onDisplayFilterChanged"]
    }; }
    static get style() { return RtkChatStyle0; }
}, [1, "rtk-chat", {
        "meeting": [16],
        "config": [16],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "disablePrivateChat": [4, "disable-private-chat"],
        "privatePresetFilter": [16],
        "displayFilter": [16],
        "canPinMessages": [32],
        "unreadCountGroups": [32],
        "chatGroups": [32],
        "selectedGroup": [32],
        "now": [32],
        "dropzoneActivated": [32],
        "showLatestMessageButton": [32],
        "canSend": [32],
        "canSendTextMessage": [32],
        "canSendFiles": [32],
        "canPrivateMessage": [32],
        "canSendPrivateTexts": [32],
        "canSendPrivateFiles": [32],
        "emojiPickerEnabled": [32],
        "chatRecipientId": [32],
        "participants": [32],
        "selectedParticipant": [32],
        "channels": [32],
        "selectedChannelId": [32],
        "editingMessage": [32],
        "replyMessage": [32],
        "searchQuery": [32],
        "selectorState": [32],
        "creatingChannel": [32],
        "showPinnedMessages": [32]
    }, [[8, "editMessageInit", "onEditMessageInit"], [0, "switchChannel", "channelSwitchListener"]], {
        "meeting": ["meetingChanged"],
        "chatGroups": ["chatGroupsChanged"],
        "displayFilter": ["onDisplayFilterChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkChat.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkChat.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkChat.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChat.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-chat", "rtk-avatar", "rtk-breakout-room-manager", "rtk-breakout-room-participants", "rtk-breakout-rooms-manager", "rtk-broadcast-message-modal", "rtk-button", "rtk-channel-creator", "rtk-channel-details", "rtk-channel-header", "rtk-channel-selector-view", "rtk-chat-composer-view", "rtk-chat-message", "rtk-chat-messages-ui", "rtk-chat-messages-ui-paginated", "rtk-chat-search-results", "rtk-confirmation-modal", "rtk-counter", "rtk-debugger", "rtk-debugger-audio", "rtk-debugger-screenshare", "rtk-debugger-system", "rtk-debugger-video", "rtk-dialog", "rtk-dialog-manager", "rtk-draft-attachment-view", "rtk-emoji-picker", "rtk-emoji-picker-button", "rtk-file-message", "rtk-file-message-view", "rtk-file-picker-button", "rtk-icon", "rtk-image-message", "rtk-image-message-view", "rtk-join-stage", "rtk-leave-meeting", "rtk-logo", "rtk-markdown-view", "rtk-menu", "rtk-menu-item", "rtk-menu-list", "rtk-message-view", "rtk-mute-all-confirmation", "rtk-notification", "rtk-notifications", "rtk-overlay-modal", "rtk-paginated-list", "rtk-permissions-message", "rtk-spinner", "rtk-text-composer-view", "rtk-text-message", "rtk-text-message-view", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-chat":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChat);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$Q();
            }
            break;
        case "rtk-breakout-room-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$P();
            }
            break;
        case "rtk-breakout-room-participants":
            if (!customElements.get(tagName)) {
                defineCustomElement$O();
            }
            break;
        case "rtk-breakout-rooms-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$N();
            }
            break;
        case "rtk-broadcast-message-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$M();
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$L();
            }
            break;
        case "rtk-channel-creator":
            if (!customElements.get(tagName)) {
                defineCustomElement$K();
            }
            break;
        case "rtk-channel-details":
            if (!customElements.get(tagName)) {
                defineCustomElement$J();
            }
            break;
        case "rtk-channel-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$I();
            }
            break;
        case "rtk-channel-selector-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$H();
            }
            break;
        case "rtk-chat-composer-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$G();
            }
            break;
        case "rtk-chat-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$F();
            }
            break;
        case "rtk-chat-messages-ui":
            if (!customElements.get(tagName)) {
                defineCustomElement$E();
            }
            break;
        case "rtk-chat-messages-ui-paginated":
            if (!customElements.get(tagName)) {
                defineCustomElement$D();
            }
            break;
        case "rtk-chat-search-results":
            if (!customElements.get(tagName)) {
                defineCustomElement$C();
            }
            break;
        case "rtk-confirmation-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$B();
            }
            break;
        case "rtk-counter":
            if (!customElements.get(tagName)) {
                defineCustomElement$A();
            }
            break;
        case "rtk-debugger":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "rtk-debugger-audio":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "rtk-debugger-screenshare":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "rtk-debugger-system":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "rtk-debugger-video":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "rtk-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "rtk-dialog-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "rtk-draft-attachment-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "rtk-emoji-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "rtk-emoji-picker-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "rtk-file-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "rtk-file-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "rtk-file-picker-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "rtk-image-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "rtk-image-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "rtk-join-stage":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "rtk-leave-meeting":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "rtk-logo":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "rtk-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "rtk-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "rtk-menu-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "rtk-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "rtk-mute-all-confirmation":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "rtk-notification":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "rtk-notifications":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "rtk-overlay-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "rtk-paginated-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "rtk-permissions-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-text-composer-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-text-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-text-message-view":
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

export { RtkChat as R, defineCustomElement as d };
