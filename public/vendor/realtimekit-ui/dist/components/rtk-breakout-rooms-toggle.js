import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage, J as canToggleBreakout } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-c5b6ed4f.js';
import { d as defineCustomElement$3 } from './p-3b29dda1.js';
import { d as defineCustomElement$2 } from './p-a59a9c97.js';

const rtkBreakoutRoomsToggleCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkBreakoutRoomsToggleStyle0 = rtkBreakoutRoomsToggleCss;

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
const RtkBreakoutRoomsToggle$1 = /*@__PURE__*/ proxyCustomElement(class RtkBreakoutRoomsToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.canToggle = false;
        this.permissionsUpdateListener = () => {
            this.canToggle = canToggleBreakout(this.meeting);
        };
        this.breakoutRoomToggle = () => {
            var _a, _b;
            const mode = this.meeting.connectedMeetings.isActive ? 'view' : 'create';
            this.stateUpdate.emit({
                activeBreakoutRoomsManager: {
                    active: !((_b = (_a = this.states) === null || _a === void 0 ? void 0 : _a.activeBreakoutRoomsManager) === null || _b === void 0 ? void 0 : _b.active),
                    mode,
                },
            });
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        var _a, _b, _c;
        (_c = (_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.permissions) === null || _c === void 0 ? void 0 : _c.off('permissionsUpdate', this.permissionsUpdateListener);
    }
    meetingChanged(meeting) {
        if (!meeting)
            return;
        this.canToggle = canToggleBreakout(meeting);
        meeting.self.permissions.on('permissionsUpdate', this.permissionsUpdateListener);
    }
    render() {
        if (!this.meeting)
            return null;
        if (!this.canToggle)
            return;
        return (h(Host, { title: this.t('breakout_rooms') }, h("rtk-controlbar-button", { part: "controlbar-button", size: this.size, iconPack: this.iconPack, onClick: this.breakoutRoomToggle, icon: this.iconPack.breakout_rooms, label: this.t('breakout_rooms'), variant: this.variant })));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
    static get style() { return RtkBreakoutRoomsToggleStyle0; }
}, [1, "rtk-breakout-rooms-toggle", {
        "variant": [513],
        "meeting": [16],
        "states": [16],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "canToggle": [32]
    }, undefined, {
        "meeting": ["meetingChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomsToggle$1.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomsToggle$1.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomsToggle$1.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkBreakoutRoomsToggle$1.prototype, "t", void 0);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-breakout-rooms-toggle", "rtk-controlbar-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-breakout-rooms-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkBreakoutRoomsToggle$1);
            }
            break;
        case "rtk-controlbar-button":
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
    } });
}
defineCustomElement$1();

const RtkBreakoutRoomsToggle = RtkBreakoutRoomsToggle$1;
const defineCustomElement = defineCustomElement$1;

export { RtkBreakoutRoomsToggle, defineCustomElement };
