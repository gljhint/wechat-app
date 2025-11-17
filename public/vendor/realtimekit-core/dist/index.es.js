var tv = Object.defineProperty, sv = Object.defineProperties;
var rv = Object.getOwnPropertyDescriptors;
var Kc = Object.getOwnPropertySymbols, iv = Object.getPrototypeOf, Xh = Object.prototype.hasOwnProperty, Zh = Object.prototype.propertyIsEnumerable, nv = Reflect.get;
var ep = Math.pow, Zl = (s, t, e) => t in s ? tv(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, D = (s, t) => {
  for (var e in t || (t = {}))
    Xh.call(t, e) && Zl(s, e, t[e]);
  if (Kc)
    for (var e of Kc(t))
      Zh.call(t, e) && Zl(s, e, t[e]);
  return s;
}, H = (s, t) => sv(s, rv(t));
var ro = (s, t) => {
  var e = {};
  for (var r in s)
    Xh.call(s, r) && t.indexOf(r) < 0 && (e[r] = s[r]);
  if (s != null && Kc)
    for (var r of Kc(s))
      t.indexOf(r) < 0 && Zh.call(s, r) && (e[r] = s[r]);
  return e;
};
var h = (s, t, e) => (Zl(s, typeof t != "symbol" ? t + "" : t, e), e), eu = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var n = (s, t, e) => (eu(s, t, "read from private field"), e ? e.call(s) : t.get(s)), m = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, f = (s, t, e, r) => (eu(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e);
var x = (s, t, e) => (eu(s, t, "access private method"), e), tp = (s, t, e) => nv(iv(s), e, t);
var u = (s, t, e) => new Promise((r, i) => {
  var a = (d) => {
    try {
      c(e.next(d));
    } catch (l) {
      i(l);
    }
  }, o = (d) => {
    try {
      c(e.throw(d));
    } catch (l) {
      i(l);
    }
  }, c = (d) => d.done ? r(d.value) : Promise.resolve(d.value).then(a, o);
  c((e = e.apply(s, t)).next());
});
import { v4 as nn, validate as zg } from "uuid";
import Yg from "bowser";
import { MessageType as T, PbLong as io, typeofJsonValue as av } from "@protobuf-ts/runtime";
import * as nd from "worker-timers";
import * as us from "sdp-transform";
function ov(s) {
  const { length: t } = this, e = s >= 0 ? s : t + s;
  return e < 0 || e >= t ? void 0 : this[e];
}
Array.prototype.at || Object.assign(Array.prototype, { at: ov });
function cv(s) {
  const { length: t } = this, e = s >= 0 ? s : t + s;
  return e < 0 || e >= t ? void 0 : this[e];
}
String.prototype.at || Object.assign(String.prototype, { at: cv });
const dv = (s) => {
  !navigator.isReactNative && typeof window != "undefined" && (window.addEventListener("error", (t) => {
    var e;
    !((e = t.filename) != null && e.includes("localhost")) && t.lineno !== 0 && s.error(
      "window::error",
      {
        error: t.error
      },
      !0
    );
  }), window.addEventListener(
    "unhandledrejection",
    (t) => {
      var e, r, i, a, o, c, d, l;
      s.error(
        "window::unhandledrejection",
        {
          error: t == null ? void 0 : t.reason,
          /**
                             * NOTE(ravindra-cloudflare):
                             * Network calls fail a lot for clients,
                             *	tracking more info to see where
                             *	*/
          networkCall: {
            url: (r = (e = t == null ? void 0 : t.reason) == null ? void 0 : e.config) == null ? void 0 : r.url,
            baseURL: (a = (i = t == null ? void 0 : t.reason) == null ? void 0 : i.config) == null ? void 0 : a.baseURL,
            method: (c = (o = t == null ? void 0 : t.reason) == null ? void 0 : o.config) == null ? void 0 : c.method,
            status: (d = t == null ? void 0 : t.reason) == null ? void 0 : d.status,
            statusText: (l = t == null ? void 0 : t.reason) == null ? void 0 : l.statusText
          }
        },
        !0
      );
    }
  ), window.addEventListener("offline", () => {
    s.info("window::offline");
  }), window.addEventListener("online", () => {
    s.info("window::online");
  }));
}, bo = "chrome", Qg = "opera", Xg = "firefox", Zg = "iexplorer", em = "safari", tm = "nwjs", sm = "electron", rm = "react-native", hh = "unknown", yd = {
  Chrome: bo,
  Chromium: bo,
  Opera: Qg,
  Firefox: Xg,
  "Internet Explorer": Zg,
  Safari: em
};
function lv() {
  const { userAgent: s } = navigator, t = {
    name: hh,
    version: void 0
  };
  if (s.match(/Chrome/) && !s.match(/Edge/))
    if (s.match(/Edg(A?)/)) {
      const e = s.match(/Chrome\/([\d.]+)/)[1];
      Number.parseInt(e, 10) > 72 && (t.name = bo, t.version = e);
    } else
      t.name = bo, t.version = s.match(/Chrome\/([\d.]+)/)[1];
  return t;
}
function uv() {
  const { userAgent: s } = navigator;
  if (s.match(/Electron/)) {
    const t = s.match(/Electron\/([\d.]+)/)[1];
    return {
      name: sm,
      version: t
    };
  }
  return null;
}
function hv() {
  const { userAgent: s } = navigator;
  if (s.match(/JitsiMeetNW/)) {
    const t = s.match(/JitsiMeetNW\/([\d.]+)/)[1];
    return {
      name: tm,
      version: t
    };
  }
}
function pv() {
  const s = navigator.userAgent.match(
    /\b(react[ \t_-]*native)(?:\/(\S+))?/i
  );
  let t;
  if (s || navigator.product === "ReactNative")
    return s && s.length > 2 && (s[1], t = s[2]), t || (t = "unknown"), {
      name: rm,
      version: t
    };
}
function gv(s) {
  let t;
  const e = [pv, uv, hv];
  for (let i = 0; i < e.length; i += 1)
    if (t = e[i](), t)
      return t;
  const r = s.getBrowserName();
  return r in yd ? {
    name: yd[r],
    version: s.getBrowserVersion()
  } : (t = lv(), t || {
    name: hh,
    version: void 0
  });
}
class mv {
  constructor() {
    h(this, "_bowser");
    h(this, "_name");
    h(this, "_version");
    h(this, "getDeviceInfo", () => ({
      isMobile: this.isMobile(),
      browserName: this._bowser.getBrowserName(),
      osName: this._bowser.getOSName(),
      browserVersion: this._bowser.getBrowserVersion(),
      osVersionName: this._bowser.getOSVersion(),
      engineName: this._bowser.getEngineName()
    }));
  }
  /**
   * Creates new BrowserDetection instance.
   *
   * @param {Object} [browserInfo] - Information about the browser.
   * @param {string} browserInfo.name - The name of the browser.
   * @param {string} browserInfo.version - The version of the browser.
   */
  init(t) {
    let e, r;
    if (this._bowser = Yg.getParser(navigator.userAgent), typeof t == "undefined") {
      const i = gv(this._bowser);
      e = i.name, r = i.version;
    } else
      t.name in yd ? (e = yd[t.name], r = t.version) : (e = hh, r = void 0);
    this._name = e, this._version = r;
  }
  /**
   * Gets current browser name.
   * @returns {string}
   */
  getName() {
    return this._name;
  }
  /**
   * Checks if current browser is Chrome.
   * @returns {boolean}
   */
  isChrome() {
    return this._name === bo;
  }
  /**
   * Checks if current browser is Opera.
   * @returns {boolean}
   */
  isOpera() {
    return this._name === Qg;
  }
  /**
   * Checks if current browser is Firefox.
   * @returns {boolean}
   */
  isFirefox() {
    return this._name === Xg;
  }
  /**
   * Checks if current browser is Internet Explorer.
   * @returns {boolean}
   */
  isIExplorer() {
    return this._name === Zg;
  }
  /**
   * Checks if current browser is Safari.
   * @returns {boolean}
   */
  isSafari() {
    return this._name === em;
  }
  /**
   * Checks if current environment is NWJS.
   * @returns {boolean}
   */
  isNWJS() {
    return this._name === tm;
  }
  /**
   * Checks if current environment is Electron.
   * @returns {boolean}
   */
  isElectron() {
    return this._name === sm;
  }
  /**
   * Checks if current environment is React Native.
   * @returns {boolean}
   */
  isReactNative() {
    return this._name === rm || navigator.isReactNative === !0;
  }
  /**
   * Returns the version of the current browser.
   * @returns {string}
   */
  getVersion() {
    return this._version;
  }
  isMobile() {
    return this._bowser.getPlatformType() === "mobile";
  }
  /**
   * Check if the parsed browser matches the passed condition.
   *
   * @param {Object} checkTree - It's one or two layered object, which can include a
   * platform or an OS on the first layer and should have browsers specs on the
   * bottom layer.
   * Eg. { chrome: '>71.1.0' }
   *		 { windows: { chrome: '<70.2' } }
   * @returns {boolean | undefined} - Returns true if the browser satisfies the set
   * conditions, false if not and undefined when the browser is not defined in the
   * checktree object or when the current browser's version is unknown.
   * @private
   */
  _checkCondition(t) {
    if (this._version)
      return this._bowser.satisfies(t);
  }
  /**
   * Compares the passed version with the current browser version.
   *
   * @param {*} version - The version to compare with. Anything different
   * than string will be converted to string.
   * @returns {boolean|undefined} - Returns true if the current version is
   * greater than the passed version and false otherwise. Returns undefined if
   * the current browser version is unknown.
   */
  isVersionGreaterThan(t) {
    return this._checkCondition({ [this._name]: `>${t}` });
  }
  /**
   * Compares the passed version with the current browser version.
   *
   * @param {*} version - The version to compare with. Anything different
   * than string will be converted to string.
   * @returns {boolean|undefined} - Returns true if the current version is
   * lower than the passed version and false otherwise. Returns undefined if
   * the current browser version is unknown.
   */
  isVersionLessThan(t) {
    return this._checkCondition({ [this._name]: `<${t}` });
  }
  /**
   * Compares the passed version with the current browser version.
   *
   * @param {*} version - The version to compare with. Anything different
   * than string will be converted to string.
   * @returns {boolean|undefined} - Returns true if the current version is
   * equal to the passed version and false otherwise. Returns undefined if
   * the current browser version is unknown.
   * A loose-equality operator is used here so that it matches the sub-versions as well.
   */
  isVersionEqualTo(t) {
    return this._checkCondition({ [this._name]: `~${t}` });
  }
}
class fv extends mv {
  /**
   * Tells whether or not the <tt>MediaStream/tt> is removed from
   * the <tt>PeerConnection</tt> and disposed on video mute (in order to turn
   * off the camera device).
   * @return {boolean} <tt>true</tt> if the current browser supports this
   * strategy or <tt>false</tt> otherwise.
   */
  doesVideoMuteByStreamRemove() {
    return this.isChromiumBased() || this.isWebKitBased();
  }
  /**
   * Check whether or not the current browser support peer to peer connections
   * @return {boolean} <tt>true</tt> if p2p is supported or <tt>false</tt>
   * otherwise.
   */
  supportsP2P() {
    return !this.usesUnifiedPlan();
  }
  /**
   * Checks if the current browser is Chromium based, that is, it's either
   * Chrome / Chromium or uses it as its engine, but doesn't identify as
   * Chrome.
   *
   * This includes the following browsers:
   * - Chrome and Chromium
   * - Other browsers which use the Chrome engine, but are detected as Chrome,
   *	 such as Brave and Vivaldi
   * - Browsers which are NOT Chrome but use it as their engine, and have
   *	 custom detection code: Opera, Electron and NW.JS
   */
  isChromiumBased() {
    return this.isChrome() || this.isElectron() || this.isNWJS() || this.isOpera();
  }
  /**
   * Checks if the current browser is WebKit based. It's either
   * Safari or uses WebKit as its engine.
   *
   * This includes Chrome and Firefox on iOS
   *
   * @returns {boolean}
   */
  isWebKitBased() {
    return this._bowser.isEngine("webkit") && typeof navigator.mediaDevices != "undefined" && typeof navigator.mediaDevices.getUserMedia != "undefined" && typeof window.RTCRtpTransceiver != "undefined" && Object.keys(RTCRtpTransceiver.prototype).indexOf("currentDirection") > -1;
  }
  /**
   * Checks if the current browser is supported.
   *
   * @returns {boolean} true if the browser is supported, false otherwise.
   */
  isSupported() {
    return typeof RTCPeerConnection != "undefined";
  }
  /**
   * Returns whether or not the current environment needs a user interaction
   * with the page before any unmute can occur.
   *
   * @returns {boolean}
   */
  isUserInteractionRequiredForUnmute() {
    return this.isFirefox() && this.isVersionLessThan("68");
  }
  /**
   * Checks if the current browser triggers 'onmute'/'onunmute' events when
   * user's connection is interrupted and the video stops playback.
   * @returns {*|boolean} 'true' if the event is supported or 'false'
   * otherwise.
   */
  supportsVideoMuteOnConnInterrupted() {
    return this.isChromiumBased() || this.isReactNative() || this.isWebKitBased();
  }
  /**
   * Checks if the current browser reports upload and download bandwidth
   * statistics.
   * @return {boolean}
   */
  supportsBandwidthStatistics() {
    return !this.isFirefox() && !this.isWebKitBased();
  }
  /**
   * Checks if the current browser supports setting codec preferences on the transceiver.
   * @returns {boolean}
   */
  supportsCodecPreferences() {
    return this.usesUnifiedPlan() && typeof window.RTCRtpTransceiver != "undefined" && Object.keys(window.RTCRtpTransceiver.prototype).indexOf(
      "setCodecPreferences"
    ) > -1 && Object.keys(RTCRtpSender.prototype).indexOf("getCapabilities") > -1 && !this.isWebKitBased();
  }
  /**
   * Checks if the current browser support the device change event.
   * @return {boolean}
   */
  // eslint-disable-next-line class-methods-use-this
  supportsDeviceChangeEvent() {
    return navigator.mediaDevices && typeof navigator.mediaDevices.ondevicechange != "undefined" && typeof navigator.mediaDevices.addEventListener != "undefined";
  }
  /**
   * Checks if the current browser supports RTT statistics for srflx local
   * candidates through the legacy getStats() API.
   */
  supportsLocalCandidateRttStatistics() {
    return this.isChromiumBased() || this.isReactNative() || this.isWebKitBased();
  }
  /**
   * Checks if the current browser supports the Long Tasks API that lets us observe
   * performance measurement events and be notified of tasks that take longer than
   * 50ms to execute on the main thread.
   */
  supportsPerformanceObserver() {
    return typeof window.PerformanceObserver != "undefined" && PerformanceObserver.supportedEntryTypes.indexOf("longtask") > -1;
  }
  /**
   * Checks if the current browser supports audio level stats on the receivers.
   */
  supportsReceiverStats() {
    return typeof window.RTCRtpReceiver != "undefined" && Object.keys(RTCRtpReceiver.prototype).indexOf(
      "getSynchronizationSources"
    ) > -1;
  }
  /**
   * Checks if the current browser reports round trip time statistics for
   * the ICE candidate pair.
   * @return {boolean}
   */
  supportsRTTStatistics() {
    return !this.isFirefox();
  }
  /**
   * Checks if the browser uses plan B.
   *
   * @returns {boolean}
   */
  usesPlanB() {
    return !this.usesUnifiedPlan();
  }
  /**
   * Checks if the browser uses SDP munging for turning on simulcast.
   *
   * @returns {boolean}
   */
  usesSdpMungingForSimulcast() {
    return this.isChromiumBased() || this.isReactNative() || this.isWebKitBased();
  }
  /**
   * Checks if the browser uses unified plan.
   *
   * @returns {boolean}
   */
  usesUnifiedPlan() {
    return !!(this.isFirefox() || this.isWebKitBased());
  }
  /**
   * Returns whether or not the current browser should be using the new
   * getUserMedia flow, which utilizes the adapter shim. This method should
   * be temporary and used while migrating all browsers to use adapter and
   * the new getUserMedia.
   *
   * @returns {boolean}
   */
  usesNewGumFlow() {
    return !!(this.isChromiumBased() || this.isFirefox() || this.isWebKitBased());
  }
  /**
   * Checks if the browser uses webrtc-adapter. All browsers using the new
   * getUserMedia flow.
   *
   * @returns {boolean}
   */
  usesAdapter() {
    return this.usesNewGumFlow();
  }
  /**
   * Checks if the browser uses RIDs/MIDs for siganling the simulcast streams
   * to the bridge instead of the ssrcs.
   */
  usesRidsForSimulcast() {
    return !1;
  }
  /**
   * Checks if the browser supports getDisplayMedia.
   * @returns {boolean} {@code true} if the browser supports getDisplayMedia.
   */
  supportsGetDisplayMedia() {
    return typeof navigator.getDisplayMedia != "undefined" || typeof navigator.mediaDevices != "undefined" && typeof navigator.mediaDevices.getDisplayMedia != "undefined";
  }
  /**
   * Checks if the browser supports insertable streams, needed for E2EE.
   * @returns {boolean} {@code true} if the browser supports insertable streams.
   */
  supportsInsertableStreams() {
    if (!(typeof window.RTCRtpSender != "undefined" && (window.RTCRtpSender.prototype.createEncodedStreams || window.RTCRtpSender.prototype.createEncodedVideoStreams)))
      return !1;
    const t = new ReadableStream();
    try {
      return window.postMessage(t, "*", [t]), !0;
    } catch (e) {
      return !1;
    }
  }
  /**
   * Whether the browser supports the RED format for audio.
   */
  supportsAudioRed() {
    return Boolean(
      window.RTCRtpSender && window.RTCRtpSender.getCapabilities && window.RTCRtpSender.getCapabilities("audio").codecs.some(
        (t) => t.mimeType === "audio/red"
      ) && window.RTCRtpReceiver && window.RTCRtpReceiver.getCapabilities && window.RTCRtpReceiver.getCapabilities("audio").codecs.some(
        (t) => t.mimeType === "audio/red"
      )
    );
  }
  /**
   * Checks if the browser supports the "sdpSemantics" configuration option.
   * https://webrtc.org/web-apis/chrome/unified-plan/
   *
   * @returns {boolean}
   */
  supportsSdpSemantics() {
    return this.isChromiumBased();
  }
  /**
   * Returns the version of a Chromium based browser.
   *
   * @returns {Number}
   */
  _getChromiumBasedVersion() {
    if (this.isChromiumBased()) {
      if (this.isNWJS())
        return Number.parseInt(process.versions.chromium, 10);
      const t = navigator.userAgent;
      if (t.match(/Chrome/))
        return Number.parseInt(t.match(/Chrome\/([\d.]+)/)[1], 10);
    }
    return -1;
  }
  isIOSMobile() {
    return this.isMobile && this._bowser.getOSName() === "iOS";
  }
}
const ye = new fv();
var lt = {}, Sv = {
  get exports() {
    return lt;
  },
  set exports(s) {
    lt = s;
  }
}, kn = typeof Reflect == "object" ? Reflect : null, sp = kn && typeof kn.apply == "function" ? kn.apply : function(t, e, r) {
  return Function.prototype.apply.call(t, e, r);
}, ad;
kn && typeof kn.ownKeys == "function" ? ad = kn.ownKeys : Object.getOwnPropertySymbols ? ad = function(t) {
  return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t));
} : ad = function(t) {
  return Object.getOwnPropertyNames(t);
};
function vv(s) {
  console && console.warn && console.warn(s);
}
var im = Number.isNaN || function(t) {
  return t !== t;
};
function oe() {
  oe.init.call(this);
}
Sv.exports = oe;
lt.once = _v;
oe.EventEmitter = oe;
oe.prototype._events = void 0;
oe.prototype._eventsCount = 0;
oe.prototype._maxListeners = void 0;
var rp = 10;
function kl(s) {
  if (typeof s != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof s);
}
Object.defineProperty(oe, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return rp;
  },
  set: function(s) {
    if (typeof s != "number" || s < 0 || im(s))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + s + ".");
    rp = s;
  }
});
oe.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
oe.prototype.setMaxListeners = function(t) {
  if (typeof t != "number" || t < 0 || im(t))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
  return this._maxListeners = t, this;
};
function nm(s) {
  return s._maxListeners === void 0 ? oe.defaultMaxListeners : s._maxListeners;
}
oe.prototype.getMaxListeners = function() {
  return nm(this);
};
oe.prototype.emit = function(t) {
  for (var e = [], r = 1; r < arguments.length; r++)
    e.push(arguments[r]);
  var i = t === "error", a = this._events;
  if (a !== void 0)
    i = i && a.error === void 0;
  else if (!i)
    return !1;
  if (i) {
    var o;
    if (e.length > 0 && (o = e[0]), o instanceof Error)
      throw o;
    var c = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw c.context = o, c;
  }
  var d = a[t];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    sp(d, this, e);
  else
    for (var l = d.length, p = lm(d, l), r = 0; r < l; ++r)
      sp(p[r], this, e);
  return !0;
};
function am(s, t, e, r) {
  var i, a, o;
  if (kl(e), a = s._events, a === void 0 ? (a = s._events = /* @__PURE__ */ Object.create(null), s._eventsCount = 0) : (a.newListener !== void 0 && (s.emit(
    "newListener",
    t,
    e.listener ? e.listener : e
  ), a = s._events), o = a[t]), o === void 0)
    o = a[t] = e, ++s._eventsCount;
  else if (typeof o == "function" ? o = a[t] = r ? [e, o] : [o, e] : r ? o.unshift(e) : o.push(e), i = nm(s), i > 0 && o.length > i && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = s, c.type = t, c.count = o.length, vv(c);
  }
  return s;
}
oe.prototype.addListener = function(t, e) {
  return am(this, t, e, !1);
};
oe.prototype.on = oe.prototype.addListener;
oe.prototype.prependListener = function(t, e) {
  return am(this, t, e, !0);
};
function Tv() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function om(s, t, e) {
  var r = { fired: !1, wrapFn: void 0, target: s, type: t, listener: e }, i = Tv.bind(r);
  return i.listener = e, r.wrapFn = i, i;
}
oe.prototype.once = function(t, e) {
  return kl(e), this.on(t, om(this, t, e)), this;
};
oe.prototype.prependOnceListener = function(t, e) {
  return kl(e), this.prependListener(t, om(this, t, e)), this;
};
oe.prototype.removeListener = function(t, e) {
  var r, i, a, o, c;
  if (kl(e), i = this._events, i === void 0)
    return this;
  if (r = i[t], r === void 0)
    return this;
  if (r === e || r.listener === e)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete i[t], i.removeListener && this.emit("removeListener", t, r.listener || e));
  else if (typeof r != "function") {
    for (a = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === e || r[o].listener === e) {
        c = r[o].listener, a = o;
        break;
      }
    if (a < 0)
      return this;
    a === 0 ? r.shift() : yv(r, a), r.length === 1 && (i[t] = r[0]), i.removeListener !== void 0 && this.emit("removeListener", t, c || e);
  }
  return this;
};
oe.prototype.off = oe.prototype.removeListener;
oe.prototype.removeAllListeners = function(t) {
  var e, r, i;
  if (r = this._events, r === void 0)
    return this;
  if (r.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r[t] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r[t]), this;
  if (arguments.length === 0) {
    var a = Object.keys(r), o;
    for (i = 0; i < a.length; ++i)
      o = a[i], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (e = r[t], typeof e == "function")
    this.removeListener(t, e);
  else if (e !== void 0)
    for (i = e.length - 1; i >= 0; i--)
      this.removeListener(t, e[i]);
  return this;
};
function cm(s, t, e) {
  var r = s._events;
  if (r === void 0)
    return [];
  var i = r[t];
  return i === void 0 ? [] : typeof i == "function" ? e ? [i.listener || i] : [i] : e ? Ev(i) : lm(i, i.length);
}
oe.prototype.listeners = function(t) {
  return cm(this, t, !0);
};
oe.prototype.rawListeners = function(t) {
  return cm(this, t, !1);
};
oe.listenerCount = function(s, t) {
  return typeof s.listenerCount == "function" ? s.listenerCount(t) : dm.call(s, t);
};
oe.prototype.listenerCount = dm;
function dm(s) {
  var t = this._events;
  if (t !== void 0) {
    var e = t[s];
    if (typeof e == "function")
      return 1;
    if (e !== void 0)
      return e.length;
  }
  return 0;
}
oe.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ad(this._events) : [];
};
function lm(s, t) {
  for (var e = new Array(t), r = 0; r < t; ++r)
    e[r] = s[r];
  return e;
}
function yv(s, t) {
  for (; t + 1 < s.length; t++)
    s[t] = s[t + 1];
  s.pop();
}
function Ev(s) {
  for (var t = new Array(s.length), e = 0; e < t.length; ++e)
    t[e] = s[e].listener || s[e];
  return t;
}
function _v(s, t) {
  return new Promise(function(e, r) {
    function i(o) {
      s.removeListener(t, a), r(o);
    }
    function a() {
      typeof s.removeListener == "function" && s.removeListener("error", i), e([].slice.call(arguments));
    }
    um(s, t, a, { once: !0 }), t !== "error" && Pv(s, i, { once: !0 });
  });
}
function Pv(s, t, e) {
  typeof s.on == "function" && um(s, "error", t, e);
}
function um(s, t, e, r) {
  if (typeof s.on == "function")
    r.once ? s.once(t, e) : s.on(t, e);
  else if (typeof s.addEventListener == "function")
    s.addEventListener(t, function i(a) {
      r.once && s.removeEventListener(t, i), e(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof s);
}
var z;
(function(s) {
  s[s.MAJOR_EVENT = 0] = "MAJOR_EVENT", s[s.MINOR_EVENT = 1] = "MINOR_EVENT";
})(z || (z = {}));
var O;
(function(s) {
  s.PRECALL_TEST_BEGIN = "precall_begin", s.PRECALL_TEST_COMPLETE = "precall_end", s.CALL_JOIN_BEGIN = "call_join", s.NET_QUALITY_TEST_BEGIN = "net_quality_test_begin", s.NET_QUALITY_TEST_END = "net_quality_test_end", s.WEBSOCKET_CONNECTED = "websocket_connected", s.TRANSPORT_CONNECTED = "transport_connected", s.AUDIO_ON = "audio_on", s.AUDIO_OFF = "audio_off", s.VIDEO_ON = "video_on", s.VIDEO_OFF = "video_off", s.PARTICIPANT_ROLE = "participant_role", s.PING_STAT = "ping_stat", s.DISCONNECT = "disconnect", s.RECONNECT_ATTEMPT = "reconnect_attempt", s.SCREENSHARE_START_REQUESTED = "screenshare_start_requested", s.SCREENSHARE_STARTED = "screenshare_started", s.SCREENSHARE_STOPPED = "screenshare_stopped", s.TAB_CHANGE = "tab_change", s.BROWSER_BACKGROUNDED = "browser_backgrounded", s.BROWSER_FOREGROUNDED = "browser_foregrounded", s.DOMINANT_SPEAKER = "dominant_speaker", s.AUDIO_DEVICES_UPDATES = "audio_devices_updates", s.VIDEO_DEVICES_UPDATES = "video_devices_updates", s.SPEAKER_DEVICES_UPDATES = "speaker_devices_updates", s.SELECTED_MICROHPONE_UPDATE = "selected_microphone_update", s.SELECTED_CAMERA_UPDATE = "selected_camera_update", s.SELECTED_SPEAKER_UPDATE = "selected_speaker_update", s.EXPECTED_VIDEO_RESOLUTION = "expected_video_resolution", s.EXPECTED_SCREENSHARE_RESOLUTION = "expected_screenshare_resolution", s.MEDIA_PERMISSION = "media_permission", s.LEGACY_SWITCH = "legacy_switch", s.AUDIO_PLAY_FAILED = "audio_play_failed", s.VIDEO_PLAY_FAILED = "video_play_failed", s.AUDIO_TRACK_MUTED = "audio_track_muted", s.VIDEO_TRACK_MUTED = "video_track_muted", s.IVS_PLAYER_REBUFFERING = "ivs_player_rebuffering", s.IVS_PLAYER_AUDIO_BLOCKED = "ivs_player_audio_blocked", s.IVS_PLAYER_PLAYBACK_BLOCKED = "ivs_player_playback_blocked", s.IVS_PLAYER_ERROR = "ivs_player_error", s.IVS_PLAYER_RECOVERABLE_ERROR = "ivs_player_recoverable_error", s.IVS_PLAYER_WORKER_ERROR = "ivs_player_worker_error", s.IVS_PLAYER_NETWORK_UNAVAILABLE = "ivs_player_network_unavailable", s.LIVESTREAM_LATENCY = "livestream_latency", s.IVS_PLAYER_ANALYTICS_EVENT = "ivs_player_analytics_event", s.IVS_PLAYER_PLAYBACK_RATE_CHANGED = "ivs_player_playback_rate_changed", s.IVS_PLAYER_QUALITY_CHANGED = "ivs_player_quality_changed", s.IVS_PLAYER_INITIALIZED = "ivs_player_initialized";
})(O || (O = {}));
const Cv = /* @__PURE__ */ new Map([
  [O.PRECALL_TEST_BEGIN, z.MINOR_EVENT],
  [O.PRECALL_TEST_COMPLETE, z.MINOR_EVENT],
  [O.CALL_JOIN_BEGIN, z.MAJOR_EVENT],
  [O.NET_QUALITY_TEST_BEGIN, z.MINOR_EVENT],
  [O.NET_QUALITY_TEST_END, z.MINOR_EVENT],
  [O.WEBSOCKET_CONNECTED, z.MINOR_EVENT],
  [O.TRANSPORT_CONNECTED, z.MAJOR_EVENT],
  [O.AUDIO_ON, z.MINOR_EVENT],
  [O.AUDIO_OFF, z.MINOR_EVENT],
  [O.VIDEO_ON, z.MINOR_EVENT],
  [O.VIDEO_OFF, z.MINOR_EVENT],
  [O.PARTICIPANT_ROLE, z.MINOR_EVENT],
  [O.PING_STAT, z.MAJOR_EVENT],
  [O.DISCONNECT, z.MAJOR_EVENT],
  [O.RECONNECT_ATTEMPT, z.MAJOR_EVENT],
  [O.SCREENSHARE_START_REQUESTED, z.MINOR_EVENT],
  [O.SCREENSHARE_STARTED, z.MINOR_EVENT],
  [O.SCREENSHARE_STOPPED, z.MINOR_EVENT],
  [O.TAB_CHANGE, z.MINOR_EVENT],
  [O.BROWSER_BACKGROUNDED, z.MINOR_EVENT],
  [O.BROWSER_FOREGROUNDED, z.MINOR_EVENT],
  [O.DOMINANT_SPEAKER, z.MINOR_EVENT],
  [O.AUDIO_DEVICES_UPDATES, z.MINOR_EVENT],
  [O.VIDEO_DEVICES_UPDATES, z.MINOR_EVENT],
  [O.SPEAKER_DEVICES_UPDATES, z.MINOR_EVENT],
  [O.SELECTED_MICROHPONE_UPDATE, z.MINOR_EVENT],
  [O.SELECTED_CAMERA_UPDATE, z.MINOR_EVENT],
  [O.SELECTED_SPEAKER_UPDATE, z.MINOR_EVENT],
  [O.MEDIA_PERMISSION, z.MINOR_EVENT],
  [O.LEGACY_SWITCH, z.MINOR_EVENT],
  [O.AUDIO_PLAY_FAILED, z.MINOR_EVENT],
  [O.VIDEO_PLAY_FAILED, z.MINOR_EVENT],
  [O.AUDIO_TRACK_MUTED, z.MINOR_EVENT],
  [O.VIDEO_TRACK_MUTED, z.MINOR_EVENT],
  // IVS Player Events
  [O.IVS_PLAYER_REBUFFERING, z.MAJOR_EVENT],
  [O.IVS_PLAYER_AUDIO_BLOCKED, z.MAJOR_EVENT],
  [O.IVS_PLAYER_PLAYBACK_BLOCKED, z.MAJOR_EVENT],
  [O.IVS_PLAYER_ERROR, z.MAJOR_EVENT],
  [O.IVS_PLAYER_RECOVERABLE_ERROR, z.MAJOR_EVENT],
  [O.IVS_PLAYER_WORKER_ERROR, z.MAJOR_EVENT],
  [O.IVS_PLAYER_NETWORK_UNAVAILABLE, z.MAJOR_EVENT],
  // We are keeping live latency as major, so that it
  // acts as a ping alternative for livestream viewer
  [O.LIVESTREAM_LATENCY, z.MAJOR_EVENT],
  [O.IVS_PLAYER_ANALYTICS_EVENT, z.MINOR_EVENT],
  [O.IVS_PLAYER_PLAYBACK_RATE_CHANGED, z.MINOR_EVENT],
  [O.IVS_PLAYER_QUALITY_CHANGED, z.MINOR_EVENT],
  [O.IVS_PLAYER_INITIALIZED, z.MINOR_EVENT],
  [O.EXPECTED_VIDEO_RESOLUTION, z.MINOR_EVENT],
  [O.EXPECTED_SCREENSHARE_RESOLUTION, z.MINOR_EVENT]
]);
class wv {
  constructor() {
    h(this, "events");
    this.events = [];
  }
  add(t) {
    this.events.push(t);
  }
  flush() {
    return {
      entries: this.events.splice(0, 25)
    };
  }
}
class Rv extends lt {
  constructor({ logger: e, peerId: r, apiHostnames: i }) {
    super();
    h(this, "logger");
    h(this, "peerId");
    h(this, "eventStore");
    h(this, "apiEndpoint");
    this.logger = e, this.peerId = r, this.apiEndpoint = `https://${i.daCollector}/api/v1/message`, this.eventStore = new wv();
  }
  sendEventsChunkToServer(e) {
    return u(this, null, function* () {
      var i;
      const r = {
        payload: e,
        peerId: this.peerId
      };
      try {
        return yield fetch(this.apiEndpoint, {
          method: "POST",
          body: JSON.stringify(r)
        }), !0;
      } catch (a) {
        return this.logger.error("callStats::sendEventsChunkToServer::catch", { error: a }), (i = e.entries) == null || i.forEach((o) => {
          this.eventStore.add(o);
        }), !1;
      }
    });
  }
  callEvent(e) {
    e.timestamp = new Date(), this.eventStore.add(e), this.emit(e.event, e.metaData), Cv.get(e.event) === z.MAJOR_EVENT && this.flush();
  }
  flush() {
    return u(this, null, function* () {
      var r;
      const e = this.eventStore.flush();
      return (r = e == null ? void 0 : e.entries) != null && r.length ? (yield this.sendEventsChunkToServer(e), !0) : !1;
    });
  }
}
var ip;
(function(s) {
  s.CHROMIUM = "chromum", s.FIREFOX = "firefox", s.SAFARI = "safari";
})(ip || (ip = {}));
const To = {
  DEVEL: "devel",
  PREPROD: "preprod",
  PROD: "prod"
};
var Jt;
(function(s) {
  s.AUDIO = "AUDIO", s.VIDEO = "VIDEO", s.SPEAKER = "SPEAKER", s.SCREENSHARE = "SCREENSHARE";
})(Jt || (Jt = {}));
var np;
(function(s) {
  s[s.INIT = 0] = "INIT", s[s.ACCEPTED = 1] = "ACCEPTED", s[s.DENIED = 2] = "DENIED", s[s.SYS_DENIED = 3] = "SYS_DENIED", s[s.FAILED = 4] = "FAILED", s[s.NOTFOUND = 5] = "NOTFOUND", s[s.NOT_APPLICABLE = 6] = "NOT_APPLICABLE";
})(np || (np = {}));
function Zr(s) {
  return s ? s.split(".").slice(0, 2).concat(["0", "0"]).join(".") : "";
}
function Ed({ packetsLost: s, packetsSent: t }) {
  return t > 0 ? s * 100 / t : 0;
}
function _d({ packetsLost: s, packetsReceived: t }) {
  return t + s > 0 ? s * 100 / (t + s) : 0;
}
const hm = 240, pm = 720, gm = 8, mm = 3, Il = 10, Al = 0.02, Ml = 0.03;
function fr({ stat: s, weight: t, rangeMin: e, rangeMax: r, rangeRankingDirection: i }) {
  return s == null ? t : e === r ? i === "UP" ? s <= e ? t : 0 : s >= r ? t : 0 : i === "UP" ? (1 - Math.max(Math.min(r, Math.abs(s)) - e, 0) / (r - e)) * t : i === "DOWN" ? Math.max(Math.min(r, Math.abs(s)) - e, 0) / (r - e) * t : t;
}
function fm({ isLowQualityVideo: s, isVideoStuck: t, isVideoLagging: e, jitterQuality: r, packetsLostQuality: i }) {
  const a = 0.8 * ((s ? 0.85 : 1) * (e ? 0.7 : 1) * (t ? 0.5 : 1)) + 0.2 * (r * i);
  return Math.round((a + Number.EPSILON) * 100) / 100;
}
function Sm({ packetsLost: s, packetsSent: t }) {
  return t > 0 ? s * 100 / t : 0;
}
function vm({ packetsLost: s, packetsSent: t, jitter: e }) {
  const i = fr({
    stat: Sm({
      packetsLost: s,
      packetsSent: t
    }),
    weight: 0.7,
    rangeMin: 0,
    rangeMax: Il,
    rangeRankingDirection: "UP"
  }), o = fr({
    stat: e,
    weight: 0.3,
    rangeMin: Al,
    rangeMax: Ml,
    rangeRankingDirection: "UP"
  });
  return i + o;
}
function bv({ frameWidth: s, isScreenShare: t }) {
  return s < (t ? pm : hm);
}
function kv({ framesPerSecond: s, isScreenShare: t }) {
  return s < (t ? mm : gm);
}
function Iv({ framesEncoded: s }) {
  return s === 0;
}
function Tm({ frameWidth: s, framesPerSecond: t, packetsLost: e, packetsSent: r, jitter: i, isScreenShare: a, framesEncoded: o }) {
  const c = fr({
    stat: Sm({
      packetsLost: e,
      packetsSent: r
    }),
    weight: 1,
    rangeMin: 0,
    rangeMax: Il,
    rangeRankingDirection: "UP"
  }), d = fr({
    stat: i,
    weight: 1,
    rangeMin: Al,
    rangeMax: Ml,
    rangeRankingDirection: "UP"
  }), l = bv({
    frameWidth: s,
    isScreenShare: a
  }), p = kv({
    framesPerSecond: t,
    isScreenShare: a
  }), g = Iv({
    framesEncoded: o,
    isScreenShare: a
  });
  return fm({
    isLowQualityVideo: l,
    isVideoLagging: p,
    isVideoStuck: g,
    jitterQuality: d,
    packetsLostQuality: c
  });
}
function ym({ packetsLost: s, packetsReceived: t }) {
  return t + s > 0 ? s * 100 / (t + s) : 0;
}
function Em({ concealmentEvents: s, packetsLost: t, packetsReceived: e, jitter: r }) {
  const a = fr({
    stat: s,
    weight: 0.2,
    rangeMin: 0,
    rangeMax: 3,
    rangeRankingDirection: "UP"
  }), o = 0.5, c = fr({
    stat: ym({
      packetsLost: t,
      packetsReceived: e
    }),
    weight: o,
    rangeMin: 0,
    rangeMax: Il,
    rangeRankingDirection: "UP"
  }), l = fr({
    stat: r,
    weight: 0.3,
    rangeMin: Al,
    rangeMax: Ml,
    rangeRankingDirection: "UP"
  });
  return a + c + l;
}
function Av({ framesDecoded: s }) {
  return s === 0;
}
function Mv({ framesPerSecond: s, isScreenShare: t }) {
  return s < (t ? mm : gm);
}
function Dv({ frameWidth: s, isScreenShare: t }) {
  return s < (t ? pm : hm);
}
function _m({ frameWidth: s, framesPerSecond: t, packetsLost: e, packetsReceived: r, jitter: i, isScreenShare: a, framesDecoded: o }) {
  const c = fr({
    stat: ym({
      packetsLost: e,
      packetsReceived: r
    }),
    weight: 1,
    rangeMin: 0,
    rangeMax: Il,
    rangeRankingDirection: "UP"
  }), d = fr({
    stat: i,
    weight: 1,
    rangeMin: Al,
    rangeMax: Ml,
    rangeRankingDirection: "UP"
  }), l = Dv({
    frameWidth: s,
    isScreenShare: a
  }), p = Mv({
    framesPerSecond: t,
    isScreenShare: a
  }), g = Av({
    framesDecoded: o,
    isScreenShare: a
  });
  return fm({
    isLowQualityVideo: l,
    isVideoLagging: p,
    isVideoStuck: g,
    jitterQuality: d,
    packetsLostQuality: c
  });
}
class Sr {
  constructor(t) {
    h(this, "pc1");
    h(this, "pc2");
    h(this, "constrainVideoBitrateKbps");
    h(this, "constrainOfferToRemoveVideoFec", !1);
    h(this, "iceCandidateFilter");
    const e = new RTCPeerConnection(t), r = new RTCPeerConnection(t);
    this.pc1 = e, this.pc2 = r, this.iceCandidateFilter = Sr.noFilter, this.pc1.addEventListener("icecandidate", this.onIceCandidate.bind(this, this.pc2)), this.pc2.addEventListener("icecandidate", this.onIceCandidate.bind(this, this.pc1));
  }
  static parseCandidate(t) {
    const e = "candidate:", r = t.indexOf(e) + e.length, i = t.substr(r).split(" ");
    return {
      type: i[7],
      protocol: i[2],
      address: i[4]
    };
  }
  static isNotHostCandidate(t) {
    return t.type !== "host";
  }
  static isHost(t) {
    return t.type === "host";
  }
  static isRelay(t) {
    return t.type === "relay";
  }
  static isReflexive(t) {
    return t.type === "srflx";
  }
  static noFilter(t) {
    return !0;
  }
  onIceCandidate(t, e) {
    if (e.candidate) {
      const r = Sr.parseCandidate(e.candidate.candidate);
      this.iceCandidateFilter(r) && t.addIceCandidate(e.candidate);
    }
  }
  setIceCandidateFilter(t) {
    this.iceCandidateFilter = t;
  }
  // Constraint max video bitrate by modifying the SDP when creating an answer.
  constrainVideoBitrate(t) {
    this.constrainVideoBitrateKbps = t;
  }
  // Remove video FEC if available on the offer.
  disableVideoFec() {
    this.constrainOfferToRemoveVideoFec = !0;
  }
  gotOffer(t) {
    this.constrainOfferToRemoveVideoFec && (t.sdp = t.sdp.replace(/(m=video 1 [^\r]+)(116 117)(\r\n)/g, `$1\r
`), t.sdp = t.sdp.replace(/a=rtpmap:116 red\/90000\r\n/g, ""), t.sdp = t.sdp.replace(/a=rtpmap:117 ulpfec\/90000\r\n/g, ""), t.sdp = t.sdp.replace(/a=rtpmap:98 rtx\/90000\r\n/g, ""), t.sdp = t.sdp.replace(/a=fmtp:98 apt=116\r\n/g, "")), this.pc1.setLocalDescription(t), this.pc2.setRemoteDescription(t), this.pc2.createAnswer().then(this.gotAnswer.bind(this), this.reportFatal.bind(this));
  }
  gotAnswer(t) {
    this.constrainVideoBitrateKbps && (t.sdp = t.sdp.replace(/a=mid:video\r\n/g, `a=mid:video\r
b=AS:${this.constrainVideoBitrateKbps}\r
`)), this.pc2.setLocalDescription(t), this.pc1.setRemoteDescription(t);
  }
  establishConnection() {
    this.pc1.createOffer().then(this.gotOffer.bind(this), this.reportFatal.bind(this));
  }
  // eslint-disable-next-line class-methods-use-this
  reportFatal(t) {
    console.error("Error:", t);
  }
  getRoundTripTime() {
    return u(this, null, function* () {
      const [t, e] = yield Promise.all([this.pc1.getStats(), this.pc2.getStats()]);
      let r, i;
      if (t.forEach((a) => {
        a.type === "candidate-pair" && a.nominated === !0 && a.bytesSent > 0 && (r = a);
      }), e.forEach((a) => {
        a.type === "candidate-pair" && a.nominated === !0 && a.bytesReceived > 0 && (i = a);
      }), r && i)
        try {
          if (r.currentRoundTripTime && i.currentRoundTripTime)
            return {
              rtt: r.currentRoundTripTime,
              backendRTT: i.currentRoundTripTime
            };
          const a = (i.lastPacketReceivedTimestamp - r.lastPacketSentTimestamp) / 1e3;
          return {
            rtt: a,
            backendRTT: a
          };
        } catch (a) {
          return;
        }
    });
  }
  close() {
    this.pc1.close(), this.pc2.close();
  }
}
class Pm extends lt {
  constructor(e) {
    super();
    h(this, "call");
    h(this, "timeOut");
    this.call = new Sr(e);
  }
  start(e = 1e4) {
    this.call.establishConnection(), this.timeOut = setTimeout(this.testFailed.bind(this), e);
  }
  testComplete(e) {
    clearTimeout(this.timeOut), this.call.close(), this.emit("done", e);
  }
  testFailed(e) {
    this.call.close(), this.emit("failed", e);
  }
}
const Ov = 8, Nv = 1 / 1e3;
class Vv extends Pm {
  constructor(e) {
    super(e);
    h(this, "senderChannel");
    h(this, "recieveChannel");
    h(this, "startTime");
    h(this, "lastBitrateMeasureTime");
    h(this, "sentPayloadBytes", 0);
    h(this, "recievedPayloadBytes", 0);
    h(this, "lastReceivedPayloadBytes", 0);
    h(this, "stopSending", !1);
    h(this, "testProgress", 0);
    h(this, "samplePacket", "");
    h(this, "finalBitrateSum", 0);
    h(this, "bitRateSampels", 0);
    h(this, "maxNumberOfPacketsToSend", 0);
    h(this, "bytesToKeepBuffered", 0);
    h(this, "testDurationSeconds", 5);
    this.call.setIceCandidateFilter(Sr.isNotHostCandidate), this.senderChannel = this.call.pc1.createDataChannel(null);
    for (let r = 0; r < 1024 * 256; r += 1)
      this.samplePacket += "h";
    this.maxNumberOfPacketsToSend = 1, this.bytesToKeepBuffered = 1024 * this.maxNumberOfPacketsToSend, this.testDurationSeconds = 4, this.senderChannel.addEventListener("open", this.sendingStep.bind(this)), this.call.pc2.addEventListener("datachannel", this.onRecieverChannel.bind(this));
  }
  sendingStep() {
    const e = new Date();
    this.startTime || (this.startTime = e, this.lastBitrateMeasureTime = e);
    for (let i = 0; i !== this.maxNumberOfPacketsToSend && !(this.senderChannel.bufferedAmount >= this.bytesToKeepBuffered); i += 1) {
      this.sentPayloadBytes += this.samplePacket.length;
      try {
        this.senderChannel.send(this.samplePacket);
      } catch (a) {
      }
    }
    const r = e.getTime() - this.startTime.getTime();
    r >= 1e3 * this.testDurationSeconds ? (this.stopSending = !0, this.testProgress = 100) : (this.testProgress = r / (10 * this.testDurationSeconds), setTimeout(this.sendingStep.bind(this), 1));
  }
  onMessageRecieved(e) {
    this.recievedPayloadBytes += e.data.length;
    const r = new Date(), i = r.getTime() - this.lastBitrateMeasureTime.getTime();
    if (i >= 1e3) {
      const o = (this.recievedPayloadBytes - this.lastReceivedPayloadBytes) * Ov / (i / 1e3);
      this.finalBitrateSum += o, this.bitRateSampels += 1, this.lastReceivedPayloadBytes = this.recievedPayloadBytes, this.lastBitrateMeasureTime = r;
    }
    if (this.stopSending && this.sentPayloadBytes === this.recievedPayloadBytes) {
      const a = this.finalBitrateSum / this.bitRateSampels;
      this.testComplete({
        throughput: Math.round(a * Nv)
      });
    }
  }
  testComplete(e) {
    this.call.getRoundTripTime().then(({ rtt: r, backendRTT: i }) => super.testComplete({
      RTT: r,
      backendRTT: i,
      throughput: e.throughput
    }));
  }
  onRecieverChannel(e) {
    this.recieveChannel = e.channel, this.recieveChannel.addEventListener("message", this.onMessageRecieved.bind(this));
  }
}
class ph extends Pm {
  constructor(e, r = Sr.noFilter) {
    super(e);
    h(this, "ch1");
    h(this, "ch2");
    this.call.setIceCandidateFilter(r);
    const i = this.call.pc1.createDataChannel(null);
    this.ch1 = i, i.addEventListener("open", () => {
      i.send("hello");
    }), i.addEventListener("message", this.onCh1Recieve.bind(this)), this.call.pc2.addEventListener("datachannel", this.dataChannelHandler.bind(this));
  }
  onCh1Recieve(e) {
    e.data !== "world" ? this.hangup("Invalid data transmitted.") : this.testComplete({
      connectivity: !0
    });
  }
  onCh2Recieve(e) {
    if (e.data !== "hello")
      this.hangup("Invalid data transmitted.");
    else
      try {
        this.ch2.send("world");
      } catch (r) {
      }
  }
  dataChannelHandler(e) {
    const r = e.channel;
    this.ch2 = r, r.addEventListener("message", this.onCh2Recieve.bind(this));
  }
  hangup(e) {
    this.testFailed(e);
  }
}
class Lv extends ph {
  constructor(t) {
    super(t, Sr.isHost);
  }
}
class xv extends ph {
  constructor(t) {
    super(t, Sr.isRelay);
  }
}
class Uv extends ph {
  constructor(t) {
    super(t, Sr.isReflexive);
  }
}
class $v {
  constructor() {
    h(this, "ipInformation", null);
  }
  getIPDetails(i) {
    return u(this, arguments, function* ({ peerId: t, apiHostnames: e, logger: r }) {
      var a, o, c;
      if (!this.ipInformation) {
        try {
          const d = `https://${e.location}`, p = yield (yield fetch(d)).json();
          if (((a = p.loc) == null ? void 0 : a.length) > 5)
            return this.ipInformation = p, (o = this.ipInformation) != null && o.ip && (this.ipInformation.ip = Zr(this.ipInformation.ip)), p;
          throw Error("Insufficient data");
        } catch (d) {
          r.error("callstats::ipDetails:: failed to fetch ip using location service", { error: d });
        }
        try {
          const d = yield fetch(`https://${e.locationLegacy}/?token=3c493932b0624c&peerId=${t}`, {
            method: "POST"
          });
          this.ipInformation = yield d.json(), (c = this.ipInformation) != null && c.ip && (this.ipInformation.ip = Zr(this.ipInformation.ip));
        } catch (d) {
          r.error("callstats::ipDetails:: failed to fetch ip using legacy location service", { error: d });
        }
      }
      return this.ipInformation;
    });
  }
  resetCache() {
    this.ipInformation = null;
  }
}
const gh = new $v(), ap = [
  {
    urls: "turn:turn.dyte.in:443?transport=tcp",
    username: "dyte",
    credential: "dytein",
    credentialType: "password"
  },
  {
    urls: "turn:turn.dyte.in:3478?transport=udp",
    username: "dyte",
    credential: "dytein",
    credentialType: "password"
  }
];
function op(s) {
  const [t, e] = s.split(",");
  return {
    coords: {
      latitude: Number(t),
      longitude: Number(e)
    }
  };
}
class Cm {
  constructor() {
    h(this, "transport");
    h(this, "candidatePair");
    h(this, "outboundVideoRtp", /* @__PURE__ */ new Map());
    h(this, "inboundVideoRtp", /* @__PURE__ */ new Map());
    h(this, "outboundAudioRtp", /* @__PURE__ */ new Map());
    h(this, "inboundAudioRtp", /* @__PURE__ */ new Map());
    h(this, "remoteInboundRtp", /* @__PURE__ */ new Map());
    h(this, "producerStreamMap", /* @__PURE__ */ new Map());
    h(this, "consumerStreamMap", /* @__PURE__ */ new Map());
    h(this, "staleProducerStreamMap", !1);
    h(this, "staleConsumerStreamMap", !1);
  }
}
class wm extends lt {
  constructor() {
    super();
    h(this, "observer");
    h(this, "outboundProducerMap", /* @__PURE__ */ new Map());
    h(this, "inboundConsumerMap", /* @__PURE__ */ new Map());
    h(this, "consumerPeerIdMap", /* @__PURE__ */ new Map());
    h(this, "pausedConsumerMap", /* @__PURE__ */ new Map());
    h(this, "pausedProducerMap", /* @__PURE__ */ new Map());
    h(this, "overallProducingTransportsStatsMap", {});
    h(this, "overallConsumingTransportsStatsMap", {});
    h(this, "overallConsumersStatsMap", {});
    h(this, "overallProducersStatsMap", {});
    h(this, "videoProducerToStatsMap", /* @__PURE__ */ new Map());
    h(this, "audioProducerToStatsMap", /* @__PURE__ */ new Map());
    h(this, "videoConsumerToStatsMap", /* @__PURE__ */ new Map());
    h(this, "audioConsumerToStatsMap", /* @__PURE__ */ new Map());
    h(this, "consumerIdsWithFreezedVideo", /* @__PURE__ */ new Set());
    h(this, "consumerIdsWithFreezedAudio", /* @__PURE__ */ new Set());
    h(this, "producerIdsWithFreezedVideo", /* @__PURE__ */ new Set());
    h(this, "producerIdsWithFreezedAudio", /* @__PURE__ */ new Set());
    h(this, "freezedProducingTransportIds", /* @__PURE__ */ new Set());
    h(this, "freezedConsumingTransportIds", /* @__PURE__ */ new Set());
    h(this, "screenShareProducers", /* @__PURE__ */ new Set());
    h(this, "screenShareConsumers", /* @__PURE__ */ new Set());
    h(this, "ipDetails");
    h(this, "callStatsInstance");
    this.observer = new lt();
  }
  registerProducer(e) {
    return u(this, null, function* () {
      yield this.generateProducerStreamMap(e), e.on("close", this.deregisterProducer.bind(this, e)), e.on("pause", this.pauseProducer.bind(this, e.id)), e.on("resume", this.resumeProducer.bind(this, e.id)), e.appData.screenShare === !0 && this.screenShareProducers.add(e.id);
    });
  }
  pauseProducer(e) {
    this.pausedProducerMap.set(e, {
      lastReportCalculated: !1
    });
  }
  resumeProducer(e) {
    this.pausedProducerMap.delete(e);
  }
  processInboundConsumerVideoStats(e, r, i) {
    var o, c;
    const a = ((c = (o = this == null ? void 0 : this.callStatsInstance) == null ? void 0 : o.consumerSharedMediaStatesMap) == null ? void 0 : c.get(e)) || {};
    r.totalVideoPacketsReceived === i.packetsReceived ? (this.consumerIdsWithFreezedVideo.add(e), this.callStatsInstance && a.video && (this.callStatsInstance.logger.debug("callstats::measurements::consumerVideoFreezed", { consumerId: e }), this.callStatsInstance.eventHandler.emit("consumer_video_status", "pause", e))) : (r.totalVideoPacketsReceived = i.packetsReceived, this.consumerIdsWithFreezedVideo.has(e) && (this.consumerIdsWithFreezedVideo.delete(e), this.callStatsInstance && a.video && (this.callStatsInstance.logger.debug("callstats::measurements::consumerVideoDefreezed", { consumerId: e }), this.callStatsInstance.eventHandler.emit("consumer_video_status", "resume", e))));
  }
  processInboundConsumerAudioStats(e, r, i) {
    var o, c;
    const a = ((c = (o = this == null ? void 0 : this.callStatsInstance) == null ? void 0 : o.consumerSharedMediaStatesMap) == null ? void 0 : c.get(e)) || {};
    r.totalAudioPacketsReceived === i.packetsReceived ? (this.consumerIdsWithFreezedAudio.add(e), this.callStatsInstance && a.audio && (this.callStatsInstance.logger.debug("callStats::measurements::consumerAudioFreezed", { consumerId: e }), this.callStatsInstance.eventHandler.emit("consumer_audio_status", "pause", e))) : (r.totalAudioPacketsReceived = i.packetsReceived, this.consumerIdsWithFreezedAudio.has(e) && (this.consumerIdsWithFreezedAudio.delete(e), this.callStatsInstance && a.audio && (this.callStatsInstance.logger.debug("callStats::measurements::consumerAudioDefreezed", { consumerId: e }), this.callStatsInstance.eventHandler.emit("consumer_audio_status", "resume", e))));
  }
  processOutboundProducerVideoStats(e, r, i) {
    var o;
    const a = ((o = this == null ? void 0 : this.callStatsInstance) == null ? void 0 : o.currentUserMediaStates) || {};
    r.totalVideoPacketsSent === i.packetsSent ? (this.producerIdsWithFreezedVideo.add(e), this.callStatsInstance && a.video && (this.callStatsInstance.logger.debug("callStats::measurements::producerVideoFreezed", { producerId: e }), this.callStatsInstance.eventHandler.emit("producer_video_status", "pause", e))) : (r.totalVideoPacketsSent = i.packetsSent, this.producerIdsWithFreezedVideo.has(e) && (this.producerIdsWithFreezedVideo.delete(e), this.callStatsInstance && a.video && (this.callStatsInstance.logger.debug("callStats::measurements::producerVideoDefreezed", { producerId: e }), this.callStatsInstance.eventHandler.emit("producer_video_status", "resume", e))));
  }
  processOutboundProducerAudioStats(e, r, i) {
    var o;
    const a = ((o = this == null ? void 0 : this.callStatsInstance) == null ? void 0 : o.currentUserMediaStates) || {};
    r.totalAudioPacketsSent === i.packetsSent ? (this.producerIdsWithFreezedAudio.add(e), this.callStatsInstance && a.audio && (this.callStatsInstance.logger.debug("callStats::measurements::producerAudioFreezed", { producerId: e }), this.callStatsInstance.eventHandler.emit("producer_audio_status", "pause", e))) : (r.totalAudioPacketsSent = i.packetsSent, this.producerIdsWithFreezedAudio.has(e) && (this.producerIdsWithFreezedAudio.delete(e), this.callStatsInstance && a.audio && (this.callStatsInstance.logger.debug("callStats::measurements::producerAudioDefreezed", { producerId: e }), this.callStatsInstance.eventHandler.emit("producer_audio_status", "resume", e))));
  }
  processProducingTransportStats(e, r, i) {
    var p;
    const a = ((p = this == null ? void 0 : this.callStatsInstance) == null ? void 0 : p.currentUserMediaStates) || {}, { audio: o, video: c, screen: d } = a, l = o || c || d;
    r.totalPacketsSent === i.packetsSent ? (this.freezedProducingTransportIds.add(e), this.callStatsInstance && l && (this.callStatsInstance.logger.debug("callStats::measurements::producingTransportFreezed", { transportId: e }), this.callStatsInstance.eventHandler.emit("producing_transport_status", "pause", e))) : (r.totalPacketsSent = i.packetsSent, this.freezedProducingTransportIds.has(e) && (this.freezedProducingTransportIds.delete(e), this.callStatsInstance && l && (this.callStatsInstance.logger.debug("callStats::measurements::producingTransportDefreezed", { transportId: e }), this.callStatsInstance.eventHandler.emit("producing_transport_status", "resume", e))));
  }
  processConsumingTransportStats(e, r, i) {
    var c, d;
    const o = !!Array.from(((d = (c = this == null ? void 0 : this.callStatsInstance) == null ? void 0 : c.consumerSharedMediaStatesMap) == null ? void 0 : d.values()) || []).reduce((l, p) => l || p.audio || p.video || p.screen, !1);
    r.totalPacketsReceived === i.packetsSent ? (this.freezedConsumingTransportIds.add(e), this.callStatsInstance && o && (this.callStatsInstance.logger.debug("callStats::measurements::consumingTransportFreezed", { transportId: e }), this.callStatsInstance.eventHandler.emit("consuming_transport_status", "pause", e))) : (r.totalPacketsReceived = i.packetsSent, this.freezedConsumingTransportIds.has(e) && (this.freezedConsumingTransportIds.delete(e), this.callStatsInstance && o && (this.callStatsInstance.logger.debug("callStats::measurements::consumingTransportDefreezed", { transportId: e }), this.callStatsInstance.eventHandler.emit("consuming_transport_status", "resume", e))));
  }
  registerConsumer(e) {
    return u(this, null, function* () {
      yield this.generateConsumerStreamMap(e), this.consumerPeerIdMap.set(e.id, {
        producerId: e.producerId,
        peerId: e.appData.peerId,
        appData: e.appData
      }), e.on("close", this.deregisterConsumer.bind(this, e)), e.on("pause", this.pauseConsumer.bind(this, e.id)), e.on("resume", this.resumeConsumer.bind(this, e.id)), e.appData.screenShare === !0 && this.screenShareConsumers.add(e.id);
    });
  }
  pauseConsumer(e) {
    this.pausedConsumerMap.set(e, {
      lastReportCalculated: !1
    });
  }
  resumeConsumer(e) {
    this.pausedConsumerMap.delete(e);
  }
  generateProducerStreamMap(e, r = !1) {
    return u(this, null, function* () {
      const i = yield e.getStats(), a = r ? this.getProducerStatsFromReport(this.parseRTCReport(i, ["outbound-rtp", "remote-inbound-rtp"], !1, e.id))[0] : void 0;
      for (const o of i.values())
        switch (o.type) {
          case "outbound-rtp": {
            this.outboundProducerMap.set(o.id, e.id);
            break;
          }
        }
      return a;
    });
  }
  generateConsumerStreamMap(e, r = !1) {
    return u(this, null, function* () {
      const i = yield e.getStats(), a = r ? this.getConsumerStatsFromReport(this.parseRTCReport(i, ["inbound-rtp"], !1, e.id))[0] : void 0;
      for (const o of i.values())
        switch (o.type) {
          case "inbound-rtp": {
            this.inboundConsumerMap.set(o.id, e.id);
            break;
          }
        }
      return a;
    });
  }
  deregisterProducer(e) {
    this.outboundProducerMap.forEach((r, i) => {
      r === e.id && this.outboundProducerMap.delete(i);
    }), this.pausedProducerMap.delete(e.id), this.screenShareProducers.delete(e.id);
  }
  deregisterConsumer(e) {
    this.inboundConsumerMap.forEach((r, i) => {
      r === e.id && this.inboundConsumerMap.delete(i);
    }), this.consumerPeerIdMap.delete(e.id), this.pausedConsumerMap.delete(e.id), this.screenShareConsumers.delete(e.id);
  }
  // eslint-disable-next-line class-methods-use-this
  getIceCandidateStats(e) {
    var r;
    return {
      id: e.id,
      type: e.candidateType || e.type,
      address: e.address,
      port: e.port,
      url: e.url,
      protocol: (r = e.relayProtocol) != null ? r : e.protocol,
      networkType: e.networkType,
      relatedAddress: e.relatedAddress,
      relatedPort: e.relatedPort
    };
  }
  // eslint-disable-next-line class-methods-use-this
  getWorkingSimulcastVideoStats(e) {
    return e.find((i) => {
      const a = i.framesEncoded > 0, o = i.packetsSent > 0, c = i.frameWidth && i.frameHeight;
      return a && o && !!c;
    }) || e[e.length - 1];
  }
  parseRTCReport(e, r = [], i = !1, a = void 0, o = void 0) {
    var P, C, w, $, F, N, B, G, re, tt, cs, ii, ds;
    const c = e, d = new Cm(), l = r.length ? new Set(r) : void 0, p = [], g = [], S = [], v = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map();
    for (const A of c.values()) {
      if (l) {
        if (l.size === 0)
          break;
        if (l.has(A.type))
          i && l.delete(A.type);
        else
          continue;
      }
      switch (A.type) {
        case "local-candidate": {
          p.push(this.getIceCandidateStats(A));
          break;
        }
        case "remote-candidate": {
          g.push(this.getIceCandidateStats(A));
          break;
        }
        case "candidate-pair": {
          const { nominated: y } = A, { selected: R } = A, L = A, fe = {
            nominated: y != null ? y : R,
            currentRoundTripTime: L.currentRoundTripTime,
            totalRoundTripTime: L.totalRoundTripTime,
            bytesReceived: L.bytesReceived,
            bytesSent: L.bytesSent,
            availableOutgoingBitrate: L.availableOutgoingBitrate,
            availableIncomingBitrate: L.availableIncomingBitrate,
            lastPacketReceivedTimestamp: L.lastPacketReceivedTimestamp,
            lastPacketSentTimestamp: L.lastPacketSentTimestamp,
            localCandidateId: L.localCandidateId,
            remoteCandidateId: L.remoteCandidateId,
            bytesDiscardedOnSend: L.bytesDiscardedOnSend,
            packetsSent: L.packetsSent,
            packetsReceived: L.packetsReceived,
            packetsDiscardedOnSend: L.packetsDiscardedOnSend
          };
          S.push(fe), (A.nominated === !0 || A.selected === !0) && (d.candidatePair = fe);
          break;
        }
        case "transport": {
          const y = A;
          o && (o.producing && (this.overallProducingTransportsStatsMap[o.id] || (this.overallProducingTransportsStatsMap[o.id] = {
            totalPacketsSent: 0
          })), o.consuming && (this.overallConsumingTransportsStatsMap[o.id] || (this.overallConsumingTransportsStatsMap[o.id] = {
            totalPacketsReceived: 0
          })));
          const R = {
            bytesReceived: y.bytesReceived,
            bytesSent: y.bytesSent,
            packetsSent: y.packetsSent,
            packetsReceived: y.packetsReceived,
            dtlsCipher: y.dtlsCipher,
            // @ts-ignore
            dtlsState: y.dtlsState,
            // @ts-ignore
            iceRole: y.iceRole
          };
          if (d.transport = R, o) {
            if (o.producing) {
              const L = this.overallProducingTransportsStatsMap[o.id];
              this.processProducingTransportStats(o.id, L, R);
            }
            if (o.consuming) {
              const L = this.overallConsumingTransportsStatsMap[o.id];
              this.processConsumingTransportStats(o.id, L, R);
            }
          }
          break;
        }
        case "remote-inbound-rtp": {
          const y = A, R = {
            jitter: y.jitter,
            fractionLost: y.fractionLost,
            roundTripTime: y.roundTripTime,
            roundTripTimeMeasurements: y.roundTripTimeMeasurements,
            totalRoundTripTime: y.totalRoundTripTime,
            packetsLost: y.packetsLost
          };
          d.remoteInboundRtp.set(y.localId, R);
          break;
        }
        case "outbound-rtp": {
          if (!this.outboundProducerMap.has(A.id))
            break;
          const y = A, R = a || this.outboundProducerMap.get(A.id), L = this.pausedProducerMap.get(R);
          if (L) {
            if (L.lastReportCalculated === !0)
              break;
            this.pausedProducerMap.set(R, {
              lastReportCalculated: !0
            });
          }
          this.overallProducersStatsMap[R] || (this.overallProducersStatsMap[R] = {
            totalVideoPacketsSent: 0,
            totalAudioPacketsSent: 0
          });
          const fe = this.overallProducersStatsMap[R];
          if (["video", "audio"].includes(y.mediaType) || ["video", "audio"].includes(y.kind)) {
            if (!this.outboundProducerMap.has(A.id)) {
              d.staleProducerStreamMap = !0;
              break;
            }
            const xe = this.callStatsInstance.producers.get(R);
            if (((P = xe == null ? void 0 : xe.track) == null ? void 0 : P.readyState) === "ended")
              break;
            d.producerStreamMap.has(R) || d.producerStreamMap.set(R, {
              outboundVideoRtpId: [],
              outboundAudioRtpId: []
            });
            const V = {
              bytesSent: y.bytesSent,
              packetsSent: y.packetsSent,
              nackCount: y.nackCount,
              ssrc: y.ssrc,
              mid: y.mid,
              active: y.active,
              codecId: y.codecId,
              headerBytesSent: y.headerBytesSent || 0,
              totalPacketSendDelay: y.totalPacketSendDelay || 0
            };
            if (y.mediaType === "video" || y.kind === "video") {
              const I = y, Ue = D({
                frameHeight: I.frameHeight,
                frameWidth: I.frameWidth,
                framesEncoded: I.framesEncoded,
                framesDropped: I.framesDropped,
                framesPerSecond: I.framesPerSecond,
                framesSent: I.framesSent,
                keyFramesEncoded: I.keyFramesEncoded,
                firCount: I.firCount,
                encoderImplementation: I.encoderImplementation,
                hugeFramesSent: I.hugeFramesSent,
                pliCount: I.pliCount,
                qpSum: I.qpSum,
                qualityLimitationDurations: I.qualityLimitationDurations,
                qualityLimitationReason: I.qualityLimitationReason,
                qualityLimitationResolutionChanges: I.qualityLimitationResolutionChanges,
                // temp sending target bitrate in total encode time
                // to avoid the delay with making the backend changes
                totalEncodeTime: I.targetBitrate,
                totalPacketSendDelay: I.totalPacketSendDelay,
                retransmittedBytesSent: I.retransmittedBytesSent,
                retransmittedPacketsSent: I.retransmittedPacketsSent,
                scalabilityMode: I.scalabilityMode,
                powerEfficientEncoder: I.powerEfficientEncoder
              }, V);
              d.outboundVideoRtp.set(A.id, Ue), d.producerStreamMap.get(R).outboundVideoRtpId.push(A.id), this.processOutboundProducerVideoStats(R, fe, Ue);
            } else if (y.mediaType === "audio" || y.kind === "audio") {
              const I = y, Ue = D({
                retransmittedBytesSent: I.retransmittedBytesSent,
                retransmittedPacketsSent: I.retransmittedPacketsSent
              }, V);
              d.outboundAudioRtp.set(A.id, Ue), d.producerStreamMap.get(R).outboundAudioRtpId.push(A.id), this.processOutboundProducerAudioStats(R, fe, Ue);
            }
          } else
            this.callStatsInstance.logger.error(`Callstats: Unknown Outbound-rtp. mediatype: ${y.mediaType} kind: ${y.kind}`);
          break;
        }
        case "inbound-rtp": {
          if (!this.inboundConsumerMap.has(A.id))
            break;
          const y = A, R = a || this.inboundConsumerMap.get(A.id), L = this.pausedConsumerMap.get(R);
          if (L) {
            if (L.lastReportCalculated === !0)
              break;
            this.pausedConsumerMap.set(R, {
              lastReportCalculated: !0
            });
          }
          if (y.ssrc === 1234)
            break;
          this.overallConsumersStatsMap[R] || (this.overallConsumersStatsMap[R] = {
            totalVideoPacketsReceived: 0,
            totalAudioPacketsReceived: 0
          });
          const fe = this.overallConsumersStatsMap[R];
          if (["video", "audio"].includes(y.mediaType) || ["video", "audio"].includes(y.kind)) {
            if (!this.inboundConsumerMap.has(A.id)) {
              d.staleConsumerStreamMap = !0;
              break;
            }
            d.consumerStreamMap.has(R) || d.consumerStreamMap.set(R, {
              inboundVideoRtpId: [],
              inboundAudioRtpId: []
            });
            const xe = {
              bytesReceived: y.bytesReceived,
              packetsReceived: y.packetsReceived,
              packetsLost: y.packetsLost >= 0 ? y.packetsLost : 0,
              jitter: y.jitter,
              nackCount: y.nackCount,
              jitterBufferDelay: y.jitterBufferDelay,
              jitterBufferEmittedCount: y.jitterBufferEmittedCount,
              lastPacketReceivedTimestamp: y.lastPacketReceivedTimestamp,
              ssrc: y.ssrc,
              mid: y.mid,
              codecId: y.codecId,
              headerBytesReceived: y.headerBytesReceived || 0,
              packetsDiscarded: y.packetsDiscarded || 0,
              jitterBufferMinimumDelay: y.jitterBufferMinimumDelay || 0,
              jitterBufferTargetDelay: y.jitterBufferTargetDelay || 0
            };
            if (y.mediaType === "video" || y.kind === "video") {
              const V = y, I = D({
                frameHeight: V.frameHeight,
                frameWidth: V.frameWidth,
                framesDecoded: V.framesDecoded,
                framesDropped: V.framesDropped,
                framesPerSecond: V.framesPerSecond,
                framesReceived: V.framesReceived,
                keyFramesDecoded: V.keyFramesDecoded,
                firCount: V.firCount,
                decoderImplementation: V.decoderImplementation,
                pliCount: V.pliCount,
                totalProcessingDelay: V.totalProcessingDelay,
                qpSum: V.qpSum || 0,
                totalAssemblyTime: V.totalAssemblyTime || 0,
                totalDecodeTime: V.totalDecodeTime || 0,
                totalFreezesDuration: V.totalFreezesDuration || 0,
                totalInterFrameDelay: V.totalInterFrameDelay || 0,
                totalPausesDuration: V.totalPausesDuration || 0,
                totalSquaredInterFrameDelay: V.totalSquaredInterFrameDelay || 0,
                freezeCount: V.freezeCount || 0,
                pauseCount: V.pauseCount || 0,
                powerEfficientDecoder: V.powerEfficientDecoder
              }, xe);
              I.score = _m({
                frameWidth: I.frameWidth || 0,
                framesDecoded: (I.framesDecoded || 0) - (((C = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : C.framesDecoded) || 0),
                framesPerSecond: I.framesPerSecond || 0,
                packetsLost: (I.packetsLost || 0) - (((w = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : w.packetsLost) || 0),
                packetsReceived: (I.packetsReceived || 0) - ((($ = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : $.packetsReceived) || 0),
                jitter: I.jitter || 0,
                isScreenShare: this.screenShareConsumers.has(R)
              }), _.set(R, {
                score: +(I.score * 10).toFixed(),
                frameWidth: I.frameWidth || 0,
                frameHeight: I.frameHeight || 0,
                framesPerSecond: I.framesPerSecond || 0,
                packetsLostPercentage: _d({
                  packetsLost: (I.packetsLost || 0) - (((F = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : F.packetsLost) || 0),
                  packetsReceived: (I.packetsReceived || 0) - (((N = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : N.packetsReceived) || 0)
                }),
                jitter: I.jitter || 0,
                isScreenShare: this.screenShareConsumers.has(R),
                bitrate: ((I.bytesReceived || 0) - (((B = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : B.bytesReceived) || 0)) * 8 / 7
                // Bytes received in last 7 seconds
              }), this.videoConsumerToStatsMap.set(R, I), d.inboundVideoRtp.set(A.id, I), d.consumerStreamMap.get(R).inboundVideoRtpId.push(A.id), this.processInboundConsumerVideoStats(R, fe, I);
            } else if (y.mediaType === "audio" || y.kind === "audio") {
              const V = y, I = D({
                audioLevel: V.audioLevel,
                concealedSamples: V.concealedSamples,
                concealmentEvents: V.concealmentEvents,
                totalAudioEnergy: V.totalAudioEnergy,
                totalSamplesDuration: V.totalSamplesDuration,
                totalSamplesReceived: V.totalSamplesReceived,
                fecPacketsDiscarded: V.fecPacketsDiscarded || 0,
                fecPacketsReceived: V.fecPacketsReceived || 0,
                insertedSamplesForDeceleration: V.insertedSamplesForDeceleration || 0,
                removedSamplesForAcceleration: V.removedSamplesForAcceleration || 0,
                silentConcealedSamples: V.silentConcealedSamples || 0,
                playoutId: V.playoutId
              }, xe);
              I.score = Em({
                concealmentEvents: (I.concealmentEvents || 0) - (((G = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : G.concealmentEvents) || 0),
                packetsLost: (I.packetsLost || 0) - (((re = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : re.packetsLost) || 0),
                packetsReceived: (I.packetsReceived || 0) - (((tt = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : tt.packetsReceived) || 0),
                jitter: I.jitter || 0
              }), _.set(R, {
                score: +(I.score * 10).toFixed(),
                packetsLostPercentage: _d({
                  packetsLost: (I.packetsLost || 0) - (((cs = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : cs.packetsLost) || 0),
                  packetsReceived: (I.packetsReceived || 0) - (((ii = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : ii.packetsReceived) || 0)
                }),
                jitter: I.jitter || 0,
                isScreenShare: this.screenShareConsumers.has(R),
                bitrate: ((I.bytesReceived || 0) - (((ds = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : ds.bytesReceived) || 0)) * 8 / 7
                // Bytes received in last 7 seconds
              }), this.audioConsumerToStatsMap.set(R, I), d.inboundAudioRtp.set(A.id, I), d.consumerStreamMap.get(R).inboundAudioRtpId.push(A.id), this.processInboundConsumerAudioStats(R, fe, I);
            }
          } else
            this.callStatsInstance.logger.error(`Callstats: Unknown Inbound-rtp. mediatype: ${y.mediaType} kind: ${y.kind}`);
          break;
        }
      }
    }
    if (d.producerStreamMap.forEach((A, y) => {
      var R, L, fe, xe, V, I, Ue, Cr, qs, qa, ja, Ga, Wa, Ja, Ka, za, Ya, Qa, Xa, Za, eo, to, so;
      if (A.outboundVideoRtpId.length > 0) {
        const le = [];
        A.outboundVideoRtpId.forEach((Xl) => {
          le.push(d.outboundVideoRtp.get(Xl));
        });
        const se = this.getWorkingSimulcastVideoStats(le);
        se.score = Tm({
          frameWidth: se.frameWidth || 0,
          framesPerSecond: se.framesPerSecond || 0,
          jitter: ((R = se.remoteData) == null ? void 0 : R.jitter) || 0,
          isScreenShare: this.screenShareProducers.has(y),
          packetsSent: (se.packetsSent || 0) - (((L = this.videoProducerToStatsMap.get(y)) == null ? void 0 : L.packetsSent) || 0),
          packetsLost: (((fe = se.remoteData) == null ? void 0 : fe.packetsLost) || 0) - (((V = (xe = this.videoProducerToStatsMap.get(y)) == null ? void 0 : xe.remoteData) == null ? void 0 : V.packetsLost) || 0),
          framesEncoded: (se.framesEncoded || 0) - (((I = this.videoProducerToStatsMap.get(y)) == null ? void 0 : I.framesEncoded) || 0)
        }), v.set(y, {
          score: +(se.score * 10).toFixed(),
          frameWidth: se.frameWidth || 0,
          frameHeight: se.frameHeight || 0,
          framesPerSecond: se.framesPerSecond || 0,
          jitter: ((Ue = se.remoteData) == null ? void 0 : Ue.jitter) || 0,
          isScreenShare: this.screenShareProducers.has(y),
          packetsLostPercentage: Ed({
            packetsSent: (se.packetsSent || 0) - (((Cr = this.videoProducerToStatsMap.get(y)) == null ? void 0 : Cr.packetsSent) || 0),
            packetsLost: (((qs = se.remoteData) == null ? void 0 : qs.packetsLost) || 0) - (((ja = (qa = this.videoProducerToStatsMap.get(y)) == null ? void 0 : qa.remoteData) == null ? void 0 : ja.packetsLost) || 0)
          }),
          bitrate: ((se.bytesSent || 0) - (((Ga = this.videoProducerToStatsMap.get(y)) == null ? void 0 : Ga.bytesSent) || 0)) * 8 / 7,
          cpuLimitations: se.qualityLimitationReason === "cpu",
          bandwidthLimitations: se.qualityLimitationReason === "bandwidth"
        }), this.videoProducerToStatsMap.set(y, se);
      } else if (A.outboundAudioRtpId.length > 0) {
        const le = d.outboundAudioRtp.get(A.outboundAudioRtpId[0]);
        le.score = vm({
          packetsSent: (le.packetsSent || 0) - (((Wa = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Wa.packetsSent) || 0),
          packetsLost: (((Ja = le.remoteData) == null ? void 0 : Ja.packetsLost) || 0) - (((za = (Ka = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Ka.remoteData) == null ? void 0 : za.packetsLost) || 0),
          jitter: ((Ya = le.remoteData) == null ? void 0 : Ya.jitter) || 0
        }), v.set(y, {
          score: +(le.score * 10).toFixed(),
          bitrate: ((le.bytesSent || 0) - (((Qa = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Qa.bytesSent) || 0)) * 8 / 7,
          packetsLostPercentage: Ed({
            packetsSent: (le.packetsSent || 0) - (((Xa = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Xa.packetsSent) || 0),
            packetsLost: (((Za = le.remoteData) == null ? void 0 : Za.packetsLost) || 0) - (((to = (eo = this.audioProducerToStatsMap.get(y)) == null ? void 0 : eo.remoteData) == null ? void 0 : to.packetsLost) || 0)
          }),
          jitter: ((so = le.remoteData) == null ? void 0 : so.jitter) || 0,
          isScreenShare: this.screenShareProducers.has(y)
        }), this.audioProducerToStatsMap.set(y, le);
      }
    }), S.forEach((A) => {
      const y = p.find((L) => L.id === A.localCandidateId ? (A.localCandidateId = L.id, L) : null), R = g.find((L) => L.id === A.remoteCandidateId ? (A.remoteCandidateId = L.id, L) : null);
      y && (A.localCandidateType = y.type, A.localCandidateAddress = Zr(y.address), A.localCandidatePort = y.port, A.localCandidateProtocol = y.protocol, A.localCandidateUrl = y.url, A.localCandidateNetworkType = y.networkType, A.localCandidateRelatedAddress = Zr(y.relatedAddress), A.localCandidateRelatedPort = y.relatedPort), R && (A.remoteCandidateType = R.type, A.remoteCandidateAddress = Zr(R.address), A.remoteCandidatePort = R.port, A.remoteCandidateProtocol = R.protocol, A.remoteCandidateUrl = R.url);
    }), d.candidatePair && (d.transport ? (d.transport.totalRoundTripTime = d.candidatePair.totalRoundTripTime, d.transport.availableOutgoingBitrate = d.candidatePair.availableOutgoingBitrate, d.transport.availableIncomingBitrate = d.candidatePair.availableIncomingBitrate, d.transport.roundTripTime = d.candidatePair.currentRoundTripTime) : d.transport = {
      // candidateStats: result.candidatePair,
      bytesReceived: d.candidatePair.bytesReceived,
      bytesSent: d.candidatePair.bytesSent,
      totalRoundTripTime: d.candidatePair.totalRoundTripTime,
      availableOutgoingBitrate: d.candidatePair.availableOutgoingBitrate,
      availableIncomingBitrate: d.candidatePair.availableIncomingBitrate,
      roundTripTime: d.candidatePair.currentRoundTripTime
    }), d.transport && (d.transport.candidatePairs = S), d.transport && !d.transport.roundTripTime) {
      let A = 0, y = 0;
      d.remoteInboundRtp.forEach((R, L) => {
        R.roundTripTime && R.roundTripTime > A && (A = R.roundTripTime, y = R.totalRoundTripTime);
      }), d.transport.roundTripTime = A, d.transport.totalRoundTripTime = y;
    }
    if (_.size > 0)
      try {
        this.observer.emit("consumer_score", _);
      } catch (A) {
      }
    if (v.size > 0)
      try {
        this.observer.emit("producer_score", v);
      } catch (A) {
      }
    return d;
  }
  getProducersReport(e) {
    return u(this, null, function* () {
      const r = e.map((i) => this.generateProducerStreamMap(i, !0));
      return r.length > 0 ? Promise.all(r) : void 0;
    });
  }
  getConsumersReport(e) {
    return u(this, null, function* () {
      const r = e.map((i) => this.generateConsumerStreamMap(i, !0));
      return r.length > 0 ? Promise.all(r) : void 0;
    });
  }
  // eslint-disable-next-line class-methods-use-this
  getTransportReport(e) {
    return u(this, null, function* () {
      return e.getStats();
    });
  }
  getProcessedStats(e, r, i) {
    return u(this, null, function* () {
      const a = yield this.getTransportReport(e), o = { producing: i, consuming: r, id: e.id }, c = a, d = this.parseRTCReport(c, ["transport", "candidate-pair", "inbound-rtp", "outbound-rtp", "remote-inbound-rtp", "local-candidate", "remote-candidate"], !1, void 0, o);
      if (!d)
        return;
      const l = {
        stats: d.transport,
        transportId: e.id,
        consuming: r,
        producing: i
      }, p = d.staleProducerStreamMap ? void 0 : this.getProducerStatsFromReport(d), g = d.staleConsumerStreamMap ? void 0 : this.getConsumerStatsFromReport(d);
      return {
        transportReport: l,
        producerReport: p,
        consumerReport: g
      };
    });
  }
  // eslint-disable-next-line class-methods-use-this
  getProducerStatsFromReport(e) {
    const r = [];
    try {
      e.producerStreamMap.forEach((i, a) => {
        var o, c;
        r.push({
          producerId: a,
          videoStats: i.outboundVideoRtpId.map((d) => e.outboundVideoRtp.get(d)),
          audioStats: i.outboundAudioRtpId.map((d) => e.outboundAudioRtp.get(d)),
          appData: ((c = (o = this.callStatsInstance.producers) == null ? void 0 : o.get(a)) == null ? void 0 : c.appData) || null
        });
      });
    } catch (i) {
      this.callStatsInstance.logger.error("callStats::measurements::getProducerStatsFromReport", {
        error: { reason: i.reason, message: i.message }
      });
    }
    return r;
  }
  getConsumerStatsFromReport(e) {
    const r = [];
    try {
      e.consumerStreamMap.forEach((i, a) => {
        const { peerId: o, producerId: c, appData: d } = this.consumerPeerIdMap.get(a);
        r.push({
          consumerId: a,
          peerId: o,
          producerId: c,
          appData: d,
          videoStats: i.inboundVideoRtpId.map((l) => e.inboundVideoRtp.get(l)),
          audioStats: i.inboundAudioRtpId.map((l) => e.inboundAudioRtp.get(l))
        });
      });
    } catch (i) {
      console.error("getConsumersReport: ", i, e);
    }
    return r;
  }
  // eslint-disable-next-line class-methods-use-this
  getUserLocation() {
    return u(this, null, function* () {
      return new Promise((e, r) => {
        try {
          navigator.geolocation ? navigator.geolocation.getCurrentPosition((i) => {
            e(i);
          }) : r();
        } catch (i) {
          r(i);
        }
      });
    });
  }
  // eslint-disable-next-line class-methods-use-this
  getConnectivity(e) {
    return u(this, null, function* () {
      try {
        const r = {
          iceServers: e || ap
        }, i = new Promise((p, g) => {
          try {
            const S = new Lv(r);
            S.addListener("done", p), S.addListener("failed", () => {
              p({ connectivity: !1 });
            }), S.start(2e3);
          } catch (S) {
            g(S);
          }
        }), a = new Promise((p, g) => {
          try {
            const S = new xv(r);
            S.addListener("done", p), S.addListener("failed", () => {
              p({ connectivity: !1 });
            }), S.start(2e3);
          } catch (S) {
            g(S);
          }
        }), o = new Promise((p, g) => {
          try {
            const S = new Uv(r);
            S.addListener("done", p), S.addListener("failed", () => {
              p({ connectivity: !1 });
            }), S.start(2e3);
          } catch (S) {
            g(S);
          }
        }), [c, d, l] = yield Promise.all([i, a, o]);
        return {
          host: c == null ? void 0 : c.connectivity,
          relay: d == null ? void 0 : d.connectivity,
          reflexive: l == null ? void 0 : l.connectivity
        };
      } catch (r) {
        return {
          host: !1,
          relay: !1,
          reflexive: !1
        };
      }
    });
  }
  // eslint-disable-next-line class-methods-use-this
  getThroughput(e) {
    return u(this, null, function* () {
      try {
        const i = yield new Promise((a, o) => {
          try {
            const c = {
              iceServers: e || ap
            }, d = new Vv(c);
            d.addListener("done", a), d.addListener("failed", o), d.start(1e4);
          } catch (c) {
            o(c);
          }
        });
        return {
          throughput: i.throughput,
          fractionalLoss: 0,
          RTT: i.RTT,
          jitter: 0,
          backendRTT: i.backendRTT
        };
      } catch (r) {
        return;
      }
    });
  }
  getIPDetails() {
    return u(this, null, function* () {
      var e, r;
      try {
        return this.ipDetails || (this.ipDetails = yield gh.getIPDetails({
          peerId: (e = this.callStatsInstance) == null ? void 0 : e.peerId,
          apiHostnames: (r = this.callStatsInstance) == null ? void 0 : r.apiHostnames,
          logger: this.callStatsInstance.logger
        })), this.ipDetails;
      } catch (i) {
        return;
      }
    });
  }
  getNetworkQuality(e) {
    return u(this, null, function* () {
      const [r, i] = yield Promise.all([
        this.getConnectivity(e),
        this.getThroughput(e)
      ]);
      return {
        connectivity: r,
        throughput: i == null ? void 0 : i.throughput,
        fractionalLoss: i == null ? void 0 : i.fractionalLoss,
        RTT: i == null ? void 0 : i.RTT,
        jitter: i == null ? void 0 : i.jitter,
        backendRTT: i == null ? void 0 : i.backendRTT
      };
    });
  }
  getNetworkInfo(e, r = !1) {
    return u(this, null, function* () {
      var c, d;
      if (r) {
        const l = yield this.getIPDetails();
        return {
          ipDetails: l,
          effectiveNetworkType: (c = navigator.connection) == null ? void 0 : c.effectiveType,
          location: l != null && l.loc ? op(l == null ? void 0 : l.loc) : void 0
          // userLocation,
        };
      }
      const [i, a, o] = yield Promise.all([
        this.getConnectivity(e),
        this.getThroughput(e),
        this.getIPDetails()
      ]);
      return {
        ipDetails: o,
        effectiveNetworkType: (d = navigator.connection) == null ? void 0 : d.effectiveType,
        location: o != null && o.loc ? op(o == null ? void 0 : o.loc) : void 0,
        turnConnectivity: i ? i.host || i.relay || i.reflexive : !1,
        connectivity: i,
        throughput: a == null ? void 0 : a.throughput,
        fractionalLoss: a == null ? void 0 : a.fractionalLoss,
        RTT: a == null ? void 0 : a.RTT,
        jitter: a == null ? void 0 : a.jitter,
        backendRTT: a == null ? void 0 : a.backendRTT
      };
    });
  }
}
class Fv extends wm {
}
class Rm extends wm {
  constructor() {
    super(...arguments);
    h(this, "producerMap", /* @__PURE__ */ new Map());
    h(this, "consumerMap", /* @__PURE__ */ new Map());
  }
  registerProducer(e) {
    return u(this, null, function* () {
      this.producerMap.set(e.id, e), yield this.generateProducerStreamMap(e), e.on("close", this.deregisterProducer.bind(this, e)), e.on("pause", this.pauseProducer.bind(this, e.id)), e.on("resume", this.resumeProducer.bind(this, e.id)), e.appData.screenShare === !0 && this.screenShareProducers.add(e.id);
    });
  }
  registerConsumer(e) {
    return u(this, null, function* () {
      this.consumerMap.set(e.id, e), yield this.generateConsumerStreamMap(e), this.consumerPeerIdMap.set(e.id, {
        producerId: e.producerId,
        peerId: e.appData.peerId,
        appData: e.appData
      }), e.on("close", this.deregisterConsumer.bind(this, e)), e.on("pause", this.pauseConsumer.bind(this, e.id)), e.on("resume", this.resumeConsumer.bind(this, e.id)), e.appData.screenShare === !0 && this.screenShareConsumers.add(e.id);
    });
  }
  generateConsumerStreamMap(e, r = !1) {
    return u(this, null, function* () {
      const i = yield e.getStats(), a = this.parseRTCReport(i, ["inbound-rtp"], !1, e.id), o = [...a.consumerStreamMap.values()][0], c = r ? this.getConsumerStatsFromParsedConsumerStats(a, o, e.id) : void 0;
      for (const d of i.values())
        switch (d.type) {
          case "inbound-rtp": {
            this.inboundConsumerMap.set(d.id, e.id);
            break;
          }
        }
      return c;
    });
  }
  deregisterProducer(e) {
    this.producerMap.delete(e.id), this.outboundProducerMap.forEach((r, i) => {
      r === e.id && this.outboundProducerMap.delete(i);
    }), this.pausedProducerMap.delete(e.id), this.screenShareProducers.delete(e.id);
  }
  deregisterConsumer(e) {
    this.consumerMap.delete(e.id), this.inboundConsumerMap.forEach((r, i) => {
      r === e.id && this.inboundConsumerMap.delete(i);
    }), this.consumerPeerIdMap.delete(e.id), this.pausedConsumerMap.delete(e.id), this.screenShareConsumers.delete(e.id);
  }
  // eslint-disable-next-line class-methods-use-this
  getIceCandidateStats(e) {
    var r;
    return {
      id: e.id,
      type: e.candidateType || e.type,
      address: e.address,
      port: e.port,
      url: e.url,
      protocol: (r = e.relayProtocol) != null ? r : e.protocol,
      networkType: e.networkType,
      relatedAddress: e.relatedAddress,
      relatedPort: e.relatedPort
    };
  }
  parseRTCReport(e, r = [], i = !1, a = void 0, o = void 0) {
    var P, C, w, $, F, N, B, G, re, tt, cs, ii, ds;
    const c = e, d = new Cm(), l = r.length ? new Set(r) : void 0, p = [], g = [], S = [], v = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map();
    for (const A of c.values()) {
      if (l) {
        if (l.size === 0)
          break;
        if (l.has(A.type))
          i && l.delete(A.type);
        else
          continue;
      }
      switch (A.type) {
        case "local-candidate": {
          p.push(this.getIceCandidateStats(A));
          break;
        }
        case "remote-candidate": {
          g.push(this.getIceCandidateStats(A));
          break;
        }
        case "candidate-pair": {
          const { nominated: y } = A, { selected: R } = A, L = A, fe = {
            nominated: y != null ? y : R,
            currentRoundTripTime: L.currentRoundTripTime,
            totalRoundTripTime: L.totalRoundTripTime,
            bytesReceived: L.bytesReceived,
            bytesSent: L.bytesSent,
            availableOutgoingBitrate: L.availableOutgoingBitrate,
            availableIncomingBitrate: L.availableIncomingBitrate,
            lastPacketReceivedTimestamp: L.lastPacketReceivedTimestamp,
            lastPacketSentTimestamp: L.lastPacketSentTimestamp,
            localCandidateId: L.localCandidateId,
            remoteCandidateId: L.remoteCandidateId,
            bytesDiscardedOnSend: L.bytesDiscardedOnSend,
            packetsSent: L.packetsSent,
            packetsReceived: L.packetsReceived,
            packetsDiscardedOnSend: L.packetsDiscardedOnSend
          };
          S.push(fe), (A.nominated === !0 || A.selected === !0) && (d.candidatePair = fe);
          break;
        }
        case "transport": {
          const y = A;
          o && (o.producing && (this.overallProducingTransportsStatsMap[o.id] || (this.overallProducingTransportsStatsMap[o.id] = {
            totalPacketsSent: 0
          })), o.consuming && (this.overallConsumingTransportsStatsMap[o.id] || (this.overallConsumingTransportsStatsMap[o.id] = {
            totalPacketsReceived: 0
          })));
          const R = {
            bytesReceived: y.bytesReceived,
            bytesSent: y.bytesSent,
            packetsSent: y.packetsSent,
            packetsReceived: y.packetsReceived,
            dtlsCipher: y.dtlsCipher,
            dtlsState: y.dtlsState,
            iceRole: y.iceRole
          };
          if (d.transport = R, o) {
            if (o.producing) {
              const L = this.overallProducingTransportsStatsMap[o.id];
              this.processProducingTransportStats(o.id, L, R);
            }
            if (o.consuming) {
              const L = this.overallConsumingTransportsStatsMap[o.id];
              this.processConsumingTransportStats(o.id, L, R);
            }
          }
          break;
        }
        case "remote-inbound-rtp": {
          const y = A, R = {
            jitter: y.jitter,
            fractionLost: y.fractionLost,
            roundTripTime: y.roundTripTime,
            roundTripTimeMeasurements: y.roundTripTimeMeasurements,
            totalRoundTripTime: y.totalRoundTripTime,
            packetsLost: y.packetsLost
          };
          d.remoteInboundRtp.set(y.localId, R);
          break;
        }
        case "outbound-rtp": {
          if (!this.outboundProducerMap.has(A.id))
            break;
          const y = A, R = a || this.outboundProducerMap.get(A.id), L = this.pausedProducerMap.get(R);
          if (L) {
            if (L.lastReportCalculated === !0)
              break;
            this.pausedProducerMap.set(R, {
              lastReportCalculated: !0
            });
          }
          this.overallProducersStatsMap[R] || (this.overallProducersStatsMap[R] = {
            totalVideoPacketsSent: 0,
            totalAudioPacketsSent: 0
          });
          const fe = this.overallProducersStatsMap[R];
          if (["video", "audio"].includes(y.mediaType) || ["video", "audio"].includes(y.kind)) {
            if (!this.outboundProducerMap.has(A.id)) {
              d.staleProducerStreamMap = !0;
              break;
            }
            const xe = this.callStatsInstance.producers.get(R);
            if (((P = xe == null ? void 0 : xe.track) == null ? void 0 : P.readyState) === "ended")
              break;
            d.producerStreamMap.has(R) || d.producerStreamMap.set(R, {
              outboundVideoRtpId: [],
              outboundAudioRtpId: []
            });
            const V = {
              bytesSent: y.bytesSent,
              packetsSent: y.packetsSent,
              nackCount: y.nackCount,
              ssrc: y.ssrc,
              mid: y.mid,
              active: y.active,
              codecId: y.codecId,
              headerBytesSent: y.headerBytesSent || 0,
              totalPacketSendDelay: y.totalPacketSendDelay || 0
            };
            if (y.mediaType === "video" || y.kind === "video") {
              const I = y, Ue = D({
                frameHeight: I.frameHeight,
                frameWidth: I.frameWidth,
                framesEncoded: I.framesEncoded,
                framesDropped: I.framesDropped ? I.framesDropped : I.droppedFrames,
                framesPerSecond: I.framesPerSecond ? I.framesPerSecond : I.framerateMean,
                framesSent: I.framesSent,
                keyFramesEncoded: I.keyFramesEncoded,
                firCount: I.firCount,
                encoderImplementation: I.encoderImplementation,
                hugeFramesSent: I.hugeFramesSent,
                pliCount: I.pliCount,
                qpSum: I.qpSum,
                qualityLimitationReason: I.qualityLimitationReason,
                qualityLimitationDurations: I.qualityLimitationDurations,
                qualityLimitationResolutionChanges: I.qualityLimitationResolutionChanges,
                totalEncodeTime: I.totalEncodeTime,
                totalPacketSendDelay: I.totalEncodeTime,
                retransmittedBytesSent: I.retransmittedBytesSent,
                retransmittedPacketsSent: I.retransmittedPacketsSent,
                scalabilityMode: I.scalabilityMode,
                powerEfficientEncoder: I.powerEfficientEncoder
              }, V);
              d.outboundVideoRtp.set(A.id, Ue), d.producerStreamMap.get(R).outboundVideoRtpId.push(A.id), this.processOutboundProducerVideoStats(R, fe, Ue);
            } else if (y.mediaType === "audio" || y.kind === "audio") {
              const I = y, Ue = D({
                retransmittedBytesSent: I.retransmittedBytesSent,
                retransmittedPacketsSent: I.retransmittedPacketsSent
              }, V);
              d.outboundAudioRtp.set(A.id, Ue), d.producerStreamMap.get(R).outboundAudioRtpId.push(A.id), this.processOutboundProducerAudioStats(R, fe, Ue);
            }
          } else
            this.callStatsInstance.logger.error(`Callstats: Unknown Outbound-rtp. mediatype: ${y.mediaType} kind: ${y.kind}`);
          break;
        }
        case "inbound-rtp": {
          if (!this.inboundConsumerMap.has(A.id))
            break;
          const y = A, R = a || this.inboundConsumerMap.get(A.id), L = this.pausedConsumerMap.get(R);
          if (L) {
            if (L.lastReportCalculated === !0)
              break;
            this.pausedConsumerMap.set(R, {
              lastReportCalculated: !0
            });
          }
          if (y.ssrc === 1234)
            break;
          this.overallConsumersStatsMap[R] || (this.overallConsumersStatsMap[R] = {
            totalVideoPacketsReceived: 0,
            totalAudioPacketsReceived: 0
          });
          const fe = this.overallConsumersStatsMap[R];
          if (["video", "audio"].includes(y.mediaType) || ["video", "audio"].includes(y.kind)) {
            if (!this.inboundConsumerMap.has(A.id)) {
              d.staleConsumerStreamMap = !0;
              break;
            }
            d.consumerStreamMap.has(R) || d.consumerStreamMap.set(R, {
              inboundVideoRtpId: [],
              inboundAudioRtpId: []
            });
            const xe = {
              bytesReceived: y.bytesReceived,
              packetsReceived: y.packetsReceived,
              packetsLost: y.packetsLost >= 0 ? y.packetsLost : 0,
              jitter: y.jitter,
              nackCount: y.nackCount,
              jitterBufferDelay: y.jitterBufferDelay,
              jitterBufferEmittedCount: y.jitterBufferEmittedCount,
              lastPacketReceivedTimestamp: y.lastPacketReceivedTimestamp,
              ssrc: y.ssrc,
              mid: y.mid,
              codecId: y.codecId,
              headerBytesReceived: y.headerBytesReceived || 0,
              packetsDiscarded: y.packetsDiscarded || 0,
              jitterBufferMinimumDelay: y.jitterBufferMinimumDelay || 0,
              jitterBufferTargetDelay: y.jitterBufferTargetDelay || 0
            };
            if (y.mediaType === "video" || y.kind === "video") {
              const V = y, I = D({
                frameHeight: V.frameHeight,
                frameWidth: V.frameWidth,
                framesDecoded: V.framesDecoded,
                framesDropped: V.framesDropped ? V.framesDropped : V.droppedFrames,
                framesPerSecond: V.framesPerSecond ? V.framesPerSecond : V.framerateMean,
                framesReceived: V.framesReceived,
                keyFramesDecoded: V.keyFramesDecoded,
                firCount: V.firCount,
                decoderImplementation: V.decoderImplementation,
                pliCount: V.pliCount,
                totalProcessingDelay: V.totalProcessingDelay,
                qpSum: V.qpSum || 0,
                totalAssemblyTime: V.totalAssemblyTime || 0,
                totalDecodeTime: V.totalDecodeTime || 0,
                totalFreezesDuration: V.totalFreezesDuration || 0,
                totalInterFrameDelay: V.totalInterFrameDelay || 0,
                totalPausesDuration: V.totalPausesDuration || 0,
                totalSquaredInterFrameDelay: V.totalSquaredInterFrameDelay || 0,
                freezeCount: V.freezeCount || 0,
                pauseCount: V.pauseCount || 0,
                powerEfficientDecoder: V.powerEfficientDecoder
              }, xe);
              I.score = _m({
                frameWidth: I.frameWidth || 0,
                framesDecoded: (I.framesDecoded || 0) - (((C = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : C.framesDecoded) || 0),
                framesPerSecond: I.framesPerSecond || 0,
                packetsLost: (I.packetsLost || 0) - (((w = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : w.packetsLost) || 0),
                packetsReceived: (I.packetsReceived || 0) - ((($ = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : $.packetsReceived) || 0),
                jitter: I.jitter || 0,
                isScreenShare: this.screenShareConsumers.has(R)
              }), _.set(R, {
                score: +(I.score * 10).toFixed(),
                frameWidth: I.frameWidth || 0,
                frameHeight: I.frameHeight || 0,
                framesPerSecond: I.framesPerSecond || 0,
                packetsLostPercentage: _d({
                  packetsLost: (I.packetsLost || 0) - (((F = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : F.packetsLost) || 0),
                  packetsReceived: (I.packetsReceived || 0) - (((N = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : N.packetsReceived) || 0)
                }),
                jitter: I.jitter || 0,
                isScreenShare: this.screenShareConsumers.has(R),
                bitrate: ((I.bytesReceived || 0) - (((B = this.videoConsumerToStatsMap.get(R)) == null ? void 0 : B.bytesReceived) || 0)) * 8 / 7
                // Bytes received in last 7 seconds
              }), this.videoConsumerToStatsMap.set(R, I), d.inboundVideoRtp.set(A.id, I), d.consumerStreamMap.get(R).inboundVideoRtpId.push(A.id), this.processInboundConsumerVideoStats(R, fe, I);
            } else if (y.mediaType === "audio" || y.kind === "audio") {
              const V = y, I = D({
                audioLevel: V.audioLevel,
                concealedSamples: V.concealedSamples,
                concealmentEvents: V.concealmentEvents,
                totalAudioEnergy: V.totalAudioEnergy,
                totalSamplesDuration: V.totalSamplesDuration,
                totalSamplesReceived: V.totalSamplesReceived,
                fecPacketsDiscarded: V.fecPacketsDiscarded || 0,
                fecPacketsReceived: V.fecPacketsReceived || 0,
                insertedSamplesForDeceleration: V.insertedSamplesForDeceleration || 0,
                removedSamplesForAcceleration: V.removedSamplesForAcceleration || 0,
                silentConcealedSamples: V.silentConcealedSamples || 0,
                playoutId: V.playoutId
              }, xe);
              I.score = Em({
                concealmentEvents: (I.concealmentEvents || 0) - (((G = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : G.concealmentEvents) || 0),
                packetsLost: (I.packetsLost || 0) - (((re = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : re.packetsLost) || 0),
                packetsReceived: (I.packetsReceived || 0) - (((tt = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : tt.packetsReceived) || 0),
                jitter: I.jitter || 0
              }), _.set(R, {
                score: +(I.score * 10).toFixed(),
                packetsLostPercentage: _d({
                  packetsLost: (I.packetsLost || 0) - (((cs = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : cs.packetsLost) || 0),
                  packetsReceived: (I.packetsReceived || 0) - (((ii = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : ii.packetsReceived) || 0)
                }),
                jitter: I.jitter || 0,
                isScreenShare: this.screenShareConsumers.has(R),
                bitrate: ((I.bytesReceived || 0) - (((ds = this.audioConsumerToStatsMap.get(R)) == null ? void 0 : ds.bytesReceived) || 0)) * 8 / 7
                // Bytes received in last 7 seconds
              }), this.audioConsumerToStatsMap.set(R, I), d.inboundAudioRtp.set(A.id, I), d.consumerStreamMap.get(R).inboundAudioRtpId.push(A.id), this.processInboundConsumerAudioStats(R, fe, I);
            }
          } else
            this.callStatsInstance.logger.error(`Callstats: Unknown Inbound-rtp. mediatype: ${y.mediaType} kind: ${y.kind}`);
          break;
        }
      }
    }
    if (d.producerStreamMap.forEach((A, y) => {
      var R, L, fe, xe, V, I, Ue, Cr, qs, qa, ja, Ga, Wa, Ja, Ka, za, Ya, Qa, Xa, Za, eo, to, so;
      if (A.outboundVideoRtpId.length > 0) {
        const le = [];
        A.outboundVideoRtpId.forEach((Xl) => {
          le.push(d.outboundVideoRtp.get(Xl));
        });
        const se = this.getWorkingSimulcastVideoStats(le);
        se.score = Tm({
          frameWidth: se.frameWidth || 0,
          framesPerSecond: se.framesPerSecond || 0,
          jitter: ((R = se.remoteData) == null ? void 0 : R.jitter) || 0,
          isScreenShare: this.screenShareProducers.has(y),
          packetsSent: (se.packetsSent || 0) - (((L = this.videoProducerToStatsMap.get(y)) == null ? void 0 : L.packetsSent) || 0),
          packetsLost: (((fe = se.remoteData) == null ? void 0 : fe.packetsLost) || 0) - (((V = (xe = this.videoProducerToStatsMap.get(y)) == null ? void 0 : xe.remoteData) == null ? void 0 : V.packetsLost) || 0),
          framesEncoded: (se.framesEncoded || 0) - (((I = this.videoProducerToStatsMap.get(y)) == null ? void 0 : I.framesEncoded) || 0)
        }), v.set(y, {
          score: +(se.score * 10).toFixed(),
          frameWidth: se.frameWidth || 0,
          frameHeight: se.frameHeight || 0,
          framesPerSecond: se.framesPerSecond || 0,
          jitter: ((Ue = se.remoteData) == null ? void 0 : Ue.jitter) || 0,
          isScreenShare: this.screenShareProducers.has(y),
          packetsLostPercentage: Ed({
            packetsSent: (se.packetsSent || 0) - (((Cr = this.videoProducerToStatsMap.get(y)) == null ? void 0 : Cr.packetsSent) || 0),
            packetsLost: (((qs = se.remoteData) == null ? void 0 : qs.packetsLost) || 0) - (((ja = (qa = this.videoProducerToStatsMap.get(y)) == null ? void 0 : qa.remoteData) == null ? void 0 : ja.packetsLost) || 0)
          }),
          bitrate: ((se.bytesSent || 0) - (((Ga = this.videoProducerToStatsMap.get(y)) == null ? void 0 : Ga.bytesSent) || 0)) * 8 / 7,
          cpuLimitations: se.qualityLimitationReason === "cpu",
          bandwidthLimitations: se.qualityLimitationReason === "bandwidth"
        }), this.videoProducerToStatsMap.set(y, se);
      } else if (A.outboundAudioRtpId.length > 0) {
        const le = d.outboundAudioRtp.get(A.outboundAudioRtpId[0]);
        le.score = vm({
          packetsSent: (le.packetsSent || 0) - (((Wa = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Wa.packetsSent) || 0),
          packetsLost: (((Ja = le.remoteData) == null ? void 0 : Ja.packetsLost) || 0) - (((za = (Ka = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Ka.remoteData) == null ? void 0 : za.packetsLost) || 0),
          jitter: ((Ya = le.remoteData) == null ? void 0 : Ya.jitter) || 0
        }), v.set(y, {
          score: +(le.score * 10).toFixed(),
          bitrate: ((le.bytesSent || 0) - (((Qa = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Qa.bytesSent) || 0)) * 8 / 7,
          packetsLostPercentage: Ed({
            packetsSent: (le.packetsSent || 0) - (((Xa = this.audioProducerToStatsMap.get(y)) == null ? void 0 : Xa.packetsSent) || 0),
            packetsLost: (((Za = le.remoteData) == null ? void 0 : Za.packetsLost) || 0) - (((to = (eo = this.audioProducerToStatsMap.get(y)) == null ? void 0 : eo.remoteData) == null ? void 0 : to.packetsLost) || 0)
          }),
          jitter: ((so = le.remoteData) == null ? void 0 : so.jitter) || 0,
          isScreenShare: this.screenShareProducers.has(y)
        }), this.audioProducerToStatsMap.set(y, le);
      }
    }), S.forEach((A) => {
      const y = p.find((L) => L.id === A.localCandidateId ? (A.localCandidateId = L.id, L) : null), R = g.find((L) => L.id === A.remoteCandidateId ? (A.remoteCandidateId = L.id, L) : null);
      y && (A.localCandidateType = y.type, A.localCandidateAddress = Zr(y.address), A.localCandidatePort = y.port, A.localCandidateProtocol = y.protocol, A.localCandidateUrl = y.url, A.localCandidateNetworkType = y.networkType, A.localCandidateRelatedAddress = Zr(y.relatedAddress), A.localCandidateRelatedPort = y.relatedPort), R && (A.remoteCandidateType = R.type, A.remoteCandidateAddress = Zr(R.address), A.remoteCandidatePort = R.port, A.remoteCandidateProtocol = R.protocol, A.remoteCandidateUrl = R.url);
    }), d.candidatePair && (d.transport ? (d.transport.bytesReceived = d.candidatePair.bytesReceived, d.transport.bytesSent = d.candidatePair.bytesSent, d.transport.totalRoundTripTime = d.candidatePair.totalRoundTripTime, d.transport.availableOutgoingBitrate = d.candidatePair.availableOutgoingBitrate, d.transport.availableIncomingBitrate = d.candidatePair.availableIncomingBitrate, d.transport.roundTripTime = d.candidatePair.currentRoundTripTime) : d.transport = {
      // candidateStats: result.candidatePair,
      bytesReceived: d.candidatePair.bytesReceived,
      bytesSent: d.candidatePair.bytesSent,
      totalRoundTripTime: d.candidatePair.totalRoundTripTime,
      availableOutgoingBitrate: d.candidatePair.availableOutgoingBitrate,
      availableIncomingBitrate: d.candidatePair.availableIncomingBitrate,
      roundTripTime: d.candidatePair.currentRoundTripTime
    }), d.transport && (d.transport.candidatePairs = S), d.transport && !d.transport.roundTripTime) {
      let A = 0, y = 0;
      d.remoteInboundRtp.forEach((R, L) => {
        R.roundTripTime && R.roundTripTime > A && (A = R.roundTripTime, y = R.totalRoundTripTime);
      }), d.transport.roundTripTime = A, d.transport.totalRoundTripTime = y;
    }
    if (_.size > 0)
      try {
        this.observer.emit("consumer_score", _);
      } catch (A) {
      }
    if (v.size > 0)
      try {
        this.observer.emit("producer_score", v);
      } catch (A) {
      }
    return d;
  }
  getProducerStatsFromReport(e) {
    const r = [];
    try {
      e.producerStreamMap.forEach((i, a) => {
        const o = this.producerMap.get(a), c = o.track.getSettings(), d = i.outboundVideoRtpId.map((p) => {
          const g = e.outboundVideoRtp.get(p);
          return g.frameHeight || (g.frameHeight = c.height, g.frameWidth = c.width, g.framesPerSecond = c.frameRate), g;
        }), l = {
          producerId: a,
          appData: o.appData,
          videoStats: d,
          audioStats: i.outboundAudioRtpId.map((p) => e.outboundAudioRtp.get(p))
        };
        r.push(l);
      });
    } catch (i) {
      console.error("getProducersReport: ", i, e);
    }
    return r;
  }
  getConsumerStatsFromParsedConsumerStats(e, r, i) {
    let a;
    try {
      const { peerId: o, producerId: c, appData: d } = this.consumerPeerIdMap.get(i), l = r == null ? void 0 : r.inboundVideoRtpId.map((p) => {
        const S = this.consumerMap.get(i).track.getSettings(), v = e.inboundVideoRtp.get(p);
        return v.frameHeight || (v.frameHeight = S.height, v.frameWidth = S.width, v.framesPerSecond = S.frameRate), v;
      });
      a = {
        consumerId: i,
        peerId: o,
        producerId: c,
        appData: d,
        videoStats: l,
        audioStats: r == null ? void 0 : r.inboundAudioRtpId.map((p) => e.inboundAudioRtp.get(p))
      };
    } catch (o) {
      console.error("getConsumerStatsFromParsedConsumerStats: ", o, e);
    }
    return a;
  }
  getConsumerStatsFromReport(e) {
    const r = [];
    try {
      e.consumerStreamMap.forEach((i, a) => {
        r.push(this.getConsumerStatsFromParsedConsumerStats(e, i, a));
      });
    } catch (i) {
      console.error("getConsumerStatsFromReport: ", i, e);
    }
    return r;
  }
}
class Bv extends Rm {
}
function Pd(s, t, e, r) {
  if (s != null && s.logger && s.logger.error("Callstats::handleError", { error: r }), typeof e == "function" && r instanceof t)
    e.call(null, r, s);
  else
    throw r;
}
function cp(s, t, e) {
  const r = s.value;
  return s.value = function(...i) {
    try {
      const a = r.apply(this, i);
      return a && a instanceof Promise ? a.catch((o) => {
        Pd(this, t, e, o);
      }) : a;
    } catch (a) {
      Pd(this, t, e, a);
    }
    return null;
  }, s;
}
const X = (s, t) => (e, r, i) => {
  const a = i.value;
  return i.value = function(...o) {
    try {
      const c = a.apply(this, o);
      return c && c instanceof Promise ? c.catch((d) => {
        Pd(this, s, t, d);
      }) : c;
    } catch (c) {
      Pd(this, s, t, c);
    }
    return null;
  }, i;
}, Hv = (s, t) => (e, r, i) => {
  if (i)
    return cp(i, s, t);
  for (const a of Reflect.ownKeys(e.prototype).filter((o) => o !== "constructor")) {
    const o = Object.getOwnPropertyDescriptor(e.prototype, a);
    o.value instanceof Function && Object.defineProperty(e.prototype, a, cp(o, s, t));
  }
};
var Y = globalThis && globalThis.__decorate || function(s, t, e, r) {
  var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, e) : r, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    a = Reflect.decorate(s, t, e, r);
  else
    for (var c = s.length - 1; c >= 0; c--)
      (o = s[c]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, e, a) : o(t, e)) || a);
  return i > 3 && a && Object.defineProperty(t, e, a), a;
};
const Q = console;
let K = class extends lt {
  constructor(e = "https://api.testingv3.dyte.in", r = "Blink", i = To.PROD, a, o, c, d) {
    super();
    h(this, "observer");
    h(this, "eventHandler");
    h(this, "measurements");
    h(this, "producingTransport");
    h(this, "consumingTransport");
    h(this, "producers", /* @__PURE__ */ new Map());
    h(this, "consumers", /* @__PURE__ */ new Map());
    h(this, "iceServers");
    h(this, "connectionInfoPromise");
    h(this, "pingStatsTimeout");
    h(this, "logger");
    h(this, "env");
    h(this, "apiHostnames");
    h(this, "peerId");
    h(this, "consumerSharedMediaStatesMap", /* @__PURE__ */ new Map());
    h(this, "currentUserMediaStates", {});
    switch (this.env = i, this.apiHostnames = d, this.logger = o, this.peerId = c, this.eventHandler = new Rv({ logger: o, peerId: c, apiHostnames: d }), this.logger.debug("callStats::engineName: ", { engineName: r }), r) {
      case "Blink":
        this.measurements = new Fv();
        break;
      case "Gecko":
        this.measurements = new Rm();
        break;
      case "WebKit":
        this.measurements = new Bv();
        break;
      default:
        throw Error(`Unknown engineName! ${r}`);
    }
    this.measurements.callStatsInstance = this, this.registerProducer = this.registerProducer.bind(this), this.registerConsumer = this.registerConsumer.bind(this), this.observer = new lt(), this.measurements.observer.on("consumer_score", (l) => {
      o.debug(`callStats::consumer_score ${[...l.entries()]}`), this.eventHandler.emit("consumer_score", l);
    }), this.measurements.observer.on("producer_score", (l) => {
      o.debug(`callStats::producer_score ${[...l.entries()]}`), this.eventHandler.emit("producer_score", l);
    });
  }
  registerIceServers(e) {
    this.iceServers = e;
  }
  registerConsumer(e) {
    var r;
    this.consumerSharedMediaStatesMap.has(e.id) || this.consumerSharedMediaStatesMap.set(e.id, {}), this.consumers.set(e.id, e), this.measurements.registerConsumer(e), this.logger.debug("callStats::registerConsumer", { consumerId: e.id, consumerkind: e.kind, isScreenShare: !!((r = e.appData) != null && r.screenShare) }), e.on("close", this.deRegisterConsumer.bind(this, e));
  }
  registerProducer(e) {
    var r;
    this.producers.set(e.id, e), this.measurements.registerProducer(e), this.logger.debug("callStats::registerProducer", { producerId: e.id, producerKind: e.kind, isScreenShare: !!((r = e.appData) != null && r.screenShare) }), e.on("close", this.deRegisterProducer.bind(this, e));
  }
  sendConsumerSharedMediaStateEvent(e, r) {
    this.consumerSharedMediaStatesMap.has(e) || this.consumerSharedMediaStatesMap.set(e, {});
    const i = this.consumerSharedMediaStatesMap.get(e);
    this.consumerSharedMediaStatesMap.set(e, Object.assign(i, r));
  }
  registerProducingTransport(e) {
    var i;
    this.producingTransport = e, e.on("close", this.disconnectProducingTransport.bind(this, e)), e.on("disconnect", this.disconnectProducingTransport.bind(this, e)), Array.from(
      // eslint-disable-next-line no-underscore-dangle
      ((i = e._producers) == null ? void 0 : i.values()) || []
    ).forEach((a) => {
      this.registerProducer(a);
    }), e.on("newproducer", this.registerProducer);
  }
  registerConsumingTransport(e) {
    var i;
    this.consumingTransport = e, e.on("close", this.disconnectConsumingTransport.bind(this, e)), e.on("disconnect", this.disconnectConsumingTransport.bind(this, e)), Array.from(
      // eslint-disable-next-line no-underscore-dangle
      ((i = e._consumers) == null ? void 0 : i.values()) || []
    ).forEach((a) => {
      this.registerConsumer(a);
    }), e.on("newconsumer", this.registerConsumer);
  }
  deRegisterConsumer(e) {
    this.consumers.delete(e.id);
  }
  deRegisterProducer(e) {
    var r;
    this.producers.delete(e.id), this.logger.debug("callStats::deRegisterProducer", { producerId: e.id, producerKind: e.kind, isScreenShare: !!((r = e.appData) != null && r.screenShare) });
  }
  disconnectConsumingTransport() {
    this.consumingTransport = void 0;
  }
  disconnectProducingTransport() {
    this.producingTransport = void 0;
  }
  callEvent(e) {
    this.eventHandler.callEvent(e);
  }
  sendPreCallTestBeginEvent(e = !1, r) {
    this.connectionInfoPromise = this.measurements.getNetworkInfo(this.iceServers, e), this.eventHandler.callEvent({
      event: O.PRECALL_TEST_BEGIN,
      timestamp: r
    }), this.connectionInfoPromise && this.connectionInfoPromise.then((i) => {
      this.eventHandler.callEvent({
        event: O.PRECALL_TEST_COMPLETE,
        metaData: {
          connectionInfo: i
        },
        timestamp: r
      });
    });
  }
  sendScreenShareToggleEvent(e, r = null, i) {
    this.currentUserMediaStates.screen = e, this.eventHandler.callEvent({
      event: e ? O.SCREENSHARE_STARTED : O.SCREENSHARE_STOPPED,
      metaData: {
        ssrc: r
      },
      timestamp: i
    });
  }
  sendScreenShareRequestedEvent(e) {
    this.eventHandler.callEvent({
      event: O.SCREENSHARE_START_REQUESTED,
      timestamp: e
    });
  }
  sendActiveSpeakerEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.DOMINANT_SPEAKER,
      metaData: {
        peerId: e
      },
      timestamp: r
    });
  }
  devices(e, r, i) {
    this.eventHandler.callEvent({
      event: e === Jt.AUDIO && O.AUDIO_DEVICES_UPDATES || e === Jt.VIDEO && O.VIDEO_DEVICES_UPDATES || e === Jt.SPEAKER && O.SPEAKER_DEVICES_UPDATES,
      metaData: {
        deviceList: r
      },
      timestamp: i
    });
  }
  selectedDevice(e, r, i) {
    this.eventHandler.callEvent({
      event: e === Jt.AUDIO && O.SELECTED_MICROHPONE_UPDATE || e === Jt.VIDEO && O.SELECTED_CAMERA_UPDATE || e === Jt.SPEAKER && O.SELECTED_SPEAKER_UPDATE,
      metaData: {
        device: r
      },
      timestamp: i
    });
  }
  mediaPermission(e, r, i) {
    this.eventHandler.callEvent({
      event: O.MEDIA_PERMISSION,
      metaData: {
        deviceType: e,
        permission: r
      },
      timestamp: i
    });
  }
  mediaPlaybackFailed(e, r) {
    this.eventHandler.callEvent({
      event: e === Jt.AUDIO && O.AUDIO_PLAY_FAILED || e === Jt.VIDEO && O.VIDEO_PLAY_FAILED,
      metaData: {
        deviceType: e
      },
      timestamp: r
    });
  }
  mediaTrackMuted(e, r) {
    this.eventHandler.callEvent({
      event: e === Jt.AUDIO && O.AUDIO_TRACK_MUTED || e === Jt.VIDEO && O.VIDEO_TRACK_MUTED,
      metaData: {
        deviceType: e
      },
      timestamp: r
    });
  }
  tabChanged(e, r) {
    this.eventHandler.callEvent({
      event: O.TAB_CHANGE,
      metaData: { isMeetingsTabActive: e },
      timestamp: r
    });
  }
  browserBackgrounded(e) {
    this.eventHandler.callEvent({
      event: O.BROWSER_BACKGROUNDED,
      timestamp: e
    });
  }
  browserForegrounded(e) {
    this.eventHandler.callEvent({
      event: O.BROWSER_FOREGROUNDED,
      timestamp: e
    });
  }
  legacySwitch(e, r) {
    this.eventHandler.callEvent({
      event: O.LEGACY_SWITCH,
      metadata: { on: e },
      timestamp: r
    });
  }
  getPreCallTestResults() {
    return u(this, null, function* () {
      return this.connectionInfoPromise;
    });
  }
  sendCallJoinBeginEvent(e, r) {
    e = H(D({}, e), {
      meetingEnv: this.env
    }), e.deviceInfo = H(D({}, e.deviceInfo), {
      userAgent: navigator.userAgent,
      cpus: navigator.hardwareConcurrency,
      memory: navigator.deviceMemory
    }), this.eventHandler.callEvent({
      event: O.CALL_JOIN_BEGIN,
      metaData: {
        peerMetaData: e
      },
      timestamp: r
    });
  }
  sendNetworkQualityTestBeginEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.NET_QUALITY_TEST_BEGIN,
      timestamp: r
    }), new Promise((a, o) => u(this, null, function* () {
      const c = [];
      try {
        for (const d of e)
          try {
            if (d.iceServers && d.iceServers.length > 0) {
              const l = yield this.measurements.getNetworkQuality(d.iceServers);
              c.push(H(D({}, d), {
                networkResults: l
              }));
            }
          } catch (l) {
            console.warn("Error handling ", l);
          }
        a({
          regionData: c
        });
      } catch (d) {
        console.warn("Error in callstats, ", d), o(d);
      }
    })).then((a) => {
      this.eventHandler.callEvent({
        event: O.NET_QUALITY_TEST_END,
        timestamp: r,
        metaData: a
      });
    });
  }
  sendWebSocketConnectedEvent(e) {
    this.eventHandler.callEvent({
      event: O.WEBSOCKET_CONNECTED,
      timestamp: e
    });
  }
  sendTransportConnectedEvent(e) {
    this.eventHandler.callEvent({
      event: O.TRANSPORT_CONNECTED,
      timestamp: e
    });
  }
  sendAudioToggleEvent(e, r) {
    this.currentUserMediaStates.audio = e;
    let i;
    e ? i = O.AUDIO_ON : i = O.AUDIO_OFF, this.eventHandler.callEvent({
      event: i,
      timestamp: r
    });
  }
  sendVideoToggleEvent(e, r) {
    this.currentUserMediaStates.video = e;
    let i;
    e ? i = O.VIDEO_ON : i = O.VIDEO_OFF, this.eventHandler.callEvent({
      event: i,
      timestamp: r
    });
  }
  sendParticipantRoleToggleEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.PARTICIPANT_ROLE,
      timestamp: r,
      metaData: e
    });
  }
  startPingStats(e = 7e3) {
    this.sendPingStatsEvent(!1, new Date()), this.pingStatsTimeout = setInterval(this.sendPingStatsEvent.bind(this), e);
  }
  stopPingStats() {
    clearInterval(this.pingStatsTimeout);
  }
  sendPingStatsEvent(e = !0, r) {
    return u(this, null, function* () {
      let i, a;
      if (this.producingTransport && (i = yield this.measurements.getProcessedStats(this.producingTransport, !1, !0), !i || !(i != null && i.producerReport))) {
        this.logger.debug("callStats::sendPingStatsEvent::staleProducingTransport", { disclaimer: "Stale producer? Regenerating Stream Maps!" });
        const c = yield this.measurements.getProducersReport([...this.producers.values()]);
        i && c ? i.producerReport = c : (i = yield this.measurements.getProcessedStats(this.producingTransport, !1, !0), (!i || !(i != null && i.producerReport)) && this.logger.debug("callStats::sendPingStatsEvent::noProducingTransportReport", { disclaimer: "Stream maps invalid despite regenerating!" }));
      }
      if (this.consumingTransport && (a = yield this.measurements.getProcessedStats(this.consumingTransport, !0, !1), !a || !a.consumerReport)) {
        this.logger.debug("callStats::sendPingStatsEvent::staleConsumingTransport", { disclaimer: "Stale consumer? Regenerating Stream Maps!" });
        const c = yield this.measurements.getConsumersReport([...this.consumers.values()]);
        a && c ? a.consumerReport = c : (a = yield this.measurements.getProcessedStats(this.consumingTransport, !0, !1), (!a || !a.consumerReport) && this.logger.debug("callStats::sendPingStatsEvent::noConsumingTransportReport", { disclaimer: "Stream maps invalid despite regenerating!" }));
      }
      const o = {
        producingTransportStats: i ? i == null ? void 0 : i.transportReport : void 0,
        consumingTransportStats: a ? a == null ? void 0 : a.transportReport : void 0,
        producerStats: [].concat((i == null ? void 0 : i.producerReport) || []).concat((a == null ? void 0 : a.producerReport) || []),
        consumerStats: [].concat((a == null ? void 0 : a.consumerReport) || []).concat((i == null ? void 0 : i.consumerReport) || [])
      };
      if (e && o.producerStats.length === 0 && o.consumerStats.length === 0) {
        yield this.eventHandler.flush();
        return;
      }
      this.eventHandler.callEvent({
        event: O.PING_STAT,
        metaData: o,
        timestamp: r
      });
    });
  }
  sendIVSPlayerRebufferEvent(e) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_REBUFFERING,
      timestamp: e
    });
  }
  sendIVSPlayerAudioBlockEvent(e) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_AUDIO_BLOCKED,
      timestamp: e
    });
  }
  sendIVSPlayerPlaybackBlockedEvent(e) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_PLAYBACK_BLOCKED,
      timestamp: e
    });
  }
  sendIVSPlayerNetworkUnavailableEvent(e) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_NETWORK_UNAVAILABLE,
      timestamp: e
    });
  }
  sendIVSPlayerInitializedEvent(e) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_INITIALIZED,
      timestamp: e
    });
  }
  sendIVSPlayerWorkerErrorEvent(e) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_WORKER_ERROR,
      timestamp: e
    });
  }
  sendIVSPlayerErrorEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_ERROR,
      timestamp: r,
      metaData: e
    });
  }
  sendIVSPlayerRecoverableErrorEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_RECOVERABLE_ERROR,
      timestamp: r,
      metaData: e
    });
  }
  sendIVSPlayerAnalyticsEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_ANALYTICS_EVENT,
      timestamp: r,
      metaData: e
    });
  }
  sendIVSPlayerPlaybackRateChangedEvent(e, r) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_PLAYBACK_RATE_CHANGED,
      timestamp: r,
      metaData: {
        updatedPlaybackRate: e
      }
    });
  }
  sendIVSPlayerQualityChanged(e, r) {
    this.eventHandler.callEvent({
      event: O.IVS_PLAYER_QUALITY_CHANGED,
      timestamp: r,
      metaData: e
    });
  }
  sendPlayerLiveLatency(e, r) {
    this.eventHandler.callEvent({
      event: O.LIVESTREAM_LATENCY,
      timestamp: r,
      metaData: {
        latency: e
      }
    });
  }
  sendDisconnectEvent(e) {
    this.eventHandler.callEvent({
      event: O.DISCONNECT,
      timestamp: e
    });
  }
  sendReconnectEvent(e) {
    this.eventHandler.callEvent({
      event: O.RECONNECT_ATTEMPT,
      timestamp: e
    });
  }
  expectedVideoResolution(e, r, i) {
    this.eventHandler.callEvent({
      event: O.EXPECTED_VIDEO_RESOLUTION,
      timestamp: i,
      metaData: {
        frameWidth: e,
        frameHeight: r
      }
    });
  }
  expectedScreenshareResolution(e, r, i) {
    this.eventHandler.callEvent({
      event: O.EXPECTED_SCREENSHARE_RESOLUTION,
      timestamp: i,
      metaData: {
        frameWidth: e,
        frameHeight: r
      }
    });
  }
};
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "registerIceServers", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "registerConsumer", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "registerProducer", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendConsumerSharedMediaStateEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "registerProducingTransport", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "registerConsumingTransport", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "deRegisterConsumer", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "deRegisterProducer", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "disconnectConsumingTransport", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "disconnectProducingTransport", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendPreCallTestBeginEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendScreenShareToggleEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendScreenShareRequestedEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendActiveSpeakerEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "devices", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "selectedDevice", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "mediaPermission", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "mediaPlaybackFailed", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "mediaTrackMuted", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "tabChanged", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "browserBackgrounded", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "browserForegrounded", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "legacySwitch", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "getPreCallTestResults", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendCallJoinBeginEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendNetworkQualityTestBeginEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendWebSocketConnectedEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendTransportConnectedEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendAudioToggleEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendVideoToggleEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendParticipantRoleToggleEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "startPingStats", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "stopPingStats", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendPingStatsEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerRebufferEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerAudioBlockEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerPlaybackBlockedEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerNetworkUnavailableEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerInitializedEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerWorkerErrorEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerErrorEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerRecoverableErrorEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerAnalyticsEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerPlaybackRateChangedEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendIVSPlayerQualityChanged", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendPlayerLiveLatency", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendDisconnectEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "sendReconnectEvent", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "expectedVideoResolution", null);
Y([
  X(TypeError, (s, t) => Q.error(t, s))
], K.prototype, "expectedScreenshareResolution", null);
K = Y([
  Hv(TypeError, (s, t) => Q.error(t, s))
], K);
const qv = K;
class bm extends lt {
  constructor() {
    super(...arguments);
    h(this, "stats");
    h(this, "peerId");
    h(this, "backend");
    h(this, "iceServers");
    h(this, "initialized", !1);
    h(this, "stalled", !1);
    // Initialization will never occur
    h(this, "ipInformation");
    h(this, "logger");
  }
  initialize(g) {
    return u(this, arguments, function* ({ peerId: e, engineName: r, env: i = To.PROD, iceServers: a, apiBase: o = "https://api.cluster.dyte.in", flags: c, logger: d = console, apiHostnames: l, skipConnectivityChecks: p = !1 }) {
      var S, v, _;
      try {
        this.peerId = e, this.logger = d, this.ipInformation = yield gh.getIPDetails({ peerId: e, apiHostnames: l, logger: d }), this.backend = new qv(o, r, i, c, d, e, l), this.iceServers = a, (S = this.backend) == null || S.registerIceServers(this.iceServers), this.initialized = !0, (_ = (v = this.backend) == null ? void 0 : v.eventHandler) == null || _.emit("initialized", this.ipInformation), this.emit("initialized", this.ipInformation), this.startPreCallTest(p);
      } catch (P) {
        this.logger.error("callStats::CallStatsIntegration: ", { error: P }), this.stallCallStats();
      }
    });
  }
  configureSendTransport(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.registerProducingTransport(e);
    });
  }
  configureRecvTransport(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.registerConsumingTransport(e);
    });
  }
  candidateRegionalNetworkQualityTest(e) {
    return u(this, null, function* () {
      const r = new Date();
      this.onSafeInitialization(() => {
        var i;
        try {
          (i = this.backend) == null || i.sendNetworkQualityTestBeginEvent(e, r);
        } catch (a) {
          this.logger.error("callStats::sendNetworkQualityTestBeginEvent", { error: { reason: a.reason } });
        }
      });
    });
  }
  roomJoined(e) {
    return u(this, null, function* () {
      const r = new Date();
      this.onSafeInitialization(() => {
        var i, a;
        (i = this.backend) == null || i.sendCallJoinBeginEvent(e, r), this.backend, (a = this.backend) == null || a.startPingStats();
      });
    });
  }
  audioOff() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.sendAudioToggleEvent(!1, e);
    });
  }
  audioOn() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.sendAudioToggleEvent(!0, e);
    });
  }
  videoOff() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.sendVideoToggleEvent(!1, e);
    });
  }
  videoOn() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.sendVideoToggleEvent(!0, e);
    });
  }
  callEnded() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r, i;
      (r = this.backend) == null || r.stopPingStats(), (i = this.backend) == null || i.sendDisconnectEvent(e);
    });
  }
  screenShareStart(e) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.sendScreenShareToggleEvent(!0, e, r);
    });
  }
  consumerSharedMediaState(e, r) {
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.sendConsumerSharedMediaStateEvent(e, r);
    });
  }
  screenShareStop(e) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.sendScreenShareToggleEvent(!1, e, r);
    });
  }
  screenShareRequested() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.sendScreenShareRequestedEvent(e);
    });
  }
  activeSpeaker(e) {
    if (e !== this.peerId)
      return;
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.sendActiveSpeakerEvent(e, r);
    });
  }
  devices(e, r) {
    const i = new Date();
    this.onSafeInitialization(() => {
      var a;
      (a = this.backend) == null || a.devices(e, r, i);
    });
  }
  selectedDevice(e, r) {
    const i = new Date();
    this.onSafeInitialization(() => {
      var a;
      (a = this.backend) == null || a.selectedDevice(e, r, i);
    });
  }
  mediaPermission(e, r) {
    const i = new Date();
    this.onSafeInitialization(() => {
      var a;
      (a = this.backend) == null || a.mediaPermission(e, r, i);
    });
  }
  mediaPlaybackFailed(e) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.mediaPlaybackFailed(e, r);
    });
  }
  mediaTrackMuted(e) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.mediaTrackMuted(e, r);
    });
  }
  tabChanged(e = !1) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.tabChanged(e, r);
    });
  }
  browserBackgrounded() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.browserBackgrounded(e);
    });
  }
  browserForegrounded() {
    const e = new Date();
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.browserForegrounded(e);
    });
  }
  legacySwitch(e) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.legacySwitch(e, r);
    });
  }
  startPreCallTest(e = !1) {
    return u(this, null, function* () {
      const r = new Date();
      this.onSafeInitialization(() => {
        var i;
        (i = this.backend) == null || i.sendPreCallTestBeginEvent(e, r);
      });
    });
  }
  onPreCallTestResults(e) {
    return this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.once("precall_end", e);
    }), e;
  }
  onReceivingConsumerAudioStatus(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("consumer_audio_status", e);
    });
  }
  onReceivingConsumerVideoStatus(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("consumer_video_status", e);
    });
  }
  onReceivingProducerAudioStatus(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("producer_audio_status", e);
    });
  }
  onReceivingProducerVideoStatus(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("producer_video_status", e);
    });
  }
  onReceivingProducingTransportStatus(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("producing_transport_status", e);
    });
  }
  onReceivingConsumingTransportStatus(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("consuming_transport_status", e);
    });
  }
  onProducerScore(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("producer_score", e);
    });
  }
  onConsumerScore(e) {
    this.onSafeInitialization(() => {
      var r;
      (r = this.backend) == null || r.eventHandler.on("consumer_score", e);
    });
  }
  onSafeInitialization(e) {
    if (this.initialized)
      e(this.ipInformation, !1);
    else if (!this.stalled) {
      const r = (i) => {
        e(i, !0);
      };
      return this.once("initialized", r), r;
    }
    return () => {
    };
  }
  removeInitializationListener(e) {
    this.removeListener("initialized", e);
  }
  stallCallStats() {
    this.stalled = !0, this.removeAllListeners("initialized");
  }
  ivsPlayerEvent(e, r) {
    const i = new Date();
    this.onSafeInitialization(() => {
      var a, o, c, d, l, p, g, S, v, _, P;
      switch (e) {
        case "PlayerRebuffering":
          (a = this.backend) == null || a.sendIVSPlayerRebufferEvent(i);
          break;
        case "PlayerAudioBlocked":
          (o = this.backend) == null || o.sendIVSPlayerAudioBlockEvent(i);
          break;
        case "PlayerPlaybackBlocked":
          (c = this.backend) == null || c.sendIVSPlayerPlaybackBlockedEvent(i);
          break;
        case "PlayerNetworkUnavailable":
          (d = this.backend) == null || d.sendIVSPlayerNetworkUnavailableEvent(i);
          break;
        case "PlayerInitialized":
          (l = this.backend) == null || l.sendIVSPlayerInitializedEvent(i);
          break;
        case "PlayerWorkerError":
          (p = this.backend) == null || p.sendIVSPlayerWorkerErrorEvent(i);
          break;
        case "PlayerError":
          (g = this.backend) == null || g.sendIVSPlayerErrorEvent(r, i);
          break;
        case "PlayerRecoverableError":
          (S = this.backend) == null || S.sendIVSPlayerRecoverableErrorEvent(r, i);
          break;
        case "PlayerAnalyticsEvent":
          (v = this.backend) == null || v.sendIVSPlayerAnalyticsEvent(r, i);
          break;
        case "PlayerPlaybackRateChanged":
          (_ = this.backend) == null || _.sendIVSPlayerPlaybackRateChangedEvent(r, i);
          break;
        case "PlayerQualityChanged":
          (P = this.backend) == null || P.sendIVSPlayerQualityChanged(r, i);
          break;
      }
    });
  }
  livestreamLatency(e) {
    const r = new Date();
    this.onSafeInitialization(() => {
      var i;
      (i = this.backend) == null || i.sendPlayerLiveLatency(e, r);
    });
  }
  expectedVideoResolution(e, r) {
    const i = new Date();
    this.onSafeInitialization(() => {
      var a;
      (a = this.backend) == null || a.expectedVideoResolution(e, r, i);
    });
  }
  expectedScreenshareResolution(e, r) {
    const i = new Date();
    this.onSafeInitialization(() => {
      var a;
      (a = this.backend) == null || a.expectedScreenshareResolution(e, r, i);
    });
  }
}
const jv = new bm();
jv.setMaxListeners(30);
function Gv() {
  this.__data__ = [], this.size = 0;
}
function xc(s, t) {
  return s === t || s !== s && t !== t;
}
function Dl(s, t) {
  for (var e = s.length; e--; )
    if (xc(s[e][0], t))
      return e;
  return -1;
}
var Wv = Array.prototype, Jv = Wv.splice;
function Kv(s) {
  var t = this.__data__, e = Dl(t, s);
  if (e < 0)
    return !1;
  var r = t.length - 1;
  return e == r ? t.pop() : Jv.call(t, e, 1), --this.size, !0;
}
function zv(s) {
  var t = this.__data__, e = Dl(t, s);
  return e < 0 ? void 0 : t[e][1];
}
function Yv(s) {
  return Dl(this.__data__, s) > -1;
}
function Qv(s, t) {
  var e = this.__data__, r = Dl(e, s);
  return r < 0 ? (++this.size, e.push([s, t])) : e[r][1] = t, this;
}
function yr(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var r = s[t];
    this.set(r[0], r[1]);
  }
}
yr.prototype.clear = Gv;
yr.prototype.delete = Kv;
yr.prototype.get = zv;
yr.prototype.has = Yv;
yr.prototype.set = Qv;
function Xv() {
  this.__data__ = new yr(), this.size = 0;
}
function Zv(s) {
  var t = this.__data__, e = t.delete(s);
  return this.size = t.size, e;
}
function eT(s) {
  return this.__data__.get(s);
}
function tT(s) {
  return this.__data__.has(s);
}
var sT = typeof global == "object" && global && global.Object === Object && global;
const km = sT;
var rT = typeof self == "object" && self && self.Object === Object && self, iT = km || rT || Function("return this")();
const ks = iT;
var nT = ks.Symbol;
const Bs = nT;
var Im = Object.prototype, aT = Im.hasOwnProperty, oT = Im.toString, no = Bs ? Bs.toStringTag : void 0;
function cT(s) {
  var t = aT.call(s, no), e = s[no];
  try {
    s[no] = void 0;
    var r = !0;
  } catch (a) {
  }
  var i = oT.call(s);
  return r && (t ? s[no] = e : delete s[no]), i;
}
var dT = Object.prototype, lT = dT.toString;
function uT(s) {
  return lT.call(s);
}
var hT = "[object Null]", pT = "[object Undefined]", dp = Bs ? Bs.toStringTag : void 0;
function dn(s) {
  return s == null ? s === void 0 ? pT : hT : dp && dp in Object(s) ? cT(s) : uT(s);
}
function ns(s) {
  var t = typeof s;
  return s != null && (t == "object" || t == "function");
}
var gT = "[object AsyncFunction]", mT = "[object Function]", fT = "[object GeneratorFunction]", ST = "[object Proxy]";
function mh(s) {
  if (!ns(s))
    return !1;
  var t = dn(s);
  return t == mT || t == fT || t == gT || t == ST;
}
var vT = ks["__core-js_shared__"];
const tu = vT;
var lp = function() {
  var s = /[^.]+$/.exec(tu && tu.keys && tu.keys.IE_PROTO || "");
  return s ? "Symbol(src)_1." + s : "";
}();
function TT(s) {
  return !!lp && lp in s;
}
var yT = Function.prototype, ET = yT.toString;
function ln(s) {
  if (s != null) {
    try {
      return ET.call(s);
    } catch (t) {
    }
    try {
      return s + "";
    } catch (t) {
    }
  }
  return "";
}
var _T = /[\\^$.*+?()[\]{}|]/g, PT = /^\[object .+?Constructor\]$/, CT = Function.prototype, wT = Object.prototype, RT = CT.toString, bT = wT.hasOwnProperty, kT = RegExp(
  "^" + RT.call(bT).replace(_T, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function IT(s) {
  if (!ns(s) || TT(s))
    return !1;
  var t = mh(s) ? kT : PT;
  return t.test(ln(s));
}
function AT(s, t) {
  return s == null ? void 0 : s[t];
}
function un(s, t) {
  var e = AT(s, t);
  return IT(e) ? e : void 0;
}
var MT = un(ks, "Map");
const ko = MT;
var DT = un(Object, "create");
const Io = DT;
function OT() {
  this.__data__ = Io ? Io(null) : {}, this.size = 0;
}
function NT(s) {
  var t = this.has(s) && delete this.__data__[s];
  return this.size -= t ? 1 : 0, t;
}
var VT = "__lodash_hash_undefined__", LT = Object.prototype, xT = LT.hasOwnProperty;
function UT(s) {
  var t = this.__data__;
  if (Io) {
    var e = t[s];
    return e === VT ? void 0 : e;
  }
  return xT.call(t, s) ? t[s] : void 0;
}
var $T = Object.prototype, FT = $T.hasOwnProperty;
function BT(s) {
  var t = this.__data__;
  return Io ? t[s] !== void 0 : FT.call(t, s);
}
var HT = "__lodash_hash_undefined__";
function qT(s, t) {
  var e = this.__data__;
  return this.size += this.has(s) ? 0 : 1, e[s] = Io && t === void 0 ? HT : t, this;
}
function an(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var r = s[t];
    this.set(r[0], r[1]);
  }
}
an.prototype.clear = OT;
an.prototype.delete = NT;
an.prototype.get = UT;
an.prototype.has = BT;
an.prototype.set = qT;
function jT() {
  this.size = 0, this.__data__ = {
    hash: new an(),
    map: new (ko || yr)(),
    string: new an()
  };
}
function GT(s) {
  var t = typeof s;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? s !== "__proto__" : s === null;
}
function Ol(s, t) {
  var e = s.__data__;
  return GT(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
}
function WT(s) {
  var t = Ol(this, s).delete(s);
  return this.size -= t ? 1 : 0, t;
}
function JT(s) {
  return Ol(this, s).get(s);
}
function KT(s) {
  return Ol(this, s).has(s);
}
function zT(s, t) {
  var e = Ol(this, s), r = e.size;
  return e.set(s, t), this.size += e.size == r ? 0 : 1, this;
}
function Er(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.clear(); ++t < e; ) {
    var r = s[t];
    this.set(r[0], r[1]);
  }
}
Er.prototype.clear = jT;
Er.prototype.delete = WT;
Er.prototype.get = JT;
Er.prototype.has = KT;
Er.prototype.set = zT;
var YT = 200;
function QT(s, t) {
  var e = this.__data__;
  if (e instanceof yr) {
    var r = e.__data__;
    if (!ko || r.length < YT - 1)
      return r.push([s, t]), this.size = ++e.size, this;
    e = this.__data__ = new Er(r);
  }
  return e.set(s, t), this.size = e.size, this;
}
function bs(s) {
  var t = this.__data__ = new yr(s);
  this.size = t.size;
}
bs.prototype.clear = Xv;
bs.prototype.delete = Zv;
bs.prototype.get = eT;
bs.prototype.has = tT;
bs.prototype.set = QT;
function XT(s, t) {
  for (var e = -1, r = s == null ? 0 : s.length; ++e < r && t(s[e], e, s) !== !1; )
    ;
  return s;
}
var ZT = function() {
  try {
    var s = un(Object, "defineProperty");
    return s({}, "", {}), s;
  } catch (t) {
  }
}();
const Cd = ZT;
function fh(s, t, e) {
  t == "__proto__" && Cd ? Cd(s, t, {
    configurable: !0,
    enumerable: !0,
    value: e,
    writable: !0
  }) : s[t] = e;
}
var ey = Object.prototype, ty = ey.hasOwnProperty;
function Am(s, t, e) {
  var r = s[t];
  (!(ty.call(s, t) && xc(r, e)) || e === void 0 && !(t in s)) && fh(s, t, e);
}
function Uc(s, t, e, r) {
  var i = !e;
  e || (e = {});
  for (var a = -1, o = t.length; ++a < o; ) {
    var c = t[a], d = r ? r(e[c], s[c], c, e, s) : void 0;
    d === void 0 && (d = s[c]), i ? fh(e, c, d) : Am(e, c, d);
  }
  return e;
}
function sy(s, t) {
  for (var e = -1, r = Array(s); ++e < s; )
    r[e] = t(e);
  return r;
}
function Hs(s) {
  return s != null && typeof s == "object";
}
var ry = "[object Arguments]";
function up(s) {
  return Hs(s) && dn(s) == ry;
}
var Mm = Object.prototype, iy = Mm.hasOwnProperty, ny = Mm.propertyIsEnumerable, ay = up(function() {
  return arguments;
}()) ? up : function(s) {
  return Hs(s) && iy.call(s, "callee") && !ny.call(s, "callee");
};
const Ao = ay;
var oy = Array.isArray;
const Bt = oy;
function cy() {
  return !1;
}
var Dm = typeof exports == "object" && exports && !exports.nodeType && exports, hp = Dm && typeof module == "object" && module && !module.nodeType && module, dy = hp && hp.exports === Dm, pp = dy ? ks.Buffer : void 0, ly = pp ? pp.isBuffer : void 0, uy = ly || cy;
const Oa = uy;
var hy = 9007199254740991, py = /^(?:0|[1-9]\d*)$/;
function Sh(s, t) {
  var e = typeof s;
  return t = t == null ? hy : t, !!t && (e == "number" || e != "symbol" && py.test(s)) && s > -1 && s % 1 == 0 && s < t;
}
var gy = 9007199254740991;
function vh(s) {
  return typeof s == "number" && s > -1 && s % 1 == 0 && s <= gy;
}
var my = "[object Arguments]", fy = "[object Array]", Sy = "[object Boolean]", vy = "[object Date]", Ty = "[object Error]", yy = "[object Function]", Ey = "[object Map]", _y = "[object Number]", Py = "[object Object]", Cy = "[object RegExp]", wy = "[object Set]", Ry = "[object String]", by = "[object WeakMap]", ky = "[object ArrayBuffer]", Iy = "[object DataView]", Ay = "[object Float32Array]", My = "[object Float64Array]", Dy = "[object Int8Array]", Oy = "[object Int16Array]", Ny = "[object Int32Array]", Vy = "[object Uint8Array]", Ly = "[object Uint8ClampedArray]", xy = "[object Uint16Array]", Uy = "[object Uint32Array]", Te = {};
Te[Ay] = Te[My] = Te[Dy] = Te[Oy] = Te[Ny] = Te[Vy] = Te[Ly] = Te[xy] = Te[Uy] = !0;
Te[my] = Te[fy] = Te[ky] = Te[Sy] = Te[Iy] = Te[vy] = Te[Ty] = Te[yy] = Te[Ey] = Te[_y] = Te[Py] = Te[Cy] = Te[wy] = Te[Ry] = Te[by] = !1;
function $y(s) {
  return Hs(s) && vh(s.length) && !!Te[dn(s)];
}
function Th(s) {
  return function(t) {
    return s(t);
  };
}
var Om = typeof exports == "object" && exports && !exports.nodeType && exports, yo = Om && typeof module == "object" && module && !module.nodeType && module, Fy = yo && yo.exports === Om, su = Fy && km.process, By = function() {
  try {
    var s = yo && yo.require && yo.require("util").types;
    return s || su && su.binding && su.binding("util");
  } catch (t) {
  }
}();
const Na = By;
var gp = Na && Na.isTypedArray, Hy = gp ? Th(gp) : $y;
const Nl = Hy;
var qy = Object.prototype, jy = qy.hasOwnProperty;
function Nm(s, t) {
  var e = Bt(s), r = !e && Ao(s), i = !e && !r && Oa(s), a = !e && !r && !i && Nl(s), o = e || r || i || a, c = o ? sy(s.length, String) : [], d = c.length;
  for (var l in s)
    (t || jy.call(s, l)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (l == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (l == "offset" || l == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (l == "buffer" || l == "byteLength" || l == "byteOffset") || // Skip index properties.
    Sh(l, d))) && c.push(l);
  return c;
}
var Gy = Object.prototype;
function Vl(s) {
  var t = s && s.constructor, e = typeof t == "function" && t.prototype || Gy;
  return s === e;
}
function Vm(s, t) {
  return function(e) {
    return s(t(e));
  };
}
var Wy = Vm(Object.keys, Object);
const Jy = Wy;
var Ky = Object.prototype, zy = Ky.hasOwnProperty;
function Lm(s) {
  if (!Vl(s))
    return Jy(s);
  var t = [];
  for (var e in Object(s))
    zy.call(s, e) && e != "constructor" && t.push(e);
  return t;
}
function $c(s) {
  return s != null && vh(s.length) && !mh(s);
}
function Ll(s) {
  return $c(s) ? Nm(s) : Lm(s);
}
function Yy(s, t) {
  return s && Uc(t, Ll(t), s);
}
function Qy(s) {
  var t = [];
  if (s != null)
    for (var e in Object(s))
      t.push(e);
  return t;
}
var Xy = Object.prototype, Zy = Xy.hasOwnProperty;
function eE(s) {
  if (!ns(s))
    return Qy(s);
  var t = Vl(s), e = [];
  for (var r in s)
    r == "constructor" && (t || !Zy.call(s, r)) || e.push(r);
  return e;
}
function Fc(s) {
  return $c(s) ? Nm(s, !0) : eE(s);
}
function tE(s, t) {
  return s && Uc(t, Fc(t), s);
}
var xm = typeof exports == "object" && exports && !exports.nodeType && exports, mp = xm && typeof module == "object" && module && !module.nodeType && module, sE = mp && mp.exports === xm, fp = sE ? ks.Buffer : void 0, Sp = fp ? fp.allocUnsafe : void 0;
function Um(s, t) {
  if (t)
    return s.slice();
  var e = s.length, r = Sp ? Sp(e) : new s.constructor(e);
  return s.copy(r), r;
}
function $m(s, t) {
  var e = -1, r = s.length;
  for (t || (t = Array(r)); ++e < r; )
    t[e] = s[e];
  return t;
}
function rE(s, t) {
  for (var e = -1, r = s == null ? 0 : s.length, i = 0, a = []; ++e < r; ) {
    var o = s[e];
    t(o, e, s) && (a[i++] = o);
  }
  return a;
}
function Fm() {
  return [];
}
var iE = Object.prototype, nE = iE.propertyIsEnumerable, vp = Object.getOwnPropertySymbols, aE = vp ? function(s) {
  return s == null ? [] : (s = Object(s), rE(vp(s), function(t) {
    return nE.call(s, t);
  }));
} : Fm;
const yh = aE;
function oE(s, t) {
  return Uc(s, yh(s), t);
}
function Bm(s, t) {
  for (var e = -1, r = t.length, i = s.length; ++e < r; )
    s[i + e] = t[e];
  return s;
}
var cE = Vm(Object.getPrototypeOf, Object);
const Eh = cE;
var dE = Object.getOwnPropertySymbols, lE = dE ? function(s) {
  for (var t = []; s; )
    Bm(t, yh(s)), s = Eh(s);
  return t;
} : Fm;
const Hm = lE;
function uE(s, t) {
  return Uc(s, Hm(s), t);
}
function qm(s, t, e) {
  var r = t(s);
  return Bt(s) ? r : Bm(r, e(s));
}
function fu(s) {
  return qm(s, Ll, yh);
}
function hE(s) {
  return qm(s, Fc, Hm);
}
var pE = un(ks, "DataView");
const Su = pE;
var gE = un(ks, "Promise");
const vu = gE;
var mE = un(ks, "Set");
const In = mE;
var fE = un(ks, "WeakMap");
const Tu = fE;
var Tp = "[object Map]", SE = "[object Object]", yp = "[object Promise]", Ep = "[object Set]", _p = "[object WeakMap]", Pp = "[object DataView]", vE = ln(Su), TE = ln(ko), yE = ln(vu), EE = ln(In), _E = ln(Tu), ni = dn;
(Su && ni(new Su(new ArrayBuffer(1))) != Pp || ko && ni(new ko()) != Tp || vu && ni(vu.resolve()) != yp || In && ni(new In()) != Ep || Tu && ni(new Tu()) != _p) && (ni = function(s) {
  var t = dn(s), e = t == SE ? s.constructor : void 0, r = e ? ln(e) : "";
  if (r)
    switch (r) {
      case vE:
        return Pp;
      case TE:
        return Tp;
      case yE:
        return yp;
      case EE:
        return Ep;
      case _E:
        return _p;
    }
  return t;
});
const Va = ni;
var PE = Object.prototype, CE = PE.hasOwnProperty;
function wE(s) {
  var t = s.length, e = new s.constructor(t);
  return t && typeof s[0] == "string" && CE.call(s, "index") && (e.index = s.index, e.input = s.input), e;
}
var RE = ks.Uint8Array;
const wd = RE;
function _h(s) {
  var t = new s.constructor(s.byteLength);
  return new wd(t).set(new wd(s)), t;
}
function bE(s, t) {
  var e = t ? _h(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.byteLength);
}
var kE = /\w*$/;
function IE(s) {
  var t = new s.constructor(s.source, kE.exec(s));
  return t.lastIndex = s.lastIndex, t;
}
var Cp = Bs ? Bs.prototype : void 0, wp = Cp ? Cp.valueOf : void 0;
function AE(s) {
  return wp ? Object(wp.call(s)) : {};
}
function jm(s, t) {
  var e = t ? _h(s.buffer) : s.buffer;
  return new s.constructor(e, s.byteOffset, s.length);
}
var ME = "[object Boolean]", DE = "[object Date]", OE = "[object Map]", NE = "[object Number]", VE = "[object RegExp]", LE = "[object Set]", xE = "[object String]", UE = "[object Symbol]", $E = "[object ArrayBuffer]", FE = "[object DataView]", BE = "[object Float32Array]", HE = "[object Float64Array]", qE = "[object Int8Array]", jE = "[object Int16Array]", GE = "[object Int32Array]", WE = "[object Uint8Array]", JE = "[object Uint8ClampedArray]", KE = "[object Uint16Array]", zE = "[object Uint32Array]";
function YE(s, t, e) {
  var r = s.constructor;
  switch (t) {
    case $E:
      return _h(s);
    case ME:
    case DE:
      return new r(+s);
    case FE:
      return bE(s, e);
    case BE:
    case HE:
    case qE:
    case jE:
    case GE:
    case WE:
    case JE:
    case KE:
    case zE:
      return jm(s, e);
    case OE:
      return new r();
    case NE:
    case xE:
      return new r(s);
    case VE:
      return IE(s);
    case LE:
      return new r();
    case UE:
      return AE(s);
  }
}
var Rp = Object.create, QE = function() {
  function s() {
  }
  return function(t) {
    if (!ns(t))
      return {};
    if (Rp)
      return Rp(t);
    s.prototype = t;
    var e = new s();
    return s.prototype = void 0, e;
  };
}();
const XE = QE;
function Gm(s) {
  return typeof s.constructor == "function" && !Vl(s) ? XE(Eh(s)) : {};
}
var ZE = "[object Map]";
function e_(s) {
  return Hs(s) && Va(s) == ZE;
}
var bp = Na && Na.isMap, t_ = bp ? Th(bp) : e_;
const s_ = t_;
var r_ = "[object Set]";
function i_(s) {
  return Hs(s) && Va(s) == r_;
}
var kp = Na && Na.isSet, n_ = kp ? Th(kp) : i_;
const a_ = n_;
var o_ = 1, c_ = 2, d_ = 4, Wm = "[object Arguments]", l_ = "[object Array]", u_ = "[object Boolean]", h_ = "[object Date]", p_ = "[object Error]", Jm = "[object Function]", g_ = "[object GeneratorFunction]", m_ = "[object Map]", f_ = "[object Number]", Km = "[object Object]", S_ = "[object RegExp]", v_ = "[object Set]", T_ = "[object String]", y_ = "[object Symbol]", E_ = "[object WeakMap]", __ = "[object ArrayBuffer]", P_ = "[object DataView]", C_ = "[object Float32Array]", w_ = "[object Float64Array]", R_ = "[object Int8Array]", b_ = "[object Int16Array]", k_ = "[object Int32Array]", I_ = "[object Uint8Array]", A_ = "[object Uint8ClampedArray]", M_ = "[object Uint16Array]", D_ = "[object Uint32Array]", me = {};
me[Wm] = me[l_] = me[__] = me[P_] = me[u_] = me[h_] = me[C_] = me[w_] = me[R_] = me[b_] = me[k_] = me[m_] = me[f_] = me[Km] = me[S_] = me[v_] = me[T_] = me[y_] = me[I_] = me[A_] = me[M_] = me[D_] = !0;
me[p_] = me[Jm] = me[E_] = !1;
function od(s, t, e, r, i, a) {
  var o, c = t & o_, d = t & c_, l = t & d_;
  if (e && (o = i ? e(s, r, i, a) : e(s)), o !== void 0)
    return o;
  if (!ns(s))
    return s;
  var p = Bt(s);
  if (p) {
    if (o = wE(s), !c)
      return $m(s, o);
  } else {
    var g = Va(s), S = g == Jm || g == g_;
    if (Oa(s))
      return Um(s, c);
    if (g == Km || g == Wm || S && !i) {
      if (o = d || S ? {} : Gm(s), !c)
        return d ? uE(s, tE(o, s)) : oE(s, Yy(o, s));
    } else {
      if (!me[g])
        return i ? s : {};
      o = YE(s, g, c);
    }
  }
  a || (a = new bs());
  var v = a.get(s);
  if (v)
    return v;
  a.set(s, o), a_(s) ? s.forEach(function(C) {
    o.add(od(C, t, e, C, s, a));
  }) : s_(s) && s.forEach(function(C, w) {
    o.set(w, od(C, t, e, w, s, a));
  });
  var _ = l ? d ? hE : fu : d ? Fc : Ll, P = p ? void 0 : _(s);
  return XT(P || s, function(C, w) {
    P && (w = C, C = s[w]), Am(o, w, od(C, t, e, w, s, a));
  }), o;
}
var O_ = 1, N_ = 4;
function Ph(s) {
  return od(s, O_ | N_);
}
var V_ = "[object Symbol]";
function xl(s) {
  return typeof s == "symbol" || Hs(s) && dn(s) == V_;
}
var L_ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, x_ = /^\w*$/;
function Ch(s, t) {
  if (Bt(s))
    return !1;
  var e = typeof s;
  return e == "number" || e == "symbol" || e == "boolean" || s == null || xl(s) ? !0 : x_.test(s) || !L_.test(s) || t != null && s in Object(t);
}
var U_ = "Expected a function";
function wh(s, t) {
  if (typeof s != "function" || t != null && typeof t != "function")
    throw new TypeError(U_);
  var e = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], a = e.cache;
    if (a.has(i))
      return a.get(i);
    var o = s.apply(this, r);
    return e.cache = a.set(i, o) || a, o;
  };
  return e.cache = new (wh.Cache || Er)(), e;
}
wh.Cache = Er;
var $_ = 500;
function F_(s) {
  var t = wh(s, function(r) {
    return e.size === $_ && e.clear(), r;
  }), e = t.cache;
  return t;
}
var B_ = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, H_ = /\\(\\)?/g, q_ = F_(function(s) {
  var t = [];
  return s.charCodeAt(0) === 46 && t.push(""), s.replace(B_, function(e, r, i, a) {
    t.push(i ? a.replace(H_, "$1") : r || e);
  }), t;
});
const j_ = q_;
function G_(s, t) {
  for (var e = -1, r = s == null ? 0 : s.length, i = Array(r); ++e < r; )
    i[e] = t(s[e], e, s);
  return i;
}
var W_ = 1 / 0, Ip = Bs ? Bs.prototype : void 0, Ap = Ip ? Ip.toString : void 0;
function zm(s) {
  if (typeof s == "string")
    return s;
  if (Bt(s))
    return G_(s, zm) + "";
  if (xl(s))
    return Ap ? Ap.call(s) : "";
  var t = s + "";
  return t == "0" && 1 / s == -W_ ? "-0" : t;
}
function J_(s) {
  return s == null ? "" : zm(s);
}
function Ym(s, t) {
  return Bt(s) ? s : Ch(s, t) ? [s] : j_(J_(s));
}
var K_ = 1 / 0;
function Ul(s) {
  if (typeof s == "string" || xl(s))
    return s;
  var t = s + "";
  return t == "0" && 1 / s == -K_ ? "-0" : t;
}
function Qm(s, t) {
  t = Ym(t, s);
  for (var e = 0, r = t.length; s != null && e < r; )
    s = s[Ul(t[e++])];
  return e && e == r ? s : void 0;
}
function z_(s, t, e) {
  var r = s == null ? void 0 : Qm(s, t);
  return r === void 0 ? e : r;
}
function Y_(s, t, e) {
  t = Ym(t, s);
  for (var r = -1, i = t.length, a = !1; ++r < i; ) {
    var o = Ul(t[r]);
    if (!(a = s != null && e(s, o)))
      break;
    s = s[o];
  }
  return a || ++r != i ? a : (i = s == null ? 0 : s.length, !!i && vh(i) && Sh(o, i) && (Bt(s) || Ao(s)));
}
var Q_ = Object.defineProperty, X_ = (s, t) => {
  for (var e in t)
    Q_(s, e, { get: t[e], enumerable: !0 });
}, Z_ = {};
X_(Z_, {
  permissions: () => eP,
  theme: () => tP
});
var At = /* @__PURE__ */ ((s) => (s.GroupCall = "GROUP_CALL", s.Webinar = "WEBINAR", s.AudioRoom = "AUDIO_ROOM", s.Livestream = "LIVESTREAM", s.Chat = "CHAT", s))(At || {}), j = /* @__PURE__ */ ((s) => (s.Allowed = "ALLOWED", s.NotAllowed = "NOT_ALLOWED", s.CanRequest = "CAN_REQUEST", s))(j || {}), eP = {
  view_type: "GROUP_CALL",
  accept_waiting_requests: !1,
  accept_present_requests: !1,
  request_produce: !1,
  can_allow_participant_audio: !1,
  can_allow_participant_screensharing: !1,
  can_allow_participant_video: !1,
  can_spotlight: !1,
  request_kick_participant: !1,
  kick_participant: !1,
  pin_participant: !1,
  can_edit_display_name: !1,
  can_record: !1,
  can_livestream: !1,
  can_present: !0,
  waiting_room_type: "SKIP_ON_ACCEPT",
  recorder_type: "NONE",
  plugins: {
    can_close: !0,
    can_start: !0
  },
  polls: {
    can_create: !0,
    can_vote: !0,
    can_view: !0
  },
  produce: {
    video: {
      allow: !0,
      quality: "vga",
      frame_rate: 24
    },
    audio: !0,
    screenshare: {
      allow: !0,
      quality: "hd",
      frame_rate: 5
    }
  },
  chat: {
    public: {
      can_send: !0,
      text: !0,
      files: !0
    },
    private: {
      can_send: !1,
      can_receive: !1,
      text: !1,
      files: !1
    }
  },
  connected_meetings: {
    can_alter_connected_meetings: !1,
    can_switch_connected_meetings: !1,
    can_switch_to_parent_meeting: !1
  },
  reactions: !1,
  hidden_participant: !1,
  is_recorder: !1,
  show_participant_list: !0,
  can_change_participant_role: !1,
  can_change_theme: !1,
  max_screenshare_count: 1
}, tP = {
  setup_screen: {
    is_enabled: !0
  },
  alone_here: {
    is_enabled: !0
  },
  waiting_room: {
    is_enabled: !1,
    enable_preview: !0
  },
  control_bar: {
    is_enabled: !0,
    elements: {
      plugins: !0,
      screenshare: !0,
      invite: !0,
      participants: !0,
      chat: !0,
      reactions: !1,
      polls: !0,
      fullscreen: !0,
      layout: !0
    }
  },
  header: {
    is_enabled: !0,
    elements: {
      timer: !0,
      title: !0,
      participant_count: !0,
      change_layout: !0
    }
  },
  pip_mode: !0,
  auto_tune: !0,
  grid: {
    multi: {
      maxVideoCount: 6,
      videoFit: "cover"
    },
    single: {
      maxVideoCount: 6,
      videoFit: "cover"
    },
    defaultView: "multi"
  },
  controls: {
    pip_toggle: !1
  }
}, Xm = "hXgU8Wc8pwuGNq9ms5q9Hh", kg;
typeof process != "undefined" && (kg = process == null ? void 0 : process.env) != null && kg.FLAGSMITH_ENVIRONMENT_KEY && (Xm = process.env.FLAGSMITH_ENVIRONMENT_KEY);
function sP(s = []) {
  const t = {};
  return s.forEach((e) => {
    t[e.feature.name] = {
      enabled: e.enabled,
      value: e.feature_state_value
    };
  }), t;
}
var Zm = class {
  constructor(s = Xm) {
    h(this, "flags", {});
    h(this, "environmentKey", null);
    this.environmentKey = s;
  }
  identifyAndFetchFlagsWithRetry(c) {
    return u(this, arguments, function* ({
      primaryEndpoint: s,
      secondaryEndpoint: t,
      forceEvaluate: e,
      timeout: r,
      uniqueIdentifier: i,
      traitsObj: a,
      logger: o
    }) {
      const d = JSON.parse(JSON.stringify(a)), l = Object.entries(d).map((g) => ({
        trait_key: g[0],
        trait_value: g[1]
      })), p = [s, t, t];
      for (const g of p)
        try {
          const S = new AbortController(), v = setTimeout(() => S.abort(), r), _ = "_" + (Math.random() + 1).toString(36).substring(2), P = yield fetch(`https://${g}/api/v1/identities/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Environment-Key": this.environmentKey
            },
            body: JSON.stringify({
              identifier: i + (e ? _ : ""),
              traits: l
            }),
            signal: S.signal
            // Handles the timeout
          });
          if (clearTimeout(v), !P.ok)
            throw new Error(`Request failed with status ${P.status}`);
          const C = yield P.json();
          return sP(C.flags || []);
        } catch (S) {
          o.error("Flagsmith identify failed!!", { error: S, url: g });
        }
      return {};
    });
  }
  identify(o) {
    return u(this, arguments, function* (s, t = {}, e = !1, r = 5e3, i = "edge.api.flagsmith.com", a = console) {
      return this.flags = yield this.identifyAndFetchFlagsWithRetry({
        traitsObj: t,
        uniqueIdentifier: s,
        forceEvaluate: e,
        timeout: r,
        primaryEndpoint: i,
        secondaryEndpoint: "edge.api.flagsmith.com",
        logger: a
      }), this.flags;
    });
  }
  getValue(s) {
    return this.flags && this.flags[s] && this.flags[s].value;
  }
  hasFeature(s) {
    return this.flags && this.flags[s] && this.flags[s].enabled;
  }
  getAllFlags() {
    return this.flags;
  }
}, rP = new Zm();
function iP(s) {
  return new Zm(s);
}
var ef = [-2, -1, 0, 1, 2], nP = [0, 1, 2, 3, 4];
function aP(s) {
  s = s.trim();
  let t = "0", e = "0", r = "0";
  return s.length == 4 ? (t = "0x" + s[1] + s[1], e = "0x" + s[2] + s[2], r = "0x" + s[3] + s[3]) : s.length > 6 && (t = "0x" + s[1] + s[2], e = "0x" + s[3] + s[4], r = "0x" + s[5] + s[6]), [+t, +e, +r];
}
var oP = (s, t, e) => {
  let r, i, a;
  if (t == 0)
    r = i = a = e;
  else {
    const o = (l, p, g) => (g < 0 && (g += 1), g > 1 && (g -= 1), g < 0.16666666666666666 ? l + (p - l) * 6 * g : g < 0.5 ? p : g < 0.6666666666666666 ? l + (p - l) * (0.6666666666666666 - g) * 6 : l), c = e < 0.5 ? e * (1 + t) : e + t - e * t, d = 2 * e - c;
    r = o(d, c, s + 1 / 3), i = o(d, c, s), a = o(d, c, s - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(i * 255), Math.round(a * 255)];
}, cP = (s, t, e) => {
  s /= 255, t /= 255, e /= 255;
  const r = Math.max(s, t, e), i = Math.min(s, t, e);
  let a, o;
  const c = (r + i) / 2;
  if (r == i)
    a = o = 0;
  else {
    const d = r - i;
    switch (o = c > 0.5 ? d / (2 - r - i) : d / (r + i), r) {
      case s:
        a = (t - e) / d + (t < e ? 6 : 0);
        break;
      case t:
        a = (e - s) / d + 2;
        break;
      case e:
        a = (s - t) / d + 4;
        break;
    }
    a /= 6;
  }
  return [a, o, c];
}, dP = (s, t, e) => {
  const r = (i) => i.toString(16).padStart(2, "0");
  return `#${r(s)}${r(t)}${r(e)}`;
}, tf = (s, t = ef, e = 0.4) => {
  const r = [], [i, a, o] = aP(s), [c, d, l] = cP(i, a, o), p = Math.round(l * 100);
  p > 70 ? e = 0.8 : p > 60 ? e = 0.9 : p < 10 ? e = 0.075 : p < 42 && (e = 0.3);
  const g = t.findIndex((C) => C === 0);
  if (g === -1)
    throw new Error("Invalid reducer provided, it must contain atleast one zero");
  const S = 5 - g, v = g + 1, _ = (100 - p) / S, P = p / v;
  for (const C of t) {
    let w;
    C < 0 ? w = p + C * P * e : C > 0 ? w = p + C * _ * e : w = p;
    const [$, F, N] = oP(c, d, w / 100);
    r.push(dP($, F, N));
  }
  return r;
}, Mp = {
  dark: {
    background: {
      1e3: "#252525",
      900: "#2F2F2F",
      800: "#323232",
      700: "#3E3E3E",
      600: "#4A4A4A"
    },
    text: "#F5F5F5",
    "video-bg": "#1C1C1C"
  },
  light: {
    background: {
      1e3: "#FFFFFF",
      900: "#F5F5F5",
      800: "#EBEBEB",
      700: "#E0E0E0",
      600: "#D6D6D6"
    },
    text: "#111111",
    "text-on-brand": "#ffffff",
    "video-bg": "#DADADA"
  }
}, lP = (s) => {
  const [t, e, r, i, a] = tf(s, ef);
  return { 300: t, 400: e, 500: r, 600: i, 700: a };
}, uP = (s) => {
  if (s === "#FFFFFF")
    return Mp.light.background;
  if (s === "#000000")
    return Mp.dark.background;
  const [t, e, r, i, a] = tf(s, nP);
  return { 1e3: t, 900: e, 800: r, 700: i, 600: a };
}, hP = {
  border_radius: "rounded",
  border_width: "thin",
  spacing_base: 4,
  theme: "dark",
  colors: {
    brand: lP("#2160FD"),
    background: uP("#141414"),
    danger: "#FF2D2D",
    text: "#EEEEEE",
    text_on_brand: "#EEEEEE",
    success: "#62A504",
    video_bg: "#191919",
    warning: "#FFCD07"
  }
};
function sf() {
  return Ph(hP);
}
var pP = {
  permissions: {
    // webinar
    can_accept_production_requests: !1,
    can_edit_display_name: !0,
    accept_waiting_requests: !1,
    disable_participant_audio: !1,
    disable_participant_screensharing: !1,
    disable_participant_video: !1,
    can_spotlight: !1,
    kick_participant: !1,
    pin_participant: !1,
    can_record: !1,
    can_livestream: !1,
    waiting_room_type: "SKIP",
    plugins: {
      can_close: !0,
      can_start: !0,
      can_edit_config: !1,
      config: {}
    },
    polls: {
      can_create: !0,
      can_vote: !0,
      can_view: !0
    },
    media: {
      video: {
        can_produce: "ALLOWED",
        can_consume: "ALLOWED"
        /* Allowed */
      },
      audio: {
        can_produce: "ALLOWED"
        /* Allowed */
      },
      screenshare: {
        can_produce: "ALLOWED",
        can_consume: "ALLOWED"
        /* Allowed */
      }
    },
    chat: {
      public: {
        can_send: !0,
        text: !0,
        files: !0
      },
      private: {
        can_send: !1,
        can_receive: !1,
        text: !1,
        files: !1
      },
      channel: {
        // Make sure these are the same in default to ensure consistency in developer portal
        can_create: "ALL",
        can_delete: "ALL",
        can_update: "ALL",
        // end same
        can_read_all: !1
      },
      message: {
        // Make sure these are the same in default to ensure consistency in developer portal
        can_delete: "ALL",
        can_edit: "ALL",
        // end same
        delete_cutoff_time_seconds: 0,
        edit_cutoff_time_seconds: 0
      }
    },
    hidden_participant: !1,
    is_recorder: !1,
    recorder_type: "NONE",
    show_participant_list: !0,
    transcription_enabled: !1,
    can_change_participant_permissions: !1,
    connected_meetings: {
      can_alter_connected_meetings: !1,
      can_switch_connected_meetings: !1,
      can_switch_to_parent_meeting: !1
    },
    stage_enabled: !1,
    stage_access: void 0,
    accept_stage_requests: !1
  },
  ui: {
    oldTheme: {
      setup_screen: {
        is_enabled: !1
      },
      alone_here: {
        is_enabled: !1
      },
      waiting_room: {
        is_enabled: !1,
        enable_preview: !0
      },
      control_bar: {
        is_enabled: !0,
        elements: {
          plugins: !0,
          screenshare: !0,
          invite: !1,
          participants: !0,
          chat: !0,
          reactions: !1,
          polls: !0,
          fullscreen: !0,
          layout: !0
        }
      },
      header: {
        is_enabled: !0,
        elements: {
          timer: !0,
          title: !0,
          participant_count: !0,
          change_layout: !0
        }
      },
      pip_mode: !0,
      auto_tune: !0,
      colors: {
        primary: "#2160FD",
        secondary: "#1A1A1A",
        text: "#EEEEEE",
        background: "#1A1A1A",
        textPrimary: "#EEEEEE",
        videoBackground: "#1A1A1A"
      },
      dimensions: {
        mode: "fillParent"
      },
      grid: {
        multi: {
          maxVideoCount: 6,
          videoFit: "cover"
        },
        single: {
          maxVideoCount: 6,
          videoFit: "cover"
        },
        defaultView: "MULTI"
      },
      controls: {
        pip_toggle: !1
      },
      plugins: []
    },
    design_tokens: sf(),
    config_diff: {}
  },
  config: {
    view_type: "GROUP_CALL",
    media: {
      audio: {
        enable_stereo: !1,
        enable_high_bitrate: !1
      },
      video: {
        quality: "vga",
        frame_rate: 24
      },
      screenshare: {
        quality: "hd",
        frame_rate: 5
      }
    },
    max_video_streams: {
      mobile: 6,
      desktop: 6
    },
    max_screenshare_count: 1,
    track_recording: {
      subscriptions: []
    }
  },
  version: "hybrid"
};
function gP() {
  return Ph(pP);
}
var mP = {
  permissions: {
    // webinar
    can_accept_production_requests: !1,
    can_edit_display_name: !0,
    accept_waiting_requests: !1,
    disable_participant_audio: !1,
    disable_participant_screensharing: !1,
    disable_participant_video: !1,
    can_spotlight: !1,
    kick_participant: !1,
    pin_participant: !1,
    can_record: !1,
    can_livestream: !1,
    waiting_room_type: "SKIP",
    plugins: {
      can_close: !0,
      can_start: !0,
      can_edit_config: !1,
      config: {}
    },
    polls: {
      can_create: !0,
      can_vote: !0,
      can_view: !0
    },
    media: {
      video: {
        can_produce: "ALLOWED"
        /* Allowed */
      },
      audio: {
        can_produce: "ALLOWED"
        /* Allowed */
      },
      screenshare: {
        can_produce: "ALLOWED"
        /* Allowed */
      }
    },
    chat: {
      public: {
        can_send: !0,
        text: !0,
        files: !0
      },
      private: {
        can_send: !1,
        can_receive: !1,
        text: !1,
        files: !1
      }
    },
    hidden_participant: !1,
    is_recorder: !1,
    recorder_type: "NONE",
    show_participant_list: !0,
    transcription_enabled: !1,
    can_change_participant_permissions: !1,
    connected_meetings: {
      can_alter_connected_meetings: !1,
      can_switch_connected_meetings: !1,
      can_switch_to_parent_meeting: !1
    },
    stage_enabled: !1,
    stage_access: void 0,
    accept_stage_requests: !1
  },
  ui: {
    design_tokens: sf(),
    config_diff: {}
  },
  config: {
    view_type: "GROUP_CALL",
    media: {
      audio: {
        enable_stereo: !1,
        enable_high_bitrate: !1
      },
      video: {
        quality: "vga",
        frame_rate: 24
      },
      screenshare: {
        quality: "hd",
        frame_rate: 5
      }
    },
    max_video_streams: {
      mobile: 6,
      desktop: 6
    },
    max_screenshare_count: 1,
    track_recording: {
      subscriptions: []
    }
  },
  version: "2.0.0"
};
function Rh() {
  return Ph(mP);
}
var Oo;
class rf {
  constructor() {
    m(this, Oo, void 0);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    var t;
    return (t = n(this, Oo)) == null ? void 0 : t.getValue("telemetry");
  }
  init(t) {
    f(this, Oo, t);
  }
  info(t, e, r) {
    var i;
    (i = this.telemetry) == null || i.addLogInCurrentSpan(
      "info",
      t,
      e,
      r
    );
  }
  error(t, e, r) {
    var i;
    (i = this.telemetry) == null || i.addLogInCurrentSpan(
      "error",
      t,
      e,
      r
    );
  }
  debug(t, e, r) {
    var i;
    (i = this.telemetry) == null || i.addLogInCurrentSpan(
      "debug",
      t,
      e,
      r
    );
  }
  log(t, e, r) {
    var i;
    (i = this.telemetry) == null || i.addLogInCurrentSpan(
      "log",
      t,
      e,
      r
    );
  }
  warn(t, e, r) {
    var i;
    (i = this.telemetry) == null || i.addLogInCurrentSpan(
      "warn",
      t,
      e,
      r
    );
  }
}
Oo = new WeakMap();
var Js, Ks;
const zh = class extends lt.EventEmitter {
  constructor(e) {
    super();
    m(this, Js, void 0);
    m(this, Ks, void 0);
    h(this, "asyncPromiseTimeout");
    h(this, "logger");
    this.logger = e, f(this, Js, /* @__PURE__ */ new Map()), f(this, Ks, /* @__PURE__ */ new Map()), this.asyncPromiseTimeout = 8e3;
  }
  emitAsync(e, ...r) {
    return u(this, null, function* () {
      n(this, Js).set(e, []);
      const i = n(this, Ks).get(e).map(
        () => new Promise((a) => {
          n(this, Js).get(e).push(a);
        })
      );
      tp(zh.prototype, this, "emit").call(this, e, ...r), yield Promise.race([
        Promise.all(i),
        new Promise(
          (a, o) => setTimeout(
            () => o(new Error(`emitAsync failed to resolve for event ${e}.`)),
            this.asyncPromiseTimeout
          )
        )
      ]), n(this, Js).delete(e);
    });
  }
  onAsync(e, r) {
    const i = n(this, Js), a = (...o) => u(this, null, function* () {
      var d;
      try {
        yield r(...o);
      } catch (l) {
        this.logger.error("[onAsync]", { error: l });
      }
      const c = (d = i.get(e)) == null ? void 0 : d.shift();
      c == null || c();
    });
    return n(this, Ks).get(e) || n(this, Ks).set(e, []), n(this, Ks).get(e).push(a), super.on(e, a);
  }
  /**
   * removes all attached listeners
   */
  reset() {
    f(this, Js, /* @__PURE__ */ new Map()), f(this, Ks, /* @__PURE__ */ new Map()), super.removeAllListeners();
  }
};
let yu = zh;
Js = new WeakMap(), Ks = new WeakMap();
var fP = /\s/;
function SP(s) {
  for (var t = s.length; t-- && fP.test(s.charAt(t)); )
    ;
  return t;
}
var vP = /^\s+/;
function TP(s) {
  return s && s.slice(0, SP(s) + 1).replace(vP, "");
}
var Dp = 0 / 0, yP = /^[-+]0x[0-9a-f]+$/i, EP = /^0b[01]+$/i, _P = /^0o[0-7]+$/i, PP = parseInt;
function Op(s) {
  if (typeof s == "number")
    return s;
  if (xl(s))
    return Dp;
  if (ns(s)) {
    var t = typeof s.valueOf == "function" ? s.valueOf() : s;
    s = ns(t) ? t + "" : t;
  }
  if (typeof s != "string")
    return s === 0 ? s : +s;
  s = TP(s);
  var e = EP.test(s);
  return e || _P.test(s) ? PP(s.slice(2), e ? 2 : 8) : yP.test(s) ? Dp : +s;
}
function bh(s) {
  return s;
}
function CP(s, t, e) {
  switch (e.length) {
    case 0:
      return s.call(t);
    case 1:
      return s.call(t, e[0]);
    case 2:
      return s.call(t, e[0], e[1]);
    case 3:
      return s.call(t, e[0], e[1], e[2]);
  }
  return s.apply(t, e);
}
function wP() {
}
var RP = 800, bP = 16, kP = Date.now;
function IP(s) {
  var t = 0, e = 0;
  return function() {
    var r = kP(), i = bP - (r - e);
    if (e = r, i > 0) {
      if (++t >= RP)
        return arguments[0];
    } else
      t = 0;
    return s.apply(void 0, arguments);
  };
}
function AP(s) {
  return function() {
    return s;
  };
}
var MP = Cd ? function(s, t) {
  return Cd(s, "toString", {
    configurable: !0,
    enumerable: !1,
    value: AP(t),
    writable: !0
  });
} : bh;
const DP = MP;
var OP = IP(DP);
const NP = OP;
function VP(s, t, e, r) {
  for (var i = s.length, a = e + (r ? 1 : -1); r ? a-- : ++a < i; )
    if (t(s[a], a, s))
      return a;
  return -1;
}
function LP(s) {
  return s !== s;
}
function xP(s, t, e) {
  for (var r = e - 1, i = s.length; ++r < i; )
    if (s[r] === t)
      return r;
  return -1;
}
function UP(s, t, e) {
  return t === t ? xP(s, t, e) : VP(s, LP, e);
}
function $P(s, t) {
  var e = s == null ? 0 : s.length;
  return !!e && UP(s, t, 0) > -1;
}
var Np = Math.max;
function FP(s, t, e) {
  return t = Np(t === void 0 ? s.length - 1 : t, 0), function() {
    for (var r = arguments, i = -1, a = Np(r.length - t, 0), o = Array(a); ++i < a; )
      o[i] = r[t + i];
    i = -1;
    for (var c = Array(t + 1); ++i < t; )
      c[i] = r[i];
    return c[t] = e(o), CP(s, this, c);
  };
}
function BP(s, t) {
  return NP(FP(s, t, bh), s + "");
}
function HP(s, t, e) {
  if (!ns(e))
    return !1;
  var r = typeof t;
  return (r == "number" ? $c(e) && Sh(t, e.length) : r == "string" && t in e) ? xc(e[t], s) : !1;
}
function qP(s) {
  return BP(function(t, e) {
    var r = -1, i = e.length, a = i > 1 ? e[i - 1] : void 0, o = i > 2 ? e[2] : void 0;
    for (a = s.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && HP(e[0], e[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i; ) {
      var c = e[r];
      c && s(t, c, r, a);
    }
    return t;
  });
}
var jP = "[object Object]", GP = Function.prototype, WP = Object.prototype, nf = GP.toString, JP = WP.hasOwnProperty, KP = nf.call(Object);
function zP(s) {
  if (!Hs(s) || dn(s) != jP)
    return !1;
  var t = Eh(s);
  if (t === null)
    return !0;
  var e = JP.call(t, "constructor") && t.constructor;
  return typeof e == "function" && e instanceof e && nf.call(e) == KP;
}
var YP = "__lodash_hash_undefined__";
function QP(s) {
  return this.__data__.set(s, YP), this;
}
function XP(s) {
  return this.__data__.has(s);
}
function Mo(s) {
  var t = -1, e = s == null ? 0 : s.length;
  for (this.__data__ = new Er(); ++t < e; )
    this.add(s[t]);
}
Mo.prototype.add = Mo.prototype.push = QP;
Mo.prototype.has = XP;
function ZP(s, t) {
  for (var e = -1, r = s == null ? 0 : s.length; ++e < r; )
    if (t(s[e], e, s))
      return !0;
  return !1;
}
function af(s, t) {
  return s.has(t);
}
var eC = 1, tC = 2;
function of(s, t, e, r, i, a) {
  var o = e & eC, c = s.length, d = t.length;
  if (c != d && !(o && d > c))
    return !1;
  var l = a.get(s), p = a.get(t);
  if (l && p)
    return l == t && p == s;
  var g = -1, S = !0, v = e & tC ? new Mo() : void 0;
  for (a.set(s, t), a.set(t, s); ++g < c; ) {
    var _ = s[g], P = t[g];
    if (r)
      var C = o ? r(P, _, g, t, s, a) : r(_, P, g, s, t, a);
    if (C !== void 0) {
      if (C)
        continue;
      S = !1;
      break;
    }
    if (v) {
      if (!ZP(t, function(w, $) {
        if (!af(v, $) && (_ === w || i(_, w, e, r, a)))
          return v.push($);
      })) {
        S = !1;
        break;
      }
    } else if (!(_ === P || i(_, P, e, r, a))) {
      S = !1;
      break;
    }
  }
  return a.delete(s), a.delete(t), S;
}
function sC(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(r, i) {
    e[++t] = [i, r];
  }), e;
}
function kh(s) {
  var t = -1, e = Array(s.size);
  return s.forEach(function(r) {
    e[++t] = r;
  }), e;
}
var rC = 1, iC = 2, nC = "[object Boolean]", aC = "[object Date]", oC = "[object Error]", cC = "[object Map]", dC = "[object Number]", lC = "[object RegExp]", uC = "[object Set]", hC = "[object String]", pC = "[object Symbol]", gC = "[object ArrayBuffer]", mC = "[object DataView]", Vp = Bs ? Bs.prototype : void 0, ru = Vp ? Vp.valueOf : void 0;
function fC(s, t, e, r, i, a, o) {
  switch (e) {
    case mC:
      if (s.byteLength != t.byteLength || s.byteOffset != t.byteOffset)
        return !1;
      s = s.buffer, t = t.buffer;
    case gC:
      return !(s.byteLength != t.byteLength || !a(new wd(s), new wd(t)));
    case nC:
    case aC:
    case dC:
      return xc(+s, +t);
    case oC:
      return s.name == t.name && s.message == t.message;
    case lC:
    case hC:
      return s == t + "";
    case cC:
      var c = sC;
    case uC:
      var d = r & rC;
      if (c || (c = kh), s.size != t.size && !d)
        return !1;
      var l = o.get(s);
      if (l)
        return l == t;
      r |= iC, o.set(s, t);
      var p = of(c(s), c(t), r, i, a, o);
      return o.delete(s), p;
    case pC:
      if (ru)
        return ru.call(s) == ru.call(t);
  }
  return !1;
}
var SC = 1, vC = Object.prototype, TC = vC.hasOwnProperty;
function yC(s, t, e, r, i, a) {
  var o = e & SC, c = fu(s), d = c.length, l = fu(t), p = l.length;
  if (d != p && !o)
    return !1;
  for (var g = d; g--; ) {
    var S = c[g];
    if (!(o ? S in t : TC.call(t, S)))
      return !1;
  }
  var v = a.get(s), _ = a.get(t);
  if (v && _)
    return v == t && _ == s;
  var P = !0;
  a.set(s, t), a.set(t, s);
  for (var C = o; ++g < d; ) {
    S = c[g];
    var w = s[S], $ = t[S];
    if (r)
      var F = o ? r($, w, S, t, s, a) : r(w, $, S, s, t, a);
    if (!(F === void 0 ? w === $ || i(w, $, e, r, a) : F)) {
      P = !1;
      break;
    }
    C || (C = S == "constructor");
  }
  if (P && !C) {
    var N = s.constructor, B = t.constructor;
    N != B && "constructor" in s && "constructor" in t && !(typeof N == "function" && N instanceof N && typeof B == "function" && B instanceof B) && (P = !1);
  }
  return a.delete(s), a.delete(t), P;
}
var EC = 1, Lp = "[object Arguments]", xp = "[object Array]", zc = "[object Object]", _C = Object.prototype, Up = _C.hasOwnProperty;
function PC(s, t, e, r, i, a) {
  var o = Bt(s), c = Bt(t), d = o ? xp : Va(s), l = c ? xp : Va(t);
  d = d == Lp ? zc : d, l = l == Lp ? zc : l;
  var p = d == zc, g = l == zc, S = d == l;
  if (S && Oa(s)) {
    if (!Oa(t))
      return !1;
    o = !0, p = !1;
  }
  if (S && !p)
    return a || (a = new bs()), o || Nl(s) ? of(s, t, e, r, i, a) : fC(s, t, d, e, r, i, a);
  if (!(e & EC)) {
    var v = p && Up.call(s, "__wrapped__"), _ = g && Up.call(t, "__wrapped__");
    if (v || _) {
      var P = v ? s.value() : s, C = _ ? t.value() : t;
      return a || (a = new bs()), i(P, C, e, r, a);
    }
  }
  return S ? (a || (a = new bs()), yC(s, t, e, r, i, a)) : !1;
}
function $l(s, t, e, r, i) {
  return s === t ? !0 : s == null || t == null || !Hs(s) && !Hs(t) ? s !== s && t !== t : PC(s, t, e, r, $l, i);
}
var CC = 1, wC = 2;
function RC(s, t, e, r) {
  var i = e.length, a = i, o = !r;
  if (s == null)
    return !a;
  for (s = Object(s); i--; ) {
    var c = e[i];
    if (o && c[2] ? c[1] !== s[c[0]] : !(c[0] in s))
      return !1;
  }
  for (; ++i < a; ) {
    c = e[i];
    var d = c[0], l = s[d], p = c[1];
    if (o && c[2]) {
      if (l === void 0 && !(d in s))
        return !1;
    } else {
      var g = new bs();
      if (r)
        var S = r(l, p, d, s, t, g);
      if (!(S === void 0 ? $l(p, l, CC | wC, r, g) : S))
        return !1;
    }
  }
  return !0;
}
function cf(s) {
  return s === s && !ns(s);
}
function bC(s) {
  for (var t = Ll(s), e = t.length; e--; ) {
    var r = t[e], i = s[r];
    t[e] = [r, i, cf(i)];
  }
  return t;
}
function df(s, t) {
  return function(e) {
    return e == null ? !1 : e[s] === t && (t !== void 0 || s in Object(e));
  };
}
function kC(s) {
  var t = bC(s);
  return t.length == 1 && t[0][2] ? df(t[0][0], t[0][1]) : function(e) {
    return e === s || RC(e, s, t);
  };
}
function IC(s, t) {
  return s != null && t in Object(s);
}
function AC(s, t) {
  return s != null && Y_(s, t, IC);
}
var MC = 1, DC = 2;
function OC(s, t) {
  return Ch(s) && cf(t) ? df(Ul(s), t) : function(e) {
    var r = z_(e, s);
    return r === void 0 && r === t ? AC(e, s) : $l(t, r, MC | DC);
  };
}
function NC(s) {
  return function(t) {
    return t == null ? void 0 : t[s];
  };
}
function VC(s) {
  return function(t) {
    return Qm(t, s);
  };
}
function LC(s) {
  return Ch(s) ? NC(Ul(s)) : VC(s);
}
function xC(s) {
  return typeof s == "function" ? s : s == null ? bh : typeof s == "object" ? Bt(s) ? OC(s[0], s[1]) : kC(s) : LC(s);
}
function UC(s) {
  return function(t, e, r) {
    for (var i = -1, a = Object(t), o = r(t), c = o.length; c--; ) {
      var d = o[s ? c : ++i];
      if (e(a[d], d, a) === !1)
        break;
    }
    return t;
  };
}
var $C = UC();
const FC = $C;
var BC = function() {
  return ks.Date.now();
};
const iu = BC;
var HC = "Expected a function", qC = Math.max, jC = Math.min;
function Ih(s, t, e) {
  var r, i, a, o, c, d, l = 0, p = !1, g = !1, S = !0;
  if (typeof s != "function")
    throw new TypeError(HC);
  t = Op(t) || 0, ns(e) && (p = !!e.leading, g = "maxWait" in e, a = g ? qC(Op(e.maxWait) || 0, t) : a, S = "trailing" in e ? !!e.trailing : S);
  function v(G) {
    var re = r, tt = i;
    return r = i = void 0, l = G, o = s.apply(tt, re), o;
  }
  function _(G) {
    return l = G, c = setTimeout(w, t), p ? v(G) : o;
  }
  function P(G) {
    var re = G - d, tt = G - l, cs = t - re;
    return g ? jC(cs, a - tt) : cs;
  }
  function C(G) {
    var re = G - d, tt = G - l;
    return d === void 0 || re >= t || re < 0 || g && tt >= a;
  }
  function w() {
    var G = iu();
    if (C(G))
      return $(G);
    c = setTimeout(w, P(G));
  }
  function $(G) {
    return c = void 0, S && r ? v(G) : (r = i = void 0, o);
  }
  function F() {
    c !== void 0 && clearTimeout(c), l = 0, r = d = i = c = void 0;
  }
  function N() {
    return c === void 0 ? o : $(iu());
  }
  function B() {
    var G = iu(), re = C(G);
    if (r = arguments, i = this, d = G, re) {
      if (c === void 0)
        return _(d);
      if (g)
        return clearTimeout(c), c = setTimeout(w, t), v(d);
    }
    return c === void 0 && (c = setTimeout(w, t)), o;
  }
  return B.cancel = F, B.flush = N, B;
}
function Eu(s, t, e) {
  (e !== void 0 && !xc(s[t], e) || e === void 0 && !(t in s)) && fh(s, t, e);
}
function GC(s) {
  return Hs(s) && $c(s);
}
function _u(s, t) {
  if (!(t === "constructor" && typeof s[t] == "function") && t != "__proto__")
    return s[t];
}
function WC(s) {
  return Uc(s, Fc(s));
}
function JC(s, t, e, r, i, a, o) {
  var c = _u(s, e), d = _u(t, e), l = o.get(d);
  if (l) {
    Eu(s, e, l);
    return;
  }
  var p = a ? a(c, d, e + "", s, t, o) : void 0, g = p === void 0;
  if (g) {
    var S = Bt(d), v = !S && Oa(d), _ = !S && !v && Nl(d);
    p = d, S || v || _ ? Bt(c) ? p = c : GC(c) ? p = $m(c) : v ? (g = !1, p = Um(d, !0)) : _ ? (g = !1, p = jm(d, !0)) : p = [] : zP(d) || Ao(d) ? (p = c, Ao(c) ? p = WC(c) : (!ns(c) || mh(c)) && (p = Gm(d))) : g = !1;
  }
  g && (o.set(d, p), i(p, d, r, a, o), o.delete(d)), Eu(s, e, p);
}
function lf(s, t, e, r, i) {
  s !== t && FC(t, function(a, o) {
    if (i || (i = new bs()), ns(a))
      JC(s, t, o, e, lf, r, i);
    else {
      var c = r ? r(_u(s, o), a, o + "", s, t, i) : void 0;
      c === void 0 && (c = a), Eu(s, o, c);
    }
  }, Fc);
}
function KC(s, t, e) {
  for (var r = -1, i = s == null ? 0 : s.length; ++r < i; )
    if (e(t, s[r]))
      return !0;
  return !1;
}
var zC = "[object Map]", YC = "[object Set]", QC = Object.prototype, XC = QC.hasOwnProperty;
function ZC(s) {
  if (s == null)
    return !0;
  if ($c(s) && (Bt(s) || typeof s == "string" || typeof s.splice == "function" || Oa(s) || Nl(s) || Ao(s)))
    return !s.length;
  var t = Va(s);
  if (t == zC || t == YC)
    return !s.size;
  if (Vl(s))
    return !Lm(s).length;
  for (var e in s)
    if (XC.call(s, e))
      return !1;
  return !0;
}
function ew(s, t) {
  return $l(s, t);
}
var tw = qP(function(s, t, e) {
  lf(s, t, e);
});
const Rr = tw;
var sw = 1 / 0, rw = In && 1 / kh(new In([, -0]))[1] == sw ? function(s) {
  return new In(s);
} : wP;
const iw = rw;
var nw = 200;
function uf(s, t, e) {
  var r = -1, i = $P, a = s.length, o = !0, c = [], d = c;
  if (e)
    o = !1, i = KC;
  else if (a >= nw) {
    var l = t ? null : iw(s);
    if (l)
      return kh(l);
    o = !1, i = af, d = new Mo();
  } else
    d = t ? [] : c;
  e:
    for (; ++r < a; ) {
      var p = s[r], g = t ? t(p) : p;
      if (p = e || p !== 0 ? p : 0, o && g === g) {
        for (var S = d.length; S--; )
          if (d[S] === g)
            continue e;
        t && d.push(g), c.push(p);
      } else
        i(d, g, e) || (d !== c && d.push(g), c.push(p));
    }
  return c;
}
function aw(s) {
  return s && s.length ? uf(s) : [];
}
function ow(s, t) {
  return s && s.length ? uf(s, xC(t)) : [];
}
var Pu = /* @__PURE__ */ ((s) => (s.PARTICIPANT = "PARTICIPANT", s.PEER = "PEER", s.CLIENT = "CLIENT", s))(Pu || {});
const ee = {
  PROPAGATE_KICK_ALL: "propagate_kick_across_rooms",
  REFRESH_ID_ON_DISCONNECTION: "refresh_id_on_disconnection",
  SKIP_OTEL_TRACES: "skip_otel_traces",
  USE_USERIDS_IN_CHAT: "use_userids_in_chat",
  ENABLE_CF_SIMULCAST: "enable_cf_simulcast",
  CF_TRANSPORT_FORCE_RELAY_ON_ICE_FAILED: "cf_transport_force_relay_on_ice_failed",
  LOG_LEVEL: "log_level",
  V1_PLUGINS: "v1_plugins",
  LIVESTREAM: "feat_livestream",
  FEAT_PAGINATED_CHAT: "feat_paginated_chat",
  VAL_MIN_FRAMERATE: "val_min_framerate",
  SCREEENSHARE_ERR_HACK: "screenshare_err_hack",
  SCREEENSHARE_CONSTRAINTS_RETRY: "screenshare_constraints_retry",
  VIDEO_CONSTRAINTS: "video_constraints",
  SCREENSHARE_CONSTRAINTS: "screenshare_constraints",
  FEAT_CHAT_SDK: "feat_chat_sdk",
  FEAT_CHAT_SDK_SEARCH: "chat_search",
  OBS_QUALITY: "obs_quality",
  ALLOW_SAFARI_MEDIA_MIDDLEWARES: "allow_safari_media_middlewares",
  EXP_RESHARE: "exp_reshare",
  SKIP_SETTING_IN_USE_DEVICE: "skip_setting_in_use_device",
  PRECALL_BANDWIDTH_TEST: "precall_bandwidth_test",
  DEBUG_SOCKET_JOIN: "debug_socket_join",
  FORCE_RELAY: "force_relay",
  FORCE_VIDEO_CODEC: "force_video_codec",
  TRACK_HINT: "track_hint",
  OVERRIDE_SIMULCAST_DYNAMIC: "override_simulcast_dynamic",
  PRECREATE_PRODUCERS: "precreate_producers",
  DISABLE_OPUS_DTX_CF: "disable_opus_dtx_cf",
  ENABLE_AUDIO_ACTIVITY_DEBUG_LOGS: "enable_audio_activity_debug_logs",
  DISABLE_LAYER_SWITCH: "disable_layer_switch"
};
function cd(s) {
  const t = {};
  return typeof (s == null ? void 0 : s.code) == "number" && (t.code = s.code), typeof (s == null ? void 0 : s.code) == "string" && (t.code = s.code.substring(0, 100)), typeof (s == null ? void 0 : s.name) == "string" && (t.name = s.name.substring(0, 500)), typeof (s == null ? void 0 : s.message) == "string" && (t.message = s.message.substring(0, 500)), typeof (s == null ? void 0 : s.reason) == "string" && (t.reason = s.reason.substring(0, 500)), typeof (s == null ? void 0 : s.stack) == "string" && (t.stack = s.stack.substring(0, 500)), t;
}
const cw = {
  audio: !0,
  video: !0,
  screenshareAudio: !0,
  screenshareVideo: !0
}, ao = {
  baseURL: "http://localhost:5000",
  createdAt: "2021-08-05T10:49:56.602Z",
  description: "Develop plugins locally",
  id: "09259e3b-7be8-46f6-9801-106bf1866e1c",
  name: "Localhost Dev",
  organizationId: "4ad15a19-80e2-4105-bf43-48039fd2963e",
  picture: "https://dyte-uploads.s3.ap-south-1.amazonaws.com/dyte.png",
  private: !1,
  published: !0,
  staggered: !1,
  tags: ["#localhost", "#dev"],
  type: "self_hosted",
  updatedAt: "2021-08-05T10:50:07.681Z"
}, dw = {
  pip: !0,
  poll: !0,
  chat: !0,
  stage: !0,
  theme: !0,
  plugin: !0,
  tracing: !0,
  internals: !0,
  recording: !0,
  livestream: !0,
  participant: !0,
  connectedMeetings: !0,
  devTools: {
    logs: !1
  }
};
function La(s, t) {
  const e = s.getValue("overrides");
  return e && e[t] ? e[t] : !1;
}
function lw({ baseURI: s }) {
  return s.includes("preprod.dyte") || s.includes("preprod.realtime") ? To.PREPROD : s.includes("devel.dyte") || s.includes("devel.realtime") ? To.DEVEL : To.PROD;
}
function sn({ servicePrefix: s, baseURI: t }) {
  return `${s}.${t}`;
}
function hf(s) {
  const t = s.getValue("baseURI");
  return {
    location: sn({
      servicePrefix: "location",
      baseURI: t
    }),
    locationLegacy: sn({
      servicePrefix: "location-legacy",
      baseURI: t
    }),
    daCollector: sn({
      servicePrefix: "da-collector",
      /**
       * FIXME(ravindra-cloudflare): Need to port da-collector to CF.
       * Remove the replace logic once realtime da-collector is up.
       * * */
      baseURI: t.replace("realtime.cloudflare.com", "dyte.io")
    })
  };
}
const uw = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m16.242 2.932 4.826 4.826a2.75 2.75 0 0 1-.715 4.404l-4.87 2.435a.75.75 0 0 0-.374.426l-1.44 4.166a1.25 1.25 0 0 1-2.065.476L8.5 16.561 4.06 21H3v-1.06l4.44-4.44-3.105-3.104a1.25 1.25 0 0 1 .476-2.066l4.166-1.44a.75.75 0 0 0 .426-.373l2.435-4.87a2.75 2.75 0 0 1 4.405-.715Zm3.766 5.886-4.826-4.826a1.25 1.25 0 0 0-2.002.325l-2.435 4.871a2.25 2.25 0 0 1-1.278 1.12l-3.789 1.31 6.705 6.704 1.308-3.789a2.25 2.25 0 0 1 1.12-1.277l4.872-2.436a1.25 1.25 0 0 0 .325-2.002Z" fill="currentColor"/></svg>', hw = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 12.02c0 1.06.2 2.1.6 3.08l.6 1.42c.22.55.64 1.01 1.17 1.29.27.14.56.21.86.21h2.55c.77 0 1.49-.41 1.87-1.08.5-.87 1.02-1.7 1.72-2.43l1.32-1.39c.44-.46.97-.84 1.49-1.23l.59-.45a.6.6 0 0 0 .23-.47c0-.75-.54-1.57-1.22-1.79a3.34 3.34 0 0 0-2.78.29V4.5a1.5 1.5 0 0 0-2.05-1.4 1.5 1.5 0 0 0-2.9 0A1.5 1.5 0 0 0 6 4.5v.09A1.5 1.5 0 0 0 4 6v6.02ZM8 4.5v4a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0v5a.5.5 0 0 0 1 0v-4a.5.5 0 0 1 1 0v6a.5.5 0 0 0 .85.37h.01c.22-.22.44-.44.72-.58.7-.35 2.22-.57 2.4.5l-.53.4c-.52.4-1.04.78-1.48 1.24l-1.33 1.38c-.75.79-1.31 1.7-1.85 2.63-.21.36-.6.58-1.01.58H7.23a.87.87 0 0 1-.4-.1 1.55 1.55 0 0 1-.71-.78l-.59-1.42a7.09 7.09 0 0 1-.53-2.7V6a.5.5 0 0 1 1 0v3.5a.5.5 0 0 0 1 0v-5a.5.5 0 0 1 1 0Z" fill="currentColor"></path></svg>', Yc = (s) => {
  if (!s)
    return;
  if (!s.startsWith("<svg"))
    return new Promise((a) => {
      a(s);
    });
  const e = new Blob([s], { type: "image/svg+xml" }), r = new Image(), i = window.URL.createObjectURL(e);
  return new Promise((a, o) => {
    r.onload = () => {
      a(r), window.URL.revokeObjectURL(i);
    }, r.onerror = () => {
      o(), window.URL.revokeObjectURL(i);
    }, r.src = i;
  });
}, gi = {
  logs: "https://api-silos.dyte.io/otel/logs",
  mock: {
    url: "https://mock.dyte.io",
    domain: "mock.dyte.io",
    app: "https://app.dyte.io/v2/meeting",
    stagingApp: "https://app.devel.dyte.io/v2/meeting"
  },
  apiBase: {
    prod: "https://api.dyte.io",
    staging: "https://api.devel.dyte.io",
    prodAlternate: "https://api.cluster.dyte.in"
  },
  baseURI: {
    prod: "dyte.io",
    staging: "devel.dyte.io"
  }
};
function pw(s) {
  var r, i, a;
  const t = typeof navigator != "undefined" && !navigator.isReactNative && typeof window != "undefined" && ((r = window.location.host) == null ? void 0 : r.includes(gi.baseURI.staging)), e = !!((a = (i = s == null ? void 0 : s.getValue("modules")) == null ? void 0 : i.devTools) != null && a.logs);
  return t || e;
}
function gw(s, t) {
  var e;
  if (s != null && s.getValue("flagsmith").hasFeature(ee.LOG_LEVEL)) {
    let r = ((e = s.getValue("flagsmith").getValue(ee.LOG_LEVEL)) == null ? void 0 : e.toString()) || "all";
    if (r = r.toLowerCase().trim(), r === "off")
      return !1;
    if (r !== "all") {
      const i = ["debug", "log", "info", "warn", "error"], a = i.indexOf(
        t
      ), o = i.indexOf(r);
      if (a < o)
        return !1;
    }
  }
  return !0;
}
function pf(s, t, e = {}) {
  return Object.getOwnPropertyNames(s).forEach((r) => {
    var a;
    if ([null, void 0, NaN].includes(s[r]) || t && (((a = t.match(/\./g)) == null ? void 0 : a.length) || 0) >= 10)
      return;
    const i = t ? `${t}.${r}` : r;
    typeof s[r] == "object" ? pf(s[r], i, e) : ["number", "string", "boolean"].includes(typeof s[r]) && (e[i] = s[r]);
  }), e;
}
function $p(s, t, e = {}, r = "") {
  const i = {};
  try {
    const a = JSON.stringify(e), o = JSON.parse(a), c = pf(
      o,
      r
    ), d = JSON.stringify(c);
    return JSON.parse(d);
  } catch (a) {
    const o = cd(a);
    i[`${r}.error.message`] = o.message || "", i[`${r}.error.stack`] = o.stack || "", i[`${r}.error.reason`] = o.reason || "", i[`${r}.error.source`] = "safelyFlattenObjForOpenTelemetry";
  }
  return i;
}
const Yh = class {
  constructor() {
    h(this, "logsCache", []);
    h(this, "logsProcessorTimer");
    h(this, "tracingEnabled", !0);
    h(this, "initialized", !1);
    /**
     * NOTE(ravindra-cloudflare)
     * Periodically send logs to Log Aggregator. Current period: 7 secs
     */
    h(this, "logsProcessingInterval", 7e3);
    h(this, "logExclusionList", [
      "message",
      "websocket/message",
      "roomMessage",
      "websocket/room-message",
      "websocket/room-legacy-mode",
      "chatMessage",
      "websocket/new-chat-message",
      "websocket/no-active-speaker",
      "websocket/selected-peers",
      "websocket/active-speaker",
      "ping",
      "websocket/new-consumer",
      "websocket/producer-score",
      "websocket/consumer-score",
      "websocket/plugin-event",
      "websocket/plugin-data",
      "websocket/plugin-internal-data"
    ]);
    h(this, "meetingMetadata", {});
  }
  get logsEndpoint() {
    const t = mr.getContext(this.meetingMetadata.peerId);
    return `https://${sn({
      servicePrefix: "api-silos",
      baseURI: t.getValue("baseURI")
    })}/otel/logs`;
  }
  resetPeerId(t) {
    this.meetingMetadata.peerId = t;
  }
  init(t, e, r) {
    this.tracingEnabled = !0, this.initialized = !1, this.logsCache = [];
    const i = t.getValue("peerId");
    this.meetingMetadata = e, this.tracingEnabled = r, this.meetingMetadata.peerId = i, this.meetingMetadata.sdkVersion = t.getValue("sdkVersion");
    const { RNDeviceInfoImpl: a } = navigator;
    this.meetingMetadata.deviceInfo = navigator.isReactNative ? a == null ? void 0 : a.getDeviceInfo() : ye.getDeviceInfo(), this.meetingMetadata.visitedUrl = !navigator.isReactNative && typeof window != "undefined" && window.location.href, this.logsProcessorTimer = setInterval(
      this.processCachedLogs.bind(this),
      this.logsProcessingInterval
    ), r && (this.initialized = !0);
  }
  static trace(t, e = void 0) {
    return (r, i, a) => {
      const o = a.value;
      return a.value = function(...d) {
        var S;
        const l = this == null ? void 0 : this.telemetry;
        if (!l || !l.initialized || navigator.isReactNative || !l.tracingEnabled || (S = mr.getContext(l.meetingMetadata.peerId)) != null && S.getValue("flagsmith").hasFeature(ee.SKIP_OTEL_TRACES))
          return o.apply(this, d);
        l.addLogInCurrentSpan("info", t, e);
        const p = performance.now(), g = o.apply(this, d);
        return Promise.resolve(g).then(() => {
          const v = performance.now();
          v - p > 10 && l.addLogInCurrentSpan("info", `${t}_timing`, {
            execTime: v - p,
            country: Yh.location.country
          });
        }).catch(() => {
          const v = performance.now();
          l.addLogInCurrentSpan("info", `${t}_timing`, {
            execTime: v - p
          });
        }), g;
      }, a;
    };
  }
  injectContext(t) {
    var i;
    const e = nn().replace(/-/g, "").substring(0, 16), r = (i = this.meetingMetadata.peerId) == null ? void 0 : i.replace(/-/g, "");
    t.TRACEPARENT = `00-${r}-${e}-01`;
  }
  /**
   * Adds event into the current span or the main span.
   * Event(or this method) is not a replacement for a log.
   * Tip :: Heavy objects should be logged.
   * Tip :: Light objects with `to the point` info should be added as events.
   * @param eventSeverity severity of the passed event to create better dashboards
   * @param eventName name of event in format
   *	fileName::functionName::eventName or functionName::eventName or whatever seems fit
   * @param metadata pass any information which makes sense for analytics or debugging
   * @param noCache optionally pass if log can be cached in FE or it has to be sent instantly
   * @returns nothing
   */
  addLogInCurrentSpan(t, e, r = {}, i = !1) {
    r != null && r.error && Object.assign(r, { error: cd(r.error) });
    const a = mr.getContext(this.meetingMetadata.peerId);
    if (pw(a) && (ZC(r) ? console[t]("InternalLogs:: ", t, e) : console[t](
      "InternalLogs:: ",
      t,
      e,
      r
    )), !!gw(a, t))
      try {
        const c = $p(
          a,
          e,
          r,
          "metadata"
        ), d = new Date(), l = H(D({
          message: e,
          level: t
        }, c), {
          loggedAt: d.toISOString(),
          loggedAtTzOffset: d.getTimezoneOffset()
        });
        i ? this.sendOtelLogsToNewRelic([l]) : this.logsCache.push(l);
      } catch (c) {
        this.addLogInCurrentSpan(
          "error",
          "opentelemetry::addLogInCurrentSpan_failed",
          {
            error: cd(c)
          }
        );
      }
  }
  sendOtelLogsToNewRelic(t) {
    const e = mr.getContext(this.meetingMetadata.peerId);
    fetch(this.logsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        meetingMetadata: $p(
          e,
          "sendOtelLogsToNewRelic",
          this.meetingMetadata,
          "meetingMetadata"
        ),
        serviceName: e.getValue("sdkName"),
        logs: t
      })
    }).catch((r) => {
      this.addLogInCurrentSpan(
        "error",
        "opentelemetry::sendOtelLogToNewRelic_failed",
        {
          error: cd(r)
        }
      ), this.logsCache.push(...t);
    });
  }
  processCachedLogs() {
    const t = this.logsCache.splice(0, 25);
    t != null && t.length && this.sendOtelLogsToNewRelic(t);
  }
  destruct() {
    clearInterval(this.logsProcessorTimer), this.processCachedLogs();
  }
};
let E = Yh;
h(E, "location", {
  country: void 0
});
function mw(s) {
  const t = D({}, s), e = /* @__PURE__ */ new Map(), r = (l, p) => (e.has(l) || e.set(l, /* @__PURE__ */ new Set()), e.get(l).add(p), () => {
    var g;
    return (g = e.get(l)) == null ? void 0 : g.delete(p);
  }), i = (l, p) => {
    var g;
    (g = e.get(l)) == null || g.delete(p);
  }, a = (l) => {
    var p;
    (p = e.get(l)) == null || p.forEach((g) => {
      try {
        g(t[l]);
      } catch (S) {
      }
    });
  };
  return {
    subscribe: r,
    unsubscribe: i,
    notify: a,
    setValue: (l, p, g = !0) => {
      t[l] = p, g && a(l);
    },
    getValue: (l) => t[l],
    getAllValues: () => t
  };
}
class fw {
  constructor() {
    h(this, "contexts", /* @__PURE__ */ new Map());
    /**
     * @deprecated
     * Returns the most recent peer id with which Client.init was called
     */
    h(this, "mostRecentPeerId", null);
  }
  createContext(t, e) {
    if (this.contexts.has(t))
      return this.contexts.get(t);
    const r = new E(), i = new rf();
    this.contexts.set(t, mw(e)), this.contexts.get(t).setValue("peerSessionStore", new yu(i));
    const a = new bm();
    return a.setMaxListeners(50), this.contexts.get(t).setValue("logger", i), this.contexts.get(t).setValue("telemetry", r), this.contexts.get(t).setValue("callstats", a), this.contexts.get(t).setValue("flagsmith", iP()), this.mostRecentPeerId = t, this.contexts.get(t);
  }
  /**
   * NOTE(ishita1805): Used to remap the context
   * when we regnerate a peerId during reconnection.
   */
  remapContext(t, e) {
    const r = e.getValue("peerId");
    r !== t && (e.setValue("peerId", t), this.mostRecentPeerId = t, this.contexts.set(t, e), this.contexts.delete(r));
  }
  getContext(t) {
    return this.contexts.get(t);
  }
  /**
   * @deprecated
   * This is currently done as a hack to expose the current peer Id.
   * However this would not work in future, if we want to support multiple ongoing meetings per page
   * This hack works for now, because a lot more components will fail, before this,
   * if someone decides to initialize multiple meetings on the same page.
   */
  getMostRecentPeerId() {
    return this.mostRecentPeerId;
  }
}
const mr = new fw(), Sw = {
  "00": "Client",
  "01": "Controller",
  "02": "RoomNodeClient",
  "03": "HiveNodeClient",
  // (Reserved for Legacy SFU)
  "04": "SocketService",
  "05": "Chat",
  "06": "Plugin",
  "07": "Polls",
  "08": "Meta",
  "09": "Preset",
  10: "Recording",
  11: "Self",
  12: "Participant",
  13: "Spotlight",
  14: "Remote Request",
  15: "Webinar",
  16: "LocalMediaHandler",
  17: "End-End Encryption",
  18: "AI",
  19: "Livestream",
  20: "Stage"
}, dd = {
  "0000": "Internal exception.",
  "0001": "Failed to initialize.",
  "0002": "Failed to join room.",
  "0003": "Failed to leave room.",
  "0004": "Invalid auth token",
  "0010": "Browser not supported",
  "0011": "HTTP Network Error",
  "0012": "Websocket Network Error",
  "0013": "Rate Limited",
  "0100": "Internal exception",
  "0101": "Permission denied",
  "0102": "Prerequisite module missing",
  "0200": "Internal exception.",
  "0300": "Internal exception",
  "0400": "Internal exception",
  "0404": "Missing prerequisites to establish a websocket connection",
  "0500": "Internal exception",
  "0501": "Permission denied.",
  "0502": "Invalid message body.",
  "0503": "Text Message is too large",
  "0504": "Message not found by the given id",
  "0505": "Action not permitted without joining room",
  "0506": "Message search is disabled",
  "0510": "Invalid channel name.",
  "0600": "Internal exception",
  "0601": "Permission denied.",
  "0602": "Auth token not set for plugin",
  "0603": "Iframe was not provided",
  "0700": "Internal exception",
  "0705": "Action not permitted without joining room",
  "0800": "Internal exception",
  "0801": "Permission denied",
  "0900": "Internal exception",
  "0904": "Could not load preset",
  1e3: "Internal exception",
  1001: "Permission denied",
  1004: "Could not find specified recording",
  1005: "Action not permitted in given recording state",
  1100: "Internal exception",
  1101: "Permission denied",
  1102: "Unsupported",
  1103: "Name cannot be empty",
  1104: "No device selected while calling meeting.self.setDevice",
  1105: "Action not permitted without joining room",
  1106: "Can't set currently used device",
  1200: "Internal exception",
  1201: "Permission denied",
  1202: "Invalid page number was requested",
  1203: "Invalid participant count per page was requested",
  1204: "No participants exists with the given UserIds",
  1205: "Action not permitted without joining room",
  1206: "Manual Subscription Mode was not ACTIVATED",
  1207: "Invalid view mode",
  1208: "Manual Subscription not enabled for organization",
  1209: "Broadcast message type must be a non-empty string",
  1300: "Internal exception",
  1400: "Internal exception",
  1402: "No existing remote requests",
  1403: "No peer exists with given id",
  1500: "Internal exception",
  1600: "Internal exception",
  1601: "Failed to get audio track",
  1602: "Failed to get video track",
  1603: "Incorrect device",
  1604: "Failed to change device",
  1605: "Failed to get audio & video track",
  1606: "No audio input devices are available",
  1607: "No video input devices are available",
  1608: "No audio output devices (speakers) are available",
  1609: "Failed to fetch list of media devices",
  1610: "No media track exists",
  1611: "Failed to unmute track",
  1612: "Failed to get screenshare tracks",
  1701: "Crypto error",
  // 18xx is for AI
  1800: "Internal exception",
  1801: "Can't fetch transcript file",
  // 19xx for livestream
  1900: "Internal exception",
  1901: "Permission denied.",
  1902: "Livestream that has not yet started, can't be stopped",
  2e3: "Internal exception",
  2001: "Permission denied",
  2002: "Unsupported",
  2003: "Stage is disabled",
  2004: "Method not implemented",
  2005: "Action not permitted without joining room",
  2006: "Action not permitted in current stage status",
  9900: "Internal exception"
};
Object.keys(dd).forEach((s) => {
  dd[s] = `{${Sw[s.slice(0, 2)]}} ${dd[s]}`;
});
class b extends Error {
  constructor(e, r, i = void 0, a = !1) {
    super(e);
    h(this, "code");
    this.code = r, this.name = "ClientError", this.message = `[ERR${this.code}]: ${dd[this.code]}
${this.message}`;
    try {
      let o = a && !!i;
      r && r.endsWith("00") && i && (o = !0), o && i.error("ClientError", {
        error: { message: this.message, name: this.name, code: r }
      });
      const c = mr.getContext(mr.getMostRecentPeerId());
      if (c) {
        const d = c.getValue("onError");
        try {
          d(this);
        } catch (l) {
        }
      }
      typeof window != "undefined" && window.dispatchEvent(new CustomEvent("ClientError", {
        detail: this
      }));
    } catch (o) {
    }
  }
}
function Qc(s, t, e, r) {
  if (r instanceof b)
    throw r;
  if (r instanceof t) {
    const i = new b(r.message, e);
    throw i.stack = r.stack, i;
  } else
    throw r;
}
function Fp(s, t, e) {
  if (!s.value) {
    const i = s.get, a = s.set;
    return i && (s.get = function() {
      try {
        return i.apply(this);
      } catch (o) {
        Qc(this, t, e, o);
      }
    }), a && (s.set = function(o) {
      try {
        return a.apply(this, [o]);
      } catch (c) {
        Qc(this, t, e, c);
      }
    }), s;
  }
  const r = s.value;
  return s.value = function(...i) {
    try {
      const a = r.apply(this, i);
      return a && a instanceof Promise ? a.catch((o) => {
        Qc(this, t, e, o);
      }) : a;
    } catch (a) {
      Qc(this, t, e, a);
    }
  }, s;
}
function vw(s, t) {
  return (e, r, i) => {
    if (i)
      return Fp(i, s, t);
    for (const a of Reflect.ownKeys(e.prototype).filter(
      (o) => o !== "constructor"
    )) {
      const o = Object.getOwnPropertyDescriptor(
        e.prototype,
        a
      );
      (o.value instanceof Function || o.get instanceof Function || o.set instanceof Function) && Object.defineProperty(
        e.prototype,
        a,
        Fp(o, s, t)
      );
    }
  };
}
const ut = (s) => vw(Error, s);
function Tw(s) {
  let t = 0, e, r;
  if (!s)
    return t;
  for (e = 0; e < s.length; e += 1)
    r = s.charCodeAt(e), t = (t << 5) - t + r, t |= 0;
  return Math.abs(t) % 100 + 1;
}
function yw() {
  ye.isElectron() && window.electronGetDisplayMediaSource && (navigator.mediaDevices.getDisplayMedia = () => u(this, null, function* () {
    const s = yield window.electronGetDisplayMediaSource(
      {
        types: ["window", "screen"]
      }
    );
    let t = [];
    if (s && (Array.isArray(s) ? t = s : t = [s]), !(t != null && t.length))
      throw new Error("Couldn't find any media source for screen share.");
    let e = t.find(
      (a) => {
        var o;
        return (o = a.id) == null ? void 0 : o.includes("screen");
      }
    );
    e = e != null ? e : t[0];
    const r = {
      audio: !1,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: e.id
        }
      }
    };
    return yield navigator.mediaDevices.getUserMedia(
      r
    );
  }));
}
var k = /* @__PURE__ */ ((s) => (s.NEW_PRODUCER = "NEW_PRODUCER", s.ROOM_NODE_CONNECTION_ERROR = "ROOM_NODE_CONNECTION_ERROR", s.SOCKET_SERVICE_ROOM_JOINED = "SOCKET_SERVICE_ROOM_JOINED", s.SOCKET_SERVICE_RECONNECTED = "SOCKET_SERVICE_RECONNECTED", s.SOCKET_SERVICE_DISCONNECTED = "SOCKET_SERVICE_DISCONNECTED", s.SOCKET_SERVICE_FAILED = "SOCKET_SERVICE_FAILED", s.SOCKET_STATE_UPDATE = "SOCKET_STATE_UPDATE", s.ROOM_NODE_RECONNECTED = "ROOM_NODE_RECONNECTED", s.ROOM_NODE_DISCONNECTED = "ROOM_NODE_DISCONNECTED", s.ROOM_NODE_FAILED = "ROOM_NODE_FAILED", s.TRANSPORT_STATE_UPDATE = "TRANSPORT_STATE_UPDATE", s.PRODUCER_SCORE_UPDATE = "PRODUCER_SCORE_UPDATE", s.CONSUMER_SCORE_UPDATE = "CONSUMER_SCORE_UPDATE", s.PRODUCER_STATUS_UPDATE = "PRODUCER_STATUS_UPDATE", s.CONSUMER_STATUS_UPDATE = "CONSUMER_STATUS_UPDATE", s.LOW_CONSUMER_SCORE = "LOW_CONSUMER_SCORE", s.MEDIA_PERMISSION_ERROR = "MEDIA_PERMISSION_ERROR", s.MEDIA_PERMISSION_UPDATE = "MEDIA_PERMISSION_UPDATE", s.MESSAGE = "websocket/message", s.ROOM_MESSAGE = "websocket/room-message", s.PEER_JOINED_INTERNAL = "peer/joined-internal", s.PEER_CLOSED = "websocket/peer-closed", s.CONSUMER_CLOSED = "websocket/consumer-closed", s.CONSUMER_PAUSED = "websocket/consumer-paused", s.CONSUMER_RESUMED = "websocket/consumer-resumed", s.PRODUCER_CLOSED = "websocket/producer-closed", s.NEW_CONSUMER = "websocket/new-consumer", s.PRODUCER_SCORE = "websocket/producer-score", s.CONSUMER_SCORE = "websocket/consumer-score", s.PRODUCER_TOGGLE = "cf/producer-toggle", s.UPDATE_ACTIVE = "media/update-active", s.RESET_PRODUCER_STATE = "cf/reset-producer-state", s.ROOM_STATE = "sockethub/room-state", s.GET_STAGE_REQUESTS = "GET_STAGE_REQUESTS", s.UPDATE_STAGE_REQUESTS = "UPDATE_STAGE_REQUESTS", s.KICK_PEER = "KICK_PEER", s.UPDATE_PEER_STAGE_STATUS = "UPDATE_PEER_STAGE_STATUS", s.JOIN_MEDIA_ROOM = "JOIN_MEDIA_ROOM", s.LEAVE_MEDIA_ROOM = "LEAVE_MEDIA_ROOM", s.PIP_HANGUP = "PIP_HANGUP", s.E2EE_ACTIVE_PRODUCER = "E2EE_ACTIVE_PRODUCER", s.E2EE_INACTIVE_PRODUCER = "E2EE_INACTIVE_PRODUCER", s.E2EE_ACTIVE_CONSUMER = "E2EE_ACTIVE_CONSUMER", s.E2EE_INACTIVE_CONSUMER = "E2EE_INACTIVE_CONSUMER", s.SOCKET_PEERS = "SOCKET_PEERS", s.UPDATE_PERMISSIONS = "UPDATE_PERMISSIONS", s.MAX_SPATIAL_LAYER_CHANGE = "MAX_SPATIAL_LAYER_CHANGE", s.MUTE_SELF = "MUTE_SELF", s.MUTE_SELF_VIDEO = "MUTE_SELF_VIDEO", s))(k || {});
class Ua extends lt.EventEmitter {
  constructor(e) {
    super();
    h(this, "logger");
    this.logger = e, super.setMaxListeners(25);
  }
  emit(e, ...r) {
    return super.emit("*", e, ...r), super.emit(e, ...r);
  }
  on(e, r) {
    var i;
    try {
      const a = this.listenerCount(e);
      a > 25 && a % 25 === 0 && ((i = this.logger) == null || i.warn("CustomEventEmitter::maxListenersExceeded", {
        eventListener: {
          eventName: e.toString(),
          listenerCount: this.listenerCount(e)
        }
      }));
    } catch (a) {
    }
    return super.on(e, r);
  }
  addListener(e, r) {
    var i;
    try {
      const a = this.listenerCount(e);
      a > 25 && a % 25 === 0 && ((i = this.logger) == null || i.warn("CustomEventEmitter::maxListenersExceeded", {
        eventListener: {
          eventName: e.toString(),
          listenerCount: this.listenerCount(e)
        }
      }));
    } catch (a) {
    }
    return super.addListener(e, r);
  }
  off(e, r) {
    return super.off(e, r);
  }
  once(e, r) {
    return super.once(e, r);
  }
  prependListener(e, r) {
    return super.prependListener(e, r);
  }
  prependOnceListener(e, r) {
    return super.prependOnceListener(e, r);
  }
  removeListener(e, r) {
    return super.removeListener(e, r);
  }
  removeAllListeners(e) {
    return super.removeAllListeners(e);
  }
  listeners(e) {
    return super.listeners(e);
  }
  listenerCount(e) {
    return super.listenerCount(e);
  }
}
class qt extends lt.EventEmitter {
  constructor(e) {
    super();
    h(this, "logger");
    this.logger = e, super.setMaxListeners(25);
  }
  emit(e, ...r) {
    return super.emit("*", e, ...r), super.emit(e, ...r);
  }
  on(e, r) {
    var i;
    try {
      const a = this.listenerCount(e);
      a > 25 && a % 25 === 0 && ((i = this.logger) == null || i.warn("CustomEventEmitter::maxListenersExceeded", {
        eventListener: {
          eventName: e.toString(),
          listenerCount: this.listenerCount(e)
        }
      }));
    } catch (a) {
    }
    return super.on(e, r);
  }
  addListener(e, r) {
    var i;
    try {
      const a = this.listenerCount(e);
      a > 25 && a % 25 === 0 && ((i = this.logger) == null || i.warn("CustomEventEmitter::maxListenersExceeded", {
        eventListener: {
          eventName: e.toString(),
          listenerCount: this.listenerCount(e)
        }
      }));
    } catch (a) {
    }
    return super.addListener(e, r);
  }
  off(e, r) {
    return super.off(e, r);
  }
  once(e, r) {
    return super.once(e, r);
  }
  prependListener(e, r) {
    return super.prependListener(e, r);
  }
  prependOnceListener(e, r) {
    return super.prependOnceListener(e, r);
  }
  removeListener(e, r) {
    return super.removeListener(e, r);
  }
  removeAllListeners(e) {
    return super.removeAllListeners(e);
  }
  listeners(e) {
    return super.listeners(e);
  }
  listenerCount(e) {
    return super.listenerCount(e);
  }
}
function Ew(s, t = 2) {
  return s.replace(/[^\u00BF-\u1FFF\u2C00-\uD7FF\w\s]/g, "").trim().split(/\s+/).slice(0, t).map((i) => i.charAt(0)).join("").toUpperCase();
}
const Bp = 1080, Hp = 1920, _w = (s, t, e, r, i, a) => {
  let o = 0.5, c = 0.5;
  const d = i, l = a, p = Math.min(e / d, r / l);
  let g = d * p, S = l * p, v, _, P, C, w = 1;
  return g < e && (w = e / g), Math.abs(w - 1) < 1e-14 && S < r && (w = r / S), g *= w, S *= w, P = d / (g / e), C = l / (S / r), v = (d - P) * o, _ = (l - C) * c, v < 0 && (v = 0), _ < 0 && (_ = 0), P > d && (P = d), C > l && (C = l), [v, _, P, C, s, t, e, r];
};
var Kt, mi, st, zt, be, hs, zs, gt, De, On, Nn, Ys, Vn;
const Qh = class extends qt {
  constructor(e, r, i, a) {
    const o = e.getValue("logger");
    super(o);
    m(this, Kt, void 0);
    m(this, mi, void 0);
    m(this, st, void 0);
    m(this, zt, void 0);
    m(this, be, {
      height: Bp,
      width: Hp
    });
    m(this, hs, {
      brand: "#2160FD",
      background: "#141414",
      text: "#000000",
      videoBackground: "#191919",
      textOnBrand: "#EEEEEE"
    });
    m(this, zs, void 0);
    m(this, gt, {});
    m(this, De, void 0);
    m(this, On, void 0);
    m(this, Nn, void 0);
    m(this, Ys, void 0);
    m(this, Vn, !1);
    h(this, "cleanupEventListeners", () => {
      n(this, mi).unsubscribe("stageStatus", this.handlePipMediaControls), n(this, De).removeListener("videoUpdate", this.onSelfVideoUpdateListener), n(this, De).removeListener("audioUpdate", this.onSelfAudioUpdateListener), n(this, De).removeListener("roomLeft", () => this.disable());
    });
    h(this, "enablePipMediaControls", () => {
      this.mountAudioEvents(), this.mountVideoEvents();
    });
    h(this, "onSelfVideoUpdateListener", ({ videoEnabled: e }) => {
      this.updateMediaSession("CAMERA", e);
    });
    h(this, "onSelfAudioUpdateListener", ({ audioEnabled: e }) => {
      this.updateMediaSession("MIC", e);
    });
    h(this, "handlePipMediaControls", (e) => {
      e === "ON_STAGE" ? this.enablePipMediaControls() : this.unmountEvents();
    });
    h(this, "eventCallback", (e) => {
      e === "CAMERA" && (n(this, De).videoEnabled ? n(this, De).disableVideo() : n(this, De).enableVideo(), this.emit("cameraToggled")), e === "MIC" && (n(this, De).audioEnabled ? n(this, De).disableAudio() : n(this, De).enableAudio(), this.emit("micToggled")), e === "END" && (n(this, mi).getValue("peerSessionStore").emit(k.PIP_HANGUP), this.cleanupEventListeners(), this.emit("hangup"), this.cleanup());
    });
    h(this, "unmountEvents", () => {
      navigator.mediaSession === void 0 || navigator.mediaSession.setCameraActive === void 0 || (navigator.mediaSession.setActionHandler("togglemicrophone", void 0), navigator.mediaSession.setActionHandler("togglecamera", void 0));
    });
    h(this, "animate", () => {
      if (!this.isActive && n(this, Ys) === "active") {
        this.disable(!0);
        return;
      }
      n(this, gt) !== void 0 && this.paintCanvas(), n(this, zs) !== void 0 && f(this, zs, requestAnimationFrame(() => this.animate()));
    });
    /**
    	 * Disable PiP
    	 */
    h(this, "disable", (e = !1) => {
      f(this, Ys, "idle"), this.cleanupEventListeners(), cancelAnimationFrame(n(this, zs)), e !== !0 && document.body.removeChild(n(this, st)), f(this, zs, void 0), document.pictureInPictureElement && document.exitPictureInPicture();
    });
    f(this, mi, e), f(this, Ys, "idle"), f(this, De, r), f(this, hs, {
      brand: r.config.designTokens.colors.brand[500],
      background: r.config.designTokens.colors.background[1e3],
      text: r.config.designTokens.colors.text,
      videoBackground: r.config.designTokens.colors.videoBg,
      textOnBrand: r.config.designTokens.colors.textOnBrand
    }), i && this.setupIcon("pin", i), a && this.setupIcon("handRaise", a);
  }
  static _init(e, r) {
    return u(this, null, function* () {
      let i, a;
      try {
        i = yield Yc(uw), a = yield Yc(hw);
      } catch (o) {
      }
      return new Qh(e, r, i, a);
    });
  }
  setupIcon(e, r) {
    return u(this, null, function* () {
      switch (e) {
        case "handRaise":
          f(this, Nn, r);
          break;
        case "pin":
          f(this, On, r);
          break;
      }
    });
  }
  overrideIcon(e, r) {
    return u(this, null, function* () {
      switch (e) {
        case "handRaise":
          f(this, Nn, yield Yc(r));
          break;
        case "pin":
          f(this, On, yield Yc(r));
          break;
      }
    });
  }
  constructImage(e) {
    const r = new Image(), i = new Blob([e], { type: "image/svg+xml" }), a = window.URL.createObjectURL(i);
    return new Promise((o) => {
      r.onload = () => {
        o(r), window.URL.revokeObjectURL(a);
      }, r.src = a;
    });
  }
  createVideoContainer() {
    f(this, st, document.createElement("div")), n(this, st).style.width = "0.1px", n(this, st).style.height = "0.1px", n(this, st).style.overflow = "hidden", n(this, st).style.position = "absolute", n(this, st).style.bottom = "0", n(this, st).style.right = "0", n(this, st).style.opacity = "0", n(this, st).appendChild(n(this, zt));
  }
  setupEventListeners() {
    n(this, mi).subscribe("stageStatus", this.handlePipMediaControls), n(this, De).addListener("videoUpdate", this.onSelfVideoUpdateListener), n(this, De).addListener("audioUpdate", this.onSelfAudioUpdateListener), n(this, De).addListener("roomLeft", () => this.disable());
  }
  createCanvas() {
    const e = document.createElement("canvas");
    e.height = n(this, be).height, e.width = n(this, be).width, f(this, Kt, e);
  }
  setupMediaSessionEvents() {
    navigator.mediaSession === void 0 || navigator.mediaSession.setCameraActive === void 0 || (navigator.mediaSession.setActionHandler("hangup", () => {
      this.eventCallback("END");
    }), this.mountAudioEvents(), this.mountVideoEvents());
  }
  mountAudioEvents() {
    navigator.mediaSession === void 0 || navigator.mediaSession.setMicrophoneActive === void 0 || n(this, De).permissions.canProduceAudio && navigator.mediaSession.setActionHandler("togglemicrophone", () => {
      this.eventCallback("MIC");
    });
  }
  mountVideoEvents() {
    navigator.mediaSession === void 0 || navigator.mediaSession.setCameraActive === void 0 || n(this, De).permissions.canProduceVideo && navigator.mediaSession.setActionHandler("togglecamera", () => {
      this.eventCallback("CAMERA");
    });
  }
  getSources() {
    const r = Object.values(n(this, gt)).reduce(
      (i, a) => (i[a.pinned ? "pinned" : "regular"].push(a), i),
      { pinned: [], regular: [] }
    );
    return [...r.pinned, ...r.regular];
  }
  drawEmptyTile(e, r, i, a) {
    if (n(this, Kt) === void 0)
      return;
    const o = n(this, Kt).getContext("2d"), c = n(this, Kt).width, d = 0, l = 0, p = r - d * 2, g = i - d * 2, S = Math.floor(c / p), v = Math.floor(e / S), P = e % S * (p + d) + d, C = v * (g + d) + d, { displayText: w, image: $ } = a != null ? a : {};
    o.fillStyle = w || $ ? n(this, hs).videoBackground : n(this, hs).background, o.strokeStyle = n(this, hs).brand, o.beginPath(), o.moveTo(P + l, C), o.arcTo(P + p, C, P + p, C + l, l), o.arcTo(
      P + p,
      C + g,
      P + p - l,
      C + g,
      l
    ), o.arcTo(P, C + g, P, C + g - l, l), o.arcTo(P, C, P + l, C, l), o.closePath(), o.fill(), o.stroke();
    const F = p / 6, N = p / 2 + P, B = g / 2 + C;
    o.save(), (w || $) && (o.beginPath(), o.arc(N, B, F, 0, Math.PI * 2), o.fillStyle = n(this, hs).brand, o.fill(), $ ? (o.clip(), o.drawImage(
      $,
      N - F,
      B - F,
      F * 2,
      F * 2
    ), o.restore()) : w && (o.fillStyle = n(this, hs).textOnBrand, o.font = `${F / 2}px sans-serif`, o.textAlign = "center", o.textBaseline = "middle", o.fillText(w, N, B)), this.drawIcons(a, P, C, Math.max(p, g)));
  }
  drawIcons(e, r, i, a) {
    const o = Math.min(Math.max(a * 0.15, 100), 200), c = o * 0.2, d = o * 0.2;
    let l = r + c;
    const p = i + c, g = (S) => {
      const v = n(this, Kt).getContext("2d");
      v.save(), v.fillStyle = n(this, hs).background, v.beginPath(), v.moveTo(l + d, p), v.arcTo(l + o, p, l + o, p + d, d), v.arcTo(
        l + o,
        p + o,
        l + o - d,
        p + o,
        d
      ), v.arcTo(l, p + o, l, p + o - d, d), v.arcTo(l, p, l + d, p, d), v.closePath(), v.fill(), typeof S == "string" ? (v.font = `${o / 1.5}px sans-serif`, v.fillStyle = n(this, hs).text, v.textAlign = "center", v.textBaseline = "top", v.fillText(S, o / 2 + l, p + c)) : v.drawImage(
        S,
        l + c,
        p + c,
        o - c * 2,
        o - c * 2
      ), l += o + c, v.restore();
    };
    e.pinned && g(n(this, On)), e.handRaised && g(n(this, Nn));
  }
  drawTile(e, r, i) {
    var l, p;
    if (n(this, Kt) === void 0)
      return;
    const a = n(this, Kt).getContext("2d"), o = this.getSources();
    let c = 0, d = 0;
    for (; c < n(this, be).height - 5; ) {
      let g = 0;
      for (; g < n(this, be).width - 5 && d < i; ) {
        if ((l = o[d]) != null && l.enabled) {
          const S = o[d].element, [v, _, P, C, w, $, F, N] = _w(
            g,
            c,
            e,
            r,
            S.videoWidth,
            S.videoHeight
          );
          ((p = S == null ? void 0 : S.classList) == null ? void 0 : p.contains("mirror")) ? (a.save(), a.scale(-1, 1), a.drawImage(S, v, _, P, C, -1 * w, $, -1 * F, N), a.restore()) : a.drawImage(S, v, _, P, C, w, $, F, N), this.drawIcons(o[d], w, $, Math.max(F, N));
        } else
          this.drawEmptyTile(d, e, r, o[d]);
        d += 1, g += e;
      }
      c += r;
    }
  }
  calcGridElemSize(e) {
    switch (e) {
      case 0:
      case 1:
        return [n(this, be).width, n(this, be).height];
      case 2:
        return [Math.floor(n(this, be).width / 2), n(this, be).height];
      case 3:
      case 4:
        return [Math.floor(n(this, be).width / 2), Math.floor(n(this, be).height / 2)];
      case 5:
      case 6:
        return [Math.floor(n(this, be).width / 3), Math.floor(n(this, be).height / 2)];
      case 7:
      case 8:
      case 9:
        return [Math.floor(n(this, be).width / 3), Math.floor(n(this, be).height / 3)];
      default:
        return [Math.floor(n(this, be).width / 3), Math.floor(n(this, be).height / 2)];
    }
  }
  paintCanvas() {
    let e = this.getSources().length;
    e !== 1 && (e = e % 2 > 0 ? e + 1 : e);
    const [r, i] = this.calcGridElemSize(e);
    this.drawTile(r, i, e);
  }
  isSupported() {
    var e;
    return !!window.chrome && document.pictureInPictureEnabled && ((e = n(this, De).config) == null ? void 0 : e.viewType) !== "LIVESTREAM";
  }
  get isActive() {
    return document.pictureInPictureElement !== null;
  }
  cleanup() {
    if (f(this, Vn, !1), this.isSupported() && document.exitPictureInPicture !== void 0 && document.pictureInPictureElement !== null && document.exitPictureInPicture(), n(this, st))
      try {
        document.body.removeChild(n(this, st));
      } catch (e) {
      }
    this.removeAllSources(), f(this, Kt, void 0), f(this, zt, void 0), f(this, zs, void 0);
  }
  /**
  	 * Initialize PiP and prepare sources
  	 */
  init({ height: e, width: r } = {}) {
    if (!this.isSupported())
      throw this.logger.error("Pip.unsupported"), new Error("Picture-in-picture is not available in this environment");
    if (n(this, Vn))
      return;
    f(this, Vn, !0), this.createCanvas(), this.setupMediaSessionEvents();
    const i = document.createElement("video");
    f(this, be, {
      height: e != null ? e : Bp,
      width: r != null ? r : Hp
    }), i.height = n(this, be).height, i.width = n(this, be).width, i.autoplay = !0, i.muted = !0, i.srcObject = n(this, Kt).captureStream(24), f(this, zt, i), n(this, zt).onloadedmetadata = () => {
      try {
        this.emit("pipStarted"), n(this, zt).onleavepictureinpicture = () => {
          this.emit("pipEnded");
        };
      } catch (a) {
        this.emit("pipEnded");
      }
    }, this.createVideoContainer(), this.paintCanvas();
  }
  updateMediaSession(e, r) {
    navigator.mediaSession !== void 0 && (e === "CAMERA" && navigator.mediaSession.setCameraActive !== void 0 && navigator.mediaSession.setCameraActive(r), e === "MIC" && navigator.mediaSession.setMicrophoneActive !== void 0 && navigator.mediaSession.setMicrophoneActive(r));
  }
  enableSource(e) {
    n(this, gt)[e] !== void 0 && (n(this, gt)[e].enabled = !0);
  }
  disableSource(e) {
    n(this, gt)[e] !== void 0 && (n(this, gt)[e].enabled = !1);
  }
  generateAvatar(e, r) {
    return u(this, null, function* () {
      if (!r)
        return;
      const i = new Image();
      try {
        const a = yield (yield fetch(r)).blob(), o = window.URL.createObjectURL(a);
        i.onload = () => {
          this.updateSource(e, { image: i }), window.URL.revokeObjectURL(o);
        }, i.src = o;
      } catch (a) {
        this.logger.error("Pip::GenerateAvatar", {
          error: a
        });
      }
    });
  }
  /**
   * Add a video source from the participant grid
   * @param {string} id id for the source (ex. participant id)
   * @param {HTMLVideoElement} element HTMLVideoElement for the video source
   * @param {boolean} enabled if source is enabled
   * @param {?string} [displayText] two character display text
   */
  addSource(e, r, i, a = !1, o = void 0, c = void 0, d = !1) {
    this.logger.debug("Pip::AddSource", {
      pip: {
        id: e,
        handRaised: d
      }
    }), n(this, gt)[e] = {
      id: e,
      element: r,
      enabled: i,
      pinned: a,
      displayText: o ? Ew(o) : void 0,
      imageUrl: c,
      handRaised: d
    }, c && this.generateAvatar(e, c);
  }
  /** Update a video source */
  updateSource(e, r) {
    this.logger.info("Pip::UpdateSource", {
      pip: {
        id: e,
        handRaised: r.handRaised
      }
    });
    const i = n(this, gt)[e];
    i && (n(this, gt)[e] = D(D({}, i), r));
  }
  /**
  	 * Remove the video source for the participant
  	 * @param id id for the source (ex. participant id)
  	 */
  removeSource(e) {
    delete n(this, gt)[e];
  }
  /**
  	 * Remove the pinned source
  	 * @param id id for the source (ex. participant id)
  	 */
  removePinnedSource() {
    Object.values(n(this, gt)).forEach((r) => {
      r.pinned && this.removeSource(r.id);
    });
  }
  /**
  	 * Remove all sources
  	 */
  removeAllSources() {
    f(this, gt, {});
  }
  /**
  	 * Enable PiP
  	 */
  enable() {
    f(this, Ys, "activating"), this.setupEventListeners(), this.updateMediaSession("CAMERA", n(this, De).videoEnabled), this.updateMediaSession("MIC", n(this, De).audioEnabled), document.body.appendChild(n(this, st)), f(this, zs, requestAnimationFrame(() => this.animate())), n(this, zt).onloadedmetadata = () => {
      n(this, zt).requestPictureInPicture().then(() => {
        f(this, Ys, "active");
      });
    }, n(this, zt).readyState === 4 && n(this, zt).requestPictureInPicture().then(() => {
      f(this, Ys, "active");
    });
  }
};
let Cu = Qh;
Kt = new WeakMap(), mi = new WeakMap(), st = new WeakMap(), zt = new WeakMap(), be = new WeakMap(), hs = new WeakMap(), zs = new WeakMap(), gt = new WeakMap(), De = new WeakMap(), On = new WeakMap(), Nn = new WeakMap(), Ys = new WeakMap(), Vn = new WeakMap();
var vr;
(function(s) {
  s[s.PUBLISHER = 0] = "PUBLISHER", s[s.SUBSCRIBER = 1] = "SUBSCRIBER";
})(vr || (vr = {}));
var Fs;
(function(s) {
  s[s.AUDIO = 0] = "AUDIO", s[s.VIDEO = 1] = "VIDEO";
})(Fs || (Fs = {}));
class Pw extends T {
  constructor() {
    super("media.Codec", [
      {
        no: 1,
        name: "channels",
        kind: "scalar",
        opt: !0,
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 2,
        name: "clock_rate",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "mime_type",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "sdp_fmtp_line",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "payload_type",
        kind: "scalar",
        opt: !0,
        T: 13
        /*ScalarType.UINT32*/
      }
    ]);
  }
}
const gf = new Pw();
class Cw extends T {
  constructor() {
    super("media.HeaderExtension", [
      {
        no: 1,
        name: "direction",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "uri",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const ww = new Cw();
class Rw extends T {
  constructor() {
    super("media.Fingerprint", [
      {
        no: 1,
        name: "algorithm",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "value",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Rw();
class bw extends T {
  constructor() {
    super("media.SessionDescription", [
      { no: 1, name: "target", kind: "enum", T: () => ["media.Target", vr] },
      {
        no: 2,
        name: "type",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "sdp",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Is = new bw();
class kw extends T {
  constructor() {
    super("media.ProducerPayload", [
      {
        no: 1,
        name: "kind",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "paused",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "screen_share",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 4,
        name: "msid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "app_data",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "mime_type",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Iw = new kw();
class Aw extends T {
  constructor() {
    super("media.CreateTransportRequest", [
      {
        no: 1,
        name: "consuming",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "force_tcp",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 3, name: "description", kind: "message", T: () => Is },
      {
        no: 4,
        name: "private_ice",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 5, name: "producers", kind: "message", repeat: 1, T: () => Iw }
    ]);
  }
}
const Mw = new Aw();
class Dw extends T {
  constructor() {
    super("media.AudioActivityRequest", [
      {
        no: 1,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "energy",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "silent",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const Ow = new Dw();
class Nw extends T {
  constructor() {
    super("media.CreateTransportResponse", [
      {
        no: 1,
        name: "transport_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "description", kind: "message", T: () => Is },
      {
        no: 3,
        name: "transcription_enabled",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 4,
        name: "producer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const mf = new Nw();
class Vw extends T {
  constructor() {
    super("media.RenegotiateRequest", [
      {
        no: 1,
        name: "transport_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "description", kind: "message", T: () => Is }
    ]);
  }
}
const Lw = new Vw();
class xw extends T {
  constructor() {
    super("media.RenegotiateResponse", [
      {
        no: 1,
        name: "transport_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "description", kind: "message", T: () => Is }
    ]);
  }
}
new xw();
class Uw extends T {
  constructor() {
    super("media.NestedScore", [
      {
        no: 1,
        name: "encoding_idx",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 2,
        name: "rid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "score",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 4,
        name: "ssrc",
        kind: "scalar",
        T: 3,
        L: 0
        /*LongType.BIGINT*/
      }
    ]);
  }
}
const $w = new Uw();
class Fw extends T {
  constructor() {
    super("media.ProducerTrack", [
      {
        no: 1,
        name: "track_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "stream_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Bw = new Fw();
class Hw extends T {
  constructor() {
    super("media.ProducerEntry", [
      {
        no: 1,
        name: "producing_transport_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Hw();
class qw extends T {
  constructor() {
    super("media.ConsumerEntry", [
      {
        no: 1,
        name: "consuming_transport_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "consumer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new qw();
class jw extends T {
  constructor() {
    super("media.ProducerState", [
      {
        no: 1,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "kind", kind: "enum", T: () => ["media.ProducerKind", Fs] },
      {
        no: 3,
        name: "pause",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 4,
        name: "screen_share",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 5,
        name: "app_data",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "producing_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 7,
        name: "mime_type",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 8, name: "codec", kind: "message", T: () => gf }
    ]);
  }
}
const Bc = new jw();
class Gw extends T {
  constructor() {
    super("media.ConsumerState", [
      {
        no: 1,
        name: "consumer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "producer_state", kind: "message", T: () => Bc },
      { no: 3, name: "producer_track", kind: "message", T: () => Bw },
      {
        no: 4,
        name: "error_code",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Ww = new Gw();
class Jw extends T {
  constructor() {
    super("media.ProducerIdToConsumerMap", [
      { no: 1, name: "map", kind: "map", K: 9, V: { kind: "message", T: () => Ww } }
    ]);
  }
}
const ff = new Jw();
class Kw extends T {
  constructor() {
    super("media.PeerRtpCapabilitites", [
      { no: 1, name: "sender", kind: "message", T: () => jp },
      { no: 2, name: "receiver", kind: "message", T: () => jp }
    ]);
  }
}
const Sf = new Kw();
class zw extends T {
  constructor() {
    super("media.RtpCapability", [
      { no: 1, name: "codecs", kind: "message", repeat: 1, T: () => gf },
      { no: 2, name: "header_extensions", kind: "message", repeat: 1, T: () => ww }
    ]);
  }
}
const qp = new zw();
class Yw extends T {
  constructor() {
    super("media.RtpCapabilitites", [
      { no: 1, name: "audio", kind: "message", T: () => qp },
      { no: 2, name: "video", kind: "message", T: () => qp }
    ]);
  }
}
const jp = new Yw();
class Qw extends T {
  constructor() {
    super("media.PreferredCodec", [
      {
        no: 1,
        name: "audio",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "video",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Xw = new Qw();
class Zw extends T {
  constructor() {
    super("media.Simulcast", [
      {
        no: 1,
        name: "preferred_rid",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "priority_ordering",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "rid_not_available",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const vf = new Zw();
class eR extends T {
  constructor() {
    super("media.edge.GeoLocation", [
      {
        no: 1,
        name: "latitude",
        kind: "scalar",
        T: 2
        /*ScalarType.FLOAT*/
      },
      {
        no: 2,
        name: "longitude",
        kind: "scalar",
        T: 2
        /*ScalarType.FLOAT*/
      },
      {
        no: 3,
        name: "region",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const tR = new eR();
class sR extends T {
  constructor() {
    super("media.edge.PeerJoinRequest", [
      {
        no: 1,
        name: "display_name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "prejoined",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "room_uuid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "meeting_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "preset",
        kind: "scalar",
        opt: !0,
        T: 12
        /*ScalarType.BYTES*/
      },
      {
        no: 6,
        name: "user_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 7,
        name: "organization_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 8, name: "location", kind: "message", T: () => tR },
      { no: 9, name: "capabilities", kind: "message", T: () => Sf }
    ]);
  }
}
const rR = new sR();
class iR extends T {
  constructor() {
    super("media.edge.PeerJoinCompleteRequest", []);
  }
}
const nR = new iR();
class aR extends T {
  constructor() {
    super("media.edge.PeerLeaveRequest", [
      {
        no: 1,
        name: "close_room",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const oR = new aR();
class cR extends T {
  constructor() {
    super("media.edge.ConsumeMultipleProducerRequest", [
      {
        no: 1,
        name: "producer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "paused",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
new cR();
class dR extends T {
  constructor() {
    super("media.edge.ConsumePeerRequest", [
      {
        no: 1,
        name: "producing_peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "paused",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "producer_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 4, name: "preferred_codec", kind: "message", T: () => Xw },
      {
        no: 5,
        name: "producing_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 6, name: "simulcast", kind: "message", T: () => vf }
    ]);
  }
}
const lR = new dR();
class uR extends T {
  constructor() {
    super("media.edge.ConsumePeersRequest", [
      { no: 1, name: "requests", kind: "message", repeat: 1, T: () => lR },
      {
        no: 2,
        name: "consuming_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const hR = new uR();
class pR extends T {
  constructor() {
    super("media.edge.UpdateConsumerSimulcastConfigRequest", [
      {
        no: 1,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "simulcast", kind: "message", T: () => vf },
      {
        no: 3,
        name: "producing_transport_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "mid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const gR = new pR();
class mR extends T {
  constructor() {
    super("media.edge.UpdateConsumersSimulcastConfigRequest", [
      { no: 1, name: "requests", kind: "message", repeat: 1, T: () => gR },
      {
        no: 2,
        name: "consuming_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const fR = new mR();
class SR extends T {
  constructor() {
    super("media.edge.ProducerCreateRequest", [
      {
        no: 1,
        name: "kind",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "paused",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "screen_share",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 4, name: "description", kind: "message", T: () => Is },
      {
        no: 5,
        name: "msid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "app_data",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 7,
        name: "mime_type",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 8,
        name: "producing_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const vR = new SR();
class TR extends T {
  constructor() {
    super("media.edge.SelectedPeersRequest", []);
  }
}
new TR();
class yR extends T {
  constructor() {
    super("media.edge.GlobalPeerPinningRequest", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const ER = new yR();
class _R extends T {
  constructor() {
    super("media.edge.ProducerToggleRequest", [
      {
        no: 1,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "pause",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const Xc = new _R();
class PR extends T {
  constructor() {
    super("media.edge.ConsumerToggleRequest", [
      {
        no: 1,
        name: "consumer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "pause",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
new PR();
class CR extends T {
  constructor() {
    super("media.edge.ProducerCloseRequest", [
      {
        no: 1,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "description", kind: "message", T: () => Is },
      {
        no: 3,
        name: "producing_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const wR = new CR();
class RR extends T {
  constructor() {
    super("media.edge.ConsumerCloseRequest", [
      {
        no: 1,
        name: "consumer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "description", kind: "message", T: () => Is },
      {
        no: 3,
        name: "consuming_transport_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const bR = new RR();
class kR extends T {
  constructor() {
    super("media.edge.KickPeerRequest", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new kR();
class IR extends T {
  constructor() {
    super("media.edge.KickAllPeersRequest", [
      {
        no: 1,
        name: "propagate_kick_across_rooms",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const Tf = new IR();
class AR extends T {
  constructor() {
    super("media.edge.PeerDisplayNameEditRequest", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const MR = new AR();
class DR extends T {
  constructor() {
    super("media.edge.HostMediaControlForPeerRequest", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "audio",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "video",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 4,
        name: "scree_share",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const OR = new DR();
class NR extends T {
  constructor() {
    super("media.edge.HostMediaControlForAllPeerRequest", [
      {
        no: 1,
        name: "audio",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "video",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "screen_share",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const VR = new NR();
class LR extends T {
  constructor() {
    super("media.edge.GetRoomStateResponse", [
      {
        no: 1,
        name: "display_title",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "locked_mode",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "room_uuid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "room_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "current_peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "is_recording",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 7,
        name: "recorder_participant_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 8,
        name: "pinned_peer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const xR = new LR();
class UR extends T {
  constructor() {
    super("media.edge.ErrorResponse", [
      {
        no: 1,
        name: "error_message",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "event_id",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      }
    ]);
  }
}
const $R = new UR();
class FR extends T {
  constructor() {
    super("media.edge.EmptyResponse", []);
  }
}
new FR();
class BR extends T {
  constructor() {
    super("media.edge.RoomParticipants", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "producer_states", kind: "message", repeat: 1, T: () => Bc },
      {
        no: 3,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "user_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 5, name: "capabilities", kind: "message", T: () => Sf }
    ]);
  }
}
const yf = new BR();
class HR extends T {
  constructor() {
    super("media.edge.SelectedPeersResponse", [
      {
        no: 1,
        name: "audio_peers",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "compulsory_peers",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const wu = new HR();
class qR extends T {
  constructor() {
    super("media.edge.SelectedPeersDiffEntry", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "priority",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      }
    ]);
  }
}
const jR = new qR();
class GR extends T {
  constructor() {
    super("media.edge.SelectedPeersDiffResponse", [
      { no: 1, name: "entries", kind: "message", repeat: 1, T: () => jR }
    ]);
  }
}
const Gp = new GR();
class WR extends T {
  constructor() {
    super("media.edge.PeerJoinResponse", []);
  }
}
new WR();
class JR extends T {
  constructor() {
    super("media.edge.PeerJoinCompleteResponse", [
      { no: 1, name: "room_state", kind: "message", T: () => xR },
      { no: 2, name: "participants", kind: "message", repeat: 1, T: () => yf },
      { no: 3, name: "selected_peers", kind: "message", T: () => wu },
      {
        no: 4,
        name: "max_preferred_streams",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      }
    ]);
  }
}
const Ru = new JR();
class KR extends T {
  constructor() {
    super("media.edge.PeerLeaveResponse", [
      {
        no: 1,
        name: "closed",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const zR = new KR();
class YR extends T {
  constructor() {
    super("media.edge.ConsumeMultipleProducerResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 2, name: "consumer_ids_map", kind: "message", T: () => ff }
    ]);
  }
}
new YR();
class QR extends T {
  constructor() {
    super("media.edge.ConsumePeerResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 2, name: "consumer_ids_map", kind: "message", T: () => ff },
      { no: 3, name: "description", kind: "message", T: () => Is }
    ]);
  }
}
const XR = new QR();
class ZR extends T {
  constructor() {
    super("media.edge.ProducerCreateResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "producer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 4, name: "description", kind: "message", T: () => Is }
    ]);
  }
}
const eb = new ZR();
class tb extends T {
  constructor() {
    super("media.edge.ProducerScoreResponse", [
      {
        no: 1,
        name: "responseid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "score", kind: "message", T: () => $w }
    ]);
  }
}
new tb();
class sb extends T {
  constructor() {
    super("media.edge.ActiveSpeakerResponse", [
      {
        no: 1,
        name: "responsepeer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "volume",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      }
    ]);
  }
}
new sb();
class rb extends T {
  constructor() {
    super("media.edge.NoActiveSpeakerResponse", []);
  }
}
new rb();
class ib extends T {
  constructor() {
    super("media.edge.ProducerToggleResponse", []);
  }
}
new ib();
class nb extends T {
  constructor() {
    super("media.edge.ConsumerToggleResponse", []);
  }
}
new nb();
class ab extends T {
  constructor() {
    super("media.edge.ProducerClosingResponse", [
      { no: 1, name: "description", kind: "message", T: () => Is }
    ]);
  }
}
const ob = new ab();
class cb extends T {
  constructor() {
    super("media.edge.ConsumerClosingResponse", [
      { no: 1, name: "description", kind: "message", T: () => Is }
    ]);
  }
}
const db = new cb();
class lb extends T {
  constructor() {
    super("media.edge.GlobalPeerPinningResponse", []);
  }
}
new lb();
class ub extends T {
  constructor() {
    super("media.edge.KickPeerResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new ub();
class hb extends T {
  constructor() {
    super("media.edge.KickAllPeersResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new hb();
class pb extends T {
  constructor() {
    super("media.edge.HostMediaControlForPeerResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const gb = new pb();
class mb extends T {
  constructor() {
    super("media.edge.HostMediaControlForAllPeerResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const fb = new mb();
class Sb extends T {
  constructor() {
    super("media.edge.PeerDisplayNameEditResponse", [
      {
        no: 1,
        name: "status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const vb = new Sb();
class Tb extends T {
  constructor() {
    super("media.edge.PeerJoinBroadcastResponse", [
      { no: 1, name: "participant", kind: "message", T: () => yf }
    ]);
  }
}
const Wp = new Tb();
class yb extends T {
  constructor() {
    super("media.edge.TrackSubscriptionKind", [
      {
        no: 1,
        name: "audio",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "video",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const Jp = new yb();
class Eb extends T {
  constructor() {
    super("media.edge.TrackSubscription", [
      {
        no: 1,
        name: "label",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "webcam", kind: "message", T: () => Jp },
      { no: 3, name: "screenshare", kind: "message", T: () => Jp }
    ]);
  }
}
const _b = new Eb();
class Pb extends T {
  constructor() {
    super("media.edge.PeerProducingTransportCreateBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "transport_details", kind: "message", T: () => mf },
      { no: 3, name: "track_subscriptions", kind: "message", repeat: 1, T: () => _b }
    ]);
  }
}
new Pb();
class Cb extends T {
  constructor() {
    super("media.edge.PeerProducerCreateBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "producer_state", kind: "message", T: () => Bc }
    ]);
  }
}
const wb = new Cb();
class Rb extends T {
  constructor() {
    super("media.edge.PeerProducerToggleBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "producer_state", kind: "message", T: () => Bc },
      {
        no: 3,
        name: "initiator_participant_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Kp = new Rb();
class bb extends T {
  constructor() {
    super("media.edge.PeerProducerCloseBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "producer_state", kind: "message", T: () => Bc }
    ]);
  }
}
const kb = new bb();
class Ib extends T {
  constructor() {
    super("media.edge.PeerLeaveBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const bu = new Ib();
class Ab extends T {
  constructor() {
    super("media.edge.GlobalPeerPinningBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const zp = new Ab();
class Mb extends T {
  constructor() {
    super("media.edge.GlobalPeerUnPinningBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Mb();
class Db extends T {
  constructor() {
    super("media.edge.RecordingStartedBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Db();
class Ob extends T {
  constructor() {
    super("media.edge.RecordingStoppedBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Ob();
class Nb extends T {
  constructor() {
    super("media.edge.PeerDisplayNameEditBroadcastResponse", [
      {
        no: 1,
        name: "participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Nb();
class Vb extends T {
  constructor() {
    super("media.edge.PeerPingRequestBroadcastResponse", [
      {
        no: 1,
        name: "password",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Vb();
class Lb extends T {
  constructor() {
    super("media.edge.MediaRoomTerminationBroadcastResponse", [
      {
        no: 1,
        name: "reason",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Lb();
class xb extends T {
  constructor() {
    super("socket.ai.MeetingTranscript", [
      {
        no: 1,
        name: "meeting_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "transcript",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "is_partial",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const nu = new xb();
class Ub extends T {
  constructor() {
    super("socket.api.BaseSocketHubMessage", [
      {
        no: 1,
        name: "event",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 2,
        name: "id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "room_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "payload",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      },
      {
        no: 7,
        name: "error",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 8,
        name: "sid",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new Ub();
class $b extends T {
  constructor() {
    super("socket.api.ErrorMessage", [
      {
        no: 1,
        name: "code",
        kind: "scalar",
        opt: !0,
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 2,
        name: "message",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Fb = new $b();
var rn;
(function(s) {
  s[s.BROWSER = 0] = "BROWSER", s[s.TRACK = 1] = "TRACK", s[s.COMPOSITE = 2] = "COMPOSITE";
})(rn || (rn = {}));
var pr;
(function(s) {
  s[s.UNSPECIFIED = 0] = "UNSPECIFIED", s[s.ON_STAGE = 1] = "ON_STAGE", s[s.APPROVED_STAGE = 2] = "APPROVED_STAGE", s[s.REQUESTED_STAGE = 3] = "REQUESTED_STAGE", s[s.OFF_STAGE = 4] = "OFF_STAGE";
})(pr || (pr = {}));
var ku;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.RECORDER = 1] = "RECORDER", s[s.LIVESTREAMER = 2] = "LIVESTREAMER";
})(ku || (ku = {}));
var Iu;
(function(s) {
  s[s.PEERS = 0] = "PEERS", s[s.ROOMS = 1] = "ROOMS";
})(Iu || (Iu = {}));
var Rd;
(function(s) {
  s[s.HIVE = 0] = "HIVE", s[s.CHAT = 1] = "CHAT", s[s.PING = 2] = "PING";
})(Rd || (Rd = {}));
class Bb extends T {
  constructor() {
    super("socket.room.PeerFlags", [
      {
        no: 1,
        name: "preset_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "recorder_type",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "hidden_participant",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const Hb = new Bb();
class qb extends T {
  constructor() {
    super("socket.room.Peer", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 4, name: "stage_type", kind: "enum", opt: !0, T: () => ["socket.room.StageType", pr, "STAGE_TYPE_"] },
      {
        no: 5,
        name: "custom_participant_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "preset_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 7,
        name: "display_picture_url",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 8,
        name: "waitlisted",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 9, name: "flags", kind: "message", T: () => Hb }
    ]);
  }
}
const Fl = new qb();
class jb extends T {
  constructor() {
    super("socket.room.PeerInfoResponse", [
      { no: 1, name: "peer", kind: "message", T: () => Fl }
    ]);
  }
}
const Sn = new jb();
class Gb extends T {
  constructor() {
    super("socket.room.PeerStatusUpdate", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "stage_type", kind: "enum", opt: !0, T: () => ["socket.room.StageType", pr, "STAGE_TYPE_"] }
    ]);
  }
}
const Yp = new Gb();
class Wb extends T {
  constructor() {
    super("socket.room.RoomPeersInfoRequest", [
      {
        no: 1,
        name: "seach_query",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "limit",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "offset",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      }
    ]);
  }
}
const Jb = new Wb();
class Kb extends T {
  constructor() {
    super("socket.room.RoomPeersInfoResponse", [
      { no: 1, name: "peers", kind: "message", repeat: 1, T: () => Fl }
    ]);
  }
}
const au = new Kb();
class zb extends T {
  constructor() {
    super("socket.room.RoomPeerCountResponse", [
      {
        no: 1,
        name: "count",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      }
    ]);
  }
}
const Qp = new zb();
class Yb extends T {
  constructor() {
    super("socket.room.Room", [
      {
        no: 1,
        name: "room_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "title",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "created_at",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      { no: 5, name: "active_recordings", kind: "message", repeat: 1, T: () => Xb },
      {
        no: 6,
        name: "room_uuid",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Ef = new Yb();
class Qb extends T {
  constructor() {
    super("socket.room.ActiveRecording", [
      {
        no: 1,
        name: "recording_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "recording_type", kind: "enum", T: () => ["common.RecordingType", rn] },
      {
        no: 3,
        name: "recording_status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Xb = new Qb();
class Zb extends T {
  constructor() {
    super("socket.room.RoomInfoResponse", [
      { no: 1, name: "room", kind: "message", T: () => Ef }
    ]);
  }
}
const Xp = new Zb();
class ek extends T {
  constructor() {
    super("socket.room.GetPeerInfoRequest", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const _f = new ek();
class tk extends T {
  constructor() {
    super("socket.room.UpdatePeerInfoRequest", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "display_name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new tk();
class sk extends T {
  constructor() {
    super("socket.room.JoinRoomRequest", [
      { no: 1, name: "peer", kind: "message", T: () => Fl },
      {
        no: 3,
        name: "room_uuid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "organization_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "use_hive",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 6,
        name: "preset",
        kind: "scalar",
        opt: !0,
        T: 12
        /*ScalarType.BYTES*/
      },
      { no: 7, name: "capabilities", kind: "enum", repeat: 1, T: () => ["socket.room.Capabilities", Rd, "CAPABILITIES_"] },
      {
        no: 8,
        name: "timestamp",
        kind: "scalar",
        opt: !0,
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      }
    ]);
  }
}
const rk = new sk();
class ik extends T {
  constructor() {
    super("socket.room.LeaveRoomRequest", [
      { no: 1, name: "peer", kind: "message", T: () => Fl },
      {
        no: 2,
        name: "timestamp",
        kind: "scalar",
        opt: !0,
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      }
    ]);
  }
}
const nk = new ik();
class ak extends T {
  constructor() {
    super("socket.room.UpdateRoomInfoRequest", [
      { no: 1, name: "room", kind: "message", T: () => Ef }
    ]);
  }
}
new ak();
class ok extends T {
  constructor() {
    super("socket.room.GetConnectedRoomsDumpRequest", []);
  }
}
new ok();
class ck extends T {
  constructor() {
    super("socket.room.ServiceError", [
      {
        no: 1,
        name: "message",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "code",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Ah = new ck();
class dk extends T {
  constructor() {
    super("socket.room.ConnectedMeetingPeer", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "display_name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "custom_participant_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "preset_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "display_picture_url",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const lk = new dk();
class uk extends T {
  constructor() {
    super("socket.room.ConnectedMeetingDump", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "title",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "participants", kind: "message", repeat: 1, T: () => lk }
    ]);
  }
}
const Zp = new uk();
class hk extends T {
  constructor() {
    super("socket.room.GetConnectedRoomsDumpResponse", [
      { no: 1, name: "parent_meeting", kind: "message", T: () => Zp },
      { no: 2, name: "meetings", kind: "message", repeat: 1, T: () => Zp }
    ]);
  }
}
const pk = new hk();
class gk extends T {
  constructor() {
    super("socket.room.CreateRoomRequestPayload", [
      {
        no: 1,
        name: "title",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const mk = new gk();
class fk extends T {
  constructor() {
    super("socket.room.CreateConnectedRoomsRequest", [
      { no: 1, name: "payloads", kind: "message", repeat: 1, T: () => mk }
    ]);
  }
}
const Sk = new fk();
class vk extends T {
  constructor() {
    super("socket.room.CreateRoomResponsePayload", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "title",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "error", kind: "message", T: () => Ah }
    ]);
  }
}
const Tk = new vk();
class yk extends T {
  constructor() {
    super("socket.room.CreateConnectedRoomsResponse", [
      { no: 1, name: "payloads", kind: "message", repeat: 1, T: () => Tk }
    ]);
  }
}
const eg = new yk();
class Ek extends T {
  constructor() {
    super("socket.room.UpdateRoomRequestPayload", [
      {
        no: 1,
        name: "meeting_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "title",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const _k = new Ek();
class Pk extends T {
  constructor() {
    super("socket.room.UpdateConnectedRoomsRequest", [
      { no: 1, name: "payloads", kind: "message", repeat: 1, T: () => _k }
    ]);
  }
}
new Pk();
class Ck extends T {
  constructor() {
    super("socket.room.DisableRoomPayload", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const wk = new Ck();
class Rk extends T {
  constructor() {
    super("socket.room.DisableConnectedRoomsRequest", [
      { no: 1, name: "payloads", kind: "message", repeat: 1, T: () => wk }
    ]);
  }
}
const bk = new Rk();
class kk extends T {
  constructor() {
    super("socket.room.DisableConnectedRoomsResponse", [
      { no: 1, name: "payloads", kind: "message", repeat: 1, T: () => Mk }
    ]);
  }
}
const Ik = new kk();
class Ak extends T {
  constructor() {
    super("socket.room.DisableConnectedRoomPayload", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "status",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "title",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 4, name: "error", kind: "message", T: () => Ah }
    ]);
  }
}
const Mk = new Ak();
class Dk extends T {
  constructor() {
    super("socket.room.MovePeerPayload", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "preset_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Ok = new Dk();
class Nk extends T {
  constructor() {
    super("socket.room.MovePeersBetweenRoomsRequest", [
      {
        no: 1,
        name: "source_meeting_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "destination_meeting_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "participants", kind: "message", repeat: 1, T: () => Ok }
    ]);
  }
}
const Vk = new Nk();
class Lk extends T {
  constructor() {
    super("socket.room.MovedPeer", [
      {
        no: 1,
        name: "meeting_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "custom_participant_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "error", kind: "message", T: () => Ah }
    ]);
  }
}
const Pf = new Lk();
class xk extends T {
  constructor() {
    super("socket.room.MovePeersBetweenRoomsResponse", [
      { no: 1, name: "payloads", kind: "message", repeat: 1, T: () => Pf }
    ]);
  }
}
new xk();
class Uk extends T {
  constructor() {
    super("socket.room.TransferPeer", [
      {
        no: 1,
        name: "meeting_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "auth_token",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const $k = new Uk();
class Fk extends T {
  constructor() {
    super("socket.room.GetAllAddedParticipantsResponse", [
      { no: 1, name: "participants", kind: "message", repeat: 1, T: () => qk }
    ]);
  }
}
const Bk = new Fk();
class Hk extends T {
  constructor() {
    super("socket.room.AddedParticipant", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "picture",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "custom_participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const qk = new Hk();
class jk extends T {
  constructor() {
    super("socket.room.RemoveParticipantsRequest", [
      {
        no: 1,
        name: "peer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Cf = new jk();
class Gk extends T {
  constructor() {
    super("socket.room.BroadcastMessage", [
      {
        no: 1,
        name: "type",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "payload",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      },
      {
        no: 3,
        name: "timestamp",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      {
        no: 4,
        name: "ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 5, name: "broadcast_type", kind: "enum", opt: !0, T: () => ["socket.room.BroadcastType", Iu, "BROADCAST_TYPE_"] }
    ]);
  }
}
const oo = new Gk();
class Wk extends T {
  constructor() {
    super("socket.room.AcceptWaitingRoomRequests", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Jk = new Wk();
class Kk extends T {
  constructor() {
    super("socket.room.DenyWaitingRoomRequests", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const zk = new Kk();
class Yk extends T {
  constructor() {
    super("socket.room.WaitingRoomRequest", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "picture",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "custom_participant_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "preset_name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Qk = new Yk();
class Xk extends T {
  constructor() {
    super("socket.room.GetWaitingRoomRequests", [
      { no: 1, name: "requests", kind: "message", repeat: 1, T: () => Qk }
    ]);
  }
}
const tg = new Xk();
class Zk extends T {
  constructor() {
    super("socket.room.GetRoomStageStateResponse", [
      {
        no: 1,
        name: "on_stage_peers",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "approved_stage_peers",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "requested_stage_peers",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const sg = new Zk();
var Au;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.SKIP = 1] = "SKIP", s[s.ON_PRIVILEGED_USER_ENTRY = 2] = "ON_PRIVILEGED_USER_ENTRY", s[s.SKIP_ON_ACCEPT = 3] = "SKIP_ON_ACCEPT";
})(Au || (Au = {}));
var Qr;
(function(s) {
  s[s.NONE = 0] = "NONE", s[s.ALLOWED = 1] = "ALLOWED", s[s.NOT_ALLOWED = 2] = "NOT_ALLOWED", s[s.CAN_REQUEST = 3] = "CAN_REQUEST";
})(Qr || (Qr = {}));
class eI extends T {
  constructor() {
    super("socket.preset.PollsPermissionUpdate", [
      {
        no: 1,
        name: "can_create",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "can_vote",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "can_view",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const tI = new eI();
class sI extends T {
  constructor() {
    super("socket.preset.PluginsPermissionsUpdate", [
      {
        no: 1,
        name: "can_close",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "can_start",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const rI = new sI();
class iI extends T {
  constructor() {
    super("socket.preset.PublicChatPermission", [
      {
        no: 1,
        name: "can_send",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "text",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "files",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const nI = new iI();
class aI extends T {
  constructor() {
    super("socket.preset.PrivateChatPermission", [
      {
        no: 1,
        name: "can_send",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "can_receive",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "text",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 4,
        name: "files",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const oI = new aI();
class cI extends T {
  constructor() {
    super("socket.preset.ChatPermissionUpdate", [
      { no: 1, name: "public", kind: "message", T: () => nI },
      { no: 2, name: "private", kind: "message", T: () => oI }
    ]);
  }
}
const dI = new cI();
class lI extends T {
  constructor() {
    super("socket.preset.ConnectedMeetingPermissionUpdate", [
      {
        no: 1,
        name: "can_alter_connected_meetings",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 2,
        name: "can_switch_to_parent_meeting",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "can_switch_connected_meetings",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const uI = new lI();
class hI extends T {
  constructor() {
    super("socket.preset.StreamPermission", [
      { no: 1, name: "can_produce", kind: "enum", opt: !0, T: () => ["socket.preset.StreamPermissionType", Qr, "STREAM_PERMISSION_TYPE_"] },
      { no: 2, name: "can_consume", kind: "enum", opt: !0, T: () => ["socket.preset.StreamPermissionType", Qr, "STREAM_PERMISSION_TYPE_"] }
    ]);
  }
}
const ou = new hI();
class pI extends T {
  constructor() {
    super("socket.preset.MediaPermissionUpdate", [
      { no: 1, name: "video", kind: "message", T: () => ou },
      { no: 2, name: "audio", kind: "message", T: () => ou },
      { no: 3, name: "screenshare", kind: "message", T: () => ou }
    ]);
  }
}
const gI = new pI();
class mI extends T {
  constructor() {
    super("socket.preset.PresetUpdates", [
      { no: 1, name: "polls", kind: "message", T: () => tI },
      { no: 2, name: "plugins", kind: "message", T: () => rI },
      { no: 3, name: "chat", kind: "message", T: () => dI },
      {
        no: 4,
        name: "accept_waiting_requests",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 5,
        name: "can_accept_production_requests",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 6,
        name: "can_edit_display_name",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 7,
        name: "can_record",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 8,
        name: "can_livestream",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 9,
        name: "can_spotlight",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 10,
        name: "disable_participant_audio",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 11,
        name: "disable_participant_screensharing",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 12,
        name: "disable_participant_video",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 13,
        name: "kick_participant",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 14,
        name: "pin_participant",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 15,
        name: "transcription_enabled",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 16, name: "waiting_room_type", kind: "enum", opt: !0, T: () => ["socket.preset.WaitingRoomType", Au, "WAITING_ROOM_TYPE_"] },
      {
        no: 17,
        name: "is_recorder",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 18, name: "recorder_type", kind: "enum", opt: !0, T: () => ["socket.room.RecorderType", ku, "RECORDER_TYPE_"] },
      {
        no: 19,
        name: "hidden_participant",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 20,
        name: "show_participant_list",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 21,
        name: "can_change_participant_permissions",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 22, name: "connected_meetings", kind: "message", T: () => uI },
      { no: 23, name: "media", kind: "message", T: () => gI }
    ]);
  }
}
const Mh = new mI();
class fI extends T {
  constructor() {
    super("socket.preset.ReadPeersPresetRequest", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const SI = new fI();
class vI extends T {
  constructor() {
    super("socket.preset.PeerPreset", [
      {
        no: 1,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "preset",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const TI = new vI();
class yI extends T {
  constructor() {
    super("socket.preset.ReadPeersPresetResponse", [
      { no: 1, name: "peer_presets", kind: "message", repeat: 1, T: () => TI }
    ]);
  }
}
const EI = new yI();
class _I extends T {
  constructor() {
    super("socket.preset.UpdatePeerPreset", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 2, name: "patch", kind: "message", T: () => Mh }
    ]);
  }
}
const wf = new _I();
class PI extends T {
  constructor() {
    super("socket.preset.UpdatePeersPresetRequest", [
      { no: 1, name: "update_peers_presets", kind: "message", repeat: 1, T: () => wf }
    ]);
  }
}
const CI = new PI();
class wI extends T {
  constructor() {
    super("socket.preset.UpdatePeersPresetResponse", [
      { no: 1, name: "update_peers_presets", kind: "message", repeat: 1, T: () => wf }
    ]);
  }
}
const rg = new wI();
class RI extends T {
  constructor() {
    super("socket.preset.PeerUserIDMap", [
      {
        no: 1,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const bI = new RI();
class kI extends T {
  constructor() {
    super("socket.preset.BulkUpdatePeerPresetRequest", [
      { no: 1, name: "peers", kind: "message", repeat: 1, T: () => bI },
      { no: 2, name: "patch", kind: "message", T: () => Mh }
    ]);
  }
}
new kI();
class II extends T {
  constructor() {
    super("socket.preset.BulkUpdatePeerPresetResponse", [
      { no: 2, name: "patch", kind: "message", T: () => Mh }
    ]);
  }
}
new II();
class AI extends T {
  constructor() {
    super("socket.chat.ChatMessage", [
      {
        no: 1,
        name: "chat_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "pinned",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 6,
        name: "is_edited",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 7,
        name: "payload_type",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 8,
        name: "payload",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 10,
        name: "target_user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 11,
        name: "created_at",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      {
        no: 12,
        name: "created_at_ms",
        kind: "scalar",
        opt: !0,
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      {
        no: 13,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 14,
        name: "channel_index",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const hn = new AI();
class MI extends T {
  constructor() {
    super("socket.chat.GetPaginatedChatMessageRoomRequest", [
      {
        no: 1,
        name: "time_stamp",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      {
        no: 2,
        name: "size",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "from",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 4,
        name: "reversed",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 5,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const DI = new MI();
class OI extends T {
  constructor() {
    super("socket.chat.GetPaginatedChatMessageRoomResponse", [
      { no: 1, name: "messages", kind: "message", repeat: 1, T: () => hn },
      {
        no: 2,
        name: "next",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const NI = new OI();
class VI extends T {
  constructor() {
    super("socket.chat.GetChatMessagesResponse", [
      { no: 1, name: "messages", kind: "message", repeat: 1, T: () => hn }
    ]);
  }
}
const Rf = new VI();
class LI extends T {
  constructor() {
    super("socket.chat.SendChatMessageToRoomRequest", [
      {
        no: 1,
        name: "payload_type",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 2,
        name: "payload",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const xI = new LI();
class UI extends T {
  constructor() {
    super("socket.chat.SendChatMessageToRoomResponse", [
      { no: 1, name: "message", kind: "message", T: () => hn }
    ]);
  }
}
const cu = new UI();
class $I extends T {
  constructor() {
    super("socket.chat.SendChatMessageToPeersRequest", [
      {
        no: 1,
        name: "peer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "payload_type",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "payload",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const FI = new $I();
class BI extends T {
  constructor() {
    super("socket.chat.SendChatMessageToPeersResponse", [
      { no: 1, name: "message", kind: "message", T: () => hn }
    ]);
  }
}
const du = new BI();
class HI extends T {
  constructor() {
    super("socket.chat.SendChatMessageToChannelRequest", [
      {
        no: 1,
        name: "channel_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "payload_type",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "payload",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const qI = new HI();
class jI extends T {
  constructor() {
    super("socket.chat.SendChatMessageToChannelResponse", [
      { no: 1, name: "message", kind: "message", T: () => hn }
    ]);
  }
}
new jI();
class GI extends T {
  constructor() {
    super("socket.chat.EditChatMessageRequest", [
      {
        no: 1,
        name: "chat_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "payload_type",
        kind: "scalar",
        opt: !0,
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "payload",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "pinned",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 5,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const WI = new GI();
class JI extends T {
  constructor() {
    super("socket.chat.PinChatMessageRequest", [
      {
        no: 1,
        name: "chat_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "pinned",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const KI = new JI();
class zI extends T {
  constructor() {
    super("socket.chat.PinChatMessageResponse", [
      {
        no: 1,
        name: "chat_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "pinned",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 3,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Zc = new zI();
class YI extends T {
  constructor() {
    super("socket.chat.EditChatMessageResponse", [
      { no: 1, name: "message", kind: "message", T: () => hn }
    ]);
  }
}
const ed = new YI();
class QI extends T {
  constructor() {
    super("socket.chat.DeleteChatMessageRequest", [
      {
        no: 1,
        name: "chat_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const XI = new QI();
class ZI extends T {
  constructor() {
    super("socket.chat.DeleteChatMessageResponse", [
      {
        no: 1,
        name: "chat_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const td = new ZI();
class eA extends T {
  constructor() {
    super("socket.chat.SearchChatMessagesRequest", [
      {
        no: 1,
        name: "time_stamp",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      {
        no: 2,
        name: "size",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 3,
        name: "from",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 4,
        name: "reversed",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 5,
        name: "channel_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "search_term",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const tA = new eA();
class sA extends T {
  constructor() {
    super("socket.chat.MarkChannelIndexAsReadRequest", [
      {
        no: 1,
        name: "channel_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "channel_index",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const rA = new sA();
class iA extends T {
  constructor() {
    super("socket.chat.MarkChannelIndexAsReadResponse", [
      {
        no: 1,
        name: "channel_index",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const nA = new iA();
class aA extends T {
  constructor() {
    super("socket.chat.CreateChatChannelRequest", [
      {
        no: 1,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "target_user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "display_picture_url",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "visibility",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "is_direct_message",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const oA = new aA();
class cA extends T {
  constructor() {
    super("socket.chat.UpdateChatChannelRequest", [
      {
        no: 1,
        name: "chat_channel_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "display_name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "target_user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "display_picture_url",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "visibility",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "is_direct_message",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const dA = new cA();
class lA extends T {
  constructor() {
    super("socket.chat.CreateChatChannelResponse", [
      {
        no: 1,
        name: "chat_channel_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
new lA();
class uA extends T {
  constructor() {
    super("socket.chat.GetChatChannelRequest", [
      {
        no: 1,
        name: "chat_channel_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const hA = new uA();
class pA extends T {
  constructor() {
    super("socket.chat.LatestMessageAndUnreadCount", [
      { no: 1, name: "message", kind: "message", T: () => hn },
      {
        no: 2,
        name: "unread_count",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      }
    ]);
  }
}
const gA = new pA();
class mA extends T {
  constructor() {
    super("socket.chat.ChatChannel", [
      {
        no: 1,
        name: "chat_channel_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "display_picture_url",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "visibility",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "is_direct_message",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      { no: 6, name: "latest_message_and_unread_count", kind: "message", T: () => gA },
      {
        no: 7,
        name: "target_user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const fA = new mA();
class SA extends T {
  constructor() {
    super("socket.chat.GetChatChannelResponse", [
      { no: 1, name: "chat_channels", kind: "message", repeat: 1, T: () => fA }
    ]);
  }
}
const js = new SA();
class vA extends T {
  constructor() {
    super("socket.chat.ChannelMember", [
      {
        no: 1,
        name: "id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "name",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "picture",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "custom_participant_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const TA = new vA();
class yA extends T {
  constructor() {
    super("socket.chat.GetChatChannelMembersResponse", [
      { no: 1, name: "channel_members", kind: "message", repeat: 1, T: () => TA }
    ]);
  }
}
const EA = new yA();
class _A extends T {
  constructor() {
    super("socket.plugin.AddPluginRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "staggered",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const PA = new _A();
class CA extends T {
  constructor() {
    super("socket.plugin.RemovePluginRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "staggered",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const wA = new CA();
class RA extends T {
  constructor() {
    super("socket.plugin.EnablePluginForRoomRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const bA = new RA();
class kA extends T {
  constructor() {
    super("socket.plugin.DisablePluginForRoomRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const IA = new kA();
class AA extends T {
  constructor() {
    super("socket.plugin.EnablePluginForPeersRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "peer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const MA = new AA();
class DA extends T {
  constructor() {
    super("socket.plugin.DisablePluginForPeersRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "peer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const OA = new DA();
class NA extends T {
  constructor() {
    super("socket.plugin.PluginEventToRoomRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "plugin_data",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const VA = new NA();
class LA extends T {
  constructor() {
    super("socket.plugin.PluginEventToPeersRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "peer_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "plugin_data",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const xA = new LA();
class UA extends T {
  constructor() {
    super("socket.plugin.StoreKeys", [
      {
        no: 1,
        name: "store_key",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "payload",
        kind: "scalar",
        opt: !0,
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const Dh = new UA();
class $A extends T {
  constructor() {
    super("socket.plugin.PluginStoreInsertKeysRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "store_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "insert_keys", kind: "message", repeat: 1, T: () => Dh }
    ]);
  }
}
const ig = new $A();
class FA extends T {
  constructor() {
    super("socket.plugin.PluginStoreGetKeysRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "store_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "get_keys", kind: "message", repeat: 1, T: () => Dh }
    ]);
  }
}
const BA = new FA();
class HA extends T {
  constructor() {
    super("socket.plugin.PluginStoreDeleteKeysRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "store_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "delete_keys", kind: "message", repeat: 1, T: () => Dh }
    ]);
  }
}
const qA = new HA();
class jA extends T {
  constructor() {
    super("socket.plugin.PluginStoreDeleteRequest", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "store_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const GA = new jA();
class WA extends T {
  constructor() {
    super("socket.plugin.EnablePluginResponse", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "enabled_by",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const Mu = new WA();
class JA extends T {
  constructor() {
    super("socket.plugin.EnablePluginsResponse", [
      { no: 1, name: "plugins", kind: "message", repeat: 1, T: () => Mu }
    ]);
  }
}
const KA = new JA();
class zA extends T {
  constructor() {
    super("socket.plugin.DisablePluginResponse", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "disabled_by",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const ng = new zA();
class YA extends T {
  constructor() {
    super("socket.plugin.PluginStoreItem", [
      {
        no: 1,
        name: "timestamp",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "store_key",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "payload",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const QA = new YA();
class XA extends T {
  constructor() {
    super("socket.plugin.PluginStoreResponse", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "store_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "store_items", kind: "message", repeat: 1, T: () => QA }
    ]);
  }
}
const ag = new XA();
class ZA extends T {
  constructor() {
    super("socket.plugin.PluginEventResponse", [
      {
        no: 1,
        name: "plugin_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "plugin_data",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const og = new ZA();
class eM extends T {
  constructor() {
    super("socket.livestreaming.LiveStreamingEvent", [
      {
        no: 1,
        name: "livestream_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "err_message",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "meeting_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "playback_url",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "org_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 7,
        name: "room_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 8,
        name: "room_uuid",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 9,
        name: "status",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 10,
        name: "manual_ingest",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const cg = new eM();
class tM extends T {
  constructor() {
    super("socket.livestreaming.GetStagePeersResponse", [
      {
        no: 1,
        name: "stage_peers",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const dg = new tM();
class sM extends T {
  constructor() {
    super("socket.livestreaming.StageRequest", [
      {
        no: 1,
        name: "display_name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const rM = new sM();
class iM extends T {
  constructor() {
    super("socket.livestreaming.GetStageRequestsResponse", [
      { no: 1, name: "stage_requests", kind: "message", repeat: 1, T: () => rM }
    ]);
  }
}
const lu = new iM();
class nM extends T {
  constructor() {
    super("socket.livestreaming.GrantStageAccessRequest", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const aM = new nM();
class oM extends T {
  constructor() {
    super("socket.livestreaming.DenyStageAccessRequest", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const cM = new oM();
class dM extends T {
  constructor() {
    super("socket.livestreaming.LeaveStageRequest", [
      {
        no: 1,
        name: "user_ids",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const lg = new dM();
class lM extends T {
  constructor() {
    super("socket.polls.Poll", [
      {
        no: 1,
        name: "poll_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "created_by",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "created_by_user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "question",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 5, name: "options", kind: "message", repeat: 1, T: () => hM },
      {
        no: 6,
        name: "hide_votes",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 7,
        name: "anonymous",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 8,
        name: "votes",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const bf = new lM();
class uM extends T {
  constructor() {
    super("socket.polls.PollOption", [
      {
        no: 1,
        name: "text",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "count",
        kind: "scalar",
        opt: !0,
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      },
      { no: 3, name: "votes", kind: "message", repeat: 1, T: () => gM }
    ]);
  }
}
const hM = new uM();
class pM extends T {
  constructor() {
    super("socket.polls.PollVote", [
      {
        no: 1,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "name",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const gM = new pM();
class mM extends T {
  constructor() {
    super("socket.polls.NewPollRequest", [
      {
        no: 1,
        name: "question",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "options",
        kind: "scalar",
        repeat: 2,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "anonymous",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 4,
        name: "hide_votes",
        kind: "scalar",
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 5,
        name: "created_by",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "created_by_user_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      }
    ]);
  }
}
const fM = new mM();
class SM extends T {
  constructor() {
    super("socket.polls.VotePollRequest", [
      {
        no: 1,
        name: "poll_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "index",
        kind: "scalar",
        T: 4,
        L: 2
        /*LongType.NUMBER*/
      }
    ]);
  }
}
const vM = new SM();
class TM extends T {
  constructor() {
    super("socket.polls.UpdatePollResponse", [
      { no: 1, name: "poll", kind: "message", T: () => bf }
    ]);
  }
}
const uu = new TM();
class yM extends T {
  constructor() {
    super("socket.polls.GetPollsResponse", [
      { no: 1, name: "polls", kind: "message", repeat: 1, T: () => bf }
    ]);
  }
}
const EM = new yM();
class _M extends T {
  constructor() {
    super("socket.recording.RecordingEvent", [
      {
        no: 1,
        name: "recording_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 2,
        name: "err_message",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      { no: 3, name: "recording_type", kind: "enum", T: () => ["common.RecordingType", rn] }
    ]);
  }
}
const ug = new _M();
class PM extends T {
  constructor() {
    super("google.protobuf.Timestamp", [
      {
        no: 1,
        name: "seconds",
        kind: "scalar",
        T: 3,
        L: 0
        /*LongType.BIGINT*/
      },
      {
        no: 2,
        name: "nanos",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      }
    ]);
  }
  /**
   * Creates a new `Timestamp` for the current time.
   */
  now() {
    const t = this.create(), e = Date.now();
    return t.seconds = io.from(Math.floor(e / 1e3)).toBigInt(), t.nanos = e % 1e3 * 1e6, t;
  }
  /**
   * Converts a `Timestamp` to a JavaScript Date.
   */
  toDate(t) {
    return new Date(io.from(t.seconds).toNumber() * 1e3 + Math.ceil(t.nanos / 1e6));
  }
  /**
   * Converts a JavaScript Date to a `Timestamp`.
   */
  fromDate(t) {
    const e = this.create(), r = t.getTime();
    return e.seconds = io.from(Math.floor(r / 1e3)).toBigInt(), e.nanos = r % 1e3 * 1e6, e;
  }
  /**
   * In JSON format, the `Timestamp` type is encoded as a string
   * in the RFC 3339 format.
   */
  internalJsonWrite(t, e) {
    let r = io.from(t.seconds).toNumber() * 1e3;
    if (r < Date.parse("0001-01-01T00:00:00Z") || r > Date.parse("9999-12-31T23:59:59Z"))
      throw new Error("Unable to encode Timestamp to JSON. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.");
    if (t.nanos < 0)
      throw new Error("Unable to encode invalid Timestamp to JSON. Nanos must not be negative.");
    let i = "Z";
    if (t.nanos > 0) {
      let a = (t.nanos + 1e9).toString().substring(1);
      a.substring(3) === "000000" ? i = "." + a.substring(0, 3) + "Z" : a.substring(6) === "000" ? i = "." + a.substring(0, 6) + "Z" : i = "." + a + "Z";
    }
    return new Date(r).toISOString().replace(".000Z", i);
  }
  /**
   * In JSON format, the `Timestamp` type is encoded as a string
   * in the RFC 3339 format.
   */
  internalJsonRead(t, e, r) {
    if (typeof t != "string")
      throw new Error("Unable to parse Timestamp from JSON " + av(t) + ".");
    let i = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:Z|\.([0-9]{3,9})Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
    if (!i)
      throw new Error("Unable to parse Timestamp from JSON. Invalid format.");
    let a = Date.parse(i[1] + "-" + i[2] + "-" + i[3] + "T" + i[4] + ":" + i[5] + ":" + i[6] + (i[8] ? i[8] : "Z"));
    if (Number.isNaN(a))
      throw new Error("Unable to parse Timestamp from JSON. Invalid value.");
    if (a < Date.parse("0001-01-01T00:00:00Z") || a > Date.parse("9999-12-31T23:59:59Z"))
      throw new globalThis.Error("Unable to parse Timestamp from JSON. Must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive.");
    return r || (r = this.create()), r.seconds = io.from(a / 1e3).toBigInt(), r.nanos = 0, i[7] && (r.nanos = parseInt("1" + i[7] + "0".repeat(9 - i[7].length)) - 1e9), r;
  }
}
new PM();
class CM extends T {
  constructor() {
    super("common.BaseHubMessage", [
      {
        no: 1,
        name: "event",
        kind: "scalar",
        T: 5
        /*ScalarType.INT32*/
      },
      {
        no: 2,
        name: "id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "peer_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 4,
        name: "room_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 5,
        name: "user_id",
        kind: "scalar",
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 6,
        name: "payload",
        kind: "scalar",
        T: 12
        /*ScalarType.BYTES*/
      },
      {
        no: 7,
        name: "error",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      },
      {
        no: 8,
        name: "sid",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 9,
        name: "room_object_id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 10,
        name: "preset",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 11,
        name: "use_start_session",
        kind: "scalar",
        opt: !0,
        T: 8
        /*ScalarType.BOOL*/
      }
    ]);
  }
}
const Du = new CM();
class wM extends T {
  constructor() {
    super("common.BulkedHubMessage", [
      { no: 1, name: "messages", kind: "message", repeat: 1, T: () => Du }
    ]);
  }
}
new wM();
class RM extends T {
  constructor() {
    super("common.CFWorkersResponse", [
      { no: 1, name: "responses", kind: "message", repeat: 1, T: () => Du },
      { no: 2, name: "broadcast_responses", kind: "message", repeat: 1, T: () => Du }
    ]);
  }
}
new RM();
const bM = 0, kM = 1, IM = 2, AM = 3, MM = 4, DM = 5, OM = {
  getPeerInfo: 0,
  updatePeerInfo: 1,
  getRoomPeersInfo: 2,
  joinRoom: 3,
  leaveRoom: 4,
  getRoomInfo: 5,
  updateRoomInfo: 6,
  closeRoom: 7,
  startedLivestream: 8,
  stoppedLivestream: 9,
  erroredLivestream: 10,
  getStagePeers: 11,
  getStageRequests: 12,
  requestStageAccess: 13,
  cancelStageRequest: 14,
  grantStageAccess: 15,
  denyStageAccess: 16,
  roomPeerCount: 17,
  joinStage: 18,
  leaveStage: 19,
  // getConnectedRoomsDump returns entire dump for a breakout rooms meeting
  // This details which peer is in which meeting currently, and which is the parent meeting
  getConnectedRoomsDump: 20,
  // createConnectedRooms to create breakout rooms
  createConnectedRooms: 21,
  // deleteConnectedRooms to delete breakout rooms
  deleteConnectedRooms: 22,
  // move peers between breakout rooms
  movePeers: 23,
  // transfer peer to new room
  transferPeer: 24,
  // message sent by socket service to inform client of a participant joining a breakout room
  movedPeer: 25,
  // message sent by socket service to inform client of updates in connected rooms
  connectedRoomsUpdated: 26,
  // message sent by socket service to inform client of deletion in connected rooms
  connectedRoomsDeleted: 27,
  // get all participants that have been added to the meeting irrespective of their live status
  getAllAddedParticipants: 28,
  // broadcast api
  broadcastMessage: 29,
  kick: 30,
  kickAll: 31,
  transcript: 32,
  // waitlist events
  getWaitingRoomRequests: 33,
  acceptWaitingRoomRequests: 34,
  waitingRoomRequestAccepted: 35,
  denyWaitingRoomRequests: 36,
  waitingRoomRequestDenied: 37,
  peerStageStatusUpdate: 38,
  broadcastToEntity: 39,
  recordingStarted: 40,
  recordingStopped: 41,
  recordingPaused: 42,
  getRoomStageState: 43,
  livestreamingInvoked: 44
}, NM = {
  getMessages: 0,
  sendMessageToRoom: 1,
  sendMessageToPeers: 2,
  editMessage: 3,
  deleteMessage: 4,
  getPaginatedMessages: 5,
  sendMessageToChannel: 6,
  searchChannelMessages: 7,
  getAllChatChannels: 8,
  markChannelIndexAsRead: 9,
  pinMessage: 10
}, VM = {
  getPlugins: 0,
  addPlugin: 1,
  enablePluginForRoom: 2,
  disablePluginForPeers: 3,
  enablePluginForPeers: 4,
  disablePluginForRoom: 5,
  removePlugin: 6,
  customPluginEventToRoom: 7,
  customPluginEventToPeers: 8,
  storeInsertKeys: 9,
  storeGetKeys: 10,
  storeDeleteKeys: 11,
  storeDelete: 12
}, LM = {
  createPoll: 0,
  getPolls: 1,
  votePoll: 2,
  updatePoll: 3
}, kf = {
  unknown: 0,
  createWebRTCTransport: 1,
  produce: 2,
  consume: 3,
  toggleProducer: 4,
  toggleConsumer: 5,
  closeProducer: 6,
  closeConsumer: 7,
  updateConsumersSimulcastConfig: 8,
  // adding some buffers for new media events.
  joinRoom: 16,
  leaveRoom: 17,
  selectedPeer: 18,
  globalPinPeer: 19,
  selfJoinComplete: 20,
  // some additional buffer for broadcast events.
  peerJoinedBroadcast: 25,
  peerLeaveBroadcast: 26,
  peerProducerCreateBroadcast: 27,
  peerProducerToggleBroadcast: 28,
  peerProducerCloseBroadcast: 29,
  globalPeerPinBroadcast: 30,
  recordingStartedBroadcast: 31,
  recordingStoppedBroadcast: 32,
  peerDisplayNameEditBroadcast: 33,
  mediaRoomTerminationBroadcastResponse: 36,
  selectedPeerDiff: 40,
  renegotiateSessionDescription: 50,
  errorResponse: 60,
  kickPeer: 90,
  kickAll: 91,
  changeDisplayName: 92,
  hostControlPeer: 93,
  hostControlAllPeers: 94,
  // only for CF
  audioActivity: 100
}, xM = {
  createChatChannel: 0,
  getChatChannel: 1,
  deprecatedGetAllChatChannels: 2,
  getChannelMembers: 3,
  updateChatChannel: 4
}, UM = {
  getUserPresets: 0,
  updateUserPreset: 1
};
function $a(s, t) {
  return Object.keys(t).reduce((e, r) => (e[r] = (s << 16) + t[r], e), {});
}
function If(s, t) {
  return Object.keys(s).reduce((e, r) => (e[r] = t | s[r], e), {});
}
const U = $a(bM, OM), Re = $a(kM, NM), J = $a(
  IM,
  VM
), Ws = $a(AM, LM), ui = $a(
  MM,
  xM
), Ar = If(kf, 16777216), Cs = If(kf, 50331648), ld = $a(
  DM,
  UM
);
var $M = Object.defineProperty, FM = Object.getOwnPropertyDescriptor, Oh = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? FM(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && $M(t, e, i), i;
}, Mr, Ln, Ig;
const Ou = (Ig = class {
  constructor(s, t) {
    m(this, Mr, void 0);
    m(this, Ln, void 0);
    f(this, Mr, t), f(this, Ln, s);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ln).getValue("telemetry");
  }
  /**
   * @private access
   * Not for external use
   */
  get logger() {
    return n(this, Ln).getValue("logger");
  }
  createChannel(s, t, e, r = "public", i = !1) {
    return u(this, null, function* () {
      const a = {
        displayName: s,
        targetUserIds: t,
        displayPictureUrl: e,
        visibility: r,
        isDirectMessage: i
      };
      i && (a.visibility = "private");
      const o = yield n(this, Mr).sendMessagePromise(
        ui.createChatChannel,
        oA.toBinary(a)
      ), c = js.fromBinary(
        o.payload
      ).chatChannels;
      return Ou.formatChannel(c[0]);
    });
  }
  updateChannel(s, t) {
    return u(this, null, function* () {
      const e = yield n(this, Mr).sendMessagePromise(
        ui.updateChatChannel,
        dA.toBinary({
          chatChannelId: s,
          targetUserIds: t.memberIds,
          displayName: t.displayName,
          displayPictureUrl: t.displayPictureUrl,
          visibility: t.visibility
        })
      ), r = js.fromBinary(
        e.payload
      ).chatChannels;
      return Ou.formatChannel(r[0]);
    });
  }
  static formatChannel(s) {
    var r;
    const { latestMessageAndUnreadCount: t } = s, e = H(D({}, s), {
      id: s.chatChannelId,
      memberIds: s.targetUserIds,
      unreadCount: (r = t == null ? void 0 : t.unreadCount) != null ? r : 0
    });
    return t != null && t.message && (e.latestMessage = ws.formatSocketPeerMessage(
      t.message
    )), delete e.chatChannelId, delete e.targetUserIds, delete e.latestMessageAndUnreadCount, e;
  }
  getChannelMembers(s) {
    return u(this, null, function* () {
      try {
        const t = yield n(this, Mr).sendMessagePromise(
          ui.getChannelMembers,
          hA.toBinary({ chatChannelId: s })
        );
        return EA.fromBinary(t.payload).channelMembers.map((i) => {
          var a = i, { id: e } = a, r = ro(a, ["id"]);
          return H(D({}, r), { userId: e });
        });
      } catch (t) {
        return [];
      }
    });
  }
  on(s, t) {
    let e, r;
    switch (s) {
      case ui.createChatChannel: {
        e = js.fromBinary.bind(
          js
        ), r = js.create();
        break;
      }
      case ui.updateChatChannel: {
        e = js.fromBinary.bind(
          js
        ), r = js.create();
        break;
      }
    }
    if (!e) {
      this.logger.warn(
        `ChatChannelSocketHandler::Event ${s} is not recognized`
      );
      return;
    }
    n(this, Mr).on(s, ({ payload: i }) => {
      let a = r;
      try {
        a = e(i);
      } catch (o) {
        this.logger.error("ChatChannelSocketHandler::on::binary_decode_error", {
          error: o
        });
      }
      return t(a);
    });
  }
}, Mr = new WeakMap(), Ln = new WeakMap(), Ig);
let on = Ou;
Oh([
  E.trace("ChatChannelHandler.createChannel")
], on.prototype, "createChannel", 1);
Oh([
  E.trace("ChatChannelHandler.updateChannel")
], on.prototype, "updateChannel", 1);
Oh([
  E.trace("ChatChannelHandler.getChannelMembers")
], on.prototype, "getChannelMembers", 1);
var BM = Object.defineProperty, HM = Object.getOwnPropertyDescriptor, As = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? HM(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && BM(t, e, i), i;
}, Et = /* @__PURE__ */ ((s) => (s[s.TEXT = 0] = "TEXT", s[s.IMAGE = 1] = "IMAGE", s[s.FILE = 2] = "FILE", s[s.CUSTOM = 3] = "CUSTOM", s))(Et || {}), rt, xn;
class as {
  constructor(t, e) {
    m(this, rt, void 0);
    m(this, xn, void 0);
    f(this, rt, e), f(this, xn, t);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, xn).getValue("telemetry");
  }
  /**
   * @private access
   * Not available for external use
   */
  get logger() {
    return n(this, xn).getValue("logger");
  }
  getChatMessages() {
    return n(this, rt).sendMessagePromise(Re.getMessages);
  }
  getChatMessagesPaginated(t, e, r, i = 0, a = "") {
    return u(this, null, function* () {
      const o = {
        timeStamp: t,
        size: e,
        from: i,
        reversed: r,
        channelId: a
      }, c = yield n(this, rt).sendMessagePromise(
        Re.getPaginatedMessages,
        DI.toBinary(o)
      );
      return c.payload ? NI.fromBinary(
        c.payload
      ) : {
        messages: [],
        next: !1
      };
    });
  }
  sendMessageToRoom(t, e) {
    const r = {
      payloadType: e,
      payload: t
    };
    n(this, rt).sendMessage(
      Re.sendMessageToRoom,
      xI.toBinary(r)
    );
  }
  sendMessageToPeers(t, e, r) {
    const i = {
      payloadType: e,
      peerIds: r,
      payload: t
    };
    n(this, rt).sendMessage(
      Re.sendMessageToPeers,
      FI.toBinary(i)
    );
  }
  sendMessageToChannel(t, e, r) {
    const i = {
      payloadType: e,
      channelId: r,
      payload: t
    };
    n(this, rt).sendMessage(
      Re.sendMessageToChannel,
      qI.toBinary(i)
    );
  }
  sendMessage(t, e, r, i) {
    if (i && this.sendMessageToChannel(t, e, i), r && r.length > 0) {
      this.sendMessageToPeers(t, e, r);
      return;
    }
    this.sendMessageToRoom(t, e);
  }
  editMessage(t, e, r, i, a) {
    return u(this, null, function* () {
      const o = {
        chatId: t,
        payloadType: r,
        payload: e
      };
      i && (o.channelId = i), a !== void 0 && (o.pinned = a);
      const c = yield n(this, rt).sendMessagePromise(
        Re.editMessage,
        WI.toBinary(o)
      );
      return ed.fromBinary(c.payload).message;
    });
  }
  deleteMessage(t, e) {
    return u(this, null, function* () {
      const r = {
        chatId: t
      };
      e && (r.channelId = e);
      const i = yield n(this, rt).sendMessagePromise(
        Re.deleteMessage,
        XI.toBinary(r)
      ), a = td.fromBinary(i.payload);
      return D({
        id: a.chatId
      }, a.channelId ? { channelId: a.channelId } : {});
    });
  }
  searchMessages(t, e) {
    return u(this, null, function* () {
      var i, a, o;
      const r = {
        searchTerm: t,
        timeStamp: (i = e.timestamp) != null ? i : Date.now(),
        size: (a = e.size) != null ? a : 75,
        from: 0,
        reversed: (o = e.reversed) != null ? o : !0
      };
      e.channelId && (r.channelId = e.channelId);
      try {
        const c = yield n(this, rt).sendMessagePromise(
          Re.searchChannelMessages,
          tA.toBinary(r)
        );
        return Rf.fromBinary(c.payload).messages;
      } catch (c) {
        return [];
      }
    });
  }
  getAllChannels() {
    return u(this, null, function* () {
      try {
        const t = yield n(this, rt).sendMessagePromise(
          Re.getAllChatChannels
        );
        return js.fromBinary(t.payload).chatChannels.map(on.formatChannel);
      } catch (t) {
        return [];
      }
    });
  }
  markLastReadMessage(t, e) {
    return u(this, null, function* () {
      const r = yield n(this, rt).sendMessagePromise(
        Re.markChannelIndexAsRead,
        rA.toBinary({
          channelId: t,
          userId: e.userId,
          channelIndex: e.channelIndex
        })
      );
      return nA.fromBinary(r.payload).channelIndex;
    });
  }
  setPinState(t, e) {
    return u(this, null, function* () {
      const r = {
        chatId: t.id,
        pinned: e,
        channelId: t.channelId
      }, i = yield n(this, rt).sendMessagePromise(
        Re.pinMessage,
        KI.toBinary(r)
      );
      return Zc.fromBinary(i.payload);
    });
  }
  on(t, e) {
    let r, i;
    switch (t) {
      case Re.sendMessageToRoom: {
        r = cu.fromBinary.bind(
          cu
        ), i = cu.create();
        break;
      }
      case Re.sendMessageToPeers: {
        r = du.fromBinary.bind(
          du
        ), i = du.create();
        break;
      }
      case Re.editMessage: {
        r = ed.fromBinary.bind(
          ed
        ), i = ed.create();
        break;
      }
      case Re.pinMessage: {
        r = Zc.fromBinary.bind(
          Zc
        ), i = Zc.create();
        break;
      }
      case Re.deleteMessage: {
        r = td.fromBinary.bind(
          td
        ), i = td.create();
        break;
      }
    }
    if (!r) {
      this.logger.warn(`ChatSocketHandler::Event ${t} is not recognized`);
      return;
    }
    n(this, rt).on(t, ({ payload: a }) => {
      let o = i;
      try {
        o = r(a);
      } catch (c) {
        this.logger.error("chatSocketHandler::on::binary_decode_error", {
          error: c
        });
      }
      return e(o);
    });
  }
}
rt = new WeakMap(), xn = new WeakMap();
As([
  E.trace("SocketService.getChatMessages")
], as.prototype, "getChatMessages", 1);
As([
  E.trace("SocketService.getChatMessagesPaginated")
], as.prototype, "getChatMessagesPaginated", 1);
As([
  E.trace("SocketService.sendMessageToRoom")
], as.prototype, "sendMessageToRoom", 1);
As([
  E.trace("SocketService.sendMessageToPeers")
], as.prototype, "sendMessageToPeers", 1);
As([
  E.trace("SocketService.sendMessageToChannel")
], as.prototype, "sendMessageToChannel", 1);
As([
  E.trace("SocketService.sendMessage")
], as.prototype, "sendMessage", 1);
As([
  E.trace("SocketService.editMessage")
], as.prototype, "editMessage", 1);
As([
  E.trace("SocketService.deleteMessage")
], as.prototype, "deleteMessage", 1);
As([
  E.trace("SocketService.searchMessages")
], as.prototype, "searchMessages", 1);
As([
  E.trace("SocketService.getAllChannels")
], as.prototype, "getAllChannels", 1);
As([
  E.trace("SocketService.markLastReadMessage")
], as.prototype, "markLastReadMessage", 1);
function qM(s) {
  return s.replace(
    /([-_]\w)/g,
    (t) => t[1].toUpperCase()
  );
}
function Rs(s) {
  if (!s || typeof s != "object")
    return s;
  if (Array.isArray(s))
    return s.map(
      (e) => Rs(e)
    );
  const t = {};
  return Object.keys(s).forEach((e) => {
    const r = zg(e) ? e : qM(e);
    t[r] = Rs(s[e]);
  }), t;
}
function jM(s) {
  return s.replace(
    /[A-Z]/g,
    (t) => `_${t.toLowerCase()}`
  );
}
function Af(s) {
  if (!s || typeof s != "object")
    return s;
  if (Array.isArray(s))
    return s.map(
      (e) => Af(e)
    );
  const t = {};
  return Object.keys(s).forEach((e) => {
    const r = zg(e) ? e : jM(e);
    t[r] = s[e];
  }), t;
}
function bd(s, t = {}) {
  return s == null ? {} : (Object.getOwnPropertyNames(s).forEach((e) => {
    if (typeof s[e] != "function") {
      if (typeof s[e] == "object") {
        bd(s[e], t[e] = {});
        return;
      }
      t[e] = s[e];
    }
  }), t);
}
class hg {
  constructor(t) {
    h(this, "defaults");
    this.defaults = {
      baseURL: t.baseURL,
      headers: { common: {} },
      timeout: t.timeout,
      retry: t.retry,
      retryDelay: t.retryDelay
    };
  }
  buildURL(t, e) {
    const { baseURL: r } = this.defaults, i = t.startsWith("http") ? t : `${r}${t.startsWith("/") ? t : `/${t}`}`;
    if (e) {
      const a = new URLSearchParams();
      return Object.entries(e).forEach(([o, c]) => {
        a.append(o, c);
      }), `${i}${i.includes("?") ? "&" : "?"}${a.toString()}`;
    }
    return i;
  }
  request(t) {
    return u(this, null, function* () {
      var g;
      const e = ((g = t.method) == null ? void 0 : g.toUpperCase()) || "GET", r = this.buildURL(t.url || "", t.params), i = D(D({}, this.defaults.headers.common), t.headers);
      e !== "GET" && e !== "HEAD" && t.data && !i["Content-Type"] && (i["Content-Type"] = "application/json");
      const o = i["Content-Type"] === "application/json" ? JSON.stringify(t.data) : t.data, c = {
        method: e,
        headers: i,
        body: e !== "GET" && e !== "HEAD" && t.data ? o : void 0
      }, d = t.timeout || this.defaults.timeout, l = t.retry !== void 0 ? t.retry : this.defaults.retry, p = t.retryDelay || this.defaults.retryDelay;
      try {
        const S = new AbortController(), v = setTimeout(() => S.abort(), d);
        c.signal = S.signal;
        const _ = yield fetch(r, c);
        clearTimeout(v);
        let P = null;
        const C = _.headers.get("content-type");
        C && C.includes("application/json") ? P = yield _.json() : P = yield _.text();
        const w = {};
        _.headers.forEach((F, N) => {
          w[N] = F;
        });
        const $ = {
          data: P,
          status: _.status,
          statusText: _.statusText,
          headers: w,
          config: t
        };
        if (!_.ok)
          throw $;
        return $;
      } catch (S) {
        if (S instanceof Error && l > 0)
          return yield new Promise((v) => setTimeout(v, p)), this.defaults.baseURL === gi.apiBase.prod ? this.defaults.baseURL = gi.apiBase.prodAlternate : this.defaults.baseURL === gi.apiBase.prodAlternate && (this.defaults.baseURL = gi.apiBase.prod), this.request(H(D({}, t), {
            retry: l - 1
          }));
        throw S;
      }
    });
  }
  get(r) {
    return u(this, arguments, function* (t, e = {}) {
      return this.request(H(D({}, e), {
        method: "GET",
        url: t
      }));
    });
  }
  post(i, a) {
    return u(this, arguments, function* (t, e, r = {}) {
      return this.request(H(D({}, r), {
        method: "POST",
        url: t,
        data: e
      }));
    });
  }
  put(i, a) {
    return u(this, arguments, function* (t, e, r = {}) {
      return this.request(H(D({}, r), {
        method: "PUT",
        url: t,
        data: e
      }));
    });
  }
}
const GM = 3, WM = 30, JM = 8e3;
class KM {
  constructor(t, e) {
    h(this, "ipInfo");
    h(this, "fetchClient");
    h(this, "requests");
    h(this, "roomName");
    h(this, "roomUUID");
    h(this, "authToken");
    h(this, "organizationId");
    h(this, "iceServers");
    h(this, "pluginInformation");
    h(this, "userDetails");
    h(this, "roomDetails");
    h(this, "context");
    this.context = t;
    const {
      timeout: r = JM,
      retry: i = GM,
      retryDelay: a = WM,
      baseURL: o = gi.apiBase.prod,
      authToken: c,
      cachedUserDetails: d
    } = e || {};
    this.iceServers = d == null ? void 0 : d.iceServers, this.pluginInformation = d == null ? void 0 : d.pluginInformation, this.userDetails = d == null ? void 0 : d.userDetails, this.roomDetails = d == null ? void 0 : d.roomDetails, this.requests = new hg({
      baseURL: o,
      timeout: r,
      retry: i,
      retryDelay: a,
      responseType: "json"
    }), this.fetchClient = new hg({
      baseURL: "",
      // Empty baseURL for direct fetch calls
      timeout: r,
      retry: i,
      retryDelay: a,
      responseType: "json"
    }), this.setAuthToken(c, { bearer: !0 });
    const l = this.requests.request.bind(this.requests);
    this.requests.request = (p) => u(this, null, function* () {
      var S, v, _, P, C;
      const g = t.getValue("telemetry");
      try {
        g.injectContext(this.requests.defaults.headers.common);
        const w = yield l(p);
        return p.url !== g.logsEndpoint && this.logger.debug("xhr::fetch", {
          networkCall: {
            status: w.status,
            statusText: w.statusText,
            baseURL: p.baseURL || this.requests.defaults.baseURL,
            url: p.url,
            method: p.method
          }
        }), w;
      } catch (w) {
        throw w ? (((S = w.config) == null ? void 0 : S.url) !== g.logsEndpoint && this.logger.error("xhr::fetch", {
          error: w,
          networkCall: {
            status: w.status,
            statusText: w.statusText,
            baseURL: ((v = w.config) == null ? void 0 : v.baseURL) || this.requests.defaults.baseURL,
            url: (_ = w.config) == null ? void 0 : _.url,
            retries: (P = w.config) == null ? void 0 : P.retry,
            method: (C = w.config) == null ? void 0 : C.method,
            isOnline: navigator.onLine ? "online" : "offline"
          }
        }), new b(w.message || "Network request failed", "0011")) : new b("Unknown network error occurred", "0011");
      }
    });
  }
  get peerId() {
    return this.context.getValue("peerId");
  }
  get logger() {
    return this.context.getValue("logger");
  }
  setAuthToken(t, e) {
    const { bearer: r } = e || {};
    this.authToken = t, this.requests.defaults.headers.common.Authorization = r ? `Bearer ${t}` : t;
  }
  setHeader(t, e) {
    this.requests.defaults.headers.common[t] = e;
  }
  setRoomName(t) {
    this.roomName = t;
  }
  setRoomUUID(t) {
    this.roomUUID = t;
  }
  setOrganizationId(t) {
    this.organizationId = t;
  }
}
var zM = Object.defineProperty, YM = Object.getOwnPropertyDescriptor, os = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? YM(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && zM(t, e, i), i;
};
class jt extends KM {
  constructor(e, r) {
    super(e, r);
    /**
     * @access private
     * Not for external use
     */
    h(this, "telemetry");
    this.telemetry = e.getValue("telemetry"), this.setHeader("x-realtimekit-version", e.getValue("sdkVersion"));
  }
  getIPDetails() {
    return u(this, null, function* () {
      var r;
      const { peerId: e } = this;
      try {
        const i = yield gh.getIPDetails({
          peerId: e,
          apiHostnames: hf(this.context),
          logger: rf
        });
        if (this.logger.log("ipInfo", { ipInfo: i }), ((r = i == null ? void 0 : i.loc) == null ? void 0 : r.length) > 5)
          return i;
        throw Error("Insufficient data");
      } catch (i) {
        this.logger.warn(
          "APIClient.getIPDetails Failed to get ip details",
          { error: { name: i.name, message: i.message } }
        );
        return;
      }
    });
  }
  getICEServers() {
    return u(this, null, function* () {
      if (this.iceServers)
        return this.iceServers;
      const { success: e, iceServers: r } = (yield this.requests.get("/iceservers")).data;
      if (e)
        return (r == null ? void 0 : r.length) > 0 && (this.iceServers = r), r;
    });
  }
  getPlugins() {
    return u(this, null, function* () {
      var a, o, c, d, l, p, g;
      if (this.pluginInformation)
        return this.pluginInformation;
      const { plugins: e } = (yield this.requests.get("/v2/plugins/user")).data.data, r = ((o = (a = this.context.getValue("flagsmith").getValue(ee.V1_PLUGINS)) == null ? void 0 : a.toString()) == null ? void 0 : o.split(",")) || [], i = e.reduce(
        (S, v) => (S[r.includes(v.id) ? "v1" : "v2"].push(H(D({}, v), { name: v.name.replace("v2", "") })), S),
        { v1: [], v2: [] }
      );
      return (l = (d = (c = this.context.getValue("modules")) == null ? void 0 : c.devTools) == null ? void 0 : d.plugins) != null && l.length && ((g = (p = this.context.getValue("modules")) == null ? void 0 : p.devTools) == null || g.plugins.forEach((S) => {
        var _, P, C;
        const v = H(D({}, ao), {
          tags: [...ao.tags],
          baseUrl: `http://localhost:${S.port}`,
          name: S.name,
          picture: (_ = S.picture) != null ? _ : ao.picture,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          id: S.id,
          organizationId: this.organizationId,
          description: (P = S.description) != null ? P : ao.description,
          staggered: (C = S.staggered) != null ? C : ao.staggered
        });
        i.v2.push(v);
      })), i.v2;
    });
  }
  getPluginDetails(e) {
    return u(this, null, function* () {
      const { plugin: r } = (yield this.requests.get(`/v2/plugins/view/${e}`)).data.data;
      return r;
    });
  }
  getPluginConfig(e) {
    return u(this, null, function* () {
      return (yield this.fetchClient.get(`${e}/dyte-config.json`)).data;
    });
  }
  authorizePlugin(e) {
    return u(this, null, function* () {
      const r = {
        peerId: this.peerId
      }, { token: i } = (yield this.requests.post(`/v2/plugins/authorize/${e}`, r)).data.data;
      return i;
    });
  }
  getPresignedUrls(e, r) {
    return u(this, null, function* () {
      const i = La(this.context, "chat_upload_expiry"), a = {
        roomUUID: this.roomUUID,
        filename: e,
        expiry: typeof i == "number" ? i : void 0
      };
      this.context.getValue("flagsmith").hasFeature(ee.FEAT_CHAT_SDK) && (a.viewType = r);
      const { getLocation: o, putLocation: c } = (yield this.requests.post("/v1/meetings/genPreSignedUploadUrl", a)).data.data;
      return {
        getLocation: o,
        putLocation: c
      };
    });
  }
  uploadFile(e, r) {
    return u(this, null, function* () {
      if (navigator.isReactNative && "uri" in e)
        try {
          yield fetch(r, {
            method: "PUT",
            headers: {
              "Content-Type": "application/octet-stream"
            },
            body: {
              uri: e.uri,
              name: e.name
            }
          });
        } catch (i) {
          this.logger.error(`sendFileMessage::${i}`);
        }
      else
        yield this.fetchClient.put(r, e, {
          headers: {
            "Content-Type": e.type
          }
        });
    });
  }
  // eslint-disable-next-line class-methods-use-this
  startLivestreaming(r) {
    return u(this, arguments, function* ({
      manualIngestion: e
    }) {
      const i = Rs(
        yield this.requests.post(
          `/v2/meetings/${this.context.getValue("meetingId")}/livestreams`,
          {
            manual_ingest: !!e
          }
        )
      ).data.data;
      return {
        playbackUrl: i.playbackUrl,
        status: i.status,
        manualIngest: i.manualIngest,
        ingestionCredentials: i.streamKey ? {
          ingestionServer: i.ingestServer,
          streamKey: i.streamKey
        } : null
      };
    });
  }
  // eslint-disable-next-line class-methods-use-this
  stopLivestreaming() {
    return u(this, null, function* () {
      return this.requests.post(
        `/v2/meetings/${this.context.getValue("meetingId")}/active-livestream/stop`
      );
    });
  }
  getActiveLivestream() {
    return u(this, null, function* () {
      const e = Rs(
        (yield this.requests.get(
          `/v2/meetings/${this.context.getValue("meetingId")}/active-livestream`
        )).data.data
      );
      return {
        playbackUrl: e.playbackUrl,
        status: e.status,
        manualIngest: e.manualIngest,
        ingestionCredentials: e.streamKey ? {
          ingestionServer: e.ingestServer,
          streamKey: e.streamKey
        } : null
      };
    });
  }
  getUserDetails() {
    return u(this, null, function* () {
      if (this.userDetails)
        return this.userDetails;
      const e = (yield this.requests.get("v2/internals/participant-details")).data.data;
      return Rs(e);
    });
  }
  startRecording(e, r) {
    return u(this, null, function* () {
      return (yield this.requests.post("/v2/recordings", H(D({}, Af(e)), {
        meeting_id: this.context.getValue("meetingId"),
        allow_multiple_recordings: !!r
      }))).data.data.id;
    });
  }
  updateRecording(e, r) {
    return u(this, null, function* () {
      return this.requests.put(`v2/recordings/${e}`, {
        action: r
      });
    });
  }
  getActiveRecording() {
    return u(this, null, function* () {
      const { status: e, id: r } = (yield this.requests.get(
        `v2/recordings/active-recording/${this.context.getValue("meetingId")}`
      )).data.data;
      return { status: e, id: r };
    });
  }
  getActiveTranscript() {
    return u(this, null, function* () {
      const { transcript_download_url: e } = (yield this.requests.get(
        `v2/meetings/${this.context.getValue("meetingId")}/active-transcript`
      )).data.data;
      try {
        return { transcript: (yield this.fetchClient.get(e)).data };
      } catch (r) {
        throw new b("Cant fetch transcript s3 url", "1801");
      }
    });
  }
  getRoomNodeData() {
    return u(this, null, function* () {
      const e = yield this.getIPDetails();
      if (this.ipInfo = e, this.roomDetails)
        return this.roomDetails;
      const { title: r } = Rs(
        (yield this.requests.post("v2/internals/rooms", {
          ip_information: e
        })).data.data
      );
      return {
        meetingTitle: r
      };
    });
  }
}
os([
  E.trace("APIClient.getIPDetails")
], jt.prototype, "getIPDetails", 1);
os([
  E.trace("APIClient.getICEServers")
], jt.prototype, "getICEServers", 1);
os([
  E.trace("APIClient.getPlugins")
], jt.prototype, "getPlugins", 1);
os([
  E.trace("APIClient.startLivestreaming")
], jt.prototype, "startLivestreaming", 1);
os([
  E.trace("APIClient.stopLivestreaming")
], jt.prototype, "stopLivestreaming", 1);
os([
  E.trace("APIClient.getActiveLivestream")
], jt.prototype, "getActiveLivestream", 1);
os([
  E.trace("APIClient.getUserDetails")
], jt.prototype, "getUserDetails", 1);
os([
  E.trace("APIClient.startRecording")
], jt.prototype, "startRecording", 1);
os([
  E.trace("APIClient.stopRecording")
], jt.prototype, "updateRecording", 1);
os([
  E.trace("APIClient.getActiveRecording")
], jt.prototype, "getActiveRecording", 1);
os([
  E.trace("APIClient.getActiveTranscript")
], jt.prototype, "getActiveTranscript", 1);
os([
  E.trace("APIClient.getRoomNodeData")
], jt.prototype, "getRoomNodeData", 1);
let Nu;
function QM(s, t) {
  return Nu = new jt(s, t), Nu;
}
function dt() {
  return Nu;
}
function XM(s, t) {
  return `<blockquote>${t.replace(/<blockquote>[.\s\S]*<\/blockquote>\n\n/m, "")}</blockquote>

${s}`;
}
const Fa = {
  maxInvocations: 5,
  period: 1
};
function Mt(s, t) {
  return function(e, r, i) {
    const a = i.value;
    let o = 0, c = Date.now();
    return i.value = function(...d) {
      const l = Date.now(), p = t ? this[t] : s;
      if (l - c > p.period * 1e3 && (c = l, o = 0), o >= p.maxInvocations)
        throw new b(`Method rate limit ${p.maxInvocations} invocations/${p.period}sec exceeded`, "0013");
      return o += 1, a.apply(this, d);
    }, i;
  };
}
var ZM = Object.defineProperty, e0 = Object.getOwnPropertyDescriptor, ht = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? e0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && ZM(t, e, i), i;
};
const t0 = ["text", "image", "file", "custom", "poll"], ud = { maxInvocations: 180, period: 60 };
var Z, fi, $e, Si, vi, Ld, Mf, No, Vu, Ag;
let ze = (Ag = class extends qt {
  constructor(t, e, r, i, a) {
    const o = t.getValue("logger");
    super(o);
    // eslint-disable-next-line class-methods-use-this
    m(this, Ld);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, No);
    /**
     * An array of chat messages.
     */
    h(this, "messages");
    /**
     * An Array of all available channels.
     */
    h(this, "channels", []);
    m(this, Z, void 0);
    m(this, fi, void 0);
    m(this, $e, void 0);
    m(this, Si, void 0);
    m(this, vi, void 0);
    h(this, "maxTextLimit", 2e3);
    f(this, vi, t), f(this, $e, e), f(this, Si, r), f(this, Z, i), f(this, fi, a), this.messages = [];
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, vi).getValue("telemetry");
  }
  /**
  	Set the max character limit of a text message
  */
  setMaxTextLimit(t) {
    this.maxTextLimit = t;
  }
  sendMessageInternal(a, o, c) {
    return u(this, arguments, function* (t, e, r, i = {}) {
      switch (t.type) {
        case "text": {
          const d = i.replyTo && i.replyTo.type === "text" ? XM(t.message, i.replyTo.message) : t.message;
          yield this.sendTextMessageInternal(d, e, r);
          break;
        }
        case "image":
          yield this.sendImageMessageInternal(t.image, e, r);
          break;
        case "file":
          yield this.sendFileMessageInternal(t.file, e, r);
          break;
        default:
          this.logger.error("sendMessage::message_type_not_supported", {
            chat: { messageType: t.type }
          });
          break;
      }
    });
  }
  sendTextMessageInternal(t, e, r) {
    return u(this, null, function* () {
      var a, o, c, d, l, p;
      if (t.length > this.maxTextLimit)
        throw new b("Max character limit breached", "0503");
      if (e && e.length > 0) {
        if (!((a = n(this, Z).permissions) != null && a.chatPrivate.canSend) || !((o = n(this, Z).permissions) != null && o.chatPrivate.text))
          throw this.logger.error("sendTextMessage::private_chat_permission_denied"), new b("Could not send message to private chat.", "0501");
      } else if (!((d = (c = n(this, Z).permissions) == null ? void 0 : c.chatPublic) != null && d.canSend) || !((p = (l = n(this, Z).permissions) == null ? void 0 : l.chatPublic) != null && p.text))
        throw this.logger.error("sendTextMessage::public_chat_permission_denied"), new b("Could not send message to public chat.", "0501");
      if (!t)
        throw this.logger.error("sendTextMessage::message_can_not_be_empty"), new b("Message can not be empty.", "0502");
      if (r) {
        n(this, $e).sendMessageToChannel(t, Et.TEXT, r);
        return;
      }
      let i = [];
      e && e.length > 0 && (e.push(n(this, Z).id), i = n(this, fi).joined.toArray().filter((g) => e.includes(g.id)).map((g) => g.userId), i.push(n(this, Z).userId)), n(this, $e).sendMessage(
        t,
        Et.TEXT,
        e
      );
    });
  }
  sendImageMessageInternal(t, e, r) {
    return u(this, null, function* () {
      var a, o, c, d, l, p;
      if (e && e.length > 0) {
        if (!((a = n(this, Z).permissions) != null && a.chatPrivate.canSend) || !((o = n(this, Z).permissions) != null && o.chatPrivate.files)) {
          this.logger.error("sendImageMessage::private_chat_permission_denied");
          return;
        }
      } else if (!((d = (c = n(this, Z).permissions) == null ? void 0 : c.chatPublic) != null && d.canSend) || !((p = (l = n(this, Z).permissions) == null ? void 0 : l.chatPublic) != null && p.files)) {
        this.logger.error("sendImageMessage::permission_denied");
        return;
      }
      if (!t) {
        this.logger.error("sendImageMessage::required_argument_image_can_not_be_empty");
        return;
      }
      if (!["image/gif", "image/jpeg", "image/png"].includes(t.type)) {
        this.logger.error("sendImageMessage::image_type_not_supported", { chat: { imageType: t.type } });
        return;
      }
      try {
        const g = dt(), { getLocation: S, putLocation: v } = yield g.getPresignedUrls(
          t.name,
          n(this, Z).config.viewType
        );
        if (yield g.uploadFile(t, v), r) {
          n(this, $e).sendMessageToChannel(
            S,
            Et.IMAGE,
            r
          );
          return;
        }
        let _ = [];
        e && e.length > 0 && (e.push(n(this, Z).id), _ = n(this, fi).joined.toArray().filter((P) => e.includes(P.id)).map((P) => P.userId), _.push(n(this, Z).userId)), n(this, $e).sendMessage(
          S,
          Et.IMAGE,
          e
        );
      } catch (g) {
        throw new b("Error sending image message.", "0500", this.logger);
      }
    });
  }
  sendFileMessageInternal(t, e, r) {
    return u(this, null, function* () {
      var i, a, o, c, d, l;
      if (e && e.length > 0) {
        if (!((i = n(this, Z).permissions) != null && i.chatPrivate.canSend) || !((a = n(this, Z).permissions) != null && a.chatPrivate.files)) {
          this.logger.error("sendFileMessage::private_chat_permission_denied");
          return;
        }
      } else if (!((c = (o = n(this, Z).permissions) == null ? void 0 : o.chatPublic) != null && c.canSend) || !((l = (d = n(this, Z).permissions) == null ? void 0 : d.chatPublic) != null && l.files)) {
        this.logger.error("sendFileMessage::permission_denied");
        return;
      }
      if (!t) {
        this.logger.error("sendFileMessage::required_argument_file_can_not_be_empty");
        return;
      }
      try {
        const p = dt(), { getLocation: g, putLocation: S } = yield p.getPresignedUrls(
          t.name,
          n(this, Z).config.viewType
        );
        if (yield p.uploadFile(t, S), r) {
          n(this, $e).sendMessageToChannel(
            JSON.stringify({
              link: g,
              name: t.name,
              size: "size" in t ? t.size : 0
            }),
            Et.FILE,
            r
          );
          return;
        }
        let v = [];
        e && e.length > 0 && (e.push(n(this, Z).id), v = n(this, fi).joined.toArray().filter((P) => e.includes(P.id)).map((P) => P.userId), v.push(n(this, Z).userId));
        const _ = JSON.stringify({
          link: g,
          name: t.name,
          size: "size" in t ? t.size : 0
        });
        n(this, $e).sendMessage(
          _,
          Et.FILE,
          e
        );
      } catch (p) {
        throw new b("Error sending file message.", "0500", this.logger);
      }
    });
  }
  // eslint-disable-next-line class-methods-use-this
  get rateLimits() {
    return ud;
  }
  // eslint-disable-next-line class-methods-use-this
  updateRateLimits(t, e) {
    ud.maxInvocations = t, ud.period = e;
  }
  sendTextMessage(t, e) {
    return u(this, null, function* () {
      return this.sendTextMessageInternal(t, e);
    });
  }
  sendCustomMessage(t, e) {
    return u(this, null, function* () {
      var a, o, c, d, l, p, g, S, v, _, P, C, w, $, F;
      if (e && e.length > 0) {
        if (!((a = n(this, Z).permissions) != null && a.chatPrivate.canSend) || !((o = n(this, Z).permissions) != null && o.chatPrivate.files) || !((c = n(this, Z).permissions) != null && c.chatPrivate.text)) {
          this.logger.error("sendCustomMessage::private_chat_permission_denied");
          return;
        }
      } else if (!((l = (d = n(this, Z).permissions) == null ? void 0 : d.chatPublic) != null && l.canSend) || !((g = (p = n(this, Z).permissions) == null ? void 0 : p.chatPublic) != null && g.files) || !((v = (S = n(this, Z).permissions) == null ? void 0 : S.chatPublic) != null && v.text)) {
        this.logger.error("sendCustomMessage::permission_denied");
        return;
      }
      const r = (N) => u(this, null, function* () {
        try {
          if (typeof N == "string")
            return { link: N };
          const B = dt(), { getLocation: G, putLocation: re } = yield B.getPresignedUrls(
            N.name,
            n(this, Z).config.viewType
          );
          return yield B.uploadFile(N, re), {
            link: G,
            type: N.type,
            name: N.name,
            size: N.size
          };
        } catch (B) {
          throw new b("Error sending image message.", "0500", this.logger);
        }
      }), i = H(D({}, t), {
        files: yield Promise.all((P = (_ = t.files) != null ? _ : []) == null ? void 0 : P.map((N) => u(this, null, function* () {
          return r(N);
        }))),
        images: yield Promise.all((w = (C = t.images) != null ? C : []) == null ? void 0 : w.map((N) => u(this, null, function* () {
          return r(N);
        }))),
        videos: yield Promise.all((F = ($ = t.videos) != null ? $ : []) == null ? void 0 : F.map((N) => u(this, null, function* () {
          return r(N);
        })))
      });
      n(this, $e).sendMessage(
        JSON.stringify(i),
        Et.CUSTOM,
        e
      );
    });
  }
  sendImageMessage(t, e) {
    return u(this, null, function* () {
      return this.sendImageMessageInternal(t, e);
    });
  }
  sendFileMessage(t, e) {
    return u(this, null, function* () {
      return this.sendFileMessageInternal(t, e);
    });
  }
  sendMessage(t, e) {
    return u(this, null, function* () {
      return this.sendMessageInternal(t, e);
    });
  }
  editTextMessage(t, e, r) {
    return u(this, null, function* () {
      var i, a, o, c, d, l;
      if (((a = (i = n(this, Z).permissions) == null ? void 0 : i.chatMessage) == null ? void 0 : a.canEdit) === "NONE")
        throw new b("Not permitted to edit messages", "0501");
      if (!((c = (o = n(this, Z).permissions) == null ? void 0 : o.chatPublic) != null && c.canSend) || !((l = (d = n(this, Z).permissions) == null ? void 0 : d.chatPublic) != null && l.text)) {
        this.logger.error("editTextMessage::permission_denied");
        return;
      }
      if (!e) {
        this.logger.error("editTextMessage::message_can_not_be_empty");
        return;
      }
      n(this, $e).editMessage(
        t,
        e,
        Et.TEXT,
        r
      );
    });
  }
  editImageMessage(t, e, r) {
    return u(this, null, function* () {
      var a, o, c, d;
      if (!((o = (a = n(this, Z).permissions) == null ? void 0 : a.chatPublic) != null && o.canSend) || !((d = (c = n(this, Z).permissions) == null ? void 0 : c.chatPublic) != null && d.files)) {
        this.logger.error("editImageMessage::permission_denied");
        return;
      }
      if (!e) {
        this.logger.error("editImageMessage::required_argument_image_can_not_be_empty");
        return;
      }
      if (!["image/gif", "image/jpeg", "image/png"].includes(e.type)) {
        this.logger.error("sendImageMessage::image_type_not_supported", {
          chat: { imageType: e.type }
        });
        return;
      }
      try {
        const l = dt(), { getLocation: p, putLocation: g } = yield l.getPresignedUrls(e.name, n(this, Z).config.viewType);
        yield l.uploadFile(e, g), n(this, $e).editMessage(
          t,
          p,
          Et.IMAGE,
          r
        );
      } catch (l) {
        throw new b("Error editing image message.", "0500", this.logger);
      }
    });
  }
  editFileMessage(t, e, r) {
    return u(this, null, function* () {
      var i, a, o, c;
      if (!((a = (i = n(this, Z).permissions) == null ? void 0 : i.chatPublic) != null && a.canSend) || !((c = (o = n(this, Z).permissions) == null ? void 0 : o.chatPublic) != null && c.files)) {
        this.logger.error("sendFileMessage::permission_denied");
        return;
      }
      if (!e) {
        this.logger.error("sendFileMessage::required_argument_file_can_not_be_empty");
        return;
      }
      try {
        const d = dt(), { getLocation: l, putLocation: p } = yield d.getPresignedUrls(
          e.name,
          n(this, Z).config.viewType
        );
        yield d.uploadFile(e, p), n(this, $e).editMessage(
          t,
          JSON.stringify({
            link: l,
            name: e.name,
            size: "size" in e ? e.size : 0
          }),
          Et.FILE,
          r
        );
      } catch (d) {
        throw new b("Error editing file message.", "0500", this.logger);
      }
    });
  }
  editMessage(t, e, r) {
    return u(this, null, function* () {
      switch (e.type) {
        case "text": {
          this.editTextMessage(t, e.message, r);
          break;
        }
        case "image": {
          this.editImageMessage(t, e.image, r);
          break;
        }
        case "file": {
          this.editFileMessage(t, e.file, r);
          break;
        }
        default: {
          this.logger.error("editMessage::message_type_not_supported", {
            chat: { messageType: e.type }
          });
          break;
        }
      }
    });
  }
  deleteMessage(t, e) {
    return u(this, null, function* () {
      var r, i;
      if (((i = (r = n(this, Z).permissions) == null ? void 0 : r.chatMessage) == null ? void 0 : i.canDelete) === "NONE")
        throw new b("Not permitted to delete messages", "0501");
      n(this, $e).deleteMessage(t, e);
    });
  }
  /**
   * Returns an array of messages sent by a specific userId.
   * @param userId The user id of the user that sent the message.
   */
  getMessagesByUser(t) {
    return this.messages.filter((e) => e.userId === t);
  }
  /**
   * Returns an array of 'text', 'image' or 'file' messages.
   * @param type 'text', 'image', or 'file'.
   */
  getMessagesByType(t) {
    return this.messages.filter((e) => e.type === t);
  }
  /**
   * Pins a chat message
   * @param id ID of the message to be pinned
   */
  pin(t) {
    return u(this, null, function* () {
      if (!n(this, No, Vu))
        throw new b("Can`t pin message without joining room", "0505");
      if (!n(this, Z).permissions.pinParticipant)
        throw new b("You do not have permission to pin messages.", "0501");
      const e = this.messages.find((r) => r.id === t);
      if (e) {
        n(this, $e).setPinState(e, !0);
        return;
      }
      throw new b(`No message found with id: ${t}`, "0504");
    });
  }
  /**
   * Unpins a chat message
   * @param id ID of the message to be unpinned
   */
  unpin(t) {
    return u(this, null, function* () {
      if (!n(this, No, Vu))
        throw new b("Can`t unpin message without joining room", "0505");
      if (!n(this, Z).permissions.pinParticipant)
        throw new b("You do not have permission to unpin messages.", "0501");
      const e = this.messages.find((r) => r.id === t);
      if (e) {
        n(this, $e).setPinState(e, !1);
        return;
      }
      throw new b(`No message found with id: ${t}`, "0504");
    });
  }
  /**
   * Gets chat messages in a paginated manner
   */
  getMessages(t, e, r, i = 0, a = void 0) {
    return u(this, null, function* () {
      const o = yield n(this, $e).getChatMessagesPaginated(t, e, r, i, a);
      return {
        messages: o.messages.map(
          (c) => ws.formatSocketPeerMessage(c)
        ),
        next: o.next
      };
    });
  }
  createChannel(i, a) {
    return u(this, arguments, function* (t, e, r = {}) {
      var l;
      const o = (l = n(this, Z).permissions) == null ? void 0 : l.chatChannel;
      if (o) {
        if (o.canCreate === "NONE")
          throw new b("Not permitted to create channels", "0501");
        if (r.visibility === "public" && !(o.canCreate === "PUBLIC" || o.canCreate === "ALL"))
          throw new b("Not permitted to create public channels", "0501");
        if (r.visibility === "private" && !(o.canCreate === "PRIVATE" || o.canCreate === "ALL"))
          throw new b("Not permitted to create private channels", "0501");
      }
      if (!t || t.trim().length === 0)
        throw new b("channel name cannot be empty.", "0510");
      const c = [.../* @__PURE__ */ new Set([...e, n(this, Z).userId])];
      return yield n(this, Si).createChannel(
        t.trim(),
        c,
        r.displayPictureUrl,
        r.visibility,
        r.isDirectMessage
      );
    });
  }
  updateChannel(t, e) {
    var o, c, d, l, p;
    const r = this.channels.find((g) => g.id === t), i = (o = n(this, Z).permissions) == null ? void 0 : o.chatChannel;
    if (i) {
      if (i.canUpdate === "NONE")
        throw new b("Not permitted to update channels", "0501");
      if (r.visibility === "public" && !(i.canUpdate === "PUBLIC" || i.canUpdate === "ALL"))
        throw new b("Not permitted to update public channels", "0501");
      if (r.visibility === "private" && !(i.canUpdate === "PRIVATE" || i.canUpdate === "ALL"))
        throw new b("Not permitted to update private channels", "0501");
    }
    const a = {
      memberIds: (c = e.memberIds) != null ? c : r.memberIds,
      displayName: (d = e.displayName) != null ? d : r.displayName,
      displayPictureUrl: (l = e.displayPictureUrl) != null ? l : r.displayPictureUrl,
      visibility: (p = e.visibility) != null ? p : r.visibility
    };
    return n(this, Si).updateChannel(t, a);
  }
  sendMessageToChannel(i, a) {
    return u(this, arguments, function* (t, e, r = {}) {
      return this.sendMessageInternal(t, null, e, r);
    });
  }
  getChannelMembers(t) {
    return u(this, null, function* () {
      return n(this, Si).getChannelMembers(t);
    });
  }
  searchMessages(r) {
    return u(this, arguments, function* (t, e = {}) {
      if (!n(this, vi).getValue("flagsmith").hasFeature(ee.FEAT_CHAT_SDK_SEARCH))
        throw new b("searchMessages is temporarily disabled!", "0506");
      return (yield n(this, $e).searchMessages(t, e)).map(ws.formatSocketPeerMessage);
    });
  }
  markLastReadMessage(t, e) {
    return u(this, null, function* () {
      yield n(this, $e).markLastReadMessage(t, e);
      const r = this.channels.find((i) => i.id === t);
      if (r) {
        const i = H(D({}, r), { unreadCount: 0 });
        this.channels = this.channels.map((a) => a.id === t ? i : a), this.emit("channelMessageUpdate", i);
      }
    });
  }
  /**
   * Returns an array of pinned messages.
   */
  get pinned() {
    return this.messages.filter((t) => t.pinned);
  }
}, Z = new WeakMap(), fi = new WeakMap(), $e = new WeakMap(), Si = new WeakMap(), vi = new WeakMap(), Ld = new WeakSet(), Mf = function() {
  return n(this, vi).getValue("connectionHandler");
}, No = new WeakSet(), Vu = function() {
  return n(this, Ld, Mf).socketJoined === !0;
}, Ag);
ht([
  E.trace("Chat.sendTextMessage"),
  Mt(ud)
], ze.prototype, "sendTextMessage", 1);
ht([
  E.trace("Chat.sendImageMessage"),
  Mt({ maxInvocations: 20, period: 60 })
], ze.prototype, "sendImageMessage", 1);
ht([
  E.trace("Chat.sendFileMessage"),
  Mt({ maxInvocations: 20, period: 60 })
], ze.prototype, "sendFileMessage", 1);
ht([
  E.trace("Chat.sendMessage"),
  Mt({ maxInvocations: 180, period: 60 })
], ze.prototype, "sendMessage", 1);
ht([
  E.trace("Chat.editTextMessage")
], ze.prototype, "editTextMessage", 1);
ht([
  E.trace("Chat.editImageMessage")
], ze.prototype, "editImageMessage", 1);
ht([
  E.trace("Chat.editFileMessage")
], ze.prototype, "editFileMessage", 1);
ht([
  E.trace("Chat.editMessage")
], ze.prototype, "editMessage", 1);
ht([
  E.trace("Chat.deleteMessage")
], ze.prototype, "deleteMessage", 1);
ht([
  E.trace("Chat.createChannel")
], ze.prototype, "createChannel", 1);
ht([
  E.trace("Chat.updateChannel")
], ze.prototype, "updateChannel", 1);
ht([
  E.trace("Chat.sendMessageToChannel")
], ze.prototype, "sendMessageToChannel", 1);
ht([
  E.trace("Chat.getChannelMembers")
], ze.prototype, "getChannelMembers", 1);
ht([
  E.trace("Chat.searchMessages")
], ze.prototype, "searchMessages", 1);
ht([
  E.trace("Chat.markLastReadMessage")
], ze.prototype, "markLastReadMessage", 1);
ze = ht([
  ut("0500")
], ze);
var s0 = Object.defineProperty, r0 = Object.getOwnPropertyDescriptor, i0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? r0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && s0(t, e, i), i;
}, Dr, Mg;
const ai = (Mg = class {
  constructor(s, t, e, r, i) {
    h(this, "chat");
    h(this, "chatSocketHandler");
    h(this, "chatChannelSocketHandler");
    h(this, "self");
    m(this, Dr, void 0);
    f(this, Dr, s), this.chatSocketHandler = t, this.chatChannelSocketHandler = e, this.chat = new ze(
      s,
      t,
      e,
      r,
      i
    ), this.self = r, this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Dr).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Dr).getValue("logger");
  }
  static init(s, t, e, r, i) {
    return u(this, null, function* () {
      return new ai(
        s,
        t,
        e,
        r,
        i
      );
    });
  }
  static formatMessage(s) {
    return H(D({}, s), {
      time: new Date(s.time),
      type: t0[s.type]
    });
  }
  /**
   * @access private
   * This function formates the chat message coming from
   * socket service. This is not meant for external use.
   */
  static formatSocketPeerMessage(s) {
    const t = s.createdAt * 1e3, e = {
      displayName: s.displayName,
      id: s.chatId,
      time: t,
      timeMs: s.createdAtMs,
      type: s.payloadType,
      isEdited: s.isEdited,
      userId: s.userId,
      targetUserIds: s.targetUserIds,
      channelId: s.channelId,
      channelIndex: s.channelIndex,
      message: "",
      link: "",
      name: "",
      html: "",
      images: [],
      videos: [],
      files: [],
      size: 0,
      pinned: s.pinned
    };
    switch (e.type) {
      case Et.TEXT: {
        e.message = s.payload;
        break;
      }
      case Et.IMAGE: {
        e.link = s.payload;
        break;
      }
      case Et.FILE: {
        const { link: r, name: i, size: a } = JSON.parse(s.payload);
        e.link = r, e.name = i, e.size = a;
        break;
      }
      case Et.CUSTOM: {
        const {
          html: r,
          images: i,
          message: a,
          videos: o,
          files: c
        } = JSON.parse(s.payload);
        e.message = a, e.html = r, e.images = i, e.videos = o, e.files = c;
        break;
      }
    }
    return ai.formatMessage(e);
  }
  getChatMessages() {
    return u(this, null, function* () {
      if (this.self.config.viewType === "LIVESTREAM" || this.self.config.viewType === "CHAT" || n(this, Dr).getValue("flagsmith").hasFeature(ee.FEAT_PAGINATED_CHAT))
        return;
      const s = yield this.chatSocketHandler.getChatMessages();
      if (!(s != null && s.payload))
        return;
      const t = Rf.fromBinary(
        s.payload
      ).messages;
      this.chat.messages = t.map(
        (e) => ai.formatSocketPeerMessage(e)
      );
    });
  }
  setupEvents() {
    n(this, Dr).getValue("peerSessionStore").on(
      k.SOCKET_SERVICE_ROOM_JOINED,
      () => u(this, null, function* () {
        this.getChatMessages();
      })
    ), this.chatSocketHandler.on(
      Re.sendMessageToRoom,
      (s) => {
        const t = ai.formatSocketPeerMessage(
          s.message
        );
        if (!t.channelId)
          this.chat.messages = [...this.chat.messages, t];
        else {
          const e = this.chat.channels.find((r) => r.id === t.channelId);
          e && (e.latestMessage = t, e.unreadCount += 1, this.chat.emit("channelMessageUpdate", e));
        }
        this.chat.emit("chatUpdate", {
          action: "add",
          message: t,
          messages: this.chat.messages
        });
      }
    ), this.chatSocketHandler.on(
      Re.sendMessageToPeers,
      (s) => {
        const t = ai.formatSocketPeerMessage(
          s.message
        );
        this.chat.messages = [...this.chat.messages, t], this.chat.emit("chatUpdate", {
          action: "add",
          message: t,
          messages: this.chat.messages
        });
      }
    ), this.chatSocketHandler.on(
      Re.editMessage,
      (s) => {
        const t = ai.formatSocketPeerMessage(
          s.message
        );
        if (t.channelId) {
          this.chat.emit("chatUpdate", {
            action: "edit",
            message: t,
            messages: this.chat.messages
          });
          return;
        }
        const e = this.chat.messages.findIndex((r) => r.id === t.id);
        e !== -1 && (this.chat.messages[e] = t, this.chat.emit("chatUpdate", {
          action: "edit",
          message: t,
          messages: this.chat.messages
        }));
      }
    ), this.chatSocketHandler.on(
      Re.deleteMessage,
      (s) => {
        if (s.channelId) {
          this.chat.emit("chatUpdate", {
            action: "delete",
            message: { id: s.chatId, channelId: s.channelId },
            messages: this.chat.messages
          });
          return;
        }
        const t = this.chat.messages.findIndex((r) => r.id === s.chatId);
        if (t === -1)
          return;
        const [e] = this.chat.messages.splice(t, 1);
        this.chat.emit("chatUpdate", {
          action: "delete",
          message: e,
          messages: this.chat.messages
        });
      }
    ), this.chatChannelSocketHandler.on(
      ui.createChatChannel,
      (s) => {
        const [t] = s.chatChannels, e = on.formatChannel(t);
        this.chat.channels.push(e), this.chat.emit("channelCreate", e);
      }
    ), this.chatSocketHandler.on(
      Re.pinMessage,
      (s) => {
        const t = this.chat.messages.findIndex((r) => r.id === s.chatId);
        if (t === -1)
          return;
        const e = this.chat.messages[t];
        e.pinned = s.pinned, this.chat.messages[t] = e, this.chat.emit("chatUpdate", {
          action: "edit",
          message: e,
          messages: this.chat.messages
        });
      }
    ), this.chatChannelSocketHandler.on(
      ui.updateChatChannel,
      (s) => {
        const [t] = s.chatChannels, e = on.formatChannel(t);
        this.chat.channels = this.chat.channels.map((r) => r.id === e.id ? e : r), this.chat.emit("channelUpdate", e);
      }
    );
  }
}, Dr = new WeakMap(), Mg);
let ws = ai;
i0([
  E.trace("ChatController.setupEvents")
], ws.prototype, "setupEvents", 1);
var n0 = Object.defineProperty, a0 = Object.getOwnPropertyDescriptor, o0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? a0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && n0(t, e, i), i;
}, xd, Df, Ud, Of, Un, $n, Vo, Dg;
let Lu = (Dg = class extends qt {
  constructor(t, e, r) {
    const i = t.getValue("logger");
    super(i);
    // eslint-disable-next-line class-methods-use-this
    m(this, xd);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, Ud);
    /**
     * An array of poll items.
     */
    h(this, "items");
    m(this, Un, void 0);
    m(this, $n, void 0);
    m(this, Vo, void 0);
    f(this, Vo, t), f(this, Un, e), f(this, $n, r), this.items = [];
  }
  /**
   * Creates a poll in the meeting.
   * @param question The question that is to be voted for.
   * @param options The options of the poll.
   * @param anonymous If true, the poll votes are anonymous.
   * @param hideVotes If true, the votes on the poll are hidden.
   */
  create(t, e, r = !1, i = !1) {
    return u(this, null, function* () {
      if (!n(this, Ud, Of))
        throw new b("Can't create polls without joining room", "0705");
      if (!n(this, Un).permissions.polls.canCreate) {
        this.logger.error("Polls::create::permission_denied");
        return;
      }
      if (!t || !e) {
        this.logger.error("Polls::question_and_options_can_not_be_empty", {
          polls: {
            hasQuestion: !!t,
            optionsLength: e == null ? void 0 : e.length
          }
        });
        return;
      }
      if (e.length < 2) {
        this.logger.error("Polls::there_must_be_at_least_two_options", {
          polls: { hasQuestion: !!t, optionsLength: e.length }
        });
        return;
      }
      yield n(this, $n).createPoll(
        t,
        e,
        r,
        i
      );
    });
  }
  /**
   * Casts a vote on an existing poll.
   * @param pollId The ID of the poll that is to be voted on.
   * @param index The index of the option.
   */
  vote(t, e) {
    return u(this, null, function* () {
      if (!n(this, Un).permissions.polls.canVote) {
        this.logger.error("Polls::vote::permission_denied");
        return;
      }
      yield n(this, $n).votePoll(t, e);
    });
  }
}, xd = new WeakSet(), Df = function() {
  return n(this, Vo).getValue("connectionHandler");
}, Ud = new WeakSet(), Of = function() {
  var t;
  return ((t = n(this, xd, Df)) == null ? void 0 : t.socketJoined) === !0;
}, Un = new WeakMap(), $n = new WeakMap(), Vo = new WeakMap(), Dg);
Lu = o0([
  ut("0700")
], Lu);
var c0 = Object.defineProperty, d0 = Object.getOwnPropertyDescriptor, l0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? d0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && c0(t, e, i), i;
}, Or, Fn, Ti, Og;
const vn = (Og = class {
  constructor(s, t, e) {
    h(this, "polls");
    m(this, Or, void 0);
    m(this, Fn, void 0);
    m(this, Ti, void 0);
    this.polls = new Lu(s, t, e), f(this, Fn, t), f(this, Or, s), f(this, Ti, e), this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Or).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Or).getValue("logger");
  }
  static init(s, t, e) {
    return u(this, null, function* () {
      return new vn(s, t, e);
    });
  }
  canViewPolls() {
    return n(this, Fn).permissions.polls.canView;
  }
  setupEvents() {
    const s = {
      [Ws.createPoll]: (r) => {
        r.poll && this.updatePoll(vn.formatSocketServicePoll(r.poll));
      },
      [Ws.updatePoll]: (r) => {
        r.poll && this.updatePoll(vn.formatSocketServicePoll(r.poll));
      },
      [Ws.votePoll]: (r) => {
        r.poll && this.updatePoll(vn.formatSocketServicePoll(r.poll));
      }
    }, t = () => {
      n(this, Or).getValue("peerSessionStore").on(k.SOCKET_SERVICE_ROOM_JOINED, () => {
        this.getPolls();
      }), Object.keys(s).map(Number).forEach((r) => {
        n(this, Ti).on(r, s[r]);
      });
    }, e = () => {
      n(this, Or).getValue("peerSessionStore").on(k.SOCKET_SERVICE_ROOM_JOINED, () => {
        this.getPolls();
      }), Object.keys(s).map(Number).forEach((r) => {
        n(this, Ti).removeListeners(r);
      });
    };
    n(this, Fn).permissions.on("permissionsUpdate", (r) => u(this, null, function* () {
      var i;
      r != null && r.polls && ((i = r == null ? void 0 : r.polls) != null && i.canView ? (yield this.getPolls(), t()) : (this.polls.items = [], e()));
    })), this.canViewPolls() && t();
  }
  updatePoll(s) {
    if (!this.canViewPolls())
      return;
    const t = this.polls.items.findIndex((e) => e.id === s.id);
    if (t > -1) {
      const e = JSON.stringify(this.polls.items[t]);
      this.polls.items[t] = s, e !== JSON.stringify(s) && this.polls.emit("pollsUpdate", {
        polls: this.polls.items,
        newPoll: !1
      });
      return;
    }
    this.polls.items = [...this.polls.items, s], this.polls.emit("pollsUpdate", { polls: this.polls.items, newPoll: !0 });
  }
  getPolls() {
    return u(this, null, function* () {
      const s = yield n(this, Ti).getPolls();
      if (!(s != null && s.payload))
        return;
      const { polls: t } = EM.fromBinary(s.payload);
      this.polls.items = t.map(
        (e) => vn.formatSocketServicePoll(e)
      );
    });
  }
  static formatSocketServicePoll(s) {
    const t = s.options.map((e) => ({
      count: e.count,
      text: e.text,
      votes: e.votes.map((r) => ({
        id: r.userId,
        name: r.name
      }))
    }));
    return {
      anonymous: s.anonymous,
      createdBy: s.createdBy,
      createdByUserId: s.createdByUserId,
      hideVotes: s.hideVotes,
      id: s.pollId,
      options: t,
      question: s.question,
      voted: s.votes
    };
  }
}, Or = new WeakMap(), Fn = new WeakMap(), Ti = new WeakMap(), Og);
let Nf = vn;
l0([
  E.trace("PollController.setupEvents")
], Nf.prototype, "setupEvents", 1);
var u0 = Object.defineProperty, h0 = Object.getOwnPropertyDescriptor, p0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? h0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && u0(t, e, i), i;
}, Vf = /* @__PURE__ */ ((s) => (s[s.User = 0] = "User", s[s.Meeting = 1] = "Meeting", s))(Vf || {}), Bn, Lo, Uu, yi, xo, Ng;
let xu = (Ng = class extends qt {
  constructor(t, e, r, i, a) {
    const o = t.getValue("logger");
    super(o);
    m(this, Lo);
    /**
     *	Represents the current active tab
    */
    h(this, "selfActiveTab");
    /**
     * Represents whether current user is spotlighted
    */
    h(this, "broadcastTabChanges");
    m(this, Bn, void 0);
    m(this, yi, void 0);
    m(this, xo, void 0);
    /**
     * The `viewType` tells the type of the meeting
     * possible values are: GROUP_CALL| LIVESTREAM | CHAT | AUDIO_ROOM
     */
    h(this, "viewType");
    /**
     * The timestamp of the time when the meeting started.
     */
    h(this, "meetingStartedTimestamp");
    /**
     * The title of the meeting.
     */
    h(this, "meetingTitle");
    /**
     * (Experimental) The sessionId this meeting object is part of.
     */
    h(this, "sessionId");
    f(this, Bn, t), f(this, yi, e), this.viewType = r, f(this, xo, i), this.meetingTitle = a, this.broadcastTabChanges = e.permissions.canSpotlight;
  }
  get socketState() {
    return n(this, Lo, Uu).socketState;
  }
  get mediaState() {
    return n(this, Lo, Uu).mediaState;
  }
  /**
   * The room name of the meeting.
   */
  get meetingId() {
    return n(this, Bn).getValue("meetingId");
  }
  /**
   * Sets current user as broadcasting tab changes
   * @param broadcastTabChanges
   */
  setBroadcastTabChanges(t) {
    if (!n(this, yi).permissions.canSpotlight)
      throw this.logger.error("Spotlight::setSpotlighted::permission_denied"), new b("User does not have permission to toggle spotlight", "0801");
    this.broadcastTabChanges = t, this.emit("broadcastTabChangesUpdate", this.broadcastTabChanges), this.broadcastTabChanges && this.assertActiveTabToRoom();
  }
  /**
   * Sets current active tab for user
   * @param spotlightTab
   */
  setSelfActiveTab(t, e) {
    var r;
    this.logger.info("Spotlight::setActiveTab", {
      spotlight: {
        currentTab: {
          id: t.id,
          type: t.type
        }
      }
    }), this.selfActiveTab = t, e === 0 && this.emit("selfTabUpdate", t), (r = n(this, yi).permissions) != null && r.canSpotlight && this.broadcastTabChanges && e === 0 && this.assertActiveTabToRoom();
  }
  assertActiveTabToRoom() {
    n(this, xo).broadcastMessage("spotlight", {
      userId: n(this, yi).userId,
      currentTab: this.selfActiveTab
    });
  }
}, Bn = new WeakMap(), Lo = new WeakSet(), Uu = function() {
  return n(this, Bn).getValue("connectionHandler");
}, yi = new WeakMap(), xo = new WeakMap(), Ng);
xu = p0([
  ut("0800")
], xu);
function g0(s) {
  let t = "", e = [""];
  const r = [e];
  let i = 0, a = 0, o = !0, c;
  for (c of s)
    c === '"' ? (o && c === t && (e[i] += c), o = !o) : c === "," && o ? c = e[++i] = "" : c === `
` && o ? (t === "\r" && (e[i] = e[i].slice(0, -1)), e = r[++a] = [c = ""], i = 0) : e[i] += c, t = c;
  return r;
}
var m0 = Object.defineProperty, f0 = Object.getOwnPropertyDescriptor, Lf = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? f0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && m0(t, e, i), i;
}, Uo, Vg;
let ei = (Vg = class extends qt {
  constructor(t) {
    const e = t.getValue("logger");
    super(e);
    h(this, "transcripts");
    m(this, Uo, void 0);
    f(this, Uo, t), this.transcripts = [];
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Uo).getValue("telemetry");
  }
  static init(t, e) {
    return u(this, null, function* () {
      const r = new ei(t), i = t.getValue("logger");
      try {
        e && r.getActiveTranscript();
      } catch (a) {
        i.error("Error fetching active transcriptions ", a);
      }
      return r;
    });
  }
  /**
  * Parse a single line transcript
  */
  static parseTranscript(t, e = !1) {
    if (!t)
      return;
    const [[
      r,
      i,
      a,
      o,
      c,
      d
    ]] = g0(t);
    return {
      id: nn(),
      name: c,
      peerId: i,
      userId: a,
      customParticipantId: o,
      transcript: d,
      isPartialTranscript: e,
      date: new Date(parseInt(r, 10) * 1e3)
    };
  }
  /**
  * Parse a multi-line transcript
  */
  static parseTranscripts(t) {
    return t ? t.split(`
`).map((e) => ei.parseTranscript(e, !1)).filter(Boolean) : [];
  }
  getActiveTranscript() {
    return u(this, null, function* () {
      try {
        const t = dt(), { transcript: e } = yield t.getActiveTranscript();
        this.transcripts = ei.parseTranscripts(e);
      } catch (t) {
      }
    });
  }
  onTranscript(t) {
    return u(this, null, function* () {
      var r;
      const e = this.transcripts.filter(({ peerId: i }) => i === t.peerId);
      if ((r = e == null ? void 0 : e.at(-1)) != null && r.isPartialTranscript) {
        const i = e.at(-1);
        i.transcript = t.transcript, i.isPartialTranscript = t.isPartialTranscript, this.emit("transcript", i);
        return;
      }
      this.transcripts = [...this.transcripts, t], this.emit("transcript", t);
    });
  }
}, Uo = new WeakMap(), Vg);
Lf([
  E.trace("Ai.getActiveTranscript")
], ei.prototype, "getActiveTranscript", 1);
ei = Lf([
  ut("0000")
], ei);
var S0 = Object.defineProperty, v0 = Object.getOwnPropertyDescriptor, T0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? v0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && S0(t, e, i), i;
}, Nr, Hn, Lt, Lg;
const xf = (Lg = class {
  constructor(s, t, e, r, i, a) {
    h(this, "meta");
    h(this, "ai");
    m(this, Nr, void 0);
    m(this, Hn, void 0);
    h(this, "aiSocketHandler");
    m(this, Lt, void 0);
    f(this, Lt, s), this.meta = new xu(
      s,
      t,
      t.config.viewType,
      e,
      a
    ), this.ai = r, f(this, Nr, t), f(this, Hn, e), this.aiSocketHandler = i, t.config.viewType !== At.Chat && this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Lt).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Lt).getValue("logger");
  }
  /**
   *
   */
  static init(s, t, e, r, i) {
    return u(this, null, function* () {
      const a = yield ei.init(s, t.permissions.transcriptionEnabled);
      return new xf(
        s,
        t,
        e,
        a,
        r,
        i
      );
    });
  }
  conditionallySetActiveTab(s) {
    var t;
    s != null && s.currentTab && ((t = this.meta.selfActiveTab) == null ? void 0 : t.id) !== s.currentTab.id && (this.meta.setSelfActiveTab(
      s.currentTab,
      Vf.Meeting
    ), this.meta.emit(
      "activeTabUpdate",
      s.currentTab
    ));
  }
  setupEvents() {
    n(this, Lt).getValue("peerSessionStore").on(
      k.TRANSPORT_STATE_UPDATE,
      (s) => {
        this.meta.emit("mediaConnectionUpdate", s);
      }
    ), n(this, Lt).getValue("peerSessionStore").on(
      k.SOCKET_STATE_UPDATE,
      (s) => {
        this.meta.emit("socketConnectionUpdate", s);
      }
    ), n(this, Lt).getValue("peerSessionStore").on(k.ROOM_STATE, ({ createdAt: s, roomUuid: t }) => {
      const e = this.meta.meetingStartedTimestamp;
      if (t && (this.meta.sessionId = t), s && !e) {
        const r = new Date(s * 1e3);
        this.meta.meetingStartedTimestamp = r, this.meta.emit("meetingStartTimeUpdate", {
          meetingStartedTimestamp: this.meta.meetingStartedTimestamp
        });
      }
    }), n(this, Lt).getValue("peerSessionStore").on(
      k.PRODUCER_SCORE_UPDATE,
      ({ score: s }) => {
        s < 5 && this.meta.emit("poorConnection", { score: s });
      }
    ), n(this, Nr).permissions.canSpotlight && (this.logger.info("MetaController::Asserting Spotlight"), this.meta.selfActiveTab && n(this, Hn).broadcastMessage("spotlight", {
      userId: n(this, Nr).userId,
      currentTab: this.meta.selfActiveTab
    })), n(this, Lt).getValue("peerSessionStore").on(
      k.PEER_JOINED_INTERNAL,
      (s) => u(this, null, function* () {
        n(this, Nr).permissions.canSpotlight && this.meta.selfActiveTab && n(this, Hn).broadcastToPeers("spotlight", [s.id], {
          userId: n(this, Nr).userId,
          currentTab: this.meta.selfActiveTab
        });
      })
    ), n(this, Lt).getValue("peerSessionStore").on(
      k.ROOM_MESSAGE,
      (s) => {
        var e, r;
        let t;
        if ("type" in s) {
          if (s.type !== "spotlight")
            return;
          t = D(D({}, s), s.payload);
        } else if ("roomMessageType" in s) {
          if (s.roomMessageType !== "spotlight")
            return;
          t = s;
        } else
          return;
        this.logger.info("Spotlight Assertion Received", {
          spotlight: {
            spotlighter: { id: t.userId },
            currentTab: {
              id: (e = t.currentTab) == null ? void 0 : e.id,
              type: (r = t.currentTab) == null ? void 0 : r.type
            }
          }
        }), this.conditionallySetActiveTab(t);
      }
    ), n(this, Lt).getValue("peerSessionStore").on(
      k.MESSAGE,
      (s) => {
        var e, r;
        let t;
        if ("type" in s) {
          if (s.type !== "spotlight")
            return;
          t = D(D({}, s), s.payload);
        } else if ("roomMessageType" in s) {
          if (s.roomMessageType !== "spotlight")
            return;
          t = s;
        } else
          return;
        this.logger.info("Spotlight Assertion Received", {
          spotlight: {
            spotlighter: { id: t.userId },
            currentTab: {
              id: (e = t.currentTab) == null ? void 0 : e.id,
              type: (r = t.currentTab) == null ? void 0 : r.type
            }
          }
        }), this.conditionallySetActiveTab(t);
      }
    ), this.aiSocketHandler.on(U.transcript, (s) => {
      const {
        meetingId: t,
        transcript: e,
        isPartial: r
      } = s;
      let i;
      try {
        i = ei.parseTranscript(e, r);
      } catch (d) {
        this.logger.error(`Failed to parse transcript: ${e}`, d);
      }
      if (!i) {
        this.logger.warn("Received empty transcript data");
        return;
      }
      this.ai.onTranscript(i), this.meta.emit("transcript", i);
      const { peerId: a, name: o, transcript: c } = i;
      this.logger.debug(`${t} Received transcript for peer ${a} - ${o}: ${c}`);
    });
  }
}, Nr = new WeakMap(), Hn = new WeakMap(), Lt = new WeakMap(), Lg);
let Uf = xf;
T0([
  E.trace("MetaController.setupEvents")
], Uf.prototype, "setupEvents", 1);
const co = {}, _r = {
  /**
   * Lock a method to prevent concurrency
   * @param config - configuration for the lock
   * @param config.methodName - config.methodName Name of method to expose in logs
   *	and to the user (if necessary).
   * @param config.lockName - Unique string to differentiate the method from others.
   * @param config.timeout - Release lock in given milliseconds if method doesn't get resolved.
   *
   *	Do not use common function names such as joinRoom as the lockName,
   *	instead use filename.functionname, if a suitable name couldn't be found.
   * @returns locked instance.
   *
   * It will throw error with name `UnsupportedConcurrentMethodExecution`,
   *	if lock couldn't be acquired.
   *
   * Note:
   *	Make sure that the methodName is explanatory on its own, if exposed to end users.
   * Eg: `meeting.joinRoom` is a much better choice than `joinRoom`.
   */
  executeWithLock({
    methodName: s,
    lockName: t,
    timeout: e
  }) {
    return (r, i, a) => {
      const o = a.value;
      return a.value = function(...d) {
        var _, P;
        const l = (P = (this == null ? void 0 : this.peerId) || ((_ = d[0]) == null ? void 0 : _.authToken)) != null ? P : "", p = `${t}-${l}`, g = this == null ? void 0 : this.logger;
        if (co[p]) {
          const C = new Error(
            `Unsupported concurrent calls on method: ${s}.`
          );
          throw C.name = "UnsupportedConcurrentMethodExecution", g == null || g.error("Locker::UnsupportedConcurrentMethodExecution", {
            error: {
              stack: C.stack
            },
            locker: {
              methodName: s,
              lockName: p
            }
          }), C;
        }
        co[p] = !0;
        const S = setTimeout(
          () => delete co[p],
          e
        ), v = o.apply(this, d);
        return Promise.resolve(v).then(() => {
          delete co[p], clearTimeout(S);
        }).catch(() => {
          delete co[p], clearTimeout(S);
        }), v;
      }, a;
    };
  }
};
var y0 = Object.defineProperty, E0 = Object.getOwnPropertyDescriptor, pn = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? E0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && y0(t, e, i), i;
}, Yt, $d, ie, $o, Ds, We, Fo, $u, qn, hd;
class si extends qt {
  constructor(e, r, i, a, o) {
    const c = e.getValue("logger");
    super(c);
    // eslint-disable-next-line class-methods-use-this
    m(this, Fo);
    m(this, qn);
    m(this, Yt, void 0);
    m(this, $d, void 0);
    m(this, ie, void 0);
    m(this, $o, void 0);
    m(this, Ds, void 0);
    m(this, We, void 0);
    f(this, We, e), f(this, Yt, a), f(this, $d, o), f(this, ie, r), f(this, $o, i), f(this, Ds, []), this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, We).getValue("telemetry");
  }
  get status() {
    return n(this, We).getValue("stageStatus");
  }
  setupEvents() {
    const e = {
      /**
       * NOTE(ishita1805): Update stageRequests when socket sends them.
       */
      [k.GET_STAGE_REQUESTS]: (a) => u(this, null, function* () {
        f(this, Ds, a);
      }),
      /**
       * NOTE(ishita1805): Update stageRequests when a peer
       * who has requested leaves/joins the meeting
       */
      [k.UPDATE_STAGE_REQUESTS]: (o) => u(this, [o], function* ({ add: a }) {
        const c = n(this, Ds).length, { stageRequests: d } = this.getAccessRequests();
        (a || d.length > c) && this.emit("newStageRequest", { count: d.length }), this.emit("stageAccessRequestUpdate", d);
      })
    }, r = () => {
      Object.entries(e).forEach(([a, o]) => {
        n(this, We).getValue("peerSessionStore").onAsync(
          a,
          o
        );
      });
    }, i = () => {
      Object.entries(e).forEach(([a, o]) => {
        n(this, We).getValue("peerSessionStore").removeListener(
          a,
          o
        );
      });
    };
    n(this, ie).permissions.on("permissionsUpdate", (a) => {
      const { canAcceptProductionRequests: o } = a;
      o !== void 0 && (n(this, ie).permissions.acceptStageRequests ? (r(), n(this, Yt).getStageRequests()) : (i(), f(this, Ds, []), this.emit("stageAccessRequestUpdate", n(this, Ds))));
    }), n(this, ie).permissions.acceptStageRequests && r();
  }
  getAccessRequests() {
    if (!n(this, ie).permissions.stageEnabled)
      throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
    if (!n(this, ie).permissions.acceptStageRequests)
      throw this.logger.error("Stage::get_access_request::permission_denied"), new b("You do not have permission to perform this action", "2001");
    const e = n(this, $o).joined.toArray().filter(
      (r) => r.stageStatus === "REQUESTED_TO_JOIN_STAGE"
    ).map((r) => ({
      displayName: r.name,
      userId: r.userId,
      peerId: r.id
    }));
    return f(this, Ds, e), { stageRequests: n(this, Ds) };
  }
  requestAccess() {
    return u(this, null, function* () {
      if (!n(this, ie).permissions.stageEnabled)
        throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
      if (this.status !== "OFF_STAGE")
        throw new b(
          `Unable to request access you are currently ${this.status}`,
          "2006"
        );
      if (n(this, ie).permissions.stageAccess === j.Allowed) {
        x(this, qn, hd).call(this, "ACCEPTED_TO_JOIN_STAGE");
        return;
      }
      n(this, Yt).requestAccess(), x(this, qn, hd).call(this, "REQUESTED_TO_JOIN_STAGE");
    });
  }
  cancelRequestAccess() {
    return u(this, null, function* () {
      if (!n(this, ie).permissions.stageEnabled)
        throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
      n(this, Yt).cancelRequestAccess(), x(this, qn, hd).call(this, "OFF_STAGE");
    });
  }
  grantAccess(e) {
    if (!n(this, ie).roomJoined)
      throw new b(
        "Can`t grant for participant without joining room"
      );
    if (!n(this, ie).permissions.stageEnabled)
      throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
    if (!n(this, ie).permissions.acceptStageRequests)
      throw this.logger.error("Stage::grant_access::permission_denied"), new b("You do not have permission to perform this action", "2001");
    return n(this, Yt).grantAccess(e);
  }
  denyAccess(e) {
    if (!n(this, ie).roomJoined)
      throw new b(
        "Can`t rejectRequestToJoinStage for participant without joining room",
        "2005"
      );
    if (!n(this, ie).permissions.stageEnabled)
      throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
    if (!n(this, ie).permissions.acceptStageRequests)
      throw this.logger.error("Stage::deny_access::permission_denied"), new b("You do not have permission to perform this action", "2001");
    return n(this, Yt).denyAccess(e);
  }
  /**
   * Returns the peerId of the current user
   */
  get peerId() {
    return n(this, We).getValue("peerId");
  }
  join() {
    return u(this, null, function* () {
      const e = n(this, We).getValue("viewType");
      if (this.status === "ON_STAGE")
        throw new b("You are already on stage.", "2006");
      if (this.status !== "ACCEPTED_TO_JOIN_STAGE" || n(this, ie).permissions.stageAccess === j.NotAllowed)
        throw new b(`Unable to join stage you are currently ${this.status}`, "2006");
      if (n(this, We).setValue("stageStatus", "ON_STAGE", !1), yield n(this, Yt).joinStage(), e === At.Livestream) {
        yield n(this, We).getValue("selfController").joinRoom();
        return;
      }
      n(this, We).notify("stageStatus"), n(this, ie).audioEnabled && n(this, Fo, $u).shareMic(n(this, ie).audioTrack), n(this, ie).videoEnabled && n(this, Fo, $u).shareWebcam(n(this, ie).videoTrack);
    });
  }
  leave() {
    return u(this, null, function* () {
      if (!n(this, ie).permissions.stageEnabled)
        throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
      if (!(this.status === "ON_STAGE" || this.status === "ACCEPTED_TO_JOIN_STAGE"))
        throw new b(`Unable to leave stage you are currently ${this.status}`, "2006");
      n(this, ie).setIsPinned(!1), n(this, We).setValue("stageStatus", "OFF_STAGE", !1), yield n(this, Yt).leaveStage(n(this, ie).userId);
      try {
        yield n(this, We).getValue("peerSessionStore").emitAsync(k.LEAVE_MEDIA_ROOM, "stageLeft");
      } catch (e) {
        this.logger.error("Stage::leave::emitAsync::failed", { error: e });
      }
      n(this, We).notify("stageStatus");
    });
  }
  /**
   * Method to kick a user off the stage
   *
   * `permissions.acceptStageRequests` privilege required
   */
  kick(e) {
    return u(this, null, function* () {
      if (!n(this, ie).roomJoined)
        throw new b(
          "Can`t kick participant without joining room",
          "2005"
        );
      if (!n(this, ie).permissions.stageEnabled)
        throw this.logger.error("Stage::stage_disabled"), new b("Stage is disabled", "2003");
      if (!n(this, ie).permissions.acceptStageRequests)
        throw this.logger.error("Stage::kick::permission_denied"), new b("You do not have permissions for kick", "2001");
      return n(this, Yt).kick(e);
    });
  }
}
Yt = new WeakMap(), $d = new WeakMap(), ie = new WeakMap(), $o = new WeakMap(), Ds = new WeakMap(), We = new WeakMap(), Fo = new WeakSet(), $u = function() {
  return n(this, We).getValue("roomNodeClient");
}, qn = new WeakSet(), hd = function(e) {
  return u(this, null, function* () {
    this.status !== e && n(this, We).setValue("stageStatus", e);
  });
};
pn([
  E.trace("Stage.getStageRequests")
], si.prototype, "getAccessRequests", 1);
pn([
  E.trace("Stage.requestAccess")
], si.prototype, "requestAccess", 1);
pn([
  E.trace("Stage.cancelRequestAccess")
], si.prototype, "cancelRequestAccess", 1);
pn([
  E.trace("Stage.grantAccess")
], si.prototype, "grantAccess", 1);
pn([
  E.trace("Stage.denyAccess")
], si.prototype, "denyAccess", 1);
pn([
  _r.executeWithLock({
    methodName: "joinStage",
    lockName: "Stage.join",
    timeout: 5e3
  }),
  E.trace("Stage.joinStage")
], si.prototype, "join", 1);
pn([
  E.trace("Stage.leaveStage")
], si.prototype, "leave", 1);
function _0(s) {
  return !(s.viewType === "LIVESTREAM" || s.viewType === "CHAT");
}
function Nh(s) {
  switch (s) {
    case pr.UNSPECIFIED:
      return "OFF_STAGE";
    case pr.REQUESTED_STAGE:
      return "REQUESTED_TO_JOIN_STAGE";
    case pr.APPROVED_STAGE:
      return "ACCEPTED_TO_JOIN_STAGE";
    case pr.OFF_STAGE:
      return "OFF_STAGE";
    case pr.ON_STAGE:
      return "ON_STAGE";
    default:
      return "OFF_STAGE";
  }
}
var P0 = Object.defineProperty, C0 = Object.getOwnPropertyDescriptor, w0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? C0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && P0(t, e, i), i;
}, Vr, ps, Lr, Bo, mt;
class $f {
  constructor(t, e, r, i, a) {
    h(this, "stage");
    m(this, Vr, void 0);
    m(this, ps, void 0);
    m(this, Lr, void 0);
    m(this, Bo, 0);
    m(this, mt, void 0);
    f(this, mt, t), this.stage = new si(
      t,
      i,
      a,
      e,
      r
    ), f(this, Lr, e), f(this, Vr, i), f(this, ps, a), this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, mt).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, mt).getValue("logger");
  }
  setupEvents() {
    n(this, mt).subscribe("stageStatus", (t) => {
      this.stage.emit("stageStatusUpdate", t);
    }), n(this, Lr).on(U.grantStageAccess, () => {
      n(this, Vr).permissions.stageAccess !== j.Allowed && (this.stage.emit("stageRequestApproved"), this.setStageStatus("ACCEPTED_TO_JOIN_STAGE"));
    }), n(this, Lr).on(U.peerStageStatusUpdate, (t) => {
      t !== void 0 && (t.peerId === n(this, Vr).id ? this.selfStageStatusHandler(t) : this.peerStageStatusHandler(t));
    }), n(this, Lr).on(U.denyStageAccess, () => {
      n(this, Vr).permissions.stageAccess !== j.Allowed && (this.stage.emit("stageRequestRejected"), this.setStageStatus("OFF_STAGE"));
    }), n(this, Lr).on(
      U.getStageRequests,
      (t) => u(this, null, function* () {
        var r;
        if (n(this, Vr).permissions.stageAccess !== j.Allowed)
          return;
        const e = (r = t == null ? void 0 : t.stageRequests) != null ? r : [];
        yield n(this, mt).getValue("peerSessionStore").emitAsync(k.GET_STAGE_REQUESTS, e), n(this, Bo) < e.length && e.length > 0 && this.stage.emit("newStageRequest", { count: e.length }), f(this, Bo, e.length), this.stage.emit("stageAccessRequestUpdate", e);
      })
    );
  }
  getCurrentStageRequests() {
    return n(this, ps).joined.toArray().filter(
      (e) => e.stageStatus === "REQUESTED_TO_JOIN_STAGE"
    ).map((e) => ({
      displayName: e.name,
      userId: e.userId,
      peerId: e.id
    }));
  }
  setStageStatus(t) {
    return u(this, null, function* () {
      this.stage.status !== t && n(this, mt).setValue("stageStatus", t);
    });
  }
  /**
   * NOTE(ishita1805): Runs for cases like:
   * - Being kicked from stage
   * - Socket-Client inconsistency
   */
  selfStageStatusHandler(t) {
    const e = Nh(t.stageType), r = n(this, mt).getValue("stageStatus");
    if (r !== e)
      switch (t.stageType) {
        case 1:
          n(this, mt).setValue("stageStatus", "ACCEPTED_TO_JOIN_STAGE", !1), this.stage.join();
          break;
        case 2:
        case 3:
          this.setStageStatus(r);
          break;
        case 0:
        case 4:
        default:
          n(this, mt).setValue("stageStatus", "ACCEPTED_TO_JOIN_STAGE", !1), this.stage.leave();
          break;
      }
  }
  /**
   * NOTE(ishita1805): Source of truth for updating peer stage status
   */
  peerStageStatusHandler(t) {
    return u(this, null, function* () {
      const e = n(this, ps).joined.get(t.peerId), r = n(this, ps).viewMode === "ACTIVE_GRID";
      if (!e) {
        this.logger.warn("err::peerStageStatusUpdate: participant not found");
        return;
      }
      switch (t.stageType) {
        case 1:
          e.setStageStatus("ON_STAGE"), r && n(this, mt).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: n(this, ps).viewMode, page: n(this, ps).currentPage });
          break;
        case 2:
          e.setStageStatus("ACCEPTED_TO_JOIN_STAGE");
          break;
        case 3:
          e.setStageStatus("REQUESTED_TO_JOIN_STAGE");
          break;
        case 0:
        case 4:
        default:
          e.setStageStatus("OFF_STAGE"), r && n(this, mt).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: n(this, ps).viewMode, page: n(this, ps).currentPage });
          break;
      }
      n(this, mt).getValue("peerSessionStore").emit(k.UPDATE_PEER_STAGE_STATUS, {
        id: e.id,
        status: e.stageStatus
      });
    });
  }
}
Vr = new WeakMap(), ps = new WeakMap(), Lr = new WeakMap(), Bo = new WeakMap(), mt = new WeakMap();
w0([
  E.trace("Stage.setupEvents")
], $f.prototype, "setupEvents", 1);
var R0 = Object.defineProperty, b0 = Object.getOwnPropertyDescriptor, Bl = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? b0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && R0(t, e, i), i;
};
const Ie = {
  getPeer: 14,
  getPeers: 15,
  chatMessage: 16,
  getRoomName: 17,
  getDisplayTitle: 18,
  getPluginInitiator: 19,
  customPluginEventToParent: 20,
  peerJoined: 22,
  peerLeft: 23,
  sendData: 24,
  stageStatusUpdate: 25,
  peerStageStatusUpdate: 26
};
var it, xt, jn, Gn, Qs, Wn, xr, Jn, xg;
let xa = (xg = class extends Ua {
  constructor(t, {
    baseURL: e,
    createdAt: r,
    description: i,
    id: a,
    name: o,
    organizationId: c,
    picture: d,
    private: l,
    published: p,
    staggered: g,
    tags: S,
    type: v,
    updatedAt: _
  }, P, C, w, $, F) {
    const N = t.getValue("logger");
    super(N);
    m(this, it, void 0);
    h(this, "baseURL");
    h(this, "createdAt");
    h(this, "description");
    h(this, "id");
    h(this, "name");
    m(this, xt, void 0);
    m(this, jn, void 0);
    m(this, Gn, void 0);
    h(this, "organizationId");
    h(this, "picture");
    h(this, "private");
    h(this, "published");
    h(this, "staggered");
    h(this, "tags");
    h(this, "type");
    h(this, "updatedAt");
    m(this, Qs, void 0);
    h(this, "config");
    m(this, Wn, void 0);
    h(this, "active");
    h(this, "iframes");
    h(this, "enabledBy");
    m(this, xr, void 0);
    m(this, Jn, void 0);
    f(this, xr, t), this.baseURL = e, this.createdAt = new Date(r), this.description = i, this.id = a, this.name = o, f(this, xt, C), this.organizationId = c, this.picture = d, this.private = l, this.published = p, this.staggered = g, this.tags = S, this.type = v, this.updatedAt = new Date(_), this.active = !1, this.iframes = /* @__PURE__ */ new Map(), f(this, it, P), f(this, jn, w), f(this, Gn, $), this.enabledBy = "", f(this, Jn, F);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, xr).getValue("telemetry");
  }
  /**
   * @access private
   * This function forwards events to plugin. This is not meant for external use.
   * @param message Socket message forwarded to this plugin.
   */
  sendIframeEvent(t) {
    this.iframes.size && this.iframes.forEach((e) => {
      const { iframe: r } = e;
      r && (navigator.isReactNative ? r.postMessage(JSON.stringify(t)) : r.contentWindow.postMessage(t, "*"));
    });
  }
  handleIframeMessage(t) {
    return u(this, null, function* () {
      var o;
      if (!this.active)
        return;
      const e = t, { payload: r, uuid: i, type: a } = e;
      switch (a) {
        case J.customPluginEventToRoom: {
          n(this, it).customPluginEventToRoom(
            this.id,
            r,
            i
          );
          break;
        }
        case J.customPluginEventToPeers: {
          n(this, it).customPluginEventToPeers(
            this.id,
            r.peerIds,
            r,
            i
          );
          break;
        }
        case J.enablePluginForRoom: {
          n(this, it).enablePluginForRoom(this.id, i);
          break;
        }
        case J.enablePluginForPeers: {
          n(this, it).enablePluginForPeers(
            this.id,
            r.peerIds,
            i
          );
          break;
        }
        case J.disablePluginForRoom: {
          n(this, it).disablePluginForRoom(this.id, i);
          break;
        }
        case J.disablePluginForPeers: {
          n(this, it).disablePluginForPeers(
            this.id,
            r.peerIds,
            i
          );
          break;
        }
        case J.storeInsertKeys: {
          n(this, it).storeInsertKeys(
            this.id,
            r.store,
            r.insertKeys,
            i
          );
          break;
        }
        case J.storeGetKeys: {
          n(this, it).storeGetKeys(
            this.id,
            r.store,
            r.getKeys,
            i
          );
          break;
        }
        case J.storeDeleteKeys: {
          n(this, it).storeDeleteKeys(
            this.id,
            r.store,
            r.deleteKeys,
            i
          );
          break;
        }
        case J.storeDelete: {
          n(this, it).storeDelete(this.id, r.store, i);
          break;
        }
        case Ie.chatMessage: {
          const {
            messagePayload: c,
            peerIds: d
          } = r;
          if (!n(this, Gn)) {
            this.sendIframeEvent({
              type: Ie.chatMessage,
              uuid: e.uuid,
              payload: { error: "Chat is disabled for this room." }
            });
            return;
          }
          try {
            yield n(this, Gn).sendMessage(c, d), this.sendIframeEvent({
              type: Ie.chatMessage,
              uuid: e.uuid,
              payload: { success: !0 }
            });
          } catch (l) {
            this.sendIframeEvent({
              type: Ie.chatMessage,
              uuid: e.uuid,
              payload: {
                error: l
              }
            });
          }
          break;
        }
        case Ie.getPeer: {
          let c;
          const { peerId: d } = r, l = H(D({}, n(this, xt)), {
            id: n(this, xt).id,
            isRecorder: (o = n(this, xt).permissions) == null ? void 0 : o.isRecorder,
            isHidden: n(this, xt).permissions.hiddenParticipant,
            stageStatus: n(this, xt).stageStatus
          });
          d ? (c = n(this, jn).joined.get(r.peerId), n(this, xt).id === d && (c = l)) : c = l, this.sendIframeEvent({
            type: Ie.getPeer,
            payload: { peer: c && bd(c) },
            uuid: e.uuid
          });
          break;
        }
        case Ie.getPeers: {
          const c = n(this, jn).joined.toArray().map((d) => bd(d));
          this.sendIframeEvent({
            type: Ie.getPeers,
            payload: { peers: c },
            uuid: e.uuid
          });
          break;
        }
        case Ie.getPluginInitiator: {
          this.sendIframeEvent({
            type: Ie.getPluginInitiator,
            payload: { enabledBy: this.enabledBy },
            uuid: e.uuid
          });
          break;
        }
        case Ie.getDisplayTitle: {
          this.sendIframeEvent({
            type: Ie.getDisplayTitle,
            payload: { displayTitle: n(this, Jn) },
            uuid: e.uuid
          });
          break;
        }
        case Ie.getRoomName: {
          this.sendIframeEvent({
            type: Ie.getRoomName,
            payload: { roomName: n(this, xr).getValue("meetingId") },
            uuid: e.uuid
          });
          break;
        }
        case Ie.customPluginEventToParent: {
          this.emit(e.payload.eventName, e.payload.data);
          break;
        }
      }
    });
  }
  sendData(t) {
    this.active && (this.logger.info("Plugin::SendData", {
      plugin: {
        id: this.id,
        name: this.name,
        data: {
          eventName: t.eventName
        }
      }
    }), this.sendIframeEvent({
      type: Ie.sendData,
      uuid: "",
      payload: t
    }));
  }
  /**
   * This method is used for cleaning up event listeners attached to an iframe. It must
   * be used before the iframe is removed from the DOM.
   * @param viewId ID of the view corresponding to this iframe. Default is 'default'.
   */
  removePluginView(t = "default") {
    var i;
    const { iframe: e, listener: r } = (i = this.iframes.get(t)) != null ? i : {};
    (e || r) && (navigator.isReactNative ? e.props.onMessage = void 0 : window.removeEventListener("message", r), this.iframes.delete(t));
  }
  /**
   * This method adds the communcation layer between the plugin inside the iframe
   * and the core application (meeting object) in the main window.
   * @param iframe Iframe element to display this plugin.
   * @param viewId ID of the view corresponding to this iframe. Default is 'default'.
   */
  addPluginView(t, e = "default") {
    var o;
    if (!n(this, Wn))
      throw this.logger.error(
        "Plugin::addPluginView::no_auth_token_set_for_plugin"
      ), new b("No auth token set for plugin.", "0602");
    if (!t)
      throw this.logger.error("Plugin::addPluginView::iframe_was_not_provided"), new b("Iframe was not provided.", "0603");
    this.removePluginView(e);
    const r = t, i = new URL(this.baseURL), a = {
      auth: n(this, Wn),
      parent: navigator.isReactNative ? this.baseURL : window.location.origin,
      backend: n(this, xr).getValue("apiBase"),
      pluginId: this.id,
      roomName: (o = n(this, xr).getValue("meetingId")) != null ? o : "",
      displayTitle: n(this, Jn)
    };
    if (Object.keys(a).forEach((c) => {
      i.searchParams.set(c, a[c]);
    }), r.src = i.href, r.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", r.title = e, navigator.isReactNative)
      r.props.onMessage = (c) => {
        this.handleIframeMessage(JSON.parse(c.nativeEvent.data));
      }, this.iframes.set(e, { iframe: r });
    else {
      const c = (d) => u(this, null, function* () {
        d.source === t.contentWindow && (yield this.handleIframeMessage(d.data));
      });
      window.addEventListener("message", c), this.iframes.set(e, { iframe: r, listener: c });
    }
  }
  setActive(t) {
    var e, r;
    if (this.active = t, t) {
      this.emit("stateUpdate", {
        active: this.active,
        pluginId: this.id,
        bind: this.addPluginView.bind(this),
        views: (e = this.config) == null ? void 0 : e.views
      });
      return;
    }
    this.active = !1, this.emit("stateUpdate", {
      active: this.active,
      pluginId: this.id,
      views: (r = this.config) == null ? void 0 : r.views
    });
  }
  /**
   * @access private
   * Not for external use
   */
  // NOTE(roerohan): Enable this plugin for the current user.
  activateForSelf() {
    return u(this, null, function* () {
      const t = dt(), e = yield t.authorizePlugin(this.id);
      f(this, Wn, e), f(this, Qs, new Date());
      try {
        const r = yield t.getPluginConfig(this.baseURL);
        this.config = r;
      } catch (r) {
        this.logger.error("Plugin::activateForSelf", { error: r });
      }
      this.setActive(!0), this.emit("enabled");
    });
  }
  /**
   * @access private
   * Not for external use
   */
  // NOTE(roerohan): Disable this plugin for the current user.
  deactivateForSelf() {
    Array.from(this.iframes.keys()).forEach((t) => {
      this.removePluginView(t);
    }), f(this, Qs, void 0), this.iframes.clear(), this.setActive(!1), this.emit("closed");
  }
  /**
   * @deprecated
   */
  enable() {
    return u(this, null, function* () {
      return this.activateForSelf();
    });
  }
  /**
   * @deprecated
   */
  disable() {
    return this.deactivateForSelf();
  }
  activate() {
    return u(this, null, function* () {
      var t, e;
      this.active || (e = (t = n(this, xt).permissions) == null ? void 0 : t.plugins) != null && e.canStart && (n(this, it).addPlugin(this.id, this.staggered), f(this, Qs, new Date()), this.logger.info("plugin::activated", {
        plugin: {
          id: this.id,
          enabledBy: this.enabledBy,
          name: this.name
        }
      }));
    });
  }
  deactivate() {
    return u(this, null, function* () {
      var t, e;
      this.active && (!((e = (t = n(this, xt).permissions) == null ? void 0 : t.plugins) != null && e.canClose) && this.enabledBy !== n(this, xt).id || (n(this, it).removePlugin(this.id), this.logger.info("plugin::deactivated", {
        plugin: {
          id: this.id,
          name: this.name,
          duration: n(this, Qs) ? new Date().getTime() - n(this, Qs).getTime() : 0
        }
      }), f(this, Qs, void 0)));
    });
  }
}, it = new WeakMap(), xt = new WeakMap(), jn = new WeakMap(), Gn = new WeakMap(), Qs = new WeakMap(), Wn = new WeakMap(), xr = new WeakMap(), Jn = new WeakMap(), xg);
Bl([
  Mt({ maxInvocations: 5, period: 1 })
], xa.prototype, "sendData", 1);
Bl([
  E.trace("Plugin.activatePlugin")
], xa.prototype, "activate", 1);
Bl([
  E.trace("Plugin.deactivatePlugin")
], xa.prototype, "deactivate", 1);
xa = Bl([
  ut("0600")
], xa);
var Oe, Ei;
class Ff extends Map {
  constructor(e, r = void 0) {
    const {
      onAddEvent: i,
      onDeleteEvent: a,
      onClearEvent: o
    } = e;
    super();
    m(this, Oe, void 0);
    m(this, Ei, void 0);
    h(this, "onAddEvent");
    h(this, "onDeleteEvent");
    h(this, "onClearEvent");
    f(this, Oe, new Ua(r)), this.onAddEvent = i, this.onDeleteEvent = a, this.onClearEvent = o, f(this, Ei, /* @__PURE__ */ new Map());
  }
  emit(e, ...r) {
    return n(this, Oe).emit(e, ...r);
  }
  on(e, r) {
    return n(this, Oe).on(e, r);
  }
  addListener(e, r) {
    return n(this, Oe).addListener(e, r);
  }
  off(e, r) {
    return n(this, Oe).off(e, r);
  }
  once(e, r) {
    return n(this, Oe).once(e, r);
  }
  prependListener(e, r) {
    return n(this, Oe).prependListener(e, r);
  }
  prependOnceListener(e, r) {
    return n(this, Oe).prependOnceListener(e, r);
  }
  removeListener(e, r) {
    return n(this, Oe).removeListener(e, r);
  }
  removeAllListeners(e) {
    return n(this, Oe).removeAllListeners(e);
  }
  listeners(e) {
    return n(this, Oe).listeners(e);
  }
  listenerCount(e) {
    return n(this, Oe).listenerCount(e);
  }
  getMaxListeners() {
    return n(this, Oe).getMaxListeners();
  }
  setMaxListeners(e) {
    return n(this, Oe).setMaxListeners(e);
  }
  eventNames() {
    return n(this, Oe).eventNames();
  }
  add(e, r = !0) {
    return this.set(e.id, e, r);
  }
  set(e, r, i = !0) {
    const a = super.set(e, r), o = (c, ...d) => {
      this.emit(c, r, ...d);
    };
    return n(this, Ei).set(e, o), r.on("*", o), i && n(this, Oe).emit(this.onAddEvent, r), a;
  }
  delete(e, r = !0, i = !1) {
    const a = this.get(e);
    if (!a)
      return !1;
    a.removeListener("*", n(this, Ei).get(e));
    const o = super.delete(e);
    return i && a.removeAllListeners(), r && n(this, Oe).emit(this.onDeleteEvent, a), o;
  }
  clear(e = !0, r = !1) {
    this.forEach((a) => {
      a.removeListener("*", n(this, Ei).get(a.id)), r && a.removeAllListeners();
    });
    const i = super.clear();
    return e && n(this, Oe).emit(this.onClearEvent), i;
  }
  toArray() {
    return Array.from(this.values());
  }
}
Oe = new WeakMap(), Ei = new WeakMap();
class pg extends Ff {
  constructor(t) {
    super({
      onAddEvent: "pluginAdded",
      onDeleteEvent: "pluginDeleted"
    }, t);
  }
  add(t, e = !0) {
    return super.add(t, e);
  }
  delete(t, e = !0, r = !1) {
    return super.delete(t, e, r);
  }
}
var k0 = Object.defineProperty, I0 = Object.getOwnPropertyDescriptor, A0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? I0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && k0(t, e, i), i;
};
let Fu = class {
  constructor(s) {
    /**
     * All plugins accessible by the current user.
     */
    h(this, "all");
    /**
     * All plugins that are currently enabled in the room.
     */
    h(this, "active");
    this.all = new pg(s), this.active = new pg(s);
  }
};
Fu = A0([
  ut("0600")
], Fu);
var M0 = Object.defineProperty, D0 = Object.getOwnPropertyDescriptor, Hl = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? D0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && M0(t, e, i), i;
}, Qt, Kn, gs, Ug;
const Bf = (Ug = class {
  constructor(s, t, e, r) {
    h(this, "plugins");
    m(this, Qt, void 0);
    m(this, Kn, void 0);
    m(this, gs, void 0);
    f(this, Qt, t), f(this, Kn, e), f(this, gs, s), this.plugins = r, this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, gs).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, gs).getValue("logger");
  }
  static init(s, t, e, r, i, a, o, c) {
    return u(this, null, function* () {
      const d = s.getValue("logger"), l = new Fu(d);
      return t.forEach((p) => {
        const g = new xa(
          s,
          p,
          e,
          a,
          o,
          i,
          c
        );
        l.all.add(g);
      }), new Bf(
        s,
        e,
        r,
        l
      );
    });
  }
  getRoomPlugins() {
    return u(this, null, function* () {
      var t;
      const { plugins: s } = yield n(this, Qt).getActivePlugins();
      (t = this.plugins.active) == null || t.toArray().forEach((e) => {
        this.disablePlugin({ id: e.id });
      }), yield Promise.all(
        s.map(
          (e) => this.enablePlugin({
            id: e.pluginId,
            enabledBy: e.enabledBy
          })
        )
      );
    });
  }
  enablePlugin(e) {
    return u(this, arguments, function* ({
      id: s,
      enabledBy: t
    }) {
      const r = this.plugins.all.get(s);
      r && (yield r.activateForSelf(), r.enabledBy = t);
    });
  }
  disablePlugin(t) {
    return u(this, arguments, function* ({ id: s }) {
      const e = this.plugins.all.get(s);
      e && e.deactivateForSelf();
    });
  }
  sendIframeEvent(s, t, e, r) {
    const i = this.plugins.all.get(t);
    i && i.sendIframeEvent({ type: s, uuid: e, payload: r });
  }
  broadcastIframeEvent(s, t) {
    this.plugins.active.forEach((e) => {
      this.sendIframeEvent(s, e.id, "", t);
    });
  }
  setupEvents() {
    this.plugins.all.on(
      "stateUpdate",
      ({ active: s, id: t }) => {
        if (s) {
          this.plugins.active.add(this.plugins.all.get(t));
          return;
        }
        this.plugins.active.delete(t);
      }
    ), n(this, gs).getValue("peerSessionStore").onAsync(k.SOCKET_SERVICE_ROOM_JOINED, () => u(this, null, function* () {
      yield this.getRoomPlugins(), this.logger.debug("[SOCKET_SERVICE_ROOM_JOINED] resolved request to fetch plugins.");
    })), n(this, Qt).on(
      J.addPlugin,
      (s) => u(this, null, function* () {
        var e;
        const t = s.pluginId;
        (e = this.plugins.all.get(t)) != null && e.active || (yield this.enablePlugin({ id: t, enabledBy: s.enabledBy }));
      })
    ), n(this, Qt).on(
      J.removePlugin,
      (s) => u(this, null, function* () {
        var e;
        const t = s.pluginId;
        (e = this.plugins.all.get(t)) != null && e.active && (yield this.disablePlugin({ id: t }));
      })
    ), [
      J.enablePluginForPeers,
      J.enablePluginForRoom
    ].forEach((s) => {
      n(this, Qt).on(
        s,
        (t, e) => u(this, null, function* () {
          this.sendIframeEvent(s, t.pluginId, e, {
            enabledBy: t.enabledBy
          });
        })
      );
    }), [
      J.disablePluginForPeers,
      J.disablePluginForRoom
    ].forEach((s) => {
      n(this, Qt).on(
        s,
        (t, e) => u(this, null, function* () {
          this.sendIframeEvent(s, t.pluginId, e, {
            disabledBy: t.disabledBy
          });
        })
      );
    }), [
      J.customPluginEventToPeers,
      J.customPluginEventToRoom
    ].forEach((s) => {
      n(this, Qt).on(
        s,
        (t, e) => u(this, null, function* () {
          this.sendIframeEvent(s, t.pluginId, e, {
            data: JSON.parse(
              new TextDecoder().decode(t.pluginData)
            )
          });
        })
      );
    }), [
      J.storeInsertKeys,
      J.storeGetKeys,
      J.storeDeleteKeys
    ].forEach((s) => {
      n(this, Qt).on(
        s,
        (t, e) => u(this, null, function* () {
          var i;
          const r = (i = t.storeItems) == null ? void 0 : i.map((a) => {
            var o;
            return {
              timestamp: a.timestamp,
              peerId: a.peerId,
              payload: JSON.parse(
                (o = a.payload) != null && o.length ? new TextDecoder().decode(a.payload) : "{}"
              ),
              key: a.storeKey
            };
          });
          this.sendIframeEvent(s, t.pluginId, e, {
            storeName: t.storeName,
            storeItems: r
          });
        })
      );
    }), n(this, Qt).on(
      J.storeDelete,
      (s, t) => u(this, null, function* () {
        this.sendIframeEvent(J.storeDelete, s.pluginId, t, {
          storeName: s.storeName
        });
      })
    ), n(this, Kn).on(
      Re.sendMessageToPeers,
      (s) => {
        const t = ws == null ? void 0 : ws.formatSocketPeerMessage(
          s.message
        );
        this.broadcastIframeEvent(Ie.chatMessage, { message: t });
      }
    ), n(this, Kn).on(
      Re.sendMessageToRoom,
      (s) => {
        const t = ws == null ? void 0 : ws.formatSocketPeerMessage(
          s.message
        );
        this.broadcastIframeEvent(Ie.chatMessage, { message: t });
      }
    ), n(this, gs).getValue("peerSessionStore").on(k.PEER_JOINED_INTERNAL, (s) => {
      const t = bd(s);
      this.broadcastIframeEvent(Ie.peerJoined, t);
    }), n(this, gs).getValue("peerSessionStore").on(k.PEER_CLOSED, (s) => {
      this.broadcastIframeEvent(Ie.peerLeft, s);
    }), n(this, gs).getValue("peerSessionStore").on(k.UPDATE_PEER_STAGE_STATUS, (s) => {
      this.broadcastIframeEvent(Ie.peerStageStatusUpdate, s);
    }), n(this, gs).subscribe("stageStatus", (s) => {
      this.broadcastIframeEvent(Ie.stageStatusUpdate, s);
    });
  }
}, Qt = new WeakMap(), Kn = new WeakMap(), gs = new WeakMap(), Ug);
let Hc = Bf;
Hl([
  E.trace("PluginController.getRoomPlugins")
], Hc.prototype, "getRoomPlugins", 1);
Hl([
  E.trace("PluginController.enableForSelf")
], Hc.prototype, "enablePlugin", 1);
Hl([
  E.trace("PluginController.disableForSelf")
], Hc.prototype, "disablePlugin", 1);
Hl([
  E.trace("PluginController.setupEvents")
], Hc.prototype, "setupEvents", 1);
var Ho;
class O0 {
  constructor(t) {
    h(this, "mediaJoined");
    h(this, "socketJoined");
    h(this, "socketJoinAttempted");
    h(this, "mediaJoinAttempted");
    h(this, "socketState");
    h(this, "mediaState");
    m(this, Ho, void 0);
    this.mediaJoined = !1, this.socketJoined = !1, this.socketJoinAttempted = !1, this.mediaJoinAttempted = !1, this.socketState = {
      state: void 0,
      reconnected: !1,
      reconnectionAttempt: void 0
    }, this.mediaState = {
      recv: void 0,
      send: void 0
    }, f(this, Ho, t);
  }
  get joinAttempted() {
    return this.mediaJoinAttempted || this.socketJoinAttempted;
  }
  get roomJoined() {
    return this.mediaJoined && this.socketJoined;
  }
  updateSocketConnectionState(t, e) {
    let r;
    const { reconnected: i } = this.socketState;
    switch (t) {
      case "connected":
        r = {
          state: "connected",
          reconnected: i,
          reconnectionAttempt: void 0
        };
        break;
      case "disconnected":
        r = {
          state: "disconnected",
          reconnected: !1,
          reconnectionAttempt: 0
        }, this.socketJoined = !1;
        break;
      case "reconnected":
        r = {
          state: "connected",
          reconnected: !0,
          reconnectionAttempt: void 0
        };
        break;
      case "reconnecting":
        r = {
          state: "reconnecting",
          reconnected: i,
          reconnectionAttempt: 0
        };
        break;
      case "reconnectAttempt":
        r = {
          state: "reconnecting",
          reconnected: i,
          reconnectionAttempt: e
        };
        break;
      case "failed":
        r = {
          state: "failed",
          reconnected: i,
          reconnectionAttempt: void 0
        }, this.socketJoined = !1;
        break;
    }
    r && (n(this, Ho).getValue("peerSessionStore").emit(k.SOCKET_STATE_UPDATE, r), this.socketState = r);
  }
}
Ho = new WeakMap();
var N0 = Object.defineProperty, V0 = Object.getOwnPropertyDescriptor, qc = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? V0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && N0(t, e, i), i;
}, zn, Yn, Qn, pd, $g;
let cn = ($g = class extends qt {
  constructor(t, e) {
    const r = t.getValue("logger");
    super(r);
    m(this, Qn);
    m(this, zn, void 0);
    m(this, Yn, void 0);
    h(this, "recordingPeerIds", []);
    h(this, "recordings", []);
    f(this, Yn, t), f(this, zn, e);
  }
  get recordingState() {
    return this.recordings.some((t) => t.state === "RECORDING") ? "RECORDING" : this.recordings.some((t) => t.state === "PAUSED") ? "PAUSED" : this.recordings.some((t) => t.state === "STARTING") ? "STARTING" : this.recordings.some((t) => t.state === "STOPPING") ? "STOPPING" : "IDLE";
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Yn).getValue("telemetry");
  }
  updateRecordings(t) {
    this.recordings = t, this.emit("recordingUpdate", this.recordingState);
  }
  start(t) {
    return u(this, null, function* () {
      if (!n(this, zn).permissions.canRecord)
        throw this.logger.error("Recording::start::permission_denied"), new b("User does not have permission to start recording", "1001");
      if ((t == null ? void 0 : t.allowMultiple) !== !0 && (this.recordingState === "STARTING" || this.recordingState === "RECORDING" || this.recordingState === "STOPPING"))
        throw this.logger.error("Recording::start::recording_in_progress", {
          recording: {
            state: this.recordingState
          }
        }), new b(
          `Cant start recording, recordingState irregular: ${this.recordingState}`,
          "1005"
        );
      try {
        const e = dt(), { recording: r = {} } = n(this, Yn).getValue("defaults"), i = yield e.startRecording(r, t == null ? void 0 : t.allowMultiple);
        this.updateRecordings([...this.recordings, {
          id: i,
          state: "STARTING",
          type: "BROWSER"
        }]);
      } catch (e) {
        throw this.logger.error("Recording::stop::recording_failed_to_start", {
          error: e
        }), new b("Error while starting recording", "1000", this.logger);
      }
    });
  }
  stop(t) {
    return u(this, null, function* () {
      yield x(this, Qn, pd).call(this, "stop", ["RECORDING", "PAUSED"], t);
    });
  }
  pause(t) {
    return u(this, null, function* () {
      yield x(this, Qn, pd).call(this, "pause", ["RECORDING"], t);
    });
  }
  resume(t) {
    return u(this, null, function* () {
      yield x(this, Qn, pd).call(this, "resume", ["PAUSED"], t);
    });
  }
}, zn = new WeakMap(), Yn = new WeakMap(), Qn = new WeakSet(), pd = function(t, e, r) {
  return u(this, null, function* () {
    if (!n(this, zn).permissions.canRecord)
      throw this.logger.error("Recording::stop::permission_denied"), new b("User does not have permission to stop recording", "1001");
    let i = [];
    if (r !== void 0) {
      const a = this.recordings.find((o) => o.id === r);
      if (a === void 0)
        throw new b("Could not find the specified recording", "1004");
      if (e.includes(a.state)) {
        this.logger.error("Recording::stop::recording_not_in_expected_state", {
          recording: {
            state: a.state
          }
        });
        return;
      }
      i.push(a);
    } else
      i = this.recordings.filter((a) => e.includes(a.state));
    i.forEach((a) => u(this, null, function* () {
      const o = a.state;
      t === "stop" && (a.state = "STOPPING", this.emit("recordingUpdate", "STOPPING"));
      try {
        yield dt().updateRecording(a.id, t);
      } catch (c) {
        throw this.logger.error("Recording::stop::recording_failed_to_stop", {
          error: c
        }), a.state !== o && (a.state = o, this.emit("recordingUpdate", o)), new b("Error while stopping recording", "1000", this.logger);
      }
    }));
  });
}, $g);
qc([
  E.trace("Recording.start")
], cn.prototype, "start", 1);
qc([
  E.trace("Recording.stop")
], cn.prototype, "stop", 1);
qc([
  E.trace("Recording.stop")
], cn.prototype, "pause", 1);
qc([
  E.trace("Recording.stop")
], cn.prototype, "resume", 1);
cn = qc([
  ut("1000")
], cn);
var L0 = Object.defineProperty, x0 = Object.getOwnPropertyDescriptor, U0 = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? x0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && L0(t, e, i), i;
}, _i;
class Hf {
  constructor(t, e, r) {
    h(this, "recording");
    h(this, "room");
    m(this, _i, void 0);
    f(this, _i, t), this.recording = new cn(t, e), this.room = r, this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, _i).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, _i).getValue("logger");
  }
  // eslint-disable-next-line class-methods-use-this
  getRecordingTypeFromProtoType(t) {
    let e;
    switch (t) {
      case rn.BROWSER:
        e = "BROWSER";
        break;
      case rn.COMPOSITE:
        e = "COMPOSITE";
        break;
      case rn.TRACK:
        e = "TRACK";
        break;
      default:
        e = "BROWSER";
    }
    return e;
  }
  setupEvents() {
    n(this, _i).getValue("peerSessionStore").on(k.ROOM_STATE, (t) => {
      t.activeRecordings.length !== 0 ? this.recording.updateRecordings(
        t.activeRecordings.map((e) => {
          const r = this.getRecordingTypeFromProtoType(e.recordingType);
          return { id: e.recordingId, state: e.recordingStatus, type: r };
        })
      ) : this.recording.recordings.length && this.recording.updateRecordings([]);
    }), this.room.on(U.recordingStarted, (t) => {
      let e = !1;
      const r = [...this.recording.recordings];
      if (r.forEach((i) => {
        i.id === t.recordingId && (e = !0, i.state = "RECORDING");
      }), e === !1) {
        const i = this.getRecordingTypeFromProtoType(t.recordingType);
        r.push({
          id: t.recordingId,
          state: "RECORDING",
          type: i
        });
      }
      this.recording.updateRecordings(r);
    }), this.room.on(U.recordingPaused, (t) => {
      const e = [...this.recording.recordings];
      e.forEach((r) => {
        r.id === t.recordingId && (r.state = "PAUSED");
      }), this.recording.updateRecordings(e);
    }), this.room.on(U.recordingStopped, (t) => {
      const e = [...this.recording.recordings.filter((r) => r.id !== t.recordingId)];
      this.recording.updateRecordings(e);
    });
  }
}
_i = new WeakMap();
U0([
  E.trace("RecordingController.setupEvents")
], Hf.prototype, "setupEvents", 1);
var Pi;
class $0 {
  constructor(t) {
    m(this, Pi, void 0);
    f(this, Pi, t);
  }
  hasFeature(t) {
    var e;
    return (e = n(this, Pi).getValue("flagsmith").hasFeature(t)) != null ? e : !1;
  }
  getFeatureValue(t) {
    return n(this, Pi).getValue("flagsmith").getValue(t);
  }
  getAllFeatures() {
    return n(this, Pi).getValue("flagsmith").getAllFlags();
  }
}
Pi = new WeakMap();
class Vh {
  constructor(t, e, r) {
    h(this, "logger");
    h(this, "features");
    h(this, "browserSpecs");
    h(this, "callStats");
    this.logger = t, this.features = e, this.browserSpecs = ye, this.callStats = r;
  }
  static init(t) {
    return new Vh(t.getValue("logger"), new $0(t), t.getValue("callstats"));
  }
}
class Lh {
  constructor(t) {
    h(this, "internals");
    this.internals = t;
  }
  static init(t) {
    return u(this, null, function* () {
      const e = Vh.init(t);
      return new Lh(e);
    });
  }
}
var F0 = Object.defineProperty, B0 = Object.getOwnPropertyDescriptor, Gt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? B0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && F0(t, e, i), i;
}, He, ve, pe, Xs, Xt, qo, ke;
class Dt extends Ua {
  constructor(e, r, i = Bu, a = !0) {
    const o = e.getValue("logger");
    super(o);
    m(this, He, void 0);
    m(this, ve, void 0);
    m(this, pe, void 0);
    m(this, Xs, void 0);
    m(this, Xt, void 0);
    m(this, qo, void 0);
    m(this, ke, void 0);
    h(this, "audioUpdateInProgress");
    h(this, "videoUpdateInProgress");
    f(this, ke, e), this.audioUpdateInProgress = !1, this.videoUpdateInProgress = !1, f(this, He, new qf(e, r)), f(this, ve, new dD(
      e,
      n(this, He),
      void 0,
      i
    )), f(this, pe, new fD(
      e,
      n(this, He),
      void 0,
      i
    )), f(this, Xt, new pD(
      n(this, ke),
      n(this, He)
    )), f(this, Xs, new uD(
      n(this, He)
    )), f(this, qo, a), n(this, ve).on("trackMuted", this.onAudioTrackMuted.bind(this)), n(this, ve).on(
      "trackChanged",
      this.onAudioTrackChanged.bind(this)
    ), n(this, pe).on(
      "trackChanged",
      this.onVideoTrackChanged.bind(this)
    ), n(this, pe).on("trackEnded", this.onVideoTrackEnded.bind(this)), n(this, Xt).on(
      "trackEnded",
      this.onScreenShareEnded.bind(this)
    ), this.onVisibilityChange = this.onVisibilityChange.bind(this), document.addEventListener("visibilitychange", this.onVisibilityChange);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, ke).getValue("telemetry");
  }
  set context(e) {
    f(this, ke, e);
  }
  // eslint-disable-next-line class-methods-use-this
  onVisibilityChange() {
    return u(this, null, function* () {
      n(this, ke).getValue("callstats").tabChanged(document.visibilityState === "visible"), document.visibilityState !== "visible" ? n(this, ke).getValue("callstats").browserBackgrounded() : (n(this, ke).getValue("callstats").browserForegrounded(), yield this.setupSpeaker());
    });
  }
  // eslint-disable-next-line class-methods-use-this
  repopulateAvailableDevices() {
    return u(this, null, function* () {
      return !0;
    });
  }
  setupStreams(i) {
    return u(this, arguments, function* ({
      audio: e,
      video: r
    }) {
      var c;
      e ? n(this, ke).getValue("callstats").audioOn() : n(this, ke).getValue("callstats").audioOff(), r ? n(this, ke).getValue("callstats").videoOn() : n(this, ke).getValue("callstats").videoOff();
      let a, o;
      if (e && r)
        try {
          const d = yield n(this, He).getAudioAndVideoTrack(
            n(this, ve).userSelectedDevice,
            n(this, pe).userSelectedDevice
          );
          a = d.audioTrack, o = d.videoTrack;
        } catch (d) {
          this.logger.error(
            "LocalMediaHandler::init::Failed to get audio video tracks",
            {
              error: d
            }
          );
        }
      if (!a && e)
        try {
          a = yield n(this, He).getAudioTrack(
            !1,
            n(this, ve).userSelectedDevice
          );
        } catch (d) {
          this.logger.error("LocalMediaHandler::init::Failed to get audio track", {
            error: d
          });
        }
      if (!o && r)
        try {
          o = yield n(this, He).getVideoTrack(
            n(this, pe).userSelectedDevice
          );
        } catch (d) {
          this.logger.error("LocalMediaHandler::init::Failed to get video track", {
            error: d
          });
        }
      e && !a && n(this, ke).getValue("callstats").audioOff(), r && !o && n(this, ke).getValue("callstats").videoOff(), yield n(this, ve).setMediaTrack(a), yield n(this, pe).setMediaTrack(o);
      try {
        yield this.setupSpeaker();
      } catch (d) {
      }
      if (o) {
        const d = yield this.getDeviceById(o.getSettings().deviceId);
        n(this, ke).getValue("callstats").selectedDevice("VIDEO", d);
      }
      if (a) {
        const d = yield this.getDeviceById(a.getSettings().deviceId);
        n(this, ke).getValue("callstats").selectedDevice("AUDIO", d);
      }
      (c = n(this, Xs).currentDevice) != null && c.deviceId && n(this, ke).getValue("callstats").selectedDevice("SPEAKER", n(this, Xs).currentDevice), n(this, He).onDeviceChange((d, l, p) => {
        this.onDeviceChange(l, p);
      });
    });
  }
  getCurrentDevices() {
    return {
      audio: n(this, ve).currentDevice,
      video: n(this, pe).currentDevice,
      speaker: n(this, Xs).currentDevice
    };
  }
  get permissions() {
    return n(this, He).permissions;
  }
  getAllDevices() {
    return n(this, He).getAvailableDevices();
  }
  getDeviceById(e, r) {
    return n(this, He).getDevice(e);
  }
  /**
   * Audio Input Handler
   */
  onAudioTrackMuted() {
    this.emit("AUDIO_TRACK_SILENT");
  }
  onAudioTrackChanged() {
    this.emit("AUDIO_TRACK_CHANGE");
  }
  get rawAudioTrack() {
    return n(this, ve).mediaTrack;
  }
  get audioTrack() {
    return n(this, ve).transformedMediaTrack;
  }
  get audioEnabled() {
    return n(this, ve).trackEnabled;
  }
  enableAudio(e) {
    return u(this, null, function* () {
      if (!this.audioUpdateInProgress) {
        this.audioUpdateInProgress = !0;
        try {
          e ? yield n(this, ve).enableTrack(!1, e) : yield n(this, ve).unmuteTrack();
        } catch (r) {
        } finally {
          this.audioUpdateInProgress = !1;
        }
      }
    });
  }
  disableAudio() {
    n(this, ve).mediaTrack && !n(this, ve).isCustomTrack ? n(this, ve).muteTrack() : n(this, ve).disableTrack();
  }
  getAudioDevices(e) {
    return n(this, He).getAudioInputDevices(e);
  }
  setAudioDevice(e) {
    return u(this, null, function* () {
      yield n(this, ve).setDevice(e), e != null && e.deviceId && n(this, ke).getValue("callstats").selectedDevice("AUDIO", e), this.emit("AUDIO_TRACK_CHANGE"), this.emit("DEVICE_CHANGE", { device: e });
    });
  }
  /**
   * Audio Output Handler
   */
  setupSpeaker() {
    return u(this, null, function* () {
      const { speaker: e } = this.getCurrentDevices();
      yield n(this, Xs).setupSpeaker();
      const { speaker: r } = this.getCurrentDevices();
      (e == null ? void 0 : e.deviceId) !== (r == null ? void 0 : r.deviceId) && r && this.emit("DEVICE_CHANGE", { device: r });
    });
  }
  setSpeakerDevice(e) {
    return u(this, null, function* () {
      yield n(this, Xs).setupSpeaker(e), e != null && e.deviceId && n(this, ke).getValue("callstats").selectedDevice("SPEAKER", e), this.emit("DEVICE_CHANGE", { device: e });
    });
  }
  /**
   * Video Handler
   */
  onVideoTrackChanged() {
    this.emit("VIDEO_TRACK_CHANGE");
  }
  onVideoTrackEnded() {
    this.emit("VIDEO_TRACK_CHANGE");
  }
  get rawVideoTrack() {
    return n(this, pe).mediaTrack;
  }
  get videoTrack() {
    return n(this, pe).transformedMediaTrack;
  }
  get videoEnabled() {
    return n(this, pe).trackEnabled;
  }
  enableVideo(e) {
    return u(this, null, function* () {
      if (!this.videoUpdateInProgress) {
        this.videoUpdateInProgress = !0;
        try {
          e ? yield n(this, pe).enableTrack(!1, e) : yield n(this, pe).unmuteTrack();
        } catch (r) {
        } finally {
          this.videoUpdateInProgress = !1;
        }
      }
    });
  }
  disableVideo() {
    n(this, pe).disableTrack();
  }
  getVideoDevices(e) {
    return n(this, He).getVideoInputDevices(e);
  }
  setVideoDevice(e) {
    return u(this, null, function* () {
      yield n(this, pe).setDevice(e), e != null && e.deviceId && n(this, ke).getValue("callstats").selectedDevice("VIDEO", e), this.emit("VIDEO_TRACK_CHANGE"), this.emit("DEVICE_CHANGE", { device: e });
    });
  }
  updateVideoConstraints(e) {
    return u(this, null, function* () {
      yield n(this, pe).updateConstraints(e);
    });
  }
  /**
   * Screen Share Handler
   */
  onScreenShareEnded() {
    this.emit("SCREENSHARE_ENDED");
  }
  get screenShareTracks() {
    return {
      audio: n(this, Xt).audioMediaTrack,
      video: n(this, Xt).videoMediaTrack
    };
  }
  get screenShareEnabled() {
    return n(this, Xt).trackEnabled;
  }
  enableScreenShare() {
    return u(this, null, function* () {
      yield n(this, Xt).enableScreenShare();
    });
  }
  disableScreenShare() {
    return u(this, null, function* () {
      n(this, Xt).disableScreenShare();
    });
  }
  updateScreenshareConstraints(e) {
    return u(this, null, function* () {
      yield n(this, Xt).updateConstraints(e);
    });
  }
  getSpeakerDevices(e) {
    return n(this, He).getAudioOutputDevices(e);
  }
  /**
   * Middleware Utility
   */
  addAudioMiddleware(e) {
    return n(this, ve).addMiddleware(e);
  }
  removeAudioMiddleware(e) {
    return n(this, ve).removeMiddleware(e);
  }
  removeAllAudioMiddlewares() {
    return n(this, ve).removeAllMiddlewares();
  }
  addVideoMiddleware(e) {
    return n(this, pe).addMiddleware(e);
  }
  removeVideoMiddleware(e) {
    return n(this, pe).removeMiddleware(e);
  }
  removeAllVideoMiddlewares() {
    return n(this, pe).removeAllMiddlewares();
  }
  setVideoMiddlewareGlobalConfig(e) {
    return n(this, pe).setVideoMiddlewareGlobalConfig(e);
  }
  destruct() {
    n(this, ve).disableTrack(), n(this, pe).disableTrack(), n(this, pe).terminateMiddlewareWebWorker(), n(this, Xt).disableScreenShare(), n(this, He).destruct();
  }
  onDeviceChange(e, r) {
    return u(this, null, function* () {
      var i, a;
      this.emit("DEVICE_LIST_UPDATED", e), !(r || !n(this, qo)) && ((i = e == null ? void 0 : e.added) == null || i.forEach((o) => u(this, null, function* () {
        var c;
        o && !Bu(o) && (o.kind === "audioinput" && ((c = this.audioTrack) == null ? void 0 : c.enabled) === !0 ? yield this.setAudioDevice(o) : o.kind === "audiooutput" && (yield this.setSpeakerDevice(o)));
      })), (a = e == null ? void 0 : e.removed) == null || a.forEach((o) => u(this, null, function* () {
        var c;
        if (o.kind === "audiooutput" && ((c = this.getCurrentDevices().speaker) == null ? void 0 : c.deviceId) === o.deviceId) {
          const d = (yield this.getSpeakerDevices()).find((l) => l.deviceId !== o.deviceId);
          d && (yield this.setSpeakerDevice(d));
        }
      })));
    });
  }
  /**
   * Backward Compatibility
   */
  removeAllTracks() {
    this.destruct();
  }
  /**
   * NOTE(ravindra-cloudflare):
   * Purpose of this function is to ensure a way to reset tracks.
   * Our EdTech clients also call getUserMedia for their own proctoring systems,
   * which can cause our tracks to be blank despite having enabled true.
   *
   * To ensure that they can cleanup our tracks and re-request tracks,
   *  we need to remove the existing tracks.
   */
  removeAudioTrack() {
    n(this, ve).disableTrack();
  }
  /**
   * NOTE(ravindra-cloudflare):
   * Purpose of this function is to ensure a way to reset tracks.
   * Our EdTech clients also call getUserMedia for their own proctoring systems,
   * which can cause our tracks to be blank despite having enabled true.
   *
   * To ensure that they can cleanup our tracks and re-request tracks,
   *  we need to remove the existing tracks.
   */
  removeVideoTrack() {
    n(this, pe).disableTrack(), n(this, pe).terminateMiddlewareWebWorker();
  }
  removeDocumentEventListeners() {
    return u(this, null, function* () {
      document.removeEventListener("visibilitychange", this.onVisibilityChange);
    });
  }
}
He = new WeakMap(), ve = new WeakMap(), pe = new WeakMap(), Xs = new WeakMap(), Xt = new WeakMap(), qo = new WeakMap(), ke = new WeakMap();
Gt([
  E.trace("MediaHandler.setupStreams")
], Dt.prototype, "setupStreams", 1);
Gt([
  E.trace("MediaHandler.enableAudio")
], Dt.prototype, "enableAudio", 1);
Gt([
  E.trace("MediaHandler.disableAudio")
], Dt.prototype, "disableAudio", 1);
Gt([
  E.trace("MediaHandler.setAudioDevice")
], Dt.prototype, "setAudioDevice", 1);
Gt([
  E.trace("MediaHandler.enableVideo")
], Dt.prototype, "enableVideo", 1);
Gt([
  E.trace("MediaHandler.disableVideo")
], Dt.prototype, "disableVideo", 1);
Gt([
  E.trace("MediaHandler.setVideoDevice")
], Dt.prototype, "setVideoDevice", 1);
Gt([
  E.trace("MediaHandler.updateVideoConstraints")
], Dt.prototype, "updateVideoConstraints", 1);
Gt([
  E.trace("MediaHandler.enableScreenShare")
], Dt.prototype, "enableScreenShare", 1);
Gt([
  E.trace("MediaHandler.disableScreenShare")
], Dt.prototype, "disableScreenShare", 1);
Gt([
  E.trace("MediaHandler.updateScreenshareConstraints")
], Dt.prototype, "updateScreenshareConstraints", 1);
Gt([
  E.trace("MediaHandler.destruct")
], Dt.prototype, "destruct", 1);
Gt([
  E.trace("MediaHandler.onDeviceChange")
], Dt.prototype, "onDeviceChange", 1);
function sd(s, t, e) {
  switch (!0) {
    case ye.isChromiumBased():
      switch (t) {
        case "NotAllowedError":
          return e.includes("by system") ? "SYSTEM_DENIED" : s === "screenshare" ? "CANCELED" : "DENIED";
        case "NotReadableError":
        default:
          return "COULD_NOT_START";
      }
    case ye.isSafari():
      switch (t) {
        case "NotAllowedError":
          return "DENIED";
        default:
          return "COULD_NOT_START";
      }
    case ye.isFirefox():
      switch (t) {
        case "NotFoundError":
        case "NotReadableError":
          return "SYSTEM_DENIED";
        case "NotAllowedError":
          return "DENIED";
        case "AbortError":
        default:
          return "COULD_NOT_START";
      }
    default:
      return "COULD_NOT_START";
  }
}
const H0 = [
  "virtual",
  "emulator",
  "krisp",
  "solstice conference",
  "teams",
  "loom",
  "zoom",
  "manycam",
  "blackhole",
  "displayport",
  "xsplit",
  // XSplit virtual camera
  "wirecast",
  // Wirecast virtual camera
  "vMix",
  // vMix virtual camera
  "elgato",
  // Elgato virtual camera
  "epiphan",
  // Epiphan virtual camera
  "voice changer",
  // Some voice changer software
  "voicemod",
  // Voicemod virtual audio device
  "morphvoxx"
  // MorphVOXX virtual audio device
];
function Bu(s) {
  var e, r;
  const t = (e = s.label) == null ? void 0 : e.toLowerCase();
  return ((r = ye._bowser) == null ? void 0 : r.getOSName()) === "macOS" && t.includes("iphone") ? !0 : H0.some(
    (i) => t == null ? void 0 : t.includes(i)
  );
}
function q0(s, t, e) {
  return u(this, null, function* () {
    if (!(t != null && t.length))
      return e;
    const r = s.getValue("logger"), i = new AudioContext(), a = yield Promise.all(
      t == null ? void 0 : t.map((d) => d(i))
    ), o = i.createMediaStreamSource(
      new MediaStream([e])
    ), c = i.createMediaStreamDestination();
    try {
      let d = o;
      for (let l = 0; l < a.length; l += 1)
        d.connect(a[l]), d = a[l];
      d.connect(c);
    } catch (d) {
      return r.error("getTransformedAudioTrack::middleware_execution_failed", {
        error: d
      }), e;
    }
    return c.stream.getAudioTracks()[0];
  });
}
var Ci, jo;
class j0 {
  constructor(t) {
    m(this, Ci, void 0);
    m(this, jo, void 0);
    f(this, jo, t);
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, jo).getValue("logger");
  }
  terminateMiddlewareWebWorker() {
    if (n(this, Ci))
      try {
        nd.clearInterval(n(this, Ci)), f(this, Ci, void 0);
      } catch (t) {
        this.logger.debug("WorkerTimers::terminateMiddlewareWebWorker::failed");
      }
  }
  getTransformedVideoTrack(t, e, r) {
    return u(this, null, function* () {
      if (!(t != null && t.length))
        return e;
      const i = document.createElement("canvas"), a = yield Promise.all(
        t == null ? void 0 : t.map((S) => S({
          canvas: i,
          WorkerTimers: nd
        }))
      );
      if (r.disablePerFrameCanvasRendering) {
        const v = i.captureStream().getVideoTracks()[0];
        return Object.defineProperty(v, "originalSettings", {
          value: e.getSettings()
        }), v;
      }
      const o = document.createElement("video"), c = new MediaStream();
      c.addTrack(e);
      const d = i.getContext("2d");
      o.srcObject = c, o.autoplay = !0, this.terminateMiddlewareWebWorker();
      const l = () => u(this, null, function* () {
        if (e.enabled === !1 || e.readyState === "ended") {
          this.terminateMiddlewareWebWorker(), o.remove(), i.remove();
          return;
        }
        try {
          d.drawImage(o, 0, 0);
          for (let S = 0; S < a.length; S += 1)
            typeof a[S] == "function" && (yield a[S](
              i,
              d
            ));
        } catch (S) {
          this.logger.error(
            "getTransformedVideoTrack::middleware_execution_failed",
            { error: S }
          );
        }
      });
      try {
        o.play();
      } catch (S) {
      }
      o.addEventListener(
        "play",
        () => {
          i.width = o.width || e.getSettings().width, i.height = o.width || e.getSettings().height, f(this, Ci, nd.setInterval(
            l,
            50
          ));
        },
        !1
      );
      const g = i.captureStream().getVideoTracks()[0];
      return Object.defineProperty(g, "originalSettings", {
        value: e.getSettings()
      }), g;
    });
  }
}
Ci = new WeakMap(), jo = new WeakMap();
const gg = {
  gross: { width: { ideal: 192 }, height: { ideal: 144 } },
  qvga: { width: { ideal: 384 }, height: { ideal: 288 } },
  pvga: { width: { ideal: 480 }, height: { ideal: 360 } },
  vga: { width: { ideal: 640 }, height: { ideal: 480 } },
  hd: { width: { ideal: 1280 }, height: { ideal: 720 } },
  hd_cropped: { width: { ideal: 900 }, height: { ideal: 720 } },
  fhd: { width: { ideal: 1920 }, height: { ideal: 1080 } }
}, G0 = [
  [320, [
    {
      rid: "q",
      maxBitrate: 25e4,
      maxFramerate: 24,
      scalabilityMode: "L1T1"
    }
  ]],
  [640, [
    {
      rid: "q",
      scaleResolutionDownBy: 2,
      maxBitrate: 25e4,
      maxFramerate: 24,
      scalabilityMode: "L1T1"
    },
    {
      rid: "h",
      maxBitrate: 7e5,
      maxFramerate: 30,
      scalabilityMode: "L1T1"
    }
  ]],
  [1280, [
    {
      rid: "q",
      scaleResolutionDownBy: 2,
      maxBitrate: 5e5,
      maxFramerate: 24,
      scalabilityMode: "L1T1"
    },
    {
      rid: "h",
      maxBitrate: 13e5,
      maxFramerate: 30,
      scalabilityMode: "L1T1"
    }
  ]],
  [1920, [
    {
      rid: "q",
      scaleResolutionDownBy: 2,
      maxBitrate: 9e5,
      maxFramerate: 24,
      scalabilityMode: "L1T1"
    },
    {
      rid: "h",
      maxBitrate: 15e5,
      maxFramerate: 30,
      scalabilityMode: "L1T1"
    }
  ]]
], W0 = (s, t) => {
  var d, l, p;
  const e = (d = s == null ? void 0 : s.getValue("overrides")) == null ? void 0 : d.simulcastConfig;
  if ((l = e == null ? void 0 : e.encodings) != null && l.length)
    return e.encodings;
  const r = "getSettings" in t && t.getSettings().width || "getConstraints" in t && t.getConstraints().width || "originalSettings" in t && ((p = t.originalSettings) == null ? void 0 : p.width);
  let i = G0;
  s.getValue("flagsmith").hasFeature(ee.OVERRIDE_SIMULCAST_DYNAMIC) && (i = JSON.parse(s.getValue("flagsmith").getValue(
    ee.OVERRIDE_SIMULCAST_DYNAMIC
  )));
  const a = i.map(([g]) => g).sort((g, S) => g - S);
  let o = Number.MAX_VALUE, c = 0;
  return a.forEach((g, S) => {
    Math.abs(g - r) < o && (o = Math.abs(g - r), c = S);
  }), i[c][1];
};
var he = /* @__PURE__ */ ((s) => (s.WEBCAM = "webcam", s.WEBCAM_BACKUP = "webcam_backup", s.MIC = "mic", s.SCREENSHARE_VIDEO = "screenshare_video", s.SCREENSHARE_AUDIO = "screenshare_audio", s))(he || {});
const J0 = gP(), fn = Rs(
  J0.config.media
);
function K0(s) {
  var e, r;
  const t = {};
  return s.audio && (t.audio = {
    enableStereo: (e = s.audio.enableStereo) != null ? e : !1,
    enableHighBitrate: (r = s.audio.enableHighBitrate) != null ? r : !1
  }), t.video = s.video.quality, t;
}
var wi, Os;
class z0 {
  constructor(t, e) {
    m(this, wi, void 0);
    m(this, Os, void 0);
    // eslint-disable-next-line class-methods-use-this
    h(this, "getScreenShareConstraints", () => {
      var l, p, g, S, v, _, P, C, w, $, F;
      const t = (l = n(this, wi)) == null ? void 0 : l.screenshare, e = (g = (p = t == null ? void 0 : t.width) == null ? void 0 : p.max) != null ? g : 1920, r = (v = (S = t == null ? void 0 : t.height) == null ? void 0 : S.max) != null ? v : 1080, i = (P = (_ = t == null ? void 0 : t.frameRate) == null ? void 0 : _.max) != null ? P : 5;
      let a = (w = (C = t == null ? void 0 : t.frameRate) == null ? void 0 : C.ideal) != null ? w : 5;
      const o = t == null ? void 0 : t.displaySurface, c = t == null ? void 0 : t.selfBrowserSurface;
      n(this, Os).getValue("flagsmith").getValue(ee.VAL_MIN_FRAMERATE) && (a = parseInt(
        ($ = n(this, Os).getValue("flagsmith").getValue(ee.VAL_MIN_FRAMERATE)) == null ? void 0 : $.toString(),
        10
      ));
      let d = {
        width: { max: e },
        height: { max: r },
        frameRate: {
          ideal: a,
          max: i
        }
      };
      if (n(this, Os).getValue("flagsmith").hasFeature(ee.SCREENSHARE_CONSTRAINTS)) {
        const N = (F = n(this, Os).getValue("flagsmith").getValue(
          ee.SCREENSHARE_CONSTRAINTS
        )) == null ? void 0 : F.toString();
        d = JSON.parse(N);
      }
      return o !== void 0 && ["monitor", "browser", "window"].includes(o) && (d = H(D({}, d), { displaySurface: o })), c !== void 0 && (d = H(D({}, d), { selfBrowserSurface: c })), {
        audio: !0,
        video: d
      };
    });
    // eslint-disable-next-line class-methods-use-this
    h(this, "getAudioConstraints", (t) => {
      var a, o, c, d, l, p, g;
      const e = {}, r = (a = n(this, wi)) == null ? void 0 : a.audio, i = r != null && r.enableStereo ? 2 : 1;
      return ye.isFirefox() || ye.isWebKitBased() ? (e.audio = {
        deviceId: t,
        autoGainControl: (o = r == null ? void 0 : r.autoGainControl) != null ? o : !0,
        echoCancellation: (c = r == null ? void 0 : r.echoCancellation) != null ? c : !0,
        noiseSuppression: (d = r == null ? void 0 : r.noiseSupression) != null ? d : !0,
        channelCount: i
      }, e) : (e.audio = {
        autoGainControl: (l = r == null ? void 0 : r.autoGainControl) != null ? l : !0,
        echoCancellation: (p = r == null ? void 0 : r.echoCancellation) != null ? p : !0,
        noiseSuppression: (g = r == null ? void 0 : r.noiseSupression) != null ? g : !0,
        channelCount: i
      }, t && t !== "default" && (e.audio.deviceId = { exact: t }), e);
    });
    h(this, "getVideoConstraints", (t) => {
      var a, o, c, d;
      const e = {}, r = (a = n(this, wi)) == null ? void 0 : a.video;
      let i = gg.vga;
      if (typeof r == "string" ? i = gg[r] : r !== void 0 && (i.height.ideal = r.height.ideal, i.width.ideal = r.width.ideal), i.frameRate = {
        ideal: (c = (o = i.frameRate) == null ? void 0 : o.ideal) != null ? c : 24
      }, ye.isChromiumBased() && (i.frameRate.max = 30), n(this, Os).getValue("flagsmith").hasFeature(ee.VIDEO_CONSTRAINTS)) {
        const l = (d = n(this, Os).getValue("flagsmith").getValue(
          ee.VIDEO_CONSTRAINTS
        )) == null ? void 0 : d.toString();
        i = JSON.parse(l);
      }
      return e.video = i, typeof e.video == "boolean" || (t ? e.video.deviceId = { exact: t } : e.video.facingMode = "user"), e;
    });
    f(this, Os, t), f(this, wi, e);
  }
  // eslint-disable-next-line class-methods-use-this
  getUpdatedVideoConstraints(t) {
    return t;
  }
}
wi = new WeakMap(), Os = new WeakMap();
class hu extends Error {
  constructor(e, r, i) {
    super(r);
    h(this, "constraints");
    h(this, "name");
    this.name = e, this.constraints = i;
  }
}
class Y0 {
  constructor() {
    h(this, "permissions");
    this.permissions = {
      audio: "NOT_REQUESTED",
      video: "NOT_REQUESTED",
      screenshare: "NOT_REQUESTED"
    };
  }
  getAudioInputDevices(t) {
    return u(this, null, function* () {
      let e = t;
      return t || (e = yield this.getAvailableDevices()), e.filter((r) => r.kind === "audioinput");
    });
  }
  getVideoInputDevices(t) {
    return u(this, null, function* () {
      let e = t;
      return t || (e = yield this.getAvailableDevices()), e.filter((r) => r.kind === "videoinput");
    });
  }
  getAudioOutputDevices(t) {
    return u(this, null, function* () {
      let e = t;
      return t || (e = yield this.getAvailableDevices()), e.filter((r) => r.kind === "audiooutput");
    });
  }
}
var Q0 = Object.defineProperty, X0 = Object.getOwnPropertyDescriptor, Ms = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? X0(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && Q0(t, e, i), i;
}, Xn, Zt, Ne, Fg;
let Ht = (Fg = class extends Y0 {
  constructor(t, e) {
    super();
    /**
    	 * Only used for recognising device change
    	 */
    h(this, "availableDevices");
    m(this, Xn, void 0);
    m(this, Zt, void 0);
    m(this, Ne, void 0);
    f(this, Ne, t), f(this, Zt, new z0(t, e)), f(this, Xn, new AbortController()), this.availableDevices = [], this.getAvailableDevices();
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ne).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Ne).getValue("logger");
  }
  get constraintsBuilder() {
    return n(this, Zt);
  }
  destruct() {
    return u(this, null, function* () {
      var t;
      (t = n(this, Xn)) == null || t.abort();
    });
  }
  handlePermissionErrors(t, e) {
    const r = sd(t, e.name, e.message);
    return this.permissions[t] = r, n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_ERROR, {
      message: r,
      constraints: e.constraints,
      kind: t
    }), r;
  }
  getAudioAndVideoTrack(t, e) {
    return u(this, null, function* () {
      const r = {
        audio: n(this, Zt).getAudioConstraints(t).audio,
        video: n(this, Zt).getVideoConstraints(e).video
      };
      try {
        this.logger.info("getUserMediaWithoutTimeout::requesting_user_media", {
          constraints: JSON.stringify(r)
        });
        const i = yield navigator.mediaDevices.getUserMedia(
          r
        );
        this.logger.info("getUserMediaWithoutTimeout::received_user_media", {
          constraints: JSON.stringify(r)
        });
        const a = i.getAudioTracks()[0];
        let o = i.getVideoTracks()[0];
        if (this.permissions.audio = "ACCEPTED", this.permissions.video = "ACCEPTED", n(this, Ne).getValue("flagsmith").hasFeature(ee.OBS_QUALITY) && o.label.includes("OBS Virtual")) {
          const l = (yield this.getVideoInputDevices()).find((p) => p.label.includes("OBS Virtual"));
          o = yield this.getVideoTrack(l.deviceId);
        }
        return n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.audio,
          kind: "audio"
        }), n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.video,
          kind: "video"
        }), { audioTrack: a, videoTrack: o };
      } catch (i) {
        throw this.logger.error("WebMediaInterface.getAudioAndVideoTrack", { error: i }), new b("Couldnt fetch audio and video track", "1605");
      }
    });
  }
  getAudioTrack(t, e) {
    return u(this, null, function* () {
      let r = yield this.getAudioInputDevices();
      if (r.length === 0)
        throw this.permissions.audio = "NO_DEVICES_AVAILABLE", n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.audio,
          kind: "audio"
        }), new b("No audio devices available", "1606");
      const i = (a) => u(this, null, function* () {
        let o;
        try {
          r = r.filter((d) => d.deviceId !== a), o = n(this, Zt).getAudioConstraints(a), this.logger.info("getUserMediaWithoutTimeout::requesting_user_media", {
            constraints: JSON.stringify(o)
          });
          const [c] = (yield navigator.mediaDevices.getUserMedia(o)).getAudioTracks();
          return this.logger.info("getUserMediaWithoutTimeout::received_user_media", {
            constraints: JSON.stringify(o)
          }), c;
        } catch (c) {
          const d = sd(
            "audio",
            c.name,
            c.message
          ), l = new hu(c.name, c.message, o);
          if (d === "COULD_NOT_START") {
            const p = r.shift();
            if (!p)
              throw l;
            this.logger.info("getAudioTrack::gum_failed", {
              constraints: JSON.stringify(o),
              error: c
            });
            const g = n(this, Zt).getAudioConstraints(
              p.deviceId
            );
            return this.logger.info("getAudioTrack::retrying_gum_for_next_device", {
              constraints: JSON.stringify(g)
            }), i(p.deviceId);
          }
          throw l;
        }
      });
      try {
        const a = yield i(e);
        return a.enabled = !t, this.permissions.audio !== "ACCEPTED" && (this.permissions.audio = "ACCEPTED", n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.audio,
          kind: "audio"
        })), a;
      } catch (a) {
        throw a.constraints && this.handlePermissionErrors("audio", a), new b(a.message, "1601");
      }
    });
  }
  getVideoTrack(t) {
    return u(this, null, function* () {
      var c;
      const e = n(this, Ne).getValue("flagsmith").hasFeature(ee.OBS_QUALITY), r = (c = yield this.getCurrentDeviceLabel(t)) == null ? void 0 : c.includes("OBS Virtual"), i = e && r, a = yield this.getVideoInputDevices();
      if (a.length === 0)
        throw this.permissions.video = "NO_DEVICES_AVAILABLE", n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.video,
          kind: "video"
        }), new b("No video devices available", "1607");
      const o = (d) => u(this, null, function* () {
        try {
          let l = d;
          const { video: p } = l;
          i && typeof p != "boolean" && (l = {
            video: { deviceId: p.deviceId }
          }), this.logger.info("getUserMediaWithoutTimeout::requesting_user_media", {
            constraints: JSON.stringify(l)
          });
          const [g] = (yield navigator.mediaDevices.getUserMedia(l)).getVideoTracks();
          if (i && typeof p != "boolean" && typeof p.width == "object") {
            const { width: S, height: v } = g.getSettings(), { ideal: _ } = p.width;
            g.applyConstraints({
              width: { ideal: _ },
              height: { ideal: Math.floor(v * _ / S) },
              frameRate: p.frameRate
            });
          }
          return this.logger.info("getUserMediaWithoutTimeout::received_user_media", {
            constraints: JSON.stringify(l)
          }), g;
        } catch (l) {
          const p = sd(
            "video",
            l.name,
            l.message
          ), g = new hu(l.name, l.message, d);
          if (p === "COULD_NOT_START") {
            const S = a.shift();
            if (!S)
              throw g;
            this.logger.info("getVideoTrack::gum_failed", {
              constraints: JSON.stringify(d),
              error: l
            });
            const v = n(this, Zt).getVideoConstraints(
              S.deviceId
            );
            return this.logger.info("getVideoTrack::retrying_gum_for_next_device", {
              constraints: JSON.stringify(v)
            }), o({ video: v.video });
          }
          throw g;
        }
      });
      try {
        const d = n(this, Zt).getVideoConstraints(t), l = yield o(d);
        return this.permissions.video !== "ACCEPTED" && (this.permissions.video = "ACCEPTED", n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.video,
          kind: "video"
        })), l;
      } catch (d) {
        throw d.constraints && this.handlePermissionErrors("video", d), new b(d.message, "1602");
      }
    });
  }
  getScreenShareTracks() {
    return u(this, null, function* () {
      const t = (e) => u(this, null, function* () {
        try {
          this.logger.info("getDisplayMediaWithoutTimeout::requesting_display_media", {
            constraints: JSON.stringify(e)
          }), n(this, Ne).getValue("callstats").screenShareRequested();
          const r = yield navigator.mediaDevices.getDisplayMedia(
            e
          );
          return this.logger.info("getDisplayMediaWithoutTimeout::received_display_media", {
            constraints: JSON.stringify(e)
          }), r;
        } catch (r) {
          const i = sd(
            "video",
            r.name,
            r.message
          ), a = new hu(r.name, r.message, e), o = { video: !0 };
          if (ew(e, o) || !n(this, Ne).getValue("flagsmith").hasFeature(ee.SCREEENSHARE_CONSTRAINTS_RETRY))
            throw a;
          if (i === "COULD_NOT_START")
            return t(o);
          throw a;
        }
      });
      try {
        const e = n(this, Zt).getScreenShareConstraints(), r = yield t(e);
        return this.permissions.screenshare !== "ACCEPTED" && (this.permissions.screenshare = "ACCEPTED", n(this, Ne).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.permissions.screenshare,
          kind: "screenshare"
        })), {
          audioTrack: r.getAudioTracks()[0],
          videoTrack: r.getVideoTracks()[0]
        };
      } catch (e) {
        throw e.constraints && this.handlePermissionErrors("screenshare", e), new b(e.message, "1612");
      }
    });
  }
  getCurrentDeviceLabel(t) {
    return u(this, null, function* () {
      const e = yield this.getDevice(t || "default");
      return e == null ? void 0 : e.label;
    });
  }
  getAvailableDevices() {
    return u(this, null, function* () {
      try {
        const t = yield navigator.mediaDevices.enumerateDevices();
        return this.availableDevices = t, t;
      } catch (t) {
        throw this.logger.error("enumerate_devices_failed", {
          error: t
        }), new b("Failed to get available devices", "1609");
      }
    });
  }
  getAvailableDevicesByKind(t) {
    return u(this, null, function* () {
      try {
        return (yield navigator.mediaDevices.enumerateDevices()).filter(
          ({ kind: e }) => t === e
        );
      } catch (e) {
        throw this.logger.error("enumerate_devices_failed", {
          error: e
        }), new b("Failed to get available devices by kind", "1609");
      }
    });
  }
  getDevice(t) {
    return u(this, null, function* () {
      try {
        return (yield navigator.mediaDevices.enumerateDevices()).filter((r) => r.deviceId === t)[0];
      } catch (e) {
        throw this.logger.error("enumerate_devices_failed", {
          error: e
        }), new b("Failed to get device", "1609");
      }
    });
  }
  onDeviceChange(t) {
    return u(this, null, function* () {
      ye.supportsDeviceChangeEvent() && navigator.mediaDevices.addEventListener(
        "devicechange",
        (e) => u(this, null, function* () {
          var l, p;
          const r = (g) => `${g.kind}-${g.deviceId}-${g.groupId}`, i = this.availableDevices, a = new Set(
            i.map((g) => r(g))
          ), o = yield this.getAvailableDevices(), c = new Set(
            o.map((g) => r(g))
          ), d = {
            added: o.filter(
              (g) => !a.has(r(g))
            ),
            removed: i.filter(
              (g) => !c.has(r(g))
            ),
            devices: o
          };
          if ((l = d.added) != null && l.length || (p = d.removed) != null && p.length) {
            this.logger.info("repopulated_full_device_list", {
              devices: JSON.stringify(o)
            });
            const g = [...d.added, ...d.removed];
            g.some((S) => S.kind === "audioinput") && n(this, Ne).getValue("callstats").devices("AUDIO", o == null ? void 0 : o.filter((S) => S.kind === "audioinput")), g.some((S) => S.kind === "videoinput") && n(this, Ne).getValue("callstats").devices("VIDEO", o == null ? void 0 : o.filter((S) => S.kind === "videoinput")), g.some((S) => S.kind === "audiooutput") && n(this, Ne).getValue("callstats").devices("SPEAKER", o == null ? void 0 : o.filter((S) => S.kind === "audiooutput")), t(e, d, !1);
          }
        }),
        { signal: n(this, Xn).signal }
      );
    });
  }
}, Xn = new WeakMap(), Zt = new WeakMap(), Ne = new WeakMap(), Fg);
Ms([
  E.trace("WebMediaInterface.destruct")
], Ht.prototype, "destruct", 1);
Ms([
  E.trace("WebMediaInterface.handlePermissionErrors")
], Ht.prototype, "handlePermissionErrors", 1);
Ms([
  E.trace("WebMediaInterface.getAudioAndVideoTrack")
], Ht.prototype, "getAudioAndVideoTrack", 1);
Ms([
  E.trace("WebMediaInterface.getAudioTrack")
], Ht.prototype, "getAudioTrack", 1);
Ms([
  E.trace("WebMediaInterface.getVideoTrack")
], Ht.prototype, "getVideoTrack", 1);
Ms([
  E.trace("WebMediaInterface.getScreenShareTracks")
], Ht.prototype, "getScreenShareTracks", 1);
Ms([
  E.trace("WebMediaInterface.getAvailableDevices")
], Ht.prototype, "getAvailableDevices", 1);
Ms([
  E.trace("WebMediaInterface.getAvailableDevicesByKind")
], Ht.prototype, "getAvailableDevicesByKind", 1);
Ms([
  E.trace("WebMediaInterface.getDevice")
], Ht.prototype, "getDevice", 1);
Ms([
  E.trace("WebMediaInterface.onDeviceChange")
], Ht.prototype, "onDeviceChange", 1);
Ht = Ms([
  ut("1600")
], Ht);
const qf = Ht, Eo = {
  setItem: (s, t, e) => {
    try {
      localStorage.setItem(s, t);
    } catch (r) {
      e == null || e.error("LocalStorage::setItem::crashed", {
        error: r,
        localStorage: { key: s, value: t }
      });
    }
  },
  getItem: (s, t) => {
    try {
      return localStorage.getItem(s);
    } catch (e) {
      t == null || t.error("LocalStorage::getItem::crashed", {
        error: e,
        localStorage: { key: s }
      });
    }
    return null;
  }
}, Z0 = (s = 0) => new Promise(
  (t) => setTimeout(t, s)
), eD = (s, t, e) => {
  const r = typeof e == "number" ? e : 250, i = s.createMediaStreamSource(t), a = s.createAnalyser();
  a.fftSize = 2048, i.connect(a);
  const o = new Uint8Array(a.fftSize);
  let c = !1;
  setTimeout(() => {
    c = !0;
  }, r);
  function d() {
    return c ? Promise.resolve(!0) : (a.getByteTimeDomainData(o), o.some((l) => l !== 128 && l !== 0) ? Promise.resolve(!1) : Z0().then(d));
  }
  return d().then(
    (l) => (i.disconnect(), l),
    (l) => {
      throw i.disconnect(), l;
    }
  );
}, tD = typeof AudioContext != "undefined" ? AudioContext : null;
class xh {
  constructor(t) {
    h(this, "_AudioContext");
    h(this, "audioContext");
    h(this, "_audioContextRefContainers");
    const e = D({ AudioContext: tD }, t);
    Object.defineProperties(this, {
      _AudioContext: {
        value: e.AudioContext
      },
      audioContext: {
        value: null,
        writable: !0
      },
      _audioContextRefContainers: {
        value: /* @__PURE__ */ new Set()
      },
      AudioContextProvider: {
        enumerable: !0,
        value: xh
      }
    });
  }
  getOrCreate(t) {
    if (!this._audioContextRefContainers.has(t) && (this._audioContextRefContainers.add(t), this._AudioContext && !this.audioContext))
      try {
        this.audioContext = new this._AudioContext();
      } catch (e) {
      }
    return this.audioContext;
  }
  release(t) {
    this._audioContextRefContainers.has(t) && (this._audioContextRefContainers.delete(t), !this._audioContextRefContainers.size && this.audioContext && (this.audioContext.close(), this.audioContext = null));
  }
}
const mg = new xh(), sD = 3, rD = 250;
function iD(s) {
  const t = {}, e = mg.getOrCreate(
    t
  );
  let r = sD;
  function i() {
    return r -= 1, eD(e, s.srcObject, rD).then((a) => a ? r > 0 ? i() : !0 : !1).catch(() => !0);
  }
  return i().finally(() => {
    mg.release(t);
  });
}
function fg(s, t) {
  return u(this, null, function* () {
    const e = new Audio(), r = new MediaStream();
    r.addTrack(t), e.srcObject = r;
    let i = !1;
    try {
      const a = e.play();
      a && (yield a), i = yield iD(e), i && s.info("checkIfAudioTrackIsSilent::silence_detected");
    } catch (a) {
      s.error("checkIfAudioTrackIsSilent::failed_to_detect_silence", {
        error: a
      });
    } finally {
      e.pause(), e.remove();
    }
    return i;
  });
}
var nD = Object.defineProperty, aD = Object.getOwnPropertyDescriptor, jf = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? aD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && nD(t, e, i), i;
};
let kd = class extends Ua {
  /**
   * Allows creation of an instance of BaseMediaHandler with a track.
   * We initialize it with a track when we want to enable streams on init.
   * @param mediaInterface
   * @param mediaTrack
   */
  constructor(t, e, r, i) {
    var o;
    const a = t.getValue("logger");
    super(a);
    h(this, "constructorName", this.constructor.name);
    // Will be set in case user has explicity used Self.setDevice
    // to set the device.
    h(this, "userSelectedDevice");
    h(this, "mediaInterface");
    h(this, "isNonPreferredDevice");
    h(this, "_mediaTrack");
    h(this, "transformedMediaTrack");
    h(this, "middlewares", []);
    h(this, "currentDevice");
    h(this, "userPreferredDeviceKey", `Realtimekit::${this.constructorName}::UserDeviceID`);
    h(this, "setUserPreferredDevice", (t) => Eo.setItem(
      this.userPreferredDeviceKey,
      t,
      this.logger
    ));
    h(this, "getUserPreferredDevice", () => Eo.getItem(
      this.userPreferredDeviceKey,
      this.logger
    ));
    h(this, "isCustomTrack", !1);
    h(this, "context");
    this.context = t, this.mediaInterface = e, r && this.setMediaTrack(r), this.userSelectedDevice = (o = this.getUserPreferredDevice()) != null ? o : void 0, this.isNonPreferredDevice = i, this.onTrackEnded = this.onTrackEnded.bind(this), this.onTrackMuted = this.onTrackMuted.bind(this);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return this.context.getValue("telemetry");
  }
  /**
   * NOTE(roerohan): DO NOT use this.#mediaTrack anywhere else,
   * except for these 3 functions below.
   */
  /**
   * Cleans up all acquired tracks.
   */
  disableTrack() {
    var t, e;
    this.removeMediaTrackListeners(), this.isCustomTrack || (t = this._mediaTrack) == null || t.stop(), this._mediaTrack = void 0, (e = this.transformedMediaTrack) == null || e.stop(), this.transformedMediaTrack = void 0;
  }
  get mediaTrack() {
    return this._mediaTrack;
  }
  setMediaTrack(t, e = !1) {
    return u(this, null, function* () {
      const r = (i) => {
        this.logger.error(`${this.constructorName}.setMediaTrack.error`, {
          error: i
        });
      };
      try {
        this.disableTrack();
      } catch (i) {
        r(i);
      }
      this._mediaTrack = yield this.conditionallyChangeTrack(t, e), yield this.setTransformedTrack();
      try {
        this.addMediaTrackListeners(), yield this.setCurrentDevice();
      } catch (i) {
        r(i);
      }
    });
  }
  /**
   * Represents current audio/video state according to track status
   */
  get trackEnabled() {
    return !!this.mediaTrack && this.mediaTrack.readyState === "live" && this.mediaTrack.enabled;
  }
  /**
   * Mutes track if it's present, DOES NOT STOP IT!
   * Only used for audio streams
   */
  muteTrack() {
    if (!this.mediaTrack) {
      this.logger.warn(
        "BaseMediaHandler.muteTrack Tried muting with no track present"
      );
      return;
    }
    this.transformedMediaTrack && (this.transformedMediaTrack.enabled = !1), this.mediaTrack.enabled = !1;
  }
  unmuteTrack() {
    return u(this, null, function* () {
      try {
        this.mediaTrack ? this.mediaTrack.enabled = !0 : yield this.enableTrack(!1);
      } catch (t) {
        throw this.logger.error(`${this.constructorName}.unmuteTrack.error`, {
          error: t
        }), this.disableTrack(), new b("Failed to unmute track", "1611");
      }
    });
  }
  // NOTE(ishita1805): Not to be used for screenshare or audiooutput
  getCurrentDeviceId() {
    var e;
    const { kind: t } = this.mediaTrack;
    switch (t) {
      case "audio": {
        const { deviceId: r } = this.mediaTrack.getSettings();
        if (r)
          return r;
        const i = this.mediaTrack.getConstraints();
        return this.userSelectedDevice ? (i && typeof i.deviceId == "object" && "exact" in i.deviceId ? i.deviceId.exact : i.deviceId) || ((e = i == null ? void 0 : i.advanced) == null ? void 0 : e[0].deviceId) || "default" : this.mediaTrack.getSettings().deviceId;
      }
      default:
        return this.mediaTrack.getSettings().deviceId;
    }
  }
  /**
   * Called after every track switch, maintains local state of current
   * selected device for this particular stream.
   */
  setCurrentDevice() {
    return u(this, null, function* () {
      var e;
      if (!this.mediaTrack) {
        this.currentDevice = void 0;
        return;
      }
      const t = this.getCurrentDeviceId();
      ((e = this.currentDevice) == null ? void 0 : e.deviceId) !== t && (this.currentDevice = yield this.mediaInterface.getDevice(t));
    });
  }
  setDevice(t) {
    return u(this, null, function* () {
      if (!t)
        throw this.logger.warn(`${this.constructorName}.setDevice No device received`), new b("No device received!", "1603");
      this.userSelectedDevice = t.deviceId, this.setUserPreferredDevice(t.deviceId), yield this.onSetDevice(t);
    });
  }
  /**
   * Middleware Utility
   */
  addMiddleware(t) {
    return u(this, null, function* () {
      if (ye.isWebKitBased() && !rP.hasFeature(ee.ALLOW_SAFARI_MEDIA_MIDDLEWARES))
        return {
          success: !1,
          message: "Middlewares are not supported in this WebKit engine based browser."
        };
      if (this.middlewares.includes(t))
        return {
          success: !1,
          message: "This middleware has been applied, already. Skipping."
        };
      try {
        return this.middlewares.push(t), this.trackEnabled && (yield this.setTransformedTrack()), { success: !0, message: "Successfully added the middleware." };
      } catch (e) {
        return this.logger.error("While adding middleware", { error: e }), this.removeMiddleware(t), { success: !1, message: e == null ? void 0 : e.message };
      }
    });
  }
  removeMiddleware(t) {
    return u(this, null, function* () {
      const e = this.middlewares.indexOf(t, 0);
      if (e > -1)
        try {
          return this.middlewares.splice(e, 1), yield this.setTransformedTrack(!0), {
            success: !0,
            message: "Successfully removed the middleware."
          };
        } catch (r) {
          return this.logger.error("While removing middleware", { error: r }), { success: !1, message: r == null ? void 0 : r.message };
        }
      return {
        success: !1,
        message: "No such middleware was found. Skipping."
      };
    });
  }
  removeAllMiddlewares() {
    return u(this, null, function* () {
      var t;
      if ((t = this.middlewares) != null && t.length)
        try {
          return this.middlewares = [], yield this.setTransformedTrack(!0), {
            success: !0,
            message: "Successfully removed all the middlewares."
          };
        } catch (e) {
          return this.logger.error("While removing all the middlewares", { error: e }), { success: !1, message: e == null ? void 0 : e.message };
        }
      return {
        success: !1,
        message: "No middlewares were found. Skipping."
      };
    });
  }
  addMediaTrackListeners() {
    var t, e, r;
    this.mediaTrack && (this.logger.info(
      `${this.constructorName}.addMediaTrackListeners for deviceId ${(e = (t = this.mediaTrack) == null ? void 0 : t.getSettings()) == null ? void 0 : e.deviceId} of type ${(r = this.mediaTrack) == null ? void 0 : r.kind}`
    ), this.mediaTrack.addEventListener("ended", this.onTrackEnded), this.mediaTrack.addEventListener("mute", this.onTrackMuted));
  }
  removeMediaTrackListeners() {
    var t, e, r;
    this.mediaTrack && (this.logger.info(
      `${this.constructorName}.removeMediaTrackListeners for deviceId ${(e = (t = this.mediaTrack) == null ? void 0 : t.getSettings()) == null ? void 0 : e.deviceId} of type ${(r = this.mediaTrack) == null ? void 0 : r.kind}`
    ), this.logger.info(`${this.constructorName}.removeMediaTrackListeners`), this.mediaTrack.removeEventListener("ended", this.onTrackEnded), this.mediaTrack.removeEventListener("mute", this.onTrackMuted));
  }
};
jf([
  E.trace("BaseMediaHandler.unmuteTrack")
], kd.prototype, "unmuteTrack", 1);
kd = jf([
  ut("1600")
], kd);
const Gf = kd;
var oD = Object.defineProperty, cD = Object.getOwnPropertyDescriptor, Uh = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? cD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && oD(t, e, i), i;
};
const pu = "[Realtimekit]nonSilentDeviceLabels";
class ql extends Gf {
  onSetDevice(t) {
    return u(this, null, function* () {
      if (!t)
        throw this.logger.warn("AudioMediaHandler.setDevice No device received"), new b("No device received!", "1603");
      if (t.kind !== "audioinput")
        throw this.logger.warn("AudioMediaHandler.setDevice Received non audio device"), new b(
          "Non audio device received while setting device!",
          "1603"
        );
      try {
        const e = this.trackEnabled;
        yield this.setMediaTrack(
          yield this.mediaInterface.getAudioTrack(
            !e,
            this.userSelectedDevice
          )
        );
      } catch (e) {
        throw this.logger.error("AudioMediaHandler.setDevice.error", {
          error: e
        }), this.disableTrack(), new b(e.message, "1604");
      }
    });
  }
  enableTrack(t, e) {
    return u(this, null, function* () {
      if (this.trackEnabled) {
        this.logger.warn("AudioMediaHandler.enableTrack Track already enabled!");
        return;
      }
      if (e) {
        this.isCustomTrack = !0, yield this.setMediaTrack(e, !0);
        return;
      }
      this.isCustomTrack = !1;
      const r = yield this.mediaInterface.getAudioTrack(
        t,
        this.userSelectedDevice
      );
      yield this.setMediaTrack(r);
    });
  }
  setTransformedTrack(t) {
    return u(this, null, function* () {
      var e;
      if (!t && !((e = this.middlewares) != null && e.length)) {
        this.transformedMediaTrack = this.mediaTrack;
        return;
      }
      try {
        this.transformedMediaTrack = yield q0(
          this.context,
          this.middlewares,
          this.mediaTrack
        ), this.emit("trackChanged");
      } catch (r) {
        this.logger.error("AudioMediaHandler.setTransformedTrack", {
          error: r
        }), this.transformedMediaTrack = this.mediaTrack;
      }
    });
  }
  onTrackEnded() {
    return u(this, null, function* () {
      this.logger.info("AudioMediaHandler.TrackEnded"), this.emit("trackEnded");
      const t = this.mediaTrack.enabled;
      this.disableTrack(), yield this.enableTrack(!t), yield this.setTransformedTrack(), this.emit("trackChanged");
    });
  }
  onTrackMuted() {
    this.logger.info("AudioMediaHandler.TrackMuted"), this.emit("trackMuted");
  }
  conditionallyChangeTrack(t, e = !1) {
    return u(this, null, function* () {
      var d;
      if (!t || this.userSelectedDevice || e)
        return t;
      let r = t;
      const i = yield this.mediaInterface.getAudioInputDevices(), a = this.isNonPreferredDevice ? i.filter((l) => l && !this.isNonPreferredDevice(l)) : i;
      if (!(a != null && a.length))
        return r;
      a.find(
        (l) => l.deviceId === t.getSettings().deviceId
      ) || (r.stop(), this.logger.info("localmediahandler::setupstreams::found_audio_non_preferred"), r = yield this.mediaInterface.getAudioTrack(
        !1,
        a[0].deviceId
      ));
      const o = JSON.parse(
        Eo.getItem(pu, this.logger)
      );
      if (o != null && o.devices.some(
        (l) => l.label === r.label
      ))
        return r;
      if (!(yield fg(this.logger, r))) {
        const l = (d = o == null ? void 0 : o.devices.concat({
          label: r.label
        })) != null ? d : [{ label: r.label }];
        return Eo.setItem(pu, JSON.stringify({
          devices: l
        }), this.logger), r;
      }
      this.logger.info("AudioMediaHandler.conditionallyChangeTrack.DetectedSilentTrack");
      const c = r.getSettings().deviceId;
      return a.filter((l) => l.deviceId !== c).some((l) => u(this, null, function* () {
        var p;
        if (r = yield this.mediaInterface.getAudioTrack(
          !1,
          l.deviceId
        ), !(yield fg(this.logger, r))) {
          const g = (p = o == null ? void 0 : o.devices.concat({
            label: r.label
          })) != null ? p : [{ label: r.label }];
          return Eo.setItem(pu, JSON.stringify({
            devices: g
          }), this.logger), this.logger.info("AudioMediaHandler.conditionallyChangeTrack.SuccesfullyChangedTrack"), !0;
        }
        return this.logger.info("AudioMediaHandler.conditionallyChangeTrack.AnotherSilentTrackFound"), !1;
      })), r;
    });
  }
}
Uh([
  E.trace("AudioMediaHandler.setTransformedTrack")
], ql.prototype, "setTransformedTrack", 1);
Uh([
  E.trace("AudioMediaHandler.onTrackEnded")
], ql.prototype, "onTrackEnded", 1);
Uh([
  E.trace("AudioMediaHandler.conditionallyChangeTrack")
], ql.prototype, "conditionallyChangeTrack", 1);
const dD = ql;
var Zn;
class lD {
  constructor(t) {
    m(this, Zn, void 0);
    h(this, "currentDevice");
    f(this, Zn, t);
  }
  setupSpeaker(t) {
    return u(this, null, function* () {
      var i, a;
      if (!(n(this, Zn) instanceof qf))
        return;
      let e = t;
      if (t || ([e] = (yield n(this, Zn).getAvailableDevicesByKind(
        "audiooutput"
      )).filter((c) => !Bu(c))), !e)
        throw new b("No speaker found", "1608");
      if (((i = this.currentDevice) == null ? void 0 : i.deviceId) === e.deviceId)
        return;
      this.currentDevice = e;
      const r = document.querySelectorAll("audio");
      (a = r[0]) != null && a.setSinkId && r.forEach((o) => u(this, null, function* () {
        if (typeof o.sinkId != "undefined" && this.currentDevice.deviceId && o.sinkId !== this.currentDevice.deviceId)
          try {
            yield o.setSinkId(this.currentDevice.deviceId);
          } catch (c) {
          }
      }));
    });
  }
}
Zn = new WeakMap();
const uD = lD;
var Go;
class hD extends Ua {
  constructor(e, r) {
    const i = e.getValue("logger");
    super(i);
    h(this, "mediaInterface");
    h(this, "audioMediaTrack");
    h(this, "videoMediaTrack");
    m(this, Go, void 0);
    f(this, Go, e), this.mediaInterface = r;
  }
  get trackEnabled() {
    return !!this.videoMediaTrack;
  }
  enableScreenShare() {
    return u(this, null, function* () {
      var e, r;
      try {
        const { audioTrack: i, videoTrack: a } = yield this.mediaInterface.getScreenShareTracks();
        if (this.audioMediaTrack = i, this.videoMediaTrack = a, this.addMediaTrackListeners(), ((r = (e = this.mediaInterface) == null ? void 0 : e.permissions) == null ? void 0 : r.screenshare) === "ACCEPTED")
          return;
        this.mediaInterface.permissions && (this.mediaInterface.permissions.screenshare = "ACCEPTED", n(this, Go).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, {
          message: this.mediaInterface.permissions.screenshare,
          kind: "screenshare"
        }));
      } catch (i) {
      }
    });
  }
  disableScreenShare() {
    var e, r;
    this.removeMediaTrackListeners(), (e = this.audioMediaTrack) == null || e.stop(), (r = this.videoMediaTrack) == null || r.stop(), this.videoMediaTrack = void 0, this.audioMediaTrack = void 0;
  }
  updateConstraints(e) {
    return u(this, null, function* () {
      if (!this.videoMediaTrack)
        throw new b("No media track enabled!", "1610");
      const r = this.mediaInterface;
      if (!r.constraintsBuilder)
        throw new b("update constraints not supported for non web clients", "1100", this.logger);
      try {
        this.videoMediaTrack.applyConstraints(
          r.constraintsBuilder.getUpdatedVideoConstraints(e)
        ), this.addMediaTrackListeners();
      } catch (i) {
        this.logger.error("ScreenShareHandler.updateConstraints.error", {
          error: i
        });
      }
    });
  }
  addMediaTrackListeners() {
    var e, r;
    (e = this.videoMediaTrack) == null || e.addEventListener(
      "ended",
      this.onTrackEnded.bind(this)
    ), ye.isWebKitBased() && ((r = this.videoMediaTrack) == null || r.addEventListener(
      "mute",
      this.onTrackEnded.bind(this)
    ));
  }
  removeMediaTrackListeners() {
    var e, r;
    (e = this.videoMediaTrack) == null || e.removeEventListener("ended", this.onTrackEnded), (r = this.videoMediaTrack) == null || r.removeEventListener("mute", this.onTrackEnded);
  }
  onTrackEnded() {
    this.emit("trackEnded");
  }
}
Go = new WeakMap();
const pD = hD;
var gD = Object.defineProperty, mD = Object.getOwnPropertyDescriptor, jl = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? mD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && gD(t, e, i), i;
}, ea, Wo;
class jc extends Gf {
  constructor(e, r, i, a) {
    super(e, r, i, a);
    m(this, ea, void 0);
    m(this, Wo, {
      disablePerFrameCanvasRendering: !1
    });
    f(this, ea, new j0(e));
  }
  onSetDevice(e) {
    return u(this, null, function* () {
      if (!e)
        throw this.logger.warn("VideoMediaHandler.setDevice No device received"), new b("No device received!", "1603");
      if (e.kind !== "videoinput")
        throw this.logger.warn("VideoMediaHandler.setDevice Received non video device", {
          devices: [e]
        }), new b(
          "Non video device received while setting video device!",
          "1603"
        );
      if (!(this.mediaTrack && this.mediaTrack.enabled)) {
        this.logger.warn(
          "VideoMediaHandler.setDevice Tried switching device with video disabled",
          {
            devices: [e]
          }
        ), this.currentDevice = e;
        return;
      }
      try {
        yield this.setMediaTrack(
          yield this.mediaInterface.getVideoTrack(this.userSelectedDevice)
        );
      } catch (r) {
        throw this.logger.error("VideoMediaHandler.setDevice.error", {
          error: r
        }), this.disableTrack(), new b("Failed to change device", "1600", this.logger);
      }
    });
  }
  enableTrack(e, r) {
    return u(this, null, function* () {
      if (this.trackEnabled) {
        this.logger.warn("VideoMediaHandler.enableTrack Track already enabled!");
        return;
      }
      if (r) {
        this.isCustomTrack = !0, yield this.setMediaTrack(r, !0);
        return;
      }
      this.isCustomTrack = !1;
      const i = yield this.mediaInterface.getVideoTrack(
        this.userSelectedDevice
      );
      yield this.setMediaTrack(i);
    });
  }
  setTransformedTrack(e) {
    return u(this, null, function* () {
      var r;
      if (!e && !((r = this.middlewares) != null && r.length)) {
        this.transformedMediaTrack = this.mediaTrack;
        return;
      }
      try {
        this.transformedMediaTrack = yield n(this, ea).getTransformedVideoTrack(
          this.middlewares,
          this.mediaTrack,
          n(this, Wo)
        ), this.emit("trackChanged");
      } catch (i) {
        this.logger.error("VideoMediaHandler.setTransformedTrack", {
          error: i
        }), this.transformedMediaTrack = this.mediaTrack;
      }
    });
  }
  setVideoMiddlewareGlobalConfig(e) {
    return u(this, null, function* () {
      f(this, Wo, e);
    });
  }
  updateConstraints(e) {
    return u(this, null, function* () {
      if (!this._mediaTrack)
        throw new b("No media track enabled!", "1610");
      const r = this.mediaInterface;
      if (!r.constraintsBuilder)
        throw new b("update constraints not supported for non web clients", "1100", this.logger);
      try {
        this._mediaTrack.applyConstraints(
          r.constraintsBuilder.getUpdatedVideoConstraints(e)
        ), yield this.setTransformedTrack(), this.addMediaTrackListeners(), yield this.setCurrentDevice();
      } catch (i) {
        this.logger.error("VideoMediaHandler.updateConstraints.error", {
          error: i
        });
      }
    });
  }
  terminateMiddlewareWebWorker() {
    n(this, ea).terminateMiddlewareWebWorker();
  }
  onTrackEnded() {
    return u(this, null, function* () {
      this.logger.info("VideoMediaHandler.TrackEnded"), this.disableTrack(), this.emit("trackEnded");
    });
  }
  onTrackMuted() {
    this.logger.info("VideoMediaHandler.TrackMuted"), this.emit("trackMuted");
  }
  conditionallyChangeTrack(e, r = !1) {
    return u(this, null, function* () {
      if (!e || this.userSelectedDevice || r)
        return e;
      let i = e;
      const a = yield this.mediaInterface.getVideoInputDevices(), o = this.isNonPreferredDevice ? a.filter((c) => !this.isNonPreferredDevice(
        c
      )) : a;
      return !(o != null && o.length) || window.FAST_RTK || o.find(
        (c) => c.deviceId === e.getSettings().deviceId
      ) || (i.stop(), this.logger.info("localmediahandler::setupstreams::found_video_non_preferred"), i = yield this.mediaInterface.getVideoTrack(
        o[0].deviceId
      )), i;
    });
  }
}
ea = new WeakMap(), Wo = new WeakMap();
jl([
  E.trace("VideoMediaHandler.setTransformedTrack")
], jc.prototype, "setTransformedTrack", 1);
jl([
  E.trace("VideoMediaHandler.setVideoMiddlewareGlobalConfig")
], jc.prototype, "setVideoMiddlewareGlobalConfig", 1);
jl([
  E.trace("VideoMediaHandler.onTrackEnded")
], jc.prototype, "onTrackEnded", 1);
jl([
  E.trace("VideoMediaHandler.conditionallyChangeTrack")
], jc.prototype, "conditionallyChangeTrack", 1);
const fD = jc, Sg = Rs(
  Rh()
);
var Ct, Ri, Jo, ta;
const Cn = class {
  constructor(t) {
    m(this, Ct, void 0);
    m(this, Ri, void 0);
    m(this, Jo, void 0);
    m(this, ta, void 0);
    if (!t)
      throw new b("Could not load preset.", "0904");
    f(this, Ct, t.config), f(this, Jo, t.name), f(this, Ri, t.ui || Rs(Rh().ui)), f(this, ta, t.permissions.plugins.config);
  }
  /** @deprecated. Use init() */
  static fromResponse(t) {
    return new Cn(t);
  }
  /** @deprecated. Use init() */
  static default() {
    return new Cn(Sg);
  }
  static init(t, e = !0) {
    return !t || e ? new Cn(Sg) : new Cn(t);
  }
  /**
   * @deprecated
   * The `setupScreen` represents the setup screen for the meeting.
   */
  get setupScreen() {
    return {
      isEnabled: !0
    };
  }
  /**
   * @deprecated
   * The `waitingRoom` contains the properties to show a layout when
   * the participant is in waiting to join the meeting.
   */
  get waitingRoom() {
    return {
      isEnabled: !0
    };
  }
  /**
   * @deprecated
   * The `controlBar` contains the properties to show the meeting control bar with
   * various action buttons for the meeting.
   * The `elements` key contains the various action buttons.
   */
  get controlBar() {
    return {
      isEnabled: !0,
      elements: {
        chat: !0,
        fullscreen: !0,
        invite: !1,
        layout: !1,
        participants: !0,
        plugins: !0,
        polls: !0,
        reactions: !1,
        screenshare: !0
      }
    };
  }
  /**
   * @deprecated
   * The `header` contains the properties to show the meeting header with various elements.
   * The `elements` key contains the following properties
   * `logo` - string value representing the public URL for the logo
   * `timer` - boolean value suggesting if the timer should be shown
   * `title` - boolean value suggesting if the meeting title should be shown
   * `participantCount` - boolean value suggesting if the participant count shuld be shown
   * `changeLayout` - boolean value suggesting if the participant can change layout
   */
  get header() {
    return {
      isEnabled: !0,
      elements: {
        logo: n(this, Ri).designTokens.logo,
        timer: !0,
        title: !0,
        participantCount: !0,
        changeLayout: !1
      }
    };
  }
  /**
   * @deprecated
   * The `pipMode` property returns a boolean value
   * If true, picture-in-picture mode is enabled for the participant.
   */
  get pipMode() {
    return !0;
  }
  /**
   * The `viewType` tells the type of the meeting
   * possible values are: GROUP_CALL| LIVESTREAM | CHAT | AUDIO_ROOM
   */
  get viewType() {
    return n(this, Ct).viewType;
  }
  /**
   * The `livestreamViewerQualities` specifies the allowed qualities of a stream,
   * that can be viewed by a livestream viewer
   * */
  get livestreamViewerQualities() {
    return n(this, Ct).livestreamViewerQualities || [];
  }
  /**
   * The `maxVideoStreams` contains the maximum video
   * streams for mobile and desktop
   */
  get maxVideoStreams() {
    return n(this, Ct).maxVideoStreams;
  }
  /**
   * The `maxScreenShareCount` contains the maximum
   * possible concurrent screen shares
   */
  get maxScreenShareCount() {
    return n(this, Ct).maxScreenshareCount;
  }
  /**
   * @deprecated in favour of permissions.plugins.config
   */
  get plugins() {
    return [];
  }
  /**
   * The `disabledPlugins` property returns id of all disabled plugins
   */
  get disabledPlugins() {
    return Object.keys(n(this, ta)).filter((t) => n(this, ta)[t].disabled);
  }
  get designTokens() {
    return n(this, Ri).designTokens;
  }
  get configDiff() {
    return n(this, Ri).configDiff;
  }
  get mediaConstraints() {
    var t, e, r, i, a, o, c, d, l, p, g, S, v, _, P, C, w, $, F, N, B, G, re, tt;
    return {
      audio: {
        enableStereo: (i = (r = (e = (t = n(this, Ct)) == null ? void 0 : t.media) == null ? void 0 : e.audio) == null ? void 0 : r.enableStereo) != null ? i : fn.audio.enableStereo,
        enableHighBitrate: (d = (c = (o = (a = n(this, Ct)) == null ? void 0 : a.media) == null ? void 0 : o.audio) == null ? void 0 : c.enableHighBitrate) != null ? d : fn.audio.enableHighBitrate
      },
      video: {
        quality: (S = (g = (p = (l = n(this, Ct)) == null ? void 0 : l.media) == null ? void 0 : p.video) == null ? void 0 : g.quality) != null ? S : fn.video.quality,
        frameRate: (C = (P = (_ = (v = n(this, Ct)) == null ? void 0 : v.media) == null ? void 0 : _.video) == null ? void 0 : P.frameRate) != null ? C : fn.video.frameRate
      },
      screenshare: {
        quality: (N = (F = ($ = (w = n(this, Ct)) == null ? void 0 : w.media) == null ? void 0 : $.screenshare) == null ? void 0 : F.quality) != null ? N : fn.screenshare.quality,
        frameRate: (tt = (re = (G = (B = n(this, Ct)) == null ? void 0 : B.media) == null ? void 0 : G.screenshare) == null ? void 0 : re.frameRate) != null ? tt : fn.screenshare.frameRate
      }
    };
  }
  get name() {
    return n(this, Jo);
  }
};
let Hu = Cn;
Ct = new WeakMap(), Ri = new WeakMap(), Jo = new WeakMap(), ta = new WeakMap();
var SD = Object.defineProperty, vD = Object.getOwnPropertyDescriptor, Wf = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? vD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && SD(t, e, i), i;
}, sa, Ko;
class $h extends qt {
  constructor(e, r) {
    const i = e.getValue("logger");
    super(i);
    m(this, sa, void 0);
    h(this, "state", "IDLE");
    h(this, "playbackUrl");
    h(this, "ingestionCredentials");
    h(this, "viewerCount");
    m(this, Ko, void 0);
    f(this, sa, r), f(this, Ko, e), this.viewerCount = 0;
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ko).getValue("telemetry");
  }
  setLivestreamState(e) {
    const r = this.state;
    this.state = e, r !== e && this.emitCurrentLivestreamState();
  }
  emitCurrentLivestreamState() {
    this.emit("livestreamUpdate", this.state);
  }
  start() {
    return u(this, arguments, function* (e = {
      manualIngestion: !1
    }) {
      if (!n(this, sa).permissions.canLivestream)
        throw this.logger.error("Livestream::start::permission_denied"), new b(
          "User does not have permission to start livestreaming",
          "1901"
        );
      this.setLivestreamState("STARTING");
      try {
        const r = dt(), {
          playbackUrl: i,
          ingestionCredentials: a
        } = yield r.startLivestreaming(e);
        this.playbackUrl = i, this.ingestionCredentials = a, e != null && e.manualIngestion && this.setLivestreamState("WAITING_ON_MANUAL_INGESTION");
      } catch (r) {
        throw this.logger.error("Recording::stop::livestream_failed_to_start", {
          error: r
        }), this.setLivestreamState("IDLE"), new b("Error while starting livestream", "1900", this.logger);
      }
    });
  }
  stop() {
    return u(this, null, function* () {
      if (!n(this, sa).permissions.canLivestream)
        throw this.logger.error("Livestream::stop::permission_denied"), new b(
          "User does not have permission to stop livestreaming",
          "1901"
        );
      if (this.state !== "LIVESTREAMING" && this.state !== "WAITING_ON_MANUAL_INGESTION")
        throw this.logger.error("Livestream::stop::inconsistent_state"), new b("Livestream not started yet", "1902");
      try {
        this.setLivestreamState("STOPPING"), yield dt().stopLivestreaming();
      } catch (e) {
        throw this.logger.error("Livestream::stop::livestream_failed_to_stop", {
          error: e
        }), this.setLivestreamState("STOPPING"), new b("Error while stopping livestream", "1900", this.logger);
      }
    });
  }
}
sa = new WeakMap(), Ko = new WeakMap();
Wf([
  E.trace("livestream.start")
], $h.prototype, "start", 1);
Wf([
  E.trace("livestream.stop")
], $h.prototype, "stop", 1);
var TD = Object.defineProperty, yD = Object.getOwnPropertyDescriptor, ED = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? yD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && TD(t, e, i), i;
}, ra, ia, Zs, Ns;
class Jf {
  constructor(t, e, r) {
    h(this, "livestream");
    m(this, ra, void 0);
    m(this, ia, void 0);
    m(this, Zs, void 0);
    m(this, Ns, void 0);
    f(this, Ns, t), f(this, ia, e), this.livestream = new $h(t, e), f(this, Zs, r), this.setupEvents();
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Ns).getValue("logger");
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ns).getValue("telemetry");
  }
  fetchInitialLivestreamingState() {
    return u(this, null, function* () {
      const t = dt(), {
        status: e,
        playbackUrl: r,
        manualIngest: i,
        ingestionCredentials: a
      } = yield t.getActiveLivestream();
      this.livestream.playbackUrl = r, this.livestream.ingestionCredentials = a, e === "LIVE" && this.livestream.setLivestreamState("LIVESTREAMING"), e === "INVOKED" && i && this.livestream.setLivestreamState("WAITING_ON_MANUAL_INGESTION");
    });
  }
  setupEvents() {
    n(this, Zs).on(
      U.startedLivestream,
      (t) => u(this, null, function* () {
        this.livestream.playbackUrl = t.playbackUrl, this.livestream.setLivestreamState("LIVESTREAMING");
        try {
          n(this, ia).permissions.canLivestream && (yield this.fetchInitialLivestreamingState());
        } catch (e) {
          this.logger.error("Error: LivestreamController.fetchLivestream during startedLivestream re-fetch");
        }
      })
    ), n(this, Zs).on(
      U.livestreamingInvoked,
      (t) => u(this, null, function* () {
        if (t.manualIngest) {
          this.livestream.setLivestreamState("WAITING_ON_MANUAL_INGESTION");
          try {
            n(this, ia).permissions.canLivestream && (yield this.fetchInitialLivestreamingState());
          } catch (e) {
            this.logger.error("Error: LivestreamController.fetchLivestream during livestreamingInvoked re-fetch");
          }
        }
      })
    ), n(this, Zs).on(U.stoppedLivestream, () => {
      this.livestream.setLivestreamState("IDLE"), this.livestream.playbackUrl = void 0, this.livestream.ingestionCredentials = void 0;
    }), n(this, Zs).on(U.erroredLivestream, () => {
      this.livestream.setLivestreamState("IDLE"), this.livestream.playbackUrl = void 0;
    }), n(this, Zs).on(
      U.roomPeerCount,
      (t) => {
        this.livestream.viewerCount = t.count, this.livestream.emit("viewerCountUpdate", t.count);
      }
    ), n(this, Ns).getValue("peerSessionStore").on(
      k.PEER_JOINED_INTERNAL,
      (t) => u(this, null, function* () {
        var e;
        ((e = t.flags) == null ? void 0 : e.hiddenParticipant) === !0 && t.recorderType === "LIVESTREAMER" && (f(this, ra, t.id), this.livestream.setLivestreamState("LIVESTREAMING"));
      })
    ), n(this, Ns).getValue("peerSessionStore").on(k.PEER_CLOSED, (t) => {
      t.id === n(this, ra) && (f(this, ra, void 0), this.livestream.setLivestreamState("IDLE"));
    }), n(this, Ns).getValue("peerSessionStore").onAsync(k.LEAVE_MEDIA_ROOM, () => u(this, null, function* () {
      if (!this.livestream.playbackUrl) {
        this.logger.info("Fetching livestreaming state on leave stage");
        try {
          yield this.fetchInitialLivestreamingState();
        } catch (t) {
          this.logger.error("Failed to fetch livestreaming state on leave stage", { error: t });
        }
      }
    })), n(this, Ns).getValue("peerSessionStore").on(k.SOCKET_SERVICE_ROOM_JOINED, () => u(this, null, function* () {
      try {
        yield this.fetchInitialLivestreamingState();
      } catch (t) {
        this.logger.error("Error: LivestreamController.fetchLivestream");
      }
    }));
  }
}
ra = new WeakMap(), ia = new WeakMap(), Zs = new WeakMap(), Ns = new WeakMap();
ED([
  E.trace("LivestreamController.setupEvents")
], Jf.prototype, "setupEvents", 1);
var _D = Object.defineProperty, PD = Object.getOwnPropertyDescriptor, Gc = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? PD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && _D(t, e, i), i;
}, nt, Ur, $r, Fd, Kf;
class Ba {
  constructor({ name: t, socketHandler: e, meetingId: r }) {
    m(this, Fd);
    h(this, "name", "");
    m(this, nt, {});
    m(this, Ur, "");
    m(this, $r, void 0);
    h(this, "rateLimitConfig", {
      maxInvocations: 5,
      period: 1
    });
    h(this, "bulkRateLimitConfig", {
      maxInvocations: 5,
      period: 1
    });
    h(this, "listeners", {});
    this.name = t, f(this, $r, e), f(this, Ur, r);
  }
  /**
     * @description Sets a value in the store.
     * @param {string} key - Unique identifier used to store value.
     * @param {any} value - Data to be set.
     * @returns {Promise<void>} A promise.
     */
  set(t, e, r = !0, i = !1) {
    return u(this, null, function* () {
      n(this, nt)[t] = e, r && this.remoteSet(t, e), i && (this.listeners[t] && this.listeners[t].forEach(
        (a) => a({ [t]: n(this, nt)[t] })
      ), this.listeners["*"] && this.listeners["*"].forEach(
        (a) => a({ [t]: n(this, nt)[t] })
      ));
    });
  }
  remoteSet(t, e) {
    n(this, $r).storeInsertKeys(n(this, Ur), this.name, [{ key: t, payload: e }]);
  }
  bulkSet(t) {
    return u(this, null, function* () {
      t.forEach(({ key: e, payload: r }) => {
        n(this, nt)[e] = r;
      }), n(this, $r).storeInsertKeys(n(this, Ur), this.name, t);
    });
  }
  update(t, e, r = !0) {
    return u(this, null, function* () {
      x(this, Fd, Kf).call(this, t, e, r);
    });
  }
  // eslint-disable-next-line consistent-return
  delete(t, e = !0, r = !1) {
    return u(this, null, function* () {
      if (n(this, nt)[t] && delete n(this, nt)[t], e)
        return n(this, $r).storeDeleteKeys(
          n(this, Ur),
          this.name,
          [{ key: t }]
        );
      r && (this.listeners[t] && (this.listeners[t].forEach((i) => i({ [t]: void 0 })), delete this.listeners[t]), this.listeners["*"] && this.listeners["*"].forEach((i) => i({ [t]: void 0 })));
    });
  }
  bulkDelete(t) {
    return u(this, null, function* () {
      return t.forEach(({ key: e }) => {
        n(this, nt)[e] && delete n(this, nt)[e];
      }), n(this, $r).storeDeleteKeys(
        n(this, Ur),
        this.name,
        t
      );
    });
  }
  /**
   * @description Returns value for the given key.
   * @param {string} key - Unique identifier used to store value.
   * @returns {any} Value for the given key.
   */
  get(t) {
    if (n(this, nt)[t])
      return n(this, nt)[t];
  }
  /**
   * @description Returns the entire store.
   * @returns {StoreData} An instance of StoreData.
   */
  getAll() {
    return n(this, nt);
  }
  get rateLimits() {
    return this.rateLimitConfig;
  }
  updateRateLimits(t, e) {
    this.rateLimitConfig.maxInvocations = t, this.rateLimitConfig.period = e;
  }
  get bulkRateLimits() {
    return this.bulkRateLimitConfig;
  }
  // eslint-disable-next-line class-methods-use-this
  updateBulkRateLimits(t, e) {
    this.bulkRateLimitConfig.maxInvocations = t, this.bulkRateLimitConfig.period = e;
  }
  /**
   * @description Listens for data change on a store key.
   * @param {string} key - Unique identifier used to store value.
   * @param {Function} cb - The callback function that gets executed
   * when data is modified.
   * @returns {void} void
   */
  subscribe(t, e) {
    if (this.listeners[t]) {
      this.listeners[t].push(e);
      return;
    }
    this.listeners[t] = [e];
  }
  /**
     * @description Removes all listeners for a key on the store.
     * @param {string} key - Unique identifier used to store value.
  * * @param {Function} cb - Callback to be removed.
     * @returns {void} void
     */
  unsubscribe(t, e) {
    var r;
    if (e) {
      this.listeners[t] = ((r = this.listeners[t]) == null ? void 0 : r.filter((i) => i !== e)) || [];
      return;
    }
    this.listeners[t] && delete this.listeners[t];
  }
  populate(t) {
    f(this, nt, t);
  }
}
nt = new WeakMap(), Ur = new WeakMap(), $r = new WeakMap(), Fd = new WeakSet(), Kf = function(t, e, r = !0) {
  let i;
  const a = n(this, nt)[t], o = Object.prototype.toString.call(e), c = Object.prototype.toString.call(a);
  if (o !== c) {
    this.set(t, e);
    return;
  }
  switch (c) {
    case "[object Array]":
      i = [...a, ...e];
      break;
    case "[object Object]":
      i = D(D({}, a), e);
      break;
    case "[object Map]":
      i = new Map([...a, ...e]);
      break;
    case "[object Set]":
      i = /* @__PURE__ */ new Set([...a, ...e]);
      break;
    default:
      i = e;
      break;
  }
  this.set(t, i, r);
};
Gc([
  Mt(Fa, "rateLimitConfig")
], Ba.prototype, "remoteSet", 1);
Gc([
  Mt(Fa, "bulkRateLimitConfig")
], Ba.prototype, "bulkSet", 1);
Gc([
  Mt(Fa, "rateLimitConfig")
], Ba.prototype, "update", 1);
Gc([
  Mt(Fa, "rateLimitConfig")
], Ba.prototype, "delete", 1);
Gc([
  Mt(Fa, "bulkRateLimitConfig")
], Ba.prototype, "bulkDelete", 1);
var bi, ki, zo, qu, Yo, Fr, Bd, zf;
class CD {
  constructor(t, e) {
    m(this, zo);
    m(this, Bd);
    h(this, "stores", /* @__PURE__ */ new Map());
    m(this, bi, void 0);
    m(this, ki, "");
    m(this, Yo, void 0);
    m(this, Fr, /* @__PURE__ */ new Map());
    f(this, bi, e), f(this, ki, t.getValue("meetingId")), f(this, Yo, t), x(this, Bd, zf).call(this);
  }
  create(t) {
    const e = new Ba(
      { name: t, socketHandler: n(this, bi), meetingId: n(this, ki) }
    );
    return n(this, bi).storeGetKeys(n(this, ki), t, []), new Promise((i, a) => {
      const o = setTimeout(() => a(Error("Failed")), 3e3);
      n(this, Fr).set(t, { rejectTimeout: o, resolve: i, store: e });
    });
  }
}
bi = new WeakMap(), ki = new WeakMap(), zo = new WeakSet(), qu = function() {
  return n(this, Yo).getValue("peerId");
}, Yo = new WeakMap(), Fr = new WeakMap(), Bd = new WeakSet(), zf = function() {
  [
    J.storeInsertKeys,
    J.storeGetKeys,
    J.storeDeleteKeys
  ].forEach((t) => {
    n(this, bi).on(
      t,
      (e) => u(this, null, function* () {
        var a, o;
        if (e.pluginId !== n(this, ki))
          return;
        const r = (a = e.storeItems) == null ? void 0 : a.map((c) => {
          var d;
          return {
            timestamp: c.timestamp,
            peerId: c.peerId,
            payload: JSON.parse(
              (d = c.payload) != null && d.length ? new TextDecoder().decode(c.payload) : "{}"
            ),
            key: c.storeKey
          };
        });
        if (t === J.storeGetKeys) {
          const c = n(this, Fr).get(e.storeName), d = this.stores.get(e.storeName) || (c == null ? void 0 : c.store);
          n(this, Fr).get(e.storeName) && (this.stores.set(e.storeName, c.store), c.resolve(d), clearTimeout(c.rejectTimeout), n(this, Fr).delete(e.storeName)), r.forEach((l) => {
            d.set(l.key, l.payload, !1, !1);
          });
          return;
        }
        const i = this.stores.get(e.storeName) || ((o = n(this, Fr).get(e.storeName)) == null ? void 0 : o.store);
        i !== void 0 && (t === J.storeInsertKeys && r.forEach(({ key: c, peerId: d, payload: l }) => {
          d !== n(this, zo, qu) && i.set(c, l, !1, !0);
        }), t === J.storeDeleteKeys && r.forEach(({ key: c, peerId: d }) => {
          d !== n(this, zo, qu) && i.delete(c, !1, !0);
        }));
      })
    );
  });
};
function hi(s) {
  var t, e, r, i, a, o, c, d, l, p, g, S, v;
  return s ? {
    media: {
      audio: {
        enabled: s.audioEnabled,
        trackId: (t = s.audioTrack) == null ? void 0 : t.id,
        permission: "mediaPermissions" in s ? (e = s.mediaPermissions) == null ? void 0 : e.audio : null
      },
      video: {
        enabled: s.videoEnabled,
        trackId: (r = s.videoTrack) == null ? void 0 : r.id,
        permission: "mediaPermissions" in s ? (i = s.mediaPermissions) == null ? void 0 : i.video : null
      },
      screenshare: {
        enabled: s.screenShareEnabled,
        permission: "mediaPermissions" in s ? (a = s.mediaPermissions) == null ? void 0 : a.screenshare : null,
        audio: {
          enabled: (c = (o = s.screenShareTracks) == null ? void 0 : o.audio) == null ? void 0 : c.enabled,
          trackId: (l = (d = s.screenShareTracks) == null ? void 0 : d.audio) == null ? void 0 : l.id
        },
        video: {
          enabled: (g = (p = s.screenShareTracks) == null ? void 0 : p.video) == null ? void 0 : g.enabled,
          trackId: (v = (S = s.screenShareTracks) == null ? void 0 : S.video) == null ? void 0 : v.id
        }
      }
    }
  } : {};
}
var wD = Object.defineProperty, RD = Object.getOwnPropertyDescriptor, Ha = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? RD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && wD(t, e, i), i;
};
const bD = 0.8, kD = 1.2;
var na, aa, Ut, Ii, uo, Br, Tn, Ai, ho, Hd, Yf, er, Qo, Hr, Mi, po, tr, qd, Xo, ju, jd, Qf, Gd, Xf, Bg;
let Tr = (Bg = class extends qt {
  constructor(t, e, r, i) {
    const a = t.getValue("logger");
    super(a);
    // eslint-disable-next-line class-methods-use-this
    m(this, Ii);
    m(this, Br);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, Ai);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, Hd);
    m(this, Mi);
    m(this, Xo);
    m(this, jd);
    m(this, Gd);
    /**
     * The peer ID of the participant.
     * The participants are indexed by this ID in the participant map.
     */
    h(this, "id");
    /**
     * The user ID of the participant.
     */
    h(this, "userId");
    /**
     * The name of the participant.
     */
    h(this, "name");
    /**
     * The picture of the participant.
     */
    h(this, "picture");
    h(this, "isHost");
    /**
     * The custom id of the participant set during Add Participant REST API
     */
    h(this, "customParticipantId");
    h(this, "flags");
    /**
     * The device configuration of the participant.
     */
    h(this, "device");
    /**
     * The participant's video track.
     */
    h(this, "videoTrack");
    /**
     * The participant's audio track.
     */
    h(this, "audioTrack");
    /**
     * The participant's screenshare video and audio track.
     */
    h(this, "screenShareTracks");
    /**
     * This is true if the participant's video is enabled.
     */
    h(this, "videoEnabled");
    /**
     * This is true if the participant's audio is enabled.
     */
    h(this, "audioEnabled");
    /**
     * This is true if the participant is screensharing.
     */
    h(this, "screenShareEnabled");
    /**
     * producers created by participant
     */
    h(this, "producers");
    /**
     * producer config passed during manual subscription
     */
    h(this, "manualProducerConfig");
    /**
     * This is true if the participant is pinned.
     */
    m(this, na, void 0);
    /**
     * This is true if the participant supports remote control.
     */
    h(this, "supportsRemoteControl", !1);
    /**
     * Represents the participants current stage status
     */
    m(this, aa, void 0);
    /**
     * The preset of the participant.
     */
    h(this, "presetName");
    m(this, Ut, void 0);
    m(this, er, void 0);
    m(this, Qo, void 0);
    m(this, Hr, /* @__PURE__ */ new Map());
    /*
    * Specifies the currently set max spatial layer
    * Assuming a two layer simulcast, 0 being the lower layer
    * default = 1
    */
    m(this, tr, 1);
    m(this, qd, Ih((t) => {
      if (!this.videoTrack)
        return;
      const { clientWidth: e, clientHeight: r } = t, { width: i, height: a } = this.videoTrack.getSettings();
      if (!i || !a)
        return;
      const o = a / r, c = i / e, d = Math.max(o, c);
      d > kD && n(this, tr) === 1 ? (f(this, tr, 0), n(this, Ut).getValue("peerSessionStore").emit(k.MAX_SPATIAL_LAYER_CHANGE, {
        peerId: this.id,
        maxSpatialLayer: n(this, tr)
      })) : d < bD && n(this, tr) === 0 && (f(this, tr, 1), n(this, Ut).getValue("peerSessionStore").emit(k.MAX_SPATIAL_LAYER_CHANGE, {
        peerId: this.id,
        maxSpatialLayer: n(this, tr)
      }));
    }, 2e3));
    f(this, Ut, t);
    const {
      id: o,
      userId: c,
      displayName: d,
      device: l,
      picture: p,
      isHost: g,
      flags: S,
      clientSpecificId: v,
      stageStatus: _,
      customParticipantId: P,
      audioMuted: C,
      audioTrack: w,
      videoEnabled: $ = !1,
      videoTrack: F,
      producers: N,
      metadata: B
    } = e;
    this.id = o, this.userId = c, this.name = d, this.device = l, this.picture = p, this.isHost = g, this.flags = S, this.manualProducerConfig = cw, f(this, aa, _ != null ? _ : "ON_STAGE"), this.customParticipantId = P != null ? P : v, this.audioEnabled = !C, this.audioTrack = w, this.videoEnabled = $, this.videoTrack = F, this.screenShareTracks = {
      audio: void 0,
      video: void 0
    }, this.producers = N != null ? N : [], this.presetName = B == null ? void 0 : B.preset_name, f(this, na, !1), f(this, er, r), f(this, Qo, i), this.setupEvents(), this.updateVideo = this.updateVideo.bind(this), x(this, Xo, ju).call(this);
  }
  /**
   * @deprecated
   * Use `customParticipantId`
   */
  get clientSpecificId() {
    return this.customParticipantId;
  }
  /** Denotes the participants's current stage status. */
  get stageStatus() {
    return n(this, aa);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ut).getValue("telemetry");
  }
  setVideoEnabled(t, e = !0) {
    this.videoEnabled = t, e && (this.logger.info("Participant::setVideoEnabled::videoUpdate", D({}, hi(this))), this.emit("videoUpdate", {
      videoEnabled: this.videoEnabled,
      videoTrack: this.videoTrack
    }));
  }
  setAudioEnabled(t, e = !0) {
    this.audioEnabled = t, e && (this.logger.info("Participant::setAudioEnabled::audioUpdate", D({}, hi(this))), this.emit("audioUpdate", {
      audioEnabled: this.audioEnabled,
      audioTrack: this.audioTrack
    }));
  }
  setScreenShareEnabled(t, e = !0) {
    this.screenShareEnabled = t, e && this.emit("screenShareUpdate", {
      screenShareEnabled: this.screenShareEnabled,
      screenShareTracks: this.screenShareTracks
    });
  }
  setupEvents() {
    this.on("videoUpdate", x(this, Xo, ju)), n(this, Br, Tn) && (this.on("audioUpdate", x(this, jd, Qf)), this.on("screenShareUpdate", x(this, Gd, Xf)));
  }
  /**
   * Returns `participant.id` if user has permission
   * to pin participants.
   */
  pin() {
    return u(this, null, function* () {
      if (!n(this, Ai, ho))
        throw new b("Can`t pin participant without joining room", "1205");
      if (!n(this, er).permissions.pinParticipant)
        throw new b("You do not have permission to pin participants.", "1201");
      return n(this, Ii, uo).pinPeer(this.id);
    });
  }
  /**
   * Returns `participant.id` if user has permission
   * to unpin participants.
   */
  unpin() {
    return u(this, null, function* () {
      if (!n(this, Ai, ho))
        throw new b("Can`t unpin participant without joining room", "1205");
      if (!n(this, er).permissions.pinParticipant)
        throw new b("You do not have permission to unpin participants.", "1201");
      return n(this, Ii, uo).pinPeer(null);
    });
  }
  /**
   * @access private
   * Not for external use
   */
  setIsPinned(t, e = !0) {
    var i;
    f(this, na, t);
    const r = t ? "pinned" : "unpinned";
    (i = n(this, Mi, po)) == null || i.updateSource(this.id, { pinned: t }), e && this.emit(r, this);
  }
  disableAudio() {
    return u(this, null, function* () {
      const t = this.id;
      if (this.logger.info("Participant::disable_audio", {
        participant: { id: t }
      }), !n(this, Ai, ho))
        throw new b(
          "Can`t disable participant audio without joining room",
          "1205"
        );
      if (n(this, er).permissions.canDisableParticipantAudio)
        return n(this, Ii, uo).disableAudio(t);
      throw this.logger.error("Participant::unauthorized_disable_audio", {
        participant: { id: t }
      }), new b(
        "Unauthorized: User does not have permission to disable participant audio.",
        "1201"
      );
    });
  }
  kick() {
    return u(this, null, function* () {
      const t = this.id;
      if (this.logger.info("Participant::kick", {
        participant: { id: t }
      }), !n(this, Hd, Yf))
        throw new b("Can`t kick participant without joining room", "1205");
      if (n(this, er).permissions.kickParticipant) {
        yield n(this, Ut).getValue("peerSessionStore").emitAsync(k.KICK_PEER, {
          peerId: t
        });
        return;
      }
      throw this.logger.error("Participant::unauthorized_kick", {
        participant: { id: t }
      }), new b(
        "Unauthorized: User does not have permission to kick participants.",
        "1201"
      );
    });
  }
  disableVideo() {
    return u(this, null, function* () {
      const t = this.id;
      if (this.logger.info("Participant::disable_video", {
        participant: { id: t }
      }), !n(this, Ai, ho))
        throw new b(
          "Can`t disable participant video without joining room",
          "1205"
        );
      if (n(this, er).permissions.canDisableParticipantVideo)
        return n(this, Ii, uo).disableVideo(t);
      throw this.logger.error("Participant::unauthorized_disable_video", {
        participant: { id: t }
      }), new b(
        "Unauthorized: User does not have permission to disable participant video.",
        "1201"
      );
    });
  }
  getPermissions() {
    return u(this, null, function* () {
      return n(this, Qo).getUserPermissions(this.userId);
    });
  }
  setStageStatus(t) {
    f(this, aa, t), this.emit("stageStatusUpdate", this);
  }
  /**
   * Returns true if the participant is pinned.
   */
  get isPinned() {
    return n(this, na);
  }
  registerVideoElement(t) {
    var r, i, a, o;
    if (!t)
      return;
    let e;
    (i = (r = n(this, Hr).get(t)) == null ? void 0 : r.observer) == null || i.disconnect(), "ResizeObserver" in window && (e = new ResizeObserver(() => n(this, qd).call(this, t)), e.observe(t)), n(this, Hr).set(t, { observer: e }), this.updateVideo(t), (o = n(this, Mi, po)) == null || o.addSource(
      this.id,
      t,
      this.videoEnabled,
      this.isPinned,
      this.name,
      this.picture,
      (a = this.raised) != null ? a : !1
    );
  }
  deregisterVideoElement(t) {
    var e, r, i, a;
    if (!t) {
      (e = n(this, Mi, po)) == null || e.removeSource(this.id);
      return;
    }
    t.srcObject = void 0, (i = (r = n(this, Hr).get(t)) == null ? void 0 : r.observer) == null || i.disconnect(), n(this, Hr).delete(t), (a = n(this, Mi, po)) == null || a.removeSource(this.id);
  }
  /**
   * Internal method, do not use
   */
  updateVideo(t) {
    var e;
    if (this.videoEnabled) {
      if (this.videoTrack == null)
        return;
      const r = (e = t.srcObject) == null ? void 0 : e.getTracks()[0];
      if ((r == null ? void 0 : r.id) === this.videoTrack.id)
        return;
      const i = new MediaStream();
      i.addTrack(this.videoTrack), t.srcObject = i;
    } else
      t.srcObject = void 0;
    t.style.display = this.videoEnabled ? "block" : "none";
  }
}, na = new WeakMap(), aa = new WeakMap(), Ut = new WeakMap(), Ii = new WeakSet(), uo = function() {
  return n(this, Ut).getValue("roomNodeClient");
}, Br = new WeakSet(), Tn = function() {
  return n(this, Ut).getValue("audioPlayback");
}, Ai = new WeakSet(), ho = function() {
  return n(this, Ut).getValue("connectionHandler").mediaJoined;
}, Hd = new WeakSet(), Yf = function() {
  return n(this, Ut).getValue("connectionHandler").socketJoined;
}, er = new WeakMap(), Qo = new WeakMap(), Hr = new WeakMap(), Mi = new WeakSet(), po = function() {
  return n(this, Ut).getValue("pip");
}, tr = new WeakMap(), qd = new WeakMap(), Xo = new WeakSet(), ju = function() {
  Array.from(n(this, Hr).keys()).forEach(this.updateVideo);
}, jd = new WeakSet(), Qf = function() {
  var t, e;
  this.audioEnabled && this.audioTrack ? (t = n(this, Br, Tn)) == null || t.addParticipantTrack(this.id, this.audioTrack) : (e = n(this, Br, Tn)) == null || e.removeParticipantTrack(this.id);
}, Gd = new WeakSet(), Xf = function() {
  var t, e;
  this.screenShareEnabled && this.screenShareTracks.audio ? (t = n(this, Br, Tn)) == null || t.addParticipantTrack(`screenshare-${this.id}`, this.screenShareTracks.audio) : (e = n(this, Br, Tn)) == null || e.removeParticipantTrack(`screenshare-${this.id}`);
}, Bg);
Ha([
  E.trace("Participant.disableAudio")
], Tr.prototype, "disableAudio", 1);
Ha([
  E.trace("Participant.kick")
], Tr.prototype, "kick", 1);
Ha([
  E.trace("Participant.disableVideo")
], Tr.prototype, "disableVideo", 1);
Ha([
  E.trace("Participant.getPermissions")
], Tr.prototype, "getPermissions", 1);
Ha([
  E.trace("Participant.setStageStatus")
], Tr.prototype, "setStageStatus", 1);
Tr = Ha([
  ut("1200")
], Tr);
class lo extends Ff {
  constructor(t, e) {
    const {
      onAddEvent: r = "participantJoined",
      onDeleteEvent: i = "participantLeft",
      onClearEvent: a = "participantsCleared"
    } = e != null ? e : {};
    super({
      onAddEvent: r,
      onDeleteEvent: i,
      onClearEvent: a
    }, t);
  }
  add(t, e = !0) {
    return this.has(t.id) && Object.is(this.get(t.id), t) === !1 && this.delete(t.id), super.add(t, e);
  }
  clear(t = !0, e = !1) {
    return super.clear(t, e);
  }
  delete(t, e = !0, r = !1) {
    return super.delete(t, e, r);
  }
}
var qr;
class ID extends Ua {
  constructor(e) {
    super(e);
    m(this, qr, void 0);
    f(this, qr, /* @__PURE__ */ new Map());
  }
  /**
   * @private
   */
  __set(e, r) {
    return n(this, qr).set(e, r);
  }
  /**
   * @private
   */
  __clear() {
    return n(this, qr).clear();
  }
  get(e) {
    return n(this, qr).get(e);
  }
  toArray() {
    return Array.from(n(this, qr).values());
  }
}
qr = new WeakMap();
class AD {
  constructor() {
    h(this, "_orderedArray");
    h(this, "_map");
    this._map = /* @__PURE__ */ new Map(), this._orderedArray = [];
  }
  add(t, e) {
    if (!this._map.has(t))
      return this._map.set(t, { peerId: t, priority: e }), this._orderedArray.splice(Math.max(e - 1, 0), 0, t), this.index(t);
    const r = this.index(t);
    this.delete(t);
    const i = this.add(t, e);
    return r !== i ? i : -1;
  }
  delete(t) {
    if (this._map.has(t)) {
      const e = this.index(t);
      this._map.delete(t), this._orderedArray.splice(e, 1);
    }
  }
  index(t) {
    return this._map.has(t) ? this._orderedArray.indexOf(t) : -1;
  }
  [Symbol.iterator]() {
    return this._orderedArray[Symbol.iterator]();
  }
}
class MD {
  constructor() {
    h(this, "_activeSpeakerPeers");
    h(this, "_compulsoryPeers");
    this._activeSpeakerPeers = new AD(), this._compulsoryPeers = /* @__PURE__ */ new Set();
  }
  add(t, e, r) {
    if (!t)
      return -1;
    if (e < 0)
      return this._compulsoryPeers.add(t), 0;
    const i = r.getValue("logger");
    if (this.compulsoryPeers.includes(t) && (e > 0 || e === 246267631)) {
      if (i.info("SelectedPeer::removing_compulsory_peer", {
        selectedPeer: {
          peerId: t
        }
      }), this._removeFromCompulsoryPeer(t), e === 246267631)
        return -1;
    } else if (e === 229490415)
      return this.delete(t, r), -1;
    return this._activeSpeakerPeers.add(t, e);
  }
  delete(t, e) {
    const r = e == null ? void 0 : e.getValue("logger");
    r == null || r.info("SelectedPeer::deleting_peer_from_selectedPeer", {
      selectedPeer: {
        peerId: t
      }
    }), this._removeFromCompulsoryPeer(t), this._activeSpeakerPeers.delete(t);
  }
  index(t) {
    return this._activeSpeakerPeers.index(t);
  }
  get peers() {
    return Array.from(new Set(this.compulsoryPeers.concat(this.activeSpeakerPeers)));
  }
  get compulsoryPeers() {
    return Array.from(this._compulsoryPeers.values());
  }
  get activeSpeakerPeers() {
    return Array.from(this._activeSpeakerPeers);
  }
  _removeFromCompulsoryPeer(t) {
    this._compulsoryPeers.delete(t);
  }
}
const Zf = new MD();
var DD = Object.defineProperty, OD = Object.getOwnPropertyDescriptor, Wt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? OD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && DD(t, e, i), i;
};
const ND = ["ACTIVE_GRID", "PAGINATED", "MANUAL"];
var Ee, Zo, Gu, Di, go, oa, gd, Oi, wt, Hg;
let _t = (Hg = class extends qt {
  constructor(t, e, r) {
    const i = t.getValue("logger");
    super(i);
    // eslint-disable-next-line class-methods-use-this
    /**
     * #roomNodeClient could be null or undefined for livestream viewers,
     * because livestream viewers do not join media room.
     */
    m(this, Zo);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, Di);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, oa);
    /**
     * Returns a list of participants waiting to join the meeting.
     */
    h(this, "waitlisted");
    /**
     * Returns a list of all participants in the meeting.
     */
    h(this, "joined");
    /**
     * @deprecated
     * Returns a list of participants whose streams are currently consumed.
     */
    h(this, "active");
    /**
     * Returns a list of participants whose video streams are currently consumed.
     */
    h(this, "videoSubscribed");
    /**
     * Returns a list of participants whose audio streams are currently consumed.
     */
    h(this, "audioSubscribed");
    /**
     * Returns a list of participants who have been pinned.
     */
    h(this, "pinned");
    /**
     * Returns all added participants irrespective of whether they are currently
     * in the meeting or not
     */
    h(this, "all");
    m(this, Ee, void 0);
    m(this, Oi, void 0);
    m(this, wt, void 0);
    h(this, "rateLimitConfig", {
      maxInvocations: 5,
      period: 1
    });
    /**
     * Indicates whether the meeting is in 'ACTIVE_GRID' mode or 'PAGINATED' mode.
     *
     * In 'ACTIVE_GRID' mode, participants are populated in the participants.active map
     * dynamically. The participants present in the map will keep changing when other
     * participants unmute their audio or turn on their videos.
     *
     * In 'PAGINATED' mode, participants are populated in the participants.active map
     * just once, and the participants in the map will only change if the page number is
     * changed by the user using setPage(page).
     */
    h(this, "viewMode");
    /**
     * This indicates the current page that has been set by the user in PAGINATED mode.
     * If the meeting is in ACTIVE_GRID mode, this value will be 0.
     */
    h(this, "currentPage");
    /**
     * This stores the `participantId` of the last participant who spoke in the meeting.
     */
    h(this, "lastActiveSpeaker");
    /**
     * This constructs a new Participant object and maintains
     * the maps of active/joined/waitlisted/pinned/selectedPeers maps.
     * @param self : Self
     */
    /**
     * Keeps a list of all participants who have been present in the selected peers list.
     */
    h(this, "selectedPeers", Zf);
    f(this, Ee, t), f(this, Oi, e), f(this, wt, r), this.waitlisted = new lo(i), this.joined = new lo(i), this.videoSubscribed = new lo(i), this.audioSubscribed = new lo(i), this.active = this.videoSubscribed, this.pinned = new lo(i), this.all = new ID(i), this.viewMode = "ACTIVE_GRID", this.currentPage = 0, this.setupEvents();
  }
  /**
   * Return the controls for Picture-in-Picture
   */
  get pip() {
    return n(this, Ee).getValue("pip");
  }
  get rateLimits() {
    return this.rateLimitConfig;
  }
  updateRateLimits(t, e) {
    this.rateLimitConfig.maxInvocations = t, this.rateLimitConfig.period = e;
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ee).getValue("telemetry");
  }
  setupEvents() {
    n(this, Ee).getValue("peerSessionStore").on(k.E2EE_ACTIVE_CONSUMER, ({ peerId: e }) => {
      var r;
      ((r = n(this, Ee).getValue("modules").e2ee) == null ? void 0 : r.enabled) !== !0 && this.emit("media_decode_error", {
        reason: `Got encrypted media for participantId ${e}, but encryption wasn't enabled in init.defaults`,
        code: "1702"
      });
    });
    const t = n(this, Ee).getValue("audioPlayback");
    t && this.audioSubscribed.on("participantLeft", (e) => {
      t.removeParticipantTrack(e.id);
    });
  }
  /**
   * Returns the number of participants who are joined in the meeting.
   */
  get count() {
    return this.joined.size;
  }
  /**
   * Returns the maximum number of participants that can be present in
   * the active map.
   */
  get maxActiveParticipantsCount() {
    var t;
    return (t = n(this, Ee)) == null ? void 0 : t.getValue("maxPreferredStreams");
  }
  /**
   * Updates the maximum number of participants that are populated in
   * the active map.
   *
   * @param limit: Updated max limit
   */
  setMaxActiveParticipantsCount(t) {
    if (t < 0 || t > 24)
      throw new b("0 <= Max active participants count limit <= 24", "1203");
    n(this, Ee).setValue("maxPreferredStreams", t), n(this, oa, gd) && n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.viewMode, page: this.currentPage });
  }
  /**
   * Returns the number of pages that are available in the meeting in PAGINATED mode.
   * If the meeting is in ACTIVE_GRID mode, this value will be 0.
   */
  get pageCount() {
    if (this.viewMode === "PAGINATED") {
      const t = this.selectedPeers.compulsoryPeers.length, e = this.joined.toArray().filter((r) => r.stageStatus === "ON_STAGE");
      return Math.ceil(
        (e.length - t) / Math.max(this.maxActiveParticipantsCount - t, 1)
      );
    }
    return 0;
  }
  /**
   * Accepts requests from waitlisted participants if user
   * has appropriate permissions.
   * @param id peerId or userId of the waitlisted participant.
   */
  acceptWaitingRoomRequest(t) {
    var r, i;
    if (!n(this, Di, go))
      throw new b(
        "Can`t accept waiting room request without joining room",
        "1205"
      );
    const e = (i = (r = this.waitlisted.get(t)) == null ? void 0 : r.userId) != null ? i : t;
    return n(this, wt).acceptWaitingRoomRequest([e]);
  }
  /**
   * We need a new event for socket service events
   * since if we send them all together, sequence of events
   * can be unreliable
   */
  acceptAllWaitingRoomRequest(t) {
    return u(this, null, function* () {
      const e = t.map((r) => {
        var i, a;
        return (a = (i = this.waitlisted.get(r)) == null ? void 0 : i.userId) != null ? a : r;
      });
      return n(this, wt).acceptWaitingRoomRequest(e);
    });
  }
  /**
   * Rejects requests from waitlisted participants if user
   * has appropriate permissions.
   * @param id participantId of the waitlisted participant.
   */
  rejectWaitingRoomRequest(t) {
    return u(this, null, function* () {
      var r, i;
      if (!n(this, Di, go))
        throw new b(
          "Can`t reject waiting room request without joining room",
          "1205"
        );
      const e = (i = (r = this.waitlisted.get(t)) == null ? void 0 : r.userId) != null ? i : t;
      n(this, wt).rejectWaitingRoomRequest([e]);
    });
  }
  setViewMode(t) {
    return u(this, null, function* () {
      if (this.logger.info("Participants::set_view_mode", {
        pageNavigation: {
          viewMode: t,
          currentPage: this.currentPage,
          pageCount: this.pageCount,
          maxActiveParticipantsCount: this.maxActiveParticipantsCount
        }
      }), !((r) => ND.includes(r))(t))
        throw this.logger.error("Participants::setViewMode::invalid_view_mode", {
          pageNavigation: {
            viewMode: t,
            currentPage: this.currentPage,
            pageCount: this.pageCount,
            maxActiveParticipantsCount: this.maxActiveParticipantsCount
          }
        }), new b(
          `Invalid view mode: ${t}. Try ACTIVE_GRID, PAGINATED or MANUAL.`,
          "1207"
        );
      if (this.viewMode === t) {
        this.logger.info(
          "Participants::setViewMode::view_mode_same_as_previous"
        );
        return;
      }
      this.viewMode = t, t === "PAGINATED" ? (this.currentPage = 1, n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: t, page: this.currentPage })) : t === "ACTIVE_GRID" ? (this.currentPage = 0, n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: t, page: this.currentPage })) : t === "MANUAL" && (this.currentPage = 0, n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: t, page: this.currentPage })), this.emit("viewModeChanged", {
        viewMode: t,
        currentPage: this.currentPage,
        pageCount: this.pageCount
      });
    });
  }
  subscribe(r) {
    return u(this, arguments, function* (t, e = ["audio", "video", "screenshareAudio", "screenshareVideo"]) {
      if (this.viewMode !== "MANUAL")
        throw new b("MANUAL subscription mode was not activated.", "1206");
      t.forEach((i) => {
        const a = this.joined.get(i);
        a && (e.includes("audio") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          audio: !0
        }), this.audioSubscribed.has(a.id) || this.audioSubscribed.add(a)), e.includes("video") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          video: !0
        }), this.videoSubscribed.has(a.id) || this.videoSubscribed.add(a)), e.includes("screenshareAudio") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          screenshareAudio: !0
        }), this.audioSubscribed.has(a.id) || this.audioSubscribed.add(a)), e.includes("screenshareVideo") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          screenshareVideo: !0
        }), this.videoSubscribed.has(a.id) || this.videoSubscribed.add(a)));
      }), n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.viewMode, page: this.currentPage });
    });
  }
  unsubscribe(r) {
    return u(this, arguments, function* (t, e = ["audio", "video", "screenshareAudio", "screenshareVideo"]) {
      if (this.viewMode !== "MANUAL")
        throw new b("MANUAL subscription mode was not activated.", "1206");
      t.forEach((i) => {
        const a = this.joined.get(i);
        a && (e.includes("audio") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          audio: !1
        }), a.manualProducerConfig.screenshareAudio || this.audioSubscribed.delete(a.id)), e.includes("video") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          video: !1
        }), a.manualProducerConfig.screenshareVideo || this.videoSubscribed.delete(a.id)), e.includes("screenshareAudio") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          screenshareAudio: !1
        }), a.manualProducerConfig.audio || this.audioSubscribed.delete(a.id)), e.includes("screenshareVideo") && (a.manualProducerConfig = H(D({}, a.manualProducerConfig), {
          screenshareVideo: !1
        }), a.manualProducerConfig.video || this.videoSubscribed.delete(a.id)));
      }), n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.viewMode, page: this.currentPage });
    });
  }
  getPeerIdsForCurrentPage() {
    this.logger.info("Participants::getPeerIdsForCurrentPage()", {
      pageNavigation: {
        viewMode: this.viewMode,
        currentPage: this.currentPage,
        pageCount: this.pageCount,
        maxActiveParticipantsCount: this.maxActiveParticipantsCount
      }
    });
    const { compulsoryPeers: t } = this.selectedPeers, e = t.filter(
      (c) => this.joined.has(c)
    ), r = Array.from(this.pinned.keys()).filter(
      (c) => !e.includes(c)
    ), i = Array.from(this.joined.toArray().filter((c) => c.stageStatus === "ON_STAGE").map((c) => c.id)), a = Math.max(
      (this.currentPage - 1) * (this.maxActiveParticipantsCount - e.length - r.length)
    ), o = this.currentPage * (this.maxActiveParticipantsCount - e.length - r.length);
    return e.concat(r, i.slice(a, o));
  }
  setPage(t) {
    return u(this, null, function* () {
      if (this.logger.info("Participants::set_page", {
        pageNavigation: {
          settingPage: t,
          viewMode: this.viewMode,
          currentPage: this.currentPage,
          pageCount: this.pageCount,
          maxActiveParticipantsCount: this.maxActiveParticipantsCount
        }
      }), this.viewMode === "PAGINATED") {
        if (!Number.isInteger(t))
          throw this.logger.error("Participants::invalid_page_number"), new b(`Invalid page: ${t}. Page must be an integer and greater than 0 and less than or equal to .pageCount`, "1202");
        this.currentPage = t, n(this, Ee).getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.viewMode, page: t }), this.emit("pageChanged", {
          viewMode: this.viewMode,
          currentPage: this.currentPage,
          pageCount: this.pageCount
        });
      }
    });
  }
  disableAllAudio(t) {
    return u(this, null, function* () {
      if (this.logger.info("Participants::disable_all_audio", {
        actions: { disableAllAudio: { allowUnmute: t } }
      }), !n(this, oa, gd))
        throw new b("Can`t disable all audio without joining room", "1205");
      if (n(this, Oi).permissions.canAllowParticipantAudio)
        return n(this, Zo, Gu).muteAll(t);
      throw this.logger.error("Participants::unauthorized_disable_all_audio", {
        actions: { disableAllAudio: { allowUnmute: t } }
      }), new b(
        "Unauthorized: User does not have permission to disable peer audio.",
        "1201"
      );
    });
  }
  disableAllVideo() {
    return u(this, null, function* () {
      if (this.logger.info("Participants::disable_all_video"), !n(this, oa, gd))
        throw new b("Can`t disable all video without joining room", "1205");
      if (n(this, Oi).permissions.canAllowParticipantVideo)
        return n(this, Zo, Gu).muteAllVideo();
      throw this.logger.error("Participants::unauthorized_disable_all_video"), new b(
        "Unauthorized: User does not have permission to disable peer video.",
        "1201"
      );
    });
  }
  disableAudio(t) {
    return u(this, null, function* () {
      this.joined.get(t).disableAudio();
    });
  }
  disableVideo(t) {
    return u(this, null, function* () {
      this.joined.get(t).disableVideo();
    });
  }
  kick(t) {
    return u(this, null, function* () {
      yield n(this, Ee).getValue("peerSessionStore").emitAsync(k.KICK_PEER, {
        peerId: t
      });
    });
  }
  kickAll() {
    return u(this, null, function* () {
      if (this.logger.info("Participants::kick_all"), n(this, Ee).getValue("viewType") !== "LIVESTREAM" && !n(this, Di, go))
        throw new b("Can`t kick all without joining room", "1205");
      if (!n(this, Oi).permissions.kickParticipant)
        throw this.logger.error("Participants::unauthorized_kick_all"), new b(
          "Unauthorized: User does not have permission to kick peers.",
          "1201"
        );
      const e = n(this, Ee).getValue("flagsmith").hasFeature(ee.PROPAGATE_KICK_ALL);
      n(this, wt).kickAll(e);
    });
  }
  broadcastMessage(t, e, r) {
    return u(this, null, function* () {
      if (this.logger.info("Participants::broadcastMessage"), !n(this, Di, go))
        throw new b("Can`t broadcast message without joining room", "1205");
      if (!(t != null && t.trim()))
        throw new b("`type` must be a non-empty string.", "1209");
      if (r)
        if ("meetingIds" in r)
          yield n(this, wt).broadcastToMeetings(t, r.meetingIds, e);
        else {
          let i = [];
          "participantIds" in r ? i = r.participantIds : i = this.joined.toArray().filter(
            (a) => {
              var o;
              return (o = r.presetNames) == null ? void 0 : o.includes(a.presetName);
            }
          ).map((a) => a.id), yield n(this, wt).broadcastToPeers(t, i, e);
        }
      else
        yield n(this, wt).broadcastMessage(t, e);
    });
  }
  getAllJoinedPeers(t, e, r) {
    return u(this, null, function* () {
      return (yield n(this, wt).getRoomPeers(t, e, r)).peers.map(Pr.formatSocketPeerMessage);
    });
  }
  updatePermissions(t, e) {
    return u(this, null, function* () {
      const r = this.joined.toArray().filter((a) => t.includes(a.id)).map((a) => a.userId), i = [...new Set(r)];
      if (!i.length)
        throw new b("Cannot update permissions, no valid userIDs found", "1204");
      n(this, wt).updatePermissions(i, e);
    });
  }
  getParticipantsInMeetingPreJoin() {
    return u(this, null, function* () {
      return n(this, wt).getRoomPeersNonPaginated();
    });
  }
}, Ee = new WeakMap(), Zo = new WeakSet(), Gu = function() {
  return n(this, Ee).getValue("roomNodeClient");
}, Di = new WeakSet(), go = function() {
  var t;
  return ((t = n(this, Ee).getValue("connectionHandler")) == null ? void 0 : t.socketJoined) === !0;
}, oa = new WeakSet(), gd = function() {
  var t;
  return ((t = n(this, Ee).getValue("connectionHandler")) == null ? void 0 : t.mediaJoined) === !0;
}, Oi = new WeakMap(), wt = new WeakMap(), Hg);
Wt([
  E.trace("Participants.setViewMode")
], _t.prototype, "setViewMode", 1);
Wt([
  E.trace("Participants.setPage")
], _t.prototype, "setPage", 1);
Wt([
  E.trace("Participants.disableAllAudio")
], _t.prototype, "disableAllAudio", 1);
Wt([
  E.trace("Participants.disableAllVideo")
], _t.prototype, "disableAllVideo", 1);
Wt([
  E.trace("Participants.disablePeerAudio")
], _t.prototype, "disableAudio", 1);
Wt([
  E.trace("Participants.disablePeerVideo")
], _t.prototype, "disableVideo", 1);
Wt([
  E.trace("Participants.kickPeer")
], _t.prototype, "kick", 1);
Wt([
  E.trace("Participants.kickAll")
], _t.prototype, "kickAll", 1);
Wt([
  E.trace("Participants.broadcastMessage"),
  Mt(Fa, "rateLimitConfig")
], _t.prototype, "broadcastMessage", 1);
Wt([
  E.trace("Participants.getAllJoinedPeers"),
  Mt({ maxInvocations: 10, period: 60 })
], _t.prototype, "getAllJoinedPeers", 1);
Wt([
  E.trace("Participant.updatePermissions"),
  Mt({ maxInvocations: 1e3, period: 60 })
], _t.prototype, "updatePermissions", 1);
Wt([
  E.trace("Participants.getParticipantsInMeetingPreJoin")
], _t.prototype, "getParticipantsInMeetingPreJoin", 1);
_t = Wt([
  ut("1200")
], _t);
var VD = Object.defineProperty, LD = Object.getOwnPropertyDescriptor, gn = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? LD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && VD(t, e, i), i;
}, es, ms, ca, qg;
const eS = (qg = class {
  constructor(s, t, e) {
    h(this, "participants");
    h(this, "self");
    h(this, "selectedPeers", Zf);
    h(this, "maxSpatialLayerUpdates", /* @__PURE__ */ new Map());
    h(this, "consumerPeerMap");
    h(this, "events");
    h(this, "roomSocketHandler");
    h(this, "context");
    h(this, "videoPeerConsumerMap", /* @__PURE__ */ new Map());
    m(this, es, { mode: "ACTIVE_GRID", page: 0 });
    m(this, ms, !1);
    m(this, ca, !1);
    h(this, "updateConsumerSpatialLayers", Ih(() => {
      const s = {}, t = new Map(this.maxSpatialLayerUpdates);
      this.maxSpatialLayerUpdates.clear(), Array.from(t.entries()).forEach(([e, r]) => {
        s[r] === void 0 && (s[r] = {
          layer: r,
          consumerIds: []
        }), s[r].consumerIds.push(e);
      }), Object.keys(s).forEach((e) => {
        const r = s[e];
        this.logger.log(`Switching max spatial layer to ${r.layer}`, { consumerIds: r.consumerIds }), this.roomNodeClient.switchConsumersToLayer(r.consumerIds, r.layer);
      });
    }, 2e3));
    h(this, "updateConsumers", (s, t) => u(this, null, function* () {
      this.logger.info(`updateConsumers: Starting consumer updates - AddProducers: ${s.length}, RemoveProducers: ${t.length}, ConsumersSyncing: ${n(this, ms)}`);
      try {
        s.length !== 0 && (this.logger.info(`updateConsumers: Creating consumers for ${s.length} producers: [${s.map((e) => e.producerId).join(", ")}]`), yield this.roomNodeClient.createConsumers(s), this.logger.info("updateConsumers: Successfully created consumers."));
      } catch (e) {
        this.logger.error("updateConsumers: Error creating consumers", { error: e });
      }
      try {
        t.length !== 0 && (this.logger.info(`updateConsumers: Closing consumers for ${t.length} producers: [${t.map((e) => e.producerId).join(", ")}]`), yield this.roomNodeClient.closeConsumers(t), this.logger.info("updateConsumers: Successfully closed consumers."));
      } catch (e) {
        this.logger.error("updateConsumers: Error closing consumers", { error: e });
      }
      this.logger.info("updateConsumers: Completed consumer updates.");
    }));
    this.context = s, this.roomSocketHandler = e, this.participants = new _t(s, t, this.roomSocketHandler), this.self = t, this.consumerPeerMap = /* @__PURE__ */ new Map(), this.events = Cs, t.config.viewType !== "CHAT" && this.setupEventsGlobal(), this.setupEvents();
  }
  get roomNodeClient() {
    return this.context.getValue("roomNodeClient");
  }
  get mediaJoined() {
    var s;
    return ((s = this.roomNodeClient) == null ? void 0 : s.mediaJoined) === !0;
  }
  get pip() {
    return this.context.getValue("pip");
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return this.context.getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return this.context.getValue("logger");
  }
  setupEvents() {
    this.roomSocketHandler.on(
      U.getWaitingRoomRequests,
      this.waitingRoomRequestHandler.bind(this)
    ), this.context.getValue("peerSessionStore").on(k.SOCKET_PEERS, (s) => u(this, null, function* () {
      const t = this.context.getValue("flagsmith").hasFeature(ee.DEBUG_SOCKET_JOIN);
      if (t) {
        const e = s && (s == null ? void 0 : s.length) < 20 ? {
          peers: JSON.stringify(s.map((r) => r.peerId))
        } : void 0;
        this.logger.info("Processing socket peers", e);
      }
      s == null || s.forEach((e) => {
        e.waitlisted || this.onParticipantSocketJoined(this.createParticipantObjFromSocketPeer(e));
      }), t && this.logger.info("Processed socket peers");
    })), this.roomSocketHandler.on(
      this.events.peerJoinedBroadcast,
      ({ participant: s }) => {
        this.logger.info("PEER_INFO:::MEDIA_JOIN", {
          participant: {
            id: s.peerId,
            maskedName: [...(s == null ? void 0 : s.displayName) || ""].map((t, e) => e % 2 ? "*" : t).join("")
          }
        }), this.logger.info("events.peerJoinedBroadcast", { peers: s.peerId }), this.onParticipantMediaJoined(
          s.peerId,
          s.producerStates,
          s.capabilities
        );
      }
    ), this.roomSocketHandler.on(
      this.events.selfJoinComplete,
      ({ participants: s, selectedPeers: t, roomState: e }) => {
        if (this.context.getValue("flagsmith").hasFeature(ee.DEBUG_SOCKET_JOIN)) {
          const a = s && (s == null ? void 0 : s.length) < 20 ? {
            peers: JSON.stringify(s.map((o) => o.peerId))
          } : void 0;
          this.logger.info("events.selfJoinComplete", a);
        }
        s.forEach(
          ({ peerId: a, producerStates: o, capabilities: c }) => this.onParticipantMediaJoined(
            a,
            o,
            c
          )
        );
        const { audioPeers: r, compulsoryPeers: i } = t != null ? t : {};
        e.pinnedPeerIds.length !== 0 && this.onParticipantPinned(e.pinnedPeerIds[0]), this.computeActivateParticipants(r != null ? r : [], i), this.logger.info("selfJoinComplete: Emitting UPDATE_ACTIVE with createAllConsumers=true"), this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { createAllConsumers: !0 });
      }
    ), this.context.getValue("peerSessionStore").on(
      k.MAX_SPATIAL_LAYER_CHANGE,
      ({ peerId: s, maxSpatialLayer: t }) => {
        const e = this.videoPeerConsumerMap.get(s);
        e && (this.context.getValue("flagsmith").hasFeature(ee.DISABLE_LAYER_SWITCH) || (this.maxSpatialLayerUpdates.set(e, t), this.updateConsumerSpatialLayers()));
      }
    ), this.context.getValue("peerSessionStore").on(
      k.NEW_PRODUCER,
      ({ peerId: s, producer: t }) => {
        const e = this.participants.joined.get(s);
        if (!e) {
          this.logger.warn(
            "ParticipantController::NEW_PRODUCER::participant not found",
            {
              producer: {
                id: t == null ? void 0 : t.producerId,
                kind: t == null ? void 0 : t.kind,
                status: "not_initialized",
                appData: { screenShare: t == null ? void 0 : t.screenShare }
              },
              participant: { id: s }
            }
          );
          return;
        }
        e.producers.push(t), this.logger.info(
          "ParticipantController::NEW_PRODUCER::producer_added_to_participant",
          {
            producer: {
              id: t == null ? void 0 : t.producerId,
              peerId: s,
              kind: t == null ? void 0 : t.kind,
              status: "not_initialized",
              appData: { screenShare: t == null ? void 0 : t.screenShare }
            }
          }
        ), (t == null ? void 0 : t.kind) === "audio" && this.participants.audioSubscribed.get(s) || (t == null ? void 0 : t.kind) === "video" && this.participants.videoSubscribed.get(s) || t != null && t.screenShare ? (this.logger.info(`NEW_PRODUCER: scheduling syncConsumer (AUTO mode) - Producer: ${t.producerId}, Peer: ${s}, Kind: ${t.kind}, ScreenShare: ${t.screenShare}, ConsumersSyncing: ${n(this, ms)}, VideoSub: ${t.kind === "video" ? this.participants.videoSubscribed.has(s) : "N/A"}, AudioSub: ${t.kind === "audio" ? this.participants.audioSubscribed.has(s) : "N/A"}`), this.scheduleSyncConsumers({
          source: "NEW_PRODUCER_AUTO"
        })) : this.logger.info(
          "ParticipantController::NEW_PRODUCER::not_consuming_producer_auto",
          {
            producer: {
              id: t == null ? void 0 : t.producerId,
              peerId: s,
              kind: t == null ? void 0 : t.kind,
              status: "UNKNOWN",
              appData: { screenShare: t == null ? void 0 : t.screenShare }
            }
          }
        );
      }
    ), this.context.getValue("peerSessionStore").on(
      k.PRODUCER_CLOSED,
      ({ peerId: s, producerId: t }) => {
        const e = this.participants.joined.get(s);
        if (!e) {
          this.logger.warn(
            "ParticipantController::NEW_PRODUCER::participant not found",
            {
              participant: { id: s }
            }
          );
          return;
        }
        e.producers = e.producers.filter(
          (r) => r.producerId !== t
        );
      }
    ), this.context.getValue("peerSessionStore").on(
      k.PRODUCER_TOGGLE,
      ({
        peerId: s,
        producerId: t,
        paused: e,
        kind: r
      }) => {
        const i = this.participants.joined.get(s);
        if (i) {
          r === "audio" && i.setAudioEnabled(!e);
          const a = i.producers.find(
            (o) => o.producerId === t
          );
          a && (a.pause = e), r === "video" && this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, {
            viewMode: this.participants.viewMode,
            page: this.participants.currentPage
          });
        }
      }
    ), this.roomSocketHandler.on(
      this.events.globalPeerPinBroadcast,
      (s) => {
        let t;
        if (s && (t = s.participantId), !this.mediaJoined)
          return;
        const e = t;
        this.onParticipantPinned(e);
        const r = this.participants.joined.get(e);
        r && (this.logger.info(`globalPeerPinBroadcast: Scheduling audio/video consumer sync for pinned participant ${e} - ProducerCount: ${r.producers.length}, ConsumersSyncing: ${n(this, ms)}, ProducerIds: [${r.producers.map((i) => i.producerId).join(", ")}]`), this.scheduleSyncConsumers({
          source: "GLOBAL_PEER_PIN"
        }));
      }
    ), this.roomSocketHandler.on(this.events.selectedPeer, ({ audioPeers: s, compulsoryPeers: t }) => {
      this.mediaJoined && this.onSelectedPeers(t.concat(s));
    }), this.roomSocketHandler.on(this.events.selectedPeerDiff, ({ entries: s }) => {
      if (!this.mediaJoined)
        return;
      const t = s.map((e) => ({
        peerId: e.peerId,
        priority: e.priority
      }));
      this.updateActiveParticipantsWithPriorities(t, !0);
    });
  }
  /**
   * Socket Service only
   */
  waitingRoomRequestHandler(s) {
    const t = s.requests.filter(
      (r) => !this.participants.waitlisted.toArray().find((i) => i.userId === r.userId)
    ), e = this.participants.waitlisted.toArray().filter(
      (r) => !s.requests.find((i) => i.userId === r.userId)
    );
    t.forEach((r) => this.participants.waitlisted.add(
      new Tr(
        this.context,
        {
          id: r.peerId,
          displayName: r.displayName,
          audioMuted: !0,
          videoEnabled: !1,
          audioTrack: void 0,
          videoTrack: void 0,
          stageStatus: "OFF_STAGE",
          userId: r.userId,
          flags: {},
          isHost: !1,
          customParticipantId: r.customParticipantId,
          picture: r.picture,
          metadata: {
            preset_name: r.presetName
          }
        },
        this.self,
        this.roomSocketHandler
      )
    )), e.forEach((r) => this.participants.waitlisted.delete(r.id));
  }
  get maxPreferredStreams() {
    return this.participants.maxActiveParticipantsCount;
  }
  selectPagePeers(s) {
    const { compulsoryPeers: t } = this.selectedPeers, e = t.filter(
      (d) => this.participants.joined.has(d)
    ), r = Array.from(this.participants.pinned.keys()).filter(
      (d) => !e.includes(d)
    ), i = Array.from(this.participants.joined.toArray().filter((d) => d.stageStatus === "ON_STAGE").map((d) => d.id)), a = Math.max(
      (s - 1) * (this.maxPreferredStreams - e.length - r.length)
    ), o = s * (this.maxPreferredStreams - e.length - r.length);
    return e.concat(r, i.slice(a, o));
  }
  selectActivePeers(s) {
    const t = /* @__PURE__ */ new Map(), e = Array.from(
      this.participants.joined.toArray().filter((p) => p.stageStatus === "ON_STAGE").map((p) => (t.set(p.id, !0), p.id))
    ), r = this.selectedPeers.peers, i = this.participants.pinned.toArray().reduce((p, g) => (g.stageStatus !== "ON_STAGE" ? this.participants.pinned.delete(g.id) : p.push(g.id), p), []), a = this.self.stageStatus === "ON_STAGE" ? 1 : 0, o = s - a, c = new Set(
      r.concat(i).filter((p) => p !== this.self.id && t.has(p))
    );
    let d = Array.from(c);
    const l = o - c.size;
    if (l >= 0) {
      const p = e.filter((g) => !c.has(g) && g !== this.self.id).slice(0, l);
      d = Array.from(c).concat(p);
    } else
      d = d.slice(0, o);
    return d;
  }
  /**
   * NOTE(ravindra-cloudflare):
   * This method retrieves the active peers for the given page and mode,
   * and updates the participants.audioSubscribed & participants.videoSubscribed maps,
   * which are basically active maps to consume.
   *
   * This is why there are no participants.audioSubscribed.add,
   * and participants.videoSubscribed.add method calls.
   *
   * Actual subscription configs, eg: whether consumption is allowed or not of a peer producer
   * is stored in participants.manualProducerConfig.
   *
   * Do not call this method directly, use UPDATE_ACTIVE event instead, for Sanity.
   * Emitting UPDATE_ACTIVE will help figure out races faster, if any.
   * */
  updateMediaSubscribedMaps(s, t) {
    const { page: e } = t != null ? t : {};
    s && n(this, es).mode !== s && (n(this, es).mode = s), e && n(this, es).page !== e && (n(this, es).page = e);
    const { mode: r, page: i } = n(this, es);
    switch (r) {
      case "PAGINATED": {
        if (!i)
          return;
        const a = this.selectPagePeers(i), o = this.selectActivePeers(
          this.participants.maxActiveParticipantsCount + 4
        );
        this.updateParticipantsMap(this.participants.videoSubscribed, a), this.updateParticipantsMap(this.participants.audioSubscribed, o), this.logger.debug(
          "ParticipantController::updateActive::updating_current_page_peers",
          { peerIds: a }
        );
        break;
      }
      case "ACTIVE_GRID": {
        const a = this.selectActivePeers(this.participants.maxActiveParticipantsCount), o = this.selectActivePeers(
          this.participants.maxActiveParticipantsCount + 4
        );
        this.updateParticipantsMapMinReplacement(this.participants.videoSubscribed, a), this.updateParticipantsMap(this.participants.audioSubscribed, o);
        break;
      }
      case "MANUAL":
        break;
      default:
        throw new Error(`View mode ${s} not supported`);
    }
  }
  scheduleSyncConsumers(t) {
    return u(this, arguments, function* ({
      source: s
    }) {
      var r, i, a;
      const e = ((r = n(this, es)) == null ? void 0 : r.mode) === "PAGINATED" && !n(this, ms) ? 200 : 0;
      this.logger.info(`scheduleSyncConsumers():: Source: ${s}, ViewMode: ${(i = n(this, es)) == null ? void 0 : i.mode}, ConsumersSyncing: ${n(this, ms)}, Delay: ${e}, Page: ${(a = n(this, es)) == null ? void 0 : a.page}`), setTimeout(() => this.syncConsumers(), e);
    });
  }
  /**
   * try to avoid calling this method concurrently.
   *
   * To ensure that only once request succeeds and rest get queued,
   * we have a flag `#consumersSyncing` to track the state.
   *
   * If `#consumersSyncing` is true, it means a sync operation is in progress.
   * In this case, we set `#resyncRequired` to true and exit.
   *
   * If `#consumersSyncing` is false, it means no sync operation is in progress.
   * In this case, we set `#consumersSyncing` to true and proceed with the sync operation.
   *
   * Logic:
   * 1. We will get all the producers that should have consumers to show in the current page/mode,
   *    based on audioSubscribed & videoSubscribed, which are active participant maps.
   * 2. We will get all the consumers of producers that we are currently consuming.
   * 3. We will get the difference between the two sets.
   * 4. We will add the consumers of producers that we should ideally have but are not consuming.
   * 5. We will remove the consumers of producers that we are consuming but should not.
   */
  syncConsumers() {
    return u(this, null, function* () {
      var o, c, d, l, p;
      if (((d = (c = (o = this.context.getValue("connectionHandler")) == null ? void 0 : o.mediaState) == null ? void 0 : c.recv) == null ? void 0 : d.state) !== "connected") {
        this.logger.info("syncConsumers: Connection not ready, exiting.");
        return;
      }
      if (n(this, ms)) {
        f(this, ca, !0), this.logger.info("syncConsumers: Sync in progress, marking resyncRequired=true and exiting.");
        return;
      }
      this.logger.info("syncConsumers: Starting sync operation."), f(this, ms, !0), f(this, ca, !1);
      let s = [];
      this.participants.videoSubscribed.forEach((g) => {
        var _, P;
        const S = this.participants.joined.get(g.id), v = (P = (_ = g.producers) == null ? void 0 : _.filter((C) => C.kind === "video")) != null ? P : [];
        S && (v != null && v.length) && v.forEach((C) => {
          var F, N, B, G;
          const w = ((N = (F = S.manualProducerConfig) == null ? void 0 : F.video) != null ? N : !0) && C.kind === "video" && !C.screenShare, $ = ((G = (B = S.manualProducerConfig) == null ? void 0 : B.screenshareVideo) != null ? G : !0) && C.kind === "video" && C.screenShare;
          (w || $) && (C.pause || s.push(C));
        });
      }), this.participants.audioSubscribed.forEach((g) => {
        var _, P;
        const S = this.participants.joined.get(g.id), v = (P = (_ = g.producers) == null ? void 0 : _.filter((C) => C.kind === "audio")) != null ? P : [];
        S && (v != null && v.length) && v.forEach((C) => {
          var F, N, B, G;
          const w = ((N = (F = S.manualProducerConfig) == null ? void 0 : F.audio) != null ? N : !0) && C.kind === "audio" && !C.screenShare, $ = ((G = (B = S.manualProducerConfig) == null ? void 0 : B.screenshareAudio) != null ? G : !0) && C.kind === "audio" && C.screenShare;
          (w || $) && s.push(C);
        });
      }), s = ow(s, (g) => g.producerId);
      const t = /* @__PURE__ */ new Map();
      s.forEach((g) => {
        t.set(g.producerId, g);
      });
      const e = (l = this.roomNodeClient) == null ? void 0 : l.getConsumers(), r = s.filter(
        (g) => !(e != null && e.has(g.producerId))
      ), i = [];
      let a = Array.from(
        (p = e == null ? void 0 : e.values()) != null ? p : []
      ).map((g) => g.peerId);
      a = aw(a), a == null || a.forEach((g) => {
        var v;
        const S = this.participants.joined.get(g);
        if (!S) {
          this.logger.warn(`Peer with ${g} doesn't exist in joined list but producers of it are being consumed.`);
          return;
        }
        (v = S.producers) != null && v.length && S.producers.forEach((_) => {
          const P = _.consumer && e.has(_.consumer.id);
          !t.has(_.producerId) && (e.has(_.producerId) || P) && i.push(_);
        });
      }), this.logger.info(`syncConsumers: Computed changes - AddProducers: ${r.length} [${r.map((g) => g.producerId).join(", ")}], RemoveProducers: ${i.length} [${i.map((g) => g.producerId).join(", ")}]`.substring(0, 5e3));
      try {
        r.length > 0 || i.length > 0 ? (this.logger.info(`syncConsumers: Calling updateConsumers with changes. Adding ${r.length} and removing ${i.length}.`), yield this.updateConsumers(r, i), this.logger.info("syncConsumers: updateConsumers completed successfully.")) : this.logger.info("syncConsumers: No changes needed, skipping updateConsumers.");
      } catch (g) {
        this.logger.error("syncConsumers: updateConsumers failed with error.", { error: g });
      } finally {
        this.logger.info("syncConsumers: Setting consumersSyncing=false and completing sync."), f(this, ms, !1);
      }
      n(this, ca) && (this.logger.info("syncConsumers: Resync required, calling syncConsumers again."), this.syncConsumers());
    });
  }
  computeActivateParticipants(s, t) {
    const e = s.map((i, a) => ({
      peerId: i,
      priority: a + 1
    })), r = t == null ? void 0 : t.map((i, a) => ({
      peerId: i,
      priority: -(a + 1)
    }));
    e.push(...r != null ? r : []), e.length > 0 && this.updateActiveParticipantsWithPriorities(e);
  }
  createParticipantObjFromSocketPeer(s) {
    const t = eS.formatSocketPeerMessage(s);
    return new Tr(this.context, H(D({}, t), {
      isHost: !1,
      videoEnabled: !1,
      audioMuted: !0,
      videoTrack: void 0,
      audioTrack: void 0
    }), this.self, this.roomSocketHandler);
  }
  updatePipSource(s, t) {
    var e, r;
    t ? (e = this.pip) == null || e.enableSource(s) : (r = this.pip) == null || r.disableSource(s);
  }
  /** *
   * NOTE(ravindra-cloudflare):
   * This method is meant to be called for participants that have joined the media room
   * They can now hear/see others.
   *
   * By this time, they have called meeting.join().
   */
  onParticipantMediaJoined(s, t, e) {
    if (!this.mediaJoined || s === this.self.id)
      return;
    const r = this.participants.joined.get(s);
    if (!r) {
      this.logger.warn(`Received media.peerJoinedBroadcast for non-existent peer ${s}`);
      return;
    }
    this.logger.info("PEER_INFO:::SOCKET_ON_MEDIA_JOIN", {
      participant: {
        id: r.id,
        maskedName: [...(r == null ? void 0 : r.name) || ""].map((i, a) => a % 2 ? "*" : i).join("")
      }
    }), this.logger.info(`onParticipantMediaJoined: peer ${s} has joined media room. Processing.`), t.forEach((i) => {
      i.kind === Fs.AUDIO && !i.screenShare ? r.setAudioEnabled(!i.pause) : i.kind === Fs.VIDEO && !i.screenShare && (r.setVideoEnabled(!i.pause), this.updatePipSource(r.id, !i.pause)), r.producers.push(H(D({}, i), {
        producingTransportId: i.producingTransportId,
        kind: i.kind === Fs.AUDIO ? "audio" : "video",
        producingPeerId: s,
        mimeType: i.mimeType
      }));
    }), this.roomNodeClient.handlePeerCapabilities(s, e), this.context.getValue("flagsmith").hasFeature(ee.FORCE_VIDEO_CODEC) || this.roomNodeClient.shareWebcam(this.self.videoTrack), this.logger.info(`onParticipantMediaJoined: Emitting UPDATE_ACTIVE for peer ${s}`), this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.participants.viewMode, page: this.participants.currentPage });
  }
  /**
  	* NOTE(roerohan): The following piece of code updates .active and ensures that the positions
  	* in the peer map are not affected by the order of the peerIds
  	* sent in the input. If a participant is present in the 3rd position in the
  	* map, and room node sends the peerId in the 2nd position, the participant
  	* should remain in the 3rd position.
  */
  updateParticipantsMapMinReplacement(s, t) {
    const e = Array.from(s.keys()), r = new Map(s), i = new Set(t), a = [];
    e.forEach((o, c) => {
      (!i.has(o) || !this.participants.joined.get(o)) && a.push(c);
    }), t.forEach((o) => {
      if (s.get(o))
        return;
      if (e.length < t.length) {
        e.push(o);
        return;
      }
      const c = a.shift();
      e[c] = o;
    }), a.forEach((o) => {
      e.splice(o, 1);
    }), Array.from(s.keys()).forEach((o) => {
      s.delete(o, !i.has(o));
    }), e.forEach((o) => {
      if (!this.participants.joined.get(o)) {
        this.logger.warn(
          "updateActiveParticipants::participant_not_in_joined_list",
          {
            participant: { id: o }
          }
        );
        return;
      }
      s.add(
        this.participants.joined.get(o),
        !r.get(o)
      );
    }), s.emit("participantsUpdate");
  }
  updateParticipantsMap(s, t) {
    Array.from(s.keys()).forEach((r) => {
      t.includes(r) || s.delete(r, !0);
    }), t.forEach((r) => {
      s.get(r) || s.add(this.participants.joined.get(r), !0);
    }), s.emit("participantsUpdate");
  }
  updatePinnedParticipants() {
    this.participants.pinned.forEach((s) => {
      s.setIsPinned(!1), this.participants.pinned.delete(s.id);
    });
  }
  setupEventsGlobal() {
    this.roomSocketHandler.on(U.joinRoom, ({ peer: s }) => {
      if (!s.waitlisted) {
        const t = this.context.getValue("flagsmith").hasFeature(ee.DEBUG_SOCKET_JOIN);
        t && this.logger.info("Processing socket join", { peers: s.peerId }), this.onParticipantSocketJoined(this.createParticipantObjFromSocketPeer(s)), t && this.logger.info("Processed socket join", { peers: s.peerId });
      }
    }), this.roomSocketHandler.on(U.leaveRoom, (s) => {
      const { peerId: t } = s.peer;
      this.selectedPeers.delete(t, this.context), this.onParticipantLeave(t);
    }), this.context.getValue("peerSessionStore").on(
      k.SOCKET_SERVICE_ROOM_JOINED,
      () => {
        this.self.permissions.acceptWaitingRequests && this.roomSocketHandler.getWaitingRoomRequests();
      }
    ), this.self.permissions.on("permissionsUpdate", (s) => {
      const { acceptWaitingRequests: t } = s;
      t !== void 0 && (t ? this.roomSocketHandler.getWaitingRoomRequests() : this.participants.waitlisted.clear());
    }), this.context.getValue("peerSessionStore").on(k.SOCKET_SERVICE_DISCONNECTED, () => {
      this.participants.joined.clear(), this.participants.videoSubscribed.clear(), this.participants.audioSubscribed.clear(), this.participants.pinned.clear(), this.participants.currentPage = 0, this.participants.viewMode = "ACTIVE_GRID", this.participants.emit("viewModeChanged", {
        viewMode: "ACTIVE_GRID",
        currentPage: this.participants.currentPage,
        pageCount: this.participants.pageCount
      });
    }), this.context.getValue("peerSessionStore").on(
      k.CONSUMER_PAUSED,
      ({ id: s }) => {
        this.processConsumerPaused(s);
      }
    ), this.context.getValue("peerSessionStore").on(
      k.CONSUMER_RESUMED,
      ({ id: s }) => {
        this.processConsumerResumed(s);
      }
    ), this.context.getValue("peerSessionStore").on(
      k.NEW_CONSUMER,
      ({ id: s }) => {
        this.processNewConsumer(s);
      }
    ), this.context.getValue("peerSessionStore").on(
      k.CONSUMER_CLOSED,
      ({ id: s }) => {
        this.processConsumerClosed(s);
      }
    ), this.context.getValue("peerSessionStore").on(
      k.ROOM_MESSAGE,
      (r) => u(this, [r], function* ({
        payload: s,
        type: t,
        timestamp: e
      }) {
        this.participants.emit("broadcastedMessage", {
          type: t,
          payload: s,
          timestamp: e
        });
      })
    ), this.context.getValue("peerSessionStore").on(
      k.MESSAGE,
      (r) => u(this, [r], function* ({
        payload: s,
        type: t,
        timestamp: e
      }) {
        t !== "spotlight" && this.participants.emit("broadcastedMessage", {
          type: t,
          payload: s,
          timestamp: e
        });
      })
    ), this.context.getValue("peerSessionStore").on(
      k.LOW_CONSUMER_SCORE,
      ({
        peerId: s,
        score: t,
        kind: e
      }) => {
        const r = this.participants.joined.get(s);
        r && (r.emit("poorConnection", { score: t, kind: e }), this.participants.emit("poorConnection", {
          participantId: s,
          score: t,
          kind: e
        }));
      }
    ), this.context.getValue("peerSessionStore").on(
      k.CONSUMER_SCORE_UPDATE,
      ({
        score: s,
        kind: t,
        appData: e,
        peerId: r,
        scoreStats: i
      }) => {
        var c;
        const a = t === "video" && ((c = e == null ? void 0 : e.screenShare) != null ? c : !1), o = this.participants.joined.get(r);
        o && (o.emit("mediaScoreUpdate", {
          kind: t,
          isScreenshare: a,
          score: s,
          participantId: r,
          scoreStats: i
        }), this.participants.emit("mediaScoreUpdate", {
          kind: t,
          isScreenshare: a,
          score: s,
          participantId: r,
          scoreStats: i
        }));
      }
    ), this.context.getValue("peerSessionStore").onAsync(k.KICK_PEER, (t) => u(this, [t], function* ({ peerId: s }) {
      const e = this.participants.joined.get(s);
      this.roomNodeClient.kick(s), yield this.roomSocketHandler.kick(s), e ? e.emit("kicked") : this.participants.joined.emit("kicked", { id: s });
    })), this.context.getValue("peerSessionStore").on(k.UPDATE_ACTIVE, (...r) => u(this, [...r], function* ({ viewMode: s, page: t, createAllConsumers: e } = { viewMode: "ACTIVE_GRID", page: 0, createAllConsumers: !1 }) {
      this.logger.info(`UPDATE_ACTIVE event received - viewMode: ${n(this, es).mode}, page: ${t}, CreateAllConsumers: ${e}`), e && (this.logger.info(`UPDATE_ACTIVE viewMode: ${s}, Page: ${t}, Removing existing subscriptions.`), this.participants.videoSubscribed.clear(), this.participants.audioSubscribed.clear()), this.updateMediaSubscribedMaps(s, { page: t }), this.scheduleSyncConsumers({ source: "UPDATE_ACTIVE" });
    }));
  }
  onParticipantPinned(s) {
    return u(this, null, function* () {
      if (!s) {
        this.self.isPinned && this.self.setIsPinned(!1), this.participants.pinned.size !== 0 && this.updatePinnedParticipants();
        return;
      }
      if (s === this.self.id) {
        this.participants.pinned.size !== 0 && this.updatePinnedParticipants(), this.self.setIsPinned(!0);
        return;
      }
      const t = this.participants.joined.get(s);
      this.self.isPinned && this.self.setIsPinned(!1), this.updatePinnedParticipants(), t.setIsPinned(!0), this.participants.pinned.add(t);
    });
  }
  /** *
   * NOTE(ravindra-cloudflare):
   * This method is meant to be called for participants that are on setup screen,
   * therefore connected to the socket edge.
   *
   * However they haven't called meeting.join() yet.
   */
  onParticipantSocketJoined(s) {
    return u(this, null, function* () {
      var t, e, r;
      this.logger.info(`onParticipantSocketJoined: peer ${s.id} has joined socket edge. Processing.`), this.self.id !== s.id && !((t = s.flags) != null && t.recorder) && !((e = s.flags) != null && e.hidden_participant) && !((r = s.flags) != null && r.hiddenParticipant) && (this.participants.videoSubscribed.delete(s.id), this.participants.audioSubscribed.delete(s.id), this.participants.joined.add(s), this.participants.waitlisted.delete(s.id), s.stageStatus === "REQUESTED_TO_JOIN_STAGE" && this.context.getValue("peerSessionStore").emit(k.UPDATE_STAGE_REQUESTS, {
        request: {
          displayName: s.name,
          userId: s.userId,
          peerId: s.id
        },
        add: !0
      })), this.context.getValue("peerSessionStore").emit(k.PEER_JOINED_INTERNAL, s);
    });
  }
  onParticipantLeave(s) {
    return u(this, null, function* () {
      const t = this.participants.joined.get(s);
      this.participants.joined.delete(s, !0, !0), this.participants.pinned.delete(s, !0, !0), this.participants.waitlisted.delete(s, !0, !0), this.roomNodeClient && (this.roomNodeClient.handlePeerLeaving(s), this.roomNodeClient.closeConsumers(t == null ? void 0 : t.producers)), t && t.stageStatus === "REQUESTED_TO_JOIN_STAGE" && this.context.getValue("peerSessionStore").emit(k.UPDATE_STAGE_REQUESTS, {
        request: {
          displayName: t.name,
          userId: t.userId,
          peerId: t.id
        },
        add: !1
      });
      const { currentPage: e } = this.participants, r = this.maxPreferredStreams * (e - 1), i = this.participants.videoSubscribed.get(s);
      this.participants.viewMode === "MANUAL" ? this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.participants.viewMode, page: e }) : r === 0 ? this.participants.setViewMode("ACTIVE_GRID") : this.participants.joined.size <= r ? e === 2 ? this.participants.setViewMode("ACTIVE_GRID") : this.participants.setPage(e - 1) : i && this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.participants.viewMode, page: e });
    });
  }
  processMedia(s) {
    var g;
    const t = this.roomNodeClient.getConsumers(), {
      peerId: e,
      kind: r,
      appData: i,
      track: a,
      producerId: o,
      rtpReceiver: c,
      paused: d,
      localId: l
    } = (g = t.get(s)) != null ? g : {};
    if (!e)
      return this.logger.warn("processMedia::Peer ID is undefined", {
        consumer: {
          id: s,
          kind: r,
          peerId: e,
          appData: {
            supportsRemoteControl: !!(i != null && i.supportsRemoteControl),
            screenShare: !!(i != null && i.screenShare)
          },
          remotelyPaused: d,
          producerId: o
        }
      }), {};
    const p = i;
    return r === "video" && p.screenShare !== !0 && this.videoPeerConsumerMap.set(e, s), this.logger.info("ParticipantController::processMedia", {
      consumer: {
        id: s,
        peerId: e,
        kind: r,
        appData: p,
        remotelyPaused: d,
        producerId: o
      }
    }), this.consumerPeerMap.set(s, {
      type: r,
      peerId: e,
      appData: p,
      remotelyPaused: d,
      producerId: o
    }), {
      peerId: e,
      kind: r,
      appData: p,
      remotelyPaused: d,
      track: a,
      producerId: o,
      rtpReceiver: c,
      localId: l
    };
  }
  processConsumerClosed(s) {
    const {
      peerId: t,
      type: e,
      appData: r,
      remotelyPaused: i,
      producerId: a
    } = this.consumerPeerMap.get(s) || {}, o = this.participants.joined.get(t);
    if (this.logger.info("ParticipantController::processConsumerClosed", {
      consumer: {
        id: s,
        peerId: t,
        appData: r,
        kind: e,
        remotelyPaused: i,
        producerId: a
      }
    }), this.consumerPeerMap.delete(s), e === "video" && r.screenShare !== !0 && this.videoPeerConsumerMap.delete(t), !o)
      return;
    const c = o.producers.find((l) => l.producerId === a);
    c && (c.consumer = {
      id: s,
      peerId: t,
      kind: void 0,
      appData: r,
      paused: i,
      producerId: a,
      rtpReceiver: void 0,
      localId: void 0
    });
    const d = [];
    r && r.screenShare ? (o.setScreenShareEnabled(!1), this.context.getValue("callstats").consumerSharedMediaState(s, { screen: !1 }), o.screenShareTracks.video && d.push(o.screenShareTracks.video.id), o.screenShareTracks.audio && d.push(o.screenShareTracks.audio.id), o.screenShareTracks = {
      audio: void 0,
      video: void 0
    }) : e === "audio" ? (o.setAudioEnabled(!1), o.audioTrack && d.push(o.audioTrack.id), this.context.getValue("callstats").consumerSharedMediaState(s, { audio: !1 }), o.audioTrack = void 0) : e === "video" && (o.setVideoEnabled(!1), this.updatePipSource(o.id, !1), o.videoTrack && d.push(o.videoTrack.id), this.context.getValue("callstats").consumerSharedMediaState(s, { video: !1 }), o.videoTrack = void 0), r.e2ee && d.forEach((l) => {
      this.context.getValue("peerSessionStore").emit(
        k.E2EE_INACTIVE_CONSUMER,
        {
          peerId: t,
          trackId: l
        }
      );
    });
  }
  processConsumerResumed(s) {
    var S;
    const t = this.processMedia(s), {
      peerId: e,
      kind: r,
      appData: i,
      track: a,
      remotelyPaused: o,
      producerId: c,
      rtpReceiver: d,
      localId: l
    } = t;
    if (!e)
      return;
    this.logger.info("ParticipantController::processConsumerResumed", {
      consumer: {
        id: s,
        peerId: e,
        kind: r,
        appData: i,
        remotelyPaused: o,
        producerId: c
      }
    });
    const p = this.participants.joined.get(e);
    if (!p)
      return;
    const g = p.producers.find((v) => v.producerId === c);
    if (g && (g.consumer = {
      id: s,
      peerId: e,
      kind: r,
      appData: i,
      paused: o,
      producerId: c,
      rtpReceiver: d,
      localId: l
    }), i.e2ee && this.context.getValue("peerSessionStore").emit(k.E2EE_ACTIVE_CONSUMER, { peerId: e, rtpReceiver: d, track: a }), i.screenShare) {
      r === "video" ? p.screenShareTracks.video = a : r === "audio" && (p.screenShareTracks.audio = a), p.setScreenShareEnabled(!0), (S = this.context) == null || S.getValue("callstats").consumerSharedMediaState(s, { screen: !0 });
      return;
    }
    r === "video" ? (p.videoTrack = a, p.setVideoEnabled(!0), this.updatePipSource(p.id, !0), this.context.getValue("callstats").consumerSharedMediaState(s, { video: !0 })) : r === "audio" && (p.audioTrack = a, p.setAudioEnabled(p.audioEnabled), this.context.getValue("callstats").consumerSharedMediaState(s, {
      audio: p.audioEnabled
    }));
  }
  processConsumerPaused(s) {
    this.logger.info(
      `ParticipantController::processConsumerPaused called for consumerId: ${s}`
    );
    const {
      peerId: t,
      kind: e,
      track: r,
      appData: i,
      remotelyPaused: a,
      producerId: o,
      rtpReceiver: c,
      localId: d
    } = this.processMedia(s);
    if (!t)
      return;
    this.logger.info("ParticipantController::processConsumerPaused", {
      consumer: {
        id: s,
        peerId: t,
        kind: e,
        appData: i,
        remotelyPaused: a,
        producerId: o
      }
    });
    const l = this.participants.joined.get(t);
    if (!l)
      return;
    const p = l.producers.find((g) => g.producerId === o);
    p && (p.consumer = {
      id: s,
      peerId: t,
      kind: e,
      appData: i,
      paused: a,
      producerId: o,
      rtpReceiver: c,
      localId: d
    }), r && i.e2ee && this.context.getValue("peerSessionStore").emit(k.E2EE_INACTIVE_CONSUMER, { peerId: t, trackId: r.id }), e === "video" ? (l.videoTrack = r, l.setVideoEnabled(!1), this.updatePipSource(l.id, !1), this.context.getValue("callstats").consumerSharedMediaState(s, { video: !1 })) : e === "audio" && (l.audioTrack = r, l.setAudioEnabled(l.audioEnabled), this.context.getValue("callstats").consumerSharedMediaState(s, {
      audio: l.audioEnabled
    }));
  }
  processNewConsumer(s) {
    const {
      peerId: t,
      kind: e,
      remotelyPaused: r,
      track: i,
      appData: a,
      producerId: o,
      rtpReceiver: c,
      localId: d
    } = this.processMedia(s);
    if (!t)
      return;
    this.logger.info("ParticipantController::processNewConsumer", {
      consumer: {
        id: s,
        peerId: t,
        kind: e,
        remotelyPaused: r,
        appData: a,
        producerId: o
      }
    });
    const l = this.participants.joined.get(t);
    if (!l)
      return;
    const p = l.producers.find((g) => g.producerId === o);
    if (p && (p.consumer = {
      id: s,
      peerId: t,
      kind: e,
      appData: a,
      paused: r,
      producerId: o,
      rtpReceiver: c,
      localId: d
    }), a.screenShare) {
      e === "video" ? l.screenShareTracks.video = i : e === "audio" && (l.screenShareTracks.audio = i), (!r || this.self.permissions.isRecorder || this.context.getValue("flagsmith").hasFeature(ee.SCREEENSHARE_ERR_HACK)) && l.setScreenShareEnabled(!0), a.supportsRemoteControl && (l.supportsRemoteControl = !0), this.participants.broadcastMessage("screenshareConsumerCreated", {
        producerId: o,
        peerId: t,
        screenShare: !0,
        consumerId: s,
        consumerPeerId: this.self.id
      }), this.logger.info("ParticipantController::newScreenshareConsumer::screenshareConsumerCreated", {
        consumer: {
          id: s,
          peerId: t,
          kind: e,
          remotelyPaused: r,
          appData: a,
          producerId: o
        }
      });
      return;
    }
    e === "video" ? (l.videoTrack = i, r || (l.setVideoEnabled(!0), this.updatePipSource(l.id, !0)), this.context.getValue("callstats").consumerSharedMediaState(s, {
      video: !r
    })) : e === "audio" && (l.audioTrack = i, r || l.setAudioEnabled(!0), this.context.getValue("callstats").consumerSharedMediaState(s, {
      audio: !r
    })), !r && a.e2ee && this.context.getValue("peerSessionStore").emit(k.E2EE_ACTIVE_CONSUMER, { peerId: t, rtpReceiver: c, track: i });
  }
  static formatSocketPeerMessage(s) {
    var e, r, i, a, o, c;
    if (!s)
      return;
    const t = Nh(s.stageType);
    return {
      id: s.peerId,
      userId: s.userId,
      name: s.displayName,
      displayName: s.displayName,
      stageType: t,
      customParticipantId: s.customParticipantId,
      presetId: s.presetId,
      picture: s.displayPictureUrl,
      waitlisted: s.waitlisted,
      stageStatus: t,
      metadata: {
        preset_name: (e = s.flags) == null ? void 0 : e.presetName
      },
      recorderType: (r = s.flags) == null ? void 0 : r.recorderType,
      flags: {
        hiddenParticipant: (i = s.flags) == null ? void 0 : i.hiddenParticipant,
        hidden_participant: (a = s.flags) == null ? void 0 : a.hiddenParticipant,
        recorder: ((o = s.flags) == null ? void 0 : o.recorderType) !== void 0 && ((c = s.flags) == null ? void 0 : c.recorderType) !== "NONE"
      }
    };
  }
  // XXX dead code, this event is not fired
  onSelectedPeers(s, t) {
    return u(this, null, function* () {
      this.participants.viewMode === "ACTIVE_GRID" && this.computeActivateParticipants(s, t);
    });
  }
  updateActiveParticipantsWithPriorities(s, t = !1) {
    if (this.participants.viewMode === "MANUAL")
      return;
    if (!this.mediaJoined) {
      this.logger.warn(
        "Skipped::ParticipantController::updateActiveParticipantsWithPriorities",
        {
          roomJoined: this.mediaJoined
        }
      );
      return;
    }
    s.forEach((r) => {
      this.selectedPeers.add(r.peerId, r.priority, this.context);
    });
    const e = this.selectedPeers.activeSpeakerPeers.at(0);
    e !== void 0 && e !== this.participants.lastActiveSpeaker && (this.participants.lastActiveSpeaker = e, this.participants.emit("activeSpeaker", {
      peerId: e,
      volume: 1
      // priority
    })), t && this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { viewMode: this.participants.viewMode, page: this.participants.currentPage });
  }
}, es = new WeakMap(), ms = new WeakMap(), ca = new WeakMap(), qg);
let Pr = eS;
gn([
  E.trace("ParticipantController.setupEvents")
], Pr.prototype, "setupEvents", 1);
gn([
  E.trace("ParticipantController.setupEvents")
], Pr.prototype, "setupEventsGlobal", 1);
gn([
  E.trace("ParticipantController.processMedia")
], Pr.prototype, "processMedia", 1);
gn([
  E.trace("ParticipantController.processConsumerClosed")
], Pr.prototype, "processConsumerClosed", 1);
gn([
  E.trace("ParticipantController.processConsumerResumed")
], Pr.prototype, "processConsumerResumed", 1);
gn([
  E.trace("ParticipantController.processConsumerPaused")
], Pr.prototype, "processConsumerPaused", 1);
gn([
  E.trace("ParticipantController.processNewConsumer")
], Pr.prototype, "processNewConsumer", 1);
const ue = Rs(
  Rh().permissions
);
var q, da, la, Wd, ft, Nt;
const wn = class extends qt {
  constructor(e, r, i, a = !1) {
    const o = e.getValue("logger");
    super(o);
    m(this, ft);
    m(this, q, void 0);
    m(this, da, void 0);
    m(this, la, void 0);
    m(this, Wd, (e) => {
      var p, g, S;
      const l = e, {
        chat: r,
        connectedMeetings: i,
        plugins: a,
        polls: o,
        media: c
      } = l, d = ro(l, [
        "chat",
        "connectedMeetings",
        "plugins",
        "polls",
        "media"
      ]);
      if (r && (r.private && Rr(n(this, q).chat.private, r.private), r.public && Rr(n(this, q).chat.public, r.public), this.emit("chatUpdate")), i && Rr(n(this, q).connectedMeetings, i), c) {
        const v = (P) => {
          switch (P) {
            case Qr.NONE:
              return j.Allowed;
            case Qr.ALLOWED:
              return j.Allowed;
            case Qr.NOT_ALLOWED:
              return j.NotAllowed;
            case Qr.CAN_REQUEST:
              return j.CanRequest;
            default:
              return;
          }
        }, _ = {
          audio: void 0,
          video: void 0,
          screenshare: void 0
        };
        (p = c.audio) != null && p.canProduce && (_.audio = {
          canProduce: v(c.audio.canProduce)
        }), (g = c.video) != null && g.canProduce && (_.video = {
          canProduce: v(c.video.canProduce)
        }), (S = c.screenshare) != null && S.canProduce && (_.screenshare = {
          canProduce: v(c.screenshare.canProduce)
        }), Rr(n(this, q).media, _);
      }
      a && (Rr(n(this, q).plugins, a), this.emit("pluginsUpdate")), o && (Rr(n(this, q).polls, o), this.emit("pollsUpdate")), Object.keys(d).length !== 0 && Rr(n(this, q), d), this.emit("permissionsUpdate", e);
    });
    if (!r)
      throw this.logger.error("PermissionPreset::load_preset_permissions_failed"), new b("Could not load preset permissions.", "0904");
    f(this, la, e), f(this, da, i), f(this, q, r), a && this.setupEvents();
  }
  setupEvents() {
    n(this, la).getValue("peerSessionStore").on(k.UPDATE_PERMISSIONS, n(this, Wd));
  }
  /** @deprecated. Use init() */
  static fromResponse(e, r, i) {
    return new wn(i, e, r, !0);
  }
  /** @deprecated. Use init() */
  static default(e, r) {
    return new wn(e, ue, r);
  }
  static init(e, r, i) {
    let a;
    return i ? a = new wn(e, i, r, !0) : a = new wn(e, ue, r), a;
  }
  // eslint-disable-next-line class-methods-use-this
  get mediaRoomType() {
    return "CF";
  }
  /**
   * The `stageEnabled` property returns a boolean value.
   * If `true`, stage management is available for the participant.
   */
  get stageEnabled() {
    var e;
    return ((e = n(this, q)) == null ? void 0 : e.stageEnabled) || n(this, da) === At.Webinar || n(this, da) === At.Livestream;
  }
  get acceptStageRequests() {
    var e, r;
    return this.stageEnabled ? ((e = n(this, q)) == null ? void 0 : e.acceptStageRequests) || ((r = n(this, q)) == null ? void 0 : r.canAcceptProductionRequests) : !1;
  }
  /**
   * The `stageAccess` property dictactes how a user interacts with the stage.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`;
   */
  get stageAccess() {
    var e, r, i;
    return ((e = n(this, q)) == null ? void 0 : e.stageAccess) === j.NotAllowed ? j.NotAllowed : ((r = n(this, q)) == null ? void 0 : r.stageAccess) === j.CanRequest ? j.CanRequest : ((i = n(this, q)) == null ? void 0 : i.stageAccess) === j.Allowed || n(this, q).media.audio.canProduce === j.Allowed || n(this, q).media.video.canProduce === j.Allowed || n(this, q).media.screenshare.canProduce === j.Allowed ? j.Allowed : n(this, q).media.audio.canProduce === j.CanRequest || n(this, q).media.video.canProduce === j.CanRequest || n(this, q).media.screenshare.canProduce === j.CanRequest ? j.CanRequest : j.NotAllowed;
  }
  /**
   * The `acceptWaitingRequests` returns boolean value.
   * If `true`, participant can accept the request of waiting participant.
   */
  get acceptWaitingRequests() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.acceptWaitingRequests) != null ? r : ue.acceptWaitingRequests;
  }
  /**
   * The `requestProduceVideo` returns boolean value.
   * If `true`, participant can send request to participants
   * about producing video.
   */
  get requestProduceVideo() {
    var e, r, i;
    return ((i = (r = (e = n(this, q)) == null ? void 0 : e.media) == null ? void 0 : r.video) == null ? void 0 : i.canProduce) === j.CanRequest;
  }
  /**
   * The `requestProduceAudio` returns boolean value.
   * If `true`, participant can send request to participants
   * about producing audio.
   */
  get requestProduceAudio() {
    var e, r, i;
    return ((i = (r = (e = n(this, q)) == null ? void 0 : e.media) == null ? void 0 : r.audio) == null ? void 0 : i.canProduce) === j.CanRequest;
  }
  /**
   * The `requestProduceScreenshare` returns boolean value.
   * If `true`, participant can send request to participants
   * about sharing screen.
   */
  get requestProduceScreenshare() {
    var e, r, i;
    return ((i = (r = (e = n(this, q)) == null ? void 0 : e.media) == null ? void 0 : r.screenshare) == null ? void 0 : i.canProduce) === j.CanRequest;
  }
  /**
   * The `canAllowParticipantAudio` returns boolean value.
   * If `true`, participant can enable other participants` audio.
   */
  get canAllowParticipantAudio() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.disableParticipantAudio) != null ? r : ue.disableParticipantAudio;
  }
  /**
   * The `canAllowParticipantScreensharing` returns boolean value.
   * If `true`, participant can enable other participants` screen share.
   */
  get canAllowParticipantScreensharing() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.canAcceptProductionRequests) != null ? r : ue.canAcceptProductionRequests;
  }
  /**
   * The `canAllowParticipantVideo` returns boolean value.
   * If `true`, participant can enable other participants` video.
   */
  get canAllowParticipantVideo() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.disableParticipantVideo) != null ? r : ue.disableParticipantVideo;
  }
  /**
   * If `true`, a participant can disable other participants` audio.
   */
  get canDisableParticipantAudio() {
    return this.canAllowParticipantAudio;
  }
  /**
   * If `true`, a participant can disable other participants` video.
   */
  get canDisableParticipantVideo() {
    return this.canAllowParticipantVideo;
  }
  /**
   * The `kickParticipant` returns boolean value.
   * If `true`, participant can remove other participants from the meeting.
   */
  get kickParticipant() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.kickParticipant) != null ? r : ue.kickParticipant;
  }
  /**
   * The `pinParticipant` returns boolean value.
   * If `true`, participant can pin a participant in the meeting.
   */
  get pinParticipant() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.pinParticipant) != null ? r : ue.pinParticipant;
  }
  /**
   * The `canRecord` returns boolean value.
   * If `true`, participant can record the meeting.
   */
  get canRecord() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.canRecord) != null ? r : ue.canRecord;
  }
  /**
   * @deprecated in favour of `waitingRoomBehaviour`.
   * The `waitingRoomType` returns string value.
   * type of waiting room behavior
   * possible values are `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT`
   */
  get waitingRoomType() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.waitingRoomType) != null ? r : ue.waitingRoomType;
  }
  /**
   * The `waitingRoomType` returns string value.
   * type of waiting room behavior
   * possible values are `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT`
   */
  get waitingRoomBehaviour() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.waitingRoomType) != null ? r : ue.waitingRoomType;
  }
  /**
   * The `plugins` tells if the participant can act on plugins
   * there are 2 permissions with boolean values, `canStart` and `canClose`.
   */
  get plugins() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.plugins) != null ? r : ue.plugins;
  }
  /**
   * The `polls` tells if the participant can use polls.
   * There are 3 permissions with boolean values, `canCreate`, `canVote`, `canViewResults`
   */
  get polls() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.polls) != null ? r : ue.polls;
  }
  /**
   * @deprecated in favour of `canProduceVideo`
   * The `produceVideo` shows permissions for enabling video.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
   */
  get produceVideo() {
    return this.canProduceVideo;
  }
  /**
   * @deprecated
   * The `requestProduce` returns boolean value.
   * If `true`, participant can send request to participants
   * about producing audio, video or screenshare.
   */
  get requestProduce() {
    return n(this, q).media.audio.canProduce === j.CanRequest || n(this, q).media.video.canProduce === j.CanRequest || n(this, q).media.screenshare.canProduce === j.CanRequest;
  }
  /**
   * The `canProduceVideo` shows permissions for enabling video.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
   */
  get canProduceVideo() {
    var r;
    const e = (r = n(this, q).media.video.canProduce) != null ? r : ue.media.video.canProduce;
    return this.stageEnabled && (n(this, ft, Nt) === "ACCEPTED_TO_JOIN_STAGE" || n(this, ft, Nt) === "ON_STAGE") && e === j.CanRequest ? j.Allowed : this.stageEnabled && (n(this, ft, Nt) === "OFF_STAGE" || n(this, ft, Nt) === "REQUESTED_TO_JOIN_STAGE") && e === j.Allowed ? j.NotAllowed : e;
  }
  /**
   * @deprecated in favour of `canProduceScreenshare`
   * The `produceVideo` shows permissions for sharing screen.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
   */
  get produceScreenshare() {
    return this.canProduceScreenshare;
  }
  /**
   * The `canProduceScreenshare` shows permissions for sharing screen.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
   */
  get canProduceScreenshare() {
    var r;
    const e = (r = n(this, q).media.screenshare.canProduce) != null ? r : ue.media.screenshare.canProduce;
    return this.stageEnabled && (n(this, ft, Nt) === "ACCEPTED_TO_JOIN_STAGE" || n(this, ft, Nt) === "ON_STAGE") && e === j.CanRequest ? j.Allowed : this.stageEnabled && (n(this, ft, Nt) === "OFF_STAGE" || n(this, ft, Nt) === "REQUESTED_TO_JOIN_STAGE") && e === j.Allowed ? j.NotAllowed : e;
  }
  /**
   * @deprecated in favour of `canProduceAudio`
   * The `produceAudio` shows permissions for enabling audio.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
   */
  get produceAudio() {
    return this.canProduceAudio;
  }
  /**
   * The `canProduceAudio` shows permissions for enabling audio.
   * There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`
   */
  get canProduceAudio() {
    var r;
    const e = (r = n(this, q).media.audio.canProduce) != null ? r : ue.media.audio.canProduce;
    return this.stageEnabled && (n(this, ft, Nt) === "ACCEPTED_TO_JOIN_STAGE" || n(this, ft, Nt) === "ON_STAGE") && e === j.CanRequest ? j.Allowed : this.stageEnabled && (n(this, ft, Nt) === "OFF_STAGE" || n(this, ft, Nt) === "REQUESTED_TO_JOIN_STAGE") && e === j.Allowed ? j.NotAllowed : e;
  }
  /**
   * The `chatPublic` shows permissions for public chat
   * there are 4 permissions
   * `canSend` - if true, the participant can send chat
   * `text` - if true, the participant can send text
   * `files` - if true, the participant can send files
   */
  get chatPublic() {
    var e, r, i;
    return (i = (r = (e = n(this, q)) == null ? void 0 : e.chat) == null ? void 0 : r.public) != null ? i : ue.chat.public;
  }
  /**
   * The `chatPrivate` shows permissions for public chat
   * there are 4 permissions
   * `canSend` - if true, the participant can send private chat
   * `text` - if true, the participant can send text as private chat
   * `files` - if true, the participant can send files as private chat
   * `canReceive` - (optional) if true, the participant can receive private chat
   */
  get chatPrivate() {
    var e, r, i;
    return (i = (r = (e = n(this, q)) == null ? void 0 : e.chat) == null ? void 0 : r.private) != null ? i : ue.chat.private;
  }
  get chatChannel() {
    var e, r, i;
    return (i = (r = (e = n(this, q)) == null ? void 0 : e.chat) == null ? void 0 : r.channel) != null ? i : ue.chat.channel;
  }
  get chatMessage() {
    var e, r, i;
    return (i = (r = (e = n(this, q)) == null ? void 0 : e.chat) == null ? void 0 : r.message) != null ? i : ue.chat.message;
  }
  get connectedMeetings() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.connectedMeetings) != null ? r : ue == null ? void 0 : ue.connectedMeetings;
  }
  /**
   * The `hiddenParticipant` returns boolean value.
   * If `true`, participant is hidden.
   */
  get hiddenParticipant() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.hiddenParticipant) != null ? r : ue.hiddenParticipant;
  }
  /**
   * The `showParticipantList` returns boolean value.
   * If `true`, participant list can be shown to the participant.
   */
  get showParticipantList() {
    var e;
    return (e = n(this, q).showParticipantList) != null ? e : ue.showParticipantList;
  }
  /**
   * @deprecated in favour of `canChangeParticipantPermissions`
   * The `canChangeParticipantRole` returns boolean value.
   * If `true`, allow changing the participants' role.
   */
  get canChangeParticipantRole() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.canChangeParticipantPermissions) != null ? r : ue.canChangeParticipantPermissions;
  }
  /**
   * The `canChangeParticipantPermissions` returns boolean value.
   * If `true`, allow changing the participants' permissions.
   */
  get canChangeParticipantPermissions() {
    var e, r;
    return (r = (e = n(this, q)) == null ? void 0 : e.canChangeParticipantPermissions) != null ? r : ue.canChangeParticipantPermissions;
  }
  /**
   * @deprecated
   * The `canChangeTheme` returns boolean value.
   * If `true`, the participant can change the meeting theme.
   */
  // eslint-disable-next-line class-methods-use-this
  get canChangeTheme() {
    return !1;
  }
  /**
   * @deprecated in favour of individual production settings
   * The `canPresent` returns boolean value.
   * If `true`, the participant can become a presentor.
   */
  get canPresent() {
    return n(this, q).media.audio.canProduce === j.Allowed || n(this, q).media.video.canProduce === j.Allowed || n(this, q).media.screenshare.canProduce === j.Allowed;
  }
  /**
   * @deprecated Use `acceptStageRequests` instead.
   */
  get acceptPresentRequests() {
    return this.acceptStageRequests;
  }
  get canEditDisplayName() {
    var e;
    return (e = n(this, q).canEditDisplayName) != null ? e : !1;
  }
  /**
   * @deprecated Self.config.maxScreenShareCount
   */
  // eslint-disable-next-line class-methods-use-this
  get maxScreenShareCount() {
    return 1;
  }
  // eslint-disable-next-line class-methods-use-this
  get isRecorder() {
    return n(this, q).isRecorder;
  }
  get canSpotlight() {
    return n(this, q).canSpotlight;
  }
  /** Livestream */
  get canLivestream() {
    return n(this, q).canLivestream;
  }
  get transcriptionEnabled() {
    return n(this, q).transcriptionEnabled;
  }
};
let Wu = wn;
q = new WeakMap(), da = new WeakMap(), la = new WeakMap(), Wd = new WeakMap(), ft = new WeakSet(), Nt = function() {
  return n(this, la).getValue("stageStatus");
};
var fs;
class tS extends qt {
  constructor() {
    super(...arguments);
    h(this, "localMediaHandler");
    m(this, fs, void 0);
  }
  updatePermission() {
    return u(this, null, function* () {
      var d, l;
      const e = (p, g) => {
        this.mediaPermissions[p] = g;
        const S = { message: this.mediaPermissions[p], kind: p };
        g === "DENIED" ? n(this, fs).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_ERROR, S) : n(this, fs).getValue("peerSessionStore").emit(k.MEDIA_PERMISSION_UPDATE, S);
      };
      if (ye.getName() === "firefox")
        return;
      const r = "microphone", i = "camera", a = yield (d = navigator == null ? void 0 : navigator.permissions) == null ? void 0 : d.query({ name: r }), o = yield (l = navigator == null ? void 0 : navigator.permissions) == null ? void 0 : l.query({
        name: i
      }), c = (p, g) => {
        switch (g) {
          case "granted":
            e(p, "ACCEPTED");
            break;
          case "denied":
            e(p, "DENIED");
            break;
          case "prompt":
            e(p, "NOT_REQUESTED");
            break;
        }
        this.localMediaHandler.repopulateAvailableDevices();
      };
      a && (a.onchange = () => c("audio", a.state)), o && (o.onchange = () => c("video", o.state));
    });
  }
  // eslint-disable-next-line class-methods-use-this
  populateMediaPermissionsInCallstats(i) {
    return u(this, arguments, function* ({
      message: e,
      kind: r
    }) {
      var a, o, c, d;
      switch (r) {
        case "audio": {
          (a = n(this, fs)) == null || a.getValue("callstats").mediaPermission("AUDIO", e), (o = n(this, fs)) == null || o.getValue("callstats").mediaPermission("SPEAKER", e);
          break;
        }
        case "video": {
          (c = n(this, fs)) == null || c.getValue("callstats").mediaPermission("VIDEO", e);
          break;
        }
        case "screenshare": {
          (d = n(this, fs)) == null || d.getValue("callstats").mediaPermission("SCREENSHARE", e);
          break;
        }
      }
    });
  }
  get peerId() {
    var e;
    return (e = n(this, fs)) == null ? void 0 : e.getValue("peerId");
  }
  init() {
    return u(this, arguments, function* (e = {}, r = !1, i = null) {
      var a, o, c, d, l, p, g;
      if (ye.init(), !this.localMediaHandler)
        try {
          let S = !0;
          if ((a = i == null ? void 0 : i.getValue("defaults")) != null && a.mediaHandler)
            S = !1, this.localMediaHandler = i.getValue("defaults").mediaHandler.localMediaHandler;
          else if (navigator.RNLocalMediaHandlerImpl) {
            const { RNLocalMediaHandlerImpl: v } = navigator;
            this.localMediaHandler = yield v.init(e);
          } else
            this.localMediaHandler = new Dt(
              i,
              e.constraints,
              (o = i == null ? void 0 : i.getValue("defaults")) == null ? void 0 : o.isNonPreferredDevice,
              (c = i == null ? void 0 : i.getValue("defaults")) == null ? void 0 : c.autoSwitchAudioDevice
            );
          if (i == null || i.getValue("peerSessionStore").on(
            k.MEDIA_PERMISSION_UPDATE,
            (v) => u(this, null, function* () {
              if (this.populateMediaPermissionsInCallstats({
                message: v.message,
                kind: v.kind
              }), v.message === "NOT_REQUESTED")
                switch (v == null ? void 0 : v.kind) {
                  case "audio":
                    this.rawAudioTrack && (this.logger.info("Disabling audio due to media permission update"), this.disableAudio());
                    break;
                  case "video":
                    this.rawVideoTrack && (this.logger.info("Disabling video due to media permission update"), this.disableVideo());
                    break;
                  default:
                    break;
                }
              this.emit("mediaPermissionUpdate", v);
            })
          ), i == null || i.getValue("peerSessionStore").on(
            k.MEDIA_PERMISSION_ERROR,
            (v) => u(this, null, function* () {
              const { kind: _, message: P, constraints: C } = v;
              this.populateMediaPermissionsInCallstats({
                message: P,
                kind: _
              }), _ === "audio" ? (this.logger.info(`Disabling audio due to media permission error  skipping: ${this.localMediaHandler.audioUpdateInProgress}`), this.localMediaHandler.audioUpdateInProgress === !1 && this.disableAudio()) : _ === "video" && (this.logger.info(`Disabling video due to media permission error skipping: ${this.localMediaHandler.videoUpdateInProgress}`), this.localMediaHandler.videoUpdateInProgress === !1 && this.disableVideo()), this.logger.error("SelfController::mediaPermissionError", {
                error: { message: P },
                constraints: C,
                mediaPermissionsErrors: {
                  kind: _,
                  message: P
                }
              }), this.emit("mediaPermissionError", v), this.emit("mediaPermissionUpdate", { message: P, kind: _ });
            })
          ), S) {
            this.logger.info(`Setting up SelfMedia streams using media handler. audio:${(d = e == null ? void 0 : e.audio) != null ? d : !0} video:${(l = e == null ? void 0 : e.video) != null ? l : !0}`);
            const v = this.localMediaHandler.setupStreams({
              video: (p = e == null ? void 0 : e.video) != null ? p : !0,
              audio: (g = e == null ? void 0 : e.audio) != null ? g : !0
            });
            r || (yield v);
          }
        } catch (S) {
          this.logger.error("Self::init::Failed To Setup Streams", {
            error: { name: S.name, message: S.message }
          });
        }
    });
  }
  set context(e) {
    f(this, fs, e), this.localMediaHandler.context = e;
  }
  /**
   * Returns the `audioTrack`.
   */
  get audioTrack() {
    return this.localMediaHandler.audioTrack;
  }
  /**
   * Returns the `rawAudioTrack` having no middleware executed on it.
   */
  get rawAudioTrack() {
    return this.localMediaHandler.rawAudioTrack;
  }
  /**
   * Returns the current audio and video permissions given by the user.
   * 'ACCEPTED' if the user has given permission to use the media.
   * 'CANCELED' if the user has canceled the screenshare.
   * 'DENIED' if the user has denied permission to use the media.
   * 'SYS_DENIED' if the user's system has denied permission to use the media.
   * 'UNAVAILABLE' if the media is not available (or being used by a different application).
   */
  get mediaPermissions() {
    return this.localMediaHandler.permissions;
  }
  /**
   * Adds the audio middleware to be executed on the raw audio stream.
   * If there are more than 1 audio middlewares,
   * they will be executed in the sequence they were added in.
   * If you want the sequence to be altered, please remove all previous middlewares and re-add.
   */
  addAudioMiddleware(e) {
    return u(this, null, function* () {
      return this.localMediaHandler.addAudioMiddleware(e);
    });
  }
  /**
   * Removes the audio middleware, if it is there.
   */
  removeAudioMiddleware(e) {
    return u(this, null, function* () {
      return this.localMediaHandler.removeAudioMiddleware(e);
    });
  }
  /**
   * Removes all audio middlewares, if they are there.
   */
  removeAllAudioMiddlewares() {
    return u(this, null, function* () {
      return this.localMediaHandler.removeAllAudioMiddlewares();
    });
  }
  /**
   * Returns the `videoTrack`.
   */
  get videoTrack() {
    return this.localMediaHandler.videoTrack;
  }
  /**
   * Returns the `videoTrack` having no middleware executed on it.
   */
  get rawVideoTrack() {
    return this.localMediaHandler.rawVideoTrack;
  }
  /**
   * Adds the video middleware to be executed on the raw video stream.
   * If there are more than 1 video middlewares,
   * they will be executed in the sequence they were added in.
   * If you want the sequence to be altered, please remove all previous middlewares and re-add.
   */
  addVideoMiddleware(e) {
    return u(this, null, function* () {
      return this.localMediaHandler.addVideoMiddleware(e);
    });
  }
  /**
   * Sets global config to be used by video middlewares.
   * @param config config
   * @param config.disablePerFrameCanvasRendering If set to true,
   * Instead of calling Middleware for every frame,
   * Middleware will only be called once that too with empty canvas,
   *  it is the responsibility of the middleware author to keep updating this canvas.
   * `meeting.self.rawVideoTrack` can be used to retrieve video track for the periodic updates.
   */
  setVideoMiddlewareGlobalConfig() {
    return u(this, arguments, function* (e = {
      disablePerFrameCanvasRendering: !1
    }) {
      return this.localMediaHandler.setVideoMiddlewareGlobalConfig(e);
    });
  }
  /**
   * Removes the video middleware, if it is there.
   */
  removeVideoMiddleware(e) {
    return u(this, null, function* () {
      return this.localMediaHandler.removeVideoMiddleware(e);
    });
  }
  /**
   * Removes all video middlewares, if they are there.
   */
  removeAllVideoMiddlewares() {
    return u(this, null, function* () {
      return this.localMediaHandler.removeAllVideoMiddlewares();
    });
  }
  /**
   * Returns the screen share tracks.
   */
  get screenShareTracks() {
    return this.localMediaHandler.screenShareTracks;
  }
  /**
   * Returns true if audio is enabled.
   */
  get audioEnabled() {
    return this.localMediaHandler.audioEnabled;
  }
  /**
   * Returns true if video is enabled.
   */
  get videoEnabled() {
    return this.localMediaHandler.videoEnabled;
  }
  /**
   * Returns true if screen share is enabled.
   */
  get screenShareEnabled() {
    return this.localMediaHandler.screenShareEnabled;
  }
  enableAudio() {
    return u(this, null, function* () {
      yield this.localMediaHandler.enableAudio(), this.emit("audioUpdate", {
        audioEnabled: this.audioEnabled,
        audioTrack: this.audioTrack
      });
    });
  }
  enableVideo() {
    return u(this, null, function* () {
      yield this.localMediaHandler.enableVideo(), this.emit("videoUpdate", {
        videoEnabled: this.videoEnabled,
        videoTrack: this.videoTrack
      });
    });
  }
  disableAudio() {
    return u(this, null, function* () {
      this.localMediaHandler.disableAudio(), this.emit("audioUpdate", {
        audioEnabled: this.audioEnabled,
        audioTrack: this.audioTrack
      });
    });
  }
  enableScreenShare() {
    return u(this, null, function* () {
      yield this.localMediaHandler.enableScreenShare(), this.emit("screenShareUpdate", {
        screenShareEnabled: this.screenShareEnabled,
        screenShareTracks: this.screenShareTracks
      });
    });
  }
  disableScreenShare() {
    return u(this, null, function* () {
      yield this.localMediaHandler.disableScreenShare(), this.emit("screenShareUpdate", {
        screenShareEnabled: this.screenShareEnabled,
        screenShareTracks: this.screenShareTracks
      });
    });
  }
  disableVideo() {
    return u(this, null, function* () {
      yield this.localMediaHandler.disableVideo(), this.emit("videoUpdate", {
        videoEnabled: this.videoEnabled,
        videoTrack: this.videoTrack
      });
    });
  }
  /**
   * Returns the media devices currently being used.
   */
  getCurrentDevices() {
    return this.localMediaHandler.getCurrentDevices();
  }
  /**
   * Returns the local participant's audio devices.
   */
  getAudioDevices() {
    return u(this, null, function* () {
      return yield this.localMediaHandler.getAudioDevices();
    });
  }
  /**
   * Returns the local participant's video devices.
   */
  getVideoDevices() {
    return u(this, null, function* () {
      return yield this.localMediaHandler.getVideoDevices();
    });
  }
  /**
   * Returns the local participant's speaker devices.
   */
  getSpeakerDevices() {
    return u(this, null, function* () {
      return yield this.localMediaHandler.getSpeakerDevices();
    });
  }
  /**
   * Returns the local participant's device, indexed by ID and kind.
   * @param deviceId The ID of the device.
   * @param kind The kind of the device: audio, video, or speaker.
   */
  getDeviceById(e, r) {
    let i;
    return r === "audio" ? i = "audioinput" : r === "video" ? i = "videoinput" : r === "speaker" && (i = "audiooutput"), this.localMediaHandler.getDeviceById(e, i);
  }
  /**
   * Change the current media device that is being used by the local participant.
   * @param device The device that is to be used. A device of the same `kind` will be replaced.
   * the primary stream.
   */
  setDevice(e) {
    return u(this, null, function* () {
      switch (e.kind) {
        case "audioinput":
          try {
            yield this.localMediaHandler.setAudioDevice(e);
          } catch (r) {
          } finally {
            this.emit("audioUpdate", {
              audioEnabled: this.audioEnabled,
              audioTrack: this.audioTrack
            });
          }
          break;
        case "audiooutput":
          yield this.localMediaHandler.setSpeakerDevice(e);
          break;
        case "videoinput":
          try {
            yield this.localMediaHandler.setVideoDevice(e);
          } catch (r) {
          } finally {
            this.emit("videoUpdate", {
              videoEnabled: this.videoEnabled,
              videoTrack: this.videoTrack
            });
          }
          break;
      }
      this.emit("deviceUpdate", {
        device: e
      });
    });
  }
}
fs = new WeakMap();
var xD = Object.defineProperty, UD = Object.getOwnPropertyDescriptor, Pt = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? UD(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && xD(t, e, i), i;
}, ua, St, ha, Fe, sr, oi, qe, Qe, pa, md, Ve, Be, ga, ma, ec, Ju, jg;
let Ye = (jg = class extends tS {
  constructor(t, e, r, i, a) {
    var c;
    const o = t.getValue("logger");
    super(o);
    m(this, sr);
    // eslint-disable-next-line class-methods-use-this
    m(this, qe);
    m(this, pa);
    /**
     * Returns true if the local participant has joined the meeting.
     */
    m(this, Ve);
    m(this, ec);
    h(this, "name");
    h(this, "picture");
    h(this, "customParticipantId");
    h(this, "waitlistStatus");
    m(this, ua, void 0);
    m(this, St, void 0);
    m(this, ha, void 0);
    h(this, "role");
    h(this, "userId");
    h(this, "organizationId");
    h(this, "supportsRemoteControl", !1);
    h(this, "device");
    m(this, Fe, void 0);
    h(this, "hidden", !1);
    /* Name of the preset used to join the meeting */
    h(this, "presetName");
    /**
     * Returns the current state of room
     * init - Inital State
     * joined - User is in the meeting
     * waitlisted - User is in the waitlist state
     * rejected - User's was in the waiting room, but the entry was rejected
     * kicked - A priveleged user removed the user from the meeting
     * left - User left the meeting
     * ended - The meeting was ended
     */
    h(this, "roomState", "init");
    m(this, ga, /* @__PURE__ */ new Set());
    m(this, ma, /* @__PURE__ */ new Set());
    f(this, Fe, t), this.userId = e.id, this.name = e.name, this.picture = e.picture, this.customParticipantId = (c = e.customParticipantId) != null ? c : e.clientSpecificId, this.waitlistStatus = "none", f(this, St, r), f(this, ua, i), this.hidden = !1, f(this, ha, !1), this.organizationId = e.organizationId, this.supportsRemoteControl = ye.isElectron(), this.device = ye.getDeviceInfo(), this.presetName = a, i.viewType !== At.Chat && this.updatePermission(), this.updateVideo = this.updateVideo.bind(this), x(this, ec, Ju).call(this);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Fe).getValue("telemetry");
  }
  get stageStatus() {
    return n(this, Fe).getValue("stageStatus");
  }
  get producers() {
    var t, e;
    return Array.from((e = (t = n(this, qe, Qe).getProducers()) == null ? void 0 : t.values()) != null ? e : []);
  }
  get id() {
    return this.peerId;
  }
  /** NOTE(ishita1805): Discussed with Ravindra, added a duplicate for consistency
   * when using identifiers in Locker.
   * We might want to look at deprecating the `id` sometime later. */
  get peerId() {
    return n(this, Fe).getValue("peerId");
  }
  static __init__(t, e, r, i, a, o = !1) {
    return u(this, null, function* () {
      var S, v, _, P, C, w;
      let c = (v = (S = t.getValue("defaults")) == null ? void 0 : S.audio) != null ? v : !0, d = (P = (_ = t.getValue("defaults")) == null ? void 0 : _.video) != null ? P : !0;
      r.canProduceAudio !== "ALLOWED" && (c = !1), r.canProduceVideo !== "ALLOWED" && (d = !1);
      const l = new Ye(t, e, r, i, a);
      if (i.viewType === At.Chat)
        return l;
      const p = K0(i.mediaConstraints);
      Rr(p, (C = t.getValue("defaults")) == null ? void 0 : C.mediaConfiguration);
      const g = (w = t.getValue("defaults")) == null ? void 0 : w.mediaHandler;
      return g && (g.context = t), yield l.init({
        audio: c,
        video: d,
        constraints: p
      }, o, t), l.setupEvents(), l;
    });
  }
  cleanupEvents() {
    this.removeAllListeners("videoUpdate"), this.localMediaHandler.removeAllListeners("AUDIO_TRACK_CHANGE"), this.localMediaHandler.removeAllListeners("VIDEO_TRACK_CHANGE"), this.localMediaHandler.removeAllListeners("DEVICE_CHANGE"), this.localMediaHandler.removeAllListeners("DEVICE_LIST_UPDATED"), this.localMediaHandler.removeAllListeners("SCREENSHARE_TRACK_CHANGE"), this.localMediaHandler.removeAllListeners("SCREENSHARE_ENDED"), this.localMediaHandler.removeAllListeners("AUDIO_TRACK_SILENT"), this.localMediaHandler.removeAllListeners("FORCE_MUTE_AUDIO"), this.localMediaHandler.removeAllListeners("FORCE_MUTE_VIDEO"), n(this, St).removeAllListeners("permissionsUpdate");
  }
  setupEvents() {
    this.on("videoUpdate", x(this, ec, Ju));
    const t = n(this, pa, md);
    t && t.onError((e) => {
      this.emit("autoplayError", e);
    }), this.localMediaHandler.on("AUDIO_TRACK_CHANGE", () => u(this, null, function* () {
      if (this.logger.info("Self::setupEvents::AUDIO_TRACK_CHANGE", D({}, hi(this))), n(this, Ve, Be) && this.audioEnabled)
        try {
          yield n(this, qe, Qe).shareMic(this.audioTrack);
        } catch (e) {
          this.logger.error("Self::setupEvents::Error while sharing mic", {
            error: e
          }), this.localMediaHandler.disableAudio();
        }
      this.emit("audioUpdate", {
        audioEnabled: this.audioEnabled,
        audioTrack: this.audioTrack
      });
    })), this.localMediaHandler.on("VIDEO_TRACK_CHANGE", () => u(this, null, function* () {
      if (this.logger.info("Self::setupEvents::VIDEO_TRACK_CHANGE", D({}, hi(this))), n(this, Ve, Be) && this.rawVideoTrack === void 0)
        this.logger.info("Self::VIDEO_TRACK_CHANGE::Forcing_disable_video"), this.disableVideo();
      else if (this.videoEnabled && n(this, Ve, Be))
        try {
          const e = yield n(this, qe, Qe).shareWebcam(this.videoTrack);
          e && e.id !== this.videoTrack.id && n(this, Fe).getValue("flagsmith").hasFeature(ee.EXP_RESHARE) && (yield n(this, qe, Qe).shareWebcam(this.videoTrack));
        } catch (e) {
          this.logger.error("Self::setupEvents::failed shareWebcam", {
            error: e
          }), this.videoEnabled && (yield this.localMediaHandler.disableVideo());
        }
      this.emit("videoUpdate", {
        videoEnabled: this.videoEnabled,
        videoTrack: this.videoTrack
      });
    })), this.localMediaHandler.on(
      "DEVICE_CHANGE",
      (r) => u(this, [r], function* ({ device: e }) {
        var i;
        this.emit("deviceUpdate", {
          device: e
        }), e.kind === "audiooutput" && typeof HTMLAudioElement.prototype.setSinkId == "function" && ((i = n(this, pa, md)) == null || i.setSpeakerDevice(e.deviceId));
      })
    ), this.localMediaHandler.on("DEVICE_LIST_UPDATED", (e) => {
      this.emit("deviceListUpdate", e);
    }), this.localMediaHandler.on("SCREENSHARE_TRACK_CHANGE", () => u(this, null, function* () {
      if (!n(this, Ve, Be)) {
        this.logger.error(
          "Self.SCREENSHARE_TRACK_CHANGE.LocalMediaInitialized_WithoutRoomNode"
        );
        return;
      }
      if (this.screenShareEnabled)
        try {
          yield n(this, qe, Qe).shareScreen(this.screenShareTracks);
        } catch (e) {
          this.logger.error(
            "Self::setupEvents::Error while sharing screen",
            {
              error: e
            }
          ), this.screenShareEnabled && (yield this.localMediaHandler.disableScreenShare());
        }
      this.logger.info("Self::setupEvents::SCREENSHARE_TRACK_CHANGE", D({}, hi(this))), this.emit("screenShareUpdate", {
        screenShareEnabled: this.screenShareEnabled,
        screenShareTracks: this.screenShareTracks
      });
    })), this.localMediaHandler.on("SCREENSHARE_ENDED", () => u(this, null, function* () {
      this.logger.log("Disabling screenshare due to SCREENSHARE_ENDED"), yield this.disableScreenShare(), this.logger.info("Self::setupEvents::SCREENSHARE_ENDED", D({}, hi(this)));
    })), this.localMediaHandler.on("AUDIO_TRACK_SILENT", () => {
      var e;
      (e = n(this, Fe)) == null || e.getValue("callstats").mediaTrackMuted("AUDIO");
    }), this.localMediaHandler.on("FORCE_MUTE_AUDIO", () => {
      this.disableAudio();
    }), this.localMediaHandler.on("FORCE_MUTE_VIDEO", () => u(this, null, function* () {
      var e;
      n(this, Ve, Be) && (yield n(this, qe, Qe).pauseWebcam()), this.emit("videoUpdate", {
        videoEnabled: this.videoEnabled,
        videoTrack: this.videoTrack
      }), (e = n(this, Fe)) == null || e.getValue("callstats").videoOff();
    })), n(this, St).on("permissionsUpdate", (e) => {
      var r, i, a;
      (r = e == null ? void 0 : e.media) != null && r.audio && n(this, St).canProduceAudio !== j.Allowed && (this.disableAudio(), this.logger.info(`Disabled audio due to dynamic preset change: canProduceAudio: ${this.permissions.canProduceAudio}`)), (i = e == null ? void 0 : e.media) != null && i.video && n(this, St).canProduceVideo !== j.Allowed && (this.disableVideo(), this.logger.info(`Disabled video due to dynamic preset change: canProduceVideo: ${this.permissions.canProduceVideo}`)), (a = e == null ? void 0 : e.media) != null && a.screenshare && n(this, St).canProduceScreenshare !== j.Allowed && (this.disableScreenShare(), this.logger.info(`Disabled screenshare due to dynamic preset change: canProduceScreenshare: ${this.permissions.canProduceScreenshare}`));
    });
  }
  /**
   * Returns the current permission given to the user for the meeting.
   */
  get permissions() {
    return n(this, St);
  }
  /**
   * Returns configuration for the meeting.
   */
  get config() {
    return n(this, ua);
  }
  /**
   * Returns true if the local participant has joined the meeting.
   */
  get roomJoined() {
    var t;
    return n(this, ua).viewType === At.Livestream && this.stageStatus !== "ON_STAGE" ? ((t = n(this, Fe).getValue("connectionHandler")) == null ? void 0 : t.socketJoined) === !0 : n(this, Ve, Be);
  }
  /**
   * The name of the user can be set by calling this method.
   * This will get reflected to other participants ONLY if
   * this method is called before the room is joined.
   * @param name Name of the user.
   */
  setName(t) {
    if (!t)
      throw new b("Name cannot be empty.", "1103");
    this.name = t;
  }
  setupTracks() {
    return u(this, arguments, function* (t = {}) {
      t.forceReset, yield this.disableAudio(), yield this.disableVideo(), this.localMediaHandler.removeAudioTrack(), this.localMediaHandler.removeVideoTrack(), t.audio && (yield this.enableAudio()), t.video && (yield this.enableVideo());
    });
  }
  destructMediaHandler() {
    return u(this, null, function* () {
      return this.localMediaHandler.destruct();
    });
  }
  removeDocumentEventListeners() {
    return u(this, null, function* () {
      return this.localMediaHandler.removeDocumentEventListeners();
    });
  }
  enableAudio(t) {
    return u(this, null, function* () {
      var e;
      if (this.permissions.canProduceAudio !== j.NotAllowed && !(n(this, St).canProduceAudio === j.CanRequest && (this.stageStatus === "OFF_STAGE" || this.stageStatus === "REQUESTED_TO_JOIN_STAGE")) && !this.audioEnabled) {
        if ((e = n(this, Fe)) == null || e.getValue("callstats").audioOn(), yield this.localMediaHandler.enableAudio(t), n(this, Ve, Be) && this.stageStatus === "ON_STAGE") {
          if (this.audioTrack)
            try {
              yield n(this, qe, Qe).shareMic(this.audioTrack);
            } catch (r) {
              this.logger.error("Self::enableAudio::Error while sharing mic", {
                error: r
              }), this.localMediaHandler.disableAudio();
            }
          if (!this.audioEnabled)
            return;
        }
        this.emit("audioUpdate", {
          audioEnabled: this.audioEnabled,
          audioTrack: this.audioTrack
        });
      }
    });
  }
  enableVideo(t) {
    return u(this, null, function* () {
      var e;
      if (n(this, St).canProduceVideo !== j.NotAllowed && !(n(this, St).canProduceVideo === j.CanRequest && (this.stageStatus === "OFF_STAGE" || this.stageStatus === "REQUESTED_TO_JOIN_STAGE")) && !this.videoEnabled) {
        if ((e = n(this, Fe)) == null || e.getValue("callstats").videoOn(), yield this.localMediaHandler.enableVideo(t), n(this, Ve, Be) && this.stageStatus === "ON_STAGE")
          try {
            yield n(this, qe, Qe).shareWebcam(this.videoTrack);
          } catch (r) {
            this.logger.error("Self::enableVideo::Error while sharing video", {
              error: r
            }), this.videoEnabled && this.localMediaHandler.disableVideo();
          }
        this.emit("videoUpdate", {
          videoEnabled: this.videoEnabled,
          videoTrack: this.videoTrack
        }), this.logger.info("Self.enableVideo", D({}, hi(this)));
      }
    });
  }
  updateVideoConstraints(t) {
    return u(this, null, function* () {
      if (!this.localMediaHandler.updateVideoConstraints)
        throw new b("Unsupported", "1102");
      yield this.localMediaHandler.updateVideoConstraints(t);
    });
  }
  enableScreenShare() {
    return u(this, null, function* () {
      if (!n(this, Ve, Be))
        throw new b("Can`t enable screenshare without joining room", "1105");
      if (n(this, St).canProduceScreenshare !== j.NotAllowed && !(n(this, St).canProduceScreenshare === j.CanRequest && (this.stageStatus === "OFF_STAGE" || this.stageStatus === "REQUESTED_TO_JOIN_STAGE")) && !this.screenShareEnabled && (yield this.localMediaHandler.enableScreenShare(), this.screenShareTracks.audio || this.screenShareTracks.video)) {
        try {
          yield n(this, qe, Qe).shareScreen(this.screenShareTracks);
        } catch (t) {
          this.logger.error(
            "Self::enableScreenShare::Error while sharing screen",
            {
              error: t
            }
          ), this.screenShareEnabled && (yield this.localMediaHandler.disableScreenShare());
        }
        this.emit("screenShareUpdate", {
          screenShareEnabled: this.screenShareEnabled,
          screenShareTracks: this.screenShareTracks
        });
      }
    });
  }
  updateScreenshareConstraints(t) {
    return u(this, null, function* () {
      if (!this.localMediaHandler.updateScreenshareConstraints)
        throw new b("Unsupported", "1102");
      yield this.localMediaHandler.updateScreenshareConstraints(t);
    });
  }
  disableAudio() {
    return u(this, null, function* () {
      var t;
      this.audioEnabled && (this.localMediaHandler.disableAudio(), n(this, Ve, Be) && n(this, qe, Qe).muteSelf(), this.emit("audioUpdate", {
        audioEnabled: this.audioEnabled,
        audioTrack: this.audioTrack
      }), (t = n(this, Fe)) == null || t.getValue("callstats").audioOff());
    });
  }
  disableVideo() {
    return u(this, null, function* () {
      var t;
      this.videoEnabled && (yield this.localMediaHandler.disableVideo(), n(this, Ve, Be) && (yield n(this, qe, Qe).pauseWebcam()), this.emit("videoUpdate", {
        videoEnabled: this.videoEnabled,
        videoTrack: this.videoTrack
      }), (t = n(this, Fe)) == null || t.getValue("callstats").videoOff());
    });
  }
  disableScreenShare() {
    return u(this, null, function* () {
      this.screenShareEnabled && (yield this.localMediaHandler.disableScreenShare(), n(this, Ve, Be) && (yield n(this, qe, Qe).disableScreenShare()), this.emit("screenShareUpdate", {
        screenShareEnabled: this.screenShareEnabled,
        screenShareTracks: this.screenShareTracks
      }));
    });
  }
  /**
   * Returns all media devices accessible by the local participant.
   */
  getAllDevices() {
    return this.localMediaHandler.getAllDevices();
  }
  /**
   * @access private
   * Not for external use.
   */
  setIsPinned(t, e = !0) {
    var i;
    f(this, ha, t);
    const r = t ? "pinned" : "unpinned";
    (i = n(this, sr, oi)) == null || i.updateSource(this.id, { pinned: t }), e && this.emit(r, this);
  }
  /**
   * Returns true if the current user is pinned.
   */
  get isPinned() {
    return n(this, ha);
  }
  /**
   * Returns `self.id` if user has permission
   * to pin participants.
   */
  pin() {
    return u(this, null, function* () {
      if (!n(this, Ve, Be))
        throw new b("Can`t pin participants without joining room", "1105");
      return this.show(), n(this, qe, Qe).pinPeer(this.id);
    });
  }
  /**
   * Returns `self.id` if user has permission
   * to unpin participants.
   */
  unpin() {
    return u(this, null, function* () {
      if (!n(this, Ve, Be))
        throw new b("Can`t unpin participants without joining room", "1105");
      return n(this, qe, Qe).pinPeer(null);
    });
  }
  /**
   * Hide's user's tile in the UI (locally)
   */
  hide() {
    return u(this, null, function* () {
      if (!n(this, Ve, Be))
        throw new b("Can`t toggle participant tile without joining room", "1105");
      this.hidden = !0, this.emit("toggleTile", { hidden: this.hidden });
    });
  }
  /**
   * Show's user's tile in the UI if hidden (locally)
   */
  show() {
    if (!n(this, Ve, Be))
      throw new b("Can`t toggle participant tile without joining room", "1105");
    this.hidden = !1, this.emit("toggleTile", { hidden: this.hidden });
  }
  setDevice(t) {
    return u(this, null, function* () {
      var r, i, a;
      if (!t)
        throw new b("No device selected", "1104");
      const e = this.getCurrentDevices();
      if (t.deviceId && (((r = e == null ? void 0 : e.audio) == null ? void 0 : r.deviceId) === t.deviceId || ((i = e == null ? void 0 : e.video) == null ? void 0 : i.deviceId) === t.deviceId || ((a = e == null ? void 0 : e.speaker) == null ? void 0 : a.deviceId) === t.deviceId) && (this.logger.warn("Self.setDevice.setting_to_in_use_device", { devices: [t] }), n(this, Fe).getValue("flagsmith").hasFeature(ee.SKIP_SETTING_IN_USE_DEVICE)))
        throw new b("Cannot set device currently in use", "1106");
      switch (t.kind) {
        case "audioinput":
          try {
            yield this.localMediaHandler.setAudioDevice(t);
          } catch (o) {
            n(this, Ve, Be) && (yield n(this, qe, Qe).muteSelf()), this.emit("audioUpdate", {
              audioEnabled: this.audioEnabled,
              audioTrack: this.audioTrack
            });
          }
          break;
        case "audiooutput":
          yield this.localMediaHandler.setSpeakerDevice(t);
          break;
        case "videoinput":
          try {
            yield this.localMediaHandler.setVideoDevice(t);
          } catch (o) {
            n(this, Ve, Be) && (yield n(this, qe, Qe).pauseWebcam()), this.emit("videoUpdate", {
              videoEnabled: this.videoEnabled,
              videoTrack: this.videoTrack
            });
          }
          break;
      }
    });
  }
  cleanUpTracks() {
    var t, e, r, i;
    (t = this.audioTrack) == null || t.stop(), (e = this.rawAudioTrack) == null || e.stop(), (r = this.videoTrack) == null || r.stop(), (i = this.rawVideoTrack) == null || i.stop();
  }
  playAudio() {
    var t;
    return (t = n(this, pa, md)) == null ? void 0 : t.play();
  }
  registerVideoElement(t, e = !1) {
    var r, i;
    t && (e ? n(this, ga).add(t) : n(this, ma).add(t), this.updateVideo(t), e || (i = n(this, sr, oi)) == null || i.addSource(
      this.id,
      t,
      this.videoEnabled,
      this.isPinned,
      this.name,
      this.picture,
      (r = this.raised) != null ? r : !1
    ));
  }
  deregisterVideoElement(t, e = !1) {
    if (!t) {
      n(this, sr, oi).removeSource(this.id);
      return;
    }
    t.srcObject = void 0, e ? n(this, ga).delete(t) : (n(this, ma).delete(t), n(this, sr, oi).removeSource(this.id));
  }
  /**
   * Internal method, do not use
   */
  updateVideo(t, e = !1) {
    var r, i, a;
    if (this.videoEnabled) {
      if (this.videoTrack == null)
        return;
      const o = (r = t.srcObject) == null ? void 0 : r.getTracks()[0];
      if ((o == null ? void 0 : o.id) === this.videoTrack.id)
        return;
      const c = new MediaStream();
      c.addTrack(this.videoTrack), t.srcObject = c, e || (i = n(this, sr, oi)) == null || i.enableSource(this.id);
    } else
      t.srcObject = void 0, e || (a = n(this, sr, oi)) == null || a.disableSource(this.id);
    t.style.display = this.videoEnabled ? "block" : "none";
  }
}, ua = new WeakMap(), St = new WeakMap(), ha = new WeakMap(), Fe = new WeakMap(), sr = new WeakSet(), oi = function() {
  return n(this, Fe).getValue("pip");
}, qe = new WeakSet(), Qe = function() {
  return n(this, Fe).getValue("roomNodeClient");
}, pa = new WeakSet(), md = function() {
  return n(this, Fe).getValue("audioPlayback");
}, Ve = new WeakSet(), Be = function() {
  var t;
  return ((t = n(this, Fe).getValue("connectionHandler")) == null ? void 0 : t.mediaJoined) === !0;
}, ga = new WeakMap(), ma = new WeakMap(), ec = new WeakSet(), Ju = function() {
  Array.from(n(this, ma)).forEach((t) => this.updateVideo(t, !1)), Array.from(n(this, ga)).forEach((t) => this.updateVideo(t, !0));
}, jg);
Pt([
  E.trace("Self.cleanupEvents")
], Ye.prototype, "cleanupEvents", 1);
Pt([
  E.trace("Self.setupEvents")
], Ye.prototype, "setupEvents", 1);
Pt([
  E.trace("Self.setupTracks")
], Ye.prototype, "setupTracks", 1);
Pt([
  E.trace("Self.destructMediaHandler")
], Ye.prototype, "destructMediaHandler", 1);
Pt([
  E.trace("Self.removeDocumentEventListeners")
], Ye.prototype, "removeDocumentEventListeners", 1);
Pt([
  _r.executeWithLock({
    methodName: "meeting.self.enableAudio",
    lockName: "Self.toggleAudio",
    timeout: 3e3
  }),
  E.trace("Self.enableAudio")
], Ye.prototype, "enableAudio", 1);
Pt([
  _r.executeWithLock({
    methodName: "meeting.self.enableVideo",
    lockName: "Self.toggleVideo",
    timeout: 3e3
  }),
  E.trace("Self.enableVideo")
], Ye.prototype, "enableVideo", 1);
Pt([
  E.trace("Self.updateVideoConstraints")
], Ye.prototype, "updateVideoConstraints", 1);
Pt([
  E.trace("Self.enableScreenShare"),
  _r.executeWithLock({
    methodName: "meeting.self.enableScreenShare",
    lockName: "Self.toggleScreenShare",
    timeout: 3e3
  })
], Ye.prototype, "enableScreenShare", 1);
Pt([
  E.trace("Self.updateScreenshareConstraints")
], Ye.prototype, "updateScreenshareConstraints", 1);
Pt([
  _r.executeWithLock({
    methodName: "meeting.self.disableAudio",
    lockName: "Self.toggleAudio",
    timeout: 3e3
  }),
  E.trace("Self.disableAudio")
], Ye.prototype, "disableAudio", 1);
Pt([
  _r.executeWithLock({
    methodName: "meeting.self.disableVideo",
    lockName: "Self.toggleVideo",
    timeout: 3e3
  }),
  E.trace("Self.disableVideo")
], Ye.prototype, "disableVideo", 1);
Pt([
  _r.executeWithLock({
    methodName: "meeting.self.disableScreenShare",
    lockName: "Self.toggleScreenShare",
    timeout: 3e3
  }),
  E.trace("Self.disableScreenShare")
], Ye.prototype, "disableScreenShare", 1);
Pt([
  E.trace("Self.setDevice")
], Ye.prototype, "setDevice", 1);
Ye = Pt([
  ut("1100")
], Ye);
class Fh extends Error {
  constructor(t) {
    super(t != null ? t : "AwaitQueue stopped"), this.name = "AwaitQueueStoppedError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Fh);
  }
}
class Bh extends Error {
  constructor(t) {
    super(t != null ? t : "AwaitQueue task removed"), this.name = "AwaitQueueRemovedTaskError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Bh);
  }
}
var tc;
class Ku {
  constructor(t, e = !1) {
    // Queue of pending tasks (map of PendingTasks indexed by id).
    h(this, "pendingTasks", /* @__PURE__ */ new Map());
    // Incrementing PendingTask id.
    h(this, "nextTaskId", 0);
    // Whether stop() method is stopping all pending tasks.
    h(this, "stopping", !1);
    m(this, tc, void 0);
    this.log = e, f(this, tc, { info: e && t ? t.info : () => {
    } });
  }
  get size() {
    return this.pendingTasks.size;
  }
  push(t, e, r) {
    return u(this, null, function* () {
      if (e = e != null ? e : t.name, typeof t != "function")
        throw new TypeError("given task is not a function");
      if (e)
        try {
          Object.defineProperty(t, "name", { value: e });
        } catch (i) {
        }
      return new Promise((i, a) => {
        const o = {
          id: this.nextTaskId++,
          task: t,
          metadata: r,
          name: e,
          enqueuedAt: Date.now(),
          executedAt: void 0,
          completed: !1,
          resolve: (c) => {
            if (o.completed)
              return;
            o.completed = !0, this.pendingTasks.delete(o.id), i(c);
            const [d] = this.pendingTasks.values();
            d && !d.executedAt && this.execute(d);
          },
          reject: (c) => {
            if (!o.completed && (o.completed = !0, this.pendingTasks.delete(o.id), a(c), !this.stopping)) {
              const [d] = this.pendingTasks.values();
              d && !d.executedAt && this.execute(d);
            }
          }
        };
        this.pendingTasks.set(o.id, o), this.pendingTasks.size === 1 && this.execute(o);
      });
    });
  }
  stop() {
    this.stopping = !0;
    for (const t of this.pendingTasks.values())
      t.reject(new Fh());
    this.stopping = !1;
  }
  remove(t) {
    const e = Array.from(this.pendingTasks.values())[t];
    e && e.reject(new Bh());
  }
  get(t) {
    return Array.from(this.pendingTasks.values())[t];
  }
  dump() {
    const t = Date.now();
    let e = 0;
    return Array.from(this.pendingTasks.values()).map((r) => ({
      idx: e++,
      task: r.task,
      name: r.name,
      enqueuedTime: r.executedAt ? r.executedAt - r.enqueuedAt : t - r.enqueuedAt,
      executionTime: r.executedAt ? t - r.executedAt : 0
    }));
  }
  execute(t) {
    return u(this, null, function* () {
      if (t.executedAt)
        throw new Error("task already being executed");
      t.executedAt = Date.now();
      try {
        const e = this.pendingTasks.size, r = yield t.task(), i = Date.now();
        n(this, tc).info(
          `AwaitQueue.push(${t.name})_timings`,
          {
            awaitQueueTask: {
              id: t.id,
              metadata: t.metadata,
              queueSizeAtStart: e,
              execTime: (i - t.executedAt) / 1e3,
              taskStartTime: (t.executedAt - t.enqueuedAt) / 1e3
            }
          }
        ), t.resolve(r);
      } catch (e) {
        t.reject(e);
      }
    });
  }
}
tc = new WeakMap();
function $D(s, t) {
  const e = new Error(t);
  return e.name = s, e;
}
class Do extends b {
  constructor(t) {
    super(t), this.name = "UnsupportedError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, Do) : this.stack = new Error(t).stack;
  }
}
class It extends b {
  constructor(t) {
    super(t), this.name = "InvalidStateError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, It) : this.stack = new Error(t).stack;
  }
}
class pi extends b {
  constructor(t) {
    super(t), this.name = "TransportConnectionError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, It) : this.stack = new Error(t).stack;
  }
}
const vg = (s) => new Promise((t) => setTimeout(t, s));
function sS(s, t) {
  return u(this, null, function* () {
    return new Promise((e, r) => u(this, null, function* () {
      const { strategy: i, maxRetryCount: a, delayTime: o } = D({
        strategy: "linear",
        maxRetryCount: 3,
        delayTime: 10
      }, t);
      let c = 0, d, l = !1;
      const p = (g) => {
        l = !0, r(g);
      };
      for (; c < a; ) {
        try {
          const g = yield s(c, p);
          return e(g);
        } catch (g) {
          if (d = g, l)
            break;
          if (c < a)
            i === "linear" ? yield vg(o * (c + 1)) : i === "exponential" && (yield vg(o * (c + Math.max(0, c - 1))));
          else
            break;
        }
        c += 1;
      }
      return r(d);
    }));
  });
}
function FD(s) {
  return s.map((t) => ({
    channels: t.channels,
    clockRate: t.clockRate,
    mimeType: t.mimeType,
    sdpFmtpLine: t.sdpFmtpLine
  }));
}
function BD(s) {
  return s.map((t) => ({
    uri: t.uri
  }));
}
function rd(s) {
  return {
    codecs: FD(s.codecs),
    headerExtensions: BD(s.headerExtensions ? s.headerExtensions : [])
  };
}
function HD(s) {
  const t = RTCRtpReceiver.getCapabilities("audio"), e = RTCRtpReceiver.getCapabilities("video"), r = RTCRtpSender.getCapabilities("audio"), i = RTCRtpSender.getCapabilities("video");
  s && (e.codecs = e.codecs.filter(({ mimeType: d }) => s === d), i.codecs = i.codecs.filter(({ mimeType: d }) => s === d));
  const a = {
    audio: rd(t),
    video: rd(e)
  };
  return {
    sender: {
      audio: rd(r),
      video: rd(i)
    },
    receiver: a
  };
}
var Je;
class qD {
  constructor(t) {
    m(this, Je, void 0);
    h(this, "events");
    f(this, Je, t), this.events = Cs;
  }
  joinRoom(t, e, r, i = !1, a = null) {
    return u(this, null, function* () {
      const o = {
        roomUuid: t,
        displayName: e,
        prejoined: i,
        capabilities: r
      };
      return a && (o.location = a), (yield n(this, Je).sendMessagePromiseWithTimeout({
        event: this.events.joinRoom,
        protobuf: rR.toBinary(o),
        timeout: 5e3
      })).payload;
    });
  }
  connectTransport(t) {
    return u(this, null, function* () {
      const e = (yield n(this, Je).sendMessagePromise(
        this.events.createWebRTCTransport,
        Mw.toBinary(t)
      )).payload, { transportId: r, description: i, producerIds: a } = mf.fromBinary(e), o = {
        sdp: i == null ? void 0 : i.sdp,
        type: i.type
      };
      return {
        transportId: r,
        answer: o,
        producerIds: a
      };
    });
  }
  produce(t) {
    return u(this, null, function* () {
      var a, o;
      const e = (yield n(this, Je).sendMessagePromise(
        this.events.produce,
        vR.toBinary(t)
      )).payload, r = eb.fromBinary(e);
      return {
        answer: {
          sdp: (a = r == null ? void 0 : r.description) == null ? void 0 : a.sdp,
          type: (o = r == null ? void 0 : r.description) == null ? void 0 : o.type
        },
        producerId: r.producerId
      };
    });
  }
  consume(t) {
    return u(this, null, function* () {
      const e = (yield n(this, Je).sendMessagePromise(
        this.events.consume,
        hR.toBinary(t)
      )).payload, {
        consumerIdsMap: { map: r },
        description: i
      } = XR.fromBinary(e);
      return { consumerStateMap: r, sessionDescription: i };
    });
  }
  closeProducer(t) {
    return u(this, null, function* () {
      const e = (yield n(this, Je).sendMessagePromise(
        this.events.closeProducer,
        wR.toBinary(t)
      )).payload, { description: r } = ob.fromBinary(e);
      return r;
    });
  }
  closeConsumer(t) {
    return u(this, null, function* () {
      return (yield n(this, Je).sendMessagePromise(
        this.events.closeConsumer,
        bR.toBinary(t)
      )).payload;
    });
  }
  updateConsumersSimulcastConfig(t) {
    return u(this, null, function* () {
      return (yield n(this, Je).sendMessagePromise(
        this.events.updateConsumersSimulcastConfig,
        fR.toBinary(t)
      )).payload;
    });
  }
  hostControlForPeer(t, e) {
    return u(this, null, function* () {
      const r = {
        audio: e === "audio",
        screeShare: !1,
        video: e === "video",
        participantId: t
      }, i = (yield n(this, Je).sendMessagePromise(
        this.events.hostControlPeer,
        OR.toBinary(r)
      )).payload;
      if (!i)
        return !1;
      const { status: a } = gb.fromBinary(i);
      return a === "success";
    });
  }
  hostControlForAll(t) {
    return u(this, null, function* () {
      const e = {
        audio: t === "audio",
        screenShare: !1,
        video: t === "video"
      }, r = (yield n(this, Je).sendMessagePromise(
        this.events.hostControlAllPeers,
        VR.toBinary(e)
      )).payload;
      if (!r)
        return !1;
      const { status: i } = fb.fromBinary(r);
      return i === "success";
    });
  }
  /**
   * Ideally should have been async with a response but
   * this is basically a fire and forget since socket does not
   * send a response at the moment
   */
  kickAll() {
    return u(this, null, function* () {
      const t = {
        propagateKickAcrossRooms: !1
      };
      n(this, Je).sendMessagePromise(
        /**
         * Does not use mediaEventSlugs is the same irrespective of the SFU
         */
        U.kickAll,
        Tf.toBinary(t)
      );
    });
  }
  /**
   * Ideally should have been async with a response but
   * this is basically a fire and forget since socket does not
   * send a response at the moment
   */
  kickPeer(t) {
    return u(this, null, function* () {
      n(this, Je).sendMessagePromise(
        /**
         * Does not use mediaEventSlugs is the same irrespective of the SFU
         */
        U.kick,
        Cf.toBinary(t)
      );
    });
  }
  changeDisplayName(t) {
    return u(this, null, function* () {
      const e = (yield n(this, Je).sendMessagePromise(
        this.events.changeDisplayName,
        MR.toBinary(t)
      )).payload;
      if (!e)
        return !1;
      const { status: r } = vb.fromBinary(e);
      return r === "success";
    });
  }
  notifySelfJoinComplete() {
    return u(this, null, function* () {
      const t = {}, e = (yield n(this, Je).sendMessagePromise(
        this.events.selfJoinComplete,
        nR.toBinary(t)
      )).payload;
      return Ru.fromBinary(e);
    });
  }
  audioActivity(t) {
    return u(this, null, function* () {
      n(this, Je).sendMessage(this.events.audioActivity, Ow.toBinary(t));
    });
  }
}
Je = new WeakMap();
var An = /* @__PURE__ */ ((s) => (s.NEW = "new", s.CONNECTING = "connecting", s.RECONNECTING = "reconnecting", s.DISCONNECTED = "disconnected", s.CONNECTED = "connected", s.FAILED = "failed", s.CLOSED = "closed", s))(An || {}), sc;
class Gl extends lt.EventEmitter {
  constructor(e) {
    super();
    m(this, sc, void 0);
    f(this, sc, e), this.setMaxListeners(1 / 0);
  }
  get logger() {
    return n(this, sc).getValue("logger");
  }
  safeEmit(e, ...r) {
    const i = this.listenerCount(e);
    try {
      return this.emit(e, ...r);
    } catch (a) {
      return this.logger.error(
        `EnhancedEventEmitter:: safeEmit() | event listener ${e} threw an error`,
        {
          error: a
        }
      ), Boolean(i);
    }
  }
  safeEmitAsPromise(e, ...r) {
    return u(this, null, function* () {
      const i = {}.EVENT_PROMISE_TIMEOUT ? parseInt({}.EVENT_PROMISE_TIMEOUT, 10) : 1e4;
      return this.safeEmitAsPromiseWithTimeout(e, i, ...r);
    });
  }
  safeEmitAsPromiseWithTimeout(e, r, ...i) {
    return u(this, null, function* () {
      return new Promise((a, o) => {
        setTimeout(o, r, "event request timeout");
        try {
          this.emit(e.toString(), ...i, a, o);
        } catch (c) {
          this.logger.error(
            `EnhancedEventEmitter:: safeEmitAsPromise() | event listener for event ${e.toString()} threw an error [event:%s]:%o`,
            {
              error: c
            }
          ), o(c);
        }
      });
    });
  }
}
sc = new WeakMap();
class Hh extends Gl {
  constructor() {
    super(...arguments);
    /** Local stream for sending general media tracks. */
    h(this, "_sendWebStream", new MediaStream());
    /** Local stream for sending screenshare tracks. */
    h(this, "_sendScreenShareStream", new MediaStream());
    /** Handler direction. */
    h(this, "_direction");
    /** RTCPeerConnection instance. */
    h(this, "pc");
    /** Got transport local and remote parameters. */
    h(this, "_transportReady", !1);
    // Map of RTCTransceivers indexed by MID.
    h(this, "_mapMidTransceiver", /* @__PURE__ */ new Map());
    h(this, "enableHighBitrate", !1);
    h(this, "enableStereo", !1);
    h(this, "enableDtx", !0);
  }
  get midTransceiverMap() {
    return this._mapMidTransceiver;
  }
  close() {
    if (this.logger.debug(`${this.name}::close()`), this.pc)
      try {
        this.pc.close();
      } catch (e) {
        this.logger.error(`${this.name}::pc.close()`, { error: e });
      }
  }
  restartIce() {
    return u(this, null, function* () {
      this.logger.debug(`${this.name}::restartIce()`);
      const e = yield this.pc.createOffer({
        iceRestart: !0
      });
      return this.logger.debug(`${this.name}::restartIce() | calling pc.setLocalDescription() [offer:${JSON.stringify(e)}]`), {
        offerSdp: e,
        callback: (i) => u(this, null, function* () {
          this.logger.info(`${this.name}::restartIce() | calling pc.setRemoteDescription() [answer:${JSON.stringify(i)}]`), yield this.pc.setRemoteDescription(i);
        })
      };
    });
  }
  init({
    direction: e,
    iceServers: r,
    iceTransportPolicy: i,
    additionalSettings: a,
    proprietaryConstraints: o,
    onTrackHandler: c
  }) {
    this.logger.debug("HandlerInterface::init()"), this._direction = e, this.pc = new RTCPeerConnection(
      D({
        iceServers: r || [],
        iceTransportPolicy: i || "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require"
      }, a),
      o
    ), c && this.pc.addEventListener("track", (d) => {
      c(d);
    }), this._addEventListeners();
  }
  connect() {
    return u(this, null, function* () {
      this.pc.addTransceiver("video", { direction: "sendonly" });
      const e = yield this.pc.createOffer();
      return yield this.pc.setLocalDescription(e), this.logger.info(`connect offer: ${JSON.stringify(e)}`), {
        offerSdp: e,
        callback: (i) => u(this, null, function* () {
          this.logger.debug(`${this.name}::connect() | calling pc.setRemoteDescription() [answer:${JSON.stringify(i)}]`), yield this.pc.setRemoteDescription(i);
        })
      };
    });
  }
  getTransportStats() {
    return u(this, null, function* () {
      return this.pc.getStats();
    });
  }
  _assertSendDirection() {
    if (this._direction !== "send")
      throw new Error(
        'method can just be called for handlers with "send" direction'
      );
  }
  _assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error(
        'method can just be called for handlers with "recv" direction'
      );
  }
  getReceiverStats(e) {
    return u(this, null, function* () {
      this._assertRecvDirection();
      const r = this.midTransceiverMap.get(e);
      if (!r)
        throw new Error("associated RTCRtpTransceiver not found");
      return r.receiver.getStats();
    });
  }
  stopSending(e) {
    return u(this, null, function* () {
      this._assertSendDirection(), this.logger.debug(`stopSending() [localId:${e}]`);
      const r = this.midTransceiverMap.get(e);
      if (!r)
        throw new Error("associated RTCRtpTransceiver not found");
      r.sender.replaceTrack(null), this.pc.removeTrack(r.sender), r.direction = "inactive";
      const i = yield this.pc.createOffer();
      return this.logger.debug(`stopSending() | calling pc.setLocalDescription() [offer:${JSON.stringify(i)}]`), yield this.pc.setLocalDescription(i), {
        offerSdp: i,
        callback: (o) => u(this, null, function* () {
          this.logger.debug(`stopSending() | calling pc.setRemoteDescription() [answer:${JSON.stringify(o)}]`), yield this.pc.setRemoteDescription(o), this.midTransceiverMap.delete(e);
        })
      };
    });
  }
  replaceTrack(e, r) {
    return u(this, null, function* () {
      this._assertSendDirection(), r ? this.logger.debug(`replaceTrack() [localId:${e}, track.id:${r.id}]`) : this.logger.debug(`replaceTrack() [localId:${e}, no track]`);
      const i = this.midTransceiverMap.get(e);
      if (!i)
        throw new Error("associated RTCRtpTransceiver not found");
      yield i.sender.replaceTrack(r);
    });
  }
  setMaxSpatialLayer(e, r) {
    return u(this, null, function* () {
      this._assertSendDirection(), this.logger.debug(`setMaxSpatialLayer() [localId:${e}, spatialLayer:${r}]`);
      const i = this.midTransceiverMap.get(e);
      if (!i)
        throw new Error("associated RTCRtpTransceiver not found");
      const a = i.sender.getParameters();
      a.encodings.forEach(
        (o, c) => {
          c <= r ? o.active = !0 : o.active = !1;
        }
      ), yield i.sender.setParameters(a);
    });
  }
  setRtpEncodingParameters(e, r) {
    return u(this, null, function* () {
      this._assertSendDirection(), this.logger.debug(`setRtpEncodingParameters() [localId:${e}, params:${JSON.stringify(r)}]`);
      const i = this.midTransceiverMap.get(e);
      if (!i)
        throw new Error("associated RTCRtpTransceiver not found");
      const a = i.sender.getParameters();
      a.encodings.forEach(
        (o, c) => {
          a.encodings[c] = D(D({}, o), r);
        }
      ), yield i.sender.setParameters(a);
    });
  }
  getSenderStats(e) {
    this._assertSendDirection();
    const r = this.midTransceiverMap.get(e);
    if (!r)
      throw new Error("associated RTCRtpTransceiver not found");
    return r.sender.getStats();
  }
  _addEventListeners() {
    this.pc.addEventListener(
      "icecandidate",
      (e) => {
        e.candidate && this.emit("@icecandidate", {
          candidate: e.candidate
        });
      }
    ), this.pc.addEventListener("iceconnectionstatechange", () => {
      switch (this.pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected"), this._transportReady = !0;
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
        default:
          this.logger.warn("unknown state");
          break;
      }
    }), this.pc.addEventListener("negotiationneeded", () => {
      this.emit("@negotiationneeded", {}), this.logger.debug("negotiationneeded");
    }), this.pc.addEventListener("icegatheringstatechange", () => {
      switch (this.pc.iceGatheringState) {
        case "gathering":
          this.logger.debug("icegatheringstatechange | gathering"), this.emit("@icegatheringstatechange", "gathering");
          break;
        case "complete":
          this.logger.debug("icegatheringstatechange | complete"), this.emit("@icegatheringstatechange", "complete");
          break;
        default:
          this.logger.warn("unknown state");
          break;
      }
    }), this.pc.addEventListener("icecandidateerror", (e) => {
      this.logger.warn("icecandidateerror", {
        error: {
          code: e.errorCode,
          message: e.errorText
        }
      });
    }), this.pc.addEventListener("datachannel", (e) => {
      this.logger.info("data channel created: ", {
        rtcChannel: {
          label: e.channel.label
        }
      });
      const { channel: r } = e;
      r.onopen = () => {
        this.logger.info("data channel open: ", {
          rtcChannel: {
            label: e.channel.label
          }
        }), this.safeEmit("dc_open", e.channel);
      }, r.onclose = () => {
        this.logger.warn("data channel closed: ", {
          rtcChannel: {
            label: e.channel.label
          }
        });
      }, r.onerror = () => {
        this.logger.error("data channel error: ", {
          rtcChannel: {
            label: e.channel.label
          }
          // error: error as unknown as LogData, // Need to fix this, where to get message, reason
        });
      };
    }), this.addCustomEventListeners();
  }
  // eslint-disable-next-line class-methods-use-this
  addCustomEventListeners() {
  }
}
class qh extends Hh {
  /**
   * Creates a factory function.
   */
  static createFactory(t) {
    return () => new qh(t);
  }
  // eslint-disable-next-line class-methods-use-this
  get name() {
    return "Chrome74";
  }
  init({
    direction: t,
    iceServers: e,
    iceTransportPolicy: r,
    additionalSettings: i,
    proprietaryConstraints: a,
    onTrackHandler: o
  }) {
    this._direction = t, this.pc = new RTCPeerConnection(
      D({
        iceServers: e || [],
        iceTransportPolicy: r || "all",
        bundlePolicy: "max-bundle",
        rtcpMuxPolicy: "require",
        sdpSemantics: "unified-plan"
      }, i),
      a
    ), o && this.pc.addEventListener("track", (c) => {
      o(c);
    }), this._addEventListeners();
  }
  send(a) {
    return u(this, arguments, function* ({
      track: t,
      encodings: e,
      codecOptions: r,
      screenShare: i
    }) {
      this._assertSendDirection();
      const o = this.pc.addTransceiver(t, {
        direction: "sendonly",
        streams: [
          i ? this._sendScreenShareStream : this._sendWebStream
        ],
        sendEncodings: e
      });
      if (!navigator.isReactNative) {
        this.logger.debug("creating new transceiver");
        const l = RTCRtpSender.getCapabilities(typeof t == "string" ? t : t.kind);
        this.logger.info(`senders available params: ${JSON.stringify(l)}`);
        const p = [];
        r && r.length && r.forEach((g) => {
          var v;
          const S = l.codecs.find((_) => _.mimeType.includes(g.name));
          if (g.parameters) {
            this.logger.debug(`codecOption.parameters:${JSON.stringify(g.parameters)}`);
            const _ = ((v = S.sdpFmtpLine) == null ? void 0 : v.split(";")) || [];
            _.push(...g.parameters);
            const P = Array.from(new Set(_).values());
            S.sdpFmtpLine = P.join(";");
          }
          p.push(S);
        }), this.logger.info(`selected codecs: ${JSON.stringify(p)}`), o.setCodecPreferences(p);
      }
      const c = yield this.pc.createOffer();
      if (yield this.pc.setLocalDescription(c), r && r.findIndex(({ name: l }) => l === "opus") >= 0) {
        const { enableDtx: l, enableStereo: p } = this, g = this.enableHighBitrate ? p ? 128e3 : 64e3 : p ? 64e3 : 32e3;
        c.sdp = c.sdp.replace(
          "minptime=10;useinbandfec=1",
          `minptime=10;useinbandfec=1;${l ? "usedtx=1;" : ""}${p ? "stereo=1;sprop-stereo=1;" : ""}maxaveragebitrate=${g}`
        ), c.sdp += `a=rtcp-fb:111 nack\r
`;
      }
      this.midTransceiverMap.set(o.mid, o);
      const d = (l) => u(this, null, function* () {
        return this.logger.debug(`send() | calling pc.setRemoteDescription() [answer:${JSON.stringify(l)}]`), yield this.pc.setRemoteDescription(l), o.mid;
      });
      return this.logger.debug(`send() | calling pc.setLocalDescription() [offer: ${JSON.stringify(c, void 0, 2)}]`), {
        offerSdp: c,
        callback: d,
        sender: o.sender,
        mid: o.mid
      };
    });
  }
  addCustomEventListeners() {
    this.pc.addEventListener("datachannel", (t) => {
      const { channel: e } = t;
      e.onmessage = (r) => {
        this.safeEmit(
          "datachannel",
          t.channel,
          String.fromCharCode(...new Uint8Array(r.data))
        );
      };
    });
  }
}
class Id extends Hh {
  // eslint-disable-next-line no-useless-constructor
  constructor(e, r) {
    super(e);
    h(this, "supportsSendEncodings", !1);
    this.supportsSendEncodings = r.supportsSendEncodings;
  }
  /**
   * Creates a factory function.
   */
  static createFactory(e, r) {
    return () => new Id(
      e,
      r
    );
  }
  // eslint-disable-next-line class-methods-use-this
  get name() {
    return "Firefox60";
  }
  send(o) {
    return u(this, arguments, function* ({
      track: e,
      encodings: r,
      codecOptions: i,
      screenShare: a
    }) {
      this._assertSendDirection();
      const c = this.supportsSendEncodings && r !== void 0 ? { sendEncodings: r } : {}, d = this.pc.addTransceiver(e, D({
        direction: "sendonly",
        streams: [
          a ? this._sendScreenShareStream : this._sendWebStream
        ]
      }, c));
      if (!this.supportsSendEncodings && r) {
        r.reverse();
        const S = d.sender.getParameters();
        S.encodings = r, yield d.sender.setParameters(S);
      }
      const l = (S, v) => {
        var N;
        const _ = us.parse(S), P = _.media[_.media.length - 1], C = P.rtp.filter((B) => v.some((G) => G.name === B.codec)), w = P.fmtp.filter((B) => C.some((G) => G.payload === B.payload)), $ = (N = P.rtcpFb) == null ? void 0 : N.filter((B) => C.some((G) => G.payload === B.payload)), F = C.map((B) => B.payload);
        return _.media[_.media.length - 1].rtp = C, _.media[_.media.length - 1].fmtp = w, _.media[_.media.length - 1].rtcpFb = $, _.media[_.media.length - 1].payloads = F.join(" "), us.write(_);
      }, p = yield this.pc.createOffer();
      if (p.sdp = l(p.sdp, i), this.logger.debug(`send() | calling pc.setLocalDescription() [offer:${JSON.stringify(p)}]`), yield this.pc.setLocalDescription(p), e === "audio" || e.kind === "audio") {
        const { enableDtx: S, enableStereo: v } = this, _ = this.enableHighBitrate ? v ? 128e3 : 64e3 : v ? 64e3 : 32e3;
        p.sdp = p.sdp.replace(
          "minptime=10;useinbandfec=1",
          `minptime=10;useinbandfec=1;${S ? "usedtx=1;" : ""}${v ? "stereo=1;sprop-stereo=1;" : ""}maxaveragebitrate=${_}`
        );
      }
      return this.midTransceiverMap.set(d.mid, d), {
        offerSdp: p,
        callback: (S) => u(this, null, function* () {
          return this.logger.debug(`send() | calling pc.setRemoteDescription() [answer:${JSON.stringify(S)}]`), yield this.pc.setRemoteDescription(S), d.mid;
        }),
        sender: d.sender,
        mid: d.mid
      };
    });
  }
  setMaxSpatialLayer(e, r) {
    return u(this, null, function* () {
      this._assertSendDirection(), this.logger.debug(`setMaxSpatialLayer() [localId:${e}, spatialLayer:${r}]`);
      const i = this.midTransceiverMap.get(e);
      if (!i)
        throw new Error("associated RTCRtpTransceiver not found");
      const a = i.sender.getParameters(), o = a.encodings.length - 1 - r;
      a.encodings.forEach(
        (c, d) => {
          d >= o ? c.active = !0 : c.active = !1;
        }
      ), yield i.sender.setParameters(a);
    });
  }
  addCustomEventListeners() {
    this.pc.addEventListener("datachannel", (e) => {
      const { channel: r } = e;
      r.onmessage = (i) => u(this, null, function* () {
        const a = yield i.data.arrayBuffer();
        this.safeEmit(
          "datachannel",
          e.channel,
          String.fromCharCode(...new Uint8Array(a))
        );
      });
    });
  }
}
class jh extends Hh {
  /**
   * Creates a factory function.
   */
  static createFactory(t) {
    return () => new jh(t);
  }
  // eslint-disable-next-line class-methods-use-this
  get name() {
    return "Safari12";
  }
  send(a) {
    return u(this, arguments, function* ({
      track: t,
      encodings: e,
      codecOptions: r,
      screenShare: i
    }) {
      this._assertSendDirection(), this.logger.debug("Safari12::creating new transceiver");
      const o = this.pc.addTransceiver(t, {
        direction: "sendonly",
        streams: [
          i ? this._sendScreenShareStream : this._sendWebStream
        ],
        sendEncodings: e
      }), c = RTCRtpSender.getCapabilities(typeof t == "string" ? t : t.kind);
      this.logger.info(`Safari12::senders available params: ${JSON.stringify(c)}`);
      const d = [];
      r && r.length > 0 && r.forEach((g) => {
        var v;
        const S = c.codecs.find(
          (_) => _.mimeType.includes(g.name)
        );
        if (g.parameters) {
          this.logger.info(`Safari12::codecOption.parameters:, ${JSON.stringify(g.parameters)}`);
          const _ = ((v = S.sdpFmtpLine) == null ? void 0 : v.split(";")) || [];
          _.push(...g.parameters);
          const P = [...new Set(_).values()];
          S.sdpFmtpLine = P.join(";");
        }
        d.push(S);
      }), this.logger.info(`Safari12::selected codecs: ${JSON.stringify(d)}`), o.setCodecPreferences(d);
      const l = yield this.pc.createOffer();
      if (yield this.pc.setLocalDescription(l), t === "audio" || t.kind === "audio") {
        const { enableStereo: g, enableDtx: S } = this, v = this.enableHighBitrate ? g ? 128e3 : 64e3 : g ? 64e3 : 32e3;
        l.sdp = l.sdp.replace(
          "minptime=10;useinbandfec=1",
          `minptime=10;useinbandfec=1;${S ? "usedtx=1;" : ""}${g ? "stereo=1;sprop-stereo=1;" : ""}maxaveragebitrate=${v}`
        );
      }
      return this.midTransceiverMap.set(o.mid, o), {
        offerSdp: l,
        callback: (g) => u(this, null, function* () {
          return this.logger.debug(
            `Safari12::send() | calling pc.setRemoteDescription() [answer:${JSON.stringify(g)}]`
          ), yield this.pc.setRemoteDescription(g), o.mid;
        }),
        sender: o.sender,
        mid: o.mid
      };
    });
  }
  addCustomEventListeners() {
    this.pc.ondatachannel = (t) => {
      const { channel: e } = t;
      e.onmessage = (r) => u(this, null, function* () {
        const i = String.fromCharCode(
          ...new Uint8Array(r.data)
        );
        this.safeEmit("datachannel", t.channel, i);
      });
    };
  }
}
function jD(s, t) {
  return typeof s == "undefined" ? t : typeof window != "undefined" && Object.getOwnPropertyDescriptor(window, "structuredClone") ? structuredClone(s) : JSON.parse(JSON.stringify(s));
}
var rc, Ni, Vs, Jd, Ls, br, ic, zu, Kd, rS, zd, iS;
class GD extends Gl {
  constructor(e, r) {
    var i;
    super(e);
    m(this, Ls);
    m(this, ic);
    m(this, Kd);
    m(this, zd);
    /**
     * Associated transciever RTCRtpSender object
     */
    h(this, "rtpReceiver");
    /**
     * Consumer ID
     */
    h(this, "id");
    /**
     * Consumer's local ID
     */
    h(this, "localId");
    /**
     * Producer ID associated with this consumer
     */
    h(this, "producerId");
    /**
     * Transport ID of the producing transport on the producing peer
     */
    h(this, "producingTransportId");
    /**
     * Mime type of the consumer stream
     */
    h(this, "mimeType");
    /**
     * The track associated with this consumer
     */
    h(this, "track");
    /**
     * Producing peer id corresponding to this consumer
     */
    h(this, "peerId");
    /**
     *	Custom data attached to this consumer
     */
    h(this, "appData");
    h(this, "transceiver");
    /**
     *  RTCRtpReceiver associated with the consumer
     */
    m(this, rc, void 0);
    m(this, Ni, void 0);
    m(this, Vs, void 0);
    m(this, Jd, void 0);
    this.id = r.id, this.localId = r.localId, f(this, rc, r.handler), this.appData = r.appData, this.peerId = r.producingPeerId, this.producingTransportId = r.producingTransportId, f(this, Vs, !1), this.producerId = r.producerId, this.track = r.track, f(this, Ni, (i = r.paused) != null ? i : !1), this.mimeType = r.mimeType, this.transceiver = r.transceiver, this.rtpReceiver = r.rtpReceiver, x(this, Kd, rS).call(this), f(this, Jd, e);
  }
  /**
   * Indicates whether this consumer is closed
   */
  get closed() {
    return n(this, Vs);
  }
  /**
   * Kind of media on to this consumer
   */
  get kind() {
    return this.track.kind;
  }
  /**
   * Indicates whether the consumer is paused
   */
  get paused() {
    return n(this, Ni);
  }
  /**
   * Closes the Consumer.
   */
  close(e, r) {
    n(this, Vs) || (this.logger.debug(`Consumer::close() ${e ? `with reason ${e}` : ""}`, n(this, Ls, br)), f(this, Vs, !0), r && (x(this, zd, iS).call(this), this.transceiver.stop()), this.safeEmit("close", e));
  }
  /**
   * Get associated RTCRtpReceiver stats.
   */
  getStats() {
    return u(this, null, function* () {
      if (n(this, Vs))
        throw new It("closed");
      return n(this, rc).getReceiverStats(this.localId);
    });
  }
  /**
   * Pauses receiving media.
   */
  pause() {
    if (this.logger.debug("consumer::pause()", n(this, Ls, br)), n(this, Vs)) {
      this.logger.error("consumer::pause() | Consumer closed", n(this, Ls, br));
      return;
    }
    f(this, Ni, !0), this.track.enabled = !1, this.safeEmit("pause");
  }
  /**
   * Resumes receiving media.
   */
  resume() {
    if (this.logger.debug("consumer::resume()", n(this, Ls, br)), n(this, Vs)) {
      this.logger.error("Consumer::resume() | Consumer closed", n(this, Ls, br));
      return;
    }
    f(this, Ni, !1), this.track.enabled = !0, this.safeEmit("resume");
  }
}
rc = new WeakMap(), Ni = new WeakMap(), Vs = new WeakMap(), Jd = new WeakMap(), Ls = new WeakSet(), br = function() {
  return {
    consumer: {
      id: this.id,
      appData: this.appData,
      peerId: this.peerId,
      kind: this.kind
    }
  };
}, ic = new WeakSet(), zu = function() {
  this.logger.debug('Consumer::track "ended" event', n(this, Ls, br)), this.safeEmit("trackended");
}, Kd = new WeakSet(), rS = function() {
  this.track.addEventListener("ended", x(this, ic, zu).bind(this));
}, zd = new WeakSet(), iS = function() {
  try {
    this.track.removeEventListener("ended", x(this, ic, zu)), this.track.stop();
  } catch (e) {
    this.logger.error("Consumer::destroyTrack()", H(D({}, n(this, Ls, br)), {
      error: e
    }));
  }
};
var Ss, fa, Sa, Vi, ts, Xe, jr, va, Yd, $t, ls;
class WD extends Gl {
  /**
   * @emits transportclose
   * @emits trackended
   * @emits @replacetrack - (track: MediaStreamTrack | null)
   * @emits @setmaxspatiallayer - (spatialLayer: string)
   * @emits @setrtpencodingparameters - (params: any)
   * @emits @getstats
   */
  constructor(e, r) {
    var i, a;
    super(e);
    m(this, $t);
    /**
     * Producer ID.
     */
    h(this, "id");
    /**
     * Local ID.
     */
    h(this, "localId");
    /**
     * Associated RTCRtpSender.
     */
    m(this, Ss, void 0);
    /**
     * Kind of media on to this producer
     */
    h(this, "kind");
    /**
     * App custom data.
     */
    h(this, "appData");
    /**
     * Associated transciever RTCRtpSender object
     */
    h(this, "rtpSender");
    /**
     * Whether the Producer should call stop() in given tracks.
     */
    m(this, fa, void 0);
    /**
     * Specify if the Producer track should be disabled with track.enabled = false when paused.
     */
    m(this, Sa, void 0);
    /**
     * Specify if we should replace the RTCRtpSender.track with null when paused.
     */
    m(this, Vi, void 0);
    m(this, ts, !1);
    m(this, Xe, void 0);
    m(this, jr, void 0);
    m(this, va, void 0);
    m(this, Yd, void 0);
    this.id = r.id, this.localId = r.localId, f(this, Xe, r.track), this.kind = (i = r.track) == null ? void 0 : i.kind, f(this, jr, r.disableTrackOnPause ? !((a = r.track) != null && a.enabled) : !1), f(this, va, void 0), f(this, fa, r.stopTracks), f(this, Sa, r.disableTrackOnPause), f(this, Vi, r.zeroRtpOnPause), this.appData = r.appData || {}, this._onTrackEnded = this._onTrackEnded.bind(this), f(this, Ss, r.handler), this.rtpSender = r.rtpSender, this._handleTrack(), f(this, Yd, e);
  }
  /**
   * Whether the Producer is closed.
   */
  get closed() {
    return n(this, ts);
  }
  /**
   * The associated track.
   */
  get track() {
    return n(this, Xe);
  }
  /**
   * Whether the Producer is paused.
   */
  get paused() {
    return n(this, jr);
  }
  /**
   * Max spatial layer.
   *
   * @type {Number | undefined}
   */
  get maxSpatialLayer() {
    return n(this, va);
  }
  /**
   * Closes the Producer.
   */
  close(e) {
    return u(this, null, function* () {
      if (n(this, ts))
        return;
      if (this.logger.debug(`Producer::close() ${e ? `with reason ${e}` : ""}`, n(this, $t, ls)), f(this, ts, !0), this._destroyTrack(), e === Ad) {
        this.safeEmit("close", { reason: e });
        return;
      }
      const { offerSdp: r, callback: i } = yield n(this, Ss).stopSending(this.localId), { answer: a } = yield this.safeEmitAsPromise("close", { offer: r, reason: e });
      i(a);
    });
  }
  /**
   * Get associated RTCRtpSender stats.
   */
  getStats() {
    return u(this, null, function* () {
      if (n(this, ts))
        throw new It("closed");
      return n(this, Ss).getSenderStats(this.localId);
    });
  }
  /**
   * Pauses sending media.
   */
  pause() {
    this.logger.debug("Producer::pause()", n(this, $t, ls)), n(this, ts) && this.logger.error("Producer::pause() | Producer closed", n(this, $t, ls)), f(this, jr, !0), n(this, Xe) && n(this, Sa) && (n(this, Xe).enabled = !1), n(this, Vi) && n(this, Ss).replaceTrack(this.localId, null), this.emit("pause");
  }
  /**
   * Resumes sending media.
   */
  resume() {
    if (this.logger.debug("Producer::resume()", n(this, $t, ls)), n(this, ts)) {
      this.logger.error("Producer::resume() | Producer closed", n(this, $t, ls));
      return;
    }
    f(this, jr, !1), n(this, Xe) && n(this, Sa) && (n(this, Xe).enabled = !0), n(this, Vi) && n(this, Ss).replaceTrack(this.localId, n(this, Xe)), this.emit("resume");
  }
  /**
   * Replaces the current track with a new one or null.
   */
  replaceTrack(r) {
    return u(this, arguments, function* ({
      track: e
    }) {
      if (this.logger.debug(`Producer::replaceTrack() trackId: ${e == null ? void 0 : e.id}`, n(this, $t, ls)), n(this, ts)) {
        if (e && n(this, fa))
          try {
            e.stop();
          } catch (i) {
            this.logger.error("Producer::replaceTrack", H(D({}, n(this, $t, ls)), {
              error: i
            }));
          }
        throw new It("closed");
      } else if (e && e.readyState === "ended")
        throw new It("track ended");
      if (e === n(this, Xe)) {
        this.logger.debug(`replaceTrack() | same track, ignored trackId: ${e.id}`, n(this, $t, ls));
        return;
      }
      (!n(this, Vi) || !n(this, jr)) && (yield n(this, Ss).replaceTrack(this.localId, e)), this._destroyTrack(), f(this, Xe, e), this._handleTrack();
    });
  }
  /**
   * Sets the video max spatial layer to be sent.
   */
  setMaxSpatialLayer(e) {
    return u(this, null, function* () {
      if (n(this, ts))
        throw new It("closed");
      if (this.kind !== "video")
        throw new Do("not a video Producer");
      if (typeof e != "number")
        throw new TypeError("invalid spatialLayer");
      yield n(this, Ss).setMaxSpatialLayer(this.localId, e), f(this, va, e);
    });
  }
  /**
   * Sets the DSCP value.
   */
  setRtpEncodingParameters(e) {
    return u(this, null, function* () {
      if (n(this, ts))
        throw new It("closed");
      if (typeof e != "object")
        throw new TypeError("invalid params");
      yield n(this, Ss).setRtpEncodingParameters(this.localId, e);
    });
  }
  _onTrackEnded() {
    this.logger.debug(`Producer::track "ended" event trackId: ${this.track.id}`, n(this, $t, ls)), this.safeEmit("trackended", this.track.id);
  }
  _handleTrack() {
    n(this, Xe) && n(this, Xe).addEventListener("ended", this._onTrackEnded);
  }
  _destroyTrack() {
    var e;
    if (n(this, Xe))
      try {
        n(this, Xe).removeEventListener("ended", this._onTrackEnded), n(this, fa) && n(this, Xe).stop();
      } catch (r) {
        this.logger.error(`Producer::_destroyTrack trackId: ${(e = this.track) == null ? void 0 : e.id}`, H(D({}, n(this, $t, ls)), {
          error: r
        }));
      }
  }
}
Ss = new WeakMap(), fa = new WeakMap(), Sa = new WeakMap(), Vi = new WeakMap(), ts = new WeakMap(), Xe = new WeakMap(), jr = new WeakMap(), va = new WeakMap(), Yd = new WeakMap(), $t = new WeakSet(), ls = function() {
  return {
    producer: {
      id: this.id,
      appData: this.appData,
      kind: this.kind
    }
  };
};
function nS(s) {
  return typeof s == "object" && !Array.isArray(s) && s !== null;
}
function gu(s) {
  return Math.random().toString(36).substring(2, 2 + s);
}
const id = 1;
function Tg(s) {
  const t = s;
  return delete t.payload._bolt, t;
}
function JD(s) {
  return s.payload && nS(s.payload);
}
function KD(s) {
  var t, e;
  return JD(s) && (e = (t = s.payload._bolt) == null ? void 0 : t.id) != null ? e : "";
}
var Gr, Qd, Li;
const Rn = class extends lt.EventEmitter {
  constructor(e, r, i, a) {
    super();
    h(this, "channel");
    h(this, "queue");
    h(this, "serverProtocolVersion");
    m(this, Gr, /* @__PURE__ */ new Map());
    m(this, Qd, void 0);
    m(this, Li, void 0);
    h(this, "respond", (e, r, i = !1) => {
      let a;
      i ? a = Rn.createErrorResponse(e, r) : a = Rn.createResponse(e, r), this.channel.send(JSON.stringify(a));
    });
    h(this, "notify", (e) => {
      const r = Rn.createNotification(e);
      this.channel.send(JSON.stringify(r));
    });
    h(this, "request", (e) => u(this, null, function* () {
      const r = Rn.createRequest(e), i = new Promise((a, o) => {
        const { id: d } = r.payload._bolt, l = {
          id: d,
          method: r.type,
          resolve: (p) => {
            this.queue.delete(d) && (clearTimeout(l.timer), a(p));
          },
          timer: setTimeout(() => {
            this.queue.delete(d) && o(new Error(`request timeout for message id: ${d}`));
          }, 2e4),
          cancel: (p) => {
            this.queue.delete(d) && (clearTimeout(l.timer), o(p));
          }
        };
        this.queue.set(d, l);
      });
      return this.channel.send(JSON.stringify(r)), i;
    }));
    h(this, "send", (e) => {
      const r = JSON.stringify(e), i = 16384;
      if (r.length > i) {
        const a = i - 200, o = Math.ceil(r.length / a), c = [];
        for (let l = 0; l < o; l += 1) {
          const p = l * a, g = (l + 1) * a;
          c.push(r.slice(p, g));
        }
        const d = nn();
        for (let l = 0; l < o; l += 1) {
          const p = c[l], S = JSON.stringify({
            id: d,
            count: o,
            chunkIndex: l,
            chunk: p
          });
          n(this, Li).debug(`Sending message chunk over dc: ${S}`), this.channel.send(S);
        }
      } else
        n(this, Li).debug(`Sending message over dc: ${r}`), this.channel.send(r);
    });
    h(this, "processMessage", (e) => {
      var i;
      n(this, Gr).has(e.id) || n(this, Gr).set(e.id, []);
      const r = n(this, Gr).get(e.id);
      if (r[e.chunkIndex] = e, (r == null ? void 0 : r.length) === e.count && !r.some((a) => a === void 0)) {
        const a = n(this, Gr).get(e.id), o = a == null ? void 0 : a.reduce((d, l) => d + l.chunk, "");
        n(this, Gr).delete(e.id);
        const c = JSON.parse(o);
        if (!c.payload || !nS(c.payload))
          throw new Error("corrupted incoming message over dc", {
            cause: { code: "CORRUPT_DC_MESSAGE", values: c }
          });
        if (this.processBoltHandshake(c))
          return;
        if (this.serverProtocolVersion = (i = c.payload._bolt) == null ? void 0 : i.version, !this.processResponseMsg(c))
          return c;
      }
    });
    h(this, "processResponseMsg", (e) => {
      const { id: r } = e.payload._bolt, i = this.queue.get(r);
      return i ? (n(this, Li).debug(`resolving pending request with id: ${r}, complete response: ${JSON.stringify(e)}`), e.type === "error" ? i.cancel(Tg(e)) : i.resolve(Tg(e)), !0) : !1;
    });
    h(this, "processBoltHandshake", (e) => {
      var r, i;
      return e.type === "_bolt" || e.type === "handshake" ? (this.respond((i = (r = e.payload._bolt) == null ? void 0 : r.id) != null ? i : gu(8), { type: "_bolt", payload: { message: "pong" } }), !0) : !1;
    });
    this.label = i, this.transportId = a, f(this, Qd, e), f(this, Li, e.getValue("logger")), this.channel = r, this.queue = /* @__PURE__ */ new Map();
  }
};
let ci = Rn;
Gr = new WeakMap(), Qd = new WeakMap(), Li = new WeakMap(), h(ci, "createRequest", (e) => {
  var r;
  if ((r = e.payload) != null && r._bolt)
    throw new Error("rpc fields are internal values");
  return {
    type: e.type,
    payload: H(D({}, e.payload), {
      _bolt: {
        id: gu(8),
        type: "REQUEST",
        version: id
      }
    })
  };
}), h(ci, "createResponse", (e, r) => {
  var i;
  if ((i = r.payload) != null && i._bolt)
    throw new Error("rpc fields are internal values");
  return {
    type: r.type,
    payload: H(D({}, r.payload), {
      _bolt: {
        id: e,
        type: "RESPONSE",
        version: id
      }
    })
  };
}), h(ci, "createNotification", (e) => {
  var r;
  if ((r = e.payload) != null && r._bolt)
    throw new Error("rpc fields are internal values");
  return {
    type: e.type,
    payload: H(D({}, e.payload), {
      bolt: {
        id: gu(8),
        type: "NOTIFY",
        version: id
      }
    })
  };
}), h(ci, "createErrorResponse", (e, r) => ({
  type: "error",
  payload: {
    error: r.message,
    _bolt: {
      id: e,
      type: "RESPONSE",
      version: id
    }
  }
}));
const Ad = "transport closed";
var xi;
const bn = class extends Gl {
  constructor(e, {
    id: r,
    direction: i,
    handlerFactory: a,
    iceServers: o,
    iceTransportPolicy: c,
    proprietaryConstraints: d,
    additionalSettings: l,
    appData: p,
    config: g
  }) {
    var _, P, C;
    super(e);
    h(this, "awaitQueue");
    h(this, "observer");
    // Id.
    h(this, "id");
    h(this, "serverId");
    // Direction.
    h(this, "direction");
    // SCTP max message size if enabled, null otherwise.
    h(this, "maxSctpMessageSize");
    // RTC handler isntance.
    h(this, "handler");
    // Transport connection state.
    h(this, "connectionState", "new");
    // Producers map
    h(this, "producers");
    // Consumers map
    h(this, "consumers");
    // Datachannels map
    h(this, "datachannels");
    h(this, "connected", !1);
    h(this, "eventsDCReadyPromise");
    h(this, "eventsDCReadyPromiseResolver");
    h(this, "eventsDCFailureTimer");
    h(this, "transportConnectionPromise");
    h(this, "consumerTrackEvents");
    h(this, "unknownTracksMap");
    // App custom data.
    h(this, "appData");
    m(this, xi, void 0);
    f(this, xi, e);
    const S = e.getValue("logger");
    S.debug(`constructor() [id: ${r}, direction: ${i}]`), this.id = r, this.direction = i;
    const v = jD(l, {});
    delete v.iceServers, delete v.iceTransportPolicy, delete v.bundlePolicy, delete v.rtcpMuxPolicy, delete v.sdpSemantics, this.producers = /* @__PURE__ */ new Map(), this.consumers = /* @__PURE__ */ new Map(), this.datachannels = /* @__PURE__ */ new Map(), this.consumerTrackEvents = /* @__PURE__ */ new Map(), this.unknownTracksMap = /* @__PURE__ */ new Map(), this.awaitQueue = new Ku(S, !0), this.handler = a(), this.handler.enableHighBitrate = (_ = g == null ? void 0 : g.enableHighBitrate) != null ? _ : !1, this.handler.enableStereo = (P = g == null ? void 0 : g.enableStereo) != null ? P : !1, this.handler.enableDtx = (C = g == null ? void 0 : g.enableDtx) != null ? C : !0, this.handler.init({
      onTrackHandler: this._ontrack.bind(this),
      direction: i,
      iceServers: o,
      iceTransportPolicy: c,
      additionalSettings: l,
      proprietaryConstraints: d
    }), this.appData = p || {}, this.transportConnectionPromise = new Promise((w) => {
      this.once("connected", () => {
        w(!0);
      }), this.once("disconnect", () => {
        w(!1);
      }), this.once("close", () => {
        w(!1);
      });
    }), this.eventsDCReadyPromise = new Promise((w) => {
      this.eventsDCReadyPromiseResolver = w;
    }), this.handler.on(
      "@connectionstatechange",
      (w) => {
        w !== this.connectionState && (this.logger.debug(`connection state changed to ${w}`), this.connectionState = w, w === "connected" && (this.connected = !0, this.emit("connected")), w === "disconnected" && (this.connected = !1, this.emit("disconnect")), (w === "failed" || w === "closed") && (this.connected = !1, this.emit("close")), this.closed || this.safeEmit("connectionstatechange", w));
      }
    ), this.handler.on(
      "@icecandidate",
      ({ candidate: w }) => {
        this.closed || this.safeEmit("icecandidate", w);
      }
    ), this.handler.on("dc_open", (w) => {
      let $ = this.datachannels.get(w.label);
      $ || ($ || ($ = new ci(n(this, xi), w, w.label, this.serverId), this.datachannels.set(w.label, $)), this.eventsDCFailureTimer = setTimeout(() => {
        w.label === "events" && (this.eventsDCReadyPromiseResolver(!1), this.safeEmit("dc_error", w.label));
      }, 5e3));
    }), this.handler.on("datachannel", (w, $) => {
      w.label === "events" && (this.eventsDCReadyPromiseResolver(!0), this.eventsDCFailureTimer && clearTimeout(this.eventsDCFailureTimer));
      const F = this.datachannels.get(w.label);
      if (!F) {
        this.logger.error("unregistered datachannel for message", {
          rtcChannel: {
            label: w.label,
            message: $
          }
        });
        return;
      }
      try {
        const N = JSON.parse($);
        this.logger.debug("datachannel message chunk recieved", {
          dataChannelMessageChunk: {
            id: N.id,
            count: N.count,
            chunkIndex: N.chunkIndex,
            chunk: N.chunk,
            transprtId: this.serverId
          }
        });
        const B = F.processMessage(N);
        if (!B)
          return;
        this.logger.debug(
          `datachannel message with id:${N.id} on transport:${this.serverId}complete - ${JSON.stringify(B)}`
        ), this.emit(`datachannel:${w.label}`, F.label, B);
      } catch (N) {
        this.logger.error("error parsing message", {
          error: N
        });
      }
    });
  }
  get closed() {
    return this.connectionState === "closed";
  }
  setServerId(e) {
    this.serverId = e;
  }
  getDatachannel(e) {
    return this.datachannels.get(e);
  }
  get isEventsDCReady() {
    return this.eventsDCReadyPromise;
  }
  /**
  	* Close the Transport.
  	*/
  close() {
    this.closed || (this.logger.debug("Transport close called"), this.connectionState = "closed", this.awaitQueue.stop(), this.awaitQueue = void 0, this.connected = !1, this.handler.close(), Array.from(this.producers.values()).forEach(
      (e) => {
        e.close(Ad).catch(() => {
        });
      }
    ), this.producers.clear(), Array.from(this.consumers.values()).forEach((e) => {
      e.close(Ad);
    }), this.consumers.clear(), this.consumerTrackEvents.clear(), this.emit("close"));
  }
  /**
  	 * Get associated Transport (RTCPeerConnection) stats.
  	 *
  	 * @returns {RTCStatsReport}
  	 */
  getStats() {
    return u(this, null, function* () {
      if (this.closed)
        throw new It("closed");
      return this.handler.getTransportStats();
    });
  }
  connect(e) {
    return u(this, null, function* () {
      try {
        if (yield this.awaitQueue.push(() => u(this, null, function* () {
          const { offerSdp: r, callback: i } = yield this.handler.connect(), {
            transportId: a,
            answer: o
          } = yield e(r);
          this.setServerId(a), yield i(o);
        })), !(yield this.transportConnectionPromise))
          throw new Error("ice connection failed");
      } catch (r) {
        throw this.logger.error("transport failed to connect:", { error: r }), r;
      }
    });
  }
  /**
  * Restart ICE connection.
  */
  restartIce() {
    return u(this, null, function* () {
      if (this.logger.debug("restartIce()"), this.closed)
        throw new It("closed");
      return this.handler.restartIce();
    });
  }
  canProduce(e) {
    return u(this, null, function* () {
      const { track: r, appData: i } = e;
      if (r) {
        if (this.direction !== "send")
          throw new Do("not a sending Transport");
        if (r.readyState === "ended")
          throw new It("track ended");
        if (i && typeof i != "object")
          throw new TypeError("if given, appData must be an object");
      } else
        throw new TypeError("missing track");
      if (!(yield this.transportConnectionPromise))
        throw new pi("transport not connected");
      return !0;
    });
  }
  produce(e, r) {
    return u(this, null, function* () {
      if (!(yield this.canProduce(e)))
        throw new Error("Cannot produce");
      const {
        track: a,
        encodings: o,
        codecOptions: c,
        stopTracks: d = !0,
        disableTrackOnPause: l = !0,
        zeroRtpOnPause: p = !1,
        appData: g = {}
      } = e;
      this.logger.debug(`produce() [track:${a.id}]`);
      const { producerId: S, localId: v, rtpSender: _ } = yield this.awaitQueue.push(() => u(this, null, function* () {
        const {
          offerSdp: P,
          callback: C,
          sender: w,
          mid: $
        } = yield this.handler.send({
          track: a,
          encodings: o,
          codecOptions: c,
          screenShare: g == null ? void 0 : g.screenShare
        }), { answer: F, producerId: N } = yield r(
          {
            offer: P,
            kind: a.kind,
            paused: l ? !a.enabled || Object.hasOwn(a, "fakeTracks") : !1,
            appData: H(D({}, g || {}), { mid: $ }),
            codecOptions: c,
            producingTransportId: this.serverId
          }
        ), B = yield C(F);
        return { producerId: N, localId: B, rtpSender: w };
      }), "Transport.produce");
      return this.createProducerObject({
        id: S,
        localId: v,
        track: a,
        stopTracks: d,
        disableTrackOnPause: l,
        zeroRtpOnPause: p,
        appData: g,
        handler: this.handler,
        rtpSender: _
      });
    });
  }
  createProducerObject(e) {
    return u(this, null, function* () {
      const r = new WD(n(this, xi), e);
      return this.producers.set(r.id, r), r.once("close", () => {
        this.producers.delete(r.id);
      }), this.emit("newproducer", r), r;
    });
  }
  closeProducer(e) {
    return u(this, null, function* () {
      yield this.awaitQueue.push(e.close.bind(e), "Transport.closeProducer");
    });
  }
  canConsume() {
    return u(this, null, function* () {
      if (this.closed)
        throw new It("closed");
      if (this.direction !== "recv")
        throw new Do("not a receiving transport");
      if (!(yield this.transportConnectionPromise))
        throw new pi("transport not connected");
      return !0;
    });
  }
  consume(e, r, i) {
    return u(this, null, function* () {
      return this.awaitQueue.push(() => u(this, null, function* () {
        const a = {}, {
          consumerStates: o,
          sessionDescription: c,
          failedProducers: d
        } = yield r(e);
        o.forEach((p, g) => {
          a[g] = this.createConsumerObjectAndWaitForTrack(H(D({}, p), {
            producerId: g
          }));
        }), c && (this.logger.info("Session description found, sending negotiation request"), yield i(c));
        const l = [];
        return yield Promise.all(Object.entries(a).map(
          ([p, g]) => g.then((S) => l.push(S)).catch(() => {
            this.logger.error(`Failed to create consumer object, producer: ${p}`, {
              error: { message: "This should not happen" },
              transport: { serverId: this.serverId }
            });
          })
        )), { consumers: l, failedProducers: d };
      }), "Transport.consume", { producersLength: e.length });
    });
  }
  static parseCodecAndFmtpMappings(e, r) {
    const i = us.parse(e.sdp), a = {};
    return i.media.forEach((o) => {
      r.includes(o.mid.toString()) && (a[o.mid.toString()] = {
        rtp: o.rtp,
        fmtp: o.fmtp,
        payloads: o.payloads,
        rtcpFb: o.rtcpFb
      });
    }), a;
  }
  static setCodecAndFmtpMappings(e, r, i) {
    const a = us.parse(e.sdp);
    return a.media = a.media.map((c) => {
      if (r.includes(c.mid.toString())) {
        const d = D({}, c);
        return d.rtp = i[c.mid.toString()].rtp, d.fmtp = i[c.mid.toString()].fmtp, d.payloads = i[c.mid.toString()].payloads, d.rtcpFb = i[c.mid.toString()].rtcpFb, d;
      }
      return c;
    }), H(D({}, e), {
      sdp: us.write(a)
    });
  }
  static parseHeaderExtensionMappings(e) {
    const r = us.parse(e.sdp), i = {};
    return r.media.forEach((a) => {
      i[a.mid] = a.ext;
    }), i;
  }
  static setHeaderExtensionMappings(e, r) {
    const i = us.parse(e.sdp);
    return i.media = i.media.map((o) => {
      const c = D({}, o);
      return c.ext = r[o.mid], c;
    }), H(D({}, e), {
      sdp: us.write(i)
    });
  }
  closeConsumers(e, r) {
    return u(this, null, function* () {
      try {
        const i = e.map((l) => l.transceiver.mid), a = bn.parseCodecAndFmtpMappings(
          this.handler.pc.remoteDescription,
          i
        ), o = bn.parseHeaderExtensionMappings(
          this.handler.pc.remoteDescription
        );
        this.logger.info("Stopping transceivers", { consumerIds: e.map(({ id: l }) => l) }), e.forEach((l) => l.close(void 0, !0));
        let c = yield this.handler.pc.createOffer();
        this.logger.info("Created offer for closing consumers", { sdp: c.sdp }), c = bn.setCodecAndFmtpMappings(
          c,
          i,
          a
        ), c = bn.setHeaderExtensionMappings(
          c,
          o
        ), this.logger.info("Updated codec and fmtp mappings in close consumer offer", { sdp: c.sdp }), yield this.setLocalDescription(c), this.logger.info("Successfully set local description in close consumers");
        const d = yield r(e, c);
        this.logger.info("Received answer in close consumers", { sdp: d.sdp }), yield this.setRemoteDescription(d), this.logger.info("Remote description was set successfully in close consumers", { sdp: d.sdp });
      } catch (i) {
        this.logger.error("Failed to close consumers", { error: i });
      }
    });
  }
  setRemoteOffer(e) {
    return u(this, null, function* () {
      try {
        this.logger.info("Received offer from SFU", { sdp: e.sdp }), yield this.setRemoteDescription(e);
        const r = yield this.handler.pc.createAnswer();
        this.logger.info("Created answer corresponding to received offer", { sdp: r.sdp });
        const i = us.parse(r.sdp);
        return i.media = i.media.map((a) => {
          if (a.type === "audio") {
            const o = D({}, a), c = o.fmtp.find(
              (l) => l.payload === 111
            );
            return c && (c.config += ";stereo=1;sprop-stereo=1"), o.rtcpFb || (o.rtcpFb = []), o.rtcpFb.some(
              (l) => l.type === "nack"
            ) || o.rtcpFb.push({
              payload: parseInt(o.payloads, 10),
              type: "nack"
            }), o;
          }
          return a;
        }), r.sdp = us.write(i), this.logger.info("Setting munged SDP", { sdp: r.sdp }), yield this.setLocalDescription(r), this.logger.info("Successfully set local description", { sdp: r.sdp }), r;
      } catch (r) {
        throw this.logger.error("Set remote offer failed", { error: r }), r;
      }
    });
  }
  _ontrack(e) {
    const { track: r, transceiver: i } = e;
    this.logger.info(`track event received [trackId: ${r.id}] [mid: ${i.mid}]`);
    const a = `${i.mid}:${r.kind}`;
    r.addEventListener("ended", () => {
      this.logger.info(`rtc consumer track ended [trackId: ${r.id}]`), this.unknownTracksMap.delete(a);
    });
    const o = this.consumerTrackEvents.get(a);
    o ? (o(r, i), this.consumerTrackEvents.delete(a)) : (this.logger.warn(`track event handler not found ${a}`), this.unknownTracksMap.set(a, e));
  }
  sendErrorOverDC(e, r, i) {
    const a = this.getDatachannel(e);
    if (!a)
      throw new Error("datachannel not found", {
        cause: { code: "DC_NOT_FOUND", values: { label: e } }
      });
    a.respond(r, i, !0);
  }
  sendResponseOverDC(e, r, i) {
    const a = this.getDatachannel(e);
    if (!a)
      throw new Error("datachannel not found", {
        cause: { code: "DC_NOT_FOUND", values: { label: e } }
      });
    a.respond(r, i);
  }
  createConsumerObjectAndWaitForTrack(e) {
    return u(this, null, function* () {
      const {
        consumerId: r,
        producerId: i,
        producingPeerId: a,
        producingTransportId: o,
        streamId: c,
        paused: d,
        screenShare: l,
        appData: p,
        kind: g,
        mimeType: S
      } = e, v = `${c}:${g}`, _ = H(D({}, e), {
        name: "consumer creation task error",
        message: "consumer creation failed"
      });
      return new Promise((P, C) => u(this, null, function* () {
        const w = setTimeout(() => {
          this.logger.warn(`Timed out waiting for track event ${v} producingPeerId: ${a}`), this.consumerTrackEvents.delete(v), _.isTimedout = !0, C(_);
        }, 5e3), $ = (N, B) => {
          try {
            if (N.readyState === "ended")
              clearTimeout(w), C(_);
            else {
              const G = N;
              G.enabled = !0, this.handler.midTransceiverMap.set(B.mid, B);
              const re = new GD(n(this, xi), {
                id: r,
                localId: B.mid,
                transceiver: B,
                track: G,
                paused: d,
                producerId: i,
                producingPeerId: a,
                producingTransportId: o,
                handler: this.handler,
                appData: H(D({}, p), { screenShare: l, peerId: a }),
                rtpReceiver: B.receiver,
                mimeType: S
              });
              this.consumers.set(r, re), re.once("close", () => {
                this.consumers.delete(re.id), this.handler.midTransceiverMap.delete(B.mid);
              }), this.logger.info("consumer created for ", {
                consumer: {
                  id: r,
                  kind: g,
                  appData: {
                    screenShare: l
                  },
                  peerId: a,
                  producerId: i
                }
              }), this.emit("newconsumer", re), clearTimeout(w), P(re);
            }
          } catch (G) {
            this.logger.warn("error while creating consumer:", G), clearTimeout(w), C(_);
          }
        }, F = this.unknownTracksMap.get(v);
        F ? (this.logger.info(`track event already received [trackId: ${F.track.id}] [mid: ${F.transceiver.mid}]`), this.unknownTracksMap.delete(v), $(F.track, F.transceiver)) : (this.logger.info(`Registering onTrack handler for key ${v} [producingPeerId: ${a}]`), this.consumerTrackEvents.set(v, $));
      }));
    });
  }
  setRemoteDescription(e) {
    return u(this, null, function* () {
      yield this.handler.pc.setRemoteDescription(e);
    });
  }
  setLocalDescription(e) {
    return u(this, null, function* () {
      this.logger.debug(`${this.direction}() {transportId: ${this.serverId}} | calling pc.setLocalDescription() [offer:${JSON.stringify(e)}]`), yield this.handler.pc.setLocalDescription(e);
    });
  }
  sendDataChannelMessage(e, r) {
    return u(this, null, function* () {
      const i = this.getDatachannel(e);
      if (!i)
        throw $D("DC_NOT_READY", `${e} datachannel not ready`);
      const a = (yield i.request(r)).payload;
      return this.logger.info(`sendDataChannelMessage::response ${JSON.stringify(a)}`), a;
    });
  }
};
let Yu = bn;
xi = new WeakMap();
function zD(s) {
  if (typeof navigator == "object" && navigator.product === "ReactNative") {
    if (typeof RTCPeerConnection == "undefined") {
      s.warn(
        "Device::this._detectDevice() | unsupported ReactNative without RTCPeerConnection"
      );
      return;
    }
    return s.debug("Device::this._detectDevice() | ReactNative handler chosen"), "Chrome74";
  }
  if (typeof navigator == "object" && typeof navigator.userAgent == "string") {
    const t = navigator.userAgent, e = Yg.getParser(t), r = e.getEngine();
    if (e.satisfies({
      chrome: ">=74",
      chromium: ">=74",
      "microsoft edge": ">=88"
    }))
      return "Chrome74";
    if (e.satisfies({ chrome: ">=55", chromium: ">=55" }))
      return;
    if (e.satisfies({ firefox: ">=110" }))
      return "Firefox110";
    if (e.satisfies({ firefox: ">=60" }))
      return "Firefox60";
    if (e.satisfies({ ios: { OS: ">=14.3", firefox: ">=30.0" } }) || e.satisfies({ safari: ">=12.0" }) && typeof RTCRtpTransceiver != "undefined" && RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection"))
      return "Safari12";
    if (e.satisfies({ safari: ">=11" }) || e.satisfies({ "microsoft edge": ">=11" }) && e.satisfies({ "microsoft edge": "<=18" }))
      return;
    if (r.name && r.name.toLowerCase() === "blink") {
      const i = t.match(/(?:(?:Chrome|Chromium))[ /](\w+)/i);
      return i ? Number(i[1]) >= 74 ? "Chrome74" : void 0 : "Chrome74";
    }
    if (r.name.toLowerCase() === "webkit" && e.getOS().name.toLowerCase() === "ios")
      return typeof RTCRtpTransceiver != "undefined" && RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection") ? "Safari12" : void 0;
    s.warn("Device::this._detectDevice() | browser not supported");
    return;
  }
  s.warn("Device::this._detectDevice() | unknown device");
}
var rr, Ui;
class YD {
  constructor(t, { handlerName: e, handlerFactory: r } = {}) {
    // RTC handler factory.
    h(this, "handlerFactory");
    m(this, rr, void 0);
    m(this, Ui, void 0);
    const i = t.getValue("logger");
    if (i.debug("constructor()"), f(this, rr, t), f(this, Ui, i), e && r)
      throw new TypeError(
        "just one of handlerName or handlerInterface can be given"
      );
    if (r)
      this.handlerFactory = r;
    else {
      if (e)
        n(this, Ui).debug(`Device::constructor() | handler given: ${e}`);
      else if (e = zD(n(this, Ui)), e)
        n(this, Ui).debug(`Device::constructor() | detected handler: ${e}`);
      else
        throw new Error("device not supported");
      switch (e) {
        case "Chrome74":
          this.handlerFactory = qh.createFactory(n(this, rr));
          break;
        case "Safari12":
          this.handlerFactory = jh.createFactory(n(this, rr));
          break;
        case "Firefox60":
          this.handlerFactory = Id.createFactory(
            n(this, rr),
            { supportsSendEncodings: !1 }
          );
          break;
        case "Firefox110":
          this.handlerFactory = Id.createFactory(
            n(this, rr),
            { supportsSendEncodings: !0 }
          );
          break;
        default:
          throw new TypeError(`unknown handlerName "${e}"`);
      }
    }
  }
  /**
   * Creates a Transport for receiving media.
   *
   * @throws {InvalidStateError} if not loaded.
   * @throws {TypeError} if wrong arguments.
   */
  createTransport(t) {
    const e = nn();
    return new Yu(n(this, rr), H(D({
      id: e
    }, t), {
      handlerFactory: this.handlerFactory
    }));
  }
}
rr = new WeakMap(), Ui = new WeakMap();
const QD = 2e3;
var Ta, at, ot, nc, ac, $i, ya, oc, Ea, Fi, xs, _a, fd, cc, Qu, Xd, aS, dc, Xu, Zd, oS, el, cS, tl, dS, sl, lS, rl, uS, lc, Zu, uc, eh;
class XD extends lt.EventEmitter {
  constructor(e, r) {
    super();
    m(this, _a);
    m(this, cc);
    m(this, Xd);
    m(this, dc);
    m(this, Zd);
    m(this, el);
    m(this, tl);
    m(this, sl);
    m(this, rl);
    m(this, lc);
    m(this, uc);
    h(this, "context");
    m(this, Ta, void 0);
    m(this, at, void 0);
    m(this, ot, void 0);
    m(this, nc, void 0);
    m(this, ac, void 0);
    m(this, $i, void 0);
    m(this, ya, void 0);
    m(this, oc, void 0);
    m(this, Ea, {
      transportFailureCount: {
        send: 0,
        recv: 0
      },
      lastConnectionTime: 0
    });
    m(this, Fi, void 0);
    m(this, xs, "all");
    this.context = e, f(this, $i, r), f(this, Ta, new YD(e)), f(this, ya, new qD(r)), f(this, oc, Cs), n(this, _a, fd).mediaState = {
      send: { state: An.NEW },
      recv: { state: An.NEW }
    }, (La(this.context, "forceRelay") || this.context.getValue("flagsmith").hasFeature(ee.FORCE_RELAY)) && f(this, xs, "relay"), this.logger.info(`ICE Transport Policy initially set to ${n(this, xs)}`), x(this, cc, Qu).call(this);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return this.context.getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return this.context.getValue("logger");
  }
  get socket() {
    return n(this, $i);
  }
  get socketHandler() {
    return n(this, ya);
  }
  get sendTransport() {
    return n(this, at);
  }
  get recvTransport() {
    return n(this, ot);
  }
  get events() {
    return n(this, oc);
  }
  set sendTransportConnectedCallback(e) {
    f(this, nc, e);
  }
  set recvTransportConnectedCallback(e) {
    f(this, ac, e);
  }
  setupTransports(e) {
    return u(this, null, function* () {
      yield x(this, Xd, aS).call(this, e);
      let r, i;
      e.send && (r = x(this, dc, Xu).call(this, n(this, at)).then((a) => {
        try {
          n(this, nc).call(this, a);
        } catch (o) {
          this.logger.error("Failed to run send transport callback");
        }
      })), e.recv && (i = x(this, dc, Xu).call(this, n(this, ot)).then((a) => {
        try {
          n(this, ac).call(this, a);
        } catch (o) {
          this.logger.error("Failed to run recv transport callback");
        }
      })), yield Promise.all([r, i]);
    });
  }
  stopTransports(e) {
    var r, i;
    if (e.send && this.sendTransport !== void 0) {
      const { id: a, serverId: o, direction: c } = n(this, at);
      this.logger.info("Closing send transport", { transport: { id: a, serverId: o, type: c } }), n(this, at).close(), n(this, at).removeAllListeners(), f(this, at, void 0);
    }
    if (e.recv && this.recvTransport !== void 0) {
      const { id: a, serverId: o, direction: c } = n(this, ot);
      this.logger.info("Closing recv transport", { transport: { id: a, serverId: o, type: c } }), (r = n(this, ot)) == null || r.close(), (i = n(this, ot)) == null || i.removeAllListeners(), f(this, ot, void 0);
    }
    x(this, cc, Qu).call(this);
  }
  stopAllTransports() {
    this.logger.info("Closing all transports"), this.stopTransports({ send: !0, recv: !0 });
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  handleErrors(e) {
    throw new Error("Method not implemented.");
  }
}
Ta = new WeakMap(), at = new WeakMap(), ot = new WeakMap(), nc = new WeakMap(), ac = new WeakMap(), $i = new WeakMap(), ya = new WeakMap(), oc = new WeakMap(), Ea = new WeakMap(), Fi = new WeakMap(), xs = new WeakMap(), _a = new WeakSet(), fd = function() {
  return this.context.getValue("connectionHandler");
}, cc = new WeakSet(), Qu = function() {
  f(this, Fi, {
    send: void 0,
    recv: void 0
  });
}, Xd = new WeakSet(), aS = function(e) {
  return u(this, null, function* () {
    var o, c, d, l, p, g, S, v;
    (La(this.context, "forceRelay") || this.context.getValue("flagsmith").hasFeature(ee.FORCE_RELAY)) && f(this, xs, "relay"), this.logger.info(`ICE Transport Policy set to ${n(this, xs)}`);
    const a = yield dt().getICEServers().catch((_) => (this.logger.warn(`failed to get iceservers from server: ${_.message}`), []));
    if (e.send) {
      const _ = this.context.getValue("flagsmith").hasFeature(
        ee.DISABLE_OPUS_DTX_CF
      );
      x(this, el, cS).call(this, {
        iceServers: a,
        additionalSettings: {
          encodedInsertableStreams: (o = this.context.getValue("modules").e2ee) == null ? void 0 : o.enabled
        },
        config: {
          enableHighBitrate: (l = (d = (c = this.context.getValue("defaults").mediaConfiguration) == null ? void 0 : c.audio) == null ? void 0 : d.enableHighBitrate) != null ? l : !1,
          enableStereo: (S = (g = (p = this.context.getValue("defaults").mediaConfiguration) == null ? void 0 : p.audio) == null ? void 0 : g.enableStereo) != null ? S : !1,
          enableDtx: !!_
        },
        iceTransportPolicy: n(this, xs)
      });
    }
    e.recv && x(this, tl, dS).call(this, {
      iceServers: a,
      additionalSettings: {
        encodedInsertableStreams: (v = this.context.getValue("modules").e2ee) == null ? void 0 : v.enabled
      },
      iceTransportPolicy: n(this, xs)
    });
  });
}, dc = new WeakSet(), Xu = function(e) {
  return u(this, null, function* () {
    const { id: r, serverId: i, direction: a } = e;
    x(this, sl, lS).call(this, e);
    try {
      return yield sS((c, d) => u(this, null, function* () {
        c > 0 && this.logger.debug(`Retrying transport connect, count: ${c}`, {
          transport: { id: r, serverId: i, type: a }
        });
        try {
          if (e.closed)
            throw new pi("Cannot reconnect closed transport");
          yield x(this, Zd, oS).call(this, e);
        } catch (l) {
          if (l instanceof pi) {
            d(l);
            return;
          }
          throw this.logger.error("Failed to connect transport, retrying", { transport: e, error: l }), l;
        }
      }), {
        delayTime: 100,
        strategy: "exponential",
        maxRetryCount: 1 / 0
      }), e;
    } catch (o) {
      throw this.logger.error(
        `Failed to connect send transport after retry: ${e.id}`,
        {
          error: o,
          transport: { id: r, serverId: i, type: a }
        }
      ), e.close(), e.removeAllListeners(), o;
    }
  });
}, Zd = new WeakSet(), oS = function(e) {
  return u(this, null, function* () {
    const { id: r, direction: i } = e;
    if (this.logger.info(`Connecting ${i} transport`, {
      transport: { id: r, type: i }
    }), !n(this, $i).isConnected)
      throw new pi("Socket is not connected");
    if (e.connectionState === "closed")
      throw new pi("Transport is closed");
    try {
      yield e.connect(
        (a) => x(this, rl, uS).call(this, i, a)
      ), this.logger.info(`Connected ${i} transport`, {
        transport: { id: r, serverId: e.serverId, type: i }
      });
    } catch (a) {
      throw n(this, Ea).transportFailureCount[i] += 1, a.message === "ice connection failed" ? new pi(a.message) : a;
    }
  });
}, el = new WeakSet(), cS = function(e) {
  var r, i;
  if (n(this, at) && n(this, at).connected) {
    this.logger.info("Transport send is already connected", {
      transport: {
        id: (r = n(this, at)) == null ? void 0 : r.id,
        serverId: (i = n(this, at)) == null ? void 0 : i.serverId,
        type: "send"
      }
    });
    return;
  }
  f(this, at, n(this, Ta).createTransport(H(D({}, e), {
    direction: "send"
  }))), this.context.getValue("callstats").configureSendTransport(n(this, at));
}, tl = new WeakSet(), dS = function(e) {
  var r, i;
  if (n(this, ot) && n(this, ot).connected) {
    this.logger.info("Transport recv is already connected", {
      transport: {
        id: (r = n(this, ot)) == null ? void 0 : r.id,
        serverId: (i = n(this, ot)) == null ? void 0 : i.serverId,
        type: "recv"
      }
    });
    return;
  }
  f(this, ot, n(this, Ta).createTransport(H(D({}, e), {
    direction: "recv"
  }))), this.context.getValue("callstats").configureRecvTransport(n(this, ot));
}, sl = new WeakSet(), lS = function(e) {
  const { direction: r, id: i } = e;
  e.on("connectionstatechange", (a) => u(this, null, function* () {
    x(this, uc, eh).call(this, { state: a, direction: r }), this.logger.info(
      `Transport connection state changed for ${r} transport`,
      {
        transport: {
          id: i,
          serverId: e.serverId,
          type: r,
          status: a
        }
      }
    );
    const o = () => {
      const c = n(this, Fi)[r];
      c !== void 0 && (clearTimeout(c), n(this, Fi)[r] = void 0);
    };
    switch (a) {
      case "connected":
        o(), n(this, Ea).lastConnectionTime = performance.now();
        break;
      case "disconnected":
        n(this, Fi)[r] = setTimeout(() => u(this, null, function* () {
          this.logger.warn(`${r} transport is in disconnected state, reconnecting transport`, { transport: { id: i, serverId: e.serverId, type: r } }), yield x(this, lc, Zu).call(this, e.direction);
        }), QD);
        break;
      case "failed":
        if (e.closed)
          return;
        o(), this.logger.warn(`${r} transport is in failed state, reconnecting transport`, { transport: { id: i, serverId: e.serverId, type: r } }), yield x(this, lc, Zu).call(this, e.direction);
        break;
    }
  })), e.on("icecandidate", (a) => u(this, null, function* () {
    this.logger.debug("Sending iceCandidate:", { iceCandidate: a });
  })), e.on("datachannel:events", (a, o) => u(this, null, function* () {
    var c, d;
    this.logger.debug("Got data channel message on event:", {
      rtcChannel: { label: a, message: o }
    });
    try {
      switch (o.type) {
        case "handshake": {
          const l = {
            type: "handshake",
            payload: {
              message: "pong"
            }
          };
          e.sendResponseOverDC(a, KD(o), l);
          break;
        }
        case "hub-disconnect": {
          this.logger.debug(`media hub disconnected, full_reconnect: ${(c = o.payload) == null ? void 0 : c.full_reconnect}`), ((d = o.payload) == null ? void 0 : d.full_reconnect) === !0 && this.handleErrors("rejoin");
          break;
        }
        case "error":
          break;
        default:
          break;
      }
    } catch (l) {
      this.logger.error(
        `Unable to handle the incoming datachannel message on channel ${a}`
      );
    }
  })), e.on("dc_error", () => {
    e.direction === "recv" && (this.logger.warn("Events datachannel did not open in 5s", { country: E.location.country }), this.handleErrors("reconnectRecvTransport"));
  });
}, rl = new WeakSet(), uS = function(e, r) {
  return u(this, null, function* () {
    const i = e === "recv";
    try {
      const { sdp: a, type: o } = r, c = {
        consuming: i,
        description: {
          sdp: a,
          type: o,
          target: i ? vr.SUBSCRIBER : vr.PUBLISHER
        },
        producers: []
      };
      return n(this, ya).connectTransport(c);
    } catch (a) {
      throw this.logger.error(
        `Error in ${e} transport connection:`,
        { error: a, country: E.location.country }
      ), a;
    }
  });
}, lc = new WeakSet(), Zu = function(e) {
  return u(this, null, function* () {
    switch (this.logger.info("Called reconnect transport", { transport: { type: e } }), this.stopTransports({ [e]: !0 }), this.context.getValue("flagsmith").hasFeature(
      ee.CF_TRANSPORT_FORCE_RELAY_ON_ICE_FAILED
    ) && n(this, $i).isConnected && n(this, Ea).transportFailureCount[e] > 2 && (this.logger.warn(`Multiple disconnections in ${e} transport, forcing relay`), f(this, xs, "relay")), yield this.setupTransports({ [e]: !0 }), e) {
      case "send": {
        this.logger.info("Transport reconnected", { transport: n(this, at) }), this.context.getValue("peerSessionStore").emit(k.RESET_PRODUCER_STATE);
        break;
      }
      case "recv": {
        this.logger.info("Transport reconnected", { transport: n(this, ot) }), this.context.getValue("peerSessionStore").emit(k.UPDATE_ACTIVE, { createAllConsumers: !0 });
        break;
      }
      default:
        this.logger.warn("Unknown transport direction", { transport: { type: e } });
    }
    x(this, uc, eh).call(this, {
      state: An.CONNECTED,
      direction: e
    });
  });
}, uc = new WeakSet(), eh = function(e) {
  const { state: r, direction: i } = e;
  n(this, _a, fd).mediaState[i] = {
    state: r
  }, this.context.getValue("peerSessionStore").emit(
    k.TRANSPORT_STATE_UPDATE,
    D({
      transport: i
    }, n(this, _a, fd).mediaState[i])
  );
};
var hc, ss;
class ZD {
  constructor(t, e, r, i, a) {
    /* eslint-disable-next-line no-useless-constructor */
    m(this, hc, void 0);
    m(this, ss, void 0);
    this.events = e, this.recvTransport = r, this.socket = i, this.socketHandler = a, f(this, hc, t), f(this, ss, t.getValue("logger"));
  }
  create(t) {
    return u(this, null, function* () {
      if (!t || t && t.length === 0)
        throw new Error("List of producers is required");
      const e = /* @__PURE__ */ new Map(), r = [];
      t.forEach((d) => {
        const { producingPeerId: l, producerId: p, producingTransportId: g } = d, S = n(this, hc).getValue("flagsmith").hasFeature(ee.ENABLE_CF_SIMULCAST) ? {
          simulcast: {
            preferredRid: "h",
            priorityOrdering: "asciibetical",
            ridNotAvailable: "asciibetical"
          }
        } : {};
        e.set(p, l), r.push(D({
          producingPeerId: l,
          producerId: p,
          producingTransportId: g
        }, S));
      });
      const i = yield this.socketHandler.consume({
        requests: r,
        consumingTransportId: this.recvTransport.serverId
      }), a = /* @__PURE__ */ new Map();
      t.forEach((d) => a.set(d.producerId, d));
      const o = /* @__PURE__ */ new Map(), c = [];
      return Object.entries(i.consumerStateMap).forEach(([d, l]) => {
        const p = a.get(d);
        if (!p)
          return;
        if (l.errorCode) {
          n(this, ss).warn(`Consumer request failed for producer ${d}`, {
            error: { message: l.errorCode }
          }), c.push(H(D({}, p), { errorCode: l.errorCode }));
          return;
        }
        let g = {};
        try {
          g = JSON.parse(l.producerState.appData);
        } catch (S) {
        }
        o.set(d, {
          consumerId: l.consumerId,
          producingTransportId: p.producingTransportId,
          producingPeerId: p.producingPeerId,
          kind: p.kind,
          paused: p.pause,
          streamId: l.producerTrack.streamId,
          trackId: l.producerTrack.trackId,
          screenShare: p.screenShare,
          mimeType: p.mimeType,
          appData: g
        });
      }), { consumerStates: o, sessionDescription: i.sessionDescription, failedProducers: c };
    });
  }
  negotiate(t) {
    return u(this, null, function* () {
      try {
        n(this, ss).info("Negotiating socket consumer", { transport: this.recvTransport }), n(this, ss).debug(`setting remote offer: ${JSON.stringify(t)} on recvTransport`, {
          transport: this.recvTransport
        });
        const e = yield this.recvTransport.setRemoteOffer(t), r = {
          transportId: this.recvTransport.serverId,
          description: {
            sdp: e.sdp,
            type: e.type,
            target: vr.SUBSCRIBER
          }
        };
        return n(this, ss).debug(`sending renegotiate request: ${JSON.stringify(r)} on recvTransport`, {
          transport: this.recvTransport
        }), yield this.socket.sendMessagePromise(
          this.events.renegotiateSessionDescription,
          Lw.toBinary(r)
        ), n(this, ss).info("Renegotiation done", { transport: this.recvTransport }), e;
      } catch (e) {
        n(this, ss).error("Failed to renegotiate", { error: e });
        return;
      }
    });
  }
  close(t) {
    return u(this, null, function* () {
      if (!t.length)
        return {};
      const e = (r, i) => u(this, null, function* () {
        const a = r.map((l) => l.localId);
        n(this, ss).info(`Closing consumers: ${JSON.stringify(a)}`);
        const o = {
          description: {
            sdp: i.sdp,
            type: i.type,
            target: vr.SUBSCRIBER
          },
          consumerIds: a,
          consumingTransportId: this.recvTransport.serverId
        }, c = yield this.socketHandler.closeConsumer(o), d = db.fromBinary(c).description;
        return {
          sdp: d.sdp,
          type: d.type
        };
      });
      return yield this.recvTransport.awaitQueue.push(() => this.recvTransport.closeConsumers(t, e), "ConsumerStrategy.close", { consumersLength: t.length }), {};
    });
  }
  switchConsumersToLayer(t, e) {
    return u(this, null, function* () {
      const r = {
        requests: [],
        consumingTransportId: this.recvTransport.serverId
      }, i = t.filter((a) => a && a.id);
      i.forEach(({ id: a, producingTransportId: o, localId: c }) => {
        r.requests.push({
          producerId: a,
          producingTransportId: o,
          mid: c,
          simulcast: {
            preferredRid: e === 0 ? "q" : "h",
            priorityOrdering: "asciibetical",
            ridNotAvailable: "asciibetical"
          }
        });
      }), yield this.socketHandler.updateConsumersSimulcastConfig(r), n(this, ss).info(`Consumers switched layers to ${e}`, { consumerIds: i == null ? void 0 : i.map(({ id: a }) => a) });
    });
  }
}
hc = new WeakMap(), ss = new WeakMap();
class Gh {
  /* eslint-disable-next-line no-useless-constructor, no-empty-function */
  constructor(t) {
    this.socketHandler = t;
  }
  static getMSIDFromSDP(t, e) {
    return us.parse(t).media.filter(
      (a) => e === "video" ? a.type === "video" : a.type === "audio"
    ).at(-1).msid;
  }
  create(c) {
    return u(this, arguments, function* ({
      offer: t,
      kind: e,
      paused: r,
      appData: i,
      codecOptions: a,
      producingTransportId: o
    }) {
      var S, v;
      const d = Gh.getMSIDFromSDP(t.sdp, e), l = {
        description: {
          sdp: t.sdp,
          type: t.type,
          target: vr.PUBLISHER
        },
        paused: r,
        kind: e,
        msid: d,
        appData: JSON.stringify(i),
        screenShare: (S = i.screenShare) != null ? S : !1,
        mimeType: `${e}/${(v = a[0]) == null ? void 0 : v.name}`,
        producingTransportId: o
      }, { answer: p, producerId: g } = yield this.socketHandler.produce(l);
      return { answer: p, producerId: g };
    });
  }
}
var Bi, Wr, Pa, pc, Us, il, ir, Ca, gc, th, nl, hS, al, pS, ol, gS, cl, mS;
class eO extends XD {
  constructor(e, r) {
    super(e, r);
    m(this, gc);
    m(this, nl);
    m(this, al);
    m(this, ol);
    m(this, cl);
    m(this, Bi, void 0);
    m(this, Wr, void 0);
    m(this, Pa, void 0);
    m(this, pc, void 0);
    m(this, Us, void 0);
    m(this, il, {
      producerCreationFailureCount: 0,
      consumerCreationFailureCount: 0,
      producerNotReadyFailureCount: 0
    });
    m(this, ir, []);
    m(this, Ca, void 0);
    this.context = e, this.sendTransportConnectedCallback = () => u(this, null, function* () {
      f(this, pc, new Gh(this.socketHandler));
    }), this.recvTransportConnectedCallback = (i) => u(this, null, function* () {
      n(this, Pa).clear(), f(this, Us, new ZD(
        this.context,
        this.events,
        i,
        this.socket,
        this.socketHandler
      ));
    }), this.reset();
  }
  get socketHandler() {
    return super.socketHandler;
  }
  get producers() {
    return n(this, Bi);
  }
  get consumers() {
    return n(this, Wr);
  }
  get producerIdToConsumerIdMap() {
    return n(this, Pa);
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return this.context.getValue("logger");
  }
  reset() {
    f(this, Bi, /* @__PURE__ */ new Map()), f(this, Wr, /* @__PURE__ */ new Map()), f(this, Pa, /* @__PURE__ */ new Map());
  }
  createProducer(e, r) {
    return u(this, null, function* () {
      var i;
      if (!this.sendTransport || this.sendTransport.closed)
        throw new Error("Send transport is closed");
      try {
        const a = yield this.sendTransport.produce(
          e,
          x(this, nl, hS).bind(this)
        );
        return (i = e.appData) != null && i.e2ee && this.context.getValue("peerSessionStore").emit(k.E2EE_ACTIVE_PRODUCER, a), x(this, al, pS).call(this, a, r), a;
      } catch (a) {
        throw this.logger.error("Failed to create producer", { error: a }), n(this, il).producerCreationFailureCount += 1, a;
      }
    });
  }
  closeProducer(e, r) {
    return u(this, null, function* () {
      var a;
      const i = this.producers.get(e);
      if (!i) {
        this.logger.warn(`Producer with ID ${e} was not found`);
        return;
      }
      r != null && r.stopTrack && i.track.stop();
      try {
        yield this.sendTransport.closeProducer(i), (a = this.context.getValue("modules").e2ee) != null && a.enabled && this.context.getValue("peerSessionStore").emit(k.E2EE_INACTIVE_PRODUCER, i);
      } catch (o) {
        this.logger.error("Failed to close producer on server", { error: o, producer: i });
      }
    });
  }
  closeAllProducers() {
    return Promise.all(Array.from(n(this, Bi).entries()).map(([, e]) => e.close()));
  }
  createConsumer(e) {
    return this.createConsumers([e]);
  }
  createConsumers(e) {
    return u(this, null, function* () {
      n(this, Ca) || clearTimeout(n(this, Ca)), f(this, ir, n(this, ir).concat(e)), yield x(this, gc, th).call(this);
    });
  }
  closeConsumer(e) {
    return this.closeConsumers([e]);
  }
  closeConsumers(e) {
    return u(this, null, function* () {
      if (!n(this, Us))
        return;
      const r = e.map((a) => this.consumers.get(a)).filter((a) => a !== void 0);
      if (r.length === 0)
        return;
      const { failedConsumers: i } = yield n(this, Us).close(r);
      i != null && i.length && this.logger.warn("Failed to close some consumers", { consumerIds: i });
    });
  }
  closeAllConsumers() {
    return this.closeConsumers(Array.from(n(this, Wr).keys()));
  }
  switchConsumersToLayer(e, r) {
    return u(this, null, function* () {
      n(this, Us).switchConsumersToLayer(e, r);
    });
  }
}
Bi = new WeakMap(), Wr = new WeakMap(), Pa = new WeakMap(), pc = new WeakMap(), Us = new WeakMap(), il = new WeakMap(), ir = new WeakMap(), Ca = new WeakMap(), gc = new WeakSet(), th = function() {
  return u(this, null, function* () {
    if (!this.recvTransport || this.recvTransport.closed)
      throw new Error("Recv transport is closed");
    const e = 500, r = n(this, ir).splice(0, n(this, ir).length);
    try {
      const i = new Set(Array.from(this.consumers.values()).map(({ producerId: d }) => d)), a = r.filter(({ producerId: d }) => !this.producers.get(d) && !i.has(d));
      if (a.length === 0)
        return;
      const { consumers: o, failedProducers: c } = yield this.recvTransport.consume(
        a,
        x(this, ol, gS).bind(this),
        n(this, Us).negotiate.bind(n(this, Us))
      );
      if (o.forEach(x(this, cl, mS).bind(this)), c != null && c.length) {
        this.logger.error("Failed to create consumers for producers", { producers: c });
        const d = c.filter(({ errorCode: l, producerId: p }) => l === "not_found_track_error" ? (this.logger.error(`Track not found for producer: ${p}. This will not be retried.`), !1) : l === "backend_error" ? (this.logger.error("Unrecoverable error: backend error"), !1) : !0);
        f(this, ir, n(this, ir).concat(d)), f(this, Ca, setTimeout(
          x(this, gc, th).bind(this),
          e
        ));
      }
    } catch (i) {
      if (this.logger.error("failed to consume on transport", { error: i }), i.errorCode === "internal_error" && i.errorDescription === "Backend error" || i.errorCode === "invalid_session_description") {
        this.logger.error(
          "Irrecoverable error, closing current recvTransport to create a new one",
          {
            transport: this.recvTransport,
            error: { code: i.errorCode, message: i.errorDescription }
          }
        );
        try {
          this.stopTransports({ recv: !0 });
        } catch (a) {
        }
        yield this.setupTransports({ recv: !0 });
      }
    }
  });
}, nl = new WeakSet(), hS = function(e) {
  return n(this, pc).create(e);
}, al = new WeakSet(), pS = function(e, r) {
  e.on("close", (i, a) => u(this, null, function* () {
    const { offer: o, reason: c } = i;
    if (this.logger.info("producer::closing", {
      debuggingHint: c,
      producer: H(D({}, e), { status: "closing" })
    }), c !== Ad) {
      const d = {
        producerId: e.id,
        description: {
          sdp: o.sdp,
          type: o.type,
          target: vr.PUBLISHER
        }
      };
      try {
        const l = yield this.socketHandler.closeProducer(d), p = {
          sdp: l == null ? void 0 : l.sdp,
          type: l == null ? void 0 : l.type
        };
        this.logger.info("producer::closed", { producer: H(D({}, e), { status: "closed" }) }), a({ answer: p });
      } catch (l) {
        this.logger.error("producer close error", l);
      }
    }
    this.producers.delete(e.id), r();
  })), e.on("trackended", () => {
    this.logger.info("producer::trackended", { producer: H(D({}, e), { status: "UNKNOWN" }) });
  }), n(this, Bi).set(e.id, e);
}, ol = new WeakSet(), gS = function(e) {
  return u(this, null, function* () {
    try {
      return yield this.recvTransport.canConsume(), yield n(this, Us).create(e);
    } catch (r) {
      throw this.logger.error("Error in consume request", { error: r }), r;
    }
  });
}, cl = new WeakSet(), mS = function(e) {
  e.on("close", (r) => u(this, null, function* () {
    this.logger.debug("consumer closed", {
      consumer: {
        closureReason: r,
        id: e.id,
        kind: e.kind,
        appData: e.appData
      }
    }), n(this, Wr).delete(e.id), this.context.getValue("peerSessionStore").emit(k.CONSUMER_CLOSED, { id: e.id });
  })), n(this, Wr).set(e.id, e), this.producerIdToConsumerIdMap.set(e.producerId, e.id), this.context.getValue("peerSessionStore").emit(k.NEW_CONSUMER, {
    id: e.id,
    appData: e.appData,
    peerId: e.peerId
  });
};
var mc, fc, Sc, wa, Ra, ba, vc, Tc, ka, Rt, vs, Ts, Hi, qi, nr, yc, dl, fS, ll, SS, ul, vS, hl, TS;
const pl = class {
  constructor({
    initialEnergyThreshold: t = 0.015,
    zeroCrossingThreshold: e = 20,
    minVoiceDuration: r = 3,
    hangoverFrames: i = 5,
    noiseAdaptationRate: a = 0.95,
    voiceAdaptationRate: o = 0.99,
    minEnergyThreshold: c = 5e-3,
    maxEnergyThreshold: d = 0.2,
    energyRatioThreshold: l = 1.5,
    noiseHistorySize: p = 50
  } = {}) {
    /**
     * Update the energy threshold based on current noise conditions
     */
    m(this, dl);
    /**
     * Update the background noise estimate
     */
    m(this, ll);
    // Core VAD parameters
    m(this, mc, void 0);
    m(this, fc, void 0);
    // in frames
    m(this, Sc, void 0);
    // Adaptive energy threshold parameters
    m(this, wa, void 0);
    m(this, Ra, void 0);
    m(this, ba, void 0);
    m(this, vc, void 0);
    m(this, Tc, void 0);
    m(this, ka, void 0);
    // State variables
    m(this, Rt, void 0);
    m(this, vs, void 0);
    m(this, Ts, !1);
    m(this, Hi, 0);
    m(this, qi, 0);
    m(this, nr, []);
    m(this, yc, void 0);
    f(this, wa, t), f(this, Rt, t), f(this, mc, e), f(this, fc, r), f(this, Sc, i), f(this, Ra, a), f(this, ba, o), f(this, vc, c), f(this, Tc, d), f(this, ka, l), f(this, yc, p), f(this, vs, t / 2);
  }
  get voiceDetected() {
    return n(this, Ts);
  }
  /**
   * Process an audio chunk and determine if it contains voice activity
   * @param audioChunk - Float32Array containing audio samples in range [-1, 1]
   * @returns boolean indicating if voice activity is detected
   */
  processAudioChunk(t) {
    var o, c;
    const e = x(o = pl, ul, vS).call(o, t), r = x(c = pl, hl, TS).call(c, t);
    return x(this, dl, fS).call(this, e), e / n(this, vs) > n(this, ka) && e > n(this, Rt) && r > n(this, mc) ? (f(this, Hi, n(this, Hi) + 1), f(this, qi, n(this, Sc)), n(this, Hi) >= n(this, fc) && f(this, Ts, !0)) : (f(this, Hi, 0), n(this, qi) > 0 ? f(this, qi, n(this, qi) - 1) : n(this, Ts) && f(this, Ts, !1), n(this, Ts) || x(this, ll, SS).call(this, e)), { energy: e, isVoice: n(this, Ts) };
  }
  /**
   * Reset the detector state
   */
  reset() {
    f(this, Ts, !1), f(this, Hi, 0), f(this, qi, 0), f(this, Rt, n(this, wa)), f(this, vs, n(this, wa) / 2), f(this, nr, []);
  }
  /**
   * Get current adaptive threshold values for debugging/visualization
   */
  getThresholdInfo() {
    return {
      currentEnergyThreshold: n(this, Rt),
      backgroundNoiseEnergy: n(this, vs),
      energyRatioThreshold: n(this, ka)
    };
  }
};
let mo = pl;
mc = new WeakMap(), fc = new WeakMap(), Sc = new WeakMap(), wa = new WeakMap(), Ra = new WeakMap(), ba = new WeakMap(), vc = new WeakMap(), Tc = new WeakMap(), ka = new WeakMap(), Rt = new WeakMap(), vs = new WeakMap(), Ts = new WeakMap(), Hi = new WeakMap(), qi = new WeakMap(), nr = new WeakMap(), yc = new WeakMap(), dl = new WeakSet(), fS = function(t) {
  n(this, Ts) ? f(this, Rt, n(this, ba) * n(this, Rt) + (1 - n(this, ba)) * t) : f(this, Rt, n(this, Ra) * n(this, Rt) + (1 - n(this, Ra)) * n(this, vs)), f(this, Rt, Math.max(
    n(this, vc),
    Math.min(n(this, Tc), n(this, Rt))
  ));
}, ll = new WeakSet(), SS = function(t) {
  if (t < n(this, Rt) * 1.2)
    if (n(this, nr).push(t), n(this, nr).length > n(this, yc) && n(this, nr).shift(), n(this, nr).length >= 10) {
      const e = [...n(this, nr)].sort((i, a) => i - a), r = Math.floor(e.length / 2);
      f(this, vs, e[r]);
    } else
      f(this, vs, 0.95 * n(this, vs) + 0.05 * t);
}, ul = new WeakSet(), vS = function(t) {
  return Math.sqrt(
    t.map((e) => e * e).reduce((e, r) => e + r) / t.length
  );
}, hl = new WeakSet(), TS = function(t) {
  let e = 0;
  for (let r = 1; r < t.length; r += 1)
    (t[r] >= 0 && t[r - 1] < 0 || t[r] < 0 && t[r - 1] >= 0) && (e += 1);
  return e;
}, m(mo, ul), m(mo, hl);
var Ec;
class yg {
  constructor(t) {
    h(this, "RNAudioSampleHandler");
    m(this, Ec, void 0);
    f(this, Ec, t);
    const { RNAudioSampleHandlerImpl: e } = navigator;
    e == null || e.init().then((r) => {
      this.RNAudioSampleHandler = r;
    }).catch((r) => {
      this.logger.error("ReactNativeAudioSampler: Failed to initialize audio sampler", r);
    });
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Ec).getValue("logger");
  }
  get samples() {
    var e;
    const t = new Float32Array(1024);
    return (e = this.RNAudioSampleHandler) == null || e.getFloatTimeDomainData(t), t;
  }
  stop() {
    var t;
    (t = this.RNAudioSampleHandler) == null || t.destructor();
  }
}
Ec = new WeakMap();
var _c;
class Eg {
  constructor(t) {
    h(this, "audioContext");
    h(this, "analyser");
    m(this, _c, void 0);
    f(this, _c, t), this.audioContext = new AudioContext(), this.analyser = this.audioContext.createAnalyser(), this.analyser.fftSize = 2048;
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, _c).getValue("logger");
  }
  get samples() {
    if (this.audioContext.state === "suspended")
      try {
        this.audioContext.resume();
      } catch (e) {
        this.logger.error("AudioContextSampler: Failed to resume audio context", e);
      }
    const t = new Float32Array(this.analyser.frequencyBinCount);
    return this.analyser.getFloatTimeDomainData(t), t;
  }
  set audioTrack(t) {
    const e = new MediaStream();
    e.addTrack(t), this.audioContext.createMediaStreamSource(e).connect(this.analyser);
  }
}
_c = new WeakMap();
class tO {
  static setInterval(t, e = 0, ...r) {
    return navigator && navigator.RNBackgroundTimerImpl ? navigator.RNBackgroundTimerImpl.setInterval(t, e, ...r) : global.setInterval(t, e, ...r);
  }
  static clearInterval(t) {
    return navigator && navigator.RNBackgroundTimerImpl ? navigator.RNBackgroundTimerImpl.clearInterval(t) : global.clearInterval(t);
  }
  static setTimeout(t, e = 0, ...r) {
    return navigator && navigator.RNBackgroundTimerImpl ? navigator.RNBackgroundTimerImpl.setTimeout(t, e, ...r) : global.setTimeout(t, e, ...r);
  }
  static clearTimeout(t) {
    return navigator && navigator.RNBackgroundTimerImpl ? navigator.RNBackgroundTimerImpl.clearTimeout(t) : global.clearTimeout(t);
  }
}
const sO = 60, rO = 400;
var ar, or, ys, Pc, ji, Ia, cr, Jr, Aa, dr, lr, $s, gl, yS, Cc, sh, ml, ES, fl, _S;
const Ro = class {
  constructor(t, e) {
    m(this, gl);
    m(this, ml);
    m(this, ar, void 0);
    m(this, or, void 0);
    m(this, ys, void 0);
    m(this, Pc, void 0);
    m(this, ji, void 0);
    m(this, Ia, void 0);
    m(this, cr, void 0);
    m(this, Jr, void 0);
    m(this, Aa, void 0);
    m(this, dr, void 0);
    m(this, lr, void 0);
    m(this, $s, void 0);
    this.reportRequest = e, f(this, dr, t), f(this, Ia, new mo());
    const { isReactNative: r } = navigator;
    f(this, lr, r ? new yg(n(this, dr)) : new Eg(n(this, dr))), f(this, $s, r ? tO : nd);
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, dr).getValue("logger");
  }
  set producerId(t) {
    f(this, ys, t);
  }
  set audioTrack(t) {
    f(this, Pc, t), n(this, lr) instanceof Eg && (n(this, lr).audioTrack = t);
  }
  start() {
    this.logger.debug(`AudioActivityReporter: Starting audio activity reporter: ${n(this, ys)}`), n(this, ar) && n(this, $s).clearInterval(n(this, ar)), f(this, ar, n(this, $s).setInterval(() => u(this, null, function* () {
      var i;
      if (!n(this, Pc) || !n(this, ys))
        return;
      const { energy: t } = x(this, gl, yS).call(this), e = x(i = Ro, Cc, sh).call(i, t);
      let r = 0.9;
      n(this, Aa) !== e && n(this, Aa) ? r = 0.9 : e ? r = 0.3 : r = 0.5, f(this, ji, (n(this, ji) || 0) * (1 - r) + t * r);
    }), sO)), n(this, or) && n(this, $s).clearInterval(n(this, or)), f(this, or, n(this, $s).setInterval(
      x(this, ml, ES).bind(this),
      rO
    ));
  }
  stop() {
    try {
      this.logger.debug(`AudioActivityReporter: Stopping audio activity reporter: ${n(this, ys)}`), n(this, ar) && (n(this, $s).clearInterval(n(this, ar)), f(this, ar, void 0)), n(this, or) && (n(this, $s).clearInterval(n(this, or)), f(this, or, void 0));
    } catch (t) {
    }
    n(this, Ia).reset(), n(this, lr) instanceof yg && n(this, lr).stop();
  }
};
let fo = Ro;
ar = new WeakMap(), or = new WeakMap(), ys = new WeakMap(), Pc = new WeakMap(), ji = new WeakMap(), Ia = new WeakMap(), cr = new WeakMap(), Jr = new WeakMap(), Aa = new WeakMap(), dr = new WeakMap(), lr = new WeakMap(), $s = new WeakMap(), gl = new WeakSet(), yS = function() {
  var o;
  const { samples: t } = n(this, lr), { energy: e, isVoice: r } = n(this, Ia).processAudioChunk(t), i = x(o = Ro, fl, _S).call(o, e);
  return n(this, dr).getValue("flagsmith").hasFeature(ee.ENABLE_AUDIO_ACTIVITY_DEBUG_LOGS) && this.logger.debug(
    `AudioActivityReporter: producer: ${n(this, ys)}, energy: ${n(this, ji)},
				slogScale: ${i}, isVoice: ${r}, minEnergy: ${n(this, cr)},
				maxEnergy: ${n(this, Jr)}`
  ), i === -1 / 0 || e < 1e-6 ? { energy: 0, isVoice: !1 } : ((!n(this, cr) || i < n(this, cr)) && f(this, cr, i), (!n(this, Jr) || i > n(this, Jr)) && f(this, Jr, i), { energy: (i - n(this, cr)) / (n(this, Jr) - n(this, cr)) * 10 || 0, isVoice: r });
}, Cc = new WeakSet(), sh = function(t) {
  return t < 5;
}, ml = new WeakSet(), ES = function(t = n(this, ji)) {
  var r;
  if (!n(this, ys) || !t) {
    n(this, dr).getValue("flagsmith").hasFeature(ee.ENABLE_AUDIO_ACTIVITY_DEBUG_LOGS) && this.logger.debug(`AudioActivityReporter: No producerId or energy to report: ${n(this, ys)}`);
    return;
  }
  const e = {
    producerId: n(this, ys),
    energy: Math.round(t),
    silent: x(r = Ro, Cc, sh).call(r, t)
  };
  f(this, Aa, e.silent), this.reportRequest(e);
}, fl = new WeakSet(), _S = function(t) {
  const e = Math.log10(t);
  return Math.round(e);
}, m(fo, Cc), m(fo, fl);
const iO = (s = !1) => {
  if ("MediaStreamTrackGenerator" in window && "AudioData" in window)
    try {
      const e = new window.MediaStreamTrackGenerator({ kind: "audio" }), r = e.writable.getWriter(), i = 48e3, a = 128, o = 1;
      let c = 0, d = null;
      const l = () => u(void 0, null, function* () {
        try {
          const S = new Float32Array(a * o), v = new window.AudioData({
            format: "f32",
            sampleRate: i,
            numberOfFrames: a,
            numberOfChannels: o,
            timestamp: c,
            data: S
          });
          c += a / i * 1e6, yield r.ready, yield r.write(v);
        } catch (S) {
          d && clearInterval(d), r.releaseLock(), e.writable.abort();
        }
      });
      d = window.setInterval(l, 100);
      const g = new MediaStream([e]).getAudioTracks()[0];
      return g.addEventListener("ended", () => {
        d && clearInterval(d), r.releaseLock(), e.writable.abort();
      }), Object.assign(g, { fakeTracks: "fakeTracks:fakeAudioTrack" }), g.enabled = s, g;
    } catch (e) {
    }
  const t = window.AudioContext || window.webkitAudioContext;
  if (t)
    try {
      const e = new t();
      if (!e || e.state !== "running" || !e.destination)
        return;
      const r = e.createOscillator();
      r.frequency.value = 0, r.type = "sine";
      const i = e.createGain();
      i.gain.value = 0, r.connect(i);
      const a = e.createMediaStreamDestination();
      i.connect(a), r.start();
      const o = a.stream.getAudioTracks()[0];
      return o ? (Object.assign(o, { fakeTracks: "fakeTracks:fakeAudioTrack" }), o.enabled = s, o) : void 0;
    } catch (e) {
      return;
    }
}, nO = (s = !1) => {
  var a, o;
  const t = new MediaStream().getVideoTracks()[0], e = document.createElement("canvas");
  e.height = (a = t == null ? void 0 : t.getSettings().height) != null ? a : 720, e.width = (o = t == null ? void 0 : t.getSettings().width) != null ? o : 1280;
  const r = e.getContext("2d");
  r.fillStyle = "black", r.fillRect(0, 0, e.width, e.height), setInterval(() => {
    r.fillStyle = "black", r.fillRect(0, 0, e.width, e.height);
  }, 1e3);
  const i = e.captureStream().getVideoTracks()[0];
  return Object.assign(i, { fakeTracks: "fakeTracks:fakeVideoTrack" }), i.enabled = s, i;
};
var aO = Object.defineProperty, oO = Object.getOwnPropertyDescriptor, de = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? oO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && aO(t, e, i), i;
};
const Ot = ["video/VP9", "video/VP8"];
var wc, Rc, ct, W, Ma, vt, Gi, Wi, Ji, bc, rs, ur, kc, Ki, zi, Tt, bt, Kr, yn, Sl, CS, vl, wS, Tl, RS, Ic, rh, yl, mu, bS, El, kS, _l, IS, Pl, AS, Ze, pt, Yi, So, Cl, MS, wl, DS, Rl, OS;
const PS = (mu = class {
  constructor(s, t) {
    m(this, Kr);
    /**
     * Wait for the transports to be established and notify join room completion
     */
    m(this, Sl);
    m(this, vl);
    /**
     * Reports room joined analytics to call stats
    	 * @param roomUuid - The UUID of the room
     */
    m(this, Tl);
    /**
     * Initializes the connection to the SFU by establishing
     * a socket connection and setting up transports.
     */
    m(this, Ic);
    m(this, El);
    m(this, _l);
    m(this, Pl);
    m(this, Ze);
    m(this, Yi);
    m(this, Cl);
    m(this, wl);
    m(this, Rl);
    h(this, "context");
    h(this, "authToken");
    h(this, "e2ee");
    m(this, wc, void 0);
    m(this, Rc, void 0);
    m(this, ct, void 0);
    m(this, W, void 0);
    m(this, Ma, void 0);
    m(this, vt, void 0);
    m(this, Gi, void 0);
    m(this, Wi, void 0);
    m(this, Ji, void 0);
    m(this, bc, void 0);
    m(this, rs, null);
    m(this, ur, void 0);
    m(this, kc, void 0);
    // NOTE(roerohan): If a peer ID is present in a set corresponding
    // to a video codec, it implies that the video codec is the best
    // codec that the peer can send
    m(this, Ki, void 0);
    m(this, zi, void 0);
    m(this, Tt, void 0);
    m(this, bt, void 0);
    var r, i;
    this.context = s;
    const {
      socket: e
    } = t;
    this.mediaJoined = !1, f(this, Ki, /* @__PURE__ */ new Map([
      ["video/VP9", /* @__PURE__ */ new Set()],
      ["video/VP8", /* @__PURE__ */ new Set()]
    ])), f(this, zi, /* @__PURE__ */ new Map([
      ["video/VP9", /* @__PURE__ */ new Set()],
      ["video/VP8", /* @__PURE__ */ new Set()]
    ])), f(this, ct, e), f(this, Gi, !1), f(this, W, new eO(s, e)), f(this, vt, n(this, W).events), f(this, ur, /* @__PURE__ */ new Set()), f(this, Tt, /* @__PURE__ */ new Map()), f(this, Wi, !1), f(this, Ji, new Ku(s.getValue("logger"))), f(this, bt, new fo(
      this.context,
      n(this, W).socketHandler.audioActivity.bind(n(this, W).socketHandler)
    )), this.e2ee = (i = (r = s.getValue("modules").e2ee) == null ? void 0 : r.enabled) != null ? i : !1, this.handleSocketEvents(), this.handleCallstatsEvents(), f(this, bc, Ih(
      () => u(this, null, function* () {
        if (!n(this, Kr, yn).mediaJoinAttempted)
          return;
        const { roomJoined: a } = yield this.joinRoom(
          n(this, Rc),
          n(this, wc),
          !0,
          !0
        );
        a && (this.context.getValue("peerSessionStore").emit(k.RESET_PRODUCER_STATE), this.context.getValue("peerSessionStore").emit(k.ROOM_NODE_RECONNECTED));
      }),
      5e3,
      { leading: !0, maxWait: 1e3 }
    ));
  }
  get peerId() {
    return this.context.getValue("peerId");
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return this.context.getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return this.context.getValue("logger");
  }
  get mediaJoined() {
    return n(this, Kr, yn).mediaJoined;
  }
  set mediaJoined(s) {
    n(this, Kr, yn).mediaJoined = s;
  }
  reset() {
    n(this, W).closeAllProducers(), n(this, W).closeAllConsumers(), n(this, Tt).clear(), n(this, ur).clear(), f(this, rs, null), n(this, Ji).stop(), n(this, W).stopAllTransports(), n(this, W).reset(), f(this, Ji, new Ku());
  }
  joinRoom(a, o) {
    return u(this, arguments, function* (s, t, e = !1, r = !1, i = {}) {
      n(this, Kr, yn).mediaJoinAttempted = !0, f(this, Gi, !0), e && this.reset();
      try {
        return yield n(this, Ji).push(
          () => x(this, Sl, CS).call(this, s, t, r, i),
          "joinRoom"
        );
      } catch (c) {
        return this.logger.error("Error in room joining process", { error: c }), this.context.getValue("peerSessionStore").emit(k.ROOM_NODE_FAILED), { roomJoined: !1 };
      }
    });
  }
  /**
   * Initialize connection to the SFU.
   * This can be used to start establishing a connection
   * before the full join process.
   */
  initializeConnection(i, a) {
    return u(this, arguments, function* (s, t, e = !1, r = {}) {
      return n(this, rs) ? n(this, rs) : (f(this, rs, (() => u(this, null, function* () {
        try {
          yield x(this, Ic, rh).call(this, s, t, e, r);
        } catch (o) {
          throw f(this, rs, null), o;
        }
      }))()), n(this, rs));
    });
  }
  getConsumers() {
    return n(this, W).consumers;
  }
  getProducers() {
    return n(this, W).producers;
  }
  leaveRoom() {
    return u(this, null, function* () {
      n(this, W).stopAllTransports(), f(this, Wi, !1), n(this, Kr, yn).mediaJoinAttempted = !1;
      const s = {
        closeRoom: !1
      };
      n(this, ct).sendMessagePromise(
        n(this, vt).leaveRoom,
        oR.toBinary(s)
      ).then((e) => {
        var r;
        (r = zR.fromBinary(e.payload)) != null && r.closed && this.logger.warn("Weird state on peer closed and should not happen");
      }).catch((e) => {
        this.logger.error("error on sending leave room request", { error: e });
      }), this.context.getValue("callstats").callEnded(), this.context.getValue("telemetry").destruct();
    });
  }
  activatePeers(s) {
    return u(this, null, function* () {
      return this.createConsumers(s);
    });
  }
  createConsumers(s) {
    return u(this, null, function* () {
      return s.length === 0 ? Promise.resolve() : n(this, W).createConsumers(s);
    });
  }
  closeConsumers(s) {
    return u(this, null, function* () {
      if (!s.length)
        return;
      const t = s.reduce((e, r) => {
        const i = n(this, W).producerIdToConsumerIdMap.get(
          r.producerId
        );
        return i ? (e.push(i), e) : (this.logger.warn(
          `consumer not found in close consumers: ${r.producerId}`
        ), e);
      }, []);
      yield n(this, W).closeConsumers(t);
    });
  }
  _shareWebcam(s, t) {
    return u(this, null, function* () {
      var g, S;
      const e = t === "video/VP9" ? he.WEBCAM : he.WEBCAM_BACKUP, r = x(this, Ze, pt).call(this, e);
      if (r) {
        const v = yield r;
        if (n(this, W).producers.has(v)) {
          const _ = n(this, W).producers.get(v);
          if (!_.closed)
            return yield _.replaceTrack({ track: s }), yield this.resumeWebcam(e), s;
          yield this.disableWebcam(t);
        }
        return this._shareWebcam(s, t);
      }
      const i = [t].concat(Ot.filter((v) => v !== t)), a = x(this, Rl, OS).call(this, s, i), o = La(this.context, "disableSimulcast"), c = (S = (g = this.context) == null ? void 0 : g.getValue("overrides")) == null ? void 0 : S.simulcastConfig;
      !(o || c && c.disable) && this.context.getValue("flagsmith").hasFeature(ee.ENABLE_CF_SIMULCAST) ? (this.logger.info("Simulcast enabled for SFU: CF"), a.encodings = W0(this.context, s)) : this.logger.info("Simulcast disabled for webcam producer, SFU: CF"), this.context.getValue("flagsmith").hasFeature(ee.TRACK_HINT) && (a.track.contentHint = this.context.getValue("flagsmith").getValue(
        ee.TRACK_HINT
      ));
      const l = () => {
        this.logger.info("Disabling video due to the producer closure"), n(this, Tt).delete(e);
      }, p = n(this, W).createProducer(
        a,
        l
      );
      return x(this, Yi, So).call(this, e, p.then((v) => v.id)), p.then((v) => v.track);
    });
  }
  shareWebcam(s) {
    return u(this, null, function* () {
      var r;
      if (s === void 0)
        return null;
      const t = (r = this.context.getValue("flagsmith").getValue(ee.FORCE_VIDEO_CODEC)) == null ? void 0 : r.toString();
      if (t)
        return this.logger.debug(`Calling _shareWebcam with forced video codec: ${t}`), this._shareWebcam(s, t);
      const e = Ot.filter((i) => {
        var a, o;
        return (
          // NOTE(roerohan): If the codec is supported
          ((o = (a = n(this, Ma).sender) == null ? void 0 : a.video) == null ? void 0 : o.codecs.findIndex(
            (c) => c.mimeType === i
          )) >= 0 && n(this, zi).get(i).size > 0
        );
      });
      return e.length === 0 && e.push(Ot[0]), yield Promise.all(e.map((i) => (this.logger.debug(`Calling _shareWebcam with video codec: ${i}`), this._shareWebcam(s, i)))), s;
    });
  }
  shareScreen(s) {
    return u(this, null, function* () {
      const { video: t, audio: e } = s;
      if (t === void 0)
        return;
      const r = {
        track: t,
        codecOptions: [
          {
            name: "VP8"
          }
        ],
        appData: {
          screenShare: !0,
          e2ee: this.e2ee,
          supportsRemoteControl: ye.isElectron()
        },
        stopTracks: !1
      }, i = () => {
        this.logger.info("Disabling screenShare due to the producer closure"), n(this, Tt).delete(he.SCREENSHARE_VIDEO), n(this, Tt).delete(he.SCREENSHARE_AUDIO);
      }, a = n(this, W).createProducer(
        r,
        i
      );
      x(this, Yi, So).call(this, he.SCREENSHARE_VIDEO, a.then((c) => c.id));
      let o;
      if (e) {
        const c = {
          track: e,
          codecOptions: [{ name: "opus" }],
          appData: {
            screenShare: !0,
            e2ee: this.e2ee,
            supportsRemoteControl: ye.isElectron()
          },
          stopTracks: !1,
          zeroRtpOnPause: !1
        }, d = () => {
        };
        o = n(this, W).createProducer(
          c,
          d
        ), x(this, Yi, So).call(this, he.SCREENSHARE_AUDIO, o.then((l) => l.id));
      }
      yield Promise.all([a, o || Promise.resolve()]), this.context.getValue("callstats").screenShareStart();
    });
  }
  shareMic(s) {
    return u(this, null, function* () {
      try {
        if (s === void 0)
          throw new It("track undefined");
        const t = x(this, Ze, pt).call(this, he.MIC);
        if (t) {
          const a = yield t;
          if (n(this, W).producers.has(a)) {
            const o = n(this, W).producers.get(a);
            if (!o.closed) {
              yield o.replaceTrack({ track: s }), yield this.resumeMic(), n(this, bt) && (n(this, bt).audioTrack = s, n(this, bt).producerId = a, n(this, bt).start());
              return;
            }
            yield n(this, W).closeProducer(a, { stopTrack: !1 });
          }
          yield this.shareMic(s);
          return;
        }
        const e = x(this, wl, DS).call(this, s), r = () => {
          n(this, Tt).delete(he.MIC);
        }, i = n(this, W).createProducer(
          e,
          r
        );
        x(this, Yi, So).call(this, he.MIC, i.then((a) => a.id)), yield i.then((a) => {
          n(this, bt) && (n(this, bt).audioTrack = a.track, n(this, bt).producerId = a.id, n(this, bt).start());
        });
      } catch (t) {
        throw new b(t);
      }
    });
  }
  pauseMic() {
    return u(this, null, function* () {
      var r;
      const s = yield x(this, Ze, pt).call(this, he.MIC), t = n(this, W).producers.get(s);
      if (!t) {
        this.logger.error("pauseMic::could_not_find_mic_producer");
        return;
      }
      if (t.paused) {
        this.logger.info("pauseMic::mic_producer_already_paused");
        return;
      }
      t.pause(), (r = n(this, bt)) == null || r.stop();
      const e = {
        producerId: t.id,
        pause: !0
      };
      n(this, ct).sendMessage(
        n(this, vt).toggleProducer,
        Xc.toBinary(e)
      );
    });
  }
  pauseWebcam() {
    return u(this, null, function* () {
      const s = yield x(this, Ze, pt).call(this, he.WEBCAM), t = yield x(this, Ze, pt).call(this, he.WEBCAM_BACKUP), e = n(this, W).producers.get(s), r = n(this, W).producers.get(t);
      if (!e && !r) {
        this.logger.error("pauseWebcam::could_not_find_webcam_producer");
        return;
      }
      const i = (a) => {
        const o = {
          producerId: a.id,
          pause: !0
        };
        n(this, ct).sendMessage(
          n(this, vt).toggleProducer,
          Xc.toBinary(o)
        );
      };
      e && (e.pause(), i(e)), r && (r.pause(), i(r));
    });
  }
  resumeMic() {
    return u(this, null, function* () {
      const s = yield x(this, Ze, pt).call(this, he.MIC), t = n(this, W).producers.get(s);
      if (!t) {
        this.logger.error("resumeMic::could_not_find_mic_producer");
        return;
      }
      if (!t.pause) {
        this.logger.info("resumeMic::mic_producer_already_resumed");
        return;
      }
      t.resume(), t.appData.e2ee && this.context.getValue("peerSessionStore").emit(k.E2EE_ACTIVE_PRODUCER, t);
      const e = {
        producerId: t.id,
        pause: !1
      };
      n(this, ct).sendMessage(
        n(this, vt).toggleProducer,
        Xc.toBinary(e)
      );
    });
  }
  resumeWebcam() {
    return u(this, arguments, function* (s = he.WEBCAM) {
      const t = yield x(this, Ze, pt).call(this, s), e = n(this, W).producers.get(t);
      if (!e) {
        this.logger.error("resumeWebcam::could_not_find_webcam_producer");
        return;
      }
      if (!e.paused) {
        this.logger.info("resumeWebcam::webcam_producer_already_resumed");
        return;
      }
      e.resume(), e.appData.e2ee && this.context.getValue("peerSessionStore").emit(k.E2EE_ACTIVE_PRODUCER, e);
      const r = {
        producerId: e.id,
        pause: !1
      };
      n(this, ct).sendMessage(
        n(this, vt).toggleProducer,
        Xc.toBinary(r)
      );
    });
  }
  disableWebcam(s) {
    return u(this, null, function* () {
      const t = s === "video/VP9" ? he.WEBCAM : he.WEBCAM_BACKUP, e = yield x(this, Ze, pt).call(this, t);
      x(this, Cl, MS).call(this, t), e && (yield n(this, W).closeProducer(e));
    });
  }
  disableMic() {
    return u(this, null, function* () {
      var t;
      const s = yield x(this, Ze, pt).call(this, he.MIC);
      s && (yield n(this, W).closeProducer(s)), (t = n(this, bt)) == null || t.stop(), n(this, Tt).delete(he.MIC);
    });
  }
  disableScreenShare() {
    return u(this, null, function* () {
      this.logger.info("screen_sharing_stopped"), this.context.getValue("callstats").screenShareStop();
      const s = yield x(this, Ze, pt).call(this, he.SCREENSHARE_VIDEO), t = yield x(this, Ze, pt).call(this, he.SCREENSHARE_AUDIO);
      s && (yield n(this, W).closeProducer(s)), t && (yield n(this, W).closeProducer(t)), n(this, ur).clear(), n(this, Tt).delete(he.SCREENSHARE_VIDEO), n(this, Tt).delete(he.SCREENSHARE_AUDIO);
    });
  }
  muteSelf() {
    return u(this, null, function* () {
      this.pauseMic();
    });
  }
  resetVideoProducers(s, t) {
    return u(this, null, function* () {
      if (s) {
        const e = yield x(this, Ze, pt).call(this, he.WEBCAM), r = yield x(this, Ze, pt).call(this, he.WEBCAM_BACKUP);
        yield n(this, W).closeProducer(e, { stopTrack: !1 }), yield n(this, W).closeProducer(r, { stopTrack: !1 }), this.shareWebcam(s);
      }
      if (t) {
        const e = yield x(this, Ze, pt).call(this, he.SCREENSHARE_VIDEO);
        yield n(this, W).closeProducer(
          e,
          { stopTrack: !1 }
        ), this.shareScreen({ video: t });
      }
    });
  }
  changeDisplayName(s, t) {
    return u(this, null, function* () {
      const e = {
        displayName: s,
        participantId: t != null ? t : this.peerId
      };
      if (!(yield n(this, W).socketHandler.changeDisplayName(e)))
        throw new Error("failed to change display name!");
    });
  }
  kick(s) {
    const t = {
      peerIds: [s]
    };
    n(this, W).socketHandler.kickPeer(t);
  }
  kickAll() {
    n(this, W).socketHandler.kickAll();
  }
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  muteAll(s) {
    return u(this, null, function* () {
      if (!(yield n(this, W).socketHandler.hostControlForAll("audio")))
        throw new Error("failed to mute all participant");
    });
  }
  muteAllVideo() {
    return u(this, null, function* () {
      if (!(yield n(this, W).socketHandler.hostControlForAll("video")))
        throw new Error("failed to mute all video participant");
    });
  }
  disableAudio(s) {
    return u(this, null, function* () {
      if (!(yield n(this, W).socketHandler.hostControlForPeer(
        s,
        "audio"
      )))
        throw new Error("failed to mute given participant");
    });
  }
  disableVideo(s) {
    return u(this, null, function* () {
      if (!(yield n(this, W).socketHandler.hostControlForPeer(
        s,
        "video"
      )))
        throw new Error("failed to mute video of given participant");
    });
  }
  pinPeer(s) {
    return u(this, null, function* () {
      const t = {
        participantId: s != null ? s : ""
      };
      try {
        yield n(this, ct).sendMessagePromise(
          n(this, vt).globalPinPeer,
          ER.toBinary(t)
        );
      } catch (e) {
        this.logger.error("Error in pinning peer:", { error: e });
      }
    });
  }
  validateScreenShare(s) {
    return this.peerId === s.peerId && n(this, W).producers.get(s.producerId) && n(this, ur).add(s.consumerPeerId), n(this, ur).size;
  }
  switchConsumersToLayer(s, t) {
    return u(this, null, function* () {
      const e = s.map((r) => this.getConsumers().get(r));
      n(this, W).switchConsumersToLayer(e, t);
    });
  }
  handleSocketEvents() {
    return u(this, null, function* () {
      n(this, ct).on(
        n(this, vt).peerProducerCreateBroadcast,
        ({ payload: s }) => {
          var t, e;
          if (this.mediaJoined)
            try {
              const { participantId: r, producerState: i } = wb.fromBinary(s);
              if (r === this.peerId)
                return;
              if (i != null && i.mimeType || (i.mimeType = i.kind === Fs.AUDIO ? "audio/opus" : "video/VP8"), i.kind === Fs.VIDEO && !i.screenShare && // Can receive vp9
              ((e = (t = n(this, Ma).receiver) == null ? void 0 : t.video) == null ? void 0 : e.codecs.findIndex(
                (a) => a.mimeType === Ot[0]
              )) >= 0 && n(this, Ki).get(Ot[0]).has(r) && i.mimeType !== Ot[0]) {
                this.logger.warn(`Ignoring producer: ${i.producerId}`);
                return;
              }
              this.logger.info(
                `producer created broadcast: ${r}, producer state: ${i}`
              ), this.context.getValue("peerSessionStore").emit(k.NEW_PRODUCER, {
                peerId: r,
                producer: H(D({}, i), {
                  kind: i.kind === Fs.AUDIO ? "audio" : "video",
                  producingPeerId: r
                })
              });
            } catch (r) {
              this.logger.error("error in peer-producer-create-broadcast", {
                error: r
              });
            }
        }
      ), n(this, ct).on(
        n(this, vt).peerProducerToggleBroadcast,
        ({ payload: s }) => {
          if (this.mediaJoined)
            try {
              const {
                participantId: t,
                initiatorParticipantId: e,
                producerState: {
                  kind: r,
                  pause: i,
                  producerId: a,
                  screenShare: o
                }
              } = Kp.fromBinary(s);
              if (o)
                return;
              const c = r === Fs.AUDIO ? "audio" : "video";
              if (this.logger.info(
                `producer toggle broadcast: ${t}, producerId: ${a}, kind:${c}, paused:${i} payload: ${JSON.stringify(Kp.fromBinary(s))}`
              ), t === this.peerId && e !== this.peerId && i && this.context.getValue("peerSessionStore").emit(
                c === "audio" ? k.MUTE_SELF : k.MUTE_SELF_VIDEO
              ), t === this.peerId)
                return;
              this.context.getValue("peerSessionStore").emit(k.PRODUCER_TOGGLE, {
                peerId: t,
                producerId: a,
                paused: i,
                kind: c
              }), Array.from(
                this.getConsumers().values()
              ).filter((l) => l.producerId === a).forEach((l) => {
                l.kind === "video" && i || l.paused !== i && (this.logger.debug(
                  `consumer state mismatched for ${l.id}. updating consumer pause state ${l.paused} to ${i}`
                ), i ? (l.pause(), this.context.getValue("peerSessionStore").emit(k.CONSUMER_PAUSED, {
                  id: l.id
                })) : (l.resume(), this.context.getValue("peerSessionStore").emit(k.CONSUMER_RESUMED, {
                  id: l.id
                })));
              });
            } catch (t) {
              this.logger.error("error in producer toggle broadcast handler", {
                error: t
              });
            }
        }
      ), n(this, ct).on(n(this, vt).peerLeaveBroadcast, ({ payload: s }) => {
        if (this.mediaJoined)
          try {
            const { participantId: t } = bu.fromBinary(s);
            if (t === this.peerId)
              return;
            this.logger.info(`peer left broadcast:${t}`), n(this, ur).delete(t), n(this, W).consumers.forEach(
              (e) => {
                e.peerId === t && e.close();
              }
            ), this.context.getValue("peerSessionStore").emit(k.PEER_CLOSED, { id: t });
          } catch (t) {
            this.logger.error("error in peer left broadcast", { error: t });
          }
      }), n(this, ct).on(
        n(this, vt).peerProducerCloseBroadcast,
        ({ payload: s }) => {
          if (this.mediaJoined)
            try {
              const {
                participantId: t,
                producerState: { producerId: e }
              } = kb.fromBinary(s);
              if (t === this.peerId)
                return;
              this.logger.info(`producer closed broadcast:${t}`), this.context.getValue("peerSessionStore").emit(k.PRODUCER_CLOSED, {
                peerId: t,
                producerId: e
              });
              const r = n(this, W).producerIdToConsumerIdMap.get(e);
              if (!r) {
                this.logger.warn(`no consumer found for producer:${e}`);
                return;
              }
              this.logger.info(
                `closing consumer ${r}, producer id: ${e}`
              ), n(this, W).closeConsumer(r).then(() => {
                this.logger.info(`closed consumer: ${r}`), n(this, W).producerIdToConsumerIdMap.delete(e), this.context.getValue("peerSessionStore").emit(k.CONSUMER_CLOSED, {
                  id: r
                });
              }).catch((i) => {
                this.logger.error("error closing consumer", { error: i });
              });
            } catch (t) {
              this.logger.error("error on producer close broadcast", { error: t });
            }
        }
      ), n(this, ct).on(
        n(this, vt).mediaRoomTerminationBroadcastResponse,
        () => {
          !this.mediaJoined && !n(this, Gi) && !n(this, Wi) || (this.logger.warn(
            "media hub termination broadcast received, rejoining room"
          ), this.context.getValue("peerSessionStore").emit(k.ROOM_NODE_DISCONNECTED), n(this, bc).call(this));
        }
      );
    });
  }
  handleCallstatsEvents() {
    this.context.getValue("callstats").onConsumerScore((s) => {
      s.forEach((t, e) => {
        const r = n(this, W).consumers.get(e);
        r && this.context.getValue("peerSessionStore").emit(k.CONSUMER_SCORE_UPDATE, {
          id: e,
          kind: r.kind,
          peerId: r.peerId,
          score: t.score,
          scoreStats: t
        });
      });
    }), this.context.getValue("callstats").onProducerScore((s) => {
      s.forEach((t, e) => {
        const r = Array.from(n(this, W).producers.values()).find(
          (i) => i.id === e
        );
        r && this.context.getValue("peerSessionStore").emit(k.PRODUCER_SCORE_UPDATE, {
          id: e,
          kind: r.kind,
          appData: r.appData,
          score: t.score,
          scoreStats: t
        });
      });
    });
  }
  handlePeerCapabilities(s, t) {
    var e, r, i, a;
    for (let o = 0; o <= Ot.length; o += 1) {
      const c = Ot[o];
      if (
        // if the codec is present in the peer capabilities
        ((r = (e = t == null ? void 0 : t.receiver) == null ? void 0 : e.video) == null ? void 0 : r.codecs.findIndex(
          (d) => d.mimeType === c
        )) >= 0 || o === Ot.length - 1
      ) {
        n(this, zi).get(c).add(s);
        break;
      }
    }
    for (let o = 0; o <= Ot.length; o += 1) {
      const c = Ot[o];
      if (
        // if the codec is present in the peer capabilities
        ((a = (i = t == null ? void 0 : t.sender) == null ? void 0 : i.video) == null ? void 0 : a.codecs.findIndex(
          (d) => d.mimeType === c
        )) >= 0 || o === Ot.length - 1
      ) {
        n(this, Ki).get(c).add(s);
        break;
      }
    }
  }
  handlePeerLeaving(s) {
    this.context.getValue("flagsmith").hasFeature(ee.FORCE_VIDEO_CODEC) || (n(this, Ki).forEach((t) => t.delete(s)), n(this, zi).forEach((t, e) => {
      t.delete(s), !(t.size !== 0 || e === Ot[0]) && this.disableWebcam(e);
    }));
  }
}, wc = new WeakMap(), Rc = new WeakMap(), ct = new WeakMap(), W = new WeakMap(), Ma = new WeakMap(), vt = new WeakMap(), Gi = new WeakMap(), Wi = new WeakMap(), Ji = new WeakMap(), bc = new WeakMap(), rs = new WeakMap(), ur = new WeakMap(), kc = new WeakMap(), Ki = new WeakMap(), zi = new WeakMap(), Tt = new WeakMap(), bt = new WeakMap(), Kr = new WeakSet(), yn = function() {
  return this.context.getValue("connectionHandler");
}, Sl = new WeakSet(), CS = function(s, t, e, r) {
  return u(this, null, function* () {
    f(this, Rc, s);
    try {
      return n(this, rs) ? yield n(this, rs) : yield x(this, Ic, rh).call(this, s, t, e, r), x(this, Tl, RS).call(this, t), { roomJoined: yield x(this, vl, wS).call(this) };
    } catch (i) {
      return this.logger.error("Failed to complete room join", { error: i }), { roomJoined: !1 };
    } finally {
      f(this, rs, null);
    }
  });
}, vl = new WeakSet(), wS = function() {
  return u(this, null, function* () {
    try {
      this.mediaJoined = !0;
      const { roomState: s } = yield n(this, W).socketHandler.notifySelfJoinComplete();
      return f(this, wc, s.roomUuid), f(this, Wi, !0), f(this, Gi, !1), !0;
    } catch (s) {
      return this.logger.error("Error completing room join", { error: s }), this.mediaJoined = !1, !1;
    }
  });
}, Tl = new WeakSet(), RS = function(s) {
  navigator.product !== "ReactNative" && setTimeout(() => {
    try {
      const e = {
        userId: this.context.getValue("userId"),
        peerId: this.peerId,
        roomUUID: s,
        roomViewType: "groupCall",
        deviceInfo: H(D({}, ye.getDeviceInfo()), {
          userAgent: navigator.userAgent,
          memory: navigator.deviceMemory,
          cpus: navigator.hardwareConcurrency
        }),
        sdkName: this.context.getValue("sdkName"),
        sdkVersion: this.context.getValue("sdkVersion"),
        metaData: {},
        permissions: {}
      };
      this.context.getValue("callstats").roomJoined(e);
    } catch (t) {
      this.logger.error("Error reporting room joined analytics", { error: t });
    }
  }, 0);
}, Ic = new WeakSet(), rh = function(s, t, e, r) {
  return u(this, null, function* () {
    var i, a;
    try {
      (a = n(this, kc)) != null || f(this, kc, x(i = PS, yl, bS).call(i));
      const o = x(this, El, kS).call(this);
      yield x(this, _l, IS).call(this, s, t, e, o), yield n(this, W).setupTransports({ send: !0, recv: !0 }), yield x(this, Pl, AS).call(this, r);
    } catch (o) {
      throw this.logger.error("Failed to initialize connection", { error: o }), o;
    }
  });
}, yl = new WeakSet(), bS = function() {
  const { ipInfo: s } = dt();
  if (!(s != null && s.loc))
    return;
  const [t, e] = s.loc.split(",").map(parseFloat);
  return { latitude: t, longitude: e };
}, El = new WeakSet(), kS = function() {
  var e;
  const s = (e = this.context.getValue("flagsmith").getValue(ee.FORCE_VIDEO_CODEC)) == null ? void 0 : e.toString(), t = HD(s);
  return f(this, Ma, t), t;
}, _l = new WeakSet(), IS = function(s, t, e, r) {
  return u(this, null, function* () {
    yield sS(
      (i, a) => u(this, null, function* () {
        if (!n(this, ct).isConnected) {
          a(new Error("Socket is not connected"));
          return;
        }
        i > 0 && this.logger.warn("Retry: send joinRoom message", {
          debuggingHint: `Retry attempt ${i}`
        });
        try {
          yield n(this, W).socketHandler.joinRoom(
            t,
            s,
            r,
            e,
            n(this, kc)
          );
        } catch (o) {
          throw this.logger.error("Failed to send joinRoom message after retries", { error: o }), o;
        }
      }),
      {
        delayTime: 1e3,
        strategy: "exponential",
        maxRetryCount: 1 / 0
      }
    );
  });
}, Pl = new WeakSet(), AS = function(s) {
  return u(this, null, function* () {
    if (!(!this.context.getValue("flagsmith").hasFeature(
      ee.PRECREATE_PRODUCERS
    ) || !s))
      try {
        const e = [];
        if (s.canProduceVideo === j.Allowed && e.push(this.shareWebcam(nO(!1))), s.canProduceAudio === j.Allowed) {
          const r = iO(!1);
          r && e.push(this.shareMic(r));
        }
        e.length > 0 && (yield Promise.all(e));
      } catch (e) {
        this.logger.warn("Failed to precreate producers", { error: e });
      }
  });
}, Ze = new WeakSet(), pt = function(s) {
  return n(this, Tt).get(s);
}, Yi = new WeakSet(), So = function(s, t) {
  return n(this, Tt).set(s, t);
}, Cl = new WeakSet(), MS = function(s) {
  return n(this, Tt).delete(s);
}, wl = new WeakSet(), DS = function(s) {
  return {
    track: s,
    encodings: [
      {
        priority: "high"
      }
    ],
    codecOptions: [
      {
        name: "opus"
      }
    ],
    appData: {
      e2ee: this.e2ee
    },
    stopTracks: !1,
    zeroRtpOnPause: !1
  };
}, Rl = new WeakSet(), OS = function(s, t) {
  return {
    track: s,
    codecOptions: t ? t.map((e) => ({
      name: e.split("/")[1]
    })) : [{ name: "VP8" }],
    appData: {
      screenShare: !1,
      e2ee: this.e2ee
    },
    stopTracks: !1
  };
}, m(mu, yl), mu);
let ae = PS;
de([
  E.trace("MediaNodeClient.reset", { country: E.location.country })
], ae.prototype, "reset", 1);
de([
  E.trace("MediaNodeClient.joinRoom")
], ae.prototype, "joinRoom", 1);
de([
  E.trace("MediaNodeClient.leaveRoom")
], ae.prototype, "leaveRoom", 1);
de([
  E.trace("MediaNodeClient.activatePeers")
], ae.prototype, "activatePeers", 1);
de([
  E.trace("MediaNodeClient.createConsumers")
], ae.prototype, "createConsumers", 1);
de([
  E.trace("MediaNodeClient.closeConsumers")
], ae.prototype, "closeConsumers", 1);
de([
  E.trace("MediaNodeClient._shareWebcam")
], ae.prototype, "_shareWebcam", 1);
de([
  E.trace("MediaNodeClient.shareWebcam")
], ae.prototype, "shareWebcam", 1);
de([
  E.trace("MediaNodeClient.shareScreen")
], ae.prototype, "shareScreen", 1);
de([
  E.trace("MediaNodeClient.shareMic")
], ae.prototype, "shareMic", 1);
de([
  E.trace("MediaNodeClient.pauseMic")
], ae.prototype, "pauseMic", 1);
de([
  E.trace("MediaNodeClient.pauseWebcam")
], ae.prototype, "pauseWebcam", 1);
de([
  E.trace("MediaNodeClient.resumeMic")
], ae.prototype, "resumeMic", 1);
de([
  E.trace("MediaNodeClient.resumeWebcam")
], ae.prototype, "resumeWebcam", 1);
de([
  E.trace("MediaNodeClient.disableWebcam")
], ae.prototype, "disableWebcam", 1);
de([
  E.trace("MediaNodeClient.disableMic")
], ae.prototype, "disableMic", 1);
de([
  E.trace("MediaNodeClient.disableScreenShare")
], ae.prototype, "disableScreenShare", 1);
de([
  E.trace("MediaNodeClient.muteSelf")
], ae.prototype, "muteSelf", 1);
de([
  E.trace("MediaNodeClient.resetVideoProducers")
], ae.prototype, "resetVideoProducers", 1);
de([
  E.trace("MediaNodeClient.changeDisplayName")
], ae.prototype, "changeDisplayName", 1);
de([
  E.trace("MediaNodeClient.kickPeer")
], ae.prototype, "kick", 1);
de([
  E.trace("MediaNodeClient.kickAllPeers")
], ae.prototype, "kickAll", 1);
de([
  E.trace("MediaNodeClient.muteAll")
], ae.prototype, "muteAll", 1);
de([
  E.trace("MediaNodeClient.muteAllVideo")
], ae.prototype, "muteAllVideo", 1);
de([
  E.trace("MediaNodeClient.disableAudio")
], ae.prototype, "disableAudio", 1);
de([
  E.trace("MediaNodeClient.disableVideo")
], ae.prototype, "disableVideo", 1);
de([
  E.trace("MediaNodeClient.pinPeer")
], ae.prototype, "pinPeer", 1);
de([
  E.trace("MediaNodeClient.validateScreenShare")
], ae.prototype, "validateScreenShare", 1);
function NS(s, t) {
  const e = s.getValue("roomNodeClient");
  if (e) {
    if (e)
      return e;
    throw new Error("Room node client already set up.");
  }
  const r = new ae(s, t);
  return s.setValue("roomNodeClient", r), r;
}
function VS(s) {
  const t = s.getValue("roomNodeClient");
  try {
    t == null || t.leaveRoom();
  } catch (e) {
    s.getValue("logger").error("roomNodeClient::cleanupRoomNodeClient");
  }
  s.setValue("roomNodeClient", void 0);
}
var cO = Object.defineProperty, dO = Object.getOwnPropertyDescriptor, mn = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? dO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && cO(t, e, i), i;
}, Qi, Es, te, yt, Vt, Gg;
const LS = (Gg = class {
  /**
   * Use await SelfController.init(roomNodeClient) instead
   */
  constructor(s, t, e, r) {
    // eslint-disable-next-line class-methods-use-this
    m(this, yt);
    h(this, "self");
    h(this, "authToken");
    m(this, Qi, void 0);
    h(this, "viewType");
    m(this, Es, void 0);
    m(this, te, void 0);
    const { socket: i } = e, a = s.getValue("authToken");
    this.self = t, f(this, te, s), this.viewType = r, this.authToken = a, f(this, Qi, i), f(this, Es, e), t.config.viewType !== At.Chat && this.setupEvents();
  }
  get peerId() {
    return n(this, te).getValue("peerId");
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, te).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, te).getValue("logger");
  }
  get mediaJoined() {
    return n(this, te).getValue("connectionHandler").mediaJoined;
  }
  static init(s, t, e, r, i) {
    return u(this, null, function* () {
      const a = dt(), o = s.getValue("peerId"), c = !!s.getValue("cachedUserDetails"), d = yield Ye.__init__(
        s,
        e,
        r,
        i,
        i.name,
        c
      );
      s.setValue("self", d);
      const l = s.getValue("logger");
      if (navigator.product !== "ReactNative") {
        const p = !s.getValue("flagsmith").hasFeature(ee.PRECALL_BANDWIDTH_TEST);
        setTimeout(() => u(this, null, function* () {
          const g = yield d.getAllDevices();
          l.info("populated_full_device_list", {
            devices: JSON.stringify(g)
          }), s.getValue("callstats").devices("AUDIO", g == null ? void 0 : g.filter((S) => S.kind === "audioinput")), s.getValue("callstats").devices("VIDEO", g == null ? void 0 : g.filter((S) => S.kind === "videoinput")), s.getValue("callstats").devices("SPEAKER", g == null ? void 0 : g.filter((S) => S.kind === "audiooutput")), l.info("Callstats:: initializing");
          try {
            yield s.getValue("callstats").initialize({
              peerId: o,
              engineName: ye.getDeviceInfo().engineName,
              env: s.getValue("env"),
              iceServers: yield a.getICEServers(),
              apiBase: s.getValue("apiBase"),
              flags: s.getValue("flagsmith").getAllFlags(),
              logger: l,
              apiHostnames: hf(s),
              skipConnectivityChecks: p
            }), l.info("Callstats:: initialized");
          } catch (S) {
            l.error("Callstats:: initialization failed", { error: S });
          }
        }), 0);
      } else
        l.info("Callstats:: Skipped initialization due to navigator product being ReactNative.");
      return new LS(s, d, t, i.viewType);
    });
  }
  shareMediaTracks() {
    return u(this, null, function* () {
      var c;
      const {
        audioTrack: s,
        videoTrack: t,
        permissions: e,
        audioEnabled: r,
        videoEnabled: i,
        screenShareEnabled: a,
        screenShareTracks: o
      } = this.self;
      if (e.canProduceAudio === j.Allowed && r)
        try {
          yield n(this, yt, Vt).shareMic(s), this.self.audioEnabled || n(this, yt, Vt).pauseMic();
        } catch (d) {
          this.self.disableAudio();
        }
      if (e.canProduceVideo === j.Allowed && i)
        try {
          const d = yield n(this, yt, Vt).shareWebcam(t);
          d && d.id !== t.id && n(this, te).getValue("flagsmith").hasFeature(ee.EXP_RESHARE) && (yield n(this, yt, Vt).shareWebcam(d)), this.self.videoEnabled || n(this, yt, Vt).pauseWebcam();
        } catch (d) {
          this.self.disableVideo();
        }
      if (e.canProduceScreenshare === j.Allowed && a)
        try {
          yield (c = n(this, yt, Vt)) == null ? void 0 : c.shareScreen({
            video: o.video,
            audio: o.audio
          });
        } catch (d) {
          this.self.disableScreenShare();
        }
    });
  }
  kickHandler(s) {
    return u(this, null, function* () {
      let t = "kicked";
      (s == null ? void 0 : s.kickType) === "kickAll" && (t = "ended"), this.leaveRoom(t);
    });
  }
  /**
   * Waitlist handlers
   */
  waitlistedHandler() {
    this.logger.info("SelController.waitlisted"), this.self.waitlistStatus = "waiting", this.self.roomState = "waitlisted", this.self.emit("waitlisted");
  }
  waitlistAcceptHandler() {
    if (this.logger.info("SelController.waitlistAccepted"), this.self.waitlistStatus === "accepted") {
      this.logger.warn("SelfController.WAITLIST_ACCEPTED.UserAlreadyAccepted");
      return;
    }
    this.self.waitlistStatus = "accepted", this.joinRoom();
  }
  waitlistRejectedHandler() {
    if (this.logger.info("SelfController.waitlistRejected"), this.self.waitlistStatus === "rejected") {
      this.logger.warn("SelfController.WAITLIST_REJECTED.UserAlreadyRejected");
      return;
    }
    this.self.waitlistStatus = "rejected", this.leaveRoom("rejected");
  }
  resetSelf(s) {
    return u(this, null, function* () {
      n(this, te).getValue("callstats").callEnded(), n(this, yt, Vt).reset(), s && (yield this.joinRoom(s));
    });
  }
  setupEvents() {
    n(this, te).getValue("peerSessionStore").on(k.RESET_PRODUCER_STATE, () => u(this, null, function* () {
      this.mediaJoined && this.shareMediaTracks();
    })), n(this, te).getValue("peerSessionStore").on(k.ROOM_NODE_RECONNECTED, () => {
      this.self.roomState = "joined", this.self.emit("roomJoined", { reconnected: !0 });
    }), n(this, te).getValue("peerSessionStore").on(k.ROOM_NODE_DISCONNECTED, () => {
      this.self.roomState !== "disconnected" && (this.self.roomState = "disconnected", this.self.emit("roomLeft", { state: "disconnected" }));
    }), n(this, te).getValue("peerSessionStore").on(k.ROOM_NODE_FAILED, () => {
      this.self.roomState = "failed", this.self.emit("roomLeft", { state: "failed" });
    }), n(this, te).getValue("peerSessionStore").on(k.SOCKET_SERVICE_RECONNECTED, ({ wasJoinAttempted: s }) => {
      s === !1 && (this.self.roomState = "init"), this.resetSelf(s);
    }), n(this, te).getValue("peerSessionStore").on(k.SOCKET_SERVICE_DISCONNECTED, ({ joinAttempted: s }) => {
      if (this.self.roomState === "disconnected")
        return;
      let { peerId: t } = this;
      s && n(this, te).getValue("flagsmith").hasFeature(ee.REFRESH_ID_ON_DISCONNECTION) && (t = nn()), n(this, Qi).updateURL(t), n(this, te).getValue("telemetry").resetPeerId(t), dt().setHeader("tracing-id", t), mr.remapContext(t, n(this, te)), this.self.roomState = "disconnected", this.self.emit("roomLeft", { state: "disconnected" });
    }), n(this, te).getValue("peerSessionStore").on(k.SOCKET_SERVICE_FAILED, () => {
      this.self.roomState = "failed", this.self.emit("roomLeft", { state: "failed" });
    }), n(this, Es).on(U.waitingRoomRequestAccepted, () => {
      this.waitlistAcceptHandler();
    }), n(this, Es).on(ld.updateUserPreset, (s) => {
      s.updatePeersPresets.forEach((t) => {
        t.userIds === this.self.userId && n(this, te).getValue("peerSessionStore").emit(k.UPDATE_PERMISSIONS, t.patch);
      });
    }), n(this, Es).on(U.waitingRoomRequestDenied, () => {
      this.waitlistRejectedHandler();
    }), n(this, Es).on(U.kick, () => {
      this.kickHandler({ kickType: "kick" });
    }), n(this, Es).on(U.kickAll, () => {
      this.kickHandler({ kickType: "kickAll" });
    }), n(this, te).getValue("peerSessionStore").onAsync(k.JOIN_MEDIA_ROOM, this.joinMediaRoom.bind(this)), n(this, te).getValue("peerSessionStore").on(
      k.PRODUCER_SCORE_UPDATE,
      ({
        score: s,
        kind: t,
        appData: e,
        scoreStats: r
      }) => {
        var a;
        const i = (a = e == null ? void 0 : e.screenShare) != null ? a : !1;
        this.self.emit("mediaScoreUpdate", {
          kind: t,
          isScreenshare: i,
          score: s,
          participantId: this.self.id,
          scoreStats: r
        });
      }
    ), n(this, te).getValue("peerSessionStore").on(k.MUTE_SELF, () => u(this, null, function* () {
      this.self.audioEnabled && (yield this.self.disableAudio(), n(this, te).getValue("callstats").audioOff());
    })), n(this, te).getValue("peerSessionStore").on(k.MUTE_SELF_VIDEO, () => u(this, null, function* () {
      this.self.videoEnabled && (yield this.self.disableVideo(), n(this, te).getValue("callstats").videoOff());
    })), n(this, te).getValue("peerSessionStore").onAsync(
      k.LEAVE_MEDIA_ROOM,
      this.leaveMediaRoom.bind(this)
    ), n(this, te).getValue("peerSessionStore").on(
      k.PIP_HANGUP,
      this.leaveRoom.bind(this)
    );
  }
  joinRoom(s = !1) {
    return u(this, null, function* () {
      try {
        const { peer: t } = yield n(this, Es).joinRoom(
          this.self
        );
        n(this, Es).socket.flush();
        const e = Nh(t.stageType);
        if (n(this, te).setValue("stageStatus", e, !1), t.waitlisted) {
          this.waitlistedHandler();
          return;
        }
        yield this.joinMediaRoom(s), n(this, te).notify("stageStatus");
      } catch (t) {
        throw this.logger.error("Error in joinRoom", { error: t }), t;
      }
    });
  }
  leaveRoom(s = "left") {
    return u(this, null, function* () {
      var t, e;
      if (this.logger.info(`Leaving room with state: ${s}`), (t = n(this, te).getValue("roomSocketHandler")) == null || t.cleanup(), s === "rejected") {
        this.self.roomState = s, this.self.emit("roomLeft", { state: s });
        return;
      }
      this.self.setIsPinned(!1), n(this, te).setValue("stageStatus", "OFF_STAGE", !1), yield this.leaveMediaRoom(s), n(this, te).notify("stageStatus");
      try {
        (e = n(this, Qi)) == null || e.disconnect();
      } catch (r) {
        this.logger.error("SelfController::leaveRoom::socketDisconnect");
      }
      VS(n(this, te)), this.self.roomState = s, this.self.emit("roomLeft", { state: s }), this.logger.info(`roomLeft event emitted with state: ${s}`);
    });
  }
  joinMediaRoom(s = !1) {
    return u(this, null, function* () {
      var a, o;
      const {
        peerId: t,
        viewType: e,
        meetingId: r,
        stageStatus: i
      } = n(this, te).getAllValues();
      try {
        if (e === At.Livestream) {
          if (i !== "ON_STAGE") {
            this.self.roomState = "joined", this.self.emit("roomJoined", { reconnected: s });
            return;
          }
          NS(n(this, te), {
            socket: n(this, Qi),
            peerId: t
          });
        }
        const { canProduceAudio: c, canProduceVideo: d, canProduceScreenshare: l } = this.self.permissions, { roomJoined: p } = (o = yield (a = n(this, yt, Vt)) == null ? void 0 : a.joinRoom(
          this.self.name,
          r,
          s,
          s,
          {
            canProduceAudio: c,
            canProduceVideo: d,
            canProduceScreenshare: l
          }
        )) != null ? o : {};
        if (!p)
          return;
        i === "ON_STAGE" && (yield this.shareMediaTracks()), this.self.roomState = "joined", this.self.emit("roomJoined", { reconnected: s });
      } catch (c) {
        throw this.logger.error("Error:SelfController.mediaRoomJoin", { error: c }), new b("Error: could not join media room", "0002");
      }
    });
  }
  leaveMediaRoom(s) {
    return u(this, null, function* () {
      const t = n(this, te).getValue("viewType");
      s !== "connected-meeting" && (yield this.cleanupSelf()), !(s === "stageLeft" && t === At.Webinar) && n(this, yt, Vt) && (n(this, yt, Vt).mediaJoined && s !== "disconnected" && (yield n(this, yt, Vt).leaveRoom()), !(s === "stageLeft" && t === At.Livestream) && (n(this, yt, Vt).mediaJoined = !1));
    });
  }
  cleanupSelf() {
    return u(this, null, function* () {
      yield this.self.disableAudio(), yield this.self.disableVideo(), yield this.self.disableScreenShare(), this.self.cleanUpTracks(), this.self.destructMediaHandler(), navigator.isReactNative || this.self.removeDocumentEventListeners();
    });
  }
}, Qi = new WeakMap(), Es = new WeakMap(), te = new WeakMap(), yt = new WeakSet(), Vt = function() {
  return n(this, te).getValue("roomNodeClient");
}, Gg);
let ri = LS;
mn([
  E.trace("SelfController.resetSelf")
], ri.prototype, "resetSelf", 1);
mn([
  E.trace("SelfController.setupEvents")
], ri.prototype, "setupEvents", 1);
mn([
  E.trace("SelfController.joinRoom")
], ri.prototype, "joinRoom", 1);
mn([
  E.trace("SelfController.leaveRoom")
], ri.prototype, "leaveRoom", 1);
mn([
  E.trace("SelfController.joinMediaRoom")
], ri.prototype, "joinMediaRoom", 1);
mn([
  E.trace("SelfController.leaveMediaRoom")
], ri.prototype, "leaveMediaRoom", 1);
mn([
  E.trace("SelfController.init")
], ri, "init", 1);
var Ac;
class lO {
  constructor(t) {
    m(this, Ac, void 0);
    f(this, Ac, t);
  }
  on(t, e) {
    let r;
    t === U.roomPeerCount ? r = Qp.fromBinary.bind(Qp) : r = cg.fromBinary.bind(cg), n(this, Ac).on(t, ({ payload: i }) => {
      if (t === U.roomPeerCount && !i)
        return;
      const a = r(i);
      e(a);
    });
  }
}
Ac = new WeakMap();
var Mc, Dc;
class uO {
  constructor(t, e) {
    m(this, Mc, void 0);
    m(this, Dc, void 0);
    f(this, Mc, e), f(this, Dc, t);
  }
  /**
   * @private access
   * Not for external use
   */
  get logger() {
    return n(this, Dc).getValue("logger");
  }
  on(t, e) {
    let r, i;
    switch (t) {
      case U.transcript: {
        r = nu.fromBinary.bind(
          nu
        ), i = nu.create();
        break;
      }
      default: {
        this.logger.debug("AISocketHandler switch case hit default, event not accounted for.");
        break;
      }
    }
    n(this, Mc).on(t, ({ payload: a }) => {
      let o = i;
      try {
        o = r(a);
      } catch (c) {
        this.logger.error("chatSocketHandler::on::binary_decode_error", {
          error: c
        });
      }
      return e(o);
    });
  }
}
Mc = new WeakMap(), Dc = new WeakMap();
var hO = Object.defineProperty, pO = Object.getOwnPropertyDescriptor, Wh = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? pO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && hO(t, e, i), i;
}, hr, Da;
class Wl {
  constructor(t, e) {
    m(this, hr, void 0);
    m(this, Da, void 0);
    f(this, hr, e), f(this, Da, t);
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Da).getValue("logger");
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Da).getValue("telemetry");
  }
  getPolls() {
    return n(this, hr).sendMessagePromise(Ws.getPolls);
  }
  createPoll(t, e, r = !1, i = !1) {
    const a = {
      anonymous: r,
      hideVotes: i,
      question: t,
      options: e
    };
    return n(this, hr).sendMessage(
      Ws.createPoll,
      fM.toBinary(a)
    );
  }
  votePoll(t, e) {
    const r = {
      index: e,
      pollId: t
    };
    return n(this, hr).sendMessage(
      Ws.votePoll,
      vM.toBinary(r)
    );
  }
  on(t, e) {
    let r, i;
    switch (t) {
      case Ws.updatePoll:
      case Ws.createPoll:
      case Ws.votePoll: {
        r = uu.fromBinary.bind(uu), i = uu.create();
        break;
      }
    }
    n(this, hr).on(t, ({ payload: a }) => {
      let o = i;
      try {
        o = r(a);
      } catch (c) {
        this.logger.error("pollSocketHandler::on::binary_decode_error", {
          error: c
        });
      }
      return e(o);
    });
  }
  removeListeners(t) {
    n(this, hr).removeListeners(t);
  }
}
hr = new WeakMap(), Da = new WeakMap();
Wh([
  E.trace("PollSocketHandler.getPolls")
], Wl.prototype, "getPolls", 1);
Wh([
  E.trace("PollSocketHandler.createPoll")
], Wl.prototype, "createPoll", 1);
Wh([
  E.trace("PollSocketHandler.votePoll")
], Wl.prototype, "votePoll", 1);
var gO = Object.defineProperty, mO = Object.getOwnPropertyDescriptor, fO = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? mO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && gO(t, e, i), i;
}, Ft;
class xS {
  constructor(t, e) {
    h(this, "socket");
    m(this, Ft, void 0);
    f(this, Ft, t), this.socket = e, this.handleSocketEvents(), n(this, Ft).setValue("roomSocketHandler", this);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, Ft).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, Ft).getValue("logger");
  }
  cleanup() {
    var t;
    try {
      (t = this.socket) == null || t.disconnect();
    } catch (e) {
      this.logger.error("roomSocketHandler::cleanup");
    }
  }
  joinRoom(t) {
    return u(this, null, function* () {
      var i;
      this.socket.joinAttempted = !0;
      const e = {
        capabilities: [],
        peer: {
          displayName: (i = t.name) != null ? i : "Participant",
          customParticipantId: t.customParticipantId,
          peerId: t.id,
          userId: t.userId,
          displayPictureUrl: t.picture,
          waitlisted: !1
        },
        roomUuid: ""
      }, r = this.socket.sendMessagePromise(
        U.joinRoom,
        rk.toBinary(e)
      );
      try {
        const { peer: a } = Sn.fromBinary((yield r).payload);
        n(this, Ft).getValue("connectionHandler").socketJoined = !0, n(this, Ft).getValue("peerSessionStore").emit(k.SOCKET_SERVICE_ROOM_JOINED, { peer: a });
        const o = this.getRoomState(), c = this.getRoomPeersNonPaginated(), [{ room: d }, { peers: l }] = yield Promise.all([o, c]);
        return n(this, Ft).getValue("peerSessionStore").emit(k.ROOM_STATE, d), n(this, Ft).getValue("peerSessionStore").emit(k.SOCKET_PEERS, l), { peer: a };
      } catch (a) {
        throw this.logger.error("RoomSocketHandler.joinRoom.failed", {
          error: a
        }), new b(
          "Error: RoomSocketHandler.joinRoom failed.",
          "0002",
          this.logger,
          a
        );
      }
    });
  }
  getAllAddedParticipants() {
    return u(this, null, function* () {
      try {
        return Bk.fromBinary(
          (yield this.socket.sendMessagePromise(U.getAllAddedParticipants)).payload
        ).participants.map(
          (i) => {
            var a = i, { id: e } = a, r = ro(a, ["id"]);
            return H(D({}, r), { userId: e });
          }
        );
      } catch (t) {
        return [];
      }
    });
  }
  getRoomPeers(t, e, r) {
    return u(this, null, function* () {
      let i;
      try {
        const a = {
          // F
          seachQuery: t,
          limit: e,
          offset: r
        }, o = yield this.socket.sendMessagePromise(
          U.getRoomPeersInfo,
          Jb.toBinary(a)
        );
        i = au.fromBinary(o.payload);
      } catch (a) {
        this.logger.error("getRoomPeers::binary_decode_error", { error: a });
      }
      return i;
    });
  }
  getRoomPeersNonPaginated() {
    return u(this, null, function* () {
      let t;
      try {
        const e = yield this.socket.sendMessagePromise(
          U.getRoomPeersInfo
        );
        t = au.fromBinary(e.payload);
      } catch (e) {
        this.logger.error("getRoomJoinedPeers::binary_decode_error", { error: e });
      }
      return t;
    });
  }
  /**
   *  TODO:(ishita1805): uncomment this code when
   * socket service sends entire peer objects for roomEvents.getStagePeers
   */
  getStagePeers() {
    return u(this, null, function* () {
      let t;
      try {
        const e = yield this.socket.sendMessagePromise(
          U.getRoomPeersInfo
        );
        t = au.fromBinary(e.payload);
      } catch (e) {
        this.logger.error("getRoomJoinedPeers::binary_decode_error", { error: e });
      }
      return t;
    });
  }
  getPeerInfo(t) {
    return u(this, null, function* () {
      let e;
      try {
        const r = yield this.socket.sendMessagePromise(
          U.getPeerInfo,
          _f.toBinary({ peerId: t })
        );
        e = Sn.fromBinary(r.payload);
      } catch (r) {
        this.logger.error("getPeerInfo::binary_decode_error", { error: r });
      }
      return e;
    });
  }
  getRoomState() {
    return u(this, null, function* () {
      let t = Xp.create();
      try {
        const e = yield this.socket.sendMessagePromise(U.getRoomInfo);
        t = Xp.fromBinary(e.payload);
      } catch (e) {
        this.logger.error("getRoomState::binary_decode_error", { error: e });
      }
      return t;
    });
  }
  getRoomStageState() {
    return u(this, null, function* () {
      let t = sg.create();
      try {
        const e = yield this.socket.sendMessagePromise(U.getRoomStageState);
        t = sg.fromBinary(e.payload);
      } catch (e) {
        this.logger.error("getRoomStageState::binary_decode_error", { error: e });
      }
      return t;
    });
  }
  broadcastMessage(t, e) {
    return u(this, null, function* () {
      const r = {
        type: t,
        payload: new TextEncoder().encode(JSON.stringify(e)),
        timestamp: Date.now(),
        ids: []
        // broadcast to all in all cases, this field has no value
      };
      return this.socket.sendMessagePromise(
        U.broadcastMessage,
        oo.toBinary(r)
      );
    });
  }
  broadcastToMeetings(t, e, r) {
    return u(this, null, function* () {
      const i = {
        type: t,
        payload: new TextEncoder().encode(JSON.stringify(r)),
        timestamp: Date.now(),
        ids: e,
        // Broadcast to given meetings
        broadcastType: 1
        // meetings
      };
      return this.socket.sendMessagePromise(
        U.broadcastToEntity,
        oo.toBinary(i)
      );
    });
  }
  broadcastToPeers(t, e, r) {
    return u(this, null, function* () {
      const i = {
        type: t,
        payload: new TextEncoder().encode(JSON.stringify(r)),
        timestamp: Date.now(),
        ids: e,
        // Broadcast to peers
        broadcastType: 0
        // peers
      };
      return this.socket.sendMessage(
        U.broadcastToEntity,
        oo.toBinary(i)
      );
    });
  }
  leaveRoom() {
    return u(this, null, function* () {
      this.socket.joinAttempted = !1, this.socket.sendMessagePromise(
        U.leaveRoom,
        nk.toBinary({})
      );
    });
  }
  kick(t) {
    return u(this, null, function* () {
      const e = {
        peerIds: [t]
      };
      this.socket.sendMessage(
        U.kick,
        Cf.toBinary(e)
      );
    });
  }
  kickAll(t = !1) {
    return u(this, null, function* () {
      const e = {
        propagateKickAcrossRooms: t
      };
      this.socket.sendMessage(
        U.kickAll,
        Tf.toBinary(e)
      );
    });
  }
  getWaitingRoomRequests() {
    this.socket.sendMessage(U.getWaitingRoomRequests);
  }
  acceptWaitingRoomRequest(t) {
    const e = {
      userIds: t
    };
    this.socket.sendMessage(
      U.acceptWaitingRoomRequests,
      Jk.toBinary(e)
    );
  }
  rejectWaitingRoomRequest(t) {
    const e = {
      userIds: t
    };
    this.socket.sendMessage(
      U.denyWaitingRoomRequests,
      zk.toBinary(e)
    );
  }
  updatePermissions(t, e) {
    return u(this, null, function* () {
      const r = {
        updatePeersPresets: []
      };
      return t.forEach((i) => {
        r.updatePeersPresets.push({
          userIds: i,
          patch: e
        });
      }), this.socket.sendMessagePromise(
        ld.updateUserPreset,
        CI.toBinary(r)
      );
    });
  }
  handleSocketEvents() {
    this.socket.on(U.broadcastMessage, ({ payload: t }) => {
      try {
        const e = oo.fromBinary(t);
        n(this, Ft).getValue("peerSessionStore").emit(k.ROOM_MESSAGE, {
          payload: JSON.parse(new TextDecoder().decode(e.payload)),
          type: e.type,
          timestamp: e.timestamp
        });
      } catch (e) {
        this.logger.error("failed to decode broadcast message:", e);
      }
    }), this.socket.on(U.broadcastToEntity, ({ payload: t }) => {
      try {
        const e = oo.fromBinary(t);
        n(this, Ft).getValue("peerSessionStore").emit(k.MESSAGE, {
          payload: JSON.parse(new TextDecoder().decode(e.payload)),
          type: e.type,
          timestamp: e.timestamp
        });
      } catch (e) {
        this.logger.error("failed to decode peer broadcast message:", e);
      }
    });
  }
  on(t, e) {
    let r, i;
    switch (t) {
      case U.joinRoom:
      case U.leaveRoom:
      case U.kick:
      case U.kickAll: {
        r = Sn.fromBinary.bind(Sn), i = Sn.create();
        break;
      }
      case U.getWaitingRoomRequests: {
        r = (a, o) => a ? tg.fromBinary(a, o) : { requests: [] }, i = tg.create();
        break;
      }
      case U.recordingPaused:
      case U.recordingStarted:
      case U.recordingStopped: {
        r = ug.fromBinary.bind(ug);
        break;
      }
      case ld.updateUserPreset: {
        r = rg.fromBinary.bind(rg);
        break;
      }
      case Cs.peerJoinedBroadcast:
      case Ar.peerJoinedBroadcast: {
        r = Wp.fromBinary.bind(Wp);
        break;
      }
      case Cs.selfJoinComplete:
      case Ar.selfJoinComplete: {
        r = Ru.fromBinary.bind(Ru);
        break;
      }
      case Cs.globalPeerPinBroadcast:
      case Ar.globalPeerPinBroadcast: {
        r = zp.fromBinary.bind(zp);
        break;
      }
      case Cs.selectedPeer:
      case Ar.selectedPeer: {
        r = wu.fromBinary.bind(wu);
        break;
      }
      case Cs.selectedPeerDiff:
      case Ar.selectedPeerDiff: {
        r = Gp.fromBinary.bind(Gp);
        break;
      }
      case Cs.leaveRoom:
      case Ar.leaveRoom: {
        r = bu.fromBinary.bind(bu);
        break;
      }
    }
    this.socket.on(t, ({ payload: a }) => {
      let o = i;
      if (!r)
        return e(void 0);
      try {
        o = r(a);
      } catch (c) {
        this.logger.error("roomSocketHandler::on::binary_decode_error", {
          error: c
        });
      }
      return e(o);
    });
  }
  getUserPermissions(t) {
    return u(this, null, function* () {
      const e = {
        userIds: [t]
      };
      try {
        const r = yield this.socket.sendMessagePromise(
          ld.getUserPresets,
          SI.toBinary(e)
        ), i = EI.fromBinary(r.payload).peerPresets[0], a = new TextDecoder().decode(i.preset), o = JSON.parse(a).permissions;
        return { chat: o.chat, polls: o.polls, plugins: o.plugins };
      } catch (r) {
        throw this.logger.error("Error in getting user preset", { error: r }), r;
      }
    });
  }
}
Ft = new WeakMap();
fO([
  E.trace("RoomSocketHandler.joinRoom")
], xS.prototype, "joinRoom", 1);
var kt;
class SO {
  constructor(t) {
    m(this, kt, void 0);
    f(this, kt, t);
  }
  getStageRequests() {
    return u(this, null, function* () {
      const { payload: t } = yield n(this, kt).sendMessagePromise(
        U.getStageRequests
      );
      return t ? lu.fromBinary(t) : { stageRequests: [] };
    });
  }
  requestAccess() {
    n(this, kt).sendMessage(U.requestStageAccess);
  }
  cancelRequestAccess() {
    n(this, kt).sendMessage(U.cancelStageRequest);
  }
  grantAccess(t) {
    return u(this, null, function* () {
      const e = {
        userIds: t
      };
      n(this, kt).sendMessage(
        U.grantStageAccess,
        aM.toBinary(e)
      );
    });
  }
  denyAccess(t) {
    return u(this, null, function* () {
      const e = {
        userIds: t
      };
      n(this, kt).sendMessage(
        U.denyStageAccess,
        cM.toBinary(e)
      );
    });
  }
  joinStage() {
    return n(this, kt).sendMessagePromise(
      U.joinStage,
      void 0,
      void 0,
      U.peerStageStatusUpdate
    );
  }
  leaveStage(t) {
    const e = {
      userIds: [t]
    };
    return n(this, kt).sendMessagePromise(
      U.leaveStage,
      lg.toBinary(e),
      void 0,
      U.peerStageStatusUpdate
    );
  }
  kick(t) {
    const e = {
      userIds: t
    };
    return n(this, kt).sendMessagePromise(
      U.leaveStage,
      lg.toBinary(e)
    );
  }
  on(t, e) {
    let r;
    switch (t) {
      case U.grantStageAccess:
      case U.denyStageAccess: {
        r = void 0;
        break;
      }
      case U.getStagePeers: {
        r = dg.fromBinary.bind(
          dg
        );
        break;
      }
      case U.getStageRequests:
      case U.requestStageAccess:
      case U.cancelStageRequest: {
        r = lu.fromBinary.bind(
          lu
        );
        break;
      }
      case U.peerStageStatusUpdate: {
        r = Yp.fromBinary.bind(Yp);
        break;
      }
    }
    n(this, kt).on(t, ({ payload: i, id: a }) => {
      if (!i || !r)
        return e(void 0, a);
      const o = r(i);
      return e(o, a);
    });
  }
  getPeerInfo(t) {
    return u(this, null, function* () {
      const e = yield n(this, kt).sendMessagePromise(
        U.getPeerInfo,
        _f.toBinary({ peerId: t })
      );
      return Sn.fromBinary(e.payload);
    });
  }
}
kt = new WeakMap();
var je, Oc;
class vO {
  constructor(t, e) {
    m(this, je, void 0);
    m(this, Oc, void 0);
    f(this, je, e), f(this, Oc, t);
  }
  /**
   * @private access
   * Not available for external use
   */
  get logger() {
    return n(this, Oc).getValue("logger");
  }
  addPlugin(t, e) {
    n(this, je).sendMessage(
      J.addPlugin,
      PA.toBinary({ pluginId: t, staggered: e })
    );
  }
  removePlugin(t) {
    n(this, je).sendMessage(
      J.removePlugin,
      wA.toBinary({ pluginId: t, staggered: !1 })
    );
  }
  getActivePlugins() {
    return u(this, null, function* () {
      const { payload: t } = yield n(this, je).sendMessagePromise(
        J.getPlugins
      );
      return t ? KA.fromBinary(t) : { plugins: [] };
    });
  }
  customPluginEventToRoom(t, e, r) {
    const i = {
      pluginId: t,
      pluginData: new TextEncoder().encode(JSON.stringify(e))
    };
    n(this, je).sendMessage(
      J.customPluginEventToRoom,
      VA.toBinary(i),
      r
    );
  }
  customPluginEventToPeers(t, e, r, i) {
    const a = {
      pluginId: t,
      peerIds: e,
      pluginData: new TextEncoder().encode(JSON.stringify(r))
    };
    n(this, je).sendMessage(
      J.customPluginEventToPeers,
      xA.toBinary(a),
      i
    );
  }
  enablePluginForRoom(t, e) {
    n(this, je).sendMessage(
      J.enablePluginForRoom,
      bA.toBinary({ pluginId: t }),
      e
    );
  }
  enablePluginForPeers(t, e, r) {
    n(this, je).sendMessage(
      J.enablePluginForPeers,
      MA.toBinary({ pluginId: t, peerIds: e }),
      r
    );
  }
  disablePluginForRoom(t, e) {
    n(this, je).sendMessage(
      J.disablePluginForRoom,
      IA.toBinary({ pluginId: t }),
      e
    );
  }
  disablePluginForPeers(t, e, r) {
    n(this, je).sendMessage(
      J.disablePluginForPeers,
      OA.toBinary({ pluginId: t, peerIds: e }),
      r
    );
  }
  storeInsertKeys(t, e, r, i) {
    const a = {
      pluginId: t,
      storeName: e,
      insertKeys: r.map((o) => ({
        storeKey: o.key,
        payload: new TextEncoder().encode(JSON.stringify(o.payload))
      }))
    };
    n(this, je).sendMessage(
      J.storeInsertKeys,
      ig.toBinary(a),
      i
    );
  }
  storeGetKeys(t, e, r, i) {
    const a = {
      pluginId: t,
      storeName: e,
      getKeys: r.map((o) => ({ storeKey: o.key }))
    };
    n(this, je).sendMessage(
      J.storeGetKeys,
      BA.toBinary(a),
      i
    );
  }
  storeDeleteKeys(t, e, r, i) {
    const a = {
      pluginId: t,
      storeName: e,
      deleteKeys: r.map((o) => ({ storeKey: o.key }))
    };
    n(this, je).sendMessage(
      J.storeDeleteKeys,
      qA.toBinary(a),
      i
    );
  }
  storeDelete(t, e, r) {
    n(this, je).sendMessage(
      J.storeDelete,
      GA.toBinary({ pluginId: t, storeName: e }),
      r
    );
  }
  /**
   * @deprecated
   */
  // eslint-disable-next-line class-methods-use-this
  getPluginDataOld(t, e) {
    this.logger.info("getPluginDataOld", {
      plugin: { id: t, storeName: e }
    });
  }
  /**
   * @deprecated
   */
  storePluginDataOld(t, e, r) {
    const i = {
      pluginId: t,
      storeName: e,
      insertKeys: [
        {
          storeKey: r.key,
          payload: new TextEncoder().encode(JSON.stringify(r))
        }
      ]
    };
    n(this, je).sendMessage(
      J.storeInsertKeys,
      ig.toBinary(i)
    );
  }
  on(t, e) {
    let r;
    switch (t) {
      case J.addPlugin:
      case J.enablePluginForPeers:
      case J.enablePluginForRoom: {
        r = Mu.fromBinary.bind(Mu);
        break;
      }
      case J.removePlugin:
      case J.disablePluginForPeers:
      case J.disablePluginForRoom: {
        r = ng.fromBinary.bind(
          ng
        );
        break;
      }
      case J.customPluginEventToPeers:
      case J.customPluginEventToRoom: {
        r = og.fromBinary.bind(og);
        break;
      }
      case J.storeInsertKeys:
      case J.storeGetKeys:
      case J.storeDeleteKeys:
      case J.storeDelete: {
        r = ag.fromBinary.bind(ag);
        break;
      }
    }
    n(this, je).on(t, ({ payload: i, id: a }) => {
      const o = r(i);
      return e(o, a);
    });
  }
}
je = new WeakMap(), Oc = new WeakMap();
var TO = Object.defineProperty, yO = (s, t, e) => t in s ? TO(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e, EO = (s, t, e) => (yO(s, typeof t != "symbol" ? t + "" : t, e), e), Jh = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, M = (s, t, e) => (Jh(s, t, "read from private field"), e ? e.call(s) : t.get(s)), Se = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, ne = (s, t, e, r) => (Jh(s, t, "write to private field"), r ? r.call(s, e) : t.set(s, e), e), Pe = (s, t, e) => (Jh(s, t, "access private method"), e), Md = {}, _O = {
  get exports() {
    return Md;
  },
  set exports(s) {
    Md = s;
  }
}, Mn = typeof Reflect == "object" ? Reflect : null, _g = Mn && typeof Mn.apply == "function" ? Mn.apply : function(s, t, e) {
  return Function.prototype.apply.call(s, t, e);
}, Sd;
Mn && typeof Mn.ownKeys == "function" ? Sd = Mn.ownKeys : Object.getOwnPropertySymbols ? Sd = function(s) {
  return Object.getOwnPropertyNames(s).concat(Object.getOwnPropertySymbols(s));
} : Sd = function(s) {
  return Object.getOwnPropertyNames(s);
};
function PO(s) {
  console && console.warn && console.warn(s);
}
var US = Number.isNaN || function(s) {
  return s !== s;
};
function ce() {
  ce.init.call(this);
}
_O.exports = ce;
Md.once = bO;
ce.EventEmitter = ce;
ce.prototype._events = void 0;
ce.prototype._eventsCount = 0;
ce.prototype._maxListeners = void 0;
var Pg = 10;
function Jl(s) {
  if (typeof s != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof s);
}
Object.defineProperty(ce, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Pg;
  },
  set: function(s) {
    if (typeof s != "number" || s < 0 || US(s))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + s + ".");
    Pg = s;
  }
});
ce.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
ce.prototype.setMaxListeners = function(s) {
  if (typeof s != "number" || s < 0 || US(s))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + s + ".");
  return this._maxListeners = s, this;
};
function $S(s) {
  return s._maxListeners === void 0 ? ce.defaultMaxListeners : s._maxListeners;
}
ce.prototype.getMaxListeners = function() {
  return $S(this);
};
ce.prototype.emit = function(s) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t.push(arguments[e]);
  var r = s === "error", i = this._events;
  if (i !== void 0)
    r = r && i.error === void 0;
  else if (!r)
    return !1;
  if (r) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error)
      throw a;
    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw o.context = a, o;
  }
  var c = i[s];
  if (c === void 0)
    return !1;
  if (typeof c == "function")
    _g(c, this, t);
  else
    for (var d = c.length, l = jS(c, d), e = 0; e < d; ++e)
      _g(l[e], this, t);
  return !0;
};
function FS(s, t, e, r) {
  var i, a, o;
  if (Jl(e), a = s._events, a === void 0 ? (a = s._events = /* @__PURE__ */ Object.create(null), s._eventsCount = 0) : (a.newListener !== void 0 && (s.emit(
    "newListener",
    t,
    e.listener ? e.listener : e
  ), a = s._events), o = a[t]), o === void 0)
    o = a[t] = e, ++s._eventsCount;
  else if (typeof o == "function" ? o = a[t] = r ? [e, o] : [o, e] : r ? o.unshift(e) : o.push(e), i = $S(s), i > 0 && o.length > i && !o.warned) {
    o.warned = !0;
    var c = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    c.name = "MaxListenersExceededWarning", c.emitter = s, c.type = t, c.count = o.length, PO(c);
  }
  return s;
}
ce.prototype.addListener = function(s, t) {
  return FS(this, s, t, !1);
};
ce.prototype.on = ce.prototype.addListener;
ce.prototype.prependListener = function(s, t) {
  return FS(this, s, t, !0);
};
function CO() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function BS(s, t, e) {
  var r = { fired: !1, wrapFn: void 0, target: s, type: t, listener: e }, i = CO.bind(r);
  return i.listener = e, r.wrapFn = i, i;
}
ce.prototype.once = function(s, t) {
  return Jl(t), this.on(s, BS(this, s, t)), this;
};
ce.prototype.prependOnceListener = function(s, t) {
  return Jl(t), this.prependListener(s, BS(this, s, t)), this;
};
ce.prototype.removeListener = function(s, t) {
  var e, r, i, a, o;
  if (Jl(t), r = this._events, r === void 0)
    return this;
  if (e = r[s], e === void 0)
    return this;
  if (e === t || e.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete r[s], r.removeListener && this.emit("removeListener", s, e.listener || t));
  else if (typeof e != "function") {
    for (i = -1, a = e.length - 1; a >= 0; a--)
      if (e[a] === t || e[a].listener === t) {
        o = e[a].listener, i = a;
        break;
      }
    if (i < 0)
      return this;
    i === 0 ? e.shift() : wO(e, i), e.length === 1 && (r[s] = e[0]), r.removeListener !== void 0 && this.emit("removeListener", s, o || t);
  }
  return this;
};
ce.prototype.off = ce.prototype.removeListener;
ce.prototype.removeAllListeners = function(s) {
  var t, e, r;
  if (e = this._events, e === void 0)
    return this;
  if (e.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : e[s] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete e[s]), this;
  if (arguments.length === 0) {
    var i = Object.keys(e), a;
    for (r = 0; r < i.length; ++r)
      a = i[r], a !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = e[s], typeof t == "function")
    this.removeListener(s, t);
  else if (t !== void 0)
    for (r = t.length - 1; r >= 0; r--)
      this.removeListener(s, t[r]);
  return this;
};
function HS(s, t, e) {
  var r = s._events;
  if (r === void 0)
    return [];
  var i = r[t];
  return i === void 0 ? [] : typeof i == "function" ? e ? [i.listener || i] : [i] : e ? RO(i) : jS(i, i.length);
}
ce.prototype.listeners = function(s) {
  return HS(this, s, !0);
};
ce.prototype.rawListeners = function(s) {
  return HS(this, s, !1);
};
ce.listenerCount = function(s, t) {
  return typeof s.listenerCount == "function" ? s.listenerCount(t) : qS.call(s, t);
};
ce.prototype.listenerCount = qS;
function qS(s) {
  var t = this._events;
  if (t !== void 0) {
    var e = t[s];
    if (typeof e == "function")
      return 1;
    if (e !== void 0)
      return e.length;
  }
  return 0;
}
ce.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Sd(this._events) : [];
};
function jS(s, t) {
  for (var e = new Array(t), r = 0; r < t; ++r)
    e[r] = s[r];
  return e;
}
function wO(s, t) {
  for (; t + 1 < s.length; t++)
    s[t] = s[t + 1];
  s.pop();
}
function RO(s) {
  for (var t = new Array(s.length), e = 0; e < t.length; ++e)
    t[e] = s[e].listener || s[e];
  return t;
}
function bO(s, t) {
  return new Promise(function(e, r) {
    function i(o) {
      s.removeListener(t, a), r(o);
    }
    function a() {
      typeof s.removeListener == "function" && s.removeListener("error", i), e([].slice.call(arguments));
    }
    GS(s, t, a, { once: !0 }), t !== "error" && kO(s, i, { once: !0 });
  });
}
function kO(s, t, e) {
  typeof s.on == "function" && GS(s, "error", t, e);
}
function GS(s, t, e, r) {
  if (typeof s.on == "function")
    r.once ? s.once(t, e) : s.on(t, e);
  else if (typeof s.addEventListener == "function")
    s.addEventListener(t, function i(a) {
      r.once && s.removeEventListener(t, i), e(a);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof s);
}
class IO extends T {
  constructor() {
    super("message.v1.SocketMessage", [
      {
        no: 1,
        name: "event",
        kind: "scalar",
        T: 13
        /*ScalarType.UINT32*/
      },
      {
        no: 2,
        name: "id",
        kind: "scalar",
        opt: !0,
        T: 9
        /*ScalarType.STRING*/
      },
      {
        no: 3,
        name: "payload",
        kind: "scalar",
        opt: !0,
        T: 12
        /*ScalarType.BYTES*/
      },
      {
        no: 4,
        name: "metadata",
        kind: "scalar",
        opt: !0,
        T: 12
        /*ScalarType.BYTES*/
      }
    ]);
  }
}
const Cg = new IO();
class WS {
  static encode(t) {
    return Cg.toBinary(t);
  }
  static decode(t) {
    return Cg.fromBinary(new Uint8Array(t));
  }
}
function AO(s, t) {
  return Math.floor(Math.random() * (t - s + 1) + s);
}
var kr;
class MO {
  constructor(t = {}) {
    EO(this, "opts"), Se(this, kr, void 0), this.opts = {
      initialTimeout: t.initialTimeout || 1e3,
      maxTimeout: t.maxTimeout || 1e4,
      factor: t.factor || 2
    }, ne(this, kr, 0);
  }
  wait() {
    return u(this, null, function* () {
      ne(this, kr, M(this, kr) + 1);
      const t = AO(0, Math.min(this.opts.maxTimeout, this.opts.initialTimeout * ep(2, M(this, kr))));
      yield new Promise((e) => {
        setTimeout(e, t);
      });
    });
  }
  getAttempts() {
    return M(this, kr);
  }
  reset() {
    ne(this, kr, 0);
  }
}
kr = /* @__PURE__ */ new WeakMap();
const wr = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
var di, li;
class DO {
  constructor(t) {
    Se(this, di, void 0), Se(this, li, void 0), ne(this, di, console), ne(this, li, t);
  }
  debug(...t) {
    wr[M(this, li)] > wr.debug || M(this, di).debug("[Sockrates]:", ...t);
  }
  info(...t) {
    wr[M(this, li)] > wr.info || M(this, di).info("[Sockrates]:", ...t);
  }
  warn(...t) {
    wr[M(this, li)] > wr.warn || M(this, di).warn("[Sockrates]:", ...t);
  }
  error(...t) {
    wr[M(this, li)] > wr.error || M(this, di).error("[Sockrates]:", ...t);
  }
}
di = /* @__PURE__ */ new WeakMap(), li = /* @__PURE__ */ new WeakMap();
var JS = /* @__PURE__ */ ((s) => (s[s.CONNECTING = 0] = "CONNECTING", s[s.OPEN = 1] = "OPEN", s[s.CLOSING = 2] = "CLOSING", s[s.CLOSED = 3] = "CLOSED", s))(JS || {});
const OO = "2", NO = "3";
var Ae, En, _e, Le, Ir, Ke, gr, Xr, Ps, _n, Gs, ih, KS, vo, vd, nh, zS, ah, wg, Dd, oh, ch, YS, _o, Td, Po, Od, Nd, dh, Dn, Co, wo, Vd;
class VO {
  constructor(t, e) {
    var S, v, _, P, C, w, $, F, N, B;
    Se(this, ih), Se(this, vo), Se(this, nh), Se(this, ah), Se(this, Dd), Se(this, ch), Se(this, _o), Se(this, Po), Se(this, Nd), Se(this, Dn), Se(this, wo), Se(this, Ae, void 0), Se(this, En, void 0), Se(this, _e, void 0), Se(this, Le, void 0), Se(this, Ir, void 0), Se(this, Ke, void 0), Se(this, gr, void 0), Se(this, Xr, void 0), Se(this, Ps, void 0), Se(this, _n, void 0), Se(this, Gs, void 0);
    var r, i, a, o, c, d, l, p, g;
    ne(this, En, t), ne(this, Ir, []), ne(this, Ke, new Md()), ne(this, gr, !0), ne(this, Ps, !1), ne(this, _e, e != null ? e : {}), (S = (r = M(this, _e)).autoReconnect) != null || (r.autoReconnect = !0), (v = (i = M(this, _e)).retryConnectionInterval) != null || (i.retryConnectionInterval = 1e3), (_ = (a = M(this, _e)).pingTimeout) != null || (a.pingTimeout = 3e4), (P = (o = M(this, _e)).connectionTimeout) != null || (o.connectionTimeout = 5e3), (C = (c = M(this, _e)).debug) != null || (c.debug = !0), (w = (d = M(this, _e)).maxReconnectionAttempts) != null || (d.maxReconnectionAttempts = 10), ($ = (l = M(this, _e)).disconnectOnPingTimeout) != null || (l.disconnectOnPingTimeout = !0), (F = (p = M(this, _e)).queueOnDisconnect) != null || (p.queueOnDisconnect = !1), (N = (g = M(this, _e)).flushOnReconnect) != null || (g.flushOnReconnect = !1), ne(this, Xr, {
      code: void 0,
      reason: void 0
    }), ne(this, Le, (B = M(this, _e).logger) != null ? B : new DO(M(this, _e).debug ? "debug" : "info")), ne(this, Gs, new MO());
  }
  /**
   * Ready state of the current WebSocket.
   */
  get readyState() {
    var t;
    return (t = M(this, Ae)) == null ? void 0 : t.readyState;
  }
  /**
   * Sockrates connection URL.
   */
  get url() {
    return M(this, En);
  }
  /**
   * Update connection URL.
   */
  updateURL(t) {
    ne(this, En, t), Pe(this, ch, YS).call(this);
  }
  /**
   * Configuration options passed to Sockrates.
   */
  get config() {
    return M(this, _e);
  }
  /**
   * Messages that got queued due to the
   * socket not being connected.
   */
  get sendQueue() {
    return M(this, Ir);
  }
  /**
   * Flushes all messages that were queued
   * due to the socket not being connected.
   */
  flush() {
    if (!M(this, _e).queueOnDisconnect)
      return !1;
    const t = [];
    return M(this, Ir).forEach((e) => {
      this.send(e.event, e.id, e.payload, e.metadata) || t.push(e);
    }), ne(this, Ir, t), M(this, Ir);
  }
  connect(t = !1) {
    return u(this, null, function* () {
      if (!t && [
        0,
        1
        /* OPEN */
      ].includes(this.readyState)) {
        M(this, Le).debug("Websocket was already connecting or connected.");
        return;
      }
      if (M(this, gr) !== !1)
        return new Promise((e, r) => {
          Pe(this, Dn, Co).call(this), Pe(this, wo, Vd).call(this);
          try {
            ne(this, Ae, new WebSocket(Pe(this, ih, KS).call(this, M(this, En)))), M(this, Ae).binaryType = "arraybuffer", M(this, Le).debug("Connecting");
            const i = setTimeout(() => {
              M(this, Le).debug("Connection timeout. Closing socket"), ne(this, gr, !0), Pe(this, wo, Vd).call(this), M(this, Ae).close(3001, "Connection Timeout"), M(this, _e).autoReconnect && !M(this, Ps) && (M(this, Ke).emit(
                "reconnecting"
                /* reconnecting */
              ), Pe(this, _o, Td).call(this)), r(new Error("Connection timed out!"));
            }, M(this, _e).connectionTimeout);
            M(this, Ae).onopen = () => {
              M(this, Le).debug(`Ready State: ${JS[M(this, Ae).readyState]}`), i && clearTimeout(i), Pe(this, Nd, dh).call(this), ne(this, Xr, {
                code: void 0,
                reason: void 0
              }), M(this, Ke).emit(
                "connected"
                /* connected */
              ), M(this, _e).flushOnReconnect && this.flush(), e();
            }, M(this, Ae).onclose = (a) => {
              try {
                i && clearTimeout(i);
                const { code: o, reason: c } = a;
                r(c), M(this, Le).debug("Socket closed. Close event:", { event: a }), M(this, Le).debug(`Connection closed code: ${o}`), M(this, Le).debug(`Connection closed reason: ${c}`), M(this, Ps) || Pe(this, Dd, oh).call(this, o, c);
              } catch (o) {
                Pe(this, vo, vd).call(this, o);
              }
            }, M(this, Ae).onerror = (a) => {
              Pe(this, vo, vd).call(this, a);
            }, M(this, Ae).onmessage = (a) => Pe(this, nh, zS).call(this, a);
          } catch (i) {
            Pe(this, vo, vd).call(this, i, r);
          }
        });
    });
  }
  /**
   * Send a message to the socket server.
   * @returns {boolean} Returns true if the payload was sent successfully.
   */
  send(t, e, r, i) {
    const a = { event: t, id: e, payload: r, metadata: i };
    if (M(this, _e).queueOnDisconnect && (!M(this, Ae) || M(this, Ae).readyState !== 1))
      return M(this, Le).debug("Queuing message since socket is not connected!", a), M(this, Ir).push(a), !1;
    const o = WS.encode(a);
    return Pe(this, Po, Od).call(this, o);
  }
  /**
   * Alias for `send`.
   */
  emit(t, e, r, i) {
    return this.send(t, e, r, i);
  }
  /**
   * Send a raw message to the socket server.
   */
  sendRaw(t) {
    return Pe(this, Po, Od).call(this, t);
  }
  /**
   * Alias to `on`.
   */
  receive(t, e) {
    return M(this, Ke).on(t.toString(), e);
  }
  /**
   * Event listener that is fired on receiving socket messages.
   */
  on(t, e) {
    if (typeof t == "string" && (t === "connected" || t === "disconnected" || t === "errored" || t === "reconnected" || t === "reconnecting" || t === "reconnectAttempt" || t === "reconnectFailure" || t === "failed")) {
      M(this, Ke).on(t, e);
      return;
    }
    this.receive(t, e);
  }
  /**
   * Remove all event listeners that were added using `on`.
   */
  removeAllListeners() {
    M(this, Ke).removeAllListeners();
  }
  /**
   * Alias to `removeListener`.
   */
  removeReceiver(t, e) {
    this.removeListener(t, e);
  }
  /**
   * Remove a specific listener that was added using `on`.
   */
  removeListener(t, e) {
    M(this, Ke).removeListener(t.toString(), e);
  }
  /**
   * Alias to `removeListeners`.
   */
  removeReceivers(t) {
    this.removeListeners(t);
  }
  /**
   * Remove all listeners for a specific event.
   */
  removeListeners(t) {
    M(this, Ke).listeners(t.toString()).map(
      (e) => this.removeListener(t, e)
    );
  }
  /**
   * Disconnect the socket.
   */
  disconnect() {
    ne(this, gr, !1), Pe(this, Dn, Co).call(this), this.removeAllListeners(), ne(this, Xr, {
      code: 1e3,
      reason: "Sockrates disconnect method called"
    }), M(this, Ae).close(1e3, "Sockrates disconnect method called.");
  }
}
Ae = /* @__PURE__ */ new WeakMap(), En = /* @__PURE__ */ new WeakMap(), _e = /* @__PURE__ */ new WeakMap(), Le = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Ke = /* @__PURE__ */ new WeakMap(), gr = /* @__PURE__ */ new WeakMap(), Xr = /* @__PURE__ */ new WeakMap(), Ps = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap(), Gs = /* @__PURE__ */ new WeakMap(), ih = /* @__PURE__ */ new WeakSet(), KS = function(s) {
  if (s.startsWith("ws://") || s.startsWith("wss://"))
    return s;
  if (s.startsWith("https://"))
    return `wss://${s.substring(8)}`;
  if (s.startsWith("http://"))
    return `ws://${s.substring(7)}`;
  throw new Error("Invalid URL. URL must start with http(s):// or ws(s)://.");
}, vo = /* @__PURE__ */ new WeakSet(), vd = function(s, t) {
  M(this, Le).error("Error:", { error: s }), M(this, Ke).emit("errored", { error: s }), t == null || t(s);
}, nh = /* @__PURE__ */ new WeakSet(), zS = function(s) {
  if (Pe(this, Nd, dh).call(this), s.data === OO) {
    M(this, Le).debug("Received ping from server"), Pe(this, Po, Od).call(this, NO);
    return;
  }
  const t = WS.decode(s.data), { id: e, payload: r } = t;
  M(this, Le).debug("Received message", { event: t.event, messageID: e }), M(this, Ke).emit(t.event.toString(), { id: e, payload: r });
}, ah = /* @__PURE__ */ new WeakSet(), wg = function() {
  return M(this, Ae).readyState === 1;
}, Dd = /* @__PURE__ */ new WeakSet(), oh = function(s, t) {
  ne(this, Xr, { reason: t, code: s }), M(this, Ke).emit("disconnected", { code: s, reason: t });
}, ch = /* @__PURE__ */ new WeakSet(), YS = function() {
  const { reason: s, code: t } = M(this, Xr);
  t && t !== 1e3 && M(this, gr) && M(this, _e).autoReconnect && !M(this, Ps) && (M(this, Le).debug(`Triggering reconnection due to ${s}.`), M(this, Ke).emit(
    "reconnecting"
    /* reconnecting */
  ), Pe(this, _o, Td).call(this));
}, _o = /* @__PURE__ */ new WeakSet(), Td = function(s = !0) {
  return u(this, null, function* () {
    if (s && M(this, Ps)) {
      M(this, Le).debug("Reconnect called when already in a reconnect loop. Ignoring.");
      return;
    }
    if (M(this, Ps) || M(this, Gs).reset(), M(this, _e).maxReconnectionAttempts !== null && M(this, Gs).getAttempts() >= M(this, _e).maxReconnectionAttempts) {
      M(this, Ke).emit(
        "failed"
        /* failed */
      ), ne(this, Ps, !1);
      return;
    }
    ne(this, Ps, !0), Pe(this, wo, Vd).call(this), Pe(this, Dn, Co).call(this);
    try {
      if (yield M(this, Gs).wait(), M(this, gr) === !1)
        return;
      if (M(this, Le).debug(`Reconnection attempt ${M(this, Gs).getAttempts()}`), M(this, Ke).emit("reconnectAttempt", { attempt: M(this, Gs).getAttempts() }), yield this.connect(), !Pe(this, ah, wg).call(this))
        throw Error("Reconnect Failed");
      ne(this, Ps, !1), ne(this, Xr, {
        code: void 0,
        reason: void 0
      }), M(this, Ke).emit(
        "reconnected"
        /* reconnected */
      );
    } catch (t) {
      M(this, Le).debug("Failed to reconnect."), M(this, Ke).emit("reconnectFailure", { attempt: M(this, Gs).getAttempts() }), Pe(this, _o, Td).call(this, !1);
    }
  });
}, Po = /* @__PURE__ */ new WeakSet(), Od = function(s) {
  try {
    return M(this, Ae).send(s), !0;
  } catch (t) {
    return M(this, Le).error(t.message), !1;
  }
}, Nd = /* @__PURE__ */ new WeakSet(), dh = function() {
  this.config.disconnectOnPingTimeout && (M(this, Le).debug("Resetting ping timeout"), Pe(this, Dn, Co).call(this), ne(this, _n, setTimeout(() => {
    var s;
    M(this, Le).debug("Disconnecting the socket due to ping timeout"), ne(this, gr, !0);
    const t = 3002, e = "Ping timeout";
    (s = M(this, Ae)) == null || s.close(t, e), Pe(this, Dd, oh).call(this, t, e);
  }, M(this, _e).pingTimeout)));
}, Dn = /* @__PURE__ */ new WeakSet(), Co = function() {
  M(this, _n) && (clearTimeout(M(this, _n)), ne(this, _n, void 0));
}, wo = /* @__PURE__ */ new WeakSet(), Vd = function() {
  M(this, Ae) && (M(this, Ae).onopen = void 0, M(this, Ae).onerror = void 0, M(this, Ae).onmessage = void 0, M(this, Ae).onclose = void 0);
};
var LO = Object.defineProperty, xO = Object.getOwnPropertyDescriptor, Kl = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? xO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && LO(t, e, i), i;
};
const Rg = 65535, UO = 3e3;
var zr, Ce, we, Me, is, et, Nc, lh, Vc, uh, Wg;
const QS = (Wg = class {
  constructor(s, {
    peerId: t,
    meetingId: e,
    authToken: r,
    capabilities: i
  }) {
    m(this, we);
    m(this, Nc);
    m(this, Vc);
    m(this, zr, void 0);
    m(this, Ce, void 0);
    h(this, "roomName");
    h(this, "authToken");
    h(this, "capabilities");
    m(this, is, void 0);
    m(this, et, void 0);
    var a;
    if (!t || !e || !r)
      throw new b("peerId, meetingId, or authToken can not be empty", "0404");
    f(this, is, void 0), f(this, et, s), this.capabilities = i, this.roomName = e, this.authToken = r, f(this, zr, x(this, Nc, lh).call(this, t)), f(this, Ce, new VO(n(this, zr), {
      autoReconnect: !0,
      disconnectOnPingTimeout: (a = i.includes("PING")) != null ? a : !1,
      queueOnDisconnect: !0,
      flushOnReconnect: !1,
      logger: this.logger
    })), this.handleSocketConnectionEvents();
  }
  get joinAttempted() {
    return n(this, we, Me).socketJoinAttempted;
  }
  set joinAttempted(s) {
    n(this, we, Me).socketJoinAttempted = s;
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, et).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, et).getValue("logger");
  }
  get peerId() {
    return n(this, et).getValue("peerId");
  }
  updateURL(s) {
    s !== this.peerId && (f(this, zr, x(this, Nc, lh).call(this, s)), this.logger.debug("SocketService:: Connection URL updated.")), n(this, Ce).updateURL(n(this, zr));
  }
  static getSocketEdgeDomain(s) {
    return sn({ servicePrefix: "socket-edge", baseURI: s });
  }
  get url() {
    return n(this, zr);
  }
  connect() {
    return u(this, null, function* () {
      n(this, we, Me).socketJoinAttempted = !0, yield n(this, Ce).connect(), n(this, we, Me).socketJoinAttempted = !0, n(this, we, Me).socketState = {
        state: "connected",
        reconnected: !1,
        reconnectionAttempt: void 0
      };
    });
  }
  disconnect() {
    n(this, we, Me).socketJoinAttempted = !1, n(this, Ce).disconnect(), n(this, we, Me).socketJoinAttempted = !0, n(this, we, Me).socketState = {
      state: "disconnected",
      reconnected: !1,
      reconnectionAttempt: void 0
    };
  }
  get isConnected() {
    try {
      return n(this, Ce).readyState === 1;
    } catch (s) {
      return !1;
    }
  }
  sendMessage(s, t, e) {
    const r = {};
    return n(this, et).getValue("telemetry").injectContext(r), n(this, Ce).send(
      s,
      e != null ? e : x(this, Vc, uh).call(this),
      t,
      new TextEncoder().encode(JSON.stringify(r))
    );
  }
  sendMessagePromise(s, t, e, r) {
    const i = parseInt({}.SOCKET_SERVICE_MESSAGE_REQUEST_TIMEOUT, 10) || 2e4;
    return this.sendMessagePromiseWithTimeout({
      event: s,
      timeout: i,
      protobuf: t,
      messageId: e,
      resp: r
    });
  }
  sendMessagePromiseWithTimeout({
    event: s,
    timeout: t,
    protobuf: e,
    messageId: r,
    resp: i
  }) {
    const a = i != null ? i : s;
    return new Promise(
      (o, c) => {
        const d = (_, P) => {
          n(this, Ce).removeListener(a, _), n(this, Ce).removeListener(Rg, P), n(this, Ce).removeListener(
            Ar.errorResponse,
            P
          ), n(this, Ce).removeListener(
            Cs.errorResponse,
            P
          );
        }, l = r != null ? r : x(this, Vc, uh).call(this), p = {};
        n(this, et).getValue("telemetry").injectContext(p);
        const S = ({
          id: _,
          payload: P
        }) => {
          if (l === _) {
            let C;
            try {
              const w = $R.fromBinary(P);
              C = new Error(w.errorMessage);
            } catch (w) {
              C = new Error("failed to parse error message", { cause: w });
              try {
                const $ = Fb.fromBinary(P);
                C = new Error($.message);
              } catch ($) {
                C = new Error("failed to parse error message", { cause: $ });
              }
            }
            c(C), d(v, S);
          }
        }, v = ({
          id: _,
          payload: P
        }) => {
          l === _ && (o({ id: _, payload: P }), d(v, S));
        };
        n(this, Ce).on(a, v), n(this, Ce).on(Rg, S), n(this, Ce).on(Ar.errorResponse, S), n(this, Ce).on(Cs.errorResponse, S), setTimeout(() => {
          d(v, S), c(new Error(`request timeout for callback eventId:${s}`));
        }, t), n(this, Ce).send(
          s,
          l,
          e,
          new TextEncoder().encode(JSON.stringify(p))
        );
      }
    );
  }
  on(s, t) {
    n(this, Ce).on(s, t);
  }
  onStateEvent(s, t) {
    n(this, Ce).on(s, t);
  }
  removeListener(s, t) {
    n(this, Ce).removeListener(s, t);
  }
  removeListeners(s) {
    n(this, Ce).removeListeners(s);
  }
  flush() {
    return n(this, Ce).flush();
  }
  handleSocketConnectionEvents() {
    this.onStateEvent("connected", () => u(this, null, function* () {
      this.logger.info("SocketService::Connected to socket-edge"), n(this, is) && (clearTimeout(n(this, is)), f(this, is, void 0)), n(this, we, Me).updateSocketConnectionState("connected");
    })), this.onStateEvent("disconnected", ({ code: s, reason: t }) => {
      var i;
      this.logger.info("SocketService::Disconnected from socket-edge", { error: { code: s, reason: t }, country: E.location.country });
      const { recv: e, send: r } = (i = n(this, we, Me).mediaState) != null ? i : {};
      e != null && e.state && (e == null ? void 0 : e.state) !== An.CONNECTED || r != null && r.state && (r == null ? void 0 : r.state) !== An.CONNECTED ? n(this, et).getValue("peerSessionStore").emit(
        k.SOCKET_SERVICE_DISCONNECTED,
        {
          joinAttempted: n(this, we, Me).joinAttempted
        }
      ) : f(this, is, setTimeout(() => {
        n(this, et).getValue("peerSessionStore").emit(
          k.SOCKET_SERVICE_DISCONNECTED,
          { joinAttempted: n(this, we, Me).joinAttempted }
        ), f(this, is, void 0);
      }, UO)), n(this, we, Me).updateSocketConnectionState("disconnected");
    }), this.onStateEvent("reconnecting", () => u(this, null, function* () {
      this.logger.info("SocketService::Reconnecting to socket-edge", { country: E.location.country }), n(this, we, Me).updateSocketConnectionState("reconnecting");
    })), this.onStateEvent("reconnectAttempt", (t) => u(this, [t], function* ({ attempt: s }) {
      this.logger.info("SocketService::Attempting to reconnect to socket-edge", {
        socket: {
          retryAttempt: s
        }
      }), n(this, we, Me).updateSocketConnectionState("reconnectAttempt", s);
    })), this.onStateEvent("reconnectFailure", ({ attempt: s }) => {
      this.logger.info("SocketService::Reconnect attempt to socket-edge failed", {
        socket: {
          retryAttempt: s
        }
      }), n(this, we, Me).updateSocketConnectionState("reconnectFailure", s);
    }), this.onStateEvent("reconnected", () => u(this, null, function* () {
      this.logger.info("SocketService::Reconnected to socket-edge", { connectionState: { joinAttempted: n(this, we, Me).mediaJoinAttempted } }), n(this, is) && (clearTimeout(n(this, is)), f(this, is, void 0)), n(this, et).getValue("peerSessionStore").emit(k.SOCKET_SERVICE_RECONNECTED, {
        wasJoinAttempted: n(this, we, Me).mediaJoinAttempted
      }), n(this, we, Me).updateSocketConnectionState("reconnected");
    })), this.onStateEvent("failed", () => u(this, null, function* () {
      this.logger.info("SocketService::Failed to connect to socket-edge", { country: E.location.country }), n(this, et).getValue("peerSessionStore").emit(k.SOCKET_SERVICE_FAILED), n(this, we, Me).updateSocketConnectionState("failed");
    }));
  }
}, zr = new WeakMap(), Ce = new WeakMap(), we = new WeakSet(), Me = function() {
  return n(this, et).getValue("connectionHandler");
}, is = new WeakMap(), et = new WeakMap(), Nc = new WeakSet(), lh = function(s) {
  let t = QS.getSocketEdgeDomain(n(this, et).getValue("baseURI"));
  typeof La(n(this, et), "socket_server_base") == "string" && (t = La(n(this, et), "socket_server_base"));
  const e = `wss://${t}`, r = new URL(`${e}/ws`), i = this.peerId, a = H(D({
    roomID: this.roomName,
    peerID: s,
    authToken: this.authToken,
    useMediaV2: !0
  }, i !== s && { oldPeerID: i }), {
    ping: this.capabilities.includes("PING"),
    capabilities: this.capabilities.map((o) => Rd[o]).join(" "),
    joinWithDetails: !0,
    useCfWorker: !0,
    useStartSession: !0
  });
  return Object.entries(a).forEach(([o, c]) => {
    r.searchParams.append(o, c.toString());
  }), r.href;
}, Vc = new WeakSet(), uh = function() {
  return `${this.peerId}-${(Math.random() + 1).toString(36).substring(7)}`;
}, Wg);
let Wc = QS;
Kl([
  E.trace("SocketService.connect")
], Wc.prototype, "connect", 1);
Kl([
  E.trace("SocketService.disconnect")
], Wc.prototype, "disconnect", 1);
Kl([
  E.trace("SocketService.sendMessagePromise")
], Wc.prototype, "sendMessagePromise", 1);
Kl([
  E.trace("SocketService.sendMessagePromiseWithTimeout")
], Wc.prototype, "sendMessagePromiseWithTimeout", 1);
class $O {
  constructor(t) {
    h(this, "socketService");
    this.socketService = t;
  }
  // eslint-disable-next-line class-methods-use-this
  handleConnectedRoomsDumpRaw({ payload: t }) {
    var a;
    const e = pk.fromBinary(t), r = e.meetings.map((o) => {
      var c;
      return {
        id: o.id,
        title: o.title,
        participants: (c = o.participants) != null ? c : []
      };
    });
    return {
      parentMeeting: {
        id: e.parentMeeting.id,
        title: e.parentMeeting.title,
        participants: (a = e.parentMeeting.participants) != null ? a : []
      },
      meetings: r
    };
  }
  // eslint-disable-next-line class-methods-use-this
  handleTransferPeerRaw({ payload: t }) {
    const e = $k.fromBinary(t);
    return { authToken: e.authToken, meetingId: e.meetingId };
  }
  // eslint-disable-next-line class-methods-use-this
  handleMovedPeerRaw({ payload: t }) {
    const e = Pf.fromBinary(t);
    return {
      meetingId: e.meetingId,
      customParticipantId: e.customParticipantId
    };
  }
  // eslint-disable-next-line class-methods-use-this
  handleConnectedRoomsUpdatedRaw({ payload: t }) {
    return eg.fromBinary(t).payloads.map((r) => ({
      id: r.id,
      title: r.title
    }));
  }
  // eslint-disable-next-line class-methods-use-this
  handleConnectedRoomsDeletedRaw({ payload: t }) {
    return Ik.fromBinary(t).payloads;
  }
  getConnectedRoomsDump() {
    return u(this, null, function* () {
      const t = yield this.socketService.sendMessagePromise(
        U.getConnectedRoomsDump
      );
      return this.handleConnectedRoomsDumpRaw(t);
    });
  }
  createConnectedRooms(t) {
    return u(this, null, function* () {
      const { payload: e } = yield this.socketService.sendMessagePromise(
        U.createConnectedRooms,
        Sk.toBinary({ payloads: t })
      );
      return eg.fromBinary(e).payloads.map((i) => ({
        id: i.id,
        title: i.title
      }));
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  updateConnectedRooms(t) {
    return u(this, null, function* () {
    });
  }
  disableConnectedRooms(t) {
    return u(this, null, function* () {
      const e = t.map((i) => ({ id: i })), r = yield this.socketService.sendMessagePromise(
        U.deleteConnectedRooms,
        bk.toBinary({ payloads: e })
      );
      return this.handleConnectedRoomsDeletedRaw(
        r
      );
    });
  }
  movePeersBetweenRooms(t) {
    return u(this, null, function* () {
      try {
        const e = yield this.socketService.sendMessagePromise(
          U.movePeers,
          Vk.toBinary({
            sourceMeetingId: t.sourceMeetingId,
            destinationMeetingId: t.destinationMeetingId,
            participants: t.participants
          })
        );
        return new TextDecoder().decode(e.payload).includes("error") ? { success: !1, error: "failed to move participants" } : { success: !0 };
      } catch (e) {
        return { success: !1, error: e };
      }
    });
  }
}
var FO = Object.defineProperty, BO = Object.getOwnPropertyDescriptor, HO = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? BO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && FO(t, e, i), i;
}, _s;
class XS extends qt {
  constructor(e) {
    const r = e.getValue("logger");
    super(r);
    h(this, "meetings", []);
    h(this, "parentMeeting", null);
    m(this, _s, void 0);
    f(this, _s, e);
  }
  get supportsConnectedMeetings() {
    return n(this, _s).getValue("self").id !== "";
  }
  get isActive() {
    return this.meetings.length !== 0;
  }
  validateConnectedMeetingsAction() {
    if (!this.supportsConnectedMeetings)
      throw new Error(`You are not allowed to perform this action.
						Please connect with our support team to enable connected meetings.`);
  }
  getConnectedMeetings() {
    return u(this, null, function* () {
      return this.validateConnectedMeetingsAction(), yield n(this, _s).getValue("connectedMeetingsSocketHandler").getConnectedRoomsDump();
    });
  }
  /**
   * create connected meetings
   */
  createMeetings(e) {
    return u(this, null, function* () {
      return this.validateConnectedMeetingsAction(), (yield n(this, _s).getValue("connectedMeetingsSocketHandler").createConnectedRooms(
        e
      )).map((i) => ({
        id: i.id,
        title: i.title
      }));
    });
  }
  /**
   * update meeting title
   */
  updateMeetings(e) {
    return u(this, null, function* () {
      this.validateConnectedMeetingsAction(), yield n(this, _s).getValue("connectedMeetingsSocketHandler").updateConnectedRooms(
        e.map((r) => ({ meetingId: r.id, title: r.title }))
      );
    });
  }
  /**
   * delete connected meetings
   */
  deleteMeetings(e) {
    return u(this, null, function* () {
      this.validateConnectedMeetingsAction();
      const r = this.meetings.map((a) => e.includes(a.id) && a.participants.length !== 0 ? this.moveParticipants(
        a.id,
        this.parentMeeting.id,
        a.participants.map((o) => o.id)
      ) : Promise.resolve());
      return yield Promise.all(r), yield n(this, _s).getValue("connectedMeetingsSocketHandler").disableConnectedRooms(
        e
      );
    });
  }
  /**
   * Trigger event to move participants
   *
   * @param {string} sourceMeetingId - id of source meeting
   * @param {string} destinationMeetingId - id of destination meeting
   * @param {string[]} participantIds - list of id of the participants
   */
  moveParticipants(e, r, i) {
    return u(this, null, function* () {
      this.validateConnectedMeetingsAction();
      const a = yield n(this, _s).getValue("connectedMeetingsSocketHandler").movePeersBetweenRooms(
        {
          sourceMeetingId: e,
          destinationMeetingId: r,
          participants: i.map((o) => ({
            id: o
          }))
        }
      );
      return a.success && this.moveSuccessHandler(e, r, i), a;
    });
  }
  /**
   * Trigger event to move participants with custom preset
   */
  moveParticipantsWithCustomPreset(e, r, i) {
    return u(this, null, function* () {
      this.validateConnectedMeetingsAction();
      const a = yield n(this, _s).getValue("connectedMeetingsSocketHandler").movePeersBetweenRooms(
        {
          sourceMeetingId: e,
          destinationMeetingId: r,
          participants: i
        }
      );
      return a.success && this.moveSuccessHandler(e, r, i.map((o) => o.id)), a;
    });
  }
  moveSuccessHandler(e, r, i) {
    const a = /* @__PURE__ */ new Map();
    [
      ...this.parentMeeting.participants,
      ...this.meetings.flatMap((o) => o.participants)
    ].forEach((o) => a.set(o.id, o)), r === this.parentMeeting.id && (this.parentMeeting.participants = this.parentMeeting.participants.concat(
      i.map((o) => a.get(o))
    )), e === this.parentMeeting.id && (this.parentMeeting.participants = this.parentMeeting.participants.filter(
      (o) => !i.includes(o.id)
    )), this.meetings = this.meetings.map((o) => {
      if (r === o.id) {
        const c = o.participants.concat(
          i.map((d) => a.get(d))
        );
        return H(D({}, o), {
          participants: c
        });
      }
      if (e === o.id) {
        const c = o.participants.filter(
          (d) => !i.includes(d.id)
        );
        return H(D({}, o), {
          participants: c
        });
      }
      return o;
    });
  }
}
_s = new WeakMap();
HO([
  Mt({ maxInvocations: 60, period: 60 })
], XS.prototype, "getConnectedMeetings", 1);
var qO = Object.defineProperty, jO = Object.getOwnPropertyDescriptor, Kh = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? jO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && qO(t, e, i), i;
}, ge, Jg;
const ZS = (Jg = class {
  constructor(s) {
    h(this, "connectedMeetings");
    m(this, ge, void 0);
    f(this, ge, s), this.connectedMeetings = new XS(s);
  }
  /**
   * @access private
   * Not for external use
   */
  get telemetry() {
    return n(this, ge).getValue("telemetry");
  }
  /**
   * @access private
   * Not for external use
   */
  get logger() {
    return n(this, ge).getValue("logger");
  }
  static init(s) {
    const t = new ZS(
      s
    );
    return t.connectedMeetings.supportsConnectedMeetings && (t.setupEvents(), s.getValue("self").once(
      "roomJoined",
      () => t.getConnectedMeetings()
    )), t;
  }
  getConnectedMeetings() {
    this.connectedMeetings.getConnectedMeetings();
  }
  setupEvents() {
    n(this, ge).getValue("connectedMeetingsSocketHandler").socketService.on(
      U.getConnectedRoomsDump,
      this.handleConnectedRoomsDump.bind(this)
    ), n(this, ge).getValue("connectedMeetingsSocketHandler").socketService.on(
      U.transferPeer,
      this.handleTransferPeer.bind(this)
    ), n(this, ge).getValue("connectedMeetingsSocketHandler").socketService.on(
      U.movedPeer,
      this.handleMovedPeer.bind(this)
    ), n(this, ge).getValue("connectedMeetingsSocketHandler").socketService.on(
      U.connectedRoomsUpdated,
      this.handleConnectedRoomsUpdated.bind(this)
    ), n(this, ge).getValue("connectedMeetingsSocketHandler").socketService.on(
      U.connectedRoomsDeleted,
      this.handleConnectedRoomsDeleted.bind(this)
    );
  }
  // event handlers
  handleTransferPeer(s) {
    const t = n(this, ge).getValue("connectedMeetingsSocketHandler").handleTransferPeerRaw(s);
    return this.switchMeeting(t);
  }
  switchMeeting(e) {
    return u(this, arguments, function* ({
      authToken: s,
      meetingId: t
    }) {
      var a, o, c, d;
      if (!this.connectedMeetings.supportsConnectedMeetings)
        throw new Error(`You are not allowed to perform this action.
								Please connect with our support team to enable connected meetings.`);
      this.logger.info("ConnectedMeetingsController::switchMeeting:: asking ui-kit to show switching breakout UI"), this.connectedMeetings.emit("changingMeeting", t);
      const r = {
        video: n(this, ge).getValue("self").videoEnabled,
        audio: n(this, ge).getValue("self").audioEnabled
      };
      try {
        n(this, ge).getValue("self").cleanupEvents(), yield n(this, ge).getValue("meeting").leave("connected-meeting");
      } catch (l) {
        this.logger.error(`ConnectedMeetingsController:: switchMeeting:: issues in leaving previous meeting. Meeting Id: ${(o = (a = n(this, ge).getValue("meeting")) == null ? void 0 : a.meta) == null ? void 0 : o.meetingId}`, { error: l });
      }
      this.logger.info(`ConnectedMeetingsController::switchMeeting:: initializing new meeting. Meeting Id: ${t}`);
      const i = yield ZO.init(H(D({}, n(this, ge).getValue("options")), {
        cachedUserDetails: null,
        defaults: H(D(D({}, n(this, ge).getValue("options").defaults), r), {
          /**
           * NOTE(ravindra-cloudflare):
           * Protected methods & variables of SelfMedia,
           * such as localMediaHandler cannot be type checked outside class hierarchy,
           * therefore typecasting Self to SelfMedia,
           * Even though Self extends SelfMedia.
           *
           * Alternative approach is to make either SelfMedia methods public
           * or expose a public wrapper on Self.
           */
          mediaHandler: n(this, ge).getValue("self")
        }),
        authToken: s
      }));
      this.logger.info(`ConnectedMeetingsController::switchMeeting:: initialized new meeting. Meeting Id: ${(c = i == null ? void 0 : i.meta) == null ? void 0 : c.meetingId}`);
      try {
        const { hidden: l } = n(this, ge).getValue("self");
        i.self.setName(n(this, ge).getValue("self").name), yield i.join(), l && i.self.hide();
      } catch (l) {
        this.logger.error("ConnectedMeetingsController.joinRoom", { error: l });
      }
      return this.logger.info(`ConnectedMeetingsController::switchMeeting:: asking ui-kit to show in-meeting ui of newly joined meeting id: ${(d = i == null ? void 0 : i.meta) == null ? void 0 : d.meetingId}`), this.connectedMeetings.emit("meetingChanged", i), i;
    });
  }
  handleConnectedRoomsDump(s) {
    const t = n(this, ge).getValue("connectedMeetingsSocketHandler").handleConnectedRoomsDumpRaw(s);
    this.connectedMeetings.meetings = t.meetings.map((e) => ({
      id: e.id,
      title: e.title,
      participants: e.participants || []
    })), this.connectedMeetings.parentMeeting = {
      id: t.parentMeeting.id,
      title: t.parentMeeting.title,
      participants: t.parentMeeting.participants
    }, this.emitStateUpdate();
  }
  // eslint-disable-next-line class-methods-use-this
  handleMovedPeer(s) {
    return n(this, ge).getValue("connectedMeetingsSocketHandler").handleMovedPeerRaw(s);
  }
  handleConnectedRoomsUpdated(s) {
    const t = n(this, ge).getValue("connectedMeetingsSocketHandler").handleConnectedRoomsUpdatedRaw(s), e = /* @__PURE__ */ new Map();
    this.connectedMeetings.meetings.forEach((r) => {
      e.set(r.id, r);
    }), t.forEach((r) => {
      e.has(r.id) ? e.get(r.id).title = r.title : e.set(r.id, H(D({}, r), { participants: [] }));
    }), this.connectedMeetings.meetings = Array.from(e.values()), this.emitStateUpdate();
  }
  handleConnectedRoomsDeleted(s) {
    const e = n(this, ge).getValue("connectedMeetingsSocketHandler").handleConnectedRoomsDeletedRaw(s).map((r) => r.id);
    this.connectedMeetings.meetings = this.connectedMeetings.meetings.filter(
      (r) => !e.includes(r.id)
    ), this.emitStateUpdate();
  }
  emitStateUpdate() {
    this.connectedMeetings.emit("stateUpdate", {
      meetings: this.connectedMeetings.meetings,
      parentMeeting: this.connectedMeetings.parentMeeting
    });
  }
}, ge = new WeakMap(), Jg);
let zl = ZS;
Kh([
  E.trace("ConnectedMeetingsController.getConnectedMeetings")
], zl.prototype, "getConnectedMeetings", 1);
Kh([
  E.trace("ConnectedMeetingsController.setupEvents")
], zl.prototype, "setupEvents", 1);
Kh([
  E.trace("ConnectedMeetingsController.switchMeeting")
], zl.prototype, "switchMeeting", 1);
var GO = Object.defineProperty, WO = Object.getOwnPropertyDescriptor, Yl = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? WO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && GO(t, e, i), i;
};
const Pn = class {
  constructor(s, t, e) {
    h(this, "apiBase");
    h(this, "selfController");
    h(this, "pollController");
    h(this, "chatController");
    h(this, "metaController");
    h(this, "storesManager");
    h(this, "stageController");
    h(this, "pluginController");
    h(this, "internalsController");
    h(this, "recordingController");
    h(this, "livestreamController");
    h(this, "participantController");
    h(this, "connectedMeetingsController");
    /**
     * @access private
     * Not for external use
     */
    h(this, "telemetry");
    /**
     * @access private
     * Not for external use
     */
    h(this, "logger");
    this.apiBase = s, this.storesManager = t.storesManager, this.metaController = t.metaController, this.selfController = t.selfController, this.chatController = t.chatController, this.pollController = t.pollController, this.stageController = t.stageController, this.pluginController = t.pluginController, this.recordingController = t.recordingController, this.internalsController = t.internalsController, this.participantController = t.participantController, this.livestreamController = t.livestreamController, this.connectedMeetingsController = t.connectedMeetingsController, this.telemetry = e.getValue("telemetry"), this.logger = e.getValue("logger");
  }
  static init(s) {
    return u(this, null, function* () {
      var N, B;
      const {
        peerId: t,
        apiBase: e,
        authToken: r,
        meetingId: i,
        organizationId: a,
        cachedUserDetails: o,
        logger: c
      } = s.getAllValues();
      if (VS(s), ye.isSupported() === !1)
        throw new b("Browser not supported", "0010", c, !0);
      const d = QM(
        s,
        {
          authToken: r,
          baseURL: e,
          cachedUserDetails: o
        }
      );
      d.setRoomName(i), d.setRoomUUID(i), d.setOrganizationId(a), d.setHeader("tracing-id", t), s.setValue("apiClient", d);
      const l = new O0(s);
      s.setValue("connectionHandler", l);
      const p = Pn.createSocketService(s), g = p.connect(), S = d.getUserDetails(), v = d.getPlugins();
      let _, P = "";
      try {
        yield Pn.setupFlagsmith(s);
      } catch (G) {
        c.error("Failed to setup flagsmith", { error: G });
      }
      try {
        yield g;
      } catch (G) {
        c.error(
          "[Controller]: Failed to connect to socket server:",
          { error: G }
        );
      }
      try {
        ({ meetingTitle: P } = yield d.getRoomNodeData()), _ = yield S, c.info("CF SFU is being used."), s.setValue("presetName", _.preset.name);
      } catch (G) {
        c.error("Failed to get room metadata", { error: G });
      }
      const C = Hu.init(_.preset, !s.getValue("modules").theme), w = Wu.init(
        s,
        C.viewType,
        _.preset.permissions
      ), $ = Pn.setupControllers(
        p,
        s,
        _,
        v,
        P,
        C,
        w
      );
      _0(C) && ((N = Pn.createRoomNodeClient(s, p).initializeConnection(
        _.participant.name,
        i,
        !1,
        w
      )) == null || N.catch((re) => {
        c.error(
          "[Controller]: Failed to queue partial media room promise:",
          { error: re }
        );
      })), E.location.country = (B = d.ipInfo) == null ? void 0 : B.country;
      const { controllers: F } = yield $;
      return yw(), new Pn(e, F, s);
    });
  }
  static setupFlagsmith(s) {
    return u(this, null, function* () {
      var l;
      const {
        peerId: t,
        baseURI: e,
        overrides: r,
        meetingId: i,
        organizationId: a,
        logger: o
      } = s.getAllValues(), c = Tw(i), d = H(D({
        entity: Pu.PEER,
        clientId: a,
        isAnonUser: !a,
        sdkVersion: s.getValue("sdkVersion"),
        presetName: s.getValue("presetName"),
        meetingHash: c,
        roomName: i
      }, ye.getDeviceInfo()), {
        isReactNative: navigator.isReactNative
      });
      try {
        const p = (l = r == null ? void 0 : r.whitelabelled_flags_endpoint) == null || l ? sn({ servicePrefix: "flags", baseURI: e }) : "edge.api.flagsmith.com";
        yield s.getValue("flagsmith").identify(
          `${Pu.PEER}_${t}`,
          JSON.parse(JSON.stringify(d)),
          !1,
          // force evaluate
          5e3,
          // timeout
          p,
          o
        ), o.info(
          "flagsmith::allFlags",
          { flags: JSON.stringify(s.getValue("flagsmith").getAllFlags()) },
          !0
        );
      } catch (p) {
        o.error("Failed to fetch flagsmith flags");
      }
    });
  }
  static setupControllers(s, t, e, r, i, a, o) {
    return u(this, null, function* () {
      var I, Ue, Cr;
      const c = t.getValue("modules"), { participant: d } = e, l = t.getValue("defaults"), p = t.getValue("logger"), { viewType: g, mediaConstraints: { audio: S } } = a;
      t.setValue("viewType", g), t.setValue("defaults", D({
        mediaConfiguration: {
          audio: {
            enableHighBitrate: (I = S.enableHighBitrate) != null ? I : !1,
            enableStereo: (Ue = S.enableStereo) != null ? Ue : !1
          }
        }
      }, l)), t.setValue("maxPreferredStreams", ye.isMobile() ? a.maxVideoStreams.mobile : a.maxVideoStreams.desktop);
      let v, _, P, C, w, $, F, N, B;
      const G = new uO(t, s), re = new $O(
        s
      );
      t.setValue("connectedMeetingsSocketHandler", re);
      const tt = new Wl(t, s), cs = new as(t, s), ii = new SO(s), ds = new xS(t, s), A = new vO(t, s), y = new lO(s), R = new on(t, s), L = yield ri.init(
        t,
        ds,
        d,
        o,
        a
      );
      t.setValue("selfController", L);
      const fe = yield Uf.init(
        t,
        L.self,
        ds,
        G,
        i
      );
      if (c.participant && (N = new Pr(
        t,
        L.self,
        ds
      )), (Cr = c.e2ee) != null && Cr.enabled && c.e2ee.manager.init(p, t.getValue("peerSessionStore")), c.chat && (_ = yield ws.init(
        t,
        cs,
        R,
        L.self,
        N.participants
      )), c.internals && (w = yield Lh.init(t)), c.livestream && a.viewType === At.Livestream && t.getValue("flagsmith").hasFeature(ee.LIVESTREAM) && (F = new Jf(
        t,
        L.self,
        y
      )), a.viewType !== At.Chat) {
        if (c.poll && (v = yield Nf.init(
          t,
          L.self,
          tt
        )), c.recording && ($ = new Hf(
          t,
          L.self,
          ds
        )), c.stage && (P = new $f(
          t,
          ii,
          ds,
          L.self,
          N.participants
        )), c.plugin) {
          if (!N)
            throw new b(
              "The plugin module cannot be initialized without the `participant` module",
              "0102"
            );
          const qs = yield r;
          C = yield Hc.init(
            t,
            qs,
            A,
            cs,
            _ == null ? void 0 : _.chat,
            L.self,
            N.participants,
            i
          );
        }
        if (c.connectedMeetings && (B = yield zl.init(
          t
        )), c.pip) {
          const qs = yield Cu._init(t, L.self);
          t.setValue("pip", qs);
        }
      }
      const V = {
        storesManager: new CD(t, A),
        pollController: v,
        selfController: L,
        metaController: fe,
        chatController: _,
        stageController: P,
        pluginController: C,
        recordingController: $,
        internalsController: w,
        livestreamController: F,
        participantController: N,
        connectedMeetingsController: B
      };
      return {
        theme: a,
        permissions: o,
        controllers: V
      };
    });
  }
  static createRoomNodeClient(s, t) {
    const {
      peerId: e
    } = s.getAllValues();
    return NS(s, {
      socket: t,
      peerId: e
    });
  }
  static createSocketService(s) {
    const {
      peerId: t,
      meetingId: e,
      authToken: r
    } = s.getAllValues(), i = ["PING"];
    return new Wc(s, {
      peerId: t,
      meetingId: e,
      authToken: r,
      capabilities: i
    });
  }
};
let Jc = Pn;
Yl([
  E.trace("Controller.init")
], Jc, "init", 1);
Yl([
  E.trace("setupFlagsmith")
], Jc, "setupFlagsmith", 1);
Yl([
  E.trace("Controller.createRoomNodeClient")
], Jc, "createRoomNodeClient", 1);
Yl([
  E.trace("Controller.createSocketService")
], Jc, "createSocketService", 1);
class JO {
  constructor() {
    h(this, "battery");
    h(this, "logger");
    h(this, "init", (t) => u(this, null, function* () {
      this.logger = t;
      try {
        "getBattery" in navigator && (this.battery = yield navigator.getBattery(), this.battery.addEventListener("chargingchange", this.updateChargeInfo), this.battery.addEventListener("levelchange", this.updateLevelInfo), this.updateLevelInfo(), this.updateChargeInfo());
      } catch (e) {
        t.error("Error getting battery", e);
      }
    }));
    h(this, "updateChargeInfo", () => {
      var t;
      this.logger.log(
        `Battery charging? ${(t = this.battery) != null && t.charging ? "Yes" : "No"}`
      );
    });
    h(this, "updateLevelInfo", () => {
      if (!this.battery) {
        this.logger.log("Battery level: Not known");
        return;
      }
      this.logger.log(`Battery level: ${this.battery.level * 100}%`);
    });
    h(this, "cleanup", () => {
      var t, e;
      "getBattery" in navigator && ((t = this.battery) == null || t.removeEventListener(
        "chargingchange",
        this.updateChargeInfo
      ), (e = this.battery) == null || e.removeEventListener("levelchange", this.updateLevelInfo));
    });
  }
}
const bg = new JO();
function KO(s, t) {
  s.startsWith("eyJ") || console.error("Invalid auth token provided. Ensure you are passing a %cparticipant `authToken`%c — not an Org API Key or an incorrectly formatted token.\nYou get the participant token from the Add Participant API: https://docs.realtime.cloudflare.com/api#/operations/add_participant", "font-weight: bold", "font-weight: normal");
  try {
    const { meetingId: e, orgId: r, participantId: i } = JSON.parse(atob(s.split(".")[1]));
    if (!e)
      throw Error(`Received V1 auth token ${s}`);
    let a = gi.baseURI.prod;
    t && (a = t);
    const o = `https://${sn({ servicePrefix: "api", baseURI: a })}`;
    return {
      meetingId: e,
      orgId: r,
      participantId: i,
      baseURI: a,
      apiBase: o
    };
  } catch (e) {
    throw new b("Invalid auth token", "0004");
  }
}
var Yr, Xi, Zi, Lc, bl, ev;
class zO {
  constructor() {
    m(this, bl);
    m(this, Yr, new Audio());
    m(this, Xi, new MediaStream());
    m(this, Zi, /* @__PURE__ */ new Map());
    m(this, Lc, void 0);
    n(this, Yr).srcObject = n(this, Xi), n(this, Yr).autoplay = !0;
  }
  playTracks(t) {
    return u(this, null, function* () {
      return t.forEach((e) => {
        n(this, Zi).has(e.id) || (n(this, Xi).addTrack(e), n(this, Zi).set(e.id, e));
      }), this.play();
    });
  }
  setSpeakerDevice(t) {
    typeof HTMLAudioElement.prototype.setSinkId == "function" && n(this, Yr).setSinkId(t);
  }
  removeTrack(t) {
    const e = n(this, Zi).get(t);
    e && (n(this, Xi).removeTrack(e), n(this, Zi).delete(t));
  }
  play() {
    return u(this, null, function* () {
      return n(this, Yr).srcObject = n(this, Xi), n(this, Yr).play().catch((t) => {
        x(this, bl, ev).call(this, t);
      });
    });
  }
  onError(t) {
    f(this, Lc, t);
  }
}
Yr = new WeakMap(), Xi = new WeakMap(), Zi = new WeakMap(), Lc = new WeakMap(), bl = new WeakSet(), ev = function(t) {
  var e;
  (e = n(this, Lc)) == null || e.call(this, t);
};
var en;
class YO extends zO {
  constructor() {
    super();
    /** Maps participantId to trackId */
    m(this, en, void 0);
    f(this, en, /* @__PURE__ */ new Map());
  }
  addParticipantTrack(e, r) {
    n(this, en).set(e, r.id), this.playTracks([r]);
  }
  removeParticipantTrack(e) {
    const r = n(this, en).get(e);
    r && this.removeTrack(r), n(this, en).delete(e);
  }
}
en = new WeakMap();
var QO = Object.defineProperty, XO = Object.getOwnPropertyDescriptor, Ql = (s, t, e, r) => {
  for (var i = r > 1 ? void 0 : r ? XO(t, e) : t, a = s.length - 1, o; a >= 0; a--)
    (o = s[a]) && (i = (r ? o(t, e, i) : o(i)) || i);
  return r && i && QO(t, e, i), i;
}, Ge, tn, Kg;
let ti = (Kg = class {
  constructor(t, e) {
    m(this, Ge, void 0);
    m(this, tn, void 0);
    f(this, tn, t), f(this, Ge, e);
  }
  get peerId() {
    return n(this, tn).getValue("peerId");
  }
  static initMedia(t = {}, e = !1, r = void 0) {
    var d;
    const i = (d = r == null ? void 0 : r.peerId) != null ? d : nn(), a = mr.createContext(i, {
      peerId: i
    }), o = a.getValue("logger");
    o.init(a);
    const c = new tS(o);
    return c.init(t, e, a), a.setValue("defaults", { mediaHandler: c }), c;
  }
  static init(t) {
    return u(this, null, function* () {
      var v, _, P, w, $, F, N;
      ye.init();
      const { mediaHandler: e } = (v = t.defaults) != null ? v : {}, r = (e == null ? void 0 : e.peerId) || ((P = (_ = t == null ? void 0 : t.cachedUserDetails) == null ? void 0 : _.peerId) != null ? P : nn()), { authToken: i, baseURI: a } = t, C = KO(i, a), { meetingId: o } = C, c = ro(C, ["meetingId"]);
      window.__zone_symbol__DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION = !0;
      const d = ti.setupContext(
        r,
        t,
        o,
        c
      ), l = d.getValue("telemetry"), p = d.getValue("logger");
      dv(p), bg.init(p), l.init(d, {
        roomName: o,
        userId: c.participantId,
        organizationId: c.orgId,
        peerId: r
      }, ($ = (w = t.modules) == null ? void 0 : w.tracing) != null ? $ : !0), p.init(d), p.info("Client::init::options", {
        clientInitOptions: H(D({}, t), {
          authToken: `${(F = t.authToken) == null ? void 0 : F.slice(0, 10)}...
				${(N = t.authToken) == null ? void 0 : N.slice(-10)}`
        })
      });
      const g = yield Jc.init(d), S = new ti(d, g);
      return d.setValue("meeting", S), S;
    });
  }
  static setupContext(t, e, r, i) {
    var d, l;
    const a = mr.createContext(t, e), o = D(D({}, dw), e == null ? void 0 : e.modules), c = e.defaults || {
      audio: !0,
      video: !0
    };
    return a.setValue("options", e), a.setValue("peerId", t), a.setValue("modules", o), a.setValue("sdkName", "web-core"), a.setValue("meetingId", r), a.setValue("apiBase", i.apiBase), a.setValue("baseURI", i.baseURI), a.setValue("userId", i.participantId), a.setValue("organizationId", i.orgId), a.setValue("authToken", e.authToken), a.setValue("overrides", (d = e.overrides) != null ? d : {}), a.setValue("env", lw({ baseURI: i.baseURI })), a.setValue("defaults", c), a.setValue("onError", e.onError || (() => {
    })), a.setValue("cachedUserDetails", Rs(e.cachedUserDetails)), a.setValue("sdkVersion", "1.2.0"), (l = e.modules) != null && l.experimentalAudioPlayback && a.setValue("audioPlayback", new YO()), a;
  }
  join() {
    return u(this, null, function* () {
      const { selfController: t } = n(this, Ge);
      return t.self.roomJoined ? null : t.joinRoom();
    });
  }
  leave(t) {
    return u(this, null, function* () {
      bg.cleanup(), n(this, tn).getValue("peerSessionStore").reset();
      const { selfController: e } = n(this, Ge);
      return e.leaveRoom(t);
    });
  }
  /**
   * The `participants` object consists of 4 maps of participants,
   * `waitlisted`, `joined`, `active`, `pinned`. The maps are indexed by
   * `peerId`s, and the values are the corresponding participant objects.
   */
  get participants() {
    var t;
    return (t = n(this, Ge).participantController) == null ? void 0 : t.participants;
  }
  /**
   * The `self` object can be used to manipulate audio and video settings,
   * and other configurations for the local participant. This exposes methods
   * to enable and disable media tracks, share the user's screen, etc.
   */
  get self() {
    var t;
    return (t = n(this, Ge).selfController) == null ? void 0 : t.self;
  }
  /**
   * The `room` object stores information about the current meeting, such
   * as chat messages, polls, room name, etc.
   */
  get meta() {
    var t;
    return (t = n(this, Ge).metaController) == null ? void 0 : t.meta;
  }
  /**
   * The `ai` object is used to interface with AI features.
   * You can obtain the live meeting transcript and use other meeting AI
   * features such as summary, and agenda using this object.
   */
  get ai() {
    var t;
    return (t = n(this, Ge).metaController) == null ? void 0 : t.ai;
  }
  /**
   * The `plugins` object stores information about the plugins available in
   * the current meeting. It exposes methods to activate and deactivate them.
   */
  get plugins() {
    var t;
    return (t = n(this, Ge).pluginController) == null ? void 0 : t.plugins;
  }
  /**
   * The chat object stores the chat messages that were sent in the meeting.
   * This includes text messages, images, and files.
   */
  get chat() {
    var t;
    return (t = n(this, Ge).chatController) == null ? void 0 : t.chat;
  }
  /**
   * The polls object stores the polls that were initiated in the meeting.
   * It exposes methods to create and vote on polls.
   */
  get polls() {
    var t;
    return (t = n(this, Ge).pollController) == null ? void 0 : t.polls;
  }
  /**
   * The connectedMeetings object stores the connected meetings states.
   * It exposes methods to create/read/update/delete methods for connected meetings.
   */
  get connectedMeetings() {
    var t;
    return (t = n(this, Ge).connectedMeetingsController) == null ? void 0 : t.connectedMeetings;
  }
  /*
   * The recording object stores the recording state of the meeting.
   * It exposes methods to start and stop recording.
   */
  get recording() {
    var t;
    return (t = n(this, Ge).recordingController) == null ? void 0 : t.recording;
  }
  get livestream() {
    var t;
    return (t = n(this, Ge).livestreamController) == null ? void 0 : t.livestream;
  }
  get stage() {
    var t;
    return (t = n(this, Ge).stageController) == null ? void 0 : t.stage;
  }
  get stores() {
    return n(this, Ge).storesManager;
  }
  get audio() {
    return n(this, tn).getValue("audioPlayback");
  }
  /**
   * The __internals__ object exposes the internal tools & utilities such as features and logger
   * so that client can utilise the same to build their own feature based UI.
   * Logger (__internals__.logger) can be used to send logs to servers
   *	to inform  of issues, if any, proactively.
   */
  get __internals__() {
    var t;
    return (t = n(this, Ge).internalsController) == null ? void 0 : t.internals;
  }
  /** @deprecated Use `join()` instead */
  joinRoom() {
    return u(this, null, function* () {
      return this.join();
    });
  }
  /** @deprecated Use `leave()` instead */
  leaveRoom(t) {
    return u(this, null, function* () {
      return this.leave(t);
    });
  }
}, Ge = new WeakMap(), tn = new WeakMap(), Kg);
Ql([
  ut("0002"),
  _r.executeWithLock({
    methodName: "meeting.join",
    lockName: "Client.join",
    timeout: 3e3
  })
], ti.prototype, "join", 1);
Ql([
  ut("0003")
], ti.prototype, "leave", 1);
Ql([
  ut("0001"),
  _r.executeWithLock({
    methodName: "Client.init",
    lockName: "Client.init",
    timeout: 3e3
  })
], ti, "init", 1);
ti = Ql([
  ut("0000")
], ti);
const ZO = ti;
export {
  ZO as default
};
