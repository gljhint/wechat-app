import { p as proxyCustomElement, H, h, e as Host } from './p-c3592601.js';
import { s as shorten, f as formatName } from './p-338c7261.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkNameTagCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:inline-flex;-webkit-user-select:none;-moz-user-select:none;user-select:none;align-items:center;padding-top:var(--rtk-space-1, 4px);padding-bottom:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-1\\.5, 6px);padding-right:var(--rtk-space-1\\.5, 6px);font-size:14px;border-radius:var(--rtk-border-radius-sm, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}span.name{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}::slotted(rtk-audio-visualizer[slot='start']){margin-right:var(--rtk-space-1\\.5, 6px)}::slotted(rtk-audio-visualizer[slot='end']){margin-left:var(--rtk-space-1\\.5, 6px)}:host([size='sm']){font-size:12px;--tw-bg-opacity:0.6}:host([variant='text']){background-color:transparent;padding:var(--rtk-space-0, 0px)}";
const RtkNameTagStyle0 = rtkNameTagCss;

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
const RtkNameTag = /*@__PURE__*/ proxyCustomElement(class RtkNameTag extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        /** Whether it is used in a screen share view */
        this.isScreenShare = false;
        /** Name tag variant */
        this.variant = 'default';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.length = 13;
    }
    sizeChanged(size) {
        this.length = size === 'sm' ? 8 : 13;
    }
    formatNameTag(name, isSelf) {
        return !this.isScreenShare
            ? isSelf
                ? `${shorten(name, this.length - 3)} (${this.t('you')})`
                : shorten(name, this.length)
            : isSelf
                ? `${this.t('screen')} - ${shorten(name, this.length - 3)} (${this.t('you')})`
                : `${this.t('screen')} - ${shorten(name, this.length)}`;
    }
    render() {
        var _a, _b, _c;
        const name = formatName(((_a = this.participant) === null || _a === void 0 ? void 0 : _a.name) || '');
        const isSelf = ((_b = this.participant) === null || _b === void 0 ? void 0 : _b.id) === ((_c = this.meeting) === null || _c === void 0 ? void 0 : _c.self.id);
        return (h(Host, { key: 'd42b26fe39b4a8643e32b420ec6cded7450dde20', title: name }, h("slot", { key: '5235adedfaef8eb0b99d46f9b6e89efe40e53f68', name: "start" }), h("span", { key: 'bd15296809e2caf334c6786e45e3b751633ff001', class: "name" }, this.formatNameTag(name, isSelf)), h("slot", { key: '6f5a39cfecf90b9d449b08274eb20b450bcba196', name: "end" })));
    }
    static get watchers() { return {
        "size": ["sizeChanged"]
    }; }
    static get style() { return RtkNameTagStyle0; }
}, [1, "rtk-name-tag", {
        "participant": [16],
        "meeting": [16],
        "size": [513],
        "isScreenShare": [4, "is-screen-share"],
        "variant": [513],
        "iconPack": [16],
        "t": [16],
        "length": [32]
    }, undefined, {
        "size": ["sizeChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkNameTag.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkNameTag.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkNameTag.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-name-tag"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-name-tag":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkNameTag);
            }
            break;
    } });
}
defineCustomElement();

export { RtkNameTag as R, defineCustomElement as d };
