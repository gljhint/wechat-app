import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$1 } from './p-1391bef0.js';

const rtkLeaveMeetingCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.leave-modal{width:var(--rtk-space-72, 288px)}@media (min-width: 768px){.leave-modal{width:var(--rtk-space-96, 384px)}}.leave-modal{position:relative;display:flex;flex-direction:column;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));padding:var(--rtk-space-8, 32px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px)}.leave-modal .message{color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.leave-modal .content{margin-top:var(--rtk-space-4, 16px);font-size:14px;display:flex;flex-wrap:wrap;gap:var(--rtk-space-4, 16px)}.leave-modal .content rtk-button{height:var(--rtk-space-9, 36px);min-width:var(--rtk-space-44, 176px);flex-grow:1}.leave-modal .content .secondary-btn{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.leave-modal .content .secondary-btn:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.leave-modal .content .secondary-danger-btn{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkLeaveMeetingStyle0 = rtkLeaveMeetingCss;

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
const RtkLeaveMeeting = /*@__PURE__*/ proxyCustomElement(class RtkLeaveMeeting extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        this.keyPressListener = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
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
        return (h(Host, { key: '3a498cd6ba7efe8697a29b25cb91bba8bf4f8385' }, h("div", { key: '8094c0d9b4ade3f1a511796556b9bea6163f4081', class: "leave-modal" }, h("div", { key: '2ccb549f2ce35c8f54d806f7d6aa8e74bbc7bab2', class: "header" }, h("h2", { key: 'cf9281517dfad495e37f86b51a5cef6e471a1e62', class: "title" }, this.t('leave'))), h("p", { key: 'c2c0f7a042c377ce26e1045c6462c0a526d00041', class: "message" }, this.isBreakoutRoomsActive && this.isChildMeeting
            ? this.t('breakout_rooms.leave_confirmation')
            : this.t('leave_confirmation')), h("div", { key: 'd2e9264448b26532318022ec7991fc77a17f15e1', class: "content" }, h("rtk-button", { key: '7792537400624c5f8028f5a6e167af8cc6c19317', variant: "secondary", onClick: this.close, class: "secondary-btn" }, this.t('cancel')), this.isBreakoutRoomsActive && this.isChildMeeting && this.canJoinMainRoom && (h("rtk-button", { key: 'e37a7a97fa85d120385f64831efebc02c9b4b036', variant: "secondary", onClick: this.handleJoinMainRoom, class: "secondary-btn" }, this.t('breakout_rooms.leave_confirmation.main_room_btn'))), h("rtk-button", { key: 'b6ae60a2e64af83b118c077c4eac6c5d7ee6f6f8', variant: "danger", title: this.t('leave'), onClick: this.handleLeave }, this.t('leave')), this.canEndMeeting && (h("rtk-button", { key: '05f27640ced0043aeb733df84f51a6ee637d3396', variant: "danger", class: "secondary-btn secondary-danger-btn", onClick: this.handleEndMeeting }, this.t('end.all')))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
    static get style() { return RtkLeaveMeetingStyle0; }
}, [1, "rtk-leave-meeting", {
        "meeting": [16],
        "states": [16],
        "iconPack": [16],
        "t": [16],
        "canEndMeeting": [32]
    }, undefined, {
        "meeting": ["meetingChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkLeaveMeeting.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkLeaveMeeting.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkLeaveMeeting.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkLeaveMeeting.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-leave-meeting", "rtk-button"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-leave-meeting":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkLeaveMeeting);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkLeaveMeeting as R, defineCustomElement as d };
