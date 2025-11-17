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
import { Host, h } from "@stencil/core";
import { elapsedDuration, formatDateTime } from "../../utils/date";
import { SyncWithStore } from "../../utils/sync-with-store";
import { defaultIconPack } from "../../exports";
export class RtkMessageView {
    constructor() {
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
        this.iconPack = defaultIconPack;
    }
    renderActions() {
        return (h("rtk-menu", { placement: "top-end", offset: 1 }, h("button", { slot: "trigger", class: "actions" }, h("rtk-icon", { icon: this.iconPack.chevron_down })), h("rtk-menu-list", null, this.actions.map((action) => (h("rtk-menu-item", { onClick: () => this.onAction.emit(action.id) }, action.icon && h("rtk-icon", { icon: action.icon, slot: "start" }), action.label))))));
    }
    render() {
        return (h(Host, { key: '9fafe4370eee525631023ecde39b3293059e8c22' }, h("div", { key: '1718981905d4458d0862c34c3c342f7335f0921b', class: { 'message-wrapper': true, [this.viewType]: true } }, !this.hideAvatar && (h("aside", { key: 'c6ea0c46283a7faa4bb937cb4196e2e1d548c721', class: "avatar", part: "avatar" }, h("rtk-avatar", { key: 'e3181a831b75b5c79f212da64076dbf6b47fecca', participant: { name: this.authorName, picture: this.avatarUrl }, size: "sm" }))), h("div", { key: '5565b5711055f1cd543cfaa36c03789b82fb94fa', class: "message", part: "message" }, !this.hideAuthorName && h("div", { key: '613098d825ba1c33aaca53579c883a306ed1239d', class: "header" }, this.authorName), h("div", { key: '166dd3e4fb33876cd74f94a7ac193064e8778f81', class: { body: true, bubble: this.variant === 'bubble' } }, h("slot", { key: 'd04e722b66c4d7cb7c20952a9e7c70d048e66410' }), !this.hideMetadata && !!this.time && (h("div", { key: 'f12d8c9dd8320202a6906c10298d3357aff5d762', class: "metadata", title: formatDateTime(this.time) }, elapsedDuration(this.time, new Date(Date.now())))), this.actions.length !== 0 && this.renderActions())))));
    }
    static get is() { return "rtk-message-view"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rtk-message-view.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rtk-message-view.css"]
        };
    }
    static get properties() {
        return {
            "actions": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "MessageAction[]",
                    "resolved": "MessageAction[]",
                    "references": {
                        "MessageAction": {
                            "location": "local",
                            "path": "/home/runner/work/realtimekit-ui/realtimekit-ui/packages/core/src/components/rtk-message-view/rtk-message-view.tsx",
                            "id": "src/components/rtk-message-view/rtk-message-view.tsx::MessageAction"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "List of actions to show in menu"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'plain' | 'bubble'",
                    "resolved": "\"bubble\" | \"plain\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Appearance"
                },
                "getter": false,
                "setter": false,
                "attribute": "variant",
                "reflect": false,
                "defaultValue": "'bubble'"
            },
            "viewType": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'incoming' | 'outgoing'",
                    "resolved": "\"incoming\" | \"outgoing\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Render"
                },
                "getter": false,
                "setter": false,
                "attribute": "view-type",
                "reflect": false,
                "defaultValue": "'outgoing'"
            },
            "avatarUrl": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Avatar image url"
                },
                "getter": false,
                "setter": false,
                "attribute": "avatar-url",
                "reflect": false
            },
            "hideAvatar": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hides avatar"
                },
                "getter": false,
                "setter": false,
                "attribute": "hide-avatar",
                "reflect": false,
                "defaultValue": "false"
            },
            "authorName": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Author display label"
                },
                "getter": false,
                "setter": false,
                "attribute": "author-name",
                "reflect": false
            },
            "hideAuthorName": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hides author display label"
                },
                "getter": false,
                "setter": false,
                "attribute": "hide-author-name",
                "reflect": false,
                "defaultValue": "false"
            },
            "hideMetadata": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hides metadata (time)"
                },
                "getter": false,
                "setter": false,
                "attribute": "hide-metadata",
                "reflect": false,
                "defaultValue": "false"
            },
            "time": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Date",
                    "resolved": "Date",
                    "references": {
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Time when message was sent"
                },
                "getter": false,
                "setter": false
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
    static get events() {
        return [{
                "method": "onAction",
                "name": "action",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "action event"
                },
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                }
            }];
    }
}
__decorate([
    SyncWithStore()
], RtkMessageView.prototype, "iconPack", void 0);
