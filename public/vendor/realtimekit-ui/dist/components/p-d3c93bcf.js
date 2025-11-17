import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { c as createDefaultConfig, e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { R as Render } from './p-60fdbd75.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkJoinStageCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host::-webkit-scrollbar{width:var(--rtk-space-1\\.5, 6px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity))}:host::-webkit-scrollbar-thumb{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}:host(.stage){box-sizing:border-box;display:block;width:512px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));padding:var(--rtk-space-6, 24px);-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:auto;border-radius:var(--rtk-border-radius-md, 8px);line-height:1.25}:host(.stage) rtk-participant-setup{display:flex;flex:1 1 0%;align-items:center;justify-content:space-around;margin-left:auto;margin-right:auto}:host(.stage) .container rtk-button{flex-grow:1;padding:var(--rtk-space-1, 4px);width:50%}:host(.stage) .container rtk-button:nth-child(1){margin-right:var(--rtk-space-1\\.5, 6px)}:host(.stage) .container rtk-button:nth-child(2){margin-left:var(--rtk-space-1\\.5, 6px)}:host(.stage) h2{font-size:24px;font-weight:500;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}:host(.stage) header{padding-left:var(--rtk-space-4, 16px);padding-right:var(--rtk-space-4, 16px)}:host(.stage) .summary{padding:var(--rtk-space-4, 16px)}.deny-access{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.container{width:100%;max-width:1080px;display:flex;flex:1 1 0%;align-items:center;justify-content:space-around}header{display:flex;align-items:center;justify-content:space-between}";
const RtkJoinStageStyle0 = rtkJoinStageCss;

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
const RtkJoinStage = /*@__PURE__*/ proxyCustomElement(class RtkJoinStage extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        this.joinStage = createEvent(this, "rtkJoinStage", 7);
        this.leaveStage = createEvent(this, "rtkLeaveStage", 7);
        /** UI Config */
        this.config = createDefaultConfig();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Content Config */
        this.dataConfig = {
            title: this.t('stage.join_title'),
            label: {
                accept: this.t('stage.join_confirm'),
                reject: this.t('stage.join_cancel'),
            },
            description: this.t('stage.join_summary'),
        };
        this.isLoading = false;
    }
    render() {
        var _a, _b;
        const defaults = {
            meeting: this.meeting,
            size: this.size,
            states: this.states,
            config: this.config,
            iconPack: this.iconPack,
            t: this.t,
        };
        return (h(Host, { key: 'b69a0a77d20a65a3112a393f33e4bc71564b16e1', class: { stage: true } }, h("header", { key: 'c9860a7bd9139b4ddb188f03f4efadcecf2d4259' }, h("h2", { key: '3222f6b149c9584205f355daecb4ebc7a2c329e3' }, this.dataConfig.title)), h(Render, { key: 'ae93b03e1ffeef036560de82bd1cfd678be9895a', element: "rtk-participant-setup", defaults: defaults, props: { participant: (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self, size: 'md' }, childProps: { participant: (_b = this.meeting) === null || _b === void 0 ? void 0 : _b.self, size: 'md' }, deepProps: true }), h("div", { key: 'b579bcd55ac13475d46a9b363e50a293b3f8ab87', class: "summary" }, this.dataConfig.description), h("div", { key: 'b7002bbcf12848243621dbd4e0e62d73ed5c7043', class: "container" }, h("rtk-button", { key: '240d7e4f50f89e6859be85917a325075d5d98628', variant: "secondary", onClick: () => this.leaveStage.emit(), title: this.dataConfig.label.reject }, this.dataConfig.label.reject), h("rtk-button", { key: 'c510ea579e35bf1302b6364065a2bb4eac43bec0', onClick: () => {
                if (this.isLoading)
                    return;
                this.isLoading = true;
                this.joinStage.emit();
            }, title: this.dataConfig.label.accept }, this.isLoading ? (h("rtk-icon", { icon: this.iconPack.spinner })) : (this.dataConfig.label.accept)))));
    }
    static get style() { return RtkJoinStageStyle0; }
}, [1, "rtk-join-stage", {
        "meeting": [16],
        "config": [16],
        "states": [16],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "dataConfig": [16],
        "isLoading": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkJoinStage.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkJoinStage.prototype, "config", void 0);
__decorate([
    SyncWithStore()
], RtkJoinStage.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkJoinStage.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkJoinStage.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-join-stage", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-join-stage":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkJoinStage);
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkJoinStage as R, defineCustomElement as d };
