//#region \0rolldown/runtime.js
var e = Object.defineProperty, t = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, n = (t, n) => {
	let r = {};
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n || e(r, Symbol.toStringTag, { value: "Module" }), r;
};
//#endregion
//#region node_modules/custom-card-helpers/dist/index.m.js
function r(e) {
	return e.substr(0, e.indexOf("."));
}
function i(e) {
	return e !== void 0 && e.action !== "none";
}
function a(e, t, n) {
	if (t.has("config") || n) return !0;
	if (e.config.entity) {
		let n = t.get("hass");
		return !n || n.states[e.config.entity] !== e.hass.states[e.config.entity];
	}
	return !1;
}
var o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x = t((() => {
	(function(e) {
		e.language = "language", e.system = "system", e.comma_decimal = "comma_decimal", e.decimal_comma = "decimal_comma", e.space_comma = "space_comma", e.none = "none";
	})(o || (o = {})), (function(e) {
		e.language = "language", e.system = "system", e.am_pm = "12", e.twenty_four = "24";
	})(s || (s = {})), c = (e) => {
		switch (e.number_format) {
			case o.comma_decimal: return ["en-US", "en"];
			case o.decimal_comma: return [
				"de",
				"es",
				"it"
			];
			case o.space_comma: return [
				"fr",
				"sv",
				"cs"
			];
			case o.system: return;
			default: return e.language;
		}
	}, l = (e, t = 2) => Math.round(e * 10 ** t) / 10 ** t, u = (e, t, n) => {
		let r = t ? c(t) : void 0;
		if (Number.isNaN = Number.isNaN || function e(t) {
			return typeof t == "number" && e(t);
		}, t?.number_format !== o.none && !Number.isNaN(Number(e)) && Intl) try {
			return new Intl.NumberFormat(r, d(e, n)).format(Number(e));
		} catch (t) {
			return console.error(t), new Intl.NumberFormat(void 0, d(e, n)).format(Number(e));
		}
		return typeof e == "string" ? e : `${l(e, n?.maximumFractionDigits).toString()}${n?.style === "currency" ? ` ${n.currency}` : ""}`;
	}, d = (e, t) => {
		let n = Object.assign({ maximumFractionDigits: 2 }, t);
		if (typeof e != "string") return n;
		if (!t || !t.minimumFractionDigits && !t.maximumFractionDigits) {
			let t = e.indexOf(".") > -1 ? e.split(".")[1].length : 0;
			n.minimumFractionDigits = t, n.maximumFractionDigits = t;
		}
		return n;
	}, f = [
		"closed",
		"locked",
		"off"
	], p = (e, t, n, r) => {
		r = r || {}, n = n ?? {};
		let i = new Event(t, {
			bubbles: r.bubbles === void 0 || r.bubbles,
			cancelable: !!r.cancelable,
			composed: r.composed === void 0 || r.composed
		});
		return i.detail = n, e.dispatchEvent(i), i;
	}, m = () => {
		let e = document.querySelector("home-assistant");
		if (e = e && e.shadowRoot, e = e && e.querySelector("home-assistant-main"), e = e && e.shadowRoot, e = e && e.querySelector("app-drawer-layout partial-panel-resolver"), e = e && e.shadowRoot || e, e = e && e.querySelector("ha-panel-lovelace"), e = e && e.shadowRoot, e = e && e.querySelector("hui-root"), e) {
			let t = e.lovelace;
			return t.current_view = e.___curView, t;
		}
		return null;
	}, h = (e) => {
		p(window, "haptic", e);
	}, g = (e, t, n = !1) => {
		n ? history.replaceState(null, "", t) : history.pushState(null, "", t), p(window, "location-changed", { replace: n });
	}, _ = (e, t, n = !0) => {
		let i = r(t), a = i === "group" ? "homeassistant" : i, o;
		switch (i) {
			case "lock":
				o = n ? "unlock" : "lock";
				break;
			case "cover":
				o = n ? "open_cover" : "close_cover";
				break;
			default: o = n ? "turn_on" : "turn_off";
		}
		return e.callService(a, o, { entity_id: t });
	}, v = (e, t) => {
		let n = f.includes(e.states[t].state);
		return _(e, t, n);
	}, y = (e, t, n, r) => {
		if (r || (r = { action: "more-info" }), !(r.confirmation && (!r.confirmation.exemptions || !r.confirmation.exemptions.some((e) => e.user === t.user.id)) && (h("warning"), !confirm(r.confirmation.text || `Are you sure you want to ${r.action}?`)))) switch (r.action) {
			case "more-info":
				(n.entity || n.camera_image) && p(e, "hass-more-info", { entityId: n.entity ? n.entity : n.camera_image });
				break;
			case "navigate":
				r.navigation_path && g(e, r.navigation_path);
				break;
			case "url":
				r.url_path && window.open(r.url_path);
				break;
			case "toggle":
				n.entity && (v(t, n.entity), h("success"));
				break;
			case "call-service": {
				if (!r.service) {
					h("failure");
					return;
				}
				let [e, n] = r.service.split(".", 2);
				t.callService(e, n, r.service_data, r.target), h("success");
				break;
			}
			case "fire-dom-event": p(e, "ll-custom", r);
		}
	}, b = (e, t, n, r) => {
		let i;
		r === "double_tap" && n.double_tap_action ? i = n.double_tap_action : r === "hold" && n.hold_action ? i = n.hold_action : r === "tap" && n.tap_action && (i = n.tap_action), y(e, t, n, i);
	};
}));
//#endregion
//#region node_modules/is-valid-css-color/dist/index.js
x();
var S = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?`, C = `(?:${S}%?|none)`, w = `(?:${S}(?:deg|grad|rad|turn)?|none)`, T = `(?:${String.raw`${S}\s*,\s*${S}\s*,\s*${S}`}|${String.raw`${S}%\s*,\s*${S}%\s*,\s*${S}%`})${String.raw`(?:\s*,\s*${S}%?)?`}`, E = `(?:${S}%?|none)`, D = String.raw`(?:\s*\/\s*${E})?`, O = String.raw`${E}\s+${E}\s+${E}${D}`, k = new RegExp(String.raw`^rgba?\(\s*(?:${T})\s*\)$`, "i"), A = new RegExp(String.raw`^rgba?\(\s*(?:${O})\s*\)$`, "i"), j = (e) => typeof e == "string" && (e = e.trim(), k.test(e) || A.test(e)), M = `(?:${S}(?:deg|grad|rad|turn)?)`, N = `(?:${S}%)`, ee = `(?:${S}%?)`, P = String.raw`${M}\s*,\s*${N}\s*,\s*${N}(?:\s*,\s*${ee})?`, te = String.raw`${w}\s+${C}\s+${C}(?:\s*\/\s*${C})?`, F = new RegExp(String.raw`^hsla?\(\s*${P}\s*\)$`, "i"), ne = new RegExp(String.raw`^hsla?\(\s*${te}\s*\)$`, "i"), re = (e) => typeof e == "string" && (e = e.trim(), F.test(e) || ne.test(e)), ie = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}(?:[0-9a-f]{2})?)$/i, ae = (e) => typeof e == "string" && ie.test(e.trim()), oe = new RegExp(String.raw`^hwb\(\s*${w}\s+${C}\s+${C}\s*(?:\/\s*${C}\s*)?\)$`, "i"), se = (e) => typeof e == "string" && oe.test(e.trim()), ce = new RegExp(String.raw`^lab\(\s*${C}\s+${C}\s+${C}(?:\s*\/\s*${C})?\s*\)$`, "i"), le = (e) => typeof e == "string" && ce.test(e.trim()), ue = new RegExp(String.raw`^lch\(\s*${C}\s+${C}\s+${w}\s*(?:\/\s*${C}\s*)?\)$`, "i"), de = (e) => typeof e == "string" && ue.test(e.trim()), fe = new RegExp(String.raw`^oklab\(\s*${C}\s+${C}\s+${C}(?:\s*\/\s*${C})?\s*\)$`, "i"), pe = (e) => typeof e == "string" && fe.test(e.trim()), me = new RegExp(String.raw`^oklch\(\s*${C}\s+${C}\s+${w}\s*(?:\/\s*${C}\s*)?\)$`, "i"), he = (e) => typeof e == "string" && me.test(e.trim()), ge = /* @__PURE__ */ new Set(/* @__PURE__ */ "accentcolor.accentcolortext.activeborder.activecaption.activetext.aliceblue.antiquewhite.appworkspace.aqua.aquamarine.azure.background.beige.bisque.black.blanchedalmond.blue.blueviolet.brown.burlywood.buttonborder.buttonface.buttonhighlight.buttonshadow.buttontext.cadetblue.canvas.canvastext.captiontext.chartreuse.chocolate.coral.cornflowerblue.cornsilk.crimson.currentcolor.cyan.darkblue.darkcyan.darkgoldenrod.darkgray.darkgreen.darkgrey.darkkhaki.darkmagenta.darkolivegreen.darkorange.darkorchid.darkred.darksalmon.darkseagreen.darkslateblue.darkslategray.darkslategrey.darkturquoise.darkviolet.deeppink.deepskyblue.dimgray.dimgrey.dodgerblue.field.fieldtext.firebrick.floralwhite.forestgreen.fuchsia.gainsboro.ghostwhite.gold.goldenrod.gray.graytext.green.greenyellow.grey.highlight.highlighttext.honeydew.hotpink.inactiveborder.inactivecaption.inactivecaptiontext.indianred.indigo.infobackground.infotext.ivory.khaki.lavender.lavenderblush.lawngreen.lemonchiffon.lightblue.lightcoral.lightcyan.lightgoldenrodyellow.lightgray.lightgreen.lightgrey.lightpink.lightsalmon.lightseagreen.lightskyblue.lightslategray.lightslategrey.lightsteelblue.lightyellow.lime.limegreen.linen.linktext.magenta.mark.marktext.maroon.mediumaquamarine.mediumblue.mediumorchid.mediumpurple.mediumseagreen.mediumslateblue.mediumspringgreen.mediumturquoise.mediumvioletred.menu.menutext.midnightblue.mintcream.mistyrose.moccasin.navajowhite.navy.oldlace.olive.olivedrab.orange.orangered.orchid.palegoldenrod.palegreen.paleturquoise.palevioletred.papayawhip.peachpuff.peru.pink.plum.powderblue.purple.rebeccapurple.red.rosybrown.royalblue.saddlebrown.salmon.sandybrown.scrollbar.seagreen.seashell.selecteditem.selecteditemtext.sienna.silver.skyblue.slateblue.slategray.slategrey.snow.springgreen.steelblue.tan.teal.thistle.threeddarkshadow.threedface.threedhighlight.threedlightshadow.threedshadow.tomato.transparent.turquoise.violet.visitedtext.wheat.white.whitesmoke.window.windowframe.windowtext.yellow.yellowgreen".split(".")), _e = (e) => typeof e == "string" && ge.has(e.trim().toLowerCase()), I = new RegExp(String.raw`^color\(\s*${"(?:srgb(?:-linear)?|display-p3(?:-linear)?|a98-rgb|prophoto-rgb|rec2020|xyz(?:-d(?:50|65))?)"}\s+${C}\s+${C}\s+${C}(?:\s*\/\s*${C})?\s*\)$`, "i"), ve = (e) => typeof e == "string" && I.test(e.trim()), ye = (e) => {
	if (typeof e != "string") return !1;
	let t = e.trim();
	if (t.length === 0) return !1;
	if (t[0] === "#") return ae(t);
	if (!t.includes("(")) return _e(t);
	switch (t[0]) {
		case "r":
		case "R": return j(t);
		case "c":
		case "C": return ve(t);
		case "h":
		case "H": return se(t) || re(t);
		case "l":
		case "L": return le(t) || de(t);
		case "o":
		case "O": return pe(t) || he(t);
		default: return !1;
	}
}, be, L, xe, Se, Ce, we, Te, Ee, De = t((() => {
	be = globalThis, L = be.ShadowRoot && (be.ShadyCSS === void 0 || be.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, xe = Symbol(), Se = /* @__PURE__ */ new WeakMap(), Ce = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== xe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (L && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = Se.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Se.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, we = (e) => new Ce(typeof e == "string" ? e : e + "", void 0, xe), Te = (e, t) => {
		if (L) e.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
		else for (let n of t) {
			let t = document.createElement("style"), r = be.litNonce;
			r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
		}
	}, Ee = L ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return we(t);
	})(e) : e;
})), Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We = t((() => {
	De(), {is: ke, defineProperty: Ae, getOwnPropertyDescriptor: je, getOwnPropertyNames: Me, getOwnPropertySymbols: Ne, getPrototypeOf: Pe} = Object, Fe = globalThis, Ie = Fe.trustedTypes, Le = Ie ? Ie.emptyScript : "", Re = Fe.reactiveElementPolyfillSupport, ze = (e, t) => e, Be = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? Le : null;
					break;
				case Object:
				case Array: e = e == null ? e : JSON.stringify(e);
			}
			return e;
		},
		fromAttribute(e, t) {
			let n = e;
			switch (t) {
				case Boolean:
					n = e !== null;
					break;
				case Number:
					n = e === null ? null : Number(e);
					break;
				case Object:
				case Array: try {
					n = JSON.parse(e);
				} catch {
					n = null;
				}
			}
			return n;
		}
	}, Ve = (e, t) => !ke(e, t), He = {
		attribute: !0,
		type: String,
		converter: Be,
		reflect: !1,
		useDefault: !1,
		hasChanged: Ve
	}, (Oe = Symbol).metadata ?? (Oe.metadata = Symbol("metadata")), Fe.litPropertyMetadata ?? (Fe.litPropertyMetadata = /* @__PURE__ */ new WeakMap()), Ue = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ?? (this.l = [])).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = He) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && Ae(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = je(this.prototype, e) ?? {
				get() {
					return this[t];
				},
				set(e) {
					this[t] = e;
				}
			};
			return {
				get: r,
				set(t) {
					let a = r?.call(this);
					i?.call(this, t), this.requestUpdate(e, a, n);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(e) {
			return this.elementProperties.get(e) ?? He;
		}
		static _$Ei() {
			if (this.hasOwnProperty(ze("elementProperties"))) return;
			let e = Pe(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(ze("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ze("properties"))) {
				let e = this.properties, t = [...Me(e), ...Ne(e)];
				for (let n of t) this.createProperty(n, e[n]);
			}
			let e = this[Symbol.metadata];
			if (e !== null) {
				let t = litPropertyMetadata.get(e);
				if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [e, t] of this.elementProperties) {
				let n = this._$Eu(e, t);
				n !== void 0 && this._$Eh.set(n, e);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(e) {
			let t = [];
			if (Array.isArray(e)) {
				let n = new Set(e.flat(1 / 0).reverse());
				for (let e of n) t.unshift(Ee(e));
			} else e !== void 0 && t.push(Ee(e));
			return t;
		}
		static _$Eu(e, t) {
			let n = t.attribute;
			return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
		}
		addController(e) {
			(this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
		}
		removeController(e) {
			this._$EO?.delete(e);
		}
		_$E_() {
			let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
			for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
			e.size > 0 && (this._$Ep = e);
		}
		createRenderRoot() {
			let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return Te(e, this.constructor.elementStyles), e;
		}
		connectedCallback() {
			this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
		}
		enableUpdating(e) {}
		disconnectedCallback() {
			this._$EO?.forEach(((e) => e.hostDisconnected?.()));
		}
		attributeChangedCallback(e, t, n) {
			this._$AK(e, n);
		}
		_$ET(e, t) {
			let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
			if (r !== void 0 && !0 === n.reflect) {
				let i = (n.converter?.toAttribute === void 0 ? Be : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? Be : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n) {
			if (e !== void 0) {
				let r = this.constructor, i = this[e];
				if (n ?? (n = r.getPropertyOptions(e)), !((n.hasChanged ?? Ve)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, n)))) return;
				this.C(e, t, n);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
			n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (e) {
				Promise.reject(e);
			}
			let e = this.scheduleUpdate();
			return e != null && await e, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
					for (let [e, t] of this._$Ep) this[e] = t;
					this._$Ep = void 0;
				}
				let e = this.constructor.elementProperties;
				if (e.size > 0) for (let [t, n] of e) {
					let { wrapped: e } = n, r = this[t];
					!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
				}
			}
			let e = !1, t = this._$AL;
			try {
				e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach(((e) => e.hostUpdate?.())), this.update(t)) : this._$EM();
			} catch (t) {
				throw e = !1, this._$EM(), t;
			}
			e && this._$AE(t);
		}
		willUpdate(e) {}
		_$AE(e) {
			this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
		}
		_$EM() {
			this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(e) {
			return !0;
		}
		update(e) {
			this._$Eq && (this._$Eq = this._$Eq.forEach(((e) => this._$ET(e, this[e])))), this._$EM();
		}
		updated(e) {}
		firstUpdated(e) {}
	}, Ue.elementStyles = [], Ue.shadowRootOptions = { mode: "open" }, Ue[ze("elementProperties")] = /* @__PURE__ */ new Map(), Ue[ze("finalized")] = /* @__PURE__ */ new Map(), Re?.({ ReactiveElement: Ue }), (Fe.reactiveElementVersions ?? (Fe.reactiveElementVersions = [])).push("2.1.1");
}));
//#endregion
//#region node_modules/lit-html/lit-html.js
function Ge(e, t) {
	if (!nt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return Ye === void 0 ? t : Ye.createHTML(t);
}
function Ke(e, t, n = e, r) {
	if (t === V) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = tt(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ?? (n._$Co = []))[r] = i), i !== void 0 && (t = Ke(e, i._$AS(e, t.values), i, r)), t;
}
var qe, Je, Ye, Xe, R, Ze, Qe, $e, et, tt, nt, rt, it, at, ot, st, ct, lt, ut, dt, ft, z, B, V, H, pt, mt, ht, gt, _t, vt, yt, bt, xt, St, Ct, wt, Tt, Et, Dt = t((() => {
	qe = globalThis, Je = qe.trustedTypes, Ye = Je ? Je.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Xe = "$lit$", R = `lit$${Math.random().toFixed(9).slice(2)}$`, Ze = "?" + R, Qe = `<${Ze}>`, $e = document, et = () => $e.createComment(""), tt = (e) => e === null || typeof e != "object" && typeof e != "function", nt = Array.isArray, rt = (e) => nt(e) || typeof e?.[Symbol.iterator] == "function", it = "[ 	\n\f\r]", at = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ot = /-->/g, st = />/g, ct = RegExp(`>|${it}(?:([^\\s"'>=/]+)(${it}*=${it}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), lt = /'/g, ut = /"/g, dt = /^(?:script|style|textarea|title)$/i, ft = (e) => (t, ...n) => ({
		_$litType$: e,
		strings: t,
		values: n
	}), z = ft(1), B = ft(2), ft(3), V = Symbol.for("lit-noChange"), H = Symbol.for("lit-nothing"), pt = /* @__PURE__ */ new WeakMap(), mt = $e.createTreeWalker($e, 129), ht = (e, t) => {
		let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = at;
		for (let t = 0; t < n; t++) {
			let n = e[t], s, c, l = -1, u = 0;
			for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === at ? c[1] === "!--" ? o = ot : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = ct) : (dt.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = ct) : o = st : o === ct ? c[0] === ">" ? (o = i ?? at, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? ct : c[3] === "\"" ? ut : lt) : o === ut || o === lt ? o = ct : o === ot || o === st ? o = at : (o = ct, i = void 0);
			let d = o === ct && e[t + 1].startsWith("/>") ? " " : "";
			a += o === at ? n + Qe : l >= 0 ? (r.push(s), n.slice(0, l) + Xe + n.slice(l) + R + d) : n + R + (l === -2 ? t : d);
		}
		return [Ge(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
	}, gt = class e {
		constructor({ strings: t, _$litType$: n }, r) {
			let i;
			this.parts = [];
			let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = ht(t, n);
			if (this.el = e.createElement(l, r), mt.currentNode = this.el.content, n === 2 || n === 3) {
				let e = this.el.content.firstChild;
				e.replaceWith(...e.childNodes);
			}
			for (; (i = mt.nextNode()) !== null && c.length < s;) {
				if (i.nodeType === 1) {
					if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(Xe)) {
						let t = u[o++], n = i.getAttribute(e).split(R), r = /([.?@])?(.*)/.exec(t);
						c.push({
							type: 1,
							index: a,
							name: r[2],
							strings: n,
							ctor: r[1] === "." ? bt : r[1] === "?" ? xt : r[1] === "@" ? St : yt
						}), i.removeAttribute(e);
					} else e.startsWith(R) && (c.push({
						type: 6,
						index: a
					}), i.removeAttribute(e));
					if (dt.test(i.tagName)) {
						let e = i.textContent.split(R), t = e.length - 1;
						if (t > 0) {
							i.textContent = Je ? Je.emptyScript : "";
							for (let n = 0; n < t; n++) i.append(e[n], et()), mt.nextNode(), c.push({
								type: 2,
								index: ++a
							});
							i.append(e[t], et());
						}
					}
				} else if (i.nodeType === 8) {
					if (i.data === Ze) c.push({
						type: 2,
						index: a
					});
					else {
						let e = -1;
						for (; (e = i.data.indexOf(R, e + 1)) !== -1;) c.push({
							type: 7,
							index: a
						}), e += R.length - 1;
					}
				}
				a++;
			}
		}
		static createElement(e, t) {
			let n = $e.createElement("template");
			return n.innerHTML = e, n;
		}
	}, _t = class {
		constructor(e, t) {
			this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
		}
		get parentNode() {
			return this._$AM.parentNode;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		u(e) {
			let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? $e).importNode(t, !0);
			mt.currentNode = r;
			let i = mt.nextNode(), a = 0, o = 0, s = n[0];
			for (; s !== void 0;) {
				if (a === s.index) {
					let t;
					s.type === 2 ? t = new vt(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new Ct(i, this, e)), this._$AV.push(t), s = n[++o];
				}
				a !== s?.index && (i = mt.nextNode(), a++);
			}
			return mt.currentNode = $e, r;
		}
		p(e) {
			let t = 0;
			for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
		}
	}, vt = class e {
		get _$AU() {
			return this._$AM?._$AU ?? this._$Cv;
		}
		constructor(e, t, n, r) {
			this.type = 2, this._$AH = H, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
		}
		get parentNode() {
			let e = this._$AA.parentNode, t = this._$AM;
			return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
		}
		get startNode() {
			return this._$AA;
		}
		get endNode() {
			return this._$AB;
		}
		_$AI(e, t = this) {
			e = Ke(this, e, t), tt(e) ? e === H || e == null || e === "" ? (this._$AH !== H && this._$AR(), this._$AH = H) : e !== this._$AH && e !== V && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? rt(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
		}
		O(e) {
			return this._$AA.parentNode.insertBefore(e, this._$AB);
		}
		T(e) {
			this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
		}
		_(e) {
			this._$AH !== H && tt(this._$AH) ? this._$AA.nextSibling.data = e : this.T($e.createTextNode(e)), this._$AH = e;
		}
		$(e) {
			let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = gt.createElement(Ge(n.h, n.h[0]), this.options)), n);
			if (this._$AH?._$AD === r) this._$AH.p(t);
			else {
				let e = new _t(r, this), n = e.u(this.options);
				e.p(t), this.T(n), this._$AH = e;
			}
		}
		_$AC(e) {
			let t = pt.get(e.strings);
			return t === void 0 && pt.set(e.strings, t = new gt(e)), t;
		}
		k(t) {
			nt(this._$AH) || (this._$AH = [], this._$AR());
			let n = this._$AH, r, i = 0;
			for (let a of t) i === n.length ? n.push(r = new e(this.O(et()), this.O(et()), this, this.options)) : r = n[i], r._$AI(a), i++;
			i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
		}
		_$AR(e = this._$AA.nextSibling, t) {
			for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
				let t = e.nextSibling;
				e.remove(), e = t;
			}
		}
		setConnected(e) {
			this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
		}
	}, yt = class {
		get tagName() {
			return this.element.tagName;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		constructor(e, t, n, r, i) {
			this.type = 1, this._$AH = H, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = H;
		}
		_$AI(e, t = this, n, r) {
			let i = this.strings, a = !1;
			if (i === void 0) e = Ke(this, e, t, 0), a = !tt(e) || e !== this._$AH && e !== V, a && (this._$AH = e);
			else {
				let r = e, o, s;
				for (e = i[0], o = 0; o < i.length - 1; o++) s = Ke(this, r[n + o], t, o), s === V && (s = this._$AH[o]), a || (a = !tt(s) || s !== this._$AH[o]), s === H ? e = H : e !== H && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
			}
			a && !r && this.j(e);
		}
		j(e) {
			e === H ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
		}
	}, bt = class extends yt {
		constructor() {
			super(...arguments), this.type = 3;
		}
		j(e) {
			this.element[this.name] = e === H ? void 0 : e;
		}
	}, xt = class extends yt {
		constructor() {
			super(...arguments), this.type = 4;
		}
		j(e) {
			this.element.toggleAttribute(this.name, !!e && e !== H);
		}
	}, St = class extends yt {
		constructor(e, t, n, r, i) {
			super(e, t, n, r, i), this.type = 5;
		}
		_$AI(e, t = this) {
			if ((e = Ke(this, e, t, 0) ?? H) === V) return;
			let n = this._$AH, r = e === H && n !== H || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== H && (n === H || r);
			r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
		}
		handleEvent(e) {
			typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
		}
	}, Ct = class {
		constructor(e, t, n) {
			this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
		}
		get _$AU() {
			return this._$AM._$AU;
		}
		_$AI(e) {
			Ke(this, e);
		}
	}, wt = {
		M: Xe,
		P: R,
		A: Ze,
		C: 1,
		L: ht,
		R: _t,
		D: rt,
		V: Ke,
		I: vt,
		H: yt,
		N: xt,
		U: St,
		B: bt,
		F: Ct
	}, Tt = qe.litHtmlPolyfillSupport, Tt?.(gt, vt), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.1"), Et = (e, t, n) => {
		let r = n?.renderBefore ?? t, i = r._$litPart$;
		if (i === void 0) {
			let e = n?.renderBefore ?? null;
			r._$litPart$ = i = new vt(t.insertBefore(et(), e), e, void 0, n ?? {});
		}
		return i._$AI(e), i;
	};
})), Ot, kt, At, jt, Mt, Nt, Pt, Ft, It, Lt = t((() => {
	Ot = globalThis, kt = Ot.ShadowRoot && (Ot.ShadyCSS === void 0 || Ot.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = Symbol(), jt = /* @__PURE__ */ new WeakMap(), Mt = class {
		constructor(e, t, n) {
			if (this._$cssResult$ = !0, n !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
			this.cssText = e, this.t = t;
		}
		get styleSheet() {
			let e = this.o, t = this.t;
			if (kt && e === void 0) {
				let n = t !== void 0 && t.length === 1;
				n && (e = jt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && jt.set(t, e));
			}
			return e;
		}
		toString() {
			return this.cssText;
		}
	}, Nt = (e) => new Mt(typeof e == "string" ? e : e + "", void 0, At), Pt = (e, ...t) => {
		let n = e.length === 1 ? e[0] : t.reduce(((t, n, r) => t + ((e) => {
			if (!0 === e._$cssResult$) return e.cssText;
			if (typeof e == "number") return e;
			throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
		})(n) + e[r + 1]), e[0]);
		return new Mt(n, e, At);
	}, Ft = (e, t) => {
		if (kt) e.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
		else for (let n of t) {
			let t = document.createElement("style"), r = Ot.litNonce;
			r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
		}
	}, It = kt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
		let t = "";
		for (let n of e.cssRules) t += n.cssText;
		return Nt(t);
	})(e) : e;
})), Rt, zt, Bt, Vt, Ht, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en = t((() => {
	Lt(), {is: zt, defineProperty: Bt, getOwnPropertyDescriptor: Vt, getOwnPropertyNames: Ht, getOwnPropertySymbols: Ut, getPrototypeOf: Wt} = Object, Gt = globalThis, Kt = Gt.trustedTypes, qt = Kt ? Kt.emptyScript : "", Jt = Gt.reactiveElementPolyfillSupport, Yt = (e, t) => e, Xt = {
		toAttribute(e, t) {
			switch (t) {
				case Boolean:
					e = e ? qt : null;
					break;
				case Object:
				case Array: e = e == null ? e : JSON.stringify(e);
			}
			return e;
		},
		fromAttribute(e, t) {
			let n = e;
			switch (t) {
				case Boolean:
					n = e !== null;
					break;
				case Number:
					n = e === null ? null : Number(e);
					break;
				case Object:
				case Array: try {
					n = JSON.parse(e);
				} catch {
					n = null;
				}
			}
			return n;
		}
	}, Zt = (e, t) => !zt(e, t), Qt = {
		attribute: !0,
		type: String,
		converter: Xt,
		reflect: !1,
		useDefault: !1,
		hasChanged: Zt
	}, (Rt = Symbol).metadata ?? (Rt.metadata = Symbol("metadata")), Gt.litPropertyMetadata ?? (Gt.litPropertyMetadata = /* @__PURE__ */ new WeakMap()), $t = class extends HTMLElement {
		static addInitializer(e) {
			this._$Ei(), (this.l ?? (this.l = [])).push(e);
		}
		static get observedAttributes() {
			return this.finalize(), this._$Eh && [...this._$Eh.keys()];
		}
		static createProperty(e, t = Qt) {
			if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
				let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
				r !== void 0 && Bt(this.prototype, e, r);
			}
		}
		static getPropertyDescriptor(e, t, n) {
			let { get: r, set: i } = Vt(this.prototype, e) ?? {
				get() {
					return this[t];
				},
				set(e) {
					this[t] = e;
				}
			};
			return {
				get: r,
				set(t) {
					let a = r?.call(this);
					i?.call(this, t), this.requestUpdate(e, a, n);
				},
				configurable: !0,
				enumerable: !0
			};
		}
		static getPropertyOptions(e) {
			return this.elementProperties.get(e) ?? Qt;
		}
		static _$Ei() {
			if (this.hasOwnProperty(Yt("elementProperties"))) return;
			let e = Wt(this);
			e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
		}
		static finalize() {
			if (this.hasOwnProperty(Yt("finalized"))) return;
			if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Yt("properties"))) {
				let e = this.properties, t = [...Ht(e), ...Ut(e)];
				for (let n of t) this.createProperty(n, e[n]);
			}
			let e = this[Symbol.metadata];
			if (e !== null) {
				let t = litPropertyMetadata.get(e);
				if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
			}
			this._$Eh = /* @__PURE__ */ new Map();
			for (let [e, t] of this.elementProperties) {
				let n = this._$Eu(e, t);
				n !== void 0 && this._$Eh.set(n, e);
			}
			this.elementStyles = this.finalizeStyles(this.styles);
		}
		static finalizeStyles(e) {
			let t = [];
			if (Array.isArray(e)) {
				let n = new Set(e.flat(1 / 0).reverse());
				for (let e of n) t.unshift(It(e));
			} else e !== void 0 && t.push(It(e));
			return t;
		}
		static _$Eu(e, t) {
			let n = t.attribute;
			return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
		}
		constructor() {
			super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
		}
		_$Ev() {
			this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
		}
		addController(e) {
			(this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
		}
		removeController(e) {
			this._$EO?.delete(e);
		}
		_$E_() {
			let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
			for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
			e.size > 0 && (this._$Ep = e);
		}
		createRenderRoot() {
			let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
			return Ft(e, this.constructor.elementStyles), e;
		}
		connectedCallback() {
			this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
		}
		enableUpdating(e) {}
		disconnectedCallback() {
			this._$EO?.forEach(((e) => e.hostDisconnected?.()));
		}
		attributeChangedCallback(e, t, n) {
			this._$AK(e, n);
		}
		_$ET(e, t) {
			let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
			if (r !== void 0 && !0 === n.reflect) {
				let i = (n.converter?.toAttribute === void 0 ? Xt : n.converter).toAttribute(t, n.type);
				this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
			}
		}
		_$AK(e, t) {
			let n = this.constructor, r = n._$Eh.get(e);
			if (r !== void 0 && this._$Em !== r) {
				let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? Xt : e.converter;
				this._$Em = r;
				let a = i.fromAttribute(t, e.type);
				this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
			}
		}
		requestUpdate(e, t, n) {
			if (e !== void 0) {
				let r = this.constructor, i = this[e];
				if (n ?? (n = r.getPropertyOptions(e)), !((n.hasChanged ?? Zt)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, n)))) return;
				this.C(e, t, n);
			}
			!1 === this.isUpdatePending && (this._$ES = this._$EP());
		}
		C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
			n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
		}
		async _$EP() {
			this.isUpdatePending = !0;
			try {
				await this._$ES;
			} catch (e) {
				Promise.reject(e);
			}
			let e = this.scheduleUpdate();
			return e != null && await e, !this.isUpdatePending;
		}
		scheduleUpdate() {
			return this.performUpdate();
		}
		performUpdate() {
			if (!this.isUpdatePending) return;
			if (!this.hasUpdated) {
				if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
					for (let [e, t] of this._$Ep) this[e] = t;
					this._$Ep = void 0;
				}
				let e = this.constructor.elementProperties;
				if (e.size > 0) for (let [t, n] of e) {
					let { wrapped: e } = n, r = this[t];
					!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
				}
			}
			let e = !1, t = this._$AL;
			try {
				e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach(((e) => e.hostUpdate?.())), this.update(t)) : this._$EM();
			} catch (t) {
				throw e = !1, this._$EM(), t;
			}
			e && this._$AE(t);
		}
		willUpdate(e) {}
		_$AE(e) {
			this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
		}
		_$EM() {
			this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
		}
		get updateComplete() {
			return this.getUpdateComplete();
		}
		getUpdateComplete() {
			return this._$ES;
		}
		shouldUpdate(e) {
			return !0;
		}
		update(e) {
			this._$Eq && (this._$Eq = this._$Eq.forEach(((e) => this._$ET(e, this[e])))), this._$EM();
		}
		updated(e) {}
		firstUpdated(e) {}
	}, $t.elementStyles = [], $t.shadowRootOptions = { mode: "open" }, $t[Yt("elementProperties")] = /* @__PURE__ */ new Map(), $t[Yt("finalized")] = /* @__PURE__ */ new Map(), Jt?.({ ReactiveElement: $t }), (Gt.reactiveElementVersions ?? (Gt.reactiveElementVersions = [])).push("2.1.1");
})), tn, nn, rn, an = t((() => {
	en(), en(), Dt(), Dt(), tn = globalThis, nn = class extends $t {
		constructor() {
			super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
		}
		createRenderRoot() {
			var e;
			let t = super.createRenderRoot();
			return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
		}
		update(e) {
			let t = this.render();
			this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Et(t, this.renderRoot, this.renderOptions);
		}
		connectedCallback() {
			super.connectedCallback(), this._$Do?.setConnected(!0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this._$Do?.setConnected(!1);
		}
		render() {
			return V;
		}
	}, nn._$litElement$ = !0, nn.finalized = !0, tn.litElementHydrateSupport?.({ LitElement: nn }), rn = tn.litElementPolyfillSupport, rn?.({ LitElement: nn }), (tn.litElementVersions ?? (tn.litElementVersions = [])).push("4.2.1");
})), on = t((() => {})), sn = t((() => {
	We(), Dt(), an(), on();
})), cn, ln = t((() => {
	cn = (e) => (t, n) => {
		n === void 0 ? customElements.define(e, t) : n.addInitializer((() => {
			customElements.define(e, t);
		}));
	};
}));
//#endregion
//#region node_modules/lit/node_modules/@lit/reactive-element/decorators/property.js
function U(e) {
	return (t, n) => typeof n == "object" ? dn(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
var un, dn, fn = t((() => {
	We(), un = {
		attribute: !0,
		type: String,
		converter: Be,
		reflect: !1,
		hasChanged: Ve
	}, dn = (e = un, t, n) => {
		let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
		if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
			let { name: r } = n;
			return {
				set(n) {
					let i = t.get.call(this);
					t.set.call(this, n), this.requestUpdate(r, i, e);
				},
				init(t) {
					return t !== void 0 && this.C(r, void 0, e, t), t;
				}
			};
		}
		if (r === "setter") {
			let { name: r } = n;
			return function(n) {
				let i = this[r];
				t.call(this, n), this.requestUpdate(r, i, e);
			};
		}
		throw Error("Unsupported decorator location: " + r);
	};
}));
//#endregion
//#region node_modules/lit/node_modules/@lit/reactive-element/decorators/state.js
function pn(e) {
	return U({
		...e,
		state: !0,
		attribute: !1
	});
}
var mn = t((() => {
	fn();
})), hn = t((() => {})), gn = t((() => {})), _n = t((() => {})), vn = t((() => {})), yn = t((() => {})), bn = t((() => {})), xn = t((() => {
	ln(), fn(), mn(), hn(), gn(), _n(), vn(), yn(), bn();
}));
sn(), xn(), Dt();
var { I: Sn } = wt, Cn = (e) => e === null || typeof e != "object" && typeof e != "function", wn = (e) => e.strings === void 0, Tn = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, En = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), Dn = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, On = (e, t) => {
	let n = e._$AN;
	if (n === void 0) return !1;
	for (let e of n) e._$AO?.(t, !1), On(e, t);
	return !0;
}, kn = (e) => {
	let t, n;
	do {
		if ((t = e._$AM) === void 0) break;
		n = t._$AN, n.delete(e), e = t;
	} while (n?.size === 0);
}, An = (e) => {
	for (let t; t = e._$AM; e = t) {
		let n = t._$AN;
		if (n === void 0) t._$AN = n = /* @__PURE__ */ new Set();
		else if (n.has(e)) break;
		n.add(e), Nn(t);
	}
};
function jn(e) {
	this._$AN === void 0 ? this._$AM = e : (kn(this), this._$AM = e, An(this));
}
function Mn(e, t = !1, n = 0) {
	let r = this._$AH, i = this._$AN;
	if (i !== void 0 && i.size !== 0) {
		if (t) {
			if (Array.isArray(r)) for (let e = n; e < r.length; e++) On(r[e], !1), kn(r[e]);
			else r != null && (On(r, !1), kn(r));
		} else On(this, e);
	}
}
var Nn = (e) => {
	e.type == Tn.CHILD && (e._$AP ?? (e._$AP = Mn), e._$AQ ?? (e._$AQ = jn));
}, Pn = class extends Dn {
	constructor() {
		super(...arguments), this._$AN = void 0;
	}
	_$AT(e, t, n) {
		super._$AT(e, t, n), An(this), this.isConnected = e._$AU;
	}
	_$AO(e, t = !0) {
		e !== this.isConnected && (this.isConnected = e, e ? this.reconnected?.() : this.disconnected?.()), t && (On(this, e), kn(this));
	}
	setValue(e) {
		if (wn(this._$Ct)) this._$Ct._$AI(e, this);
		else {
			let t = [...this._$Ct._$AH];
			t[this._$Ci] = e, this._$Ct._$AI(t, this, 0);
		}
	}
	disconnected() {}
	reconnected() {}
}, Fn = class {
	constructor(e) {
		this.G = e;
	}
	disconnect() {
		this.G = void 0;
	}
	reconnect(e) {
		this.G = e;
	}
	deref() {
		return this.G;
	}
}, In = class {
	constructor() {
		this.Y = void 0, this.Z = void 0;
	}
	get() {
		return this.Y;
	}
	pause() {
		this.Y ?? (this.Y = new Promise(((e) => this.Z = e)));
	}
	resume() {
		this.Z?.(), this.Y = this.Z = void 0;
	}
};
//#endregion
//#region node_modules/lit-html/directives/until.js
Dt();
var Ln = (e) => !Cn(e) && typeof e.then == "function", Rn = 1073741823, zn = En(class extends Pn {
	constructor() {
		super(...arguments), this._$Cwt = Rn, this._$Cbt = [], this._$CK = new Fn(this), this._$CX = new In();
	}
	render(...e) {
		return e.find(((e) => !Ln(e))) ?? V;
	}
	update(e, t) {
		let n = this._$Cbt, r = n.length;
		this._$Cbt = t;
		let i = this._$CK, a = this._$CX;
		this.isConnected || this.disconnected();
		for (let e = 0; e < t.length && !(e > this._$Cwt); e++) {
			let o = t[e];
			if (!Ln(o)) return this._$Cwt = e, o;
			e < r && o === n[e] || (this._$Cwt = Rn, r = 0, Promise.resolve(o).then((async (e) => {
				for (; a.get();) await a.get();
				let t = i.deref();
				if (t !== void 0) {
					let n = t._$Cbt.indexOf(o);
					n > -1 && n < t._$Cwt && (t._$Cwt = n, t.setValue(e));
				}
			})));
		}
		return V;
	}
	disconnected() {
		this._$CK.disconnect(), this._$CX.pause();
	}
	reconnected() {
		this._$CK.reconnect(this), this._$CX.resume();
	}
}), Bn = "7.2.0", Vn = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0, Hn = class extends HTMLElement {
	constructor() {
		super(), this.holdTime = 500, this.held = !1, this.ripple = document.createElement("mwc-ripple");
	}
	connectedCallback() {
		Object.assign(this.style, {
			position: "absolute",
			width: Vn ? "100px" : "50px",
			height: Vn ? "100px" : "50px",
			transform: "translate(-50%, -50%)",
			pointerEvents: "none",
			zIndex: "999"
		}), this.appendChild(this.ripple), this.ripple.primary = !0, [
			"touchcancel",
			"mouseout",
			"mouseup",
			"touchmove",
			"mousewheel",
			"wheel",
			"scroll"
		].forEach((e) => {
			document.addEventListener(e, () => {
				clearTimeout(this.timer), this.stopAnimation(), this.timer = void 0;
			}, { passive: !0 });
		});
	}
	bind(e, t) {
		if (e.actionHandler) return;
		e.actionHandler = !0, e.addEventListener("contextmenu", (e) => {
			let t = e || window.event;
			return t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0, t.returnValue = !1, !1;
		});
		let n = (e) => {
			this.held = !1;
			let t, n;
			e.touches ? (t = e.touches[0].pageX, n = e.touches[0].pageY) : (t = e.pageX, n = e.pageY), this.timer = window.setTimeout(() => {
				this.startAnimation(t, n), this.held = !0;
			}, this.holdTime);
		}, r = (n) => {
			n.preventDefault(), !(["touchend", "touchcancel"].includes(n.type) && this.timer === void 0) && (clearTimeout(this.timer), this.stopAnimation(), this.timer = void 0, this.held ? p(e, "action", { action: "hold" }) : t.hasDoubleClick ? n.type === "click" && n.detail < 2 || !this.dblClickTimeout ? this.dblClickTimeout = window.setTimeout(() => {
				this.dblClickTimeout = void 0, p(e, "action", { action: "tap" });
			}, 250) : (clearTimeout(this.dblClickTimeout), this.dblClickTimeout = void 0, p(e, "action", { action: "double_tap" })) : p(e, "action", { action: "tap" }));
		};
		e.addEventListener("touchstart", n, { passive: !0 }), e.addEventListener("touchend", r), e.addEventListener("touchcancel", r), e.addEventListener("mousedown", n, { passive: !0 }), e.addEventListener("click", r), e.addEventListener("keyup", (e) => {
			e.keyCode === 13 && r(e);
		});
	}
	startAnimation(e, t) {
		Object.assign(this.style, {
			left: `${e}px`,
			top: `${t}px`,
			display: null
		}), this.ripple.disabled = !1, this.ripple.active = !0, this.ripple.unbounded = !0;
	}
	stopAnimation() {
		this.ripple.active = !1, this.ripple.disabled = !0, this.style.display = "none";
	}
};
customElements.define("action-handler-hourly-weather", Hn);
var Un = () => {
	let e = document.body;
	if (e.querySelector("action-handler-hourly-weather")) return e.querySelector("action-handler-hourly-weather");
	let t = document.createElement("action-handler-hourly-weather");
	return e.appendChild(t), t;
}, Wn = (e, t) => {
	let n = Un();
	n && n.bind(e, t);
}, Gn = En(class extends Dn {
	update(e, [t]) {
		return Wn(e.element, t), V;
	}
	render(e) {}
}), Kn = {
	"clear-night": "conditions.clear",
	cloudy: "conditions.cloudy",
	fog: "conditions.fog",
	hail: "conditions.hail",
	lightning: "conditions.thunderstorm",
	"lightning-rainy": "conditions.thunderstorm",
	partlycloudy: "conditions.partlyCloudy",
	"night-partly-cloudy": "conditions.partlyCloudyNight",
	pouring: "conditions.heavyRain",
	rainy: "conditions.rain",
	snowy: "conditions.snow",
	"snowy-rainy": "conditions.mixedPrecip",
	sunny: "conditions.sunny",
	windy: "conditions.windy",
	"windy-variant": "conditions.windy",
	exceptional: "conditions.clear"
}, qn = {
	"clear-night": "weather-night",
	cloudy: "cloudy",
	fog: "fog",
	hail: "hail",
	lightning: "lightning",
	"lightning-rainy": "lightning-rainy",
	partlycloudy: "weather-partly-cloudy",
	"night-partly-cloudy": "weather-night-partly-cloudy",
	pouring: "pouring",
	rainy: "rainy",
	snowy: "snowy",
	"snowy-rainy": "snowy-rainy",
	sunny: "sunny",
	windy: "windy",
	"windy-variant": "windy-variant",
	exceptional: "alert-outline"
}, Jn = {
	sunny: ["sunny", "clear-night"],
	"clear-night": ["sunny", "clear-night"],
	partlycloudy: ["partlycloudy", "night-partly-cloudy"],
	"night-partly-cloudy": ["partlycloudy", "night-partly-cloudy"]
}, Yn = {
	n: "direction.n",
	nne: "direction.nne",
	ne: "direction.ne",
	ene: "direction.ene",
	e: "direction.e",
	ese: "direction.ese",
	se: "direction.se",
	sse: "direction.sse",
	s: "direction.s",
	ssw: "direction.ssw",
	sw: "direction.sw",
	wsw: "direction.wsw",
	w: "direction.w",
	wnw: "direction.wnw",
	nw: "direction.nw",
	nnw: "direction.nnw"
}, Xn = {
	n: 0,
	nne: 22.5,
	ne: 45,
	ene: 67.5,
	e: 90,
	ese: 112.5,
	se: 135,
	sse: 157.5,
	s: 180,
	ssw: 202.5,
	sw: 225,
	wsw: 247.5,
	w: 270,
	wnw: 292.5,
	nw: 315,
	nnw: 337.5
}, Zn = /* @__PURE__ */ n({
	card: () => rr,
	common: () => Qn,
	conditions: () => tr,
	default: () => ir,
	direction: () => nr,
	editor: () => $n,
	errors: () => er
}), Qn, $n, er, tr, nr, rr, ir, ar = t((() => {
	Qn = {
		version: "Версия",
		title: "Времето по часове",
		title_card: "Карта с времето по часове",
		description: "Карта, която визуализира почасово метеорологичните условия във вид на лента.",
		invalid_configuration: "Невалидна конфигурация"
	}, $n = {
		entity: "Entity (Задължително)",
		name: "Име (Опционално)",
		segments_to_show: "Брой сегменти за визуализиране (Опционално)",
		offset: "Брой сегменти с които да се отмести началото (Опционално)",
		icons: "Показвай икони вместо текст",
		show_current: "Показване на текущото време като първи сегмент",
		auto_label_spacing: "Автоматично намаляване на етикетите, когато картата е тясна",
		label_spacing: "Брой сегменти между етикетите за час и температура (Опционално)",
		show_wind: "Показвай посока и скорост на вятъра",
		show_date: "Показвай дати",
		show_precipitation_amounts: "Покажи количеството валежи",
		show_precipitation_probability: "Покажи вероятноста за валежи",
		none: "Няма",
		speed_and_direction: "Скорост и посока",
		speed_only: "Само скорост",
		direction_only: "Само посока",
		barb: "Като wind barb",
		barb_and_speed: "Като wind barb и скорост",
		barb_and_direction: "Като wind barb и посока",
		barb_speed_and_direction: "Като wind barb, скорост и посока",
		all: "Всички",
		on_day_boundaries: "На границите между дните"
	}, er = {
		missing_entity: "entity липсва в конфигурацията",
		too_many_segments_requested: "Задали сте твърде много сегменти с прогнози в num_segments. Трябва да бъдат <= от броя сегменти във forecast entity.",
		must_be_int: "Трябва да бъде четно число по-голямо или равно на 2",
		invalid_colors: "Следните цветове в конфигурацията Ви са невалидни:",
		must_be_positive_int: "Трябва да е положително число",
		offset_must_be_positive_int: "Отместването трябва да е положително число",
		forecast_not_available: "Не е налична прогноза",
		check_entity: "Проверете конфигурираното forecast entity.",
		invalid_value_icon_fill: "icon_fill трябва да бъде или положително цяло число, или едно от 'single' или 'full'"
	}, tr = {
		clear: "Ясно",
		cloudy: "Облачно",
		fog: "Мъгла",
		hail: "Градушка",
		thunderstorm: "Гръмотевична буря",
		partlyCloudy: "Частична облачност",
		partlyCloudyNight: "Частична облачност (нощ)",
		heavyRain: "Проливен дъжд",
		rain: "Дъжд",
		snow: "Сняг",
		mixedPrecip: "Смесен валеж",
		sunny: "Слънчево",
		windy: "Ветровито"
	}, nr = {
		n: "С",
		nne: "ССИ",
		ne: "СИ",
		ene: "ИСИ",
		e: "И",
		ese: "ИЮИ",
		se: "ЮИ",
		sse: "ЮЮИ",
		s: "Ю",
		ssw: "ЮЮЗ",
		sw: "ЮЗ",
		wsw: "ЗЮЗ",
		w: "З",
		wnw: "ЗСЗ",
		nw: "СЗ",
		nnw: "ССЗ"
	}, rr = {
		now: "Сега",
		chance_of_precipitation: "{0}% вероятност за валежи"
	}, ir = {
		common: Qn,
		editor: $n,
		errors: er,
		conditions: tr,
		direction: nr,
		card: rr
	};
})), or = /* @__PURE__ */ n({
	card: () => fr,
	common: () => sr,
	conditions: () => ur,
	default: () => pr,
	direction: () => dr,
	editor: () => cr,
	errors: () => lr
}), sr, cr, lr, ur, dr, fr, pr, mr = t((() => {
	sr = {
		version: "Verze",
		title: "Hodinnová předpověď",
		title_card: "Karta Hodinnová předpověď",
		description: "Karta zobrazující hodinovou předpověď v řádku.",
		invalid_configuration: "Neplatná konfigurace"
	}, cr = {
		entity: "Entita (Povinné)",
		name: "Název (Nepovinné)",
		segments_to_show: "Počet dílků předpovědi k vykreslení (Nepovinné)",
		offset: "Počet dílků, které se přeskočí před začátkem (Nepovinné)",
		icons: "Zobrazit ikony namísto textových popisků",
		show_current: "Zobrazit aktuální počasí jako první segment",
		auto_label_spacing: "Automaticky zmenšit popisky, když je karta úzká",
		label_spacing: "Po kolika dílcích se vykreslí čas a teplota (Nepovinné)",
		show_wind: "Zobrazit rychlost a směr větru",
		show_date: "Zobrazit datumy",
		show_precipitation_amounts: "Zobrazit množství srážek",
		show_precipitation_probability: "Zobrazit pravdědpodobnost srážek",
		none: "Žádné",
		speed_and_direction: "Rychlost a směr",
		speed_only: "Jen rychlost",
		direction_only: "Jen směr",
		barb: "Jako šipku větru",
		barb_and_speed: "Jako šipku větru a rychlost",
		barb_and_direction: "Jako šipku větru a směr",
		barb_speed_and_direction: "Jako šipku větru, rychlost a směr",
		all: "Všechny",
		on_day_boundaries: "Při změně dne"
	}, lr = {
		missing_entity: "Hodnota 'entity' nebyla zadána",
		too_many_segments_requested: "Je nastaveno příliš mnoho dílků předpovědi v 'num_segments'. Hodnota musí být <= počtu hodnot v zadané entitě.",
		must_be_int: "Hodnota musí být kladné sudé celé číslo",
		invalid_colors: "Následující hodnoty v konfiguraci jsou neplatné:",
		must_be_positive_int: "Hodnota musí být kladné celé číslo",
		offset_must_be_positive_int: "Hodnota 'offset' musí být kladné celé číslo",
		forecast_not_available: "Předpověď není dostupná",
		check_entity: "Zkontrolujte zadanou entity předpovědi.",
		invalid_value_icon_fill: "icon_fill musí být buď kladné celé číslo, nebo jedno z 'single'; nebo 'full';"
	}, ur = {
		clear: "Jasno",
		cloudy: "Oblačno",
		fog: "Mlha",
		hail: "Kroupy",
		thunderstorm: "Bouřka",
		partlyCloudy: "Polojasno",
		partlyCloudyNight: "Polojasno (noc)",
		heavyRain: "Silný déšť",
		rain: "Déšť",
		snow: "Sníh",
		mixedPrecip: "Smíšené srážky",
		sunny: "Slunečno",
		windy: "Větrno"
	}, dr = {
		n: "S",
		nne: "SSV",
		ne: "SV",
		ene: "VSV",
		e: "V",
		ese: "VJV",
		se: "JV",
		sse: "JJV",
		s: "J",
		ssw: "JJZ",
		sw: "JZ",
		wsw: "ZJZ",
		w: "Z",
		wnw: "ZSZ",
		nw: "SZ",
		nnw: "SSZ"
	}, fr = {
		now: "Nyní",
		chance_of_precipitation: "{0}% šance srážek"
	}, pr = {
		common: sr,
		editor: cr,
		errors: lr,
		conditions: ur,
		direction: dr,
		card: fr
	};
})), hr = /* @__PURE__ */ n({
	card: () => xr,
	common: () => gr,
	conditions: () => yr,
	default: () => Sr,
	direction: () => br,
	editor: () => _r,
	errors: () => vr
}), gr, _r, vr, yr, br, xr, Sr, Cr = t((() => {
	gr = {
		version: "Version",
		title: "Time Vejr",
		title_card: "Time Vejr Kort",
		description: "Et kort som viser vejret hver time som en linje.",
		invalid_configuration: "Ugyldig konfiguration"
	}, _r = {
		entity: "Entitet (Påkrævet)",
		name: "Navn (Valgfri)",
		segments_to_show: "Antal udsigtssegmenter der skal vises (Valgfri)",
		offset: "Antal udsigtssegmenter starten skal forskydes (Valgfri)",
		icons: "Vis ikoner i stedet for tekst",
		show_current: "Vis det aktuelle vejr som det første segment",
		auto_label_spacing: "Reducer automatisk etiketter, når kortet er smalt",
		label_spacing: "Antal segmenter imellem tid og temperatur labels (Valgfri)",
		show_wind: "Vis vindhastighed og retning",
		show_date: "Vis datoer",
		show_precipitation_amounts: "Vis nedbørsmængde",
		show_precipitation_probability: "Vis nedbørssandsynlighed",
		none: "Ingen",
		speed_and_direction: "Hastighed og retning",
		speed_only: "Kun hastighed",
		direction_only: "Kun retning",
		barb: "Som vindrose",
		barb_and_speed: "Som vindrose og hastighed",
		barb_and_direction: "Som vindrose og retning",
		barb_speed_and_direction: "Som vindrose, hastighed, og retning",
		all: "Alle",
		on_day_boundaries: "På dagsgrænser"
	}, vr = {
		missing_entity: "entitet mangler i konfiguration",
		too_many_segments_requested: "For mange segmenter forespurgt i num_segments. Skal være mindre eller lig antal segmenter i vejrudsigtsentiteten.",
		must_be_int: "Skal være et heltal størrere end eller lig 2",
		invalid_colors: "Føglende farver i din konfiguration er ugyldige:",
		must_be_positive_int: "Skal være et positivt heltal",
		offset_must_be_positive_int: "offset skal være et positivt heltal",
		forecast_not_available: "Vejrudsigt ikke tilgængelig",
		check_entity: "Kontroller den definerede vejrudsigtsentitet.",
		invalid_value_icon_fill: "icon_fill skal enten være et positivt heltal eller et af 'single' eller 'full'"
	}, yr = {
		clear: "Klart",
		cloudy: "Skyet",
		fog: "Tåge",
		hail: "Hagl",
		thunderstorm: "Torden",
		partlyCloudy: "Delvist overskyet",
		partlyCloudyNight: "Delvist overskyet (nat)",
		heavyRain: "Kraftig regn",
		rain: "Regn",
		snow: "Sne",
		mixedPrecip: "Blandet nedbør",
		sunny: "Sol",
		windy: "Blæsende"
	}, br = {
		n: "N",
		nne: "NNØ",
		ne: "NØ",
		ene: "ØNØ",
		e: "Ø",
		ese: "ØSØ",
		se: "SØ",
		sse: "SSØ",
		s: "S",
		ssw: "SSV",
		sw: "SV",
		wsw: "VSV",
		w: "V",
		wnw: "VNV",
		nw: "NV",
		nnw: "NNV"
	}, xr = {
		now: "Nu",
		chance_of_precipitation: "{0}% risiko for nedbør"
	}, Sr = {
		common: gr,
		editor: _r,
		errors: vr,
		conditions: yr,
		direction: br,
		card: xr
	};
})), wr = /* @__PURE__ */ n({
	card: () => Ar,
	common: () => Tr,
	conditions: () => Or,
	default: () => jr,
	direction: () => kr,
	editor: () => Er,
	errors: () => Dr
}), Tr, Er, Dr, Or, kr, Ar, jr, Mr = t((() => {
	Tr = {
		version: "Version",
		title: "Stündliches Wetterbedingungen",
		title_card: "Stündliche Wetterbedingungen",
		description: "Diese Karte stellt stündliche Wetterbedingungen als Balken dar.",
		invalid_configuration: "Ungültige Konfiguration"
	}, Er = {
		entity: "Entität",
		name: "Bezeichnung (optional)",
		segments_to_show: "Anzahl der anzuzeigenden Prognosesegmente (optional)",
		offset: "Anzahl der Prognosesegmente zum Versetzen beginnen um (optional)",
		icons: "Zeigen Sie Symbole anstelle von Textbeschriftungen an",
		show_current: "Aktuelles Wetter als erstes Segment anzeigen",
		auto_label_spacing: "Etiketten bei schmaler Karte automatisch verkleinern",
		label_spacing: "Anzahl der Vorhersagesegmente für Raumzeit- und Temperaturbeschriftungen nach (optional)",
		show_wind: "Zeigt Windgeschwindigkeit und -richtung an",
		show_date: "Termine anzeigen",
		show_precipitation_amounts: "Niederschlagsmenge anzeigen",
		show_precipitation_probability: "Niederschlagswahrscheinlichkeit anzeigen",
		none: "Keiner",
		speed_and_direction: "Geschwindigkeit und Richtung",
		speed_only: "Nur Geschwindigkeit",
		direction_only: "Nur Richtung",
		barb: "Als Windbarbe",
		barb_and_speed: "Als Windwiderhaken und Geschwindigkeit",
		barb_and_direction: "Als Windwiderhaken und Richtung",
		barb_speed_and_direction: "Als Windwiderstand, Geschwindigkeit und Richtung",
		all: "Alle",
		on_day_boundaries: "An Tagesgrenzen"
	}, Dr = {
		missing_entity: "Keine Wetter-Entität festgelegt",
		too_many_segments_requested: "Zu viele Prognosesegmente in num_segments angefordert. Muss <= Anzahl der Segmente in der Prognoseentität sein.",
		must_be_int: "Muss eine gerade ganze Zahl größer oder gleich 2 sein.",
		invalid_colors: "Die folgenden Farben in Ihrer Konfiguration sind ungültig:",
		must_be_positive_int: "Muss eine positive Ganzzahl sein",
		offset_must_be_positive_int: "offset muss eine positive Ganzzahl sein",
		forecast_not_available: "Prognose nicht verfügbar",
		check_entity: "Überprüfen Sie die konfigurierte Prognoseentität.",
		invalid_value_icon_fill: "icon_fill muss entweder eine positive Ganzzahl oder einer der Werte 'single' oder 'full' sein."
	}, Or = {
		clear: "Klar",
		cloudy: "Bewölkt",
		fog: "Nebel",
		hail: "Hagel",
		thunderstorm: "Gewitter",
		partlyCloudy: "Teilweise bewölkt",
		partlyCloudyNight: "Teilweise bewölkt (Nacht)",
		heavyRain: "Platzregen",
		rain: "Regen",
		snow: "Schnee",
		mixedPrecip: "Gemischter Niederschlag",
		sunny: "Sonnig",
		windy: "Windig"
	}, kr = {
		n: "N",
		nne: "NNO",
		ne: "NO",
		ene: "ONO",
		e: "O",
		ese: "OSO",
		se: "SO",
		sse: "SSO",
		s: "S",
		ssw: "SSW",
		sw: "SW",
		wsw: "WSW",
		w: "W",
		wnw: "WNW",
		nw: "NW",
		nnw: "NNW"
	}, Ar = {
		chance_of_precipitation: "{0}% Niederschlagswahrscheinlichkeit",
		now: "Jetzt"
	}, jr = {
		common: Tr,
		editor: Er,
		errors: Dr,
		conditions: Or,
		direction: kr,
		card: Ar
	};
})), Nr = /* @__PURE__ */ n({
	card: () => zr,
	common: () => Pr,
	conditions: () => Lr,
	default: () => Br,
	direction: () => Rr,
	editor: () => Fr,
	errors: () => Ir
}), Pr, Fr, Ir, Lr, Rr, zr, Br, Vr = t((() => {
	Pr = {
		version: "Version",
		title: "Hourly Weather",
		title_card: "Hourly Weather Card",
		description: "A card to render hourly weather conditions as a bar.",
		invalid_configuration: "Invalid configuration"
	}, Fr = {
		entity: "Entity (Required)",
		name: "Name (Optional)",
		segments_to_show: "Number of forecast segments to show (Optional)",
		offset: "Number of forecast segments to offset start by (Optional)",
		icons: "Show icons instead of text labels",
		show_current: "Show current weather as the first segment",
		auto_label_spacing: "Automatically reduce labels when the card is narrow",
		label_spacing: "Number of forecast segments to space time and temperature labels by (Optional)",
		show_wind: "Show wind speed and direction",
		show_date: "Show dates",
		show_precipitation_amounts: "Show precipitation amount",
		show_precipitation_probability: "Show precipitation probability",
		none: "None",
		speed_and_direction: "Speed and direction",
		speed_only: "Speed only",
		direction_only: "Direction only",
		barb: "As wind barb",
		barb_and_speed: "As wind barb and speed",
		barb_and_direction: "As wind barb and direction",
		barb_speed_and_direction: "As wind barb, speed, and direction",
		all: "All",
		on_day_boundaries: "On day boundaries"
	}, Ir = {
		missing_entity: "entity is missing in configuration",
		too_many_segments_requested: "Too many forecast segments requested in num_segments. Must be <= number of segments in forecast entity.",
		must_be_int: "Must be an even integer greater than or equal to 2",
		invalid_colors: "The following colors in your configuration are invalid:",
		must_be_positive_int: "Must be a positive integer",
		offset_must_be_positive_int: "offset must be a positive integer",
		forecast_not_available: "Forecast not available",
		check_entity: "Check the configured forecast entity.",
		invalid_value_icon_fill: "icon_fill must be either a positive integer or one of 'single' or 'full'"
	}, Lr = {
		clear: "Clear",
		cloudy: "Cloudy",
		fog: "Fog",
		hail: "Hail",
		thunderstorm: "Thunderstorm",
		partlyCloudy: "Partly cloudy",
		partlyCloudyNight: "Partly cloudy (night)",
		heavyRain: "Heavy rain",
		rain: "Rain",
		snow: "Snow",
		mixedPrecip: "Mixed precip",
		sunny: "Sunny",
		windy: "Windy"
	}, Rr = {
		n: "N",
		nne: "NNE",
		ne: "NE",
		ene: "ENE",
		e: "E",
		ese: "ESE",
		se: "SE",
		sse: "SSE",
		s: "S",
		ssw: "SSW",
		sw: "SW",
		wsw: "WSW",
		w: "W",
		wnw: "WNW",
		nw: "NW",
		nnw: "NNW"
	}, zr = {
		now: "Now",
		chance_of_precipitation: "{0}% chance of precipitation"
	}, Br = {
		common: Pr,
		editor: Fr,
		errors: Ir,
		conditions: Lr,
		direction: Rr,
		card: zr
	};
})), Hr = /* @__PURE__ */ n({
	card: () => Jr,
	common: () => Ur,
	conditions: () => Kr,
	default: () => Yr,
	direction: () => qr,
	editor: () => Wr,
	errors: () => Gr
}), Ur, Wr, Gr, Kr, qr, Jr, Yr, Xr = t((() => {
	Ur = {
		version: "Versión",
		title: "Tiempo por hora",
		title_card: "Tarjeta de Tiempo por hora",
		description: "Una tarjeta para mostrar las condiciones climáticas cada hora en una barra.",
		invalid_configuration: "Configuración inválida"
	}, Wr = {
		entity: "Entidad (Requerida)",
		name: "Nombre (Opcional)",
		segments_to_show: "Número de segmentos de pronóstico para mostrar (Opcional)",
		offset: "Número de segmentos de pronóstico para compensar el inicio por (Opcional)",
		icons: "Mostrar iconos en vez de texto",
		show_current: "Mostrar el clima actual como primer segmento",
		auto_label_spacing: "Reducir automáticamente las etiquetas cuando la tarjeta sea estrecha",
		label_spacing: "Número de segmentos de pronóstico para etiquetas de temperatura y tiempo espacial por (Opcional)",
		show_wind: "Mostrar la velocidad y dirección del viento",
		show_date: "Mostrar fechas",
		show_precipitation_amounts: "Mostrar cantidad de precipitación",
		show_precipitation_probability: "Mostrar probabilidad de precipitación",
		none: "Ninguno",
		speed_and_direction: "Velocidad y dirección",
		speed_only: "Solo velocidad",
		direction_only: "Solo dirección",
		barb: "Como púa de viento",
		barb_and_speed: "Como púas de viento y velocidad",
		barb_and_direction: "Como púa de viento y dirección",
		barb_speed_and_direction: "Como púa de viento, velocidad y dirección",
		all: "Todo",
		on_day_boundaries: "En los límites del día"
	}, Gr = {
		missing_entity: "falta la entidad en la configuración",
		too_many_segments_requested: "Se solicitaron demasiados segmentos de pronóstico en num_segments. Debe ser <= número de segmentos en la entidad de pronóstico.",
		must_be_int: "Debe ser un entero mayor o igual a 2",
		invalid_colors: "Los siguientes colores en su configuración no son válidos:",
		must_be_positive_int: "Debe ser un entero positivo",
		offset_must_be_positive_int: "offset debe ser un número entero positivo",
		forecast_not_available: "Pronóstico no disponible",
		check_entity: "Verifique la entidad de pronóstico configurada.",
		invalid_value_icon_fill: "icon_fill debe ser un número entero positivo o uno de los valores 'single' o 'full'"
	}, Kr = {
		clear: "Despejado",
		cloudy: "Nublado",
		fog: "Niebla",
		hail: "Granizo",
		thunderstorm: "Tormenta electrica",
		partlyCloudy: "Parcialmente nublado",
		partlyCloudyNight: "Parcialmente nublado (noche)",
		heavyRain: "Tormenta",
		rain: "Lluvia",
		snow: "Nieve",
		mixedPrecip: "Chaparrones dispersos",
		sunny: "Soleado",
		windy: "Ventoso"
	}, qr = {
		n: "N",
		nne: "NNE",
		ne: "NE",
		ene: "ENE",
		e: "E",
		ese: "ESE",
		se: "SE",
		sse: "SSE",
		s: "S",
		ssw: "SSO",
		sw: "SO",
		wsw: "OSO",
		w: "O",
		wnw: "ONO",
		nw: "NO",
		nnw: "NNO"
	}, Jr = {
		now: "Ahora",
		chance_of_precipitation: "{0}% probabilidad de precipitación"
	}, Yr = {
		common: Ur,
		editor: Wr,
		errors: Gr,
		conditions: Kr,
		direction: qr,
		card: Jr
	};
})), Zr = /* @__PURE__ */ n({
	card: () => ri,
	common: () => Qr,
	conditions: () => ti,
	default: () => ii,
	direction: () => ni,
	editor: () => $r,
	errors: () => ei
}), Qr, $r, ei, ti, ni, ri, ii, ai = t((() => {
	Qr = {
		version: "Version",
		title: "Prévisions météo par heure",
		title_card: "Prévisions météo par heure",
		description: "Une carte pour afficher les prévisions météo par heure sur une ligne.",
		invalid_configuration: "Configuration invalide"
	}, $r = {
		entity: "Entité (requis)",
		name: "Nom (facultatif)",
		segments_to_show: "Nombre de segments de prévision à afficher (facultatif)",
		offset: "Décalage initial de segments de prévision (facultatif)",
		icons: "Afficher des icônes à la place du texte",
		show_current: "Afficher la météo actuelle en premier segment",
		auto_label_spacing: "Réduire automatiquement la taille des étiquettes lorsque la carte est étroite",
		label_spacing: "Segments d'espacement entre les étiquettes d'heure et de température (facultatif)",
		show_wind: "Afficher la vitesse et la direction du vent",
		show_date: "Afficher les dates",
		show_precipitation_amounts: "Afficher la quantité de précipitations",
		show_precipitation_probability: "Afficher la probabilité de précipitation",
		none: "Aucun",
		speed_and_direction: "Vitesse et orientation",
		speed_only: "Vitesse uniquement",
		direction_only: "Sens uniquement",
		barb: "Comme barbillon de vent",
		barb_and_speed: "Comme barbe de vent et vitesse",
		barb_and_direction: "Comme barbillon de vent et direction",
		barb_speed_and_direction: "Comme barbillon de vent, vitesse et direction",
		all: "Tous",
		on_day_boundaries: "Aux limites du jour"
	}, ei = {
		missing_entity: "Entité manquante dans la configuration",
		too_many_segments_requested: "Trop de segments de prévision demandés dans num_segments. Doit être <= au nombre de segments de l'entité de prévision.",
		must_be_int: "Doit être un nombre entier pair supérieur ou égal à 2",
		invalid_colors: "Les couleurs suivantes dans votre configuration ne sont pas valides\xA0:",
		must_be_positive_int: "Doit être un entier positif",
		offset_must_be_positive_int: "offset doit être un entier positif",
		forecast_not_available: "Prévision non disponible",
		check_entity: "Vérifiez l'entité de prévision configurée.",
		invalid_value_icon_fill: "icon_fill doit être soit un entier positif, soit l'un des nombres 'single' ou 'full'"
	}, ti = {
		clear: "Dégagé",
		cloudy: "Nuageux",
		fog: "Brouillard",
		hail: "Grêle",
		thunderstorm: "Orage",
		partlyCloudy: "Éclaircies",
		partlyCloudyNight: "Éclaircies (nuit)",
		heavyRain: "Averses",
		rain: "Pluie",
		snow: "Neige",
		mixedPrecip: "Neigeux, pluvieux",
		sunny: "Ensoleillé",
		windy: "Venteux"
	}, ni = {
		n: "N",
		nne: "NNE",
		ne: "NE",
		ene: "ENE",
		e: "E",
		ese: "ESE",
		se: "SE",
		sse: "SSE",
		s: "S",
		ssw: "SSO",
		sw: "SO",
		wsw: "OSO",
		w: "O",
		wnw: "ONO",
		nw: "NO",
		nnw: "NNO"
	}, ri = {
		now: "Maintenant",
		chance_of_precipitation: "{0}% probabilité de précipitations"
	}, ii = {
		common: Qr,
		editor: $r,
		errors: ei,
		conditions: ti,
		direction: ni,
		card: ri
	};
})), oi = /* @__PURE__ */ n({
	card: () => fi,
	common: () => si,
	conditions: () => ui,
	default: () => pi,
	direction: () => di,
	editor: () => ci,
	errors: () => li
}), si, ci, li, ui, di, fi, pi, mi = t((() => {
	si = {
		version: "Verzió",
		title: "Óránkénti időjárás",
		title_card: "Óránkénti időjárás kártya",
		description: "Egy kártya, amely az óránkénti időjárási viszonyokat egy sávban jeleníti meg",
		invalid_configuration: "Érvénytelen konfiguráció"
	}, ci = {
		entity: "Entitás (Kötelező)",
		name: "Név (Opcionális)",
		segments_to_show: "Megjelenítendő előrejelzési órák száma (Opcionális)",
		offset: "Az előrejelzett órák kezdő értékének eltolása (Opcionális)",
		icons: "Ikonok megjelenítése szövegek helyett",
		show_current: "Aktuális időjárás megjelenítése első szegmensként",
		auto_label_spacing: "Automatikusan csökkentse a címkéket, ha a kártya keskeny",
		label_spacing: "Az idő- és hőmérsékleti címkékhez tartozó előrejelzési órák időköze (Opcionális)",
		show_wind: "Szélsebesség és irány megjelenítése",
		show_date: "Dátumok megjelenítése",
		show_precipitation_amounts: "Csapadékmennyiség megjelenítése",
		show_precipitation_probability: "Csapadék valószínűségének megjelenítése",
		none: "Egyik sem",
		speed_and_direction: "Sebesség és irány",
		speed_only: "Sebesség",
		direction_only: "Irány",
		barb: "Irány nyílként",
		barb_and_speed: "Szélfogóként és sebességként",
		barb_and_direction: "Szellőként és irányként",
		barb_speed_and_direction: "Szélfogként, sebességként és irányként",
		all: "Minden",
		on_day_boundaries: "A napok határain"
	}, li = {
		missing_entity: "az entitás hiányzik a konfigurációból",
		too_many_segments_requested: "Túl sok előrejelzési órát adtak meg a num_segments-ben. <= az előrejelző egységben lévő órák száma.",
		must_be_int: "Páros egész számnak kell lennie, amely nagyobb vagy egyenlő 2-nél.",
		invalid_colors: "A konfigurációdban a következő színek érvénytelenek:",
		must_be_positive_int: "Pozitív egész szám kell legyen",
		offset_must_be_positive_int: "offset pozitív egész számnak kell lennie",
		forecast_not_available: "Előrejelzés nem elérhető",
		check_entity: "Ellenőrizze a beállított előrejelző egységet.",
		invalid_value_icon_fill: "Az ikon_kitöltésének pozitív egésznek vagy az 'single' vagy 'full'"
	}, ui = {
		clear: "Tiszta",
		cloudy: "Felhős",
		fog: "Ködös",
		hail: "Jégeső",
		thunderstorm: "Vihar",
		partlyCloudy: "Részben felhős",
		partlyCloudyNight: "Részben felhős (éjszaka)",
		heavyRain: "Heves eső",
		rain: "Esős",
		snow: "Havazás",
		mixedPrecip: "Havas eső",
		sunny: "Napos",
		windy: "Szeles"
	}, di = {
		n: "É",
		nne: "ÉÉK",
		ne: "ÉK",
		ene: "KÉK",
		e: "K",
		ese: "KDK",
		se: "DK",
		sse: "DDK",
		s: "D",
		ssw: "DDNy",
		sw: "DNy",
		wsw: "NyDNy",
		w: "Ny",
		wnw: "NyÉNy",
		nw: "ÉNy",
		nnw: "ÉÉNy"
	}, fi = {
		now: "Most",
		chance_of_precipitation: "{0}% a csapadék valószínűsége"
	}, pi = {
		common: si,
		editor: ci,
		errors: li,
		conditions: ui,
		direction: di,
		card: fi
	};
})), hi = /* @__PURE__ */ n({
	card: () => xi,
	common: () => gi,
	conditions: () => yi,
	default: () => Si,
	direction: () => bi,
	editor: () => _i,
	errors: () => vi
}), gi, _i, vi, yi, bi, xi, Si, Ci = t((() => {
	gi = {
		version: "Versione",
		title: "Previsione Meteo Oraria",
		title_card: "Scheda Meteo Oraria",
		description: "Una scheda per rappresentare le condizioni meteorologiche orarie come una barra.",
		invalid_configuration: "Configurazione Non Valida"
	}, _i = {
		entity: "Entità (Richiesta)",
		name: "Nome (Facoltativo)",
		segments_to_show: "Numero di segmenti di previsione da mostrare (facoltativo)",
		offset: "Numero di segmenti di previsione di cui compensare l'inizio (Facoltativo)",
		icons: "Mostra le icone invece delle etichette di testo",
		show_current: "Mostra le condizioni meteo attuali come primo segmento",
		auto_label_spacing: "Riduci automaticamente le etichette quando la scheda è stretta",
		label_spacing: "Numero di segmenti di previsione per spazio etichette tempo e temperatura per (facoltativo)",
		show_wind: "Mostra la velocità e la direzione del vento",
		show_date: "Mostra date",
		show_precipitation_amounts: "Mostra la quantità di precipitazioni",
		show_precipitation_probability: "Mostra la probabilità di precipitazioni",
		none: "Nessuno",
		speed_and_direction: "Velocità e direzione",
		speed_only: "Solo velocità",
		direction_only: "Solo direzione",
		barb: "Come una punta di vento",
		barb_and_speed: "Come il vento tagliente e la velocità",
		barb_and_direction: "Come il vento e la direzione",
		barb_speed_and_direction: "Come la punta del vento, la velocità e la direzione",
		all: "Tutto",
		on_day_boundaries: "Sui confini del giorno"
	}, vi = {
		missing_entity: "entità mancante nella configurazione",
		too_many_segments_requested: "Troppi segmenti di previsione richiesti in num_segments. Deve essere <= numero di segmenti nell'entità di previsione.",
		must_be_int: "Deve essere un numero intero pari, maggiore o uguale a 2",
		invalid_colors: "I seguenti colori nella tua configurazione non sono validi:",
		must_be_positive_int: "Deve essere un numero intero positivo",
		offset_must_be_positive_int: "offset deve essere un numero intero positivo",
		forecast_not_available: "Previsione non disponibile",
		check_entity: "Controllare l'entità di previsione configurata.",
		invalid_value_icon_fill: "icon_fill deve essere un numero intero positivo o uno dei valori 'single' o 'full'"
	}, yi = {
		clear: "Limpido",
		cloudy: "Nuvoloso",
		fog: "Nebbia",
		hail: "Grandine",
		thunderstorm: "Temporale",
		partlyCloudy: "Parzialmente Nuvoloso",
		partlyCloudyNight: "Parzialmente Nuvoloso (notte)",
		heavyRain: "Acquazzone",
		rain: "Pioggia",
		snow: "Neve",
		mixedPrecip: "Precipitazioni Miste",
		sunny: "Soleggiato",
		windy: "Ventoso"
	}, bi = {
		n: "N",
		nne: "NNE",
		ne: "NE",
		ene: "ENE",
		e: "E",
		ese: "ESE",
		se: "SE",
		sse: "SSE",
		s: "S",
		ssw: "SSO",
		sw: "SO",
		wsw: "OSO",
		w: "O",
		wnw: "ONO",
		nw: "NO",
		nnw: "NNO"
	}, xi = {
		now: "Ora",
		chance_of_precipitation: "{0}% possibilità di precipitazioni"
	}, Si = {
		common: gi,
		editor: _i,
		errors: vi,
		conditions: yi,
		direction: bi,
		card: xi
	};
})), wi = /* @__PURE__ */ n({
	card: () => Ai,
	common: () => Ti,
	conditions: () => Oi,
	default: () => ji,
	direction: () => ki,
	editor: () => Ei,
	errors: () => Di
}), Ti, Ei, Di, Oi, ki, Ai, ji, Mi = t((() => {
	Ti = {
		version: "Versjon",
		title: "Timelig vær",
		title_card: "Timevis værkort",
		description: "Et kort for å gjengi værforhold hver time som en bar.",
		invalid_configuration: "Ikke gyldig konfiguration"
	}, Ei = {
		entity: "Entitet (obligatorisk)",
		name: "Navn (valgfritt)",
		segments_to_show: "Antall prognosesegmenter som skal vises (valgfritt)",
		offset: "Antall prognosesegmenter å utligne start med (valgfritt)",
		icons: "Vis ikoner i stedet for tekstetiketter",
		show_current: "Vis gjeldende vær som det første segmentet",
		auto_label_spacing: "Reduser etiketter automatisk når kortet er smalt",
		label_spacing: "Antall prognosesegmenter til romtid og temperaturetiketter etter (valgfritt)",
		show_wind: "Vis vindhastighet og retning",
		show_date: "Vis datoer",
		show_precipitation_amounts: "Vis nedbørsmengde",
		show_precipitation_probability: "Vis nedbørssannsynlighet",
		none: "Ingen",
		speed_and_direction: "Fart og retning",
		speed_only: "Kun hastighet",
		direction_only: "Kun retning",
		barb: "Som vindmothak",
		barb_and_speed: "Som vindmottak og fart",
		barb_and_direction: "Som vindmottak og retning",
		barb_speed_and_direction: "Som vindmothak, hastighet og retning",
		all: "Alle",
		on_day_boundaries: "På dagsgrenser"
	}, Di = {
		missing_entity: "entity mangler i konfigurasjonen",
		too_many_segments_requested: "For mange prognosesegmenter er forespurt i num_segments. Må være <= antall segmenter i prognoseenheten.",
		must_be_int: "Må være et jevnt heltall større enn eller lik 2",
		invalid_colors: "Følgende farger i konfigurasjonen din er ugyldige:",
		must_be_positive_int: "Må være et positivt heltall",
		offset_must_be_positive_int: "offset må være et positivt heltall",
		forecast_not_available: "Værvarsel er ikke tilgjengelig",
		check_entity: "Sjekk den konfigurerte prognoseenheten.",
		invalid_value_icon_fill: "icon_fill må enten være et positivt heltall eller et av 'single' eller 'full'"
	}, Oi = {
		clear: "Klar",
		cloudy: "Skyet",
		fog: "Tåke",
		hail: "Hagl",
		thunderstorm: "Tordenvær",
		partlyCloudy: "Delvis skyet",
		partlyCloudyNight: "Delvis skyet (natt)",
		heavyRain: "Mye regn",
		rain: "Regn",
		snow: "Snø",
		mixedPrecip: "Blandet nedbør",
		sunny: "Solfylt",
		windy: "Vindfullt"
	}, ki = {
		n: "N",
		nne: "NNØ",
		ne: "NE",
		ene: "ØNØ",
		e: "Ø",
		ese: "ØSØ",
		se: "SØ",
		sse: "SSØ",
		s: "S",
		ssw: "SSV",
		sw: "SV",
		wsw: "VSV",
		w: "V",
		wnw: "VNV",
		nw: "NV",
		nnw: "NNV"
	}, Ai = {
		now: "Nå",
		chance_of_precipitation: "{0}% sjanse for nedbør"
	}, ji = {
		common: Ti,
		editor: Ei,
		errors: Di,
		conditions: Oi,
		direction: ki,
		card: Ai
	};
})), Ni = /* @__PURE__ */ n({
	card: () => zi,
	common: () => Pi,
	conditions: () => Li,
	default: () => Bi,
	direction: () => Ri,
	editor: () => Fi,
	errors: () => Ii
}), Pi, Fi, Ii, Li, Ri, zi, Bi, Vi = t((() => {
	Pi = {
		version: "Versjon",
		invalid_configuration: "Ikkje gyldeg konfiguasjon",
		title: "Timelig vær",
		title_card: "Timevis værkort",
		description: "Eit kort for å gjengje verforhold kvar time som ein bar."
	}, Fi = {
		icons: "Vis ikon i staden for tekstetikettar",
		entity: "Entitet (obligatorisk)",
		name: "Namn (valfritt)",
		offset: "Antall prognosesegment å utligne start med (valfritt)",
		segments_to_show: "Antall prognosesegment som skal synast (valfritt)",
		label_spacing: "Antall prognosesegment til romtid og temperaturetikettar etter (valfritt)",
		show_wind: "Vis vindhastigheit og retning",
		show_precipitation_amounts: "Vis nedbørsmengde",
		neither: "Ingen",
		both: "Både",
		speed_only: "Kun hastigheit",
		direction_only: "Kun retning",
		barb: "Som vindmothak",
		show_precipitation_probability: "Vis nedbørssannsyn",
		none: "Ingen",
		speed_and_direction: "Fart og retning",
		barb_and_speed: "Som vindmottak og fart",
		barb_and_direction: "Som vindmottak og retning",
		barb_speed_and_direction: "Som vindmothak, hastighet og retning",
		show_date: "Vis datoer",
		all: "Alle",
		on_day_boundaries: "På dagsgrenser",
		show_current: "Vis gjeldende vær som det første segmentet",
		auto_label_spacing: "Reduser etiketter automatisk når kortet er smalt"
	}, Ii = {
		missing_entity: "entity manglar i konfigurasjonen",
		must_be_int: "Må være et jevnt heiltal større enn eller lik 2",
		invalid_colors: "Følgande fargar i konfigurasjonen din er ugyldege:",
		must_be_positive_int: "Må vere eit positivt heiltal",
		too_many_segments_requested: "For mange prognosesegment er førespurt i num_segments. Må vere <= antall segment i prognoseeininga.",
		offset_must_be_positive_int: "offset må vere eit positivt heiltal",
		forecast_not_available: "Vervarsel er ikkje tilgjengeleg",
		check_entity: "Sjekk den konfigurerte prognoseeininga.",
		invalid_value_icon_fill: "icon_fill må enten være et positivt heltall eller et av 'single' eller 'full'"
	}, Li = {
		clear: "Klart",
		cloudy: "Skya",
		fog: "Tåke",
		hail: "Hagl",
		thunderstorm: "Tordenvær",
		partlyCloudy: "Delvis skya",
		partlyCloudyNight: "Delvis skya (natt)",
		heavyRain: "Mykje regn",
		rain: "Regn",
		snow: "Snø",
		mixedPrecip: "Blanda nedbør",
		sunny: "Sol",
		windy: "Vindfullt"
	}, Ri = {
		n: "N",
		nne: "NNØ",
		ne: "NE",
		ene: "ØNØ",
		e: "Ø",
		ese: "ØSØ",
		se: "SØ",
		sse: "SSØ",
		s: "S",
		ssw: "SSV",
		sw: "SV",
		wsw: "VSV",
		w: "V",
		wnw: "VNV",
		nw: "NV",
		nnw: "NNV"
	}, zi = {
		chance_of_precipitation: "{0}% sjanse for nedbør",
		now: "Nå"
	}, Bi = {
		common: Pi,
		editor: Fi,
		errors: Ii,
		conditions: Li,
		direction: Ri,
		card: zi
	};
})), Hi = /* @__PURE__ */ n({
	card: () => Ji,
	common: () => Ui,
	conditions: () => Ki,
	default: () => Yi,
	direction: () => qi,
	editor: () => Wi,
	errors: () => Gi
}), Ui, Wi, Gi, Ki, qi, Ji, Yi, Xi = t((() => {
	Ui = {
		version: "Versie",
		title: "Weer per uur",
		title_card: "Weerkaart per uur",
		description: "Een kaart om de weersomstandigheden per uur weer te geven als een bar.",
		invalid_configuration: "Ongeldige configuratie"
	}, Wi = {
		entity: "Entiteit (Verplicht)",
		name: "Naam: (Optioneel)",
		segments_to_show: "Aantal weer te geven prognosesegmenten (Optioneel)",
		offset: "Aantal prognosesegmenten om mee te compenseren (Optioneel)",
		icons: "Pictogrammen weergeven in plaats van tekstlabels",
		show_current: "Toon het actuele weer als eerste segment",
		auto_label_spacing: "Labels automatisch verkleinen wanneer de kaart smal is",
		label_spacing: "Aantal prognosesegmenten naar ruimtetijd- en temperatuurlabels per (Optioneel)",
		show_wind: "Toon windsnelheid en richting",
		show_date: "Datums weergeven",
		show_precipitation_amounts: "Toon hoeveelheid neerslag",
		show_precipitation_probability: "Neerslagkans weergeven",
		none: "Geen",
		speed_and_direction: "Snelheid en richting",
		speed_only: "Alleen snelheid",
		direction_only: "Alleen richting (tekst)",
		barb: "Alleen richting (pijl)",
		barb_and_speed: "Zoals wind weerhaak en snelheid",
		barb_and_direction: "Als windhaak en richting",
		barb_speed_and_direction: "Zoals wind weerhaak, snelheid en richting",
		all: "Alle",
		on_day_boundaries: "Op daggrenzen"
	}, Gi = {
		missing_entity: "entiteit ontbreekt in configuratie",
		too_many_segments_requested: "Te veel prognosesegmenten aangevraagd in num_segments. Moet <= aantal segmenten in prognose-entiteit zijn.",
		must_be_int: "Moet een even geheel getal zijn groter of gelijk aan 2",
		invalid_colors: "De volgende kleuren in uw configuratie zijn ongeldig:",
		must_be_positive_int: "Moet een positief geheel getal zijn",
		offset_must_be_positive_int: "offset moet een positief geheel getal zijn",
		forecast_not_available: "Prognose niet beschikbaar",
		check_entity: "Controleer de geconfigureerde prognose-entiteit.",
		invalid_value_icon_fill: "icon_fill moet een positief geheel getal zijn of een van de 'single'; of 'full'"
	}, Ki = {
		clear: "Helder",
		cloudy: "Bewolkt",
		fog: "Mist",
		hail: "Hagel",
		thunderstorm: "Onweersbui",
		partlyCloudy: "Half bewolkt",
		partlyCloudyNight: "Half bewolkt (nacht)",
		heavyRain: "Zware regen",
		rain: "Regen",
		snow: "Sneeuw",
		mixedPrecip: "Gemengde neerslag",
		sunny: "Zonnig",
		windy: "Winderig"
	}, qi = {
		n: "N",
		nne: "NNO",
		ne: "NO",
		ene: "ONO",
		e: "O",
		ese: "OZO",
		se: "ZO",
		sse: "ZZO",
		s: "Z",
		ssw: "ZZW",
		sw: "ZW",
		wsw: "WZW",
		w: "W",
		wnw: "WNW",
		nw: "NW",
		nnw: "NNW"
	}, Ji = {
		now: "Nu",
		chance_of_precipitation: "{0}% kans op neerslag"
	}, Yi = {
		common: Ui,
		editor: Wi,
		errors: Gi,
		conditions: Ki,
		direction: qi,
		card: Ji
	};
})), Zi = /* @__PURE__ */ n({
	card: () => ra,
	common: () => Qi,
	conditions: () => ta,
	default: () => ia,
	direction: () => na,
	editor: () => $i,
	errors: () => ea
}), Qi, $i, ea, ta, na, ra, ia, aa = t((() => {
	Qi = {
		version: "Wersja",
		title: "Pogoda godzinowa",
		title_card: "Pogoda godzinowa",
		description: "Karta w formie wykresu słupkowego dla pogody godzinowej",
		invalid_configuration: "Nieprawiłowa konfiguracja"
	}, $i = {
		entity: "Encja",
		name: "Nazwa (opcjonalnie)",
		icons: "Pokaż ikony zamiast etykiet tekstowych",
		show_current: "Pokaż aktualną pogodę jako pierwszy segment",
		auto_label_spacing: "Automatycznie ogranicz etykiety, gdy karta jest wąska",
		offset: "Liczba segmentów prognozy, o które należy skompensować początek (opcjonalnie)",
		segments_to_show: "Liczba segmentów prognozy do wyświetlenia (opcjonalnie)",
		label_spacing: "Liczba segmentów prognozy do etykiet czasoprzestrzeni i temperatury według (opcjonalnie)",
		show_wind: "Pokaż prędkość i kierunek wiatru",
		show_precipitation_amounts: "Pokaż ilość opadów",
		speed_only: "Tylko prędkość",
		direction_only: "Tylko kierunek",
		barb: "Jak kolce wiatru",
		show_precipitation_probability: "Pokaż prawdopodobieństwo opadów",
		none: "Nic",
		speed_and_direction: "Szybkość i kierunek",
		barb_and_speed: "Jak kolce wiatru i prędkość",
		barb_and_direction: "Jako zadzior i kierunek wiatru",
		barb_speed_and_direction: "Jak kolce wiatru, prędkość i kierunek",
		show_date: "Pokaż daty",
		all: "Wszystko",
		on_day_boundaries: "Na granicach dnia"
	}, ea = {
		missing_entity: "encja nie istnieje",
		must_be_int: "Musi być parzystą liczbą całkowitą większą lub równą 2",
		invalid_colors: "Następujące kolory w Twojej konfiguracji są nieprawidłowe:",
		must_be_positive_int: "Musi być dodatnią liczbą całkowitą",
		too_many_segments_requested: "Zażądano zbyt wielu segmentów prognozy w num_segments. Musi wynosić <= liczba segmentów w elemencie prognozy.",
		offset_must_be_positive_int: "offset musi być dodatnią liczbą całkowitą",
		forecast_not_available: "Prognoza niedostępna",
		check_entity: "Sprawdź skonfigurowaną encję prognozy.",
		invalid_value_icon_fill: "icon_fill musi być dodatnią liczbą całkowitą lub jedną z wartości 'single' lub 'full'"
	}, ta = {
		clear: "Bezchmurnie",
		cloudy: "Pochmurnie",
		fog: "Mgła",
		hail: "Grad",
		thunderstorm: "Burza",
		partlyCloudy: "Częściowe zachmurzenie",
		partlyCloudyNight: "Częściowe zachmurzenie (noc)",
		heavyRain: "Ulewa",
		rain: "Deszcz",
		snow: "Śnieg",
		mixedPrecip: "Mieszane opady",
		sunny: "Słonecznie",
		windy: "Wietrznie"
	}, na = {
		n: "P",
		nne: "PPW",
		ne: "PW",
		ene: "WPW",
		e: "W",
		ese: "WPdW",
		se: "PdW",
		sse: "PdPdW",
		s: "Pd",
		ssw: "PdPdZ",
		sw: "PdZ",
		wsw: "ZPdZ",
		w: "Z",
		wnw: "ZPZ",
		nw: "PZ",
		nnw: "PPZ"
	}, ra = {
		now: "TERAZ",
		chance_of_precipitation: "{0}% szans na opady"
	}, ia = {
		common: Qi,
		editor: $i,
		errors: ea,
		conditions: ta,
		direction: na,
		card: ra
	};
})), oa = /* @__PURE__ */ n({
	card: () => fa,
	common: () => sa,
	conditions: () => ua,
	default: () => pa,
	direction: () => da,
	editor: () => ca,
	errors: () => la
}), sa, ca, la, ua, da, fa, pa, ma = t((() => {
	sa = {
		version: "Versão",
		title: "Tempo de hora em hora",
		title_card: "Tempo de hora em hora",
		description: "Um cartão para mostrar as condições meteorológicas de hora em hora como uma barra.",
		invalid_configuration: "Configuração Inválida"
	}, ca = {
		entity: "Entidade",
		name: "Nome (opcional)",
		segments_to_show: "Número de segmentos de previsão a serem exibidos (opcional)",
		offset: "Número de segmentos de previsão para começar a compensar (opcional)",
		icons: "Mostrar ícones em vez de rótulos de texto",
		show_current: "Exibir a previsão do tempo atual como primeiro segmento",
		auto_label_spacing: "Reduzir automaticamente os rótulos quando o cartão for estreito",
		label_spacing: "Número de segmentos de previsão para rótulos de tempo e temperatura de espaço por (opcional)",
		show_wind: "Mostrar velocidade e direção do vento",
		show_date: "Mostrar datas",
		show_precipitation_amounts: "Mostrar quantidade de precipitação",
		show_precipitation_probability: "Mostrar probabilidade de precipitação",
		none: "Nenhum",
		speed_and_direction: "Velocidade e direção",
		speed_only: "Apenas velocidade",
		direction_only: "Apenas direção",
		barb: "Como farpa de vento",
		barb_and_speed: "Como farpa de vento e velocidade",
		barb_and_direction: "Como farpa de vento e direção",
		barb_speed_and_direction: "Como farpa de vento, velocidade e direção",
		all: "Todos",
		on_day_boundaries: "Nos limites do dia"
	}, la = {
		missing_entity: "A entidade não existe na configuração",
		too_many_segments_requested: "Muitos segmentos de previsão solicitados em num_segments. Deve ser <= número de segmentos na entidade de previsão.",
		must_be_int: "Deve ser um número inteiro par maior ou igual a 2",
		invalid_colors: "As seguintes cores em sua configuração são inválidas:",
		must_be_positive_int: "Deve ser um número inteiro positivo",
		offset_must_be_positive_int: "offset deve ser um número inteiro positivo",
		forecast_not_available: "Previsão não disponível",
		check_entity: "Verifique a entidade de previsão configurada.",
		invalid_value_icon_fill: "icon_fill deve ser um número inteiro positivo ou um dos valores 'single' ou 'full'"
	}, ua = {
		clear: "Limpo",
		cloudy: "Nublado",
		fog: "Nevoeiro",
		hail: "Granizo",
		thunderstorm: "Trovoada",
		partlyCloudy: "Pouco nublado",
		partlyCloudyNight: "Pouco nublado (noite)",
		heavyRain: "Chuva forte",
		rain: "Chuva",
		snow: "Neve",
		mixedPrecip: "Precipitação mista",
		sunny: "Sol",
		windy: "Vento"
	}, da = {
		n: "N",
		nne: "NNE",
		ne: "NE",
		ene: "ENE",
		e: "E",
		ese: "ESE",
		se: "SE",
		sse: "SSE",
		s: "S",
		ssw: "SSO",
		sw: "SO",
		wsw: "OSO",
		w: "O",
		wnw: "ONO",
		nw: "NO",
		nnw: "NNO"
	}, fa = {
		now: "Agora",
		chance_of_precipitation: "{0}% chance de chuva"
	}, pa = {
		common: sa,
		editor: ca,
		errors: la,
		conditions: ua,
		direction: da,
		card: fa
	};
})), ha = /* @__PURE__ */ n({
	card: () => xa,
	common: () => ga,
	conditions: () => ya,
	default: () => Sa,
	direction: () => ba,
	editor: () => _a,
	errors: () => va
}), ga, _a, va, ya, ba, xa, Sa, Ca = t((() => {
	ga = {
		version: "Versão",
		title: "Tempo de hora em hora",
		title_card: "Cartão meteorológico por hora",
		description: "Um cartão para renderizar as condições climáticas horárias como uma barra.",
		invalid_configuration: "Configuração inválida"
	}, _a = {
		entity: "Entidade (obrigatório)",
		name: "Nome (opcional)",
		segments_to_show: "Número de segmentos de previsão a serem exibidos (opcional)",
		offset: "Número de segmentos de previsão para começar a compensar (opcional)",
		icons: "Mostrar ícones em vez de rótulos de texto",
		label_spacing: "Número de segmentos de previsão para rótulos de tempo e temperatura de espaço por (opcional)",
		show_wind: "Mostrar velocidade e direção do vento",
		show_precipitation_amounts: "Mostrar quantidade de precipitação",
		neither: "Nenhum",
		both: "Ambos",
		speed_only: "Apenas velocidade",
		direction_only: "Apenas direção",
		barb: "Como farpa de vento",
		show_precipitation_probability: "Mostrar probabilidade de precipitação",
		none: "Nenhum",
		speed_and_direction: "Velocidade e direção",
		barb_and_speed: "Como farpa de vento e velocidade",
		barb_and_direction: "Como farpa de vento e direção",
		barb_speed_and_direction: "Como farpa de vento, velocidade e direção",
		show_date: "Mostrar datas",
		all: "Todos",
		on_day_boundaries: "Nos limites do dia",
		show_current: "Exibir a previsão do tempo atual como primeiro segmento",
		auto_label_spacing: "Reduzir automaticamente os rótulos quando o cartão for estreito"
	}, va = {
		missing_entity: "entidade está faltando na configuração",
		too_many_segments_requested: "Muitos segmentos de previsão solicitados em num_segments. Deve ser <= número de segmentos na entidade de previsão.",
		must_be_int: "Deve ser um número inteiro par maior ou igual a 2",
		invalid_colors: "As seguintes cores em sua configuração são inválidas:",
		must_be_positive_int: "Deve ser um número inteiro positivo",
		offset_must_be_positive_int: "offset deve ser um número inteiro positivo",
		forecast_not_available: "Previsão não disponível",
		check_entity: "Verifique a entidade de previsão configurada.",
		invalid_value_icon_fill: "icon_fill deve ser um número inteiro positivo ou um dos valores 'single' ou 'full'"
	}, ya = {
		clear: "Claro",
		cloudy: "Nublado",
		fog: "Névoa",
		hail: "Granizo",
		thunderstorm: "Tempestade",
		partlyCloudy: "Parcialmente nublado",
		partlyCloudyNight: "Parcialmente nublado (noite)",
		heavyRain: "Chuva pesada",
		rain: "Chuva",
		snow: "Neve",
		mixedPrecip: "Precipitação mista",
		sunny: "Ensolarado",
		windy: "Ventania"
	}, ba = {
		n: "N",
		nne: "NNE",
		ne: "NE",
		ene: "ENE",
		e: "E",
		ese: "ESE",
		se: "SE",
		sse: "SSE",
		s: "S",
		ssw: "SSO",
		sw: "SO",
		wsw: "OSO",
		w: "O",
		wnw: "ONO",
		nw: "NO",
		nnw: "NNO"
	}, xa = {
		chance_of_precipitation: "{0}% chance de precipitação",
		now: "Agora"
	}, Sa = {
		common: ga,
		editor: _a,
		errors: va,
		conditions: ya,
		direction: ba,
		card: xa
	};
})), wa = /* @__PURE__ */ n({
	card: () => Aa,
	common: () => Ta,
	conditions: () => Oa,
	default: () => ja,
	direction: () => ka,
	editor: () => Ea,
	errors: () => Da
}), Ta, Ea, Da, Oa, ka, Aa, ja, Ma = t((() => {
	Ta = {
		version: "Версия",
		title: "Почасовая погода",
		title_card: "Карточка почасовой погоды",
		description: "Карточка для отображения почасовых условий погоды в виде полосы.",
		invalid_configuration: "Недопустимая конфигурация"
	}, Ea = {
		entity: "Сущность (Обязательно)",
		name: "Название (По желанию)",
		segments_to_show: "Количество отображаемых сегментов (По желанию)",
		offset: "Количество сегментов для смещения (По желанию)",
		icons: "Отображать значки вместо текстовых меток",
		show_current: "Отображение текущей погоды в первом сегменте",
		auto_label_spacing: "Автоматическое уменьшение количества подписей при узкой карточке",
		label_spacing: "Количество сегментов для размещения временных и температурных меток (По желанию)",
		show_wind: "Отображать скорость и направление ветра",
		show_date: "Отображать даты",
		show_precipitation_amounts: "Отображать количество осадков",
		show_precipitation_probability: "Отображать вероятность осадков",
		none: "Нет",
		speed_and_direction: "Скорость и направление",
		speed_only: "Только скорость",
		direction_only: "Только направление",
		barb: "Как ветровой флажок",
		barb_and_speed: "Как ветровой флажок и скорость",
		barb_and_direction: "Как ветровой флажок и направление",
		barb_speed_and_direction: "Как ветровой флажок, скорость и направление",
		all: "Все",
		on_day_boundaries: "На границах дня"
	}, Da = {
		missing_entity: "Отсутствует сущность в конфигурации",
		too_many_segments_requested: "Запрошено слишком много сегментов в num_segments. Должно быть <= количества сегментов в сущности прогноза.",
		must_be_int: "Должно быть четным целым числом, большим или равным 2",
		invalid_colors: "Следующие цвета в вашей конфигурации недопустимы:",
		must_be_positive_int: "Должно быть положительным целым числом",
		offset_must_be_positive_int: "Смещение должно быть положительным целым числом",
		forecast_not_available: "Прогноз недоступен",
		check_entity: "Проверьте настроенную сущность прогноза.",
		invalid_value_icon_fill: "icon_fill должен быть либо положительным целым числом, либо одним из значений 'single' или 'full'"
	}, Oa = {
		clear: "Ясно",
		cloudy: "Облачно",
		fog: "Туман",
		hail: "Град",
		thunderstorm: "Гроза",
		partlyCloudy: "Частичная облачность",
		partlyCloudyNight: "Частичная облачность (ночь)",
		heavyRain: "Сильный дождь",
		rain: "Дождь",
		snow: "Снег",
		mixedPrecip: "Смешанные осадки",
		sunny: "Солнечно",
		windy: "Ветрено"
	}, ka = {
		n: "С",
		nne: "ССВ",
		ne: "СВ",
		ene: "ВСВ",
		e: "В",
		ese: "ВЮВ",
		se: "ЮВ",
		sse: "ЮЮВ",
		s: "Ю",
		ssw: "ЮЮЗ",
		sw: "ЮЗ",
		wsw: "ЗЮЗ",
		w: "З",
		wnw: "ЗСЗ",
		nw: "СЗ",
		nnw: "ССЗ"
	}, Aa = {
		now: "Сейчас",
		chance_of_precipitation: "Вероятность осадков: {0}%"
	}, ja = {
		common: Ta,
		editor: Ea,
		errors: Da,
		conditions: Oa,
		direction: ka,
		card: Aa
	};
})), Na = /* @__PURE__ */ n({
	card: () => za,
	common: () => Pa,
	conditions: () => La,
	default: () => Ba,
	direction: () => Ra,
	editor: () => Fa,
	errors: () => Ia
}), Pa, Fa, Ia, La, Ra, za, Ba, Va = t((() => {
	Pa = {
		version: "Verzia",
		title: "Hodinové počasie",
		title_card: "Hodinové Weather Card",
		description: "Karta na vykreslenie hodinových poveternostných podmienok ako pruh.",
		invalid_configuration: "Neplatná konfigurácia"
	}, Fa = {
		entity: "Entita (požadovaná)",
		name: "Názov (voliteľné)",
		segments_to_show: "Počet segmentov prognózy, ktoré sa majú zobraziť (voliteľné)",
		offset: "Počet segmentov prognózy, o ktoré sa má začať kompenzácia (voliteľné)",
		icons: "Zobrazovať ikony namiesto textových štítkov",
		show_current: "Zobraziť aktuálne počasie ako prvý segment",
		auto_label_spacing: "Automaticky zmenšiť popisky, keď je karta úzka",
		label_spacing: "Počet segmentov predpovede na štítky časopriestoru a teploty podľa (voliteľné)",
		show_wind: "Zobraziť rýchlosť a smer vetra",
		show_date: "Zobraziť dátumy",
		show_precipitation_amounts: "Zobraziť množstvo zrážok",
		show_precipitation_probability: "Zobraziť pravdepodobnosť zrážok",
		none: "Nič",
		speed_and_direction: "Rýchlosť a smer",
		speed_only: "Len rýchlosť",
		direction_only: "Len smer",
		barb: "Ako veterný osteň",
		barb_and_speed: "Ako veterný osteň a rýchlosť",
		barb_and_direction: "Ako veterný osteň a smer",
		barb_speed_and_direction: "Ako veterný osteň, rýchlosť a smer",
		all: "Všetky",
		on_day_boundaries: "Na hraniciach dňa"
	}, Ia = {
		missing_entity: "v konfigurácii chýba entita",
		too_many_segments_requested: "Príliš veľa segmentov prognózy požadovaných v num_segments. Musí byť <= počet segmentov v entite prognózy.",
		must_be_int: "Musí byť párne celé číslo väčšie alebo rovné 2",
		invalid_colors: "Nasledujúce farby vo vašej konfigurácii sú neplatné:",
		must_be_positive_int: "Musí to byť kladné celé číslo",
		offset_must_be_positive_int: "offset musí byť kladné celé číslo",
		forecast_not_available: "Predpoveď nie je k dispozícii",
		check_entity: "Skontrolujte nakonfigurovanú entitu predpovede.",
		invalid_value_icon_fill: "icon_fill musí byť buď kladné celé číslo alebo jedno z 'single'; alebo 'full';"
	}, La = {
		clear: "Čisté",
		cloudy: "Zamračené",
		fog: "Hmla",
		hail: "Ľadovec",
		thunderstorm: "Búrka",
		partlyCloudy: "Čiastočne zamračené",
		partlyCloudyNight: "Čiastočne zamračené (noc)",
		heavyRain: "Hustý dážď",
		rain: "Dážď",
		snow: "Sneh",
		mixedPrecip: "Zmiešené",
		sunny: "Slnečno",
		windy: "Veterno"
	}, Ra = {
		n: "S",
		nne: "SSV",
		ne: "SV",
		ene: "VSV",
		e: "V",
		ese: "VJV",
		se: "JV",
		sse: "JJV",
		s: "J",
		ssw: "JJZ",
		sw: "JZ",
		wsw: "ZJZ",
		w: "Z",
		wnw: "ZSZ",
		nw: "SZ",
		nnw: "SSZ"
	}, za = {
		now: "Teraz",
		chance_of_precipitation: "{0}% možnosť zrážok"
	}, Ba = {
		common: Pa,
		editor: Fa,
		errors: Ia,
		conditions: La,
		direction: Ra,
		card: za
	};
})), Ha = /* @__PURE__ */ n({
	card: () => Ja,
	common: () => Ua,
	conditions: () => Ka,
	default: () => Ya,
	direction: () => qa,
	editor: () => Wa,
	errors: () => Ga
}), Ua, Wa, Ga, Ka, qa, Ja, Ya, Xa = t((() => {
	Ua = {
		version: "Verzija",
		title: "Prognoza po satima",
		title_card: "Kartica sa prognozom po satima",
		description: "Kartica za prikaz vremenskih uslova po satima u obliku trake.",
		invalid_configuration: "Neispravna konfiguracija"
	}, Wa = {
		entity: "Entitet (Obavezno)",
		name: "Naziv (Opciono)",
		segments_to_show: "Broj segmenata prognoze za prikaz (Opciono)",
		offset: "Broj segmenata prognoze za pomeranje početka (Opciono)",
		icons: "Prikaz ikone umesto tekstualnih oznaka",
		show_current: "Prikaži trenutno vreme kao prvi segment",
		auto_label_spacing: "Automatski smanji broj oznaka kada je kartica uska",
		label_spacing: "Razmak između oznaka vremena i temperature izražen u broju segmenata (Opciono)",
		show_wind: "Prikaži brzinu i smer vetra",
		show_date: "Prikaži datume",
		show_precipitation_amounts: "Prikaz količine padavina",
		show_precipitation_probability: "Prikaz verovatnoće padavina",
		none: "Nijedno",
		speed_and_direction: "Brzina i smer",
		speed_only: "Samo brzina",
		direction_only: "Samo smer",
		barb: "Kao strelica za vetar (barb)",
		barb_and_speed: "Kao strelica za vetar i brzina",
		barb_and_direction: "Kao strelica za vetar i smer",
		barb_speed_and_direction: "Kao strelica za vetar, brzina i smer",
		all: "Sve",
		on_day_boundaries: "Na granicama dana"
	}, Ga = {
		missing_entity: "entitet nedostaje u konfiguraciji",
		too_many_segments_requested: "Zatraženo je previše segmenata prognoze u 'num_segments'. Broj mora biti manji ili jednak broju segmenata u samom entitetu prognoze.",
		must_be_int: "Mora biti paran ceo broj veći od ili jednak 2",
		invalid_colors: "Sledeće boje u vašoj konfiguraciji nisu ispravne:",
		must_be_positive_int: "Mora biti pozitivan ceo broj",
		offset_must_be_positive_int: "'offset' mora biti pozitivan ceo broj",
		forecast_not_available: "Prognoza nije dostupna",
		check_entity: "Proverite podešeni entitet za prognozu.",
		invalid_value_icon_fill: "'icon_fill' mora biti pozitivan ceo broj ili jedna od vrednosti: 'single' ili 'full'"
	}, Ka = {
		clear: "Vedro",
		cloudy: "Oblačno",
		fog: "Magla",
		hail: "Grad",
		thunderstorm: "Grmljavina",
		partlyCloudy: "Delimično oblačno",
		partlyCloudyNight: "Delimično oblačno (noću)",
		heavyRain: "Jaka kiša",
		rain: "Kiša",
		snow: "Sneg",
		mixedPrecip: "Susnežica",
		sunny: "Sunčano",
		windy: "Vetrovito"
	}, qa = {
		n: "S",
		nne: "SSI",
		ne: "SI",
		ene: "ISI",
		e: "I",
		ese: "IJI",
		se: "JI",
		sse: "JJI",
		s: "J",
		ssw: "JJZ",
		sw: "JZ",
		wsw: "ZJZ",
		w: "Z",
		wnw: "ZZS",
		nw: "SZ",
		nnw: "SSZ"
	}, Ja = {
		now: "Sada",
		chance_of_precipitation: "{0}% šanse za padavine"
	}, Ya = {
		common: Ua,
		editor: Wa,
		errors: Ga,
		conditions: Ka,
		direction: qa,
		card: Ja
	};
})), Za = /* @__PURE__ */ n({
	card: () => ro,
	common: () => Qa,
	conditions: () => to,
	default: () => io,
	direction: () => no,
	editor: () => $a,
	errors: () => eo
}), Qa, $a, eo, to, no, ro, io, ao = t((() => {
	Qa = {
		version: "Sürüm",
		title: "Saatlik Hava Durumu",
		title_card: "Saatlik Hava Durumu Kartı",
		description: "Saatlik hava koşullarını çubuk grafik olarak gösteren bir kart.",
		invalid_configuration: "Geçersiz yapılandırma"
	}, $a = {
		entity: "Varlık (Zorunlu)",
		name: "Ad (İsteğe bağlı)",
		segments_to_show: "Gösterilecek tahmin dilimi sayısı (İsteğe bağlı)",
		offset: "Başlangıcı öteleme sayısı (İsteğe bağlı)",
		icons: "Metin etiketleri yerine simgeleri göster",
		show_current: "Mevcut hava durumunu ilk bölüm olarak göster",
		auto_label_spacing: "Kart daraldığında etiketleri otomatik olarak küçült",
		label_spacing: "Zaman ve sıcaklık etiketlerinin aralık sayısı (İsteğe bağlı)",
		show_wind: "Rüzgar hızı ve yönünü göster",
		show_date: "Tarihleri göster",
		show_precipitation_amounts: "Yağış miktarını göster",
		show_precipitation_probability: "Yağış olasılığını göster",
		none: "Yok",
		speed_and_direction: "Hız ve yön",
		speed_only: "Sadece hız",
		direction_only: "Sadece yön",
		barb: "Rüzgar oku olarak",
		barb_and_speed: "Rüzgar oku ve hız olarak",
		barb_and_direction: "Rüzgar oku ve yön olarak",
		barb_speed_and_direction: "Rüzgar oku, hız ve yön olarak",
		all: "Tümü",
		on_day_boundaries: "Gün sınırlarında"
	}, eo = {
		missing_entity: "Yapılandırmada varlık eksik",
		too_many_segments_requested: "İstenen tahmin dilimi sayısı çok fazla. num_segments değeri, tahmin varlığındaki dilim sayısından fazla olamaz.",
		must_be_int: "2 veya daha büyük çift bir tam sayı olmalı",
		invalid_colors: "Yapılandırmanızdaki geçersiz renkler:",
		must_be_positive_int: "Pozitif bir tam sayı olmalı",
		offset_must_be_positive_int: "offset pozitif bir tam sayı olmalı",
		forecast_not_available: "Tahmin mevcut değil",
		check_entity: "Yapılandırılmış tahmin varlığını kontrol edin.",
		invalid_value_icon_fill: "icon_fill değeri pozitif bir tam sayı ya da 'single' veya 'full' olmalıdır"
	}, to = {
		clear: "Açık",
		cloudy: "Bulutlu",
		fog: "Sisli",
		hail: "Dolu",
		thunderstorm: "Gök gürültülü fırtına",
		partlyCloudy: "Parçalı bulutlu",
		partlyCloudyNight: "Parçalı bulutlu (gece)",
		heavyRain: "Şiddetli yağmur",
		rain: "Yağmur",
		snow: "Kar",
		mixedPrecip: "Karışık yağış",
		sunny: "Güneşli",
		windy: "Rüzgarlı"
	}, no = {
		n: "K",
		nne: "KKB",
		ne: "KB",
		ene: "DKB",
		e: "D",
		ese: "DGD",
		se: "GD",
		sse: "GGB",
		s: "G",
		ssw: "GGB",
		sw: "GB",
		wsw: "BGB",
		w: "B",
		wnw: "BKB",
		nw: "KB",
		nnw: "KKB"
	}, ro = {
		now: "Şimdi",
		chance_of_precipitation: "%{0} yağış olasılığı"
	}, io = {
		common: Qa,
		editor: $a,
		errors: eo,
		conditions: to,
		direction: no,
		card: ro
	};
})), oo = /* @__PURE__ */ n({
	card: () => po,
	common: () => so,
	conditions: () => uo,
	default: () => mo,
	direction: () => fo,
	editor: () => co,
	errors: () => lo
}), so, co, lo, uo, fo, po, mo, ho = t((() => {
	so = {
		version: "Версія",
		title: "Погодинний прогноз погоди",
		title_card: "Картка погодинного прогнозу погоди",
		description: "Картка для відображення погодинних умов погоди у вигляді діаграми.",
		invalid_configuration: "Недійсна конфігурація"
	}, co = {
		entity: "Сутність (Обов'язково)",
		name: "Назва (Необов'язково)",
		segments_to_show: "Кількість сегментів прогнозу для показу (Необов'язково)",
		offset: "Кількість сегментів прогнозу для зміщення початку (Необов'язково)",
		icons: "Показувати іконки замість текстових міток",
		show_current: "Показувати поточну погоду як перший сегмент",
		auto_label_spacing: "Автоматично зменшувати мітки, коли картка вузька",
		label_spacing: "Кількість сегментів прогнозу для інтервалу між мітками часу та температури (Необов'язково)",
		show_wind: "Показувати швидкість та напрямок вітру",
		show_date: "Показувати дати",
		show_precipitation_amounts: "Показувати кількість опадів",
		show_precipitation_probability: "Показувати ймовірність опадів",
		none: "Нічого",
		speed_and_direction: "Швидкість та напрямок",
		speed_only: "Тільки швидкість",
		direction_only: "Тільки напрямок",
		barb: "Як вітровий вимпел",
		barb_and_speed: "Як вітровий вимпел та швидкість",
		barb_and_direction: "Як вітровий вимпел та напрямок",
		barb_speed_and_direction: "Як вітровий вимпел, швидкість та напрямок",
		all: "Все",
		on_day_boundaries: "На межах днів"
	}, lo = {
		missing_entity: "відсутня сутність в конфігурації",
		too_many_segments_requested: "Запитано забагато сегментів прогнозу в num_segments. Має бути <= кількості сегментів в сутності прогнозу.",
		must_be_int: "Має бути парним цілим числом більшим або рівним 2",
		invalid_colors: "Наступні кольори у вашій конфігурації недійсні:",
		must_be_positive_int: "Має бути додатнім цілим числом",
		offset_must_be_positive_int: "offset має бути додатнім цілим числом",
		forecast_not_available: "Прогноз недоступний",
		check_entity: "Перевірте налаштовану сутність прогнозу.",
		invalid_value_icon_fill: "icon_fill має бути додатнім цілим числом або одним з 'single' чи 'full'"
	}, uo = {
		clear: "Ясно",
		cloudy: "Хмарно",
		fog: "Туман",
		hail: "Град",
		thunderstorm: "Гроза",
		partlyCloudy: "Частково хмарно",
		partlyCloudyNight: "Частково хмарно (ніч)",
		heavyRain: "Сильний дощ",
		rain: "Дощ",
		snow: "Сніг",
		mixedPrecip: "Змішані опади",
		sunny: "Сонячно",
		windy: "Вітряно"
	}, fo = {
		n: "Пн",
		nne: "ПнПнСх",
		ne: "ПнСх",
		ene: "СхПнСх",
		e: "Сх",
		ese: "СхПдСх",
		se: "ПдСх",
		sse: "ПдПдСх",
		s: "Пд",
		ssw: "ПдПдЗх",
		sw: "ПдЗх",
		wsw: "ЗхПдЗх",
		w: "Зх",
		wnw: "ЗхПнЗх",
		nw: "ПнЗх",
		nnw: "ПнПнЗх"
	}, po = {
		now: "Зараз",
		chance_of_precipitation: "{0}% ймовірність опадів"
	}, mo = {
		common: so,
		editor: co,
		errors: lo,
		conditions: uo,
		direction: fo,
		card: po
	};
})), go = /* @__PURE__ */ n({
	card: () => So,
	common: () => _o,
	conditions: () => bo,
	default: () => Co,
	direction: () => xo,
	editor: () => vo,
	errors: () => yo
}), _o, vo, yo, bo, xo, So, Co, wo = t((() => {
	_o = {
		version: "版本",
		title: "逐小时天气",
		title_card: "逐小时天气卡片",
		description: "一个用于显示逐小时天气状况的卡片。",
		invalid_configuration: "无效的配置"
	}, vo = {
		entity: "实体（必需）",
		name: "名称（可选）",
		segments_to_show: "显示的预测段数（可选）",
		offset: "开始的预测段偏移数（可选）",
		icons: "显示图标而非文字标签",
		show_current: "将当前天气显示为第一部分",
		auto_label_spacing: "卡片变窄时自动缩小标签",
		label_spacing: "时间和温度标签的预测段间距数（可选）",
		show_wind: "显示风速和风向",
		show_date: "显示日期",
		show_precipitation_amounts: "显示降雨量",
		show_precipitation_probability: "显示降雨概率",
		none: "无",
		speed_and_direction: "速度和方向",
		speed_only: "仅速度",
		direction_only: "仅方向",
		barb: "风向图标",
		barb_and_speed: "风向图标和速度",
		barb_and_direction: "风向图标和方向",
		barb_speed_and_direction: "风向图标，速度和方向",
		all: "全部",
		on_day_boundaries: "在日边界上"
	}, yo = {
		missing_entity: "配置中缺少实体",
		too_many_segments_requested: "在num_segments中请求的预测段过多。必须 <= 预测实体中的段数。",
		must_be_int: "必须是大于或等于2的偶数",
		invalid_colors: "配置中的以下颜色无效：",
		must_be_positive_int: "必须是正整数",
		offset_must_be_positive_int: "偏移必须是正整数",
		forecast_not_available: "预测不可用",
		check_entity: "检查配置的预测实体。",
		invalid_value_icon_fill: "icon_fill 必须是正整数,或者是'single'或'full'之一"
	}, bo = {
		clear: "晴朗",
		cloudy: "多云",
		fog: "雾",
		hail: "冰雹",
		thunderstorm: "雷暴",
		partlyCloudy: "局部多云",
		partlyCloudyNight: "局部多云（夜间）",
		heavyRain: "大雨",
		rain: "雨",
		snow: "雪",
		mixedPrecip: "雨夹雪",
		sunny: "晴天",
		windy: "有风"
	}, xo = {
		n: "北",
		nne: "北偏东",
		ne: "东北",
		ene: "东偏北",
		e: "东",
		ese: "东偏南",
		se: "东南",
		sse: "南偏东",
		s: "南",
		ssw: "南偏西",
		sw: "西南",
		wsw: "西偏南",
		w: "西",
		wnw: "西偏北",
		nw: "西北",
		nnw: "北偏西"
	}, So = {
		now: "现在",
		chance_of_precipitation: "{0}%的降雨概率"
	}, Co = {
		common: _o,
		editor: vo,
		errors: yo,
		conditions: bo,
		direction: xo,
		card: So
	};
}));
//#endregion
//#region src/localize/localize.ts
function To(e, t) {
	return function(n, r = "", i = "") {
		let a = (e || localStorage.getItem("selectedLanguage") || t || "en").replace(/['"]+/g, "").replace("-", "_"), o;
		try {
			o = n.split(".").reduce((e, t) => e[t], Eo[a]);
		} catch {
			o = n.split(".").reduce((e, t) => e[t], Eo.en);
		}
		return o === void 0 && (o = n.split(".").reduce((e, t) => e[t], Eo.en)), r !== "" && i !== "" && (o = o.replace(r, i)), o;
	};
}
var Eo, Do = t((() => {
	ar(), mr(), Cr(), Mr(), Vr(), Xr(), ai(), mi(), Ci(), Mi(), Vi(), Xi(), aa(), ma(), Ca(), Ma(), Va(), Xa(), ao(), ho(), wo(), Eo = {
		bg: Zn,
		cs: or,
		da: hr,
		de: wr,
		en: Nr,
		es: Hr,
		fr: Zr,
		hu: oi,
		it: hi,
		nb: wi,
		nn_NO: Ni,
		nl: Hi,
		pl: Zi,
		pt: oa,
		pt_BR: ha,
		ru: wa,
		sk: Na,
		sr_Latn: Ha,
		tr: Za,
		uk: oo,
		zh: go
	};
}));
//#endregion
//#region src/solar.ts
Do();
var Oo = Math.PI / 180, ko = 360, Ao = 24, jo = 864e5, Mo = 15, No = 2451545, Po = 2440587.5, Fo = 280.46, Io = .9856474, Lo = 357.528, Ro = .9856003, zo = 1.915, Bo = .02, Vo = 23.439, Ho = 4e-7, Uo = 18.697374558, Wo = 24.06570982441908, Go = -.833;
function Ko(e, t, n) {
	let r = e.getTime() / jo + Po - No, i = (Fo + Io * r) % ko, a = (Lo + Ro * r) % ko * Oo, o = (i + zo * Math.sin(a) + Bo * Math.sin(2 * a)) * Oo, s = (Vo - Ho * r) * Oo, c = Math.asin(Math.sin(s) * Math.sin(o)), l = Math.atan2(Math.cos(s) * Math.sin(o), Math.cos(o)), u = (Uo + Wo * r) % Ao;
	u < 0 && (u += Ao);
	let d = u * Mo * Oo + n * Oo - l, f = t * Oo, p = Math.sin(f) * Math.sin(c) + Math.cos(f) * Math.cos(c) * Math.cos(d);
	return Math.asin(Math.min(1, Math.max(-1, p))) / Oo;
}
function qo(e, t, n) {
	return Ko(e, t, n) > Go;
}
//#endregion
//#region node_modules/lit-html/directives/style-map.js
Dt();
var Jo = "important", Yo = " !" + Jo, Xo = En(class extends Dn {
	constructor(e) {
		if (super(e), e.type !== Tn.ATTRIBUTE || e.name !== "style" || e.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return Object.keys(e).reduce(((t, n) => {
			let r = e[n];
			return r == null ? t : t + `${n = n.includes("-") ? n : n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${r};`;
		}), "");
	}
	update(e, [t]) {
		let { style: n } = e.element;
		if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
		for (let e of this.ft) t[e] ?? (this.ft.delete(e), e.includes("-") ? n.removeProperty(e) : n[e] = null);
		for (let e in t) {
			let r = t[e];
			if (r != null) {
				this.ft.add(e);
				let t = typeof r == "string" && r.endsWith(Yo);
				e.includes("-") || t ? n.setProperty(e, t ? r.slice(0, -11) : r, t ? Jo : "") : n[e] = r;
			}
		}
		return V;
	}
}), W = "bottom", Zo = "right", G = "left", Qo = "auto", $o = [
	"top",
	W,
	Zo,
	G
], es = "start", ts = "clippingParents", ns = "viewport", rs = "popper", is = "reference", as = /*#__PURE__*/ $o.reduce(function(e, t) {
	return e.concat([t + "-" + es, t + "-end"]);
}, []), os = /*#__PURE__*/ [].concat($o, [Qo]).reduce(function(e, t) {
	return e.concat([
		t,
		t + "-" + es,
		t + "-end"
	]);
}, []), ss = [
	"beforeRead",
	"read",
	"afterRead",
	"beforeMain",
	"main",
	"afterMain",
	"beforeWrite",
	"write",
	"afterWrite"
];
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function K(e) {
	return e ? (e.nodeName || "").toLowerCase() : null;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function q(e) {
	if (e == null) return window;
	if (e.toString() !== "[object Window]") {
		var t = e.ownerDocument;
		return t && t.defaultView || window;
	}
	return e;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function cs(e) {
	return e instanceof q(e).Element || e instanceof Element;
}
function J(e) {
	return e instanceof q(e).HTMLElement || e instanceof HTMLElement;
}
function ls(e) {
	return typeof ShadowRoot > "u" ? !1 : e instanceof q(e).ShadowRoot || e instanceof ShadowRoot;
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function us(e) {
	var t = e.state;
	Object.keys(t.elements).forEach(function(e) {
		var n = t.styles[e] || {}, r = t.attributes[e] || {}, i = t.elements[e];
		J(i) && K(i) && (Object.assign(i.style, n), Object.keys(r).forEach(function(e) {
			var t = r[e];
			t === !1 ? i.removeAttribute(e) : i.setAttribute(e, t === !0 ? "" : t);
		}));
	});
}
function ds(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
		Object.keys(t.elements).forEach(function(e) {
			var r = t.elements[e], i = t.attributes[e] || {}, a = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce(function(e, t) {
				return e[t] = "", e;
			}, {});
			J(r) && K(r) && (Object.assign(r.style, a), Object.keys(i).forEach(function(e) {
				r.removeAttribute(e);
			}));
		});
	};
}
var fs = {
	name: "applyStyles",
	enabled: !0,
	phase: "write",
	fn: us,
	effect: ds,
	requires: ["computeStyles"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function Y(e) {
	return e.split("-")[0];
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/math.js
var ps = Math.max, ms = Math.min, hs = Math.round;
//#endregion
//#region node_modules/@popperjs/core/lib/utils/userAgent.js
function gs() {
	var e = navigator.userAgentData;
	return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
		return e.brand + "/" + e.version;
	}).join(" ") : navigator.userAgent;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function _s() {
	return !/^((?!chrome|android).)*safari/i.test(gs());
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function vs(e, t, n) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	var r = e.getBoundingClientRect(), i = 1, a = 1;
	t && J(e) && (i = e.offsetWidth > 0 && hs(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && hs(r.height) / e.offsetHeight || 1);
	var o = (cs(e) ? q(e) : window).visualViewport, s = !_s() && n, c = (r.left + (s && o ? o.offsetLeft : 0)) / i, l = (r.top + (s && o ? o.offsetTop : 0)) / a, u = r.width / i, d = r.height / a;
	return {
		width: u,
		height: d,
		top: l,
		right: c + u,
		bottom: l + d,
		left: c,
		x: c,
		y: l
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function ys(e) {
	var t = vs(e), n = e.offsetWidth, r = e.offsetHeight;
	return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
		x: e.offsetLeft,
		y: e.offsetTop,
		width: n,
		height: r
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/contains.js
function bs(e, t) {
	var n = t.getRootNode && t.getRootNode();
	if (e.contains(t)) return !0;
	if (n && ls(n)) {
		var r = t;
		do {
			if (r && e.isSameNode(r)) return !0;
			r = r.parentNode || r.host;
		} while (r);
	}
	return !1;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function xs(e) {
	return q(e).getComputedStyle(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function Ss(e) {
	return [
		"table",
		"td",
		"th"
	].indexOf(K(e)) >= 0;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function Cs(e) {
	return ((cs(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function ws(e) {
	return K(e) === "html" ? e : e.assignedSlot || e.parentNode || (ls(e) ? e.host : null) || Cs(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function Ts(e) {
	return !J(e) || xs(e).position === "fixed" ? null : e.offsetParent;
}
function Es(e) {
	var t = /firefox/i.test(gs());
	if (/Trident/i.test(gs()) && J(e) && xs(e).position === "fixed") return null;
	var n = ws(e);
	for (ls(n) && (n = n.host); J(n) && ["html", "body"].indexOf(K(n)) < 0;) {
		var r = xs(n);
		if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none") return n;
		n = n.parentNode;
	}
	return null;
}
function Ds(e) {
	for (var t = q(e), n = Ts(e); n && Ss(n) && xs(n).position === "static";) n = Ts(n);
	return n && (K(n) === "html" || K(n) === "body" && xs(n).position === "static") ? t : n || Es(e) || t;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function Os(e) {
	return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/within.js
function ks(e, t, n) {
	return ps(e, ms(t, n));
}
function As(e, t, n) {
	var r = ks(e, t, n);
	return r > n ? n : r;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function js() {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function Ms(e) {
	return Object.assign({}, js(), e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function Ns(e, t) {
	return t.reduce(function(t, n) {
		return t[n] = e, t;
	}, {});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/arrow.js
var Ps = function(e, t) {
	return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Ms(typeof e == "number" ? Ns(e, $o) : e);
};
function Fs(e) {
	var t, n = e.state, r = e.name, i = e.options, a = n.elements.arrow, o = n.modifiersData.popperOffsets, s = Y(n.placement), c = Os(s), l = ["left", "right"].indexOf(s) >= 0 ? "height" : "width";
	if (a && o) {
		var u = Ps(i.padding, n), d = ys(a), f = c === "y" ? "top" : G, p = c === "y" ? W : Zo, m = n.rects.reference[l] + n.rects.reference[c] - o[c] - n.rects.popper[l], h = o[c] - n.rects.reference[c], g = Ds(a), _ = g ? c === "y" ? g.clientHeight || 0 : g.clientWidth || 0 : 0, v = m / 2 - h / 2, y = u[f], b = _ - d[l] - u[p], x = _ / 2 - d[l] / 2 + v, S = ks(y, x, b), C = c;
		n.modifiersData[r] = (t = {}, t[C] = S, t.centerOffset = S - x, t);
	}
}
function Is(e) {
	var t = e.state, n = e.options.element, r = n === void 0 ? "[data-popper-arrow]" : n;
	r != null && (typeof r == "string" && (r = t.elements.popper.querySelector(r), !r) || bs(t.elements.popper, r) && (t.elements.arrow = r));
}
var Ls = {
	name: "arrow",
	enabled: !0,
	phase: "main",
	fn: Fs,
	effect: Is,
	requires: ["popperOffsets"],
	requiresIfExists: ["preventOverflow"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getVariation.js
function Rs(e) {
	return e.split("-")[1];
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var zs = {
	top: "auto",
	right: "auto",
	bottom: "auto",
	left: "auto"
};
function Bs(e, t) {
	var n = e.x, r = e.y, i = t.devicePixelRatio || 1;
	return {
		x: hs(n * i) / i || 0,
		y: hs(r * i) / i || 0
	};
}
function Vs(e) {
	var t, n = e.popper, r = e.popperRect, i = e.placement, a = e.variation, o = e.offsets, s = e.position, c = e.gpuAcceleration, l = e.adaptive, u = e.roundOffsets, d = e.isFixed, f = o.x, p = f === void 0 ? 0 : f, m = o.y, h = m === void 0 ? 0 : m, g = typeof u == "function" ? u({
		x: p,
		y: h
	}) : {
		x: p,
		y: h
	};
	p = g.x, h = g.y;
	var _ = o.hasOwnProperty("x"), v = o.hasOwnProperty("y"), y = G, b = "top", x = window;
	if (l) {
		var S = Ds(n), C = "clientHeight", w = "clientWidth";
		if (S === q(n) && (S = Cs(n), xs(S).position !== "static" && s === "absolute" && (C = "scrollHeight", w = "scrollWidth")), S = S, i === "top" || (i === "left" || i === "right") && a === "end") {
			b = W;
			var T = d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
			h -= T - r.height, h *= c ? 1 : -1;
		}
		if (i === "left" || (i === "top" || i === "bottom") && a === "end") {
			y = Zo;
			var E = d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
			p -= E - r.width, p *= c ? 1 : -1;
		}
	}
	var D = Object.assign({ position: s }, l && zs), O = u === !0 ? Bs({
		x: p,
		y: h
	}, q(n)) : {
		x: p,
		y: h
	};
	if (p = O.x, h = O.y, c) {
		var k;
		return Object.assign({}, D, (k = {}, k[b] = v ? "0" : "", k[y] = _ ? "0" : "", k.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", k));
	}
	return Object.assign({}, D, (t = {}, t[b] = v ? h + "px" : "", t[y] = _ ? p + "px" : "", t.transform = "", t));
}
function Hs(e) {
	var t = e.state, n = e.options, r = n.gpuAcceleration, i = r === void 0 || r, a = n.adaptive, o = a === void 0 || a, s = n.roundOffsets, c = s === void 0 || s, l = {
		placement: Y(t.placement),
		variation: Rs(t.placement),
		popper: t.elements.popper,
		popperRect: t.rects.popper,
		gpuAcceleration: i,
		isFixed: t.options.strategy === "fixed"
	};
	t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Vs(Object.assign({}, l, {
		offsets: t.modifiersData.popperOffsets,
		position: t.options.strategy,
		adaptive: o,
		roundOffsets: c
	})))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Vs(Object.assign({}, l, {
		offsets: t.modifiersData.arrow,
		position: "absolute",
		adaptive: !1,
		roundOffsets: c
	})))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Us = {
	name: "computeStyles",
	enabled: !0,
	phase: "beforeWrite",
	fn: Hs,
	data: {}
}, Ws = { passive: !0 };
function Gs(e) {
	var t = e.state, n = e.instance, r = e.options, i = r.scroll, a = i === void 0 || i, o = r.resize, s = o === void 0 || o, c = q(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
	return a && l.forEach(function(e) {
		e.addEventListener("scroll", n.update, Ws);
	}), s && c.addEventListener("resize", n.update, Ws), function() {
		a && l.forEach(function(e) {
			e.removeEventListener("scroll", n.update, Ws);
		}), s && c.removeEventListener("resize", n.update, Ws);
	};
}
var Ks = {
	name: "eventListeners",
	enabled: !0,
	phase: "write",
	fn: function() {},
	effect: Gs,
	data: {}
}, qs = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function Js(e) {
	return e.replace(/left|right|bottom|top/g, function(e) {
		return qs[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var Ys = {
	start: "end",
	end: "start"
};
function Xs(e) {
	return e.replace(/start|end/g, function(e) {
		return Ys[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function Zs(e) {
	var t = q(e);
	return {
		scrollLeft: t.pageXOffset,
		scrollTop: t.pageYOffset
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function Qs(e) {
	return vs(Cs(e)).left + Zs(e).scrollLeft;
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function $s(e, t) {
	var n = q(e), r = Cs(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		var l = _s();
		(l || !l && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s + Qs(e),
		y: c
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function ec(e) {
	var t = Cs(e), n = Zs(e), r = e.ownerDocument?.body, i = ps(t.scrollWidth, t.clientWidth, r ? r.scrollWidth : 0, r ? r.clientWidth : 0), a = ps(t.scrollHeight, t.clientHeight, r ? r.scrollHeight : 0, r ? r.clientHeight : 0), o = -n.scrollLeft + Qs(e), s = -n.scrollTop;
	return xs(r || t).direction === "rtl" && (o += ps(t.clientWidth, r ? r.clientWidth : 0) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function tc(e) {
	var t = xs(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
	return /auto|scroll|overlay|hidden/.test(n + i + r);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function nc(e) {
	return [
		"html",
		"body",
		"#document"
	].indexOf(K(e)) >= 0 ? e.ownerDocument.body : J(e) && tc(e) ? e : nc(ws(e));
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function rc(e, t) {
	t === void 0 && (t = []);
	var n = nc(e), r = n === e.ownerDocument?.body, i = q(n), a = r ? [i].concat(i.visualViewport || [], tc(n) ? n : []) : n, o = t.concat(a);
	return r ? o : o.concat(rc(ws(a)));
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function ic(e) {
	return Object.assign({}, e, {
		left: e.x,
		top: e.y,
		right: e.x + e.width,
		bottom: e.y + e.height
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function ac(e, t) {
	var n = vs(e, !1, t === "fixed");
	return n.top += e.clientTop, n.left += e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function oc(e, t, n) {
	return t === "viewport" ? ic($s(e, n)) : cs(t) ? ac(t, n) : ic(ec(Cs(e)));
}
function sc(e) {
	var t = rc(ws(e)), n = ["absolute", "fixed"].indexOf(xs(e).position) >= 0 && J(e) ? Ds(e) : e;
	return cs(n) ? t.filter(function(e) {
		return cs(e) && bs(e, n) && K(e) !== "body";
	}) : [];
}
function cc(e, t, n, r) {
	var i = t === "clippingParents" ? sc(e) : [].concat(t), a = [].concat(i, [n]), o = a[0], s = a.reduce(function(t, n) {
		var i = oc(e, n, r);
		return t.top = ps(i.top, t.top), t.right = ms(i.right, t.right), t.bottom = ms(i.bottom, t.bottom), t.left = ps(i.left, t.left), t;
	}, oc(e, o, r));
	return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeOffsets.js
function lc(e) {
	var t = e.reference, n = e.element, r = e.placement, i = r ? Y(r) : null, a = r ? Rs(r) : null, o = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
	switch (i) {
		case "top":
			c = {
				x: o,
				y: t.y - n.height
			};
			break;
		case W:
			c = {
				x: o,
				y: t.y + t.height
			};
			break;
		case Zo:
			c = {
				x: t.x + t.width,
				y: s
			};
			break;
		case G:
			c = {
				x: t.x - n.width,
				y: s
			};
			break;
		default: c = {
			x: t.x,
			y: t.y
		};
	}
	var l = i ? Os(i) : null;
	if (l != null) {
		var u = l === "y" ? "height" : "width";
		switch (a) {
			case es:
				c[l] = c[l] - (t[u] / 2 - n[u] / 2);
				break;
			case "end": c[l] = c[l] + (t[u] / 2 - n[u] / 2);
		}
	}
	return c;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/detectOverflow.js
function uc(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = r === void 0 ? e.placement : r, a = n.strategy, o = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? ts : s, l = n.rootBoundary, u = l === void 0 ? ns : l, d = n.elementContext, f = d === void 0 ? rs : d, p = n.altBoundary, m = p !== void 0 && p, h = n.padding, g = h === void 0 ? 0 : h, _ = Ms(typeof g == "number" ? Ns(g, $o) : g), v = f === "popper" ? is : rs, y = e.rects.popper, b = e.elements[m ? v : f], x = cc(cs(b) ? b : b.contextElement || Cs(e.elements.popper), c, u, o), S = vs(e.elements.reference), C = lc({
		reference: S,
		element: y,
		strategy: "absolute",
		placement: i
	}), w = ic(Object.assign({}, y, C)), T = f === "popper" ? w : S, E = {
		top: x.top - T.top + _.top,
		bottom: T.bottom - x.bottom + _.bottom,
		left: x.left - T.left + _.left,
		right: T.right - x.right + _.right
	}, D = e.modifiersData.offset;
	if (f === "popper" && D) {
		var O = D[i];
		Object.keys(E).forEach(function(e) {
			var t = ["right", "bottom"].indexOf(e) >= 0 ? 1 : -1, n = ["top", "bottom"].indexOf(e) >= 0 ? "y" : "x";
			E[e] += O[n] * t;
		});
	}
	return E;
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function dc(e, t) {
	t === void 0 && (t = {});
	var n = t, r = n.placement, i = n.boundary, a = n.rootBoundary, o = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, l = c === void 0 ? os : c, u = Rs(r), d = u ? s ? as : as.filter(function(e) {
		return Rs(e) === u;
	}) : $o, f = d.filter(function(e) {
		return l.indexOf(e) >= 0;
	});
	f.length === 0 && (f = d);
	var p = f.reduce(function(t, n) {
		return t[n] = uc(e, {
			placement: n,
			boundary: i,
			rootBoundary: a,
			padding: o
		})[Y(n)], t;
	}, {});
	return Object.keys(p).sort(function(e, t) {
		return p[e] - p[t];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/flip.js
function fc(e) {
	if (Y(e) === "auto") return [];
	var t = Js(e);
	return [
		Xs(e),
		t,
		Xs(t)
	];
}
function pc(e) {
	var t = e.state, n = e.options, r = e.name;
	if (!t.modifiersData[r]._skip) {
		for (var i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o === void 0 || o, c = n.fallbackPlacements, l = n.padding, u = n.boundary, d = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 || p, h = n.allowedAutoPlacements, g = t.options.placement, _ = Y(g) === g, v = c || (_ || !m ? [Js(g)] : fc(g)), y = [g].concat(v).reduce(function(e, n) {
			return e.concat(Y(n) === "auto" ? dc(t, {
				placement: n,
				boundary: u,
				rootBoundary: d,
				padding: l,
				flipVariations: m,
				allowedAutoPlacements: h
			}) : n);
		}, []), b = t.rects.reference, x = t.rects.popper, S = /* @__PURE__ */ new Map(), C = !0, w = y[0], T = 0; T < y.length; T++) {
			var E = y[T], D = Y(E), O = Rs(E) === es, k = ["top", W].indexOf(D) >= 0, A = k ? "width" : "height", j = uc(t, {
				placement: E,
				boundary: u,
				rootBoundary: d,
				altBoundary: f,
				padding: l
			}), M = k ? O ? Zo : G : O ? W : "top";
			b[A] > x[A] && (M = Js(M));
			var N = Js(M), ee = [];
			if (a && ee.push(j[D] <= 0), s && ee.push(j[M] <= 0, j[N] <= 0), ee.every(function(e) {
				return e;
			})) {
				w = E, C = !1;
				break;
			}
			S.set(E, ee);
		}
		if (C) for (var P = m ? 3 : 1, te = function(e) {
			var t = y.find(function(t) {
				var n = S.get(t);
				if (n) return n.slice(0, e).every(function(e) {
					return e;
				});
			});
			if (t) return w = t, "break";
		}, F = P; F > 0 && te(F) !== "break"; F--);
		t.placement !== w && (t.modifiersData[r]._skip = !0, t.placement = w, t.reset = !0);
	}
}
var mc = {
	name: "flip",
	enabled: !0,
	phase: "main",
	fn: pc,
	requiresIfExists: ["offset"],
	data: { _skip: !1 }
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/hide.js
function hc(e, t, n) {
	return n === void 0 && (n = {
		x: 0,
		y: 0
	}), {
		top: e.top - t.height - n.y,
		right: e.right - t.width + n.x,
		bottom: e.bottom - t.height + n.y,
		left: e.left - t.width - n.x
	};
}
function gc(e) {
	return [
		"top",
		Zo,
		W,
		G
	].some(function(t) {
		return e[t] >= 0;
	});
}
function _c(e) {
	var t = e.state, n = e.name, r = t.rects.reference, i = t.rects.popper, a = t.modifiersData.preventOverflow, o = uc(t, { elementContext: "reference" }), s = uc(t, { altBoundary: !0 }), c = hc(o, r), l = hc(s, i, a), u = gc(c), d = gc(l);
	t.modifiersData[n] = {
		referenceClippingOffsets: c,
		popperEscapeOffsets: l,
		isReferenceHidden: u,
		hasPopperEscaped: d
	}, t.attributes.popper = Object.assign({}, t.attributes.popper, {
		"data-popper-reference-hidden": u,
		"data-popper-escaped": d
	});
}
var vc = {
	name: "hide",
	enabled: !0,
	phase: "main",
	requiresIfExists: ["preventOverflow"],
	fn: _c
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/offset.js
function yc(e, t, n) {
	var r = Y(e), i = ["left", "top"].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, o = a[0], s = a[1];
	return o = o || 0, s = (s || 0) * i, ["left", "right"].indexOf(r) >= 0 ? {
		x: s,
		y: o
	} : {
		x: o,
		y: s
	};
}
function bc(e) {
	var t = e.state, n = e.options, r = e.name, i = n.offset, a = i === void 0 ? [0, 0] : i, o = os.reduce(function(e, n) {
		return e[n] = yc(n, t.rects, a), e;
	}, {}), s = o[t.placement], c = s.x, l = s.y;
	t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[r] = o;
}
var xc = {
	name: "offset",
	enabled: !0,
	phase: "main",
	requires: ["popperOffsets"],
	fn: bc
};
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function Sc(e) {
	var t = e.state, n = e.name;
	t.modifiersData[n] = lc({
		reference: t.rects.reference,
		element: t.rects.popper,
		strategy: "absolute",
		placement: t.placement
	});
}
var Cc = {
	name: "popperOffsets",
	enabled: !0,
	phase: "read",
	fn: Sc,
	data: {}
};
//#endregion
//#region node_modules/@popperjs/core/lib/utils/getAltAxis.js
function wc(e) {
	return e === "x" ? "y" : "x";
}
//#endregion
//#region node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function Tc(e) {
	var t = e.state, n = e.options, r = e.name, i = n.mainAxis, a = i === void 0 || i, o = n.altAxis, s = o !== void 0 && o, c = n.boundary, l = n.rootBoundary, u = n.altBoundary, d = n.padding, f = n.tether, p = f === void 0 || f, m = n.tetherOffset, h = m === void 0 ? 0 : m, g = uc(t, {
		boundary: c,
		rootBoundary: l,
		padding: d,
		altBoundary: u
	}), _ = Y(t.placement), v = Rs(t.placement), y = !v, b = Os(_), x = wc(b), S = t.modifiersData.popperOffsets, C = t.rects.reference, w = t.rects.popper, T = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, E = typeof T == "number" ? {
		mainAxis: T,
		altAxis: T
	} : Object.assign({
		mainAxis: 0,
		altAxis: 0
	}, T), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, O = {
		x: 0,
		y: 0
	};
	if (S) {
		if (a) {
			var k = b === "y" ? "top" : G, A = b === "y" ? W : Zo, j = b === "y" ? "height" : "width", M = S[b], N = M + g[k], ee = M - g[A], P = p ? -w[j] / 2 : 0, te = v === "start" ? C[j] : w[j], F = v === "start" ? -w[j] : -C[j], ne = t.elements.arrow, re = p && ne ? ys(ne) : {
				width: 0,
				height: 0
			}, ie = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : js(), ae = ie[k], oe = ie[A], se = ks(0, C[j], re[j]), ce = y ? C[j] / 2 - P - se - ae - E.mainAxis : te - se - ae - E.mainAxis, le = y ? -C[j] / 2 + P + se + oe + E.mainAxis : F + se + oe + E.mainAxis, ue = t.elements.arrow && Ds(t.elements.arrow), de = ue ? b === "y" ? ue.clientTop || 0 : ue.clientLeft || 0 : 0, fe = D?.[b] ?? 0, pe = M + ce - fe - de, me = M + le - fe, he = ks(p ? ms(N, pe) : N, M, p ? ps(ee, me) : ee);
			S[b] = he, O[b] = he - M;
		}
		if (s) {
			var ge = b === "x" ? "top" : G, _e = b === "x" ? W : Zo, I = S[x], ve = x === "y" ? "height" : "width", ye = I + g[ge], be = I - g[_e], L = ["top", G].indexOf(_) !== -1, xe = D?.[x] ?? 0, Se = L ? ye : I - C[ve] - w[ve] - xe + E.altAxis, Ce = L ? I + C[ve] + w[ve] - xe - E.altAxis : be, we = p && L ? As(Se, I, Ce) : ks(p ? Se : ye, I, p ? Ce : be);
			S[x] = we, O[x] = we - I;
		}
		t.modifiersData[r] = O;
	}
}
var Ec = {
	name: "preventOverflow",
	enabled: !0,
	phase: "main",
	fn: Tc,
	requiresIfExists: ["offset"]
};
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function Dc(e) {
	return {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function Oc(e) {
	return e === q(e) || !J(e) ? Zs(e) : Dc(e);
}
//#endregion
//#region node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function kc(e) {
	var t = e.getBoundingClientRect(), n = hs(t.width) / e.offsetWidth || 1, r = hs(t.height) / e.offsetHeight || 1;
	return n !== 1 || r !== 1;
}
function Ac(e, t, n) {
	n === void 0 && (n = !1);
	var r = J(t), i = J(t) && kc(t), a = Cs(t), o = vs(e, i, n), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = {
		x: 0,
		y: 0
	};
	return (r || !r && !n) && ((K(t) !== "body" || tc(a)) && (s = Oc(t)), J(t) ? (c = vs(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Qs(a))), {
		x: o.left + s.scrollLeft - c.x,
		y: o.top + s.scrollTop - c.y,
		width: o.width,
		height: o.height
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/orderModifiers.js
function jc(e) {
	var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
	e.forEach(function(e) {
		t.set(e.name, e);
	});
	function i(e) {
		n.add(e.name), [].concat(e.requires || [], e.requiresIfExists || []).forEach(function(e) {
			if (!n.has(e)) {
				var r = t.get(e);
				r && i(r);
			}
		}), r.push(e);
	}
	return e.forEach(function(e) {
		n.has(e.name) || i(e);
	}), r;
}
function Mc(e) {
	var t = jc(e);
	return ss.reduce(function(e, n) {
		return e.concat(t.filter(function(e) {
			return e.phase === n;
		}));
	}, []);
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/debounce.js
function Nc(e) {
	var t;
	return function() {
		return t || (t = new Promise(function(n) {
			Promise.resolve().then(function() {
				t = void 0, n(e());
			});
		})), t;
	};
}
//#endregion
//#region node_modules/@popperjs/core/lib/utils/mergeByName.js
function Pc(e) {
	var t = e.reduce(function(e, t) {
		var n = e[t.name];
		return e[t.name] = n ? Object.assign({}, n, t, {
			options: Object.assign({}, n.options, t.options),
			data: Object.assign({}, n.data, t.data)
		}) : t, e;
	}, {});
	return Object.keys(t).map(function(e) {
		return t[e];
	});
}
//#endregion
//#region node_modules/@popperjs/core/lib/createPopper.js
var Fc = {
	placement: "bottom",
	modifiers: [],
	strategy: "absolute"
};
function Ic() {
	return ![...arguments].some(function(e) {
		return !(e && typeof e.getBoundingClientRect == "function");
	});
}
function Lc(e) {
	e === void 0 && (e = {});
	var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, i = t.defaultOptions, a = i === void 0 ? Fc : i;
	return function(e, t, n) {
		n === void 0 && (n = a);
		var i = {
			placement: "bottom",
			orderedModifiers: [],
			options: Object.assign({}, Fc, a),
			modifiersData: {},
			elements: {
				reference: e,
				popper: t
			},
			attributes: {},
			styles: {}
		}, o = [], s = !1, c = {
			state: i,
			setOptions: function(n) {
				var o = typeof n == "function" ? n(i.options) : n;
				u(), i.options = Object.assign({}, a, i.options, o), i.scrollParents = {
					reference: cs(e) ? rc(e) : e.contextElement ? rc(e.contextElement) : [],
					popper: rc(t)
				};
				var s = Mc(Pc([].concat(r, i.options.modifiers)));
				return i.orderedModifiers = s.filter(function(e) {
					return e.enabled;
				}), l(), c.update();
			},
			forceUpdate: function() {
				if (!s) {
					var e = i.elements, t = e.reference, n = e.popper;
					if (Ic(t, n)) {
						i.rects = {
							reference: Ac(t, Ds(n), i.options.strategy === "fixed"),
							popper: ys(n)
						}, i.reset = !1, i.placement = i.options.placement, i.orderedModifiers.forEach(function(e) {
							return i.modifiersData[e.name] = Object.assign({}, e.data);
						});
						for (var r = 0; r < i.orderedModifiers.length; r++) {
							if (i.reset === !0) {
								i.reset = !1, r = -1;
								continue;
							}
							var a = i.orderedModifiers[r], o = a.fn, l = a.options, u = l === void 0 ? {} : l, d = a.name;
							typeof o == "function" && (i = o({
								state: i,
								options: u,
								name: d,
								instance: c
							}) || i);
						}
					}
				}
			},
			update: Nc(function() {
				return new Promise(function(e) {
					c.forceUpdate(), e(i);
				});
			}),
			destroy: function() {
				u(), s = !0;
			}
		};
		if (!Ic(e, t)) return c;
		c.setOptions(n).then(function(e) {
			!s && n.onFirstUpdate && n.onFirstUpdate(e);
		});
		function l() {
			i.orderedModifiers.forEach(function(e) {
				var t = e.name, n = e.options, r = n === void 0 ? {} : n, a = e.effect;
				if (typeof a == "function") {
					var s = a({
						state: i,
						name: t,
						instance: c,
						options: r
					});
					o.push(s || function() {});
				}
			});
		}
		function u() {
			o.forEach(function(e) {
				return e();
			}), o = [];
		}
		return c;
	};
}
var Rc = /*#__PURE__*/ Lc({ defaultModifiers: [
	Ks,
	Cc,
	Us,
	fs,
	xc,
	mc,
	Ec,
	Ls,
	vc
] }), zc = "tippy-box", Bc = "tippy-content", Vc = "tippy-backdrop", Hc = "tippy-arrow", Uc = "tippy-svg-arrow", Wc = {
	passive: !0,
	capture: !0
}, Gc = function() {
	return document.body;
};
function Kc(e, t, n) {
	return Array.isArray(e) ? e[t] ?? (Array.isArray(n) ? n[t] : n) : e;
}
function qc(e, t) {
	var n = {}.toString.call(e);
	return n.indexOf("[object") === 0 && n.indexOf(t + "]") > -1;
}
function Jc(e, t) {
	return typeof e == "function" ? e.apply(void 0, t) : e;
}
function Yc(e, t) {
	if (t === 0) return e;
	var n;
	return function(r) {
		clearTimeout(n), n = setTimeout(function() {
			e(r);
		}, t);
	};
}
function Xc(e) {
	return e.split(/\s+/).filter(Boolean);
}
function Zc(e) {
	return [].concat(e);
}
function Qc(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function $c(e) {
	return e.filter(function(t, n) {
		return e.indexOf(t) === n;
	});
}
function el(e) {
	return e.split("-")[0];
}
function tl(e) {
	return [].slice.call(e);
}
function nl(e) {
	return Object.keys(e).reduce(function(t, n) {
		return e[n] !== void 0 && (t[n] = e[n]), t;
	}, {});
}
function rl() {
	return document.createElement("div");
}
function il(e) {
	return ["Element", "Fragment"].some(function(t) {
		return qc(e, t);
	});
}
function al(e) {
	return qc(e, "NodeList");
}
function ol(e) {
	return qc(e, "MouseEvent");
}
function sl(e) {
	return !!(e && e._tippy && e._tippy.reference === e);
}
function cl(e) {
	return il(e) ? [e] : al(e) ? tl(e) : Array.isArray(e) ? e : tl(document.querySelectorAll(e));
}
function ll(e, t) {
	e.forEach(function(e) {
		e && (e.style.transitionDuration = t + "ms");
	});
}
function ul(e, t) {
	e.forEach(function(e) {
		e && e.setAttribute("data-state", t);
	});
}
function dl(e) {
	var t, n = Zc(e)[0];
	return n != null && (t = n.ownerDocument) != null && t.body ? n.ownerDocument : document;
}
function fl(e, t) {
	var n = t.clientX, r = t.clientY;
	return e.every(function(e) {
		var t = e.popperRect, i = e.popperState, a = e.props.interactiveBorder, o = el(i.placement), s = i.modifiersData.offset;
		if (!s) return !0;
		var c = o === "bottom" ? s.top.y : 0, l = o === "top" ? s.bottom.y : 0, u = o === "right" ? s.left.x : 0, d = o === "left" ? s.right.x : 0, f = t.top - r + c > a, p = r - t.bottom - l > a, m = t.left - n + u > a, h = n - t.right - d > a;
		return f || p || m || h;
	});
}
function pl(e, t, n) {
	var r = t + "EventListener";
	["transitionend", "webkitTransitionEnd"].forEach(function(t) {
		e[r](t, n);
	});
}
function ml(e, t) {
	for (var n = t; n;) {
		if (e.contains(n)) return !0;
		n = n.getRootNode == null ? void 0 : n.getRootNode()?.host;
	}
	return !1;
}
var X = { isTouch: !1 }, hl = 0;
function gl() {
	X.isTouch || (X.isTouch = !0, window.performance && document.addEventListener("mousemove", _l));
}
function _l() {
	var e = performance.now();
	e - hl < 20 && (X.isTouch = !1, document.removeEventListener("mousemove", _l)), hl = e;
}
function vl() {
	var e = document.activeElement;
	if (sl(e)) {
		var t = e._tippy;
		e.blur && !t.state.isVisible && e.blur();
	}
}
function yl() {
	document.addEventListener("touchstart", gl, Wc), window.addEventListener("blur", vl);
}
var bl = typeof window < "u" && typeof document < "u" && !!window.msCrypto, Z = Object.assign({
	appendTo: Gc,
	aria: {
		content: "auto",
		expanded: "auto"
	},
	delay: 0,
	duration: [300, 250],
	getReferenceClientRect: null,
	hideOnClick: !0,
	ignoreAttributes: !1,
	interactive: !1,
	interactiveBorder: 2,
	interactiveDebounce: 0,
	moveTransition: "",
	offset: [0, 10],
	onAfterUpdate: function() {},
	onBeforeUpdate: function() {},
	onCreate: function() {},
	onDestroy: function() {},
	onHidden: function() {},
	onHide: function() {},
	onMount: function() {},
	onShow: function() {},
	onShown: function() {},
	onTrigger: function() {},
	onUntrigger: function() {},
	onClickOutside: function() {},
	placement: "top",
	plugins: [],
	popperOptions: {},
	render: null,
	showOnCreate: !1,
	touch: !0,
	trigger: "mouseenter focus",
	triggerTarget: null
}, {
	animateFill: !1,
	followCursor: !1,
	inlinePositioning: !1,
	sticky: !1
}, {
	allowHTML: !1,
	animation: "fade",
	arrow: !0,
	content: "",
	inertia: !1,
	maxWidth: 350,
	role: "tooltip",
	theme: "",
	zIndex: 9999
}), xl = Object.keys(Z), Sl = function(e) {
	Object.keys(e).forEach(function(t) {
		Z[t] = e[t];
	});
};
function Cl(e) {
	var t = (e.plugins || []).reduce(function(t, n) {
		var r = n.name, i = n.defaultValue;
		return r && (t[r] = e[r] === void 0 ? Z[r] ?? i : e[r]), t;
	}, {});
	return Object.assign({}, e, t);
}
function wl(e, t) {
	return (t ? Object.keys(Cl(Object.assign({}, Z, { plugins: t }))) : xl).reduce(function(t, n) {
		var r = (e.getAttribute("data-tippy-" + n) || "").trim();
		if (!r) return t;
		if (n === "content") t[n] = r;
		else try {
			t[n] = JSON.parse(r);
		} catch {
			t[n] = r;
		}
		return t;
	}, {});
}
function Tl(e, t) {
	var n = Object.assign({}, t, { content: Jc(t.content, [e]) }, t.ignoreAttributes ? {} : wl(e, t.plugins));
	return n.aria = Object.assign({}, Z.aria, n.aria), n.aria = {
		expanded: n.aria.expanded === "auto" ? t.interactive : n.aria.expanded,
		content: n.aria.content === "auto" ? t.interactive ? null : "describedby" : n.aria.content
	}, n;
}
var El = function() {
	return "innerHTML";
};
function Dl(e, t) {
	e[El()] = t;
}
function Ol(e) {
	var t = rl();
	return e === !0 ? t.className = Hc : (t.className = Uc, il(e) ? t.appendChild(e) : Dl(t, e)), t;
}
function kl(e, t) {
	il(t.content) ? (Dl(e, ""), e.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? Dl(e, t.content) : e.textContent = t.content);
}
function Al(e) {
	var t = e.firstElementChild, n = tl(t.children);
	return {
		box: t,
		content: n.find(function(e) {
			return e.classList.contains(Bc);
		}),
		arrow: n.find(function(e) {
			return e.classList.contains(Hc) || e.classList.contains(Uc);
		}),
		backdrop: n.find(function(e) {
			return e.classList.contains(Vc);
		})
	};
}
function jl(e) {
	var t = rl(), n = rl();
	n.className = zc, n.setAttribute("data-state", "hidden"), n.setAttribute("tabindex", "-1");
	var r = rl();
	r.className = Bc, r.setAttribute("data-state", "hidden"), kl(r, e.props), t.appendChild(n), n.appendChild(r), i(e.props, e.props);
	function i(n, r) {
		var i = Al(t), a = i.box, o = i.content, s = i.arrow;
		r.theme ? a.setAttribute("data-theme", r.theme) : a.removeAttribute("data-theme"), typeof r.animation == "string" ? a.setAttribute("data-animation", r.animation) : a.removeAttribute("data-animation"), r.inertia ? a.setAttribute("data-inertia", "") : a.removeAttribute("data-inertia"), a.style.maxWidth = typeof r.maxWidth == "number" ? r.maxWidth + "px" : r.maxWidth, r.role ? a.setAttribute("role", r.role) : a.removeAttribute("role"), (n.content !== r.content || n.allowHTML !== r.allowHTML) && kl(o, e.props), r.arrow ? s ? n.arrow !== r.arrow && (a.removeChild(s), a.appendChild(Ol(r.arrow))) : a.appendChild(Ol(r.arrow)) : s && a.removeChild(s);
	}
	return {
		popper: t,
		onUpdate: i
	};
}
jl.$$tippy = !0;
var Ml = 1, Nl = [], Pl = [];
function Fl(e, t) {
	var n = Tl(e, Object.assign({}, Z, Cl(nl(t)))), r, i, a, o = !1, s = !1, c = !1, l = !1, u, d, f, p = [], m = Yc(pe, n.interactiveDebounce), h, g = Ml++, _ = null, v = $c(n.plugins), y = {
		id: g,
		reference: e,
		popper: rl(),
		popperInstance: _,
		props: n,
		state: {
			isEnabled: !0,
			isVisible: !1,
			isDestroyed: !1,
			isMounted: !1,
			isShown: !1
		},
		plugins: v,
		clearDelayTimeouts: Ce,
		setProps: we,
		setContent: Te,
		show: Ee,
		hide: De,
		hideWithInteractivity: Oe,
		enable: xe,
		disable: Se,
		unmount: ke,
		destroy: Ae
	};
	/* istanbul ignore if */
	if (!n.render) return y;
	var b = n.render(y), x = b.popper, S = b.onUpdate;
	x.setAttribute("data-tippy-root", ""), x.id = "tippy-" + y.id, y.popper = x, e._tippy = y, x._tippy = y;
	var C = v.map(function(e) {
		return e.fn(y);
	}), w = e.hasAttribute("aria-expanded");
	return ue(), P(), M(), N("onCreate", [y]), n.showOnCreate && be(), x.addEventListener("mouseenter", function() {
		y.props.interactive && y.state.isVisible && y.clearDelayTimeouts();
	}), x.addEventListener("mouseleave", function() {
		y.props.interactive && y.props.trigger.indexOf("mouseenter") >= 0 && k().addEventListener("mousemove", m);
	}), y;
	function T() {
		var e = y.props.touch;
		return Array.isArray(e) ? e : [e, 0];
	}
	function E() {
		return T()[0] === "hold";
	}
	function D() {
		var e;
		return !!((e = y.props.render) != null && e.$$tippy);
	}
	function O() {
		return h || e;
	}
	function k() {
		var e = O().parentNode;
		return e ? dl(e) : document;
	}
	function A() {
		return Al(x);
	}
	function j(e) {
		return y.state.isMounted && !y.state.isVisible || X.isTouch || u && u.type === "focus" ? 0 : Kc(y.props.delay, +!e, Z.delay);
	}
	function M(e) {
		e === void 0 && (e = !1), x.style.pointerEvents = y.props.interactive && !e ? "" : "none", x.style.zIndex = "" + y.props.zIndex;
	}
	function N(e, t, n) {
		if (n === void 0 && (n = !0), C.forEach(function(n) {
			n[e] && n[e].apply(n, t);
		}), n) {
			var r;
			(r = y.props)[e].apply(r, t);
		}
	}
	function ee() {
		var t = y.props.aria;
		if (t.content) {
			var n = "aria-" + t.content, r = x.id;
			Zc(y.props.triggerTarget || e).forEach(function(e) {
				var t = e.getAttribute(n);
				if (y.state.isVisible) e.setAttribute(n, t ? t + " " + r : r);
				else {
					var i = t && t.replace(r, "").trim();
					i ? e.setAttribute(n, i) : e.removeAttribute(n);
				}
			});
		}
	}
	function P() {
		!w && y.props.aria.expanded && Zc(y.props.triggerTarget || e).forEach(function(e) {
			y.props.interactive ? e.setAttribute("aria-expanded", y.state.isVisible && e === O() ? "true" : "false") : e.removeAttribute("aria-expanded");
		});
	}
	function te() {
		k().removeEventListener("mousemove", m), Nl = Nl.filter(function(e) {
			return e !== m;
		});
	}
	function F(t) {
		if (!X.isTouch || !c && t.type !== "mousedown") {
			var n = t.composedPath && t.composedPath()[0] || t.target;
			if (!(y.props.interactive && ml(x, n))) {
				if (Zc(y.props.triggerTarget || e).some(function(e) {
					return ml(e, n);
				})) {
					if (X.isTouch || y.state.isVisible && y.props.trigger.indexOf("click") >= 0) return;
				} else N("onClickOutside", [y, t]);
				y.props.hideOnClick === !0 && (y.clearDelayTimeouts(), y.hide(), s = !0, setTimeout(function() {
					s = !1;
				}), y.state.isMounted || ae());
			}
		}
	}
	function ne() {
		c = !0;
	}
	function re() {
		c = !1;
	}
	function ie() {
		var e = k();
		e.addEventListener("mousedown", F, !0), e.addEventListener("touchend", F, Wc), e.addEventListener("touchstart", re, Wc), e.addEventListener("touchmove", ne, Wc);
	}
	function ae() {
		var e = k();
		e.removeEventListener("mousedown", F, !0), e.removeEventListener("touchend", F, Wc), e.removeEventListener("touchstart", re, Wc), e.removeEventListener("touchmove", ne, Wc);
	}
	function oe(e, t) {
		ce(e, function() {
			!y.state.isVisible && x.parentNode && x.parentNode.contains(x) && t();
		});
	}
	function se(e, t) {
		ce(e, t);
	}
	function ce(e, t) {
		var n = A().box;
		function r(e) {
			e.target === n && (pl(n, "remove", r), t());
		}
		if (e === 0) return t();
		pl(n, "remove", d), pl(n, "add", r), d = r;
	}
	function le(t, n, r) {
		r === void 0 && (r = !1), Zc(y.props.triggerTarget || e).forEach(function(e) {
			e.addEventListener(t, n, r), p.push({
				node: e,
				eventType: t,
				handler: n,
				options: r
			});
		});
	}
	function ue() {
		E() && (le("touchstart", fe, { passive: !0 }), le("touchend", me, { passive: !0 })), Xc(y.props.trigger).forEach(function(e) {
			if (e !== "manual") switch (le(e, fe), e) {
				case "mouseenter":
					le("mouseleave", me);
					break;
				case "focus":
					le(bl ? "focusout" : "blur", he);
					break;
				case "focusin": le("focusout", he);
			}
		});
	}
	function de() {
		p.forEach(function(e) {
			var t = e.node, n = e.eventType, r = e.handler, i = e.options;
			t.removeEventListener(n, r, i);
		}), p = [];
	}
	function fe(e) {
		var t = !1;
		if (!(!y.state.isEnabled || ge(e) || s)) {
			var n = u?.type === "focus";
			u = e, h = e.currentTarget, P(), !y.state.isVisible && ol(e) && Nl.forEach(function(t) {
				return t(e);
			}), e.type === "click" && (y.props.trigger.indexOf("mouseenter") < 0 || o) && y.props.hideOnClick !== !1 && y.state.isVisible ? t = !0 : be(e), e.type === "click" && (o = !t), t && !n && L(e);
		}
	}
	function pe(e) {
		var t = e.target, r = O().contains(t) || x.contains(t);
		e.type === "mousemove" && r || fl(ye().concat(x).map(function(e) {
			var t = e._tippy.popperInstance?.state;
			return t ? {
				popperRect: e.getBoundingClientRect(),
				popperState: t,
				props: n
			} : null;
		}).filter(Boolean), e) && (te(), L(e));
	}
	function me(e) {
		if (!(ge(e) || y.props.trigger.indexOf("click") >= 0 && o)) {
			if (y.props.interactive) {
				y.hideWithInteractivity(e);
				return;
			}
			L(e);
		}
	}
	function he(e) {
		y.props.trigger.indexOf("focusin") < 0 && e.target !== O() || y.props.interactive && e.relatedTarget && x.contains(e.relatedTarget) || L(e);
	}
	function ge(e) {
		return X.isTouch ? E() !== e.type.indexOf("touch") >= 0 : !1;
	}
	function _e() {
		I();
		var t = y.props, n = t.popperOptions, r = t.placement, i = t.offset, a = t.getReferenceClientRect, o = t.moveTransition, s = D() ? Al(x).arrow : null, c = a ? {
			getBoundingClientRect: a,
			contextElement: a.contextElement || O()
		} : e, l = [
			{
				name: "offset",
				options: { offset: i }
			},
			{
				name: "preventOverflow",
				options: { padding: {
					top: 2,
					bottom: 2,
					left: 5,
					right: 5
				} }
			},
			{
				name: "flip",
				options: { padding: 5 }
			},
			{
				name: "computeStyles",
				options: { adaptive: !o }
			},
			{
				name: "$$tippy",
				enabled: !0,
				phase: "beforeWrite",
				requires: ["computeStyles"],
				fn: function(e) {
					var t = e.state;
					if (D()) {
						var n = A().box;
						[
							"placement",
							"reference-hidden",
							"escaped"
						].forEach(function(e) {
							e === "placement" ? n.setAttribute("data-placement", t.placement) : t.attributes.popper["data-popper-" + e] ? n.setAttribute("data-" + e, "") : n.removeAttribute("data-" + e);
						}), t.attributes.popper = {};
					}
				}
			}
		];
		D() && s && l.push({
			name: "arrow",
			options: {
				element: s,
				padding: 3
			}
		}), l.push.apply(l, n?.modifiers || []), y.popperInstance = Rc(c, x, Object.assign({}, n, {
			placement: r,
			onFirstUpdate: f,
			modifiers: l
		}));
	}
	function I() {
		y.popperInstance && (y.popperInstance.destroy(), y.popperInstance = null);
	}
	function ve() {
		var e = y.props.appendTo, t, n = O();
		t = y.props.interactive && e === Gc || e === "parent" ? n.parentNode : Jc(e, [n]), t.contains(x) || t.appendChild(x), y.state.isMounted = !0, _e();
	}
	function ye() {
		return tl(x.querySelectorAll("[data-tippy-root]"));
	}
	function be(e) {
		y.clearDelayTimeouts(), e && N("onTrigger", [y, e]), ie();
		var t = j(!0), n = T(), i = n[0], a = n[1];
		X.isTouch && i === "hold" && a && (t = a), t ? r = setTimeout(function() {
			y.show();
		}, t) : y.show();
	}
	function L(e) {
		if (y.clearDelayTimeouts(), N("onUntrigger", [y, e]), !y.state.isVisible) {
			ae();
			return;
		}
		if (!(y.props.trigger.indexOf("mouseenter") >= 0 && y.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(e.type) >= 0 && o)) {
			var t = j(!1);
			t ? i = setTimeout(function() {
				y.state.isVisible && y.hide();
			}, t) : a = requestAnimationFrame(function() {
				y.hide();
			});
		}
	}
	function xe() {
		y.state.isEnabled = !0;
	}
	function Se() {
		y.hide(), y.state.isEnabled = !1;
	}
	function Ce() {
		clearTimeout(r), clearTimeout(i), cancelAnimationFrame(a);
	}
	function we(t) {
		if (!y.state.isDestroyed) {
			N("onBeforeUpdate", [y, t]), de();
			var n = y.props, r = Tl(e, Object.assign({}, n, nl(t), { ignoreAttributes: !0 }));
			y.props = r, ue(), n.interactiveDebounce !== r.interactiveDebounce && (te(), m = Yc(pe, r.interactiveDebounce)), n.triggerTarget && !r.triggerTarget ? Zc(n.triggerTarget).forEach(function(e) {
				e.removeAttribute("aria-expanded");
			}) : r.triggerTarget && e.removeAttribute("aria-expanded"), P(), M(), S && S(n, r), y.popperInstance && (_e(), ye().forEach(function(e) {
				requestAnimationFrame(e._tippy.popperInstance.forceUpdate);
			})), N("onAfterUpdate", [y, t]);
		}
	}
	function Te(e) {
		y.setProps({ content: e });
	}
	function Ee() {
		var e = y.state.isVisible, t = y.state.isDestroyed, n = !y.state.isEnabled, r = X.isTouch && !y.props.touch, i = Kc(y.props.duration, 0, Z.duration);
		if (!(e || t || n || r) && !O().hasAttribute("disabled") && (N("onShow", [y], !1), y.props.onShow(y) !== !1)) {
			if (y.state.isVisible = !0, D() && (x.style.visibility = "visible"), M(), ie(), y.state.isMounted || (x.style.transition = "none"), D()) {
				var a = A(), o = a.box, s = a.content;
				ll([o, s], 0);
			}
			f = function() {
				var e;
				if (y.state.isVisible && !l) {
					if (l = !0, x.offsetHeight, x.style.transition = y.props.moveTransition, D() && y.props.animation) {
						var t = A(), n = t.box, r = t.content;
						ll([n, r], i), ul([n, r], "visible");
					}
					ee(), P(), Qc(Pl, y), (e = y.popperInstance) == null || e.forceUpdate(), N("onMount", [y]), y.props.animation && D() && se(i, function() {
						y.state.isShown = !0, N("onShown", [y]);
					});
				}
			}, ve();
		}
	}
	function De() {
		var e = !y.state.isVisible, t = y.state.isDestroyed, n = !y.state.isEnabled, r = Kc(y.props.duration, 1, Z.duration);
		if (!(e || t || n) && (N("onHide", [y], !1), y.props.onHide(y) !== !1)) {
			if (y.state.isVisible = !1, y.state.isShown = !1, l = !1, o = !1, D() && (x.style.visibility = "hidden"), te(), ae(), M(!0), D()) {
				var i = A(), a = i.box, s = i.content;
				y.props.animation && (ll([a, s], r), ul([a, s], "hidden"));
			}
			ee(), P(), y.props.animation ? D() && oe(r, y.unmount) : y.unmount();
		}
	}
	function Oe(e) {
		k().addEventListener("mousemove", m), Qc(Nl, m), m(e);
	}
	function ke() {
		y.state.isVisible && y.hide(), y.state.isMounted && (I(), ye().forEach(function(e) {
			e._tippy.unmount();
		}), x.parentNode && x.parentNode.removeChild(x), Pl = Pl.filter(function(e) {
			return e !== y;
		}), y.state.isMounted = !1, N("onHidden", [y]));
	}
	function Ae() {
		y.state.isDestroyed || (y.clearDelayTimeouts(), y.unmount(), de(), delete e._tippy, y.state.isDestroyed = !0, N("onDestroy", [y]));
	}
}
function Il(e, t) {
	t === void 0 && (t = {});
	var n = Z.plugins.concat(t.plugins || []);
	yl();
	var r = Object.assign({}, t, { plugins: n }), i = cl(e).reduce(function(e, t) {
		var n = t && Fl(t, r);
		return n && e.push(n), e;
	}, []);
	return il(e) ? i[0] : i;
}
//#endregion
//#region src/lib/svg-wind-barbs/index.ts
Il.defaultProps = Z, Il.setDefaultProps = Sl, Il.currentInput = X, Object.assign({}, fs, { effect: function(e) {
	var t = e.state, n = {
		popper: {
			position: t.options.strategy,
			left: "0",
			top: "0",
			margin: "0"
		},
		arrow: { position: "absolute" },
		reference: {}
	};
	Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow);
} }), Il.setDefaultProps({ render: jl }), sn();
var Ll = B`<path class="svg-wb-fill" d="M125,120c2.762,0,5,2.239,5,5c0,2.762-2.238,5-5,5c-2.761,0-5-2.238-5-5C120,122.239,122.239,120,125,120z"/><path fill="none" class="svg-wb-stroke" stroke-width="2" d="M125,115c5.523,0,10,4.477,10,10c0,5.523-4.477,10-10,10 c-5.523,0-10-4.477-10-10C115,119.477,119.477,115,125,115z "/>`, Rl = B`<path class="svg-wb" d="M125,112V76 M125,125l7-12.1h-14L125,125z"/>`, zl = B`<path class="svg-wb" d="M125,112V76 M125,89l7-7 M125,125l7-12.1h-14L125,125z"/>`, Bl = B`<path class="svg-wb" d="M125,112V89 M125,89l14-14 M125,125l7-12.1h-14L125,125z"/>`, Vl = B`<path class="svg-wb" d="M125,112V89 M125,89l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, Hl = B`<path class="svg-wb" d="M125,112V89 M125,89l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, Ul = B`<path class="svg-wb" d="M125,112V79 M125,79l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, Wl = B`<path class="svg-wb" d="M125,112V79 M125,79l14-14 M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, Gl = B`<path class="svg-wb" d="M125,112V69 M125,69l14-14 M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, Kl = B`<path class="svg-wb" d="M125,112V69 M125,69l14-14 M125,80l14-14 M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, ql = B`<path class="svg-wb" d="M125,112V59 M125,59l14-14 M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14 L125,125z"/>`, Jl = B`<path class="svg-wb" d="M125,112V76 M125,76h14l-14,14V76z M125,125l7-12.1h-14L125,125z"/>`, Yl = B`<path class="svg-wb" d="M125,112V76 M125,76h14l-14,14V76z M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, Xl = B`<path class="svg-wb" d="M125,112V76 M125,76h14l-14,14V76z M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, Zl = B`<path class="svg-wb" d="M125,112V66 M125,66h14l-14,14V66z M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, Ql = B`<path class="svg-wb" d="M125,112V66 M125,66h14l-14,14V66z M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, $l = B`<path class="svg-wb" d="M125,112V56 M125,56h14l-14,14V56z M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, eu = B`<path class="svg-wb" d="M125,112V56 M125,56h14l-14,14V56z M125,80l14-14 M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, tu = B`<path class="svg-wb" d="M125,112V46 M125,46h14l-14,14V46z M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1 h-14L125,125z"/>`, nu = B`<path class="svg-wb" d="M125,112V46 M125,46h14l-14,14V46z M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100l14-14 M125,125l7-12.1 h-14L125,125z"/>`, ru = B`<path class="svg-wb" d="M125,112V36 M125,36h14l-14,14V36z M125,60l14-14 M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, iu = B`<path class="svg-wb" d="M125,112V62 M125,62h14l-14,14V62z M125,76h14l-14,14V76z M125,125l7-12.1h-14L125,125z"/>`, au = B`<path class="svg-wb" d="M125,112V62 M125,62h14l-14,14V62z M125,76h14l-14,14V76z M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, ou = B`<path class="svg-wb" d="M125,112V62 M125,62h14l-14,14V62z M125,76h14l-14,14V76z M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, su = B`<path class="svg-wb" d="M125,112V52 M125,52h14l-14,14V52z M125,66h14l-14,14V66z M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14 L125,125z"/>`, cu = B`<path class="svg-wb" d="M125,112V52 M125,52h14l-14,14V52z M125,66h14l-14,14V66z M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14 L125,125z"/>`, lu = B`<path class="svg-wb" d="M125,112V42 M125,42h14l-14,14V42z M125,56h14l-14,14V56z M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125 l7-12.1h-14L125,125z"/>`, uu = B`<path class="svg-wb" d="M125,112V42 M125,42h14l-14,14V42z M125,56h14l-14,14V56z M125,80l14-14 M125,90l14-14 M125,100l14-14 M125,125 l7-12.1h-14L125,125z"/>`, du = B`<path class="svg-wb" d="M125,112V32 M125,32h14l-14,14V32z M125,46h14l-14,14V46z M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100 l7-7 M125,125l7-12.1h-14L125,125z"/>`, fu = B`<path class="svg-wb" d="M125,112V32 M125,32h14l-14,14V32z M125,46h14l-14,14V46z M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100 l14-14 M125,125l7-12.1h-14L125,125z"/>`, pu = B`<path class="svg-wb" d="M125,112V22 M125,22h14l-14,14V22z M125,36h14l-14,14V36z M125,60l14-14 M125,70l14-14 M125,80l14-14 M125,90 l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, mu = B`<path class="svg-wb" d="M125,112V48 M125,48h14l-14,14V48z M125,62h14l-14,14V62z M125,76h14l-14,14V76z M125,125l7-12.1h-14L125,125z"/>`, hu = B`<path class="svg-wb" d="M125,112V48 M125,48h14l-14,14V48z M125,62h14l-14,14V62z M125,76h14l-14,14V76z M125,100l7-7 M125,125l7-12.1 h-14L125,125z"/>`, gu = B`<path class="svg-wb" d="M125,112V48 M125,48h14l-14,14V48z M125,62h14l-14,14V62z M125,76h14l-14,14V76z M125,100l14-14 M125,125 l7-12.1h-14L125,125z"/>`, _u = B`<path class="svg-wb" d="M125,112V38 M125,38h14l-14,14V38z M125,52h14l-14,14V52z M125,66h14l-14,14V66z M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, vu = B`<path class="svg-wb" d="M125,112V38 M125,38h14l-14,14V38z M125,52h14l-14,14V52z M125,66h14l-14,14V66z M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, yu = B`<path class="svg-wb" d="M125,112V28 M125,28h14l-14,14V28z M125,42h14l-14,14V42z M125,56h14l-14,14V56z M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, bu = B`<path class="svg-wb" d="M125,112V28 M125,28h14l-14,14V28z M125,42h14l-14,14V42z M125,56h14l-14,14V56z M125,80l14-14 M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`, xu = B`<path class="svg-wb" d="M125,112V18 M125,18h14l-14,14V18z M125,32h14l-14,14V32z M125,46h14l-14,14V46z M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100l7-7 M125,125l7-12.1h-14L125,125z"/>`, Su = B`<path class="svg-wb" d="M125,112V18 M125,18h14l-14,14V18z M125,32h14l-14,14V32z M125,46h14l-14,14V46z M125,70l14-14 M125,80l14-14 M125,90l14-14 M125,100l14-14 M125,125l7-12.1h-14L125,125z"/>`;
function Cu(e) {
	return e <= 0 || e < 1 ? Ll : e < 2.5 ? Rl : e < 5 ? zl : e < 7.5 ? Bl : e < 10 ? Vl : e < 12.5 ? Hl : e < 15 ? Ul : e < 17.5 ? Wl : e < 20 ? Gl : e < 22.5 ? Kl : e < 25 ? ql : e < 27.5 ? Jl : e < 30 ? Yl : e < 32.5 ? Xl : e < 35 ? Zl : e < 37.5 ? Ql : e < 40 ? $l : e < 42.5 ? eu : e < 45 ? tu : e < 47.5 ? nu : e < 50 ? ru : e < 52.5 ? iu : e < 55 ? au : e < 57.5 ? ou : e < 60 ? su : e < 62.5 ? cu : e < 65 ? lu : e < 67.5 ? uu : e < 70 ? du : e < 72.5 ? fu : e < 75 ? pu : e < 77.5 ? mu : e < 80 ? hu : e < 82.5 ? gu : e < 85 ? _u : e < 87.5 ? vu : e < 90 ? yu : e < 92.5 ? bu : e < 95 ? xu : e < 97.5 ? Su : Ll;
}
//#endregion
//#region \0@oxc-project+runtime@0.151.0/helpers/esm/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var wu = t((() => {}));
sn(), wu();
var Tu, Eu = ".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}", $ = class extends nn {
	constructor(...e) {
		super(...e), this.conditions = [], this.temperatures = [], this.wind = [], this.precipitation = [], this.icons = !1, this.icon_map = void 0, this.colors = void 0, this.hide_hours = !1, this.hide_temperatures = !1, this.hide_bar = !1, this.icon_fill = "single", this.show_wind = "false", this.show_precipitation_amounts = !1, this.show_precipitation_probability = !1, this.has_current_segment = !1, this.current_label = "Now", this.current_time = "", this.show_date = "false", this.label_spacing = 2, this.labels = Kn, this.tips = [];
	}
	render() {
		let e = [], t = 1;
		if (!this.hide_bar) for (let n of this.conditions) {
			let r = this.labels[n[0]], i = this.icon_map?.[n[0]];
			i || (i = qn[n[0]], i = i === n[0] ? "mdi:weather-" + i : "mdi:" + i);
			let a = [];
			if (!this.icons) a.push(z`<span class="condition-label">${r}</span>`);
			else {
				let e;
				e = !this.icon_fill || this.icon_fill === "single" ? n[1] : this.icon_fill === "full" ? 1 : Math.max(Number(this.icon_fill) || 0, 1);
				let t = 1;
				for (let r = 0; r < n[1]; r += e) {
					let n = {
						gridColumnStart: String(t),
						gridColumnEnd: String(t += e * 2)
					};
					a.push(z`<span class="condition-icon" style=${Xo(n)}><ha-icon icon=${i}></ha-icon></span>`);
				}
			}
			let o = {
				gridColumnStart: String(t),
				gridColumnEnd: String(t += n[1] * 2)
			};
			e.push(z`
          <div class=${n[0]} style=${Xo(o)} data-tippy-content=${r}>
            ${a}
          </div>
        `);
		}
		let n = this.show_wind ?? "", r = [], i = null;
		for (let e = 0; e < this.temperatures.length; e += 1) {
			let t = this.shouldSkipLabel(e), a = this.hide_hours || t, o = this.hide_temperatures || t, s = (n === "true" || n.includes("speed")) && !t, c = (n === "true" || n.includes("direction")) && !t, l = n.includes("barb") && !t, u = this.show_precipitation_amounts && !t, d = this.show_precipitation_probability && !t, { hour: f, date: p, temperature: m } = this.temperatures[e], h = null;
			!t && this.show_date && this.show_date !== "false" && (this.show_date === "all" ? h = p : this.show_date === "boundary" && (i === p ? h = z`&nbsp;` : (h = p, i = p)));
			let { windSpeed: g, windSpeedRawMS: _, windDirection: v, windDirectionRaw: y } = this.wind[e], b = [], x = typeof y == "number" ? y : Xn[y?.toLowerCase()];
			l && x !== void 0 && (b.push(z`<span title=${`${g} ${v}`}>
          ${this.getWindBarb(_, x)}
        </span>`), (s || c) && b.push(z`<br>`)), s && b.push(z`${g}`), s && c && b.push(z`<br>`), c && b.push(z`${v}`);
			let { precipitationAmount: S, precipitationProbability: C, precipitationProbabilityText: w } = this.precipitation[e], T = [];
			u && T.push(z`${S}`), u && d && T.push(z`<br>`), d && T.push(z`<span title=${w}>${C}</span>`), r.push(z`
        <div class="bar-block">
          <div class="bar-block-left"></div>
          <div class="bar-block-right"></div>
          <div class="bar-block-bottom">
            <div class="date">${h}</div>
            <div class="hour">${a ? null : this.has_current_segment && e === 0 ? z`<span class="current-time" title=${this.current_time}>${this.current_label}</span>` : f}</div>
            <div class="temperature">${o ? null : z`${m}&deg;`}</div>
            <div class="wind">${b}</div>
            <div class="precipitation">${T}</div>
          </div>
        </div>
      `);
		}
		let a = null;
		return this.colors && (a = this.getColorStyles(this.colors)), z`
      <div class="main">
        ${a ?? null}
        ${this.hide_bar ? null : z`<div class="bar">${e}</div>`}
        <div class="axes">${r}</div>
      </div>
    `;
	}
	shouldSkipLabel(e) {
		return this.has_current_segment ? e !== 0 && (e - 1) % this.label_spacing != 0 : e % this.label_spacing !== 0;
	}
	update(e) {
		super.update(e), this.tips.forEach((e) => e.destroy()), this.tips = Il(this.renderRoot.querySelectorAll(".bar > div"), {
			appendTo: this.renderRoot.firstElementChild || void 0,
			touch: "hold"
		});
	}
	getColorStyles(e) {
		if (!e || e.size === 0) return null;
		let t = [];
		for (let [n, r] of e.entries()) r.background && t.push(`--color-${n}: ${r.background};`), r.foreground && t.push(`--color-${n}-foreground: ${r.foreground};`);
		return z`<style>
      .main > .bar {
        ${Nt(t.join(" "))}
      }
    </style>`;
	}
	getWindBarb(e, t) {
		let n = e < 1, r = { transform: `rotate(${t}deg)` };
		return z`<svg xmlns="http://www.w3.org/2000/svg" viewBox="70 40 120 120" class="barb" style=${Xo(n ? { marginTop: "-10px" } : r)}>
      ${Cu(e)}
    </svg>`;
	}
};
Tu = $, Tu.styles = [Nt(Eu), Pt`
    .main {
      --color-clear-night: #111;
      --color-cloudy: #777777;
      --color-fog: var(--color-cloudy);
      --color-hail: #2b5174;
      --color-lightning: var(--color-rainy);
      --color-lightning-rainy: var(--color-rainy);
      --color-partlycloudy: #b3dbff;
      --color-night-partly-cloudy: #333;
      --color-pouring: var(--color-rainy);
      --color-rainy: #44739d;
      --color-snowy: white;
      --color-snowy-rainy: var(--color-partlycloudy);
      --color-sunny: #90cbff;
      --color-windy: var(--color-sunny);
      --color-windy-variant: var(--color-sunny);
      --color-exceptional: #ff9d00;
    }
    .bar {
      height: 30px;
      width: 100%;
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
    }
    .bar > div {
      height: 30px;
      text-align: center;
      align-items: center;
      display: grid;
    }
    .condition-label {
      display: inline-block;
      text-shadow: 1px 1px 2px var(--primary-background-color);
      max-width: max(0px, calc((100% - 120px) * 999));
      overflow: hidden;
    }
    .condition-icon {
      display: inline-block;
      max-width: max(0px, calc((100% - 40px) * 999));
      overflow: hidden;
    }
    .condition-icon > ha-icon {
      filter: drop-shadow(1px 1px 3px var(--primary-background-color));
    }
    .bar > div:first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    .bar > div:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .clear-night {
      background-color: var(--color-clear-night);
      color: var(--color-clear-night-foreground, var(--primary-text-color));
    }
    .cloudy {
      background-color: var(--color-cloudy);
      color: var(--color-cloudy-foreground, var(--primary-text-color));
    }
    .fog {
      background-color: var(--color-fog);
      color: var(--color-fog-foreground, var(--primary-text-color));
    }
    .hail {
      background-color: var(--color-hail);
      color: var(--color-hail-foreground, var(--primary-text-color));
    }
    .lightning {
      background-color: var(--color-lightning);
      color: var(--color-lightning-foreground, var(--primary-text-color));
    }
    .lightning-rainy {
      background-color: var(--color-lightning-rainy);
      color: var(--color-lightning-rainy-foreground, var(--primary-text-color));
    }
    .partlycloudy {
      background-color: var(--color-partlycloudy);
      color: var(--color-partlycloudy-foreground, var(--primary-text-color));
    }
    .night-partly-cloudy {
      background-color: var(--color-night-partly-cloudy);
      color: var(--color-night-partly-cloudy-foreground, var(--primary-text-color));
    }
    .pouring {
      background-color: var(--color-pouring);
      color: var(--color-pouring-foreground, var(--primary-text-color));
    }
    .rainy {
      background-color: var(--color-rainy);
      color: var(--color-rainy-foreground, var(--primary-text-color));
    }
    .snowy {
      background-color: var(--color-snowy);
      color: var(--color-snowy-foreground, var(--primary-text-color));
    }
    .snowy-rainy {
      background-color: var(--color-snowy-rainy);
      color: var(--color-snowy-rainy-foreground, var(--primary-text-color));
    }
    .sunny {
      background-color: var(--color-sunny);
      color: var(--color-sunny-foreground, var(--primary-text-color));
    }
    .windy {
      background-color: var(--color-windy);
      color: var(--color-windy-foreground, var(--primary-text-color));
    }
    .windy-variant {
      background-color: var(--color-windy-variant);
      color: var(--color-windy-variant-foreground, var(--primary-text-color));
    }
    .exceptional {
      background-color: var(--color-exceptional);
      color: var(--color-exceptional-foreground, var(--primary-text-color));
    }
    .axes {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      margin-top: 5px;
    }
    .bar-block {
      display: inline-grid;
      grid-template-areas:
        'left right'
        'bottom bottom';
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 5px auto;
    }
    .bar-block-left {
      grid-area: left;
      border: 1px solid var(--divider-color, lightgray);
      border-width: 0 1px 0 0;
    }
    .bar-block-right {
      grid-area: right;
      border: 1px solid var(--divider-color, lightgray);
      border-width: 0 0 0 1px;
    }
    .bar-block-bottom {
      text-align: center;
      grid-area: bottom;
      padding-top: 5px;
    }
    .date, .hour {
      color: var(--secondary-text-color, gray);
      font-size: 0.9rem;
      white-space: nowrap;
    }
    .temperature {
      font-size: 1.1rem;
    }
    .wind,
    .precipitation {
      font-size: 0.9rem;
      line-height: 1.1rem;
      padding-top: 0.1rem;
    }
    .barb {
      transform-box: fill-box;
      transform-origin: center;
      height: 3rem;
    }
    .svg-wb, .svg-wb-fill {
      fill: var(--primary-text-color, black);
    }
    .svg-wb, .svg-wb-stroke {
      stroke: var(--primary-text-color, black);
    }
    .svg-wb {
      stroke-width: 3;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }
  `], Q([U({ type: Array })], $.prototype, "conditions", void 0), Q([U({ type: Array })], $.prototype, "temperatures", void 0), Q([U({ type: Array })], $.prototype, "wind", void 0), Q([U({ type: Array })], $.prototype, "precipitation", void 0), Q([U({ type: Boolean })], $.prototype, "icons", void 0), Q([U({ type: Object })], $.prototype, "icon_map", void 0), Q([U({ attribute: !1 })], $.prototype, "colors", void 0), Q([U({ type: Boolean })], $.prototype, "hide_hours", void 0), Q([U({ type: Boolean })], $.prototype, "hide_temperatures", void 0), Q([U({ type: Boolean })], $.prototype, "hide_bar", void 0), Q([U({ type: String })], $.prototype, "icon_fill", void 0), Q([U({ type: String })], $.prototype, "show_wind", void 0), Q([U({ type: Boolean })], $.prototype, "show_precipitation_amounts", void 0), Q([U({ type: Boolean })], $.prototype, "show_precipitation_probability", void 0), Q([U({ type: Boolean })], $.prototype, "has_current_segment", void 0), Q([U({ type: String })], $.prototype, "current_label", void 0), Q([U({ type: String })], $.prototype, "current_time", void 0), Q([U({ type: String })], $.prototype, "show_date", void 0), Q([U({ type: Number })], $.prototype, "label_spacing", void 0), Q([U({ type: Object })], $.prototype, "labels", void 0);
//#endregion
//#region node_modules/@lit/reactive-element/css-tag.js
var Du, Ou, ku, Au = t((() => {
	Du = window, Ou = Du.ShadowRoot && (Du.ShadyCSS === void 0 || Du.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ku = (e, t) => {
		Ou ? e.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet)) : t.forEach(((t) => {
			let n = document.createElement("style"), r = Du.litNonce;
			r !== void 0 && n.setAttribute("nonce", r), n.textContent = t.cssText, e.appendChild(n);
		}));
	};
}));
//#endregion
//#region node_modules/@lit-labs/scoped-registry-mixin/scoped-registry-mixin.js
function ju(e) {
	return class extends e {
		createRenderRoot() {
			let e = this.constructor, { registry: t, elementDefinitions: n, shadowRootOptions: r } = e;
			n && !t && (e.registry = new CustomElementRegistry(), Object.entries(n).forEach((([t, n]) => e.registry.define(t, n))));
			let i = this.renderOptions.creationScope = this.attachShadow({
				...r,
				customElements: e.registry
			});
			return ku(i, this.constructor.elementStyles), i;
		}
	};
}
var Mu = t((() => {
	Au();
})), Nu = /* @__PURE__ */ n({ HourlyWeatherCardEditor: () => Fu }), Pu, Fu, Iu = t((() => {
	sn(), x(), Mu(), xn(), wu(), Pu = class extends ju(nn) {
		constructor(...e) {
			super(...e), this._initialized = !1;
		}
		async setConfig(e) {
			this._config = e, await this.loadCardHelpers(), this.requestUpdate();
		}
		shouldUpdate() {
			return this._initialized || this._initialize(), !0;
		}
		get _name() {
			return this._config?.name || "";
		}
		get _entity() {
			return this._config?.entity || "";
		}
		get _numSegments() {
			return this._config?.num_segments ?? this._config?.num_hours ?? "12";
		}
		get _icons() {
			return this._config?.icons ?? !1;
		}
		get _show_wind() {
			let e = this._config?.show_wind;
			return typeof e == "boolean" ? e ? "true" : "false" : e ?? "false";
		}
		get _show_precipitation_amounts() {
			return this._config?.show_precipitation_amounts ?? !1;
		}
		get _show_precipitation_probability() {
			return this._config?.show_precipitation_probability ?? !1;
		}
		get _offset() {
			return this._config?.offset ?? "0";
		}
		get _labelSpacing() {
			return this._config?.label_spacing ?? "2";
		}
		get _show_date() {
			return this._config?.show_date ?? "false";
		}
		getSchema(e) {
			return [
				{
					name: "entity",
					selector: { entity: { domain: "weather" } }
				},
				{
					name: "name",
					selector: { text: {} }
				},
				{
					name: "num_segments",
					selector: { number: {
						min: 1,
						step: 1,
						mode: "box"
					} }
				},
				{
					name: "offset",
					selector: { number: {
						min: 0,
						step: 1,
						mode: "box"
					} }
				},
				{
					name: "label_spacing",
					selector: { number: {
						min: 1,
						step: 1,
						mode: "box"
					} }
				},
				{
					name: "icons",
					selector: { boolean: {} }
				},
				{
					name: "show_current",
					selector: { boolean: {} }
				},
				{
					name: "auto_label_spacing",
					selector: { boolean: {} }
				},
				{
					name: "show_wind",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								value: "false",
								label: e("editor.none")
							},
							{
								value: "true",
								label: e("editor.speed_and_direction")
							},
							{
								value: "speed",
								label: e("editor.speed_only")
							},
							{
								value: "direction",
								label: e("editor.direction_only")
							},
							{
								value: "barb",
								label: e("editor.barb")
							},
							{
								value: "barb-and-speed",
								label: e("editor.barb_and_speed")
							},
							{
								value: "barb-and-direction",
								label: e("editor.barb_and_direction")
							},
							{
								value: "barb-speed-and-direction",
								label: e("editor.barb_speed_and_direction")
							}
						]
					} }
				},
				{
					name: "show_date",
					selector: { select: {
						mode: "dropdown",
						options: [
							{
								value: "false",
								label: e("editor.none")
							},
							{
								value: "all",
								label: e("editor.all")
							},
							{
								value: "boundary",
								label: e("editor.on_day_boundaries")
							}
						]
					} }
				},
				{
					name: "show_precipitation_amounts",
					selector: { boolean: {} }
				},
				{
					name: "show_precipitation_probability",
					selector: { boolean: {} }
				}
			];
		}
		render() {
			if (!this.hass || !this._helpers) return z``;
			let e = To(this._config?.language, this.hass?.locale?.language), t = this.getSchema(e);
			return z`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${t}
        .computeLabel=${(t) => ({
				entity: e("editor.entity"),
				name: e("editor.name"),
				num_segments: e("editor.segments_to_show"),
				offset: e("editor.offset"),
				label_spacing: e("editor.label_spacing"),
				icons: e("editor.icons"),
				show_current: e("editor.show_current"),
				auto_label_spacing: e("editor.auto_label_spacing"),
				show_wind: e("editor.show_wind"),
				show_date: e("editor.show_date"),
				show_precipitation_amounts: e("editor.show_precipitation_amounts"),
				show_precipitation_probability: e("editor.show_precipitation_probability")
			})[t.name] || t.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
		}
		_initialize() {
			this.hass !== void 0 && this._config !== void 0 && this._helpers !== void 0 && (this._initialized = !0);
		}
		async loadCardHelpers() {
			this._helpers && customElements.get("ha-form") || (this._helpers = await window.loadCardHelpers(), this._helpers.createCardElement({
				type: "entities",
				entities: []
			}), await customElements.whenDefined("ha-form"));
		}
		_valueChanged(e) {
			if (!this._config || !this.hass) return;
			let t = { ...e.detail.value };
			Object.keys(t).forEach((e) => {
				(t[e] === "" || t[e] === void 0) && delete t[e];
			}), "num_hours" in t && "num_segments" in t && delete t.num_hours, this._config = t, p(this, "config-changed", { config: this._config });
		}
	}, Fu = (Pu.styles = Pt`
    mwc-select,
    mwc-textfield {
      margin-bottom: 16px;
      display: block;
    }
    mwc-formfield {
      padding-bottom: 8px;
    }
    mwc-switch {
      --mdc-theme-secondary: var(--switch-checked-color);
    }
  `, Pu), Q([U({ attribute: !1 })], Fu.prototype, "hass", void 0), Q([pn()], Fu.prototype, "_config", void 0), Q([pn()], Fu.prototype, "_helpers", void 0), Fu = Q([cn("hourly-weather-editor")], Fu);
}));
x(), sn(), xn(), Do(), wu();
var Lu;
customElements.define("weather-bar", $);
var Ru = To(void 0, void 0), zu = 56, Bu = 32, Vu = 1500, Hu = 3e4, Uu = 21e5;
console.info(`%c  HOURLY-WEATHER-CARD \n%c  ${Ru("common.version")} ${Bn}    `, "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray"), window.customCards = window.customCards || [], window.customCards.push({
	type: "hourly-weather",
	name: Ru("common.title_card"),
	description: Ru("common.description")
});
var Wu = Lu = class extends nn {
	constructor(...e) {
		super(...e), this.observedWidth = 0, this.forecastRecoveryPending = !1, this.configRenderPending = !1, this.templateRenderVersion = 0, this.templateSubscriptions = [], this.localizer = void 0, this.localizerLastSettings = {
			configuredLanguage: void 0,
			haServerLanguage: void 0
		}, this._labels = Kn, this.labelsLocalized = !1, this._directions = Object.keys(Yn), this.directionsLocalized = !1;
	}
	static async getConfigElement() {
		return await Promise.resolve().then(() => (Iu(), Nu)), document.createElement("hourly-weather-editor");
	}
	static getStubConfig() {
		return {};
	}
	localize(e, t = "", n = "") {
		return (!this.localizer || this.localizerSettingsChanged) && (this.localizer = To(this.config?.language, this.hass?.locale?.language), this.localizerLastSettings.configuredLanguage = this.config?.language, this.localizerLastSettings.haServerLanguage = this.hass?.locale?.language, this.labelsLocalized = !1, this.directionsLocalized = !1), this.localizer(e, t, n);
	}
	get localizerSettingsChanged() {
		return this.localizerLastSettings.configuredLanguage !== this.config?.language || this.localizerLastSettings.haServerLanguage !== this.hass?.locale?.language;
	}
	get labels() {
		return (!this.labelsLocalized || this.localizerSettingsChanged) && (this._labels = Object.fromEntries(Object.entries(Kn).map(([e, t]) => [e, this.localize(t)])), this.labelsLocalized = !0), this._labels;
	}
	get directions() {
		return (!this.directionsLocalized || this.localizerSettingsChanged) && (this._directions = Object.values(Yn).map((e) => this.localize(e)), this._directions.push(this._directions[0]), this.directionsLocalized = !0), this._directions;
	}
	unsubscribeForecastEvents() {
		if (this.subscribedToForecast) {
			let e = this.subscribedToForecast;
			this.subscribedToForecast = void 0, Promise.resolve(e).then((e) => e()).catch(() => void 0);
		}
	}
	hasUsableForecast(e) {
		return Array.isArray(e) && e.length > 0;
	}
	acceptForecastEvent(e) {
		return this.hasUsableForecast(e?.forecast) ? (this.forecastEvent = e, this.lastValidForecastAt = Date.now(), this.scheduleForecastRecovery(Uu), !0) : (this.scheduleForecastRecovery(this.getForecastRecoveryDelay()), !1);
	}
	getForecastRecoveryDelay() {
		if (this.lastValidForecastAt === void 0) return Vu;
		let e = Date.now() - this.lastValidForecastAt;
		return Math.max(0, Uu - e);
	}
	stopForecastRecovery() {
		this.forecastRecoveryTimer !== void 0 && (window.clearTimeout(this.forecastRecoveryTimer), this.forecastRecoveryTimer = void 0);
	}
	scheduleForecastRecovery(e) {
		this.stopForecastRecovery(), this.isConnected && this.hass && this.config?.entity && this.hassSupportsForecastEvents() && (this.forecastRecoveryTimer = window.setTimeout(() => {
			this.forecastRecoveryTimer = void 0, this.recoverForecast();
		}, e));
	}
	async recoverForecast() {
		if (this.forecastRecoveryPending || !this.isConnected || !this.hass?.callWS || !this.config?.entity) return;
		this.subscribedToForecast || await this.subscribeToForecastEvents();
		let e = this.getForecastRecoveryDelay();
		if (this.lastValidForecastAt !== void 0 && e > 0) {
			this.scheduleForecastRecovery(e);
			return;
		}
		let t = this.config.entity, n = this.getIdealForecastType();
		this.forecastRecoveryPending = !0;
		try {
			let e = await this.hass.callWS({
				type: "call_service",
				domain: "weather",
				service: "get_forecasts",
				service_data: { type: n },
				target: { entity_id: t },
				return_response: !0
			}), r = (e.response ?? e.service_response)?.[t]?.forecast;
			if (this.hasUsableForecast(r)) {
				this.acceptForecastEvent({
					type: n,
					forecast: r
				});
				return;
			}
		} catch (e) {
			console.warn("[hourly-weather] forecast recovery failed", e);
		} finally {
			this.forecastRecoveryPending = !1;
		}
		this.scheduleForecastRecovery(Hu);
	}
	async subscribeToForecastEvents() {
		if (this.unsubscribeForecastEvents(), !this.isConnected || !this.hass || !this.config || !this.config.entity || !this.hassSupportsForecastEvents() || !this.config.entity.startsWith("weather.")) return;
		let e = this.getIdealForecastType();
		try {
			let t = this.hass.connection.subscribeMessage((e) => this.acceptForecastEvent(e), {
				type: "weather/subscribe_forecast",
				forecast_type: e,
				entity_id: this.config.entity
			});
			this.subscribedToForecast = t, t.catch((e) => {
				this.subscribedToForecast === t && (this.subscribedToForecast = void 0), console.warn("[hourly-weather] forecast subscription failed", e), this.scheduleForecastRecovery(0);
			}), this.scheduleForecastRecovery(this.hasUsableForecast(this.forecastEvent?.forecast) ? this.getForecastRecoveryDelay() : Vu);
		} catch (e) {
			console.warn("[hourly-weather] could not subscribe to forecast updates", e), this.scheduleForecastRecovery(0);
		}
	}
	getIdealForecastType() {
		if (this.config?.forecast_type) return this.config.forecast_type;
		if (!this.config?.entity) return "hourly";
		let e = this.hass.states[this.config.entity];
		if (!e) return "hourly";
		let t = e.attributes.supported_features;
		return !t || t & 2 ? "hourly" : t & 4 ? "twice_daily" : "daily";
	}
	setConfig(e) {
		if (!e) throw Error(this.localize("common.invalid_configuration"));
		if (!e.entity) throw Error(this.localize("errors.missing_entity"));
		if (e.label_spacing) {
			let t = parseInt(e.label_spacing, 10);
			if (!Number.isNaN(t) && t < 1) throw Error(this.localize("errors.must_be_positive_int"));
		}
		e.test_gui && m().setEditMode(!0), this.config = {
			name: this.localize("common.title"),
			...e
		}, this.triggerConfigRender();
	}
	triggerConfigRender() {
		if (this.unsubscribeTemplates(), !this.isConnected || !this.hass?.connection) {
			this.configRenderPending = !0;
			return;
		}
		this.configRenderPending = !1, this.renderedConfig = this.renderConfig();
	}
	unsubscribeTemplates() {
		this.templateRenderVersion++;
		for (let e of this.templateSubscriptions) e.then((e) => e()).catch(() => void 0);
		this.templateSubscriptions = [];
	}
	async renderConfig() {
		let { config: e } = this;
		if (!e) return e;
		let t = { ...e }, n = this.templateRenderVersion, r = !1;
		return await Promise.all([
			"num_segments",
			"offset",
			"label_spacing",
			"name"
		].map((i) => this.renderTemplate(e[i], n, (e) => {
			t[i] = e, r && (this.renderedConfig = Promise.resolve({ ...t }));
		}))), r = !0, t;
	}
	async renderTemplate(e, t, n) {
		if (e && typeof e == "string" && e.includes("{{")) return new Promise((r) => {
			let i = this.hass.connection.subscribeMessage((e) => {
				t === this.templateRenderVersion && (n(e.result), r());
			}, {
				type: "render_template",
				template: e
			});
			this.templateSubscriptions.push(i), i.catch((e) => console.warn("[hourly-weather] template subscription failed", e));
		});
	}
	connectedCallback() {
		super.connectedCallback(), this.triggerConfigRender(), typeof ResizeObserver < "u" && (this.resizeObserver = new ResizeObserver((e) => {
			let t = Math.round(e[0]?.contentRect.width ?? 0);
			t > 0 && t !== this.observedWidth && (this.observedWidth = t);
		}), this.resizeObserver.observe(this)), this.hasUpdated && this.subscribeToForecastEvents();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.resizeObserver?.disconnect(), this.resizeObserver = void 0, this.stopForecastRecovery(), this.unsubscribeForecastEvents(), this.unsubscribeTemplates();
	}
	shouldUpdate(e) {
		if (!this.config) return !1;
		if (e.has("observedWidth") || e.has("renderedConfig")) return !0;
		if (e.has("hass")) {
			let t = e.get("hass");
			if (t && this.hass && JSON.stringify(t.locale) !== JSON.stringify(this.hass.locale)) return !0;
		}
		return a(this, e, !1);
	}
	updated(e) {
		super.updated(e), this.hass?.connection && this.configRenderPending && (this.configRenderPending = !1, this.triggerConfigRender());
		let t = e.get("config"), n = e.has("config") && this.config?.entity !== t?.entity, r = e.has("config") && this.config?.forecast_type !== t?.forecast_type;
		(n || r) && (this.forecastEvent = void 0, this.lastValidForecastAt = void 0), (!this.subscribedToForecast || n || r) && this.subscribeToForecastEvents();
	}
	getForecast() {
		let e = !this.forecastEvent?.forecast && this.hassSupportsForecastEvents();
		return {
			forecast: this.forecastEvent?.forecast ?? this.hass?.states[this.config.entity]?.attributes.forecast,
			pending: e
		};
	}
	hassSupportsForecastEvents() {
		return !!this.hass?.services?.weather?.get_forecasts || !!this.hass?.services?.weather?.get_forecast;
	}
	render() {
		return z`${zn(this.renderCore(), z``)}`;
	}
	async renderCore() {
		let e = await this.renderedConfig;
		if (!e) return;
		let t = e.entity, n = this.hass.states[t];
		if (!n) return await this._showError(this.localize("errors.check_entity"));
		let { forecast: r, pending: a } = this.getForecast(), o = e.show_current ? this.getCurrentWeatherSegment(n, r) : void 0, s = r && o ? r.filter((e) => this.isAfterCurrentWeather(e, o)) : r, c = !!(s && o), l = c ? [o, ...s] : s, u = n.attributes.wind_speed_unit ?? "", d = n.attributes.precipitation_unit ?? "", f = this.parseInteger(e.num_segments ?? e.num_hours ?? 12), p = this.parseInteger(e.offset ?? 0), m = this.parseInteger(e.label_spacing ?? 2), h = e.auto_label_spacing ? Math.max(m, this.getResponsiveLabelSpacing(f)) : m, g = !l || !l.length, _ = e.icon_fill, v = !!e.hide_minutes, y = !!e.round_temperatures;
		if (!Number.isInteger(f) || f < 1) return await this._showError(this.localize("errors.offset_must_be_positive_int", "offset", "num_segments"));
		if (!Number.isInteger(p) || p < 0) return await this._showError(this.localize("errors.offset_must_be_positive_int"));
		if (!g && f > l.length - p) return a ? this.renderPendingCard(e) : await this._showError(this.localize("errors.too_many_segments_requested"));
		if (!Number.isInteger(m) || m < 1) return await this._showError(this.localize("errors.offset_must_be_positive_int", "offset", "label_spacing"));
		if (_) {
			let t = e.icon_fill === "full", n = e.icon_fill === "single", r = Number(e.icon_fill);
			if (!t && !n && !(Number.isInteger(r) && r > 0)) return await this._showError(this.localize("errors.invalid_value_icon_fill"));
		}
		let b = e.show_wind;
		if (typeof b == "boolean" && (b = b ? "true" : "false"), g) return a ? this.renderPendingCard(e) : z`
        <ha-card
          .header=${e.name}
          @action=${this._handleAction}
          .actionHandler=${Gn({
			hasHold: i(e.hold_action),
			hasDoubleClick: i(e.double_tap_action)
		})}
          tabindex="0"
          .label=${`Hourly Weather: ${e.entity || "No Entity Defined"}`}
        >
          <div class="card-content">
            <h3>${this.localize("errors.forecast_not_available")}</h3>
            <p>${this.localize("errors.check_entity")}</p>
          </div>
        </ha-card>`;
		let x = this.getConditionListFromForecast(l, f, p), S = this.getTemperatures(l, f, p, v, y), C = this.getWind(l, f, p, u, v), w = this.getPrecipitation(l, f, p, d, v, h, c && p === 0), T = this.getColorSettings(e.colors);
		return z`
      <ha-card
        .header=${e.name}
        @action=${this._handleAction}
        .actionHandler=${Gn({
			hasHold: i(e.hold_action),
			hasDoubleClick: i(e.double_tap_action)
		})}
        tabindex="0"
        .label=${`Hourly Weather: ${e.entity || "No Entity Defined"}`}
      >
        <div class="card-content">
          ${T.warnings.length ? this._showWarning(this.localize("errors.invalid_colors") + " " + T.warnings.join(", ")) : ""}
          <!-- @ts-ignore -->
          <weather-bar
            .conditions=${x}
            .temperatures=${S}
            .wind=${C}
            .precipitation=${w}
            .icons=${!!e.icons}
            .icon_map=${e.icon_map}
            .colors=${T.validColors}
            .hide_hours=${!!e.hide_hours}
            .hide_temperatures=${!!e.hide_temperatures}
            .hide_bar=${!!e.hide_bar}
            .icon_fill=${e.icon_fill}
            .show_wind=${b}
            .show_precipitation_amounts=${!!e.show_precipitation_amounts}
            .show_precipitation_probability=${!!e.show_precipitation_probability}
            .has_current_segment=${c && p === 0}
            .current_label=${this.localize("card.now")}
            .current_time=${o ? this.formatTime(new Date(o.datetime), this.hass.locale) : ""}
            .show_date=${e.show_date}
            .label_spacing=${h}
            .labels=${this.labels}></weather-bar>
        </div>
      </ha-card>
    `;
	}
	getResponsiveLabelSpacing(e) {
		if (this.observedWidth <= 0 || e <= 0) return 1;
		let t = Math.max(this.observedWidth - Bu, 1);
		return Math.max(1, Math.ceil(e * zu / t));
	}
	renderPendingCard(e) {
		return z`
      <ha-card
        .header=${e.name}
        tabindex="0"
        .label=${`Hourly Weather: ${e.entity || "No Entity Defined"}`}
      >
        <div class="card-content forecast-pending" aria-busy="true"></div>
      </ha-card>`;
	}
	getConditionListFromForecast(e, t, n) {
		let r = this.getDisplayCondition(e[n]), i = 0, a = [[r, 1]];
		for (let o = n + 1; o < t + n; o++) {
			let t = this.getDisplayCondition(e[o]);
			t === r ? a[i][1]++ : (a.push([t, 1]), i++, r = t);
		}
		return a;
	}
	parseInteger(e) {
		if (typeof e == "number") return Number.isInteger(e) ? e : NaN;
		if (typeof e != "string" || e.trim() === "") return NaN;
		let t = Number(e);
		return Number.isInteger(t) ? t : NaN;
	}
	getCurrentWeatherSegment(e, t) {
		let n = e.attributes, r = Number(n.temperature);
		if (!(e.state in qn) || !Number.isFinite(r)) return;
		let i = new Date(e.last_updated || Date.now()).getTime(), a = t?.filter((e) => {
			let t = new Date(e.datetime).getTime();
			return !Number.isNaN(t) && t <= i;
		}) ?? [], o = a[a.length - 1], s = Number(n.precipitation), c = Number(n.precipitation_probability);
		return {
			clouds: Number(n.cloud_coverage ?? n.clouds ?? NaN),
			condition: e.state,
			datetime: e.last_updated || (/* @__PURE__ */ new Date()).toISOString(),
			precipitation: Number.isFinite(s) ? s : Number(o?.precipitation ?? NaN),
			precipitation_probability: Number.isFinite(c) ? c : Number(o?.precipitation_probability ?? NaN),
			pressure: Number(n.pressure ?? NaN),
			temperature: r,
			wind_bearing: n.wind_bearing ?? NaN,
			wind_speed: Number(n.wind_speed ?? NaN)
		};
	}
	isAfterCurrentWeather(e, t) {
		let n = new Date(e.datetime).getTime(), r = new Date(t.datetime).getTime();
		return Number.isNaN(n) || Number.isNaN(r) ? !0 : n > r;
	}
	getDisplayCondition(e) {
		let t = Jn[e.condition];
		if (!t) return e.condition;
		let { latitude: n, longitude: r } = this.hass?.config ?? {};
		if (typeof n != "number" || typeof r != "number") return e.condition;
		let i = new Date(e.datetime);
		if (Number.isNaN(i.getTime())) return e.condition;
		let [a, o] = t;
		return qo(i, n, r) ? a : o;
	}
	getTemperatures(e, t, n, r, i) {
		let a = [];
		for (let o = n; o < t + n; o++) {
			let t = e[o], n = new Date(t.datetime), s = i && !Number.isNaN(t.temperature) ? Math.round(t.temperature) : t.temperature;
			a.push({
				date: this.formatDateTime(n, {
					day: "numeric",
					month: "short"
				}),
				hour: this.formatHour(n, this.hass.locale, r),
				temperature: u(s, this.hass.locale)
			});
		}
		return a;
	}
	getPrecipitation(e, t, n, r, i, a, o) {
		let s = [];
		for (let c = 0; c < t; c++) {
			let l = e[n + c], d = o ? c - 1 : c, f = o && c === 0;
			if (f || d % a === 0) {
				let o = f ? [l] : e.slice(n + c, Math.min(n + c + a, n + t)), d = o.reduce((e, t) => e + (Number(t.precipitation) || 0), 0), p = 100 * (1 - o.reduce((e, t) => e * (1 - (Number(t.precipitation_probability) || 0) / 100), 1)), m = Math.round(p);
				s.push({
					hour: this.formatHour(new Date(l.datetime), this.hass.locale, i),
					precipitationAmount: d > 0 ? `${u(d, this.hass.locale)} ${r}`.trim() : "",
					precipitationProbability: m > 0 ? `${u(m, this.hass.locale)}%` : "",
					precipitationProbabilityText: m > 0 ? this.localize("card.chance_of_precipitation", "{0}", String(m)) : ""
				});
			} else s.push({
				hour: this.formatHour(new Date(l.datetime), this.hass.locale, i),
				precipitationAmount: "",
				precipitationProbability: "",
				precipitationProbabilityText: ""
			});
		}
		return s;
	}
	getWind(e, t, n, r, i) {
		let a = [];
		for (let o = n; o < t + n; o++) {
			let t = e[o], n = "-", s = "";
			t.wind_speed > 0 && (n = `${Math.round(t.wind_speed)} ${r}`.trim(), s = this.formatWindDir(t.wind_bearing)), a.push({
				hour: this.formatHour(new Date(t.datetime), this.hass.locale, i),
				windSpeed: n,
				windSpeedRawMS: this.getWindSpeedMS(t.wind_speed, r),
				windDirection: s,
				windDirectionRaw: t.wind_bearing
			});
		}
		return a;
	}
	formatWindDir(e) {
		if (typeof e == "string") {
			let t = e.toLowerCase();
			return t in Yn ? this.localize(Yn[t]) : e;
		}
		return this.directions[Math.floor((e + 11.25) / 22.5)];
	}
	getWindSpeedMS(e, t) {
		switch (t) {
			case "m/s": return e;
			case "mph": return e * .44704;
			case "km/h": return e * .27777777777778;
			case "ft/s": return e * .3048;
			case "kt":
			case "kn": return e * .51444444444444;
		}
		return -1;
	}
	formatHour(e, t, n) {
		let r = this.formatTime(e, t);
		return n || r.includes("AM") || r.includes("PM") ? r.replace(":00", "") : r;
	}
	formatTime(e, t) {
		let n = t.time_format === s.am_pm;
		if (t.time_format === s.language || t.time_format === s.system) {
			let e = t.time_format === s.language ? t.language : void 0, r = (/* @__PURE__ */ new Date()).toLocaleString(e);
			n = r.includes("AM") || r.includes("PM");
		}
		return this.formatDateTime(e, {
			hour: "numeric",
			minute: "2-digit",
			hour12: n
		});
	}
	formatDateTime(e, t) {
		let n = this.hass.locale;
		return new Intl.DateTimeFormat(n.language, {
			...t,
			timeZone: n.time_zone === "server" ? this.hass.config?.time_zone : void 0
		}).format(e);
	}
	getColorSettings(e) {
		if (!e) return {
			validColors: void 0,
			warnings: []
		};
		let t = /* @__PURE__ */ new Map(), n = [];
		return Object.entries(e).forEach(([e, r]) => {
			this.isValidColorDefinition(e, r) ? t.set(e, Lu.toColorObject(r)) : n.push(`${e}: ${JSON.stringify(r, null, 2)}`);
		}), {
			validColors: t,
			warnings: n
		};
	}
	isValidColorDefinition(e, t) {
		if (!(e in qn)) return !1;
		if (typeof t == "string") {
			if (!Lu.isValidColor(t)) return !1;
		} else if (!t.background && !t.foreground || t.background && !Lu.isValidColor(t.background) || t.foreground && !Lu.isValidColor(t.foreground)) return !1;
		return !0;
	}
	static isValidColor(e) {
		return !!(ye(e) || Lu.isValidColorVar(e));
	}
	static isValidCustomPropertyName(e) {
		if (typeof e != "string" || !e.startsWith("--")) return !1;
		let t = e.slice(2);
		return t.length === 0 || /^-[0-9]/.test(t) || /^[0-9]/.test(t) ? !1 : /^[A-Za-z0-9_-]+$/.test(t);
	}
	static isValidColorVar(e) {
		if (typeof e != "string") return !1;
		let t = e.trim();
		if (!t.startsWith("var(") || !t.endsWith(")")) return !1;
		let n = t.slice(4, -1).trim(), r = n.indexOf(","), i = r === -1 ? n : n.slice(0, r), a = r === -1 ? void 0 : n.slice(r + 1), o = i.trim();
		if (!Lu.isValidCustomPropertyName(o)) return !1;
		let s = a?.trim();
		return !(s && !Lu.isValidColor(s));
	}
	static toColorObject(e) {
		return typeof e == "string" ? { background: e } : e;
	}
	_handleAction(e) {
		this.hass && this.config && e.detail.action && b(this, this.hass, this.config, e.detail.action);
	}
	_showWarning(e) {
		return z` <hui-warning>${e}</hui-warning> `;
	}
	async _showError(e) {
		await new Promise((e) => setTimeout(e, 0));
		let t = document.createElement("hui-error-card");
		return t.setConfig({
			type: "error",
			error: e,
			origConfig: this.config
		}), z` ${t} `;
	}
	static get styles() {
		return Pt`
      :host {
        /* Give ResizeObserver a block box that fills the available card width;
           non-replaced inline elements do not report a usable observed width. */
        display: block;
      }
      .forecast-pending {
        min-height: 24px;
      }
    `;
	}
};
Q([U({ attribute: !1 })], Wu.prototype, "hass", void 0), Q([pn()], Wu.prototype, "config", void 0), Q([pn()], Wu.prototype, "renderedConfig", void 0), Q([pn()], Wu.prototype, "forecastEvent", void 0), Q([pn()], Wu.prototype, "subscribedToForecast", void 0), Q([pn()], Wu.prototype, "observedWidth", void 0), Wu = Lu = Q([cn("hourly-weather")], Wu);
//#endregion
export { Wu as HourlyWeatherCard };
