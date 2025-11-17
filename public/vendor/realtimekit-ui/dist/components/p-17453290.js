import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage, H as participantIdentifier, G as getAllConnectedParticipants } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { f as formatName, s as shorten } from './p-338c7261.js';
import { d as defineCustomElement$4 } from './p-4e9d44f6.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkBreakoutRoomParticipantsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{display:flex;height:100%;flex-direction:column;font-size:14px}:host input[type='checkbox']{margin:var(--rtk-space-0, 0px);cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;border-radius:var(--rtk-border-radius-sm, 4px);position:relative;height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);border-width:var(--rtk-border-width-sm, 1px);border-style:solid;border-color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}:host input[type='checkbox']:checked{--tw-border-opacity:1;border-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-border-opacity));--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity))}:host input[type='checkbox']:checked::before{position:absolute;top:1px;left:1px;height:var(--rtk-space-3, 12px);width:var(--rtk-space-3, 12px);background-color:rgb(var(--rtk-colors-text-1000, 255 255 255));content:'';clip-path:polygon(5% 60%, 35% 93%, 100% 19%, 86% 4%, 36% 62%, 19% 44%)}*{box-sizing:border-box}.participants{margin-top:var(--rtk-space-2, 8px);padding:var(--rtk-space-0, 0px)}.ctr{box-sizing:border-box;padding-top:var(--rtk-space-0, 0px);padding-bottom:var(--rtk-space-0, 0px);overflow-y:auto;flex-grow:1;flex-basis:0}.empty-message{margin-top:var(--rtk-space-10, 40px);margin-bottom:var(--rtk-space-10, 40px);text-align:center;font-size:14px;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.empty-room{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--rtk-space-2, 8px);height:100%;text-align:center;color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.empty-room rtk-icon{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px)}.empty-room p{font-size:16px;font-weight:500;margin:var(--rtk-space-0, 0px)}.empty-room span{font-size:12px;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.search-wrapper{margin-bottom:var(--rtk-space-1, 4px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}.search{position:sticky;box-sizing:border-box;display:flex;align-items:center;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);height:var(--rtk-space-8, 32px)}.search .search-icon{margin-left:var(--rtk-space-2, 8px);margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52))}.search input{box-sizing:border-box;width:100%;padding-right:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;background-color:inherit;color:rgb(var(--rtk-colors-text-1000, 255 255 255));outline:2px solid transparent;outline-offset:2px;border-radius:var(--rtk-border-radius-sm, 4px);font-size:14px}.search input::-moz-placeholder{color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.search input::placeholder{color:rgb(var(--rtk-colors-text-800, 255 255 255 / 0.76))}.header{margin-left:var(--rtk-space-2, 8px);margin-right:var(--rtk-space-1\\.5, 6px);height:var(--rtk-space-9, 36px);padding-top:var(--rtk-space-3, 12px);padding-bottom:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-0\\.5, 2px);border-bottom-width:var(--rtk-border-width-sm, 1px);border-top-width:var(--rtk-border-width-none, 0);border-right-width:var(--rtk-border-width-none, 0);border-left-width:var(--rtk-border-width-none, 0);border-style:solid;--tw-border-opacity:1;border-bottom-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-border-opacity));font-size:12px;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));display:flex;align-items:center;justify-content:space-between}.title-wrapper{display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}.participant-count{display:flex;align-items:center;font-size:14px}.participant-count rtk-icon{margin-right:var(--rtk-space-0\\.5, 2px);width:var(--rtk-space-3, 12px)}.participant-item{display:flex;align-items:center;justify-content:space-between;margin-top:var(--rtk-space-1, 4px);margin-bottom:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-sm, 4px);padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);cursor:pointer}.participant-item input.hide-checkbox{display:none}.participant-item input:checked{display:inline-block}.dragging input{display:none}.participant-item:hover{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity))}.participant-item:hover input{display:inline-block}.peer-ui-container{position:relative;display:flex;align-items:center;gap:var(--rtk-space-2, 8px);height:var(--rtk-space-10, 40px);cursor:pointer;border-radius:var(--rtk-border-radius-sm, 4px);color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.peer-ui-container rtk-avatar{height:var(--rtk-space-7, 28px);width:var(--rtk-space-7, 28px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.peer-ui-container .name{font-size:14px;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}";
const RtkBreakoutRoomParticipantsStyle0 = rtkBreakoutRoomParticipantsCss;

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
const RtkBreakoutRoomParticipants = /*@__PURE__*/ proxyCustomElement(class RtkBreakoutRoomParticipants extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onSelectedParticipantsUpdate = createEvent(this, "selectedParticipantsUpdate", 7);
        this.onAllToggled = createEvent(this, "allParticipantsToggleUpdate", 7);
        this.onParticipantsDragging = createEvent(this, "participantsDragging", 7);
        /** Participant ids */
        this.participantIds = [];
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
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
            const selected = this.selectedParticipantIds.includes(participantIdentifier(participant));
            this.updateSelectedParticipants(participant, !selected);
        };
        this.onToggleAll = (checked) => {
            const selectedParticipants = checked ? this.participantsToShow.map(participantIdentifier) : [];
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
        const id = participantIdentifier(participant);
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
        const allParticipants = getAllConnectedParticipants(this.meeting);
        this.participantsToShow = allParticipants.filter((participant) => {
            var _a;
            return (this.participantIds.includes(participantIdentifier(participant)) &&
                ((_a = participant.displayName) !== null && _a !== void 0 ? _a : '').toLowerCase().includes(search.toLowerCase()));
        });
    }
    renderPeer(participant) {
        const name = formatName(participant.displayName || '');
        return (h("div", { class: "peer-ui-container" }, h("rtk-avatar", { participant: {
                name: participant.displayName,
                picture: participant.displayPictureUrl,
            }, size: "sm" }), h("p", { class: "name", title: name }, shorten(name, 16), this.meeting.self.userId === participant.id && ` (${this.t('you')})`)));
    }
    render() {
        return (h(Host, { key: '3d6466a85fa946d5c0d064d22431e3c7bf044787' }, h("div", { key: '8626af199d5290ce595212817ee06c1ef00d91bf', class: "search-wrapper" }, h("div", { key: '9ac706f201f5975b7d36b4dde7fd9504321b7d5f', class: "search", part: "search" }, h("rtk-icon", { key: '0ccba51717c665364934ea1bfdd7eeea3c5e96b7', icon: this.iconPack.search, part: "search-icon", class: "search-icon" }), h("input", { key: '01c85631f3e1823d1ab384bad4a9efbd86514894', type: "search", autocomplete: "off", placeholder: this.t('search'), onInput: this.onSearchInput, part: "search-input" })), h("slot", { key: '9d3a00a2bd167d053025d979bb0a498028b664de', name: "shuffle-button" })), h("div", { key: '38defd0577bedacd300e8cb558b42727b7817420', class: "header" }, h("div", { key: 'e11f58aae66a50800625464b79517e59094e5f1d', class: "title-wrapper" }, h("span", { key: '99ec80653bc7045fd08c4e95ac15f95dc3ca90ad' }, this.t('breakout_rooms.main_room')), h("span", { key: '40617acc26b95df49c2f221846ee811046709908', class: "participant-count" }, "(", h("rtk-icon", { key: 'aa8c4c4281635c998ea7c254b611341fd28e65cc', icon: this.iconPack.people }), this.participantsToShow.length, ")")), this.selectedParticipantIds.length !== 0 && (h("rtk-tooltip", { key: 'ce8eb895411d27003cafccb8ed694851df0ec52e', label: this.t('breakout_rooms.select_all') }, h("input", { key: '76ba09891936c9dfbfbd216f030c32b38c3160ee', type: "checkbox", checked: this.selectedParticipantIds.length === this.participantsToShow.length, onChange: (e) => this.onToggleAll(!!e.target.checked) })))), h("div", { key: '2ac3f88bd10747f453a626837a8806072ccc283d', class: "ctr scrollbar", part: "container" }, this.participantsToShow.length > 0 && (h("ul", { key: '01e08e47d7b52a1805561b3efc4e97713f542a4d', class: "participants", part: "participants" }, this.participantsToShow.map((participant) => (h("li", { class: { 'participant-item': true, dragging: this.isDragging }, onClick: () => this.onClick(participant), onDragStart: () => this.onDragStart(participant), onDragEnd: () => this.onDragEnd(participant), draggable: this.selectedParticipantIds.length === 0, role: "listitem", key: participant.id }, this.renderPeer(participant), !this.isDragging && (h("input", { type: "checkbox", class: {
                'hide-checkbox': this.selectedParticipantIds.length === 0,
            }, checked: this.selectedParticipantIds.includes(participantIdentifier(participant)) }))))))), this.participantsToShow.length === 0 && this.search.length > 0 && (h("div", { key: 'aa14388c88e230528364d906d97972abdb4a5d7c', class: "empty-message" }, this.t('participants.errors.empty_results'))), this.participantsToShow.length === 0 && this.search.length === 0 && (h("div", { key: '0b10bd982a32001549df0d38cb76f0fcc112fb3d', class: "empty-room" }, h("rtk-icon", { key: 'bc7ce0cfa9f46e0d793f9b9a6b3866325963d017', icon: this.iconPack.people_checked, part: "search-icon", class: "search-icon" }), h("p", { key: '6ff4827b2df19620c677fdbf432669fd60200bb1' }, this.t('breakout_rooms.all_assigned')), h("span", { key: 'ea6e1b05bfaf16842687fbdf1b680cb64fe2a9ef' }, this.t('breakout_rooms.empty_main_room')))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "participantIds": ["participantsChanged"],
        "search": ["searchChanged"]
    }; }
    static get style() { return RtkBreakoutRoomParticipantsStyle0; }
}, [1, "rtk-breakout-room-participants", {
        "meeting": [16],
        "participantIds": [16],
        "iconPack": [16],
        "t": [16],
        "selectedParticipantIds": [16],
        "search": [32],
        "participantsToShow": [32],
        "isDragging": [32]
    }, undefined, {
        "meeting": ["meetingChanged"],
        "participantIds": ["participantsChanged"],
        "search": ["searchChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomParticipants.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomParticipants.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomParticipants.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-breakout-room-participants", "rtk-avatar", "rtk-icon", "rtk-spinner", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-breakout-room-participants":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkBreakoutRoomParticipants);
            }
            break;
        case "rtk-avatar":
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
        case "rtk-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkBreakoutRoomParticipants as R, defineCustomElement as d };
