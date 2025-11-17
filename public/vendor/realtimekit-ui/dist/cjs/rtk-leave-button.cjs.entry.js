'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');

const rtkLeaveButtonCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkLeaveButtonStyle0 = rtkLeaveButtonCss;

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
const RtkLeaveButton = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.leave = () => {
            this.stateUpdate.emit({ activeLeaveConfirmation: true });
        };
    }
    render() {
        const text = this.t('leave');
        return (index$1.h(index$1.Host, { key: '9a760243cdb8a409f96b2e44b07e84495ecf8ba6', label: text }, index$1.h("rtk-controlbar-button", { key: '5a45791756d7e448493b4968876820230d7ce81f', size: this.size, iconPack: this.iconPack, class: "leave red-icon", onClick: this.leave, icon: this.iconPack.call_end, label: text, variant: this.variant, part: "controlbar-button" })));
    }
};
__decorate([
    index.SyncWithStore()
], RtkLeaveButton.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkLeaveButton.prototype, "t", void 0);
RtkLeaveButton.style = RtkLeaveButtonStyle0;

exports.rtk_leave_button = RtkLeaveButton;
