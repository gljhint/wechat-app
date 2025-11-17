import { Host, h } from "@stencil/core";
const parseIcon = (icon) => {
    try {
        return JSON.parse(icon);
    }
    catch (e) {
        return icon;
    }
};
/**
 * An icon component which accepts an svg string and renders it.
 */
export class RtkIcon {
    constructor() {
        /** Icon variant */
        this.variant = 'primary';
        /** Size */
        this.size = 'lg';
    }
    render() {
        return (h(Host, { key: 'fbacb1ee3dd4c1ca7aa612f08e938601df73036c' }, h("div", { key: '04c026967cb7aa3acb3fba09fcf5b0d33f45e2b0', class: "icon-wrapper", innerHTML: parseIcon(this.icon), part: "wrapper" })));
    }
    static get is() { return "rtk-icon"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rtk-icon.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rtk-icon.css"]
        };
    }
    static get properties() {
        return {
            "icon": {
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
                    "text": "Icon"
                },
                "getter": false,
                "setter": false,
                "attribute": "icon",
                "reflect": false
            },
            "variant": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "IconVariant",
                    "resolved": "\"danger\" | \"primary\" | \"secondary\"",
                    "references": {
                        "IconVariant": {
                            "location": "local",
                            "path": "/home/runner/work/realtimekit-ui/realtimekit-ui/packages/core/src/components/rtk-icon/rtk-icon.tsx",
                            "id": "src/components/rtk-icon/rtk-icon.tsx::IconVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon variant"
                },
                "getter": false,
                "setter": false,
                "attribute": "variant",
                "reflect": true,
                "defaultValue": "'primary'"
            },
            "size": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Size",
                    "resolved": "\"lg\" | \"md\" | \"sm\" | \"xl\"",
                    "references": {
                        "Size": {
                            "location": "import",
                            "path": "../../exports",
                            "id": "src/exports.ts::Size"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Size"
                },
                "getter": false,
                "setter": false,
                "attribute": "size",
                "reflect": true,
                "defaultValue": "'lg'"
            }
        };
    }
}
