import { r as registerInstance, c as createEvent, h, H as Host } from './index-c1fb98bb.js';
import { e as defaultIconPack, h as useLanguage } from './ui-store-0098d5c6.js';
import { S as SyncWithStore } from './index-914449da.js';

const rtkFileDropzoneCss = "#dropzone{position:absolute;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);z-index:10;display:none;flex-direction:column;align-items:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}#dropzone.active{display:flex;animation:0.2s slide-up ease-in}";
const RtkFileDropzoneStyle0 = rtkFileDropzoneCss;

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
const RtkFileDropzone = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.onDropCallback = createEvent(this, "dropCallback", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.dropzoneActivated = false;
    }
    connectedCallback() {
        if (!this.hostEl)
            throw new Error('hostEl prop is required');
        this.hostEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropzoneActivated = true;
        });
        this.hostEl.addEventListener('dragleave', () => {
            this.dropzoneActivated = false;
        });
        this.hostEl.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropzoneActivated = false;
            this.onDropCallback.emit(e);
        });
    }
    render() {
        return (h(Host, { key: 'b48025cbb3461f9eb95eb3731d3cf0e0b7c370c7' }, h("div", { key: '00112e25f54a6b0a1c66530abcf232bf553d02d2', id: "dropzone", class: { active: this.dropzoneActivated }, part: "dropzone" }, h("rtk-icon", { key: '57b13d941c10854e3144d6107135e610734ed9f1', icon: this.iconPack.attach }), h("p", { key: '5f803ce1f2938255b865a6b905658463f6870060' }, this.t('chat.send_attachment')))));
    }
};
__decorate([
    SyncWithStore()
], RtkFileDropzone.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkFileDropzone.prototype, "t", void 0);
RtkFileDropzone.style = RtkFileDropzoneStyle0;

export { RtkFileDropzone as rtk_file_dropzone };
