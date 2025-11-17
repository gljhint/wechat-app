import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkParticipantSetupCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:16 / 9;height:var(--rtk-space-56, 224px);overflow:hidden;border-radius:var(--rtk-border-radius-lg, 12px);-webkit-user-select:none;-moz-user-select:none;user-select:none;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-video-bg, 24 24 24) / var(--tw-bg-opacity));transition-property:var(--rtk-transition-property, all);transition-duration:150ms}@media (prefers-reduced-motion){:host{--rtk-transition-property:none}}:host([size='sm'][variant='solid']) ::slotted(rtk-name-tag){left:var(--rtk-space-2, 8px);bottom:var(--rtk-space-2, 8px);height:var(--rtk-space-4, 16px)}video{display:none;position:absolute;height:100%;width:100%;border-radius:var(--rtk-border-radius-lg, 12px)}video.contain{-o-object-fit:contain;object-fit:contain}video.cover{-o-object-fit:cover;object-fit:cover}video.visible{display:block}video::-webkit-media-controls{display:none !important}:host([variant='gradient']) ::slotted(rtk-audio-visualizer){position:absolute;top:var(--rtk-space-2, 8px);right:var(--rtk-space-2, 8px);border-radius:9999px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));padding:var(--rtk-space-2, 8px)}:host([variant='gradient']) ::slotted(rtk-name-tag){bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);display:flex;width:100%;align-items:center;justify-content:center;text-align:center;background-color:transparent;background-image:linear-gradient(to top, var(--tw-gradient-stops));--tw-gradient-from:rgb(var(--rtk-colors-background-1000, 8 8 8));--tw-gradient-to:rgba(var(--rtk-colors-background-1000, 8 8 8) / 0);--tw-gradient-stops:var(--tw-gradient-from), var(--tw-gradient-to);--tw-gradient-to:transparent}video.mirror{transform:scaleX(-1)}@media (orientation: portrait){:host{height:var(--rtk-space-44, 176px)}}";
const RtkParticipantSetupStyle0 = rtkParticipantSetupCss;

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
const RtkParticipantSetup$1 = /*@__PURE__*/ proxyCustomElement(class RtkParticipantSetup extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.isPinned = false;
        /** Position of name tag */
        this.nameTagPosition = 'bottom-left';
        /** Whether tile is used for preview */
        this.isPreview = false;
        /** Config object */
        this.config = createDefaultConfig();
        /** Variant */
        this.variant = 'solid';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.onVideoUpdate = (videoState) => {
            this.videoState = videoState;
        };
    }
    connectedCallback() {
        // set videoState before initial render and initialize listeners
        this.participantsChanged(this.participant);
    }
    componentDidLoad() {
        // load videoState into video element after first render
        this.videoStateChanged(this.videoState);
    }
    disconnectedCallback() {
        if (this.participant == null)
            return;
        this.participant.removeListener('videoUpdate', this.onVideoUpdate);
    }
    async participantsChanged(participant) {
        if (participant != null) {
            this.videoState = {
                videoEnabled: participant.videoEnabled,
                videoTrack: participant.videoTrack,
            };
            this.isPinned = participant.isPinned;
            participant.addListener('videoUpdate', this.onVideoUpdate);
        }
    }
    videoStateChanged(videoState) {
        if (videoState != null && this.videoEl != null) {
            if (videoState.videoEnabled) {
                const stream = new MediaStream();
                stream.addTrack(videoState.videoTrack);
                this.videoEl.srcObject = stream;
            }
            else {
                this.videoEl.srcObject = undefined;
            }
        }
    }
    isMirrored() {
        var _a;
        if (this.participant != null) {
            const isSelf = 'preview' in this.participant || this.isPreview;
            if (isSelf) {
                const states = this.states;
                const mirrorVideo = (_a = states === null || states === void 0 ? void 0 : states.prefs) === null || _a === void 0 ? void 0 : _a.mirrorVideo;
                if (typeof mirrorVideo === 'boolean') {
                    return mirrorVideo;
                }
            }
        }
        return false;
    }
    render() {
        var _a, _b, _c, _d;
        return (h(Host, { key: 'b1470884fc7e85a79e6d6954547737690dd6923a' }, h("video", { key: 'c967c9e6716624e3a484d424fe33a50b4d9799c6', ref: (el) => (this.videoEl = el), class: {
                visible: (_a = this.videoState) === null || _a === void 0 ? void 0 : _a.videoEnabled,
                mirror: this.isMirrored(),
                [(_d = (_c = (_b = this.config) === null || _b === void 0 ? void 0 : _b.config) === null || _c === void 0 ? void 0 : _c.videoFit) !== null && _d !== void 0 ? _d : 'cover']: true,
            }, autoPlay: true, playsInline: true, muted: true }), h("slot", { key: 'fe319fc4aa0cc4049024e3860a8af2b2d6d5bc68' })));
    }
    static get watchers() { return {
        "participant": ["participantsChanged"],
        "videoState": ["videoStateChanged"]
    }; }
    static get style() { return RtkParticipantSetupStyle0; }
}, [1, "rtk-participant-setup", {
        "nameTagPosition": [513, "name-tag-position"],
        "isPreview": [4, "is-preview"],
        "participant": [16],
        "states": [16],
        "config": [16],
        "variant": [513],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "videoState": [32],
        "isPinned": [32]
    }, undefined, {
        "participant": ["participantsChanged"],
        "videoState": ["videoStateChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkParticipantSetup$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkParticipantSetup$1.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkParticipantSetup$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkParticipantSetup$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-participant-setup"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-participant-setup":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkParticipantSetup$1);
            }
            break;
    } });
}
defineCustomElement$1();

const RtkParticipantSetup = RtkParticipantSetup$1;
const defineCustomElement = defineCustomElement$1;

export { RtkParticipantSetup, defineCustomElement };
