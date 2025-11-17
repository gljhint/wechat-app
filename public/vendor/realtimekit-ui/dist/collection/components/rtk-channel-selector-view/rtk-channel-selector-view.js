var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Host, h } from "@stencil/core";
import { defaultIconPack, useLanguage } from "../../exports";
import { SyncWithStore } from "../../utils/sync-with-store";
import { debounce } from "lodash-es";
export class RtkChannelSelectorView {
    constructor() {
        /** Disables search bar (default = false) */
        this.disableSearch = false;
        /** Hides avatar (default = false) */
        this.hideAvatar = false;
        /** Icon Pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Render as dropdown or list (default = list) */
        this.viewAs = 'list';
        this.searchQuery = '';
        this.showDropdown = false;
        this.calculateListHeight = debounce(() => {
            if (this.viewAs === 'list' && this.$listEl) {
                let height = 0;
                const slotEl = this.$el.shadowRoot.querySelector('slot[name="header"]');
                if (slotEl) {
                    slotEl.assignedElements().forEach((e) => (height += e.offsetHeight));
                }
                if (this.$searchEl) {
                    height += this.$searchEl.offsetHeight;
                }
                this.$listEl.style.height = `${window.innerHeight - height - 16}px`;
            }
        }, 60);
        this.getFilteredChannels = () => {
            if (this.searchQuery.trim() === '') {
                return this.channels;
            }
            return this.channels.filter((channel) => {
                return channel['name'].toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        };
        this.toggleDropdown = () => {
            this.showDropdown = !this.showDropdown;
        };
        this.getChannelById = (id) => {
            return this.channels.find((channel) => channel.id === id);
        };
        this.getTotalUnreads = () => {
            return this.channels.reduce((acc, curr) => {
                return acc + curr.unreadCount;
            }, 0);
        };
        this.onChannelClickHandler = (channel) => {
            this.channelChange.emit(channel);
            if (this.viewAs === 'dropdown') {
                this.showDropdown = false;
            }
        };
    }
    connectedCallback() {
        this.resizeObserver = new ResizeObserver(this.calculateListHeight);
    }
    componentDidLoad() {
        this.resizeObserver.observe(this.$el);
        this.calculateListHeight();
    }
    disconnectedCallback() {
        var _a;
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this.calculateListHeight.cancel();
    }
    getTimeLabel(messageDate) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay() - 1);
        if (messageDate.toDateString() === today.toDateString()) {
            return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        else if (messageDate.toDateString() === yesterday.toDateString()) {
            return this.t('date.yesteday');
        }
        else if (messageDate > firstDayOfWeek) {
            const weekdays = [
                'date.sunday',
                'date.monday',
                'date.tuesday',
                'date.wednesday',
                'date.thursday',
                'date.friday',
                'date.saturday',
            ];
            return this.t(weekdays[messageDate.getDay()]);
        }
        else {
            return Intl.DateTimeFormat([], {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(messageDate);
        }
    }
    render() {
        const filteredChannels = this.getFilteredChannels();
        const shouldShowDropdown = this.viewAs === 'list' || (this.viewAs === 'dropdown' && this.showDropdown);
        return (h(Host, { key: 'adc8ab4b9c8c865998588fbd9766296f18b3e48e' }, this.viewAs === 'list' && h("slot", { key: 'e5740725a4349472ca2eb1fb0816eb2311a99838', name: "header" }), shouldShowDropdown && (h("div", { key: '425adc920c28e0421e07bb0bd9f61b31c42fcda9', class: {
                dropdown: this.viewAs === 'dropdown',
                scrollbar: this.viewAs === 'dropdown',
                list: this.viewAs === 'list',
            } }, !this.disableSearch && (h("div", { key: '9fbbc48d8489f2a6490729fac1fecdef1838e84a', class: "search-container", ref: (el) => (this.$searchEl = el) }, h("input", { key: 'f7fb43662d50274f80380b735ef9f5fc0b215442', type: "text", placeholder: this.t('chat.search_conversations'), value: this.searchQuery, onInput: (e) => (this.searchQuery = e.target.value) }), h("rtk-icon", { key: 'af76e65a1397d2a6e557a28b687e26aef641c568', icon: this.iconPack.search }))), h("div", { key: '0711a9cfcc811269a5020dc41030c0daee5cc8bf', class: "channels-container scrollbar", ref: (el) => (this.$listEl = el) }, filteredChannels.map((channel) => {
            return (h("button", { class: { channel: true, active: this.selectedChannelId === channel.id }, onClick: () => this.onChannelClickHandler(channel) }, !this.hideAvatar && (h("div", null, channel.icon ? (h("rtk-icon", { class: "avatar-icon", icon: this.iconPack[channel.icon] })) : (h("rtk-avatar", { participant: {
                    name: channel.name,
                    picture: channel.avatarUrl,
                } })))), h("div", { class: "channel-data" }, h("div", { class: "col" }, h("div", { class: "name" }, channel.name), channel.latestMessage && (h("div", { class: {
                    'last-message': true,
                    'no-message': !channel.latestMessage,
                } }, h("rtk-text-message-view", { isMarkdown: true, text: channel.latestMessage })))), h("div", { class: "col channel-meta" }, channel.latestMessageTime && (h("time", { class: "time" }, this.getTimeLabel(channel.latestMessageTime))), channel.unreadCount > 0 && (h("div", { class: "unread-count" }, channel.unreadCount))))));
        })))), this.viewAs === 'dropdown' && (h("button", { key: '0c87f90d6d0fe22284995ab7259689f80a862829', class: "dropdown-trigger", onClick: this.toggleDropdown }, h("span", { key: 'd1a364f2c5c57d19702d0b8707ca661c1dc4c14f' }, this.selectedChannelId &&
            `${this.t('to')} ${this.getChannelById(this.selectedChannelId).name}`, this.getTotalUnreads() > 0 && (h("div", { key: 'bf789f9df82851825bc6ea12a19a5f37ab74aefe', class: "unread-count" }, this.getTotalUnreads()))), h("rtk-icon", { key: 'c0d03f883f4c46b2698be0f197751fc0470717ea', icon: this.showDropdown ? this.iconPack.chevron_up : this.iconPack.chevron_down })))));
    }
    static get is() { return "rtk-channel-selector-view"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["rtk-channel-selector-view.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["rtk-channel-selector-view.css"]
        };
    }
    static get properties() {
        return {
            "channels": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{\n    id: string;\n    name: string;\n    avatarUrl?: string;\n    icon?: keyof IconPack;\n    latestMessage?: string;\n    latestMessageTime?: Date;\n    unreadCount?: number;\n  }[]",
                    "resolved": "{ id: string; name: string; avatarUrl?: string; icon?: \"pin\" | \"disconnected\" | \"pause\" | \"chat\" | \"info\" | \"debug\" | \"add\" | \"delete\" | \"participants\" | \"search\" | \"image\" | \"warning\" | \"dismiss\" | \"settings\" | \"pip_on\" | \"pip_off\" | \"viewers\" | \"mic_off\" | \"mic_on\" | \"minimize\" | \"maximize\" | \"video_off\" | \"video_on\" | \"breakout_rooms\" | \"copy\" | \"play\" | \"people\" | \"people_checked\" | \"poll\" | \"rocket\" | \"call_end\" | \"share\" | \"share_screen_start\" | \"share_screen_stop\" | \"share_screen_person\" | \"clock\" | \"send\" | \"more_vertical\" | \"chevron_down\" | \"chevron_up\" | \"chevron_left\" | \"chevron_right\" | \"wifi\" | \"speaker\" | \"speaker_off\" | \"download\" | \"full_screen_maximize\" | \"full_screen_minimize\" | \"attach\" | \"emoji_multiple\" | \"image_off\" | \"wand\" | \"recording\" | \"subtract\" | \"stop_recording\" | \"pin_off\" | \"spinner\" | \"shuffle\" | \"edit\" | \"back\" | \"save\" | \"web\" | \"checkmark\" | \"spotlight\" | \"join_stage\" | \"leave_stage\" | \"signal_1\" | \"signal_2\" | \"signal_3\" | \"signal_4\" | \"signal_5\" | \"start_livestream\" | \"stop_livestream\" | \"devices\" | \"horizontal_dots\" | \"ai_sparkle\" | \"meeting_ai\" | \"create_channel\" | \"create_channel_illustration\" | \"captionsOn\" | \"captionsOff\" | \"fastForward\"; latestMessage?: string; latestMessageTime?: Date; unreadCount?: number; }[]",
                    "references": {
                        "IconPack": {
                            "location": "import",
                            "path": "../../exports",
                            "id": "src/exports.ts::IconPack"
                        },
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Channels"
                },
                "getter": false,
                "setter": false
            },
            "selectedChannelId": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Selected channel id"
                },
                "getter": false,
                "setter": false,
                "attribute": "selected-channel-id",
                "reflect": false
            },
            "disableSearch": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Disables search bar (default = false)"
                },
                "getter": false,
                "setter": false,
                "attribute": "disable-search",
                "reflect": false,
                "defaultValue": "false"
            },
            "hideAvatar": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Hides avatar (default = false)"
                },
                "getter": false,
                "setter": false,
                "attribute": "hide-avatar",
                "reflect": false,
                "defaultValue": "false"
            },
            "iconPack": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "IconPack",
                    "resolved": "{ people: string; people_checked: string; chat: string; poll: string; participants: string; rocket: string; call_end: string; share: string; mic_on: string; mic_off: string; video_on: string; video_off: string; share_screen_start: string; share_screen_stop: string; share_screen_person: string; clock: string; dismiss: string; send: string; search: string; more_vertical: string; chevron_down: string; chevron_up: string; chevron_left: string; chevron_right: string; settings: string; wifi: string; speaker: string; speaker_off: string; download: string; full_screen_maximize: string; full_screen_minimize: string; copy: string; attach: string; image: string; emoji_multiple: string; image_off: string; disconnected: string; wand: string; recording: string; subtract: string; stop_recording: string; warning: string; pin: string; pin_off: string; spinner: string; breakout_rooms: string; add: string; shuffle: string; edit: string; delete: string; back: string; save: string; web: string; checkmark: string; spotlight: string; join_stage: string; leave_stage: string; pip_off: string; pip_on: string; signal_1: string; signal_2: string; signal_3: string; signal_4: string; signal_5: string; start_livestream: string; stop_livestream: string; viewers: string; debug: string; info: string; devices: string; horizontal_dots: string; ai_sparkle: string; meeting_ai: string; create_channel: string; create_channel_illustration: string; captionsOn: string; captionsOff: string; play: string; pause: string; fastForward: string; minimize: string; maximize: string; }",
                    "references": {
                        "IconPack": {
                            "location": "import",
                            "path": "../../exports",
                            "id": "src/exports.ts::IconPack"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Icon Pack"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "defaultIconPack"
            },
            "t": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "RtkI18n",
                    "resolved": "(key: \"pin\" | \"unpin\" | \"kick\" | \"ended\" | \"disconnected\" | \"failed\" | \"type\" | \"end\" | \"join\" | \"leave\" | \"audio\" | \"video\" | \"close\" | \"plugins\" | \"polls\" | \"chat\" | \"pinned\" | \"screenshare\" | \"joined\" | \"participants\" | \"logo\" | \"search\" | \"image\" | \"(you)\" | \"everyone\" | (string & {}) | \"about_call\" | \"screen\" | \"camera\" | \"dismiss\" | \"page\" | \"more\" | \"page.prev\" | \"page.next\" | \"layout\" | \"layout.auto\" | \"settings\" | \"file\" | \"connection\" | \"leave_confirmation\" | \"cancel\" | \"yes\" | \"you\" | \"to\" | \"mute\" | \"accept\" | \"pip_on\" | \"pip_off\" | \"viewers\" | \"create\" | \"ask\" | \"activate\" | \"requests\" | \"mic_off\" | \"disable_mic\" | \"mic_on\" | \"enable_mic\" | \"test\" | \"minimize\" | \"maximize\" | \"mute_all\" | \"mute_all.description\" | \"mute_all.header\" | \"mute_all.allow_unmute\" | \"video_off\" | \"disable_video\" | \"video_on\" | \"enable_video\" | \"offline\" | \"offline.description\" | \"failed.description\" | \"disconnected.description\" | \"participants.errors.empty_results\" | \"participants.empty_list\" | \"participants.no_pending_requests\" | \"participants.turn_off_video\" | \"polls.by\" | \"polls.question\" | \"polls.question.placeholder\" | \"polls.answers\" | \"polls.option\" | \"polls.option.placeholder\" | \"polls.results.anon\" | \"polls.results.hide\" | \"polls.create\" | \"polls.cancel\" | \"polls.empty\" | \"polls.errors.question_required\" | \"polls.errors.empty_option\" | \"screenshare.min_preview\" | \"screenshare.max_preview\" | \"screenshare.shared\" | \"screenshare.start\" | \"screenshare.stop\" | \"screenshare.error.unknown\" | \"screenshare.error.max_count\" | \"perm_denied\" | \"perm_denied.audio\" | \"perm_denied.video\" | \"perm_denied.screenshare\" | \"perm_denied.audio.chrome.message\" | \"perm_denied.video.chrome.message\" | \"perm_denied.screenshare.chrome.message\" | \"perm_denied.audio.safari.message\" | \"perm_denied.video.safari.message\" | \"perm_denied.screenshare.safari.message\" | \"perm_denied.audio.edge.message\" | \"perm_denied.video.edge.message\" | \"perm_denied.screenshare.edge.message\" | \"perm_denied.audio.microsoft edge.message\" | \"perm_denied.video.microsoft edge.message\" | \"perm_denied.screenshare.microsoft edge.message\" | \"perm_denied.audio.firefox.message\" | \"perm_denied.video.firefox.message\" | \"perm_denied.screenshare.firefox.message\" | \"perm_denied.audio.others.message\" | \"perm_denied.video.others.message\" | \"perm_denied.screenshare.others.message\" | \"perm_sys_denied\" | \"perm_sys_denied.audio\" | \"perm_sys_denied.video\" | \"perm_sys_denied.screenshare\" | \"perm_sys_denied.audio.macos.message\" | \"perm_sys_denied.video.macos.message\" | \"perm_sys_denied.screenshare.macos.message\" | \"perm_sys_denied.audio.ios.message\" | \"perm_sys_denied.video.ios.message\" | \"perm_sys_denied.screenshare.ios.message\" | \"perm_sys_denied.audio.windows.message\" | \"perm_sys_denied.video.windows.message\" | \"perm_sys_denied.screenshare.windows.message\" | \"perm_sys_denied.audio.android.message\" | \"perm_sys_denied.video.android.message\" | \"perm_sys_denied.screenshare.android.message\" | \"perm_sys_denied.audio.others.message\" | \"perm_sys_denied.video.others.message\" | \"perm_sys_denied.screenshare.others.message\" | \"perm_could_not_start\" | \"perm_could_not_start.audio\" | \"perm_could_not_start.video\" | \"perm_could_not_start.screenshare\" | \"perm_could_not_start.audio.message\" | \"perm_could_not_start.video.message\" | \"perm_could_not_start.screenshare.message\" | \"full_screen\" | \"full_screen.exit\" | \"waitlist.header_title\" | \"waitlist.body_text\" | \"waitlist.deny_request\" | \"waitlist.accept_request\" | \"waitlist.accept_all\" | \"stage_request.header_title\" | \"stage_request.deny_request\" | \"stage_request.accept_request\" | \"stage_request.accept_all\" | \"stage_request.deny_all\" | \"stage_request.approval_pending\" | \"stage_request.denied\" | \"stage_request.request\" | \"stage_request.requested\" | \"stage_request.cancel_request\" | \"stage_request.leave_stage\" | \"stage_request.request_tip\" | \"stage_request.leave_tip\" | \"stage_request.pending_tip\" | \"stage_request.denied_tip\" | \"stage.empty_host\" | \"stage.empty_host_summary\" | \"stage.empty_viewer\" | \"stage.remove_from_stage\" | \"stage.invited_notification\" | \"stage.add_to_stage\" | \"stage.join_title\" | \"stage.join_summary\" | \"stage.join_cancel\" | \"stage.join_confirm\" | \"setup_screen.join_in_as\" | \"setup_screen.your_name\" | \"stage.reconnecting\" | \"recording.label\" | \"recording.indicator\" | \"recording.started\" | \"recording.stopped\" | \"recording.paused\" | \"recording.error.start\" | \"recording.error.stop\" | \"recording.error.resume\" | \"recording.start\" | \"recording.stop\" | \"recording.resume\" | \"recording.starting\" | \"recording.stopping\" | \"recording.loading\" | \"recording.idle\" | \"audio_playback\" | \"audio_playback.title\" | \"audio_playback.description\" | \"breakout_rooms\" | \"breakout_rooms.room_config_header\" | \"breakout_rooms.join_breakout_header\" | \"breakout_rooms.empty\" | \"breakout_rooms.delete\" | \"breakout_rooms.switch\" | \"breakout_rooms.main_room\" | \"breakout_rooms.shuffle_participants\" | \"breakout_rooms.deselect\" | \"breakout_rooms.selected\" | \"breakout_rooms.num_of_rooms\" | \"breakout_rooms.approx\" | \"breakout_rooms.participants_per_room\" | \"breakout_rooms.division_text\" | \"breakout_rooms.start_breakout\" | \"breakout_rooms.close_breakout\" | \"breakout_rooms.update_breakout\" | \"breakout_rooms.discard_changes\" | \"breakout_rooms.room\" | \"breakout_rooms.rooms\" | \"breakout_rooms.room_name\" | \"breakout_rooms.edit_room_name\" | \"breakout_rooms.save_room_name\" | \"breakout_rooms.add_room\" | \"breakout_rooms.add_room_brief\" | \"breakout_rooms.select_all\" | \"breakout_rooms.unassign_all\" | \"breakout_rooms.assign\" | \"breakout_rooms.assign_participants\" | \"breakout_rooms.none_assigned\" | \"breakout_rooms.drag_drop_participants\" | \"breakout_rooms.click_drop_participants\" | \"breakout_rooms.status.assign_multiple\" | \"breakout_rooms.status.select_room\" | \"breakout_rooms.ephemeral_status.participants_assigned\" | \"breakout_rooms.ephemeral_status.participants_assigned_randomly\" | \"breakout_rooms.ephemeral_status.changes_discarded\" | \"breakout_rooms.confirm_modal.start_breakout.header\" | \"breakout_rooms.confirm_modal.start_breakout.content\" | \"breakout_rooms.confirm_modal.start_breakout.cancelText\" | \"breakout_rooms.confirm_modal.start_breakout.ctaText\" | \"breakout_rooms.confirm_modal.close_breakout.header\" | \"breakout_rooms.confirm_modal.close_breakout.content\" | \"breakout_rooms.confirm_modal.close_breakout.ctaText\" | \"breakout_rooms.move_reason.started_msg\" | \"breakout_rooms.move_reason.started_desc\" | \"breakout_rooms.move_reason.closed_msg\" | \"breakout_rooms.move_reason.closed_desc\" | \"breakout_rooms.move_reason.switch_room\" | \"breakout_rooms.move_reason.switch_main_room\" | \"breakout_rooms.all_assigned\" | \"breakout_rooms.empty_main_room\" | \"breakout_rooms.leave_confirmation\" | \"breakout_rooms.leave_confirmation.main_room_btn\" | \"ai\" | \"ai.meeting_ai\" | \"ai.home\" | \"ai.transcriptions\" | \"ai.personal\" | \"ai.caption_view\" | \"ai.chat.tooltip\" | \"ai.chat.summerise\" | \"ai.chat.agenda\" | \"search.could_not_find\" | \"search.empty\" | \"end.all\" | \"ended.rejected\" | \"ended.left\" | \"ended.kicked\" | \"ended.disconnected\" | \"ended.network\" | \"ended.unauthorized\" | \"network\" | \"network.reconnecting\" | \"network.delay_extended\" | \"network.disconnected\" | \"network.leaving\" | \"network.restored\" | \"network.delay\" | \"network.lost\" | \"network.lost_extended\" | \"livestream\" | \"livestream.indicator\" | \"livestream.skip\" | \"livestream.idle\" | \"livestream.starting\" | \"livestream.stopping\" | \"livestream.waiting_on_manual_ingestion\" | \"livestream.error.not_supported\" | \"livestream.error.not_found\" | \"livestream.error.unknown\" | \"livestream.error.sync\" | \"livestream.error.start\" | \"livestream.error.stop\" | \"livestream.go_live\" | \"livestream.end_live\" | \"livestream.error\" | \"cta.help\" | \"cta.continue\" | \"cta.reload\" | \"cta.confirmation\" | \"cta.system_settings\" | \"remote_access.empty\" | \"remote_access.requests\" | \"remote_access.allow\" | \"remote_access.grant\" | \"remote_access.indicator\" | \"chat.new\" | \"chat.max_limit_warning\" | \"chat.rate_limit_error\" | \"chat.new_channel\" | \"chat.channel_name\" | \"chat.member_name\" | \"chat.add_members\" | \"chat.delete_msg\" | \"chat.edit_msg\" | \"chat.send_msg\" | \"chat.send_attachment\" | \"chat.send_img\" | \"chat.send_file\" | \"chat.send_emoji\" | \"chat.update_msg\" | \"chat.channel_members\" | \"chat.img.loading\" | \"chat.error.img_not_found\" | \"chat.error.empty_results\" | \"chat.img.shared_by\" | \"chat.reply\" | \"chat.message_placeholder\" | \"chat.click_to_send\" | \"chat.search_msgs\" | \"chat.search_conversations\" | \"chat.start_conversation\" | \"chat.empty_search\" | \"chat.empty_channel\" | \"chat.cancel_upload\" | \"chat.view_chats\" | \"chat.everyone\" | \"chat.pinned_msgs\" | \"chat.toggle_pinned_msgs\" | \"date.today\" | \"date.yesteday\" | \"date.sunday\" | \"date.monday\" | \"date.tuesday\" | \"date.wednesday\" | \"date.thursday\" | \"date.friday\" | \"date.saturday\" | \"list.empty\" | \"grid.listening\" | \"transcript.off\" | \"transcript.on\" | \"settings.notification_sound\" | \"settings.microphone_input\" | \"settings.speaker_output\" | \"settings.mirror_video\" | \"settings.camera_off\" | \"dialog.close\" | \"notifications.joined\" | \"notifications.left\" | \"notifications.requesting_to_join_meeting\" | \"notifications.requested_to_join_stage\" | \"notifications.joined_stage\" | \"notifications.request_to_join_accepted\" | \"notifications.request_to_join_rejected\" | \"notifications.accept\" | \"notifications.new_poll_created_by\" | \"notifications.connected_to\" | \"notifications.plugin_switched_to\" | \"notifications.remote_control_requested\" | \"notifications.remote_control_request_sent\" | \"notifications.remote_control_request_accepted\" | \"notifications.remote_control_granted\" | \"notifications.remote_control_terminated\" | \"debugger.troubleshooting.label\" | \"debugger.quality.good\" | \"debugger.quality.average\" | \"debugger.quality.poor\" | \"debugger.stats.bitrate.label\" | \"debugger.stats.bitrate.description\" | \"debugger.stats.packet_loss.label\" | \"debugger.stats.packet_loss.description\" | \"debugger.stats.jitter.label\" | \"debugger.stats.jitter.description\" | \"debugger.stats.cpu_limitations.label\" | \"debugger.stats.cpu_limitations.description\" | \"debugger.stats.bandwidth_limitations.label\" | \"debugger.stats.bandwidth_limitations.description\" | \"debugger.audio.label\" | \"debugger.audio.troubleshooting.label\" | \"debugger.audio.messages.generating_report\" | \"debugger.audio.messages.enable_media\" | \"debugger.audio.sections.network_media\" | \"debugger.video.label\" | \"debugger.video.troubleshooting.label\" | \"debugger.video.messages.generating_report\" | \"debugger.video.messages.enable_media\" | \"debugger.video.sections.network_media\" | \"debugger.screenshare.label\" | \"debugger.screenshare.troubleshooting.label\" | \"debugger.screenshare.sections.network_media\" | \"debugger.screenshare.messages.generating_report\" | \"debugger.screenshare.messages.enable_media\" | \"debugger.system.label\" | \"debugger.system.troubleshooting.label\" | \"debugger.system.sections.battery\" | \"debugger.system.battery.level.label\" | \"debugger.system.battery.level.description\" | \"debugger.system.battery.charging.label\" | \"debugger.system.battery.charging.description\" | \"debugger.system.battery.charging.is_charging\" | \"debugger.system.battery.charging.is_not_charging\") => string",
                    "references": {
                        "RtkI18n": {
                            "location": "import",
                            "path": "../../exports",
                            "id": "src/exports.ts::RtkI18n"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Language"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "useLanguage()"
            },
            "viewAs": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'dropdown' | 'list'",
                    "resolved": "\"dropdown\" | \"list\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Render as dropdown or list (default = list)"
                },
                "getter": false,
                "setter": false,
                "attribute": "view-as",
                "reflect": false,
                "defaultValue": "'list'"
            }
        };
    }
    static get states() {
        return {
            "searchQuery": {},
            "showDropdown": {}
        };
    }
    static get events() {
        return [{
                "method": "channelChange",
                "name": "channelChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when selected channel changes"
                },
                "complexType": {
                    "original": "{\n    id: string;\n    name: string;\n    avatarUrl?: string;\n    icon?: keyof IconPack;\n    latestMessage?: string;\n    latestMessageTime?: Date;\n    unreadCount?: number;\n  }",
                    "resolved": "{ id: string; name: string; avatarUrl?: string; icon?: \"pin\" | \"disconnected\" | \"pause\" | \"chat\" | \"info\" | \"debug\" | \"add\" | \"delete\" | \"participants\" | \"search\" | \"image\" | \"warning\" | \"dismiss\" | \"settings\" | \"pip_on\" | \"pip_off\" | \"viewers\" | \"mic_off\" | \"mic_on\" | \"minimize\" | \"maximize\" | \"video_off\" | \"video_on\" | \"breakout_rooms\" | \"copy\" | \"play\" | \"people\" | \"people_checked\" | \"poll\" | \"rocket\" | \"call_end\" | \"share\" | \"share_screen_start\" | \"share_screen_stop\" | \"share_screen_person\" | \"clock\" | \"send\" | \"more_vertical\" | \"chevron_down\" | \"chevron_up\" | \"chevron_left\" | \"chevron_right\" | \"wifi\" | \"speaker\" | \"speaker_off\" | \"download\" | \"full_screen_maximize\" | \"full_screen_minimize\" | \"attach\" | \"emoji_multiple\" | \"image_off\" | \"wand\" | \"recording\" | \"subtract\" | \"stop_recording\" | \"pin_off\" | \"spinner\" | \"shuffle\" | \"edit\" | \"back\" | \"save\" | \"web\" | \"checkmark\" | \"spotlight\" | \"join_stage\" | \"leave_stage\" | \"signal_1\" | \"signal_2\" | \"signal_3\" | \"signal_4\" | \"signal_5\" | \"start_livestream\" | \"stop_livestream\" | \"devices\" | \"horizontal_dots\" | \"ai_sparkle\" | \"meeting_ai\" | \"create_channel\" | \"create_channel_illustration\" | \"captionsOn\" | \"captionsOff\" | \"fastForward\"; latestMessage?: string; latestMessageTime?: Date; unreadCount?: number; }",
                    "references": {
                        "IconPack": {
                            "location": "import",
                            "path": "../../exports",
                            "id": "src/exports.ts::IconPack"
                        },
                        "Date": {
                            "location": "global",
                            "id": "global::Date"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "$el"; }
}
__decorate([
    SyncWithStore()
], RtkChannelSelectorView.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkChannelSelectorView.prototype, "t", void 0);
