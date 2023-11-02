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
 */,{is:s,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,g=f?f.emptyScript:"",v=p.reactiveElementPolyfillSupport,m=(t,e)=>t,b={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!s(t,e),y={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&l(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const r=n?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,n)=>{if(i)t.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of n){const n=document.createElement("style"),o=e.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=i.cssText,t.appendChild(n)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:b;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??_)(n?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,v?.({ReactiveElement:$}),(p.reactiveElementVersions??=[]).push("2.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w=globalThis,E=w.trustedTypes,A=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,C="?"+x,T=`<${C}>`,O=document,D=()=>O.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,M=t=>P(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,H=/>/g,j=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),U=/'/g,B=/"/g,L=/^(?:script|style|textarea|title)$/i,z=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),X=new WeakMap,Y=O.createTreeWalker(O,129);function W(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":"",a=I;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===I?"!--"===l[1]?a=R:void 0!==l[1]?a=H:void 0!==l[2]?(L.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=j):void 0!==l[3]&&(a=j):a===j?">"===l[0]?(a=o??I,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?j:'"'===l[3]?B:U):a===B||a===U?a=j:a===R||a===H?a=I:(a=j,o=void 0);const h=a===j&&t[e+1].startsWith("/>")?" ":"";r+=a===I?i+T:c>=0?(n.push(s),i.slice(0,c)+S+i.slice(c)+x+h):i+x+(-2===c?e:h)}return[W(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};let q=class t{constructor({strings:e,_$litType$:i},n){let o;this.parts=[];let r=0,a=0;const s=e.length-1,l=this.parts,[c,d]=F(e,i);if(this.el=t.createElement(c,n),Y.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Y.nextNode())&&l.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(S)){const e=d[a++],i=o.getAttribute(t).split(x),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?Q:"?"===n[1]?tt:"@"===n[1]?et:J}),o.removeAttribute(t)}else t.startsWith(x)&&(l.push({type:6,index:r}),o.removeAttribute(t));if(L.test(o.tagName)){const t=o.textContent.split(x),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],D()),Y.nextNode(),l.push({type:2,index:++r});o.append(t[e],D())}}}else if(8===o.nodeType)if(o.data===C)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(x,t+1));)l.push({type:7,index:r}),t+=x.length-1}r++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}};function G(t,e,i=t,n){if(e===z)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=k(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,n)),e}let K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??O).importNode(e,!0);Y.currentNode=n;let o=Y.nextNode(),r=0,a=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new Z(o,o.nextSibling,this,t):1===s.type?e=new s.ctor(o,s.name,s.strings,this,t):6===s.type&&(e=new it(o,this,t)),this._$AV.push(e),s=i[++a]}r!==s?.index&&(o=Y.nextNode(),r++)}return Y.currentNode=O,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),k(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==z&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):M(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==V&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(O.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=q.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new K(n,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=X.get(t.strings);return void 0===e&&X.set(t.strings,e=new q(t)),e}T(e){P(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let n,o=0;for(const r of e)o===i.length?i.push(n=new t(this.k(D()),this.k(D()),this,this.options)):n=i[o],n._$AI(r),o++;o<i.length&&(this._$AR(n&&n._$AB.nextSibling,o),i.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=G(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==z,r&&(this._$AH=t);else{const n=t;let a,s;for(t=o[0],a=0;a<o.length-1;a++)s=G(this,n[i+a],e,a),s===z&&(s=this._$AH[a]),r||=!k(s)||s!==this._$AH[a],s===V?t=V:t!==V&&(t+=(s??"")+o[a+1]),this._$AH[a]=s}r&&!n&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Q=class extends J{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}},tt=class extends J{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}},et=class extends J{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===z)return;const i=this._$AH,n=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==V&&(i===V||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},it=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}};const nt={S:S,A:x,P:C,C:1,M:F,L:K,R:M,V:G,D:Z,I:J,H:tt,N:et,U:Q,B:it},ot=w.litHtmlPolyfillSupport;ot?.(q,Z),(w.litHtmlVersions??=[]).push("3.0.0");
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
 */,{is:ut,defineProperty:pt,getOwnPropertyDescriptor:ft,getOwnPropertyNames:gt,getOwnPropertySymbols:vt,getPrototypeOf:mt}=Object,bt=globalThis,_t=bt.trustedTypes,yt=_t?_t.emptyScript:"",$t=bt.reactiveElementPolyfillSupport,wt=(t,e)=>t,Et={toAttribute(t,e){switch(e){case Boolean:t=t?yt:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},At=(t,e)=>!ut(t,e),St={attribute:!0,type:String,converter:Et,reflect:!1,hasChanged:At};Symbol.metadata??=Symbol("metadata"),bt.litPropertyMetadata??=new WeakMap;class xt extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=St){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&pt(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:o}=ft(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const r=n?.call(this);o.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??St}static _$Ei(){if(this.hasOwnProperty(wt("elementProperties")))return;const t=mt(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(wt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(wt("properties"))){const t=this.properties,e=[...gt(t),...vt(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(ht(t))}else void 0!==t&&e.push(ht(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(at)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),n=rt.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:Et).toAttribute(e,i.type);this._$Em=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:Et;this._$Em=n,this[n]=o.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i,n=!1,o){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??At)(n?o:this[t],e))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$ET()}catch(e){throw t=!1,this._$ET(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EO(t,this[t]))),this._$ET()}updated(t){}firstUpdated(t){}}xt.elementStyles=[],xt.shadowRootOptions={mode:"open"},xt[wt("elementProperties")]=new Map,xt[wt("finalized")]=new Map,$t?.({ReactiveElement:xt}),(bt.reactiveElementVersions??=[]).push("2.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct=globalThis,Tt=Ct.trustedTypes,Ot=Tt?Tt.createPolicy("lit-html",{createHTML:t=>t}):void 0,Dt="$lit$",kt=`lit$${(Math.random()+"").slice(9)}$`,Pt="?"+kt,Mt=`<${Pt}>`,Nt=document,It=()=>Nt.createComment(""),Rt=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Ht=Array.isArray,jt="[ \t\n\f\r]",Ut=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bt=/-->/g,Lt=/>/g,zt=RegExp(`>|${jt}(?:([^\\s"'>=/]+)(${jt}*=${jt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Vt=/'/g,Xt=/"/g,Yt=/^(?:script|style|textarea|title)$/i,Wt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Ft=Symbol.for("lit-noChange"),qt=Symbol.for("lit-nothing"),Gt=new WeakMap,Kt=Nt.createTreeWalker(Nt,129);function Zt(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Ot?Ot.createHTML(e):e}const Jt=(t,e)=>{const i=t.length-1,n=[];let o,r=2===e?"<svg>":"",a=Ut;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===Ut?"!--"===l[1]?a=Bt:void 0!==l[1]?a=Lt:void 0!==l[2]?(Yt.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=zt):void 0!==l[3]&&(a=zt):a===zt?">"===l[0]?(a=o??Ut,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?zt:'"'===l[3]?Xt:Vt):a===Xt||a===Vt?a=zt:a===Bt||a===Lt?a=Ut:(a=zt,o=void 0);const h=a===zt&&t[e+1].startsWith("/>")?" ":"";r+=a===Ut?i+Mt:c>=0?(n.push(s),i.slice(0,c)+Dt+i.slice(c)+kt+h):i+kt+(-2===c?e:h)}return[Zt(t,r+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};let Qt=class t{constructor({strings:e,_$litType$:i},n){let o;this.parts=[];let r=0,a=0;const s=e.length-1,l=this.parts,[c,d]=Jt(e,i);if(this.el=t.createElement(c,n),Kt.currentNode=this.el.content,2===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Kt.nextNode())&&l.length<s;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(Dt)){const e=d[a++],i=o.getAttribute(t).split(kt),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?oe:"?"===n[1]?re:"@"===n[1]?ae:ne}),o.removeAttribute(t)}else t.startsWith(kt)&&(l.push({type:6,index:r}),o.removeAttribute(t));if(Yt.test(o.tagName)){const t=o.textContent.split(kt),e=t.length-1;if(e>0){o.textContent=Tt?Tt.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],It()),Kt.nextNode(),l.push({type:2,index:++r});o.append(t[e],It())}}}else if(8===o.nodeType)if(o.data===Pt)l.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(kt,t+1));)l.push({type:7,index:r}),t+=kt.length-1}r++}}static createElement(t,e){const i=Nt.createElement("template");return i.innerHTML=t,i}};function te(t,e,i=t,n){if(e===Ft)return e;let o=void 0!==n?i._$Co?.[n]:i._$Cl;const r=Rt(e)?void 0:e._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),void 0===r?o=void 0:(o=new r(t),o._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=o:i._$Cl=o),void 0!==o&&(e=te(t,o._$AS(t,e.values),o,n)),e}class ee{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??Nt).importNode(e,!0);Kt.currentNode=n;let o=Kt.nextNode(),r=0,a=0,s=i[0];for(;void 0!==s;){if(r===s.index){let e;2===s.type?e=new ie(o,o.nextSibling,this,t):1===s.type?e=new s.ctor(o,s.name,s.strings,this,t):6===s.type&&(e=new se(o,this,t)),this._$AV.push(e),s=i[++a]}r!==s?.index&&(o=Kt.nextNode(),r++)}return Kt.currentNode=Nt,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ie{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=qt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=te(this,t,e),Rt(t)?t===qt||null==t||""===t?(this._$AH!==qt&&this._$AR(),this._$AH=qt):t!==this._$AH&&t!==Ft&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>Ht(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==qt&&Rt(this._$AH)?this._$AA.nextSibling.data=t:this.$(Nt.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Qt.createElement(Zt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new ee(n,this),i=t.u(this.options);t.p(e),this.$(i),this._$AH=t}}_$AC(t){let e=Gt.get(t.strings);return void 0===e&&Gt.set(t.strings,e=new Qt(t)),e}T(t){Ht(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const o of t)n===e.length?e.push(i=new ie(this.k(It()),this.k(It()),this,this.options)):i=e[n],i._$AI(o),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,o){this.type=1,this._$AH=qt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=qt}_$AI(t,e=this,i,n){const o=this.strings;let r=!1;if(void 0===o)t=te(this,t,e,0),r=!Rt(t)||t!==this._$AH&&t!==Ft,r&&(this._$AH=t);else{const n=t;let a,s;for(t=o[0],a=0;a<o.length-1;a++)s=te(this,n[i+a],e,a),s===Ft&&(s=this._$AH[a]),r||=!Rt(s)||s!==this._$AH[a],s===qt?t=qt:t!==qt&&(t+=(s??"")+o[a+1]),this._$AH[a]=s}r&&!n&&this.j(t)}j(t){t===qt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class oe extends ne{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===qt?void 0:t}}let re=class extends ne{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==qt)}};class ae extends ne{constructor(t,e,i,n,o){super(t,e,i,n,o),this.type=5}_$AI(t,e=this){if((t=te(this,t,e,0)??qt)===Ft)return;const i=this._$AH,n=t===qt&&i!==qt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==qt&&(i===qt||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class se{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}}const le=Ct.litHtmlPolyfillSupport;le?.(Qt,ie),(Ct.litHtmlVersions??=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let ce=class extends xt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let o=n._$litPart$;if(void 0===o){const t=i?.renderBefore??null;n._$litPart$=o=new ie(e.insertBefore(It(),t),t,void 0,i??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Ft}};ce._$litElement$=!0,ce.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ce});const de=globalThis.litElementPolyfillSupport;de?.({LitElement:ce}),(globalThis.litElementVersions??=[]).push("4.0.0");
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
 */}function ge(t){return fe({...t,state:!0,attribute:!1})}var ve,me;function be(){return(be=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ve||(ve={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(me||(me={}));var _e=function(t,e,i){var n=e?function(t){switch(t.number_format){case ve.comma_decimal:return["en-US","en"];case ve.decimal_comma:return["de","es","it"];case ve.space_comma:return["fr","sv","cs"];case ve.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==ve.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(n,ye(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,ye(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},ye=function(t,e){var i=be({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var n=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=n,i.maximumFractionDigits=n}return i},$e=["closed","locked","off"],we=function(t,e,i,n){n=n||{},i=null==i?{}:i;var o=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return o.detail=i,t.dispatchEvent(o),o},Ee=new Set(["call-service","divider","section","weblink","cast","select"]),Ae={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},Se=function(t){we(window,"haptic",t)},xe=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(Se("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&we(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),we(window,"location-changed",{replace:i})}(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(function(t,e){(function(t,e,i){void 0===i&&(i=!0);var n,o=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===o?"homeassistant":o;switch(o){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}t.callService(r,n,{entity_id:e})})(t,e,$e.includes(t.states[e].state))}(e,i.entity),Se("success"));break;case"call-service":if(!n.service)return void Se("failure");var o=n.service.split(".",2);e.callService(o[0],o[1],n.service_data,n.target),Se("success");break;case"fire-dom-event":we(t,"ll-custom",n)}};function Ce(t){return void 0!==t&&"none"!==t.action}const Te=["battery","car_charger","consumer","grid","home","hydro","pool","producer","solar","wind","heating","placeholder"],Oe={battery:{consumer:!0,icon:"mdi:battery-outline",name:"battery",producer:!0},car_charger:{consumer:!0,icon:"mdi:car-electric",name:"car"},consumer:{consumer:!0,icon:"mdi:lightbulb",name:"consumer"},grid:{icon:"mdi:transmission-tower",name:"grid"},home:{consumer:!0,icon:"mdi:home-assistant",name:"home"},hydro:{icon:"mdi:hydro-power",name:"hydro",producer:!0},pool:{consumer:!0,icon:"mdi:pool",name:"pool"},producer:{icon:"mdi:lightning-bolt-outline",name:"producer",producer:!0},solar:{icon:"mdi:solar-power",name:"solar",producer:!0},wind:{icon:"mdi:wind-turbine",name:"wind",producer:!0},heating:{icon:"mdi:radiator",name:"heating",consumer:!0},placeholder:{name:"placeholder"}},De={decimals:2,display_abs:!0,name:"",unit_of_display:"W"},ke={type:"",title:void 0,animation:"flash",entities:[],center:{type:"none"}},Pe=dt`
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
`;var Ne={version:"Version",description:"A Lovelace Card for visualizing power distributions.",invalid_configuration:"Invalid configuration",show_warning:"Show Warning"},Ie={actions:{add:"Add",edit:"Edit",remove:"Remove",save:"Save"},optional:"Optional",required:"Required",settings:{action_settings:"Action Settings",animation:"Animation",autarky:"autarky",attribute:"Attribute",background_color:"Background Color",battery_percentage:"Battery Charge %",bigger:"Bigger",calc_excluded:"Excluded from Calculations",center:"Center",color:"Color","color-settings":"Color Settings",color_threshold:"Color Threshold",decimals:"Decimals","display-abs":"Display Absolute Value",double_tap_action:"Double Tap Action",entities:"Entities",entity:"Entity",equal:"Equal","grid-buy":"Grid Buy","grid-sell":"Grid Sell","hide-arrows":"Hide Arrows",icon:"Icon","invert-value":"Invert Value",name:"Name",preset:"Preset",ratio:"ratio",replace_name:"Replace Name","secondary-info":"Secondary Info",settings:"settings",smaller:"Smaller",tap_action:"Tap Action",threshold:"Threshold",title:"Title",unit_of_display:"Unit of Display",value:"value"}},Re={common:Ne,editor:Ie},He={version:"Version",description:"Eine Karte zur Visualizierung von Stromverteilungen",invalid_configuration:"Ungültige Konfiguration",show_warning:"Warnung"},je={actions:{add:"Hinzufügen",edit:"Bearbeiten",remove:"Entfernen",save:"Speichern"},optional:"Optional",required:"Erforderlich",settings:{action_settings:"Interaktions Einstellungen",animation:"Animation",autarky:"Autarkie",attribute:"Attribut",background_color:"Hintergrundfarbe",battery_percentage:"Batterie Ladung %",bigger:"Größer ",calc_excluded:"Von Rechnungen ausschließen",center:"Mittelbereich",color:"Farbe","color-settings":"Farb Einstellungen",color_threshold:"Farb-Schwellenwert",decimals:"Dezimalstellen","display-abs":"Absolute Wertanzeige",double_tap_action:"Doppel Tipp Aktion",entities:"Entities",entity:"Element",equal:"Gleich","grid-buy":"Netz Ankauf","grid-sell":"Netz Verkauf","hide-arrows":"Pfeile Verstecken",icon:"Symbol","invert-value":"Wert Invertieren",name:"Name",preset:"Vorlagen",ratio:"Anteil",replace_name:"Namen Ersetzen","secondary-info":"Zusatzinformationen",settings:"Einstellungen",smaller:"Kleiner",tap_action:"Tipp Aktion",threshold:"Schwellenwert",title:"Titel",unit_of_display:"Angezeigte Einheit",value:"Wert"}},Ue={common:He,editor:je};const Be={en:Object.freeze({__proto__:null,common:Ne,default:Re,editor:Ie}),de:Object.freeze({__proto__:null,common:He,default:Ue,editor:je})};function Le(t,e=!1,i="",n=""){const o=(localStorage.getItem("selectedLanguage")||navigator.language.split("-")[0]||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=t.split(".").reduce(((t,e)=>t[e]),Be[o])}catch(e){r=t.split(".").reduce(((t,e)=>t[e]),Be.en)}return void 0===r&&(r=t.split(".").reduce(((t,e)=>t[e]),Be.en)),""!==i&&""!==n&&(r=r.replace(i,n)),e?function(t){return t.charAt(0).toUpperCase()+t.slice(1)}(r):r}var ze=function(){if("undefined"!=typeof Map)return Map;function t(t,e){var i=-1;return t.some((function(t,n){return t[0]===e&&(i=n,!0)})),i}return function(){function e(){this.__entries__=[]}return Object.defineProperty(e.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),e.prototype.get=function(e){var i=t(this.__entries__,e),n=this.__entries__[i];return n&&n[1]},e.prototype.set=function(e,i){var n=t(this.__entries__,e);~n?this.__entries__[n][1]=i:this.__entries__.push([e,i])},e.prototype.delete=function(e){var i=this.__entries__,n=t(i,e);~n&&i.splice(n,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var i=0,n=this.__entries__;i<n.length;i++){var o=n[i];t.call(e,o[1],o[0])}},e}()}(),Ve="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,Xe="undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:"undefined"!=typeof window&&window.Math===Math?window:Function("return this")(),Ye="function"==typeof requestAnimationFrame?requestAnimationFrame.bind(Xe):function(t){return setTimeout((function(){return t(Date.now())}),1e3/60)};var We=["top","right","bottom","left","width","height","size","weight"],Fe="undefined"!=typeof MutationObserver,qe=function(){function t(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=function(t,e){var i=!1,n=!1,o=0;function r(){i&&(i=!1,t()),n&&s()}function a(){Ye(r)}function s(){var t=Date.now();if(i){if(t-o<2)return;n=!0}else i=!0,n=!1,setTimeout(a,e);o=t}return s}(this.refresh.bind(this),20)}return t.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},t.prototype.removeObserver=function(t){var e=this.observers_,i=e.indexOf(t);~i&&e.splice(i,1),!e.length&&this.connected_&&this.disconnect_()},t.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},t.prototype.updateObservers_=function(){var t=this.observers_.filter((function(t){return t.gatherActive(),t.hasActive()}));return t.forEach((function(t){return t.broadcastActive()})),t.length>0},t.prototype.connect_=function(){Ve&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),Fe?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},t.prototype.disconnect_=function(){Ve&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},t.prototype.onTransitionEnd_=function(t){var e=t.propertyName,i=void 0===e?"":e;We.some((function(t){return!!~i.indexOf(t)}))&&this.refresh()},t.getInstance=function(){return this.instance_||(this.instance_=new t),this.instance_},t.instance_=null,t}(),Ge=function(t,e){for(var i=0,n=Object.keys(e);i<n.length;i++){var o=n[i];Object.defineProperty(t,o,{value:e[o],enumerable:!1,writable:!1,configurable:!0})}return t},Ke=function(t){return t&&t.ownerDocument&&t.ownerDocument.defaultView||Xe},Ze=ni(0,0,0,0);function Je(t){return parseFloat(t)||0}function Qe(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];return e.reduce((function(e,i){return e+Je(t["border-"+i+"-width"])}),0)}function ti(t){var e=t.clientWidth,i=t.clientHeight;if(!e&&!i)return Ze;var n=Ke(t).getComputedStyle(t),o=function(t){for(var e={},i=0,n=["top","right","bottom","left"];i<n.length;i++){var o=n[i],r=t["padding-"+o];e[o]=Je(r)}return e}(n),r=o.left+o.right,a=o.top+o.bottom,s=Je(n.width),l=Je(n.height);if("border-box"===n.boxSizing&&(Math.round(s+r)!==e&&(s-=Qe(n,"left","right")+r),Math.round(l+a)!==i&&(l-=Qe(n,"top","bottom")+a)),!function(t){return t===Ke(t).document.documentElement}(t)){var c=Math.round(s+r)-e,d=Math.round(l+a)-i;1!==Math.abs(c)&&(s-=c),1!==Math.abs(d)&&(l-=d)}return ni(o.left,o.top,s,l)}var ei="undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof Ke(t).SVGGraphicsElement}:function(t){return t instanceof Ke(t).SVGElement&&"function"==typeof t.getBBox};function ii(t){return Ve?ei(t)?function(t){var e=t.getBBox();return ni(0,0,e.width,e.height)}(t):ti(t):Ze}function ni(t,e,i,n){return{x:t,y:e,width:i,height:n}}var oi=function(){function t(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=ni(0,0,0,0),this.target=t}return t.prototype.isActive=function(){var t=ii(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},t.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},t}(),ri=function(t,e){var i=function(t){var e=t.x,i=t.y,n=t.width,o=t.height,r="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,a=Object.create(r.prototype);return Ge(a,{x:e,y:i,width:n,height:o,top:i,right:e+n,bottom:o+i,left:e}),a}(e);Ge(this,{target:t,contentRect:i})},ai=function(){function t(t,e,i){if(this.activeObservations_=[],this.observations_=new ze,"function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=e,this.callbackCtx_=i}return t.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Ke(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new oi(t)),this.controller_.addObserver(this),this.controller_.refresh())}},t.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Ke(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},t.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},t.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach((function(e){e.isActive()&&t.activeObservations_.push(e)}))},t.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map((function(t){return new ri(t.target,t.broadcastRect())}));this.callback_.call(t,e,t),this.clearActive()}},t.prototype.clearActive=function(){this.activeObservations_.splice(0)},t.prototype.hasActive=function(){return this.activeObservations_.length>0},t}(),si="undefined"!=typeof WeakMap?new WeakMap:new ze,li=function t(e){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var i=qe.getInstance(),n=new ai(e,i,this);si.set(this,n)};["observe","unobserve","disconnect"].forEach((function(t){li.prototype[t]=function(){var e;return(e=si.get(this))[t].apply(e,arguments)}}));var ci=void 0!==Xe.ResizeObserver?Xe.ResizeObserver:li,di=Object.freeze({__proto__:null,default:ci});function hi(t,e,i){const n=new CustomEvent(e,{bubbles:!1,composed:!1,detail:i});t.dispatchEvent(n)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ui=2,pi=t=>(...e)=>({_$litDirective$:t,values:e});class fi{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}const gi=(t,e)=>{if(t===e)return!0;if(t&&e&&"object"==typeof t&&"object"==typeof e){if(t.constructor!==e.constructor)return!1;let i,n;if(Array.isArray(t)){if(n=t.length,n!==e.length)return!1;for(i=n;0!=i--;)if(!gi(t[i],e[i]))return!1;return!0}if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(i of t.entries())if(!e.has(i[0]))return!1;for(i of t.entries())if(!gi(i[1],e.get(i[0])))return!1;return!0}if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(i of t.entries())if(!e.has(i[0]))return!1;return!0}if(ArrayBuffer.isView(t)&&ArrayBuffer.isView(e)){if(n=t.length,n!==e.length)return!1;for(i=n;0!=i--;)if(t[i]!==e[i])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf)return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString)return t.toString()===e.toString();const o=Object.keys(t);if(n=o.length,n!==Object.keys(e).length)return!1;for(i=n;0!=i--;)if(!Object.prototype.hasOwnProperty.call(e,o[i]))return!1;for(i=n;0!=i--;){const n=o[i];if(!gi(t[n],e[n]))return!1}return!0}return t!=t&&e!=e},vi=["more-info","toggle","navigate","url","call-service","none"];class mi extends HTMLElement{constructor(){super(...arguments),this.holdTime=500}bind(t,e={}){t.actionHandler&&gi(e,t.actionHandler.options)||(t.actionHandler&&t.removeEventListener("click",t.actionHandler.end),t.actionHandler={options:e},e.disabled||(t.actionHandler.end=i=>{const n=t;i.cancelable&&i.preventDefault(),clearTimeout(this.timer),this.timer=void 0,e.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout((()=>{this.dblClickTimeout=void 0,we(n,"action",{action:"tap"})}),250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,we(n,"action",{action:"double_tap"})):we(n,"action",{action:"tap"})},t.addEventListener("click",t.actionHandler.end)))}}customElements.define("action-handler-power-distribution-card",mi);const bi=(t,e)=>{const i=(()=>{const t=document.body;if(t.querySelector("action-handler-power-distribution-card"))return t.querySelector("action-handler-power-distribution-card");const e=document.createElement("action-handler-power-distribution-card");return t.appendChild(e),e})();i&&i.bind(t,e)},_i=pi(class extends fi{update(t,[e]){return bi(t.element,e),Ft}render(t){}});var yi="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",$i="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z";let wi=class extends ce{render(){var t,e,i,n,o,r,a,s;if(!this.hass||!this.config||"placeholder"==this.config.preset)return Wt``;const l=this.config;let c=[];l.entity&&(c=Object.keys(Object.assign({},null===(t=this.hass)||void 0===t?void 0:t.states[l.entity||0].attributes))||[]);let d=[];return l.secondary_info_entity&&(d=Object.keys(Object.assign({},null===(e=this.hass)||void 0===e?void 0:e.states[l.secondary_info_entity].attributes))||[]),Wt`
      <div class="side-by-side">
        <ha-icon-picker
          .label="${Le("editor.settings.icon")}  (${Le("editor.optional")})"
          .value=${l.icon}
          .configValue=${"icon"}
          @value-changed=${this._valueChanged}
        ></ha-icon-picker>
        <ha-textfield
          label="${Le("editor.settings.name")} (${Le("editor.optional")})"
          .value=${l.name||void 0}
          .configValue=${"name"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
      <div class="side-by-side">
        <ha-entity-picker
          label="${Le("editor.settings.entity")} (${Le("editor.required")})"
          allow-custom-entity
          hideClearIcon
          .hass=${this.hass}
          .configValue=${"entity"}
          .value=${l.entity}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-select
          label="${Le("editor.settings.attribute")} (${Le("editor.optional")})"
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
          label="${Le("editor.settings.preset")}"
          .configValue=${"preset"}
          .value=${l.preset||Te[0]}
          @selected=${this._valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          ${Te.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>
        <div class="checkbox">
          <input
            type="checkbox"
            id="hide-arrows"
            .checked="${l.hide_arrows||!1}"
            .configValue=${"hide_arrows"}
            @change=${this._valueChanged}
          />
          <label for="hide-arrows"> ${Le("editor.settings.hide-arrows")}</label>
        </div>
      </div>
      <div class="side-by-side">${this._renderPresetFeatures()}</div>
      <br /><br />
      <h3>${Le("editor.settings.value",!0)} ${Le("editor.settings.settings",!0)}</h3>
      <div class="side-by-side">
        <ha-textfield
          label="${Le("editor.settings.unit_of_display")}"
          .value=${l.unit_of_display||""}
          .configValue=${"unit_of_display"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-textfield
          auto-validate
          pattern="[0-9]"
          label="${Le("editor.settings.decimals")}"
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
          <label for="invert-value"> ${Le("editor.settings.invert-value")}</label>
        </div>
        <div class="checkbox">
          <input
            type="checkbox"
            id="display-abs"
            .checked="${0!=l.display_abs}"
            .configValue=${"display_abs"}
            @change=${this._valueChanged}
          />
          <label for="display-abs"> ${Le("editor.settings.display-abs")} </label>
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
          <label for="calc_excluded"> ${Le("editor.settings.calc_excluded")} </label>
        </div>
        <ha-textfield
          label="${Le("editor.settings.threshold")}"
          .value=${l.threshold||""}
          .configValue=${"threshold"}
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
      <br />
      <h3>${Le("editor.settings.secondary-info",!0)}</h3>
      <div class="side-by-side">
        <ha-entity-picker
          label="${Le("editor.settings.entity")}"
          allow-custom-entity
          hideClearIcon
          .hass=${this.hass}
          .configValue=${"secondary_info_entity"}
          .value=${l.secondary_info_entity}
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>
        <ha-select
          allow-custom-entity
          label="${Le("editor.settings.attribute")} (${Le("editor.optional")})"
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
        <label for="secondary_info_replace_name"> ${Le("editor.settings.replace_name")}</label>
      </div>
      <br />
      <h3>${Le("editor.settings.color-settings",!0)}</h3>
      <ha-textfield
        label="${Le("editor.settings.color_threshold")}"
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
              label="${Le("editor.settings.bigger")}"
              .value=${(null===(i=l.icon_color)||void 0===i?void 0:i.bigger)||""}
              .configValue=${"icon_color.bigger"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Le("editor.settings.equal")}"
              .value=${(null===(n=l.icon_color)||void 0===n?void 0:n.equal)||""}
              .configValue=${"icon_color.equal"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Le("editor.settings.smaller")}"
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
              label="${Le("editor.settings.bigger")}"
              .value=${(null===(r=l.arrow_color)||void 0===r?void 0:r.bigger)||""}
              .configValue=${"arrow_color.bigger"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Le("editor.settings.equal")}"
              .value=${(null===(a=l.arrow_color)||void 0===a?void 0:a.equal)||""}
              .configValue=${"arrow_color.equal"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
          <td>
            <ha-textfield
              label="${Le("editor.settings.smaller")}"
              .value=${(null===(s=l.arrow_color)||void 0===s?void 0:s.smaller)||""}
              .configValue=${"arrow_color.smaller"}
              @input=${this._colorChanged}
            ></ha-textfield>
          </td>
        </tr>
      </table>
      <br />
      <h3>${Le("editor.settings.action_settings")}</h3>
      <div class="side-by-side">
        <ha-selector
          label="${Le("editor.settings.tap_action")}"
          .hass=${this.hass}
          .selector=${{"ui-action":{actions:vi}}}
          .value=${l.tap_action||{action:"more-info"}}
          .configValue=${"tap_action"}
          @value-changed=${this._valueChanged}
        >
        </ha-selector>
        <ha-selector
          label="${Le("editor.settings.double_tap_action")}"
          .hass=${this.hass}
          .selector=${{"ui-action":{actions:vi}}}
          .value=${l.double_tap_action}
          .configValue=${"double_tap_action"}
          @value-changed=${this._valueChanged}
        >
        </ha-selector>
      </div>
    `}_renderPresetFeatures(){if(!this.config||!this.hass)return Wt``;switch(this.config.preset){case"battery":return Wt`
          <ha-entity-picker
            label="${Le("editor.settings.battery_percentage")} (${Le("editor.optional")})"
            allow-custom-entity
            hideClearIcon
            .hass=${this.hass}
            .configValue=${"battery_percentage_entity"}
            .value=${this.config.battery_percentage_entity||""}
            @value-changed=${this._valueChanged}
          ></ha-entity-picker>
        `;case"grid":return Wt`
          <ha-entity-picker
            label="${Le("editor.settings.grid-buy")} (${Le("editor.optional")})"
            allow-custom-entity
            hideClearIcon
            .hass=${this.hass}
            .configValue=${"grid_buy_entity"}
            .value=${this.config.grid_buy_entity||""}
            @value-changed=${this._valueChanged}
          ></ha-entity-picker>
          <ha-entity-picker
            label="${Le("editor.settings.grid-sell")} (${Le("editor.optional")})"
            allow-custom-entity
            hideClearIcon
            .hass=${this.hass}
            .configValue=${"grid_sell_entity"}
            .value=${this.config.grid_sell_entity||""}
            @value-changed=${this._valueChanged}
          ></ha-entity-picker>
        `;default:return Wt``}}_valueChanged(t){if(t.stopPropagation(),!this.config||!this.hass)return;const e=t.target,i=void 0!==e.checked?e.checked:t.detail.value||e.value||t.detail.config,n=e.configValue;n&&this.config[n]!==i&&hi(this,"config-changed",Object.assign(Object.assign({},this.config),{[n]:i}))}_colorChanged(t){if(t.stopPropagation(),!this.config||!this.hass)return;const e=t.target,i=e.value,n=e.configValue;if(!n)return;const[o,r]=n.split("."),a=Object.assign({},this.config[o])||{};a[r]=i,n&&this.config[o]!==a&&hi(this,"config-changed",Object.assign(Object.assign({},this.config),{[o]:a}))}static get styles(){return dt`
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
    `}};t([fe({attribute:!1})],wi.prototype,"config",void 0),t([fe({attribute:!1})],wi.prototype,"hass",void 0),wi=t([he("power-distribution-card-item-editor")],wi);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const{D:Ei}=nt,Ai=()=>document.createComment(""),Si=(t,e,i)=>{const n=t._$AA.parentNode,o=void 0===e?t._$AB:e._$AA;if(void 0===i){const e=n.insertBefore(Ai(),o),r=n.insertBefore(Ai(),o);i=new Ei(e,r,t,t.options)}else{const e=i._$AB.nextSibling,r=i._$AM,a=r!==t;if(a){let e;i._$AQ?.(t),i._$AM=t,void 0!==i._$AP&&(e=t._$AU)!==r._$AU&&i._$AP(e)}if(e!==o||a){let t=i._$AA;for(;t!==e;){const e=t.nextSibling;n.insertBefore(t,o),t=e}}}return i},xi=(t,e,i=t)=>(t._$AI(e,i),t),Ci={},Ti=t=>{t._$AP?.(!1,!0);let e=t._$AA;const i=t._$AB.nextSibling;for(;e!==i;){const t=e.nextSibling;e.remove(),e=t}},Oi=(t,e,i)=>{const n=new Map;for(let o=e;o<=i;o++)n.set(t[o],o);return n},Di=pi(class extends fi{constructor(t){if(super(t),t.type!==ui)throw Error("repeat() can only be used in text expressions")}ht(t,e,i){let n;void 0===i?i=e:void 0!==e&&(n=e);const o=[],r=[];let a=0;for(const e of t)o[a]=n?n(e,a):a,r[a]=i(e,a),a++;return{values:r,keys:o}}render(t,e,i){return this.ht(t,e,i).values}update(t,[e,i,n]){const o=(t=>t._$AH)(t),{values:r,keys:a}=this.ht(e,i,n);if(!Array.isArray(o))return this.dt=a,r;const s=this.dt??=[],l=[];let c,d,h=0,u=o.length-1,p=0,f=r.length-1;for(;h<=u&&p<=f;)if(null===o[h])h++;else if(null===o[u])u--;else if(s[h]===a[p])l[p]=xi(o[h],r[p]),h++,p++;else if(s[u]===a[f])l[f]=xi(o[u],r[f]),u--,f--;else if(s[h]===a[f])l[f]=xi(o[h],r[f]),Si(t,l[f+1],o[h]),h++,f--;else if(s[u]===a[p])l[p]=xi(o[u],r[p]),Si(t,o[h],o[u]),u--,p++;else if(void 0===c&&(c=Oi(a,p,f),d=Oi(s,h,u)),c.has(s[h]))if(c.has(s[u])){const e=d.get(a[p]),i=void 0!==e?o[e]:null;if(null===i){const e=Si(t,o[h]);xi(e,r[p]),l[p]=e}else l[p]=xi(i,r[p]),Si(t,o[h],i),o[e]=null;p++}else Ti(o[u]),u--;else Ti(o[h]),h++;for(;p<=f;){const e=Si(t,l[f+1]);xi(e,r[p]),l[p++]=e}for(;h<=u;){const t=o[h++];null!==t&&Ti(t)}return this.dt=a,((t,e=Ci)=>{t._$AH=e})(t,l),z}});
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
function ki(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function Pi(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?ki(Object(i),!0).forEach((function(e){Ni(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):ki(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function Mi(t){return Mi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Mi(t)}function Ni(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Ii(){return Ii=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},Ii.apply(this,arguments)}function Ri(t,e){if(null==t)return{};var i,n,o=function(t,e){if(null==t)return{};var i,n,o={},r=Object.keys(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||(o[i]=t[i]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(o[i]=t[i])}return o}function Hi(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var ji=Hi(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Ui=Hi(/Edge/i),Bi=Hi(/firefox/i),Li=Hi(/safari/i)&&!Hi(/chrome/i)&&!Hi(/android/i),zi=Hi(/iP(ad|od|hone)/i),Vi=Hi(/chrome/i)&&Hi(/android/i),Xi={capture:!1,passive:!1};function Yi(t,e,i){t.addEventListener(e,i,!ji&&Xi)}function Wi(t,e,i){t.removeEventListener(e,i,!ji&&Xi)}function Fi(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function qi(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function Gi(t,e,i,n){if(t){i=i||document;do{if(null!=e&&(">"===e[0]?t.parentNode===i&&Fi(t,e):Fi(t,e))||n&&t===i)return t;if(t===i)break}while(t=qi(t))}return null}var Ki,Zi=/\s+/g;function Ji(t,e,i){if(t&&e)if(t.classList)t.classList[i?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(Zi," ").replace(" "+e+" "," ");t.className=(n+(i?" "+e:"")).replace(Zi," ")}}function Qi(t,e,i){var n=t&&t.style;if(n){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(i=t.currentStyle),void 0===e?i:i[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=i+("string"==typeof i?"":"px")}}function tn(t,e){var i="";if("string"==typeof t)i=t;else do{var n=Qi(t,"transform");n&&"none"!==n&&(i=n+" "+i)}while(!e&&(t=t.parentNode));var o=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return o&&new o(i)}function en(t,e,i){if(t){var n=t.getElementsByTagName(e),o=0,r=n.length;if(i)for(;o<r;o++)i(n[o],o);return n}return[]}function nn(){var t=document.scrollingElement;return t||document.documentElement}function on(t,e,i,n,o){if(t.getBoundingClientRect||t===window){var r,a,s,l,c,d,h;if(t!==window&&t.parentNode&&t!==nn()?(a=(r=t.getBoundingClientRect()).top,s=r.left,l=r.bottom,c=r.right,d=r.height,h=r.width):(a=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(e||i)&&t!==window&&(o=o||t.parentNode,!ji))do{if(o&&o.getBoundingClientRect&&("none"!==Qi(o,"transform")||i&&"static"!==Qi(o,"position"))){var u=o.getBoundingClientRect();a-=u.top+parseInt(Qi(o,"border-top-width")),s-=u.left+parseInt(Qi(o,"border-left-width")),l=a+r.height,c=s+r.width;break}}while(o=o.parentNode);if(n&&t!==window){var p=tn(o||t),f=p&&p.a,g=p&&p.d;p&&(l=(a/=g)+(d/=g),c=(s/=f)+(h/=f))}return{top:a,left:s,bottom:l,right:c,width:h,height:d}}}function rn(t,e,i){for(var n=dn(t,!0),o=on(t)[e];n;){var r=on(n)[i];if(!("top"===i||"left"===i?o>=r:o<=r))return n;if(n===nn())break;n=dn(n,!1)}return!1}function an(t,e,i,n){for(var o=0,r=0,a=t.children;r<a.length;){if("none"!==a[r].style.display&&a[r]!==fo.ghost&&(n||a[r]!==fo.dragged)&&Gi(a[r],i.draggable,t,!1)){if(o===e)return a[r];o++}r++}return null}function sn(t,e){for(var i=t.lastElementChild;i&&(i===fo.ghost||"none"===Qi(i,"display")||e&&!Fi(i,e));)i=i.previousElementSibling;return i||null}function ln(t,e){var i=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===fo.clone||e&&!Fi(t,e)||i++;return i}function cn(t){var e=0,i=0,n=nn();if(t)do{var o=tn(t),r=o.a,a=o.d;e+=t.scrollLeft*r,i+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,i]}function dn(t,e){if(!t||!t.getBoundingClientRect)return nn();var i=t,n=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var o=Qi(i);if(i.clientWidth<i.scrollWidth&&("auto"==o.overflowX||"scroll"==o.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==o.overflowY||"scroll"==o.overflowY)){if(!i.getBoundingClientRect||i===document.body)return nn();if(n||e)return i;n=!0}}}while(i=i.parentNode);return nn()}function hn(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function un(t,e){return function(){if(!Ki){var i=arguments;1===i.length?t.call(this,i[0]):t.apply(this,i),Ki=setTimeout((function(){Ki=void 0}),e)}}}function pn(t,e,i){t.scrollLeft+=e,t.scrollTop+=i}function fn(t){var e=window.Polymer,i=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):i?i(t).clone(!0)[0]:t.cloneNode(!0)}var gn="Sortable"+(new Date).getTime();function vn(){var t,e=[];return{captureAnimationState:function(){(e=[],this.options.animation)&&[].slice.call(this.el.children).forEach((function(t){if("none"!==Qi(t,"display")&&t!==fo.ghost){e.push({target:t,rect:on(t)});var i=Pi({},e[e.length-1].rect);if(t.thisAnimationDuration){var n=tn(t,!0);n&&(i.top-=n.f,i.left-=n.e)}t.fromRect=i}}))},addAnimationState:function(t){e.push(t)},removeAnimationState:function(t){e.splice(function(t,e){for(var i in t)if(t.hasOwnProperty(i))for(var n in e)if(e.hasOwnProperty(n)&&e[n]===t[i][n])return Number(i);return-1}(e,{target:t}),1)},animateAll:function(i){var n=this;if(!this.options.animation)return clearTimeout(t),void("function"==typeof i&&i());var o=!1,r=0;e.forEach((function(t){var e=0,i=t.target,a=i.fromRect,s=on(i),l=i.prevFromRect,c=i.prevToRect,d=t.rect,h=tn(i,!0);h&&(s.top-=h.f,s.left-=h.e),i.toRect=s,i.thisAnimationDuration&&hn(l,s)&&!hn(a,s)&&(d.top-s.top)/(d.left-s.left)==(a.top-s.top)/(a.left-s.left)&&(e=function(t,e,i,n){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-i.top,2)+Math.pow(e.left-i.left,2))*n.animation}(d,l,c,n.options)),hn(s,a)||(i.prevFromRect=a,i.prevToRect=s,e||(e=n.options.animation),n.animate(i,d,s,e)),e&&(o=!0,r=Math.max(r,e),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout((function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null}),e),i.thisAnimationDuration=e)})),clearTimeout(t),o?t=setTimeout((function(){"function"==typeof i&&i()}),r):"function"==typeof i&&i(),e=[]},animate:function(t,e,i,n){if(n){Qi(t,"transition",""),Qi(t,"transform","");var o=tn(this.el),r=o&&o.a,a=o&&o.d,s=(e.left-i.left)/(r||1),l=(e.top-i.top)/(a||1);t.animatingX=!!s,t.animatingY=!!l,Qi(t,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),Qi(t,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),Qi(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout((function(){Qi(t,"transition",""),Qi(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1}),n)}}}}var mn=[],bn={initializeByDefault:!0},_n={mount:function(t){for(var e in bn)bn.hasOwnProperty(e)&&!(e in t)&&(t[e]=bn[e]);mn.forEach((function(e){if(e.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")})),mn.push(t)},pluginEvent:function(t,e,i){var n=this;this.eventCanceled=!1,i.cancel=function(){n.eventCanceled=!0};var o=t+"Global";mn.forEach((function(n){e[n.pluginName]&&(e[n.pluginName][o]&&e[n.pluginName][o](Pi({sortable:e},i)),e.options[n.pluginName]&&e[n.pluginName][t]&&e[n.pluginName][t](Pi({sortable:e},i)))}))},initializePlugins:function(t,e,i,n){for(var o in mn.forEach((function(n){var o=n.pluginName;if(t.options[o]||n.initializeByDefault){var r=new n(t,e,t.options);r.sortable=t,r.options=t.options,t[o]=r,Ii(i,r.defaults)}})),t.options)if(t.options.hasOwnProperty(o)){var r=this.modifyOption(t,o,t.options[o]);void 0!==r&&(t.options[o]=r)}},getEventProperties:function(t,e){var i={};return mn.forEach((function(n){"function"==typeof n.eventProperties&&Ii(i,n.eventProperties.call(e[n.pluginName],t))})),i},modifyOption:function(t,e,i){var n;return mn.forEach((function(o){t[o.pluginName]&&o.optionListeners&&"function"==typeof o.optionListeners[e]&&(n=o.optionListeners[e].call(t[o.pluginName],i))})),n}};var yn=["evt"],$n=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=i.evt,o=Ri(i,yn);_n.pluginEvent.bind(fo)(t,e,Pi({dragEl:En,parentEl:An,ghostEl:Sn,rootEl:xn,nextEl:Cn,lastDownEl:Tn,cloneEl:On,cloneHidden:Dn,dragStarted:Vn,putSortable:Rn,activeSortable:fo.active,originalEvent:n,oldIndex:kn,oldDraggableIndex:Mn,newIndex:Pn,newDraggableIndex:Nn,hideGhostForTarget:co,unhideGhostForTarget:ho,cloneNowHidden:function(){Dn=!0},cloneNowShown:function(){Dn=!1},dispatchSortableEvent:function(t){wn({sortable:e,name:t,originalEvent:n})}},o))};function wn(t){!function(t){var e=t.sortable,i=t.rootEl,n=t.name,o=t.targetEl,r=t.cloneEl,a=t.toEl,s=t.fromEl,l=t.oldIndex,c=t.newIndex,d=t.oldDraggableIndex,h=t.newDraggableIndex,u=t.originalEvent,p=t.putSortable,f=t.extraEventProperties;if(e=e||i&&i[gn]){var g,v=e.options,m="on"+n.charAt(0).toUpperCase()+n.substr(1);!window.CustomEvent||ji||Ui?(g=document.createEvent("Event")).initEvent(n,!0,!0):g=new CustomEvent(n,{bubbles:!0,cancelable:!0}),g.to=a||i,g.from=s||i,g.item=o||i,g.clone=r,g.oldIndex=l,g.newIndex=c,g.oldDraggableIndex=d,g.newDraggableIndex=h,g.originalEvent=u,g.pullMode=p?p.lastPutMode:void 0;var b=Pi(Pi({},f),_n.getEventProperties(n,e));for(var _ in b)g[_]=b[_];i&&i.dispatchEvent(g),v[m]&&v[m].call(e,g)}}(Pi({putSortable:Rn,cloneEl:On,targetEl:En,rootEl:xn,oldIndex:kn,oldDraggableIndex:Mn,newIndex:Pn,newDraggableIndex:Nn},t))}var En,An,Sn,xn,Cn,Tn,On,Dn,kn,Pn,Mn,Nn,In,Rn,Hn,jn,Un,Bn,Ln,zn,Vn,Xn,Yn,Wn,Fn,qn=!1,Gn=!1,Kn=[],Zn=!1,Jn=!1,Qn=[],to=!1,eo=[],io="undefined"!=typeof document,no=zi,oo=Ui||ji?"cssFloat":"float",ro=io&&!Vi&&!zi&&"draggable"in document.createElement("div"),ao=function(){if(io){if(ji)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),so=function(t,e){var i=Qi(t),n=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),o=an(t,0,e),r=an(t,1,e),a=o&&Qi(o),s=r&&Qi(r),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+on(o).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+on(r).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(o&&a.float&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return o&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||l>=n&&"none"===i[oo]||r&&"none"===i[oo]&&l+c>n)?"vertical":"horizontal"},lo=function(t){function e(t,i){return function(n,o,r,a){var s=n.options.group.name&&o.options.group.name&&n.options.group.name===o.options.group.name;if(null==t&&(i||s))return!0;if(null==t||!1===t)return!1;if(i&&"clone"===t)return t;if("function"==typeof t)return e(t(n,o,r,a),i)(n,o,r,a);var l=(i?n:o).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var i={},n=t.group;n&&"object"==Mi(n)||(n={name:n}),i.name=n.name,i.checkPull=e(n.pull,!0),i.checkPut=e(n.put),i.revertClone=n.revertClone,t.group=i},co=function(){!ao&&Sn&&Qi(Sn,"display","none")},ho=function(){!ao&&Sn&&Qi(Sn,"display","")};io&&!Vi&&document.addEventListener("click",(function(t){if(Gn)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),Gn=!1,!1}),!0);var uo=function(t){if(En){var e=function(t,e){var i;return Kn.some((function(n){var o=n[gn].options.emptyInsertThreshold;if(o&&!sn(n)){var r=on(n),a=t>=r.left-o&&t<=r.right+o,s=e>=r.top-o&&e<=r.bottom+o;return a&&s?i=n:void 0}})),i}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(e){var i={};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);i.target=i.rootEl=e,i.preventDefault=void 0,i.stopPropagation=void 0,e[gn]._onDragOver(i)}}},po=function(t){En&&En.parentNode[gn]._isOutsideThisEl(t.target)};function fo(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));this.el=t,this.options=e=Ii({},e),t[gn]=this;var i={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return so(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==fo.supportPointer&&"PointerEvent"in window&&!Li,emptyInsertThreshold:5};for(var n in _n.initializePlugins(this,t,i),i)!(n in e)&&(e[n]=i[n]);for(var o in lo(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&ro,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?Yi(t,"pointerdown",this._onTapStart):(Yi(t,"mousedown",this._onTapStart),Yi(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(Yi(t,"dragover",this),Yi(t,"dragenter",this)),Kn.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),Ii(this,vn())}function go(t,e,i,n,o,r,a,s){var l,c,d=t[gn],h=d.options.onMove;return!window.CustomEvent||ji||Ui?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=e,l.from=t,l.dragged=i,l.draggedRect=n,l.related=o||e,l.relatedRect=r||on(e),l.willInsertAfter=s,l.originalEvent=a,t.dispatchEvent(l),h&&(c=h.call(d,l,a)),c}function vo(t){t.draggable=!1}function mo(){to=!1}function bo(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,i=e.length,n=0;i--;)n+=e.charCodeAt(i);return n.toString(36)}function _o(t){return setTimeout(t,0)}function yo(t){return clearTimeout(t)}fo.prototype={constructor:fo,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(Xn=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,En):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,i=this.el,n=this.options,o=n.preventOnFilter,r=t.type,a=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,c=n.filter;if(function(t){eo.length=0;var e=t.getElementsByTagName("input"),i=e.length;for(;i--;){var n=e[i];n.checked&&eo.push(n)}}(i),!En&&!(/mousedown|pointerdown/.test(r)&&0!==t.button||n.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!Li||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=Gi(s,n.draggable,i,!1))&&s.animated||Tn===s)){if(kn=ln(s),Mn=ln(s,n.draggable),"function"==typeof c){if(c.call(this,t,s,this))return wn({sortable:e,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),$n("filter",e,{evt:t}),void(o&&t.cancelable&&t.preventDefault())}else if(c&&(c=c.split(",").some((function(n){if(n=Gi(l,n.trim(),i,!1))return wn({sortable:e,rootEl:n,name:"filter",targetEl:s,fromEl:i,toEl:i}),$n("filter",e,{evt:t}),!0}))))return void(o&&t.cancelable&&t.preventDefault());n.handle&&!Gi(l,n.handle,i,!1)||this._prepareDragStart(t,a,s)}}},_prepareDragStart:function(t,e,i){var n,o=this,r=o.el,a=o.options,s=r.ownerDocument;if(i&&!En&&i.parentNode===r){var l=on(i);if(xn=r,An=(En=i).parentNode,Cn=En.nextSibling,Tn=i,In=a.group,fo.dragged=En,Hn={target:En,clientX:(e||t).clientX,clientY:(e||t).clientY},Ln=Hn.clientX-l.left,zn=Hn.clientY-l.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,En.style["will-change"]="all",n=function(){$n("delayEnded",o,{evt:t}),fo.eventCanceled?o._onDrop():(o._disableDelayedDragEvents(),!Bi&&o.nativeDraggable&&(En.draggable=!0),o._triggerDragStart(t,e),wn({sortable:o,name:"choose",originalEvent:t}),Ji(En,a.chosenClass,!0))},a.ignore.split(",").forEach((function(t){en(En,t.trim(),vo)})),Yi(s,"dragover",uo),Yi(s,"mousemove",uo),Yi(s,"touchmove",uo),Yi(s,"mouseup",o._onDrop),Yi(s,"touchend",o._onDrop),Yi(s,"touchcancel",o._onDrop),Bi&&this.nativeDraggable&&(this.options.touchStartThreshold=4,En.draggable=!0),$n("delayStart",this,{evt:t}),!a.delay||a.delayOnTouchOnly&&!e||this.nativeDraggable&&(Ui||ji))n();else{if(fo.eventCanceled)return void this._onDrop();Yi(s,"mouseup",o._disableDelayedDrag),Yi(s,"touchend",o._disableDelayedDrag),Yi(s,"touchcancel",o._disableDelayedDrag),Yi(s,"mousemove",o._delayedDragTouchMoveHandler),Yi(s,"touchmove",o._delayedDragTouchMoveHandler),a.supportPointer&&Yi(s,"pointermove",o._delayedDragTouchMoveHandler),o._dragStartTimer=setTimeout(n,a.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){En&&vo(En),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Wi(t,"mouseup",this._disableDelayedDrag),Wi(t,"touchend",this._disableDelayedDrag),Wi(t,"touchcancel",this._disableDelayedDrag),Wi(t,"mousemove",this._delayedDragTouchMoveHandler),Wi(t,"touchmove",this._delayedDragTouchMoveHandler),Wi(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?this.options.supportPointer?Yi(document,"pointermove",this._onTouchMove):Yi(document,e?"touchmove":"mousemove",this._onTouchMove):(Yi(En,"dragend",this),Yi(xn,"dragstart",this._onDragStart));try{document.selection?_o((function(){document.selection.empty()})):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(qn=!1,xn&&En){$n("dragStarted",this,{evt:e}),this.nativeDraggable&&Yi(document,"dragover",po);var i=this.options;!t&&Ji(En,i.dragClass,!1),Ji(En,i.ghostClass,!0),fo.active=this,t&&this._appendGhost(),wn({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(jn){this._lastX=jn.clientX,this._lastY=jn.clientY,co();for(var t=document.elementFromPoint(jn.clientX,jn.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(jn.clientX,jn.clientY))!==e;)e=t;if(En.parentNode[gn]._isOutsideThisEl(t),e)do{if(e[gn]){if(e[gn]._onDragOver({clientX:jn.clientX,clientY:jn.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break}t=e}while(e=e.parentNode);ho()}},_onTouchMove:function(t){if(Hn){var e=this.options,i=e.fallbackTolerance,n=e.fallbackOffset,o=t.touches?t.touches[0]:t,r=Sn&&tn(Sn,!0),a=Sn&&r&&r.a,s=Sn&&r&&r.d,l=no&&Fn&&cn(Fn),c=(o.clientX-Hn.clientX+n.x)/(a||1)+(l?l[0]-Qn[0]:0)/(a||1),d=(o.clientY-Hn.clientY+n.y)/(s||1)+(l?l[1]-Qn[1]:0)/(s||1);if(!fo.active&&!qn){if(i&&Math.max(Math.abs(o.clientX-this._lastX),Math.abs(o.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(Sn){r?(r.e+=c-(Un||0),r.f+=d-(Bn||0)):r={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(r.a,",").concat(r.b,",").concat(r.c,",").concat(r.d,",").concat(r.e,",").concat(r.f,")");Qi(Sn,"webkitTransform",h),Qi(Sn,"mozTransform",h),Qi(Sn,"msTransform",h),Qi(Sn,"transform",h),Un=c,Bn=d,jn=o}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!Sn){var t=this.options.fallbackOnBody?document.body:xn,e=on(En,!0,no,!0,t),i=this.options;if(no){for(Fn=t;"static"===Qi(Fn,"position")&&"none"===Qi(Fn,"transform")&&Fn!==document;)Fn=Fn.parentNode;Fn!==document.body&&Fn!==document.documentElement?(Fn===document&&(Fn=nn()),e.top+=Fn.scrollTop,e.left+=Fn.scrollLeft):Fn=nn(),Qn=cn(Fn)}Ji(Sn=En.cloneNode(!0),i.ghostClass,!1),Ji(Sn,i.fallbackClass,!0),Ji(Sn,i.dragClass,!0),Qi(Sn,"transition",""),Qi(Sn,"transform",""),Qi(Sn,"box-sizing","border-box"),Qi(Sn,"margin",0),Qi(Sn,"top",e.top),Qi(Sn,"left",e.left),Qi(Sn,"width",e.width),Qi(Sn,"height",e.height),Qi(Sn,"opacity","0.8"),Qi(Sn,"position",no?"absolute":"fixed"),Qi(Sn,"zIndex","100000"),Qi(Sn,"pointerEvents","none"),fo.ghost=Sn,t.appendChild(Sn),Qi(Sn,"transform-origin",Ln/parseInt(Sn.style.width)*100+"% "+zn/parseInt(Sn.style.height)*100+"%")}},_onDragStart:function(t,e){var i=this,n=t.dataTransfer,o=i.options;$n("dragStart",this,{evt:t}),fo.eventCanceled?this._onDrop():($n("setupClone",this),fo.eventCanceled||((On=fn(En)).removeAttribute("id"),On.draggable=!1,On.style["will-change"]="",this._hideClone(),Ji(On,this.options.chosenClass,!1),fo.clone=On),i.cloneId=_o((function(){$n("clone",i),fo.eventCanceled||(i.options.removeCloneOnHide||xn.insertBefore(On,En),i._hideClone(),wn({sortable:i,name:"clone"}))})),!e&&Ji(En,o.dragClass,!0),e?(Gn=!0,i._loopId=setInterval(i._emulateDragOver,50)):(Wi(document,"mouseup",i._onDrop),Wi(document,"touchend",i._onDrop),Wi(document,"touchcancel",i._onDrop),n&&(n.effectAllowed="move",o.setData&&o.setData.call(i,n,En)),Yi(document,"drop",i),Qi(En,"transform","translateZ(0)")),qn=!0,i._dragStartId=_o(i._dragStarted.bind(i,e,t)),Yi(document,"selectstart",i),Vn=!0,Li&&Qi(document.body,"user-select","none"))},_onDragOver:function(t){var e,i,n,o,r=this.el,a=t.target,s=this.options,l=s.group,c=fo.active,d=In===l,h=s.sort,u=Rn||c,p=this,f=!1;if(!to){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),a=Gi(a,s.draggable,r,!0),O("dragOver"),fo.eventCanceled)return f;if(En.contains(t.target)||a.animated&&a.animatingX&&a.animatingY||p._ignoreWhileAnimating===a)return k(!1);if(Gn=!1,c&&!s.disabled&&(d?h||(n=An!==xn):Rn===this||(this.lastPutMode=In.checkPull(this,c,En,t))&&l.checkPut(this,c,En,t))){if(o="vertical"===this._getDirection(t,a),e=on(En),O("dragOverValid"),fo.eventCanceled)return f;if(n)return An=xn,D(),this._hideClone(),O("revert"),fo.eventCanceled||(Cn?xn.insertBefore(En,Cn):xn.appendChild(En)),k(!0);var g=sn(r,s.draggable);if(!g||function(t,e,i){var n=on(sn(i.el,i.options.draggable)),o=10;return e?t.clientX>n.right+o||t.clientX<=n.right&&t.clientY>n.bottom&&t.clientX>=n.left:t.clientX>n.right&&t.clientY>n.top||t.clientX<=n.right&&t.clientY>n.bottom+o}(t,o,this)&&!g.animated){if(g===En)return k(!1);if(g&&r===t.target&&(a=g),a&&(i=on(a)),!1!==go(xn,r,En,e,a,i,t,!!a))return D(),g&&g.nextSibling?r.insertBefore(En,g.nextSibling):r.appendChild(En),An=r,P(),k(!0)}else if(g&&function(t,e,i){var n=on(an(i.el,0,i.options,!0)),o=10;return e?t.clientX<n.left-o||t.clientY<n.top&&t.clientX<n.right:t.clientY<n.top-o||t.clientY<n.bottom&&t.clientX<n.left}(t,o,this)){var v=an(r,0,s,!0);if(v===En)return k(!1);if(i=on(a=v),!1!==go(xn,r,En,e,a,i,t,!1))return D(),r.insertBefore(En,v),An=r,P(),k(!0)}else if(a.parentNode===r){i=on(a);var m,b,_,y=En.parentNode!==r,$=!function(t,e,i){var n=i?t.left:t.top,o=i?t.right:t.bottom,r=i?t.width:t.height,a=i?e.left:e.top,s=i?e.right:e.bottom,l=i?e.width:e.height;return n===a||o===s||n+r/2===a+l/2}(En.animated&&En.toRect||e,a.animated&&a.toRect||i,o),w=o?"top":"left",E=rn(a,"top","top")||rn(En,"top","top"),A=E?E.scrollTop:void 0;if(Xn!==a&&(b=i[w],Zn=!1,Jn=!$&&s.invertSwap||y),m=function(t,e,i,n,o,r,a,s){var l=n?t.clientY:t.clientX,c=n?i.height:i.width,d=n?i.top:i.left,h=n?i.bottom:i.right,u=!1;if(!a)if(s&&Wn<c*o){if(!Zn&&(1===Yn?l>d+c*r/2:l<h-c*r/2)&&(Zn=!0),Zn)u=!0;else if(1===Yn?l<d+Wn:l>h-Wn)return-Yn}else if(l>d+c*(1-o)/2&&l<h-c*(1-o)/2)return function(t){return ln(En)<ln(t)?1:-1}(e);if((u=u||a)&&(l<d+c*r/2||l>h-c*r/2))return l>d+c/2?1:-1;return 0}(t,a,i,o,$?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,Jn,Xn===a),0!==m){var S=ln(En);do{S-=m,_=An.children[S]}while(_&&("none"===Qi(_,"display")||_===Sn))}if(0===m||_===a)return k(!1);Xn=a,Yn=m;var x=a.nextElementSibling,C=!1,T=go(xn,r,En,e,a,i,t,C=1===m);if(!1!==T)return 1!==T&&-1!==T||(C=1===T),to=!0,setTimeout(mo,30),D(),C&&!x?r.appendChild(En):a.parentNode.insertBefore(En,C?x:a),E&&pn(E,0,A-E.scrollTop),An=En.parentNode,void 0===b||Jn||(Wn=Math.abs(b-on(a)[w])),P(),k(!0)}if(r.contains(En))return k(!1)}return!1}function O(s,l){$n(s,p,Pi({evt:t,isOwner:d,axis:o?"vertical":"horizontal",revert:n,dragRect:e,targetRect:i,canSort:h,fromSortable:u,target:a,completed:k,onMove:function(i,n){return go(xn,r,En,e,i,on(i),t,n)},changed:P},l))}function D(){O("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function k(e){return O("dragOverCompleted",{insertion:e}),e&&(d?c._hideClone():c._showClone(p),p!==u&&(Ji(En,Rn?Rn.options.ghostClass:c.options.ghostClass,!1),Ji(En,s.ghostClass,!0)),Rn!==p&&p!==fo.active?Rn=p:p===fo.active&&Rn&&(Rn=null),u===p&&(p._ignoreWhileAnimating=a),p.animateAll((function(){O("dragOverAnimationComplete"),p._ignoreWhileAnimating=null})),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(a===En&&!En.animated||a===r&&!a.animated)&&(Xn=null),s.dragoverBubble||t.rootEl||a===document||(En.parentNode[gn]._isOutsideThisEl(t.target),!e&&uo(t)),!s.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),f=!0}function P(){Pn=ln(En),Nn=ln(En,s.draggable),wn({sortable:p,name:"change",toEl:r,newIndex:Pn,newDraggableIndex:Nn,originalEvent:t})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Wi(document,"mousemove",this._onTouchMove),Wi(document,"touchmove",this._onTouchMove),Wi(document,"pointermove",this._onTouchMove),Wi(document,"dragover",uo),Wi(document,"mousemove",uo),Wi(document,"touchmove",uo)},_offUpEvents:function(){var t=this.el.ownerDocument;Wi(t,"mouseup",this._onDrop),Wi(t,"touchend",this._onDrop),Wi(t,"pointerup",this._onDrop),Wi(t,"touchcancel",this._onDrop),Wi(document,"selectstart",this)},_onDrop:function(t){var e=this.el,i=this.options;Pn=ln(En),Nn=ln(En,i.draggable),$n("drop",this,{evt:t}),An=En&&En.parentNode,Pn=ln(En),Nn=ln(En,i.draggable),fo.eventCanceled||(qn=!1,Jn=!1,Zn=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),yo(this.cloneId),yo(this._dragStartId),this.nativeDraggable&&(Wi(document,"drop",this),Wi(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Li&&Qi(document.body,"user-select",""),Qi(En,"transform",""),t&&(Vn&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),Sn&&Sn.parentNode&&Sn.parentNode.removeChild(Sn),(xn===An||Rn&&"clone"!==Rn.lastPutMode)&&On&&On.parentNode&&On.parentNode.removeChild(On),En&&(this.nativeDraggable&&Wi(En,"dragend",this),vo(En),En.style["will-change"]="",Vn&&!qn&&Ji(En,Rn?Rn.options.ghostClass:this.options.ghostClass,!1),Ji(En,this.options.chosenClass,!1),wn({sortable:this,name:"unchoose",toEl:An,newIndex:null,newDraggableIndex:null,originalEvent:t}),xn!==An?(Pn>=0&&(wn({rootEl:An,name:"add",toEl:An,fromEl:xn,originalEvent:t}),wn({sortable:this,name:"remove",toEl:An,originalEvent:t}),wn({rootEl:An,name:"sort",toEl:An,fromEl:xn,originalEvent:t}),wn({sortable:this,name:"sort",toEl:An,originalEvent:t})),Rn&&Rn.save()):Pn!==kn&&Pn>=0&&(wn({sortable:this,name:"update",toEl:An,originalEvent:t}),wn({sortable:this,name:"sort",toEl:An,originalEvent:t})),fo.active&&(null!=Pn&&-1!==Pn||(Pn=kn,Nn=Mn),wn({sortable:this,name:"end",toEl:An,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){$n("nulling",this),xn=En=An=Sn=Cn=On=Tn=Dn=Hn=jn=Vn=Pn=Nn=kn=Mn=Xn=Yn=Rn=In=fo.dragged=fo.ghost=fo.clone=fo.active=null,eo.forEach((function(t){t.checked=!0})),eo.length=Un=Bn=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":En&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],i=this.el.children,n=0,o=i.length,r=this.options;n<o;n++)Gi(t=i[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||bo(t));return e},sort:function(t,e){var i={},n=this.el;this.toArray().forEach((function(t,e){var o=n.children[e];Gi(o,this.options.draggable,n,!1)&&(i[t]=o)}),this),e&&this.captureAnimationState(),t.forEach((function(t){i[t]&&(n.removeChild(i[t]),n.appendChild(i[t]))})),e&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return Gi(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var i=this.options;if(void 0===e)return i[t];var n=_n.modifyOption(this,t,e);i[t]=void 0!==n?n:e,"group"===t&&lo(i)},destroy:function(){$n("destroy",this);var t=this.el;t[gn]=null,Wi(t,"mousedown",this._onTapStart),Wi(t,"touchstart",this._onTapStart),Wi(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Wi(t,"dragover",this),Wi(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),(function(t){t.removeAttribute("draggable")})),this._onDrop(),this._disableDelayedDragEvents(),Kn.splice(Kn.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!Dn){if($n("hideClone",this),fo.eventCanceled)return;Qi(On,"display","none"),this.options.removeCloneOnHide&&On.parentNode&&On.parentNode.removeChild(On),Dn=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(Dn){if($n("showClone",this),fo.eventCanceled)return;En.parentNode!=xn||this.options.group.revertClone?Cn?xn.insertBefore(On,Cn):xn.appendChild(On):xn.insertBefore(On,En),this.options.group.revertClone&&this.animate(En,On),Qi(On,"display",""),Dn=!1}}else this._hideClone()}},io&&Yi(document,"touchmove",(function(t){(fo.active||qn)&&t.cancelable&&t.preventDefault()})),fo.utils={on:Yi,off:Wi,css:Qi,find:en,is:function(t,e){return!!Gi(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},throttle:un,closest:Gi,toggleClass:Ji,clone:fn,index:ln,nextTick:_o,cancelNextTick:yo,detectDirection:so,getChild:an},fo.get=function(t){return t[gn]},fo.mount=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e[0].constructor===Array&&(e=e[0]),e.forEach((function(t){if(!t.prototype||!t.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(fo.utils=Pi(Pi({},fo.utils),t.utils)),_n.mount(t)}))},fo.create=function(t,e){return new fo(t,e)},fo.version="1.15.0";var $o,wo,Eo,Ao,So,xo,Co=[],To=!1;function Oo(){Co.forEach((function(t){clearInterval(t.pid)})),Co=[]}function Do(){clearInterval(xo)}var ko=un((function(t,e,i,n){if(e.scroll){var o,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,s=e.scrollSensitivity,l=e.scrollSpeed,c=nn(),d=!1;wo!==i&&(wo=i,Oo(),$o=e.scroll,o=e.scrollFn,!0===$o&&($o=dn(i,!0)));var h=0,u=$o;do{var p=u,f=on(p),g=f.top,v=f.bottom,m=f.left,b=f.right,_=f.width,y=f.height,$=void 0,w=void 0,E=p.scrollWidth,A=p.scrollHeight,S=Qi(p),x=p.scrollLeft,C=p.scrollTop;p===c?($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY));var T=$&&(Math.abs(b-r)<=s&&x+_<E)-(Math.abs(m-r)<=s&&!!x),O=w&&(Math.abs(v-a)<=s&&C+y<A)-(Math.abs(g-a)<=s&&!!C);if(!Co[h])for(var D=0;D<=h;D++)Co[D]||(Co[D]={});Co[h].vx==T&&Co[h].vy==O&&Co[h].el===p||(Co[h].el=p,Co[h].vx=T,Co[h].vy=O,clearInterval(Co[h].pid),0==T&&0==O||(d=!0,Co[h].pid=setInterval(function(){n&&0===this.layer&&fo.active._onTouchMove(So);var e=Co[this.layer].vy?Co[this.layer].vy*l:0,i=Co[this.layer].vx?Co[this.layer].vx*l:0;"function"==typeof o&&"continue"!==o.call(fo.dragged.parentNode[gn],i,e,t,So,Co[this.layer].el)||pn(Co[this.layer].el,i,e)}.bind({layer:h}),24))),h++}while(e.bubbleScroll&&u!==c&&(u=dn(u,!1)));To=d}}),30),Po=function(t){var e=t.originalEvent,i=t.putSortable,n=t.dragEl,o=t.activeSortable,r=t.dispatchSortableEvent,a=t.hideGhostForTarget,s=t.unhideGhostForTarget;if(e){var l=i||o;a();var c=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(r("spill"),this.onSpill({dragEl:n,putSortable:i}))}};function Mo(){}function No(){}
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Io(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function Ro(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?Io(Object(i),!0).forEach((function(e){jo(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):Io(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function Ho(t){return Ho="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ho(t)}function jo(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function Uo(){return Uo=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},Uo.apply(this,arguments)}function Bo(t,e){if(null==t)return{};var i,n,o=function(t,e){if(null==t)return{};var i,n,o={},r=Object.keys(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||(o[i]=t[i]);return o}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(n=0;n<r.length;n++)i=r[n],e.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(t,i)&&(o[i]=t[i])}return o}Mo.prototype={startIndex:null,dragStart:function(t){var e=t.oldDraggableIndex;this.startIndex=e},onSpill:function(t){var e=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var n=an(this.sortable.el,this.startIndex,this.options);n?this.sortable.el.insertBefore(e,n):this.sortable.el.appendChild(e),this.sortable.animateAll(),i&&i.animateAll()},drop:Po},Ii(Mo,{pluginName:"revertOnSpill"}),No.prototype={onSpill:function(t){var e=t.dragEl,i=t.putSortable||this.sortable;i.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),i.animateAll()},drop:Po},Ii(No,{pluginName:"removeOnSpill"}),fo.mount(new function(){function t(){for(var t in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?Yi(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Yi(document,"pointermove",this._handleFallbackAutoScroll):e.touches?Yi(document,"touchmove",this._handleFallbackAutoScroll):Yi(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?Wi(document,"dragover",this._handleAutoScroll):(Wi(document,"pointermove",this._handleFallbackAutoScroll),Wi(document,"touchmove",this._handleFallbackAutoScroll),Wi(document,"mousemove",this._handleFallbackAutoScroll)),Do(),Oo(),clearTimeout(Ki),Ki=void 0},nulling:function(){So=wo=$o=To=xo=Eo=Ao=null,Co.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,n=(t.touches?t.touches[0]:t).clientX,o=(t.touches?t.touches[0]:t).clientY,r=document.elementFromPoint(n,o);if(So=t,e||this.options.forceAutoScrollFallback||Ui||ji||Li){ko(t,this.options,r,e);var a=dn(r,!0);!To||xo&&n===Eo&&o===Ao||(xo&&Do(),xo=setInterval((function(){var r=dn(document.elementFromPoint(n,o),!0);r!==a&&(a=r,Oo()),ko(t,i.options,r,e)}),10),Eo=n,Ao=o)}else{if(!this.options.bubbleScroll||dn(r,!0)===nn())return void Oo();ko(t,this.options,dn(r,!1),!1)}}},Ii(t,{pluginName:"scroll",initializeByDefault:!0})}),fo.mount(No,Mo);function Lo(t){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(t)}var zo=Lo(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Vo=Lo(/Edge/i),Xo=Lo(/firefox/i),Yo=Lo(/safari/i)&&!Lo(/chrome/i)&&!Lo(/android/i),Wo=Lo(/iP(ad|od|hone)/i),Fo=Lo(/chrome/i)&&Lo(/android/i),qo={capture:!1,passive:!1};function Go(t,e,i){t.addEventListener(e,i,!zo&&qo)}function Ko(t,e,i){t.removeEventListener(e,i,!zo&&qo)}function Zo(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function Jo(t){return t.host&&t!==document&&t.host.nodeType?t.host:t.parentNode}function Qo(t,e,i,n){if(t){i=i||document;do{if(null!=e&&(">"===e[0]?t.parentNode===i&&Zo(t,e):Zo(t,e))||n&&t===i)return t;if(t===i)break}while(t=Jo(t))}return null}var tr,er=/\s+/g;function ir(t,e,i){if(t&&e)if(t.classList)t.classList[i?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(er," ").replace(" "+e+" "," ");t.className=(n+(i?" "+e:"")).replace(er," ")}}function nr(t,e,i){var n=t&&t.style;if(n){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(t,""):t.currentStyle&&(i=t.currentStyle),void 0===e?i:i[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=i+("string"==typeof i?"":"px")}}function or(t,e){var i="";if("string"==typeof t)i=t;else do{var n=nr(t,"transform");n&&"none"!==n&&(i=n+" "+i)}while(!e&&(t=t.parentNode));var o=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return o&&new o(i)}function rr(t,e,i){if(t){var n=t.getElementsByTagName(e),o=0,r=n.length;if(i)for(;o<r;o++)i(n[o],o);return n}return[]}function ar(){var t=document.scrollingElement;return t||document.documentElement}function sr(t,e,i,n,o){if(t.getBoundingClientRect||t===window){var r,a,s,l,c,d,h;if(t!==window&&t.parentNode&&t!==ar()?(a=(r=t.getBoundingClientRect()).top,s=r.left,l=r.bottom,c=r.right,d=r.height,h=r.width):(a=0,s=0,l=window.innerHeight,c=window.innerWidth,d=window.innerHeight,h=window.innerWidth),(e||i)&&t!==window&&(o=o||t.parentNode,!zo))do{if(o&&o.getBoundingClientRect&&("none"!==nr(o,"transform")||i&&"static"!==nr(o,"position"))){var u=o.getBoundingClientRect();a-=u.top+parseInt(nr(o,"border-top-width")),s-=u.left+parseInt(nr(o,"border-left-width")),l=a+r.height,c=s+r.width;break}}while(o=o.parentNode);if(n&&t!==window){var p=or(o||t),f=p&&p.a,g=p&&p.d;p&&(l=(a/=g)+(d/=g),c=(s/=f)+(h/=f))}return{top:a,left:s,bottom:l,right:c,width:h,height:d}}}function lr(t,e,i){for(var n=pr(t,!0),o=sr(t)[e];n;){var r=sr(n)[i];if(!("top"===i||"left"===i?o>=r:o<=r))return n;if(n===ar())break;n=pr(n,!1)}return!1}function cr(t,e,i,n){for(var o=0,r=0,a=t.children;r<a.length;){if("none"!==a[r].style.display&&a[r]!==va.ghost&&(n||a[r]!==va.dragged)&&Qo(a[r],i.draggable,t,!1)){if(o===e)return a[r];o++}r++}return null}function dr(t,e){for(var i=t.lastElementChild;i&&(i===va.ghost||"none"===nr(i,"display")||e&&!Zo(i,e));)i=i.previousElementSibling;return i||null}function hr(t,e){var i=0;if(!t||!t.parentNode)return-1;for(;t=t.previousElementSibling;)"TEMPLATE"===t.nodeName.toUpperCase()||t===va.clone||e&&!Zo(t,e)||i++;return i}function ur(t){var e=0,i=0,n=ar();if(t)do{var o=or(t),r=o.a,a=o.d;e+=t.scrollLeft*r,i+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,i]}function pr(t,e){if(!t||!t.getBoundingClientRect)return ar();var i=t,n=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var o=nr(i);if(i.clientWidth<i.scrollWidth&&("auto"==o.overflowX||"scroll"==o.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==o.overflowY||"scroll"==o.overflowY)){if(!i.getBoundingClientRect||i===document.body)return ar();if(n||e)return i;n=!0}}}while(i=i.parentNode);return ar()}function fr(t,e){return Math.round(t.top)===Math.round(e.top)&&Math.round(t.left)===Math.round(e.left)&&Math.round(t.height)===Math.round(e.height)&&Math.round(t.width)===Math.round(e.width)}function gr(t,e){return function(){if(!tr){var i=arguments;1===i.length?t.call(this,i[0]):t.apply(this,i),tr=setTimeout((function(){tr=void 0}),e)}}}function vr(t,e,i){t.scrollLeft+=e,t.scrollTop+=i}function mr(t){var e=window.Polymer,i=window.jQuery||window.Zepto;return e&&e.dom?e.dom(t).cloneNode(!0):i?i(t).clone(!0)[0]:t.cloneNode(!0)}var br="Sortable"+(new Date).getTime();function _r(){var t,e=[];return{captureAnimationState:function(){(e=[],this.options.animation)&&[].slice.call(this.el.children).forEach((function(t){if("none"!==nr(t,"display")&&t!==va.ghost){e.push({target:t,rect:sr(t)});var i=Ro({},e[e.length-1].rect);if(t.thisAnimationDuration){var n=or(t,!0);n&&(i.top-=n.f,i.left-=n.e)}t.fromRect=i}}))},addAnimationState:function(t){e.push(t)},removeAnimationState:function(t){e.splice(function(t,e){for(var i in t)if(t.hasOwnProperty(i))for(var n in e)if(e.hasOwnProperty(n)&&e[n]===t[i][n])return Number(i);return-1}(e,{target:t}),1)},animateAll:function(i){var n=this;if(!this.options.animation)return clearTimeout(t),void("function"==typeof i&&i());var o=!1,r=0;e.forEach((function(t){var e=0,i=t.target,a=i.fromRect,s=sr(i),l=i.prevFromRect,c=i.prevToRect,d=t.rect,h=or(i,!0);h&&(s.top-=h.f,s.left-=h.e),i.toRect=s,i.thisAnimationDuration&&fr(l,s)&&!fr(a,s)&&(d.top-s.top)/(d.left-s.left)==(a.top-s.top)/(a.left-s.left)&&(e=function(t,e,i,n){return Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))/Math.sqrt(Math.pow(e.top-i.top,2)+Math.pow(e.left-i.left,2))*n.animation}(d,l,c,n.options)),fr(s,a)||(i.prevFromRect=a,i.prevToRect=s,e||(e=n.options.animation),n.animate(i,d,s,e)),e&&(o=!0,r=Math.max(r,e),clearTimeout(i.animationResetTimer),i.animationResetTimer=setTimeout((function(){i.animationTime=0,i.prevFromRect=null,i.fromRect=null,i.prevToRect=null,i.thisAnimationDuration=null}),e),i.thisAnimationDuration=e)})),clearTimeout(t),o?t=setTimeout((function(){"function"==typeof i&&i()}),r):"function"==typeof i&&i(),e=[]},animate:function(t,e,i,n){if(n){nr(t,"transition",""),nr(t,"transform","");var o=or(this.el),r=o&&o.a,a=o&&o.d,s=(e.left-i.left)/(r||1),l=(e.top-i.top)/(a||1);t.animatingX=!!s,t.animatingY=!!l,nr(t,"transform","translate3d("+s+"px,"+l+"px,0)"),this.forRepaintDummy=function(t){return t.offsetWidth}(t),nr(t,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),nr(t,"transform","translate3d(0,0,0)"),"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=setTimeout((function(){nr(t,"transition",""),nr(t,"transform",""),t.animated=!1,t.animatingX=!1,t.animatingY=!1}),n)}}}}var yr=[],$r={initializeByDefault:!0},wr={mount:function(t){for(var e in $r)$r.hasOwnProperty(e)&&!(e in t)&&(t[e]=$r[e]);yr.forEach((function(e){if(e.pluginName===t.pluginName)throw"Sortable: Cannot mount plugin ".concat(t.pluginName," more than once")})),yr.push(t)},pluginEvent:function(t,e,i){var n=this;this.eventCanceled=!1,i.cancel=function(){n.eventCanceled=!0};var o=t+"Global";yr.forEach((function(n){e[n.pluginName]&&(e[n.pluginName][o]&&e[n.pluginName][o](Ro({sortable:e},i)),e.options[n.pluginName]&&e[n.pluginName][t]&&e[n.pluginName][t](Ro({sortable:e},i)))}))},initializePlugins:function(t,e,i,n){for(var o in yr.forEach((function(n){var o=n.pluginName;if(t.options[o]||n.initializeByDefault){var r=new n(t,e,t.options);r.sortable=t,r.options=t.options,t[o]=r,Uo(i,r.defaults)}})),t.options)if(t.options.hasOwnProperty(o)){var r=this.modifyOption(t,o,t.options[o]);void 0!==r&&(t.options[o]=r)}},getEventProperties:function(t,e){var i={};return yr.forEach((function(n){"function"==typeof n.eventProperties&&Uo(i,n.eventProperties.call(e[n.pluginName],t))})),i},modifyOption:function(t,e,i){var n;return yr.forEach((function(o){t[o.pluginName]&&o.optionListeners&&"function"==typeof o.optionListeners[e]&&(n=o.optionListeners[e].call(t[o.pluginName],i))})),n}};var Er=["evt"],Ar=function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=i.evt,o=Bo(i,Er);wr.pluginEvent.bind(va)(t,e,Ro({dragEl:xr,parentEl:Cr,ghostEl:Tr,rootEl:Or,nextEl:Dr,lastDownEl:kr,cloneEl:Pr,cloneHidden:Mr,dragStarted:Wr,putSortable:Ur,activeSortable:va.active,originalEvent:n,oldIndex:Nr,oldDraggableIndex:Rr,newIndex:Ir,newDraggableIndex:Hr,hideGhostForTarget:ua,unhideGhostForTarget:pa,cloneNowHidden:function(){Mr=!0},cloneNowShown:function(){Mr=!1},dispatchSortableEvent:function(t){Sr({sortable:e,name:t,originalEvent:n})}},o))};function Sr(t){!function(t){var e=t.sortable,i=t.rootEl,n=t.name,o=t.targetEl,r=t.cloneEl,a=t.toEl,s=t.fromEl,l=t.oldIndex,c=t.newIndex,d=t.oldDraggableIndex,h=t.newDraggableIndex,u=t.originalEvent,p=t.putSortable,f=t.extraEventProperties;if(e=e||i&&i[br]){var g,v=e.options,m="on"+n.charAt(0).toUpperCase()+n.substr(1);!window.CustomEvent||zo||Vo?(g=document.createEvent("Event")).initEvent(n,!0,!0):g=new CustomEvent(n,{bubbles:!0,cancelable:!0}),g.to=a||i,g.from=s||i,g.item=o||i,g.clone=r,g.oldIndex=l,g.newIndex=c,g.oldDraggableIndex=d,g.newDraggableIndex=h,g.originalEvent=u,g.pullMode=p?p.lastPutMode:void 0;var b=Ro(Ro({},f),wr.getEventProperties(n,e));for(var _ in b)g[_]=b[_];i&&i.dispatchEvent(g),v[m]&&v[m].call(e,g)}}(Ro({putSortable:Ur,cloneEl:Pr,targetEl:xr,rootEl:Or,oldIndex:Nr,oldDraggableIndex:Rr,newIndex:Ir,newDraggableIndex:Hr},t))}var xr,Cr,Tr,Or,Dr,kr,Pr,Mr,Nr,Ir,Rr,Hr,jr,Ur,Br,Lr,zr,Vr,Xr,Yr,Wr,Fr,qr,Gr,Kr,Zr=!1,Jr=!1,Qr=[],ta=!1,ea=!1,ia=[],na=!1,oa=[],ra="undefined"!=typeof document,aa=Wo,sa=Vo||zo?"cssFloat":"float",la=ra&&!Fo&&!Wo&&"draggable"in document.createElement("div"),ca=function(){if(ra){if(zo)return!1;var t=document.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}}(),da=function(t,e){var i=nr(t),n=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),o=cr(t,0,e),r=cr(t,1,e),a=o&&nr(o),s=r&&nr(r),l=a&&parseInt(a.marginLeft)+parseInt(a.marginRight)+sr(o).width,c=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+sr(r).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(o&&a.float&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==s.clear&&s.clear!==d?"horizontal":"vertical"}return o&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||l>=n&&"none"===i[sa]||r&&"none"===i[sa]&&l+c>n)?"vertical":"horizontal"},ha=function(t){function e(t,i){return function(n,o,r,a){var s=n.options.group.name&&o.options.group.name&&n.options.group.name===o.options.group.name;if(null==t&&(i||s))return!0;if(null==t||!1===t)return!1;if(i&&"clone"===t)return t;if("function"==typeof t)return e(t(n,o,r,a),i)(n,o,r,a);var l=(i?n:o).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var i={},n=t.group;n&&"object"==Ho(n)||(n={name:n}),i.name=n.name,i.checkPull=e(n.pull,!0),i.checkPut=e(n.put),i.revertClone=n.revertClone,t.group=i},ua=function(){!ca&&Tr&&nr(Tr,"display","none")},pa=function(){!ca&&Tr&&nr(Tr,"display","")};ra&&!Fo&&document.addEventListener("click",(function(t){if(Jr)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),Jr=!1,!1}),!0);var fa=function(t){if(xr){var e=function(t,e){var i;return Qr.some((function(n){var o=n[br].options.emptyInsertThreshold;if(o&&!dr(n)){var r=sr(n),a=t>=r.left-o&&t<=r.right+o,s=e>=r.top-o&&e<=r.bottom+o;return a&&s?i=n:void 0}})),i}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(e){var i={};for(var n in t)t.hasOwnProperty(n)&&(i[n]=t[n]);i.target=i.rootEl=e,i.preventDefault=void 0,i.stopPropagation=void 0,e[br]._onDragOver(i)}}},ga=function(t){xr&&xr.parentNode[br]._isOutsideThisEl(t.target)};function va(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(t));this.el=t,this.options=e=Uo({},e),t[br]=this;var i={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return da(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==va.supportPointer&&"PointerEvent"in window&&!Yo,emptyInsertThreshold:5};for(var n in wr.initializePlugins(this,t,i),i)!(n in e)&&(e[n]=i[n]);for(var o in ha(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&la,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?Go(t,"pointerdown",this._onTapStart):(Go(t,"mousedown",this._onTapStart),Go(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(Go(t,"dragover",this),Go(t,"dragenter",this)),Qr.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),Uo(this,_r())}function ma(t,e,i,n,o,r,a,s){var l,c,d=t[br],h=d.options.onMove;return!window.CustomEvent||zo||Vo?(l=document.createEvent("Event")).initEvent("move",!0,!0):l=new CustomEvent("move",{bubbles:!0,cancelable:!0}),l.to=e,l.from=t,l.dragged=i,l.draggedRect=n,l.related=o||e,l.relatedRect=r||sr(e),l.willInsertAfter=s,l.originalEvent=a,t.dispatchEvent(l),h&&(c=h.call(d,l,a)),c}function ba(t){t.draggable=!1}function _a(){na=!1}function ya(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,i=e.length,n=0;i--;)n+=e.charCodeAt(i);return n.toString(36)}function $a(t){return setTimeout(t,0)}function wa(t){return clearTimeout(t)}va.prototype={constructor:va,_isOutsideThisEl:function(t){this.el.contains(t)||t===this.el||(Fr=null)},_getDirection:function(t,e){return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,xr):this.options.direction},_onTapStart:function(t){if(t.cancelable){var e=this,i=this.el,n=this.options,o=n.preventOnFilter,r=t.type,a=t.touches&&t.touches[0]||t.pointerType&&"touch"===t.pointerType&&t,s=(a||t).target,l=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||s,c=n.filter;if(function(t){oa.length=0;var e=t.getElementsByTagName("input"),i=e.length;for(;i--;){var n=e[i];n.checked&&oa.push(n)}}(i),!xr&&!(/mousedown|pointerdown/.test(r)&&0!==t.button||n.disabled)&&!l.isContentEditable&&(this.nativeDraggable||!Yo||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=Qo(s,n.draggable,i,!1))&&s.animated||kr===s)){if(Nr=hr(s),Rr=hr(s,n.draggable),"function"==typeof c){if(c.call(this,t,s,this))return Sr({sortable:e,rootEl:l,name:"filter",targetEl:s,toEl:i,fromEl:i}),Ar("filter",e,{evt:t}),void(o&&t.cancelable&&t.preventDefault())}else if(c&&(c=c.split(",").some((function(n){if(n=Qo(l,n.trim(),i,!1))return Sr({sortable:e,rootEl:n,name:"filter",targetEl:s,fromEl:i,toEl:i}),Ar("filter",e,{evt:t}),!0}))))return void(o&&t.cancelable&&t.preventDefault());n.handle&&!Qo(l,n.handle,i,!1)||this._prepareDragStart(t,a,s)}}},_prepareDragStart:function(t,e,i){var n,o=this,r=o.el,a=o.options,s=r.ownerDocument;if(i&&!xr&&i.parentNode===r){var l=sr(i);if(Or=r,Cr=(xr=i).parentNode,Dr=xr.nextSibling,kr=i,jr=a.group,va.dragged=xr,Br={target:xr,clientX:(e||t).clientX,clientY:(e||t).clientY},Xr=Br.clientX-l.left,Yr=Br.clientY-l.top,this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,xr.style["will-change"]="all",n=function(){Ar("delayEnded",o,{evt:t}),va.eventCanceled?o._onDrop():(o._disableDelayedDragEvents(),!Xo&&o.nativeDraggable&&(xr.draggable=!0),o._triggerDragStart(t,e),Sr({sortable:o,name:"choose",originalEvent:t}),ir(xr,a.chosenClass,!0))},a.ignore.split(",").forEach((function(t){rr(xr,t.trim(),ba)})),Go(s,"dragover",fa),Go(s,"mousemove",fa),Go(s,"touchmove",fa),Go(s,"mouseup",o._onDrop),Go(s,"touchend",o._onDrop),Go(s,"touchcancel",o._onDrop),Xo&&this.nativeDraggable&&(this.options.touchStartThreshold=4,xr.draggable=!0),Ar("delayStart",this,{evt:t}),!a.delay||a.delayOnTouchOnly&&!e||this.nativeDraggable&&(Vo||zo))n();else{if(va.eventCanceled)return void this._onDrop();Go(s,"mouseup",o._disableDelayedDrag),Go(s,"touchend",o._disableDelayedDrag),Go(s,"touchcancel",o._disableDelayedDrag),Go(s,"mousemove",o._delayedDragTouchMoveHandler),Go(s,"touchmove",o._delayedDragTouchMoveHandler),a.supportPointer&&Go(s,"pointermove",o._delayedDragTouchMoveHandler),o._dragStartTimer=setTimeout(n,a.delay)}}},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;Math.max(Math.abs(e.clientX-this._lastX),Math.abs(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){xr&&ba(xr),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Ko(t,"mouseup",this._disableDelayedDrag),Ko(t,"touchend",this._disableDelayedDrag),Ko(t,"touchcancel",this._disableDelayedDrag),Ko(t,"mousemove",this._delayedDragTouchMoveHandler),Ko(t,"touchmove",this._delayedDragTouchMoveHandler),Ko(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,e){e=e||"touch"==t.pointerType&&t,!this.nativeDraggable||e?this.options.supportPointer?Go(document,"pointermove",this._onTouchMove):Go(document,e?"touchmove":"mousemove",this._onTouchMove):(Go(xr,"dragend",this),Go(Or,"dragstart",this._onDragStart));try{document.selection?$a((function(){document.selection.empty()})):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,e){if(Zr=!1,Or&&xr){Ar("dragStarted",this,{evt:e}),this.nativeDraggable&&Go(document,"dragover",ga);var i=this.options;!t&&ir(xr,i.dragClass,!1),ir(xr,i.ghostClass,!0),va.active=this,t&&this._appendGhost(),Sr({sortable:this,name:"start",originalEvent:e})}else this._nulling()},_emulateDragOver:function(){if(Lr){this._lastX=Lr.clientX,this._lastY=Lr.clientY,ua();for(var t=document.elementFromPoint(Lr.clientX,Lr.clientY),e=t;t&&t.shadowRoot&&(t=t.shadowRoot.elementFromPoint(Lr.clientX,Lr.clientY))!==e;)e=t;if(xr.parentNode[br]._isOutsideThisEl(t),e)do{if(e[br]){if(e[br]._onDragOver({clientX:Lr.clientX,clientY:Lr.clientY,target:t,rootEl:e})&&!this.options.dragoverBubble)break}t=e}while(e=e.parentNode);pa()}},_onTouchMove:function(t){if(Br){var e=this.options,i=e.fallbackTolerance,n=e.fallbackOffset,o=t.touches?t.touches[0]:t,r=Tr&&or(Tr,!0),a=Tr&&r&&r.a,s=Tr&&r&&r.d,l=aa&&Kr&&ur(Kr),c=(o.clientX-Br.clientX+n.x)/(a||1)+(l?l[0]-ia[0]:0)/(a||1),d=(o.clientY-Br.clientY+n.y)/(s||1)+(l?l[1]-ia[1]:0)/(s||1);if(!va.active&&!Zr){if(i&&Math.max(Math.abs(o.clientX-this._lastX),Math.abs(o.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}if(Tr){r?(r.e+=c-(zr||0),r.f+=d-(Vr||0)):r={a:1,b:0,c:0,d:1,e:c,f:d};var h="matrix(".concat(r.a,",").concat(r.b,",").concat(r.c,",").concat(r.d,",").concat(r.e,",").concat(r.f,")");nr(Tr,"webkitTransform",h),nr(Tr,"mozTransform",h),nr(Tr,"msTransform",h),nr(Tr,"transform",h),zr=c,Vr=d,Lr=o}t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!Tr){var t=this.options.fallbackOnBody?document.body:Or,e=sr(xr,!0,aa,!0,t),i=this.options;if(aa){for(Kr=t;"static"===nr(Kr,"position")&&"none"===nr(Kr,"transform")&&Kr!==document;)Kr=Kr.parentNode;Kr!==document.body&&Kr!==document.documentElement?(Kr===document&&(Kr=ar()),e.top+=Kr.scrollTop,e.left+=Kr.scrollLeft):Kr=ar(),ia=ur(Kr)}ir(Tr=xr.cloneNode(!0),i.ghostClass,!1),ir(Tr,i.fallbackClass,!0),ir(Tr,i.dragClass,!0),nr(Tr,"transition",""),nr(Tr,"transform",""),nr(Tr,"box-sizing","border-box"),nr(Tr,"margin",0),nr(Tr,"top",e.top),nr(Tr,"left",e.left),nr(Tr,"width",e.width),nr(Tr,"height",e.height),nr(Tr,"opacity","0.8"),nr(Tr,"position",aa?"absolute":"fixed"),nr(Tr,"zIndex","100000"),nr(Tr,"pointerEvents","none"),va.ghost=Tr,t.appendChild(Tr),nr(Tr,"transform-origin",Xr/parseInt(Tr.style.width)*100+"% "+Yr/parseInt(Tr.style.height)*100+"%")}},_onDragStart:function(t,e){var i=this,n=t.dataTransfer,o=i.options;Ar("dragStart",this,{evt:t}),va.eventCanceled?this._onDrop():(Ar("setupClone",this),va.eventCanceled||((Pr=mr(xr)).removeAttribute("id"),Pr.draggable=!1,Pr.style["will-change"]="",this._hideClone(),ir(Pr,this.options.chosenClass,!1),va.clone=Pr),i.cloneId=$a((function(){Ar("clone",i),va.eventCanceled||(i.options.removeCloneOnHide||Or.insertBefore(Pr,xr),i._hideClone(),Sr({sortable:i,name:"clone"}))})),!e&&ir(xr,o.dragClass,!0),e?(Jr=!0,i._loopId=setInterval(i._emulateDragOver,50)):(Ko(document,"mouseup",i._onDrop),Ko(document,"touchend",i._onDrop),Ko(document,"touchcancel",i._onDrop),n&&(n.effectAllowed="move",o.setData&&o.setData.call(i,n,xr)),Go(document,"drop",i),nr(xr,"transform","translateZ(0)")),Zr=!0,i._dragStartId=$a(i._dragStarted.bind(i,e,t)),Go(document,"selectstart",i),Wr=!0,Yo&&nr(document.body,"user-select","none"))},_onDragOver:function(t){var e,i,n,o,r=this.el,a=t.target,s=this.options,l=s.group,c=va.active,d=jr===l,h=s.sort,u=Ur||c,p=this,f=!1;if(!na){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),a=Qo(a,s.draggable,r,!0),O("dragOver"),va.eventCanceled)return f;if(xr.contains(t.target)||a.animated&&a.animatingX&&a.animatingY||p._ignoreWhileAnimating===a)return k(!1);if(Jr=!1,c&&!s.disabled&&(d?h||(n=Cr!==Or):Ur===this||(this.lastPutMode=jr.checkPull(this,c,xr,t))&&l.checkPut(this,c,xr,t))){if(o="vertical"===this._getDirection(t,a),e=sr(xr),O("dragOverValid"),va.eventCanceled)return f;if(n)return Cr=Or,D(),this._hideClone(),O("revert"),va.eventCanceled||(Dr?Or.insertBefore(xr,Dr):Or.appendChild(xr)),k(!0);var g=dr(r,s.draggable);if(!g||function(t,e,i){var n=sr(dr(i.el,i.options.draggable)),o=10;return e?t.clientX>n.right+o||t.clientX<=n.right&&t.clientY>n.bottom&&t.clientX>=n.left:t.clientX>n.right&&t.clientY>n.top||t.clientX<=n.right&&t.clientY>n.bottom+o}(t,o,this)&&!g.animated){if(g===xr)return k(!1);if(g&&r===t.target&&(a=g),a&&(i=sr(a)),!1!==ma(Or,r,xr,e,a,i,t,!!a))return D(),g&&g.nextSibling?r.insertBefore(xr,g.nextSibling):r.appendChild(xr),Cr=r,P(),k(!0)}else if(g&&function(t,e,i){var n=sr(cr(i.el,0,i.options,!0)),o=10;return e?t.clientX<n.left-o||t.clientY<n.top&&t.clientX<n.right:t.clientY<n.top-o||t.clientY<n.bottom&&t.clientX<n.left}(t,o,this)){var v=cr(r,0,s,!0);if(v===xr)return k(!1);if(i=sr(a=v),!1!==ma(Or,r,xr,e,a,i,t,!1))return D(),r.insertBefore(xr,v),Cr=r,P(),k(!0)}else if(a.parentNode===r){i=sr(a);var m,b,_,y=xr.parentNode!==r,$=!function(t,e,i){var n=i?t.left:t.top,o=i?t.right:t.bottom,r=i?t.width:t.height,a=i?e.left:e.top,s=i?e.right:e.bottom,l=i?e.width:e.height;return n===a||o===s||n+r/2===a+l/2}(xr.animated&&xr.toRect||e,a.animated&&a.toRect||i,o),w=o?"top":"left",E=lr(a,"top","top")||lr(xr,"top","top"),A=E?E.scrollTop:void 0;if(Fr!==a&&(b=i[w],ta=!1,ea=!$&&s.invertSwap||y),m=function(t,e,i,n,o,r,a,s){var l=n?t.clientY:t.clientX,c=n?i.height:i.width,d=n?i.top:i.left,h=n?i.bottom:i.right,u=!1;if(!a)if(s&&Gr<c*o){if(!ta&&(1===qr?l>d+c*r/2:l<h-c*r/2)&&(ta=!0),ta)u=!0;else if(1===qr?l<d+Gr:l>h-Gr)return-qr}else if(l>d+c*(1-o)/2&&l<h-c*(1-o)/2)return function(t){return hr(xr)<hr(t)?1:-1}(e);if((u=u||a)&&(l<d+c*r/2||l>h-c*r/2))return l>d+c/2?1:-1;return 0}(t,a,i,o,$?1:s.swapThreshold,null==s.invertedSwapThreshold?s.swapThreshold:s.invertedSwapThreshold,ea,Fr===a),0!==m){var S=hr(xr);do{S-=m,_=Cr.children[S]}while(_&&("none"===nr(_,"display")||_===Tr))}if(0===m||_===a)return k(!1);Fr=a,qr=m;var x=a.nextElementSibling,C=!1,T=ma(Or,r,xr,e,a,i,t,C=1===m);if(!1!==T)return 1!==T&&-1!==T||(C=1===T),na=!0,setTimeout(_a,30),D(),C&&!x?r.appendChild(xr):a.parentNode.insertBefore(xr,C?x:a),E&&vr(E,0,A-E.scrollTop),Cr=xr.parentNode,void 0===b||ea||(Gr=Math.abs(b-sr(a)[w])),P(),k(!0)}if(r.contains(xr))return k(!1)}return!1}function O(s,l){Ar(s,p,Ro({evt:t,isOwner:d,axis:o?"vertical":"horizontal",revert:n,dragRect:e,targetRect:i,canSort:h,fromSortable:u,target:a,completed:k,onMove:function(i,n){return ma(Or,r,xr,e,i,sr(i),t,n)},changed:P},l))}function D(){O("dragOverAnimationCapture"),p.captureAnimationState(),p!==u&&u.captureAnimationState()}function k(e){return O("dragOverCompleted",{insertion:e}),e&&(d?c._hideClone():c._showClone(p),p!==u&&(ir(xr,Ur?Ur.options.ghostClass:c.options.ghostClass,!1),ir(xr,s.ghostClass,!0)),Ur!==p&&p!==va.active?Ur=p:p===va.active&&Ur&&(Ur=null),u===p&&(p._ignoreWhileAnimating=a),p.animateAll((function(){O("dragOverAnimationComplete"),p._ignoreWhileAnimating=null})),p!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(a===xr&&!xr.animated||a===r&&!a.animated)&&(Fr=null),s.dragoverBubble||t.rootEl||a===document||(xr.parentNode[br]._isOutsideThisEl(t.target),!e&&fa(t)),!s.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),f=!0}function P(){Ir=hr(xr),Hr=hr(xr,s.draggable),Sr({sortable:p,name:"change",toEl:r,newIndex:Ir,newDraggableIndex:Hr,originalEvent:t})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){Ko(document,"mousemove",this._onTouchMove),Ko(document,"touchmove",this._onTouchMove),Ko(document,"pointermove",this._onTouchMove),Ko(document,"dragover",fa),Ko(document,"mousemove",fa),Ko(document,"touchmove",fa)},_offUpEvents:function(){var t=this.el.ownerDocument;Ko(t,"mouseup",this._onDrop),Ko(t,"touchend",this._onDrop),Ko(t,"pointerup",this._onDrop),Ko(t,"touchcancel",this._onDrop),Ko(document,"selectstart",this)},_onDrop:function(t){var e=this.el,i=this.options;Ir=hr(xr),Hr=hr(xr,i.draggable),Ar("drop",this,{evt:t}),Cr=xr&&xr.parentNode,Ir=hr(xr),Hr=hr(xr,i.draggable),va.eventCanceled||(Zr=!1,ea=!1,ta=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),wa(this.cloneId),wa(this._dragStartId),this.nativeDraggable&&(Ko(document,"drop",this),Ko(e,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Yo&&nr(document.body,"user-select",""),nr(xr,"transform",""),t&&(Wr&&(t.cancelable&&t.preventDefault(),!i.dropBubble&&t.stopPropagation()),Tr&&Tr.parentNode&&Tr.parentNode.removeChild(Tr),(Or===Cr||Ur&&"clone"!==Ur.lastPutMode)&&Pr&&Pr.parentNode&&Pr.parentNode.removeChild(Pr),xr&&(this.nativeDraggable&&Ko(xr,"dragend",this),ba(xr),xr.style["will-change"]="",Wr&&!Zr&&ir(xr,Ur?Ur.options.ghostClass:this.options.ghostClass,!1),ir(xr,this.options.chosenClass,!1),Sr({sortable:this,name:"unchoose",toEl:Cr,newIndex:null,newDraggableIndex:null,originalEvent:t}),Or!==Cr?(Ir>=0&&(Sr({rootEl:Cr,name:"add",toEl:Cr,fromEl:Or,originalEvent:t}),Sr({sortable:this,name:"remove",toEl:Cr,originalEvent:t}),Sr({rootEl:Cr,name:"sort",toEl:Cr,fromEl:Or,originalEvent:t}),Sr({sortable:this,name:"sort",toEl:Cr,originalEvent:t})),Ur&&Ur.save()):Ir!==Nr&&Ir>=0&&(Sr({sortable:this,name:"update",toEl:Cr,originalEvent:t}),Sr({sortable:this,name:"sort",toEl:Cr,originalEvent:t})),va.active&&(null!=Ir&&-1!==Ir||(Ir=Nr,Hr=Rr),Sr({sortable:this,name:"end",toEl:Cr,originalEvent:t}),this.save())))),this._nulling()},_nulling:function(){Ar("nulling",this),Or=xr=Cr=Tr=Dr=Pr=kr=Mr=Br=Lr=Wr=Ir=Hr=Nr=Rr=Fr=qr=Ur=jr=va.dragged=va.ghost=va.clone=va.active=null,oa.forEach((function(t){t.checked=!0})),oa.length=zr=Vr=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":xr&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],i=this.el.children,n=0,o=i.length,r=this.options;n<o;n++)Qo(t=i[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||ya(t));return e},sort:function(t,e){var i={},n=this.el;this.toArray().forEach((function(t,e){var o=n.children[e];Qo(o,this.options.draggable,n,!1)&&(i[t]=o)}),this),e&&this.captureAnimationState(),t.forEach((function(t){i[t]&&(n.removeChild(i[t]),n.appendChild(i[t]))})),e&&this.animateAll()},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return Qo(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var i=this.options;if(void 0===e)return i[t];var n=wr.modifyOption(this,t,e);i[t]=void 0!==n?n:e,"group"===t&&ha(i)},destroy:function(){Ar("destroy",this);var t=this.el;t[br]=null,Ko(t,"mousedown",this._onTapStart),Ko(t,"touchstart",this._onTapStart),Ko(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Ko(t,"dragover",this),Ko(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),(function(t){t.removeAttribute("draggable")})),this._onDrop(),this._disableDelayedDragEvents(),Qr.splice(Qr.indexOf(this.el),1),this.el=t=null},_hideClone:function(){if(!Mr){if(Ar("hideClone",this),va.eventCanceled)return;nr(Pr,"display","none"),this.options.removeCloneOnHide&&Pr.parentNode&&Pr.parentNode.removeChild(Pr),Mr=!0}},_showClone:function(t){if("clone"===t.lastPutMode){if(Mr){if(Ar("showClone",this),va.eventCanceled)return;xr.parentNode!=Or||this.options.group.revertClone?Dr?Or.insertBefore(Pr,Dr):Or.appendChild(Pr):Or.insertBefore(Pr,xr),this.options.group.revertClone&&this.animate(xr,Pr),nr(Pr,"display",""),Mr=!1}}else this._hideClone()}},ra&&Go(document,"touchmove",(function(t){(va.active||Zr)&&t.cancelable&&t.preventDefault()})),va.utils={on:Go,off:Ko,css:nr,find:rr,is:function(t,e){return!!Qo(t,e,t,!1)},extend:function(t,e){if(t&&e)for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t},throttle:gr,closest:Qo,toggleClass:ir,clone:mr,index:hr,nextTick:$a,cancelNextTick:wa,detectDirection:da,getChild:cr},va.get=function(t){return t[br]},va.mount=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e[0].constructor===Array&&(e=e[0]),e.forEach((function(t){if(!t.prototype||!t.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(t));t.utils&&(va.utils=Ro(Ro({},va.utils),t.utils)),wr.mount(t)}))},va.create=function(t,e){return new va(t,e)},va.version="1.15.0";var Ea,Aa,Sa,xa,Ca,Ta,Oa=[],Da=!1;function ka(){Oa.forEach((function(t){clearInterval(t.pid)})),Oa=[]}function Pa(){clearInterval(Ta)}var Ma=gr((function(t,e,i,n){if(e.scroll){var o,r=(t.touches?t.touches[0]:t).clientX,a=(t.touches?t.touches[0]:t).clientY,s=e.scrollSensitivity,l=e.scrollSpeed,c=ar(),d=!1;Aa!==i&&(Aa=i,ka(),Ea=e.scroll,o=e.scrollFn,!0===Ea&&(Ea=pr(i,!0)));var h=0,u=Ea;do{var p=u,f=sr(p),g=f.top,v=f.bottom,m=f.left,b=f.right,_=f.width,y=f.height,$=void 0,w=void 0,E=p.scrollWidth,A=p.scrollHeight,S=nr(p),x=p.scrollLeft,C=p.scrollTop;p===c?($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):($=_<E&&("auto"===S.overflowX||"scroll"===S.overflowX),w=y<A&&("auto"===S.overflowY||"scroll"===S.overflowY));var T=$&&(Math.abs(b-r)<=s&&x+_<E)-(Math.abs(m-r)<=s&&!!x),O=w&&(Math.abs(v-a)<=s&&C+y<A)-(Math.abs(g-a)<=s&&!!C);if(!Oa[h])for(var D=0;D<=h;D++)Oa[D]||(Oa[D]={});Oa[h].vx==T&&Oa[h].vy==O&&Oa[h].el===p||(Oa[h].el=p,Oa[h].vx=T,Oa[h].vy=O,clearInterval(Oa[h].pid),0==T&&0==O||(d=!0,Oa[h].pid=setInterval(function(){n&&0===this.layer&&va.active._onTouchMove(Ca);var e=Oa[this.layer].vy?Oa[this.layer].vy*l:0,i=Oa[this.layer].vx?Oa[this.layer].vx*l:0;"function"==typeof o&&"continue"!==o.call(va.dragged.parentNode[br],i,e,t,Ca,Oa[this.layer].el)||vr(Oa[this.layer].el,i,e)}.bind({layer:h}),24))),h++}while(e.bubbleScroll&&u!==c&&(u=pr(u,!1)));Da=d}}),30),Na=function(t){var e=t.originalEvent,i=t.putSortable,n=t.dragEl,o=t.activeSortable,r=t.dispatchSortableEvent,a=t.hideGhostForTarget,s=t.unhideGhostForTarget;if(e){var l=i||o;a();var c=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e,d=document.elementFromPoint(c.clientX,c.clientY);s(),l&&!l.el.contains(d)&&(r("spill"),this.onSpill({dragEl:n,putSortable:i}))}};function Ia(){}function Ra(){}Ia.prototype={startIndex:null,dragStart:function(t){var e=t.oldDraggableIndex;this.startIndex=e},onSpill:function(t){var e=t.dragEl,i=t.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var n=cr(this.sortable.el,this.startIndex,this.options);n?this.sortable.el.insertBefore(e,n):this.sortable.el.appendChild(e),this.sortable.animateAll(),i&&i.animateAll()},drop:Na},Uo(Ia,{pluginName:"revertOnSpill"}),Ra.prototype={onSpill:function(t){var e=t.dragEl,i=t.putSortable||this.sortable;i.captureAnimationState(),e.parentNode&&e.parentNode.removeChild(e),i.animateAll()},drop:Na},Uo(Ra,{pluginName:"removeOnSpill"});var Ha=[Ra,Ia];va.mount(Ha,new function(){function t(){for(var t in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this))}return t.prototype={dragStarted:function(t){var e=t.originalEvent;this.sortable.nativeDraggable?Go(document,"dragover",this._handleAutoScroll):this.options.supportPointer?Go(document,"pointermove",this._handleFallbackAutoScroll):e.touches?Go(document,"touchmove",this._handleFallbackAutoScroll):Go(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var e=t.originalEvent;this.options.dragOverBubble||e.rootEl||this._handleAutoScroll(e)},drop:function(){this.sortable.nativeDraggable?Ko(document,"dragover",this._handleAutoScroll):(Ko(document,"pointermove",this._handleFallbackAutoScroll),Ko(document,"touchmove",this._handleFallbackAutoScroll),Ko(document,"mousemove",this._handleFallbackAutoScroll)),Pa(),ka(),clearTimeout(tr),tr=void 0},nulling:function(){Ca=Aa=Ea=Da=Ta=Sa=xa=null,Oa.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,e){var i=this,n=(t.touches?t.touches[0]:t).clientX,o=(t.touches?t.touches[0]:t).clientY,r=document.elementFromPoint(n,o);if(Ca=t,e||this.options.forceAutoScrollFallback||Vo||zo||Yo){Ma(t,this.options,r,e);var a=pr(r,!0);!Da||Ta&&n===Sa&&o===xa||(Ta&&Pa(),Ta=setInterval((function(){var r=pr(document.elementFromPoint(n,o),!0);r!==a&&(a=r,ka()),Ma(t,i.options,r,e)}),10),Sa=n,xa=o)}else{if(!this.options.bubbleScroll||pr(r,!0)===ar())return void ka();Ma(t,this.options,pr(r,!1),!1)}}},Uo(t,{pluginName:"scroll",initializeByDefault:!0})});let ja=class extends ce{constructor(){super(...arguments),this._entityKeys=new WeakMap}_getKey(t){return this._entityKeys.has(t)||this._entityKeys.set(t,Math.random().toString()),this._entityKeys.get(t)}disconnectedCallback(){this._destroySortable()}_destroySortable(){var t;null===(t=this._sortable)||void 0===t||t.destroy(),this._sortable=void 0}async firstUpdated(){this._createSortable()}_createSortable(){this._sortable=new fo(this.shadowRoot.querySelector(".entities"),{animation:150,fallbackClass:"sortable-fallback",handle:".handle",onChoose:t=>{t.item.placeholder=document.createComment("sort-placeholder"),t.item.after(t.item.placeholder)},onEnd:t=>{t.item.placeholder&&(t.item.placeholder.replaceWith(t.item),delete t.item.placeholder),this._rowMoved(t)}})}render(){return this.entities&&this.hass?Wt`
      <h3>${Le("editor.settings.entities")}</h3>
      <div class="entities">
        ${Di(this.entities,(t=>this._getKey(t)),((t,e)=>Wt`
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
                .label=${Le("editor.actions.remove")}
                .path=${yi}
                class="remove-icon"
                .index=${e}
                @click=${this._removeRow}
              ></ha-icon-button>

              <ha-icon-button
                .label=${Le("editor.actions.edit")}
                .path=${$i}
                class="edit-icon"
                .index=${e}
                @click="${this._editRow}"
              ></ha-icon-button>
            </div>
          `))}
      </div>
      <div class="add-item row">
        <ha-select
          label="${Le("editor.settings.preset")}"
          name="preset"
          class="add-preset"
          naturalMenuWidth
          fixedMenuPosition
          @closed=${t=>t.stopPropagation()}
        >
          ${Te.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>

        <ha-entity-picker .hass=${this.hass} name="entity" class="add-entity"></ha-entity-picker>

        <ha-icon-button
          .label=${Le("editor.actions.add")}
          .path=${"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"}
          class="add-icon"
          @click="${this._addRow}"
        ></ha-icon-button>
      </div>
    `:qt}_valueChanged(t){if(!this.entities||!this.hass)return;const e=t.detail.value,i=t.target.index,n=this.entities.concat();n[i]=Object.assign(Object.assign({},n[i]),{entity:e||""}),hi(this,"config-changed",n)}_removeRow(t){t.stopPropagation();const e=t.currentTarget.index;if(null!=e){const t=this.entities.concat();t.splice(e,1),hi(this,"config-changed",t)}}_editRow(t){t.stopPropagation();const e=t.target.index;null!=e&&hi(this,"edit-item",e)}_addRow(t){if(t.stopPropagation(),!this.entities||!this.hass)return;const e=this.shadowRoot.querySelector(".add-preset").value,i=this.shadowRoot.querySelector(".add-entity").value,n=Object.assign({},De,Oe[e],{entity:i,preset:""==i?"placeholder":e});hi(this,"config-changed",[...this.entities,n])}_rowMoved(t){if(t.stopPropagation(),t.oldIndex===t.newIndex||!this.entities)return;const e=this.entities.concat();e.splice(t.newIndex,0,e.splice(t.oldIndex,1)[0]),hi(this,"config-changed",e)}static get styles(){return dt`
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
    `}};t([fe({attribute:!1})],ja.prototype,"entities",void 0),t([fe({attribute:!1})],ja.prototype,"hass",void 0),ja=t([he("power-distribution-card-items-editor")],ja);const Ua=["none","flash","slide"],Ba=["none","card","bars"],La=["autarky","ratio",""],za=["more-info","toggle","navigate","url","call-service","none"];let Va=class extends ce{constructor(){super(...arguments),this._subElementEditor=void 0}async setConfig(t){this._config=t}async firstUpdated(){var t,e;customElements.get("ha-form")&&customElements.get("hui-action-editor")||null===(t=customElements.get("hui-button-card"))||void 0===t||t.getConfigElement(),customElements.get("ha-entity-picker")||null===(e=customElements.get("hui-entities-card"))||void 0===e||e.getConfigElement(),console.log(this.hass)}render(){var t,e,i,n,o,r,a,s,l,c;return this.hass?this._subElementEditor?this._renderSubElementEditor():Wt`
      <div class="card-config">
        <ha-textfield
          label="${Le("editor.settings.title")} (${Le("editor.optional")})"
          .value=${(null===(t=this._config)||void 0===t?void 0:t.title)||""}
          .configValue=${"title"}
          @input=${this._valueChanged}
        ></ha-textfield>
        <ha-select
          naturalMenuWidth
          fixedMenuPosition
          label="${Le("editor.settings.animation")}"
          .configValue=${"animation"}
          .value=${(null===(e=this._config)||void 0===e?void 0:e.animation)||"flash"}
          @selected=${this._valueChanged}
          @closed=${t=>t.stopPropagation()}
        >
          ${Ua.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
        </ha-select>
        <br />
        <div class="entity row">
          <ha-select
            label="${Le("editor.settings.center")}"
            .configValue=${"type"}
            @selected=${this._centerChanged}
            @closed=${t=>t.stopPropagation()}
            .value=${(null===(n=null===(i=this._config)||void 0===i?void 0:i.center)||void 0===n?void 0:n.type)||"none"}
          >
            ${Ba.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
          </ha-select>
          ${"bars"==(null===(r=null===(o=this._config)||void 0===o?void 0:o.center)||void 0===r?void 0:r.type)||"card"==(null===(s=null===(a=this._config)||void 0===a?void 0:a.center)||void 0===s?void 0:s.type)?Wt`<ha-icon-button
                class="edit-icon"
                .value=${null===(c=null===(l=this._config)||void 0===l?void 0:l.center)||void 0===c?void 0:c.type}
                .path=${$i}
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
            label=${Le("editor.actions.remove")}
            class="remove-icon"
            .i=${i}
            .path=${yi}
            @click=${this._removeBar}
            >
          </ha-icon-button>
          </h4>
          <div class="side-by-side">
            <ha-textfield
              label="${Le("editor.settings.name")} (${Le("editor.optional")})"
              .value=${e.name||""}
              .configValue=${"name"}
              @input=${this._barChanged}
              .i=${i}
            ></ha-textfield>
            <ha-entity-picker
              label="${Le("editor.settings.entity")}"
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
              <label for="invert-value"> ${Le("editor.settings.invert-value")}</label>
            </div>
            <div>
            <ha-select
              label="${Le("editor.settings.preset")}"
              .configValue=${"preset"}
              .value=${e.preset||""}
              @selected=${this._barChanged}
              @closed=${t=>t.stopPropagation()}
              .i=${i}
            >
              ${La.map((t=>Wt`<mwc-list-item .value=${t}>${t}</mwc-list-item>`))}
            </ha-select>
          </div>
          </div>
          <div class="side-by-side">
            <ha-textfield
              label="${Le("editor.settings.color")}"
              .value=${e.bar_color||""}
              .configValue=${"bar_color"}
              @input=${this._barChanged}
              .i=${i}
            ></ha-textfield>
            <ha-textfield
              .label="${Le("editor.settings.background_color")}"
              .value=${e.bar_bg_color||""}
              .configValue=${"bar_bg_color"}
              @input=${this._barChanged}
              .i=${i}
            ></ha-textfield>
          </div>
          <h3>${Le("editor.settings.action_settings")}</h3>
      <div class="side-by-side">
        <hui-action-editor
          .hass=${this.hass}
          .config=${e.tap_action}
          .actions=${za}
          .configValue=${"tap_action"}
          @value-changed=${this._barChanged}
          .i=${i}
        >
        </hui-action-editor>
        <hui-action-editor
          .hass=${this.hass}
          .config=${e.double_tap_action}
          .actions=${za}
          .configValue=${"double_tap_action"}
          @value-changed=${this._barChanged}
          .i=${i}
        >
        </hui-action-editor>
      </div>
        </div>
        <br/>
      `))),t.push(Wt`
      <mwc-icon-button aria-label=${Le("editor.actions.add")} class="add-icon" @click="${this._addBar}">
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
        }`]}};t([fe({attribute:!1})],Va.prototype,"hass",void 0),t([ge()],Va.prototype,"_config",void 0),t([ge()],Va.prototype,"_subElementEditor",void 0),Va=t([he("power-distribution-card-editor")],Va);var Xa=Object.freeze({__proto__:null,get PowerDistributionCardEditor(){return Va}});console.info("%c POWER-DISTRIBUTION-CARD %c 2.5.10 ","font-weight: 500; color: white; background: #03a9f4;","font-weight: 500; color: #03a9f4; background: white;"),window.customCards.push({type:"power-distribution-card",name:"Power Distribution Card",description:Le("common.description")});let Ya=class extends ce{constructor(){super(...arguments),this._narrow=!1}static async getConfigElement(){return await Promise.resolve().then((function(){return Xa})),document.createElement("power-distribution-card-editor")}static getStubConfig(){return{title:"Title",entities:[],center:{type:"bars",content:[{preset:"autarky",name:Le("editor.settings.autarky")},{preset:"ratio",name:Le("editor.settings.ratio")}]}}}async setConfig(t){const e=Object.assign({},ke,t,{entities:[]});if(!t.entities)throw new Error("You need to define Entities!");t.entities.forEach((t=>{if(!t.preset||!Te.includes(t.preset))throw new Error("The preset `"+t.preset+"` is not a valid entry. Please choose a Preset from the List.");{const i=Object.assign({},De,Oe[t.preset],t);e.entities.push(i)}})),this._config=e,"card"==this._config.center.type&&(this._card=this._createCardElement(this._config.center.content))}firstUpdated(){const t=this._config;if(t.entities.forEach(((t,e)=>{if(!t.entity)return;const i=this._state({entity:t.entity,attribute:"unit_of_measurement"});t.unit_of_measurement||(this._config.entities[e].unit_of_measurement=i||"W")})),"bars"==t.center.type){const e=t.center.content.map((t=>{let e="%";return t.entity&&(e=this._state({entity:t.entity,attribute:"unit_of_measurement"})),Object.assign(Object.assign({},t),{unit_of_measurement:t.unit_of_measurement||e})}));this._config=Object.assign(Object.assign({},this._config),{center:Object.assign(Object.assign({},this._config.center),{content:e})})}this._adjustWidth(),this._attachObserver(),this.requestUpdate()}updated(t){super.updated(t),this._card&&(t.has("hass")||t.has("editMode"))&&this.hass&&(this._card.hass=this.hass)}static get styles(){return Pe}connectedCallback(){super.connectedCallback(),this.updateComplete.then((()=>this._attachObserver()))}disconnectedCallback(){this._resizeObserver&&this._resizeObserver.disconnect()}async _attachObserver(){var t;this._resizeObserver||(await(async()=>{"function"!=typeof ci&&(window.ResizeObserver=(await Promise.resolve().then((function(){return di}))).default)})(),this._resizeObserver=new ci(function(t,e,i){var n;return void 0===i&&(i=!1),function(){var o=[].slice.call(arguments),r=this,a=i&&!n;clearTimeout(n),n=setTimeout((function(){n=null,i||t.apply(r,o)}),e),a&&t.apply(r,o)}}((()=>this._adjustWidth()),250,!1)));const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("ha-card");e&&this._resizeObserver.observe(e)}_adjustWidth(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("ha-card");e&&(this._narrow=e.offsetWidth<400)}_val(t){var e;let i=t.invert_value?-1:1;"k"==(null===(e=t.unit_of_measurement)||void 0===e?void 0:e.charAt(0))&&(i*=1e3);let n=this._state(t);const o=t.threshold||null;return n=o&&Math.abs(n)<o?0:n,n*i}_state(t){return t.entity&&this.hass.states[t.entity]?t.attribute?this.hass.states[t.entity].attributes[t.attribute]:this.hass.states[t.entity].state:null}render(){const t=[],e=[],i=[];let n=0,o=0;this._config.entities.forEach(((e,r)=>{const a=this._val(e);e.calc_excluded||(e.producer&&a>0&&(o+=a),e.consumer&&a<0&&(n-=a));const s=this._render_item(a,e,r);r%2==0?t.push(s):i.push(s)}));switch(this._config.center.type){case"none":break;case"card":this._card?e.push(this._card):console.warn("NO CARD");break;case"bars":e.push(this._render_bars(n,o))}return Wt` ${this._narrow?Me:void 0}
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
        .actionHandler=${_i({hasDoubleClick:Ce(e.double_tap_action)})}
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
      `}_render_bars(t,e){const i=[];return this._config.center.content&&0!=this._config.center.content.length?(this._config.center.content.forEach((n=>{let o=-1;switch(n.preset){case"autarky":n.entity||(o=0!=t?Math.min(Math.round(100*e/Math.abs(t)),100):0);break;case"ratio":n.entity||(o=0!=e?Math.min(Math.round(100*Math.abs(t)/e),100):0)}o<0&&(o=parseInt(this._val(n).toFixed(0),10)),i.push(Wt`
        <div
          class="bar-element"
          .entity=${n.entity}
          .tap_action=${n.tap_action}
          .double_tap_action=${n.double_tap_action}
          @action=${this._handleAction}
          .actionHandler=${_i({hasDoubleClick:Ce(n.double_tap_action)})}
          style="${n.tap_action||n.double_tap_action?"cursor: pointer;":""}"
        >
          <p class="bar-percentage">${o}${n.unit_of_measurement||"%"}</p>
          <div class="bar-wrapper" style="${n.bar_bg_color?`background-color:${n.bar_bg_color};`:""}">
            <bar style="height:${o}%; background-color:${n.bar_color};" />
          </div>
          <p>${n.name||""}</p>
        </div>
      `)})),Wt`${i.map((t=>Wt`${t}`))}`):Wt``}_createCardElement(t){const e=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return n("hui-error-card",{type:"error",error:t,config:e})},n=function(t,e){var n=window.document.createElement(t);try{if(!n.setConfig)return;n.setConfig(e)}catch(n){return console.error(t,n),i(n.message,e)}return n};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var o=t.type;if(o&&o.startsWith("custom:"))o=o.substr(7);else if(e)if(Ee.has(o))o="hui-"+o+"-row";else{if(!t.entity)return i("Invalid config given.",t);var r=t.entity.split(".",1)[0];o="hui-"+(Ae[r]||"text")+"-entity-row"}else o="hui-"+o+"-card";if(customElements.get(o))return n(o,t);var a=i("Custom element doesn't exist: "+t.type+".",t);a.style.display="None";var s=setTimeout((function(){a.style.display=""}),2e3);return customElements.whenDefined(t.type).then((function(){clearTimeout(s),we(a,"ll-rebuild",{},a)})),a}(t);return this.hass&&(e.hass=this.hass),e.addEventListener("ll-rebuild",(i=>{i.stopPropagation(),this._rebuildCard(e,t)}),{once:!0}),e}_rebuildCard(t,e){const i=this._createCardElement(e);t.parentElement&&t.parentElement.replaceChild(i,t),this._card===t&&(this._card=i)}};t([fe()],Ya.prototype,"hass",void 0),t([ge()],Ya.prototype,"_config",void 0),t([fe()],Ya.prototype,"_card",void 0),t([ge()],Ya.prototype,"_narrow",void 0),Ya=t([he("power-distribution-card")],Ya);export{Ya as PowerDistributionCard};
