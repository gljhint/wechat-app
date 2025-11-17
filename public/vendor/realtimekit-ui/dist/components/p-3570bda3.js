import { p as proxyCustomElement, H, h } from './p-c3592601.js';
import { h as hasOnlyEmojis } from './p-338c7261.js';
import { d as defineCustomElement$1 } from './p-f5f0b499.js';

const rtkTextMessageViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.text{word-break:break-word;display:block;overflow-wrap:break-word;line-height:1.375}.text.emoji{font-size:24px}";
const RtkTextMessageViewStyle0 = rtkTextMessageViewCss;

const RtkTextMessageView = /*@__PURE__*/ proxyCustomElement(class RtkTextMessageView extends H {
    constructor() {
        super();
        this.__registerHost();
        /** Renders text as markdown (default = true) */
        this.isMarkdown = false;
    }
    render() {
        return (h("p", { key: '3a9c21d67487ea40760163f0dd69152454049063', class: { text: true, emoji: hasOnlyEmojis(this.text) } }, this.isMarkdown ? h("rtk-markdown-view", { text: this.text }) : this.text));
    }
    static get style() { return RtkTextMessageViewStyle0; }
}, [0, "rtk-text-message-view", {
        "text": [1],
        "isMarkdown": [4, "is-markdown"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-text-message-view", "rtk-markdown-view"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-text-message-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkTextMessageView);
            }
            break;
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkTextMessageView as R, defineCustomElement as d };
