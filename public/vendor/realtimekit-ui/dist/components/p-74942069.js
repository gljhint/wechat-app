import { p as proxyCustomElement, H, d as createEvent, h, e as Host } from './p-c3592601.js';
import { e as defaultIconPack, h as useLanguage } from './p-74e01969.js';
import { S as SyncWithStore } from './p-beb5c7c8.js';
import { s as shorten, f as formatName, g as getInitials } from './p-338c7261.js';
import { d as defineCustomElement$1 } from './p-03bdc4c0.js';

const rtkPollCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.ctr{margin-bottom:var(--rtk-space-3, 12px);display:flex;width:100%;flex-direction:column;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.poll-title{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px);margin-right:var(--rtk-space-4, 16px);font-size:12px}.poll{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));display:flex;flex-direction:column;padding:var(--rtk-space-4, 16px)}.poll-question{padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);font-size:14px;overflow-wrap:break-word}.poll-answers{display:flex;flex-direction:row;justify-content:space-between;font-size:12px;margin-top:var(--rtk-space-4, 16px);margin-bottom:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-1, 4px);padding-right:var(--rtk-space-3, 12px)}.poll-option{display:flex;flex-direction:column;margin-top:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--rtk-space-2, 8px);word-break:break-word}.poll-option.open-vote:hover{cursor:pointer}.poll-option label{display:flex;flex-direction:row;cursor:inherit}.poll-option-header{display:flex;flex-direction:row;justify-content:space-between;padding:var(--rtk-space-1, 4px)}.poll-option-header[data-disabled='true']:hover{cursor:default}.poll-option-header input{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);margin-left:var(--rtk-space-0\\.5, 2px);margin-right:var(--rtk-space-2, 8px);cursor:inherit}.poll-option-header .counter{color:rgb(var(--rtk-colors-text-1000, 255 255 255));font-size:12px}.votes{margin-top:var(--rtk-space-1, 4px);display:flex;flex-direction:row;flex-wrap:wrap}.vote{margin-right:var(--rtk-space-1, 4px);height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);display:flex;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-video-bg, 24 24 24) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));border-radius:var(--rtk-border-radius-none, 0);clip-path:circle()}.active{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-900, var(--rtk-colors-text-900, 255 255 255 / 0.88)))}.active .counter{color:rgb(var(--rtk-colors-text-on-brand-900, var(--rtk-colors-text-900, 255 255 255 / 0.88)))}";
const RtkPollStyle0 = rtkPollCss;

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
const RtkPolls = /*@__PURE__*/ proxyCustomElement(class RtkPolls extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.onVote = createEvent(this, "rtkVotePoll", 7);
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        this.MAX_VOTES_RENDER = 10;
    }
    vote(e, index) {
        if (this.poll.voted.includes(this.self)) {
            e.preventDefault();
        }
        else {
            this.onVote.emit({ id: this.poll.id, index });
        }
    }
    render() {
        const hasVoted = this.poll.voted.includes(this.self);
        return (h(Host, { key: 'f279288f91b6fe8d525fc8498733763081c8d33b' }, h("div", { key: '5919d49691938b1886af73aed2e84c9281d400ae', class: "ctr" }, h("p", { key: '9881e172379add503d5b7057719214ff7094e66d', class: "poll-title" }, this.t('polls.by'), " ", shorten(formatName(this.poll.createdBy), 20)), h("div", { key: 'f94d3f1184e1e40048cc2f3a5545a643b747b5f3', class: "poll" }, h("p", { key: 'f8a37e64dc447ca65308d7ca5024b19fd845492d', class: "poll-question" }, this.poll.question), h("div", { key: '89a0c12e8c9423c188c25e130852b0ead854eccd', class: "poll-answers" }, h("span", { key: '73c48104ca4ab450b6a16f17dfdaffa5802198a2' }, this.t('polls.answers')), h("span", { key: '3e2bf9df6ffcdc3d04bff203e7a6b5cfbc449d2c' }, this.poll.voted.length)), this.poll.options.map((item, index) => (h("div", { class: {
                active: item.votes.some((x) => x.id === this.self),
                'open-vote': this.permissions.polls.canVote && !hasVoted,
                'poll-option': true,
            } }, h("div", { class: "poll-option-header", "data-disabled": !this.permissions.polls.canVote }, h("label", null, !hasVoted && (h("input", { disabled: !this.permissions.polls.canVote, readOnly: hasVoted, type: "radio", checked: item.votes.some((x) => x.id === this.self), onClick: (e) => this.vote(e, index) })), h("p", null, item.text)), h("span", { class: "counter" }, item.count)), h("div", { class: "votes" }, item.votes.slice(0, this.MAX_VOTES_RENDER).map((vote) => {
            if (this.poll.anonymous && this.self !== this.poll.createdByUserId)
                return;
            return (h("rtk-tooltip", { label: vote.name }, h("div", { class: "vote" }, getInitials(vote.name))));
        }), item.votes.length > this.MAX_VOTES_RENDER && (h("rtk-tooltip", { label: `+${item.votes.length - this.MAX_VOTES_RENDER} more ` }, h("div", { class: "vote" }, "+", item.votes.length - this.MAX_VOTES_RENDER)))))))))));
    }
    static get style() { return RtkPollStyle0; }
}, [1, "rtk-poll", {
        "poll": [16],
        "self": [1],
        "permissions": [16],
        "iconPack": [16],
        "t": [16]
    }]);
__decorate([
    SyncWithStore()
], RtkPolls.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkPolls.prototype, "t", void 0);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-poll", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-poll":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkPolls);
            }
            break;
        case "rtk-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}
defineCustomElement();

export { RtkPolls as R, defineCustomElement as d };
