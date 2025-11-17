'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const string = require('./string-a410fab6.js');
const index = require('./index-77d3cd4a.js');
const debounce = require('./debounce-4f18d7a5.js');
const chat = require('./chat-dc659214.js');
const ChatHead = require('./ChatHead-d2f094ec.js');
const scroll = require('./scroll-c6404609.js');
const index$2 = require('./index-821d14b7.js');
const file = require('./file-33e9ed90.js');
const merge = require('./merge-1094ad20.js');
const notification = require('./notification-bd49ad87.js');
const ResizeObserver_es = require('./ResizeObserver.es-ba961f16.js');
const floatingUi_dom_esm = require('./floating-ui.dom.esm-705e65f3.js');
const TextMessage = require('./TextMessage-0e7b715b.js');

const rtkAvatarCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:var(--rtk-space-32, 128px);width:var(--rtk-space-32, 128px);align-items:center;justify-content:center;font-size:28px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));overflow:clip;border-radius:9999px;-webkit-user-select:none;-moz-user-select:none;user-select:none}rtk-icon{height:50%;width:50%}.image-ctr{display:flex;height:100%;width:100%;align-items:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}img{height:var(--rtk-space-0, 0px);width:var(--rtk-space-0, 0px);-o-object-fit:cover;object-fit:cover}img.loaded{height:100%;width:100%}.initials{display:flex;height:100%;width:100%;align-items:center;justify-content:center;text-transform:uppercase}.image{display:flex;height:100%;width:100%;align-items:center;justify-content:center}.image img{display:none;height:100%;width:100%;-o-object-fit:cover;object-fit:cover}.image img.loaded{display:block}:host([variant='hexagon']){border-radius:var(--rtk-border-radius-none, 0);clip-path:polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)}:host([variant='square']){border-radius:var(--rtk-border-radius-none, 0);clip-path:polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)}:host([size='sm']){height:var(--rtk-space-14, 56px);width:var(--rtk-space-14, 56px);font-size:12px}:host([size='md']){height:var(--rtk-space-28, 112px);width:var(--rtk-space-28, 112px)}:host([size='lg']){height:var(--rtk-space-32, 128px);width:var(--rtk-space-32, 128px)}";
const RtkAvatarStyle0 = rtkAvatarCss;

var __decorate$L = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkAvatar = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Avatar type */
        this.variant = 'circular';
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.imageState = 'loading';
        this.getAvatar = () => {
            var _a;
            const name = string.formatName(((_a = this.participant) === null || _a === void 0 ? void 0 : _a.name) || '');
            let picture;
            if (this.participant != null && 'picture' in this.participant) {
                picture = this.participant.picture;
            }
            if (picture && picture.length > 0 && this.imageState !== 'errored') {
                return (index$1.h("div", { class: "image-ctr" }, this.imageState === 'loading' && index$1.h("rtk-spinner", { iconPack: this.iconPack }), index$1.h("img", { src: picture, class: { loaded: this.imageState === 'loaded' }, loading: "lazy", title: name, onLoad: () => (this.imageState = 'loaded'), onError: () => (this.imageState = 'errored'), part: "image" })));
            }
            const initials = string.getInitials(name);
            return (index$1.h("div", { class: "initials", title: name, part: "initials" }, initials));
        };
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'c1a0be37edb75c40b275ad59af85cee7df3f1cdf' }, this.getAvatar(), index$1.h("slot", { key: '1cd71e7494a09d68a52051edc279911dc3168515' })));
    }
};
__decorate$L([
    index.SyncWithStore()
], RtkAvatar.prototype, "iconPack", void 0);
__decorate$L([
    index.SyncWithStore()
], RtkAvatar.prototype, "t", void 0);
RtkAvatar.style = RtkAvatarStyle0;

const rtkBreakoutRoomManagerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));border-radius:var(--rtk-border-radius-sm, 4px)}@keyframes bg-glow{25%{background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / 0.2)}50%{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}75%{background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / 0.2)}}.glowing-card{animation:bg-glow 0.8s}.selector-mode,.assign-mode{display:flex;flex-direction:column;align-items:center;padding:var(--rtk-space-2, 8px);cursor:pointer}.selector:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.show-on-hover{display:none}.header{width:100%;display:flex;align-items:center}.header rtk-icon{margin-left:var(--rtk-space-2, 8px);height:var(--rtk-space-5, 20px);cursor:pointer}.header .danger{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.header .hide{display:none}.header .rooms-container{display:flex;flex-grow:1;flex-direction:row;align-items:center;justify-content:flex-end}.header input{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--rtk-space-1, 4px);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));max-width:var(--rtk-space-36, 144px);font-size:14px;font-weight:500;border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;border-bottom-width:var(--rtk-border-width-sm, 1px);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-border-opacity))}.header input:disabled{overflow-x:visible;border-radius:var(--rtk-border-radius-none, 0);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent}.header input:invalid{border-bottom-width:var(--rtk-border-width-sm, 1px);border-style:dashed;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-border-opacity))}.header input.editing-enabled{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}.header .participant-count{display:flex;align-items:center;font-size:14px;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.header .participant-count rtk-icon{margin:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-0\\.5, 2px);width:var(--rtk-space-3, 12px)}.header .assign-button{height:var(--rtk-space-6, 24px);--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity));text-decoration-line:underline}.header .assign-button:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.participant-list{display:grid;flex-grow:1;grid-template-columns:repeat(2, minmax(0, 1fr));gap:var(--rtk-space-2, 8px);margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-2, 8px);width:100%;border-radius:var(--rtk-border-radius-sm, 4px)}.participant-list::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px)}.participant-list::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.participant-list::-webkit-scrollbar-track{border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.participant-item{display:flex;align-items:center;justify-content:space-between;margin-right:var(--rtk-space-2, 8px);height:-moz-fit-content;height:fit-content;padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px)}.participant-item:hover{border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.selector-mode:hover .show-on-hover{display:flex}.message-container{margin:var(--rtk-space-0, 0px);display:flex;width:100%;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px)}.message-container p{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);height:var(--rtk-space-20, 80px);display:flex;width:100%;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);font-size:12px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));border-style:dashed;--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-border-opacity))}.message-container p:hover{--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-border-opacity));background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / 0.25)}.message-container .drop-zone-active{--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-border-opacity));background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / 0.25)}rtk-icon{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px)}.show-on-hover{margin-left:var(--rtk-space-4, 16px);height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);display:none}:host(:hover) .show-on-hover{display:flex}.peer-ui-container{position:relative;display:flex;align-items:center;gap:var(--rtk-space-2, 8px);height:var(--rtk-space-10, 40px);cursor:pointer;border-radius:var(--rtk-border-radius-sm, 4px);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.peer-ui-container rtk-avatar{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.peer-ui-container .name{font-size:14px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}";
const RtkBreakoutRoomManagerStyle0 = rtkBreakoutRoomManagerCss;

var __decorate$K = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ROOM_TITLE_MIN_CHARS = 3;
const RtkBreakoutRoomManager = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onParticipantsAdd = index$1.createEvent(this, "participantsAdd", 7);
        this.onParticipantDelete = index$1.createEvent(this, "participantDelete", 7);
        this.onRoomJoin = index$1.createEvent(this, "roomJoin", 7);
        this.deleteRoom = index$1.createEvent(this, "delete", 7);
        this.updateRoom = index$1.createEvent(this, "update", 7);
        /** allow room delete */
        this.allowDelete = true;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Drag mode */
        this.isDragMode = false;
        /** display expanded card by default */
        this.defaultExpanded = false;
        this.editingTitleRoomId = null;
        this.newTitle = null;
        this.showExpandedCard = false;
        this.glowingCard = false;
        this.permissionsUpdateListener = () => {
            this.permissions = this.meeting.self.permissions.connectedMeetings;
        };
        this.reset = () => {
            this.editingTitleRoomId = null;
            this.newTitle = null;
        };
        this.onEditClick = () => {
            if (this.editingTitleRoomId) {
                if (this.newTitle.length < ROOM_TITLE_MIN_CHARS)
                    return;
                this.roomTitle = this.newTitle;
                this.updateRoom.emit({
                    title: this.newTitle,
                    id: this.editingTitleRoomId,
                });
                this.glowCard();
                this.reset();
            }
            else {
                this.editingTitleRoomId = this.room.id;
                index$1.writeTask(() => {
                    this.inputTextEl.focus();
                    this.inputTextEl.select();
                });
            }
        };
        this.onDrop = (e) => {
            if (e.currentTarget instanceof HTMLParagraphElement) {
                e.currentTarget.classList.remove('drop-zone-active');
                this.onAssign();
            }
        };
        this.onDragOver = (e) => {
            if (e.currentTarget instanceof HTMLParagraphElement) {
                e.currentTarget.classList.add('drop-zone-active');
                e.preventDefault();
            }
        };
    }
    connectedCallback() {
        var _a;
        this.allParticipants = uiStore.getAllConnectedParticipants(this.meeting);
        this.permissionsUpdateListener();
        this.showExpandedCard = this.defaultExpanded;
        this.roomTitle = this.room.isParent ? this.t('breakout_rooms.main_room') : (_a = this.room) === null || _a === void 0 ? void 0 : _a.title;
        this.canEditMeetingTitle =
            this.permissions.canAlterConnectedMeetings &&
                !this.room.isParent &&
                !this.meeting.connectedMeetings.isActive; // TODO: remove this once socket supports update meetings
        this.meeting.self.permissions.on('permissionsUpdate', this.permissionsUpdateListener);
    }
    disconnectedCallback() {
        this.meeting.self.permissions.off('permissionsUpdate', this.permissionsUpdateListener);
    }
    onDragLeave(e) {
        if (e.currentTarget instanceof HTMLParagraphElement) {
            e.currentTarget.classList.remove('drop-zone-active');
        }
    }
    getAssignmentHint() {
        if (this.assigningParticipants && this.isDragMode) {
            return this.t('breakout_rooms.drag_drop_participants');
        }
        if (this.assigningParticipants) {
            return this.t('breakout_rooms.click_drop_participants');
        }
        if (this.room.participants.length === 0) {
            return this.t('breakout_rooms.none_assigned');
        }
    }
    toggleCardDisplay() {
        this.showExpandedCard = !this.showExpandedCard;
    }
    glowCard() {
        this.glowingCard = true;
        setTimeout(() => {
            this.glowingCard = false;
        }, 2000);
    }
    onAssign() {
        this.onParticipantsAdd.emit();
        this.glowCard();
    }
    onJoin() {
        this.onRoomJoin.emit();
    }
    onTitleChanged(e) {
        if (e.key === 'Enter') {
            this.newTitle = e.target.value;
            this.onEditClick();
        }
    }
    renderPeer(participant) {
        const { displayPictureUrl: picture } = this.allParticipants.find((p) => uiStore.participantIdentifier(p) === uiStore.participantIdentifier(participant));
        const name = string.formatName(participant.displayName || '');
        return (index$1.h("div", { class: "peer-ui-container" }, index$1.h("rtk-avatar", { participant: { name, picture }, size: "sm" }), index$1.h("p", { class: "name", title: name }, string.shorten(name, 16), this.meeting.self.userId === participant.id && ` (${this.t('you')})`)));
    }
    renderExpandedCardMaybe() {
        if (!this.showExpandedCard)
            return;
        if (this.room.isParent)
            return;
        if (!this.getAssignmentHint())
            return;
        if (!this.permissions.canAlterConnectedMeetings)
            return;
        return (index$1.h("div", { class: "message-container" }, index$1.h("p", { class: { 'compact-height': this.room.participants.length !== 0 }, onClick: () => this.onAssign(), onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop }, this.getAssignmentHint())));
    }
    renderParticipantsMaybe() {
        if (!this.showExpandedCard)
            return;
        if (this.room.isParent)
            return;
        if (this.room.participants.length === 0)
            return;
        return (index$1.h("div", { class: "participant-list", onClick: () => {
                this.onAssign();
            } }, this.room.participants.map((participant) => (index$1.h("div", { class: "participant-item", role: "listitem", key: participant.id }, this.renderPeer(participant), this.permissions.canAlterConnectedMeetings && (index$1.h("rtk-icon", { class: "show-on-hover", icon: this.iconPack.dismiss, onClick: () => {
                this.onParticipantDelete.emit(participant);
            } })))))));
    }
    render() {
        var _a, _b, _c;
        if (!this.meeting)
            return null;
        return (index$1.h(index$1.Host, null, index$1.h("div", { class: {
                'assign-mode': this.assigningParticipants,
                'selector-mode': !this.assigningParticipants,
                'glowing-card': this.glowingCard,
            } }, index$1.h("div", { class: "header" }, index$1.h("input", { ref: (el) => (this.inputTextEl = el), placeholder: this.t('breakout_rooms.room_name'), disabled: !(this.editingTitleRoomId === this.room.id), value: this.roomTitle, minlength: ROOM_TITLE_MIN_CHARS, onChange: (e) => {
                this.newTitle = e.target.value;
            }, onKeyPress: (e) => this.onTitleChanged(e), class: { 'editing-enabled': this.editingTitleRoomId === this.room.id }, style: { width: `${this.roomTitle.length + 1}ch` } }), this.editingTitleRoomId !== this.room.id && (index$1.h("span", { class: "participant-count" }, "(", index$1.h("rtk-icon", { icon: this.iconPack.people }), (_c = (_b = (_a = this.room) === null || _a === void 0 ? void 0 : _a.participants) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : '0', ")")), this.canEditMeetingTitle && (index$1.h("rtk-tooltip", { label: this.editingTitleRoomId === this.room.id
                ? this.t('breakout_rooms.save_room_name')
                : this.t('breakout_rooms.edit_room_name') }, index$1.h("rtk-icon", { icon: this.editingTitleRoomId === this.room.id
                ? this.iconPack.checkmark
                : this.iconPack.edit, class: "show-on-hover", onClick: this.onEditClick }))), index$1.h("div", { class: "rooms-container" }, this.permissions.canAlterConnectedMeetings &&
            !this.room.isParent &&
            this.allowDelete && (index$1.h("rtk-tooltip", { label: this.t('breakout_rooms.delete'), class: "danger" }, index$1.h("rtk-icon", { icon: this.iconPack.delete, class: "show-on-hover", onClick: () => {
                this.deleteRoom.emit();
            } }))), this.assigningParticipants &&
            this.permissions.canAlterConnectedMeetings &&
            !this.room.isParent && (index$1.h("rtk-button", { kind: "button", variant: "ghost", class: "assign-button", size: "md", onClick: () => this.onAssign() }, this.t('breakout_rooms.assign'))), this.mode === 'edit' &&
            !this.assigningParticipants &&
            this.permissions.canSwitchConnectedMeetings && (index$1.h("rtk-button", { kind: "button", variant: "ghost", class: "assign-button", size: "md", disabled: this.room.id === this.meeting.meta.meetingId, onClick: () => this.onJoin() }, this.room.id === this.meeting.meta.meetingId
            ? this.t('joined')
            : this.t('join'))), !this.room.isParent && (index$1.h("rtk-icon", { icon: this.showExpandedCard ? this.iconPack.chevron_up : this.iconPack.chevron_down, onClick: () => this.toggleCardDisplay() })))), this.renderExpandedCardMaybe(), this.renderParticipantsMaybe())));
    }
};
__decorate$K([
    index.SyncWithStore()
], RtkBreakoutRoomManager.prototype, "meeting", void 0);
__decorate$K([
    index.SyncWithStore()
], RtkBreakoutRoomManager.prototype, "states", void 0);
__decorate$K([
    index.SyncWithStore()
], RtkBreakoutRoomManager.prototype, "iconPack", void 0);
__decorate$K([
    index.SyncWithStore()
], RtkBreakoutRoomManager.prototype, "t", void 0);
RtkBreakoutRoomManager.style = RtkBreakoutRoomManagerStyle0;

const rtkBreakoutRoomParticipantsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{display:flex;height:100%;flex-direction:column;font-size:14px}:host input[type='checkbox']{margin:var(--rtk-space-0, 0px);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rtk-border-radius-sm, 4px);position:relative;height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);border-width:var(--rtk-border-width-sm, 1px);border-style:solid;border-color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}:host input[type='checkbox']:checked{--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}:host input[type='checkbox']:checked::before{position:absolute;top:1px;left:1px;height:var(--rtk-space-3, 12px);width:var(--rtk-space-3, 12px);background-color:rgb(var(--rtk-colors-text-1000, 255 255 255));content:'';clip-path:polygon(5% 60%, 35% 93%, 100% 19%, 86% 4%, 36% 62%, 19% 44%)}*{box-sizing:border-box}.participants{margin-top:var(--rtk-space-2, 8px);padding:var(--rtk-space-0, 0px)}.ctr{box-sizing:border-box;padding-top:var(--rtk-space-0, 0px);padding-bottom:var(--rtk-space-0, 0px);overflow-y:auto;flex-grow:1;flex-basis:0}.empty-message{margin-top:var(--rtk-space-10, 40px);margin-bottom:var(--rtk-space-10, 40px);text-align:center;font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.empty-room{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--rtk-space-2, 8px);height:100%;text-align:center;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.empty-room rtk-icon{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px)}.empty-room p{font-size:16px;font-weight:500;margin:var(--rtk-space-0, 0px)}.empty-room span{font-size:12px;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.search-wrapper{margin-bottom:var(--rtk-space-1, 4px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}.search{position:sticky;box-sizing:border-box;display:flex;align-items:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);height:var(--rtk-space-8, 32px)}.search .search-icon{margin-left:var(--rtk-space-2, 8px);margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.search input{box-sizing:border-box;width:100%;padding-right:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:inherit;color:rgb(var(--rtk-colors-text-1000, 255 255 255));outline:2px solid transparent;outline-offset:2px;border-radius:var(--rtk-border-radius-sm, 4px);font-size:14px}.search input::-moz-placeholder{color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.search input::placeholder{color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.header{margin-left:var(--rtk-space-2, 8px);margin-right:var(--rtk-space-1\\.5, 6px);height:var(--rtk-space-9, 36px);padding-top:var(--rtk-space-3, 12px);padding-bottom:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-0\\.5, 2px);border-bottom-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-none, 0);border-left-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-border-opacity));font-size:12px;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));display:flex;align-items:center;justify-content:space-between}.title-wrapper{display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}.participant-count{display:flex;align-items:center;font-size:14px}.participant-count rtk-icon{margin-right:var(--rtk-space-0\\.5, 2px);width:var(--rtk-space-3, 12px)}.participant-item{display:flex;align-items:center;justify-content:space-between;margin-top:var(--rtk-space-1, 4px);margin-bottom:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-sm, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);cursor:pointer}.participant-item input.hide-checkbox{display:none}.participant-item input:checked{display:inline-block}.dragging input{display:none}.participant-item:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.participant-item:hover input{display:inline-block}.peer-ui-container{position:relative;display:flex;align-items:center;gap:var(--rtk-space-2, 8px);height:var(--rtk-space-10, 40px);cursor:pointer;border-radius:var(--rtk-border-radius-sm, 4px);color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.peer-ui-container rtk-avatar{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.peer-ui-container .name{font-size:14px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}";
const RtkBreakoutRoomParticipantsStyle0 = rtkBreakoutRoomParticipantsCss;

var __decorate$J = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkBreakoutRoomParticipants = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onSelectedParticipantsUpdate = index$1.createEvent(this, "selectedParticipantsUpdate", 7);
        this.onAllToggled = index$1.createEvent(this, "allParticipantsToggleUpdate", 7);
        this.onParticipantsDragging = index$1.createEvent(this, "participantsDragging", 7);
        /** Participant ids */
        this.participantIds = [];
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.search = '';
        this.participantsToShow = [];
        /** selected participants */
        this.selectedParticipantIds = [];
        this.isDragging = false;
        this.onSearchInput = (e) => {
            this.search = e.target.value;
        };
        this.onDragStart = (participant) => {
            this.isDragging = true;
            this.onParticipantsDragging.emit(true);
            this.updateSelectedParticipants(participant, true);
        };
        this.onDragEnd = (participant) => {
            this.isDragging = false;
            this.onParticipantsDragging.emit(false);
            this.updateSelectedParticipants(participant, false);
        };
        this.onClick = (participant) => {
            const selected = this.selectedParticipantIds.includes(uiStore.participantIdentifier(participant));
            this.updateSelectedParticipants(participant, !selected);
        };
        this.onToggleAll = (checked) => {
            const selectedParticipants = checked ? this.participantsToShow.map(uiStore.participantIdentifier) : [];
            this.onAllToggled.emit(selectedParticipants);
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
        this.searchChanged(this.search);
    }
    disconnectedCallback() {
        if (!this.meeting)
            return;
    }
    updateSelectedParticipants(participant, selected) {
        const id = uiStore.participantIdentifier(participant);
        let selectedParticipants = [];
        if (selected && !this.selectedParticipantIds.includes(id)) {
            selectedParticipants = [...this.selectedParticipantIds, id];
        }
        else {
            selectedParticipants = [...this.selectedParticipantIds.filter((x) => x !== id)];
        }
        this.onSelectedParticipantsUpdate.emit(selectedParticipants);
    }
    meetingChanged(meeting) {
        if (!meeting)
            return;
        this.getParticipants(this.search);
    }
    participantsChanged() {
        this.getParticipants(this.search);
    }
    searchChanged(search) {
        this.getParticipants(search);
    }
    getParticipants(search) {
        const allParticipants = uiStore.getAllConnectedParticipants(this.meeting);
        this.participantsToShow = allParticipants.filter((participant) => {
            var _a;
            return (this.participantIds.includes(uiStore.participantIdentifier(participant)) &&
                ((_a = participant.displayName) !== null && _a !== void 0 ? _a : '').toLowerCase().includes(search.toLowerCase()));
        });
    }
    renderPeer(participant) {
        const name = string.formatName(participant.displayName || '');
        return (index$1.h("div", { class: "peer-ui-container" }, index$1.h("rtk-avatar", { participant: {
                name: participant.displayName,
                picture: participant.displayPictureUrl,
            }, size: "sm" }), index$1.h("p", { class: "name", title: name }, string.shorten(name, 16), this.meeting.self.userId === participant.id && ` (${this.t('you')})`)));
    }
    render() {
        return (index$1.h(index$1.Host, { key: '3d6466a85fa946d5c0d064d22431e3c7bf044787' }, index$1.h("div", { key: '8626af199d5290ce595212817ee06c1ef00d91bf', class: "search-wrapper" }, index$1.h("div", { key: '9ac706f201f5975b7d36b4dde7fd9504321b7d5f', class: "search", part: "search" }, index$1.h("rtk-icon", { key: '0ccba51717c665364934ea1bfdd7eeea3c5e96b7', icon: this.iconPack.search, part: "search-icon", class: "search-icon" }), index$1.h("input", { key: '01c85631f3e1823d1ab384bad4a9efbd86514894', type: "search", autocomplete: "off", placeholder: this.t('search'), onInput: this.onSearchInput, part: "search-input" })), index$1.h("slot", { key: '9d3a00a2bd167d053025d979bb0a498028b664de', name: "shuffle-button" })), index$1.h("div", { key: '38defd0577bedacd300e8cb558b42727b7817420', class: "header" }, index$1.h("div", { key: 'e11f58aae66a50800625464b79517e59094e5f1d', class: "title-wrapper" }, index$1.h("span", { key: '99ec80653bc7045fd08c4e95ac15f95dc3ca90ad' }, this.t('breakout_rooms.main_room')), index$1.h("span", { key: '40617acc26b95df49c2f221846ee811046709908', class: "participant-count" }, "(", index$1.h("rtk-icon", { key: 'aa8c4c4281635c998ea7c254b611341fd28e65cc', icon: this.iconPack.people }), this.participantsToShow.length, ")")), this.selectedParticipantIds.length !== 0 && (index$1.h("rtk-tooltip", { key: 'ce8eb895411d27003cafccb8ed694851df0ec52e', label: this.t('breakout_rooms.select_all') }, index$1.h("input", { key: '76ba09891936c9dfbfbd216f030c32b38c3160ee', type: "checkbox", checked: this.selectedParticipantIds.length === this.participantsToShow.length, onChange: (e) => this.onToggleAll(!!e.target.checked) })))), index$1.h("div", { key: '2ac3f88bd10747f453a626837a8806072ccc283d', class: "ctr scrollbar", part: "container" }, this.participantsToShow.length > 0 && (index$1.h("ul", { key: '01e08e47d7b52a1805561b3efc4e97713f542a4d', class: "participants", part: "participants" }, this.participantsToShow.map((participant) => (index$1.h("li", { class: { 'participant-item': true, dragging: this.isDragging }, onClick: () => this.onClick(participant), onDragStart: () => this.onDragStart(participant), onDragEnd: () => this.onDragEnd(participant), draggable: this.selectedParticipantIds.length === 0, role: "listitem", key: participant.id }, this.renderPeer(participant), !this.isDragging && (index$1.h("input", { type: "checkbox", class: {
                'hide-checkbox': this.selectedParticipantIds.length === 0,
            }, checked: this.selectedParticipantIds.includes(uiStore.participantIdentifier(participant)) }))))))), this.participantsToShow.length === 0 && this.search.length > 0 && (index$1.h("div", { key: 'aa14388c88e230528364d906d97972abdb4a5d7c', class: "empty-message" }, this.t('participants.errors.empty_results'))), this.participantsToShow.length === 0 && this.search.length === 0 && (index$1.h("div", { key: '0b10bd982a32001549df0d38cb76f0fcc112fb3d', class: "empty-room" }, index$1.h("rtk-icon", { key: 'bc7ce0cfa9f46e0d793f9b9a6b3866325963d017', icon: this.iconPack.people_checked, part: "search-icon", class: "search-icon" }), index$1.h("p", { key: '6ff4827b2df19620c677fdbf432669fd60200bb1' }, this.t('breakout_rooms.all_assigned')), index$1.h("span", { key: 'ea6e1b05bfaf16842687fbdf1b680cb64fe2a9ef' }, this.t('breakout_rooms.empty_main_room')))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "participantIds": ["participantsChanged"],
        "search": ["searchChanged"]
    }; }
};
__decorate$J([
    index.SyncWithStore()
], RtkBreakoutRoomParticipants.prototype, "meeting", void 0);
__decorate$J([
    index.SyncWithStore()
], RtkBreakoutRoomParticipants.prototype, "iconPack", void 0);
__decorate$J([
    index.SyncWithStore()
], RtkBreakoutRoomParticipants.prototype, "t", void 0);
RtkBreakoutRoomParticipants.style = RtkBreakoutRoomParticipantsStyle0;

const rtkBreakoutRoomsManagerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.color-brand{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.color-danger{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.loading-content{height:var(--rtk-space-60, 240px);width:var(--rtk-space-96, 384px);padding:var(--rtk-space-9, 36px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;align-items:center;justify-content:center}.room-config{overflow:hidden;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;flex-direction:column;width:var(--rtk-space-96, 384px);padding-left:var(--rtk-space-9, 36px);padding-right:var(--rtk-space-9, 36px);padding-top:var(--rtk-space-10, 40px);padding-bottom:var(--rtk-space-10, 40px)}header{margin-bottom:var(--rtk-space-8, 32px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px);font-size:24px;font-weight:600}header rtk-icon{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px)}.create-room{margin-bottom:var(--rtk-space-4, 16px);display:flex;align-items:center;gap:var(--rtk-space-3, 12px);width:100%}.create-room p{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-1, 4px);font-size:16px}.distribution-hint{margin-bottom:var(--rtk-space-8, 32px);font-size:14px;font-weight:400;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.distribution-hint em{font-style:normal;color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}footer{display:flex;flex-direction:row;vertical-align:middle;justify-content:center}footer rtk-button{width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}label{margin-bottom:var(--rtk-space-3, 12px);font-weight:400;color:rgb(var(--rtk-colors-text-1000, 255 255 255));opacity:0.4}.participant-config-wrapper{width:850px;min-height:595px;max-width:100%;max-height:100%;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));display:flex;flex-direction:column}.participant-config-actions{display:flex;justify-content:space-between;padding-left:var(--rtk-space-8, 32px);padding-right:var(--rtk-space-8, 32px);padding-top:var(--rtk-space-5, 20px);padding-bottom:var(--rtk-space-5, 20px);border-bottom-right-radius:var(--rtk-border-radius-md, 8px);border-bottom-left-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.participant-config{display:flex;flex-grow:1;flex-direction:row;overflow:hidden}aside{box-sizing:border-box;display:flex;width:var(--rtk-space-96, 384px);flex-grow:1;flex-direction:column;padding-left:var(--rtk-space-8, 32px);padding-right:var(--rtk-space-4, 16px);border-right-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-none, 0);border-left-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-right-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-border-opacity))}aside header{margin-bottom:var(--rtk-space-4, 16px);width:100%;padding-left:var(--rtk-space-0, 0px);padding-right:var(--rtk-space-0, 0px);padding-top:var(--rtk-space-8, 32px);font-size:20px;font-weight:500;line-height:2rem}.shuffle-button{display:flex;flex-direction:row;align-items:center}.shuffle-button rtk-icon{height:var(--rtk-space-8, 32px)}.participants-assign-actions{display:flex;flex-direction:row;align-items:center;justify-content:space-between;font-size:14px;padding-left:var(--rtk-space-8, 32px);padding-right:var(--rtk-space-2, 8px);margin-left:calc(var(--rtk-space-8, 32px) * -1);margin-right:calc(var(--rtk-space-4, 16px) * -1);padding-top:var(--rtk-space-0\\.5, 2px);padding-bottom:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.participants-assign-actions .deselect-button{height:var(--rtk-space-6, 24px)}.participants-assign-actions .deselect-button:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.assign-rooms{padding:var(--rtk-space-8, 32px);display:flex;width:100%;flex-direction:column}.assign-rooms .disabled{opacity:0.2}.assign-rooms .back{display:flex;cursor:pointer;flex-direction:row;align-items:center;justify-content:flex-start;padding:var(--rtk-space-4, 16px);padding-bottom:var(--rtk-space-0, 0px);font-size:14px;color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.assign-rooms .back rtk-icon{height:var(--rtk-space-5, 20px)}.assign-rooms .row{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;gap:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-4, 16px);font-size:14px}.assign-rooms .row-header{margin:var(--rtk-space-0, 0px);font-size:16px;line-height:2rem}.assign-rooms .cta-buttons{display:flex;align-items:center;justify-content:flex-start;gap:var(--rtk-space-2, 8px)}.assign-rooms .cta-buttons rtk-button div{display:flex;flex-direction:row;align-items:center}.assign-rooms .cta-buttons rtk-button div rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px)}.rooms{margin-bottom:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-1, 4px);display:flex;flex-grow:1;flex-direction:column;gap:var(--rtk-space-2, 8px);overflow-y:auto;max-height:500px}.rooms::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-sm, 4px)}.rooms::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.rooms::-webkit-scrollbar-track{border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.breakout-actions{display:flex;flex-direction:row;align-items:center;justify-content:flex-end;gap:var(--rtk-space-2, 8px)}.breakout-actions .start-breakout-button{color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.breakout-actions .close-breakout-button{color:rgb(var(--rtk-colors-text-1000, 255 255 255));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-bg-opacity))}.breakout-actions .update-breakout-button{background-color:transparent;--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity));border-width:var(--rtk-border-width-sm, 1px);border-style:solid;--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-border-opacity))}.status-bar{display:flex;align-items:center;font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));width:var(--rtk-space-80, 320px)}.ephemeral-status{--tw-text-opacity:1;color:rgba(var(--rtk-colors-success, 98 165 4) / var(--tw-text-opacity))}.ephemeral-status rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px)}.room-switcher-container{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));width:468px;padding:var(--rtk-space-8, 32px)}.add-room-jumbo-btn div{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);font-size:14px;--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.add-room-jumbo-btn div rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px)}.br-primary-btn:not([disabled]){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.br-primary-btn:not([disabled]):hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-600, 13 81 253) / var(--tw-bg-opacity))}.br-secondary-btn:not([disabled]){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.br-secondary-btn:not([disabled]):hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}";
const RtkBreakoutRoomsManagerStyle0 = rtkBreakoutRoomsManagerCss;

var __decorate$I = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const MIN_ROOMS = 1;
const RtkBreakoutRoomsManager = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Flag to indicate busy state */
        this.loading = false;
        /** Breakout room config object */
        this.roomConfig = {
            rooms: 2,
            step: 'room-config',
            mode: 'create',
            applyingChanges: false,
        };
        /** List of assigned participants */
        // @State() unassignedParticipants: string[] = [];
        /** Flag that tells if participants are being assigned or not */
        this.assigningParticipants = false;
        /** List of selected peers */
        this.selectedParticipants = [];
        /** update about room changes */
        this.ephemeralStatusText = '';
        /** Flag that tells if participants are being dragged */
        this.isDragMode = false;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.permissionsUpdateListener = () => {
            this.permissions = this.meeting.self.permissions.connectedMeetings;
        };
        this.updateLocalState = (payload) => {
            this.stateManager.updateCurrentState(payload);
            this.draftState = this.stateManager.currentState;
            if (this.meeting.connectedMeetings.isActive) {
                this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { mode: 'edit' });
            }
            if (this.roomConfig.mode === 'create' && !this.meeting.connectedMeetings.isActive) {
                uiStore.resetRoomCount();
            }
            if (['edit', 'view'].includes(this.roomConfig.mode)) {
                this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { rooms: payload.meetings.length, step: 'participants-config' });
                this.selectedParticipants = [];
            }
        };
        this.onAddNewRoom = () => {
            this.stateManager.addNewMeeting();
            this.draftState = this.stateManager.currentState;
            this.selectorRef.scrollTo({ top: this.selectorRef.scrollHeight, behavior: 'smooth' });
        };
        this.onRoomUpdate = (event) => {
            const { detail } = event;
            this.stateManager.updateMeetingTitle(detail.id, detail.title);
            this.draftState = this.stateManager.currentState;
        };
        this.onRoomDelete = (id) => {
            const toDelete = this.stateManager.allConnectedMeetings.find((meeting) => meeting.id === id);
            if (toDelete) {
                this.stateManager.deleteMeeting(id);
                this.draftState = this.stateManager.currentState;
            }
        };
        this.unassignParticipant = (id) => {
            this.stateManager.unassignParticipants([id]);
            this.draftState = this.stateManager.currentState;
        };
        this.onUnassignAll = () => {
            this.stateManager.unassignAllParticipants();
            this.draftState = this.stateManager.currentState;
        };
        this.assignParticipantsToRoom = (destinationMeetingId) => {
            if (this.selectedParticipants.length === 0 || this.assigningParticipants == false)
                return;
            this.stateManager.assignParticipantsToMeeting(this.selectedParticipants, destinationMeetingId);
            this.draftState = this.stateManager.currentState;
            this.selectedParticipants = [];
            this.assigningParticipants = false;
            this.setEphemeralStatus(this.t('breakout_rooms.ephemeral_status.participants_assigned'));
        };
        this.handleClose = (stateUpdate, store) => {
            stateUpdate.emit({
                activeBreakoutRoomsManager: {
                    active: true,
                },
            });
            store.activeBreakoutRoomsManager = {
                active: true,
            };
        };
        this.enableConfirmationModal = (modalType = 'start-breakout') => {
            let activeConfirmationModal = {
                active: true,
                header: 'breakout_rooms.confirm_modal.start_breakout.header',
                content: 'breakout_rooms.confirm_modal.start_breakout.content',
                variant: 'primary',
                cancelText: 'breakout_rooms.confirm_modal.start_breakout.cancelText',
                ctaText: 'breakout_rooms.confirm_modal.start_breakout.ctaText',
                onClick: () => this.applyChanges(),
                onClose: this.handleClose,
            };
            if (modalType === 'close-breakout') {
                activeConfirmationModal = {
                    active: true,
                    header: 'breakout_rooms.confirm_modal.close_breakout.header',
                    content: 'breakout_rooms.confirm_modal.close_breakout.content',
                    variant: 'danger',
                    cancelText: 'cancel',
                    ctaText: 'breakout_rooms.confirm_modal.close_breakout.ctaText',
                    onClick: () => this.closeBreakout(),
                    onClose: this.handleClose,
                };
            }
            this.stateUpdate.emit({
                activeBreakoutRoomsManager: { active: false },
                activeConfirmationModal,
            });
        };
        this.close = () => {
            this.stateManager.discardChanges();
            this.stateUpdate.emit({
                activeBreakoutRoomsManager: {
                    active: false,
                },
            });
        };
        this.applyChanges = async () => {
            this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { applyingChanges: true });
            await this.stateManager.applyChanges(this.meeting);
            this.close();
            this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { applyingChanges: false });
        };
    }
    onSelectedParticipantsChanged(participants) {
        if (participants.length > 0)
            this.assigningParticipants = true;
        else
            this.assigningParticipants = false;
    }
    connectedCallback() {
        this.permissionsUpdateListener();
        this.meeting.connectedMeetings.on('stateUpdate', this.updateLocalState);
        this.meeting.connectedMeetings.on('changingMeeting', this.close);
        this.meeting.self.permissions.on('permissionsUpdate', this.permissionsUpdateListener);
        this.stateManager = new uiStore.BreakoutRoomsManager();
        this.fetchRoomState();
    }
    disconnectedCallback() {
        this.meeting.connectedMeetings.off('stateUpdate', this.updateLocalState);
        this.meeting.connectedMeetings.off('changingMeeting', this.close);
        this.meeting.self.permissions.off('permissionsUpdate', this.permissionsUpdateListener);
    }
    async fetchRoomState() {
        this.loading = true;
        await this.meeting.connectedMeetings.getConnectedMeetings();
        this.loading = false;
    }
    setEphemeralStatus(text) {
        this.ephemeralStatusText = text;
        setTimeout(() => {
            this.ephemeralStatusText = '';
        }, 3000);
    }
    onCreateRooms() {
        this.selectedParticipants = [];
        this.stateManager.addNewMeetings(this.roomConfig.rooms);
        this.draftState = this.stateManager.currentState;
        // move to next step -> participants-config
        this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { step: 'participants-config' });
    }
    onParticipantDelete(event) {
        const { detail } = event;
        const id = uiStore.participantIdentifier(detail);
        if (id == null)
            return;
        this.unassignParticipant(id);
    }
    toggleDragMode(e) {
        this.isDragMode = e.detail;
    }
    assignParticipantsRandomly() {
        if (this.stateManager.unassignedParticipants.length === 0)
            return;
        this.stateManager.assignParticipantsRandomly();
        this.draftState = this.stateManager.currentState;
        this.setEphemeralStatus(this.t('breakout_rooms.ephemeral_status.participants_assigned_randomly'));
    }
    async joinRoom(destinationMeetingId) {
        const participantId = uiStore.participantIdentifier(this.meeting.self);
        this.stateManager.assignParticipantsToMeeting([participantId], destinationMeetingId);
        await this.applyChanges();
    }
    async closeBreakout() {
        this.stateManager.allConnectedMeetings.forEach((meeting) => this.stateManager.deleteMeeting(meeting.id));
        await this.applyChanges();
    }
    updateSelectedParticipants(e) {
        this.selectedParticipants = e.detail;
    }
    updateAllParticipants(e) {
        this.selectedParticipants = e.detail;
    }
    getStatusText() {
        if (this.ephemeralStatusText !== '')
            return this.ephemeralStatusText;
        let statusText = '';
        if (this.roomConfig.mode === 'create') {
            statusText = this.t('breakout_rooms.status.assign_multiple');
            if (this.selectedParticipants.length !== 0) {
                statusText = this.t('breakout_rooms.status.select_room');
            }
        }
        return statusText;
    }
    getApproxDistribution() {
        const num = this.stateManager.unassignedParticipants.length / (this.roomConfig.rooms || MIN_ROOMS);
        return Math.max(MIN_ROOMS, Math.round(num));
    }
    deselectAll() {
        this.selectedParticipants = [];
    }
    async discardChanges() {
        this.stateManager.discardChanges();
        await this.fetchRoomState();
        this.setEphemeralStatus(this.t('breakout_rooms.ephemeral_status.changes_discarded'));
    }
    shouldShowOnlyRoomSwitcher() {
        return this.permissions.canAlterConnectedMeetings === false;
    }
    getPermittedRooms() {
        if (this.permissions.canAlterConnectedMeetings || this.permissions.canSwitchConnectedMeetings) {
            return this.stateManager.allConnectedMeetings;
        }
        return this.stateManager.allConnectedMeetings.filter((cMeeting) => cMeeting.id === this.meeting.meta.meetingId);
    }
    renderMainRoomMaybe() {
        if (!(this.meeting.connectedMeetings.isActive && this.permissions.canSwitchToParentMeeting)) {
            return null;
        }
        return (index$1.h("rtk-breakout-room-manager", { key: this.stateManager.currentState.parentMeeting['id'], assigningParticipants: this.assigningParticipants, isDragMode: this.isDragMode, meeting: this.meeting, mode: this.roomConfig.mode, onParticipantsAdd: () => this.assignParticipantsToRoom(this.stateManager.currentState.parentMeeting['id']), onRoomJoin: () => this.joinRoom(this.stateManager.currentState.parentMeeting['id']), onUpdate: this.onRoomUpdate, states: this.states, room: Object.assign({}, this.stateManager.currentState.parentMeeting), iconPack: this.iconPack, t: this.t }));
    }
    renderRoomSwitcher() {
        return (index$1.h(index$1.Host, null, index$1.h("div", { class: "room-switcher-container" }, index$1.h("header", null, index$1.h("rtk-icon", { icon: this.iconPack.breakout_rooms }), index$1.h("span", null, this.t('breakout_rooms.join_breakout_header'))), index$1.h("div", { class: "rooms", ref: (el) => (this.selectorRef = el) }, this.renderMainRoomMaybe(), this.getPermittedRooms().map((room, idx) => {
            return (index$1.h("rtk-breakout-room-manager", { key: room['id'], assigningParticipants: this.assigningParticipants, isDragMode: this.isDragMode, defaultExpanded: idx === 0, meeting: this.meeting, mode: this.roomConfig.mode, onDelete: () => this.onRoomDelete(room['id']), onParticipantsAdd: () => this.assignParticipantsToRoom(room['id']), onRoomJoin: () => this.joinRoom(room['id']), states: this.states, room: Object.assign({}, room), iconPack: this.iconPack, t: this.t, allowDelete: false }));
        })))));
    }
    renderLoading() {
        return (index$1.h(index$1.Host, null, index$1.h("div", { class: "loading-content" }, index$1.h("rtk-spinner", { size: "xl" }))));
    }
    renderRoomConfig() {
        return (index$1.h(index$1.Host, null, index$1.h("div", { class: "room-config" }, index$1.h("header", null, index$1.h("rtk-icon", { icon: this.iconPack.breakout_rooms }), index$1.h("span", null, this.t('breakout_rooms.room_config_header'))), index$1.h("div", { class: "create-room" }, index$1.h("p", null, this.t('breakout_rooms.num_of_rooms')), index$1.h("rtk-counter", { value: this.roomConfig.rooms, minValue: MIN_ROOMS, iconPack: this.iconPack, t: this.t, onValueChange: (val) => {
                this.roomConfig = Object.assign(Object.assign({}, this.roomConfig), { rooms: Math.max(+val.detail, MIN_ROOMS) });
            } })), index$1.h("span", { class: "distribution-hint" }, `${this.t('breakout_rooms.approx')}${' '}`, ' ', index$1.h("em", null, this.getApproxDistribution(), " ", this.t('breakout_rooms.participants_per_room')), ' ', this.t('breakout_rooms.division_text')), index$1.h("footer", null, index$1.h("rtk-button", { kind: "button", size: "lg", title: this.t('create'), disabled: this.roomConfig.rooms === 0, onClick: () => this.onCreateRooms() }, this.t('create'))))));
    }
    render() {
        if (this.loading) {
            return this.renderLoading();
        }
        if (this.shouldShowOnlyRoomSwitcher()) {
            return this.renderRoomSwitcher();
        }
        if (this.roomConfig.step === 'room-config') {
            return this.renderRoomConfig();
        }
        // participant config
        return (index$1.h(index$1.Host, null, index$1.h("div", { class: "participant-config-wrapper" }, index$1.h("div", { class: "participant-config" }, index$1.h("aside", { part: "menu" }, index$1.h("header", null, this.t('breakout_rooms.assign_participants')), index$1.h("rtk-breakout-room-participants", { meeting: this.meeting, iconPack: this.iconPack, t: this.t, participantIds: this.stateManager.unassignedParticipants.map(uiStore.participantIdentifier), selectedParticipantIds: this.selectedParticipants }, index$1.h("rtk-tooltip", { label: this.t('breakout_rooms.shuffle_participants'), slot: "shuffle-button" }, index$1.h("rtk-button", { disabled: this.roomConfig.mode === 'edit' ||
                this.stateManager.unassignedParticipants.length === 0, kind: "button", variant: "secondary", size: "md", onClick: () => this.assignParticipantsRandomly(), class: "shuffle-button br-primary-btn" }, index$1.h("rtk-icon", { icon: this.iconPack.shuffle })))), this.selectedParticipants.length !== 0 && (index$1.h("div", { class: "participants-assign-actions" }, index$1.h("span", null, `${this.selectedParticipants.length} ${this.t('breakout_rooms.selected')}`), index$1.h("rtk-button", { disabled: this.roomConfig.mode === 'edit', kind: "button", variant: "ghost", size: "md", onClick: () => this.deselectAll(), class: "deselect-button color-danger" }, this.t('breakout_rooms.deselect'))))), index$1.h("div", { class: "assign-rooms" }, index$1.h("div", { class: "row" }, index$1.h("p", { class: "row-header" }, this.t('breakout_rooms.rooms'), " (", this.stateManager.allConnectedMeetings.length, ")"), !this.assigningParticipants && (index$1.h("div", { class: "cta-buttons" }, index$1.h("rtk-button", { kind: "button", variant: "secondary", class: "br-primary-btn" }, index$1.h("div", { onClick: this.onAddNewRoom }, index$1.h("rtk-icon", { icon: this.iconPack.add }), this.t('breakout_rooms.add_room'))), this.stateManager.allConnectedMeetings.flatMap((m) => m.participants)
            .length !== 0 && (index$1.h("rtk-button", { kind: "button", variant: "ghost", onClick: this.onUnassignAll }, this.t('breakout_rooms.unassign_all')))))), index$1.h("div", { class: "rooms", ref: (el) => (this.selectorRef = el) }, this.renderMainRoomMaybe(), this.getPermittedRooms().map((room, idx) => {
            return (index$1.h("rtk-breakout-room-manager", { key: room['id'], assigningParticipants: this.assigningParticipants, isDragMode: this.isDragMode, defaultExpanded: idx === 0, meeting: this.meeting, mode: this.roomConfig.mode, onDelete: () => this.onRoomDelete(room['id']), onParticipantsAdd: () => this.assignParticipantsToRoom(room['id']), onRoomJoin: () => this.joinRoom(room['id']), onUpdate: this.onRoomUpdate, states: this.states, room: Object.assign({}, room), iconPack: this.iconPack, t: this.t, allowDelete: this.stateManager.allConnectedMeetings.length > MIN_ROOMS }));
        }), index$1.h("rtk-button", { kind: "button", variant: "secondary", onClick: this.onAddNewRoom, class: "add-room-jumbo-btn br-secondary-btn" }, index$1.h("div", null, index$1.h("rtk-icon", { icon: this.iconPack.add }), index$1.h("span", null, this.t('breakout_rooms.add_room_brief'))))))), index$1.h("div", { class: "participant-config-actions" }, index$1.h("div", { class: { 'status-bar': true, 'ephemeral-status': this.ephemeralStatusText !== '' } }, this.ephemeralStatusText !== '' && index$1.h("rtk-icon", { icon: this.iconPack.checkmark }), this.getStatusText()), index$1.h("div", { class: "breakout-actions" }, this.roomConfig.mode === 'create' && this.permissions.canAlterConnectedMeetings && (index$1.h("rtk-button", { size: "md", class: "start-breakout-button", onClick: () => this.enableConfirmationModal('start-breakout') }, this.t('breakout_rooms.start_breakout'))), this.roomConfig.mode === 'edit' &&
            this.stateManager.hasLocalChanges &&
            this.permissions.canAlterConnectedMeetings && (index$1.h("rtk-button", { size: "md", class: "color-danger", variant: "ghost", onClick: () => this.discardChanges() }, this.t('breakout_rooms.discard_changes'))), this.roomConfig.mode === 'edit' &&
            this.stateManager.hasLocalChanges &&
            this.permissions.canAlterConnectedMeetings && (index$1.h("rtk-button", { size: "md", class: "update-breakout-button", onClick: this.applyChanges }, this.t('breakout_rooms.update_breakout'))), this.roomConfig.mode === 'edit' &&
            !this.stateManager.hasLocalChanges &&
            this.permissions.canAlterConnectedMeetings && (index$1.h("rtk-button", { size: "md", class: "close-breakout-button", onClick: () => this.enableConfirmationModal('close-breakout') }, this.t('breakout_rooms.close_breakout'))))))));
    }
    static get watchers() { return {
        "selectedParticipants": ["onSelectedParticipantsChanged"]
    }; }
};
__decorate$I([
    index.SyncWithStore()
], RtkBreakoutRoomsManager.prototype, "meeting", void 0);
__decorate$I([
    index.SyncWithStore()
], RtkBreakoutRoomsManager.prototype, "states", void 0);
__decorate$I([
    index.SyncWithStore()
], RtkBreakoutRoomsManager.prototype, "iconPack", void 0);
__decorate$I([
    index.SyncWithStore()
], RtkBreakoutRoomsManager.prototype, "t", void 0);
RtkBreakoutRoomsManager.style = RtkBreakoutRoomsManagerStyle0;

const rtkBroadcastMessageModalCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:var(--rtk-border-radius-md, 8px);padding:var(--rtk-space-4, 16px);width:100%;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));width:400px;max-width:80%}.content-col{display:flex;width:100%;flex-direction:column}h2{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-2, 8px)}.content-row{display:flex;width:100%;flex-direction:row}.content-row rtk-button{margin-top:var(--rtk-space-4, 16px);width:100%}textarea{margin-top:var(--rtk-space-3, 12px);resize:none;border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;font-family:var(--rtk-font-family, sans-serif);outline:2px solid transparent;outline-offset:2px;height:var(--rtk-space-16, 64px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--rtk-space-2, 8px);color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}textarea::-moz-placeholder{color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}textarea::placeholder{color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}select{border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;padding-top:var(--rtk-space-3, 12px);padding-bottom:var(--rtk-space-3, 12px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);outline:2px solid transparent;outline-offset:2px;border-right-width:var(--rtk-border-width-md, 2px);border-style:solid;border-color:transparent;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}p{margin:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-2, 8px);width:100%;text-align:center;font-size:14px;--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));display:flex;flex-direction:row;align-items:center;justify-content:center}p rtk-icon{margin-left:var(--rtk-space-1, 4px);height:var(--rtk-space-5, 20px)}";
const RtkBroadcastMessageModalStyle0 = rtkBroadcastMessageModalCss;

var __decorate$H = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkBroadcastMessageModal = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Broadcast message state */
        this.messagePayload = {
            to: 'Everyone',
            message: '',
        };
        this.successMessage = false;
    }
    close() {
        var _a;
        (_a = this.stateUpdate) === null || _a === void 0 ? void 0 : _a.emit({ activeBroadcastMessageModal: false });
    }
    sendMessage() {
        // TODO:(ishita1805) Send this.messagePayload to webcore.
        this.successMessage = true;
        setTimeout(() => {
            this.close();
        }, 2000);
    }
    render() {
        return (index$1.h(index$1.Host, { key: '4d23ce819f004fd0e14a4c9062e21f1321c46495' }, index$1.h("div", { key: 'f0814536068dd268c1aec9d80c45cc6817fe184b', class: "content-col" }, index$1.h("h2", { key: '5b0caef4e9f93d1a18c7bba8a269f10d95f5d290' }, "Broadcast message to"), index$1.h("select", { key: '8f32291fa522cf7a5947caf54178327e1574f103', onChange: (e) => {
                this.messagePayload = Object.assign(Object.assign({}, this.messagePayload), { to: e.target.value });
            } }, index$1.h("option", { key: 'b09bb9b952ade48788bf8ab15645a1a45dab6935' }, "Everyone"), index$1.h("option", { key: '177d1af8eaeaa77393a9b2e477fca32563c05290' }, "List of rooms")), index$1.h("textarea", { key: 'b592528751cb63fa8c107b2b63455bfed0b3f3cb', placeholder: "Type message here...", onInput: (e) => {
                this.messagePayload = Object.assign(Object.assign({}, this.messagePayload), { message: e.target.value });
            } }), this.successMessage ? (index$1.h("p", null, "Message sent to ", this.messagePayload.to, index$1.h("rtk-icon", { icon: this.iconPack.checkmark }))) : (index$1.h("div", { class: "content-row" }, index$1.h("rtk-button", { onClick: () => this.close(), variant: "secondary" }, "Cancel"), "\u2002", index$1.h("rtk-button", { variant: "primary", onClick: () => this.sendMessage() }, "Send"))))));
    }
};
__decorate$H([
    index.SyncWithStore()
], RtkBroadcastMessageModal.prototype, "meeting", void 0);
__decorate$H([
    index.SyncWithStore()
], RtkBroadcastMessageModal.prototype, "states", void 0);
__decorate$H([
    index.SyncWithStore()
], RtkBroadcastMessageModal.prototype, "iconPack", void 0);
__decorate$H([
    index.SyncWithStore()
], RtkBroadcastMessageModal.prototype, "t", void 0);
RtkBroadcastMessageModal.style = RtkBroadcastMessageModalStyle0;

const rtkButtonCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{--icon-size:var(--rtk-button-icon-size, var(--rtk-space-5, 20px));--transition-property:var(--rtk-transition-property, all);--transition-duration:100ms;display:inline-flex;height:var(--rtk-space-8, 32px);cursor:pointer;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));font-size:14px;-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--rtk-border-radius-sm, 4px);transition-property:var(--transition-property);transition-duration:var(--transition-duration)}button{box-sizing:border-box;background-color:transparent;color:inherit;border:var(--rtk-border-width-sm, 1px) solid transparent;padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);display:inline-flex;flex-grow:1;justify-content:center;vertical-align:baseline;gap:var(--rtk-space-1, 4px);transition-property:var(--transition-property);transition-duration:var(--transition-duration);outline:none;height:inherit;border-radius:inherit;fill:inherit;cursor:inherit;font-weight:inherit;font-family:inherit;font-size:inherit;line-height:inherit}.start,.content,.end{align-self:center}::slotted(rtk-icon),::slotted(rtk-spinner){height:var(--icon-size);width:var(--icon-size)}:host([variant='primary']){color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}:host(:hover){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-600, 13 81 253) / var(--tw-bg-opacity))}button:focus-visible{border-color:rgb(var(--rtk-colors-text-1000, 255 255 255))}:host(:active){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-700, 2 70 253) / var(--tw-bg-opacity))}:host([disabled]:not([disabled='false'])){cursor:not-allowed;opacity:0.6}:host([variant='secondary']){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}:host([variant='secondary']:hover){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}:host([variant='secondary']:active){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}:host([variant='danger']){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-bg-opacity))}:host([variant='danger']:hover){background-color:rgba(var(--rtk-colors-danger, 255 45 45) / 0.7)}:host([variant='danger']:active){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-bg-opacity))}:host([variant='ghost']){background-color:transparent;color:inherit}:host([variant='ghost'].active){--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}:host([variant='ghost']:hover){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}:host([variant='ghost']:active){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host([kind='icon']){--icon-size:var(--rtk-space-5, 20px);width:var(--rtk-space-8, 32px)}:host([kind='icon']) button{padding-left:var(--rtk-space-0, 0px);padding-right:var(--rtk-space-0, 0px)}:host([kind='wide']){width:100%}:host([size='lg']){--icon-size:var(--rtk-space-5, 20px);height:var(--rtk-space-10, 40px);font-size:16px}:host([size='lg'][kind='icon']){--icon-size:var(--rtk-space-6, 24px);height:var(--rtk-space-10, 40px);width:var(--rtk-space-10, 40px)}:host([size='sm']){--icon-size:var(--rtk-space-4, 16px);height:var(--rtk-space-6, 24px);font-size:12px}:host([size='sm'][kind='icon']){height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px)}";
const RtkButtonStyle0 = rtkButtonCss;

const RtkButton = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Button variant */
        this.variant = 'primary';
        /** Button type */
        this.kind = 'button';
        /** Whether to reverse order of children */
        this.reverse = false;
        /** Where the button is disabled or not */
        this.disabled = false;
        /** Button type */
        this.type = 'button';
    }
    render() {
        return (index$1.h(index$1.Host, { key: '0f96cef4ae77a2be8013fa5d62d39626734eeced' }, index$1.h("button", { key: '8c06d5f5cc71779b8d56f31d2dd77b8d35e8b280', part: "button", type: this.type, disabled: this.disabled }, index$1.h("span", { key: 'ae741ddf8cc914f9493c26330b1f322541f64223', class: "start" }, index$1.h("slot", { key: '18275dab42a4dd38b5a59463ffca227e4a6df3c8', name: "start" })), index$1.h("span", { key: 'c2b912515b6edc2966c4cdb282c89022aa05c13f', class: "content", part: "content" }, index$1.h("slot", { key: '5d87993198e16a3b5f38e62979fa2ee5637a059d' })), index$1.h("span", { key: '0bc907da23ea362f8ae0b3fdf88452b1c3881078', class: "end" }, index$1.h("slot", { key: '0862eeefcfa5765ce605b99a04aab88222ed6e68', name: "end" })))));
    }
    static get delegatesFocus() { return true; }
};
RtkButton.style = RtkButtonStyle0;

const rtkChannelCreatorCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;flex-direction:column;width:var(--rtk-space-96, 384px);padding-left:var(--rtk-space-9, 36px);padding-right:var(--rtk-space-9, 36px);padding-top:var(--rtk-space-10, 40px);padding-bottom:var(--rtk-space-10, 40px)}header{margin-bottom:var(--rtk-space-8, 32px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px);font-size:24px;font-weight:600}.channel-name-input{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;padding:var(--rtk-space-3, 12px);font-size:16px;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.25;outline:2px solid transparent;outline-offset:2px}.channel-name-input:focus{outline-width:2px;outline-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}footer{margin-top:var(--rtk-space-5, 20px);display:flex;justify-content:flex-end}.member{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding:var(--rtk-space-2, 8px)}.member rtk-avatar{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.input-container{position:relative;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.25;outline:2px solid transparent;outline-offset:2px;outline-width:2px;outline-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5);border-radius:var(--rtk-border-radius-sm, 4px)}.input-container .members{margin:var(--rtk-space-0, 0px);max-height:var(--rtk-space-28, 112px);border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);list-style-type:none;display:flex;flex-wrap:wrap;gap:var(--rtk-space-1, 4px);cursor:text;font-size:16px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));overflow-y:auto;min-height:var(--rtk-space-7, 28px)}.input-container .pill{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.input-container .pill rtk-avatar{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);font-size:14px;color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.input-container .pill span{max-width:var(--rtk-space-32, 128px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.input-container .pill rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);cursor:pointer}.input-container input{width:var(--rtk-space-24, 96px);border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;padding:var(--rtk-space-1, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));outline:2px solid transparent;outline-offset:2px;font-size:16px;line-height:1.25rem}.input-container input.wide-input{width:100%}.search-results{margin:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-1, 4px);max-height:var(--rtk-space-28, 112px);width:100%;padding:var(--rtk-space-0, 0px);position:absolute;list-style-type:none;overflow-y:auto;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-radius:var(--rtk-border-radius-md, 8px);--tw-border-spacing-x:var(--rtk-space-2, 8px);--tw-border-spacing-y:var(--rtk-space-2, 8px);border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-style:solid;border-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}.search-results .member{cursor:pointer}.search-results .member rtk-avatar{color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.search-results .member:hover,.search-results .member.selected{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-700, 2 70 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}";
const RtkChannelCreatorStyle0 = rtkChannelCreatorCss;

var __decorate$G = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChannelCreator = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        this.switchChannel = index$1.createEvent(this, "switchChannel", 7);
        /** Language */
        this.t = uiStore.useLanguage();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        this.channelName = '';
        this.searchQuery = '';
        this.step = 1;
        this.loading = false;
        this.selectedMemberIds = new Set();
        this.focusedMemberIndex = -1;
        this.showAllMembersList = false;
        this.allMembers = new Map();
        this.inputTextRef = null;
        this.searchInputTextRef = null;
        this.focusOnSearch = (selectText = false) => {
            this.focusedMemberIndex = -1;
            index$1.writeTask(() => {
                var _a, _b;
                (_a = this.searchInputTextRef) === null || _a === void 0 ? void 0 : _a.focus();
                if (selectText)
                    (_b = this.searchInputTextRef) === null || _b === void 0 ? void 0 : _b.select();
            });
        };
        this.onClickHandler = async () => {
            if (this.channelName.length === 0)
                return;
            if (this.step === 1) {
                const members = this.meeting.participants.all.toArray();
                const selfId = this.meeting.self.userId;
                const nonSelfMembers = members.filter((member) => member.userId !== selfId);
                nonSelfMembers.forEach((member) => this.allMembers.set(member.userId, member));
                this.step = 2;
                this.focusOnSearch();
                return;
            }
            // step 2 - add members and create channel
            await this.createChannel();
        };
        this.createChannel = async () => {
            const members = Array.from(this.selectedMemberIds);
            const newChannel = await this.meeting.chat.createChannel(this.channelName, members, {
                displayPictureUrl: '',
                visibility: 'public',
                isDirectMessage: false,
            });
            this.switchChannel.emit(newChannel.id);
            this.stateUpdate.emit({ activeChannelCreator: false });
        };
        this.onMemberAdd = (id) => {
            this.showAllMembersList = false;
            this.selectedMemberIds.add(id);
            this.searchQuery = '';
            this.focusOnSearch();
        };
        this.keyDownHandler = (e, filteredMembers) => {
            if (e.key === 'ArrowDown') {
                this.focusedMemberIndex = Math.min(this.focusedMemberIndex + 1, filteredMembers.length - 1);
            }
            else if (e.key === 'ArrowUp') {
                if (this.focusedMemberIndex === -1)
                    return;
                if (this.focusedMemberIndex === 0) {
                    this.focusOnSearch(true);
                    return;
                }
                this.focusedMemberIndex = Math.max(this.focusedMemberIndex - 1, 0);
            }
            else if (e.key === 'Enter') {
                this.onMemberAdd(filteredMembers[this.focusedMemberIndex].userId);
            }
            else if (e.key === 'Backspace') {
                if (this.searchQuery.length !== 0)
                    return;
                if (this.selectedMemberIds.size === 0)
                    return;
                const lastMemberId = Array.from(this.selectedMemberIds.values()).at(-1);
                this.selectedMemberIds.delete(lastMemberId);
                index$1.forceUpdate(this.$el);
            }
        };
        this.renderMemberSelector = () => {
            const filteredMembers = Array.from(this.allMembers.values()).filter((member) => !this.selectedMemberIds.has(member.userId) &&
                member.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            const selectedMembers = Array.from(this.selectedMemberIds.values()).map((id) => this.allMembers.get(id));
            const disableInput = this.selectedMemberIds.size === this.allMembers.size;
            return (index$1.h("div", { class: "input-container" }, index$1.h("ul", { class: "members scrollbar", onClick: () => {
                    var _a;
                    (_a = this.searchInputTextRef) === null || _a === void 0 ? void 0 : _a.focus();
                } }, selectedMembers.map((member) => (index$1.h("li", { class: "pill" }, index$1.h("rtk-avatar", { participant: {
                    name: member.name,
                    picture: member.picture,
                }, size: "sm" }), index$1.h("span", null, member.name), index$1.h("rtk-icon", { icon: this.iconPack.dismiss, onClick: () => {
                    this.selectedMemberIds.delete(member.userId);
                    index$1.forceUpdate(this.$el);
                    this.focusOnSearch();
                } })))), !disableInput && (index$1.h("input", { type: "text", ref: (el) => (this.searchInputTextRef = el), value: this.searchQuery, placeholder: this.selectedMemberIds.size === 0 ? this.t('chat.member_name') : '', class: {
                    'wide-input': this.selectedMemberIds.size === 0,
                }, onInput: (e) => {
                    this.searchQuery = e.target.value.trim();
                }, onClick: () => {
                    this.showAllMembersList = !this.showAllMembersList;
                }, onKeyDown: (e) => this.keyDownHandler(e, filteredMembers) }))), (this.searchQuery.length !== 0 || this.showAllMembersList) && (index$1.h("ul", { class: "search-results" }, filteredMembers.map((member, index) => (index$1.h("li", { class: { member: true, selected: index === this.focusedMemberIndex }, onClick: () => this.onMemberAdd(member.userId), ref: ($li) => {
                    if (index === this.focusedMemberIndex) {
                        index$1.writeTask(() => {
                            if ($li)
                                $li.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                        });
                    }
                } }, index$1.h("rtk-avatar", { participant: {
                    name: member.name,
                    picture: member.picture,
                }, size: "sm" }), index$1.h("span", null, member.name)))), filteredMembers.length === 0 && (index$1.h("li", { class: "member" }, index$1.h("span", null, this.t('chat.error.empty_results'))))))));
        };
    }
    componentDidLoad() {
        var _a;
        (_a = this.inputTextRef) === null || _a === void 0 ? void 0 : _a.focus();
    }
    render() {
        return (index$1.h(index$1.Host, { key: '7d1b6bc07ef49de8075a25dec0f70b1f01d41222' }, index$1.h("header", { key: 'd0db6948cb2888043e6bb260f219570523398721' }, this.step === 1 ? this.t('chat.new_channel') : this.t('chat.add_members')), this.step === 1 && (index$1.h("input", { key: 'ebe47cfa27796197bc08a74e3e2d23e557325e30', class: "channel-name-input", type: "text", placeholder: this.t('chat.channel_name'), ref: (el) => (this.inputTextRef = el), onInput: (e) => {
                this.channelName = e.target.value.trim();
            } })), this.step === 2 && this.renderMemberSelector(), index$1.h("footer", { key: 'c2a1b31a32bef53ced22b6d7267dba25173376cf' }, index$1.h("rtk-button", { key: '2766a128dca00f5175545897e985ab9fe2a074b1', kind: "button", size: "lg", disabled: this.channelName.length === 0, onClick: this.onClickHandler }, this.step === 1 ? this.t('chat.add_members') : this.t('create')))));
    }
    get $el() { return index$1.getElement(this); }
};
__decorate$G([
    index.SyncWithStore()
], RtkChannelCreator.prototype, "meeting", void 0);
__decorate$G([
    index.SyncWithStore()
], RtkChannelCreator.prototype, "t", void 0);
__decorate$G([
    index.SyncWithStore()
], RtkChannelCreator.prototype, "iconPack", void 0);
RtkChannelCreator.style = RtkChannelCreatorStyle0;

const rtkChannelDetailsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;flex-direction:column;width:var(--rtk-space-72, 288px);padding-top:var(--rtk-space-5, 20px);padding-bottom:var(--rtk-space-5, 20px);padding-left:var(--rtk-space-8, 32px);padding-right:var(--rtk-space-8, 32px)}header{font-size:20px}rtk-spinner{margin-top:var(--rtk-space-10, 40px);margin-bottom:var(--rtk-space-10, 40px);margin-left:auto;margin-right:auto}ul{margin-left:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-6, 24px);margin-bottom:var(--rtk-space-4, 16px);height:var(--rtk-space-48, 192px);padding:var(--rtk-space-0, 0px);overflow-y:auto;list-style-type:none;display:flex;flex-direction:column;gap:var(--rtk-space-2, 8px)}ul li{margin-right:var(--rtk-space-2, 8px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px);padding:var(--rtk-space-2, 8px);cursor:pointer;border-radius:var(--rtk-border-radius-sm, 4px)}ul li:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}ul li rtk-avatar{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}";
const RtkChannelDetailsStyle0 = rtkChannelDetailsCss;

var __decorate$F = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChannelDetails = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Language */
        this.t = uiStore.useLanguage();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** List of channel members */
        this.members = [];
    }
    renderMembers() {
        return (index$1.h("ul", { class: "scrollbar" }, this.members.map((member) => {
            return (index$1.h("li", null, index$1.h("rtk-avatar", { participant: { name: member.name, picture: member.picture }, size: "sm" }), index$1.h("span", null, member.name)));
        })));
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'cc8b22dae541a200e63d0d6b286f7ad380a53f09' }, index$1.h("header", { key: 'e481f5db77f40f53cac0c6aeae28752ddab505cb' }, this.t('chat.channel_members')), this.renderMembers()));
    }
};
__decorate$F([
    index.SyncWithStore()
], RtkChannelDetails.prototype, "t", void 0);
__decorate$F([
    index.SyncWithStore()
], RtkChannelDetails.prototype, "iconPack", void 0);
RtkChannelDetails.style = RtkChannelDetailsStyle0;

const rtkChannelHeaderCss = "header{box-sizing:border-box;height:var(--rtk-space-16, 64px);width:100%;padding:var(--rtk-space-4, 16px);display:flex;justify-content:space-between;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));border-left-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-border-opacity))}header.searching{justify-content:flex-end}header.searching .channel-details{display:none}header .channel-details{display:flex;flex-grow:1;flex-direction:column;justify-content:center;height:var(--rtk-space-9, 36px);width:var(--rtk-space-1, 4px)}header .channel-details .name{font-weight:500}header .channel-details .members{margin-top:var(--rtk-space-0\\.5, 2px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}header .channel-tools{display:flex;flex-shrink:0;justify-content:flex-end;gap:var(--rtk-space-1, 4px);min-width:var(--rtk-space-24, 96px)}header .channel-tools rtk-tooltip{height:var(--rtk-space-8, 32px);width:var(--rtk-space-10, 40px);display:flex}header .search-input{height:var(--rtk-space-8, 32px);width:var(--rtk-space-48, 192px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}header .name{font-size:16px}header .br-primary-btn{background-color:transparent}header .br-primary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}@media (orientation: landscape) and (min-width: 400px){header.searching .channel-details{display:flex}}.back-btn{margin-right:var(--rtk-space-3, 12px)}";
const RtkChannelHeaderStyle0 = rtkChannelHeaderCss;

var __decorate$E = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChannelHeader = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.search = index$1.createEvent(this, "search", 7);
        this.searchDismissed = index$1.createEvent(this, "searchDismissed", 7);
        this.back = index$1.createEvent(this, "back", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
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
        return (index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => {
                this.showChannelDetailsDialog = false;
            }, iconPack: this.iconPack, t: this.t }, index$1.h("rtk-channel-details", { members: this.members, channel: this.channel })));
    }
    render() {
        if (!this.channel) {
            return null;
        }
        return (index$1.h(index$1.Host, null, this.showChannelDetailsDialog && this.renderChannelDetails(), index$1.h("header", { class: {
                searching: this.showSearchBar,
            } }, this.showBackButton && (index$1.h("rtk-button", { kind: "icon", variant: "secondary", class: "back-btn", onClick: () => {
                this.back.emit();
            } }, index$1.h("rtk-icon", { icon: this.iconPack.chevron_left }))), index$1.h("div", { class: "channel-details" }, index$1.h("span", { class: "name" }, this.channel.displayName), !this.channel.isDirectMessage && (index$1.h("span", { class: "members" }, this.members.map((member) => member.name).join(', ')))), index$1.h("div", { class: "channel-tools" }, !this.channel.isDirectMessage && (index$1.h("rtk-tooltip", { label: this.t('chat.channel_members'), variant: "primary" }, index$1.h("rtk-button", { kind: "button", variant: "secondary", size: "md", onClick: () => {
                this.showChannelDetailsDialog = !this.showChannelDetailsDialog;
            }, class: "br-primary-btn" }, index$1.h("rtk-icon", { icon: this.iconPack.people }))))))));
    }
    static get watchers() { return {
        "channel": ["onChannelChanged"]
    }; }
};
__decorate$E([
    index.SyncWithStore()
], RtkChannelHeader.prototype, "meeting", void 0);
__decorate$E([
    index.SyncWithStore()
], RtkChannelHeader.prototype, "iconPack", void 0);
__decorate$E([
    index.SyncWithStore()
], RtkChannelHeader.prototype, "t", void 0);
RtkChannelHeader.style = RtkChannelHeaderStyle0;

const rtkChannelSelectorViewCss = ".scrollbar {\n  /* For Firefox */\n  scrollbar-width: thin;\n  scrollbar-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent);\n}\n\n/* For WebKit */\n.scrollbar::-webkit-scrollbar {\n  height: var(--rtk-space-1\\.5, 6px);\n  width: var(--rtk-space-1\\.5, 6px);\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-background, transparent);\n}\n\n.scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)));\n}\n\n\n:host {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));\n  position: relative;\n  z-index: 10;\n  height: var(--rtk-space-12, 48px);\n  min-height: 48px;\n}\n\n.dropdown-trigger {\n  height: 100%;\n  width: 100%;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  padding: var(--rtk-space-4, 16px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));\n  font-size: 14px;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  cursor: pointer;\n  position: absolute;\n  z-index: 20;\n}\n\n.dropdown-trigger span {\n  display: flex;\n  flex: 1 1 0%;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.dropdown-trigger rtk-icon {\n  margin-left: var(--rtk-space-1, 4px);\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n  flex-shrink: 0;\n}\n\n@container chatcontainer (height < 360px) {\n  .dropdown-trigger {\n    padding: var(--rtk-space-2, 8px);\n  }\n  .dropdown {\n    top: var(--rtk-space-8, 32px) !important;\n  }\n  .search-container {\n    padding-left: var(--rtk-space-0, 0px) !important;\n    padding-right: var(--rtk-space-0, 0px) !important;\n    padding-top: var(--rtk-space-0, 0px) !important;\n    padding-bottom: var(--rtk-space-0, 0px) !important;\n  }\n  input {\n    height: var(--rtk-space-8, 32px) !important;\n    border-radius: var(--rtk-border-radius-none, 0) !important;\n  }\n  .channel {\n    height: var(--rtk-space-8, 32px) !important;\n    border-radius: var(--rtk-border-radius-sm, 4px) !important;\n  }\n  .avatar-icon {\n    height: var(--rtk-space-3, 12px) !important;\n    width: var(--rtk-space-3, 12px) !important;\n    padding: var(--rtk-space-1, 4px) !important;\n  }\n\n  rtk-avatar {\n    height: var(--rtk-space-5, 20px) !important;\n    width: var(--rtk-space-5, 20px) !important;\n  }\n}\n\n.dropdown {\n  position: absolute;\n  width: 100%;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));\n  top: var(--rtk-space-12, 48px);\n  z-index: 10;\n  animation: 0.3s slide-down ease;\n}\n\n.dropdown .channels-container {\n  max-height: var(--rtk-space-80, 320px);\n}\n\n.list {\n  display: flex;\n  flex-direction: column;\n}\n\n.list .channel .channel-data {\n  align-items: flex-start;\n}\n\n.unread-count {\n  display: flex;\n  justify-content: center;\n  height: var(--rtk-space-5, 20px);\n  min-width: var(--rtk-space-3, 12px);\n  border-radius: 9999px;\n  padding-left: var(--rtk-space-1, 4px);\n  padding-right: var(--rtk-space-1, 4px);\n  font-size: 12px;\n  line-height: 1.25rem;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n}\n\ninput {\n  height: var(--rtk-space-9, 36px);\n  width: 100%;\n  padding-left: var(--rtk-space-3, 12px);\n  padding-right: var(--rtk-space-3, 12px);\n  box-sizing: border-box;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  border-radius: var(--rtk-border-radius-sm, 4px);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\n.search-container {\n  display: flex;\n  flex-shrink: 0;\n  flex-grow: 0;\n  flex-basis: auto;\n  align-items: center;\n  padding-top: var(--rtk-space-3, 12px);\n  padding-bottom: var(--rtk-space-3, 12px);\n  padding-left: var(--rtk-space-2, 8px);\n  padding-right: var(--rtk-space-2, 8px);\n  border-bottom: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-700, 44 44 44));\n}\n\n.search-container rtk-icon {\n  margin-left: calc(var(--rtk-space-8, 32px) * -1);\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n  color: rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76));\n}\n\n.channels-container {\n  display: flex;\n  flex-direction: column;\n  gap: var(--rtk-space-1, 4px);\n  padding: var(--rtk-space-2, 8px);\n  flex: 1 1 auto;\n  overflow-y: auto;\n}\n\n.channel {\n  flex-shrink: 0;\n  box-sizing: border-box;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  background-color: transparent;\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  cursor: pointer;\n  border-radius: var(--rtk-border-radius-md, 8px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--rtk-space-2, 8px);\n  height: var(--rtk-space-16, 64px);\n  width: 100%;\n  padding-left: var(--rtk-space-2, 8px);\n  padding-right: var(--rtk-space-3, 12px);\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.channel:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n}\n\n.channel .channel-data {\n  flex: 1 1 0%;\n  align-items: center;\n  justify-content: space-between;\n  display: flex;\n  gap: var(--rtk-space-2, 8px);\n}\n\n.channel .name {\n  font-size: 16px;\n}\n\n.channel .name, \n  .channel .last-message {\n  max-width: var(--rtk-space-40, 160px);\n  text-align: left;\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n}\n\n.channel .no-message {\n  font-style: italic;\n}\n\n.channel rtk-avatar {\n  height: var(--rtk-space-12, 48px);\n  width: var(--rtk-space-12, 48px);\n  overflow: clip;\n  border-radius: 9999px;\n  font-size: 14px;\n}\n\n.channel .avatar-icon {\n  height: var(--rtk-space-6, 24px);\n  width: var(--rtk-space-6, 24px);\n  padding: var(--rtk-space-3, 12px);\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n  overflow: clip;\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n}\n\n.channel time, \n  .channel .last-message {\n  font-size: 12px;\n  color: rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76));\n}\n\n.channel.active {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n}\n\n.channel.active .unread-count {\n  background-color: rgb(var(--rtk-colors-text-on-brand-800, var(--rtk-colors-text-800, 255 255 255 / 0.76)));\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity));\n}\n\n.channel.active time {\n  color: rgb(var(--rtk-colors-text-on-brand-800, var(--rtk-colors-text-800, 255 255 255 / 0.76)));\n}\n\n.channel.active .last-message {\n  color: rgb(var(--rtk-colors-text-on-brand-700, var(--rtk-colors-text-700, 255 255 255 / 0.64)));\n}\n\n.channel.active rtk-avatar {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));\n}\n\n.col {\n  gap: var(--rtk-space-1, 4px);\n  display: flex;\n  flex-direction: column;\n}\n\n.channel-meta {\n  flex-shrink: 0;\n  align-items: flex-end;\n}\n\n@keyframes slide-down {\n  from {\n    transform: translateY(-50px);\n  }\n  to {\n    transform: translateY(0%);\n  }\n}\n";
const RtkChannelSelectorViewStyle0 = rtkChannelSelectorViewCss;

var __decorate$D = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChannelSelectorView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.channelChange = index$1.createEvent(this, "channelChange", 7);
        /** Disables search bar (default = false) */
        this.disableSearch = false;
        /** Hides avatar (default = false) */
        this.hideAvatar = false;
        /** Icon Pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Render as dropdown or list (default = list) */
        this.viewAs = 'list';
        this.searchQuery = '';
        this.showDropdown = false;
        this.calculateListHeight = debounce.debounce(() => {
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
        return (index$1.h(index$1.Host, { key: 'adc8ab4b9c8c865998588fbd9766296f18b3e48e' }, this.viewAs === 'list' && index$1.h("slot", { key: 'e5740725a4349472ca2eb1fb0816eb2311a99838', name: "header" }), shouldShowDropdown && (index$1.h("div", { key: '425adc920c28e0421e07bb0bd9f61b31c42fcda9', class: {
                dropdown: this.viewAs === 'dropdown',
                scrollbar: this.viewAs === 'dropdown',
                list: this.viewAs === 'list',
            } }, !this.disableSearch && (index$1.h("div", { key: '9fbbc48d8489f2a6490729fac1fecdef1838e84a', class: "search-container", ref: (el) => (this.$searchEl = el) }, index$1.h("input", { key: 'f7fb43662d50274f80380b735ef9f5fc0b215442', type: "text", placeholder: this.t('chat.search_conversations'), value: this.searchQuery, onInput: (e) => (this.searchQuery = e.target.value) }), index$1.h("rtk-icon", { key: 'af76e65a1397d2a6e557a28b687e26aef641c568', icon: this.iconPack.search }))), index$1.h("div", { key: '0711a9cfcc811269a5020dc41030c0daee5cc8bf', class: "channels-container scrollbar", ref: (el) => (this.$listEl = el) }, filteredChannels.map((channel) => {
            return (index$1.h("button", { class: { channel: true, active: this.selectedChannelId === channel.id }, onClick: () => this.onChannelClickHandler(channel) }, !this.hideAvatar && (index$1.h("div", null, channel.icon ? (index$1.h("rtk-icon", { class: "avatar-icon", icon: this.iconPack[channel.icon] })) : (index$1.h("rtk-avatar", { participant: {
                    name: channel.name,
                    picture: channel.avatarUrl,
                } })))), index$1.h("div", { class: "channel-data" }, index$1.h("div", { class: "col" }, index$1.h("div", { class: "name" }, channel.name), channel.latestMessage && (index$1.h("div", { class: {
                    'last-message': true,
                    'no-message': !channel.latestMessage,
                } }, index$1.h("rtk-text-message-view", { isMarkdown: true, text: channel.latestMessage })))), index$1.h("div", { class: "col channel-meta" }, channel.latestMessageTime && (index$1.h("time", { class: "time" }, this.getTimeLabel(channel.latestMessageTime))), channel.unreadCount > 0 && (index$1.h("div", { class: "unread-count" }, channel.unreadCount))))));
        })))), this.viewAs === 'dropdown' && (index$1.h("button", { key: '0c87f90d6d0fe22284995ab7259689f80a862829', class: "dropdown-trigger", onClick: this.toggleDropdown }, index$1.h("span", { key: 'd1a364f2c5c57d19702d0b8707ca661c1dc4c14f' }, this.selectedChannelId &&
            `${this.t('to')} ${this.getChannelById(this.selectedChannelId).name}`, this.getTotalUnreads() > 0 && (index$1.h("div", { key: 'bf789f9df82851825bc6ea12a19a5f37ab74aefe', class: "unread-count" }, this.getTotalUnreads()))), index$1.h("rtk-icon", { key: 'c0d03f883f4c46b2698be0f197751fc0470717ea', icon: this.showDropdown ? this.iconPack.chevron_up : this.iconPack.chevron_down })))));
    }
    get $el() { return index$1.getElement(this); }
};
__decorate$D([
    index.SyncWithStore()
], RtkChannelSelectorView.prototype, "iconPack", void 0);
__decorate$D([
    index.SyncWithStore()
], RtkChannelSelectorView.prototype, "t", void 0);
RtkChannelSelectorView.style = RtkChannelSelectorViewStyle0;

const rtkChatCss = ":host {\n  line-height: initial;\n  font-family: var(--rtk-font-family, sans-serif);\n\n  font-feature-settings: normal;\n  font-variation-settings: normal;\n}\n\np {\n  margin: var(--rtk-space-0, 0px);\n  padding: var(--rtk-space-0, 0px);\n}\n\n.scrollbar {\n  /* For Firefox */\n  scrollbar-width: thin;\n  scrollbar-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent);\n}\n\n/* For WebKit */\n.scrollbar::-webkit-scrollbar {\n  height: var(--rtk-space-1\\.5, 6px);\n  width: var(--rtk-space-1\\.5, 6px);\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-background, transparent);\n}\n\n.scrollbar::-webkit-scrollbar-thumb {\n  border-radius: 9999px;\n  background-color: var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)));\n}\n\n\n:host {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-direction: column;\n  font-size: 14px;\n  position: relative;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\nh3 {\n  margin: var(--rtk-space-0, 0px);\n  display: flex;\n  height: var(--rtk-space-12, 48px);\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  font-weight: 400;\n  color: rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));\n  text-align: center;\n}\n\n#dropzone {\n  position: absolute;\n  top: var(--rtk-space-0, 0px);\n  right: var(--rtk-space-0, 0px);\n  bottom: var(--rtk-space-0, 0px);\n  left: var(--rtk-space-0, 0px);\n  z-index: 10;\n  display: none;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));\n}\n\n#dropzone.active {\n  display: flex;\n  animation: 0.2s slide-up ease-in;\n}\n\nrtk-chat-messages-ui,\nrtk-chat-messages-ui-paginated {\n  flex: 1 0 0;\n}\n\nrtk-chat-composer-view {\n  margin: var(--rtk-space-2, 8px);\n}\n\n.chat-container {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex-direction: row;\n  container-type: size;\n  container-name: chatcontainer;\n}\n\n@container chatcontainer (height < 360px) {\n  rtk-channel-selector-view {\n    height: var(--rtk-space-8, 32px);\n    min-height: 24px;\n  }\n}\n\n.chat {\n  display: flex;\n  flex: 1 1 0%;\n  flex-direction: column;\n}\n\n.banner {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n\n.banner .welcome-new-channel {\n  width: var(--rtk-space-48, 192px);\n}\n\n.banner .create-channel-illustration {\n  height: var(--rtk-space-40, 160px);\n  width: var(--rtk-space-40, 160px);\n}\n\n.channel-selector-header {\n  box-sizing: border-box;\n  height: var(--rtk-space-16, 64px);\n  padding: var(--rtk-space-4, 16px);\n  display: flex;\n  justify-content: space-between;\n  border-bottom: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-700, 44 44 44));\n}\n\n.channel-selector-header .channel-create-btn {\n  width: var(--rtk-space-8, 32px);\n  justify-content: center;\n}\n\n.channel-selector-header .channel-create-btn:hover {\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));\n}\n\n.view-chats-btn {\n  margin-top: var(--rtk-space-4, 16px);\n}\n\n.selector-container {\n  z-index: 50;\n  width: 100%;\n  max-width: var(--rtk-space-80, 320px);\n  border-right: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n}\n\n.selector-container.hide {\n  display: none;\n}\n\n.mobile-close-btn {\n  display: none;\n}\n\n.selector-container.mobile {\n  height: 100%;\n  width: 100%;\n  max-width: 100%;\n  position: absolute;\n  top: var(--rtk-space-0, 0px);\n  right: var(--rtk-space-0, 0px);\n  bottom: var(--rtk-space-0, 0px);\n  left: var(--rtk-space-0, 0px);\n  background-color: rgba(var(--rtk-colors-background-1000, 8 8 8) / 0.6);\n  display: flex;\n}\n\n.selector-container.mobile rtk-channel-selector-view {\n  max-width: var(--rtk-space-96, 384px);\n    animation: 0.3s swipe-in;\n}\n\n.selector-container.mobile .mobile-close-btn {\n  margin-top: var(--rtk-space-4, 16px);\n  margin-bottom: var(--rtk-space-4, 16px);\n  margin-left: var(--rtk-space-6, 24px);\n  margin-right: var(--rtk-space-6, 24px);\n  display: block;\n}\n\n.pinned-messages-header {\n  display: flex;\n  align-items: center;\n  gap: var(--rtk-space-2, 8px);\n  padding: var(--rtk-space-2, 8px);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n  font-size: 12px;\n  cursor: pointer;\n}\n\n.pinned-messages-header rtk-icon {\n  height: var(--rtk-space-3, 12px);\n  width: var(--rtk-space-3, 12px);\n}\n\n.pinned-messages-header:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n}\n\n.pinned-messages-header.active {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n}\n\n@keyframes swipe-in {\n  from {\n    transform: translateX(-100%);\n  }\n  to {\n    transform: translateX(0);\n  }\n}\n";
const RtkChatStyle0 = rtkChatCss;

var __decorate$C = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChat = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
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
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
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
            chat.handleFilesDataTransfer(e.dataTransfer.items, (type, file) => {
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
            return this.selectedGroup === 'everyone' && uiStore.usePaginatedChat(this.meeting);
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
                const targetKey = chat.generateChatGroupKey(allParticipants);
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
            if (channel.id.includes(chat.TEMPORARY_CHANNEL_PREFIX)) {
                this.createDMChannel(channel.id.replace(chat.TEMPORARY_CHANNEL_PREFIX, ''));
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
                .filter((channel) => !chat.isDirectMessageChannel(channel))
                .sort((a, b) => chat.alphabeticalSorter(a.displayName, b.displayName));
            const membersWithChannel = allChannels.filter(chat.isDirectMessageChannel).map((channel) => {
                return Object.assign(Object.assign({}, channel), { displayName: this.getMemberDisplayName(channel) });
            });
            const membersWithoutChannel = this.meeting.participants.all
                .toArray()
                .filter((member) => {
                if (member.userId === this.meeting.self.userId)
                    return false;
                const matcher = chat.getDMComparator([this.meeting.self.userId, member.userId]);
                return membersWithChannel.every((channel) => chat.getDMComparator(channel.memberIds) !== matcher);
            })
                .map((member) => {
                return {
                    id: `${chat.TEMPORARY_CHANNEL_PREFIX}${member.userId}`,
                    displayName: member.name,
                    displayPictureUrl: member.picture,
                    isDirectMessage: true,
                    unreadCount: 0,
                };
            });
            const dms = [...membersWithChannel, ...membersWithoutChannel].sort((a, b) => chat.alphabeticalSorter(a.displayName, b.displayName));
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
                            ? chat.stripOutReplyBlock(channel.latestMessage.message)
                            : '';
                    result.latestMessageTime = channel.latestMessage.time;
                }
                return result;
            });
        };
        this.getPrivateChatRecipients = () => {
            const participants = this.getFilteredParticipants().map((participant) => {
                const key = chat.generateChatGroupKey([participant.userId, this.meeting.self.userId]);
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
            return (index$1.h("rtk-tooltip", { label: this.t('chat.toggle_pinned_msgs') }, index$1.h("div", { class: { 'pinned-messages-header': true, active: this.showPinnedMessages }, onClick: this.onTogglePinnedMessages }, index$1.h("rtk-icon", { icon: this.iconPack.pin }), this.t('chat.pinned_msgs'), ` (${this.meeting.chat.pinned.length})`)));
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
                ((_e = meeting === null || meeting === void 0 ? void 0 : meeting.__internals__) === null || _e === void 0 ? void 0 : _e.features.hasFeature(uiStore.FlagsmithFeatureFlags.PINNED_MESSAGES)) &&
                    meeting.self.permissions.pinParticipant;
            this.isGroupCall = meeting.meta.viewType === 'GROUP_CALL';
            this.isChatViewType = meeting.meta.viewType === 'CHAT';
            if (this.isChatViewType) {
                this.onChannelCreateOrUpdate();
                const validChannels = this.channels.filter((channel) => !channel.id.includes(chat.TEMPORARY_CHANNEL_PREFIX));
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
            const lastReadTimestamp = (_a = uiStore.chatUnreadTimestamps[key]) !== null && _a !== void 0 ? _a : 0;
            unreadCounts[key] = chatGroups[key].filter((c) => c.type == 'chat' &&
                c.message.time > lastReadTimestamp &&
                c.message.userId !== this.meeting.self.userId).length;
            if (key ===
                chat.generateChatGroupKey([this.meeting.self.userId, (_b = this.selectedParticipant) === null || _b === void 0 ? void 0 : _b.userId]) ||
                (key === 'everyone' && this.selectedParticipant === null)) {
                unreadCounts[key] = 0;
                uiStore.chatUnreadTimestamps[key] = new Date();
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
        const parsedMessage = chat.parseMessageForTarget(message);
        let key = 'everyone';
        if (((_a = parsedMessage.targetUserIds) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const allParticipants = new Set([
                parsedMessage.userId,
                ...parsedMessage.targetUserIds,
            ]);
            key = chat.generateChatGroupKey(Array.from(allParticipants));
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
        return (index$1.h(index$1.Fragment, null, index$1.h("rtk-dialog-manager", { meeting: this.meeting }), index$1.h("rtk-notifications", { meeting: this.meeting })));
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
        return (index$1.h("rtk-chat-composer-view", Object.assign({ message: message, storageKey: (_a = this.selectedChannelId) !== null && _a !== void 0 ? _a : `draft-${this.selectedChannelId}`, quotedMessage: quotedMessage, isEditing: !!this.editingMessage, canSendTextMessage: this.isTextMessagingAllowed(), canSendFiles: this.isFileMessagingAllowed(), disableEmojiPicker: !!((_c = (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.__internals__) === null || _c === void 0 ? void 0 : _c.features.hasFeature(uiStore.FlagsmithFeatureFlags.DISABLE_EMOJI_PICKER)), maxLength: this.meeting.chat.maxTextLimit, rateLimits: this.meeting.chat.rateLimits, inputTextPlaceholder: this.t('chat.message_placeholder'), onNewMessage: this.onNewMessageHandler, onEditMessage: this.onEditMessageHandler, onEditCancel: this.onEditCancel, onQuotedMessageDismiss: this.onQuotedMessageDismiss }, uiProps), index$1.h("slot", { name: "chat-addon", slot: "chat-addon" })));
    }
    renderFullChat() {
        if (this.creatingChannel) {
            return (index$1.h("div", { class: "banner" }, index$1.h("rtk-spinner", { size: "lg" })));
        }
        if (this.channels.length === 0 || !this.selectedChannelId) {
            return (index$1.h("div", { class: "banner" }, index$1.h("rtk-icon", { icon: this.iconPack.create_channel_illustration, slot: "start", class: 'create-channel-illustration' }), index$1.h("rtk-button", { kind: "wide", variant: "primary", size: "md", onClick: this.onChannelCreateClicked, class: "welcome-new-channel" }, index$1.h("rtk-icon", { icon: this.iconPack.add, slot: "start" }), index$1.h("span", null, this.t('chat.new_channel'))), (this.selectorState === 'mobile' || this.selectorState === 'hide') && (index$1.h("rtk-button", { kind: "button", variant: "secondary", size: "md", class: "view-chats-btn", onClick: () => {
                    this.selectorState = 'mobile';
                } }, index$1.h("rtk-icon", { icon: this.iconPack.chat, slot: "start" }), index$1.h("span", null, this.t('chat.view_chats'))))));
        }
        const selectedChannel = this.channels.find((channel) => channel.id === this.selectedChannelId);
        return (index$1.h("div", { class: "chat" }, index$1.h("rtk-channel-header", { slot: "header", meeting: this.meeting, channel: selectedChannel, onSearch: this.onSearchHandler, onSearchDismissed: this.onSearchDismissed, showBackButton: this.selectorState === 'mobile' || this.selectorState === 'hide', onBack: () => {
                this.selectorState = 'mobile';
            } }), this.searchQuery !== '' && (index$1.h("rtk-chat-search-results", { meeting: this.meeting, query: this.searchQuery, channelId: this.selectedChannelId })), this.searchQuery === '' && (index$1.h("rtk-chat-messages-ui-paginated", { meeting: this.meeting, size: this.size, iconPack: this.iconPack, t: this.t, selectedChannelId: this.selectedChannelId, selectedChannel: selectedChannel }))));
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
        return (index$1.h(index$1.Host, null, this.isChatViewType && this.renderHeadlessComponents(), index$1.h("div", { class: "chat-container" }, this.isChatViewType && (index$1.h("div", { class: { 'selector-container': true, [this.selectorState]: true } }, index$1.h("rtk-channel-selector-view", { channels: this.getChannelItems(), selectedChannelId: this.selectedChannelId, onChannelChange: this.onChannelChanged, t: this.t }, index$1.h("div", { class: "channel-selector-header", slot: "header" }, index$1.h("rtk-logo", { meeting: this.meeting, config: this.config, t: this.t }), index$1.h("rtk-tooltip", { label: this.t('chat.new_channel') }, index$1.h("rtk-button", { kind: "button", variant: "ghost", size: "md", onClick: this.onChannelCreateClicked, class: "channel-create-btn" }, index$1.h("rtk-icon", { icon: this.iconPack.add }))))), index$1.h("rtk-button", { kind: "icon", variant: "ghost", class: "mobile-close-btn", onClick: () => (this.selectorState = 'hide') }, index$1.h("rtk-icon", { icon: this.iconPack.dismiss })))), index$1.h("div", { class: "chat" }, this.isFileMessagingAllowed() && (index$1.h("div", { id: "dropzone", class: { active: this.dropzoneActivated }, part: "dropzone" }, index$1.h("rtk-icon", { icon: this.iconPack.attach }), index$1.h("p", null, this.t('chat.send_attachment')))), this.renderPinnedMessagesHeader(), this.isPrivateChatSupported() && (index$1.h("rtk-channel-selector-view", { channels: this.getPrivateChatRecipients(), selectedChannelId: ((_b = this.selectedParticipant) === null || _b === void 0 ? void 0 : _b.userId) || 'everyone', onChannelChange: this.updateRecipients, t: this.t, viewAs: "dropdown" })), this.isChatViewType ? (this.renderFullChat()) : this.usePaginatedChat() ? (index$1.h("rtk-chat-messages-ui-paginated", { meeting: this.meeting, onPinMessage: this.onPinMessage, onDeleteMessage: this.onDeleteMessage, size: this.size, iconPack: this.iconPack, t: this.t })) : (index$1.h("rtk-chat-messages-ui", Object.assign({ messages: chatMessages, selfUserId: selfUserId, selectedGroup: this.selectedGroup, onPinMessage: this.onPinMessage, canPinMessages: this.canPinMessages }, uiProps))), this.renderComposerUI()))));
    }
    get host() { return index$1.getElement(this); }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "chatGroups": ["chatGroupsChanged"],
        "displayFilter": ["onDisplayFilterChanged"]
    }; }
};
__decorate$C([
    index.SyncWithStore()
], RtkChat.prototype, "meeting", void 0);
__decorate$C([
    index.SyncWithStore()
], RtkChat.prototype, "config", void 0);
__decorate$C([
    index.SyncWithStore()
], RtkChat.prototype, "iconPack", void 0);
__decorate$C([
    index.SyncWithStore()
], RtkChat.prototype, "t", void 0);
RtkChat.style = RtkChatStyle0;

const rtkChatComposerViewCss = ":host {\n  display: flex;\n  flex-direction: column;\n  font-family: var(--rtk-font-family, sans-serif);\n  font-size: 14px;\n  position: relative;\n}\n\n.quoted-message-container {\n  margin-bottom: var(--rtk-space-2, 8px);\n  display: flex;\n  justify-content: space-between;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  border-radius: var(--rtk-border-radius-md, 8px);\n  border: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n}\n\n.quoted-message-container .quoted-message {\n  flex: 1 1 0%;\n  padding: var(--rtk-space-2, 8px);\n  border-radius: var(--rtk-border-radius-md, 8px);\n  max-height: var(--rtk-space-24, 96px);\n  overflow-y: auto;\n  word-break: break-all;\n}\n\n.quoted-message-container .quoted-message blockquote {\n  display: none;\n}\n\n.quoted-message-container rtk-icon.dismiss {\n  margin-left: auto;\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n  padding: var(--rtk-space-2, 8px);\n  border-radius: var(--rtk-border-radius-md, 8px);\n  color: rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));\n}\n\n.quoted-message-container rtk-icon.dismiss:hover {\n  cursor: pointer;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\n.quoted-message-container rtk-icon.dismiss {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n\n.composer-container {\n  position: relative;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  border-radius: var(--rtk-border-radius-md, 8px);\n  overflow: hidden;\n  border: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n}\n\n.composer-container > .composers {\n    min-height: 60px;\n  }\n\n@container chatcontainer (height < 360px) {\n    .composer-container > .composers {\n      min-height: 30px;\n    }\n}\n\n.chat-buttons {\n  padding: var(--rtk-space-3, 12px);\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n}\n\n.chat-buttons .right {\n  z-index: 10;\n}\n\n.chat-buttons .right .edit-buttons {\n  display: flex;\n  gap: var(--rtk-space-2, 8px);\n}\n\n.chat-buttons > div {\n  display: flex;\n  align-items: center;\n}\n\nrtk-emoji-picker {\n  z-index: 20;\n  position: absolute;\n  top: calc(var(--rtk-space-72, 288px) * -1);\n  border-top: var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));\n  animation: 0.3s slide-up ease;\n}\n\n@keyframes slide-up {\n  from {\n    transform: translateY(100%);\n  }\n  to {\n    transform: translateY(0%);\n  }\n}\n";
const RtkChatComposerViewStyle0 = rtkChatComposerViewCss;

var __decorate$B = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
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
const RtkChatComposerView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onNewMessage = index$1.createEvent(this, "newMessage", 7);
        this.onEditMessage = index$1.createEvent(this, "editMessage", 7);
        this.onEditCancel = index$1.createEvent(this, "editCancel", 7);
        this.onQuotedMessageDismiss = index$1.createEvent(this, "quotedMessageDismiss", 7);
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
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
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
            if (this.textMessage.length >= ((_a = this.maxLength) !== null && _a !== void 0 ? _a : chat.MAX_TEXT_LENGTH)) {
                this.disableSendButton = true;
            }
            else if (this.disableSendButton) {
                this.disableSendButton = false;
            }
            uiStore.gracefulStorage.setItem(this.storageKey, event.detail);
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
            uiStore.gracefulStorage.setItem(this.storageKey, '');
            this.$textComposer.setText('', true);
            this.isEmojiPickerOpen = false;
        };
        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
    }
    connectedCallback() {
        this.textMessage = this.message || uiStore.gracefulStorage.getItem(this.storageKey) || '';
        this.checkRateLimitBreached(Date.now());
    }
    componentWillUpdate() {
        this.textMessage = this.message || uiStore.gracefulStorage.getItem(this.storageKey) || '';
    }
    componentDidLoad() {
        if (this.message) {
            index$1.writeTask(() => this.$textComposer.setText(this.message, true));
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
        return (index$1.h(index$1.Host, { key: '06455539e3067eb1c1c592b551d0ef99eba2f331' }, this.canSendTextMessage && this.isEmojiPickerOpen && (index$1.h("rtk-emoji-picker", Object.assign({ key: 'fe83b0ab9562cc0e1c61f89e4b441ef592edfa1a', part: "emoji-picker", onPickerClose: () => {
                this.isEmojiPickerOpen = false;
            }, onRtkEmojiClicked: (e) => {
                this.textMessage += e.detail;
                this.$textComposer.setText(this.textMessage, true);
            } }, uiProps))), index$1.h("slot", { key: '8653c2e805e41adf5958941cc10ff01d43f97792', name: "chat-addon" }), this.quotedMessage && this.quotedMessage.length !== 0 && (index$1.h("div", { key: '82b9bf5203a799709e980d61ab827b9daf8292e6', class: "quoted-message-container", part: "quoted-message-container" }, index$1.h("div", { key: '4b9fe8f382da7075e815c329f2d7dca17ce0f694', class: "quoted-message scrollbar" }, index$1.h("rtk-text-message-view", { key: '7a16547e83d9bca43794e46e56c5a9c743a9929a', text: this.quotedMessage, isMarkdown: true })), index$1.h("div", { key: '5691b8d882016cda66cd2faf3858bc38cd53458c' }, index$1.h("rtk-icon", { key: '2d5b222bd5eaac6d46812b704674f52f86efdb92', "aria-label": this.t('dismiss'), class: "dismiss", icon: this.iconPack.dismiss, onClick: this.onQuotedMessageDismissHandler })))), index$1.h("div", { key: 'd7638411df9ae1b2cbef8cae66d0af2b7ad310e6', class: "composer-container" }, index$1.h("div", { key: 'ca1ee222584fdd27e53989d28b6ce583c6b0c400', class: "composers" }, this.fileToUpload && (index$1.h("rtk-draft-attachment-view", Object.assign({ key: 'd511c900c71a97f8f92640b73a7575dcd267de88' }, uiProps, { attachment: this.fileToUpload, onDeleteAttachment: () => (this.fileToUpload = null) }))), !this.fileToUpload && (index$1.h("rtk-text-composer-view", { key: '08f214184853dcedeccb5f07dac2a0a308269793', value: this.textMessage, placeholder: this.inputTextPlaceholder, onTextChange: this.onTextChangeHandler, keyDownHandler: this.onKeyDownHandler, maxLength: (_a = this.maxLength) !== null && _a !== void 0 ? _a : chat.MAX_TEXT_LENGTH, rateLimitBreached: this.rateLimitsBreached, t: this.t, iconPack: this.iconPack, ref: (el) => (this.$textComposer = el) }))), index$1.h("div", { key: '9b6cbe7cb8529c8e60f8cc9e13cc95ca64504efc', class: "chat-buttons", part: "chat-buttons" }, index$1.h("div", { key: '30e24e8edf58179ef20ccd436d3833ba177ebb0d', class: "left", part: "chat-buttons-left" }, !this.fileToUpload && !this.isEditing && (index$1.h("div", { key: '54ad294bedab1c0bc7c02a72c4f3f51bc10bba85' }, this.canSendFiles && [
            index$1.h("rtk-file-picker-button", Object.assign({ key: '1a0760e05a183b6c8da2ff02e33ecd40bfdb6e97' }, uiProps, { onFileChange: (event) => this.onFileUploadHandler('file', event.detail) })),
            index$1.h("rtk-file-picker-button", Object.assign({ key: '5d6cf1928c8edb6737b367807c93152ad62cea36', filter: "image/*", label: this.t('chat.send_img'), icon: "image", onFileChange: (event) => this.onFileUploadHandler('image', event.detail) }, uiProps)),
        ], this.canSendTextMessage && !this.disableEmojiPicker && (index$1.h("rtk-emoji-picker-button", Object.assign({ key: '50f14152b8d15009104e9b1dd05ee5e1ec49ab16', isActive: this.isEmojiPickerOpen, onClick: () => {
                this.isEmojiPickerOpen = !this.isEmojiPickerOpen;
            } }, uiProps))), index$1.h("slot", { key: '1e1fe81e1e196fc8d679bfc2d6ed0c6402c74a4a', name: "chat-buttons" })))), index$1.h("div", { key: '272526b7c81ed1acd028beceb3869c584e94308f', class: "right", part: "chat-buttons-right" }, !this.isEditing && (index$1.h("rtk-tooltip", { key: '6750abf323b2f1c951661c44390eb97d3ec71544', variant: "primary", label: this.t('chat.send_msg'), delay: 2000 }, index$1.h("rtk-button", { key: 'a159fa6dcc1f8ede64085abd8286a69ad86b7002', kind: "icon", disabled: this.disableSendButton, onClick: () => this.handleSendMessage(), title: this.t('chat.send_msg') }, index$1.h("rtk-icon", { key: 'bb26a3a7954727859f5566ecc60d746ac6700b7b', icon: this.iconPack.send })))), this.isEditing && (index$1.h("div", { key: '5ef512e3fc236510a518e76ce027f0c8fc1c9a0c', class: "edit-buttons" }, index$1.h("rtk-tooltip", { key: 'e18ae7567350d32b18a70de8cb2c1af0830353bc', variant: "secondary", label: this.t('cancel'), delay: 2000 }, index$1.h("rtk-button", { key: '4f4aa2e44308a393314ab95244c87a3b8d4b282c', kind: "icon", variant: "secondary", onClick: () => this.handleEditCancel(), title: this.t('cancel') }, index$1.h("rtk-icon", { key: 'a4a99fe9ae34707cb63f63461a4728baf70e3e7a', icon: this.iconPack.dismiss }))), index$1.h("rtk-tooltip", { key: '789315dbf551ba74d004459981532fa9a467ac45', variant: "primary", label: this.t('chat.update_msg'), delay: 2000 }, index$1.h("rtk-button", { key: '61da43993c2da9b8bd00796544030e9b4cb45f12', kind: "icon", onClick: () => this.handleEditMessage(), title: this.t('chat.send_msg') }, index$1.h("rtk-icon", { key: 'e45aab29b0f6553ed2d7f370a8817bdccdabe42e', icon: this.iconPack.checkmark }))))))))));
    }
};
__decorate$B([
    index.SyncWithStore()
], RtkChatComposerView.prototype, "iconPack", void 0);
__decorate$B([
    index.SyncWithStore()
], RtkChatComposerView.prototype, "t", void 0);
RtkChatComposerView.style = RtkChatComposerViewStyle0;

const rtkChatMessageCss = ".message-wrapper{display:flex;gap:var(--rtk-space-2, 8px);margin-left:var(--rtk-space-4, 16px);margin-right:var(--rtk-space-4, 16px);margin-top:var(--rtk-space-4, 16px)}[is-continued] .message-wrapper{margin-top:var(--rtk-space-0, 0px)}.message-wrapper.align-right{flex-direction:row-reverse}.file-picker{display:none}.message{position:relative;display:flex}.show-on-hover rtk-menu{visibility:hidden}.show-on-hover:hover rtk-menu{visibility:visible}.align-right .message{justify-content:flex-end;margin-left:auto}.align-right .message .head{margin-right:var(--rtk-space-1, 4px);margin-left:var(--rtk-space-0, 0px);flex-direction:row-reverse;gap:var(--rtk-space-4, 16px)}.align-right .message rtk-text-message .bubble,.align-right .message rtk-image-message .bubble,.align-right .message rtk-file-message .bubble{padding-right:var(--rtk-space-5, 20px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.align-right .message .actions rtk-icon{color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.align-right rtk-menu{left:auto;right:var(--rtk-space-0, 0px)}.head{margin-bottom:var(--rtk-space-2, 8px);margin-left:var(--rtk-space-1, 4px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}.head .name{font-size:14px;font-weight:600}.head .time{font-size:12px;color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}rtk-menu{position:absolute;left:var(--rtk-space-0, 0px);top:var(--rtk-space-6, 24px);border-radius:var(--rtk-border-radius-lg, 12px)}rtk-menu rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);cursor:pointer}[is-continued] rtk-menu{top:var(--rtk-space-2, 8px)}.actions{display:flex;align-items:center;justify-content:center;padding:var(--rtk-space-0\\.5, 2px);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent}.actions rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.body{margin-top:var(--rtk-space-1, 4px);margin-bottom:var(--rtk-space-1, 4px);overflow-wrap:break-word;font-size:14px;line-height:1.375}.body .emoji{font-size:24px}.body.bubble{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-1, 4px);max-width:var(--rtk-space-96, 384px);padding-top:var(--rtk-space-3, 12px);padding-bottom:var(--rtk-space-3, 12px);padding-left:var(--rtk-space-5, 20px);padding-right:var(--rtk-space-5, 20px);overflow-wrap:break-word;font-size:14px;line-height:1.375;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.body.bubble p{margin:var(--rtk-space-0, 0px);word-break:break-word}p{margin:var(--rtk-space-0, 0px)}rtk-text-message,rtk-image-message,rtk-file-message{display:block;font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));box-sizing:border-box}*[is-continued]{margin-top:var(--rtk-space-0, 0px)}.image{position:relative;height:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);cursor:pointer}.image img{display:none;height:100%;width:100%;border-radius:var(--rtk-border-radius-sm, 4px);-o-object-fit:cover;object-fit:cover}.image .image-spinner{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.image .image-spinner rtk-spinner{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}.image .image-errored{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);background-color:rgba(var(--rtk-colors-danger, 255 45 45) / 0.1);--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.image .actions{display:none;height:var(--rtk-space-8, 32px);align-items:center;position:absolute;top:var(--rtk-space-2, 8px);right:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.image .actions .action{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);border-radius:var(--rtk-border-radius-none, 0);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.image .actions .action:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.image.loaded img{display:block}.image.loaded .image-spinner{display:none}.image:hover .actions,.image:focus .actions{display:flex}.file{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1\\.5, 6px);padding-bottom:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.file .file-data{flex:1 1 0%}.file .file-data .name{word-break:break-all;color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.file .file-data .file-data-split{margin-top:var(--rtk-space-0\\.5, 2px);display:flex;align-items:center;font-size:12px}.file .file-data .file-data-split .ext{margin-right:var(--rtk-space-2, 8px);text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.file .file-data .file-data-split .divider{height:var(--rtk-space-4, 16px);width:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.file .file-data .file-data-split .size{margin-left:var(--rtk-space-2, 8px)}a{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));text-decoration-line:none}a:hover{text-decoration-line:underline}.new-chat-marker{display:flex;width:100%;align-items:center;gap:var(--rtk-space-2, 8px);--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.new-chat-marker::before{content:'';height:1px;flex:1 1 0%;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}.show-new-messages-ctr{pointer-events:none;display:flex;justify-content:flex-end;padding:var(--rtk-space-3, 12px);z-index:0;margin-top:calc(var(--rtk-space-14, 56px) * -1)}.show-new-messages{pointer-events:auto;--tw-translate-y:calc(var(--rtk-space-6, 24px) * -1);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.show-new-messages.active{--tw-translate-y:var(--rtk-space-0, 0px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}blockquote{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px);background-color:transparent}.block-quote,blockquote{--tw-border-spacing-x:1px;--tw-border-spacing-y:1px;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-top-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-none, 0);border-left-width:var(--rtk-border-width-md, 2px);border-right-width:var(--rtk-border-width-none, 0);border-style:solid;border-left-color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));padding:var(--rtk-space-0\\.5, 2px);padding-left:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-2, 8px) !important;border-radius:var(--rtk-border-radius-sm, 4px);border-top-left-radius:var(--rtk-border-radius-none, 0);border-bottom-left-radius:var(--rtk-border-radius-none, 0)}.link{color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.align-right .block-quote{border-color:rgb(var(--rtk-colors-text-on-brand-600, var(--rtk-colors-text-600, 255 255 255 / 0.52)));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity))}.align-right .link{color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.align-right .image .actions rtk-icon{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.avatar{display:flex;width:var(--rtk-space-6, 24px)}.avatar rtk-avatar{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);font-size:10px}.message{width:75%}.left-align .body{margin-top:var(--rtk-space-4, 16px)}.left-align [is-continued] .body{margin-top:var(--rtk-space-0, 0px)}.left-align .body{--tw-translate-x:calc(var(--rtk-space-8, 32px) * -1);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}";
const RtkChatMessageStyle0 = rtkChatMessageCss;

var __decorate$A = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChatMessage = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.edit = index$1.createEvent(this, "edit", 7);
        this.reply = index$1.createEvent(this, "reply", 7);
        this.pin = index$1.createEvent(this, "pin", 7);
        this.delete = index$1.createEvent(this, "delete", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** if sender is self */
        this.isSelf = false;
        /** can edit message */
        this.canEdit = false;
        /** can delete message */
        this.canDelete = false;
        /** can quote reply this message */
        this.canReply = false;
        /** can pin this message */
        this.canPin = false;
        /** disables controls */
        this.disableControls = false;
        /** aligns message to right */
        this.alignRight = false;
        /** hides avatar */
        this.hideAvatar = false;
        this.now = new Date();
        /** Whether to left align the chat bubbles */
        this.leftAlign = false;
        this.renderMessage = () => {
            switch (this.message.type) {
                case 'text':
                    return (index$1.h("div", { "is-continued": this.isContinued, key: this.message.id }, this.isUnread && (index$1.h("div", { class: "new-chat-marker", part: "new-chat-marker" }, this.t('chat.new'))), index$1.h("rtk-text-message", { message: this.message, now: this.now, isContinued: this.isContinued, "data-timestamp": this.message.time.getTime(), iconPack: this.iconPack, t: this.t, showBubble: true })));
                case 'image':
                    return (index$1.h("div", { "is-continued": this.isContinued, key: this.message.id }, this.isUnread && (index$1.h("div", { class: "new-chat-marker", part: "new-chat-marker" }, this.t('chat.new'))), index$1.h("rtk-image-message", { message: this.message, now: this.now, isContinued: this.isContinued, iconPack: this.iconPack, "data-timestamp": this.message.time.getTime(), t: this.t, showBubble: true })));
                case 'file':
                    return (index$1.h("div", { "is-continued": this.isContinued, key: this.message.id }, this.isUnread && (index$1.h("div", { class: "new-chat-marker", part: "new-chat-marker" }, this.t('chat.new'))), index$1.h("rtk-file-message", { message: this.message, now: this.now, isContinued: this.isContinued, iconPack: this.iconPack, t: this.t, "data-timestamp": this.message.time.getTime(), showBubble: true })));
                case 'custom':
                    this.child.setAttribute('message', JSON.stringify(this.message));
                    const node = this.child.cloneNode(true);
                    return (index$1.h("div", { "is-continued": this.isContinued, key: this.message.id, ref: (el) => el.appendChild(node) }));
            }
        };
        this.onReply = () => {
            this.reply.emit(this.message);
        };
        this.onPinned = () => {
            this.pin.emit(this.message);
        };
        this.onDelete = () => {
            this.delete.emit(this.message);
        };
        this.onEdit = async () => {
            this.edit.emit(this.message);
        };
        this.isTouchDevice = () => {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        };
    }
    renderControls() {
        if (this.disableControls)
            return;
        return (index$1.h("rtk-menu", { placement: this.alignRight ? 'bottom-end' : 'bottom-start' }, index$1.h("button", { slot: "trigger", class: "actions" }, index$1.h("rtk-icon", { icon: this.iconPack.chevron_down })), index$1.h("rtk-menu-list", null, this.canReply && (index$1.h("rtk-menu-item", { onClick: this.onReply }, index$1.h("rtk-icon", { icon: this.iconPack.back, slot: "start" }), this.t('chat.reply'))), this.canPin && (index$1.h("rtk-menu-item", { onClick: this.onPinned }, index$1.h("rtk-icon", { icon: this.iconPack.pin, slot: "start" }), this.t('pin'))), this.canEdit && (index$1.h("rtk-menu-item", { onClick: this.onEdit }, index$1.h("rtk-icon", { icon: this.iconPack.edit, slot: "start" }), this.t('chat.edit_msg'))), this.canDelete && (index$1.h("rtk-menu-item", { onClick: this.onDelete }, index$1.h("rtk-icon", { icon: this.iconPack.delete, slot: "start" }), this.t('chat.delete_msg'))))));
    }
    renderAvatar() {
        if (this.hideAvatar)
            return;
        if (this.isContinued) {
            return index$1.h("div", { class: "avatar" });
        }
        return (index$1.h("div", { class: "avatar" }, index$1.h("rtk-avatar", { size: "sm", participant: {
                name: this.message.displayName,
                picture: this.senderDisplayPicture,
            } })));
    }
    render() {
        return (index$1.h(index$1.Host, { key: '50c4021e3c717d8d2c7e035ce6541adca05ca3d2' }, index$1.h("div", { key: '1f5a0d679baea7ea72855846f57fa8419e46f019', class: {
                'message-wrapper': true,
                'align-right': this.alignRight,
                'left-align': this.leftAlign,
            }, "is-continued": this.isContinued }, this.renderAvatar(), index$1.h("div", { key: '1f11244450725426035076a80fcc41a76ef0b7a4', class: {
                message: true,
                'show-on-hover': !this.isTouchDevice(),
            }, "is-continued": this.isContinued }, this.renderMessage(), this.renderControls()))));
    }
    get $el() { return index$1.getElement(this); }
};
__decorate$A([
    index.SyncWithStore()
], RtkChatMessage.prototype, "iconPack", void 0);
__decorate$A([
    index.SyncWithStore()
], RtkChatMessage.prototype, "t", void 0);
RtkChatMessage.style = RtkChatMessageStyle0;

const rtkChatMessagesUiCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));word-break:break-word}.chat-container{box-sizing:border-box;display:flex;flex-direction:column;padding-top:var(--rtk-space-4, 16px);padding-bottom:var(--rtk-space-4, 16px);flex:1 0 0px;overflow-y:scroll}.chat-container .spacer{flex:1 1 auto}.chat-container .chat{flex:0 0 auto}.file-picker{display:none}.chat .head{margin-bottom:var(--rtk-space-2, 8px);display:flex;align-items:center}.chat .head .name{margin-right:var(--rtk-space-2, 8px);font-size:12px;font-weight:700}.chat .head .time{font-size:12px;color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.chat .body{overflow-wrap:break-word;line-height:1.5}.chat .body .emoji{font-size:24px}p{margin:var(--rtk-space-0, 0px);line-height:1.5}rtk-message-view{margin-top:var(--rtk-space-2, 8px);display:block;padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));box-sizing:border-box}rtk-message-view::part(message){flex-grow:1}*[is-continued] rtk-message-view{margin-top:var(--rtk-space-1, 4px)}.pinned .message-wrapper{position:relative}.pinned .pin-button{position:absolute;right:var(--rtk-space-4, 16px);top:calc(var(--rtk-space-4, 16px) * -1);display:flex;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.pinned .pin-button:hover rtk-button{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-600, 13 81 253) / var(--tw-bg-opacity))}.pinned rtk-message-view{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px)}a{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));text-decoration-line:none}a:hover{text-decoration-line:underline}.new-chat-marker{display:flex;width:100%;align-items:center;gap:var(--rtk-space-2, 8px);--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity))}.new-chat-marker::before{content:'';height:1px;flex:1 1 0%;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}.show-new-messages-ctr{pointer-events:none;display:flex;justify-content:flex-end;padding:var(--rtk-space-3, 12px);z-index:0;margin-top:calc(var(--rtk-space-14, 56px) * -1)}.show-new-messages{pointer-events:auto;--tw-translate-y:var(--rtk-space-16, 64px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.show-new-messages.active{--tw-translate-y:var(--rtk-space-0, 0px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}";
const RtkChatMessagesUiStyle0 = rtkChatMessagesUiCss;

var __decorate$z = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChatMessagesUi = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onPinMessage = index$1.createEvent(this, "pinMessage", 7);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        this.observingEl = [];
        this.autoScrollEnabled = true;
        /** Chat Messages */
        this.messages = [];
        /** Can current user pin/unpin messages */
        this.canPinMessages = false;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.now = new Date();
        this.showLatestMessageButton = false;
        this.onScroll = (e) => {
            const target = e.target;
            index$1.writeTask(() => {
                const { scrollTop, clientHeight, scrollHeight } = target;
                const fromTop = scrollTop + clientHeight;
                if (fromTop + 10 >= scrollHeight) {
                    // at bottom
                    this.autoScrollEnabled = true;
                    this.showLatestMessageButton = false;
                }
                else {
                    // not at bottom
                    this.autoScrollEnabled = false;
                }
            });
        };
        this.scrollToBottom = () => {
            scroll.smoothScrollToBottom(this.$chat);
        };
        this.observeMessage = (el) => {
            if (el) {
                this.observingEl.push(el);
            }
            try {
                this.intersectionObserver.observe(el);
            }
            catch (_a) { }
        };
        this.getMessageActions = (message) => {
            const actions = [];
            if (!message.pinned && this.canPinMessages) {
                actions.push({
                    id: 'pin_message',
                    label: this.t('pin'),
                    icon: this.iconPack.pin,
                });
            }
            return actions;
        };
        this.onMessageActionHandler = (actionId, message) => {
            switch (actionId) {
                case 'pin_message':
                    this.onPinMessage.emit(message);
                    break;
            }
        };
    }
    connectedCallback() {
        var _a;
        this.lastReadTimestamp = (_a = uiStore.chatUnreadTimestamps['everyone']) !== null && _a !== void 0 ? _a : new Date('0001-01-01T00:00:00Z');
        this.intersectionObserver = new IntersectionObserver((entries) => {
            if (!document.hasFocus())
                return;
            index$1.writeTask(() => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const currTimestamp = parseInt(entry.target.getAttribute('data-timestamp'));
                        if (currTimestamp > this.lastReadTimestamp.getTime()) {
                            // this.lastReadTimestamp = new Date();
                            uiStore.chatUnreadTimestamps[this.selectedGroup] = new Date();
                        }
                    }
                }
            });
        });
        // update current time every minute
        const updateNow = () => {
            this.now = new Date();
            this.timeout = setTimeout(() => {
                if (this.request != null) {
                    this.request = requestAnimationFrame(updateNow);
                }
            }, 60 * 1000);
        };
        this.request = requestAnimationFrame(updateNow);
        this.chatChanged(this.messages);
    }
    componentDidLoad() {
        this.$chat.addEventListener('scroll', this.onScroll);
        this.$chat.scrollTop = this.$chat.scrollHeight;
    }
    componentDidRender() {
        if (this.autoScrollEnabled) {
            scroll.smoothScrollToBottom(this.$chat);
        }
        else if (this.autoScrollEnabled == null) {
            // scroll to bottom on first render
            scroll.smoothScrollToBottom(this.$chat, false);
        }
    }
    chatChanged(messages) {
        if (this.$chat == null)
            return;
        if (this.autoScrollEnabled || this.$chat.clientHeight === this.$chat.scrollHeight)
            return;
        for (let i = messages.length - 1; i >= 0; i--) {
            if (messages[i].message.time > this.lastReadTimestamp &&
                messages[i].message.userId !== this.selfUserId) {
                // show latest message button when you have new messages
                // and chat container is scrollable and autoscroll is not enabled
                this.showLatestMessageButton = true;
                break;
            }
        }
    }
    selectedBucketChanged() {
        this.autoScrollEnabled = undefined;
        this.observingEl.forEach((el) => {
            this.intersectionObserver.unobserve(el);
        });
        this.observingEl = [];
    }
    disconnectedCallback() {
        this.$chat.removeEventListener('scroll', this.onScroll);
        this.intersectionObserver.disconnect();
        clearTimeout(this.timeout);
        cancelAnimationFrame(this.request);
    }
    render() {
        var _a;
        let prevMessage = null;
        let reachedFirstUnread = false;
        return (index$1.h(index$1.Host, { key: '1e44ac8e6bd0eabff25aaedb905d80fb4007903d' }, index$1.h("div", { key: 'ffbb1fe97efc2408e2ee7e4bccef1cc8a3100b66', class: "chat-container scrollbar", ref: (el) => (this.$chat = el), part: "container" }, index$1.h("div", { key: '58d11c81a25a0760d3bdd9e60a8a6d0a96c022c2', class: "spacer", part: "spacer" }), index$1.h("div", { key: 'be68b5ccfd53bc7ec4c7dc23b10fe325a7c54314', class: "chat", part: "chat" }, (_a = this.messages) === null || _a === void 0 ? void 0 : _a.map((item) => {
            if (item.type === 'chat') {
                const { message } = item;
                const isSelfMessage = message.userId === this.selfUserId;
                const isUnread = !isSelfMessage &&
                    !this.autoScrollEnabled &&
                    !reachedFirstUnread &&
                    message.time > this.lastReadTimestamp;
                if (isUnread)
                    reachedFirstUnread = isUnread;
                const isContinued = !isUnread &&
                    message.userId === (prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.userId) &&
                    ChatHead.differenceInMinutes(message.time, prevMessage === null || prevMessage === void 0 ? void 0 : prevMessage.time) < 2;
                prevMessage = message;
                return (index$1.h("div", { "is-continued": isContinued, key: item.message.id, ref: this.observeMessage, "data-timestamp": message.time.getTime(), class: message.pinned ? 'pinned' : '' }, isUnread && (index$1.h("div", { class: "new-chat-marker", part: "new-chat-marker" }, this.t('chat.new'))), index$1.h("div", { class: "message-wrapper" }, index$1.h("rtk-message-view", { time: message.time, actions: this.getMessageActions(message), authorName: message.displayName, hideAuthorName: true, hideAvatar: true, hideMetadata: true, viewType: 'incoming', variant: "bubble", onAction: (event) => this.onMessageActionHandler(event.detail, message) }, !isContinued && (index$1.h("div", { class: "head" }, index$1.h("div", { class: "name" }, message.displayName), !!message.time && (index$1.h("div", { class: "time", title: ChatHead.formatDateTime(message.time) }, ChatHead.elapsedDuration(message.time, new Date(Date.now())))))), index$1.h("div", { class: "body" }, message.type === 'text' && (index$1.h("rtk-text-message-view", { text: message.message, isMarkdown: true })), message.type === 'file' && (index$1.h("rtk-file-message-view", { name: message.name, url: message.link, size: message.size })), message.type === 'image' && (index$1.h("rtk-image-message-view", { url: message.link, onPreview: () => {
                        this.stateUpdate.emit({ image: message });
                    } })))), message.pinned && (index$1.h("div", { class: "pin-button", part: "pin-button" }, index$1.h("rtk-tooltip", { label: this.t('unpin') }, index$1.h("rtk-button", { kind: "icon", variant: "ghost", onClick: () => this.onMessageActionHandler('pin_message', message), disabled: !this.canPinMessages }, index$1.h("rtk-icon", { icon: this.iconPack.pin, size: "sm" }))))))));
            }
            return null;
        }))), index$1.h("div", { key: 'ae321cae98279cb45e61968b5fab1806d8ae2f33', class: "show-new-messages-ctr" }, index$1.h("rtk-button", { key: 'e593e952615692612b2423e49975f97bb22df0fe', class: {
                'show-new-messages': true,
                active: this.showLatestMessageButton,
            }, kind: "icon", part: "show-new-messages", onClick: this.scrollToBottom }, index$1.h("rtk-icon", { key: '454e7ecb90b1660b882bb6f988beb1d7d0494d5f', icon: this.iconPack.chevron_down })))));
    }
    static get watchers() { return {
        "messages": ["chatChanged"],
        "selectedGroup": ["selectedBucketChanged"]
    }; }
};
__decorate$z([
    index.SyncWithStore()
], RtkChatMessagesUi.prototype, "iconPack", void 0);
__decorate$z([
    index.SyncWithStore()
], RtkChatMessagesUi.prototype, "t", void 0);
RtkChatMessagesUi.style = RtkChatMessagesUiStyle0;

const rtkChatMessagesUiPaginatedCss = ":host{display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));flex:1 0 0px}";
const RtkChatMessagesUiPaginatedStyle0 = rtkChatMessagesUiPaginatedCss;

var __decorate$y = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChatMessagesUiPaginated = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.editMessageInit = index$1.createEvent(this, "editMessageInit", 7);
        this.onPinMessage = index$1.createEvent(this, "pinMessage", 7);
        this.onDeleteMessage = index$1.createEvent(this, "deleteMessage", 7);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
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
            return (index$1.h("div", { class: { pinned: message.pinned } }, index$1.h("div", { class: "message-wrapper" }, index$1.h("rtk-message-view", { time: message.time, actions: this.getMessageActions(message), authorName: message.displayName, avatarUrl: displayPicture, hideAuthorName: isContinued, viewType: 'incoming', variant: "bubble", onAction: (event) => this.onMessageActionHandler(event.detail, message) }, index$1.h("div", null, index$1.h("div", { class: "body" }, message.type === 'text' && (index$1.h("rtk-text-message-view", { text: message.message, isMarkdown: true })), message.type === 'file' && (index$1.h("rtk-file-message-view", { name: message.name, url: message.link, size: message.size })), message.type === 'image' && (index$1.h("rtk-image-message-view", { url: message.link, onPreview: () => {
                    this.stateUpdate.emit({ image: message });
                } }))), message.pinned && (index$1.h("div", { class: "pin-icon", part: "pin-icon" }, index$1.h("rtk-icon", { icon: this.iconPack.pin, size: "sm" }))))))));
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
        return (index$1.h(index$1.Host, { key: 'd0ae21ca32589c18ede4b1e4b4682f5b82b58320' }, index$1.h("rtk-paginated-list", { key: 'bff3bdae7c6bbefed8dd8b478ac60370067c75a6', ref: (el) => (this.$paginatedListRef = el), pageSize: this.pageSize, pagesAllowed: 3, fetchData: this.getChatMessages, createNodes: this.createChatNodes, selectedItemId: this.selectedChannelId, emptyListLabel: this.t('chat.empty_channel') }, index$1.h("slot", { key: '043cfe627a1056c2267dd00705ff33e7e96f1f89' }))));
    }
    get host() { return index$1.getElement(this); }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "selectedChannelId": ["channelChanged"]
    }; }
};
__decorate$y([
    index.SyncWithStore()
], RtkChatMessagesUiPaginated.prototype, "meeting", void 0);
__decorate$y([
    index.SyncWithStore()
], RtkChatMessagesUiPaginated.prototype, "iconPack", void 0);
__decorate$y([
    index.SyncWithStore()
], RtkChatMessagesUiPaginated.prototype, "t", void 0);
RtkChatMessagesUiPaginated.style = RtkChatMessagesUiPaginatedStyle0;

const rtkChatSearchResultsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:100%;flex-direction:column;position:relative;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}";
const RtkChatSearchResultsStyle0 = rtkChatSearchResultsCss;

var __decorate$x = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkChatSearchResults = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
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
            return messages.map((message) => (index$1.h("rtk-chat-message", { key: message.id, message: message, disableControls: true })));
        };
    }
    render() {
        return (index$1.h(index$1.Host, { key: '9947c793cb766158d4ed3d81871bbdb8b60274af' }, index$1.h("rtk-paginated-list", { key: '0d91dc8818b08c7ed053728074c483f159811a41', pageSize: this.pageSize, pagesAllowed: 3, fetchData: this.searchMessages, createNodes: this.nodeRenderer, selectedItemId: this.query })));
    }
};
__decorate$x([
    index.SyncWithStore()
], RtkChatSearchResults.prototype, "meeting", void 0);
__decorate$x([
    index.SyncWithStore()
], RtkChatSearchResults.prototype, "iconPack", void 0);
__decorate$x([
    index.SyncWithStore()
], RtkChatSearchResults.prototype, "t", void 0);
RtkChatSearchResults.style = RtkChatSearchResultsStyle0;

const rtkConfirmationModalCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:var(--rtk-border-radius-md, 8px);padding:var(--rtk-space-8, 32px);width:100%;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));width:400px;max-width:80%}.leave-modal{width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--rtk-space-0, 0px)}.leave-modal .content{font-size:14px}.leave-modal p{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px)}.leave-meeting{display:flex;flex-direction:row;justify-content:space-between;gap:var(--rtk-space-4, 16px)}.leave-meeting rtk-button{color:rgb(var(--rtk-colors-text-1000, 255 255 255));flex:1 1 0%}.br-secondary-btn{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.br-secondary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}";
const RtkConfirmationModalStyle0 = rtkConfirmationModalCss;

var __decorate$w = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkConfirmationModal = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        this.keyPressListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.close = () => {
            this.states.activeConfirmationModal.onClose(this.stateUpdate, this.states, this.meeting);
            this.stateUpdate.emit({ activeConfirmationModal: { active: false } });
            this.states.activeConfirmationModal = { active: false };
        };
        this.onConfirmation = async () => {
            this.states.activeConfirmationModal.onClick(this.stateUpdate, this.states, this.meeting);
            this.stateUpdate.emit({ activeConfirmationModal: { active: false } });
            this.states.activeConfirmationModal = { active: false };
        };
    }
    connectedCallback() {
        document.addEventListener('keydown', this.keyPressListener);
    }
    componentDidLoad() { }
    disconnectedCallback() {
        document.removeEventListener('keydown', this.keyPressListener);
    }
    render() {
        var _a, _b;
        const state = this.states.activeConfirmationModal;
        return (index$1.h(index$1.Host, { key: 'c79124361c70a80d200f4021c7483038f330b683' }, index$1.h("div", { key: 'a1c812cc2742b0eca2525416e67579864a8c0ae7', class: "leave-modal" }, index$1.h("div", { key: '21edbc34bdd1c996707d297abf86a1c04a487396', class: "header" }, index$1.h("h2", { key: 'a7c77cf1a39bc46b787b851d51a5cd37695e44eb', class: "title" }, state.header ? this.t(state.header) : this.t('cta.confirmation'))), state.content && index$1.h("p", { key: '25ceecc3c208442821795ebf0a1a981b5130d1d9', class: "message" }, this.t(state.content)), index$1.h("div", { key: 'f081c0544fb467787cbfea432575d4a16a1c42c3', class: "content" }, index$1.h("div", { key: 'a7cf64611e6a516624310fbe0c119c279bec682d', class: "leave-meeting" }, index$1.h("rtk-button", { key: '469b16b167d943f369f9995c9b0d20225108303a', variant: "secondary", title: state.cancelText ? this.t(state.cancelText) : this.t('cancel'), onClick: this.close, class: "br-secondary-btn" }, state.cancelText ? this.t(state.cancelText) : this.t('cancel')), index$1.h("rtk-button", { key: '5fc8427e0b0c51fad3a4d033f1d6c4b4399477f3', onClick: () => this.onConfirmation(), variant: (_b = (_a = this.states.activeConfirmationModal) === null || _a === void 0 ? void 0 : _a.variant) !== null && _b !== void 0 ? _b : 'danger', title: state.ctaText ? this.t(state.ctaText) : this.t('yes') }, state.ctaText ? this.t(state.ctaText) : this.t('yes')))))));
    }
};
__decorate$w([
    index.SyncWithStore()
], RtkConfirmationModal.prototype, "meeting", void 0);
__decorate$w([
    index.SyncWithStore()
], RtkConfirmationModal.prototype, "states", void 0);
__decorate$w([
    index.SyncWithStore()
], RtkConfirmationModal.prototype, "iconPack", void 0);
__decorate$w([
    index.SyncWithStore()
], RtkConfirmationModal.prototype, "t", void 0);
RtkConfirmationModal.style = RtkConfirmationModalStyle0;

const rtkCounterCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;flex-direction:row;align-items:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));width:-moz-fit-content;width:fit-content;border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-1, 4px)}p{margin:var(--rtk-space-0, 0px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px)}input{margin:var(--rtk-space-0, 0px);width:var(--rtk-space-6, 24px);padding:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-sm, 1px);border-style:solid;border-color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));text-align:center;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));border-radius:var(--rtk-border-radius-sm, 4px);font-size:16px;outline:2px solid transparent;outline-offset:2px;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{margin:var(--rtk-space-0, 0px);appearance:none;-webkit-appearance:none}input[type='number']{-moz-appearance:textfield}";
const RtkCounterStyle0 = rtkCounterCss;

var __decorate$v = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkCounter = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onChange = index$1.createEvent(this, "valueChange", 7);
        /** Input */
        this.input = '1';
        /** Minimum value */
        this.minValue = 0;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    connectedCallback() {
        this.watchStateHandler(this.input);
        this.input = this.value.toString();
    }
    watchStateHandler(input) {
        this.onChange.emit(input);
    }
    increment() {
        this.input = Math.max(parseInt(this.input) + 1, this.minValue).toString();
    }
    decrement() {
        this.input = Math.max(this.minValue, parseInt(this.input) - 1).toString();
    }
    render() {
        return (index$1.h(index$1.Host, { key: '151ffb29ae91788d05b46f4c795b817c20a35b90' }, index$1.h("rtk-button", { key: '9568cb52875c92f57597033cc7b396fa5c2d0371', kind: "icon", variant: "ghost", onClick: () => this.decrement() }, index$1.h("rtk-icon", { key: '8ef248b64e90f01bd1f78db5048db148d7c374c9', icon: this.iconPack.subtract })), index$1.h("input", { key: '376d604bb62a6c9013e7361da51de8f05f34c870', type: "number", value: this.input, min: this.minValue, onInput: (e) => {
                const val = parseInt(e.target.value, 10);
                if (isNaN(val) || val < this.minValue) {
                    this.input = this.minValue.toString();
                }
                else {
                    this.input = val.toString();
                }
            } }), index$1.h("rtk-button", { key: 'cea8491840c69cf3856e97d97b5c4f34abf45e55', kind: "icon", variant: "ghost", onClick: () => this.increment() }, index$1.h("rtk-icon", { key: 'cb2146960e8c8368cce69fb8d8a696078bcea2fc', icon: this.iconPack.add }))));
    }
    static get watchers() { return {
        "input": ["watchStateHandler"]
    }; }
};
__decorate$v([
    index.SyncWithStore()
], RtkCounter.prototype, "iconPack", void 0);
__decorate$v([
    index.SyncWithStore()
], RtkCounter.prototype, "t", void 0);
RtkCounter.style = RtkCounterStyle0;

const rtkDebuggerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;overflow:hidden;border-radius:var(--rtk-border-radius-md, 8px);width:100%;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}header{margin-right:var(--rtk-space-2, 8px);display:flex;align-items:center;justify-content:space-between;padding-top:var(--rtk-space-0, 0px);padding-bottom:var(--rtk-space-0, 0px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px)}header h3{margin-top:var(--rtk-space-4, 16px);margin-bottom:var(--rtk-space-4, 16px)}.back-btn{border-radius:var(--rtk-border-radius-sm, 4px);background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.back-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}aside{box-sizing:border-box;display:flex;max-width:var(--rtk-space-56, 224px) !important;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding-left:var(--rtk-space-2, 8px)}aside button{margin-top:var(--rtk-space-4, 16px);box-sizing:border-box;display:flex;width:100%;align-items:center;justify-content:space-between;border-top-left-radius:var(--rtk-border-radius-sm, 4px);border-bottom-left-radius:var(--rtk-border-radius-sm, 4px);padding-left:var(--rtk-space-4, 16px);padding-right:var(--rtk-space-4, 16px);padding-top:var(--rtk-space-3, 12px);padding-bottom:var(--rtk-space-3, 12px);background-color:transparent;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));cursor:default;font-size:14px;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px}aside button .right{display:flex;align-items:center}aside button .right rtk-icon{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px)}aside button .right rtk-icon:last-child{margin-left:var(--rtk-space-4, 16px)}aside button[type='button']{cursor:pointer;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}aside button[type='button']:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}aside button[type='button']{border-right:var(--rtk-border-width-md, 2px) solid transparent}aside button.active{--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-border-opacity));background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / 0.2)}aside button.active:hover{background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / 0.2)}aside button.hidden{display:none}main{position:relative;box-sizing:border-box;display:flex;height:100%;width:100%;flex-direction:column}:host([size='sm']) aside{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));width:100% !important;max-width:100% !important;padding-left:var(--rtk-space-0, 0px)}:host([size='sm']) aside button{border-radius:var(--rtk-border-radius-none, 0)}:host([size='sm']) aside button.active{border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent}:host([size='sm']) aside button.active:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host([size='sm']) aside button.hidden{display:none}:host([size='sm']) aside.hide{display:none}aside button:host([size='sm']) aside.hide{display:none}:host([size='sm']) aside button:host([size='sm']) aside.hide{display:none}:host([size='sm']) main{display:none;height:100%;width:100%;padding:var(--rtk-space-0, 0px)}aside button:host([size='sm']) main{display:none}:host([size='sm']) aside button:host([size='sm']) main{display:none}:host([size='sm']) main.active{display:block}:host([size='sm']) header{margin:var(--rtk-space-0, 0px);justify-content:center}:host([size='sm']) header rtk-button{position:absolute;left:var(--rtk-space-4, 16px)}::-webkit-scrollbar{width:8px}::-webkit-scrollbar-track{border-radius:var(--rtk-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}::-webkit-scrollbar-thumb:hover{border-radius:var(--rtk-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.progress-bar{height:var(--rtk-space-1, 4px);width:100%;overflow:hidden;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.progress-indicator{height:100%;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}";
const RtkDebuggerStyle0 = rtkDebuggerCss;

var __decorate$u = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDebugger = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        this.keyPressListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.activeTab = 'audio';
        this.isMobileMainVisible = false;
        this.progress = 0;
    }
    connectedCallback() {
        document.addEventListener('keydown', this.keyPressListener);
    }
    disconnectedCallback() {
        this.keyPressListener && document.removeEventListener('keydown', this.keyPressListener);
    }
    progressUpdate(event) {
        this.progress = event.detail;
    }
    changeTab(tab) {
        this.activeTab = tab;
        if (this.size === 'sm') {
            if (!this.isMobileMainVisible) {
                this.isMobileMainVisible = true;
            }
        }
    }
    close() {
        this.stateUpdate.emit({ activeDebugger: false });
    }
    getActiveTab() {
        switch (this.activeTab) {
            case 'audio':
                return this.t('debugger.audio.troubleshooting.label');
            case 'screenshare':
                return this.t('debugger.screenshare.troubleshooting.label');
            case 'video':
                return this.t('debugger.video.troubleshooting.label');
            case 'system':
                return this.t('debugger.system.troubleshooting.label');
            default:
                return this.t('debugger.troubleshooting.label');
        }
    }
    render() {
        if (!this.meeting)
            return null;
        const defaults = {
            meeting: this.meeting,
            states: this.states,
            iconPack: this.iconPack,
            t: this.t,
            size: this.size,
        };
        const tab = this.getActiveTab();
        const showSystemsTab = typeof navigator.getBattery !== 'undefined';
        return (index$1.h(index$1.Host, null, index$1.h("aside", { class: { hide: this.isMobileMainVisible }, part: "menu" }, index$1.h("header", null, index$1.h("h3", null, this.t('debugger.troubleshooting.label'))), index$1.h("button", { type: "button", class: { active: this.activeTab === 'audio' }, onClick: () => this.changeTab('audio') }, this.t('debugger.audio.label'), index$1.h("div", { class: "right" }, index$1.h("rtk-icon", { icon: this.iconPack.mic_on }), this.size === 'sm' && index$1.h("rtk-icon", { icon: this.iconPack.chevron_right }))), index$1.h("button", { type: "button", class: { active: this.activeTab === 'video' }, onClick: () => this.changeTab('video') }, this.t('debugger.video.label'), index$1.h("div", { class: "right" }, index$1.h("rtk-icon", { icon: this.iconPack.video_on }), this.size === 'sm' && index$1.h("rtk-icon", { icon: this.iconPack.chevron_right }))), index$1.h("button", { type: "button", class: { active: this.activeTab === 'screenshare' }, onClick: () => this.changeTab('screenshare') }, this.t('debugger.screenshare.label'), index$1.h("div", { class: "right" }, index$1.h("rtk-icon", { icon: this.iconPack.share_screen_start }), this.size === 'sm' && index$1.h("rtk-icon", { icon: this.iconPack.chevron_right }))), index$1.h("button", { type: "button", class: { active: this.activeTab === 'system', hidden: !showSystemsTab }, onClick: () => this.changeTab('system') }, this.t('debugger.system.label'), index$1.h("div", { class: "right" }, index$1.h("rtk-icon", { icon: this.iconPack.settings }), this.size === 'sm' && index$1.h("rtk-icon", { icon: this.iconPack.chevron_right })))), index$1.h("main", { class: { active: this.isMobileMainVisible }, part: "main-content" }, this.size === 'sm' && (index$1.h("header", null, index$1.h("rtk-button", { kind: "icon", class: "back-btn", onClick: () => (this.isMobileMainVisible = false) }, index$1.h("rtk-icon", { icon: this.iconPack.chevron_left })), index$1.h("h4", null, tab))), this.activeTab === 'audio' && index$1.h("rtk-debugger-audio", Object.assign({}, defaults)), this.activeTab === 'video' && index$1.h("rtk-debugger-video", Object.assign({}, defaults)), this.activeTab === 'screenshare' && (index$1.h("rtk-debugger-screenshare", Object.assign({}, defaults))), this.activeTab === 'system' && showSystemsTab && (index$1.h("rtk-debugger-system", Object.assign({}, defaults))))));
    }
};
__decorate$u([
    index.SyncWithStore()
], RtkDebugger.prototype, "meeting", void 0);
__decorate$u([
    index.SyncWithStore()
], RtkDebugger.prototype, "states", void 0);
__decorate$u([
    index.SyncWithStore()
], RtkDebugger.prototype, "iconPack", void 0);
__decorate$u([
    index.SyncWithStore()
], RtkDebugger.prototype, "t", void 0);
RtkDebugger.style = RtkDebuggerStyle0;

/** Method to return media health based on the media & network stats */
function getNetworkBasedMediaHealth({ stats, }) {
    if (!stats || !stats.length) {
        return null;
    }
    let networkHealth = 'Good';
    const allStatsHealths = stats.map((statsObj) => statsObj.verdict);
    if (allStatsHealths.includes('Poor')) {
        networkHealth = 'Poor';
    }
    else if (allStatsHealths.includes('Average')) {
        networkHealth = 'Average';
    }
    return networkHealth;
}
/** Gives verdict based on the packet loss */
function getPacketLossVerdict({ packetLossPercentage, }) {
    let verdict = 'Good';
    if (packetLossPercentage > 4) {
        verdict = 'Poor';
    }
    else if (packetLossPercentage >= 1 && packetLossPercentage <= 4) {
        verdict = 'Average';
    }
    return verdict;
}
/** Gives verdict based on the jitter */
function getJitterVerdict({ jitterInMS }) {
    let verdict = 'Good';
    if (jitterInMS > 100) {
        verdict = 'Poor';
    }
    else if (jitterInMS >= 50 && jitterInMS <= 100) {
        verdict = 'Average';
    }
    return verdict;
}
/** Gives verdict based on the jitter */
function getBitrateVerdict({ bitrate, }) {
    let verdict = 'Good';
    const bitrateInKbps = Math.round(bitrate / 1024); // it is Kilo bits
    if (bitrateInKbps === 0) {
        verdict = 'Poor';
    }
    return verdict;
}
function getOverallBatteryVerdict({ stats }) {
    if (!stats || !stats.length) {
        return null;
    }
    let networkHealth = 'Good';
    const allStatsHealths = stats.map((statsObj) => statsObj.verdict);
    if (allStatsHealths.includes('Poor')) {
        networkHealth = 'Poor';
    }
    else if (allStatsHealths.includes('Average')) {
        networkHealth = 'Average';
    }
    return networkHealth;
}
function getBatteryLevelVerdict({ batteryLevelPercentage, }) {
    let batteryLevelVerdict = 'Good';
    if (batteryLevelPercentage < 20) {
        batteryLevelVerdict = 'Poor';
    }
    else if (batteryLevelPercentage < 50) {
        batteryLevelVerdict = 'Average';
    }
    return batteryLevelVerdict;
}
function getBatteryChargingVerdict({ charging, dischargingTimeInSeconds, batteryLevelPercentage, }) {
    const MINS_30 = 30 * 60;
    if (batteryLevelPercentage < 20) {
        return 'Poor';
    }
    if (charging) {
        return 'Good';
    }
    if (dischargingTimeInSeconds < MINS_30) {
        return 'Poor';
    }
    return 'Average';
}

const rtkDebuggerAudioCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;height:100%;width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}h3{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px);font-size:16px;font-weight:600}#header{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-5, 20px);display:flex;align-items:center;justify-content:space-evenly}.tab-body{margin:var(--rtk-space-4, 16px);display:flex;height:100%;flex-direction:column;justify-content:space-between;overflow-y:auto}.status-container{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;padding:16px}.status-section{margin-bottom:12px}.section-header{display:flex;justify-content:space-between;align-items:center;font-weight:bold;padding:8px 0}.section-header.only-child{justify-content:center}.section-body.missing-stats{display:flex;text-align:center;justify-content:center}.section-header .status{color:rgba(var(--rtk-colors-success));font-weight:bold}.section-header .arrow{font-size:14px}.network-table{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;margin-top:8px;overflow:hidden}.network-row{display:flex;justify-content:space-between;padding:12px;border-bottom:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60))}.network-row:last-child{border-bottom:none}.network-cell{display:flex;flex-direction:column}.network-cell.label strong{font-size:14px}.network-cell.label .description{font-size:12px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}.network-cell.value{text-align:right}.status.good{color:rgba(var(--rtk-colors-success))}.status.average{color:rgba(var(--rtk-colors-warning))}.status.poor{color:rgba(var(--rtk-colors-danger))}.value{font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}rtk-settings-audio{display:flex;flex-direction:column}";
const RtkDebuggerAudioStyle0 = rtkDebuggerAudioCss;

var __decorate$t = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDebuggerAudio = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Is Network section expanded */
        this.isNetworkOpen = true;
        /** Is Devices section expanded */
        this.isDevicesOpen = false;
        /** Stats as formatted array to display */
        this.audioProducerFormattedStats = [];
        /** Last raw audio score stats obj */
        this.audioProducerScoreStats = null;
        /** Summarised health of network stats */
        this.networkBasedMediaHealth = null;
        /** Summarised health of devices */
        this.devicesHealth = null;
        // private toggleSection(section: string) {
        //   if (section === 'network') this.isNetworkOpen = !this.isNetworkOpen;
        //   else if (section === 'devices') this.isDevicesOpen = !this.isDevicesOpen;
        // }
        this.mediaScoreUpdateListener = ({ kind, isScreenshare, scoreStats, }) => {
            if (kind === 'audio' && !isScreenshare) {
                this.audioProducerScoreStats = scoreStats;
            }
        };
        this.deviceListUpdateListener = async () => {
            const audioDevices = await this.meeting.self.getAudioDevices();
            this.devicesHealth = (audioDevices === null || audioDevices === void 0 ? void 0 : audioDevices.length) > 0 ? 'Good' : 'Poor';
        };
        this.audioUpdateListener = () => {
            if (!this.meeting.self.audioEnabled) {
                this.audioProducerScoreStats = null;
            }
        };
    }
    async audioProducerScoreStatsChanged(newAudioProducerScoreStats) {
        if (!newAudioProducerScoreStats) {
            this.audioProducerFormattedStats = [];
            return;
        }
        const statsObj = newAudioProducerScoreStats;
        const newStatsList = [];
        newStatsList.push({
            name: this.t('debugger.stats.bitrate.label'),
            value: `${Math.round(statsObj.bitrate / 1024)} kbps`,
            description: this.t('debugger.stats.bitrate.description'),
            verdict: getBitrateVerdict({
                bitrate: statsObj.bitrate,
                kind: 'audio',
                isScreenshare: false,
            }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.packet_loss.label'),
            value: `${statsObj.packetsLostPercentage}%`,
            description: this.t('debugger.stats.packet_loss.description'),
            verdict: getPacketLossVerdict({ packetLossPercentage: statsObj.packetsLostPercentage }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.jitter.label'),
            value: `${Math.round(statsObj.jitter * 1000)} ms`,
            description: this.t('debugger.stats.jitter.description'),
            verdict: getJitterVerdict({ jitterInMS: statsObj.jitter * 1000 }),
        });
        this.audioProducerFormattedStats = newStatsList;
        this.networkBasedMediaHealth = getNetworkBasedMediaHealth({
            kind: 'audio',
            isScreenshare: false,
            stats: newStatsList,
        });
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        if (!this.meeting) {
            return;
        }
        this.meeting.self.off('mediaScoreUpdate', this.mediaScoreUpdateListener);
        this.meeting.self.off('audioUpdate', this.audioUpdateListener);
        this.meeting.self.off('deviceListUpdate', this.deviceListUpdateListener);
    }
    async meetingChanged(meeting) {
        if (!meeting)
            return;
        meeting.self.on('mediaScoreUpdate', this.mediaScoreUpdateListener);
        meeting.self.on('audioUpdate', this.audioUpdateListener);
        meeting.self.on('deviceListUpdate', this.deviceListUpdateListener);
        await this.deviceListUpdateListener();
    }
    render() {
        var _a, _b;
        if (!this.meeting) {
            return;
        }
        // const defaults = {
        //   meeting: this.meeting,
        //   states: this.states || storeState,
        //   iconPack: this.iconPack,
        //   t: this.t,
        // };
        return (index$1.h(index$1.Host, null, index$1.h("div", { id: "header" }), index$1.h("div", { class: "tab-body" }, index$1.h("div", { class: "status-container" }, index$1.h("div", { class: "status-section" }, index$1.h("div", { class: `section-header ${!this.networkBasedMediaHealth ? 'only-child' : ''}` }, index$1.h("span", null, this.t('debugger.audio.sections.network_media')), this.networkBasedMediaHealth && (index$1.h("span", { class: `status ${(_a = this.networkBasedMediaHealth) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = this.networkBasedMediaHealth) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)))), this.isNetworkOpen && !this.audioProducerFormattedStats.length && (index$1.h("div", { class: "section-body missing-stats" }, this.meeting.self.audioEnabled ? (index$1.h("span", null, this.t('debugger.audio.messages.generating_report'))) : (index$1.h("span", null, this.t('debugger.audio.messages.enable_media'))))), this.isNetworkOpen && !!this.audioProducerFormattedStats.length && (index$1.h("div", { class: "section-body network-table" }, this.audioProducerFormattedStats.map((formattedStatsObj) => {
            var _a, _b;
            return (index$1.h("div", { class: "network-row" }, index$1.h("div", { class: "network-cell label" }, index$1.h("strong", null, formattedStatsObj.name), index$1.h("span", { class: "description" }, formattedStatsObj.description)), index$1.h("div", { class: "network-cell value" }, index$1.h("span", { class: `status ${(_a = formattedStatsObj.verdict) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = formattedStatsObj.verdict) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)), index$1.h("span", { class: "value" }, formattedStatsObj.value))));
        }))))))));
    }
    static get watchers() { return {
        "audioProducerScoreStats": ["audioProducerScoreStatsChanged"],
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$t([
    index.SyncWithStore()
], RtkDebuggerAudio.prototype, "meeting", void 0);
__decorate$t([
    index.SyncWithStore()
], RtkDebuggerAudio.prototype, "states", void 0);
__decorate$t([
    index.SyncWithStore()
], RtkDebuggerAudio.prototype, "iconPack", void 0);
__decorate$t([
    index.SyncWithStore()
], RtkDebuggerAudio.prototype, "t", void 0);
RtkDebuggerAudio.style = RtkDebuggerAudioStyle0;

const rtkDebuggerScreenshareCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;height:100%;width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}h3{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px);font-size:16px;font-weight:600}#header{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-5, 20px);display:flex;align-items:center;justify-content:space-evenly}.tab-body{margin:var(--rtk-space-4, 16px);display:flex;height:100%;flex-direction:column;justify-content:space-between;overflow-y:auto}.status-container{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;padding:16px}.status-section{margin-bottom:12px}.section-header{display:flex;justify-content:space-between;align-items:center;font-weight:bold;padding:8px 0}.section-header.only-child{justify-content:center}.section-body.missing-stats{display:flex;text-align:center;justify-content:center}.section-header .status{color:rgba(var(--rtk-colors-success));font-weight:bold}.section-header .arrow{font-size:14px}.network-table{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;margin-top:8px;overflow:hidden}.network-row{display:flex;justify-content:space-between;padding:12px;border-bottom:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60))}.network-row:last-child{border-bottom:none}.network-cell{display:flex;flex-direction:column}.network-cell.label strong{font-size:14px}.network-cell.label .description{font-size:12px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}.network-cell.value{text-align:right}.status.good{color:rgba(var(--rtk-colors-success))}.status.average{color:rgba(var(--rtk-colors-warning))}.status.poor{color:rgba(var(--rtk-colors-danger))}.value{font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}";
const RtkDebuggerScreenshareStyle0 = rtkDebuggerScreenshareCss;

var __decorate$s = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDebuggerScreenShare = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Is Network section expanded */
        this.isNetworkOpen = true;
        /** Is Devices section expanded */
        this.isDevicesOpen = false;
        /** Stats as formatted array to display */
        this.videoProducerFormattedStats = [];
        /** Last raw video score stats obj */
        this.videoProducerScoreStats = null;
        /** Stats as formatted array to display */
        this.audioProducerFormattedStats = [];
        /** Last raw video score stats obj */
        this.audioProducerScoreStats = null;
        /** Summarised health of network stats */
        this.networkBasedMediaHealth = null;
        // private toggleSection(section: string) {
        //   if (section === 'network') this.isNetworkOpen = !this.isNetworkOpen;
        //   else if (section === 'devices') this.isDevicesOpen = !this.isDevicesOpen;
        // }
        this.mediaScoreUpdateListener = ({ kind, isScreenshare, scoreStats, }) => {
            if (kind === 'video' && isScreenshare) {
                this.videoProducerScoreStats = scoreStats;
            }
            if (kind === 'audio' && isScreenshare) {
                this.audioProducerScoreStats = scoreStats;
            }
        };
        this.screenShareUpdateListener = () => {
            if (!this.meeting.self.screenShareEnabled) {
                this.videoProducerScoreStats = null;
                this.audioProducerScoreStats = null;
            }
        };
    }
    async videoProducerScoreStatsChanged(newVideoProducerScoreStats) {
        if (!newVideoProducerScoreStats) {
            this.videoProducerFormattedStats = [];
            return;
        }
        const statsObj = newVideoProducerScoreStats;
        const newStatsList = [];
        newStatsList.push({
            name: this.t('debugger.stats.cpu_limitations.label'),
            value: statsObj.cpuLimitations ? 'Yes' : 'No',
            description: this.t('debugger.stats.cpu_limitations.description'),
            verdict: statsObj.cpuLimitations ? 'Poor' : 'Good',
        });
        newStatsList.push({
            name: this.t('debugger.stats.bandwidth_limitations.label'),
            value: statsObj.bandwidthLimitations ? 'Yes' : 'No',
            description: this.t('debugger.stats.bandwidth_limitations.description'),
            verdict: statsObj.bandwidthLimitations ? 'Poor' : 'Good',
        });
        newStatsList.push({
            name: this.t('debugger.stats.bitrate.label'),
            value: `${Math.round(statsObj.bitrate / 1024)} kbps`,
            description: this.t('debugger.stats.bitrate.description'),
            verdict: getBitrateVerdict({
                bitrate: statsObj.bitrate,
                kind: 'video',
                isScreenshare: false,
            }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.packet_loss.label'),
            value: `${statsObj.packetsLostPercentage}%`,
            description: this.t('debugger.stats.packet_loss.description'),
            verdict: getPacketLossVerdict({ packetLossPercentage: statsObj.packetsLostPercentage }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.jitter.label'),
            value: `${Math.round(statsObj.jitter * 1000)} ms`,
            description: this.t('debugger.stats.jitter.description'),
            verdict: getJitterVerdict({ jitterInMS: statsObj.jitter * 1000 }),
        });
        this.videoProducerFormattedStats = newStatsList;
        this.networkBasedMediaHealth = getNetworkBasedMediaHealth({
            kind: 'video',
            isScreenshare: false,
            stats: newStatsList,
        });
    }
    async audioProducerScoreStatsChanged(newAudioProducerScoreStats) {
        if (!newAudioProducerScoreStats) {
            this.audioProducerFormattedStats = [];
            return;
        }
        const statsObj = newAudioProducerScoreStats;
        const newStatsList = [];
        newStatsList.push({
            name: this.t('debugger.stats.bitrate.label'),
            value: `${Math.round(statsObj.bitrate / 1024)} kbps`,
            description: this.t('debugger.stats.bitrate.description'),
            verdict: getBitrateVerdict({
                bitrate: statsObj.bitrate,
                kind: 'audio',
                isScreenshare: true,
            }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.packet_loss.label'),
            value: `${statsObj.packetsLostPercentage}%`,
            description: this.t('debugger.stats.packet_loss.description'),
            verdict: getPacketLossVerdict({ packetLossPercentage: statsObj.packetsLostPercentage }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.jitter.label'),
            value: `${Math.round(statsObj.jitter * 1000)} ms`,
            description: this.t('debugger.stats.jitter.description'),
            verdict: getJitterVerdict({ jitterInMS: statsObj.jitter * 1000 }),
        });
        this.audioProducerFormattedStats = newStatsList;
        /** Only screenshare video is deciding the media health currently */
        // this.networkBasedMediaHealth = getNetworkBasedMediaHealth({
        //   kind: 'audio',
        //   isScreenshare: true,
        //   stats: newStatsList,
        // });
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        if (!this.meeting) {
            return;
        }
        this.meeting.self.off('mediaScoreUpdate', this.mediaScoreUpdateListener);
        this.meeting.self.off('screenShareUpdate', this.screenShareUpdateListener);
    }
    async meetingChanged(meeting) {
        if (!meeting)
            return;
        meeting.self.on('mediaScoreUpdate', this.mediaScoreUpdateListener);
        meeting.self.on('screenShareUpdate', this.screenShareUpdateListener);
    }
    render() {
        var _a, _b;
        if (!this.meeting) {
            return;
        }
        return (index$1.h(index$1.Host, null, index$1.h("div", { id: "header" }), index$1.h("div", { class: "tab-body" }, index$1.h("div", { class: "status-container" }, index$1.h("div", { class: "status-section" }, index$1.h("div", { class: `section-header ${!this.networkBasedMediaHealth ? 'only-child' : ''}` }, index$1.h("span", null, this.t('debugger.screenshare.sections.network_media')), this.networkBasedMediaHealth && (index$1.h("span", { class: `status ${(_a = this.networkBasedMediaHealth) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = this.networkBasedMediaHealth) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)))), this.isNetworkOpen && !this.videoProducerFormattedStats.length && (index$1.h("div", { class: "section-body missing-stats" }, this.meeting.self.screenShareEnabled ? (index$1.h("span", null, this.t('debugger.screenshare.messages.generating_report'))) : (index$1.h("span", null, this.t('debugger.screenshare.messages.enable_media'))))), this.isNetworkOpen && !!this.videoProducerFormattedStats.length && (index$1.h("div", { class: "section-body network-table" }, this.videoProducerFormattedStats.map((formattedStatsObj) => {
            var _a, _b;
            return (index$1.h("div", { class: "network-row" }, index$1.h("div", { class: "network-cell label" }, index$1.h("strong", null, formattedStatsObj.name), index$1.h("span", { class: "description" }, formattedStatsObj.description)), index$1.h("div", { class: "network-cell value" }, index$1.h("span", { class: `status ${(_a = formattedStatsObj.verdict) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = formattedStatsObj.verdict) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)), index$1.h("span", { class: "value" }, formattedStatsObj.value))));
        }))))))));
    }
    static get watchers() { return {
        "videoProducerScoreStats": ["videoProducerScoreStatsChanged"],
        "audioProducerScoreStats": ["audioProducerScoreStatsChanged"],
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$s([
    index.SyncWithStore()
], RtkDebuggerScreenShare.prototype, "meeting", void 0);
__decorate$s([
    index.SyncWithStore()
], RtkDebuggerScreenShare.prototype, "states", void 0);
__decorate$s([
    index.SyncWithStore()
], RtkDebuggerScreenShare.prototype, "iconPack", void 0);
__decorate$s([
    index.SyncWithStore()
], RtkDebuggerScreenShare.prototype, "t", void 0);
RtkDebuggerScreenShare.style = RtkDebuggerScreenshareStyle0;

const rtkDebuggerSystemCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;height:100%;width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}h3{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px);font-size:16px;font-weight:600}#header{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-5, 20px);display:flex;align-items:center;justify-content:space-evenly}.tab-body{margin:var(--rtk-space-4, 16px);display:flex;height:100%;flex-direction:column;justify-content:space-between;overflow-y:auto}.status-container{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;padding:16px}.status-section{margin-bottom:12px}.section-header{display:flex;justify-content:space-between;align-items:center;font-weight:bold;padding:8px 0}.section-body.missing-stats{display:flex;text-align:center;justify-content:center}.section-header .status{color:rgba(var(--rtk-colors-success));font-weight:bold}.section-header .arrow{font-size:14px}.battery-table{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;margin-top:8px;overflow:hidden}.battery-row{display:flex;justify-content:space-between;padding:12px;border-bottom:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60))}.battery-row:last-child{border-bottom:none}.battery-cell{display:flex;flex-direction:column}.battery-cell.label strong{font-size:14px}.battery-cell.label .description{font-size:12px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}.battery-cell.value{text-align:right}.status.good{color:rgba(var(--rtk-colors-success))}.status.average{color:rgba(var(--rtk-colors-warning))}.status.poor{color:rgba(var(--rtk-colors-danger))}.value{font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}rtk-settings-video{display:flex;flex-direction:column}";
const RtkDebuggerSystemStyle0 = rtkDebuggerSystemCss;

var __decorate$r = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDebuggerSystem = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Is Network section expanded */
        this.isBatterySectionOpen = true;
        /** Summarised health of network stats */
        this.batterySectionHealth = null;
        /** Battery manager */
        this.battery = null;
        /** Stats as formatted array to display */
        this.batteryFormattedStats = [];
        this.batteryUpdateListener = () => {
            const batteryLevelPercentage = Math.round(this.battery.level * 100);
            const newBatteryStats = [];
            newBatteryStats.push({
                name: this.t('debugger.system.battery.level.label'),
                value: `${batteryLevelPercentage}%`,
                description: this.t('debugger.system.battery.level.description'),
                verdict: getBatteryLevelVerdict({
                    batteryLevelPercentage,
                }),
            });
            newBatteryStats.push({
                name: this.t('debugger.system.battery.charging.label'),
                value: `${this.battery.charging
                    ? this.t('debugger.system.battery.charging.is_charging')
                    : this.t('debugger.system.battery.charging.is_not_charging')}`,
                description: this.t('debugger.system.battery.charging.description'),
                verdict: getBatteryChargingVerdict({
                    batteryLevelPercentage,
                    chargingTimeInSeconds: this.battery.chargingTime,
                    dischargingTimeInSeconds: this.battery.dischargingTime,
                    charging: this.battery.charging,
                }),
            });
            this.batterySectionHealth = getOverallBatteryVerdict({
                stats: newBatteryStats,
            });
            this.batteryFormattedStats = newBatteryStats;
        };
    }
    toggleSection(section) {
        if (section === 'battery')
            this.isBatterySectionOpen = !this.isBatterySectionOpen;
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        if (!this.meeting) {
            return;
        }
        if (this.battery) {
            this.battery.removeEventListener('levelchange', this.batteryUpdateListener);
            this.battery.removeEventListener('chargingchange', this.batteryUpdateListener);
        }
    }
    async meetingChanged(meeting) {
        if (!meeting)
            return;
        if (typeof navigator.getBattery !== 'undefined') {
            this.battery = await navigator.getBattery();
            this.battery.addEventListener('levelchange', this.batteryUpdateListener);
            this.battery.addEventListener('chargingchange', this.batteryUpdateListener);
            this.batteryUpdateListener();
        }
    }
    render() {
        var _a, _b;
        if (!this.meeting) {
            return;
        }
        return (index$1.h(index$1.Host, null, index$1.h("div", { id: "header" }), index$1.h("div", { class: "tab-body" }, index$1.h("div", { class: "status-container" }, index$1.h("div", { class: "status-section" }, index$1.h("div", { class: "section-header", onClick: () => this.toggleSection('battery') }, index$1.h("span", null, this.t('debugger.system.sections.battery')), this.batterySectionHealth && (index$1.h("span", { class: `status ${(_a = this.batterySectionHealth) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = this.batterySectionHealth) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)))), this.isBatterySectionOpen && !!this.batteryFormattedStats.length && (index$1.h("div", { class: "section-body battery-table" }, this.batteryFormattedStats.map((formattedStatsObj) => {
            var _a, _b;
            return (index$1.h("div", { class: "battery-row" }, index$1.h("div", { class: "battery-cell label" }, index$1.h("strong", null, formattedStatsObj.name), index$1.h("span", { class: "description" }, formattedStatsObj.description)), index$1.h("div", { class: "battery-cell value" }, index$1.h("span", { class: `status ${(_a = formattedStatsObj.verdict) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = formattedStatsObj.verdict) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)), index$1.h("span", { class: "value" }, formattedStatsObj.value))));
        }))))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$r([
    index.SyncWithStore()
], RtkDebuggerSystem.prototype, "meeting", void 0);
__decorate$r([
    index.SyncWithStore()
], RtkDebuggerSystem.prototype, "states", void 0);
__decorate$r([
    index.SyncWithStore()
], RtkDebuggerSystem.prototype, "iconPack", void 0);
__decorate$r([
    index.SyncWithStore()
], RtkDebuggerSystem.prototype, "t", void 0);
RtkDebuggerSystem.style = RtkDebuggerSystemStyle0;

const rtkDebuggerVideoCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;overflow:hidden;height:100%;width:100%;color:rgb(var(--rtk-colors-text-1000, 255 255 255));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}.tab-body::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}h3{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px);font-size:16px;font-weight:600}#header{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-5, 20px);display:flex;align-items:center;justify-content:space-evenly}.tab-body{margin:var(--rtk-space-4, 16px);display:flex;height:100%;flex-direction:column;justify-content:space-between;overflow-y:auto}.status-container{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;padding:16px}.status-section{margin-bottom:12px}.section-header{display:flex;justify-content:space-between;align-items:center;font-weight:bold;padding:8px 0}.section-header.only-child{justify-content:center}.section-body.missing-stats{display:flex;text-align:center;justify-content:center}.section-header .status{color:rgba(var(--rtk-colors-success));font-weight:bold}.section-header .arrow{font-size:14px}.network-table{border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60));border-radius:8px;margin-top:8px;overflow:hidden}.network-row{display:flex;justify-content:space-between;padding:12px;border-bottom:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60))}.network-row:last-child{border-bottom:none}.network-cell{display:flex;flex-direction:column}.network-cell.label strong{font-size:14px}.network-cell.label .description{font-size:12px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}.network-cell.value{text-align:right}.status.good{color:rgba(var(--rtk-colors-success))}.status.average{color:rgba(var(--rtk-colors-warning))}.status.poor{color:rgba(var(--rtk-colors-danger))}.value{font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));margin-top:4px}rtk-settings-video{display:flex;flex-direction:column}";
const RtkDebuggerVideoStyle0 = rtkDebuggerVideoCss;

var __decorate$q = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDebuggerVideo = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Is Network section expanded */
        this.isNetworkOpen = true;
        /** Is Devices section expanded */
        this.isDevicesOpen = false;
        /** Stats as formatted array to display */
        this.videoProducerFormattedStats = [];
        /** Last raw video score stats obj */
        this.videoProducerScoreStats = null;
        /** Summarised health of network stats */
        this.networkBasedMediaHealth = null;
        /** Summarised health of devices */
        this.devicesHealth = null;
        // private toggleSection(section: string) {
        //   if (section === 'network') this.isNetworkOpen = !this.isNetworkOpen;
        //   else if (section === 'devices') this.isDevicesOpen = !this.isDevicesOpen;
        // }
        this.mediaScoreUpdateListener = ({ kind, isScreenshare, scoreStats, }) => {
            if (kind === 'video' && !isScreenshare) {
                this.videoProducerScoreStats = scoreStats;
            }
        };
        this.deviceListUpdateListener = async () => {
            const videoDevices = await this.meeting.self.getVideoDevices();
            this.devicesHealth = (videoDevices === null || videoDevices === void 0 ? void 0 : videoDevices.length) > 0 ? 'Good' : 'Poor';
        };
        this.videoUpdateListener = () => {
            if (!this.meeting.self.videoEnabled) {
                this.videoProducerScoreStats = null;
            }
        };
    }
    async videoProducerScoreStatsChanged(newVideoProducerScoreStats) {
        if (!newVideoProducerScoreStats) {
            this.videoProducerFormattedStats = [];
            return;
        }
        const statsObj = newVideoProducerScoreStats;
        const newStatsList = [];
        newStatsList.push({
            name: this.t('debugger.stats.cpu_limitations.label'),
            value: statsObj.cpuLimitations ? 'Yes' : 'No',
            description: this.t('debugger.stats.cpu_limitations.description'),
            verdict: statsObj.cpuLimitations ? 'Poor' : 'Good',
        });
        newStatsList.push({
            name: this.t('debugger.stats.bandwidth_limitations.label'),
            value: statsObj.bandwidthLimitations ? 'Yes' : 'No',
            description: this.t('debugger.stats.bandwidth_limitations.description'),
            verdict: statsObj.bandwidthLimitations ? 'Poor' : 'Good',
        });
        newStatsList.push({
            name: this.t('debugger.stats.bitrate.label'),
            value: `${Math.round(statsObj.bitrate / 1024)} kbps`,
            description: this.t('debugger.stats.bitrate.description'),
            verdict: getBitrateVerdict({
                bitrate: statsObj.bitrate,
                kind: 'video',
                isScreenshare: false,
            }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.packet_loss.label'),
            value: `${statsObj.packetsLostPercentage}%`,
            description: this.t('debugger.stats.packet_loss.description'),
            verdict: getPacketLossVerdict({ packetLossPercentage: statsObj.packetsLostPercentage }),
        });
        newStatsList.push({
            name: this.t('debugger.stats.jitter.label'),
            value: `${Math.round(statsObj.jitter * 1000)} ms`,
            description: this.t('debugger.stats.jitter.description'),
            verdict: getJitterVerdict({ jitterInMS: statsObj.jitter * 1000 }),
        });
        this.videoProducerFormattedStats = newStatsList;
        this.networkBasedMediaHealth = getNetworkBasedMediaHealth({
            kind: 'video',
            isScreenshare: false,
            stats: newStatsList,
        });
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        if (!this.meeting) {
            return;
        }
        this.meeting.self.off('mediaScoreUpdate', this.mediaScoreUpdateListener);
        this.meeting.self.off('videoUpdate', this.videoUpdateListener);
        this.meeting.self.off('deviceListUpdate', this.deviceListUpdateListener);
    }
    async meetingChanged(meeting) {
        if (!meeting)
            return;
        meeting.self.on('mediaScoreUpdate', this.mediaScoreUpdateListener);
        meeting.self.on('videoUpdate', this.videoUpdateListener);
        meeting.self.on('deviceListUpdate', this.deviceListUpdateListener);
        await this.deviceListUpdateListener();
    }
    render() {
        var _a, _b;
        if (!this.meeting) {
            return;
        }
        // const defaults = {
        //   meeting: this.meeting,
        //   states: this.states || storeState,
        //   iconPack: this.iconPack,
        //   t: this.t,
        // };
        return (index$1.h(index$1.Host, null, index$1.h("div", { id: "header" }), index$1.h("div", { class: "tab-body" }, index$1.h("div", { class: "status-container" }, index$1.h("div", { class: "status-section" }, index$1.h("div", { class: `section-header ${!this.networkBasedMediaHealth ? 'only-child' : ''}` }, index$1.h("span", null, this.t('debugger.video.sections.network_media')), this.networkBasedMediaHealth && (index$1.h("span", { class: `status ${(_a = this.networkBasedMediaHealth) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = this.networkBasedMediaHealth) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)))), this.isNetworkOpen && !this.videoProducerFormattedStats.length && (index$1.h("div", { class: "section-body missing-stats" }, this.meeting.self.videoEnabled ? (index$1.h("span", null, this.t('debugger.video.messages.generating_report'))) : (index$1.h("span", null, this.t('debugger.video.messages.enable_media'))))), this.isNetworkOpen && !!this.videoProducerFormattedStats.length && (index$1.h("div", { class: "section-body network-table" }, this.videoProducerFormattedStats.map((formattedStatsObj) => {
            var _a, _b;
            return (index$1.h("div", { class: "network-row" }, index$1.h("div", { class: "network-cell label" }, index$1.h("strong", null, formattedStatsObj.name), index$1.h("span", { class: "description" }, formattedStatsObj.description)), index$1.h("div", { class: "network-cell value" }, index$1.h("span", { class: `status ${(_a = formattedStatsObj.verdict) === null || _a === void 0 ? void 0 : _a.toLowerCase()}` }, this.t(`debugger.quality.${(_b = formattedStatsObj.verdict) === null || _b === void 0 ? void 0 : _b.toLowerCase()}`)), index$1.h("span", { class: "value" }, formattedStatsObj.value))));
        }))))))));
    }
    static get watchers() { return {
        "videoProducerScoreStats": ["videoProducerScoreStatsChanged"],
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$q([
    index.SyncWithStore()
], RtkDebuggerVideo.prototype, "meeting", void 0);
__decorate$q([
    index.SyncWithStore()
], RtkDebuggerVideo.prototype, "states", void 0);
__decorate$q([
    index.SyncWithStore()
], RtkDebuggerVideo.prototype, "iconPack", void 0);
__decorate$q([
    index.SyncWithStore()
], RtkDebuggerVideo.prototype, "t", void 0);
RtkDebuggerVideo.style = RtkDebuggerVideoStyle0;

const rtkDialogCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{word-wrap:break-word;overflow-wrap:break-word}#dialog{position:relative;max-height:100%;max-width:100%;padding:var(--rtk-space-0, 0px);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}#dialog::backdrop{background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / 0.5);-webkit-backdrop-filter:blur(12px) saturate(180%);backdrop-filter:blur(12px) saturate(180%)}#dismiss-btn{position:absolute;top:var(--rtk-space-3, 12px);right:var(--rtk-space-3, 12px);z-index:50}::slotted(*){max-width:100%;height:auto;min-height:-moz-fit-content;min-height:fit-content}";
const RtkDialogStyle0 = rtkDialogCss;

var __decorate$p = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDialog = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onClose = index$1.createEvent(this, "rtkDialogClose", 7);
        /** Whether to show the close button */
        this.hideCloseButton = false;
        /** Whether Escape key can close the modal */
        this.disableEscapeKey = false;
        /** UI Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Whether a dialog is open or not */
        this.open = true;
        this.close = () => {
            this.open = false;
            this.onClose.emit();
        };
        this.keydownListener = (e) => {
            if (!this.disableEscapeKey && e.key === 'Escape' && this.open) {
                this.close();
            }
        };
    }
    connectedCallback() {
        document.addEventListener('keydown', this.keydownListener);
    }
    disconnectedCallback() {
        document.removeEventListener('keydown', this.keydownListener);
    }
    componentDidRender() {
        if (this.open && !this.dialogEl.open) {
            // we need to call showModal() to get the ::backdrop
            this.dialogEl.showModal();
        }
    }
    render() {
        if (!this.open) {
            return null;
        }
        return (index$1.h(index$1.Host, null, index$1.h("dialog", { ref: (el) => (this.dialogEl = el), id: "dialog", part: "container", onClose: this.close, onClick: (e) => {
                // clicked outside the children of dialog
                if (!this.disableEscapeKey && e.target === this.dialogEl) {
                    this.close();
                }
            }, onKeyDown: (e) => {
                if (this.disableEscapeKey && e.key === 'Escape') {
                    e.preventDefault();
                }
            } }, index$1.h("slot", null), !this.hideCloseButton && (index$1.h("rtk-button", { part: "close-button", id: "dismiss-btn", kind: "icon", variant: "ghost", onClick: () => this.close(), type: "button", "aria-label": this.t('dialog.close'), role: "button" }, index$1.h("rtk-icon", { icon: this.iconPack.dismiss }))))));
    }
};
__decorate$p([
    index.SyncWithStore()
], RtkDialog.prototype, "meeting", void 0);
__decorate$p([
    index.SyncWithStore()
], RtkDialog.prototype, "config", void 0);
__decorate$p([
    index.SyncWithStore()
], RtkDialog.prototype, "states", void 0);
__decorate$p([
    index.SyncWithStore()
], RtkDialog.prototype, "iconPack", void 0);
__decorate$p([
    index.SyncWithStore()
], RtkDialog.prototype, "t", void 0);
RtkDialog.style = RtkDialogStyle0;

const rtkDialogManagerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkDialogManagerStyle0 = rtkDialogManagerCss;

var __decorate$o = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDialogManager = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** UI Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.updateStoreState = (state, value) => {
            this.stateUpdate.emit({ [state]: value });
        };
        this.cancelJoinStage = async () => {
            var _a, _b, _c;
            if (((_a = this.meeting.stage) === null || _a === void 0 ? void 0 : _a.status) === 'ACCEPTED_TO_JOIN_STAGE') {
                await ((_c = (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.stage) === null || _c === void 0 ? void 0 : _c.leave());
            }
            this.updateStoreState('activeJoinStage', false);
        };
        this.joinStage = async () => {
            await this.meeting.stage.join();
            /** NOTE(ishita1805): We close the modal once the status has changed */
        };
        this.stageStatusUpdateListener = (status) => {
            var _a;
            if (!((_a = this.states) === null || _a === void 0 ? void 0 : _a.activeJoinStage))
                return;
            if (status === 'ON_STAGE')
                this.updateStoreState('activeJoinStage', false);
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.meeting.stage) === null || _a === void 0 ? void 0 : _a.removeListener('stageStatusUpdate', this.stageStatusUpdateListener);
    }
    meetingChanged(meeting) {
        if (!meeting)
            return;
        const { stage } = meeting;
        stage === null || stage === void 0 ? void 0 : stage.addListener('stageStatusUpdate', this.stageStatusUpdateListener);
    }
    render() {
        var _a, _b, _c, _d;
        if (!this.meeting) {
            return;
        }
        const defaults = {
            meeting: this.meeting,
            states: this.states,
            config: this.config,
            size: this.size,
            iconPack: this.iconPack,
            t: this.t,
        };
        const states = this.states;
        if ((states === null || states === void 0 ? void 0 : states.image) != null) {
            const image = states.image;
            const onImageClose = () => {
                this.stateUpdate.emit({ image: null });
            };
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: onImageClose, hideCloseButton: true, iconPack: this.iconPack, t: this.t }, index$1.h(index$2.Render, { element: "rtk-image-viewer", defaults: defaults, props: { image, onClose: onImageClose } }))));
        }
        else if ((states === null || states === void 0 ? void 0 : states.activeSettings) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => this.updateStoreState('activeSettings', false), iconPack: this.iconPack, t: this.t }, index$1.h(index$2.Render, { element: "rtk-settings", defaults: defaults }))));
        }
        else if ((states === null || states === void 0 ? void 0 : states.activeDebugger) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => this.updateStoreState('activeDebugger', false), iconPack: this.iconPack, t: this.t }, index$1.h("rtk-debugger", Object.assign({}, defaults)))));
        }
        else if ((states === null || states === void 0 ? void 0 : states.activeLeaveConfirmation) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => this.updateStoreState('activeLeaveConfirmation', false), iconPack: this.iconPack, t: this.t }, index$1.h("rtk-leave-meeting", Object.assign({}, defaults)))));
        }
        else if (((_a = states === null || states === void 0 ? void 0 : states.activePermissionsMessage) === null || _a === void 0 ? void 0 : _a.enabled) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, hideCloseButton: true, iconPack: this.iconPack, t: this.t }, index$1.h("rtk-permissions-message", Object.assign({}, defaults)))));
        }
        else if (((_b = states === null || states === void 0 ? void 0 : states.activeBreakoutRoomsManager) === null || _b === void 0 ? void 0 : _b.active) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => this.updateStoreState('activeBreakoutRoomsManager', {
                    active: false,
                    data: undefined,
                }), iconPack: this.iconPack, t: this.t }, index$1.h("rtk-breakout-rooms-manager", Object.assign({}, defaults)))));
        }
        else if (((_c = states === null || states === void 0 ? void 0 : states.activeConfirmationModal) === null || _c === void 0 ? void 0 : _c.active) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => this.updateStoreState('activeConfirmationModal', false), iconPack: this.iconPack, t: this.t }, index$1.h("rtk-confirmation-modal", Object.assign({}, defaults)))));
        }
        else if (((_d = states === null || states === void 0 ? void 0 : states.activeOverlayModal) === null || _d === void 0 ? void 0 : _d.active) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-overlay-modal", { meeting: this.meeting, states: this.states, iconPack: this.iconPack, t: this.t })));
        }
        else if (states === null || states === void 0 ? void 0 : states.activeBroadcastMessageModal) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => this.updateStoreState('activeBroadcastMessageModal', false), iconPack: this.iconPack, t: this.t }, index$1.h("rtk-broadcast-message-modal", Object.assign({}, defaults)))));
        }
        else if ((states === null || states === void 0 ? void 0 : states.activeJoinStage) === true) {
            const dataState = {
                title: this.t('stage.join_title'),
                label: {
                    accept: this.t('stage.join_confirm'),
                    reject: this.t('stage.join_cancel'),
                },
                description: this.t('stage.join_summary'),
            };
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: this.cancelJoinStage, iconPack: this.iconPack, t: this.t }, index$1.h("rtk-join-stage", Object.assign({ dataConfig: dataState, onRtkJoinStage: this.joinStage, onRtkLeaveStage: this.cancelJoinStage }, defaults)))));
        }
        else if ((states === null || states === void 0 ? void 0 : states.activeMuteAllConfirmation) === true) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => {
                    this.updateStoreState('activeMuteAllConfirmation', false);
                }, iconPack: this.iconPack, t: this.t }, index$1.h("rtk-mute-all-confirmation", Object.assign({}, defaults)))));
        }
        else if (states === null || states === void 0 ? void 0 : states.activeChannelCreator) {
            return (index$1.h(index$1.Host, null, index$1.h("rtk-dialog", { open: true, onRtkDialogClose: () => {
                    this.updateStoreState('activeChannelCreator', false);
                }, iconPack: this.iconPack, t: this.t }, index$1.h("rtk-channel-creator", Object.assign({}, defaults)))));
        }
        return null;
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$o([
    index.SyncWithStore()
], RtkDialogManager.prototype, "meeting", void 0);
__decorate$o([
    index.SyncWithStore()
], RtkDialogManager.prototype, "config", void 0);
__decorate$o([
    index.SyncWithStore()
], RtkDialogManager.prototype, "states", void 0);
__decorate$o([
    index.SyncWithStore()
], RtkDialogManager.prototype, "iconPack", void 0);
__decorate$o([
    index.SyncWithStore()
], RtkDialogManager.prototype, "t", void 0);
RtkDialogManager.style = RtkDialogManagerStyle0;

const rtkDraftAttachmentViewCss = ":host{display:flex;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));border-top-left-radius:var(--rtk-border-radius-md, 8px);border-top-right-radius:var(--rtk-border-radius-md, 8px)}.preview-overlay{position:absolute;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);background-color:inherit}.preview{position:absolute;top:var(--rtk-space-4, 16px);left:var(--rtk-space-4, 16px);max-width:-moz-fit-content;max-width:fit-content;max-height:var(--rtk-space-20, 80px)}.preview:hover rtk-tooltip{display:block}.preview rtk-tooltip{position:absolute;top:calc(var(--rtk-space-1, 4px) * -1);left:calc(var(--rtk-space-1, 4px) * -1);display:none;margin-left:calc(var(--rtk-space-1, 4px) * -1);margin-top:calc(var(--rtk-space-1, 4px) * -1)}.preview rtk-button{display:flex;height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);align-items:center;justify-content:center;border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));border:1px solid rgb(var(--rtk-colors-text-1000, 255 255 255))}.preview rtk-icon{height:var(--rtk-space-3, 12px);width:var(--rtk-space-3, 12px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.preview-image{height:var(--rtk-space-16, 64px);width:var(--rtk-space-16, 64px);-o-object-fit:cover;object-fit:cover;max-height:100%;max-width:100%;overflow:clip;border-radius:var(--rtk-border-radius-md, 8px)}.preview-file{padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:var(--rtk-border-radius-md, 8px);max-width:200px}";
const RtkDraftAttachmentViewStyle0 = rtkDraftAttachmentViewCss;

var __decorate$n = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkDraftAttachmentView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onDeleteAttachment = index$1.createEvent(this, "deleteAttachment", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Attachment to display */
        this.attachment = null;
        this.filePreview = null;
        this.fileReader = new FileReader();
        this.generatePreview = () => {
            if (this.attachment.type === 'image') {
                this.fileReader.readAsDataURL(this.attachment.file);
            }
            else if (this.attachment.type === 'file') {
                this.filePreview = this.attachment.file.name;
            }
        };
        this.onDeleteClickHandler = () => {
            this.filePreview = null;
            this.onDeleteAttachment.emit();
        };
    }
    onAttachmentChange() {
        this.generatePreview();
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
    componentWillLoad() {
        this.onAttachmentChange();
    }
    render() {
        return (index$1.h(index$1.Host, { key: '22c8ff3317b6247dc6a0fa2088f28dc293de9738' }, index$1.h("div", { key: '317c0e6a06849af0af42d81353dc0002b82185a5', class: "preview-overlay" }, index$1.h("div", { key: '94d0d35a3696725b59341303760212cf6e01c8a7', class: "preview" }, index$1.h("rtk-tooltip", { key: '3171acf60f22a80cbcbf9d3d6f8cf5ac61b67b67', label: this.t('chat.cancel_upload') }, index$1.h("rtk-button", { key: '37d1055de9d59318c0f7f612dee3304838142968', variant: "secondary", kind: "icon", onClick: this.onDeleteClickHandler }, index$1.h("rtk-icon", { key: '9988b389300e0c6bd404d02440d7b3d323f384dd', icon: this.iconPack.dismiss }))), this.attachment.type === 'image' ? (index$1.h("img", { class: "preview-image", src: this.filePreview })) : (index$1.h("div", { class: "preview-file" }, index$1.h("span", null, this.filePreview)))))));
    }
    static get watchers() { return {
        "attachment": ["onAttachmentChange"]
    }; }
};
__decorate$n([
    index.SyncWithStore()
], RtkDraftAttachmentView.prototype, "iconPack", void 0);
__decorate$n([
    index.SyncWithStore()
], RtkDraftAttachmentView.prototype, "t", void 0);
RtkDraftAttachmentView.style = RtkDraftAttachmentViewStyle0;

const EMOJI_ASSET_URL = 'https://cdn.dyte.in/assets/emojis-data.json';
let cachedEmojis;
/**
 * fetches the latest emoji list from CDN
 * @returns list of emojis
 */
const fetchEmojis = async () => {
    if (!cachedEmojis) {
        const emojis = await fetch(EMOJI_ASSET_URL);
        cachedEmojis = emojis.json();
    }
    return cachedEmojis;
};

const rtkEmojiPickerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{width:100%}.emoji-parent{box-sizing:border-box;display:inline-flex;height:var(--rtk-space-64, 256px);width:100%;max-width:640px;flex-direction:column;padding:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-0, 0px);-webkit-user-select:none;-moz-user-select:none;user-select:none;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.close-parent{display:flex;flex:1 1 0%;justify-content:flex-end;padding:var(--rtk-space-0, 0px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255))}#emoji-grid{margin-top:var(--rtk-space-2, 8px);box-sizing:border-box;display:flex;flex-direction:row;flex-wrap:wrap;align-content:flex-start;overflow-x:hidden;overflow-y:scroll;height:100%;grid-auto-rows:minmax(min-content, max-content)}#loader{display:flex;height:100%;width:100%;align-items:center;justify-content:center}input{display:block;height:var(--rtk-space-8, 32px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);font-size:14px;border-width:var(--rtk-border-width-none, 0);border-style:solid;border-style:none;border-color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}input::-moz-placeholder{color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}input::placeholder{color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}input{border-radius:var(--rtk-border-radius-sm, 4px);outline:2px solid transparent;outline-offset:2px;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;border:var(--rtk-border-width-sm, 1px) solid rgb(var(--rtk-colors-background-600, 60 60 60))}input:focus{--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-border-opacity));--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-ring-opacity));--tw-ring-opacity:0.3}.emoji{height:var(--rtk-space-10, 40px);width:var(--rtk-space-10, 40px);font-size:20px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}";
const RtkEmojiPickerStyle0 = rtkEmojiPickerCss;

var __decorate$m = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkEmojiPicker = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.pickerClose = index$1.createEvent(this, "pickerClose", 7);
        this.emojiClicked = index$1.createEvent(this, "rtkEmojiClicked", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Controls whether or not to focus on mount */
        this.focusWhenOpened = true;
        this.filterVal = '';
        this.filteredEmojis = [];
    }
    componentWillLoad() {
        // Don't use async here as it will block the render
        fetchEmojis().then((e) => {
            this.emojiList = e;
            this.handleInputChange(this.inputElement);
        });
    }
    componentDidLoad() {
        if (this.focusWhenOpened) {
            this.inputElement.focus();
        }
    }
    handleInputChange(target) {
        this.filterVal = target.value;
        const regex = new RegExp(`([^,]*?${this.filterVal}[^,]*):(\\d+)`, 'g');
        this.filteredEmojis = Array.from(this.emojiList['search'].matchAll(regex)).map((m) => {
            return { name: m[1], emoji: this.emojiList['emojis'][m[2]] };
        });
    }
    handleEmojiClick(emoji) {
        this.emojiClicked.emit(emoji);
    }
    mapEmojiList() {
        var _a;
        if (((_a = this.emojiList) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            return (index$1.h("div", { id: "loader" }, index$1.h("rtk-spinner", { iconPack: this.iconPack })));
        }
        return (index$1.h("div", { id: "emoji-grid", class: "scrollbar max-w-40" }, this.filteredEmojis.map((e) => (index$1.h("rtk-button", { key: `emoji-button-${e.name}`, class: "emoji", variant: "ghost", kind: "icon", title: e.name, onClick: () => this.handleEmojiClick(e.emoji) }, e.emoji)))));
    }
    render() {
        return (index$1.h(index$1.Host, { key: '48f4159ff5232b9d03fdcabf2d39e4375ca4fa14' }, index$1.h("div", { key: '20f86592a9dc47231c0c6cf33484af981533e21d', class: 'close-parent' }, index$1.h("rtk-button", { key: 'cff61f9c8fa0c1e0a8b6dc9433abedf914f9ded0', variant: "ghost", kind: "icon", class: "close", onClick: () => { var _a; return (_a = this.pickerClose) === null || _a === void 0 ? void 0 : _a.emit(); }, "aria-label": this.t('close') }, index$1.h("rtk-icon", { key: '56a12d4cc55b80ea026c92906466ebb10bf6cd6e', icon: this.iconPack.dismiss }))), index$1.h("div", { key: 'b48a1933b33f9886f39955ecbd046ffff370719b', class: 'emoji-parent' }, index$1.h("input", { key: '40d0f74a160358c3214b810de0f2ee6f286f1af7', value: this.filterVal, onInput: (event) => this.handleInputChange(event.target), placeholder: this.t('search'), ref: (el) => (this.inputElement = el) }), this.mapEmojiList())));
    }
};
__decorate$m([
    index.SyncWithStore()
], RtkEmojiPicker.prototype, "iconPack", void 0);
__decorate$m([
    index.SyncWithStore()
], RtkEmojiPicker.prototype, "t", void 0);
RtkEmojiPicker.style = RtkEmojiPickerStyle0;

const rtkEmojiPickerButtonCss = ":host{}";
const RtkEmojiPickerButtonStyle0 = rtkEmojiPickerButtonCss;

var __decorate$l = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkEmojiPickerButton = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    render() {
        return (index$1.h("rtk-tooltip", { key: '9826128cb78d2cb79a21b4dcb877ecc1ab020090', label: this.t('chat.send_emoji') }, index$1.h("rtk-button", { key: '07fd6bcc6ffdb58278c843748f771a2597f8edcd', variant: "ghost", kind: "icon", class: { active: this.isActive }, title: this.t('chat.send_emoji') }, index$1.h("rtk-icon", { key: '30f352d18771bd542d9ca4ff1a4615ef5958ec7d', icon: this.iconPack.emoji_multiple }))));
    }
};
__decorate$l([
    index.SyncWithStore()
], RtkEmojiPickerButton.prototype, "iconPack", void 0);
__decorate$l([
    index.SyncWithStore()
], RtkEmojiPickerButton.prototype, "t", void 0);
RtkEmojiPickerButton.style = RtkEmojiPickerButtonStyle0;

var __decorate$k = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkFileMessage = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Date object of now, to calculate distance between dates */
        this.now = new Date();
        /** Whether the message is continued by same user */
        this.isContinued = false;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** show message in bubble */
        this.showBubble = false;
    }
    render() {
        const link = string.sanitizeLink(this.message.link);
        return (index$1.h(index$1.Host, { key: '771fc8ccb2700a3fba83f04676a0c4396c1a8a41' }, !this.isContinued && (index$1.h(ChatHead.ChatHead, { key: 'ef2d83897dcae870bb7a2b0eeef397585b873b77', name: this.message.displayName, time: this.message.time, now: this.now })), index$1.h("div", { key: '841039fcad32f254653bd490a98f268479345b44', class: {
                body: true,
                bubble: this.showBubble,
            }, part: "body" }, index$1.h("div", { key: '65e3c8aafa4e9fa55a24264685bb0cf20841048a', class: "file" }, index$1.h("div", { key: '1b1e97b1518c5471964ea91889f4500fc0e01e03', class: "file-data" }, index$1.h("div", { key: 'ff9d3071b528162f6e796ccb49e2472df2e8d364', class: "name" }, this.message.name), index$1.h("div", { key: '1d3ccb1f5bc2a94983de216e77a8ebc0ae07d669', class: "file-data-split" }, index$1.h("div", { key: 'ebab32b642e097b3c1c1903269a8d76fbd586f5c', class: "ext" }, file.getExtension(this.message.name)), index$1.h("span", { key: '81ee3600ba18a7689706504befebcf02697a56e7', class: "divider" }), index$1.h("div", { key: 'e969a8d6221d8af560a26510c38a92406a18ef2a', class: "size" }, file.getFileSize(this.message.size)))), index$1.h("rtk-button", { key: '482c27659f71cfebf9f88fdf538e32baa6b87073', variant: "secondary", kind: "icon", onClick: () => file.downloadFile(link, { name: this.message.name, fallbackName: 'file' }), part: "button" }, index$1.h("rtk-icon", { key: '4efaeb927b4ea2010eed09227eb7f511b9253017', icon: this.iconPack.download }))))));
    }
};
__decorate$k([
    index.SyncWithStore()
], RtkFileMessage.prototype, "iconPack", void 0);
__decorate$k([
    index.SyncWithStore()
], RtkFileMessage.prototype, "t", void 0);

const rtkFileMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.file{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px);min-width:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.file .file-data{margin-left:var(--rtk-space-1, 4px);flex:1 1 0%}.file .file-data .name{word-break:break-all;color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.file .file-data .file-data-split{margin-top:var(--rtk-space-0\\.5, 2px);display:flex;align-items:center;font-size:12px}.file .file-data .file-data-split .ext{margin-right:var(--rtk-space-2, 8px);text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.file .file-data .file-data-split .divider{height:var(--rtk-space-4, 16px);width:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.file .file-data .file-data-split .size{margin-left:var(--rtk-space-2, 8px)}";
const RtkFileMessageViewStyle0 = rtkFileMessageViewCss;

var __decorate$j = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkFileMessageView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
    }
    render() {
        return (index$1.h("div", { key: 'd2cbeddc138f81c05da1656ee7f59c170e83bd1e', class: "file" }, index$1.h("rtk-button", { key: 'b0ee90c3493c24e938b6ea88a317c642e4afc003', variant: "secondary", kind: "icon", onClick: () => file.downloadFile(string.sanitizeLink(this.url), { name: this.name, fallbackName: 'file' }), part: "button" }, index$1.h("rtk-icon", { key: 'c1b25c655b5c87bf95948abfa461f8b58ff79195', icon: this.iconPack.download })), index$1.h("div", { key: 'c961a8ce93d4ff4405590787a88b5a9bbdbf56ab', class: "file-data" }, index$1.h("div", { key: 'bd178354d166c7816d6fabb72f7bba70fd711415', class: "name" }, this.name), index$1.h("div", { key: '59a791ae9f94a13b4005a0d8f79d09687fe3fc4c', class: "file-data-split" }, index$1.h("div", { key: 'b31421fdf786d92eed0decec9d3b247530413aa9', class: "ext" }, file.getExtension(this.name)), index$1.h("span", { key: '7a0a2a188b3e0b6bee0cf54d3afe29c2454788bb', class: "divider" }), index$1.h("div", { key: 'b217b87fa0737732aae10662b82d337d7258e6d7', class: "size" }, file.getFileSize(this.size))))));
    }
};
__decorate$j([
    index.SyncWithStore()
], RtkFileMessageView.prototype, "iconPack", void 0);
RtkFileMessageView.style = RtkFileMessageViewStyle0;

const rtkFilePickerButtonCss = ":host{}";
const RtkFilePickerButtonStyle0 = rtkFilePickerButtonCss;

var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkFilePickerButton = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onFileChange = index$1.createEvent(this, "fileChange", 7);
        /** Icon */
        this.icon = 'attach';
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.uploadFile = () => {
            const input = this.fileInputField;
            input.type = 'file';
            if (this.filter) {
                input.accept = this.filter;
            }
            input.onchange = (e) => {
                const { validity, files: [file], } = e.target;
                if (validity.valid) {
                    this.onFileChange.emit(file);
                }
            };
            input.click();
        };
    }
    connectedCallback() {
        this.fileInputField = document.createElement('input');
    }
    disconnectedCallback() {
        // For GC
        this.fileInputField = undefined;
    }
    render() {
        const label = this.label || this.t('chat.send_file');
        const icon = this.iconPack[this.icon];
        return (index$1.h("rtk-tooltip", { key: '90e405f39792f7ea0430c55e9b5ba0da72ce2a4a', label: label }, index$1.h("rtk-button", { key: 'f0957e7a9668afd9e25e866ea2acbb6891123bbe', variant: "ghost", kind: "icon", onClick: () => this.uploadFile(), title: label }, index$1.h("rtk-icon", { key: '1955f524343683974831b28629291428637aa8fc', icon: icon }))));
    }
};
__decorate$i([
    index.SyncWithStore()
], RtkFilePickerButton.prototype, "iconPack", void 0);
__decorate$i([
    index.SyncWithStore()
], RtkFilePickerButton.prototype, "t", void 0);
RtkFilePickerButton.style = RtkFilePickerButtonStyle0;

const rtkIconCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block;height:var(--rtk-space-10, 40px);outline:2px solid transparent;outline-offset:2px}:host .icon-wrapper{display:flex;height:100%;width:100%;flex-direction:column;align-items:center}:host svg{height:100%;width:100%;outline:2px solid transparent;outline-offset:2px}:host([size='xl']){box-sizing:border-box;display:block;height:var(--rtk-space-16, 64px) !important;width:var(--rtk-space-16, 64px) !important;--rtk-spinner-color:currentColor}:host([size='md']){box-sizing:border-box;display:block;height:var(--rtk-space-6, 24px) !important;width:var(--rtk-space-6, 24px) !important;--rtk-spinner-color:currentColor}:host([size='sm']){box-sizing:border-box;display:block;height:var(--rtk-space-4, 16px) !important;width:var(--rtk-space-4, 16px) !important;--rtk-spinner-color:currentColor}:host([variant='secondary']) .icon-wrapper{--tw-text-opacity:1;color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-text-opacity))}:host([variant='danger']) .icon-wrapper{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkIconStyle0 = rtkIconCss;

const parseIcon = (icon) => {
    try {
        return JSON.parse(icon);
    }
    catch (e) {
        return icon;
    }
};
const RtkIcon = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon variant */
        this.variant = 'primary';
        /** Size */
        this.size = 'lg';
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'fbacb1ee3dd4c1ca7aa612f08e938601df73036c' }, index$1.h("div", { key: '04c026967cb7aa3acb3fba09fcf5b0d33f45e2b0', class: "icon-wrapper", innerHTML: parseIcon(this.icon), part: "wrapper" })));
    }
};
RtkIcon.style = RtkIconStyle0;

const rtkImageMessageCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.image-spinner{cursor:wait}.image-errored{cursor:not-allowed}";
const RtkImageMessageStyle0 = rtkImageMessageCss;

var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkImageMessage = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Date object of now, to calculate distance between dates */
        this.now = new Date();
        /** Whether the message is continued by same user */
        this.isContinued = false;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** show message in bubble */
        this.showBubble = false;
        this.status = 'loading';
    }
    render() {
        return (index$1.h(index$1.Host, { key: '7e0fc95aff5f4db94f4ec0ba3c4dcd4d2ee9ffa6' }, !this.isContinued && (index$1.h(ChatHead.ChatHead, { key: 'cc7f214502f49fe2869f3e9bdfd797926987ef74', name: this.message.displayName, time: this.message.time, now: this.now })), index$1.h("div", { key: '2e61a7320c1941df7c0d13082a9257e47ec5df58', class: {
                body: true,
                bubble: this.showBubble,
            }, part: "body" }, index$1.h("div", { key: 'bf2eec18c82aae79f31c40d44711ec7db2ab5bf1', class: { image: true, loaded: this.status === 'loaded' } }, index$1.h("img", { key: 'acb8f5ef169bd0c663dbc74c1d43b4186f81004a', src: string.sanitizeLink(this.message.link), onLoad: () => {
                this.status = 'loaded';
            }, onError: () => {
                this.status = 'errored';
            }, onClick: () => {
                if (this.status === 'loaded') {
                    this.stateUpdate.emit({ image: this.message });
                }
            } }), this.status === 'loading' && (index$1.h("div", { key: '92a6610a937088e03200f9048146da0e4f749054', class: "image-spinner", title: this.t('chat.img.loading'), "aria-label": this.t('chat.img.loading') }, index$1.h("rtk-spinner", { key: 'b85fa3e9dd0580f1d7e18360e74670a933e74367', iconPack: this.iconPack }))), this.status === 'errored' && (index$1.h("div", { key: 'b1046aff30dfe244498c957799f33c3a7c26ecb8', class: "image-errored", title: this.t('chat.error.img_not_found'), "aria-label": this.t('chat.error.img_not_found') }, index$1.h("rtk-icon", { key: '833e3ea7f7734a17450c98077e52b9db4fb5404a', icon: this.iconPack.image_off }))), this.status === 'loaded' && (index$1.h("div", { key: '2545e3685f6e586b4fdc1304da08bbece5ec2cda', class: "actions" }, index$1.h("rtk-button", { key: 'bb5e37862d82702f6350f48c275100825dd494fa', class: "action", variant: "secondary", kind: "icon", onClick: () => {
                this.stateUpdate.emit({ image: this.message });
            } }, index$1.h("rtk-icon", { key: '247f754dfe4c9b63634906105a71bb2146154eaa', icon: this.iconPack.full_screen_maximize })), index$1.h("rtk-button", { key: 'ab2712266ddce6f79abf1fca68379abcb4a3c9a1', class: "action", variant: "secondary", kind: "icon", onClick: () => file.downloadFile(this.message.link, { fallbackName: 'image' }) }, index$1.h("rtk-icon", { key: 'ffafa0e22d7752b125d0e1e50cfc03d858d29365', icon: this.iconPack.download }))))))));
    }
};
__decorate$h([
    index.SyncWithStore()
], RtkImageMessage.prototype, "iconPack", void 0);
__decorate$h([
    index.SyncWithStore()
], RtkImageMessage.prototype, "t", void 0);
RtkImageMessage.style = RtkImageMessageStyle0;

const rtkImageMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.image-spinner{cursor:wait}.image-errored{cursor:not-allowed}.image{display:block;font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));position:relative;height:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);cursor:pointer}.image img{display:none;height:100%;width:100%;border-radius:var(--rtk-border-radius-sm, 4px);-o-object-fit:cover;object-fit:cover}.image .image-spinner{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.image .image-spinner rtk-spinner{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}.image .image-errored{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);background-color:rgba(var(--rtk-colors-danger, 255 45 45) / 0.1);--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.image .actions{display:none;height:var(--rtk-space-8, 32px);align-items:center;position:absolute;top:var(--rtk-space-2, 8px);right:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.image .actions .action{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);border-radius:var(--rtk-border-radius-none, 0);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.image .actions .action:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.image.loaded img{display:block}.image.loaded .image-spinner{display:none}.image:hover .actions,.image:focus .actions{display:flex}";
const RtkImageMessageViewStyle0 = rtkImageMessageViewCss;

var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkImageMessageView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onPreview = index$1.createEvent(this, "preview", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.status = 'loading';
    }
    render() {
        return (index$1.h("div", { key: '259bdc1102c6026dd10388ae759f67608c777b5f', class: { image: true, loaded: this.status === 'loaded' } }, index$1.h("img", { key: 'dbcb8d497fee3710f4474ec3ac0ce9a9b4f1bb49', src: string.sanitizeLink(this.url), onLoad: () => {
                this.status = 'loaded';
            }, onError: () => {
                this.status = 'errored';
            }, onClick: () => {
                if (this.status === 'loaded') {
                    this.onPreview.emit(this.url);
                }
            } }), this.status === 'loading' && (index$1.h("div", { key: 'b0ecfada4428e1cb8c3625cc4ce3d2a5bae058ab', class: "image-spinner", title: this.t('chat.img.loading'), "aria-label": this.t('chat.img.loading') }, index$1.h("rtk-spinner", { key: 'fff61c6522d8bcb7de1345bb6505721ee6c6325e', iconPack: this.iconPack }))), this.status === 'errored' && (index$1.h("div", { key: 'c07e2cf6e9a94d375802c974e519d859ab48aa9b', class: "image-errored", title: this.t('chat.error.img_not_found'), "aria-label": this.t('chat.error.img_not_found') }, index$1.h("rtk-icon", { key: '83108f4f0396d77778463601a4f18d8593b0ffe7', icon: this.iconPack.image_off }))), this.status === 'loaded' && (index$1.h("div", { key: '96b5aafbd94eec920ae1cad14f09ab4a44571bd7', class: "actions" }, index$1.h("rtk-button", { key: 'a87ec11cc8de472aeb356689b49b6b366bd67f28', class: "action", variant: "secondary", kind: "icon", onClick: () => {
                this.onPreview.emit(this.url);
            } }, index$1.h("rtk-icon", { key: '543478c786b709ac477d4482874608c0b394b27c', icon: this.iconPack.full_screen_maximize })), index$1.h("rtk-button", { key: '6ce6d94a965688c7ec6ee64f79a4d13dda9651e3', class: "action", variant: "secondary", kind: "icon", onClick: () => file.downloadFile(this.url, { fallbackName: 'image' }) }, index$1.h("rtk-icon", { key: '3b1d67fbdd667e0d006e342c37f6e78c90fd2e34', icon: this.iconPack.download }))))));
    }
};
__decorate$g([
    index.SyncWithStore()
], RtkImageMessageView.prototype, "iconPack", void 0);
__decorate$g([
    index.SyncWithStore()
], RtkImageMessageView.prototype, "t", void 0);
RtkImageMessageView.style = RtkImageMessageViewStyle0;

const rtkJoinStageCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}:host::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host(.stage){box-sizing:border-box;display:block;width:512px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--rtk-space-6, 24px);-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:auto;border-radius:var(--rtk-border-radius-md, 8px);line-height:1.25}:host(.stage) rtk-participant-setup{display:flex;flex:1 1 0%;align-items:center;justify-content:space-around;margin-left:auto;margin-right:auto}:host(.stage) .container rtk-button{flex-grow:1;padding:var(--rtk-space-1, 4px);width:50%}:host(.stage) .container rtk-button:nth-child(1){margin-right:var(--rtk-space-1\\.5, 6px)}:host(.stage) .container rtk-button:nth-child(2){margin-left:var(--rtk-space-1\\.5, 6px)}:host(.stage) h2{font-size:24px;font-weight:500;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}:host(.stage) header{padding-left:var(--rtk-space-4, 16px);padding-right:var(--rtk-space-4, 16px)}:host(.stage) .summary{padding:var(--rtk-space-4, 16px)}.deny-access{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.container{width:100%;max-width:1080px;display:flex;flex:1 1 0%;align-items:center;justify-content:space-around}header{display:flex;align-items:center;justify-content:space-between}";
const RtkJoinStageStyle0 = rtkJoinStageCss;

var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkJoinStage = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        this.joinStage = index$1.createEvent(this, "rtkJoinStage", 7);
        this.leaveStage = index$1.createEvent(this, "rtkLeaveStage", 7);
        /** UI Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Content Config */
        this.dataConfig = {
            title: this.t('stage.join_title'),
            label: {
                accept: this.t('stage.join_confirm'),
                reject: this.t('stage.join_cancel'),
            },
            description: this.t('stage.join_summary'),
        };
        this.isLoading = false;
    }
    render() {
        var _a, _b;
        const defaults = {
            meeting: this.meeting,
            size: this.size,
            states: this.states,
            config: this.config,
            iconPack: this.iconPack,
            t: this.t,
        };
        return (index$1.h(index$1.Host, { key: 'b69a0a77d20a65a3112a393f33e4bc71564b16e1', class: { stage: true } }, index$1.h("header", { key: 'c9860a7bd9139b4ddb188f03f4efadcecf2d4259' }, index$1.h("h2", { key: '3222f6b149c9584205f355daecb4ebc7a2c329e3' }, this.dataConfig.title)), index$1.h(index$2.Render, { key: 'ae93b03e1ffeef036560de82bd1cfd678be9895a', element: "rtk-participant-setup", defaults: defaults, props: { participant: (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self, size: 'md' }, childProps: { participant: (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.self, size: 'md' }, deepProps: true }), index$1.h("div", { key: 'b579bcd55ac13475d46a9b363e50a293b3f8ab87', class: "summary" }, this.dataConfig.description), index$1.h("div", { key: 'b7002bbcf12848243621dbd4e0e62d73ed5c7043', class: "container" }, index$1.h("rtk-button", { key: '240d7e4f50f89e6859be85917a325075d5d98628', variant: "secondary", onClick: () => this.leaveStage.emit(), title: this.dataConfig.label.reject }, this.dataConfig.label.reject), index$1.h("rtk-button", { key: 'c510ea579e35bf1302b6364065a2bb4eac43bec0', onClick: () => {
                if (this.isLoading)
                    return;
                this.isLoading = true;
                this.joinStage.emit();
            }, title: this.dataConfig.label.accept }, this.isLoading ? (index$1.h("rtk-icon", { icon: this.iconPack.spinner })) : (this.dataConfig.label.accept)))));
    }
};
__decorate$f([
    index.SyncWithStore()
], RtkJoinStage.prototype, "meeting", void 0);
__decorate$f([
    index.SyncWithStore()
], RtkJoinStage.prototype, "config", void 0);
__decorate$f([
    index.SyncWithStore()
], RtkJoinStage.prototype, "states", void 0);
__decorate$f([
    index.SyncWithStore()
], RtkJoinStage.prototype, "iconPack", void 0);
__decorate$f([
    index.SyncWithStore()
], RtkJoinStage.prototype, "t", void 0);
RtkJoinStage.style = RtkJoinStageStyle0;

const rtkLeaveMeetingCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.leave-modal{width:var(--rtk-space-72, 288px)}@media (min-width: 768px){.leave-modal{width:var(--rtk-space-96, 384px)}}.leave-modal{position:relative;display:flex;flex-direction:column;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding:var(--rtk-space-8, 32px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px)}.leave-modal .message{color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.leave-modal .content{margin-top:var(--rtk-space-4, 16px);font-size:14px;display:flex;flex-wrap:wrap;gap:var(--rtk-space-4, 16px)}.leave-modal .content rtk-button{height:var(--rtk-space-9, 36px);min-width:var(--rtk-space-44, 176px);flex-grow:1}.leave-modal .content .secondary-btn{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.leave-modal .content .secondary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.leave-modal .content .secondary-danger-btn{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkLeaveMeetingStyle0 = rtkLeaveMeetingCss;

var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkLeaveMeeting = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        this.keyPressListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.canEndMeeting = false;
        this.isBreakoutRoomsActive = false;
        this.isChildMeeting = false;
        this.canJoinMainRoom = false;
        this.permissionsUpdateListener = () => {
            this.canEndMeeting = this.meeting.self.permissions.kickParticipant;
            this.canJoinMainRoom = this.meeting.self.permissions.connectedMeetings.canSwitchToParentMeeting;
        };
        this.close = () => {
            this.stateUpdate.emit({ activeLeaveConfirmation: false });
        };
        this.handleLeave = () => {
            var _a;
            (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.leaveRoom();
            this.close();
        };
        this.handleJoinMainRoom = () => {
            this.meeting.connectedMeetings.moveParticipants(this.meeting.meta.meetingId, this.meeting.connectedMeetings.parentMeeting.id, [this.meeting.self.userId]);
            this.close();
        };
        this.handleEndMeeting = () => {
            var _a;
            (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.participants.kickAll();
            this.close();
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
        document.addEventListener('keydown', this.keyPressListener);
    }
    disconnectedCallback() {
        var _a;
        document.removeEventListener('keydown', this.keyPressListener);
        (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.permissions.removeListener('permissionsUpdate', this.permissionsUpdateListener);
    }
    meetingChanged(meeting) {
        if (meeting != null) {
            this.isBreakoutRoomsActive =
                this.meeting.connectedMeetings.supportsConnectedMeetings &&
                    this.meeting.connectedMeetings.isActive;
            this.isChildMeeting =
                this.meeting.connectedMeetings.supportsConnectedMeetings &&
                    this.meeting.connectedMeetings.meetings.some((cMeet) => cMeet.id === meeting.meta.meetingId);
            this.meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
            this.permissionsUpdateListener();
        }
    }
    render() {
        return (index$1.h(index$1.Host, { key: '3a498cd6ba7efe8697a29b25cb91bba8bf4f8385' }, index$1.h("div", { key: '8094c0d9b4ade3f1a511796556b9bea6163f4081', class: "leave-modal" }, index$1.h("div", { key: '2ccb549f2ce35c8f54d806f7d6aa8e74bbc7bab2', class: "header" }, index$1.h("h2", { key: 'cf9281517dfad495e37f86b51a5cef6e471a1e62', class: "title" }, this.t('leave'))), index$1.h("p", { key: 'c2c0f7a042c377ce26e1045c6462c0a526d00041', class: "message" }, this.isBreakoutRoomsActive && this.isChildMeeting
            ? this.t('breakout_rooms.leave_confirmation')
            : this.t('leave_confirmation')), index$1.h("div", { key: 'd2e9264448b26532318022ec7991fc77a17f15e1', class: "content" }, index$1.h("rtk-button", { key: '7792537400624c5f8028f5a6e167af8cc6c19317', variant: "secondary", onClick: this.close, class: "secondary-btn" }, this.t('cancel')), this.isBreakoutRoomsActive && this.isChildMeeting && this.canJoinMainRoom && (index$1.h("rtk-button", { key: 'e37a7a97fa85d120385f64831efebc02c9b4b036', variant: "secondary", onClick: this.handleJoinMainRoom, class: "secondary-btn" }, this.t('breakout_rooms.leave_confirmation.main_room_btn'))), index$1.h("rtk-button", { key: 'b6ae60a2e64af83b118c077c4eac6c5d7ee6f6f8', variant: "danger", title: this.t('leave'), onClick: this.handleLeave }, this.t('leave')), this.canEndMeeting && (index$1.h("rtk-button", { key: '05f27640ced0043aeb733df84f51a6ee637d3396', variant: "danger", class: "secondary-btn secondary-danger-btn", onClick: this.handleEndMeeting }, this.t('end.all')))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$e([
    index.SyncWithStore()
], RtkLeaveMeeting.prototype, "meeting", void 0);
__decorate$e([
    index.SyncWithStore()
], RtkLeaveMeeting.prototype, "states", void 0);
__decorate$e([
    index.SyncWithStore()
], RtkLeaveMeeting.prototype, "iconPack", void 0);
__decorate$e([
    index.SyncWithStore()
], RtkLeaveMeeting.prototype, "t", void 0);
RtkLeaveMeeting.style = RtkLeaveMeetingStyle0;

const rtkLogoCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;flex-direction:column;align-items:center;justify-content:center;color:rgb(var(--rtk-colors-text-1000, 255 255 255));height:100%;width:auto}svg,img{height:100%;width:auto}.brand-color{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}";
const RtkLogoStyle0 = rtkLogoCss;

var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkLogo = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Config object */
        this.config = uiStore.createDefaultConfig();
        /** Language */
        this.t = uiStore.useLanguage();
    }
    connectedCallback() {
        this.configChanged(this.config);
        this.meetingChanged(this.meeting);
    }
    configChanged(config) {
        var _a;
        if (config != null) {
            const configLogo = (_a = config === null || config === void 0 ? void 0 : config.designTokens) === null || _a === void 0 ? void 0 : _a.logo;
            // NOTE(callmetarush): Only update logo if not passed via prop
            if (configLogo != null && this.logoUrl == null) {
                this.logoUrl = configLogo;
            }
        }
    }
    meetingChanged(meeting) {
        var _a, _b, _c, _d;
        if (meeting != null) {
            const meetingLogo = (_d = (_c = (_b = (_a = meeting.self) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.header) === null || _c === void 0 ? void 0 : _c.elements) === null || _d === void 0 ? void 0 : _d.logo;
            if (meetingLogo != null && this.logoUrl == null) {
                this.logoUrl = meetingLogo;
            }
        }
    }
    render() {
        if (!this.logoUrl || this.logoUrl === '') {
            return null;
        }
        const logo = this.logoUrl;
        const text = this.t('logo');
        return (index$1.h(index$1.Host, { class: "loaded" }, index$1.h("img", { src: logo, alt: text })));
    }
    static get watchers() { return {
        "config": ["configChanged"],
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$d([
    index.SyncWithStore()
], RtkLogo.prototype, "config", void 0);
__decorate$d([
    index.SyncWithStore()
], RtkLogo.prototype, "meeting", void 0);
__decorate$d([
    index.SyncWithStore()
], RtkLogo.prototype, "t", void 0);
RtkLogo.style = RtkLogoStyle0;

const rtkMarkdownViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{overflow-wrap:break-word}a{color:currentColor}.block-quote,blockquote{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px);--tw-border-spacing-x:1px;--tw-border-spacing-y:1px;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-top-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-none, 0);border-left-width:var(--rtk-border-width-md, 2px);border-right-width:var(--rtk-border-width-none, 0);border-style:solid;padding:var(--rtk-space-0\\.5, 2px);padding-left:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);border-top-left-radius:var(--rtk-border-radius-none, 0);border-bottom-left-radius:var(--rtk-border-radius-none, 0)}pre{white-space:pre-wrap}";
const RtkMarkdownViewStyle0 = rtkMarkdownViewCss;

const RtkMarkdownView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** max length of text to render as markdown */
        this.maxLength = chat.MAX_TEXT_LENGTH;
        this.restoreEmpty = (content, tag, renderCallback) => {
            return content.trim().length === 0 ? `${tag}${content}${tag}` : renderCallback(content);
        };
        this.renderLink = (content) => {
            return (index$1.h("a", { class: "link", href: content, target: "_blank", rel: "noopener noreferrer" }, content));
        };
        this.renderBold = (content) => {
            if (typeof content === 'string') {
                return this.restoreEmpty(content, '*', (c) => index$1.h("b", null, c));
            }
            return index$1.h("b", null, this.renderTokens(content));
        };
        this.renderItalic = (content) => {
            if (typeof content === 'string') {
                return this.restoreEmpty(content, '_', (c) => index$1.h("i", null, c));
            }
            return index$1.h("i", null, this.renderTokens(content));
        };
        this.renderStrikethrough = (content) => {
            if (typeof content === 'string') {
                return this.restoreEmpty(content, '~', (c) => index$1.h("s", null, c));
            }
            return index$1.h("b", null, this.renderTokens(content));
        };
        this.renderPlainText = (content) => {
            if (typeof content === 'string') {
                return content;
            }
            return index$1.h("p", null, this.renderTokens(content));
        };
        this.renderTokens = (tokens) => {
            return tokens.map((token) => {
                switch (token.type) {
                    case 'a':
                        if (typeof token.content === 'string') {
                            return this.renderLink(token.content);
                        }
                    case 'b':
                        return this.renderBold(token.content);
                    case 'i':
                        return this.renderItalic(token.content);
                    case 's':
                        return this.renderStrikethrough(token.content);
                    case 'q':
                        return index$1.h("span", { class: "block-quote" });
                    case 'plain_text':
                    default:
                        return this.renderPlainText(token.content);
                }
            });
        };
    }
    renderMessage(text) {
        let lines = text.split('\n');
        let isCodeBlock = false;
        if (lines[0] === '```' && lines[lines.length - 1] === '```') {
            isCodeBlock = true;
            lines = lines.slice(1, -1);
        }
        const message = lines.map((line) => {
            const tokens = chat.parseRichText(line);
            return index$1.h("p", null, this.renderTokens(tokens));
        });
        if (isCodeBlock) {
            return index$1.h("pre", { style: { whiteSpace: 'pre', overflow: 'scroll' } }, lines.join('\n'));
        }
        return message;
    }
    render() {
        const slicedMessage = this.text.slice(0, this.maxLength);
        const withReply = chat.extractReplyBlock(slicedMessage, true);
        const withoutReply = chat.stripOutReplyBlock(slicedMessage);
        return (index$1.h("p", { key: '9544292f118f2c6975a807d6bcc2d307c70b2940' }, withReply.length !== 0 && index$1.h("blockquote", { key: '294bca9889738148fd51ecd8487d2d98b5adee4b' }, this.renderMessage(withReply)), withoutReply.length !== 0 && this.renderMessage(withoutReply)));
    }
};
RtkMarkdownView.style = RtkMarkdownViewStyle0;

const sm = 640;
const md = 768;
const lg = 1080;
const xl = 2160;
const breakpoints = {
	sm: sm,
	md: md,
	lg: lg,
	xl: xl
};

/**
 * Get the screen breakpoint from a given width
 * @param width The width of the container
 * @returns The screen breakpoint value
 */
const getSize = (width) => {
    if (width >= breakpoints.lg)
        return 'lg';
    else if (width >= breakpoints.md)
        return 'md';
    else
        return 'sm';
};

const rtkMeetingCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{box-sizing:border-box;display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));overflow:hidden;position:fixed;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);height:100%;width:100%}:host([mode='fill']){position:relative}";
const RtkMeetingStyle0 = rtkMeetingCss;

const RtkMeeting = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.statesUpdate = index$1.createEvent(this, "rtkStatesUpdate", 7);
        /** Since RtkMeeting by design works as a provider for component, to be in sync with other providers, added provider id */
        this.providerId = 'provider-' + Math.floor(Math.random() * 100);
        this.roomJoinedListener = () => {
            this.updateStates({ meeting: 'joined' });
        };
        this.waitlistedListener = () => {
            this.updateStates({ meeting: 'waiting' });
        };
        this.roomLeftListener = ({ state }) => {
            // Let socketConnectionUpdate listener handle this case.
            if (state === 'disconnected' || state === 'failed')
                return;
            this.updateStates({ meeting: 'ended', roomLeftState: state });
        };
        this.mediaPermissionUpdateListener = ({ kind, message }) => {
            if (['audio', 'video'].includes(kind)) {
                if ((message === 'DENIED' || message === 'SYSTEM_DENIED') &&
                    (this.peerStore || uiStore.uiStore).state.states.activeDebugger !== true) {
                    const permissionModalSettings = {
                        enabled: true,
                        kind,
                    };
                    this.updateStates({ activePermissionsMessage: permissionModalSettings });
                }
            }
        };
        this.socketConnectionUpdateListener = ({ state }) => {
            if (state === 'failed') {
                setTimeout(() => {
                    this.meeting.leave('disconnected');
                }, this.leaveRoomTimer);
            }
        };
        this.peerStore = null; // peer specific store for this meeting peer instance
        /** Whether to load config from preset */
        this.loadConfigFromPreset = false;
        /** Whether to apply the design system on the document root from config */
        this.applyDesignSystem = false;
        /** Fill type */
        this.mode = 'fixed';
        /** Whether participant should leave when this component gets unmounted */
        this.leaveOnUnmount = false;
        /** Language */
        this.t = uiStore.useLanguage();
        /** UI Config */
        this.config = uiStore.createDefaultConfig();
        /** Grid layout */
        this.gridLayout = 'row';
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        this.handleChangingMeeting = (destinationMeetingId) => {
            const currentStates = (this.peerStore || uiStore.uiStore).state.states;
            this.updateStates({
                activeBreakoutRoomsManager: Object.assign(Object.assign({}, currentStates.activeBreakoutRoomsManager), { destinationMeetingId }),
            });
        };
    }
    connectedCallback() {
        var _a;
        if (typeof window !== 'undefined') {
            this.authErrorListener = (ev) => {
                if (ev.detail.message.includes('401')) {
                    this.updateStates({ meeting: 'ended', roomLeftState: 'unauthorized' });
                }
            };
            window.addEventListener('rtkError', this.authErrorListener);
        }
        // Initialize default values
        this.leaveRoomTimer = 10000;
        this.loadConfigFromPreset = true;
        this.applyDesignSystem = true;
        // Setup event listeners
        this.setupStoreRequestListener();
        this.setupStateUpdateListener();
        this.meetingChanged(this.meeting);
        this.iconPackChanged(this.iconPack);
        this.tChanged(this.t);
        this.configChanged(this.config);
        this.resizeObserver = new ResizeObserver_es.index(() => this.handleResize());
        this.resizeObserver.observe(this.host);
        if (this.applyDesignSystem &&
            ((_a = this.config) === null || _a === void 0 ? void 0 : _a.designTokens) != null &&
            typeof document !== 'undefined' &&
            (this.peerStore || uiStore.uiStore).state.states.activeDebugger !== true) {
            merge.provideRtkDesignSystem(document.documentElement, this.config.designTokens);
        }
    }
    disconnectedCallback() {
        var _a;
        if (this.leaveOnUnmount) {
            (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.leaveRoom();
        }
        this.resizeObserver.disconnect();
        window.removeEventListener('rtkError', this.authErrorListener);
        // Remove event listeners
        if (this.storeRequestListener) {
            this.host.removeEventListener('rtkRequestStore', this.storeRequestListener);
            this.storeRequestListener = null;
        }
        if (this.stateUpdateListener) {
            this.host.removeEventListener('rtkStateUpdate', this.stateUpdateListener);
            this.stateUpdateListener = null;
        }
        // Clear meeting listeners
        if (this.meeting) {
            this.clearListeners(this.meeting);
        }
    }
    setupStoreRequestListener() {
        // Remove existing listener if any
        if (this.storeRequestListener) {
            this.host.removeEventListener('rtkRequestStore', this.storeRequestListener);
        }
        // Listen for store requests from child components
        this.storeRequestListener = (event) => {
            // Provide peer specific store if available, otherwise fall back to global store
            if (!this.peerStore)
                return;
            const storeToProvide = this.peerStore;
            const responseEvent = new CustomEvent('rtkProvideStore', {
                detail: { store: storeToProvide, requestId: event.detail.requestId },
            });
            document.dispatchEvent(responseEvent);
            // Stop the event from bubbling further to prevent other meetings from handling it
            event.stopPropagation();
        };
        this.host.addEventListener('rtkRequestStore', this.storeRequestListener);
    }
    setupStateUpdateListener() {
        if (this.stateUpdateListener) {
            this.host.removeEventListener('rtkStateUpdate', this.stateUpdateListener);
        }
        this.stateUpdateListener = (event) => {
            const eventTarget = event.target;
            if (!this.host.contains(eventTarget)) {
                return;
            }
            this.updateStates(event.detail);
        };
        this.host.addEventListener('rtkStateUpdate', this.stateUpdateListener);
    }
    clearListeners(meeting) {
        if (!meeting)
            return;
        meeting.self.removeListener('roomLeft', this.roomLeftListener);
        meeting.self.removeListener('roomJoined', this.roomJoinedListener);
        meeting.self.removeListener('waitlisted', this.waitlistedListener);
        meeting.self.removeListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
        meeting.meta.removeListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
    }
    meetingChanged(meeting) {
        var _a, _b;
        if (!meeting)
            return;
        // Create peer specific store for this meeting peer instance
        if (meeting) {
            this.peerStore = uiStore.createPeerStore({
                meeting,
                config: this.config,
                iconPack: this.iconPack,
                t: this.t,
                providerId: this.providerId,
            });
            // Notify components that peer specific store is now available
            document.dispatchEvent(new CustomEvent('rtkPeerStoreReady', {
                detail: {
                    peerId: meeting.self.id,
                },
            }));
        }
        else {
            this.peerStore = null;
        }
        this.updateStates({ viewType: meeting.meta.viewType });
        if (this.loadConfigFromPreset && meeting.self.config != null) {
            const theme = meeting.self.config;
            const { config, data } = notification.generateConfig(theme, meeting);
            this.config = config;
            if (this.showSetupScreen == null) {
                this.showSetupScreen = data.showSetupScreen;
            }
            if (meeting.connectedMeetings.supportsConnectedMeetings &&
                ((_a = (this.peerStore || uiStore.uiStore).state.states.activeBreakoutRoomsManager) === null || _a === void 0 ? void 0 : _a.destinationMeetingId)) {
                this.showSetupScreen = false;
            }
        }
        if (this.applyDesignSystem &&
            ((_b = this.config) === null || _b === void 0 ? void 0 : _b.designTokens) != null &&
            typeof document !== 'undefined' &&
            (this.peerStore || uiStore.uiStore).state.states.activeDebugger !== true) {
            merge.provideRtkDesignSystem(document.documentElement, this.config.designTokens);
        }
        meeting.self.addListener('roomJoined', this.roomJoinedListener);
        meeting.self.addListener('waitlisted', this.waitlistedListener);
        meeting.self.addListener('roomLeft', this.roomLeftListener);
        meeting.self.addListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
        meeting.meta.addListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
        if (meeting.connectedMeetings.supportsConnectedMeetings) {
            meeting.connectedMeetings.once('changingMeeting', this.handleChangingMeeting);
        }
        if (meeting.self.roomJoined) {
            this.updateStates({ meeting: 'joined' });
        }
        else {
            if (this.showSetupScreen) {
                this.updateStates({ meeting: 'setup' });
            }
            else {
                meeting.joinRoom();
            }
        }
        window.removeEventListener('rtkError', this.authErrorListener);
    }
    iconPackChanged(newIconPack) {
        if (this.peerStore) {
            this.peerStore.state.iconPack = newIconPack;
        }
    }
    tChanged(newT) {
        if (this.peerStore) {
            this.peerStore.state.t = newT;
        }
    }
    configChanged(config) {
        if (this.peerStore) {
            this.peerStore.state.config = config;
        }
        if ((config === null || config === void 0 ? void 0 : config.designTokens) &&
            typeof document !== 'undefined' &&
            (this.peerStore || uiStore.uiStore).state.states.activeDebugger !== true) {
            merge.provideRtkDesignSystem(document.documentElement, config.designTokens);
        }
    }
    handleResize() {
        this.size = getSize(this.host.clientWidth);
    }
    updateStates(states) {
        // Use peer specific store if available, otherwise fall back to global store
        const targetStore = this.peerStore || uiStore.uiStore;
        const newStates = Object.assign({}, targetStore.state.states);
        targetStore.state.states = merge.deepMerge(newStates, states);
        // Emit unscoped event for backward compatibility
        this.statesUpdate.emit(targetStore.state.states);
        // Also emit a scoped event that only this meeting's components should listen to
        const scopedEvent = new CustomEvent('rtkStatesUpdate', {
            detail: targetStore.state.states,
            bubbles: true,
            composed: true,
        });
        this.host.dispatchEvent(scopedEvent);
    }
    render() {
        const defaults = {
            meeting: this.meeting,
            size: this.size,
            states: (this.peerStore || uiStore.uiStore).state.states,
            config: this.config || uiStore.createDefaultConfig(),
            iconPack: this.iconPack,
            t: this.t,
        };
        if ((this.peerStore || uiStore.uiStore).state.states.viewType === 'CHAT') {
            return index$1.h("rtk-chat", Object.assign({}, defaults));
        }
        const elementProps = {
            'rtk-grid': {
                layout: this.gridLayout,
            },
        };
        return index$1.h(index$2.Render, { element: "rtk-meeting", defaults: defaults, asHost: true, elementProps: elementProps });
    }
    get host() { return index$1.getElement(this); }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "iconPack": ["iconPackChanged"],
        "t": ["tChanged"],
        "config": ["configChanged"]
    }; }
};
RtkMeeting.style = RtkMeetingStyle0;

const rtkMenuCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:inline-block;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}#menu-list{position:absolute;z-index:20;display:none}";
const RtkMenuStyle0 = rtkMenuCss;

var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkMenu$1 = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.clickedThis = false;
        /** Placement of menu */
        this.placement = 'bottom-end';
        /** Offset in px */
        this.offset = 10;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.handleOutsideClick = () => {
            // handles clicking on other menu triggers
            if (!this.clickedThis) {
                // if other trigger is clicked, hide this menu-list
                this.menuListEl.style.display = 'none';
            }
            // reset the value
            this.clickedThis = false;
        };
    }
    componentDidLoad() {
        document.addEventListener('click', this.handleOutsideClick);
        this.update();
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleOutsideClick);
    }
    update() {
        floatingUi_dom_esm.computePosition(this.triggerEl, this.menuListEl, {
            placement: this.placement,
            middleware: [floatingUi_dom_esm.offset(this.offset), floatingUi_dom_esm.flip(), floatingUi_dom_esm.shift({ padding: 5 })],
        }).then(({ x, y }) => {
            Object.assign(this.menuListEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'a814ea3dde902a15cb6fb0db8a9c2409c240537f' }, index$1.h("span", { key: 'de2447524c6a1787a6b9442ccb9c3d56a33e9f4f', id: "trigger", ref: (el) => (this.triggerEl = el), onClick: () => {
                this.clickedThis = true;
                if (this.menuListEl.style.display !== 'block') {
                    this.menuListEl.style.display = 'block';
                    this.update();
                }
                else {
                    this.menuListEl.style.display = 'none';
                }
            } }, index$1.h("slot", { key: 'fb566f431ceca452fad8b564cfb777bc90411a02', name: "trigger" })), index$1.h("span", { key: '50b030d301e54677d19cc21dadcec53f566b14cf', part: "menu-list", id: "menu-list", ref: (el) => (this.menuListEl = el) }, index$1.h("slot", { key: '59ce6c30c39155fec448114fd25752585d95c87d' }))));
    }
};
__decorate$c([
    index.SyncWithStore()
], RtkMenu$1.prototype, "iconPack", void 0);
__decorate$c([
    index.SyncWithStore()
], RtkMenu$1.prototype, "t", void 0);
RtkMenu$1.style = RtkMenuStyle0;

const rtkMenuItemCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;align-items:center;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);cursor:pointer;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;color:rgb(var(--rtk-colors-text-1000, 255 255 255));font-size:14px}::slotted([slot='start']){margin-right:var(--rtk-space-2, 8px)}::slotted([slot='end']){margin-left:var(--rtk-space-2, 8px)}:host(:hover){--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}:host(.red){--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkMenuItemStyle0 = rtkMenuItemCss;

var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkMenuItem = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'f0316fee5ac5fd2124ee26ac2664172007ad1c54' }, index$1.h("slot", { key: '994a3a27f743462a3ae0a4c95bc5de672119fdb6', name: "start" }), index$1.h("slot", { key: '24594ecaffb46a4b0458032596570fee37e6ae00' }), index$1.h("slot", { key: '4ede22267a24a37c508591b0148a1e1b2c391fc9', name: "end" })));
    }
};
__decorate$b([
    index.SyncWithStore()
], RtkMenuItem.prototype, "iconPack", void 0);
__decorate$b([
    index.SyncWithStore()
], RtkMenuItem.prototype, "t", void 0);
RtkMenuItem.style = RtkMenuItemStyle0;

const rtkMenuListCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;width:-moz-max-content;width:max-content;flex-direction:column;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;border-radius:var(--rtk-border-radius-sm, 4px);--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}";
const RtkMenuListStyle0 = rtkMenuListCss;

var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkMenuList = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'c0974bc340294b197aa8310e5a9913126ac22c48' }, index$1.h("slot", { key: '1a660db36c713285203569957959663497803c5e' })));
    }
};
__decorate$a([
    index.SyncWithStore()
], RtkMenuList.prototype, "iconPack", void 0);
__decorate$a([
    index.SyncWithStore()
], RtkMenuList.prototype, "t", void 0);
RtkMenuList.style = RtkMenuListStyle0;

const rtkMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.message-wrapper{display:flex;flex-direction:row-reverse;gap:var(--rtk-space-2, 8px)}.message-wrapper.incoming{flex-direction:row}.message{display:flex;flex-direction:column}.header{margin-bottom:var(--rtk-space-1, 4px);align-self:flex-end;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));font-size:14px;font-weight:600}.incoming .header{align-self:flex-start}.body{display:flex;flex-direction:column;min-width:var(--rtk-space-24, 96px);font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));font-size:14px;line-height:1.375;position:relative}.body .metadata{margin-top:var(--rtk-space-2, 8px);align-self:flex-end;font-size:10px}.bubble{max-width:var(--rtk-space-96, 384px);padding:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)));border-radius:var(--rtk-border-radius-md, 8px)}.incoming .bubble{width:-moz-fit-content;width:fit-content;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.avatar{display:none}rtk-menu{position:absolute;right:var(--rtk-space-0, 0px);top:var(--rtk-space-0, 0px);border-radius:var(--rtk-border-radius-lg, 12px)}rtk-menu rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);cursor:pointer}.actions{display:flex;align-items:center;justify-content:center;padding-left:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1, 4px);padding-right:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-md, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;background:radial-gradient(\n    at top right,\n    rgb(var(--rtk-colors-brand-300, 73 124 253)) 60%,\n    rgba(255, 255, 255, 0) 80%\n  )}.actions rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.incoming .actions{background:radial-gradient(\n      at top right,\n      rgb(var(--rtk-colors-background-800, 30 30 30)) 60%,\n      rgba(255, 255, 255, 0) 80%\n    )}.incoming .actions rtk-icon{color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}.incoming rtk-avatar{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}@media (min-width: 400px){.avatar{display:flex;width:var(--rtk-space-6, 24px)}.avatar rtk-avatar{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);font-size:10px;overflow:clip;border-radius:9999px}}@media (hover: hover){rtk-menu{visibility:hidden}.body:hover rtk-menu{visibility:visible}}";
const RtkMessageViewStyle0 = rtkMessageViewCss;

var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkMessageView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onAction = index$1.createEvent(this, "action", 7);
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
        this.iconPack = uiStore.defaultIconPack;
    }
    renderActions() {
        return (index$1.h("rtk-menu", { placement: "top-end", offset: 1 }, index$1.h("button", { slot: "trigger", class: "actions" }, index$1.h("rtk-icon", { icon: this.iconPack.chevron_down })), index$1.h("rtk-menu-list", null, this.actions.map((action) => (index$1.h("rtk-menu-item", { onClick: () => this.onAction.emit(action.id) }, action.icon && index$1.h("rtk-icon", { icon: action.icon, slot: "start" }), action.label))))));
    }
    render() {
        return (index$1.h(index$1.Host, { key: '9fafe4370eee525631023ecde39b3293059e8c22' }, index$1.h("div", { key: '1718981905d4458d0862c34c3c342f7335f0921b', class: { 'message-wrapper': true, [this.viewType]: true } }, !this.hideAvatar && (index$1.h("aside", { key: 'c6ea0c46283a7faa4bb937cb4196e2e1d548c721', class: "avatar", part: "avatar" }, index$1.h("rtk-avatar", { key: 'e3181a831b75b5c79f212da64076dbf6b47fecca', participant: { name: this.authorName, picture: this.avatarUrl }, size: "sm" }))), index$1.h("div", { key: '5565b5711055f1cd543cfaa36c03789b82fb94fa', class: "message", part: "message" }, !this.hideAuthorName && index$1.h("div", { key: '613098d825ba1c33aaca53579c883a306ed1239d', class: "header" }, this.authorName), index$1.h("div", { key: '166dd3e4fb33876cd74f94a7ac193064e8778f81', class: { body: true, bubble: this.variant === 'bubble' } }, index$1.h("slot", { key: 'd04e722b66c4d7cb7c20952a9e7c70d048e66410' }), !this.hideMetadata && !!this.time && (index$1.h("div", { key: 'f12d8c9dd8320202a6906c10298d3357aff5d762', class: "metadata", title: ChatHead.formatDateTime(this.time) }, ChatHead.elapsedDuration(this.time, new Date(Date.now())))), this.actions.length !== 0 && this.renderActions())))));
    }
};
__decorate$9([
    index.SyncWithStore()
], RtkMessageView.prototype, "iconPack", void 0);
RtkMessageView.style = RtkMessageViewStyle0;

const rtkMuteAllConfirmationCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block;-webkit-user-select:none;-moz-user-select:none;user-select:none}.leave-modal{position:relative;display:flex;flex-direction:column;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));padding:var(--rtk-space-4, 16px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px)}.leave-modal .content{font-size:14px}.leave-message p{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px)}.leave-meeting{display:flex;flex-direction:row;justify-content:space-between;gap:var(--rtk-space-2, 8px)}.leave-meeting rtk-button{flex:1 1 0%}.end-meeting{margin-top:var(--rtk-space-2, 8px)}.message{margin-bottom:var(--rtk-space-4, 16px)}label{display:flex;align-items:center}input[type='checkbox']{margin-right:var(--rtk-space-2, 8px);accent-color:rgb(var(--rtk-colors-brand-500, 33 96 253))}";
const RtkMuteAllConfirmationStyle0 = rtkMuteAllConfirmationCss;

var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkMuteAllConfirmation = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.allowUnmute = true;
        this.onClose = () => {
            this.stateUpdate.emit({ activeMuteAllConfirmation: false });
        };
        this.onMuteAll = () => {
            var _a;
            (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.participants.disableAllAudio(this.allowUnmute);
            this.onClose();
        };
    }
    render() {
        return (index$1.h(index$1.Host, { key: '6f260e3a10d229942b3903afc721d30b6e6494a7' }, index$1.h("div", { key: '9bdf56a9eee7b0a172f4b29b619632817ccc1212', class: "leave-modal" }, index$1.h("div", { key: 'a68cd8b46f9727a2ced5e505651e65bf1a1fb1f2', class: "header" }, index$1.h("h2", { key: '202529f47bd59dd2df1a7971a33cc706070705d9', class: "title" }, this.t('mute_all.header'))), index$1.h("p", { key: '40569f7f09c9f370ccd117590113545a4a083e40', class: "message" }, this.t('mute_all.description')), index$1.h("div", { key: 'f6a19e3fcdc7ca1c8e8d443cb705dcd27b55398e', class: "content" }, index$1.h("div", { key: '979e79f3f20c60b1e1474d7c37b96392809078f9', class: "leave-meeting" }, index$1.h("rtk-button", { key: 'a717271acf30ebf16e22cfbc23b7e7120662754c', variant: "secondary", title: this.t('close'), onClick: this.onClose }, this.t('cancel')), index$1.h("rtk-button", { key: '6b425563d4f0c4db28e9201c87d0bd9aa71399a8', variant: "danger", title: this.t('mute_all'), onClick: this.onMuteAll }, this.t('mute_all')))))));
    }
};
__decorate$8([
    index.SyncWithStore()
], RtkMuteAllConfirmation.prototype, "meeting", void 0);
__decorate$8([
    index.SyncWithStore()
], RtkMuteAllConfirmation.prototype, "states", void 0);
__decorate$8([
    index.SyncWithStore()
], RtkMuteAllConfirmation.prototype, "iconPack", void 0);
__decorate$8([
    index.SyncWithStore()
], RtkMuteAllConfirmation.prototype, "t", void 0);
RtkMuteAllConfirmation.style = RtkMuteAllConfirmationStyle0;

const rtkNotificationCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{pointer-events:none;display:block;height:var(--rtk-space-10, 40px);color:rgb(var(--rtk-colors-text-1000, 255 255 255));animation:show 0.4s ease;transition:0.4s;z-index:100}.ctr{box-sizing:border-box;display:inline-flex;height:100%;min-width:var(--rtk-space-40, 160px);align-items:center;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-2, 8px);-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);--tw-shadow-color:rgb(var(--rtk-colors-background-1000, 8 8 8));--tw-shadow:var(--tw-shadow-colored);pointer-events:auto}img{margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-0, 0px);width:var(--rtk-space-0, 0px);border-radius:9999px}img.loaded{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px)}.message{margin-right:var(--rtk-space-2, 8px);max-width:var(--rtk-space-72, 288px) !important;font-size:14px !important;overflow:hidden !important;display:-webkit-box !important;-webkit-box-orient:vertical !important;-webkit-line-clamp:2 !important}.message p{margin:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-1, 4px)}.message blockquote{display:none}rtk-icon.icon{margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}button.dismiss{display:flex;height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);align-items:center;justify-content:center;border-width:var(--rtk-border-width-none, 0);border-style:none;padding:var(--rtk-space-0, 0px);border-radius:var(--rtk-border-radius-sm, 4px);background-color:transparent;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));outline-width:1px;outline-color:rgb(var(--rtk-colors-text-1000, 255 255 255))}button.dismiss:hover{cursor:pointer;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}button.dismiss:focus-visible{outline-style:solid}button.dismiss{transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.dismiss rtk-icon{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px)}rtk-button{border-radius:var(--rtk-border-radius-sm, 4px)}.right{margin-left:auto;display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}:host(.exit){animation:exit 0.4s ease}@keyframes show{0%{opacity:0;transform:translateX(-120px)}100%{opacity:1;transform:translateX(0px)}}@keyframes exit{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(-120px)}}:host([size='sm']){font-size:14px}";
const RtkNotificationStyle0 = rtkNotificationCss;

var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkNotification = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.dismiss = index$1.createEvent(this, "rtkNotificationDismiss", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.imageState = 'loading';
    }
    connectedCallback() {
        this.notificationChanged(this.notification);
    }
    pausedChanged(paused) {
        if (paused) {
            clearTimeout(this.timeout);
        }
        else {
            this.notificationChanged(this.notification);
        }
    }
    notificationChanged(notification) {
        if (notification != null && typeof notification.duration === 'number' && !this.paused) {
            this.timeout = window.setTimeout(() => {
                this.dismiss.emit(notification.id);
            }, notification.duration);
        }
    }
    render() {
        var _a;
        return (index$1.h(index$1.Host, { key: '60c06bbf91a415227daa6df5e33ce70f70b9e96a' }, index$1.h("div", { key: '88b3028fbab2ae480d9b56169be54d7be88f283a', class: "ctr" }, this.notification.icon != null && (index$1.h("rtk-icon", { key: '2082950cbd422100eaae181089b459a228edb5b2', class: "icon", icon: this.notification.icon, variant: (_a = this.notification.iconVariant) !== null && _a !== void 0 ? _a : 'primary' })), this.notification.image != null &&
            this.notification.icon == null &&
            this.imageState !== 'errored' && (index$1.h("img", { key: '56e7d906bb2daf5ddce6b143ffa74a47d602ca70', src: this.notification.image, class: { loaded: this.imageState === 'loaded' }, onLoad: () => (this.imageState = 'loaded'), onError: () => (this.imageState = 'errored') })), index$1.h("p", { key: '980db1c29942c51de04eef62c519ff20402c639e', class: "message" }, index$1.h(TextMessage.TextMessageView, { key: '6b59afd62dcf6671d056ed424146c9c4c1e1bead', message: this.notification.message })), index$1.h("div", { key: 'a4399741c18093e46be3726f3514d8e8a5682ab3', class: "right" }, this.notification.button != null && (index$1.h("rtk-button", { key: 'a20046c85de2c3ee5cd7b6814c84e52a027e0cfc', size: "sm", variant: this.notification.button.variant, onClick: () => this.notification.button.onClick() }, this.notification.button.text)), index$1.h("button", { key: '83d7d13c98c68f6049321d5d0c573ea2eccf65f8', onClick: () => this.dismiss.emit(this.notification.id), class: "dismiss" }, index$1.h("rtk-icon", { key: '5a17a700a54172a10cd2398dd38853bd0c337215', "aria-label": this.t('dismiss'), icon: this.iconPack.dismiss }))))));
    }
    static get watchers() { return {
        "paused": ["pausedChanged"],
        "notification": ["notificationChanged"]
    }; }
};
__decorate$7([
    index.SyncWithStore()
], RtkNotification.prototype, "iconPack", void 0);
__decorate$7([
    index.SyncWithStore()
], RtkNotification.prototype, "t", void 0);
RtkNotification.style = RtkNotificationStyle0;

const DEFAULT_NOTIFICATION_DURATION = 2000;
const DEFAULT_NOTIFICATION_CONFIG = Object.freeze({
    notifications: {
        participant_joined: true,
        participant_left: true,
        participant_joined_waitlist: true,
        chat: true,
        polls: true,
        webinar: true,
        tab_sync: true,
        recording_started: true,
        recording_stopped: true,
    },
    notification_sounds: {
        participant_joined: true,
        participant_left: true,
        chat: true,
        polls: true,
        webinar: true,
        participant_joined_waitlist: true,
    },
    notification_duration: {
        participant_joined: 2100,
        participant_left: 2100,
        participant_joined_waitlist: 4000,
        chat: DEFAULT_NOTIFICATION_DURATION,
        polls: DEFAULT_NOTIFICATION_DURATION,
        webinar: DEFAULT_NOTIFICATION_DURATION,
        tab_sync: DEFAULT_NOTIFICATION_DURATION,
        recording_started: DEFAULT_NOTIFICATION_DURATION,
        recording_stopped: DEFAULT_NOTIFICATION_DURATION,
    },
    participant_joined_sound_notification_limit: 10,
    participant_chat_message_sound_notification_limit: 10,
});

const rtkNotificationsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:absolute;top:var(--rtk-space-4, 16px);right:var(--rtk-space-4, 16px);bottom:var(--rtk-space-4, 16px);left:var(--rtk-space-4, 16px);top:auto;display:flex;flex-direction:column;pointer-events:none;z-index:100}rtk-notification{margin-top:var(--rtk-space-2, 8px)}";
const RtkNotificationsStyle0 = rtkNotificationsCss;

var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function parseConfig(config) {
    const permissions = Object.assign({}, DEFAULT_NOTIFICATION_CONFIG);
    if (config == null)
        return permissions;
    Object.assign(permissions.notification_sounds, config.notification_sounds);
    Object.assign(permissions.notifications, config.notifications);
    Object.assign(permissions.notification_duration, config.notification_duration);
    permissions.participant_chat_message_sound_notification_limit =
        config.participant_chat_message_sound_notification_limit;
    permissions.participant_joined_sound_notification_limit =
        config.participant_joined_sound_notification_limit;
    return permissions;
}
function getEnabledSounds(sounds) {
    return Object.keys(sounds).filter((key) => sounds[key]);
}
const RtkNotifications = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.permissions = DEFAULT_NOTIFICATION_CONFIG;
        this.enabledSounds = getEnabledSounds(DEFAULT_NOTIFICATION_CONFIG.notification_sounds);
        /** Config object */
        this.config = uiStore.createDefaultConfig();
        /** Language */
        this.t = uiStore.useLanguage();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        this.notifications = [];
        this.addStagePeersListeners = (meeting) => {
            meeting.participants.joined.addListener('participantJoined', this.participantJoinedListener);
            meeting.participants.joined.addListener('participantLeft', this.participantLeftListener);
        };
        this.removeStagePeersListeners = (meeting) => {
            meeting.participants.joined.removeListener('participantJoined', this.participantJoinedListener);
            meeting.participants.joined.removeListener('participantLeft', this.participantLeftListener);
        };
        this.onNotification = (e) => {
            this.add(e.detail);
            const playSound = e.detail.playSound;
            if (playSound != undefined)
                this.audio.play(playSound);
        };
        this.onRecordingUpdate = (recordingState) => {
            var _a, _b;
            if (recordingState === 'RECORDING' &&
                this.permissions.notifications.recording_started !== false) {
                this.add({
                    id: 'recording-started',
                    icon: this.iconPack.recording,
                    message: this.t('recording.started'),
                    duration: (_a = this.permissions.notification_duration.recording_started) !== null && _a !== void 0 ? _a : DEFAULT_NOTIFICATION_DURATION,
                });
            }
            else if (recordingState === 'STOPPING' &&
                this.permissions.notifications.recording_stopped !== false) {
                this.add({
                    id: 'recording-stopped',
                    icon: this.iconPack.stop_recording,
                    message: this.t('recording.stopped'),
                    duration: (_b = this.permissions.notification_duration.recording_stopped) !== null && _b !== void 0 ? _b : DEFAULT_NOTIFICATION_DURATION,
                });
            }
        };
        this.paused = false;
    }
    connectedCallback() {
        if (typeof document !== 'undefined') {
            document === null || document === void 0 ? void 0 : document.addEventListener('rtkNotification', this.onNotification);
        }
        this.meetingChanged(this.meeting);
        this.configChanged(this.config);
        this.statesChanged(this.states);
    }
    clearListeners(meeting) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const isLivestream = meeting.meta.viewType === 'LIVESTREAM';
        if ((isLivestream && ((_a = meeting.stage) === null || _a === void 0 ? void 0 : _a.status) === 'ON_STAGE') || !isLivestream) {
            this.removeStagePeersListeners(meeting);
        }
        this.chatUpdateListener && ((_b = meeting.chat) === null || _b === void 0 ? void 0 : _b.removeListener('chatUpdate', this.chatUpdateListener));
        this.pollUpdateListener &&
            ((_c = meeting.polls) === null || _c === void 0 ? void 0 : _c.removeListener('pollsUpdate', this.pollUpdateListener));
        meeting.meta.removeListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
        this.stageRequestAccepted &&
            ((_d = meeting.stage) === null || _d === void 0 ? void 0 : _d.removeListener('stageRequestApproved', this.stageRequestAccepted));
        this.stageRequestRejected &&
            ((_e = meeting.stage) === null || _e === void 0 ? void 0 : _e.removeListener('stageRequestRejected', this.stageRequestRejected));
        this.newStageRequests &&
            ((_f = meeting.stage) === null || _f === void 0 ? void 0 : _f.removeListener('newStageRequest', this.newStageRequests));
        this.stageStatusUpdateListener &&
            ((_g = meeting.stage) === null || _g === void 0 ? void 0 : _g.removeListener('stageStatusUpdate', this.stageStatusUpdateListener));
        (_h = meeting.recording) === null || _h === void 0 ? void 0 : _h.removeListener('recordingUpdate', this.onRecordingUpdate);
        clearTimeout(this.disconnectTimeout);
        meeting.self.removeListener('deviceUpdate', this.deviceUpdateListener);
    }
    disconnectedCallback() {
        var _a;
        if (typeof document !== 'undefined') {
            document === null || document === void 0 ? void 0 : document.removeEventListener('rtkNotification', this.onNotification);
        }
        if (!this.meeting)
            return;
        this.clearListeners(this.meeting);
        this.waitlistedParticipantJoinedListener &&
            this.meeting.participants.waitlisted.removeListener('participantJoined', this.waitlistedParticipantJoinedListener);
        this.waitlistedParticipantLeftListener &&
            this.meeting.participants.waitlisted.removeListener('participantLeft', this.waitlistedParticipantLeftListener);
        this.activeTabUpdateListener &&
            ((_a = this.meeting.meta) === null || _a === void 0 ? void 0 : _a.removeListener('activeTabUpdate', this.activeTabUpdateListener));
        this.peerStageStatusListener &&
            this.meeting.participants.joined.removeListener('stageStatusUpdate', this.peerStageStatusListener);
    }
    meetingChanged(meeting, oldMeeting) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        clearTimeout(this.disconnectTimeout);
        if (oldMeeting)
            this.clearListeners(oldMeeting);
        if (!meeting)
            return;
        const isLivestream = meeting.meta.viewType === 'LIVESTREAM';
        this.audio = new notification.RTKNotificationsAudio(meeting);
        const { notifications, notification_duration, notification_sounds } = this.permissions;
        this.participantJoinedListener = (participant) => {
            if (notifications.participant_joined) {
                this.add({
                    id: `${participant.id}-joined`,
                    message: `${string.formatName(participant.name)} ${this.t('notifications.joined')}`,
                    image: participant.picture,
                    duration: notification_duration.participant_joined,
                });
            }
            if (notification_sounds.participant_joined && this.canPlayParticipantJoinedSound()) {
                this.audio.play('joined');
            }
        };
        this.participantLeftListener = (participant) => {
            const { socketState: { state }, } = this.meeting.meta;
            if (notifications.participant_left && state !== 'connected') {
                this.add({
                    id: `${participant.id}-left`,
                    message: `${string.formatName(participant.name)} ${this.t('notifications.left')}`,
                    image: participant.picture,
                    duration: notification_duration.participant_left,
                });
            }
            if (notification_sounds.participant_left && this.canPlayParticipantJoinedSound()) {
                this.audio.play('left');
            }
        };
        this.waitlistedParticipantJoinedListener = (participant) => {
            if (!this.canAcceptWaitingRequests())
                return;
            const id = `${participant.id}-joined-waitlist`;
            this.add({
                id,
                message: `${string.formatName(participant.name)} ${this.t('notifications.requesting_to_join_meeting')}`,
                image: participant.picture,
                duration: notification_duration.participant_joined_waitlist,
                button: {
                    text: this.t('notifications.accept'),
                    variant: 'primary',
                    onClick: async () => {
                        await this.meeting.participants.acceptWaitingRoomRequest(participant.id);
                        this.remove(id);
                    },
                },
            });
            if (notification_sounds.participant_joined_waitlist && this.canPlayParticipantJoinedSound()) {
                this.audio.play('message');
            }
        };
        this.waitlistedParticipantLeftListener = (participant) => {
            this.remove(`${participant.id}-joined-waitlist`);
        };
        this.chatUpdateListener = ({ message }) => {
            const parsedMessage = chat.parseMessageForTarget(message);
            if (parsedMessage != null) {
                if (parsedMessage.userId === meeting.self.userId) {
                    return;
                }
                if (parsedMessage.type === 'text') {
                    if (notifications.chat) {
                        this.add({
                            id: `message-${Math.random().toString(36)}`,
                            icon: this.iconPack.chat,
                            message: `${parsedMessage.displayName}: ${parsedMessage.message}`,
                            duration: notification_duration.chat,
                        });
                    }
                    if (notification_sounds.chat && this.canPlayChatSound()) {
                        this.audio.play('message');
                    }
                }
            }
        };
        this.pollUpdateListener = ({ polls, newPoll }) => {
            if (newPoll === false)
                return;
            if (notifications.polls &&
                this.meeting.self.userId !== polls[polls.length - 1].createdByUserId) {
                this.add({
                    id: `poll-${Math.random().toString(36)}`,
                    icon: this.iconPack.poll,
                    message: `${this.t('notifications.new_poll_created_by')} ${polls[polls.length - 1].createdBy}`,
                    duration: notification_duration.polls,
                });
            }
            if (notification_sounds.polls &&
                this.meeting.self.userId !== polls[polls.length - 1].createdByUserId &&
                this.canPlayChatSound()) {
                this.audio.play('message');
            }
        };
        this.deviceUpdateListener = ({ device, preview }) => {
            if (preview)
                return;
            if (device.kind === 'audiooutput') {
                this.audio.setDevice(device.deviceId);
                this.remove(`speaker-switched`);
                this.add({
                    id: `speaker-switched`,
                    message: `${this.t('notifications.connected_to')} ${device.label}`,
                    icon: this.iconPack.speaker,
                    duration: 5000,
                });
            }
            if (device.kind === 'videoinput') {
                this.remove(`camera-switched`);
                this.add({
                    id: `camera-switched`,
                    message: `${this.t('notifications.connected_to')} ${device.label}`,
                    icon: this.meeting.self.videoEnabled ? this.iconPack.video_on : this.iconPack.video_off,
                    iconVariant: this.meeting.self.videoEnabled ? 'primary' : 'danger',
                    duration: 5000,
                });
            }
            if (device.kind === 'audioinput') {
                this.remove(`mic-switched`);
                this.add({
                    id: `mic-switched`,
                    message: `${this.t('notifications.connected_to')} ${device.label}`,
                    icon: this.meeting.self.audioEnabled ? this.iconPack.mic_on : this.iconPack.mic_off,
                    iconVariant: this.meeting.self.audioEnabled ? 'primary' : 'danger',
                    duration: 5000,
                });
            }
        };
        this.socketConnectionUpdateListener = ({ state, reconnectionAttempt, reconnected }) => {
            switch (state) {
                case 'connected':
                    this.remove('socket');
                    if (reconnected)
                        this.add({
                            id: `socket`,
                            icon: this.iconPack.wifi,
                            message: this.t('network.restored'),
                            duration: 3000,
                        });
                    break;
                case 'disconnected':
                    this.remove('socket');
                    this.add({
                        id: 'socket',
                        icon: this.iconPack.disconnected,
                        message: this.t('network.reconnecting'),
                    });
                    break;
                case 'reconnecting':
                    if (reconnectionAttempt >= 6) {
                        this.remove('socket');
                        this.add({
                            id: 'socket',
                            icon: this.iconPack.disconnected,
                            message: this.t('network.disconnected'),
                            button: {
                                text: this.t('end'),
                                variant: 'danger',
                                onClick: () => { var _a; return (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.leaveRoom(); },
                            },
                        });
                    }
                    else if (reconnectionAttempt >= 4) {
                        this.remove('socket');
                        this.add({
                            id: 'socket',
                            icon: this.iconPack.disconnected,
                            message: this.t('network.delay_extended'),
                        });
                    }
                    break;
                case 'failed':
                    this.remove('socket');
                    this.add({
                        id: 'socket',
                        icon: this.iconPack.disconnected,
                        message: this.t('network.leaving'),
                        button: {
                            text: this.t('end'),
                            variant: 'danger',
                            onClick: () => { var _a; return (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.leaveRoom(); },
                        },
                    });
                    break;
            }
        };
        this.activeTabUpdateListener = (activeTab) => {
            if (!notifications.tab_sync)
                return;
            switch (activeTab.type) {
                case 'plugin':
                    const activePlugin = meeting.plugins.active
                        .toArray()
                        .find((plugin) => plugin.id == activeTab.id);
                    if (activePlugin != undefined) {
                        this.add({
                            id: 'activeTab',
                            message: `${this.t('notifications.plugin_switched_to')} ${activePlugin.name}`,
                            duration: notification_duration.participant_joined,
                        });
                    }
                    break;
                case 'screenshare':
                    const screenShareParticipant = meeting.participants.joined
                        .toArray()
                        .filter((participant) => participant.screenShareEnabled)
                        .find((participant) => participant.id == activeTab.id);
                    if (screenShareParticipant != undefined) {
                        this.add({
                            id: 'spotlight',
                            message: `Now watching ${screenShareParticipant.name}'s screen`,
                            duration: notification_duration.webinar,
                        });
                    }
                    break;
            }
        };
        this.peerStageStatusListener = (participant) => {
            if (participant.stageStatus === 'REQUESTED_TO_JOIN_STAGE') {
                this.add({
                    id: `stage-request-${participant.id}`,
                    message: `${participant.name} ${this.t('notifications.requested_to_join_stage')}`,
                    duration: notification_duration.webinar,
                    button: {
                        text: this.t('notifications.accept'),
                        variant: 'primary',
                        onClick: async () => {
                            await this.meeting.stage.grantAccess([participant.userId]);
                            this.remove(`stage-request-${participant.id}`);
                        },
                    },
                });
                if (notification_sounds.webinar) {
                    this.audio.play('joined');
                }
            }
            if (participant.stageStatus === 'ON_STAGE') {
                this.add({
                    id: `stage-joined-${participant.id}`,
                    message: `${participant.name} ${this.t('notifications.joined_stage')}`,
                    duration: notification_duration.webinar,
                });
                if (notification_sounds.webinar) {
                    this.audio.play('joined');
                }
            }
        };
        this.stageRequestAccepted = () => {
            this.add({
                id: 'stage-request-accepted',
                message: this.t('notifications.request_to_join_accepted'),
                duration: 3000,
            });
        };
        this.stageRequestRejected = () => {
            this.add({
                id: 'stage-request-rejected',
                message: this.t('notifications.request_to_join_rejected'),
                duration: 3000,
            });
        };
        this.newStageRequests = ({ count }) => {
            this.add({
                id: 'new-stage-request',
                message: `You have ${count < 0 ? 'new stage' : `${count} pending`} request${count === 1 ? '' : 's'}`,
                duration: 3000,
            });
        };
        this.stageStatusUpdateListener = (status) => {
            if (status === 'ON_STAGE')
                this.addStagePeersListeners(meeting);
            else
                this.removeStagePeersListeners(meeting);
        };
        !uiStore.showLivestream(meeting) && ((_a = meeting.chat) === null || _a === void 0 ? void 0 : _a.addListener('chatUpdate', this.chatUpdateListener));
        // temp fix for viewType mismatch with CHAT
        if (((_b = meeting.self.config.viewType) === null || _b === void 0 ? void 0 : _b.toString()) === 'CHAT') {
            return;
        }
        // all non Chat viewtype code from here
        const currentDevices = meeting.self.getCurrentDevices();
        if (currentDevices.speaker != null) {
            this.audio.setDevice(currentDevices.speaker.deviceId);
        }
        if (isLivestream)
            (_c = meeting.stage) === null || _c === void 0 ? void 0 : _c.on('stageStatusUpdate', this.stageStatusUpdateListener);
        else
            this.addStagePeersListeners(meeting);
        if (this.canAcceptWaitingRequests()) {
            meeting.participants.waitlisted.addListener('participantJoined', this.waitlistedParticipantJoinedListener);
            meeting.participants.waitlisted.addListener('participantLeft', this.waitlistedParticipantLeftListener);
        }
        (_d = meeting.polls) === null || _d === void 0 ? void 0 : _d.addListener('pollsUpdate', this.pollUpdateListener);
        meeting.self.addListener('deviceUpdate', this.deviceUpdateListener);
        meeting.meta.addListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
        (_e = meeting.meta) === null || _e === void 0 ? void 0 : _e.addListener('activeTabUpdate', this.activeTabUpdateListener);
        (_f = meeting.recording) === null || _f === void 0 ? void 0 : _f.addListener('recordingUpdate', this.onRecordingUpdate);
        (_g = meeting.stage) === null || _g === void 0 ? void 0 : _g.addListener('stageRequestApproved', this.stageRequestAccepted);
        (_h = meeting.stage) === null || _h === void 0 ? void 0 : _h.addListener('stageRequestRejected', this.stageRequestRejected);
        if (meeting.self.permissions.stageEnabled && meeting.self.permissions.acceptStageRequests) {
            (_j = meeting.stage) === null || _j === void 0 ? void 0 : _j.addListener('newStageRequest', this.newStageRequests);
        }
    }
    configChanged(config) {
        if (config != null) {
            if ((config === null || config === void 0 ? void 0 : config.config) != null) {
                this.permissions = parseConfig(config.config);
                this.enabledSounds = getEnabledSounds(this.permissions.notification_sounds);
            }
        }
    }
    statesChanged(states) {
        var _a;
        if (states != null) {
            const notificationSoundsEnabled = !((_a = states === null || states === void 0 ? void 0 : states.prefs) === null || _a === void 0 ? void 0 : _a.muteNotificationSounds);
            // toggle only the notification sounds values which were enabled in the first place
            for (const permission of this.enabledSounds) {
                if (permission in this.permissions.notification_sounds) {
                    this.permissions.notification_sounds[permission] = notificationSoundsEnabled;
                }
            }
        }
    }
    apiErrorListener({ detail }) {
        const { trace, message } = detail;
        this.add({
            id: trace,
            message,
            duration: DEFAULT_NOTIFICATION_DURATION,
            icon: this.iconPack.warning,
        });
    }
    sendNotificationListener({ detail }) {
        const { trace, message } = detail;
        this.add({
            id: trace,
            message,
            duration: DEFAULT_NOTIFICATION_DURATION,
        });
    }
    add(notification) {
        // show notifications only if tab is in focus and a maximum of 5 at a time
        if (document.visibilityState === 'visible' && this.notifications.length < 5) {
            // adds new notification to start of array so they appear at the bottom
            this.notifications = [...this.notifications, notification];
        }
    }
    remove(id) {
        this.notifications = this.notifications.filter((notification) => notification.id !== id);
    }
    handleDismiss(e) {
        e.stopPropagation();
        const id = e.detail;
        const el = this.host.shadowRoot.querySelector(`[data-id="${id}"]`);
        // exit animation
        el === null || el === void 0 ? void 0 : el.classList.add('exit');
        setTimeout(() => {
            index$1.writeTask(() => {
                this.remove(id);
            });
        }, 400);
    }
    canPlayParticipantJoinedSound() {
        return (this.permissions.participant_joined_sound_notification_limit == undefined ||
            this.permissions.participant_joined_sound_notification_limit <= 0 ||
            this.meeting.participants.count <=
                this.permissions.participant_joined_sound_notification_limit);
    }
    canPlayChatSound() {
        return (this.permissions.participant_chat_message_sound_notification_limit == undefined ||
            this.permissions.participant_chat_message_sound_notification_limit <= 0 ||
            this.meeting.participants.count <=
                this.permissions.participant_chat_message_sound_notification_limit);
    }
    canAcceptWaitingRequests() {
        return (this.permissions.notifications.participant_joined_waitlist &&
            this.meeting.self.permissions.acceptWaitingRequests);
    }
    render() {
        if (!this.meeting) {
            return;
        }
        return (index$1.h(index$1.Host, null, index$1.h("div", { onMouseEnter: () => (this.paused = true), onFocusin: () => (this.paused = true), onMouseLeave: () => (this.paused = false), onFocusout: () => (this.paused = false) }, this.notifications.map((notification) => (index$1.h("rtk-notification", { size: this.size, key: notification.id, "data-id": notification.id, notification: notification, onRtkNotificationDismiss: (e) => this.handleDismiss(e), iconPack: this.iconPack, paused: this.paused, t: this.t }))))));
    }
    get host() { return index$1.getElement(this); }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "config": ["configChanged"],
        "states": ["statesChanged"]
    }; }
};
__decorate$6([
    index.SyncWithStore()
], RtkNotifications.prototype, "meeting", void 0);
__decorate$6([
    index.SyncWithStore()
], RtkNotifications.prototype, "states", void 0);
__decorate$6([
    index.SyncWithStore()
], RtkNotifications.prototype, "config", void 0);
__decorate$6([
    index.SyncWithStore()
], RtkNotifications.prototype, "t", void 0);
__decorate$6([
    index.SyncWithStore()
], RtkNotifications.prototype, "iconPack", void 0);
RtkNotifications.style = RtkNotificationsStyle0;

const rtkOverlayModalCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / 0.6);position:fixed;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);z-index:50}rtk-icon{height:var(--rtk-space-20, 80px)}h2{margin:var(--rtk-space-2, 8px);font-weight:500}p{margin:var(--rtk-space-0, 0px);font-size:16px}";
const RtkOverlayModalStyle0 = rtkOverlayModalCss;

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkOverlayModal = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
    }
    connectedCallback() {
        if (this.states.activeOverlayModal.timeout) {
            setTimeout(() => {
                this.stateUpdate.emit({ activeOverlayModal: { active: false } });
            }, this.states.activeOverlayModal.timeout);
        }
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'c767e575975cc837f1f484932c5c916d5d7e4522' }, index$1.h("rtk-icon", { key: '0f4e8e81e1fa985852cbe4055203ca3095ae8ebe', icon: this.states.activeOverlayModal.icon }), index$1.h("h2", { key: '1af8c19bc19e93b279cf396903a91d3ae7192eda' }, this.states.activeOverlayModal.title), index$1.h("p", { key: '226aacfe32b70ba4e1a01b1e4875af3fd39b559a' }, this.states.activeOverlayModal.description)));
    }
};
__decorate$5([
    index.SyncWithStore()
], RtkOverlayModal.prototype, "meeting", void 0);
__decorate$5([
    index.SyncWithStore()
], RtkOverlayModal.prototype, "states", void 0);
__decorate$5([
    index.SyncWithStore()
], RtkOverlayModal.prototype, "iconPack", void 0);
__decorate$5([
    index.SyncWithStore()
], RtkOverlayModal.prototype, "t", void 0);
RtkOverlayModal.style = RtkOverlayModalStyle0;

const rtkPaginatedListCss = ".scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;display:flex;flex-direction:column;flex:1}.container{box-sizing:border-box;display:flex;flex-direction:column-reverse;padding-top:var(--rtk-space-4, 16px);padding-bottom:var(--rtk-space-4, 16px);flex:1 0 0px;overflow-y:scroll;}.file-picker{display:none}.chat *:first-child{margin-top:var(--rtk-space-0, 0px)}.chat .head{display:flex;align-items:center}.chat .head .name{margin-right:var(--rtk-space-4, 16px);font-size:12px;font-weight:700}.chat .head .time{font-size:12px;color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.chat .body{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-2, 8px);overflow-wrap:break-word;font-size:14px;line-height:1.375}.chat .body .emoji{font-size:24px}p{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px)}rtk-text-message,rtk-image-message,rtk-file-message{margin-top:var(--rtk-space-4, 16px);display:block;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);font-family:var(--rtk-font-family, sans-serif);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));box-sizing:border-box}*[is-continued]{margin-top:var(--rtk-space-3, 12px)}rtk-text-message[is-continued]{margin-top:var(--rtk-space-2, 8px)}.chat .image{position:relative;height:var(--rtk-space-40, 160px);max-width:var(--rtk-space-64, 256px);cursor:pointer}.chat .image img{display:none;height:100%;width:100%;border-radius:var(--rtk-border-radius-sm, 4px);-o-object-fit:cover;object-fit:cover}.chat .image .image-spinner{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.chat .image .image-spinner rtk-spinner{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-text-opacity))}.chat .image .image-errored{display:flex;height:100%;width:100%;flex-direction:column;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-sm, 4px);background-color:rgba(var(--rtk-colors-danger, 255 45 45) / 0.1);--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}.chat .image .actions{display:none;height:var(--rtk-space-8, 32px);align-items:center;position:absolute;top:var(--rtk-space-2, 8px);right:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.chat .image .actions .action{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);border-radius:var(--rtk-border-radius-none, 0);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:transparent;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.chat .image .actions .action:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.image.loaded img{display:block}.image.loaded .image-spinner{display:none}.image:hover .actions,.image:focus .actions{display:flex}.chat .file{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1\\.5, 6px);padding-bottom:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.chat .file .file-data{flex:1 1 0%}.chat .file .file-data .name{word-break:break-all;color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.chat .file .file-data .file-data-split{margin-top:var(--rtk-space-0\\.5, 2px);display:flex;align-items:center;font-size:12px}.chat .file .file-data .file-data-split .ext{margin-right:var(--rtk-space-2, 8px);text-transform:uppercase;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.chat .file .file-data .file-data-split .divider{height:var(--rtk-space-4, 16px);width:var(--rtk-space-0\\.5, 2px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.chat .file .file-data .file-data-split .size{margin-left:var(--rtk-space-2, 8px)}.smallest-dom-element{width:1px}#top-scroll{transform:translateY(20vh)}#bottom-scroll{transform:translateY(-20vh)}a{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-300, 73 124 253) / var(--tw-text-opacity));text-decoration-line:none}a:hover{text-decoration-line:underline}.show-new-messages-ctr{pointer-events:none;position:absolute;bottom:var(--rtk-space-2, 8px);right:var(--rtk-space-4, 16px);z-index:10;margin-top:calc(var(--rtk-space-14, 56px) * -1);--tw-translate-y:var(--rtk-space-28, 112px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:0;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, -webkit-backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.show-new-messages-ctr.active{--tw-translate-y:var(--rtk-space-0, 0px);transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));opacity:1}.show-new-messages{pointer-events:auto;border-radius:9999px}.show-new-messages:hover{border-radius:9999px;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-opacity:1;--tw-ring-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-ring-opacity));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}rtk-spinner,.empty-list{margin:auto}.page-wrapper{margin-left:var(--rtk-space-1, 4px);margin-right:var(--rtk-space-1, 4px)}.message-wrapper{margin-bottom:var(--rtk-space-2, 8px)}.pinned .message-wrapper{position:relative}.pinned .pin-icon{position:absolute;right:calc(var(--rtk-space-1, 4px) * -1);top:calc(var(--rtk-space-1, 4px) * -1);display:flex;border-radius:var(--rtk-border-radius-sm, 4px)}.pinned rtk-message-view{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px)}";
const RtkPaginatedListStyle0 = rtkPaginatedListCss;

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkPaginatedList = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** auto scroll list to bottom */
        this.autoScroll = true;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** label to show when empty */
        this.emptyListLabel = null;
        this.isLoading = false;
        this.rerenderBoolean = false;
        /**
         * This gets disabled when the user scrolls up and the bottom node
         * is not visible anymore.
         */
        this.shouldRenderNewNodes = true;
        /**
         * This gets disabled when the user scrolls up and the bottom node
         * is not visible anymore.
         */
        this.hasNewNodesToRender = false;
        this.showEmptyListLabel = false;
        /**
         * This is a private variable not a state
         * since we want to debounce rerenders
         *
         * A list of pages where each page contains a number of Nodes
         * [
         *  [Node 1, Node 2, Node 3.... Node N],
         *  [Node 1, Node 2, Node 3.... Node N],
         * ]
         */
        this.pagesToRender = [[]];
        this.currentTime = () => {
            return new Date().getTime();
        };
        this.observe = (el) => {
            if (!el)
                return;
            this.intersectionObserver.observe(el);
        };
    }
    /**
     * On a new node created
     */
    async onNewNode(node) {
        if (!this.shouldRenderNewNodes) {
            this.hasNewNodesToRender = true;
            return;
        }
        this.addNodeToRender(node, false);
        this.rerender();
    }
    /**
     * On node deleted
     */
    async onNodeDelete(key) {
        const oldLength = this.pagesToRender.flat().length;
        this.pagesToRender = this.pagesToRender.map((page) => page.filter((item) => item.id !== key));
        if (oldLength !== this.pagesToRender.flat().length) {
            this.rerender();
        }
    }
    /**
     * On node updated
     */
    async onNodeUpdate(key, newItem) {
        let shouldRerender = false;
        this.pagesToRender = this.pagesToRender.map((page) => page.map((item) => {
            if (item.id === key) {
                shouldRerender = true;
                return newItem;
            }
            return item;
        }));
        if (shouldRerender)
            this.rerender();
    }
    onItemChanged(newItemId, oldItemId) {
        if (newItemId !== oldItemId) {
            this.pagesToRender = [[]];
            this.loadFirstPage().then(() => this.rerender());
        }
    }
    connectedCallback() {
        this.rerender = debounce.debounce(this.rerender.bind(this), 50, { maxWait: 200 });
        this.intersectionObserver = new IntersectionObserver((entries) => {
            index$1.writeTask(() => {
                for (const entry of entries) {
                    if (entry.target.id === 'bottom-scroll') {
                        if (entry.isIntersecting)
                            this.loadBottom();
                        else
                            this.shouldRenderNewNodes = false;
                    }
                    if (entry.target.id === 'top-scroll' && entry.isIntersecting) {
                        this.loadTop();
                    }
                }
            });
        });
    }
    disconnectedCallback() {
        this.intersectionObserver.disconnect();
    }
    componentDidLoad() {
        /**
         * Adding observes here so that on the first render we scroll down
         * and shouldRenderNewNodes remains true
         */
        this.loadFirstPage();
        this.observe(this.$topRef);
        this.observe(this.$bottomRef);
    }
    componentDidRender() {
        if (this.shouldRenderNewNodes && this.autoScroll)
            scroll.smoothScrollToBottom(this.$paginatedList);
    }
    loadFirstPage() {
        return this.loadPage(this.currentTime(), this.pageSize, true, (data) => {
            if (data.length === 0) {
                this.showEmptyListLabel = true;
            }
        });
    }
    loadTop() {
        /**
         * If there is only one unfilled page or no page, no need to check
         * for top since it will be empty
         */
        if (this.pagesToRender.length === 0)
            return;
        if (this.pagesToRender.length === 1 && this.pagesToRender[0].length < this.pageSize)
            return;
        /**
         * TODO: Make this more flexible currently this only works with chat
         */
        const oldestVNode = this.pagesToRender[0][0];
        const oldestTimestamp = oldestVNode.timeMs;
        // TODO: scrollIntoView
        const onPageRendered = () => { }; // oldestVNode.$elm$?.scrollIntoView();
        this.loadPage(oldestTimestamp - 1, this.pageSize, true, onPageRendered);
    }
    loadBottom() {
        /**
         * If there is only one unfilled page or no page, no need to check
         * for top since it will be empty
         */
        if (this.pagesToRender.length === 0) {
            this.shouldRenderNewNodes = true;
            return;
        }
        if (this.pagesToRender.length === 1 && this.pagesToRender[0].length < this.pageSize) {
            this.shouldRenderNewNodes = true;
            return;
        }
        const newestVNode = this.pagesToRender.at(-1).at(-1);
        const newestTimestamp = newestVNode.timeMs;
        // TODO: scrollIntoView
        const onPageRendered = () => scroll.smoothScrollToBottom(this.$paginatedList);
        this.loadPage(newestTimestamp + 1, this.pageSize, false, onPageRendered);
    }
    addNodeToRender(node, addToStart) {
        if (addToStart) {
            const firstPage = this.pagesToRender[0];
            if (firstPage && (firstPage === null || firstPage === void 0 ? void 0 : firstPage.length) < this.pageSize) {
                /**
                 * If first page is not full then just add to that page
                 */
                firstPage.unshift(node);
            }
            else {
                /**
                 * If first page is full then add a new page to the start
                 */
                const newPage = [node];
                this.pagesToRender.unshift(newPage);
                this.removeLastPageIfNeeded(false);
            }
        }
        else {
            const [lastPage] = this.pagesToRender.slice(-1);
            if (lastPage && (lastPage === null || lastPage === void 0 ? void 0 : lastPage.length) < this.pageSize) {
                /**
                 * If last page is not full then just add it
                 */
                lastPage.push(node);
            }
            else {
                /**
                 * If last page is full add a new page with just
                 * this node
                 */
                const newPage = [node];
                this.pagesToRender.push(newPage);
                this.removeLastPageIfNeeded(true);
            }
        }
    }
    /**
     * @param start
     * @param end
     * @param reversed Defines whether to add the page at the beginning or the end
     * @param onPageLoaded Callback for when all new nodes are rendered
     */
    async loadPage(timestamp, size, reversed, onPageRendered = () => { }) {
        this.isLoading = true;
        const data = (await this.fetchData(timestamp, size, reversed));
        this.isLoading = false;
        if (!(data === null || data === void 0 ? void 0 : data.length)) {
            /**
             * While scrolling down if there were no new items found
             * then start rendering new nodes;
             */
            if (!reversed) {
                this.hasNewNodesToRender = false;
                this.shouldRenderNewNodes = true;
            }
            onPageRendered([]);
            return;
        }
        // const page = this.createNodes(data);
        // const lastNodeToBeRendered = page[page.length - 1];
        // let lastNodeToBeRenderedProxy = new Proxy(lastNodeToBeRendered, {
        //   set(obj, prop, value) {
        //     /**
        //      * Whenever the last node has the 'elm' property added to it
        //      * we can assume it has been rendered
        //      */
        //     if (prop === '$elm$' && value && !obj.$elm$) onPageRendered();
        //     obj[prop] = value;
        //     return true;
        //   },
        // });
        // page[page.length - 1] = lastNodeToBeRenderedProxy;
        data.forEach((node) => this.addNodeToRender(node, reversed));
        this.rerender();
        onPageRendered(data);
    }
    rerender() {
        this.rerenderBoolean = !this.rerenderBoolean;
    }
    removeLastPageIfNeeded(removeFromStart) {
        if (this.pagesToRender.length > this.pagesAllowed) {
            if (removeFromStart)
                this.pagesToRender.shift();
            else
                this.pagesToRender.pop();
        }
    }
    onDownArrowClicked() {
        /**
         * Load the freshest pages
         */
        this.loadBottom();
    }
    render() {
        var _a;
        /**
         * div.container is flex=column-reverse
         * which is why div#bottom-scroll comes before div#top-scroll
         * div.page-wrapper prevents reversal of messages
         */
        return (index$1.h(index$1.Host, { key: '4f1521c422a134079a5def745ed85631c48a132a' }, index$1.h("div", { key: '0cadd9723fbc844bab7e595d18b6174ecb6ba10c', class: "scrollbar container", part: "container", ref: (el) => (this.$paginatedList = el) }, index$1.h("div", { key: '35a9b009d74a81159c7b856b9412b670051c9893', class: { 'show-new-messages-ctr': true, active: !this.shouldRenderNewNodes } }, index$1.h("rtk-button", { key: '2798fbf3da7200db72dfe1f985d4570163d77ff8', class: "show-new-messages", kind: "icon", variant: "secondary", part: "show-new-messages", onClick: () => this.onDownArrowClicked() }, index$1.h("rtk-icon", { key: '08b47cd4f472b240174cee559d4d39cf796aa788', icon: this.iconPack.chevron_down }))), index$1.h("div", { key: 'ae30f2391936a8a4f258384cc8da4300bf2c350c', class: "smallest-dom-element", id: "bottom-scroll", ref: (el) => (this.$bottomRef = el) }), this.isLoading && this.pagesToRender.flat().length === 0 && index$1.h("rtk-spinner", { key: '72f866d03e6d0d954a46443aa19d95f7033dfbe9', size: "lg" }), this.pagesToRender.flat().length === 0 && this.showEmptyListLabel ? (index$1.h("div", { class: "empty-list" }, (_a = this.emptyListLabel) !== null && _a !== void 0 ? _a : this.t('list.empty'))) : (index$1.h("div", { class: "page-wrapper" }, this.pagesToRender.map((page) => this.createNodes(page)))), index$1.h("div", { key: 'c96065eee8e01c56c0f6cb419b5e26ceef564678', class: "smallest-dom-element", id: "top-scroll", ref: (el) => (this.$topRef = el) }))));
    }
    static get watchers() { return {
        "selectedItemId": ["onItemChanged"]
    }; }
};
__decorate$4([
    index.SyncWithStore()
], RtkPaginatedList.prototype, "iconPack", void 0);
__decorate$4([
    index.SyncWithStore()
], RtkPaginatedList.prototype, "t", void 0);
RtkPaginatedList.style = RtkPaginatedListStyle0;

const rtkPermissionsMessageCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{box-sizing:border-box;display:block;max-height:100%;width:600px;overflow-y:auto;padding:var(--rtk-space-6, 24px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));overflow-wrap:break-word;color:rgb(var(--rtk-colors-text-1000, 255 255 255));word-wrap:break-word}.actions{display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}.text-icon{display:inline-block;vertical-align:middle}h2{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-4, 16px)}h2 .text-icon{margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}p{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-4, 16px)}.need-help-link{margin-top:var(--rtk-space-2, 8px);display:inline-block;text-underline-offset:2px;--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-400, 53 110 253) / var(--tw-text-opacity))}.need-help-link:hover{--tw-text-opacity:1;color:rgba(var(--rtk-colors-brand-600, 13 81 253) / var(--tw-text-opacity))}a rtk-icon{margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px)}:host([size='sm']) .actions{flex-direction:column;align-items:flex-start;justify-content:center}:host([size='sm']) .action{width:100%;padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px)}.actions{margin-top:var(--rtk-space-6, 24px)}.actions rtk-button{flex:1 1 0%}.svg-container{display:flex;width:100%;justify-content:center !important}.svg-ins{width:80%;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity))}";
const RtkPermissionsMessageStyle0 = rtkPermissionsMessageCss;

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const steps = {
    'Chrome.Desktop.audio': ['Chrome1.svg', 'Chrome2.svg', 'Chrome3.svg'],
    'Chrome.Desktop.video': ['Chrome1.svg', 'Chrome2.svg', 'Chrome3.svg'],
};
const RtkPermissionsMessage = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Language */
        this.t = uiStore.useLanguage();
        /** Icon Pack */
        this.iconPack = uiStore.defaultIconPack;
        this.currentStep = 0;
        this.svgSteps = [];
        this.continue = () => {
            this.stateUpdate.emit({
                activePermissionsMessage: { enabled: false },
            });
        };
        this.reload = () => {
            if (typeof window !== 'undefined') {
                window.location.reload();
            }
        };
        this.getImage = async (stepURL) => {
            function replaceAll(target, search, replacement) {
                return target.split(search).join(replacement);
            }
            const svgReq = await fetch(`https://assets.dyte.io/ui-kit/permissions/${stepURL}`);
            let svg = await svgReq.text();
            svg = replaceAll(svg, 'yoursite.com', location.host);
            svg = replaceAll(svg, 'Yoursite', document.title.length > 14 ? `${document.title.slice(0, 14)}...` : document.title);
            return svg;
        };
        this.nextStep = () => {
            this.currentStep = (this.currentStep + 1) % this.svgSteps.length;
        };
        this.openMacSystemSettings = () => {
            const l = document.createElement('a');
            switch (this.mediaType) {
                case 'audio':
                    l.href = 'x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone';
                    break;
                case 'screenshare':
                    l.href = 'x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture';
                    break;
                case 'video':
                    l.href = 'x-apple.systempreferences:com.apple.preference.security?Privacy_Camera';
                    break;
            }
            l.click();
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        if (this.stepsTimer)
            clearTimeout(this.stepsTimer);
    }
    meetingChanged(meeting) {
        var _a, _b, _c;
        if (meeting != null) {
            this.device = meeting.self.device;
            const deviceType = ((_a = this.device) === null || _a === void 0 ? void 0 : _a.isMobile) ? 'Mobile' : 'Desktop';
            const currentSteps = (_c = steps[`${(_b = this.device) === null || _b === void 0 ? void 0 : _b.browserName}.${deviceType}.${this.mediaType}`]) !== null && _c !== void 0 ? _c : [];
            Promise.all(currentSteps.map(this.getImage)).then((currentImages) => {
                this.svgSteps = currentImages;
            });
        }
    }
    getLink(media) {
        let kind;
        switch (media) {
            case 'audio':
                kind = 'microphone';
                break;
            case 'video':
                kind = 'camera';
                break;
            default:
                kind = 'screenshare';
                break;
        }
        const GOOGLE_SEARCH_BASE = 'https://www.google.com/search?q=';
        let query = `Allow+${kind}+access`;
        if (this.device != null) {
            const { browserName, isMobile } = this.device;
            query += '+' + browserName;
            if (isMobile) {
                query += '+mobile';
            }
        }
        return GOOGLE_SEARCH_BASE + query;
    }
    isDeniedBySystem() {
        var _a;
        const permissionsMessage = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.mediaPermissions;
        if (permissionsMessage == null)
            return false;
        if (permissionsMessage[this.mediaType] === 'SYSTEM_DENIED') {
            return true;
        }
        return false;
    }
    getTitle() {
        const isDeniedBySystem = this.isDeniedBySystem();
        if (isDeniedBySystem) {
            return this.t(`perm_sys_denied.${this.mediaType}`);
        }
        return this.t(`perm_denied.${this.mediaType}`);
    }
    get mediaType() {
        var _a, _b, _c;
        return (_c = (_b = (_a = this.states) === null || _a === void 0 ? void 0 : _a.activePermissionsMessage) === null || _b === void 0 ? void 0 : _b.kind) !== null && _c !== void 0 ? _c : 'audio';
    }
    getMessage() {
        var _a;
        const { browserName, osName } = this.meeting.self.device;
        const isDeniedBySystem = this.isDeniedBySystem();
        const browser = (_a = browserName.toLowerCase()) !== null && _a !== void 0 ? _a : 'others';
        const os = osName !== null && osName !== void 0 ? osName : 'others';
        /* NOTE(ravindra-dyte):
          If in case a unknown browser or os doesn't have a translation,
          use the translation for `others`, instead of showing ugly error string,
          such as `perm_denied.video.yandex browser.message`.
        */
        if (isDeniedBySystem) {
            const systemErrorKey = `perm_sys_denied.${this.mediaType}.${os.toLowerCase()}.message`;
            return this.t(systemErrorKey) === systemErrorKey
                ? this.t(`perm_sys_denied.${this.mediaType}.others.message`)
                : this.t(systemErrorKey);
        }
        const browserErrorKey = `perm_denied.${this.mediaType}.${browser}.message`;
        return this.t(browserErrorKey) === browserErrorKey
            ? this.t(`perm_denied.${this.mediaType}.others.message`)
            : this.t(browserErrorKey);
    }
    render() {
        var _a, _b, _c;
        const isDeniedBySystem = this.isDeniedBySystem();
        if (this.svgSteps.length > 0) {
            if (this.stepsTimer)
                clearTimeout(this.stepsTimer);
            this.stepsTimer = setTimeout(this.nextStep, 2500);
        }
        const showMacDeepLink = isDeniedBySystem && this.meeting.self.device.osName == 'macOS';
        return (index$1.h(index$1.Host, { key: '5382ef58e7cd1b901c615f2137460d9cdf255218' }, index$1.h("h2", { key: '62cbe05476171bd2faaca3c1c6142bf17949e405' }, index$1.h("rtk-icon", { key: '1727839b136ad2e87d7109883d3ba22f0db16418', class: "text-icon", icon: this.iconPack.warning }), this.getTitle()), this.svgSteps.length > 0 && (index$1.h("div", { key: 'ebabd8b9725e2a65218ab7826643565bf0f14884', class: 'svg-container' }, this.svgSteps.map((e, index) => (index$1.h("p", { innerHTML: e, class: "svg-ins", key: this.currentStep, hidden: index !== this.currentStep }))))), index$1.h("div", { key: 'a9686c1c427f120d0879c3d57dda17941b06758e' }, this.getMessage()), !isDeniedBySystem && (index$1.h("a", { key: '841dc8ff76cc10e376171c4267efcca71d2ef2a6', class: "need-help-link", href: this.getLink((_c = (_b = (_a = this.states) === null || _a === void 0 ? void 0 : _a.activePermissionsMessage) === null || _b === void 0 ? void 0 : _b.kind) !== null && _c !== void 0 ? _c : 'audio'), target: "_blank", rel: "noreferrer external noreferrer noopener" }, index$1.h("rtk-icon", { key: '6cded0b28e0cd0f25aa58476c7f9f60cacd8abbf', class: "text-icon", icon: this.iconPack.attach }), this.t('cta.help'))), index$1.h("div", { key: '45a90d83f86799bc5e6c5df08adec1b261caad9a', class: "actions" }, index$1.h("rtk-button", { key: 'f882b2b00cea111bd87a23e9985a60a7e45e9e18', size: "lg", kind: "wide", variant: "secondary", onClick: this.continue }, this.t('cta.continue')), showMacDeepLink ? (index$1.h("rtk-button", { size: "lg", kind: "wide", onClick: this.openMacSystemSettings }, this.t('cta.system_settings'))) : (index$1.h("rtk-button", { size: "lg", kind: "wide", onClick: this.reload }, this.t('cta.reload')))), index$1.h("slot", { key: '091e35565236749006f6aac7dd8368dd7045b1b1' })));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$3([
    index.SyncWithStore()
], RtkPermissionsMessage.prototype, "meeting", void 0);
__decorate$3([
    index.SyncWithStore()
], RtkPermissionsMessage.prototype, "t", void 0);
__decorate$3([
    index.SyncWithStore()
], RtkPermissionsMessage.prototype, "iconPack", void 0);
__decorate$3([
    index.SyncWithStore()
], RtkPermissionsMessage.prototype, "states", void 0);
RtkPermissionsMessage.style = RtkPermissionsMessageStyle0;

const rtkSpinnerCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{box-sizing:border-box;display:block;height:var(--rtk-space-10, 40px);width:var(--rtk-space-10, 40px);--rtk-spinner-color:currentColor}.spinner{height:100%;width:100%}@keyframes spin{to{transform:rotate(360deg)}}.spinner{animation:spin 1s linear infinite;border-radius:9999px;background-color:transparent;animation-duration:1.3s}:host([size='md']){height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px)}:host([size='sm']){height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px)}";
const RtkSpinnerStyle0 = rtkSpinnerCss;

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkSpinner = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Size */
        this.size = 'md';
    }
    render() {
        return (index$1.h(index$1.Host, { key: '896d7e13900a390f5c03df4e2af45163d61f6d09' }, index$1.h("rtk-icon", { key: 'dd05bbbb3eb9db982d85db131b82c2bcaf253a94', class: "spinner", icon: this.iconPack.spinner })));
    }
};
__decorate$2([
    index.SyncWithStore()
], RtkSpinner.prototype, "iconPack", void 0);
RtkSpinner.style = RtkSpinnerStyle0;

const rtkTextComposerViewCss = ".chat-input {\n  position: relative;\n  z-index: 10;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  border-top-left-radius: var(--rtk-border-radius-md, 8px);\n  border-top-right-radius: var(--rtk-border-radius-md, 8px)\n}\n\n  .chat-input textarea {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));\n  box-sizing: border-box;\n  padding: var(--rtk-space-3, 12px);\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255))\n}\n\n  .chat-input textarea::-moz-placeholder {\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255))\n}\n\n  .chat-input textarea::placeholder {\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255))\n}\n\n  .chat-input textarea {\n  font-family: var(--rtk-font-family, sans-serif);\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  resize: none;\n  overflow-y: auto;\n  border-width: var(--rtk-border-width-none, 0);\n  border-style: none;\n  min-height: 60px;\n  font-size: 14px\n}\n\n@container chatcontainer (height < 360px) {\n  textarea {\n    height: 30px !important;\n    min-height: 30px !important\n  }\n}\n\n.text-error {\n  left: var(--rtk-space-0, 0px);\n  z-index: 10;\n  margin-top: var(--rtk-space-1, 4px);\n  margin-left: var(--rtk-space-1, 4px);\n  display: flex;\n  width: -moz-fit-content;\n  width: fit-content;\n  align-items: center;\n  justify-content: flex-start;\n  border-radius: var(--rtk-border-radius-sm, 4px);\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--rtk-colors-warning, 255 205 7) / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));\n  padding-left: var(--rtk-space-2, 8px);\n  padding-right: var(--rtk-space-2, 8px);\n  font-size: 12px;\n  font-weight: 600;\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-warning, 255 205 7) / var(--tw-text-opacity));\n  border: 1px solid\n}\n\n#warning-indicator {\n  margin-right: var(--rtk-space-1, 4px);\n  height: var(--rtk-space-3, 12px);\n  width: var(--rtk-space-3, 12px)\n}\n\n.text-error.breached {\n  --tw-border-opacity: 1;\n  border-color: rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-border-opacity));\n  --tw-text-opacity: 1;\n  color: rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))\n}";
const RtkTextComposerViewStyle0 = rtkTextComposerViewCss;

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkTextComposerView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onTextChange = index$1.createEvent(this, "textChange", 7);
        /** Disable the text input (default = false) */
        this.disabled = false;
        /** Boolean to indicate if rate limit is breached */
        this.rateLimitBreached = false;
        /** Keydown event handler function */
        this.keyDownHandler = () => { };
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.maxLengthBreached = 0;
        this.onInputHandler = () => {
            const text = this.$textArea.value.trim();
            this.maybeResize(text);
            this.checkLength(text);
            this.onTextChange.emit(text);
        };
        this.maybeResize = (text) => {
            const newLines = [...text.matchAll(/\n/g)].length;
            this.$textArea.style.height = `${Math.min(200, 60 + 20 * newLines)}px`;
        };
    }
    componentDidLoad() {
        if (this.maxLength) {
            this.$textArea.maxLength = this.maxLength;
        }
        const text = this.$textArea.value.trim();
        if (text !== '') {
            this.maybeResize(text);
        }
        this.$textArea.focus();
    }
    /** Sets value of the text input */
    async setText(text, focus = false) {
        this.$textArea.value = text;
        this.maybeResize(text);
        if (focus) {
            this.$textArea.focus();
        }
        this.checkLength(text);
        this.onTextChange.emit(text);
    }
    checkLength(text) {
        // unicode code length
        const textLen = text.length;
        if (textLen + 10 >= this.maxLength) {
            this.maxLengthBreached = text.length;
        }
        else if (textLen + 10 < this.maxLength && this.maxLengthBreached > 0) {
            this.maxLengthBreached = 0;
        }
    }
    render() {
        return (index$1.h("div", { key: '16cc81323e6fb16e4d4a6622895ed7edc80f2db9', class: "chat-input", part: "chat-input-container" }, this.maxLengthBreached > 0 && (index$1.h("div", { key: '05fde7b4f3e084e464fcc3276f0ce1e0d909e6a7', class: 'text-error ' + (this.maxLengthBreached === this.maxLength ? 'breached' : '') }, index$1.h("rtk-icon", { key: 'd4101bf8933a9873605e88fbb617d8ae38bb56a1', id: "warning-indicator", icon: this.iconPack.warning, part: "warning-indicator" }), ' ', this.maxLengthBreached, " / ", this.maxLength, " ", this.t('chat.max_limit_warning'))), this.rateLimitBreached && (index$1.h("div", { key: '779a1c58114de2cce65a13ee3ea8cb308f7cd68a', class: 'text-error breached' }, index$1.h("rtk-icon", { key: '9dedd14d826b1437f434d92c985659ecc3bc1842', id: "warning-indicator", icon: this.iconPack.warning, part: "warning-indicator" }), ' ', this.t('chat.rate_limit_error'))), index$1.h("textarea", { key: 'f45f8f812ad668a86d2d0a22926bf437be44cbc9', ref: (el) => (this.$textArea = el), placeholder: this.placeholder, disabled: this.disabled, onInput: this.onInputHandler, onKeyDown: this.keyDownHandler, part: "chat-input", value: this.value })));
    }
};
__decorate$1([
    index.SyncWithStore()
], RtkTextComposerView.prototype, "iconPack", void 0);
__decorate$1([
    index.SyncWithStore()
], RtkTextComposerView.prototype, "t", void 0);
RtkTextComposerView.style = RtkTextComposerViewStyle0;

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
const RtkTextMessage = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Date object of now, to calculate distance between dates */
        this.now = new Date();
        /** Whether the message is continued by same user */
        this.isContinued = false;
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** show message in bubble */
        this.showBubble = false;
    }
    render() {
        return (index$1.h(index$1.Host, { key: '74b8d7a70a5960c4350061055ded0fa8838084ae' }, !this.isContinued && (index$1.h(ChatHead.ChatHead, { key: 'c0819a75eb645eff5ac6ccd7bdb54e7dbdce9876', name: this.message.displayName, time: this.message.time, now: this.now })), index$1.h("div", { key: 'f06fbf9a9e4680cc426c183d9ee09bfad452a5ad', class: {
                body: true,
                bubble: this.showBubble,
            }, part: "body" }, index$1.h("div", { key: '2755f1cefa98695843569934c414d6b2fbf158e5', class: { text: true, emoji: string.hasOnlyEmojis(this.message.message) } }, index$1.h(TextMessage.TextMessageView, { key: '52e0ae4b7710d970cb1915fc4059abef212b12fd', message: this.message.message })))));
    }
};
__decorate([
    index.SyncWithStore()
], RtkTextMessage.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkTextMessage.prototype, "t", void 0);

const rtkTextMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.text{word-break:break-word;display:block;overflow-wrap:break-word;line-height:1.375}.text.emoji{font-size:24px}";
const RtkTextMessageViewStyle0 = rtkTextMessageViewCss;

const RtkTextMessageView = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Renders text as markdown (default = true) */
        this.isMarkdown = false;
    }
    render() {
        return (index$1.h("p", { key: '3a9c21d67487ea40760163f0dd69152454049063', class: { text: true, emoji: string.hasOnlyEmojis(this.text) } }, this.isMarkdown ? index$1.h("rtk-markdown-view", { text: this.text }) : this.text));
    }
};
RtkTextMessageView.style = RtkTextMessageViewStyle0;

const rtkTooltipCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{--background-color:var(--rtk-tooltip-background-color, rgb(var(--rtk-colors-background-600, 60 60 60)));--color:var(--rtk-tooltip-color, rgb(var(--rtk-colors-text-1000, 255 255 255)));display:inline-flex}#trigger{display:block;width:100%;flex:1 1 0%}.tooltip{max-width:var(--rtk-space-64, 256px);position:fixed;z-index:20;display:none;width:-moz-max-content;width:max-content;padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-sm, 4px);--tw-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);font-size:12px}.tooltip,#arrow{position:absolute;background-color:var(--background-color);color:var(--color)}#arrow{position:absolute;height:var(--rtk-space-2, 8px);width:var(--rtk-space-2, 8px);transform:rotate(45deg)}:host([variant='primary']){--background-color:rgb(var(--rtk-colors-brand-500, 33 96 253));--color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}:host([kind='block']){display:block}";
const RtkTooltipStyle0 = rtkTooltipCss;

const RtkMenu = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.openChange = index$1.createEvent(this, "rtkOpenChange", 7);
        /** Tooltip label */
        this.label = '';
        /** Tooltip variant */
        this.variant = 'secondary';
        /** Disabled */
        this.disabled = false;
        /** Open */
        this.open = false;
        /** Tooltip kind */
        this.kind = 'inline';
        /** Placement of menu */
        this.placement = 'top';
        /** Delay before showing the tooltip */
        this.delay = 0;
        this.isInFocus = false;
        this.showMenu = () => {
            if (this.disabled)
                return;
            this.isInFocus = true;
            setTimeout(() => {
                if (this.isInFocus) {
                    this.tooltipEl.style.display = 'block';
                    this.update();
                    this.openChange.emit(true);
                    if (this.size === 'sm') {
                        setTimeout(() => {
                            if (this.isInFocus) {
                                this.hideMenu();
                            }
                        }, 1000);
                    }
                }
            }, this.delay);
        };
        this.hideMenu = () => {
            if (this.open || this.disabled)
                return;
            this.isInFocus = false;
            this.tooltipEl.style.display = 'none';
            this.openChange.emit(false);
        };
    }
    componentDidLoad() {
        this.triggerEl.addEventListener('focusin', this.showMenu);
        this.triggerEl.addEventListener('mouseenter', this.showMenu);
        this.triggerEl.addEventListener('focusout', this.hideMenu);
        this.triggerEl.addEventListener('mouseleave', this.hideMenu);
        index$1.writeTask(() => {
            this.openChanged(this.open);
        });
    }
    disconnectedCallback() {
        if (!this.triggerEl)
            return;
        this.triggerEl.removeEventListener('focusin', this.showMenu);
        this.triggerEl.removeEventListener('mouseenter', this.showMenu);
        this.triggerEl.removeEventListener('focusout', this.hideMenu);
        this.triggerEl.removeEventListener('mouseleave', this.hideMenu);
        this.triggerEl = undefined;
    }
    openChanged(open) {
        if (open) {
            this.showMenu();
        }
        else {
            this.hideMenu();
        }
    }
    update() {
        floatingUi_dom_esm.computePosition(this.triggerEl, this.tooltipEl, {
            placement: this.placement,
            middleware: [floatingUi_dom_esm.offset(8), floatingUi_dom_esm.flip(), floatingUi_dom_esm.shift({ padding: 5 }), floatingUi_dom_esm.arrow({ element: this.arrowEl })],
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(this.tooltipEl.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
            const { x: arrowX, y: arrowY } = middlewareData.arrow;
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
            }[placement.split('-')[0]];
            Object.assign(this.arrowEl.style, {
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                right: '',
                bottom: '',
                [staticSide]: '-4px',
            });
        });
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'cee2142cb6afa3e002b614bd3dd18b710b749ac1' }, index$1.h("span", { key: '4ba5b4777592afc8eb0ae14b50e5ebbfbb43bd1f', part: "trigger", id: "trigger", ref: (el) => (this.triggerEl = el) }, index$1.h("slot", { key: 'fa1ecc3998424e21444324bf4b5c90d6891ab03f' })), index$1.h("div", { key: '39306bb13f784942525e0b8b203406512253be3d', part: "tooltip", class: "tooltip", id: "tooltip", role: "tooltip", ref: (el) => (this.tooltipEl = el) }, index$1.h("div", { key: 'd5bd2ca0781605c1ffe4cbeb1ade65430aed6691', id: "arrow", ref: (el) => (this.arrowEl = el), part: "arrow" }), this.label, index$1.h("slot", { key: 'c80c860e2c9cdcbe3c0e0ec97b8f4cd9c99abb78', name: "tooltip" }))));
    }
    static get watchers() { return {
        "open": ["openChanged"]
    }; }
};
RtkMenu.style = RtkTooltipStyle0;

exports.rtk_avatar = RtkAvatar;
exports.rtk_breakout_room_manager = RtkBreakoutRoomManager;
exports.rtk_breakout_room_participants = RtkBreakoutRoomParticipants;
exports.rtk_breakout_rooms_manager = RtkBreakoutRoomsManager;
exports.rtk_broadcast_message_modal = RtkBroadcastMessageModal;
exports.rtk_button = RtkButton;
exports.rtk_channel_creator = RtkChannelCreator;
exports.rtk_channel_details = RtkChannelDetails;
exports.rtk_channel_header = RtkChannelHeader;
exports.rtk_channel_selector_view = RtkChannelSelectorView;
exports.rtk_chat = RtkChat;
exports.rtk_chat_composer_view = RtkChatComposerView;
exports.rtk_chat_message = RtkChatMessage;
exports.rtk_chat_messages_ui = RtkChatMessagesUi;
exports.rtk_chat_messages_ui_paginated = RtkChatMessagesUiPaginated;
exports.rtk_chat_search_results = RtkChatSearchResults;
exports.rtk_confirmation_modal = RtkConfirmationModal;
exports.rtk_counter = RtkCounter;
exports.rtk_debugger = RtkDebugger;
exports.rtk_debugger_audio = RtkDebuggerAudio;
exports.rtk_debugger_screenshare = RtkDebuggerScreenShare;
exports.rtk_debugger_system = RtkDebuggerSystem;
exports.rtk_debugger_video = RtkDebuggerVideo;
exports.rtk_dialog = RtkDialog;
exports.rtk_dialog_manager = RtkDialogManager;
exports.rtk_draft_attachment_view = RtkDraftAttachmentView;
exports.rtk_emoji_picker = RtkEmojiPicker;
exports.rtk_emoji_picker_button = RtkEmojiPickerButton;
exports.rtk_file_message = RtkFileMessage;
exports.rtk_file_message_view = RtkFileMessageView;
exports.rtk_file_picker_button = RtkFilePickerButton;
exports.rtk_icon = RtkIcon;
exports.rtk_image_message = RtkImageMessage;
exports.rtk_image_message_view = RtkImageMessageView;
exports.rtk_join_stage = RtkJoinStage;
exports.rtk_leave_meeting = RtkLeaveMeeting;
exports.rtk_logo = RtkLogo;
exports.rtk_markdown_view = RtkMarkdownView;
exports.rtk_meeting = RtkMeeting;
exports.rtk_menu = RtkMenu$1;
exports.rtk_menu_item = RtkMenuItem;
exports.rtk_menu_list = RtkMenuList;
exports.rtk_message_view = RtkMessageView;
exports.rtk_mute_all_confirmation = RtkMuteAllConfirmation;
exports.rtk_notification = RtkNotification;
exports.rtk_notifications = RtkNotifications;
exports.rtk_overlay_modal = RtkOverlayModal;
exports.rtk_paginated_list = RtkPaginatedList;
exports.rtk_permissions_message = RtkPermissionsMessage;
exports.rtk_spinner = RtkSpinner;
exports.rtk_text_composer_view = RtkTextComposerView;
exports.rtk_text_message = RtkTextMessage;
exports.rtk_text_message_view = RtkTextMessageView;
exports.rtk_tooltip = RtkMenu;
