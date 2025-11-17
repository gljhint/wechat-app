'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');

const rtkAiToggleCss = ":host{display:block}:host([data-hidden]){display:none}";
const RtkAiToggleStyle0 = rtkAiToggleCss;

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
const RtkAiToggle = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.aiActive = false;
    }
    statesChanged(s) {
        const states = s;
        this.aiActive = states.activeAI;
    }
    toggleAI() {
        var _a;
        this.aiActive = !((_a = this.states) === null || _a === void 0 ? void 0 : _a.activeAI);
        this.stateUpdate.emit({
            activeAI: this.aiActive,
            activeMoreMenu: false,
            activeSidebar: false,
        });
    }
    render() {
        var _a, _b;
        if (!this.meeting)
            return null;
        const text = this.t('ai.meeting_ai');
        if (!((_b = (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.permissions).transcriptionEnabled) {
            return index$1.h(index$1.Host, { "data-hidden": true });
        }
        return (index$1.h(index$1.Host, { title: text }, index$1.h("rtk-controlbar-button", { part: "controlbar-button", size: this.size, iconPack: this.iconPack, class: { active: this.aiActive }, onClick: () => this.toggleAI(), icon: this.iconPack.meeting_ai, label: text, variant: this.variant, brandIcon: true })));
    }
    static get watchers() { return {
        "states": ["statesChanged"]
    }; }
};
__decorate([
    index.SyncWithStore()
], RtkAiToggle.prototype, "states", void 0);
__decorate([
    index.SyncWithStore()
], RtkAiToggle.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkAiToggle.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkAiToggle.prototype, "t", void 0);
RtkAiToggle.style = RtkAiToggleStyle0;

exports.rtk_ai_toggle = RtkAiToggle;
