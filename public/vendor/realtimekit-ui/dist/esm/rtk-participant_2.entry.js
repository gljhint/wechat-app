import { r as registerInstance, c as createEvent, h, H as Host, a as getElement } from './index-c1fb98bb.js';
import { e as defaultIconPack, h as useLanguage, c as createDefaultConfig, L as FlagsmithFeatureFlags } from './ui-store-0098d5c6.js';
import { l as lenChildren, R as Render } from './index-d31a2e33.js';
import { f as formatName, s as shorten } from './string-ed1380fb.js';
import { c as computePosition, b as autoPlacement, o as offset, s as shift, h as hide } from './floating-ui.dom.esm-21c3d54e.js';
import { S as SyncWithStore } from './index-914449da.js';
import { d as debounce } from './debounce-3ef43cb6.js';

const rtkParticipantCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{position:relative;display:flex;height:var(--rtk-space-14, 56px);align-items:center;justify-content:space-between;cursor:pointer;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}:host rtk-avatar{height:var(--rtk-space-8, 32px);width:var(--rtk-space-8, 32px);font-size:14px}.left{display:flex;align-items:center}.left>*{margin-right:var(--rtk-space-2, 8px)}.left>*:last-child{margin-right:var(--rtk-space-0, 0px)}.right{display:flex;align-items:center;justify-content:flex-end}.right>*{margin-left:var(--rtk-space-2, 8px)}.right>*:first-child{margin-left:var(--rtk-space-0, 0px)}.name{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}rtk-icon{height:var(--rtk-space-6, 24px);width:var(--rtk-space-6, 24px)}rtk-icon.red{--tw-text-opacity:1;color:rgba(var(--rtk-colors-danger, 255 45 45) / var(--tw-text-opacity))}rtk-icon.more{cursor:pointer}.menu{position:relative;display:inline-block;color:rgb(var(--rtk-colors-text-1000, 255 255 255))}#menu-list{position:absolute;z-index:20}";
const RtkParticipantStyle0 = rtkParticipantCss;

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
const RtkParticipant = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.rtkSendNotification = createEvent(this, "rtkSendNotification", 7);
        this.pinnedListener = ({ isPinned }) => {
            this.isPinned = isPinned;
        };
        this.toggleTileListener = ({ hidden }) => {
            this.isHidden = hidden;
        };
        this.stageListener = ({ stageStatus }) => {
            this.isOnStage = stageStatus === 'ON_STAGE';
        };
        /** Show participant summary */
        this.view = 'sidebar';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        /** Language */
        this.t = useLanguage();
        /** Config object */
        this.config = createDefaultConfig();
        this.audioEnabled = false;
        this.videoEnabled = false;
        this.isPinned = false;
        this.isHidden = false;
        this.isOnStage = false;
        this.canDisableParticipantAudio = false;
        this.canDisableParticipantVideo = false;
        this.canKickParticipant = false;
        this.canPinParticipant = false;
        this.canAllowParticipantOnStage = false;
        this.menuOpen = false;
        this.permissionsUpdateListener = () => {
            this.meetingChanged(this.meeting);
        };
        this.inviteToStageToggle = async () => {
            const p = this.participant;
            const { stage } = this.meeting;
            // If request has been sent once, do nothing.
            if (p.stageStatus === 'ACCEPTED_TO_JOIN_STAGE') {
                // Send a notification to host telling that the user has been invited.
                this.rtkSendNotification.emit({
                    message: `${p.name} ${this.t('stage.invited_notification')}`,
                    trace: `join-stage-${p.id}`,
                });
                return;
            }
            if (this.isOnStage) {
                // NOTE (@madhugb): when a pinned participnat is removed from stage, we need to unpin them manually
                if (p.isPinned)
                    p.unpin();
                await stage.kick([p.userId]);
            }
            else {
                await stage.grantAccess([p.userId]);
                // Send a notification to host telling that the user has been invited.
                this.rtkSendNotification.emit({
                    message: `${p.name} ${this.t('stage.invited_notification')}`,
                    trace: `join-stage-invite-${p.id}`,
                });
            }
            this.isOnStage = p.stageStatus === 'ON_STAGE';
        };
        this.handleOutsideClick = (event) => {
            const path = event.composedPath();
            const clickedOutside = !path.includes(this.host);
            // handles clicking on other menu triggers
            if (clickedOutside && this.menuOpen) {
                this.menuOpen = false;
            }
        };
        this.update = () => {
            const triggerEl = this.host.shadowRoot.getElementById('trigger');
            const menuListEl = this.host.shadowRoot.getElementById('menu-list');
            computePosition(triggerEl, menuListEl, {
                placement: 'bottom-end', // Default placement
                middleware: [
                    autoPlacement({
                        allowedPlacements: ['bottom-end', 'top-end'], // Prioritize bottom alignment
                        alignment: 'end', // Align to start of the trigger
                    }),
                    offset(4), // Add space between the trigger and menu
                    shift({ padding: 8 }), // Adjust if the menu is too close to the viewport edges
                    hide(),
                ],
            }).then(({ x, y, placement }) => {
                let position = null;
                if (placement === 'bottom-end') {
                    position = {
                        right: `${x}px`,
                        top: `${y}px`,
                    };
                }
                else {
                    position = {
                        right: `${x}px`,
                        bottom: `${y}px`,
                    };
                }
                Object.assign(menuListEl.style, position);
            });
        };
        this.onMenuToggle = () => {
            this.menuOpen = !this.menuOpen;
            if (this.menuOpen) {
                this.update();
            }
        };
    }
    connectedCallback() {
        this.meetingChanged(this.meeting);
        this.participantChanged(this.participant);
        document.addEventListener('click', this.handleOutsideClick);
    }
    disconnectedCallback() {
        var _a;
        document.removeEventListener('click', this.handleOutsideClick);
        (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.self.permissions.removeListener('permissionsUpdate', this.permissionsUpdateListener);
        if (this.participant == null || this.participant.removeListener == undefined)
            return;
        this.audioUpdateListener &&
            this.participant.removeListener('audioUpdate', this.audioUpdateListener);
        this.videoUpdateListener &&
            this.participant.removeListener('videoUpdate', this.videoUpdateListener);
        this.participant.removeListener('pinned', this.pinnedListener);
        this.participant.removeListener('unpinned', this.pinnedListener);
        this.participant.removeListener('stageStatusUpdate', this.stageListener);
        this.participant.removeListener('toggleTile', this.toggleTileListener);
    }
    meetingChanged(meeting) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (meeting != null) {
            const { self } = meeting;
            this.canDisableParticipantAudio =
                self.permissions.canAllowParticipantAudio || self.permissions.canDisableParticipantAudio;
            this.canDisableParticipantVideo =
                self.permissions.canAllowParticipantVideo || self.permissions.canDisableParticipantVideo;
            this.canKickParticipant =
                self.permissions.kickParticipant &&
                    ((_a = this.meeting) === null || _a === void 0 ? void 0 : _a.__internals__.features.hasFeature(FlagsmithFeatureFlags.DISABLE_KICKING)) !==
                        true &&
                    (((_b = this.meeting) === null || _b === void 0 ? void 0 : _b.__internals__.features.hasFeature(FlagsmithFeatureFlags.ADMIN_CANTREMOVE_ADMIN)) !== true ||
                        ((_c = this.participant) === null || _c === void 0 ? void 0 : _c.presetName) !== 'webinar_admin');
            this.canPinParticipant = self.permissions.pinParticipant;
            this.canAllowParticipantOnStage =
                self.permissions.acceptStageRequests &&
                    self.permissions.stageEnabled &&
                    (((_d = this.meeting) === null || _d === void 0 ? void 0 : _d.__internals__.features.hasFeature(FlagsmithFeatureFlags.ADMIN_CANTREMOVE_ADMIN)) !== true ||
                        ((_e = this.participant) === null || _e === void 0 ? void 0 : _e.presetName) !== 'webinar_admin') &&
                    (((_f = this.meeting) === null || _f === void 0 ? void 0 : _f.__internals__.features.hasFeature(FlagsmithFeatureFlags.CANTINVITE_VIEWER)) !== true ||
                        ((_g = this.participant) === null || _g === void 0 ? void 0 : _g.presetName) !== 'webinar_viewer');
            meeting.self.permissions.addListener('permissionsUpdate', this.permissionsUpdateListener);
        }
    }
    participantChanged(participant) {
        var _a;
        if (participant != null) {
            this.audioEnabled = participant.audioEnabled;
            this.videoEnabled = participant.videoEnabled;
            this.isPinned = participant.isPinned;
            this.isHidden = (_a = participant.hidden) !== null && _a !== void 0 ? _a : false;
            this.isOnStage = participant.stageStatus === 'ON_STAGE';
            this.audioUpdateListener = ({ audioEnabled }) => {
                this.audioEnabled = audioEnabled;
            };
            this.videoUpdateListener = ({ videoEnabled }) => {
                this.videoEnabled = videoEnabled;
            };
            if (participant.addListener == undefined)
                return;
            participant.addListener('audioUpdate', this.audioUpdateListener);
            participant.addListener('videoUpdate', this.videoUpdateListener);
            participant.addListener('pinned', this.pinnedListener);
            participant.addListener('unpinned', this.pinnedListener);
            participant.addListener('stageStatusUpdate', this.stageListener);
            this.participant.addListener('toggleTile', this.toggleTileListener);
        }
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const isAudioRoom = ((_a = this.meeting) === null || _a === void 0 ? void 0 : _a.meta.viewType) === 'AUDIO_ROOM';
        const isSelf = ((_b = this.meeting) === null || _b === void 0 ? void 0 : _b.self.id) === this.participant.id;
        const showMenu = (this.canDisableParticipantAudio && this.audioEnabled) ||
            (this.canDisableParticipantVideo && this.videoEnabled && !isAudioRoom) ||
            this.canKickParticipant ||
            (this.canPinParticipant && this.isOnStage) ||
            this.canAllowParticipantOnStage;
        const name = formatName(((_c = this.participant) === null || _c === void 0 ? void 0 : _c.name) || '');
        // NOTE(@madhugb): Show some actions for only on stage / non-webinar participants
        // NOTE(@vaibhavshn): Update check after listeners are implemented
        const isActiveParticipant = this.isOnStage || ['GROUP_CALL', 'AUDIO_ROOM'].includes((_d = this.meeting) === null || _d === void 0 ? void 0 : _d.meta.viewType);
        const defaults = {
            meeting: this.meeting,
            size: 'sm',
            states: this.states,
            config: this.config,
            iconPack: this.iconPack,
            t: this.t,
        };
        return (h(Host, { key: '804f9c2daf473fd518c6697a51b82f5baf63fb17' }, h("div", { class: "left", key: (_e = this.participant) === null || _e === void 0 ? void 0 : _e.id }, h("rtk-avatar", { key: '98f6f1a031269f5ca6523ed38228bcb64a3fe97d', participant: this.participant, size: "sm", iconPack: this.iconPack, t: this.t }), h("p", { key: 'de05ef0806cb0e614bae951715ec263cb2271492', class: "name", title: name }, shorten(name, 16), " ", ((_f = this.meeting) === null || _f === void 0 ? void 0 : _f.self.id) === ((_g = this.participant) === null || _g === void 0 ? void 0 : _g.id) && this.t('(you)'))), this.view === 'sidebar' && (h("div", { key: '8393d899384cac8ff0e248a76f4095922f98e1cb', class: "right" }, isActiveParticipant && (h("rtk-icon", { key: '7b99b6269a101d01a8014dc4038b6bcada21203f', class: {
                red: !this.audioEnabled,
            }, icon: this.audioEnabled ? this.iconPack.mic_on : this.iconPack.mic_off })), isActiveParticipant && !isAudioRoom && (h("rtk-icon", { key: 'e6e7d7e8a50a9ad0be657b85245252300182c539', class: {
                red: !this.videoEnabled,
            }, icon: this.videoEnabled ? this.iconPack.video_on : this.iconPack.video_off })), (showMenu ||
            lenChildren({
                element: 'rtk-participant',
                defaults: defaults,
                childProps: {
                    participant: this.participant,
                },
            }) > 0) && (h("div", { key: '085e0ffe3c230ef1f21ed5de6c11ef70ccfeb69b', class: "menu" }, h("span", { key: 'ab295b485204509824a6bce511a80ec939e31fbb', id: "trigger", onClick: this.onMenuToggle }, h("rtk-button", { key: '0f0cb35c69e63ba8d8b3835cec42aba9f65dc6b8', variant: "ghost", kind: "icon", slot: "trigger" }, h("rtk-icon", { key: 'ebd5705879751573de28ddad204d8f16b055a2b9', class: "more", icon: this.iconPack.more_vertical }))), h("span", { key: '98ec81219c735d44ba36eb2e677b734cc43e478d', id: "menu-list" }, this.menuOpen && (h("rtk-menu-list", { key: '243c43eacd1c429f4c7bd2fcd24fef3983209226', iconPack: this.iconPack, t: this.t }, this.canPinParticipant && isActiveParticipant && !isAudioRoom && (h("rtk-menu-item", { key: '93b74a42b5b37fe15bcbe7a5217258c8cb2b48b9', onClick: () => {
                if (this.isPinned) {
                    this.participant.unpin();
                }
                else {
                    this.participant.pin();
                }
            }, iconPack: this.iconPack, t: this.t }, h("rtk-icon", { key: '0c1c8f6cc7b10c2fdea37f79ad0fc00cbb50f1d6', icon: this.isPinned ? this.iconPack.pin_off : this.iconPack.pin, slot: "start" }), this.isPinned ? this.t('unpin') : this.t('pin'))), isSelf && (h("rtk-menu-item", { key: 'dd4d5dff2c77f93a233a5f565d9d64fddb660c0d', iconPack: this.iconPack, t: this.t, onClick: () => {
                this.isHidden
                    ? this.participant.show()
                    : this.participant.hide();
            } }, h("rtk-icon", { key: 'fdfc1cfeca1b1c63dd27fcc31a658f1d1a8d5c17', icon: this.isHidden ? this.iconPack.minimize : this.iconPack.maximize, slot: "start" }), !this.meeting.self.hidden ? this.t('minimize') : this.t('maximize'))), this.canDisableParticipantAudio &&
            isActiveParticipant &&
            this.audioEnabled && (h("rtk-menu-item", { key: '95edf3439889a9c468acce8ef88ababef747e018', iconPack: this.iconPack, t: this.t, onClick: () => {
                this.participant.disableAudio();
            } }, h("rtk-icon", { key: '1df60ff6541717369a5c8c1fa47dcb09e2499f8d', icon: this.iconPack.mic_off, slot: "start" }), this.t('mute'))), this.canDisableParticipantVideo &&
            isActiveParticipant &&
            this.videoEnabled && (h("rtk-menu-item", { key: 'e3812a8631be2f84695b90ac80f0214a26495071', iconPack: this.iconPack, t: this.t, onClick: () => {
                this.participant.disableVideo();
            } }, h("rtk-icon", { key: '634c9c452ecd36d6c024cbb0e22a79059f4b85a6', icon: this.iconPack.video_off, slot: "start" }), this.t('participants.turn_off_video'))), this.canAllowParticipantOnStage &&
            ((_h = this.participant) === null || _h === void 0 ? void 0 : _h.id) !== ((_j = this.meeting) === null || _j === void 0 ? void 0 : _j.self.id) && (h("rtk-menu-item", { key: '3428e0c1d22f675bbec3a920670a26dd3c7c66e5', iconPack: this.iconPack, t: this.t, class: this.isOnStage ? 'red' : '', onClick: this.inviteToStageToggle }, h("rtk-icon", { key: '55cdf3825acd959945ce82b19fd69f36e26aa476', icon: this.isOnStage
                ? this.iconPack.leave_stage
                : this.iconPack.join_stage, slot: "start" }), this.isOnStage
            ? this.t('stage.remove_from_stage')
            : this.t('stage.add_to_stage'))), !isSelf && this.canKickParticipant && (h("rtk-menu-item", { key: 'affe710adb04e305b6a46b9de2d25984d6c075d6', iconPack: this.iconPack, t: this.t, class: "red", onClick: () => {
                var _a, _b;
                (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.participants.kick((_b = this.participant) === null || _b === void 0 ? void 0 : _b.id);
            } }, h("rtk-icon", { key: 'd9c55c666231f76f00dd68ce0e2bedd92462ef89', icon: this.iconPack.dismiss, slot: "start" }), this.t('kick'))), h("slot", { key: '7017ef52152b1908e93ce539f762120425e50562' }, h(Render, { key: '28c3eacd6a4572c806748a7d09a861f000430b90', element: "rtk-participant", defaults: defaults, childProps: {
                participant: this.participant,
            }, deepProps: true, onlyChildren: true })))))))))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "participant": ["participantChanged"]
    }; }
};
__decorate([
    SyncWithStore()
], RtkParticipant.prototype, "meeting", void 0);
__decorate([
    SyncWithStore()
], RtkParticipant.prototype, "states", void 0);
__decorate([
    SyncWithStore()
], RtkParticipant.prototype, "iconPack", void 0);
__decorate([
    SyncWithStore()
], RtkParticipant.prototype, "t", void 0);
__decorate([
    SyncWithStore()
], RtkParticipant.prototype, "config", void 0);
RtkParticipant.style = RtkParticipantStyle0;

const rtkVirtualizedParticipantListCss = ":host{height:100%;width:100%}";
const RtkVirtualizedParticipantListStyle0 = rtkVirtualizedParticipantListCss;

const RtkVirtualizedParticipantList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /** Items to be virtualized */
        this.items = [];
        /** Height of each item in pixels (assumed fixed) */
        this.itemHeight = 55; // Mutable so we can update it
        /** Buffer items to render before and after the visible area */
        this.bufferedItemsCount = 5;
        /** Element to render if list is empty */
        this.emptyListElement = null;
        this.visibleStart = 0; // Start of visible items
        this.visibleEnd = 0; // End of visible items
        this.containerHeight = 0; // Height of the container
        this.lastScrollTop = 0; // To track and restore scrollTop
        this.recalculatePositioning = () => {
            // Measure container height and update visible items
            this.updateContainerHeight();
            // Check for the first item height
            requestAnimationFrame(() => {
                this.updateItemHeight();
            });
        };
        this.updateContainerHeight = () => {
            if (!this.el.querySelector('.virtual-list-container').clientHeight) {
                return;
            }
            // Check for the first item height
            requestAnimationFrame(() => {
                this.updateItemHeight();
            });
            this.containerHeight = this.el.querySelector('.virtual-list-container').clientHeight;
            this.updateVisibleRange();
        };
        this.onScroll = debounce(() => {
            const scrollTop = this.el.querySelector('.virtual-list-container').scrollTop;
            if (scrollTop > this.lastScrollTop && this.visibleEnd === this.items.length) {
                return;
            }
            // Track scrollTop for resetting after re-render
            this.lastScrollTop = scrollTop;
            this.updateVisibleRange();
        });
    }
    itemsChanged() {
        this.recalculatePositioning();
    }
    componentDidLoad() {
        this.recalculatePositioning();
        // Set up the scroll event listener
        this.el.querySelector('.virtual-list-container').addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.recalculatePositioning);
    }
    componentDidUpdate() {
        // Update item height if it changes
        this.updateItemHeight();
    }
    disconnectedCallback() {
        // Remove event listeners to prevent memory leaks
        this.el.querySelector('.virtual-list-container').removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.recalculatePositioning);
    }
    updateVisibleRange() {
        // Get the current scroll position
        const scrollTop = this.el.querySelector('.virtual-list-container').scrollTop;
        // Calculate the start and end of visible items based on scroll position and item height
        const startIndex = Math.floor(scrollTop / this.itemHeight);
        // Calculate the number of fully visible items and include an extra one if there's a partially visible one
        const visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
        // The end index should include the buffer and partially visible item
        const endIndex = Math.min(this.items.length, startIndex + visibleCount + this.bufferedItemsCount);
        // Update the visible range in the component's state
        this.visibleStart = startIndex;
        this.visibleEnd = endIndex;
        // Reset the scroll position to ensure smooth rendering
        this.el.querySelector('.virtual-list-container').scrollTop = this.lastScrollTop;
    }
    updateItemHeight() {
        // Get the first rendered item
        const firstRenderedItem = this.el.querySelector('.virtual-list-item');
        if (firstRenderedItem) {
            // Temporarily remove the height style to let the browser compute natural height
            const originalHeight = firstRenderedItem.style.height;
            firstRenderedItem.style.height = 'auto'; // Let it take natural height
            // Measure the natural height
            const naturalHeight = firstRenderedItem.getBoundingClientRect().height;
            // Reapply the original height (if needed)
            if (originalHeight) {
                firstRenderedItem.style.height = originalHeight;
            }
            // Check if the measured height differs from the current itemHeight
            if (naturalHeight && Math.floor(naturalHeight) !== Math.floor(this.itemHeight)) {
                this.itemHeight = naturalHeight;
            }
        }
    }
    renderItems() {
        // Slice the items array to only render the visible and buffered items
        const visibleItems = this.items.slice(this.visibleStart, this.visibleEnd);
        // Render each visible item at the correct position using absolute positioning
        return visibleItems.map((item, index) => {
            const itemIndex = this.visibleStart + index;
            return (h("div", { class: "virtual-list-item", key: item.id, style: {
                    position: 'absolute',
                    top: `${itemIndex * this.itemHeight}px`,
                    height: `${this.itemHeight}px`,
                    width: '100%',
                } }, this.renderItem(item, itemIndex)));
        });
    }
    render() {
        var _a;
        const totalHeight = this.items.length * this.itemHeight; // Total height of the list
        return (h("div", { key: '8928758911fd6ac3b955e727306f1ebfe19aba9b', class: "virtual-list-container", style: {
                position: 'relative',
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
            } }, h("div", { key: '4812952f05b7cbcb920cf5bfe54cd30c26cb8b0d', style: { height: `${totalHeight}px`, position: 'relative' } }, !((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) ? this.emptyListElement : this.renderItems()), h("div", { key: '0f9cd358e2d49af44765dbe560a323c9e8fa09f7', style: { height: `${this.itemHeight}px` } })));
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "items": ["itemsChanged"]
    }; }
};
RtkVirtualizedParticipantList.style = RtkVirtualizedParticipantListStyle0;

export { RtkParticipant as rtk_participant, RtkVirtualizedParticipantList as rtk_virtualized_participant_list };
