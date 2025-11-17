import { p as proxyCustomElement, H, d as createEvent, w as writeTask, f as forceUpdate, h, e as Host } from './p-c3592601.js';
import { h as useLanguage, e as defaultIconPack } from './p-74e01969.js';
import './p-a83ccdbd.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { d as defineCustomElement$4 } from './p-4e9d44f6.js';
import { d as defineCustomElement$3 } from './p-1391bef0.js';
import { d as defineCustomElement$2 } from './p-3b29dda1.js';
import { d as defineCustomElement$1 } from './p-a59a9c97.js';

const rtkChannelCreatorCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));display:flex;flex-direction:column;width:var(--rtk-space-96, 384px);padding-left:var(--rtk-space-9, 36px);padding-right:var(--rtk-space-9, 36px);padding-top:var(--rtk-space-10, 40px);padding-bottom:var(--rtk-space-10, 40px)}header{margin-bottom:var(--rtk-space-8, 32px);display:flex;align-items:center;gap:var(--rtk-space-2, 8px);font-size:24px;font-weight:600}.channel-name-input{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;padding:var(--rtk-space-3, 12px);font-size:16px;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.25;outline:2px solid transparent;outline-offset:2px}.channel-name-input:focus{outline-width:2px;outline-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}footer{margin-top:var(--rtk-space-5, 20px);display:flex;justify-content:flex-end}.member{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);padding:var(--rtk-space-2, 8px)}.member rtk-avatar{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.input-container{position:relative;-webkit-appearance:none;-moz-appearance:none;appearance:none;line-height:1.25;outline:2px solid transparent;outline-offset:2px;outline-width:2px;outline-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5);border-radius:var(--rtk-border-radius-sm, 4px)}.input-container .members{margin:var(--rtk-space-0, 0px);max-height:var(--rtk-space-28, 112px);border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);list-style-type:none;display:flex;flex-wrap:wrap;gap:var(--rtk-space-1, 4px);cursor:text;font-size:16px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));overflow-y:auto;min-height:var(--rtk-space-7, 28px)}.input-container .pill{display:flex;align-items:center;gap:var(--rtk-space-1, 4px);border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity))}.input-container .pill rtk-avatar{height:var(--rtk-space-5, 20px);width:var(--rtk-space-5, 20px);font-size:14px;color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.input-container .pill span{max-width:var(--rtk-space-32, 128px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.input-container .pill rtk-icon{height:var(--rtk-space-4, 16px);width:var(--rtk-space-4, 16px);cursor:pointer}.input-container input{width:var(--rtk-space-24, 96px);border-radius:var(--rtk-border-radius-sm, 4px);border-width:var(--rtk-border-width-none, 0);border-style:none;padding:var(--rtk-space-1, 4px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));outline:2px solid transparent;outline-offset:2px;font-size:16px;line-height:1.25rem}.input-container input.wide-input{width:100%}.search-results{margin:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-1, 4px);max-height:var(--rtk-space-28, 112px);width:100%;padding:var(--rtk-space-0, 0px);position:absolute;list-style-type:none;overflow-y:auto;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));border-radius:var(--rtk-border-radius-md, 8px);--tw-border-spacing-x:var(--rtk-space-2, 8px);--tw-border-spacing-y:var(--rtk-space-2, 8px);border-spacing:var(--tw-border-spacing-x) var(--tw-border-spacing-y);border-style:solid;border-color:rgba(var(--rtk-colors-brand-300, 73 124 253) / 0.5)}.search-results .member{cursor:pointer}.search-results .member rtk-avatar{color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}.search-results .member:hover,.search-results .member.selected{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-700, 2 70 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-1000, var(--rtk-colors-text-1000, 255 255 255)))}";
const RtkChannelCreatorStyle0 = rtkChannelCreatorCss;

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
const RtkChannelCreator = /*@__PURE__*/ proxyCustomElement(class RtkChannelCreator extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.stateUpdate = createEvent(this, "rtkStateUpdate", 7);
        this.switchChannel = createEvent(this, "switchChannel", 7);
        /** Language */
        this.t = useLanguage();
        /** Icon pack */
        this.iconPack = defaultIconPack;
        this.channelName = '';
        this.searchQuery = '';
        this.step = 1;
        this.loading = false;
        this.selectedMemberIds = new Set();
        this.focusedMemberIndex = -1;
        this.showAllMembersList = false;
        this.allMembers = new Map();
        this.inputTextRef = null;
        this.searchInputTextRef = null;
        this.focusOnSearch = (selectText = false) => {
            this.focusedMemberIndex = -1;
            writeTask(() => {
                var _a, _b;
                (_a = this.searchInputTextRef) === null || _a === void 0 ? void 0 : _a.focus();
                if (selectText)
                    (_b = this.searchInputTextRef) === null || _b === void 0 ? void 0 : _b.select();
            });
        };
        this.onClickHandler = async () => {
            if (this.channelName.length === 0)
                return;
            if (this.step === 1) {
                const members = this.meeting.participants.all.toArray();
                const selfId = this.meeting.self.userId;
                const nonSelfMembers = members.filter((member) => member.userId !== selfId);
                nonSelfMembers.forEach((member) => this.allMembers.set(member.userId, member));
                this.step = 2;
                this.focusOnSearch();
                return;
            }
            // step 2 - add members and create channel
            await this.createChannel();
        };
        this.createChannel = async () => {
            const members = Array.from(this.selectedMemberIds);
            const newChannel = await this.meeting.chat.createChannel(this.channelName, members, {
                displayPictureUrl: '',
                visibility: 'public',
                isDirectMessage: false,
            });
            this.switchChannel.emit(newChannel.id);
            this.stateUpdate.emit({ activeChannelCreator: false });
        };
        this.onMemberAdd = (id) => {
            this.showAllMembersList = false;
            this.selectedMemberIds.add(id);
            this.searchQuery = '';
            this.focusOnSearch();
        };
        this.keyDownHandler = (e, filteredMembers) => {
            if (e.key === 'ArrowDown') {
                this.focusedMemberIndex = Math.min(this.focusedMemberIndex + 1, filteredMembers.length - 1);
            }
            else if (e.key === 'ArrowUp') {
                if (this.focusedMemberIndex === -1)
                    return;
                if (this.focusedMemberIndex === 0) {
                    this.focusOnSearch(true);
                    return;
                }
                this.focusedMemberIndex = Math.max(this.focusedMemberIndex - 1, 0);
            }
            else if (e.key === 'Enter') {
                this.onMemberAdd(filteredMembers[this.focusedMemberIndex].userId);
            }
            else if (e.key === 'Backspace') {
                if (this.searchQuery.length !== 0)
                    return;
                if (this.selectedMemberIds.size === 0)
                    return;
                const lastMemberId = Array.from(this.selectedMemberIds.values()).at(-1);
                this.selectedMemberIds.delete(lastMemberId);
                forceUpdate(this.$el);
            }
        };
        this.renderMemberSelector = () => {
            const filteredMembers = Array.from(this.allMembers.values()).filter((member) => !this.selectedMemberIds.has(member.userId) &&
                member.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            const selectedMembers = Array.from(this.selectedMemberIds.values()).map((id) => this.allMembers.get(id));
            const disableInput = this.selectedMemberIds.size === this.allMembers.size;
            return (h("div", { class: "input-container" }, h("ul", { class: "members scrollbar", onClick: () => {
                    var _a;
                    (_a = this.searchInputTextRef) === null || _a === void 0 ? void 0 : _a.focus();
                } }, selectedMembers.map((member) => (h("li", { class: "pill" }, h("rtk-avatar", { participant: {
                    name: member.name,
                    picture: member.picture,
                }, size: "sm" }), h("span", null, member.name), h("rtk-icon", { icon: this.iconPack.dismiss, onClick: () => {
                    this.selectedMemberIds.delete(member.userId);
                    forceUpdate(this.$el);
                    this.focusOnSearch();
                } })))), !disableInput && (h("input", { type: "text", ref: (el) => (this.searchInputTextRef = el), value: this.searchQuery, placeholder: this.selectedMemberIds.size === 0 ? this.t('chat.member_name') : '', class: {
                    'wide-input': this.selectedMemberIds.size === 0,
                }, onInput: (e) => {
                    this.searchQuery = e.target.value.trim();
                }, onClick: () => {
                    this.showAllMembersList = !this.showAllMembersList;
                }, onKeyDown: (e) => this.keyDownHandler(e, filteredMembers) }))), (this.searchQuery.length !== 0 || this.showAllMembersList) && (h("ul", { class: "search-results" }, filteredMembers.map((member, index) => (h("li", { class: { member: true, selected: index === this.focusedMemberIndex }, onClick: () => this.onMemberAdd(member.userId), ref: ($li) => {
                    if (index === this.focusedMemberIndex) {
                        writeTask(() => {
                            if ($li)
                                $li.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
                        });
                    }
                } }, h("rtk-avatar", { participant: {
                    name: member.name,
                    picture: member.picture,
                }, size: "sm" }), h("span", null, member.name)))), filteredMembers.length === 0 && (h("li", { class: "member" }, h("span", null, this.t('chat.error.empty_results'))))))));
        };
    }
    componentDidLoad() {
        var _a;
        (_a = this.inputTextRef) === null || _a === void 0 ? void 0 : _a.focus();
    }
    render() {
        return (h(Host, { key: '7d1b6bc07ef49de8075a25dec0f70b1f01d41222' }, h("header", { key: 'd0db6948cb2888043e6bb260f219570523398721' }, this.step === 1 ? this.t('chat.new_channel') : this.t('chat.add_members')), this.step === 1 && (h("input", { key: 'ebe47cfa27796197bc08a74e3e2d23e557325e30', class: "channel-name-input", type: "text", placeholder: this.t('chat.channel_name'), ref: (el) => (this.inputTextRef = el), onInput: (e) => {
                this.channelName = e.target.value.trim();
            } })), this.step === 2 && this.renderMemberSelector(), h("footer", { key: 'c2a1b31a32bef53ced22b6d7267dba25173376cf' }, h("rtk-button", { key: '2766a128dca00f5175545897e985ab9fe2a074b1', kind: "button", size: "lg", disabled: this.channelName.length === 0, onClick: this.onClickHandler }, this.step === 1 ? this.t('chat.add_members') : this.t('create')))));
    }
    get $el() { return this; }
    static get style() { return RtkChannelCreatorStyle0; }
}, [1, "rtk-channel-creator", {
        "meeting": [16],
        "t": [16],
        "iconPack": [16],
        "channelName": [32],
        "searchQuery": [32],
        "step": [32],
        "loading": [32],
        "selectedMemberIds": [32],
        "focusedMemberIndex": [32],
        "showAllMembersList": [32]
    }]);
__decorate([
    SyncWithStore()
], RtkChannelCreator.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkChannelCreator.prototype, "t", void 0);
__decorate([
    SyncWithStore()
], RtkChannelCreator.prototype, "iconPack", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-channel-creator", "rtk-avatar", "rtk-button", "rtk-icon", "rtk-spinner"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-channel-creator":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkChannelCreator);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkChannelCreator as R, defineCustomElement as d };
