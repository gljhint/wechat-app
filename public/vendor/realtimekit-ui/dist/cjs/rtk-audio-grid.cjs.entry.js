'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');
const index$2 = require('./index-821d14b7.js');

const rtkAudioGridCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{position:relative;height:100%;width:100%;box-sizing:border-box}.content{position:relative;display:flex;height:100%;width:100%;flex-direction:column;overflow-y:auto}.waitlist-area{display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.listening-title{text-align:center;margin-top:var(--rtk-space-5, 20px);margin-bottom:var(--rtk-space-4, 16px)}.waitlist-grid{flex:1 1 0%}.grid{box-sizing:border-box;flex:1 1 0%;gap:var(--rtk-space-6, 24px);display:flex;align-content:center;justify-content:center;flex-wrap:wrap}:host([size='md']) .grid{gap:var(--rtk-space-4, 16px)}:host([size='sm']) .grid{gap:var(--rtk-space-3, 12px)}rtk-audio-tile{aspect-ratio:1 / 1;flex:none;width:calc(20%);max-width:var(--rtk-space-48, 192px);transition:all 0.3s}rtk-audio-tile[size='md']{width:100%;max-width:var(--rtk-space-36, 144px)}rtk-audio-tile[size='sm']{width:100%;max-width:var(--rtk-space-24, 96px)}";
const RtkAudioGridStyle0 = rtkAudioGridCss;

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
const RtkAudioGrid = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Icon Pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Whether to hide self in the grid */
        this.hideSelf = false;
        this.activeParticipants = [];
        this.onStageParticipants = [];
        this.offStageParticipants = [];
        this.onParticipantListUpdate = () => {
            if (!this.meeting) {
                return;
            }
            let activeParticipants = this.meeting.participants.active.toArray();
            if (!this.hideSelf) {
                activeParticipants = [...activeParticipants, this.meeting.self];
            }
            let onStageParticipants = this.meeting.participants.joined
                .toArray()
                .filter((p) => !activeParticipants.some((a) => a.id === p.id));
            this.activeParticipants = activeParticipants;
            this.onStageParticipants = onStageParticipants;
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    meetingChanged(meeting) {
        if (!meeting || meeting.self.config.viewType !== 'AUDIO_ROOM') {
            return;
        }
        this.onParticipantListUpdate();
        // listeners
        meeting.participants.active.addListener('participantJoined', this.onParticipantListUpdate);
        meeting.participants.active.addListener('participantLeft', this.onParticipantListUpdate);
        meeting.participants.joined.addListener('participantJoined', this.onParticipantListUpdate);
        meeting.participants.joined.addListener('participantLeft', this.onParticipantListUpdate);
    }
    disconnectedCallback() {
        this.resizeObserver.disconnect();
        this.resizeObserver = undefined;
        this.meeting.participants.active.removeListener('participantJoined', this.onParticipantListUpdate);
        this.meeting.participants.active.removeListener('participantLeft', this.onParticipantListUpdate);
        this.meeting.participants.joined.removeListener('participantJoined', this.onParticipantListUpdate);
        this.meeting.participants.joined.removeListener('participantLeft', this.onParticipantListUpdate);
    }
    renderGrid(participants = []) {
        const defaults = {
            meeting: this.meeting,
            size: this.size,
            config: this.config,
            t: this.t,
            iconPack: this.iconPack,
            states: this.states,
        };
        return participants.map((participant) => {
            return (index$1.h(index$2.Render, { element: "rtk-audio-tile", defaults: defaults, props: {
                    key: participant.id,
                    participant,
                }, childProps: {
                    participant,
                }, deepProps: true }));
        });
    }
    render() {
        const onStage = this.activeParticipants.concat(this.onStageParticipants);
        return (index$1.h(index$1.Host, { key: '9abf98e115b0c6904fd970c39880101fab2c637c' }, index$1.h("div", { key: 'dba672bd5cdd108629802028080eef8d1fb3afd6', class: "content scrollbar" }, index$1.h("div", { key: '21fc5e7ac8a6226b35695960f8f4b92a227344b5', class: "stage grid" }, this.renderGrid(onStage)), this.offStageParticipants.length > 0 && (index$1.h("div", { key: '6aee7d64d2af6e4435c5e552e24d7a3dc12847f8', class: "waitlist-area" }, index$1.h("div", { key: 'e84f6038cc0071062b9d5d033848739bdb1cc971', class: "listening-title" }, this.offStageParticipants.length, " ", this.t('grid.listening')), index$1.h("div", { key: 'd6d5cdd233847dca6902a4c0158be110b36b1c76', class: "waitlist-grid grid" }, this.renderGrid(this.offStageParticipants))))), index$1.h("slot", { key: '03aee180fdfdf0a8391e31cc2e943173fb06bcc0' })));
    }
    get host() { return index$1.getElement(this); }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate([
    index.SyncWithStore()
], RtkAudioGrid.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkAudioGrid.prototype, "config", void 0);
__decorate([
    index.SyncWithStore()
], RtkAudioGrid.prototype, "states", void 0);
__decorate([
    index.SyncWithStore()
], RtkAudioGrid.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkAudioGrid.prototype, "t", void 0);
RtkAudioGrid.style = RtkAudioGridStyle0;

exports.rtk_audio_grid = RtkAudioGrid;
