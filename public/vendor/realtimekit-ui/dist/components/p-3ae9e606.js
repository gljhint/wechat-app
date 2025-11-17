import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { T as TextMessageView } from './p-a2f4f9e3.js';
import { d as defineCustomElement$2 } from './p-1391bef0.js';
import { d as defineCustomElement$1 } from './p-3b29dda1.js';

const rtkNotificationCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{pointer-events:none;display:block;height:var(--rtk-space-10, 40px);color:rgb(var(--rtk-colors-text-1000, 255 255 255));animation:show 0.4s ease;transition:0.4s;z-index:100}.ctr{box-sizing:border-box;display:inline-flex;height:100%;min-width:var(--rtk-space-40, 160px);align-items:center;padding-left:var(--rtk-space-3, 12px);padding-right:var(--rtk-space-2, 8px);-webkit-user-select:none;-moz-user-select:none;user-select:none;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-600, 60 60 60) / var(--tw-bg-opacity));--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);--tw-shadow-color:rgb(var(--rtk-colors-background-1000, 8 8 8));--tw-shadow:var(--tw-shadow-colored);pointer-events:auto}img{margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-0, 0px);width:var(--rtk-space-0, 0px);border-radius:9999px}img.loaded{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px)}.message{margin-right:var(--rtk-space-2, 8px);max-width:var(--rtk-space-72, 288px) !important;font-size:14px !important;overflow:hidden !important;display:-webkit-box !important;-webkit-box-orient:vertical !important;-webkit-line-clamp:2 !important}.message p{margin:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-1, 4px)}.message blockquote{display:none}rtk-icon.icon{margin-right:var(--rtk-space-2, 8px);height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88))}button.dismiss{display:flex;height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px);align-items:center;justify-content:center;border-width:var(--rtk-border-width-none, 0);border-style:none;padding:var(--rtk-space-0, 0px);border-radius:var(--rtk-border-radius-sm, 4px);background-color:transparent;color:rgb(var(--rtk-colors-text-600, 255 255 255 / 0.52));outline-width:1px;outline-color:rgb(var(--rtk-colors-text-1000, 255 255 255))}button.dismiss:hover{cursor:pointer;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}button.dismiss:focus-visible{outline-style:solid}button.dismiss{transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.dismiss rtk-icon{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px)}rtk-button{border-radius:var(--rtk-border-radius-sm, 4px)}.right{margin-left:auto;display:flex;align-items:center;gap:var(--rtk-space-2, 8px)}:host(.exit){animation:exit 0.4s ease}@keyframes show{0%{opacity:0;transform:translateX(-120px)}100%{opacity:1;transform:translateX(0px)}}@keyframes exit{0%{opacity:1;transform:translateX(0)}100%{opacity:0;transform:translateX(-120px)}}:host([size='sm']){font-size:14px}";
const RtkNotificationStyle0 = rtkNotificationCss;

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
const RtkNotification = /*@__PURE__*/ proxyCustomElement(class RtkNotification extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.dismiss = createEvent(this, "rtkNotificationDismiss", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.imageState = 'loading';
    }
    connectedCallback() {
        this.notificationChanged(this.notification);
    }
    pausedChanged(paused) {
        if (paused) {
            clearTimeout(this.timeout);
        }
        else {
            this.notificationChanged(this.notification);
        }
    }
    notificationChanged(notification) {
        if (notification != null && typeof notification.duration === 'number' && !this.paused) {
            this.timeout = window.setTimeout(() => {
                this.dismiss.emit(notification.id);
            }, notification.duration);
        }
    }
    render() {
        var _a;
        return (h(Host, { key: '60c06bbf91a415227daa6df5e33ce70f70b9e96a' }, h("div", { key: '88b3028fbab2ae480d9b56169be54d7be88f283a', class: "ctr" }, this.notification.icon != null && (h("rtk-icon", { key: '2082950cbd422100eaae181089b459a228edb5b2', class: "icon", icon: this.notification.icon, variant: (_a = this.notification.iconVariant) !== null && _a !== void 0 ? _a : 'primary' })), this.notification.image != null &&
            this.notification.icon == null &&
            this.imageState !== 'errored' && (h("img", { key: '56e7d906bb2daf5ddce6b143ffa74a47d602ca70', src: this.notification.image, class: { loaded: this.imageState === 'loaded' }, onLoad: () => (this.imageState = 'loaded'), onError: () => (this.imageState = 'errored') })), h("p", { key: '980db1c29942c51de04eef62c519ff20402c639e', class: "message" }, h(TextMessageView, { key: '6b59afd62dcf6671d056ed424146c9c4c1e1bead', message: this.notification.message })), h("div", { key: 'a4399741c18093e46be3726f3514d8e8a5682ab3', class: "right" }, this.notification.button != null && (h("rtk-button", { key: 'a20046c85de2c3ee5cd7b6814c84e52a027e0cfc', size: "sm", variant: this.notification.button.variant, onClick: () => this.notification.button.onClick() }, this.notification.button.text)), h("button", { key: '83d7d13c98c68f6049321d5d0c573ea2eccf65f8', onClick: () => this.dismiss.emit(this.notification.id), class: "dismiss" }, h("rtk-icon", { key: '5a17a700a54172a10cd2398dd38853bd0c337215', "aria-label": this.t('dismiss'), icon: this.iconPack.dismiss }))))));
    }
    static get watchers() { return {
        "paused": ["pausedChanged"],
        "notification": ["notificationChanged"]
    }; }
    static get style() { return RtkNotificationStyle0; }
}, [1, "rtk-notification", {
        "notification": [16],
        "paused": [4],
        "size": [513],
        "iconPack": [16],
        "t": [16],
        "imageState": [32]
    }, undefined, {
        "paused": ["pausedChanged"],
        "notification": ["notificationChanged"]
    }]);
__decorate([
    SyncWithStore()
], RtkNotification.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkNotification.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-notification", "rtk-button", "rtk-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-notification":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkNotification);
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

export { RtkNotification as R, defineCustomElement as d };
