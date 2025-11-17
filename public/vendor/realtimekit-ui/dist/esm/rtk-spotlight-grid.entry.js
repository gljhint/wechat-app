import { r as registerInstance, h, H as Host, a as getElement } from './index-c1fb98bb.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './ui-store-0098d5c6.js';
import { d as defaultGridSize } from './grid-a3ca5a3e.js';
import { R as Render } from './index-d31a2e33.js';
import { S as SyncWithStore } from './index-914449da.js';

const rtkSpotlightGridCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:flex;height:100%;width:100%}main{flex:1 1 0%}.grid-width-sm{width:25%}.grid-width-md{width:50%}.grid-width-lg{width:66.666667%}:host([size='sm']),:host([size='md']){flex-direction:column}:host([size='md']) aside{max-height:var(--rtk-space-96, 384px);width:100%;max-width:100%}:host([size='md']) .grid-width-sm{height:25%}:host([size='md']) .grid-width-md{height:50%}:host([size='md']) .grid-width-lg{height:66.666667%}:host([size='sm']) aside{max-height:var(--rtk-space-96, 384px);width:100%;max-width:100%}:host([size='sm']) .grid-width-sm,:host([size='sm']) .grid-width-md,:host([size='sm']) .grid-width-lg{height:50%}:host([size='xl']) .grid-width-sm,:host([size='xl']) .grid-width-md,:host([size='xl']) .grid-width-lg{width:400px}:host([layout='column']){flex-direction:column}:host([layout='column']) main{flex:4}:host([layout='column']) aside{flex:2;max-width:100%;width:100%}";
const RtkSpotlightGridStyle0 = rtkSpotlightGridCss;

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
const RtkSpotlightGrid = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Grid Layout */
        this.layout = 'row';
        /** Participants */
        this.participants = [];
        /** Pinned Participants */
        this.pinnedParticipants = [];
        /**
         * Aspect Ratio of participant tile
         *
         * Format: `width:height`
         */
        this.aspectRatio = '16:9';
        /** Gap between participant tiles */
        this.gap = 8;
        /** UI Config */
        this.config = createDefaultConfig();
        /** Icon Pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Grid size */
        this.gridSize = defaultGridSize;
        this.getAdaptiveSize = (length) => {
            if (this.size === 'sm') {
                return 'sm';
            }
            if (length > 3) {
                return 'sm';
            }
            else {
                if (this.size === 'md') {
                    return 'sm';
                }
                return 'md';
            }
        };
    }
    render() {
        const defaults = {
            meeting: this.meeting,
            config: this.config,
            states: this.states,
            size: this.size,
            iconPack: this.iconPack,
            t: this.t,
        };
        const nonPinnedParticipants = this.participants.filter((p) => this.pinnedParticipants.some((pt) => pt.id != p.id));
        return (h(Host, { key: '7640a44634c724d5964c4b4ac2e1a131483b1251' }, h("main", { key: 'ef00af9d4b4eabb86652d7b852c962bc71311012', part: "main" }, h(Render, { key: '6f3665ffdc49b0cb813b5b1a1d09132b685da2f7', element: "rtk-simple-grid", defaults: defaults, props: {
                part: 'main-grid',
                participants: this.pinnedParticipants,
                aspectRatio: this.aspectRatio,
                gap: this.gap,
                size: this.getAdaptiveSize(this.pinnedParticipants.length),
            } })), nonPinnedParticipants.length > 0 && (h("aside", { key: '1b4f2c027f011b04a1f22dac96a82d5584f40aeb', part: "aside", class: this.gridSize.spotlight ? `grid-width-${this.gridSize.spotlight}` : 'grid-width-md' }, h(Render, { key: 'bcc34463bf791b77bb8f5050be2e5aeb3dd01289', element: "rtk-simple-grid", defaults: defaults, props: {
                part: 'aside-grid',
                participants: nonPinnedParticipants,
                aspectRatio: this.aspectRatio,
                gap: this.gap,
                size: this.getAdaptiveSize(nonPinnedParticipants.length),
            } })))));
    }
    get host() { return getElement(this); }
};
__decorate([
    SyncWithStore()
], RtkSpotlightGrid.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkSpotlightGrid.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkSpotlightGrid.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkSpotlightGrid.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkSpotlightGrid.prototype, "t", void 0);
RtkSpotlightGrid.style = RtkSpotlightGridStyle0;

export { RtkSpotlightGrid as rtk_spotlight_grid };
