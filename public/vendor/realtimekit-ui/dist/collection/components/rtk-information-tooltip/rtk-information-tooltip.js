var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h, Host } from "@stencil/core";
import { SyncWithStore } from "../../utils/sync-with-store";
import { defaultIconPack } from "../../exports";
export class RtkInformationTooltip {
    constructor() {
        /** Icon pack */
        this.iconPack = defaultIconPack;
    }
    render() {
        return (h(Host, { key: '71ecafbad168eb980530eb5e524f9b243ac49fc7' }, h("div", { key: 'beb675be20de89080d7fdeefb47367c5ab201a73', class: "tooltip-container" }, h("rtk-icon", { key: '8e135030eb60115c1f2a49ad71caedbd9e1b50e8', icon: this.iconPack.info, size: "sm" }), h("div", { key: '9b4c277f0d2c9311258c24f1001bf763936adde3', class: "tooltip" }, h("slot", { key: '66c6b7895cd23271cca393cc12dc075c1bf14923', name: "tootlip-text" })))));
    }
    static get is() { return "rtk-information-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rtk-information-tooltip.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rtk-information-tooltip.css"]
        };
    }
    static get properties() {
        return {
            "iconPack": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IconPack",
                    "resolved": "{ people: string; people_checked: string; chat: string; poll: string; participants: string; rocket: string; call_end: string; share: string; mic_on: string; mic_off: string; video_on: string; video_off: string; share_screen_start: string; share_screen_stop: string; share_screen_person: string; clock: string; dismiss: string; send: string; search: string; more_vertical: string; chevron_down: string; chevron_up: string; chevron_left: string; chevron_right: string; settings: string; wifi: string; speaker: string; speaker_off: string; download: string; full_screen_maximize: string; full_screen_minimize: string; copy: string; attach: string; image: string; emoji_multiple: string; image_off: string; disconnected: string; wand: string; recording: string; subtract: string; stop_recording: string; warning: string; pin: string; pin_off: string; spinner: string; breakout_rooms: string; add: string; shuffle: string; edit: string; delete: string; back: string; save: string; web: string; checkmark: string; spotlight: string; join_stage: string; leave_stage: string; pip_off: string; pip_on: string; signal_1: string; signal_2: string; signal_3: string; signal_4: string; signal_5: string; start_livestream: string; stop_livestream: string; viewers: string; debug: string; info: string; devices: string; horizontal_dots: string; ai_sparkle: string; meeting_ai: string; create_channel: string; create_channel_illustration: string; captionsOn: string; captionsOff: string; play: string; pause: string; fastForward: string; minimize: string; maximize: string; }",
                    "references": {
                        "IconPack": {
                            "location": "import",
                            "path": "../../exports",
                            "id": "src/exports.ts::IconPack"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon pack"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "defaultIconPack"
            }
        };
    }
}
__decorate([
    SyncWithStore()
], RtkInformationTooltip.prototype, "iconPack", void 0);
