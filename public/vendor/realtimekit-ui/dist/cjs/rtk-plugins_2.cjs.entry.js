'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');
const scroll = require('./scroll-c6404609.js');

const rtkPluginsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{margin-top:var(--rtk-space-2, 8px);margin-bottom:var(--rtk-space-2, 8px);display:flex;height:100%;width:100%;flex-direction:column;font-size:14px;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}h3{margin-left:var(--rtk-space-0, 0px);margin-right:var(--rtk-space-0, 0px);margin-top:var(--rtk-space-4, 16px);margin-bottom:var(--rtk-space-4, 16px);display:block;padding:var(--rtk-space-0, 0px);font-size:16px;font-weight:400;color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));text-align:center}ul{overflow-y:auto;padding:var(--rtk-space-0, 0px);flex-grow:1;flex-basis:0}.metadata{display:flex;align-items:center}.metadata img{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);border-radius:var(--rtk-border-radius-sm, 4px)}.metadata .name{margin-left:var(--rtk-space-2, 8px);font-weight:500}.plugin{display:flex;align-items:center;justify-content:space-between;padding-left:var(--rtk-space-4, 16px);padding-right:var(--rtk-space-4, 16px);padding-top:var(--rtk-space-2, 8px);padding-bottom:var(--rtk-space-2, 8px)}.plugin .buttons{display:flex;align-items:center}rtk-button:hover{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);--tw-ring-opacity:1;--tw-ring-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-ring-opacity));--tw-ring-offset-width:2px;--tw-ring-offset-color:rgb(var(--rtk-colors-background-1000, 8 8 8))}";
const RtkPluginsStyle0 = rtkPluginsCss;

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const RtkPlugins = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.stateUpdate = index$1.createEvent(this, "rtkStateUpdate", 7);
        /** Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        this.plugins = [];
        this.canStartPlugins = false;
        this.canClosePlugins = false;
        this.activatedPluginsId = [];
        this.close = () => {
            this.stateUpdate.emit({ activeSidebar: false, sidebar: undefined });
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        var _a;
        (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.plugins.all.removeListener('stateUpdate', this.updateActivePlugins);
    }
    meetingChanged(meeting) {
        if (meeting != null) {
            this.canStartPlugins = meeting.self.permissions.plugins.canStart;
            this.canClosePlugins = meeting.self.permissions.plugins.canClose;
            this.plugins = meeting.plugins.all
                .toArray()
                .filter((plugin) => { var _a; return !((_a = meeting.self.config.disabledPlugins) === null || _a === void 0 ? void 0 : _a.includes(plugin.id)); });
            this.updateActivePlugins = () => {
                this.activatedPluginsId = meeting.plugins.active.toArray().map((p) => p.id);
            };
            this.updateActivePlugins();
            meeting.plugins.all.addListener('stateUpdate', this.updateActivePlugins);
        }
    }
    render() {
        return (index$1.h(index$1.Host, { key: 'c0621bcd1d64b1eb9e4b913bb2707d66179848a8' }, index$1.h("ul", { key: '2796e509a4df169a3b6455b06e33bcf9e1e634d4', class: "scrollbar" }, this.plugins.map((plugin) => (index$1.h("li", { key: plugin.name, class: "plugin" }, index$1.h("div", { class: "metadata" }, index$1.h("img", { src: plugin.picture }), index$1.h("div", { class: "name" }, plugin.name)), !this.activatedPluginsId.includes(plugin.id) && this.canStartPlugins && (index$1.h("div", { class: "buttons" }, index$1.h("rtk-button", { kind: "icon", size: "lg", onClick: () => {
                plugin.activate();
                this.close();
            }, "aria-label": `${this.t('activate')} ${plugin.name}` }, index$1.h("rtk-icon", { icon: this.iconPack.rocket, tabIndex: -1, "aria-hidden": true })))), this.activatedPluginsId.includes(plugin.id) && this.canClosePlugins && (index$1.h("div", { class: "buttons" }, index$1.h("rtk-button", { kind: "icon", size: "lg", onClick: () => {
                plugin.deactivate();
            }, "aria-label": `${this.t('close')} ${plugin.name}` }, index$1.h("rtk-icon", { icon: this.iconPack.dismiss, tabIndex: -1, "aria-hidden": true }))))))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate$1([
    index.SyncWithStore()
], RtkPlugins.prototype, "meeting", void 0);
__decorate$1([
    index.SyncWithStore()
], RtkPlugins.prototype, "config", void 0);
__decorate$1([
    index.SyncWithStore()
], RtkPlugins.prototype, "iconPack", void 0);
__decorate$1([
    index.SyncWithStore()
], RtkPlugins.prototype, "t", void 0);
RtkPlugins.style = RtkPluginsStyle0;

const rtkPollsCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}:host{margin-top:var(--rtk-space-2, 8px);display:flex;height:100%;width:100%;flex-direction:column;font-size:14px}*{box-sizing:border-box}.ctr{box-sizing:border-box;padding:var(--rtk-space-3, 12px);padding-top:var(--rtk-space-0, 0px);display:flex;flex:1 1 0%;flex-direction:column}.polls-view{overflow-y:auto;flex:1 1 0%;flex-basis:0}.empty-polls{display:flex;height:100%;width:100%;align-items:center;justify-content:center}";
const RtkPollsStyle0 = rtkPollsCss;

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
const RtkPolls = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        /** Config */
        this.config = uiStore.createDefaultConfig();
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Create State */
        this.create = false;
        /** Polls */
        this.polls = [];
        this.onPollsUpdate = (data) => {
            this.polls = [...data.polls];
        };
        this.onUpdatePermissions = () => {
            this.permissions = this.meeting.self.permissions;
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
    }
    disconnectedCallback() {
        var _a;
        if (!this.meeting)
            return;
        (_a = this.meeting.polls) === null || _a === void 0 ? void 0 : _a.removeListener('pollsUpdate', this.onPollsUpdate);
        this.meeting.self.permissions.removeListener('pollsUpdate', this.onUpdatePermissions);
    }
    meetingChanged(meeting) {
        if (!meeting)
            return;
        if (!meeting.polls)
            return;
        this.permissions = this.meeting.self.permissions;
        this.polls = [...meeting.polls.items];
        meeting.polls.addListener('pollsUpdate', this.onPollsUpdate);
        this.meeting.self.permissions.addListener('pollsUpdate', this.onUpdatePermissions);
        this.onCreate = async (data) => {
            this.create = false;
            await meeting.polls.create(data.question, data.options, data.anonymous, data.hideVotes);
        };
        this.onVote = async (id, index) => {
            await meeting.polls.vote(id, index);
        };
    }
    toggleCreateState() {
        this.create = !this.create;
    }
    componentDidRender() {
        scroll.smoothScrollToBottom(this.pollEl);
    }
    render() {
        var _a, _b;
        return (index$1.h(index$1.Host, { key: '41908b79966d12fc13782a05b2763e233d0ef8c7' }, index$1.h("div", { key: '87f36d5e811009624ffc1f1d18f55aefc50f6c8e', class: "ctr", part: "container" }, index$1.h("div", { key: 'cc5170445db169e2de47e18d7d0dac0bf932726a', class: "polls-view scrollbar", ref: (el) => (this.pollEl = el), part: "polls" }, this.polls.length == 0 && this.create !== true && (index$1.h("div", { key: '9d1db7791f35b78137726957bcac10cba381227e', class: "empty-polls" }, this.t('polls.empty'))), this.polls.map((item) => {
            var _a;
            return (index$1.h("rtk-poll", { key: item.id, poll: item, onRtkVotePoll: (e) => {
                    this.onVote(e.detail.id, e.detail.index);
                }, self: (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.userId, iconPack: this.iconPack, t: this.t, permissions: this.permissions }));
        }), this.create && (index$1.h("rtk-poll-form", { key: '9f73d645076a512dfffc3009dada18c137b918d0', part: "poll-form", onRtkCreatePoll: (e) => {
                this.onCreate(e.detail);
            }, iconPack: this.iconPack, t: this.t }))), ((_b = (_a = this.permissions) === null || _a === void 0 ? void 0 : _a.polls) === null || _b === void 0 ? void 0 : _b.canCreate) && (index$1.h("rtk-button", { key: 'e24dd4ab4c0e61acdbcff002ef16553214cfb94e', kind: "wide", onClick: () => this.toggleCreateState(), variant: this.create ? 'secondary' : 'primary', part: "button" }, this.create ? this.t('polls.cancel') : this.t('polls.create'))))));
    }
    static get watchers() { return {
        "meeting": ["meetingChanged"]
    }; }
};
__decorate([
    index.SyncWithStore()
], RtkPolls.prototype, "meeting", void 0);
__decorate([
    index.SyncWithStore()
], RtkPolls.prototype, "config", void 0);
__decorate([
    index.SyncWithStore()
], RtkPolls.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkPolls.prototype, "t", void 0);
RtkPolls.style = RtkPollsStyle0;

exports.rtk_plugins = RtkPlugins;
exports.rtk_polls = RtkPolls;
