import { p as proxyCustomElement, H, d as createEvent, w as writeTask, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { i as isFullScreenEnabled, r as requestFullScreen, e as exitFullSreen, a as isFullScreenSupported } from './p-02f19345.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-1391bef0.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-03bdc4c0.js';

const rtkScreenshareViewCss = ":host {\n  line-height: initial;\n  font-family: var(--rtk-font-family, sans-serif);\n\n  font-feature-settings: normal;\n  font-variation-settings: normal;\n}\n\np {\n  margin: var(--rtk-space-0, 0px);\n  padding: var(--rtk-space-0, 0px);\n}\n\n\n:host {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  border-radius: var(--rtk-border-radius-lg, 12px);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-video-bg, 24 24 24) / var(--tw-bg-opacity));\n  container-type: inline-size;\n  container-name: screentile;\n}\n\n::slotted(rtk-name-tag) {\n  position: absolute;\n  left: var(--rtk-space-3, 12px);\n  bottom: var(--rtk-space-3, 12px);\n  opacity: 0.8;\n}\n\n#video-container {\n  position: absolute;\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n\n#video-container .fit-in-container {\n  -o-object-fit: fill;\n     object-fit: fill;\n}\n\nvideo {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n\n:host([variant='gradient']) ::slotted(rtk-audio-visualizer) {\n  position: absolute;\n  top: var(--rtk-space-2, 8px);\n  right: var(--rtk-space-2, 8px);\n  border-radius: 9999px;\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));\n  padding: var(--rtk-space-2, 8px);\n}\n\n:host([variant='gradient']) ::slotted(rtk-name-tag) {\n  bottom: var(--rtk-space-0, 0px);\n  left: var(--rtk-space-0, 0px);\n  display: flex;\n  width: 100%;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  background-color: transparent;\n  background-image: linear-gradient(to top, var(--tw-gradient-stops));\n  --tw-gradient-from: rgb(var(--rtk-colors-background-1000, 8 8 8));\n  --tw-gradient-to: rgba(var(--rtk-colors-background-1000, 8 8 8) / 0);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n  --tw-gradient-to: transparent;\n}\n\n:host([size='sm'][variant='gradient']) ::slotted(rtk-audio-visualizer) {\n  height: var(--rtk-space-5, 20px);\n  width: var(--rtk-space-5, 20px);\n}\n\nvideo.visible {\n  animation: video-fadein 0.4s ease;\n}\n\n#controls {\n  display: none;\n  position: absolute;\n  top: var(--rtk-space-3, 12px);\n  right: var(--rtk-space-3, 12px);\n  align-items: center;\n  justify-content: flex-end;\n  gap: var(--rtk-space-2, 8px);\n}\n\n:host(:hover) #controls, \n:host(:active) #controls, \n:host(:focus-visible) #controls {\n  display: flex;\n}\n\n#full-screen-btn {\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));\n}\n\n/** For self view */\n\nh3 {\n  margin-top: var(--rtk-space-10, 40px);\n  margin-bottom: var(--rtk-space-6, 24px);\n  text-align: center;\n  font-size: 20px;\n  font-weight: 500;\n}\n\n:host([size='sm']) h3 {\n  font-size: 16px;\n}\n\n#self-message {\n  padding-left: var(--rtk-space-4, 16px);\n  padding-right: var(--rtk-space-4, 16px);\n}\n\n:host(.isSelf) #self-view {\n  flex: 1 1 0%;\n}\n\n:host(.isSelf) #video-container {\n  position: static;\n  aspect-ratio: auto;\n  height: auto;\n  width: 50%;\n  max-width: var(--rtk-space-96, 384px);\n  border-radius: var(--rtk-border-radius-md, 8px);\n  transition: 0.6s ease;\n}\n\n:host(.isSelf) #video-container.expand {\n  width: 60%;\n  max-width: 100%;\n}\n\n.actions {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--rtk-space-2, 8px);\n}\n\n:host([size='sm'].isSelf) #video-container,\n:host([size='md'].isSelf) #video-container,\n:host([size='sm'].isSelf) #expand-btn,\n:host([size='md'].isSelf) #expand-btn {\n  /** Hide video, fullscreen buttons in sm and md breakpoints */\n  display: none;\n}\n\n/** Remote control */\n\np {\n  margin: var(--rtk-space-0, 0px);\n  padding: var(--rtk-space-0, 0px);\n}\n\n.remote-control {\n  z-index: 10;\n  height: 100%;\n  max-height: 100%;\n  flex: 0 1 auto;\n}\n\n#remote-control-self {\n  position: absolute;\n  top: var(--rtk-space-0, 0px);\n  left: 50%;\n  z-index: 10;\n  width: -moz-max-content;\n  width: max-content;\n  max-width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  height: var(--rtk-space-8, 32px);\n  align-items: center;\n  overflow: hidden;\n  border-radius: var(--rtk-border-radius-sm, 4px);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-warning, 255 205 7) / var(--tw-bg-opacity));\n  font-size: 12px;\n  color: rgb(var(--rtk-colors-text-1000, 255 255 255));\n  transform: translateX(-50%);\n}\n\n#remote-control-self p {\n  padding-left: var(--rtk-space-3, 12px);\n  padding-right: var(--rtk-space-3, 12px);\n  padding-top: var(--rtk-space-2, 8px);\n  padding-bottom: var(--rtk-space-2, 8px);\n}\n\n#remote-control-self rtk-button {\n  height: 100%;\n  border-radius: var(--rtk-border-radius-none, 0);\n  --tw-bg-opacity: 1;\n  background-color: rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-bg-opacity));\n  font-size: 12px;\n}\n\n:host([size='sm']) #remote-control-self {\n  height: auto;\n  flex-direction: column;\n}\n\n:host([size='sm']) #remote-control-self rtk-button {\n  width: 100%;\n  padding-top: var(--rtk-space-1, 4px);\n  padding-bottom: var(--rtk-space-1, 4px);\n}\n\n/** Name tag positions */\n\n:host([name-tag-position='bottom-right']) ::slotted(rtk-name-tag) {\n  left: auto;\n  right: var(--rtk-space-3, 12px);\n}\n\n:host([name-tag-position='bottom-center']) ::slotted(rtk-name-tag) {\n  left: auto;\n  right: auto;\n}\n\n:host([name-tag-position='top-left']) ::slotted(rtk-name-tag) {\n  top: var(--rtk-space-3, 12px);\n  bottom: auto;\n}\n\n:host([name-tag-position='top-right']) ::slotted(rtk-name-tag) {\n  top: var(--rtk-space-3, 12px);\n  right: var(--rtk-space-3, 12px);\n  left: auto;\n  bottom: auto;\n}\n\n:host([name-tag-position='top-center']) ::slotted(rtk-name-tag) {\n  left: auto;\n  right: auto;\n  bottom: auto;\n  top: var(--rtk-space-3, 12px);\n}\n\n/** Keyframes */\n\n@keyframes video-fadein {\n  0% {\n    opacity: 0;\n    transform: scale(1.4) translateY(20px);\n  }\n\n  100% {\n    opacity: 1;\n    transform: scale(1) translateY(0);\n  }\n}\n\n::slotted(rtk-network-indicator) {\n  position: absolute;\n  right: var(--rtk-space-3, 12px);\n  bottom: var(--rtk-space-3, 12px);\n}\n\n@media only screen and (max-height: 480px) and (orientation: landscape) {\n    :host([size='sm'][variant='solid']) ::slotted(rtk-name-tag), \n    :host([size='sm'][variant='solid']) rtk-name-tag {\n    left: var(--rtk-space-0, 0px);\n    bottom: var(--rtk-space-0, 0px);\n    border-radius: var(--rtk-border-radius-none, 0);\n      transform-origin: 0% 110%;\n      transform: scale(0.6);\n  }\n}\n\n@container screentile (max-width: 400px) {\n  ::slotted(rtk-name-tag) {\n    transform-origin: 0 130%;\n    transform: scale(0.7);\n  }\n}\n";
const RtkScreenshareViewStyle0 = rtkScreenshareViewCss;

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
const RtkScreenshareView$1 = /*@__PURE__*/ proxyCustomElement(class RtkScreenshareView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        this.play = createEvent(this, "screensharePlay", 7);
        this.fullScreenListener = () => {
            this.isFullScreen = isFullScreenEnabled();
        };
        this.participantScreenshareUpdate = (p) => {
            if (p.id !== this.participant.id)
                return;
            this.screenShareListener(p);
        };
        /** Hide full screen button */
        this.hideFullScreenButton = false;
        /** Position of name tag */
        this.nameTagPosition = 'bottom-left';
        /** Variant */
        this.variant = 'solid';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.videoExpanded = false;
        this.screenShareEnabled = false;
        this.isFullScreen = false;
        this.toggleFullScreen = () => {
            if (!this.isFullScreen) {
                requestFullScreen(this.host);
                this.isFullScreen = true;
            }
            else {
                exitFullSreen();
                this.isFullScreen = false;
            }
        };
    }
    connectedCallback() {
        window === null || window === void 0 ? void 0 : window.addEventListener('fullscreenchange', this.fullScreenListener);
        window === null || window === void 0 ? void 0 : window.addEventListener('webkitfullscreenchange', this.fullScreenListener);
    }
    componentDidLoad() {
        this.participantChanged(this.participant);
    }
    disconnectedCallback() {
        if (!this.meeting)
            return;
        const { self } = this.meeting;
        if (this.participant.id === self.id && this.screenShareListener)
            this.participant.removeListener('screenShareUpdate', this.screenShareListener);
        else
            this.meeting.participants.joined.removeListener('screenShareUpdate', this.participantScreenshareUpdate);
        window === null || window === void 0 ? void 0 : window.removeEventListener('fullscreenchange', this.fullScreenListener);
        window === null || window === void 0 ? void 0 : window.removeEventListener('webkitfullscreenchange', this.fullScreenListener);
    }
    participantChanged(participant) {
        if (participant != null && this.meeting) {
            const { self } = this.meeting;
            this.screenShareListener = ({ screenShareEnabled, screenShareTracks }) => {
                const enabled = screenShareEnabled && screenShareTracks.video != null;
                writeTask(() => {
                    this.screenShareEnabled = enabled;
                });
                if (enabled) {
                    const stream = new MediaStream();
                    stream.addTrack(screenShareTracks.video);
                    if (this.videoEl != null) {
                        this.videoEl.srcObject = stream;
                        this.videoEl.play();
                    }
                }
                else if (this.videoEl != null) {
                    this.videoEl.srcObject = undefined;
                }
            };
            this.screenShareListener(participant);
            if (participant.id === self.id)
                participant.addListener('screenShareUpdate', this.screenShareListener);
            else
                this.meeting.participants.joined.addListener('screenShareUpdate', this.participantScreenshareUpdate);
        }
    }
    render() {
        var _a, _b;
        const isSelf = ((_a = this.participant) === null || _a === void 0 ? void 0 : _a.id) === ((_b = this.meeting) === null || _b === void 0 ? void 0 : _b.self.id);
        const text = this.isFullScreen ? this.t('full_screen.exit') : this.t('full_screen');
        const icon = this.isFullScreen
            ? this.iconPack.full_screen_minimize
            : this.iconPack.full_screen_maximize;
        return (h(Host, { key: '34b2ef729d2ac2c5bdff2c29412a72d539ab512c', class: { isSelf } }, h("div", { key: "video-container", id: "video-container", class: { expand: this.videoExpanded } }, h("video", { key: '2ce3c6939616fa6bb4e487d3ba4ef0a343aaeb6f', ref: (el) => (this.videoEl = el), class: {
                visible: this.screenShareEnabled,
                'fit-in-container': this.participant.supportsRemoteControl,
            }, playsInline: true, onPlay: () => {
                this.play.emit({
                    screenshareParticipant: this.participant,
                    participant: this.meeting.self,
                });
            }, autoPlay: true, muted: true, id: `screen-share-video-${this.participant.id}` })), h("div", { id: "controls", key: "controls" }, !this.hideFullScreenButton && !isSelf && isFullScreenSupported() && (h("rtk-tooltip", { key: '0d85023b8a8347a93279abafde8fbf09cb41b95a', label: text }, h("rtk-button", { key: '1c2de414eaa60015a51b332490a276e1372cd968', id: "full-screen-btn", kind: "icon", onClick: this.toggleFullScreen, title: text }, h("rtk-icon", { key: '4855d0ff22108ab6bb859d771955c5e3eb5d69f6', icon: icon, "aria-hidden": true, tabIndex: -1 }))))), isSelf && (h("div", { id: "self-message", key: "self-message" }, h("h3", { key: '052603a136533ed56f70dc1c8aa36f1423925c61' }, this.t('screenshare.shared')), h("div", { key: '25f07fbc055318abcf486ac977ec89fc6c65c191', class: "actions" }, this.meeting != null && (h("rtk-button", { key: '0740cd5d8b0dc40615d3142e07eb7f4ae36238d7', variant: "danger", onClick: () => {
                this.meeting.self.disableScreenShare();
            } }, h("rtk-icon", { key: '4d2a00a772c9dc2f6cb5b9b42a99b096838d0df0', icon: this.iconPack.share_screen_stop, slot: "start" }), this.t('screenshare.stop'))), h("rtk-button", { key: '5fda78778feed97ac9b5b44a449011927b855cfa', variant: "secondary", id: "expand-btn", onClick: () => {
                this.videoExpanded = !this.videoExpanded;
            } }, h("rtk-icon", { key: 'e20687dfdbdad334c23cb49e366c24fd1a71047d', icon: this.videoExpanded
                ? this.iconPack.full_screen_minimize
                : this.iconPack.full_screen_maximize, slot: "start" }), this.videoExpanded
            ? this.t('screenshare.min_preview')
            : this.t('screenshare.max_preview'))))), h("slot", { key: '4a2fedd80bef177633ccdfee754d06186692e6bb' })));
    }
    get host() { return this; }
    static get watchers() { return {
        "participant": ["participantChanged"]
    }; }
    static get style() { return RtkScreenshareViewStyle0; }
}, [1, "rtk-screenshare-view", {
        "hideFullScreenButton": [4, "hide-full-screen-button"],
        "nameTagPosition": [513, "name-tag-position"],
        "participant": [16],
        "meeting": [16],
        "variant": [513],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "videoExpanded": [32],
        "screenShareEnabled": [32],
        "isFullScreen": [32],
        "remoteControlInfo": [32]
    }, undefined, {
        "participant": ["participantChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkScreenshareView$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkScreenshareView$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkScreenshareView$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-screenshare-view", "rtk-button", "rtk-icon", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-screenshare-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkScreenshareView$1);
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
        case "rtk-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const RtkScreenshareView = RtkScreenshareView$1;
const defineCustomElement = defineCustomElement$1;

export { RtkScreenshareView, defineCustomElement };
