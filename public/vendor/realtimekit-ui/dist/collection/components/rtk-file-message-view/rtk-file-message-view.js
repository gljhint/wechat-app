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
import { h } from "@stencil/core";
import { defaultIconPack } from "../../exports";
import { sanitizeLink } from "../../utils/string";
import { SyncWithStore } from "../../utils/sync-with-store";
import { downloadFile, getExtension, getFileSize } from "../../utils/file";
/**
 * A component which renders a file message.
 */
export class RtkFileMessageView {
    constructor() {
        /** Icon pack */
        this.iconPack = defaultIconPack;
    }
    render() {
        return (h("div", { key: 'd2cbeddc138f81c05da1656ee7f59c170e83bd1e', class: "file" }, h("rtk-button", { key: 'b0ee90c3493c24e938b6ea88a317c642e4afc003', variant: "secondary", kind: "icon", onClick: () => downloadFile(sanitizeLink(this.url), { name: this.name, fallbackName: 'file' }), part: "button" }, h("rtk-icon", { key: 'c1b25c655b5c87bf95948abfa461f8b58ff79195', icon: this.iconPack.download })), h("div", { key: 'c961a8ce93d4ff4405590787a88b5a9bbdbf56ab', class: "file-data" }, h("div", { key: 'bd178354d166c7816d6fabb72f7bba70fd711415', class: "name" }, this.name), h("div", { key: '59a791ae9f94a13b4005a0d8f79d09687fe3fc4c', class: "file-data-split" }, h("div", { key: 'b31421fdf786d92eed0decec9d3b247530413aa9', class: "ext" }, getExtension(this.name)), h("span", { key: '7a0a2a188b3e0b6bee0cf54d3afe29c2454788bb', class: "divider" }), h("div", { key: 'b217b87fa0737732aae10662b82d337d7258e6d7', class: "size" }, getFileSize(this.size))))));
    }
    static get is() { return "rtk-file-message-view"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rtk-file-message-view.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rtk-file-message-view.css"]
        };
    }
    static get properties() {
        return {
            "name": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Name of the file"
                },
                "getter": false,
                "setter": false,
                "attribute": "name",
                "reflect": false
            },
            "size": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size of the file"
                },
                "getter": false,
                "setter": false,
                "attribute": "size",
                "reflect": false
            },
            "url": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Url of the file"
                },
                "getter": false,
                "setter": false,
                "attribute": "url",
                "reflect": false
            },
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
], RtkFileMessageView.prototype, "iconPack", void 0);
