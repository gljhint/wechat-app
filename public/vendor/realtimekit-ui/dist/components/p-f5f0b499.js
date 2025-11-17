import { p as proxyCustomElement, H, h } from './p-c3592601.js';
import { M as MAX_TEXT_LENGTH, p as parseRichText, e as extractReplyBlock, s as stripOutReplyBlock } from './p-0abe4b8a.js';

const rtkMarkdownViewCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{overflow-wrap:break-word}a{color:currentColor}.block-quote,blockquote{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px);--tw-border-spacing-x:1px;--tw-border-spacing-y:1px;border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-top-width:var(--rtk-border-width-none, 0);border-bottom-width:var(--rtk-border-width-none, 0);border-left-width:var(--rtk-border-width-md, 2px);border-right-width:var(--rtk-border-width-none, 0);border-style:solid;padding:var(--rtk-space-0\\.5, 2px);padding-left:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-sm, 4px);border-top-left-radius:var(--rtk-border-radius-none, 0);border-bottom-left-radius:var(--rtk-border-radius-none, 0)}pre{white-space:pre-wrap}";
const RtkMarkdownViewStyle0 = rtkMarkdownViewCss;

const RtkMarkdownView = /*@__PURE__*/ proxyCustomElement(class RtkMarkdownView extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** max length of text to render as markdown */
        this.maxLength = MAX_TEXT_LENGTH;
        this.restoreEmpty = (content, tag, renderCallback) => {
            return content.trim().length === 0 ? `${tag}${content}${tag}` : renderCallback(content);
        };
        this.renderLink = (content) => {
            return (h("a", { class: "link", href: content, target: "_blank", rel: "noopener noreferrer" }, content));
        };
        this.renderBold = (content) => {
            if (typeof content === 'string') {
                return this.restoreEmpty(content, '*', (c) => h("b", null, c));
            }
            return h("b", null, this.renderTokens(content));
        };
        this.renderItalic = (content) => {
            if (typeof content === 'string') {
                return this.restoreEmpty(content, '_', (c) => h("i", null, c));
            }
            return h("i", null, this.renderTokens(content));
        };
        this.renderStrikethrough = (content) => {
            if (typeof content === 'string') {
                return this.restoreEmpty(content, '~', (c) => h("s", null, c));
            }
            return h("b", null, this.renderTokens(content));
        };
        this.renderPlainText = (content) => {
            if (typeof content === 'string') {
                return content;
            }
            return h("p", null, this.renderTokens(content));
        };
        this.renderTokens = (tokens) => {
            return tokens.map((token) => {
                switch (token.type) {
                    case 'a':
                        if (typeof token.content === 'string') {
                            return this.renderLink(token.content);
                        }
                    case 'b':
                        return this.renderBold(token.content);
                    case 'i':
                        return this.renderItalic(token.content);
                    case 's':
                        return this.renderStrikethrough(token.content);
                    case 'q':
                        return h("span", { class: "block-quote" });
                    case 'plain_text':
                    default:
                        return this.renderPlainText(token.content);
                }
            });
        };
    }
    renderMessage(text) {
        let lines = text.split('\n');
        let isCodeBlock = false;
        if (lines[0] === '```' && lines[lines.length - 1] === '```') {
            isCodeBlock = true;
            lines = lines.slice(1, -1);
        }
        const message = lines.map((line) => {
            const tokens = parseRichText(line);
            return h("p", null, this.renderTokens(tokens));
        });
        if (isCodeBlock) {
            return h("pre", { style: { whiteSpace: 'pre', overflow: 'scroll' } }, lines.join('\n'));
        }
        return message;
    }
    render() {
        const slicedMessage = this.text.slice(0, this.maxLength);
        const withReply = extractReplyBlock(slicedMessage, true);
        const withoutReply = stripOutReplyBlock(slicedMessage);
        return (h("p", { key: '9544292f118f2c6975a807d6bcc2d307c70b2940' }, withReply.length !== 0 && h("blockquote", { key: '294bca9889738148fd51ecd8487d2d98b5adee4b' }, this.renderMessage(withReply)), withoutReply.length !== 0 && this.renderMessage(withoutReply)));
    }
    static get style() { return RtkMarkdownViewStyle0; }
}, [1, "rtk-markdown-view", {
        "text": [1],
        "maxLength": [2, "max-length"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-markdown-view"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMarkdownView);
            }
            break;
    } });
}
defineCustomElement();

export { RtkMarkdownView as R, defineCustomElement as d };
