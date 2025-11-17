import { p as proxyCustomElement, H, d as createEvent, h } from './p-c3592601.js';
import { p as provideRtkDesignSystem, d as deepMerge } from './p-d4ada89c.js';
import { u as uiStore, h as useLanguage, c as createDefaultConfig, e as defaultIconPack, b as createPeerStore } from './p-74e01969.js';
import { R as Render } from './p-60fdbd75.js';
import { g as generateConfig } from './p-66cf8c03.js';
import './p-a83ccdbd.js';
import { i as index } from './p-f47d4fe8.js';
import { d as defineCustomElement$S } from './p-4e9d44f6.js';
import { d as defineCustomElement$R } from './p-b0a32a7d.js';
import { d as defineCustomElement$Q } from './p-17453290.js';
import { d as defineCustomElement$P } from './p-f6995a6b.js';
import { d as defineCustomElement$O } from './p-92f160e9.js';
import { d as defineCustomElement$N } from './p-1391bef0.js';
import { d as defineCustomElement$M } from './p-30b81dcd.js';
import { d as defineCustomElement$L } from './p-8336535d.js';
import { d as defineCustomElement$K } from './p-cb7f0abe.js';
import { d as defineCustomElement$J } from './p-632e7c39.js';
import { d as defineCustomElement$I } from './p-2e03f6fa.js';
import { d as defineCustomElement$H } from './p-ac49fc4f.js';
import { d as defineCustomElement$G } from './p-f5c29229.js';
import { d as defineCustomElement$F } from './p-08f6162d.js';
import { d as defineCustomElement$E } from './p-96baedfe.js';
import { d as defineCustomElement$D } from './p-0c5aab6d.js';
import { d as defineCustomElement$C } from './p-1740eeb4.js';
import { d as defineCustomElement$B } from './p-61a18b1f.js';
import { d as defineCustomElement$A } from './p-60025dc2.js';
import { d as defineCustomElement$z } from './p-84847c17.js';
import { d as defineCustomElement$y } from './p-55f81a3e.js';
import { d as defineCustomElement$x } from './p-be80c5b1.js';
import { d as defineCustomElement$w } from './p-a34d743e.js';
import { d as defineCustomElement$v } from './p-dc9eb0c2.js';
import { d as defineCustomElement$u } from './p-31ccb362.js';
import { d as defineCustomElement$t } from './p-f45ceaa6.js';
import { d as defineCustomElement$s } from './p-c8b8a942.js';
import { d as defineCustomElement$r } from './p-25a4363c.js';
import { d as defineCustomElement$q } from './p-63b4ff6e.js';
import { d as defineCustomElement$p } from './p-27f15618.js';
import { d as defineCustomElement$o } from './p-4a4c2102.js';
import { d as defineCustomElement$n } from './p-3b29dda1.js';
import { d as defineCustomElement$m } from './p-4a792ea5.js';
import { d as defineCustomElement$l } from './p-e891d522.js';
import { d as defineCustomElement$k } from './p-d3c93bcf.js';
import { d as defineCustomElement$j } from './p-654f389d.js';
import { d as defineCustomElement$i } from './p-c2d72f31.js';
import { d as defineCustomElement$h } from './p-f5f0b499.js';
import { d as defineCustomElement$g } from './p-919e71b8.js';
import { d as defineCustomElement$f } from './p-5205ea87.js';
import { d as defineCustomElement$e } from './p-a9d80b81.js';
import { d as defineCustomElement$d } from './p-de20d057.js';
import { d as defineCustomElement$c } from './p-d1fe3ce0.js';
import { d as defineCustomElement$b } from './p-3ae9e606.js';
import { d as defineCustomElement$a } from './p-e41c8029.js';
import { d as defineCustomElement$9 } from './p-ba531eb3.js';
import { d as defineCustomElement$8 } from './p-ff8e5929.js';
import { d as defineCustomElement$7 } from './p-866a285b.js';
import { d as defineCustomElement$6 } from './p-a59a9c97.js';
import { d as defineCustomElement$5 } from './p-262377bc.js';
import { d as defineCustomElement$4 } from './p-317b41b0.js';
import { d as defineCustomElement$3 } from './p-3570bda3.js';
import { d as defineCustomElement$2 } from './p-03bdc4c0.js';

const sm = 640;
const md = 768;
const lg = 1080;
const xl = 2160;
const breakpoints = {
	sm: sm,
	md: md,
	lg: lg,
	xl: xl
};

/**
 * Get the screen breakpoint from a given width
 * @param width The width of the container
 * @returns The screen breakpoint value
 */
const getSize = (width) => {
    if (width >= breakpoints.lg)
        return 'lg';
    else if (width >= breakpoints.md)
        return 'md';
    else
        return 'sm';
};

const rtkMeetingCss = ":host{line-height:initial;font-family:var(--rtk-font-family, sans-serif);font-feature-settings:normal;font-variation-settings:normal}p{margin:var(--rtk-space-0, 0px);padding:var(--rtk-space-0, 0px)}:host{box-sizing:border-box;display:flex;flex-direction:column;--tw-bg-opacity:1;background-color:rgba(var(--rtk-colors-background-1000, 8 8 8) / var(--tw-bg-opacity));color:rgb(var(--rtk-colors-text-900, 255 255 255 / 0.88));overflow:hidden;position:fixed;top:var(--rtk-space-0, 0px);right:var(--rtk-space-0, 0px);bottom:var(--rtk-space-0, 0px);left:var(--rtk-space-0, 0px);height:100%;width:100%}:host([mode='fill']){position:relative}";
const RtkMeetingStyle0 = rtkMeetingCss;

const RtkMeeting$1 = /*@__PURE__*/ proxyCustomElement(class RtkMeeting extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.statesUpdate = createEvent(this, "rtkStatesUpdate", 7);
        /** Since RtkMeeting by design works as a provider for component, to be in sync with other providers, added provider id */
        this.providerId = 'provider-' + Math.floor(Math.random() * 100);
        this.roomJoinedListener = () => {
            this.updateStates({ meeting: 'joined' });
        };
        this.waitlistedListener = () => {
            this.updateStates({ meeting: 'waiting' });
        };
        this.roomLeftListener = ({ state }) => {
            // Let socketConnectionUpdate listener handle this case.
            if (state === 'disconnected' || state === 'failed')
                return;
            this.updateStates({ meeting: 'ended', roomLeftState: state });
        };
        this.mediaPermissionUpdateListener = ({ kind, message }) => {
            if (['audio', 'video'].includes(kind)) {
                if ((message === 'DENIED' || message === 'SYSTEM_DENIED') &&
                    (this.peerStore || uiStore).state.states.activeDebugger !== true) {
                    const permissionModalSettings = {
                        enabled: true,
                        kind,
                    };
                    this.updateStates({ activePermissionsMessage: permissionModalSettings });
                }
            }
        };
        this.socketConnectionUpdateListener = ({ state }) => {
            if (state === 'failed') {
                setTimeout(() => {
                    this.meeting.leave('disconnected');
                }, this.leaveRoomTimer);
            }
        };
        this.peerStore = null; // peer specific store for this meeting peer instance
        /** Whether to load config from preset */
        this.loadConfigFromPreset = false;
        /** Whether to apply the design system on the document root from config */
        this.applyDesignSystem = false;
        /** Fill type */
        this.mode = 'fixed';
        /** Whether participant should leave when this component gets unmounted */
        this.leaveOnUnmount = false;
        /** Language */
        this.t = useLanguage();
        /** UI Config */
        this.config = createDefaultConfig();
        /** Grid layout */
        this.gridLayout = 'row';
        /** Icon pack */
        this.iconPack = defaultIconPack;
        this.handleChangingMeeting = (destinationMeetingId) => {
            const currentStates = (this.peerStore || uiStore).state.states;
            this.updateStates({
                activeBreakoutRoomsManager: Object.assign(Object.assign({}, currentStates.activeBreakoutRoomsManager), { destinationMeetingId }),
            });
        };
    }
    connectedCallback() {
        var _a;
        if (typeof window !== 'undefined') {
            this.authErrorListener = (ev) => {
                if (ev.detail.message.includes('401')) {
                    this.updateStates({ meeting: 'ended', roomLeftState: 'unauthorized' });
                }
            };
            window.addEventListener('rtkError', this.authErrorListener);
        }
        // Initialize default values
        this.leaveRoomTimer = 10000;
        this.loadConfigFromPreset = true;
        this.applyDesignSystem = true;
        // Setup event listeners
        this.setupStoreRequestListener();
        this.setupStateUpdateListener();
        this.meetingChanged(this.meeting);
        this.iconPackChanged(this.iconPack);
        this.tChanged(this.t);
        this.configChanged(this.config);
        this.resizeObserver = new index(() => this.handleResize());
        this.resizeObserver.observe(this.host);
        if (this.applyDesignSystem &&
            ((_a = this.config) === null || _a === void 0 ? void 0 : _a.designTokens) != null &&
            typeof document !== 'undefined' &&
            (this.peerStore || uiStore).state.states.activeDebugger !== true) {
            provideRtkDesignSystem(document.documentElement, this.config.designTokens);
        }
    }
    disconnectedCallback() {
        var _a;
        if (this.leaveOnUnmount) {
            (_a = this.meeting) === null || _a === void 0 ? void 0 : _a.leaveRoom();
        }
        this.resizeObserver.disconnect();
        window.removeEventListener('rtkError', this.authErrorListener);
        // Remove event listeners
        if (this.storeRequestListener) {
            this.host.removeEventListener('rtkRequestStore', this.storeRequestListener);
            this.storeRequestListener = null;
        }
        if (this.stateUpdateListener) {
            this.host.removeEventListener('rtkStateUpdate', this.stateUpdateListener);
            this.stateUpdateListener = null;
        }
        // Clear meeting listeners
        if (this.meeting) {
            this.clearListeners(this.meeting);
        }
    }
    setupStoreRequestListener() {
        // Remove existing listener if any
        if (this.storeRequestListener) {
            this.host.removeEventListener('rtkRequestStore', this.storeRequestListener);
        }
        // Listen for store requests from child components
        this.storeRequestListener = (event) => {
            // Provide peer specific store if available, otherwise fall back to global store
            if (!this.peerStore)
                return;
            const storeToProvide = this.peerStore;
            const responseEvent = new CustomEvent('rtkProvideStore', {
                detail: { store: storeToProvide, requestId: event.detail.requestId },
            });
            document.dispatchEvent(responseEvent);
            // Stop the event from bubbling further to prevent other meetings from handling it
            event.stopPropagation();
        };
        this.host.addEventListener('rtkRequestStore', this.storeRequestListener);
    }
    setupStateUpdateListener() {
        if (this.stateUpdateListener) {
            this.host.removeEventListener('rtkStateUpdate', this.stateUpdateListener);
        }
        this.stateUpdateListener = (event) => {
            const eventTarget = event.target;
            if (!this.host.contains(eventTarget)) {
                return;
            }
            this.updateStates(event.detail);
        };
        this.host.addEventListener('rtkStateUpdate', this.stateUpdateListener);
    }
    clearListeners(meeting) {
        if (!meeting)
            return;
        meeting.self.removeListener('roomLeft', this.roomLeftListener);
        meeting.self.removeListener('roomJoined', this.roomJoinedListener);
        meeting.self.removeListener('waitlisted', this.waitlistedListener);
        meeting.self.removeListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
        meeting.meta.removeListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
    }
    meetingChanged(meeting) {
        var _a, _b;
        if (!meeting)
            return;
        // Create peer specific store for this meeting peer instance
        if (meeting) {
            this.peerStore = createPeerStore({
                meeting,
                config: this.config,
                iconPack: this.iconPack,
                t: this.t,
                providerId: this.providerId,
            });
            // Notify components that peer specific store is now available
            document.dispatchEvent(new CustomEvent('rtkPeerStoreReady', {
                detail: {
                    peerId: meeting.self.id,
                },
            }));
        }
        else {
            this.peerStore = null;
        }
        this.updateStates({ viewType: meeting.meta.viewType });
        if (this.loadConfigFromPreset && meeting.self.config != null) {
            const theme = meeting.self.config;
            const { config, data } = generateConfig(theme, meeting);
            this.config = config;
            if (this.showSetupScreen == null) {
                this.showSetupScreen = data.showSetupScreen;
            }
            if (meeting.connectedMeetings.supportsConnectedMeetings &&
                ((_a = (this.peerStore || uiStore).state.states.activeBreakoutRoomsManager) === null || _a === void 0 ? void 0 : _a.destinationMeetingId)) {
                this.showSetupScreen = false;
            }
        }
        if (this.applyDesignSystem &&
            ((_b = this.config) === null || _b === void 0 ? void 0 : _b.designTokens) != null &&
            typeof document !== 'undefined' &&
            (this.peerStore || uiStore).state.states.activeDebugger !== true) {
            provideRtkDesignSystem(document.documentElement, this.config.designTokens);
        }
        meeting.self.addListener('roomJoined', this.roomJoinedListener);
        meeting.self.addListener('waitlisted', this.waitlistedListener);
        meeting.self.addListener('roomLeft', this.roomLeftListener);
        meeting.self.addListener('mediaPermissionUpdate', this.mediaPermissionUpdateListener);
        meeting.meta.addListener('socketConnectionUpdate', this.socketConnectionUpdateListener);
        if (meeting.connectedMeetings.supportsConnectedMeetings) {
            meeting.connectedMeetings.once('changingMeeting', this.handleChangingMeeting);
        }
        if (meeting.self.roomJoined) {
            this.updateStates({ meeting: 'joined' });
        }
        else {
            if (this.showSetupScreen) {
                this.updateStates({ meeting: 'setup' });
            }
            else {
                meeting.joinRoom();
            }
        }
        window.removeEventListener('rtkError', this.authErrorListener);
    }
    iconPackChanged(newIconPack) {
        if (this.peerStore) {
            this.peerStore.state.iconPack = newIconPack;
        }
    }
    tChanged(newT) {
        if (this.peerStore) {
            this.peerStore.state.t = newT;
        }
    }
    configChanged(config) {
        if (this.peerStore) {
            this.peerStore.state.config = config;
        }
        if ((config === null || config === void 0 ? void 0 : config.designTokens) &&
            typeof document !== 'undefined' &&
            (this.peerStore || uiStore).state.states.activeDebugger !== true) {
            provideRtkDesignSystem(document.documentElement, config.designTokens);
        }
    }
    handleResize() {
        this.size = getSize(this.host.clientWidth);
    }
    updateStates(states) {
        // Use peer specific store if available, otherwise fall back to global store
        const targetStore = this.peerStore || uiStore;
        const newStates = Object.assign({}, targetStore.state.states);
        targetStore.state.states = deepMerge(newStates, states);
        // Emit unscoped event for backward compatibility
        this.statesUpdate.emit(targetStore.state.states);
        // Also emit a scoped event that only this meeting's components should listen to
        const scopedEvent = new CustomEvent('rtkStatesUpdate', {
            detail: targetStore.state.states,
            bubbles: true,
            composed: true,
        });
        this.host.dispatchEvent(scopedEvent);
    }
    render() {
        const defaults = {
            meeting: this.meeting,
            size: this.size,
            states: (this.peerStore || uiStore).state.states,
            config: this.config || createDefaultConfig(),
            iconPack: this.iconPack,
            t: this.t,
        };
        if ((this.peerStore || uiStore).state.states.viewType === 'CHAT') {
            return h("rtk-chat", Object.assign({}, defaults));
        }
        const elementProps = {
            'rtk-grid': {
                layout: this.gridLayout,
            },
        };
        return h(Render, { element: "rtk-meeting", defaults: defaults, asHost: true, elementProps: elementProps });
    }
    get host() { return this; }
    static get watchers() { return {
        "meeting": ["meetingChanged"],
        "iconPack": ["iconPackChanged"],
        "t": ["tChanged"],
        "config": ["configChanged"]
    }; }
    static get style() { return RtkMeetingStyle0; }
}, [1, "rtk-meeting", {
        "loadConfigFromPreset": [1028, "load-config-from-preset"],
        "applyDesignSystem": [1028, "apply-design-system"],
        "mode": [513],
        "leaveOnUnmount": [4, "leave-on-unmount"],
        "meeting": [16],
        "showSetupScreen": [1028, "show-setup-screen"],
        "t": [16],
        "config": [1040],
        "size": [1537],
        "gridLayout": [1, "grid-layout"],
        "iconPack": [16]
    }, undefined, {
        "meeting": ["meetingChanged"],
        "iconPack": ["iconPackChanged"],
        "t": ["tChanged"],
        "config": ["configChanged"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["rtk-meeting", "rtk-avatar", "rtk-breakout-room-manager", "rtk-breakout-room-participants", "rtk-breakout-rooms-manager", "rtk-broadcast-message-modal", "rtk-button", "rtk-channel-creator", "rtk-channel-details", "rtk-channel-header", "rtk-channel-selector-view", "rtk-chat", "rtk-chat-composer-view", "rtk-chat-message", "rtk-chat-messages-ui", "rtk-chat-messages-ui-paginated", "rtk-chat-search-results", "rtk-confirmation-modal", "rtk-counter", "rtk-debugger", "rtk-debugger-audio", "rtk-debugger-screenshare", "rtk-debugger-system", "rtk-debugger-video", "rtk-dialog", "rtk-dialog-manager", "rtk-draft-attachment-view", "rtk-emoji-picker", "rtk-emoji-picker-button", "rtk-file-message", "rtk-file-message-view", "rtk-file-picker-button", "rtk-icon", "rtk-image-message", "rtk-image-message-view", "rtk-join-stage", "rtk-leave-meeting", "rtk-logo", "rtk-markdown-view", "rtk-menu", "rtk-menu-item", "rtk-menu-list", "rtk-message-view", "rtk-mute-all-confirmation", "rtk-notification", "rtk-notifications", "rtk-overlay-modal", "rtk-paginated-list", "rtk-permissions-message", "rtk-spinner", "rtk-text-composer-view", "rtk-text-message", "rtk-text-message-view", "rtk-tooltip"];
    components.forEach(tagName => { switch (tagName) {
        case "rtk-meeting":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, RtkMeeting$1);
            }
            break;
        case "rtk-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$S();
            }
            break;
        case "rtk-breakout-room-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$R();
            }
            break;
        case "rtk-breakout-room-participants":
            if (!customElements.get(tagName)) {
                defineCustomElement$Q();
            }
            break;
        case "rtk-breakout-rooms-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$P();
            }
            break;
        case "rtk-broadcast-message-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$O();
            }
            break;
        case "rtk-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$N();
            }
            break;
        case "rtk-channel-creator":
            if (!customElements.get(tagName)) {
                defineCustomElement$M();
            }
            break;
        case "rtk-channel-details":
            if (!customElements.get(tagName)) {
                defineCustomElement$L();
            }
            break;
        case "rtk-channel-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$K();
            }
            break;
        case "rtk-channel-selector-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$J();
            }
            break;
        case "rtk-chat":
            if (!customElements.get(tagName)) {
                defineCustomElement$I();
            }
            break;
        case "rtk-chat-composer-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$H();
            }
            break;
        case "rtk-chat-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$G();
            }
            break;
        case "rtk-chat-messages-ui":
            if (!customElements.get(tagName)) {
                defineCustomElement$F();
            }
            break;
        case "rtk-chat-messages-ui-paginated":
            if (!customElements.get(tagName)) {
                defineCustomElement$E();
            }
            break;
        case "rtk-chat-search-results":
            if (!customElements.get(tagName)) {
                defineCustomElement$D();
            }
            break;
        case "rtk-confirmation-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$C();
            }
            break;
        case "rtk-counter":
            if (!customElements.get(tagName)) {
                defineCustomElement$B();
            }
            break;
        case "rtk-debugger":
            if (!customElements.get(tagName)) {
                defineCustomElement$A();
            }
            break;
        case "rtk-debugger-audio":
            if (!customElements.get(tagName)) {
                defineCustomElement$z();
            }
            break;
        case "rtk-debugger-screenshare":
            if (!customElements.get(tagName)) {
                defineCustomElement$y();
            }
            break;
        case "rtk-debugger-system":
            if (!customElements.get(tagName)) {
                defineCustomElement$x();
            }
            break;
        case "rtk-debugger-video":
            if (!customElements.get(tagName)) {
                defineCustomElement$w();
            }
            break;
        case "rtk-dialog":
            if (!customElements.get(tagName)) {
                defineCustomElement$v();
            }
            break;
        case "rtk-dialog-manager":
            if (!customElements.get(tagName)) {
                defineCustomElement$u();
            }
            break;
        case "rtk-draft-attachment-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$t();
            }
            break;
        case "rtk-emoji-picker":
            if (!customElements.get(tagName)) {
                defineCustomElement$s();
            }
            break;
        case "rtk-emoji-picker-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$r();
            }
            break;
        case "rtk-file-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$q();
            }
            break;
        case "rtk-file-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$p();
            }
            break;
        case "rtk-file-picker-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$o();
            }
            break;
        case "rtk-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$n();
            }
            break;
        case "rtk-image-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$m();
            }
            break;
        case "rtk-image-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$l();
            }
            break;
        case "rtk-join-stage":
            if (!customElements.get(tagName)) {
                defineCustomElement$k();
            }
            break;
        case "rtk-leave-meeting":
            if (!customElements.get(tagName)) {
                defineCustomElement$j();
            }
            break;
        case "rtk-logo":
            if (!customElements.get(tagName)) {
                defineCustomElement$i();
            }
            break;
        case "rtk-markdown-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$h();
            }
            break;
        case "rtk-menu":
            if (!customElements.get(tagName)) {
                defineCustomElement$g();
            }
            break;
        case "rtk-menu-item":
            if (!customElements.get(tagName)) {
                defineCustomElement$f();
            }
            break;
        case "rtk-menu-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$e();
            }
            break;
        case "rtk-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$d();
            }
            break;
        case "rtk-mute-all-confirmation":
            if (!customElements.get(tagName)) {
                defineCustomElement$c();
            }
            break;
        case "rtk-notification":
            if (!customElements.get(tagName)) {
                defineCustomElement$b();
            }
            break;
        case "rtk-notifications":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "rtk-overlay-modal":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "rtk-paginated-list":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "rtk-permissions-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "rtk-spinner":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "rtk-text-composer-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "rtk-text-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "rtk-text-message-view":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "rtk-tooltip":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}
defineCustomElement$1();

const RtkMeeting = RtkMeeting$1;
const defineCustomElement = defineCustomElement$1;

export { RtkMeeting, defineCustomElement };
