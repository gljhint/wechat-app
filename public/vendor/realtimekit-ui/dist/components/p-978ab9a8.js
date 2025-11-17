import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';

const rtkTranscriptCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{pointer-events:none;display:block;color:rgb(var(--rtk-colors-text-1000, 255 255 255));display:flex;justify-content:center;vertical-align:middle;animation:show 0.4s ease;transition:0.4s;z-index:5;width:100%}.ctr{box-sizing:border-box;display:inline-flex;height:100%;align-items:center;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-3, 12px);-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);--tw-shadow-color:rgb(var(--rtk-colors-background-1000, 8 8 8));--tw-shadow:var(--tw-shadow-colored);pointer-events:auto;padding:var(--rtk-space-3, 12px);overflow:auto;max-width:50%}.message{margin:var(--rtk-space-0, 0px);display:inline-block;justify-content:center;max-width:100%;text-wrap:wrap;line-height:1.5rem}.message .name{font-weight:bold}:host(.exit){animation:exit 0.4s ease}@keyframes show{0%{opacity:0;transform:translateY(120px)}100%{opacity:1;transform:translateY(0px)}}@keyframes exit{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-120px)}}:host([size='sm']){font-size:14px}";
const RtkTranscriptStyle0 = rtkTranscriptCss;

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
const RtkTranscript = /*@__PURE__*/ proxyCustomElement(class RtkTranscript extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dismiss = createEvent(this, "rtkTranscriptDismiss", 7);
        /** Language */
        this.t = useLanguage();
    }
    connectedCallback() {
        this.transcriptChanged(this.transcript);
    }
    transcriptChanged(transcript, oldTranscript) {
        if ((oldTranscript === null || oldTranscript === void 0 ? void 0 : oldTranscript.renderedId) === transcript.renderedId &&
            (oldTranscript === null || oldTranscript === void 0 ? void 0 : oldTranscript.transcript) === transcript.transcript) {
            return;
        }
        clearTimeout(this.timeout);
        if (!(transcript === null || transcript === void 0 ? void 0 : transcript.name) || !(transcript === null || transcript === void 0 ? void 0 : transcript.transcript)) {
            return;
        }
        const { id, renderedId } = transcript;
        this.timeout = setTimeout(() => {
            this.dismiss.emit({ id, renderedId });
        }, 10000);
    }
    render() {
        return (h(Host, { key: 'f114d024507ae77ac2597ecd060e3ff44ff14b62' }, h("div", { key: '0a2b1de3c21d77fcf73a0e025e8faa82b61ac23e', class: "ctr" }, h("p", { key: 'eee54f37929772f547113c899cbbcd89e451f64d', class: "message" }, h("span", { key: '3599abf0271f4847d0e19629c9966b02a168bdb8', class: "name" }, this.transcript.name), ": ", this.transcript.transcript))));
    }
    static get watchers() { return {
        "transcript": ["transcriptChanged"]
    }; }
    static get style() { return RtkTranscriptStyle0; }
}, [1, "rtk-transcript", {
        "transcript": [16],
        "t": [16],
        "timeout": [32]
    }, undefined, {
        "transcript": ["transcriptChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkTranscript.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-transcript"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-transcript":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkTranscript);
            }
            break;
    } });
}
defineCustomElement();

export { RtkTranscript as R, defineCustomElement as d };
