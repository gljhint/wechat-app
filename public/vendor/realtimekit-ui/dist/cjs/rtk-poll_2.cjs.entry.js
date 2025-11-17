'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index$1 = require('./index-05554ce6.js');
const uiStore = require('./ui-store-4edab2a5.js');
const index = require('./index-77d3cd4a.js');
const string = require('./string-a410fab6.js');

const rtkPollCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.ctr{margin-bottom:var(--rtk-space-3, 12px);display:flex;width:100%;flex-direction:column;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}.poll-title{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px);margin-right:var(--rtk-space-4, 16px);font-size:12px}.poll{border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-800, 30 30 30) / var(--tw-bg-opacity));display:flex;flex-direction:column;padding:var(--rtk-space-4, 16px)}.poll-question{padding-left:var(--rtk-space-2, 8px);padding-right:var(--rtk-space-2, 8px);font-size:14px;overflow-wrap:break-word}.poll-answers{display:flex;flex-direction:row;justify-content:space-between;font-size:12px;margin-top:var(--rtk-space-4, 16px);margin-bottom:var(--rtk-space-1, 4px);padding-left:var(--rtk-space-1, 4px);padding-right:var(--rtk-space-3, 12px)}.poll-option{display:flex;flex-direction:column;margin-top:var(--rtk-space-2, 8px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity));padding:var(--rtk-space-2, 8px);word-break:break-word}.poll-option.open-vote:hover{cursor:pointer}.poll-option label{display:flex;flex-direction:row;cursor:inherit}.poll-option-header{display:flex;flex-direction:row;justify-content:space-between;padding:var(--rtk-space-1, 4px)}.poll-option-header[data-disabled='true']:hover{cursor:default}.poll-option-header input{margin-top:var(--rtk-space-0, 0px);margin-bottom:var(--rtk-space-0, 0px);margin-left:var(--rtk-space-0\\.5, 2px);margin-right:var(--rtk-space-2, 8px);cursor:inherit}.poll-option-header .counter{color:rgb(var(--rtk-colors-text-1000, 255 255 255));font-size:12px}.votes{margin-top:var(--rtk-space-1, 4px);display:flex;flex-direction:row;flex-wrap:wrap}.vote{margin-right:var(--rtk-space-1, 4px);height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);display:flex;align-items:center;justify-content:center;border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-video-bg, 24 24 24) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-1000, 255 255 255));border-radius:var(--rtk-border-radius-none, 0);clip-path:circle()}.active{--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-brand-500, 33 96 253) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-on-brand-900, var(--rtk-colors-text-900, 255 255 255 / 0.88)))}.active .counter{color:rgb(var(--rtk-colors-text-on-brand-900, var(--rtk-colors-text-900, 255 255 255 / 0.88)))}";
const RtkPollStyle0 = rtkPollCss;

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
const RtkPolls = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onVote = index$1.createEvent(this, "rtkVotePoll", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
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
        return (index$1.h(index$1.Host, { key: 'f279288f91b6fe8d525fc8498733763081c8d33b' }, index$1.h("div", { key: '5919d49691938b1886af73aed2e84c9281d400ae', class: "ctr" }, index$1.h("p", { key: '9881e172379add503d5b7057719214ff7094e66d', class: "poll-title" }, this.t('polls.by'), " ", string.shorten(string.formatName(this.poll.createdBy), 20)), index$1.h("div", { key: 'f94d3f1184e1e40048cc2f3a5545a643b747b5f3', class: "poll" }, index$1.h("p", { key: 'f8a37e64dc447ca65308d7ca5024b19fd845492d', class: "poll-question" }, this.poll.question), index$1.h("div", { key: '89a0c12e8c9423c188c25e130852b0ead854eccd', class: "poll-answers" }, index$1.h("span", { key: '73c48104ca4ab450b6a16f17dfdaffa5802198a2' }, this.t('polls.answers')), index$1.h("span", { key: '3e2bf9df6ffcdc3d04bff203e7a6b5cfbc449d2c' }, this.poll.voted.length)), this.poll.options.map((item, index) => (index$1.h("div", { class: {
                active: item.votes.some((x) => x.id === this.self),
                'open-vote': this.permissions.polls.canVote && !hasVoted,
                'poll-option': true,
            } }, index$1.h("div", { class: "poll-option-header", "data-disabled": !this.permissions.polls.canVote }, index$1.h("label", null, !hasVoted && (index$1.h("input", { disabled: !this.permissions.polls.canVote, readOnly: hasVoted, type: "radio", checked: item.votes.some((x) => x.id === this.self), onClick: (e) => this.vote(e, index) })), index$1.h("p", null, item.text)), index$1.h("span", { class: "counter" }, item.count)), index$1.h("div", { class: "votes" }, item.votes.slice(0, this.MAX_VOTES_RENDER).map((vote) => {
            if (this.poll.anonymous && this.self !== this.poll.createdByUserId)
                return;
            return (index$1.h("rtk-tooltip", { label: vote.name }, index$1.h("div", { class: "vote" }, string.getInitials(vote.name))));
        }), item.votes.length > this.MAX_VOTES_RENDER && (index$1.h("rtk-tooltip", { label: `+${item.votes.length - this.MAX_VOTES_RENDER} more ` }, index$1.h("div", { class: "vote" }, "+", item.votes.length - this.MAX_VOTES_RENDER)))))))))));
    }
};
__decorate$1([
    index.SyncWithStore()
], RtkPolls.prototype, "iconPack", void 0);
__decorate$1([
    index.SyncWithStore()
], RtkPolls.prototype, "t", void 0);
RtkPolls.style = RtkPollStyle0;

const rtkPollFormCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}.scrollbar{scrollbar-width:thin;scrollbar-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))\n    var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar{height:var(--rtk-space-1\\.5, 6px);width:var(--rtk-space-1\\.5, 6px);border-radius:9999px;background-color:var(--rtk-scrollbar-background, transparent)}.scrollbar::-webkit-scrollbar-thumb{border-radius:9999px;background-color:var(--rtk-scrollbar-color, rgb(var(--rtk-colors-background-600, 60 60 60)))}.create-poll{margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px);display:flex;flex:1 1 0%;flex-direction:column;padding:var(--rtk-space-3, 12px);border-radius:var(--rtk-border-radius-md, 8px);--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-700, 44 44 44) / var(--tw-bg-opacity))}.create-poll p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px);text-align:center}.create-poll textarea{display:flex;border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);font-family:var(--rtk-font-family, sans-serif);border-width:var(--rtk-border-width-none, 0);border-style:none;font-weight:500;outline:2px solid transparent;outline-offset:2px;margin-top:var(--rtk-space-3, 12px);margin-bottom:var(--rtk-space-3, 12px);resize:vertical;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.create-poll textarea:focus{outline-style:solid;outline-offset:2px;outline-color:rgb(var(--rtk-colors-background-600, 60 60 60))}.option{display:flex;flex-direction:row;align-items:center;margin-bottom:var(--rtk-space-3, 12px);width:100%}.option input{width:100%;border-radius:var(--rtk-border-radius-sm, 4px);padding:var(--rtk-space-2, 8px);border-width:var(--rtk-border-width-none, 0);border-style:none;outline:2px solid transparent;outline-offset:2px;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-900, 26 26 26) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-700, 255 255 255 / 0.64))}.remove-option{margin-left:var(--rtk-space-2, 8px);width:var(--rtk-space-10, 40px);border-radius:var(--rtk-border-radius-sm, 4px)}.add-option{margin-bottom:var(--rtk-space-3, 12px)}label{margin-bottom:var(--rtk-space-3, 12px)}.error-text{margin-top:var(--rtk-space-3, 12px);text-align:center;font-size:12px;--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}";
const RtkPollFormStyle0 = rtkPollFormCss;

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
const RtkPoll = class {
    constructor(hostRef) {
        index$1.registerInstance(this, hostRef);
        this.onCreate = index$1.createEvent(this, "rtkCreatePoll", 7);
        /** Icon pack */
        this.iconPack = uiStore.defaultIconPack;
        /** Language */
        this.t = uiStore.useLanguage();
        /** Options */
        this.options = ['', ''];
        this.anonymous = false;
        this.hideVotes = true;
    }
    removeOption(index) {
        var _a;
        this.options = this.options.filter((_, ind) => ind !== index);
        if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === 1)
            this.error = undefined;
    }
    addOption() {
        this.options = [...this.options, ''];
    }
    updateOption(ev, index) {
        var _a;
        this.options[index] = ev.target.value;
        if (((_a = this.error) === null || _a === void 0 ? void 0 : _a.code) === 1)
            this.error = undefined;
    }
    handleSubmit() {
        const pollObject = {
            question: this.question.value,
            options: this.options,
            anonymous: this.anonymous,
            hideVotes: this.anonymous ? true : this.hideVotes,
        };
        if (!pollObject.question) {
            this.error = {
                code: 0,
                message: this.t('polls.errors.question_required'),
            };
            return;
        }
        if (this.options.filter((op) => op.trim() === '').length > 0) {
            this.error = {
                code: 1,
                message: this.t('polls.errors.empty_option'),
            };
            return;
        }
        this.onCreate.emit(pollObject);
    }
    render() {
        return (index$1.h(index$1.Host, { key: '625bbf35e528f16b4a982a159c3631af1d444a85' }, index$1.h("div", { key: 'f0d20f8d5e53d1f8fd5063b7e533dc50d8184dc5', class: "create-poll" }, index$1.h("p", { key: '2dbcff9b0828790c4315e62f45c139f30971b72c' }, this.t('polls.question')), index$1.h("textarea", { key: '6ff40a7fe19cded416f45474065b9361de83d5a2', onInput: () => {
                if (this.error && this.error.code === 0)
                    this.error = undefined;
            }, ref: (e) => (this.question = e), placeholder: this.t('polls.question.placeholder') }), this.options.map((item, index) => (index$1.h("div", { class: "option" }, index$1.h("input", { placeholder: this.t('polls.option.placeholder'), value: item, onInput: (event) => this.updateOption(event, index) }), index > 1 && (index$1.h("rtk-button", { kind: "icon", class: "auto remove-option", variant: "secondary", onClick: () => this.removeOption(index) }, index$1.h("rtk-icon", { icon: this.iconPack.subtract })))))), index$1.h("rtk-button", { key: '565c530735bf27e14b0a5ee33afca6f45b1e4fc5', class: "add-option", variant: "secondary", onClick: () => this.addOption() }, this.t('polls.option')), index$1.h("label", { key: 'c38d4c9bee1c086cb481a94b17853749d5de6b63' }, index$1.h("input", { key: '64f21e59d497ae0182da74064d96ad66a522515d', id: "anonymous", type: "checkbox", onChange: (e) => (this.anonymous = e.target.checked) }), this.t('polls.results.anon')), index$1.h("label", { key: 'ec293dc473b4d9d0df7fe9d93e036ff28c0ea3d1' }, index$1.h("input", { key: 'bef5ee43cee42d3c16927efc810ad4b76cb8994b', id: "hideVotes", type: "checkbox", disabled: this.anonymous, checked: this.anonymous ? true : this.hideVotes, onChange: (e) => (this.hideVotes = e.target.checked) }), this.t('polls.results.hide')), index$1.h("rtk-button", { key: '7b5646a77576a2836370d16dc2104d267c573de2', kind: "wide", onClick: () => this.handleSubmit() }, this.t('polls.create')), this.error && index$1.h("span", { key: 'd51a6301dba0c3686a5f1e59ebdc98eccfa7488b', class: "error-text" }, this.error.message))));
    }
};
__decorate([
    index.SyncWithStore()
], RtkPoll.prototype, "iconPack", void 0);
__decorate([
    index.SyncWithStore()
], RtkPoll.prototype, "t", void 0);
RtkPoll.style = RtkPollFormStyle0;

exports.rtk_poll = RtkPolls;
exports.rtk_poll_form = RtkPoll;
