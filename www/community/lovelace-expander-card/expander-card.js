// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/disclose-version.js
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
// src/editortype.ts
var e = {
	icon: "",
	"arrow-color": "",
	"icon-rotate-degree": "",
	"header-color": "",
	"button-background": "",
	"min-width-expanded": 0,
	"max-width-expanded": 0,
	"storage-id": "",
	"expander-card-id": "",
	"show-button-users": [],
	"start-expanded-users": [],
	"expander-card-background": "",
	"expander-card-background-expanded": "",
	"expander-card-display": "",
	gap: "",
	padding: "",
	"expanded-gap": "",
	"child-padding": "",
	"child-margin-top": "",
	"overlay-margin": "",
	"title-card-padding": "",
	style: ""
}, t = [
	"expanded",
	"icon",
	"arrow-color",
	"title",
	"style"
], n = /* @__PURE__ */ function(e) {
	return e.CSS = "css", e.Object = "object", e;
}({}), r = {
	name: "style",
	label: "CSS text",
	selector: { text: { multiline: !0 } }
}, i = {
	name: "style",
	label: "CSS structured object",
	selector: { object: {} }
}, a = { icon: {} }, o = { text: {} }, s = { boolean: {} }, c = (e) => ({ number: { unit_of_measurement: e } }), l = (e, t) => ({
	name: e,
	label: t,
	selector: a
}), u = (e, t) => ({
	name: e,
	label: t,
	selector: o
}), d = (e, t) => ({
	name: e,
	label: t,
	selector: s
}), f = (e, t, n) => ({
	name: e,
	label: t,
	selector: c(n)
}), p = [{
	type: "expandable",
	label: "Expander Card Settings",
	icon: "mdi:arrow-down-bold-box-outline",
	schema: [
		{ ...u("title", "Title") },
		{ ...l("icon", "Icon") },
		{
			type: "expandable",
			label: "Expander control",
			icon: "mdi:cog-outline",
			schema: [{
				type: "grid",
				schema: [
					{ ...d("expanded", "Start expanded") },
					{ ...d("animation", "Enable animation") },
					{
						name: "haptic",
						label: "Haptic feedback",
						selector: { select: {
							mode: "dropdown",
							options: [
								{
									value: "light",
									label: "Light"
								},
								{
									value: "medium",
									label: "Medium"
								},
								{
									value: "heavy",
									label: "Heavy"
								},
								{
									value: "success",
									label: "Success"
								},
								{
									value: "warning",
									label: "Warning"
								},
								{
									value: "failure",
									label: "Failure"
								},
								{
									value: "selection",
									label: "Selection"
								},
								{
									value: "none",
									label: "None"
								}
							]
						} }
					},
					{ ...f("min-width-expanded", "Min width expanded", "px") },
					{ ...f("max-width-expanded", "Max width expanded", "px") },
					{ ...u("storage-id", "Storage ID") },
					{ ...u("expander-card-id", "Expander card ID") }
				]
			}]
		},
		{
			type: "expandable",
			label: "Expander styling",
			icon: "mdi:palette-swatch",
			schema: [{
				type: "grid",
				schema: [
					{ ...u("arrow-color", "Icon color") },
					{ ...u("icon-rotate-degree", "Icon rotate degree") },
					{ ...u("header-color", "Header color") },
					{ ...u("button-background", "Button background color") },
					{ ...u("expander-card-background", "Background") },
					{ ...u("expander-card-background-expanded", "Background when expanded") },
					{ ...u("expander-card-display", "Expander card display") },
					{ ...d("clear", "Clear border and background") },
					{ ...u("gap", "Gap") },
					{ ...u("padding", "Padding") }
				]
			}]
		},
		{
			type: "expandable",
			label: "Card styling",
			icon: "mdi:palette-swatch-outline",
			schema: [{
				type: "grid",
				schema: [
					{ ...u("expanded-gap", "Card gap") },
					{ ...u("child-padding", "Card padding") },
					{ ...u("child-margin-top", "Card margin top") },
					{ ...d("clear-children", "Clear card border and background") }
				]
			}]
		},
		{
			type: "expandable",
			label: "Title card",
			icon: "mdi:subtitles-outline",
			schema: [{
				name: "title-card",
				label: "Title card",
				selector: { object: {
					label_field: "type",
					fields: {
						type: {
							label: "Card type",
							required: !0,
							selector: { text: {} }
						},
						expander_card_title_card_marker: {
							required: !1,
							selector: { text: {} }
						}
					}
				} }
			}, {
				type: "grid",
				schema: [
					{ ...d("title-card-clickable", "Make title card clickable to expand/collapse") },
					{ ...d("title-card-button-overlay", "Overlay expand button on title card") },
					{ ...u("overlay-margin", "Overlay margin") },
					{ ...u("title-card-padding", "Title card padding") }
				]
			}]
		},
		{
			type: "expandable",
			label: "User settings",
			icon: "mdi:account-multiple-outline",
			schema: [{
				type: "grid",
				schema: [{
					name: "show-button-users",
					label: "Show button users",
					selector: { select: {
						multiple: !0,
						mode: "dropdown",
						custom: !0,
						options: ["[[users]]"]
					} }
				}, {
					name: "start-expanded-users",
					label: "Start expanded users",
					selector: { select: {
						multiple: !0,
						mode: "dropdown",
						custom: !0,
						options: ["[[users]]"]
					} }
				}]
			}]
		},
		{
			type: "expandable",
			label: "Advanced styling",
			icon: "mdi:brush-outline",
			schema: ["[[style]]"]
		},
		{
			type: "expandable",
			label: "Advanced templates",
			icon: "mdi:code-brackets",
			schema: [{
				type: "expandable",
				label: "Variables",
				icon: "mdi:variable",
				schema: [{
					name: "variables",
					label: "Variables",
					selector: { object: {
						label_field: "variable",
						multiple: !0,
						fields: {
							variable: {
								label: "Variable name",
								required: !0,
								selector: { text: {} }
							},
							value_template: {
								label: "Value template",
								required: !0,
								selector: { text: { multiline: !0 } }
							}
						}
					} }
				}]
			}, {
				type: "expandable",
				label: "Templates",
				icon: "mdi:code-brackets",
				schema: [{
					name: "templates",
					label: "Templates",
					selector: { object: {
						label_field: "template",
						multiple: !0,
						fields: {
							template: {
								label: "Config item",
								required: !0,
								selector: { select: {
									mode: "dropdown",
									custom_value: !0,
									sort: !0,
									options: ["[[templates]]"]
								} }
							},
							value_template: {
								label: "Value template",
								required: !0,
								selector: { template: {} }
							}
						}
					} }
				}]
			}]
		}
	]
}], m = (e, t) => new Promise((n) => {
	let r = t.cancel, i = t.submit;
	e.dispatchEvent(new CustomEvent("show-dialog", {
		detail: {
			dialogTag: "expander-card-title-card-edit-form",
			dialogImport: () => customElements.whenDefined("expander-card-title-card-edit-form"),
			dialogParams: {
				...t,
				cancel: () => {
					n(null), r && r();
				},
				submit: (e) => {
					n(e), i && i(e);
				}
			}
		},
		bubbles: !0,
		composed: !0
	}));
}), h = window, g = h.cardHelpers, _ = new Promise((e) => {
	g && e(), h.loadCardHelpers && h.loadCardHelpers().then((t) => {
		g = t, h.cardHelpers = g, e();
	});
});
async function v() {
	let e = document.querySelector("home-assistant")?.hass;
	if (e) return (await e.callWS({ type: "config/auth/list" })).filter((e) => !e.system_generated).map((e) => e.name);
}
var y = async () => {
	let a = await _.then(() => g.createCardElement({
		type: "vertical-stack",
		cards: []
	})), o = await customElements.whenDefined("hui-vertical-stack-card").then(() => a.constructor.getConfigElement()), s = await v();
	return class extends o.constructor {
		constructor() {
			super(), this.showDialogCallback = (e) => {
				e.detail?.dialogParams?.schema?.find((e) => e.name === "expander_card_title_card_marker") && (e.stopPropagation(), e.detail?.dialogImport && e.detail.dialogImport().then(async () => {
					let t = {
						title: "Title card",
						config: this._config["title-card"] || {},
						submit: e.detail?.dialogParams?.submit,
						cancel: e.detail?.dialogParams?.cancel,
						submitText: e.detail?.dialogParams?.submitText,
						cancelText: e.detail?.dialogParams?.cancelText,
						lovelace: this.lovelace
					};
					await m(this, t);
				}));
			}, this._computeLabelCallback = (e) => e.label ?? e.name ?? "", this._valueChanged = (t) => {
				let n = t.detail.value, r = Object.entries(e);
				for (let [e, t] of r) typeof t == "object" && Array.isArray(t) && Array.isArray(n[e]) ? JSON.stringify(n[e]) === JSON.stringify(t) && delete n[e] : n[e] === t && delete n[e];
				this._config = n, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: this._config } }));
			}, this._users = s;
		}
		setConfig(e) {
			this._config = e;
		}
		get _schema() {
			let e = JSON.stringify(p), a = this._users.map((e) => e.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")).join("\",\""), o = e.replace(/\[\[users\]\]/g, a);
			o = o.replace(/\[\[templates\]\]/g, t.filter((e) => !this._config.templates?.some((t) => t.template === e)).join("\",\""));
			let s = (this._config.style && typeof this._config.style == "object" ? n.Object : n.CSS) === n.CSS ? JSON.stringify(r) : JSON.stringify(i);
			return o = o.replace(/"\[\[style\]\]"/g, s), JSON.parse(o);
		}
		set _schema(e) {}
		connectedCallback() {
			super.connectedCallback(), this.addEventListener("show-dialog", this.showDialogCallback.bind(this), !0);
		}
		disconnectedCallback() {
			super.disconnectedCallback(), this.removeEventListener("show-dialog", this.showDialogCallback.bind(this), !0);
		}
	};
}, b = (async () => {
	for (; customElements.get("home-assistant") === void 0;) await new Promise((e) => h.setTimeout(e, 100));
	if (!customElements.get("expander-card-editor")) {
		let e = await y();
		customElements.define("expander-card-editor", e);
	}
}), x = {}, S = Symbol("uninitialized"), ee = "http://www.w3.org/1999/xhtml", te = "http://www.w3.org/2000/svg", ne = "http://www.w3.org/1998/Math/MathML", re = Array.isArray, ie = Array.prototype.indexOf, ae = Array.prototype.includes, oe = Array.from, se = Object.keys, ce = Object.defineProperty, le = Object.getOwnPropertyDescriptor, ue = Object.getOwnPropertyDescriptors, de = Object.prototype, fe = Array.prototype, pe = Object.getPrototypeOf, me = Object.isExtensible, he = () => {};
function ge(e) {
	for (var t = 0; t < e.length; t++) e[t]();
}
function _e() {
	var e, t;
	return {
		promise: new Promise((n, r) => {
			e = n, t = r;
		}),
		resolve: e,
		reject: t
	};
}
var C = 1024, w = 2048, T = 4096, ve = 8192, ye = 16384, be = 32768, xe = 1 << 25, Se = 65536, Ce = 1 << 19, we = 1 << 20, Te = 1 << 25, Ee = 1 << 21, De = 1 << 22, Oe = 1 << 23, ke = Symbol("$state"), Ae = Symbol("component"), je = Symbol("legacy props"), Me = Symbol(""), Ne = Symbol("attributes"), Pe = Symbol("class"), Fe = Symbol("style"), Ie = Symbol("text"), Le = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}(), Re = !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml");
function ze() {
	console.warn("https://svelte.dev/e/derived_inert");
}
function Be(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function Ve() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/hydration.js
var E = !1;
function He(e) {
	E = e;
}
var D;
function O(e) {
	if (e === null) throw Be(), x;
	return D = e;
}
function Ue() {
	return O(/* @__PURE__ */ _n(D));
}
function We(e) {
	if (E) {
		if (/* @__PURE__ */ _n(D) !== null) throw Be(), x;
		D = e;
	}
}
function Ge(e = 1) {
	if (E) {
		for (var t = e, n = D; t--;) n = /* @__PURE__ */ _n(n);
		D = n;
	}
}
function Ke(e = !0) {
	for (var t = 0, n = D;;) {
		if (n.nodeType === 8) {
			var r = n.data;
			if (r === "]") {
				if (t === 0) return n;
				--t;
			} else (r === "[" || r === "[!" || r[0] === "[" && !isNaN(Number(r.slice(1)))) && (t += 1);
		}
		var i = /* @__PURE__ */ _n(n);
		e && n.remove(), n = i;
	}
}
function qe(e) {
	if (!e || e.nodeType !== 8) throw Be(), x;
	return e.data;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/equality.js
function Je(e) {
	return e === this.v;
}
function Ye(e, t) {
	return e == e ? e !== t || typeof e == "object" && !!e || typeof e == "function" : t == t;
}
function Xe(e) {
	return !Ye(e, this.v);
}
function Ze(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/errors.js
function Qe() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function $e(e, t, n) {
	throw Error("https://svelte.dev/e/each_key_duplicate");
}
function et(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function tt() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function nt(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function rt() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function it() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function at(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function ot() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function st() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function ct() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function lt() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/context.js
var k = null;
function ut(e) {
	k = e;
}
function dt(e, t = !1, n) {
	k = {
		p: k,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		r: H,
		l: null
	};
}
function ft(e) {
	var t = k, n = t.e;
	if (n !== null) {
		t.e = null;
		for (var r of n) Pn(r);
	}
	return e !== void 0 && (t.x = e), t.i = !0, k = t.p, pt(e);
}
function pt(e = {}) {
	return ce(e, Ae, { value: !0 }), e;
}
function mt() {
	return !0;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/task.js
var ht = [];
function gt() {
	var e = ht;
	ht = [], ge(e);
}
function _t(e) {
	if (ht.length === 0 && !Vt) {
		var t = ht;
		queueMicrotask(() => {
			t === ht && gt();
		});
	}
	ht.push(e);
}
function vt() {
	for (; ht.length > 0;) gt();
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/status.js
var yt = ~(w | T | C);
function A(e, t) {
	e.f = e.f & yt | t;
}
function bt(e) {
	e.f & 512 || e.deps === null ? A(e, C) : A(e, T);
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/utils.js
function xt(e, t, n) {
	e.f & 2048 ? t.add(e) : e.f & 4096 && n.add(e), A(e, C);
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function St(e) {
	var t = B, n = H;
	V(null), U(null);
	try {
		return e();
	} finally {
		V(t), U(n);
	}
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/async.js
function Ct(e, t, n, r) {
	let i = mt() ? Dt : jt;
	var a = e.filter((e) => !e.settled), o = t.map(i);
	if (n.length === 0 && a.length === 0) {
		r(o);
		return;
	}
	var s = H, c = wt(), l = a.length === 1 ? a[0].promise : a.length > 1 ? Promise.all(a.map((e) => e.promise)) : null;
	function u(e) {
		if (!(s.f & 16384)) {
			c();
			try {
				r([...o, ...e]);
			} catch (e) {
				Dn(e, s);
			}
			Tt();
		}
	}
	var d = Et();
	if (n.length === 0) {
		l.then(() => u([])).finally(d);
		return;
	}
	function f() {
		Promise.all(n.map((e) => /* @__PURE__ */ kt(e))).then(u).catch((e) => Dn(e, s)).finally(d);
	}
	l ? l.then(() => {
		s.f & 16384 ? d() : (c(), f(), Tt());
	}) : f();
}
function wt() {
	var e = H, t = B, n = k, r = j;
	return function(i = !0) {
		U(e), V(t), ut(n), i && !(e.f & 16384) && (r?.activate(), r?.apply());
	};
}
function Tt(e = !0) {
	U(null), V(null), ut(null), e && j?.deactivate();
}
function Et() {
	var e = H, t = e.b, n = j, r = !!t?.is_rendered();
	return t?.update_pending_count(1, n), n.increment(r, e), () => {
		t?.update_pending_count(-1, n), n.decrement(r, e);
	};
}
/*#__NO_SIDE_EFFECTS__*/
function Dt(e) {
	var t = 2 | w;
	return H !== null && (H.f |= Ce), {
		ctx: k,
		deps: null,
		effects: null,
		equals: Je,
		f: t,
		fn: e,
		reactions: null,
		rv: 0,
		v: S,
		wv: 0,
		parent: H,
		ac: null
	};
}
var Ot = Symbol("obsolete");
/*#__NO_SIDE_EFFECTS__*/
function kt(e, t, n) {
	let r = H;
	r === null && Qe();
	var i = void 0, a = rn(S), o = !B, s = /* @__PURE__ */ new Set();
	return Rn(() => {
		var t = H, n = _e();
		i = n.promise;
		try {
			Promise.resolve(e()).then(n.resolve, (e) => {
				e !== Le && n.reject(e);
			}).finally(Tt);
		} catch (e) {
			n.reject(e), Tt();
		}
		var c = j;
		if (o) {
			if (t.f & 32768) var l = Et();
			if (r.b?.is_rendered()) c.async_deriveds.get(t)?.reject(Ot);
			else for (let e of s.values()) e.reject(Ot);
			s.add(n), c.async_deriveds.set(t, n);
		}
		let u = (e, t = void 0) => {
			l?.(), s.delete(n), t !== Ot && (c.activate(), t ? (a.f |= Oe, cn(a, t)) : (a.f & 8388608 && (a.f ^= Oe), cn(a, e)), c.deactivate());
		};
		n.promise.then(u, (e) => u(null, e || "unknown"));
	}), Mn(() => {
		for (let e of s) e.reject(Ot);
	}), new Promise((e) => {
		function t(n) {
			function r() {
				n === i ? e(a) : t(i);
			}
			n.then(r, r);
		}
		t(i);
	});
}
/*#__NO_SIDE_EFFECTS__*/
function At(e) {
	let t = /* @__PURE__ */ Dt(e);
	return rr(t), t;
}
/*#__NO_SIDE_EFFECTS__*/
function jt(e) {
	let t = /* @__PURE__ */ Dt(e);
	return t.equals = Xe, t;
}
function Mt(e) {
	var t = e.effects;
	if (t !== null) {
		e.effects = null;
		for (var n = 0; n < t.length; n += 1) z(t[n]);
	}
}
function Nt(e) {
	var t, n = H, r = e.parent;
	if (!$n && r !== null && e.v !== S && r.f & 24576) return ze(), e.v;
	U(r);
	try {
		Mt(e), t = fr(e);
	} finally {
		U(n);
	}
	return t;
}
function Pt(e) {
	var t = Nt(e);
	!e.equals(t) && (e.wv = lr(), (!j?.is_fork || e.deps === null) && (j === null ? e.v = t : (j.capture(e, t, !0), Rt?.capture(e, t, !0)), e.deps === null)) ? A(e, C) : $n || (zt === null ? bt(e) : (jn() || j?.is_fork) && zt.set(e, t));
}
function Ft(e) {
	if (e.effects !== null) for (let t of e.effects) (t.teardown || t.ac) && (t.teardown?.(), t.ac !== null && St(() => {
		t.ac.abort(Le), t.ac = null;
	}), t.fn !== null && (t.teardown = he), hr(t, 0), Un(t));
}
function It(e) {
	if (e.effects !== null) for (let t of e.effects) t.teardown && t.fn !== null && gr(t);
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/batch.js
var Lt = null, j = null, Rt = null, zt = null, Bt = null, Vt = !1, Ht = !1, Ut = null, Wt = null, Gt = 0, Kt = 1, qt = class e {
	id = Kt++;
	#e = !1;
	linked = !0;
	#t = null;
	#n = null;
	async_deriveds = /* @__PURE__ */ new Map();
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = /* @__PURE__ */ new Set();
	#a = 0;
	#o = /* @__PURE__ */ new Map();
	#s = null;
	#c = [];
	#l = [];
	#u = /* @__PURE__ */ new Set();
	#d = /* @__PURE__ */ new Set();
	#f = /* @__PURE__ */ new Map();
	#p = /* @__PURE__ */ new Set();
	is_fork = !1;
	#m = !1;
	constructor() {
		Lt === null ? Lt = this : (Lt.#n = this, this.#t = Lt), Lt = this;
	}
	#h() {
		if (this.is_fork) return !0;
		for (let n of this.#o.keys()) {
			for (var e = n, t = !1; e.parent !== null;) {
				if (this.#f.has(e)) {
					t = !0;
					break;
				}
				e = e.parent;
			}
			if (!t) return !0;
		}
		return !1;
	}
	skip_effect(e) {
		this.#f.has(e) || this.#f.set(e, {
			d: [],
			m: []
		}), this.#p.delete(e);
	}
	unskip_effect(e, t = (e) => this.schedule(e)) {
		var n = this.#f.get(e);
		if (n) {
			this.#f.delete(e);
			for (var r of n.d) A(r, w), t(r);
			for (r of n.m) A(r, T), t(r);
		}
		this.#p.add(e);
	}
	#g() {
		var e = [];
		for (let i of this.#c) if (!(i.f & 16384 || !(i.f & 6144))) {
			for (var t = i, n = !1; t.parent !== null;) {
				t = t.parent;
				var r = t.f;
				if (r & 96) {
					if (!(r & 1024)) {
						n = !0;
						break;
					}
					t.f ^= C;
				}
			}
			n || e.push(t);
		}
		return this.#c = [], e;
	}
	#_() {
		this.#e = !0;
		for (let e of this.#u) this.#d.delete(e), A(e, w), this.schedule(e);
		for (let e of this.#d) A(e, T), this.schedule(e);
		this.apply();
		for (var t = Ut = [], n = [], r = Wt = []; this.#c.length > 0;) {
			Gt++ > 1e3 && (this.#S(), Jt());
			for (let e of this.#g()) try {
				this.#v(e, t, n);
			} catch (t) {
				throw $t(e), this.#h() || this.discard(), t;
			}
		}
		if (j = null, r.length > 0) {
			var i = e.ensure();
			for (let e of r) i.schedule(e);
		}
		if (Ut = null, Wt = null, this.#h()) {
			this.#x(n), this.#x(t);
			for (let [e, t] of this.#f) Qt(e, t);
			r.length > 0 && j.#_();
			return;
		}
		let a = this.#y();
		if (a) this.#x(n), this.#x(t), a.#b(this);
		else {
			this.#u.clear(), this.#d.clear();
			for (let e of this.#r) e(this);
			this.#r.clear(), Rt = this, Xt(n), Xt(t), Rt = null, this.#s?.resolve();
			var o = j;
			if (this.#a === 0 && (this.#c.length === 0 || o !== null) && this.#S(), this.#c.length > 0) {
				if (o !== null) {
					for (let e of this.#c) o.#c.push(e);
					this.#c = [];
				} else o = this;
			}
			o !== null && (tn.clear(), o.#_());
		}
	}
	#v(e, t, n) {
		e.f ^= C;
		for (var r = e.first; r !== null;) {
			var i = r.f, a = !!(i & 96);
			if (!(a && i & 1024 || i & 8192 || this.#f.has(r)) && r.fn !== null) {
				a ? r.f ^= C : i & 4 ? t.push(r) : ur(r) && (i & 16 && this.#d.add(r), gr(r));
				var o = r.first;
				if (o !== null) {
					r = o;
					continue;
				}
			}
			for (; r !== null;) {
				var s = r.next;
				if (s !== null) {
					r = s;
					break;
				}
				r = r.parent;
			}
		}
	}
	#y() {
		for (var e = this.#t; e !== null;) {
			if (!e.is_fork) {
				for (let [t, [, n]] of this.current) if (e.current.has(t) && !n) return e;
			}
			e = e.#t;
		}
		return null;
	}
	#b(e) {
		for (let [t, n] of e.current) !this.previous.has(t) && e.previous.has(t) && this.previous.set(t, e.previous.get(t)), this.current.set(t, n);
		for (let [t, n] of e.async_deriveds) {
			let e = this.async_deriveds.get(t);
			e && n.promise.then(e.resolve).catch(e.reject);
		}
		e.async_deriveds.clear(), this.transfer_effects(e.#u, e.#d);
		let t = (e) => {
			var n = e.reactions;
			if (n !== null && !(e.f & 2 && !(e.f & 6144))) for (let e of n) {
				var r = e.f;
				if (r & 2) t(e);
				else {
					var i = e;
					r & 4194320 && !this.async_deriveds.has(i) && (this.#d.delete(i), A(i, w), this.schedule(i));
				}
			}
		};
		for (let e of this.current.keys()) t(e);
		this.oncommit(() => e.discard()), e.#S(), j = this, this.#_();
	}
	#x(e) {
		for (var t = 0; t < e.length; t += 1) xt(e[t], this.#u, this.#d);
	}
	capture(e, t, n = !1) {
		e.v !== S && !this.previous.has(e) && this.previous.set(e, e.v), e.f & 8388608 || (this.current.set(e, [t, n]), zt?.set(e, t)), this.is_fork || (e.v = t);
	}
	activate() {
		j = this;
	}
	deactivate() {
		j = null, zt = null;
	}
	flush() {
		try {
			Ht = !0, j = this, this.#_();
		} finally {
			Gt = 0, Bt = null, Ut = null, Wt = null, Ht = !1, j = null, zt = null, tn.clear();
		}
	}
	discard() {
		for (let e of this.#i) e(this);
		this.#i.clear();
		for (let e of this.async_deriveds.values()) e.reject(Ot);
		this.#S(), this.#s?.resolve();
	}
	register_created_effect(e) {
		this.#l.push(e);
	}
	increment(e, t) {
		if (this.#a += 1, e) {
			let e = this.#o.get(t) ?? 0;
			this.#o.set(t, e + 1);
		}
	}
	decrement(e, t) {
		if (--this.#a, e) {
			let e = this.#o.get(t) ?? 0;
			e === 1 ? this.#o.delete(t) : this.#o.set(t, e - 1);
		}
		this.#m || (this.#m = !0, _t(() => {
			this.#m = !1, this.linked && this.flush();
		}));
	}
	transfer_effects(e, t) {
		for (let t of e) this.#u.add(t);
		for (let e of t) this.#d.add(e);
		e.clear(), t.clear();
	}
	oncommit(e) {
		this.#r.add(e);
	}
	ondiscard(e) {
		this.#i.add(e);
	}
	settled() {
		return (this.#s ??= _e()).promise;
	}
	static ensure() {
		if (j === null) {
			let t = j = new e();
			!Ht && !Vt && _t(() => {
				t.#e || t.flush();
			});
		}
		return j;
	}
	apply() {
		zt = null;
	}
	schedule(e) {
		Bt = e, e.b?.is_pending && e.f & 16777228 && !(e.f & 32768) ? e.b.defer_effect(e) : this.#c.push(e);
	}
	#S() {
		if (this.linked) {
			var e = this.#t, t = this.#n;
			e === null || (e.#n = t), t === null ? Lt = e : t.#t = e, this.linked = !1;
		}
	}
};
function M(e) {
	var t = Vt, n = Rt;
	Rt = null, Vt = !0;
	try {
		var r;
		for (e && (M(), r = e());;) {
			if (vt(), j === null) return r;
			j.flush();
		}
	} finally {
		Vt = t, Rt = n;
	}
}
function Jt() {
	try {
		rt();
	} catch (e) {
		Dn(e, Bt);
	}
}
var Yt = null;
function Xt(e) {
	var t = e.length;
	if (t !== 0) {
		for (var n = 0; n < t;) {
			var r = e[n++];
			if (!(r.f & 24576) && ur(r) && (Yt = /* @__PURE__ */ new Set(), gr(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Kn(r), Yt?.size > 0)) {
				tn.clear();
				for (let e of Yt) {
					if (e.f & 24576) continue;
					let t = [e], n = e.parent;
					for (; n !== null;) Yt.has(n) && (Yt.delete(n), t.push(n)), n = n.parent;
					for (let e = t.length - 1; e >= 0; e--) {
						let n = t[e];
						n.f & 24576 || gr(n);
					}
				}
				Yt.clear();
			}
		}
		Yt = null;
	}
}
function Zt(e) {
	j.schedule(e);
}
function Qt(e, t) {
	if (!(e.f & 32 && e.f & 1024)) {
		e.f & 2048 ? t.d.push(e) : e.f & 4096 && t.m.push(e), A(e, C);
		for (var n = e.first; n !== null;) Qt(n, t), n = n.next;
	}
}
function $t(e) {
	A(e, C);
	for (var t = e.first; t !== null;) $t(t), t = t.next;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/sources.js
var en = /* @__PURE__ */ new Set(), tn = /* @__PURE__ */ new Map(), nn = !1;
function rn(e, t) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals: Je,
		rv: 0,
		wv: 0
	};
}
/*#__NO_SIDE_EFFECTS__*/
function N(e, t) {
	let n = rn(e, t);
	return rr(n), n;
}
/*#__NO_SIDE_EFFECTS__*/
function an(e, t = !1, n = !0) {
	let r = rn(e);
	return t || (r.equals = Xe), r;
}
function P(e, t, n = !1) {
	return B !== null && (!tr || B.f & 131072) && mt() && B.f & 4325394 && (nr === null || !nr.has(e)) && ct(), cn(e, n ? F(t) : t, Wt);
}
var on = null, sn = 0;
function cn(e, t, n = null) {
	if (!e.equals(t)) {
		$n ? tn.set(e, t) : tn.has(e) || tn.set(e, e.v);
		var r = qt.ensure();
		if (r.capture(e, t), e.f & 2) {
			let t = e;
			e.f & 2048 && Nt(t), zt === null && bt(t);
		}
		e.wv = lr(), on = null, sn = 0, dn(e, w, n), on = null, mt() && H !== null && H.f & 1024 && !(H.f & 96) && (K === null ? ir([e]) : K.push(e)), !r.is_fork && en.size > 0 && !nn && ln();
	}
	return t;
}
function ln() {
	nn = !1;
	for (let e of en) {
		e.f & 1024 && A(e, T);
		let t;
		try {
			t = ur(e);
		} catch {
			t = !0;
		}
		t && gr(e);
	}
	en.clear();
}
function un(e) {
	P(e, e.v + 1);
}
function dn(e, t, n) {
	var r = e.reactions;
	if (r !== null) {
		var i = mt(), a = r.length;
		if (sn += a, sn > 1e5 && on === null && (on = /* @__PURE__ */ new Set()), on !== null) {
			if (on.has(e)) return;
			on.add(e);
		}
		for (var o = 0; o < a; o++) {
			var s = r[o], c = s.f;
			if (i || s !== H) {
				var l = (c & w) === 0;
				if (l && A(s, t), c & 131072) en.add(s);
				else if (c & 2) {
					var u = s;
					zt?.delete(u), dn(u, T, n);
				} else if (l) {
					var d = s;
					c & 16 && Yt !== null && Yt.add(d), n === null ? Zt(d) : n.push(d);
				}
			}
		}
	}
}
function F(e) {
	if (typeof e != "object" || !e || ke in e || Ae in e) return e;
	let t = pe(e);
	if (t !== de && t !== fe) return e;
	var n = /* @__PURE__ */ new Map(), r = re(e), i = /* @__PURE__ */ N(0), a = null, o = sr, s = (e) => {
		if (sr === o) return e();
		var t = B, n = sr;
		V(null), cr(o);
		var r = e();
		return V(t), cr(n), r;
	};
	return r && n.set("length", /* @__PURE__ */ N(e.length, a)), new Proxy(e, {
		defineProperty(e, t, r) {
			"value" in r && r.configurable !== !1 && r.enumerable !== !1 && r.writable !== !1 || ot();
			var i = n.get(t);
			return i === void 0 ? s(() => {
				var e = /* @__PURE__ */ N(r.value, a);
				return n.set(t, e), e;
			}) : P(i, r.value, !0), !0;
		},
		deleteProperty(e, t) {
			var r = n.get(t);
			if (r === void 0) {
				if (t in e) {
					let e = s(() => /* @__PURE__ */ N(S, a));
					n.set(t, e), un(i);
				}
			} else P(r, S), un(i);
			return !0;
		},
		get(t, r, i) {
			if (r === ke) return e;
			var o = n.get(r), c = r in t;
			if (o === void 0 && (!c || le(t, r)?.writable) && (o = s(() => /* @__PURE__ */ N(F(c ? t[r] : S), a)), n.set(r, o)), o !== void 0) {
				var l = q(o);
				return l === S ? void 0 : l;
			}
			return Reflect.get(t, r, i);
		},
		getOwnPropertyDescriptor(e, t) {
			this.has?.(e, t);
			var r = Reflect.getOwnPropertyDescriptor(e, t), i = n.get(t);
			if (i !== void 0) {
				var a = q(i);
				if (a === S) return;
				if (r && "value" in r) r.value = a;
				else return {
					enumerable: !0,
					configurable: !0,
					value: a,
					writable: !0
				};
			}
			return r;
		},
		has(e, t) {
			if (t === ke) return !0;
			var r = n.get(t), i = r !== void 0 && r.v !== S || Reflect.has(e, t);
			return (r !== void 0 || H !== null && (!i || le(e, t)?.writable)) && (r === void 0 && (r = s(() => /* @__PURE__ */ N(i ? F(e[t]) : S, a)), n.set(t, r)), q(r) === S) ? !1 : i;
		},
		set(e, t, o, c) {
			var l = n.get(t), u = t in e;
			if (r && t === "length") for (var d = o; d < l.v; d += 1) {
				var f = n.get(d + "");
				f === void 0 ? d in e && (f = s(() => /* @__PURE__ */ N(S, a)), n.set(d + "", f)) : P(f, S);
			}
			if (l === void 0) (!u || le(e, t)?.writable) && (l = s(() => /* @__PURE__ */ N(void 0, a)), P(l, F(o)), n.set(t, l));
			else {
				u = l.v !== S;
				var p = s(() => F(o));
				P(l, p);
			}
			var m = Reflect.getOwnPropertyDescriptor(e, t);
			if (m?.set && m.set.call(c, o), !u) {
				if (r && typeof t == "string") {
					var h = n.get("length"), g = Number(t);
					Number.isInteger(g) && g >= h.v && P(h, g + 1);
				}
				un(i);
			}
			return !0;
		},
		ownKeys(e) {
			q(i);
			var t = Reflect.ownKeys(e).filter((e) => {
				var t = n.get(e);
				return t === void 0 || t.v !== S;
			});
			for (var [r, a] of n) a.v !== S && !(r in e) && t.push(r);
			return t;
		},
		setPrototypeOf() {
			st();
		}
	});
}
var fn, pn, mn, hn;
function gn() {
	if (fn === void 0) {
		fn = window, pn = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, t = Node.prototype, n = Text.prototype;
		mn = le(t, "firstChild").get, hn = le(t, "nextSibling").get, me(e) && (e[Pe] = void 0, e[Ne] = null, e[Fe] = void 0, e.__e = void 0), me(n) && (n[Ie] = void 0);
	}
}
function I(e = "") {
	return document.createTextNode(e);
}
/*@__NO_SIDE_EFFECTS__*/
function L(e) {
	return mn.call(e);
}
/*@__NO_SIDE_EFFECTS__*/
function _n(e) {
	return hn.call(e);
}
function vn(e, t) {
	if (!E) return /* @__PURE__ */ L(e);
	var n = /* @__PURE__ */ L(D);
	if (n === null) n = D.appendChild(I());
	else if (t && n.nodeType !== 3) {
		var r = I();
		return n?.before(r), O(r), r;
	}
	return t && Tn(n), O(n), n;
}
function yn(e, t = !1) {
	if (!E) {
		var n = /* @__PURE__ */ L(e);
		return n instanceof Comment && n.data === "" ? /* @__PURE__ */ _n(n) : n;
	}
	if (t) {
		if (D?.nodeType !== 3) {
			var r = I();
			return D?.before(r), O(r), r;
		}
		Tn(D);
	}
	return D;
}
function bn(e, t = !1) {
	if (!E) return /* @__PURE__ */ L(e);
	var n = vn(e, t);
	return We(e), n;
}
function xn(e, t = 1, n = !1) {
	let r = E ? D : e;
	for (var i; t--;) i = r, r = /* @__PURE__ */ _n(r);
	if (!E) return r;
	if (n) {
		if (r?.nodeType !== 3) {
			var a = I();
			return r === null ? i?.after(a) : r.before(a), O(a), a;
		}
		Tn(r);
	}
	return O(r), r;
}
function Sn(e) {
	e.textContent = "";
}
function Cn() {
	return !1;
}
function wn(e, t, n) {
	return t == null || t === "http://www.w3.org/1999/xhtml" ? n ? document.createElement(e, { is: n }) : document.createElement(e) : n ? document.createElementNS(t, e, { is: n }) : document.createElementNS(t, e);
}
function Tn(e) {
	if (e.nodeValue.length < 65536) return;
	let t = e.nextSibling;
	for (; t !== null && t.nodeType === 3;) t.remove(), e.nodeValue += t.nodeValue, t = e.nextSibling;
}
function En(e) {
	var t = H;
	if (t === null) return B.f |= Oe, e;
	if (!(t.f & 32768) && !(t.f & 4)) throw e;
	Dn(e, t);
}
function Dn(e, t) {
	if (e === x) throw e;
	if (!(t !== null && t.f & 16384)) {
		for (; t !== null;) {
			if (t.f & 128 && !(t.f & 33570816)) {
				if (!(t.f & 32768)) throw e;
				try {
					t.b.error(e);
					return;
				} catch (t) {
					e = t;
				}
			}
			t = t.parent;
		}
		throw e;
	}
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/effects.js
function On(e) {
	H === null && (B === null && nt(e), tt()), $n && et(e);
}
function kn(e, t) {
	var n = t.last;
	n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function An(e, t) {
	var n = H;
	n !== null && n.f & 8192 && (e |= ve);
	var r = {
		ctx: k,
		deps: null,
		nodes: null,
		f: e | w | 512,
		first: null,
		fn: t,
		last: null,
		next: null,
		parent: n,
		b: n && n.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	j?.register_created_effect(r);
	var i = r;
	if (e & 4) Ut === null ? qt.ensure().schedule(r) : Ut.push(r);
	else if (t !== null) {
		try {
			gr(r);
		} catch (e) {
			throw z(r), e;
		}
		i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && !(i.f & 524288) && (i = i.first, e & 16 && e & 65536 && i !== null && (i.f |= Se));
	}
	if (i !== null && (i.parent = n, n !== null && kn(i, n), B !== null && B.f & 2 && !(e & 64))) {
		var a = B;
		(a.effects ??= []).push(i);
	}
	return r;
}
function jn() {
	return B !== null && !tr;
}
function Mn(e) {
	let t = An(8, null);
	return A(t, C), t.teardown = e, t;
}
function Nn(e) {
	On("$effect");
	var t = H.f;
	if (!B && t & 32 && k !== null && !k.i) {
		var n = k;
		(n.e ??= []).push(e);
	} else return Pn(e);
}
function Pn(e) {
	return An(4 | we, e);
}
function Fn(e) {
	qt.ensure();
	let t = An(64 | Ce, e);
	return () => {
		z(t);
	};
}
function In(e) {
	qt.ensure();
	let t = An(64 | Ce, e);
	return (e = {}) => new Promise((n) => {
		e.outro ? qn(t, () => {
			z(t), n(void 0);
		}) : (z(t), n(void 0));
	});
}
function Ln(e) {
	return An(4, e);
}
function Rn(e) {
	return An(De | Ce, e);
}
function zn(e, t = 0) {
	return An(8 | t, e);
}
function Bn(e, t = [], n = [], r = []) {
	Ct(r, t, n, (t) => {
		An(8, () => {
			e(...t.map(q));
		});
	});
}
function Vn(e, t = 0) {
	return An(16 | t, e);
}
function R(e) {
	return An(32 | Ce, e);
}
function Hn(e) {
	var t = e.teardown;
	if (t !== null) {
		let n = $n, r = B;
		er(!0), V(null);
		try {
			t.call(null);
		} catch (t) {
			Dn(t, e.parent);
		} finally {
			er(n), V(r);
		}
	}
}
function Un(e, t = !1) {
	var n = e.first;
	for (e.first = e.last = null; n !== null;) {
		let e = n.ac;
		e !== null && St(() => {
			e.abort(Le);
		});
		var r = n.next;
		n.f & 64 ? n.parent = null : z(n, t), n = r;
	}
}
function Wn(e) {
	for (var t = e.first; t !== null;) {
		var n = t.next;
		t.f & 32 || z(t), t = n;
	}
}
function z(e, t = !0) {
	var n = !1;
	(t || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (Gn(e.nodes.start, e.nodes.end), n = !0), e.f |= xe, Un(e, t && !n), hr(e, 0);
	var r = e.nodes && e.nodes.t;
	if (r !== null) for (let e of r) e.stop();
	Hn(e), e.f ^= xe, e.f |= ye;
	var i = e.parent;
	i !== null && i.first !== null && Kn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Gn(e, t) {
	for (; e !== null;) {
		var n = e === t ? null : /* @__PURE__ */ _n(e);
		e.remove(), e = n;
	}
}
function Kn(e) {
	var t = e.parent, n = e.prev, r = e.next;
	n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function qn(e, t, n = !0) {
	var r = [];
	e.f |= 256, Jn(e, r, !0);
	var i = () => {
		n && z(e), t && t();
	}, a = r.length;
	if (a > 0) {
		var o = () => --a || i();
		for (var s of r) s.out(o);
	} else i();
}
function Jn(e, t, n) {
	if (!(e.f & 8192)) {
		e.f ^= ve;
		var r = e.nodes && e.nodes.t;
		if (r !== null) for (let e of r) (e.is_global || n) && t.push(e);
		for (var i = e.first; i !== null;) {
			var a = i.next;
			if (!(i.f & 64)) {
				var o = !!(i.f & 65536) || !!(i.f & 32) && !!(e.f & 16);
				Jn(i, t, o ? n : !1);
			}
			i = a;
		}
	}
}
function Yn(e) {
	e.f &= -257, Xn(e, !0);
}
function Xn(e, t) {
	if (!(e.f & 256) && e.f & 8192) {
		e.f ^= ve, e.f & 1024 || (A(e, w), qt.ensure().schedule(e));
		for (var n = e.first; n !== null;) {
			var r = n.next, i = !!(n.f & 65536) || !!(n.f & 32);
			Xn(n, i ? t : !1), n = r;
		}
		var a = e.nodes && e.nodes.t;
		if (a !== null) for (let e of a) (e.is_global || t) && e.in();
	}
}
function Zn(e, t) {
	if (e.nodes) for (var n = e.nodes.start, r = e.nodes.end; n !== null;) {
		var i = n === r ? null : /* @__PURE__ */ _n(n);
		t.append(n), n = i;
	}
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/legacy.js
var Qn = null, $n = !1;
function er(e) {
	$n = e;
}
var B = null, tr = !1;
function V(e) {
	B = e;
}
var H = null;
function U(e) {
	H = e;
}
var nr = null;
function rr(e) {
	B !== null && (B.f & 2097152 || B.f & 2) && (nr ??= /* @__PURE__ */ new Set()).add(e);
}
var W = null, G = 0, K = null;
function ir(e) {
	K = e;
}
var ar = 1, or = 0, sr = or;
function cr(e) {
	sr = e;
}
function lr() {
	return ++ar;
}
function ur(e) {
	var t = e.f;
	if (t & 2048) return !0;
	if (t & 4096) {
		for (var n = e.deps, r = n.length, i = 0; i < r; i++) {
			var a = n[i];
			if (ur(a) && Pt(a), a.wv > e.wv) return !0;
		}
		t & 512 && zt === null && A(e, C);
	}
	return !1;
}
function dr(e, t, n = !0) {
	var r = e.reactions;
	if (r !== null && !(nr !== null && nr.has(e))) for (var i = 0; i < r.length; i++) {
		var a = r[i];
		a.f & 2 ? dr(a, t, !1) : t === a && (n ? A(a, w) : a.f & 1024 && A(a, T), Zt(a));
	}
}
function fr(e) {
	var t = W, n = G, r = K, i = B, a = nr, o = k, s = tr, c = sr, l = e.f;
	W = null, G = 0, K = null, B = l & 96 ? null : e, nr = null, ut(e.ctx), tr = !1, sr = ++or, e.ac !== null && (St(() => {
		e.ac.abort(Le);
	}), e.ac = null);
	try {
		e.f |= Ee;
		var u = e.fn, d = u();
		e.f |= be;
		var f = pr(e);
		if (mt() && K !== null && !tr && f !== null && !(e.f & 6146)) for (var p = 0; p < K.length; p++) dr(K[p], e);
		if (i !== null && i !== e) {
			if (or++, i.deps !== null) for (let e = 0; e < n; e += 1) i.deps[e].rv = or;
			if (t !== null) for (let e of t) e.rv = or;
			K !== null && (r === null ? r = K : r.push(...K));
		}
		return e.f & 8388608 && (e.f ^= Oe), d;
	} catch (t) {
		return pr(e), En(t);
	} finally {
		e.f ^= Ee, W = t, G = n, K = r, B = i, nr = a, ut(o), tr = s, sr = c;
	}
}
function pr(e) {
	var t = e.deps, n = j?.is_fork;
	if (W !== null) {
		var r;
		if (n || hr(e, G), t !== null && G > 0) for (t.length = G + W.length, r = 0; r < W.length; r++) t[G + r] = W[r];
		else e.deps = t = W;
		if (jn() && e.f & 512) for (r = G; r < t.length; r++) (t[r].reactions ??= []).push(e);
	} else !n && t !== null && G < t.length && (hr(e, G), t.length = G);
	return t;
}
function mr(e, t) {
	let n = t.reactions;
	if (n !== null) {
		var r = ie.call(n, e);
		if (r !== -1) {
			var i = n.length - 1;
			i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
		}
	}
	if (n === null && t.f & 2 && (W === null || !ae.call(W, t))) {
		var a = t;
		a.f & 512 && (a.f ^= 512), a.v !== S && bt(a), a.ac !== null && St(() => {
			a.ac.abort(Le), a.ac = null, A(a, w);
		}), Ft(a), hr(a, 0);
	}
}
function hr(e, t) {
	var n = e.deps;
	if (n !== null) for (var r = t; r < n.length; r++) mr(e, n[r]);
}
function gr(e) {
	var t = e.f;
	if (!(t & 16384)) {
		A(e, C);
		var n = H;
		H = e;
		try {
			t & 16777232 ? Wn(e) : Un(e), Hn(e);
			var r = fr(e);
			e.teardown = typeof r == "function" ? r : null, e.wv = ar;
		} finally {
			H = n;
		}
	}
}
function q(e) {
	var t = !!(e.f & 2);
	if (Qn?.add(e), B !== null && !tr && !(H !== null && H.f & 16384) && (nr === null || !nr.has(e))) {
		var n = B.deps;
		if (B.f & 2097152) e.rv < or && (e.rv = or, W === null && n !== null && n[G] === e ? G++ : W === null ? W = [e] : W.push(e));
		else {
			B.deps ??= [], ae.call(B.deps, e) || B.deps.push(e);
			var r = e.reactions;
			r === null ? e.reactions = [B] : ae.call(r, B) || r.push(B);
		}
	}
	if ($n && tn.has(e)) return tn.get(e);
	if (t) {
		var i = e;
		if ($n) {
			var a = i.v;
			return (!(i.f & 1024) && i.reactions !== null || vr(i)) && (a = Nt(i)), tn.set(i, a), a;
		}
		var o = !(i.f & 512) && !tr && B !== null && !!(B.f & 512), s = (i.f & be) === 0;
		ur(i) && (o && (i.f |= 512), Pt(i)), o && !s && (It(i), _r(i));
	}
	if (zt?.has(e)) return zt.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function _r(e) {
	if (e.f |= 512, e.deps !== null) for (let n of e.deps) {
		var t = n.reactions;
		t === null ? n.reactions = [e] : ae.call(t, e) || t.push(e), n.f & 2 && !(n.f & 512) && (It(n), _r(n));
	}
}
function vr(e) {
	if (e.v === S) return !0;
	if (e.deps === null) return !1;
	for (let t of e.deps) if (tn.has(t) || t.f & 2 && vr(t)) return !0;
	return !1;
}
function J(e) {
	var t = tr;
	try {
		return tr = !0, e();
	} finally {
		tr = t;
	}
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/elements/events.js
var yr = Symbol("events"), br = /* @__PURE__ */ new Set(), xr = /* @__PURE__ */ new Set();
function Sr(e, t, n) {
	(t[yr] ??= {})[e] = n;
}
function Cr(e) {
	for (var t = 0; t < e.length; t++) br.add(e[t]);
	for (var n of xr) n(e);
}
var wr = null, Tr = !1;
function Er(e) {
	var t = this, n = t.ownerDocument, r = e.type, i = e.composedPath?.() || [], a = i[0] || e.target;
	wr = e, Tr || (Tr = !0, setTimeout(() => {
		Tr = !1, wr = null;
	}));
	var o = 0, s = wr === e && e[yr];
	if (s) {
		var c = i.indexOf(s);
		if (c !== -1 && (t === document || t === window)) {
			e[yr] = t;
			return;
		}
		var l = i.indexOf(t);
		if (l === -1) return;
		c <= l && (o = c);
	}
	if (a = i[o] || e.target, a !== t) {
		ce(e, "currentTarget", {
			configurable: !0,
			get() {
				return a || n;
			}
		});
		var u = B, d = H;
		V(null), U(null);
		try {
			for (var f, p = []; a !== null && a !== t;) {
				try {
					var m = a[yr]?.[r];
					m == null || a.disabled && e.target !== a || m.call(a, e);
				} catch (e) {
					f ? p.push(e) : f = e;
				}
				if (e.cancelBubble) break;
				o++, a = o < i.length ? i[o] : null;
			}
			if (f) {
				for (let e of p) queueMicrotask(() => {
					throw e;
				});
				throw f;
			}
		} finally {
			e[yr] = t, delete e.currentTarget, V(u), U(d);
		}
	}
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/reconciler.js
var Dr = globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", { createHTML: (e) => e });
function Or(e) {
	return Dr?.createHTML(e) ?? e;
}
function kr(e) {
	var t = wn("template");
	return t.innerHTML = Or(e.replaceAll("<!>", "<!---->")), t.content;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/template.js
function Ar(e, t) {
	var n = H;
	n.nodes === null && (n.nodes = {
		start: e,
		end: t,
		a: null,
		t: null
	});
}
/*#__NO_SIDE_EFFECTS__*/
function jr(e, t) {
	var n = !!(t & 1), r = !!(t & 2), i, a = !e.startsWith("<!>");
	return () => {
		if (E) return Ar(D, null), D;
		i === void 0 && (i = kr(a ? e : "<!>" + e), n || (i = /* @__PURE__ */ L(i)));
		var t = r || pn ? document.importNode(i, !0) : i.cloneNode(!0);
		if (n) {
			var o = /* @__PURE__ */ L(t), s = t.lastChild;
			Ar(o, s);
		} else Ar(t, t);
		return t;
	};
}
function Mr() {
	if (E) return Ar(D, null), D;
	var e = document.createDocumentFragment(), t = document.createComment(""), n = I();
	return e.append(t, n), Ar(t, n), e;
}
function Y(e, t) {
	if (E) {
		var n = H;
		n.f & 32768 && n.nodes.end !== null || (n.nodes.end = D), Ue();
	} else e !== null && e.before(t);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var Nr = ["touchstart", "touchmove"];
function Pr(e) {
	return Nr.includes(e);
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/reactivity/create-subscriber.js
function Fr(e) {
	let t = 0, n = rn(0), r;
	return () => {
		jn() && (q(n), zn(() => (t === 0 && (r = J(() => e(() => un(n)))), t += 1, () => {
			_t(() => {
				--t, t === 0 && (r?.(), r = void 0, un(n));
			});
		})));
	};
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var Ir = Se | Ce;
function Lr(e, t, n, r) {
	new Rr(e, t, n, r);
}
var Rr = class {
	parent;
	is_pending = !1;
	transform_error;
	#e;
	#t = E ? D : null;
	#n;
	#r;
	#i;
	#a = null;
	#o = null;
	#s = null;
	#c = null;
	#l = 0;
	#u = 0;
	#d = !1;
	#f = /* @__PURE__ */ new Set();
	#p = /* @__PURE__ */ new Set();
	#m = null;
	#h = Fr(() => (this.#m = rn(this.#l), () => {
		this.#m = null;
	}));
	constructor(e, t, n, r) {
		this.#e = e, this.#n = t, this.#r = (e) => {
			var t = H;
			t.b = this, t.f |= 128, n(e);
		}, this.parent = H.b, this.transform_error = r ?? this.parent?.transform_error ?? ((e) => e), this.#i = Vn(() => {
			if (E) {
				let e = qe(this.#t);
				Ue();
				let t = e === "[!";
				if (e.startsWith("[?")) {
					let t = JSON.parse(e.slice(2));
					this.#_(t);
				} else t ? this.#b() : this.#g();
			} else this.#x();
		}, Ir), E && (this.#e = D);
	}
	#g() {
		try {
			this.#a = R(() => this.#r(this.#e));
		} catch (e) {
			this.error(e);
		}
	}
	#_(e) {
		let t = this.#n.failed, { reset: n, invoke_onerror: r } = this.#v(e);
		_t(r), t && (this.#s = R(() => {
			t(this.#e, () => e, () => n);
		}));
	}
	#v(e) {
		var t = !1, n = !1;
		let r = () => {
			this.#y() || (t ? Ve() : (t = !0, n && lt(), this.#s !== null && qn(this.#s, () => {
				this.#s = null;
			}), this.#C(() => {
				this.#x();
			})));
		};
		return {
			reset: r,
			invoke_onerror: () => {
				if (!this.#y()) try {
					n = !0, this.#n.onerror?.(e, r), n = !1;
				} catch (e) {
					Dn(e, this.#i && this.#i.parent);
				}
			}
		};
	}
	#y() {
		return (this.#i.f & (ye | xe)) !== 0;
	}
	#b() {
		let e = this.#n.pending;
		e && (this.is_pending = !0, this.#o = R(() => e(this.#e)), _t(() => {
			if (!this.#y()) {
				var e = this.#c = document.createDocumentFragment(), t = I(), n = !1;
				e.append(t), this.#a = this.#C(() => {
					try {
						return R(() => this.#r(t));
					} catch (e) {
						try {
							this.error(e), n = !0;
						} catch (e) {
							Dn(e, this.#i.parent);
						}
						return null;
					}
				}), this.#a === null ? (this.#c = null, n && this.#S(j)) : this.#u === 0 && (this.#e.before(e), this.#c = null, qn(this.#o, () => {
					this.#o = null;
				}), this.#S(j));
			}
		}));
	}
	#x() {
		try {
			if (this.is_pending = this.has_pending_snippet(), this.#u = 0, this.#l = 0, this.#a = R(() => {
				this.#r(this.#e);
			}), this.#u > 0) {
				var e = this.#c = document.createDocumentFragment();
				Zn(this.#a, e);
				let t = this.#n.pending;
				this.#o = R(() => t(this.#e));
			} else this.#S(j);
		} catch (e) {
			this.error(e);
		}
	}
	#S(e) {
		this.is_pending = !1, e.transfer_effects(this.#f, this.#p);
	}
	defer_effect(e) {
		xt(e, this.#f, this.#p);
	}
	is_rendered() {
		return !this.is_pending && (!this.parent || this.parent.is_rendered());
	}
	has_pending_snippet() {
		return !!this.#n.pending;
	}
	#C(e) {
		var t = H, n = B, r = k;
		U(this.#i), V(this.#i), ut(this.#i.ctx);
		try {
			return qt.ensure(), e();
		} finally {
			U(t), V(n), ut(r);
		}
	}
	#w(e, t) {
		this.has_pending_snippet() ? (this.#u += e, this.#u === 0 && (this.#S(t), this.#o && qn(this.#o, () => {
			this.#o = null;
		}), this.#c &&= (this.#e.before(this.#c), null))) : this.parent && this.parent.#w(e, t);
	}
	update_pending_count(e, t) {
		this.#w(e, t), this.#l += e, !(!this.#m || this.#d) && (this.#d = !0, _t(() => {
			this.#d = !1, this.#m && cn(this.#m, this.#l);
		}));
	}
	get_effect_pending() {
		return this.#h(), q(this.#m);
	}
	error(e) {
		if (e === x || !this.#n.onerror && !this.#n.failed) throw e;
		j?.is_fork ? (this.#a && j.skip_effect(this.#a), this.#o && j.skip_effect(this.#o), this.#s && j.skip_effect(this.#s), j.oncommit(() => {
			this.#y() || this.#T(e);
		})) : this.#T(e);
	}
	#T(e) {
		this.#a &&= (z(this.#a), null), this.#o &&= (z(this.#o), null), this.#s &&= (z(this.#s), null), E && (O(this.#t), Ge(), O(Ke()));
		let t = this.#n.failed, n = (e) => {
			if (this.#y()) return;
			let { reset: n, invoke_onerror: r } = this.#v(e);
			r(), t && !this.#y() && (this.#s = this.#C(() => {
				try {
					return R(() => {
						var r = H;
						r.b = this, r.f |= 128, t(this.#e, () => e, () => n);
					});
				} catch (e) {
					return Dn(e, this.#i.parent), null;
				}
			}));
		};
		_t(() => {
			if (!this.#y()) {
				var t;
				try {
					t = this.transform_error(e);
				} catch (e) {
					Dn(e, this.#i && this.#i.parent);
					return;
				}
				typeof t == "object" && t && typeof t.then == "function" ? t.then(n, (e) => Dn(e, this.#i && this.#i.parent)) : n(t);
			}
		});
	}
};
function zr(e, t) {
	var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
	n !== (e[Ie] ??= e.nodeValue) && (e[Ie] = n, e.nodeValue = `${n}`);
}
function Br(e, t) {
	return Ur(e, t);
}
function Vr(e, t) {
	gn(), t.intro = t.intro ?? !1;
	let n = t.target, r = E, i = D;
	try {
		for (var a = /* @__PURE__ */ L(n); a && (a.nodeType !== 8 || a.data !== "[");) a = /* @__PURE__ */ _n(a);
		if (!a) throw x;
		He(!0), O(a);
		let r = Ur(e, {
			...t,
			anchor: a
		});
		return He(!1), r;
	} catch (r) {
		if (r instanceof Error && r.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw r;
		return r !== x && console.warn("Failed to hydrate: ", r), t.recover === !1 && it(), gn(), Sn(n), He(!1), Br(e, t);
	} finally {
		He(r), O(i);
	}
}
var Hr = /* @__PURE__ */ new Map();
function Ur(e, { target: t, anchor: n, props: r = {}, events: i, context: a, intro: o = !0, transformError: s }) {
	gn();
	var c = void 0, l = In(() => {
		var o = n ?? t.appendChild(I());
		Lr(o, { pending: () => {} }, (t) => {
			dt({});
			var n = k;
			if (a && (n.c = a), i && (r.$$events = i), E && Ar(t, null), c = e(t, r) || pt(), E && (H.nodes.end = D, D === null || D.nodeType !== 8 || D.data !== "]")) throw Be(), x;
			ft();
		}, s);
		var l = /* @__PURE__ */ new Set(), u = (e) => {
			for (var n = 0; n < e.length; n++) {
				var r = e[n];
				if (!l.has(r)) {
					l.add(r);
					var i = Pr(r);
					for (let e of [t, document]) {
						var a = Hr.get(e);
						a === void 0 && (a = /* @__PURE__ */ new Map(), Hr.set(e, a));
						var o = a.get(r);
						o === void 0 ? (e.addEventListener(r, Er, { passive: i }), a.set(r, 1)) : a.set(r, o + 1);
					}
				}
			}
		};
		return u(oe(br)), xr.add(u), () => {
			for (var e of l) for (let n of [t, document]) {
				var r = Hr.get(n), i = r.get(e);
				--i == 0 ? (n.removeEventListener(e, Er), r.delete(e), r.size === 0 && Hr.delete(n)) : r.set(e, i);
			}
			xr.delete(u), o !== n && o.parentNode?.removeChild(o);
		};
	});
	return Wr.set(c, l), c;
}
var Wr = /* @__PURE__ */ new WeakMap();
function Gr(e, t) {
	let n = Wr.get(e);
	return n ? (Wr.delete(e), n(t)) : Promise.resolve();
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/blocks/branches.js
var Kr = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, t = !0) {
		this.anchor = e, this.#i = t;
	}
	#a = (e) => {
		if (this.#e.has(e)) {
			var t = this.#e.get(e), n = this.#t.get(t);
			if (n) Yn(n), this.#r.delete(t);
			else {
				var r = this.#n.get(t);
				r && (Yn(r.effect), this.#t.set(t, r.effect), this.#n.delete(t), r.fragment.lastChild.remove(), this.anchor.before(r.fragment), n = r.effect);
			}
			for (let [t, n] of this.#e) {
				if (this.#e.delete(t), t === e) break;
				let r = this.#n.get(n);
				r && (z(r.effect), this.#n.delete(n));
			}
			for (let [e, r] of this.#t) {
				if (e === t || this.#r.has(e)) continue;
				let i = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var t = document.createDocumentFragment();
						Zn(r, t), t.append(I()), this.#n.set(e, {
							effect: r,
							fragment: t
						});
					} else z(r);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !n ? (this.#r.add(e), qn(r, i, !1)) : i();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let t = Array.from(this.#e.values());
		for (let [e, n] of this.#n) t.includes(e) || (z(n.effect), this.#n.delete(e));
	};
	ensure(e, t) {
		var n = j, r = Cn();
		if (t && !this.#t.has(e) && !this.#n.has(e)) {
			if (r) {
				var i = document.createDocumentFragment(), a = I();
				i.append(a), this.#n.set(e, {
					effect: R(() => t(a)),
					fragment: i
				});
			} else this.#t.set(e, R(() => t(this.anchor)));
		}
		if (this.#e.set(n, e), r) {
			for (let [t, r] of this.#t) t === e ? n.unskip_effect(r) : n.skip_effect(r);
			for (let [t, r] of this.#n) t === e ? n.unskip_effect(r.effect) : n.skip_effect(r.effect);
			n.oncommit(this.#a), n.ondiscard(this.#o);
		} else E && (this.anchor = D), this.#a(n);
	}
};
function qr(e) {
	k === null && Ze("onMount"), Nn(() => {
		let t = J(e);
		if (typeof t == "function") return t;
	});
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/blocks/if.js
function Jr(e, t, n = !1) {
	var r;
	E && (r = D, Ue());
	var i = new Kr(e), a = n ? Se : 0;
	function o(e, t) {
		if (E) {
			var n = qe(r);
			if (e !== parseInt(n.substring(1))) {
				var a = Ke();
				O(a), i.anchor = a, He(!1), i.ensure(e, t), He(!0);
				return;
			}
		}
		i.ensure(e, t);
	}
	Vn(() => {
		var e = !1;
		t((t, n = 0) => {
			e = !0, o(n, t);
		}), e || o(-1, null);
	}, a);
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/blocks/each.js
function Yr(e, t, n) {
	for (var r = [], i = t.length, a, o = t.length, s = 0; s < i; s++) {
		let n = t[s];
		qn(n, () => {
			if (a) {
				if (a.pending.delete(n), a.done.add(n), a.pending.size === 0) {
					var t = e.outrogroups;
					Xr(e, oe(a.done)), t.delete(a), t.size === 0 && (e.outrogroups = null);
				}
			} else --o;
		}, !1);
	}
	if (o === 0) {
		var c = r.length === 0 && n !== null && e.pending.size === 0;
		if (c) {
			var l = n, u = l.parentNode;
			Sn(u), u.append(l), e.items.clear();
		}
		Xr(e, t, !c);
	} else a = {
		pending: new Set(t),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(a);
}
function Xr(e, t, n = !0) {
	var r;
	if (e.pending.size > 0) {
		r = /* @__PURE__ */ new Set();
		for (let t of e.pending.values()) for (let n of t) r.add(e.items.get(n).e);
	}
	for (var i = 0; i < t.length; i++) {
		var a = t[i];
		r?.has(a) ? (a.f |= Te, Zn(a, document.createDocumentFragment())) : z(t[i], n);
	}
}
var Zr;
function Qr(e, t, n, r, i, a = null) {
	var o = e, s = /* @__PURE__ */ new Map();
	if (t & 4) {
		var c = e;
		o = E ? O(/* @__PURE__ */ L(c)) : c.appendChild(I());
	}
	E && Ue();
	var l = null, u = /* @__PURE__ */ jt(() => {
		var e = n();
		return re(e) ? e : e == null ? [] : oe(e);
	}), d = /* @__PURE__ */ new Map(), f = !0;
	function p(e) {
		if (!(h.effect.f & 16384)) {
			h.pending.delete(e);
			var n = q(u);
			h.fallback = l, ei(h, n, o, t, r), l !== null && (n.length === 0 ? l.f & 33554432 ? (l.f ^= Te, ni(l, null, o)) : Yn(l) : qn(l, () => {
				l = null;
			}));
		}
	}
	function m(e) {
		h.pending.delete(e);
	}
	var h = {
		effect: Vn(() => {
			var e = q(u), c = e.length;
			let h = !1;
			E && qe(o) === "[!" != (c === 0) && (o = Ke(), O(o), He(!1), h = !0);
			for (var g = /* @__PURE__ */ new Set(), _ = j, v = Cn(), y = 0; y < c; y += 1) {
				E && D.nodeType === 8 && D.data === "]" && (o = D, h = !0, He(!1));
				var b = e[y], x = r(b, y), S = f ? null : s.get(x);
				S ? (S.v && cn(S.v, b), S.i && cn(S.i, y), v && _.unskip_effect(S.e)) : (S = ti(s, f ? o : Zr ??= I(), b, x, y, i, t, n), f || (S.e.f |= Te), s.set(x, S)), g.add(x);
			}
			if (c === 0 && a && !l && (f ? l = R(() => a(o)) : (l = R(() => a(Zr ??= I())), l.f |= Te)), c > g.size && $e("", "", ""), E && c > 0 && O(Ke()), !f) {
				if (d.set(_, g), v) {
					for (let [e, t] of s) g.has(e) || _.skip_effect(t.e);
					_.oncommit(p), _.ondiscard(m);
				} else p(_);
			}
			h && He(!0), q(u);
		}),
		flags: t,
		items: s,
		pending: d,
		outrogroups: null,
		fallback: l
	};
	f = !1, E && (o = D);
}
function $r(e) {
	for (; e !== null && !(e.f & 32);) e = e.next;
	return e;
}
function ei(e, t, n, r, i) {
	var a = !!(r & 8), o = t.length, s = e.items, c = $r(e.effect.first), l, u = null, d, f = [], p = [], m, h, g, _;
	if (a) for (_ = 0; _ < o; _ += 1) m = t[_], h = i(m, _), g = s.get(h).e, g.f & 33554432 || (g.nodes?.a?.measure(), (d ??= /* @__PURE__ */ new Set()).add(g));
	for (_ = 0; _ < o; _ += 1) {
		if (m = t[_], h = i(m, _), g = s.get(h).e, e.outrogroups !== null) for (let t of e.outrogroups) t.pending.delete(g), t.done.delete(g);
		if (g.f & 8192 && (Yn(g), a && (g.nodes?.a?.unfix(), (d ??= /* @__PURE__ */ new Set()).delete(g))), g.f & 33554432) {
			if (g.f ^= Te, g === c) ni(g, null, n);
			else {
				var v = u ? u.next : c;
				g === e.effect.last && (e.effect.last = g.prev), g.prev && (g.prev.next = g.next), g.next && (g.next.prev = g.prev), ri(e, u, g), ri(e, g, v), ni(g, v, n), u = g, f = [], p = [], c = $r(u.next);
				continue;
			}
		}
		if (g !== c) {
			if (l !== void 0 && l.has(g)) {
				if (f.length < p.length) {
					var y = p[0], b;
					u = y.prev;
					var x = f[0], S = f[f.length - 1];
					for (b = 0; b < f.length; b += 1) ni(f[b], y, n);
					for (b = 0; b < p.length; b += 1) l.delete(p[b]);
					ri(e, x.prev, S.next), ri(e, u, x), ri(e, S, y), c = y, u = S, --_, f = [], p = [];
				} else l.delete(g), ni(g, c, n), ri(e, g.prev, g.next), ri(e, g, u === null ? e.effect.first : u.next), ri(e, u, g), u = g;
				continue;
			}
			for (f = [], p = []; c !== null && c !== g;) (l ??= /* @__PURE__ */ new Set()).add(c), p.push(c), c = $r(c.next);
			if (c === null) continue;
		}
		g.f & 33554432 || f.push(g), u = g, c = $r(g.next);
	}
	if (e.outrogroups !== null) {
		for (let t of e.outrogroups) t.pending.size === 0 && (Xr(e, oe(t.done)), e.outrogroups?.delete(t));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (c !== null || l !== void 0) {
		var ee = [];
		if (l !== void 0) for (g of l) g.f & 8192 || ee.push(g);
		for (; c !== null;) !(c.f & 8192) && c !== e.fallback && ee.push(c), c = $r(c.next);
		var te = ee.length;
		if (te > 0) {
			var ne = r & 4 && o === 0 ? n : null;
			if (a) {
				for (_ = 0; _ < te; _ += 1) ee[_].nodes?.a?.measure();
				for (_ = 0; _ < te; _ += 1) ee[_].nodes?.a?.fix();
			}
			Yr(e, ee, ne);
		}
	}
	a && _t(() => {
		if (d !== void 0) for (g of d) g.nodes?.a?.apply();
	});
}
function ti(e, t, n, r, i, a, o, s) {
	var c = o & 1 ? o & 16 ? rn(n) : /* @__PURE__ */ an(n, !1, !1) : null, l = o & 2 ? rn(i) : null;
	return {
		v: c,
		i: l,
		e: R(() => (a(t, c ?? n, l ?? i, s), () => {
			e.delete(r);
		}))
	};
}
function ni(e, t, n) {
	if (e.nodes) for (var r = e.nodes.start, i = e.nodes.end, a = t && !(t.f & 33554432) ? t.nodes.start : n; r !== null;) {
		var o = /* @__PURE__ */ _n(r);
		if (a.before(r), r === i) return;
		r = o;
	}
}
function ri(e, t, n) {
	t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function ii(e, t, n = !1, r = !1, i = !1, a = !1) {
	var o = e, s = "";
	if (n) {
		var c = e;
		E && (o = O(/* @__PURE__ */ L(c)));
	}
	Bn(() => {
		var e = H;
		if (s === (s = t() ?? "")) E && Ue();
		else if (n && !E) e.nodes = null, c.innerHTML = s, s !== "" && Ar(/* @__PURE__ */ L(c), c.lastChild);
		else if (e.nodes !== null && (Gn(e.nodes.start, e.nodes.end), e.nodes = null), s !== "") {
			if (E) {
				for (var a = D.data, l = Ue(), u = l; l !== null && (l.nodeType !== 8 || l.data !== "");) u = l, l = /* @__PURE__ */ _n(l);
				if (l === null) throw Be(), x;
				Ar(D, u), o = O(l);
			} else {
				var d = wn(r ? "svg" : i ? "math" : "template", r ? te : i ? ne : void 0);
				d.innerHTML = s;
				var f = r || i ? d : d.content;
				if (Ar(/* @__PURE__ */ L(f), f.lastChild), r || i) for (; /* @__PURE__ */ L(f);) o.before(/* @__PURE__ */ L(f));
				else o.before(f);
			}
		}
	});
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/css.js
function ai(e, t) {
	Ln(() => {
		e = H?.parent?.nodes?.start ?? e;
		var n = e.getRootNode(), r = n.host ? n : n.head ?? n.ownerDocument.head;
		if (!r.querySelector("#" + t.hash)) {
			let e = wn("style");
			e.id = t.hash, e.textContent = t.code, r.appendChild(e);
		}
	});
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/shared/attributes.js
var oi = [..." 	\n\r\f\xA0\v﻿"];
function si(e, t, n) {
	var r = e == null ? "" : "" + e;
	if (t && (r = r ? r + " " + t : t), n) {
		for (var i of Object.keys(n)) if (n[i]) r = r ? r + " " + i : i;
		else if (r.length) for (var a = i.length, o = 0; (o = r.indexOf(i, o)) >= 0;) {
			var s = o + a;
			(o === 0 || oi.includes(r[o - 1])) && (s === r.length || oi.includes(r[s])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(s + 1) : o = s;
		}
	}
	return r === "" ? null : r;
}
function ci(e, t = !1) {
	var n = t ? " !important;" : ";", r = "";
	for (var i of Object.keys(e)) {
		var a = e[i];
		a != null && a !== "" && (r += " " + i + ": " + a + n);
	}
	return r;
}
function li(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function ui(e, t) {
	if (t) {
		var n = "", r, i;
		if (Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, e) {
			e = String(e).replaceAll(/\/\*.*?\*\//g, "").trim();
			var a = !1, o = 0, s = !1, c = [];
			r && c.push(...Object.keys(r).map(li)), i && c.push(...Object.keys(i).map(li));
			var l = 0, u = -1;
			let t = e.length;
			for (var d = 0; d < t; d++) {
				var f = e[d];
				if (s ? f === "/" && e[d - 1] === "*" && (s = !1) : a ? a === f && (a = !1) : f === "/" && e[d + 1] === "*" ? s = !0 : f === "\"" || f === "'" ? a = f : f === "(" ? o++ : f === ")" && o--, !s && a === !1 && o === 0) {
					if (f === ":" && u === -1) u = d;
					else if (f === ";" || d === t - 1) {
						if (u !== -1) {
							var p = li(e.substring(l, u).trim());
							if (!c.includes(p)) {
								f !== ";" && d++;
								var m = e.substring(l, d).trim();
								n += " " + m + ";";
							}
						}
						l = d + 1, u = -1;
					}
				}
			}
		}
		return r && (n += ci(r)), i && (n += ci(i, !0)), n = n.trim(), n === "" ? null : n;
	}
	return e == null ? null : String(e);
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/elements/class.js
function di(e, t, n, r, i, a) {
	var o = e[Pe];
	if (E || o !== n || o === void 0) {
		var s = si(n, r, a);
		E && s === e.getAttribute("class") || (s == null ? e.removeAttribute("class") : t ? e.className = s : e.setAttribute("class", s)), e[Pe] = n;
	} else if (a && i !== a) for (var c in a) {
		var l = !!a[c];
		(i == null || l !== !!i[c]) && e.classList.toggle(c, l);
	}
	return a;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/elements/style.js
function fi(e, t = {}, n, r) {
	for (var i in n) {
		var a = n[i];
		t[i] !== a && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, a, r));
	}
}
function pi(e, t, n, r) {
	var i = e[Fe];
	if (E || i !== t) {
		var a = ui(t, r);
		E && a === e.getAttribute("style") || (a == null ? e.removeAttribute("style") : e.style.cssText = a), e[Fe] = t;
	} else r && (Array.isArray(r) ? (fi(e, n?.[0], r[0]), fi(e, n?.[1], r[1], "important")) : fi(e, n, r));
	return r;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/elements/attributes.js
var mi = Symbol("is custom element"), hi = Symbol("is html"), gi = Re ? "link" : "LINK";
function _i(e, t, n, r) {
	var i = yi(e);
	E && (i[t] = e.getAttribute(t), t === "src" || t === "srcset" || t === "href" && e.nodeName === gi) || i[t] !== (i[t] = n) && (t === "loading" && (e[Me] = n), n == null ? e.removeAttribute(t) : typeof n != "string" && xi(e).has(t) ? e[t] = n : e.setAttribute(t, n));
}
function vi(e, t, n) {
	var r = B, i = H;
	let a = E;
	E && He(!1), V(null), U(null);
	try {
		t !== "style" && (bi.has(e.getAttribute("is") || e.nodeName) || !customElements || customElements.get(e.getAttribute("is") || e.nodeName.toLowerCase()) ? xi(e).has(t) : n && typeof n == "object") ? e[t] = n : _i(e, t, n == null ? n : String(n));
	} finally {
		V(r), U(i), a && He(!0);
	}
}
function yi(e) {
	return e[Ne] ??= {
		[mi]: e.nodeName.includes("-"),
		[hi]: e.namespaceURI === ee
	};
}
var bi = /* @__PURE__ */ new Map();
function xi(e) {
	var t = e.getAttribute("is") || e.nodeName, n = bi.get(t);
	if (n) return n;
	bi.set(t, n = /* @__PURE__ */ new Set());
	for (var r, i = e, a = Element.prototype; a !== i;) {
		for (var o in r = ue(i), r) r[o].set && o !== "innerHTML" && o !== "textContent" && o !== "innerText" && n.add(o);
		i = pe(i);
	}
	return n;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function Si(e, t) {
	return e === t || e?.[ke] === t;
}
function Ci(e = pt(), t, n, r) {
	var i = k.r, a = H;
	return Ln(() => {
		var o, s;
		return zn(() => {
			o = s, s = r?.() || [], J(() => {
				Si(n(...s), e) || (t(e, ...s), o && Si(n(...o), e) && t(null, ...o));
			});
		}), () => {
			let r = a;
			for (; r !== i && r.parent !== null && r.parent.f & 33554432;) r = r.parent;
			let o = () => {
				s && Si(n(...s), e) && t(null, ...s);
			}, c = r.teardown;
			r.teardown = () => {
				o(), c?.();
			};
		};
	}), e;
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/store.js
var wi = !1;
function Ti(e) {
	var t = wi;
	try {
		return wi = !1, [e(), wi];
	} finally {
		wi = t;
	}
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/internal/client/reactivity/props.js
function Ei(e, t, n, r) {
	var i = !0, a = !!(n & 8), o = !!(n & 16), s = r, c = !0, l = void 0, u = () => o && i ? (l ??= /* @__PURE__ */ Dt(r), q(l)) : (c && (c = !1, s = o ? J(r) : r), s);
	let d;
	if (a) {
		var f = ke in e || je in e;
		d = le(e, t)?.set ?? (f && t in e ? (n) => e[t] = n : void 0);
	}
	var p, m = !1;
	a ? [p, m] = Ti(() => e[t]) : p = e[t], p === void 0 && r !== void 0 && (p = u(), d && (i && at(t), d(p)));
	var h = i ? () => {
		var n = e[t];
		return n === void 0 ? u() : (c = !0, n);
	} : () => {
		var n = e[t];
		return n !== void 0 && (s = void 0), n === void 0 ? s : n;
	};
	if (i && !(n & 4)) return h;
	if (d) {
		var g = e.$$legacy;
		return (function(e, t) {
			return arguments.length > 0 ? ((!i || !t || g || m) && d(t ? h() : e), e) : h();
		});
	}
	var _ = !1, v = (n & 1 ? Dt : jt)(() => (_ = !1, h()));
	a && q(v);
	var y = H;
	return (function(e, t) {
		if (arguments.length > 0) {
			let n = t ? q(v) : i && a ? F(e) : e;
			return P(v, n), _ = !0, s !== void 0 && (s = n), e;
		}
		return $n && _ || y.f & 16384 ? v.v : q(v);
	});
}
// node_modules/.pnpm/svelte@5.57.2_@typescript-eslint+types@8.72.0/node_modules/svelte/src/legacy/legacy-client.js
function Di(e) {
	return new Oi(e);
}
var Oi = class {
	#e;
	#t;
	constructor(e) {
		var t = /* @__PURE__ */ new Map(), n = (e, n) => {
			var r = /* @__PURE__ */ an(n, !1, !1);
			return t.set(e, r), r;
		};
		let r = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, r) {
				return q(t.get(r) ?? n(r, Reflect.get(e, r)));
			},
			has(e, r) {
				return r === je || (q(t.get(r) ?? n(r, Reflect.get(e, r))), Reflect.has(e, r));
			},
			set(e, r, i) {
				return P(t.get(r) ?? n(r, i), i), Reflect.set(e, r, i);
			}
		});
		this.#t = (e.hydrate ? Vr : Br)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: r,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover,
			transformError: e.transformError
		}), e?.props?.$$host && e.sync !== !1 || M(), this.#e = r.$$events;
		for (let e of Object.keys(this.#t)) e !== "$set" && e !== "$destroy" && e !== "$on" && ce(this, e, {
			get() {
				return this.#t[e];
			},
			set(t) {
				this.#t[e] = t;
			},
			enumerable: !0
		});
		this.#t.$set = (e) => {
			Object.assign(r, e);
		}, this.#t.$destroy = () => {
			Gr(this.#t);
		};
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, t) {
		this.#e[e] = this.#e[e] || [];
		let n = (...e) => t.call(this, ...e);
		return this.#e[e].push(n), () => {
			this.#e[e] = this.#e[e].filter((e) => e !== n);
		};
	}
	$destroy() {
		this.#t.$destroy();
	}
}, ki;
typeof HTMLElement == "function" && (ki = class extends HTMLElement {
	$$ctor;
	$$s;
	$$c;
	$$cn = !1;
	$$d = {};
	$$r = !1;
	$$p_d = {};
	$$l = {};
	$$l_u = /* @__PURE__ */ new Map();
	$$me;
	$$shadowRoot = null;
	constructor(e, t, n) {
		super(), this.$$ctor = e, this.$$s = t, n && (this.$$shadowRoot = this.attachShadow(n));
	}
	addEventListener(e, t, n) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
			let n = this.$$c.$on(e, t);
			this.$$l_u.set(t, n);
		}
		super.addEventListener(e, t, n);
	}
	removeEventListener(e, t, n) {
		if (super.removeEventListener(e, t, n), this.$$c) {
			let e = this.$$l_u.get(t);
			e && (e(), this.$$l_u.delete(t));
		}
	}
	async connectedCallback() {
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function e(e) {
				return (t) => {
					let n = wn("slot");
					e !== "default" && (n.name = e), Y(t, n);
				};
			}
			let t = {}, n = ji(this);
			for (let r of this.$$s) r in n && (r === "default" && !this.$$d.children ? (this.$$d.children = e(r), t.default = !0) : t[r] = e(r));
			for (let e of this.attributes) {
				let t = this.$$g_p(e.name);
				t in this.$$d || (this.$$d[t] = Ai(t, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			this.$$c = Di({
				component: this.$$ctor,
				target: this.$$shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: t,
					$$host: this
				}
			}), this.$$me = Fn(() => {
				zn(() => {
					this.$$r = !0;
					for (let e of se(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let t = Ai(e, this.$$d[e], this.$$p_d, "toAttribute");
						t == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, t);
					}
					this.$$r = !1;
				});
			});
			for (let e in this.$$l) for (let t of this.$$l[e]) {
				let n = this.$$c.$on(e, t);
				this.$$l_u.set(t, n);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(e, t, n) {
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ai(e, n, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return se(this.$$p_d).find((t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e) || e;
	}
});
function Ai(e, t, n, r) {
	let i = n[e]?.type;
	if (t = i === "Boolean" && typeof t != "boolean" ? t != null : t, !r || !n[e]) return t;
	if (r === "toAttribute") switch (i) {
		case "Object":
		case "Array": return t == null ? null : JSON.stringify(t);
		case "Boolean": return t ? "" : null;
		case "Number": return t ?? null;
		default: return t;
	}
	else switch (i) {
		case "Object":
		case "Array": return t && JSON.parse(t);
		case "Boolean": return t;
		case "Number": return t == null ? t : +t;
		default: return t;
	}
}
function ji(e) {
	let t = {};
	return e.childNodes.forEach((e) => {
		t[e.slot || "default"] = !0;
	}), t;
}
function Mi(e, t, n, r, i, a) {
	let o = class extends ki {
		constructor() {
			super(e, n, i), this.$$p_d = t;
		}
		static get observedAttributes() {
			return se(t).map((e) => (t[e].attribute || e).toLowerCase());
		}
	};
	return se(t).forEach((e) => {
		ce(o.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(n) {
				n = Ai(e, n, t), this.$$d[e] = n;
				var r = this.$$c;
				r && (le(r, e)?.get ? r[e] = n : r.$set({ [e]: n }));
			}
		});
	}), r.forEach((e) => {
		ce(o.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), a && (o = a(o)), e.element = o, o;
}
// src/helpers/promise-timeout.ts
var Ni = class e extends Error {
	constructor(t, ...n) {
		super(...n), Error.captureStackTrace && Error.captureStackTrace(this, e), this.name = "TimeoutError", this.timeout = t, this.message = `Timed out in ${t} ms.`;
	}
}, Pi = (e, t) => {
	let n = new Promise((t, n) => {
		setTimeout(() => {
			n(new Ni(e));
		}, e);
	});
	return Promise.race([t, n]);
}, Fi = (e) => {
	if (typeof e.getCardSize == "function") try {
		return Pi(500, e.getCardSize()).catch(() => 1);
	} catch {
		return 1;
	}
	return customElements.get(e.localName) ? 1 : customElements.whenDefined(e.localName).then(() => Fi(e));
}, Ii = /* @__PURE__ */ jr("<span class=\"loading svelte-lv9s7p\">Loading...</span>"), Li = /* @__PURE__ */ jr("<div><!></div>"), Ri = {
	hash: "svelte-lv9s7p",
	code: ".loading.svelte-lv9s7p {padding:1em;display:block;}.animation.svelte-lv9s7p {hui-card {display:flex;flex-direction:column;}}.outer-container.animation.svelte-lv9s7p {transition:margin-bottom 0.35s ease;}.outer-container.animation.open.svelte-lv9s7p,\n  .outer-container.animation.opening.svelte-lv9s7p {margin-bottom:inherit;}.outer-container.animation.close.svelte-lv9s7p,\n  .outer-container.animation.closing.svelte-lv9s7p {margin-bottom:var(--expander-animation-height, -100%);}.outer-container.animation.opening.svelte-lv9s7p {\n    animation: svelte-lv9s7p-fadeInOpacity 0.5s forwards ease;\n    -webkit-animation: svelte-lv9s7p-fadeInOpacity 0.5s forwards ease;}.outer-container.animation.closing.svelte-lv9s7p {\n      animation: svelte-lv9s7p-fadeOutOpacity 0.5s forwards ease;\n      -webkit-animation: svelte-lv9s7p-fadeOutOpacity 0.5s forwards ease;}.outer-container.svelte-lv9s7p > hui-card {margin-top:var(--child-card-margin-top, 0px);}\n  @keyframes svelte-lv9s7p-fadeInOpacity {\n      0% {\n          opacity: 0;\n      }\n      100% {\n          opacity: 1;\n      }\n  }\n  @-webkit-keyframes svelte-lv9s7p-fadeInOpacity {\n      0% {\n          opacity: 0;\n      }\n      100% {\n          opacity: 1;\n      }\n  }\n    @keyframes svelte-lv9s7p-fadeOutOpacity {\n      0% {\n          opacity: 1;\n      }\n      100% {\n          opacity: 0;\n      }\n  }\n  @-webkit-keyframes svelte-lv9s7p-fadeOutOpacity {\n      0% {\n          opacity: 1;\n      }\n      100% {\n          opacity: 0;\n      }\n  }"
};
function zi(e, t) {
	dt(t, !0), ai(e, Ri);
	let n = Ei(t, "config", 7), r = Ei(t, "hass", 7), i = Ei(t, "preview", 7), a = Ei(t, "marginTop", 7, "0px"), o = Ei(t, "open", 7), s = Ei(t, "animation", 7, !0), c = Ei(t, "animationState", 7), l = Ei(t, "clearCardCss", 7, !1), u = null, d = /* @__PURE__ */ N(null), f = /* @__PURE__ */ N(!0), p = /* @__PURE__ */ N(0), m = J(() => JSON.parse(JSON.stringify(n())));
	Nn(() => {
		q(d) && (q(d).hass = r());
	}), Nn(() => {
		q(d) && i() !== void 0 && (q(d).preview = i());
	}), Nn(() => {
		q(d) && (m.disabled = !o(), q(d)._element?.dispatchEvent(new CustomEvent("card-visibility-changed", {
			detail: { value: o() },
			bubbles: !0,
			composed: !1
		})));
	}), qr(async () => {
		let e = document.createElement("hui-card");
		e.hass = r(), e.preview = i(), m.disabled = !o(), e.config = m, e.load(), u?.appendChild(e), P(d, e, !0), P(f, !1), q(d).addEventListener("ll-upgrade", (e) => {
			e.stopPropagation(), q(d)?._element && r() && (q(d)._element.hass = r());
		}, { capture: !0 }), l() && (e.style.setProperty("--ha-card-background", "transparent"), e.style.setProperty("--ha-card-box-shadow", "none"), e.style.setProperty("--ha-card-border-color", "transparent"), e.style.setProperty("--ha-card-border-width", "0px"), e.style.setProperty("--ha-card-backdrop-filter", "none")), s() && (P(p, await Fi(e) * 56), u && P(p, q(p) + (window.getComputedStyle(u).marginTop ? parseFloat(window.getComputedStyle(u).marginTop) : 0)), new ResizeObserver((e) => {
			for (let t of e) if (t.contentBoxSize) {
				let e = Array.isArray(t.contentBoxSize) ? t.contentBoxSize[0] : t.contentBoxSize;
				e.blockSize && (P(p, e.blockSize, !0), q(d) && P(p, q(p) + (window.getComputedStyle(q(d)).marginTop ? parseFloat(window.getComputedStyle(q(d)).marginTop) : 0)));
			} else t.contentRect && (P(p, t.contentRect.height, !0), q(d) && P(p, q(p) + (window.getComputedStyle(q(d)).marginTop ? parseFloat(window.getComputedStyle(q(d)).marginTop) : 0)));
		}).observe(e));
	});
	var h = {
		get config() {
			return n();
		},
		set config(e) {
			n(e), M();
		},
		get hass() {
			return r();
		},
		set hass(e) {
			r(e), M();
		},
		get preview() {
			return i();
		},
		set preview(e) {
			i(e), M();
		},
		get marginTop() {
			return a();
		},
		set marginTop(e = "0px") {
			a(e), M();
		},
		get open() {
			return o();
		},
		set open(e) {
			o(e), M();
		},
		get animation() {
			return s();
		},
		set animation(e = !0) {
			s(e), M();
		},
		get animationState() {
			return c();
		},
		set animationState(e) {
			c(e), M();
		},
		get clearCardCss() {
			return l();
		},
		set clearCardCss(e = !1) {
			l(e), M();
		}
	}, g = Li(), _ = vn(g), v = (e) => {
		Y(e, Ii());
	};
	return Jr(_, (e) => {
		q(f) && e(v);
	}), We(g), Ci(g, (e) => u = e, () => u), Bn(() => {
		di(g, 1, `outer-container${o() ? " open" : " close"}${s() ? " animation " + c() : ""}`, "svelte-lv9s7p"), pi(g, `--child-card-margin-top: ${(o() ? a() : "0px") ?? ""};${q(p) ? ` --expander-animation-height: -${q(p)}px;` : ""}`);
	}), Y(e, g), ft(h);
}
customElements.define("expander-sub-card", Mi(zi, {
	config: {},
	hass: {},
	preview: {},
	marginTop: {},
	open: {},
	animation: {},
	animationState: {},
	clearCardCss: {}
}, [], [], { mode: "open" }));
// src/helpers/forward-haptic.ts
var Bi = (e, t) => {
	e.dispatchEvent?.(new CustomEvent("haptic", {
		detail: t,
		bubbles: !0,
		composed: !0
	}));
}, Vi = 10, Hi = 10, Ui = (e, t, n = {}) => {
	let { retries: r = Vi, delay: i = Hi, shouldReject: a = !0, signal: o } = n, s = n.rejectMessage ?? "Could not get the result after {{ retries }} retries";
	return new Promise((n, c) => {
		let l = 0, u = () => {
			let o = e();
			t(o) ? n(o) : (l++, l < r ? setTimeout(u, i) : a ? c(Error(s.replace(/\{\{\s*retries\s*\}\}/g, `${r}`))) : n(o));
		};
		o?.throwIfAborted(), o?.addEventListener("abort", () => {
			c(o.reason);
		}, { once: !0 }), u();
	});
};
// node_modules/.pnpm/home-assistant-javascript-templates@8.0.0_get-promisable-result@2.1.0/node_modules/home-assistant-javascript-templates/dist/esm/index.js
function Wi(e, t, n, r) {
	return new (n ||= Promise)(function(i, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			var t;
			e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
				e(t);
			})).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
var Gi = "[home-assistant-javascript-templates]", Ki = /^([a-z_]+)\.(\w+)$/, qi, Ji, Yi, Xi;
(function(e) {
	e.UNKNOWN = "unknown", e.UNAVAILABLE = "unavailable";
})(qi ||= {}), function(e) {
	e.AREA_ID = "area_id", e.NAME = "name";
}(Ji ||= {}), function(e) {
	e.PANEL_URL = "panel_url", e.LANG = "lang";
}(Yi ||= {}), function(e) {
	e.LOCATION_CHANGED = "location-changed", e.TRANSLATIONS_UPDATED = "translations-updated", e.POPSTATE = "popstate", e.SUBSCRIBE_EVENTS = "subscribe_events", e.STATE_CHANGE_EVENT = "state_changed";
}(Xi ||= {});
var Zi = "refs", Qi = (e) => e.reduce((e, t) => {
	let [n, r] = t;
	return e[n.replace(Ki, "$2")] = r, e;
}, {}), $i = (e) => e.includes("."), ea = "ref", ta = "value", na = "toJSON", ra = (e) => `${ea}.${e}`;
function ia(e, t, n) {
	let r = () => Object.entries(e.hass.areas), i = () => Object.entries(e.hass.devices), a = () => Object.entries(e.hass.entities), o = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Map(), c = (e, t) => {
		n && console.warn(`${e} ${t} used in a JavaScript template doesn't exist`);
	}, l = (e) => c("Entity", e), u = (e) => c("Domain", e), d = (e) => {
		let r = SyntaxError(e);
		if (t) throw r;
		n && console.warn(r);
	}, f = (t) => {
		e.hass.states[t] ? o.add(t) : l(t);
	}, p = (e) => {
		o.add(e);
	}, m = (t, n) => {
		let { with_unit: r = !1, rounded: i = !1 } = n;
		if (t) {
			let n = t.state, a = t.attributes.unit_of_measurement, o = Number(i), s = !1 === i || isNaN(Number(n)) ? n : new Intl.NumberFormat(e.hass.language, {
				minimumFractionDigits: o,
				maximumFractionDigits: o
			}).format(Number(n));
			return r && a ? `${s} ${a}` : s;
		}
	}, h = (e) => new Proxy(e, { get: (e, t) => t === "state_with_unit" ? m(e, {
		rounded: !0,
		with_unit: !0
	}) : e[t] });
	return {
		get hass() {
			return e.hass;
		},
		states: new Proxy((t, n = {}) => {
			if ($i(t)) return f(t), m(e.hass.states[t], n);
			throw SyntaxError(`${Gi}: states method cannot be used with a domain, use it as an object instead.`);
		}, { get(t, n) {
			if ($i(n)) return f(n), h(e.hass.states[n]);
			let r = Object.entries(e.hass.states).filter(([e]) => e.startsWith(n));
			return r.length || u(n), new Proxy(Qi(r), { get: (e, t) => (f(`${n}.${t}`), h(e[t])) });
		} }),
		state_translated(t) {
			if (f(t), e.hass.states[t]) return e.hass.formatEntityState(e.hass.states[t]);
		},
		is_state(t, n) {
			return f(t), Array.isArray(n) ? n.some((n) => e.hass.states[t]?.state === n) : e.hass.states[t]?.state === n;
		},
		state_attr(t, n) {
			return f(t), e.hass.states[t]?.attributes?.[n];
		},
		state_attr_translated(t, n) {
			if (f(t), e.hass.states[t]) return e.hass.formatEntityAttributeValue(e.hass.states[t], n);
		},
		is_state_attr(e, t, n) {
			return this.state_attr(e, t) === n;
		},
		has_value(e) {
			return this.states(e) ? !(this.is_state(e, qi.UNKNOWN) || this.is_state(e, qi.UNAVAILABLE)) : (l(e), !1);
		},
		entities: new Proxy((t) => {
			if (t === void 0) return e.hass.entities;
			if ($i(t)) return f(t), e.hass.entities[t];
			let n = a().filter(([e]) => e.startsWith(t));
			return n.length || u(t), new Proxy(Qi(n), { get: (e, n) => (f(`${t}.${n}`), e[n]) });
		}, { get: (e, t) => e(t) }),
		entity_prop(t, n) {
			return f(t), e.hass.entities[t]?.[n];
		},
		is_entity_prop(e, t, n) {
			return this.entity_prop(e, t) === n;
		},
		devices: new Proxy((t) => {
			if (t === void 0) return e.hass.devices;
			if ($i(t)) throw SyntaxError(`${Gi}: devices method cannot be used with an entity id, you should use a device id instead.`);
			return e.hass.devices[t];
		}, { get(t, n) {
			if ($i(n)) throw SyntaxError(`${Gi}: devices cannot be accesed using an entity id, you should use a device id instead.`);
			return e.hass.devices[n];
		} }),
		device_attr(t, n) {
			if ($i(t)) {
				f(t);
				let r = e.hass.entities[t]?.device_id;
				return e.hass.devices[r]?.[n];
			}
			return e.hass.devices[t]?.[n];
		},
		is_device_attr(e, t, n) {
			return this.device_attr(e, t) === n;
		},
		device_id(t) {
			return $i(t) ? (f(t), e.hass.entities[t]?.device_id) : i().find((e) => e[1].name === t)?.[0];
		},
		device_name(t) {
			if ($i(t)) {
				f(t);
				let n = e.hass.entities[t]?.device_id;
				return e.hass.devices[n]?.name ?? void 0;
			}
			return e.hass.devices[t]?.name ?? void 0;
		},
		areas: () => r().map(([, e]) => e.area_id),
		area_id(t) {
			if (t in e.hass.devices) return this.device_attr(t, Ji.AREA_ID);
			let n = e.hass.entities[t]?.device_id;
			return n ? this.device_attr(n, Ji.AREA_ID) : r().find(([, e]) => e.name === t)?.[1]?.area_id;
		},
		area_name(t) {
			let n;
			t in e.hass.devices && (n = this.device_attr(t, Ji.AREA_ID));
			let i = e.hass.entities[t]?.device_id;
			return i && (n = this.device_attr(i, Ji.AREA_ID)), r().find(([, e]) => e.area_id === t || e.area_id === n)?.[1]?.name;
		},
		area_entities(e) {
			let t = r().find(([, t]) => t.area_id === e || t.name === e);
			return t ? a().filter(([, e]) => e.area_id === t[1].area_id).map(([e]) => e) : [];
		},
		area_devices(e) {
			let t = r().find(([, t]) => t.area_id === e || t.name === e);
			return t ? i().filter(([, e]) => e.area_id === t[1].area_id).map(([, e]) => e.id) : [];
		},
		get user_name() {
			return e.hass.user.name;
		},
		get user_is_admin() {
			return e.hass.user.is_admin;
		},
		get user_is_owner() {
			return e.hass.user.is_owner;
		},
		get user_agent() {
			return window.navigator.userAgent;
		},
		get tracked() {
			return o;
		},
		cleanTracked() {
			o.clear();
		},
		ref(e, t, n = void 0) {
			let r = ra(t);
			if (s.has(t)) return s.get(t);
			let i = new Proxy({
				[ta]: n,
				[na]() {
					return this[ta];
				}
			}, {
				get(e, t, n) {
					if (t === ta || t === na) return p(r), Reflect.get(e, t, n);
					d(`${t} is not a valid ${ea} property. A ${ea} only exposes a "${ta}" property`);
				},
				set(t, n, i) {
					if (n === ta) {
						let n = t[ta];
						return t[ta] = i, e({
							event_type: Xi.STATE_CHANGE_EVENT,
							data: {
								entity_id: r,
								old_state: { state: JSON.stringify(n) },
								new_state: { state: JSON.stringify(i) }
							}
						}), !0;
					}
					return d(`property "${n}" cannot be set in a ${ea}`), !1;
				}
			});
			return s.set(t, i), i;
		},
		unref(e, t) {
			let n = ra(t);
			s.has(t) ? (s.delete(t), e(n)) : d(`${t} is not a ref or it has been unrefed already`);
		},
		refs(e, t, n = {}) {
			let r = this.ref, i = this.unref, a = new Proxy(n, {
				get: (t, n) => r(e, n).value,
				set: (t, n, i) => (r(e, n).value = i, !0)
			});
			return Object.entries(n).forEach((n) => {
				let [a, o] = n;
				s.has(a) && i(t, a), r(e, a, o);
			}), a;
		},
		cleanRefs(e) {
			Array.from(s.keys()).forEach((t) => {
				this.unref(e, t);
			});
		},
		clientSideProxy: new Proxy({}, { get(t, r) {
			switch (Object.values(Yi).includes(r) && p(r), r) {
				case Yi.PANEL_URL: return window.location.pathname;
				case Yi.LANG: return e.hass.language;
			}
			n && console.warn(`clientSideProxy should only be used to access these variables: ${Object.values(Yi).join(", ")}`);
		} })
	};
}
var aa = class {
	constructor(e, t) {
		let { throwErrors: n = !1, throwWarnings: r = !0, variables: i = {}, refs: a = {}, refsVariableName: o = Zi, autoReturn: s = !0 } = t;
		this._subscribed = !1, this._throwErrors = n, this._throwWarnings = r, this._variables = i, this._refsVariableName = o, this._autoReturn = s, this._subscriptions = /* @__PURE__ */ new Map(), this._clientSideEntitiesRegExp = RegExp(`(^|[ \\?(+:\\{\\[><,])(${Object.values(Yi).join("|")})($|[ \\?)+:\\}\\]><.,])`, "gm"), this._scopped = ia(e, n, r), this.refs = a, this._panelUrlWatchCallbackBinded = this._panelUrlWatchCallback.bind(this), this._watchForLanguageChangeCallbackBinded = this._watchForLanguageChangeCallback.bind(this);
	}
	_executeRenderingFunctions(e) {
		this._subscriptions.get(e).forEach((e, t) => {
			e.forEach((e, n) => {
				this.trackTemplate(t, n, e);
			});
		});
	}
	_watchForPanelUrlChange() {
		window.addEventListener(Xi.LOCATION_CHANGED, this._panelUrlWatchCallbackBinded), window.addEventListener(Xi.POPSTATE, this._panelUrlWatchCallbackBinded);
	}
	_stopWatchForPanelUrlChange() {
		window.removeEventListener(Xi.LOCATION_CHANGED, this._panelUrlWatchCallbackBinded), window.removeEventListener(Xi.POPSTATE, this._panelUrlWatchCallbackBinded);
	}
	_panelUrlWatchCallback() {
		this._subscriptions.has(Yi.PANEL_URL) && this._executeRenderingFunctions(Yi.PANEL_URL);
	}
	_watchForLanguageChange() {
		window.addEventListener(Xi.TRANSLATIONS_UPDATED, this._watchForLanguageChangeCallbackBinded);
	}
	_stopWatchForLanguageChange() {
		window.removeEventListener(Xi.TRANSLATIONS_UPDATED, this._watchForLanguageChangeCallbackBinded);
	}
	_watchForLanguageChangeCallback() {
		this._subscriptions.has(Yi.LANG) && this._executeRenderingFunctions(Yi.LANG);
	}
	_watchForEntitiesChange() {
		return Wi(this, void 0, void 0, function* () {
			if (this._subscribed) throw Error("You cannot call init method consecutively, call stop first");
			this._subscribed = !0;
			try {
				let e = yield (yield window.hassConnection).conn.subscribeMessage((e) => this._entityWatchCallback(e), {
					type: Xi.SUBSCRIBE_EVENTS,
					event_type: Xi.STATE_CHANGE_EVENT
				});
				return this._cancelSubscription = e, this;
			} catch (e) {
				throw this._subscribed = !1, e;
			}
		});
	}
	_stopWatchForEntitiesChange() {
		if (!this._subscribed) throw Error("You cannot call stop method without init being called");
		this._subscribed = !1, this._cancelSubscription();
	}
	_entityWatchCallback(e) {
		if (this._subscriptions.size) {
			let t = e.data.entity_id;
			this._subscriptions.has(t) && this._executeRenderingFunctions(t);
		}
	}
	_storeTracked(e, t, n, r) {
		n.forEach((n) => {
			let i = [t, r];
			if (this._subscriptions.has(n)) {
				let r = this._subscriptions.get(n);
				if (r.has(e)) {
					let n = r.get(e);
					n.has(t) || n.set(...i);
				} else r.set(e, new Map([i]));
			} else this._subscriptions.set(n, /* @__PURE__ */ new Map([[e, new Map([i])]]));
		});
	}
	_untrackTemplate(e, t) {
		this._subscriptions.forEach((n, r) => {
			if (n.has(e)) {
				let i = n.get(e);
				i.delete(t), i.size === 0 && (n.delete(e), n.size === 0 && this._subscriptions.delete(r));
			}
		});
	}
	init() {
		return Wi(this, void 0, void 0, function* () {
			return this._watchForPanelUrlChange(), this._watchForLanguageChange(), this._watchForEntitiesChange();
		});
	}
	stop() {
		this._stopWatchForPanelUrlChange(), this._stopWatchForLanguageChange(), this._stopWatchForEntitiesChange();
	}
	parseTemplate(e, t = {}) {
		try {
			this._scopped.cleanTracked();
			let { variables: n = {}, refs: r = {} } = t, i = new Map(Object.entries(Object.assign(Object.assign({}, this._variables), n))), a = e.trim().replace(this._clientSideEntitiesRegExp, "$1clientSide.$2$3"), o = a.includes("return") || !this._autoReturn ? a : `return ${a}`;
			return {
				result: Function("hass", "states", "state_translated", "is_state", "state_attr", "state_attr_translated", "is_state_attr", "has_value", "entities", "entity_prop", "is_entity_prop", "devices", "device_attr", "is_device_attr", "device_id", "device_name", "areas", "area_id", "area_name", "area_entities", "area_devices", "user_name", "user_is_admin", "user_is_owner", "user_agent", "clientSide", "ref", "unref", this._refsVariableName, ...Array.from(i.keys()), `"use strict"; ${o}`)(this._scopped.hass, this._scopped.states, this._scopped.state_translated.bind(this._scopped), this._scopped.is_state.bind(this._scopped), this._scopped.state_attr.bind(this._scopped), this._scopped.state_attr_translated.bind(this._scopped), this._scopped.is_state_attr.bind(this._scopped), this._scopped.has_value.bind(this._scopped), this._scopped.entities, this._scopped.entity_prop, this._scopped.is_entity_prop.bind(this._scopped), this._scopped.devices, this._scopped.device_attr.bind(this._scopped), this._scopped.is_device_attr.bind(this._scopped), this._scopped.device_id.bind(this._scopped), this._scopped.device_name.bind(this._scopped), this._scopped.areas.bind(this._scopped), this._scopped.area_id.bind(this._scopped), this._scopped.area_name.bind(this._scopped), this._scopped.area_entities.bind(this._scopped), this._scopped.area_devices.bind(this._scopped), this._scopped.user_name, this._scopped.user_is_admin, this._scopped.user_is_owner, this._scopped.user_agent, this._scopped.clientSideProxy, this._scopped.ref.bind(this._scopped, this._entityWatchCallback.bind(this)), this._scopped.unref.bind(this._scopped, this.cleanTracked.bind(this)), this._scopped.refs(this._entityWatchCallback.bind(this), this.cleanTracked.bind(this), r), ...Array.from(i.values())),
				entities: [...this._scopped.tracked]
			};
		} catch (e) {
			if (this._throwErrors) throw e;
			return this._throwWarnings && console.warn(e), {
				result: void 0,
				entities: []
			};
		}
	}
	renderTemplate(e, t = {}) {
		let { result: n } = this.parseTemplate(e, t);
		return n;
	}
	trackTemplate(e, t, n = {}) {
		let { result: r, entities: i } = this.parseTemplate(e, n);
		return this._storeTracked(e, t, i, n), t(r), () => this._untrackTemplate(e, t);
	}
	cleanTracked(e) {
		e ? this._subscriptions.has(e) && this._subscriptions.delete(e) : this._subscriptions.clear();
	}
	get variables() {
		return this._variables;
	}
	set variables(e) {
		this._variables = e;
	}
	get refs() {
		return this._scopped.refs(this._entityWatchCallback.bind(this), this.cleanTracked.bind(this));
	}
	set refs(e) {
		this._scopped.cleanRefs(this.cleanTracked.bind(this)), this._scopped.refs(this._entityWatchCallback.bind(this), this.cleanTracked.bind(this), e);
	}
	get subscribed() {
		return this._subscribed;
	}
}, oa = class {
	constructor(e, t = {}) {
		this._renderer = Ui(() => e.hass, (e) => !!(e && e.areas && e.devices && e.entities && e.states && e.user), {
			retries: 100,
			delay: 50,
			rejectMessage: "The provided element doesn't contain a proper or initialised hass object"
		}).then(() => new aa(e, t));
	}
	getRenderer() {
		return this._renderer;
	}
};
// src/helpers/templates.ts
function sa(e) {
	return e.then((e) => (e.init(), e));
}
function ca(e = {}, t = {}) {
	return sa(new oa(document.querySelector("home-assistant"), {
		autoReturn: !1,
		variables: e,
		refs: t,
		refsVariableName: "variables"
	}).getRenderer());
}
function la(e) {
	return !e || typeof e != "string" ? !1 : String(e).trim().startsWith("[[[") && String(e).trim().endsWith("]]]");
}
function ua(e, t, n, r = {}) {
	if (!la(n)) throw Error("Not a valid JS template");
	return n = String(n).trim().slice(3, -3), e.then((e) => e.trackTemplate(n, t, { variables: r }));
}
function da(e, t, n) {
	e.then((e) => {
		e.refs[t] = n;
	});
}
function fa(e, t) {
	e.then((e) => {
		let n = t.detail;
		Object.keys(n).forEach((t) => {
			let r = n[t].property, i = n[t].value, a = `${t}_${r}`;
			e.refs[a] = i;
		});
	});
}
function pa(e, t) {
	let n = fa.bind(null, e);
	return document.addEventListener(t, n), () => {
		document.removeEventListener(t, n);
	};
}
// node_modules/.pnpm/shadow-dom-selector@6.2.3_get-promisable-result@2.1.0/node_modules/shadow-dom-selector/dist/esm/index.js
function ma(e, t, n, r) {
	return new (n ||= Promise)(function(i, a) {
		function o(e) {
			try {
				c(r.next(e));
			} catch (e) {
				a(e);
			}
		}
		function s(e) {
			try {
				c(r.throw(e));
			} catch (e) {
				a(e);
			}
		}
		function c(e) {
			var t;
			e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n(function(e) {
				e(t);
			})).then(o, s);
		}
		c((r = r.apply(e, t || [])).next());
	});
}
var ha = "$", ga = ":host", _a = "invalid selector", va = 10, ya = 10, ba = !1, xa = "Wrong parameters have been provided.", Sa = () => `You can not select a shadowRoot (${ha}) of the document.`, Ca = () => `You can not select a shadowRoot (${ha}) of a shadowRoot.`, wa = (e) => typeof e == "string", Ta = (e) => !!e && (e instanceof Document || e instanceof Element || e instanceof ShadowRoot), Ea = (e) => {
	return t = e, Object.prototype.toString.call(t) === "[object Object]" && (Object.keys(e).length === 0 || [
		"retries",
		"delay",
		"shouldReject"
	].some((t) => t in e));
	var t;
}, Da = (e, t, n) => {
	if (wa(e)) return Ea(t) ? [
		document,
		e,
		t.retries ?? va,
		t.delay ?? ya,
		t.shouldReject ?? ba
	] : [
		document,
		e,
		va,
		ya,
		ba
	];
	if (Ta(e) && wa(t)) return Ea(n) ? [
		e,
		t,
		n.retries ?? va,
		n.delay ?? ya,
		n.shouldReject ?? ba
	] : [
		e,
		t,
		va,
		ya,
		ba
	];
	throw TypeError(xa);
};
function Oa(e, t) {
	return function(e) {
		return e.split(",").map((e) => e.trim());
	}(e).map((e) => t(function(e) {
		return e.split(ha).map((e) => e.trim());
	}(e)));
}
function ka(e, t) {
	return `${e} cannot be used with a selector ending in a shadowRoot (${ha}).${t ? ` If you want to select a shadowRoot, use ${t} instead.` : ""}`;
}
function Aa(e) {
	return e instanceof Promise ? e : Promise.resolve(e);
}
function ja(e, t) {
	let n = null, r = e.length;
	for (let i = 0; i < r; i++) {
		if (i === 0) {
			if (e[i].length) n = t.querySelector(e[i]);
			else {
				if (t instanceof Document) throw SyntaxError(Sa());
				if (t instanceof ShadowRoot) throw SyntaxError(Ca());
				n = t.shadowRoot?.querySelector(e[++i]) || null;
			}
		} else n = n.shadowRoot?.querySelector(`${ga} ${e[i]}`) || null;
		if (n === null) return null;
	}
	return n;
}
function Ma(e, t) {
	let n = [...e], r = n.pop();
	return n.length ? (ja(n, t)?.shadowRoot)?.querySelectorAll(`${ga} ${r}`) || null : t.querySelectorAll(r);
}
function Na(e, t) {
	if (e.length === 1 && !e[0].length) {
		if (t instanceof Document) throw SyntaxError(Sa());
		if (t instanceof ShadowRoot) throw SyntaxError(Ca());
		return t.shadowRoot;
	}
	return ja(e, t)?.shadowRoot || null;
}
function Pa(e, t, n = "querySelector", r = "shadowRootQuerySelector") {
	let i = Oa(t, (e) => {
		if (!e[e.length - 1].length) throw SyntaxError(ka(n, r));
		return e;
	}), a = i.length;
	for (let t = 0; t < a; t++) {
		let n = ja(i[t], e);
		if (n) return n;
	}
	return null;
}
function Fa(e, t, n = "querySelectorAll") {
	let r = Oa(t, (e) => {
		if (!e[e.length - 1].length) throw SyntaxError(ka(n));
		return e;
	}), i = r.length;
	for (let t = 0; t < i; t++) {
		let n = Ma(r[t], e);
		if (n?.length) return n;
	}
	return document.querySelectorAll(_a);
}
function Ia(e, t, n = "shadowRootQuerySelector", r = "querySelector") {
	let i = Oa(t, (e) => {
		if (e.pop().length) throw SyntaxError(function(e, t) {
			return `${e} must be used with a selector ending in a shadowRoot (${ha}). If you don't want to select a shadowRoot, use ${t} instead.`;
		}(n, r));
		return e;
	}), a = i.length;
	for (let t = 0; t < a; t++) {
		let n = Na(i[t], e);
		if (n) return n;
	}
	return null;
}
var La = (e, t) => {
	let n = e.querySelectorAll(t);
	if (n.length) return n;
	if (e instanceof Element && e.shadowRoot) {
		let n = La(e.shadowRoot, t);
		if (n.length) return n;
	}
	let r = Array.from(e.querySelectorAll("*"));
	for (let e of r) {
		let n = La(e, t);
		if (n.length) return n;
	}
	return document.querySelectorAll(_a);
}, Ra = (e, t, n, r, i) => Ui(() => La(e, t), (e) => !!e.length, {
	retries: n,
	delay: r,
	shouldReject: i
});
function za(e, t, n) {
	return ma(this, void 0, void 0, function* () {
		return yield function(e, t, n, r, i) {
			return ma(this, void 0, void 0, function* () {
				return Ui(() => Pa(e, t, "asyncQuerySelector", "asyncShadowRootQuerySelector"), (e) => !!e, {
					retries: n,
					delay: r,
					shouldReject: i
				});
			});
		}(...Da(e, t, n));
	});
}
function Ba(e, t, n) {
	return ma(this, void 0, void 0, function* () {
		return function(e, t, n, r, i) {
			return ma(this, void 0, void 0, function* () {
				return Ui(() => Fa(e, t, "asyncQuerySelectorAll"), (e) => !!e.length, {
					retries: n,
					delay: r,
					shouldReject: i
				});
			});
		}(...Da(e, t, n));
	});
}
function Va(e, t, n) {
	return ma(this, void 0, void 0, function* () {
		return function(e, t, n, r, i) {
			return ma(this, void 0, void 0, function* () {
				return Ui(() => Ia(e, t, "asyncShadowRootQuerySelector", "asyncQuerySelector"), (e) => !!e, {
					retries: n,
					delay: r,
					shouldReject: i
				});
			});
		}(...Da(e, t, n));
	});
}
var Ha = class e {
	constructor(e, t) {
		e instanceof Node || e instanceof Promise ? (this._element = e, this._asyncParams = Object.assign({
			retries: va,
			delay: ya,
			shouldReject: ba
		}, t || {})) : (this._element = document, this._asyncParams = Object.assign({
			retries: va,
			delay: ya,
			shouldReject: ba
		}, e || {}));
	}
	get element() {
		return Aa(this._element).then((e) => {
			if (e instanceof NodeList) {
				if (e[0]) return e[0];
				if (!this._asyncParams.shouldReject) return null;
				throw SyntaxError("The \"element\" method can only be called from a NodeList with elements.");
			}
			if (e) return e;
			if (!this._asyncParams.shouldReject) return null;
			throw SyntaxError("The \"element\" method can only be called from a non-null element.");
		});
	}
	get $() {
		let t = Aa(this._element).then((e) => {
			if (e instanceof Document || e instanceof ShadowRoot || e === null || e instanceof NodeList && e.length === 0) {
				if (!this._asyncParams.shouldReject) return null;
				throw SyntaxError("The \"$\" method can only be called in an element with a ShadowRoot.");
			}
			return e instanceof NodeList ? Va(e[0], ha, this._asyncParams) : Va(e, ha, this._asyncParams);
		});
		return new e(t, this._asyncParams);
	}
	get all() {
		return Aa(this._element).then((e) => {
			if (e instanceof NodeList) {
				if (e.length === 0 && this._asyncParams.shouldReject) throw SyntaxError("The \"all\" method can only be called in a valid element.");
				return e;
			}
			if (!this._asyncParams.shouldReject) return document.querySelectorAll(_a);
			throw SyntaxError("The \"all\" method can only be called in a NodeList element.");
		});
	}
	get asyncParams() {
		return this._asyncParams;
	}
	eq(e) {
		return ma(this, void 0, void 0, function* () {
			return Aa(this._element).then((t) => {
				if (t instanceof NodeList) {
					if (t[e]) return t[e];
					if (!this._asyncParams.shouldReject) return null;
					throw SyntaxError(`Could not get any element at index ${e}.`);
				}
				if (!this._asyncParams.shouldReject) return null;
				throw SyntaxError("The \"eq\" method can only be called in a NodeList element.");
			});
		});
	}
	query(t) {
		let n = Aa(this._element).then((e) => {
			if (e === null || e instanceof NodeList && e.length === 0) {
				if (!this._asyncParams.shouldReject) return null;
				throw SyntaxError("The \"query\" method can only be called from a defined element.");
			}
			return e instanceof NodeList ? Ba(e[0], t, this._asyncParams) : Ba(e, t, this._asyncParams);
		});
		return new e(n, this._asyncParams);
	}
	deepQuery(t) {
		let n = Aa(this._element).then((e) => {
			if (e === null || e instanceof NodeList && e.length === 0) {
				if (!this._asyncParams.shouldReject) return null;
				throw SyntaxError("The \"deepQuery\" method can only be called from a defined element.");
			}
			return e instanceof NodeList ? Promise.race(Array.from(e).map((e) => Ra(e, t, this._asyncParams.retries, this._asyncParams.delay, this._asyncParams.shouldReject))) : Ra(e, t, this._asyncParams.retries, this._asyncParams.delay, this._asyncParams.shouldReject);
		});
		return new e(n, this._asyncParams);
	}
}, Ua = "$", Wa = {
	retries: 100,
	delay: 50,
	shouldReject: !1,
	eventThreshold: 450
}, Ga, Ka, X, qa, Z;
(function(e) {
	e.HOME_ASSISTANT = "HOME_ASSISTANT", e.HOME_ASSISTANT_MAIN = "HOME_ASSISTANT_MAIN", e.HA_DRAWER = "HA_DRAWER", e.HA_SIDEBAR = "HA_SIDEBAR", e.PARTIAL_PANEL_RESOLVER = "PARTIAL_PANEL_RESOLVER";
})(Ga ||= {}), function(e) {
	e.HA_PANEL_LOVELACE = "HA_PANEL_LOVELACE", e.HUI_ROOT = "HUI_ROOT", e.HEADER = "HEADER", e.HUI_VIEW = "HUI_VIEW";
}(Ka ||= {}), function(e) {
	e.HA_MORE_INFO_DIALOG = "HA_MORE_INFO_DIALOG", e.HA_DIALOG = "HA_DIALOG", e.HA_DIALOG_CONTENT = "HA_DIALOG_CONTENT", e.HA_MORE_INFO_DIALOG_INFO = "HA_MORE_INFO_DIALOG_INFO", e.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK = "HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK", e.HA_DIALOG_MORE_INFO_SETTINGS = "HA_DIALOG_MORE_INFO_SETTINGS";
}(X ||= {}), function(e) {
	e.ON_LISTEN = "onListen", e.ON_PANEL_LOAD = "onPanelLoad", e.ON_LOVELACE_PANEL_LOAD = "onLovelacePanelLoad", e.ON_MORE_INFO_DIALOG_OPEN = "onMoreInfoDialogOpen", e.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN = "onHistoryAndLogBookDialogOpen", e.ON_SETTINGS_DIALOG_OPEN = "onSettingsDialogOpen";
}(qa ||= {}), function(e) {
	e.HOME_ASSISTANT = "home-assistant", e.HOME_ASSISTANT_MAIN = "home-assistant-main", e.HA_DRAWER = "ha-drawer", e.HA_SIDEBAR = "ha-sidebar", e.PARTIAL_PANEL_RESOLVER = "partial-panel-resolver", e.HA_PANEL_LOVELACE = "ha-panel-lovelace", e.HUI_ROOT = "hui-root", e.HEADER = ".header", e.HUI_VIEW = "hui-view", e.HA_MORE_INFO_DIALOG = "ha-more-info-dialog", e.HA_DIALOG = "ha-dialog", e.HA_ADAPTATIVE_DIALOG = "ha-adaptive-dialog", e.HA_DIALOG_CONTENT = ".content", e.HA_MORE_INFO_DIALOG_INFO = "ha-more-info-info", e.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK = "ha-more-info-history-and-logbook", e.HA_DIALOG_MORE_INFO_SETTINGS = "ha-more-info-settings", e.DIV = "div", e.FIRST_CHILD = ":scope > *";
}(Z ||= {});
var Ja = { [Ga.HOME_ASSISTANT]: {
	selector: Z.HOME_ASSISTANT,
	children: { shadowRoot: {
		selector: Ua,
		children: { [Ga.HOME_ASSISTANT_MAIN]: {
			selector: Z.HOME_ASSISTANT_MAIN,
			children: { shadowRoot: {
				selector: Ua,
				children: { [Ga.HA_DRAWER]: {
					selector: Z.HA_DRAWER,
					children: {
						[Ga.HA_SIDEBAR]: {
							selector: Z.HA_SIDEBAR,
							children: { shadowRoot: { selector: Ua } }
						},
						[Ga.PARTIAL_PANEL_RESOLVER]: { selector: Z.PARTIAL_PANEL_RESOLVER }
					}
				} }
			} }
		} }
	} }
} }, Ya = { [Ka.HA_PANEL_LOVELACE]: {
	selector: Z.HA_PANEL_LOVELACE,
	children: { shadowRoot: {
		selector: Ua,
		children: { [Ka.HUI_ROOT]: {
			selector: Z.HUI_ROOT,
			children: { shadowRoot: {
				selector: Ua,
				children: {
					[Ka.HEADER]: { selector: Z.HEADER },
					[Ka.HUI_VIEW]: { selector: Z.HUI_VIEW }
				}
			} }
		} }
	} }
} }, Xa = { shadowRoot: {
	selector: Ua,
	children: { [X.HA_MORE_INFO_DIALOG]: {
		selector: Z.HA_MORE_INFO_DIALOG,
		children: { shadowRoot: {
			selector: Ua,
			children: { [X.HA_DIALOG]: {
				selector: `${Z.HA_ADAPTATIVE_DIALOG}, ${Z.HA_DIALOG}`,
				children: { [X.HA_DIALOG_CONTENT]: {
					selector: Z.HA_DIALOG_CONTENT,
					children: {
						[X.HA_MORE_INFO_DIALOG_INFO]: { selector: Z.HA_MORE_INFO_DIALOG_INFO },
						[X.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK]: { selector: Z.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK },
						[X.HA_DIALOG_MORE_INFO_SETTINGS]: { selector: Z.HA_DIALOG_MORE_INFO_SETTINGS }
					}
				} }
			} }
		} }
	} }
} }, Za = (e, t, n, r = !1) => Object.entries(t || {}).reduce((t, i) => {
	let [a, o] = i;
	if (o.selector === Ua && n) return o.children ? Object.assign(Object.assign({}, t), Za(e, o.children, n, !0)) : t;
	let s = n ? n.then((t) => {
		return t ? za(t, (n = o.selector, r ? "$ " + n : n), e) : null;
		var n;
	}) : za(o.selector, e);
	return t[a] = {
		element: s,
		children: Za(e, o.children, s),
		selector: new Ha(s, e)
	}, t;
}, {}), Qa = (e, t) => {
	let n = Object.entries(t);
	for (let t of n) {
		if (t[0] === e) return t[1];
		{
			let n = Qa(e, t[1].children);
			if (n) return n;
		}
	}
}, $a = (e, t) => Object.keys(e).reduce((e, n) => {
	let r = Qa(n, t);
	if (r) {
		let { children: t } = r, i = function(e, t) {
			var n = {};
			for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
			if (e != null && typeof Object.getOwnPropertySymbols == "function") {
				var i = 0;
				for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
			}
			return n;
		}(r, ["children"]);
		e[n] = Object.assign({}, i);
	}
	return e;
}, {}), eo = class {
	constructor() {
		this.delegate = document.createDocumentFragment();
	}
	addEventListener(...e) {
		this.delegate.addEventListener(...e);
	}
	dispatchEvent(...e) {
		return this.delegate.dispatchEvent(...e);
	}
	removeEventListener(...e) {
		return this.delegate.removeEventListener(...e);
	}
}, to = new class extends eo {
	constructor(e = {}) {
		super(), this._config = Object.assign(Object.assign({}, Wa), e), this._timestaps = {};
	}
	_dispatchEvent(e, t) {
		let n = Date.now();
		this._timestaps[e] && n - this._timestaps[e] < this._config.eventThreshold || (this._timestaps[e] = n, this.dispatchEvent(new CustomEvent(e, { detail: t })));
	}
	_updateDialogElements(e = X.HA_MORE_INFO_DIALOG_INFO) {
		this._dialogTree = Za(this._config, Xa, this._haRootElements.HOME_ASSISTANT.element);
		let t = $a(X, this._dialogTree);
		t.HA_DIALOG_CONTENT.element.then((e) => {
			this._dialogsContentObserver.disconnect(), this._dialogsContentObserver.observe(e, { childList: !0 });
		}), this._haDialogElements = ((e, t) => [
			X.HA_MORE_INFO_DIALOG,
			X.HA_DIALOG,
			X.HA_DIALOG_CONTENT,
			t
		].reduce((t, n) => (t[n] = e[n], t), {}))(t, e);
		let n = {
			[X.HA_MORE_INFO_DIALOG_INFO]: qa.ON_MORE_INFO_DIALOG_OPEN,
			[X.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK]: qa.ON_HISTORY_AND_LOGBOOK_DIALOG_OPEN,
			[X.HA_DIALOG_MORE_INFO_SETTINGS]: qa.ON_SETTINGS_DIALOG_OPEN
		};
		this._dispatchEvent(n[e], this._haDialogElements);
	}
	_updateRootElements() {
		this._homeAssistantRootTree = Za(this._config, Ja), this._haRootElements = $a(Ga, this._homeAssistantRootTree), this._haRootElements[Ga.HOME_ASSISTANT].selector.$.element.then((e) => {
			this._dialogsObserver.disconnect(), this._dialogsObserver.observe(e, { childList: !0 });
		}), this._haRootElements[Ga.PARTIAL_PANEL_RESOLVER].element.then((e) => {
			this._panelResolverObserver.disconnect(), e && this._panelResolverObserver.observe(e, {
				subtree: !0,
				childList: !0
			});
		}), this._dispatchEvent(qa.ON_LISTEN, this._haRootElements), this._dispatchEvent(qa.ON_PANEL_LOAD, this._haRootElements);
	}
	_updateLovelaceElements() {
		this._homeAssistantResolverTree = Za(this._config, Ya, this._haRootElements[Ga.HA_DRAWER].element), this._haResolverElements = $a(Ka, this._homeAssistantResolverTree), this._haResolverElements[Ka.HA_PANEL_LOVELACE].element.then((e) => {
			this._lovelaceObserver.disconnect(), e && (this._lovelaceObserver.observe(e.shadowRoot, { childList: !0 }), this._dispatchEvent(qa.ON_LOVELACE_PANEL_LOAD, Object.assign(Object.assign({}, this._haRootElements), this._haResolverElements)));
		});
	}
	_watchDialogs(e) {
		e.forEach(({ addedNodes: e }) => {
			e.forEach((e) => {
				e instanceof Element && e.localName === Z.HA_MORE_INFO_DIALOG && (this._dialogsChildrenObserver.disconnect(), this._dialogsChildrenObserver.observe(e.shadowRoot, { childList: !0 }), this._updateDialogElements());
			});
		});
	}
	_watchDialogsChildren(e) {
		e.forEach(({ addedNodes: e }) => {
			e.forEach((e) => {
				let t = [`${Z.HA_DIALOG}`, `${Z.HA_ADAPTATIVE_DIALOG}`];
				e instanceof Element && t.includes(e.localName) && this._updateDialogElements();
			});
		});
	}
	_watchDialogsContent(e) {
		e.forEach(({ addedNodes: e }) => {
			e.forEach((e) => {
				let t = {
					[Z.HA_MORE_INFO_DIALOG_INFO]: X.HA_MORE_INFO_DIALOG_INFO,
					[Z.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK]: X.HA_DIALOG_MORE_INFO_HISTORY_AND_LOGBOOK,
					[Z.HA_DIALOG_MORE_INFO_SETTINGS]: X.HA_DIALOG_MORE_INFO_SETTINGS
				};
				if (e instanceof Element && e.localName) {
					if (e.localName === Z.DIV) {
						let n = e.querySelector(Z.FIRST_CHILD);
						if (n && n.localName in t) {
							let e = n.localName;
							this._updateDialogElements(t[e]);
						}
					} else if (e.localName in t) {
						let n = e.localName;
						this._updateDialogElements(t[n]);
					}
				}
			});
		});
	}
	_watchDashboards(e) {
		e.forEach(({ addedNodes: e }) => {
			e.forEach((e) => {
				this._dispatchEvent(qa.ON_PANEL_LOAD, this._haRootElements), e instanceof Element && e.localName === Z.HA_PANEL_LOVELACE && this._updateLovelaceElements();
			});
		});
	}
	_watchLovelace(e) {
		e.forEach(({ addedNodes: e }) => {
			e.forEach((e) => {
				e instanceof Element && e.localName === Z.HUI_ROOT && this._updateLovelaceElements();
			});
		});
	}
	listen() {
		this._watchDialogsBinded = this._watchDialogs.bind(this), this._watchDialogsChildrenBinded = this._watchDialogsChildren.bind(this), this._watchDialogsContentBinded = this._watchDialogsContent.bind(this), this._watchDashboardsBinded = this._watchDashboards.bind(this), this._watchLovelaceBinded = this._watchLovelace.bind(this), this._dialogsObserver = new MutationObserver(this._watchDialogsBinded), this._dialogsChildrenObserver = new MutationObserver(this._watchDialogsChildrenBinded), this._dialogsContentObserver = new MutationObserver(this._watchDialogsContentBinded), this._panelResolverObserver = new MutationObserver(this._watchDashboardsBinded), this._lovelaceObserver = new MutationObserver(this._watchLovelaceBinded), this._updateRootElements(), this._updateLovelaceElements();
	}
	addEventListener(e, t, n) {
		super.addEventListener(e, t, n);
	}
}(), no = {};
to.addEventListener("onLovelacePanelLoad", ({ detail: e }) => {
	e.HUI_ROOT.element.then((e) => {
		let t = e?.lovelace;
		t?.config && (no = t.config["expander-card"] || {});
	}).catch(() => {
		no = {};
	}).finally(() => {
		document.body.dispatchEvent(new CustomEvent("expander-card-raw-config-updated", {
			detail: { rawConfig: no },
			bubbles: !0,
			composed: !0
		}));
	});
}), to.listen();
var ro = () => no, io = (e) => e ? typeof e == "string" ? e : Object.entries(e).map(([e, t]) => Array.isArray(t) ? `${e} {\n${t.map((e) => {
	if (typeof e == "string") return `  ${e};`;
	let [t, n] = Object.entries(e)[0];
	return `  ${t}: ${n};`;
}).join("\n")}\n}` : null).filter((e) => e !== null).join("\n") : null, ao = {
	gap: "0.0em",
	"expanded-gap": "0.6em",
	padding: "1em",
	clear: !1,
	"clear-children": !1,
	title: " ",
	"overlay-margin": "0.0em",
	"child-padding": "0.0em",
	"child-margin-top": "0.0em",
	"button-background": "transparent",
	"expander-card-background": "var(--ha-card-background,var(--card-background-color,#fff))",
	"header-color": "var(--primary-text-color,#fff)",
	"arrow-color": "var(--arrow-color,var(--primary-text-color,#fff))",
	"expander-card-display": "block",
	"title-card-clickable": !1,
	"min-width-expanded": 0,
	"max-width-expanded": 0,
	icon: "mdi:chevron-down",
	"icon-rotate-degree": "180deg",
	animation: !0,
	haptic: "light"
}, oo = /* @__PURE__ */ jr("<ha-ripple></ha-ripple>", 2), so = /* @__PURE__ */ jr("<button aria-label=\"Toggle button\"><ha-icon></ha-icon> <!></button>", 2), co = /* @__PURE__ */ jr("<div id=\"id1\"><div id=\"id2\"><!></div> <!> <!></div>"), lo = /* @__PURE__ */ jr("<button><div> </div> <ha-icon></ha-icon> <ha-ripple></ha-ripple></button>", 2), uo = /* @__PURE__ */ jr("<div><div></div></div>"), fo = /* @__PURE__ */ jr("<ha-card><!> <!> <!></ha-card>", 2), po = {
	hash: "svelte-1jqiztq",
	code: ".expander-card.svelte-1jqiztq {display:var(--expander-card-display,block);gap:var(--gap);padding:var(--padding);background:var(--card-background,#fff);-webkit-tap-highlight-color:transparent;}.expander-card.animation.svelte-1jqiztq {transition:gap 0.35s ease, background-color var(--background-animation-duration, 0) ease;}.children-wrapper.svelte-1jqiztq {display:flex;flex-direction:column;}.children-wrapper.animation.opening.svelte-1jqiztq,\n    .children-wrapper.animation.closing.svelte-1jqiztq {overflow:hidden;}.children-container.animation.svelte-1jqiztq {transition:padding 0.35s ease, gap 0.35s ease;}.children-container.svelte-1jqiztq {padding:var(--child-padding);display:var(--expander-card-display,block);gap:var(--gap);}.clear.svelte-1jqiztq {background:none !important;background-color:transparent !important;border-style:none !important;box-shadow:none !important;}.title-card-header.svelte-1jqiztq {display:flex;align-items:center;justify-content:space-between;flex-direction:row;position:relative;}.title-card-header.clickable.svelte-1jqiztq {cursor:pointer;border-style:none;border-radius:var(--ha-card-border-radius, var(--ha-border-radius-lg));}.title-card-header-overlay.svelte-1jqiztq {display:block;}.title-card-container.svelte-1jqiztq {width:100%;padding:var(--title-padding);}.header.svelte-1jqiztq {display:flex;flex-direction:row;align-items:center;padding:0.85em 0.85em;background:var(--button-background);border-style:none;border-radius:var(--ha-card-border-radius, var(--ha-border-radius-lg));width:var(--header-width,auto);color:var(--header-color,#fff);cursor:pointer;position:relative;font-family:var(--ha-font-family-body);font-size:var(--ha-font-size-m);}.header-overlay.svelte-1jqiztq {position:absolute;top:0;right:0;margin:var(--overlay-margin);height:var(--expander-card-overlay-height, auto);z-index:1;}.title-card-header-overlay.clickable.svelte-1jqiztq  > .header-overlay:where(.svelte-1jqiztq) {width:calc(100% - var(--overlay-margin) * 2);justify-content:flex-end;}.title-card-header-overlay.clickable.svelte-1jqiztq > .title-card-container:where(.svelte-1jqiztq) {width:calc(100% - var(--overlay-margin) * 2);}.title.svelte-1jqiztq {width:100%;text-align:left;}.ico.animation.svelte-1jqiztq {transition-property:transform;transition-duration:0.35s;}.ico.svelte-1jqiztq {color:var(--arrow-color,var(--primary-text-color,#fff));}.flipped.svelte-1jqiztq {transform:rotate(var(--icon-rotate-degree,180deg));}"
};
function mo(e, t) {
	dt(t, !0), ai(e, po);
	let n = Ei(t, "hass", 7), r = Ei(t, "preview", 7), i = Ei(t, "config", 7, ao), a = /* @__PURE__ */ N(!1), o = /* @__PURE__ */ N(null), s = /* @__PURE__ */ N(F(!!J(() => r()))), c = /* @__PURE__ */ N(F(!!J(() => r()))), l = /* @__PURE__ */ N(F(J(() => r() || (ce(i()["show-button-users"]) ?? !0)))), u = /* @__PURE__ */ N("idle"), d = /* @__PURE__ */ N(null), f = /* @__PURE__ */ N(0), p = /* @__PURE__ */ N(0), m = /* @__PURE__ */ N(null), h = /* @__PURE__ */ N(null), g = /* @__PURE__ */ N(null), _ = /* @__PURE__ */ N(null), v = {}, y = {}, b = {}, x = /* @__PURE__ */ N(F({})), S = /* @__PURE__ */ N(F(ro())), ee = /* @__PURE__ */ At(() => {
		let e = q(x).style, t = i().style, n = null;
		return e === void 0 ? t && (n = io(t)) : n = typeof e == "string" ? e : typeof e == "object" && e ? io(e) : String(e), n ? `<style>${n}</style>` : null;
	}), te = /* @__PURE__ */ At(() => q(x).icon === void 0 ? i().icon : String(q(x).icon)), ne = /* @__PURE__ */ At(() => q(x).title === void 0 ? i().title : String(q(x).title)), re = /* @__PURE__ */ At(() => q(x)["arrow-color"] === void 0 ? i()["arrow-color"] : String(q(x)["arrow-color"])), ie = J(() => i()["storage-id"]), ae = "expander-open-" + ie;
	Nn(() => {
		if (q(x).expanded === void 0 || J(() => r() && q(S)["preview-expanded"] !== !1)) return;
		let e = !!q(x).expanded;
		queueMicrotask(() => {
			e !== q(s) && de(e);
		});
	}), Nn(() => {
		if (r() !== q(c) && r() !== void 0) {
			if (P(c, r(), !0), q(c) && q(S)["preview-expanded"] !== !1) pe(!0), P(l, !0);
			else if (P(l, ce(i()["show-button-users"]) ?? !0, !0), oe("expanded")) {
				let e = J(() => q(x).expanded);
				e !== void 0 && de(!!e);
			} else le();
		}
	});
	function oe(e) {
		let t = i().templates && Array.isArray(i().templates) ? i().templates.find((t) => t.template === e) : void 0;
		if (t && la(t.value_template)) return t;
	}
	function se(e) {
		if (!i()["expander-card-id"]) return;
		let t = {};
		t[i()["expander-card-id"]] = {
			property: "open",
			value: e
		}, document.dispatchEvent(new CustomEvent("expander-card", {
			detail: t,
			bubbles: !0,
			composed: !0
		}));
	}
	function ce(e) {
		if (e !== void 0) return n()?.user?.name !== void 0 && e.includes(n()?.user?.name);
	}
	function le() {
		if (!oe("expanded")) {
			if (ce(i()["start-expanded-users"])) fe(!0);
			else if (ie === void 0) ue();
			else try {
				let e = localStorage.getItem(ae);
				if (e === null) {
					ue();
					return;
				}
				fe(e ? e === "true" : q(s));
			} catch (e) {
				console.error(e), fe(!1);
			}
		}
	}
	function ue() {
		i().expanded === void 0 ? fe(!1) : fe(i().expanded);
	}
	function de(e) {
		q(d) && (clearTimeout(q(d)), P(d, null));
		let t = e === void 0 ? !q(s) : e;
		i().animation ? (se(t), P(u, t ? "opening" : "closing", !0), t ? (pe(!0), P(d, setTimeout(() => {
			P(u, "idle"), P(d, null);
		}, 350), !0)) : P(d, setTimeout(() => {
			pe(!1), P(u, "idle"), P(d, null);
		}, 350), !0)) : fe(t);
	}
	function fe(e) {
		pe(e), se(e);
	}
	function pe(e) {
		if (P(s, e, !0), !r() && ie !== void 0) try {
			localStorage.setItem(ae, q(s) ? "true" : "false");
		} catch (e) {
			console.error(e);
		}
		q(s) && q(f) === 0 && P(f, .35);
	}
	function me(e) {
		let t = e.detail?.rawConfig;
		t && JSON.stringify(t) !== JSON.stringify(q(S)) && P(S, t, !0);
	}
	function he(e) {
		let t = e.detail?.["expander-card"]?.data;
		if (t?.["expander-card-id"] && t["expander-card-id"] === i()["expander-card-id"]) {
			if (t.action === "open" && !q(s)) {
				de(!0);
				return;
			}
			if (t.action === "close" && q(s)) {
				de(!1);
				return;
			}
			t.action === "toggle" && de();
		}
	}
	function ge(e) {
		e.stopPropagation();
	}
	function _e() {
		t.$$host.removeEventListener("card-updated", ge), document.body.removeEventListener("ll-custom", he), document.body.removeEventListener("expander-card-raw-config-updated", me), Object.entries(b).forEach(([e, t]) => {
			t.then((t) => {
				t(), delete b[e];
			}).catch(() => {});
		}), Object.entries(y).forEach(([e, t]) => {
			t.then((t) => {
				t(), delete y[e];
			}).catch(() => {});
		}), Object.entries(v).forEach(([e, t]) => {
			t(), delete v[e];
		});
	}
	let C = (e) => {
		i().haptic && i().haptic !== "none" && Bi(e, i().haptic);
	}, w, T = !1, ve = 0, ye = 0, be = (e) => {
		q(_) && (q(_).disabled = !0), w = e.target, ve = e.touches[0].clientX, ye = e.touches[0].clientY, T = !1;
	}, xe = (e) => {
		let t = e.touches[0].clientX, n = e.touches[0].clientY;
		T = Math.abs(t - ve) > 10 || Math.abs(n - ye) > 10;
	}, Se = () => {
		q(_) && (q(_).disabled = !1), w = void 0, T = !1;
	}, Ce = () => {
		q(_) && (q(_).disabled = !1);
	}, we = (e) => {
		!T && w === e.target && i()["title-card-clickable"] && (C(w), de(), P(a, !0), P(o, window.setTimeout(() => {
			P(a, !1), P(o, null);
		}, 100), !0), q(_) && (q(_).startPressAnimation(), q(_).endPressAnimation())), w = void 0, T = !1;
	}, Te = (e) => {
		for (let t of Object.values(i().variables ?? {})) la(t.value_template) ? y[t.variable] = ua(e, (n) => {
			da(e, t.variable, n);
		}, t.value_template, { config: i() }) : da(e, t.variable, t.value_template);
	}, Ee = (e) => {
		v["expander-card"] = pa(e, "expander-card");
	}, De = () => {
		if (!i().templates) return;
		let e = Object.values(i().variables || {}).reduce((e, t) => (e[t.variable] = void 0, e), {}), t = ca({
			config: i(),
			expanderCard: {}
		}, e);
		Te(t), Ee(t), Object.values(i().templates || {}).forEach((e) => {
			la(e.value_template) ? b[e.template] = ua(t, (t) => {
				q(x)[e.template] = t;
			}, e.value_template, { config: i() }) : q(x)[e.template] = e.value_template;
		});
	};
	function Oe() {
		if (oe("expanded")) return;
		let e = i()["min-width-expanded"], t = i()["max-width-expanded"], n = document.body.offsetWidth;
		e && t ? i().expanded = n >= e && n <= t : e ? i().expanded = n >= e : t && (i().expanded = n <= t);
	}
	function ke() {
		if (r() && q(S)["preview-expanded"] !== !1) pe(!0);
		else if (oe("expanded")) {
			let e = J(() => q(x).expanded);
			fe(e !== void 0 && !!e);
		} else le();
	}
	function Ae() {
		if (i()["title-card-clickable"] && !i()["title-card-button-overlay"] && q(h)) return q(h);
		if (q(g)) return q(g);
	}
	qr(() => {
		De(), se(!1), Oe(), ke(), t.$$host.addEventListener("card-updated", ge), document.body.addEventListener("ll-custom", he), document.body.addEventListener("expander-card-raw-config-updated", me);
		let e = Ae();
		return e && (e.addEventListener("touchstart", be, {
			passive: !0,
			capture: !0
		}), e.addEventListener("touchmove", xe, {
			passive: !0,
			capture: !0
		}), e.addEventListener("touchcancel", Se, {
			passive: !0,
			capture: !0
		}), e.addEventListener("touchend", Ce, {
			passive: !0,
			capture: !0
		}), e.addEventListener("touchend", we, {
			passive: !1,
			capture: !1
		})), i()["title-card-clickable"] && i()["title-card-button-overlay"] && q(h) && new ResizeObserver(() => {
			if (q(g) && q(h) && q(m)) {
				let e = q(h).getBoundingClientRect();
				P(p, e.height - parseFloat(getComputedStyle(q(g)).marginTop) - parseFloat(getComputedStyle(q(g)).marginBottom) + parseFloat(getComputedStyle(q(m)).paddingTop) + parseFloat(getComputedStyle(q(m)).paddingBottom));
			}
		}).observe(q(h)), _e;
	});
	let je = (e) => {
		if (!q(a)) C(e.currentTarget), de();
		else return e.preventDefault(), e.stopImmediatePropagation(), P(a, !1), q(o) && (clearTimeout(q(o)), P(o, null)), !1;
	};
	var Me = {
		get hass() {
			return n();
		},
		set hass(e) {
			n(e), M();
		},
		get preview() {
			return r();
		},
		set preview(e) {
			r(e), M();
		},
		get config() {
			return i();
		},
		set config(e = ao) {
			i(e), M();
		}
	}, Ne = fo(), Pe = vn(Ne), Fe = (e) => {
		var t = co(), a = vn(t);
		zi(vn(a), {
			get hass() {
				return n();
			},
			get preview() {
				return r();
			},
			get config() {
				return i()["title-card"];
			},
			animation: !1,
			open: !0,
			animationState: "idle",
			get clearCardCss() {
				return i()["clear-children"];
			}
		}), We(a);
		var o = xn(a, 2), c = (e) => {
			var t = so(), n = vn(t);
			Bn(() => vi(n, "icon", q(te)));
			var r = xn(n, 2), a = (e) => {
				var t = oo();
				Ci(t, (e) => P(_, e), () => q(_)), Y(e, t);
			};
			Jr(r, (e) => {
				(!i()["title-card-clickable"] || i()["title-card-button-overlay"]) && e(a);
			}), We(t), Ci(t, (e) => P(g, e), () => q(g)), Bn(() => {
				pi(t, `--overlay-margin:${i()["overlay-margin"] ?? ""}; --button-background:${i()["button-background"] ?? ""}; --header-color:${i()["header-color"] ?? ""};`), di(t, 1, `header ${i()["title-card-button-overlay"] ? " header-overlay" : ""}${q(s) ? " open" : " close"}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq"), pi(n, `--arrow-color:${q(re) ?? ""}`), di(n, 1, `ico${q(s) && q(u) !== "closing" ? " flipped open" : " close"}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq");
			}), Sr("click", t, function(...e) {
				(!i()["title-card-clickable"] || i()["title-card-button-overlay"] ? je : null)?.apply(this, e);
			}), Y(e, t);
		};
		Jr(o, (e) => {
			q(l) && e(c);
		});
		var d = xn(o, 2), f = (e) => {
			var t = oo();
			Ci(t, (e) => P(_, e), () => q(_)), Y(e, t);
		};
		Jr(d, (e) => {
			i()["title-card-clickable"] && !i()["title-card-button-overlay"] && e(f);
		}), We(t), Ci(t, (e) => P(h, e), () => q(h)), Bn(() => {
			di(t, 1, `title-card-header${i()["title-card-button-overlay"] ? "-overlay" : ""}${q(s) ? " open" : " close"}${i().animation ? " animation " + q(u) : ""}${i()["title-card-clickable"] ? " clickable" : ""}`, "svelte-1jqiztq"), _i(t, "role", i()["title-card-clickable"] && !i()["title-card-button-overlay"] ? "button" : void 0), di(a, 1, `title-card-container${q(s) ? " open" : " close"}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq"), pi(a, `--title-padding:${(i()["title-card-padding"] ? i()["title-card-padding"] : "0px") ?? ""};`);
		}), Sr("click", t, function(...e) {
			(i()["title-card-clickable"] && !i()["title-card-button-overlay"] ? je : null)?.apply(this, e);
		}), Y(e, t);
	}, Ie = (e) => {
		var t = Mr(), n = yn(t), r = (e) => {
			var t = lo(), n = vn(t), r = bn(n, !0), a = xn(n, 2);
			Bn(() => vi(a, "icon", q(te))), Ci(xn(a, 2), (e) => P(_, e), () => q(_)), We(t), Ci(t, (e) => P(g, e), () => q(g)), Bn(() => {
				di(t, 1, `header${q(s) ? " open" : " close"}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq"), pi(t, `--header-width:100%; --button-background:${i()["button-background"] ?? ""};--header-color:${i()["header-color"] ?? ""};`), di(n, 1, `primary title${q(s) ? " open" : " close"}`, "svelte-1jqiztq"), zr(r, q(ne)), pi(a, `--arrow-color:${q(re) ?? ""}`), di(a, 1, `ico${q(s) && q(u) !== "closing" ? " flipped open" : " close"}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq");
			}), Sr("click", t, je), Y(e, t);
		};
		Jr(n, (e) => {
			q(l) && e(r);
		}), Y(e, t);
	};
	Jr(Pe, (e) => {
		i()["title-card"] ? e(Fe) : e(Ie, -1);
	});
	var Le = xn(Pe, 2), Re = (e) => {
		var t = uo(), a = vn(t);
		Qr(a, 20, () => i().cards, (e) => e, (e, t) => {
			{
				let a = /* @__PURE__ */ At(() => q(s) && r());
				zi(e, {
					get hass() {
						return n();
					},
					get preview() {
						return q(a);
					},
					get config() {
						return t;
					},
					get marginTop() {
						return i()["child-margin-top"];
					},
					get open() {
						return q(s);
					},
					get animation() {
						return i().animation;
					},
					get animationState() {
						return q(u);
					},
					get clearCardCss() {
						return i()["clear-children"];
					}
				});
			}
		}), We(a), We(t), Bn(() => {
			di(t, 1, `children-wrapper ${i().animation ? "animation " + q(u) : ""}${q(s) ? " open" : " close"}`, "svelte-1jqiztq"), pi(a, `--expander-card-display:${i()["expander-card-display"] ?? ""};
                --gap:${(q(s) && q(u) !== "closing" ? i()["expanded-gap"] : i().gap) ?? ""};
                --child-padding:${(q(s) && q(u) !== "closing" ? i()["child-padding"] : "0px") ?? ""};`), di(a, 1, `children-container${q(s) ? " open" : " close"}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq");
		}), Y(e, t);
	};
	Jr(Le, (e) => {
		i().cards && e(Re);
	});
	var ze = xn(Le, 2), Be = (e) => {
		var t = Mr();
		ii(yn(t), () => q(ee)), Y(e, t);
	};
	return Jr(ze, (e) => {
		q(ee) && e(Be);
	}), We(Ne), Ci(Ne, (e) => P(m, e), () => q(m)), Bn(() => {
		di(Ne, 1, `expander-card${i().clear ? " clear" : ""}${q(s) ? " open" : " close"} ${q(u)}${i().animation ? " animation " + q(u) : ""}`, "svelte-1jqiztq"), pi(Ne, `--expander-card-display:${i()["expander-card-display"] ?? ""};
     --gap:${(q(s) && q(u) !== "closing" ? i()["expanded-gap"] : i().gap) ?? ""}; --padding:${i().padding ?? ""};
     --expander-state:${q(s) ?? ""};
     --icon-rotate-degree:${i()["icon-rotate-degree"] ?? ""};
     --card-background:${(q(s) && q(u) !== "closing" && i()["expander-card-background-expanded"] ? i()["expander-card-background-expanded"] : i()["expander-card-background"]) ?? ""};
     --background-animation-duration:${q(f) ?? ""}s;
     --expander-card-overlay-height:${q(p) ? `${q(p)}px` : "auto"};
    `);
	}), Y(e, Ne), ft(Me);
}
Cr(["click"]), customElements.define("expander-card", Mi(mo, {
	hass: {},
	preview: {},
	config: {}
}, [], [], { mode: "open" }, (e) => class extends e {
	config;
	static async getConfigElement() {
		return await b(), document.createElement("expander-card-editor");
	}
	static getStubConfig() {
		return {
			type: "custom:expander-card",
			title: "Expander Card",
			cards: []
		};
	}
	setConfig(e = {}) {
		this.config = {
			...ao,
			...e
		};
	}
}));
// package.json
var ho = "7.3.6", go = globalThis, _o = go.ShadowRoot && (go.ShadyCSS === void 0 || go.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, vo = Symbol(), yo = /* @__PURE__ */ new WeakMap(), bo = class {
	constructor(e, t, n) {
		if (this._$cssResult$ = !0, n !== vo) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, t = this.t;
		if (_o && e === void 0) {
			let n = t !== void 0 && t.length === 1;
			n && (e = yo.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && yo.set(t, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, xo = (e) => new bo(typeof e == "string" ? e : e + "", void 0, vo), So = (e, ...t) => new bo(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, vo), Co = (e, t) => {
	if (_o) e.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let n of t) {
		let t = document.createElement("style"), r = go.litNonce;
		r !== void 0 && t.setAttribute("nonce", r), t.textContent = n.cssText, e.appendChild(t);
	}
}, wo = _o ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return xo(t);
})(e) : e, { is: To, defineProperty: Eo, getOwnPropertyDescriptor: Do, getOwnPropertyNames: Oo, getOwnPropertySymbols: ko, getPrototypeOf: Ao } = Object, jo = globalThis, Mo = jo.trustedTypes, No = Mo ? Mo.emptyScript : "", Po = jo.reactiveElementPolyfillSupport, Fo = (e, t) => e, Io = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? No : null;
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
}, Lo = (e, t) => !To(e, t), Ro = {
	attribute: !0,
	type: String,
	converter: Io,
	reflect: !1,
	useDefault: !1,
	hasChanged: Lo
};
Symbol.metadata ??= Symbol("metadata"), jo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var zo = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = Ro) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && Eo(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = Do(this.prototype, e) ?? {
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
		return this.elementProperties.get(e) ?? Ro;
	}
	static _$Ei() {
		if (this.hasOwnProperty(Fo("elementProperties"))) return;
		let e = Ao(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(Fo("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Fo("properties"))) {
			let e = this.properties, t = [...Oo(e), ...ko(e)];
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
			for (let e of n) t.unshift(wo(e));
		} else e !== void 0 && t.push(wo(e));
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
		this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
	}
	addController(e) {
		(this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
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
		return Co(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? Io : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? Io : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? Lo)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
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
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
zo.elementStyles = [], zo.shadowRootOptions = { mode: "open" }, zo[Fo("elementProperties")] = /* @__PURE__ */ new Map(), zo[Fo("finalized")] = /* @__PURE__ */ new Map(), Po?.({ ReactiveElement: zo }), (jo.reactiveElementVersions ??= []).push("2.1.2");
// node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js
var Bo = globalThis, Vo = (e) => e, Ho = Bo.trustedTypes, Uo = Ho ? Ho.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Wo = "$lit$", Go = `lit$${Math.random().toFixed(9).slice(2)}$`, Ko = "?" + Go, qo = `<${Ko}>`, Jo = document, Yo = () => Jo.createComment(""), Xo = (e) => e === null || typeof e != "object" && typeof e != "function", Zo = Array.isArray, Qo = (e) => Zo(e) || typeof e?.[Symbol.iterator] == "function", $o = "[ 	\n\f\r]", es = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ts = /-->/g, ns = />/g, rs = RegExp(`>|${$o}(?:([^\\s"'>=/]+)(${$o}*=${$o}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), is = /'/g, as = /"/g, os = /^(?:script|style|textarea|title)$/i, ss = ((e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}))(1), cs = Symbol.for("lit-noChange"), Q = Symbol.for("lit-nothing"), ls = /* @__PURE__ */ new WeakMap(), us = Jo.createTreeWalker(Jo, 129);
function ds(e, t) {
	if (!Zo(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return Uo === void 0 ? t : Uo.createHTML(t);
}
var fs = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = es;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === es ? c[1] === "!--" ? o = ts : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = rs) : (os.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = rs) : o = ns : o === rs ? c[0] === ">" ? (o = i ?? es, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? rs : c[3] === "\"" ? as : is) : o === as || o === is ? o = rs : o === ts || o === ns ? o = es : (o = rs, i = void 0);
		let d = o === rs && e[t + 1].startsWith("/>") ? " " : "";
		a += o === es ? n + qo : l >= 0 ? (r.push(s), n.slice(0, l) + Wo + n.slice(l) + Go + d) : n + Go + (l === -2 ? t : d);
	}
	return [ds(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, ps = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = fs(t, n);
		if (this.el = e.createElement(l, r), us.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = us.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(Wo)) {
					let t = u[o++], n = i.getAttribute(e).split(Go), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? vs : r[1] === "?" ? ys : r[1] === "@" ? bs : _s
					}), i.removeAttribute(e);
				} else e.startsWith(Go) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (os.test(i.tagName)) {
					let e = i.textContent.split(Go), t = e.length - 1;
					if (t > 0) {
						i.textContent = Ho ? Ho.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], Yo()), us.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], Yo());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === Ko) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(Go, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += Go.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = Jo.createElement("template");
		return n.innerHTML = e, n;
	}
};
function ms(e, t, n = e, r) {
	if (t === cs) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = Xo(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = ms(e, i._$AS(e, t.values), i, r)), t;
}
var hs = class {
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
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? Jo).importNode(t, !0);
		us.currentNode = r;
		let i = us.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new gs(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new xs(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = us.nextNode(), a++);
		}
		return us.currentNode = Jo, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, gs = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = Q, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
		e = ms(this, e, t), Xo(e) ? e === Q || e == null || e === "" ? (this._$AH !== Q && this._$AR(), this._$AH = Q) : e !== this._$AH && e !== cs && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? Qo(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== Q && Xo(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Jo.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ps.createElement(ds(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new hs(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = ls.get(e.strings);
		return t === void 0 && ls.set(e.strings, t = new ps(e)), t;
	}
	k(t) {
		Zo(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(Yo()), this.O(Yo()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = Vo(e).nextSibling;
			Vo(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, _s = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = Q, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = Q;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = ms(this, e, t, 0), a = !Xo(e) || e !== this._$AH && e !== cs, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = ms(this, r[n + o], t, o), s === cs && (s = this._$AH[o]), a ||= !Xo(s) || s !== this._$AH[o], s === Q ? e = Q : e !== Q && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === Q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, vs = class extends _s {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === Q ? void 0 : e;
	}
}, ys = class extends _s {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== Q);
	}
}, bs = class extends _s {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = ms(this, e, t, 0) ?? Q) === cs) return;
		let n = this._$AH, r = e === Q && n !== Q || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== Q && (n === Q || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, xs = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		ms(this, e);
	}
}, Ss = Bo.litHtmlPolyfillSupport;
Ss?.(ps, gs), (Bo.litHtmlVersions ??= []).push("3.3.3");
var Cs = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new gs(t.insertBefore(Yo(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, ws = globalThis, Ts = class extends zo {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Cs(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return cs;
	}
};
Ts._$litElement$ = !0, Ts.finalized = !0, ws.litElementHydrateSupport?.({ LitElement: Ts });
var Es = ws.litElementPolyfillSupport;
Es?.({ LitElement: Ts }), (ws.litElementVersions ??= []).push("4.2.2");
// node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/custom-element.js
var Ds = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, Os = {
	attribute: !0,
	type: String,
	converter: Io,
	reflect: !1,
	hasChanged: Lo
}, ks = (e = Os, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
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
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function As(e) {
	return (t, n) => typeof n == "object" ? ks(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
// node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/state.js
function js(e) {
	return As({
		...e,
		state: !0,
		attribute: !1
	});
}
// node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/base.js
var Ms = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
// node_modules/.pnpm/@lit+reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js
function Ns(e, t) {
	return (n, r, i) => {
		let a = (t) => t.renderRoot?.querySelector(e) ?? null;
		if (t) {
			let { get: e, set: t } = typeof r == "object" ? n : i ?? (() => {
				let e = Symbol();
				return {
					get() {
						return this[e];
					},
					set(t) {
						this[e] = t;
					}
				};
			})();
			return Ms(n, r, { get() {
				let n = e.call(this);
				return n === void 0 && (n = a(this), (n !== null || this.hasUpdated) && t.call(this, n)), n;
			} });
		}
		return Ms(n, r, { get() {
			return a(this);
		} });
	};
}
// node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/directives/if-defined.js
var Ps = (e) => e ?? Q, Fs = So`
  ha-dialog,
  ha-adaptive-dialog {
    --mdc-dialog-min-width: 400px;
    --mdc-dialog-max-width: 600px;
    --mdc-dialog-max-width: min(600px, 95vw);
    --justify-action-buttons: space-between;
    --dialog-container-padding: var(--safe-area-inset-top, 0)
      var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0)
      var(--safe-area-inset-left, 0);
    --dialog-surface-padding: 0px;
  }

  ha-dialog .form,
  ha-adaptive-dialog .form {
    color: var(--primary-text-color);
  }

  a {
    color: var(--primary-color);
  }

  /* make dialog fullscreen on small screens */
  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog,
    ha-adaptive-dialog {
      --mdc-dialog-min-width: 100vw;
      --mdc-dialog-max-width: 100vw;
      --mdc-dialog-min-height: 100vh;
      --mdc-dialog-min-height: 100svh;
      --mdc-dialog-max-height: 100vh;
      --mdc-dialog-max-height: 100svh;
      --dialog-container-padding: 0px;
      --dialog-surface-padding: var(--safe-area-inset-top, 0)
        var(--safe-area-inset-right, 0) var(--safe-area-inset-bottom, 0)
        var(--safe-area-inset-left, 0);
      --vertical-align-dialog: flex-end;
    }
    ha-dialog {
      --ha-dialog-border-radius: var(--ha-border-radius-square);
    }
  }
  .error {
    color: var(--error-color);
  }
`, Is = So`
  ha-dialog,
  ha-adaptive-dialog {
    /* Pin dialog to top so it doesn't jump when content changes size */
    --vertical-align-dialog: flex-start;
    --dialog-surface-margin-top: var(--ha-space-10);
    --mdc-dialog-max-height: calc(
      100vh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );
    --mdc-dialog-max-height: calc(
      100svh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );
    --ha-dialog-max-height: calc(
      100vh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );
    --ha-dialog-max-height: calc(
      100svh - var(--dialog-surface-margin-top) - var(--ha-space-2) - var(
          --safe-area-inset-y,
          0px
        )
    );
  }

  @media all and (max-width: 450px), all and (max-height: 500px) {
    ha-dialog,
    ha-adaptive-dialog {
      /* When in fullscreen, dialog should be attached to top */
      --dialog-surface-margin-top: 0px;
      --mdc-dialog-min-height: 100vh;
      --mdc-dialog-min-height: 100svh;
      --mdc-dialog-max-height: 100vh;
      --mdc-dialog-max-height: 100svh;
      --ha-dialog-max-height: 100vh;
      --ha-dialog-max-height: 100svh;
    }
  }
`;
// \0@oxc-project+runtime@0.155.0/helpers/esm/decorate.js
function Ls(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
// src/title-card/titleCardEditForm.ts
var Rs = "custom:", zs = (e) => e.startsWith(Rs), Bs = (e) => window.customCards?.find((t) => t.type === e), Vs = (e) => e.replace(Rs, ""), $ = class extends Ts {
	constructor(...e) {
		super(...e), this.large = !1, this._config = {}, this._cardGUIMode = !0, this._cardGUIModeAvailable = !0, this._error = !1;
	}
	async showDialog(e) {
		this._params = e, this._config = e.config ?? {}, this.lovelace = e.lovelace, this.large = !1;
	}
	closeDialog() {
		return this._params = void 0, this._config = {}, this.dispatchEvent(new CustomEvent("dialog-closed", { detail: { dialog: this.localName } })), !0;
	}
	_submit() {
		this._params?.submit?.(this._config), this.closeDialog();
	}
	_cancel() {
		this._params?.cancel?.(), this.closeDialog();
	}
	_enlarge() {
		this.large = !this.large;
	}
	_ignoreKeydown(e) {
		e.stopPropagation();
	}
	render() {
		if (!this._params || !this.hass) return Q;
		let e = !this._config.type || this._error || void 0, t = this._params.title ?? "";
		if (this._config.type) {
			let e;
			zs(this._config.type) ? (e = Bs(Vs(this._config.type))?.name, e?.toLowerCase().endsWith(" card") && (e = e.substring(0, e.length - 5))) : e = this.hass.localize(`ui.panel.lovelace.editor.card.${this._config.type}.name`), t = `${t} - ${this.hass.localize("ui.panel.lovelace.editor.edit_card.typed_header", { type: e })}`;
		}
		return ss`
        <ha-dialog
            open
            scrimClickAction
            escapeKeyAction
            @keydown=${this._ignoreKeydown.bind(this)}
            @closed=${this._cancel.bind(this)}
            .heading=${t}
            .width=${this.large ? "full" : "large"}
        >
            <ha-dialog-header slot="header">
                <ha-icon-button
                    slot="navigationIcon"
                    dialogAction="cancel"
                    .label=${this.hass.localize("ui.common.close")}
                >
                    <ha-icon .icon=${"mdi:close"}></ha-icon>
                </ha-icon-button>
                <span slot="title" @click=${this._enlarge.bind(this)}>${t}</span>
            </ha-dialog-header>
            ${this._renderCardEditor()}
            <ha-dialog-footer slot="footer">
                <div slot="primaryAction" @click=${this._submit.bind(this)}>
                    <ha-button
                        appearance="plain"
                        size="s"
                        @click=${this._cancel.bind(this)}
                        dialogInitialFocus
                    >
                        ${this._params.cancelText || this.hass.localize("ui.common.cancel")}
                    </ha-button>
                    <ha-button
                        size="s"
                        @click=${this._submit.bind(this)} 
                        disabled=${Ps(e)}
                    >
                        ${this._params.submitText || this.hass.localize("ui.common.save")}
                    </ha-button>
                </div>
                ${this._renderCardEditorActions()}
            </ha-dialog-footer>
        </ha-dialog>
        `;
	}
	_toggleCardMode() {
		this._cardEditorEl?.toggleMode();
	}
	_deleteCard() {
		this._config = {};
	}
	_cardConfigChanged(e) {
		e.stopPropagation(), this._config = { ...e.detail.config }, this._error = e.detail.error, this._cardGUIModeAvailable = e.detail.guiModeAvailable;
	}
	_cardGUIModeChanged(e) {
		e.stopPropagation(), this._cardGUIMode = e.detail.guiMode, this._cardGUIModeAvailable = e.detail.guiModeAvailable;
	}
	_renderCardEditorActions() {
		if (!this._config.type) return Q;
		let e = this.hass.localize(!this._cardEditorEl || this._cardGUIMode ? "ui.panel.lovelace.editor.edit_card.show_code_editor" : "ui.panel.lovelace.editor.edit_card.show_visual_editor");
		return ss`
            <div slot="secondaryAction">
                <ha-button
                appearance="plain"
                size="s"
                @click=${this._toggleCardMode.bind(this)}
                .disabled=${!this._cardGUIModeAvailable}
                >
                    ${e}
                </ha-button>
                <ha-button
                appearance="plain"
                size="s"
                @click=${this._deleteCard.bind(this)}
                >
                    Change card
                </ha-button>
            </div>
        `;
	}
	_renderCardEditor() {
		let e = this._error ? "blur" : "", t = this._error ? ss` <ha-spinner aria-label="Can't update card"></ha-spinner> ` : "";
		return ss`
        ${this._config.type ? ss`
            <div class="content">
                <div class="element-editor">
                    <hui-card-element-editor
                        .hass=${this.hass}
                        .lovelace=${this.lovelace}
                        .value=${this._config}
                        @config-changed=${this._cardConfigChanged.bind(this)}
                        @GUImode-changed=${this._cardGUIModeChanged.bind(this)}
                    ></hui-card-element-editor>
                </div>
                <div class="element-preview">
                    <hui-card
                        .hass=${this.hass}
                        .config=${this._config}
                        preview
                        class=${e}
                    ></hui-card>
                    ${t}
                </div>
            </div>
            ` : ss`
            <hui-card-picker
                .hass=${this.hass}
                .lovelace=${this.lovelace}
                @config-changed=${this._cardConfigChanged.bind(this)}
            ></hui-card-picker>
            `}
        `;
	}
	static {
		this.styles = [
			Fs,
			Is,
			So`
            :host {
                --code-mirror-max-height: calc(100vh - 176px);
            }

            ha-dialog {
                --dialog-z-index: 6;
                --dialog-content-padding: var(--ha-space-2);
            }

            .content {
                width: 100%;
                max-width: 100%;
            }

            @media all and (max-width: 450px), all and (max-height: 500px) {
            /* overrule the ha-style-dialog max-height on small screens */
                .content {
                    width: 100%;
                    max-width: 100%;
                }
            }

            @media all and (min-width: 451px) and (min-height: 501px) {
                :host([large]) .content {
                    max-width: none;
                }
            }

            .center {
                margin-left: auto;
                margin-right: auto;
            }

            .content {
                display: flex;
                flex-direction: column;
            }

            .content hui-card {
                display: block;
                padding: 4px;
                margin: 0 auto;
                max-width: 390px;
            }
            .content hui-section {
                display: block;
                padding: 4px;
                margin: 0 auto;
                max-width: var(--ha-view-sections-column-max-width, 500px);
            }
            .content .element-editor {
                margin: 0 10px;
            }

            @media (min-width: 1000px) {
                .content {
                    flex-direction: row;
                }
                .content > * {
                    flex-basis: 0;
                    flex-grow: 1;
                    flex-shrink: 1;
                    min-width: 0;
                }
                .content hui-card {
                    padding: 8px 10px;
                    margin: auto 0px;
                    max-width: 500px;
                }
                .content hui-section {
                    padding: 8px 10px;
                    margin: auto 0px;
                    max-width: var(--ha-view-sections-column-max-width, 500px);
                }
            }
            .hidden {
                display: none;
            }
            .element-editor {
                margin-bottom: 8px;
            }
            .blur {
                filter: blur(2px) grayscale(100%);
            }
            .element-preview {
                position: relative;
                height: max-content;
                background: var(--primary-background-color);
                padding: 4px;
                border-radius: var(--ha-border-radius-sm);
                position: sticky;
                top: 0;
            }
            .element-preview ha-spinner {
                top: calc(50% - 24px);
                left: calc(50% - 24px);
                position: absolute;
                z-index: 10;
            }
            hui-card {
                padding-top: 8px;
                margin-bottom: 4px;
                display: block;
                width: 100%;
                box-sizing: border-box;
            }

            [slot="primaryAction"] {
                gap: var(--ha-space-2);
                display: flex;
            }
            [slot="secondaryAction"] {
                gap: var(--ha-space-2);
                display: flex;
                margin-left: 0px;
                margin-right: auto;
                margin-inline-end: auto;
                margin-inline-start: initial;
            }
            [slot="navigationIcon"] {
                --ha-icon-display: block;
            }
        `
		];
	}
};
Ls([As({ attribute: !1 })], $.prototype, "hass", void 0), Ls([As({
	type: Boolean,
	reflect: !0
})], $.prototype, "large", void 0), Ls([As({ attribute: !1 })], $.prototype, "lovelace", void 0), Ls([js()], $.prototype, "_params", void 0), Ls([js()], $.prototype, "_config", void 0), Ls([js()], $.prototype, "_cardGUIMode", void 0), Ls([js()], $.prototype, "_cardGUIModeAvailable", void 0), Ls([js()], $.prototype, "_error", void 0), Ls([Ns("hui-card-element-editor")], $.prototype, "_cardEditorEl", void 0), $ = Ls([Ds("expander-card-title-card-edit-form")], $), console.info(`%c  Expander-Card \n%c Version ${ho}`, "color: orange; font-weight: bold; background: black", "color: white; font-weight: bold; background: dimgray"), window.customCards = window.customCards || [], window.customCards.push({
	type: "expander-card",
	name: "Expander Card",
	preview: !0,
	description: "Expander card"
}), customElements.get("expander-card-title-card-edit-form") || customElements.define("expander-card-title-card-edit-form", $);
export { mo as default };

//# sourceMappingURL=expander-card.js.map