import { r as registerInstance, c as createEvent, h, H as Host } from './index-c1fb98bb.js';
import { e as defaultIconPack, h as useLanguage } from './ui-store-0098d5c6.js';
import { S as SyncWithStore } from './index-914449da.js';

const rtkSettingsToggleCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{display:block}";
const RtkSettingsToggleStyle0 = rtkSettingsToggleCss;

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
const RtkSettingsToggle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        /** Variant */
        this.variant = 'button';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
    }
    toggleSettings() {
        const updatePartial = { activeSettings: true, activeMoreMenu: false };
        this.states = Object.assign(Object.assign({}, this.states), updatePartial);
        this.stateUpdate.emit(updatePartial);
    }
    render() {
        const text = this.t('settings');
        return (h(Host, { key: 'a35e91bc92a802afd3eaf6f3211d1db7693413d1', title: text }, h("rtk-controlbar-button", { key: '03fb21e343891459262180be282065331a6140a3', part: "controlbar-button", size: this.size, iconPack: this.iconPack, onClick: () => this.toggleSettings(), icon: this.iconPack.settings, label: text, variant: this.variant })));
    }
};
__decorate([
    SyncWithStore()
], RtkSettingsToggle.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkSettingsToggle.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkSettingsToggle.prototype, "t", void 0);
RtkSettingsToggle.style = RtkSettingsToggleStyle0;

export { RtkSettingsToggle as rtk_settings_toggle };
