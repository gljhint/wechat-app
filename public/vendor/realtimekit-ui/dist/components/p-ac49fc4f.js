import { p as proxyCustomElement, H, d as createEvent, w as writeTask, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { M as MAX_TEXT_LENGTH } from './p-0abe4b8a.js';
import { a as gracefulStorage } from './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$b } from './p-1391bef0.js';
import { d as defineCustomElement$a } from './p-f45ceaa6.js';
import { d as defineCustomElement$9 } from './p-c8b8a942.js';
import { d as defineCustomElement$8 } from './p-25a4363c.js';
import { d as defineCustomElement$7 } from './p-4a4c2102.js';
import { d as defineCustomElement$6 } from './p-3b29dda1.js';
import { d as defineCustomElement$5 } from './p-f5f0b499.js';
import { d as defineCustomElement$4 } from './p-a59a9c97.js';
import { d as defineCustomElement$3 } from './p-262377bc.js';
import { d as defineCustomElement$2 } from './p-3570bda3.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkChatComposerViewCss = ":host {\n  display: flex;\n  flex-direction: column;\n  font-family: var(--rtk-font-family, sans-serif);\n  font-size: 14px;\n  position: relative;\n}\n\n.quoted-message-container {\n  margin-bottom: var(--rtk-space-2, 8px);\n  display: flex;\n  justify-content: space-between;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  border-radius: var(--rtk-border-radius-md, 8px);\n  border: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n}\n\n.quoted-message-container .quoted-message {\n  flex: 1 1 0%;\n  padding: var(--rtk-space-2, 8px);\n  border-radius: var(--rtk-border-radius-md, 8px);\n  max-height: var(--rtk-space-24, 96px);\n  overflow-y: auto;\n  word-break: break-all;\n}\n\n.quoted-message-container .quoted-message blockquote {\n  display: none;\n}\n\n.quoted-message-container rtk-icon.dismiss {\n  margin-left: auto;\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n  padding: var(--rtk-space-2, 8px);\n  border-radius: var(--rtk-border-radius-md, 8px);\n  color: rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));\n}\n\n.quoted-message-container rtk-icon.dismiss:hover {\n  cursor: pointer;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\n.quoted-message-container rtk-icon.dismiss {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.composer-container {\n  position: relative;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  border-radius: var(--rtk-border-radius-md, 8px);\n  overflow: hidden;\n  border: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n}\n\n.composer-container > .composers {\n    min-height: 60px;\n  }\n\n@container chatcontainer (height < 360px) {\n    .composer-container > .composers {\n      min-height: 30px;\n    }\n}\n\n.chat-buttons {\n  padding: var(--rtk-space-3, 12px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\n.chat-buttons .right {\n  z-index: 10;\n}\n\n.chat-buttons .right .edit-buttons {\n  display: flex;\n  gap: var(--rtk-space-2, 8px);\n}\n\n.chat-buttons > div {\n  display: flex;\n  align-items: center;\n}\n\nrtk-emoji-picker {\n  z-index: 20;\n  position: absolute;\n  top: calc(var(--rtk-space-72, 288px) * -1);\n  border-top: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n  animation: 0.3s slide-up ease;\n}\n\n@keyframes slide-up {\n  from {\n    transform: translateY(100%);\n  }\n  to {\n    transform: translateY(0%);\n  }\n}\n";
const RtkChatComposerViewStyle0 = rtkChatComposerViewCss;

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
const messageLimits = {
    messagesSent: 0,
    startTime: 0,
};
const RtkChatComposerView = /*@__PURE__*/ proxyCustomElement(class RtkChatComposerView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onNewMessage = createEvent(this, "newMessage", 7);
        this.onEditMessage = createEvent(this, "editMessage", 7);
        this.onEditCancel = createEvent(this, "editCancel", 7);
        this.onQuotedMessageDismiss = createEvent(this, "quotedMessageDismiss", 7);
        /** Whether user can send text messages */
        this.canSendTextMessage = true;
        /** Whether user can send file messages */
        this.canSendFiles = true;
        /** Message to be pre-populated */
        this.message = '';
        /** Quote message to be displayed */
        this.quotedMessage = '';
        /** Key for storing message in localStorage */
        this.storageKey = 'rtk-text-message';
        /** Placeholder for text input */
        this.inputTextPlaceholder = 'Enter your message';
        /** Sets composer to edit mode */
        this.isEditing = false;
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Whether to show emoji picker */
        this.disableEmojiPicker = false;
        /** Rate limits */
        this.rateLimits = {
            period: 60,
            maxInvocations: 60,
        };
        this.fileToUpload = null;
        this.isEmojiPickerOpen = false;
        this.disableSendButton = false;
        this.rateLimitsBreached = false;
        this.textMessage = '';
        this.sendFile = () => {
            if (!this.canSendFiles) {
                return;
            }
            if (this.fileToUpload.type === 'image') {
                this.onNewMessage.emit({
                    type: 'image',
                    image: this.fileToUpload.file,
                });
            }
            else {
                this.onNewMessage.emit({ type: 'file', file: this.fileToUpload.file });
            }
            this.fileToUpload = null;
        };
        this.handleSendMessage = () => {
            if (!this.canSendTextMessage || this.rateLimitsBreached) {
                return;
            }
            if (this.fileToUpload !== null) {
                this.sendFile();
                return;
            }
            const message = this.textMessage;
            const currentTime = Date.now();
            if (currentTime - messageLimits.startTime > this.rateLimits.period * 1000) {
                messageLimits.startTime = currentTime;
                messageLimits.messagesSent = 0;
            }
            messageLimits.messagesSent += 1;
            this.checkRateLimitBreached(currentTime);
            if (message.length > 0) {
                if (this.quotedMessage.length !== 0) {
                    this.onNewMessage.emit({
                        type: 'text',
                        message,
                    });
                }
                else {
                    this.onNewMessage.emit({ type: 'text', message });
                }
                this.cleanup();
            }
        };
        this.handleEditMessage = () => {
            this.onEditMessage.emit(this.textMessage);
            this.cleanup();
        };
        this.handleEditCancel = () => {
            this.onEditCancel.emit();
            this.cleanup();
        };
        this.onTextChangeHandler = (event) => {
            var _a;
            this.textMessage = event.detail;
            if (this.textMessage.length >= ((_a = this.maxLength) !== null && _a !== void 0 ? _a : MAX_TEXT_LENGTH)) {
                this.disableSendButton = true;
            }
            else if (this.disableSendButton) {
                this.disableSendButton = false;
            }
            gracefulStorage.setItem(this.storageKey, event.detail);
        };
        this.onKeyDownHandler = (event) => {
            if (event.key === 'Enter' && event.shiftKey) {
                return;
            }
            if (this.disableSendButton) {
                return;
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                if (this.isEditing) {
                    this.handleEditMessage();
                }
                else {
                    this.handleSendMessage();
                }
            }
        };
        this.onFileUploadHandler = (type, file) => {
            this.fileToUpload = { type, file };
        };
        this.onQuotedMessageDismissHandler = () => {
            this.onQuotedMessageDismiss.emit();
        };
        this.cleanup = () => {
            this.textMessage = '';
            this.fileToUpload = null;
            gracefulStorage.setItem(this.storageKey, '');
            this.$textComposer.setText('', true);
            this.isEmojiPickerOpen = false;
        };
        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    }
    connectedCallback() {
        this.textMessage = this.message || gracefulStorage.getItem(this.storageKey) || '';
        this.checkRateLimitBreached(Date.now());
    }
    componentWillUpdate() {
        this.textMessage = this.message || gracefulStorage.getItem(this.storageKey) || '';
    }
    componentDidLoad() {
        if (this.message) {
            writeTask(() => this.$textComposer.setText(this.message, true));
        }
    }
    checkRateLimitBreached(currentTime) {
        // Check if the function call is within limits
        if (messageLimits.messagesSent >= this.rateLimits.maxInvocations) {
            this.disableSendButton = true;
            this.rateLimitsBreached = true;
            const timeRemainingForReset = currentTime - messageLimits.startTime + this.rateLimits.period * 1000;
            setTimeout(() => {
                messageLimits.messagesSent = 0;
                messageLimits.startTime = Date.now();
                this.disableSendButton = false;
                this.rateLimitsBreached = false;
            }, timeRemainingForReset);
        }
    }
    render() {
        var _a;
        const uiProps = { iconPack: this.iconPack, t: this.t };
        return (h(Host, { key: '06455539e3067eb1c1c592b551d0ef99eba2f331' }, this.canSendTextMessage && this.isEmojiPickerOpen && (h("rtk-emoji-picker", Object.assign({ key: 'fe83b0ab9562cc0e1c61f89e4b441ef592edfa1a', part: "emoji-picker", onPickerClose: () => {
                this.isEmojiPickerOpen = false;
            }, onRtkEmojiClicked: (e) => {
                this.textMessage += e.detail;
                this.$textComposer.setText(this.textMessage, true);
            } }, uiProps))), h("slot", { key: '8653c2e805e41adf5958941cc10ff01d43f97792', name: "chat-addon" }), this.quotedMessage && this.quotedMessage.length !== 0 && (h("div", { key: '82b9bf5203a799709e980d61ab827b9daf8292e6', class: "quoted-message-container", part: "quoted-message-container" }, h("div", { key: '4b9fe8f382da7075e815c329f2d7dca17ce0f694', class: "quoted-message scrollbar" }, h("rtk-text-message-view", { key: '7a16547e83d9bca43794e46e56c5a9c743a9929a', text: this.quotedMessage, isMarkdown: true })), h("div", { key: '5691b8d882016cda66cd2faf3858bc38cd53458c' }, h("rtk-icon", { key: '2d5b222bd5eaac6d46812b704674f52f86efdb92', "aria-label": this.t('dismiss'), class: "dismiss", icon: this.iconPack.dismiss, onClick: this.onQuotedMessageDismissHandler })))), h("div", { key: 'd7638411df9ae1b2cbef8cae66d0af2b7ad310e6', class: "composer-container" }, h("div", { key: 'ca1ee222584fdd27e53989d28b6ce583c6b0c400', class: "composers" }, this.fileToUpload && (h("rtk-draft-attachment-view", Object.assign({ key: 'd511c900c71a97f8f92640b73a7575dcd267de88' }, uiProps, { attachment: this.fileToUpload, onDeleteAttachment: () => (this.fileToUpload = null) }))), !this.fileToUpload && (h("rtk-text-composer-view", { key: '08f214184853dcedeccb5f07dac2a0a308269793', value: this.textMessage, placeholder: this.inputTextPlaceholder, onTextChange: this.onTextChangeHandler, keyDownHandler: this.onKeyDownHandler, maxLength: (_a = this.maxLength) !== null && _a !== void 0 ? _a : MAX_TEXT_LENGTH, rateLimitBreached: this.rateLimitsBreached, t: this.t, iconPack: this.iconPack, ref: (el) => (this.$textComposer = el) }))), h("div", { key: '9b6cbe7cb8529c8e60f8cc9e13cc95ca64504efc', class: "chat-buttons", part: "chat-buttons" }, h("div", { key: '30e24e8edf58179ef20ccd436d3833ba177ebb0d', class: "left", part: "chat-buttons-left" }, !this.fileToUpload && !this.isEditing && (h("div", { key: '54ad294bedab1c0bc7c02a72c4f3f51bc10bba85' }, this.canSendFiles && [
            h("rtk-file-picker-button", Object.assign({ key: '1a0760e05a183b6c8da2ff02e33ecd40bfdb6e97' }, uiProps, { onFileChange: (event) => this.onFileUploadHandler('file', event.detail) })),
            h("rtk-file-picker-button", Object.assign({ key: '5d6cf1928c8edb6737b367807c93152ad62cea36', filter: "image/*", label: this.t('chat.send_img'), icon: "image", onFileChange: (event) => this.onFileUploadHandler('image', event.detail) }, uiProps)),
        ], this.canSendTextMessage && !this.disableEmojiPicker && (h("rtk-emoji-picker-button", Object.assign({ key: '50f14152b8d15009104e9b1dd05ee5e1ec49ab16', isActive: this.isEmojiPickerOpen, onClick: () => {
                this.isEmojiPickerOpen = !this.isEmojiPickerOpen;
            } }, uiProps))), h("slot", { key: '1e1fe81e1e196fc8d679bfc2d6ed0c6402c74a4a', name: "chat-buttons" })))), h("div", { key: '272526b7c81ed1acd028beceb3869c584e94308f', class: "right", part: "chat-buttons-right" }, !this.isEditing && (h("rtk-tooltip", { key: '6750abf323b2f1c951661c44390eb97d3ec71544', variant: "primary", label: this.t('chat.send_msg'), delay: 2000 }, h("rtk-button", { key: 'a159fa6dcc1f8ede64085abd8286a69ad86b7002', kind: "icon", disabled: this.disableSendButton, onClick: () => this.handleSendMessage(), title: this.t('chat.send_msg') }, h("rtk-icon", { key: 'bb26a3a7954727859f5566ecc60d746ac6700b7b', icon: this.iconPack.send })))), this.isEditing && (h("div", { key: '5ef512e3fc236510a518e76ce027f0c8fc1c9a0c', class: "edit-buttons" }, h("rtk-tooltip", { key: 'e18ae7567350d32b18a70de8cb2c1af0830353bc', variant: "secondary", label: this.t('cancel'), delay: 2000 }, h("rtk-button", { key: '4f4aa2e44308a393314ab95244c87a3b8d4b282c', kind: "icon", variant: "secondary", onClick: () => this.handleEditCancel(), title: this.t('cancel') }, h("rtk-icon", { key: 'a4a99fe9ae34707cb63f63461a4728baf70e3e7a', icon: this.iconPack.dismiss }))), h("rtk-tooltip", { key: '789315dbf551ba74d004459981532fa9a467ac45', variant: "primary", label: this.t('chat.update_msg'), delay: 2000 }, h("rtk-button", { key: '61da43993c2da9b8bd00796544030e9b4cb45f12', kind: "icon", onClick: () => this.handleEditMessage(), title: this.t('chat.send_msg') }, h("rtk-icon", { key: 'e45aab29b0f6553ed2d7f370a8817bdccdabe42e', icon: this.iconPack.checkmark }))))))))));
    }
    static get style() { return RtkChatComposerViewStyle0; }
}, [1, "rtk-chat-composer-view", {
        "canSendTextMessage": [4, "can-send-text-message"],
        "canSendFiles": [4, "can-send-files"],
        "message": [1],
        "quotedMessage": [1, "quoted-message"],
        "storageKey": [1, "storage-key"],
        "inputTextPlaceholder": [1, "input-text-placeholder"],
        "isEditing": [4, "is-editing"],
        "iconPack": [16],
        "t": [16],
        "maxLength": [2, "max-length"],
        "disableEmojiPicker": [4, "disable-emoji-picker"],
        "rateLimits": [16],
        "fileToUpload": [32],
        "isEmojiPickerOpen": [32],
        "disableSendButton": [32],
        "rateLimitsBreached": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkChatComposerView.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChatComposerView.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-chat-composer-view", "rtk-button", "rtk-draft-attachment-view", "rtk-emoji-picker", "rtk-emoji-picker-button", "rtk-file-picker-button", "rtk-icon", "rtk-markdown-view", "rtk-spinner", "rtk-text-composer-view", "rtk-text-message-view", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-chat-composer-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChatComposerView);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "rtk-draft-attachment-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "rtk-emoji-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "rtk-emoji-picker-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "rtk-file-picker-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-text-composer-view":
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

export { RtkChatComposerView as R, defineCustomElement as d };
