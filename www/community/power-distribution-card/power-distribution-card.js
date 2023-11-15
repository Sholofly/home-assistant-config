function t(t,e,i,n){var o,r=arguments.length,a=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(a=(r<3?o(a):r>3?o(e,i,a):o(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),o=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,n))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:s,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,g=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,m=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!s(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const r=n?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of n){const n=document.createElement("style"),o=e.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??_)(n?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=w.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,C="?"+x,O=`<${C}>`,T=document,D=()=>T.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,M=t=>P(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,L=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),X=new WeakMap,Y=T.createTreeWalker(T,129);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":"",a=I;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===I?"!--"===l[1]?a=R:void 0!==l[1]?a=H:void 0!==l[2]?(B.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=o??I,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?j:'"'===l[3]?z:U):a===z||a===U?a=j:a===R||a===H?a=I:(a=j,o=void 0);const h=a===j&&t[e+1].startsWith("/>")?" ":"";r+=a===I?i+O:c>=0?(n.push(s),i.slice(0,c)+S+i.slice(c)+x+h):i+x+(-2===c?e:h)}return[W(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};let q=class t{constructor({strings:e,_$litType$:i},n){let o;this.parts=[];let r=0,a=0;const s=e.length-1,l=this.parts,[c,d]=F(e,i);if(this.el=t.createElement(c,n),Y.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Y.nextNode())&&l.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=d[a++],i=o.getAttribute(t).split(x),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?Q:"?"===n[1]?tt:"@"===n[1]?et:J}),o.removeAttribute(t)}else t.startsWith(x)&&(l.push({type:6,index:r}),o.removeAttribute(t));if(B.test(o.tagName)){const t=o.textContent.split(x),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],D()),Y.nextNode(),l.push({type:2,index:++r});o.append(t[e],D())}}}else if(8===o.nodeType)if(o.data===C)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(x,t+1));)l.push({type:7,index:r}),t+=x.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}};function G(t,e,i=t,n){if(e===L)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=k(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,n)),e}let K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??T).importNode(e,!0);Y.currentNode=n;let o=Y.nextNode(),r=0,a=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new Z(o,o.nextSibling,this,t):1===s.type?e=new s.ctor(o,s.name,s.strings,this,t):6===s.type&&(e=new it(o,this,t)),this._$AV.push(e),s=i[++a]}r!==s?.index&&(o=Y.nextNode(),r++)}return Y.currentNode=T,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),k(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==L&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):M(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==V&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(T.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new K(n,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new q(t)),e}T(e){P(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,o=0;for(const r of e)o===i.length?i.push(n=new t(this.k(D()),this.k(D()),this,this.options)):n=i[o],n._$AI(r),o++;o<i.length&&(this._$AR(n&&n._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=G(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{const n=t;let a,s;for(t=o[0],a=0;a<o.length-1;a++)s=G(this,n[i+a],e,a),s===L&&(s=this._$AH[a]),r||=!k(s)||s!==this._$AH[a],s===V?t=V:t!==V&&(t+=(s??"")+o[a+1]),this._$AH[a]=s}r&&!n&&this.O(t)}O(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Q=class extends J{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===V?void 0:t}},tt=class extends J{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}},et=class extends J{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===L)return;const i=this._$AH,n=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},it=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}};const nt={j:S,P:x,A:C,C:1,M:F,L:K,R:M,V:G,D:Z,I:J,H:tt,N:et,U:Q,B:it},ot=w.litHtmlPolyfillSupport;ot?.(q,Z),(w.litHtmlVersions??=[]).push("3.0.2");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const rt=globalThis,at=rt.ShadowRoot&&(void 0===rt.ShadyCSS||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,st=Symbol(),lt=new WeakMap;let ct=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==st)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(at&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=lt.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&lt.set(e,t))}return t}toString(){return this.cssText}};const dt=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new ct(i,t,st)},ht=at?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new ct("string"==typeof t?t:t+"",void 0,st))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:ut,defineProperty:pt,getOwnPropertyDescriptor:ft,getOwnPropertyNames:gt,getOwnPropertySymbols:vt,getPrototypeOf:mt}=Object,bt=globalThis,_t=bt.trustedTypes,yt=_t?_t.emptyScript:"",$t=bt.reactiveElementPolyfillSupport,wt=(t,e)=>t,Et={toAttribute(t,e){switch(e){case Boolean:t=t?yt:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},At=(t,e)=>!ut(t,e),St={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:At};Symbol.metadata??=Symbol("metadata"),bt.litPropertyMetadata??=new WeakMap;class xt extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=St){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&pt(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=ft(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const r=n?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??St}static _$Ei(){if(this.hasOwnProperty(wt("elementProperties")))return;const t=mt(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(wt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(wt("properties"))){const t=this.properties,e=[...gt(t),...vt(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(ht(t))}else void 0!==t&&e.push(ht(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(at)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),n=rt.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:Et).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:Et;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??At)(n?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}xt.elementStyles=[],xt.shadowRootOptions={mode:"open"},xt[wt("elementProperties")]=new Map,xt[wt("finalized")]=new Map,$t?.({ReactiveElement:xt}),(bt.reactiveElementVersions??=[]).push("2.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct=globalThis,Ot=Ct.trustedTypes,Tt=Ot?Ot.createPolicy("lit-html",{createHTML:t=>t}):void 0,Dt="$lit$",kt=`lit$${(Math.random()+"").slice(9)}$`,Pt="?"+kt,Mt=`<${Pt}>`,Nt=document,It=()=>Nt.createComment(""),Rt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Ht=Array.isArray,jt="[ \t\n\f\r]",Ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zt=/-->/g,Bt=/>/g,Lt=RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Vt=/'/g,Xt=/"/g,Yt=/^(?:script|style|textarea|title)$/i,Wt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Ft=Symbol.for("lit-noChange"),qt=Symbol.for("lit-nothing"),Gt=new WeakMap,Kt=Nt.createTreeWalker(Nt,129);function Zt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Tt?Tt.createHTML(e):e}const Jt=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":"",a=Ut;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===Ut?"!--"===l[1]?a=zt:void 0!==l[1]?a=Bt:void 0!==l[2]?(Yt.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=Lt):void 0!==l[3]&&(a=Lt):a===Lt?">"===l[0]?(a=o??Ut,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?Lt:'"'===l[3]?Xt:Vt):a===Xt||a===Vt?a=Lt:a===zt||a===Bt?a=Ut:(a=Lt,o=void 0);const h=a===Lt&&t[e+1].startsWith("/>")?" ":"";r+=a===Ut?i+Mt:c>=0?(n.push(s),i.slice(0,c)+Dt+i.slice(c)+kt+h):i+kt+(-2===c?e:h)}return[Zt(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};let Qt=class t{constructor({strings:e,_$litType$:i},n){let o;this.parts=[];let r=0,a=0;const s=e.length-1,l=this.parts,[c,d]=Jt(e,i);if(this.el=t.createElement(c,n),Kt.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Kt.nextNode())&&l.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(Dt)){const e=d[a++],i=o.getAttribute(t).split(kt),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?oe:"?"===n[1]?re:"@"===n[1]?ae:ne}),o.removeAttribute(t)}else t.startsWith(kt)&&(l.push({type:6,index:r}),o.removeAttribute(t));if(Yt.test(o.tagName)){const t=o.textContent.split(kt),e=t.length-1;if(e>0){o.textContent=Ot?Ot.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],It()),Kt.nextNode(),l.push({type:2,index:++r});o.append(t[e],It())}}}else if(8===o.nodeType)if(o.data===Pt)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(kt,t+1));)l.push({type:7,index:r}),t+=kt.length-1}r++}}static createElement(t,e){const i=Nt.createElement("template");return i.innerHTML=t,i}};function te(t,e,i=t,n){if(e===Ft)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=Rt(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=te(t,o._$AS(t,e.values),o,n)),e}class ee{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??Nt).importNode(e,!0);Kt.currentNode=n;let o=Kt.nextNode(),r=0,a=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new ie(o,o.nextSibling,this,t):1===s.type?e=new s.ctor(o,s.name,s.strings,this,t):6===s.type&&(e=new se(o,this,t)),this._$AV.push(e),s=i[++a]}r!==s?.index&&(o=Kt.nextNode(),r++)}return Kt.currentNode=Nt,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ie{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=qt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=te(this,t,e),Rt(t)?t===qt||null==t||""===t?(this._$AH!==qt&&this._$AR(),this._$AH=qt):t!==this._$AH&&t!==Ft&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>Ht(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==qt&&Rt(this._$AH)?this._$AA.nextSibling.data=t:this.$(Nt.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Qt.createElement(Zt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new ee(n,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=Gt.get(t.strings);return void 0===e&&Gt.set(t.strings,e=new Qt(t)),e}T(t){Ht(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new ie(this.k(It()),this.k(It()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=qt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=qt}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=te(this,t,e,0),r=!Rt(t)||t!==this._$AH&&t!==Ft,r&&(this._$AH=t);else{const n=t;let a,s;for(t=o[0],a=0;a<o.length-1;a++)s=te(this,n[i+a],e,a),s===Ft&&(s=this._$AH[a]),r||=!Rt(s)||s!==this._$AH[a],s===qt?t=qt:t!==qt&&(t+=(s??"")+o[a+1]),this._$AH[a]=s}r&&!n&&this.O(t)}O(t){t===qt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class oe extends ne{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===qt?void 0:t}}let re=class extends ne{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==qt)}};class ae extends ne{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=te(this,t,e,0)??qt)===Ft)return;const i=this._$AH,n=t===qt&&i!==qt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==qt&&(i===qt||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class se{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}}const le=Ct.litHtmlPolyfillSupport;le?.(Qt,ie),(Ct.litHtmlVersions??=[]).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ce=class extends xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new ie(e.insertBefore(It(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ft}};ce._$litElement$=!0,ce.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ce});const de=globalThis.litElementPolyfillSupport;de?.({LitElement:ce}),(globalThis.litElementVersions??=[]).push("4.0.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const he=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ue={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_},pe=(t=ue,e,i)=>{const{kind:n,metadata:o}=i;let r=globalThis.litPropertyMetadata.get(o);if(void 0===r&&globalThis.litPropertyMetadata.set(o,r=new Map),r.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const o=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,o,t)},init(e){return void 0!==e&&this.C(n,void 0,t),e}}}if("setter"===n){const{name:n}=i;return function(i){const o=this[n];e.call(this,i),this.requestUpdate(n,o,t)}}throw Error("Unsupported decorator location: "+n)};function fe(t){return(e,i)=>"object"==typeof i?pe(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,n?{...t,wrapped:!0}:t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ge(t){return fe({...t,state:!0,attribute:!1})}var ve,me;function be(){return(be=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ve||(ve={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(me||(me={}));var _e=function(t,e,i){var n=e?function(t){switch(t.number_format){case ve.comma_decimal:return["en-US","en"];case ve.decimal_comma:return["de","es","it"];case ve.space_comma:return["fr","sv","cs"];case ve.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==ve.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,ye(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,ye(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},ye=function(t,e){var i=be({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var n=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=n,i.maximumFractionDigits=n}return i},$e=["closed","locked","off"],we=function(t,e,i,n){n=n||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return o.detail=i,t.dispatchEvent(o),o},Ee=new Set(["call-service","divider","section","weblink","cast","select"]),Ae={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},Se=function(t){we(window,"haptic",t)},xe=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Se("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&we(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),we(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,o=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===o?"homeassistant":o;switch(o){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(r,n,{entity_id:e})})(t,e,$e.includes(t.states[e].state))}(e,i.entity),Se("success"));break;case"call-service":if(!n.service)return void Se("failure");var o=n.service.split(".",2);e.callService(o[0],o[1],n.service_data,n.target),Se("success");break;case"fire-dom-event":we(t,"ll-custom",n)}};function Ce(t){return void 0!==t&&"none"!==t.action}const Oe=["battery","car_charger","consumer","grid","home","hydro","pool","producer","solar","wind","heating","placeholder"],Te={battery:{consumer:!0,icon:"mdi:battery-outline",name:"battery",producer:!0},car_charger:{consumer:!0,icon:"mdi:car-electric",name:"car"},consumer:{consumer:!0,icon:"mdi:lightbulb",name:"consumer"},grid:{icon:"mdi:transmission-tower",name:"grid"},home:{consumer:!0,icon:"mdi:home-assistant",name:"home"},hydro:{icon:"mdi:hydro-power",name:"hydro",producer:!0},pool:{consumer:!0,icon:"mdi:pool",name:"pool"},producer:{icon:"mdi:lightning-bolt-outline",name:"producer",producer:!0},solar:{icon:"mdi:solar-power",name:"solar",producer:!0},wind:{icon:"mdi:wind-turbine",name:"wind",producer:!0},heating:{icon:"mdi:radiator",name:"heating",consumer:!0},placeholder:{name:"placeholder"}},De={decimals:2,display_abs:!0,name:"",unit_of_display:"W"},ke={type:"",title:void 0,animation:"flash",entities:[],center:{type:"none"}},Pe=dt`
  * {
    box-sizing: border-box;
  }

  p {
    margin: 4px 0 4px 0;
    text-align: center;
  }

  .card-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1.5fr;
    column-gap: 10px;
  }

  #center-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column: 2;
    flex-wrap: wrap;
    min-width: 100px;
  }

  #center-panel > div {
    display: flex;
    width: 100%;
    min-height: 150px;
    max-height: 200px;
    flex-basis: 50%;
    flex-flow: column;
  }

  #center-panel > div > p {
    flex: 0 1 auto;
  }

  .bar-wrapper {
    position: relative;

    width: 50%;
    height: 80%;
    margin: auto;

    flex: 1 1 auto;

    background-color: rgba(114, 114, 114, 0.2);
  }

  bar {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--secondary-text-color);
  }

  item {
    display: block;
    overflow: hidden;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .buy-sell {
    height: 28px;
    display: flex;
    flex-direction: column;
    font-size: 11px;
    line-height: 14px;
    text-align: center;
  }

  .grid-buy {
    color: red;
  }

  .grid-sell {
    color: green;
  }

  .placeholder {
    height: 62px;
  }

  #right-panel > item > value {
    float: left;
  }

  #right-panel > item > badge {
    float: right;
  }

  badge {
    float: left;

    width: 50%;
    padding: 4px;

    border: 1px solid;
    border-color: var(--disabled-text-color);
    border-radius: 1em;

    position: relative;
  }

  icon > ha-icon {
    display: block;

    width: 24px;
    margin: 0 auto;

    color: var(--paper-item-icon-color);
  }

  .secondary {
    position: absolute;
    top: 4px;
    right: 8%;
    font-size: 80%;
  }

  value {
    float: right;
    width: 50%;
    min-width: 54px;
  }

  value > p {
    height: 1em;
  }

  table {
    width: 100%;
  }

  /**************
  ARROW ANIMATION
  **************/

  .blank {
    width: 55px;
    height: 4px;
    margin: 8px auto 8px auto;
    opacity: 0.2;
    background-color: var(--secondary-text-color);
  }

  .arrow-container {
    display: flex;
    width: 55px;
    height: 16px;
    overflow: hidden;
    margin: auto;
  }

  .left {
    transform: rotate(180deg);
  }

  .arrow {
    width: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 16px solid var(--secondary-text-color);
    margin: 0 1.5px;
  }

  .flash {
    animation: flash 3s infinite steps(1);
    opacity: 0.2;
  }

  @keyframes flash {
    0%,
    66% {
      opacity: 0.2;
    }
    33% {
      opacity: 0.8;
    }
  }

  .delay-1 {
    animation-delay: 1s;
  }
  .delay-2 {
    animation-delay: 2s;
  }

  .slide {
    animation: slide 1.5s linear infinite both;
    position: relative;
    left: -19px;
  }

  @keyframes slide {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
    }
    100% {
      -webkit-transform: translateX(19px);
      transform: translateX(19px);
    }
  }
`,Me=Wt`
  <style>
    /**********
    Mobile View
    **********/
    .card-content {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .placeholder {
      height: 114px !important;
    }
    item > badge,
    item > value {
      display: block;
      float: none !important;

      width: 72px;
      margin: 0 auto;
    }

    .arrow {
      margin: 0px 8px;
    }
  </style>
`;var Ne={version:"Version",description:"A Lovelace Card for visualizing power distributions.",invalid_configuration:"Invalid configuration",show_warning:"Show Warning"},Ie={actions:{add:"Add",edit:"Edit",remove:"Remove",save:"Save"},optional:"Optional",required:"Required",settings:{action_settings:"Action Settings",animation:"Animation",autarky:"autarky",attribute:"Attribute",background_color:"Background Color",battery_percentage:"Battery Charge %",bigger:"Bigger",calc_excluded:"Excluded from Calculations",center:"Center",color:"Color","color-settings":"Color Settings",color_threshold:"Color Threshold",decimals:"Decimals","display-abs":"Display Absolute Value",double_tap_action:"Double Tap Action",entities:"Entities",entity:"Entity",equal:"Equal","grid-buy":"Grid Buy","grid-sell":"Grid Sell","hide-arrows":"Hide Arrows",icon:"Icon","invert-value":"Invert Value",name:"Name",preset:"Preset",ratio:"ratio",replace_name:"Replace Name","secondary-info":"Secondary Info",settings:"settings",smaller:"Smaller",tap_action:"Tap Action",threshold:"Threshold",title:"Title",unit_of_display:"Unit of Display",value:"value"}},Re={common:Ne,editor:Ie},He={version:"Version",description:"Eine Karte zur Visualizierung von Stromverteilungen",invalid_configuration:"Ungültige Konfiguration",show_warning:"Warnung"},je={actions:{add:"Hinzufügen",edit:"Bearbeiten",remove:"Entfernen",save:"Speichern"},optional:"Optional",required:"Erforderlich",settings:{action_settings:"Interaktions Einstellungen",animation:"Animation",autarky:"Autarkie",attribute:"Attribut",background_color:"Hintergrundfarbe",battery_percentage:"Batterie Ladung %",bigger:"Größer ",calc_excluded:"Von Rechnungen ausschließen",center:"Mittelbereich",color:"Farbe","color-settings":"Farb Einstellungen",color_threshold:"Farb-Schwellenwert",decimals:"Dezimalstellen","display-abs":"Absolute Wertanzeige",double_tap_action:"Doppel Tipp Aktion",entities:"Entities",entity:"Element",equal:"Gleich","grid-buy":"Netz Ankauf","grid-sell":"Netz Verkauf","hide-arrows":"Pfeile Verstecken",icon:"Symbol","invert-value":"Wert Invertieren",name:"Name",preset:"Vorlagen",ratio:"Anteil",replace_name:"Namen Ersetzen","secondary-info":"Zusatzinformationen",settings:"Einstellungen",smaller:"Kleiner",tap_action:"Tipp Aktion",threshold:"Schwellenwert",title:"Titel",unit_of_display:"Angezeigte Einheit",value:"Wert"}},Ue={common:He,editor:je},ze={version:"Verzia",description:"A Lovelace Card for visualizing power distributions.",invalid_configuration:"Chybná konfigurácia",show_warning:"Zobraziť upozornenia"},Be={actions:{add:"Pridať",edit:"Editovať",remove:"Odobrať",save:"Uložiť"},optional:"Voliteľné",required:"Požadované",settings:{action_settings:"Nastavenia akcie",animation:"Animácia",autarky:"sebestačnosť",attribute:"Atribút",background_color:"Farba pozadia",battery_percentage:"Nabitie batérie %",bigger:"Väčšie",calc_excluded:"Vylúčené z výpočtov",center:"Centrum",color:"Farba","color-settings":"Nastavenia farby",color_threshold:"Prah farby",decimals:"Desatinné čísla","display-abs":"Zobraziť absolútnu hodnotu",double_tap_action:"Akcia dvojitého klepnutia",entities:"Entity",entity:"Entita",equal:"Rovné","grid-buy":"Sieť nákup","grid-sell":"Sieť predaj","hide-arrows":"Skryť šípky",icon:"Ikona","invert-value":"Invertovať hodnotu",name:"Názov",preset:"Predvoľba",ratio:"pomer",replace_name:"Nahradiť názov","secondary-info":"Sekundárne informácie",settings:"nastavenia",smaller:"Menšie",tap_action:"Akcia klepnutia",threshold:"Prah",title:"Titul",unit_of_display:"Jednotka zobrazenia",value:"hodnota"}},Le={common:ze,editor:Be};const Ve={en:Object.freeze({__proto__:null,common:Ne,default:Re,editor:Ie}),de:Object.freeze({__proto__:null,common:He,default:Ue,editor:je}),sk:Object.freeze({__proto__:null,common:ze,default:Le,editor:Be})};function Xe(t,e=!1,i="",n=""){const o=(localStorage.getItem("selectedLanguage")||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce(((t,e)=>t[e]),Ve[o])}catch(e){r=t.split(".").reduce(((t,e)=>t[e]),Ve.en)}return void 0===r&&(r=t.split(".").reduce(((t,e)=>t[e]),Ve.en)),""!==i&&""!==n&&(r=r.replace(i,n)),e?function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(r):r}var Ye=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var i=-1;return t.some((function(t,n){return t[0]===e&&(i=n,!0)})),i}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var i=t(this.__entries__,e),n=this.__entries__[i];return n&&n[1]},e.prototype.set=function(e,i){var n=t(this.__entries__,e);~n?this.__entries__[n][1]=i:this.__entries__.push([e,i])},e.prototype.delete=function(e){var i=this.__entries__,n=t(i,e);~n&&i.splice(n,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var i=0,n=this.__entries__;i<n.length;i++){var o=n[i];t.call(e,o[1],o[0])}},e}()}(),We="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,Fe="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),qe="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(Fe):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)};var Ge=["top","right","bottom","left","width","height","size","weight"],Ke="undefined"!=typeof MutationObserver,Ze=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var i=!1,n=!1,o=0;function r(){i&&(i=!1,t()),n&&s()}function a(){qe(r)}function s(){var t=Date.now();if(i){if(t-o<2)return;n=!0}else i=!0,n=!1,setTimeout(a,e);o=t}return s}(this.refresh.bind(this),20)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,i=e.indexOf(t);~i&&e.splice(i,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){We&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),Ke?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){We&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,i=void 0===e?"":e;Ge.some((function(t){return!!~i.indexOf(t)}))&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),Je=function(t,e){for(var i=0,n=Object.keys(e);i<n.length;i++){var o=n[i];Object.defineProperty(t,o,{value:e[o],enumerable:!1,writable:!1,configurable:!0})}return t},Qe=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||Fe},ti=ai(0,0,0,0);function ei(t){return parseFloat(t)||0}function ii(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];return e.reduce((function(e,i){return e+ei(t["border-"+i+"-width"])}),0)}function ni(t){var e=t.clientWidth,i=t.clientHeight;if(!e&&!i)return ti;var n=Qe(t).getComputedStyle(t),o=function(t){for(var e={},i=0,n=["top","right","bottom","left"];i<n.length;i++){var o=n[i],r=t["padding-"+o];e[o]=ei(r)}return e}(n),r=o.left+o.right,a=o.top+o.bottom,s=ei(n.width),l=ei(n.height);if("border-box"===n.boxSizing&&(Math.round(s+r)!==e&&(s-=ii(n,"left","right")+r),Math.round(l+a)!==i&&(l-=ii(n,"top","bottom")+a)),!function(t){return t===Qe(t).document.documentElement}(t)){var c=Math.round(s+r)-e,d=Math.round(l+a)-i;1!==Math.abs(c)&&(s-=c),1!==Math.abs(d)&&(l-=d)}return ai(o.left,o.top,s,l)}var oi="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof Qe(t).SVGGraphicsElement}:function(t){return t instanceof Qe(t).SVGElement&&"function"==typeof t.getBBox};function ri(t){return We?oi(t)?function(t){var e=t.getBBox();return ai(0,0,e.width,e.height)}(t):ni(t):ti}function ai(t,e,i,n){return{x:t,y:e,width:i,height:n}}var si=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=ai(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=ri(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),li=function(t,e){var i=function(t){var e=t.x,i=t.y,n=t.width,o=t.height,r="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,a=Object.create(r.prototype);return Je(a,{x:e,y:i,width:n,height:o,top:i,right:e+n,bottom:o+i,left:e}),a}(e);Je(this,{target:t,contentRect:i})},ci=function(){function t(t,e,i){if(this.activeObservations_=[],this.observations_=new Ye,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=i}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Qe(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new si(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Qe(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new li(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),di="undefined"!=typeof WeakMap?new WeakMap:new Ye,hi=function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var i=Ze.getInstance(),n=new ci(e,i,this);di.set(this,n)};["observe","unobserve","disconnect"].forEach((function(t){hi.prototype[t]=function(){var e;return(e=di.get(this))[t].apply(e,arguments)}}));var ui=void 0!==Fe.ResizeObserver?Fe.ResizeObserver:hi,pi=Object.freeze({__proto__:null,default:ui});function fi(t,e,i){const n=new CustomEvent(e,{bubbles:!1,composed:!1,detail:i});t.dispatchEvent(n)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gi=2,vi=t=>(...e)=>({_$litDirective$:t,values:e});class mi{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const bi=(t,e)=>{if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){if(t.constructor!==e.constructor)return!1;let i,n;if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(i=n;0!=i--;)if(!bi(t[i],e[i]))return!1;return!0}if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(i of t.entries())if(!e.has(i[0]))return!1;for(i of t.entries())if(!bi(i[1],e.get(i[0])))return!1;return!0}if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(i of t.entries())if(!e.has(i[0]))return!1;return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(e)){if(n=t.length,n!==e.length)return!1;for(i=n;0!=i--;)if(t[i]!==e[i])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();const o=Object.keys(t);if(n=o.length,n!==Object.keys(e).length)return!1;for(i=n;0!=i--;)if(!Object.prototype.hasOwnProperty.call(e,o[i]))return!1;for(i=n;0!=i--;){const n=o[i];if(!bi(t[n],e[n]))return!1}return!0}return t!=t&&e!=e},_i=["more-info","toggle","navigate","url","call-service","none"];class yi extends HTMLElement{constructor(){super(...arguments),this.holdTime=500}bind(t,e={}){t.actionHandler&&bi(e,t.actionHandler.options)||(t.actionHandler&&t.removeEventListener("click",t.actionHandler.end),t.actionHandler={options:e},e.disabled||(t.actionHandler.end=i=>{const n=t;i.cancelable&&i.preventDefault(),clearTimeout(this.timer),this.timer=void 0,e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,we(n,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,we(n,"action",{action:"double_tap"})):we(n,"action",{action:"tap"})},t.addEventListener("click",t.actionHandler.end)))}}customElements.define("action-handler-power-distribution-card",yi);const $i=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-power-distribution-card"))return t.querySelector("action-handler-power-distribution-card");const e=document.createElement("action-handler-power-distribution-card");return t.appendChild(e),e})();i&&i.bind(t,e)},wi=vi(class extends mi{update(t,[e]){return $i(t.element,e),Ft}render(t){}});var Ei="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",Ai="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";let Si=class extends ce{render(){var t,e,i,n,o,r,a,s;if(!this.hass||!this.config||"placeholder"==this.config.preset)return Wt``;const l=this.config;let c=[];l.entity&&(c=Object.keys(Object.assign({},null===(t=this.hass)||void 0===t?void 0:t.states[l.entity||0].attributes))||[]);let d=[];return l.secondary_info_entity&&(d=Object.keys(Object.assign({},null===(e=this.hass)||void 0===e?void 0:e.states[l.secondary_info_entity].attributes))||[]),Wt`
      <div class="side-by-side">
        <ha-icon-picker
          .label="${Xe("editor.settings.icon")}  (${Xe("editor.optional")})"
          .value=${l.icon}
          .configValue=${"icon"}
          @value-changed=${this._valueChanged}
        ></ha-icon-picker>
        <ha-textfield
          label="${Xe("editor.settings.name")} (${Xe("editor.optional")})"
          .value=${l.name||void 0}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
      <div class="side-by-side">
        <ha-entity-picker
          label="${Xe("editor.settings.entity")} (${Xe("editor.required")})"
          allow-custom-entity
          hideClearIcon
          .hass=${this.hass}
          .configValue=${"entity"}
          .value=${l.entity}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-select
          label="${Xe("editor.settings.attribute")} (${Xe("editor.optional")})"
          .configValue=${"attribute"}
          .value=${l.attribute||""}
          @selected=${this._valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          ${c.length>0?Wt`<mwc-list-item></mwc-list-item>`:""}
          ${c.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>
      </div>
      <div class="side-by-side">
        <ha-select
          label="${Xe("editor.settings.preset")}"
          .configValue=${"preset"}
          .value=${l.preset||Oe[0]}
          @selected=${this._valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          ${Oe.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>
        <div class="checkbox">
          <input
            type="checkbox"
            id="hide-arrows"
            .checked="${l.hide_arrows||!1}"
            .configValue=${"hide_arrows"}
            @change=${this._valueChanged}
          />
          <label for="hide-arrows"> ${Xe("editor.settings.hide-arrows")}</label>
        </div>
      </div>
      <div class="side-by-side">${this._renderPresetFeatures()}</div>
      <br /><br />
      <h3>${Xe("editor.settings.value",!0)} ${Xe("editor.settings.settings",!0)}</h3>
      <div class="side-by-side">
        <ha-textfield
          label="${Xe("editor.settings.unit_of_display")}"
          .value=${l.unit_of_display||""}
          .configValue=${"unit_of_display"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-textfield
          auto-validate
          pattern="[0-9]"
          label="${Xe("editor.settings.decimals")}"
          .value=${l.decimals||""}
          .configValue=${"decimals"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
      <div class="side-by-side">
        <div class="checkbox">
          <input
            type="checkbox"
            id="invert-value"
            .checked="${l.invert_value||!1}"
            .configValue=${"invert_value"}
            @change=${this._valueChanged}
          />
          <label for="invert-value"> ${Xe("editor.settings.invert-value")}</label>
        </div>
        <div class="checkbox">
          <input
            type="checkbox"
            id="display-abs"
            .checked="${0!=l.display_abs}"
            .configValue=${"display_abs"}
            @change=${this._valueChanged}
          />
          <label for="display-abs"> ${Xe("editor.settings.display-abs")} </label>
        </div>
      </div>
      <div class="side-by-side">
        <div class="checkbox">
          <input
            type="checkbox"
            id="calc_excluded"
            .checked="${l.calc_excluded}"
            .configValue=${"calc_excluded"}
            @change=${this._valueChanged}
          />
          <label for="calc_excluded"> ${Xe("editor.settings.calc_excluded")} </label>
        </div>
        <ha-textfield
          label="${Xe("editor.settings.threshold")}"
          .value=${l.threshold||""}
          .configValue=${"threshold"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
      <br />
      <h3>${Xe("editor.settings.secondary-info",!0)}</h3>
      <div class="side-by-side">
        <ha-entity-picker
          label="${Xe("editor.settings.entity")}"
          allow-custom-entity
          hideClearIcon
          .hass=${this.hass}
          .configValue=${"secondary_info_entity"}
          .value=${l.secondary_info_entity}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-select
          allow-custom-entity
          label="${Xe("editor.settings.attribute")} (${Xe("editor.optional")})"
          .value=${l.secondary_info_attribute||""}
          .configValue=${"secondary_info_attribute"}
          @value-changed=${this._valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          ${d.length>0?Wt`<mwc-list-item></mwc-list-item>`:void 0}
          ${d.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>
      </div>
      <div class="checkbox">
        <input
          type="checkbox"
          id="secondary_info_replace_name"
          .checked="${l.secondary_info_replace_name||!1}"
          .configValue=${"secondary_info_replace_name"}
          @change=${this._valueChanged}
        />
        <label for="secondary_info_replace_name"> ${Xe("editor.settings.replace_name")}</label>
      </div>
      <br />
      <h3>${Xe("editor.settings.color-settings",!0)}</h3>
      <ha-textfield
        label="${Xe("editor.settings.color_threshold")}"
        .value=${l.color_threshold||0}
        .configValue=${"color_threshold"}
        @input=${this._valueChanged}
      ></ha-textfield>
      <table>
        <tr>
          <th>Element</th>
          <th>&gt; ${l.color_threshold||0}</th>
          <th>= ${l.color_threshold||0}</th>
          <th>&lt; ${l.color_threshold||0}</th>
        </tr>
        <tr>
          <th>icon</th>
          <td>
            <ha-textfield
              label="${Xe("editor.settings.bigger")}"
              .value=${(null===(i=l.icon_color)||void 0===i?void 0:i.bigger)||""}
              .configValue=${"icon_color.bigger"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Xe("editor.settings.equal")}"
              .value=${(null===(n=l.icon_color)||void 0===n?void 0:n.equal)||""}
              .configValue=${"icon_color.equal"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Xe("editor.settings.smaller")}"
              .value=${(null===(o=l.icon_color)||void 0===o?void 0:o.smaller)||""}
              .configValue=${"icon_color.smaller"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
        </tr>
        <tr>
          <th>arrows</th>
          <td>
            <ha-textfield
              label="${Xe("editor.settings.bigger")}"
              .value=${(null===(r=l.arrow_color)||void 0===r?void 0:r.bigger)||""}
              .configValue=${"arrow_color.bigger"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Xe("editor.settings.equal")}"
              .value=${(null===(a=l.arrow_color)||void 0===a?void 0:a.equal)||""}
              .configValue=${"arrow_color.equal"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Xe("editor.settings.smaller")}"
              .value=${(null===(s=l.arrow_color)||void 0===s?void 0:s.smaller)||""}
              .configValue=${"arrow_color.smaller"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
        </tr>
      </table>
      <br />
      <h3>${Xe("editor.settings.action_settings")}</h3>
      <div class="side-by-side">
        <ha-selector
          label="${Xe("editor.settings.tap_action")}"
          .hass=${this.hass}
          .selector=${{"ui-action":{actions:_i}}}
          .value=${l.tap_action||{action:"more-info"}}
          .configValue=${"tap_action"}
          @value-changed=${this._valueChanged}
        >
        </ha-selector>
        <ha-selector
          label="${Xe("editor.settings.double_tap_action")}"
          .hass=${this.hass}
          .selector=${{"ui-action":{actions:_i}}}
          .value=${l.double_tap_action}
          .configValue=${"double_tap_action"}
          @value-changed=${this._valueChanged}
        >
        </ha-selector>
      </div>
    `}_renderPresetFeatures(){if(!this.config||!this.hass)return Wt``;switch(this.config.preset){case"battery":return Wt`
          <ha-entity-picker
            label="${Xe("editor.settings.battery_percentage")} (${Xe("editor.optional")})"
            allow-custom-entity
            hideClearIcon
            .hass=${this.hass}
            .configValue=${"battery_percentage_entity"}
            .value=${this.config.battery_percentage_entity||""}
            @value-changed=${this._valueChanged}
          ></ha-entity-picker>
        `;case"grid":return Wt`
          <ha-entity-picker
            label="${Xe("editor.settings.grid-buy")} (${Xe("editor.optional")})"
            allow-custom-entity
            hideClearIcon
            .hass=${this.hass}
            .configValue=${"grid_buy_entity"}
            .value=${this.config.grid_buy_entity||""}
            @value-changed=${this._valueChanged}
          ></ha-entity-picker>
          <ha-entity-picker
            label="${Xe("editor.settings.grid-sell")} (${Xe("editor.optional")})"
            allow-custom-entity
            hideClearIcon
            .hass=${this.hass}
            .configValue=${"grid_sell_entity"}
            .value=${this.config.grid_sell_entity||""}
            @value-changed=${this._valueChanged}
          ></ha-entity-picker>
        `;default:return Wt``}}_valueChanged(t){if(t.stopPropagation(),!this.config||!this.hass)return;const e=t.target,i=void 0!==e.checked?e.checked:t.detail.value||e.value||t.detail.config,n=e.configValue;n&&this.config[n]!==i&&fi(this,"config-changed",Object.assign(Object.assign({},this.config),{[n]:i}))}_colorChanged(t){if(t.stopPropagation(),!this.config||!this.hass)return;const e=t.target,i=e.value,n=e.configValue;if(!n)return;const[o,r]=n.split("."),a=Object.assign({},this.config[o])||{};a[r]=i,n&&this.config[o]!==a&&fi(this,"config-changed",Object.assign(Object.assign({},this.config),{[o]:a}))}static get styles(){return dt`
      .checkbox {
        display: flex;
        align-items: center;
        padding: 8px 0;
      }
      .checkbox input {
        height: 20px;
        width: 20px;
        margin-left: 0;
        margin-right: 8px;
      }
      h3 {
        margin-bottom: 0.5em;
      }
      .row {
        margin-bottom: 12px;
        margin-top: 12px;
        display: block;
      }
      .side-by-side {
        display: flex;
      }
      .side-by-side > * {
        flex: 1 1 0%;
        padding-right: 4px;
      }
    `}};t([fe({attribute:!1})],Si.prototype,"config",void 0),t([fe({attribute:!1})],Si.prototype,"hass",void 0),Si=t([he("power-distribution-card-item-editor")],Si);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{D:xi}=nt,Ci=()=>document.createComment(""),Oi=(t,e,i)=>{const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(Ci(),o),r=n.insertBefore(Ci(),o);i=new xi(e,r,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,a=r!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||a){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},Ti=(t,e,i=t)=>(t._$AI(e,i),t),Di={},ki=t=>{t._$AP?.(!1,!0);let e=t._$AA;const i=t._$AB.nextSibling;for(;e!==i;){const t=e.nextSibling;e.remove(),e=t}},Pi=(t,e,i)=>{const n=new Map;for(let o=e;o<=i;o++)n.set(t[o],o);return n},Mi=vi(class extends mi{constructor(t){if(super(t),t.type!==gi)throw Error("repeat() can only be used in text expressions")}ht(t,e,i){let n;void 0===i?i=e:void 0!==e&&(n=e);const o=[],r=[];let a=0;for(const e of t)o[a]=n?n(e,a):a,r[a]=i(e,a),a++;return{values:r,keys:o}}render(t,e,i){return this.ht(t,e,i).values}update(t,[e,i,n]){const o=(t=>t._$AH)(t),{values:r,keys:a}=this.ht(e,i,n);if(!Array.isArray(o))return this.dt=a,r;const s=this.dt??=[],l=[];let c,d,h=0,u=o.length-1,p=0,f=r.length-1;for(;h<=u&&p<=f;)if(null===o[h])h++;else if(null===o[u])u--;else if(s[h]===a[p])l[p]=Ti(o[h],r[p]),h++,p++;else if(s[u]===a[f])l[f]=Ti(o[u],r[f]),u--,f--;else if(s[h]===a[f])l[f]=Ti(o[h],r[f]),Oi(t,l[f+1],o[h]),h++,f--;else if(s[u]===a[p])l[p]=Ti(o[u],r[p]),Oi(t,o[h],o[u]),u--,p++;else if(void 0===c&&(c=Pi(a,p,f),d=Pi(s,h,u)),c.has(s[h]))if(c.has(s[u])){const e=d.get(a[p]),i=void 0!==e?o[e]:null;if(null===i){const e=Oi(t,o[h]);Ti(e,r[p]),l[p]=e}else l[p]=Ti(i,r[p]),Oi(t,o[h],i),o[e]=null;p++}else ki(o[u]),u--;else ki(o[h]),h++;for(;p<=f;){const e=Oi(t,l[f+1]);Ti(e,r[p]),l[p++]=e}for(;h<=u;){const t=o[h++];null!==t&&ki(t)}return this.dt=a,((t,e=Di)=>{t._$AH=e})(t,l),L}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Ni(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function Ii(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?Ni(Object(i),!0).forEach((function(e){Hi(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):Ni(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function Ri(t){return Ri="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ri(t)}function Hi(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function ji(){return ji=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},ji.apply(this,arguments)}function Ui(t,e){if(null==t)return{};var i,n,o=function(t,e){if(null==t)return{};var i,n,o={},r=Object.keys(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||(o[i]=t[i]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(o[i]=t[i])}return o}function zi(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var Bi=zi(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Li=zi(/Edge/i),Vi=zi(/firefox/i),Xi=zi(/safari/i)&&!zi(/chrome/i)&&!zi(/android/i),Yi=zi(/iP(ad|od|hone)/i),Wi=zi(/chrome/i)&&zi(/android/i),Fi={capture:!1,passive:!1};function qi(t,e,i){t.addEventListener(e,i,!Bi&&Fi)}function Gi(t,e,i){t.removeEventListener(e,i,!Bi&&Fi)}function Ki(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function Zi(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function Ji(t,e,i,n){if(t){i=i||document;do{if(null!=e&&(">"===e[0]?t.parentNode===i&&Ki(t,e):Ki(t,e))||n&&t===i)return t;if(t===i)break}while(t=Zi(t))}return null}var Qi,tn=/\s+/g;function en(t,e,i){if(t&&e)if(t.classList)t.classList[i?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(tn," ").replace(" "+e+" "," ");t.className=(n+(i?" "+e:"")).replace(tn," ")}}function nn(t,e,i){var n=t&&t.style;if(n){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(i=t.currentStyle),void 0===e?i:i[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=i+("string"==typeof i?"":"px")}}function on(t,e){var i="";if("string"==typeof t)i=t;else do{var n=nn(t,"transform");n&&"none"!==n&&(i=n+" "+i)}while(!e&&(t=t.parentNode));var o=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return o&&new o(i)}function rn(t,e,i){if(t){var n=t.getElementsByTagName(e),o=0,r=n.length;if(i)for(;o<r;o++)i(n[o],o);return n}return[]}function an(){var t=document.scrollingElement;return t||document.documentElement}function sn(t,e,i,n,o){if(t.getBoundingClientRect||t===window){var r,a,s,l,c,d,h;if(t!==window&&t.parentNode&&t!==an()?(a=(r=t.getBoundingClientRect()).top,s=r.left,l=r.bottom,c=r.right,d=r.height,h=r.width):(a=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(e||i)&&t!==window&&(o=o||t.parentNode,!Bi))do{if(o&&o.getBoundingClientRect&&("none"!==nn(o,"transform")||i&&"static"!==nn(o,"position"))){var u=o.getBoundingClientRect();a-=u.top+parseInt(nn(o,"border-top-width")),s-=u.left+parseInt(nn(o,"border-left-width")),l=a+r.height,c=s+r.width;break}}while(o=o.parentNode);if(n&&t!==window){var p=on(o||t),f=p&&p.a,g=p&&p.d;p&&(l=(a/=g)+(d/=g),c=(s/=f)+(h/=f))}return{top:a,left:s,bottom:l,right:c,width:h,height:d}}}function ln(t,e,i){for(var n=pn(t,!0),o=sn(t)[e];n;){var r=sn(n)[i];if(!("top"===i||"left"===i?o>=r:o<=r))return n;if(n===an())break;n=pn(n,!1)}return!1}function cn(t,e,i,n){for(var o=0,r=0,a=t.children;r<a.length;){if("none"!==a[r].style.display&&a[r]!==mo.ghost&&(n||a[r]!==mo.dragged)&&Ji(a[r],i.draggable,t,!1)){if(o===e)return a[r];o++}r++}return null}function dn(t,e){for(var i=t.lastElementChild;i&&(i===mo.ghost||"none"===nn(i,"display")||e&&!Ki(i,e));)i=i.previousElementSibling;return i||null}function hn(t,e){var i=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===mo.clone||e&&!Ki(t,e)||i++;return i}function un(t){var e=0,i=0,n=an();if(t)do{var o=on(t),r=o.a,a=o.d;e+=t.scrollLeft*r,i+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,i]}function pn(t,e){if(!t||!t.getBoundingClientRect)return an();var i=t,n=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var o=nn(i);if(i.clientWidth<i.scrollWidth&&("auto"==o.overflowX||"scroll"==o.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==o.overflowY||"scroll"==o.overflowY)){if(!i.getBoundingClientRect||i===document.body)return an();if(n||e)return i;n=!0}}}while(i=i.parentNode);return an()}function fn(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function gn(t,e){return function(){if(!Qi){var i=arguments;1===i.length?t.call(this,i[0]):t.apply(this,i),Qi=setTimeout((function(){Qi=void 0}),e)}}}function vn(t,e,i){t.scrollLeft+=e,t.scrollTop+=i}function mn(t){var e=window.Polymer,i=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):i?i(t).clone(!0)[0]:t.cloneNode(!0)}var bn="Sortable"+(new Date).getTime();function _n(){var t,e=[];return{captureAnimationState:function(){(e=[],this.options.animation)&&[].slice.call(this.el.children).forEach((function(t){if("none"!==nn(t,"display")&&t!==mo.ghost){e.push({target:t,rect:sn(t)});var i=Ii({},e[e.length-1].rect);if(t.thisAnimationDuration){var n=on(t,!0);n&&(i.top-=n.f,i.left-=n.e)}t.fromRect=i}}))},addAnimationState:function(t){e.push(t)},removeAnimationState:function(t){e.splice(function(t,e){for(var i in t)if(t.hasOwnProperty(i))for(var n in e)if(e.hasOwnProperty(n)&&e[n]===t[i][n])return Number(i);return-1}(e,{target:t}),1)},animateAll:function(i){var n=this;if(!this.options.animation)return clearTimeout(t),void("function"==typeof i&&i());var o=!1,r=0;e.forEach((function(t){var e=0,i=t.target,a=i.fromRect,s=sn(i),l=i.prevFromRect,c=i.prevToRect,d=t.rect,h=on(i,!0);h&&(s.top-=h.f,s.left-=h.e),i.toRect=s,i.thisAnimationDuration&&fn(l,s)&&!fn(a,s)&&(d.top-s.top)/(d.left-s.left)==(a.top-s.top)/(a.left-s.left)&&(e=function(t,e,i,n){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-i.top,2)+Math.pow(e.left-i.left,2))*n.animation}(d,l,c,n.options)),fn(s,a)||(i.prevFromRect=a,i.prevToRect=s,e||(e=n.options.animation),n.animate(i,d,s,e)),e&&(o=!0,r=Math.max(r,e),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout((function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null}),e),i.thisAnimationDuration=e)})),clearTimeout(t),o?t=setTimeout((function(){"function"==typeof i&&i()}),r):"function"==typeof i&&i(),e=[]},animate:function(t,e,i,n){if(n){nn(t,"transition",""),nn(t,"transform","");var o=on(this.el),r=o&&o.a,a=o&&o.d,s=(e.left-i.left)/(r||1),l=(e.top-i.top)/(a||1);t.animatingX=!!s,t.animatingY=!!l,nn(t,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),nn(t,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),nn(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout((function(){nn(t,"transition",""),nn(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1}),n)}}}}var yn=[],$n={initializeByDefault:!0},wn={mount:function(t){for(var e in $n)$n.hasOwnProperty(e)&&!(e in t)&&(t[e]=$n[e]);yn.forEach((function(e){if(e.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")})),yn.push(t)},pluginEvent:function(t,e,i){var n=this;this.eventCanceled=!1,i.cancel=function(){n.eventCanceled=!0};var o=t+"Global";yn.forEach((function(n){e[n.pluginName]&&(e[n.pluginName][o]&&e[n.pluginName][o](Ii({sortable:e},i)),e.options[n.pluginName]&&e[n.pluginName][t]&&e[n.pluginName][t](Ii({sortable:e},i)))}))},initializePlugins:function(t,e,i,n){for(var o in yn.forEach((function(n){var o=n.pluginName;if(t.options[o]||n.initializeByDefault){var r=new n(t,e,t.options);r.sortable=t,r.options=t.options,t[o]=r,ji(i,r.defaults)}})),t.options)if(t.options.hasOwnProperty(o)){var r=this.modifyOption(t,o,t.options[o]);void 0!==r&&(t.options[o]=r)}},getEventProperties:function(t,e){var i={};return yn.forEach((function(n){"function"==typeof n.eventProperties&&ji(i,n.eventProperties.call(e[n.pluginName],t))})),i},modifyOption:function(t,e,i){var n;return yn.forEach((function(o){t[o.pluginName]&&o.optionListeners&&"function"==typeof o.optionListeners[e]&&(n=o.optionListeners[e].call(t[o.pluginName],i))})),n}};var En=["evt"],An=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=i.evt,o=Ui(i,En);wn.pluginEvent.bind(mo)(t,e,Ii({dragEl:xn,parentEl:Cn,ghostEl:On,rootEl:Tn,nextEl:Dn,lastDownEl:kn,cloneEl:Pn,cloneHidden:Mn,dragStarted:Wn,putSortable:Un,activeSortable:mo.active,originalEvent:n,oldIndex:Nn,oldDraggableIndex:Rn,newIndex:In,newDraggableIndex:Hn,hideGhostForTarget:po,unhideGhostForTarget:fo,cloneNowHidden:function(){Mn=!0},cloneNowShown:function(){Mn=!1},dispatchSortableEvent:function(t){Sn({sortable:e,name:t,originalEvent:n})}},o))};function Sn(t){!function(t){var e=t.sortable,i=t.rootEl,n=t.name,o=t.targetEl,r=t.cloneEl,a=t.toEl,s=t.fromEl,l=t.oldIndex,c=t.newIndex,d=t.oldDraggableIndex,h=t.newDraggableIndex,u=t.originalEvent,p=t.putSortable,f=t.extraEventProperties;if(e=e||i&&i[bn]){var g,v=e.options,m="on"+n.charAt(0).toUpperCase()+n.substr(1);!window.CustomEvent||Bi||Li?(g=document.createEvent("Event")).initEvent(n,!0,!0):g=new CustomEvent(n,{bubbles:!0,cancelable:!0}),g.to=a||i,g.from=s||i,g.item=o||i,g.clone=r,g.oldIndex=l,g.newIndex=c,g.oldDraggableIndex=d,g.newDraggableIndex=h,g.originalEvent=u,g.pullMode=p?p.lastPutMode:void 0;var b=Ii(Ii({},f),wn.getEventProperties(n,e));for(var _ in b)g[_]=b[_];i&&i.dispatchEvent(g),v[m]&&v[m].call(e,g)}}(Ii({putSortable:Un,cloneEl:Pn,targetEl:xn,rootEl:Tn,oldIndex:Nn,oldDraggableIndex:Rn,newIndex:In,newDraggableIndex:Hn},t))}var xn,Cn,On,Tn,Dn,kn,Pn,Mn,Nn,In,Rn,Hn,jn,Un,zn,Bn,Ln,Vn,Xn,Yn,Wn,Fn,qn,Gn,Kn,Zn=!1,Jn=!1,Qn=[],to=!1,eo=!1,io=[],no=!1,oo=[],ro="undefined"!=typeof document,ao=Yi,so=Li||Bi?"cssFloat":"float",lo=ro&&!Wi&&!Yi&&"draggable"in document.createElement("div"),co=function(){if(ro){if(Bi)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),ho=function(t,e){var i=nn(t),n=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),o=cn(t,0,e),r=cn(t,1,e),a=o&&nn(o),s=r&&nn(r),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+sn(o).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+sn(r).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(o&&a.float&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return o&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||l>=n&&"none"===i[so]||r&&"none"===i[so]&&l+c>n)?"vertical":"horizontal"},uo=function(t){function e(t,i){return function(n,o,r,a){var s=n.options.group.name&&o.options.group.name&&n.options.group.name===o.options.group.name;if(null==t&&(i||s))return!0;if(null==t||!1===t)return!1;if(i&&"clone"===t)return t;if("function"==typeof t)return e(t(n,o,r,a),i)(n,o,r,a);var l=(i?n:o).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var i={},n=t.group;n&&"object"==Ri(n)||(n={name:n}),i.name=n.name,i.checkPull=e(n.pull,!0),i.checkPut=e(n.put),i.revertClone=n.revertClone,t.group=i},po=function(){!co&&On&&nn(On,"display","none")},fo=function(){!co&&On&&nn(On,"display","")};ro&&!Wi&&document.addEventListener("click",(function(t){if(Jn)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),Jn=!1,!1}),!0);var go=function(t){if(xn){var e=function(t,e){var i;return Qn.some((function(n){var o=n[bn].options.emptyInsertThreshold;if(o&&!dn(n)){var r=sn(n),a=t>=r.left-o&&t<=r.right+o,s=e>=r.top-o&&e<=r.bottom+o;return a&&s?i=n:void 0}})),i}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(e){var i={};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);i.target=i.rootEl=e,i.preventDefault=void 0,i.stopPropagation=void 0,e[bn]._onDragOver(i)}}},vo=function(t){xn&&xn.parentNode[bn]._isOutsideThisEl(t.target)};function mo(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));this.el=t,this.options=e=ji({},e),t[bn]=this;var i={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return ho(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==mo.supportPointer&&"PointerEvent"in window&&!Xi,emptyInsertThreshold:5};for(var n in wn.initializePlugins(this,t,i),i)!(n in e)&&(e[n]=i[n]);for(var o in uo(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&lo,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?qi(t,"pointerdown",this._onTapStart):(qi(t,"mousedown",this._onTapStart),qi(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(qi(t,"dragover",this),qi(t,"dragenter",this)),Qn.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),ji(this,_n())}function bo(t,e,i,n,o,r,a,s){var l,c,d=t[bn],h=d.options.onMove;return!window.CustomEvent||Bi||Li?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=e,l.from=t,l.dragged=i,l.draggedRect=n,l.related=o||e,l.relatedRect=r||sn(e),l.willInsertAfter=s,l.originalEvent=a,t.dispatchEvent(l),h&&(c=h.call(d,l,a)),c}function _o(t){t.draggable=!1}function yo(){no=!1}function $o(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,i=e.length,n=0;i--;)n+=e.charCodeAt(i);return n.toString(36)}function wo(t){return setTimeout(t,0)}function Eo(t){return clearTimeout(t)}mo.prototype={constructor:mo,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(Fn=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,xn):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,i=this.el,n=this.options,o=n.preventOnFilter,r=t.type,a=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,c=n.filter;if(function(t){oo.length=0;var e=t.getElementsByTagName("input"),i=e.length;for(;i--;){var n=e[i];n.checked&&oo.push(n)}}(i),!xn&&!(/mousedown|pointerdown/.test(r)&&0!==t.button||n.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!Xi||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=Ji(s,n.draggable,i,!1))&&s.animated||kn===s)){if(Nn=hn(s),Rn=hn(s,n.draggable),"function"==typeof c){if(c.call(this,t,s,this))return Sn({sortable:e,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),An("filter",e,{evt:t}),void(o&&t.cancelable&&t.preventDefault())}else if(c&&(c=c.split(",").some((function(n){if(n=Ji(l,n.trim(),i,!1))return Sn({sortable:e,rootEl:n,name:"filter",targetEl:s,fromEl:i,toEl:i}),An("filter",e,{evt:t}),!0}))))return void(o&&t.cancelable&&t.preventDefault());n.handle&&!Ji(l,n.handle,i,!1)||this._prepareDragStart(t,a,s)}}},_prepareDragStart:function(t,e,i){var n,o=this,r=o.el,a=o.options,s=r.ownerDocument;if(i&&!xn&&i.parentNode===r){var l=sn(i);if(Tn=r,Cn=(xn=i).parentNode,Dn=xn.nextSibling,kn=i,jn=a.group,mo.dragged=xn,zn={target:xn,clientX:(e||t).clientX,clientY:(e||t).clientY},Xn=zn.clientX-l.left,Yn=zn.clientY-l.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,xn.style["will-change"]="all",n=function(){An("delayEnded",o,{evt:t}),mo.eventCanceled?o._onDrop():(o._disableDelayedDragEvents(),!Vi&&o.nativeDraggable&&(xn.draggable=!0),o._triggerDragStart(t,e),Sn({sortable:o,name:"choose",originalEvent:t}),en(xn,a.chosenClass,!0))},a.ignore.split(",").forEach((function(t){rn(xn,t.trim(),_o)})),qi(s,"dragover",go),qi(s,"mousemove",go),qi(s,"touchmove",go),qi(s,"mouseup",o._onDrop),qi(s,"touchend",o._onDrop),qi(s,"touchcancel",o._onDrop),Vi&&this.nativeDraggable&&(this.options.touchStartThreshold=4,xn.draggable=!0),An("delayStart",this,{evt:t}),!a.delay||a.delayOnTouchOnly&&!e||this.nativeDraggable&&(Li||Bi))n();else{if(mo.eventCanceled)return void this._onDrop();qi(s,"mouseup",o._disableDelayedDrag),qi(s,"touchend",o._disableDelayedDrag),qi(s,"touchcancel",o._disableDelayedDrag),qi(s,"mousemove",o._delayedDragTouchMoveHandler),qi(s,"touchmove",o._delayedDragTouchMoveHandler),a.supportPointer&&qi(s,"pointermove",o._delayedDragTouchMoveHandler),o._dragStartTimer=setTimeout(n,a.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){xn&&_o(xn),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Gi(t,"mouseup",this._disableDelayedDrag),Gi(t,"touchend",this._disableDelayedDrag),Gi(t,"touchcancel",this._disableDelayedDrag),Gi(t,"mousemove",this._delayedDragTouchMoveHandler),Gi(t,"touchmove",this._delayedDragTouchMoveHandler),Gi(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?this.options.supportPointer?qi(document,"pointermove",this._onTouchMove):qi(document,e?"touchmove":"mousemove",this._onTouchMove):(qi(xn,"dragend",this),qi(Tn,"dragstart",this._onDragStart));try{document.selection?wo((function(){document.selection.empty()})):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(Zn=!1,Tn&&xn){An("dragStarted",this,{evt:e}),this.nativeDraggable&&qi(document,"dragover",vo);var i=this.options;!t&&en(xn,i.dragClass,!1),en(xn,i.ghostClass,!0),mo.active=this,t&&this._appendGhost(),Sn({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(Bn){this._lastX=Bn.clientX,this._lastY=Bn.clientY,po();for(var t=document.elementFromPoint(Bn.clientX,Bn.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Bn.clientX,Bn.clientY))!==e;)e=t;if(xn.parentNode[bn]._isOutsideThisEl(t),e)do{if(e[bn]){if(e[bn]._onDragOver({clientX:Bn.clientX,clientY:Bn.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break}t=e}while(e=e.parentNode);fo()}},_onTouchMove:function(t){if(zn){var e=this.options,i=e.fallbackTolerance,n=e.fallbackOffset,o=t.touches?t.touches[0]:t,r=On&&on(On,!0),a=On&&r&&r.a,s=On&&r&&r.d,l=ao&&Kn&&un(Kn),c=(o.clientX-zn.clientX+n.x)/(a||1)+(l?l[0]-io[0]:0)/(a||1),d=(o.clientY-zn.clientY+n.y)/(s||1)+(l?l[1]-io[1]:0)/(s||1);if(!mo.active&&!Zn){if(i&&Math.max(Math.abs(o.clientX-this._lastX),Math.abs(o.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(On){r?(r.e+=c-(Ln||0),r.f+=d-(Vn||0)):r={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(r.a,",").concat(r.b,",").concat(r.c,",").concat(r.d,",").concat(r.e,",").concat(r.f,")");nn(On,"webkitTransform",h),nn(On,"mozTransform",h),nn(On,"msTransform",h),nn(On,"transform",h),Ln=c,Vn=d,Bn=o}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!On){var t=this.options.fallbackOnBody?document.body:Tn,e=sn(xn,!0,ao,!0,t),i=this.options;if(ao){for(Kn=t;"static"===nn(Kn,"position")&&"none"===nn(Kn,"transform")&&Kn!==document;)Kn=Kn.parentNode;Kn!==document.body&&Kn!==document.documentElement?(Kn===document&&(Kn=an()),e.top+=Kn.scrollTop,e.left+=Kn.scrollLeft):Kn=an(),io=un(Kn)}en(On=xn.cloneNode(!0),i.ghostClass,!1),en(On,i.fallbackClass,!0),en(On,i.dragClass,!0),nn(On,"transition",""),nn(On,"transform",""),nn(On,"box-sizing","border-box"),nn(On,"margin",0),nn(On,"top",e.top),nn(On,"left",e.left),nn(On,"width",e.width),nn(On,"height",e.height),nn(On,"opacity","0.8"),nn(On,"position",ao?"absolute":"fixed"),nn(On,"zIndex","100000"),nn(On,"pointerEvents","none"),mo.ghost=On,t.appendChild(On),nn(On,"transform-origin",Xn/parseInt(On.style.width)*100+"% "+Yn/parseInt(On.style.height)*100+"%")}},_onDragStart:function(t,e){var i=this,n=t.dataTransfer,o=i.options;An("dragStart",this,{evt:t}),mo.eventCanceled?this._onDrop():(An("setupClone",this),mo.eventCanceled||((Pn=mn(xn)).removeAttribute("id"),Pn.draggable=!1,Pn.style["will-change"]="",this._hideClone(),en(Pn,this.options.chosenClass,!1),mo.clone=Pn),i.cloneId=wo((function(){An("clone",i),mo.eventCanceled||(i.options.removeCloneOnHide||Tn.insertBefore(Pn,xn),i._hideClone(),Sn({sortable:i,name:"clone"}))})),!e&&en(xn,o.dragClass,!0),e?(Jn=!0,i._loopId=setInterval(i._emulateDragOver,50)):(Gi(document,"mouseup",i._onDrop),Gi(document,"touchend",i._onDrop),Gi(document,"touchcancel",i._onDrop),n&&(n.effectAllowed="move",o.setData&&o.setData.call(i,n,xn)),qi(document,"drop",i),nn(xn,"transform","translateZ(0)")),Zn=!0,i._dragStartId=wo(i._dragStarted.bind(i,e,t)),qi(document,"selectstart",i),Wn=!0,Xi&&nn(document.body,"user-select","none"))},_onDragOver:function(t){var e,i,n,o,r=this.el,a=t.target,s=this.options,l=s.group,c=mo.active,d=jn===l,h=s.sort,u=Un||c,p=this,f=!1;if(!no){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),a=Ji(a,s.draggable,r,!0),T("dragOver"),mo.eventCanceled)return f;if(xn.contains(t.target)||a.animated&&a.animatingX&&a.animatingY||p._ignoreWhileAnimating===a)return k(!1);if(Jn=!1,c&&!s.disabled&&(d?h||(n=Cn!==Tn):Un===this||(this.lastPutMode=jn.checkPull(this,c,xn,t))&&l.checkPut(this,c,xn,t))){if(o="vertical"===this._getDirection(t,a),e=sn(xn),T("dragOverValid"),mo.eventCanceled)return f;if(n)return Cn=Tn,D(),this._hideClone(),T("revert"),mo.eventCanceled||(Dn?Tn.insertBefore(xn,Dn):Tn.appendChild(xn)),k(!0);var g=dn(r,s.draggable);if(!g||function(t,e,i){var n=sn(dn(i.el,i.options.draggable)),o=10;return e?t.clientX>n.right+o||t.clientX<=n.right&&t.clientY>n.bottom&&t.clientX>=n.left:t.clientX>n.right&&t.clientY>n.top||t.clientX<=n.right&&t.clientY>n.bottom+o}(t,o,this)&&!g.animated){if(g===xn)return k(!1);if(g&&r===t.target&&(a=g),a&&(i=sn(a)),!1!==bo(Tn,r,xn,e,a,i,t,!!a))return D(),g&&g.nextSibling?r.insertBefore(xn,g.nextSibling):r.appendChild(xn),Cn=r,P(),k(!0)}else if(g&&function(t,e,i){var n=sn(cn(i.el,0,i.options,!0)),o=10;return e?t.clientX<n.left-o||t.clientY<n.top&&t.clientX<n.right:t.clientY<n.top-o||t.clientY<n.bottom&&t.clientX<n.left}(t,o,this)){var v=cn(r,0,s,!0);if(v===xn)return k(!1);if(i=sn(a=v),!1!==bo(Tn,r,xn,e,a,i,t,!1))return D(),r.insertBefore(xn,v),Cn=r,P(),k(!0)}else if(a.parentNode===r){i=sn(a);var m,b,_,y=xn.parentNode!==r,$=!function(t,e,i){var n=i?t.left:t.top,o=i?t.right:t.bottom,r=i?t.width:t.height,a=i?e.left:e.top,s=i?e.right:e.bottom,l=i?e.width:e.height;return n===a||o===s||n+r/2===a+l/2}(xn.animated&&xn.toRect||e,a.animated&&a.toRect||i,o),w=o?"top":"left",E=ln(a,"top","top")||ln(xn,"top","top"),A=E?E.scrollTop:void 0;if(Fn!==a&&(b=i[w],to=!1,eo=!$&&s.invertSwap||y),m=function(t,e,i,n,o,r,a,s){var l=n?t.clientY:t.clientX,c=n?i.height:i.width,d=n?i.top:i.left,h=n?i.bottom:i.right,u=!1;if(!a)if(s&&Gn<c*o){if(!to&&(1===qn?l>d+c*r/2:l<h-c*r/2)&&(to=!0),to)u=!0;else if(1===qn?l<d+Gn:l>h-Gn)return-qn}else if(l>d+c*(1-o)/2&&l<h-c*(1-o)/2)return function(t){return hn(xn)<hn(t)?1:-1}(e);if((u=u||a)&&(l<d+c*r/2||l>h-c*r/2))return l>d+c/2?1:-1;return 0}(t,a,i,o,$?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,eo,Fn===a),0!==m){var S=hn(xn);do{S-=m,_=Cn.children[S]}while(_&&("none"===nn(_,"display")||_===On))}if(0===m||_===a)return k(!1);Fn=a,qn=m;var x=a.nextElementSibling,C=!1,O=bo(Tn,r,xn,e,a,i,t,C=1===m);if(!1!==O)return 1!==O&&-1!==O||(C=1===O),no=!0,setTimeout(yo,30),D(),C&&!x?r.appendChild(xn):a.parentNode.insertBefore(xn,C?x:a),E&&vn(E,0,A-E.scrollTop),Cn=xn.parentNode,void 0===b||eo||(Gn=Math.abs(b-sn(a)[w])),P(),k(!0)}if(r.contains(xn))return k(!1)}return!1}function T(s,l){An(s,p,Ii({evt:t,isOwner:d,axis:o?"vertical":"horizontal",revert:n,dragRect:e,targetRect:i,canSort:h,fromSortable:u,target:a,completed:k,onMove:function(i,n){return bo(Tn,r,xn,e,i,sn(i),t,n)},changed:P},l))}function D(){T("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function k(e){return T("dragOverCompleted",{insertion:e}),e&&(d?c._hideClone():c._showClone(p),p!==u&&(en(xn,Un?Un.options.ghostClass:c.options.ghostClass,!1),en(xn,s.ghostClass,!0)),Un!==p&&p!==mo.active?Un=p:p===mo.active&&Un&&(Un=null),u===p&&(p._ignoreWhileAnimating=a),p.animateAll((function(){T("dragOverAnimationComplete"),p._ignoreWhileAnimating=null})),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(a===xn&&!xn.animated||a===r&&!a.animated)&&(Fn=null),s.dragoverBubble||t.rootEl||a===document||(xn.parentNode[bn]._isOutsideThisEl(t.target),!e&&go(t)),!s.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),f=!0}function P(){In=hn(xn),Hn=hn(xn,s.draggable),Sn({sortable:p,name:"change",toEl:r,newIndex:In,newDraggableIndex:Hn,originalEvent:t})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Gi(document,"mousemove",this._onTouchMove),Gi(document,"touchmove",this._onTouchMove),Gi(document,"pointermove",this._onTouchMove),Gi(document,"dragover",go),Gi(document,"mousemove",go),Gi(document,"touchmove",go)},_offUpEvents:function(){var t=this.el.ownerDocument;Gi(t,"mouseup",this._onDrop),Gi(t,"touchend",this._onDrop),Gi(t,"pointerup",this._onDrop),Gi(t,"touchcancel",this._onDrop),Gi(document,"selectstart",this)},_onDrop:function(t){var e=this.el,i=this.options;In=hn(xn),Hn=hn(xn,i.draggable),An("drop",this,{evt:t}),Cn=xn&&xn.parentNode,In=hn(xn),Hn=hn(xn,i.draggable),mo.eventCanceled||(Zn=!1,eo=!1,to=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Eo(this.cloneId),Eo(this._dragStartId),this.nativeDraggable&&(Gi(document,"drop",this),Gi(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Xi&&nn(document.body,"user-select",""),nn(xn,"transform",""),t&&(Wn&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),On&&On.parentNode&&On.parentNode.removeChild(On),(Tn===Cn||Un&&"clone"!==Un.lastPutMode)&&Pn&&Pn.parentNode&&Pn.parentNode.removeChild(Pn),xn&&(this.nativeDraggable&&Gi(xn,"dragend",this),_o(xn),xn.style["will-change"]="",Wn&&!Zn&&en(xn,Un?Un.options.ghostClass:this.options.ghostClass,!1),en(xn,this.options.chosenClass,!1),Sn({sortable:this,name:"unchoose",toEl:Cn,newIndex:null,newDraggableIndex:null,originalEvent:t}),Tn!==Cn?(In>=0&&(Sn({rootEl:Cn,name:"add",toEl:Cn,fromEl:Tn,originalEvent:t}),Sn({sortable:this,name:"remove",toEl:Cn,originalEvent:t}),Sn({rootEl:Cn,name:"sort",toEl:Cn,fromEl:Tn,originalEvent:t}),Sn({sortable:this,name:"sort",toEl:Cn,originalEvent:t})),Un&&Un.save()):In!==Nn&&In>=0&&(Sn({sortable:this,name:"update",toEl:Cn,originalEvent:t}),Sn({sortable:this,name:"sort",toEl:Cn,originalEvent:t})),mo.active&&(null!=In&&-1!==In||(In=Nn,Hn=Rn),Sn({sortable:this,name:"end",toEl:Cn,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){An("nulling",this),Tn=xn=Cn=On=Dn=Pn=kn=Mn=zn=Bn=Wn=In=Hn=Nn=Rn=Fn=qn=Un=jn=mo.dragged=mo.ghost=mo.clone=mo.active=null,oo.forEach((function(t){t.checked=!0})),oo.length=Ln=Vn=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":xn&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],i=this.el.children,n=0,o=i.length,r=this.options;n<o;n++)Ji(t=i[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||$o(t));return e},sort:function(t,e){var i={},n=this.el;this.toArray().forEach((function(t,e){var o=n.children[e];Ji(o,this.options.draggable,n,!1)&&(i[t]=o)}),this),e&&this.captureAnimationState(),t.forEach((function(t){i[t]&&(n.removeChild(i[t]),n.appendChild(i[t]))})),e&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return Ji(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var i=this.options;if(void 0===e)return i[t];var n=wn.modifyOption(this,t,e);i[t]=void 0!==n?n:e,"group"===t&&uo(i)},destroy:function(){An("destroy",this);var t=this.el;t[bn]=null,Gi(t,"mousedown",this._onTapStart),Gi(t,"touchstart",this._onTapStart),Gi(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Gi(t,"dragover",this),Gi(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),(function(t){t.removeAttribute("draggable")})),this._onDrop(),this._disableDelayedDragEvents(),Qn.splice(Qn.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!Mn){if(An("hideClone",this),mo.eventCanceled)return;nn(Pn,"display","none"),this.options.removeCloneOnHide&&Pn.parentNode&&Pn.parentNode.removeChild(Pn),Mn=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(Mn){if(An("showClone",this),mo.eventCanceled)return;xn.parentNode!=Tn||this.options.group.revertClone?Dn?Tn.insertBefore(Pn,Dn):Tn.appendChild(Pn):Tn.insertBefore(Pn,xn),this.options.group.revertClone&&this.animate(xn,Pn),nn(Pn,"display",""),Mn=!1}}else this._hideClone()}},ro&&qi(document,"touchmove",(function(t){(mo.active||Zn)&&t.cancelable&&t.preventDefault()})),mo.utils={on:qi,off:Gi,css:nn,find:rn,is:function(t,e){return!!Ji(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},throttle:gn,closest:Ji,toggleClass:en,clone:mn,index:hn,nextTick:wo,cancelNextTick:Eo,detectDirection:ho,getChild:cn},mo.get=function(t){return t[bn]},mo.mount=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e[0].constructor===Array&&(e=e[0]),e.forEach((function(t){if(!t.prototype||!t.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(mo.utils=Ii(Ii({},mo.utils),t.utils)),wn.mount(t)}))},mo.create=function(t,e){return new mo(t,e)},mo.version="1.15.0";var Ao,So,xo,Co,Oo,To,Do=[],ko=!1;function Po(){Do.forEach((function(t){clearInterval(t.pid)})),Do=[]}function Mo(){clearInterval(To)}var No=gn((function(t,e,i,n){if(e.scroll){var o,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,s=e.scrollSensitivity,l=e.scrollSpeed,c=an(),d=!1;So!==i&&(So=i,Po(),Ao=e.scroll,o=e.scrollFn,!0===Ao&&(Ao=pn(i,!0)));var h=0,u=Ao;do{var p=u,f=sn(p),g=f.top,v=f.bottom,m=f.left,b=f.right,_=f.width,y=f.height,$=void 0,w=void 0,E=p.scrollWidth,A=p.scrollHeight,S=nn(p),x=p.scrollLeft,C=p.scrollTop;p===c?($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY));var O=$&&(Math.abs(b-r)<=s&&x+_<E)-(Math.abs(m-r)<=s&&!!x),T=w&&(Math.abs(v-a)<=s&&C+y<A)-(Math.abs(g-a)<=s&&!!C);if(!Do[h])for(var D=0;D<=h;D++)Do[D]||(Do[D]={});Do[h].vx==O&&Do[h].vy==T&&Do[h].el===p||(Do[h].el=p,Do[h].vx=O,Do[h].vy=T,clearInterval(Do[h].pid),0==O&&0==T||(d=!0,Do[h].pid=setInterval(function(){n&&0===this.layer&&mo.active._onTouchMove(Oo);var e=Do[this.layer].vy?Do[this.layer].vy*l:0,i=Do[this.layer].vx?Do[this.layer].vx*l:0;"function"==typeof o&&"continue"!==o.call(mo.dragged.parentNode[bn],i,e,t,Oo,Do[this.layer].el)||vn(Do[this.layer].el,i,e)}.bind({layer:h}),24))),h++}while(e.bubbleScroll&&u!==c&&(u=pn(u,!1)));ko=d}}),30),Io=function(t){var e=t.originalEvent,i=t.putSortable,n=t.dragEl,o=t.activeSortable,r=t.dispatchSortableEvent,a=t.hideGhostForTarget,s=t.unhideGhostForTarget;if(e){var l=i||o;a();var c=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(r("spill"),this.onSpill({dragEl:n,putSortable:i}))}};function Ro(){}function Ho(){}
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function jo(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function Uo(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?jo(Object(i),!0).forEach((function(e){Bo(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):jo(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function zo(t){return zo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},zo(t)}function Bo(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Lo(){return Lo=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},Lo.apply(this,arguments)}function Vo(t,e){if(null==t)return{};var i,n,o=function(t,e){if(null==t)return{};var i,n,o={},r=Object.keys(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||(o[i]=t[i]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(o[i]=t[i])}return o}Ro.prototype={startIndex:null,dragStart:function(t){var e=t.oldDraggableIndex;this.startIndex=e},onSpill:function(t){var e=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var n=cn(this.sortable.el,this.startIndex,this.options);n?this.sortable.el.insertBefore(e,n):this.sortable.el.appendChild(e),this.sortable.animateAll(),i&&i.animateAll()},drop:Io},ji(Ro,{pluginName:"revertOnSpill"}),Ho.prototype={onSpill:function(t){var e=t.dragEl,i=t.putSortable||this.sortable;i.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),i.animateAll()},drop:Io},ji(Ho,{pluginName:"removeOnSpill"}),mo.mount(new function(){function t(){for(var t in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?qi(document,"dragover",this._handleAutoScroll):this.options.supportPointer?qi(document,"pointermove",this._handleFallbackAutoScroll):e.touches?qi(document,"touchmove",this._handleFallbackAutoScroll):qi(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?Gi(document,"dragover",this._handleAutoScroll):(Gi(document,"pointermove",this._handleFallbackAutoScroll),Gi(document,"touchmove",this._handleFallbackAutoScroll),Gi(document,"mousemove",this._handleFallbackAutoScroll)),Mo(),Po(),clearTimeout(Qi),Qi=void 0},nulling:function(){Oo=So=Ao=ko=To=xo=Co=null,Do.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,n=(t.touches?t.touches[0]:t).clientX,o=(t.touches?t.touches[0]:t).clientY,r=document.elementFromPoint(n,o);if(Oo=t,e||this.options.forceAutoScrollFallback||Li||Bi||Xi){No(t,this.options,r,e);var a=pn(r,!0);!ko||To&&n===xo&&o===Co||(To&&Mo(),To=setInterval((function(){var r=pn(document.elementFromPoint(n,o),!0);r!==a&&(a=r,Po()),No(t,i.options,r,e)}),10),xo=n,Co=o)}else{if(!this.options.bubbleScroll||pn(r,!0)===an())return void Po();No(t,this.options,pn(r,!1),!1)}}},ji(t,{pluginName:"scroll",initializeByDefault:!0})}),mo.mount(Ho,Ro);function Xo(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var Yo=Xo(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Wo=Xo(/Edge/i),Fo=Xo(/firefox/i),qo=Xo(/safari/i)&&!Xo(/chrome/i)&&!Xo(/android/i),Go=Xo(/iP(ad|od|hone)/i),Ko=Xo(/chrome/i)&&Xo(/android/i),Zo={capture:!1,passive:!1};function Jo(t,e,i){t.addEventListener(e,i,!Yo&&Zo)}function Qo(t,e,i){t.removeEventListener(e,i,!Yo&&Zo)}function tr(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function er(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function ir(t,e,i,n){if(t){i=i||document;do{if(null!=e&&(">"===e[0]?t.parentNode===i&&tr(t,e):tr(t,e))||n&&t===i)return t;if(t===i)break}while(t=er(t))}return null}var nr,or=/\s+/g;function rr(t,e,i){if(t&&e)if(t.classList)t.classList[i?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(or," ").replace(" "+e+" "," ");t.className=(n+(i?" "+e:"")).replace(or," ")}}function ar(t,e,i){var n=t&&t.style;if(n){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(i=t.currentStyle),void 0===e?i:i[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=i+("string"==typeof i?"":"px")}}function sr(t,e){var i="";if("string"==typeof t)i=t;else do{var n=ar(t,"transform");n&&"none"!==n&&(i=n+" "+i)}while(!e&&(t=t.parentNode));var o=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return o&&new o(i)}function lr(t,e,i){if(t){var n=t.getElementsByTagName(e),o=0,r=n.length;if(i)for(;o<r;o++)i(n[o],o);return n}return[]}function cr(){var t=document.scrollingElement;return t||document.documentElement}function dr(t,e,i,n,o){if(t.getBoundingClientRect||t===window){var r,a,s,l,c,d,h;if(t!==window&&t.parentNode&&t!==cr()?(a=(r=t.getBoundingClientRect()).top,s=r.left,l=r.bottom,c=r.right,d=r.height,h=r.width):(a=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(e||i)&&t!==window&&(o=o||t.parentNode,!Yo))do{if(o&&o.getBoundingClientRect&&("none"!==ar(o,"transform")||i&&"static"!==ar(o,"position"))){var u=o.getBoundingClientRect();a-=u.top+parseInt(ar(o,"border-top-width")),s-=u.left+parseInt(ar(o,"border-left-width")),l=a+r.height,c=s+r.width;break}}while(o=o.parentNode);if(n&&t!==window){var p=sr(o||t),f=p&&p.a,g=p&&p.d;p&&(l=(a/=g)+(d/=g),c=(s/=f)+(h/=f))}return{top:a,left:s,bottom:l,right:c,width:h,height:d}}}function hr(t,e,i){for(var n=vr(t,!0),o=dr(t)[e];n;){var r=dr(n)[i];if(!("top"===i||"left"===i?o>=r:o<=r))return n;if(n===cr())break;n=vr(n,!1)}return!1}function ur(t,e,i,n){for(var o=0,r=0,a=t.children;r<a.length;){if("none"!==a[r].style.display&&a[r]!==_a.ghost&&(n||a[r]!==_a.dragged)&&ir(a[r],i.draggable,t,!1)){if(o===e)return a[r];o++}r++}return null}function pr(t,e){for(var i=t.lastElementChild;i&&(i===_a.ghost||"none"===ar(i,"display")||e&&!tr(i,e));)i=i.previousElementSibling;return i||null}function fr(t,e){var i=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===_a.clone||e&&!tr(t,e)||i++;return i}function gr(t){var e=0,i=0,n=cr();if(t)do{var o=sr(t),r=o.a,a=o.d;e+=t.scrollLeft*r,i+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,i]}function vr(t,e){if(!t||!t.getBoundingClientRect)return cr();var i=t,n=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var o=ar(i);if(i.clientWidth<i.scrollWidth&&("auto"==o.overflowX||"scroll"==o.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==o.overflowY||"scroll"==o.overflowY)){if(!i.getBoundingClientRect||i===document.body)return cr();if(n||e)return i;n=!0}}}while(i=i.parentNode);return cr()}function mr(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function br(t,e){return function(){if(!nr){var i=arguments;1===i.length?t.call(this,i[0]):t.apply(this,i),nr=setTimeout((function(){nr=void 0}),e)}}}function _r(t,e,i){t.scrollLeft+=e,t.scrollTop+=i}function yr(t){var e=window.Polymer,i=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):i?i(t).clone(!0)[0]:t.cloneNode(!0)}var $r="Sortable"+(new Date).getTime();function wr(){var t,e=[];return{captureAnimationState:function(){(e=[],this.options.animation)&&[].slice.call(this.el.children).forEach((function(t){if("none"!==ar(t,"display")&&t!==_a.ghost){e.push({target:t,rect:dr(t)});var i=Uo({},e[e.length-1].rect);if(t.thisAnimationDuration){var n=sr(t,!0);n&&(i.top-=n.f,i.left-=n.e)}t.fromRect=i}}))},addAnimationState:function(t){e.push(t)},removeAnimationState:function(t){e.splice(function(t,e){for(var i in t)if(t.hasOwnProperty(i))for(var n in e)if(e.hasOwnProperty(n)&&e[n]===t[i][n])return Number(i);return-1}(e,{target:t}),1)},animateAll:function(i){var n=this;if(!this.options.animation)return clearTimeout(t),void("function"==typeof i&&i());var o=!1,r=0;e.forEach((function(t){var e=0,i=t.target,a=i.fromRect,s=dr(i),l=i.prevFromRect,c=i.prevToRect,d=t.rect,h=sr(i,!0);h&&(s.top-=h.f,s.left-=h.e),i.toRect=s,i.thisAnimationDuration&&mr(l,s)&&!mr(a,s)&&(d.top-s.top)/(d.left-s.left)==(a.top-s.top)/(a.left-s.left)&&(e=function(t,e,i,n){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-i.top,2)+Math.pow(e.left-i.left,2))*n.animation}(d,l,c,n.options)),mr(s,a)||(i.prevFromRect=a,i.prevToRect=s,e||(e=n.options.animation),n.animate(i,d,s,e)),e&&(o=!0,r=Math.max(r,e),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout((function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null}),e),i.thisAnimationDuration=e)})),clearTimeout(t),o?t=setTimeout((function(){"function"==typeof i&&i()}),r):"function"==typeof i&&i(),e=[]},animate:function(t,e,i,n){if(n){ar(t,"transition",""),ar(t,"transform","");var o=sr(this.el),r=o&&o.a,a=o&&o.d,s=(e.left-i.left)/(r||1),l=(e.top-i.top)/(a||1);t.animatingX=!!s,t.animatingY=!!l,ar(t,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),ar(t,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),ar(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout((function(){ar(t,"transition",""),ar(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1}),n)}}}}var Er=[],Ar={initializeByDefault:!0},Sr={mount:function(t){for(var e in Ar)Ar.hasOwnProperty(e)&&!(e in t)&&(t[e]=Ar[e]);Er.forEach((function(e){if(e.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")})),Er.push(t)},pluginEvent:function(t,e,i){var n=this;this.eventCanceled=!1,i.cancel=function(){n.eventCanceled=!0};var o=t+"Global";Er.forEach((function(n){e[n.pluginName]&&(e[n.pluginName][o]&&e[n.pluginName][o](Uo({sortable:e},i)),e.options[n.pluginName]&&e[n.pluginName][t]&&e[n.pluginName][t](Uo({sortable:e},i)))}))},initializePlugins:function(t,e,i,n){for(var o in Er.forEach((function(n){var o=n.pluginName;if(t.options[o]||n.initializeByDefault){var r=new n(t,e,t.options);r.sortable=t,r.options=t.options,t[o]=r,Lo(i,r.defaults)}})),t.options)if(t.options.hasOwnProperty(o)){var r=this.modifyOption(t,o,t.options[o]);void 0!==r&&(t.options[o]=r)}},getEventProperties:function(t,e){var i={};return Er.forEach((function(n){"function"==typeof n.eventProperties&&Lo(i,n.eventProperties.call(e[n.pluginName],t))})),i},modifyOption:function(t,e,i){var n;return Er.forEach((function(o){t[o.pluginName]&&o.optionListeners&&"function"==typeof o.optionListeners[e]&&(n=o.optionListeners[e].call(t[o.pluginName],i))})),n}};var xr=["evt"],Cr=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=i.evt,o=Vo(i,xr);Sr.pluginEvent.bind(_a)(t,e,Uo({dragEl:Tr,parentEl:Dr,ghostEl:kr,rootEl:Pr,nextEl:Mr,lastDownEl:Nr,cloneEl:Ir,cloneHidden:Rr,dragStarted:Gr,putSortable:Lr,activeSortable:_a.active,originalEvent:n,oldIndex:Hr,oldDraggableIndex:Ur,newIndex:jr,newDraggableIndex:zr,hideGhostForTarget:ga,unhideGhostForTarget:va,cloneNowHidden:function(){Rr=!0},cloneNowShown:function(){Rr=!1},dispatchSortableEvent:function(t){Or({sortable:e,name:t,originalEvent:n})}},o))};function Or(t){!function(t){var e=t.sortable,i=t.rootEl,n=t.name,o=t.targetEl,r=t.cloneEl,a=t.toEl,s=t.fromEl,l=t.oldIndex,c=t.newIndex,d=t.oldDraggableIndex,h=t.newDraggableIndex,u=t.originalEvent,p=t.putSortable,f=t.extraEventProperties;if(e=e||i&&i[$r]){var g,v=e.options,m="on"+n.charAt(0).toUpperCase()+n.substr(1);!window.CustomEvent||Yo||Wo?(g=document.createEvent("Event")).initEvent(n,!0,!0):g=new CustomEvent(n,{bubbles:!0,cancelable:!0}),g.to=a||i,g.from=s||i,g.item=o||i,g.clone=r,g.oldIndex=l,g.newIndex=c,g.oldDraggableIndex=d,g.newDraggableIndex=h,g.originalEvent=u,g.pullMode=p?p.lastPutMode:void 0;var b=Uo(Uo({},f),Sr.getEventProperties(n,e));for(var _ in b)g[_]=b[_];i&&i.dispatchEvent(g),v[m]&&v[m].call(e,g)}}(Uo({putSortable:Lr,cloneEl:Ir,targetEl:Tr,rootEl:Pr,oldIndex:Hr,oldDraggableIndex:Ur,newIndex:jr,newDraggableIndex:zr},t))}var Tr,Dr,kr,Pr,Mr,Nr,Ir,Rr,Hr,jr,Ur,zr,Br,Lr,Vr,Xr,Yr,Wr,Fr,qr,Gr,Kr,Zr,Jr,Qr,ta=!1,ea=!1,ia=[],na=!1,oa=!1,ra=[],aa=!1,sa=[],la="undefined"!=typeof document,ca=Go,da=Wo||Yo?"cssFloat":"float",ha=la&&!Ko&&!Go&&"draggable"in document.createElement("div"),ua=function(){if(la){if(Yo)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),pa=function(t,e){var i=ar(t),n=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),o=ur(t,0,e),r=ur(t,1,e),a=o&&ar(o),s=r&&ar(r),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+dr(o).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+dr(r).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(o&&a.float&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return o&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||l>=n&&"none"===i[da]||r&&"none"===i[da]&&l+c>n)?"vertical":"horizontal"},fa=function(t){function e(t,i){return function(n,o,r,a){var s=n.options.group.name&&o.options.group.name&&n.options.group.name===o.options.group.name;if(null==t&&(i||s))return!0;if(null==t||!1===t)return!1;if(i&&"clone"===t)return t;if("function"==typeof t)return e(t(n,o,r,a),i)(n,o,r,a);var l=(i?n:o).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var i={},n=t.group;n&&"object"==zo(n)||(n={name:n}),i.name=n.name,i.checkPull=e(n.pull,!0),i.checkPut=e(n.put),i.revertClone=n.revertClone,t.group=i},ga=function(){!ua&&kr&&ar(kr,"display","none")},va=function(){!ua&&kr&&ar(kr,"display","")};la&&!Ko&&document.addEventListener("click",(function(t){if(ea)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),ea=!1,!1}),!0);var ma=function(t){if(Tr){var e=function(t,e){var i;return ia.some((function(n){var o=n[$r].options.emptyInsertThreshold;if(o&&!pr(n)){var r=dr(n),a=t>=r.left-o&&t<=r.right+o,s=e>=r.top-o&&e<=r.bottom+o;return a&&s?i=n:void 0}})),i}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(e){var i={};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);i.target=i.rootEl=e,i.preventDefault=void 0,i.stopPropagation=void 0,e[$r]._onDragOver(i)}}},ba=function(t){Tr&&Tr.parentNode[$r]._isOutsideThisEl(t.target)};function _a(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));this.el=t,this.options=e=Lo({},e),t[$r]=this;var i={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return pa(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==_a.supportPointer&&"PointerEvent"in window&&!qo,emptyInsertThreshold:5};for(var n in Sr.initializePlugins(this,t,i),i)!(n in e)&&(e[n]=i[n]);for(var o in fa(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&ha,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?Jo(t,"pointerdown",this._onTapStart):(Jo(t,"mousedown",this._onTapStart),Jo(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(Jo(t,"dragover",this),Jo(t,"dragenter",this)),ia.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),Lo(this,wr())}function ya(t,e,i,n,o,r,a,s){var l,c,d=t[$r],h=d.options.onMove;return!window.CustomEvent||Yo||Wo?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=e,l.from=t,l.dragged=i,l.draggedRect=n,l.related=o||e,l.relatedRect=r||dr(e),l.willInsertAfter=s,l.originalEvent=a,t.dispatchEvent(l),h&&(c=h.call(d,l,a)),c}function $a(t){t.draggable=!1}function wa(){aa=!1}function Ea(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,i=e.length,n=0;i--;)n+=e.charCodeAt(i);return n.toString(36)}function Aa(t){return setTimeout(t,0)}function Sa(t){return clearTimeout(t)}_a.prototype={constructor:_a,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(Kr=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,Tr):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,i=this.el,n=this.options,o=n.preventOnFilter,r=t.type,a=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,c=n.filter;if(function(t){sa.length=0;var e=t.getElementsByTagName("input"),i=e.length;for(;i--;){var n=e[i];n.checked&&sa.push(n)}}(i),!Tr&&!(/mousedown|pointerdown/.test(r)&&0!==t.button||n.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!qo||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=ir(s,n.draggable,i,!1))&&s.animated||Nr===s)){if(Hr=fr(s),Ur=fr(s,n.draggable),"function"==typeof c){if(c.call(this,t,s,this))return Or({sortable:e,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),Cr("filter",e,{evt:t}),void(o&&t.cancelable&&t.preventDefault())}else if(c&&(c=c.split(",").some((function(n){if(n=ir(l,n.trim(),i,!1))return Or({sortable:e,rootEl:n,name:"filter",targetEl:s,fromEl:i,toEl:i}),Cr("filter",e,{evt:t}),!0}))))return void(o&&t.cancelable&&t.preventDefault());n.handle&&!ir(l,n.handle,i,!1)||this._prepareDragStart(t,a,s)}}},_prepareDragStart:function(t,e,i){var n,o=this,r=o.el,a=o.options,s=r.ownerDocument;if(i&&!Tr&&i.parentNode===r){var l=dr(i);if(Pr=r,Dr=(Tr=i).parentNode,Mr=Tr.nextSibling,Nr=i,Br=a.group,_a.dragged=Tr,Vr={target:Tr,clientX:(e||t).clientX,clientY:(e||t).clientY},Fr=Vr.clientX-l.left,qr=Vr.clientY-l.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,Tr.style["will-change"]="all",n=function(){Cr("delayEnded",o,{evt:t}),_a.eventCanceled?o._onDrop():(o._disableDelayedDragEvents(),!Fo&&o.nativeDraggable&&(Tr.draggable=!0),o._triggerDragStart(t,e),Or({sortable:o,name:"choose",originalEvent:t}),rr(Tr,a.chosenClass,!0))},a.ignore.split(",").forEach((function(t){lr(Tr,t.trim(),$a)})),Jo(s,"dragover",ma),Jo(s,"mousemove",ma),Jo(s,"touchmove",ma),Jo(s,"mouseup",o._onDrop),Jo(s,"touchend",o._onDrop),Jo(s,"touchcancel",o._onDrop),Fo&&this.nativeDraggable&&(this.options.touchStartThreshold=4,Tr.draggable=!0),Cr("delayStart",this,{evt:t}),!a.delay||a.delayOnTouchOnly&&!e||this.nativeDraggable&&(Wo||Yo))n();else{if(_a.eventCanceled)return void this._onDrop();Jo(s,"mouseup",o._disableDelayedDrag),Jo(s,"touchend",o._disableDelayedDrag),Jo(s,"touchcancel",o._disableDelayedDrag),Jo(s,"mousemove",o._delayedDragTouchMoveHandler),Jo(s,"touchmove",o._delayedDragTouchMoveHandler),a.supportPointer&&Jo(s,"pointermove",o._delayedDragTouchMoveHandler),o._dragStartTimer=setTimeout(n,a.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){Tr&&$a(Tr),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Qo(t,"mouseup",this._disableDelayedDrag),Qo(t,"touchend",this._disableDelayedDrag),Qo(t,"touchcancel",this._disableDelayedDrag),Qo(t,"mousemove",this._delayedDragTouchMoveHandler),Qo(t,"touchmove",this._delayedDragTouchMoveHandler),Qo(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?this.options.supportPointer?Jo(document,"pointermove",this._onTouchMove):Jo(document,e?"touchmove":"mousemove",this._onTouchMove):(Jo(Tr,"dragend",this),Jo(Pr,"dragstart",this._onDragStart));try{document.selection?Aa((function(){document.selection.empty()})):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(ta=!1,Pr&&Tr){Cr("dragStarted",this,{evt:e}),this.nativeDraggable&&Jo(document,"dragover",ba);var i=this.options;!t&&rr(Tr,i.dragClass,!1),rr(Tr,i.ghostClass,!0),_a.active=this,t&&this._appendGhost(),Or({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(Xr){this._lastX=Xr.clientX,this._lastY=Xr.clientY,ga();for(var t=document.elementFromPoint(Xr.clientX,Xr.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Xr.clientX,Xr.clientY))!==e;)e=t;if(Tr.parentNode[$r]._isOutsideThisEl(t),e)do{if(e[$r]){if(e[$r]._onDragOver({clientX:Xr.clientX,clientY:Xr.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break}t=e}while(e=e.parentNode);va()}},_onTouchMove:function(t){if(Vr){var e=this.options,i=e.fallbackTolerance,n=e.fallbackOffset,o=t.touches?t.touches[0]:t,r=kr&&sr(kr,!0),a=kr&&r&&r.a,s=kr&&r&&r.d,l=ca&&Qr&&gr(Qr),c=(o.clientX-Vr.clientX+n.x)/(a||1)+(l?l[0]-ra[0]:0)/(a||1),d=(o.clientY-Vr.clientY+n.y)/(s||1)+(l?l[1]-ra[1]:0)/(s||1);if(!_a.active&&!ta){if(i&&Math.max(Math.abs(o.clientX-this._lastX),Math.abs(o.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(kr){r?(r.e+=c-(Yr||0),r.f+=d-(Wr||0)):r={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(r.a,",").concat(r.b,",").concat(r.c,",").concat(r.d,",").concat(r.e,",").concat(r.f,")");ar(kr,"webkitTransform",h),ar(kr,"mozTransform",h),ar(kr,"msTransform",h),ar(kr,"transform",h),Yr=c,Wr=d,Xr=o}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!kr){var t=this.options.fallbackOnBody?document.body:Pr,e=dr(Tr,!0,ca,!0,t),i=this.options;if(ca){for(Qr=t;"static"===ar(Qr,"position")&&"none"===ar(Qr,"transform")&&Qr!==document;)Qr=Qr.parentNode;Qr!==document.body&&Qr!==document.documentElement?(Qr===document&&(Qr=cr()),e.top+=Qr.scrollTop,e.left+=Qr.scrollLeft):Qr=cr(),ra=gr(Qr)}rr(kr=Tr.cloneNode(!0),i.ghostClass,!1),rr(kr,i.fallbackClass,!0),rr(kr,i.dragClass,!0),ar(kr,"transition",""),ar(kr,"transform",""),ar(kr,"box-sizing","border-box"),ar(kr,"margin",0),ar(kr,"top",e.top),ar(kr,"left",e.left),ar(kr,"width",e.width),ar(kr,"height",e.height),ar(kr,"opacity","0.8"),ar(kr,"position",ca?"absolute":"fixed"),ar(kr,"zIndex","100000"),ar(kr,"pointerEvents","none"),_a.ghost=kr,t.appendChild(kr),ar(kr,"transform-origin",Fr/parseInt(kr.style.width)*100+"% "+qr/parseInt(kr.style.height)*100+"%")}},_onDragStart:function(t,e){var i=this,n=t.dataTransfer,o=i.options;Cr("dragStart",this,{evt:t}),_a.eventCanceled?this._onDrop():(Cr("setupClone",this),_a.eventCanceled||((Ir=yr(Tr)).removeAttribute("id"),Ir.draggable=!1,Ir.style["will-change"]="",this._hideClone(),rr(Ir,this.options.chosenClass,!1),_a.clone=Ir),i.cloneId=Aa((function(){Cr("clone",i),_a.eventCanceled||(i.options.removeCloneOnHide||Pr.insertBefore(Ir,Tr),i._hideClone(),Or({sortable:i,name:"clone"}))})),!e&&rr(Tr,o.dragClass,!0),e?(ea=!0,i._loopId=setInterval(i._emulateDragOver,50)):(Qo(document,"mouseup",i._onDrop),Qo(document,"touchend",i._onDrop),Qo(document,"touchcancel",i._onDrop),n&&(n.effectAllowed="move",o.setData&&o.setData.call(i,n,Tr)),Jo(document,"drop",i),ar(Tr,"transform","translateZ(0)")),ta=!0,i._dragStartId=Aa(i._dragStarted.bind(i,e,t)),Jo(document,"selectstart",i),Gr=!0,qo&&ar(document.body,"user-select","none"))},_onDragOver:function(t){var e,i,n,o,r=this.el,a=t.target,s=this.options,l=s.group,c=_a.active,d=Br===l,h=s.sort,u=Lr||c,p=this,f=!1;if(!aa){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),a=ir(a,s.draggable,r,!0),T("dragOver"),_a.eventCanceled)return f;if(Tr.contains(t.target)||a.animated&&a.animatingX&&a.animatingY||p._ignoreWhileAnimating===a)return k(!1);if(ea=!1,c&&!s.disabled&&(d?h||(n=Dr!==Pr):Lr===this||(this.lastPutMode=Br.checkPull(this,c,Tr,t))&&l.checkPut(this,c,Tr,t))){if(o="vertical"===this._getDirection(t,a),e=dr(Tr),T("dragOverValid"),_a.eventCanceled)return f;if(n)return Dr=Pr,D(),this._hideClone(),T("revert"),_a.eventCanceled||(Mr?Pr.insertBefore(Tr,Mr):Pr.appendChild(Tr)),k(!0);var g=pr(r,s.draggable);if(!g||function(t,e,i){var n=dr(pr(i.el,i.options.draggable)),o=10;return e?t.clientX>n.right+o||t.clientX<=n.right&&t.clientY>n.bottom&&t.clientX>=n.left:t.clientX>n.right&&t.clientY>n.top||t.clientX<=n.right&&t.clientY>n.bottom+o}(t,o,this)&&!g.animated){if(g===Tr)return k(!1);if(g&&r===t.target&&(a=g),a&&(i=dr(a)),!1!==ya(Pr,r,Tr,e,a,i,t,!!a))return D(),g&&g.nextSibling?r.insertBefore(Tr,g.nextSibling):r.appendChild(Tr),Dr=r,P(),k(!0)}else if(g&&function(t,e,i){var n=dr(ur(i.el,0,i.options,!0)),o=10;return e?t.clientX<n.left-o||t.clientY<n.top&&t.clientX<n.right:t.clientY<n.top-o||t.clientY<n.bottom&&t.clientX<n.left}(t,o,this)){var v=ur(r,0,s,!0);if(v===Tr)return k(!1);if(i=dr(a=v),!1!==ya(Pr,r,Tr,e,a,i,t,!1))return D(),r.insertBefore(Tr,v),Dr=r,P(),k(!0)}else if(a.parentNode===r){i=dr(a);var m,b,_,y=Tr.parentNode!==r,$=!function(t,e,i){var n=i?t.left:t.top,o=i?t.right:t.bottom,r=i?t.width:t.height,a=i?e.left:e.top,s=i?e.right:e.bottom,l=i?e.width:e.height;return n===a||o===s||n+r/2===a+l/2}(Tr.animated&&Tr.toRect||e,a.animated&&a.toRect||i,o),w=o?"top":"left",E=hr(a,"top","top")||hr(Tr,"top","top"),A=E?E.scrollTop:void 0;if(Kr!==a&&(b=i[w],na=!1,oa=!$&&s.invertSwap||y),m=function(t,e,i,n,o,r,a,s){var l=n?t.clientY:t.clientX,c=n?i.height:i.width,d=n?i.top:i.left,h=n?i.bottom:i.right,u=!1;if(!a)if(s&&Jr<c*o){if(!na&&(1===Zr?l>d+c*r/2:l<h-c*r/2)&&(na=!0),na)u=!0;else if(1===Zr?l<d+Jr:l>h-Jr)return-Zr}else if(l>d+c*(1-o)/2&&l<h-c*(1-o)/2)return function(t){return fr(Tr)<fr(t)?1:-1}(e);if((u=u||a)&&(l<d+c*r/2||l>h-c*r/2))return l>d+c/2?1:-1;return 0}(t,a,i,o,$?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,oa,Kr===a),0!==m){var S=fr(Tr);do{S-=m,_=Dr.children[S]}while(_&&("none"===ar(_,"display")||_===kr))}if(0===m||_===a)return k(!1);Kr=a,Zr=m;var x=a.nextElementSibling,C=!1,O=ya(Pr,r,Tr,e,a,i,t,C=1===m);if(!1!==O)return 1!==O&&-1!==O||(C=1===O),aa=!0,setTimeout(wa,30),D(),C&&!x?r.appendChild(Tr):a.parentNode.insertBefore(Tr,C?x:a),E&&_r(E,0,A-E.scrollTop),Dr=Tr.parentNode,void 0===b||oa||(Jr=Math.abs(b-dr(a)[w])),P(),k(!0)}if(r.contains(Tr))return k(!1)}return!1}function T(s,l){Cr(s,p,Uo({evt:t,isOwner:d,axis:o?"vertical":"horizontal",revert:n,dragRect:e,targetRect:i,canSort:h,fromSortable:u,target:a,completed:k,onMove:function(i,n){return ya(Pr,r,Tr,e,i,dr(i),t,n)},changed:P},l))}function D(){T("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function k(e){return T("dragOverCompleted",{insertion:e}),e&&(d?c._hideClone():c._showClone(p),p!==u&&(rr(Tr,Lr?Lr.options.ghostClass:c.options.ghostClass,!1),rr(Tr,s.ghostClass,!0)),Lr!==p&&p!==_a.active?Lr=p:p===_a.active&&Lr&&(Lr=null),u===p&&(p._ignoreWhileAnimating=a),p.animateAll((function(){T("dragOverAnimationComplete"),p._ignoreWhileAnimating=null})),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(a===Tr&&!Tr.animated||a===r&&!a.animated)&&(Kr=null),s.dragoverBubble||t.rootEl||a===document||(Tr.parentNode[$r]._isOutsideThisEl(t.target),!e&&ma(t)),!s.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),f=!0}function P(){jr=fr(Tr),zr=fr(Tr,s.draggable),Or({sortable:p,name:"change",toEl:r,newIndex:jr,newDraggableIndex:zr,originalEvent:t})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Qo(document,"mousemove",this._onTouchMove),Qo(document,"touchmove",this._onTouchMove),Qo(document,"pointermove",this._onTouchMove),Qo(document,"dragover",ma),Qo(document,"mousemove",ma),Qo(document,"touchmove",ma)},_offUpEvents:function(){var t=this.el.ownerDocument;Qo(t,"mouseup",this._onDrop),Qo(t,"touchend",this._onDrop),Qo(t,"pointerup",this._onDrop),Qo(t,"touchcancel",this._onDrop),Qo(document,"selectstart",this)},_onDrop:function(t){var e=this.el,i=this.options;jr=fr(Tr),zr=fr(Tr,i.draggable),Cr("drop",this,{evt:t}),Dr=Tr&&Tr.parentNode,jr=fr(Tr),zr=fr(Tr,i.draggable),_a.eventCanceled||(ta=!1,oa=!1,na=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),Sa(this.cloneId),Sa(this._dragStartId),this.nativeDraggable&&(Qo(document,"drop",this),Qo(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),qo&&ar(document.body,"user-select",""),ar(Tr,"transform",""),t&&(Gr&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),kr&&kr.parentNode&&kr.parentNode.removeChild(kr),(Pr===Dr||Lr&&"clone"!==Lr.lastPutMode)&&Ir&&Ir.parentNode&&Ir.parentNode.removeChild(Ir),Tr&&(this.nativeDraggable&&Qo(Tr,"dragend",this),$a(Tr),Tr.style["will-change"]="",Gr&&!ta&&rr(Tr,Lr?Lr.options.ghostClass:this.options.ghostClass,!1),rr(Tr,this.options.chosenClass,!1),Or({sortable:this,name:"unchoose",toEl:Dr,newIndex:null,newDraggableIndex:null,originalEvent:t}),Pr!==Dr?(jr>=0&&(Or({rootEl:Dr,name:"add",toEl:Dr,fromEl:Pr,originalEvent:t}),Or({sortable:this,name:"remove",toEl:Dr,originalEvent:t}),Or({rootEl:Dr,name:"sort",toEl:Dr,fromEl:Pr,originalEvent:t}),Or({sortable:this,name:"sort",toEl:Dr,originalEvent:t})),Lr&&Lr.save()):jr!==Hr&&jr>=0&&(Or({sortable:this,name:"update",toEl:Dr,originalEvent:t}),Or({sortable:this,name:"sort",toEl:Dr,originalEvent:t})),_a.active&&(null!=jr&&-1!==jr||(jr=Hr,zr=Ur),Or({sortable:this,name:"end",toEl:Dr,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){Cr("nulling",this),Pr=Tr=Dr=kr=Mr=Ir=Nr=Rr=Vr=Xr=Gr=jr=zr=Hr=Ur=Kr=Zr=Lr=Br=_a.dragged=_a.ghost=_a.clone=_a.active=null,sa.forEach((function(t){t.checked=!0})),sa.length=Yr=Wr=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":Tr&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],i=this.el.children,n=0,o=i.length,r=this.options;n<o;n++)ir(t=i[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||Ea(t));return e},sort:function(t,e){var i={},n=this.el;this.toArray().forEach((function(t,e){var o=n.children[e];ir(o,this.options.draggable,n,!1)&&(i[t]=o)}),this),e&&this.captureAnimationState(),t.forEach((function(t){i[t]&&(n.removeChild(i[t]),n.appendChild(i[t]))})),e&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return ir(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var i=this.options;if(void 0===e)return i[t];var n=Sr.modifyOption(this,t,e);i[t]=void 0!==n?n:e,"group"===t&&fa(i)},destroy:function(){Cr("destroy",this);var t=this.el;t[$r]=null,Qo(t,"mousedown",this._onTapStart),Qo(t,"touchstart",this._onTapStart),Qo(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Qo(t,"dragover",this),Qo(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),(function(t){t.removeAttribute("draggable")})),this._onDrop(),this._disableDelayedDragEvents(),ia.splice(ia.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!Rr){if(Cr("hideClone",this),_a.eventCanceled)return;ar(Ir,"display","none"),this.options.removeCloneOnHide&&Ir.parentNode&&Ir.parentNode.removeChild(Ir),Rr=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(Rr){if(Cr("showClone",this),_a.eventCanceled)return;Tr.parentNode!=Pr||this.options.group.revertClone?Mr?Pr.insertBefore(Ir,Mr):Pr.appendChild(Ir):Pr.insertBefore(Ir,Tr),this.options.group.revertClone&&this.animate(Tr,Ir),ar(Ir,"display",""),Rr=!1}}else this._hideClone()}},la&&Jo(document,"touchmove",(function(t){(_a.active||ta)&&t.cancelable&&t.preventDefault()})),_a.utils={on:Jo,off:Qo,css:ar,find:lr,is:function(t,e){return!!ir(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},throttle:br,closest:ir,toggleClass:rr,clone:yr,index:fr,nextTick:Aa,cancelNextTick:Sa,detectDirection:pa,getChild:ur},_a.get=function(t){return t[$r]},_a.mount=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e[0].constructor===Array&&(e=e[0]),e.forEach((function(t){if(!t.prototype||!t.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(_a.utils=Uo(Uo({},_a.utils),t.utils)),Sr.mount(t)}))},_a.create=function(t,e){return new _a(t,e)},_a.version="1.15.0";var xa,Ca,Oa,Ta,Da,ka,Pa=[],Ma=!1;function Na(){Pa.forEach((function(t){clearInterval(t.pid)})),Pa=[]}function Ia(){clearInterval(ka)}var Ra=br((function(t,e,i,n){if(e.scroll){var o,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,s=e.scrollSensitivity,l=e.scrollSpeed,c=cr(),d=!1;Ca!==i&&(Ca=i,Na(),xa=e.scroll,o=e.scrollFn,!0===xa&&(xa=vr(i,!0)));var h=0,u=xa;do{var p=u,f=dr(p),g=f.top,v=f.bottom,m=f.left,b=f.right,_=f.width,y=f.height,$=void 0,w=void 0,E=p.scrollWidth,A=p.scrollHeight,S=ar(p),x=p.scrollLeft,C=p.scrollTop;p===c?($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY));var O=$&&(Math.abs(b-r)<=s&&x+_<E)-(Math.abs(m-r)<=s&&!!x),T=w&&(Math.abs(v-a)<=s&&C+y<A)-(Math.abs(g-a)<=s&&!!C);if(!Pa[h])for(var D=0;D<=h;D++)Pa[D]||(Pa[D]={});Pa[h].vx==O&&Pa[h].vy==T&&Pa[h].el===p||(Pa[h].el=p,Pa[h].vx=O,Pa[h].vy=T,clearInterval(Pa[h].pid),0==O&&0==T||(d=!0,Pa[h].pid=setInterval(function(){n&&0===this.layer&&_a.active._onTouchMove(Da);var e=Pa[this.layer].vy?Pa[this.layer].vy*l:0,i=Pa[this.layer].vx?Pa[this.layer].vx*l:0;"function"==typeof o&&"continue"!==o.call(_a.dragged.parentNode[$r],i,e,t,Da,Pa[this.layer].el)||_r(Pa[this.layer].el,i,e)}.bind({layer:h}),24))),h++}while(e.bubbleScroll&&u!==c&&(u=vr(u,!1)));Ma=d}}),30),Ha=function(t){var e=t.originalEvent,i=t.putSortable,n=t.dragEl,o=t.activeSortable,r=t.dispatchSortableEvent,a=t.hideGhostForTarget,s=t.unhideGhostForTarget;if(e){var l=i||o;a();var c=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(r("spill"),this.onSpill({dragEl:n,putSortable:i}))}};function ja(){}function Ua(){}ja.prototype={startIndex:null,dragStart:function(t){var e=t.oldDraggableIndex;this.startIndex=e},onSpill:function(t){var e=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var n=ur(this.sortable.el,this.startIndex,this.options);n?this.sortable.el.insertBefore(e,n):this.sortable.el.appendChild(e),this.sortable.animateAll(),i&&i.animateAll()},drop:Ha},Lo(ja,{pluginName:"revertOnSpill"}),Ua.prototype={onSpill:function(t){var e=t.dragEl,i=t.putSortable||this.sortable;i.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),i.animateAll()},drop:Ha},Lo(Ua,{pluginName:"removeOnSpill"});var za=[Ua,ja];_a.mount(za,new function(){function t(){for(var t in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?Jo(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Jo(document,"pointermove",this._handleFallbackAutoScroll):e.touches?Jo(document,"touchmove",this._handleFallbackAutoScroll):Jo(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?Qo(document,"dragover",this._handleAutoScroll):(Qo(document,"pointermove",this._handleFallbackAutoScroll),Qo(document,"touchmove",this._handleFallbackAutoScroll),Qo(document,"mousemove",this._handleFallbackAutoScroll)),Ia(),Na(),clearTimeout(nr),nr=void 0},nulling:function(){Da=Ca=xa=Ma=ka=Oa=Ta=null,Pa.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,n=(t.touches?t.touches[0]:t).clientX,o=(t.touches?t.touches[0]:t).clientY,r=document.elementFromPoint(n,o);if(Da=t,e||this.options.forceAutoScrollFallback||Wo||Yo||qo){Ra(t,this.options,r,e);var a=vr(r,!0);!Ma||ka&&n===Oa&&o===Ta||(ka&&Ia(),ka=setInterval((function(){var r=vr(document.elementFromPoint(n,o),!0);r!==a&&(a=r,Na()),Ra(t,i.options,r,e)}),10),Oa=n,Ta=o)}else{if(!this.options.bubbleScroll||vr(r,!0)===cr())return void Na();Ra(t,this.options,vr(r,!1),!1)}}},Lo(t,{pluginName:"scroll",initializeByDefault:!0})});let Ba=class extends ce{constructor(){super(...arguments),this._entityKeys=new WeakMap}_getKey(t){return this._entityKeys.has(t)||this._entityKeys.set(t,Math.random().toString()),this._entityKeys.get(t)}disconnectedCallback(){this._destroySortable()}_destroySortable(){var t;null===(t=this._sortable)||void 0===t||t.destroy(),this._sortable=void 0}async firstUpdated(){this._createSortable()}_createSortable(){this._sortable=new mo(this.shadowRoot.querySelector(".entities"),{animation:150,fallbackClass:"sortable-fallback",handle:".handle",onChoose:t=>{t.item.placeholder=document.createComment("sort-placeholder"),t.item.after(t.item.placeholder)},onEnd:t=>{t.item.placeholder&&(t.item.placeholder.replaceWith(t.item),delete t.item.placeholder),this._rowMoved(t)}})}render(){return this.entities&&this.hass?Wt`
      <h3>${Xe("editor.settings.entities")}</h3>
      <div class="entities">
        ${Mi(this.entities,(t=>this._getKey(t)),((t,e)=>Wt`
            <div class="entity">
              <div class="handle">
                <ha-icon icon="mdi:drag"></ha-icon>
              </div>
              <ha-entity-picker
                label="Entity - ${t.preset}"
                allow-custom-entity
                hideClearIcon
                .hass=${this.hass}
                .configValue=${"entity"}
                .value=${t.entity}
                .index=${e}
                @value-changed=${this._valueChanged}
              ></ha-entity-picker>

              <ha-icon-button
                .label=${Xe("editor.actions.remove")}
                .path=${Ei}
                class="remove-icon"
                .index=${e}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label=${Xe("editor.actions.edit")}
                .path=${Ai}
                class="edit-icon"
                .index=${e}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `))}
      </div>
      <div class="add-item row">
        <ha-select
          label="${Xe("editor.settings.preset")}"
          name="preset"
          class="add-preset"
          naturalMenuWidth
          fixedMenuPosition
          @closed=${t=>t.stopPropagation()}
        >
          ${Oe.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>

        <ha-entity-picker .hass=${this.hass} name="entity" class="add-entity"></ha-entity-picker>

        <ha-icon-button
          .label=${Xe("editor.actions.add")}
          .path=${"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"}
          class="add-icon"
          @click="${this._addRow}"
        ></ha-icon-button>
      </div>
    `:qt}_valueChanged(t){if(!this.entities||!this.hass)return;const e=t.detail.value,i=t.target.index,n=this.entities.concat();n[i]=Object.assign(Object.assign({},n[i]),{entity:e||""}),fi(this,"config-changed",n)}_removeRow(t){t.stopPropagation();const e=t.currentTarget.index;if(null!=e){const t=this.entities.concat();t.splice(e,1),fi(this,"config-changed",t)}}_editRow(t){t.stopPropagation();const e=t.target.index;null!=e&&fi(this,"edit-item",e)}_addRow(t){if(t.stopPropagation(),!this.entities||!this.hass)return;const e=this.shadowRoot.querySelector(".add-preset").value||"placeholder",i=this.shadowRoot.querySelector(".add-entity").value,n=Object.assign({},De,Te[e],{entity:i,preset:""==i?"placeholder":e});fi(this,"config-changed",[...this.entities,n])}_rowMoved(t){if(t.stopPropagation(),t.oldIndex===t.newIndex||!this.entities)return;const e=this.entities.concat();e.splice(t.newIndex,0,e.splice(t.oldIndex,1)[0]),fi(this,"config-changed",e)}static get styles(){return dt`
      #sortable a:nth-of-type(2n) paper-icon-item {
        animation-name: keyframes1;
        animation-iteration-count: infinite;
        transform-origin: 50% 10%;
        animation-delay: -0.75s;
        animation-duration: 0.25s;
      }
      #sortable a:nth-of-type(2n-1) paper-icon-item {
        animation-name: keyframes2;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        transform-origin: 30% 5%;
        animation-delay: -0.5s;
        animation-duration: 0.33s;
      }
      #sortable a {
        height: 48px;
        display: flex;
      }
      #sortable {
        outline: none;
        display: block !important;
      }
      .hidden-panel {
        display: flex !important;
      }
      .sortable-fallback {
        display: none;
      }
      .sortable-ghost {
        opacity: 0.4;
      }
      .sortable-fallback {
        opacity: 0;
      }
      @keyframes keyframes1 {
        0% {
          transform: rotate(-1deg);
          animation-timing-function: ease-in;
        }
        50% {
          transform: rotate(1.5deg);
          animation-timing-function: ease-out;
        }
      }
      @keyframes keyframes2 {
        0% {
          transform: rotate(1deg);
          animation-timing-function: ease-in;
        }
        50% {
          transform: rotate(-1.5deg);
          animation-timing-function: ease-out;
        }
      }
      .show-panel,
      .hide-panel {
        display: none;
        position: absolute;
        top: 0;
        right: 4px;
        --mdc-icon-button-size: 40px;
      }
      :host([rtl]) .show-panel {
        right: initial;
        left: 4px;
      }
      .hide-panel {
        top: 4px;
        right: 8px;
      }
      :host([rtl]) .hide-panel {
        right: initial;
        left: 8px;
      }
      :host([expanded]) .hide-panel {
        display: block;
      }
      :host([expanded]) .show-panel {
        display: inline-flex;
      }
      paper-icon-item.hidden-panel,
      paper-icon-item.hidden-panel span,
      paper-icon-item.hidden-panel ha-icon[slot='item-icon'] {
        color: var(--secondary-text-color);
        cursor: pointer;
      }
      .entity,
      .add-item {
        display: flex;
        align-items: center;
      }
      .entity {
        display: flex;
        align-items: center;
      }
      .entity .handle {
        padding-right: 8px;
        cursor: move;
        padding-inline-end: 8px;
        padding-inline-start: initial;
        direction: var(--direction);
      }
      .entity .handle > * {
        pointer-events: none;
      }
      .entity ha-entity-picker,
      .add-item ha-entity-picker {
        flex-grow: 1;
      }
      .entities {
        margin-bottom: 8px;
      }
      .add-preset {
        padding-right: 8px;
        max-width: 130px;
      }
      .remove-icon,
      .edit-icon,
      .add-icon {
        --mdc-icon-button-size: 36px;
        color: var(--secondary-text-color);
      }
    `}};t([fe({attribute:!1})],Ba.prototype,"entities",void 0),t([fe({attribute:!1})],Ba.prototype,"hass",void 0),Ba=t([he("power-distribution-card-items-editor")],Ba);const La=["none","flash","slide"],Va=["none","card","bars"],Xa=["autarky","ratio",""],Ya=["more-info","toggle","navigate","url","call-service","none"];let Wa=class extends ce{constructor(){super(...arguments),this._subElementEditor=void 0}async setConfig(t){this._config=t}async firstUpdated(){var t,e;customElements.get("ha-form")&&customElements.get("hui-action-editor")||null===(t=customElements.get("hui-button-card"))||void 0===t||t.getConfigElement(),customElements.get("ha-entity-picker")||null===(e=customElements.get("hui-entities-card"))||void 0===e||e.getConfigElement(),console.log(this.hass)}render(){var t,e,i,n,o,r,a,s,l,c;return this.hass?this._subElementEditor?this._renderSubElementEditor():Wt`
      <div class="card-config">
        <ha-textfield
          label="${Xe("editor.settings.title")} (${Xe("editor.optional")})"
          .value=${(null===(t=this._config)||void 0===t?void 0:t.title)||""}
          .configValue=${"title"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-select
          naturalMenuWidth
          fixedMenuPosition
          label="${Xe("editor.settings.animation")}"
          .configValue=${"animation"}
          .value=${(null===(e=this._config)||void 0===e?void 0:e.animation)||"flash"}
          @selected=${this._valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          ${La.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>
        <br />
        <div class="entity row">
          <ha-select
            label="${Xe("editor.settings.center")}"
            .configValue=${"type"}
            @selected=${this._centerChanged}
            @closed=${t=>t.stopPropagation()}
            .value=${(null===(n=null===(i=this._config)||void 0===i?void 0:i.center)||void 0===n?void 0:n.type)||"none"}
          >
            ${Va.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
          </ha-select>
          ${"bars"==(null===(r=null===(o=this._config)||void 0===o?void 0:o.center)||void 0===r?void 0:r.type)||"card"==(null===(s=null===(a=this._config)||void 0===a?void 0:a.center)||void 0===s?void 0:s.type)?Wt`<ha-icon-button
                class="edit-icon"
                .value=${null===(c=null===(l=this._config)||void 0===l?void 0:l.center)||void 0===c?void 0:c.type}
                .path=${Ai}
                @click="${this._editCenter}"
              ></ha-icon-button>`:""}
        </div>
        <br />
        <power-distribution-card-items-editor
          .hass=${this.hass}
          .entities=${this._config.entities}
          @edit-item=${this._edit_item}
          @config-changed=${this._entitiesChanged}
        >
        </power-distribution-card-items-editor>
      </div>
    `:Wt``}_entitiesChanged(t){t.stopPropagation(),this._config&&this.hass&&we(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{entities:t.detail})})}_edit_item(t){if(t.stopPropagation(),!this._config||!this.hass)return;const e=t.detail;this._subElementEditor={type:"entity",index:e}}_renderSubElementEditor(){var t,e,i;const n=[Wt`
        <div class="header">
          <div class="back-title">
            <mwc-icon-button @click=${this._goBack}>
              <ha-icon icon="mdi:arrow-left"></ha-icon>
            </mwc-icon-button>
          </div>
        </div>`];switch(null===(t=this._subElementEditor)||void 0===t||t.index,null===(e=this._subElementEditor)||void 0===e?void 0:e.type){case"entity":n.push(Wt`
          <power-distribution-card-item-editor
            .hass=${this.hass}
            .config=${this._config.entities[(null===(i=this._subElementEditor)||void 0===i?void 0:i.index)||0]}
            @config-changed=${this._itemChanged}
          >
          </power-distribution-card-item-editor>
          `);break;case"bars":n.push(this._barEditor());break;case"card":n.push(this._cardEditor())}return Wt`${n}`}_goBack(){this._subElementEditor=void 0}_itemChanged(t){var e;if(t.stopPropagation(),!this._config||!this.hass)return;const i=null===(e=this._subElementEditor)||void 0===e?void 0:e.index;if(null!=i){const e=[...this._config.entities];e[i]=t.detail,we(this,"config-changed",{config:Object.assign(Object.assign({},this._config),{entities:e})})}}_centerChanged(t){if(this._config&&this.hass){if(t.target){const e=t.target;e.configValue&&(this._config=Object.assign(Object.assign({},this._config),{center:Object.assign(Object.assign({},this._config.center),{[e.configValue]:void 0!==e.checked?e.checked:e.value})}))}we(this,"config-changed",{config:this._config})}}_editCenter(t){t.currentTarget&&(this._subElementEditor={type:t.currentTarget.value})}_barChanged(t){var e;if(!t.target)return;const i=t.target;if(!i.configValue)return;let n;if("content"==i.configValue)n=i.value;else{n=[...this._config.center.content];const t=i.i||(null===(e=this._subElementEditor)||void 0===e?void 0:e.index)||0;n[t]=Object.assign(Object.assign({},n[t]),{[i.configValue]:null!=i.checked?i.checked:i.value})}this._config=Object.assign(Object.assign({},this._config),{center:{type:"bars",content:n}}),we(this,"config-changed",{config:this._config})}_removeBar(t){var e;const i=(null===(e=t.currentTarget)||void 0===e?void 0:e.i)||0,n=[...this._config.center.content];n.splice(i,1),this._barChanged({target:{configValue:"content",value:n}})}async _addBar(){const t=Object.assign({},{name:"Name",preset:"custom"}),e=[...this._config.center.content||[],t];this._barChanged({target:{configValue:"content",value:e}})}_barEditor(){const t=[];return this._config.center.content&&this._config.center.content.forEach(((e,i)=>t.push(Wt`
        <div class="bar-editor">
          <h3 style="margin-bottom:6px;">Bar ${i+1}
          <ha-icon-button
            label=${Xe("editor.actions.remove")}
            class="remove-icon"
            .i=${i}
            .path=${Ei}
            @click=${this._removeBar}
            >
          </ha-icon-button>
          </h4>
          <div class="side-by-side">
            <ha-textfield
              label="${Xe("editor.settings.name")} (${Xe("editor.optional")})"
              .value=${e.name||""}
              .configValue=${"name"}
              @input=${this._barChanged}
              .i=${i}
            ></ha-textfield>
            <ha-entity-picker
              label="${Xe("editor.settings.entity")}"
              allow-custom-entity
              hideClearIcon
              .hass=${this.hass}
              .configValue=${"entity"}
              .value=${e.entity}
              @value-changed=${this._barChanged}
              .i=${i}
            ></ha-entity-picker>
          </div>
          <div class="side-by-side">
            <div class="checkbox">
              <input
                type="checkbox"
                id="invert-value"
                .checked="${e.invert_value||!1}"
                .configValue=${"invert_value"}
                @change=${this._barChanged}
                .i=${i}
              />
              <label for="invert-value"> ${Xe("editor.settings.invert-value")}</label>
            </div>
            <div>
            <ha-select
              label="${Xe("editor.settings.preset")}"
              .configValue=${"preset"}
              .value=${e.preset||""}
              @selected=${this._barChanged}
              @closed=${t=>t.stopPropagation()}
              .i=${i}
            >
              ${Xa.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
            </ha-select>
          </div>
          </div>
          <div class="side-by-side">
            <ha-textfield
              label="${Xe("editor.settings.color")}"
              .value=${e.bar_color||""}
              .configValue=${"bar_color"}
              @input=${this._barChanged}
              .i=${i}
            ></ha-textfield>
            <ha-textfield
              .label="${Xe("editor.settings.background_color")}"
              .value=${e.bar_bg_color||""}
              .configValue=${"bar_bg_color"}
              @input=${this._barChanged}
              .i=${i}
            ></ha-textfield>
          </div>
          <h3>${Xe("editor.settings.action_settings")}</h3>
      <div class="side-by-side">
        <hui-action-editor
          .hass=${this.hass}
          .config=${e.tap_action}
          .actions=${Ya}
          .configValue=${"tap_action"}
          @value-changed=${this._barChanged}
          .i=${i}
        >
        </hui-action-editor>
        <hui-action-editor
          .hass=${this.hass}
          .config=${e.double_tap_action}
          .actions=${Ya}
          .configValue=${"double_tap_action"}
          @value-changed=${this._barChanged}
          .i=${i}
        >
        </hui-action-editor>
      </div>
        </div>
        <br/>
      `))),t.push(Wt`
      <mwc-icon-button aria-label=${Xe("editor.actions.add")} class="add-icon" @click="${this._addBar}">
        <ha-icon icon="mdi:plus-circle-outline"></ha-icon>
      </mwc-icon-button>
    `),Wt`${t.map((t=>Wt`${t}`))}`}_cardEditor(){return Wt`
      Sadly you cannot edit cards from the visual editor yet.
      <p />
      Check out the
      <a target="_blank" rel="noopener noreferrer" href="https://github.com/JonahKr/power-distribution-card#cards-"
        >Readme</a
      >
      to check out the latest and best way to add it.
    `}_valueChanged(t){if(this._config&&this.hass){if(t.target){const e=t.target;e.configValue&&(this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value}))}we(this,"config-changed",{config:this._config})}}static get styles(){return[dt`
        .checkbox {
          display: flex;
          align-items: center;
          padding: 8px 0;
        }
        .checkbox input {
          height: 20px;
          width: 20px;
          margin-left: 0;
          margin-right: 8px;
        }
      `,dt`
        h3 {
          margin-bottom: 0.5em;
        }
        .row {
          margin-bottom: 12px;
          margin-top: 12px;
          display: block;
        }
        .side-by-side {
          display: flex;
        }
        .side-by-side > * {
          flex: 1 1 0%;
          padding-right: 4px;
        }
        .entity,
        .add-item {
          display: flex;
          align-items: center;
        }
        .entity .handle {
          padding-right: 8px;
          cursor: move;
        }
        .entity ha-entity-picker,
        .add-item ha-entity-picker {
          flex-grow: 1;
        }
        .add-preset {
          padding-right: 8px;
          max-width: 130px;
        }
        .remove-icon,
        .edit-icon,
        .add-icon {
          --mdc-icon-button-size: 36px;
          color: var(--secondary-text-color);
        }
        .secondary {
          font-size: 12px;
          color: var(--secondary-text-color);
        }`]}};t([fe({attribute:!1})],Wa.prototype,"hass",void 0),t([ge()],Wa.prototype,"_config",void 0),t([ge()],Wa.prototype,"_subElementEditor",void 0),Wa=t([he("power-distribution-card-editor")],Wa);var Fa=Object.freeze({__proto__:null,get PowerDistributionCardEditor(){return Wa}});console.info("%c POWER-DISTRIBUTION-CARD %c 2.5.11 ","font-weight: 500; color: white; background: #03a9f4;","font-weight: 500; color: #03a9f4; background: white;"),window.customCards.push({type:"power-distribution-card",name:"Power Distribution Card",description:Xe("common.description")});let qa=class extends ce{constructor(){super(...arguments),this._narrow=!1}static async getConfigElement(){return await Promise.resolve().then((function(){return Fa})),document.createElement("power-distribution-card-editor")}static getStubConfig(){return{title:"Title",entities:[],center:{type:"bars",content:[{preset:"autarky",name:Xe("editor.settings.autarky")},{preset:"ratio",name:Xe("editor.settings.ratio")}]}}}async setConfig(t){const e=Object.assign({},ke,t,{entities:[]});if(!t.entities)throw new Error("You need to define Entities!");t.entities.forEach((t=>{if(!t.preset||!Oe.includes(t.preset))throw new Error("The preset `"+t.preset+"` is not a valid entry. Please choose a Preset from the List.");{const i=Object.assign({},De,Te[t.preset],t);e.entities.push(i)}})),this._config=e,"card"==this._config.center.type&&(this._card=this._createCardElement(this._config.center.content))}firstUpdated(){const t=this._config;if(t.entities.forEach(((t,e)=>{if(!t.entity)return;const i=this._state({entity:t.entity,attribute:"unit_of_measurement"});t.unit_of_measurement||(this._config.entities[e].unit_of_measurement=i||"W")})),"bars"==t.center.type){const e=t.center.content.map((t=>{let e="%";return t.entity&&(e=this._state({entity:t.entity,attribute:"unit_of_measurement"})),Object.assign(Object.assign({},t),{unit_of_measurement:t.unit_of_measurement||e})}));this._config=Object.assign(Object.assign({},this._config),{center:Object.assign(Object.assign({},this._config.center),{content:e})})}this._adjustWidth(),this._attachObserver(),this.requestUpdate()}updated(t){super.updated(t),this._card&&(t.has("hass")||t.has("editMode"))&&this.hass&&(this._card.hass=this.hass)}static get styles(){return Pe}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>this._attachObserver()))}disconnectedCallback(){this._resizeObserver&&this._resizeObserver.disconnect()}async _attachObserver(){var t;this._resizeObserver||(await(async()=>{"function"!=typeof ui&&(window.ResizeObserver=(await Promise.resolve().then((function(){return pi}))).default)})(),this._resizeObserver=new ui(function(t,e,i){var n;return void 0===i&&(i=!1),function(){var o=[].slice.call(arguments),r=this,a=i&&!n;clearTimeout(n),n=setTimeout((function(){n=null,i||t.apply(r,o)}),e),a&&t.apply(r,o)}}((()=>this._adjustWidth()),250,!1)));const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("ha-card");e&&this._resizeObserver.observe(e)}_adjustWidth(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("ha-card");e&&(this._narrow=e.offsetWidth<400)}_val(t){var e;let i=t.invert_value?-1:1;"k"==(null===(e=t.unit_of_measurement)||void 0===e?void 0:e.charAt(0))&&(i*=1e3);let n=this._state(t);const o=t.threshold||null;return n=o&&Math.abs(n)<o?0:n,n*i}_state(t){return t.entity&&this.hass.states[t.entity]?t.attribute?this.hass.states[t.entity].attributes[t.attribute]:this.hass.states[t.entity].state:null}render(){const t=[],e=[],i=[];let n=0,o=0;this._config.entities.forEach(((e,r)=>{const a=this._val(e);e.calc_excluded||(e.producer&&a>0&&(o+=a),e.consumer&&a<0&&(n-=a));const s=this._render_item(a,e,r);r%2==0?t.push(s):i.push(s)}));switch(this._config.center.type){case"none":break;case"card":this._card?e.push(this._card):console.warn("NO CARD");break;case"bars":e.push(this._render_bars(n,o))}return Wt` ${this._narrow?Me:void 0}
      <ha-card .header=${this._config.title}>
        <div class="card-content">
          <div id="left-panel">${t}</div>
          <div id="center-panel">${e}</div>
          <div id="right-panel">${i}</div>
        </div>
      </ha-card>`}_handleAction(t){this.hass&&this._config&&t.detail.action&&function(t,e,i,n){var o;"double_tap"===n&&i.double_tap_action?o=i.double_tap_action:"hold"===n&&i.hold_action?o=i.hold_action:"tap"===n&&i.tap_action&&(o=i.tap_action),xe(t,e,i,o)}(this,this.hass,{entity:t.currentTarget.entity,tap_action:t.currentTarget.tap_action,double_tap_action:t.currentTarget.double_tap_action},t.detail.action)}_render_item(t,e,i){if(!e.entity)return Wt`<item class="placeholder"></item>`;let n=t,o=e.unit_of_display||"W";if("k"==o.charAt(0)[0])n/=1e3;else if("adaptive"==e.unit_of_display){let t="W";e.unit_of_measurement&&(t="k"==e.unit_of_measurement[0]?e.unit_of_measurement.substring(1):e.unit_of_measurement),Math.abs(n)>999?(n/=1e3,o="k"+t):o=t}const r=10**(e.decimals||0==e.decimals?e.decimals:2);n=Math.round(n*r)/r;const a=e.invert_arrow?-1*n:n;n=e.display_abs?Math.abs(n):n;const s=_e(n,this.hass.locale);let l;e.secondary_info_entity&&(l=e.secondary_info_attribute?this._state({entity:e.secondary_info_entity,attribute:e.secondary_info_attribute})+"":`${this._state({entity:e.secondary_info_entity})}${this._state({entity:e.secondary_info_entity,attribute:"unit_of_measurement"})||""}`),e.secondary_info_replace_name&&(e.name=l,l=void 0);let c=e.icon;if("battery"===e.preset&&e.battery_percentage_entity){const t=this._val({entity:e.battery_percentage_entity});isNaN(t)||(c="mdi:battery",t<5?c="mdi:battery-outline":t<95&&(c="mdi:battery-"+(t/10).toFixed(0)+"0"))}let d=!1,h=Wt``;"grid"===e.preset&&(e.grid_buy_entity||e.grid_sell_entity)&&(d=!0,h=Wt`
        <div class="buy-sell">
          ${e.grid_buy_entity?Wt`<div class="grid-buy">
                B:
                ${this._val({entity:e.grid_buy_entity})}${this._state({entity:e.grid_buy_entity,attribute:"unit_of_measurement"})||void 0}
              </div>`:void 0}
          ${e.grid_sell_entity?Wt`<div class="grid-sell">
                S:
                ${this._val({entity:e.grid_sell_entity})}${this._state({entity:e.grid_sell_entity,attribute:"unit_of_measurement"})||void 0}
              </div>`:void 0}
        </div>
      `);const u=e.color_threshold||0;let p,f;e.icon_color&&(a>u&&(p=e.icon_color.bigger),a<u&&(p=e.icon_color.smaller),a==u&&(p=e.icon_color.equal)),e.arrow_color&&(a>u&&(f=e.arrow_color.bigger),a<u&&(f=e.arrow_color.smaller),a==u&&(f=e.arrow_color.equal));const g=isNaN(n);return Wt`
      <item
        .entity=${e.entity}
        .tap_action=${e.tap_action}
        .double_tap_action=${e.double_tap_action}
        @action=${this._handleAction}
        .actionHandler=${wi({hasDoubleClick:Ce(e.double_tap_action)})}
    ">
        <badge>
          <icon>
            <ha-icon icon="${c}" style="${p?`color:${p};`:""}"></ha-icon>
            ${l?Wt`<p class="secondary">${l}</p>`:null}
          </icon>
          ${d?h:Wt`<p class="subtitle">${e.name}</p>`}
        </badge>
        <value>
          <p>${g?"":s} ${g?"":o}</p>
          ${e.hide_arrows?Wt``:this._render_arrow(0==t||g?"none":i%2==0?a>0?"right":"left":a>0?"left":"right",f)}
        <value
      </item>
    `}_render_arrow(t,e){const i=this._config.animation;return"none"==t?Wt` <div class="blank" style="${e?`background-color:${e};`:""}"></div> `:Wt`
        <div class="arrow-container ${t}">
          <div class="arrow ${i} " style="border-left-color: ${e};"></div>
          <div class="arrow ${i} ${"flash"==i?"delay-1":""}" style="border-left-color: ${e};"></div>
          <div class="arrow ${i} ${"flash"==i?"delay-2":""}" style="border-left-color: ${e};"></div>
          <div class="arrow ${i}" style="border-left-color: ${e};"></div>
        </div>
      `}_render_bars(t,e){const i=[];return this._config.center.content&&0!=this._config.center.content.length?(this._config.center.content.forEach((n=>{let o=-1;switch(n.preset){case"autarky":n.entity||(o=0!=t?Math.min(Math.round(100*e/Math.abs(t)),100):0);break;case"ratio":n.entity||(o=0!=e?Math.min(Math.round(100*Math.abs(t)/e),100):0)}o<0&&(o=Math.min(parseInt(this._val(n).toFixed(0),10),100)),i.push(Wt`
        <div
          class="bar-element"
          .entity=${n.entity}
          .tap_action=${n.tap_action}
          .double_tap_action=${n.double_tap_action}
          @action=${this._handleAction}
          .actionHandler=${wi({hasDoubleClick:Ce(n.double_tap_action)})}
          style="${n.tap_action||n.double_tap_action?"cursor: pointer;":""}"
        >
          <p class="bar-percentage">${o}${n.unit_of_measurement||"%"}</p>
          <div class="bar-wrapper" style="${n.bar_bg_color?`background-color:${n.bar_bg_color};`:""}">
            <bar style="height:${o}%; background-color:${n.bar_color};" />
          </div>
          <p>${n.name||""}</p>
        </div>
      `)})),Wt`${i.map((t=>Wt`${t}`))}`):Wt``}_createCardElement(t){const e=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return n("hui-error-card",{type:"error",error:t,config:e})},n=function(t,e){var n=window.document.createElement(t);try{if(!n.setConfig)return;n.setConfig(e)}catch(n){return console.error(t,n),i(n.message,e)}return n};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var o=t.type;if(o&&o.startsWith("custom:"))o=o.substr(7);else if(e)if(Ee.has(o))o="hui-"+o+"-row";else{if(!t.entity)return i("Invalid config given.",t);var r=t.entity.split(".",1)[0];o="hui-"+(Ae[r]||"text")+"-entity-row"}else o="hui-"+o+"-card";if(customElements.get(o))return n(o,t);var a=i("Custom element doesn't exist: "+t.type+".",t);a.style.display="None";var s=setTimeout((function(){a.style.display=""}),2e3);return customElements.whenDefined(t.type).then((function(){clearTimeout(s),we(a,"ll-rebuild",{},a)})),a}(t);return this.hass&&(e.hass=this.hass),e.addEventListener("ll-rebuild",(i=>{i.stopPropagation(),this._rebuildCard(e,t)}),{once:!0}),e}_rebuildCard(t,e){const i=this._createCardElement(e);t.parentElement&&t.parentElement.replaceChild(i,t),this._card===t&&(this._card=i)}};t([fe()],qa.prototype,"hass",void 0),t([ge()],qa.prototype,"_config",void 0),t([fe()],qa.prototype,"_card",void 0),t([ge()],qa.prototype,"_narrow",void 0),qa=t([he("power-distribution-card")],qa);export{qa as PowerDistributionCard};
