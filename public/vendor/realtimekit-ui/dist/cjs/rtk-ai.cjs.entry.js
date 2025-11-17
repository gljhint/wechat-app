'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');

const rtkAiCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;box-sizing:border-box;display:flex;width:100%;max-width:var(--rtk-space-80, 320px);flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));overflow:hidden}.close{position:absolute;top:var(--rtk-space-3, 12px);left:var(--rtk-space-3, 12px)}.title{margin-left:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-4, 16px);margin-bottom:var(--rtk-space-2, 8px);-webkit-user-select:none;-moz-user-select:none;user-select:none;padding:var(--rtk-space-0, 0px);text-align:center;font-size:14px;font-weight:400}rtk-ai-transcriptions{flex:1}:host([view='sidebar']){margin-left:var(--rtk-space-2, 8px);margin-right:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-lg, 12px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity))}:host([view='full-screen']){position:absolute;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);z-index:50;max-width:100%;border:none}";
const RtkAiStyle0 = rtkAiCss;

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
const RtkAi = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** View type */
        this.view = 'sidebar';
        this.close = () => {
            this.stateUpdate.emit({ activeAI: false });
        };
    }
    connectedCallback() {
        this.viewChanged(this.view);
    }
    disconnectedCallback() {
        this.keydownListener && document.removeEventListener('keydown', this.keydownListener);
    }
    viewChanged(view) {
        if (view === 'full-screen') {
            this.keydownListener = (e) => {
                if (e.key === 'Escape') {
                    this.close();
                }
            };
            document.addEventListener('keydown', this.keydownListener);
        }
    }
    render() {
        var _a, _b, _c;
        if (!this.meeting)
            return null;
        if (!((_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.permissions).transcriptionEnabled ||
            !((_c = this.states) === null || _c === void 0 ? void 0 : _c.activeAI)) {
            return null;
        }
        const defaults = {
            meeting: this.meeting,
            config: this.config,
            states: this.states,
            size: this.size,
            t: this.t,
            iconPack: this.iconPack,
        };
        return (index$1.h(index$1.Host, null, index$1.h("h3", { class: "title" }, this.t('ai.transcriptions')), index$1.h("rtk-button", { variant: "ghost", kind: "icon", class: "close", onClick: this.close, "aria-label": this.t('close') }, index$1.h("rtk-icon", { icon: this.iconPack.dismiss })), index$1.h("rtk-ai-transcriptions", Object.assign({}, defaults))));
    }
    static get watchers() { return {
        "view": ["viewChanged"]
    }; }
};
__decorate([
    index.SyncWithStore()
], RtkAi.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkAi.prototype, "states", void 0);
__decorate([
    index.SyncWithStore()
], RtkAi.prototype, "config", void 0);
__decorate([
    index.SyncWithStore()
], RtkAi.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkAi.prototype, "t", void 0);
RtkAi.style = RtkAiStyle0;

exports.rtk_ai = RtkAi;
