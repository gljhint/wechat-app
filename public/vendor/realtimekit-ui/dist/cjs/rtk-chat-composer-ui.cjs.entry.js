'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const chat = require('./chat-dc659214.js');
const index = require('./index-77d3cd4a.js');

const rtkChatComposerUiCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.chat-input{position:relative;margin:var(--rtk-space-2, 8px);z-index:10;box-sizing:border-box;display:flex;flex-direction:column;border-radius:var(--rtk-border-radius-md, 8px);border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60))}textarea{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));box-sizing:border-box;padding:var(--rtk-space-3, 12px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}textarea::-moz-placeholder{color:rgb(var(--rtk-colors-text-1000, 255 255 255))}textarea::placeholder{color:rgb(var(--rtk-colors-text-1000, 255 255 255))}textarea{border-top-left-radius:var(--rtk-border-radius-md, 8px);border-top-right-radius:var(--rtk-border-radius-md, 8px);font-family:var(--rtk-font-family, sans-serif);outline:2px solid transparent;outline-offset:2px;resize:none;overflow-y:auto;border-width:var(--rtk-border-width-none, 0);border-style:none;min-height:60px;font-size:14px}.chat-buttons{border-bottom-right-radius:var(--rtk-border-radius-md, 8px);border-bottom-left-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));display:flex;height:var(--rtk-space-8, 32px);align-items:center;justify-content:space-between;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px)}.chat-buttons .left rtk-button{margin-right:var(--rtk-space-1, 4px)}.chat-buttons .left rtk-button rtk-icon{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px)}.chat-buttons .right{z-index:10}.chat-buttons .right .edit-buttons{display:flex;gap:var(--rtk-space-2, 8px)}.chat-buttons>div{display:flex;align-items:center}rtk-emoji-picker{z-index:0;position:absolute;bottom:var(--rtk-space-32, 128px);border-top:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));animation:0.3s slide-up ease}@keyframes slide-up{from{transform:translateY(100%)}to{transform:translateY(0%)}}.member-list{margin:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-1, 4px);max-height:var(--rtk-space-28, 112px);min-width:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);padding:var(--rtk-space-0, 0px);position:absolute;bottom:var(--rtk-space-28, 112px);list-style-type:none;overflow-y:auto;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-radius:var(--rtk-border-radius-sm, 4px);--tw-border-spacing-x:var(--rtk-space-2, 8px);--tw-border-spacing-y:var(--rtk-space-2, 8px);border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-style:solid;border-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}.member-list .member{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-4, 16px);cursor:pointer}.member-list .member rtk-avatar{flex-shrink:0;height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);font-size:14px;color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.member-list .member span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.member-list .member:hover,.member-list .member.selected{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-700, 2 70 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.suggested-replies{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-3, 12px);display:flex;flex-wrap:nowrap;gap:var(--rtk-space-2, 8px);list-style-type:none;overflow-x:auto}.suggested-replies rtk-tooltip{flex-shrink:0}.suggested-replies li{padding:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-md, 8px);background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.75);color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));cursor:pointer}.suggested-replies li:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity))}.preview-overlay{position:absolute;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));border-radius:var(--rtk-border-radius-md, 8px)}.file-preview{position:absolute;top:var(--rtk-space-4, 16px);left:var(--rtk-space-4, 16px);max-width:-moz-fit-content;max-width:fit-content;max-height:var(--rtk-space-20, 80px)}.file-preview:hover rtk-tooltip{display:block}.file-preview rtk-tooltip{position:absolute;top:calc(var(--rtk-space-1, 4px) * -1);left:calc(var(--rtk-space-1, 4px) * -1);display:none;margin-left:calc(var(--rtk-space-1, 4px) * -1);margin-top:calc(var(--rtk-space-1, 4px) * -1)}.file-preview rtk-button{display:flex;height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);align-items:center;justify-content:center;border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));border:1px solid rgb(var(--rtk-colors-text-1000, 255 255 255))}.file-preview rtk-icon{height:var(--rtk-space-3, 12px);width:var(--rtk-space-3, 12px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.preview-image{height:var(--rtk-space-16, 64px);width:var(--rtk-space-16, 64px);-o-object-fit:cover;object-fit:cover;max-height:100%;max-width:100%;overflow:clip;border-radius:var(--rtk-border-radius-md, 8px)}.preview-file{padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:var(--rtk-border-radius-md, 8px);max-width:200px}@keyframes scroll-text{0%{transform:translateX(0%)}70%{transform:translateX(-100%)}80%{transform:translateX(0%)}100%{transform:translateX(0%)}}";
const RtkChatComposerUiStyle0 = rtkChatComposerUiCss;

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
const MENTION_CHAR = '@';
const RtkChatComposerUi = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onNewMessage = index$1.createEvent(this, "rtkNewMessage", 7);
        this.onEditMessage = index$1.createEvent(this, "rtkEditMessage", 7);
        this.onEditCancelled = index$1.createEvent(this, "rtkEditCancelled", 7);
        /** Whether user can send text messages */
        this.canSendTextMessage = false;
        /** Whether user can send file messages */
        this.canSendFiles = false;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Whether to show emoji picker */
        this.disableEmojiPicker = false;
        /** prefill the composer */
        this.prefill = {};
        /** list of members that can be mentioned */
        this.members = [];
        this.emojiPickerActive = false;
        this.mentionQuery = '';
        this.focusedMemberIndex = 0;
        this.filePreview = null;
        this.fileReader = new FileReader();
        this.fileToUpload = null;
        this.handleKeyDown = (e) => {
            if (e.key === MENTION_CHAR && [undefined, ' '].includes(this.$textArea.value.at(-1))) {
                // [undefined, ' '] checks if mention is start of text or start of new word
                this.mentionQuery = MENTION_CHAR;
            }
            if (e.key === 'ArrowDown') {
                this.focusedMemberIndex = Math.min(this.focusedMemberIndex + 1, this.getFilteredMembers().length - 1);
            }
            if (e.key === 'ArrowUp') {
                this.focusedMemberIndex = Math.max(0, this.focusedMemberIndex - 1);
            }
            if (e.key === 'Escape' || (e.key === 'Backspace' && this.mentionQuery === MENTION_CHAR)) {
                this.mentionQuery = '';
            }
            if (['Enter', 'Tab', ' '].includes(e.key) && this.mentionQuery !== '') {
                const member = this.getFilteredMembers()[this.focusedMemberIndex];
                this.onMemberSelect(member);
                e.preventDefault();
                return;
            }
            // slack like typing experience
            if (e.key === 'Enter' && e.shiftKey) {
                const height = this.$textArea.clientHeight;
                if (height < 200) {
                    this.$textArea.style.height = this.$textArea.clientHeight + 20 + 'px';
                }
            }
            else if (e.key === 'Enter') {
                e.preventDefault();
                if (this.prefill.editMessage) {
                    this.handleEditMessage();
                }
                else {
                    this.handleSendMessage();
                }
            }
            else if (e.key === 'Backspace') {
                if (this.$textArea.value.endsWith('\n')) {
                    this.$textArea.style.height = this.$textArea.clientHeight - 20 + 'px';
                }
                else if (this.$textArea.value === '') {
                    this.$textArea.style.height = 'auto';
                }
            }
        };
        this.handleKeyUp = (_e) => {
            if (this.mentionQuery !== '') {
                const reversed = chat.reverse(this.$textArea.value.trim());
                const query = reversed.substring(0, reversed.indexOf(MENTION_CHAR));
                this.mentionQuery = `${MENTION_CHAR}${chat.reverse(query)}`;
            }
        };
        this.onPaste = (e) => {
            const data = e.clipboardData || e.originalEvent.clipboardData;
            index$1.writeTask(() => {
                if (data && data.items && data.items.length > 0) {
                    chat.handleFilesDataTransfer(data.items, this.generateFilePreview);
                    this.$textArea.value = '';
                }
            });
        };
        this.generateFilePreview = (type, file) => {
            this.fileToUpload = { type, image: file, file };
            if (type === 'image') {
                this.fileReader.readAsDataURL(file);
            }
            else if (type === 'file') {
                this.filePreview = file.name;
            }
        };
        this.sendFile = () => {
            if (!this.canSendFiles) {
                return;
            }
            if (this.fileToUpload.type === 'image') {
                this.onNewMessage.emit({
                    type: 'image',
                    file: this.fileToUpload.image,
                    image: this.fileToUpload.image,
                });
            }
            else {
                this.onNewMessage.emit({ type: 'file', file: this.fileToUpload.file });
            }
            this.cleanUpFileUpload();
        };
        this.handleSendMessage = () => {
            if (!this.canSendTextMessage) {
                return;
            }
            if (this.fileToUpload !== null) {
                this.sendFile();
                return;
            }
            const message = this.$textArea.value.trim();
            if (message.length > 0) {
                if (this.prefill.replyMessage) {
                    this.onNewMessage.emit({
                        type: 'text',
                        message,
                        replyTo: this.prefill.replyMessage,
                    });
                }
                else {
                    this.onNewMessage.emit({ type: 'text', message });
                }
                this.cleanup();
            }
        };
        this.cleanup = () => {
            this.mentionQuery = '';
            this.focusedMemberIndex = 0;
            this.$textArea.value = '';
            this.$textArea.style.height = 'auto';
            uiStore.gracefulStorage.setItem(this.storageKey, '');
        };
        this.handleEditMessage = () => {
            var _a;
            let editedMessage = this.$textArea.value.trim();
            if (((_a = this.prefill.editMessage) === null || _a === void 0 ? void 0 : _a.message) &&
                chat.replyBlockPattern.test(this.prefill.editMessage.message)) {
                // add back the reply block which we stripped out for editing
                const replyBlock = chat.extractReplyBlock(this.prefill.editMessage.message);
                editedMessage = `${replyBlock}\n\n${editedMessage}`;
            }
            this.onEditMessage.emit({
                id: this.prefill.editMessage.id,
                message: editedMessage,
                channelId: this.prefill.editMessage.channelId,
            });
            this.cleanup();
        };
        this.handleEditCancel = () => {
            this.onEditCancelled.emit();
            this.cleanup();
        };
        this.initializeTextField = (el) => {
            this.$textArea = el;
            const message = uiStore.gracefulStorage.getItem(this.storageKey) || '';
            this.$textArea.value = message;
        };
        this.onMemberSelect = (member) => {
            const reversedQuery = chat.reverse(this.mentionQuery);
            const reversed = chat.reverse(this.$textArea.value.trim()).replace(reversedQuery, '');
            this.$textArea.value = chat.reverse(reversed) + `${MENTION_CHAR}${member.name} `;
            this.mentionQuery = '';
            this.focusedMemberIndex = 0;
            index$1.writeTask(() => this.$textArea.focus());
        };
        this.getFilteredMembers = () => {
            const query = this.mentionQuery.replace(MENTION_CHAR, '');
            return this.members.filter((member) => member.name.toLowerCase().includes(query.toLowerCase()));
        };
        this.cleanUpFileUpload = () => {
            this.filePreview = null;
            this.fileToUpload = null;
        };
        this.renderSuggestedReplies = () => {
            if (!this.prefill.suggestedReplies)
                return;
            if (this.prefill.suggestedReplies.length === 0)
                return;
            return (index$1.h("ul", { class: "suggested-replies scrollbar" }, this.prefill.suggestedReplies.map((reply) => (index$1.h("rtk-tooltip", { label: this.t('chat.click_to_send') }, index$1.h("li", { onClick: () => this.onNewMessage.emit({ type: 'text', message: reply }) }, reply))))));
        };
        this.renderMenu = () => {
            if (this.mentionQuery.length === 0)
                return;
            const filteredMembers = this.getFilteredMembers();
            if (filteredMembers.length === 0)
                return;
            return (index$1.h("ul", { class: "member-list scrollbar" }, filteredMembers.map((member, index) => (index$1.h("li", { class: { member: true, selected: index === this.focusedMemberIndex }, onClick: () => this.onMemberSelect(member), ref: ($li) => {
                    if (index === this.focusedMemberIndex) {
                        index$1.writeTask(() => {
                            if ($li)
                                $li.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                        });
                    }
                } }, index$1.h("rtk-avatar", { participant: {
                    name: member.name,
                    picture: member.picture,
                }, size: "sm" }), index$1.h("span", null, member.name))))));
        };
    }
    connectedCallback() {
        this.fileReader.onload = (e) => {
            if (typeof e.target.result === 'string') {
                this.filePreview = e.target.result;
            }
        };
        // this.fileReader.onloadstart = () => {};
        // this.fileReader.onloadend = () => {};
    }
    onChannelChanged() {
        this.mentionQuery = '';
        this.focusedMemberIndex = 0;
        const message = uiStore.gracefulStorage.getItem(this.storageKey) || '';
        this.$textArea.value = message;
        this.emojiPickerActive = false;
    }
    componentDidRender() {
        if (this.prefill.editMessage || this.prefill.replyMessage) {
            index$1.writeTask(() => this.$textArea.focus());
        }
    }
    get storageKey() {
        if (this.channelId) {
            return `rtk-text-message-${this.channelId}`;
        }
        return 'rtk-text-message';
    }
    uploadFile(type) {
        const input = document.createElement('input');
        input.type = 'file';
        if (type === 'image') {
            input.accept = 'image/*';
        }
        input.onchange = (e) => {
            const { validity, files: [file], } = e.target;
            if (validity.valid) {
                this.generateFilePreview(type, file);
            }
        };
        input.click();
    }
    renderFilePreview() {
        if (typeof this.filePreview !== 'string')
            return;
        return (index$1.h("div", { class: "preview-overlay" }, index$1.h("div", { class: "file-preview" }, index$1.h("rtk-tooltip", { label: this.t('chat.cancel_upload') }, index$1.h("rtk-button", { variant: "secondary", kind: "icon", onClick: this.cleanUpFileUpload }, index$1.h("rtk-icon", { icon: this.iconPack.dismiss }))), this.fileToUpload.type === 'image' ? (index$1.h("img", { class: "preview-image", src: this.filePreview })) : (index$1.h("div", { class: "preview-file" }, index$1.h("span", null, this.filePreview))))));
    }
    render() {
        var _a;
        let defaultValue = '';
        if ((_a = this.prefill.editMessage) === null || _a === void 0 ? void 0 : _a.message) {
            defaultValue = chat.stripOutReplyBlock(this.prefill.editMessage.message);
        }
        return (index$1.h(index$1.Host, { key: '0550423a075a5e445ebae18e70213e17dd79c6ff' }, this.canSendTextMessage && this.emojiPickerActive && (index$1.h("rtk-emoji-picker", { key: '89eaa1c1e0ae3da8fed3c203fd87a19cd5f19b8e', part: "emoji-picker", onPickerClose: () => {
                this.emojiPickerActive = false;
            }, onRtkEmojiClicked: (e) => {
                this.$textArea.value += e.detail;
                this.$textArea.focus();
            }, t: this.t })), this.renderSuggestedReplies(), index$1.h("slot", { key: '6da586002dff47002d856c0204dee2bbe8571236', name: "chat-addon" }), index$1.h("slot", { key: 'fa285ac5f4fb88ddcc3aa9b6a294d12b09cd94e9', name: "quote-block" }), index$1.h("div", { key: 'c71568bf5344f9fcd3be019d02ca4bf1a8a9d9b8', class: "chat-input", part: "chat-input" }, this.renderMenu(), this.canSendTextMessage && (index$1.h("textarea", { key: 'ec57005f4795fefdaaba266d9e891853a5bded1f', class: "scrollbar", part: "textarea", ref: this.initializeTextField, autoFocus: true, placeholder: this.fileToUpload ? '' : this.t('chat.message_placeholder'), value: defaultValue, onPaste: this.onPaste, maxLength: chat.MAX_TEXT_LENGTH, onKeyDown: this.handleKeyDown, onKeyUp: this.handleKeyUp, onInput: (e) => {
                uiStore.gracefulStorage.setItem(this.storageKey, e.target.value);
            }, disabled: !!this.filePreview })), index$1.h("div", { key: '322d141483c79366ef59dee65a5072a6f437a64a', class: "chat-buttons", part: "chat-buttons" }, index$1.h("div", { key: 'cb287e6ced3bb48f445af933a99a1f8100ac41c6', class: "left", part: "chat-buttons-left" }, !this.prefill.editMessage &&
            this.canSendFiles && [
            index$1.h("rtk-tooltip", { key: '78c91b6a2097013f3da368086e868d2d465ec9cb', label: this.t('chat.send_file') }, index$1.h("rtk-button", { key: '278e56e0d1d012c658a74a07aece9f07fb13b486', variant: "ghost", kind: "icon", onClick: () => this.uploadFile('file'), title: this.t('chat.send_file') }, index$1.h("rtk-icon", { key: 'f0551578a82d14a0313044c257a2cd04b8a4320e', icon: this.iconPack.attach }))),
            index$1.h("rtk-tooltip", { key: 'f1f658aece9261ff928f631b78545bfc2cc6b99e', label: this.t('chat.send_img') }, index$1.h("rtk-button", { key: '31e9bb3127886607cb630db538b6acdc405df324', variant: "ghost", kind: "icon", onClick: () => this.uploadFile('image'), title: this.t('chat.send_img') }, index$1.h("rtk-icon", { key: '66f46b7128dcbb041a2e35a5a9d61eb087aae126', icon: this.iconPack.image }))),
        ], !this.prefill.editMessage && this.canSendTextMessage && !this.disableEmojiPicker && (index$1.h("rtk-tooltip", { key: '28524998014e48efa944db921c6ebaa644f7522c', label: this.t('chat.send_emoji') }, index$1.h("rtk-button", { key: '2ab4710a53f8c399b94fdf89d8b3e26ecdfb38c9', variant: "ghost", kind: "icon", class: { active: this.emojiPickerActive }, title: this.t('chat.send_emoji'), onClick: () => {
                this.emojiPickerActive = !this.emojiPickerActive;
            } }, index$1.h("rtk-icon", { key: 'eb26faa361adb34eb7afbd013c21a5039e32292d', icon: this.iconPack.emoji_multiple }))))), !!this.filePreview && this.renderFilePreview(), this.canSendTextMessage && (index$1.h("div", { key: '820a5ff20514c9802d3612045f36d95d2358dcda', class: "right", part: "chat-buttons-right" }, !this.prefill.editMessage && (index$1.h("rtk-tooltip", { key: '405fb291f728f2afa6940a82cbc16777e8eba2bc', variant: "primary", label: this.t('chat.send_msg'), delay: 2000 }, index$1.h("rtk-button", { key: '4bff2c0bf52fc35da61d67760d82943b4516c358', kind: "icon", onClick: () => this.handleSendMessage(), title: this.t('chat.send_msg') }, index$1.h("rtk-icon", { key: 'd5294b068fbb1e60bdccb899b7931c03e4fb9eb1', icon: this.iconPack.send })))), this.prefill.editMessage && (index$1.h("div", { key: '995aa908ccab6ab22252d78ddefed672474f56a0', class: "edit-buttons" }, index$1.h("rtk-tooltip", { key: '2429c8023b38ba99c8e0b3a66206f719ce0e1932', variant: "secondary", label: this.t('cancel'), delay: 2000 }, index$1.h("rtk-button", { key: '2fbaa972db33e50976661f4a02a3be9d67ec78fa', kind: "icon", variant: "secondary", onClick: () => this.handleEditCancel(), title: this.t('cancel') }, index$1.h("rtk-icon", { key: '3466f90521e92efe325dec9bd7c3419f726713d8', icon: this.iconPack.dismiss }))), index$1.h("rtk-tooltip", { key: '84af3b7940bcdeec414e42cbda84359154a19a19', variant: "primary", label: this.t('chat.update_msg'), delay: 2000 }, index$1.h("rtk-button", { key: '580af6cecb00e77994e688a9bd70b63aeb1f0782', kind: "icon", onClick: () => this.handleEditMessage(), title: this.t('chat.send_msg') }, index$1.h("rtk-icon", { key: 'a6266954cfa1ffbcc6e3606bfe993e54e3f5c5ee', icon: this.iconPack.checkmark })))))))))));
    }
    static get watchers() { return {
        "channelId": ["onChannelChanged"]
    }; }
};
__decorate([
    index.SyncWithStore()
], RtkChatComposerUi.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkChatComposerUi.prototype, "t", void 0);
RtkChatComposerUi.style = RtkChatComposerUiStyle0;

exports.rtk_chat_composer_ui = RtkChatComposerUi;
