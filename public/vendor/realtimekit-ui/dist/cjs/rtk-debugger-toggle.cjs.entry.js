'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');

const rtkDebuggerToggleCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkDebuggerToggleStyle0 = rtkDebuggerToggleCss;

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
const RtkDebuggerToggle = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Language */
        this.t = uiStore.useLanguage();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
    }
    toggleDebugger() {
        var _a;
        this.stateUpdate.emit({
            activeDebugger: !((_a = this.states) === null || _a === void 0 ? void 0 : _a.activeDebugger),
            activeMoreMenu: false,
        });
    }
    render() {
        return (index$1.h(index$1.Host, { key: '5675d28a2da23df6c54e79827b0adf37ef128cd9', title: this.t('Troubleshooting') }, index$1.h("rtk-controlbar-button", { key: 'b8e16bbfb77fe9c4d50e872ed4eaecf351816a98', size: this.size, iconPack: this.iconPack, onClick: () => this.toggleDebugger(), icon: this.iconPack.debug, label: this.t('Troubleshooting'), variant: this.variant })));
    }
};
__decorate([
    index.SyncWithStore()
], RtkDebuggerToggle.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkDebuggerToggle.prototype, "states", void 0);
__decorate([
    index.SyncWithStore()
], RtkDebuggerToggle.prototype, "t", void 0);
__decorate([
    index.SyncWithStore()
], RtkDebuggerToggle.prototype, "iconPack", void 0);
RtkDebuggerToggle.style = RtkDebuggerToggleStyle0;

exports.rtk_debugger_toggle = RtkDebuggerToggle;
