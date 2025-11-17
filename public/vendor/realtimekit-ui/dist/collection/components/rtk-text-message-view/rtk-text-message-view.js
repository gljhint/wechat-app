import { h } from "@stencil/core";
import { hasOnlyEmojis } from "../../utils/string";
/**
 * A component which renders a text message from chat.
 */
export class RtkTextMessageView {
    constructor() {
        /** Renders text as markdown (default = true) */
        this.isMarkdown = false;
    }
    render() {
        return (h("p", { key: '3a9c21d67487ea40760163f0dd69152454049063', class: { text: true, emoji: hasOnlyEmojis(this.text) } }, this.isMarkdown ? h("rtk-markdown-view", { text: this.text }) : this.text));
    }
    static get is() { return "rtk-text-message-view"; }
    static get originalStyleUrls() {
        return {
            "$": ["rtk-text-message-view.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rtk-text-message-view.css"]
        };
    }
    static get properties() {
        return {
            "text": {
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
                    "text": "Text message"
                },
                "getter": false,
                "setter": false,
                "attribute": "text",
                "reflect": false
            },
            "isMarkdown": {
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
                    "text": "Renders text as markdown (default = true)"
                },
                "getter": false,
                "setter": false,
                "attribute": "is-markdown",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
}
