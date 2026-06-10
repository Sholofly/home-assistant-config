/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ai=globalThis,la=Ai.ShadowRoot&&(Ai.ShadyCSS===void 0||Ai.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ca=Symbol(),rs=new WeakMap;let ns=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ca)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(la&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=rs.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&rs.set(t,e))}return e}toString(){return this.cssText}};const cn=r=>new ns(typeof r=="string"?r:r+"",void 0,ca),Ue=(r,...e)=>{const t=r.length===1?r[0]:e.reduce(((i,a,s)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+r[s+1]),r[0]);return new ns(t,r,ca)},dn=(r,e)=>{if(la)r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const t of e){const i=document.createElement("style"),a=Ai.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,r.appendChild(i)}},os=la?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return cn(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:un,defineProperty:hn,getOwnPropertyDescriptor:pn,getOwnPropertyNames:_n,getOwnPropertySymbols:mn,getPrototypeOf:fn}=Object,$i=globalThis,ls=$i.trustedTypes,gn=ls?ls.emptyScript:"",yn=$i.reactiveElementPolyfillSupport,Jt=(r,e)=>r,da={toAttribute(r,e){switch(e){case Boolean:r=r?gn:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},cs=(r,e)=>!un(r,e),ds={attribute:!0,type:String,converter:da,reflect:!1,useDefault:!1,hasChanged:cs};Symbol.metadata??=Symbol("metadata"),$i.litPropertyMetadata??=new WeakMap;let Pt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ds){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);a!==void 0&&hn(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:s}=pn(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:a,set(n){const l=a?.call(this);s?.call(this,n),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ds}static _$Ei(){if(this.hasOwnProperty(Jt("elementProperties")))return;const e=fn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Jt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Jt("properties"))){const t=this.properties,i=[..._n(t),...mn(t)];for(const a of i)this.createProperty(a,t[a])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,a]of t)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const a=this._$Eu(t,i);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)t.unshift(os(a))}else e!==void 0&&t.push(os(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dn(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const s=(i.converter?.toAttribute!==void 0?i.converter:da).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const s=i.getPropertyOptions(a),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:da;this._$Em=a,this[a]=n.fromAttribute(t,s.type)??this._$Ej?.get(a)??null,this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){const a=this.constructor,s=this[e];if(i??=a.getPropertyOptions(e),!((i.hasChanged??cs)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),s!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[a,s]of i){const{wrapped:n}=s,l=this[a];n!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,s,l)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach((i=>i.hostUpdate?.())),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};Pt.elementStyles=[],Pt.shadowRootOptions={mode:"open"},Pt[Jt("elementProperties")]=new Map,Pt[Jt("finalized")]=new Map,yn?.({ReactiveElement:Pt}),($i.reactiveElementVersions??=[]).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ua=globalThis,Ci=ua.trustedTypes,us=Ci?Ci.createPolicy("lit-html",{createHTML:r=>r}):void 0,hs="$lit$",ct=`lit$${Math.random().toFixed(9).slice(2)}$`,ps="?"+ct,vn=`<${ps}>`,bt=document,ei=()=>bt.createComment(""),ti=r=>r===null||typeof r!="object"&&typeof r!="function",ha=Array.isArray,bn=r=>ha(r)||typeof r?.[Symbol.iterator]=="function",pa=`[ 	
\f\r]`,ii=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_s=/-->/g,ms=/>/g,xt=RegExp(`>|${pa}(?:([^\\s"'>=/]+)(${pa}*=${pa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fs=/'/g,gs=/"/g,ys=/^(?:script|style|textarea|title)$/i,xn=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),y=xn(1),it=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),vs=new WeakMap,wt=bt.createTreeWalker(bt,129);function bs(r,e){if(!ha(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return us!==void 0?us.createHTML(e):e}const wn=(r,e)=>{const t=r.length-1,i=[];let a,s=e===2?"<svg>":e===3?"<math>":"",n=ii;for(let l=0;l<t;l++){const c=r[l];let d,h,u=-1,m=0;for(;m<c.length&&(n.lastIndex=m,h=n.exec(c),h!==null);)m=n.lastIndex,n===ii?h[1]==="!--"?n=_s:h[1]!==void 0?n=ms:h[2]!==void 0?(ys.test(h[2])&&(a=RegExp("</"+h[2],"g")),n=xt):h[3]!==void 0&&(n=xt):n===xt?h[0]===">"?(n=a??ii,u=-1):h[1]===void 0?u=-2:(u=n.lastIndex-h[2].length,d=h[1],n=h[3]===void 0?xt:h[3]==='"'?gs:fs):n===gs||n===fs?n=xt:n===_s||n===ms?n=ii:(n=xt,a=void 0);const f=n===xt&&r[l+1].startsWith("/>")?" ":"";s+=n===ii?c+vn:u>=0?(i.push(d),c.slice(0,u)+hs+c.slice(u)+ct+f):c+ct+(u===-2?l:f)}return[bs(r,s+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class xi{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let s=0,n=0;const l=e.length-1,c=this.parts,[d,h]=wn(e,t);if(this.el=xi.createElement(d,i),wt.currentNode=this.el.content,t===2||t===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=wt.nextNode())!==null&&c.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(const u of a.getAttributeNames())if(u.endsWith(hs)){const m=h[n++],f=a.getAttribute(u).split(ct),g=/([.?@])?(.*)/.exec(m);c.push({type:1,index:s,name:g[2],strings:f,ctor:g[1]==="."?En:g[1]==="?"?Sn:g[1]==="@"?An:Ii}),a.removeAttribute(u)}else u.startsWith(ct)&&(c.push({type:6,index:s}),a.removeAttribute(u));if(ys.test(a.tagName)){const u=a.textContent.split(ct),m=u.length-1;if(m>0){a.textContent=Ci?Ci.emptyScript:"";for(let f=0;f<m;f++)a.append(u[f],ei()),wt.nextNode(),c.push({type:2,index:++s});a.append(u[m],ei())}}}else if(a.nodeType===8)if(a.data===ps)c.push({type:2,index:s});else{let u=-1;for(;(u=a.data.indexOf(ct,u+1))!==-1;)c.push({type:7,index:s}),u+=ct.length-1}s++}}static createElement(e,t){const i=bt.createElement("template");return i.innerHTML=e,i}}function zt(r,e,t=r,i){if(e===it)return e;let a=i!==void 0?t._$Co?.[i]:t._$Cl;const s=ti(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(r),a._$AT(r,t,i)),i!==void 0?(t._$Co??=[])[i]=a:t._$Cl=a),a!==void 0&&(e=zt(r,a._$AS(r,e.values),a,i)),e}let kn=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??bt).importNode(t,!0);wt.currentNode=a;let s=wt.nextNode(),n=0,l=0,c=i[0];for(;c!==void 0;){if(n===c.index){let d;c.type===2?d=new Qt(s,s.nextSibling,this,e):c.type===1?d=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(d=new $n(s,this,e)),this._$AV.push(d),c=i[++l]}n!==c?.index&&(s=wt.nextNode(),n++)}return wt.currentNode=bt,a}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class Qt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=zt(this,e,t),ti(e)?e===k||e==null||e===""?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==it&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):bn(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&ti(this._$AH)?this._$AA.nextSibling.data=e:this.T(bt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=xi.createElement(bs(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const s=new kn(a,this),n=s.u(this.options);s.p(t),this.T(n),this._$AH=s}}_$AC(e){let t=vs.get(e.strings);return t===void 0&&vs.set(e.strings,t=new xi(e)),t}k(e){ha(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const s of e)a===t.length?t.push(i=new Qt(this.O(ei()),this.O(ei()),this,this.options)):i=t[a],i._$AI(s),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class Ii{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,s){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=k}_$AI(e,t=this,i,a){const s=this.strings;let n=!1;if(s===void 0)e=zt(this,e,t,0),n=!ti(e)||e!==this._$AH&&e!==it,n&&(this._$AH=e);else{const l=e;let c,d;for(e=s[0],c=0;c<s.length-1;c++)d=zt(this,l[i+c],t,c),d===it&&(d=this._$AH[c]),n||=!ti(d)||d!==this._$AH[c],d===k?e=k:e!==k&&(e+=(d??"")+s[c+1]),this._$AH[c]=d}n&&!a&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class En extends Ii{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}}let Sn=class extends Ii{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}},An=class extends Ii{constructor(e,t,i,a,s){super(e,t,i,a,s),this.type=5}_$AI(e,t=this){if((e=zt(this,e,t,0)??k)===it)return;const i=this._$AH,a=e===k&&i!==k||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==k&&(i===k||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},$n=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}};const Cn={I:Qt},In=ua.litHtmlPolyfillSupport;In?.(xi,Qt),(ua.litHtmlVersions??=[]).push("3.3.0");const Tn=(r,e,t)=>{const i=t?.renderBefore??e;let a=i._$litPart$;if(a===void 0){const s=t?.renderBefore??null;i._$litPart$=a=new Qt(e.insertBefore(ei(),s),s,void 0,t??{})}return a._$AI(r),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _a=globalThis;let dt=class extends Pt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Tn(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return it}};dt._$litElement$=!0,dt.finalized=!0,_a.litElementHydrateSupport?.({LitElement:dt});const Mn=_a.litElementPolyfillSupport;Mn?.({LitElement:dt}),(_a.litElementVersions??=[]).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ti={ATTRIBUTE:1,CHILD:2},ma=r=>(...e)=>({_$litDirective$:r,values:e});let fa=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xs=ma(class extends fa{constructor(r){if(super(r),r.type!==Ti.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((e=>r[e])).join(" ")+" "}update(r,[e]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((i=>i!==""))));for(const i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}const t=r.element.classList;for(const i of this.st)i in e||(t.remove(i),this.st.delete(i));for(const i in e){const a=!!e[i];a===this.st.has(i)||this.nt?.has(i)||(a?(t.add(i),this.st.add(i)):(t.remove(i),this.st.delete(i)))}return it}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Pn}=Cn,zn=r=>r.strings===void 0,ws=()=>document.createComment(""),ai=(r,e,t)=>{const i=r._$AA.parentNode,a=e===void 0?r._$AB:e._$AA;if(t===void 0){const s=i.insertBefore(ws(),a),n=i.insertBefore(ws(),a);t=new Pn(s,n,r,r.options)}else{const s=t._$AB.nextSibling,n=t._$AM,l=n!==r;if(l){let c;t._$AQ?.(r),t._$AM=r,t._$AP!==void 0&&(c=r._$AU)!==n._$AU&&t._$AP(c)}if(s!==a||l){let c=t._$AA;for(;c!==s;){const d=c.nextSibling;i.insertBefore(c,a),c=d}}}return t},kt=(r,e,t=r)=>(r._$AI(e,t),r),jn={},Dn=(r,e=jn)=>r._$AH=e,Fn=r=>r._$AH,ga=r=>{r._$AP?.(!1,!0);let e=r._$AA;const t=r._$AB.nextSibling;for(;e!==t;){const i=e.nextSibling;e.remove(),e=i}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const si=(r,e)=>{const t=r._$AN;if(t===void 0)return!1;for(const i of t)i._$AO?.(e,!1),si(i,e);return!0},Mi=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while(t?.size===0)},ks=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),Ln(e)}};function On(r){this._$AN!==void 0?(Mi(this),this._$AM=r,ks(this)):this._$AM=r}function Rn(r,e=!1,t=0){const i=this._$AH,a=this._$AN;if(a!==void 0&&a.size!==0)if(e)if(Array.isArray(i))for(let s=t;s<i.length;s++)si(i[s],!1),Mi(i[s]);else i!=null&&(si(i,!1),Mi(i));else si(this,r)}const Ln=r=>{r.type==Ti.CHILD&&(r._$AP??=Rn,r._$AQ??=On)};class qn extends fa{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),ks(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(si(this,e),Mi(this))}setValue(e){if(zn(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Es=(r,e,t)=>{const i=new Map;for(let a=e;a<=t;a++)i.set(r[a],a);return i},Nn=ma(class extends fa{constructor(r){if(super(r),r.type!==Ti.CHILD)throw Error("repeat() can only be used in text expressions")}dt(r,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const a=[],s=[];let n=0;for(const l of r)a[n]=i?i(l,n):n,s[n]=t(l,n),n++;return{values:s,keys:a}}render(r,e,t){return this.dt(r,e,t).values}update(r,[e,t,i]){const a=Fn(r),{values:s,keys:n}=this.dt(e,t,i);if(!Array.isArray(a))return this.ut=n,s;const l=this.ut??=[],c=[];let d,h,u=0,m=a.length-1,f=0,g=s.length-1;for(;u<=m&&f<=g;)if(a[u]===null)u++;else if(a[m]===null)m--;else if(l[u]===n[f])c[f]=kt(a[u],s[f]),u++,f++;else if(l[m]===n[g])c[g]=kt(a[m],s[g]),m--,g--;else if(l[u]===n[g])c[g]=kt(a[u],s[g]),ai(r,c[g+1],a[u]),u++,g--;else if(l[m]===n[f])c[f]=kt(a[m],s[f]),ai(r,a[u],a[m]),m--,f++;else if(d===void 0&&(d=Es(n,f,g),h=Es(l,u,m)),d.has(l[u]))if(d.has(l[m])){const v=h.get(n[f]),w=v!==void 0?a[v]:null;if(w===null){const A=ai(r,a[u]);kt(A,s[f]),c[f]=A}else c[f]=kt(w,s[f]),ai(r,a[u],w),a[v]=null;f++}else ga(a[m]),m--;else ga(a[u]),u++;for(;f<=g;){const v=ai(r,c[g+1]);kt(v,s[f]),c[f++]=v}for(;u<=m;){const v=a[u++];v!==null&&ga(v)}return this.ut=n,Dn(r,c),it}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ea extends Event{constructor(e){super(ea.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}}ea.eventName="rangeChanged";class ta extends Event{constructor(e){super(ta.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}}ta.eventName="visibilityChanged";class ia extends Event{constructor(){super(ia.eventName,{bubbles:!1})}}ia.eventName="unpinned";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Vn{constructor(e){this._element=null;const t=e??window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}}class Un extends Vn{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);const i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(e,t){const i=typeof e=="number"&&typeof t=="number"?{left:e,top:t}:e;this._scrollTo(i)}scrollBy(e,t){const i=typeof e=="number"&&typeof t=="number"?{left:e,top:t}:e;i.top!==void 0&&(i.top+=this.scrollTop),i.left!==void 0&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,i=null){this._end!==null&&this._end(),e.behavior==="smooth"?(this._setDestination(e),this._retarget=t,this._end=i):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:i}=e;return t=t===void 0?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),i=i===void 0?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),this._destination!==null&&i===this._destination.left&&t===this._destination.top?!1:(this.__destination={top:t,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,i){return this._scrollTo(e,t,i),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){const{scrollTop:e,scrollLeft:t}=this;let{top:i,left:a}=this._destination;i=Math.min(i||0,this.maxScrollTop),a=Math.min(a||0,this.maxScrollLeft);const s=Math.abs(i-e),n=Math.abs(a-t);s<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ss=typeof window<"u"?window.ResizeObserver:void 0;const Hn=Symbol("virtualizerRef"),Pi="virtualizer-sizer";let As;class Bn{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw new Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);const t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new Ss(()=>this._hostElementSizeChanged()),this._childrenRO=new Ss(this._childrenSizeChanged.bind(this))}_initHostElement(e){const t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[Hn]=this}connected(){this._initObservers();const e=this._isScroller;this._clippingAncestors=Wn(this._hostElement,e),this._scrollerController=new Un(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){const t=this._hostElement.style;t.display=t.display||"block",t.position=t.position||"relative",t.contain=t.contain||"size layout",this._isScroller&&(t.overflow=t.overflow||"auto",t.minHeight=t.minHeight||"150px")}_getSizer(){const e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${Pi}]`);t||(t=document.createElement("div"),t.setAttribute(Pi,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(Pi,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;const t=e.type||As;if(typeof t=="function"&&this._layout instanceof t){const i={...e};return delete i.type,this._layout.config=i,!0}return!1}async _initLayout(e){let t,i;if(typeof e.type=="function"){i=e.type;const a={...e};delete a.type,t=a}else t=e;i===void 0&&(As=i=(await Promise.resolve().then(function(){return Ul})).FlowLayout),this._layout=new i(a=>this._handleLayoutMessage(a),t),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){const e=window.performance.now(),t=e-this._benchmarkStart,a=performance.getEntriesByName("uv-virtualizing","measure").filter(s=>s.startTime>=this._benchmarkStart&&s.startTime<e).reduce((s,n)=>s+n.duration,0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:a}}return null}_measureChildren(){const e={},t=this._children,i=this._measureChildOverride||this._measureChild;for(let a=0;a<t.length;a++){const s=t[a],n=this._first+a;(this._itemsChanged||this._toBeMeasured.has(s))&&(e[n]=i.call(this,s,this._items[n]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){const{width:t,height:i}=e.getBoundingClientRect();return Object.assign({width:t,height:i},Gn(e))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;const{_rangeChanged:t,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(e){console.warn("Error measuring performance data: ",e)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){e.type==="scroll"?(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",e)}_handleLayoutMessage(e){e.type==="stateChanged"?this._updateDOM(e):e.type==="visibilityChanged"?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):e.type==="unpinned"&&this._hostElement.dispatchEvent(new ia)}get _children(){const e=[];let t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(Pi)||e.push(t),t=t.nextElementSibling;return e}_updateView(){const e=this._hostElement,t=this._scrollerController?.element,i=this._layout;if(e&&t&&i){let a,s,n,l;const c=e.getBoundingClientRect();a=0,s=0,n=window.innerHeight,l=window.innerWidth;const d=this._clippingAncestors.map(A=>A.getBoundingClientRect());d.unshift(c);for(const A of d)a=Math.max(a,A.top),s=Math.max(s,A.left),n=Math.min(n,A.bottom),l=Math.min(l,A.right);const h=t.getBoundingClientRect(),u={left:c.left-h.left,top:c.top-h.top},m={width:t.scrollWidth,height:t.scrollHeight},f=a-c.top+e.scrollTop,g=s-c.left+e.scrollLeft,v=Math.max(0,n-a),w=Math.max(0,l-s);i.viewportSize={width:w,height:v},i.viewportScroll={top:f,left:g},i.totalScrollSize=m,i.offsetWithinScroller=u}}_sizeHostElement(e){const i=e&&e.width!==null?Math.min(82e5,e.width):0,a=e&&e.height!==null?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${i}px, ${a}px)`;else{const s=this._hostElement.style;s.minWidth=i?`${i}px`:"100%",s.minHeight=a?`${a}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:t,left:i,width:a,height:s,xOffset:n,yOffset:l},c)=>{const d=this._children[c-this._first];d&&(d.style.position="absolute",d.style.boxSizing="border-box",d.style.transform=`translate(${i}px, ${t}px)`,a!==void 0&&(d.style.width=a+"px"),s!==void 0&&(d.style.height=s+"px"),d.style.left=n===void 0?null:n+"px",d.style.top=l===void 0?null:l+"px")})}async _adjustRange(e){const{_first:t,_last:i,_firstVisible:a,_lastVisible:s}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==a||this._lastVisible!==s}_correctScrollError(){if(this._scrollError){const{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:i,left:a}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-i,left:t-a})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),e.behavior==="smooth"){const t=this._layout.getScrollIntoViewCoordinates(e),{behavior:i}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){const{index:t}=this._scrollIntoViewTarget||{};t&&e?.has(t)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new ea({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new ta({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(const t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}}function Gn(r){const e=window.getComputedStyle(r);return{marginTop:zi(e.marginTop),marginRight:zi(e.marginRight),marginBottom:zi(e.marginBottom),marginLeft:zi(e.marginLeft)}}function zi(r){const e=r?parseFloat(r):NaN;return Number.isNaN(e)?0:e}function $s(r){if(r.assignedSlot!==null)return r.assignedSlot;if(r.parentElement!==null)return r.parentElement;const e=r.parentNode;return e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host||null}function Qn(r,e=!1){const t=[];let i=e?r:$s(r);for(;i!==null;)t.push(i),i=$s(i);return t}function Wn(r,e=!1){let t=!1;return Qn(r,e).filter(i=>{if(t)return!1;const a=getComputedStyle(i);return t=a.position==="fixed",a.overflow!=="visible"})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yn=r=>r,Zn=(r,e)=>y`${e}: ${JSON.stringify(r,null,2)}`;class Kn extends qn{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(t,i)=>Zn(t,i+this._first),this._keyFunction=(t,i)=>Yn(t,i+this._first),this._items=[],e.type!==Ti.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);const t=[];if(this._first>=0&&this._last>=this._first)for(let i=this._first;i<=this._last;i++)t.push(this._items[i]);return Nn(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);const i=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),i?it:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){const a=e.parentNode;this._makeVirtualizer(a,t)}this._virtualizer.items=this._items}_setFunctions(e){const{renderItem:t,keyFunction:i}=e;t&&(this._renderItem=(a,s)=>t(a,s+this._first)),i&&(this._keyFunction=(a,s)=>i(a,s+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();const{layout:i,scroller:a,items:s}=t;this._virtualizer=new Bn({hostElement:e,layout:i,scroller:a}),this._virtualizer.items=s,this._virtualizer.connected()}_initialize(e,t){const i=e.parentNode;i&&i.nodeType===1&&(i.addEventListener("rangeChanged",a=>{this._first=a.first,this._last=a.last,this.setValue(this.render())}),this._makeVirtualizer(i,t))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}}const Cs=ma(Kn);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function jt(r){return r==="horizontal"?"width":"height"}function Is(r){return r==="horizontal"?"height":"width"}class Ts{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,t){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=t||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){e=e==="horizontal"?e:"vertical",e!==this._direction&&(this._direction=e,this._sizeDim=e==="horizontal"?"width":"height",this._secondarySizeDim=e==="horizontal"?"height":"width",this._positionDim=e==="horizontal"?"left":"top",this._secondaryPositionDim=e==="horizontal"?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){const{_viewDim1:t,_viewDim2:i}=this;Object.assign(this._viewportSize,e),i!==this._viewDim2?this._scheduleLayoutUpdate():t!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);const t=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(t-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(this._pin!==null){const{index:e,block:t}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:t}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[jt(this.direction)]-this._viewDim1))}unpin(){this._pin!==null&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(this.pin!==null){const e=this._scrollPosition,{index:t,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:t,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){const{block:t}=e,i=Math.min(this.items.length,Math.max(0,e.index)),a=this._getItemPosition(i)[this._positionDim];let s=a;if(t!=="start"){const n=this._getItemSize(i)[this._sizeDim];if(t==="center")s=a-.5*this._viewDim1+.5*n;else{const l=a-this._viewDim1+n;if(t==="end")s=l;else{const c=this._scrollPosition;s=Math.abs(c-a)<Math.abs(c-l)?a:l}}}return s+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(s)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){const e=new Map;if(this._first!==-1&&this._last!==-1)for(let i=this._first;i<=this._last;i++)e.set(i,this._getItemPosition(i));const t={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(t.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(t)}get _num(){return this._first===-1||this._last===-1?0:this._last-this._first+1}_checkThresholds(){if(this._viewDim1===0&&this._num>0||this._pin!==null)this._scheduleReflow();else{const e=Math.max(0,this._scrollPosition-this._overhang),t=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<t?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(this._first===-1||this._last===-1)return;let t=this._first;for(;t<this._last&&Math.round(this._getItemPosition(t)[this._positionDim]+this._getItemSize(t)[this._sizeDim])<=Math.round(this._scrollPosition);)t++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(t!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=t,this._lastVisible=i,e&&e.emit&&this._sendVisibilityChangedMessage())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xn(r){return r==="match-gap"?1/0:parseInt(r)}function Jn(r){return r==="auto"?1/0:parseInt(r)}function eo(r){return r==="horizontal"?"column":"row"}function Ms(r){return r==="horizontal"?"row":"column"}function to(r){return r==="horizontal"?["left","right"]:["top","bottom"]}function io(r){return r==="horizontal"?["top","bottom"]:["left","right"]}class ao extends Ts{constructor(){super(...arguments),this._itemSize={},this._gaps={},this._padding={}}_getDefaultConfig(){return Object.assign({},super._getDefaultConfig(),{itemSize:{width:"300px",height:"300px"},gap:"8px",padding:"match-gap"})}get _gap(){return this._gaps.row}get _idealSize(){return this._itemSize[jt(this.direction)]}get _idealSize1(){return this._itemSize[jt(this.direction)]}get _idealSize2(){return this._itemSize[Is(this.direction)]}get _gap1(){return this._gaps[eo(this.direction)]}get _gap2(){return this._gaps[Ms(this.direction)]}get _padding1(){const e=this._padding,[t,i]=to(this.direction);return[e[t],e[i]]}get _padding2(){const e=this._padding,[t,i]=io(this.direction);return[e[t],e[i]]}set itemSize(e){const t=this._itemSize;typeof e=="string"&&(e={width:e,height:e});const i=parseInt(e.width),a=parseInt(e.height);i!==t.width&&(t.width=i,this._triggerReflow()),a!==t.height&&(t.height=a,this._triggerReflow())}set gap(e){this._setGap(e)}_setGap(e){const t=e.split(" ").map(a=>Jn(a)),i=this._gaps;t[0]!==i.row&&(i.row=t[0],this._triggerReflow()),t[1]===void 0?t[0]!==i.column&&(i.column=t[0],this._triggerReflow()):t[1]!==i.column&&(i.column=t[1],this._triggerReflow())}set padding(e){const t=this._padding,i=e.split(" ").map(a=>Xn(a));i.length===1?(t.top=t.right=t.bottom=t.left=i[0],this._triggerReflow()):i.length===2?(t.top=t.bottom=i[0],t.right=t.left=i[1],this._triggerReflow()):i.length===3?(t.top=i[0],t.right=t.left=i[1],t.bottom=i[2],this._triggerReflow()):i.length===4&&(["top","right","bottom","left"].forEach((a,s)=>t[a]=i[s]),this._triggerReflow())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class so extends ao{constructor(){super(...arguments),this._metrics=null,this.flex=null,this.justify=null}_getDefaultConfig(){return Object.assign({},super._getDefaultConfig(),{flex:!1,justify:"start"})}set gap(e){super._setGap(e)}_updateLayout(){const e=this.justify,[t,i]=this._padding1,[a,s]=this._padding2;["_gap1","_gap2"].forEach(d=>{const h=this[d];if(h===1/0&&!["space-between","space-around","space-evenly"].includes(e))throw new Error("grid layout: gap can only be set to 'auto' when justify is set to 'space-between', 'space-around' or 'space-evenly'");if(h===1/0&&d==="_gap2")throw new Error(`grid layout: ${Ms(this.direction)}-gap cannot be set to 'auto' when direction is set to ${this.direction}`)});const n=this.flex||["start","center","end"].includes(e),l={rolumns:-1,itemSize1:-1,itemSize2:-1,gap1:this._gap1===1/0?-1:this._gap1,gap2:n?this._gap2:0,padding1:{start:t===1/0?this._gap1:t,end:i===1/0?this._gap1:i},padding2:n?{start:a===1/0?this._gap2:a,end:s===1/0?this._gap2:s}:{start:0,end:0},positions:[]},c=this._viewDim2-l.padding2.start-l.padding2.end;if(c<=0)l.rolumns=0;else{const d=n?l.gap2:0;let h=0,u=0;if(c>=this._idealSize2&&(h=Math.floor((c-this._idealSize2)/(this._idealSize2+d))+1,u=h*this._idealSize2+(h-1)*d),this.flex)switch((c-u)/(this._idealSize2+d)>=.5&&(h=h+1),l.rolumns=h,l.itemSize2=Math.round((c-d*(h-1))/h),this.flex===!0?"area":this.flex.preserve){case"aspect-ratio":l.itemSize1=Math.round(this._idealSize1/this._idealSize2*l.itemSize2);break;case jt(this.direction):l.itemSize1=Math.round(this._idealSize1);break;default:l.itemSize1=Math.round(this._idealSize1*this._idealSize2/l.itemSize2)}else l.itemSize1=this._idealSize1,l.itemSize2=this._idealSize2,l.rolumns=h;let m;if(n){const f=l.rolumns*l.itemSize2+(l.rolumns-1)*l.gap2;m=this.flex||e==="start"?l.padding2.start:e==="end"?this._viewDim2-l.padding2.end-f:Math.round(this._viewDim2/2-f/2)}else{const f=c-l.rolumns*l.itemSize2;e==="space-between"?(l.gap2=Math.round(f/(l.rolumns-1)),m=0):e==="space-around"?(l.gap2=Math.round(f/l.rolumns),m=Math.round(l.gap2/2)):(l.gap2=Math.round(f/(l.rolumns+1)),m=l.gap2),this._gap1===1/0&&(l.gap1=l.gap2,t===1/0&&(l.padding1.start=m),i===1/0&&(l.padding1.end=m))}for(let f=0;f<l.rolumns;f++)l.positions.push(m),m+=l.itemSize2+l.gap2}this._metrics=l}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ro extends so{get _delta(){return this._metrics.itemSize1+this._metrics.gap1}_getItemSize(e){return{[this._sizeDim]:this._metrics.itemSize1,[this._secondarySizeDim]:this._metrics.itemSize2}}_getActiveItems(){const e=this._metrics,{rolumns:t}=e;if(t===0)this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;else{const{padding1:i}=e,a=Math.max(0,this._scrollPosition-this._overhang),s=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang),n=Math.max(0,Math.floor((a-i.start)/this._delta)),l=Math.max(0,Math.ceil((s-i.start)/this._delta));this._first=n*t,this._last=Math.min(l*t-1,this.items.length-1),this._physicalMin=i.start+this._delta*n,this._physicalMax=i.start+this._delta*l}}_getItemPosition(e){const{rolumns:t,padding1:i,positions:a,itemSize1:s,itemSize2:n}=this._metrics;return{[this._positionDim]:i.start+Math.floor(e/t)*this._delta,[this._secondaryPositionDim]:a[e%t],[jt(this.direction)]:s,[Is(this.direction)]:n}}_updateScrollSize(){const{rolumns:e,gap1:t,padding1:i,itemSize1:a}=this._metrics;let s=1;if(e>0){const n=Math.ceil(this.items.length/e);s=i.start+n*a+(n-1)*t+i.end}this._scrollSize=s}}class no extends ro{constructor(e,t){super(e,t),this._columns=t?.columns||4,this.flex={preserve:"aspect-ratio"},this.justify="start";const i=t?.itemSize?.width||150,a=t?.itemSize?.height||195,s=parseInt(i)||150,n=parseInt(a)||195;this._aspectRatio=n/s,this._extraHeight=n-s}set columns(e){e!==this._columns&&(this._columns=e,this._triggerReflow())}get columns(){return this._columns}set itemSize(e){if(super.itemSize=e,e){const t=parseInt(e.width)||150,i=parseInt(e.height)||195;this._aspectRatio=i/t,this._extraHeight=i-t}}_updateLayout(){const e=this.justify,[t,i]=this._padding2,a=this.flex||["start","center","end"].includes(e),s=t===1/0?this._gap2:t,n=i===1/0?this._gap2:i,l=this._viewDim2-s-n;if(l>0){const c=a?this._gap2:0,d=(l-(this._columns-1)*c)/this._columns;if(this.direction!=="horizontal"){const h=Math.max(10,Math.floor(d));this._itemSize.width=h,this._itemSize.height=Math.max(10,Math.floor(h+this._extraHeight))}else{const h=Math.max(10,Math.floor(d));this._itemSize.height=h,this._itemSize.width=Math.max(10,Math.floor(h-this._extraHeight))}}super._updateLayout()}}const oo=r=>Object.assign({type:no},r);var lo={common:{not_found:"Entity not found.",search:"Search",power:"Power",favorite:"Favorite",loading:"Loading...",no_results:"No results.",close:"Close",vol_up:"Volume Up",vol_down:"Volume Down",media_player:"Media Player",edit_entity:"Edit Entity Settings",edit_action:"Edit Action Settings",mute:"Mute",unmute:"Unmute",seek:"Seek",volume:"Volume",play_now:"Play Now",more_options:"More Options",unavailable:"Unavailable",back:"Back",cancel:"Cancel",reset_default:"Reset to default",unpin:"Unpin",clear:"Clear",album_art:"Album Art"},editor:{tabs:{entities:"Entities",behavior:"Behavior",look_and_feel:"Look and Feel",artwork:"Artwork",actions:"Actions"},template_label:"Card Template",templates:{custom:{label:"Custom (Original Config)",description:"Your original, fully customized configuration."},large_modern:{label:"Big Ol' Modern YAMP",description:"A slightly larger modern design with adaptive controls."},crisp_clean:{label:"Clean",description:"A clean layout with scaled artwork and modern controls."},minimal_mini:{label:"MINImal",description:"A compact card with no artwork."},normal_mini:{label:"Mini Mode",description:"The standard compact card."},quick_and_easy:{label:"No Time To Explain",description:"Used for speed with persistent chip rows and quick grouping."},dedicated_search:{label:"All About That Search",description:"A standalone search card without the main media player."},dedicated_grouping:{label:"Group Therapy",description:"A standalone player grouping card. Requires multiple entities configured."},huge_yamp:{label:"That's a Huge YAMP!",description:"Maximized controls, large text, and a massive progress bar for across room viewing."}},placeholders:{search:"Search music..."},sections:{artwork:{general:{title:"General Settings",description:"Global controls for how artwork is displayed and retrieved."},idle:{title:"Idle Artwork",description:"Show a static image or entity snapshot whenever nothing is playing."},overrides:{title:"Artwork Overrides",description:"Overrides are evaluated from top to bottom. Drag to reorder."}},entities:{title:"Entities*",description:"Add the media players you want to control. Drag entities to reorder the chip row."},behavior:{idle_chips:{title:"Idle & Chips",description:"Choose when the card goes idle and how entity chips behave."},interactions_search:{title:"Interactions & Search",description:"Fine-tune how entities are pinned and how many results show at once."},lyrics:{title:"Lyrics",description:"Configure how lyrics are displayed and when they appear."}},look_and_feel:{theme_layout:{title:"Theme & Layout",description:"Match dashboard styling and control the overall footprint."},controls_typography:{title:"Controls & Typography",description:"Tune button sizing, entity labels, and adaptive text."},collapsed_idle:{title:"Collapsed & Idle States",description:"Control when the card collapses and which views show while idle."}},actions:{title:"Actions",description:"Build the action chips that appear in the card or its menu. Drag to reorder, click the pencil to configure each action."}},subtitles:{idle_timeout:"Time in milliseconds before the card enters idle mode. Set to 0 to disable idle behavior.",show_chip_row:'"Auto" hides the chip row when only one entity is configured. "In Menu" moves the chips into the menu overlay. "In Menu on Idle" shows chips inline when active but moves them to the menu when idle.',dim_chips:"When the card enters idle mode with an image, dim the entity and action chips for a cleaner look.",hold_to_pin:"Long press on entity chips instead of short press to pin them, preventing auto-switching during playback.",always_show_group:"Quick grouping controls (+/-/star) will be visible by default on page load. You can still toggle it manually via double-tap.",disable_autofocus:"Keep the search box from stealing focus so on-screen keyboards stay hidden.",search_within_filter:"Enable this to search within the current active filter (Favorites, Recently Played, etc) instead of clearing it.",close_search_on_play:"Automatically close the search screen when a track is played.",pin_search_headers:"Keep search input and filters fixed at the top while scrolling results.",hide_search_headers_on_idle:"Hide search input and filters when the player is idle.",disable_mass:"Disable the optional Mass Queue integration even if it is installed.",swap_pause_stop:"Replace the pause button with stop while using the modern layout.",adaptive_controls:"Let the playback buttons grow or shrink to fit the available space.",hide_menu_player:"When chips live in the menu, hide the entity label at the bottom of the card.",adaptive_text:"Choose which text groups should scale with available space (leave empty to disable adaptive text).",collapse_expand:"Always Collapsed creates mini player mode. Expand on Search temporarily expands when searching.",idle_screen:"Choose which screen to display automatically when the card becomes idle.",hide_controls:"Select which controls to hide for this entity (all are shown by default)",hide_search_chips:"Hide specific search filter chips for this entity",hide_active_entity_on_idle:"Hide the entity label at the bottom of the card only when the player is idle.",follow_active_entity:"When enabled, the volume entity will automatically follow the active playback entity. Note: This overrides the selected volume entity.",search_limit_full:"Maximum number of search results to display (default: 20)",default_search_filter_full:"Choose which filter is active by default when the search screen opens.",default_search_favorites:"Start search with favorites active",result_sorting_full:"Choose how results are ordered.",card_height_full:"Leave blank for automatic height",control_layout_full:"Choose between the legacy evenly sized controls or the modern Home Assistant layout.",artwork_extend:"Let the artwork background continue underneath the chip and action rows.",artwork_extend_label:"Extend artwork",no_artwork_overrides:"No artwork overrides configured. Use the plus button below to add one.",entity_current_hint:"Use 'entity_id: current' to target the card's currently selected media player entity. Note: The 'Test Action' button will be disabled when using this feature.",service_data_note:"Changes to the service data below are not committed to the config until the 'Save Service Data' button is clicked!",jinja_template_hint:"Enter a Jinja template that resolves to a single entity_id. Example switching MA based on a source selector:",jinja_template_vol_hint:"Enter a Jinja template that resolves to an entity_id (e.g. media_player.office_homepod or remote.soundbar). Example switching volume entity based on a boolean:",not_available_alt_collapsed:"Not available with Alternate Progress Bar or Always Collapsed mode",not_available_collapsed:"Not available when Always Collapsed is enabled",only_available_collapsed:"Only available when Always Collapsed is enabled",only_available_modern:"Only available with Modern layout",image_url_helper:"Enter a direct URL to an image or a local file path",selected_entity_helper:"Input text helper that will be updated with the currently selected media player entity ID.",select_entity_helper:"Input text helper to read the entity ID from. The card will automatically select the matching chip.",sync_entity_type:"Choose which entity ID to sync to the helper (defaults to Music Assistant entity if configured).",disable_auto_select:"Prevent this entity's chip from automatically being selected when it starts playing.",search_view:"Choose between a standard list or a card-based grid for search results.",search_card_columns:"Specify how many columns to use in the card view. Artwork will scale automatically.",card_type:"Choose the card mode. 'Default' is the standard media player. 'Dedicated Search' makes the card a permanent search interface.",always_show_lyrics:"Automatically open the lyrics view when the page is refreshed.",lyrics_source:"Music Assistant requires the mass_queue integration to fetch lyrics from its internal metadata engine.",lyrics_pre_roll:"Shift the lyrics highlight timing. Positive values speed it up, negative values slow it down (default: 0).",blurred_artwork:"Always blur the background artwork",hide_collapsed_artwork:"Hide the smaller artwork on the right when the card is collapsed",show_idle_artwork_when_not_playing:"When enabled, selecting a chip that is not currently playing will display the configured idle image instead of the active playback artwork.",prefer_ma_metadata:"Always use the paired Music Assistant entity for track title, artist, and artwork, even if the primary entity is playing.",show_volume_overlay:"Briefly display a large volume indicator over the artwork when the volume level changes."},titles:{edit_entity:"Edit Entity",edit_action:"Edit Action",service_data:"Service Data",add_artwork_override:"Add Artwork Override"},labels:{dim_chips:"Dim Chips on Idle",hold_to_pin:"Hold to Pin",always_show_group:"Quick Group by Default",disable_autofocus:"Disable Search Autofocus",keep_filters:"Keep Filters on Search",dismiss_on_play:"Dismiss search on play",pin_headers:"Pin search headers",hide_search_headers_on_idle:"Hide search headers on idle",default_search_filter:"Default Search Filter",default_search_favorites:"Default to Favorites Filter",disable_mass:"Disable Mass Queue",match_theme:"Match Theme",alt_progress:"Alternate Progress Bar",progress_bar_height:"Progress Bar Height",display_timestamps:"Display Timestamps",swap_pause_stop:"Swap Pause with Stop",adaptive_controls:"Adaptive Control Size",hide_active_entity:"Hide Active Entity Label",hide_active_entity_on_idle:"Hide Active Entity Label on Idle",collapse_on_idle:"Collapse on Idle",hide_menu_player_toggle:"Hide Menu Player",always_collapsed:"Always Collapsed",expand_on_search:"Expand on Search",script_var:"Script Variable (yamp_entity)",use_ma_template:"Use template for Music Assistant Entity",use_vol_template:"Use template for Volume Entity",follow_active_entity:"Volume Entity Follows Active Entity",use_url_path:"Use URL or Path",adaptive_text_elements:"Adaptive Text Size Elements",disable_auto_select:"Disable Auto-Select",always_show_lyrics:"Always Show Lyrics",lyrics_mode:"Lyrics Mode",lyrics_source:"Lyrics Source",lyrics_pre_roll:"Lyrics Pre-Roll (seconds)",blurred_artwork:"Blurred Artwork",hide_collapsed_artwork:"Hide Collapsed Artwork",show_idle_artwork_when_not_playing:"Show Idle Image When Not Playing",prefer_ma_metadata:"Prefer Music Assistant Metadata",show_volume_overlay:"Show Volume Overlay"},fields:{artwork_fit:"Artwork Fit",artwork_position:"Artwork Position",artwork_hostname:"Artwork Hostname",match_field:"Match Field",match_value:"Match Value",size_percent:"Size (%)",object_fit:"Object Fit",idle_timeout:"Idle Timeout (ms)",show_chip_row:"Show Chip Row",search_limit:"Search Results Limit",result_sorting:"Result Sorting",vol_step:"Volume Step (0.05 = 5%)",card_height:"Card Height (px)",control_layout:"Control Layout",save_service_data:"Save Service Data",image_url:"Image URL",fallback_image_url:"Fallback Image URL",move_to_main:"Move action to main chips",move_to_menu:"Move action into menu",delete_action:"Delete Action",revert_service_data:"Revert to Saved Service Data",test_action:"Test Action",volume_mode:"Volume Mode",idle_screen:"Idle Screen",name:"Name",hidden_controls:"Hidden Controls",ma_template:"Music Assistant Entity Template (Jinja)",hidden_chips:"Hidden Search Filter Chips",vol_template:"Volume Entity Template (Jinja)",icon:"Icon",action_type:"Action Type",menu_item:"Menu Item",nav_path:"Navigation Path",service:"Service",service_data:"Service Data",idle_image_entity:"Idle Image Entity",match_entity:"Match Entity",ma_entity:"Music Assistant Entity",vol_entity:"Volume Entity",selected_entity_helper:"Selected Entity Helper",sync_entity_type:"Sync Entity Type",placement:"Placement",card_trigger:"Card Trigger",search_view:"Search Result View",search_card_columns:"Card Columns",card_type:"Card Type",appearance:"Appearance",no_artwork_option:"No Artwork",details_alignment:"Details Alignment"},action_types:{menu:"Open a Card Menu Item",service:"Call a Service",navigate:"Navigate",prev_entity:"Previous Entity Chip",next_entity:"Next Entity Chip",sync_selected_entity:"Sync Selected Entity",select_entity:"Select Entity from Helper",toggle_lyrics:"Toggle Lyrics Overlay"},action_helpers:{sync_selected_entity:"Sync Selected Entity \u2192",select_entity:"Select Entity \u2190",select_helper:"(select helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Music Assistant Entity if configured)",yamp_main_entity:"yamp_main_entity (Main Media Player Entity)",yamp_playback_entity:"yamp_playback_entity (Current Active Playback Entity)"},placements:{chip:"Action Chip",menu:"In Menu",hidden:"Hidden (Artwork Tap)",not_triggerable:"Not Triggerable"},triggers:{none:"None",tap:"Tap",hold:"Hold",double_tap:"Double Tap",swipe_left:"Swipe Left",swipe_right:"Swipe Right"},search_view_options:{list:"List",card:"Card",card_minimal:"Minimal Card"},card_type_options:{default:"Default",search:"Search",group_players:"Group Players"},appearance_options:{automatic:"Automatic",light:"Light",dark:"Dark"},artwork_fit:{default:"Default",cover:"Cover (default)",contain:"Contain",fill:"Fill","scale-down":"Scale Down","scaled-contain":"Scaled Contain","scaled-contain-alternate":"Scaled Contain Alternate",none:"None"}},card:{sections:{details:"Now Playing Details",menu:"Menu & Search Sheets",action_chips:"Action Chips"},media_controls:{shuffle:"Shuffle",previous:"Previous",play_pause:"Play/Pause",stop:"Stop",next:"Next",repeat:"Repeat"},menu:{more_info:"More Info",search:"Search",source:"Source",show_lyrics:"Show Lyrics",hide_lyrics:"Hide Lyrics",transfer_queue:"Transfer Queue",group_players:"Group Players",select_entity:"Select Entity for More Info",transfer_to:"Transfer Queue To",no_players:"No other Music Assistant players available."},grouping:{title:"Group Players",sync_volume:"Sync Volume",group_all:"Group All",ungroup_all:"Ungroup All",unavailable:"Player is unavailable",no_players:"No other group-capable players available.",master:"Master",joined:"Joined",available:"Available",current:"Current",unjoin_from:"Unjoin from {master}",join_with:"Join with {master}"}},search:{favorites:"Favorites",recently_played:"Recently Played",next_up:"Next Up",recommendations:"Recommendations",radio_mode:"Radio Mode",show_track_options:"Show track options",play_similar:"Play similar songs",close:"Close Search",no_results:"No results.",play_next:"Play next",replace_play:"Replace existing queue and play now",replace:"Replace queue",add_queue:"Add to the end of the queue",move_up:"Move Up",move_down:"Move Down",move_next:"Move to Next",remove:"Remove from Queue",added:"Added to queue!",added_to_playlist:"Added to playlist!",select_playlist:"Select Playlist for '{track}'",add_to_playlist:"Add to playlist",select_track_for_playlist:"Select the track to add for '{track}' by {artist}",labels:{replace:"Replace",next:"Next",replace_next:"Replace Next",add:"Add",add_to_playlist:"Add to Playlist"},results:"results",result:"result",filters:{all:"All",artist:"Artist",album:"Album",track:"Track",playlist:"Playlist",radio:"Radio",music:"Music",station:"Station",podcast:"Podcast",audiobook:"Audiobook"},search_artist:"Search for this artist",browse_album:"Browse tracks from {album}",play_collection:"Play this collection",play_collection_error:"Unable to play this collection directly",play_item:"Play {item}"},lyrics:{finding:"Finding Lyrics...",none_found:"No lyrics found",not_available:"Lyrics not available",instrumental:"Instrumental Track"},lyrics_sources:{mass_lrclib:"Music Assistant (Fallback to LRCLIB)",mass:"Music Assistant Only",lrclib:"LRCLIB Only",lrclib_mass:"LRCLIB (Fallback to Music Assistant)"},lyrics_modes:{default:"Default (Highlight & Scroll)",scroll:"Scroll Only",text:"Text Only"}},co={common:{not_found:"Entit\xE4t nicht gefunden.",search:"Suchen",power:"Ein/Aus",favorite:"Favorit",loading:"Laden...",no_results:"Keine Ergebnisse.",close:"Schlie\xDFen",vol_up:"Lauter",vol_down:"Leiser",media_player:"Mediaplayer",edit_entity:"Entit\xE4tseinstellungen bearbeiten",edit_action:"Aktionseinstellungen bearbeiten",mute:"Stumm",unmute:"Stummschaltung aufheben",seek:"Suchen",volume:"Lautst\xE4rke",play_now:"Jetzt abspielen",more_options:"Weitere Optionen",unavailable:"Nicht verf\xFCgbar",back:"Zur\xFCck",cancel:"Abbrechen",reset_default:"Auf Standard zur\xFCcksetzen",unpin:"Entpinnen",clear:"L\xF6schen",album_art:"Album-Artwork"},editor:{tabs:{entities:"Entit\xE4ten",behavior:"Verhalten",look_and_feel:"Design",artwork:"Artwork",actions:"Aktionen"},placeholders:{search:"Musik suchen..."},templates:{minimal_mini:{label:"MINImal",description:"Eine kompakte Karte ohne Artwork."},normal_mini:{label:"Mini Mode",description:"Die Standard-Kompaktkarte."}},sections:{artwork:{general:{title:"Allgemeine Einstellungen",description:"Globale Steuerung der Artwork-Anzeige und -Abrufung."},idle:{title:"Artwork im Leerlauf",description:"Zeigt ein statisches Bild oder einen Entit\xE4ts-Schnappschuss an, wenn nichts abgespielt wird."},overrides:{title:"Artwork-\xDCberschreibungen",description:"\xDCberschreibungen werden von oben nach unten ausgewertet. Zum Neusortieren ziehen."}},entities:{title:"Entit\xE4ten*",description:"F\xFCgen Sie die zu steuernden Mediaplayer hinzu. Entit\xE4ten ziehen, um sie neu anzuordnen."},behavior:{idle_chips:{title:"Leerlauf & Chips",description:"W\xE4hlen Sie, wann die Karte in den Leerlauf wechselt und wie sich Entit\xE4ts-Chips verhalten."},interactions_search:{title:"Interaktionen & Suche",description:"Feineinstellung des Anpinnens von Entit\xE4ten und der Anzahl der Suchergebnisse."},lyrics:{title:"Liedtexte",description:"Konfigurieren Sie, wie Liedtexte angezeigt werden und wann sie erscheinen."}},look_and_feel:{theme_layout:{title:"Theme & Layout",description:"Anpassung an das Dashboard-Styling und Kontrolle des Platzbedarfs."},controls_typography:{title:"Steuerung & Typografie",description:"Anpassung von Schaltfl\xE4chengr\xF6\xDFe, Entit\xE4ts-Labels und adaptivem Text."},collapsed_idle:{title:"Eingeklappte & Leerlaufzust\xE4nde",description:"Steuerung der Karteneinklappung und der Ansichten im Leerlauf."}},actions:{title:"Aktionen",description:"Erstellen Sie Aktions-Chips f\xFCr die Karte oder das Men\xFC. Ziehen zum Sortieren, Stift zum Konfigurieren anklicken."}},subtitles:{idle_timeout:"Zeit in Millisekunden vor dem Wechsel in den Leerlaufmodus. 0 zum Deaktivieren.",show_chip_row:'"Auto" blendet die Chip-Leiste bei nur einer Entit\xE4t aus. "Im Men\xFC" verschiebt sie ins Men\xFC. "Im Men\xFC bei Inaktivit\xE4t" zeigt Chips inline wenn aktiv, verschiebt sie aber ins Men\xFC bei Inaktivit\xE4t.',dim_chips:"Entit\xE4ts- und Aktions-Chips im Leerlauf mit Bild abdunkeln f\xFCr einen sauberen Look.",hold_to_pin:"Langes Dr\xFCcken statt kurzem Dr\xFCcken zum Anpinnen, um automatisches Umschalten zu verhindern.",always_show_group:"Schnellgruppierungs-Steuerelemente (+/-/Stern) sind standardm\xE4\xDFig beim Laden der Seite sichtbar. Sie k\xF6nnen sie weiterhin manuell per Doppeltipp umschalten.",disable_autofocus:"Suchfeld-Autofokus deaktivieren, damit Bildschirmtastaturen ausgeblendet bleiben.",search_within_filter:"Innerhalb des aktiven Filters suchen (Favoriten, etc.), anstatt ihn zu l\xF6schen.",close_search_on_play:"Suchbildschirm beim Abspielen automatisch schlie\xDFen.",pin_search_headers:"Sucheingabe und Filter beim Scrollen oben fixieren.",hide_search_headers_on_idle:"Sucheingabe und Filter im Leerlauf ausblenden.",disable_mass:"Optionale Mass Queue Integration deaktivieren, auch wenn sie installiert ist.",swap_pause_stop:"Pause-Taste durch Stop-Taste im modernen Layout ersetzen.",adaptive_controls:"Wiedergabetasten an verf\xFCgbaren Platz anpassen.",hide_menu_player:"Entit\xE4ts-Label unten ausblenden, wenn Chips im Men\xFC sind.",adaptive_text:"Textgruppen w\xE4hlen, die mit dem Platz skalieren (leer lassen zum Deaktivieren).",collapse_expand:"Immer eingeklappt aktiviert den Mini-Player-Modus. Bei Suche ausklappen aktiviert ihn tempor\xE4r.",idle_screen:"W\xE4hlen Sie, welcher Bildschirm im Leerlauf automatisch angezeigt wird.",hide_controls:"W\xE4hlen Sie Steuerelemente aus, die f\xFCr diese Entit\xE4t ausgeblendet werden sollen.",hide_search_chips:"Bestimmte Suchfilter-Chips f\xFCr diese Entit\xE4t ausblenden.",hide_active_entity_on_idle:"Blendet die Entit\xE4tsbeschriftung am unteren Rand der Karte nur aus, wenn der Player im Leerlauf ist.",follow_active_entity:"Lautst\xE4rke-Entit\xE4t folgt automatisch der aktiven Wiedergabe-Entit\xE4t.",search_limit_full:"Maximale Anzahl an Suchergebnissen (Standard: 20).",default_search_filter_full:"W\xE4hlen Sie den Filter, der beim \xD6ffnen der Suche standardm\xE4\xDFig aktiv ist.",default_search_favorites:"Suche mit aktiven Favoriten starten",result_sorting_full:"Sortierung der Suchergebnisse w\xE4hlen. Standard beh\xE4lt die Quellreihenfolge bei.",card_height_full:"Leer lassen f\xFCr automatische H\xF6he.",control_layout_full:"W\xE4hlen Sie zwischen manuellem oder modernem Home Assistant Layout.",artwork_extend:"Artwork-Hintergrund unter die Chip- und Aktionsleisten erweitern.",artwork_extend_label:"Artwork erweitern",no_artwork_overrides:"Keine Artwork-\xDCberschreibungen konfiguriert.",entity_current_hint:"'entity_id: current' verwenden, um den aktuell ausgew\xE4hlten Mediaplayer anzusteuern.",service_data_note:"\xC4nderungen an den Servicedaten werden erst beim Klicken auf 'Servicedaten speichern' \xFCbernommen!",jinja_template_hint:"Jinja-Template eingeben, das eine entity_id ergibt.",jinja_template_vol_hint:"Jinja-Template eingeben, das eine Lautst\xE4rke-entity_id ergibt.",not_available_alt_collapsed:"Nicht verf\xFCgbar mit alternativem Fortschrittsbalken oder im Modus 'Immer eingeklappt'.",not_available_collapsed:"Nicht verf\xFCgbar, wenn 'Immer eingeklappt' aktiviert ist.",only_available_collapsed:"Nur verf\xFCgbar, wenn 'Immer eingeklappt' aktiviert ist.",only_available_modern:"Nur verf\xFCgbar im modernen Layout.",image_url_helper:"Direkte Bild-URL oder lokalen Dateipfad eingeben.",selected_entity_helper:"Input-Text-Helper, der mit der aktuell ausgew\xE4hlten Mediaplayer-Entit\xE4ts-ID aktualisiert wird.",select_entity_helper:"Input-Text-Helper, aus dem die Entit\xE4ts-ID gelesen wird. Die Karte w\xE4hlt automatisch den passenden Chip aus.",sync_entity_type:"W\xE4hlen Sie, welche Entit\xE4ts-ID mit dem Helper synchronisiert werden soll (Standard: Music Assistant Entit\xE4t, falls konfiguriert).",disable_auto_select:"Verhindert, dass der Chip dieser Entit\xE4t automatisch ausgew\xE4hlt wird, wenn die Wiedergabe startet.",search_view:"W\xE4hlen Sie zwischen einer Standardliste oder einem kartenbasierten Raster f\xFCr Suchergebnisse.",search_card_columns:"Geben Sie an, wie viele Spalten in der Kartenansicht verwendet werden sollen. Das Artwork wird automatisch skaliert.",card_type:"W\xE4hlen Sie den Kartenmodus. 'Standard' ist der normale Mediaplayer. 'Dedizierte Suche' macht die Karte zu einer permanenten Suchoberfl\xE4che.",always_show_lyrics:"Liedtextansicht bei Seitenaktualisierung automatisch \xF6ffnen.",lyrics_source:"Music Assistant ben\xF6tigt die mass_queue-Integration, um Liedtexte von seiner internen Metadaten-Engine abzurufen.",lyrics_pre_roll:"Passen Sie das Timing der Songtext-Hervorhebung an. Positive Werte beschleunigen sie, negative verz\xF6gern sie (Standard: 0).",blurred_artwork:"Hintergrundbild immer weichzeichnen",hide_collapsed_artwork:"Das kleine Artwork auf der rechten Seite ausblenden, wenn die Karte eingeklappt ist",show_idle_artwork_when_not_playing:"Wenn aktiviert, wird beim Ausw\xE4hlen eines Chips, auf dem derzeit nichts abgespielt wird, das konfigurierte Ruhebild anstelle des aktiven Wiedergabe-Artworks angezeigt.",prefer_ma_metadata:"Verwenden Sie immer die gekoppelte Music Assistant-Entit\xE4t f\xFCr Titel, K\xFCnstler und Artwork, auch wenn die prim\xE4re Entit\xE4t gerade spielt.",show_volume_overlay:"Zeige kurz eine gro\xDFe Lautst\xE4rkeanzeige \xFCber dem Cover an, wenn sich die Lautst\xE4rke \xE4ndert."},titles:{edit_entity:"Entit\xE4t bearbeiten",edit_action:"Aktion bearbeiten",service_data:"Servicedaten",add_artwork_override:"Artwork-\xDCberschreibung hinzuf\xFCgen"},labels:{dim_chips:"Chips im Leerlauf abdunkeln",hold_to_pin:"Gedr\xFCckt halten zum Anpinnen",always_show_group:"Schnellgruppierung standardm\xE4\xDFig aktivieren",disable_autofocus:"Such-Autofocus deaktivieren",keep_filters:"Filter bei Suche beibehalten",dismiss_on_play:"Suche beim Abspielen beenden",pin_headers:"Such-Header fixieren",hide_search_headers_on_idle:"Such-Header im Leerlauf ausblenden",default_search_filter:"Standard-Suchfilter",default_search_favorites:"Standardm\xE4\xDFig Favoritenfilter verwenden",disable_mass:"Mass Queue deaktivieren",match_theme:"Theme anpassen",alt_progress:"Alternativer Fortschrittsbalken",progress_bar_height:"Fortschrittsbalkenh\xF6he",display_timestamps:"Zeitstempel anzeigen",swap_pause_stop:"Pause durch Stop ersetzen",adaptive_controls:"Adaptive Tastengr\xF6\xDFe",hide_active_entity:"Aktives Entit\xE4ts-Label ausblenden",hide_active_entity_on_idle:"Aktive Entit\xE4tsbeschriftung im Leerlauf ausblenden",collapse_on_idle:"Bei Leerlauf einklappen",hide_menu_player_toggle:"Men\xFC-Player ausblenden",always_collapsed:"Immer eingeklappt",expand_on_search:"Bei Suche ausklappen",script_var:"Skript-Variable (yamp_entity)",use_ma_template:"Template f\xFCr Music Assistant Entit\xE4t verwenden",use_vol_template:"Template f\xFCr Lautst\xE4rke-Entit\xE4t verwenden",follow_active_entity:"Lautst\xE4rke folgt aktiver Entit\xE4t",use_url_path:"URL oder Pfad verwenden",adaptive_text_elements:"Elemente f\xFCr adaptive Textgr\xF6\xDFe",disable_auto_select:"Auto-Auswahl deaktivieren",always_show_lyrics:"Liedtexte immer anzeigen",lyrics_mode:"Liedtext-Modus",lyrics_source:"Liedtext-Quelle",lyrics_pre_roll:"Liedtext Pre-Roll (Sekunden)",blurred_artwork:"Verschwommenes Artwork",hide_collapsed_artwork:"Verkleinertes Artwork ausblenden",show_idle_artwork_when_not_playing:"Ruhebild anzeigen, wenn nicht abgespielt wird",prefer_ma_metadata:"Music Assistant Metadaten bevorzugen",show_volume_overlay:"Lautst\xE4rke-Overlay anzeigen"},fields:{artwork_fit:"Artwork-Anpassung",artwork_position:"Artwork-Position",artwork_hostname:"Artwork-Hostname",match_field:"Match-Feld",match_value:"Match-Wert",size_percent:"Gr\xF6\xDFe (%)",object_fit:"Object-Fit",idle_timeout:"Leerlauf-Timeout (ms)",show_chip_row:"Chip-Leiste anzeigen",search_limit:"Suchlimit",result_sorting:"Ergebnissortierung",vol_step:"Lautst\xE4rke-Schritt (0.05 = 5%)",card_height:"Kartenh\xF6he (px)",control_layout:"Steuerungs-Layout",save_service_data:"Servicedaten speichern",image_url:"Bild-URL",fallback_image_url:"Fallback Bild-URL",move_to_main:"Aktion in Haupt-Chips verschieben",move_to_menu:"Aktion ins Men\xFC verschieben",delete_action:"Aktion l\xF6schen",revert_service_data:"Auf gespeicherte Servicedaten zur\xFCcksetzen",test_action:"Aktion testen",volume_mode:"Lautst\xE4rke-Modus",idle_screen:"Leerlauf-Bildschirm",name:"Name",hidden_controls:"Ausgeblendete Steuerungen",ma_template:"Music Assistant Entit\xE4ts-Template (Jinja)",hidden_chips:"Ausgeblendete Suchfilter-Chips",vol_template:"Lautst\xE4rke-Entit\xE4ts-Template (Jinja)",icon:"Icon",action_type:"Aktionstyp",menu_item:"Men\xFCpunkt",nav_path:"Navigationspfad",service:"Dienst",service_data:"Servicedaten",idle_image_entity:"Leerlauf-Bild-Entit\xE4t",match_entity:"Match-Entit\xE4t",ma_entity:"Music Assistant Entit\xE4t",vol_entity:"Lautst\xE4rke-Entit\xE4t",selected_entity_helper:"Ausgew\xE4hlter Entit\xE4ts-Helper",sync_entity_type:"Synchronisierungs-Entit\xE4tstyp",placement:"Platzierung",card_trigger:"Karten-Trigger",search_view:"Suchergebnis-Ansicht",search_card_columns:"Spaltenanzahl",card_type:"Kartentyp",appearance:"Erscheinungsbild",no_artwork_option:"Kein Artwork",details_alignment:"Detail-Ausrichtung"},action_types:{menu:"Kartenmen\xFCpunkt \xF6ffnen",service:"Dienst aufrufen",navigate:"Navigieren",prev_entity:"Vorheriger Entit\xE4ts-Chip",next_entity:"N\xE4chster Entit\xE4ts-Chip",sync_selected_entity:"Ausgew\xE4hlte Entit\xE4t synchronisieren",select_entity:"Entit\xE4t aus Helper ausw\xE4hlen",toggle_lyrics:"Liedtext-Overlay ein-/ausschalten"},action_helpers:{sync_selected_entity:"Entit\xE4t synchronisieren \u2192",select_entity:"Entit\xE4t ausw\xE4hlen \u2190",select_helper:"(Helper ausw\xE4hlen)"},sync_entity_options:{yamp_entity:"yamp_entity (Music Assistant Entit\xE4t, falls konfiguriert)",yamp_main_entity:"yamp_main_entity (Haupt-Mediaplayer-Entit\xE4t)",yamp_playback_entity:"yamp_playback_entity (Aktuelle aktive Wiedergabe-Entit\xE4t)"},placements:{chip:"Aktions-Chip",menu:"Im Men\xFC",hidden:"Ausgeblendet (Artwork-Tippen)",not_triggerable:"Nicht triggerbar"},triggers:{none:"Keiner",tap:"Tippen",hold:"Halten",double_tap:"Doppeltippen",swipe_left:"Nach links wischen",swipe_right:"Nach rechts wischen"},search_view_options:{list:"Liste",card:"Karte",card_minimal:"Minimal-Karte"},card_type_options:{default:"Standard",search:"Suche",group_players:"Player gruppieren"},appearance_options:{automatic:"Automatisch",light:"Hell",dark:"Dunkel"},artwork_fit:{default:"Standard",cover:"Cover (Standard)",contain:"Einpassen",fill:"F\xFCllen","scale-down":"Verkleinern","scaled-contain":"Skaliertes Einpassen","scaled-contain-alternate":"Skaliertes Einpassen (Alternativ)",none:"Keine"}},card:{sections:{details:"Details zur Wiedergabe",menu:"Men\xFC & Suchbl\xE4tter",action_chips:"Aktions-Chips"},media_controls:{shuffle:"Zufall",previous:"Zur\xFCck",play_pause:"Play/Pause",stop:"Stop",next:"Weiter",repeat:"Wiederholen"},menu:{more_info:"Mehr Info",search:"Suche",source:"Quelle",show_lyrics:"Songtext anzeigen",hide_lyrics:"Songtext ausblenden",transfer_queue:"Warteschlange \xFCbertragen",group_players:"Player gruppieren",select_entity:"Entit\xE4t f\xFCr mehr Info w\xE4hlen",transfer_to:"Warteschlange \xFCbertragen zu",no_players:"Keine anderen Music Assistant Player verf\xFCgbar."},grouping:{title:"Player gruppieren",sync_volume:"Lautst\xE4rke synchronisieren",group_all:"Alle gruppieren",ungroup_all:"Alle trennen",unavailable:"Player ist nicht verf\xFCgbar",no_players:"Keine anderen gruppierungsf\xE4higen Player verf\xFCgbar.",master:"Master",joined:"Verbunden",available:"Verf\xFCgbar",current:"Aktuell",unjoin_from:"Von {master} trennen",join_with:"Mit {master} gruppieren"}},search:{favorites:"Favoriten",recently_played:"Zuletzt geh\xF6rt",next_up:"Als N\xE4chstes",recommendations:"Empfehlungen",radio_mode:"Radiomodus",show_track_options:"Titeloptionen anzeigen",play_similar:"\xC4hnliche Lieder abspielen",close:"Suche schlie\xDFen",no_results:"Keine Ergebnisse.",play_next:"Als N\xE4chstes spielen",replace_play:"Warteschlange ersetzen und jetzt spielen",replace:"Warteschlange ersetzen",add_queue:"Am Ende der Warteschlange hinzuf\xFCgen",move_up:"Nach oben",move_down:"Nach unten",move_next:"Als N\xE4chstes verschieben",remove:"Aus Warteschlange entfernen",added:"Zur Warteschlange hinzugef\xFCgt!",added_to_playlist:"Zur Playlist hinzugef\xFCgt!",select_playlist:"Playlist f\xFCr '{track}' ausw\xE4hlen",add_to_playlist:"Zur Playlist hinzuf\xFCgen",select_track_for_playlist:"Titel zum Hinzuf\xFCgen f\xFCr '{track}' von {artist} ausw\xE4hlen",labels:{replace:"Ersetzen",next:"Weiter",replace_next:"Weiter ersetzen",add:"Hinzuf\xFCgen",add_to_playlist:"Zur Playlist hinzuf\xFCgen"},results:"Ergebnisse",result:"Ergebnis",filters:{all:"Alle",artist:"K\xFCnstler",album:"Album",track:"Titel",playlist:"Playlist",radio:"Radio",music:"Musik",station:"Station",podcast:"Podcast",audiobook:"H\xF6rbuch"},search_artist:"Nach diesem K\xFCnstler suchen",browse_album:"Albentitel von {album} durchsuchen",play_collection:"Diese Sammlung abspielen",play_collection_error:"Diese Sammlung kann nicht direkt abgespielt werden",play_item:"{item} abspielen"},lyrics:{finding:"Suche Songtext...",none_found:"Kein Songtext gefunden",not_available:"Songtext nicht verf\xFCgbar",instrumental:"Instrumental-Titel"},lyrics_sources:{mass_lrclib:"Music Assistant (Fallback zu LRCLIB)",mass:"Nur Music Assistant",lrclib:"Nur LRCLIB",lrclib_mass:"LRCLIB (Fallback zu Music Assistant)"},lyrics_modes:{default:"Standard (Hervorheben & Scrollen)",scroll:"Nur Scrollen",text:"Nur Text"}},uo={common:{not_found:"Entidad no encontrada.",search:"Buscar",power:"Encender/Apagar",favorite:"Favorito",loading:"Cargando...",no_results:"Sin resultados.",close:"Cerrar",vol_up:"Subir volumen",vol_down:"Bajar volumen",media_player:"Reproductor multimedia",edit_entity:"Editar ajustes de entidad",edit_action:"Editar ajustes de acci\xF3n",mute:"Silenciar",unmute:"Activar sonido",seek:"Buscar",volume:"Volumen",play_now:"Reproducir ahora",more_options:"M\xE1s opciones",unavailable:"No disponible",back:"Atr\xE1s",cancel:"Cancelar",reset_default:"Restablecer valores",unpin:"Desanclar",clear:"Limpiar",album_art:"Portada del \xE1lbum"},editor:{tabs:{entities:"Entidades",behavior:"Comportamiento",look_and_feel:"Apariencia",artwork:"Portada",actions:"Acciones"},placeholders:{search:"Buscar m\xFAsica..."},templates:{minimal_mini:{label:"MINImal",description:"Una tarjeta compacta sin car\xE1tula."},normal_mini:{label:"Mini Mode",description:"La tarjeta compacta est\xE1ndar."}},sections:{artwork:{general:{title:"Ajustes generales",description:"Controles globales para la portada."},idle:{title:"Portada en reposo",description:"Mostrar imagen est\xE1tica cuando nada se reproduce."},overrides:{title:"Reemplazos de portada",description:"Los reemplazos se eval\xFAan de arriba a abajo. Arrastre para reordenar."}},entities:{title:"Entidades*",description:"A\xF1ada los reproductores multimedia. Arrastre para reordenar."},behavior:{idle_chips:{title:"Reposo y chips",description:"Elija cu\xE1ndo pasa a reposo y el comportamiento de los chips."},interactions_search:{title:"Interacciones y b\xFAsqueda",description:"Ajuste el fijado de entidades y l\xEDmite de resultados."},lyrics:{title:"Letras",description:"Configure c\xF3mo se muestran las letras y cu\xE1ndo aparecen."}},look_and_feel:{theme_layout:{title:"Tema y dise\xF1o",description:"Combine con el estilo de su dashboard."},controls_typography:{title:"Controles y tipograf\xEDa",description:"Ajuste tama\xF1o de botones y etiquetas."},collapsed_idle:{title:"Estados de reposo y contra\xEDdo",description:"Controle el contra\xEDdo de la tarjeta."}},actions:{title:"Acciones",description:"Cree chips de acci\xF3n. Arrastre para reordenar, pulse el l\xE1piz para configurar."}},subtitles:{idle_timeout:"Tiempo antes de reposo (ms). 0 para desactivar.",show_chip_row:'"Auto" oculta la fila si solo hay una entidad. "En men\xFA" mueve los chips. "En men\xFA en reposo" muestra los chips en l\xEDnea cuando est\xE1 activo pero los mueve al men\xFA cuando est\xE1 en reposo.',dim_chips:"Atenuar los chips en reposo para un aspecto m\xE1s limpio.",hold_to_pin:"Mantener pulsado para fijar en vez de pulsaci\xF3n corta.",always_show_group:"Los controles de agrupaci\xF3n r\xE1pida (+/-/estrella) estar\xE1n visibles por defecto al cargar la p\xE1gina. Todav\xEDa puedes cambiarlos manualmente mediante doble pulsaci\xF3n.",disable_autofocus:"Evitar que la b\xFAsqueda tome el foco autom\xE1ticamente.",search_within_filter:"Buscar dentro del filtro activo (Favoritos, etc.).",close_search_on_play:"Cerrar b\xFAsqueda al reproducir.",pin_search_headers:"Fijar encabezados de b\xFAsqueda al hacer scroll.",hide_search_headers_on_idle:"Ocultar encabezados de b\xFAsqueda en inactividad.",disable_mass:"Desactivar integraci\xF3n con Mass Queue.",swap_pause_stop:"Cambiar pausa por stop en dise\xF1o moderno.",adaptive_controls:"Permitir que los botones se adapten al espacio.",hide_menu_player:"Ocultar nombre de entidad cuando est\xE1 en el men\xFA.",adaptive_text:"Elegir qu\xE9 textos se adaptan al espacio.",collapse_expand:"Siempre contra\xEDdo activa el modo mini. Expandir al buscar expande temporalmente.",idle_screen:"Elegir pantalla a mostrar en reposo.",hide_controls:"Seleccionar controles a ocultar.",hide_search_chips:"Ocultar chips de filtro de b\xFAsqueda.",hide_active_entity_on_idle:"Oculta la etiqueta de la entidad en la parte inferior de la tarjeta solo cuando el reproductor est\xE1 inactivo.",follow_active_entity:"La entidad de volumen seguir\xE1 a la activa.",search_limit_full:"M\xE1ximo de resultados (defecto: 20).",default_search_filter_full:"Elige qu\xE9 filtro est\xE1 activo por defecto cuando se abre la pantalla de b\xFAsqueda.",default_search_favorites:"Iniciar b\xFAsqueda con favoritos activos",result_sorting_full:"Elegir orden de resultados.",card_height_full:"Dejar vac\xEDo para altura autom\xE1tica.",control_layout_full:"Elegir entre dise\xF1o antiguo o moderno.",artwork_extend:"Extender portada bajo los chips.",artwork_extend_label:"Extender portada",no_artwork_overrides:"Sin reemplazos de portada configurados.",entity_current_hint:"Use 'entity_id: current' para el reproductor actual.",service_data_note:"Los cambios se guardan al pulsar 'Guardar'.",jinja_template_hint:"Plantilla Jinja para entity_id.",jinja_template_vol_hint:"Plantilla para entidad de volumen.",not_available_alt_collapsed:"No disponible en modo contra\xEDdo.",not_available_collapsed:"No disponible si est\xE1 contra\xEDdo.",only_available_collapsed:"Solo disponible si est\xE1 contra\xEDdo.",only_available_modern:"Solo disponible con dise\xF1o Moderno.",image_url_helper:"Ingrese una URL directa a una imagen o una ruta de archivo local",selected_entity_helper:"Helper de texto de entrada que se actualizar\xE1 con el ID de la entidad del reproductor de medios seleccionado actualmente.",select_entity_helper:"Helper de texto de entrada del que leer el ID de la entidad. La tarjeta seleccionar\xE1 autom\xE1ticamente el chip correspondiente.",sync_entity_type:"Elija qu\xE9 ID de entidad sincronizar con el helper (por defecto la entidad de Music Assistant si est\xE1 configurada).",disable_auto_select:"Evita que el chip de esta entidad se seleccione autom\xE1ticamente cuando comienza la reproducci\xF3n.",search_view:"Elegir entre una lista est\xE1ndar o una cuadr\xEDcula de tarjetas para los resultados de la b\xFAsqueda.",search_card_columns:"Especifica cu\xE1ntas columnas usar en la vista de tarjetas. El artwork se adaptar\xE1 autom\xE1ticamente.",card_type:"Elija el modo de tarjeta. 'Por defecto' es el reproductor de medios est\xE1ndar. 'B\xFAsqueda dedicada' convierte la tarjeta en una interfaz de b\xFAsqueda permanente.",always_show_lyrics:"Abrir autom\xE1ticamente la vista de letras al actualizar la p\xE1gina.",lyrics_source:"Music Assistant requiere la integraci\xF3n de mass_queue para obtener las letras de su motor de metadatos interno.",lyrics_pre_roll:"Ajusta el tiempo de resaltado de la letra. Los valores positivos lo aceleran, los negativos lo retrasan (por defecto: 0).",blurred_artwork:"Difuminar siempre la imagen de fondo",hide_collapsed_artwork:"Ocultar la imagen peque\xF1a a la derecha cuando la tarjeta est\xE9 contra\xEDda",show_idle_artwork_when_not_playing:"Cuando est\xE1 habilitado, al seleccionar una ficha que no se est\xE1 reproduciendo actualmente, se mostrar\xE1 la imagen de inactividad configurada en lugar de la car\xE1tula de reproducci\xF3n activa.",prefer_ma_metadata:"Utilizar siempre la entidad de Music Assistant emparejada para el t\xEDtulo de la pista, el artista y el arte, incluso si la entidad primaria est\xE1 reproduciendo.",show_volume_overlay:"Muestra brevemente un indicador de volumen grande sobre la car\xE1tula cuando cambia el nivel de volumen."},titles:{edit_entity:"Editar entidad",edit_action:"Editar acci\xF3n",service_data:"Datos del servicio",add_artwork_override:"A\xF1adir reemplazo"},labels:{dim_chips:"Atenuar chips en reposo",hold_to_pin:"Mantener para fijar",always_show_group:"Grupo r\xE1pido por defecto",disable_autofocus:"Desactivar autofoco",keep_filters:"Mantener filtros",dismiss_on_play:"Cerrar al reproducir",pin_headers:"Fijar encabezados",hide_search_headers_on_idle:"Ocultar encabezados en inactividad",default_search_filter:"Filtro de b\xFAsqueda predeterminado",default_search_favorites:"Filtro de favoritos por defecto",disable_mass:"Desactivar Mass Queue",match_theme:"Seguir tema",alt_progress:"Barra de progreso alternativa",progress_bar_height:"Altura de la barra de progreso",display_timestamps:"Mostrar sellos de tiempo",swap_pause_stop:"Cambiar Pausa por Stop",adaptive_controls:"Tama\xF1o adaptativo",hide_active_entity:"Ocultar nombre de entidad activa",hide_active_entity_on_idle:"Ocultar etiqueta de entidad activa al estar inactivo",collapse_on_idle:"Contraer en reposo",hide_menu_player_toggle:"Ocultar reproductor del men\xFA",always_collapsed:"Siempre contra\xEDdo",expand_on_search:"Expandir al buscar",script_var:"Variable script (yamp_entity)",use_ma_template:"Usar plantilla MA",use_vol_template:"Usar plantilla Volumen",follow_active_entity:"Volumen sigue a entidad activa",use_url_path:"Usar URL o ruta",adaptive_text_elements:"Elementos para tama\xF1o de texto adaptativo",disable_auto_select:"Desactivar selecci\xF3n autom\xE1tica",always_show_lyrics:"Mostrar siempre las letras",lyrics_mode:"Modo de letras",lyrics_source:"Fuente de letras",lyrics_pre_roll:"Anticipo de letra (segundos)",blurred_artwork:"Imagen difuminada",hide_collapsed_artwork:"Ocultar imagen reducida",show_idle_artwork_when_not_playing:"Mostrar imagen de inactividad cuando no se reproduce",prefer_ma_metadata:"Preferir metadatos de Music Assistant",show_volume_overlay:"Mostrar superposici\xF3n de volumen"},fields:{artwork_fit:"Ajuste",artwork_position:"Posici\xF3n",artwork_hostname:"Host",match_field:"Campo",match_value:"Valor",size_percent:"Tama\xF1o (%)",object_fit:"Object Fit",idle_timeout:"Reposo (ms)",show_chip_row:"Mostrar chips",search_limit:"L\xEDmite de b\xFAsqueda",result_sorting:"Orden",vol_step:"Paso de volumen",card_height:"Altura (px)",control_layout:"Dise\xF1o",save_service_data:"Guardar",image_url:"URL imagen",fallback_image_url:"URL de respaldo",move_to_main:"Mover a chips principales",move_to_menu:"Mover al men\xFA",delete_action:"Borrar acci\xF3n",revert_service_data:"Deshacer cambios",test_action:"Probar acci\xF3n",volume_mode:"Modo volumen",idle_screen:"Pantalla reposo",name:"Nombre",hidden_controls:"Controles ocultos",ma_template:"Plantilla MA (Jinja)",hidden_chips:"Chips ocultos",vol_template:"Plantilla Volumen (Jinja)",icon:"Icono",action_type:"Tipo de acci\xF3n",menu_item:"Elemento de men\xFA",nav_path:"Ruta",service:"Servicio",service_data:"Datos",idle_image_entity:"Entidad imagen reposo",match_entity:"Entidad",ma_entity:"Entidad de Music Assistant",vol_entity:"Entidad de volumen",selected_entity_helper:"Helper de entidad seleccionada",sync_entity_type:"Tipo de entidad a sincronizar",placement:"Colocaci\xF3n",card_trigger:"Activador de la tarjeta",search_view:"Vista de resultados de b\xFAsqueda",search_card_columns:"Columnas de tarjetas",card_type:"Tipo de tarjeta",appearance:"Apariencia",no_artwork_option:"Sin imagen",details_alignment:"Alineaci\xF3n de detalles"},action_types:{menu:"Abrir un elemento del men\xFA",service:"Llamar a un servicio",navigate:"Navegar",prev_entity:"Chip de entidad anterior",next_entity:"Chip de entidad siguiente",sync_selected_entity:"Sincronizar entidad seleccionada",select_entity:"Seleccionar entidad desde helper",toggle_lyrics:"Alternar superposici\xF3n de letras"},action_helpers:{sync_selected_entity:"Sincronizar entidad seleccionada \u2192",select_entity:"Seleccionar entidad \u2190",select_helper:"(seleccionar helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entidad de Music Assistant si est\xE1 configurada)",yamp_main_entity:"yamp_main_entity (Entidad principal del reproductor)",yamp_playback_entity:"yamp_playback_entity (Entidad de reproducci\xF3n activa actual)"},placements:{chip:"Chip de acci\xF3n",menu:"En el men\xFA",hidden:"Oculto (Toque en el arte)",not_triggerable:"No activable"},triggers:{none:"Ninguno",tap:"Toque",hold:"Mantener",double_tap:"Doble toque",swipe_left:"Deslizar a la izquierda",swipe_right:"Deslizar a la derecha"},search_view_options:{list:"Lista",card:"Tarjeta",card_minimal:"Tarjeta reducida"},card_type_options:{default:"Por defecto",search:"Buscar",group_players:"Agrupar"},appearance_options:{automatic:"Autom\xE1tico",light:"Claro",dark:"Oscuro"},artwork_fit:{default:"Por defecto",cover:"Portada (por defecto)",contain:"Contener",fill:"Rellenar","scale-down":"Reducir","scaled-contain":"Contenido escalado","scaled-contain-alternate":"Contenido escalado alternativo",none:"Ninguno"}},card:{sections:{details:"Detalles de reproducci\xF3n",menu:"Men\xFA y B\xFAsqueda",action_chips:"Chips de acci\xF3n"},media_controls:{shuffle:"Aleatorio",previous:"Anterior",play_pause:"Reproducir/Pausa",stop:"Detener",next:"Siguiente",repeat:"Repetir"},menu:{more_info:"M\xE1s info",search:"Buscar",source:"Fuente",show_lyrics:"Mostrar letra",hide_lyrics:"Ocultar letra",transfer_queue:"Transferir cola",group_players:"Agrupar",select_entity:"Seleccionar",transfer_to:"Transferir a",no_players:"Sin reproductores MA."},grouping:{title:"Agrupar",sync_volume:"Sincronizar volumen",group_all:"Agrupar todos",ungroup_all:"Desagrupar todos",unavailable:"No disponible",no_players:"No agrupable.",master:"Maestro",joined:"Unido",available:"Disponible",current:"Actual",unjoin_from:"Desvincular de {master}",join_with:"Unirse a {master}"}},search:{favorites:"Favoritos",recently_played:"Reciente",next_up:"A continuaci\xF3n",recommendations:"Recomendaciones",radio_mode:"Modo Radio",show_track_options:"Mostrar opciones de canci\xF3n",play_similar:"Reproducir canciones similares",close:"Cerrar",no_results:"Sin resultados.",play_next:"Reprod. siguiente",replace_play:"Reemplazar y reproducir",replace:"Reemplazar cola",add_queue:"A\xF1adir al final",move_up:"Subir",move_down:"Bajar",move_next:"Pasar a siguiente",remove:"Quitar de cola",added:"\xA1A\xF1adido!",added_to_playlist:"\xA1A\xF1adido a la lista de reproducci\xF3n!",select_playlist:"Seleccionar lista de reproducci\xF3n para '{track}'",add_to_playlist:"A\xF1adir a la lista de reproducci\xF3n",select_track_for_playlist:"Seleccionar la canci\xF3n a a\xF1adir para '{track}' de {artist}",labels:{replace:"Remplazar",next:"Siguiente",replace_next:"Rempl. Sig.",add:"A\xF1adir",add_to_playlist:"A\xF1adir a la lista de reproducci\xF3n"},results:"resultados",result:"resultado",filters:{all:"Todo",artist:"Artista",album:"\xC1lbum",track:"Canci\xF3n",playlist:"Lista",radio:"Radio",music:"M\xFAsica",station:"Emisora",podcast:"P\xF3dcast",audiobook:"Audiolibro"},search_artist:"Buscar este artista",browse_album:"Explorar pistas de {album}",play_collection:"Reproducir esta colecci\xF3n",play_collection_error:"No se puede reproducir esta colecci\xF3n directamente",play_item:"Reproducir {item}"},lyrics:{finding:"Buscando letra...",none_found:"No se encontr\xF3 letra",not_available:"Letra no disponible",instrumental:"Pista instrumental"},lyrics_sources:{mass_lrclib:"Music Assistant (Respaldo en LRCLIB)",mass:"Solo Music Assistant",lrclib:"Solo LRCLIB",lrclib_mass:"LRCLIB (Respaldo en Music Assistant)"},lyrics_modes:{default:"Predeterminado (Resaltar y desplazarse)",scroll:"Solo desplazarse",text:"Solo texto"}},ho={common:{not_found:"Entit\xE9 non trouv\xE9e.",search:"Rechercher",power:"Alimentation",favorite:"Favori",loading:"Chargement...",no_results:"Aucun r\xE9sultat.",close:"Fermer",vol_up:"Monter le volume",vol_down:"Baisser le volume",media_player:"Lecteur Multim\xE9dia",edit_entity:"Modifier les param\xE8tres de l'entit\xE9",edit_action:"Modifier les param\xE8tres de l'action",mute:"Muet",unmute:"R\xE9tablir le son",seek:"Rechercher",volume:"Volume",play_now:"Lire maintenant",more_options:"Plus d'options",unavailable:"Indisponible",back:"Retour",cancel:"Annuler",reset_default:"R\xE9initialiser",unpin:"D\xE9s\xE9pingler",clear:"Effacer",album_art:"Illustration de l'album"},editor:{tabs:{entities:"Entit\xE9s",behavior:"Comportement",look_and_feel:"Apparence",artwork:"Illustrations",actions:"Actions"},placeholders:{search:"Rechercher de la musique..."},templates:{minimal_mini:{label:"MINImal",description:"Une carte compacte sans pochette."},normal_mini:{label:"Mini Mode",description:"La carte compacte standard."}},sections:{artwork:{general:{title:"Param\xE8tres G\xE9n\xE9raux",description:"Contr\xF4les globaux pour l'affichage des illustrations."},idle:{title:"Illustration au Repos",description:"Afficher une image statique lorsque rien n'est en lecture."},overrides:{title:"Remplacements d'Illustrations",description:"Les remplacements sont \xE9valu\xE9s de haut en bas. Glissez pour r\xE9ordonner."}},entities:{title:"Entit\xE9s*",description:"Ajoutez les lecteurs multim\xE9dias que vous souhaitez contr\xF4ler. Glissez pour r\xE9ordonner."},behavior:{idle_chips:{title:"Veille & Jetons",description:"Choisissez quand la carte passe en mode veille et comment les jetons se comportent."},interactions_search:{title:"Interactions & Recherche",description:"Affinez la fa\xE7on dont les entit\xE9s sont \xE9pingl\xE9es et le nombre de r\xE9sultats."},lyrics:{title:"Paroles",description:"Configurez la fa\xE7on dont les paroles sont affich\xE9es et quand elles apparaissent."}},look_and_feel:{theme_layout:{title:"Th\xE8me & Mise en page",description:"Adaptez au style de votre tableau de bord et contr\xF4lez l'empreinte globale."},controls_typography:{title:"Commandes & Typographie",description:"Ajustez la taille des boutons, les \xE9tiquettes et le texte adaptatif."},collapsed_idle:{title:"\xC9tats R\xE9duits & Veille",description:"Contr\xF4lez quand la carte se r\xE9duit et quelles vues s'affichent en veille."}},actions:{title:"Actions",description:"Cr\xE9ez les jetons d'action. Glissez pour r\xE9ordonner, cliquez sur le crayon pour configurer."}},subtitles:{idle_timeout:"Temps en millisecondes avant la mise en veille. 0 pour d\xE9sactiver.",show_chip_row:'"Auto" masque la barre de jetons si une seule entit\xE9 est configur\xE9e. "Dans le Menu" d\xE9place les jetons. "Dans le menu au repos" affiche les jetons en ligne lorsque actif mais les d\xE9place dans le menu au repos.',dim_chips:"Assombrir les jetons en mode veille pour un look plus \xE9pur\xE9.",hold_to_pin:"Appui long pour \xE9pingler au lieu d'un appui court.",always_show_group:"Les contr\xF4les de groupement rapide (+/-/\xE9toile) seront visibles par d\xE9faut au chargement de la page. Vous pouvez toujours les basculer manuellement via un double appui.",disable_autofocus:"Emp\xEAcher la recherche de prendre le focus automatiquement.",search_within_filter:"Rechercher dans le filtre actif actuel (Favoris, etc.).",close_search_on_play:"Fermer automatiquement la recherche \xE0 la lecture.",pin_search_headers:"Garder la recherche et les filtres fixes en haut.",hide_search_headers_on_idle:"Masquer la recherche et les filtres en mode veille.",disable_mass:"D\xE9sactiver l'int\xE9gration Mass Queue.",swap_pause_stop:"Remplacer le bouton pause par stop en mode moderne.",adaptive_controls:"Laisser les boutons s'adapter \xE0 l'espace disponible.",hide_menu_player:"Masquer l'\xE9tiquette de l'entit\xE9 en bas quand les jetons sont dans le menu.",adaptive_text:"Choisir quels textes doivent s'adapter \xE0 l'espace.",collapse_expand:"Toujours r\xE9duit cr\xE9e un mini lecteur. Agrandir \xE0 la Recherche agrandit temporairement.",idle_screen:"Choisir l'\xE9cran \xE0 afficher automatiquement en veille.",hide_controls:"S\xE9lectionner les commandes \xE0 masquer pour cette entit\xE9.",hide_search_chips:"Masquer des jetons de filtrage sp\xE9cifiques.",hide_active_entity_on_idle:"Masque l'\xE9tiquette de l'entit\xE9 au bas de la carte uniquement lorsque le lecteur est en veille.",follow_active_entity:"L'entit\xE9 de volume suivra automatiquement l'entit\xE9 active.",search_limit_full:"Nombre maximum de r\xE9sultats (d\xE9faut: 20).",default_search_filter_full:"Choisissez quel filtre est actif par d\xE9faut \xE0 l'ouverture de la recherche.",default_search_favorites:"D\xE9marrer la recherche avec les favoris actifs",result_sorting_full:"Choisir l'ordre des r\xE9sultats. Par d\xE9faut conserve l'ordre source.",card_height_full:"Laisser vide pour une hauteur automatique.",control_layout_full:"Choisir entre l'ancienne mise en page ou la moderne.",artwork_extend:"\xC9tendre l'illustration sous les lignes de jetons.",artwork_extend_label:"\xC9tendre l'illustration",no_artwork_overrides:"Aucun remplacement d'illustration configur\xE9.",entity_current_hint:"Utilisez 'entity_id: current' pour cibler le lecteur actuel.",service_data_note:"Les changements ne sont enregistr\xE9s qu'en cliquant sur 'Enregistrer'.",jinja_template_hint:"Entrez un mod\xE8le Jinja qui renvoie un entity_id.",jinja_template_vol_hint:"Mod\xE8le pour l'entit\xE9 de volume.",not_available_alt_collapsed:"Non disponible en mode 'Toujours r\xE9duit'.",not_available_collapsed:"Non disponible si 'Toujours r\xE9duit' est activ\xE9.",only_available_collapsed:"Uniquement disponible si 'Toujours r\xE9duit' est activ\xE9.",only_available_modern:"Uniquement disponible avec la mise en page Moderne.",image_url_helper:"Entrez une URL directe vers une image ou un chemin de fichier local",selected_entity_helper:"Helper de texte d'entr\xE9e qui sera mis \xE0 jour avec l'ID de l'entit\xE9 du lecteur multim\xE9dia actuellement s\xE9lectionn\xE9.",select_entity_helper:"Helper de texte d'entr\xE9e \xE0 partir duquel lire l'ID de l'entit\xE9. La carte s\xE9lectionnera automatiquement le jeton correspondant.",sync_entity_type:"Choisissez quel ID d'entit\xE9 synchroniser avec le helper (par d\xE9faut l'entit\xE9 Music Assistant si configur\xE9e).",disable_auto_select:"Emp\xEAche le jeton de cette entit\xE9 d'\xEAtre automatiquement s\xE9lectionn\xE9 au d\xE9but de la lecture.",search_view:"Choisissez entre une liste standard ou une grille de cartes pour les r\xE9sultats de recherche.",search_card_columns:"Sp\xE9cifiez le nombre de colonnes \xE0 utiliser dans la vue carte. L'illustration s'adaptera automatiquement.",card_type:"Choisissez le mode de la carte. 'Par d\xE9faut' est le lecteur multim\xE9dia standard. 'Recherche d\xE9di\xE9e' fait de la carte une interface de recherche permanente.",always_show_lyrics:"Ouvrir automatiquement la vue des paroles lors du rafra\xEEchissement de la page.",lyrics_source:"Music Assistant n\xE9cessite l'int\xE9gration mass_queue pour r\xE9cup\xE9rer les paroles de son moteur de m\xE9tadonn\xE9es interne.",lyrics_pre_roll:"Ajuste le timing de mise en \xE9vidence des paroles. Les valeurs positives l'acc\xE9l\xE8rent, les n\xE9gatives le ralentissent (par d\xE9faut : 0).",blurred_artwork:"Toujours flouter l'image d'arri\xE8re-plan",hide_collapsed_artwork:"Masquer l'image r\xE9duite sur la droite lorsque la carte est repli\xE9e",show_idle_artwork_when_not_playing:"Lorsqu'il est activ\xE9, la s\xE9lection d'un badge qui n'est pas en cours de lecture affichera l'image d'inactivit\xE9 configur\xE9e \xE0 la place de l'illustration de lecture active.",prefer_ma_metadata:"Toujours utiliser l'entit\xE9 Music Assistant associ\xE9e pour le titre de la piste, l'artiste et l'image, m\xEAme si l'entit\xE9 principale est en cours de lecture.",show_volume_overlay:"Affiche bri\xE8vement un grand indicateur de volume sur l'illustration lorsque le niveau de volume change."},titles:{edit_entity:"Modifier l'entit\xE9",edit_action:"Modifier l'action",service_data:"Donn\xE9es du service",add_artwork_override:"Ajouter un remplacement"},labels:{dim_chips:"Assombrir les jetons en veille",hold_to_pin:"Maintenir pour \xE9pingler",always_show_group:"Groupe rapide par d\xE9faut",disable_autofocus:"D\xE9sactiver l'autofocus",keep_filters:"Garder les filtres",dismiss_on_play:"Fermer en lecture",pin_headers:"\xC9pingler les en-t\xEAtes",hide_search_headers_on_idle:"Masquer les en-t\xEAtes en veille",default_search_filter:"Filtre de recherche par d\xE9faut",default_search_favorites:"Filtre des favoris par d\xE9faut",disable_mass:"D\xE9sactiver Mass Queue",match_theme:"Suivre le th\xE8me",alt_progress:"Barre de progression alternative",progress_bar_height:"Hauteur de la barre de progression",display_timestamps:"Afficher les horodatages",swap_pause_stop:"Remplacer Pause par Stop",adaptive_controls:"Taille adaptative",hide_active_entity:"Masquer l'\xE9tiquette active",hide_active_entity_on_idle:"Masquer l'\xE9tiquette de l'entit\xE9 active en mode veille",collapse_on_idle:"R\xE9duire en veille",hide_menu_player_toggle:"Masquer le lecteur menu",always_collapsed:"Toujours r\xE9duit",expand_on_search:"Agrandir en recherche",script_var:"Variable script (yamp_entity)",use_ma_template:"Utiliser mod\xE8le MA",use_vol_template:"Utiliser mod\xE8le Volume",follow_active_entity:"Le volume suit l'entit\xE9 active",use_url_path:"Utiliser URL ou chemin",adaptive_text_elements:"\xC9l\xE9ments de texte adaptatif",disable_auto_select:"D\xE9sactiver la s\xE9lection automatique",always_show_lyrics:"Toujours afficher les paroles",lyrics_mode:"Mode des paroles",lyrics_source:"Source des paroles",lyrics_pre_roll:"Pr\xE9-roll des paroles (secondes)",blurred_artwork:"Image flout\xE9e",hide_collapsed_artwork:"Masquer l'image r\xE9duite",show_idle_artwork_when_not_playing:"Afficher l'image d'inactivit\xE9 si pas de lecture",prefer_ma_metadata:"Pr\xE9f\xE9rer les m\xE9tadonn\xE9es Music Assistant",show_volume_overlay:"Afficher la superposition de volume"},fields:{artwork_fit:"Ajustement",artwork_position:"Position",artwork_hostname:"H\xF4te",match_field:"Champ de correspondance",match_value:"Valeur de correspondance",size_percent:"Taille (%)",object_fit:"Object Fit",idle_timeout:"Veille (ms)",show_chip_row:"Afficher les jetons",search_limit:"Limite de r\xE9sultats",result_sorting:"Tri des r\xE9sultats",vol_step:"Pas du volume",card_height:"Hauteur (px)",control_layout:"Mise en page",save_service_data:"Enregistrer",image_url:"URL image",fallback_image_url:"URL de secours",move_to_main:"Mettre dans les jetons principaux",move_to_menu:"Mettre dans le menu",delete_action:"Supprimer l'action",revert_service_data:"Annuler les changements",test_action:"Tester l'action",volume_mode:"Mode volume",idle_screen:"\xC9cran de veille",name:"Nom",hidden_controls:"Commandes masqu\xE9es",ma_template:"Mod\xE8le MA (Jinja)",hidden_chips:"Jetons masqu\xE9s",vol_template:"Mod\xE8le Volume (Jinja)",icon:"Ic\xF4ne",action_type:"Type d'action",menu_item:"\xC9l\xE9ment du menu",nav_path:"Chemin navigation",service:"Service",service_data:"Donn\xE9es",idle_image_entity:"Entit\xE9 image veille",match_entity:"Entit\xE9 de correspondance",ma_entity:"Entit\xE9 Music Assistant",vol_entity:"Entit\xE9 de volume",selected_entity_helper:"Helper d'entit\xE9 s\xE9lectionn\xE9e",sync_entity_type:"Type d'entit\xE9 \xE0 synchroniser",placement:"Placement",card_trigger:"D\xE9clencheur de carte",search_view:"Vue des r\xE9sultats de recherche",search_card_columns:"Nombre de colonnes",card_type:"Type de carte",appearance:"Apparence",no_artwork_option:"Pas d'illustration",details_alignment:"Alignement des d\xE9tails"},action_types:{menu:"Ouvrir un \xE9l\xE9ment de menu",service:"Appeler un service",navigate:"Naviguer",prev_entity:"Puce de l'entit\xE9 pr\xE9c\xE9dente",next_entity:"Puce de l'entit\xE9 suivante",sync_selected_entity:"Synchroniser l'entit\xE9 s\xE9lectionn\xE9e",select_entity:"S\xE9lectionner l'entit\xE9 depuis le helper",toggle_lyrics:"Activer/D\xE9sactiver la superposition des paroles"},action_helpers:{sync_selected_entity:"Synchroniser l'entit\xE9 s\xE9lectionn\xE9e \u2192",select_entity:"S\xE9lectionner l'entit\xE9 \u2190",select_helper:"(s\xE9lectionner helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entit\xE9 Music Assistant si configur\xE9e)",yamp_main_entity:"yamp_main_entity (Entit\xE9 principale du lecteur)",yamp_playback_entity:"yamp_playback_entity (Entit\xE9 de lecture active actuelle)"},placements:{chip:"Puce d'action",menu:"Dans le menu",hidden:"Masqu\xE9 (Appui sur l'image)",not_triggerable:"Non d\xE9clenchable"},triggers:{none:"Aucun",tap:"Appui",hold:"Maintenir",double_tap:"Double appui",swipe_left:"Glisser vers la gauche",swipe_right:"Glisser vers la droite"},search_view_options:{list:"Liste",card:"Carte",card_minimal:"Carte minimale"},card_type_options:{default:"Par d\xE9faut",search:"Rechercher",group_players:"Grouper les lecteurs"},appearance_options:{automatic:"Automatique",light:"Clair",dark:"Sombre"},artwork_fit:{default:"Par d\xE9faut",cover:"Couverture (par d\xE9faut)",contain:"Contenir",fill:"Remplir","scale-down":"R\xE9duire","scaled-contain":"Contenir mis \xE0 l'\xE9chelle","scaled-contain-alternate":"Contenir mis \xE0 l'\xE9chelle alternatif",none:"Aucun"}},card:{sections:{details:"D\xE9tails lecture",menu:"Menu & Recherche",action_chips:"Jetons d'action"},media_controls:{shuffle:"Al\xE9atoire",previous:"Pr\xE9c\xE9dent",play_pause:"Lecture/Pause",stop:"Arr\xEAt",next:"Suivant",repeat:"R\xE9p\xE9ter"},menu:{more_info:"Plus d'infos",search:"Rechercher",source:"Source",show_lyrics:"Afficher les paroles",hide_lyrics:"Masquer les paroles",transfer_queue:"Transf\xE9rer la file",group_players:"Grouper les lecteurs",select_entity:"Choisir pour plus d'infos",transfer_to:"Transf\xE9rer vers",no_players:"Aucun lecteur MA disponible."},grouping:{title:"Grouper les lecteurs",sync_volume:"Synchroniser volume",group_all:"Grouper tout",ungroup_all:"D\xE9grouper tout",unavailable:"Lecteur indisponible",no_players:"Aucun lecteur groupable.",master:"Ma\xEEtre",joined:"Li\xE9",available:"Disponible",current:"Actuel",unjoin_from:"Se d\xE9solidariser de {master}",join_with:"Se joindre \xE0 {master}"}},search:{favorites:"Favoris",recently_played:"R\xE9cemment lus",next_up:"\xC0 suivre",recommendations:"Recommandations",radio_mode:"Mode Radio",show_track_options:"Afficher les options du titre",play_similar:"Lire des chansons similaires",close:"Fermer la recherche",no_results:"Aucun r\xE9sultat.",play_next:"Lire apr\xE8s",replace_play:"Remplacer et lire",replace:"Remplacer file",add_queue:"Ajouter \xE0 la fin",move_up:"Monter",move_down:"Descendre",move_next:"Passer au suivant",remove:"Retirer de la file",added:"Ajout\xE9 \xE0 la file !",added_to_playlist:"Ajout\xE9 \xE0 la playlist !",select_playlist:"S\xE9lectionner une playlist pour '{track}'",add_to_playlist:"Ajouter \xE0 la playlist",select_track_for_playlist:"S\xE9lectionner le titre \xE0 ajouter pour '{track}' par {artist}",labels:{replace:"Remplacer",next:"Suivant",replace_next:"Rempl. Suivant",add:"Ajouter",add_to_playlist:"Ajouter \xE0 la playlist"},results:"r\xE9sultats",result:"r\xE9sultat",filters:{all:"Tout",artist:"Artiste",album:"Album",track:"Titre",playlist:"Playlist",radio:"Radio",music:"Musique",station:"Station",podcast:"Podcast",audiobook:"Livre audio"},search_artist:"Chercher cet artiste",browse_album:"Parcourir les titres de {album}",play_collection:"Lire cette collection",play_collection_error:"Impossible de lire cette collection directement",play_item:"Lire {item}"},lyrics:{finding:"Recherche des paroles...",none_found:"Aucune parole trouv\xE9e",not_available:"Paroles non disponibles",instrumental:"Piste instrumentale"},lyrics_sources:{mass_lrclib:"Music Assistant (Repli sur LRCLIB)",mass:"Music Assistant uniquement",lrclib:"LRCLIB uniquement",lrclib_mass:"LRCLIB (Repli sur Music Assistant)"},lyrics_modes:{default:"Par d\xE9faut (Surligner et faire d\xE9filer)",scroll:"D\xE9filement uniquement",text:"Texte uniquement"}},po={common:{not_found:"Entit\xE0 non trovata.",search:"Cerca",power:"Accensione",favorite:"Preferito",loading:"Caricamento...",no_results:"Nessun risultato.",close:"Chiudi",vol_up:"Volume su",vol_down:"Volume gi\xF9",media_player:"Lettore multimediale",edit_entity:"Modifica impostazioni entit\xE0",edit_action:"Modifica impostazioni azione",mute:"Muto",unmute:"Riattiva audio",seek:"Cerca",volume:"Volume",play_now:"Riproduci ora",more_options:"Altre opzioni",unavailable:"Non disponibile",back:"Indietro",cancel:"Annulla",reset_default:"Ripristina predefiniti",unpin:"Rimuovi pin",clear:"Cancella",album_art:"Copertina dell'album"},editor:{tabs:{entities:"Entit\xE0",behavior:"Comportamento",look_and_feel:"Aspetto",artwork:"Copertina",actions:"Azioni"},placeholders:{search:"Cerca musica..."},templates:{minimal_mini:{label:"MINImal",description:"Una scheda compatta senza copertina."},normal_mini:{label:"Mini Mode",description:"La scheda compatta standard."}},sections:{artwork:{general:{title:"Impostazioni generali",description:"Controlli globali per la copertina."},idle:{title:"Copertina in riposo",description:"Mostra un'immagine statica quando non c'\xE8 riproduzione."},overrides:{title:"Override copertina",description:"Gli override sono valutati dall'alto in basso."}},entities:{title:"Entit\xE0*",description:"Aggiungi i lettori da controllare."},behavior:{idle_chips:{title:"Riposo e chip",description:"Scegli quando andare in riposo."},interactions_search:{title:"Interazioni e ricerca",description:"Ajusta il fissaggio delle entit\xE0."},lyrics:{title:"Testi",description:"Configura come vengono visualizzati i testi e quando appaiono."}},look_and_feel:{theme_layout:{title:"Tema e layout",description:"Adatta allo stile del dashboard."},controls_typography:{title:"Controlli e tipografia",description:"Ajusta bottoni e etichette."},collapsed_idle:{title:"Stati contratto e riposo",description:"Controlla il contratto della scheda."}},actions:{title:"Azioni",description:"Crea chip azione."}},subtitles:{idle_timeout:"Tempo prima del riposo (ms). 0 per disabilitare.",show_chip_row:`"Auto" nasconde la riga se c'\xE8 una sola entit\xE0. "Nel menu" sposta i chip nel menu. "Nel menu in inattivit\xE0" mostra i chip in linea quando attivo ma li sposta nel menu quando inattivo.`,dim_chips:"Appanna i chip in riposo per un aspetto pi\xF9 pulito.",hold_to_pin:"Tieni premuto per fissare invece di un tocco breve.",always_show_group:"I controlli di raggruppamento rapido (+/-/stella) saranno visibili per impostazione predefinita al caricamento della pagina. Puoi comunque attivarli manualmente tramite doppio tocco.",disable_autofocus:"Evita che la ricerca prenda il focus automaticamente.",search_within_filter:"Cerca nel filtro attivo (Preferiti, ecc.).",close_search_on_play:"Chiudi ricerca alla riproduzione.",pin_search_headers:"Fissa le intestazioni di ricerca durante lo scorrimento.",hide_search_headers_on_idle:"Nascondi la ricerca e i filtri quando inattivo.",disable_mass:"Disabilita integrazione Mass Queue.",swap_pause_stop:"Sostituisci pausa con stop nel design moderno.",adaptive_controls:"Permetti ai pulsanti di adattarsi allo spazio.",hide_menu_player:"Nascondi nome entit\xE0 quando \xE8 nel menu.",adaptive_text:"Scegli quali testi si adattano allo spazio.",collapse_expand:"Sempre contratto attiva il modo mini. Espandi alla ricerca espande temporaneamente.",idle_screen:"Scegli schermata da mostrare in riposo.",hide_controls:"Seleziona controlli da nascondere.",hide_search_chips:"Nascondi chip di filtro ricerca.",hide_active_entity_on_idle:"Nasconde l'etichetta dell'entit\xE0 in fondo alla scheda solo quando il lettore \xE8 inattivo.",follow_active_entity:"L'entit\xE0 volume seguir\xE0 quella attiva.",search_limit_full:"Massimo risultati (default: 20).",default_search_filter_full:"Scegli quale filtro \xE8 attivo per impostazione predefinita all'apertura della ricerca.",default_search_favorites:"Inizia ricerca con preferiti attivi",result_sorting_full:"Scegli ordine risultati.",card_height_full:"Lascia vuoto per altezza automatica.",control_layout_full:"Scegli tra design vecchio o moderno.",artwork_extend:"Estendi copertina sotto i chip.",artwork_extend_label:"Estendi copertina",no_artwork_overrides:"Nessun override copertina configurato.",entity_current_hint:"Usa 'entity_id: current' per il lettore attuale.",service_data_note:"Le modifiche si salvano premendo 'Salva'.",jinja_template_hint:"Modello Jinja per entity_id.",jinja_template_vol_hint:"Modello per entit\xE0 volume.",not_available_alt_collapsed:"Non disponibile in modo contratto.",not_available_collapsed:"Non disponibile se contratto.",only_available_collapsed:"Solo disponibile se contratto.",only_available_modern:"Solo disponibile con layout Moderno.",image_url_helper:"Inserisci un URL diretto a un'immagine o un percorso file locale",selected_entity_helper:"Helper di testo di input che verr\xE0 aggiornato con l'ID dell'entit\xE0 del lettore multimediale attualmente selezionato.",select_entity_helper:"Helper di testo di input da cui leggere l'ID dell'entit\xE0. La scheda selezioner\xE0 automaticamente il chip corrispondente.",sync_entity_type:"Scegli quale ID entit\xE0 sincronizzare con l'helper (predefinito l'entit\xE0 Music Assistant se configurata).",disable_auto_select:"Evita che il chip di questa entit\xE0 venga selezionato automaticamente all'inizio della riproduzione.",search_view:"Scegli tra una lista standard o una griglia di schede per i risultati della ricerca.",search_card_columns:"Specifica quante colonne utilizzare nella vista a schede. La copertina si adatter\xE0 automaticamente.",card_type:"Scegli la modalit\xE0 della scheda. 'Predefinito' \xE8 il lettore multimediale standard. 'Ricerca dedicata' rende la scheda un'interfaccia di ricerca permanente.",always_show_lyrics:"Apri automaticamente la visualizzazione dei testi quando la pagina viene aggiornata.",lyrics_source:"Music Assistant richiede l'integrazione mass_queue per recuperare i testi dal suo motore di metadati interno.",lyrics_pre_roll:"Sposta il tempismo dell'evidenziazione dei testi. I valori positivi lo accelerano, quelli negativi lo ritardano (predefinito: 0).",blurred_artwork:"Sfoca sempre l'immagine di sfondo",hide_collapsed_artwork:"Nascondi l'immagine piccola a destra quando la scheda \xE8 compressa",show_idle_artwork_when_not_playing:"Se abilitato, selezionando un chip che non \xE8 attualmente in riproduzione verr\xE0 mostrata l'immagine inattiva configurata invece della copertina di riproduzione attiva.",prefer_ma_metadata:"Utilizza sempre l'entit\xE0 Music Assistant associata per il titolo del brano, l'artista e l'artwork, anche se l'entit\xE0 principale \xE8 in riproduzione.",show_volume_overlay:"Visualizza brevemente un grande indicatore del volume sopra la copertina quando il livello del volume cambia."},titles:{edit_entity:"Modifica entit\xE0",edit_action:"Modifica azione",service_data:"Dati servizio",add_artwork_override:"Aggiungi override"},labels:{dim_chips:"Appanna chip in riposo",hold_to_pin:"Tieni premuto per fissare",always_show_group:"Gruppo rapido predefinito",disable_autofocus:"Disabilita autofocus",keep_filters:"Mantieni filtri",dismiss_on_play:"Chiudi alla riproduzione",pin_headers:"Fissa intestazioni",hide_search_headers_on_idle:"Nascondi intestazioni in inattivit\xE0",default_search_filter:"Filtro di ricerca predefinito",default_search_favorites:"Filtro preferiti predefinito",disable_mass:"Disabilita Mass Queue",match_theme:"Segui tema",alt_progress:"Barra progresso alternativa",progress_bar_height:"Altezza barra di avanzamento",display_timestamps:"Mostra timestamp",swap_pause_stop:"Sostituisci Pausa con Stop",adaptive_controls:"Dimensione adattativa",hide_active_entity:"Nascondi nome entit\xE0 attiva",hide_active_entity_on_idle:"Nascondi etichetta entit\xE0 attiva quando inattivo",collapse_on_idle:"Contrai in riposo",hide_menu_player_toggle:"Nascondi lettore menu",always_collapsed:"Sempre contratto",expand_on_search:"Espandi alla ricerca",script_var:"Variabile script (yamp_entity)",use_ma_template:"Usa modello MA",use_vol_template:"Usa modello Volume",follow_active_entity:"Volume segue entit\xE0 attiva",use_url_path:"Usa URL o percorso",adaptive_text_elements:"Elementi per dimensione testo adattiva",disable_auto_select:"Disabilita selezione automatica",always_show_lyrics:"Mostra sempre i testi",lyrics_mode:"Modalit\xE0 testi",lyrics_source:"Sorgente testi",lyrics_pre_roll:"Pre-roll testi (secondi)",blurred_artwork:"Immagine sfocata",hide_collapsed_artwork:"Nascondi immagine contratta",show_idle_artwork_when_not_playing:"Mostra immagine inattiva quando non in riproduzione",prefer_ma_metadata:"Preferisci i metadati di Music Assistant",show_volume_overlay:"Mostra overlay volume"},fields:{artwork_fit:"Adattamento",artwork_position:"Posizione",artwork_hostname:"Host",match_field:"Campo",match_value:"Valore",size_percent:"Dimensione (%)",object_fit:"Object Fit",idle_timeout:"Riposo (ms)",show_chip_row:"Mostra chip",search_limit:"Limite ricerca",result_sorting:"Ordine",vol_step:"Passo volume",card_height:"Altezza (px)",control_layout:"Design",save_service_data:"Salva",image_url:"URL immagine",fallback_image_url:"URL fallback",move_to_main:"Sposta in chip principali",move_to_menu:"Sposta nel menu",delete_action:"Elimina azione",revert_service_data:"Annulla modifiche",test_action:"Prova azione",volume_mode:"Modo volume",idle_screen:"Schermo riposo",name:"Nome",hidden_controls:"Controlli nascosti",ma_template:"Modello MA (Jinja)",hidden_chips:"Chip nascosti",vol_template:"Modello Volume (Jinja)",icon:"Icona",action_type:"Tipo azione",menu_item:"Elemento menu",nav_path:"Percorso",service:"Servizio",service_data:"Dati",idle_image_entity:"Entit\xE0 immagine riposo",match_entity:"Entit\xE0",ma_entity:"Entit\xE0 Music Assistant",vol_entity:"Entit\xE0 di volume",selected_entity_helper:"Helper entit\xE0 selezionata",sync_entity_type:"Tipo di entit\xE0 da sincronizzare",placement:"Posizionamento",card_trigger:"Trigger della scheda",search_view:"Vista risultati ricerca",search_card_columns:"Colonne schede",card_type:"Tipo di scheda",appearance:"Aspetto",no_artwork_option:"Nessuna copertina",details_alignment:"Allineamento dei dettagli"},action_types:{menu:"Apri un elemento del menu",service:"Chiama un servizio",navigate:"Naviga",prev_entity:"Chip entit\xE0 precedente",next_entity:"Chip entit\xE0 successiva",sync_selected_entity:"Sincronizza entit\xE0 selezionata",select_entity:"Seleziona entit\xE0 da helper",toggle_lyrics:"Attiva/disattiva sovrapposizione testi"},action_helpers:{sync_selected_entity:"Sincronizza entit\xE0 selezionata \u2192",select_entity:"Seleziona entit\xE0 \u2190",select_helper:"(seleziona helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entit\xE0 Music Assistant se configurata)",yamp_main_entity:"yamp_main_entity (Entit\xE0 principale del lettore)",yamp_playback_entity:"yamp_playback_entity (Entit\xE0 di riproduzione attiva attuale)"},placements:{chip:"Chip d'azione",menu:"Nel menu",hidden:"Nascosto (Tocco sull'immagine)",not_triggerable:"Non attivabile"},triggers:{none:"Nessuno",tap:"Tocco",hold:"Mantieni",double_tap:"Doppio tocco",swipe_left:"Scorri a sinistra",swipe_right:"Scorri a destra"},search_view_options:{list:"Lista",card:"Scheda",card_minimal:"Scheda minima"},card_type_options:{default:"Predefinito",search:"Cerca",group_players:"Raggruppa i lettori"},appearance_options:{automatic:"Automatico",light:"Chiaro",dark:"Scuro"},artwork_fit:{default:"Predefinito",cover:"Copertina (predefinito)",contain:"Contieni",fill:"Riempi","scale-down":"Ridimensiona","scaled-contain":"Contieni scalato","scaled-contain-alternate":"Contieni scalato alternativo",none:"Nessuno"}},card:{sections:{details:"Dettagli riproduzione",menu:"Menu e Ricerca",action_chips:"Chip azione"},media_controls:{shuffle:"Casuale",previous:"Precedente",play_pause:"Riproduci/Pausa",stop:"Ferma",next:"Successivo",repeat:"Ripeti"},menu:{more_info:"Pi\xF9 info",search:"Cerca",source:"Sorgente",show_lyrics:"Mostra testi",hide_lyrics:"Nascondi testi",transfer_queue:"Trasferisci coda",group_players:"Raggruppa",select_entity:"Seleziona",transfer_to:"Trasferisci a",no_players:"Senza lettori MA."},grouping:{title:"Raggruppa",sync_volume:"Sincronizza volume",group_all:"Raggruppa tutti",ungroup_all:"Separa tutti",unavailable:"Non disponibile",no_players:"Non raggruppabile.",master:"Master",joined:"Unito",available:"Disponibile",current:"Attuale",unjoin_from:"Scollegati da {master}",join_with:"Unisciti a {master}"}},search:{favorites:"Preferiti",recently_played:"Recenti",next_up:"A seguire",recommendations:"Raccomandazioni",radio_mode:"Modo Radio",show_track_options:"Mostra opzioni brano",play_similar:"Riproduci brani simili",close:"Chiudi",no_results:"Nessun risultato.",play_next:"Riprod. successivo",replace_play:"Sostituisci e riproduci",replace:"Sostituisci coda",add_queue:"Aggiungi alla fine",move_up:"Sposta su",move_down:"Sposta gi\xF9",move_next:"Passa al successivo",remove:"Rimuovi da coda",added:"Aggiunto!",added_to_playlist:"Aggiunto alla playlist!",select_playlist:"Seleziona playlist per '{track}'",add_to_playlist:"Aggiungi alla playlist",select_track_for_playlist:"Seleziona il brano da aggiungere per '{track}' di {artist}",labels:{replace:"Sostituisci",next:"Successivo",replace_next:"Sost. succ.",add:"Aggiungi",add_to_playlist:"Aggiungi alla playlist"},results:"risultati",result:"risultato",filters:{all:"Tutto",artist:"Artista",album:"Album",track:"Brano",playlist:"Playlist",radio:"Radio",music:"Musica",station:"Stazione",podcast:"Podcast",audiobook:"Audiolibro"},search_artist:"Cerca questo artista",browse_album:"Sfoglia i brani di {album}",play_collection:"Riproduci questa collezione",play_collection_error:"Impossibile riprodurre direttamente questa collezione",play_item:"Riproduci {item}"},lyrics:{finding:"Ricerca testi...",none_found:"Nessun testo trovato",not_available:"Testi non disponibili",instrumental:"Brano strumentale"},lyrics_sources:{mass_lrclib:"Music Assistant (Fallback su LRCLIB)",mass:"Solo Music Assistant",lrclib:"Solo LRCLIB",lrclib_mass:"LRCLIB (Fallback su Music Assistant)"},lyrics_modes:{default:"Predefinito (Evidenzia e scorri)",scroll:"Solo scorrimento",text:"Solo testo"}},_o={common:{not_found:"Entiteit niet gevonden.",search:"Zoeken",power:"Aan/Uit",favorite:"Favoriet",loading:"Laden...",no_results:"Geen resultaten.",close:"Sluiten",vol_up:"Volume Omhoog",vol_down:"Volume Omlaag",media_player:"Mediaspeler",edit_entity:"Entiteitsinstellingen Bewerken",edit_action:"Actie-instellingen Bewerken",mute:"Dempen",unmute:"Dempen opheffen",seek:"Zoeken",volume:"Volume",play_now:"Nu Spelen",more_options:"Meer Opties",unavailable:"Niet beschikbaar",back:"Terug",cancel:"Annuleren",reset_default:"Herstellen naar standaard",unpin:"Losmaken",clear:"Wissen",album_art:"Albumhoes"},editor:{tabs:{entities:"Entiteiten",behavior:"Gedrag",look_and_feel:"Uiterlijk",artwork:"Artwork",actions:"Acties"},placeholders:{search:"Zoek muziek..."},templates:{minimal_mini:{label:"MINImal",description:"Een compacte kaart zonder artwork."},normal_mini:{label:"Mini Mode",description:"De standaard compacte kaart."}},sections:{artwork:{general:{title:"Algemene Instellingen",description:"Globale instellingen voor hoe artwork wordt weergegeven en opgehaald."},idle:{title:"Artwork bij Inactiviteit",description:"Toon een statische afbeelding of entiteits-snapshot wanneer er niets wordt afgespeeld."},overrides:{title:"Artwork Overschrijvingen",description:"Overschrijvingen worden van boven naar beneden ge\xEBvalueerd. Sleep om te sorteren."}},entities:{title:"Entiteiten*",description:"Voeg de mediaspelers toe die je wilt bedienen. Sleep entiteiten om de volgorde te wijzigen."},behavior:{idle_chips:{title:"Inactiviteit & Chips",description:"Kies wanneer de kaart inactief wordt en hoe entiteitschips zich gedragen."},interactions_search:{title:"Interacties & Zoeken",description:"Verfijn hoe entiteiten worden vastgezet en hoeveel resultaten er tegelijk worden getoond."},lyrics:{title:"Songteksten",description:"Configureer hoe songteksten worden weergegeven en wanneer ze verschijnen."}},look_and_feel:{theme_layout:{title:"Thema & Layout",description:"Stem af op de styling van het dashboard en beheer de totale voetafdruk."},controls_typography:{title:"Bediening & Typografie",description:"Pas knopgrootte, entiteitslabels en adaptieve tekst aan."},collapsed_idle:{title:"Ingeklapte & Inactieve Staten",description:"Beheer wanneer de kaart inklapt en welke weergaven getoond worden bij inactiviteit."}},actions:{title:"Acties",description:"Bouw de actiechips die in de kaart of het menu verschijnen. Sleep om te sorteren, klik op het potlood om te configureren."}},subtitles:{idle_timeout:"Tijd in milliseconden voordat de kaart naar de inactieve modus gaat. Stel in op 0 om inactiviteitsgedrag uit te schakelen.",show_chip_row:'"Auto" verbergt de chiprij wanneer er slechts \xE9\xE9n entiteit is geconfigureerd. "In Menu" verplaatst de chips naar het menu-overlay. "In menu bij inactiviteit" toont chips inline wanneer actief maar verplaatst ze naar het menu wanneer inactief.',dim_chips:"Wanneer de kaart inactief wordt met een afbeelding, dim dan de entiteits- en actiechips voor een strakker uiterlijk.",hold_to_pin:"Houd entiteitschips lang ingedrukt in plaats van kort om ze vast te zetten, om automatisch schakelen tijdens afspelen te voorkomen.",always_show_group:"Snelgroeperingsknoppen (+/-/ster) zijn standaard zichtbaar bij het laden van de pagina. Je kunt ze nog steeds handmatig in- of uitschakelen via dubbeltikken.",disable_autofocus:"Voorkom dat het zoekveld de focus steelt, zodat onscreen toetsenborden verborgen blijven.",search_within_filter:"Schakel dit in om te zoeken binnen het huidige actieve filter (Favorieten, Recent Afgespeeld, etc) in plaats van dit te wissen.",close_search_on_play:"Sluit het zoekscherm automatisch wanneer een nummer wordt afgespeeld.",pin_search_headers:"Houd de zoekinvoer en filters bovenaan vast tijdens het scrollen door resultaten.",hide_search_headers_on_idle:"Verberg zoekinvoer en filters wanneer inactief.",disable_mass:"Schakel de optionele Mass Queue integratie uit, zelfs als deze is ge\xEFnstalleerd.",swap_pause_stop:"Vervang de pauzeknop door stop bij gebruik van de moderne lay-out.",adaptive_controls:"Laat de afspeelknoppen groeien of krimpen om in de beschikbare ruimte te passen.",hide_menu_player:"Wanneer chips in het menu staan, verberg dan het entiteitslabel onderaan de kaart.",adaptive_text:"Kies welke tekstgroepen moeten schalen met de beschikbare ruimte (laat leeg om adaptieve tekst uit te schakelen).",collapse_expand:"Altijd Ingeklapt cre\xEBert de mini-spelermodus. Uitklappen bij Zoeken klapt tijdelijk uit tijdens het zoeken.",idle_screen:"Kies welk scherm automatisch wordt weergegeven wanneer de kaart inactief wordt.",hide_controls:"Selecteer welke knoppen je wilt verbergen voor deze entiteit (standaard worden ze allemaal getoond)",hide_search_chips:"Verberg specifieke zoekfilterchips voor deze entiteit",hide_active_entity_on_idle:"Verbergt het entiteitslabel onderaan de kaart alleen wanneer de speler inactief is.",follow_active_entity:"Indien ingeschakeld, zal de volume-entiteit automatisch de actieve afspeel-entiteit volgen. Let op: dit overschrijft de geselecteerde volume-entiteit.",search_limit_full:"Maximaal aantal zoekresultaten om weer te geven (standaard: 20)",default_search_filter_full:"Kies welk filter standaard actief is wanneer het zoekscherm wordt geopend.",default_search_favorites:"Start zoekopdracht met favorieten actief",result_sorting_full:"Kies hoe zoekresultaten worden gesorteerd. Standaard behoudt de bronvolgorde.",card_height_full:"Laat leeg voor automatische hoogte",control_layout_full:"Kies tussen de oude gelijkmatig verdeelde knoppen of de moderne Home Assistant lay-out.",artwork_extend:"Laat de artwork-achtergrond doorlopen onder de chip- en actierijen.",artwork_extend_label:"Artwork uitbreiden",no_artwork_overrides:"Geen artwork overschrijvingen geconfigureerd. Gebruik de plusknop hieronder om er een toe te voegen.",entity_current_hint:"Gebruik 'entity_id: current' om de momenteel geselecteerde mediaspeler op de kaart te targeten. Let op: de 'Test Actie' knop wordt uitgeschakeld bij gebruik van deze functie.",service_data_note:"Wijzigingen in de servicegegevens hieronder worden pas in de configuratie opgeslagen nadat op de knop 'Servicegegevens Opslaan' is geklikt!",jinja_template_hint:"Voer een Jinja-sjabloon in dat resulteert in een enkele entity_id. Voorbeeld voor het wisselen van MA op basis van een bronselectie:",jinja_template_vol_hint:"Voer een Jinja-sjabloon in dat resulteert in een entity_id (bijv. media_player.kantoor). Voorbeeld voor het wisselen van volume-entiteit op basis van een boolean:",not_available_alt_collapsed:"Niet beschikbaar met Alternatieve Voortgangsbalk of Altijd Ingeklapte modus",not_available_collapsed:"Niet beschikbaar wanneer Altijd Ingeklapt is ingeschakeld",only_available_collapsed:"Alleen beschikbaar wanneer Altijd Ingeklapt is ingeschakeld",only_available_modern:"Alleen beschikbaar met de Moderne lay-out",image_url_helper:"Voer een directe URL naar een afbeelding of een lokaal bestandspad in",selected_entity_helper:"Invoerteksthelper die wordt bijgewerkt met de momenteel geselecteerde media player-entiteits-ID.",select_entity_helper:"Invoerteksthelper waaruit het entiteits-ID wordt gelezen. De kaart selecteert automatisch de bijbehorende chip.",sync_entity_type:"Kies welk entiteits-ID moet worden gesynchroniseerd met de helper (standaard Music Assistant-entiteit indien geconfigureerd).",disable_auto_select:"Voorkomt dat de chip van deze entiteit automatisch wordt geselecteerd wanneer deze begint af te spelen.",search_view:"Kies tussen een standaardlijst of een raster van kaarten voor zoekresultaten.",search_card_columns:"Geef aan hoeveel kolommen er gebruikt moeten worden in de kaartweergave. De afbeelding wordt automatisch aangepast.",card_type:"Kies de kaartmodus. 'Standaard' is de standaard mediaspeler. 'Speciale zoekopdracht' maakt van de kaart een permanente zoekinterface.",always_show_lyrics:"Open automatisch de songtekstweergave wanneer de pagina wordt vernieuwd.",lyrics_source:"Music Assistant vereist de mass_queue-integratie om songteksten op te halen uit de interne metadata-engine.",lyrics_pre_roll:"Verschuif de timing van de songtekstmarkering. Positieve waarden versnellen het, negatieve waarden vertragen het (standaard: 0).",blurred_artwork:"Achtergrondafbeelding altijd vervagen",hide_collapsed_artwork:"Verberg de kleine afbeelding aan de rechterkant wanneer de kaart is ingeklapt",show_idle_artwork_when_not_playing:"Indien ingeschakeld, zal het selecteren van een chip die momenteel niet wordt afgespeeld de geconfigureerde stand-by afbeelding weergeven in plaats van de actieve afspeel-art.",prefer_ma_metadata:"Gebruik altijd de gekoppelde Music Assistant-entiteit voor de tracktitel, artiest en artwork, zelfs als de primaire entiteit wordt afgespeeld.",show_volume_overlay:"Geef kort een grote volume-indicator weer over het artwork wanneer het volumeniveau verandert."},titles:{edit_entity:"Entiteit Bewerken",edit_action:"Actie Bewerken",service_data:"Servicegegevens",add_artwork_override:"Artwork Overschrijving Toevoegen"},labels:{dim_chips:"Chips dimmen bij inactiviteit",hold_to_pin:"Ingedrukt houden om vast te zetten",always_show_group:"Snelgroepering standaard aan",disable_autofocus:"Zoek-autofocus uitschakelen",keep_filters:"Filters behouden bij zoeken",dismiss_on_play:"Zoeken sluiten bij afspelen",pin_headers:"Zoekkoppen vastzetten",hide_search_headers_on_idle:"Zoekkoppen verbergen bij inactiviteit",default_search_filter:"Standaard zoekfilter",default_search_favorites:"Standaard naar favorietenfilter",disable_mass:"Mass Queue uitschakelen",match_theme:"Thema matchen",alt_progress:"Alternatieve Voortgangsbalk",progress_bar_height:"Hoogte voortgangsbalk",display_timestamps:"Tijdstempels Weergeven",swap_pause_stop:"Pauze vervangen door Stop",adaptive_controls:"Adaptieve Knoppen Grootte",hide_active_entity:"Label van Actieve Entiteit verbergen",hide_active_entity_on_idle:"Actieve entiteitslabel verbergen bij inactiviteit",collapse_on_idle:"Inklappen bij inactiviteit",hide_menu_player_toggle:"Menu-speler Verbergen",always_collapsed:"Altijd Ingeklapt",expand_on_search:"Uitklappen bij Zoeken",script_var:"Script Variabele (yamp_entity)",use_ma_template:"Sjabloon gebruiken voor Music Assistant Entiteit",use_vol_template:"Sjabloon gebruiken voor Volume Entiteit",follow_active_entity:"Volume Entiteit volgt Actieve Entiteit",use_url_path:"URL of Pad gebruiken",adaptive_text_elements:"Elementen voor adaptieve tekstgrootte",disable_auto_select:"Automatische selectie uitschakelen",always_show_lyrics:"Toon altijd songteksten",lyrics_mode:"Songtekstmodus",lyrics_source:"Songtekstbron",lyrics_pre_roll:"Songtekst Pre-Roll (seconden)",blurred_artwork:"Vervaagde afbeelding",hide_collapsed_artwork:"Verkleinde afbeelding verbergen",show_idle_artwork_when_not_playing:"Toon stand-by afbeelding wanneer niet afgespeeld",prefer_ma_metadata:"Voorkeur voor Music Assistant-metadata",show_volume_overlay:"Volume-overlay weergeven"},fields:{artwork_fit:"Artwork Passend Maken",artwork_position:"Artwork Positie",artwork_hostname:"Artwork Hostnaam",match_field:"Match Veld",match_value:"Match Waarde",size_percent:"Grootte (%)",object_fit:"Object Fit",idle_timeout:"Time-out voor Inactiviteit (ms)",show_chip_row:"Chiprij Tonen",search_limit:"Limiet Zoekresultaten",result_sorting:"Sortering Resultaten",vol_step:"Volume Stap (0.05 = 5%)",card_height:"Kaarthoogte (px)",control_layout:"Knoppen Lay-out",save_service_data:"Servicegegevens Opslaan",image_url:"Afbeelding URL",fallback_image_url:"Fallback Afbeelding URL",move_to_main:"Verplaats actie naar hoofdchips",move_to_menu:"Verplaats actie naar menu",delete_action:"Actie Verwijderen",revert_service_data:"Terugzetten naar Opgeslagen Gegevens",test_action:"Actie Testen",volume_mode:"Volume Modus",idle_screen:"Inactief Scherm",name:"Naam",hidden_controls:"Verborgen Knoppen",ma_template:"Music Assistant Entiteit Sjabloon (Jinja)",hidden_chips:"Verborgen Zoekfilterchips",vol_template:"Volume Entiteit Sjabloon (Jinja)",icon:"Icoon",action_type:"Actietype",menu_item:"Menu-item",nav_path:"Navigatiepad",service:"Service",service_data:"Servicegegevens",idle_image_entity:"Entiteit voor inactieve afbeelding",match_entity:"Match Entiteit",ma_entity:"Music Assistant-entiteit",vol_entity:"Volume-entiteit",selected_entity_helper:"Geselecteerde entiteitshelper",sync_entity_type:"Synchronisatie entiteitstype",placement:"Plaatsing",card_trigger:"Kaart trigger",search_view:"Zoekresultaten weergave",search_card_columns:"Aantal kolommen",card_type:"Kaarttype",appearance:"Uiterlijk",no_artwork_option:"Geen afbeelding",details_alignment:"Details uitlijning"},action_types:{menu:"Open een kaartmenu-item",service:"Roep een service aan",navigate:"Navigeren",prev_entity:"Vorige entiteit chip",next_entity:"Volgende entiteit chip",sync_selected_entity:"Synchroniseer geselecteerde entiteit",select_entity:"Selecteer entiteit uit helper",toggle_lyrics:"Wisselen tussen songtekst-overlay"},action_helpers:{sync_selected_entity:"Geselecteerde entiteit synchroniseren",select_entity:"Entiteit selecteren uit helper",select_helper:"(selecteer helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Music Assistant-entiteit indien geconfigureerd)",yamp_main_entity:"yamp_main_entity (Hoofd media player-entiteit)",yamp_playback_entity:"yamp_playback_entity (Huidige actieve afspeelentiteit)"},placements:{chip:"Actiechip",menu:"In menu",hidden:"Verborgen (Artwork-tik)",not_triggerable:"Niet triggerbaar"},triggers:{none:"Geen",tap:"Tik",hold:"Vasthouden",double_tap:"Dubbeltik",swipe_left:"Veeg naar links",swipe_right:"Veeg naar rechts"},search_view_options:{list:"Lijst",card:"Kaart",card_minimal:"Minimale kaart"},card_type_options:{default:"Standaard",search:"Zoeken",group_players:"Spelers groeperen"},appearance_options:{automatic:"Automatisch",light:"Licht",dark:"Donker"},artwork_fit:{default:"Standaard",cover:"Cover (standaard)",contain:"Bevatten",fill:"Vullen","scale-down":"Verkleinen","scaled-contain":"Geschaalde contain","scaled-contain-alternate":"Geschaalde contain alternatief",none:"Geen"}},card:{sections:{details:"Details van 'Nu Spelen'",menu:"Menu & Zoekschermen",action_chips:"Actie Chips"},media_controls:{shuffle:"Shuffle",previous:"Vorige",play_pause:"Afspelen/Pauzeren",stop:"Stop",next:"Volgende",repeat:"Herhalen"},menu:{more_info:"Meer Info",search:"Zoeken",source:"Bron",show_lyrics:"Songtekst weergeven",hide_lyrics:"Songtekst verbergen",transfer_queue:"Wachtrij Overdragen",group_players:"Spelers Groeperen",select_entity:"Selecteer Entiteit voor Meer Info",transfer_to:"Wachtrij Overdragen Naar",no_players:"Geen andere Music Assistant spelers beschikbaar."},grouping:{title:"Spelers Groeperen",sync_volume:"Volume Synchroniseren",group_all:"Alles Groeperen",ungroup_all:"Alles Loskoppelen",unavailable:"Speler is niet beschikbaar",no_players:"Geen andere spelers beschikbaar die kunnen groeperen.",master:"Master",joined:"Gekoppeld",available:"Beschikbaar",current:"Huidig",unjoin_from:"Loskoppelen van {master}",join_with:"Koppelen met {master}"}},search:{favorites:"Favorieten",recently_played:"Recent Afgespeeld",next_up:"Volgende",recommendations:"Aanbevelingen",radio_mode:"Radiomodus",show_track_options:"Nummeropties weergeven",play_similar:"Vergelijkbare nummers afspelen",close:"Zoeken Sluiten",no_results:"Geen resultaten.",play_next:"Volgende afspelen",replace_play:"Huidige wachtrij vervangen en nu afspelen",replace:"Wachtrij vervangen",add_queue:"Toevoegen aan einde van de wachtrij",move_up:"Omhoog verplaatsen",move_down:"Omlaag verplaatsen",move_next:"Als volgende afspelen",remove:"Verwijderen uit wachtrij",added:"Toegevoegd aan wachtrij!",added_to_playlist:"Toegevoegd aan afspeellijst!",select_playlist:"Selecteer afspeellijst voor '{track}'",add_to_playlist:"Toevoegen aan afspeellijst",select_track_for_playlist:"Selecteer het nummer om toe te voegen voor '{track}' van {artist}",labels:{replace:"Vervangen",next:"Volgende",replace_next:"Vervang Volgende",add:"Toevoegen",add_to_playlist:"Toevoegen aan afspeellijst"},results:"resultaten",result:"resultaat",filters:{all:"Alles",artist:"Artiest",album:"Album",track:"Nummer",playlist:"Afspeellijst",radio:"Radio",music:"Muziek",station:"Zender",podcast:"Podcast",audiobook:"Luisterboek"},search_artist:"Zoek naar deze artiest",browse_album:"Tracks van {album} doorzoeken",play_collection:"Speel deze collectie af",play_collection_error:"Kan deze collectie niet direct afspelen",play_item:"{item} afspelen"},lyrics:{finding:"Songteksten zoeken...",none_found:"Geen songteksten gevonden",not_available:"Songtekst niet beschikbaar",instrumental:"Instrumentaal nummer"},lyrics_sources:{mass_lrclib:"Music Assistant (Terugval naar LRCLIB)",mass:"Alleen Music Assistant",lrclib:"Alleen LRCLIB",lrclib_mass:"LRCLIB (Terugval naar Music Assistant)"},lyrics_modes:{default:"Standaard (Markeren & scrollen)",scroll:"Alleen scrollen",text:"Alleen tekst"}},mo={common:{not_found:"Entidade n\xE3o encontrada.",search:"Procurar",power:"Ligar/Desligar",favorite:"Favorito",loading:"A carregar...",no_results:"Sem resultados.",close:"Fechar",vol_up:"Aumentar volume",vol_down:"Diminuir volume",media_player:"Leitor multim\xE9dia",edit_entity:"Editar defini\xE7\xF5es da entidade",edit_action:"Editar defini\xE7\xF5es da a\xE7\xE3o",mute:"Silenciar",unmute:"Ativar som",seek:"Procurar",volume:"Volume",play_now:"Reproduzir agora",more_options:"Mais op\xE7\xF5es",unavailable:"Indispon\xEDvel",back:"Voltar",cancel:"Cancelar",reset_default:"Repor predefini\xE7\xF5es",unpin:"Desafixar",clear:"Limpar",album_art:"Capa do \xE1lbum"},editor:{tabs:{entities:"Entidades",behavior:"Comportamento",look_and_feel:"Aspeto",artwork:"Capa",actions:"A\xE7\xF5es"},placeholders:{search:"Procurar m\xFAsica..."},templates:{minimal_mini:{label:"MINImal",description:"Um cart\xE3o compacto sem capa."},normal_mini:{label:"Mini Mode",description:"O cart\xE3o compacto padr\xE3o."}},sections:{artwork:{general:{title:"Defini\xE7\xF5es gerais",description:"Controlos globais para a capa."},idle:{title:"Capa em repouso",description:"Mostrar imagem est\xE1tica quando nada toca."},overrides:{title:"Substitui\xE7\xF5es de capa",description:"As substitui\xE7\xF5es s\xE3o avaliadas de cima para baixo."}},entities:{title:"Entidades*",description:"Adicione os leitores a controlar."},behavior:{idle_chips:{title:"Repouso e chips",description:"Escolha quando ir para repouso."},interactions_search:{title:"Intera\xE7\xF5es e procura",description:"Ajuste a fixa\xE7\xE3o de entidades."},lyrics:{title:"Letras",description:"Configure como as letras s\xE3o exibidas e quando aparecem."}},look_and_feel:{theme_layout:{title:"Tema e design",description:"Combine com o estilo do dashboard."},controls_typography:{title:"Controlos e tipografia",description:"Ajuste bot\xF5es e etiquetas."},collapsed_idle:{title:"Estados contra\xEDdo e repouso",description:"Controle o contra\xEDdo do cart\xE3o."}},actions:{title:"A\xE7\xF5es",description:"Crie chips de a\xE7\xE3o."}},subtitles:{idle_timeout:"Tempo antes de repouso (ms). 0 para desativar.",show_chip_row:'"Auto" oculta a linha se houver apenas uma entidade. "No menu" move os chips. "No menu em repouso" mostra os chips em linha quando ativo mas move-os para o menu quando em repouso.',dim_chips:"Escurecer chips em repouso para um aspeto mais limpo.",hold_to_pin:"Manter premido para fixar em vez de toque curto.",always_show_group:"Os controles de agrupamento r\xE1pido (+/-/estrela) estar\xE3o vis\xEDveis por padr\xE3o ao carregar a p\xE1gina. Voc\xEA ainda pode altern\xE1-los manualmente atrav\xE9s de um toque duplo.",disable_autofocus:"Evitar que a procura tome o foco automaticamente.",search_within_filter:"Procurar no filtro ativo (Favoritos, etc.).",close_search_on_play:"Fechar procura ao reproduzir.",pin_search_headers:"Fixar cabe\xE7alhos de procura ao fazer scroll.",hide_search_headers_on_idle:"Ocultar pesquisa e filtros quando inativo.",disable_mass:"Desativar integra\xE7\xE3o Mass Queue.",swap_pause_stop:"Substituir pausa por stop no design moderno.",adaptive_controls:"Permitir que os bot\xF5es se adaptem ao espa\xE7o.",hide_menu_player:"Ocultar nome da entidade quando no menu.",adaptive_text:"Escolher que textos se adaptam ao espa\xE7o.",collapse_expand:"Sempre contra\xEDdo ativa modo mini. Expandir ao procurar expande temporariamente.",idle_screen:"Escolher ecr\xE3 a mostrar em repouso.",hide_controls:"Selecionar controlos a ocultar.",hide_search_chips:"Ocultar chips de filtro de procura.",hide_active_entity_on_idle:"Oculta a etiqueta da entidade na parte inferior do cart\xE3o apenas quando o reprodutor est\xE1 inativo.",follow_active_entity:"A entidade de volume seguir\xE1 a ativa.",search_limit_full:"M\xE1ximo de resultados (default: 20).",default_search_filter_full:"Escolha qual filtro est\xE1 ativo por padr\xE3o quando a tela de pesquisa \xE9 aberta.",default_search_favorites:"Iniciar pesquisa com favoritos ativos",result_sorting_full:"Escolher ordem dos resultados.",card_height_full:"Deixar vazio para altura autom\xE1tica.",control_layout_full:"Escolher entre design antigo ou moderno.",artwork_extend:"Estender capa sob os chips.",artwork_extend_label:"Estender capa",no_artwork_overrides:"Sem substitui\xE7\xF5es de capa configuradas.",entity_current_hint:"Use 'entity_id: current' para o leitor atual.",service_data_note:"As altera\xE7\xF5es s\xE3o guardadas ao premir 'Guardar'.",jinja_template_hint:"Modelo Jinja para entity_id.",jinja_template_vol_hint:"Modelo para entidade volume.",not_available_alt_collapsed:"N\xE3o dispon\xEDvel em modo contra\xEDdo.",not_available_collapsed:"N\xE3o dispon\xEDvel se contra\xEDdo.",only_available_collapsed:"Apenas dispon\xEDvel se contra\xEDdo.",only_available_modern:"Apenas dispon\xEDvel com layout Moderno.",image_url_helper:"Insira um URL direto para uma imagem ou um caminho de arquivo local",selected_entity_helper:"Helper de texto de entrada que ser\xE1 atualizado com o ID da entidade do reprodutor de m\xEDdia selecionado no momento.",select_entity_helper:"Helper de texto de entrada do qual ler o ID da entidade. O cart\xE3o selecionar\xE1 automaticamente o chip correspondente.",sync_entity_type:"Escolha qual ID de entidade sincronizar com o helper (padr\xE3o entidade Music Assistant se configurada).",disable_auto_select:"Impede que o chip desta entidade seja selecionado automaticamente quando a reprodu\xE7\xE3o \xE9 iniciada.",search_view:"Escolha entre uma lista padr\xE3o ou uma grade de cart\xF5es para os resultados da pesquisa.",search_card_columns:"Especifique quantas colunas usar na visualiza\xE7\xE3o de cart\xF5es. A capa ser\xE1 redimensionada automaticamente.",card_type:"Escolha o modo do cart\xE3o. 'Padr\xE3o' \xE9 o reprodutor de m\xEDdia padr\xE3o. 'Busca dedicada' torna o cart\xE3o uma interface de busca permanente.",always_show_lyrics:"Abrir automaticamente a visualiza\xE7\xE3o de letras quando a p\xE1gina for atualizada.",lyrics_source:"O Music Assistant requer a integra\xE7\xE3o mass_queue para obter letras do seu motor de metadados interno.",lyrics_pre_roll:"Ajuste o tempo de destaque da letra. Valores positivos aceleram, valores negativos atrasam (padr\xE3o: 0).",blurred_artwork:"Sempre desfocar a imagem de fundo",hide_collapsed_artwork:"Ocultar a imagem pequena \xE0 direita quando o cart\xE3o estiver recolhido",show_idle_artwork_when_not_playing:"Quando ativado, a sele\xE7\xE3o de uma ficha que n\xE3o esteja sendo reproduzida exibir\xE1 a imagem de repouso configurada em vez da imagem de reprodu\xE7\xE3o ativa.",prefer_ma_metadata:"Utilizar sempre a entidade Music Assistant emparelhada para o t\xEDtulo da faixa, artista e arte, mesmo que a entidade prim\xE1ria esteja a ser reproduzida.",show_volume_overlay:"Exibe brevemente um indicador de volume grande sobre a arte quando o n\xEDvel de volume muda."},titles:{edit_entity:"Editar entidade",edit_action:"Editar a\xE7\xE3o",service_data:"Dados do servi\xE7o",add_artwork_override:"Adicionar substitui\xE7\xE3o"},labels:{dim_chips:"Escurecer chips em repouso",hold_to_pin:"Manter para fixar",always_show_group:"Grupo r\xE1pido por padr\xE3o",disable_autofocus:"Desativar autofoco",keep_filters:"Manter filtros",dismiss_on_play:"Fechar ao reproduzir",pin_headers:"Fixar cabe\xE7alhos",hide_search_headers_on_idle:"Ocultar cabe\xE7alhos em inatividade",default_search_filter:"Filtro de pesquisa padr\xE3o",default_search_favorites:"Filtro de favoritos padr\xE3o",disable_mass:"Desativar Mass Queue",match_theme:"Seguir tema",alt_progress:"Barra de progresso alternativa",progress_bar_height:"Altura da barra de progresso",display_timestamps:"Mostrar carimbos de tempo",swap_pause_stop:"Substituir Pausa por Stop",adaptive_controls:"Tamanho adaptativo",hide_active_entity:"Ocultar nome da entidade ativa",hide_active_entity_on_idle:"Ocultar etiqueta de entidade ativa quando inativo",collapse_on_idle:"Contrair em repouso",hide_menu_player_toggle:"Ocultar leitor do menu",always_collapsed:"Sempre contra\xEDdo",expand_on_search:"Expandir ao procurar",script_var:"Vari\xE1vel script (yamp_entity)",use_ma_template:"Usar modelo MA",use_vol_template:"Usar modelo Volume",follow_active_entity:"Volume segue a entidade ativa",use_url_path:"Usar URL ou caminho",adaptive_text_elements:"Elementos de texto adaptativo",disable_auto_select:"Desativar sele\xE7\xE3o autom\xE1tica",always_show_lyrics:"Mostrar sempre as letras",lyrics_mode:"Modo de letras",lyrics_source:"Fonte das letras",lyrics_pre_roll:"Antecipa\xE7\xE3o de letra (segundos)",blurred_artwork:"Imagem desfocada",hide_collapsed_artwork:"Ocultar imagem reduzida",show_idle_artwork_when_not_playing:"Mostrar imagem de repouso quando n\xE3o reproduzindo",prefer_ma_metadata:"Preferir metadados do Music Assistant",show_volume_overlay:"Mostrar sobreposi\xE7\xE3o de volume"},fields:{artwork_fit:"Ajuste",artwork_position:"Posi\xE7\xE3o",artwork_hostname:"Host",match_field:"Campo",match_value:"Valor",size_percent:"Tamanho (%)",object_fit:"Object Fit",idle_timeout:"Repouso (ms)",show_chip_row:"Mostrar chips",search_limit:"Limite de procura",result_sorting:"Ordem",vol_step:"Passo de volume",card_height:"Altura (px)",control_layout:"Design",save_service_data:"Guardar",image_url:"URL imagem",fallback_image_url:"URL de reserva",move_to_main:"Mover para chips principais",move_to_menu:"Mover para o menu",delete_action:"Eliminar a\xE7\xE3o",revert_service_data:"Anular altera\xE7\xF5es",test_action:"Testar a\xE7\xE3o",volume_mode:"Modo volume",idle_screen:"Ecr\xE3 de repouso",name:"Nome",hidden_controls:"Controlos ocultos",ma_template:"Modelo MA (Jinja)",hidden_chips:"Chips ocultos",vol_template:"Modelo Volume (Jinja)",icon:"\xCDcone",action_type:"Tipo de a\xE7\xE3o",menu_item:"Item de menu",nav_path:"Caminho",service:"Servi\xE7o",service_data:"Dados",idle_image_entity:"Entidade imagem repouso",match_entity:"Entidade",ma_entity:"Entidade Music Assistant",vol_entity:"Entidade de volume",selected_entity_helper:"Helper de entidade selecionada",sync_entity_type:"Tipo de entidade a sincronizar",placement:"Posicionamento",card_trigger:"Gatilho do cart\xE3o",search_view:"Vista de resultados de pesquisa",search_card_columns:"Colunas de cart\xF5es",card_type:"Tipo de cart\xE3o",appearance:"Apar\xEAncia",no_artwork_option:"Sem imagem",details_alignment:"Alinhamento de detalhes"},action_types:{menu:"Abrir um item do menu",service:"Chamar um servi\xE7o",navigate:"Navegar",prev_entity:"Chip da entidade anterior",next_entity:"Chip da pr\xF3xima entidade",sync_selected_entity:"Sincronizar entidade selecionada",select_entity:"Selecionar entidade do helper",toggle_lyrics:"Alternar sobreposi\xE7\xE3o de letras"},action_helpers:{sync_selected_entity:"Sincronizar entidade selecionada \u2192",select_entity:"Selecionar entidade \u2190",select_helper:"(selecionar helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entidade Music Assistant se configurada)",yamp_main_entity:"yamp_main_entity (Entidade principal do reprodutor)",yamp_playback_entity:"yamp_playback_entity (Entidade de reprodu\xE7\xE3o ativa atual)"},placements:{chip:"Chip de a\xE7\xE3o",menu:"No menu",hidden:"Oculto (Toque no Artwork)",not_triggerable:"N\xE3o acion\xE1vel"},triggers:{none:"Nenhum",tap:"Toque",hold:"Manter premido",double_tap:"Toque duplo",swipe_left:"Deslizar para a esquerda",swipe_right:"Deslizar para a direita"},search_view_options:{list:"Lista",card:"Cart\xE3o",card_minimal:"Cart\xE3o minimalista"},card_type_options:{default:"Padr\xE3o",search:"Procurar",group_players:"Agrupar"},appearance_options:{automatic:"Autom\xE1tico",light:"Claro",dark:"Escuro"},artwork_fit:{default:"Padr\xE3o",cover:"Capa (padr\xE3o)",contain:"Conter",fill:"Preencher","scale-down":"Reduzir","scaled-contain":"Conter dimensionado","scaled-contain-alternate":"Conter dimensionado alternativo",none:"Nenhum"}},card:{sections:{details:"Detalhes de reprodu\xE7\xE3o",menu:"Menu e Procura",action_chips:"Chips de a\xE7\xE3o"},media_controls:{shuffle:"Aleat\xF3rio",previous:"Anterior",play_pause:"Reproduzir/Pausa",stop:"Parar",next:"Seguinte",repeat:"Repetir"},menu:{more_info:"Mais info",search:"Procurar",source:"Fonte",show_lyrics:"Mostrar letras",hide_lyrics:"Ocultar letras",transfer_queue:"Transferir fila",group_players:"Agrupar",select_entity:"Selecionar",transfer_to:"Transferir para",no_players:"Sem leitores MA."},grouping:{title:"Agrupar",sync_volume:"Sincronizar volume",group_all:"Agrupar todos",ungroup_all:"Separar todos",unavailable:"Indispon\xEDvel",no_players:"N\xE3o agrup\xE1vel.",master:"Mestre",joined:"Unido",available:"Dispon\xEDvel",current:"Atual",unjoin_from:"Desvincular de {master}",join_with:"Juntar-se a {master}"}},search:{favorites:"Favoritos",recently_played:"Recentes",next_up:"A seguir",recommendations:"Recomenda\xE7\xF5es",radio_mode:"Modo R\xE1dio",show_track_options:"Mostrar op\xE7\xF5es da faixa",play_similar:"Tocar m\xFAsicas semelhantes",close:"Fechar",no_results:"Sem resultados.",play_next:"Reproduzir seguinte",replace_play:"Substituir e reproduzir",replace:"Substituir fila",add_queue:"Adicionar ao fim",move_up:"Subir",move_down:"Descer",move_next:"Passar para seguinte",remove:"Remover da fila",added:"Adicionado!",added_to_playlist:"Adicionado \xE0 playlist!",select_playlist:"Selecionar playlist para '{track}'",add_to_playlist:"Adicionar \xE0 playlist",select_track_for_playlist:"Selecionar a faixa a adicionar para '{track}' de {artist}",labels:{replace:"Substituir",next:"Seguinte",replace_next:"Subst. seg.",add:"Adicionar",add_to_playlist:"Adicionar \xE0 playlist"},results:"resultados",result:"resultado",filters:{all:"Tudo",artist:"Artista",album:"\xC1lbum",track:"Faixa",playlist:"Lista",radio:"R\xE1dio",music:"M\xFAsica",station:"Esta\xE7\xE3o",podcast:"Podcast",audiobook:"Audiolivro"},search_artist:"Procurar este artista",browse_album:"Explorar faixas de {album}",play_collection:"Reproduzir esta cole\xE7\xE3o",play_collection_error:"N\xE3o \xE9 poss\xEDvel reproduzir esta cole\xE7\xE3o diretamente",play_item:"Reproduzir {item}"},lyrics:{finding:"Procurando letra...",none_found:"Nenhuma letra encontrada",not_available:"Letra n\xE3o dispon\xEDvel",instrumental:"Faixa instrumental"},lyrics_sources:{mass_lrclib:"Music Assistant (Alternativa para LRCLIB)",mass:"Apenas Music Assistant",lrclib:"Apenas LRCLIB",lrclib_mass:"LRCLIB (Alternativa para Music Assistant)"},lyrics_modes:{default:"Padr\xE3o (Destacar e rolar)",scroll:"Apenas rolar",text:"Apenas texto"}},fo={common:{not_found:"Entita sa nena\u0161la.",search:"H\u013Eada\u0165",power:"Nap\xE1janie",favorite:"Ob\u013E\xFAben\xE9",loading:"Na\u010D\xEDtava sa...",no_results:"\u017Diadne v\xFDsledky.",close:"Zatvori\u0165",vol_up:"Zv\xFD\u0161i\u0165 hlasitos\u0165",vol_down:"Zn\xED\u017Ei\u0165 hlasitos\u0165",media_player:"Prehr\xE1va\u010D m\xE9di\xED",edit_entity:"Upravi\u0165 nastavenia entity",edit_action:"Upravi\u0165 nastavenia akcie",mute:"Stlmi\u0165",unmute:"Zru\u0161i\u0165 stlmenie",seek:"Posun\xFA\u0165",volume:"Hlasitos\u0165",play_now:"Prehra\u0165 teraz",more_options:"Viac mo\u017Enost\xED",unavailable:"Nedostupn\xE9",back:"Sp\xE4\u0165",cancel:"Zru\u0161i\u0165",reset_default:"Obnovi\u0165 predvolen\xE9",unpin:"Odpn\xFA\u0165",clear:"Vymaza\u0165",album_art:"Grafika albumu"},editor:{tabs:{entities:"Entity",behavior:"Spr\xE1vanie",look_and_feel:"Vzh\u013Ead a dojem",artwork:"Grafika",actions:"Akcie"},placeholders:{search:"H\u013Eada\u0165 hudbu..."},templates:{minimal_mini:{label:"MINImal",description:"Kompaktn\xE1 karta bez obalu."},normal_mini:{label:"Mini Mode",description:"\u0160tandardn\xE1 kompaktn\xE1 karta."}},sections:{artwork:{general:{title:"V\u0161eobecn\xE9 nastavenia",description:"Glob\xE1lne ovl\xE1danie toho, ako sa grafika zobrazuje a z\xEDskava."},idle:{title:"Grafika pri ne\u010Dinnosti",description:"Zobrazi\u0165 statick\xFD obr\xE1zok alebo sn\xEDmku entity, ke\u010F sa ni\u010D neprehr\xE1va."},overrides:{title:"Prep\xEDsania grafiky",description:"Prep\xEDsania sa vyhodnocuj\xFA zhora nadol. Poradie zmen\xEDte potiahnut\xEDm."}},entities:{title:"Entity*",description:"Pridajte prehr\xE1va\u010De m\xE9di\xED, ktor\xE9 chcete ovl\xE1da\u0165. Potiahnut\xEDm ent\xEDt zmen\xEDte poradie v riadku \u010Dipov."},behavior:{idle_chips:{title:"Ne\u010Dinnos\u0165 a \u010Dipy",description:"Vyberte, kedy karta prejde do ne\u010Dinnosti a ako sa spr\xE1vaj\xFA \u010Dipy ent\xEDt."},interactions_search:{title:"Interakcie a h\u013Eadanie",description:"Doladenie prip\xEDnania ent\xEDt a po\u010Dtu zobrazen\xFDch v\xFDsledkov."},lyrics:{title:"Texty piesn\xED",description:"Nastavte, ako sa maj\xFA texty piesn\xED zobrazova\u0165 a kedy sa maj\xFA objavi\u0165."}},look_and_feel:{theme_layout:{title:"T\xE9ma a rozlo\u017Eenie",description:"Prisp\xF4sobte \u0161t\xFDl panelu a ovl\xE1dajte celkov\xFD vzh\u013Ead."},controls_typography:{title:"Ovl\xE1danie a typografia",description:"Nastavenie ve\u013Ekosti tla\u010Didiel, \u0161t\xEDtkov ent\xEDt a adapt\xEDvneho textu."},collapsed_idle:{title:"Zbalen\xE9 stavy a ne\u010Dinnos\u0165",description:"Ovl\xE1dajte, kedy sa karta zbal\xED a ktor\xE9 zobrazenia sa uk\xE1\u017Eu po\u010Das ne\u010Dinnosti."}},actions:{title:"Akcie",description:"Vytvorte ak\u010Dn\xE9 \u010Dipy, ktor\xE9 sa zobrazia na karte alebo v jej menu. Potiahnut\xEDm zmen\xEDte poradie, kliknut\xEDm na ceruzku akciu nakonfigurujete."}},subtitles:{idle_timeout:"\u010Cas v milisekund\xE1ch, k\xFDm karta prejde do re\u017Eimu ne\u010Dinnosti. Nastavte na 0 pre vypnutie.",show_chip_row:'"Auto" skryje riadok \u010Dipov, ak je nakonfigurovan\xE1 len jedna entita. "V menu" presunie \u010Dipy do ponuky menu. "V menu pri ne\u010Dinnosti" zobraz\xED \u010Dipy v riadku ke\u010F je akt\xEDvne, ale presunie ich do menu pri ne\u010Dinnosti.',dim_chips:"Ke\u010F karta prejde do re\u017Eimu ne\u010Dinnosti s obr\xE1zkom, stlmte \u010Dipy ent\xEDt a akci\xED pre \u010Distej\u0161\xED vzh\u013Ead.",hold_to_pin:"Dlh\xFDm stla\u010Den\xEDm \u010Dipov ent\xEDt ich pripnete, \u010D\xEDm zabr\xE1nite automatick\xE9mu prep\xEDnaniu po\u010Das prehr\xE1vania.",always_show_group:"Ovl\xE1dacie prvky r\xFDchleho zoskupovania (+/-/hviezdi\u010Dka) bud\xFA predvolene vidite\u013En\xE9 pri na\u010D\xEDtan\xED str\xE1nky. St\xE1le ich m\xF4\u017Eete manu\xE1lne prep\xEDna\u0165 dvojit\xFDm klepnut\xEDm.",disable_autofocus:"Zabr\xE1ni vyh\u013Ead\xE1vaciemu po\u013Eu prebra\u0165 zameranie, aby zostali kl\xE1vesnice na obrazovke skryt\xE9.",search_within_filter:"Povoli\u0165 vyh\u013Ead\xE1vanie v r\xE1mci aktu\xE1lneho akt\xEDvneho filtra (Ob\u013E\xFAben\xE9, Ned\xE1vno prehr\xE1van\xE9 at\u010F.) namiesto jeho vymazania.",close_search_on_play:"Automaticky zatvori\u0165 obrazovku vyh\u013Ead\xE1vania po spusten\xED skladby.",pin_search_headers:"Ponecha\u0165 pole vyh\u013Ead\xE1vania a filtre pevne navrchu po\u010Das pos\xFAvania v\xFDsledkov.",hide_search_headers_on_idle:"Skry\u0165 vyh\u013Ead\xE1vanie a filtre, ke\u010F je prehr\xE1va\u010D ne\u010Dinn\xFD.",disable_mass:"Deaktivova\u0165 volite\u013En\xFA integr\xE1ciu Mass Queue, aj ke\u010F je nain\u0161talovan\xE1.",swap_pause_stop:"Nahradi\u0165 tla\u010Didlo pauzy tla\u010Didlom zastavenia pri pou\u017Eit\xED modern\xE9ho rozlo\u017Eenia.",adaptive_controls:"Umo\u017Eni\u0165 tla\u010Didl\xE1m prehr\xE1vania meni\u0165 ve\u013Ekos\u0165 pod\u013Ea dostupn\xE9ho priestoru.",hide_menu_player:"Ke\u010F s\xFA \u010Dipy v menu, skry\u0165 n\xE1zov entity v spodnej \u010Dasti karty.",adaptive_text:"Vyberte skupiny textu, ktor\xE9 sa maj\xFA \u0161k\xE1lova\u0165 pod\u013Ea priestoru (nechajte pr\xE1zdne pre vypnutie).",collapse_expand:'"V\u017Edy zbalen\xE9" vytvor\xED re\u017Eim mini prehr\xE1va\u010Da. "Rozbali\u0165 pri h\u013Eadan\xED" kartu do\u010Dasne rozbal\xED pri vyh\u013Ead\xE1van\xED.',idle_screen:"Vyberte obrazovku, ktor\xE1 sa m\xE1 automaticky zobrazi\u0165 v re\u017Eime ne\u010Dinnosti.",hide_controls:"Vyberte ovl\xE1dacie prvky, ktor\xE9 chcete pre t\xFAto entitu skry\u0165 (\u0161tandardne s\xFA zobrazen\xE9 v\u0161etky).",hide_search_chips:"Skry\u0165 konkr\xE9tne \u010Dipy filtra vyh\u013Ead\xE1vania pre t\xFAto entitu.",hide_active_entity_on_idle:"Skryje \u0161t\xEDtok entity v dolnej \u010Dasti karty iba vtedy, ke\u010F je prehr\xE1va\u010D ne\u010Dinn\xFD.",follow_active_entity:"Ak je povolen\xE9, entita hlasitosti bude automaticky sledova\u0165 akt\xEDvny prehr\xE1va\u010D. Pozn\xE1mka: Toto prep\xED\u0161e vybran\xFA entitu hlasitosti.",search_limit_full:"Maxim\xE1lny po\u010Det v\xFDsledkov vyh\u013Ead\xE1vania (predvolen\xE9: 20).",default_search_filter_full:"Vyberte, ktor\xFD filter bude predvolene akt\xEDvny pri otvoren\xED vyh\u013Ead\xE1vania.",default_search_favorites:"Spusti\u0165 vyh\u013Ead\xE1vanie s akt\xEDvnymi ob\u013E\xFAben\xFDmi",result_sorting_full:"Vyberte sp\xF4sob zoradenia v\xFDsledkov. Predvolen\xE9 ponech\xE1va poradie zo zdroja.",card_height_full:"Nechajte pr\xE1zdne pre automatick\xFA v\xFD\u0161ku.",control_layout_full:"Vyberte si medzi star\u0161\xEDm (rovnako ve\u013Ek\xE9 prvky) alebo modern\xFDm rozlo\u017Een\xEDm Home Assistant.",artwork_extend:"Umo\u017Eni\u0165 pozadiu grafiky pokra\u010Dova\u0165 pod riadkami \u010Dipov a akci\xED.",artwork_extend_label:"Roz\u0161\xEDri\u0165 grafiku",no_artwork_overrides:"Nie s\xFA nastaven\xE9 \u017Eiadne prep\xEDsania grafiky. Pridajte ich pomocou tla\u010Didla plus.",entity_current_hint:"Pou\u017Eite 'entity_id: current' na zacielenie aktu\xE1lne vybranej entity na karte. Pozn\xE1mka: Tla\u010Didlo 'Testova\u0165 akciu' bude v tomto pr\xEDpade neakt\xEDvne.",service_data_note:"Zmeny v servisn\xFDch \xFAdajoch sa neulo\u017Eia, k\xFDm nekliknete na tla\u010Didlo 'Ulo\u017Ei\u0165 servisn\xE9 \xFAdaje'!",jinja_template_hint:"Zadajte Jinja \u0161abl\xF3nu, ktor\xE1 vr\xE1ti jedno entity_id. Pr\xEDklad prep\xEDnania MA na z\xE1klade v\xFDberu zdroja:",jinja_template_vol_hint:"Zadajte Jinja \u0161abl\xF3nu, ktor\xE1 vr\xE1ti entity_id (napr. media_player.obyvacka). Pr\xEDklad prep\xEDnania hlasitosti pod\u013Ea stavu:",not_available_alt_collapsed:"Nedostupn\xE9 s alternat\xEDvnym indik\xE1torom priebehu alebo v re\u017Eime V\u017Edy zbalen\xE9.",not_available_collapsed:"Nedostupn\xE9, ke\u010F je zapnut\xE9 V\u017Edy zbalen\xE9.",only_available_collapsed:"Dostupn\xE9 len pri zapnutom re\u017Eime V\u017Edy zbalen\xE9.",only_available_modern:"Dostupn\xE9 len s modern\xFDm rozlo\u017Een\xEDm.",image_url_helper:"Zadajte priamu URL na obr\xE1zok alebo lok\xE1lnu cestu k s\xFAboru",selected_entity_helper:"Pomocn\xEDk pre vstupn\xFD text, ktor\xFD bude aktualizovan\xFD o ID aktu\xE1lne vybranej entity prehr\xE1va\u010Da m\xE9di\xED.",select_entity_helper:"Pomocn\xEDk pre vstupn\xFD text, z ktor\xE9ho sa \u010D\xEDta ID entity. Karta automaticky vyberie zodpovedaj\xFAci \u010Dip.",sync_entity_type:"Vyberte, ktor\xE9 ID entity sa m\xE1 synchronizova\u0165 s pomocn\xEDkom (predvolene entita Music Assistant, ak je nakonfigurovan\xE1).",disable_auto_select:"Zabr\xE1ni automatick\xE9mu v\xFDberu \u010Dipu tejto entity pri spusten\xED prehr\xE1vania.",search_view:"Vyberte si medzi \u0161tandardn\xFDm zoznamom alebo mrie\u017Ekou kariet pre v\xFDsledky vyh\u013Ead\xE1vania.",search_card_columns:"Zadajte, ko\u013Eko st\u013Apcov sa m\xE1 pou\u017Ei\u0165 v zobrazen\xED karty. Grafika sa automaticky prisp\xF4sob\xED.",card_type:"Vyberte re\u017Eim karty. 'Predvolen\xE9' je \u0161tandardn\xFD prehr\xE1va\u010D m\xE9di\xED. 'Vyhraden\xE9 vyh\u013Ead\xE1vanie' urob\xED z karty trval\xE9 rozhranie na vyh\u013Ead\xE1vanie.",always_show_lyrics:"Automaticky otvori\u0165 zobrazenie textov piesn\xED pri obnoven\xED str\xE1nky.",lyrics_source:"Music Assistant vy\u017Eaduje integr\xE1ciu mass_queue na na\u010D\xEDtanie textov z jeho intern\xE9ho metad\xE1tov\xE9ho modulu.",lyrics_pre_roll:"Posunutie na\u010Dasovania zv\xFDraznenia textu piesne. Kladn\xE9 hodnoty ho zr\xFDch\u013Euj\xFA, z\xE1porn\xE9 spoma\u013Euj\xFA (predvolen\xE9: 0).",blurred_artwork:"V\u017Edy rozmaza\u0165 obr\xE1zok na pozad\xED",hide_collapsed_artwork:"Skry\u0165 mal\xFD obr\xE1zok vpravo, ke\u010F je karta zbalen\xE1",show_idle_artwork_when_not_playing:"Ke\u010F je t\xE1to mo\u017Enos\u0165 povolen\xE1, pri v\xFDbere \u010Dipu, na ktorom sa moment\xE1lne ni\u010D neprehr\xE1va, sa namiesto akt\xEDvnej grafiky prehr\xE1vania zobraz\xED nakonfigurovan\xFD obr\xE1zok pri ne\u010Dinnosti.",prefer_ma_metadata:"V\u017Edy pou\u017E\xEDvajte sp\xE1rovan\xFA entitu Music Assistant pre n\xE1zov skladby, interpreta a grafiku, aj ke\u010F sa prehr\xE1va prim\xE1rna entita.",show_volume_overlay:"Pri zmene \xFArovne hlasitosti nakr\xE1tko zobraz\xED ve\u013Ek\xFD ukazovate\u013E hlasitosti cez grafiku albumu."},titles:{edit_entity:"Upravi\u0165 entitu",edit_action:"Upravi\u0165 akciu",service_data:"Servisn\xE9 \xFAdaje",add_artwork_override:"Prida\u0165 prep\xEDsanie grafiky"},labels:{dim_chips:"Stlmi\u0165 \u010Dipy pri ne\u010Dinnosti",hold_to_pin:"Podr\u017Ea\u0165 pre pripnutie",always_show_group:"R\xFDchle zoskupovanie ako predvolen\xE9",disable_autofocus:"Vypn\xFA\u0165 automatick\xE9 zameranie h\u013Eadania",keep_filters:"Zachova\u0165 filtre pri h\u013Eadan\xED",dismiss_on_play:"Zavrie\u0165 h\u013Eadanie po spusten\xED",pin_headers:"Pripn\xFA\u0165 hlavi\u010Dky h\u013Eadania",hide_search_headers_on_idle:"Skry\u0165 hlavi\u010Dky pri ne\u010Dinnosti",default_search_filter:"Predvolen\xFD filter vyh\u013Ead\xE1vania",default_search_favorites:"Predvolen\xFD filter ob\u013E\xFAben\xFDch",disable_mass:"Deaktivova\u0165 Mass Queue",match_theme:"Pod\u013Ea t\xE9my",alt_progress:"Alternat\xEDvny indik\xE1tor priebehu",progress_bar_height:"V\xFD\u0161ka indik\xE1tora priebehu",display_timestamps:"Zobrazi\u0165 \u010Dasov\xE9 \xFAdaje",swap_pause_stop:"Vymeni\u0165 pauzu za stop",adaptive_controls:"Adapt\xEDvna ve\u013Ekos\u0165 ovl\xE1dania",hide_active_entity:"Skry\u0165 \u0161t\xEDtok akt\xEDvnej entity",hide_active_entity_on_idle:"Skry\u0165 \u0161t\xEDtok akt\xEDvnej entity pri ne\u010Dinnosti",collapse_on_idle:"Zbali\u0165 pri ne\u010Dinnosti",hide_menu_player_toggle:"Skry\u0165 prehr\xE1va\u010D v menu",always_collapsed:"V\u017Edy zbalen\xE9",expand_on_search:"Rozbali\u0165 pri h\u013Eadan\xED",script_var:"Premenn\xE1 skriptu (yamp_entity)",use_ma_template:"Pou\u017Ei\u0165 \u0161abl\xF3nu pre Music Assistant",use_vol_template:"Pou\u017Ei\u0165 \u0161abl\xF3nu pre entitu hlasitosti",follow_active_entity:"Hlasitos\u0165 sleduje akt\xEDvnu entitu",use_url_path:"Pou\u017Ei\u0165 URL alebo cestu",adaptive_text_elements:"Prvky s adapt\xEDvnou ve\u013Ekos\u0165ou textu",disable_auto_select:"Zak\xE1za\u0165 automatick\xFD v\xFDber",always_show_lyrics:"V\u017Edy zobrazi\u0165 texty piesn\xED",lyrics_mode:"Re\u017Eim textov piesn\xED",lyrics_source:"Zdroj textov",lyrics_pre_roll:"Pre-roll textu piesne (sekundy)",blurred_artwork:"Rozmazan\xFD obr\xE1zok",hide_collapsed_artwork:"Skry\u0165 zmen\u0161en\xFD obr\xE1zok",show_idle_artwork_when_not_playing:"Zobrazi\u0165 obr\xE1zok ne\u010Dinnosti, ke\u010F sa neprehr\xE1va",prefer_ma_metadata:"Uprednostni\u0165 metad\xE1ta z Music Assistant",show_volume_overlay:"Zobrazi\u0165 prekrytie hlasitosti"},fields:{artwork_fit:"Prisp\xF4sobenie grafiky",artwork_position:"Poz\xEDcia grafiky",artwork_hostname:"Hostname pre grafiku",match_field:"Pole pre zhodu",match_value:"Hodnota pre zhodu",size_percent:"Ve\u013Ekos\u0165 (%)",object_fit:"Prisp\xF4sobenie objektu (Fit)",idle_timeout:"\u010Cas ne\u010Dinnosti (ms)",show_chip_row:"Zobrazi\u0165 riadok \u010Dipov",search_limit:"Limit v\xFDsledkov h\u013Eadania",result_sorting:"Zoradenie v\xFDsledkov",vol_step:"Krok hlasitosti (0.05 = 5%)",card_height:"V\xFD\u0161ka karty (px)",control_layout:"Rozlo\u017Eenie ovl\xE1dania",save_service_data:"Ulo\u017Ei\u0165 servisn\xE9 \xFAdaje",image_url:"URL obr\xE1zka",fallback_image_url:"Z\xE1lo\u017En\xE1 URL obr\xE1zka",move_to_main:"Presun\xFA\u0165 do hlavn\xFDch \u010Dipov",move_to_menu:"Presun\xFA\u0165 do menu",delete_action:"Vymaza\u0165 akciu",revert_service_data:"Vr\xE1ti\u0165 ulo\u017Een\xE9 servisn\xE9 \xFAdaje",test_action:"Testova\u0165 akciu",volume_mode:"Re\u017Eim hlasitosti",idle_screen:"Obrazovka pri ne\u010Dinnosti",name:"N\xE1zov",hidden_controls:"Skryt\xE9 ovl\xE1dacie prvky",ma_template:"Jinja \u0161abl\xF3na pre Music Assistant",hidden_chips:"Skryt\xE9 \u010Dipy filtrov h\u013Eadania",vol_template:"Jinja \u0161abl\xF3na pre hlasitos\u0165",icon:"Ikona",action_type:"Typ akcie",menu_item:"Polo\u017Eka menu",nav_path:"Cesta navig\xE1cie",service:"Slu\u017Eba",service_data:"Servisn\xE9 \xFAdaje",idle_image_entity:"Entita obr\xE1zka pri ne\u010Dinnosti",match_entity:"Entita pre zhodu",ma_entity:"Entita Music Assistant",vol_entity:"Entita hlasitosti",selected_entity_helper:"Pomocn\xEDk vybratej entity",sync_entity_type:"Typ entity na synchroniz\xE1ciu",placement:"Umiestnenie",card_trigger:"Sp\xFA\u0161\u0165a\u010D karty",search_view:"Zobrazenie v\xFDsledkov vyh\u013Ead\xE1vania",search_card_columns:"St\u013Apce karty",card_type:"Typ karty",appearance:"Vzh\u013Ead",no_artwork_option:"\u017Diadny obr\xE1zok",details_alignment:"Zarovnanie detailov"},action_types:{menu:"Otvori\u0165 polo\u017Eku menu karty",service:"Zavola\u0165 slu\u017Ebu",navigate:"Navigova\u0165",prev_entity:"Predo\u0161l\xFD \u010Dip entity",next_entity:"\u010Eal\u0161\xED \u010Dip entity",sync_selected_entity:"Synchronizova\u0165 vybran\xFA entitu",select_entity:"Vybra\u0165 entitu z pomocn\xEDka",toggle_lyrics:"Prepn\xFA\u0165 prekrytie textov piesn\xED"},action_helpers:{sync_selected_entity:"Synchronizova\u0165 vybran\xFA entitu \u2192",select_entity:"Vybra\u0165 entitu \u2190",select_helper:"(vybra\u0165 pomocn\xEDka)"},sync_entity_options:{yamp_entity:"yamp_entity (Entita Music Assistant, ak je nakonfigurovan\xE1)",yamp_main_entity:"yamp_main_entity (Hlavn\xE1 entita prehr\xE1va\u010Da m\xE9di\xED)",yamp_playback_entity:"yamp_playback_entity (Aktu\xE1lna akt\xEDvna entita prehr\xE1vania)"},placements:{chip:"Ak\u010Dn\xFD \u010Dip",menu:"V menu",hidden:"Skryt\xE9 (\u0164uknutie na grafiku)",not_triggerable:"Nespustite\u013En\xE9"},triggers:{none:"\u017Diadny",tap:"\u0164uknutie",hold:"Podr\u017Eanie",double_tap:"Dvojit\xE9 \u0165uknutie",swipe_left:"Potiahnutie do\u013Eava",swipe_right:"Potiahnutie doprava"},search_view_options:{list:"Zoznam",card:"Karta",card_minimal:"Minim\xE1lna karta"},card_type_options:{default:"Predvolen\xE9",search:"H\u013Eada\u0165",group_players:"Zoskupi\u0165 prehr\xE1va\u010De"},appearance_options:{automatic:"Automaticky",light:"Svetl\xFD",dark:"Tmav\xFD"},artwork_fit:{default:"Predvolen\xE9",cover:"Obal (predvolen\xE9)",contain:"Prisp\xF4sobi\u0165",fill:"Vyplni\u0165","scale-down":"Zmen\u0161i\u0165","scaled-contain":"\u0160k\xE1lovan\xE9 prisp\xF4sobenie","scaled-contain-alternate":"\u0160k\xE1lovan\xE9 prisp\xF4sobenie alternat\xEDvne",none:"\u017Diadne"}},card:{sections:{details:"Detaily prehr\xE1vania",menu:"Menu a vyh\u013Ead\xE1vanie",action_chips:"Ak\u010Dn\xE9 \u010Dipy"},media_controls:{shuffle:"N\xE1hodne",previous:"Predch\xE1dzaj\xFAce",play_pause:"Prehra\u0165/Pozastavi\u0165",stop:"Zastavi\u0165",next:"Nasleduj\xFAce",repeat:"Opakova\u0165"},menu:{more_info:"Viac inform\xE1ci\xED",search:"H\u013Eada\u0165",source:"Zdroj",show_lyrics:"Zobrazi\u0165 text piesne",hide_lyrics:"Skry\u0165 text piesne",transfer_queue:"Presun\xFA\u0165 frontu",group_players:"Zoskupi\u0165 prehr\xE1va\u010De",select_entity:"Vyberte entitu pre viac info",transfer_to:"Presun\xFA\u0165 frontu do",no_players:"\u017Diadne in\xE9 prehr\xE1va\u010De Music Assistant nie s\xFA k dispoz\xEDcii."},grouping:{title:"Zoskupi\u0165 prehr\xE1va\u010De",sync_volume:"Synchronizova\u0165 hlasitos\u0165",group_all:"Zoskupi\u0165 v\u0161etko",ungroup_all:"Zru\u0161i\u0165 zoskupenie v\u0161etk\xE9ho",unavailable:"Prehr\xE1va\u010D je nedostupn\xFD",no_players:"\u017Diadne in\xE9 prehr\xE1va\u010De schopn\xE9 zoskupenia nie s\xFA k dispoz\xEDcii.",master:"Hlavn\xFD (Master)",joined:"Pripojen\xFD",available:"Dostupn\xFD",current:"Aktu\xE1lny",unjoin_from:"Odpoji\u0165 od {master}",join_with:"Pripoji\u0165 k {master}"}},search:{favorites:"Ob\u013E\xFAben\xE9",recently_played:"Ned\xE1vno prehr\xE1van\xE9",next_up:"Nasleduj\xFAce",recommendations:"Odpor\xFA\u010Dania",radio_mode:"Re\u017Eim r\xE1dio",show_track_options:"Zobrazi\u0165 mo\u017Enosti skladby",play_similar:"Prehra\u0165 podobn\xE9 skladby",close:"Zatvori\u0165 vyh\u013Ead\xE1vanie",no_results:"\u017Diadne v\xFDsledky.",play_next:"Prehra\u0165 ako nasleduj\xFAce",replace_play:"Nahradi\u0165 frontu a prehra\u0165 teraz",replace:"Nahradi\u0165 frontu",add_queue:"Prida\u0165 na koniec fronty",move_up:"Posun\xFA\u0165 nahor",move_down:"Posun\xFA\u0165 nadol",move_next:"Presun\xFA\u0165 na nasleduj\xFAce",remove:"Odstr\xE1ni\u0165 z fronty",added:"Pridan\xE9 do fronty!",added_to_playlist:"Pridan\xE9 do playlistu!",select_playlist:"Vybra\u0165 playlist pre '{track}'",add_to_playlist:"Prida\u0165 do playlistu",select_track_for_playlist:"Vybra\u0165 skladbu na pridanie pre '{track}' od {artist}",labels:{replace:"Nahradi\u0165",next:"Nasleduj\xFAce",replace_next:"Nahradi\u0165 nasleduj\xFAce",add:"Prida\u0165",add_to_playlist:"Prida\u0165 do playlistu"},results:"v\xFDsledkov",result:"v\xFDsledok",filters:{all:"V\u0161etko",artist:"Interpret",album:"Album",track:"Skladba",playlist:"Playlist",radio:"R\xE1dio",music:"Hudba",station:"Stanica",podcast:"Podcast",audiobook:"Audiokniha"},search_artist:"H\u013Eada\u0165 tohto interpreta",browse_album:"Preh\u013Ead\xE1va\u0165 skladby z {album}",play_collection:"Prehra\u0165 t\xFAto kolekciu",play_collection_error:"T\xFAto kolekciu nie je mo\u017En\xE9 prehra\u0165 priamo",play_item:"Prehra\u0165 {item}"},lyrics:{finding:"H\u013Eadanie textu piesne...",none_found:"\u017Diadny text piesne sa nena\u0161iel",not_available:"Text piesne nie je k dispoz\xEDcii",instrumental:"In\u0161trument\xE1lna skladba"},lyrics_sources:{mass_lrclib:"Music Assistant (Z\xE1loha na LRCLIB)",mass:"Len Music Assistant",lrclib:"Len LRCLIB",lrclib_mass:"LRCLIB (Z\xE1loha na Music Assistant)"},lyrics_modes:{default:"Predvolen\xE9 (Zv\xFDrazni\u0165 a pos\xFAva\u0165)",scroll:"Len pos\xFAva\u0165",text:"Len text"}},go={common:{not_found:"Entiteta ni najdena.",search:"I\u0161\u010Di",power:"Napajanje",favorite:"Priljubljeno",loading:"Nalaganje...",no_results:"Ni rezultatov.",close:"Zapri",vol_up:"Pove\u010Daj glasnost",vol_down:"Zmanj\u0161aj glasnost",media_player:"Predvajalnik predstavnosti",edit_entity:"Uredi nastavitve entitete",edit_action:"Uredi nastavitve dejanja",mute:"Uti\u0161aj",unmute:"Vklopi zvok",seek:"Previj",volume:"Glasnost",play_now:"Predvajaj zdaj",more_options:"Ve\u010D mo\u017Enosti",unavailable:"Ni na voljo",back:"Nazaj",cancel:"Prekli\u010Di",reset_default:"Ponastavi na privzeto",unpin:"Odpni",clear:"Po\u010Disti",album_art:"Naslovnica albuma"},editor:{tabs:{entities:"Entitete",behavior:"Vedenje",look_and_feel:"Videz in ob\u010Dutek",artwork:"Grafika",actions:"Dejanja"},placeholders:{search:"I\u0161\u010Di glasbo..."},templates:{minimal_mini:{label:"MINImal",description:"Kompaktna kartica brez naslovnice."},normal_mini:{label:"Mini Mode",description:"Standardna kompaktna kartica."}},sections:{artwork:{general:{title:"Splo\u0161ne nastavitve",description:"Globalni nadzor nad prikazom in pridobivanjem grafike."},idle:{title:"Grafika v mirovanju",description:"Prika\u017Ei stati\u010Dno sliko ali posnetek entitete, ko se ni\u010D ne predvaja."},overrides:{title:"Prepis grafike",description:"Prepisi se ocenjujejo od zgoraj navzdol. Povlecite za spremembo vrstnega reda."}},entities:{title:"Entitete*",description:"Dodajte predvajalnike, ki jih \u017Eelite upravljati. Povlecite entitete za spremembo vrstnega reda."},behavior:{idle_chips:{title:"Mirovanje in \u010Dipi",description:"Izberite, kdaj kartica preide v mirovanje in kako se obna\u0161ajo \u010Dipi entitet."},interactions_search:{title:"Interakcije in iskanje",description:"Nastavite pripenjanje entitet in \u0161tevilo prikazanih rezultatov."},lyrics:{title:"Besedila",description:"Konfigurirajte, kako so besedila prikazana in kdaj se pojavijo."}},look_and_feel:{theme_layout:{title:"Tema in postavitev",description:"Ujemanje s slogom nadzorne plo\u0161\u010De in nadzor velikosti."},controls_typography:{title:"Kontrolniki in tipografija",description:"Prilagodite velikost gumbov, oznake entitet in prilagodljivo besedilo."},collapsed_idle:{title:"Strnjeno in mirovanje",description:"Nadzorujte, kdaj se kartica skr\u010Di in kaj se prika\u017Ee v mirovanju."}},actions:{title:"Dejanja",description:"Ustvarite \u010Dipe dejanj, ki se prika\u017Eejo na kartici ali v meniju."}},subtitles:{idle_timeout:"\u010Cas v milisekundah, preden kartica preide v mirovanje. Nastavite na 0 za izklop.",show_chip_row:'"Samodejno" skrije \u010Dipe, \u010De je nastavljena ena entiteta. "V meniju" jih premakne v meni. "V meniju med nedejavnostjo" prika\u017Ee \u010Dipe v vrstici, ko je aktivna, a jih premakne v meni med nedejavnostjo.',dim_chips:"Ko kartica preide v mirovanje s sliko, se \u010Dipi zatemnijo.",hold_to_pin:"Dolgi pritisk za pripenjanje entitet namesto kratkega.",always_show_group:"Kontrolni elementi za hitro zdru\u017Eevanje (+/-/zvezda) bodo privzeto vidni ob nalaganju strani. \u0160e vedno jih lahko ro\u010Dno preklopite z dvojnim tapom.",disable_autofocus:"Prepre\u010Di samodejni fokus iskalnega polja.",search_within_filter:"I\u0161\u010Di znotraj trenutnega filtra.",close_search_on_play:"Samodejno zapri iskanje ob predvajanju.",pin_search_headers:"Pripni iskalno polje in filtre na vrh.",hide_search_headers_on_idle:"Skrij iskalno polje in filtre med mirovanjem.",disable_mass:"Onemogo\u010Di integracijo Mass Queue.",swap_pause_stop:"Zamenjaj gumb pavze z gumbom zaustavitve med uporabo moderne postavitve.",adaptive_controls:"Prilagodi velikost gumbov glede na prostor.",hide_menu_player:"Skrij oznako entitete v meniju.",adaptive_text:"Izberi skupine besedila za prilagajanje velikosti.",collapse_expand:"Vedno skr\u010Deno ustvari mini predvajalnik.",idle_screen:"Izberi zaslon, prikazan v mirovanju.",hide_controls:"Izberi kontrolnike za skrivanje.",hide_search_chips:"Skrij dolo\u010Dene iskalne filtre.",hide_active_entity_on_idle:"Skrije oznako entitete na dnu kartice le, ko je predvajalnik v stanju mirovanja.",follow_active_entity:"Entiteta glasnosti sledi aktivni entiteti. Opomba: To prepi\u0161e izbrano entiteto za glasnost.",search_limit_full:"Najve\u010Dje \u0161tevilo rezultatov (privzeto: 20).",default_search_filter_full:"Izberite, kateri filter je privzeto aktiven ob odprtju iskanja.",default_search_favorites:"Za\u010Dni iskanje z aktivnimi priljubljenimi",result_sorting_full:"Izberi razvr\u0161\u010Danje rezultatov.",card_height_full:"Pustite prazno za samodejno vi\u0161ino.",control_layout_full:"Izberi med staro in moderno postavitvijo.",artwork_extend:"Raz\u0161iri ozadje grafike pod \u010Dipe.",artwork_extend_label:"Raz\u0161iri grafiko",no_artwork_overrides:"Ni nastavljenih prepisov grafike.",entity_current_hint:"Uporabi entity_id: current za trenutno izbrano entiteto.",service_data_note:"Spremembe se shranijo \u0161ele ob kliku na ikono shrani.",jinja_template_hint:"Vnesite Jinja predlogo, ki vrne en entity_id.",jinja_template_vol_hint:"Vnesite Jinja predlogo za entiteto glasnosti.",not_available_alt_collapsed:"Ni na voljo z alternativno vrstico napredka.",not_available_collapsed:"Ni na voljo v vedno skr\u010Denem na\u010Dinu.",only_available_collapsed:"Na voljo le v vedno skr\u010Denem na\u010Dinu.",only_available_modern:"Na voljo le v moderni postavitvi.",image_url_helper:"Vnesite neposredni URL do slike ali lokalno pot do datoteke",selected_entity_helper:"Pomo\u010Dnik za vnos besedila, ki bo posodobljen z ID-jem trenutno izbranega predvajalnika medijev.",select_entity_helper:"Pomo\u010Dnik za vnos besedila, iz katerega se bere ID entitete. Kartica bo samodejno izbrala ustrezni \u010Dip.",sync_entity_type:"Izberite, kateri ID entitete \u017Eelite sinhronizirati s pomo\u010Dnikom (privzeto entiteto Music Assistant, \u010De je nastavljena).",disable_auto_select:"Prepre\u010Di samodejno izbiro \u010Dipa te entitete ob za\u010Detku predvajanja.",search_view:"Izberite med standardnim seznamom ali mre\u017Eo kartic za rezultate iskanja.",search_card_columns:"Dolo\u010Dite \u0161tevilo stolpcev v pogledu kartic. Grafika se bo samodejno prilagodila.",card_type:"Izberite na\u010Din kartice. 'Privzeto' je standardni medijski predvajalnik. 'Namensko iskanje' spremeni kartico v trajen iskalni vmesnik.",always_show_lyrics:"Samodejno odprite pogled besedila, ko se stran osve\u017Ei.",lyrics_source:"Music Assistant zahteva integracijo mass_queue za pridobivanje besedil iz svojega notranjega mehanizma metapodatkov.",lyrics_pre_roll:"Zamaknite \u010Dasovno uskladitev ozna\u010Devanja besedila. Pozitivne vrednosti ga pospe\u0161ijo, negativne pa upo\u010Dasnijo (privzeto: 0).",blurred_artwork:"Vedno zamegli ozadje",hide_collapsed_artwork:"Skrij majhno sliko na desni, ko je kartica strnjena",show_idle_artwork_when_not_playing:"Ko je to omogo\u010Deno, se ob izbiri \u010Dipa, na katerem se trenutno ni\u010D ne predvaja, prika\u017Ee nastavljena slika za nedejavnost namesto aktivne grafike predvajanja.",prefer_ma_metadata:"Za naslov skladbe, izvajalca in grafiko vedno uporabi seznanjeno entiteto Music Assistant, tudi \u010De se predvaja primarna entiteta.",show_volume_overlay:"Ob spremembi glasnosti za kratek \u010Das prika\u017Ee velik indikator glasnosti \u010Dez naslovnico."},titles:{edit_entity:"Uredi entiteto",edit_action:"Uredi dejanje",service_data:"Podatki storitve",add_artwork_override:"Dodaj prepis grafike"},labels:{dim_chips:"Zatemni \u010Dipe v mirovanju",hold_to_pin:"Dr\u017Ei za pripenjanje",always_show_group:"Hitro zdru\u017Eevanje kot privzeto",disable_autofocus:"Onemogo\u010Di samodejni fokus",keep_filters:"Ohrani filtre",dismiss_on_play:"Zapri iskanje ob predvajanju",pin_headers:"Pripni glave iskanja",hide_search_headers_on_idle:"Skrij glave iskanja med mirovanjem",default_search_filter:"Privzeti iskalni filter",default_search_favorites:"Privzeti filter priljubljenih",disable_mass:"Onemogo\u010Di Mass Queue",match_theme:"Ujemaj temo",alt_progress:"Alternativna vrstica napredka",progress_bar_height:"Vi\u0161ina vrstice napredka",display_timestamps:"Prika\u017Ei \u010Dasovne oznake",swap_pause_stop:"Zamenjaj pavzo z zaustavitvijo",adaptive_controls:"Prilagodljiva velikost gumbov",hide_active_entity:"Skrij oznako aktivne entitete",hide_active_entity_on_idle:"Skrij oznako aktivne entitete ob mirovanju",collapse_on_idle:"Skr\u010Di v mirovanju",hide_menu_player_toggle:"Skrij predvajalnik v meniju",always_collapsed:"Vedno skr\u010Deno",expand_on_search:"Raz\u0161iri ob iskanju",script_var:"Skriptna spremenljivka",use_ma_template:"Uporabi predlogo za entiteto Music Assistant",use_vol_template:"Uporabi predlogo za glasnost",follow_active_entity:"Glasnost sledi aktivni entiteti",use_url_path:"Uporabi URL ali pot",adaptive_text_elements:"Elementi za prilagajanje velikosti besedila",disable_auto_select:"Onemogo\u010Di samodejno izbiro",always_show_lyrics:"Vedno prika\u017Ei besedilo",lyrics_mode:"Na\u010Din besedila",lyrics_source:"Vir besedil",lyrics_pre_roll:"Pre-roll besedila (sekunde)",blurred_artwork:"Zamegljena grafika",hide_collapsed_artwork:"Skrij skr\u010Deno grafika",show_idle_artwork_when_not_playing:"Prika\u017Ei sliko za nedejavnost, ko se ne predvaja",prefer_ma_metadata:"Prednost metapodatkom Music Assistant",show_volume_overlay:"Prika\u017Ei prekrivno plo\u0161\u010Do za glasnost"},fields:{artwork_fit:"Prileganje grafike",artwork_position:"Polo\u017Eaj grafike",artwork_hostname:"Ime gostitelja grafike",match_field:"Polje ujemanja",match_value:"Vrednost ujemanja",size_percent:"Velikost (%)",object_fit:"Prileganje objekta",idle_timeout:"\u010Cas mirovanja (ms)",show_chip_row:"Prika\u017Ei vrstico \u010Dipov",search_limit:"Omejitev rezultatov iskanja",result_sorting:"Razvr\u0161\u010Danje rezultatov",vol_step:"Korak glasnosti (0.05 = 5 %)",card_height:"Vi\u0161ina kartice (px)",control_layout:"Postavitev kontrolnikov",save_service_data:"Shrani podatke storitve",image_url:"URL slike",fallback_image_url:"Rezervni URL slike",move_to_main:"Premakni dejanje na glavno vrstico",move_to_menu:"Premakni dejanje v meni",delete_action:"Izbri\u0161i dejanje",revert_service_data:"Povrni shranjene podatke",test_action:"Preizkusi dejanje",volume_mode:"Na\u010Din glasnosti",idle_screen:"Zaslon v mirovanju",name:"Ime",hidden_controls:"Skriti kontrolniki",ma_template:"Predloga Music Assistant (Jinja)",hidden_chips:"Skriti iskalni \u010Dipi",vol_template:"Predloga entitete glasnosti (Jinja)",icon:"Ikona",action_type:"Vrsta dejanja",menu_item:"Element menija",nav_path:"Navigacijska pot",service:"Storitev",service_data:"Podatki storitve",idle_image_entity:"Entiteta slike v mirovanju",match_entity:"Ujemajo\u010Da entiteta",ma_entity:"Entiteta Music Assistant",vol_entity:"Entiteta glasnosti",selected_entity_helper:"Pomo\u010Dnik izbrane entitete",sync_entity_type:"Vrsta entitete za sinhronizacijo",placement:"Namestitev",card_trigger:"Spro\u017Eilec kartice",search_view:"Pogled rezultatov iskanja",search_card_columns:"Stolpci kartic",card_type:"Vrsta kartice",appearance:"Videz",no_artwork_option:"Brez grafike",details_alignment:"Poravnava podrobnosti"},action_types:{menu:"Odpri element menija kartice",service:"Pokli\u010Di storitev",navigate:"Navigiraj",prev_entity:"Prej\u0161nji \u010Dip entitete",next_entity:"Naslednji \u010Dip entitete",sync_selected_entity:"Sinhroniziraj izbrano entiteto",select_entity:"Izberi entiteto iz pomo\u010Dnika",toggle_lyrics:"Preklopi prekrivanje besedila"},action_helpers:{sync_selected_entity:"Sinhroniziraj izbrano entiteto \u2192",select_entity:"Izberi entiteto \u2190",select_helper:"(izberite pomo\u010Dnika)"},sync_entity_options:{yamp_entity:"yamp_entity (entiteta Music Assistant, \u010De je nastavljena)",yamp_main_entity:"yamp_main_entity (glavna entiteta predvajalnika medijev)",yamp_playback_entity:"yamp_playback_entity (trenutno aktivna entitea predvajanja)"},placements:{chip:"\u010Cip dejanja",menu:"V meniju",hidden:"Skrito (dotik grafike)",not_triggerable:"Ni mogo\u010De spro\u017Eiti"},triggers:{none:"Brez",tap:"Dotik",hold:"Pridr\u017Eanje",double_tap:"Dvojni dotik",swipe_left:"Podrsaj levo",swipe_right:"Podrsaj desno"},search_view_options:{list:"Seznam",card:"Kartica",card_minimal:"Minimalna kartica"},card_type_options:{default:"Privzeto",search:"Iskanje",group_players:"Zoskupi predvajalnike"},appearance_options:{automatic:"Samodejno",light:"Svetlo",dark:"Temno"},artwork_fit:{default:"Privzeto",cover:"Ovitek (privzeto)",contain:"Prilagodi",fill:"Zapolni","scale-down":"Pomanj\u0161aj","scaled-contain":"Pomanj\u0161ano prilagodi","scaled-contain-alternate":"Pomanj\u0161ano prilagodi alternativno",none:"Brez"}},card:{sections:{details:"Podrobnosti predvajanja",menu:"Meni in iskanje",action_chips:"\u010Cipi dejanj"},media_controls:{shuffle:"Naklju\u010Dno",previous:"Prej\u0161nje",play_pause:"Predvajaj/Pavza",stop:"Ustavi",next:"Naslednje",repeat:"Ponovi"},menu:{more_info:"Ve\u010D informacij",search:"I\u0161\u010Di",source:"Vir",show_lyrics:"Poka\u017Ei besedilo",hide_lyrics:"Skrij besedilo",transfer_queue:"Prenesi \u010Dakalno vrsto",group_players:"Zdru\u017Ei predvajalnike",select_entity:"Izberi entiteto za ve\u010D informacij",transfer_to:"Prenesi \u010Dakalno vrsto na",no_players:"Ni drugih razpolo\u017Eljivih predvajalnikov Music Assistant."},grouping:{title:"Zdru\u017Ei predvajalnike",sync_volume:"Sinhroniziraj glasnost",group_all:"Zdru\u017Ei vse",ungroup_all:"Razdru\u017Ei vse",unavailable:"Predvajalnik ni na voljo",no_players:"Ni drugih predvajalnikov za zdru\u017Eevanje.",master:"Glavni",joined:"Pridru\u017Een",available:"Na voljo",current:"Trenutni",unjoin_from:"Odslopi od {master}",join_with:"Pridru\u017Ei se {master}"}},search:{favorites:"Priljubljeni",recently_played:"Nedavno predvajano",next_up:"Naslednje",recommendations:"Priporo\u010Dila",radio_mode:"Radijski na\u010Din",show_track_options:"Prika\u017Ei mo\u017Enosti skladbe",play_similar:"Predvajaj podobne pesmi",close:"Zapri iskanje",no_results:"Ni rezultatov.",play_next:"Predvajaj naslednje",replace_play:"Zamenjaj \u010Dakalno vrsto in predvajaj",replace:"Zamenjaj \u010Dakalno vrsto",add_queue:"Dodaj na konec \u010Dakalne vrste",move_up:"Premakni gor",move_down:"Premakni dol",move_next:"Premakni na naslednje",remove:"Odstrani iz \u010Dakalne vrste",added:"Dodano v \u010Dakalno vrsto!",added_to_playlist:"Dodano na seznam predvajanja!",select_playlist:"Izberite seznam predvajanja za '{track}'",add_to_playlist:"Dodaj na seznam predvajanja",select_track_for_playlist:"Izberite skladbo za dodajanje za '{track}' od {artist}",labels:{replace:"Zamenjaj",next:"Naslednje",replace_next:"Zamenjaj naslednje",add:"Dodaj",add_to_playlist:"Dodaj na seznam predvajanja"},results:"rezultati",result:"rezultat",filters:{all:"Vse",artist:"Izvajalec",album:"Album",track:"Skladba",playlist:"Seznam predvajanja",radio:"Radio",music:"Glasba",station:"Postaja",podcast:"Podcast",audiobook:"Zvo\u010Dna knjiga"},search_artist:"I\u0161\u010Di tega izvajalca",browse_album:"Prebrskaj skladbe iz {album}",play_collection:"Predvajaj to zbirko",play_collection_error:"Te zbirke ni mogo\u010De predvajati neposredno",play_item:"Predvajaj {item}"},lyrics:{finding:"Iskanje besedila...",none_found:"Besedila ni bilo mogo\u010De najti",not_available:"Besedilo ni na voljo",instrumental:"Instrumentalna skladba"},lyrics_sources:{mass_lrclib:"Music Assistant (Rezerva na LRCLIB)",mass:"Samo Music Assistant",lrclib:"Samo LRCLIB",lrclib_mass:"LRCLIB (Rezerva na Music Assistant)"},lyrics_modes:{default:"Privzeto (Ozna\u010Di in pomakni)",scroll:"Samo pomikanje",text:"Samo besedilo"}};const ya={en:lo,de:co,es:uo,fr:ho,it:po,nl:_o,pt:mo,sk:fo,sl:go};function p(r,e="",t=""){const i=(localStorage.getItem("selectedLanguage")||document.querySelector("home-assistant")?.hass?.language||"en").replace(/['"]+/g,"").replace("-","_"),a=ya[i]?i:i.split("_")[0];let s;const n=r.split("."),l=(c,d)=>{try{return d.reduce((h,u)=>h&&h[u]!==void 0?h[u]:void 0,c)}catch{return}};if(s=l(ya[a],n),s===void 0&&a!=="en"&&(s=l(ya.en,n)),s===void 0&&(s=r),typeof s!="string"&&(s=r),typeof e=="object"&&e!==null)for(const[c,d]of Object.entries(e))s=s.replaceAll(c,d);else e!==""&&t!==""&&(s=s.replaceAll(e,t));return s}const yo=1,va=8,Ps=16,zs=32,ba=128,xa=256,vo=4096,bo=16384,js=32768,Ds=524288,Fs=262144,Os=Object.freeze(["media_title","media_artist","media_album_name","media_content_id","media_channel","app_name","media_content_type","entity_id","entity_state"]),Dt=6,ri=Object.freeze({custom:{},large_modern:{match_theme:!0,appearance:"automatic",control_layout:"modern",adaptive_controls:!0,adaptive_text:!0,artwork_object_fit:"cover",extend_artwork:!0,show_chip_row:"in_menu_on_idle",hold_to_pin:!0,pin_search_headers:!0,progress_bar_height:16,search_view:"card",search_card_columns:3,display_timestamps:!0,details_alignment:"left"},crisp_clean:{match_theme:!0,volume_mode:"stepper",hold_to_pin:!0,volume_step:.05,show_chip_row:"in_menu",extend_artwork:!0,search_results_sort:"play_count_desc",control_layout:"modern",dismiss_search_on_play:!0,keep_filters_on_search:!1,display_timestamps:!0,search_view:"list",default_search_filter:"all",default_search_favorites:!0,appearance:"automatic",details_alignment:"center",artwork_object_fit:"scaled-contain-alternate",progress_bar_height:2},minimal_mini:{match_theme:!0,appearance:"automatic",always_collapsed:!0,show_chip_row:"in_menu",details_alignment:"left",hold_to_pin:!0,progress_bar_height:2,volume_mode:"stepper",extend_artwork:!0,blurred_artwork:!0,hide_collapsed_artwork:!0},normal_mini:{match_theme:!0,appearance:"automatic",always_collapsed:!0,show_chip_row:"auto",details_alignment:"left",hold_to_pin:!0,progress_bar_height:2,volume_mode:"slider",extend_artwork:!0,blurred_artwork:!0},dedicated_search:{match_theme:!0,appearance:"automatic",card_type:"search",search_view:"card",hide_menu_player:!0,hold_to_pin:!0,show_chip_row:"in_menu",disable_autofocus:!0},dedicated_grouping:{match_theme:!0,appearance:"automatic",card_type:"group_players",hide_menu_player:!0,show_chip_row:"in_menu"},quick_and_easy:{match_theme:!0,appearance:"automatic",always_show_quick_group:!0,show_chip_row:"always",dismiss_search_on_play:!0,extend_artwork:!0,show_volume_overlay:!0,hold_to_pin:!0},huge_yamp:{match_theme:!0,appearance:"automatic",control_layout:"modern",adaptive_controls:!0,adaptive_text:!0,progress_bar_height:48,display_timestamps:!0,artwork_object_fit:"cover",extend_artwork:!0,search_view:"card",search_card_columns:2,show_volume_overlay:!0}}),Rs=new WeakMap;function Ft(r,e){const t=r?.[e];return typeof t=="string"&&t.trim()!==""?t:null}async function xo(r,e,t){if(!e||typeof e!="string")return t;if(!e.includes("{{")&&!e.includes("{%"))return e;try{const i=(await r.callApi("POST","template",{template:e})||"").toString().trim();return i&&/^([a-z_]+)\.[A-Za-z0-9_]+$/.test(i)?i:t}catch{return t}}async function ji(r,e,t={}){if(!e||typeof e!="string")return e;if(!e.includes("{{")&&!e.includes("{%")){if(/%7B%7B|%7B%25/i.test(e))try{e=decodeURIComponent(e)}catch{}if(!e.includes("{{")&&!e.includes("{%"))return e}let i=e;t&&Object.keys(t).length>0&&(i=`${Object.entries(t).map(([a,s])=>`{% set ${a} = ${JSON.stringify(s)} %}`).join(" ")} ${e}`);try{return(await r.callApi("POST","template",{template:i})||"").toString().trim()}catch(a){return console.warn("yamp: Error resolving template:",e,a),e}}function wa(r,e,t={}){if(!e||typeof e!="string")return e;let i=e;if(/%7B%7B|%7B%25/i.test(i))try{i=decodeURIComponent(i)}catch{}if(!i.includes("{{")&&!i.includes("{%"))return i;let a=i,s=!0;return a=a.replace(/\{\{\s*(.*?)\s*\}\}/g,(n,l)=>{let c=l.trim(),d=!1;c.endsWith("| urlencode")?(d=!0,c=c.replace(/\|\s*urlencode$/,"").trim()):c.endsWith("|urlencode")&&(d=!0,c=c.replace(/\|urlencode$/,"").trim());let h=c.match(/^state_attr\(\s*(['"]?)([\w.]+)\1\s*,\s*(['"]?)([\w_]+)\3\s*\)$/);if(h){let f=h[2],g=t[f]!==void 0&&!h[1]?t[f]:f,v=h[4];const w=r?.states?.[g];if(w&&w.attributes&&w.attributes[v]!==void 0){let A=String(w.attributes[v]);return d?encodeURIComponent(A):A}return""}let u=c.match(/^states\(\s*(['"]?)([\w.]+)\1\s*\)(?:\s*(==|!=)\s*(['"])(.*?)\4)?$/);if(u){let f=u[2],g=t[f]!==void 0&&!u[1]?t[f]:f,v=u[3],w=u[5];const A=r?.states?.[g];let O="unknown";if(A&&A.state!==void 0&&(O=String(A.state)),v){let D=(v==="=="?O===w:O!==w)?"true":"false";return d?encodeURIComponent(D):D}return d?encodeURIComponent(O):O}let m=c.match(/^is_state\(\s*(['"]?)([\w.]+)\1\s*,\s*(['"])(.*?)\3\s*\)$/);if(m){let f=m[2],g=t[f]!==void 0&&!m[1]?t[f]:f,v=m[4];const w=r?.states?.[g];let A="unknown";w&&w.state!==void 0&&(A=String(w.state));let O=A===v?"true":"false";return d?encodeURIComponent(O):O}if(/^[\w_]+$/.test(c)&&t[c]!==void 0){let f=String(t[c]);return d?encodeURIComponent(f):f}return s=!1,n}),!s||a.includes("{%")?null:a}function wo(r,e){if(!r?.states||!e)return[];const t=[],i=r.states[e];if(!i)return[];const a=i.attributes?.device_id,s=i.attributes?.friendly_name||e;for(const[n,l]of Object.entries(r.states))if(n.startsWith("button.")&&l.attributes){const c=l.attributes.device_id,d=l.attributes.friendly_name||n;a&&c===a?t.push({entity_id:n,friendly_name:d,device_class:l.attributes.device_class,reason:"same_device"}):(d.toLowerCase().includes(s.toLowerCase())||s.toLowerCase().includes(d.toLowerCase()))&&t.push({entity_id:n,friendly_name:d,device_class:l.attributes.device_class,reason:"name_similarity"})}return t}function ko(r,e){if(!r?.states||!e)return null;const t=r.states[e];return t&&t.attributes&&(t.attributes.media_content_id||t.attributes.media_content_type||t.attributes.media_album_name||t.attributes.media_artist||t.attributes.media_title)?t:null}function Ot(r){return!r||!r.attributes?!1:r.attributes.app_id==="music_assistant"||r.attributes.mass_player_type!==void 0}function Eo(r){if(!r)return"";const e=r.media_type||r.media_class||r.media_content_type,t=r.name||r.title||r.media_title||"Unknown Title",i=r.artists?.[0],a=r.artist||i?.name||(typeof i=="string"?i:void 0)||r.media_artist||"Unknown Artist";if(e==="track"){const s=r.album||r.media_album_name;return s?p("search.browse_album","{album}",s):`${t} - ${a}`}return e==="album"?p("search.browse_album","{album}",t):t}function So(r,e,t){if(!e||!Array.isArray(e)||!e.length)return null;const i=r.attributes,a=r.entity_id,s=()=>e.find(h=>Os.some(u=>{const m=h[u];if(m===void 0)return!1;const f=u==="entity_id"?a:u==="entity_state"?r?.state:i[u];if(m==="*")return!0;let g=Rs.get(h);g||(g={},Rs.set(h,g));let v=g[u];if(v===void 0)if(typeof m=="string"&&m.includes("*")&&m!=="*")try{const w=m.replace(/\*+/g,"*");if((w.match(/\*/g)||[]).length<=5){const A=w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*");v=new RegExp(`^${A}$`,"i"),g[u]=v}else g[u]=null,v=null}catch{g[u]=null,v=null}else g[u]=null,v=null;return v?v.test(String(f||"")):f===m})),n=Ft(i,"entity_picture_local")||Ft(i,"entity_picture")||Ft(i,"album_art");let l=s(),c=null,d="image";if(l?.image_url?c=l.image_url:l?.missing_art_url&&!n&&(c=l.missing_art_url,d="missing"),!l&&!n){const h=e.find(u=>u?.missing_art_url);h?.missing_art_url&&(l=h,c=h.missing_art_url,d="missing")}if(l&&c){const h=typeof t=="function"?t(l,c,d,r):c;if(h)return{url:h,sizePercentage:l?.size_percentage,objectFit:l?.object_fit??null}}return null}function ka(r,{hostname:e="",overrides:t=[],fallbackArtwork:i=null,artworkObjectFit:a=null,resolveOverrideSource:s=null}={}){if(!r||!r.attributes)return null;const n=r.attributes;let l=null,c=null,d=null;if(a==="no_artwork")return{url:null,sizePercentage:null,objectFit:"no_artwork"};const h=So(r,t,s);if(h&&(l=h.url,c=h.sizePercentage,d=h.objectFit),l||(l=Ft(n,"entity_picture_local")||Ft(n,"entity_picture")||Ft(n,"album_art")||null),!l&&i&&(i==="smart"?n.media_title==="TV"||n.media_channel||n.app_id==="tv"||n.app_id==="androidtv"?l="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg0IiBoZWlnaHQ9IjE4NCIgdmlld0JveD0iMCAwIDE4NCAxODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjEwNCIgaGVpZ2h0PSI3OCIgcng9IjgiIGZpbGw9ImN1cnJlbnRDb2xvciIvcj4KPHJlY3QgeD0iNjgiIHk9IjEyMCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHJlY3QgeD0iODAiIHk9IjEzMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==":l="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg0IiBoZWlnaHQ9IjE4NCIgdmlld0JveD0iMCAwIDE4NCAxODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjM2IiB5PSI4NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjYyIiByeD0iOCIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxyZWN0IHg9IjY4IiB5PSI5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIyMiIgaGVpZ2h0PSI3OCIgcng9IjgiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8cmVjdCB4PSIxMzIiIHk9IjQyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTA2IiByeD0iOCIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=":typeof i=="string"&&(l=i)),l&&e&&!/^https?:\/\//i.test(l)&&!l.startsWith("data:")){const u=e.endsWith("/")?e.slice(0,-1):e,m=l.startsWith("/")?l:`/${l}`;l=u+m}return{url:l,sizePercentage:c,objectFit:d}}function Ao({idx:r,selected:e,playing:t,name:i,art:a,icon:s,pinned:n,holdToPin:l,maActive:c,onChipClick:d,onIconClick:h,onPinClick:u,onPointerDown:m,onPointerMove:f,onPointerUp:g,objectFit:v,quickGroupingState:w,onQuickGroupClick:A,onDoubleClick:O}){const D=v?`object-fit: ${v};`:"";return y`
    <button
      class="chip"
      ?selected=${e}
      ?playing=${t}
      ?ma-active=${c}
      @dblclick=${O}
      @click=${()=>d(r)}
      @pointerdown=${m}
      @pointermove=${f}
      @pointerup=${g}
      @pointerleave=${g}
      style="display:flex;align-items:center;justify-content:space-between;position:relative;"
    >
      <span class="chip-icon">
        ${a?y`<img
              class="chip-mini-art"
              src="${a}"
              style="${D}"
              onerror="this.style.display='none'"
            />`:y`<ha-icon .icon=${s} style="font-size:28px;"></ha-icon>`}
      </span>
      <span
        class="chip-label"
        style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;"
      >
        ${i}
      </span>
      ${t?y`
            <span class="chip-playing-indicator">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </span>
          `:k}
      ${n?y`
            <span
              class="chip-pin-inside"
              @click=${F=>{F.stopPropagation(),u(r,F)}}
              title="${p("common.unpin")}"
            >
              <ha-icon .icon=${"mdi:pin"}></ha-icon>
            </span>
          `:y`<span class="chip-pin-spacer"></span>`}
      ${Ls({idx:r,quickGroupingState:w,onQuickGroupClick:A})}
    </button>
  `}function $o({idx:r,selected:e,playing:t,groupName:i,art:a,icon:s,pinned:n,holdToPin:l,maActive:c,onChipClick:d,onIconClick:h,onPinClick:u,onPointerDown:m,onPointerMove:f,onPointerUp:g,objectFit:v,quickGroupingState:w,onQuickGroupClick:A,onDoubleClick:O}){const D=v?`object-fit: ${v};`:"";return y`
    <button
      class="chip group"
      ?selected=${e}
      ?ma-active=${c}
      @dblclick=${O}
      @click=${()=>d(r)}
      @pointerdown=${m}
      @pointermove=${f}
      @pointerup=${g}
      @pointerleave=${g}
      style="display:flex;align-items:center;justify-content:space-between;position:relative;"
    >
      <span
        class="chip-icon"
        style="cursor:pointer;"
        @click=${F=>{F.stopPropagation(),h&&h(r,F)}}
      >
        ${a?y`<img
              class="chip-mini-art"
              src="${a}"
              style="cursor:pointer;${D}"
              onerror="this.style.display='none'"
              @click=${F=>{F.stopPropagation(),h&&h(r,F)}}
            />`:y`<ha-icon
              .icon=${s}
              style="font-size:28px;cursor:pointer;"
              @click=${F=>{F.stopPropagation(),h&&h(r,F)}}
            ></ha-icon>`}
      </span>
      <span
        class="chip-label"
        style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;"
      >
        ${i}
      </span>
      ${t?y`
            <span class="chip-playing-indicator">
              <span class="bar"></span>
              <span class="bar"></span>
              <span class="bar"></span>
            </span>
          `:k}
      ${n?y`
            <span
              class="chip-pin-inside"
              @click=${F=>{F.stopPropagation(),u(r,F)}}
              title="${p("common.unpin")}"
            >
              <ha-icon .icon=${"mdi:pin"}></ha-icon>
            </span>
          `:y`<span class="chip-pin-spacer"></span>`}
      ${Ls({idx:r,quickGroupingState:w,onQuickGroupClick:A})}
    </button>
  `}function Ls({idx:r,quickGroupingState:e,onQuickGroupClick:t}){if(!e||!e.isGroupable)return k;const{isPrimary:i,isBusy:a,grouped:s,tooltip:n}=e;return y`
    <span
      class="chip-quick-group"
      @click=${l=>{l.stopPropagation(),t&&!a&&!i&&t(r,l)}}
      title=${n||(i?"Primary":a?"Unavailable":s?"Unjoin":"Join")}
      style="${i?"cursor:default;opacity:0.7;":a?"opacity:0.5;cursor:not-allowed;":""}"
    >
      <ha-icon .icon=${i?"mdi:star-circle-outline":s?"mdi:minus":"mdi:plus"}></ha-icon>
    </span>
  `}function Co({onPin:r,onHoldEnd:e,holdTime:t=600,moveThreshold:i=8}){let a=null,s=null,n=null,l=!1;return{pointerDown:(c,d)=>{s=c.clientX,n=c.clientY,l=!1,a=setTimeout(()=>{l||(r(d,c),e&&e(d))},t)},pointerMove:(c,d)=>{if(a&&s!==null&&n!==null){const h=Math.abs(c.clientX-s),u=Math.abs(c.clientY-n);(h>i||u>i)&&(l=!0,clearTimeout(a),a=null)}},pointerUp:(c,d)=>{a&&(clearTimeout(a),a=null),s=null,n=null,l=!1}}}function qs({groupedSortedEntityIds:r,entityIds:e,selectedEntityId:t,pinnedIndex:i,holdToPin:a,getChipName:s,getActualGroupMaster:n,getIsChipPlaying:l,getChipArt:c,getIsMaActive:d,isIdle:h,hass:u,artworkHostname:m="",mediaArtworkOverrides:f=[],fallbackArtwork:g=null,onChipClick:v,onIconClick:w,onPointerClick:A,onPinClick:O,onPointerDown:D,onPointerMove:F,onPointerUp:G,quickGroupingMode:Q,getQuickGroupingState:B,onQuickGroupClick:te,onDoubleClick:Z}){return!r||!r.length?k:y`
    ${r.map(X=>{if(X.length>1){const U=n(X),ie=e.indexOf(U),J=u?.states?.[U],ae=typeof l=="function"?l(U,t===U):J?.state==="playing",ne=typeof c=="function"?c(U):ka(J,{hostname:m,overrides:f,fallbackArtwork:g}),oe=ne?.url,xe=ne?.objectFit,L=J?.attributes?.icon||"mdi:cast",Se=typeof d=="function"?d(U):!1;return $o({idx:ie,selected:t===U,playing:ae,groupName:s(U)+(X.length>1?` [${X.length}]`:""),art:oe,icon:L,pinned:i===ie,holdToPin:a,maActive:Se,onChipClick:v,onIconClick:w,onPinClick:O,onPointerDown:ye=>D(ye,ie),onPointerMove:ye=>F(ye,ie),onPointerUp:ye=>G(ye,ie),objectFit:xe,quickGroupingState:Q&&typeof B=="function"?B(U):null,onQuickGroupClick:te,onDoubleClick:Z})}else{const U=X[0],ie=e.indexOf(U),J=u?.states?.[U],ae=typeof l=="function"?l(U,t===U):J?.state==="playing",ne=typeof c=="function"?c(U):ka(J,{hostname:m,overrides:f,fallbackArtwork:g}),oe=ne?.url,xe=ne?.objectFit,L=t===U?!h&&oe:ae&&oe,Se=J?.attributes?.icon||"mdi:cast",ye=typeof d=="function"?d(U):!1;return Ao({idx:ie,selected:t===U,playing:ae,name:s(U),art:L,icon:Se,pinned:i===ie,holdToPin:a,maActive:ye,onChipClick:v,onPinClick:O,onPointerDown:je=>D(je,ie),onPointerMove:je=>F(je,ie),onPointerUp:je=>G(je,ie),objectFit:xe,quickGroupingState:Q&&typeof B=="function"?B(U):null,onQuickGroupClick:te,onDoubleClick:Z})}})}
  `}function Io({actions:r,onActionChipClick:e}){return r?.length?y`
    <div class="action-chip-row">
      ${r.map((t,i)=>y`
          <button class="action-chip" @click=${()=>e(i)}>
            ${t.icon?y`<ha-icon
                  .icon=${t.icon}
                  style="font-size: 22px; margin-right: ${t.name?"8px":"0"};"
                ></ha-icon>`:k}
            ${t.name||""}
          </button>
        `)}
    </div>
  `:k}function To({stateObj:r,showStop:e,shuffleActive:t,repeatActive:i,onControlClick:a,supportsFeature:s,showFavorite:n,favoriteActive:l,hiddenControls:c={},adaptiveControls:d=!1,controlLayout:h="classic",swapPauseForStop:u=!1}){if(!r)return k;const m=h==="modern"?"modern":"classic";let f=!c.previous&&s(r,Ps),g=!c.play_pause&&(s(r,yo)||s(r,bo));const v=!c.stop&&e;let w=v,A=!c.next&&s(r,zs),O=!c.shuffle&&s(r,js),D=!c.repeat&&s(r,Fs),F=!c.favorite&&n,G=!c.power&&(s(r,xa)||s(r,ba));const Q=m==="modern"&&u&&v,B=r.state==="playing",te=Q&&B;m==="modern"&&(w=!1,F=!1,G=!1);const Z=Ea(r,s,n,c,e,m),X=d?"controls-row adaptive":"controls-row",U=m==="modern"?`${X} modern`:X;let ie=d?`--yamp-control-count:${Math.max(Z,1)};`:k;if(d){const J=Z<=3?{icon:56,minWidth:78,maxWidth:150,minHeight:78,padding:14,gap:14}:Z===4?{icon:48,minWidth:68,maxWidth:130,minHeight:68,padding:12,gap:12}:Z===5?{icon:42,minWidth:58,maxWidth:110,minHeight:58,padding:10,gap:10}:Z===6?{icon:36,minWidth:50,maxWidth:96,minHeight:52,padding:8,gap:8}:{icon:32,minWidth:44,maxWidth:88,minHeight:48,padding:6,gap:6};ie+=[`--yamp-control-gap:${J.gap}px`,`--yamp-control-min-width:${J.minWidth}px`,`--yamp-control-max-width:${J.maxWidth}px`,`--yamp-control-min-height:${J.minHeight}px`,`--yamp-control-padding:${J.padding}px`,`--yamp-control-icon-size:${J.icon}px`].join(";")}return m==="modern"?y`
      <div class=${U} style=${ie}>
        <div class="controls-left">
          ${O?y`
                <button
                  class="modern-button small${t?" active":""}"
                  @click=${()=>a("shuffle")}
                  title="${p("card.media_controls.shuffle")}"
                >
                  <ha-icon .icon=${"mdi:shuffle"}></ha-icon>
                </button>
              `:k}
          ${f?y`
                <button
                  class="modern-button medium"
                  @click=${()=>a("prev")}
                  title="${p("card.media_controls.previous")}"
                >
                  <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
                </button>
              `:k}
        </div>

        <div class="controls-center">
          ${g?y`
                <button
                  class="modern-button primary${B?" active":""}"
                  @click=${()=>a(te?"stop":"play_pause")}
                  title="${te?p("card.media_controls.stop"):p("card.media_controls.play_pause")||"Play/Pause"}"
                >
                  <ha-icon
                    .icon=${te?"mdi:stop":B?"mdi:pause":"mdi:play"}
                  ></ha-icon>
                </button>
              `:k}
        </div>

        <div class="controls-right">
          ${A?y`
                <button
                  class="modern-button medium"
                  @click=${()=>a("next")}
                  title="${p("card.media_controls.next")}"
                >
                  <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
                </button>
              `:k}
          ${D?y`
                <button
                  class="modern-button small${i?" active":""}"
                  @click=${()=>a("repeat")}
                  title="${p("card.media_controls.repeat")}"
                >
                  <ha-icon
                    .icon=${r.attributes.repeat==="one"?"mdi:repeat-once":"mdi:repeat"}
                  ></ha-icon>
                </button>
              `:k}
        </div>
      </div>
    `:y`
    <div class=${U} style=${ie}>
      ${f?y`
            <button
              class="button"
              @click=${()=>a("prev")}
              title="${p("card.media_controls.previous")}"
            >
              <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
            </button>
          `:k}
      ${g?y`
            <button
              class="button"
              @click=${()=>a("play_pause")}
              title="${p("card.media_controls.play_pause")}"
            >
              <ha-icon .icon=${r.state==="playing"?"mdi:pause":"mdi:play"}></ha-icon>
            </button>
          `:k}
      ${w?y`
            <button
              class="button"
              @click=${()=>a("stop")}
              title="${p("card.media_controls.stop")}"
            >
              <ha-icon .icon=${"mdi:stop"}></ha-icon>
            </button>
          `:k}
      ${A?y`
            <button
              class="button"
              @click=${()=>a("next")}
              title="${p("card.media_controls.next")}"
            >
              <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
            </button>
          `:k}
      ${O?y`
            <button
              class="button${t?" active":""}"
              @click=${()=>a("shuffle")}
              title="${p("card.media_controls.shuffle")}"
            >
              <ha-icon .icon=${"mdi:shuffle"}></ha-icon>
            </button>
          `:k}
      ${D?y`
            <button
              class="button${i?" active":""}"
              @click=${()=>a("repeat")}
              title="${p("card.media_controls.repeat")}"
            >
              <ha-icon
                .icon=${r.attributes.repeat==="one"?"mdi:repeat-once":"mdi:repeat"}
              ></ha-icon>
            </button>
          `:k}
      ${F?y`
            <button
              class="button${l?" active":""}"
              @click=${()=>a("favorite")}
              title="${p("common.favorite")}"
            >
              <ha-icon .icon=${l?"mdi:heart":"mdi:heart-outline"}></ha-icon>
            </button>
          `:k}
      ${G?y`
            <button
              class="button${r.state!=="off"?" active":""}"
              @click=${()=>a("power")}
              title="${p("common.power")}"
            >
              <ha-icon .icon=${"mdi:power"}></ha-icon>
            </button>
          `:k}
    </div>
  `}function Ea(r,e,t=!1,i={},a=!1,s="classic"){const n=s==="modern"?"modern":"classic";let l=0;return!i.previous&&e(r,Ps)&&l++,i.play_pause||l++,n!=="modern"&&!i.stop&&a&&l++,!i.next&&e(r,zs)&&l++,!i.shuffle&&e(r,js)&&l++,!i.repeat&&e(r,Fs)&&l++,n!=="modern"&&!i.favorite&&t&&l++,n!=="modern"&&!i.power&&(e(r,xa)||e(r,ba))&&l++,l}function Mo({isRemoteVolumeEntity:r,showSlider:e,vol:t,isMuted:i,supportsMute:a,onVolumeDragStart:s,onVolumeDragEnd:n,onVolumeInput:l,onVolumeChange:c,onVolumeStep:d,onMuteToggle:h,moreInfoMenu:u,leadingControlTemplate:m=k,reserveLeadingControlSpace:f=!1,showRightPlaceholder:g=!1,rightSlotTemplate:v=k,hideVolume:w=!1,isDragging:A=!1,dragVol:O=0}){const D=m!==k&&m!==void 0&&m!==null,F=(G,Q)=>(a?Q:G===0)||G===0?"mdi:volume-off":G<.2?"mdi:volume-low":G<.5?"mdi:volume-medium":"mdi:volume-high";return y`
    <div class="volume-row ${e&&!r?"has-slider":""}">
      <div class="volume-left">
        ${D?m:f?y`<div class="volume-leading-placeholder"></div>`:k}
        <div
          style="${w||r?"visibility:hidden; opacity:0; pointer-events:none;":""}"
        >
          <button
            class="volume-icon-btn"
            @click=${h}
            title=${p((a?i:t===0)?"common.unmute":"common.mute")}
          >
            <ha-icon icon=${F(t,i)}></ha-icon>
          </button>
        </div>
      </div>

      <div
        class="volume-center"
        style="${w?"visibility:hidden; opacity:0; pointer-events:none;":""}"
      >
        ${r?y`
              <div class="vol-stepper-container">
                <div class="vol-stepper">
                  <button
                    class="button"
                    @click=${()=>d(-1)}
                    title="${p("common.vol_down")}"
                  >
                    –
                  </button>
                  <span class="vol-label">vol</span>
                  <button
                    class="button"
                    @click=${()=>d(1)}
                    title="${p("common.vol_up")}"
                  >
                    +
                  </button>
                </div>
              </div>
            `:e?y`
                <div class="volume-slider-container">
                  <div
                    class="volume-percentage-indicator ${A?"visible":""}"
                    style="left: calc(33px + ${O} * (100% - 66px))"
                  >
                    ${Math.round(O*100)}%
                  </div>
                  <input
                    class="vol-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    .value=${t}
                    @mousedown=${s}
                    @touchstart=${s}
                    @input=${l}
                    @change=${c}
                    @mouseup=${n}
                    @touchend=${n}
                    title="${p("common.volume")}"
                  />
                </div>
              `:y`
                <div class="vol-stepper-container">
                  <div class="vol-stepper">
                    <button
                      class="button"
                      @click=${()=>d(-1)}
                      title="${p("common.vol_down")}"
                    >
                      –
                    </button>
                    <span class="vol-value">${Math.round(t*100)}%</span>
                    <button
                      class="button"
                      @click=${()=>d(1)}
                      title="${p("common.vol_up")}"
                    >
                      +
                    </button>
                  </div>
                </div>
              `}
      </div>

      <div class="volume-right">
        ${g?y` <div class="volume-placeholder">${v||k}</div> `:k}
        ${u}
      </div>
    </div>
  `}function Ns(r){if(r==null||isNaN(r))return"0:00";const e=Math.floor(r/60),t=Math.floor(r%60);return`${e}:${t<10?"0":""}${t}`}function Di({progress:r,seekEnabled:e,onSeek:t,collapsed:i,accent:a,height:s=Dt,style:n="",displayTimestamps:l=!1,currentTime:c=0,duration:d=0,customHeight:h=Dt}){const u=a||"var(--custom-accent, #ff9800)",m=i?Math.min(h,Math.max(4,Math.floor(h/2))):h,f=Math.min(6,m/2),g=Math.max(10,Math.min(24,Math.floor(m*.6+6))),v=`--progress-radius: ${f}px; --timestamp-size: ${g}px;`;return i?y`
      <div
        class="collapsed-progress-bar"
        style="width: ${r*100}%; background: ${u}; height: ${m}px; ${v} ${n}"
      ></div>
    `:y`
    <div class="progress-bar-container" style="${v} ${n}">
      <div
        class="progress-bar"
        style="height:${m}px;"
        @click=${e?t:null}
        title=${e?p("common.seek"):""}
      >
        <div
          class="progress-inner"
          style="width: ${r*100}%; background: ${u};"
        ></div>
      </div>
      ${l?y`
            <div class="timestamps-container">
              <span>${Ns(c)}</span>
              <span>-${Ns(Math.max(0,d-c))}</span>
            </div>
          `:k}
    </div>
  `}const ce=Object.freeze({MEDIA_BACKGROUND:0,MEDIA_OVERLAY:0,LYRICS_OVERLAY:1,FLOATING_ELEMENT:1,STICKY_CHIPS:1,ACCENT_FOREGROUND:1,FLOATING_CONTROLS:1,OVERLAY_BASE:2,MODAL_BACKDROP:2,MODAL_TOAST:2,SEARCH_SLIDE_OUT:1,SEARCH_SUCCESS:1,VOLUME_OVERLAY:3}),Vs=Ue`linear-gradient(to bottom, transparent, rgba(0,0,0,0.5) 10px, black 50px, black calc(100% - 50px), rgba(0,0,0,0.5) calc(100% - 10px), transparent)`,Me=Ue`
  scrollbar-width: none;
  -ms-overflow-style: none;
`,Fi=Ue`blur(5px)`,Us=Ue`blur(10px)`,Hs=Ue`blur(20px)`,Oi=Ue`linear-gradient(to bottom, black 0%, black calc(100% - 12px), transparent 100%)`,Bs=Ue`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`,Gs=Ue`
  --card-bg: #fff;
  --primary-text: #222;
  --secondary-text: #666;
  --yamp-overlay-bg: rgba(255, 255, 255, 0.95);
  --yamp-overlay-text: #222;
  --yamp-overlay-divider: rgba(0, 0, 0, 0.1);
  --yamp-icon-color: #444;
  --yamp-button-bg: rgba(0, 0, 0, 0.05);
  --yamp-button-border: rgba(0, 0, 0, 0.1);
  --yamp-overlay-text-secondary: rgba(0, 0, 0, 0.6);
  --yamp-chip-bg: rgba(255, 255, 255, 0.8);
  --yamp-chip-text: #222;
  --yamp-chip-border: rgba(0, 0, 0, 0.1);
  --search-card-bg: rgba(0, 0, 0, 0.03);
  --search-text-secondary: #666;
  --search-thumb-placeholder-bg: rgba(0, 0, 0, 0.05);
  --search-thumb-placeholder-icon: rgba(0, 0, 0, 0.4);
  --search-success-text: #222;
  --search-input-bg: rgba(0, 0, 0, 0.05);
  --search-input-text: #222;
`,Qs=Ue`
  background: var(--card-bg, #fff);
  color: var(--primary-text, #222);
  border: 1px solid var(--yamp-overlay-divider, #bbb);
`,Po=Ue`
  /* CSS Custom Properties for consistency */
  :host {
    --custom-accent: #ff9800;
    --card-bg: #222;
    --primary-text: #fff;
    --secondary-text: #aaa;
    --chip-bg: #333;
    --transition-fast: 0.13s;
    --transition-normal: 0.2s;
    --transition-slow: 0.4s;
    --border-radius: 16px;
    --chip-border-radius: 24px;
    --button-border-radius: 8px;
    --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.13);
    --shadow-medium: 0 2px 8px rgba(0, 0, 0, 0.25);
    --shadow-heavy: 0 0 6px 1px rgba(0, 0, 0, 0.32), 0 0 1px 1px rgba(255, 255, 255, 0.13);
    --yamp-artwork-fit: cover;
    --yamp-text-scale: 1;
    --yamp-text-scale-details: 1;
    --yamp-text-scale-menu: 1;
    --yamp-text-scale-action-chips: 1;
    --yamp-details-scale: var(--yamp-text-scale-details, 1);
    --yamp-details-line-height: 1.2;
    --yamp-details-max-lines: 3;
    --yamp-section-bg: rgba(255, 255, 255, 0.02);
    --yamp-section-border: rgba(255, 255, 255, 0.1);
    --yamp-section-radius: 12px;
    --yamp-section-divider: rgba(255, 255, 255, 0.06);
    --yamp-section-title-size: 1em;
    --yamp-section-title-weight: 600;
    --yamp-section-description-size: 0.9em;
    --yamp-section-description-color: #888;

    /* Universal theme-aware variables (default to dark) */
    --yamp-overlay-bg: rgba(0, 0, 0, 0.82);
    --yamp-overlay-text: #fff;
    --yamp-overlay-text-shadow: none;
    --yamp-overlay-divider: rgba(255, 255, 255, 0.2);
    --yamp-icon-color: #fff;
    --yamp-button-bg: rgba(255, 255, 255, 0.1);
    --yamp-button-border: rgba(255, 255, 255, 0.2);
    --yamp-overlay-text-secondary: rgba(255, 255, 255, 0.7);
    --yamp-success-color: #4caf50;
    --yamp-error-color: #f44336;
    --yamp-success-bg-light: rgba(76, 175, 80, 0.2);
    --yamp-success-bg-medium: rgba(76, 175, 80, 0.4);
    --yamp-chip-bg: rgba(255, 255, 255, 0.15);
    --yamp-chip-text: #fff;
    --yamp-chip-selected-bg: var(--custom-accent);
    --yamp-chip-selected-text: #fff;
    --search-text-secondary: #bbb;
    --search-error-bg: rgba(244, 67, 54, 0.8);
    --search-card-bg: rgba(255, 255, 255, 0.05);
    --search-thumb-placeholder-bg: rgba(255, 255, 255, 0.1);
    --search-thumb-placeholder-icon: rgba(255, 255, 255, 0.6);
    --search-success-text: #fff;
  }

  :host([data-match-theme="false"]) {
    --custom-accent: #ff9800;

    /* Search sheet default theme variables when match_theme is false */
    --search-overlay-bg: var(--yamp-overlay-bg);
    --search-input-bg: #333;
    --search-input-text: #fff;
    --search-text: #fff;
    --search-error: #ff6b6b;
    --search-success: #4caf50;
    --search-success-bg: rgba(76, 175, 80, 0.95);
    --search-border: rgba(255, 255, 255, 0.1);
    --search-hover-bg: rgba(255, 255, 255, 0.1);
    --search-play-hover: #e68900;
    --search-queue-bg: #4a4a4a;
    --search-queue-border: #666;
    --search-queue-hover: #5a5a5a;
    --search-queue-hover-border: #777;
  }

  :host([data-match-theme="true"]) {
    /* Always override custom-accent to use theme accent when match_theme is true, regardless of light/dark mode */
    --custom-accent: var(
      --accent-color,
      var(
        --primary-color,
        var(--state-media_player-active-color, var(--state-active-color, #ff9800))
      )
    );

    /* Dynamically assign base components to theme variants */
    --card-bg: var(--ha-card-background, var(--card-background-color, #222));
    --primary-text: var(--primary-text-color, #fff);
    --secondary-text: var(--secondary-text-color, #aaa);
    --chip-bg: var(--chip-background, #333);
    --yamp-section-bg: var(
      --ha-card-background,
      var(--card-background-color, rgba(255, 255, 255, 0.02))
    );
    --yamp-section-border: var(--divider-color, rgba(255, 255, 255, 0.1));
    --yamp-section-description-color: var(--secondary-text-color, #888);

    /* Search sheet theme-aware variables - used when match_theme is true to follow HA theme colors dynamically */
    --search-overlay-bg: var(--yamp-overlay-bg);
    --search-input-bg: var(--ha-card-background, var(--secondary-background-color, #333));
    --search-input-text: var(--primary-text-color, #fff);
    --search-text: var(--primary-text-color, #fff);
    --search-error: var(--error-color, #ff6b6b);
    --search-success: var(--success-color, #4caf50);
    --search-success-bg: color-mix(in srgb, var(--success-color, #4caf50) 95%, transparent);
    --search-border: var(--divider-color, rgba(255, 255, 255, 0.1));
    --search-hover-bg: var(--divider-color, rgba(255, 255, 255, 0.1));
    --search-play-hover: var(--custom-accent);
    --search-queue-bg: var(--ha-card-background, var(--card-background-color, #4a4a4a));
    --search-queue-border: var(--divider-color, #666);
    --search-queue-hover: var(--secondary-background-color, #5a5a5a);
    --search-queue-hover-border: var(--divider-color, #777);

    /* Universal theme-aware variables mapped to HA theme - used when appearance is automatic */
    --yamp-overlay-bg: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color, #000)),
      transparent 18%
    );
    --yamp-overlay-text: var(--primary-text-color, #fff);
    --yamp-overlay-text-shadow: none;
    --yamp-overlay-divider: var(--divider-color, rgba(255, 255, 255, 0.1));
    --yamp-icon-color: var(--primary-text-color, #fff);
    --yamp-button-bg: color-mix(in srgb, var(--primary-text-color, #fff) 10%, transparent);
    --yamp-button-border: var(--divider-color, rgba(255, 255, 255, 0.2));
    --yamp-overlay-text-secondary: var(--secondary-text-color, #888);
    --yamp-success-color: var(--success-color, #4caf50);
    --yamp-error-color: var(--error-color, #f44336);
    --yamp-success-bg-light: color-mix(in srgb, var(--success-color, #4caf50) 20%, transparent);
    --yamp-success-bg-medium: color-mix(in srgb, var(--success-color, #4caf50) 40%, transparent);
    --yamp-chip-selected-text: #fff;
    --search-text-secondary: var(--secondary-text-color, #aaa);

    /* Mode-aware chip defaults - used when appearance is automatic */
    --yamp-chip-bg: color-mix(
      in srgb,
      var(--primary-text-color, #fff) 8%,
      var(--ha-card-background, var(--card-background-color, rgba(0, 0, 0, 0.8)))
    );
    --yamp-chip-text: var(--search-text);
    --yamp-chip-selected-bg: var(--custom-accent);
    --yamp-chip-border: var(--divider-color, rgba(0, 0, 0, 0.1));
    --search-error-bg: color-mix(in srgb, var(--error-color, #f44336) 80%, transparent);
    --search-card-bg: color-mix(
      in srgb,
      var(--primary-text-color, #fff) 4%,
      var(--ha-card-background, var(--card-background-color, rgba(0, 0, 0, 0.8)))
    );
    --search-thumb-placeholder-bg: color-mix(
      in srgb,
      var(--primary-text-color, #fff) 10%,
      transparent
    );
    --search-thumb-placeholder-icon: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    --search-success-text: var(--primary-text-color, #fff);
  }

  /* Base card styles - set once, inherit everywhere */
  :host {
    display: block;
    border-radius: var(--border-radius);
    box-shadow: var(--ha-card-box-shadow, none);
    background: transparent;
    color: var(--primary-text);
    transition: background var(--transition-normal);
    overflow: visible;
    clip-path: none;
  }

  ha-card.yamp-card {
    display: block;
    border-radius: var(--border-radius);
    box-shadow: var(--ha-card-box-shadow, none);
    background: transparent;
    color: var(--primary-text);
    transition: background var(--transition-normal);
    overflow: hidden;
    font-size: inherit;
    position: relative;
    clip-path: none;
    transform: translateZ(0);
  }

  /* Add side padding only for scaled-contain modes where artwork doesn't fill the card edges */
  ha-card.yamp-card:has(> .yamp-card-inner[data-artwork-fit="scaled-contain"]),
  ha-card.yamp-card:has(> .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"]) {
    background: var(--card-bg);
  }

  .yamp-card-inner {
    position: relative;
    z-index: ${ce.FLOATING_ELEMENT};
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    container-type: inline-size;
    border-radius: var(--border-radius);
    clip-path: inset(0 round var(--border-radius));
    transform: translateZ(0);
  }

  .full-bleed-artwork-bg {
    position: absolute;
    inset: -50px;
    z-index: ${ce.MEDIA_BACKGROUND};
    background-size: var(--yamp-artwork-bg-size, cover);
    background-position: top center;
    background-repeat: no-repeat;
    pointer-events: none;
    transform: translateZ(0);
  }

  .full-bleed-artwork-fade {
    position: absolute;
    inset: -50px;
    z-index: ${ce.MEDIA_OVERLAY};
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.92) 100%
    );
    transform: translateZ(0);
  }

  /* Idle state dimming */
  .dim-idle .details,
  .dim-idle .controls-row,
  .dim-idle .volume-row,
  .dim-idle:not(.no-chip-dim) .chip-row,
  .dim-idle:not(.no-chip-dim) .action-chip-row {
    opacity: 0.28;
    transition: opacity 0.5s;
  }

  /* Improve selected chip readability while idle */
  .dim-idle .chip[selected] {
    color: rgba(255, 255, 255, 0.94);
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.35);
  }

  /* More info menu */
  .more-info-menu {
    display: flex;
    align-items: center;
    margin-right: -4px;
    margin-top: -5px;
    z-index: ${ce.FLOATING_CONTROLS};
  }

  .dim-idle .more-info-menu {
    position: absolute;
    bottom: 14px;
    right: 12px;
    margin-top: 0;
    margin-right: 0;
  }

  .more-info-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 36px;
    padding: 0;
    margin: 0;
    background: none;
    border: none;
    color: var(--primary-text);
    font: inherit;
    cursor: pointer;
    outline: none;
  }

  .more-info-btn ha-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    width: 28px;
    height: 28px;
    line-height: 1;
    vertical-align: middle;
    position: relative;
    margin: 0 0 2px 0;
    color: var(--yamp-icon-color, #fff);
    transition: color var(--transition-normal, 0.2s);
  }

  .dim-idle .more-info-btn ha-icon {
    color: #9ea2a8;
  }

  .more-info-icon {
    font-size: 2em;
    line-height: 1;
    color: #fff !important;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--transition-normal, 0.2s);
  }

  .dim-idle .more-info-icon {
    color: #9ea2a8;
  }

  /* Card artwork spacer */
  .card-artwork-spacer {
    width: 100%;
    flex: 1 1 0;
    height: auto;
    min-height: 180px;
    pointer-events: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-has-custom-height="true"]) .card-artwork-spacer {
    min-height: 48px;
  }

  /* Media background */
  .media-bg-full {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: ${ce.MEDIA_BACKGROUND};
    background-size: var(--yamp-artwork-bg-size, cover);
    background-position: top center;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  .media-bg-dim {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: ${ce.MEDIA_OVERLAY};
    pointer-events: none;
  }

  /* Source menu */
  .source-menu {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 0;
    margin: 0;
  }

  .source-menu-btn {
    background: none;
    border: none;
    color: var(--primary-text);
    font: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1px;
    padding: 2px 10px;
    font-size: 1em;
    outline: none;
  }

  .source-selected {
    min-width: 64px;
    font-weight: 500;
    padding-right: 4px;
    text-align: left;
  }

  .source-dropdown {
    position: absolute;
    top: 32px;
    right: 0;
    left: auto;
    background: var(--card-bg);
    color: var(--primary-text);
    border-radius: var(--button-border-radius);
    box-shadow: var(--shadow-light);
    min-width: 110px;
    z-index: ${ce.FLOATING_CONTROLS};
    margin-top: 2px;
    border: 1px solid var(--yamp-overlay-divider);
    overflow: hidden;
    max-height: 220px;
    overflow-y: auto;
  }

  .source-dropdown.up {
    top: auto;
    bottom: 38px;
    border-radius: var(--button-border-radius);
  }

  .source-option {
    padding: 8px 16px;
    cursor: pointer;
    transition: background var(--transition-fast);
    white-space: nowrap;
  }

  @media (hover: hover) {
    .source-option:hover,
    .source-option:focus {
      background: var(--custom-accent);
      color: #fff;
    }
  }

  .source-row {
    display: flex;
    align-items: center;
    padding: 0 16px 8px 16px;
    margin-top: 8px;
  }

  .source-select {
    font-size: 1em;
    padding: 4px 10px;
    border-radius: var(--button-border-radius);
    border: 1px solid #ccc;
    background: var(--card-bg);
    color: var(--primary-text);
    outline: none;
    margin-top: 2px;
  }

  /* Chip styles */
  .chip-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 8px;
    background: transparent;
    border-radius: 50%;
    overflow: hidden;
    padding: 0;
  }

  .chip[playing] .chip-icon {
    background: #fff;
  }

  .chip-icon ha-icon {
    width: 100%;
    height: 100%;
    font-size: 28px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    color: var(--custom-accent);
  }

  .chip[selected] .chip-icon ha-icon {
    color: #fff;
  }

  .chip[selected][playing] .chip-icon ha-icon {
    color: var(--custom-accent);
  }

  @media (hover: hover) {
    .chip:hover .chip-icon ha-icon {
      color: #fff;
    }
  }

  .chip-mini-art {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: var(--yamp-artwork-fit, cover);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.18);
    display: block;
  }

  /* Chip rows */
  .chip-row.grab-scroll-active,
  .action-chip-row.grab-scroll-active,
  .search-filter-chips.grab-scroll-active {
    cursor: grabbing;
  }

  .chip-row,
  .action-chip-row,
  .search-filter-chips {
    cursor: grab;
    flex-shrink: 0;
  }

  .chip-row {
    display: flex;
    gap: 8px;
    padding: 8px 12px 18px 12px;
    margin-bottom: -6px;
    position: relative;
    z-index: ${ce.STICKY_CHIPS};
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    ${Me}
    scrollbar-color: var(--accent-color, #1976d2) #222;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x;
    max-width: 100vw;
    background: transparent;
    -webkit-mask-image: ${Oi};
    mask-image: ${Oi};
  }

  .chip-row::-webkit-scrollbar-thumb {
    background: var(--accent-color, #1976d2);
    border-radius: 6px;
  }

  .chip-row::-webkit-scrollbar-track {
    background: #222;
  }

  .action-chip-row {
    display: flex;
    gap: 8px;
    padding: 2px 12px 16px 12px;
    margin-bottom: -6px;
    position: relative;
    z-index: ${ce.STICKY_CHIPS};
    overflow-x: auto;
    white-space: nowrap;
    ${Me}
    font-size: calc(1em * var(--yamp-text-scale-action-chips, 1));
    background: transparent;
    -webkit-mask-image: ${Oi};
    mask-image: ${Oi};
  }

  /* Action chips */
  .action-chip {
    background: var(--yamp-chip-bg, transparent);
    opacity: 1;
    border-radius: var(--button-border-radius);
    color: var(--yamp-chip-text, var(--primary-text));
    box-shadow: var(
      --chip-box-shadow,
      var(--ha-assistant-chip-box-shadow, var(--ha-card-box-shadow, none))
    );
    text-shadow: none;
    border: 1px solid var(--yamp-chip-border, transparent);
    outline: none;
    padding: 4px 12px;
    font-weight: 500;
    font-size: 0.95em;
    cursor: pointer;
    margin: 4px 0;
    transition:
      background var(--transition-normal) ease,
      transform 0.1s ease,
      box-shadow var(--transition-normal) ease;
    flex: 0 0 auto;
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  @media (hover: hover) {
    .action-chip:hover {
      background: var(--custom-accent);
      color: #fff;
      box-shadow: var(
        --chip-box-shadow,
        var(--ha-assistant-chip-box-shadow, var(--ha-card-box-shadow, none))
      );
      text-shadow: none;
    }
  }

  .action-chip:active {
    background: var(--custom-accent);
    color: #fff;
    transform: scale(0.96);
    box-shadow: var(
      --chip-box-shadow,
      var(--ha-assistant-chip-box-shadow, var(--ha-card-box-shadow, none))
    );
    text-shadow: none;
  }

  /* Override action chip colors when match_theme is false */
  :host([data-match-theme="false"]) .action-chip:active {
    background: #ff9800;
  }
  @media (hover: hover) {
    :host([data-match-theme="false"]) .action-chip:hover {
      background: #ff9800;
    }
  }

  /* Main chips */
  .chip {
    display: flex;
    align-items: center;
    border-radius: var(--chip-border-radius);
    padding: 6px 6px 6px 8px;
    background: var(--yamp-chip-bg);
    color: var(--yamp-chip-text);
    box-shadow: var(
      --chip-box-shadow,
      var(--ha-assistant-chip-box-shadow, var(--ha-card-box-shadow, none))
    );
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    opacity: 1;
    border: 1px solid var(--yamp-chip-border, transparent);
    outline: none;
    transition:
      background var(--transition-normal),
      opacity var(--transition-normal),
      box-shadow var(--transition-normal);
    flex: 0 0 auto;
    white-space: nowrap;
    position: relative;
  }

  @media (hover: hover) {
    .chip:hover {
      background: var(--yamp-chip-selected-bg);
      color: var(--yamp-chip-selected-text);
    }
  }

  .chip[selected] {
    background: var(--yamp-chip-selected-bg);
    color: var(--yamp-chip-selected-text);
    opacity: 1;
  }

  .chip[playing] {
    padding-right: 6px;
  }

  /* Playing indicator animation - equalizer bars */
  @keyframes chipPlayingBar1 {
    0%,
    100% {
      height: 3px;
    }
    50% {
      height: 10px;
    }
  }
  @keyframes chipPlayingBar2 {
    0%,
    100% {
      height: 5px;
    }
    50% {
      height: 12px;
    }
  }
  @keyframes chipPlayingBar3 {
    0%,
    100% {
      height: 4px;
    }
    50% {
      height: 8px;
    }
  }

  .chip-playing-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;
    margin-left: 6px;
    height: 14px;
  }

  .chip-playing-indicator .bar {
    width: 3px;
    background: currentColor;
    border-radius: 1px;
  }

  .chip-playing-indicator .bar:nth-child(1) {
    animation: chipPlayingBar1 0.8s ease-in-out 0s infinite;
  }

  .chip-playing-indicator .bar:nth-child(2) {
    animation: chipPlayingBar2 0.6s ease-in-out 0.15s infinite;
  }

  .chip-playing-indicator .bar:nth-child(3) {
    animation: chipPlayingBar3 0.7s ease-in-out 0.3s infinite;
  }

  .chip[playing]:not([selected]) .chip-playing-indicator {
    color: var(--custom-accent);
  }

  .chip[playing][selected] .chip-playing-indicator {
    color: #fff;
  }
  @media (hover: hover) {
    .chip[playing]:hover .chip-playing-indicator {
      color: #fff;
    }
  }

  /* Chip pin */
  .chip-pin {
    position: absolute;
    top: -6px;
    right: -6px;
    background: #fff;
    border-radius: 50%;
    padding: 2px;
    z-index: ${ce.FLOATING_ELEMENT};
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--custom-accent);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.11);
    cursor: pointer;
    transition: box-shadow 0.18s;
  }

  @media (hover: hover) {
    .chip-pin:hover {
      box-shadow: 0 2px 12px rgba(33, 33, 33, 0.17);
    }
  }

  .chip-pin ha-icon {
    color: var(--custom-accent);
    font-size: 16px;
    background: transparent;
    border-radius: 50%;
    margin: 0;
    padding: 0;
  }

  .chip-pin-inside {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    background: transparent;
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
  }

  .chip-pin-inside ha-icon {
    color: var(--custom-accent);
    font-size: 17px;
    margin: 0;
  }

  .chip[selected] .chip-pin-inside ha-icon {
    color: #fff;
  }

  @media (hover: hover) {
    .chip-pin:hover ha-icon,
    .chip-pin-inside:hover ha-icon,
    .chip-quick-group:hover ha-icon {
      color: #fff;
    }

    .chip:hover .chip-pin ha-icon,
    .chip:hover .chip-pin-inside ha-icon,
    .chip:hover .chip-quick-group ha-icon {
      color: #fff;
    }
  }

  .chip-quick-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    background: transparent;
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
  }

  .chip-quick-group ha-icon {
    color: var(--custom-accent);
    font-size: 17px;
    margin: 0;
  }

  .chip[selected] .chip-quick-group ha-icon {
    color: #fff;
  }

  .chip-pin-spacer {
    display: flex;
    width: 10px;
    min-width: 10px;
    height: 1px;
  }

  /* Group icon */
  .chip-icon.group-icon {
    background: var(--custom-accent);
    color: #fff;
    position: relative;
  }

  .group-count {
    font-weight: 700;
    font-size: 0.9em;
    line-height: 28px;
    text-align: center;
    width: 100%;
    color: inherit;
  }

  /* Media artwork */
  .media-artwork-bg {
    position: relative;
    width: 100%;
    aspect-ratio: 1.75/1;
    overflow: hidden;
    background-size: var(--yamp-artwork-bg-size, cover);
    background-repeat: no-repeat;
    background-position: top center;
  }

  .artwork {
    width: 96px;
    height: 96px;
    object-fit: var(--yamp-artwork-fit, cover);
    border-radius: 12px;
    box-shadow: var(--shadow-medium);
    background: #222;
  }

  /* Details section */
  .details {
    padding-top: 0;
    padding-right: calc(16px * var(--yamp-details-scale, 1));
    padding-bottom: calc(12px * var(--yamp-details-scale, 1));
    padding-left: calc(16px * var(--yamp-details-scale, 1));
    display: flex;
    flex-direction: column;
    gap: calc(8px * var(--yamp-details-scale, 1));
    margin-top: calc(8px * var(--yamp-details-scale, 1));
    min-height: calc(48px * var(--yamp-details-scale, 1));
    font-size: calc(1em * var(--yamp-details-scale, 1));
  }

  .details .title {
    font-size: calc(1.1em * var(--yamp-details-scale, 1));
    font-weight: 600;
    line-height: var(--yamp-details-line-height, 1.2);
    white-space: normal;
    word-break: break-word;
    overflow: visible;
    text-overflow: unset;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--yamp-details-max-lines, 3);
    overflow: hidden;
    padding-top: calc(8px * var(--yamp-details-scale, 1));
  }

  .details .artist {
    font-size: calc(1em * var(--yamp-details-scale, 1));
    line-height: var(--yamp-details-line-height, 1.2);
  }

  .track-options-row {
    display: flex;
    gap: 16px;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  .track-options-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    transition:
      opacity 0.2s,
      text-decoration 0.2s;
  }

  .track-options-btn ha-icon {
    --mdc-icon-size: 1.1rem;
    margin-top: -2px;
  }

  .track-options-close ha-icon {
    --mdc-icon-size: 1.3rem;
  }

  @media (hover: hover) {
    .track-options-btn:hover {
      opacity: 0.7;
      text-decoration: underline;
    }
  }

  .track-options-title {
    cursor: pointer;
    transition: text-decoration 0.2s;
  }

  @media (hover: hover) {
    .track-options-title:hover {
      text-decoration: underline;
    }
  }

  .title {
    font-size: 1.1em;
    font-weight: 600;
    line-height: 1.2;
    white-space: normal;
    word-break: break-word;
    overflow: visible;
    text-overflow: unset;
    display: block;
    padding-top: 8px;
  }

  .artist {
    font-size: 1em;
    font-weight: 400;
    color: var(--secondary-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
  }

  :host([data-details-alignment="center"]) .details {
    align-items: center;
    text-align: center;
  }

  :host([data-details-alignment="right"]) .details {
    align-items: flex-end;
    text-align: right;
  }

  :host([data-details-alignment="center"]) .track-options-row {
    justify-content: center;
  }

  :host([data-details-alignment="right"]) .track-options-row {
    justify-content: flex-end;
  }

  /* Controls */
  .controls-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 4px 16px;
  }

  .controls-row.adaptive {
    justify-content: center;
    gap: var(--yamp-control-gap, 10px);
    flex-wrap: nowrap;
  }

  .controls-row.adaptive .button {
    flex: 1 1
      calc(
        (100% - (var(--yamp-control-gap, 10px) * (var(--yamp-control-count, 5) - 1))) /
          var(--yamp-control-count, 5)
      );
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--yamp-control-min-width, 48px);
    max-width: var(--yamp-control-max-width, 120px);
    min-height: var(--yamp-control-min-height, 48px);
    padding: var(--yamp-control-padding, 8px);
  }

  .controls-row.adaptive .button ha-icon {
    --mdc-icon-size: var(--yamp-control-icon-size, 36px);
    width: var(--yamp-control-icon-size, 36px);
    height: var(--yamp-control-icon-size, 36px);
    font-size: var(--yamp-control-icon-size, 36px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .controls-row.adaptive .button ha-icon svg,
  .controls-row.adaptive .button ha-icon iron-icon {
    width: 100%;
    height: 100%;
  }

  .controls-row.modern {
    justify-content: center;
    gap: 14px;
    padding: 10px 16px 2px 16px;
    /* Grid layout for robust centering */
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  }

  .controls-row.modern .controls-left {
    grid-column: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 14px;
  }

  .controls-row.modern .controls-center {
    grid-column: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }

  .controls-row.modern .controls-right {
    grid-column: 3;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
  }

  .modern-button {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: inherit;
    cursor: pointer;
    border-radius: 999px;
    transition:
      background var(--transition-normal),
      transform 0.12s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }

  .modern-button.small,
  .modern-button.medium,
  .modern-button.primary {
    font-size: inherit;
  }

  .modern-button.small {
    width: 42px;
    height: 42px;
    padding: 0;
  }

  .modern-button.medium {
    width: 50px;
    height: 50px;
    padding: 0;
  }

  .modern-button.primary {
    width: 70px;
    height: 70px;
    font-size: 1.9em;
    background: rgba(255, 255, 255, 0.1);
  }

  .modern-button ha-icon {
    --mdc-icon-size: 24px;
    width: 24px;
    height: 24px;
  }

  .modern-button.medium ha-icon {
    --mdc-icon-size: 28px;
    width: 28px;
    height: 28px;
  }

  .modern-button.primary ha-icon {
    --mdc-icon-size: 36px;
    width: 36px;
    height: 36px;
  }

  @media (hover: hover) {
    .modern-button:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  .modern-button:active {
    transform: scale(0.95);
  }

  .modern-button.active:not(.primary) {
    color: var(--custom-accent);
  }

  .modern-button.primary.active {
    color: inherit;
  }

  /* Tighter spacing for collapsed mode with artwork */
  .card-lower-content.collapsed.has-artwork .controls-row {
    gap: 8px;
    padding: 4px 12px 4px 16px;
  }

  .button {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5em;
    cursor: pointer;
    padding: 6px;
    border-radius: var(--button-border-radius);
    transition: background var(--transition-normal);
  }

  .button:active {
    background: rgba(0, 0, 0, 0.1);
  }

  .button.active ha-icon,
  .button.active {
    color: var(--custom-accent);
  }

  /* Progress bar */
  .progress-bar-container {
    padding-left: 24px;
    padding-right: 24px;
    box-sizing: border-box;
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.22);
    border-radius: var(--progress-radius, 2px);
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }

  .progress-inner {
    height: 100%;
    background: var(--custom-accent);
    border-radius: var(--progress-radius, 3px) 0 0 var(--progress-radius, 3px);
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.24);
  }

  .timestamps-container {
    display: flex;
    justify-content: space-between;
    font-size: var(--timestamp-size, 10px);
    margin-top: -1px;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.9);
    padding: 0 2px;
  }

  /* Volume controls */
  .volume-row {
    display: grid;
    grid-template-columns: minmax(min-content, 1fr) auto minmax(min-content, 1fr);
    align-items: center;
    padding: 10px 16px 14px 16px;
  }

  /* Remove flex:1 since we are using grid columns */
  .volume-left,
  .volume-right {
    display: flex;
    align-items: center;
  }

  .volume-left {
    grid-column: 1;
    justify-self: start;
    justify-content: flex-start;
    gap: 8px;
  }

  .volume-right {
    grid-column: 3;
    justify-self: end;
    justify-content: flex-end;
    gap: 8px;
  }

  .volume-center {
    grid-column: 2;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }

  .volume-row.has-slider .volume-left,
  .volume-row.has-slider .volume-right {
    flex: 0 0 auto;
  }

  .volume-row.has-slider {
    grid-template-columns: minmax(min-content, 1fr) 4fr minmax(min-content, 1fr);
  }

  .volume-row.has-slider .volume-center {
    width: 100%;
    justify-self: stretch;
  }

  .volume-controls {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0;
  }

  .search-sheet-play,
  .search-sheet-queue {
    background: none;
    border: none;
    cursor: pointer;
    color: #fff;
    padding: 4px;
    border-radius: 50%;
    transition: background 0.2s;
  }

  .radio-mode-button {
    background: none;
    border: none;
    font-size: 1.25em;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 50%;
    transition: all 0.2s ease;
    margin-right: 8px;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .radio-mode-button.active {
    color: var(--custom-accent, var(--accent-color));
  }

  .volume-icon-btn {
    background: none;
    border: none;
    color: var(--primary-text);
    cursor: pointer;
    padding: 0px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--transition-normal);
    min-width: 36px;
    min-height: 36px;
    margin: 0;
  }

  @media (hover: hover) {
    .volume-icon-btn:hover {
      color: var(--custom-accent);
    }
  }

  .volume-icon-btn ha-icon {
    font-size: 1.2em;
    color: #fff;
  }

  .volume-icon-btn.favorite-volume-btn {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }

  .volume-leading-placeholder {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .volume-icon-btn.favorite-volume-btn.active {
    color: var(--custom-accent);
  }

  .volume-slider-container {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    position: relative;
    padding: 0 24px;
  }

  .volume-slider-icon {
    font-size: 1em;
    color: var(--primary-text);
    opacity: 0.7;
    min-width: 20px;
  }

  .volume-percentage-indicator {
    position: absolute;
    top: -22px;
    background: var(--custom-accent);
    color: var(--yamp-chip-selected-text);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.72em;
    font-weight: 700;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    white-space: nowrap;
    z-index: ${ce.FLOATING_CONTROLS};
    transform: translateX(-50%);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .volume-percentage-indicator::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: var(--custom-accent) transparent transparent transparent;
  }

  .volume-percentage-indicator.visible {
    opacity: 1;
  }

  .vol-slider {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    background: hsla(0, 0%, 100%, 0.22);
    border-radius: 3px;
    outline: none;
    box-shadow: var(--shadow-heavy);
    flex: 1 1 auto;
    min-width: 80px;
    max-width: none;
    margin: 10px 0;
  }

  .volume-row .source-menu {
    flex: 0 0 auto;
  }

  .volume-placeholder {
    width: 36px;
    min-width: 36px;
    min-height: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Volume slider thumbs */
  .vol-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--custom-accent);
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    border: 2px solid #fff;
  }

  .vol-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--custom-accent);
    cursor: pointer;
    border: 2px solid #fff;
  }

  .vol-slider::-moz-range-track {
    height: 6px;
    background: rgba(255, 255, 255, 0.22);
    border-radius: 3px;
  }

  .vol-slider::-ms-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--custom-accent);
    cursor: pointer;
    border: 2px solid #fff;
  }

  .vol-slider::-ms-fill-lower,
  .vol-slider::-ms-fill-upper {
    height: 6px;
    background: rgba(255, 255, 255, 0.22);
    border-radius: 3px;
  }

  /* Touch device improvements */
  @media (pointer: coarse) {
    .vol-slider::-webkit-slider-thumb {
      box-shadow: 0 0 0 18px rgba(0, 0, 0, 0);
    }
    .vol-slider::-moz-range-thumb {
      box-shadow: 0 0 0 18px rgba(0, 0, 0, 0);
    }
    .vol-slider::-ms-thumb {
      box-shadow: 0 0 0 18px rgba(0, 0, 0, 0);
    }
  }

  .vol-stepper-container {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;
  }

  .vol-stepper {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .vol-stepper .button {
    min-width: 36px;
    min-height: 36px;
    font-size: 1.5em;
    padding: 6px 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vol-value {
    min-width: 48px;
    display: inline-block;
    text-align: center;
    padding-left: 6px;
  }

  .vol-label {
    width: 42px;
    display: inline-block;
    font-size: 0.85em;
    text-transform: lowercase;
    opacity: 0.9;
  }

  /* Light mode overrides */
  :host([data-appearance="light"]:not([data-match-theme="true"])) {
    ${Gs}
  }

  :host([data-appearance="light"]:not([data-match-theme="true"])) .source-dropdown {
    ${Qs}
  }

  @media (prefers-color-scheme: light) {
    :host([data-appearance="automatic"]:not([data-match-theme="true"])) {
      ${Gs}
    }

    :host([data-appearance="automatic"]:not([data-match-theme="true"])) .source-dropdown {
      ${Qs}
    }
  }

  /* Artwork overlay */
  .artwork-dim-overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: ${ce.FLOATING_ELEMENT};
  }

  /* Card lower content */
  .card-lower-content-container {
    position: relative;
    width: 100%;
    min-height: auto;
    height: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
    overflow: hidden;
  }

  .card-lower-content-bg {
    position: absolute;
    inset: 0;
    z-index: ${ce.MEDIA_BACKGROUND};
    background-size: var(--yamp-artwork-bg-size, cover);
    background-position: top center;
    background-repeat: no-repeat;
    pointer-events: none;
    height: 100%;
  }

  .card-lower-fade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: ${ce.MEDIA_OVERLAY};
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.92) 100%
    );
  }

  .card-lower-content {
    position: relative;
    z-index: ${ce.FLOATING_ELEMENT};
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-lower-content.transitioning .details,
  .card-lower-content.transitioning .card-artwork-spacer {
    transition: opacity 0.3s;
  }

  .card-lower-content.collapsed.has-artwork .details {
    opacity: 1;
    pointer-events: auto;
    margin-right: var(--yamp-collapsed-details-offset, 120px);
    transition: margin var(--transition-normal);
  }

  @media (max-width: 420px) {
    .card-lower-content.collapsed.has-artwork .details {
      margin-right: var(--yamp-collapsed-details-offset, 74px);
    }
  }

  .card-lower-content.collapsed .card-artwork-spacer {
    opacity: 0;
    pointer-events: none;
  }

  .card-lower-content.collapsed .card-artwork-spacer.show-placeholder {
    opacity: 1;
    pointer-events: auto;
  }

  :host([data-has-custom-height="true"]) .card-lower-content.collapsed {
    justify-content: center;
  }

  :host([data-has-custom-height="true"])
    .card-lower-content.collapsed
    .card-artwork-spacer:not(.show-placeholder) {
    flex: 0 0 0;
    min-height: 0;
  }

  .collapsed-flex-spacer {
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
  }

  .card-lower-content .source-menu-btn,
  .card-lower-content .source-selected,
  .details,
  .title,
  .artist,
  .controls-row,
  .button,
  .vol-stepper span,
  .vol-label {
    color: #fff;
  }

  /* Scaled Contain Alternate mode - use theme colors since background is transparent */
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .details,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .title,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .artist,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .source-menu-btn,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .source-selected,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .controls-row,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .button,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .vol-stepper span,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .vol-label,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .more-info-btn ha-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .volume-icon-btn,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .volume-icon-btn ha-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .radio-mode-button,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .volume-slider-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .timestamps-container {
    color: var(--primary-text);
  }

  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button {
    background: color-mix(in srgb, var(--primary-text), transparent 85%);
    box-shadow: none; /* Cleaner look on card background */
  }

  /* Hamburger icon (span) uses !important in base styles, so we override it here */
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .more-info-icon {
    color: var(--primary-text) !important;
  }

  /* Ensure active buttons still use the accent color */
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .button.active,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .button.active ha-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button.active,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button.active ha-icon {
    color: var(--custom-accent);
  }

  /* Hover effects for primary playback controls using chip color variables (background + text) */
  @media (hover: hover) {
    .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .controls-row .button:hover,
    .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button:hover {
      background: var(--yamp-chip-selected-bg);
      color: var(--yamp-chip-selected-text) !important;
      border-radius: var(--button-border-radius, 8px);
    }
  }

  /* Modern button hover specifically needs 999px radius to stay circular */
  @media (hover: hover) {
    .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button:hover {
      border-radius: 999px;
    }
  }

  @media (hover: hover) {
    .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"]
      .controls-row
      .button:hover
      ha-icon,
    .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button:hover ha-icon {
      color: var(--yamp-chip-selected-text) !important;
    }
  }

  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .inset-artwork {
    border-radius: var(--ha-card-border-radius, 12px);
    border: var(--ha-card-border-width, 1px) solid
      var(--ha-card-border-color, var(--divider-color, #e0e0e0));
  }

  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .vol-slider,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .progress-bar {
    background: color-mix(in srgb, var(--primary-text), transparent 80%);
  }

  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .vol-slider::-webkit-slider-thumb {
    border-color: var(--primary-text);
  }

  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .vol-slider::-moz-range-thumb {
    border-color: var(--primary-text);
  }

  .vol-stepper span {
    width: 42px;
    text-align: center;
    display: inline-block;
  }

  .card-lower-content.collapsed .details .title,
  .card-lower-content.collapsed .title {
    font-size: calc(1.1em * var(--yamp-collapsed-title-scale, 1));
    line-height: calc(1.2 * var(--yamp-collapsed-title-scale, 1));
  }

  .card-lower-content.collapsed .artist {
    font-size: calc(1em * var(--yamp-collapsed-artist-scale, 1));
  }

  /* Media artwork placeholder */
  .media-artwork-placeholder {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(96px, 50%, 184px);
    aspect-ratio: 1;
    pointer-events: none;
  }

  .media-artwork-placeholder svg {
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0.85;
  }

  /* Collapsed artwork */
  .card-lower-content.collapsed .collapsed-artwork-container {
    position: absolute;
    top: 16px;
    right: 6px;
    width: calc(var(--yamp-collapsed-artwork-size, 102px) + 8px);
    height: calc(100% - 60px);
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    z-index: ${ce.FLOATING_ELEMENT};
    background: transparent;
    pointer-events: none;
    box-shadow: none;
    padding: 0;
    transition:
      background var(--transition-slow),
      width var(--transition-normal);
  }

  :host([data-has-custom-height="true"])
    .card-lower-content.collapsed
    .collapsed-artwork-container {
    align-items: center;
    top: 0;
    /* Clearance dynamically accounts for controls-row (~44px) + volume-row (~46px) + padding (~10px) */
    height: calc(100% - var(--yamp-collapsed-artwork-clearance, 100px));
  }

  .card-lower-content.collapsed .collapsed-artwork {
    width: var(--yamp-collapsed-artwork-size, 102px);
    height: var(--yamp-collapsed-artwork-size, 102px);
    border-radius: 16px;
    object-fit: var(--yamp-artwork-fit, cover);
    background: transparent;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.22);
    pointer-events: none;
    user-select: none;
    display: block;
    margin: 2px;
    transition:
      width var(--transition-normal),
      height var(--transition-normal);
  }

  .card-lower-content.collapsed.has-artwork .controls-row {
    max-width: calc(100% - var(--yamp-collapsed-controls-offset, 120px));
    margin-right: max(calc(var(--yamp-collapsed-controls-offset, 120px) - 5px), 0px);
    width: auto;
  }

  :host([data-has-custom-height="true"]) .card-lower-content.collapsed.has-artwork .volume-row {
    max-width: calc(100% - var(--yamp-collapsed-controls-offset, 120px));
    margin-right: max(calc(var(--yamp-collapsed-controls-offset, 120px) - 5px), 0px);
  }

  /* Medium screens */
  @media (max-width: 600px) {
    .card-lower-content.collapsed.has-artwork .controls-row {
      max-width: calc(100% - var(--yamp-collapsed-controls-offset, 115px));
      margin-right: max(calc(var(--yamp-collapsed-controls-offset, 115px) - 5px), 0px);
      width: auto;
    }

    :host([data-has-custom-height="true"]) .card-lower-content.collapsed.has-artwork .volume-row {
      max-width: calc(100% - var(--yamp-collapsed-controls-offset, 115px));
      margin-right: max(calc(var(--yamp-collapsed-controls-offset, 115px) - 5px), 0px);
    }

    .card-lower-content.collapsed .collapsed-artwork-container {
      right: 4px;
      top: 14px;
    }
  }

  /* Small screens */
  @media (max-width: 420px) {
    .card-lower-content.collapsed.has-artwork .controls-row {
      max-width: calc(100% - var(--yamp-collapsed-controls-offset, 90px));
      margin-right: max(calc(var(--yamp-collapsed-controls-offset, 90px) - 5px), 0px);
      width: auto;
    }

    :host([data-has-custom-height="true"]) .card-lower-content.collapsed.has-artwork .volume-row {
      max-width: calc(100% - var(--yamp-collapsed-controls-offset, 90px));
      margin-right: max(calc(var(--yamp-collapsed-controls-offset, 90px) - 5px), 0px);
    }

    .card-lower-content.collapsed .collapsed-artwork-container {
      right: 3px;
      top: 12px;
    }
  }

  /* Very small screens */
  @media (max-width: 320px) {
    .card-lower-content.collapsed.has-artwork .controls-row {
      max-width: calc(100% - var(--yamp-collapsed-controls-offset, 80px));
      margin-right: max(calc(var(--yamp-collapsed-controls-offset, 80px) - 5px), 0px);
      width: auto;
    }

    :host([data-has-custom-height="true"]) .card-lower-content.collapsed.has-artwork .volume-row {
      max-width: calc(100% - var(--yamp-collapsed-controls-offset, 80px));
      margin-right: max(calc(var(--yamp-collapsed-controls-offset, 80px) - 5px), 0px);
    }

    .card-lower-content.collapsed .collapsed-artwork-container {
      right: 2px;
      top: 10px;
    }
  }

  /* Collapsed progress bar */
  .collapsed-progress-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 4px;
    background: var(--custom-accent);
    border-radius: var(--progress-radius, 0) var(--progress-radius, 0) 12px 12px;
    z-index: ${ce.ACCENT_FOREGROUND};
    transition: width var(--transition-normal) linear;
    pointer-events: none;
  }

  /* Entity options overlay */
  .entity-options-overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: ${ce.OVERLAY_BASE};
    background: var(--yamp-overlay-bg);
    backdrop-filter: ${Fi};
    -webkit-backdrop-filter: ${Fi};
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  /* Opening animations for hamburger menu */
  @keyframes overlayFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes containerSlideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes sheetSlideIn {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .entity-options-overlay-opening {
    animation: overlayFadeIn 0.2s ease-out;
  }

  .entity-options-container-opening {
    animation: containerSlideIn 0.3s ease-out;
  }

  .entity-options-sheet-opening {
    animation: sheetSlideIn 0.25s ease-out 0.05s both;
  }

  /* Closing animations for hamburger menu */
  @keyframes overlayFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes containerSlideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-20px);
      opacity: 0;
    }
  }

  @keyframes sheetSlideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(10px);
      opacity: 0;
    }
  }

  .entity-options-overlay-closing {
    animation: overlayFadeOut 0.15s ease-in forwards;
    pointer-events: none;
  }

  .entity-options-container-closing {
    animation: containerSlideOut 0.2s ease-in forwards;
  }

  .entity-options-sheet-closing {
    animation: sheetSlideOut 0.15s ease-in 0.05s both forwards;
  }

  .entity-options-container {
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin: 2% auto;
    ${Me}
    display: flex;
    flex-direction: column;
    max-height: calc(96% - 70px);
    min-height: 90px;
    position: relative;
  }

  /* Expand container height when hide_menu_player is enabled (no persistent controls) */
  :host([data-hide-menu-player="true"]) .entity-options-container {
    max-height: 96%;
  }

  /* Expand container height when persistent controls are hidden due to layout constraints */
  :host([data-hide-persistent-controls="true"]) .entity-options-container,
  :host([data-pin-search-headers="true"]) .entity-options-container {
    max-height: 96%;
    ${Me}
  }

  /* Persistent Media Controls */
  /* Persistent Media Controls */
  .persistent-media-controls {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    padding: 14px 22px 18px 22px;
    margin: 0;
    background: transparent;
    border-radius: 0;
    border: none;
    flex-shrink: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    z-index: ${ce.FLOATING_CONTROLS};
  }

  /* Hide persistent controls when hide_menu_player is enabled */
  :host([data-hide-menu-player="true"]) .persistent-media-controls {
    display: none;
  }

  /* Hide persistent controls when layout constraints require it */
  :host([data-hide-persistent-controls="true"]) .persistent-media-controls {
    display: none;
  }

  .persistent-controls-artwork {
    grid-column: 1;
    justify-self: start;
    flex-shrink: 0;
  }

  .persistent-artwork {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    object-fit: var(--yamp-artwork-fit, cover);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .persistent-artwork-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  }

  .persistent-artwork-placeholder ha-icon {
    color: rgba(255, 255, 255, 0.6);
    font-size: 16px;
  }

  .artist,
  .vol-label,
  .vol-value {
    color: rgba(255, 255, 255, 0.75);
    font-weight: 400;
  }

  .persistent-controls-buttons {
    grid-column: 2;
    justify-self: center;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .persistent-volume-stepper {
    grid-column: 3;
    justify-self: end;
    display: flex;
    align-items: center;
    gap: 0px;
  }

  .persistent-volume-stepper .stepper-btn {
    background: none;
    border: none;
    color: var(--yamp-overlay-text);
    font-size: 20px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  @media (hover: hover) {
    .persistent-volume-stepper .stepper-btn:hover {
      color: var(--custom-accent);
    }
  }

  .persistent-volume-stepper .stepper-btn:active {
    transform: scale(0.92);
  }

  .persistent-volume-stepper .stepper-value {
    font-size: 0.95em;
    opacity: 0.85;
    min-width: 48px;
    text-align: center;
    color: var(--yamp-overlay-text);
    padding-left: 6px;
  }

  .entity-options-search-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: var(--yamp-button-bg);
    border: 1px solid var(--yamp-button-border);
  }

  .persistent-control-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--yamp-overlay-text);
  }

  @container (max-width: 450px) {
    .persistent-volume-stepper {
      margin-right: -12px;
    }

    .persistent-volume-stepper .stepper-value {
      min-width: 36px;
      padding-left: 2px;
    }

    .persistent-volume-stepper .stepper-btn {
      width: 32px;
      height: 32px;
      font-size: 18px;
    }
  }

  @media (hover: hover) {
    .persistent-control-btn:hover {
      background: var(--custom-accent);
      border-color: var(--custom-accent);
      transform: scale(1.05);
    }
  }

  .persistent-control-btn:active {
    transform: scale(0.95);
  }

  .persistent-control-btn ha-icon {
    font-size: 16px;
    color: inherit;
  }

  .entity-options-sheet {
    background: none;
    border-radius: var(--border-radius);
    box-shadow: none;
    width: 100%;
    padding: 18px 8px 0px 8px;
    padding-top: clamp(12px, 6vh, 18px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    ${Me}
    font-size: calc(1em * var(--yamp-text-scale-menu, 1));
    position: relative;
    box-sizing: border-box;
    color: var(--yamp-overlay-text);
  }

  /* Main menu specific styling - move options down, adapt to card height */
  .entity-options-sheet .entity-options-menu {
    margin-top: 0px;
    margin-bottom: 16px;
  }

  .in-menu-active-label {
    position: absolute;
    left: 50%;
    bottom: 6px;
    transform: translateX(-50%);
    font-size: 0.78em;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #fff;
    opacity: 0.78;
    pointer-events: none;
  }

  /* When always collapsed is enabled, keep menu at top */
  :host([data-always-collapsed="true"]) .entity-options-sheet .entity-options-menu {
    margin-top: 0px;
  }

  /* Remove spacing between menu items */
  .entity-options-sheet .entity-options-menu .entity-options-item {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  .entity-options-container,
  .entity-options-container-opening {
    position: relative;
  }

  .entity-options-chips-wrapper {
    position: sticky;
    top: 0;
    z-index: ${ce.STICKY_CHIPS};
    padding: 2px 4px 2px 4px;
    background: transparent;
  }

  .entity-options-chips-strip {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    padding: 2px 8px 2px 8px;
    background: var(--ha-menu-chip-row-background, transparent);
    -webkit-mask-image: none;
    mask-image: none;
  }

  .entity-options-chips-strip .chip {
    /* Uses centralized .chip styling */
  }

  .entity-options-menu.chips-in-menu {
    margin-top: 4px;
  }

  .entity-options-sheet.chips-mode {
    padding-top: 4px;
  }

  .entity-options-sheet {
    ${Me}
  }

  /* Hide scrollbar for group list scroll container */
  .group-list-scroll {
    ${Me}
  }

  /* Seamless grouping header and scrolling list */
  .entity-options-sheet[data-pin-search-headers="true"] .group-list-header {
    z-index: 1;
    padding-top: 4px;
    margin-top: -4px;
    padding-bottom: 4px;
  }

  .entity-options-sheet[data-pin-search-headers="true"] .group-list-scroll {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    margin-bottom: 72px; /* Reserve space for controls */
    padding-bottom: 0;
    scrollbar-width: thin; /* Allow scrollbar if needed */
  }

  .entity-options-sheet[data-pin-search-headers="true"] .group-list-scroll::-webkit-scrollbar {
    display: block;
    width: 6px;
  }

  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .group-list-scroll,
  :host([data-hide-menu-player="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .group-list-scroll {
    margin-bottom: 12px;
    padding-bottom: 0;
  }

  .entity-options-title {
    font-size: 1.1em;
    font-weight: 500;
    margin-bottom: 18px;
    text-align: center;
    color: var(--yamp-overlay-text);
    background: none;
  }

  .entity-options-item {
    background: none;
    color: var(--yamp-overlay-text);
    border: none;
    border-radius: 10px;
    font-size: 1.12em;
    font-weight: 400;
    margin: 4px 0;
    padding: 6px 0 8px 0;
    cursor: pointer;
    transition: color var(--transition-fast);
    text-align: center;
  }

  .entity-options-item.menu-action-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
  }

  .entity-options-item.menu-action-item .menu-action-icon {
    color: inherit;
    --mdc-icon-color: currentColor;
    --icon-color: currentColor;
    --paper-item-icon-color: currentColor;
    --ha-icon-color: currentColor;
    fill: currentColor;
  }

  .entity-options-item.menu-action-item .menu-action-label {
    color: inherit;
  }

  @media (hover: hover) {
    .entity-options-item:hover {
      color: var(--custom-accent, #ff9800);
      background: none;
    }
  }

  .entity-options-item.close-item {
    font-weight: 500;
    margin: 1px 0;
    margin-top: 12px;
    padding-top: 4px;
    padding-bottom: 5px;
    display: block;
    width: 100%;
  }

  .entity-options-divider {
    height: 1px;
    background: var(--yamp-overlay-divider);
    margin: 1px 0 8px 0;
    width: 100%;
    display: block;
  }

  /* Ensure Group Players header always shows a single divider */
  .grouping-header {
    width: 100%;
  }

  /* Source index */
  .source-index-letter:focus {
    background: rgba(255, 255, 255, 0.11);
    outline: 1px solid var(--custom-accent);
  }

  .source-list-centering-wrapper {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .source-list-sheet {
    width: 100%;
    position: relative;
    overflow: visible;
  }

  .source-list-scroll {
    overflow-y: auto;
    max-height: 340px;
    ${Me}
    width: 100%;
  }

  .source-list-scroll .entity-options-item {
    width: 100%;
  }

  .floating-source-index.grab-scroll-active,
  .floating-source-index.grab-scroll-active * {
    cursor: grabbing;
  }

  .floating-source-index {
    position: absolute;
    top: 55px;
    bottom: 20px;
    right: 0;
    width: 32px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: auto;
    overscroll-behavior: contain;
    z-index: ${ce.ACCENT_FOREGROUND};
    padding: 0 8px 0 0;
    overflow-y: auto;
    max-height: calc(100% - 75px);
    min-width: 38px;
    ${Me}
  }

  .entity-options-sheet.chips-mode .floating-source-index {
    top: clamp(72px, 15vh, 120px);
    height: calc(100% - clamp(72px, 15vh, 120px));
  }

  .floating-source-index .source-index-letter {
    background: none;
    border: none;
    color: var(--yamp-overlay-text);
    font-size: 0.9em;
    cursor: pointer;
    margin: 1px 0;
    padding: 0;
    pointer-events: auto;
    outline: none;
    transition:
      color var(--transition-fast),
      background var(--transition-fast),
      transform 0.16s cubic-bezier(0.35, 1.8, 0.4, 1.04);
    transform: scale(1);
    z-index: ${ce.MEDIA_OVERLAY};
    min-height: 22px;
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .floating-source-index .source-index-letter[data-scale="max"] {
    transform: scale(1.38);
    z-index: ${ce.OVERLAY_BASE};
  }

  .floating-source-index .source-index-letter[data-scale="large"] {
    transform: scale(1.19);
    z-index: ${ce.FLOATING_ELEMENT};
  }

  .floating-source-index .source-index-letter[data-scale="med"] {
    transform: scale(1.1);
    z-index: ${ce.MEDIA_OVERLAY};
  }

  .floating-source-index .source-index-letter::after {
    display: none;
  }

  @media (hover: hover) {
    .floating-source-index .source-index-letter:hover,
    .floating-source-index .source-index-letter:focus {
      color: var(--yamp-overlay-text);
    }
  }

  .floating-source-index .source-index-letter[disabled] {
    opacity: 0.25;
    cursor: default;
  }

  /* Group toggle buttons */
  .group-toggle-btn {
    background: none;
    border: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    margin-right: 10px;
    cursor: pointer;
    transition: background 0.15s ease;
    color: var(--yamp-overlay-text);
  }

  .group-toggle-btn ha-icon {
    width: 22px;
    height: 22px;
  }

  .group-toggle-transparent {
    background: none;
    border: none;
    box-shadow: none;
    color: transparent;
    pointer-events: none;
  }

  @media (hover: hover) {
    .group-toggle-transparent:hover {
      background: none;
    }
  }

  /* Force theme-aware text in grouping sheet */
  .entity-options-sheet,
  .entity-options-sheet * {
    color: var(--yamp-overlay-text);
  }

  /* Specific override to ensure selected/hovered chips keep their text color regardless of the global sheet rule above */
  .entity-options-sheet .chip[selected],
  .entity-options-sheet .chip[selected] * {
    color: var(--yamp-chip-selected-text) !important;
  }

  @media (hover: hover) {
    .entity-options-sheet .chip:hover,
    .entity-options-sheet .chip:hover * {
      color: var(--yamp-chip-selected-text) !important;
    }
  }

  /* Search functionality */
  .entity-options-search {
    padding: 0px 10px 80px 10px;
  }

  .entity-options-search-row {
    display: flex;
    gap: 8px;
    margin-bottom: 4px;
    margin-top: 2px;
  }

  .yamp-search-result.menu-active > *:not(.search-row-slide-out):not([class$="-overlay"]) {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  .yamp-search-result {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 0;
    border-bottom: 1px solid var(--search-border);
    font-size: 1.1em;
    color: var(--primary-text);
    background: none;
    width: 100%;
    box-sizing: border-box;
  }
  .search-row-slide-out {
    position: absolute;
    inset: 0;
    left: 100%;
    background: var(--search-overlay-bg);
    backdrop-filter: ${Us};
    -webkit-backdrop-filter: ${Us};
    z-index: ${ce.SEARCH_SLIDE_OUT};
    display: flex;
    align-items: center;
    padding: 0 8px;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 15px 0 0 15px;
    overflow-x: auto;
    ${Me}
    gap: 4px;
  }

  .search-row-slide-out.active {
    left: 0;
  }

  .search-row-success-overlay,
  .search-row-loading-overlay,
  .search-row-error-overlay {
    position: absolute;
    inset: 0;
    background: var(--search-overlay-bg);
    backdrop-filter: ${Hs};
    -webkit-backdrop-filter: ${Hs};
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--yamp-overlay-text);
    font-weight: 600;
    font-size: 0.95em;
    z-index: ${ce.SEARCH_SUCCESS};
    border-radius: inherit;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.05);
    animation: success-fade-in 0.3s ease;
  }

  .search-row-error-overlay {
    background: var(--search-error-bg);
  }

  .search-row-success-overlay span:first-child,
  .search-row-loading-overlay ha-icon,
  .search-row-error-overlay ha-icon {
    font-size: 1.5em;
  }

  .search-row-loading-overlay ha-icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes success-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .slide-out-button {
    flex: 0 0 auto;
    background: transparent;
    border: none;
    color: var(--yamp-overlay-text);
    padding: 6px 10px;
    border-radius: 18px;
    cursor: pointer;
    font-size: 0.88em;
    font-weight: 500;
    white-space: nowrap;
  }

  /* Redundant .chip removed - now uses base styling at line 571 */
  .slide-out-button {
    transition:
      background 0.2s,
      color 0.2s;
  }

  @media (hover: hover) {
    .slide-out-button:hover {
      background: var(--custom-accent);
      color: #fff;
    }
  }

  .slide-out-button ha-icon {
    width: 18px;
    height: 18px;
    color: inherit;
    --mdc-icon-color: currentColor;
    --icon-color: currentColor;
    --paper-item-icon-color: currentColor;
    --ha-icon-color: currentColor;
    fill: currentColor;
  }

  .slide-out-close {
    margin-left: auto;
    color: var(--yamp-overlay-text);
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (hover: hover) {
    .slide-out-close:hover {
      color: var(--custom-accent);
    }
  }

  .yamp-search-result:last-child {
    border-bottom: none;
  }

  .yamp-search-result.placeholder {
    visibility: hidden;
    border-bottom: 1px solid transparent;
    min-height: 46px;
    box-sizing: border-box;
  }

  .yamp-search-result-thumb {
    height: 38px;
    width: 38px;
    border-radius: var(--button-border-radius);
    object-fit: var(--yamp-artwork-fit, cover);
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16);
    margin-right: 12px;
  }

  .entity-options-search-buttons {
    display: flex;
    gap: 6px;
    margin-left: 7px;
    align-items: center;
  }

  .entity-options-search-play,
  .entity-options-search-queue {
    min-width: 34px;
    font-size: 1.13em;
    border: none;
    background: transparent;
    color: var(--yamp-overlay-text);
    border-radius: 10px;
    padding: 6px 10px;
    cursor: pointer;
    box-shadow: none;
    transition:
      background var(--transition-normal),
      color var(--transition-normal);
    text-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .entity-options-search-play ha-icon,
  .entity-options-search-queue ha-icon {
    width: 16px;
    height: 16px;
  }

  @media (hover: hover) {
    .entity-options-search-play:hover,
    .entity-options-search-play:focus {
      background: transparent;
      color: var(--custom-accent) !important;
      opacity: 0.8;
    }
  }

  .entity-options-search-queue {
    color: var(--yamp-overlay-text-secondary);
    padding-right: 20px; /* Add right padding to prevent cutoff on mobile */
  }

  @media (hover: hover) {
    .entity-options-search-queue:hover,
    .entity-options-search-queue:focus {
      background: transparent;
      border: none;
      color: var(--custom-accent);
      opacity: 0.8;
    }
  }

  /* Queue control buttons */
  .queue-controls {
    display: flex;
    gap: 4px;
    padding-right: 8px; /* Add padding to prevent cutoff on mobile */
  }

  .queue-btn {
    min-width: 28px;
    height: 28px;
    font-size: 0.9em;
    border: none;
    background: transparent;
    color: var(--yamp-overlay-text);
    border-radius: 6px;
    padding: 4px;
    cursor: pointer;
    box-shadow: none;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .queue-btn ha-icon {
    width: 14px;
    height: 14px;
  }

  @media (hover: hover) {
    .queue-btn-up:hover,
    .queue-btn-up:focus {
      background: transparent;
      color: var(--yamp-success-color);
    }
  }

  @media (hover: hover) {
    .queue-btn-down:hover,
    .queue-btn-down:focus {
      background: transparent;
      color: var(--yamp-success-color);
    }
  }

  @media (hover: hover) {
    .queue-btn-next:hover,
    .queue-btn-next:focus {
      background: transparent;
      color: var(--custom-accent);
    }
  }

  @media (hover: hover) {
    .queue-btn-remove:hover,
    .queue-btn-remove:focus {
      background: transparent;
      color: var(--yamp-error-color);
    }
  }

  /* Visual feedback for moved queue items */
  .yamp-search-result.just-moved {
    background: var(--yamp-success-bg-light);
    border-left: 3px solid var(--yamp-success-color);
    animation: queueMoveHighlight 1s ease-out;
  }

  @keyframes queueMoveHighlight {
    0% {
      background: var(--yamp-success-bg-medium);
      transform: scale(1.02);
    }
    100% {
      background: var(--yamp-success-bg-light);
      transform: scale(1);
    }
  }

  .entity-options-search-input {
    border: 1px solid var(--search-border);
    border-radius: var(--button-border-radius);
    background: var(--search-input-bg);
    color: var(--search-input-text);
    font-size: 1.12em;
    outline: none;
    transition: border var(--transition-fast);
    margin-right: 7px;
    box-sizing: border-box;
  }

  .entity-options-search-row .entity-options-search-input {
    padding: 4px 34px 4px 10px; /* Increased right padding for clear button */
    height: 32px;
    min-height: 32px;
    line-height: 1.18;
    box-sizing: border-box;
    border: 1.5px solid var(--custom-accent);
    background: var(--search-input-bg);
    color: var(--search-input-text);
    transition:
      border var(--transition-fast),
      background var(--transition-fast);
    outline: none;
    width: 100%;
  }

  .search-input-wrapper {
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  .search-input-clear {
    position: absolute;
    right: 18px; /* Adjusted to 18px for better balance */
    top: 50%;
    transform: translateY(-68%); /* Adjusted to -68% to fix "too high" issue */
    background: none;
    border: none;
    color: var(--yamp-overlay-text-secondary);
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--transition-fast);
    z-index: 2;
  }

  @media (hover: hover) {
    .search-input-clear:hover {
      color: var(--custom-accent);
    }
  }

  .search-input-clear ha-icon {
    width: 16px; /* Slightly smaller icon (was 18px) */
    height: 16px;
  }

  .entity-options-search-input:focus {
    border: 1.5px solid var(--custom-accent);
    background: var(--search-input-bg);
    color: var(--search-input-text);
    outline: none;
  }

  .entity-options-search-loading,
  .entity-options-search-error,
  .entity-options-search-empty {
    padding: 8px 6px;
    font-size: 1.09em;
    opacity: 0.9;
    color: var(--primary-text);
    background: none;
    text-align: left;
  }

  .entity-options-search-loading {
    color: var(--yamp-overlay-text);
  }

  .entity-options-search-error {
    color: var(--yamp-error-color);
    font-weight: 500;
  }

  .entity-options-search-empty {
    color: var(--yamp-overlay-text-secondary);
    font-style: italic;
  }

  .entity-options-search-row .entity-options-item {
    height: 32px;
    min-height: 32px;
    box-sizing: border-box;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.12em;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Search filter chips */
  .search-filter-chips .chip {
    width: 72px;
    justify-content: center;
  }

  .search-filter-chips .chip[selected] {
    background: var(--yamp-chip-selected-bg) !important;
    color: var(--yamp-chip-selected-text) !important;
    font-weight: bold;
    opacity: 1;
  }

  .entity-options-sheet .search-filter-chips .chip {
    justify-content: center;
  }

  @media (hover: hover) {
    .entity-options-sheet .search-filter-chips .chip:hover {
      background: var(--custom-accent) !important;
      color: var(--yamp-chip-selected-text) !important;
      opacity: 1;
    }
  }

  .entity-options-sheet .entity-options-search-results {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    margin: 12px 0;
    padding-bottom: 0px;
    /* Hide scrollbars */
    ${Me}
  }

  /* Search layout */
  .search-results-count {
    margin-left: auto;
    padding-left: 0px;
    padding-right: 15px;
    font-size: 0.85em;
    font-style: italic;
    color: var(--yamp-overlay-text-secondary);
    white-space: nowrap;
    text-align: right;
    flex-shrink: 0;
  }

  .entity-options-sheet .entity-options-search {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .entity-options-sheet .entity-options-search-row,
  .entity-options-sheet .search-filter-chips,
  .entity-options-sheet .search-sub-filters {
    flex: 0 0 auto;
  }

  .search-sub-filters .button {
    background: none;
    transition: all 0.2s ease;
    color: var(--yamp-overlay-text);
  }

  .search-sub-filters .button ha-icon {
    color: var(--yamp-icon-color);
    transition: color 0.2s ease;
  }

  @media (hover: hover) {
    .search-sub-filters .button:hover {
      color: var(--custom-accent) !important;
      opacity: 1 !important;
    }
  }

  .search-sub-filters .button.active {
    color: var(--custom-accent) !important;
    opacity: 1 !important;
  }

  .search-sub-filters .button.active ha-icon {
    color: var(--custom-accent) !important;
  }

  @media (hover: hover) {
    .search-sub-filters .radio-mode-button:hover {
      color: var(--custom-accent);
    }
  }

  .entity-options-sheet[data-pin-search-headers="true"] {
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
  }

  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-search {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    padding-bottom: 0px;
  }

  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-scroll {
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Unified Header and Scroll Containers for Menu Sheets */
  .entity-options-header {
    flex: 0 0 auto;
    position: relative;
    z-index: 10;
    padding-top: 12px;
  }

  /* When pinning is active, the header is sticky and seamless */
  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-header {
    position: sticky;
    top: 0;
    background: none;
  }

  /* The scrollable area for all menus */
  .entity-options-scroll {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    ${Me}
  }

  /* Reserved space for persistent media controls when pinning is active */
  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-scroll,
  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-search,
  .entity-options-sheet[data-pin-search-headers="true"] .group-list-scroll {
    margin-bottom: 80px;
    padding-bottom: 0px;
    background: none;
  }

  /* Adjust spacing when persistent controls are hidden */
  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet[data-pin-search-headers="true"],
  :host([data-hide-menu-player="true"]) .entity-options-sheet[data-pin-search-headers="true"] {
    padding-bottom: 12px;
  }

  /* Clean up legacy margin override rules since we now use padding on parent */
  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .entity-options-scroll,
  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .entity-options-search,
  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .group-list-scroll,
  :host([data-hide-menu-player="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .entity-options-scroll,
  :host([data-hide-menu-player="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .entity-options-search,
  :host([data-hide-menu-player="true"])
    .entity-options-sheet[data-pin-search-headers="true"]
    .group-list-scroll {
    margin-bottom: 0px;
  }
  /* Hide scrollbars for Webkit browsers (Chrome, Safari, etc.) */

  .entity-options-resolved-entities {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .entity-options-resolved-entities-list {
    flex: 1;
    overflow-y: auto;
    margin: 12px 0;
    /* Hide scrollbars */
    ${Me}
  }

  .entity-options-resolved-entities .entity-options-search-input {
    flex: 1;
    background: var(--search-input-bg);
    color: var(--search-input-text);
    border: 1px solid var(--search-border);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 1em;
    outline: none;
  }
  .entity-options-resolved-entities .entity-options-item {
    background: none;
    color: var(--yamp-overlay-text);
    border: none;
    border-radius: 10px;
    font-size: 1.12em;
    font-weight: 400;
    margin: 4px 0;
    padding: 6px 0 8px 0;
    cursor: pointer;
    transition: color var(--transition-fast);
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  @media (hover: hover) {
    .entity-options-resolved-entities .entity-options-item:hover,
    .entity-options-resolved-entities .entity-options-item:focus {
      color: var(--custom-accent);
      background: none;
    }
  }

  .entity-options-resolved-entities .entity-options-item:last-child {
    border-bottom: none;
  }

  /* Clickable artist */
  .clickable-artist {
    cursor: pointer;
  }

  @media (hover: hover) {
    .clickable-artist:hover {
      text-decoration: underline;
    }
  }

  /* Clickable search results */
  .clickable-search-result {
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  @media (hover: hover) {
    .clickable-search-result:hover {
      text-decoration: underline;
      color: var(--yamp-overlay-text);
    }
  }

  /* Search breadcrumb */
  .entity-options-search-breadcrumb {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--search-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .entity-options-search-breadcrumb-text {
    font-size: 0.9em;
    color: var(--yamp-overlay-text);
    font-style: italic;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .entity-options-search-breadcrumb-play {
    background: none;
    border: none;
    color: var(--custom-accent);
    padding: 0;
    width: 32px;
    height: 32px;
    margin-left: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition:
      background-color 0.2s,
      color 0.2s;
    flex-shrink: 0;
  }

  @media (hover: hover) {
    .entity-options-search-breadcrumb-play:hover {
      background-color: var(--custom-accent);
      color: var(--yamp-overlay-text);
    }
  }

  .entity-options-search-breadcrumb-play ha-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Search sheet styles */
  .search-sheet {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--search-overlay-bg);
    z-index: ${ce.MODAL_BACKDROP};
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .search-sheet-header {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .search-sheet-header input {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: var(--search-input-bg);
    color: var(--search-input-text);
    font-size: 16px;
  }

  .search-sheet-header button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: var(--custom-accent);
    color: var(--yamp-overlay-text);
    cursor: pointer;
    font-size: 16px;
  }

  .search-sheet-header button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .search-sheet-loading,
  .search-sheet-error,
  .search-sheet-success,
  .search-sheet-empty {
    text-align: center;
    padding: 40px;
    color: var(--yamp-chip-text);
    font-size: 18px;
  }

  .search-sheet-error {
    color: var(--search-error);
  }

  .priority-toast-success {
    color: var(--search-success-text);
    font-weight: 600;
    background: var(--search-success-bg);
    border: 2px solid var(--search-success);
    border-radius: 8px;
    padding: 20px;
    margin: 20px;
    font-size: 20px;
    animation: fadeInOut 3s ease-in-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${ce.MODAL_TOAST};
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    min-width: 200px;
    text-align: center;
    pointer-events: none;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    10% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    90% {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
  }

  .search-sheet-results {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    /* Hide scrollbars */
    ${Me}
  }

  .entity-options-sheet:not([data-pin-search-headers="true"]) .search-sheet-results,
  .entity-options-sheet:not([data-pin-search-headers="true"]) .entity-options-search-results {
    overflow-y: visible;
  }

  .yamp-search-result.search-result-card {
    flex-direction: column;
    padding: 8px;
    border-bottom: none;
    border-radius: 12px;
    background: var(--search-card-bg);
    box-shadow: var(
      --chip-box-shadow,
      var(--ha-assistant-chip-box-shadow, var(--ha-card-box-shadow, none))
    );
    align-items: center;
    gap: 8px;
    height: min-content;
    position: relative;
    overflow: hidden;
  }

  .search-result-card.minimal {
    background: none !important;
    padding: 0;
  }

  .card-menu-button {
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    z-index: 2;
  }

  @media (hover: hover) {
    .card-menu-button:hover {
      opacity: 1;
    }
  }

  .search-result-card .search-row-slide-out {
    flex-direction: column;
    height: 100%;
    width: 100%;
    top: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: flex-start;
    overflow-y: auto;
    background: var(--search-overlay-bg);
    padding: 12px 8px;
    border-radius: 12px;
    transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 5;
    box-sizing: border-box;
  }

  .search-result-card .search-row-slide-out.active {
    top: 0;
  }

  .search-result-card .slide-out-button {
    font-size: 0.85em;
    padding: 8px 12px;
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    text-align: center;
    margin: 2px 0;
    white-space: normal;
    word-break: break-word;
    flex-shrink: 0;
  }

  .search-result-card .slide-out-close {
    margin: 8px 0 4px 0;
    flex-shrink: 0;
  }

  @media (hover: hover) {
    .search-sheet-results .yamp-search-result:not(.search-result-card):hover {
      background: var(--search-hover-bg);
    }
  }

  .yamp-search-result-thumb-placeholder {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    object-fit: var(--yamp-artwork-fit, cover);
    margin-right: 12px;
  }

  .search-result-card .yamp-search-result-thumb,
  .search-result-card .yamp-search-result-thumb-placeholder {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    margin-right: 0;
  }

  .yamp-search-result-thumb-placeholder {
    background: var(--search-thumb-placeholder-bg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-sheet-thumb-container {
    position: relative;
    width: auto;
    flex-shrink: 0;
    padding-left: 5px;
  }

  .search-result-card .search-sheet-thumb-container {
    width: 100%;
  }

  .search-sheet-thumb-container[data-clickable="true"] {
    cursor: pointer;
  }

  .card-overlay-buttons {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--search-overlay-bg);
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 8px;
  }

  .icon-only.search-sheet-play,
  .icon-only.search-sheet-queue,
  .icon-only.entity-options-search-play,
  .icon-only.entity-options-search-queue {
    background: var(--custom-accent);
    width: 32px;
    height: 32px;
    padding: 0;
    border-radius: 50%;
  }

  .entity-options-search-thumb,
  .entity-options-search-thumb-placeholder {
    object-fit: var(--yamp-artwork-fit, cover);
    border-radius: 5px;
  }

  .yamp-search-result-thumb-placeholder ha-icon {
    color: var(--search-thumb-placeholder-icon);
    font-size: 16px;
  }

  .yamp-search-result-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .search-result-card .yamp-search-result-info {
    text-align: center;
    width: 100%;
    display: block; /* Original card behavior */
  }

  .yamp-search-result-title {
    flex: 1;
    color: var(--primary-text);
    font-size: 0.9em;
    font-weight: 500;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .yamp-search-result-subtitle {
    display: block;
    color: var(--search-text-secondary);
    font-size: 0.9em;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .yamp-search-result:not(.search-result-card) .yamp-search-result-subtitle {
    font-size: 0.86em;
    line-height: 1.16;
  }

  .search-result-card .yamp-search-result-info {
    text-align: center;
    width: 100%;
  }

  .search-result-card .yamp-search-result-title {
    text-align: center;
    width: 100%;
    /* 2-line clamping with word-level breaks */
    ${Bs}
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 14px;
    line-height: 1.3;
    min-height: 2.6em; /* Reserve space for 2 lines to keep all cards uniform */
  }

  .search-result-card .yamp-search-result-subtitle {
    text-align: center;
    width: 100%;
    /* 2-line clamping with word-level breaks */
    ${Bs}
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 0.85em;
    line-height: 1.3;
    min-height: 2.6em; /* Reserve space for 2 lines to keep all cards uniform */
  }

  .yamp-search-result.clickable {
    cursor: pointer;
  }

  .yamp-search-result-title.clickable-search-result,
  .yamp-search-result-subtitle.clickable-search-result {
    text-decoration: none;
  }

  @media (hover: hover) {
    .yamp-search-result-title.clickable-search-result:hover,
    .yamp-search-result-subtitle.clickable-search-result:hover {
      text-decoration: underline;
    }
  }

  .search-sheet-buttons {
    display: flex;
    gap: 8px;
  }

  .search-sheet-play,
  .search-sheet-queue {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: var(--custom-accent);
    color: var(--yamp-overlay-text);
    cursor: pointer;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .search-sheet-play ha-icon,
  .search-sheet-queue ha-icon {
    width: 20px;
    height: 20px;
  }

  @media (hover: hover) {
    .search-sheet-play:hover,
    .search-sheet-queue:hover {
      background: var(--search-play-hover);
    }
  }

  .search-sheet-queue {
    background: var(--search-queue-bg);
    border: 1px solid var(--search-queue-border);
  }

  @media (hover: hover) {
    .search-sheet-queue:hover {
      background: var(--search-queue-hover);
      border-color: var(--search-queue-hover-border);
    }
  }

  /* Override styles when match_theme is false - force default colors */
  .search-sheet[data-match-theme="false"] {
    background: var(--yamp-overlay-bg);

    /* Define CSS custom properties directly on the search sheet when match_theme is false */
    --search-overlay-bg: var(--yamp-overlay-bg);
    --search-input-bg: #333;
    --search-input-text: #fff;
    --search-text: #fff;
    --search-text-secondary: #bbb;
    --search-error: #ff6b6b;
    --search-error-bg: rgba(244, 67, 54, 0.8);
    --search-success: #4caf50;
    --search-success-text: #fff;
    --search-success-bg: rgba(76, 175, 80, 0.95);
    --search-border: rgba(255, 255, 255, 0.1);
    --search-hover-bg: rgba(255, 255, 255, 0.1);
    --search-play-hover: #e68900;
    --search-queue-bg: #4a4a4a;
    --search-queue-border: #666;
    --search-queue-hover: #5a5a5a;
    --search-queue-hover-border: #777;
    --search-card-bg: rgba(255, 255, 255, 0.05);
    --search-thumb-placeholder-bg: rgba(255, 255, 255, 0.1);
    --search-thumb-placeholder-icon: rgba(255, 255, 255, 0.6);
  }

  .search-sheet[data-match-theme="false"] .search-sheet-header input {
    background: #333;
    color: #fff;
  }

  .search-sheet[data-match-theme="false"] .search-sheet-header button {
    background: #ff9800;
    color: #fff;
  }

  .search-sheet[data-match-theme="false"] .search-sheet-loading,
  .search-sheet[data-match-theme="false"] .search-sheet-error,
  .search-sheet[data-match-theme="false"] .search-sheet-success,
  .search-sheet[data-match-theme="false"] .search-sheet-empty {
    color: #fff;
  }

  .search-sheet[data-match-theme="false"] .search-sheet-error {
    color: #ff6b6b;
  }

  .search-sheet[data-match-theme="false"] .search-sheet-success {
    color: #4caf50;
    background: rgba(76, 175, 80, 0.95);
    border: 2px solid #4caf50;
  }

  .search-sheet[data-match-theme="false"] .yamp-search-result {
    color: #fff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media (hover: hover) {
    .search-sheet[data-match-theme="false"] .yamp-search-result:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .search-sheet[data-match-theme="false"] .search-sheet-play {
    background: var(--custom-accent);
    color: #fff;
  }

  .search-sheet-buttons .search-sheet-queue {
    color: var(--yamp-overlay-text);
  }

  .search-sheet[data-match-theme="false"] *[style*="background"] {
    background: rgba(0, 0, 0, 0.8);
  }

  /* Force override any CSS custom properties that might be inherited */
  .search-sheet[data-match-theme="false"] {
    --custom-accent: #ff9800;
    --accent-color: #ff9800;
    --primary-color: #ff9800;
    --ha-accent-color: #ff9800;
  }

  /* Also redefine --custom-accent locally in the search sheet, just like entity-options-resolved-entities does */
  .search-sheet[data-match-theme="false"] {
    --custom-accent: #ff9800;
  }

  /* Also override at the root level when match_theme is false */
  yet-another-media-player[data-match-theme="false"] {
    --custom-accent: #ff9800;
    --accent-color: #ff9800;
    --primary-color: #ff9800;
    --ha-accent-color: #ff9800;
  }

  /* Override any elements that might be using CSS custom properties */
  .search-sheet[data-match-theme="false"] .search-sheet-play,
  .search-sheet[data-match-theme="false"] .search-sheet-header button,
  .search-sheet[data-match-theme="false"] *[style*="background: var(--custom-accent)"],
  .search-sheet[data-match-theme="false"] *[style*="background: var(--accent-color)"],
  .search-sheet[data-match-theme="false"] *[style*="background: var(--primary-color)"] {
    background: #ff9800;
    color: #fff;
  }

  /* Override any elements that might be using CSS custom properties for color */
  .search-sheet[data-match-theme="false"] *[style*="color: var(--custom-accent)"],
  .search-sheet[data-match-theme="false"] *[style*="color: var(--accent-color)"],
  .search-sheet[data-match-theme="false"] *[style*="color: var(--primary-color)"] {
    color: #ff9800;
  }

  /* ============================================
     Card Trigger Gesture Feedback Animations
     ============================================ */

  /* Base container for gesture feedback - positioned relative to tap area */
  .gesture-feedback-container {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: ${ce.FLOATING_ELEMENT};
  }

  /* Base styles for ripple effect */
  .gesture-ripple {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }

  /* Tap: Quick expanding ripple */
  @keyframes gestureTapRipple {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.6;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }

  .gesture-ripple.tap {
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
    animation: gestureTapRipple 0.4s ease-out forwards;
  }

  /* Double-tap: Two rapid pulses */
  @keyframes gestureDoubleTapRipple {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.5;
    }
    25% {
      transform: translate(-50%, -50%) scale(0.6);
      opacity: 0.3;
    }
    50% {
      transform: translate(-50%, -50%) scale(0.3);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0;
    }
  }

  .gesture-ripple.double_tap {
    width: 140px;
    height: 140px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%);
    animation: gestureDoubleTapRipple 0.5s ease-out forwards;
  }

  /* Hold: Slower glowing pulse */
  @keyframes gestureHoldPulse {
    0% {
      transform: translate(-50%, -50%) scale(0.2);
      opacity: 0;
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    30% {
      opacity: 0.5;
      box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0;
      box-shadow: 0 0 40px 20px rgba(255, 255, 255, 0);
    }
  }

  .gesture-ripple.hold {
    width: 100px;
    height: 100px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.2) 40%,
      rgba(255, 255, 255, 0) 70%
    );
    animation: gestureHoldPulse 0.6s ease-out forwards;
  }

  /* Swipe Left: Arrow sweeping left */
  @keyframes gestureSwipeLeft {
    0% {
      transform: translate(0%, -50%) scaleX(0);
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translate(-100%, -50%) scaleX(1);
      opacity: 0;
    }
  }

  .gesture-ripple.swipe_left {
    width: 120px;
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.8) 100%
    );
    animation: gestureSwipeLeft 0.35s ease-out forwards;
    transform-origin: right center;
  }

  /* Swipe Right: Arrow sweeping right */
  @keyframes gestureSwipeRight {
    0% {
      transform: translate(0%, -50%) scaleX(0);
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: translate(100%, -50%) scaleX(1);
      opacity: 0;
    }
  }

  .gesture-ripple.swipe_right {
    width: 120px;
    height: 60px;
    border-radius: 30px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0.8) 100%
    );
    animation: gestureSwipeRight 0.35s ease-out forwards;
    transform-origin: left center;
  }
  /* Consolidated scrollbar hiding for Webkit browsers */
  .chip-row::-webkit-scrollbar,
  .action-chip-row::-webkit-scrollbar,
  .entity-options-container::-webkit-scrollbar,
  .entity-options-chips-strip::-webkit-scrollbar,
  .entity-options-sheet::-webkit-scrollbar,
  .group-list-scroll::-webkit-scrollbar,
  .source-list-scroll::-webkit-scrollbar,
  .floating-source-index::-webkit-scrollbar,
  .search-row-slide-out::-webkit-scrollbar,
  .entity-options-scroll::-webkit-scrollbar,
  .entity-options-sheet .entity-options-search-results::-webkit-scrollbar,
  .entity-options-resolved-entities-list::-webkit-scrollbar,
  .search-sheet-results::-webkit-scrollbar,
  .lyrics-scroll-container::-webkit-scrollbar {
    display: none;
  }

  /* Volume Overlay styles */
  .volume-overlay {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: var(--volume-overlay-bg, rgba(0, 0, 0, 0.45));
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 12px;
    color: var(--volume-overlay-color, #ffffff);
    animation: volume-overlay-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    pointer-events: auto;
    box-sizing: border-box;
    padding: 16px;
    text-align: center;
    position: absolute;
    inset: 0;
    z-index: ${ce.VOLUME_OVERLAY};
  }

  .volume-overlay ha-icon {
    --mdc-icon-size: clamp(48px, 12cqw, 96px);
    margin-bottom: clamp(8px, 2cqw, 16px);
    color: var(--custom-accent, var(--accent-color, #ff9800));
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    animation: volume-icon-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .volume-overlay-text {
    font-size: clamp(3.2rem, 15cqw, 7.5rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
    font-family: var(--yamp-font-family, Roboto, -apple-system, sans-serif);
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  @keyframes volume-overlay-in {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes volume-icon-pop {
    0% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }

  /* Volume Overlay in Collapsed Mode */
  .collapsed .volume-overlay {
    flex-direction: row;
    gap: 12px;
    padding: 8px 16px;
    background: var(--volume-overlay-collapsed-bg, rgba(0, 0, 0, 0.65));
  }

  .collapsed .volume-overlay ha-icon {
    --mdc-icon-size: clamp(28px, 6cqw, 36px);
    margin-bottom: 0;
  }

  .collapsed .volume-overlay-text {
    font-size: clamp(1.6rem, 8cqw, 2.5rem);
  }
`,zo=Ue`
  :host {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -1px;
    z-index: ${ce.LYRICS_OVERLAY};
    overflow: hidden;
    pointer-events: auto;
    backdrop-filter: ${Fi};
    -webkit-backdrop-filter: ${Fi};
    color: var(--yamp-lyrics-color, var(--yamp-overlay-text, #fff));
  }

  :host([data-artwork-fit="scaled-contain-alternate"]) {
    background: var(--yamp-lyrics-bg, var(--yamp-overlay-bg, rgba(0, 0, 0, 0.82)));
  }

  :host(:not([data-artwork-fit="scaled-contain-alternate"])) {
    background: var(--yamp-lyrics-bg, rgba(0, 0, 0, 0.3));
    color: #fff;
    mask-image: var(--yamp-lyrics-mask, ${Vs});
    -webkit-mask-image: var(--yamp-lyrics-mask, ${Vs});
  }

  .lyrics-scroll-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 12px;
    padding-right: 12px;
    scroll-behavior: smooth;
    ${Me}
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .scroll-spacer {
    flex: 0 0 50%;
    width: 100%;
    min-height: 50%;
    pointer-events: none;
  }

  .lyric-line {
    font-size: var(--yamp-lyrics-font-size, 1.6rem);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 24px;
    opacity: 0.3;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: default;
    pointer-events: none;
    color: inherit;
    width: 100%;
    max-width: 95%;
    filter: blur(1px);
    text-align: center;
  }

  .lyric-line.active {
    opacity: 1;
    filter: blur(0);
    color: var(--yamp-lyrics-active-color, inherit);
    font-size: var(--yamp-lyrics-active-font-size, var(--yamp-lyrics-font-size, 1.6rem));
    text-shadow: var(--yamp-overlay-text-shadow, none);
  }

  .lyric-line.scroll-mode {
    opacity: 1;
    filter: none;
    transform: none;
    margin-bottom: 18px;
  }

  .lyric-line.unsynced {
    font-size: var(--yamp-lyrics-unsynced-font-size, 1.1rem);
    opacity: 0.8;
    margin-bottom: 12px;
    filter: none;
  }

  .lyrics-loading,
  .lyrics-error,
  .lyrics-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 24px;
    color: var(
      --yamp-lyrics-status-color,
      var(--yamp-overlay-text-secondary, rgba(255, 255, 255, 0.8))
    );
    background: transparent;
    border-radius: inherit;
  }

  .lyrics-loading ha-circular-progress {
    margin-bottom: 12px;
    --md-sys-color-primary: var(--yamp-overlay-text, white);
  }

  .lyrics-error ha-icon,
  .lyrics-empty ha-icon {
    --mdc-icon-size: 40px;
    margin-bottom: 12px;
    opacity: 0.6;
  }

  /* Compact mode overrides for constrained heights */
  .yamp-card-inner.compact-collapsed .chip-row {
    padding-top: 0;
    padding-bottom: 4px;
  }
  .yamp-card-inner.compact-collapsed .action-chip-row {
    padding-bottom: 0;
    margin-bottom: -12px;
  }
  .yamp-card-inner.compact-collapsed .details {
    padding-left: 12px;
    padding-right: 12px;
    padding-bottom: 2px;
    margin-top: -12px;
    min-height: 0;
    gap: 1px;
  }
  .yamp-card-inner.compact-collapsed .controls-row {
    padding-top: 1px;
    padding-bottom: 1px;
    gap: 4px;
  }
  .yamp-card-inner.compact-collapsed .volume-row {
    padding-bottom: 4px;
  }
  .yamp-card-inner.compact-collapsed .collapsed-artwork-container {
    top: -12px;
  }

  .yamp-card-inner.compact-collapsed .modern-button.primary {
    width: 52px;
    height: 52px;
  }
  .yamp-card-inner.compact-collapsed .modern-button.medium {
    width: 38px;
    height: 38px;
  }
  .yamp-card-inner.compact-collapsed .modern-button.small {
    width: 34px;
    height: 34px;
  }
`;function Ws(r){if(!r||typeof r!="string")return[];const e=r.split(/\r?\n/),t=[],i=/\[(\d+):([0-5]\d)(?:[.:](\d{2,3}))?\]/g;return e.forEach(a=>{if(a=a.trim(),!a||a.match(/\[[a-zA-Z]+:[^\]]+\]/)&&!a.match(i))return;let s,n=a.replace(i,"").trim();const l=[];for(i.lastIndex=0;(s=i.exec(a))!==null;){const c=parseInt(s[1],10),d=parseInt(s[2],10),h=s[3]?parseInt(s[3],10):0,u=s[3]?s[3].length===3?1e3:100:1e3,m=c*60+d+h/u;l.push(m)}l.length>0?l.forEach(c=>{t.push({time:c,text:n})}):t.push({time:null,text:n})}),t.sort((a,s)=>a.time===null&&s.time===null?0:a.time===null?1:s.time===null?-1:a.time-s.time),t}class jo extends dt{static get properties(){return{hass:{type:Object},lyrics:{type:Array},position:{type:Number},loading:{type:Boolean},error:{type:Boolean},activeThemeColor:{type:String},mode:{type:String},preRoll:{type:Number},_activeIndex:{state:!0}}}static get styles(){return zo}constructor(){super(),this.lyrics=[],this.position=0,this.loading=!1,this.error=!1,this.activeThemeColor="#ffffff",this.mode="default",this.preRoll=0,this._activeIndex=-1,this._isScrolling=!1,this._scrollTimeout=null}disconnectedCallback(){super.disconnectedCallback(),this._scrollTimeout&&(clearTimeout(this._scrollTimeout),this._scrollTimeout=null)}firstUpdated(){this._activeIndex!==-1&&this._scrollToActive("auto")}updated(e){super.updated(e),e.has("lyrics")&&(this._activeIndex=-1,requestAnimationFrame(()=>this._scrollToActive("auto"))),(e.has("position")||e.has("lyrics"))&&this._updateActiveLyric()}_updateActiveLyric(){if(!this.lyrics||this.lyrics.length===0||this.mode==="text"||!this.lyrics.some(i=>i.time!==null))return;let e=-1;const t=this.position+this.preRoll;for(let i=0;i<this.lyrics.length;i++)if(this.lyrics[i].time!==null&&this.lyrics[i].time<=t)e=i;else if(this.lyrics[i].time!==null&&this.lyrics[i].time>t)break;e!==this._activeIndex&&(this._activeIndex=e,e!==-1&&this.updateComplete.then(()=>this._scrollToActive()))}_scrollToActive(e="smooth"){if(this._isScrolling&&e==="smooth")return;const t=this.renderRoot.querySelector(".lyrics-scroll-container"),i=t?.querySelector(".lyric-line.active");if(t&&i){const a=t.clientHeight/2,s=i.offsetTop,n=i.clientHeight,l=s+n/2-a;t.scrollTo({top:l,behavior:e})}}_handleScroll(){this._isScrolling=!0,this._scrollTimeout&&clearTimeout(this._scrollTimeout),this._scrollTimeout=setTimeout(()=>{this._isScrolling=!1,this._scrollToActive()},3e3)}render(){if(this.error)return y`
        <div class="lyrics-error">
          <ha-icon icon="mdi:text-box-remove-outline"></ha-icon>
          <div>${p("lyrics.not_available")}</div>
        </div>
      `;if(this.loading)return y`
        <div class="lyrics-loading">
          <ha-circular-progress active></ha-circular-progress>
          <div>${p("lyrics.finding")}</div>
        </div>
      `;if(!this.lyrics||this.lyrics.length===0)return y`
        <div class="lyrics-empty">
          <ha-icon icon="mdi:text-box-search-outline"></ha-icon>
          <div>${p("lyrics.none_found")}</div>
        </div>
      `;const e=!this.lyrics.some(t=>t.time!==null);return y`
      <div
        class="lyrics-scroll-container"
        @scroll=${this._handleScroll}
        style="--yamp-primary-color: ${this.activeThemeColor}"
      >
        <div class="scroll-spacer"></div>
        ${this.lyrics.map((t,i)=>{const a=i===this._activeIndex,s=this.mode==="text",n=this.mode==="scroll";return y` <div class="${xs({"lyric-line":!0,active:a&&!e,unsynced:e||s,"scroll-mode":n&&!e})}">${t.text}</div> `})}
        <div class="scroll-spacer"></div>
      </div>
    `}}customElements.define("yamp-lyrics-view",jo);const Do=[{mode:"replace",icon:"mdi:playlist-remove",label:p("search.replace")},{mode:"next",icon:"mdi:playlist-play",label:p("search.play_next")},{mode:"replace_next",icon:"mdi:playlist-music",label:p("search.replace_play")},{mode:"add",icon:"mdi:playlist-plus",label:p("search.add_queue")},{mode:"add_to_playlist",icon:"mdi:plus",label:p("search.add_to_playlist")}],ni=["artist","album","track","playlist","radio","podcast","audiobook"];function Sa(r){return r&&(r.media_class==="track"||r.media_content_type==="track")}function Ys(r){return r&&(r.media_class==="radio"||r.media_content_type==="radio")}function Zs(r){return r==="card"||r==="card_minimal"}function Fo(r,{searchMediaClassFilter:e="all",recentlyPlayedFilterActive:t=!1,upcomingFilterActive:i=!1,recommendationsFilterActive:a=!1}={}){const s=Sa(r),n=e==="track"||e==="album";return s&&r.artist&&r.album?`${r.artist} - ${r.album}`:(n||t||i||a)&&r.artist?r.artist:r.media_class?r.media_class.charAt(0).toUpperCase()+r.media_class.slice(1):""}const ut=(r,{cap:e,floor:t}={})=>{const i=Number(r);if(!Number.isFinite(i)||i<=0)return;let a=i;return typeof t=="number"&&(a=Math.max(t,a)),typeof e=="number"&&(a=Math.min(e,a)),a},Ks=3e4;let oi=null,Aa=0;async function Ri(r){const e=Date.now();if(oi&&e-Aa<Ks)return oi;try{return oi=(await r.callApi("GET","config/config_entries/entry")).find(t=>t.domain==="music_assistant"&&t.state==="loaded")?.entry_id||null,Aa=e,oi}catch(t){return console.error("yamp: Failed to resolve Music Assistant config entry",t),oi=null,Aa=e,null}}let li=null,$a=0;async function Li(r){const e=Date.now();if(li&&e-$a<Ks)return li;try{return li=(await r.callApi("GET","config/config_entries/entry")).find(t=>t.domain==="mass_queue"&&t.state==="loaded")?.entry_id||null,$a=e,li}catch(t){return console.error("yamp: Failed to resolve mass_queue config entry",t),li=null,$a=e,null}}function Rt(r){return r?{title:r.name,media_content_id:r.uri,media_content_type:r.media_type,media_class:r.media_type,item_id:r.item_id,thumbnail:r.image,...r.artists&&{artist:r.artists.map(e=>e.name).join(", ")},...r.album&&{album:r.album.name,album_uri:r.album.uri},is_browsable:r.media_type==="artist"||r.media_type==="album"||r.media_type==="playlist"||r.media_type==="track",is_editable:r.is_editable===!0}:null}function Xs({item:r,onPlay:e,onOptionsToggle:t,upcomingFilterActive:i=!1,isMusicAssistant:a=!1,massQueueAvailable:s=!1,searchView:n="list",isInline:l=!1,onMoveUp:c,onMoveDown:d,onMoveNext:h,onRemove:u,minimal:m=!1,hideActions:f=!1}){if(f)return k;const g=!!(i&&r.queue_item_id&&a&&s),v=Zs(n),w=l?"entity-options-search-buttons":v?"card-overlay-buttons":"search-sheet-buttons",A=l?"entity-options-search-play":v?"search-sheet-play icon-only":"search-sheet-play",O=l?"entity-options-search-queue":v?"search-sheet-queue icon-only":"search-sheet-queue";return y`
    <div class="${w}">
      ${g&&l?y`
            <div class="queue-controls">
              <button
                class="queue-btn queue-btn-up"
                @click=${D=>{D.stopPropagation(),c(r)}}
                title="${p("search.move_up")}"
              >
                <ha-icon icon="mdi:chevron-up"></ha-icon>
              </button>
              <button
                class="queue-btn queue-btn-down"
                @click=${D=>{D.stopPropagation(),d(r)}}
                title="${p("search.move_down")}"
              >
                <ha-icon icon="mdi:chevron-down"></ha-icon>
              </button>
              <button
                class="queue-btn queue-btn-next"
                @click=${D=>{D.stopPropagation(),h(r)}}
                title="${p("search.move_next")}"
              >
                <ha-icon icon="mdi:playlist-play"></ha-icon>
              </button>
              <button
                class="queue-btn queue-btn-remove"
                @click=${D=>{D.stopPropagation(),u(r)}}
                title="${p("search.remove")}"
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            </div>
          `:k}
      <button
        class="${A}"
        @click=${D=>{D.stopPropagation(),e(r)}}
        title="${p("search.play_item","{item}",r.title)}"
      >
        <ha-icon icon="mdi:play"></ha-icon>
      </button>
      ${!g&&!Ys(r)&&!m?y`
            <button
              class="${O}"
              @click=${D=>{D.preventDefault(),D.stopPropagation(),t(r)}}
              title="${p("common.more_options")}"
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </button>
          `:k}
    </div>
  `}function Oo({item:r,activeSearchRowMenuId:e,onPlayOption:t,onOptionsToggle:i,searchView:a="list",isQueueItem:s=!1,massQueueAvailable:n=!1,onMoveUp:l,onMoveDown:c,onMoveNext:d,onRemove:h,hideActions:u=!1}){if(u)return k;const m=e!=null&&r.media_content_id!=null&&e===r.media_content_id,f=Zs(a);return y`
    <div class="search-row-slide-out ${m?"active":""}">
      ${s&&f?y`
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),l(r),i(null)}}
              title="${p("search.move_up")}"
            >
              ${p("search.move_up")}
            </button>
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),c(r),i(null)}}
              title="${p("search.move_down")}"
            >
              ${p("search.move_down")}
            </button>
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),d(r),i(null)}}
              title="${p("search.move_next")}"
            >
              ${p("search.move_next")}
            </button>
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),h(r),i(null)}}
              title="${p("search.remove")}"
            >
              ${p("search.remove")}
            </button>
          `:y`
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),t(r,"replace")}}
              title="${p("search.labels.replace")}"
            >
              ${f?k:y`<ha-icon icon="mdi:playlist-remove"></ha-icon>`}${p("search.labels.replace")}
            </button>
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),t(r,"next")}}
              title="${p("search.labels.next")}"
            >
              ${f?k:y`<ha-icon icon="mdi:playlist-play"></ha-icon>`}${p("search.labels.next")}
            </button>
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),t(r,"replace_next")}}
              title="${p("search.labels.replace_next")}"
            >
              ${f?k:y`<ha-icon icon="mdi:playlist-music"></ha-icon>`}${p("search.labels.replace_next")}
            </button>
            <button
              class="slide-out-button"
              @click=${g=>{g.stopPropagation(),t(r,"add")}}
              title="${p("search.labels.add")}"
            >
              ${f?k:y`<ha-icon icon="mdi:playlist-plus"></ha-icon>`}${p("search.labels.add")}
            </button>
            ${Sa(r)&&n?y`
                  <button
                    class="slide-out-button"
                    @click=${g=>{g.stopPropagation(),t(r,"add_to_playlist")}}
                    title="${p("search.labels.add_to_playlist")}"
                  >
                    ${f?k:y`<ha-icon icon="mdi:plus"></ha-icon>`}${p("search.labels.add_to_playlist")}
                  </button>
                `:k}
          `}
      <div
        class="slide-out-close"
        @click=${g=>{g.stopPropagation(),i(null)}}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </div>
    </div>
  `}function Ro({item:r,isCard:e,isMinimal:t,activeSearchRowMenuId:i,loadingSearchRowMenuId:a,errorSearchRowMenuId:s,successSearchRowMenuId:n,successSearchRowType:l,isSelectionFlow:c,massQueueAvailable:d,upcomingFilterActive:h,recentlyPlayedFilterActive:u=!1,recommendationsFilterActive:m=!1,searchMediaClassFilter:f="all",onPlay:g,onResultClick:v,onResultTouch:w,onOptionsToggle:A,onPlayOption:O,onMoveUp:D,onMoveDown:F,onMoveNext:G,onRemove:Q,isMusicAssistant:B=!1,isValidArtwork:te=X=>!!X,getClickTitle:Z=X=>""}){if(!r)return y`<div class="yamp-search-result placeholder"></div>`;const X=B,U=!!r.is_browsable||c,ie=e?t?"card_minimal":"card":"list",J=i!=null&&r.media_content_id!=null&&i===r.media_content_id,ae=c;return y`
    <div
      class="yamp-search-result ${e?"search-result-card":""} ${t?"minimal":""} ${r._justMoved?"just-moved":""} ${J?"menu-active":""} ${U?"clickable":""}"
      @click=${ne=>{c||!e&&U?v?.(r,ne):e&&g?.(r)}}
    >
      <div class="search-sheet-thumb-container" data-clickable="${e}">
        ${r.thumbnail&&te(r.thumbnail)?y`
              <img
                class="yamp-search-result-thumb"
                src=${r.thumbnail}
                alt=${r.title}
                onerror="this.style.display='none'"
              />
            `:y`
              <div class="yamp-search-result-thumb-placeholder">
                <ha-icon icon="mdi:music"></ha-icon>
              </div>
            `}
        ${e?Xs({item:r,onPlay:g,onOptionsToggle:A,upcomingFilterActive:!!h,isMusicAssistant:X,massQueueAvailable:d,searchView:ie,onMoveUp:D,onMoveDown:F,onMoveNext:G,onRemove:Q,minimal:t,hideActions:ae}):k}
      </div>

      ${t?k:y`
            <div class="yamp-search-result-info">
              <span
                class="yamp-search-result-title ${U?"clickable-search-result":""}"
                @touchstart=${ne=>w&&w(r,ne)}
                @click=${ne=>{(U||c)&&(ne.stopPropagation(),v&&v(r,ne))}}
                title=${Z(r)}
              >
                ${r.title}
              </span>
              <span
                class="yamp-search-result-subtitle ${U?"clickable-search-result":""}"
                @touchstart=${ne=>w&&w(r,ne)}
                @click=${ne=>{(U||c)&&(ne.stopPropagation(),v&&v(r,ne))}}
              >
                ${Fo(r,{searchMediaClassFilter:f,recentlyPlayedFilterActive:u,upcomingFilterActive:h,recommendationsFilterActive:m})}
              </span>
              ${e&&!Ys(r)&&!ae?y`
                    <div
                      class="card-menu-button"
                      @click=${ne=>{ne.preventDefault(),ne.stopPropagation(),A(r)}}
                    >
                      <ha-icon icon="mdi:dots-vertical"></ha-icon>
                    </div>
                  `:k}
            </div>
          `}
      ${e?k:Xs({item:r,onPlay:g,onOptionsToggle:A,upcomingFilterActive:!!h,isMusicAssistant:X,massQueueAvailable:d,searchView:ie,isInline:!0,onMoveUp:D,onMoveDown:F,onMoveNext:G,onRemove:Q,hideActions:ae})}
      ${Oo({item:r,activeSearchRowMenuId:i,onPlayOption:O,onOptionsToggle:A,searchView:ie,isQueueItem:X&&r.queue_item_id&&h&&d,massQueueAvailable:d,onMoveUp:D,onMoveDown:F,onMoveNext:G,onRemove:Q,hideActions:ae})}
      ${a!=null&&r.media_content_id!=null&&a===r.media_content_id?y`
            <div class="search-row-loading-overlay">
              <ha-icon icon="mdi:loading" class="spin"></ha-icon>
              <span>${p("common.loading")}</span>
            </div>
          `:k}
      ${s!=null&&r.media_content_id!=null&&s===r.media_content_id?y`
            <div class="search-row-error-overlay">
              <ha-icon icon="mdi:alert-circle" class="error-icon"></ha-icon>
              <span>${p("common.error")||"Error"}</span>
            </div>
          `:k}
      ${n!=null&&r.media_content_id!=null&&n===r.media_content_id?y`
            <div class="search-row-success-overlay">
              <span>✅</span>
              <span
                >${p(l==="playlist"?"search.added_to_playlist":"search.added")}</span
              >
            </div>
          `:k}
    </div>
  `}function Lo({item:r,onClose:e,onPlayOption:t,massQueueAvailable:i=!1}){return r?y`
    <div class="entity-options-overlay entity-options-overlay-opening" @click=${e}>
      <div
        class="entity-options-container entity-options-sheet-opening"
        @click=${a=>a.stopPropagation()}
      >
        <div class="entity-options-sheet">
          <div class="entity-options-title">${r.title}</div>

          ${Do.filter(a=>a.mode==="add_to_playlist"?Sa(r)&&i:!0).map(a=>y`
                <button
                  class="entity-options-item menu-action-item"
                  @click=${()=>t(r,a.mode)}
                >
                  <ha-icon class="menu-action-icon" .icon=${a.icon}></ha-icon>
                  <span class="menu-action-label">${a.label}</span>
                </button>
              `)}

          <div class="entity-options-divider"></div>

          <button class="entity-options-item close-item" @click=${e}>
            ${p("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  `:k}async function Js(r,e,t,i=null,a={},s=20){const n=await Ri(r);if(n)try{if(a.favorites){const u=i&&i!=="all"?[i]:ni,m=[];return await Promise.all(u.map(async f=>{try{const g={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:n,media_type:f,favorite:!0,search:t},return_response:!0},v=ut(s);v!==void 0&&(g.service_data.limit=v),a.orderBy&&a.orderBy!=="default"&&(g.service_data.order_by=a.orderBy),((await r.connection.sendMessagePromise(g))?.response?.items||[]).forEach(w=>{const A=Rt(w);A&&m.push(A)})}catch(g){console.error("yamp: Error searching favorites for type",f,g)}})),{results:m,usedMusicAssistant:!0}}if((!t||t.trim()==="")&&i&&i!=="all"&&!a.favorites){if(!ni.includes(i))return console.warn(`yamp: Unsupported media type for browsing: ${i}. Skipping get_library call.`),{results:[],usedMusicAssistant:!0};try{const u={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:n,media_type:i},return_response:!0},m=ut(s);m!==void 0&&(u.service_data.limit=m),a.orderBy&&a.orderBy!=="default"&&(u.service_data.order_by=a.orderBy);const f=(await r.connection.sendMessagePromise(u))?.response?.items||[],g=[];return f.forEach(v=>{const w=Rt(v);w&&g.push(w)}),{results:g,usedMusicAssistant:!0}}catch(u){return console.error("yamp: Error browsing library for type",i,u),{results:[],usedMusicAssistant:!0}}}const l={name:t,config_entry_id:n},c=ut(s,{cap:i==="all"?8:void 0});c!==void 0&&(l.limit=c),i&&i!=="all"&&(l.media_type=i),a.artist&&(l.artist=a.artist),a.album&&(l.album=a.album);const d={type:"call_service",domain:"music_assistant",service:"search",service_data:l,return_response:!0},h=(await r.connection.sendMessagePromise(d))?.response;if(h){const u=[];return Object.entries(h).forEach(([m,f])=>{Array.isArray(f)&&f.forEach(g=>{const v=Rt(g);v&&u.push(v)})}),{results:u,usedMusicAssistant:!0}}}catch(l){console.error("yamp: Error in searchMedia:",l)}return{results:await No(r,e,t,i,a),usedMusicAssistant:!1}}async function qo(r,e,t=null,i=20,a={}){const s=await Ri(r);if(!s)return{results:[],usedMusicAssistant:!1};const n=typeof a.onChunk=="function"?a.onChunk:null,l=async(c,d={})=>{const h={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:s,media_type:c,order_by:"last_played_desc"},return_response:!0},u=ut(i,d);return u!==void 0&&(h.service_data.limit=u),((await r.connection.sendMessagePromise(h))?.response?.items||[]).map(Rt).filter(Boolean)};try{if(t==="all"){const d=[];return await Promise.all(ni.map(async h=>{const u=await l(h,{cap:5});u.length&&(d.push(...u),n&&n(u,h))})),{results:d,usedMusicAssistant:!0}}const c=await l(t||"track");return c.length&&n&&n(c,t||"track"),{results:c,usedMusicAssistant:!0}}catch(c){return console.error("yamp: Error getting recently played from Music Assistant:",c),{results:[],usedMusicAssistant:!1}}}async function er(r,e,t=null,i=20,a={}){const s=await Ri(r);if(!s)return{results:[],usedMusicAssistant:!1};const n=typeof a.onChunk=="function"?a.onChunk:null,l=async c=>{const d={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:s,media_type:c,favorite:!0},return_response:!0},h=ut(i,{cap:c==="all"?8:void 0});h!==void 0&&(d.service_data.limit=h),a.orderBy&&a.orderBy!=="default"&&(d.service_data.order_by=a.orderBy);try{return((await r.connection.sendMessagePromise(d))?.response?.items||[]).map(Rt).filter(Boolean)}catch(u){return console.error("yamp: Error loading favorites for type",c,u),[]}};try{if(t&&t!=="all"){const d=await l(t);return d.length&&n&&n(d,t),{results:d,usedMusicAssistant:!0}}const c=[];return await Promise.all(ni.map(async d=>{const h=await l(d);h.length&&(c.push(...h),n&&n(h,d))})),{results:c,usedMusicAssistant:!0}}catch(c){return console.error("yamp: Error loading favorites",c),{results:[],usedMusicAssistant:!1}}}async function No(r,e,t,i,a={}){const s={entity_id:e,search_query:t};i&&i!=="all"&&(s.media_content_type=i);const n={type:"call_service",domain:"media_player",service:"search_media",service_data:s,return_response:!0},l=await r.connection.sendMessagePromise(n);return l?.response?.[e]?.result||l?.result||[]}function Vo(r,e,t){return r.callService("media_player","play_media",{entity_id:e,media_content_type:t.media_content_type,media_content_id:t.media_content_id})}async function Uo(r,e,t=null,i=null,a=null,s=100){if(!e)return!1;try{const n=await Ri(r);if(!n)return!1;let l=t;if(!l){const c=Object.values(r.states).find(d=>Ot(d)&&d.entity_id.startsWith("media_player."));if(c)l=c.entity_id;else return!1}if(i||a){try{const c={name:i||a,config_entry_id:n,media_type:"track"},d=ut(s);d!==void 0&&(c.limit=d),a&&(c.artist=a);const h={type:"call_service",domain:"music_assistant",service:"search",service_data:c,return_response:!0},u=(await r.connection.sendMessagePromise(h))?.response;let m=[];if(Array.isArray(u)?m=u:u&&typeof u=="object"&&Object.values(u).forEach(f=>{Array.isArray(f)&&m.push(...f)}),m.length){const f=(e.split("/").pop()||"").trim(),g=m.find(A=>A?.uri===e),v=!g&&/^\d+$/.test(f)?m.find(A=>typeof A?.uri=="string"&&A.uri.endsWith(`/${f}`)):null,w=g||v||null;if(w&&typeof w.favorite=="boolean")return!!w.favorite}}catch{}if(i)try{const c={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:n,media_type:"track",favorite:!0,search:i.trim()},return_response:!0},d=ut(s);if(d!==void 0&&(c.service_data.limit=d),((await r.connection.sendMessagePromise(c))?.response?.items||[]).some(h=>h.uri===e))return!0}catch{}}try{const c={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{config_entry_id:n,media_type:"track",favorite:!0},return_response:!0},d=ut(s,{floor:100});return d!==void 0&&(c.service_data.limit=d),((await r.connection.sendMessagePromise(c))?.response?.items||[]).some(h=>h.uri===e)}catch{}return!1}catch{return!1}}/*! js-yaml 4.2.0 https://github.com/nodeca/js-yaml @license MIT */var Ho=Object.create,tr=Object.defineProperty,Bo=Object.getOwnPropertyDescriptor,Go=Object.getOwnPropertyNames,Qo=Object.getPrototypeOf,Wo=Object.prototype.hasOwnProperty,ue=(r,e)=>()=>(e||(r((e={exports:{}}).exports,e),r=null),e.exports),Yo=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(var a=Go(e),s=0,n=a.length,l;s<n;s++)l=a[s],!Wo.call(r,l)&&l!==t&&tr(r,l,{get:(c=>e[c]).bind(null,l),enumerable:!(i=Bo(e,l))||i.enumerable});return r},Zo=(r,e,t)=>(t=r!=null?Ho(Qo(r)):{},Yo(tr(t,"default",{value:r,enumerable:!0}),r)),ci=ue(((r,e)=>{function t(c){return typeof c>"u"||c===null}function i(c){return typeof c=="object"&&c!==null}function a(c){return Array.isArray(c)?c:t(c)?[]:[c]}function s(c,d){if(d){const h=Object.keys(d);for(let u=0,m=h.length;u<m;u+=1){const f=h[u];c[f]=d[f]}}return c}function n(c,d){let h="";for(let u=0;u<d;u+=1)h+=c;return h}function l(c){return c===0&&Number.NEGATIVE_INFINITY===1/c}e.exports.isNothing=t,e.exports.isObject=i,e.exports.toArray=a,e.exports.repeat=n,e.exports.isNegativeZero=l,e.exports.extend=s})),di=ue(((r,e)=>{function t(a,s){let n="";const l=a.reason||"(unknown reason)";return a.mark?(a.mark.name&&(n+='in "'+a.mark.name+'" '),n+="("+(a.mark.line+1)+":"+(a.mark.column+1)+")",!s&&a.mark.snippet&&(n+=`

`+a.mark.snippet),l+" "+n):l}function i(a,s){Error.call(this),this.name="YAMLException",this.reason=a,this.mark=s,this.message=t(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}i.prototype=Object.create(Error.prototype),i.prototype.constructor=i,i.prototype.toString=function(s){return this.name+": "+t(this,s)},e.exports=i})),Ko=ue(((r,e)=>{var t=ci();function i(n,l,c,d,h){let u="",m="";const f=Math.floor(h/2)-1;return d-l>f&&(u=" ... ",l=d-f+u.length),c-d>f&&(m=" ...",c=d+f-m.length),{str:u+n.slice(l,c).replace(/\t/g,"\u2192")+m,pos:d-l+u.length}}function a(n,l){return t.repeat(" ",l-n.length)+n}function s(n,l){if(l=Object.create(l||null),!n.buffer)return null;l.maxLength||(l.maxLength=79),typeof l.indent!="number"&&(l.indent=1),typeof l.linesBefore!="number"&&(l.linesBefore=3),typeof l.linesAfter!="number"&&(l.linesAfter=2);const c=/\r?\n|\r|\0/g,d=[0],h=[];let u,m=-1;for(;u=c.exec(n.buffer);)h.push(u.index),d.push(u.index+u[0].length),n.position<=u.index&&m<0&&(m=d.length-2);m<0&&(m=d.length-1);let f="";const g=Math.min(n.line+l.linesAfter,h.length).toString().length,v=l.maxLength-(l.indent+g+3);for(let A=1;A<=l.linesBefore&&!(m-A<0);A++){const O=i(n.buffer,d[m-A],h[m-A],n.position-(d[m]-d[m-A]),v);f=t.repeat(" ",l.indent)+a((n.line-A+1).toString(),g)+" | "+O.str+`
`+f}const w=i(n.buffer,d[m],h[m],n.position,v);f+=t.repeat(" ",l.indent)+a((n.line+1).toString(),g)+" | "+w.str+`
`,f+=t.repeat("-",l.indent+g+3+w.pos)+`^
`;for(let A=1;A<=l.linesAfter&&!(m+A>=h.length);A++){const O=i(n.buffer,d[m+A],h[m+A],n.position-(d[m]-d[m+A]),v);f+=t.repeat(" ",l.indent)+a((n.line+A+1).toString(),g)+" | "+O.str+`
`}return f.replace(/\n$/,"")}e.exports=s})),Pe=ue(((r,e)=>{var t=di(),i=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],a=["scalar","sequence","mapping"];function s(l){const c={};return l!==null&&Object.keys(l).forEach(function(d){l[d].forEach(function(h){c[String(h)]=d})}),c}function n(l,c){if(c=c||{},Object.keys(c).forEach(function(d){if(i.indexOf(d)===-1)throw new t('Unknown option "'+d+'" is met in definition of "'+l+'" YAML type.')}),this.options=c,this.tag=l,this.kind=c.kind||null,this.resolve=c.resolve||function(){return!0},this.construct=c.construct||function(d){return d},this.instanceOf=c.instanceOf||null,this.predicate=c.predicate||null,this.represent=c.represent||null,this.representName=c.representName||null,this.defaultStyle=c.defaultStyle||null,this.multi=c.multi||!1,this.styleAliases=s(c.styleAliases||null),a.indexOf(this.kind)===-1)throw new t('Unknown kind "'+this.kind+'" is specified for "'+l+'" YAML type.')}e.exports=n})),ir=ue(((r,e)=>{var t=di(),i=Pe();function a(l,c){const d=[];return l[c].forEach(function(h){let u=d.length;d.forEach(function(m,f){m.tag===h.tag&&m.kind===h.kind&&m.multi===h.multi&&(u=f)}),d[u]=h}),d}function s(){const l={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}};function c(d){d.multi?(l.multi[d.kind].push(d),l.multi.fallback.push(d)):l[d.kind][d.tag]=l.fallback[d.tag]=d}for(let d=0,h=arguments.length;d<h;d+=1)arguments[d].forEach(c);return l}function n(l){return this.extend(l)}n.prototype.extend=function(c){let d=[],h=[];if(c instanceof i)h.push(c);else if(Array.isArray(c))h=h.concat(c);else if(c&&(Array.isArray(c.implicit)||Array.isArray(c.explicit)))c.implicit&&(d=d.concat(c.implicit)),c.explicit&&(h=h.concat(c.explicit));else throw new t("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");d.forEach(function(m){if(!(m instanceof i))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(m.loadKind&&m.loadKind!=="scalar")throw new t("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(m.multi)throw new t("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),h.forEach(function(m){if(!(m instanceof i))throw new t("Specified list of YAML types (or a single Type object) contains a non-Type object.")});const u=Object.create(n.prototype);return u.implicit=(this.implicit||[]).concat(d),u.explicit=(this.explicit||[]).concat(h),u.compiledImplicit=a(u,"implicit"),u.compiledExplicit=a(u,"explicit"),u.compiledTypeMap=s(u.compiledImplicit,u.compiledExplicit),u},e.exports=n})),ar=ue(((r,e)=>{e.exports=new(Pe())("tag:yaml.org,2002:str",{kind:"scalar",construct:function(t){return t!==null?t:""}})})),sr=ue(((r,e)=>{e.exports=new(Pe())("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(t){return t!==null?t:[]}})})),rr=ue(((r,e)=>{e.exports=new(Pe())("tag:yaml.org,2002:map",{kind:"mapping",construct:function(t){return t!==null?t:{}}})})),nr=ue(((r,e)=>{e.exports=new(ir())({explicit:[ar(),sr(),rr()]})})),or=ue(((r,e)=>{var t=Pe();function i(n){if(n===null)return!0;const l=n.length;return l===1&&n==="~"||l===4&&(n==="null"||n==="Null"||n==="NULL")}function a(){return null}function s(n){return n===null}e.exports=new t("tag:yaml.org,2002:null",{kind:"scalar",resolve:i,construct:a,predicate:s,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"})})),lr=ue(((r,e)=>{var t=Pe();function i(n){if(n===null)return!1;const l=n.length;return l===4&&(n==="true"||n==="True"||n==="TRUE")||l===5&&(n==="false"||n==="False"||n==="FALSE")}function a(n){return n==="true"||n==="True"||n==="TRUE"}function s(n){return Object.prototype.toString.call(n)==="[object Boolean]"}e.exports=new t("tag:yaml.org,2002:bool",{kind:"scalar",resolve:i,construct:a,predicate:s,represent:{lowercase:function(n){return n?"true":"false"},uppercase:function(n){return n?"TRUE":"FALSE"},camelcase:function(n){return n?"True":"False"}},defaultStyle:"lowercase"})})),cr=ue(((r,e)=>{var t=ci(),i=Pe();function a(u){return u>=48&&u<=57||u>=65&&u<=70||u>=97&&u<=102}function s(u){return u>=48&&u<=55}function n(u){return u>=48&&u<=57}function l(u){if(u===null)return!1;const m=u.length;let f=0,g=!1;if(!m)return!1;let v=u[f];if((v==="-"||v==="+")&&(v=u[++f]),v==="0"){if(f+1===m)return!0;if(v=u[++f],v==="b"){for(f++;f<m;f++){if(v=u[f],v!=="0"&&v!=="1")return!1;g=!0}return g&&Number.isFinite(c(u))}if(v==="x"){for(f++;f<m;f++){if(!a(u.charCodeAt(f)))return!1;g=!0}return g&&Number.isFinite(c(u))}if(v==="o"){for(f++;f<m;f++){if(!s(u.charCodeAt(f)))return!1;g=!0}return g&&Number.isFinite(c(u))}}for(;f<m;f++){if(!n(u.charCodeAt(f)))return!1;g=!0}return g?Number.isFinite(c(u)):!1}function c(u){let m=u,f=1,g=m[0];if((g==="-"||g==="+")&&(g==="-"&&(f=-1),m=m.slice(1),g=m[0]),m==="0")return 0;if(g==="0"){if(m[1]==="b")return f*parseInt(m.slice(2),2);if(m[1]==="x")return f*parseInt(m.slice(2),16);if(m[1]==="o")return f*parseInt(m.slice(2),8)}return f*parseInt(m,10)}function d(u){return c(u)}function h(u){return Object.prototype.toString.call(u)==="[object Number]"&&u%1===0&&!t.isNegativeZero(u)}e.exports=new i("tag:yaml.org,2002:int",{kind:"scalar",resolve:l,construct:d,predicate:h,represent:{binary:function(u){return u>=0?"0b"+u.toString(2):"-0b"+u.toString(2).slice(1)},octal:function(u){return u>=0?"0o"+u.toString(8):"-0o"+u.toString(8).slice(1)},decimal:function(u){return u.toString(10)},hexadecimal:function(u){return u>=0?"0x"+u.toString(16).toUpperCase():"-0x"+u.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}})})),dr=ue(((r,e)=>{var t=ci(),i=Pe(),a=new RegExp("^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),s=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function n(u){return u===null||!a.test(u)?!1:Number.isFinite(parseFloat(u,10))?!0:s.test(u)}function l(u){let m=u.toLowerCase();const f=m[0]==="-"?-1:1;return"+-".indexOf(m[0])>=0&&(m=m.slice(1)),m===".inf"?f===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:m===".nan"?NaN:f*parseFloat(m,10)}var c=/^[-+]?[0-9]+e/;function d(u,m){if(isNaN(u))switch(m){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===u)switch(m){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===u)switch(m){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(t.isNegativeZero(u))return"-0.0";const f=u.toString(10);return c.test(f)?f.replace("e",".e"):f}function h(u){return Object.prototype.toString.call(u)==="[object Number]"&&(u%1!==0||t.isNegativeZero(u))}e.exports=new i("tag:yaml.org,2002:float",{kind:"scalar",resolve:n,construct:l,predicate:h,represent:d,defaultStyle:"lowercase"})})),ur=ue(((r,e)=>{e.exports=nr().extend({implicit:[or(),lr(),cr(),dr()]})})),hr=ue(((r,e)=>{e.exports=ur()})),pr=ue(((r,e)=>{var t=Pe(),i=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),a=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function s(c){return c===null?!1:i.exec(c)!==null||a.exec(c)!==null}function n(c){let d=0,h=null,u=i.exec(c);if(u===null&&(u=a.exec(c)),u===null)throw new Error("Date resolve error");const m=+u[1],f=+u[2]-1,g=+u[3];if(!u[4])return new Date(Date.UTC(m,f,g));const v=+u[4],w=+u[5],A=+u[6];if(u[7]){for(d=u[7].slice(0,3);d.length<3;)d+="0";d=+d}if(u[9]){const D=+u[10],F=+(u[11]||0);h=(D*60+F)*6e4,u[9]==="-"&&(h=-h)}const O=new Date(Date.UTC(m,f,g,v,w,A,d));return h&&O.setTime(O.getTime()-h),O}function l(c){return c.toISOString()}e.exports=new t("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:s,construct:n,instanceOf:Date,represent:l})})),_r=ue(((r,e)=>{var t=Pe();function i(a){return a==="<<"||a===null}e.exports=new t("tag:yaml.org,2002:merge",{kind:"scalar",resolve:i})})),mr=ue(((r,e)=>{var t=Pe(),i=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function a(c){if(c===null)return!1;let d=0;const h=c.length,u=i;for(let m=0;m<h;m++){const f=u.indexOf(c.charAt(m));if(!(f>64)){if(f<0)return!1;d+=6}}return d%8===0}function s(c){const d=c.replace(/[\r\n=]/g,""),h=d.length,u=i;let m=0;const f=[];for(let v=0;v<h;v++)v%4===0&&v&&(f.push(m>>16&255),f.push(m>>8&255),f.push(m&255)),m=m<<6|u.indexOf(d.charAt(v));const g=h%4*6;return g===0?(f.push(m>>16&255),f.push(m>>8&255),f.push(m&255)):g===18?(f.push(m>>10&255),f.push(m>>2&255)):g===12&&f.push(m>>4&255),new Uint8Array(f)}function n(c){let d="",h=0;const u=c.length,m=i;for(let g=0;g<u;g++)g%3===0&&g&&(d+=m[h>>18&63],d+=m[h>>12&63],d+=m[h>>6&63],d+=m[h&63]),h=(h<<8)+c[g];const f=u%3;return f===0?(d+=m[h>>18&63],d+=m[h>>12&63],d+=m[h>>6&63],d+=m[h&63]):f===2?(d+=m[h>>10&63],d+=m[h>>4&63],d+=m[h<<2&63],d+=m[64]):f===1&&(d+=m[h>>2&63],d+=m[h<<4&63],d+=m[64],d+=m[64]),d}function l(c){return Object.prototype.toString.call(c)==="[object Uint8Array]"}e.exports=new t("tag:yaml.org,2002:binary",{kind:"scalar",resolve:a,construct:s,predicate:l,represent:n})})),fr=ue(((r,e)=>{var t=Pe(),i=Object.prototype.hasOwnProperty,a=Object.prototype.toString;function s(l){if(l===null)return!0;const c=[],d=l;for(let h=0,u=d.length;h<u;h+=1){const m=d[h];let f=!1;if(a.call(m)!=="[object Object]")return!1;let g;for(g in m)if(i.call(m,g))if(!f)f=!0;else return!1;if(!f)return!1;if(c.indexOf(g)===-1)c.push(g);else return!1}return!0}function n(l){return l!==null?l:[]}e.exports=new t("tag:yaml.org,2002:omap",{kind:"sequence",resolve:s,construct:n})})),gr=ue(((r,e)=>{var t=Pe(),i=Object.prototype.toString;function a(n){if(n===null)return!0;const l=n,c=new Array(l.length);for(let d=0,h=l.length;d<h;d+=1){const u=l[d];if(i.call(u)!=="[object Object]")return!1;const m=Object.keys(u);if(m.length!==1)return!1;c[d]=[m[0],u[m[0]]]}return!0}function s(n){if(n===null)return[];const l=n,c=new Array(l.length);for(let d=0,h=l.length;d<h;d+=1){const u=l[d],m=Object.keys(u);c[d]=[m[0],u[m[0]]]}return c}e.exports=new t("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:a,construct:s})})),yr=ue(((r,e)=>{var t=Pe(),i=Object.prototype.hasOwnProperty;function a(n){if(n===null)return!0;const l=n;for(const c in l)if(i.call(l,c)&&l[c]!==null)return!1;return!0}function s(n){return n!==null?n:{}}e.exports=new t("tag:yaml.org,2002:set",{kind:"mapping",resolve:a,construct:s})})),Ca=ue(((r,e)=>{e.exports=hr().extend({implicit:[pr(),_r()],explicit:[mr(),fr(),gr(),yr()]})})),Xo=ue(((r,e)=>{var t=ci(),i=di(),a=Ko(),s=Ca(),n=Object.prototype.hasOwnProperty,l=1,c=2,d=3,h=4,u=1,m=2,f=3,g=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,v=/[\x85\u2028\u2029]/,w=/[,\[\]{}]/,A=/^(?:!|!!|![0-9A-Za-z-]+!)$/,O=/^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;function D(o){return Object.prototype.toString.call(o)}function F(o){return o===10||o===13}function G(o){return o===9||o===32}function Q(o){return o===9||o===32||o===10||o===13}function B(o){return o===44||o===91||o===93||o===123||o===125}function te(o){if(o>=48&&o<=57)return o-48;const x=o|32;return x>=97&&x<=102?x-97+10:-1}function Z(o){return o===120?2:o===117?4:o===85?8:0}function X(o){return o>=48&&o<=57?o-48:-1}function U(o){switch(o){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}function ie(o){return o<=65535?String.fromCharCode(o):String.fromCharCode((o-65536>>10)+55296,(o-65536&1023)+56320)}function J(o,x,S){x==="__proto__"?Object.defineProperty(o,x,{configurable:!0,enumerable:!0,writable:!0,value:S}):o[x]=S}var ae=new Array(256),ne=new Array(256);for(let o=0;o<256;o++)ae[o]=U(o)?1:0,ne[o]=U(o);function oe(o,x){this.input=o,this.filename=x.filename||null,this.schema=x.schema||s,this.onWarning=x.onWarning||null,this.legacy=x.legacy||!1,this.json=x.json||!1,this.listener=x.listener||null,this.maxDepth=typeof x.maxDepth=="number"?x.maxDepth:100,this.maxMergeSeqLength=typeof x.maxMergeSeqLength=="number"?x.maxMergeSeqLength:20,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=o.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.depth=0,this.firstTabInLine=-1,this.documents=[],this.anchorMapTransactions=[]}function xe(o,x){const S={name:o.filename,buffer:o.input.slice(0,-1),position:o.position,line:o.line,column:o.position-o.lineStart};return S.snippet=a(S),new i(x,S)}function L(o,x){throw xe(o,x)}function Se(o,x){o.onWarning&&o.onWarning.call(null,xe(o,x))}function ye(o,x,S){const T=o.anchorMapTransactions;if(T.length!==0){const E=T[T.length-1];n.call(E,x)||(E[x]={existed:n.call(o.anchorMap,x),value:o.anchorMap[x]})}o.anchorMap[x]=S}function je(o){o.anchorMapTransactions.push(Object.create(null))}function Be(o){const x=o.anchorMapTransactions.pop(),S=o.anchorMapTransactions;if(S.length===0)return;const T=S[S.length-1],E=Object.keys(x);for(let j=0,_=E.length;j<_;j+=1){const b=E[j];n.call(T,b)||(T[b]=x[b])}}function Ge(o){const x=o.anchorMapTransactions.pop(),S=Object.keys(x);for(let T=S.length-1;T>=0;T-=1){const E=x[S[T]];E.existed?o.anchorMap[S[T]]=E.value:delete o.anchorMap[S[T]]}}function mt(o){return{position:o.position,line:o.line,lineStart:o.lineStart,lineIndent:o.lineIndent,firstTabInLine:o.firstTabInLine,tag:o.tag,anchor:o.anchor,kind:o.kind,result:o.result}}function Te(o,x){o.position=x.position,o.line=x.line,o.lineStart=x.lineStart,o.lineIndent=x.lineIndent,o.firstTabInLine=x.firstTabInLine,o.tag=x.tag,o.anchor=x.anchor,o.kind=x.kind,o.result=x.result}var $t={YAML:function(x,S,T){x.version!==null&&L(x,"duplication of %YAML directive"),T.length!==1&&L(x,"YAML directive accepts exactly one argument");const E=/^([0-9]+)\.([0-9]+)$/.exec(T[0]);E===null&&L(x,"ill-formed argument of the YAML directive");const j=parseInt(E[1],10),_=parseInt(E[2],10);j!==1&&L(x,"unacceptable YAML version of the document"),x.version=T[0],x.checkLineBreaks=_<2,_!==1&&_!==2&&Se(x,"unsupported YAML version of the document")},TAG:function(x,S,T){let E;T.length!==2&&L(x,"TAG directive accepts exactly two arguments");const j=T[0];E=T[1],A.test(j)||L(x,"ill-formed tag handle (first argument) of the TAG directive"),n.call(x.tagMap,j)&&L(x,'there is a previously declared suffix for "'+j+'" tag handle'),O.test(E)||L(x,"ill-formed tag prefix (second argument) of the TAG directive");try{E=decodeURIComponent(E)}catch{L(x,"tag prefix is malformed: "+E)}x.tagMap[j]=E}};function Ae(o,x,S,T){if(x<S){const E=o.input.slice(x,S);if(T)for(let j=0,_=E.length;j<_;j+=1){const b=E.charCodeAt(j);b===9||b>=32&&b<=1114111||L(o,"expected valid JSON character")}else g.test(E)&&L(o,"the stream contains non-printable characters");o.result+=E}}function we(o,x,S,T){t.isObject(S)||L(o,"cannot merge mappings; the provided source object is unacceptable");const E=Object.keys(S);for(let j=0,_=E.length;j<_;j+=1){const b=E[j];n.call(x,b)||(J(x,b,S[b]),T[b]=!0)}}function Ve(o,x,S,T,E,j,_,b,P){if(Array.isArray(E)){E=Array.prototype.slice.call(E);for(let C=0,$=E.length;C<$;C+=1)Array.isArray(E[C])&&L(o,"nested arrays are not supported inside keys"),typeof E=="object"&&D(E[C])==="[object Object]"&&(E[C]="[object Object]")}if(typeof E=="object"&&D(E)==="[object Object]"&&(E="[object Object]"),E=String(E),x===null&&(x={}),T==="tag:yaml.org,2002:merge")if(Array.isArray(j)){j.length>o.maxMergeSeqLength&&L(o,"merge sequence length exceeded maxMergeSeqLength ("+o.maxMergeSeqLength+")");const C=new Set;for(let $=0,z=j.length;$<z;$+=1){const M=j[$];C.has(M)||(C.add(M),we(o,x,M,S))}}else we(o,x,j,S);else!o.json&&!n.call(S,E)&&n.call(x,E)&&(o.line=_||o.line,o.lineStart=b||o.lineStart,o.position=P||o.position,L(o,"duplicated mapping key")),J(x,E,j),delete S[E];return x}function Re(o){const x=o.input.charCodeAt(o.position);x===10?o.position++:x===13?(o.position++,o.input.charCodeAt(o.position)===10&&o.position++):L(o,"a line break is expected"),o.line+=1,o.lineStart=o.position,o.firstTabInLine=-1}function he(o,x,S){let T=0,E=o.input.charCodeAt(o.position);for(;E!==0;){for(;G(E);)E===9&&o.firstTabInLine===-1&&(o.firstTabInLine=o.position),E=o.input.charCodeAt(++o.position);if(x&&E===35)do E=o.input.charCodeAt(++o.position);while(E!==10&&E!==13&&E!==0);if(F(E))for(Re(o),E=o.input.charCodeAt(o.position),T++,o.lineIndent=0;E===32;)o.lineIndent++,E=o.input.charCodeAt(++o.position);else break}return S!==-1&&T!==0&&o.lineIndent<S&&Se(o,"deficient indentation"),T}function ot(o){let x=o.position,S=o.input.charCodeAt(x);return!!((S===45||S===46)&&S===o.input.charCodeAt(x+1)&&S===o.input.charCodeAt(x+2)&&(x+=3,S=o.input.charCodeAt(x),S===0||Q(S)))}function Le(o,x){x===1?o.result+=" ":x>1&&(o.result+=t.repeat(`
`,x-1))}function ft(o,x,S){let T,E,j,_,b,P;const C=o.kind,$=o.result;let z=o.input.charCodeAt(o.position);if(Q(z)||B(z)||z===35||z===38||z===42||z===33||z===124||z===62||z===39||z===34||z===37||z===64||z===96)return!1;if(z===63||z===45){const M=o.input.charCodeAt(o.position+1);if(Q(M)||S&&B(M))return!1}for(o.kind="scalar",o.result="",T=E=o.position,j=!1;z!==0;){if(z===58){const M=o.input.charCodeAt(o.position+1);if(Q(M)||S&&B(M))break}else if(z===35){if(Q(o.input.charCodeAt(o.position-1)))break}else{if(o.position===o.lineStart&&ot(o)||S&&B(z))break;if(F(z))if(_=o.line,b=o.lineStart,P=o.lineIndent,he(o,!1,-1),o.lineIndent>=x){j=!0,z=o.input.charCodeAt(o.position);continue}else{o.position=E,o.line=_,o.lineStart=b,o.lineIndent=P;break}}j&&(Ae(o,T,E,!1),Le(o,o.line-_),T=E=o.position,j=!1),G(z)||(E=o.position+1),z=o.input.charCodeAt(++o.position)}return Ae(o,T,E,!1),o.result?!0:(o.kind=C,o.result=$,!1)}function Ye(o,x){let S,T,E=o.input.charCodeAt(o.position);if(E!==39)return!1;for(o.kind="scalar",o.result="",o.position++,S=T=o.position;(E=o.input.charCodeAt(o.position))!==0;)if(E===39)if(Ae(o,S,o.position,!0),E=o.input.charCodeAt(++o.position),E===39)S=o.position,o.position++,T=o.position;else return!0;else F(E)?(Ae(o,S,T,!0),Le(o,he(o,!1,x)),S=T=o.position):o.position===o.lineStart&&ot(o)?L(o,"unexpected end of the document within a single quoted scalar"):(o.position++,G(E)||(T=o.position));L(o,"unexpected end of the stream within a single quoted scalar")}function gt(o,x){let S,T,E,j=o.input.charCodeAt(o.position);if(j!==34)return!1;for(o.kind="scalar",o.result="",o.position++,S=T=o.position;(j=o.input.charCodeAt(o.position))!==0;){if(j===34)return Ae(o,S,o.position,!0),o.position++,!0;if(j===92){if(Ae(o,S,o.position,!0),j=o.input.charCodeAt(++o.position),F(j))he(o,!1,x);else if(j<256&&ae[j])o.result+=ne[j],o.position++;else if((E=Z(j))>0){let _=E,b=0;for(;_>0;_--)j=o.input.charCodeAt(++o.position),(E=te(j))>=0?b=(b<<4)+E:L(o,"expected hexadecimal character");o.result+=ie(b),o.position++}else L(o,"unknown escape sequence");S=T=o.position}else F(j)?(Ae(o,S,T,!0),Le(o,he(o,!1,x)),S=T=o.position):o.position===o.lineStart&&ot(o)?L(o,"unexpected end of the document within a double quoted scalar"):(o.position++,G(j)||(T=o.position))}L(o,"unexpected end of the stream within a double quoted scalar")}function Ct(o,x){let S=!0,T,E,j;const _=o.tag;let b;const P=o.anchor;let C,$,z,M;const N=Object.create(null);let q,V,H,ee=o.input.charCodeAt(o.position);if(ee===91)C=93,M=!1,b=[];else if(ee===123)C=125,M=!0,b={};else return!1;for(o.anchor!==null&&ye(o,o.anchor,b),ee=o.input.charCodeAt(++o.position);ee!==0;){if(he(o,!0,x),ee=o.input.charCodeAt(o.position),ee===C)return o.position++,o.tag=_,o.anchor=P,o.kind=M?"mapping":"sequence",o.result=b,!0;S?ee===44&&L(o,"expected the node content, but found ','"):L(o,"missed comma between flow collection entries"),V=q=H=null,$=z=!1,ee===63&&Q(o.input.charCodeAt(o.position+1))&&($=z=!0,o.position++,he(o,!0,x)),T=o.line,E=o.lineStart,j=o.position,ke(o,x,l,!1,!0),V=o.tag,q=o.result,he(o,!0,x),ee=o.input.charCodeAt(o.position),(z||o.line===T)&&ee===58&&($=!0,ee=o.input.charCodeAt(++o.position),he(o,!0,x),ke(o,x,l,!1,!0),H=o.result),M?Ve(o,b,N,V,q,H,T,E,j):$?b.push(Ve(o,null,N,V,q,H,T,E,j)):b.push(q),he(o,!0,x),ee=o.input.charCodeAt(o.position),ee===44?(S=!0,ee=o.input.charCodeAt(++o.position)):S=!1}L(o,"unexpected end of the stream within a flow collection")}function yt(o,x){let S,T=u,E=!1,j=!1,_=x,b=0,P=!1,C,$=o.input.charCodeAt(o.position);if($===124)S=!1;else if($===62)S=!0;else return!1;for(o.kind="scalar",o.result="";$!==0;)if($=o.input.charCodeAt(++o.position),$===43||$===45)u===T?T=$===43?f:m:L(o,"repeat of a chomping mode identifier");else if((C=X($))>=0)C===0?L(o,"bad explicit indentation width of a block scalar; it cannot be less than one"):j?L(o,"repeat of an indentation width identifier"):(_=x+C-1,j=!0);else break;if(G($)){do $=o.input.charCodeAt(++o.position);while(G($));if($===35)do $=o.input.charCodeAt(++o.position);while(!F($)&&$!==0)}for(;$!==0;){for(Re(o),o.lineIndent=0,$=o.input.charCodeAt(o.position);(!j||o.lineIndent<_)&&$===32;)o.lineIndent++,$=o.input.charCodeAt(++o.position);if(!j&&o.lineIndent>_&&(_=o.lineIndent),F($)){b++;continue}if(!j&&_===0&&L(o,"missing indentation for block scalar"),o.lineIndent<_){T===f?o.result+=t.repeat(`
`,E?1+b:b):T===u&&E&&(o.result+=`
`);break}S?G($)?(P=!0,o.result+=t.repeat(`
`,E?1+b:b)):P?(P=!1,o.result+=t.repeat(`
`,b+1)):b===0?E&&(o.result+=" "):o.result+=t.repeat(`
`,b):o.result+=t.repeat(`
`,E?1+b:b),E=!0,j=!0,b=0;const z=o.position;for(;!F($)&&$!==0;)$=o.input.charCodeAt(++o.position);Ae(o,z,o.position,!1)}return!0}function pe(o,x){const S=o.tag,T=o.anchor,E=[];let j=!1;if(o.firstTabInLine!==-1)return!1;o.anchor!==null&&ye(o,o.anchor,E);let _=o.input.charCodeAt(o.position);for(;_!==0&&(o.firstTabInLine!==-1&&(o.position=o.firstTabInLine,L(o,"tab characters must not be used in indentation")),!(_!==45||!Q(o.input.charCodeAt(o.position+1))));){if(j=!0,o.position++,he(o,!0,-1)&&o.lineIndent<=x){E.push(null),_=o.input.charCodeAt(o.position);continue}const b=o.line;if(ke(o,x,d,!1,!0),E.push(o.result),he(o,!0,-1),_=o.input.charCodeAt(o.position),(o.line===b||o.lineIndent>x)&&_!==0)L(o,"bad indentation of a sequence entry");else if(o.lineIndent<x)break}return j?(o.tag=S,o.anchor=T,o.kind="sequence",o.result=E,!0):!1}function It(o,x,S){let T,E,j,_;const b=o.tag,P=o.anchor,C={},$=Object.create(null);let z=null,M=null,N=null,q=!1,V=!1;if(o.firstTabInLine!==-1)return!1;o.anchor!==null&&ye(o,o.anchor,C);let H=o.input.charCodeAt(o.position);for(;H!==0;){!q&&o.firstTabInLine!==-1&&(o.position=o.firstTabInLine,L(o,"tab characters must not be used in indentation"));const ee=o.input.charCodeAt(o.position+1),de=o.line;if((H===63||H===58)&&Q(ee))H===63?(q&&(Ve(o,C,$,z,M,null,E,j,_),z=M=N=null),V=!0,q=!0,T=!0):q?(q=!1,T=!0):L(o,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),o.position+=1,H=ee;else{if(E=o.line,j=o.lineStart,_=o.position,!ke(o,S,c,!1,!0))break;if(o.line===de){for(H=o.input.charCodeAt(o.position);G(H);)H=o.input.charCodeAt(++o.position);if(H===58)H=o.input.charCodeAt(++o.position),Q(H)||L(o,"a whitespace character is expected after the key-value separator within a block mapping"),q&&(Ve(o,C,$,z,M,null,E,j,_),z=M=N=null),V=!0,q=!1,T=!1,z=o.tag,M=o.result;else if(V)L(o,"can not read an implicit mapping pair; a colon is missed");else return o.tag=b,o.anchor=P,!0}else if(V)L(o,"can not read a block mapping entry; a multiline key may not be an implicit key");else return o.tag=b,o.anchor=P,!0}if((o.line===de||o.lineIndent>x)&&(q&&(E=o.line,j=o.lineStart,_=o.position),ke(o,x,h,!0,T)&&(q?M=o.result:N=o.result),q||(Ve(o,C,$,z,M,N,E,j,_),z=M=N=null),he(o,!0,-1),H=o.input.charCodeAt(o.position)),(o.line===de||o.lineIndent>x)&&H!==0)L(o,"bad indentation of a mapping entry");else if(o.lineIndent<x)break}return q&&Ve(o,C,$,z,M,null,E,j,_),V&&(o.tag=b,o.anchor=P,o.kind="mapping",o.result=C),V}function Wt(o){let x=!1,S=!1,T,E,j=o.input.charCodeAt(o.position);if(j!==33)return!1;o.tag!==null&&L(o,"duplication of a tag property"),j=o.input.charCodeAt(++o.position),j===60?(x=!0,j=o.input.charCodeAt(++o.position)):j===33?(S=!0,T="!!",j=o.input.charCodeAt(++o.position)):T="!";let _=o.position;if(x){do j=o.input.charCodeAt(++o.position);while(j!==0&&j!==62);o.position<o.length?(E=o.input.slice(_,o.position),j=o.input.charCodeAt(++o.position)):L(o,"unexpected end of the stream within a verbatim tag")}else{for(;j!==0&&!Q(j);)j===33&&(S?L(o,"tag suffix cannot contain exclamation marks"):(T=o.input.slice(_-1,o.position+1),A.test(T)||L(o,"named tag handle cannot contain such characters"),S=!0,_=o.position+1)),j=o.input.charCodeAt(++o.position);E=o.input.slice(_,o.position),w.test(E)&&L(o,"tag suffix cannot contain flow indicator characters")}E&&!O.test(E)&&L(o,"tag name cannot contain such characters: "+E);try{E=decodeURIComponent(E)}catch{L(o,"tag name is malformed: "+E)}return x?o.tag=E:n.call(o.tagMap,T)?o.tag=o.tagMap[T]+E:T==="!"?o.tag="!"+E:T==="!!"?o.tag="tag:yaml.org,2002:"+E:L(o,'undeclared tag handle "'+T+'"'),!0}function Ze(o){let x=o.input.charCodeAt(o.position);if(x!==38)return!1;o.anchor!==null&&L(o,"duplication of an anchor property"),x=o.input.charCodeAt(++o.position);const S=o.position;for(;x!==0&&!Q(x)&&!B(x);)x=o.input.charCodeAt(++o.position);return o.position===S&&L(o,"name of an anchor node must contain at least one character"),o.anchor=o.input.slice(S,o.position),!0}function Tt(o){let x=o.input.charCodeAt(o.position);if(x!==42)return!1;x=o.input.charCodeAt(++o.position);const S=o.position;for(;x!==0&&!Q(x)&&!B(x);)x=o.input.charCodeAt(++o.position);o.position===S&&L(o,"name of an alias node must contain at least one character");const T=o.input.slice(S,o.position);return n.call(o.anchorMap,T)||L(o,'unidentified alias "'+T+'"'),o.result=o.anchorMap[T],he(o,!0,-1),!0}function Yt(o,x,S,T){const E=mt(o);return je(o),Te(o,x),o.tag=null,o.anchor=null,o.kind=null,o.result=null,It(o,S,T)&&o.kind==="mapping"?(Be(o),!0):(Ge(o),Te(o,E),!1)}function ke(o,x,S,T,E){let j,_,b=1,P=!1,C=!1,$=null,z,M,N;o.depth>=o.maxDepth&&L(o,"nesting exceeded maxDepth ("+o.maxDepth+")"),o.depth+=1,o.listener!==null&&o.listener("open",o),o.tag=null,o.anchor=null,o.kind=null,o.result=null;const q=j=_=h===S||d===S;if(T&&he(o,!0,-1)&&(P=!0,o.lineIndent>x?b=1:o.lineIndent===x?b=0:o.lineIndent<x&&(b=-1)),b===1)for(;;){const V=o.input.charCodeAt(o.position),H=mt(o);if(P&&(V===33&&o.tag!==null||V===38&&o.anchor!==null)||!Wt(o)&&!Ze(o))break;$===null&&($=H),he(o,!0,-1)?(P=!0,_=q,o.lineIndent>x?b=1:o.lineIndent===x?b=0:o.lineIndent<x&&(b=-1)):_=!1}if(_&&(_=P||E),b===1||h===S)if(l===S||c===S?M=x:M=x+1,N=o.position-o.lineStart,b===1)if(_&&(pe(o,N)||It(o,N,M))||Ct(o,M))C=!0;else{const V=o.input.charCodeAt(o.position);$!==null&&q&&!_&&V!==124&&V!==62&&Yt(o,$,$.position-$.lineStart,M)||j&&yt(o,M)||Ye(o,M)||gt(o,M)?C=!0:Tt(o)?(C=!0,(o.tag!==null||o.anchor!==null)&&L(o,"alias node should not have any properties")):ft(o,M,l===S)&&(C=!0,o.tag===null&&(o.tag="?")),o.anchor!==null&&ye(o,o.anchor,o.result)}else b===0&&(C=_&&pe(o,N));if(o.tag===null)o.anchor!==null&&ye(o,o.anchor,o.result);else if(o.tag==="?"){o.result!==null&&o.kind!=="scalar"&&L(o,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+o.kind+'"');for(let V=0,H=o.implicitTypes.length;V<H;V+=1)if(z=o.implicitTypes[V],z.resolve(o.result)){o.result=z.construct(o.result),o.tag=z.tag,o.anchor!==null&&ye(o,o.anchor,o.result);break}}else if(o.tag!=="!"){if(n.call(o.typeMap[o.kind||"fallback"],o.tag))z=o.typeMap[o.kind||"fallback"][o.tag];else{z=null;const V=o.typeMap.multi[o.kind||"fallback"];for(let H=0,ee=V.length;H<ee;H+=1)if(o.tag.slice(0,V[H].tag.length)===V[H].tag){z=V[H];break}}z||L(o,"unknown tag !<"+o.tag+">"),o.result!==null&&z.kind!==o.kind&&L(o,"unacceptable node kind for !<"+o.tag+'> tag; it should be "'+z.kind+'", not "'+o.kind+'"'),z.resolve(o.result,o.tag)?(o.result=z.construct(o.result,o.tag),o.anchor!==null&&ye(o,o.anchor,o.result)):L(o,"cannot resolve a node with !<"+o.tag+"> explicit tag")}return o.listener!==null&&o.listener("close",o),o.depth-=1,o.tag!==null||o.anchor!==null||C}function Zt(o){const x=o.position;let S=!1,T;for(o.version=null,o.checkLineBreaks=o.legacy,o.tagMap=Object.create(null),o.anchorMap=Object.create(null);(T=o.input.charCodeAt(o.position))!==0&&(he(o,!0,-1),T=o.input.charCodeAt(o.position),!(o.lineIndent>0||T!==37));){S=!0,T=o.input.charCodeAt(++o.position);let E=o.position;for(;T!==0&&!Q(T);)T=o.input.charCodeAt(++o.position);const j=o.input.slice(E,o.position),_=[];for(j.length<1&&L(o,"directive name must not be less than one character in length");T!==0;){for(;G(T);)T=o.input.charCodeAt(++o.position);if(T===35){do T=o.input.charCodeAt(++o.position);while(T!==0&&!F(T));break}if(F(T))break;for(E=o.position;T!==0&&!Q(T);)T=o.input.charCodeAt(++o.position);_.push(o.input.slice(E,o.position))}T!==0&&Re(o),n.call($t,j)?$t[j](o,j,_):Se(o,'unknown document directive "'+j+'"')}if(he(o,!0,-1),o.lineIndent===0&&o.input.charCodeAt(o.position)===45&&o.input.charCodeAt(o.position+1)===45&&o.input.charCodeAt(o.position+2)===45?(o.position+=3,he(o,!0,-1)):S&&L(o,"directives end mark is expected"),ke(o,o.lineIndent-1,h,!1,!0),he(o,!0,-1),o.checkLineBreaks&&v.test(o.input.slice(x,o.position))&&Se(o,"non-ASCII line breaks are interpreted as content"),o.documents.push(o.result),o.position===o.lineStart&&ot(o)){o.input.charCodeAt(o.position)===46&&(o.position+=3,he(o,!0,-1));return}o.position<o.length-1&&L(o,"end of the stream or a document separator is expected")}function Mt(o,x){o=String(o),x=x||{},o.length!==0&&(o.charCodeAt(o.length-1)!==10&&o.charCodeAt(o.length-1)!==13&&(o+=`
`),o.charCodeAt(0)===65279&&(o=o.slice(1)));const S=new oe(o,x),T=o.indexOf("\0");for(T!==-1&&(S.position=T,L(S,"null byte is not allowed in input")),S.input+="\0";S.input.charCodeAt(S.position)===32;)S.lineIndent+=1,S.position+=1;for(;S.position<S.length-1;)Zt(S);return S.documents}function Ke(o,x,S){x!==null&&typeof x=="object"&&typeof S>"u"&&(S=x,x=null);const T=Mt(o,S);if(typeof x!="function")return T;for(let E=0,j=T.length;E<j;E+=1)x(T[E])}function et(o,x){const S=Mt(o,x);if(S.length!==0){if(S.length===1)return S[0];throw new i("expected a single document in the stream, but found more")}}e.exports.loadAll=Ke,e.exports.load=et})),Jo=ue(((r,e)=>{var t=ci(),i=di(),a=Ca(),s=Object.prototype.toString,n=Object.prototype.hasOwnProperty,l=65279,c=9,d=10,h=13,u=32,m=33,f=34,g=35,v=37,w=38,A=39,O=42,D=44,F=45,G=58,Q=61,B=62,te=63,Z=64,X=91,U=93,ie=96,J=123,ae=124,ne=125,oe={};oe[0]="\\0",oe[7]="\\a",oe[8]="\\b",oe[9]="\\t",oe[10]="\\n",oe[11]="\\v",oe[12]="\\f",oe[13]="\\r",oe[27]="\\e",oe[34]='\\"',oe[92]="\\\\",oe[133]="\\N",oe[160]="\\_",oe[8232]="\\L",oe[8233]="\\P";var xe=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],L=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function Se(_,b){if(b===null)return{};const P={},C=Object.keys(b);for(let $=0,z=C.length;$<z;$+=1){let M=C[$],N=String(b[M]);M.slice(0,2)==="!!"&&(M="tag:yaml.org,2002:"+M.slice(2));const q=_.compiledTypeMap.fallback[M];q&&n.call(q.styleAliases,N)&&(N=q.styleAliases[N]),P[M]=N}return P}function ye(_){let b,P;const C=_.toString(16).toUpperCase();if(_<=255)b="x",P=2;else if(_<=65535)b="u",P=4;else if(_<=4294967295)b="U",P=8;else throw new i("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+b+t.repeat("0",P-C.length)+C}var je=1,Be=2;function Ge(_){this.schema=_.schema||a,this.indent=Math.max(1,_.indent||2),this.noArrayIndent=_.noArrayIndent||!1,this.skipInvalid=_.skipInvalid||!1,this.flowLevel=t.isNothing(_.flowLevel)?-1:_.flowLevel,this.styleMap=Se(this.schema,_.styles||null),this.sortKeys=_.sortKeys||!1,this.lineWidth=_.lineWidth||80,this.noRefs=_.noRefs||!1,this.noCompatMode=_.noCompatMode||!1,this.condenseFlow=_.condenseFlow||!1,this.quotingType=_.quotingType==='"'?Be:je,this.forceQuotes=_.forceQuotes||!1,this.replacer=typeof _.replacer=="function"?_.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function mt(_,b){const P=t.repeat(" ",b);let C=0,$="";const z=_.length;for(;C<z;){let M;const N=_.indexOf(`
`,C);N===-1?(M=_.slice(C),C=z):(M=_.slice(C,N+1),C=N+1),M.length&&M!==`
`&&($+=P),$+=M}return $}function Te(_,b){return`
`+t.repeat(" ",_.indent*b)}function $t(_,b){for(let P=0,C=_.implicitTypes.length;P<C;P+=1)if(_.implicitTypes[P].resolve(b))return!0;return!1}function Ae(_){return _===u||_===c}function we(_){return _>=32&&_<=126||_>=161&&_<=55295&&_!==8232&&_!==8233||_>=57344&&_<=65533&&_!==l||_>=65536&&_<=1114111}function Ve(_){return we(_)&&_!==l&&_!==h&&_!==d}function Re(_,b,P){const C=Ve(_),$=C&&!Ae(_);return(P?C:C&&_!==D&&_!==X&&_!==U&&_!==J&&_!==ne)&&_!==g&&!(b===G&&!$)||Ve(b)&&!Ae(b)&&_===g||b===G&&$}function he(_){return we(_)&&_!==l&&!Ae(_)&&_!==F&&_!==te&&_!==G&&_!==D&&_!==X&&_!==U&&_!==J&&_!==ne&&_!==g&&_!==w&&_!==O&&_!==m&&_!==ae&&_!==Q&&_!==B&&_!==A&&_!==f&&_!==v&&_!==Z&&_!==ie}function ot(_){return!Ae(_)&&_!==G}function Le(_,b){const P=_.charCodeAt(b);let C;return P>=55296&&P<=56319&&b+1<_.length&&(C=_.charCodeAt(b+1),C>=56320&&C<=57343)?(P-55296)*1024+C-56320+65536:P}function ft(_){return/^\n* /.test(_)}var Ye=1,gt=2,Ct=3,yt=4,pe=5;function It(_,b,P,C,$,z,M,N){let q,V=0,H=null,ee=!1,de=!1;const wi=C!==-1;let le=-1,tt=he(Le(_,0))&&ot(Le(_,_.length-1));if(b||M)for(q=0;q<_.length;V>=65536?q+=2:q++){if(V=Le(_,q),!we(V))return pe;tt=tt&&Re(V,H,N),H=V}else{for(q=0;q<_.length;V>=65536?q+=2:q++){if(V=Le(_,q),V===d)ee=!0,wi&&(de=de||q-le-1>C&&_[le+1]!==" ",le=q);else if(!we(V))return pe;tt=tt&&Re(V,H,N),H=V}de=de||wi&&q-le-1>C&&_[le+1]!==" "}return!ee&&!de?tt&&!M&&!$(_)?Ye:z===Be?pe:gt:P>9&&ft(_)?pe:M?z===Be?pe:gt:de?yt:Ct}function Wt(_,b,P,C,$){_.dump=(function(){if(b.length===0)return _.quotingType===Be?'""':"''";if(!_.noCompatMode&&(xe.indexOf(b)!==-1||L.test(b)))return _.quotingType===Be?'"'+b+'"':"'"+b+"'";const z=_.indent*Math.max(1,P),M=_.lineWidth===-1?-1:Math.max(Math.min(_.lineWidth,40),_.lineWidth-z),N=C||_.flowLevel>-1&&P>=_.flowLevel;function q(V){return $t(_,V)}switch(It(b,N,_.indent,M,q,_.quotingType,_.forceQuotes&&!C,$)){case Ye:return b;case gt:return"'"+b.replace(/'/g,"''")+"'";case Ct:return"|"+Ze(b,_.indent)+Tt(mt(b,z));case yt:return">"+Ze(b,_.indent)+Tt(mt(Yt(b,M),z));case pe:return'"'+Zt(b)+'"';default:throw new i("impossible error: invalid scalar style")}})()}function Ze(_,b){const P=ft(_)?String(b):"",C=_[_.length-1]===`
`;return P+(C&&(_[_.length-2]===`
`||_===`
`)?"+":C?"":"-")+`
`}function Tt(_){return _[_.length-1]===`
`?_.slice(0,-1):_}function Yt(_,b){const P=/(\n+)([^\n]*)/g;let C=(function(){let N=_.indexOf(`
`);return N=N!==-1?N:_.length,P.lastIndex=N,ke(_.slice(0,N),b)})(),$=_[0]===`
`||_[0]===" ",z,M;for(;M=P.exec(_);){const N=M[1],q=M[2];z=q[0]===" ",C+=N+(!$&&!z&&q!==""?`
`:"")+ke(q,b),$=z}return C}function ke(_,b){if(_===""||_[0]===" ")return _;const P=/ [^ ]/g;let C,$=0,z,M=0,N=0,q="";for(;C=P.exec(_);)N=C.index,N-$>b&&(z=M>$?M:N,q+=`
`+_.slice($,z),$=z+1),M=N;return q+=`
`,_.length-$>b&&M>$?q+=_.slice($,M)+`
`+_.slice(M+1):q+=_.slice($),q.slice(1)}function Zt(_){let b="",P=0;for(let C=0;C<_.length;P>=65536?C+=2:C++){P=Le(_,C);const $=oe[P];!$&&we(P)?(b+=_[C],P>=65536&&(b+=_[C+1])):b+=$||ye(P)}return b}function Mt(_,b,P){let C="";const $=_.tag;for(let z=0,M=P.length;z<M;z+=1){let N=P[z];_.replacer&&(N=_.replacer.call(P,String(z),N)),(S(_,b,N,!1,!1)||typeof N>"u"&&S(_,b,null,!1,!1))&&(C!==""&&(C+=","+(_.condenseFlow?"":" ")),C+=_.dump)}_.tag=$,_.dump="["+C+"]"}function Ke(_,b,P,C){let $="";const z=_.tag;for(let M=0,N=P.length;M<N;M+=1){let q=P[M];_.replacer&&(q=_.replacer.call(P,String(M),q)),(S(_,b+1,q,!0,!0,!1,!0)||typeof q>"u"&&S(_,b+1,null,!0,!0,!1,!0))&&((!C||$!=="")&&($+=Te(_,b)),_.dump&&d===_.dump.charCodeAt(0)?$+="-":$+="- ",$+=_.dump)}_.tag=z,_.dump=$||"[]"}function et(_,b,P){let C="";const $=_.tag,z=Object.keys(P);for(let M=0,N=z.length;M<N;M+=1){let q="";C!==""&&(q+=", "),_.condenseFlow&&(q+='"');const V=z[M];let H=P[V];_.replacer&&(H=_.replacer.call(P,V,H)),S(_,b,V,!1,!1)&&(_.dump.length>1024&&(q+="? "),q+=_.dump+(_.condenseFlow?'"':"")+":"+(_.condenseFlow?"":" "),S(_,b,H,!1,!1)&&(q+=_.dump,C+=q))}_.tag=$,_.dump="{"+C+"}"}function o(_,b,P,C){let $="";const z=_.tag,M=Object.keys(P);if(_.sortKeys===!0)M.sort();else if(typeof _.sortKeys=="function")M.sort(_.sortKeys);else if(_.sortKeys)throw new i("sortKeys must be a boolean or a function");for(let N=0,q=M.length;N<q;N+=1){let V="";(!C||$!=="")&&(V+=Te(_,b));const H=M[N];let ee=P[H];if(_.replacer&&(ee=_.replacer.call(P,H,ee)),!S(_,b+1,H,!0,!0,!0))continue;const de=_.tag!==null&&_.tag!=="?"||_.dump&&_.dump.length>1024;de&&(_.dump&&d===_.dump.charCodeAt(0)?V+="?":V+="? "),V+=_.dump,de&&(V+=Te(_,b)),S(_,b+1,ee,!0,de)&&(_.dump&&d===_.dump.charCodeAt(0)?V+=":":V+=": ",V+=_.dump,$+=V)}_.tag=z,_.dump=$||"{}"}function x(_,b,P){const C=P?_.explicitTypes:_.implicitTypes;for(let $=0,z=C.length;$<z;$+=1){const M=C[$];if((M.instanceOf||M.predicate)&&(!M.instanceOf||typeof b=="object"&&b instanceof M.instanceOf)&&(!M.predicate||M.predicate(b))){if(P?M.multi&&M.representName?_.tag=M.representName(b):_.tag=M.tag:_.tag="?",M.represent){const N=_.styleMap[M.tag]||M.defaultStyle;let q;if(s.call(M.represent)==="[object Function]")q=M.represent(b,N);else if(n.call(M.represent,N))q=M.represent[N](b,N);else throw new i("!<"+M.tag+'> tag resolver accepts not "'+N+'" style');_.dump=q}return!0}}return!1}function S(_,b,P,C,$,z,M){_.tag=null,_.dump=P,x(_,P,!1)||x(_,P,!0);const N=s.call(_.dump),q=C;C&&(C=_.flowLevel<0||_.flowLevel>b);const V=N==="[object Object]"||N==="[object Array]";let H,ee;if(V&&(H=_.duplicates.indexOf(P),ee=H!==-1),(_.tag!==null&&_.tag!=="?"||ee||_.indent!==2&&b>0)&&($=!1),ee&&_.usedDuplicates[H])_.dump="*ref_"+H;else{if(V&&ee&&!_.usedDuplicates[H]&&(_.usedDuplicates[H]=!0),N==="[object Object]")C&&Object.keys(_.dump).length!==0?(o(_,b,_.dump,$),ee&&(_.dump="&ref_"+H+_.dump)):(et(_,b,_.dump),ee&&(_.dump="&ref_"+H+" "+_.dump));else if(N==="[object Array]")C&&_.dump.length!==0?(_.noArrayIndent&&!M&&b>0?Ke(_,b-1,_.dump,$):Ke(_,b,_.dump,$),ee&&(_.dump="&ref_"+H+_.dump)):(Mt(_,b,_.dump),ee&&(_.dump="&ref_"+H+" "+_.dump));else if(N==="[object String]")_.tag!=="?"&&Wt(_,_.dump,b,z,q);else{if(N==="[object Undefined]")return!1;if(_.skipInvalid)return!1;throw new i("unacceptable kind of an object to dump "+N)}if(_.tag!==null&&_.tag!=="?"){let de=encodeURI(_.tag[0]==="!"?_.tag.slice(1):_.tag).replace(/!/g,"%21");_.tag[0]==="!"?de="!"+de:de.slice(0,18)==="tag:yaml.org,2002:"?de="!!"+de.slice(18):de="!<"+de+">",_.dump=de+" "+_.dump}}return!0}function T(_,b){const P=[],C=[];E(_,P,C);const $=C.length;for(let z=0;z<$;z+=1)b.duplicates.push(P[C[z]]);b.usedDuplicates=new Array($)}function E(_,b,P){if(_!==null&&typeof _=="object"){const C=b.indexOf(_);if(C!==-1)P.indexOf(C)===-1&&P.push(C);else if(b.push(_),Array.isArray(_))for(let $=0,z=_.length;$<z;$+=1)E(_[$],b,P);else{const $=Object.keys(_);for(let z=0,M=$.length;z<M;z+=1)E(_[$[z]],b,P)}}}function j(_,b){b=b||{};const P=new Ge(b);P.noRefs||T(_,P);let C=_;return P.replacer&&(C=P.replacer.call({"":C},"",C)),S(P,0,C,!0,!0)?P.dump+`
`:""}e.exports.dump=j})),vr=Zo(ue(((r,e)=>{var t=Xo(),i=Jo();function a(s,n){return function(){throw new Error("Function yaml."+s+" is removed in js-yaml 4. Use yaml."+n+" instead, which is now safe by default.")}}e.exports.Type=Pe(),e.exports.Schema=ir(),e.exports.FAILSAFE_SCHEMA=nr(),e.exports.JSON_SCHEMA=ur(),e.exports.CORE_SCHEMA=hr(),e.exports.DEFAULT_SCHEMA=Ca(),e.exports.load=t.load,e.exports.loadAll=t.loadAll,e.exports.dump=i.dump,e.exports.YAMLException=di(),e.exports.types={binary:mr(),float:dr(),map:rr(),null:or(),pairs:gr(),set:yr(),timestamp:pr(),bool:lr(),int:cr(),merge:_r(),omap:fr(),seq:sr(),str:ar()},e.exports.safeLoad=a("safeLoad","load"),e.exports.safeLoadAll=a("safeLoadAll","loadAll"),e.exports.safeDump=a("safeDump","dump")}))()),{Type:Xl,Schema:Jl,FAILSAFE_SCHEMA:ec,JSON_SCHEMA:tc,CORE_SCHEMA:ic,DEFAULT_SCHEMA:ac,load:sc,loadAll:rc,dump:nc,YAMLException:oc,types:lc,safeLoad:cc,safeLoadAll:dc,safeDump:uc}=vr.default,Lt=vr.default;/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */function el(r,e,t){return(e=sl(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function at(){return at=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)({}).hasOwnProperty.call(t,i)&&(r[i]=t[i])}return r},at.apply(null,arguments)}function br(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(r);e&&(i=i.filter(function(a){return Object.getOwnPropertyDescriptor(r,a).enumerable})),t.push.apply(t,i)}return t}function Xe(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?br(Object(t),!0).forEach(function(i){el(r,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):br(Object(t)).forEach(function(i){Object.defineProperty(r,i,Object.getOwnPropertyDescriptor(t,i))})}return r}function tl(r,e){if(r==null)return{};var t,i,a=il(r,e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(r);for(i=0;i<s.length;i++)t=s[i],e.indexOf(t)===-1&&{}.propertyIsEnumerable.call(r,t)&&(a[t]=r[t])}return a}function il(r,e){if(r==null)return{};var t={};for(var i in r)if({}.hasOwnProperty.call(r,i)){if(e.indexOf(i)!==-1)continue;t[i]=r[i]}return t}function al(r,e){if(typeof r!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var i=t.call(r,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function sl(r){var e=al(r,"string");return typeof e=="symbol"?e:e+""}function Ia(r){"@babel/helpers - typeof";return Ia=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ia(r)}var rl="1.15.7";function st(r){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(r)}var rt=st(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),ui=st(/Edge/i),xr=st(/firefox/i),hi=st(/safari/i)&&!st(/chrome/i)&&!st(/android/i),Ta=st(/iP(ad|od|hone)/i),wr=st(/chrome/i)&&st(/android/i),kr={capture:!1,passive:!1};function re(r,e,t){r.addEventListener(e,t,!rt&&kr)}function se(r,e,t){r.removeEventListener(e,t,!rt&&kr)}function qi(r,e){if(e){if(e[0]===">"&&(e=e.substring(1)),r)try{if(r.matches)return r.matches(e);if(r.msMatchesSelector)return r.msMatchesSelector(e);if(r.webkitMatchesSelector)return r.webkitMatchesSelector(e)}catch{return!1}return!1}}function Er(r){return r.host&&r!==document&&r.host.nodeType&&r.host!==r?r.host:r.parentNode}function Qe(r,e,t,i){if(r){t=t||document;do{if(e!=null&&(e[0]===">"?r.parentNode===t&&qi(r,e):qi(r,e))||i&&r===t)return r;if(r===t)break}while(r=Er(r))}return null}var Sr=/\s+/g;function qe(r,e,t){if(r&&e)if(r.classList)r.classList[t?"add":"remove"](e);else{var i=(" "+r.className+" ").replace(Sr," ").replace(" "+e+" "," ");r.className=(i+(t?" "+e:"")).replace(Sr," ")}}function W(r,e,t){var i=r&&r.style;if(i){if(t===void 0)return document.defaultView&&document.defaultView.getComputedStyle?t=document.defaultView.getComputedStyle(r,""):r.currentStyle&&(t=r.currentStyle),e===void 0?t:t[e];!(e in i)&&e.indexOf("webkit")===-1&&(e="-webkit-"+e),i[e]=t+(typeof t=="string"?"":"px")}}function qt(r,e){var t="";if(typeof r=="string")t=r;else do{var i=W(r,"transform");i&&i!=="none"&&(t=i+" "+t)}while(!e&&(r=r.parentNode));var a=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return a&&new a(t)}function Ar(r,e,t){if(r){var i=r.getElementsByTagName(e),a=0,s=i.length;if(t)for(;a<s;a++)t(i[a],a);return i}return[]}function Je(){var r=document.scrollingElement;return r||document.documentElement}function ve(r,e,t,i,a){if(!(!r.getBoundingClientRect&&r!==window)){var s,n,l,c,d,h,u;if(r!==window&&r.parentNode&&r!==Je()?(s=r.getBoundingClientRect(),n=s.top,l=s.left,c=s.bottom,d=s.right,h=s.height,u=s.width):(n=0,l=0,c=window.innerHeight,d=window.innerWidth,h=window.innerHeight,u=window.innerWidth),(e||t)&&r!==window&&(a=a||r.parentNode,!rt))do if(a&&a.getBoundingClientRect&&(W(a,"transform")!=="none"||t&&W(a,"position")!=="static")){var m=a.getBoundingClientRect();n-=m.top+parseInt(W(a,"border-top-width")),l-=m.left+parseInt(W(a,"border-left-width")),c=n+s.height,d=l+s.width;break}while(a=a.parentNode);if(i&&r!==window){var f=qt(a||r),g=f&&f.a,v=f&&f.d;f&&(n/=v,l/=g,u/=g,h/=v,c=n+h,d=l+u)}return{top:n,left:l,bottom:c,right:d,width:u,height:h}}}function $r(r,e,t){for(var i=ht(r,!0),a=ve(r)[e];i;){var s=ve(i)[t],n=void 0;if(n=a>=s,!n)return i;if(i===Je())break;i=ht(i,!1)}return!1}function Nt(r,e,t,i){for(var a=0,s=0,n=r.children;s<n.length;){if(n[s].style.display!=="none"&&n[s]!==Y.ghost&&(i||n[s]!==Y.dragged)&&Qe(n[s],t.draggable,r,!1)){if(a===e)return n[s];a++}s++}return null}function Ma(r,e){for(var t=r.lastElementChild;t&&(t===Y.ghost||W(t,"display")==="none"||e&&!qi(t,e));)t=t.previousElementSibling;return t||null}function He(r,e){var t=0;if(!r||!r.parentNode)return-1;for(;r=r.previousElementSibling;)r.nodeName.toUpperCase()!=="TEMPLATE"&&r!==Y.clone&&(!e||qi(r,e))&&t++;return t}function Cr(r){var e=0,t=0,i=Je();if(r)do{var a=qt(r),s=a.a,n=a.d;e+=r.scrollLeft*s,t+=r.scrollTop*n}while(r!==i&&(r=r.parentNode));return[e,t]}function nl(r,e){for(var t in r)if(r.hasOwnProperty(t)){for(var i in e)if(e.hasOwnProperty(i)&&e[i]===r[t][i])return Number(t)}return-1}function ht(r,e){if(!r||!r.getBoundingClientRect)return Je();var t=r,i=!1;do if(t.clientWidth<t.scrollWidth||t.clientHeight<t.scrollHeight){var a=W(t);if(t.clientWidth<t.scrollWidth&&(a.overflowX=="auto"||a.overflowX=="scroll")||t.clientHeight<t.scrollHeight&&(a.overflowY=="auto"||a.overflowY=="scroll")){if(!t.getBoundingClientRect||t===document.body)return Je();if(i||e)return t;i=!0}}while(t=t.parentNode);return Je()}function ol(r,e){if(r&&e)for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t]);return r}function Pa(r,e){return Math.round(r.top)===Math.round(e.top)&&Math.round(r.left)===Math.round(e.left)&&Math.round(r.height)===Math.round(e.height)&&Math.round(r.width)===Math.round(e.width)}var pi;function Ir(r,e){return function(){if(!pi){var t=arguments,i=this;t.length===1?r.call(i,t[0]):r.apply(i,t),pi=setTimeout(function(){pi=void 0},e)}}}function ll(){clearTimeout(pi),pi=void 0}function Tr(r,e,t){r.scrollLeft+=e,r.scrollTop+=t}function Mr(r){var e=window.Polymer,t=window.jQuery||window.Zepto;return e&&e.dom?e.dom(r).cloneNode(!0):t?t(r).clone(!0)[0]:r.cloneNode(!0)}function Pr(r,e,t){var i={};return Array.from(r.children).forEach(function(a){var s,n,l,c;if(!(!Qe(a,e.draggable,r,!1)||a.animated||a===t)){var d=ve(a);i.left=Math.min((s=i.left)!==null&&s!==void 0?s:1/0,d.left),i.top=Math.min((n=i.top)!==null&&n!==void 0?n:1/0,d.top),i.right=Math.max((l=i.right)!==null&&l!==void 0?l:-1/0,d.right),i.bottom=Math.max((c=i.bottom)!==null&&c!==void 0?c:-1/0,d.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var Fe="Sortable"+new Date().getTime();function cl(){var r=[],e;return{captureAnimationState:function(){if(r=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(a){if(!(W(a,"display")==="none"||a===Y.ghost)){r.push({target:a,rect:ve(a)});var s=Xe({},r[r.length-1].rect);if(a.thisAnimationDuration){var n=qt(a,!0);n&&(s.top-=n.f,s.left-=n.e)}a.fromRect=s}})}},addAnimationState:function(i){r.push(i)},removeAnimationState:function(i){r.splice(nl(r,{target:i}),1)},animateAll:function(i){var a=this;if(!this.options.animation){clearTimeout(e),typeof i=="function"&&i();return}var s=!1,n=0;r.forEach(function(l){var c=0,d=l.target,h=d.fromRect,u=ve(d),m=d.prevFromRect,f=d.prevToRect,g=l.rect,v=qt(d,!0);v&&(u.top-=v.f,u.left-=v.e),d.toRect=u,d.thisAnimationDuration&&Pa(m,u)&&!Pa(h,u)&&(g.top-u.top)/(g.left-u.left)===(h.top-u.top)/(h.left-u.left)&&(c=ul(g,m,f,a.options)),Pa(u,h)||(d.prevFromRect=h,d.prevToRect=u,c||(c=a.options.animation),a.animate(d,g,u,c)),c&&(s=!0,n=Math.max(n,c),clearTimeout(d.animationResetTimer),d.animationResetTimer=setTimeout(function(){d.animationTime=0,d.prevFromRect=null,d.fromRect=null,d.prevToRect=null,d.thisAnimationDuration=null},c),d.thisAnimationDuration=c)}),clearTimeout(e),s?e=setTimeout(function(){typeof i=="function"&&i()},n):typeof i=="function"&&i(),r=[]},animate:function(i,a,s,n){if(n){W(i,"transition",""),W(i,"transform","");var l=qt(this.el),c=l&&l.a,d=l&&l.d,h=(a.left-s.left)/(c||1),u=(a.top-s.top)/(d||1);i.animatingX=!!h,i.animatingY=!!u,W(i,"transform","translate3d("+h+"px,"+u+"px,0)"),this.forRepaintDummy=dl(i),W(i,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),W(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){W(i,"transition",""),W(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},n)}}}}function dl(r){return r.offsetWidth}function ul(r,e,t,i){return Math.sqrt(Math.pow(e.top-r.top,2)+Math.pow(e.left-r.left,2))/Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))*i.animation}var Vt=[],za={initializeByDefault:!0},_i={mount:function(e){for(var t in za)za.hasOwnProperty(t)&&!(t in e)&&(e[t]=za[t]);Vt.forEach(function(i){if(i.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),Vt.push(e)},pluginEvent:function(e,t,i){var a=this;this.eventCanceled=!1,i.cancel=function(){a.eventCanceled=!0};var s=e+"Global";Vt.forEach(function(n){t[n.pluginName]&&(t[n.pluginName][s]&&t[n.pluginName][s](Xe({sortable:t},i)),t.options[n.pluginName]&&t[n.pluginName][e]&&t[n.pluginName][e](Xe({sortable:t},i)))})},initializePlugins:function(e,t,i,a){Vt.forEach(function(l){var c=l.pluginName;if(!(!e.options[c]&&!l.initializeByDefault)){var d=new l(e,t,e.options);d.sortable=e,d.options=e.options,e[c]=d,at(i,d.defaults)}});for(var s in e.options)if(e.options.hasOwnProperty(s)){var n=this.modifyOption(e,s,e.options[s]);typeof n<"u"&&(e.options[s]=n)}},getEventProperties:function(e,t){var i={};return Vt.forEach(function(a){typeof a.eventProperties=="function"&&at(i,a.eventProperties.call(t[a.pluginName],e))}),i},modifyOption:function(e,t,i){var a;return Vt.forEach(function(s){e[s.pluginName]&&s.optionListeners&&typeof s.optionListeners[t]=="function"&&(a=s.optionListeners[t].call(e[s.pluginName],i))}),a}};function hl(r){var e=r.sortable,t=r.rootEl,i=r.name,a=r.targetEl,s=r.cloneEl,n=r.toEl,l=r.fromEl,c=r.oldIndex,d=r.newIndex,h=r.oldDraggableIndex,u=r.newDraggableIndex,m=r.originalEvent,f=r.putSortable,g=r.extraEventProperties;if(e=e||t&&t[Fe],!!e){var v,w=e.options,A="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!rt&&!ui?v=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(v=document.createEvent("Event"),v.initEvent(i,!0,!0)),v.to=n||t,v.from=l||t,v.item=a||t,v.clone=s,v.oldIndex=c,v.newIndex=d,v.oldDraggableIndex=h,v.newDraggableIndex=u,v.originalEvent=m,v.pullMode=f?f.lastPutMode:void 0;var O=Xe(Xe({},g),_i.getEventProperties(i,e));for(var D in O)v[D]=O[D];t&&t.dispatchEvent(v),w[A]&&w[A].call(e,v)}}var pl=["evt"],Oe=function(e,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=i.evt,s=tl(i,pl);_i.pluginEvent.bind(Y)(e,t,Xe({dragEl:R,parentEl:fe,ghostEl:K,rootEl:_e,nextEl:Et,lastDownEl:Ni,cloneEl:me,cloneHidden:pt,dragStarted:fi,putSortable:Ee,activeSortable:Y.active,originalEvent:a,oldIndex:Ut,oldDraggableIndex:mi,newIndex:Ne,newDraggableIndex:_t,hideGhostForTarget:Lr,unhideGhostForTarget:qr,cloneNowHidden:function(){pt=!0},cloneNowShown:function(){pt=!1},dispatchSortableEvent:function(l){ze({sortable:t,name:l,originalEvent:a})}},s))};function ze(r){hl(Xe({putSortable:Ee,cloneEl:me,targetEl:R,rootEl:_e,oldIndex:Ut,oldDraggableIndex:mi,newIndex:Ne,newDraggableIndex:_t},r))}var R,fe,K,_e,Et,Ni,me,pt,Ut,Ne,mi,_t,Vi,Ee,Ht=!1,Ui=!1,Hi=[],St,We,ja,Da,zr,jr,fi,Bt,gi,yi=!1,Bi=!1,Gi,Ie,Fa=[],Oa=!1,Qi=[],Wi=typeof document<"u",Yi=Ta,Dr=ui||rt?"cssFloat":"float",_l=Wi&&!wr&&!Ta&&"draggable"in document.createElement("div"),Fr=(function(){if(Wi){if(rt)return!1;var r=document.createElement("x");return r.style.cssText="pointer-events:auto",r.style.pointerEvents==="auto"}})(),Or=function(e,t){var i=W(e),a=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),s=Nt(e,0,t),n=Nt(e,1,t),l=s&&W(s),c=n&&W(n),d=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+ve(s).width,h=c&&parseInt(c.marginLeft)+parseInt(c.marginRight)+ve(n).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(s&&l.float&&l.float!=="none"){var u=l.float==="left"?"left":"right";return n&&(c.clear==="both"||c.clear===u)?"vertical":"horizontal"}return s&&(l.display==="block"||l.display==="flex"||l.display==="table"||l.display==="grid"||d>=a&&i[Dr]==="none"||n&&i[Dr]==="none"&&d+h>a)?"vertical":"horizontal"},ml=function(e,t,i){var a=i?e.left:e.top,s=i?e.right:e.bottom,n=i?e.width:e.height,l=i?t.left:t.top,c=i?t.right:t.bottom,d=i?t.width:t.height;return a===l||s===c||a+n/2===l+d/2},fl=function(e,t){var i;return Hi.some(function(a){var s=a[Fe].options.emptyInsertThreshold;if(!(!s||Ma(a))){var n=ve(a),l=e>=n.left-s&&e<=n.right+s,c=t>=n.top-s&&t<=n.bottom+s;if(l&&c)return i=a}}),i},Rr=function(e){function t(s,n){return function(l,c,d,h){var u=l.options.group.name&&c.options.group.name&&l.options.group.name===c.options.group.name;if(s==null&&(n||u))return!0;if(s==null||s===!1)return!1;if(n&&s==="clone")return s;if(typeof s=="function")return t(s(l,c,d,h),n)(l,c,d,h);var m=(n?l:c).options.group.name;return s===!0||typeof s=="string"&&s===m||s.join&&s.indexOf(m)>-1}}var i={},a=e.group;(!a||Ia(a)!="object")&&(a={name:a}),i.name=a.name,i.checkPull=t(a.pull,!0),i.checkPut=t(a.put),i.revertClone=a.revertClone,e.group=i},Lr=function(){!Fr&&K&&W(K,"display","none")},qr=function(){!Fr&&K&&W(K,"display","")};Wi&&!wr&&document.addEventListener("click",function(r){if(Ui)return r.preventDefault(),r.stopPropagation&&r.stopPropagation(),r.stopImmediatePropagation&&r.stopImmediatePropagation(),Ui=!1,!1},!0);var At=function(e){if(R){e=e.touches?e.touches[0]:e;var t=fl(e.clientX,e.clientY);if(t){var i={};for(var a in e)e.hasOwnProperty(a)&&(i[a]=e[a]);i.target=i.rootEl=t,i.preventDefault=void 0,i.stopPropagation=void 0,t[Fe]._onDragOver(i)}}},gl=function(e){R&&R.parentNode[Fe]._isOutsideThisEl(e.target)};function Y(r,e){if(!(r&&r.nodeType&&r.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(r));this.el=r,this.options=e=at({},e),r[Fe]=this;var t={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(r.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Or(r,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(n,l){n.setData("Text",l.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:Y.supportPointer!==!1&&"PointerEvent"in window&&(!hi||Ta),emptyInsertThreshold:5};_i.initializePlugins(this,r,t);for(var i in t)!(i in e)&&(e[i]=t[i]);Rr(e);for(var a in this)a.charAt(0)==="_"&&typeof this[a]=="function"&&(this[a]=this[a].bind(this));this.nativeDraggable=e.forceFallback?!1:_l,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?re(r,"pointerdown",this._onTapStart):(re(r,"mousedown",this._onTapStart),re(r,"touchstart",this._onTapStart)),this.nativeDraggable&&(re(r,"dragover",this),re(r,"dragenter",this)),Hi.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),at(this,cl())}Y.prototype={constructor:Y,_isOutsideThisEl:function(e){!this.el.contains(e)&&e!==this.el&&(Bt=null)},_getDirection:function(e,t){return typeof this.options.direction=="function"?this.options.direction.call(this,e,t,R):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,i=this.el,a=this.options,s=a.preventOnFilter,n=e.type,l=e.touches&&e.touches[0]||e.pointerType&&e.pointerType==="touch"&&e,c=(l||e).target,d=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||c,h=a.filter;if(Sl(i),!R&&!(/mousedown|pointerdown/.test(n)&&e.button!==0||a.disabled)&&!d.isContentEditable&&!(!this.nativeDraggable&&hi&&c&&c.tagName.toUpperCase()==="SELECT")&&(c=Qe(c,a.draggable,i,!1),!(c&&c.animated)&&Ni!==c)){if(Ut=He(c),mi=He(c,a.draggable),typeof h=="function"){if(h.call(this,e,c,this)){ze({sortable:t,rootEl:d,name:"filter",targetEl:c,toEl:i,fromEl:i}),Oe("filter",t,{evt:e}),s&&e.preventDefault();return}}else if(h&&(h=h.split(",").some(function(u){if(u=Qe(d,u.trim(),i,!1),u)return ze({sortable:t,rootEl:u,name:"filter",targetEl:c,fromEl:i,toEl:i}),Oe("filter",t,{evt:e}),!0}),h)){s&&e.preventDefault();return}a.handle&&!Qe(d,a.handle,i,!1)||this._prepareDragStart(e,l,c)}}},_prepareDragStart:function(e,t,i){var a=this,s=a.el,n=a.options,l=s.ownerDocument,c;if(i&&!R&&i.parentNode===s){var d=ve(i);if(_e=s,R=i,fe=R.parentNode,Et=R.nextSibling,Ni=i,Vi=n.group,Y.dragged=R,St={target:R,clientX:(t||e).clientX,clientY:(t||e).clientY},zr=St.clientX-d.left,jr=St.clientY-d.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,R.style["will-change"]="all",c=function(){if(Oe("delayEnded",a,{evt:e}),Y.eventCanceled){a._onDrop();return}a._disableDelayedDragEvents(),!xr&&a.nativeDraggable&&(R.draggable=!0),a._triggerDragStart(e,t),ze({sortable:a,name:"choose",originalEvent:e}),qe(R,n.chosenClass,!0)},n.ignore.split(",").forEach(function(h){Ar(R,h.trim(),Ra)}),re(l,"dragover",At),re(l,"mousemove",At),re(l,"touchmove",At),n.supportPointer?(re(l,"pointerup",a._onDrop),!this.nativeDraggable&&re(l,"pointercancel",a._onDrop)):(re(l,"mouseup",a._onDrop),re(l,"touchend",a._onDrop),re(l,"touchcancel",a._onDrop)),xr&&this.nativeDraggable&&(this.options.touchStartThreshold=4,R.draggable=!0),Oe("delayStart",this,{evt:e}),n.delay&&(!n.delayOnTouchOnly||t)&&(!this.nativeDraggable||!(ui||rt))){if(Y.eventCanceled){this._onDrop();return}n.supportPointer?(re(l,"pointerup",a._disableDelayedDrag),re(l,"pointercancel",a._disableDelayedDrag)):(re(l,"mouseup",a._disableDelayedDrag),re(l,"touchend",a._disableDelayedDrag),re(l,"touchcancel",a._disableDelayedDrag)),re(l,"mousemove",a._delayedDragTouchMoveHandler),re(l,"touchmove",a._delayedDragTouchMoveHandler),n.supportPointer&&re(l,"pointermove",a._delayedDragTouchMoveHandler),a._dragStartTimer=setTimeout(c,n.delay)}else c()}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){R&&Ra(R),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;se(e,"mouseup",this._disableDelayedDrag),se(e,"touchend",this._disableDelayedDrag),se(e,"touchcancel",this._disableDelayedDrag),se(e,"pointerup",this._disableDelayedDrag),se(e,"pointercancel",this._disableDelayedDrag),se(e,"mousemove",this._delayedDragTouchMoveHandler),se(e,"touchmove",this._delayedDragTouchMoveHandler),se(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||e.pointerType=="touch"&&e,!this.nativeDraggable||t?this.options.supportPointer?re(document,"pointermove",this._onTouchMove):t?re(document,"touchmove",this._onTouchMove):re(document,"mousemove",this._onTouchMove):(re(R,"dragend",this),re(_e,"dragstart",this._onDragStart));try{document.selection?Ki(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(Ht=!1,_e&&R){Oe("dragStarted",this,{evt:t}),this.nativeDraggable&&re(document,"dragover",gl);var i=this.options;!e&&qe(R,i.dragClass,!1),qe(R,i.ghostClass,!0),Y.active=this,e&&this._appendGhost(),ze({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(We){this._lastX=We.clientX,this._lastY=We.clientY,Lr();for(var e=document.elementFromPoint(We.clientX,We.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(We.clientX,We.clientY),e!==t);)t=e;if(R.parentNode[Fe]._isOutsideThisEl(e),t)do{if(t[Fe]){var i=void 0;if(i=t[Fe]._onDragOver({clientX:We.clientX,clientY:We.clientY,target:e,rootEl:t}),i&&!this.options.dragoverBubble)break}e=t}while(t=Er(t));qr()}},_onTouchMove:function(e){if(St){var t=this.options,i=t.fallbackTolerance,a=t.fallbackOffset,s=e.touches?e.touches[0]:e,n=K&&qt(K,!0),l=K&&n&&n.a,c=K&&n&&n.d,d=Yi&&Ie&&Cr(Ie),h=(s.clientX-St.clientX+a.x)/(l||1)+(d?d[0]-Fa[0]:0)/(l||1),u=(s.clientY-St.clientY+a.y)/(c||1)+(d?d[1]-Fa[1]:0)/(c||1);if(!Y.active&&!Ht){if(i&&Math.max(Math.abs(s.clientX-this._lastX),Math.abs(s.clientY-this._lastY))<i)return;this._onDragStart(e,!0)}if(K){n?(n.e+=h-(ja||0),n.f+=u-(Da||0)):n={a:1,b:0,c:0,d:1,e:h,f:u};var m="matrix(".concat(n.a,",").concat(n.b,",").concat(n.c,",").concat(n.d,",").concat(n.e,",").concat(n.f,")");W(K,"webkitTransform",m),W(K,"mozTransform",m),W(K,"msTransform",m),W(K,"transform",m),ja=h,Da=u,We=s}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!K){var e=this.options.fallbackOnBody?document.body:_e,t=ve(R,!0,Yi,!0,e),i=this.options;if(Yi){for(Ie=e;W(Ie,"position")==="static"&&W(Ie,"transform")==="none"&&Ie!==document;)Ie=Ie.parentNode;Ie!==document.body&&Ie!==document.documentElement?(Ie===document&&(Ie=Je()),t.top+=Ie.scrollTop,t.left+=Ie.scrollLeft):Ie=Je(),Fa=Cr(Ie)}K=R.cloneNode(!0),qe(K,i.ghostClass,!1),qe(K,i.fallbackClass,!0),qe(K,i.dragClass,!0),W(K,"transition",""),W(K,"transform",""),W(K,"box-sizing","border-box"),W(K,"margin",0),W(K,"top",t.top),W(K,"left",t.left),W(K,"width",t.width),W(K,"height",t.height),W(K,"opacity","0.8"),W(K,"position",Yi?"absolute":"fixed"),W(K,"zIndex","100000"),W(K,"pointerEvents","none"),Y.ghost=K,e.appendChild(K),W(K,"transform-origin",zr/parseInt(K.style.width)*100+"% "+jr/parseInt(K.style.height)*100+"%")}},_onDragStart:function(e,t){var i=this,a=e.dataTransfer,s=i.options;if(Oe("dragStart",this,{evt:e}),Y.eventCanceled){this._onDrop();return}Oe("setupClone",this),Y.eventCanceled||(me=Mr(R),me.removeAttribute("id"),me.draggable=!1,me.style["will-change"]="",this._hideClone(),qe(me,this.options.chosenClass,!1),Y.clone=me),i.cloneId=Ki(function(){Oe("clone",i),!Y.eventCanceled&&(i.options.removeCloneOnHide||_e.insertBefore(me,R),i._hideClone(),ze({sortable:i,name:"clone"}))}),!t&&qe(R,s.dragClass,!0),t?(Ui=!0,i._loopId=setInterval(i._emulateDragOver,50)):(se(document,"mouseup",i._onDrop),se(document,"touchend",i._onDrop),se(document,"touchcancel",i._onDrop),a&&(a.effectAllowed="move",s.setData&&s.setData.call(i,a,R)),re(document,"drop",i),W(R,"transform","translateZ(0)")),Ht=!0,i._dragStartId=Ki(i._dragStarted.bind(i,t,e)),re(document,"selectstart",i),fi=!0,window.getSelection().removeAllRanges(),hi&&W(document.body,"user-select","none")},_onDragOver:function(e){var t=this.el,i=e.target,a,s,n,l=this.options,c=l.group,d=Y.active,h=Vi===c,u=l.sort,m=Ee||d,f,g=this,v=!1;if(Oa)return;function w(L,Se){Oe(L,g,Xe({evt:e,isOwner:h,axis:f?"vertical":"horizontal",revert:n,dragRect:a,targetRect:s,canSort:u,fromSortable:m,target:i,completed:O,onMove:function(je,Be){return Zi(_e,t,R,a,je,ve(je),e,Be)},changed:D},Se))}function A(){w("dragOverAnimationCapture"),g.captureAnimationState(),g!==m&&m.captureAnimationState()}function O(L){return w("dragOverCompleted",{insertion:L}),L&&(h?d._hideClone():d._showClone(g),g!==m&&(qe(R,Ee?Ee.options.ghostClass:d.options.ghostClass,!1),qe(R,l.ghostClass,!0)),Ee!==g&&g!==Y.active?Ee=g:g===Y.active&&Ee&&(Ee=null),m===g&&(g._ignoreWhileAnimating=i),g.animateAll(function(){w("dragOverAnimationComplete"),g._ignoreWhileAnimating=null}),g!==m&&(m.animateAll(),m._ignoreWhileAnimating=null)),(i===R&&!R.animated||i===t&&!i.animated)&&(Bt=null),!l.dragoverBubble&&!e.rootEl&&i!==document&&(R.parentNode[Fe]._isOutsideThisEl(e.target),!L&&At(e)),!l.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),v=!0}function D(){Ne=He(R),_t=He(R,l.draggable),ze({sortable:g,name:"change",toEl:t,newIndex:Ne,newDraggableIndex:_t,originalEvent:e})}if(e.preventDefault!==void 0&&e.cancelable&&e.preventDefault(),i=Qe(i,l.draggable,t,!0),w("dragOver"),Y.eventCanceled)return v;if(R.contains(e.target)||i.animated&&i.animatingX&&i.animatingY||g._ignoreWhileAnimating===i)return O(!1);if(Ui=!1,d&&!l.disabled&&(h?u||(n=fe!==_e):Ee===this||(this.lastPutMode=Vi.checkPull(this,d,R,e))&&c.checkPut(this,d,R,e))){if(f=this._getDirection(e,i)==="vertical",a=ve(R),w("dragOverValid"),Y.eventCanceled)return v;if(n)return fe=_e,A(),this._hideClone(),w("revert"),Y.eventCanceled||(Et?_e.insertBefore(R,Et):_e.appendChild(R)),O(!0);var F=Ma(t,l.draggable);if(!F||xl(e,f,this)&&!F.animated){if(F===R)return O(!1);if(F&&t===e.target&&(i=F),i&&(s=ve(i)),Zi(_e,t,R,a,i,s,e,!!i)!==!1)return A(),F&&F.nextSibling?t.insertBefore(R,F.nextSibling):t.appendChild(R),fe=t,D(),O(!0)}else if(F&&bl(e,f,this)){var G=Nt(t,0,l,!0);if(G===R)return O(!1);if(i=G,s=ve(i),Zi(_e,t,R,a,i,s,e,!1)!==!1)return A(),t.insertBefore(R,G),fe=t,D(),O(!0)}else if(i.parentNode===t){s=ve(i);var Q=0,B,te=R.parentNode!==t,Z=!ml(R.animated&&R.toRect||a,i.animated&&i.toRect||s,f),X=f?"top":"left",U=$r(i,"top","top")||$r(R,"top","top"),ie=U?U.scrollTop:void 0;Bt!==i&&(B=s[X],yi=!1,Bi=!Z&&l.invertSwap||te),Q=wl(e,i,s,f,Z?1:l.swapThreshold,l.invertedSwapThreshold==null?l.swapThreshold:l.invertedSwapThreshold,Bi,Bt===i);var J;if(Q!==0){var ae=He(R);do ae-=Q,J=fe.children[ae];while(J&&(W(J,"display")==="none"||J===K))}if(Q===0||J===i)return O(!1);Bt=i,gi=Q;var ne=i.nextElementSibling,oe=!1;oe=Q===1;var xe=Zi(_e,t,R,a,i,s,e,oe);if(xe!==!1)return(xe===1||xe===-1)&&(oe=xe===1),Oa=!0,setTimeout(vl,30),A(),oe&&!ne?t.appendChild(R):i.parentNode.insertBefore(R,oe?ne:i),U&&Tr(U,0,ie-U.scrollTop),fe=R.parentNode,B!==void 0&&!Bi&&(Gi=Math.abs(B-ve(i)[X])),D(),O(!0)}if(t.contains(R))return O(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){se(document,"mousemove",this._onTouchMove),se(document,"touchmove",this._onTouchMove),se(document,"pointermove",this._onTouchMove),se(document,"dragover",At),se(document,"mousemove",At),se(document,"touchmove",At)},_offUpEvents:function(){var e=this.el.ownerDocument;se(e,"mouseup",this._onDrop),se(e,"touchend",this._onDrop),se(e,"pointerup",this._onDrop),se(e,"pointercancel",this._onDrop),se(e,"touchcancel",this._onDrop),se(document,"selectstart",this)},_onDrop:function(e){var t=this.el,i=this.options;if(Ne=He(R),_t=He(R,i.draggable),Oe("drop",this,{evt:e}),fe=R&&R.parentNode,Ne=He(R),_t=He(R,i.draggable),Y.eventCanceled){this._nulling();return}Ht=!1,Bi=!1,yi=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),La(this.cloneId),La(this._dragStartId),this.nativeDraggable&&(se(document,"drop",this),se(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),hi&&W(document.body,"user-select",""),W(R,"transform",""),e&&(fi&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),K&&K.parentNode&&K.parentNode.removeChild(K),(_e===fe||Ee&&Ee.lastPutMode!=="clone")&&me&&me.parentNode&&me.parentNode.removeChild(me),R&&(this.nativeDraggable&&se(R,"dragend",this),Ra(R),R.style["will-change"]="",fi&&!Ht&&qe(R,Ee?Ee.options.ghostClass:this.options.ghostClass,!1),qe(R,this.options.chosenClass,!1),ze({sortable:this,name:"unchoose",toEl:fe,newIndex:null,newDraggableIndex:null,originalEvent:e}),_e!==fe?(Ne>=0&&(ze({rootEl:fe,name:"add",toEl:fe,fromEl:_e,originalEvent:e}),ze({sortable:this,name:"remove",toEl:fe,originalEvent:e}),ze({rootEl:fe,name:"sort",toEl:fe,fromEl:_e,originalEvent:e}),ze({sortable:this,name:"sort",toEl:fe,originalEvent:e})),Ee&&Ee.save()):Ne!==Ut&&Ne>=0&&(ze({sortable:this,name:"update",toEl:fe,originalEvent:e}),ze({sortable:this,name:"sort",toEl:fe,originalEvent:e})),Y.active&&((Ne==null||Ne===-1)&&(Ne=Ut,_t=mi),ze({sortable:this,name:"end",toEl:fe,originalEvent:e}),this.save()))),this._nulling()},_nulling:function(){Oe("nulling",this),_e=R=fe=K=Et=me=Ni=pt=St=We=fi=Ne=_t=Ut=mi=Bt=gi=Ee=Vi=Y.dragged=Y.ghost=Y.clone=Y.active=null;var e=this.el;Qi.forEach(function(t){e.contains(t)&&(t.checked=!0)}),Qi.length=ja=Da=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":R&&(this._onDragOver(e),yl(e));break;case"selectstart":e.preventDefault();break}},toArray:function(){for(var e=[],t,i=this.el.children,a=0,s=i.length,n=this.options;a<s;a++)t=i[a],Qe(t,n.draggable,this.el,!1)&&e.push(t.getAttribute(n.dataIdAttr)||El(t));return e},sort:function(e,t){var i={},a=this.el;this.toArray().forEach(function(s,n){var l=a.children[n];Qe(l,this.options.draggable,a,!1)&&(i[s]=l)},this),t&&this.captureAnimationState(),e.forEach(function(s){i[s]&&(a.removeChild(i[s]),a.appendChild(i[s]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return Qe(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var i=this.options;if(t===void 0)return i[e];var a=_i.modifyOption(this,e,t);typeof a<"u"?i[e]=a:i[e]=t,e==="group"&&Rr(i)},destroy:function(){Oe("destroy",this);var e=this.el;e[Fe]=null,se(e,"mousedown",this._onTapStart),se(e,"touchstart",this._onTapStart),se(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(se(e,"dragover",this),se(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Hi.splice(Hi.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!pt){if(Oe("hideClone",this),Y.eventCanceled)return;W(me,"display","none"),this.options.removeCloneOnHide&&me.parentNode&&me.parentNode.removeChild(me),pt=!0}},_showClone:function(e){if(e.lastPutMode!=="clone"){this._hideClone();return}if(pt){if(Oe("showClone",this),Y.eventCanceled)return;R.parentNode==_e&&!this.options.group.revertClone?_e.insertBefore(me,R):Et?_e.insertBefore(me,Et):_e.appendChild(me),this.options.group.revertClone&&this.animate(R,me),W(me,"display",""),pt=!1}}};function yl(r){r.dataTransfer&&(r.dataTransfer.dropEffect="move"),r.cancelable&&r.preventDefault()}function Zi(r,e,t,i,a,s,n,l){var c,d=r[Fe],h=d.options.onMove,u;return window.CustomEvent&&!rt&&!ui?c=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(c=document.createEvent("Event"),c.initEvent("move",!0,!0)),c.to=e,c.from=r,c.dragged=t,c.draggedRect=i,c.related=a||e,c.relatedRect=s||ve(e),c.willInsertAfter=l,c.originalEvent=n,r.dispatchEvent(c),h&&(u=h.call(d,c,n)),u}function Ra(r){r.draggable=!1}function vl(){Oa=!1}function bl(r,e,t){var i=ve(Nt(t.el,0,t.options,!0)),a=Pr(t.el,t.options,K),s=10;return e?r.clientX<a.left-s||r.clientY<i.top&&r.clientX<i.right:r.clientY<a.top-s||r.clientY<i.bottom&&r.clientX<i.left}function xl(r,e,t){var i=ve(Ma(t.el,t.options.draggable)),a=Pr(t.el,t.options,K),s=10;return e?r.clientX>a.right+s||r.clientY>i.bottom&&r.clientX>i.left:r.clientY>a.bottom+s||r.clientX>i.right&&r.clientY>i.top}function wl(r,e,t,i,a,s,n,l){var c=i?r.clientY:r.clientX,d=i?t.height:t.width,h=i?t.top:t.left,u=i?t.bottom:t.right,m=!1;if(!n){if(l&&Gi<d*a){if(!yi&&(gi===1?c>h+d*s/2:c<u-d*s/2)&&(yi=!0),yi)m=!0;else if(gi===1?c<h+Gi:c>u-Gi)return-gi}else if(c>h+d*(1-a)/2&&c<u-d*(1-a)/2)return kl(e)}return m=m||n,m&&(c<h+d*s/2||c>u-d*s/2)?c>h+d/2?1:-1:0}function kl(r){return He(R)<He(r)?1:-1}function El(r){for(var e=r.tagName+r.className+r.src+r.href+r.textContent,t=e.length,i=0;t--;)i+=e.charCodeAt(t);return i.toString(36)}function Sl(r){Qi.length=0;for(var e=r.getElementsByTagName("input"),t=e.length;t--;){var i=e[t];i.checked&&Qi.push(i)}}function Ki(r){return setTimeout(r,0)}function La(r){return clearTimeout(r)}Wi&&re(document,"touchmove",function(r){(Y.active||Ht)&&r.cancelable&&r.preventDefault()}),Y.utils={on:re,off:se,css:W,find:Ar,is:function(e,t){return!!Qe(e,t,e,!1)},extend:ol,throttle:Ir,closest:Qe,toggleClass:qe,clone:Mr,index:He,nextTick:Ki,cancelNextTick:La,detectDirection:Or,getChild:Nt,expando:Fe},Y.get=function(r){return r[Fe]},Y.mount=function(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];e[0].constructor===Array&&(e=e[0]),e.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(Y.utils=Xe(Xe({},Y.utils),i.utils)),_i.mount(i)})},Y.create=function(r,e){return new Y(r,e)},Y.version=rl;var be=[],vi,qa,Na=!1,Va,Ua,Xi,bi;function Al(){function r(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var e in this)e.charAt(0)==="_"&&typeof this[e]=="function"&&(this[e]=this[e].bind(this))}return r.prototype={dragStarted:function(t){var i=t.originalEvent;this.sortable.nativeDraggable?re(document,"dragover",this._handleAutoScroll):this.options.supportPointer?re(document,"pointermove",this._handleFallbackAutoScroll):i.touches?re(document,"touchmove",this._handleFallbackAutoScroll):re(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var i=t.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?se(document,"dragover",this._handleAutoScroll):(se(document,"pointermove",this._handleFallbackAutoScroll),se(document,"touchmove",this._handleFallbackAutoScroll),se(document,"mousemove",this._handleFallbackAutoScroll)),Nr(),Ji(),ll()},nulling:function(){Xi=qa=vi=Na=bi=Va=Ua=null,be.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,i){var a=this,s=(t.touches?t.touches[0]:t).clientX,n=(t.touches?t.touches[0]:t).clientY,l=document.elementFromPoint(s,n);if(Xi=t,i||this.options.forceAutoScrollFallback||ui||rt||hi){Ha(t,this.options,l,i);var c=ht(l,!0);Na&&(!bi||s!==Va||n!==Ua)&&(bi&&Nr(),bi=setInterval(function(){var d=ht(document.elementFromPoint(s,n),!0);d!==c&&(c=d,Ji()),Ha(t,a.options,d,i)},10),Va=s,Ua=n)}else{if(!this.options.bubbleScroll||ht(l,!0)===Je()){Ji();return}Ha(t,this.options,ht(l,!1),!1)}}},at(r,{pluginName:"scroll",initializeByDefault:!0})}function Ji(){be.forEach(function(r){clearInterval(r.pid)}),be=[]}function Nr(){clearInterval(bi)}var Ha=Ir(function(r,e,t,i){if(e.scroll){var a=(r.touches?r.touches[0]:r).clientX,s=(r.touches?r.touches[0]:r).clientY,n=e.scrollSensitivity,l=e.scrollSpeed,c=Je(),d=!1,h;qa!==t&&(qa=t,Ji(),vi=e.scroll,h=e.scrollFn,vi===!0&&(vi=ht(t,!0)));var u=0,m=vi;do{var f=m,g=ve(f),v=g.top,w=g.bottom,A=g.left,O=g.right,D=g.width,F=g.height,G=void 0,Q=void 0,B=f.scrollWidth,te=f.scrollHeight,Z=W(f),X=f.scrollLeft,U=f.scrollTop;f===c?(G=D<B&&(Z.overflowX==="auto"||Z.overflowX==="scroll"||Z.overflowX==="visible"),Q=F<te&&(Z.overflowY==="auto"||Z.overflowY==="scroll"||Z.overflowY==="visible")):(G=D<B&&(Z.overflowX==="auto"||Z.overflowX==="scroll"),Q=F<te&&(Z.overflowY==="auto"||Z.overflowY==="scroll"));var ie=G&&(Math.abs(O-a)<=n&&X+D<B)-(Math.abs(A-a)<=n&&!!X),J=Q&&(Math.abs(w-s)<=n&&U+F<te)-(Math.abs(v-s)<=n&&!!U);if(!be[u])for(var ae=0;ae<=u;ae++)be[ae]||(be[ae]={});(be[u].vx!=ie||be[u].vy!=J||be[u].el!==f)&&(be[u].el=f,be[u].vx=ie,be[u].vy=J,clearInterval(be[u].pid),(ie!=0||J!=0)&&(d=!0,be[u].pid=setInterval(function(){i&&this.layer===0&&Y.active._onTouchMove(Xi);var ne=be[this.layer].vy?be[this.layer].vy*l:0,oe=be[this.layer].vx?be[this.layer].vx*l:0;typeof h=="function"&&h.call(Y.dragged.parentNode[Fe],oe,ne,r,Xi,be[this.layer].el)!=="continue"||Tr(be[this.layer].el,oe,ne)}.bind({layer:u}),24))),u++}while(e.bubbleScroll&&m!==c&&(m=ht(m,!1)));Na=d}},30),Vr=function(e){var t=e.originalEvent,i=e.putSortable,a=e.dragEl,s=e.activeSortable,n=e.dispatchSortableEvent,l=e.hideGhostForTarget,c=e.unhideGhostForTarget;if(t){var d=i||s;l();var h=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,u=document.elementFromPoint(h.clientX,h.clientY);c(),d&&!d.el.contains(u)&&(n("spill"),this.onSpill({dragEl:a,putSortable:i}))}};function Ba(){}Ba.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,i=e.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var a=Nt(this.sortable.el,this.startIndex,this.options);a?this.sortable.el.insertBefore(t,a):this.sortable.el.appendChild(t),this.sortable.animateAll(),i&&i.animateAll()},drop:Vr},at(Ba,{pluginName:"revertOnSpill"});function Ga(){}Ga.prototype={onSpill:function(e){var t=e.dragEl,i=e.putSortable,a=i||this.sortable;a.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),a.animateAll()},drop:Vr},at(Ga,{pluginName:"removeOnSpill"}),Y.mount(new Al),Y.mount(Ga,Ba);class $l extends dt{static get properties(){return{disabled:{type:Boolean},handleSelector:{type:String},draggableSelector:{type:String}}}constructor(){super(),this.disabled=!1,this.handleSelector=".handle",this.draggableSelector=".sortable-item",this._sortable=null}createRenderRoot(){return this}render(){return y` <slot></slot> `}connectedCallback(){super.connectedCallback(),this.disabled||this._createSortable()}disconnectedCallback(){super.disconnectedCallback(),this._destroySortable()}updated(e){e.has("disabled")&&(this.disabled?this._destroySortable():this._createSortable())}_createSortable(){if(this._sortable)return;const e=this.children[0];if(!e)return;const t={scroll:!0,forceAutoScrollFallback:!0,scrollSpeed:20,animation:150,draggable:this.draggableSelector,handle:this.handleSelector,fallbackTolerance:3,fallbackOnBody:!0,fallbackClass:"sortable-fallback",fallback:!1,onChoose:this._handleChoose.bind(this),onStart:this._handleStart.bind(this),onEnd:this._handleEnd.bind(this),onUpdate:this._handleUpdate.bind(this)};this._sortable=new Y(e,t)}_handleUpdate(e){this.dispatchEvent(new CustomEvent("item-moved",{detail:{oldIndex:e.oldIndex,newIndex:e.newIndex},bubbles:!0,composed:!0}))}_handleEnd(e){this._cleanupGhostElements(),e.item.placeholder&&(e.item.placeholder.replaceWith(e.item),delete e.item.placeholder)}_handleStart(e){this._cleanupGhostElements()}_handleChoose(e){e.item.placeholder=document.createComment("sort-placeholder"),e.item.after(e.item.placeholder)}_cleanupGhostElements(){document.querySelectorAll(".sortable-fallback, .sortable-ghost").forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)})}_destroySortable(){this._sortable&&(this._sortable.destroy(),this._sortable=null,this._cleanupGhostElements())}}customElements.define("yamp-sortable",$l);const Ur=Object.freeze([{value:"details",label:p("card.sections.details")},{value:"menu",label:p("card.sections.menu")},{value:"action_chips",label:p("card.sections.action_chips")}]),Qa=Ur.map(r=>r.value);class Cl extends dt{static get properties(){return{hass:{},_config:{},_yamlConfig:{},_activeTab:{type:String},_entityEditorIndex:{type:Number},_actionEditorIndex:{type:Number},_actionMode:{type:String},_useTemplate:{type:Boolean},_useVolTemplate:{type:Boolean},_serviceItems:{type:Array}}}constructor(){super(),this._activeTab="entities",this._entityEditorIndex=null,this._actionEditorIndex=null,this._yamlDraft="",this._parsedYaml=null,this._yamlError=!1,this._yamlConfig={},this._serviceItems=[],this._useTemplate=null,this._useVolTemplate=null,this._artworkOverrides=[],this._preTemplateConfig=null}firstUpdated(){this._serviceItems=this._getServiceItems()}updated(e){if(e.has("hass")){const t=e.get("hass");this.hass?.services!==t?.services&&(this._serviceItems=this._getServiceItems())}}_supportsFeature(e,t){return!e||typeof e.attributes.supported_features!="number"?!1:(e.attributes.supported_features&t)!==0}_isGroupCapable(e){return e?this._supportsFeature(e,Ds)?!0:Array.isArray(e.attributes?.group_members):!1}_normalizeArtworkOverrides(e){if(!Array.isArray(e))return[];const t=["media_title","media_artist","media_album_name","media_content_id","media_channel","app_name","media_content_type","entity_id"];return e.map(i=>{if(!i||typeof i!="object")return{match_type:"media_title",match_value:"",image_url:"",size_percentage:void 0,object_fit:void 0};const a=i.size_percentage;if(i.missing_art_url!==void 0)return{match_type:"missing_art",match_value:"",image_url:i.missing_art_url??"",size_percentage:a,object_fit:i.object_fit};let s="media_title",n="";for(const l of t){if(i[l]!==void 0){s=l,n=i[l]??"";break}const c=`${l}_equals`;if(i[c]!==void 0){s=l,n=i[c]??"";break}}return{match_type:s,match_value:n??"",image_url:i.image_url??"",size_percentage:a,object_fit:i.object_fit}})}_serializeArtworkOverride(e){if(!e)return null;const t=(e.image_url??"").trim();if(!t)return null;const i=e.object_fit==="default"?void 0:e.object_fit;if(e.match_type==="missing_art")return{missing_art_url:t,...e.size_percentage!==void 0?{size_percentage:Number(e.size_percentage)}:{},...i!==void 0?{object_fit:i}:{}};const a=(e.match_value??"").trim();return a?{image_url:t,[e.match_type]:a,...e.size_percentage!==void 0?{size_percentage:Number(e.size_percentage)}:{},...i!==void 0?{object_fit:i}:{}}:null}_writeArtworkOverrides(e){this._artworkOverrides=e;const t=e.map(i=>this._serializeArtworkOverride(i)).filter(i=>i);this._updateConfig("media_artwork_overrides",t.length?t:void 0)}_getServiceItems(){return this.hass?.services?Object.entries(this.hass.services).flatMap(([e,t])=>Object.keys(t).map(i=>({label:`${e}.${i}`,value:`${e}.${i}`}))):[]}_getEntityItems(e=[],t=[]){return()=>this.hass?.states?Object.keys(this.hass.states).filter(i=>{const a=i.split(".")[0];return!(e.length&&!e.includes(a)||t.includes(i))}).map(i=>{const a=this.hass.states[i];return{id:i,primary:a?.attributes?.friendly_name||i,secondary:i}}):[]}_entityValueRenderer(e){return e?this.hass?.states?.[e]?.attributes?.friendly_name||e:""}_entityRowRenderer(e){return y`
      <ha-list-item twoline graphic="icon">
        <ha-state-icon
          slot="graphic"
          .hass=${this.hass}
          .stateObj=${this.hass?.states?.[e.id]}
        ></ha-state-icon>
        <span>${e.primary}</span>
        <span slot="secondary">${e.secondary}</span>
      </ha-list-item>
    `}_getAdaptiveTextTargetsValue(){return Array.isArray(this._config?.adaptive_text_targets)?this._config.adaptive_text_targets.filter(e=>Qa.includes(e)):this._config?.adaptive_text===!0?[...Qa]:[]}_onAdaptiveTextTargetsChanged(e){const t=Array.isArray(e)?e.filter(i=>Qa.includes(i)):[];this._updateConfig("adaptive_text_targets",t)}_looksLikeTemplate(e){if(typeof e!="string")return!1;const t=e.trim();return t.includes("{{")||t.includes("{%")}_isEntityId(e){return typeof e=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(e.trim())}setConfig(e){this._yamlConfig={...e};const t=(e.entities??[]).map(s=>typeof s=="string"?{entity_id:s}:s),i=e.template||"custom",a=ri[i]||{};this._config={...a,...e,entities:t},this._artworkOverrides=this._normalizeArtworkOverrides(e.media_artwork_overrides)}_updateConfig(e,t){if(e==="template"){this._changeTemplate(t);return}const i={...this._yamlConfig,[e]:t};this._yamlConfig=i;const a={...this._config,[e]:t};this._config=a,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_changeTemplate(e){let t={...this._yamlConfig};if(e!=="custom"&&(!t.template||t.template==="custom")&&(this._preTemplateConfig={...t}),e==="custom")this._preTemplateConfig?t={...this._preTemplateConfig,...t,template:"custom"}:t.template="custom";else{const a=ri[e]||{};for(const s of Object.keys(a))delete t[s];t.template=e}this._yamlConfig=t;const i=ri[e]||{};this._config={...i,...t,entities:this._config.entities},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_addArtworkOverride(){const e=[...this._artworkOverrides??[]];e.push({match_type:"media_title",match_value:"",image_url:"",size_percentage:void 0,object_fit:void 0}),this._writeArtworkOverrides(e)}_removeArtworkOverride(e){const t=[...this._artworkOverrides??[]];e<0||e>=t.length||(t.splice(e,1),this._writeArtworkOverrides(t))}_onArtworkMatchTypeChange(e,t){if(!t)return;const i=[...this._artworkOverrides??[]];if(!i[e])return;const a={...i[e],match_type:t};t==="missing_art"&&(a.match_value=""),i[e]=a,this._writeArtworkOverrides(i)}_onArtworkMatchValueChange(e,t){const i=[...this._artworkOverrides??[]];i[e]&&(i[e]={...i[e],match_value:t},this._writeArtworkOverrides(i))}_onArtworkImageUrlChange(e,t){const i=[...this._artworkOverrides??[]];i[e]&&(i[e]={...i[e],image_url:t},this._writeArtworkOverrides(i))}_onArtworkSizePercentageChange(e,t){const i=[...this._artworkOverrides??[]];if(i[e]){if(t==="")i[e]={...i[e],size_percentage:void 0};else{const a=Number(t);if(Number.isFinite(a))i[e]={...i[e],size_percentage:a};else return}this._writeArtworkOverrides(i)}}_onArtworkObjectFitChange(e,t){const i=[...this._artworkOverrides??[]];if(!i[e])return;const a=t==="default"?void 0:t;i[e]={...i[e],object_fit:a},this._writeArtworkOverrides(i)}_onArtworkMoved(e){const{oldIndex:t,newIndex:i}=e.detail??{},a=[...this._artworkOverrides??[]];if(t===void 0||i===void 0||t<0||i<0||t>=a.length||i>=a.length)return;const[s]=a.splice(t,1);a.splice(i,0,s),this._writeArtworkOverrides(a)}_updateEntityProperty(e,t){const i=[...this._config.entities??[]],a=this._entityEditorIndex;i[a]&&(i[a]={...i[a],[e]:t},this._updateConfig("entities",i))}_updateActionProperty(e,t){const i=[...this._config.actions??[]],a=this._actionEditorIndex;if(i[a]){e==="card_trigger"&&t&&t!=="none"&&i.forEach((n,l)=>{l!==a&&n.card_trigger===t&&(i[l]={...n,card_trigger:"none"})});const s={...i[a],[e]:t};e==="in_menu"&&delete s.placement,i[a]=s,this._updateConfig("actions",i)}}_deriveActionMode(e){if(!e)return"service";if(e.action==="prev_entity")return"prev_entity";if(e.action==="next_entity")return"next_entity";if(e.action==="select_entity")return"select_entity";if(e.action==="sync_selected_entity"||e.sync_entity_helper)return"sync_selected_entity";if(typeof e.menu_item=="string"&&e.menu_item.trim()!=="")return"menu";const t=typeof e.navigation_path=="string"?e.navigation_path.trim():"";return e.action==="navigate"||t?"navigate":e.action==="toggle_lyrics"?"toggle_lyrics":"service"}static get styles(){return Ue`
        .form-row {
          padding: 12px 16px;
          gap: 8px;
        }
        .tabs {
          display: flex;
          gap: 4px;
          padding: 8px 8px 0 8px;
          border-bottom: 1px solid var(--divider-color, #444);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tabs::-webkit-scrollbar {
          display: none;
        }
        .tab {
          background: transparent;
          border: none;
          color: var(--primary-text-color, #fff);
          cursor: pointer;
          padding: 9px 14px;
          border-radius: 8px 8px 0 0;
          font-weight: 500;
          opacity: 0.85;
          border-bottom: 3px solid transparent;
          transition: color var(--transition, 0.2s), background var(--transition, 0.2s), opacity var(--transition, 0.2s), border-color var(--transition, 0.2s);
          font-size: 1.06em;
          flex: 0 0 auto;
        }
        
        
        .tab:hover {
          opacity: 1;
          color: var(--custom-accent, var(--accent-color, #ff9800));
          background: rgba(255,255,255,0.06);
        }
        .tab[selected] {
          background: rgba(255,255,255,0.10);
          color: var(--primary-text-color, #fff);
          opacity: 1;
          border-bottom-color: var(--custom-accent, var(--accent-color, #ff9800));
          box-shadow: 0 2px 0 0 var(--custom-accent, var(--accent-color, #ff9800)) inset;
        }
        .tab:focus-visible {
          outline: 2px solid var(--custom-accent, var(--accent-color, #ff9800));
          outline-offset: 2px;
        }
        .tab-content {
          padding-top: 4px;
        }
        /* add to rows with multiple elements to align the elements horizontally */
        .form-row-multi-column {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .form-row-multi-column > div {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 120px;
        }
        .form-row-multi-column > div.number-input-with-note {
          flex-direction: column;
          align-items: stretch;
          gap: 4px;
        }
        .config-subtitle.warning {
          color: var(--error-color, #f44336);
          font-style: normal;
          margin-top: 6px;
        }
        #search-limit-reset {
          align-self: flex-start;
          margin-top: 6px;
        }
        .config-subtitle {
          font-size: 0.85em;
          color: var(--secondary-text-color, #888);
          margin-top: 4px;
          line-height: 1.3;
          font-style: italic;
        }
        .form-label {
          display: block;
          font-weight: 600;
          font-size: 0.95em;
          color: var(--primary-text-color, #fff);
          margin-bottom: 2px;
        }
        .form-row-compact {
          padding-top: 4px;
          padding-bottom: 4px;
        }
        /* reduced padding for entity selection subrows */
        .entity-row {
          padding: 6px;
        }
        /* visually isolate grouped controls */
        .config-section,
        .entity-group,
        .action-group {
          background: var(--yamp-section-bg, var(--ha-card-background, var(--card-background-color, rgba(255,255,255,0.02))));
          border: 1px solid var(--yamp-section-border, var(--divider-color, rgba(255,255,255,0.1)));
          border-radius: var(--yamp-section-radius, 12px);
          margin: 16px 0;
          overflow: hidden;
        }
        .config-section:first-of-type,
        .entity-group:first-of-type,
        .action-group:first-of-type {
          margin-top: 8px;
        }
        .config-section .form-row + .form-row,
        .entity-group .form-row + .form-row,
        .action-group .form-row + .form-row {
          border-top: 1px solid var(--yamp-section-divider, rgba(255,255,255,0.06));
        }
        .section-header,
        .entity-group-header,
        .action-group-header {
          display: block;
          padding: 12px 16px 0 16px;
          width: 100%;
        }
        .section-title,
        .entity-group-title,
        .action-group-title {
          font-size: var(--yamp-section-title-size, 1em);
          font-weight: var(--yamp-section-title-weight, 600);
        }
        .section-description {
          display: block;
          align-self: stretch;
          font-size: var(--yamp-section-description-size, 0.9em);
          color: var(--yamp-section-description-color, var(--secondary-text-color, #888));
          margin-top: 2px;
          line-height: 1.4;
          width: 100%;
          box-sizing: border-box;
          padding-right: 24px;
          white-space: normal;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        /* wraps the entity selector and edit button */
        .entity-row-inner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 0px 6px 6px;
          margin: 0px -14px 0px 0px;
        }
        /* wraps the action icon, name textbox and edit button */
        .action-row-inner {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 6px 0px 6px 6px;
          margin: 0px -14px 0px 0px;
        }
        .action-row-inner > ha-icon {
          margin-right: 5px;
          margin-top: 0px;
        }
        /* allow children to fill all available space */
        .grow-children {
          flex: 1;
          display: flex;
          min-width: 0;
        }
        .grow-children > * {
          flex: 1;
          min-width: 0;
        }
        .entity-editor-header, .action-editor-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
        }
        .entity-editor-title, .action-editor-title {
          font-weight: 500;
          font-size: 1.1em;
          line-height: 1;
        }
        .action-icon-placeholder {
          width: 29px; 
          height: 24px; 
          display: inline-block;
        }
        .full-width {
          width: 100%;
        }
        .entity-group-header,
        .action-group-header {
          width: 100%;
        }
        .entity-group-actions,
        .action-group-actions {
          display: flex;
          align-items: center;
        }
        .entity-row-actions {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .action-row-actions {
          display: flex;
          align-items: flex-start;
          flex-shrink: 0;
        }
        .handle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          cursor: grab;
          color: var(--secondary-text-color);
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        .handle:hover {
          opacity: 1;
        }
        .handle:active {
          cursor: grabbing;
        }
        .handle-disabled {
          opacity: 0.3;
          cursor: default;
          pointer-events: none;
        }
        .handle-disabled:hover {
          opacity: 0.3;
        }
        .action-icon {
          align-self: flex-start;
          padding-top: 16px;
        }
        .action-handle {
          align-self: flex-start;
          padding-top: 18px;
        }
        .action-row-actions {
          padding-top: 2px;
        }
        .service-data-editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 4px;
        }
        .service-data-editor-title {
          font-weight: 500;
        }
        .service-data-editor-actions {
          display: flex;
          gap: 8px;
        }
        .code-editor-wrapper.error {
          border: 1px solid color: var(--error-color, red);
          border-radius: 4px;
          padding: 1px;
        }
        .yaml-error-message {
          color: var(--error-color, red);
          font-size: 14px;
          margin: 6px;
          white-space: pre-wrap;
          font-family: Consolas, Menlo, Monaco, monospace;
          line-height: 1.4;
        }
        .help-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
          font-size: 0.9em;
        }
        .help-table th,
        .help-table td {
          border: 1px solid var(--divider-color, #444);
          padding: 8px;
          text-align: left;
          vertical-align: top;
        }
        .help-table thead {
          background: var(--card-background-color, #222);
          font-weight: bold;
        }
        .help-title {
          font-weight: bold;
          margin-top: 16px;
          font-size: 1em;
        }
        code {
          font-family: monospace;
          background: rgba(255, 255, 255, 0.05);
          padding: 2px 4px;
          border-radius: 4px;
        }
        .help-text pre {
          margin: 8px 0 0 0;
          background: rgba(255, 255, 255, 0.05);
          padding: 8px 12px;
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.92em;
          white-space: pre-wrap;
        } 
        .icon-button {
          display: inline-flex;
          cursor: pointer;
          position: relative;
          transition: color 0.2s;
          align-self: center;
          align-items: center;
          padding: 12px;
        }
        .icon-button-compact {
          padding: 6px;
        }
        .icon-button-compact:last-child {
          padding-right: 10px;
        }
        .icon-button:hover {
          color: var(--primary-color, #2196f3);
        }
        .icon-button-disabled {
          opacity: 0.4;
          pointer-events: none;
        }
        .icon-button-toggle {
          opacity: 0.8;
        }
        .icon-button-toggle.active {
          color: var(--custom-accent, var(--accent-color, #ff9800));
          opacity: 1;
        }
        .help-text {
          padding: 12px 25px;
        }
        .add-action-button-wrapper {
          display: flex;
          justify-content: center;
        }
        .artwork-row .artwork-fields {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .config-subtitle.small {
          font-size: 0.9em;
          opacity: 0.75;
          margin: 2px 0 0 0;
        }

        .sortable-ghost {
          box-shadow: 0 0 0 2px var(--primary-color);
          background: rgba(var(--rgb-primary-color), 0.25);
          border-radius: 4px;
          opacity: 0.4;
        }
        .sortable-drag {
          border-radius: 4px;
          opacity: 1;
          background: var(--card-background-color);
          box-shadow: 0px 4px 8px 3px #00000026;
          cursor: grabbing;
        }
        /* Hide any fallback elements that might appear (mobile fix)*/
        .sortable-fallback,
        .sortable-fallback * {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}render(){if(!this._config)return y``;const e=this._yamlConfig.template||"custom",t=this._entityEditorIndex!==null,i=this._actionEditorIndex!==null;return y`
      <div class="config-section" style="margin-top: 0; margin-bottom: 12px;">
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            label=${p("editor.template_label")}
            .selector=${{select:{mode:"dropdown",options:Object.keys(ri).map(a=>({value:a,label:p(`editor.templates.${a}.label`)}))}}}
            .value=${e}
            @value-changed=${a=>this._updateConfig("template",a.detail.value)}
          ></ha-selector>
          <div class="config-subtitle small" style="margin-top: 8px;">
            ${p(`editor.templates.${e}.description`)}
          </div>
        </div>
      </div>
      <div class="tabs">
        ${["entities","behavior","look_and_feel","artwork","actions"].map(a=>{const s=p(`editor.tabs.${a}`);return y`
            <button
              class="tab"
              ${this._activeTab===a?"selected":""}
              @click=${()=>{this._activeTab=a,this._entityEditorIndex=null,this._actionEditorIndex=null,this._useTemplate=null,this._useVolTemplate=null}}
              ?selected=${this._activeTab===a}
            >
              ${s}
            </button>
          `})}
      </div>
      <div class="tab-content">
        ${t?this._renderEntityEditor(this._config.entities?.[this._entityEditorIndex]):i?this._renderActionEditor(this._config.actions?.[this._actionEditorIndex]):this._renderActiveTab()}
      </div>
    `}_renderArtworkTab(){const e=[...this._artworkOverrides??[]],t=[{value:"media_title",label:"Media Title"},{value:"media_artist",label:"Media Artist"},{value:"media_album_name",label:"Album Name"},{value:"media_content_id",label:"Content ID"},{value:"media_channel",label:"Channel"},{value:"app_name",label:"App Name"},{value:"media_content_type",label:"Content Type"},{value:"entity_id",label:"Entity ID"},{value:"missing_art",label:"Missing Artwork"}];return y`
        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${p("editor.sections.artwork.general.title")}</div>
            <div class="section-description">${p("editor.sections.artwork.general.description")}</div>
          </div>

          <div class="form-row form-row-multi-column">
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                label="${p("editor.fields.artwork_fit")}"
                .selector=${{select:{mode:"dropdown",options:[{value:"cover",label:p("editor.artwork_fit.cover")},{value:"contain",label:p("editor.artwork_fit.contain")},{value:"fill",label:p("editor.artwork_fit.fill")},{value:"scale-down",label:p("editor.artwork_fit.scale-down")},{value:"scaled-contain",label:p("editor.artwork_fit.scaled-contain")},{value:"scaled-contain-alternate",label:p("editor.artwork_fit.scaled-contain-alternate")},{value:"none",label:p("editor.artwork_fit.none")},{value:"no_artwork",label:p("editor.fields.no_artwork_option")}]}}}
                .value=${this._config.artwork_object_fit??"cover"}
                @value-changed=${i=>{const a=i.detail.value;this._updateConfig("artwork_object_fit",a==="cover"?void 0:a)}}
              ></ha-selector>
            </div>
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                label="${p("editor.fields.artwork_position")}"
                .selector=${{select:{mode:"dropdown",options:[{value:"top center",label:"Top (default)"},{value:"center center",label:"Center"},{value:"bottom center",label:"Bottom"}]}}}
                .value=${this._config.artwork_position??"top center"}
                @value-changed=${i=>{const a=i.detail.value;this._updateConfig("artwork_position",a==="top center"?void 0:a)}}
              ></ha-selector>
            </div>
          </div>
          <div class="form-row form-row-multi-column">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="extend-artwork-toggle"
                .checked=${this._config.extend_artwork===!0}
                @change=${i=>this._updateConfig("extend_artwork",i.target.checked)}
              ></ha-switch>
              <div style="display: flex; flex-direction: column;">
                <label for="extend-artwork-toggle" style="font-weight: 500;">${p("editor.subtitles.artwork_extend_label")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${p("editor.subtitles.artwork_extend")}</div>
              </div>
            </div>
          </div>
          <div class="form-row form-row-multi-column">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="blurred-artwork-toggle"
                .checked=${this._config.blurred_artwork===!0||this._config.blurred_artwork!==!1&&(this._config.always_collapsed===!0||this._config.artwork_object_fit==="scaled-contain")}
                @change=${i=>this._updateConfig("blurred_artwork",i.target.checked)}
              ></ha-switch>
              <div style="display: flex; flex-direction: column;">
                <label for="blurred-artwork-toggle" style="font-weight: 500;">${p("editor.labels.blurred_artwork")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${p("editor.subtitles.blurred_artwork")}</div>
              </div>
            </div>
          </div>
          <div class="form-row form-row-multi-column">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="hide-collapsed-artwork-toggle"
                .checked=${this._config.hide_collapsed_artwork===!0}
                @change=${i=>this._updateConfig("hide_collapsed_artwork",i.target.checked)}
              ></ha-switch>
              <div style="display: flex; flex-direction: column;">
                <label for="hide-collapsed-artwork-toggle" style="font-weight: 500;">${p("editor.labels.hide_collapsed_artwork")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${p("editor.subtitles.hide_collapsed_artwork")}</div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <ha-selector
              .hass=${this.hass}
              class="full-width"
              label="${p("editor.fields.artwork_hostname")}"
              .selector=${{text:{}}}
              .value=${this._config.artwork_hostname??""}
              @value-changed=${i=>this._updateConfig("artwork_hostname",i.detail.value)}
              helper="e.g. http://192.168.1.50:8123"
            ></ha-selector>
          </div>
        </div>

        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${p("editor.sections.artwork.idle.title")}</div>
            <div class="section-description">${p("editor.sections.artwork.idle.description")}</div>
          </div>
          <div class="form-row form-row-multi-column">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="idle-image-url-toggle"
                .checked=${this._useIdleImageUrl??this._looksLikeUrlOrPath(this._config.idle_image)}
                @change=${i=>{this._useIdleImageUrl=i.target.checked,i.target.checked?this._updateConfig("idle_image",""):this._updateConfig("idle_image","")}}
              ></ha-switch>
              <label for="idle-image-url-toggle">${p("editor.labels.use_url_path")}</label>
            </div>
            <div style="flex: 2;">
              ${this._useIdleImageUrl?y`
                      <ha-selector
                        .hass=${this.hass}
                        class="full-width"
                        .selector=${{text:{}}}
                        .value=${this._config.idle_image??""}
                        @value-changed=${i=>this._updateConfig("idle_image",i.detail.value)}
                        label="e.g., https://example.com/image.jpg or /local/custom/image.jpg"
                        helper="${p("editor.subtitles.image_url_helper")}"
                      ></ha-selector>
                    `:y`
                      <ha-generic-picker
                        class="full-width"
                        .hass=${this.hass}
                        .value=${this._config.idle_image??""}
                        .label=${p("editor.fields.idle_image_entity")}
                        .valueRenderer=${i=>this._entityValueRenderer(i)}
                        .rowRenderer=${i=>this._entityRowRenderer(i)}
                        .getItems=${this._getEntityItems(["camera","image"])}
                        @value-changed=${i=>this._updateConfig("idle_image",i.detail.value)}
                        allow-custom-value
                      ></ha-generic-picker>
                    `}
            </div>
          </div>
          <div class="form-row form-row-multi-column" style="${this._config.idle_image?"":"opacity: 0.4; pointer-events: none;"}">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="show-idle-artwork-toggle"
                .checked=${this._config.show_idle_artwork_when_not_playing===!0}
                .disabled=${!this._config.idle_image}
                @change=${i=>this._updateConfig("show_idle_artwork_when_not_playing",i.target.checked)}
              ></ha-switch>
              <div style="display: flex; flex-direction: column;">
                <label for="show-idle-artwork-toggle" style="font-weight: 500;">${p("editor.labels.show_idle_artwork_when_not_playing")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${p("editor.subtitles.show_idle_artwork_when_not_playing")}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${p("editor.sections.artwork.overrides.title")}</div>
            <div class="section-description">${p("editor.sections.artwork.overrides.description")}</div>
          </div>
          <yamp-sortable @item-moved=${i=>this._onArtworkMoved(i)}>
            <div class="sortable-container">
              ${e.length?e.map((i,a)=>y`
                        <div class="action-row-inner sortable-item artwork-row">
                          <div class="handle action-handle">
                            <ha-icon icon="mdi:drag"></ha-icon>
                          </div>
                          <div class="artwork-fields">
                            <ha-selector
                              .hass=${this.hass}
                              label="${p("editor.fields.match_field")}"
                              .selector=${{select:{mode:"dropdown",options:t}}}
                              .value=${i.match_type??"media_title"}
                              @value-changed=${s=>this._onArtworkMatchTypeChange(a,s.detail.value)}
                            ></ha-selector>
                            ${i.match_type==="missing_art"?y`
                                  <div class="config-subtitle small">
                                    Applies when the selected media provides no artwork.
                                  </div>
                                `:i.match_type==="entity_id"?y`
                                    <ha-generic-picker
                                      class="full-width"
                                      .hass=${this.hass}
                                      .value=${i.match_value??""}
                                      .label=${p("editor.fields.match_entity")}
                                      .valueRenderer=${s=>this._entityValueRenderer(s)}
                                      .rowRenderer=${s=>this._entityRowRenderer(s)}
                                      .getItems=${this._getEntityItems(["media_player"])}
                                      @value-changed=${s=>this._onArtworkMatchValueChange(a,s.detail.value)}
                                      allow-custom-value
                                    ></ha-generic-picker>
                                  `:y`
                                    <ha-selector
                                      .hass=${this.hass}
                                      class="full-width"
                                      .selector=${{text:{}}}
                                      label="${p("editor.fields.match_value")}"
                                      .value=${i.match_value??""}
                                      @value-changed=${s=>this._onArtworkMatchValueChange(a,s.detail.value)}
                                    ></ha-selector>
                                  `}
                            <ha-selector
                              .hass=${this.hass}
                              class="full-width"
                              .selector=${{text:{}}}
                              label=${i.match_type==="missing_art"?p("editor.fields.fallback_image_url"):p("editor.fields.image_url")}
                              .value=${i.image_url??""}
                              @value-changed=${s=>this._onArtworkImageUrlChange(a,s.detail.value)}
                            ></ha-selector>
                            <div
                              class="form-row-multi-column"
                              style="gap:12px; flex-wrap:wrap; align-items:flex-start;"
                            >
                              <div class="grow-children" style="flex:1;">
                                <ha-selector
                                  .hass=${this.hass}
                                  class="full-width"
                                  label="${p("editor.fields.size_percent")}"
                                  .selector=${{number:{min:1,max:100,mode:"box"}}}
                                  .value=${i.size_percentage??""}
                                  @value-changed=${s=>this._onArtworkSizePercentageChange(a,s.detail.value)}
                                ></ha-selector>
                              </div>
                              <div class="grow-children" style="flex:1.5;">
                                <ha-selector
                                  .hass=${this.hass}
                                  label="${p("editor.fields.object_fit")}"
                                  .selector=${{select:{mode:"dropdown",options:[{value:"default",label:p("editor.artwork_fit.default")},{value:"cover",label:p("editor.artwork_fit.cover")},{value:"contain",label:p("editor.artwork_fit.contain")},{value:"fill",label:p("editor.artwork_fit.fill")},{value:"scale-down",label:p("editor.artwork_fit.scale-down")},{value:"scaled-contain",label:p("editor.artwork_fit.scaled-contain")},{value:"scaled-contain-alternate",label:p("editor.artwork_fit.scaled-contain-alternate")},{value:"none",label:p("editor.artwork_fit.none")},{value:"no_artwork",label:p("editor.fields.no_artwork_option")}]}}}
                                  .value=${i.object_fit||"default"}
                                  @value-changed=${s=>this._onArtworkObjectFitChange(a,s.detail.value)}
                                ></ha-selector>
                              </div>
                            </div>
                          </div>
                          <div class="action-row-actions">
                            <ha-icon
                              class="icon-button"
                              icon="mdi:trash-can"
                              title="Delete Override"
                              @click=${()=>this._removeArtworkOverride(a)}
                            ></ha-icon>
                          </div>
                        </div>
                      `):y`<div class="config-subtitle" style="padding:12px 0;text-align:center;">
                      ${p("editor.subtitles.no_artwork_overrides")}
                    </div>`}
            </div>
          </yamp-sortable>
          <div class="add-action-button-wrapper">
            <ha-icon
              class="icon-button"
              icon="mdi:plus"
              title="${p("editor.titles.add_artwork_override")}"
              @click=${this._addArtworkOverride}
            ></ha-icon>
          </div>
        </div>
        </div>

      `}_renderActiveTab(){switch(this._activeTab){case"entities":return this._renderEntitiesTab();case"behavior":return this._renderBehaviorTab();case"look_and_feel":return this._renderVisualTab();case"artwork":return this._renderArtworkTab();case"actions":return this._renderActionsTab();default:return this._renderEntitiesTab()}}_renderEntitiesTab(){if(!this._config)return y``;let e=[...this._config.entities??[]];return(e.length===0||e[e.length-1].entity_id)&&e.push({entity_id:""}),y`
      <div class="entity-group">
        <div class="entity-group-header section-header">
          <div class="entity-group-title section-title">
            ${p("editor.sections.entities.title")}
          </div>
          <div class="section-description">${p("editor.sections.entities.description")}</div>
        </div>
        <div class="form-row">
          <yamp-sortable @item-moved=${t=>this._onEntityMoved(t)}>
            <div class="sortable-container">
              ${e.map((t,i)=>y`
                  <div
                    class="entity-row-inner ${i<e.length-1?"sortable-item":""}"
                    data-index="${i}"
                  >
                    <div class="handle ${i===e.length-1?"handle-disabled":""}">
                      <ha-icon icon="mdi:drag"></ha-icon>
                    </div>
                    <div class="grow-children">
                      <ha-generic-picker
                        class="full-width"
                        style="display: block; width: 100%;"
                        .hass=${this.hass}
                        .value=${t.entity_id||""}
                        .label=${p("common.media_player")}
                        .valueRenderer=${a=>this._entityValueRenderer(a)}
                        .rowRenderer=${a=>this._entityRowRenderer(a)}
                        .getItems=${this._getEntityItems(["media_player"],i===e.length-1&&!t.entity_id?this._config.entities?.map(a=>a.entity_id)??[]:[])}
                        @value-changed=${a=>this._onEntityChanged(i,a.detail.value)}
                        allow-custom-value
                      ></ha-generic-picker>
                    </div>
                    <div class="entity-row-actions">
                      <ha-icon
                        class="icon-button ${t.entity_id?"":"icon-button-disabled"}"
                        icon="mdi:pencil"
                        title="${p("common.edit_entity")}"
                        @click=${()=>this._onEditEntity(i)}
                      ></ha-icon>
                    </div>
                  </div>
                `)}
            </div>
          </yamp-sortable>
        </div>
      </div>
    `}_renderBehaviorTab(){return y`
      <div class="config-section">
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:p("editor.card_type_options.default")},{value:"search",label:p("editor.card_type_options.search")},{value:"group_players",label:p("editor.card_type_options.group_players")}]}}}
            .value=${this._config.card_type??"default"}
            label="${p("editor.fields.card_type")}"
            @value-changed=${e=>this._updateConfig("card_type",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${p("editor.subtitles.card_type")}</div>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">${p("editor.sections.behavior.idle_chips.title")}</div>
          <div class="section-description">
            ${p("editor.sections.behavior.idle_chips.description")}
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:0,step:1e3,unit_of_measurement:"ms",mode:"box"}}}
              .value=${this._config.idle_timeout_ms??6e4}
              label="${p("editor.fields.idle_timeout")}"
              @value-changed=${e=>this._updateConfig("idle_timeout_ms",e.detail.value)}
            ></ha-selector>
            <div class="config-subtitle">${p("editor.subtitles.idle_timeout")}</div>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${p("common.reset_default")}"
            @click=${()=>this._updateConfig("idle_timeout_ms",6e4)}
          ></ha-icon>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"auto",label:"Auto"},{value:"always",label:"Always"},{value:"in_menu",label:"In Menu"},{value:"in_menu_on_idle",label:"In Menu on Idle"}]}}}
            .value=${this._config.show_chip_row??"auto"}
            label="${p("editor.fields.show_chip_row")}"
            @value-changed=${e=>this._updateConfig("show_chip_row",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${p("editor.subtitles.show_chip_row")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="dim-chips-on-idle-toggle"
              .checked=${this._config.dim_chips_on_idle??!0}
              @change=${e=>this._updateConfig("dim_chips_on_idle",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.dim_chips")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.dim_chips")}</div>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${p("editor.sections.behavior.interactions_search.title")}
          </div>
          <div class="section-description">
            ${p("editor.sections.behavior.interactions_search.description")}
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="always-show-quick-group-toggle"
              .checked=${this._config.always_show_quick_group??!1}
              @change=${e=>this._updateConfig("always_show_quick_group",e.target.checked)}
            ></ha-switch>
            <label for="always-show-quick-group-toggle"
              >${p("editor.labels.always_show_group")}</label
            >
          </div>
          <div class="config-subtitle">${p("editor.subtitles.always_show_group")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="hold-to-pin-toggle"
              .checked=${this._config.hold_to_pin??!1}
              @change=${e=>this._updateConfig("hold_to_pin",e.target.checked)}
            ></ha-switch>
            <label for="hold-to-pin-toggle">${p("editor.labels.hold_to_pin")}</label>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.hold_to_pin")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="show-volume-overlay-toggle"
              .checked=${this._config.show_volume_overlay??!1}
              @change=${e=>this._updateConfig("show_volume_overlay",e.target.checked)}
            ></ha-switch>
            <label for="show-volume-overlay-toggle"
              >${p("editor.labels.show_volume_overlay")}</label
            >
          </div>
          <div class="config-subtitle">${p("editor.subtitles.show_volume_overlay")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              .checked=${this._config.disable_autofocus??!1}
              @change=${e=>this._updateConfig("disable_autofocus",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.disable_autofocus")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.disable_autofocus")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="default-search-favorites-toggle"
              .checked=${this._config.default_search_favorites??!1}
              @change=${e=>this._updateConfig("default_search_favorites",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.default_search_favorites")}</span>
          </div>
          <div class="config-subtitle">
            ${p("editor.subtitles.default_search_favorites")}
          </div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              .checked=${this._config.keep_filters_on_search??!1}
              @change=${e=>this._updateConfig("keep_filters_on_search",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.keep_filters")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.search_within_filter")}</div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="dismiss-search-on-play-toggle"
              .checked=${this._config.dismiss_search_on_play??!0}
              @change=${e=>this._updateConfig("dismiss_search_on_play",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.dismiss_on_play")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.close_search_on_play")}</div>
        </div>

        <div class="form-row form-row-multi-column">
          <div
            style="${this._config.entities?.length===1&&this._config.always_collapsed===!0&&this._config.expand_on_search!==!0?"opacity: 0.5;":""}"
            title="${this._config.entities?.length===1&&this._config.always_collapsed===!0&&this._config.expand_on_search!==!0?"Not available with one entity in Always Collapsed mode unless Expand on Search is enabled":""}"
          >
            <ha-switch
              id="pin-search-headers-toggle"
              .checked=${this._config.pin_search_headers??!1}
              @change=${e=>this._updateConfig("pin_search_headers",e.target.checked)}
              .disabled=${this._config.entities?.length===1&&this._config.always_collapsed===!0&&this._config.expand_on_search!==!0}
            ></ha-switch>
            <span>${p("editor.labels.pin_headers")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.pin_search_headers")}</div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="hide-search-headers-on-idle-toggle"
              .checked=${this._config.hide_search_headers_on_idle??!1}
              @change=${e=>this._updateConfig("hide_search_headers_on_idle",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.hide_search_headers_on_idle")}</span>
          </div>
          <div class="config-subtitle">
            ${p("editor.subtitles.hide_search_headers_on_idle")}
          </div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="disable-mass-queue-toggle"
              .checked=${this._config.disable_mass_queue??!1}
              @change=${e=>this._updateConfig("disable_mass_queue",e.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.disable_mass")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.disable_mass")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children number-input-with-note">
            <ha-selector
              .selector=${{number:{min:0,max:1e3,step:1,mode:"box"}}}
              .value=${this._config.search_results_limit??20}
              label="${p("editor.fields.search_limit")}"
              helper="${p("editor.subtitles.search_limit_full")}"
              @value-changed=${e=>this._updateConfig("search_results_limit",e.detail.value)}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            id="search-limit-reset"
            icon="mdi:restore"
            title="${p("common.reset_default")}"
            @click=${()=>this._updateConfig("search_results_limit",20)}
          ></ha-icon>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"all",label:p("search.filters.all")},{value:"artist",label:p("search.filters.artist")},{value:"album",label:p("search.filters.album")},{value:"track",label:p("search.filters.track")},{value:"playlist",label:p("search.filters.playlist")},{value:"radio",label:p("search.filters.radio")},{value:"podcast",label:p("search.filters.podcast")},{value:"audiobook",label:p("search.filters.audiobook")}]}}}
            .value=${this._config.default_search_filter??"all"}
            label="${p("editor.labels.default_search_filter")}"
            helper="${p("editor.subtitles.default_search_filter_full")}"
            @value-changed=${e=>this._updateConfig("default_search_filter",e.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:"Default"},{value:"name",label:"Name (A\u2192Z)"},{value:"name_desc",label:"Name (Z\u2192A)"},{value:"sort_name",label:"Sort Name (A\u2192Z)"},{value:"sort_name_desc",label:"Sort Name (Z\u2192A)"},{value:"timestamp_added",label:"Date Added (Oldest)"},{value:"timestamp_added_desc",label:"Date Added (Newest)"},{value:"last_played",label:"Last Played (Oldest)"},{value:"last_played_desc",label:"Last Played (Recent)"},{value:"play_count",label:"Play Count (Low\u2192High)"},{value:"play_count_desc",label:"Play Count (High\u2192Low)"},{value:"year",label:"Year (Oldest)"},{value:"year_desc",label:"Year (Newest)"},{value:"position",label:"Position (Asc)"},{value:"position_desc",label:"Position (Desc)"},{value:"artist_name",label:"Artist (A\u2192Z)"},{value:"artist_name_desc",label:"Artist (Z\u2192A)"},{value:"random",label:"Random"},{value:"random_play_count",label:"Random + Least Played"}]}}}
            .value=${this._config.search_results_sort??"default"}
            label="${p("editor.fields.result_sorting")}"
            helper="${p("editor.subtitles.result_sorting_full")}"
            @value-changed=${e=>this._updateConfig("search_results_sort",e.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">${p("editor.sections.behavior.lyrics.title")}</div>
          <div class="section-description">
            ${p("editor.sections.behavior.lyrics.description")}
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="always-show-lyrics-toggle"
              .checked=${this._config.always_show_lyrics??!1}
              @change=${e=>this._updateConfig("always_show_lyrics",e.target.checked)}
            ></ha-switch>
            <label for="always-show-lyrics-toggle"
              >${p("editor.labels.always_show_lyrics")}</label
            >
          </div>
          <div class="config-subtitle">${p("editor.subtitles.always_show_lyrics")}</div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:p("lyrics_modes.default")},{value:"scroll",label:p("lyrics_modes.scroll")},{value:"text",label:p("lyrics_modes.text")}]}}}
            .value=${this._config.lyrics_mode??"default"}
            label="${p("editor.labels.lyrics_mode")}"
            @value-changed=${e=>this._updateConfig("lyrics_mode",e.detail.value)}
          ></ha-selector>
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"mass_lrclib",label:p("lyrics_sources.mass_lrclib")},{value:"mass",label:p("lyrics_sources.mass")},{value:"lrclib",label:p("lyrics_sources.lrclib")},{value:"lrclib_mass",label:p("lyrics_sources.lrclib_mass")}]}}}
            .value=${this._config.lyrics_source??"mass_lrclib"}
            label="${p("editor.labels.lyrics_source")}"
            @value-changed=${e=>this._updateConfig("lyrics_source",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${p("editor.subtitles.lyrics_source")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:-5,max:5,step:.1,unit_of_measurement:"s",mode:"box"}}}
              .value=${this._config.lyrics_pre_roll??0}
              label="${p("editor.labels.lyrics_pre_roll")}"
              helper="${p("editor.subtitles.lyrics_pre_roll")}"
              @value-changed=${e=>this._updateConfig("lyrics_pre_roll",e.detail.value)}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${p("common.reset_default")}"
            @click=${()=>this._updateConfig("lyrics_pre_roll",0)}
          ></ha-icon>
        </div>
      </div>
    `}_renderVisualTab(){const e=this._config.volume_mode==="stepper"?y`
            <div class="form-row form-row-multi-column">
              <div class="grow-children">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:.01,max:1,step:.01,unit_of_measurement:"",mode:"box"}}}
                  .value=${this._config.volume_step??.05}
                  label="${p("editor.fields.vol_step")}"
                  @value-changed=${t=>this._updateConfig("volume_step",t.detail.value)}
                ></ha-selector>
              </div>
              <ha-icon
                class="icon-button"
                icon="mdi:restore"
                title="${p("common.reset_default")}"
                @click=${()=>this._updateConfig("volume_step",.05)}
              ></ha-icon>
            </div>
          `:k;return y`
      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${p("editor.sections.look_and_feel.theme_layout.title")}
          </div>
          <div class="section-description">
            ${p("editor.sections.look_and_feel.theme_layout.description")}
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="match-theme-toggle"
              .checked=${this._config.match_theme??!1}
              @change=${t=>this._updateConfig("match_theme",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.match_theme")}</span>
          </div>
          <div>
            <ha-switch
              id="alternate-progress-bar-toggle"
              .checked=${this._config.alternate_progress_bar??!1}
              @change=${t=>this._updateConfig("alternate_progress_bar",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.alt_progress")}</span>
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:2,max:48,step:2,unit_of_measurement:"px",mode:"box"}}}
              .value=${this._config.progress_bar_height??6}
              label="${p("editor.labels.progress_bar_height")}"
              @value-changed=${t=>this._updateConfig("progress_bar_height",t.detail.value)}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${p("common.reset_default")}"
            @click=${()=>this._updateConfig("progress_bar_height",6)}
          ></ha-icon>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"automatic",label:p("editor.appearance_options.automatic")},{value:"light",label:p("editor.appearance_options.light")},{value:"dark",label:p("editor.appearance_options.dark")}]}}}
            .value=${this._config.appearance??"automatic"}
            label="${p("editor.fields.appearance")}"
            @value-changed=${t=>this._updateConfig("appearance",t.detail.value)}
          ></ha-selector>
        </div>
        <div class="form-row form-row-multi-column">
          <div
            title=${this._config.alternate_progress_bar||this._config.always_collapsed?p("editor.subtitles.not_available_alt_collapsed"):""}
          >
            <ha-switch
              id="display-timestamps-toggle"
              .checked=${this._config.display_timestamps??!1}
              @change=${t=>this._updateConfig("display_timestamps",t.target.checked)}
              .disabled=${this._config.alternate_progress_bar||this._config.always_collapsed}
            ></ha-switch>
            <span>${p("editor.labels.display_timestamps")}</span>
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              class="full-width"
              .selector=${{number:{min:0,max:2e3,mode:"box"}}}
              label="${p("editor.fields.card_height")}"
              .value=${this._config.card_height??""}
              helper="${p("editor.subtitles.card_height_full")}"
              @value-changed=${t=>{const i=t.detail.value;if(i===""||i===void 0){this._updateConfig("card_height",void 0);return}const a=Number(i);this._updateConfig("card_height",Number.isFinite(a)&&a>0?a:void 0)}}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${p("common.reset_default")}"
            @click=${()=>this._updateConfig("card_height",void 0)}
          ></ha-icon>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"list",label:p("editor.search_view_options.list")},{value:"card",label:p("editor.search_view_options.card")},{value:"card_minimal",label:p("editor.search_view_options.card_minimal")}]}}}
            .value=${this._config.search_view??"list"}
            label="${p("editor.fields.search_view")}"
            helper="${p("editor.subtitles.search_view")}"
            @value-changed=${t=>this._updateConfig("search_view",t.detail.value)}
          ></ha-selector>
        </div>
        ${this._config.search_view==="card"||this._config.search_view==="card_minimal"?y`
              <div class="form-row">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${{number:{min:1,max:12,step:1,mode:"box"}}}
                  .value=${this._config.search_card_columns??4}
                  label="${p("editor.fields.search_card_columns")}"
                  helper="${p("editor.subtitles.search_card_columns")}"
                  @value-changed=${t=>this._updateConfig("search_card_columns",t.detail.value)}
                ></ha-selector>
              </div>
            `:k}
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${p("editor.sections.look_and_feel.controls_typography.title")}
          </div>
          <div class="section-description">
            ${p("editor.sections.look_and_feel.controls_typography.description")}
          </div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"classic",label:"Classic"},{value:"modern",label:"Modern"}]}}}
            .value=${this._config.control_layout??"classic"}
            label="${p("editor.fields.control_layout")}"
            helper="${p("editor.subtitles.control_layout_full")}"
            @value-changed=${t=>this._updateConfig("control_layout",t.detail.value)}
          ></ha-selector>
        </div>
        <div
          class="form-row"
          style="${(this._config.control_layout??"classic")==="modern"?"":"opacity: 0.5;"}"
          title="${(this._config.control_layout??"classic")==="modern"?"":p("editor.subtitles.only_available_modern")}"
          }
        >
          <div>
            <ha-switch
              .checked=${this._config.swap_pause_for_stop??!1}
              @change=${t=>this._updateConfig("swap_pause_for_stop",t.target.checked)}
              .disabled=${(this._config.control_layout??"classic")!=="modern"}
            ></ha-switch>
            <span>${p("editor.labels.swap_pause_stop")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.swap_pause_stop")}</div>
        </div>
        <div class="form-row">
          <div>
            <ha-switch
              id="adaptive-controls-toggle"
              .checked=${this._config.adaptive_controls??!1}
              @change=${t=>this._updateConfig("adaptive_controls",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.adaptive_controls")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.adaptive_controls")}</div>
        </div>
        <div class="form-row">
          <div>
            <ha-switch
              id="hide-active-entity-label-toggle"
              .checked=${this._config.hide_active_entity_label??!1}
              @change=${t=>this._updateConfig("hide_active_entity_label",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.hide_active_entity")}</span>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.hide_menu_player")}</div>
        </div>
        <div class="form-row">
          <div>
            <ha-switch
              id="hide-active-entity-label-on-idle-toggle"
              .checked=${this._config.hide_active_entity_label_on_idle??!1}
              @change=${t=>this._updateConfig("hide_active_entity_label_on_idle",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.hide_active_entity_on_idle")}</span>
          </div>
          <div class="config-subtitle">
            ${p("editor.subtitles.hide_active_entity_on_idle")}
          </div>
        </div>
        <div class="form-row">
          <div class="full-width">
            <span class="form-label">${p("editor.labels.adaptive_text_elements")}</span>
            <div class="config-subtitle">${p("editor.subtitles.adaptive_text")}</div>
            <ha-selector
              .hass=${this.hass}
              .selector=${{select:{multiple:!0,options:Ur}}}
              .value=${this._getAdaptiveTextTargetsValue()}
              @value-changed=${t=>this._onAdaptiveTextTargetsChanged(t.detail.value)}
            ></ha-selector>
          </div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"},{value:"none",label:"None"}]}}}
            .value=${this._config.details_alignment??"left"}
            label="${p("editor.fields.details_alignment")}"
            @value-changed=${t=>this._updateConfig("details_alignment",t.detail.value)}
          ></ha-selector>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"slider",label:"Slider"},{value:"stepper",label:"Stepper"},{value:"hidden",label:"Hidden"}]}}}
            .value=${this._config.volume_mode??"slider"}
            label="${p("editor.fields.volume_mode")}"
            @value-changed=${t=>this._updateConfig("volume_mode",t.detail.value)}
          ></ha-selector>
        </div>
        ${e}
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${p("editor.sections.look_and_feel.collapsed_idle.title")}
          </div>
          <div class="section-description">
            ${p("editor.sections.look_and_feel.collapsed_idle.description")}
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="collapse-on-idle-toggle"
              .checked=${this._config.collapse_on_idle??!1}
              @change=${t=>this._updateConfig("collapse_on_idle",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.collapse_on_idle")}</span>
          </div>
          <div
            style="${this._config.always_collapsed?"opacity: 0.5;":""}"
            title="${this._config.always_collapsed?p("editor.subtitles.not_available_collapsed"):""}"
          >
            <ha-switch
              id="hide-menu-player-toggle"
              .checked=${this._config.hide_menu_player??!1}
              @change=${t=>this._updateConfig("hide_menu_player",t.target.checked)}
              .disabled=${!!this._config.always_collapsed||this._config.always_collapsed===!0&&this._config.pin_search_headers===!0&&this._config.expand_on_search===!0}
            ></ha-switch>
            <span>${p("editor.labels.hide_menu_player_toggle")}</span>
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="always-collapsed-toggle"
              .checked=${this._config.always_collapsed??!1}
              @change=${t=>this._updateConfig("always_collapsed",t.target.checked)}
            ></ha-switch>
            <span>${p("editor.labels.always_collapsed")}</span>
          </div>
          <div
            style="${this._config.always_collapsed?"":"opacity: 0.5;"}"
            title="${this._config.always_collapsed?"":p("editor.subtitles.only_available_collapsed")}"
          >
            <ha-switch
              id="expand-on-search-toggle"
              .checked=${this._config.expand_on_search??!1}
              @change=${t=>this._updateConfig("expand_on_search",t.target.checked)}
              .disabled=${!this._config.always_collapsed}
            ></ha-switch>
            <span>${p("editor.labels.expand_on_search")}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="config-subtitle">${p("editor.subtitles.collapse_expand")}</div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:"Default"},{value:"search",label:"Search"},{value:"search-recently-played",label:"Recently Played"},{value:"search-next-up",label:"Next Up"}]}}}
            .value=${this._config.idle_screen??"default"}
            label="${p("editor.fields.idle_screen")}"
            @value-changed=${t=>this._updateConfig("idle_screen",t.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${p("editor.subtitles.idle_screen")}</div>
        </div>
      </div>
    `}_renderActionsTab(){let e=[...this._config.actions??[]];return y`
      <div class="action-group config-section">
        <div class="action-group-header section-header">
          <div class="action-group-title section-title">
            ${p("editor.sections.actions.title")}
          </div>
          <div class="section-description">${p("editor.sections.actions.description")}</div>
        </div>
        <div class="form-row">
          <yamp-sortable @item-moved=${t=>this._onActionMoved(t)}>
            <div class="sortable-container">
              ${e.map((t,i)=>y`
                  <div class="action-row-inner sortable-item">
                    <div class="handle action-handle">
                      <ha-icon icon="mdi:drag"></ha-icon>
                    </div>
                    ${t?.icon?y`
                          <ha-icon
                            class="action-icon"
                            icon="${t?.icon}"
                            title="Action Icon"
                          ></ha-icon>
                        `:y`<span class="action-icon-placeholder"></span>`}
                    <div class="grow-children">
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        label="(Icon Only)"
                        .value=${t?.name??""}
                        .helper=${this._getActionHelperText(t)}
                        @value-changed=${a=>this._onActionChanged(i,a.detail.value)}
                      ></ha-selector>
                    </div>
                    <div class="action-row-actions">
                      <ha-icon
                        class="icon-button icon-button-compact"
                        icon="mdi:pencil"
                        title="${p("common.edit_action")}"
                        @click=${()=>this._onEditAction(i)}
                      ></ha-icon>
                      ${t?.action!=="sync_selected_entity"&&t?.action!=="select_entity"?y`
                            <ha-icon
                              class="icon-button icon-button-compact icon-button-toggle ${t?.in_menu==="hidden"?"icon-button-disabled":t?.in_menu===!0?"active":""}"
                              icon="${t?.in_menu===!0?"mdi:menu":t?.in_menu==="hidden"?t?.card_trigger&&t.card_trigger!=="none"?"mdi:image-outline":"mdi:eye-off-outline":"mdi:view-grid-outline"}"
                              title="${t?.in_menu==="hidden"?t?.card_trigger&&t.card_trigger!=="none"?p("editor.placements.hidden"):`${p("editor.placements.hidden")} (${p("editor.placements.not_triggerable")})`:t?.in_menu?p("editor.fields.move_to_main"):p("editor.fields.move_to_menu")}"
                              role="button"
                              aria-label="${t?.in_menu===!0?p("editor.fields.move_to_main"):p("editor.fields.move_to_menu")}"
                              @click=${()=>{t?.in_menu!=="hidden"&&this._toggleActionInMenu(i)}}
                            ></ha-icon>
                          `:y`
                            <ha-icon
                              class="icon-button icon-button-compact icon-button-disabled"
                              icon="mdi:eye-off-outline"
                              title="${p(`editor.action_types.${t?.action}`)}"
                            ></ha-icon>
                          `}
                      <ha-icon
                        class="icon-button icon-button-compact"
                        icon="mdi:trash-can"
                        title="${p("editor.fields.delete_action")}"
                        @click=${()=>this._removeAction(i)}
                      ></ha-icon>
                    </div>
                  </div>
                `)}
            </div>
          </yamp-sortable>
        </div>
        <div class="add-action-button-wrapper">
          <ha-icon
            class="icon-button"
            icon="mdi:plus"
            title="Add Action"
            @click=${()=>{const t=[...this._config.actions??[],{}],i=t.length-1;this._updateConfig("actions",t),this._onEditAction(i)}}
          ></ha-icon>
        </div>
      </div>
    `}_renderEntityEditor(e){const t=this.hass?.states?.[e?.entity_id];let i=this._isGroupCapable(t);if(!i&&e?.music_assistant_entity){const a=e.music_assistant_entity;if(this._looksLikeTemplate(a))i=!0;else{const s=this.hass?.states?.[a];s&&this._isGroupCapable(s)&&(i=!0)}}return y`
        <div class="entity-editor-header">
          <ha-icon
            class="icon-button"
            icon="mdi:chevron-left"
            title="${p("common.back")}"
            @click=${this._onBackFromEntityEditor}>
          </ha-icon>
          <div class="entity-editor-title">${p("editor.titles.edit_entity")}</div>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{domain:"media_player"}}}
            .value=${e?.entity_id??""}
          
            disabled
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            class="full-width"
            .selector=${{text:{}}}
            label="${p("editor.fields.name")}"
            .value=${e?.name??""}
            @value-changed=${a=>this._updateEntityProperty("name",a.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",multiple:!0,options:[{value:"previous",label:"Previous Track"},{value:"play_pause",label:"Play/Pause"},{value:"stop",label:"Stop"},{value:"next",label:"Next Track"},{value:"shuffle",label:"Shuffle"},{value:"repeat",label:"Repeat"},{value:"favorite",label:"Favorite"},{value:"power",label:"Power"}]}}}
            .value=${Array.isArray(e?.hidden_controls)?e.hidden_controls:[]}
            label="${p("editor.fields.hidden_controls")}"
            helper="${p("editor.subtitles.hide_controls")}"
            @value-changed=${a=>this._updateEntityProperty("hidden_controls",a.detail.value)}
          ></ha-selector>
        </div>

 

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="ma-template-toggle"
              .checked=${this._useTemplate??this._looksLikeTemplate(e?.music_assistant_entity)}
              @change=${a=>{this._useTemplate=a.target.checked}}
            ></ha-switch>
            <label for="ma-template-toggle">${p("editor.labels.use_ma_template")}</label>
          </div>
        </div>

        ${this._useTemplate??this._looksLikeTemplate(e?.music_assistant_entity)?y`
      <div class="form-row">
        <div class=${this._yamlError&&(e?.music_assistant_entity??"").trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}>
          <ha-code-editor
            id="ma-template-editor"
            label="${p("editor.fields.ma_template")}"
            .hass=${this.hass}
            mode="jinja2"
            autocomplete-entities
            .value=${e?.music_assistant_entity??""}
            @value-changed=${a=>this._updateEntityProperty("music_assistant_entity",a.detail.value)}
          ></ha-code-editor>
          <div class="help-text">
            <ha-icon icon="mdi:information-outline"></ha-icon>
            ${p("editor.subtitles.jinja_template_hint")}
            <pre style="margin:6px 0; white-space:pre-wrap;">{% if is_state('input_select.kitchen_stream_source','Music Stream 1') %}
  media_player.picore_house
{% else %}
  media_player.ma_wiim_mini
{% endif %}</pre>
           </pre>
          </div>
        </div>
      </div>
    `:y`
                <div class="form-row">
                  <ha-generic-picker
                    .hass=${this.hass}
                    .value=${this._isEntityId(e?.music_assistant_entity)?e.music_assistant_entity:""}
                    .label=${p("editor.fields.ma_entity")}
                    .valueRenderer=${a=>this._entityValueRenderer(a)}
                    .rowRenderer=${a=>this._entityRowRenderer(a)}
                    .getItems=${this._getEntityItems(["media_player"])}
                    @value-changed=${a=>this._updateEntityProperty("music_assistant_entity",a.detail.value)}
                    allow-custom-value
                  ></ha-generic-picker>
                </div>
                ${(()=>{const a=e?.entity_id,s=a?this.hass?.states?.[a]:void 0,n=s?Ot(s):!1,l=e?.music_assistant_entity,c=this._looksLikeTemplate?.(l),d=typeof l=="string"&&!c?l:void 0,h=d?this.hass?.states?.[d]:void 0,u=h?Ot(h):!1;return n||u?y`
                    <div class="form-row">
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{select:{mode:"dropdown",multiple:!0,options:[{value:"artist",label:"Artist"},{value:"album",label:"Album"},{value:"track",label:"Track"},{value:"playlist",label:"Playlist"},{value:"radio",label:"Radio"},{value:"podcast",label:"Podcast"},{value:"episode",label:"Episode"}]}}}
                        .value=${Array.isArray(e?.hidden_filter_chips)?e.hidden_filter_chips:[]}
                        label="${p("editor.fields.hidden_chips")}"
                        helper="${p("editor.subtitles.hide_search_chips")}"
                        @value-changed=${m=>this._updateEntityProperty("hidden_filter_chips",m.detail.value)}
                      ></ha-selector>
                    </div>
                  `:k})()}
              `}

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="prefer-ma-metadata-toggle"
              .checked=${e?.prefer_ma_metadata??!1}
              .disabled=${!e?.music_assistant_entity||e.music_assistant_entity.trim()===""}
              @change=${a=>this._updateEntityProperty("prefer_ma_metadata",a.target.checked)}
            ></ha-switch>
            <label for="prefer-ma-metadata-toggle">${p("editor.labels.prefer_ma_metadata")}</label>
          </div>
          <div class="config-subtitle">${p("editor.subtitles.prefer_ma_metadata")}</div>
        </div>

        <div class="form-row">
          <ha-switch
            id="disable-auto-select-toggle"
            .checked=${e?.disable_auto_select??!1}
            @change=${a=>this._updateEntityProperty("disable_auto_select",a.target.checked)}
          ></ha-switch>
          <label for="disable-auto-select-toggle">${p("editor.labels.disable_auto_select")}</label>
          <div class="config-subtitle">${p("editor.subtitles.disable_auto_select")}</div>
        </div>

        ${i?y`
                <div class="form-row">
                  <ha-switch
                    id="group-volume-toggle"
                    .checked=${e?.group_volume??!0}
                    @change=${a=>this._updateEntityProperty("group_volume",a.target.checked)}
                  ></ha-switch>
                  <label for="group-volume-toggle">Group Volume</label>
                </div>
              `:k}

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="follow-active-toggle"
              .checked=${e?.follow_active_volume??!1}
              @change=${a=>this._updateEntityProperty("follow_active_volume",a.target.checked)}
            ></ha-switch>
            <label for="follow-active-toggle">${p("editor.labels.follow_active_entity")}</label>
          </div>
          ${e?.follow_active_volume??!1?k:y`
                  <div>
                    <ha-switch
                      id="vol-template-toggle"
                      .checked=${this._useVolTemplate??this._looksLikeTemplate(e?.volume_entity)}
                      @change=${a=>{this._useVolTemplate=a.target.checked}}
                    ></ha-switch>
                    <label for="vol-template-toggle"
                      >${p("editor.labels.use_vol_template")}</label
                    >
                  </div>
                `}
        </div>

        ${e?.follow_active_volume??!1?k:y`
                ${this._useVolTemplate??this._looksLikeTemplate(e?.volume_entity)?y`
                      <div class="form-row">
                        <div
                          class=${this._yamlError&&(e?.volume_entity??"").trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                        >
                          <ha-code-editor
                            id="vol-template-editor"
                            label="${p("editor.fields.vol_template")}"
                            .hass=${this.hass}
                            mode="jinja2"
                            autocomplete-entities
                            .value=${e?.volume_entity??""}
                            @value-changed=${a=>this._updateEntityProperty("volume_entity",a.detail.value)}
                          ></ha-code-editor>
                          <div class="help-text">
                            <ha-icon icon="mdi:information-outline"></ha-icon>
                            ${p("editor.subtitles.jinja_template_vol_hint")}
                            <pre style="margin:6px 0; white-space:pre-wrap;">
{% if is_state('input_boolean.tv_volume','on') %}
  remote.soundbar
{% else %}
  media_player.office_homepod
{% endif %}</pre
                            >
                          </div>
                        </div>
                      </div>
                    `:y`
                      <div class="form-row">
                        <ha-generic-picker
                          .hass=${this.hass}
                          .value=${this._isEntityId(e?.volume_entity)?e.volume_entity:e?.entity_id??""}
                          .label=${p("editor.fields.vol_entity")}
                          .valueRenderer=${a=>this._entityValueRenderer(a)}
                          .rowRenderer=${a=>this._entityRowRenderer(a)}
                          .getItems=${this._getEntityItems(["media_player","remote"])}
                          @value-changed=${a=>{const s=a.detail.value;this._updateEntityProperty("volume_entity",s),(!s||s===e.entity_id)&&this._updateEntityProperty("sync_power",!1)}}
                          allow-custom-value
                        ></ha-generic-picker>
                      </div>
                    `}
              `}

        ${e?.volume_entity&&e.volume_entity!==e.entity_id&&!(e?.follow_active_volume??!1)?y`
                <div class="form-row form-row-multi-column">
                  <div>
                    <ha-switch
                      id="sync-power-toggle"
                      .checked=${e?.sync_power??!1}
                      @change=${a=>this._updateEntityProperty("sync_power",a.target.checked)}
                    ></ha-switch>
                    <label for="sync-power-toggle">Sync Power</label>
                  </div>
                </div>
              `:k}

        ${e?.follow_active_volume?y`
                <div class="help-text">
                  <ha-icon icon="mdi:information-outline"></ha-icon>
                  ${p("editor.subtitles.follow_active_entity")}
                  <br /><br />
                </div>
              `:k}
        </div>
      `}_renderActionEditor(e){const t=this._actionMode??this._deriveActionMode(e);return y`
        <div class="action-editor-header">
          <ha-icon
            class="icon-button"
            icon="mdi:chevron-left"
            @click=${this._onBackFromActionEditor}>
          </ha-icon>
          <div class="action-editor-title">${p("editor.titles.edit_action")}</div>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            class="full-width"
            .selector=${{text:{}}}
            label="${p("editor.fields.name")} (Icon Only)"
            .value=${e?.name??""}
            @value-changed=${i=>this._updateActionProperty("name",i.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-icon-picker
            label="${p("editor.fields.icon")}"
            .hass=${this.hass}
            .value=${e?.icon??""}
            @value-changed=${i=>this._updateActionProperty("icon",i.detail.value)}
          ></ha-icon-picker>
        </div>
 
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              label="${p("editor.fields.placement")}"
              .disabled=${t==="sync_selected_entity"||t==="select_entity"}
              .selector=${{select:{mode:"dropdown",options:[{value:"chip",label:p("editor.placements.chip")},{value:"menu",label:p("editor.placements.menu")},{value:"hidden",label:p("editor.placements.hidden")}]}}}
              .value=${e?.in_menu==="hidden"?"hidden":e?.in_menu?"menu":"chip"}
              @value-changed=${i=>{const a=i.detail.value;let s=!1;a==="menu"?s=!0:a==="hidden"&&(s="hidden"),this._updateActionProperty("in_menu",s),a!=="hidden"&&this._updateActionProperty("card_trigger","none")}}
            ></ha-selector>
          </div>
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              label="${p("editor.fields.card_trigger")}"
              .disabled=${t==="sync_selected_entity"||t==="select_entity"||e?.in_menu!=="hidden"}
              .selector=${{select:{mode:"dropdown",options:[{value:"none",label:p("editor.triggers.none")},{value:"tap",label:p("editor.triggers.tap")},{value:"hold",label:p("editor.triggers.hold")},{value:"double_tap",label:p("editor.triggers.double_tap")},{value:"swipe_left",label:p("editor.triggers.swipe_left")},{value:"swipe_right",label:p("editor.triggers.swipe_right")}]}}}
              .value=${e?.card_trigger||"none"}
              @value-changed=${i=>this._updateActionProperty("card_trigger",i.detail.value)}
            ></ha-selector>
          </div>
        </div>
        ${e?.in_menu==="hidden"&&(!e?.card_trigger||e?.card_trigger==="none")&&t!=="sync_selected_entity"&&t!=="select_entity"?y`
                <div class="help-text">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  ${p("editor.placements.hidden")}
                  (${p("editor.placements.not_triggerable")})
                </div>
              `:k}

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            label="${p("editor.fields.action_type")}"
            .selector=${{select:{mode:"dropdown",options:[{value:"menu",label:p("editor.action_types.menu")},{value:"service",label:p("editor.action_types.service")},{value:"navigate",label:p("editor.action_types.navigate")},{value:"sync_selected_entity",label:p("editor.action_types.sync_selected_entity")},{value:"select_entity",label:p("editor.action_types.select_entity")},{value:"prev_entity",label:p("editor.action_types.prev_entity")||"Previous Entity Chip"},{value:"next_entity",label:p("editor.action_types.next_entity")||"Next Entity Chip"},{value:"toggle_lyrics",label:p("editor.action_types.toggle_lyrics")||"Toggle Lyrics Overlay"}]}}}
            .value=${this._actionMode??this._deriveActionMode(e)}
            @value-changed=${i=>{const a=i.detail.value;this._actionMode=a,a==="service"?(this._updateActionProperty("menu_item",void 0),this._updateActionProperty("navigation_path",void 0),this._updateActionProperty("navigation_new_tab",void 0),this._updateActionProperty("action",void 0),this._config.actions?.[this._actionEditorIndex]?.service||this._updateActionProperty("service","")):a==="menu"?(this._updateActionProperty("service",void 0),this._updateActionProperty("service_data",void 0),this._updateActionProperty("script_variable",void 0),this._updateActionProperty("navigation_path",void 0),this._updateActionProperty("navigation_new_tab",void 0),this._updateActionProperty("action",void 0)):a==="navigate"?(this._updateActionProperty("menu_item",void 0),this._updateActionProperty("service",void 0),this._updateActionProperty("service_data",void 0),this._updateActionProperty("script_variable",void 0),this._updateActionProperty("action","navigate"),e?.navigation_path||this._updateActionProperty("navigation_path","")):a==="sync_selected_entity"?(this._updateActionProperty("menu_item",void 0),this._updateActionProperty("service",void 0),this._updateActionProperty("service_data",void 0),this._updateActionProperty("script_variable",void 0),this._updateActionProperty("navigation_path",void 0),this._updateActionProperty("navigation_new_tab",void 0),this._updateActionProperty("action","sync_selected_entity"),this._updateActionProperty("in_menu","hidden"),this._updateActionProperty("card_trigger","none"),e?.sync_entity_type||this._updateActionProperty("sync_entity_type","yamp_entity")):a==="select_entity"?(this._updateActionProperty("menu_item",void 0),this._updateActionProperty("service",void 0),this._updateActionProperty("service_data",void 0),this._updateActionProperty("script_variable",void 0),this._updateActionProperty("navigation_path",void 0),this._updateActionProperty("navigation_new_tab",void 0),this._updateActionProperty("action","select_entity"),this._updateActionProperty("in_menu","hidden"),this._updateActionProperty("card_trigger","none"),e?.sync_entity_type||this._updateActionProperty("sync_entity_type","yamp_entity")):a==="prev_entity"||a==="next_entity"?(this._updateActionProperty("menu_item",void 0),this._updateActionProperty("service",void 0),this._updateActionProperty("service_data",void 0),this._updateActionProperty("script_variable",void 0),this._updateActionProperty("navigation_path",void 0),this._updateActionProperty("navigation_new_tab",void 0),this._updateActionProperty("action",a)):a==="toggle_lyrics"&&(this._updateActionProperty("menu_item",void 0),this._updateActionProperty("service",void 0),this._updateActionProperty("service_data",void 0),this._updateActionProperty("script_variable",void 0),this._updateActionProperty("navigation_path",void 0),this._updateActionProperty("navigation_new_tab",void 0),this._updateActionProperty("action","toggle_lyrics"))}}
          ></ha-selector>
        </div>

        
        ${t==="menu"?y`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    label="${p("editor.fields.menu_item")}"
                    .selector=${{select:{mode:"dropdown",options:[{value:"",label:""},{value:"search",label:"Search"},{value:"search-recently-played",label:"Recently Played"},{value:"search-next-up",label:"Next Up"},{value:"source",label:"Source"},{value:"more-info",label:"More Info"},{value:"group-players",label:"Group Players"},{value:"transfer-queue",label:"Transfer Queue"}]}}}
                    .value=${e?.menu_item??""}
                    @value-changed=${i=>this._updateActionProperty("menu_item",i.detail.value||void 0)}
                  ></ha-selector>
                </div>
              `:k} 
        ${t==="navigate"?y`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    class="full-width"
                    .selector=${{text:{}}}
                    label="${p("editor.fields.nav_path")} (/lovelace/music or #popup)"
                    .value=${e?.navigation_path??""}
                    @value-changed=${i=>{this._updateActionProperty("navigation_path",i.detail.value),this._updateActionProperty("action","navigate")}}
                  ></ha-selector>
                </div>
                <div class="form-row form-row-multi-column">
                  <div>
                    <ha-switch
                      id="navigation-new-tab-toggle"
                      .checked=${e?.navigation_new_tab??!1}
                      @change=${i=>this._updateActionProperty("navigation_new_tab",i.target.checked)}
                    ></ha-switch>
                    <label for="navigation-new-tab-toggle">Open External URLs in New Tab</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="config-subtitle">
                    Supports dashboard paths, URLs, and anchors (e.g.,
                    <code>/lovelace/music</code> or <code>#pop-up-menu</code>).
                  </div>
                </div>
              `:k}
        ${t==="sync_selected_entity"||t==="select_entity"?y`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"input_text"}}}
                    .value=${e?.sync_entity_helper??""}
                    label="${p("editor.fields.selected_entity_helper")}"
                    @value-changed=${i=>this._updateActionProperty("sync_entity_helper",i.detail.value)}
                  ></ha-selector>
                  <div class="config-subtitle">
                    ${p(t==="select_entity"?"editor.subtitles.select_entity_helper":"editor.subtitles.selected_entity_helper")}
                  </div>
                </div>
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    label="${p("editor.fields.sync_entity_type")}"
                    .selector=${{select:{mode:"dropdown",options:[{value:"yamp_entity",label:p("editor.sync_entity_options.yamp_entity")},{value:"yamp_main_entity",label:p("editor.sync_entity_options.yamp_main_entity")},{value:"yamp_playback_entity",label:p("editor.sync_entity_options.yamp_playback_entity")}]}}}
                    .value=${e?.sync_entity_type??"yamp_entity"}
                    @value-changed=${i=>this._updateActionProperty("sync_entity_type",i.detail.value)}
                  ></ha-selector>
                  <div class="config-subtitle">
                    ${p("editor.subtitles.sync_entity_type")}
                  </div>
                </div>
              `:k}
        ${t==="service"?y`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{select:{mode:"dropdown",filterable:!0,options:this._serviceItems||[]}}}
                    .value=${e.service??""}
                    label="${p("editor.fields.service")}"
                    @value-changed=${i=>this._updateActionProperty("service",i.detail.value)}
                  ></ha-selector>
                </div>

                ${typeof e.service=="string"&&e.service.startsWith("script.")?y`
                      <div class="form-row form-row-multi-column">
                        <div>
                          <ha-switch
                            id="script-variable-toggle"
                            .checked=${e?.script_variable??!1}
                            @change=${i=>this._updateActionProperty("script_variable",i.target.checked)}
                          ></ha-switch>
                          <span>${p("editor.labels.script_var")}</span>
                        </div>
                      </div>
                    `:k}
                ${typeof e.service=="string"?y`
                      <div class="help-text">
                        <ha-icon icon="mdi:information-outline"></ha-icon>

                        ${p("editor.subtitles.entity_current_hint")}
                      </div>
                      <div class="help-text">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        ${p("editor.subtitles.service_data_note")}
                      </div>
                      <div class="form-row">
                        <div class="service-data-editor-header">
                          <div class="service-data-editor-title">
                            ${p("editor.titles.service_data")}
                          </div>
                          <div class="service-data-editor-actions">
                            <ha-icon
                              class="icon-button ${this._yamlModified?"":"icon-button-disabled"}"
                              icon="mdi:content-save"
                              title="${p("editor.fields.save_service_data")}"
                              @click=${this._saveYamlEditor}
                            ></ha-icon>
                            <ha-icon
                              class="icon-button ${this._yamlModified?"":"icon-button-disabled"}"
                              icon="mdi:backup-restore"
                              title="${p("editor.fields.revert_service_data")}"
                              @click=${this._revertYamlEditor}
                            ></ha-icon>
                            <ha-icon
                              class="icon-button ${this._yamlError||this._yamlDraftUsesCurrentEntity()||!e?.service?"icon-button-disabled":""}"
                              icon="mdi:play-circle-outline"
                              title="${p("editor.fields.test_action")}"
                              @click=${this._testServiceCall}
                            ></ha-icon>
                          </div>
                        </div>
                        <div
                          class=${this._yamlError&&this._yamlDraft.trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                        >
                          <ha-code-editor
                            id="service-data-editor"
                            label="${p("editor.fields.service_data")}"
                            autocomplete-entities
                            autocomplete-icons
                            .hass=${this.hass}
                            mode="yaml"
                            .value=${e?.service_data?Lt.dump(e.service_data):""}
                            @value-changed=${i=>{this._yamlDraft=i.detail.value,this._yamlModified=!0;try{const a=Lt.load(this._yamlDraft);a&&typeof a=="object"?this._yamlError=null:this._yamlError="Invalid YAML"}catch(a){this._yamlError=a.message}}}
                          ></ha-code-editor>
                          ${this._yamlError&&this._yamlDraft.trim()!==""?y`<div class="yaml-error-message">${this._yamlError}</div>`:k}
                        </div>
                      </div>
                    `:k}
              `:k}
      </div>`}_onEntityChanged(e,t){const i=[...this._config.entities??[]];t?i[e]={...i[e],entity_id:t}:i.splice(e,1);const a=i.filter(s=>s.entity_id&&s.entity_id.trim()!=="");this._updateConfig("entities",a)}_onActionChanged(e,t){const i=[...this._config.actions??[]];i[e]={...i[e],name:t},this._updateConfig("actions",i)}_getActionHelperText(e){const t=e?.in_menu,i=t==="hidden"?"hidden":t===!0?"menu":"chip",a=e?.card_trigger;let s="";i==="menu"?s=" \u2022 In Menu":i==="hidden"&&e?.action!=="sync_selected_entity"&&e?.action!=="select_entity"&&(!a||a==="none"?s=` \u2022 ${p("editor.placements.hidden")} (${p("editor.placements.not_triggerable")})`:s=` \u2022 ${p("editor.placements.hidden")}`);let n="";if(a&&a!=="none"&&(n=` \u2022 Trigger: ${p(`editor.triggers.${a}`)}`),e?.action==="select_entity")return`${p("editor.action_helpers.select_entity")} ${e.sync_entity_helper||p("editor.action_helpers.select_helper")}${s}${n}`;if(e?.action==="sync_selected_entity")return`${p("editor.action_helpers.sync_selected_entity")} ${e.sync_entity_helper||p("editor.action_helpers.select_helper")}${s}${n}`;if(e?.action==="prev_entity")return`${p("editor.action_types.prev_entity")||"Previous Entity Chip"}${s}${n}`;if(e?.action==="next_entity")return`${p("editor.action_types.next_entity")||"Next Entity Chip"}${s}${n}`;if(e?.menu_item)return`Open Menu Item: ${e.menu_item}${s}${n}`;if(e?.service)return`Call Service: ${e.service}${s}${n}`;if(e?.navigation_path||e?.action==="navigate"){const l=e?.navigation_new_tab?" (New Tab)":"";return`Navigate to ${e.navigation_path||"(missing path)"}${l}${s}${n}`}return s||n?`Not Configured${s}${n}`:"Not Configured"}_onEditEntity(e){this._entityEditorIndex=e;const t=this._config.entities?.[e],i=t?.music_assistant_entity;this._useTemplate=!!this._looksLikeTemplate(i);const a=t?.volume_entity;this._useVolTemplate=!!this._looksLikeTemplate(a)}_onEditAction(e){this._actionEditorIndex=e;const t=this._config.actions?.[e];this._actionMode=this._deriveActionMode(t),this._actionMode==="service"&&typeof t?.service!="string"&&this._updateActionProperty("service","")}_onBackFromEntityEditor(){this._entityEditorIndex=null,this._useTemplate=null,this._useVolTemplate=null}_onBackFromActionEditor(){this._actionEditorIndex=null,this._actionMode=null}_onEntityMoved(e){const{oldIndex:t,newIndex:i}=e.detail,a=[...this._config.entities];if(t>=a.length||i>=a.length)return;const[s]=a.splice(t,1);a.splice(i,0,s),this._updateConfig("entities",a)}_onActionMoved(e){const{oldIndex:t,newIndex:i}=e.detail,a=[...this._config.actions];if(t>=a.length||i>=a.length)return;const[s]=a.splice(t,1);a.splice(i,0,s),this._updateConfig("actions",a)}_removeAction(e){const t=[...this._config.actions??[]];e<0||e>=t.length||(t.splice(e,1),this._updateConfig("actions",t))}_toggleActionInMenu(e){const t=[...this._config.actions??[]];if(!t[e])return;const i=!!t[e].in_menu,a={...t[e],in_menu:!i};delete a.placement,t[e]=a,this._updateConfig("actions",t)}_saveYamlEditor(){try{const e=Lt.load(this._yamlDraft);if(!e||typeof e!="object"){this._yamlError="YAML is not a valid object.";return}this._updateActionProperty("service_data",e),this._yamlDraft=Lt.dump(e),this._yamlError=null,this._parsedYaml=e}catch(e){this._yamlError=e.message}}_revertYamlEditor(){const e=this.shadowRoot.querySelector("#service-data-editor"),t=this._config.actions?.[this._actionEditorIndex];if(!e||!t)return;const i=t.service_data?Lt.dump(t.service_data):"";e.value=i,this._yamlDraft=i,this._yamlError=null,this._yamlModified=!1}_yamlDraftUsesCurrentEntity(){return this._yamlDraft?/^\s*entity_id\s*:\s*current\s*$/m.test(this._yamlDraft):!1}async _testServiceCall(){if(this._yamlError||!this._yamlDraft?.trim())return;let e;try{if(e=Lt.load(this._yamlDraft),typeof e!="object"||e===null){console.error("yamp: Service data must be a valid object.");return}}catch(s){this._yamlError=s.message;return}const t=this._config.actions?.[this._actionEditorIndex]?.service;if(!t||!this.hass)return;const[i,a]=t.split(".");if(!(!i||!a))try{await this.hass.callService(i,a,e)}catch(s){console.error("yamp: Failed to call service:",s)}}_onToggleChanged(e){const t={...this._config,always_collapsed:e.target.checked};this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_looksLikeUrlOrPath(e){return e?e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")||e.includes(".jpg")||e.includes(".jpeg")||e.includes(".png")||e.includes(".gif")||e.includes(".webp"):!1}}customElements.define("yet-another-media-player-editor",Cl);var Il=Object.defineProperty,Tl=(r,e,t)=>e in r?Il(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,nt=(r,e,t)=>Tl(r,typeof e!="symbol"?e+"":e,t);const Ml=500,Hr=3e3,Pl=30,Br=Object.freeze(["details","menu","action_chips"]),zl=Object.freeze([...Br]),jl=Object.freeze({details:"--yamp-text-scale-details",menu:"--yamp-text-scale-menu",action_chips:"--yamp-text-scale-action-chips"}),Gr=500,Gt=15,Qr=300,Dl=500,Fl=300,Wr=50,Ol=Object.freeze(["_showSearchInSheet","_showGrouping","_showSourceList","_lyricsActive","_showEntityOptions","_showTransferQueue","_showSourceMenu","_showResolvedEntities","_showMediaTitleOptions"]);window.customCards=window.customCards||[],window.customCards.some(r=>r.type==="yet-another-media-player")||window.customCards.push({type:"yet-another-media-player",name:"Yet Another Media Player",description:"YAMP is a multi-entity media card with custom actions",preview:!0,getEntitySuggestion:(r,e)=>e.split(".")[0]!=="media_player"?null:{config:{type:"custom:yet-another-media-player",entities:[e]}}});class Wa extends dt{constructor(){super(),nt(this,"_lastChipDoubleTapTime",0),nt(this,"_hoveredSourceLetterIndex",null),nt(this,"_lastGroupingMasterId",null),nt(this,"_groupedSortedCache",null),nt(this,"_cardTriggers",{tap:null,hold:null,double_tap:null,swipe_left:null,swipe_right:null}),nt(this,"_lastHassVersion",null),nt(this,"_debouncedVolumeTimer",null),this._selectedIndex=0,this._lastSyncedEntityId=null,this._lastPlaying=null,this._manualSelect=!1,this._lastActiveEntityId=null,this._playTimestamps={},this._lastMediaTitle=null,this._showSourceMenu=!1,this._shouldDropdownOpenUp=!1,this._collapsedArtDominantColor="#444",this._lastArtworkUrl=null,this._addToPlaylistTarget=null,this._progressTimer=null,this._progressValue=null,this._lastProgressEntityId=null,this._pinnedIndex=null,this._sourceDropdownOutsideHandler=null,this._isIdle=!1,this._idleTimeout=null,this._showEntityOptions=!1,this._showMediaTitleOptions=!1,this._dismissMenuAfterPlaylistAdd=!1,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._cardHeightTemplate=null,this._cardHeightTemplateResult=null,this._cardHeightTemplateNeedsResolve=!1,this._resolvingCardHeightTemplate=!1,this._lastCardHeightContextKey=null,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._hasTransferQueueForCurrent=!1,this._transferQueueAutoCloseTimer=null,this._alternateProgressBar=!1,this._groupBaseVolume=null,this._searchQuery="",this._searchLoading=!1,this._searchResults=[],this._searchDisplaySortOverride=null,this._searchError="",this._searchTotalRows=15,this._searchResultsByType={},this._currentSearchQuery="",this._latestSearchToken=0,this._latestManualShiftTime=0,this._searchTimeoutHandle=null,this._swapPauseForStop=!1,this._controlLayout="classic",this._searchHierarchy=[],this._searchBreadcrumb="",this._playbackLingerByIdx={},this._lastResolvedEntityIdByChip={},this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._showQueueSuccessMessage=!1,this._searchActiveOptionsItem=null,this._volumeDraggingEntity=null,this._dragVolume=0,this._activeSearchRowMenuId=null,this._loadingSearchRowMenuId=null,this._errorSearchRowMenuId=null,this._successSearchRowMenuId=null,this._successSearchRowType=null,this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._radioModeActive=!1,this._massQueueAvailable=!1,this._hasMassQueueIntegration=null,this._checkingMassQueueIntegration=!1,this._lyricsCache=new Map,this._quickMenuInvoke=!1,this._collapsedBaselineHeight=220,this._lastRenderedCollapsed=!1,this._lastRenderedHideControls=!1,this._artworkObjectFit="cover",this._idleScreen="default",this._idleScreenApplied=!1,this._hasSeenPlayback=!1,this._adaptiveText=!1,this._textResizeObserver=null,this._currentTextScale=null,this._adaptiveTextTargets=new Set,this._idleImageTemplate=null,this._idleImageTemplateResult="",this._resolvingIdleImageTemplate=!1,this._idleImageTemplateNeedsResolve=!1,this._artworkOverrideTemplateCache={},this._artworkOverrideIndexMap=null,this._hideActiveEntityLabel=!1,this._hideActiveEntityLabelOnIdle=!1,this._currentDetailsScale=null,this._lastTitleLength=0,this._massLyrics=[],this._lastLyricsTrackId=null,this._lastLyricsArtist=null,this._lastLyricsTitle=null,this._lastLyricsEntityId=null,this._lyricsActive=!1,this._fetchingLyrics=!1,this._fetchingCacheKey=null,this._lyricsError=!1,this._suspendAdaptiveScaling=!1,this._pendingAdaptiveScaleUpdate=!1,this._adaptiveScrollTimer=null,this._lyricsFetchTimeout=null,this._handleGlobalScroll=this._handleGlobalScroll.bind(this),this._handleViewportResize=this._handleViewportResize.bind(this),this._isNarrowViewport=!1,setTimeout(()=>{if(this._cardType==="search"){this._showEntityOptions=!0,this._setIdleState(!1),this._showSearchSheetInOptions(),this.requestUpdate();return}if(this._cardType==="group_players"){this._showEntityOptions=!0,this._setIdleState(!1),this._showGrouping=!0,this.requestUpdate();return}if(this.hass&&this.entityIds&&this.entityIds.length>0){const e=this.hass.states[this.entityIds[this._selectedIndex]],t=this._playbackLingerByIdx?.[this._selectedIndex]&&this._playbackLingerByIdx[this._selectedIndex].until>Date.now(),i=this.entityIds.some((n,l)=>{if(this._isAutoSelectDisabled(l))return!1;const c=this.hass.states[n];return this._isEntityPlaying(c)}),a=this._isAutoSelectDisabled(this._selectedIndex),s=this._isEntityPlaying(e)&&(!a||this._manualSelect);e&&!s&&!i&&!t&&this._idleTimeoutMs>0&&(this._setIdleState(!0),this.requestUpdate())}},0),this._prevCollapsed=null,this._searchAttempted=!1,this._searchMediaClassFilter="all",this._lastSearchChipClasses="",this._swipeStartX=null,this._searchSwipeAttached=!1,this._manualSelectPlayingSet=null,this._idleTimeoutMs=6e4,this._volumeStep=.05,this._searchInputAutoFocused=!1,this._disableSearchAutofocus=!1,this._optimisticPlayback=null,this._lastPlaybackEntityId=null,this._entitySwitchDebounceTimer=null,this._lastMainState=null,this._lastMaState=null,this._maResolveCache={},this._maResolveTtlMs=7e3,this._manualSelectTimeout=null,this._templateSubscriptions={},this._activeSubscriptionTokens={},this._maTemplateValues={},this._volTemplateValues={},this._actionInMenuTemplateValues={},this._actionInMenuResolveCache={},this._lastActionEntityId=null,this._volResolveCache={},this._volResolveTtlMs=7e3,this._lastPlayingEntityId=null,this._controlFocusEntityId=null,this._lastActiveEntityIdByChip={},this._playerStateCache={},this._volumeOverlayActive=!1,this._volumeOverlayValue=0,this._volumeOverlayTimer=null,this._internalVolumeSuppressTimer=null,this._lastTrackedVolumeLevel=null,this._lastTrackedVolEntityId=null,this._volumeOverlayMuted=!1,this._internalVolumeChangeFlag=!1,this._showVolumeOverlay=!1}_handleChipPointerDown(e,t){this._chipGestureStartX=e.clientX,this._chipGestureStartY=e.clientY,this._holdToPin&&this._holdHandler&&this._holdHandler.pointerDown(e,t)}_applyIdleScreen(){if(!this._idleScreenApplied){switch(this._idleScreen||"default"){case"search":this._showEntityOptions=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showResolvedEntities=!1,this._showSearchSheetInOptions("default");break;case"search-recently-played":this._showEntityOptions=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showResolvedEntities=!1,this._showSearchSheetInOptions("recently-played");break;case"search-next-up":this._showEntityOptions=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showResolvedEntities=!1,this._showSearchSheetInOptions("next-up");break;default:return}this._idleScreenApplied=!0}}_getSearchDismissBehavior(){const e=this.config.dismiss_search_on_play!==!1,t=this._cardType==="search";return{shouldDismiss:!t&&e,shouldReset:t&&e}}_resetIdleScreen(){if(!this._idleScreenApplied)return;const{shouldDismiss:e,shouldReset:t}=this._getSearchDismissBehavior();switch(this._idleScreen){case"search":case"search-recently-played":case"search-next-up":if(e)this._hideSearchSheetInOptions(),this._showEntityOptions=!1;else if(t)this._showSearchSheetInOptions();else{this._idleScreenApplied=!1;return}break}this._idleScreenApplied=!1,this.requestUpdate()}_handleChipPointerMove(e,t){this._holdToPin&&this._holdHandler&&this._holdHandler.pointerMove(e,t)}_handleChipPointerUp(e,t){if(this._holdToPin&&this._holdHandler&&this._holdHandler.pointerUp(e,t),e.pointerType!=="touch"&&e.pointerType!=="pen"||e.type!=="pointerup")return;const i=e.clientX-this._chipGestureStartX,a=e.clientY-this._chipGestureStartY,s=Math.abs(i),n=Math.abs(a);if(s>Gt||n>Gt)return;const l=Date.now(),c=l-(this._lastChipTapTime||0);this._lastChipTapTime=l,c<Qr&&this._lastChipTapIdx===t&&(this._lastChipTapTime=0,this._lastChipDoubleTapTime=l,this._quickGroupingMode=!this._quickGroupingMode,this.requestUpdate()),this._lastChipTapIdx=t}_supportsFeature(e,t){return!e||typeof e.attributes.supported_features!="number"?!1:(e.attributes.supported_features&t)!==0}_isGroupCapable(e){return!e||e.attributes?.mass_player_type==="group"?!1:this._supportsFeature(e,Ds)?!0:Array.isArray(e.attributes?.group_members)}_isCurrentlyGrouped(e){return this._isGroupCapable(e)?Array.isArray(e?.attributes?.group_members)&&e.attributes.group_members.length>1:!1}_findAssociatedButtonEntities(e){return wo(this.hass,e)}_cleanTrackMetadata(e){return!e||typeof e!="string"?"":e.split(" - ")[0].replace(/\(feat\..*?\)/gi,"").replace(/\(with.*?\)/gi,"").replace(/\[.*?\]/g,"").replace(/\(.*?\)/g,"").replace(/- \d{4} Remaster.*/gi,"").replace(/- Remastered.*/gi,"").replace(/- Single.*/gi,"").trim()}_getFavoriteButtonEntity(){if(!this.entityObjs[this._selectedIndex])return null;const e=this._getActivePlaybackEntityId(this._selectedIndex);if(!e)return null;const t=this.hass?.states?.[e];return!t||!Ot(t)?null:this._findAssociatedButtonEntities(e).find(i=>i.friendly_name.toLowerCase().includes("favorite")||i.friendly_name.toLowerCase().includes("like")||i.device_class==="favorite"||i.entity_id.toLowerCase().includes("favorite"))?.entity_id||null}_getMusicAssistantState(){const e=this._getActivePlaybackEntityId(this._selectedIndex);return e?ko(this.hass,e):null}_isCurrentTrackFavorited(){if(!this.entityObjs[this._selectedIndex])return!1;const e=this._getMusicAssistantState();if(!e)return!1;const t=e.attributes?.media_content_id;if(!t)return!1;if(typeof e.attributes?.is_favorite=="boolean")return e.attributes.is_favorite;if(this._favoriteStatusCache&&this._favoriteStatusCache[t]!==void 0){const i=this._favoriteStatusCache[t];if(typeof i=="object"&&i.isFavorited!==void 0)return i.isFavorited;if(typeof i=="boolean")return i}return(!this._checkingFavorites||this._checkingFavorites!==t)&&(this._checkingFavorites=t,this._checkFavoriteStatusAsync(t)),!1}async _checkFavoriteStatusAsync(e){if(!(!e||!this.hass))try{const t=this._getMusicAssistantState(),i=t?.entity_id,a=t.attributes?.media_title,s=t.attributes?.media_artist,n=await Uo(this.hass,e,i,a,s,200);this._favoriteStatusCache||(this._favoriteStatusCache={}),this._favoriteStatusCache[e]={isFavorited:n},this._checkingFavorites=null,this.requestUpdate()}catch{this._checkingFavorites=null}}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this._handleGlobalScroll,{passive:!0}),window.addEventListener("resize",this._handleViewportResize,{passive:!0}),this._updateViewportFlags(),this._updateAdaptiveTextObserverState()}_scrollToSourceLetter(e){const t=this.renderRoot.querySelector(".entity-options-sheet");if(!t)return;const i=Array.from(t.querySelectorAll(".entity-options-item")).find(a=>(a.textContent||"").trim().toUpperCase().startsWith(e));i&&i.scrollIntoView({behavior:"smooth",block:"center"})}_shouldShowStopButton(e){if(!this._supportsFeature(e,vo))return!1;const t=this.renderRoot?.querySelector(".controls-row");if(!t)return!0;const i=t.offsetWidth>480,a=!!this._getFavoriteButtonEntity()&&!this._getHiddenControlsForCurrentEntity().favorite,s=Ea(e,(n,l)=>this._supportsFeature(n,l),a,this._getHiddenControlsForCurrentEntity(),!0,this._controlLayout);return i||s<=5}_isAutoSelectDisabled(e){const t=this.config.entities[e];return typeof t=="string"?!1:!!t.disable_auto_select}get sortedEntityIds(){return this.entityIds.map((e,t)=>{const i=this._isAutoSelectDisabled(t),a=i?0:this._playTimestamps[e]||0;return{id:e,idx:t,ts:a,disabled:i}}).sort((e,t)=>e.disabled!==t.disabled?e.disabled-t.disabled:e.ts===t.ts?e.idx-t.idx:t.ts-e.ts).map(e=>e.id)}get groupedSortedEntityIds(){const e=this.entityIds;if(!e||!Array.isArray(e))return[];if(this._groupedSortedCache&&this.hass===this._lastHassVersion)return this._groupedSortedCache;const t=new Set(e),i={};for(let s=0;s<e.length;s++){const n=e[s];let l=this._getGroupKey(n);(this._quickGroupingMode||!t.has(l))&&(l=n),i[l]||(i[l]={ids:[],ts:0,minIdx:s,allDisabled:!0}),i[l].ids.push(n);const c=this._isAutoSelectDisabled(s),d=c?0:this._playTimestamps[n]||0;c||(i[l].allDisabled=!1),i[l].ts=Math.max(i[l].ts,d)}const a=Object.values(i).sort((s,n)=>s.allDisabled!==n.allDisabled?s.allDisabled-n.allDisabled:n.ts===s.ts?s.minIdx-n.minIdx:n.ts-s.ts).map(s=>s.ids.sort());return this._groupedSortedCache=a,this._lastHassVersion=this.hass,a}get _cardType(){return this.config?.card_type||"default"}get _isSpecializedCard(){return this._cardType!=="default"}_subscribeToTemplate(e,t,i){if(!this.hass||!this.hass.connection)return;const a=`${e}_${t}`;let s,n,l;if(t==="ma"?(s=this._maTemplateValues[e],n=this._maTemplateValues,l=this._maResolveCache):t==="vol"?(s=this._volTemplateValues[e],n=this._volTemplateValues,l=this._volResolveCache):t==="action_in_menu"&&(s=this._actionInMenuTemplateValues[e],n=this._actionInMenuTemplateValues,l=this._actionInMenuResolveCache),this._templateSubscriptions[a]&&s?.template===i)return;this._unsubscribeFromTemplate(e,t),n[e]={template:i,resolved:null};const c=Symbol("subToken");this._activeSubscriptionTokens[a]=c,this._templateSubscriptions[a]=c;try{const d=this._getTemplateContext(),h=`${Object.entries(d).map(([u,m])=>`{% set ${u} = ${JSON.stringify(m)} %}`).join(" ")} ${i}`;this.hass.connection.subscribeMessage(u=>{if(this._activeSubscriptionTokens[a]!==c)return;const m=(u.result||"").toString().trim();let f=!1;t==="ma"||t==="vol"?f=m&&/^([a-z0-9_]+)\.[a-zA-Z0-9_]+$/.test(m):t==="action_in_menu"&&(f=!0);let g=!1;if(n[e]&&(n[e].resolved=f?m:null),t==="ma"||t==="vol"){const v=l[e]?.id;f&&v!==m&&(l[e]={id:m,ts:Date.now()},g=!0)}else if(t==="action_in_menu"){const v=l[e]?.value;f&&v!==m&&(l[e]={value:m,ts:Date.now()},g=!0)}g&&this.requestUpdate()},{type:"render_template",template:h}).then(u=>{if(this._activeSubscriptionTokens[a]!==c)try{u()}catch{}else this._templateSubscriptions[a]=u})}catch(d){console.warn("yamp: failed to subscribe to template:",d)}}_unsubscribeFromTemplate(e,t){const i=`${e}_${t}`,a=this._templateSubscriptions[i];if(a){if(typeof a=="function")try{a()}catch{}delete this._templateSubscriptions[i],delete this._activeSubscriptionTokens[i]}}async _ensureResolvedMaForIndex(e){const t=this.entityObjs?.[e];if(!t)return;const i=t.music_assistant_entity;if(!i||typeof i!="string"){delete this._maResolveCache[e],this._unsubscribeFromTemplate(e,"ma"),this._maTemplateValues[e]&&delete this._maTemplateValues[e];return}const a=i.includes("{{")||i.includes("{%"),s=Date.now();if(!a){this._unsubscribeFromTemplate(e,"ma"),this._maTemplateValues[e]&&delete this._maTemplateValues[e],this._maResolveCache[e]={id:i,ts:s};return}this._subscribeToTemplate(e,"ma",i)}async _ensureResolvedVolForIndex(e){const t=this.entityObjs?.[e];if(!t)return;if(t.follow_active_volume){delete this._volResolveCache[e],this._unsubscribeFromTemplate(e,"vol"),this._volTemplateValues[e]&&delete this._volTemplateValues[e];return}const i=t.volume_entity;if(!i||typeof i!="string"){delete this._volResolveCache[e],this._unsubscribeFromTemplate(e,"vol"),this._volTemplateValues[e]&&delete this._volTemplateValues[e];return}const a=i.includes("{{")||i.includes("{%"),s=Date.now();if(!a){this._unsubscribeFromTemplate(e,"vol"),this._volTemplateValues[e]&&delete this._volTemplateValues[e],this._volResolveCache[e]={id:i,ts:s};return}this._subscribeToTemplate(e,"vol",i)}_ensureResolvedActions(){if(!this.hass||!this.config?.actions)return;const e=JSON.stringify(this._getTemplateContext());this._lastActionTemplateContextKey!==e&&(this.config.actions.forEach((i,a)=>{this._unsubscribeFromTemplate(a,"action_in_menu"),this._actionInMenuTemplateValues[a]&&delete this._actionInMenuTemplateValues[a],this._actionInMenuResolveCache[a]&&delete this._actionInMenuResolveCache[a]}),this._lastActionTemplateContextKey=e),this.config.actions.forEach((i,a)=>{const s=i?.in_menu;typeof s=="string"&&(s.includes("{{")||s.includes("{%"))?this._subscribeToTemplate(a,"action_in_menu",s):(this._unsubscribeFromTemplate(a,"action_in_menu"),this._actionInMenuTemplateValues[a]&&delete this._actionInMenuTemplateValues[a],delete this._actionInMenuResolveCache[a])});let t=this.config.actions.length;for(;this._templateSubscriptions[`${t}_action_in_menu`]||this._actionInMenuTemplateValues[t]||this._actionInMenuResolveCache[t];)this._unsubscribeFromTemplate(t,"action_in_menu"),delete this._actionInMenuTemplateValues[t],delete this._actionInMenuResolveCache[t],t++}_getResolvedPlaybackEntityIdSync(e){return this._getEntityForPurpose(e,"playback_control")}_getResolvedVolumeEntityIdSync(e){const t=this.entityObjs[e];if(!t)return null;if(t.follow_active_volume)return this._getActivePlaybackEntityId();const i=this._volResolveCache?.[e]?.id;if(i&&typeof i=="string")return i;const a=t.volume_entity;return a&&typeof a=="string"&&!(a.includes("{{")||a.includes("{%"))?a:t.entity_id}_getActualResolvedMaEntityForState(e){const t=this.entityObjs[e];if(!t)return null;const i=this._maResolveCache?.[e]?.id;if(i&&typeof i=="string")return i;const a=t.music_assistant_entity;return a&&typeof a=="string"&&!a.includes("{{")&&!a.includes("{%")?a:t.entity_id}_isEntityPlaying(e){if(!e)return!1;const t=e.state?.toLowerCase();return t==="playing"||t==="buffering"}_isCurrentEntityPlaying(){const e=this.currentEntityId,t=this._getActualResolvedMaEntityForState(this._selectedIndex),i=e?this.hass?.states?.[e]:null,a=t?this.hass?.states?.[t]:null;return this._isEntityPlaying(i)||this._isEntityPlaying(a)}async _resolveTemplateAtActionTime(e,t){return xo(this.hass,e,t)}_attachSearchSwipe(){if(this._searchSwipeAttached)return;const e=this.renderRoot.querySelector(".entity-options-search-results");if(!e||this._searchHierarchy.length>0)return;this._searchSwipeAttached=!0;const t=40,i=s=>{s.touches.length===1&&(this._swipeStartX=s.touches[0].clientX)},a=s=>{if(this._swipeStartX===null)return;const n=s.changedTouches&&s.changedTouches[0].clientX||null;if(n===null){this._swipeStartX=null;return}const l=n-this._swipeStartX;if(Math.abs(l)>t){const c=new Set;Object.values(this._searchResultsByType).forEach(w=>{w.forEach(A=>{A.media_class&&c.add(A.media_class)})});const d=this.entityObjs?.[this._selectedIndex]||null,h=new Set(d?.hidden_filter_chips||[]),u=["all",...Array.from(c).filter(w=>!h.has(w))],m=u.indexOf(this._searchMediaClassFilter||"all"),f=l<0?1:-1;let g=(m+f+u.length)%u.length;const v=u[g];this._doSearch(v==="all"?null:v)}this._swipeStartX=null};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",a,{passive:!0}),e._searchSwipeHandlers={touchstart:i,touchend:a}}_getMockItemFromCurrentTrack(){const e=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;return!e||!e.attributes||!e.attributes.media_title?null:{title:e.attributes.media_title,media_title:e.attributes.media_title,media_content_id:e.attributes.media_content_id||e.attributes.media_title,media_artist:e.attributes.media_artist||"",media_content_type:"track",media_type:"track"}}_isCurrentlyPlayingRadio(){const e=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;if(!e?.attributes)return!1;const t=(e.attributes.media_content_type||"").toLowerCase(),i=(e.attributes.media_content_id||"").toLowerCase();return t==="radio"||i.startsWith("library://radio/")}_handlePlaySimilar(){const e=this._getMockItemFromCurrentTrack();e&&(this._showMediaTitleOptions=!1,this._radioModeActive=!0,this._playMediaFromSearch(e))}async _handleAddCurrentToPlaylist(){const e=this._getMockItemFromCurrentTrack();if(e){if(this._showMediaTitleOptions=!1,this._showEntityOptions=!0,this._showSearchInSheet=!0,this._dismissMenuAfterPlaylistAdd=!0,this._isCurrentlyPlayingRadio()){const t=e.title;this._addToPlaylistTarget=null,this._searchHierarchy.push({type:"select_track_for_playlist",name:p("search.select_track_for_playlist",{"{track}":e.title,"{artist}":e.media_artist}),query:this._searchQuery,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=p("search.select_track_for_playlist",{"{track}":e.title,"{artist}":e.media_artist}),this._searchQuery=t,this._currentSearchQuery=t,this._searchMediaClassFilter="track",this._resetSearchContext(),this._removeSearchSwipeHandlers(),await this._doSearch("track",{clearFilters:!0,artist:e.media_artist});return}this._performSearchOptionAction(e,"add_to_playlist")}}_searchArtistFromNowPlaying(){const e=(this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj)?.attributes?.media_artist||"";e&&(this._showEntityOptions=!0,this._showSearchInSheet=!0,this._searchInputAutoFocused=!1,this._searchQuery=e,this._searchError="",this._searchAttempted=!1,this._searchLoading=!1,this._searchResultsByType={},this._currentSearchQuery=e,this._searchHierarchy=[],this._searchBreadcrumb="",this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this.requestUpdate(),this._doSearch().catch(t=>{console.error("yamp: artist quick-search failed:",t)}))}_showSearchSheetInOptions(e="default"){if(this._showSearchInSheet=!0,this._searchInputAutoFocused=!1,this._searchError="",this._searchResults=[],this._searchQuery="",this._searchAttempted=!1,this._searchResultsByType={},this._currentSearchQuery="",this._searchHierarchy=[],this._searchBreadcrumb="",this._usingMusicAssistant=!1,this._favoritesFilterActive=this.config.default_search_favorites===!0,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this.requestUpdate(),setTimeout(()=>{let t;switch(e){case"recently-played":t=this._toggleRecentlyPlayedFilter(!0);break;case"next-up":t=this._toggleUpcomingFilter(!0);break;case"recommendations":t=this._toggleRecommendationsFilter(!0);break;default:{const i=this.config.default_search_filter==="all"?null:this.config.default_search_filter;t=this._doSearch(i)}break}t?.catch&&t.catch(i=>{console.error("yamp: search initialization failed:",i)})},100),!this._disableSearchAutofocus){const t=this._alwaysCollapsed&&this._expandOnSearch?300:200;setTimeout(()=>{const i=this.renderRoot.querySelector("#search-input-box");i?i.focus():setTimeout(()=>{const a=this.renderRoot.querySelector("#search-input-box");a&&a.focus()},200)},t)}}_openQuickSearchOverlay(e="default"){this._quickMenuInvoke=!0,this._showEntityOptions=!0,this._showSearchSheetInOptions(e),setTimeout(()=>{this._notifyResize()},0)}_handleNavigate(e,t=!1){if(typeof e!="string"||!e.trim())return;const i=e.trim(),a=new CustomEvent("hass-navigate",{detail:{path:i},bubbles:!0,composed:!0});if(this.dispatchEvent(a),a.defaultPrevented)return;let s;if(i.startsWith("#"))window.location.hash=i,s=!0;else if(/^https?:\/\//i.test(i)){if(t){window.open(i,"_blank","noopener,noreferrer");return}window.location.assign(i),s=!0}else this.hass?.navigate?(this.hass.navigate(i),s=!0):(window.history.pushState(null,"",i),s=!0);s&&window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_hideSearchSheetInOptions(){this._cardType!=="search"&&(this._showSearchInSheet=!1,this._searchError="",this._searchResults=[],this._searchQuery="",this._searchDisplaySortOverride=null,this._searchInputAutoFocused=!1,this._searchLoading=!1,this._searchAttempted=!1,this._searchResultsByType={},this._currentSearchQuery="",this._searchHierarchy=[],this._searchBreadcrumb="",this._addToPlaylistTarget=null,this._dismissMenuAfterPlaylistAdd=!1,this._recommendationsFilterActive=!1,this._quickMenuInvoke&&(this._showEntityOptions=!1,this._quickMenuInvoke=!1),this.requestUpdate(),setTimeout(()=>{this._notifyResize()},0))}_closeMenuIfOpen(){this._queueActionsMenuOpenId&&this._closeQueueActionsMenu()}_sortSearchResults(e,t=null){if(this._upcomingFilterActive||this._recentlyPlayedFilterActive||this._recommendationsFilterActive)return Array.isArray(e)?[...e]:[];const i=t??this._getConfiguredSearchResultsSortMode(),a=Array.isArray(e)?[...e]:[];if(i==="random"){for(let s=a.length-1;s>0;s--){const n=Math.floor(Math.random()*(s+1));[a[s],a[n]]=[a[n],a[s]]}return a}return a}_getConfiguredSearchResultsSortMode(){const e=this.config?.search_results_sort,t=typeof e=="string"?e:"default";return this._mapLegacySortOption(t)}_mapLegacySortOption(e){return e?{title_asc:"name",title_desc:"name_desc",artist_asc:"artist_name",artist_desc:"artist_name_desc"}[e]||e:"default"}_isSortableSearchMode(e){return!(!e||e==="default"||e==="random"||e==="random_play_count")}_getOppositeSearchSortMode(e){return!e||e==="default"||e==="random"||e==="random_play_count"?null:e.endsWith("_desc")?e.replace(/_desc$/,""):`${e}_desc`}_shouldShowSearchSortToggle(){return this._upcomingFilterActive||this._recentlyPlayedFilterActive||this._recommendationsFilterActive?!1:this._isSortableSearchMode(this._getConfiguredSearchResultsSortMode())}_toggleSearchResultsSortDirection(){if(!this._shouldShowSearchSortToggle()){this._searchDisplaySortOverride=null;return}const e=this._getConfiguredSearchResultsSortMode(),t=this._getOppositeSearchSortMode(e);if(!t){this._searchDisplaySortOverride=null;return}this._searchDisplaySortOverride===t?this._searchDisplaySortOverride=null:this._searchDisplaySortOverride=t,this._searchResultsByType={},this._doSearch(this._searchMediaClassFilter==="all"?null:this._searchMediaClassFilter,{orderBy:this._getActiveSearchDisplaySortMode()}),this.requestUpdate()}_getActiveSearchDisplaySortMode(){if(this._upcomingFilterActive||this._recentlyPlayedFilterActive||this._recommendationsFilterActive)return"default";if(!this._shouldShowSearchSortToggle())return this._getConfiguredSearchResultsSortMode();const e=this._searchDisplaySortOverride;return e&&this._isSortableSearchMode(e)?e:this._getConfiguredSearchResultsSortMode()}_getSearchSortToggleIcon(){const e=this._getActiveSearchDisplaySortMode();return this._isSortableSearchMode(e)?e.endsWith("_desc")?"mdi:sort-descending":"mdi:sort-ascending":"mdi:sort-variant"}_getSearchSortToggleTitle(){const e=this._getActiveSearchDisplaySortMode();if(!this._isSortableSearchMode(e))return"Toggle search result order";const t=e.endsWith("_desc");return`Sort by ${(t?e.replace(/_desc$/,""):e).replace(/_/g," ")} ${t?"descending":"ascending"}`}_getDisplaySearchResults(){return Array.isArray(this._searchResults)?this._searchResults:[]}_getSearchResultsLimit(){const e=Number(this.config?.search_results_limit);return Number.isFinite(e)?e===0?0:Math.min(Math.max(e,1),1e3):20}_getSearchResultsCount(){return Array.isArray(this._searchResults)?this._searchResults.length:0}_shouldShowSearchResultsCount(){return this._isNarrowViewport||!this._usingMusicAssistant||this._searchLoading?!1:this._getSearchResultsCount()>0?!0:this._searchAttempted||this._initialFavoritesLoaded||this._favoritesFilterActive||this._recentlyPlayedFilterActive||this._upcomingFilterActive||this._recommendationsFilterActive}_getSearchResultsCountLabel(){const e=this._getSearchResultsCount();return`${e} ${p(e===1?"search.result":"search.results")}`}async _doSearch(e=null,t={}){this._searchAttempted=!0,this._closeMenuIfOpen(),this._searchMediaClassFilter=e&&e!=="favorites"?e:"all";const i=!!(t.favorites||(this._favoritesFilterActive||this._initialFavoritesLoaded||this._lastSearchUsedServerFavorites)&&!t.clearFilters);i&&(this._favoritesFilterActive=!0);const a=!!(t.isRecentlyPlayed||this._recentlyPlayedFilterActive&&!t.clearFilters),s=!!(t.isUpcoming||this._upcomingFilterActive&&!t.clearFilters),n=!!(t.isRecommendations||this._recommendationsFilterActive&&!t.clearFilters);this._currentSearchQuery!==this._searchQuery&&(this._searchResultsByType={},this._currentSearchQuery=this._searchQuery);const l=this._getActiveSearchDisplaySortMode(),c=`${e||"all"}${i?"_favorites":""}${a?"_recently_played":""}${s?"_upcoming":""}${n?"_recommendations":""}_sort_${l}`,d=!!t.force;if(this._searchResultsByType[c]&&!d){this._searchTimeoutHandle&&(clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=null),this._latestSearchToken=0,this._searchResults=this._sortSearchResults(this._searchResultsByType[c]),this._searchLoading=!1,this._searchError="",this.requestUpdate();return}t.silent||(this._searchLoading=!0,this._searchError="",this._searchResults=[],this.requestUpdate());const h=t.token||Date.now();this._latestSearchToken=h;const u=m=>this._handleProgressiveSearchResults(m,c,h);this._searchTimeoutHandle&&clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=window.setTimeout(()=>{this._latestSearchToken===h&&this._searchLoading&&(this._searchLoading=!1,this._searchError="Search timed out. Try again.",this.requestUpdate())},this.config?.search_timeout_ms?Number(this.config.search_timeout_ms):15e3);try{const m=this._getSearchEntityId(this._selectedIndex),f=await this._resolveTemplateAtActionTime(m,this.currentEntityId);let g;if(this._addToPlaylistTarget&&e==="playlist"&&this._massQueueAvailable){this._initialFavoritesLoaded=!1;try{const D=await Li(this.hass);if(D){const F={limit:Ml};this._searchQuery&&this._searchQuery.trim().length>0&&(F.search=this._searchQuery.trim());const G=this._getActiveSearchDisplaySortMode();G&&G!=="default"&&(F.order_by=G);const Q={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{config_entry_id:D,command:"music/playlists/library_items",data:F},return_response:!0},B=await this.hass.connection.sendMessagePromise(Q);let te=[];if(Array.isArray(B?.response)?te=B.response:Array.isArray(B?.response?.response)?te=B.response.response:Array.isArray(B?.response?.items)?te=B.response.items:Array.isArray(B?.response?.results)&&(te=B.response.results),Array.isArray(te)){const Z=this._getSearchResultsLimit()||30;g={results:te.filter(X=>X.is_editable===!0).map(X=>Rt(X)).filter(Boolean).slice(0,Z),usedMusicAssistant:!0}}}}catch(D){console.warn("yamp: error fetching direct native playlists for add-to-target logic",D)}g||(g={results:[],usedMusicAssistant:!0}),this._lastSearchUsedServerFavorites=!1}else if(a)this._initialFavoritesLoaded=!1,g=await qo(this.hass,f,e,this._getSearchResultsLimit(),{onChunk:u}),this._lastSearchUsedServerFavorites=!1;else if(s)this._initialFavoritesLoaded=!1,g=await this._getUpcomingQueue(this.hass,f,this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!1;else if(n)this._initialFavoritesLoaded=!1,g=await this._getRecommendations(this.hass,f,e,this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!1;else if(i){this._initialFavoritesLoaded=!1;const D=this._getActiveSearchDisplaySortMode();g=await Js(this.hass,f,this._searchQuery,e,{...t,favorites:!0,orderBy:D!=="default"?D:void 0},this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!0}else if((!this._searchQuery||this._searchQuery.trim()==="")&&!i&&!a&&(e==="all"||!e)){const D=this._getActiveSearchDisplaySortMode();g=await er(this.hass,f,e==="favorites"?null:e,this._getSearchResultsLimit(),{onChunk:u,orderBy:D!=="default"?D:void 0}),(!this._searchQuery||this._searchQuery.trim()==="")&&(this._initialFavoritesLoaded=!0),this._lastSearchUsedServerFavorites=!0}else{this._initialFavoritesLoaded=!1;const D=this._getActiveSearchDisplaySortMode();g=await Js(this.hass,f,this._searchQuery,e,{...t,orderBy:D!=="default"?D:void 0},this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!1}let v=g.results||[];this._usingMusicAssistant=g.usedMusicAssistant||!1;const w=this._currentSearchQuery!==this._searchQuery;w&&(this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1);let A=Array.isArray(v)?v:[];if(this._latestSearchToken!==h)return;if((a||s||n)&&this._searchQuery&&this._searchQuery.trim()!==""){const D=this._searchQuery.trim().toLowerCase();A=A.filter(F=>{const G=(F.title||"").toLowerCase(),Q=(F.artist||"").toLowerCase(),B=(F.album||"").toLowerCase();return G.includes(D)||Q.includes(D)||B.includes(D)})}if(!w&&this._favoritesFilterActive&&!this._lastSearchUsedServerFavorites&&(A=await this._applyLocalFavoritesFilter(A),this._latestSearchToken!==h))return;this._searchResultsByType[c]=A,this._searchResults=this._sortSearchResults(A);const O=Array.isArray(this._searchResults)?this._searchResults.length:0;this._searchTotalRows=Math.max(15,O)}catch(m){this._searchError=m&&m.message||"Unknown error",this._searchResults=[],this._searchTotalRows=0}this._latestSearchToken===h&&this._searchTimeoutHandle&&(clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=null),this._latestSearchToken===h&&(this._latestSearchToken=0),this._searchLoading=!1,this.requestUpdate()}async _playCurrentCollection(){if(this._searchHierarchy.length===0)return;const e=this._searchHierarchy[this._searchHierarchy.length-1];if(!e||!e.uri){this._searchError=p("search.play_collection_error"),this.requestUpdate();return}const t={media_content_id:e.uri,media_content_type:e.type};await this._playMediaFromSearch(t)}_handleSearchSubmit(){const e=this._keepFiltersOnSearch;e||(this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1);const t=!e;this._doSearch(this._searchMediaClassFilter==="all"?null:this._searchMediaClassFilter,{clearFilters:t})}_handleProgressiveSearchResults(e,t,i){if(!Array.isArray(e)||!e.length||this._latestSearchToken!==i)return;const a=(this._searchResultsByType[t]||[]).concat(e);this._searchResultsByType[t]=a,this._searchResults=this._sortSearchResults(a);const s=Array.isArray(a)?a.length:0;this._searchTotalRows=Math.max(15,s),this.requestUpdate()}_getVisibleSearchFilterClasses(){const e=this.entityObjs?.[this._selectedIndex]||null,t=new Set(e?.hidden_filter_chips||[]);return ni.filter(i=>!t.has(i))}async _playMediaFromSearch(e){const t=this._getSearchEntityId(this._selectedIndex),i=await this._resolveTemplateAtActionTime(t,this.currentEntityId);if(this._searchError="",!await this._performSearchPlayback(e,i)){this._searchError="Unable to start playback. Please try again.",this.requestUpdate();return}const{shouldDismiss:a,shouldReset:s}=this._getSearchDismissBehavior();a?(this._showSearchInSheet&&(this._closeEntityOptions(),this._showSearchInSheet=!1),this._hideSearchSheetInOptions()):s?this._showSearchSheetInOptions():this.requestUpdate()}async _performSearchPlayback(e,t){if(e.queue_item_id&&this._upcomingFilterActive&&this._isMusicAssistantEntity()&&this._massQueueAvailable)try{const n=this._getMusicAssistantState()?.entity_id;if(n)return await this.hass.callService("mass_queue","play_queue_item",{entity:n,queue_item_id:e.queue_item_id}),this._advanceQueueInUI(e.queue_item_id,!0),!0}catch(n){return console.error("yamp: Error playing queue item:",n),await this.hass.callService("media_player","media_next_track",{entity_id:t}),!0}if(!t)return!1;const i=this._collectPlaybackMonitorIds(t),a=this._snapshotPlaybackState(i);if(!await this._invokePlayMedia(t,e))return!1;if(await this._waitForPlaybackChange(a,i))return!0;const s=this._snapshotPlaybackState(i);return await this._invokePlayMedia(t,e)?await this._waitForPlaybackChange(s,i):!1}_collectPlaybackMonitorIds(e){const t=new Set;e&&t.add(e);const i=this._getPlaybackEntityId(this._selectedIndex);i&&t.add(i);const a=this.currentEntityId;a&&t.add(a);const s=this._getActualResolvedMaEntityForState(this._selectedIndex);return s&&t.add(s),Array.from(t).filter(Boolean)}_snapshotPlaybackState(e){const t={};return Array.isArray(e)&&e.forEach(i=>{const a=i?this.hass?.states?.[i]:null;t[i]={state:a?.state??null,mediaId:a?.attributes?.media_content_id??null,mediaTitle:a?.attributes?.media_title??null}}),t}async _waitForPlaybackChange(e,t,i=2500){if(!Array.isArray(t)||t.length===0)return!0;const a=Date.now();for(;Date.now()-a<i;){await this._delay(150);for(const s of t){if(!s)continue;const n=this.hass?.states?.[s];if(!n)continue;if(this._isEntityPlaying(n))return!0;const l=e[s]||{},c=n.attributes?.media_content_id??null,d=n.attributes?.media_title??null;if(c&&c!==l.mediaId||d&&d!==l.mediaTitle||!l.mediaId&&c||!l.mediaTitle&&d)return!0}}return!1}async _performSearchOptionAction(e,t){if(t==="add_to_playlist"){this._addToPlaylistTarget=e,this._searchHierarchy.push({type:"select_playlist",name:p("search.add_to_playlist"),query:this._searchQuery,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=p("search.select_playlist").replace("{track}",e.title),this._searchQuery="",this._currentSearchQuery="",this._searchMediaClassFilter="playlist",this._resetSearchContext(),this._removeSearchSwipeHandlers(),await this._doSearch("playlist",{clearFilters:!0});return}const i=this._getSearchEntityId(this._selectedIndex),a=await this._resolveTemplateAtActionTime(i,this.currentEntityId);try{const s={entity_id:a,media_id:e.media_content_id,media_type:e.media_content_type,enqueue:t};if(this._radioModeActive&&(s.radio_mode=!0),await this.hass.callService("music_assistant","play_media",s),this._invalidateUpcomingCache(),t==="replace"){const{shouldDismiss:n,shouldReset:l}=this._getSearchDismissBehavior();n?this._closeEntityOptions():l&&this._showSearchSheetInOptions(),this._activeSearchRowMenuId=null}else{this._successSearchRowMenuId=e.media_content_id,this.requestUpdate();const n=this._dismissMenuAfterPlaylistAdd&&t==="add_to_playlist";setTimeout(()=>{this._successSearchRowMenuId=null,this._activeSearchRowMenuId=null,n&&(this._closeEntityOptions(),this._dismissMenuAfterPlaylistAdd=!1),this.requestUpdate()},2e3)}}catch(s){console.error("Failed to perform search option action:",s),this._searchError="Action failed: "+s.message,this.requestUpdate()}}async _invokePlayMedia(e,t){try{return this._radioModeActive?await this.hass.callService("music_assistant","play_media",{entity_id:e,media_id:t.media_content_id,media_type:t.media_content_type,radio_mode:!0}):await Vo(this.hass,e,t),!0}catch(i){return console.error("yamp: Error starting playback from search:",i),!1}}_delay(e){return new Promise(t=>{(typeof window<"u"?window:globalThis).setTimeout(t,e)})}async _queueMediaFromSearch(e){const t=this._getSearchEntityId(this._selectedIndex),i=await this._resolveTemplateAtActionTime(t,this.currentEntityId);this._radioModeActive?this.hass.callService("music_assistant","play_media",{entity_id:i,media_id:e.media_content_id,media_type:e.media_content_type,enqueue:"add",radio_mode:!0}):this.hass.callService("media_player","play_media",{entity_id:i,media_content_type:e.media_content_type,media_content_id:e.media_content_id,enqueue:"next"}),this._invalidateUpcomingCache(),this._showSearchSuccessToast()}async _searchArtistAlbums(e,t=null){this._searchHierarchy.push({type:"artist",name:e,query:this._searchQuery,uri:t,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=`Albums by ${e}`,this._searchQuery=e,this._searchResultsByType={},this._currentSearchQuery=e,this._searchMediaClassFilter="album",this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._initialFavoritesLoaded=!1,this._removeSearchSwipeHandlers(),await this._doSearch("album",{clearFilters:!0})}_goBackInSearch(){if(this._dismissMenuAfterPlaylistAdd){this._closeEntityOptions(),this._dismissMenuAfterPlaylistAdd=!1;return}if(this._searchHierarchy.length===0)return;this._searchResults=[],this._searchLoading=!0,this.requestUpdate();const e=this._searchHierarchy.pop();if((e.type==="select_playlist"||e.type==="select_track_for_playlist")&&(this._addToPlaylistTarget=null),this._searchQuery=e.query,this._currentSearchQuery=e.query,this._searchResultsByType={},this._searchMediaClassFilter=e.filter||"all",this._searchHierarchy.length===0)this._searchBreadcrumb="",this._doSearch(this._searchMediaClassFilter==="all"?null:this._searchMediaClassFilter);else{const t=this._searchHierarchy[this._searchHierarchy.length-1];if(t.type==="artist")this._searchBreadcrumb=`Albums by ${t.name}`,this._searchMediaClassFilter="album",this._doSearch("album",{artist:t.name});else if(t.type==="album"){if(this._searchBreadcrumb=`Tracks from ${t.name}`,this._searchMediaClassFilter="track",t.uri&&this._isMusicAssistantEntity()){this._searchQuery=t.name,this._searchAlbumTracks(t.name,null,t.uri);return}const i=this._searchHierarchy.find(s=>s.type==="artist"),a={album:t.name};i&&(a.artist=i.name),this._doSearch("track",a)}else if(t.type==="playlist"){if(this._searchBreadcrumb=`Tracks in ${t.name}`,this._searchMediaClassFilter="track",t.uri&&this._isMusicAssistantEntity()){this._searchQuery=t.name,this._currentSearchQuery=t.name,this._searchResults=[],this._searchLoading=!0,this.requestUpdate(),this._fetchMassQueueTracks(t.uri,"get_playlist_tracks").then(i=>{this._searchResultsByType.track=i,this._searchResults=[...i],this._searchLoading=!1,this.requestUpdate(),this._scrollToTop()});return}this._doSearch("track")}}}_isClickableSearchResult(e){return e?this._addToPlaylistTarget||this._searchHierarchy[this._searchHierarchy.length-1]?.type==="select_track_for_playlist"?!0:!!e.is_browsable:!1}_handleSearchResultTouch(e,t){if(!("ontouchstart"in window))return;const i=t.touches[0],a=i.clientX,s=i.clientY;let n=!1;const l=10,c=h=>{const u=h.touches[0],m=Math.abs(u.clientX-a),f=Math.abs(u.clientY-s);(m>l||f>l)&&(n=!0)},d=h=>{document.removeEventListener("touchmove",c,{passive:!0}),document.removeEventListener("touchend",d,{passive:!0}),n||this._handleSearchResultClick(e)};document.addEventListener("touchmove",c,{passive:!0}),document.addEventListener("touchend",d,{passive:!0})}_getSearchResultClickTitle(e){if(!this._isClickableSearchResult(e))return"";if(this._addToPlaylistTarget&&e.media_class==="playlist")return p("search.add_to_playlist");if(this._searchHierarchy[this._searchHierarchy.length-1]?.type==="select_track_for_playlist"&&(e.media_class==="track"||e.media_content_type==="track")){const t=this._getMockItemFromCurrentTrack();return p("search.select_track_for_playlist",{"{track}":t?.title||"","{artist}":t?.media_artist||""})}return Eo(e)}_invalidateUpcomingCache(){if(!this._upcomingFilterActive){const e=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`;this._searchResultsByType&&delete this._searchResultsByType[e],this.requestUpdate()}}_toggleRadioMode(){this._radioModeActive=!this._radioModeActive,this.requestUpdate()}async _toggleFavoritesFilter(){const e=this._favoritesFilterActive||this._initialFavoritesLoaded;if(this._favoritesFilterActive=!e,this._favoritesFilterActive&&(this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1),this._favoritesFilterActive){const t=this._searchMediaClassFilter;try{await this._doSearch(t,{favorites:!0})}catch(i){console.error("yamp: Error searching favorites:",i)}}else{const t=this._searchMediaClassFilter;this._lastSearchUsedServerFavorites=!1,this._initialFavoritesLoaded=!1,await this._doSearch(t,{clearFilters:!0})}}async _toggleRecentlyPlayedFilter(e=null){const t=typeof e=="boolean"?e:!this._recentlyPlayedFilterActive;if(this._recentlyPlayedFilterActive=t,this._recentlyPlayedFilterActive&&(this._favoritesFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1),this._recentlyPlayedFilterActive){this._searchQuery="";try{await this._doSearch("all",{isRecentlyPlayed:!0,clearFilters:!0})}catch(i){console.error("yamp: Error in _doSearch for recently played:",i)}}else if(this._searchQuery&&this._searchQuery.trim()!==""){const i=this._searchMediaClassFilter;await this._doSearch(i)}else{const i=`${this._searchMediaClassFilter||"all"}`;this._searchResultsByType[i]?(this._searchResults=this._sortSearchResults(this._searchResultsByType[i]),this.requestUpdate()):await this._doSearch("favorites")}}async _toggleUpcomingFilter(e=null){const t=typeof e=="boolean"?e:!this._upcomingFilterActive;if(this._upcomingFilterActive=t,this._upcomingFilterActive&&(this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1),this._upcomingFilterActive){this._searchQuery="";const i=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`;delete this._searchResultsByType[i],await this._subscribeToQueueUpdates();try{await this._doSearch("all",{isUpcoming:!0,clearFilters:!0})}catch(a){console.error("yamp: Error in _doSearch for upcoming queue:",a)}}else if(this._unsubscribeFromQueueUpdates(),this._searchQuery&&this._searchQuery.trim()!==""){const i=this._searchMediaClassFilter;await this._doSearch(i)}else{const i=`${this._searchMediaClassFilter||"all"}`;this._searchResultsByType[i]?(this._searchResults=this._sortSearchResults(this._searchResultsByType[i]),this.requestUpdate()):await this._doSearch("favorites")}}async _toggleRecommendationsFilter(e=null){const t=typeof e=="boolean"?e:!this._recommendationsFilterActive;if(this._recommendationsFilterActive=t,this._recommendationsFilterActive){this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._initialFavoritesLoaded=!1,this._searchQuery="";try{const i=await this._isMassQueueIntegrationAvailable(this.hass);if(this._hasMassQueueIntegration=i,this._massQueueAvailable=i,!i){this._recommendationsFilterActive=!1,this._searchError="Recommendations require the Music Assistant queue integration.",this.requestUpdate();return}await this._doSearch("all",{isRecommendations:!0,clearFilters:!0})}catch(i){console.error("yamp: Error in _doSearch for recommendations:",i),this._searchError="Unable to load recommendations.",this._recommendationsFilterActive=!1,this.requestUpdate()}}else if(this._searchQuery&&this._searchQuery.trim()!==""){const i=this._searchMediaClassFilter;await this._doSearch(i)}else{const i=`${this._searchMediaClassFilter||"all"}`;this._searchResultsByType[i]?(this._searchResults=this._sortSearchResults(this._searchResultsByType[i]),this.requestUpdate()):await this._doSearch("favorites")}}async _getUpcomingQueue(e,t,i=20){try{const a=await this._isMassQueueIntegrationAvailable(e);if(this._massQueueAvailable=a,this._hasMassQueueIntegration=a,a)try{const s=await this._getUpcomingQueueWithMassQueue(e,t,i);return!s.results||s.results.length===0?(this._massQueueAvailable=!1,await this._getUpcomingQueueOriginal(e,t,i)):s}catch{return this._massQueueAvailable=!1,await this._getUpcomingQueueOriginal(e,t,i)}return await this._getUpcomingQueueOriginal(e,t,i)}catch(a){return console.error("yamp: Error getting upcoming queue:",a),this._massQueueAvailable=!1,{results:[],usedMusicAssistant:!1}}}async _getRecommendations(e,t,i=null,a=20){try{const s=await this._isMassQueueIntegrationAvailable(e);if(this._hasMassQueueIntegration=s,this._massQueueAvailable=s,!s)throw new Error("mass_queue integration unavailable");const n=Math.max(a||0,this._getSearchResultsLimit()),l={type:"call_service",domain:"mass_queue",service:"get_recommendations",service_data:{entity:t},return_response:!0},c=(await e.connection.sendMessagePromise(l))?.response;let d=[];Array.isArray(c)?d=c:c&&typeof c=="object"&&(Array.isArray(c[t])?d=c[t]:Object.values(c).forEach(w=>{Array.isArray(w)?d.push(...w):w&&typeof w=="object"&&d.push(w)}),d.length===0&&Array.isArray(c.items)&&(d=c.items));const h=w=>{if(!w||typeof w!="string")return"track";const A=w.toLowerCase();switch(A){case"song":case"music":return"track";case"podcast_episode":case"episode":return"podcast";case"station":return"radio";case"directory":case"folder":return"playlist";default:return A}},u=w=>w?w.toString().replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/\b\w/g,A=>A.toUpperCase()):"",m=i&&i!=="all"?h(i):null,f=[];let g=0;const v=n>0?n:1/0;for(const w of d){if(g>=v)break;const A=w?.name||w?.sort_name||"",O=typeof w?.image=="string"&&w.image.trim()!==""?w.image:null,D=Array.isArray(w?.items)&&w.items.length>0?w.items:[w];for(const F of D){if(g>=v)break;const G=F?.uri||F?.item_id;if(!G)continue;const Q=typeof F?.image=="string"&&F.image.trim()!==""?F.image:null,B=F?.media_type||w?.media_type||"music",te=h(B);if(m&&te!==m)continue;const Z=u(B)||u(te),X=u(F?.provider||w?.provider),U=Z?[Z]:[];A?U.push(A):X&&U.push(X),f.push({media_content_id:G,media_content_type:B||te,media_class:te,title:F?.name||F?.sort_name||A||"Recommendation",artist:U.join(" \u2022 "),thumbnail:Q||O||null,provider:F?.provider||w?.provider||null}),g+=1}}return{results:f,usedMusicAssistant:!0,source:"mass_queue"}}catch(s){throw console.error("yamp: Error getting recommendations from mass_queue:",s),s}}async _isMassQueueIntegrationAvailable(e){if(this.config.disable_mass_queue===!0)return!1;try{const t=await e.callWS({type:"get_services"});let i=!1;return Array.isArray(t)?i=t.some(a=>a.domain==="mass_queue"):t&&typeof t=="object"&&(i=Object.prototype.hasOwnProperty.call(t,"mass_queue")||Object.keys(t).some(a=>a==="mass_queue")),!!i}catch{return!1}}async _getUpcomingQueueWithMassQueue(e,t,i=20){try{const a=e.states[t]?.attributes?.media_content_id,s={type:"call_service",domain:"mass_queue",service:"get_queue_items",service_data:{entity:t,limit_before:0},return_response:!0},n=this._getSearchResultsLimit(),l=Number.isFinite(i)?i:n,c=Math.max(l||0,n||0);c>0&&(s.service_data.limit_after=c);const d=(await e.connection.sendMessagePromise(s))?.response?.[t];if(!Array.isArray(d))throw new Error("Invalid response from mass_queue");let h=d.findIndex(f=>f.active===!0||f.state==="playing");h===-1&&a&&(h=d.findIndex(f=>f.media_content_id===a)),h===-1&&d.length>0&&(h=0);const u=h>=0?d.slice(h+1):d,m=(l>0?u.slice(0,l):u).map((f,g)=>({media_content_id:f.media_content_id||`queue_${g}`,media_content_type:"track",media_class:"track",title:f.media_title||"Unknown Track",artist:f.media_artist||"Unknown Artist",album:f.media_album_name||"Unknown Album",thumbnail:f.media_image||null,duration:null,position:g+1,queue_item_id:f.queue_item_id||null}));return{results:m,usedMusicAssistant:!0,total:m.length,source:"mass_queue"}}catch(a){throw console.error("yamp: mass_queue service call failed:",a),a}}async _moveQueueItemUp(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._moveQueueItemInUI(e,"up"),await this.hass.callService("mass_queue","move_queue_item_up",{entity:t,queue_item_id:e}),this._invalidateUpcomingCache()}catch{this._refreshQueue()}}async _moveQueueItemDown(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._moveQueueItemInUI(e,"down"),await this.hass.callService("mass_queue","move_queue_item_down",{entity:t,queue_item_id:e}),this._invalidateUpcomingCache()}catch{this._refreshQueue()}}async _moveQueueItemNext(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._moveQueueItemInUI(e,"next"),await this.hass.callService("mass_queue","move_queue_item_next",{entity:t,queue_item_id:e}),this._invalidateUpcomingCache()}catch{this._refreshQueue()}}async _removeQueueItem(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._removeQueueItemFromUI(e),await this.hass.callService("mass_queue","remove_queue_item",{entity:t,queue_item_id:e}),this._invalidateUpcomingCache()}catch{this._refreshQueue()}}_showQueueError(e){console.error("yamp: Queue operation failed:",e)}_moveQueueItemInUI(e,t){const i=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,a=this._searchResultsByType[i];if(!Array.isArray(a))return;const s=a.findIndex(c=>c.queue_item_id===e);if(s===-1)return;let n;switch(t){case"up":n=Math.max(0,s-1);break;case"down":n=Math.min(a.length-1,s+1);break;case"next":n=0;break;default:return}if(n===s)return;const l=a.splice(s,1)[0];a.splice(n,0,l),this._searchResults=[...a],a.forEach((c,d)=>{c.position=d+1}),l._justMoved=!0,setTimeout(()=>{delete l._justMoved,this.requestUpdate()},1e3),this._latestSearchToken=Date.now(),this.requestUpdate()}_advanceQueueInUI(e=null,t=!1){if(!this._upcomingFilterActive)return;t&&(this._latestManualShiftTime=Date.now());const i=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`;let a=this._searchResultsByType[i];if(!(!Array.isArray(a)||a.length===0)){if(e){const s=a.findIndex(n=>n.queue_item_id===e);s>=0&&(a=a.slice(s+1))}else a=a.slice(1);this._searchResultsByType[i]=a,this._searchResults=a,this._latestSearchToken=Date.now(),this.requestUpdate()}}_removeQueueItemFromUI(e){const t=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,i=this._searchResultsByType[t];if(!Array.isArray(i))return;const a=i.filter(s=>s.queue_item_id!==e);this._searchResultsByType[t]=a,this._searchResults=a,this.requestUpdate()}_isMusicAssistantEntity(){const e=this._getMusicAssistantState();return e?Ot(e)||e.attributes?.mass_player_id||e.attributes?.active_queue||this._upcomingFilterActive&&this._searchResultsByType[`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`]?.some(t=>t.queue_item_id):!1}_looksLikeMusicAssistantState(e){return e?Ot(e)||!!e.attributes?.mass_player_id||!!e.attributes?.active_queue:!1}_getTransferQueueTargets(){if(!this.hass?.services?.music_assistant?.transfer_queue)return[];const e=this._selectedIndex;if(e==null||e<0)return[];const t=this._getActualResolvedMaEntityForState(e);if(!t)return[];const i=new Set([t]),a=[];for(let s=0;s<this.entityObjs.length;s++){const n=this.entityObjs[s];if(!n)continue;const l=this._getActualResolvedMaEntityForState(s);if(!l||i.has(l))continue;const c=this.hass?.states?.[l],d=this.hass?.states?.[n.entity_id];if(!this._looksLikeMusicAssistantState(c)&&!this._looksLikeMusicAssistantState(d))continue;i.add(l);const h=c||d,u=n?.name||d?.attributes?.friendly_name||c?.attributes?.friendly_name||n.entity_id;a.push({index:s,entityId:n.entity_id,maEntityId:l,name:u,subtitle:l!==n.entity_id?l:n.entity_id,state:h?.state,icon:h?.attributes?.icon||"mdi:music"})}return a}_hasQueueInState(e){if(!e)return!1;const t=e.attributes||{},i=["queue_items","queue","media_queue","mass_queue_items"];for(const l of i){const c=t[l];if(Array.isArray(c)&&c.length>0)return!0}const a=["queue_length","queue_size","queue_total_items","queue_pending","queue_remaining","items_in_queue"];for(const l of a){const c=t[l];if(typeof c=="number"&&c>0)return!0}if(t.next_item||t.current_queue_item||t.queue_item_id||t.media_content_id)return!0;const s=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,n=this._searchResultsByType?.[s];return!!(Array.isArray(n)&&n.length>0)}async _updateTransferQueueAvailability({refresh:e=!1}={}){const t=this._getMusicAssistantState(),i=this._looksLikeMusicAssistantState(t);if(!t||!i)return this._hasTransferQueueForCurrent&&(this._hasTransferQueueForCurrent=!1,this.requestUpdate()),!1;let a=this._hasQueueInState(t);if(!a&&e&&this.hass){const s=this._getActualResolvedMaEntityForState(this._selectedIndex);if(s)try{const n=await this._getUpcomingQueue(this.hass,s,2);(Array.isArray(n?.results)&&n.results.length>0||this._isEntityPlaying(t)||t.state==="paused"||t.attributes?.media_content_id)&&(a=!0)}catch{}}return this._hasTransferQueueForCurrent!==a&&(this._hasTransferQueueForCurrent=a,this.requestUpdate()),a}_canShowTransferQueueOption(){return this._hasTransferQueueForCurrent?this._getTransferQueueTargets().length>0:!1}_openTransferQueue(){this._showEntityOptions=!0,this._showTransferQueue=!0,this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),this.requestUpdate()}_closeTransferQueue(){this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),this.requestUpdate()}async _transferQueueTo(e){if(!e)return;const t=this._getActualResolvedMaEntityForState(this._selectedIndex);if(t){this._transferQueuePendingTarget=e.maEntityId,this._transferQueueStatus=null,this.requestUpdate();try{const i=this._buildTransferQueuePayload(t,e.maEntityId);await this.hass.callService("music_assistant","transfer_queue",i),this._transferQueueStatus={type:"success",message:`Queue sent to ${e.name}.`};const a=typeof e.index=="number"?e.index:this.entityIds.indexOf(e.entityId);if(a!=null&&a>=0){const s=this._pinnedIndex;if(s===null||s===a){this._selectedIndex=a,this._manualSelect=!0,this._manualSelectPlayingSet=null,s===a&&(this._pinnedIndex=a);const n=e.maEntityId||this.entityObjs[a]?.entity_id;n&&(this._playbackLingerByIdx||(this._playbackLingerByIdx={}),this._playbackLingerByIdx[a]={entityId:n,until:Date.now()+5e3},this._lastPlayingEntityIdByChip||(this._lastPlayingEntityIdByChip={}),this._lastPlayingEntityIdByChip[a]=n),this._ensureResolvedMaForIndex(a),this._ensureResolvedVolForIndex(a)}}await this._updateTransferQueueAvailability({refresh:!0}),this._transferQueueAutoCloseTimer&&clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=setTimeout(()=>{this._transferQueueAutoCloseTimer=null,this._showEntityOptions&&this._showTransferQueue&&this._dismissWithAnimation()},2e3)}catch(i){console.error("yamp: Error transferring queue:",i),this._transferQueueStatus={type:"error",message:i?.message||"Failed to transfer queue."},this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null)}finally{this._transferQueuePendingTarget=null,this.requestUpdate()}}}_buildTransferQueuePayload(e,t){const i=this.hass?.services?.music_assistant?.transfer_queue?.fields||{},a={},s=(c,d)=>{for(const h of c)if(i[h]!==void 0)return a[h]=d,!0;return!1},n=s(["source_player","source_player_id","player_id","source"],e),l=s(["target_player","target_player_id","target","entity_id"],t);if(!n){const c=l?"source_player":"entity_id";a[c]=e}return l||(a.entity_id===e?(a.entity_id=t,a.source_player=e):(a.source_player,a.entity_id=t)),a}_refreshQueue({delayMs:e=50}={}){this._upcomingFilterActive&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=setTimeout(()=>{this._queueRefreshTimer=null;const t=Date.now();this._latestSearchToken=t,this._doSearch("all",{isUpcoming:!0,clearFilters:!0,silent:!0,force:!0,token:t}).catch(i=>{console.error("yamp: Error refreshing queue:",i)})},e))}async _subscribeToQueueUpdates(){if(!this._queueEventSubscription)try{this._queueEventSubscription=await this.hass.connection.subscribeEvents(e=>{e.data.type},"mass_queue")}catch(e){console.error("yamp: Failed to subscribe to queue updates:",e)}}_unsubscribeFromQueueUpdates(){this._queueEventSubscription&&(this._queueEventSubscription(),this._queueEventSubscription=null)}async _getUpcomingQueueOriginal(e,t,i=20){try{const a={type:"call_service",domain:"music_assistant",service:"get_queue",service_data:{entity_id:t},return_response:!0},s=(await e.connection.sendMessagePromise(a))?.response?.[t];if(!s)return{results:[],usedMusicAssistant:!0};const n=[];if(!s)return{results:[],usedMusicAssistant:!0};if(s.next_item){const l=s.next_item;n.push({media_content_id:l.media_item?.uri||"queue_next",media_content_type:l.media_item?.media_type||"track",media_class:"track",title:l.name||l.media_item?.name||"Unknown Track",artist:l.media_item?.artists?.[0]?.name||"Unknown Artist",album:l.media_item?.album?.name||"Unknown Album",thumbnail:l.media_item?.image||null,duration:l.duration||null,position:1,queue_item_id:l.queue_item_id||null})}return{results:n,usedMusicAssistant:!0,total:n.length,source:"music_assistant"}}catch(a){throw console.error("yamp: Error in original queue method:",a),a}}async _applyLocalFavoritesFilter(e=[]){if(!this._favoritesFilterActive)return e;const t=this._getSearchEntityId(this._selectedIndex),i=await this._resolveTemplateAtActionTime(t,this.currentEntityId);try{const a=(await er(this.hass,i,this._searchMediaClassFilter,this._getSearchResultsLimit())).results||[],s=new Set(a.map(n=>n.media_content_id));return e.filter(n=>s.has(n.media_content_id))}catch{return e}}async _handleSearchResultClick(e,t){if(!(!this._isClickableSearchResult(e)||"ontouchstart"in window&&t&&t.sourceCapabilities&&t.sourceCapabilities.firesTouchEvents)){if(this._searchHierarchy[this._searchHierarchy.length-1]?.type==="select_track_for_playlist"&&(e.media_class==="track"||e.media_content_type==="track")){this._performSearchOptionAction(e,"add_to_playlist");return}if(this._addToPlaylistTarget&&e.media_class==="playlist"){this._loadingSearchRowMenuId=e.media_content_id,this.requestUpdate();try{const i=await Li(this.hass);if(i){const a=e.item_id||e.media_content_id?.split("/").pop();await this.hass.callService("mass_queue","send_command",{command:"music/playlists/add_playlist_tracks",data:{db_playlist_id:a,uris:[this._addToPlaylistTarget.media_content_id]},config_entry_id:i}),this._showSearchSuccessToast(e.media_content_id,"playlist")}}catch(i){console.error("Failed to add to playlist:",i),this._errorSearchRowMenuId=e.media_content_id,this.requestUpdate(),setTimeout(()=>{this._errorSearchRowMenuId=null,this.requestUpdate()},3e3)}finally{this._loadingSearchRowMenuId=null,this.requestUpdate()}this._addToPlaylistTarget=null,setTimeout(()=>{this._dismissMenuAfterPlaylistAdd?(this._closeEntityOptions(),this._dismissMenuAfterPlaylistAdd=!1):this._goBackInSearch()},Hr);return}if(e.media_class==="artist")await this._searchArtistAlbums(e.title,e.media_content_id);else if(e.media_class==="album"){let i=null;this._searchHierarchy.length>0&&this._searchHierarchy[this._searchHierarchy.length-1].type==="artist"?i=this._searchHierarchy[this._searchHierarchy.length-1].name:e.artist&&(i=e.artist),await this._searchAlbumTracks(e.title,i,e.media_content_id)}else e.media_class==="track"?e.album&&await this._searchAlbumTracks(e.album,e.artist,e.album_uri):e.media_class==="playlist"&&await this._searchPlaylistTracks(e.title,e.media_content_id)}}async _searchAlbumTracks(e,t,i=null){this._searchHierarchy.push({type:"album",name:e,query:this._searchQuery,uri:i,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=`Tracks from ${e}`,this._searchResultsByType={},this._currentSearchQuery=e,this._searchMediaClassFilter="track",this._searchResults=[],this._searchLoading=!0,this.requestUpdate();const a=await this._fetchMassQueueTracks(i,"get_album_tracks");if(a&&a.length>0){this._setSearchResultsFromMassQueue(a,e);return}if(i&&this._isMusicAssistantEntity())try{const l=this._getSearchEntityId(this._selectedIndex),c=await this._resolveTemplateAtActionTime(l,this.currentEntityId),d={type:"call_service",domain:"media_player",service:"browse_media",service_data:{entity_id:c,media_content_id:i},return_response:!0},h=await this.hass.connection.sendMessagePromise(d),u=(h?.response?.[c]?.result||h?.result||{}).children||[];if(u.length>0){this._searchQuery=e,this._searchResults=this._sortSearchResults(u),this._searchTotalRows=Math.max(15,u.length),this._searchLoading=!1,this.requestUpdate();return}}catch(l){console.error("yamp: Failed to browse album tracks:",l)}let s=e;t&&(s=`${t} ${e}`),this._searchQuery=s,this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._initialFavoritesLoaded=!1;const n={album:e,clearFilters:!0};t&&(n.artist=t),this._removeSearchSwipeHandlers(),await this._doSearch("track",n)}async _searchPlaylistTracks(e,t){this._searchHierarchy.push({type:"playlist",name:e,query:this._searchQuery,uri:t,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=`Tracks from ${e}`,this._searchResultsByType={},this._currentSearchQuery=e,this._searchMediaClassFilter="track",this._searchResults=[],this._searchLoading=!0,this.requestUpdate();const i=await this._fetchMassQueueTracks(t,"get_playlist_tracks");if(i&&i.length>0){this._setSearchResultsFromMassQueue(i,e);return}this._searchQuery=e,this._searchResults=[],this._searchLoading=!1,this.requestUpdate()}async _fetchMassQueueTracks(e,t){try{if(!await this._isMassQueueIntegrationAvailable(this.hass))return null;const i=await Li(this.hass);let a=[];if(i&&e)try{const s={type:"call_service",domain:"mass_queue",service:t,service_data:{config_entry_id:i,uri:e},return_response:!0},n=await this.hass.connection.sendMessagePromise(s);n?.response?.tracks&&(a=n.response.tracks)}catch(s){console.warn(`yamp: mass_queue.${t} failed with config_entry_id, trying fallback with entity_id`,s);const n=this._getMusicAssistantState()?.entity_id;if(n)try{const l={type:"call_service",domain:"mass_queue",service:t,service_data:{entity:n,uri:e},return_response:!0},c=await this.hass.connection.sendMessagePromise(l);c?.response?.tracks&&(a=c.response.tracks)}catch(l){throw console.warn(`yamp: mass_queue.${t} fallback with entity_id also failed.`,l),s}else throw s}return a}catch(i){return console.error(`yamp: Error fetching ${t} via mass_queue:`,i),null}}_setSearchResultsFromMassQueue(e,t){this._searchResults=e.map(i=>({media_content_id:i.media_content_id,media_content_type:"track",media_class:"track",title:i.media_title,artist:i.media_artist,album:i.media_album_name,thumbnail:i.media_image,duration:i.duration,is_browsable:!1,favorite:i.favorite})),this._searchQuery=t,this._searchTotalRows=Math.max(15,e.length),this._searchLoading=!1,this.requestUpdate()}_notifyResize(){this.dispatchEvent(new Event("iron-resize",{bubbles:!0,composed:!0}))}_setupAdaptiveTextObserver(){!this._adaptiveText||this._textResizeObserver||typeof ResizeObserver>"u"||!this.isConnected||(this._textResizeObserver=new ResizeObserver(()=>this._updateAdaptiveTextScale()),this._textResizeObserver.observe(this),this._updateAdaptiveTextScale())}_teardownAdaptiveTextObserver(){this._textResizeObserver&&(this._textResizeObserver.disconnect(),this._textResizeObserver=null),this._currentTextScale=null,this._setAdaptiveTextVars(1,new Set)}_setAdaptiveTextVars(e,t,i){if(!this.style)return;const a=t||this._adaptiveTextTargets,s=Number.isFinite(e)?e:1,n=s.toFixed(2);this.style.setProperty("--yamp-text-scale",n);for(const[m,f]of Object.entries(jl)){const g=!!a?.has(m);this.style.setProperty(f,g?n:"1")}const l=!!a?.has("details"),c=Number.isFinite(i)?i:s,d=l?c.toFixed(2):"1",h=l?this._calculateDetailsLineHeight(c):1.2;this.style.setProperty("--yamp-details-scale",d),this.style.setProperty("--yamp-details-line-height",h.toFixed(2));const u=l?c>=2?3:c>=1.3?2:1:3;this.style.setProperty("--yamp-details-max-lines",u.toString())}_updateAdaptiveTextObserverState(){this._adaptiveText&&this.isConnected?this._setupAdaptiveTextObserver():this._teardownAdaptiveTextObserver()}_handleGlobalScroll(){this._adaptiveText&&(this._suspendAdaptiveScaling=!0,this._pendingAdaptiveScaleUpdate=!0,clearTimeout(this._adaptiveScrollTimer),this._adaptiveScrollTimer=setTimeout(()=>{this._suspendAdaptiveScaling=!1,this._pendingAdaptiveScaleUpdate&&(this._pendingAdaptiveScaleUpdate=!1,this._updateAdaptiveTextScale(!0))},400))}_handleViewportResize(){this._updateViewportFlags()}_updateViewportFlags(){if(typeof window>"u")return;const e=typeof document<"u"?document.documentElement?.clientWidth:0,t=window.innerWidth||e||0,i=t>0?t<=520:this._isNarrowViewport;i!==this._isNarrowViewport&&(this._isNarrowViewport=i,this.requestUpdate())}_updateAdaptiveTextScale(e=!1){if(!this._adaptiveText)return;if(this._suspendAdaptiveScaling&&!e){this._pendingAdaptiveScaleUpdate=!0;return}const t=this.getBoundingClientRect(),i=t?.width||0;if(!i)return;const a=this._getAdaptiveBaselineHeight(this._lastRenderedCollapsed||!1)||t?.height||i,s=i/360,n=a/360,l=s*.8+n*.2,c=Math.max(.85,Math.min(1.4,l)),d=this._calculateDetailsScale(i,a,c,this._lastTitleLength||0),h=this._currentTextScale===null||Math.abs(this._currentTextScale-c)>.01,u=this._currentDetailsScale===null||Math.abs(this._currentDetailsScale-d)>.02;(h||u)&&(this._currentTextScale=c,this._currentDetailsScale=d,this._setAdaptiveTextVars(c,void 0,d))}_calculateDetailsScale(e,t,i=1){if(!this._adaptiveTextTargets?.has("details"))return 1;const a=Math.min(Math.max(1,e/360),3.2),s=Math.max(1,Math.min(t/330,2.4)),n=Math.max(a*.7+s*.3,s),l=Math.min(3.25,1+(s-1)*1.35),c=Math.max(i,n*1.18),d=Math.max(1,Math.min(c,l)),h=this._lastTitleLength||0,u=h>0?Math.max(.62,Math.min(1,30/Math.min(h,72))):1;return 1+(d-1)*u}_calculateDetailsLineHeight(e){const t=Math.max(1,Math.min(e,2.6)),i=Math.max(0,t-1);return Math.min(1.55,1.2+i*.35)}_getAdaptiveBaselineHeight(e=!1){const t=this._cardHeightTemplate?this._cardHeightTemplateResult:this.config?.card_height;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;if(typeof t=="string"){const i=t.trim();if(i){const a=Number(i);if(Number.isFinite(a)&&a>0)return a}}return e||this._alwaysCollapsed?this._collapsedBaselineHeight||220:350}async _resolveIdleImageTemplate(){if(!(!this._idleImageTemplate||this._resolvingIdleImageTemplate||!this.hass)){this._resolvingIdleImageTemplate=!0;try{const e=this._getTemplateContext(),t=await ji(this.hass,this._idleImageTemplate,e);this._idleImageTemplateResult=(t??"").toString().trim()}catch{this._idleImageTemplateResult=""}finally{this._resolvingIdleImageTemplate=!1,this._idleImageTemplateNeedsResolve=!1,this.requestUpdate()}}}_getTemplateContext(){return{entity:this.currentEntityId||"",is_idle:this._isIdle,is_playing:this._isCurrentEntityPlaying(),is_search:this._showSearchInSheet,is_grouping:this._showGrouping,is_source:this._showSourceList||this._showSourceMenu,is_lyrics:this._lyricsActive,is_options:this._showEntityOptions,is_transfer_queue:this._showTransferQueue,is_any_menu_open:this.isAnyMenuOpen,current:this.currentActivePlaybackEntityId||this.currentEntityId||""}}_setIdleState(e){this._isIdle!==e&&(this._isIdle=e,this._cardHeightTemplate&&(this._cardHeightTemplateNeedsResolve=!0))}async _resolveCardHeightTemplate(){if(!this._cardHeightTemplate||this._resolvingCardHeightTemplate||!this.hass)return;const e=this._getTemplateContext(),t=JSON.stringify(e);if(!(t===this._lastCardHeightContextKey&&!this._cardHeightTemplateNeedsResolve)){this._resolvingCardHeightTemplate=!0;try{const i=await ji(this.hass,this._cardHeightTemplate,e),a=Number(i);this._cardHeightTemplateResult=Number.isFinite(a)&&a>0?a:null,this._lastCardHeightContextKey=t}catch{this._cardHeightTemplateResult=null}finally{this._resolvingCardHeightTemplate=!1,this._cardHeightTemplateNeedsResolve=!1,this.requestUpdate()}}}_ensureArtworkOverrideIndexMap(){this._artworkOverrideIndexMap||(this._artworkOverrideIndexMap=new WeakMap,(Array.isArray(this.config?.media_artwork_overrides)?this.config.media_artwork_overrides:[]).forEach((e,t)=>{e&&typeof e=="object"&&this._artworkOverrideIndexMap.set(e,t)}))}_getArtworkOverrideCacheKey(e,t="image",i=null){this._ensureArtworkOverrideIndexMap();const a=i?.attributes?.media_title||"",s=i?.attributes?.media_artist||"",n=`${a}:${s}`,l=e&&this._artworkOverrideIndexMap?.get(e);return`${typeof l=="number"?l:"generic"}:${t}:${n}`}_getResolvedArtworkOverrideSource(e,t,i="image",a=null){if(!t||typeof t!="string")return null;const s=this._normalizeImageSourceValue(t);if(!s)return null;if(!(t.includes("{{")||t.includes("{%")))return s;this._artworkOverrideTemplateCache||(this._artworkOverrideTemplateCache={});const n=this._getArtworkOverrideCacheKey(e,i,a);this._artworkOverrideTemplateCache[n]||(this._artworkOverrideTemplateCache[n]={value:null,resolving:!1});const l=this._artworkOverrideTemplateCache[n];if(l.value)return l.value;if(!l.resolving&&this.hass){l.resolving=!0;const c=this._getTemplateContext();ji(this.hass,t,c).then(d=>{l.value=this._normalizeImageSourceValue((d??"").toString())}).catch(()=>{l.value=""}).finally(()=>{l.resolving=!1,this.requestUpdate()})}return l.value}_getCollapsedArtworkStyle(){if(this._alwaysCollapsed){const e=!!this._getFavoriteButtonEntity()&&!this._getHiddenControlsForCurrentEntity().favorite;if(Ea(this.currentActivePlaybackStateObj,(t,i)=>this._supportsFeature(t,i),e,this._getHiddenControlsForCurrentEntity(),!0,this._controlLayout)>6&&window.innerWidth<=768)return"width: 60px; height: 60px; object-fit: var(--yamp-artwork-fit, cover); border-radius: 8px;"}return""}_getArtworkUrl(e){const t=ka(e,{hostname:this.config?.artwork_hostname||"",overrides:Array.isArray(this.config?.media_artwork_overrides)?this.config.media_artwork_overrides:[],fallbackArtwork:this.config?.fallback_artwork,artworkObjectFit:this._artworkObjectFit,resolveOverrideSource:(n,l,c,d)=>this._getResolvedArtworkOverrideSource(n,l,c,d)});if(!t)return null;let{url:i,sizePercentage:a,objectFit:s}=t;return i&&!this._isValidArtworkUrl(i)&&(i=null),s||(s=this._artworkObjectFit),{url:i,sizePercentage:a,objectFit:s}}_getBackgroundSizeForFit(e){switch(e){case"contain":return"contain";case"fill":return"100% 100%";case"scale-down":return"contain";case"none":return"auto";case"scaled-contain":case"scaled-contain-alternate":return"80%";default:return"cover"}}_isValidArtworkUrl(e){if(!e||typeof e!="string")return!1;if(e.startsWith("data:")||e.startsWith("/")||e.startsWith("./")||e.startsWith("../"))return!0;if(e.includes("undefined")||e.includes("null")||e.trim()==="")return!1;try{return new URL(e),!0}catch{return!1}}async _extractDominantColor(e){return new Promise(t=>{const i=new window.Image;i.crossOrigin="Anonymous",i.src=e,i.onload=function(){const a=document.createElement("canvas");a.width=1,a.height=1;const s=a.getContext("2d");s.drawImage(i,0,0,1,1);const[n,l,c]=s.getImageData(0,0,1,1).data;t(`rgb(${n},${l},${c})`)},i.onerror=function(){t("#888")}})}_normalizeAdaptiveTextTargets(e){return Array.isArray(e?.adaptive_text_targets)?e.adaptive_text_targets.map(t=>typeof t=="string"?t.trim().toLowerCase():"").filter(t=>Br.includes(t)):e?.adaptive_text===!0?[...zl]:[]}_normalizeImageSourceValue(e){if(!e||typeof e!="string")return"";let t=e.trim();if(!t)return"";(t.startsWith("'")&&t.endsWith("'")||t.startsWith('"')&&t.endsWith('"'))&&t.length>=2&&(t=t.slice(1,-1).trim());const i=t.match(/^url\((.*)\)$/i);if(i&&i[1]!==void 0){let a=i[1].trim();return(a.startsWith("'")&&a.endsWith("'")||a.startsWith('"')&&a.endsWith('"'))&&(a=a.slice(1,-1).trim()),a}return t}setConfig(e){if(!e.entities||!Array.isArray(e.entities)||e.entities.length===0)throw new Error("You must define at least one media_player entity.");const t=this.config,i=e.template||"custom",a={...ri[i]||{},...e};this.config=a;const s=typeof a.control_layout=="string"?a.control_layout.toLowerCase():"classic";this._controlLayout=s==="modern"?"modern":"classic",this._swapPauseForStop=a.swap_pause_for_stop===!0,this._holdToPin=!!a.hold_to_pin,this._disableSearchAutofocus=a.disable_autofocus===!0,this._holdToPin&&(this._holdHandler=Co({onPin:d=>this._pinChip(d),onHoldEnd:()=>{},holdTime:650,moveThreshold:8}));const n=this._selectedIndex||0;this._selectedIndex=n<this.entityIds.length?n:0,this._lastPlaying=null,this._lastActiveEntityId=null;let l=new Set(["cover","contain","fill","scale-down","none","scaled-contain","scaled-contain-alternate","no_artwork"]).has(a.artwork_object_fit)?a.artwork_object_fit:"cover";l==="scaled-contain-alternate"&&a.always_collapsed===!0&&(l="scaled-contain"),this._artworkObjectFit=l,this._extendArtwork=a.extend_artwork===!0,this._idleScreen=a.idle_screen||"default",this._idleScreenApplied=!1,this._hasSeenPlayback=!1,this._appearance=a.appearance||"automatic",this._isIdle&&this._applyIdleScreen(),this._updateHostAttributes(),this._showVolumeOverlay=!!a.show_volume_overlay,this._collapseOnIdle=!!a.collapse_on_idle,this._alwaysCollapsed=!!a.always_collapsed,this._expandOnSearch=!!a.expand_on_search,this._alternateProgressBar=!!a.alternate_progress_bar,this._displayTimestamps=!!a.display_timestamps,this._keepFiltersOnSearch=!!a.keep_filters_on_search,this._adaptiveControls=a.adaptive_controls===!0;const c=this._normalizeAdaptiveTextTargets(a);if(this._adaptiveTextTargets=new Set(c),this._adaptiveText=this._adaptiveTextTargets.size>0,this._currentDetailsScale=null,this._updateAdaptiveTextObserverState(),a.always_show_quick_group!==t?.always_show_quick_group&&(this._quickGroupingMode=!!a.always_show_quick_group),this._adaptiveText){const d=this._currentTextScale??1,h=this._currentDetailsScale??1;this._setAdaptiveTextVars(d,void 0,h),this._updateAdaptiveTextScale()}else this._setAdaptiveTextVars(1,new Set,1);this._hideActiveEntityLabel=a.hide_active_entity_label===!0,this._hideActiveEntityLabelOnIdle=a.hide_active_entity_label_on_idle===!0,this._artworkOverrideTemplateCache={},this._artworkOverrideIndexMap=null,Array.isArray(a.media_artwork_overrides)&&(this.config.media_artwork_overrides=a.media_artwork_overrides.map(d=>({...d})),this.config.media_artwork_overrides.forEach(d=>{!d||typeof d!="object"||(d.__cachedRegexes={},Os.forEach(h=>{const u=d[h];if(typeof u=="string"&&u.includes("*")&&u!=="*")try{const m=u.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*");d.__cachedRegexes[h]=new RegExp(`^${m}$`,"i")}catch{console.warn("yamp: Failed to compile artwork override regex for",h,u)}}))})),typeof a.idle_image=="string"&&(a.idle_image.includes("{{")||a.idle_image.includes("{%"))?(this._idleImageTemplate=a.idle_image,this._idleImageTemplateResult="",this._idleImageTemplateNeedsResolve=!0):(this._idleImageTemplate=null,this._idleImageTemplateResult="",this._idleImageTemplateNeedsResolve=!1),typeof a.card_height=="string"&&(a.card_height.includes("{{")||a.card_height.includes("{%"))?(this._cardHeightTemplate=a.card_height,this._cardHeightTemplateResult=null,this._cardHeightTemplateNeedsResolve=!0,this._lastCardHeightContextKey=null):(this._cardHeightTemplate=null,this._cardHeightTemplateResult=null,this._cardHeightTemplateNeedsResolve=!1,this._lastCardHeightContextKey=null),this._idleTimeoutMs=typeof a.idle_timeout_ms=="number"?a.idle_timeout_ms:6e4,this._idleTimeoutMs===0&&(this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate())),this._volumeStep=typeof a.volume_step=="number"?a.volume_step:.05,a.always_show_lyrics===!0&&(this._lyricsActive=!0)}get entityObjs(){return this.config.entities.map((e,t)=>{const i=typeof e=="string"?e:e.entity_id,a=typeof e=="string"?"":e.name||"",s=typeof e=="string"?void 0:e.volume_entity,n=typeof e=="string"?void 0:e.music_assistant_entity,l=typeof e=="string"?!1:!!e.sync_power,c=typeof e=="string"?!1:!!e.follow_active_volume,d=typeof e=="string"?void 0:e.hidden_controls;let h;if(typeof e=="object"&&typeof e.group_volume<"u")h=e.group_volume;else{const u=this.hass?.states?.[i];if(u&&Array.isArray(u.attributes.group_members)&&u.attributes.group_members.length>0){const m=u.attributes.group_members.filter(g=>g!==i),f=this.config.entities.map(g=>typeof g=="string"?g:g.entity_id);h=m.filter(g=>f.includes(g)).length>0}}return{entity_id:i,name:a,volume_entity:s,music_assistant_entity:n,sync_power:l,follow_active_volume:c,hidden_controls:d,hidden_filter_chips:typeof e=="string"?void 0:e.hidden_filter_chips,disable_auto_select:this._isAutoSelectDisabled(t),prefer_ma_metadata:typeof e=="string"?!1:!!e.prefer_ma_metadata,...typeof h<"u"?{group_volume:h}:{}}})}_getEntityForPurpose(e,t){const i=this.entityObjs[e];if(!i)return null;switch(t){case"volume_control":return i.follow_active_volume?this._getActivePlaybackEntityForIndex(e)||i.entity_id:this._resolveEntity(i.volume_entity,i.entity_id,e,"vol")||i.entity_id;case"playback_control":return this._getActivePlaybackEntityForIndex(e)||i.entity_id;case"sorting":return this._getActivePlaybackEntityForIndex(e)||i.entity_id;case"metadata":return i.prefer_ma_metadata?this._resolveEntity(i.music_assistant_entity,i.entity_id,e)||i.entity_id:this._getActivePlaybackEntityForIndex(e)||i.entity_id;default:return i.entity_id}}_resolveEntity(e,t,i,a="ma"){return e?typeof e=="string"&&(e.includes("{{")||e.includes("{%"))?(a==="vol"?this._volResolveCache:this._maResolveCache)?.[i]?.id||t:e:null}_getActivePlaybackEntityForIndex(e){const t=this.entityObjs[e];if(!t)return null;const i=t.entity_id,a=this._resolveEntity(t.music_assistant_entity,t.entity_id,e),s=i?this.hass?.states?.[i]:null,n=a?this.hass?.states?.[a]:null;return a===i?i:this._getActivePlaybackEntityForIndexInternal(e,i,a,s,n)}_getActivePlaybackEntityForIndexInternal(e,t,i,a,s){const n=this._lastResolvedEntityIdByChip[e],l=f=>(this._lastResolvedEntityIdByChip[e]=f,f),c=this._playbackLingerByIdx?.[e],d=Date.now();if(c&&c.until>d)return this._isEntityPlaying(a)&&this._lastPlayingEntityIdByChip?.[e]===t?l(t):l(c.entityId);c&&c.until<=d&&delete this._playbackLingerByIdx[e];const h=this._isEntityPlaying(s),u=this._isEntityPlaying(a);if(h&&u)return l(n===t?t:i);if(h)return l(i);if(u)return l(t);const m=this._lastPlayingEntityIdByChip?.[e];if(m===i)return l(i);if(m===t)return l(t);if(i&&i!==t){const f=i===n;return t===n&&a&&a.state!=="off"&&a.state!=="unavailable"?l(t):(f&&s&&s.state!=="off"&&s.state,l(i))}else return l(t)}_getVolumeEntity(e){return this._getEntityForPurpose(e,"volume_control")}_resolveEntityIdxByGroupingId(e){const t=this.entityObjs;for(let i=0;i<t.length;i++)if(this._resolveMaEntityForObj(t[i],i)===e)return i;return-1}_resolveMaEntityForObj(e,t){return e?this._resolveEntity(e.music_assistant_entity,e.entity_id,t)||e.entity_id:null}_getSearchEntityId(e){const t=this.entityObjs[e];return!t||!t.music_assistant_entity?t?.entity_id:(typeof t.music_assistant_entity=="string"&&(t.music_assistant_entity.includes("{{")||t.music_assistant_entity.includes("{%")),t.music_assistant_entity)}_getPlaybackEntityId(e){return this._getEntityForPurpose(e,"playback_control")}_getActivePlaybackEntityId(e=this._selectedIndex){const t=this.entityObjs?.[e];if(!t)return null;const i=t.entity_id,a=this._getActualResolvedMaEntityForState(e),s=i?this.hass?.states?.[i]:null,n=a?this.hass?.states?.[a]:null;return this._getActivePlaybackEntityIdInternal(e,i,a,s,n)}_getActivePlaybackEntityIdInternal(e,t,i,a,s){if(i===t)return t;const n=Date.now(),l=this._playTimestamps?.[i]||0,c=this._playTimestamps?.[t]||0,d=this._playerStateCache[i]==="playing"&&s?.state!=="playing",h=this._playerStateCache[t]==="playing"&&a?.state!=="playing",u=d||n-l<5e3,m=h||n-c<5e3;if(this._isEntityPlaying(s))return this._lastActiveEntityIdByChip[e]=i,i;if(u&&s?.state!=="playing")return i;if(this._isEntityPlaying(a))return this._lastActiveEntityIdByChip[e]=t,t;if(m&&a?.state!=="playing")return t;const f=this._lastActiveEntityIdByChip?.[e];return f&&(f===i||f===t)?f:i&&i!==t?i:t}_getHiddenControlsForCurrentEntity(){const e=this.entityObjs[this._selectedIndex];if(!e?.hidden_controls)return{};const t={};return Array.isArray(e.hidden_controls)?e.hidden_controls.forEach(i=>{t[i]=!0}):typeof e.hidden_controls=="object"&&Object.assign(t,e.hidden_controls),t}_getActivePlaybackEntityIdForIndex(e){return this._getActivePlaybackEntityId(e)}_getGroupingEntityId(e){const t=this.entityObjs[e];return t?t.music_assistant_entity?typeof t.music_assistant_entity=="string"&&(t.music_assistant_entity.includes("{{")||t.music_assistant_entity.includes("{%"))?this._maResolveCache?.[e]?.id||t.entity_id:t.music_assistant_entity:t.entity_id:null}_getGroupingEntityIdByEntityId(e){const t=this.entityIds.indexOf(e);return t<0?e:this._getGroupingEntityId(t)}_findEntityObjByAnyId(e){return this.entityObjs.find(t=>t.entity_id===e||t.music_assistant_entity===e)||null}_resolveMusicAssistantEntity(e){const t=this.entityObjs[e];if(!t||!t.music_assistant_entity)return t?.entity_id;try{return typeof t.music_assistant_entity=="string"&&(t.music_assistant_entity.includes("{{")||t.music_assistant_entity.includes("{%")),t.music_assistant_entity}catch{return t.entity_id}}_getGroupKey(e){const t=this._getGroupingEntityIdByEntityId(e),i=this.hass?.states?.[t];if(!i||!this._isGroupCapable(i))return e;const a=Array.isArray(i.attributes.group_members)?i.attributes.group_members:[];if(a.length<=1)return e;const s=a[0],n=this.hass?.states?.[s];return this._isGroupCapable(n)?this.entityIds.find(l=>this._getGroupingEntityIdByEntityId(l)===s)||s:e}get entityIds(){return this.entityObjs.map(e=>e.entity_id)}getChipName(e){const t=this.entityObjs.find(i=>i.entity_id===e);return t&&t.name?t.name:this.hass.states[e]?.attributes.friendly_name||e}_getActualGroupMaster(e){if(!e||!e.length)return null;if(!this.hass||e.length===1)return e[0];if(this._lastGroupingMasterId&&e.includes(this._lastGroupingMasterId))return this._lastGroupingMasterId;const t=e.map(i=>{const a=this._getGroupingEntityIdByEntityId(i),s=a?this.hass.states[a]:null;return s?{id:i,groupingId:a,state:s}:null}).filter(Boolean);if(!t.length)return e[0];for(const i of t){const a=i.state?.attributes?.group_members;if(Array.isArray(a)&&a.length>0){const s=a[0],n=t.find(l=>l.groupingId===s);if(n)return n.id}}return e[0]}_getGroupingMasterId(){if(!this.entityIds||!this.entityIds.length)return null;const e=this.groupedSortedEntityIds||[],t=this.currentEntityId||this.entityIds[0];let i=t;if(this._lastGroupingMasterId&&this.entityIds.includes(this._lastGroupingMasterId)){const s=e.find(n=>n.includes(this._lastGroupingMasterId));s&&s.length>1&&s.includes(t)&&(i=this._lastGroupingMasterId)}const a=i?e.find(s=>s.includes(i)):null;if(a&&a.length>1){const s=this._getActualGroupMaster(a);if(s&&this.entityIds.includes(s))return s}return i}_getGroupingMasterIndex(){const e=this._getGroupingMasterId();return e?this.entityIds.indexOf(e):-1}_getGroupingMasterObj(){const e=this._getGroupingMasterIndex();return e>=0?this.entityObjs[e]:null}_isActiveChipGrouped(e){if(!this.entityIds||e<0||e>=this.entityIds.length)return!1;const t=this.entityIds[e];if(!t)return!1;const i=(this.groupedSortedEntityIds||[]).find(a=>a.includes(t));return!!(i&&i.length>1)}_resolveGroupingEntityId(e,t){if(!e?.music_assistant_entity)return t;if(typeof e.music_assistant_entity=="string"&&(e.music_assistant_entity.includes("{{")||e.music_assistant_entity.includes("{%"))){const i=this.entityIds.indexOf(t);return this._maResolveCache?.[i]?.id||t}return e.music_assistant_entity}get currentEntityId(){return this.entityIds[this._selectedIndex]}get currentStateObj(){return!this.hass||!this.currentEntityId?null:this.hass.states[this.currentEntityId]}get currentPlaybackEntityId(){return this._getPlaybackEntityId(this._selectedIndex)}get currentPlaybackStateObj(){const e=this._getResolvedPlaybackEntityIdSync(this._selectedIndex);return!this.hass||!e?this.currentStateObj:this.hass.states[e]}get currentActivePlaybackEntityId(){const e=`${this._selectedIndex}-${this.hass?.states?.[this.currentEntityId]?.state}-${this.hass?.states?.[this._getSearchEntityId(this._selectedIndex)]?.state}`;return(this._cachedActivePlaybackEntityId===void 0||this._cachedActivePlaybackEntityKey!==e)&&(this._cachedActivePlaybackEntityId=this._getActivePlaybackEntityId(this._selectedIndex),this._cachedActivePlaybackEntityKey=e),this._cachedActivePlaybackEntityId}get metadataStateObj(){const e=this._getEntityForPurpose(this._selectedIndex,"metadata");return e?this.hass?.states?.[e]:null}get currentActivePlaybackStateObj(){const e=this.currentActivePlaybackEntityId;return e?this.hass?.states?.[e]:null}get currentVolumeStateObj(){const e=this._getVolumeEntity(this._selectedIndex);return e?this.hass.states[e]:null}get isAnyMenuOpen(){return this._showEntityOptions||this._showGrouping||this._showSourceList||this._showTransferQueue||this._showResolvedEntities||this._showSearchInSheet||this._showSourceMenu||!!this._searchActiveOptionsItem||!!this._activeSearchRowMenuId||!!this._queueActionsMenuOpenId}get _isSelectionFlow(){return!!this._addToPlaylistTarget||!!this._searchHierarchy.some(e=>e.type==="select_track_for_playlist")}_renderMainMenu(e,t,i){return y`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>this._closeEntityOptions()}>
          ${p("common.close")}
        </button>
        <div class="entity-options-divider"></div>
      </div>
      <div class="entity-options-menu ${i?"chips-in-menu":""} entity-options-scroll" style="display:flex; flex-direction:column;">
        <button class="entity-options-item" @click=${()=>{const a=this._getResolvedEntitiesForCurrentChip();a.length===1?(this._openMoreInfoForEntity(a[0]),this._showEntityOptions=!1):this._showResolvedEntities=!0,this.requestUpdate()}}>${p("card.menu.more_info")}</button>
        <button class="entity-options-item" @click=${()=>{this._showSearchSheetInOptions()}}>${p("common.search")}</button>

        ${Array.isArray(e)&&e.length>0?y`
          <button class="entity-options-item" @click=${()=>this._openSourceList()}>${p("card.menu.source")}</button>
        `:k}
        
        ${this._canShowTransferQueueOption()?y`
          <button class="entity-options-item" @click=${()=>this._openTransferQueue()}>${p("card.menu.transfer_queue")}</button>
        `:k}
        
        ${this._renderGroupingMenuOption()}
        
        ${this.config.always_collapsed?k:y`
          <button class="entity-options-item" @click=${()=>{this._lyricsActive=!this._lyricsActive,this._lyricsActive||(this._lastLyricsTrackId=null,this._lastLyricsEntityId=null,this._lastLyricsArtist=null,this._lastLyricsTitle=null),this._showEntityOptions=!1,this.requestUpdate()}}>${p(this._lyricsActive?"card.menu.hide_lyrics":"card.menu.show_lyrics")}</button>
        `}
        
        
        ${t.length?y`
          ${t.map(({action:a,idx:s})=>{const n=this._getActionLabel(a);return y`
              <button
                class="entity-options-item menu-action-item"
                @click=${()=>this._onMenuActionClick(s)}
              >
                ${a.icon?y`
                  <ha-icon
                    class="menu-action-icon"
                    .icon=${a.icon}
                  ></ha-icon>
                `:k}
                ${n?y`<span class="menu-action-label">${n}</span>`:k}
              </button>
            `})}
        `:k}
      </div>
    `}_getChipRowProps(){return{groupedSortedEntityIds:this.groupedSortedEntityIds,entityIds:this.entityIds,selectedEntityId:this.currentEntityId,pinnedIndex:this._pinnedIndex,holdToPin:this._holdToPin,getChipName:e=>this.getChipName(e),getActualGroupMaster:e=>this._getActualGroupMaster(e),artworkHostname:this.config?.artwork_hostname||"",mediaArtworkOverrides:this.config?.media_artwork_overrides||[],fallbackArtwork:this.config?.fallback_artwork||null,getIsChipPlaying:(e,t)=>{const i=this.entityIds.indexOf(e);if(i<0)return!1;const a=this._getEntityForPurpose(i,"playback_control"),s=this.hass?.states?.[a];return this._isEntityPlaying(s)},getChipArt:e=>{const t=this.entityIds.indexOf(e);if(t<0)return null;const i=this._getEntityForPurpose(t,"metadata"),a=this.hass?.states?.[i],s=this._getEntityForPurpose(t,"playback_control"),n=this.hass?.states?.[s],l=this.hass?.states?.[e],c=this._getArtworkUrl(a),d=this._getArtworkUrl(n),h=this._getArtworkUrl(l),u=(a||n||l)?.attributes?.media_title;let m=c;return u&&(!m||!m.url)&&d?.url&&n?.attributes?.media_title===u&&(m=d),u&&(!m||!m.url)&&h?.url&&l?.attributes?.media_title===u&&(m=h),m||d||h},getIsMaActive:e=>{const t=this.entityIds.indexOf(e);if(t<0)return!1;const i=this.entityObjs[t];if(!i?.music_assistant_entity)return!1;const a=this._getEntityForPurpose(t,"playback_control"),s=this.hass?.states?.[a];return a===this._resolveEntity(i.music_assistant_entity,i.entity_id,t)&&this._isEntityPlaying(s)},isIdle:this._isIdle,hass:this.hass,onChipClick:e=>this._onChipClick(e),onIconClick:(e,t)=>{const i=this.entityIds[e],a=this.groupedSortedEntityIds.find(s=>s.includes(i));a&&a.length>1&&(this._selectedIndex=e,this._showEntityOptions=!0,this._showGrouping=!0,this.requestUpdate())},onPinClick:(e,t)=>{t.stopPropagation(),this._onPinClick(t)},onPointerDown:(e,t)=>this._handleChipPointerDown(e,t),onPointerMove:(e,t)=>this._handleChipPointerMove(e,t),onPointerUp:(e,t)=>this._handleChipPointerUp(e,t),quickGroupingMode:this._quickGroupingMode,getQuickGroupingState:e=>{const t=this.currentEntityId,i=this.entityIds.indexOf(t),a=i>=0?this._getGroupingEntityId(i):t,s=a?this.hass.states[a]:null,n=this._getGroupKey(this.currentEntityId);return this._getGroupPlayerState(e,t,null,s,n)},onQuickGroupClick:(e,t)=>{const i=this.entityIds[e];i&&this._toggleGroup(i)},onDoubleClick:e=>{e.stopPropagation(),!(Date.now()-this._lastChipDoubleTapTime<Dl)&&(this._quickGroupingMode=!this._quickGroupingMode,this.requestUpdate())}}}_renderInlineChipRow(e,t){return e?y`
      <div class="chip-row" style="${t?"visibility: hidden; pointer-events: none;":""}">
        ${qs(this._getChipRowProps())}
      </div>
    `:k}_renderInlineActionRow(e){return!e||!e.length?k:y`
      <div style="${this._showEntityOptions?"visibility: hidden; pointer-events: none;":""}">
        ${Io({actions:e.map(({action:t})=>t),onActionChipClick:t=>{const i=e[t];i&&this._onActionChipClick(i.idx)}})}
      </div>
    `}_renderGroupingMenuOption(){if(this.entityIds.length<=1)return k;const e=this.entityIds.reduce((n,l,c)=>{const d=this._getGroupingEntityId(c),h=this.hass.states[d];return n+(this._isGroupCapable(h)?1:0)},0),t=this._getGroupingEntityId(this._selectedIndex),i=this.hass.states[t],a=this.currentEntityId,s=this._getGroupKey(a)!==a;return e>1&&this._isGroupCapable(i)&&!s?y`
        <button class="entity-options-item" @click=${()=>this._openGrouping()}>${p("card.menu.group_players")}</button>
      `:k}_getGroupPlayerState(e,t,i,a,s){const n=this.entityIds.indexOf(e);if(n<0)return{isGroupable:!1,isBusy:!1,busyLabel:"",grouped:!1};const l=this._getGroupingEntityId(n),c=this.hass.states[l];if(!c||!this._isGroupCapable(c))return{isGroupable:!1,isBusy:!1,busyLabel:"",grouped:!1};const d=this._getGroupKey(e);let h=!1,u="";(d!==e&&d!==s||d===e&&d!==s&&c.attributes?.group_members?.length>1)&&(h=!0,u=p("common.unavailable"));const m=(Array.isArray(a?.attributes?.group_members)?a.attributes.group_members:[]).includes(l),f=e===s,g=this.getChipName(t);let v;return f?v=p("card.grouping.master"):m?(v=p("card.grouping.unjoin_from","{master}",g),v==="card.grouping.unjoin_from"&&(v=`Unjoin from ${g}`)):(v=p("card.grouping.join_with","{master}",g),v==="card.grouping.join_with"&&(v=`Join with ${g}`)),{isGroupable:!0,isBusy:h,busyLabel:u,grouped:m,isPrimary:f,entityToCheck:l,tooltip:v}}_renderGroupingSheet(){const e=this._getGroupingMasterId(),t=e?this.entityIds.indexOf(e):-1,i=t>=0?this._getGroupingEntityId(t):e,a=i?this.hass.states[i]:null,s=Array.isArray(a?.attributes?.group_members)&&a.attributes.group_members.length>1,n=[],l=this._getGroupKey(this.currentEntityId);this.entityIds.forEach(v=>{const w=this._getGroupPlayerState(v,this.currentEntityId,null,a,l);w.isGroupable&&n.push({id:v,groupId:w.entityToCheck,isBusy:w.isBusy,busyLabel:w.busyLabel})});const c=this.currentEntityId,d=this.entityIds.indexOf(c),h=d>=0?this._getGroupingEntityId(d):null,u=h?this.hass.states[h]:null,m=u?this._isGroupCapable(u):!1,f=this._getGroupKey(c)!==c;if(!s&&(!m||f))return y`
        <div class="entity-options-header">
          ${this._cardType!=="group_players"?y`
            <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeGrouping()}}>
              ${p("common.back")}
            </button>
          `:k}
          <div class="entity-options-divider"></div>
        </div>
        ${k}
        <div class="entity-options-item" style="padding:12px; opacity:0.75; text-align:center;">
          ${p(f?"card.grouping.unavailable":"card.grouping.no_players")}
        </div>
      `;const g=[...n].sort((v,w)=>{if(s){if(v.id===e)return-1;if(w.id===e)return 1}else{if(v.id===c)return-1;if(w.id===c)return 1}return v.isBusy===w.isBusy?0:v.isBusy?1:-1});return y`
      <div class="entity-options-header grouping-header group-list-header">
        ${this._cardType!=="group_players"?y`
          <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeGrouping()}}>
            ${p("common.back")}
          </button>
        `:k}
        <div class="entity-options-divider"></div>
      </div>
      ${k}
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
        ${s?y`
          <button class="entity-options-item"
            @click=${()=>this._syncGroupVolume()}
            style="flex:0 0 auto; min-width:140px; text-align:center;">
            ${p("card.grouping.sync_volume")}
          </button>
        `:k}
        <button class="entity-options-item"
          @click=${()=>s?this._ungroupAll():this._groupAll()}
          style="flex:0 0 auto; min-width:140px; text-align:center; margin-left:auto;">
          ${p(s?"card.grouping.ungroup_all":"card.grouping.group_all")}
        </button>
      </div>
      <div class="group-list-scroll">
        ${g.length===0?y`
          <div class="entity-options-item" style="padding:12px; opacity:0.75; text-align:center;">
            ${p("card.grouping.no_players")}
          </div>
        `:g.map(v=>{const w=v.id,A=v.groupId,O=(Array.isArray(a?.attributes?.group_members)?a.attributes.group_members:[]).includes(A),D=this.getChipName(w),F=v.isBusy,G=v.busyLabel,Q=this.entityIds.indexOf(w),B=this._getVolumeEntity(Q)||A,te=this.hass.states[B],Z=B?.startsWith&&B.startsWith("remote."),X=Number(te?.attributes?.volume_level||0),U=w===e,ie=!U;let J=p(s?U?"card.grouping.master":O?"card.grouping.joined":"card.grouping.available":w===c?"card.grouping.current":"card.grouping.available");return F&&(J=G||"Unavailable"),y`
            <div class="entity-options-item group-player-row" style="
              display:flex;
              align-items:center;
              gap:6px;
              padding: 12px 8px 4px 8px;
              margin-bottom: 1px;
              ${F?"opacity: 0.5;":""}
            ">
              <div style="flex:1; min-width:120px;">
                <div style="text-align:left;">${D}</div>
                <div style="font-size:0.8em; opacity:0.7; text-align:left;">${J}</div>
              </div>
              <div style="flex:1.8;display:flex;align-items:center;gap:4px;margin:0 6px; min-width:160px;">
                ${Z?y`
                    <div class="vol-stepper" style="display:flex;align-items:center;gap:4px;">
                      <button @click=${()=>this._onGroupVolumeStep(B,-1)} title="${p("common.vol_down")}" style="background:none;border:none;padding:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:inherit;">
                        <ha-icon icon="mdi:minus"></ha-icon>
                      </button>
                      <button @click=${()=>this._onGroupVolumeStep(B,1)} title="${p("common.vol_up")}" style="background:none;border:none;padding:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:inherit;">
                        <ha-icon icon="mdi:plus"></ha-icon>
                      </button>
                    </div>
                  `:y`
                    <div class="volume-slider-container grouping-vol-slider-container" style="flex:1; padding: 0 4px; position: relative; display: flex; align-items: center;">
                      <div class="volume-percentage-indicator ${this._volumeDraggingEntity===w?"visible":""}" style="left: calc(13px + ${this._dragVolume} * (100% - 26px))">
                        ${Math.round(this._dragVolume*100)}%
                      </div>
                      <input
                        class="vol-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        .value=${X}
                        @mousedown=${ae=>this._onVolumeDragStart(ae,w)}
                        @touchstart=${ae=>this._onVolumeDragStart(ae,w)}
                        @input=${ae=>this._onVolumeInput(ae)}
                        @mouseup=${ae=>this._onVolumeDragEnd(ae)}
                        @touchend=${ae=>this._onVolumeDragEnd(ae)}
                        @change=${ae=>this._onGroupVolumeChange(w,B,ae)}
                        title="${p("common.volume")}"
                        style="width:100%;max-width:260px;"
                      />
                    </div>
                  `}
                <span style="min-width:36px;display:inline-block;text-align:right;">${typeof X=="number"?Math.round(X*100)+"%":"--"}</span>
              </div>
              ${ie?y`
                    <button class="group-toggle-btn"
                            @click=${()=>!F&&this._toggleGroup(w)}
                            title=${F?"Player is unavailable":O?"Unjoin":"Join"}
                            style="margin-left:4px; ${F?"cursor: not-allowed; opacity: 0.5;":""}">
                      <ha-icon icon=${O?"mdi:minus-circle-outline":"mdi:plus-circle-outline"}></ha-icon>
                    </button>
                  `:y`<span style="margin-left:4px;margin-right:10px;width:32px;display:inline-block;"></span>`}
            </div>
          `})}
      </div>
    `}_renderTransferQueueSheet(){const e=this._getTransferQueueTargets();return y`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeTransferQueue()}}>
          ${p("common.back")}
        </button>
        <div class="entity-options-divider"></div>
        <div class="entity-options-title" style="margin-bottom:12px;">${p("card.menu.transfer_to")}</div>
      </div>
      <div class="entity-options-scroll">
        ${e.length?y`
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${e.map(t=>y`
              <button
                class="entity-options-item"
                ?disabled=${this._transferQueuePendingTarget===t.maEntityId}
                @click=${()=>this._transferQueueTo(t)}
                style="display:flex;align-items:center;justify-content:flex-start;gap:12px;${this._transferQueuePendingTarget===t.maEntityId?"opacity:0.6;":""}">
                <ha-icon .icon=${t.icon} style="margin-right:4px;"></ha-icon>
                <div style="display:flex;flex-direction:column;align-items:flex-start;">
                  <div>${t.name}</div>
                  <div style="font-size:0.82em;opacity:0.7;">${t.subtitle}</div>
                </div>
                ${t.state?y`<div style="margin-left:auto;font-size:0.82em;opacity:0.7;text-transform:capitalize;">${t.state}</div>`:k}
              </button>
            `)}
          </div>
        `:y`
          <div style="padding: 12px; opacity: 0.75;">${p("card.menu.no_players")}</div>
        `}
        ${this._transferQueueStatus?y`
          <div style="
            margin-top: 14px;
            padding: 10px 12px;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            background: ${this._transferQueueStatus.type==="error"?"rgba(244, 67, 54, 0.18)":"rgba(76, 175, 80, 0.18)"};
            color: ${this._transferQueueStatus.type==="error"?"#ff8a80":"#8bc34a"};
          ">
            ${this._transferQueueStatus.message}
          </div>
        `:k}
      </div>
    `}_renderResolvedEntitiesSheet(){return y`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>{this._showResolvedEntities=!1,this.requestUpdate()}}>
          ${p("common.back")}
        </button>
        <div class="entity-options-divider"></div>
        <div class="entity-options-resolved-entities" style="margin-top:12px;">
          <div class="entity-options-title">${p("card.menu.select_entity")}</div>
          <div class="entity-options-resolved-entities-list">
            ${this._getResolvedEntitiesForCurrentChip().map(e=>{const t=this.hass?.states?.[e],i=t?.attributes?.friendly_name||e,a=t?.attributes?.icon||"mdi:help-circle",s=this._selectedIndex,n=this.entityObjs[s];let l="Main Entity",c=!1;if(n){const d=this._getActualResolvedMaEntityForState(s),h=this._getVolumeEntity(s);c=(this._getActivePlaybackEntityForIndex(s)||n.entity_id)===e,e===d&&d!==n.entity_id?l="Music Assistant Entity":e===h&&h!==n.entity_id&&h!==d&&(l="Volume Entity")}return y`
                <button class="entity-options-item" @click=${()=>{this._openMoreInfoForEntity(e),this._showEntityOptions=!1,this._showResolvedEntities=!1,this.requestUpdate()}}>
                  <ha-icon .icon=${a} style="margin-right: 8px;"></ha-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <div>${c?`${i} (Active)`:i}</div>
                    <div style="font-size: 0.85em; opacity: 0.7;">${l}</div>
                  </div>
                </button>
              `})}
          </div>
        </div>
      </div>
    `}async _fetchLyrics(){if(!this._lyricsActive||this._isIdle||this.isAnyMenuOpen){this._fetchingLyrics=!1,this.requestUpdate();return}this._lyricsError=!1;const e=this.config.lyrics_source||"mass_lrclib",t=this.metadataStateObj||this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;if(!t){this._massLyrics=[],this.requestUpdate();return}const i=t.attributes.media_artist,a=t.attributes.media_title,s=t.attributes.media_album_name,n=t.attributes.media_duration,l=t.attributes.media_content_id,c=l?`${l}:${i}:${a}`:`${i}:${a}`;if(this._fetchingLyrics&&this._fetchingCacheKey===c)return;if(this._lyricsCache.has(c)){const u=this._lyricsCache.get(c);this._lyricsCache.delete(c),this._lyricsCache.set(c,u),this._massLyrics=u,this._fetchingLyrics=!1,this.requestUpdate();return}const d=Symbol();this._currentFetchToken=d,this._fetchingLyrics=!0,this._fetchingCacheKey=c,this._massLyrics=[],this.requestUpdate();let h;try{if(e==="mass")h=await this._getMassLyrics(t,d);else if(e==="lrclib")h=await this._getLrclibLyrics(i,a,s,n,d);else{const u=this._getMassLyrics(t,d),m=this._getLrclibLyrics(i,a,s,n,d),f=e==="mass_lrclib",g=async(A,O)=>{const D=await A;if(this._currentFetchToken!==d)return null;if(D&&D.length>0){const F=O==="mass"&&f||O==="lrclib"&&!f;(!this._massLyrics||this._massLyrics.length===0||F)&&(this._massLyrics=D||[],this._fetchingLyrics=!1,this.requestUpdate())}return D},[v,w]=await Promise.all([g(u,"mass"),g(m,"lrclib")]);if(this._currentFetchToken!==d)return;f?h=v&&v.length>0?v:w:h=w&&w.length>0?w:v}if(this._currentFetchToken===d){if(this._massLyrics=h||[],h&&h.length>0){if(this._lyricsCache.size>=Pl){const u=this._lyricsCache.keys().next().value;this._lyricsCache.delete(u)}this._lyricsCache.set(c,h)}else h===null&&(this._lyricsError=!0);this._fetchingLyrics=!1,this._fetchingCacheKey=null,this.requestUpdate()}}catch(u){this._currentFetchToken===d&&(console.error("YAMP: Failed to fetch lyrics:",u),this._lyricsError=!0,this._fetchingLyrics=!1,this._fetchingCacheKey=null,this.requestUpdate())}}async _getMassLyrics(e,t){if(this._hasMassQueueIntegration===!1)return[];if(!this._massQueueAvailable){if(this._massQueueAvailable=await this._isMassQueueIntegrationAvailable(this.hass),this._hasMassQueueIntegration=this._massQueueAvailable,!this._massQueueAvailable)return[];if(this._currentFetchToken!==t)return[]}try{const i=await Li(this.hass);if(!i)return[];const a=e.attributes.media_content_id;if(!a||!a.includes("://"))return[];const s={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{command:"music/item_by_uri",data:{uri:a},config_entry_id:i},return_response:!0},n=await this.hass.connection.sendMessagePromise(s);if(this._currentFetchToken!==t)return[];const l=n?.response?.response||n?.response||n?.result;if(!l)return[];const c={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{command:"metadata/get_track_lyrics",data:{track:l},config_entry_id:i},return_response:!0},d=await this.hass.connection.sendMessagePromise(c);if(this._currentFetchToken!==t)return[];const h=d?.response?.response||d?.response||d?.result;if(h){let u="";return Array.isArray(h)?u=h[1]||h[0]||"":typeof h=="string"?u=h:typeof h=="object"&&(u=h.lyrics||h.text||""),u?Ws(u):[]}}catch(i){console.warn("YAMP: MA Lyrics fetch failed:",i)}return[]}async _getLrclibLyrics(e,t,i,a,s){if(!e||!t)return[];const n=this._cleanTrackMetadata(e),l=this._cleanTrackMetadata(t),c=i?this._cleanTrackMetadata(i):"";try{let d=`https://lrclib.net/api/get?artist_name=${encodeURIComponent(n)}&track_name=${encodeURIComponent(l)}`;c&&(d+=`&album_name=${encodeURIComponent(c)}`),a&&(d+=`&duration=${Math.round(a)}`);let h=await fetch(d);if(this._currentFetchToken!==s)return[];if(!h.ok&&h.status!==404)throw new Error(`LRCLIB error: ${h.status}`);let u=null;if(h.ok)u=await h.json();else{const m=`https://lrclib.net/api/search?artist_name=${encodeURIComponent(n)}&track_name=${encodeURIComponent(l)}`,f=await fetch(m);if(this._currentFetchToken!==s)return[];if(f.ok){const g=await f.json();g&&g.length>0&&(u=g[0])}}if(u){if(u.instrumental)return[{time:null,text:p("lyrics.instrumental")||"Instrumental Track"}];const m=u.syncedLyrics||u.plainLyrics||"";return m?Ws(m):[]}}catch(d){console.warn("YAMP: LRCLIB Lyrics fetch failed:",d)}return[]}updated(e){if(this._updateHostAttributes(),this._idleImageTemplate&&e.has("hass")&&(this._idleImageTemplateNeedsResolve=!0),this._cardHeightTemplate&&(e.has("hass")||this._cardHeightTemplateNeedsResolve||Ol.some(a=>e.has(a)))&&this._resolveCardHeightTemplate(),this._ensureResolvedActions(),(e.has("_selectedIndex")||e.has("hass"))&&this._updateTransferQueueAvailability({refresh:!1}),this.hass&&this._hasMassQueueIntegration===null&&!this._checkingMassQueueIntegration&&(this._checkingMassQueueIntegration=!0,this._isMassQueueIntegrationAvailable(this.hass).then(a=>{this._hasMassQueueIntegration=a,a&&(this._massQueueAvailable=this._massQueueAvailable||a)}).catch(()=>{this._hasMassQueueIntegration=!1}).finally(()=>{this._checkingMassQueueIntegration=!1,this.requestUpdate()})),this.hass&&this.entityIds){if(this._upcomingFilterActive){const l=this._getEntityForPurpose(this._selectedIndex,"metadata");if(l){const c=this.hass.states[l]?.attributes?.media_title;if(c&&c!==this._lastMediaTitle&&(this._lastMediaTitle=c,this._upcomingFilterActive)){const d=Date.now();this._latestManualShiftTime&&d-this._latestManualShiftTime<4e3||this._advanceQueueInUI(null,!1),this._refreshQueue({delayMs:2e4})}}}const a=Date.now();for(let l=0;l<this.entityIds.length;l++){const c=this.entityIds[l],d=this.entityObjs[l];if(!d)continue;const h=d.entity_id,u=this._getActualResolvedMaEntityForState(l),m=this.hass.states[h]?.state,f=this._playerStateCache[h];if(m==="playing"?(this._playTimestamps[h]=a,this._lastActiveEntityIdByChip[l]=h):f==="playing"&&m!=="playing"&&(this._playTimestamps[h]=a),this._playerStateCache[h]=m,u&&u!==h){const v=this.hass.states[u]?.state,w=this._playerStateCache[u];v==="playing"?(this._playTimestamps[u]=a,this._lastActiveEntityIdByChip[l]=u):w==="playing"&&v!=="playing"&&(this._playTimestamps[u]=a),this._playerStateCache[u]=v}const g=this._getEntityForPurpose(l,"sorting");g&&this.hass.states[g]?.state==="playing"&&(this._playTimestamps[c]=a)}if(this._manualSelect&&this._pinnedIndex===null&&this._manualSelectPlayingSet){for(const l of[...this._manualSelectPlayingSet]){const c=this.hass.states[l];this._isEntityPlaying(c)||this._manualSelectPlayingSet.delete(l)}for(const l of this.entityIds){const c=this.hass.states[l];if(this._isEntityPlaying(c)&&!this._manualSelectPlayingSet.has(l)){this._manualSelect=!1,this._manualSelectPlayingSet=null;break}}}if(this._updateIdleState(e),!this._manualSelect&&!this.isAnyMenuOpen){const l=this.sortedEntityIds;if(l.length>0){let c=l[0];const d=c?(this.groupedSortedEntityIds||[]).find(w=>w.includes(c)):null;if(d&&d.length>1){const w=this._getActualGroupMaster(d);w&&(c=w)}const h=this.entityIds.indexOf(c),u=h>=0?this._getEntityForPurpose(h,"sorting"):null,m=u?this.hass.states[u]:null,f=this._isCurrentEntityPlaying(),g=this.entityObjs[this._selectedIndex]?.disable_auto_select,v=f&&!g;(this._isEntityPlaying(m)||g)&&this.entityIds[this._selectedIndex]!==c&&(!this._idleTimeout||!this._hasSeenPlayback)&&!v&&!this.entityObjs[h]?.disable_auto_select&&(this._selectedIndex=h)}}const s=this.entityIds[this._selectedIndex],n=s?(this.groupedSortedEntityIds||[]).find(l=>l.includes(s)):null;if(n&&n.length>1){const l=this._getActualGroupMaster(n);if(l&&l!==s){const c=this.entityIds.indexOf(l);c>=0&&!this.entityObjs[c]?.disable_auto_select&&(this._selectedIndex=c,this._lastGroupingMasterId=l)}}this._ensureResolvedMaForIndex(this._selectedIndex),this._ensureResolvedVolForIndex(this._selectedIndex),this._updateSelectedEntityHelper(),this._handleSelectEntityFromHelper()}if(this._handleVolumeOverlayDetection(e),this._lyricsActive){const a=this.metadataStateObj||this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj,s=a?.attributes?.media_content_id||null,n=a?.attributes?.media_artist||null,l=a?.attributes?.media_title||null,c=this.currentActivePlaybackEntityId||this.currentEntityId||null,d=!!(s||n||l),h=s!==this._lastLyricsTrackId||n!==this._lastLyricsArtist||l!==this._lastLyricsTitle||c!==this._lastLyricsEntityId;d&&h&&!this._isIdle&&!this.isAnyMenuOpen?(this._lastLyricsTrackId=s,this._lastLyricsArtist=n,this._lastLyricsTitle=l,this._lastLyricsEntityId=c,this._fetchingLyrics=!0,this._lyricsError=!1,this._lyricsFetchTimeout&&clearTimeout(this._lyricsFetchTimeout),this._lyricsFetchTimeout=setTimeout(()=>{this._fetchLyrics(),this._lyricsFetchTimeout=null},500)):!d&&h&&(this._lastLyricsTrackId=null,this._lastLyricsArtist=null,this._lastLyricsTitle=null,this._lastLyricsEntityId=c,this._lyricsFetchTimeout&&clearTimeout(this._lyricsFetchTimeout),this._massLyrics=[],this._fetchingLyrics=!1,this._lyricsError=!1,this.requestUpdate())}super.updated?.(e),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=null);const t=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;if(this._isEntityPlaying(t)&&t.attributes.media_duration&&(this._progressTimer=setInterval(()=>{this.requestUpdate()},500)),this._alwaysCollapsed&&this._expandOnSearch&&this._showSearchInSheet){this._prevCollapsed!==!1&&(this._prevCollapsed=!1,this._notifyResize());return}const i=this._alwaysCollapsed?!0:this._collapseOnIdle?this._isIdle:!1;if(this._prevCollapsed!==i&&(this._prevCollapsed=i,this._notifyResize()),this._addGrabScroll(".chip-row"),this._addGrabScroll(".action-chip-row"),this._addGrabScroll(".search-filter-chips"),this._addVerticalGrabScroll(".floating-source-index"),this._lastRenderedCollapsed&&!this._lastRenderedHideControls){const a=this.renderRoot?.querySelector(".card-lower-content");if(a){const s=a.offsetHeight;if(s&&s>0){const n=Number(this._cardHeightTemplate?this._cardHeightTemplateResult:this.config?.card_height);Number.isFinite(n)&&n>0?(!this._collapsedBaselineHeight||s<this._collapsedBaselineHeight-1)&&(this._collapsedBaselineHeight=s):this._collapsedBaselineHeight=s}}}if(this._showSearchInSheet){const a=this._alwaysCollapsed&&this._expandOnSearch?300:200;setTimeout(()=>{const s=()=>{const c=this.renderRoot.querySelector("#search-input-box");return c?(c.focus(),this._searchInputAutoFocused=!0,!0):!1};!this._disableSearchAutofocus&&!this._searchInputAutoFocused&&(s()||setTimeout(()=>{this._showSearchInSheet&&!this._disableSearchAutofocus&&!this._searchInputAutoFocused&&s()},200));const n=this._getVisibleSearchFilterClasses().join(",");if((!this._searchLoading||n)&&this._lastSearchChipClasses!==n){const c=this.renderRoot.querySelector(".search-filter-chips");c&&(c.scrollLeft=0);const d=this.renderRoot.querySelector(".entity-options-overlay");d&&(d.scrollTop=0);const h=this.renderRoot.querySelector(".entity-options-sheet");h&&(h.scrollTop=0),this._lastSearchChipClasses=n}const l=this.renderRoot.querySelector("#search-filter-chip-row");l&&(l.scrollWidth>l.clientWidth+2?l.style.justifyContent="flex-start":l.style.justifyContent="center")},a)}this._showSourceList&&setTimeout(()=>{const a=this.renderRoot.querySelector(".entity-options-overlay");a&&(a.scrollTop=0)},0)}_toggleSourceMenu(){this._showSourceMenu=!this._showSourceMenu,this._showSourceMenu?(this._manualSelect=!0,setTimeout(()=>{this._shouldDropdownOpenUp=!0,this.requestUpdate(),this._addSourceDropdownOutsideHandler()},0)):(this._manualSelect=!1,this._removeSourceDropdownOutsideHandler())}_addSourceDropdownOutsideHandler(){this._sourceDropdownOutsideHandler||(this._sourceDropdownOutsideHandler=e=>{const t=this.renderRoot.querySelector(".source-dropdown"),i=this.renderRoot.querySelector(".source-menu-btn"),a=e.composedPath?e.composedPath():[];t&&a.includes(t)||i&&a.includes(i)||(this._showSourceMenu=!1,this._manualSelect=!1,this._removeSourceDropdownOutsideHandler(),this.requestUpdate())},window.addEventListener("mousedown",this._sourceDropdownOutsideHandler,!0),window.addEventListener("touchstart",this._sourceDropdownOutsideHandler,!0))}_removeSourceDropdownOutsideHandler(){this._sourceDropdownOutsideHandler&&(window.removeEventListener("mousedown",this._sourceDropdownOutsideHandler,!0),window.removeEventListener("touchstart",this._sourceDropdownOutsideHandler,!0),this._sourceDropdownOutsideHandler=null)}_selectSource(e){const t=this.currentEntityId;!t||!e||(this.hass.callService("media_player","select_source",{entity_id:t,source:e}),this._closeEntityOptions())}_onPinClick(e){e.stopPropagation(),this._manualSelect=!1,this._pinnedIndex=null,this._manualSelectPlayingSet=null}_onChipClick(e){if(this._holdToPin&&this._justPinned){this._justPinned=!1;return}if(this._selectedIndex=e,this._isIdle){const t=this.entityIds[e],i=this._getEntityForPurpose(e,"sorting"),a=this.hass?.states?.[i]||this.hass?.states?.[t];this._isEntityPlaying(a)&&(this._setIdleState(!1),this._hasSeenPlayback=!0,this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),this._resetIdleScreen())}if(this._lastActiveEntityId=null,clearTimeout(this._manualSelectTimeout),this._holdToPin)if(this._pinnedIndex!==null)this._manualSelect=!0;else{this._manualSelect=!0,this._manualSelectPlayingSet=new Set;for(const t of this.entityIds){const i=this.hass?.states?.[t];this._isEntityPlaying(i)&&this._manualSelectPlayingSet.add(t)}}else this._manualSelect=!0,this._pinnedIndex=e;this.requestUpdate()}_pinChip(e){this._justPinned=!0,clearTimeout(this._manualSelectTimeout),this._manualSelectPlayingSet=null,this._pinnedIndex=e,this._manualSelect=!0,this.requestUpdate()}async _onActionChipClick(e){const t=this.config.actions[e];t&&await this._handleAction(t)}async _handleAction(e){if(!e)return;if(e.menu_item){switch(this._quickMenuInvoke=!0,e.menu_item){case"more-info":this._openMoreInfo(),this._showEntityOptions=!1,this.requestUpdate();break;case"group-players":this._showEntityOptions=!0,this._showGrouping=!0,this.requestUpdate();break;case"search":this._openQuickSearchOverlay();break;case"search-recently-played":this._showEntityOptions=!0,this._showSearchSheetInOptions("recently-played"),setTimeout(()=>{this._notifyResize()},0);break;case"search-next-up":this._showEntityOptions=!0,this._showSearchSheetInOptions("next-up"),setTimeout(()=>{this._notifyResize()},0);break;case"source":this._showEntityOptions=!0,this._showSourceList=!0,this._showGrouping=!1,this.requestUpdate();break;case"transfer-queue":this._showEntityOptions=!0,this._openTransferQueue();break}return}if(typeof e.navigation_path=="string"&&e.navigation_path.trim()!==""||e.action==="navigate"){let s=(typeof e.navigation_path=="string"?e.navigation_path:e.path||"").trim();const n=e.navigation_new_tab===!0,l=this._getTemplateContext();let c=null;n&&(c=wa(this.hass,s,l)),c!=null?this._handleNavigate(c,n):(s=await ji(this.hass,s,l),this._handleNavigate(s,n));return}if(e.action==="toggle_lyrics"){this._lyricsActive=!this._lyricsActive,this.requestUpdate();return}if(e.action==="prev_entity"||e.action==="next_entity"){const s=this.sortedEntityIds;if(s&&s.length>0){const n=this.entityIds[this._selectedIndex],l=s.indexOf(n);if(l!==-1){let c;if(e.action==="prev_entity"?c=Math.max(0,l-1):c=Math.min(s.length-1,l+1),c!==l){const d=s[c],h=this.entityIds.indexOf(d);h!==-1&&h!==this._selectedIndex&&this._onChipClick(h)}}}return}if(!e.service)return;const[t,i]=e.service.split(".");let a={...e.service_data||{}};if(t==="script"&&e.script_variable===!0){const s=this.currentEntityId,n=this._getSearchEntityId(this._selectedIndex),l=await this._resolveTemplateAtActionTime(n,s),c=this.currentActivePlaybackEntityId||this._getPlaybackEntityId(this._selectedIndex),d=await this._resolveTemplateAtActionTime(c,s);(a.entity_id==="current"||a.entity_id==="$current"||a.entity_id==="this")&&delete a.entity_id,a.yamp_entity=l||s,a.yamp_main_entity=s,a.yamp_playback_entity=d}else if(!(t==="script"&&e.script_variable===!0)&&(a.entity_id==="current"||a.entity_id==="$current"||a.entity_id==="this"||!a.entity_id))if(t==="music_assistant"){const s=this._getSearchEntityId(this._selectedIndex);a.entity_id=await this._resolveTemplateAtActionTime(s,this.currentEntityId)}else if(t==="media_player"){const s=this.currentActivePlaybackEntityId||this._getPlaybackEntityId(this._selectedIndex);a.entity_id=await this._resolveTemplateAtActionTime(s,this.currentEntityId)}else a.entity_id=this.currentEntityId;this.hass.callService(t,i,a)}_onTapAreaPointerDown(e){this.isAnyMenuOpen||e.composedPath().some(t=>t.tagName==="BUTTON"||t.tagName==="HA-ICON"||t.tagName==="INPUT"||t.classList&&t.classList.contains("clickable-artist")||t.classList&&t.classList.contains("details"))||(this._gestureActive=!0,this._gestureStartTime=Date.now(),this._gestureStartX=e.clientX,this._gestureStartY=e.clientY,this._gestureHoldTriggered=!1,this._gestureTapArea=e.currentTarget,this._cardTriggers?.hold&&(this._gestureHoldTimer=setTimeout(()=>{this._gestureActive&&(this._gestureHoldTriggered=!0,this._showGestureFeedback("hold",this._gestureStartX,this._gestureStartY),this._handleAction(this._cardTriggers.hold))},Gr)))}_onTapAreaPointerMove(e){if(this.isAnyMenuOpen||!this._gestureActive)return;const t=Math.abs(e.clientX-this._gestureStartX),i=Math.abs(e.clientY-this._gestureStartY);(t>Gt||i>Gt)&&clearTimeout(this._gestureHoldTimer)}_onTapAreaPointerUp(e){if(this.isAnyMenuOpen||!this._gestureActive||(this._gestureActive=!1,clearTimeout(this._gestureHoldTimer),this._gestureHoldTriggered)||Date.now()-this._gestureStartTime>Gr)return;const t=e.clientX-this._gestureStartX,i=e.clientY-this._gestureStartY,a=Math.abs(t),s=Math.abs(i);if(a>=Wr&&s<Wr){clearTimeout(this._tapTimer);const h=e.clientX,u=e.clientY;if(t<0&&this._cardTriggers?.swipe_left){this._showGestureFeedback("swipe_left",h,u),this._handleAction(this._cardTriggers.swipe_left);return}else if(t>0&&this._cardTriggers?.swipe_right){this._showGestureFeedback("swipe_right",h,u),this._handleAction(this._cardTriggers.swipe_right);return}}if(a>Gt||s>Gt)return;const n=Date.now(),l=n-(this._lastTapTime||0);this._lastTapTime=n;const c=e.clientX,d=e.clientY;l<Qr?(clearTimeout(this._tapTimer),this._cardTriggers?.double_tap&&(this._showGestureFeedback("double_tap",c,d),this._handleAction(this._cardTriggers.double_tap))):this._tapTimer=setTimeout(()=>{this._cardTriggers?.tap&&(this._showGestureFeedback("tap",c,d),this._handleAction(this._cardTriggers.tap))},Fl)}_showGestureFeedback(e,t,i){const a=this._gestureTapArea||this.shadowRoot?.querySelector(".card-artwork-spacer")||this.shadowRoot?.querySelector(".collapsed-artwork-container");if(!a)return;const s=a.getBoundingClientRect(),n=t-s.left,l=i-s.top,c=document.createElement("div");c.className=`gesture-ripple ${e}`,c.style.left=`${n}px`,c.style.top=`${l}px`;let d=a.querySelector(".gesture-feedback-container");d||(d=document.createElement("div"),d.className="gesture-feedback-container",a.appendChild(d)),c.addEventListener("animationend",()=>c.remove()),d.appendChild(c)}_onMenuActionClick(e){const t=this.config.actions?.[e];t&&(t.menu_item||(this._quickMenuInvoke=!0),this._onActionChipClick(e),t.menu_item||this._dismissWithAnimation())}_getActionLabel(e){if(!e)return"";if(typeof e.name=="string"&&e.name.trim()!=="")return e.name.trim();const t=!!e.icon;return e.menu_item?t?"":{search:"Search","search-recently-played":"Recently Played","search-next-up":"Next Up",source:"Source","more-info":"More Info","group-players":"Group Players","transfer-queue":"Transfer Queue"}[e.menu_item]??e.menu_item:typeof e.navigation_path=="string"&&e.navigation_path.trim()!==""||e.action==="navigate"?t?"":"Navigate":e.service?t?"":e.service:t?"":"Action"}async _onControlClick(e){const t=this._getEntityForPurpose(this._selectedIndex,"playback_control");if(!t)return;const i=this.hass?.states?.[t]||this.currentStateObj;switch(e){case"play_pause":this._isEntityPlaying(i)?(this.hass.callService("media_player","media_pause",{entity_id:t}),this._lastPlayingEntityIdByChip||(this._lastPlayingEntityIdByChip={}),this._lastPlayingEntityIdByChip[this._selectedIndex]=t,this._pauseTimestamps||(this._pauseTimestamps={}),this._pauseTimestamps[this._selectedIndex]=Date.now(),this._controlFocusEntityId=t,this._optimisticPlayback={entity_id:t,state:"paused",ts:Date.now()},this.requestUpdate(),setTimeout(()=>{this._optimisticPlayback=null,this.requestUpdate()},1200)):(this.hass.callService("media_player","media_play",{entity_id:t}),this._lastPlayingEntityIdByChip&&delete this._lastPlayingEntityIdByChip[this._selectedIndex],this._pauseTimestamps&&delete this._pauseTimestamps[this._selectedIndex],this._controlFocusEntityId=t,this._optimisticPlayback={entity_id:t,state:"playing",ts:Date.now()},this.requestUpdate(),setTimeout(()=>{this._optimisticPlayback=null,this.requestUpdate()},1200));break;case"next":this._advanceQueueInUI(null,!0),this.hass.callService("media_player","media_next_track",{entity_id:t});break;case"prev":this.hass.callService("media_player","media_previous_track",{entity_id:t});break;case"stop":if(this.hass.callService("media_player","media_stop",{entity_id:t}),i){const a=t;this._optimisticPlayback={entity_id:a,state:"idle",ts:Date.now()},this.requestUpdate(),setTimeout(()=>{this._optimisticPlayback=null,this.requestUpdate()},1200)}break;case"shuffle":{const a=!!i.attributes.shuffle;this.hass.callService("media_player","shuffle_set",{entity_id:t,shuffle:!a});break}case"repeat":{let a=i.attributes.repeat||"off",s;a==="off"?s="all":a==="all"?s="one":s="off",this.hass.callService("media_player","repeat_set",{entity_id:t,repeat:s});break}case"power":{const a=this.currentEntityId,s=(this.hass?.states?.[a]||i)?.state==="off"?"turn_on":"turn_off";this.hass.callService("media_player",s,{entity_id:a});const n=this.entityObjs[this._selectedIndex];if(n&&n.sync_power){const l=this._getVolumeEntity(this._selectedIndex);l&&l!==n.entity_id&&this.hass.callService("media_player",s,{entity_id:l})}break}case"favorite":{const a=this._getFavoriteButtonEntity(),s=this.hass?.states?.[t]?.attributes?.media_content_id,n=this._isCurrentTrackFavorited(),l=await this._isMassQueueIntegrationAvailable(this.hass);if(n&&l){const c=this._getMusicAssistantState()?.entity_id;if(c)try{const d={type:"call_service",domain:"mass_queue",service:"unfavorite_current_item",service_data:{entity:c}};await this.hass.connection.sendMessagePromise(d),s&&(this._favoriteStatusCache||(this._favoriteStatusCache={}),this._favoriteStatusCache[s]={isFavorited:!1}),this._searchResultsByType&&Object.keys(this._searchResultsByType).forEach(h=>{(h.includes("_favorites")||h==="favorites")&&delete this._searchResultsByType[h]}),this._checkingFavorites=null,this.requestUpdate()}catch(d){console.error("yamp: Failed to unfavorite current item:",d)}}else a&&(this.hass.callService("button","press",{entity_id:a}),s&&(this._favoriteStatusCache||(this._favoriteStatusCache={}),this._favoriteStatusCache[s]={isFavorited:!0},this._checkingFavorites=null,this._searchResultsByType&&Object.keys(this._searchResultsByType).forEach(c=>{(c.includes("_favorites")||c==="favorites")&&delete this._searchResultsByType[c]}),this.requestUpdate()));break}}}_onVolumeChange(e){this._suppressVolumeOverlay();const t=this._selectedIndex,i=this._getGroupingEntityId(t)||this.currentEntityId,a=this.hass.states[i],s=Number(e.target.value),n=this.entityObjs[t],l=typeof n.group_volume=="boolean"?n.group_volume:!0,c=this._isActiveChipGrouped(t);if(!l||!c){this.hass.callService("media_player","volume_set",{entity_id:this._getVolumeEntity(t),volume_level:s});return}if(this._isCurrentlyGrouped(a)){const d=this.entityObjs[t].entity_id,h=[...new Set([d,...a.attributes.group_members])],u=typeof this._groupBaseVolume=="number"?this._groupBaseVolume:Number(this.currentVolumeStateObj?.attributes.volume_level||0),m=s-u,f=new Set;for(const g of h){const v=this._resolveEntityIdxByGroupingId(g);if(v>=0&&v!==t){const D=this.entityObjs[v];if(D&&D.group_volume===!1)continue}const w=v>=0?this._getVolumeEntity(v):g;if(f.has(w))continue;f.add(w);const A=this.hass.states[w];if(!A)continue;let O=Number(A.attributes.volume_level||0)+m;O=Math.max(0,Math.min(1,O)),O=Math.round(O*1e4)/1e4,this.hass.callService("media_player","volume_set",{entity_id:w,volume_level:O})}this._groupBaseVolume=s}else{const d=this._getVolumeEntity(t);this.hass.callService("media_player","volume_set",{entity_id:d,volume_level:s})}}_onVolumeStep(e){this._suppressVolumeOverlay();const t=this._selectedIndex,i=this._getVolumeEntity(t);if(!i)return;const a=i.startsWith&&i.startsWith("remote."),s=this.currentVolumeStateObj;if(!s)return;if(a){this.hass.callService("remote","send_command",{entity_id:i,command:e>0?"volume_up":"volume_down"});return}const n=this._getGroupingEntityId(t)||this.currentEntityId,l=this.hass.states[n],c=this.entityObjs[t],d=typeof c.group_volume=="boolean"?c.group_volume:!0,h=this._isActiveChipGrouped(t);if(d&&h&&this._isCurrentlyGrouped(l)){const u=this.entityObjs[t].entity_id,m=[...new Set([u,...l.attributes.group_members])],f=this._volumeStep*e,g=new Set;for(const v of m){const w=this._resolveEntityIdxByGroupingId(v);if(w>=0&&w!==t){const F=this.entityObjs[w];if(F&&F.group_volume===!1)continue}const A=w>=0?this._getVolumeEntity(w):v;if(g.has(A))continue;g.add(A);const O=this.hass.states[A];if(!O)continue;let D=Number(O.attributes.volume_level||0)+f;D=Math.max(0,Math.min(1,D)),D=Math.round(D*1e4)/1e4,this.hass.callService("media_player","volume_set",{entity_id:A,volume_level:D})}}else{let u=Number(s.attributes.volume_level||0);u+=this._volumeStep*e,u=Math.max(0,Math.min(1,u)),u=Math.round(u*1e4)/1e4,this.hass.callService("media_player","volume_set",{entity_id:i,volume_level:u})}}_onMuteToggle(){this._suppressVolumeOverlay();const e=this._selectedIndex,t=this._getVolumeEntity(e);if(!t)return;const i=t.startsWith&&t.startsWith("remote."),a=this.currentVolumeStateObj;if(!a)return;const s=a.attributes.is_volume_muted??!1,n=a.attributes.volume_level??0;if(i){s?this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:.5}):this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:0});return}if(!this._supportsFeature(a,va)){if(n>0)this._previousVolume=n,this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:0});else{const m=this._previousVolume??.5;this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:m}),this._previousVolume=null}return}const l=this._getGroupingEntityId(e)||this.currentEntityId,c=this.hass.states[l],d=this.entityObjs[e],h=typeof d.group_volume=="boolean"?d.group_volume:!0,u=this._isActiveChipGrouped(e);if(h&&u&&this._isCurrentlyGrouped(c)){const m=this.entityObjs[e].entity_id,f=[...new Set([m,...c.attributes.group_members])],g=new Set;for(const v of f){const w=this._resolveEntityIdxByGroupingId(v);if(w>=0&&w!==e){const D=this.entityObjs[w];if(D&&D.group_volume===!1)continue}const A=w>=0?this._getVolumeEntity(w):v;if(g.has(A))continue;g.add(A);const O=this.hass.states[A];O&&this._supportsFeature(O,va)?this.hass.callService("media_player","volume_mute",{entity_id:A,is_volume_muted:!s}):(O?.attributes?.volume_level??0)>0?this.hass.callService("media_player","volume_set",{entity_id:A,volume_level:0}):this.hass.callService("media_player","volume_set",{entity_id:A,volume_level:.5})}}else this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!s})}_onVolumeDragStart(e,t="main"){if(!this.hass)return;const i=this.currentVolumeStateObj;this._groupBaseVolume=i?Number(i.attributes.volume_level||0):0,this._volumeDraggingEntity=t,this._dragVolume=Number(e.target.value)}_onVolumeDragEnd(e){this._groupBaseVolume=null,this._volumeDraggingEntity=null}_onVolumeInput(e){this._dragVolume=Number(e.target.value)}_handleVolumeOverlayDetection(e){if(this._showVolumeOverlay&&e.has("hass")&&this.hass&&!this.isAnyMenuOpen){const t=this._getVolumeEntity(this._selectedIndex),i=t?this.hass.states[t]:null,a=i?.attributes?.volume_level??null,s=i?.attributes?.is_volume_muted??!1;t!==this._lastTrackedVolEntityId?(this._lastTrackedVolumeLevel=a,this._lastTrackedVolEntityId=t):a!==null&&this._lastTrackedVolumeLevel!==null&&a!==this._lastTrackedVolumeLevel&&!this._internalVolumeChangeFlag&&!this._volumeDraggingEntity&&this._showVolumeOverlayBriefly(a,s),this._lastTrackedVolumeLevel=a}}_showVolumeOverlayBriefly(e,t){this._volumeOverlayValue=Math.round(e*100),this._volumeOverlayMuted=t,this._volumeOverlayActive=!0,this._volumeOverlayTimer&&clearTimeout(this._volumeOverlayTimer),this._volumeOverlayTimer=setTimeout(()=>{this._volumeOverlayActive=!1,this._volumeOverlayTimer=null,this.requestUpdate()},3e3),this.requestUpdate()}_suppressVolumeOverlay(){this._internalVolumeChangeFlag=!0,this._internalVolumeSuppressTimer&&clearTimeout(this._internalVolumeSuppressTimer),this._internalVolumeSuppressTimer=setTimeout(()=>{this._internalVolumeChangeFlag=!1,this._internalVolumeSuppressTimer=null},1500)}_getVolumeOverlayIcon(){return this._volumeOverlayMuted||this._volumeOverlayValue===0?"mdi:volume-off":this._volumeOverlayValue<20?"mdi:volume-low":this._volumeOverlayValue<50?"mdi:volume-medium":"mdi:volume-high"}_dismissVolumeOverlay(){this._volumeOverlayActive=!1,this._volumeOverlayTimer&&(clearTimeout(this._volumeOverlayTimer),this._volumeOverlayTimer=null),this.requestUpdate()}_onGroupVolumeChange(e,t,i){this._suppressVolumeOverlay();const a=Number(i.target.value);this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:a}),this.requestUpdate()}_onGroupVolumeStep(e,t){this._suppressVolumeOverlay(),this.hass.callService("remote","send_command",{entity_id:e,command:t>0?"volume_up":"volume_down"}),this.requestUpdate()}_onSourceChange(e){const t=this.currentEntityId,i=e.target.value;!t||!i||this.hass.callService("media_player","select_source",{entity_id:t,source:i})}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.currentEntityId},bubbles:!0,composed:!0}))}async _onProgressBarClick(e){try{e.stopPropagation();const t=this.currentEntityId,i=this._getActualResolvedMaEntityForState(this._selectedIndex),a=t?this.hass?.states?.[t]:null,s=i?this.hass?.states?.[i]:null;let n;if(this._controlFocusEntityId&&(this._controlFocusEntityId===i||this._controlFocusEntityId===t))n=this._controlFocusEntityId;else if(this._isEntityPlaying(s))n=i;else if(this._isEntityPlaying(a))n=t;else{const m=this._lastPlayingEntityIdByChip?.[this._selectedIndex];if(m&&(m===i||m===t))n=m;else{const f=this._getPlaybackEntityId(this._selectedIndex);n=await this._resolveTemplateAtActionTime(f,this.currentEntityId)}}const l=this.hass?.states?.[n]||this.currentStateObj;if(!n||!l||!l.attributes){console.warn("YAMP: Cannot seek - invalid target or state",n,l);return}const c=l.attributes.media_duration;if(!c)return;const d=e.target.getBoundingClientRect(),h=(e.clientX-d.left)/d.width,u=Math.floor(h*c);this._seekAnchor={position:u,timestamp:Date.now(),trackId:l.attributes.media_content_id||l.attributes.media_title},this._seekConvergenceLock=Date.now()+2e3,this._seekOffset=null,this.requestUpdate(),this.hass.callService("media_player","media_seek",{entity_id:n,seek_position:u})}catch(t){console.error("YAMP: Error in _onProgressBarClick",t)}}_resetSearchContext(){this._searchResultsByType={},this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this._loadingSearchRowMenuId=null,this._errorSearchRowMenuId=null}_showSearchSuccessToast(e=null,t=null){this._showQueueSuccessMessage=!0,e&&(this._successSearchRowMenuId=e),t&&(this._successSearchRowType=t),this.requestUpdate(),this._successToastHandle&&clearTimeout(this._successToastHandle),this._successToastHandle=setTimeout(()=>{this._showQueueSuccessMessage=!1,this._successSearchRowMenuId=null,this._successSearchRowType=null,this._successToastHandle=null,this.requestUpdate()},Hr)}render(){if(!this.hass||!this.config)return k;const e=this._cardHeightTemplate?this._cardHeightTemplateResult:this.config.card_height,t=typeof e=="string"&&e.includes("px")?parseFloat(e):Number(e),i=typeof t=="number"&&Number.isFinite(t)&&t>0||typeof t=="string"&&t.trim()!=="",a=this._collapsedBaselineHeight||220,s=this.entityObjs.length===1,n=s&&this.config.always_collapsed===!0&&this.config.expand_on_search!==!0,l=this.config.pin_search_headers===!0&&!n,c=!(this.config.hide_search_headers_on_idle===!0&&this._isIdle),d=this.config.show_chip_row||"auto",h=this.entityObjs.length>1,u=(d==="in_menu"||d==="in_menu_on_idle"&&this._isIdle)&&h,m=d!=="in_menu"&&(h||d==="always"),f=d==="in_menu_on_idle"&&this._isIdle&&h,g=d==="in_menu_on_idle"&&h&&!this._showSearchInSheet,v=(this.config.actions??[]).map((I,ge)=>({action:I,idx:ge})).filter(({action:I})=>I?.action!=="sync_selected_entity"&&I?.action!=="select_entity");let w=null;const A=(I,ge)=>{if(I?.placement)return I.placement;let Ce=I?.in_menu;if(typeof Ce=="string"&&(Ce.includes("{{")||Ce.includes("{%"))){const Ei=this._actionInMenuResolveCache?.[ge]?.value;if(Ei!==void 0)Ce=Ei;else{w||(w={...this._getTemplateContext(),state:this.hass?.states[this.currentEntityId]?.state||"unknown",attributes:this.hass?.states[this.currentEntityId]?.attributes||{}});const Si=wa(this.hass,Ce,w);Si!==null&&(Ce=Si)}}return Ce==="true"&&(Ce=!0),Ce==="false"&&(Ce=!1),Ce==="hidden"?"hidden":Ce===!0?"menu":"chip"},O=v.filter(({action:I,idx:ge})=>A(I,ge)==="chip"),D=v.filter(({action:I,idx:ge})=>A(I,ge)==="menu"),F=v.find(({action:I})=>I?.card_trigger==="tap"),G=v.find(({action:I})=>I?.card_trigger==="hold"),Q=v.find(({action:I})=>I?.card_trigger==="double_tap"),B=v.find(({action:I})=>I?.card_trigger==="swipe_left"),te=v.find(({action:I})=>I?.card_trigger==="swipe_right");this._cardTriggers={tap:F?.action,hold:G?.action,double_tap:Q?.action,swipe_left:B?.action,swipe_right:te?.action};const Z=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj,X=this.getChipName(this.currentEntityId);if(!Z)return y`<div class="details">${p("common.not_found")}</div>`;const U=this._getHiddenControlsForCurrentEntity(),ie=!!this._getFavoriteButtonEntity()&&!U.favorite,J=this._isCurrentTrackFavorited(),ae=!U.power&&(this._supportsFeature(Z,xa)||this._supportsFeature(Z,ba)),ne=this._controlLayout==="modern"&&ae,oe=this._controlLayout==="modern"&&ie;let xe=k;ne?xe=y`
          <button
            class="volume-icon-btn favorite-volume-btn${Z?.state!=="off"?" active":""}"
            @click=${()=>this._onControlClick("power")}
            title="${p("common.power")}"
          >
            <ha-icon .icon=${"mdi:power"}></ha-icon>
          </button>
        `:this._controlLayout==="modern"&&(xe=y`
          <button
            class="volume-icon-btn favorite-volume-btn"
            @click=${()=>this._openQuickSearchOverlay()}
            title="${p("common.search")}"
          >
            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          </button>
        `);const L=oe?y`
        <button
          class="volume-icon-btn favorite-volume-btn${J?" active":""}"
          @click=${()=>this._onControlClick("favorite")}
          title="${p("common.favorite")}"
        >
          <ha-icon
            style=${J?"color: var(--custom-accent);":k}
            .icon=${J?"mdi:heart":"mdi:heart-outline"}
          ></ha-icon>
        </button>
      `:k,Se=Z.attributes.source_list||[],ye=new Set(Se.map(I=>I&&I[0]?I[0].toUpperCase():"")),je="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");this._idleImageTemplate&&this._idleImageTemplateNeedsResolve&&!this._resolvingIdleImageTemplate&&this._isIdle&&this._resolveIdleImageTemplate();const Be=this._idleImageTemplate?this._idleImageTemplateResult:this.config.idle_image,Ge=this._normalizeImageSourceValue(Be),mt=this._getEntityForPurpose(this._selectedIndex,"playback_control"),Te=this.hass?.states?.[mt],$t=this._isEntityPlaying(Te),Ae=this.config.show_idle_artwork_when_not_playing===!0&&!$t&&Ge;let we=null;if(Ge&&(this._isIdle||Ae))if(this.hass.states[Ge]){const I=this.hass.states[Ge];we=I.attributes.entity_picture_local||I.attributes.entity_picture||(I.state&&I.startsWith("http")?I.state:null)}else(Ge.startsWith("http")||Ge.startsWith("/"))&&(we=Ge);const Ve=!!we,Re=this._isIdle,he=this._isIdle,ot=this._artworkObjectFit==="scaled-contain"||this._artworkObjectFit==="scaled-contain-alternate",Le=this.config.extend_artwork===!0||f||ot,ft=this.currentStateObj,Ye=this._getActualResolvedMaEntityForState(this._selectedIndex),gt=Ye?this.hass?.states?.[Ye]:null,Ct=this._lastMainState,yt=this._lastMaState;this._lastMainState=ft?.state,this._lastMaState=gt?.state;const pe=this._selectedIndex;if(yt==="playing"&&this._lastMaState!=="playing"){const I=Math.max(Number(this._idleTimeoutMs||this.config?.idle_timeout_ms||6e4),500);this._playbackLingerByIdx[pe]={entityId:Ye,until:Date.now()+I}}if(yt==="playing"&&this._lastMaState==="paused"&&this._lastPlayingEntityIdByChip?.[pe]===Ye||Ct==="playing"&&this._lastMainState==="paused"&&this._lastPlayingEntityIdByChip?.[pe]===ft?.entity_id){const I=this._lastPlayingEntityIdByChip[pe],ge=Math.max(Number(this._idleTimeoutMs||this.config?.idle_timeout_ms||6e4),500);this._playbackLingerByIdx[pe]={entityId:I,until:Date.now()+ge}}this._lastMaState==="playing"&&this._playbackLingerByIdx?.[pe]&&delete this._playbackLingerByIdx[pe];const It=this.config.entities[pe]?.music_assistant_entity,Wt=this._getEntityForPurpose(pe,"ma_resolve"),Ze=this._lastPlayingEntityIdByChip?.[pe],Tt=this._maResolveCache?.[pe]?.id,Yt=!!(Ze&&(Ze===Tt||Ze===Wt||Ze===It||Ze===Ye));this._lastMainState==="playing"&&this._playbackLingerByIdx?.[pe]&&!Yt&&delete this._playbackLingerByIdx[pe];const ke=Te,Zt=!!ke?.attributes?.shuffle,Mt=ke?.attributes?.repeat&&ke?.attributes?.repeat!=="off",Ke=this.metadataStateObj,et=this._idleTimeoutMs===0?this._isEntityPlaying(Te):!this._isIdle&&this._isEntityPlaying(Te),o=this.currentStateObj,x=this._getArtworkUrl(Ke),S=this._getArtworkUrl(Te),T=this._getArtworkUrl(o),E=Ke?.attributes?.media_title||ke?.attributes?.media_title||o?.attributes?.media_title;let j=x;E&&(!j||!j.url)&&S?.url&&Te?.attributes?.media_title===E&&(j=S),E&&(!j||!j.url)&&T?.url&&o?.attributes?.media_title===E&&(j=T);const _=this._idleTimeoutMs===0?!0:et,b=Ke?.attributes?.media_title?Ke:ke?.attributes?.media_title?ke:o?.attributes?.media_title?o:Ke||ke||o,P=_&&b?.attributes?.media_title||"",C=_&&(b?.attributes?.media_artist||b?.attributes?.media_series_title||b?.attributes?.app_name)||"";this._lastTitleLength=P?P.length:0,this._adaptiveText&&this._updateAdaptiveTextScale(!0);let $=b?.attributes?.media_position||0;const z=b?.attributes?.media_duration||0;let M=$;if(et&&b){const I=b.attributes?.media_position_updated_at?Date.parse(b.attributes.media_position_updated_at):b.last_changed?Date.parse(b.last_changed):Date.now(),ge=(Date.now()-I)/1e3;M+=ge}const N=b?.attributes?.media_content_id||b?.attributes?.media_title,q=Date.now();if(this._seekAnchor&&this._seekAnchor.trackId===N){let I=this._seekAnchor.position;et&&(I+=(q-this._seekAnchor.timestamp)/1e3);const ge=this._seekConvergenceLock&&q<this._seekConvergenceLock,Ce=Math.abs(M-I);!ge&&Ce<2?(this._seekAnchor=null,this._seekConvergenceLock=null,$=M):$=I}else this._seekAnchor=null,this._seekConvergenceLock=null,$=M;const V=z?Math.min(1,$/z):0,H=this._getVolumeEntity(pe),ee=H&&H.startsWith&&H.startsWith("remote."),de=Number(this.currentVolumeStateObj?.attributes.volume_level||0),wi=this.config.volume_mode!=="stepper";let le;this._alwaysCollapsed&&this._expandOnSearch&&this._showSearchInSheet?le=!1:le=this._alwaysCollapsed?!0:this._collapseOnIdle?this._isIdle:!1;const tt=le&&this._alwaysCollapsed&&i?t-a:0,Kr=le&&m?48:0,Xr=le&&O.length>0?40:0,Ya=Kr+Xr,Jr=i?Math.max(100,t-Ya):this._collapsedBaselineHeight||220;let De=Math.round(Jr*.48);this.config.hide_collapsed_artwork===!0&&(De=0);const en=this.offsetWidth||0;if(i&&De>0)if(t<230)De=0;else{const I=this._getMaxCollapsedArtworkWidth(en);De=Math.max(40,Math.min(I,De)),t>=320&&(De=Math.max(102,De))}else!i&&De>0&&(De=102);const Kt=Math.max(-60,tt-Ya),aa=48,tn=Kt>0?Math.min(Kt*.45,96):0,an=Kt>0?Math.round(aa+tn):Kt<-20?36:aa,sn=le?an:aa;let sa;const Za=350,rn=(le?i?t:this._collapsedBaselineHeight||220:Za)>=Za,nn=this.config.hide_menu_player===!0?!1:!le||rn,ra=i&&t<280,Ka=i&&t<320&&!this._alwaysCollapsed,na=Re||this._showEntityOptions||Ka;let $e=null,oa=null,Xa=this._artworkObjectFit;if(!this._isIdle&&!Ae){const I=j;$e=I?.url||null,oa=I?.sizePercentage,I?.objectFit&&(Xa=I.objectFit)}sa=le&&!$e&&!we&&Kt>=40,le&&$e&&$e!==this._lastArtworkUrl&&(this._extractDominantColor($e).then(I=>{this._collapsedArtDominantColor=I,this.requestUpdate()}),this._lastArtworkUrl=$e);const Ja=Re?le?this._collapsedBaselineHeight||220:325:null;this._lastRenderedCollapsed=le,this._lastRenderedHideControls=Re;const lt=Xa||this._artworkObjectFit,Xt=lt==="scaled-contain-alternate",ki=(lt==="scaled-contain"||Xt)&&!le&&!this._alwaysCollapsed,on=(lt==="scaled-contain"||Xt)&&(d==="in_menu"||s&&d!=="always");let es=this._getBackgroundSizeForFit(lt);oa&&(es=`${oa}%`);const ts=lt==="no_artwork"?"none":we||Xt?we?`url('${we}')`:"none":$e?`url('${$e}')`:"none",is=ts!=="none",ln=$e&&(this.config.blurred_artwork===!0||this.config.blurred_artwork!==!1&&(le||ki&&lt==="scaled-contain"))?"blur(18px) brightness(0.7) saturate(1.15)":"none";let vt=this.config.artwork_position||"top center";Le&&(vt==="top center"||vt==="center top"?vt="center 50px":(vt==="bottom center"||vt==="center bottom")&&(vt="center calc(100% - 50px)"));const as=[`background-image: ${ts}`,`background-size: ${ki?"cover":es}`,`background-position: ${vt}`,"background-repeat: no-repeat",`filter: ${ln}`].join("; ");return y`
        <ha-card class="yamp-card" style=${i&&(!le||this._alwaysCollapsed)?`height:${t}px;`:k}>
          <div
            data-match-theme="${String(this.config.match_theme===!0)}"
            data-artwork-fit="${lt}"
            class=${xs({"yamp-card-inner":!0,"compact-collapsed":ra&&le,"dim-idle":he,"no-chip-dim":this.config.dim_chips_on_idle===!1,collapsed:le})}
          >
            ${Le&&is?y`
              <div class="full-bleed-artwork-bg" style="${as}"></div>
              ${Ve||Xt?k:y`<div class="full-bleed-artwork-fade"></div>`}
            `:k}
            ${f?y`${this._renderInlineActionRow(O)}${this._renderInlineChipRow(m,f)}`:y`${this._renderInlineChipRow(m,f)}${this._renderInlineActionRow(O)}`}
            ${this._volumeOverlayActive?y`
              <div class="volume-overlay" @click=${()=>this._dismissVolumeOverlay()}>
                <ha-icon icon=${this._getVolumeOverlayIcon()}></ha-icon>
                <span class="volume-overlay-text">${this._volumeOverlayValue}%</span>
              </div>
            `:k}
            <div class="card-lower-content-container" style="${Ja?`min-height:${Ja}px;`:""}">
              <div class="card-lower-content-bg"
                style="${(()=>{const I=[];return Le&&is?I.push("background-image: none","filter: none"):I.push(as),I.push(`min-height: ${le?Re?`${this._collapsedBaselineHeight||220}px`:"0px":"350px"}`),I.push("transition: min-height 0.4s cubic-bezier(0.6,0,0.4,1), background 0.4s"),I.join("; ")})()}"
              ></div>
              ${Ve||Xt?k:y`<div class="card-lower-fade"></div>`}
              <div class="card-lower-content${le?" collapsed transitioning":" transitioning"}${le&&$e&&De>0?" has-artwork":""}" style="${Re?le?`min-height: ${this._collapsedBaselineHeight||220}px;`:"min-height: 350px;":""}">
                ${le&&$e&&De>0&&this._isValidArtworkUrl($e)?y`
                  <div
                    class="collapsed-artwork-container"
                    @pointerdown=${I=>this._onTapAreaPointerDown(I)}
                    @pointermove=${I=>this._onTapAreaPointerMove(I)}
                    @pointerup=${I=>this._onTapAreaPointerUp(I)}
                    @pointercancel=${()=>{this._gestureActive=!1,clearTimeout(this._gestureHoldTimer)}}
                    style="${[`background: linear-gradient(120deg, ${this._collapsedArtDominantColor}bb 60%, transparent 100%)`,tt>0?`width:${Math.round(De+8)}px`:"",ra&&le?"top: -2px; height: auto !important; overflow: visible !important;":"",this._cardTriggers.tap||this._cardTriggers.hold||this._cardTriggers.double_tap||this._cardTriggers.swipe_left||this._cardTriggers.swipe_right?"cursor:pointer; pointer-events:auto;":""].filter(Boolean).join("; ")}"
                  >
                    <img
                      class="collapsed-artwork"
                      src="${$e}" 
                      style="${[this._getCollapsedArtworkStyle(),tt>0?`width:${Math.round(De)}px; height:${Math.round(De)}px;`:""].filter(Boolean).join(" ")}" 
                      onload="this.style.display='block'"
                      onerror="this.style.display='none'" />
                  </div>
                `:k}
                ${sa||!le?y`
                  <div class="card-artwork-spacer${sa?" show-placeholder":""}"
                    @pointerdown=${I=>this._onTapAreaPointerDown(I)}
                    @pointermove=${I=>this._onTapAreaPointerMove(I)}
                    @pointerup=${I=>this._onTapAreaPointerUp(I)}
                    @pointercancel=${()=>{this._gestureActive=!1,clearTimeout(this._gestureHoldTimer)}}
                    style="${this._cardTriggers.tap||this._cardTriggers.hold||this._cardTriggers.double_tap||this._cardTriggers.swipe_left||this._cardTriggers.swipe_right?"cursor:pointer; pointer-events:auto;":""}"
                  >
                    ${ki&&$e?y`
                      <div style="position: absolute; ${on?"top: 20px; right: 0; bottom: 0; left: 0;":"inset: 0;"} display: flex; align-items: center; justify-content: center; pointer-events: none; box-sizing: border-box; padding: 0 5px;">
                        <img 
                          class="inset-artwork"
                          src="${$e}" 
                          style="max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none;" 
                        />
                      </div>
                    `:k}
                    ${!ki&&!$e&&!we?y`
                      <div class="media-artwork-placeholder">
                        <svg
                          viewBox="0 0 184 184"
                          style="${this.config.match_theme===!0?"color:#fff;":"color: var(--custom-accent, #ff9800);"}"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect x="36" y="86" width="22" height="62" rx="8" fill="currentColor"></rect>
                          <rect x="68" y="58" width="22" height="90" rx="8" fill="currentColor"></rect>
                          <rect x="100" y="34" width="22" height="114" rx="8" fill="currentColor"></rect>
                          <rect x="132" y="74" width="22" height="74" rx="8" fill="currentColor"></rect>
                        </svg>
                      </div>
                    `:k}

                    ${this._lyricsActive&&!this._isIdle?y`
                      <yamp-lyrics-view
                        data-artwork-fit="${lt}"
                        .hass=${this.hass}
                        .lyrics=${this._massLyrics}
                        .position=${$}
                        .loading=${this._fetchingLyrics}
                        .error=${this._lyricsError}
                        .activeThemeColor=${this.config.match_theme===!0?"var(--state-media_player-active-color, var(--primary-color, #ffffff))":"var(--custom-accent, #ffffff)"}
                        .mode=${this._isCurrentlyPlayingRadio()?"text":this.config.lyrics_mode||"default"}
                        .preRoll=${this.config.lyrics_pre_roll??0}
                      ></yamp-lyrics-view>
                    `:k}
                  </div>
                `:k}
                ${this.config.details_alignment!=="none"?y`
                  <div class="details" style="${ra&&le?"margin-top: -12px; padding-bottom: 2px; min-height: 0; gap: 1px;":""} ${(()=>{const I=[];return this._showEntityOptions&&(I.push("opacity:0"),I.push("pointer-events:none")),I.push(`min-height:${sn}px`),_||I.push("opacity:0"),I.join(";")})()}">
                    ${this._showMediaTitleOptions?y`
                      <div class="title track-options-row" style="display: flex; gap: 16px; align-items: center; cursor: pointer;">
                        ${this._massQueueAvailable?y`
                          <div class="track-options-btn" @click=${I=>{I.stopPropagation(),this._handleAddCurrentToPlaylist()}} title="${p("search.labels.add_to_playlist")}">
                            <ha-icon icon="mdi:playlist-plus"></ha-icon>
                            <span>${p("search.add_to_playlist")}</span>
                          </div>
                        `:k}
                        <div class="track-options-btn" @click=${I=>{I.stopPropagation(),this._handlePlaySimilar()}} title="${p("search.play_similar")}">
                          <ha-icon icon="mdi:radio"></ha-icon>
                          <span>${p("search.play_similar")}</span>
                        </div>
                        <div class="track-options-btn track-options-close" @click=${I=>{I.stopPropagation(),this._showMediaTitleOptions=!1}} title="${p("common.close")}">
                          <ha-icon icon="mdi:close"></ha-icon>
                        </div>
                      </div>
                    `:y`
                      <div class="title track-options-title" @click=${I=>{_&&P&&(I.stopPropagation(),this._showMediaTitleOptions=!0)}} style="${_&&P?"cursor: pointer;":""}" title="${_&&P?p("search.show_track_options"):""}">
                        ${_&&P?P:y`&nbsp;`}
                      </div>
                    `}
                    <div
                        class="artist ${_&&Z.attributes.media_artist?"clickable-artist":""}"
                        @click=${()=>{_&&Z.attributes.media_artist&&this._searchArtistFromNowPlaying()}}
                        title=${_&&Z.attributes.media_artist?p("search.search_artist"):""}
                      >${_&&C?C:y`&nbsp;`}</div>
                  </div>
                `:k}
                ${!le&&!this._alternateProgressBar?Di(et&&z?{progress:V,seekEnabled:!0,onSeek:I=>this._onProgressBarClick(I),collapsed:!1,style:this._showEntityOptions?"visibility:hidden; opacity:0":"",displayTimestamps:this._displayTimestamps,currentTime:$,duration:z,customHeight:this.config.progress_bar_height??Dt}:{progress:0,seekEnabled:!1,collapsed:!1,style:"visibility:hidden; opacity:0",displayTimestamps:this._displayTimestamps,currentTime:0,duration:0,customHeight:this.config.progress_bar_height??Dt}):k}
                ${le||this._alternateProgressBar?Di(et&&z?{progress:V,collapsed:!0,style:this._showEntityOptions?"visibility:hidden; opacity:0":"",customHeight:this.config.progress_bar_height??Dt}:{progress:0,collapsed:!0,style:"visibility:hidden; opacity:0",customHeight:this.config.progress_bar_height??Dt}):k}

                <div style="${Re||this._showEntityOptions?"visibility:hidden; opacity:0; pointer-events:none;":""}">
                    ${To({stateObj:Te,showStop:this._shouldShowStopButton(Te),shuffleActive:Zt,repeatActive:Mt,onControlClick:I=>this._onControlClick(I),supportsFeature:(I,ge)=>this._supportsFeature(I,ge),showFavorite:ie,favoriteActive:J,hiddenControls:U,adaptiveControls:this._adaptiveControls,controlLayout:this._controlLayout,swapPauseForStop:this._controlLayout==="modern"&&this._swapPauseForStop})}
                </div>
                ${Mo({isRemoteVolumeEntity:ee,showSlider:wi,vol:de,isDragging:this._volumeDraggingEntity==="main",dragVol:this._dragVolume,isMuted:this.currentVolumeStateObj?.attributes?.is_volume_muted??!1,supportsMute:this.currentVolumeStateObj?this._supportsFeature(this.currentVolumeStateObj,va):!1,onVolumeDragStart:I=>this._onVolumeDragStart(I),onVolumeDragEnd:I=>this._onVolumeDragEnd(I),onVolumeInput:I=>this._onVolumeInput(I),onVolumeChange:I=>this._onVolumeChange(I),onVolumeStep:I=>this._onVolumeStep(I),onMuteToggle:()=>this._onMuteToggle(),leadingControlTemplate:na?xe!==k?y`<div style="visibility:hidden; opacity:0; pointer-events:none;">${xe}</div>`:k:xe,reserveLeadingControlSpace:this._controlLayout==="modern",showRightPlaceholder:this._controlLayout==="modern",rightSlotTemplate:na?L!==k?y`<div style="visibility:hidden; opacity:0; pointer-events:none;">${L}</div>`:k:L,hideVolume:na||this.config.volume_mode==="hidden"||i&&t<260&&le&&!this._showEntityOptions,moreInfoMenu:!this._showEntityOptions&&!Ka?y`
          <div class="more-info-menu">
            <button class="more-info-btn" @click=${async()=>await this._openEntityOptions()}>
              <span class="more-info-icon">&#9776;</span>
            </button>
          </div>
        `:k})}
            ${u&&!this._showEntityOptions&&!this._hideActiveEntityLabel&&!(this._hideActiveEntityLabelOnIdle&&this._isIdle)?y`
              <div class="in-menu-active-label">${X}</div>
            `:k}
          </div>
        </div>


      ${this._showEntityOptions?y`
      <div class="entity-options-overlay entity-options-overlay-opening" @click=${I=>this._closeEntityOptions(I)}>
        <div class="entity-options-container entity-options-container-opening">
          <div class="entity-options-sheet${u||g?" chips-mode":""} entity-options-sheet-opening" 
               @click=${I=>I.stopPropagation()}
               data-pin-search-headers="${l}">
            ${u||g?y`
                <div class="entity-options-chips-wrapper" style="${g&&!u?"visibility:hidden;pointer-events:none;":""}" @click=${I=>I.stopPropagation()}>
                <div class="chip-row entity-options-chips-strip">
                  ${qs(this._getChipRowProps())}
                </div>
              </div>
            `:k}
              ${!this._showGrouping&&!this._showSourceList&&!this._showSearchInSheet&&!this._showResolvedEntities&&!this._showTransferQueue?this._renderMainMenu(Se,D,u):this._showGrouping?this._renderGroupingSheet():this._showTransferQueue?this._renderTransferQueueSheet():this._showResolvedEntities?this._renderResolvedEntitiesSheet():this._showSearchInSheet?this._renderSearchInOptions(c,l):this._renderSourceListSheet(Se,je,ye)}
              </div>
            </div>
            <!-- Persistent Media Controls Section - Outside Scrollable Area -->
            ${nn?y`
              <div class="persistent-media-controls" @click=${I=>I.stopPropagation()}>
                <div class="persistent-controls-artwork">
                  ${(()=>{const I=j;return I?.url&&this._isValidArtworkUrl(I.url)?y`
                      <img src="${I.url}" alt="${p("common.album_art")}" class="persistent-artwork" onerror="this.style.display='none'">
                    `:y`
                      <div class="persistent-artwork-placeholder">
                        <ha-icon icon="mdi:music"></ha-icon>
                      </div>
                    `})()}
                </div>
                <div class="persistent-controls-buttons">
                  <button class="persistent-control-btn" @click=${()=>this._onControlClick("prev")} title="${p("card.media_controls.previous")}">
                    <ha-icon icon="mdi:skip-previous"></ha-icon>
                  </button>
                  <button class="persistent-control-btn" @click=${()=>this._onControlClick("play_pause")} title="${p("card.media_controls.play_pause")}">
                    <ha-icon icon=${this._isEntityPlaying(this.currentPlaybackStateObj)?"mdi:pause":"mdi:play"}></ha-icon>
                  </button>
                  <button class="persistent-control-btn" @click=${()=>this._onControlClick("next")} title="${p("card.media_controls.next")}">
                    <ha-icon icon="mdi:skip-next"></ha-icon>
                  </button>
                </div>
                ${(()=>{const I=this._selectedIndex,ge=this._getVolumeEntity(I);if(!ge)return k;const Ce=ge.startsWith&&ge.startsWith("remote."),Ei=this.currentVolumeStateObj,Si=Number(Ei?.attributes?.volume_level??0),ss=Ce?null:`${Math.round((Si||0)*100)}%`;return this.config.volume_mode==="hidden"?k:y`
                    <div class="persistent-volume-stepper">
                      <button class="stepper-btn" @click=${()=>this._onVolumeStep(-1)} title="${p("common.vol_down")}">–</button>
                      ${ss?y`<span class="stepper-value">${ss}</span>`:k}
                      <button class="stepper-btn" @click=${()=>this._onVolumeStep(1)} title="${p("common.vol_up")}">+</button>
                    </div>
                  `})()}
              </div>
            `:k}
          </div>
        `:k}
          ${this._searchActiveOptionsItem?Lo({item:this._searchActiveOptionsItem,onClose:()=>{this._searchActiveOptionsItem=null,this.requestUpdate()},onPlayOption:(I,ge)=>this._performSearchOptionAction(I,ge),massQueueAvailable:this._massQueueAvailable}):k}
          </div>
    </ha-card>
  `}_getCardHeightMetrics(e){const t=this._cardHeightTemplate?this._cardHeightTemplateResult:e.card_height,i=typeof t=="string"?parseFloat(t):Number(t),a=typeof i=="number"&&Number.isFinite(i)&&i>0||typeof i=="string"&&i.trim()!=="";return{customCardHeight:i,hasCustomCardHeight:a}}_getMaxCollapsedArtworkWidth(e){const t=e>0?Math.max(64,e-220):102;return Math.min(t,160)}_setHostDataAttributes(e,t,i){const a=this._appearance||"automatic";e.setAttribute("data-match-theme",String(t.match_theme===!0)),e.setAttribute("data-appearance",a),e.setAttribute("data-always-collapsed",String(t.always_collapsed===!0)),e.setAttribute("data-card-type",t.card_type||"default");const s=t.always_collapsed===!0&&t.pin_search_headers===!0&&t.expand_on_search===!0;e.setAttribute("data-hide-menu-player",String(t.hide_menu_player===!0||s)),e.setAttribute("data-extend-artwork",String(this._extendArtwork)),e.setAttribute("data-control-layout",this._controlLayout||"classic"),e.setAttribute("data-details-alignment",t.details_alignment||"left");const n=(this.entityObjs||[]).length===1&&t.always_collapsed===!0&&t.expand_on_search!==!0,l=t.pin_search_headers===!0&&!n;e.setAttribute("data-pin-search-headers",String(l)),i?e.setAttribute("data-has-custom-height","true"):e.removeAttribute("data-has-custom-height")}_getPlaybackAndCollapseState(e){const t=this._getEntityForPurpose(this._selectedIndex,"playback_control"),i=this.hass&&this.hass.states&&t?this.hass.states[t]:void 0,a=i?this._isEntityPlaying(i):!1,s=e.idle_image?wa(this.hass,e.idle_image):null,n=e.show_idle_artwork_when_not_playing===!0&&!a&&s,l=this._isCurrentEntityPlaying(),c=e.always_collapsed===!0||this._isIdle&&e.collapse_on_idle===!0&&!l;return{playbackStateObj:i,collapsed:c,forceIdleImage:n}}_updatePersistentControlsVisibility(e,t,i,a,s){const n=(i?s?a:this._collapsedBaselineHeight||220:350)>=350;t.hide_menu_player!==!0&&(!i||n)?e.removeAttribute("data-hide-persistent-controls"):e.setAttribute("data-hide-persistent-controls","true")}_updateHostLayoutStyles(e,t,i,a,s){const n=s&&a<280,l=t.show_chip_row||"auto",c=(this.entityObjs||[]).length>1,d=(l==="in_menu"||l==="in_menu_on_idle"&&this._isIdle)&&c,h=l!=="hidden"&&!d&&c;let u=240,m=0;const f=this.offsetWidth||0;if(i)if(s){const ie=this._getMaxCollapsedArtworkWidth(f);m=Math.max(0,Math.min(ie,Math.round((a-(n?90:130))*.95)))}else m=this._artworkObjectFit==="no_artwork"?0:64;const g=s?a-u:0,v=Math.max(0,g-(h?58:0)),w=Math.min(90,v*.45),A=(v>0?Math.max(0,v-w):0)>=48,O=this._collapsedBaselineHeight||220,D=s?a-O:0,F=i&&m>0?Math.round(m+(n?12:24)+Math.min(40,Math.max(0,D)*.12)):i&&m===0?0:null,G=A?0:F??0,Q=f>380?Math.min(1.6,1+(f-380)/520):1,B=D>0?Math.min(1.45,1+v/180):n?.9:1,te=B>1||Q>1?Math.min(1.6,Math.max(B,Q)):n?.95:1,Z=n?.85:Math.min(1.5,Math.max(B*.92,Q*.92)),X=s&&a<320&&!this._alwaysCollapsed,U=t.volume_mode==="hidden"||X||s&&a<260&&i&&!this._showEntityOptions?54:100;D!==0||n?(F!=null&&e.style.setProperty("--yamp-collapsed-details-offset",`${F}px`),e.style.setProperty("--yamp-collapsed-controls-offset",`${G}px`),e.style.setProperty("--yamp-collapsed-title-scale",te.toFixed(3)),e.style.setProperty("--yamp-collapsed-artist-scale",Z.toFixed(3)),e.style.setProperty("--yamp-collapsed-artwork-size",`${m}px`),e.style.setProperty("--yamp-collapsed-artwork-clearance",`${U}px`)):(e.style.removeProperty("--yamp-collapsed-controls-offset"),e.style.removeProperty("--yamp-collapsed-details-offset"),e.style.removeProperty("--yamp-collapsed-artwork-size"),e.style.removeProperty("--yamp-collapsed-title-scale"),e.style.removeProperty("--yamp-collapsed-artist-scale"),e.style.removeProperty("--yamp-collapsed-artwork-clearance"))}_updateHostArtworkStyles(e,t,i){const a=this.metadataStateObj,s=this._getArtworkUrl(a),n=this._getArtworkUrl(t),l=this.currentStateObj,c=this._getArtworkUrl(l),d=a?.attributes?.media_title||t?.attributes?.media_title||l?.attributes?.media_title;let h=s;d&&(!h||!h.url)&&n?.url&&t?.attributes?.media_title===d&&(h=n),d&&(!h||!h.url)&&c?.url&&l?.attributes?.media_title===d&&(h=c);let u=this._artworkObjectFit;!this._isIdle&&!i&&h?.objectFit&&(u=h.objectFit);const m=u||"cover",f=this._getBackgroundSizeForFit(m);e.style.setProperty("--yamp-artwork-fit",m),e.style.setProperty("--yamp-artwork-bg-size",f)}_updateHostAttributes(){if(!this.shadowRoot||!this.shadowRoot.host||!this.hass||!this.config)return;const e=this.shadowRoot.host,t=this.config,{customCardHeight:i,hasCustomCardHeight:a}=this._getCardHeightMetrics(t);this._setHostDataAttributes(e,t,a);const{playbackStateObj:s,collapsed:n,forceIdleImage:l}=this._getPlaybackAndCollapseState(t);this._updatePersistentControlsVisibility(e,t,n,i,a),this._updateHostLayoutStyles(e,t,n,i,a),this._updateHostArtworkStyles(e,s,l)}_renderSearchSubFilters(e){return!e||!this._usingMusicAssistant||this._searchLoading?k:y`
      <div class="search-sub-filters" style="display: flex; align-items: center; margin-bottom: 2px; margin-top: 4px; padding-left: 3px; width: 100%; gap: 8px;">
        <div style="display: flex; align-items: center; flex-wrap: wrap; flex: 1; min-width: 0;">
          <button
            class="button${this._initialFavoritesLoaded||this._favoritesFilterActive?" active":""}"
            style="
              border: none;
              font-size: 1.2em;
              cursor: ${this._searchAttempted?"pointer":"default"};
              padding: 4px 8px;
              border-radius: 50%;
              transition: all 0.2s ease;
              margin-right: 8px;
              display: flex;
              align-items: center;
              opacity: ${this._searchAttempted?"1":"0.5"};
            "
            @click=${this._searchAttempted?()=>{this._toggleFavoritesFilter()}:()=>{}}
            title="${p("search.favorites")}"
          >
            <ha-icon .icon=${this._initialFavoritesLoaded||this._favoritesFilterActive?"mdi:cards-heart":"mdi:cards-heart-outline"}></ha-icon>
            ${this._initialFavoritesLoaded||this._favoritesFilterActive?y`
              <span style="margin-left:6px;font-size:0.82em;font-weight:600;white-space:nowrap;">
                ${p("search.favorites")}
              </span>
            `:k}
          </button>
          <button
            class="button${this._recentlyPlayedFilterActive?" active":""}"
            style="
              border: none;
              font-size: 1.2em;
              cursor: ${this._searchAttempted?"pointer":"default"};
              padding: 4px 8px;
              border-radius: 50%;
              transition: all 0.2s ease;
              margin-right: 8px;
              display: flex;
              align-items: center;
              opacity: ${this._searchAttempted?"1":"0.5"};
            "
            @click=${this._searchAttempted?()=>{this._toggleRecentlyPlayedFilter()}:()=>{}}
            title="${p("search.recently_played")}"
          >
            <ha-icon .icon=${this._recentlyPlayedFilterActive?"mdi:clock":"mdi:clock-outline"}></ha-icon>
            ${this._recentlyPlayedFilterActive?y`
              <span style="margin-left:6px;font-size:0.82em;font-weight:600;white-space:nowrap;">
                ${p("search.recently_played")}
              </span>
            `:k}
          </button>
          ${this._isMusicAssistantEntity()?y`
            <button
              class="button${this._upcomingFilterActive?" active":""}"
              style="
                border: none;
                font-size: 1.2em;
                cursor: ${this._searchAttempted?"pointer":"default"};
                padding: 4px 8px;
                border-radius: 50%;
                transition: all 0.2s ease;
                margin-right: 8px;
                display: flex;
                align-items: center;
                opacity: ${this._searchAttempted?"1":"0.5"};
              "
              @click=${this._searchAttempted?()=>{this._toggleUpcomingFilter()}:()=>{}}
              title="${p("search.next_up")}"
            >
              <ha-icon .icon=${this._upcomingFilterActive?"mdi:playlist-music":"mdi:playlist-music-outline"}></ha-icon>
              ${this._upcomingFilterActive?y`
                <span style="margin-left:6px;font-size:0.82em;font-weight:600;white-space:nowrap;">
                  ${p("search.next_up")}
                </span>
              `:k}
            </button>
            ${this._hasMassQueueIntegration?y`
              <button
                class="button${this._recommendationsFilterActive?" active":""}"
                style="
                  border: none;
                  font-size: 1.2em;
                  cursor: ${this._searchAttempted?"pointer":"default"};
                  padding: 4px 8px;
                  border-radius: 50%;
                  transition: all 0.2s ease;
                  margin-right: 8px;
                  display: flex;
                  align-items: center;
                  opacity: ${this._searchAttempted?"1":"0.5"};
                "
                @click=${this._searchAttempted?()=>{this._toggleRecommendationsFilter()}:()=>{}}
                title="${p("search.recommendations")}"
              >
                <ha-icon .icon=${this._recommendationsFilterActive?"mdi:creation":"mdi:creation-outline"}></ha-icon>
                ${this._recommendationsFilterActive?y`
                  <span style="margin-left:6px;font-size:0.81em;font-weight:600;white-space:nowrap;">
                    ${p("search.recommendations")}
                  </span>
                `:k}
              </button>
            `:k}
          `:k}
          <button
            class="radio-mode-button${this._radioModeActive?" active":""}"
            @click=${()=>this._toggleRadioMode()}
            title="${p("search.radio_mode")}"
          >
            <ha-icon .icon=${this._radioModeActive?"mdi:radio":"mdi:radio-off"}></ha-icon>
          </button>
          ${this._shouldShowSearchSortToggle()?y`
            <button
              class="button"
              style="
                border: none;
                font-size: 1.2em;
                cursor: ${this._searchAttempted?"pointer":"default"};
                padding: 4px 8px;
                border-radius: 50%;
                transition: all 0.2s ease;
                margin-right: 8px;
                display: flex;
                align-items: center;
                opacity: ${this._searchAttempted?"1":"0.5"};
              "
              @click=${this._searchAttempted?()=>this._toggleSearchResultsSortDirection():()=>{}}
              title=${this._getSearchSortToggleTitle()}
            >
              <ha-icon .icon=${this._getSearchSortToggleIcon()}></ha-icon>
            </button>
          `:k}
          ${this._shouldShowSearchResultsCount()?y`
            <span class="search-results-count">
              ${this._getSearchResultsCountLabel()}
            </span>
          `:k}
        </div>
      </div>
    `}_renderSearchInOptions(e,t=!1){return y`
      <div class="entity-options-search" style="margin-top:12px;">
        ${this._searchHierarchy.length>0?y`
            <button class="entity-options-item close-item" @click=${()=>this._goBackInSearch()}>
              ${p("common.back")}
            </button>
            <div class="entity-options-divider"></div>
          `:k}
        ${this._searchBreadcrumb?y`
            <div class="entity-options-search-breadcrumb">
              <div class="entity-options-search-breadcrumb-text">${this._searchBreadcrumb}</div>
              ${this._isSelectionFlow?k:y`
                <button class="entity-options-search-breadcrumb-play" @click=${()=>this._playCurrentCollection()} title="${p("search.play_collection")}">
                  <ha-icon icon="mdi:play"></ha-icon>
                </button>
              `}
            </div>
          `:e?y`<div class="entity-options-search-skeleton"></div>`:k}
        ${e?y`
          <div class="entity-options-search-row">
            <div class="search-input-wrapper">
              <input
                type="text"
                id="search-input-box"
                ?autofocus=${!this._disableSearchAutofocus}
                class="entity-options-search-input"
                .value=${this._searchQuery}
                @input=${i=>{this._searchQuery=i.target.value,this.requestUpdate()}}
                @keydown=${i=>{i.key==="Enter"?(i.preventDefault(),this._handleSearchSubmit()):i.key==="Escape"&&(i.preventDefault(),this._hideSearchSheetInOptions())}}
                placeholder="${p("editor.placeholders.search")}"
              />
              ${this._searchQuery?y`
                <button
                  class="search-input-clear"
                  @click=${()=>{this._showSearchSheetInOptions()}}
                  title="${p("common.clear")}">
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              `:k}
            </div>
            <button
              class="entity-options-item icon-only"
              style="min-width:48px; padding: 0;"
              @click=${()=>this._handleSearchSubmit()}
              title="${p("common.search")}"
              aria-label="${p("common.search")}"
              ?disabled=${this._searchLoading}>
              <ha-icon icon="mdi:magnify"></ha-icon>
            </button>
            ${this._cardType!=="search"?y`
            <button
              class="entity-options-item icon-only"
              style="min-width:48px; padding: 0;"
              title="${p("common.cancel")}"
              aria-label="${p("common.cancel")}"
              @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._hideSearchSheetInOptions()}}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
            `:k}
          </div>
        `:k}
        <!--FILTER CHIPS-->
        ${e?(()=>{const i=this._getVisibleSearchFilterClasses(),a=this._searchMediaClassFilter||"all";return this._searchHierarchy.length>0||i.length<2&&!this._usingMusicAssistant?k:y`
            <div class="chip-row search-filter-chips" id="search-filter-chip-row" style="margin-bottom:12px; justify-content: center; align-items: center;">
                <button
                  class="chip"
                  ?selected=${a==="all"}
                  @click=${()=>this._doSearch()}
                >${p("search.filters.all")}</button>
                ${i.map(s=>y`
                  <button
                    class="chip"
                    ?selected=${a===s}
                    @click=${()=>this._doSearch(s)}
                  >
                    ${p(`search.filters.${s}`)}
                  </button>
                `)}
            </div>
          `})():k}
        
        ${this._searchLoading?y`<div class="entity-options-search-loading">${p("common.loading")}</div>`:k}
        ${this._searchError?y`<div class="entity-options-search-error">${this._searchError}</div>`:k}
        
        ${this._renderSearchSubFilters(e)}
 
        <div class="${this._showSearchInSheet?"search-sheet-results":"entity-options-search-results"}" 
             style="${this.config.search_view==="card"||this.config.search_view==="card_minimal"?`--search-card-columns: ${this.config.search_card_columns||4};`:""}">
          ${(()=>{const i=this._getDisplaySearchResults(),a=this.config.search_view==="card"||this.config.search_view==="card_minimal",s=this.config.search_view==="card_minimal",n=Math.max(15,this._searchTotalRows||i.length),l=[...i,...Array.from({length:Math.max(0,n-i.length)},()=>null)],c=d=>Ro({item:d,isCard:a,isMinimal:s,activeSearchRowMenuId:this._activeSearchRowMenuId,loadingSearchRowMenuId:this._loadingSearchRowMenuId,errorSearchRowMenuId:this._errorSearchRowMenuId,successSearchRowMenuId:this._successSearchRowMenuId,successSearchRowType:this._successSearchRowType,isSelectionFlow:this._isSelectionFlow,massQueueAvailable:this._massQueueAvailable,upcomingFilterActive:!!this._upcomingFilterActive,recentlyPlayedFilterActive:!!this._recentlyPlayedFilterActive,recommendationsFilterActive:!!this._recommendationsFilterActive,searchMediaClassFilter:this._searchMediaClassFilter,onPlay:h=>this._playMediaFromSearch(h),onResultClick:(h,u)=>this._handleSearchResultClick(h,u),onResultTouch:(h,u)=>this._handleSearchResultTouch(h,u),onOptionsToggle:h=>{this._activeSearchRowMenuId=h?.media_content_id||null,this.requestUpdate()},onPlayOption:(h,u)=>this._performSearchOptionAction(h,u),onMoveUp:h=>this._moveQueueItemUp(h.queue_item_id),onMoveDown:h=>this._moveQueueItemDown(h.queue_item_id),onMoveNext:h=>this._moveQueueItemNext(h.queue_item_id),onRemove:h=>this._removeQueueItem(h.queue_item_id),isMusicAssistant:this._isMusicAssistantEntity(),isValidArtwork:h=>this._isValidArtworkUrl(h),getClickTitle:h=>this._getSearchResultClickTitle(h)});return this._searchAttempted&&i.length===0&&!this._searchLoading?y`<div class="entity-options-search-empty">${p("common.no_results")}</div>`:((!this._cachedSearchGridLayout||this._cachedSearchGridLayoutColumns!==(this.config.search_card_columns||4)||this._cachedSearchGridLayoutIsMinimal!==s)&&(this._cachedSearchGridLayoutColumns=this.config.search_card_columns||4,this._cachedSearchGridLayoutIsMinimal=s,this._cachedSearchGridLayout=oo({columns:this._cachedSearchGridLayoutColumns,gap:"12px",padding:"12px",itemSize:s?{width:150,height:150}:{width:150,height:244}})),Cs(a?{items:l,renderItem:c,layout:this._cachedSearchGridLayout,scroller:t}:{items:l,renderItem:c,scroller:t}))})()}
        </div>
      </div>
    `}_renderSourceListSheet(e,t,i){return y`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeSourceList()}}>
          ${p("common.back")}
        </button>
        <div class="entity-options-divider"></div>
      </div>
      <div class="entity-options-scroll source-list-centering-wrapper">
        <div class="source-list-sheet">
          <div class="source-list-scroll">
            ${e.map(a=>y`
              <div class="entity-options-item" data-source-name="${a}" @click=${()=>this._selectSource(a)}>${a}</div>
            `)}
          </div>
        </div>
      </div>
      <div class="floating-source-index">
        ${t.map((a,s)=>{const n=i.has(a),l=this._hoveredSourceLetterIndex;let c="";if(n&&l!==null&&l!==void 0){const d=Math.abs(l-s);d===0?c="max":d===1?c="large":d===2&&(c="med")}return y`
            <button
              class="source-index-letter"
              ?disabled=${!n}
              data-scale=${c}
              @mouseenter=${n?()=>{this._hoveredSourceLetterIndex=s,this.requestUpdate()}:k}
              @mouseleave=${()=>{this._hoveredSourceLetterIndex=null,this.requestUpdate()}}
              @click=${n?()=>this._scrollToSourceLetter(a):k}
            >
              ${a}
            </button>
          `})}
      </div>
    `}_updateIdleState(e){if(this.isAnyMenuOpen){this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null);return}const t=this.entityIds.some((l,c)=>{if(this._isAutoSelectDisabled(c))return!1;const d=this._getEntityForPurpose(c,"sorting");return this._isEntityPlaying(this.hass.states[d])}),i=this._isCurrentEntityPlaying(),a=this._isAutoSelectDisabled(this._selectedIndex),s=i&&(!a||this._manualSelect);let n;if(this._isIdle||!this._hasSeenPlayback?n=t:n=s,n)this._idleTimeout&&clearTimeout(this._idleTimeout),this._idleTimeout=null,this._hasSeenPlayback=!0,this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate());else{if(!this._hasSeenPlayback){this._idleTimeoutMs>0?this._isIdle||(this._setIdleState(!0),this._idleScreenApplied=!1,this._applyIdleScreen(),this.requestUpdate()):this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate());return}!this._isIdle&&this._idleTimeoutMs>0&&(e&&e.has("_selectedIndex")?(this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),t?this._idleTimeout=setTimeout(()=>{this._handleIdleTimeoutCallback()},this._idleTimeoutMs):(this._setIdleState(!0),this._idleScreenApplied=!1,this._pinnedIndex===null&&(this._manualSelect=!1,this._manualSelectPlayingSet=null),this._applyIdleScreen(),this.requestUpdate())):this._idleTimeout||(this._idleTimeout=setTimeout(()=>{this._handleIdleTimeoutCallback()},this._idleTimeoutMs))),this._idleTimeoutMs===0&&this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate())}}_handleIdleTimeoutCallback(){if(this._cardType==="search"){if(this._idleTimeout=null,this._searchHierarchy.length>0){this._searchHierarchy=[],this._searchBreadcrumb="",this._searchResultsByType={};const t=this.config?.default_search_filter==="all"?null:this.config?.default_search_filter;this._doSearch(t).catch(()=>{}),this.requestUpdate()}return}const e=this.entityIds.some((t,i)=>{if(this._isAutoSelectDisabled(i))return!1;const a=this._getEntityForPurpose(i,"sorting"),s=this.hass?.states?.[a];return s&&this._isEntityPlaying(s)});if(this._idleTimeout=null,this._pinnedIndex===null&&(this._manualSelect=!1,this._manualSelectPlayingSet=null),e){const t=this.sortedEntityIds;if(t.length>0){let i=t[0];const a=i?(this.groupedSortedEntityIds||[]).find(n=>n.includes(i)):null;if(a&&a.length>1){const n=this._getActualGroupMaster(a);n&&(i=n)}const s=this.entityIds.indexOf(i);s>=0&&s!==this._selectedIndex&&(this._selectedIndex=s)}this.requestUpdate();return}this._setIdleState(!0),this._idleScreenApplied=!1,this._applyIdleScreen(),this.requestUpdate()}getGridOptions(){let e;return this._alwaysCollapsed&&this._expandOnSearch&&this._showSearchInSheet?e=!1:e=this._alwaysCollapsed?!0:this._collapseOnIdle?this._isIdle:!1,{min_rows:e?2:4,columns:12}}static get _schema(){return[{name:"entities",selector:{entity:{multiple:!0,domain:"media_player"}},required:!0},{name:"show_chip_row",selector:{select:{options:[{value:"auto",label:"Auto"},{value:"always",label:"Always"},{value:"in_menu",label:"In Menu"},{value:"in_menu_on_idle",label:"In Menu on Idle"}]}},required:!1},{name:"idle_screen",selector:{select:{options:[{value:"default",label:"Default"},{value:"search",label:"Search"},{value:"source",label:"Source"},{value:"more-info",label:"More Info"},{value:"group-players",label:"Group Players"},{value:"transfer-queue",label:"Transfer Queue"}]}},required:!1},{name:"hold_to_pin",selector:{boolean:{}},required:!1},{name:"disable_autofocus",selector:{boolean:{}},required:!1},{name:"idle_image",selector:{entity:{domain:"",multiple:!1}},required:!1},{name:"match_theme",selector:{boolean:{}},required:!1},{name:"collapse_on_idle",selector:{boolean:{}},required:!1},{name:"always_collapsed",selector:{boolean:{}},required:!1},{name:"expand_on_search",selector:{boolean:{}},required:!1},{name:"alternate_progress_bar",selector:{boolean:{}},required:!1},{name:"idle_timeout_ms",selector:{number:{min:0,step:1e3,unit_of_measurement:"ms",mode:"box"}},required:!1},{name:"volume_step",selector:{number:{min:.01,max:1,step:.01,unit_of_measurement:"",mode:"box"}},required:!1},{name:"volume_mode",selector:{select:{options:[{value:"slider",label:"Slider"},{value:"stepper",label:"Stepper"}]}},required:!1},{name:"actions",selector:{object:{}},required:!1},{name:"dim_chips_on_idle",selector:{boolean:{}},required:!1},{name:"pin_search_headers",selector:{boolean:{}},required:!1}]}firstUpdated(){super.firstUpdated?.();const e=this.renderRoot.querySelector(".floating-source-index");e&&e.addEventListener("wheel",function(t){const{scrollTop:i,scrollHeight:a,clientHeight:s}=e,n=t.deltaY;(n<0&&i===0||n>0&&i+s>=a)&&(t.preventDefault(),t.stopPropagation())},{passive:!1})}_addGrabScroll(e){const t=this.renderRoot.querySelector(e);if(!t||t._grabScrollAttached)return;let i=!1,a,s;const n=u=>{i=!0,t._dragged=!1,t.classList.add("grab-scroll-active"),a=u.pageX-t.offsetLeft,s=t.scrollLeft,u.preventDefault()},l=()=>{i=!1,t.classList.remove("grab-scroll-active")},c=()=>{i=!1,t.classList.remove("grab-scroll-active")},d=u=>{if(!i)return;const m=u.pageX-t.offsetLeft-a;Math.abs(m)>5&&(t._dragged=!0),u.preventDefault(),t.scrollLeft=s-m},h=u=>{t._dragged&&(u.stopPropagation(),u.preventDefault(),t._dragged=!1)};t.addEventListener("mousedown",n),t.addEventListener("mouseleave",l),t.addEventListener("mouseup",c),t.addEventListener("mousemove",d),t.addEventListener("click",h,!0),t._grabScrollHandlers={mousedown:n,mouseleave:l,mouseup:c,mousemove:d,click:h},t._grabScrollAttached=!0}_addVerticalGrabScroll(e){const t=this.renderRoot.querySelector(e);if(!t||t._grabScrollAttached)return;let i=!1,a,s;const n=u=>{i=!0,t._dragged=!1,t.classList.add("grab-scroll-active"),a=u.pageY-t.getBoundingClientRect().top,s=t.scrollTop,u.preventDefault()},l=()=>{i=!1,t.classList.remove("grab-scroll-active")},c=()=>{i=!1,t.classList.remove("grab-scroll-active")},d=u=>{if(!i)return;const m=u.pageY-t.getBoundingClientRect().top-a;Math.abs(m)>5&&(t._dragged=!0),u.preventDefault(),t.scrollTop=s-m},h=u=>{t._dragged&&(u.stopPropagation(),u.preventDefault(),t._dragged=!1)};t.addEventListener("mousedown",n),t.addEventListener("mouseleave",l),t.addEventListener("mouseup",c),t.addEventListener("mousemove",d),t.addEventListener("click",h,!0),t._grabScrollHandlers={mousedown:n,mouseleave:l,mouseup:c,mousemove:d,click:h},t._grabScrollAttached=!0}_removeGrabScrollHandlers(){this.renderRoot.querySelectorAll("[data-grab-scroll]").forEach(e=>{if(e._grabScrollHandlers){const t=e._grabScrollHandlers;e.removeEventListener("mousedown",t.mousedown),e.removeEventListener("mouseleave",t.mouseleave),e.removeEventListener("mouseup",t.mouseup),e.removeEventListener("mousemove",t.mousemove),e.removeEventListener("click",t.click,!0),delete e._grabScrollHandlers,e._grabScrollAttached=!1}})}_removeSearchSwipeHandlers(){const e=this.renderRoot.querySelector(".entity-options-search-results");if(e&&e._searchSwipeHandlers){const t=e._searchSwipeHandlers;e.removeEventListener("touchstart",t.touchstart),e.removeEventListener("touchend",t.touchend),delete e._searchSwipeHandlers,this._searchSwipeAttached=!1}}disconnectedCallback(){this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),this._unsubscribeFromQueueUpdates(),this._lyricsFetchTimeout&&(clearTimeout(this._lyricsFetchTimeout),this._lyricsFetchTimeout=null),super.disconnectedCallback?.(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=null),this._debouncedVolumeTimer&&(clearTimeout(this._debouncedVolumeTimer),this._debouncedVolumeTimer=null),this._volumeOverlayTimer&&(clearTimeout(this._volumeOverlayTimer),this._volumeOverlayTimer=null),this._internalVolumeSuppressTimer&&(clearTimeout(this._internalVolumeSuppressTimer),this._internalVolumeSuppressTimer=null),this._manualSelectTimeout&&(clearTimeout(this._manualSelectTimeout),this._manualSelectTimeout=null),this._searchTimeoutHandle&&(clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=null),this._latestSearchToken=0,this._removeSourceDropdownOutsideHandler(),this._removeGrabScrollHandlers(),this._removeSearchSwipeHandlers(),window.removeEventListener("scroll",this._handleGlobalScroll),window.removeEventListener("resize",this._handleViewportResize),typeof this._teardownAdaptiveTextObserver=="function"&&this._teardownAdaptiveTextObserver(),Object.values(this._templateSubscriptions).forEach(e=>{try{typeof e=="function"&&e()}catch(t){console.warn("yamp: Error during template unsubscription:",t)}}),this._templateSubscriptions={},this._activeSubscriptionTokens={},this._adaptiveScrollTimer&&(clearTimeout(this._adaptiveScrollTimer),this._adaptiveScrollTimer=null),this._lastPlayingEntityId=null,this._controlFocusEntityId=null,this._teardownAdaptiveTextObserver()}_applyClosingAnimations(){const e=this.renderRoot.querySelector(".entity-options-overlay"),t=this.renderRoot.querySelector(".entity-options-container"),i=this.renderRoot.querySelector(".entity-options-sheet");e&&(e.classList.remove("entity-options-overlay-opening"),e.classList.add("entity-options-overlay-closing")),t&&(t.classList.remove("entity-options-container-opening"),t.classList.add("entity-options-container-closing")),i&&(i.classList.remove("entity-options-sheet-opening"),i.classList.add("entity-options-sheet-closing"))}_dismissWithAnimation(){if(this._cardType==="search"){this._showGrouping=!1,this._showSourceList=!1,this._showResolvedEntities=!1,this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._showEntityOptions=!0,this._showSearchInSheet=!0,this._quickMenuInvoke=!1,this.requestUpdate();return}this._applyClosingAnimations(),this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),setTimeout(()=>{this._showEntityOptions=!1,this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._quickMenuInvoke=!1,this.requestUpdate()},200)}_closeEntityOptions(){if(this._cardType==="search"){this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._showResolvedEntities=!1,this.requestUpdate();return}this._applyClosingAnimations(),this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),setTimeout(()=>{if(this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._showGrouping){this._showGrouping=!1,this._showEntityOptions=!1;const e=this.groupedSortedEntityIds,t=this.currentEntityId,i=e.find(a=>a.includes(t));if(i&&i.length>1){const a=this._getActualGroupMaster(i),s=this.entityIds.indexOf(a);s>=0&&(this._selectedIndex=s)}this.requestUpdate()}else this._showEntityOptions=!1,this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._searchInputAutoFocused=!1,this._searchHierarchy=[],this._searchBreadcrumb="",this._addToPlaylistTarget=null,this.requestUpdate();this._quickMenuInvoke=!1},200)}async _openEntityOptions(){for(let e=0;e<this.entityObjs.length;e++)await this._ensureResolvedMaForIndex(e);await this._updateTransferQueueAvailability({refresh:!0}),this._showEntityOptions=!0,this.requestUpdate(),this.updateComplete.then(()=>{const e=this.renderRoot?.querySelector(".entity-options-chips-strip");e&&(e.scrollLeft=0)})}_openGrouping(){this._showEntityOptions=!0,this._showGrouping=!0;const e=this.currentEntityId;let t=e;if(e){const i=(this.groupedSortedEntityIds||[]).find(a=>a.includes(e));if(i&&i.length){const a=this._getActualGroupMaster(i);a&&(t=a)}}!t&&this.entityIds&&this.entityIds.length&&(t=this.entityIds[0]),this._lastGroupingMasterId=t,this.requestUpdate()}_openSourceList(){this._showEntityOptions=!0,this._showSourceList=!0,this._showGrouping=!1,this.requestUpdate()}_closeSourceList(){this._showSourceList=!1,this.requestUpdate()}_closeGrouping(){this._showGrouping=!1}async _toggleGroup(e){const t=this._getGroupingMasterId(),i=t?this.entityIds.indexOf(t):-1,a=i>=0?this.entityObjs[i]:null;if(!a)return;const s=await this._resolveGroupingEntityId(a,t);if(!s)return;const n=this.entityObjs.find(d=>d.entity_id===e);if(!n)return;const l=await this._resolveGroupingEntityId(n,e);if(!l)return;const c=s?this.hass.states[s]:null;Array.isArray(c?.attributes?.group_members)&&c.attributes.group_members.includes(l)?await this.hass.callService("media_player","unjoin",{entity_id:l}):await this.hass.callService("media_player","join",{entity_id:s,group_members:[l]}),this._lastGroupingMasterId=t||e}static getConfigElement(){return document.createElement("yet-another-media-player-editor")}static getStubConfig(e,t){return{entities:(t||[]).filter(i=>i.startsWith("media_player.")).slice(0,2),disable_mass_queue:!1}}async _groupAll(){const e=this._getGroupingMasterId(),t=e?this.entityIds.indexOf(e):-1,i=t>=0?this.entityObjs[t]:null;if(!i)return;const a=await this._resolveGroupingEntityId(i,e);if(!a)return;const s=this.hass.states[a];if(!this._isGroupCapable(s))return;const n=Array.isArray(s.attributes?.group_members)?s.attributes.group_members:[],l=[];for(const c of this.entityIds){if(c===e)continue;const d=this.entityObjs.find(m=>m.entity_id===c);if(!d)continue;const h=await this._resolveGroupingEntityId(d,c);if(!h)continue;const u=this.hass.states[h];this._isGroupCapable(u)&&!n.includes(h)&&l.push(h)}l.length>0&&await this.hass.callService("media_player","join",{entity_id:a,group_members:l}),this._lastGroupingMasterId=e||this.currentEntityId}async _ungroupAll(){const e=this._getGroupingMasterId(),t=e?this.entityIds.indexOf(e):-1,i=t>=0?this.entityObjs[t]:null;if(!i)return;const a=await this._resolveGroupingEntityId(i,e);if(!a)return;const s=this.hass.states[a];if(!this._isGroupCapable(s))return;const n=(Array.isArray(s.attributes?.group_members)?s.attributes.group_members:[]).filter(l=>{const c=this.hass.states[l];return this._isGroupCapable(c)});for(const l of n)await this.hass.callService("media_player","unjoin",{entity_id:l});this._lastGroupingMasterId=e||this.currentEntityId}_syncGroupVolume(){const e=this._getGroupingMasterId();if(!e)return;const t=this.entityIds.indexOf(e);if(t===-1)return;const i=this._getGroupingEntityId(t),a=i?this.hass.states[i]:null;if(!a||!this._isGroupCapable(a))return;const s=this._getVolumeEntity(t)||i,n=this.hass.states[s],l=Number(n?.attributes?.volume_level);if(isNaN(l))return;const c=Array.isArray(a.attributes.group_members)?a.attributes.group_members:[],d=new Map;this.entityObjs.forEach((h,u)=>{d.set(this._getGroupingEntityId(u),u)});for(const h of c){if(h===i)continue;const u=d.get(h);if(u!==void 0){const m=this._getVolumeEntity(u)||h;this.hass.callService("media_player","volume_set",{entity_id:m,volume_level:l})}else this.hass.callService("media_player","volume_set",{entity_id:h,volume_level:l})}}_getResolvedEntitiesForCurrentChip(){const e=new Set,t=this._selectedIndex,i=this.entityObjs[t];if(!i)return[];e.add(i.entity_id);const a=this._getActualResolvedMaEntityForState(t);a&&a!==i.entity_id&&e.add(a);const s=this._getVolumeEntity(t);return s&&s!==i.entity_id&&s!==a&&e.add(s),Array.from(e)}_openMoreInfoForEntity(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_handleSelectEntityFromHelper(){if(!this.hass||!this.config?.actions)return;this._lastSelectEntityValues||(this._lastSelectEntityValues=new Map);const e=this.config.actions.filter(t=>t.action==="select_entity"&&t.sync_entity_helper);if(e.length!==0)for(const t of e){const i=t.sync_entity_helper,a=t.sync_entity_type||"yamp_entity",s=this.hass.states[i]?.state;if(!s||s==="unknown"||s==="unavailable")continue;const n=`${i}-${a}`;if(this._lastSelectEntityValues.get(n)===s)continue;this._lastSelectEntityValues.set(n,s);let l=-1;for(let c=0;c<this.entityIds.length;c++){let d;if(a==="yamp_main_entity"?d=this.entityIds[c]:a==="yamp_playback_entity"?d=this._getActivePlaybackEntityId(c):d=this._getActualResolvedMaEntityForState(c)||this.entityIds[c],d===s){l=c;break}}l>=0&&l!==this._selectedIndex&&this._onChipClick(l)}}_updateSelectedEntityHelper(){if(!this.hass||!this.config?.actions)return;const e=this._selectedIndex;if(e==null||!this.entityObjs[e])return;this._lastSyncedActionValues||(this._lastSyncedActionValues=new Map);const t=this.config.actions.filter(i=>i.action==="sync_selected_entity"&&i.sync_entity_helper);if(t.length!==0)for(const i of t){const a=i.sync_entity_helper,s=i.sync_entity_type||"yamp_entity";let n;if(s==="yamp_main_entity"?n=this.entityIds[e]:s==="yamp_playback_entity"?n=this._getActivePlaybackEntityId(e):n=this._getActualResolvedMaEntityForState(e)||this.entityIds[e],!n)continue;const l=`${a}-${s}`;this._lastSyncedActionValues.get(l)!==n&&(this.hass.states[a]?.state!==n&&this.hass.callService("input_text","set_value",{entity_id:a,value:n}),this._lastSyncedActionValues.set(l,n))}}}nt(Wa,"properties",{_quickGroupingMode:{state:!0},hass:{},config:{},_selectedIndex:{state:!0},_lastPlaying:{state:!0},_shouldDropdownOpenUp:{state:!0},_pinnedIndex:{state:!0},_showSourceList:{state:!0},_holdToPin:{state:!0},_showQueueSuccessMessage:{state:!0},_searchActiveOptionsItem:{state:!0},_activeSearchRowMenuId:{state:!0},_loadingSearchRowMenuId:{state:!0},_errorSearchRowMenuId:{state:!0},_successSearchRowMenuId:{state:!0},_successSearchRowType:{state:!0},_radioModeActive:{state:!0},_showEntityOptions:{state:!0},_showGrouping:{state:!0},_showTransferQueue:{state:!0},_showResolvedEntities:{state:!0},_showSearchInSheet:{state:!0},_addToPlaylistTarget:{state:!0},_showMediaTitleOptions:{state:!0},_dismissMenuAfterPlaylistAdd:{state:!1},_lyricsActive:{state:!0},_massLyrics:{state:!0},_fetchingLyrics:{state:!0},_lyricsError:{state:!0},_lastLyricsTrackId:{state:!0},_lastLyricsEntityId:{state:!0},_showSourceMenu:{state:!0},_volumeDraggingEntity:{state:!0},_dragVolume:{state:!0}}),nt(Wa,"styles",Po),customElements.define("yet-another-media-player",Wa);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Yr{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,t){const i=this._map.get(e)||0;this._map.set(e,t),this.totalSize+=t-i}get averageSize(){if(this._map.size>0){const e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Zr(r){return r==="horizontal"?"marginLeft":"marginTop"}function Rl(r){return r==="horizontal"?"marginRight":"marginBottom"}function Ll(r){return r==="horizontal"?"xOffset":"yOffset"}function ql(r,e){const t=[r,e].sort();return t[1]<=0?Math.min(...t):t[0]>=0?Math.max(...t):t[0]+t[1]}class Nl{constructor(){this._childSizeCache=new Yr,this._marginSizeCache=new Yr,this._metricsCache=new Map}update(e,t){const i=new Set;Object.keys(e).forEach(a=>{const s=Number(a);this._metricsCache.set(s,e[s]),this._childSizeCache.set(s,e[s][jt(t)]),i.add(s),i.add(s+1)});for(const a of i){const s=this._metricsCache.get(a)?.[Zr(t)]||0,n=this._metricsCache.get(a-1)?.[Rl(t)]||0;this._marginSizeCache.set(a,ql(s,n))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,t){return this._metricsCache.get(e)?.[Zr(t)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}}class Vl extends Ts{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new Nl,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){const t=this._metricsCache;if(this._first===-1||this._last===-1)return t.averageMarginSize+e*(t.averageMarginSize+this._getAverageSize());if(e<this._first){const i=this._first-e;return this._getPhysicalItem(this._first).pos-(t.getMarginSize(this._first-1)||t.averageMarginSize)-(i*t.averageChildSize+(i-1)*t.averageMarginSize)}else{const i=e-this._last;return this._getPhysicalItem(this._last).pos+(t.getChildSize(this._last)||t.averageChildSize)+(t.getMarginSize(this._last)||t.averageMarginSize)+i*(t.averageChildSize+t.averageMarginSize)}}_getPosition(e){const t=this._getPhysicalItem(e),{averageMarginSize:i}=this._metricsCache;return e===0?this._metricsCache.getMarginSize(0)??i:t?t.pos:this._estimatePosition(e)}_calculateAnchor(e,t){return e<=0?0:t>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+t)/2/this._delta)))}_getAnchor(e,t){if(this._physicalItems.size===0)return this._calculateAnchor(e,t);if(this._first<0)return this._calculateAnchor(e,t);if(this._last<0)return this._calculateAnchor(e,t);const i=this._getPhysicalItem(this._first),a=this._getPhysicalItem(this._last),s=i.pos;if(a.pos+this._metricsCache.getChildSize(this._last)<e)return this._calculateAnchor(e,t);if(s>t)return this._calculateAnchor(e,t);let c=this._firstVisible-1,d=-1/0;for(;d<e;)d=this._getPhysicalItem(++c).pos+this._metricsCache.getChildSize(c);return c}_getActiveItems(){this._viewDim1===0||this.items.length===0?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;const e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){const e=this._newPhysicalItems;this._stable=!0;let t,i;if(this.pin!==null){const{index:d}=this.pin;this._anchorIdx=d,this._anchorPos=this._getPosition(d)}if(t=this._scrollPosition-this._overhang,i=this._scrollPosition+this._viewDim1+this._overhang,i<0||t>this._scrollSize){this._clearItems();return}(this._anchorIdx===null||this._anchorPos===null)&&(this._anchorIdx=this._getAnchor(t,i),this._anchorPos=this._getPosition(this._anchorIdx));let a=this._getSize(this._anchorIdx);a===void 0&&(this._stable=!1,a=this._getAverageSize());const s=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;this._anchorIdx===0&&(this._anchorPos=s),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-a);let l=0;for(this._anchorPos+a+n<t&&(l=t-(this._anchorPos+a+n)),this._anchorPos-s>i&&(l=i-(this._anchorPos-s)),l&&(this._scrollPosition-=l,t-=l,i-=l,this._scrollError+=l),e.set(this._anchorIdx,{pos:this._anchorPos,size:a}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-s,this._physicalMax=this._anchorPos+a+n;this._physicalMin>t&&this._first>0;){let d=this._getSize(--this._first);d===void 0&&(this._stable=!1,d=this._getAverageSize());let h=this._metricsCache.getMarginSize(this._first);h===void 0&&(this._stable=!1,h=this._metricsCache.averageMarginSize),this._physicalMin-=d;const u=this._physicalMin;if(e.set(this._first,{pos:u,size:d}),this._physicalMin-=h,this._stable===!1&&this._estimate===!1)break}for(;this._physicalMax<i&&this._last<this.items.length-1;){let d=this._getSize(++this._last);d===void 0&&(this._stable=!1,d=this._getAverageSize());let h=this._metricsCache.getMarginSize(this._last);h===void 0&&(this._stable=!1,h=this._metricsCache.averageMarginSize);const u=this._physicalMax;if(e.set(this._last,{pos:u,size:d}),this._physicalMax+=d+h,!this._stable&&!this._estimate)break}const c=this._calculateError();c&&(this._physicalMin-=c,this._physicalMax-=c,this._anchorPos-=c,this._scrollPosition-=c,e.forEach(d=>d.pos-=c),this._scrollError+=c),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e)}_calculateError(){return this._first===0?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){const{_first:e,_last:t}=this;super._reflow(),(this._first===-1&&this._last==-1||this._first===e&&this._last===t)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){const{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){const{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,[Ll(this.direction)]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}var Ul=Object.freeze({__proto__:null,FlowLayout:Vl});
