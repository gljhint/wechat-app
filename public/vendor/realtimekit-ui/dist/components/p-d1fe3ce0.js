import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$1 } from './p-1391bef0.js';

const rtkMuteAllConfirmationCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block;-webkit-user-select:none;-moz-user-select:none;user-select:none}.leave-modal{position:relative;display:flex;flex-direction:column;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));padding:var(--rtk-space-4, 16px);color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.leave-modal .header h2{margin:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-3, 12px)}.leave-modal .content{font-size:14px}.leave-message p{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px)}.leave-meeting{display:flex;flex-direction:row;justify-content:space-between;gap:var(--rtk-space-2, 8px)}.leave-meeting rtk-button{flex:1 1 0%}.end-meeting{margin-top:var(--rtk-space-2, 8px)}.message{margin-bottom:var(--rtk-space-4, 16px)}label{display:flex;align-items:center}input[type='checkbox']{margin-right:var(--rtk-space-2, 8px);accent-color:rgb(var(--rtk-colors-brand-500, 33 96 253))}";
const RtkMuteAllConfirmationStyle0 = rtkMuteAllConfirmationCss;

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
const RtkMuteAllConfirmation = /*@__PURE__*/ proxyCustomElement(class RtkMuteAllConfirmation extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.allowUnmute = true;
        this.onClose = () => {
            this.stateUpdate.emit({ activeMuteAllConfirmation: false });
        };
        this.onMuteAll = () => {
            var _a;
            (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.participants.disableAllAudio(this.allowUnmute);
            this.onClose();
        };
    }
    render() {
        return (h(Host, { key: '6f260e3a10d229942b3903afc721d30b6e6494a7' }, h("div", { key: '9bdf56a9eee7b0a172f4b29b619632817ccc1212', class: "leave-modal" }, h("div", { key: 'a68cd8b46f9727a2ced5e505651e65bf1a1fb1f2', class: "header" }, h("h2", { key: '202529f47bd59dd2df1a7971a33cc706070705d9', class: "title" }, this.t('mute_all.header'))), h("p", { key: '40569f7f09c9f370ccd117590113545a4a083e40', class: "message" }, this.t('mute_all.description')), h("div", { key: 'f6a19e3fcdc7ca1c8e8d443cb705dcd27b55398e', class: "content" }, h("div", { key: '979e79f3f20c60b1e1474d7c37b96392809078f9', class: "leave-meeting" }, h("rtk-button", { key: 'a717271acf30ebf16e22cfbc23b7e7120662754c', variant: "secondary", title: this.t('close'), onClick: this.onClose }, this.t('cancel')), h("rtk-button", { key: '6b425563d4f0c4db28e9201c87d0bd9aa71399a8', variant: "danger", title: this.t('mute_all'), onClick: this.onMuteAll }, this.t('mute_all')))))));
    }
    static get style() { return RtkMuteAllConfirmationStyle0; }
}, [1, "rtk-mute-all-confirmation", {
        "meeting": [16],
        "states": [16],
        "iconPack": [16],
        "t": [16],
        "allowUnmute": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkMuteAllConfirmation.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkMuteAllConfirmation.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkMuteAllConfirmation.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkMuteAllConfirmation.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-mute-all-confirmation", "rtk-button"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-mute-all-confirmation":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMuteAllConfirmation);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkMuteAllConfirmation as R, defineCustomElement as d };
