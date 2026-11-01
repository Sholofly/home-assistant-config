var nc=Object.defineProperty;var oc=(a,e,t)=>e in a?nc(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var Fe=(a,e,t)=>oc(a,typeof e!="symbol"?e+"":e,t);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ea=globalThis,as=ea.ShadowRoot&&(ea.ShadyCSS===void 0||ea.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ss=Symbol(),Or=new WeakMap;let Lr=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==ss)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(as&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Or.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Or.set(t,e))}return e}toString(){return this.cssText}};const lc=a=>new Lr(typeof a=="string"?a:a+"",void 0,ss),ze=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+a[r+1],a[0]);return new Lr(t,a,ss)},cc=(a,e)=>{if(as)a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=ea.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,a.appendChild(i)}},qr=as?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return lc(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:dc,defineProperty:uc,getOwnPropertyDescriptor:hc,getOwnPropertyNames:pc,getOwnPropertySymbols:_c,getPrototypeOf:mc}=Object,ta=globalThis,Nr=ta.trustedTypes,gc=Nr?Nr.emptyScript:"",fc=ta.reactiveElementPolyfillSupport,_i=(a,e)=>a,rs={toAttribute(a,e){switch(e){case Boolean:a=a?gc:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Ur=(a,e)=>!dc(a,e),Vr={attribute:!0,type:String,converter:rs,reflect:!1,useDefault:!1,hasChanged:Ur};Symbol.metadata??=Symbol("metadata"),ta.litPropertyMetadata??=new WeakMap;let Dt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Vr){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&uc(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=hc(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:s,set(n){const o=s?.call(this);r?.call(this,n),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Vr}static _$Ei(){if(this.hasOwnProperty(_i("elementProperties")))return;const e=mc(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_i("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_i("properties"))){const t=this.properties,i=[...pc(t),..._c(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(qr(s))}else e!==void 0&&t.push(qr(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return cc(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const r=(i.converter?.toAttribute!==void 0?i.converter:rs).toAttribute(t,i.type);this._$Em=e,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const r=i.getPropertyOptions(s),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:rs;this._$Em=s;const o=n.fromAttribute(t,r.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){if(e!==void 0){const n=this.constructor;if(s===!1&&(r=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??Ur)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),r!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,r]of i){const{wrapped:n}=r,o=this[s];n!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,r,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};Dt.elementStyles=[],Dt.shadowRootOptions={mode:"open"},Dt[_i("elementProperties")]=new Map,Dt[_i("finalized")]=new Map,fc?.({ReactiveElement:Dt}),(ta.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ns=globalThis,Br=a=>a,ia=ns.trustedTypes,Hr=ia?ia.createPolicy("lit-html",{createHTML:a=>a}):void 0,Gr="$lit$",lt=`lit$${Math.random().toFixed(9).slice(2)}$`,Qr="?"+lt,yc=`<${Qr}>`,wt=document,mi=()=>wt.createComment(""),gi=a=>a===null||typeof a!="object"&&typeof a!="function",os=Array.isArray,vc=a=>os(a)||typeof a?.[Symbol.iterator]=="function",ls=`[ 	
\f\r]`,fi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wr=/-->/g,Kr=/>/g,kt=RegExp(`>|${ls}(?:([^\\s"'>=/]+)(${ls}*=${ls}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yr=/'/g,Zr=/"/g,Xr=/^(?:script|style|textarea|title)$/i,bc=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),g=bc(1),He=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Jr=new WeakMap,Et=wt.createTreeWalker(wt,129);function en(a,e){if(!os(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Hr!==void 0?Hr.createHTML(e):e}const xc=(a,e)=>{const t=a.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",n=fi;for(let o=0;o<t;o++){const l=a[o];let c,u,h=-1,p=0;for(;p<l.length&&(n.lastIndex=p,u=n.exec(l),u!==null);)p=n.lastIndex,n===fi?u[1]==="!--"?n=Wr:u[1]!==void 0?n=Kr:u[2]!==void 0?(Xr.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=kt):u[3]!==void 0&&(n=kt):n===kt?u[0]===">"?(n=s??fi,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,c=u[1],n=u[3]===void 0?kt:u[3]==='"'?Zr:Yr):n===Zr||n===Yr?n=kt:n===Wr||n===Kr?n=fi:(n=kt,s=void 0);const _=n===kt&&a[o+1].startsWith("/>")?" ":"";r+=n===fi?l+yc:h>=0?(i.push(c),l.slice(0,h)+Gr+l.slice(h)+lt+_):l+lt+(h===-2?o:_)}return[en(a,r+(a[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};let cs=class pl{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0;const o=e.length-1,l=this.parts,[c,u]=xc(e,t);if(this.el=pl.createElement(c,i),Et.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=Et.nextNode())!==null&&l.length<o;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(Gr)){const p=u[n++],_=s.getAttribute(h).split(lt),m=/([.?@])?(.*)/.exec(p);l.push({type:1,index:r,name:m[2],strings:_,ctor:m[1]==="."?kc:m[1]==="?"?Ec:m[1]==="@"?Sc:sa}),s.removeAttribute(h)}else h.startsWith(lt)&&(l.push({type:6,index:r}),s.removeAttribute(h));if(Xr.test(s.tagName)){const h=s.textContent.split(lt),p=h.length-1;if(p>0){s.textContent=ia?ia.emptyScript:"";for(let _=0;_<p;_++)s.append(h[_],mi()),Et.nextNode(),l.push({type:2,index:++r});s.append(h[p],mi())}}}else if(s.nodeType===8)if(s.data===Qr)l.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf(lt,h+1))!==-1;)l.push({type:7,index:r}),h+=lt.length-1}r++}}static createElement(e,t){const i=wt.createElement("template");return i.innerHTML=e,i}};function Rt(a,e,t=a,i){if(e===He)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl;const r=gi(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(a),s._$AT(a,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=Rt(a,s._$AS(a,e.values),s,i)),e}let wc=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??wt).importNode(t,!0);Et.currentNode=s;let r=Et.nextNode(),n=0,o=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new aa(r,r.nextSibling,this,e):l.type===1?c=new l.ctor(r,l.name,l.strings,this,e):l.type===6&&(c=new Ac(r,this,e)),this._$AV.push(c),l=i[++o]}n!==l?.index&&(r=Et.nextNode(),n++)}return Et.currentNode=wt,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},aa=class _l{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Rt(this,e,t),gi(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==He&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):vc(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&gi(this._$AH)?this._$AA.nextSibling.data=e:this.T(wt.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=cs.createElement(en(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const r=new wc(s,this),n=r.u(this.options);r.p(t),this.T(n),this._$AH=r}}_$AC(e){let t=Jr.get(e.strings);return t===void 0&&Jr.set(e.strings,t=new cs(e)),t}k(e){os(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new _l(this.O(mi()),this.O(mi()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const i=Br(e).nextSibling;Br(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},sa=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(e,t=this,i,s){const r=this.strings;let n=!1;if(r===void 0)e=Rt(this,e,t,0),n=!gi(e)||e!==this._$AH&&e!==He,n&&(this._$AH=e);else{const o=e;let l,c;for(e=r[0],l=0;l<r.length-1;l++)c=Rt(this,o[i+l],t,l),c===He&&(c=this._$AH[l]),n||=!gi(c)||c!==this._$AH[l],c===b?e=b:e!==b&&(e+=(c??"")+r[l+1]),this._$AH[l]=c}n&&!s&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},kc=class extends sa{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}},Ec=class extends sa{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}},Sc=class extends sa{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=Rt(this,e,t,0)??b)===He)return;const i=this._$AH,s=e===b&&i!==b||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}};class Ac{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Rt(this,e)}}const $c={I:aa},Cc=ns.litHtmlPolyfillSupport;Cc?.(cs,aa),(ns.litHtmlVersions??=[]).push("3.3.3");const Tc=(a,e,t)=>{const i=t?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const r=t?.renderBefore??null;i._$litPart$=s=new aa(e.insertBefore(mi(),r),r,void 0,t??{})}return s._$AI(a),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ds=globalThis;let ct=class extends Dt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Tc(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return He}};ct._$litElement$=!0,ct.finalized=!0,ds.litElementHydrateSupport?.({LitElement:ct});const Ic=ds.litElementPolyfillSupport;Ic?.({LitElement:ct}),(ds.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yi={ATTRIBUTE:1,CHILD:2},ra=a=>(...e)=>({_$litDirective$:a,values:e});let na=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const us=ra(class extends na{constructor(a){if(super(a),a.type!==yi.ATTRIBUTE||a.name!=="class"||a.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(e=>a[e]).join(" ")+" "}update(a,[e]){if(this.st===void 0){this.st=new Set,a.strings!==void 0&&(this.nt=new Set(a.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(const i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}const t=a.element.classList;for(const i of this.st)i in e||(t.remove(i),this.st.delete(i));for(const i in e){const s=!!e[i];s===this.st.has(i)||this.nt?.has(i)||(s?(t.add(i),this.st.add(i)):(t.remove(i),this.st.delete(i)))}return He}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tn="important",Mc=" !"+tn,Pc=ra(class extends na{constructor(a){if(super(a),a.type!==yi.ATTRIBUTE||a.name!=="style"||a.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(a){return Object.keys(a).reduce((e,t)=>{const i=a[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(a,[e]){const{style:t}=a.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(const i in e){const s=e[i];if(s!=null){this.ft.add(i);const r=typeof s=="string"&&s.endsWith(Mc);i.includes("-")||r?t.setProperty(i,r?s.slice(0,-11):s,r?tn:""):t[i]=s}}return He}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:Fc}=$c,an=a=>a,zc=a=>a.strings===void 0,sn=()=>document.createComment(""),vi=(a,e,t)=>{const i=a._$AA.parentNode,s=e===void 0?a._$AB:e._$AA;if(t===void 0){const r=i.insertBefore(sn(),s),n=i.insertBefore(sn(),s);t=new Fc(r,n,a,a.options)}else{const r=t._$AB.nextSibling,n=t._$AM,o=n!==a;if(o){let l;t._$AQ?.(a),t._$AM=a,t._$AP!==void 0&&(l=a._$AU)!==n._$AU&&t._$AP(l)}if(r!==s||o){let l=t._$AA;for(;l!==r;){const c=an(l).nextSibling;an(i).insertBefore(l,s),l=c}}}return t},St=(a,e,t=a)=>(a._$AI(e,t),a),jc={},Dc=(a,e=jc)=>a._$AH=e,Rc=a=>a._$AH,hs=a=>{a._$AR(),a._$AA.remove()};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bi=(a,e)=>{const t=a._$AN;if(t===void 0)return!1;for(const i of t)i._$AO?.(e,!1),bi(i,e);return!0},oa=a=>{let e,t;do{if((e=a._$AM)===void 0)break;t=e._$AN,t.delete(a),a=e}while(t?.size===0)},rn=a=>{for(let e;e=a._$AM;a=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(a))break;t.add(a),qc(e)}};function Oc(a){this._$AN!==void 0?(oa(this),this._$AM=a,rn(this)):this._$AM=a}function Lc(a,e=!1,t=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(i))for(let r=t;r<i.length;r++)bi(i[r],!1),oa(i[r]);else i!=null&&(bi(i,!1),oa(i));else bi(this,a)}const qc=a=>{a.type==yi.CHILD&&(a._$AP??=Lc,a._$AQ??=Oc)};class Nc extends na{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),rn(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(bi(this,e),oa(this))}setValue(e){if(zc(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nn=(a,e,t)=>{const i=new Map;for(let s=e;s<=t;s++)i.set(a[s],s);return i},Uc=ra(class extends na{constructor(a){if(super(a),a.type!==yi.CHILD)throw Error("repeat() can only be used in text expressions")}dt(a,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const s=[],r=[];let n=0;for(const o of a)s[n]=i?i(o,n):n,r[n]=t(o,n),n++;return{values:r,keys:s}}render(a,e,t){return this.dt(a,e,t).values}update(a,[e,t,i]){const s=Rc(a),{values:r,keys:n}=this.dt(e,t,i);if(!Array.isArray(s))return this.ut=n,r;const o=this.ut??=[],l=[];let c,u,h=0,p=s.length-1,_=0,m=r.length-1;for(;h<=p&&_<=m;)if(s[h]===null)h++;else if(s[p]===null)p--;else if(o[h]===n[_])l[_]=St(s[h],r[_]),h++,_++;else if(o[p]===n[m])l[m]=St(s[p],r[m]),p--,m--;else if(o[h]===n[m])l[m]=St(s[h],r[m]),vi(a,l[m+1],s[h]),h++,m--;else if(o[p]===n[_])l[_]=St(s[p],r[_]),vi(a,s[h],s[p]),p--,_++;else if(c===void 0&&(c=nn(n,_,m),u=nn(o,h,p)),c.has(o[h]))if(c.has(o[p])){const f=u.get(n[_]),y=f!==void 0?s[f]:null;if(y===null){const v=vi(a,s[h]);St(v,r[_]),l[_]=v}else l[_]=St(y,r[_]),vi(a,s[h],y),s[f]=null;_++}else hs(s[p]),p--;else hs(s[h]),h++;for(;_<=m;){const f=vi(a,l[m+1]);St(f,r[_]),l[_++]=f}for(;h<=p;){const f=s[h++];f!==null&&hs(f)}return this.ut=n,Dc(a,l),He}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class qa extends Event{constructor(e){super(qa.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}}qa.eventName="rangeChanged";class Na extends Event{constructor(e){super(Na.eventName,{bubbles:!1}),this.first=e.first,this.last=e.last}}Na.eventName="visibilityChanged";class Ua extends Event{constructor(){super(Ua.eventName,{bubbles:!1})}}Ua.eventName="unpinned";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Vc{constructor(e){this._element=null;const t=e??window;this._node=t,e&&(this._element=e)}get element(){return this._element||document.scrollingElement||document.documentElement}get scrollTop(){return this.element.scrollTop||window.scrollY}get scrollLeft(){return this.element.scrollLeft||window.scrollX}get scrollHeight(){return this.element.scrollHeight}get scrollWidth(){return this.element.scrollWidth}get viewportHeight(){return this._element?this._element.getBoundingClientRect().height:window.innerHeight}get viewportWidth(){return this._element?this._element.getBoundingClientRect().width:window.innerWidth}get maxScrollTop(){return this.scrollHeight-this.viewportHeight}get maxScrollLeft(){return this.scrollWidth-this.viewportWidth}}class Bc extends Vc{constructor(e,t){super(t),this._clients=new Set,this._retarget=null,this._end=null,this.__destination=null,this.correctingScrollError=!1,this._checkForArrival=this._checkForArrival.bind(this),this._updateManagedScrollTo=this._updateManagedScrollTo.bind(this),this.scrollTo=this.scrollTo.bind(this),this.scrollBy=this.scrollBy.bind(this);const i=this._node;this._originalScrollTo=i.scrollTo,this._originalScrollBy=i.scrollBy,this._originalScroll=i.scroll,this._attach(e)}get _destination(){return this.__destination}get scrolling(){return this._destination!==null}scrollTo(e,t){const i=typeof e=="number"&&typeof t=="number"?{left:e,top:t}:e;this._scrollTo(i)}scrollBy(e,t){const i=typeof e=="number"&&typeof t=="number"?{left:e,top:t}:e;i.top!==void 0&&(i.top+=this.scrollTop),i.left!==void 0&&(i.left+=this.scrollLeft),this._scrollTo(i)}_nativeScrollTo(e){this._originalScrollTo.bind(this._element||window)(e)}_scrollTo(e,t=null,i=null){this._end!==null&&this._end(),e.behavior==="smooth"?(this._setDestination(e),this._retarget=t,this._end=i):this._resetScrollState(),this._nativeScrollTo(e)}_setDestination(e){let{top:t,left:i}=e;return t=t===void 0?void 0:Math.max(0,Math.min(t,this.maxScrollTop)),i=i===void 0?void 0:Math.max(0,Math.min(i,this.maxScrollLeft)),this._destination!==null&&i===this._destination.left&&t===this._destination.top?!1:(this.__destination={top:t,left:i,behavior:"smooth"},!0)}_resetScrollState(){this.__destination=null,this._retarget=null,this._end=null}_updateManagedScrollTo(e){this._destination&&this._setDestination(e)&&this._nativeScrollTo(this._destination)}managedScrollTo(e,t,i){return this._scrollTo(e,t,i),this._updateManagedScrollTo}correctScrollError(e){this.correctingScrollError=!0,requestAnimationFrame(()=>requestAnimationFrame(()=>this.correctingScrollError=!1)),this._nativeScrollTo(e),this._retarget&&this._setDestination(this._retarget()),this._destination&&this._nativeScrollTo(this._destination)}_checkForArrival(){if(this._destination!==null){const{scrollTop:e,scrollLeft:t}=this;let{top:i,left:s}=this._destination;i=Math.min(i||0,this.maxScrollTop),s=Math.min(s||0,this.maxScrollLeft);const r=Math.abs(i-e),n=Math.abs(s-t);r<1&&n<1&&(this._end&&this._end(),this._resetScrollState())}}detach(e){return this._clients.delete(e),this._clients.size===0&&(this._node.scrollTo=this._originalScrollTo,this._node.scrollBy=this._originalScrollBy,this._node.scroll=this._originalScroll,this._node.removeEventListener("scroll",this._checkForArrival)),null}_attach(e){this._clients.add(e),this._clients.size===1&&(this._node.scrollTo=this.scrollTo,this._node.scrollBy=this.scrollBy,this._node.scroll=this.scrollTo,this._node.addEventListener("scroll",this._checkForArrival))}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let on=typeof window<"u"?window.ResizeObserver:void 0;const Hc=Symbol("virtualizerRef"),la="virtualizer-sizer";let ln;class Gc{constructor(e){if(this._benchmarkStart=null,this._layout=null,this._clippingAncestors=[],this._scrollSize=null,this._scrollError=null,this._childrenPos=null,this._childMeasurements=null,this._toBeMeasured=new Map,this._rangeChanged=!0,this._itemsChanged=!0,this._visibilityChanged=!0,this._scrollerController=null,this._isScroller=!1,this._sizer=null,this._hostElementRO=null,this._childrenRO=null,this._mutationObserver=null,this._scrollEventListeners=[],this._scrollEventListenerOptions={passive:!0},this._loadListener=this._childLoaded.bind(this),this._scrollIntoViewTarget=null,this._updateScrollIntoViewCoordinates=null,this._items=[],this._first=-1,this._last=-1,this._firstVisible=-1,this._lastVisible=-1,this._scheduled=new WeakSet,this._measureCallback=null,this._measureChildOverride=null,this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null,this._layoutInitialized=null,this._connected=!1,!e)throw new Error("Virtualizer constructor requires a configuration object");if(e.hostElement)this._init(e);else throw new Error('Virtualizer configuration requires the "hostElement" property')}set items(e){Array.isArray(e)&&e!==this._items&&(this._itemsChanged=!0,this._items=e,this._schedule(this._updateLayout))}_init(e){this._isScroller=!!e.scroller,this._initHostElement(e);const t=e.layout||{};this._layoutInitialized=this._initLayout(t)}_initObservers(){this._mutationObserver=new MutationObserver(this._finishDOMUpdate.bind(this)),this._hostElementRO=new on(()=>this._hostElementSizeChanged()),this._childrenRO=new on(this._childrenSizeChanged.bind(this))}_initHostElement(e){const t=this._hostElement=e.hostElement;this._applyVirtualizerStyles(),t[Hc]=this}connected(){this._initObservers();const e=this._isScroller;this._clippingAncestors=Kc(this._hostElement,e),this._scrollerController=new Bc(this,this._clippingAncestors[0]),this._schedule(this._updateLayout),this._observeAndListen(),this._connected=!0}_observeAndListen(){this._mutationObserver.observe(this._hostElement,{childList:!0}),this._hostElementRO.observe(this._hostElement),this._scrollEventListeners.push(window),window.addEventListener("scroll",this,this._scrollEventListenerOptions),this._clippingAncestors.forEach(e=>{e.addEventListener("scroll",this,this._scrollEventListenerOptions),this._scrollEventListeners.push(e),this._hostElementRO.observe(e)}),this._hostElementRO.observe(this._scrollerController.element),this._children.forEach(e=>this._childrenRO.observe(e)),this._scrollEventListeners.forEach(e=>e.addEventListener("scroll",this,this._scrollEventListenerOptions))}disconnected(){this._scrollEventListeners.forEach(e=>e.removeEventListener("scroll",this,this._scrollEventListenerOptions)),this._scrollEventListeners=[],this._clippingAncestors=[],this._scrollerController?.detach(this),this._scrollerController=null,this._mutationObserver?.disconnect(),this._mutationObserver=null,this._hostElementRO?.disconnect(),this._hostElementRO=null,this._childrenRO?.disconnect(),this._childrenRO=null,this._rejectLayoutCompletePromise("disconnected"),this._connected=!1}_applyVirtualizerStyles(){const t=this._hostElement.style;t.display=t.display||"block",t.position=t.position||"relative",t.contain=t.contain||"size layout",this._isScroller&&(t.overflow=t.overflow||"auto",t.minHeight=t.minHeight||"150px")}_getSizer(){const e=this._hostElement;if(!this._sizer){let t=e.querySelector(`[${la}]`);t||(t=document.createElement("div"),t.setAttribute(la,""),e.appendChild(t)),Object.assign(t.style,{position:"absolute",margin:"-2px 0 0 0",padding:0,visibility:"hidden",fontSize:"2px"}),t.textContent="&nbsp;",t.setAttribute(la,""),this._sizer=t}return this._sizer}async updateLayoutConfig(e){await this._layoutInitialized;const t=e.type||ln;if(typeof t=="function"&&this._layout instanceof t){const i={...e};return delete i.type,this._layout.config=i,!0}return!1}async _initLayout(e){let t,i;if(typeof e.type=="function"){i=e.type;const s={...e};delete s.type,t=s}else t=e;i===void 0&&(ln=i=(await Promise.resolve().then(function(){return N_})).FlowLayout),this._layout=new i(s=>this._handleLayoutMessage(s),t),this._layout.measureChildren&&typeof this._layout.updateItemSizes=="function"&&(typeof this._layout.measureChildren=="function"&&(this._measureChildOverride=this._layout.measureChildren),this._measureCallback=this._layout.updateItemSizes.bind(this._layout)),this._layout.listenForChildLoadEvents&&this._hostElement.addEventListener("load",this._loadListener,!0),this._schedule(this._updateLayout)}startBenchmarking(){this._benchmarkStart===null&&(this._benchmarkStart=window.performance.now())}stopBenchmarking(){if(this._benchmarkStart!==null){const e=window.performance.now(),t=e-this._benchmarkStart,s=performance.getEntriesByName("uv-virtualizing","measure").filter(r=>r.startTime>=this._benchmarkStart&&r.startTime<e).reduce((r,n)=>r+n.duration,0);return this._benchmarkStart=null,{timeElapsed:t,virtualizationTime:s}}return null}_measureChildren(){const e={},t=this._children,i=this._measureChildOverride||this._measureChild;for(let s=0;s<t.length;s++){const r=t[s],n=this._first+s;(this._itemsChanged||this._toBeMeasured.has(r))&&(e[n]=i.call(this,r,this._items[n]))}this._childMeasurements=e,this._schedule(this._updateLayout),this._toBeMeasured.clear()}_measureChild(e){const{width:t,height:i}=e.getBoundingClientRect();return Object.assign({width:t,height:i},Qc(e))}async _schedule(e){this._scheduled.has(e)||(this._scheduled.add(e),await Promise.resolve(),this._scheduled.delete(e),e.call(this))}async _updateDOM(e){this._scrollSize=e.scrollSize,this._adjustRange(e.range),this._childrenPos=e.childPositions,this._scrollError=e.scrollError||null;const{_rangeChanged:t,_itemsChanged:i}=this;this._visibilityChanged&&(this._notifyVisibility(),this._visibilityChanged=!1),(t||i)&&(this._notifyRange(),this._rangeChanged=!1),this._finishDOMUpdate()}_finishDOMUpdate(){this._connected&&(this._children.forEach(e=>this._childrenRO.observe(e)),this._checkScrollIntoViewTarget(this._childrenPos),this._positionChildren(this._childrenPos),this._sizeHostElement(this._scrollSize),this._correctScrollError(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_updateLayout(){this._layout&&this._connected&&(this._layout.items=this._items,this._updateView(),this._childMeasurements!==null&&(this._measureCallback&&this._measureCallback(this._childMeasurements),this._childMeasurements=null),this._layout.reflowIfNeeded(),this._benchmarkStart&&"mark"in window.performance&&window.performance.mark("uv-end"))}_handleScrollEvent(){if(this._benchmarkStart&&"mark"in window.performance){try{window.performance.measure("uv-virtualizing","uv-start","uv-end")}catch(e){console.warn("Error measuring performance data: ",e)}window.performance.mark("uv-start")}this._scrollerController.correctingScrollError===!1&&this._layout?.unpin(),this._schedule(this._updateLayout)}handleEvent(e){e.type==="scroll"?(e.currentTarget===window||this._clippingAncestors.includes(e.currentTarget))&&this._handleScrollEvent():console.warn("event not handled",e)}_handleLayoutMessage(e){e.type==="stateChanged"?this._updateDOM(e):e.type==="visibilityChanged"?(this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._notifyVisibility()):e.type==="unpinned"&&this._hostElement.dispatchEvent(new Ua)}get _children(){const e=[];let t=this._hostElement.firstElementChild;for(;t;)t.hasAttribute(la)||e.push(t),t=t.nextElementSibling;return e}_updateView(){const e=this._hostElement,t=this._scrollerController?.element,i=this._layout;if(e&&t&&i){let s,r,n,o;const l=e.getBoundingClientRect();s=0,r=0,n=window.innerHeight,o=window.innerWidth;const c=this._clippingAncestors.map(v=>v.getBoundingClientRect());c.unshift(l);for(const v of c)s=Math.max(s,v.top),r=Math.max(r,v.left),n=Math.min(n,v.bottom),o=Math.min(o,v.right);const u=t.getBoundingClientRect(),h={left:l.left-u.left,top:l.top-u.top},p={width:t.scrollWidth,height:t.scrollHeight},_=s-l.top+e.scrollTop,m=r-l.left+e.scrollLeft,f=Math.max(0,n-s),y=Math.max(0,o-r);i.viewportSize={width:y,height:f},i.viewportScroll={top:_,left:m},i.totalScrollSize=p,i.offsetWithinScroller=h}}_sizeHostElement(e){const i=e&&e.width!==null?Math.min(82e5,e.width):0,s=e&&e.height!==null?Math.min(82e5,e.height):0;if(this._isScroller)this._getSizer().style.transform=`translate(${i}px, ${s}px)`;else{const r=this._hostElement.style;r.minWidth=i?`${i}px`:"100%",r.minHeight=s?`${s}px`:"100%"}}_positionChildren(e){e&&e.forEach(({top:t,left:i,width:s,height:r,xOffset:n,yOffset:o},l)=>{const c=this._children[l-this._first];c&&(c.style.position="absolute",c.style.boxSizing="border-box",c.style.transform=`translate(${i}px, ${t}px)`,s!==void 0&&(c.style.width=s+"px"),r!==void 0&&(c.style.height=r+"px"),c.style.left=n===void 0?null:n+"px",c.style.top=o===void 0?null:o+"px")})}async _adjustRange(e){const{_first:t,_last:i,_firstVisible:s,_lastVisible:r}=this;this._first=e.first,this._last=e.last,this._firstVisible=e.firstVisible,this._lastVisible=e.lastVisible,this._rangeChanged=this._rangeChanged||this._first!==t||this._last!==i,this._visibilityChanged=this._visibilityChanged||this._firstVisible!==s||this._lastVisible!==r}_correctScrollError(){if(this._scrollError){const{scrollTop:e,scrollLeft:t}=this._scrollerController,{top:i,left:s}=this._scrollError;this._scrollError=null,this._scrollerController.correctScrollError({top:e-i,left:t-s})}}element(e){return e===1/0&&(e=this._items.length-1),this._items?.[e]===void 0?void 0:{scrollIntoView:(t={})=>this._scrollElementIntoView({...t,index:e})}}_scrollElementIntoView(e){if(e.index>=this._first&&e.index<=this._last)this._children[e.index-this._first].scrollIntoView(e);else if(e.index=Math.min(e.index,this._items.length-1),e.behavior==="smooth"){const t=this._layout.getScrollIntoViewCoordinates(e),{behavior:i}=e;this._updateScrollIntoViewCoordinates=this._scrollerController.managedScrollTo(Object.assign(t,{behavior:i}),()=>this._layout.getScrollIntoViewCoordinates(e),()=>this._scrollIntoViewTarget=null),this._scrollIntoViewTarget=e}else this._layout.pin=e}_checkScrollIntoViewTarget(e){const{index:t}=this._scrollIntoViewTarget||{};t&&e?.has(t)&&this._updateScrollIntoViewCoordinates(this._layout.getScrollIntoViewCoordinates(this._scrollIntoViewTarget))}_notifyRange(){this._hostElement.dispatchEvent(new qa({first:this._first,last:this._last}))}_notifyVisibility(){this._hostElement.dispatchEvent(new Na({first:this._firstVisible,last:this._lastVisible}))}get layoutComplete(){return this._layoutCompletePromise||(this._layoutCompletePromise=new Promise((e,t)=>{this._layoutCompleteResolver=e,this._layoutCompleteRejecter=t})),this._layoutCompletePromise}_rejectLayoutCompletePromise(e){this._layoutCompleteRejecter!==null&&this._layoutCompleteRejecter(e),this._resetLayoutCompleteState()}_scheduleLayoutComplete(){this._layoutCompletePromise&&this._pendingLayoutComplete===null&&(this._pendingLayoutComplete=requestAnimationFrame(()=>requestAnimationFrame(()=>this._resolveLayoutCompletePromise())))}_resolveLayoutCompletePromise(){this._layoutCompleteResolver!==null&&this._layoutCompleteResolver(),this._resetLayoutCompleteState()}_resetLayoutCompleteState(){this._layoutCompletePromise=null,this._layoutCompleteResolver=null,this._layoutCompleteRejecter=null,this._pendingLayoutComplete=null}_hostElementSizeChanged(){this._schedule(this._updateLayout)}_childLoaded(){}_childrenSizeChanged(e){if(this._layout?.measureChildren){for(const t of e)this._toBeMeasured.set(t.target,t.contentRect);this._measureChildren()}this._scheduleLayoutComplete(),this._itemsChanged=!1,this._rangeChanged=!1}}function Qc(a){const e=window.getComputedStyle(a);return{marginTop:ca(e.marginTop),marginRight:ca(e.marginRight),marginBottom:ca(e.marginBottom),marginLeft:ca(e.marginLeft)}}function ca(a){const e=a?parseFloat(a):NaN;return Number.isNaN(e)?0:e}function cn(a){if(a.assignedSlot!==null)return a.assignedSlot;if(a.parentElement!==null)return a.parentElement;const e=a.parentNode;return e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host||null}function Wc(a,e=!1){const t=[];let i=e?a:cn(a);for(;i!==null;)t.push(i),i=cn(i);return t}function Kc(a,e=!1){let t=!1;return Wc(a,e).filter(i=>{if(t)return!1;const s=getComputedStyle(i);return t=s.position==="fixed",s.overflow!=="visible"})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yc=a=>a,Zc=(a,e)=>g`${e}: ${JSON.stringify(a,null,2)}`;class Xc extends Nc{constructor(e){if(super(e),this._virtualizer=null,this._first=0,this._last=-1,this._renderItem=(t,i)=>Zc(t,i+this._first),this._keyFunction=(t,i)=>Yc(t,i+this._first),this._items=[],e.type!==yi.CHILD)throw new Error("The virtualize directive can only be used in child expressions")}render(e){e&&this._setFunctions(e);const t=[];if(this._first>=0&&this._last>=this._first)for(let i=this._first;i<=this._last;i++)t.push(this._items[i]);return Uc(t,this._keyFunction,this._renderItem)}update(e,[t]){this._setFunctions(t);const i=this._items!==t.items;return this._items=t.items||[],this._virtualizer?this._updateVirtualizerConfig(e,t):this._initialize(e,t),i?He:this.render()}async _updateVirtualizerConfig(e,t){if(!await this._virtualizer.updateLayoutConfig(t.layout||{})){const s=e.parentNode;this._makeVirtualizer(s,t)}this._virtualizer.items=this._items}_setFunctions(e){const{renderItem:t,keyFunction:i}=e;t&&(this._renderItem=(s,r)=>t(s,r+this._first)),i&&(this._keyFunction=(s,r)=>i(s,r+this._first))}_makeVirtualizer(e,t){this._virtualizer&&this._virtualizer.disconnected();const{layout:i,scroller:s,items:r}=t;this._virtualizer=new Gc({hostElement:e,layout:i,scroller:s}),this._virtualizer.items=r,this._virtualizer.connected()}_initialize(e,t){const i=e.parentNode;i&&i.nodeType===1&&(i.addEventListener("rangeChanged",s=>{this._first=s.first,this._last=s.last,this.setValue(this.render())}),this._makeVirtualizer(i,t))}disconnected(){this._virtualizer?.disconnected()}reconnected(){this._virtualizer?.connected()}}const dn=ra(Xc);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ot(a){return a==="horizontal"?"width":"height"}function un(a){return a==="horizontal"?"height":"width"}class hn{_getDefaultConfig(){return{direction:"vertical"}}constructor(e,t){this._latestCoords={left:0,top:0},this._direction=null,this._viewportSize={width:0,height:0},this.totalScrollSize={width:0,height:0},this.offsetWithinScroller={left:0,top:0},this._pendingReflow=!1,this._pendingLayoutUpdate=!1,this._pin=null,this._firstVisible=0,this._lastVisible=0,this._physicalMin=0,this._physicalMax=0,this._first=-1,this._last=-1,this._sizeDim="height",this._secondarySizeDim="width",this._positionDim="top",this._secondaryPositionDim="left",this._scrollPosition=0,this._scrollError=0,this._items=[],this._scrollSize=1,this._overhang=1e3,this._hostSink=e,Promise.resolve().then(()=>this.config=t||this._getDefaultConfig())}set config(e){Object.assign(this,Object.assign({},this._getDefaultConfig(),e))}get config(){return{direction:this.direction}}get items(){return this._items}set items(e){this._setItems(e)}_setItems(e){e!==this._items&&(this._items=e,this._scheduleReflow())}get direction(){return this._direction}set direction(e){e=e==="horizontal"?e:"vertical",e!==this._direction&&(this._direction=e,this._sizeDim=e==="horizontal"?"width":"height",this._secondarySizeDim=e==="horizontal"?"height":"width",this._positionDim=e==="horizontal"?"left":"top",this._secondaryPositionDim=e==="horizontal"?"top":"left",this._triggerReflow())}get viewportSize(){return this._viewportSize}set viewportSize(e){const{_viewDim1:t,_viewDim2:i}=this;Object.assign(this._viewportSize,e),i!==this._viewDim2?this._scheduleLayoutUpdate():t!==this._viewDim1&&this._checkThresholds()}get viewportScroll(){return this._latestCoords}set viewportScroll(e){Object.assign(this._latestCoords,e);const t=this._scrollPosition;this._scrollPosition=this._latestCoords[this._positionDim],Math.abs(t-this._scrollPosition)>=1&&this._checkThresholds()}reflowIfNeeded(e=!1){(e||this._pendingReflow)&&(this._pendingReflow=!1,this._reflow())}set pin(e){this._pin=e,this._triggerReflow()}get pin(){if(this._pin!==null){const{index:e,block:t}=this._pin;return{index:Math.max(0,Math.min(e,this.items.length-1)),block:t}}return null}_clampScrollPosition(e){return Math.max(-this.offsetWithinScroller[this._positionDim],Math.min(e,this.totalScrollSize[Ot(this.direction)]-this._viewDim1))}unpin(){this._pin!==null&&(this._sendUnpinnedMessage(),this._pin=null)}_updateLayout(){}get _viewDim1(){return this._viewportSize[this._sizeDim]}get _viewDim2(){return this._viewportSize[this._secondarySizeDim]}_scheduleReflow(){this._pendingReflow=!0}_scheduleLayoutUpdate(){this._pendingLayoutUpdate=!0,this._scheduleReflow()}_triggerReflow(){this._scheduleLayoutUpdate(),Promise.resolve().then(()=>this.reflowIfNeeded())}_reflow(){this._pendingLayoutUpdate&&(this._updateLayout(),this._pendingLayoutUpdate=!1),this._updateScrollSize(),this._setPositionFromPin(),this._getActiveItems(),this._updateVisibleIndices(),this._sendStateChangedMessage()}_setPositionFromPin(){if(this.pin!==null){const e=this._scrollPosition,{index:t,block:i}=this.pin;this._scrollPosition=this._calculateScrollIntoViewPosition({index:t,block:i||"start"})-this.offsetWithinScroller[this._positionDim],this._scrollError=e-this._scrollPosition}}_calculateScrollIntoViewPosition(e){const{block:t}=e,i=Math.min(this.items.length,Math.max(0,e.index)),s=this._getItemPosition(i)[this._positionDim];let r=s;if(t!=="start"){const n=this._getItemSize(i)[this._sizeDim];if(t==="center")r=s-.5*this._viewDim1+.5*n;else{const o=s-this._viewDim1+n;if(t==="end")r=o;else{const l=this._scrollPosition;r=Math.abs(l-s)<Math.abs(l-o)?s:o}}}return r+=this.offsetWithinScroller[this._positionDim],this._clampScrollPosition(r)}getScrollIntoViewCoordinates(e){return{[this._positionDim]:this._calculateScrollIntoViewPosition(e)}}_sendUnpinnedMessage(){this._hostSink({type:"unpinned"})}_sendVisibilityChangedMessage(){this._hostSink({type:"visibilityChanged",firstVisible:this._firstVisible,lastVisible:this._lastVisible})}_sendStateChangedMessage(){const e=new Map;if(this._first!==-1&&this._last!==-1)for(let i=this._first;i<=this._last;i++)e.set(i,this._getItemPosition(i));const t={type:"stateChanged",scrollSize:{[this._sizeDim]:this._scrollSize,[this._secondarySizeDim]:null},range:{first:this._first,last:this._last,firstVisible:this._firstVisible,lastVisible:this._lastVisible},childPositions:e};this._scrollError&&(t.scrollError={[this._positionDim]:this._scrollError,[this._secondaryPositionDim]:0},this._scrollError=0),this._hostSink(t)}get _num(){return this._first===-1||this._last===-1?0:this._last-this._first+1}_checkThresholds(){if(this._viewDim1===0&&this._num>0||this._pin!==null)this._scheduleReflow();else{const e=Math.max(0,this._scrollPosition-this._overhang),t=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang);this._physicalMin>e||this._physicalMax<t?this._scheduleReflow():this._updateVisibleIndices({emit:!0})}}_updateVisibleIndices(e){if(this._first===-1||this._last===-1)return;let t=this._first;for(;t<this._last&&Math.round(this._getItemPosition(t)[this._positionDim]+this._getItemSize(t)[this._sizeDim])<=Math.round(this._scrollPosition);)t++;let i=this._last;for(;i>this._first&&Math.round(this._getItemPosition(i)[this._positionDim])>=Math.round(this._scrollPosition+this._viewDim1);)i--;(t!==this._firstVisible||i!==this._lastVisible)&&(this._firstVisible=t,this._lastVisible=i,e&&e.emit&&this._sendVisibilityChangedMessage())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Jc(a){return a==="match-gap"?1/0:parseInt(a)}function ed(a){return a==="auto"?1/0:parseInt(a)}function td(a){return a==="horizontal"?"column":"row"}function pn(a){return a==="horizontal"?"row":"column"}function id(a){return a==="horizontal"?["left","right"]:["top","bottom"]}function ad(a){return a==="horizontal"?["top","bottom"]:["left","right"]}class sd extends hn{constructor(){super(...arguments),this._itemSize={},this._gaps={},this._padding={}}_getDefaultConfig(){return Object.assign({},super._getDefaultConfig(),{itemSize:{width:"300px",height:"300px"},gap:"8px",padding:"match-gap"})}get _gap(){return this._gaps.row}get _idealSize(){return this._itemSize[Ot(this.direction)]}get _idealSize1(){return this._itemSize[Ot(this.direction)]}get _idealSize2(){return this._itemSize[un(this.direction)]}get _gap1(){return this._gaps[td(this.direction)]}get _gap2(){return this._gaps[pn(this.direction)]}get _padding1(){const e=this._padding,[t,i]=id(this.direction);return[e[t],e[i]]}get _padding2(){const e=this._padding,[t,i]=ad(this.direction);return[e[t],e[i]]}set itemSize(e){const t=this._itemSize;typeof e=="string"&&(e={width:e,height:e});const i=parseInt(e.width),s=parseInt(e.height);i!==t.width&&(t.width=i,this._triggerReflow()),s!==t.height&&(t.height=s,this._triggerReflow())}set gap(e){this._setGap(e)}_setGap(e){const t=e.split(" ").map(s=>ed(s)),i=this._gaps;t[0]!==i.row&&(i.row=t[0],this._triggerReflow()),t[1]===void 0?t[0]!==i.column&&(i.column=t[0],this._triggerReflow()):t[1]!==i.column&&(i.column=t[1],this._triggerReflow())}set padding(e){const t=this._padding,i=e.split(" ").map(s=>Jc(s));i.length===1?(t.top=t.right=t.bottom=t.left=i[0],this._triggerReflow()):i.length===2?(t.top=t.bottom=i[0],t.right=t.left=i[1],this._triggerReflow()):i.length===3?(t.top=i[0],t.right=t.left=i[1],t.bottom=i[2],this._triggerReflow()):i.length===4&&(["top","right","bottom","left"].forEach((s,r)=>t[s]=i[r]),this._triggerReflow())}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rd extends sd{constructor(){super(...arguments),this._metrics=null,this.flex=null,this.justify=null}_getDefaultConfig(){return Object.assign({},super._getDefaultConfig(),{flex:!1,justify:"start"})}set gap(e){super._setGap(e)}_updateLayout(){const e=this.justify,[t,i]=this._padding1,[s,r]=this._padding2;["_gap1","_gap2"].forEach(c=>{const u=this[c];if(u===1/0&&!["space-between","space-around","space-evenly"].includes(e))throw new Error("grid layout: gap can only be set to 'auto' when justify is set to 'space-between', 'space-around' or 'space-evenly'");if(u===1/0&&c==="_gap2")throw new Error(`grid layout: ${pn(this.direction)}-gap cannot be set to 'auto' when direction is set to ${this.direction}`)});const n=this.flex||["start","center","end"].includes(e),o={rolumns:-1,itemSize1:-1,itemSize2:-1,gap1:this._gap1===1/0?-1:this._gap1,gap2:n?this._gap2:0,padding1:{start:t===1/0?this._gap1:t,end:i===1/0?this._gap1:i},padding2:n?{start:s===1/0?this._gap2:s,end:r===1/0?this._gap2:r}:{start:0,end:0},positions:[]},l=this._viewDim2-o.padding2.start-o.padding2.end;if(l<=0)o.rolumns=0;else{const c=n?o.gap2:0;let u=0,h=0;if(l>=this._idealSize2&&(u=Math.floor((l-this._idealSize2)/(this._idealSize2+c))+1,h=u*this._idealSize2+(u-1)*c),this.flex)switch((l-h)/(this._idealSize2+c)>=.5&&(u=u+1),o.rolumns=u,o.itemSize2=Math.round((l-c*(u-1))/u),this.flex===!0?"area":this.flex.preserve){case"aspect-ratio":o.itemSize1=Math.round(this._idealSize1/this._idealSize2*o.itemSize2);break;case Ot(this.direction):o.itemSize1=Math.round(this._idealSize1);break;default:o.itemSize1=Math.round(this._idealSize1*this._idealSize2/o.itemSize2)}else o.itemSize1=this._idealSize1,o.itemSize2=this._idealSize2,o.rolumns=u;let p;if(n){const _=o.rolumns*o.itemSize2+(o.rolumns-1)*o.gap2;p=this.flex||e==="start"?o.padding2.start:e==="end"?this._viewDim2-o.padding2.end-_:Math.round(this._viewDim2/2-_/2)}else{const _=l-o.rolumns*o.itemSize2;e==="space-between"?(o.gap2=Math.round(_/(o.rolumns-1)),p=0):e==="space-around"?(o.gap2=Math.round(_/o.rolumns),p=Math.round(o.gap2/2)):(o.gap2=Math.round(_/(o.rolumns+1)),p=o.gap2),this._gap1===1/0&&(o.gap1=o.gap2,t===1/0&&(o.padding1.start=p),i===1/0&&(o.padding1.end=p))}for(let _=0;_<o.rolumns;_++)o.positions.push(p),p+=o.itemSize2+o.gap2}this._metrics=o}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nd extends rd{get _delta(){return this._metrics.itemSize1+this._metrics.gap1}_getItemSize(e){return{[this._sizeDim]:this._metrics.itemSize1,[this._secondarySizeDim]:this._metrics.itemSize2}}_getActiveItems(){const e=this._metrics,{rolumns:t}=e;if(t===0)this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;else{const{padding1:i}=e,s=Math.max(0,this._scrollPosition-this._overhang),r=Math.min(this._scrollSize,this._scrollPosition+this._viewDim1+this._overhang),n=Math.max(0,Math.floor((s-i.start)/this._delta)),o=Math.max(0,Math.ceil((r-i.start)/this._delta));this._first=n*t,this._last=Math.min(o*t-1,this.items.length-1),this._physicalMin=i.start+this._delta*n,this._physicalMax=i.start+this._delta*o}}_getItemPosition(e){const{rolumns:t,padding1:i,positions:s,itemSize1:r,itemSize2:n}=this._metrics;return{[this._positionDim]:i.start+Math.floor(e/t)*this._delta,[this._secondaryPositionDim]:s[e%t],[Ot(this.direction)]:r,[un(this.direction)]:n}}_updateScrollSize(){const{rolumns:e,gap1:t,padding1:i,itemSize1:s}=this._metrics;let r=1;if(e>0){const n=Math.ceil(this.items.length/e);r=i.start+n*s+(n-1)*t+i.end}this._scrollSize=r}}class od extends nd{constructor(e,t){super(e,t),this._columns=t?.columns||4,this.flex={preserve:"aspect-ratio"},this.justify="start";const i=t?.itemSize?.width||150,s=t?.itemSize?.height||195,r=parseInt(i)||150,n=parseInt(s)||195;this._aspectRatio=n/r,this._extraHeight=n-r}set columns(e){e!==this._columns&&(this._columns=e,this._triggerReflow())}get columns(){return this._columns}set itemSize(e){if(super.itemSize=e,e){const t=parseInt(e.width)||150,i=parseInt(e.height)||195;this._aspectRatio=i/t,this._extraHeight=i-t}}_updateLayout(){const e=this.justify,[t,i]=this._padding2,s=this.flex||["start","center","end"].includes(e),r=t===1/0?this._gap2:t,n=i===1/0?this._gap2:i,o=this._viewDim2-r-n;if(o>0){const l=s?this._gap2:0,c=(o-(this._columns-1)*l)/this._columns,u=this.direction!=="horizontal",h=this._itemSize;if(u){const p=Math.max(10,Math.floor(c));h.width=p,h.height=Math.max(10,Math.floor(p+this._extraHeight))}else{const p=Math.max(10,Math.floor(c));h.height=p,h.width=Math.max(10,Math.floor(p-this._extraHeight))}}super._updateLayout()}}const ld=a=>Object.assign({type:od},a);var cd={common:{not_found:"Entity not found.",search:"Search",power:"Power",favorite:"Favorite",loading:"Loading...",no_results:"No results.",close:"Close",vol_up:"Volume Up",vol_down:"Volume Down",media_player:"Media Player",edit_entity:"Edit Entity Settings",edit_action:"Edit Action Settings",mute:"Mute",unmute:"Unmute",seek:"Seek",volume:"Volume",play_now:"Play Now",more_options:"More Options",unavailable:"Unavailable",back:"Back",cancel:"Cancel",reset_default:"Reset to default",unpin:"Unpin",clear:"Clear",album_art:"Album Art"},editor:{tabs:{entities:"Entities",behavior:"Behavior",look_and_feel:"Look and Feel",artwork:"Artwork",actions:"Actions"},search_placeholder:"Search configuration options...",template_label:"Card Template",templates:{custom:{label:"Custom (Original Config)",description:"Your original, fully customized configuration."},large_modern:{label:"Big Ol' Modern YAMP",description:"A slightly larger modern design with adaptive controls."},crisp_clean:{label:"Clean",description:"A clean layout with scaled artwork and modern controls."},minimal_mini:{label:"MINImal",description:"A compact card with no artwork."},normal_mini:{label:"Mini Mode",description:"The standard compact card."},quick_and_easy:{label:"No Time To Explain",description:"Used for speed with persistent chip rows and quick grouping."},dedicated_search:{label:"All About That Search",description:"A standalone search card without the main media player."},dedicated_grouping:{label:"Group Therapy",description:"A standalone player grouping card. Requires multiple entities configured."},huge_yamp:{label:"That's a Huge YAMP!",description:"Maximized controls, large text, and a massive progress bar for across room viewing."}},placeholders:{search:"Search music..."},sections:{artwork:{general:{title:"General Settings",description:"Global controls for how artwork is displayed and retrieved."},background:{title:"Background Image",description:"Configure a persistent background image for the card behind playback content."},idle:{title:"Idle Artwork",description:"Show a static image or entity snapshot whenever nothing is playing."},overrides:{title:"Artwork Overrides",description:"Overrides are evaluated from top to bottom. Drag to reorder."}},entities:{title:"Entities*",description:"Add the media players you want to control. Drag entities to reorder the chip row."},behavior:{idle_chips:{title:"Idle & Chips",description:"Choose when the card goes idle and how entity chips behave."},interactions_search:{title:"Interactions & Search",description:"Fine-tune how entities are pinned and how many results show at once."},lyrics:{title:"Lyrics",description:"Configure how lyrics are displayed and when they appear."}},look_and_feel:{theme_layout:{title:"Theme & Layout",description:"Match dashboard styling and control the overall footprint."},controls_typography:{title:"Controls & Typography",description:"Tune button sizing, entity labels, and adaptive text."},collapsed_idle:{title:"Collapsed & Idle States",description:"Control when the card collapses and which views show while idle."}},actions:{title:"Actions",description:"Build the action chips that appear in the card or its menu. Drag to reorder, click the pencil to configure each action."}},subtitles:{idle_timeout:"Time in milliseconds before the card enters idle mode. Set to 0 to disable idle behavior.",show_chip_row:'"Auto" hides the chip row when only one entity is configured. "In Menu" moves the chips into the menu overlay. "In Menu on Idle" shows chips inline when active but moves them to the menu when idle.',dim_chips:"When the card enters idle mode with an image, dim the entity and action chips for a cleaner look.",hold_to_pin:"Long press on entity chips instead of short press to pin them, preventing auto-switching during playback.",always_show_group:"Quick grouping controls (+/-/star) will be visible by default on page load. You can still toggle it manually via double-tap.",disable_autofocus:"Keep the search box from stealing focus so on-screen keyboards stay hidden.",search_within_filter:"Enable this to search within the current active filter (Favorites, Recently Played, etc) instead of clearing it.",close_search_on_play:"Automatically close the search screen when a track is played.",pin_search_headers:"Keep search input and filters fixed at the top while scrolling results.",hide_search_headers_on_idle:"Hide search input and filters when the player is idle.",disable_mass:"Disable the optional Mass Queue integration even if it is installed.",swap_pause_stop:"Replace the pause button with stop while using the modern layout.",show_album:"Display the album name next to the artist in the player details.",lock_screen_controls:"Keep controls and track metadata active on your device lock screen (iOS / Android / macOS) when backgrounding the app. Note: This feature is experimental.",toggle_media_session:"Note: Lock screen and media session controls are experimental.",adaptive_controls:"Let the playback buttons grow or shrink to fit the available space.",hide_menu_player:"When chips live in the menu, hide the entity label at the bottom of the card.",hide_reorder_progress:"Hide the floating queue re-ordering progress indicator at the bottom.",adaptive_text:"Choose which text groups should scale with available space (leave empty to disable adaptive text).",collapse_expand:"Always Collapsed creates mini player mode. Expand on Search temporarily expands when searching.",disable_mini_menu:"Revert to standard lists instead of using the new mini grid menus in Always Collapsed mode.",idle_screen:"Choose which screen to display automatically when the card becomes idle.",hide_controls:"Select buttons to hide from the persistent playback controls row.",hide_remote_buttons:"Select buttons to hide from the Remote Control overlay.",hide_search_chips:"Hide specific search filter chips for this entity",hide_active_entity_on_idle:"Hide the entity label at the bottom of the card only when the player is idle.",follow_active_entity:"When enabled, the volume entity will automatically follow the active playback entity. Note: This overrides the selected volume entity.",search_limit_full:"Maximum number of search results to display (default: 20)",default_search_filter_full:"Choose which filter is active by default when the search screen opens.",default_search_favorites:"Start search with favorites active",result_sorting_full:"Choose how results are ordered.",card_height_full:"Leave blank for automatic height",control_layout_full:"Choose between the legacy evenly sized controls or the modern Home Assistant layout.",artwork_extend:"Let the artwork background continue underneath the chip and action rows.",artwork_extend_label:"Extend artwork",no_artwork_overrides:"No artwork overrides configured. Use the plus button below to add one.",missing_art_match:"Applies when the selected media provides no artwork.",idle_image_match:"Applies when the player is idle and an idle image is displaying.",entity_current_hint:"Use 'entity_id: current' to target the card's currently selected media player entity.",jinja_template_hint:"Enter a Jinja template that resolves to a single entity_id. Example switching MA based on a source selector:",jinja_template_vol_hint:"Enter a Jinja template that resolves to an entity_id (e.g. media_player.office_homepod or remote.soundbar). Example switching volume entity based on a boolean:",jinja_template_remote_hint:"Enter a Jinja template that resolves to a remote entity_id (e.g. remote.living_room_tv):",not_available_alt_collapsed:"Not available with Alternate Progress Bar or Always Collapsed mode",not_available_collapsed:"Not available when Always Collapsed is enabled",only_available_collapsed:"Only available when Always Collapsed is enabled",only_available_mini_menu:"Only available when Always Collapsed is true and Expand on Search is false",only_available_modern:"Only available with Modern layout",image_url_helper:"Enter a direct URL to an image or a local file path",selected_entity_helper:"Input text helper that will be updated with the currently selected media player entity ID.",select_entity_helper:"Input text helper to read the entity ID from. The card will automatically select the matching chip.",sync_entity_type:"Choose which entity ID to sync to the helper (defaults to Music Assistant entity if configured).",disable_auto_select:"Prevent this entity's chip from automatically being selected when it starts playing.",search_view:"Choose between a standard list or a card-based grid for search results.",search_card_columns:"Specify how many columns to use in the card view. Artwork will scale automatically.",card_type:"Choose the card mode. 'Default' is the standard media player. 'Dedicated Search' makes the card a permanent search interface.",queue_controls_style:"Choose between a drag handle or classic movement buttons for the queue.",always_show_lyrics:"Automatically open the lyrics view when the page is refreshed.",lyrics_source:"Music Assistant requires the mass_queue integration to fetch lyrics from its internal metadata engine.",lyrics_pre_roll:"Shift the lyrics highlight timing. Positive values speed it up, negative values slow it down (default: 0).",lyrics_background_fade:"Adjust the background fade and dimming opacity of the lyrics overlay (0% for transparent artwork, 100% for solid background).",blurred_artwork:"Always blur the background artwork",hide_collapsed_artwork:"Hide the smaller artwork on the right when the card is collapsed",disable_artwork_gradient:"Disable the bottom fade gradient overlay on the artwork",show_idle_artwork_when_not_playing:"When enabled, selecting a chip that is not currently playing will display the configured idle image instead of the active playback artwork.",prefer_ma_metadata:"Always use the paired Music Assistant entity for track title, artist, and artwork, even if the primary entity is playing.",show_volume_overlay:"Briefly display a large volume indicator over the artwork when the volume level changes.",font_color_helper:"Customize text and icon colors. Accepts hex, CSS names, rgba, or templates (default: theme color)."},titles:{edit_entity:"Edit Entity",edit_action:"Edit Action",service_data:"Service Data",add_artwork_override:"Add Artwork Override"},labels:{toggle_template_mode:"Toggle Template Mode",dim_chips:"Dim Chips on Idle",hold_to_pin:"Hold to Pin",always_show_group:"Quick Group by Default",disable_autofocus:"Disable Search Autofocus",keep_filters:"Keep Filters on Search",dismiss_on_play:"Dismiss search on play",pin_headers:"Pin search headers",hide_search_headers_on_idle:"Hide search headers on idle",default_search_filter:"Default Search Filter",default_search_favorites:"Default to Favorites Filter",disable_mass:"Disable Mass Queue",match_theme:"Match Theme",alt_progress:"Alternate Progress Bar",progress_bar_height:"Progress Bar Height",display_timestamps:"Display Timestamps",swap_pause_stop:"Swap Pause with Stop",show_album:"Show Album Name",lock_screen_controls:"Lock Screen Media Controls (Experimental)",adaptive_controls:"Adaptive Control Size",hide_active_entity:"Hide Active Entity Label",hide_active_entity_on_idle:"Hide Active Entity Label on Idle",collapse_on_idle:"Collapse on Idle",hide_menu_player_toggle:"Hide Menu Player",hide_reorder_progress_toggle:"Hide Re-ordering Progress",always_collapsed:"Always Collapsed",disable_mini_menu:"Disable mini grid menus",expand_on_search:"Expand on Search",script_var:"Script Variable (yamp_entity)",use_ma_template:"Use template for Music Assistant Entity",use_vol_template:"Use template for Volume Entity",follow_active_entity:"Volume Entity Follows Active Entity",use_url_path:"Use URL or Path",adaptive_text_elements:"Adaptive Text Size Elements",disable_auto_select:"Disable Auto-Select",always_show_lyrics:"Always Show Lyrics",lyrics_mode:"Lyrics Mode",lyrics_source:"Lyrics Source",lyrics_pre_roll:"Lyrics Pre-Roll (seconds)",lyrics_background_fade:"Lyrics Background Fade",blurred_artwork:"Blurred Artwork",hide_collapsed_artwork:"Hide Collapsed Artwork",disable_artwork_gradient:"Disable Artwork Gradient",show_idle_artwork_when_not_playing:"Show Idle Image When Not Playing",prefer_ma_metadata:"Prefer Music Assistant Metadata",show_volume_overlay:"Show Volume Overlay"},fields:{artwork_fit:"Artwork Fit",artwork_position:"Artwork Position",artwork_hostname:"Artwork Hostname",match_field:"Match Type",match_value:"Match Value",size_percent:"Size (%)",object_fit:"Object Fit",idle_timeout:"Idle Timeout (ms)",show_chip_row:"Show Chip Row",search_limit:"Search Results Limit",result_sorting:"Result Sorting",vol_step:"Volume Step (0.05 = 5%)",card_height:"Card Height (px)",control_layout:"Control Layout",idle_image:"Idle Image",background_image:"Background Image",background_image_entity:"Background Image Entity",font_color:"Font Color",font_color_entity:"Font Color",background_position:"Background Position",background_fit:"Background Fit",image_url:"Image URL",fallback_image_url:"Fallback Image URL",move_to_main:"Move action to main chips",move_to_menu:"Move action into menu",delete_action:"Delete Action",volume_mode:"Volume Mode",idle_screen:"Idle Screen",name:"Name",hidden_controls:"Hidden Controls",hide_remote_buttons:"Hidden Remote Buttons",ma_template:"Music Assistant Entity Template (Jinja)",hidden_chips:"Hidden Search Filter Chips",vol_template:"Volume Entity Template (Jinja)",icon:"Icon",action_type:"Action Type",menu_item:"Menu Item",nav_path:"Navigation Path",service:"Service",service_data:"Service Data",idle_image_entity:"Idle Image Entity",match_entity:"Match Entity",ma_entity:"Music Assistant Entity",vol_entity:"Volume Entity",remote_entity:"Remote Entity",remote_template:"Remote Entity Template (Jinja)",selected_entity_helper:"Selected Entity Helper",sync_entity_type:"Sync Entity Type",placement:"Placement",card_trigger:"Card Trigger",search_view:"Search Result View",search_card_columns:"Card Columns",card_type:"Card Type",queue_controls_style:"Queue Controls Style",appearance:"Appearance",no_artwork_option:"No Artwork",details_alignment:"Details Alignment",lyrics_background_fade:"Lyrics Background Fade (%)"},action_types:{menu:"Open a Card Menu Item",service:"Call a Service",navigate:"Navigate",prev_entity:"Previous Entity Chip",next_entity:"Next Entity Chip",sync_selected_entity:"Sync Selected Entity",select_entity:"Select Entity from Helper",toggle_lyrics:"Toggle Lyrics Overlay",remote_control:"Open Remote Controls Overlay",toggle_media_session:"Toggle Media Session Controls (Experimental)"},action_helpers:{sync_selected_entity:"Sync Selected Entity \u2192",select_entity:"Select Entity \u2190",select_helper:"(select helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Music Assistant Entity if configured)",yamp_main_entity:"yamp_main_entity (Main Media Player Entity)",yamp_playback_entity:"yamp_playback_entity (Current Active Playback Entity)"},placements:{chip:"Action Chip",menu:"In Menu",hidden:"Hidden (Artwork Tap)",replace_search:"Replace Search",replace_power:"Replace Power",replace_mute:"Replace Mute",replace_favorite:"Replace Favorite",not_triggerable:"Not Triggerable"},triggers:{none:"None",tap:"Tap",hold:"Hold",double_tap:"Double Tap",swipe_left:"Swipe Left",swipe_right:"Swipe Right"},search_view_options:{list:"List",card:"Card",card_minimal:"Minimal Card"},card_type_options:{default:"Default",search:"Search",group_players:"Group Players",up_next:"Up Next",remote_control:"Remote Control"},queue_controls_style_options:{drag_handle:"Drag Handle",icons:"Movement Buttons"},appearance_options:{automatic:"Automatic",light:"Light",dark:"Dark"},artwork_fit:{default:"Global",cover:"Cover",contain:"Contain",fill:"Fill","scale-down":"Scale Down","scaled-contain":"Scaled Contain","scaled-contain-alternate":"Scaled Contain Alternate",none:"None"},artwork_position:{default:"Global",top:"Top",center:"Center",bottom:"Bottom"},background_fit:{cover:"Cover",contain:"Contain",fill:"Fill","scale-down":"Scale Down",none:"None"},background_position:{center:"Center",top:"Top",bottom:"Bottom","center left":"Center Left","center right":"Center Right","top left":"Top Left","top right":"Top Right","bottom left":"Bottom Left","bottom right":"Bottom Right"}},card:{sections:{details:"Now Playing Details",menu:"Menu & Search Sheets",action_chips:"Action Chips",lyrics:"Lyrics"},media_controls:{shuffle:"Shuffle",previous:"Previous",play_pause:"Play/Pause",stop:"Stop",next:"Next",repeat:"Repeat",lock_screen_ready:"Lock screen controls active",lock_screen_connecting:"Connecting lock screen controls..."},menu:{more_info:"More Info",search:"Search",source:"Source",remote_controls:"Remote Control",show_lyrics:"Show Lyrics",hide_lyrics:"Hide Lyrics",transfer_queue:"Transfer Queue",main_menu:"Main Menu",group_players:"Group Players",up_next:"Up Next",remote_control:"Remote Control",select_entity:"Select Entity for More Info",transfer_to:"Transfer Queue To",no_players:"No other Music Assistant players available."},remote:{title:"Remote Control",up:"Up",down:"Down",left:"Left",right:"Right",select:"Select",back:"Back",menu:"Menu",home:"Home",power:"Power"},grouping:{title:"Group Players",sync_volume:"Sync Volume",group_all:"Group All",ungroup_all:"Ungroup All",unavailable:"Player is unavailable",no_players:"No other group-capable players available.",master:"Master",joined:"Joined",available:"Available",current:"Current",unjoin_from:"Unjoin from {master}",join_with:"Join with {master}"}},search:{favorites:"Favorites",recently_played:"Recently Played",next_up:"Next Up",recommendations:"Recommendations",radio_mode:"Radio Mode",show_track_options:"Show track options",play_similar:"Play similar songs",close:"Close Search",no_results:"No results.",play_next:"Play next",replace_play:"Replace existing queue and play now",replace:"Replace queue",add_queue:"Add to the end of the queue",move_up:"Move Up",move_down:"Move Down",move_next:"Move to Next",remove:"Remove from Queue",drag_to_reorder:"Drag to reorder",added:"Added to queue!",added_to_playlist:"Added to playlist!",select_playlist:"Select Playlist for '{track}'",add_to_playlist:"Add to playlist",select_track_for_playlist:"Select the track to add for '{track}' by {artist}",labels:{replace:"Replace",next:"Next",replace_next:"Replace Next",add:"Add",add_to_playlist:"Add to Playlist"},results:"results",result:"result",filters:{all:"All",artist:"Artist",album:"Album",track:"Track",playlist:"Playlist",radio:"Radio",music:"Music",station:"Station",podcast:"Podcast",audiobook:"Audiobook"},search_artist:"Browse albums by this artist",browse_artist:"Browse albums by {artist}",search_album:"Browse tracks from this album",browse_album:"Browse tracks from {album}",browse_playlist:"Browse tracks from {playlist}",play_collection:"Play this collection",play_collection_error:"Unable to play this collection directly",play_item:"Play {item}"},lyrics:{finding:"Finding Lyrics...",none_found:"No lyrics found",not_available:"Lyrics not available",instrumental:"Instrumental Track",admin_only_mass:"Music Assistant lyrics fetch is for admin users only. It is recommended to switch to lrclib in the card configuration.",fallback_to_lrclib_non_admin:"Non-admin user detected. Falling back to lrclib for lyrics fetch."},lyrics_sources:{mass_lrclib:"Music Assistant (Fallback to LRCLIB)",mass:"Music Assistant Only",lrclib:"LRCLIB Only",lrclib_mass:"LRCLIB (Fallback to Music Assistant)"},lyrics_modes:{default:"Default (Highlight & Scroll)",scroll:"Scroll Only",text:"Text Only"}},dd={common:{not_found:"Entit\xE4t nicht gefunden.",search:"Suchen",power:"Ein/Aus",favorite:"Favorit",loading:"Laden...",no_results:"Keine Ergebnisse.",close:"Schlie\xDFen",vol_up:"Lauter",vol_down:"Leiser",media_player:"Mediaplayer",edit_entity:"Entit\xE4tseinstellungen bearbeiten",edit_action:"Aktionseinstellungen bearbeiten",mute:"Stumm",unmute:"Stummschaltung aufheben",seek:"Suchen",volume:"Lautst\xE4rke",play_now:"Jetzt abspielen",more_options:"Weitere Optionen",unavailable:"Nicht verf\xFCgbar",back:"Zur\xFCck",cancel:"Abbrechen",reset_default:"Auf Standard zur\xFCcksetzen",unpin:"Entpinnen",clear:"L\xF6schen",album_art:"Album-Artwork"},editor:{tabs:{entities:"Entit\xE4ten",behavior:"Verhalten",look_and_feel:"Design",artwork:"Artwork",actions:"Aktionen"},search_placeholder:"Konfigurationsoptionen suchen...",template_label:"Karten-Vorlage",templates:{custom:{label:"Benutzerdefiniert (Originalkonfiguration)",description:"Ihre urspr\xFCngliche, vollst\xE4ndig angepasste Konfiguration."},large_modern:{label:"Gro\xDFes modernes YAMP",description:"Ein etwas gr\xF6\xDFeres, modernes Design mit adaptiver Steuerung."},crisp_clean:{label:"Klar & Aufger\xE4umt",description:"Ein klares Layout mit skaliertem Artwork und modernen Bedienelementen."},minimal_mini:{label:"MINImal",description:"Eine kompakte Karte ohne Artwork."},normal_mini:{label:"Mini Mode",description:"Die Standard-Kompaktkarte."},quick_and_easy:{label:"Keine Zeit zu erkl\xE4ren",description:"F\xFCr Schnelligkeit mit dauerhaften Chip-Zeilen und schneller Gruppierung."},dedicated_search:{label:"Alles rund um die Suche",description:"Eine eigenst\xE4ndige Suchkarte ohne den Haupt-Mediaplayer."},dedicated_grouping:{label:"Gruppentherapie",description:"Eine eigenst\xE4ndige Player-Gruppierungskarte. Erfordert mehrere konfigurierte Entit\xE4ten."},huge_yamp:{label:"Das ist ein riesiges YAMP!",description:"Maximierte Steuerelemente, gro\xDFer Text und ein massiver Fortschrittsbalken f\xFCr die Betrachtung aus der Ferne."}},placeholders:{search:"Musik suchen..."},sections:{artwork:{general:{title:"Allgemeine Einstellungen",description:"Globale Steuerung der Artwork-Anzeige und -Abrufung."},background:{title:"Hintergrundbild",description:"Konfigurieren Sie ein dauerhaftes Hintergrundbild f\xFCr die Karte hinter den Wiedergabeinhalten."},idle:{title:"Artwork im Leerlauf",description:"Zeigt ein statisches Bild oder einen Entit\xE4ts-Schnappschuss an, wenn nichts abgespielt wird."},overrides:{title:"Artwork-\xDCberschreibungen",description:"\xDCberschreibungen werden von oben nach unten ausgewertet. Zum Neusortieren ziehen."}},entities:{title:"Entit\xE4ten*",description:"F\xFCgen Sie die zu steuernden Mediaplayer hinzu. Entit\xE4ten ziehen, um sie neu anzuordnen."},behavior:{idle_chips:{title:"Leerlauf & Chips",description:"W\xE4hlen Sie, wann die Karte in den Leerlauf wechselt und wie sich Entit\xE4ts-Chips verhalten."},interactions_search:{title:"Interaktionen & Suche",description:"Feineinstellung des Anpinnens von Entit\xE4ten und der Anzahl der Suchergebnisse."},lyrics:{title:"Liedtexte",description:"Konfigurieren Sie, wie Liedtexte angezeigt werden und wann sie erscheinen."}},look_and_feel:{theme_layout:{title:"Theme & Layout",description:"Anpassung an das Dashboard-Styling und Kontrolle des Platzbedarfs."},controls_typography:{title:"Steuerung & Typografie",description:"Anpassung von Schaltfl\xE4chengr\xF6\xDFe, Entit\xE4ts-Labels und adaptivem Text."},collapsed_idle:{title:"Eingeklappte & Leerlaufzust\xE4nde",description:"Steuerung der Karteneinklappung und der Ansichten im Leerlauf."}},actions:{title:"Aktionen",description:"Erstellen Sie Aktions-Chips f\xFCr die Karte oder das Men\xFC. Ziehen zum Sortieren, Stift zum Konfigurieren anklicken."}},subtitles:{idle_timeout:"Zeit in Millisekunden vor dem Wechsel in den Leerlaufmodus. 0 zum Deaktivieren.",show_chip_row:'"Auto" blendet die Chip-Leiste bei nur einer Entit\xE4t aus. "Im Men\xFC" verschiebt sie ins Men\xFC. "Im Men\xFC bei Inaktivit\xE4t" zeigt Chips inline wenn aktiv, verschiebt sie aber ins Men\xFC bei Inaktivit\xE4t.',dim_chips:"Entit\xE4ts- und Aktions-Chips im Leerlauf mit Bild abdunkeln f\xFCr einen sauberen Look.",hold_to_pin:"Langes Dr\xFCcken statt kurzem Dr\xFCcken zum Anpinnen, um automatisches Umschalten zu verhindern.",always_show_group:"Schnellgruppierungs-Steuerelemente (+/-/Stern) sind standardm\xE4\xDFig beim Laden der Seite sichtbar. Sie k\xF6nnen sie weiterhin manuell per Doppeltipp umschalten.",disable_autofocus:"Suchfeld-Autofokus deaktivieren, damit Bildschirmtastaturen ausgeblendet bleiben.",search_within_filter:"Innerhalb des aktiven Filters suchen (Favoriten, etc.), anstatt ihn zu l\xF6schen.",close_search_on_play:"Suchbildschirm beim Abspielen automatisch schlie\xDFen.",pin_search_headers:"Sucheingabe und Filter beim Scrollen oben fixieren.",hide_search_headers_on_idle:"Sucheingabe und Filter im Leerlauf ausblenden.",disable_mass:"Optionale Mass Queue Integration deaktivieren, auch wenn sie installiert ist.",swap_pause_stop:"Pause-Taste durch Stop-Taste im modernen Layout ersetzen.",show_album:"Den Albumnamen neben dem Interpreten in den Player-Details anzeigen.",lock_screen_controls:"Halte Steuerelemente und Titel-Metadaten auf dem Sperrbildschirm deines Ger\xE4ts (iOS / Android / macOS) aktiv, wenn die App in den Hintergrund tritt. Hinweis: Diese Funktion ist experimentell.",toggle_media_session:"Hinweis: Sperrbildschirm- und Mediensitzungssteuerung sind experimentell.",adaptive_controls:"Wiedergabetasten an verf\xFCgbaren Platz anpassen.",hide_menu_player:"Entit\xE4ts-Label unten ausblenden, wenn Chips im Men\xFC sind.",hide_reorder_progress:"Die schwebende Fortschrittsanzeige f\xFCr die Warteschlangen-Neusortierung unten ausblenden.",adaptive_text:"Textgruppen w\xE4hlen, die mit dem Platz skalieren (leer lassen zum Deaktivieren).",collapse_expand:"Immer eingeklappt aktiviert den Mini-Player-Modus. Bei Suche ausklappen aktiviert ihn tempor\xE4r.",disable_mini_menu:"Kehrt zu Standardlisten zur\xFCck, anstatt die neuen Mini-Grid-Men\xFCs im Modus 'Immer eingeklappt' zu verwenden.",idle_screen:"W\xE4hlen Sie, welcher Bildschirm im Leerlauf automatisch angezeigt wird.",hide_controls:"W\xE4hlen Sie Steuerelemente aus, die f\xFCr diese Entit\xE4t ausgeblendet werden sollen.",hide_remote_buttons:"W\xE4hlen Sie die Tasten aus, die im Fernbedienungs-Overlay ausgeblendet werden sollen.",hide_search_chips:"Bestimmte Suchfilter-Chips f\xFCr diese Entit\xE4t ausblenden.",hide_active_entity_on_idle:"Blendet die Entit\xE4tsbeschriftung am unteren Rand der Karte nur aus, wenn der Player im Leerlauf ist.",follow_active_entity:"Lautst\xE4rke-Entit\xE4t folgt automatisch der aktiven Wiedergabe-Entit\xE4t.",search_limit_full:"Maximale Anzahl an Suchergebnissen (Standard: 20).",default_search_filter_full:"W\xE4hlen Sie den Filter, der beim \xD6ffnen der Suche standardm\xE4\xDFig aktiv ist.",default_search_favorites:"Suche mit aktiven Favoriten starten",result_sorting_full:"Sortierung der Suchergebnisse w\xE4hlen. Standard beh\xE4lt die Quellreihenfolge bei.",card_height_full:"Leer lassen f\xFCr automatische H\xF6he.",control_layout_full:"W\xE4hlen Sie zwischen manuellem oder modernem Home Assistant Layout.",artwork_extend:"Artwork-Hintergrund unter die Chip- und Aktionsleisten erweitern.",artwork_extend_label:"Artwork erweitern",no_artwork_overrides:"Keine Artwork-\xDCberschreibungen konfiguriert.",missing_art_match:"Wird angewendet, wenn die ausgew\xE4hlten Medien kein Cover haben.",idle_image_match:"Wird angewendet, wenn der Player inaktiv ist und ein Ruhebild angezeigt wird.",entity_current_hint:"'entity_id: current' verwenden, um den aktuell ausgew\xE4hlten Mediaplayer anzusteuern.",jinja_template_hint:"Jinja-Template eingeben, das eine entity_id ergibt.",jinja_template_vol_hint:"Jinja-Template eingeben, das eine Lautst\xE4rke-entity_id ergibt.",jinja_template_remote_hint:"Jinja-Template eingeben, das eine Remote-entity_id ergibt (z.B. remote.wohnzimmer_tv):",not_available_alt_collapsed:"Nicht verf\xFCgbar mit alternativem Fortschrittsbalken oder im Modus 'Immer eingeklappt'.",not_available_collapsed:"Nicht verf\xFCgbar, wenn 'Immer eingeklappt' aktiviert ist.",only_available_collapsed:"Nur verf\xFCgbar, wenn 'Immer eingeklappt' aktiviert ist.",only_available_mini_menu:"Nur verf\xFCgbar, wenn 'Immer eingeklappt' aktiviert und 'Bei Suche erweitern' deaktiviert ist",only_available_modern:"Nur verf\xFCgbar im modernen Layout.",image_url_helper:"Direkte Bild-URL oder lokalen Dateipfad eingeben.",selected_entity_helper:"Input-Text-Helper, der mit der aktuell ausgew\xE4hlten Mediaplayer-Entit\xE4ts-ID aktualisiert wird.",select_entity_helper:"Input-Text-Helper, aus dem die Entit\xE4ts-ID gelesen wird. Die Karte w\xE4hlt automatisch den passenden Chip aus.",sync_entity_type:"W\xE4hlen Sie, welche Entit\xE4ts-ID mit dem Helper synchronisiert werden soll (Standard: Music Assistant Entit\xE4t, falls konfiguriert).",disable_auto_select:"Verhindert, dass der Chip dieser Entit\xE4t automatisch ausgew\xE4hlt wird, wenn die Wiedergabe startet.",search_view:"W\xE4hlen Sie zwischen einer Standardliste oder einem kartenbasierten Raster f\xFCr Suchergebnisse.",search_card_columns:"Geben Sie an, wie viele Spalten in der Kartenansicht verwendet werden sollen. Das Artwork wird automatisch skaliert.",card_type:"W\xE4hlen Sie den Kartenmodus. 'Standard' ist der normale Mediaplayer. 'Dedizierte Suche' macht die Karte zu einer permanenten Suchoberfl\xE4che.",always_show_lyrics:"Liedtextansicht bei Seitenaktualisierung automatisch \xF6ffnen.",lyrics_source:"Music Assistant ben\xF6tigt die mass_queue-Integration, um Liedtexte von seiner internen Metadaten-Engine abzurufen.",lyrics_pre_roll:"Passen Sie das Timing der Songtext-Hervorhebung an. Positive Werte beschleunigen sie, negative verz\xF6gern sie (Standard: 0).",lyrics_background_fade:"Hintergrund\xFCberblendung und Dimm-Deckkraft des Liedtext-Overlays anpassen (0% f\xFCr transparentes Artwork, 100% f\xFCr durchgehenden Hintergrund).",blurred_artwork:"Hintergrundbild immer weichzeichnen",hide_collapsed_artwork:"Das kleine Artwork auf der rechten Seite ausblenden, wenn die Karte eingeklappt ist",disable_artwork_gradient:"Den unteren Farbverlauf auf dem Artwork deaktivieren",show_idle_artwork_when_not_playing:"Wenn aktiviert, wird beim Ausw\xE4hlen eines Chips, auf dem derzeit nichts abgespielt wird, das konfigurierte Ruhebild anstelle des aktiven Wiedergabe-Artworks angezeigt.",prefer_ma_metadata:"Verwenden Sie immer die gekoppelte Music Assistant-Entit\xE4t f\xFCr Titel, K\xFCnstler und Artwork, auch wenn die prim\xE4re Entit\xE4t gerade spielt.",show_volume_overlay:"Zeige kurz eine gro\xDFe Lautst\xE4rkeanzeige \xFCber dem Cover an, wenn sich die Lautst\xE4rke \xE4ndert.",font_color_helper:"Text- und Symbolfarben anpassen. Akzeptiert Hex, CSS-Namen, RGBA oder Vorlagen (Standard: Theme-Farbe).",queue_controls_style:"W\xE4hlen Sie, ob ein Ziehgriff oder einzelne Bewegungstasten f\xFCr Warteschlangenelemente angezeigt werden sollen."},titles:{edit_entity:"Entit\xE4t bearbeiten",edit_action:"Aktion bearbeiten",service_data:"Servicedaten",add_artwork_override:"Artwork-\xDCberschreibung hinzuf\xFCgen"},labels:{toggle_template_mode:"Vorlagenmodus umschalten",dim_chips:"Chips im Leerlauf abdunkeln",hold_to_pin:"Gedr\xFCckt halten zum Anpinnen",always_show_group:"Schnellgruppierung standardm\xE4\xDFig aktivieren",disable_autofocus:"Such-Autofocus deaktivieren",keep_filters:"Filter bei Suche beibehalten",dismiss_on_play:"Suche beim Abspielen beenden",pin_headers:"Such-Header fixieren",hide_search_headers_on_idle:"Such-Header im Leerlauf ausblenden",default_search_filter:"Standard-Suchfilter",default_search_favorites:"Standardm\xE4\xDFig Favoritenfilter verwenden",disable_mass:"Mass Queue deaktivieren",match_theme:"Theme anpassen",alt_progress:"Alternativer Fortschrittsbalken",progress_bar_height:"Fortschrittsbalkenh\xF6he",display_timestamps:"Zeitstempel anzeigen",swap_pause_stop:"Pause durch Stop ersetzen",show_album:"Albumname anzeigen",lock_screen_controls:"Sperrbildschirm-Mediensteuerung (Experimentell)",adaptive_controls:"Adaptive Tastengr\xF6\xDFe",hide_active_entity:"Aktives Entit\xE4ts-Label ausblenden",hide_active_entity_on_idle:"Aktive Entit\xE4tsbeschriftung im Leerlauf ausblenden",collapse_on_idle:"Bei Leerlauf einklappen",hide_menu_player_toggle:"Men\xFC-Player ausblenden",hide_reorder_progress_toggle:"Neusortierungs-Fortschritt ausblenden",always_collapsed:"Immer eingeklappt",disable_mini_menu:"Mini-Grid-Men\xFCs deaktivieren",expand_on_search:"Bei Suche ausklappen",script_var:"Skript-Variable (yamp_entity)",use_ma_template:"Template f\xFCr Music Assistant Entit\xE4t verwenden",use_vol_template:"Template f\xFCr Lautst\xE4rke-Entit\xE4t verwenden",follow_active_entity:"Lautst\xE4rke folgt aktiver Entit\xE4t",use_url_path:"URL oder Pfad verwenden",adaptive_text_elements:"Elemente f\xFCr adaptive Textgr\xF6\xDFe",disable_auto_select:"Auto-Auswahl deaktivieren",always_show_lyrics:"Liedtexte immer anzeigen",lyrics_mode:"Liedtext-Modus",lyrics_source:"Liedtext-Quelle",lyrics_pre_roll:"Liedtext Pre-Roll (Sekunden)",lyrics_background_fade:"Liedtext Hintergrund\xFCberblendung",blurred_artwork:"Verschwommenes Artwork",hide_collapsed_artwork:"Verkleinertes Artwork ausblenden",disable_artwork_gradient:"Artwork-Farbverlauf deaktivieren",show_idle_artwork_when_not_playing:"Ruhebild anzeigen, wenn nicht abgespielt wird",prefer_ma_metadata:"Music Assistant Metadaten bevorzugen",show_volume_overlay:"Lautst\xE4rke-Overlay anzeigen"},fields:{artwork_fit:"Artwork-Anpassung",artwork_position:"Artwork-Position",artwork_hostname:"Artwork-Hostname",match_field:"Match-Feld",match_value:"Match-Wert",size_percent:"Gr\xF6\xDFe (%)",object_fit:"Object-Fit",idle_timeout:"Leerlauf-Timeout (ms)",show_chip_row:"Chip-Leiste anzeigen",search_limit:"Suchlimit",result_sorting:"Ergebnissortierung",vol_step:"Lautst\xE4rke-Schritt (0.05 = 5%)",card_height:"Kartenh\xF6he (px)",control_layout:"Steuerungs-Layout",idle_image:"Ruhebild",background_image:"Hintergrundbild",background_image_entity:"Hintergrundbild-Entit\xE4t",font_color:"Schriftfarbe",font_color_entity:"Schriftfarbe",background_position:"Hintergrundposition",background_fit:"Hintergrundanpassung",image_url:"Bild-URL",fallback_image_url:"Fallback Bild-URL",move_to_main:"Aktion in Haupt-Chips verschieben",move_to_menu:"Aktion ins Men\xFC verschieben",delete_action:"Aktion l\xF6schen",volume_mode:"Lautst\xE4rke-Modus",idle_screen:"Leerlauf-Bildschirm",name:"Name",hidden_controls:"Ausgeblendete Steuerungen",hide_remote_buttons:"Ausgeblendete Fernbedienungstasten",ma_template:"Music Assistant Entit\xE4ts-Template (Jinja)",hidden_chips:"Ausgeblendete Suchfilter-Chips",vol_template:"Lautst\xE4rke-Entit\xE4ts-Template (Jinja)",icon:"Icon",action_type:"Aktionstyp",menu_item:"Men\xFCpunkt",nav_path:"Navigationspfad",service:"Dienst",service_data:"Servicedaten",idle_image_entity:"Leerlauf-Bild-Entit\xE4t",match_entity:"Match-Entit\xE4t",ma_entity:"Music Assistant Entit\xE4t",vol_entity:"Lautst\xE4rke-Entit\xE4t",remote_entity:"Fernbedienungs-Entit\xE4t",remote_template:"Fernbedienungs-Entit\xE4t Template (Jinja)",selected_entity_helper:"Ausgew\xE4hlter Entit\xE4ts-Helper",sync_entity_type:"Synchronisierungs-Entit\xE4tstyp",placement:"Platzierung",card_trigger:"Karten-Trigger",search_view:"Suchergebnis-Ansicht",search_card_columns:"Spaltenanzahl",card_type:"Kartentyp",appearance:"Erscheinungsbild",no_artwork_option:"Kein Artwork",details_alignment:"Detail-Ausrichtung",lyrics_background_fade:"Liedtext Hintergrund\xFCberblendung (%)",queue_controls_style:"Warteschlangen-Steuerungsstil"},action_types:{menu:"Kartenmen\xFCpunkt \xF6ffnen",service:"Dienst aufrufen",navigate:"Navigieren",prev_entity:"Vorheriger Entit\xE4ts-Chip",next_entity:"N\xE4chster Entit\xE4ts-Chip",sync_selected_entity:"Ausgew\xE4hlte Entit\xE4t synchronisieren",select_entity:"Entit\xE4t aus Helper ausw\xE4hlen",toggle_lyrics:"Liedtext-Overlay ein-/ausschalten",remote_control:"Fernbedienungs-Overlay \xF6ffnen",toggle_media_session:"Mediensitzung / Sperrbildschirm-Steuerung umschalten (Experimentell)"},action_helpers:{sync_selected_entity:"Entit\xE4t synchronisieren \u2192",select_entity:"Entit\xE4t ausw\xE4hlen \u2190",select_helper:"(Helper ausw\xE4hlen)"},sync_entity_options:{yamp_entity:"yamp_entity (Music Assistant Entit\xE4t, falls konfiguriert)",yamp_main_entity:"yamp_main_entity (Haupt-Mediaplayer-Entit\xE4t)",yamp_playback_entity:"yamp_playback_entity (Aktuelle aktive Wiedergabe-Entit\xE4t)"},placements:{chip:"Aktions-Chip",menu:"Im Men\xFC",hidden:"Ausgeblendet (Artwork-Tippen)",replace_search:"Suche ersetzen",replace_power:"Ein/Aus ersetzen",replace_mute:"Stummschaltung ersetzen",replace_favorite:"Favorit ersetzen",not_triggerable:"Nicht triggerbar"},triggers:{none:"Keiner",tap:"Tippen",hold:"Halten",double_tap:"Doppeltippen",swipe_left:"Nach links wischen",swipe_right:"Nach rechts wischen"},search_view_options:{list:"Liste",card:"Karte",card_minimal:"Minimal-Karte"},queue_controls_style_options:{drag_handle:"Ziehgriff",icons:"Bewegungstasten"},card_type_options:{default:"Standard",search:"Suche",group_players:"Player gruppieren",up_next:"Als N\xE4chstes",remote_control:"Fernbedienung"},appearance_options:{automatic:"Automatisch",light:"Hell",dark:"Dunkel"},artwork_fit:{default:"Global",cover:"Cover (Standard)",contain:"Einpassen",fill:"F\xFCllen","scale-down":"Verkleinern","scaled-contain":"Skaliertes Einpassen","scaled-contain-alternate":"Skaliertes Einpassen (Alternativ)",none:"Keine"},artwork_position:{default:"Global",top:"Oben",center:"Mitte",bottom:"Unten"},background_fit:{cover:"Ausf\xFCllen",contain:"Einpassen",fill:"Dehnen","scale-down":"Herunterskalieren",none:"Keine"},background_position:{center:"Mitte",top:"Oben",bottom:"Unten","center left":"Mitte links","center right":"Mitte rechts","top left":"Oben links","top right":"Oben rechts","bottom left":"Unten links","bottom right":"Unten rechts"}},card:{sections:{details:"Details zur Wiedergabe",menu:"Men\xFC & Suchbl\xE4tter",action_chips:"Aktions-Chips",lyrics:"Songtext"},media_controls:{shuffle:"Zufall",previous:"Zur\xFCck",play_pause:"Play/Pause",stop:"Stop",next:"Weiter",repeat:"Wiederholen",lock_screen_ready:"Sperrbildschirm-Steuerung aktiv",lock_screen_connecting:"Sperrbildschirm-Steuerung wird verbunden..."},menu:{more_info:"Mehr Info",search:"Suche",source:"Quelle",remote_controls:"Fernbedienung",show_lyrics:"Songtext anzeigen",hide_lyrics:"Songtext ausblenden",transfer_queue:"Warteschlange \xFCbertragen",main_menu:"Hauptmen\xFC",group_players:"Player gruppieren",up_next:"Als N\xE4chstes",remote_control:"Fernbedienung",select_entity:"Entit\xE4t f\xFCr mehr Info w\xE4hlen",transfer_to:"Warteschlange \xFCbertragen zu",no_players:"Keine anderen Music Assistant Player verf\xFCgbar."},remote:{title:"Fernbedienung",up:"Nach oben",down:"Nach unten",left:"Nach links",right:"Nach rechts",select:"Ausw\xE4hlen",back:"Zur\xFCck",menu:"Men\xFC",home:"Startseite",power:"Ein/Aus"},grouping:{title:"Player gruppieren",sync_volume:"Lautst\xE4rke synchronisieren",group_all:"Alle gruppieren",ungroup_all:"Alle trennen",unavailable:"Player ist nicht verf\xFCgbar",no_players:"Keine anderen gruppierungsf\xE4higen Player verf\xFCgbar.",master:"Master",joined:"Verbunden",available:"Verf\xFCgbar",current:"Aktuell",unjoin_from:"Von {master} trennen",join_with:"Mit {master} gruppieren"}},search:{favorites:"Favoriten",recently_played:"Zuletzt geh\xF6rt",next_up:"Als N\xE4chstes",recommendations:"Empfehlungen",radio_mode:"Radiomodus",show_track_options:"Titeloptionen anzeigen",play_similar:"\xC4hnliche Lieder abspielen",close:"Suche schlie\xDFen",no_results:"Keine Ergebnisse.",play_next:"Als N\xE4chstes spielen",replace_play:"Warteschlange ersetzen und jetzt spielen",replace:"Warteschlange ersetzen",add_queue:"Am Ende der Warteschlange hinzuf\xFCgen",move_up:"Nach oben",move_down:"Nach unten",move_next:"Als N\xE4chstes verschieben",remove:"Aus Warteschlange entfernen",drag_to_reorder:"Ziehen zum Sortieren",added:"Zur Warteschlange hinzugef\xFCgt!",added_to_playlist:"Zur Playlist hinzugef\xFCgt!",select_playlist:"Playlist f\xFCr '{track}' ausw\xE4hlen",add_to_playlist:"Zur Playlist hinzuf\xFCgen",select_track_for_playlist:"Titel zum Hinzuf\xFCgen f\xFCr '{track}' von {artist} ausw\xE4hlen",labels:{replace:"Ersetzen",next:"Weiter",replace_next:"Weiter ersetzen",add:"Hinzuf\xFCgen",add_to_playlist:"Zur Playlist hinzuf\xFCgen"},results:"Ergebnisse",result:"Ergebnis",filters:{all:"Alle",artist:"K\xFCnstler",album:"Album",track:"Titel",playlist:"Playlist",radio:"Radio",music:"Musik",station:"Station",podcast:"Podcast",audiobook:"H\xF6rbuch"},search_artist:"Alben dieses K\xFCnstlers durchsuchen",browse_artist:"Alben von {artist} durchsuchen",search_album:"Titel von diesem Album durchsuchen",browse_album:"Albentitel von {album} durchsuchen",browse_playlist:"Titel von {playlist} durchsuchen",play_collection:"Diese Sammlung abspielen",play_collection_error:"Diese Sammlung kann nicht direkt abgespielt werden",play_item:"{item} abspielen"},lyrics:{finding:"Suche Songtext...",none_found:"Kein Songtext gefunden",not_available:"Songtext nicht verf\xFCgbar",instrumental:"Instrumental-Titel",admin_only_mass:"Das Abrufen von Songtexten \xFCber Music Assistant ist nur f\xFCr Administratoren verf\xFCgbar. Es wird empfohlen, in der Kartenkonfiguration auf lrclib zu wechseln.",fallback_to_lrclib_non_admin:"Kein Administratorbenutzer erkannt. R\xFCckgriff auf lrclib f\xFCr den Abruf von Songtexten."},lyrics_sources:{mass_lrclib:"Music Assistant (Fallback zu LRCLIB)",mass:"Nur Music Assistant",lrclib:"Nur LRCLIB",lrclib_mass:"LRCLIB (Fallback zu Music Assistant)"},lyrics_modes:{default:"Standard (Hervorheben & Scrollen)",scroll:"Nur Scrollen",text:"Nur Text"}},ud={common:{not_found:"Entidad no encontrada.",search:"Buscar",power:"Encender/Apagar",favorite:"Favorito",loading:"Cargando...",no_results:"Sin resultados.",close:"Cerrar",vol_up:"Subir volumen",vol_down:"Bajar volumen",media_player:"Reproductor multimedia",edit_entity:"Editar ajustes de entidad",edit_action:"Editar ajustes de acci\xF3n",mute:"Silenciar",unmute:"Activar sonido",seek:"Buscar",volume:"Volumen",play_now:"Reproducir ahora",more_options:"M\xE1s opciones",unavailable:"No disponible",back:"Atr\xE1s",cancel:"Cancelar",reset_default:"Restablecer valores",unpin:"Desanclar",clear:"Limpiar",album_art:"Portada del \xE1lbum"},editor:{tabs:{entities:"Entidades",behavior:"Comportamiento",look_and_feel:"Apariencia",artwork:"Portada",actions:"Acciones"},search_placeholder:"Buscar opciones de configuraci\xF3n...",template_label:"Plantilla de tarjeta",templates:{custom:{label:"Personalizado (Configuraci\xF3n original)",description:"Tu configuraci\xF3n original totalmente personalizada."},large_modern:{label:"YAMP moderno y grande",description:"Un dise\xF1o moderno ligeramente m\xE1s grande con controles adaptables."},crisp_clean:{label:"Limpio",description:"Un dise\xF1o limpio con portada escalada y controles modernos."},minimal_mini:{label:"MINImal",description:"Una tarjeta compacta sin car\xE1tula."},normal_mini:{label:"Mini Mode",description:"La tarjeta compacta est\xE1ndar."},quick_and_easy:{label:"Sin tiempo que perder",description:"Dise\xF1ado para rapidez con filas de chips persistentes y agrupaci\xF3n r\xE1pida."},dedicated_search:{label:"Todo sobre la b\xFAsqueda",description:"Una tarjeta de b\xFAsqueda independiente sin el reproductor multimedia principal."},dedicated_grouping:{label:"Terapia de grupo",description:"Una tarjeta de agrupaci\xF3n de reproductores independiente. Requiere m\xFAltiples entidades configuradas."},huge_yamp:{label:"\xA1Vaya pedazo de YAMP!",description:"Controles maximizados, texto grande y una barra de progreso enorme para ver desde lejos."}},placeholders:{search:"Buscar m\xFAsica..."},sections:{artwork:{general:{title:"Ajustes generales",description:"Controles globales para la portada."},background:{title:"Imagen de fondo",description:"Configura una imagen de fondo persistente para la tarjeta detr\xE1s del contenido de reproducci\xF3n."},idle:{title:"Portada en reposo",description:"Mostrar imagen est\xE1tica cuando nada se reproduce."},overrides:{title:"Reemplazos de portada",description:"Los reemplazos se eval\xFAan de arriba a abajo. Arrastre para reordenar."}},entities:{title:"Entidades*",description:"A\xF1ada los reproductores multimedia. Arrastre para reordenar."},behavior:{idle_chips:{title:"Reposo y chips",description:"Elija cu\xE1ndo pasa a reposo y el comportamiento de los chips."},interactions_search:{title:"Interacciones y b\xFAsqueda",description:"Ajuste el fijado de entidades y l\xEDmite de resultados."},lyrics:{title:"Letras",description:"Configure c\xF3mo se muestran las letras y cu\xE1ndo aparecen."}},look_and_feel:{theme_layout:{title:"Tema y dise\xF1o",description:"Combine con el estilo de su dashboard."},controls_typography:{title:"Controles y tipograf\xEDa",description:"Ajuste tama\xF1o de botones y etiquetas."},collapsed_idle:{title:"Estados de reposo y contra\xEDdo",description:"Controle el contra\xEDdo de la tarjeta."}},actions:{title:"Acciones",description:"Cree chips de acci\xF3n. Arrastre para reordenar, pulse el l\xE1piz para configurar."}},subtitles:{idle_timeout:"Tiempo antes de reposo (ms). 0 para desactivar.",show_chip_row:'"Auto" oculta la fila si solo hay una entidad. "En men\xFA" mueve los chips. "En men\xFA en reposo" muestra los chips en l\xEDnea cuando est\xE1 activo pero los mueve al men\xFA cuando est\xE1 en reposo.',dim_chips:"Atenuar los chips en reposo para un aspecto m\xE1s limpio.",hold_to_pin:"Mantener pulsado para fijar en vez de pulsaci\xF3n corta.",always_show_group:"Los controles de agrupaci\xF3n r\xE1pida (+/-/estrella) estar\xE1n visibles por defecto al cargar la p\xE1gina. Todav\xEDa puedes cambiarlos manualmente mediante doble pulsaci\xF3n.",disable_autofocus:"Evitar que la b\xFAsqueda tome el foco autom\xE1ticamente.",search_within_filter:"Buscar dentro del filtro activo (Favoritos, etc.).",close_search_on_play:"Cerrar b\xFAsqueda al reproducir.",pin_search_headers:"Fijar encabezados de b\xFAsqueda al hacer scroll.",hide_search_headers_on_idle:"Ocultar encabezados de b\xFAsqueda en inactividad.",disable_mass:"Desactivar integraci\xF3n con Mass Queue.",swap_pause_stop:"Cambiar pausa por stop en dise\xF1o moderno.",show_album:"Mostrar el nombre del \xE1lbum junto al artista en los detalles del reproductor.",lock_screen_controls:"Mant\xE9n los controles y los metadatos de la pista activos en la pantalla de bloqueo de tu dispositivo (iOS / Android / macOS) cuando la aplicaci\xF3n est\xE9 en segundo plano. Nota: Esta funci\xF3n es experimental.",toggle_media_session:"Nota: Los controles de pantalla de bloqueo y sesi\xF3n multimedia son experimentales.",adaptive_controls:"Permitir que los botones se adapten al espacio.",hide_menu_player:"Ocultar nombre de entidad cuando est\xE1 en el men\xFA.",hide_reorder_progress:"Ocultar el indicador flotante de progreso de reordenaci\xF3n de la cola en la parte inferior.",adaptive_text:"Elegir qu\xE9 textos se adaptan al espacio.",collapse_expand:"Siempre contra\xEDdo activa el modo mini. Expandir al buscar expande temporalmente.",disable_mini_menu:"Vuelve a las listas est\xE1ndar en lugar de usar los nuevos men\xFAs de cuadr\xEDcula mini en el modo 'Siempre contra\xEDdo'.",idle_screen:"Elegir pantalla a mostrar en reposo.",hide_controls:"Seleccionar controles a ocultar.",hide_remote_buttons:"Seleccione botones para ocultar de la superposici\xF3n del mando a distancia.",hide_search_chips:"Ocultar chips de filtro de b\xFAsqueda.",hide_active_entity_on_idle:"Oculta la etiqueta de la entidad en la parte inferior de la tarjeta solo cuando el reproductor est\xE1 inactivo.",follow_active_entity:"La entidad de volumen seguir\xE1 a la activa.",search_limit_full:"M\xE1ximo de resultados (defecto: 20).",default_search_filter_full:"Elige qu\xE9 filtro est\xE1 activo por defecto cuando se abre la pantalla de b\xFAsqueda.",default_search_favorites:"Iniciar b\xFAsqueda con favoritos activos",result_sorting_full:"Elegir orden de resultados.",card_height_full:"Dejar vac\xEDo para altura autom\xE1tica.",control_layout_full:"Elegir entre dise\xF1o antiguo o moderno.",artwork_extend:"Extender portada bajo los chips.",artwork_extend_label:"Extender portada",no_artwork_overrides:"Sin reemplazos de portada configurados.",missing_art_match:"Se aplica cuando el medio seleccionado no proporciona car\xE1tula.",idle_image_match:"Se aplica cuando el reproductor est\xE1 inactivo y se muestra una imagen de reposo.",entity_current_hint:"Use 'entity_id: current' para el reproductor actual.",jinja_template_hint:"Plantilla Jinja para entity_id.",jinja_template_vol_hint:"Plantilla para entidad de volumen.",jinja_template_remote_hint:"Plantilla Jinja que resuelve un entity_id remoto (p.ej. remote.salon_tv):",not_available_alt_collapsed:"No disponible en modo contra\xEDdo.",not_available_collapsed:"No disponible si est\xE1 contra\xEDdo.",only_available_collapsed:"Solo disponible si est\xE1 contra\xEDdo.",only_available_mini_menu:"Solo disponible cuando 'Siempre contra\xEDdo' es verdadero y 'Expandir en la b\xFAsqueda' es falso",only_available_modern:"Solo disponible con dise\xF1o Moderno.",image_url_helper:"Ingrese una URL directa a una imagen o una ruta de archivo local",selected_entity_helper:"Helper de texto de entrada que se actualizar\xE1 con el ID de la entidad del reproductor de medios seleccionado actualmente.",select_entity_helper:"Helper de texto de entrada del que leer el ID de la entidad. La tarjeta seleccionar\xE1 autom\xE1ticamente el chip correspondiente.",sync_entity_type:"Elija qu\xE9 ID de entidad sincronizar con el helper (por defecto la entidad de Music Assistant si est\xE1 configurada).",disable_auto_select:"Evita que el chip de esta entidad se seleccione autom\xE1ticamente cuando comienza la reproducci\xF3n.",search_view:"Elegir entre una lista est\xE1ndar o una cuadr\xEDcula de tarjetas para los resultados de la b\xFAsqueda.",search_card_columns:"Especifica cu\xE1ntas columnas usar en la vista de tarjetas. El artwork se adaptar\xE1 autom\xE1ticamente.",card_type:"Elija el modo de tarjeta. 'Por defecto' es el reproductor de medios est\xE1ndar. 'B\xFAsqueda dedicada' convierte la tarjeta en una interfaz de b\xFAsqueda permanente.",always_show_lyrics:"Abrir autom\xE1ticamente la vista de letras al actualizar la p\xE1gina.",lyrics_source:"Music Assistant requiere la integraci\xF3n de mass_queue para obtener las letras de su motor de metadatos interno.",lyrics_pre_roll:"Ajusta el tiempo de resaltado de la letra. Los valores positivos lo aceleran, los negativos lo retrasan (por defecto: 0).",lyrics_background_fade:"Ajustar el desvanecimiento de fondo y la opacidad de atenuaci\xF3n de la superposici\xF3n de letras (0% para arte transparente, 100% para fondo s\xF3lido).",blurred_artwork:"Difuminar siempre la imagen de fondo",hide_collapsed_artwork:"Ocultar la imagen peque\xF1a a la derecha cuando la tarjeta est\xE9 contra\xEDda",disable_artwork_gradient:"Desactivar el degradado inferior superpuesto en la portada",show_idle_artwork_when_not_playing:"Cuando est\xE1 habilitado, al seleccionar una ficha que no se est\xE1 reproduciendo actualmente, se mostrar\xE1 la imagen de inactividad configurada en lugar de la car\xE1tula de reproducci\xF3n activa.",prefer_ma_metadata:"Utilizar siempre la entidad de Music Assistant emparejada para el t\xEDtulo de la pista, el artista y el arte, incluso si la entidad primaria est\xE1 reproduciendo.",show_volume_overlay:"Muestra brevemente un indicador de volumen grande sobre la car\xE1tula cuando cambia el nivel de volumen.",font_color_helper:"Personaliza los colores del texto y los iconos. Acepta hex, nombres CSS, rgba o plantillas (predeterminado: color del tema).",queue_controls_style:"Elige si mostrar un tirador de arrastre o botones de movimento individuales para los elementos de la cola."},titles:{edit_entity:"Editar entidad",edit_action:"Editar acci\xF3n",service_data:"Datos del servicio",add_artwork_override:"A\xF1adir reemplazo"},labels:{toggle_template_mode:"Alternar modo de plantilla",dim_chips:"Atenuar chips en reposo",hold_to_pin:"Mantener para fijar",always_show_group:"Grupo r\xE1pido por defecto",disable_autofocus:"Desactivar autofoco",keep_filters:"Mantener filtros",dismiss_on_play:"Cerrar al reproducir",pin_headers:"Fijar encabezados",hide_search_headers_on_idle:"Ocultar encabezados en inactividad",default_search_filter:"Filtro de b\xFAsqueda predeterminado",default_search_favorites:"Filtro de favoritos por defecto",disable_mass:"Desactivar Mass Queue",match_theme:"Seguir tema",alt_progress:"Barra de progreso alternativa",progress_bar_height:"Altura de la barra de progreso",display_timestamps:"Mostrar sellos de tiempo",swap_pause_stop:"Cambiar Pausa por Stop",show_album:"Mostrar nombre del \xE1lbum",lock_screen_controls:"Controles multimedia en la pantalla de bloqueo (Experimental)",adaptive_controls:"Tama\xF1o adaptativo",hide_active_entity:"Ocultar nombre de entidad activa",hide_active_entity_on_idle:"Ocultar etiqueta de entidad activa al estar inactivo",collapse_on_idle:"Contraer en reposo",hide_menu_player_toggle:"Ocultar reproductor del men\xFA",hide_reorder_progress_toggle:"Ocultar progreso de reordenaci\xF3n",always_collapsed:"Siempre contra\xEDdo",disable_mini_menu:"Desactivar men\xFAs de cuadr\xEDcula mini",expand_on_search:"Expandir al buscar",script_var:"Variable script (yamp_entity)",use_ma_template:"Usar plantilla MA",use_vol_template:"Usar plantilla Volumen",follow_active_entity:"Volumen sigue a entidad activa",use_url_path:"Usar URL o ruta",adaptive_text_elements:"Elementos para tama\xF1o de texto adaptativo",disable_auto_select:"Desactivar selecci\xF3n autom\xE1tica",always_show_lyrics:"Mostrar siempre las letras",lyrics_mode:"Modo de letras",lyrics_source:"Fuente de letras",lyrics_pre_roll:"Anticipo de letra (segundos)",lyrics_background_fade:"Desvanecimiento de fondo de letras",blurred_artwork:"Imagen difuminada",hide_collapsed_artwork:"Ocultar imagen reducida",disable_artwork_gradient:"Desactivar degradado de portada",show_idle_artwork_when_not_playing:"Mostrar imagen de inactividad cuando no se reproduce",prefer_ma_metadata:"Preferir metadatos de Music Assistant",show_volume_overlay:"Mostrar superposici\xF3n de volumen"},fields:{artwork_fit:"Ajuste",artwork_position:"Posici\xF3n",artwork_hostname:"Host",match_field:"Campo",match_value:"Valor",size_percent:"Tama\xF1o (%)",object_fit:"Object Fit",idle_timeout:"Reposo (ms)",show_chip_row:"Mostrar chips",search_limit:"L\xEDmite de b\xFAsqueda",result_sorting:"Orden",vol_step:"Paso de volumen",card_height:"Altura (px)",control_layout:"Dise\xF1o",idle_image:"Imagen de reposo",background_image:"Imagen de fondo",background_image_entity:"Entidad de imagen de fondo",font_color:"Color de fuente",font_color_entity:"Color de fuente",background_position:"Posici\xF3n del fondo",background_fit:"Ajuste del fondo",image_url:"URL imagen",fallback_image_url:"URL de respaldo",move_to_main:"Mover a chips principales",move_to_menu:"Mover al men\xFA",delete_action:"Borrar acci\xF3n",volume_mode:"Modo volumen",idle_screen:"Pantalla reposo",name:"Nombre",hidden_controls:"Controles ocultos",hide_remote_buttons:"Botones del mando a distancia ocultos",ma_template:"Plantilla MA (Jinja)",hidden_chips:"Chips ocultos",vol_template:"Plantilla Volumen (Jinja)",icon:"Icono",action_type:"Tipo de acci\xF3n",menu_item:"Elemento de men\xFA",nav_path:"Ruta",service:"Servicio",service_data:"Datos",idle_image_entity:"Entidad imagen reposo",match_entity:"Entidad",ma_entity:"Entidad de Music Assistant",vol_entity:"Entidad de volumen",remote_entity:"Entidad de control remoto",remote_template:"Plantilla de entidad remota (Jinja)",selected_entity_helper:"Helper de entidad seleccionada",sync_entity_type:"Tipo de entidad a sincronizar",placement:"Colocaci\xF3n",card_trigger:"Activador de la tarjeta",search_view:"Vista de resultados de b\xFAsqueda",search_card_columns:"Columnas de tarjetas",card_type:"Tipo de tarjeta",appearance:"Apariencia",no_artwork_option:"Sin imagen",details_alignment:"Alineaci\xF3n de detalles",lyrics_background_fade:"Desvanecimiento de fondo de letras (%)",queue_controls_style:"Estilo de controles de cola"},action_types:{menu:"Abrir un elemento del men\xFA",service:"Llamar a un servicio",navigate:"Navegar",prev_entity:"Chip de entidad anterior",next_entity:"Chip de entidad siguiente",sync_selected_entity:"Sincronizar entidad seleccionada",select_entity:"Seleccionar entidad desde helper",toggle_lyrics:"Alternar superposici\xF3n de letras",remote_control:"Abrir superposici\xF3n de mando a distancia",toggle_media_session:"Alternar controles de sesi\xF3n de medios / pantalla de bloqueo (Experimental)"},action_helpers:{sync_selected_entity:"Sincronizar entidad seleccionada \u2192",select_entity:"Seleccionar entidad \u2190",select_helper:"(seleccionar helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entidad de Music Assistant si est\xE1 configurada)",yamp_main_entity:"yamp_main_entity (Entidad principal del reproductor)",yamp_playback_entity:"yamp_playback_entity (Entidad de reproducci\xF3n activa actual)"},placements:{chip:"Chip de acci\xF3n",menu:"En el men\xFA",hidden:"Oculto (Toque en el arte)",replace_search:"Reemplazar B\xFAsqueda",replace_power:"Reemplazar Encendido",replace_mute:"Reemplazar Silencio",replace_favorite:"Reemplazar Favorito",not_triggerable:"No activable"},triggers:{none:"Ninguno",tap:"Toque",hold:"Mantener",double_tap:"Doble toque",swipe_left:"Deslizar a la izquierda",swipe_right:"Deslizar a la derecha"},search_view_options:{list:"Lista",card:"Tarjeta",card_minimal:"Tarjeta reducida"},queue_controls_style_options:{drag_handle:"Tirador de arrastre",icons:"Botones de movimiento"},card_type_options:{default:"Por defecto",search:"Buscar",group_players:"Agrupar",up_next:"A continuaci\xF3n",remote_control:"Control remoto"},appearance_options:{automatic:"Autom\xE1tico",light:"Claro",dark:"Oscuro"},artwork_fit:{default:"Global",cover:"Portada (por defecto)",contain:"Contener",fill:"Rellenar","scale-down":"Reducir","scaled-contain":"Contenido escalado","scaled-contain-alternate":"Contenido escalado alternativo",none:"Ninguno"},artwork_position:{default:"Global",top:"Arriba",center:"Centro",bottom:"Abajo"},background_fit:{cover:"Cubrir",contain:"Contener",fill:"Rellenar","scale-down":"Reducir escala",none:"Ninguno"},background_position:{center:"Centro",top:"Arriba",bottom:"Abajo","center left":"Centro izquierda","center right":"Centro derecha","top left":"Arriba izquierda","top right":"Arriba derecha","bottom left":"Abajo izquierda","bottom right":"Abajo derecha"}},card:{sections:{details:"Detalles de reproducci\xF3n",menu:"Men\xFA y B\xFAsqueda",action_chips:"Chips de acci\xF3n",lyrics:"Letra"},media_controls:{shuffle:"Aleatorio",previous:"Anterior",play_pause:"Reproducir/Pausa",stop:"Detener",next:"Siguiente",repeat:"Repetir",lock_screen_ready:"Controles de pantalla de bloqueo activos",lock_screen_connecting:"Conectando controles de pantalla de bloqueo..."},menu:{more_info:"M\xE1s info",search:"Buscar",source:"Fuente",remote_controls:"Mando a distancia",show_lyrics:"Mostrar letra",hide_lyrics:"Ocultar letra",transfer_queue:"Transferir cola",main_menu:"Men\xFA Principal",group_players:"Agrupar",up_next:"A continuaci\xF3n",remote_control:"Control remoto",select_entity:"Seleccionar",transfer_to:"Transferir a",no_players:"Sin reproductores MA."},remote:{title:"Mando a distancia",up:"Arriba",down:"Abajo",left:"Izquierda",right:"Derecha",select:"Seleccionar",back:"Atr\xE1s",menu:"Men\xFA",home:"Inicio",power:"Encendido"},grouping:{title:"Agrupar",sync_volume:"Sincronizar volumen",group_all:"Agrupar todos",ungroup_all:"Desagrupar todos",unavailable:"No disponible",no_players:"No agrupable.",master:"Maestro",joined:"Unido",available:"Disponible",current:"Actual",unjoin_from:"Desvincular de {master}",join_with:"Unirse a {master}"}},search:{favorites:"Favoritos",recently_played:"Reciente",next_up:"A continuaci\xF3n",recommendations:"Recomendaciones",radio_mode:"Modo Radio",show_track_options:"Mostrar opciones de canci\xF3n",play_similar:"Reproducir canciones similares",close:"Cerrar",no_results:"Sin resultados.",play_next:"Reprod. siguiente",replace_play:"Reemplazar y reproducir",replace:"Reemplazar cola",add_queue:"A\xF1adir al final",move_up:"Subir",move_down:"Bajar",move_next:"Pasar a siguiente",remove:"Quitar de cola",drag_to_reorder:"Arrastrar para reordenar",added:"\xA1A\xF1adido!",added_to_playlist:"\xA1A\xF1adido a la lista de reproducci\xF3n!",select_playlist:"Seleccionar lista de reproducci\xF3n para '{track}'",add_to_playlist:"A\xF1adir a la lista de reproducci\xF3n",select_track_for_playlist:"Seleccionar la canci\xF3n a a\xF1adir para '{track}' de {artist}",labels:{replace:"Remplazar",next:"Siguiente",replace_next:"Rempl. Sig.",add:"A\xF1adir",add_to_playlist:"A\xF1adir a la lista de reproducci\xF3n"},results:"resultados",result:"resultado",filters:{all:"Todo",artist:"Artista",album:"\xC1lbum",track:"Canci\xF3n",playlist:"Lista",radio:"Radio",music:"M\xFAsica",station:"Emisora",podcast:"P\xF3dcast",audiobook:"Audiolibro"},search_artist:"Explorar \xE1lbumes de este artista",browse_artist:"Explorar \xE1lbumes de {artist}",search_album:"Explorar pistas de este \xE1lbum",browse_album:"Explorar pistas de {album}",browse_playlist:"Explorar pistas de {playlist}",play_collection:"Reproducir esta colecci\xF3n",play_collection_error:"No se puede reproducir esta colecci\xF3n directamente",play_item:"Reproducir {item}"},lyrics:{finding:"Buscando letra...",none_found:"No se encontr\xF3 letra",not_available:"Letra no disponible",instrumental:"Pista instrumental",admin_only_mass:"La obtenci\xF3n de letras de Music Assistant es solo para usuarios administradores. Se recomienda cambiar a lrclib en la configuraci\xF3n de la tarjeta.",fallback_to_lrclib_non_admin:"Usuario no administrador detectado. Se utilizar\xE1 lrclib como respaldo para obtener las letras."},lyrics_sources:{mass_lrclib:"Music Assistant (Respaldo en LRCLIB)",mass:"Solo Music Assistant",lrclib:"Solo LRCLIB",lrclib_mass:"LRCLIB (Respaldo en Music Assistant)"},lyrics_modes:{default:"Predeterminado (Resaltar y desplazarse)",scroll:"Solo desplazarse",text:"Solo texto"}},hd={common:{not_found:"Entit\xE9 non trouv\xE9e.",search:"Rechercher",power:"Alimentation",favorite:"Favori",loading:"Chargement...",no_results:"Aucun r\xE9sultat.",close:"Fermer",vol_up:"Monter le volume",vol_down:"Baisser le volume",media_player:"Lecteur Multim\xE9dia",edit_entity:"Modifier les param\xE8tres de l'entit\xE9",edit_action:"Modifier les param\xE8tres de l'action",mute:"Muet",unmute:"R\xE9tablir le son",seek:"Rechercher",volume:"Volume",play_now:"Lire maintenant",more_options:"Plus d'options",unavailable:"Indisponible",back:"Retour",cancel:"Annuler",reset_default:"R\xE9initialiser",unpin:"D\xE9s\xE9pingler",clear:"Effacer",album_art:"Illustration de l'album"},editor:{tabs:{entities:"Entit\xE9s",behavior:"Comportement",look_and_feel:"Apparence",artwork:"Illustrations",actions:"Actions"},search_placeholder:"Rechercher des options de configuration...",template_label:"Mod\xE8le de carte",templates:{custom:{label:"Personnalis\xE9 (Configuration d'origine)",description:"Votre configuration d'origine enti\xE8rement personnalis\xE9e."},large_modern:{label:"Grand YAMP moderne",description:"Un design moderne l\xE9g\xE8rement plus grand avec des contr\xF4les adaptatifs."},crisp_clean:{label:"\xC9pur\xE9",description:"Une disposition \xE9pur\xE9e avec pochette mise \xE0 l'\xE9chelle et contr\xF4les modernes."},minimal_mini:{label:"MINImal",description:"Une carte compacte sans pochette."},normal_mini:{label:"Mini Mode",description:"La carte compacte standard."},quick_and_easy:{label:"Pas le temps d'expliquer",description:"Con\xE7u pour la rapidit\xE9 avec des rang\xE9es de puces persistantes et un regroupement rapide."},dedicated_search:{label:"Tout sur la recherche",description:"Une carte de recherche autonome sans le lecteur multim\xE9dia principal."},dedicated_grouping:{label:"Th\xE9rapie de groupe",description:"Une carte autonome de regroupement de lecteurs. N\xE9cessite plusieurs entit\xE9s configur\xE9es."},huge_yamp:{label:"C'est un \xE9norme YAMP !",description:"Contr\xF4les maximis\xE9s, grand texte et barre de progression imposante pour une visibilit\xE9 \xE0 distance."}},placeholders:{search:"Rechercher de la musique..."},sections:{artwork:{general:{title:"Param\xE8tres G\xE9n\xE9raux",description:"Contr\xF4les globaux pour l'affichage des illustrations."},background:{title:"Image d'arri\xE8re-plan",description:"Configurez une image d'arri\xE8re-plan persistante pour la carte derri\xE8re le contenu en cours de lecture."},idle:{title:"Illustration au Repos",description:"Afficher une image statique lorsque rien n'est en lecture."},overrides:{title:"Remplacements d'Illustrations",description:"Les remplacements sont \xE9valu\xE9s de haut en bas. Glissez pour r\xE9ordonner."}},entities:{title:"Entit\xE9s*",description:"Ajoutez les lecteurs multim\xE9dias que vous souhaitez contr\xF4ler. Glissez pour r\xE9ordonner."},behavior:{idle_chips:{title:"Veille & Jetons",description:"Choisissez quand la carte passe en mode veille et comment les jetons se comportent."},interactions_search:{title:"Interactions & Recherche",description:"Affinez la fa\xE7on dont les entit\xE9s sont \xE9pingl\xE9es et le nombre de r\xE9sultats."},lyrics:{title:"Paroles",description:"Configurez la fa\xE7on dont les paroles sont affich\xE9es et quand elles apparaissent."}},look_and_feel:{theme_layout:{title:"Th\xE8me & Mise en page",description:"Adaptez au style de votre tableau de bord et contr\xF4lez l'empreinte globale."},controls_typography:{title:"Commandes & Typographie",description:"Ajustez la taille des boutons, les \xE9tiquettes et le texte adaptatif."},collapsed_idle:{title:"\xC9tats R\xE9duits & Veille",description:"Contr\xF4lez quand la carte se r\xE9duit et quelles vues s'affichent en veille."}},actions:{title:"Actions",description:"Cr\xE9ez les jetons d'action. Glissez pour r\xE9ordonner, cliquez sur le crayon pour configurer."}},subtitles:{idle_timeout:"Temps en millisecondes avant la mise en veille. 0 pour d\xE9sactiver.",show_chip_row:'"Auto" masque la barre de jetons si une seule entit\xE9 est configur\xE9e. "Dans le Menu" d\xE9place les jetons. "Dans le menu au repos" affiche les jetons en ligne lorsque actif mais les d\xE9place dans le menu au repos.',dim_chips:"Assombrir les jetons en mode veille pour un look plus \xE9pur\xE9.",hold_to_pin:"Appui long pour \xE9pingler au lieu d'un appui court.",always_show_group:"Les contr\xF4les de groupement rapide (+/-/\xE9toile) seront visibles par d\xE9faut au chargement de la page. Vous pouvez toujours les basculer manuellement via un double appui.",disable_autofocus:"Emp\xEAcher la recherche de prendre le focus automatiquement.",search_within_filter:"Rechercher dans le filtre actif actuel (Favoris, etc.).",close_search_on_play:"Fermer automatiquement la recherche \xE0 la lecture.",pin_search_headers:"Garder la recherche et les filtres fixes en haut.",hide_search_headers_on_idle:"Masquer la recherche et les filtres en mode veille.",disable_mass:"D\xE9sactiver l'int\xE9gration Mass Queue.",swap_pause_stop:"Remplacer le bouton pause par stop en mode moderne.",show_album:"Afficher le nom de l'album \xE0 c\xF4t\xE9 de l'artiste dans les d\xE9tails du lecteur.",lock_screen_controls:"Gardez les contr\xF4les et les m\xE9tadonn\xE9es de la piste actifs sur l'\xE9cran de verrouillage de votre appareil (iOS / Android / macOS) lorsque l'application est en arri\xE8re-plan. Remarque : cette fonctionnalit\xE9 est exp\xE9rimentale.",toggle_media_session:"Remarque : les contr\xF4les de session multim\xE9dia et d'\xE9cran de verrouillage sont exp\xE9rimentaux.",adaptive_controls:"Laisser les boutons s'adapter \xE0 l'espace disponible.",hide_menu_player:"Masquer l'\xE9tiquette de l'entit\xE9 en bas quand les jetons sont dans le menu.",hide_reorder_progress:"Masquer l'indicateur flottant de progression de r\xE9organisation de la file d'attente en bas.",adaptive_text:"Choisir quels textes doivent s'adapter \xE0 l'espace.",collapse_expand:"Toujours r\xE9duit cr\xE9e un mini lecteur. Agrandir \xE0 la Recherche agrandit temporairement.",disable_mini_menu:"Revenir aux listes standards au lieu d'utiliser les nouveaux mini menus en grille en mode 'Toujours r\xE9duit'.",idle_screen:"Choisir l'\xE9cran \xE0 afficher automatiquement en veille.",hide_controls:"S\xE9lectionner les commandes \xE0 masquer pour cette entit\xE9.",hide_remote_buttons:"S\xE9lectionnez les boutons \xE0 masquer de la t\xE9l\xE9commande.",hide_search_chips:"Masquer des jetons de filtrage sp\xE9cifiques.",hide_active_entity_on_idle:"Masque l'\xE9tiquette de l'entit\xE9 au bas de la carte uniquement lorsque le lecteur est en veille.",follow_active_entity:"L'entit\xE9 de volume suivra automatiquement l'entit\xE9 active.",search_limit_full:"Nombre maximum de r\xE9sultats (d\xE9faut: 20).",default_search_filter_full:"Choisissez quel filtre est actif par d\xE9faut \xE0 l'ouverture de la recherche.",default_search_favorites:"D\xE9marrer la recherche avec les favoris actifs",result_sorting_full:"Choisir l'ordre des r\xE9sultats. Par d\xE9faut conserve l'ordre source.",card_height_full:"Laisser vide pour une hauteur automatique.",control_layout_full:"Choisir entre l'ancienne mise en page ou la moderne.",artwork_extend:"\xC9tendre l'illustration sous les lignes de jetons.",artwork_extend_label:"\xC9tendre l'illustration",no_artwork_overrides:"Aucun remplacement d'illustration configur\xE9.",missing_art_match:"S'applique lorsque le m\xE9dia s\xE9lectionn\xE9 ne fournit aucune illustration.",idle_image_match:"S'applique lorsque le lecteur est en veille et qu'une image de veille est affich\xE9e.",entity_current_hint:"Utilisez 'entity_id: current' pour cibler le lecteur actuel.",jinja_template_hint:"Entrez un mod\xE8le Jinja qui renvoie un entity_id.",jinja_template_vol_hint:"Mod\xE8le pour l'entit\xE9 de volume.",jinja_template_remote_hint:"Mod\xE8le Jinja r\xE9solvant un entity_id de t\xE9l\xE9commande (ex. remote.salon_tv) :",not_available_alt_collapsed:"Non disponible en mode 'Toujours r\xE9duit'.",not_available_collapsed:"Non disponible si 'Toujours r\xE9duit' est activ\xE9.",only_available_collapsed:"Uniquement disponible si 'Toujours r\xE9duit' est activ\xE9.",only_available_mini_menu:"Uniquement disponible lorsque 'Toujours r\xE9duit' est vrai et 'D\xE9velopper lors de la recherche' est faux",only_available_modern:"Uniquement disponible avec la mise en page Moderne.",image_url_helper:"Entrez une URL directe vers une image ou un chemin de fichier local",selected_entity_helper:"Helper de texte d'entr\xE9e qui sera mis \xE0 jour avec l'ID de l'entit\xE9 du lecteur multim\xE9dia actuellement s\xE9lectionn\xE9.",select_entity_helper:"Helper de texte d'entr\xE9e \xE0 partir duquel lire l'ID de l'entit\xE9. La carte s\xE9lectionnera automatiquement le jeton correspondant.",sync_entity_type:"Choisissez quel ID d'entit\xE9 synchroniser avec le helper (par d\xE9faut l'entit\xE9 Music Assistant si configur\xE9e).",disable_auto_select:"Emp\xEAche le jeton de cette entit\xE9 d'\xEAtre automatiquement s\xE9lectionn\xE9 au d\xE9but de la lecture.",search_view:"Choisissez entre une liste standard ou une grille de cartes pour les r\xE9sultats de recherche.",search_card_columns:"Sp\xE9cifiez le nombre de colonnes \xE0 utiliser dans la vue carte. L'illustration s'adaptera automatiquement.",card_type:"Choisissez le mode de la carte. 'Par d\xE9faut' est le lecteur multim\xE9dia standard. 'Recherche d\xE9di\xE9e' fait de la carte une interface de recherche permanente.",always_show_lyrics:"Ouvrir automatiquement la vue des paroles lors du rafra\xEEchissement de la page.",lyrics_source:"Music Assistant n\xE9cessite l'int\xE9gration mass_queue pour r\xE9cup\xE9rer les paroles de son moteur de m\xE9tadonn\xE9es interne.",lyrics_pre_roll:"Ajuste le timing de mise en \xE9vidence des paroles. Les valeurs positives l'acc\xE9l\xE8rent, les n\xE9gatives le ralentissent (par d\xE9faut : 0).",lyrics_background_fade:"Ajuster le fondu d'arri\xE8re-plan et l'opacit\xE9 d'assombrissement de la superposition des paroles (0% pour une illustration transparente, 100% pour un arri\xE8re-plan plein).",blurred_artwork:"Toujours flouter l'image d'arri\xE8re-plan",hide_collapsed_artwork:"Masquer l'image r\xE9duite sur la droite lorsque la carte est repli\xE9e",disable_artwork_gradient:"D\xE9sactiver le d\xE9grad\xE9 inf\xE9rieur superpos\xE9 sur l'illustration",show_idle_artwork_when_not_playing:"Lorsqu'il est activ\xE9, la s\xE9lection d'un badge qui n'est pas en cours de lecture affichera l'image d'inactivit\xE9 configur\xE9e \xE0 la place de l'illustration de lecture active.",prefer_ma_metadata:"Toujours utiliser l'entit\xE9 Music Assistant associ\xE9e pour le titre de la piste, l'artiste et l'image, m\xEAme si l'entit\xE9 principale est en cours de lecture.",show_volume_overlay:"Affiche bri\xE8vement un grand indicateur de volume sur l'illustration lorsque le niveau de volume change.",font_color_helper:"Personnalisez les couleurs du texte et des ic\xF4nes. Accepte l'hexad\xE9cimal, les noms CSS, rgba ou les mod\xE8les (par d\xE9faut: couleur du th\xE8me).",queue_controls_style:"Choisissez d'afficher une poign\xE9e de glissement ou des boutons de d\xE9placement individuels pour les \xE9l\xE9ments de la file d'attente."},titles:{edit_entity:"Modifier l'entit\xE9",edit_action:"Modifier l'action",service_data:"Donn\xE9es du service",add_artwork_override:"Ajouter un remplacement"},labels:{toggle_template_mode:"Basculer le mode mod\xE8le",dim_chips:"Assombrir les jetons en veille",hold_to_pin:"Maintenir pour \xE9pingler",always_show_group:"Groupe rapide par d\xE9faut",disable_autofocus:"D\xE9sactiver l'autofocus",keep_filters:"Garder les filtres",dismiss_on_play:"Fermer en lecture",pin_headers:"\xC9pingler les en-t\xEAtes",hide_search_headers_on_idle:"Masquer les en-t\xEAtes en veille",default_search_filter:"Filtre de recherche par d\xE9faut",default_search_favorites:"Filtre des favoris par d\xE9faut",disable_mass:"D\xE9sactiver Mass Queue",match_theme:"Suivre le th\xE8me",alt_progress:"Barre de progression alternative",progress_bar_height:"Hauteur de la barre de progression",display_timestamps:"Afficher les horodatages",swap_pause_stop:"Remplacer Pause par Stop",show_album:"Afficher le nom de l'album",lock_screen_controls:"Contr\xF4les multim\xE9dias sur l'\xE9cran de verrouillage (Exp\xE9rimental)",adaptive_controls:"Taille adaptative",hide_active_entity:"Masquer l'\xE9tiquette active",hide_active_entity_on_idle:"Masquer l'\xE9tiquette de l'entit\xE9 active en mode veille",collapse_on_idle:"R\xE9duire en veille",hide_menu_player_toggle:"Masquer le lecteur menu",hide_reorder_progress_toggle:"Masquer la progression de r\xE9organisation",always_collapsed:"Toujours r\xE9duit",disable_mini_menu:"D\xE9sactiver les mini menus en grille",expand_on_search:"Agrandir en recherche",script_var:"Variable script (yamp_entity)",use_ma_template:"Utiliser mod\xE8le MA",use_vol_template:"Utiliser mod\xE8le Volume",follow_active_entity:"Le volume suit l'entit\xE9 active",use_url_path:"Utiliser URL ou chemin",adaptive_text_elements:"\xC9l\xE9ments de texte adaptatif",disable_auto_select:"D\xE9sactiver la s\xE9lection automatique",always_show_lyrics:"Toujours afficher les paroles",lyrics_mode:"Mode des paroles",lyrics_source:"Source des paroles",lyrics_pre_roll:"Pr\xE9-roll des paroles (secondes)",lyrics_background_fade:"Fondu d'arri\xE8re-plan des paroles",blurred_artwork:"Image flout\xE9e",hide_collapsed_artwork:"Masquer l'image r\xE9duite",disable_artwork_gradient:"D\xE9sactiver le d\xE9grad\xE9 de l'illustration",show_idle_artwork_when_not_playing:"Afficher l'image d'inactivit\xE9 si pas de lecture",prefer_ma_metadata:"Pr\xE9f\xE9rer les m\xE9tadonn\xE9es Music Assistant",show_volume_overlay:"Afficher la superposition de volume"},fields:{artwork_fit:"Ajustement",artwork_position:"Position",artwork_hostname:"H\xF4te",match_field:"Champ de correspondance",match_value:"Valeur de correspondance",size_percent:"Taille (%)",object_fit:"Object Fit",idle_timeout:"Veille (ms)",show_chip_row:"Afficher les jetons",search_limit:"Limite de r\xE9sultats",result_sorting:"Tri des r\xE9sultats",vol_step:"Pas du volume",card_height:"Hauteur (px)",control_layout:"Mise en page",idle_image:"Image de veille",background_image:"Image d'arri\xE8re-plan",background_image_entity:"Entit\xE9 d'image d'arri\xE8re-plan",font_color:"Couleur de police",font_color_entity:"Couleur de police",background_position:"Position de l'arri\xE8re-plan",background_fit:"Ajustement de l'arri\xE8re-plan",image_url:"URL image",fallback_image_url:"URL de secours",move_to_main:"Mettre dans les jetons principaux",move_to_menu:"Mettre dans le menu",delete_action:"Supprimer l'action",volume_mode:"Mode volume",idle_screen:"\xC9cran de veille",name:"Nom",hidden_controls:"Commandes masqu\xE9es",hide_remote_buttons:"Boutons de t\xE9l\xE9commande masqu\xE9s",ma_template:"Mod\xE8le MA (Jinja)",hidden_chips:"Jetons masqu\xE9s",vol_template:"Mod\xE8le Volume (Jinja)",icon:"Ic\xF4ne",action_type:"Type d'action",menu_item:"\xC9l\xE9ment du menu",nav_path:"Chemin navigation",service:"Service",service_data:"Donn\xE9es",idle_image_entity:"Entit\xE9 image veille",match_entity:"Entit\xE9 de correspondance",ma_entity:"Entit\xE9 Music Assistant",vol_entity:"Entit\xE9 de volume",remote_entity:"Entit\xE9 de t\xE9l\xE9commande",remote_template:"Mod\xE8le d'entit\xE9 de t\xE9l\xE9commande (Jinja)",selected_entity_helper:"Helper d'entit\xE9 s\xE9lectionn\xE9e",sync_entity_type:"Type d'entit\xE9 \xE0 synchroniser",placement:"Placement",card_trigger:"D\xE9clencheur de carte",search_view:"Vue des r\xE9sultats de recherche",search_card_columns:"Nombre de colonnes",card_type:"Type de carte",appearance:"Apparence",no_artwork_option:"Pas d'illustration",details_alignment:"Alignement des d\xE9tails",lyrics_background_fade:"Fondu d'arri\xE8re-plan des paroles (%)",queue_controls_style:"Style des commandes de file d'attente"},action_types:{menu:"Ouvrir un \xE9l\xE9ment de menu",service:"Appeler un service",navigate:"Naviguer",prev_entity:"Puce de l'entit\xE9 pr\xE9c\xE9dente",next_entity:"Puce de l'entit\xE9 suivante",sync_selected_entity:"Synchroniser l'entit\xE9 s\xE9lectionn\xE9e",select_entity:"S\xE9lectionner l'entit\xE9 depuis le helper",toggle_lyrics:"Activer/D\xE9sactiver la superposition des paroles",remote_control:"Ouvrir l'overlay t\xE9l\xE9commande",toggle_media_session:"Basculer la session multim\xE9dia / l'\xE9cran de verrouillage (Exp\xE9rimental)"},action_helpers:{sync_selected_entity:"Synchroniser l'entit\xE9 s\xE9lectionn\xE9e \u2192",select_entity:"S\xE9lectionner l'entit\xE9 \u2190",select_helper:"(s\xE9lectionner helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entit\xE9 Music Assistant si configur\xE9e)",yamp_main_entity:"yamp_main_entity (Entit\xE9 principale du lecteur)",yamp_playback_entity:"yamp_playback_entity (Entit\xE9 de lecture active actuelle)"},placements:{chip:"Puce d'action",menu:"Dans le menu",hidden:"Masqu\xE9 (Appui sur l'image)",replace_search:"Remplacer Recherche",replace_power:"Remplacer Alimentation",replace_mute:"Remplacer Muet",replace_favorite:"Remplacer Favori",not_triggerable:"Non d\xE9clenchable"},triggers:{none:"Aucun",tap:"Appui",hold:"Maintenir",double_tap:"Double appui",swipe_left:"Glisser vers la gauche",swipe_right:"Glisser vers la droite"},search_view_options:{list:"Liste",card:"Carte",card_minimal:"Carte minimale"},queue_controls_style_options:{drag_handle:"Poign\xE9e de glissement",icons:"Boutons de d\xE9placement"},card_type_options:{default:"Par d\xE9faut",search:"Rechercher",group_players:"Grouper les lecteurs",up_next:"\xC0 suivre",remote_control:"T\xE9l\xE9commande"},appearance_options:{automatic:"Automatique",light:"Clair",dark:"Sombre"},artwork_fit:{default:"Global",cover:"Couverture (par d\xE9faut)",contain:"Contenir",fill:"Remplir","scale-down":"R\xE9duire","scaled-contain":"Contenir mis \xE0 l'\xE9chelle","scaled-contain-alternate":"Contenir mis \xE0 l'\xE9chelle alternatif",none:"Aucun"},artwork_position:{default:"Global",top:"Haut",center:"Centre",bottom:"Bas"},background_fit:{cover:"Couvrir",contain:"Contenir",fill:"Remplir","scale-down":"R\xE9duire",none:"Aucun"},background_position:{center:"Centre",top:"Haut",bottom:"Bas","center left":"Centre gauche","center right":"Centre droite","top left":"Haut gauche","top right":"Haut droite","bottom left":"Bas gauche","bottom right":"Bas droite"}},card:{sections:{details:"D\xE9tails lecture",menu:"Menu & Recherche",action_chips:"Jetons d'action",lyrics:"Paroles"},media_controls:{shuffle:"Al\xE9atoire",previous:"Pr\xE9c\xE9dent",play_pause:"Lecture/Pause",stop:"Arr\xEAt",next:"Suivant",repeat:"R\xE9p\xE9ter",lock_screen_ready:"Contr\xF4les de l'\xE9cran de verrouillage actifs",lock_screen_connecting:"Connexion des contr\xF4les de l'\xE9cran de verrouillage..."},menu:{more_info:"Plus d'infos",search:"Rechercher",source:"Source",remote_controls:"T\xE9l\xE9commande",show_lyrics:"Afficher les paroles",hide_lyrics:"Masquer les paroles",transfer_queue:"Transf\xE9rer la file",main_menu:"Menu Principal",group_players:"Grouper les lecteurs",up_next:"\xC0 suivre",remote_control:"T\xE9l\xE9commande",select_entity:"Choisir pour plus d'infos",transfer_to:"Transf\xE9rer vers",no_players:"Aucun lecteur MA disponible."},remote:{title:"T\xE9l\xE9commande",up:"Haut",down:"Bas",left:"Gauche",right:"Droite",select:"S\xE9lectionner",back:"Retour",menu:"Menu",home:"Accueil",power:"Alimentation"},grouping:{title:"Grouper les lecteurs",sync_volume:"Synchroniser volume",group_all:"Grouper tout",ungroup_all:"D\xE9grouper tout",unavailable:"Lecteur indisponible",no_players:"Aucun lecteur groupable.",master:"Ma\xEEtre",joined:"Li\xE9",available:"Disponible",current:"Actuel",unjoin_from:"Se d\xE9solidariser de {master}",join_with:"Se joindre \xE0 {master}"}},search:{favorites:"Favoris",recently_played:"R\xE9cemment lus",next_up:"\xC0 suivre",recommendations:"Recommandations",radio_mode:"Mode Radio",show_track_options:"Afficher les options du titre",play_similar:"Lire des chansons similaires",close:"Fermer la recherche",no_results:"Aucun r\xE9sultat.",play_next:"Lire apr\xE8s",replace_play:"Remplacer et lire",replace:"Remplacer file",add_queue:"Ajouter \xE0 la fin",move_up:"Monter",move_down:"Descendre",move_next:"Passer au suivant",remove:"Retirer de la file",drag_to_reorder:"Glisser pour r\xE9organiser",added:"Ajout\xE9 \xE0 la file !",added_to_playlist:"Ajout\xE9 \xE0 la playlist !",select_playlist:"S\xE9lectionner une playlist pour '{track}'",add_to_playlist:"Ajouter \xE0 la playlist",select_track_for_playlist:"S\xE9lectionner le titre \xE0 ajouter pour '{track}' par {artist}",labels:{replace:"Remplacer",next:"Suivant",replace_next:"Rempl. Suivant",add:"Ajouter",add_to_playlist:"Ajouter \xE0 la playlist"},results:"r\xE9sultats",result:"r\xE9sultat",filters:{all:"Tout",artist:"Artiste",album:"Album",track:"Titre",playlist:"Playlist",radio:"Radio",music:"Musique",station:"Station",podcast:"Podcast",audiobook:"Livre audio"},search_artist:"Parcourir les albums de cet artiste",browse_artist:"Parcourir les albums de {artist}",search_album:"Parcourir les pistes de cet album",browse_album:"Parcourir les titres de {album}",browse_playlist:"Parcourir les pistes de {playlist}",play_collection:"Lire cette collection",play_collection_error:"Impossible de lire cette collection directement",play_item:"Lire {item}"},lyrics:{finding:"Recherche des paroles...",none_found:"Aucune parole trouv\xE9e",not_available:"Paroles non disponibles",instrumental:"Piste instrumentale",admin_only_mass:"La r\xE9cup\xE9ration des paroles via Music Assistant est r\xE9serv\xE9e aux administrateurs. Il est recommand\xE9 de passer \xE0 lrclib dans la configuration de la carte.",fallback_to_lrclib_non_admin:"Utilisateur non administrateur d\xE9tect\xE9. Utilisation de lrclib pour la r\xE9cup\xE9ration des paroles."},lyrics_sources:{mass_lrclib:"Music Assistant (Repli sur LRCLIB)",mass:"Music Assistant uniquement",lrclib:"LRCLIB uniquement",lrclib_mass:"LRCLIB (Repli sur Music Assistant)"},lyrics_modes:{default:"Par d\xE9faut (Surligner et faire d\xE9filer)",scroll:"D\xE9filement uniquement",text:"Texte uniquement"}},pd={common:{not_found:"Entit\xE0 non trovata.",search:"Cerca",power:"Accensione",favorite:"Preferito",loading:"Caricamento...",no_results:"Nessun risultato.",close:"Chiudi",vol_up:"Volume su",vol_down:"Volume gi\xF9",media_player:"Lettore multimediale",edit_entity:"Modifica impostazioni entit\xE0",edit_action:"Modifica impostazioni azione",mute:"Muto",unmute:"Riattiva audio",seek:"Cerca",volume:"Volume",play_now:"Riproduci ora",more_options:"Altre opzioni",unavailable:"Non disponibile",back:"Indietro",cancel:"Annulla",reset_default:"Ripristina predefiniti",unpin:"Rimuovi pin",clear:"Cancella",album_art:"Copertina dell'album"},editor:{tabs:{entities:"Entit\xE0",behavior:"Comportamento",look_and_feel:"Aspetto",artwork:"Copertina",actions:"Azioni"},search_placeholder:"Cerca opzioni di configurazione...",template_label:"Modello di scheda",templates:{custom:{label:"Personalizzato (Configurazione originale)",description:"La tua configurazione originale completamente personalizzata."},large_modern:{label:"YAMP moderno e grande",description:"Un design moderno leggermente pi\xF9 grande con controlli adattivi."},crisp_clean:{label:"Pulito",description:"Un layout pulito con copertina ridimensionata e controlli moderni."},minimal_mini:{label:"MINImal",description:"Una scheda compatta senza copertina."},normal_mini:{label:"Mini Mode",description:"La scheda compatta standard."},quick_and_easy:{label:"Niente tempo da perdere",description:"Progettato per la velocit\xE0 con righe di chip persistenti e raggruppamento rapido."},dedicated_search:{label:"Tutto sulla ricerca",description:"Una scheda di ricerca autonoma senza il lettore multimediale principale."},dedicated_grouping:{label:"Terapia di gruppo",description:"Una scheda di raggruppamento lettori autonoma. Richiede pi\xF9 entit\xE0 configurate."},huge_yamp:{label:"Questo \xE8 un enorme YAMP!",description:"Controlli ingranditi, testo grande e una barra di avanzamento massiccia per la visione a distanza."}},placeholders:{search:"Cerca musica..."},sections:{artwork:{general:{title:"Impostazioni generali",description:"Controlli globali per la copertina."},background:{title:"Immagine di sfondo",description:"Configura un'immagine di sfondo persistente per la scheda dietro il contenuto in riproduzione."},idle:{title:"Copertina in riposo",description:"Mostra un'immagine statica quando non c'\xE8 riproduzione."},overrides:{title:"Override copertina",description:"Gli override sono valutati dall'alto in basso."}},entities:{title:"Entit\xE0*",description:"Aggiungi i lettori da controllare."},behavior:{idle_chips:{title:"Riposo e chip",description:"Scegli quando andare in riposo."},interactions_search:{title:"Interazioni e ricerca",description:"Ajusta il fissaggio delle entit\xE0."},lyrics:{title:"Testi",description:"Configura come vengono visualizzati i testi e quando appaiono."}},look_and_feel:{theme_layout:{title:"Tema e layout",description:"Adatta allo stile del dashboard."},controls_typography:{title:"Controlli e tipografia",description:"Ajusta bottoni e etichette."},collapsed_idle:{title:"Stati contratto e riposo",description:"Controlla il contratto della scheda."}},actions:{title:"Azioni",description:"Crea chip azione."}},subtitles:{idle_timeout:"Tempo prima del riposo (ms). 0 per disabilitare.",show_chip_row:`"Auto" nasconde la riga se c'\xE8 una sola entit\xE0. "Nel menu" sposta i chip nel menu. "Nel menu in inattivit\xE0" mostra i chip in linea quando attivo ma li sposta nel menu quando inattivo.`,dim_chips:"Appanna i chip in riposo per un aspetto pi\xF9 pulito.",hold_to_pin:"Tieni premuto per fissare invece di un tocco breve.",always_show_group:"I controlli di raggruppamento rapido (+/-/stella) saranno visibili per impostazione predefinita al caricamento della pagina. Puoi comunque attivarli manualmente tramite doppio tocco.",disable_autofocus:"Evita che la ricerca prenda il focus automaticamente.",search_within_filter:"Cerca nel filtro attivo (Preferiti, ecc.).",close_search_on_play:"Chiudi ricerca alla riproduzione.",pin_search_headers:"Fissa le intestazioni di ricerca durante lo scorrimento.",hide_search_headers_on_idle:"Nascondi la ricerca e i filtri quando inattivo.",disable_mass:"Disabilita integrazione Mass Queue.",swap_pause_stop:"Sostituisci pausa con stop nel design moderno.",show_album:"Visualizza il nome dell'album accanto all'artista nei dettagli del lettore.",lock_screen_controls:"Mantieni i controlli e i metadati della traccia attivi sulla schermata di blocco del dispositivo (iOS / Android / macOS) quando l'app \xE8 in background. Nota: Questa funzione \xE8 sperimentale.",toggle_media_session:"Nota: I controlli della sessione multimediale e della schermata di blocco sono sperimentali.",adaptive_controls:"Permetti ai pulsanti di adattarsi allo spazio.",hide_menu_player:"Nascondi nome entit\xE0 quando \xE8 nel menu.",hide_reorder_progress:"Nascondi l'indicatore mobile di avanzamento del riordinamento della coda in basso.",adaptive_text:"Scegli quali testi si adattano allo spazio.",collapse_expand:"Sempre contratto attiva il modo mini. Espandi alla ricerca espande temporaneamente.",disable_mini_menu:"Torna agli elenchi standard invece di usare i nuovi mini menu a griglia in modalit\xE0 'Sempre compresso'.",idle_screen:"Scegli schermata da mostrare in riposo.",hide_controls:"Seleziona controlli da nascondere.",hide_remote_buttons:"Seleziona i pulsanti da nascondere dal telecomando.",hide_search_chips:"Nascondi chip di filtro ricerca.",hide_active_entity_on_idle:"Nasconde l'etichetta dell'entit\xE0 in fondo alla scheda solo quando il lettore \xE8 inattivo.",follow_active_entity:"L'entit\xE0 volume seguir\xE0 quella attiva.",search_limit_full:"Massimo risultati (default: 20).",default_search_filter_full:"Scegli quale filtro \xE8 attivo per impostazione predefinita all'apertura della ricerca.",default_search_favorites:"Inizia ricerca con preferiti attivi",result_sorting_full:"Scegli ordine risultati.",card_height_full:"Lascia vuoto per altezza automatica.",control_layout_full:"Scegli tra design vecchio o moderno.",artwork_extend:"Estendi copertina sotto i chip.",artwork_extend_label:"Estendi copertina",no_artwork_overrides:"Nessun override copertina configurato.",missing_art_match:"Si applica quando il media selezionato non fornisce alcuna copertina.",idle_image_match:"Si applica quando il lettore \xE8 inattivo e viene visualizzata un'immagine di inattivit\xE0.",entity_current_hint:"Usa 'entity_id: current' per il lettore attuale.",jinja_template_hint:"Modello Jinja per entity_id.",jinja_template_vol_hint:"Modello per entit\xE0 volume.",jinja_template_remote_hint:"Modello Jinja che restituisce un entity_id telecomando (es. remote.salotto_tv):",not_available_alt_collapsed:"Non disponibile in modo contratto.",not_available_collapsed:"Non disponibile se contratto.",only_available_collapsed:"Solo disponibile se contratto.",only_available_mini_menu:"Disponibile solo quando 'Sempre compresso' \xE8 vero ed 'Espandi in ricerca' \xE8 falso",only_available_modern:"Solo disponibile con layout Moderno.",image_url_helper:"Inserisci un URL diretto a un'immagine o un percorso file locale",selected_entity_helper:"Helper di testo di input che verr\xE0 aggiornato con l'ID dell'entit\xE0 del lettore multimediale attualmente selezionato.",select_entity_helper:"Helper di testo di input da cui leggere l'ID dell'entit\xE0. La scheda selezioner\xE0 automaticamente il chip corrispondente.",sync_entity_type:"Scegli quale ID entit\xE0 sincronizzare con l'helper (predefinito l'entit\xE0 Music Assistant se configurata).",disable_auto_select:"Evita che il chip di questa entit\xE0 venga selezionato automaticamente all'inizio della riproduzione.",search_view:"Scegli tra una lista standard o una griglia di schede per i risultati della ricerca.",search_card_columns:"Specifica quante colonne utilizzare nella vista a schede. La copertina si adatter\xE0 automaticamente.",card_type:"Scegli la modalit\xE0 della scheda. 'Predefinito' \xE8 il lettore multimediale standard. 'Ricerca dedicata' rende la scheda un'interfaccia di ricerca permanente.",always_show_lyrics:"Apri automaticamente la visualizzazione dei testi quando la pagina viene aggiornata.",lyrics_source:"Music Assistant richiede l'integrazione mass_queue per recuperare i testi dal suo motore di metadati interno.",lyrics_pre_roll:"Sposta il tempismo dell'evidenziazione dei testi. I valori positivi lo accelerano, quelli negativi lo ritardano (predefinito: 0).",lyrics_background_fade:"Regola la dissolvenza dello sfondo e l'opacit\xE0 di attenuazione della sovrapposizione dei testi (0% per grafica trasparente, 100% per sfondo solido).",blurred_artwork:"Sfoca sempre l'immagine di sfondo",hide_collapsed_artwork:"Nascondi l'immagine piccola a destra quando la scheda \xE8 compressa",disable_artwork_gradient:"Disattiva la sfumatura inferiore sull'immagine di copertina",show_idle_artwork_when_not_playing:"Se abilitato, selezionando un chip che non \xE8 attualmente in riproduzione verr\xE0 mostrata l'immagine inattiva configurata invece della copertina di riproduzione attiva.",prefer_ma_metadata:"Utilizza sempre l'entit\xE0 Music Assistant associata per il titolo del brano, l'artista e l'artwork, anche se l'entit\xE0 principale \xE8 in riproduzione.",show_volume_overlay:"Visualizza brevemente un grande indicatore del volume sopra la copertina quando il livello del volume cambia.",font_color_helper:"Personalizza i colori di testo e icone. Accetta esadecimale, nomi CSS, rgba o modelli (predefinito: colore del tema).",queue_controls_style:"Scegli se mostrare una maniglia di trascinamento o pulsanti di movimento singoli per gli elementi della coda."},titles:{edit_entity:"Modifica entit\xE0",edit_action:"Modifica azione",service_data:"Dati servizio",add_artwork_override:"Aggiungi override"},labels:{toggle_template_mode:"Attiva/disattiva modalit\xE0 modello",dim_chips:"Appanna chip in riposo",hold_to_pin:"Tieni premuto per fissare",always_show_group:"Gruppo rapido predefinito",disable_autofocus:"Disabilita autofocus",keep_filters:"Mantieni filtri",dismiss_on_play:"Chiudi alla riproduzione",pin_headers:"Fissa intestazioni",hide_search_headers_on_idle:"Nascondi intestazioni in inattivit\xE0",default_search_filter:"Filtro di ricerca predefinito",default_search_favorites:"Filtro preferiti predefinito",disable_mass:"Disabilita Mass Queue",match_theme:"Segui tema",alt_progress:"Barra progresso alternativa",progress_bar_height:"Altezza barra di avanzamento",display_timestamps:"Mostra timestamp",swap_pause_stop:"Sostituisci Pausa con Stop",show_album:"Mostra nome album",lock_screen_controls:"Controlli multimediali nella schermata di blocco (Sperimentale)",adaptive_controls:"Dimensione adattativa",hide_active_entity:"Nascondi nome entit\xE0 attiva",hide_active_entity_on_idle:"Nascondi etichetta entit\xE0 attiva quando inattivo",collapse_on_idle:"Contrai in riposo",hide_menu_player_toggle:"Nascondi lettore menu",hide_reorder_progress_toggle:"Nascondi avanzamento riordinamento",always_collapsed:"Sempre contratto",disable_mini_menu:"Disabilita i mini menu a griglia",expand_on_search:"Espandi alla ricerca",script_var:"Variabile script (yamp_entity)",use_ma_template:"Usa modello MA",use_vol_template:"Usa modello Volume",follow_active_entity:"Volume segue entit\xE0 attiva",use_url_path:"Usa URL o percorso",adaptive_text_elements:"Elementi per dimensione testo adattiva",disable_auto_select:"Disabilita selezione automatica",always_show_lyrics:"Mostra sempre i testi",lyrics_mode:"Modalit\xE0 testi",lyrics_source:"Sorgente testi",lyrics_pre_roll:"Pre-roll testi (secondi)",lyrics_background_fade:"Dissolvenza sfondo testi",blurred_artwork:"Immagine sfocata",hide_collapsed_artwork:"Nascondi immagine contratta",disable_artwork_gradient:"Disattiva sfumatura copertina",show_idle_artwork_when_not_playing:"Mostra immagine inattiva quando non in riproduzione",prefer_ma_metadata:"Preferisci i metadati di Music Assistant",show_volume_overlay:"Mostra overlay volume"},fields:{artwork_fit:"Adattamento",artwork_position:"Posizione",artwork_hostname:"Host",match_field:"Campo",match_value:"Valore",size_percent:"Dimensione (%)",object_fit:"Object Fit",idle_timeout:"Riposo (ms)",show_chip_row:"Mostra chip",search_limit:"Limite ricerca",result_sorting:"Ordine",vol_step:"Passo volume",card_height:"Altezza (px)",control_layout:"Design",idle_image:"Immagine di inattivit\xE0",background_image:"Immagine di sfondo",background_image_entity:"Entit\xE0 immagine di sfondo",font_color:"Colore del carattere",font_color_entity:"Colore del carattere",background_position:"Posizione dello sfondo",background_fit:"Adattamento sfondo",image_url:"URL immagine",fallback_image_url:"URL fallback",move_to_main:"Sposta in chip principali",move_to_menu:"Sposta nel menu",delete_action:"Elimina azione",volume_mode:"Modo volume",idle_screen:"Schermo riposo",name:"Nome",hidden_controls:"Controlli nascosti",hide_remote_buttons:"Pulsanti del telecomando nascosti",ma_template:"Modello MA (Jinja)",hidden_chips:"Chip nascosti",vol_template:"Modello Volume (Jinja)",icon:"Icona",action_type:"Tipo azione",menu_item:"Elemento menu",nav_path:"Percorso",service:"Servizio",service_data:"Dati",idle_image_entity:"Entit\xE0 immagine riposo",match_entity:"Entit\xE0",ma_entity:"Entit\xE0 Music Assistant",vol_entity:"Entit\xE0 di volume",remote_entity:"Entit\xE0 telecomando",remote_template:"Template entit\xE0 telecomando (Jinja)",selected_entity_helper:"Helper entit\xE0 selezionata",sync_entity_type:"Tipo di entit\xE0 da sincronizzare",placement:"Posizionamento",card_trigger:"Trigger della scheda",search_view:"Vista risultati ricerca",search_card_columns:"Colonne schede",card_type:"Tipo di scheda",appearance:"Aspetto",no_artwork_option:"Nessuna copertina",details_alignment:"Allineamento dei dettagli",lyrics_background_fade:"Dissolvenza sfondo testi (%)",queue_controls_style:"Stile controlli coda"},action_types:{menu:"Apri un elemento del menu",service:"Chiama un servizio",navigate:"Naviga",prev_entity:"Chip entit\xE0 precedente",next_entity:"Chip entit\xE0 successiva",sync_selected_entity:"Sincronizza entit\xE0 selezionata",select_entity:"Seleziona entit\xE0 da helper",toggle_lyrics:"Attiva/disattiva sovrapposizione testi",remote_control:"Apri sovrapposizione telecomando",toggle_media_session:"Attiva/disattiva sessione multimediale / schermata di blocco (Sperimentale)"},action_helpers:{sync_selected_entity:"Sincronizza entit\xE0 selezionata \u2192",select_entity:"Seleziona entit\xE0 \u2190",select_helper:"(seleziona helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entit\xE0 Music Assistant se configurata)",yamp_main_entity:"yamp_main_entity (Entit\xE0 principale del lettore)",yamp_playback_entity:"yamp_playback_entity (Entit\xE0 di riproduzione attiva attuale)"},placements:{chip:"Chip d'azione",menu:"Nel menu",hidden:"Nascosto (Tocco sull'immagine)",replace_search:"Sostituisci Ricerca",replace_power:"Sostituisci Accensione",replace_mute:"Sostituisci Muto",replace_favorite:"Sostituisci Preferito",not_triggerable:"Non attivabile"},triggers:{none:"Nessuno",tap:"Tocco",hold:"Mantieni",double_tap:"Doppio tocco",swipe_left:"Scorri a sinistra",swipe_right:"Scorri a destra"},search_view_options:{list:"Lista",card:"Scheda",card_minimal:"Scheda minima"},queue_controls_style_options:{drag_handle:"Maniglia di trascinamento",icons:"Pulsanti di movimento"},card_type_options:{default:"Predefinito",search:"Cerca",group_players:"Raggruppa i lettori",up_next:"In coda",remote_control:"Telecomando"},appearance_options:{automatic:"Automatico",light:"Chiaro",dark:"Scuro"},artwork_fit:{default:"Globale",cover:"Copertina (predefinito)",contain:"Contieni",fill:"Riempi","scale-down":"Ridimensiona","scaled-contain":"Contieni scalato","scaled-contain-alternate":"Contieni scalato alternativo",none:"Nessuno"},artwork_position:{default:"Globale",top:"In alto",center:"Centro",bottom:"In basso"},background_fit:{cover:"Copri",contain:"Contieni",fill:"Riempi","scale-down":"Riduci",none:"Nessuno"},background_position:{center:"Centro",top:"In alto",bottom:"In basso","center left":"Al centro a sinistra","center right":"Al centro a destra","top left":"In alto a sinistra","top right":"In alto a destra","bottom left":"In basso a sinistra","bottom right":"In basso a destra"}},card:{sections:{details:"Dettagli riproduzione",menu:"Menu e Ricerca",action_chips:"Chip azione",lyrics:"Testi"},media_controls:{shuffle:"Casuale",previous:"Precedente",play_pause:"Riproduci/Pausa",stop:"Ferma",next:"Successivo",repeat:"Ripeti",lock_screen_ready:"Controlli schermata di blocco attivi",lock_screen_connecting:"Connessione controlli schermata di blocco..."},menu:{more_info:"Pi\xF9 info",search:"Cerca",source:"Sorgente",remote_controls:"Telecomando",show_lyrics:"Mostra testi",hide_lyrics:"Nascondi testi",transfer_queue:"Trasferisci coda",main_menu:"Menu Principale",group_players:"Raggruppa",up_next:"In coda",remote_control:"Telecomando",select_entity:"Seleziona",transfer_to:"Trasferisci a",no_players:"Senza lettori MA."},remote:{title:"Telecomando",up:"Su",down:"Gi\xF9",left:"Sinistra",right:"Destra",select:"Seleziona",back:"Indietro",menu:"Menu",home:"Home",power:"Accensione"},grouping:{title:"Raggruppa",sync_volume:"Sincronizza volume",group_all:"Raggruppa tutti",ungroup_all:"Separa tutti",unavailable:"Non disponibile",no_players:"Non raggruppabile.",master:"Master",joined:"Unito",available:"Disponibile",current:"Attuale",unjoin_from:"Scollegati da {master}",join_with:"Unisciti a {master}"}},search:{favorites:"Preferiti",recently_played:"Recenti",next_up:"A seguire",recommendations:"Raccomandazioni",radio_mode:"Modo Radio",show_track_options:"Mostra opzioni brano",play_similar:"Riproduci brani simili",close:"Chiudi",no_results:"Nessun risultato.",play_next:"Riprod. successivo",replace_play:"Sostituisci e riproduci",replace:"Sostituisci coda",add_queue:"Aggiungi alla fine",move_up:"Sposta su",move_down:"Sposta gi\xF9",move_next:"Passa al successivo",remove:"Rimuovi da coda",drag_to_reorder:"Trascina per riordinare",added:"Aggiunto!",added_to_playlist:"Aggiunto alla playlist!",select_playlist:"Seleziona playlist per '{track}'",add_to_playlist:"Aggiungi alla playlist",select_track_for_playlist:"Seleziona il brano da aggiungere per '{track}' di {artist}",labels:{replace:"Sostituisci",next:"Successivo",replace_next:"Sost. succ.",add:"Aggiungi",add_to_playlist:"Aggiungi alla playlist"},results:"risultati",result:"risultato",filters:{all:"Tutto",artist:"Artista",album:"Album",track:"Brano",playlist:"Playlist",radio:"Radio",music:"Musica",station:"Stazione",podcast:"Podcast",audiobook:"Audiolibro"},search_artist:"Sfoglia gli album di questo artista",browse_artist:"Sfoglia gli album di {artist}",search_album:"Sfoglia i brani di questo album",browse_album:"Sfoglia i brani di {album}",browse_playlist:"Sfoglia i brani di {playlist}",play_collection:"Riproduci questa collezione",play_collection_error:"Impossibile riprodurre direttamente questa collezione",play_item:"Riproduci {item}"},lyrics:{finding:"Ricerca testi...",none_found:"Nessun testo trovato",not_available:"Testi non disponibili",instrumental:"Traccia strumentale",admin_only_mass:"Il recupero dei testi tramite Music Assistant \xE8 riservato agli utenti amministratori. Si consiglia di passare a lrclib nella configurazione della scheda.",fallback_to_lrclib_non_admin:"Rilevato utente non amministratore. Passaggio a lrclib per il recupero dei testi."},lyrics_sources:{mass_lrclib:"Music Assistant (Fallback su LRCLIB)",mass:"Solo Music Assistant",lrclib:"Solo LRCLIB",lrclib_mass:"LRCLIB (Fallback su Music Assistant)"},lyrics_modes:{default:"Predefinito (Evidenzia e scorri)",scroll:"Solo scorrimento",text:"Solo testo"}},_d={common:{not_found:"Entiteit niet gevonden.",search:"Zoeken",power:"Aan/Uit",favorite:"Favoriet",loading:"Laden...",no_results:"Geen resultaten.",close:"Sluiten",vol_up:"Volume Omhoog",vol_down:"Volume Omlaag",media_player:"Mediaspeler",edit_entity:"Entiteitsinstellingen Bewerken",edit_action:"Actie-instellingen Bewerken",mute:"Dempen",unmute:"Dempen opheffen",seek:"Zoeken",volume:"Volume",play_now:"Nu Spelen",more_options:"Meer Opties",unavailable:"Niet beschikbaar",back:"Terug",cancel:"Annuleren",reset_default:"Herstellen naar standaard",unpin:"Losmaken",clear:"Wissen",album_art:"Albumhoes"},editor:{tabs:{entities:"Entiteiten",behavior:"Gedrag",look_and_feel:"Uiterlijk",artwork:"Artwork",actions:"Acties"},search_placeholder:"Configuratieopties zoeken...",template_label:"Kaartsjabloon",templates:{custom:{label:"Aangepast (Originele configuratie)",description:"Uw originele, volledig aangepaste configuratie."},large_modern:{label:"Grote moderne YAMP",description:"Een iets groter modern ontwerp met adaptieve bedieningselementen."},crisp_clean:{label:"Strak",description:"Een strakke indeling met geschaalde albumhoes en moderne bediening."},minimal_mini:{label:"MINImal",description:"Een compacte kaart zonder artwork."},normal_mini:{label:"Mini Mode",description:"De standaard compacte kaart."},quick_and_easy:{label:"Geen tijd te verliezen",description:"Gemaakt voor snelheid met permanente chiprijen en snel groeperen."},dedicated_search:{label:"Alles over zoeken",description:"Een zelfstandige zoekkaart zonder de hoofdmediaspeler."},dedicated_grouping:{label:"Groepstherapie",description:"Een zelfstandige spelers-groeperingskaart. Vereist meerdere geconfigureerde entiteiten."},huge_yamp:{label:"Dat is een enorme YAMP!",description:"Gemaximaliseerde bediening, grote tekst en een enorme voortgangsbalk voor weergave op afstand."}},placeholders:{search:"Zoek muziek..."},sections:{artwork:{general:{title:"Algemene Instellingen",description:"Globale instellingen voor hoe artwork wordt weergegeven en opgehaald."},background:{title:"Achtergrondafbeelding",description:"Configureer een persistente achtergrondafbeelding voor de kaart achter de afspeelcontent."},idle:{title:"Artwork bij Inactiviteit",description:"Toon een statische afbeelding of entiteits-snapshot wanneer er niets wordt afgespeeld."},overrides:{title:"Artwork Overschrijvingen",description:"Overschrijvingen worden van boven naar beneden ge\xEBvalueerd. Sleep om te sorteren."}},entities:{title:"Entiteiten*",description:"Voeg de mediaspelers toe die je wilt bedienen. Sleep entiteiten om de volgorde te wijzigen."},behavior:{idle_chips:{title:"Inactiviteit & Chips",description:"Kies wanneer de kaart inactief wordt en hoe entiteitschips zich gedragen."},interactions_search:{title:"Interacties & Zoeken",description:"Verfijn hoe entiteiten worden vastgezet en hoeveel resultaten er tegelijk worden getoond."},lyrics:{title:"Songteksten",description:"Configureer hoe songteksten worden weergegeven en wanneer ze verschijnen."}},look_and_feel:{theme_layout:{title:"Thema & Layout",description:"Stem af op de styling van het dashboard en beheer de totale voetafdruk."},controls_typography:{title:"Bediening & Typografie",description:"Pas knopgrootte, entiteitslabels en adaptieve tekst aan."},collapsed_idle:{title:"Ingeklapte & Inactieve Staten",description:"Beheer wanneer de kaart inklapt en welke weergaven getoond worden bij inactiviteit."}},actions:{title:"Acties",description:"Bouw de actiechips die in de kaart of het menu verschijnen. Sleep om te sorteren, klik op het potlood om te configureren."}},subtitles:{idle_timeout:"Tijd in milliseconden voordat de kaart naar de inactieve modus gaat. Stel in op 0 om inactiviteitsgedrag uit te schakelen.",show_chip_row:'"Auto" verbergt de chiprij wanneer er slechts \xE9\xE9n entiteit is geconfigureerd. "In Menu" verplaatst de chips naar het menu-overlay. "In menu bij inactiviteit" toont chips inline wanneer actief maar verplaatst ze naar het menu wanneer inactief.',dim_chips:"Wanneer de kaart inactief wordt met een afbeelding, dim dan de entiteits- en actiechips voor een strakker uiterlijk.",hold_to_pin:"Houd entiteitschips lang ingedrukt in plaats van kort om ze vast te zetten, om automatisch schakelen tijdens afspelen te voorkomen.",always_show_group:"Snelgroeperingsknoppen (+/-/ster) zijn standaard zichtbaar bij het laden van de pagina. Je kunt ze nog steeds handmatig in- of uitschakelen via dubbeltikken.",disable_autofocus:"Voorkom dat het zoekveld de focus steelt, zodat onscreen toetsenborden verborgen blijven.",search_within_filter:"Schakel dit in om te zoeken binnen het huidige actieve filter (Favorieten, Recent Afgespeeld, etc) in plaats van dit te wissen.",close_search_on_play:"Sluit het zoekscherm automatisch wanneer een nummer wordt afgespeeld.",pin_search_headers:"Houd de zoekinvoer en filters bovenaan vast tijdens het scrollen door resultaten.",hide_search_headers_on_idle:"Verberg zoekinvoer en filters wanneer inactief.",disable_mass:"Schakel de optionele Mass Queue integratie uit, zelfs als deze is ge\xEFnstalleerd.",swap_pause_stop:"Vervang de pauzeknop door stop bij gebruik van de moderne lay-out.",show_album:"Toon de albumnaam naast de artiest in de spelerdetails.",lock_screen_controls:"Houd bedieningselementen en trackmetagegevens actief op het vergrendelingsscherm van je apparaat (iOS / Android / macOS) wanneer de app op de achtergrond wordt uitgevoerd. Let op: deze functie is experimenteel.",toggle_media_session:"Let op: vergrendelscherm- en mediasessiebediening zijn experimenteel.",adaptive_controls:"Laat de afspeelknoppen groeien of krimpen om in de beschikbare ruimte te passen.",hide_menu_player:"Wanneer chips in het menu staan, verberg dan het entiteitslabel onderaan de kaart.",hide_reorder_progress:"Verberg de zwevende voortgangsindicator voor het opnieuw sorteren van de wachtrij onderaan.",adaptive_text:"Kies welke tekstgroepen moeten schalen met de beschikbare ruimte (laat leeg om adaptieve tekst uit te schakelen).",collapse_expand:"Altijd Ingeklapt cre\xEBert de mini-spelermodus. Uitklappen bij Zoeken klapt tijdelijk uit tijdens het zoeken.",disable_mini_menu:"Keer terug naar standaardlijsten in plaats van de nieuwe mini rastermenu's te gebruiken in de modus 'Altijd ingeklapt'.",idle_screen:"Kies welk scherm automatisch wordt weergegeven wanneer de kaart inactief wordt.",hide_controls:"Selecteer welke knoppen je wilt verbergen voor deze entiteit (standaard worden ze allemaal getoond)",hide_remote_buttons:"Selecteer knoppen om te verbergen in de afstandsbediening-overlay.",hide_search_chips:"Verberg specifieke zoekfilterchips voor deze entiteit",hide_active_entity_on_idle:"Verbergt het entiteitslabel onderaan de kaart alleen wanneer de speler inactief is.",follow_active_entity:"Indien ingeschakeld, zal de volume-entiteit automatisch de actieve afspeel-entiteit volgen. Let op: dit overschrijft de geselecteerde volume-entiteit.",search_limit_full:"Maximaal aantal zoekresultaten om weer te geven (standaard: 20)",default_search_filter_full:"Kies welk filter standaard actief is wanneer het zoekscherm wordt geopend.",default_search_favorites:"Start zoekopdracht met favorieten actief",result_sorting_full:"Kies hoe zoekresultaten worden gesorteerd. Standaard behoudt de bronvolgorde.",card_height_full:"Laat leeg voor automatische hoogte",control_layout_full:"Kies tussen de oude gelijkmatig verdeelde knoppen of de moderne Home Assistant lay-out.",artwork_extend:"Laat de artwork-achtergrond doorlopen onder de chip- en actierijen.",artwork_extend_label:"Artwork uitbreiden",no_artwork_overrides:"Geen artwork overschrijvingen geconfigureerd. Gebruik de plusknop hieronder om er een toe te voegen.",missing_art_match:"Is van toepassing wanneer de geselecteerde media geen hoesafbeelding biedt.",idle_image_match:"Is van toepassing wanneer de speler inactief is en er een rustafbeelding wordt weergegeven.",entity_current_hint:"Gebruik 'entity_id: current' om de momenteel geselecteerde mediaspeler op de kaart te targeten.",jinja_template_hint:"Voer een Jinja-sjabloon in dat resulteert in een enkele entity_id. Voorbeeld voor het wisselen van MA op basis van een bronselectie:",jinja_template_vol_hint:"Voer een Jinja-sjabloon in dat resulteert in een entity_id (bijv. media_player.kantoor). Voorbeeld voor het wisselen van volume-entiteit op basis van een boolean:",jinja_template_remote_hint:"Voer een Jinja-sjabloon in dat resulteert in een afstandsbediening entity_id (bijv. remote.woonkamer_tv):",not_available_alt_collapsed:"Niet beschikbaar met Alternatieve Voortgangsbalk of Altijd Ingeklapte modus",not_available_collapsed:"Niet beschikbaar wanneer Altijd Ingeklapt is ingeschakeld",only_available_collapsed:"Alleen beschikbaar wanneer Altijd Ingeklapt is ingeschakeld",only_available_mini_menu:"Alleen beschikbaar wanneer 'Altijd ingeklapt' waar is en 'Uitvouwen bij zoeken' onwaar is",only_available_modern:"Alleen beschikbaar met de Moderne lay-out",image_url_helper:"Voer een directe URL naar een afbeelding of een lokaal bestandspad in",selected_entity_helper:"Invoerteksthelper die wordt bijgewerkt met de momenteel geselecteerde media player-entiteits-ID.",select_entity_helper:"Invoerteksthelper waaruit het entiteits-ID wordt gelezen. De kaart selecteert automatisch de bijbehorende chip.",sync_entity_type:"Kies welk entiteits-ID moet worden gesynchroniseerd met de helper (standaard Music Assistant-entiteit indien geconfigureerd).",disable_auto_select:"Voorkomt dat de chip van deze entiteit automatisch wordt geselecteerd wanneer deze begint af te spelen.",search_view:"Kies tussen een standaardlijst of een raster van kaarten voor zoekresultaten.",search_card_columns:"Geef aan hoeveel kolommen er gebruikt moeten worden in de kaartweergave. De afbeelding wordt automatisch aangepast.",card_type:"Kies de kaartmodus. 'Standaard' is de standaard mediaspeler. 'Speciale zoekopdracht' maakt van de kaart een permanente zoekinterface.",always_show_lyrics:"Open automatisch de songtekstweergave wanneer de pagina wordt vernieuwd.",lyrics_source:"Music Assistant vereist de mass_queue-integratie om songteksten op te halen uit de interne metadata-engine.",lyrics_pre_roll:"Verschuif de timing van de songtekstmarkering. Positieve waarden versnellen het, negatieve waarden vertragen het (standaard: 0).",lyrics_background_fade:"Pas de achtergrondvervaging en dim-dekking van de songtekst-overlay aan (0% voor transparant artwork, 100% voor een effen achtergrond).",blurred_artwork:"Achtergrondafbeelding altijd vervagen",hide_collapsed_artwork:"Verberg de kleine afbeelding aan de rechterkant wanneer de kaart is ingeklapt",disable_artwork_gradient:"Het verloop onderaan de albumhoes uitschakelen",show_idle_artwork_when_not_playing:"Indien ingeschakeld, zal het selecteren van een chip die momenteel niet wordt afgespeeld de geconfigureerde stand-by afbeelding weergeven in plaats van de actieve afspeel-art.",prefer_ma_metadata:"Gebruik altijd de gekoppelde Music Assistant-entiteit voor de tracktitel, artiest en artwork, zelfs als de primaire entiteit wordt afgespeeld.",show_volume_overlay:"Geef kort een grote volume-indicator weer over het artwork wanneer het volumeniveau verandert.",font_color_helper:"Pas tekst- en pictogramkleuren aan. Accepteert hex, CSS-namen, rgba of sjablonen (standaard: themakleur).",queue_controls_style:"Kies of u een sleephandgreep of individuele bewegingsknoppen wilt weergeven voor wachtrij-items."},titles:{edit_entity:"Entiteit Bewerken",edit_action:"Actie Bewerken",service_data:"Servicegegevens",add_artwork_override:"Artwork Overschrijving Toevoegen"},labels:{toggle_template_mode:"Sjabloonmodus wisselen",dim_chips:"Chips dimmen bij inactiviteit",hold_to_pin:"Ingedrukt houden om vast te zetten",always_show_group:"Snelgroepering standaard aan",disable_autofocus:"Zoek-autofocus uitschakelen",keep_filters:"Filters behouden bij zoeken",dismiss_on_play:"Zoeken sluiten bij afspelen",pin_headers:"Zoekkoppen vastzetten",hide_search_headers_on_idle:"Zoekkoppen verbergen bij inactiviteit",default_search_filter:"Standaard zoekfilter",default_search_favorites:"Standaard naar favorietenfilter",disable_mass:"Mass Queue uitschakelen",match_theme:"Thema matchen",alt_progress:"Alternatieve Voortgangsbalk",progress_bar_height:"Hoogte voortgangsbalk",display_timestamps:"Tijdstempels Weergeven",swap_pause_stop:"Pauze vervangen door Stop",show_album:"Toon albumnaam",lock_screen_controls:"Mediabediening vergrendelscherm (Experimenteel)",adaptive_controls:"Adaptieve Knoppen Grootte",hide_active_entity:"Label van Actieve Entiteit verbergen",hide_active_entity_on_idle:"Actieve entiteitslabel verbergen bij inactiviteit",collapse_on_idle:"Inklappen bij inactiviteit",hide_menu_player_toggle:"Menu-speler Verbergen",hide_reorder_progress_toggle:"Wachtrijsortering Verbergen",always_collapsed:"Altijd Ingeklapt",disable_mini_menu:"Mini rastermenu's uitschakelen",expand_on_search:"Uitklappen bij Zoeken",script_var:"Script Variabele (yamp_entity)",use_ma_template:"Sjabloon gebruiken voor Music Assistant Entiteit",use_vol_template:"Sjabloon gebruiken voor Volume Entiteit",follow_active_entity:"Volume Entiteit volgt Actieve Entiteit",use_url_path:"URL of Pad gebruiken",adaptive_text_elements:"Elementen voor adaptieve tekstgrootte",disable_auto_select:"Automatische selectie uitschakelen",always_show_lyrics:"Toon altijd songteksten",lyrics_mode:"Songtekstmodus",lyrics_source:"Songtekstbron",lyrics_pre_roll:"Songtekst Pre-Roll (seconden)",lyrics_background_fade:"Songtekst achtergrondvervaging",blurred_artwork:"Vervaagde afbeelding",hide_collapsed_artwork:"Verkleinde afbeelding verbergen",disable_artwork_gradient:"Kleurverloop van hoes uitschakelen",show_idle_artwork_when_not_playing:"Toon stand-by afbeelding wanneer niet afgespeeld",prefer_ma_metadata:"Voorkeur voor Music Assistant-metadata",show_volume_overlay:"Volume-overlay weergeven"},fields:{artwork_fit:"Artwork Passend Maken",artwork_position:"Artwork Positie",artwork_hostname:"Artwork Hostnaam",match_field:"Match Veld",match_value:"Match Waarde",size_percent:"Grootte (%)",object_fit:"Object Fit",idle_timeout:"Time-out voor Inactiviteit (ms)",show_chip_row:"Chiprij Tonen",search_limit:"Limiet Zoekresultaten",result_sorting:"Sortering Resultaten",vol_step:"Volume Stap (0.05 = 5%)",card_height:"Kaarthoogte (px)",control_layout:"Knoppen Lay-out",idle_image:"Rustafbeelding",background_image:"Achtergrondafbeelding",background_image_entity:"Achtergrondafbeelding Entiteit",font_color:"Letterkleur",font_color_entity:"Letterkleur",background_position:"Achtergrondpositie",background_fit:"Achtergrondpassing",image_url:"Afbeelding URL",fallback_image_url:"Fallback Afbeelding URL",move_to_main:"Verplaats actie naar hoofdchips",move_to_menu:"Verplaats actie naar menu",delete_action:"Actie Verwijderen",volume_mode:"Volume Modus",idle_screen:"Inactief Scherm",name:"Naam",hidden_controls:"Verborgen Knoppen",hide_remote_buttons:"Verborgen afstandsbediening knoppen",ma_template:"Music Assistant Entiteit Sjabloon (Jinja)",hidden_chips:"Verborgen Zoekfilterchips",vol_template:"Volume Entiteit Sjabloon (Jinja)",icon:"Icoon",action_type:"Actietype",menu_item:"Menu-item",nav_path:"Navigatiepad",service:"Service",service_data:"Servicegegevens",idle_image_entity:"Entiteit voor inactieve afbeelding",match_entity:"Match Entiteit",ma_entity:"Music Assistant-entiteit",vol_entity:"Volume-entiteit",remote_entity:"Afstandsbediening-entiteit",remote_template:"Afstandsbediening entiteit template (Jinja)",selected_entity_helper:"Geselecteerde entiteitshelper",sync_entity_type:"Synchronisatie entiteitstype",placement:"Plaatsing",card_trigger:"Kaart trigger",search_view:"Zoekresultaten weergave",search_card_columns:"Aantal kolommen",card_type:"Kaarttype",appearance:"Uiterlijk",no_artwork_option:"Geen afbeelding",details_alignment:"Details uitlijning",lyrics_background_fade:"Songtekst achtergrondvervaging (%)",queue_controls_style:"Wachtrijbesturingsstijl"},action_types:{menu:"Open een kaartmenu-item",service:"Roep een service aan",navigate:"Navigeren",prev_entity:"Vorige entiteit chip",next_entity:"Volgende entiteit chip",sync_selected_entity:"Synchroniseer geselecteerde entiteit",select_entity:"Selecteer entiteit uit helper",toggle_lyrics:"Wisselen tussen songtekst-overlay",remote_control:"Afstandsbediening overlay openen",toggle_media_session:"Wisselen van mediasessie / vergrendelschermbediening (Experimenteel)"},action_helpers:{sync_selected_entity:"Geselecteerde entiteit synchroniseren",select_entity:"Entiteit selecteren uit helper",select_helper:"(selecteer helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Music Assistant-entiteit indien geconfigureerd)",yamp_main_entity:"yamp_main_entity (Hoofd media player-entiteit)",yamp_playback_entity:"yamp_playback_entity (Huidige actieve afspeelentiteit)"},placements:{chip:"Actiechip",menu:"In menu",hidden:"Verborgen (Artwork-tik)",replace_search:"Vervang Zoeken",replace_power:"Vervang Aan/Uit",replace_mute:"Vervang Dempen",replace_favorite:"Vervang Favoriet",not_triggerable:"Niet triggerbaar"},triggers:{none:"Geen",tap:"Tik",hold:"Vasthouden",double_tap:"Dubbeltik",swipe_left:"Veeg naar links",swipe_right:"Veeg naar rechts"},search_view_options:{list:"Lijst",card:"Kaart",card_minimal:"Minimale kaart"},queue_controls_style_options:{drag_handle:"Sleephandgreep",icons:"Bewegingsknoppen"},card_type_options:{default:"Standaard",search:"Zoeken",group_players:"Spelers groeperen",up_next:"Hierna",remote_control:"Afstandsbediening"},appearance_options:{automatic:"Automatisch",light:"Licht",dark:"Donker"},artwork_fit:{default:"Globaal",cover:"Cover (standaard)",contain:"Bevatten",fill:"Vullen","scale-down":"Verkleinen","scaled-contain":"Geschaalde contain","scaled-contain-alternate":"Geschaalde contain alternatief",none:"Geen"},artwork_position:{default:"Globaal",top:"Boven",center:"Midden",bottom:"Onder"},background_fit:{cover:"Bedekken",contain:"Passend maken",fill:"Vullen","scale-down":"Verkleinen",none:"Geen"},background_position:{center:"Midden",top:"Boven",bottom:"Onder","center left":"Midden links","center right":"Midden rechts","top left":"Boven links","top right":"Boven rechts","bottom left":"Onder links","bottom right":"Onder rechts"}},card:{sections:{details:"Details van 'Nu Spelen'",menu:"Menu & Zoekschermen",action_chips:"Actie Chips",lyrics:"Songtekst"},media_controls:{shuffle:"Shuffle",previous:"Vorige",play_pause:"Afspelen/Pauzeren",stop:"Stop",next:"Volgende",repeat:"Herhalen",lock_screen_ready:"Vergrendelschermbediening actief",lock_screen_connecting:"Vergrendelschermbediening verbinden..."},menu:{more_info:"Meer Info",search:"Zoeken",source:"Bron",remote_controls:"Afstandsbediening",show_lyrics:"Songtekst weergeven",hide_lyrics:"Songtekst verbergen",transfer_queue:"Wachtrij Overdragen",main_menu:"Hoofdmenu",group_players:"Spelers Groeperen",up_next:"Hierna",remote_control:"Afstandsbediening",select_entity:"Selecteer Entiteit voor Meer Info",transfer_to:"Wachtrij Overdragen Naar",no_players:"Geen andere Music Assistant spelers beschikbaar."},remote:{title:"Afstandsbediening",up:"Omhoog",down:"Omlaag",left:"Links",right:"Rechts",select:"Selecteren",back:"Terug",menu:"Menu",home:"Startscherm",power:"AAN/UIT"},grouping:{title:"Spelers Groeperen",sync_volume:"Volume Synchroniseren",group_all:"Alles Groeperen",ungroup_all:"Alles Loskoppelen",unavailable:"Speler is niet beschikbaar",no_players:"Geen andere spelers beschikbaar die kunnen groeperen.",master:"Master",joined:"Gekoppeld",available:"Beschikbaar",current:"Huidig",unjoin_from:"Loskoppelen van {master}",join_with:"Koppelen met {master}"}},search:{favorites:"Favorieten",recently_played:"Recent Afgespeeld",next_up:"Volgende",recommendations:"Aanbevelingen",radio_mode:"Radiomodus",show_track_options:"Nummeropties weergeven",play_similar:"Vergelijkbare nummers afspelen",close:"Zoeken Sluiten",no_results:"Geen resultaten.",play_next:"Volgende afspelen",replace_play:"Huidige wachtrij vervangen en nu afspelen",replace:"Wachtrij vervangen",add_queue:"Toevoegen aan einde van de wachtrij",move_up:"Omhoog verplaatsen",move_down:"Omlaag verplaatsen",move_next:"Als volgende afspelen",remove:"Verwijderen uit wachtrij",drag_to_reorder:"Sleep om te herordenen",added:"Toegevoegd aan wachtrij!",added_to_playlist:"Toegevoegd aan afspeellijst!",select_playlist:"Selecteer afspeellijst voor '{track}'",add_to_playlist:"Toevoegen aan afspeellijst",select_track_for_playlist:"Selecteer het nummer om toe te voegen voor '{track}' van {artist}",labels:{replace:"Vervangen",next:"Volgende",replace_next:"Vervang Volgende",add:"Toevoegen",add_to_playlist:"Toevoegen aan afspeellijst"},results:"resultaten",result:"resultaat",filters:{all:"Alles",artist:"Artiest",album:"Album",track:"Nummer",playlist:"Afspeellijst",radio:"Radio",music:"Muziek",station:"Zender",podcast:"Podcast",audiobook:"Luisterboek"},search_artist:"Blader door albums van deze artiest",browse_artist:"Albums van {artist} doorzoeken",search_album:"Blader door nummers van dit album",browse_album:"Tracks van {album} doorzoeken",browse_playlist:"Tracks van {playlist} doorzoeken",play_collection:"Speel deze collectie af",play_collection_error:"Kan deze collectie niet direct afspelen",play_item:"{item} afspelen"},lyrics:{finding:"Songteksten zoeken...",none_found:"Geen songteksten gevonden",not_available:"Songtekst niet beschikbaar",instrumental:"Instrumentale Track",admin_only_mass:"Songteksten ophalen via Music Assistant is alleen voor beheerders. Het wordt aanbevolen om in de kaartconfiguratie over te schakelen naar lrclib.",fallback_to_lrclib_non_admin:"Niet-beheerder gebruiker gedetecteerd. Terugvallen op lrclib voor het ophalen van songteksten."},lyrics_sources:{mass_lrclib:"Music Assistant (Terugval naar LRCLIB)",mass:"Alleen Music Assistant",lrclib:"Alleen LRCLIB",lrclib_mass:"LRCLIB (Terugval naar Music Assistant)"},lyrics_modes:{default:"Standaard (Markeren & scrollen)",scroll:"Alleen scrollen",text:"Alleen tekst"}},md={common:{not_found:"Entidade n\xE3o encontrada.",search:"Procurar",power:"Ligar/Desligar",favorite:"Favorito",loading:"A carregar...",no_results:"Sem resultados.",close:"Fechar",vol_up:"Aumentar volume",vol_down:"Diminuir volume",media_player:"Leitor multim\xE9dia",edit_entity:"Editar defini\xE7\xF5es da entidade",edit_action:"Editar defini\xE7\xF5es da a\xE7\xE3o",mute:"Silenciar",unmute:"Ativar som",seek:"Procurar",volume:"Volume",play_now:"Reproduzir agora",more_options:"Mais op\xE7\xF5es",unavailable:"Indispon\xEDvel",back:"Voltar",cancel:"Cancelar",reset_default:"Repor predefini\xE7\xF5es",unpin:"Desafixar",clear:"Limpar",album_art:"Capa do \xE1lbum"},editor:{tabs:{entities:"Entidades",behavior:"Comportamento",look_and_feel:"Aspeto",artwork:"Capa",actions:"A\xE7\xF5es"},search_placeholder:"Pesquisar op\xE7\xF5es de configura\xE7\xE3o...",template_label:"Modelo de cart\xE3o",templates:{custom:{label:"Personalizado (Configura\xE7\xE3o original)",description:"A sua configura\xE7\xE3o original totalmente personalizada."},large_modern:{label:"YAMP moderno e grande",description:"Um design moderno ligeiramente maior com controlos adaptativos."},crisp_clean:{label:"Limpo",description:"Um layout limpo com capa dimensionada e controlos modernos."},minimal_mini:{label:"MINImal",description:"Um cart\xE3o compacto sem capa."},normal_mini:{label:"Mini Mode",description:"O cart\xE3o compacto padr\xE3o."},quick_and_easy:{label:"Sem tempo a perder",description:"Concebido para rapidez com linhas de chips persistentes e agrupamento r\xE1pido."},dedicated_search:{label:"Tudo sobre pesquisa",description:"Um cart\xE3o de pesquisa aut\xF3nomo sem o leitor multim\xE9dia principal."},dedicated_grouping:{label:"Terapia de grupo",description:"Um cart\xE3o aut\xF3nomo de agrupamento de leitores. Requer v\xE1rias entidades configuradas."},huge_yamp:{label:"Isto \xE9 um enorme YAMP!",description:"Controlos maximizados, texto grande e barra de progresso maci\xE7a para visualiza\xE7\xE3o \xE0 dist\xE2ncia."}},placeholders:{search:"Procurar m\xFAsica..."},sections:{artwork:{general:{title:"Defini\xE7\xF5es gerais",description:"Controlos globais para a capa."},background:{title:"Imagem de fundo",description:"Configure uma imagem de fundo persistente para o cart\xE3o atr\xE1s do conte\xFAdo em reprodu\xE7\xE3o."},idle:{title:"Capa em repouso",description:"Mostrar imagem est\xE1tica quando nada toca."},overrides:{title:"Substitui\xE7\xF5es de capa",description:"As substitui\xE7\xF5es s\xE3o avaliadas de cima para baixo."}},entities:{title:"Entidades*",description:"Adicione os leitores a controlar."},behavior:{idle_chips:{title:"Repouso e chips",description:"Escolha quando ir para repouso."},interactions_search:{title:"Intera\xE7\xF5es e procura",description:"Ajuste a fixa\xE7\xE3o de entidades."},lyrics:{title:"Letras",description:"Configure como as letras s\xE3o exibidas e quando aparecem."}},look_and_feel:{theme_layout:{title:"Tema e design",description:"Combine com o estilo do dashboard."},controls_typography:{title:"Controlos e tipografia",description:"Ajuste bot\xF5es e etiquetas."},collapsed_idle:{title:"Estados contra\xEDdo e repouso",description:"Controle o contra\xEDdo do cart\xE3o."}},actions:{title:"A\xE7\xF5es",description:"Crie chips de a\xE7\xE3o."}},subtitles:{idle_timeout:"Tempo antes de repouso (ms). 0 para desativar.",show_chip_row:'"Auto" oculta a linha se houver apenas uma entidade. "No menu" move os chips. "No menu em repouso" mostra os chips em linha quando ativo mas move-os para o menu quando em repouso.',dim_chips:"Escurecer chips em repouso para um aspeto mais limpo.",hold_to_pin:"Manter premido para fixar em vez de toque curto.",always_show_group:"Os controles de agrupamento r\xE1pido (+/-/estrela) estar\xE3o vis\xEDveis por padr\xE3o ao carregar a p\xE1gina. Voc\xEA ainda pode altern\xE1-los manualmente atrav\xE9s de um toque duplo.",disable_autofocus:"Evitar que a procura tome o foco automaticamente.",search_within_filter:"Procurar no filtro ativo (Favoritos, etc.).",close_search_on_play:"Fechar procura ao reproduzir.",pin_search_headers:"Fixar cabe\xE7alhos de procura ao fazer scroll.",hide_search_headers_on_idle:"Ocultar pesquisa e filtros quando inativo.",disable_mass:"Desativar integra\xE7\xE3o Mass Queue.",swap_pause_stop:"Substituir pausa por stop no design moderno.",show_album:"Exibir o nome do \xE1lbum ao lado do artista nos detalhes do reprodutor.",lock_screen_controls:"Mantenha os controles e os metadados da faixa ativos na tela de bloqueio do seu dispositivo (iOS / Android / macOS) quando o aplicativo estiver em segundo plano. Nota: Esta funcionalidade \xE9 experimental.",toggle_media_session:"Nota: Os controlos de ecr\xE3 de bloqueio e sess\xE3o multim\xE9dia s\xE3o experimentais.",adaptive_controls:"Permitir que os bot\xF5es se adaptem ao espa\xE7o.",hide_menu_player:"Ocultar nome da entidade quando no menu.",hide_reorder_progress:"Ocultar o indicador flutuante de progresso de reordena\xE7\xE3o da fila na parte inferior.",adaptive_text:"Escolher que textos se adaptam ao espa\xE7o.",collapse_expand:"Sempre contra\xEDdo ativa modo mini. Expandir ao procurar expande temporariamente.",disable_mini_menu:"Reverter para listas padr\xE3o em vez de usar os novos mini menus em grade no modo 'Sempre recolhido'.",idle_screen:"Escolher ecr\xE3 a mostrar em repouso.",hide_controls:"Selecionar controlos a ocultar.",hide_remote_buttons:"Selecione bot\xF5es para ocultar do controle remoto.",hide_search_chips:"Ocultar chips de filtro de procura.",hide_active_entity_on_idle:"Oculta a etiqueta da entidade na parte inferior do cart\xE3o apenas quando o reprodutor est\xE1 inativo.",follow_active_entity:"A entidade de volume seguir\xE1 a ativa.",search_limit_full:"M\xE1ximo de resultados (default: 20).",default_search_filter_full:"Escolha qual filtro est\xE1 ativo por padr\xE3o quando a tela de pesquisa \xE9 aberta.",default_search_favorites:"Iniciar pesquisa com favoritos ativos",result_sorting_full:"Escolher ordem dos resultados.",card_height_full:"Deixar vazio para altura autom\xE1tica.",control_layout_full:"Escolher entre design antigo ou moderno.",artwork_extend:"Estender capa sob os chips.",artwork_extend_label:"Estender capa",no_artwork_overrides:"Sem substitui\xE7\xF5es de capa configuradas.",missing_art_match:"Aplica-se quando a m\xEDdia selecionada n\xE3o fornece arte.",idle_image_match:"Aplica-se quando o reprodutor est\xE1 inativo e uma imagem de inatividade est\xE1 sendo exibida.",entity_current_hint:"Use 'entity_id: current' para o leitor atual.",jinja_template_hint:"Modelo Jinja para entity_id.",jinja_template_vol_hint:"Modelo para entidade volume.",jinja_template_remote_hint:"Modelo Jinja que resolve um entity_id de controlo remoto (ex. remote.sala_tv):",not_available_alt_collapsed:"N\xE3o dispon\xEDvel em modo contra\xEDdo.",not_available_collapsed:"N\xE3o dispon\xEDvel se contra\xEDdo.",only_available_collapsed:"Apenas dispon\xEDvel se contra\xEDdo.",only_available_mini_menu:"Dispon\xEDvel apenas quando 'Sempre recolhido' \xE9 verdadeiro e 'Expandir na pesquisa' \xE9 falso",only_available_modern:"Apenas dispon\xEDvel com layout Moderno.",image_url_helper:"Insira um URL direto para uma imagem ou um caminho de arquivo local",selected_entity_helper:"Helper de texto de entrada que ser\xE1 atualizado com o ID da entidade do reprodutor de m\xEDdia selecionado no momento.",select_entity_helper:"Helper de texto de entrada do qual ler o ID da entidade. O cart\xE3o selecionar\xE1 automaticamente o chip correspondente.",sync_entity_type:"Escolha qual ID de entidade sincronizar com o helper (padr\xE3o entidade Music Assistant se configurada).",disable_auto_select:"Impede que o chip desta entidade seja selecionado automaticamente quando a reprodu\xE7\xE3o \xE9 iniciada.",search_view:"Escolha entre uma lista padr\xE3o ou uma grade de cart\xF5es para os resultados da pesquisa.",search_card_columns:"Especifique quantas colunas usar na visualiza\xE7\xE3o de cart\xF5es. A capa ser\xE1 redimensionada automaticamente.",card_type:"Escolha o modo do cart\xE3o. 'Padr\xE3o' \xE9 o reprodutor de m\xEDdia padr\xE3o. 'Busca dedicada' torna o cart\xE3o uma interface de busca permanente.",always_show_lyrics:"Abrir automaticamente a visualiza\xE7\xE3o de letras quando a p\xE1gina for atualizada.",lyrics_source:"O Music Assistant requer a integra\xE7\xE3o mass_queue para obter letras do seu motor de metadados interno.",lyrics_pre_roll:"Ajuste o tempo de destaque da letra. Valores positivos aceleram, valores negativos atrasam (padr\xE3o: 0).",lyrics_background_fade:"Ajuste o desvanecimento do fundo e a opacidade de atenua\xE7\xE3o da sobreposi\xE7\xE3o de letras (0% para arte transparente, 100% para fundo s\xF3lido).",blurred_artwork:"Sempre desfocar a imagem de fundo",hide_collapsed_artwork:"Ocultar a imagem pequena \xE0 direita quando o cart\xE3o estiver recolhido",disable_artwork_gradient:"Desativar o gradiente inferior sobreposto na capa",show_idle_artwork_when_not_playing:"Quando ativado, a sele\xE7\xE3o de uma ficha que n\xE3o esteja sendo reproduzida exibir\xE1 a imagem de repouso configurada em vez da imagem de reprodu\xE7\xE3o ativa.",prefer_ma_metadata:"Utilizar sempre a entidade Music Assistant emparelhada para o t\xEDtulo da faixa, artista e arte, mesmo que a entidade prim\xE1ria esteja a ser reproduzida.",show_volume_overlay:"Exibe brevemente um indicador de volume grande sobre a arte quando o n\xEDvel de volume muda.",font_color_helper:"Personalize as cores do texto e dos \xEDcones. Aceita hexadecimal, nomes CSS, rgba ou modelos (padr\xE3o: cor do tema).",queue_controls_style:"Escolha se deseja mostrar uma al\xE7a de arrastar ou bot\xF5es de movimento individuais para itens da fila."},titles:{edit_entity:"Editar entidade",edit_action:"Editar a\xE7\xE3o",service_data:"Dados do servi\xE7o",add_artwork_override:"Adicionar substitui\xE7\xE3o"},labels:{toggle_template_mode:"Alternar modo de modelo",dim_chips:"Escurecer chips em repouso",hold_to_pin:"Manter para fixar",always_show_group:"Grupo r\xE1pido por padr\xE3o",disable_autofocus:"Desativar autofoco",keep_filters:"Manter filtros",dismiss_on_play:"Fechar ao reproduzir",pin_headers:"Fixar cabe\xE7alhos",hide_search_headers_on_idle:"Ocultar cabe\xE7alhos em inatividade",default_search_filter:"Filtro de pesquisa padr\xE3o",default_search_favorites:"Filtro de favoritos padr\xE3o",disable_mass:"Desativar Mass Queue",match_theme:"Seguir tema",alt_progress:"Barra de progresso alternativa",progress_bar_height:"Altura da barra de progresso",display_timestamps:"Mostrar carimbos de tempo",swap_pause_stop:"Substituir Pausa por Stop",show_album:"Mostrar nome do \xE1lbum",lock_screen_controls:"Controles de m\xEDdia na tela de bloqueio (Experimental)",adaptive_controls:"Tamanho adaptativo",hide_active_entity:"Ocultar nome da entidade ativa",hide_active_entity_on_idle:"Ocultar etiqueta de entidade ativa quando inativo",collapse_on_idle:"Contrair em repouso",hide_menu_player_toggle:"Ocultar leitor do menu",hide_reorder_progress_toggle:"Ocultar progresso de reordena\xE7\xE3o",always_collapsed:"Sempre contra\xEDdo",disable_mini_menu:"Desativar mini menus em grade",expand_on_search:"Expandir ao procurar",script_var:"Vari\xE1vel script (yamp_entity)",use_ma_template:"Usar modelo MA",use_vol_template:"Usar modelo Volume",follow_active_entity:"Volume segue a entidade ativa",use_url_path:"Usar URL ou caminho",adaptive_text_elements:"Elementos de texto adaptativo",disable_auto_select:"Desativar sele\xE7\xE3o autom\xE1tica",always_show_lyrics:"Mostrar sempre as letras",lyrics_mode:"Modo de letras",lyrics_source:"Fonte das letras",lyrics_pre_roll:"Antecipa\xE7\xE3o de letra (segundos)",lyrics_background_fade:"Desvanecimento de fundo de letras",blurred_artwork:"Imagem desfocada",hide_collapsed_artwork:"Ocultar imagem reduzida",disable_artwork_gradient:"Desativar gradiente da capa",show_idle_artwork_when_not_playing:"Mostrar imagem de repouso quando n\xE3o reproduzindo",prefer_ma_metadata:"Preferir metadados do Music Assistant",show_volume_overlay:"Mostrar sobreposi\xE7\xE3o de volume"},fields:{artwork_fit:"Ajuste",artwork_position:"Posi\xE7\xE3o",artwork_hostname:"Host",match_field:"Campo",match_value:"Valor",size_percent:"Tamanho (%)",object_fit:"Object Fit",idle_timeout:"Repouso (ms)",show_chip_row:"Mostrar chips",search_limit:"Limite de procura",result_sorting:"Ordem",vol_step:"Passo de volume",card_height:"Altura (px)",control_layout:"Design",idle_image:"Imagem de inatividade",background_image:"Imagem de fundo",background_image_entity:"Entidade da imagem de fundo",font_color:"Cor da fonte",font_color_entity:"Cor da fonte",background_position:"Posi\xE7\xE3o do fundo",background_fit:"Ajuste do fundo",image_url:"URL imagem",fallback_image_url:"URL de reserva",move_to_main:"Mover para chips principais",move_to_menu:"Mover para o menu",delete_action:"Eliminar a\xE7\xE3o",volume_mode:"Modo volume",idle_screen:"Ecr\xE3 de repouso",name:"Nome",hidden_controls:"Controlos ocultos",hide_remote_buttons:"Bot\xF5es do controle remoto ocultos",ma_template:"Modelo MA (Jinja)",hidden_chips:"Chips ocultos",vol_template:"Modelo Volume (Jinja)",icon:"\xCDcone",action_type:"Tipo de a\xE7\xE3o",menu_item:"Item de menu",nav_path:"Caminho",service:"Servi\xE7o",service_data:"Dados",idle_image_entity:"Entidade imagem repouso",match_entity:"Entidade",ma_entity:"Entidade Music Assistant",vol_entity:"Entidade de volume",remote_entity:"Entidade de controlo remoto",remote_template:"Modelo de entidade remota (Jinja)",selected_entity_helper:"Helper de entidade selecionada",sync_entity_type:"Tipo de entidade a sincronizar",placement:"Posicionamento",card_trigger:"Gatilho do cart\xE3o",search_view:"Vista de resultados de pesquisa",search_card_columns:"Colunas de cart\xF5es",card_type:"Tipo de cart\xE3o",appearance:"Apar\xEAncia",no_artwork_option:"Sem imagem",details_alignment:"Alinhamento de detalhes",lyrics_background_fade:"Desvanecimento de fundo de letras (%)",queue_controls_style:"Estilo de controles de fila"},action_types:{menu:"Abrir um item do menu",service:"Chamar um servi\xE7o",navigate:"Navegar",prev_entity:"Chip da entidade anterior",next_entity:"Chip da pr\xF3xima entidade",sync_selected_entity:"Sincronizar entidade selecionada",select_entity:"Selecionar entidade do helper",toggle_lyrics:"Alternar sobreposi\xE7\xE3o de letras",remote_control:"Abrir sobreposi\xE7\xE3o do controlo remoto",toggle_media_session:"Alternar sess\xE3o de multim\xE9dia / controlos de ecr\xE3 de bloqueio (Experimental)"},action_helpers:{sync_selected_entity:"Sincronizar entidade selecionada \u2192",select_entity:"Selecionar entidade \u2190",select_helper:"(selecionar helper)"},sync_entity_options:{yamp_entity:"yamp_entity (Entidade Music Assistant se configurada)",yamp_main_entity:"yamp_main_entity (Entidade principal do reprodutor)",yamp_playback_entity:"yamp_playback_entity (Entidade de reprodu\xE7\xE3o ativa atual)"},placements:{chip:"Chip de a\xE7\xE3o",menu:"No menu",hidden:"Oculto (Toque no Artwork)",replace_search:"Substituir Pesquisa",replace_power:"Substituir Energia",replace_mute:"Substituir Mudo",replace_favorite:"Substituir Favorito",not_triggerable:"N\xE3o acion\xE1vel"},triggers:{none:"Nenhum",tap:"Toque",hold:"Manter premido",double_tap:"Toque duplo",swipe_left:"Deslizar para a esquerda",swipe_right:"Deslizar para a direita"},search_view_options:{list:"Lista",card:"Cart\xE3o",card_minimal:"Cart\xE3o minimalista"},queue_controls_style_options:{drag_handle:"Al\xE7a de arrastar",icons:"Bot\xF5es de movimento"},card_type_options:{default:"Padr\xE3o",search:"Procurar",group_players:"Agrupar",up_next:"A seguir",remote_control:"Controle Remoto"},appearance_options:{automatic:"Autom\xE1tico",light:"Claro",dark:"Escuro"},artwork_fit:{default:"Global",cover:"Capa (padr\xE3o)",contain:"Conter",fill:"Preencher","scale-down":"Reduzir","scaled-contain":"Conter dimensionado","scaled-contain-alternate":"Conter dimensionado alternativo",none:"Nenhum"},artwork_position:{default:"Global",top:"Topo",center:"Centro",bottom:"Inferior"},background_fit:{cover:"Cobrir",contain:"Conter",fill:"Preencher","scale-down":"Reduzir escala",none:"Nenhum"},background_position:{center:"Centro",top:"Topo",bottom:"Fundo","center left":"Centro esquerda","center right":"Centro direita","top left":"Topo esquerda","top right":"Topo direita","bottom left":"Fundo esquerda","bottom right":"Fundo direita"}},card:{sections:{details:"Detalhes de reprodu\xE7\xE3o",menu:"Menu e Procura",action_chips:"Chips de a\xE7\xE3o",lyrics:"Letras"},media_controls:{shuffle:"Aleat\xF3rio",previous:"Anterior",play_pause:"Reproduzir/Pausa",stop:"Parar",next:"Seguinte",repeat:"Repetir",lock_screen_ready:"Controlos do ecr\xE3 de bloqueio ativos",lock_screen_connecting:"A ligar os controlos do ecr\xE3 de bloqueio..."},menu:{more_info:"Mais info",search:"Procurar",source:"Fonte",remote_controls:"Controlo remoto",show_lyrics:"Mostrar letras",hide_lyrics:"Ocultar letras",transfer_queue:"Transferir fila",main_menu:"Menu Principal",group_players:"Agrupar",up_next:"A seguir",remote_control:"Controle Remoto",select_entity:"Selecionar",transfer_to:"Transferir para",no_players:"Sem leitores MA."},remote:{title:"Controlo remoto",up:"Para cima",down:"Para baixo",left:"Esquerda",right:"Direita",select:"Selecionar",back:"Voltar",menu:"Menu",home:"In\xEDcio",power:"Ligar/Desligar"},grouping:{title:"Agrupar",sync_volume:"Sincronizar volume",group_all:"Agrupar todos",ungroup_all:"Separar todos",unavailable:"Indispon\xEDvel",no_players:"N\xE3o agrup\xE1vel.",master:"Mestre",joined:"Unido",available:"Dispon\xEDvel",current:"Atual",unjoin_from:"Desvincular de {master}",join_with:"Juntar-se a {master}"}},search:{favorites:"Favoritos",recently_played:"Recentes",next_up:"A seguir",recommendations:"Recomenda\xE7\xF5es",radio_mode:"Modo R\xE1dio",show_track_options:"Mostrar op\xE7\xF5es da faixa",play_similar:"Tocar m\xFAsicas semelhantes",close:"Fechar",no_results:"Sem resultados.",play_next:"Reproduzir seguinte",replace_play:"Substituir e reproduzir",replace:"Substituir fila",add_queue:"Adicionar ao fim",move_up:"Subir",move_down:"Descer",move_next:"Passar para seguinte",remove:"Remover da fila",drag_to_reorder:"Arrastar para reordenar",added:"Adicionado!",added_to_playlist:"Adicionado \xE0 playlist!",select_playlist:"Selecionar playlist para '{track}'",add_to_playlist:"Adicionar \xE0 playlist",select_track_for_playlist:"Selecionar a faixa a adicionar para '{track}' de {artist}",labels:{replace:"Substituir",next:"Seguinte",replace_next:"Subst. seg.",add:"Adicionar",add_to_playlist:"Adicionar \xE0 playlist"},results:"resultados",result:"resultado",filters:{all:"Tudo",artist:"Artista",album:"\xC1lbum",track:"Faixa",playlist:"Lista",radio:"R\xE1dio",music:"M\xFAsica",station:"Esta\xE7\xE3o",podcast:"Podcast",audiobook:"Audiolivro"},search_artist:"Navegar pelos \xE1lbuns deste artista",browse_artist:"Explorar \xE1lbuns de {artist}",search_album:"Navegar pelas faixas deste \xE1lbum",browse_album:"Explorar faixas de {album}",browse_playlist:"Explorar faixas de {playlist}",play_collection:"Reproduzir esta cole\xE7\xE3o",play_collection_error:"N\xE3o \xE9 poss\xEDvel reproduzir esta cole\xE7\xE3o diretamente",play_item:"Reproduzir {item}"},lyrics:{finding:"Procurando letra...",none_found:"Nenhuma letra encontrada",not_available:"Letra n\xE3o dispon\xEDvel",instrumental:"Faixa Instrumental",admin_only_mass:"A busca de letras pelo Music Assistant \xE9 apenas para usu\xE1rios administradores. Recomenda-se mudar para lrclib na configura\xE7\xE3o do cart\xE3o.",fallback_to_lrclib_non_admin:"Usu\xE1rio n\xE3o administrador detectado. Usando lrclib como alternativa para buscar as letras."},lyrics_sources:{mass_lrclib:"Music Assistant (Alternativa para LRCLIB)",mass:"Apenas Music Assistant",lrclib:"Apenas LRCLIB",lrclib_mass:"LRCLIB (Alternativa para Music Assistant)"},lyrics_modes:{default:"Padr\xE3o (Destacar e rolar)",scroll:"Apenas rolar",text:"Apenas texto"}},gd={common:{not_found:"Entita sa nena\u0161la.",search:"H\u013Eada\u0165",power:"Nap\xE1janie",favorite:"Ob\u013E\xFAben\xE9",loading:"Na\u010D\xEDtava sa...",no_results:"\u017Diadne v\xFDsledky.",close:"Zatvori\u0165",vol_up:"Zv\xFD\u0161i\u0165 hlasitos\u0165",vol_down:"Zn\xED\u017Ei\u0165 hlasitos\u0165",media_player:"Prehr\xE1va\u010D m\xE9di\xED",edit_entity:"Upravi\u0165 nastavenia entity",edit_action:"Upravi\u0165 nastavenia akcie",mute:"Stlmi\u0165",unmute:"Zru\u0161i\u0165 stlmenie",seek:"Posun\xFA\u0165",volume:"Hlasitos\u0165",play_now:"Prehra\u0165 teraz",more_options:"Viac mo\u017Enost\xED",unavailable:"Nedostupn\xE9",back:"Sp\xE4\u0165",cancel:"Zru\u0161i\u0165",reset_default:"Obnovi\u0165 predvolen\xE9",unpin:"Odpn\xFA\u0165",clear:"Vymaza\u0165",album_art:"Grafika albumu"},editor:{tabs:{entities:"Entity",behavior:"Spr\xE1vanie",look_and_feel:"Vzh\u013Ead a dojem",artwork:"Grafika",actions:"Akcie"},search_placeholder:"Vyh\u013Eada\u0165 mo\u017Enosti konfigur\xE1cie...",template_label:"\u0160abl\xF3na karty",templates:{custom:{label:"Vlastn\xE9 (P\xF4vodn\xE1 konfigur\xE1cia)",description:"Va\u0161a p\xF4vodn\xE1, plne prisp\xF4soben\xE1 konfigur\xE1cia."},large_modern:{label:"Ve\u013Ek\xFD modern\xFD YAMP",description:"O nie\u010Do v\xE4\u010D\u0161\xED modern\xFD dizajn s adapt\xEDvnymi ovl\xE1dac\xEDmi prvkami."},crisp_clean:{label:"\u010Cist\xFD",description:"\u010Cist\xE9 rozlo\u017Eenie s prisp\xF4soben\xFDm obalom a modern\xFDmi ovl\xE1dac\xEDmi prvkami."},minimal_mini:{label:"MINImal",description:"Kompaktn\xE1 karta bez obalu."},normal_mini:{label:"Mini Mode",description:"\u0160tandardn\xE1 kompaktn\xE1 karta."},quick_and_easy:{label:"Niet \u010Dasu na vysvet\u013Eovanie",description:"Navrhnut\xE9 pre r\xFDchlos\u0165 s trval\xFDmi riadkami \u010Dipov a r\xFDchlym zoskupovan\xEDm."},dedicated_search:{label:"V\u0161etko o vyh\u013Ead\xE1van\xED",description:"Samostatn\xE1 vyh\u013Ead\xE1vacia karta bez hlavn\xE9ho prehr\xE1va\u010Da m\xE9di\xED."},dedicated_grouping:{label:"Skupinov\xE1 terapia",description:"Samostatn\xE1 karta na zoskupovanie prehr\xE1va\u010Dov. Vy\u017Eaduje viacero nakonfigurovan\xFDch ent\xEDt."},huge_yamp:{label:"To je poriadny YAMP!",description:"Maximalizovan\xE9 ovl\xE1dacie prvky, ve\u013Ek\xFD text a mas\xEDvny indik\xE1tor priebehu pre sledovanie z dia\u013Eky."}},placeholders:{search:"H\u013Eada\u0165 hudbu..."},sections:{artwork:{general:{title:"V\u0161eobecn\xE9 nastavenia",description:"Glob\xE1lne ovl\xE1danie toho, ako sa grafika zobrazuje a z\xEDskava."},background:{title:"Obr\xE1zok pozadia",description:"Nakonfigurujte trval\xFD obr\xE1zok pozadia pre kartu za obsahom prehr\xE1vania."},idle:{title:"Grafika pri ne\u010Dinnosti",description:"Zobrazi\u0165 statick\xFD obr\xE1zok alebo sn\xEDmku entity, ke\u010F sa ni\u010D neprehr\xE1va."},overrides:{title:"Prep\xEDsania grafiky",description:"Prep\xEDsania sa vyhodnocuj\xFA zhora nadol. Poradie zmen\xEDte potiahnut\xEDm."}},entities:{title:"Entity*",description:"Pridajte prehr\xE1va\u010De m\xE9di\xED, ktor\xE9 chcete ovl\xE1da\u0165. Potiahnut\xEDm ent\xEDt zmen\xEDte poradie v riadku \u010Dipov."},behavior:{idle_chips:{title:"Ne\u010Dinnos\u0165 a \u010Dipy",description:"Vyberte, kedy karta prejde do ne\u010Dinnosti a ako sa spr\xE1vaj\xFA \u010Dipy ent\xEDt."},interactions_search:{title:"Interakcie a h\u013Eadanie",description:"Doladenie prip\xEDnania ent\xEDt a po\u010Dtu zobrazen\xFDch v\xFDsledkov."},lyrics:{title:"Texty piesn\xED",description:"Nastavte, ako sa maj\xFA texty piesn\xED zobrazova\u0165 a kedy sa maj\xFA objavi\u0165."}},look_and_feel:{theme_layout:{title:"T\xE9ma a rozlo\u017Eenie",description:"Prisp\xF4sobte \u0161t\xFDl panelu a ovl\xE1dajte celkov\xFD vzh\u013Ead."},controls_typography:{title:"Ovl\xE1danie a typografia",description:"Nastavenie ve\u013Ekosti tla\u010Didiel, \u0161t\xEDtkov ent\xEDt a adapt\xEDvneho textu."},collapsed_idle:{title:"Zbalen\xE9 stavy a ne\u010Dinnos\u0165",description:"Ovl\xE1dajte, kedy sa karta zbal\xED a ktor\xE9 zobrazenia sa uk\xE1\u017Eu po\u010Das ne\u010Dinnosti."}},actions:{title:"Akcie",description:"Vytvorte ak\u010Dn\xE9 \u010Dipy, ktor\xE9 sa zobrazia na karte alebo v jej menu. Potiahnut\xEDm zmen\xEDte poradie, kliknut\xEDm na ceruzku akciu nakonfigurujete."}},subtitles:{idle_timeout:"\u010Cas v milisekund\xE1ch, k\xFDm karta prejde do re\u017Eimu ne\u010Dinnosti. Nastavte na 0 pre vypnutie.",show_chip_row:'"Auto" skryje riadok \u010Dipov, ak je nakonfigurovan\xE1 len jedna entita. "V menu" presunie \u010Dipy do ponuky menu. "V menu pri ne\u010Dinnosti" zobraz\xED \u010Dipy v riadku ke\u010F je akt\xEDvne, ale presunie ich do menu pri ne\u010Dinnosti.',dim_chips:"Ke\u010F karta prejde do re\u017Eimu ne\u010Dinnosti s obr\xE1zkom, stlmte \u010Dipy ent\xEDt a akci\xED pre \u010Distej\u0161\xED vzh\u013Ead.",hold_to_pin:"Dlh\xFDm stla\u010Den\xEDm \u010Dipov ent\xEDt ich pripnete, \u010D\xEDm zabr\xE1nite automatick\xE9mu prep\xEDnaniu po\u010Das prehr\xE1vania.",always_show_group:"Ovl\xE1dacie prvky r\xFDchleho zoskupovania (+/-/hviezdi\u010Dka) bud\xFA predvolene vidite\u013En\xE9 pri na\u010D\xEDtan\xED str\xE1nky. St\xE1le ich m\xF4\u017Eete manu\xE1lne prep\xEDna\u0165 dvojit\xFDm klepnut\xEDm.",disable_autofocus:"Zabr\xE1ni vyh\u013Ead\xE1vaciemu po\u013Eu prebra\u0165 zameranie, aby zostali kl\xE1vesnice na obrazovke skryt\xE9.",search_within_filter:"Povoli\u0165 vyh\u013Ead\xE1vanie v r\xE1mci aktu\xE1lneho akt\xEDvneho filtra (Ob\u013E\xFAben\xE9, Ned\xE1vno prehr\xE1van\xE9 at\u010F.) namiesto jeho vymazania.",close_search_on_play:"Automaticky zatvori\u0165 obrazovku vyh\u013Ead\xE1vania po spusten\xED skladby.",pin_search_headers:"Ponecha\u0165 pole vyh\u013Ead\xE1vania a filtre pevne navrchu po\u010Das pos\xFAvania v\xFDsledkov.",hide_search_headers_on_idle:"Skry\u0165 vyh\u013Ead\xE1vanie a filtre, ke\u010F je prehr\xE1va\u010D ne\u010Dinn\xFD.",disable_mass:"Deaktivova\u0165 volite\u013En\xFA integr\xE1ciu Mass Queue, aj ke\u010F je nain\u0161talovan\xE1.",swap_pause_stop:"Nahradi\u0165 tla\u010Didlo pauzy tla\u010Didlom zastavenia pri pou\u017Eit\xED modern\xE9ho rozlo\u017Eenia.",show_album:"Zobrazi\u0165 n\xE1zov albumu ved\u013Ea interpreta v podrobnostiach prehr\xE1va\u010Da.",lock_screen_controls:"Ponechajte ovl\xE1dacie prvky a metad\xE1ta stopy akt\xEDvne na uzamknutej obrazovke v\xE1\u0161ho zariadenia (iOS / Android / macOS), ke\u010F je aplik\xE1cia na pozad\xED. Pozn\xE1mka: T\xE1to funkcia je experiment\xE1lna.",toggle_media_session:"Pozn\xE1mka: Ovl\xE1dacie prvky uzamknutej obrazovky a rel\xE1cie m\xE9di\xED s\xFA experiment\xE1lne.",adaptive_controls:"Umo\u017Eni\u0165 tla\u010Didl\xE1m prehr\xE1vania meni\u0165 ve\u013Ekos\u0165 pod\u013Ea dostupn\xE9ho priestoru.",hide_menu_player:"Ke\u010F s\xFA \u010Dipy v menu, skry\u0165 n\xE1zov entity v spodnej \u010Dasti karty.",hide_reorder_progress:"Skry\u0165 pl\xE1vaj\xFAci indik\xE1tor priebehu preusporiadania frontu v spodnej \u010Dasti.",adaptive_text:"Vyberte skupiny textu, ktor\xE9 sa maj\xFA \u0161k\xE1lova\u0165 pod\u013Ea priestoru (nechajte pr\xE1zdne pre vypnutie).",collapse_expand:'"V\u017Edy zbalen\xE9" vytvor\xED re\u017Eim mini prehr\xE1va\u010Da. "Rozbali\u0165 pri h\u013Eadan\xED" kartu do\u010Dasne rozbal\xED pri vyh\u013Ead\xE1van\xED.',disable_mini_menu:"N\xE1vrat k \u0161tandardn\xFDm zoznamom namiesto pou\u017Eitia nov\xFDch mini mrie\u017Ekov\xFDch pon\xFAk v re\u017Eime 'V\u017Edy zbalen\xE9'.",idle_screen:"Vyberte obrazovku, ktor\xE1 sa m\xE1 automaticky zobrazi\u0165 v re\u017Eime ne\u010Dinnosti.",hide_controls:"Vyberte ovl\xE1dacie prvky, ktor\xE9 chcete pre t\xFAto entitu skry\u0165 (\u0161tandardne s\xFA zobrazen\xE9 v\u0161etky).",hide_remote_buttons:"Vyberte tla\u010Didl\xE1, ktor\xE9 chcete skry\u0165 v prekryt\xED dia\u013Ekov\xE9ho ovl\xE1dania.",hide_search_chips:"Skry\u0165 konkr\xE9tne \u010Dipy filtra vyh\u013Ead\xE1vania pre t\xFAto entitu.",hide_active_entity_on_idle:"Skryje \u0161t\xEDtok entity v dolnej \u010Dasti karty iba vtedy, ke\u010F je prehr\xE1va\u010D ne\u010Dinn\xFD.",follow_active_entity:"Ak je povolen\xE9, entita hlasitosti bude automaticky sledova\u0165 akt\xEDvny prehr\xE1va\u010D. Pozn\xE1mka: Toto prep\xED\u0161e vybran\xFA entitu hlasitosti.",search_limit_full:"Maxim\xE1lny po\u010Det v\xFDsledkov vyh\u013Ead\xE1vania (predvolen\xE9: 20).",default_search_filter_full:"Vyberte, ktor\xFD filter bude predvolene akt\xEDvny pri otvoren\xED vyh\u013Ead\xE1vania.",default_search_favorites:"Spusti\u0165 vyh\u013Ead\xE1vanie s akt\xEDvnymi ob\u013E\xFAben\xFDmi",result_sorting_full:"Vyberte sp\xF4sob zoradenia v\xFDsledkov. Predvolen\xE9 ponech\xE1va poradie zo zdroja.",card_height_full:"Nechajte pr\xE1zdne pre automatick\xFA v\xFD\u0161ku.",control_layout_full:"Vyberte si medzi star\u0161\xEDm (rovnako ve\u013Ek\xE9 prvky) alebo modern\xFDm rozlo\u017Een\xEDm Home Assistant.",artwork_extend:"Umo\u017Eni\u0165 pozadiu grafiky pokra\u010Dova\u0165 pod riadkami \u010Dipov a akci\xED.",artwork_extend_label:"Roz\u0161\xEDri\u0165 grafiku",no_artwork_overrides:"Nie s\xFA nastaven\xE9 \u017Eiadne prep\xEDsania grafiky. Pridajte ich pomocou tla\u010Didla plus.",missing_art_match:"Plat\xED, ke\u010F vybrat\xE9 m\xE9di\xE1 neposkytuj\xFA \u017Eiadny obr\xE1zok.",idle_image_match:"Plat\xED, ke\u010F je prehr\xE1va\u010D ne\u010Dinn\xFD a zobrazuje sa obr\xE1zok ne\u010Dinnosti.",entity_current_hint:"Pou\u017Eite 'entity_id: current' na zacielenie aktu\xE1lne vybranej entity na karte.",jinja_template_hint:"Zadajte Jinja \u0161abl\xF3nu, ktor\xE1 vr\xE1ti jedno entity_id. Pr\xEDklad prep\xEDnania MA na z\xE1klade v\xFDberu zdroja:",jinja_template_vol_hint:"Zadajte Jinja \u0161abl\xF3nu, ktor\xE1 vr\xE1ti entity_id (napr. media_player.obyvacka). Pr\xEDklad prep\xEDnania hlasitosti pod\u013Ea stavu:",jinja_template_remote_hint:"Zadajte Jinja \u0161abl\xF3nu, ktor\xE1 vr\xE1ti entity_id dia\u013Ekov\xE9ho ovl\xE1da\u010Da (napr. remote.obyvacka_tv):",not_available_alt_collapsed:"Nedostupn\xE9 s alternat\xEDvnym indik\xE1torom priebehu alebo v re\u017Eime V\u017Edy zbalen\xE9.",not_available_collapsed:"Nedostupn\xE9, ke\u010F je zapnut\xE9 V\u017Edy zbalen\xE9.",only_available_collapsed:"Dostupn\xE9 len pri zapnutom re\u017Eime V\u017Edy zbalen\xE9.",only_available_mini_menu:"K dispoz\xEDcii iba vtedy, ke\u010F je 'V\u017Edy zbalen\xE9' zapnut\xE9 a 'Rozbali\u0165 pri vyh\u013Ead\xE1van\xED' vypnut\xE9",only_available_modern:"Dostupn\xE9 len s modern\xFDm rozlo\u017Een\xEDm.",image_url_helper:"Zadajte priamu URL na obr\xE1zok alebo lok\xE1lnu cestu k s\xFAboru",selected_entity_helper:"Pomocn\xEDk pre vstupn\xFD text, ktor\xFD bude aktualizovan\xFD o ID aktu\xE1lne vybranej entity prehr\xE1va\u010Da m\xE9di\xED.",select_entity_helper:"Pomocn\xEDk pre vstupn\xFD text, z ktor\xE9ho sa \u010D\xEDta ID entity. Karta automaticky vyberie zodpovedaj\xFAci \u010Dip.",sync_entity_type:"Vyberte, ktor\xE9 ID entity sa m\xE1 synchronizova\u0165 s pomocn\xEDkom (predvolene entita Music Assistant, ak je nakonfigurovan\xE1).",disable_auto_select:"Zabr\xE1ni automatick\xE9mu v\xFDberu \u010Dipu tejto entity pri spusten\xED prehr\xE1vania.",search_view:"Vyberte si medzi \u0161tandardn\xFDm zoznamom alebo mrie\u017Ekou kariet pre v\xFDsledky vyh\u013Ead\xE1vania.",search_card_columns:"Zadajte, ko\u013Eko st\u013Apcov sa m\xE1 pou\u017Ei\u0165 v zobrazen\xED karty. Grafika sa automaticky prisp\xF4sob\xED.",card_type:"Vyberte re\u017Eim karty. 'Predvolen\xE9' je \u0161tandardn\xFD prehr\xE1va\u010D m\xE9di\xED. 'Vyhraden\xE9 vyh\u013Ead\xE1vanie' urob\xED z karty trval\xE9 rozhranie na vyh\u013Ead\xE1vanie.",always_show_lyrics:"Automaticky otvori\u0165 zobrazenie textov piesn\xED pri obnoven\xED str\xE1nky.",lyrics_source:"Music Assistant vy\u017Eaduje integr\xE1ciu mass_queue na na\u010D\xEDtanie textov z jeho intern\xE9ho metad\xE1tov\xE9ho modulu.",lyrics_pre_roll:"Posunutie na\u010Dasovania zv\xFDraznenia textu piesne. Kladn\xE9 hodnoty ho zr\xFDch\u013Euj\xFA, z\xE1porn\xE9 spoma\u013Euj\xFA (predvolen\xE9: 0).",lyrics_background_fade:"Upravte prel\xEDnanie pozadia a neprieh\u013Eadnos\u0165 stmavenia prekrytia textu piesne (0% pre prieh\u013Eadn\xFD obr\xE1zok, 100% pre pln\xE9 pozadie).",blurred_artwork:"V\u017Edy rozmaza\u0165 obr\xE1zok na pozad\xED",hide_collapsed_artwork:"Skry\u0165 mal\xFD obr\xE1zok vpravo, ke\u010F je karta zbalen\xE1",disable_artwork_gradient:"Zak\xE1za\u0165 prekrytie spodn\xE9ho prechodu na obr\xE1zku",show_idle_artwork_when_not_playing:"Ke\u010F je t\xE1to mo\u017Enos\u0165 povolen\xE1, pri v\xFDbere \u010Dipu, na ktorom sa moment\xE1lne ni\u010D neprehr\xE1va, sa namiesto akt\xEDvnej grafiky prehr\xE1vania zobraz\xED nakonfigurovan\xFD obr\xE1zok pri ne\u010Dinnosti.",prefer_ma_metadata:"V\u017Edy pou\u017E\xEDvajte sp\xE1rovan\xFA entitu Music Assistant pre n\xE1zov skladby, interpreta a grafiku, aj ke\u010F sa prehr\xE1va prim\xE1rna entita.",show_volume_overlay:"Pri zmene \xFArovne hlasitosti nakr\xE1tko zobraz\xED ve\u013Ek\xFD ukazovate\u013E hlasitosti cez grafiku albumu.",font_color_helper:"Prisp\xF4sobte farby textu a ikon. Prij\xEDma hex, n\xE1zvy CSS, rgba alebo \u0161abl\xF3ny (predvolen\xE9: farba mot\xEDvu).",queue_controls_style:"Vyberte, \u010Di sa m\xE1 pre polo\u017Eky fronty zobrazi\u0165 \xFAchyt na \u0165ahanie alebo jednotliv\xE9 tla\u010Didl\xE1 pohybu."},titles:{edit_entity:"Upravi\u0165 entitu",edit_action:"Upravi\u0165 akciu",service_data:"Servisn\xE9 \xFAdaje",add_artwork_override:"Prida\u0165 prep\xEDsanie grafiky"},labels:{toggle_template_mode:"Prepn\xFA\u0165 re\u017Eim \u0161abl\xF3ny",dim_chips:"Stlmi\u0165 \u010Dipy pri ne\u010Dinnosti",hold_to_pin:"Podr\u017Ea\u0165 pre pripnutie",always_show_group:"R\xFDchle zoskupovanie ako predvolen\xE9",disable_autofocus:"Vypn\xFA\u0165 automatick\xE9 zameranie h\u013Eadania",keep_filters:"Zachova\u0165 filtre pri h\u013Eadan\xED",dismiss_on_play:"Zavrie\u0165 h\u013Eadanie po spusten\xED",pin_headers:"Pripn\xFA\u0165 hlavi\u010Dky h\u013Eadania",hide_search_headers_on_idle:"Skry\u0165 hlavi\u010Dky pri ne\u010Dinnosti",default_search_filter:"Predvolen\xFD filter vyh\u013Ead\xE1vania",default_search_favorites:"Predvolen\xFD filter ob\u013E\xFAben\xFDch",disable_mass:"Deaktivova\u0165 Mass Queue",match_theme:"Pod\u013Ea t\xE9my",alt_progress:"Alternat\xEDvny indik\xE1tor priebehu",progress_bar_height:"V\xFD\u0161ka indik\xE1tora priebehu",display_timestamps:"Zobrazi\u0165 \u010Dasov\xE9 \xFAdaje",swap_pause_stop:"Vymeni\u0165 pauzu za stop",show_album:"Zobrazi\u0165 n\xE1zov albumu",lock_screen_controls:"Ovl\xE1dacie prvky m\xE9di\xED na uzamknutej obrazovke (Experiment\xE1lne)",adaptive_controls:"Adapt\xEDvna ve\u013Ekos\u0165 ovl\xE1dania",hide_active_entity:"Skry\u0165 \u0161t\xEDtok akt\xEDvnej entity",hide_active_entity_on_idle:"Skry\u0165 \u0161t\xEDtok akt\xEDvnej entity pri ne\u010Dinnosti",collapse_on_idle:"Zbali\u0165 pri ne\u010Dinnosti",hide_menu_player_toggle:"Skry\u0165 prehr\xE1va\u010D v menu",hide_reorder_progress_toggle:"Skry\u0165 priebeh preusporiadania",always_collapsed:"V\u017Edy zbalen\xE9",disable_mini_menu:"Vypn\xFA\u0165 mini mrie\u017Ekov\xE9 ponuky",expand_on_search:"Rozbali\u0165 pri h\u013Eadan\xED",script_var:"Premenn\xE1 skriptu (yamp_entity)",use_ma_template:"Pou\u017Ei\u0165 \u0161abl\xF3nu pre Music Assistant",use_vol_template:"Pou\u017Ei\u0165 \u0161abl\xF3nu pre entitu hlasitosti",follow_active_entity:"Hlasitos\u0165 sleduje akt\xEDvnu entitu",use_url_path:"Pou\u017Ei\u0165 URL alebo cestu",adaptive_text_elements:"Prvky s adapt\xEDvnou ve\u013Ekos\u0165ou textu",disable_auto_select:"Zak\xE1za\u0165 automatick\xFD v\xFDber",always_show_lyrics:"V\u017Edy zobrazi\u0165 texty piesn\xED",lyrics_mode:"Re\u017Eim textov piesn\xED",lyrics_source:"Zdroj textov",lyrics_pre_roll:"Pre-roll textu piesne (sekundy)",lyrics_background_fade:"Prel\xEDnanie pozadia textu piesne",blurred_artwork:"Rozmazan\xFD obr\xE1zok",hide_collapsed_artwork:"Skry\u0165 zmen\u0161en\xFD obr\xE1zok",disable_artwork_gradient:"Zak\xE1za\u0165 prechod obr\xE1zka",show_idle_artwork_when_not_playing:"Zobrazi\u0165 obr\xE1zok ne\u010Dinnosti, ke\u010F sa neprehr\xE1va",prefer_ma_metadata:"Uprednostni\u0165 metad\xE1ta z Music Assistant",show_volume_overlay:"Zobrazi\u0165 prekrytie hlasitosti"},fields:{artwork_fit:"Prisp\xF4sobenie grafiky",artwork_position:"Poz\xEDcia grafiky",artwork_hostname:"Hostname pre grafiku",match_field:"Pole pre zhodu",match_value:"Hodnota pre zhodu",size_percent:"Ve\u013Ekos\u0165 (%)",object_fit:"Prisp\xF4sobenie objektu (Fit)",idle_timeout:"\u010Cas ne\u010Dinnosti (ms)",show_chip_row:"Zobrazi\u0165 riadok \u010Dipov",search_limit:"Limit v\xFDsledkov h\u013Eadania",result_sorting:"Zoradenie v\xFDsledkov",vol_step:"Krok hlasitosti (0.05 = 5%)",card_height:"V\xFD\u0161ka karty (px)",control_layout:"Rozlo\u017Eenie ovl\xE1dania",idle_image:"Obr\xE1zok ne\u010Dinnosti",background_image:"Obr\xE1zok pozadia",background_image_entity:"Entita obr\xE1zka pozadia",font_color:"Farba p\xEDsma",font_color_entity:"Farba p\xEDsma",background_position:"Poz\xEDcia pozadia",background_fit:"Prisp\xF4sobenie pozadia",image_url:"URL obr\xE1zka",fallback_image_url:"Z\xE1lo\u017En\xE1 URL obr\xE1zka",move_to_main:"Presun\xFA\u0165 do hlavn\xFDch \u010Dipov",move_to_menu:"Presun\xFA\u0165 do menu",delete_action:"Vymaza\u0165 akciu",volume_mode:"Re\u017Eim hlasitosti",idle_screen:"Obrazovka pri ne\u010Dinnosti",name:"N\xE1zov",hidden_controls:"Skryt\xE9 ovl\xE1dacie prvky",hide_remote_buttons:"Skryt\xE9 tla\u010Didl\xE1 dia\u013Ekov\xE9ho ovl\xE1dania",ma_template:"Jinja \u0161abl\xF3na pre Music Assistant",hidden_chips:"Skryt\xE9 \u010Dipy filtrov h\u013Eadania",vol_template:"Jinja \u0161abl\xF3na pre hlasitos\u0165",icon:"Ikona",action_type:"Typ akcie",menu_item:"Polo\u017Eka menu",nav_path:"Cesta navig\xE1cie",service:"Slu\u017Eba",service_data:"Servisn\xE9 \xFAdaje",idle_image_entity:"Entita obr\xE1zka pri ne\u010Dinnosti",match_entity:"Entita pre zhodu",ma_entity:"Entita Music Assistant",vol_entity:"Entita hlasitosti",remote_entity:"Entita dia\u013Ekov\xE9ho ovl\xE1da\u010Da",remote_template:"\u0160abl\xF3na entity dia\u013Ekov\xE9ho ovl\xE1da\u010Da (Jinja)",selected_entity_helper:"Pomocn\xEDk vybratej entity",sync_entity_type:"Typ entity na synchroniz\xE1ciu",placement:"Umiestnenie",card_trigger:"Sp\xFA\u0161\u0165a\u010D karty",search_view:"Zobrazenie v\xFDsledkov vyh\u013Ead\xE1vania",search_card_columns:"St\u013Apce karty",card_type:"Typ karty",appearance:"Vzh\u013Ead",no_artwork_option:"\u017Diadny obr\xE1zok",details_alignment:"Zarovnanie detailov",lyrics_background_fade:"Prel\xEDnanie pozadia textu piesne (%)",queue_controls_style:"\u0160t\xFDl ovl\xE1dac\xEDch prvkov fronty"},action_types:{menu:"Otvori\u0165 polo\u017Eku menu karty",service:"Zavola\u0165 slu\u017Ebu",navigate:"Navigova\u0165",prev_entity:"Predo\u0161l\xFD \u010Dip entity",next_entity:"\u010Eal\u0161\xED \u010Dip entity",sync_selected_entity:"Synchronizova\u0165 vybran\xFA entitu",select_entity:"Vybra\u0165 entitu z pomocn\xEDka",toggle_lyrics:"Prepn\xFA\u0165 prekrytie textov piesn\xED",remote_control:"Otvori\u0165 prekr\xFDvanie dia\u013Ekov\xE9ho ovl\xE1dania",toggle_media_session:"Prepn\xFA\u0165 ovl\xE1dacie prvky rel\xE1cie m\xE9di\xED / uzamknutej obrazovky (Experiment\xE1lne)"},action_helpers:{sync_selected_entity:"Synchronizova\u0165 vybran\xFA entitu \u2192",select_entity:"Vybra\u0165 entitu \u2190",select_helper:"(vybra\u0165 pomocn\xEDka)"},sync_entity_options:{yamp_entity:"yamp_entity (Entita Music Assistant, ak je nakonfigurovan\xE1)",yamp_main_entity:"yamp_main_entity (Hlavn\xE1 entita prehr\xE1va\u010Da m\xE9di\xED)",yamp_playback_entity:"yamp_playback_entity (Aktu\xE1lna akt\xEDvna entita prehr\xE1vania)"},placements:{chip:"Ak\u010Dn\xFD \u010Dip",menu:"V menu",hidden:"Skryt\xE9 (\u0164uknutie na grafiku)",replace_search:"Nahradi\u0165 Vyh\u013Ead\xE1vanie",replace_power:"Nahradi\u0165 Nap\xE1janie",replace_mute:"Nahradi\u0165 Stlmenie",replace_favorite:"Nahradi\u0165 Ob\u013E\xFAben\xE9",not_triggerable:"Nespustite\u013En\xE9"},triggers:{none:"\u017Diadny",tap:"\u0164uknutie",hold:"Podr\u017Eanie",double_tap:"Dvojit\xE9 \u0165uknutie",swipe_left:"Potiahnutie do\u013Eava",swipe_right:"Potiahnutie doprava"},search_view_options:{list:"Zoznam",card:"Karta",card_minimal:"Minim\xE1lna karta"},queue_controls_style_options:{drag_handle:"\xDAchyt na \u0165ahanie",icons:"Tla\u010Didl\xE1 pohybu"},card_type_options:{default:"Predvolen\xE9",search:"H\u013Eada\u0165",group_players:"Zoskupi\u0165 prehr\xE1va\u010De",up_next:"Nasleduje",remote_control:"Dia\u013Ekov\xE9 ovl\xE1danie"},appearance_options:{automatic:"Automaticky",light:"Svetl\xFD",dark:"Tmav\xFD"},artwork_fit:{default:"Glob\xE1lne",cover:"Obal (predvolen\xE9)",contain:"Prisp\xF4sobi\u0165",fill:"Vyplni\u0165","scale-down":"Zmen\u0161i\u0165","scaled-contain":"\u0160k\xE1lovan\xE9 prisp\xF4sobenie","scaled-contain-alternate":"\u0160k\xE1lovan\xE9 prisp\xF4sobenie alternat\xEDvne",none:"\u017Diadne"},artwork_position:{default:"Glob\xE1lne",top:"Hore",center:"Stred",bottom:"Dole"},background_fit:{cover:"Pokry\u0165",contain:"Zmesti\u0165",fill:"Vyplni\u0165","scale-down":"Zmen\u0161i\u0165",none:"\u017Diadne"},background_position:{center:"Stred",top:"Hore",bottom:"Dole","center left":"V strede v\u013Eavo","center right":"V strede vpravo","top left":"V\u013Eavo hore","top right":"Vpravo hore","bottom left":"V\u013Eavo dole","bottom right":"Vpravo dole"}},card:{sections:{details:"Detaily prehr\xE1vania",menu:"Menu a vyh\u013Ead\xE1vanie",action_chips:"Ak\u010Dn\xE9 \u010Dipy",lyrics:"Texty piesn\xED"},media_controls:{shuffle:"N\xE1hodne",previous:"Predch\xE1dzaj\xFAce",play_pause:"Prehra\u0165/Pozastavi\u0165",stop:"Zastavi\u0165",next:"Nasleduj\xFAce",repeat:"Opakova\u0165",lock_screen_ready:"Ovl\xE1dacie prvky na uzamknutej obrazovke akt\xEDvne",lock_screen_connecting:"Prip\xE1janie ovl\xE1dac\xEDch prvkov na uzamknutej obrazovke..."},menu:{more_info:"Viac inform\xE1ci\xED",search:"H\u013Eada\u0165",source:"Zdroj",remote_controls:"Dia\u013Ekov\xE9 ovl\xE1danie",show_lyrics:"Zobrazi\u0165 text piesne",hide_lyrics:"Skry\u0165 text piesne",transfer_queue:"Presun\xFA\u0165 frontu",main_menu:"Hlavn\xE9 menu",group_players:"Zoskupi\u0165 prehr\xE1va\u010De",up_next:"Nasleduje",remote_control:"Dia\u013Ekov\xE9 ovl\xE1danie",select_entity:"Vyberte entitu pre viac info",transfer_to:"Presun\xFA\u0165 frontu do",no_players:"\u017Diadne in\xE9 prehr\xE1va\u010De Music Assistant nie s\xFA k dispoz\xEDcii."},remote:{title:"Dia\u013Ekov\xE9 ovl\xE1danie",up:"Hore",down:"Dole",left:"Do\u013Eava",right:"Doprava",select:"Vybra\u0165",back:"Sp\xE4\u0165",menu:"Menu",home:"Domov",power:"Nap\xE1janie"},grouping:{title:"Zoskupi\u0165 prehr\xE1va\u010De",sync_volume:"Synchronizova\u0165 hlasitos\u0165",group_all:"Zoskupi\u0165 v\u0161etko",ungroup_all:"Zru\u0161i\u0165 zoskupenie v\u0161etk\xE9ho",unavailable:"Prehr\xE1va\u010D je nedostupn\xFD",no_players:"\u017Diadne in\xE9 prehr\xE1va\u010De schopn\xE9 zoskupenia nie s\xFA k dispoz\xEDcii.",master:"Hlavn\xFD (Master)",joined:"Pripojen\xFD",available:"Dostupn\xFD",current:"Aktu\xE1lny",unjoin_from:"Odpoji\u0165 od {master}",join_with:"Pripoji\u0165 k {master}"}},search:{favorites:"Ob\u013E\xFAben\xE9",recently_played:"Ned\xE1vno prehr\xE1van\xE9",next_up:"Nasleduj\xFAce",recommendations:"Odpor\xFA\u010Dania",radio_mode:"Re\u017Eim r\xE1dio",show_track_options:"Zobrazi\u0165 mo\u017Enosti skladby",play_similar:"Prehra\u0165 podobn\xE9 skladby",close:"Zatvori\u0165 vyh\u013Ead\xE1vanie",no_results:"\u017Diadne v\xFDsledky.",play_next:"Prehra\u0165 ako nasleduj\xFAce",replace_play:"Nahradi\u0165 frontu a prehra\u0165 teraz",replace:"Nahradi\u0165 frontu",add_queue:"Prida\u0165 na koniec fronty",move_up:"Posun\xFA\u0165 nahor",move_down:"Posun\xFA\u0165 nadol",move_next:"Presun\xFA\u0165 na nasleduj\xFAce",remove:"Odstr\xE1ni\u0165 z fronty",drag_to_reorder:"Potiahnite pre zmenu poradia",added:"Pridan\xE9 do fronty!",added_to_playlist:"Pridan\xE9 do playlistu!",select_playlist:"Vybra\u0165 playlist pre '{track}'",add_to_playlist:"Prida\u0165 do playlistu",select_track_for_playlist:"Vybra\u0165 skladbu na pridanie pre '{track}' od {artist}",labels:{replace:"Nahradi\u0165",next:"Nasleduj\xFAce",replace_next:"Nahradi\u0165 nasleduj\xFAce",add:"Prida\u0165",add_to_playlist:"Prida\u0165 do playlistu"},results:"v\xFDsledkov",result:"v\xFDsledok",filters:{all:"V\u0161etko",artist:"Interpret",album:"Album",track:"Skladba",playlist:"Playlist",radio:"R\xE1dio",music:"Hudba",station:"Stanica",podcast:"Podcast",audiobook:"Audiokniha"},search_artist:"Preh\u013Ead\xE1va\u0165 albumy tohto interpreta",browse_artist:"Preh\u013Ead\xE1va\u0165 albumy od {artist}",search_album:"Preh\u013Ead\xE1va\u0165 skladby z tohto albumu",browse_album:"Preh\u013Ead\xE1va\u0165 skladby z {album}",browse_playlist:"Preh\u013Ead\xE1va\u0165 skladby z {playlist}",play_collection:"Prehra\u0165 t\xFAto kolekciu",play_collection_error:"T\xFAto kolekciu nie je mo\u017En\xE9 prehra\u0165 priamo",play_item:"Prehra\u0165 {item}"},lyrics:{finding:"H\u013Eadanie textu piesne...",none_found:"\u017Diadny text piesne sa nena\u0161iel",not_available:"Text piesne nie je k dispoz\xEDcii",instrumental:"In\u0161trument\xE1lna skladba",admin_only_mass:"Z\xEDskavanie textov piesn\xED cez Music Assistant je dostupn\xE9 len pre administr\xE1torov. Odpor\xFA\u010Da sa prepn\xFA\u0165 na lrclib v konfigur\xE1cii karty.",fallback_to_lrclib_non_admin:"Zisten\xFD neadministr\xE1torsk\xFD pou\u017E\xEDvate\u013E. Prechod na lrclib pre z\xEDskanie textov piesn\xED."},lyrics_sources:{mass_lrclib:"Music Assistant (Z\xE1loha na LRCLIB)",mass:"Len Music Assistant",lrclib:"Len LRCLIB",lrclib_mass:"LRCLIB (Z\xE1loha na Music Assistant)"},lyrics_modes:{default:"Predvolen\xE9 (Zv\xFDrazni\u0165 a pos\xFAva\u0165)",scroll:"Len pos\xFAva\u0165",text:"Len text"}},fd={common:{not_found:"Entiteta ni najdena.",search:"I\u0161\u010Di",power:"Napajanje",favorite:"Priljubljeno",loading:"Nalaganje...",no_results:"Ni rezultatov.",close:"Zapri",vol_up:"Pove\u010Daj glasnost",vol_down:"Zmanj\u0161aj glasnost",media_player:"Predvajalnik predstavnosti",edit_entity:"Uredi nastavitve entitete",edit_action:"Uredi nastavitve dejanja",mute:"Uti\u0161aj",unmute:"Vklopi zvok",seek:"Previj",volume:"Glasnost",play_now:"Predvajaj zdaj",more_options:"Ve\u010D mo\u017Enosti",unavailable:"Ni na voljo",back:"Nazaj",cancel:"Prekli\u010Di",reset_default:"Ponastavi na privzeto",unpin:"Odpni",clear:"Po\u010Disti",album_art:"Naslovnica albuma"},editor:{tabs:{entities:"Entitete",behavior:"Vedenje",look_and_feel:"Videz in ob\u010Dutek",artwork:"Grafika",actions:"Dejanja"},search_placeholder:"Iskanje mo\u017Enosti konfiguracije...",template_label:"Predloga kartice",templates:{custom:{label:"Po meri (Izvirna konfiguracija)",description:"Va\u0161a izvirna, popolnoma prilagojena konfiguracija."},large_modern:{label:"Velik sodoben YAMP",description:"Nekoliko ve\u010Dji sodoben dizajn s prilagodljivimi kontrolami."},crisp_clean:{label:"\u010Cisto",description:"\u010Cista postavitev s prilagojeno sliko albuma in sodobnimi kontrolami."},minimal_mini:{label:"MINImal",description:"Kompaktna kartica brez naslovnice."},normal_mini:{label:"Mini Mode",description:"Standardna kompaktna kartica."},quick_and_easy:{label:"Ni \u010Dasa za razlago",description:"Zasnovano za hitrost s trajnimi vrsticami \u010Dipov in hitrim zdru\u017Eevanjem."},dedicated_search:{label:"Vse o iskanju",description:"Samostojna kartica za iskanje brez glavnega predvajalnika medijev."},dedicated_grouping:{label:"Skupinska terapija",description:"Samostojna kartica za zdru\u017Eevanje predvajalnikov. Zahteva ve\u010D konfiguriranih entitet."},huge_yamp:{label:"To je ogromen YAMP!",description:"Maksimizirane kontrole, veliko besedilo in masivna vrstica napredka za ogled od dale\u010D."}},placeholders:{search:"I\u0161\u010Di glasbo..."},sections:{artwork:{general:{title:"Splo\u0161ne nastavitve",description:"Globalni nadzor nad prikazom in pridobivanjem grafike."},background:{title:"Slika ozadja",description:"Konfigurirajte trajno sliko ozadja za kartico za vsebino predvajanja."},idle:{title:"Grafika v mirovanju",description:"Prika\u017Ei stati\u010Dno sliko ali posnetek entitete, ko se ni\u010D ne predvaja."},overrides:{title:"Prepis grafike",description:"Prepisi se ocenjujejo od zgoraj navzdol. Povlecite za spremembo vrstnega reda."}},entities:{title:"Entitete*",description:"Dodajte predvajalnike, ki jih \u017Eelite upravljati. Povlecite entitete za spremembo vrstnega reda."},behavior:{idle_chips:{title:"Mirovanje in \u010Dipi",description:"Izberite, kdaj kartica preide v mirovanje in kako se obna\u0161ajo \u010Dipi entitet."},interactions_search:{title:"Interakcije in iskanje",description:"Nastavite pripenjanje entitet in \u0161tevilo prikazanih rezultatov."},lyrics:{title:"Besedila",description:"Konfigurirajte, kako so besedila prikazana in kdaj se pojavijo."}},look_and_feel:{theme_layout:{title:"Tema in postavitev",description:"Ujemanje s slogom nadzorne plo\u0161\u010De in nadzor velikosti."},controls_typography:{title:"Kontrolniki in tipografija",description:"Prilagodite velikost gumbov, oznake entitet in prilagodljivo besedilo."},collapsed_idle:{title:"Strnjeno in mirovanje",description:"Nadzorujte, kdaj se kartica skr\u010Di in kaj se prika\u017Ee v mirovanju."}},actions:{title:"Dejanja",description:"Ustvarite \u010Dipe dejanj, ki se prika\u017Eejo na kartici ali v meniju."}},subtitles:{idle_timeout:"\u010Cas v milisekundah, preden kartica preide v mirovanje. Nastavite na 0 za izklop.",show_chip_row:'"Samodejno" skrije \u010Dipe, \u010De je nastavljena ena entiteta. "V meniju" jih premakne v meni. "V meniju med nedejavnostjo" prika\u017Ee \u010Dipe v vrstici, ko je aktivna, a jih premakne v meni med nedejavnostjo.',dim_chips:"Ko kartica preide v mirovanje s sliko, se \u010Dipi zatemnijo.",hold_to_pin:"Dolgi pritisk za pripenjanje entitet namesto kratkega.",always_show_group:"Kontrolni elementi za hitro zdru\u017Eevanje (+/-/zvezda) bodo privzeto vidni ob nalaganju strani. \u0160e vedno jih lahko ro\u010Dno preklopite z dvojnim tapom.",disable_autofocus:"Prepre\u010Di samodejni fokus iskalnega polja.",search_within_filter:"I\u0161\u010Di znotraj trenutnega filtra.",close_search_on_play:"Samodejno zapri iskanje ob predvajanju.",pin_search_headers:"Pripni iskalno polje in filtre na vrh.",hide_search_headers_on_idle:"Skrij iskalno polje in filtre med mirovanjem.",disable_mass:"Onemogo\u010Di integracijo Mass Queue.",swap_pause_stop:"Zamenjaj gumb pavze z gumbom zaustavitve med uporabo moderne postavitve.",show_album:"Prika\u017Ei ime albuma zraven izvajalca v podrobnostih predvajalnika.",lock_screen_controls:"Ohranite kontrolnike in metapodatke skladbe aktivne na zaklenjenem zaslonu va\u0161e naprave (iOS / Android / macOS), ko je aplikacija v ozadju. Opomba: Ta funkcija je eksperimentalna.",toggle_media_session:"Opomba: Kontrolniki zaklenjenega zaslona in seje predstavnosti so eksperimentalni.",adaptive_controls:"Prilagodi velikost gumbov glede na prostor.",hide_menu_player:"Skrij oznako entitete v meniju.",hide_reorder_progress:"Skrij lebde\u010Di indikator napredka prerazvr\u0161\u010Danja \u010Dakalne vrste na dnu.",adaptive_text:"Izberi skupine besedila za prilagajanje velikosti.",collapse_expand:"Vedno skr\u010Deno ustvari mini predvajalnik.",disable_mini_menu:"Vrnite se na standardne sezname namesto uporabe novih mini mre\u017Enih menijev v na\u010Dinu 'Vedno strnjeno'.",idle_screen:"Izberi zaslon, prikazan v mirovanju.",hide_controls:"Izberi kontrolnike za skrivanje.",hide_remote_buttons:"Izberite gumbe za skrivanje na daljinskem upravljalniku.",hide_search_chips:"Skrij dolo\u010Dene iskalne filtre.",hide_active_entity_on_idle:"Skrije oznako entitete na dnu kartice le, ko je predvajalnik v stanju mirovanja.",follow_active_entity:"Entiteta glasnosti sledi aktivni entiteti. Opomba: To prepi\u0161e izbrano entiteto za glasnost.",search_limit_full:"Najve\u010Dje \u0161tevilo rezultatov (privzeto: 20).",default_search_filter_full:"Izberite, kateri filter je privzeto aktiven ob odprtju iskanja.",default_search_favorites:"Za\u010Dni iskanje z aktivnimi priljubljenimi",result_sorting_full:"Izberi razvr\u0161\u010Danje rezultatov.",card_height_full:"Pustite prazno za samodejno vi\u0161ino.",control_layout_full:"Izberi med staro in moderno postavitvijo.",artwork_extend:"Raz\u0161iri ozadje grafike pod \u010Dipe.",artwork_extend_label:"Raz\u0161iri grafiko",no_artwork_overrides:"Ni nastavljenih prepisov grafike.",missing_art_match:"Velja, ko izbrana vsebina nima slike.",idle_image_match:"Velja, ko predvajalnik miruje in se prikazuje slika v mirovanju.",entity_current_hint:"Uporabi entity_id: current za trenutno izbrano entiteto.",jinja_template_hint:"Vnesite Jinja predlogo, ki vrne en entity_id.",jinja_template_vol_hint:"Vnesite Jinja predlogo za entiteto glasnosti.",jinja_template_remote_hint:"Vnesite Jinja predlogo, ki vrne entity_id daljinskega upravljalnika (npr. remote.dnevna_soba_tv):",not_available_alt_collapsed:"Ni na voljo z alternativno vrstico napredka.",not_available_collapsed:"Ni na voljo v vedno skr\u010Denem na\u010Dinu.",only_available_collapsed:"Na voljo le v vedno skr\u010Denem na\u010Dinu.",only_available_mini_menu:"Na voljo samo, ko je 'Vedno strnjeno' omogo\u010Deno in 'Raz\u0161iri ob iskanju' onemogo\u010Deno",only_available_modern:"Na voljo le v moderni postavitvi.",image_url_helper:"Vnesite neposredni URL do slike ali lokalno pot do datoteke",selected_entity_helper:"Pomo\u010Dnik za vnos besedila, ki bo posodobljen z ID-jem trenutno izbranega predvajalnika medijev.",select_entity_helper:"Pomo\u010Dnik za vnos besedila, iz katerega se bere ID entitete. Kartica bo samodejno izbrala ustrezni \u010Dip.",sync_entity_type:"Izberite, kateri ID entitete \u017Eelite sinhronizirati s pomo\u010Dnikom (privzeto entiteto Music Assistant, \u010De je nastavljena).",disable_auto_select:"Prepre\u010Di samodejno izbiro \u010Dipa te entitete ob za\u010Detku predvajanja.",search_view:"Izberite med standardnim seznamom ali mre\u017Eo kartic za rezultate iskanja.",search_card_columns:"Dolo\u010Dite \u0161tevilo stolpcev v pogledu kartic. Grafika se bo samodejno prilagodila.",card_type:"Izberite na\u010Din kartice. 'Privzeto' je standardni medijski predvajalnik. 'Namensko iskanje' spremeni kartico v trajen iskalni vmesnik.",always_show_lyrics:"Samodejno odprite pogled besedila, ko se stran osve\u017Ei.",lyrics_source:"Music Assistant zahteva integracijo mass_queue za pridobivanje besedil iz svojega notranjega mehanizma metapodatkov.",lyrics_pre_roll:"Zamaknite \u010Dasovno uskladitev ozna\u010Devanja besedila. Pozitivne vrednosti ga pospe\u0161ijo, negativne pa upo\u010Dasnijo (privzeto: 0).",lyrics_background_fade:"Prilagodite prelivanje ozadja in motnost zatemnitve prekrivne plo\u0161\u010De z besedilom (0% za prosojno grafiko, 100% za enobarvno ozadje).",blurred_artwork:"Vedno zamegli ozadje",hide_collapsed_artwork:"Skrij majhno sliko na desni, ko je kartica strnjena",disable_artwork_gradient:"Onemogo\u010Di spodnji barvni prehod na grafiki",show_idle_artwork_when_not_playing:"Ko je to omogo\u010Deno, se ob izbiri \u010Dipa, na katerem se trenutno ni\u010D ne predvaja, prika\u017Ee nastavljena slika za nedejavnost namesto aktivne grafike predvajanja.",prefer_ma_metadata:"Za naslov skladbe, izvajalca in grafiko vedno uporabi seznanjeno entiteto Music Assistant, tudi \u010De se predvaja primarna entiteta.",show_volume_overlay:"Ob spremembi glasnosti za kratek \u010Das prika\u017Ee velik indikator glasnosti \u010Dez naslovnico.",font_color_helper:"Prilagodite barve besedila in ikon. Sprejema \u0161estnajsti\u0161ko, imena CSS, rgba ali predloge (privzeto: barva teme).",queue_controls_style:"Izberite, ali \u017Eelite prikazati ro\u010Daj za vle\u010Denje ali posamezne gumbe za premikanje elementov \u010Dakalne vrste."},titles:{edit_entity:"Uredi entiteto",edit_action:"Uredi dejanje",service_data:"Podatki storitve",add_artwork_override:"Dodaj prepis grafike"},labels:{toggle_template_mode:"Preklopi na\u010Din predloge",dim_chips:"Zatemni \u010Dipe v mirovanju",hold_to_pin:"Dr\u017Ei za pripenjanje",always_show_group:"Hitro zdru\u017Eevanje kot privzeto",disable_autofocus:"Onemogo\u010Di samodejni fokus",keep_filters:"Ohrani filtre",dismiss_on_play:"Zapri iskanje ob predvajanju",pin_headers:"Pripni glave iskanja",hide_search_headers_on_idle:"Skrij glave iskanja med mirovanjem",default_search_filter:"Privzeti iskalni filter",default_search_favorites:"Privzeti filter priljubljenih",disable_mass:"Onemogo\u010Di Mass Queue",match_theme:"Ujemaj temo",alt_progress:"Alternativna vrstica napredka",progress_bar_height:"Vi\u0161ina vrstice napredka",display_timestamps:"Prika\u017Ei \u010Dasovne oznake",swap_pause_stop:"Zamenjaj pavzo z zaustavitvijo",show_album:"Prika\u017Ei ime albuma",lock_screen_controls:"Predstavnostni kontrolniki na zaklenjenem zaslonu (Eksperimentalno)",adaptive_controls:"Prilagodljiva velikost gumbov",hide_active_entity:"Skrij oznako aktivne entitete",hide_active_entity_on_idle:"Skrij oznako aktivne entitete ob mirovanju",collapse_on_idle:"Skr\u010Di v mirovanju",hide_menu_player_toggle:"Skrij predvajalnik v meniju",hide_reorder_progress_toggle:"Skrij napredek prerazvr\u0161\u010Danja",always_collapsed:"Vedno skr\u010Deno",disable_mini_menu:"Onemogo\u010Di mini mre\u017Ene menije",expand_on_search:"Raz\u0161iri ob iskanju",script_var:"Skriptna spremenljivka",use_ma_template:"Uporabi predlogo za entiteto Music Assistant",use_vol_template:"Uporabi predlogo za glasnost",follow_active_entity:"Glasnost sledi aktivni entiteti",use_url_path:"Uporabi URL ali pot",adaptive_text_elements:"Elementi za prilagajanje velikosti besedila",disable_auto_select:"Onemogo\u010Di samodejno izbiro",always_show_lyrics:"Vedno prika\u017Ei besedilo",lyrics_mode:"Na\u010Din besedila",lyrics_source:"Vir besedil",lyrics_pre_roll:"Pre-roll besedila (sekunde)",lyrics_background_fade:"Prelivanje ozadja besedila",blurred_artwork:"Zamegljena grafika",hide_collapsed_artwork:"Skrij skr\u010Deno grafika",disable_artwork_gradient:"Onemogo\u010Di prehod grafike",show_idle_artwork_when_not_playing:"Prika\u017Ei sliko za nedejavnost, ko se ne predvaja",prefer_ma_metadata:"Prednost metapodatkom Music Assistant",show_volume_overlay:"Prika\u017Ei prekrivno plo\u0161\u010Do za glasnost"},fields:{artwork_fit:"Prileganje grafike",artwork_position:"Polo\u017Eaj grafike",artwork_hostname:"Ime gostitelja grafike",match_field:"Polje ujemanja",match_value:"Vrednost ujemanja",size_percent:"Velikost (%)",object_fit:"Prileganje objekta",idle_timeout:"\u010Cas mirovanja (ms)",show_chip_row:"Prika\u017Ei vrstico \u010Dipov",search_limit:"Omejitev rezultatov iskanja",result_sorting:"Razvr\u0161\u010Danje rezultatov",vol_step:"Korak glasnosti (0.05 = 5 %)",card_height:"Vi\u0161ina kartice (px)",control_layout:"Postavitev kontrolnikov",idle_image:"Slika v mirovanju",background_image:"Slika ozadja",background_image_entity:"Entiteta slike ozadja",font_color:"Barva pisave",font_color_entity:"Barva pisave",background_position:"Polo\u017Eaj ozadja",background_fit:"Prilagajanje ozadja",image_url:"URL slike",fallback_image_url:"Rezervni URL slike",move_to_main:"Premakni dejanje na glavno vrstico",move_to_menu:"Premakni dejanje v meni",delete_action:"Izbri\u0161i dejanje",volume_mode:"Na\u010Din glasnosti",idle_screen:"Zaslon v mirovanju",name:"Ime",hidden_controls:"Skriti kontrolniki",hide_remote_buttons:"Skriti gumbi daljinskega upravljalnika",ma_template:"Predloga Music Assistant (Jinja)",hidden_chips:"Skriti iskalni \u010Dipi",vol_template:"Predloga entitete glasnosti (Jinja)",icon:"Ikona",action_type:"Vrsta dejanja",menu_item:"Element menija",nav_path:"Navigacijska pot",service:"Storitev",service_data:"Podatki storitve",idle_image_entity:"Entiteta slike v mirovanju",match_entity:"Ujemajo\u010Da entiteta",ma_entity:"Entiteta Music Assistant",vol_entity:"Entiteta glasnosti",remote_entity:"Entiteta daljinskega upravljalnika",remote_template:"Predloga entitete daljinca (Jinja)",selected_entity_helper:"Pomo\u010Dnik izbrane entitete",sync_entity_type:"Vrsta entitete za sinhronizacijo",placement:"Namestitev",card_trigger:"Spro\u017Eilec kartice",search_view:"Pogled rezultatov iskanja",search_card_columns:"Stolpci kartic",card_type:"Vrsta kartice",appearance:"Videz",no_artwork_option:"Brez grafike",details_alignment:"Poravnava podrobnosti",lyrics_background_fade:"Prelivanje ozadja besedila (%)",queue_controls_style:"Slog kontrol \u010Dakalne vrste"},action_types:{menu:"Odpri element menija kartice",service:"Pokli\u010Di storitev",navigate:"Navigiraj",prev_entity:"Prej\u0161nji \u010Dip entitete",next_entity:"Naslednji \u010Dip entitete",sync_selected_entity:"Sinhroniziraj izbrano entiteto",select_entity:"Izberi entiteto iz pomo\u010Dnika",toggle_lyrics:"Preklopi prekrivanje besedila",remote_control:"Odpri prekrivanje daljinskega upravljalnika",toggle_media_session:"Preklopi sejo predstavnosti / kontrole zaklenjenega zaslona (Eksperimentalno)"},action_helpers:{sync_selected_entity:"Sinhroniziraj izbrano entiteto \u2192",select_entity:"Izberi entiteto \u2190",select_helper:"(izberite pomo\u010Dnika)"},sync_entity_options:{yamp_entity:"yamp_entity (entiteta Music Assistant, \u010De je nastavljena)",yamp_main_entity:"yamp_main_entity (glavna entiteta predvajalnika medijev)",yamp_playback_entity:"yamp_playback_entity (trenutno aktivna entitea predvajanja)"},placements:{chip:"\u010Cip dejanja",menu:"V meniju",hidden:"Skrito (dotik grafike)",replace_search:"Zamenjaj Iskanje",replace_power:"Zamenjaj Vklop/Izklop",replace_mute:"Zamenjaj Uti\u0161aj",replace_favorite:"Zamenjaj Priljubljeno",not_triggerable:"Ni mogo\u010De spro\u017Eiti"},triggers:{none:"Brez",tap:"Dotik",hold:"Pridr\u017Eanje",double_tap:"Dvojni dotik",swipe_left:"Podrsaj levo",swipe_right:"Podrsaj desno"},search_view_options:{list:"Seznam",card:"Kartica",card_minimal:"Minimalna kartica"},queue_controls_style_options:{drag_handle:"Ro\u010Daj za vle\u010Denje",icons:"Gumbi za premikanje"},card_type_options:{default:"Privzeto",search:"Iskanje",group_players:"Zoskupi predvajalnike",up_next:"Sledi",remote_control:"Daljinski upravljalnik"},appearance_options:{automatic:"Samodejno",light:"Svetlo",dark:"Temno"},artwork_fit:{default:"Globalno",cover:"Ovitek (privzeto)",contain:"Prilagodi",fill:"Zapolni","scale-down":"Pomanj\u0161aj","scaled-contain":"Pomanj\u0161ano prilagodi","scaled-contain-alternate":"Pomanj\u0161ano prilagodi alternativno",none:"Brez"},artwork_position:{default:"Globalno",top:"Zgoraj",center:"Sredina",bottom:"Spodaj"},background_fit:{cover:"Prekrij",contain:"Prilagodi",fill:"Zapolni","scale-down":"Pomanj\u0161aj",none:"Brez"},background_position:{center:"Sredina",top:"Zgoraj",bottom:"Spodaj","center left":"Sredina levo","center right":"Sredina desno","top left":"Zgoraj levo","top right":"Zgoraj desno","bottom left":"Spodaj levo","bottom right":"Spodaj desno"}},card:{sections:{details:"Podrobnosti predvajanja",menu:"Meni in iskanje",action_chips:"\u010Cipi dejanj",lyrics:"Besedilo"},media_controls:{shuffle:"Naklju\u010Dno",previous:"Prej\u0161nje",play_pause:"Predvajaj/Pavza",stop:"Ustavi",next:"Naslednje",repeat:"Ponovi",lock_screen_ready:"Kontrole zaklenjenega zaslona aktivne",lock_screen_connecting:"Povezovanje kontrol zaklenjenega zaslona..."},menu:{more_info:"Ve\u010D informacij",search:"I\u0161\u010Di",source:"Vir",remote_controls:"Daljinski upravljalnik",show_lyrics:"Poka\u017Ei besedilo",hide_lyrics:"Skrij besedilo",transfer_queue:"Prenesi \u010Dakalno vrsto",main_menu:"Glavni meni",group_players:"Zdru\u017Ei predvajalnike",up_next:"Sledi",remote_control:"Daljinski upravljalnik",select_entity:"Izberi entiteto za ve\u010D informacij",transfer_to:"Prenesi \u010Dakalno vrsto na",no_players:"Ni drugih razpolo\u017Eljivih predvajalnikov Music Assistant."},remote:{title:"Daljinski upravljalnik",up:"Gor",down:"Dol",left:"Levo",right:"Desno",select:"Izberi",back:"Nazaj",menu:"Meni",home:"Domov",power:"Vklop/Izklop"},grouping:{title:"Zdru\u017Ei predvajalnike",sync_volume:"Sinhroniziraj glasnost",group_all:"Zdru\u017Ei vse",ungroup_all:"Razdru\u017Ei vse",unavailable:"Predvajalnik ni na voljo",no_players:"Ni drugih predvajalnikov za zdru\u017Eevanje.",master:"Glavni",joined:"Pridru\u017Een",available:"Na voljo",current:"Trenutni",unjoin_from:"Odslopi od {master}",join_with:"Pridru\u017Ei se {master}"}},search:{favorites:"Priljubljeni",recently_played:"Nedavno predvajano",next_up:"Naslednje",recommendations:"Priporo\u010Dila",radio_mode:"Radijski na\u010Din",show_track_options:"Prika\u017Ei mo\u017Enosti skladbe",play_similar:"Predvajaj podobne pesmi",close:"Zapri iskanje",no_results:"Ni rezultatov.",play_next:"Predvajaj naslednje",replace_play:"Zamenjaj \u010Dakalno vrsto in predvajaj",replace:"Zamenjaj \u010Dakalno vrsto",add_queue:"Dodaj na konec \u010Dakalne vrste",move_up:"Premakni gor",move_down:"Premakni dol",move_next:"Premakni na naslednje",remove:"Odstrani iz \u010Dakalne vrste",drag_to_reorder:"Povlecite za prerazvrstitev",added:"Dodano v \u010Dakalno vrsto!",added_to_playlist:"Dodano na seznam predvajanja!",select_playlist:"Izberite seznam predvajanja za '{track}'",add_to_playlist:"Dodaj na seznam predvajanja",select_track_for_playlist:"Izberite skladbo za dodajanje za '{track}' od {artist}",labels:{replace:"Zamenjaj",next:"Naslednje",replace_next:"Zamenjaj naslednje",add:"Dodaj",add_to_playlist:"Dodaj na seznam predvajanja"},results:"rezultati",result:"rezultat",filters:{all:"Vse",artist:"Izvajalec",album:"Album",track:"Skladba",playlist:"Seznam predvajanja",radio:"Radio",music:"Glasba",station:"Postaja",podcast:"Podcast",audiobook:"Zvo\u010Dna knjiga"},search_artist:"Prebrskaj albume tega izvajalca",browse_artist:"Prebrskaj albume izvajalca {artist}",search_album:"Prebrskaj skladbe iz tega albuma",browse_album:"Prebrskaj skladbe iz {album}",browse_playlist:"Prebrskaj skladbe iz {playlist}",play_collection:"Predvajaj to zbirko",play_collection_error:"Te zbirke ni mogo\u010De predvajati neposredno",play_item:"Predvajaj {item}"},lyrics:{finding:"Iskanje besedila...",none_found:"Besedila ni bilo mogo\u010De najti",not_available:"Besedilo ni na voljo",instrumental:"Instrumentalna skladba",admin_only_mass:"Pridobivanje besedil preko Music Assistant je na voljo samo administratorjem. Priporo\u010Dljivo je, da v konfiguraciji kartice preklopite na lrclib.",fallback_to_lrclib_non_admin:"Zaznan je ne-administratorski uporabnik. Preklop na lrclib za pridobivanje besedil."},lyrics_sources:{mass_lrclib:"Music Assistant (Rezerva na LRCLIB)",mass:"Samo Music Assistant",lrclib:"Samo LRCLIB",lrclib_mass:"LRCLIB (Rezerva na Music Assistant)"},lyrics_modes:{default:"Privzeto (Ozna\u010Di in pomakni)",scroll:"Samo pomikanje",text:"Samo besedilo"}};const xi={en:cd,de:dd,es:ud,fr:hd,it:pd,nl:_d,pt:md,sk:gd,sl:fd};let ps=null;function da(a){typeof a=="string"&&a.trim()!==""&&a.trim().toLowerCase()!=="null"&&a.trim().toLowerCase()!=="undefined"?ps=a.trim():ps=null}function yd(){if(typeof localStorage>"u")return"";try{const a=localStorage.getItem("selectedLanguage");if(!a)return"";let e=a;try{e=JSON.parse(a)}catch{}if(typeof e=="string"){const t=e.replace(/['"]+/g,"").trim();if(t!==""&&t.toLowerCase()!=="null"&&t.toLowerCase()!=="undefined")return t}}catch{return""}return""}function ua(a){if(typeof a!="string")return"";const e=a.replace(/['"]+/g,"").trim();return e!==""&&e.toLowerCase()!=="null"&&e.toLowerCase()!=="undefined"?e:""}function vd(){if(typeof navigator>"u")return"";if(Array.isArray(navigator.languages))for(const a of navigator.languages){if(!a||typeof a!="string")continue;const e=a.replace(/['"]+/g,"").replace("-","_"),t=e.split("_")[0];if(xi[e]||xi[t])return e}return Array.isArray(navigator.languages)&&navigator.languages[0]||navigator.language||""}function bd(){const a=(typeof document<"u"?document.querySelector("home-assistant"):null)?.hass,e=(yd()||ua(a?.selectedLanguage)||ua(a?.language)||ua(a?.locale?.language)||ua(ps)||vd()||"en").replace(/['"]+/g,"").replace("-","_");return xi[e]?e:e.split("_")[0]}function d(a,e="",t=""){const i=bd();let s;const r=a.split("."),n=(o,l)=>{try{return l.reduce((c,u)=>c&&c[u]!==void 0?c[u]:void 0,o)}catch{return}};if(s=n(xi[i],r),s===void 0&&i!=="en"&&(s=n(xi.en,r)),s===void 0&&(s=a),typeof s!="string"&&(s=a),typeof e=="object"&&e!==null)for(const[o,l]of Object.entries(e))s=s.replaceAll(o,l);else e!==""&&t!==""&&(s=s.replaceAll(e,t));return s}const Lt=6,et=75,wi=Object.freeze({custom:{},large_modern:{match_theme:!0,appearance:"automatic",control_layout:"modern",adaptive_controls:!0,adaptive_text:!0,artwork_object_fit:"cover",extend_artwork:!0,show_chip_row:"in_menu_on_idle",hold_to_pin:!0,pin_search_headers:!0,progress_bar_height:16,search_view:"card",search_card_columns:3,display_timestamps:!0,details_alignment:"left"},crisp_clean:{match_theme:!0,volume_mode:"stepper",hold_to_pin:!0,volume_step:.05,show_chip_row:"in_menu",extend_artwork:!0,search_results_sort:"play_count_desc",control_layout:"modern",dismiss_search_on_play:!0,keep_filters_on_search:!1,display_timestamps:!0,search_view:"list",default_search_filter:"all",default_search_favorites:!0,appearance:"automatic",details_alignment:"center",artwork_object_fit:"scaled-contain-alternate",progress_bar_height:2},minimal_mini:{match_theme:!0,appearance:"automatic",always_collapsed:!0,show_chip_row:"in_menu",details_alignment:"left",hold_to_pin:!0,progress_bar_height:2,volume_mode:"stepper",extend_artwork:!0,blurred_artwork:!0,hide_collapsed_artwork:!0},normal_mini:{match_theme:!0,appearance:"automatic",always_collapsed:!0,show_chip_row:"auto",details_alignment:"left",hold_to_pin:!0,progress_bar_height:2,volume_mode:"slider",extend_artwork:!0,blurred_artwork:!0},dedicated_search:{match_theme:!0,appearance:"automatic",card_type:"search",search_view:"card",hide_menu_player:!0,hold_to_pin:!0,show_chip_row:"in_menu",disable_autofocus:!0},dedicated_grouping:{match_theme:!0,appearance:"automatic",card_type:"group_players",hide_menu_player:!0,show_chip_row:"in_menu"},quick_and_easy:{match_theme:!0,appearance:"automatic",always_show_quick_group:!0,show_chip_row:"always",dismiss_search_on_play:!0,extend_artwork:!0,show_volume_overlay:!0,hold_to_pin:!0},huge_yamp:{match_theme:!0,appearance:"automatic",control_layout:"modern",adaptive_controls:!0,adaptive_text:!0,progress_bar_height:48,display_timestamps:!0,artwork_object_fit:"cover",extend_artwork:!0,search_view:"card",search_card_columns:2,show_volume_overlay:!0}});Object.freeze(new Set(["card_height","artwork_override","name","icon","action_in_menu","placement","hide_controls","lyrics","title","subtitle","idle_artwork","idle_image","background_image","font_color","lyrics_background_fade","lock_screen_controls"]));const _s=8,_n=16,mn=32,ms=128,gs=256,xd=4096,gn=32768,fn=524288,yn=262144,vn=Object.freeze(["aspect_ratio","media_title","media_artist","media_album_name","media_content_id","media_channel","app_name","media_content_type","entity_id","entity_state"]),bn=new WeakMap;function be(a,e){const t=a?.[e];return typeof t=="string"&&t.trim()!==""?t:null}function je(a,e){if(!e)return"";const t=typeof e=="string"?a?.states?.[e]:e;if(!t)return typeof e=="string"?e:"";if(typeof a?.formatEntityName=="function")try{const i=a.formatEntityName(t);if(i)return i}catch{}return t.attributes?.friendly_name||t.entity_id||""}async function wd(a,e,t){if(!e||typeof e!="string")return t;if(!e.includes("{{")&&!e.includes("{%"))return e;try{const i=(await a.callApi("POST","template",{template:e})||"").toString().trim();return i&&/^([a-z_]+)\.[A-Za-z0-9_]+$/.test(i)?i:t}catch{return t}}async function ki(a,e,t={}){if(!e||typeof e!="string")return e;if(!e.includes("{{")&&!e.includes("{%")){if(/%7B%7B|%7B%25/i.test(e))try{e=decodeURIComponent(e)}catch{}if(!e.includes("{{")&&!e.includes("{%"))return e}let i=e;t&&Object.keys(t).length>0&&(i=`${Object.entries(t).map(([s,r])=>`{% set ${s} = ${JSON.stringify(r)} %}`).join(" ")} ${e}`);try{return(await a.callApi("POST","template",{template:i})||"").toString().trim()}catch(s){return console.warn("yamp: Error resolving template:",e,s),e}}function dt(a,e,t={}){if(!e||typeof e!="string")return e;let i=e;if(/%7B%7B|%7B%25/i.test(i))try{i=decodeURIComponent(i)}catch{}if(!i.includes("{{")&&!i.includes("{%"))return i;let s=i,r=!0;return s=s.replace(/\{\{\s*(.*?)\s*\}\}/g,(n,o)=>{let l=o.trim(),c=!1;l.endsWith("| urlencode")?(c=!0,l=l.replace(/\|\s*urlencode$/,"").trim()):l.endsWith("|urlencode")&&(c=!0,l=l.replace(/\|urlencode$/,"").trim());let u=l.match(/^state_attr\(\s*(['"]?)([\w.]+)\1\s*,\s*(['"]?)([\w_]+)\3\s*\)$/);if(u){let _=u[2],m=t[_]!==void 0&&!u[1]?t[_]:_,f=u[4];const y=a?.states?.[m];if(y&&y.attributes&&y.attributes[f]!==void 0){let v=String(y.attributes[f]);return c?encodeURIComponent(v):v}return""}let h=l.match(/^states\(\s*(['"]?)([\w.]+)\1\s*\)(?:\s*(==|!=)\s*(['"])(.*?)\4)?$/);if(h){let _=h[2],m=t[_]!==void 0&&!h[1]?t[_]:_,f=h[3],y=h[5];const v=a?.states?.[m];let x="unknown";if(v&&v.state!==void 0&&(x=String(v.state)),f){let k=(f==="=="?x===y:x!==y)?"true":"false";return c?encodeURIComponent(k):k}return c?encodeURIComponent(x):x}let p=l.match(/^is_state\(\s*(['"]?)([\w.]+)\1\s*,\s*(['"])(.*?)\3\s*\)$/);if(p){let _=p[2],m=t[_]!==void 0&&!p[1]?t[_]:_,f=p[4];const y=a?.states?.[m];let v="unknown";y&&y.state!==void 0&&(v=String(y.state));let x=v===f?"true":"false";return c?encodeURIComponent(x):x}if(/^[\w_]+$/.test(l)&&t[l]!==void 0){let _=String(t[l]);return c?encodeURIComponent(_):_}return r=!1,n}),!r||s.includes("{%")?null:s}function kd(a,e){if(!a?.states||!e)return[];const t=[],i=a.states[e];if(!i)return[];const s=i.attributes?.device_id,r=je(a,i)||e;for(const[n,o]of Object.entries(a.states))if(n.startsWith("button.")&&o.attributes){const l=o.attributes.device_id,c=je(a,o)||n;s&&l===s?t.push({entity_id:n,friendly_name:c,device_class:o.attributes.device_class,reason:"same_device"}):c.toLowerCase().includes(r.toLowerCase())||r.toLowerCase().includes(c.toLowerCase())?t.push({entity_id:n,friendly_name:c,device_class:o.attributes.device_class,reason:"name_similarity"}):n.toLowerCase().includes(e.split(".")[1].toLowerCase())&&t.push({entity_id:n,friendly_name:c,device_class:o.attributes.device_class,reason:"entity_id_match"})}return t}function Ed(a,e){if(!a?.states||!e)return null;const t=a.states[e];return t&&t.attributes&&(t.attributes.media_content_id||t.attributes.media_content_type||t.attributes.media_album_name||t.attributes.media_artist||t.attributes.media_title)?t:null}function Ei(a){return!a||!a.attributes?!1:a.attributes.app_id==="music_assistant"||a.attributes.mass_player_type!==void 0||!!a.attributes.mass_player_id||!!a.attributes.active_queue}function Sd(a){if(!a)return"";const e=a.media_type||a.media_class||a.media_content_type,t=a.name||a.title||a.media_title||"Unknown Title",i=a.artists?.[0],s=a.artist||i?.name||(typeof i=="string"?i:void 0)||a.media_artist||"Unknown Artist";if(e==="track"){const r=a.album||a.media_album_name;return r?d("search.browse_album","{album}",r):`${t} - ${s}`}return e==="album"?d("search.browse_album","{album}",t):e==="artist"?t:e==="playlist"&&d("search.browse_playlist","{playlist}",t)||t}function Ad(a,e,t,i={}){if(!e||!Array.isArray(e)||!e.length)return null;const s=a?.attributes||{},r=a?.entity_id;if(i.isIdleImageActive){const h=e.find(p=>(p?.idle_image===!0||p?.idle_image_url!==void 0||p?.match_type==="idle_image")&&(!p?.entity_id||p.entity_id===r||p.entity_id==="*"));if(h){const p=h.idle_image_url||h.image_url||null;let _=null;return p&&(_=typeof t=="function"?t(h,p,"idle",a):p),{url:_,sizePercentage:h?.size_percentage,objectFit:h?.object_fit??null,objectPosition:h?.object_position??null}}return null}const n=()=>e.find(h=>h?.idle_image===!0||h?.match_type==="idle_image"?!1:vn.some(p=>{const _=h[p];if(_==null||_==="")return!1;if(p==="aspect_ratio"){const v=be(s,"entity_picture_local")||be(s,"entity_picture")||be(s,"album_art")||null;if(!v)return!1;let x=v.trim();(x.startsWith("'")&&x.endsWith("'")||x.startsWith('"')&&x.endsWith('"'))&&x.length>=2&&(x=x.slice(1,-1).trim());const k=x.match(/^url\((.*)\)$/i);k&&k[1]!==void 0&&(x=k[1].trim(),(x.startsWith("'")&&x.endsWith("'")||x.startsWith('"')&&x.endsWith('"'))&&(x=x.slice(1,-1).trim()));const E=i.aspectRatioCache?i.aspectRatioCache[x]:void 0;if(E==null)return!1;let S=parseFloat(_);if(typeof _=="string"&&_.includes(":")){const C=_.split(":");C.length===2&&!isNaN(Number(C[0]))&&!isNaN(Number(C[1]))&&parseFloat(C[1])!==0&&(S=parseFloat(C[0])/parseFloat(C[1]))}return isNaN(S)?!1:Math.abs(E-S)<=.1}const m=p==="entity_id"?r:p==="entity_state"?a?.state:s[p];if(_==="*")return!0;let f=bn.get(h);f||(f={},bn.set(h,f));let y=f[p];if(y===void 0)if(typeof _=="string"&&_.includes("*")&&_!=="*")try{const v=_.replace(/\*+/g,"*");if((v.match(/\*/g)||[]).length<=5){const x=v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*");y=new RegExp(`^${x}$`,"i"),f[p]=y}else f[p]=null,y=null}catch{f[p]=null,y=null}else f[p]=null,y=null;return y?y.test(String(m||"")):m===_})),o=be(s,"entity_picture_local")||be(s,"entity_picture")||be(s,"album_art");let l=n(),c=null,u="image";if(l?.image_url?c=l.image_url:l?.missing_art_url&&!o?(c=l.missing_art_url,u="missing"):l&&o&&(c=be(s,"entity_picture_local")||be(s,"entity_picture")||be(s,"album_art")),!l&&!o){const h=e.find(p=>p?.missing_art_url);h?.missing_art_url&&(l=h,c=h.missing_art_url,u="missing")}if(l){let h=null;return c&&(h=typeof t=="function"?t(l,c,u,a):c),{url:h,sizePercentage:l?.size_percentage,objectFit:l?.object_fit??null,objectPosition:l?.object_position??null}}return null}function fs(a,{hostname:e="",overrides:t=[],fallbackArtwork:i=null,artworkObjectFit:s=null,resolveOverrideSource:r=null,aspectRatioCache:n={},isIdleImageActive:o=!1}={}){if(!a||!a.attributes)return null;const l=a.attributes;let c=null,u=null,h=null;if(s==="no_artwork")return{url:null,sizePercentage:null,objectFit:"no_artwork"};const p=Ad(a,t,r,{aspectRatioCache:n||{},isIdleImageActive:o});let _=null;return p&&(c=p.url,u=p.sizePercentage,h=p.objectFit,_=p.objectPosition),!c&&!o&&(c=be(l,"entity_picture_local")||be(l,"entity_picture")||be(l,"album_art")||null),!c&&i&&!o&&(i==="smart"?l.media_title==="TV"||l.media_channel||l.app_id==="tv"||l.app_id==="androidtv"?c="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg0IiBoZWlnaHQ9IjE4NCIgdmlld0JveD0iMCAwIDE4NCAxODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjQwIiB5PSI0MCIgd2lkdGg9IjEwNCIgaGVpZ2h0PSI3OCIgcng9IjgiIGZpbGw9ImN1cnJlbnRDb2xvciIvcj4KPHJlY3QgeD0iNjgiIHk9IjEyMCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPHJlY3QgeD0iODAiIHk9IjEzMCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjgiIHJ4PSI0IiBmaWxsPSJjdXJyZW50Q29sb3IiLz4KPC9zdmc+Cg==":c="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTg0IiBoZWlnaHQ9IjE4NCIgdmlld0JveD0iMCAwIDE4NCAxODQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHg9IjM2IiB5PSI4NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjYyIiByeD0iOCIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxyZWN0IHg9IjY4IiB5PSI5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjkwIiByeD0iOCIgZmlsbD0iY3VycmVudENvbG9yIi8+CjxyZWN0IHg9IjEwMCIgeT0iNzAiIHdpZHRoPSIyMiIgaGVpZ2h0PSI3OCIgcng9IjgiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgo8cmVjdCB4PSIxMzIiIHk9IjQyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTA2IiByeD0iOCIgZmlsbD0iY3VycmVudENvbG9yIi8+Cjwvc3ZnPgo=":typeof i=="string"&&(c=i)),c=ys(c,e),{url:c,sizePercentage:u,objectFit:h,objectPosition:_}}function ys(a,e){let t=a;if(t&&e&&!/^https?:\/\//i.test(t)&&!t.startsWith("data:")){const i=e.endsWith("/")?e.slice(0,-1):e,s=t.startsWith("/")?t:`/${t}`;t=i+s}return t&&!Si(t)?null:t}function Si(a){if(!a||typeof a!="string"||a.includes("undefined")||a.includes("null")||a.trim()==="")return!1;if(a.startsWith("data:")||a.startsWith("/")||a.startsWith("./")||a.startsWith("../"))return!0;try{return new URL(a),!0}catch{return!1}}function ha(a,e){return a?.placement!==void 0?a.placement:typeof a?.in_menu=="string"?a.in_menu:a?.in_menu==="hidden"?"hidden":a?.in_menu===!0?"menu":"chip"}function xn(a,e){if(!a||typeof a!="string")return!0;const t=a.trim().toLowerCase();return!!(t===""||t==="airplay"||e&&typeof e=="string"&&t===e.trim().toLowerCase())}function $d(a,e){if(!a||!e)return!1;const t=a.attributes||{},i=e.attributes||{},s=typeof t.media_title=="string"?t.media_title.trim().toLowerCase():"",r=typeof i.media_title=="string"?i.media_title.trim().toLowerCase():"";if(s&&r&&s===r)return!0;const n=t.media_content_id,o=i.media_content_id;if(n&&o&&n===o)return!0;const l=typeof t.friendly_name=="string"?t.friendly_name.trim().toLowerCase():"",c=typeof i.friendly_name=="string"?i.friendly_name.trim().toLowerCase():"",u=typeof t.app_name=="string"?t.app_name.trim().toLowerCase():"",h=typeof i.app_name=="string"?i.app_name.trim().toLowerCase():"",p=typeof t.source=="string"?t.source.trim().toLowerCase():"",_=typeof i.source=="string"?i.source.trim().toLowerCase():"";return!!(r==="airplay"||h==="airplay"||_==="airplay"||s==="airplay"||u==="airplay"||p==="airplay"||l&&(r===l||_===l)||c&&(s===c||p===c)||s&&!r||!s&&!r)}function Cd({idx:a,selected:e,playing:t,name:i,art:s,icon:r,pinned:n,holdToPin:o,maActive:l,onChipClick:c,onIconClick:u=void 0,onPinClick:h,onPointerDown:p,onPointerMove:_,onPointerUp:m,objectFit:f,quickGroupingState:y,onQuickGroupClick:v,onDoubleClick:x}){const k=f?`object-fit: ${f};`:"";return g`
    <button
      class="chip"
      ?selected=${e}
      ?playing=${t}
      ?ma-active=${l}
      @dblclick=${x}
      @click=${()=>c(a)}
      @pointerdown=${p}
      @pointermove=${_}
      @pointerup=${m}
      @pointerleave=${m}
      style="display:flex;align-items:center;justify-content:space-between;position:relative;"
    >
      <span class="chip-icon">
        ${s?g`<img
                class="chip-mini-art"
                src="${s}"
                style="${k}"
                onerror="this.style.display='none'"
              />`:g`<ha-icon .icon=${r} style="font-size:28px;"></ha-icon>`}
      </span>
      <span
        class="chip-label"
        style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;"
      >
        ${i}
      </span>
      ${t?g`
              <span class="chip-playing-indicator">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </span>
            `:b}
      ${n?g`
              <span
                class="chip-pin-inside"
                @click=${E=>{E.stopPropagation(),h(a,E)}}
                title="${d("common.unpin")}"
              >
                <ha-icon .icon=${"mdi:pin"}></ha-icon>
              </span>
            `:g`<span class="chip-pin-spacer"></span>`}
      ${wn({idx:a,quickGroupingState:y,onQuickGroupClick:v})}
    </button>
  `}function Td({idx:a,selected:e,playing:t,groupName:i,art:s,icon:r,pinned:n,holdToPin:o,maActive:l,onChipClick:c,onIconClick:u,onPinClick:h,onPointerDown:p,onPointerMove:_,onPointerUp:m,objectFit:f,quickGroupingState:y,onQuickGroupClick:v,onDoubleClick:x}){const k=f?`object-fit: ${f};`:"";return g`
    <button
      class="chip group"
      ?selected=${e}
      ?ma-active=${l}
      @dblclick=${x}
      @click=${()=>c(a)}
      @pointerdown=${p}
      @pointermove=${_}
      @pointerup=${m}
      @pointerleave=${m}
      style="display:flex;align-items:center;justify-content:space-between;position:relative;"
    >
      <span
        class="chip-icon"
        style="cursor:pointer;"
        @click=${E=>{E.stopPropagation(),u&&u(a,E)}}
      >
        ${s?g`<img
                class="chip-mini-art"
                src="${s}"
                style="cursor:pointer;${k}"
                onerror="this.style.display='none'"
                @click=${E=>{E.stopPropagation(),u&&u(a,E)}}
              />`:g`<ha-icon
                .icon=${r}
                style="font-size:28px;cursor:pointer;"
                @click=${E=>{E.stopPropagation(),u&&u(a,E)}}
              ></ha-icon>`}
      </span>
      <span
        class="chip-label"
        style="flex:1;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;"
      >
        ${i}
      </span>
      ${t?g`
              <span class="chip-playing-indicator">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
              </span>
            `:b}
      ${n?g`
              <span
                class="chip-pin-inside"
                @click=${E=>{E.stopPropagation(),h(a,E)}}
                title="${d("common.unpin")}"
              >
                <ha-icon .icon=${"mdi:pin"}></ha-icon>
              </span>
            `:g`<span class="chip-pin-spacer"></span>`}
      ${wn({idx:a,quickGroupingState:y,onQuickGroupClick:v})}
    </button>
  `}function wn({idx:a,quickGroupingState:e,onQuickGroupClick:t}){if(!e||!e.isGroupable)return b;const{isPrimary:i,isBusy:s,grouped:r,tooltip:n}=e;return g`
    <span
      class="chip-quick-group"
      @click=${o=>{o.stopPropagation(),t&&!s&&!i&&t(a,o)}}
      title=${n||(i?"Primary":s?"Unavailable":r?"Unjoin":"Join")}
      style="${i?"cursor:default;opacity:0.7;":s?"opacity:0.5;cursor:not-allowed;":""}"
    >
      <ha-icon .icon=${i?"mdi:star-circle-outline":r?"mdi:minus":"mdi:plus"}></ha-icon>
    </span>
  `}function Id({onPin:a,onHoldEnd:e,holdTime:t=600,moveThreshold:i=8}){let s=null,r=null,n=null,o=!1;return{pointerDown:(l,c)=>{r=l.clientX,n=l.clientY,o=!1,s=setTimeout(()=>{o||(a(c,l),e&&e(c))},t)},pointerMove:(l,c)=>{if(s&&r!==null&&n!==null){const u=Math.abs(l.clientX-r),h=Math.abs(l.clientY-n);(u>i||h>i)&&(o=!0,clearTimeout(s),s=null)}},pointerUp:(l,c)=>{s&&(clearTimeout(s),s=null),r=null,n=null,o=!1}}}function kn({groupedSortedEntityIds:a,entityIds:e,selectedEntityId:t,pinnedIndex:i,holdToPin:s,getChipName:r,getActualGroupMaster:n,getIsChipPlaying:o,getChipArt:l,getIsMaActive:c,isIdle:u,hass:h,artworkHostname:p="",mediaArtworkOverrides:_=[],fallbackArtwork:m=null,onChipClick:f,onIconClick:y,onPointerClick:v=void 0,onPinClick:x,onPointerDown:k,onPointerMove:E,onPointerUp:S,quickGroupingMode:C,getQuickGroupingState:$,onQuickGroupClick:P,onDoubleClick:F}){return!a||!a.length?b:g`
    ${a.map(T=>{if(T.length>1){const I=n(T),O=e.indexOf(I),N=h?.states?.[I],W=typeof o=="function"?o(I,t===I):N?.state==="playing",Y=typeof l=="function"?l(I):fs(N,{hostname:p,overrides:_,fallbackArtwork:m}),U=Y?.url,L=Y?.objectFit,de=N?.attributes?.icon||"mdi:cast",Z=typeof c=="function"?c(I):!1;return Td({idx:O,selected:t===I,playing:W,groupName:r(I)+(T.length>1?` [${T.length}]`:""),art:U,icon:de,pinned:i===O,holdToPin:s,maActive:Z,onChipClick:f,onIconClick:y,onPinClick:x,onPointerDown:X=>k(X,O),onPointerMove:X=>E(X,O),onPointerUp:X=>S(X,O),objectFit:L,quickGroupingState:C&&typeof $=="function"?$(I):null,onQuickGroupClick:P,onDoubleClick:F})}else{const I=T[0],O=e.indexOf(I),N=h?.states?.[I],W=typeof o=="function"?o(I,t===I):N?.state==="playing",Y=typeof l=="function"?l(I):fs(N,{hostname:p,overrides:_,fallbackArtwork:m}),U=Y?.url,L=Y?.objectFit,de=t===I?!u&&U:W&&U,Z=N?.attributes?.icon||"mdi:cast",X=typeof c=="function"?c(I):!1;return Cd({idx:O,selected:t===I,playing:W,name:r(I),art:de,icon:Z,pinned:i===O,holdToPin:s,maActive:X,onChipClick:f,onPinClick:x,onPointerDown:J=>k(J,O),onPointerMove:J=>E(J,O),onPointerUp:J=>S(J,O),objectFit:L,quickGroupingState:C&&typeof $=="function"?$(I):null,onQuickGroupClick:P,onDoubleClick:F})}})}
  `}function Md({actions:a,onActionChipClick:e}){return a?.length?g`
    <div class="action-chip-row">
      ${a.map((t,i)=>g`
          <button class="action-chip" @click=${()=>e(i)}>
            ${t.icon?g`<ha-icon
                    .icon=${t.icon}
                    style="font-size: 22px; margin-right: ${t.name?"8px":"0"};"
                  ></ha-icon>`:b}
            ${t.name||""}
          </button>
        `)}
    </div>
  `:b}function Pd({stateObj:a,showStop:e,shuffleActive:t,repeatActive:i,onControlClick:s,supportsFeature:r,showFavorite:n,favoriteActive:o,hiddenControls:l={},adaptiveControls:c=!1,controlLayout:u="classic",swapPauseForStop:h=!1,lockScreenState:p=null}){if(!a)return b;const _=u==="modern"?"modern":"classic",m=!a||a.state!=="playing";let f=!l.previous&&(r(a,_n)||m),y=!l.play_pause;const v=!l.stop&&e;let x=v,k=!l.next&&(r(a,mn)||m),E=!l.shuffle&&r(a,gn),S=!l.repeat&&r(a,yn),C=!l.favorite&&n,$=!l.power&&(r(a,gs)||r(a,ms));const P=_==="modern"&&h&&v,F=a.state==="playing",T=P&&F,I=U=>p==="ready"?`${U} (${d("card.media_controls.lock_screen_ready")||"Lock screen controls active"})`:p==="connecting"?`${U} (${d("card.media_controls.lock_screen_connecting")||"Connecting lock screen controls..."})`:U;_==="modern"&&(x=!1,C=!1,$=!1);const O=vs(a,r,n,l,e,_),N=c?"controls-row adaptive":"controls-row",W=_==="modern"?`${N} modern`:N;let Y=b;if(c){const U=O<=3?{icon:56,minWidth:78,maxWidth:150,minHeight:78,padding:14,gap:14}:O===4?{icon:48,minWidth:68,maxWidth:130,minHeight:68,padding:12,gap:12}:O===5?{icon:42,minWidth:58,maxWidth:110,minHeight:58,padding:10,gap:10}:O===6?{icon:36,minWidth:50,maxWidth:96,minHeight:52,padding:8,gap:8}:{icon:32,minWidth:44,maxWidth:88,minHeight:48,padding:6,gap:6};Y=[`--yamp-control-count:${Math.max(O,1)}`,`--yamp-control-gap:${U.gap}px`,`--yamp-control-min-width:${U.minWidth}px`,`--yamp-control-max-width:${U.maxWidth}px`,`--yamp-control-min-height:${U.minHeight}px`,`--yamp-control-padding:${U.padding}px`,`--yamp-control-icon-size:${U.icon}px`].join(";")}return _==="modern"?g`
      <div class=${W} style=${Y}>
        <div class="controls-left">
          ${E?g`
                  <button
                    class="modern-button small${t?" active":""}"
                    @click=${()=>s("shuffle")}
                    title="${d("card.media_controls.shuffle")}"
                  >
                    <ha-icon .icon=${"mdi:shuffle"}></ha-icon>
                  </button>
                `:b}
          ${f?g`
                  <button
                    class="modern-button medium"
                    @click=${()=>s("prev")}
                    title="${d("card.media_controls.previous")}"
                  >
                    <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
                  </button>
                `:b}
        </div>

        <div class="controls-center">
          ${y?g`
                  <button
                    class="modern-button primary${F?" active":""}"
                    @click=${()=>s(T?"stop":"play_pause")}
                    title="${I(T?d("card.media_controls.stop"):d("card.media_controls.play_pause")||"Play/Pause")}"
                  >
                    <ha-icon
                      .icon=${T?"mdi:stop":F?"mdi:pause":"mdi:play"}
                    ></ha-icon>
                  </button>
                `:b}
        </div>

        <div class="controls-right">
          ${k?g`
                  <button
                    class="modern-button medium"
                    @click=${()=>s("next")}
                    title="${d("card.media_controls.next")}"
                  >
                    <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
                  </button>
                `:b}
          ${S?g`
                  <button
                    class="modern-button small${i?" active":""}"
                    @click=${()=>s("repeat")}
                    title="${d("card.media_controls.repeat")}"
                  >
                    <ha-icon
                      .icon=${a.attributes.repeat==="one"?"mdi:repeat-once":"mdi:repeat"}
                    ></ha-icon>
                  </button>
                `:b}
        </div>
      </div>
    `:g`
    <div class=${W} style=${Y}>
      ${f?g`
              <button
                class="button"
                @click=${()=>s("prev")}
                title="${d("card.media_controls.previous")}"
              >
                <ha-icon .icon=${"mdi:skip-previous"}></ha-icon>
              </button>
            `:b}
      ${y?g`
              <button
                class="button${a.state==="playing"?" active":""}"
                @click=${()=>s("play_pause")}
                title="${I(d("card.media_controls.play_pause")||"Play/Pause")}"
              >
                <ha-icon .icon=${a.state==="playing"?"mdi:pause":"mdi:play"}></ha-icon>
              </button>
            `:b}
      ${x?g`
              <button
                class="button"
                @click=${()=>s("stop")}
                title="${d("card.media_controls.stop")}"
              >
                <ha-icon .icon=${"mdi:stop"}></ha-icon>
              </button>
            `:b}
      ${k?g`
              <button
                class="button"
                @click=${()=>s("next")}
                title="${d("card.media_controls.next")}"
              >
                <ha-icon .icon=${"mdi:skip-next"}></ha-icon>
              </button>
            `:b}
      ${E?g`
              <button
                class="button${t?" active":""}"
                @click=${()=>s("shuffle")}
                title="${d("card.media_controls.shuffle")}"
              >
                <ha-icon .icon=${"mdi:shuffle"}></ha-icon>
              </button>
            `:b}
      ${S?g`
              <button
                class="button${i?" active":""}"
                @click=${()=>s("repeat")}
                title="${d("card.media_controls.repeat")}"
              >
                <ha-icon
                  .icon=${a.attributes.repeat==="one"?"mdi:repeat-once":"mdi:repeat"}
                ></ha-icon>
              </button>
            `:b}
      ${C?g`
              <button
                class="button${o?" active":""}"
                @click=${()=>s("favorite")}
                title="${d("common.favorite")}"
              >
                <ha-icon .icon=${o?"mdi:heart":"mdi:heart-outline"}></ha-icon>
              </button>
            `:b}
      ${$?g`
              <button
                class="button${a.state!=="off"?" active":""}"
                @click=${()=>s("power")}
                title="${d("common.power")}"
              >
                <ha-icon .icon=${"mdi:power"}></ha-icon>
              </button>
            `:b}
    </div>
  `}function vs(a,e,t=!1,i={},s=!1,r="classic"){const n=r==="modern"?"modern":"classic",o=!a||a.state==="idle"||a.state==="paused"||a.state==="off"||a.state==="standby"||a.state==="unavailable";let l=0;return!i.previous&&(e(a,_n)||o)&&l++,i.play_pause||l++,n!=="modern"&&!i.stop&&s&&l++,!i.next&&(e(a,mn)||o)&&l++,!i.shuffle&&e(a,gn)&&l++,!i.repeat&&e(a,yn)&&l++,n!=="modern"&&!i.favorite&&t&&l++,n!=="modern"&&!i.power&&(e(a,gs)||e(a,ms))&&l++,l}function Fd({isRemoteVolumeEntity:a,showSlider:e,vol:t,isMuted:i,supportsMute:s,onVolumeDragStart:r,onVolumeDragEnd:n,onVolumeInput:o,onVolumeChange:l,onVolumeStep:c,onMuteToggle:u,moreInfoMenu:h,leadingControlTemplate:p=b,reserveLeadingControlSpace:_=!1,showRightPlaceholder:m=!1,rightSlotTemplate:f=b,muteSlotTemplate:y=b,hideVolume:v=!1,collapseRow:x=void 0,isDragging:k=!1,dragVol:E=0}){const S=p!==b&&p!==void 0&&p!==null,C=($,P)=>(s?P:$===0)||$===0?"mdi:volume-off":$<.2?"mdi:volume-low":$<.5?"mdi:volume-medium":"mdi:volume-high";return g`
    <div
      class="volume-row ${e&&!a?"has-slider":""}"
      style="${(typeof x=="boolean"?x:v&&h===b&&!S&&!m)?"display: none !important;":""}"
    >
      <div class="volume-left">
        ${S?p:_?g`<div class="volume-leading-placeholder"></div>`:b}
        <div
          style="${v||a?"visibility:hidden; opacity:0; pointer-events:none;":""} display: flex; align-items: center; justify-content: center;"
        >
          ${y!==b?y:g`
                  <button
                    class="volume-icon-btn"
                    @click=${u}
                    title=${d((s?i:t===0)?"common.unmute":"common.mute")}
                  >
                    <ha-icon icon=${C(t,i)}></ha-icon>
                  </button>
                `}
        </div>
      </div>

      <div
        class="volume-center"
        style="${v?"visibility:hidden; opacity:0; pointer-events:none;":""}"
      >
        ${a?g`
                <div class="vol-stepper-container">
                  <div class="vol-stepper">
                    <button
                      class="button"
                      @click=${()=>c(-1)}
                      title="${d("common.vol_down")}"
                    >
                      –
                    </button>
                    <span class="vol-label">vol</span>
                    <button
                      class="button"
                      @click=${()=>c(1)}
                      title="${d("common.vol_up")}"
                    >
                      +
                    </button>
                  </div>
                </div>
              `:e?g`
                  <div class="volume-slider-container">
                    <div
                      class="volume-percentage-indicator ${k?"visible":""}"
                      style="left: calc(33px + ${E} * (100% - 66px))"
                    >
                      ${Math.round(E*100)}%
                    </div>
                    <input
                      class="vol-slider"
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      .value=${t}
                      @mousedown=${r}
                      @touchstart=${r}
                      @input=${o}
                      @change=${l}
                      @mouseup=${n}
                      @touchend=${n}
                      title="${d("common.volume")}"
                    />
                  </div>
                `:g`
                  <div class="vol-stepper-container">
                    <div class="vol-stepper">
                      <button
                        class="button"
                        @click=${()=>c(-1)}
                        title="${d("common.vol_down")}"
                      >
                        –
                      </button>
                      <span class="vol-value">${Math.round(t*100)}%</span>
                      <button
                        class="button"
                        @click=${()=>c(1)}
                        title="${d("common.vol_up")}"
                      >
                        +
                      </button>
                    </div>
                  </div>
                `}
      </div>

      <div class="volume-right">
        ${m?g` <div class="volume-placeholder">${f||b}</div> `:b}
        ${h}
      </div>
    </div>
  `}function En(a,e=!1){const t=typeof e=="boolean"?e:!!(e&&Number(e)>=3600);if(a==null||!Number.isFinite(Number(a)))return t?"0:00:00":"0:00";const i=Math.max(0,Math.floor(a)),s=Math.floor(i/3600),r=Math.floor(i%3600/60),n=i%60;return s>0||t?`${s}:${r<10?"0":""}${r}:${n<10?"0":""}${n}`:`${r}:${n<10?"0":""}${n}`}function pa({progress:a=0,seekEnabled:e=!1,onSeek:t=void 0,collapsed:i=!1,accent:s=void 0,height:r=Lt,style:n="",displayTimestamps:o=!1,currentTime:l=0,duration:c=0,customHeight:u=Lt}){const h=s||"var(--custom-accent, #ff9800)",p=i?Math.min(u,Math.max(4,Math.floor(u/2))):u,_=Math.min(6,p/2),m=Math.max(10,Math.min(24,Math.floor(p*.6+6))),f=`--progress-radius: ${_}px; --timestamp-size: ${m}px;`;return i?g`
      <div
        class="collapsed-progress-bar"
        style="width: ${a*100}%; background: ${h}; height: ${p}px; ${f} ${n}"
      ></div>
    `:g`
    <div class="progress-bar-container" style="${f} ${n}">
      <div
        class="progress-bar"
        style="height:${p}px;"
        @click=${e?t:null}
        title=${e?d("common.seek"):""}
      >
        <div
          class="progress-inner"
          style="width: ${a*100}%; background: ${h};"
        ></div>
      </div>
      ${o?g`
              <div class="timestamps-container">
                <span>${En(l,c)}</span>
                <span>-${En(Math.max(0,c-l),c)}</span>
              </div>
            `:b}
    </div>
  `}const q=Object.freeze({MEDIA_BACKGROUND:0,MEDIA_OVERLAY:0,LYRICS_OVERLAY:1,FLOATING_ELEMENT:3,STICKY_CHIPS:3,ACCENT_FOREGROUND:3,FLOATING_CONTROLS:3,OVERLAY_BASE:4,MODAL_BACKDROP:4,MODAL_TOAST:4,SEARCH_SLIDE_OUT:3,SEARCH_SUCCESS:3,VOLUME_OVERLAY:5}),Sn=ze`linear-gradient(to bottom, transparent 0px, black 30px, black calc(100% - 30px), transparent 100%)`,xe=ze`
  scrollbar-width: none;
  -ms-overflow-style: none;
`,_a=ze`blur(5px)`,An=ze`blur(10px)`,$n=ze`blur(20px)`,qt=ze`linear-gradient(to bottom, black 0%, black calc(100% - 12px), transparent 100%)`,Cn=ze`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`,Tn=ze`
  --card-bg: #fff;
  --primary-text: #222;
  --secondary-text: #666;
  --yamp-overlay-base: #fff;
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
`,In=ze`
  background: var(--card-bg, #fff);
  color: var(--primary-text, #222);
  border: 1px solid var(--yamp-overlay-divider, #bbb);
`,zd=ze`
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
    --yamp-artwork-position: top center;
    --yamp-text-scale: 1;
    --yamp-text-scale-details: 1;
    --yamp-text-scale-menu: 1;
    --yamp-text-scale-action-chips: 1;
    --yamp-details-scale: var(--yamp-text-scale-details, 1);
    --yamp-details-line-height: 1.2;
    --yamp-details-max-lines: 3;
    --yamp-details-line-clamp: 3;
    --yamp-details-display: -webkit-box;
    --yamp-details-white-space: normal;
    --yamp-section-bg: rgba(255, 255, 255, 0.02);
    --yamp-section-border: rgba(255, 255, 255, 0.1);
    --yamp-section-radius: 12px;
    --yamp-section-divider: rgba(255, 255, 255, 0.06);
    --yamp-section-title-size: 1em;
    --yamp-section-title-weight: 600;
    --yamp-section-description-size: 0.9em;
    --yamp-section-description-color: #888;

    /* Universal theme-aware variables (default to dark) */
    --yamp-overlay-base: #000;
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
    --yamp-overlay-base: var(--ha-card-background, var(--card-background-color, #000));
    --yamp-overlay-bg: color-mix(in srgb, var(--yamp-overlay-base), transparent 18%);
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
    display: flex;
    flex-direction: column;
    height: 100%;
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

  /* Static background color fallback for inset artwork layouts */
  ha-card.yamp-card:has(
      > .yamp-card-inner[data-has-background-image="false"][data-artwork-fit="scaled-contain"]
    ),
  ha-card.yamp-card:has(
      > .yamp-card-inner[data-has-background-image="false"][data-artwork-fit="scaled-contain-alternate"]
    ) {
    background: var(--card-bg);
  }

  .yamp-card-inner {
    position: relative;
    z-index: ${q.FLOATING_ELEMENT};
    height: 100%;
    min-height: 100%;
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    container-type: inline-size;
    border-radius: var(--border-radius);
    clip-path: inset(0 round var(--border-radius));
    transform: translateZ(0);
  }

  .card-background-image-layer {
    position: absolute;
    inset: 0;
    z-index: ${q.MEDIA_BACKGROUND};
    background-repeat: no-repeat;
    pointer-events: none;
    transform: translateZ(0);
  }

  .card-background-image-overlay {
    position: absolute;
    inset: 0;
    z-index: ${q.MEDIA_BACKGROUND};
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.6) 100%
    );
    transform: translateZ(0);
  }

  .yamp-card-inner[data-lyrics-active="true"] .card-background-image-overlay,
  :host([data-disable-artwork-gradient="true"]) .card-background-image-overlay {
    display: none !important;
  }

  .full-bleed-artwork-bg {
    position: absolute;
    inset: -50px;
    z-index: ${q.MEDIA_BACKGROUND};
    background-size: var(--yamp-artwork-bg-size, cover);
    background-position: var(--yamp-artwork-position, top center);
    background-repeat: no-repeat;
    pointer-events: none;
    transform: translateZ(0);
  }

  .full-bleed-artwork-fade {
    position: absolute;
    inset: -50px;
    z-index: ${q.MEDIA_OVERLAY};
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.92) 100%
    );
    transform: translateZ(0);
  }

  .yamp-card-inner[data-lyrics-active="true"] .full-bleed-artwork-fade,
  :host([data-disable-artwork-gradient="true"]) .full-bleed-artwork-fade {
    display: none !important;
  }

  /* Idle state dimming */
  .dim-idle .details,
  .dim-idle .controls-row,
  .dim-idle .volume-row,
  .dim-idle .more-info-menu.volume-collapsed,
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
    z-index: ${q.FLOATING_CONTROLS};
  }

  .dim-idle .more-info-menu,
  .more-info-menu.volume-collapsed {
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
    color: #fff;
  }

  .more-info-icon {
    font-size: 2em;
    line-height: 1;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color var(--transition-normal, 0.2s);
  }

  .dim-idle .more-info-icon {
    color: #fff;
  }

  :host([data-disable-artwork-gradient="true"]) .more-info-icon {
    color: var(--yamp-icon-color, var(--primary-text, #444));
  }

  :host([data-disable-artwork-gradient="true"]) .dim-idle .more-info-icon {
    color: var(--secondary-text, #9ea2a8);
  }

  /* Card artwork spacer */
  .card-artwork-spacer {
    width: 100%;
    flex: 1 1 0;
    height: auto;
    min-height: 0;
    pointer-events: none;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host(:not([data-has-custom-height="true"])) .card-artwork-spacer {
    min-height: 180px;
  }

  /* Media background */
  .media-bg-full {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: ${q.MEDIA_BACKGROUND};
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
    z-index: ${q.MEDIA_OVERLAY};
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
    z-index: ${q.FLOATING_CONTROLS};
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
    padding: 8px 12px 6px 12px;
    margin-bottom: 6px;
    position: relative;
    z-index: ${q.STICKY_CHIPS};
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    ${xe}
    scrollbar-color: var(--accent-color, #1976d2) #222;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x;
    max-width: 100vw;
    background: transparent;
    -webkit-mask-image: ${qt};
    mask-image: ${qt};
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
    z-index: ${q.STICKY_CHIPS};
    overflow-x: auto;
    white-space: nowrap;
    ${xe}
    font-size: calc(1em * var(--yamp-text-scale-action-chips, 1));
    background: transparent;
    -webkit-mask-image: ${qt};
    mask-image: ${qt};
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
    .chip-row .chip:hover,
    .action-chip-row .chip:hover,
    .entity-options-chips-strip .chip:hover,
    .search-filter-chips .chip:hover {
      background: var(--custom-accent);
      color: var(--yamp-chip-selected-text);
      opacity: 1;
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
    z-index: ${q.FLOATING_ELEMENT};
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
    flex-shrink: 0;
    gap: calc(8px * var(--yamp-details-scale, 1));
    margin-top: calc(8px * var(--yamp-details-scale, 1));
    min-height: calc(48px * var(--yamp-details-scale, 1));
    font-size: calc(1em * var(--yamp-details-scale, 1));
    flex-shrink: 0;
    position: relative;
    z-index: ${q.FLOATING_ELEMENT};
  }

  .details .title {
    font-size: 1.1em;
    font-weight: 600;
    line-height: var(--yamp-details-line-height, 1.2);
    white-space: var(--yamp-details-white-space, normal);
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: var(--yamp-details-display, -webkit-box);
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--yamp-details-line-clamp, var(--yamp-details-max-lines, 3));
    padding-top: calc(8px * var(--yamp-details-scale, 1));
    padding-bottom: calc(4px * var(--yamp-details-scale, 1));
    margin-bottom: calc(-4px * var(--yamp-details-scale, 1));
    max-width: 100%;
    position: relative;
  }

  .details .artist {
    font-size: 1em;
    line-height: var(--yamp-details-line-height, 1.2);
    padding-bottom: calc(4px * var(--yamp-details-scale, 1));
    margin-bottom: calc(-4px * var(--yamp-details-scale, 1));
    max-width: 100%;
    position: relative;
  }

  .marquee-inner {
    display: inline-block;
    white-space: inherit;
    max-width: 100%;
  }

  [data-marquee="true"] {
    overflow: hidden !important;
    display: block !important;
    text-overflow: clip !important;
    -webkit-line-clamp: unset !important;
    text-align: left !important;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
  }

  [data-marquee-dragging="true"],
  [data-marquee-dragging="true"] * {
    cursor: grabbing !important;
  }

  /* Single marquee mode (infinite loop when only 1 element overflows) */
  [data-marquee="true"]:not([data-marquee-sequential="true"]) > .marquee-inner {
    max-width: none !important;
    will-change: transform, opacity;
    animation: yamp-marquee var(--yamp-marquee-duration, 8s) ease-in-out infinite;
  }

  /* Sequential marquee mode (when both elements overflow) */
  [data-marquee="true"][data-marquee-sequential="true"] > .marquee-inner {
    max-width: none !important;
    transform: translateX(0);
    opacity: 1;
  }

  [data-marquee="true"][data-marquee-sequential="true"][data-marquee-active="true"]
    > .marquee-inner {
    will-change: transform, opacity;
    animation: yamp-marquee var(--yamp-marquee-duration, 8s) ease-in-out 1;
  }

  [data-marquee-paused="true"] > .marquee-inner {
    animation-play-state: paused !important;
  }

  [data-marquee-manual="true"] > .marquee-inner {
    animation: none !important;
    max-width: none !important;
    will-change: transform;
  }

  @media (hover: hover) {
    [data-marquee="true"]:hover > .marquee-inner,
    .details:hover [data-marquee="true"] > .marquee-inner {
      animation-play-state: paused;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-marquee="true"] > .marquee-inner,
    [data-marquee="true"][data-marquee-active="true"] > .marquee-inner {
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }

  @keyframes yamp-marquee {
    0%,
    22% {
      transform: translateX(0);
      opacity: 1;
    }
    72%,
    88% {
      transform: translateX(var(--yamp-marquee-distance, 0px));
      opacity: 1;
    }
    93% {
      transform: translateX(var(--yamp-marquee-distance, 0px));
      opacity: 0;
    }
    96% {
      transform: translateX(0);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
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

  :host([data-has-custom-height="true"]) .details {
    margin-top: calc(4px * var(--yamp-details-scale, 1));
    padding-bottom: calc(6px * var(--yamp-details-scale, 1));
    gap: calc(4px * var(--yamp-details-scale, 1));
  }

  :host([data-has-custom-height="true"]) .details .title {
    padding-top: calc(4px * var(--yamp-details-scale, 1));
  }

  :host([data-has-custom-height="true"]) .controls-row {
    padding-top: 2px;
    padding-bottom: 2px;
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
    position: relative;
    z-index: ${q.FLOATING_CONTROLS};
    flex-shrink: 0;
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
    gap: var(--yamp-modern-gap, 14px);
    padding: var(--yamp-modern-padding, 10px 16px 2px 16px);
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
    width: var(--yamp-modern-small-size, 42px);
    height: var(--yamp-modern-small-size, 42px);
    padding: 0;
  }

  .modern-button.medium {
    width: var(--yamp-modern-medium-size, 50px);
    height: var(--yamp-modern-medium-size, 50px);
    padding: 0;
  }

  .modern-button.primary {
    width: var(--yamp-modern-primary-size, 70px);
    height: var(--yamp-modern-primary-size, 70px);
    font-size: 1.9em;
    background: rgba(255, 255, 255, 0.1);
  }

  .modern-button ha-icon {
    --mdc-icon-size: var(--yamp-modern-small-icon-size, 24px);
    width: var(--yamp-modern-small-icon-size, 24px);
    height: var(--yamp-modern-small-icon-size, 24px);
  }

  .modern-button.medium ha-icon {
    --mdc-icon-size: var(--yamp-modern-medium-icon-size, 28px);
    width: var(--yamp-modern-medium-icon-size, 28px);
    height: var(--yamp-modern-medium-icon-size, 28px);
  }

  .modern-button.primary ha-icon {
    --mdc-icon-size: var(--yamp-modern-primary-icon-size, 36px);
    width: var(--yamp-modern-primary-icon-size, 36px);
    height: var(--yamp-modern-primary-icon-size, 36px);
  }

  @media (hover: hover) {
    .modern-button:hover {
      background: rgba(255, 255, 255, 0.25);
      color: var(--custom-accent);
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
    transition:
      background var(--transition-normal),
      color var(--transition-normal);
  }

  @media (hover: hover) {
    .button:hover {
      color: var(--custom-accent);
    }
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
    position: relative;
    z-index: ${q.FLOATING_ELEMENT};
  }

  .progress-bar {
    width: 100%;
    height: 4px;
    background: rgb(234, 234, 234);
    border-radius: var(--progress-radius, 2px);
    overflow: hidden;
    position: relative;
    cursor: pointer;
  }

  .progress-inner {
    height: 100%;
    background: var(--custom-accent);
    border-radius: var(--progress-radius, 3px) 0 0 var(--progress-radius, 3px);
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
    padding: var(--yamp-volume-row-padding, 10px 16px 14px 16px);
    position: relative;
    z-index: ${q.FLOATING_CONTROLS};
    flex-shrink: 0;
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

  .volume-icon-btn ha-icon,
  .custom-bottom-action ha-icon,
  .vol-stepper .button ha-icon {
    font-size: 22px;
    --mdc-icon-size: 22px;
    --ha-icon-size: 22px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    z-index: ${q.FLOATING_CONTROLS};
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
    ${Tn}
  }

  :host([data-appearance="light"]:not([data-match-theme="true"])) .source-dropdown {
    ${In}
  }

  @media (prefers-color-scheme: light) {
    :host([data-appearance="automatic"]:not([data-match-theme="true"])) {
      ${Tn}
    }

    :host([data-appearance="automatic"]:not([data-match-theme="true"])) .source-dropdown {
      ${In}
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
    z-index: ${q.FLOATING_ELEMENT};
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
    z-index: ${q.MEDIA_BACKGROUND};
    background-size: var(--yamp-artwork-bg-size, cover);
    background-position: var(--yamp-artwork-position, top center);
    background-repeat: no-repeat;
    pointer-events: none;
    height: 100%;
  }

  .card-lower-fade {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: ${q.MEDIA_OVERLAY};
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 55%,
      rgba(0, 0, 0, 0.92) 100%
    );
  }

  .yamp-card-inner[data-lyrics-active="true"] .card-lower-fade,
  :host([data-disable-artwork-gradient="true"]) .card-lower-fade {
    display: none !important;
  }

  .card-lower-content {
    position: relative;
    z-index: ${q.FLOATING_ELEMENT};
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .yamp-card-inner[data-lyrics-active="true"] .card-lower-content {
    z-index: auto;
    pointer-events: none;
  }

  .yamp-card-inner[data-lyrics-active="true"] .card-artwork-spacer {
    pointer-events: none !important;
    z-index: ${q.MEDIA_BACKGROUND};
  }

  .yamp-card-inner[data-lyrics-active="true"] .card-lower-content > :not(.card-artwork-spacer) {
    z-index: ${q.FLOATING_CONTROLS};
    pointer-events: auto;
  }

  .yamp-card-inner[data-lyrics-active="true"]
    .card-lower-content
    > :not(.card-artwork-spacer):not(.in-menu-active-label):not(.more-info-menu):not(
      .collapsed-artwork-container
    ):not(.collapsed-progress-bar) {
    position: relative;
  }

  .yamp-card-inner[data-lyrics-active="true"] .in-menu-active-label,
  .yamp-card-inner[data-lyrics-active="true"] .more-info-menu.volume-collapsed,
  .yamp-card-inner[data-lyrics-active="true"] .collapsed-artwork-container,
  .yamp-card-inner[data-lyrics-active="true"] .collapsed-progress-bar {
    position: absolute !important;
    z-index: ${q.FLOATING_CONTROLS};
  }

  .yamp-card-inner[data-lyrics-active="true"] .in-menu-active-label,
  .yamp-card-inner[data-lyrics-active="true"] .collapsed-progress-bar {
    pointer-events: none !important;
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

  /* Custom font color, Lyrics mode & Scaled Contain Alternate mode - use custom or theme colors */
  .yamp-card-inner[data-has-font-color="true"] .details,
  .yamp-card-inner[data-has-font-color="true"] .title,
  .yamp-card-inner[data-has-font-color="true"] .artist,
  .yamp-card-inner[data-has-font-color="true"] .source-menu-btn,
  .yamp-card-inner[data-has-font-color="true"] .source-selected,
  .yamp-card-inner[data-has-font-color="true"] .controls-row,
  .yamp-card-inner[data-has-font-color="true"] .button,
  .yamp-card-inner[data-has-font-color="true"] .modern-button,
  .yamp-card-inner[data-has-font-color="true"] .vol-stepper span,
  .yamp-card-inner[data-has-font-color="true"] .vol-label,
  .yamp-card-inner[data-has-font-color="true"] .more-info-btn ha-icon,
  .yamp-card-inner[data-has-font-color="true"] .volume-icon-btn,
  .yamp-card-inner[data-has-font-color="true"] .volume-icon-btn ha-icon,
  .yamp-card-inner[data-has-font-color="true"] .radio-mode-button,
  .yamp-card-inner[data-has-font-color="true"] .volume-slider-icon,
  .yamp-card-inner[data-has-font-color="true"] .timestamps-container,
  .yamp-card-inner[data-lyrics-active="true"] .details,
  .yamp-card-inner[data-lyrics-active="true"] .title,
  .yamp-card-inner[data-lyrics-active="true"] .artist,
  .yamp-card-inner[data-lyrics-active="true"] .source-menu-btn,
  .yamp-card-inner[data-lyrics-active="true"] .source-selected,
  .yamp-card-inner[data-lyrics-active="true"] .controls-row,
  .yamp-card-inner[data-lyrics-active="true"] .button,
  .yamp-card-inner[data-lyrics-active="true"] .modern-button,
  .yamp-card-inner[data-lyrics-active="true"] .vol-stepper span,
  .yamp-card-inner[data-lyrics-active="true"] .vol-label,
  .yamp-card-inner[data-lyrics-active="true"] .more-info-btn ha-icon,
  .yamp-card-inner[data-lyrics-active="true"] .volume-icon-btn,
  .yamp-card-inner[data-lyrics-active="true"] .volume-icon-btn ha-icon,
  .yamp-card-inner[data-lyrics-active="true"] .radio-mode-button,
  .yamp-card-inner[data-lyrics-active="true"] .volume-slider-icon,
  .yamp-card-inner[data-lyrics-active="true"] .timestamps-container,
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

  .yamp-card-inner[data-has-font-color="true"] .modern-button,
  .yamp-card-inner[data-lyrics-active="true"] .modern-button,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button {
    background: color-mix(in srgb, var(--primary-text), transparent 85%);
    box-shadow: none; /* Cleaner look on card background */
  }

  /* Hamburger icon (span) overrides */
  .yamp-card-inner[data-has-font-color="true"] .more-info-icon,
  .yamp-card-inner[data-lyrics-active="true"] .more-info-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .more-info-icon {
    color: var(--primary-text);
  }

  /* Ensure active buttons still use the accent color */
  .yamp-card-inner[data-lyrics-active="true"] .button.active,
  .yamp-card-inner[data-lyrics-active="true"] .button.active ha-icon,
  .yamp-card-inner[data-lyrics-active="true"] .modern-button.active,
  .yamp-card-inner[data-lyrics-active="true"] .modern-button.active ha-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .button.active,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .button.active ha-icon,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button.active,
  .yamp-card-inner[data-artwork-fit="scaled-contain-alternate"] .modern-button.active ha-icon {
    color: var(--custom-accent);
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: ${q.MEDIA_BACKGROUND};
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(96px, 50%, 184px);
    aspect-ratio: 1;
  }

  .media-artwork-placeholder svg {
    width: 100%;
    height: 100%;
    display: block;
    opacity: 0.85;
    pointer-events: none;
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
    z-index: ${q.FLOATING_ELEMENT};
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
    z-index: ${q.ACCENT_FOREGROUND};
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
    z-index: ${q.OVERLAY_BASE};
    background: var(--yamp-overlay-bg);
    backdrop-filter: ${_a};
    -webkit-backdrop-filter: ${_a};
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
    ${xe}
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
  :host([data-pin-search-headers="true"]) .entity-options-container,
  :host([data-in-search="true"]) .entity-options-container {
    max-height: 96%;
    ${xe}
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
    z-index: ${q.FLOATING_CONTROLS};
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
    height: 100%;
    padding: 18px 8px 0px 8px;
    padding-top: clamp(12px, 6vh, 18px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    ${xe}
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
    position: absolute !important;
    left: 50%;
    bottom: 6px;
    transform: translateX(-50%);
    font-size: 0.78em;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #fff;
    opacity: 0.78;
    pointer-events: none !important;
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
    z-index: ${q.STICKY_CHIPS};
    padding: 2px 4px 2px 4px;
    background: transparent;
  }

  .entity-options-chips-strip {
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    overflow-x: auto;
    padding: 2px 8px 6px 8px;
    background: var(--ha-menu-chip-row-background, transparent);
    -webkit-mask-image: ${qt};
    mask-image: ${qt};
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
    ${xe}
  }

  /* Hide scrollbar for group list scroll container */
  .group-list-scroll {
    ${xe}
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

  .entity-options-item[disabled] {
    opacity: 0.5;
    cursor: default;
  }

  .transfer-queue-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }

  /* Override entity-options-scroll display:flex (line ~3355) — !important needed because
     .grid-menu appears earlier in source order than .entity-options-scroll */
  .grid-menu {
    display: grid !important;
    grid-template-columns: repeat(5, 1fr); /* MINI_GRID_COLUMNS */
    gap: 0;
    padding: 0;
    margin: 8px 0;
  }

  .grid-menu .entity-options-item {
    margin: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--divider-color, var(--yamp-overlay-divider));
    border-right: 1px solid var(--divider-color, var(--yamp-overlay-divider));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 4px;
    min-height: 64px;
    gap: 6px;
    font-size: 0.7em;
  }

  /* Remove right border on last column */
  .grid-menu .entity-options-item:nth-child(5n) {
    /* MINI_GRID_COLUMNS */
    border-right: none;
  }

  .grid-menu .entity-options-item[disabled] {
    cursor: default;
    opacity: 0.5;
  }

  .grid-menu .entity-options-item.grid-active {
    color: var(--custom-accent);
  }

  /* Wrapper for grid-menu children — display:contents lets items participate in the grid directly */
  .grid-menu-items {
    display: contents;
  }

  /* Non-grid transfer queue layout */
  .transfer-queue-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* Give the icon a specific size in grid mode */
  .grid-menu .menu-action-icon,
  .grid-menu .entity-options-item > ha-icon {
    --mdc-icon-size: 24px;
    width: 24px;
    height: 24px;
    color: inherit;
    --mdc-icon-color: currentColor;
    --icon-color: currentColor;
  }

  .grid-menu .menu-action-label,
  .grid-menu .entity-options-item > span,
  .search-result-grid-mode .menu-action-label {
    line-height: 1.1;
    text-align: center;
    color: inherit;
  }

  .search-result-grid-mode {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--divider-color, var(--yamp-overlay-divider));
    border-right: 1px solid var(--divider-color, var(--yamp-overlay-divider));
    padding: 12px 4px;
    gap: 6px;
    font-size: 0.7em;
    width: 100%;
    height: 100%;
    background: transparent;
    cursor: pointer;
    box-sizing: border-box;
  }

  /* Remove right border on last column */
  .search-result-grid-mode:nth-child(5n) {
    /* MINI_GRID_COLUMNS */
    border-right: none;
  }

  .search-result-grid-mode .yamp-search-result-thumb,
  .search-result-grid-mode .yamp-search-result-thumb-placeholder {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
    margin: 0;
  }

  .search-result-grid-mode .yamp-search-result-thumb-placeholder {
    background-color: var(--yamp-surface-variant);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-result-grid-mode .yamp-search-result-thumb-placeholder ha-icon {
    --mdc-icon-size: 16px;
    width: 16px;
    height: 16px;
  }

  .search-result-grid-mode .menu-action-label {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    word-break: break-word;
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
    ${xe}
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
    z-index: ${q.ACCENT_FOREGROUND};
    padding: 0 8px 0 0;
    overflow-y: auto;
    max-height: calc(100% - 75px);
    min-width: 38px;
    ${xe}
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
    z-index: ${q.MEDIA_OVERLAY};
    min-height: 22px;
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .floating-source-index .source-index-letter[data-scale="max"] {
    transform: scale(1.38);
    z-index: ${q.OVERLAY_BASE};
  }

  .floating-source-index .source-index-letter[data-scale="large"] {
    transform: scale(1.19);
    z-index: ${q.FLOATING_ELEMENT};
  }

  .floating-source-index .source-index-letter[data-scale="med"] {
    transform: scale(1.1);
    z-index: ${q.MEDIA_OVERLAY};
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
    padding: 0px 10px 0px 10px;
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
    backdrop-filter: ${An};
    -webkit-backdrop-filter: ${An};
    z-index: ${q.SEARCH_SLIDE_OUT};
    display: flex;
    align-items: center;
    padding: 0 8px;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 15px 0 0 15px;
    overflow-x: auto;
    ${xe}
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
    backdrop-filter: ${$n};
    -webkit-backdrop-filter: ${$n};
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--yamp-overlay-text);
    font-weight: 600;
    font-size: 0.95em;
    z-index: ${q.SEARCH_SUCCESS};
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
    gap: 4px;
    margin-left: 7px;
    align-items: center;
  }

  .entity-options-search-play,
  .entity-options-search-queue,
  .queue-btn {
    min-width: 36px;
    height: 36px;
    border: none;
    background: transparent;
    color: var(--yamp-overlay-text);
    border-radius: 8px;
    padding: 0;
    margin: 0;
    cursor: pointer;
    box-shadow: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }

  .entity-options-search-play ha-icon,
  .entity-options-search-queue ha-icon,
  .queue-btn ha-icon {
    width: 24px;
    height: 24px;
    --mdc-icon-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
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
    align-items: center;
    gap: 4px;
    padding-right: 0;
  }

  .queue-drag-handle {
    cursor: grab;
    opacity: 0.6;
  }

  .queue-drag-handle:active {
    cursor: grabbing;
  }

  @media (hover: hover) {
    .queue-drag-handle:hover {
      opacity: 1;
      color: var(--custom-accent);
    }
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

  .entity-options-sheet .search-filter-chips {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .entity-options-sheet .search-filter-chips .chip {
    justify-content: center;
  }

  @media (hover: hover) {
    .entity-options-sheet .search-filter-chips .chip:hover {
      background: var(--custom-accent);
      color: var(--yamp-chip-selected-text);
      opacity: 1;
    }
  }

  .entity-options-sheet .entity-options-search-results {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    margin: 12px 0;
    padding-bottom: 0px;
    /* Hide scrollbars */
    ${xe}
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

  .entity-options-sheet:not([data-pin-search-headers="true"]):not(.search-mode)
    .entity-options-search {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
  }

  .search-header-panel {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    touch-action: pan-x;
    overscroll-behavior: contain;
    opacity: 1;
    will-change: margin-top, opacity;
  }

  .search-header-panel.smooth-transition {
    transition:
      margin-top 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      opacity 0.2s ease !important;
  }

  .search-header-panel.retracted {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  .entity-options-sheet[data-pin-search-headers="true"] .search-header-panel {
    transition: none !important;
    margin-top: 0px !important;
    opacity: 1 !important;
    transform: none !important;
    pointer-events: auto !important;
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

  .entity-options-sheet.search-mode,
  .entity-options-sheet[data-pin-search-headers="true"] {
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 0px;
  }

  .entity-options-sheet.search-mode .entity-options-search,
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
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    min-height: 0;
    ${xe}
  }

  /* Reserved space for persistent media controls when pinning or search mode is active */
  .entity-options-sheet.search-mode .search-sheet-results,
  .entity-options-sheet.search-mode .entity-options-search-results,
  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-scroll,
  .entity-options-sheet[data-pin-search-headers="true"] .group-list-scroll,
  .entity-options-sheet[data-pin-search-headers="true"] .search-sheet-results,
  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-search-results {
    margin-bottom: 72px;
    padding-bottom: 0px;
    background: none;
  }

  .entity-options-sheet.search-mode .entity-options-search,
  .entity-options-sheet[data-pin-search-headers="true"] .entity-options-search {
    margin-bottom: 0px;
    padding-bottom: 0px;
    background: none;
  }

  /* Adjust spacing when persistent controls are hidden (e.g. disabled in config or layout constraints) */
  :host([data-hide-persistent-controls="true"]) .entity-options-sheet.search-mode,
  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet[data-pin-search-headers="true"],
  :host([data-hide-menu-player="true"]) .entity-options-sheet.search-mode,
  :host([data-hide-menu-player="true"]) .entity-options-sheet[data-pin-search-headers="true"] {
    padding-bottom: 12px;
  }

  :host([data-hide-persistent-controls="true"]) .entity-options-sheet .entity-options-scroll,
  :host([data-hide-persistent-controls="true"]) .entity-options-sheet .entity-options-search,
  :host([data-hide-persistent-controls="true"]) .entity-options-sheet .search-sheet-results,
  :host([data-hide-persistent-controls="true"])
    .entity-options-sheet
    .entity-options-search-results,
  :host([data-hide-menu-player="true"]) .entity-options-sheet .entity-options-scroll,
  :host([data-hide-menu-player="true"]) .entity-options-sheet .entity-options-search,
  :host([data-hide-menu-player="true"]) .entity-options-sheet .search-sheet-results,
  :host([data-hide-menu-player="true"]) .entity-options-sheet .entity-options-search-results {
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
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
    ${xe}
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
  .entity-options-resolved-entities-list:not(.grid-menu) .entity-options-item {
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
    .entity-options-resolved-entities-list:not(.grid-menu) .entity-options-item:hover,
    .entity-options-resolved-entities-list:not(.grid-menu) .entity-options-item:focus {
      color: var(--custom-accent);
      background: none;
    }
  }

  .entity-options-resolved-entities-list:not(.grid-menu) .entity-options-item:last-child {
    border-bottom: none;
  }

  /* Clickable artist and album */
  .clickable-artist,
  .clickable-album {
    cursor: pointer;
  }

  @media (hover: hover) {
    .clickable-artist:hover,
    .clickable-album:hover {
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
    z-index: ${q.MODAL_BACKDROP};
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
    z-index: ${q.MODAL_TOAST};
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
    overscroll-behavior-y: contain;
    /* Hide scrollbars */
    ${xe}
  }

  .entity-options-sheet:not([data-pin-search-headers="true"]):not(.search-mode)
    .search-sheet-results,
  .entity-options-sheet:not([data-pin-search-headers="true"]):not(.search-mode)
    .entity-options-search-results {
    overflow-y: visible;
    margin-bottom: 72px;
    padding-bottom: 0px;
    flex: none;
    min-height: auto;
  }

  .queue-sortable-container {
    padding-bottom: 24px;
  }

  .queue-sortable-container.is-card-layout {
    display: grid;
    grid-template-columns: repeat(var(--search-card-columns, 4), 1fr);
    gap: 12px;
    padding: 12px 12px 24px 12px;
  }

  .queue-sortable-container.is-card-layout.grid-mode {
    gap: 0;
    padding: 0;
  }

  .queue-sortable-container.is-card-layout.grid-mode
    > .queue-drag-wrapper:nth-child(5n) /* MINI_GRID_COLUMNS */
    .search-result-grid-mode {
    border-right: none;
  }

  .queue-sortable-container.is-card-layout .queue-drag-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .queue-sortable-container.is-card-layout .yamp-search-result.search-result-card {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
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
    ${Cn}
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
    ${Cn}
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
    z-index: ${q.FLOATING_ELEMENT};
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
    z-index: ${q.VOLUME_OVERLAY};
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
`,jd=ze`
  :host {
    display: block;
    position: absolute;
    inset: 0;
    z-index: ${q.LYRICS_OVERLAY};
    overflow: hidden;
    pointer-events: auto;
    touch-action: pan-y;
    backdrop-filter: var(--yamp-lyrics-backdrop-filter, ${_a});
    -webkit-backdrop-filter: var(--yamp-lyrics-backdrop-filter, ${_a});
    background: var(
      --yamp-lyrics-bg,
      color-mix(in srgb, var(--yamp-overlay-base, #000) var(--yamp-lyrics-fade, 80%), transparent)
    );
    color: var(--yamp-lyrics-color, var(--primary-text-color, #fff));
  }

  .lyrics-scroll-container {
    position: absolute;
    top: var(--yamp-lyrics-top-offset, 0px);
    left: 0;
    right: 0;
    bottom: var(--yamp-lyrics-bottom-offset, 180px);
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 12px;
    padding-right: 12px;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    overscroll-behavior-y: contain;
    mask-image: var(--yamp-lyrics-mask, ${Sn});
    -webkit-mask-image: var(--yamp-lyrics-mask, ${Sn});
    ${xe}
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

  .plain-scroll-spacer-top {
    flex: 0 0 24px;
    width: 100%;
    min-height: 24px;
    pointer-events: none;
  }

  .plain-scroll-spacer-bottom {
    flex: 0 0 32px;
    width: 100%;
    min-height: 32px;
    pointer-events: none;
  }

  .lyric-line {
    font-size: calc(var(--yamp-lyrics-font-size, 1.6rem) * var(--yamp-text-scale-lyrics, 1));
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 24px;
    opacity: 0.4;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: default;
    pointer-events: none;
    color: var(
      --yamp-lyrics-inactive-color,
      var(--secondary-text-color, var(--primary-text-color, #fff))
    );
    width: 100%;
    max-width: 95%;
    text-align: center;
  }

  .lyric-line.active {
    opacity: 1;
    color: var(
      --yamp-lyrics-active-color,
      var(--yamp-primary-color, var(--custom-accent, var(--accent-color, #ffffff)))
    );
    font-size: calc(
      var(--yamp-lyrics-active-font-size, var(--yamp-lyrics-font-size, 1.6rem)) *
        var(--yamp-text-scale-lyrics, 1)
    );
    text-shadow: var(--yamp-overlay-text-shadow, 0 2px 4px rgba(0, 0, 0, 0.5));
  }

  .lyric-line.scroll-mode {
    opacity: 1;
    filter: none;
    transform: none;
    margin-bottom: 18px;
  }

  .lyric-line.unsynced {
    font-size: calc(
      var(--yamp-lyrics-unsynced-font-size, 1.1rem) * var(--yamp-text-scale-lyrics, 1)
    );
    opacity: 0.8;
    margin-bottom: 12px;
    filter: none;
  }

  .lyric-line.is-instrumental {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 32px;
    filter: none;
  }

  .lyric-instrumental-text {
    font-size: calc(
      var(--yamp-lyrics-instrumental-font-size, 1.4rem) * var(--yamp-text-scale-lyrics, 1)
    );
    font-weight: 700;
    line-height: 1.3;
    opacity: 0.85;
    text-align: center;
    letter-spacing: 0.3px;
    text-shadow: var(--yamp-overlay-text-shadow, 0 2px 4px rgba(0, 0, 0, 0.5));
  }

  /* Playing indicator animation - equalizer bars within lyricsStyles */
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

  .lyrics-playing-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: 24px;
    padding: 4px 8px;
    opacity: 0.4;
    transition:
      opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1),
      transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .lyrics-playing-indicator .bar {
    width: 4px;
    height: 6px;
    background: currentColor;
    border-radius: 2px;
    transition: height 0.3s ease;
  }

  .lyric-line.active .lyrics-playing-indicator {
    opacity: 1;
    transform: scale(1.15);
  }

  .lyric-line.active .lyrics-playing-indicator .bar:nth-child(1) {
    animation: chipPlayingBar1 0.8s ease-in-out 0s infinite;
  }

  .lyric-line.active .lyrics-playing-indicator .bar:nth-child(2) {
    animation: chipPlayingBar2 0.6s ease-in-out 0.15s infinite;
  }

  .lyric-line.active .lyrics-playing-indicator .bar:nth-child(3) {
    animation: chipPlayingBar3 0.7s ease-in-out 0.3s infinite;
  }

  :host([data-playing="false"]) .lyrics-playing-indicator .bar,
  .lyrics-playing-indicator.paused .bar {
    animation-play-state: paused !important;
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

  .queue-ops-progress {
    background: var(--yamp-chip-bg, rgba(255, 255, 255, 0.15));
    color: var(--search-text-secondary, #666);
    border-radius: 10px;
    padding: 3px 8px;
    font-size: 10.5px;
    font-weight: 500;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    animation: queueOpsFadeIn 0.2s ease-out forwards;
  }
  @keyframes queueOpsFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.95;
    }
  }

  /* Drag and drop upcoming queue styles */
  .queue-drag-wrapper {
    transition: transform 0.2s cubic-bezier(0.2, 0, 0, 1);
    overflow: visible;
  }

  .queue-drop-indicator {
    display: none;
  }

  .queue-drag-clone {
    border-radius: 12px;
    overflow: hidden;
  }

  /* Positioning is set inline in yamp-queue-drag.js */
  .queue-play-next-dropzone {
    transition:
      background 0.2s ease,
      border 0.2s ease,
      box-shadow 0.2s ease;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  @keyframes dropzoneFadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .queue-play-next-dropzone .dropzone-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .queue-play-next-dropzone ha-icon {
    color: var(--custom-accent, var(--accent-color, #ff9800));
  }
`,Dd=a=>class extends a{_findScrollParent(e){let t=e.parentElement;for(;t;){const i=window.getComputedStyle(t)?.overflowY;if(i==="auto"||i==="scroll")return t;!t.parentElement&&t.getRootNode&&t.getRootNode().host?t=t.getRootNode().host:t=t.parentElement}return null}_applyQueueDragVisuals(e,t,i){const s=this.renderRoot.querySelector(".queue-sortable-container");if(!s)return;const r=s.classList.contains("is-card-layout"),n=s.querySelectorAll(".queue-drag-wrapper");for(const o of n){const l=parseInt(o.dataset.queueIdx,10);if(!isNaN(l)){if(l===e){o.style.opacity="0",o.style.pointerEvents="none",r&&(o.style.order=i!==null?i:l);continue}if(r){o.style.transform="";let c=l;i!==null&&(e<i&&l>e&&l<=i?c=l-1:e>i&&l>=i&&l<e&&(c=l+1)),o.style.order=c}else o.style.order="",i===null?o.style.transform="":e<i?l>e&&l<=i?o.style.transform=`translateY(${-t}px)`:o.style.transform="":l>=i&&l<e?o.style.transform=`translateY(${t}px)`:o.style.transform=""}}}_clearQueueDragVisuals(){const e=this.renderRoot.querySelector(".queue-sortable-container");if(!e)return;const t=e.querySelectorAll(".queue-drag-wrapper");for(const i of t)i.style.transform="",i.style.maxHeight="",i.style.overflow="",i.style.margin="",i.style.padding="",i.style.opacity="",i.style.pointerEvents="",i.style.order=""}_onQueueDragStart(e){if((this.config?.queue_controls_style||"drag_handle")==="drag_handle"){if(!e.target.closest||!e.target.closest(".queue-drag-handle"))return}else return;const t=e.target.closest(".queue-drag-wrapper");if(!t)return;const i=parseInt(t.dataset.queueIdx,10);if(isNaN(i))return;this._activeDragCleanup&&this._activeDragCleanup(),e.stopPropagation(),e.preventDefault();const s=e.clientY,r=e.clientX;let n=null,o=!1,l=null,c=0,u=0,h=null,p=0,_=null,m=null,f=null,y=null,v=null,x=!1,k=s,E=r,S=null,C=null,$=0;const P=e.pointerType==="touch"||e.pointerType==="pen",F=P?300:null;let T=0;const I=(Z,X)=>{if(!C)return;if(m)if(x){m._isActive||(m._isActive=!0,m.style.background="rgba(76, 175, 80, 0.4)",m.style.borderColor="#4caf50",m.style.borderStyle="solid",y&&(y.style.color="#4caf50"),v&&(v.style.color="#4caf50")),S!==0&&(S=0,this._queueDropTargetIdx=0,this._applyQueueDragVisuals(i,T,0));return}else m._isActive&&(m._isActive=!1,m.style.background="var(--ha-card-background, var(--card-background-color, #1c1c1c))",m.style.borderColor="var(--custom-accent, var(--accent-color, #ff9800))",m.style.borderStyle="dashed",y&&(y.style.color=""),v&&(v.style.color=""));const J=h?h.scrollTop-$:0;let ee=null,ae=1/0;for(const Pe of C){if(Pe.idx===i)continue;const Ke=Pe.midY-J,nt=Z-Pe.midX,gt=X-Ke,Ye=Math.sqrt(nt*nt+gt*gt);Ye<ae&&(ae=Ye,ee=Pe.idx)}ee!==null&&ee!==S&&(S=ee,this._queueDropTargetIdx=ee,this._applyQueueDragVisuals(i,T,ee))},O=()=>{!o||!h||(p!==0&&(h.scrollTop+=p,I(E,k)),_=requestAnimationFrame(O))},N=()=>{o=!0,this._isDragging=!0,this._queueDragIdx=i,this._queueDropTargetIdx=null,S=null;const Z=t.getBoundingClientRect();T=Z.height;const X=this.renderRoot.querySelector(".queue-sortable-container");if(X){X.style.setProperty("--queue-drag-item-h",`${Z.height}px`),X.style.touchAction="none",h=this._findScrollParent(X),h&&(_=requestAnimationFrame(O),$=h.scrollTop);const ee=X.querySelectorAll(".queue-drag-wrapper > *:first-child");C=[];for(const Ke of ee){const nt=Ke.parentElement,gt=parseInt(nt.dataset.queueIdx,10);if(!isNaN(gt)){const Ye=Ke.getBoundingClientRect();C.push({idx:gt,midX:Ye.left+Ye.width/2,midY:Ye.top+Ye.height/2})}}m=document.createElement("div"),m.className="queue-play-next-dropzone",m.innerHTML=`
            <div class="dropzone-content">
              <ha-icon icon="mdi:playlist-play"></ha-icon>
              <span>${d("search.play_next")}</span>
            </div>
          `;const ae=this.getBoundingClientRect(),Pe=Math.max(56,Math.round(ae.height*.1));m.style.cssText=`
            position: fixed;
            top: ${ae.top}px;
            left: ${ae.left}px;
            width: ${ae.width}px;
            height: ${Pe}px;
            z-index: 99998;
            pointer-events: auto;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 2px dashed var(--custom-accent, var(--accent-color, #ff9800));
            border-radius: var(--border-radius, 16px) var(--border-radius, 16px) 0 0;
            opacity: 0.95;
          `,this.renderRoot.appendChild(m),f=m.getBoundingClientRect(),y=m.querySelector(".dropzone-content"),v=m.querySelector("ha-icon")}this._applyQueueDragVisuals(i,T,null);const J=t.firstElementChild;if(J){const ee=J.getBoundingClientRect();c=s-ee.top,u=r-ee.left,l=J.cloneNode(!0),l.classList.add("queue-drag-clone"),l.style.cssText=`
            position: fixed;
            left: ${ee.left}px;
            top: ${ee.top}px;
            width: ${ee.width}px;
            height: ${ee.height}px;
            z-index: 99999;
            pointer-events: none;
            transform: scale(1.03);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
            background: var(--card-background-color, #1c1c1c);
            border: 1px solid var(--custom-accent, #ff9800);
            border-radius: 12px;
            opacity: 0.95;
            transition: transform 0.1s ease;
            will-change: top;
          `,this.renderRoot.appendChild(l)}};F!==null&&(n=setTimeout(N,F));const W=Z=>{if(Z.stopPropagation(),!o){const X=Math.abs(Z.clientY-s);P?X>10&&(n&&(clearTimeout(n),n=null),de()):X>5&&N();return}if(Z.preventDefault(),k=Z.clientY,E=Z.clientX,x=!1,f&&k>=f.top&&k<=f.bottom&&E>=f.left&&E<=f.right&&(x=!0),l&&(l.style.top=`${k-c}px`,l.style.left=`${E-u}px`),h)if(x)p=0;else{const X=h.getBoundingClientRect(),J=k-X.top,ee=X.bottom-k,ae=60;J<ae&&J>-50?p=-Math.max(2,(ae-J)*.3):ee<ae&&ee>-50?p=Math.max(2,(ae-ee)*.3):p=0}I(E,k)},Y=Z=>{if(Z.stopPropagation(),n&&(clearTimeout(n),n=null),o){const X=Date.now();if(this._dragClickCaptureFn&&window.removeEventListener("click",this._dragClickCaptureFn,!0),this._dragClickCaptureTimeout&&clearTimeout(this._dragClickCaptureTimeout),this._dragClickCaptureFn=J=>{Date.now()-X<200&&(J.stopPropagation(),J.preventDefault()),window.removeEventListener("click",this._dragClickCaptureFn,!0),this._dragClickCaptureFn=null},window.addEventListener("click",this._dragClickCaptureFn,!0),this._dragClickCaptureTimeout=setTimeout(()=>{this._dragClickCaptureFn&&(window.removeEventListener("click",this._dragClickCaptureFn,!0),this._dragClickCaptureFn=null)},1e3),this._clearQueueDragVisuals(),S!==null&&S!==i){const J=S;this._queueDragIdx=null,this._queueDropTargetIdx=null,this._isDragging=!1,this._onQueueItemMoved({detail:{oldIndex:i,newIndex:J}})}else this._queueDragIdx=null,this._queueDropTargetIdx=null,this._isDragging=!1,this.requestUpdate()}else this._queueDragIdx=null,this._queueDropTargetIdx=null,this._isDragging=!1;de()},U=Z=>{Z.stopPropagation(),n&&(clearTimeout(n),n=null),this._clearQueueDragVisuals(),this._queueDragIdx=null,this._queueDropTargetIdx=null,this._isDragging=!1,this.requestUpdate(),de()},L=Z=>{o&&Z.preventDefault()},de=()=>{window.removeEventListener("pointermove",W),window.removeEventListener("pointerup",Y),window.removeEventListener("pointercancel",U),window.removeEventListener("touchmove",L),n&&(clearTimeout(n),n=null),_&&(cancelAnimationFrame(_),_=null);const Z=this.renderRoot.querySelector(".queue-sortable-container");Z&&(Z.style.touchAction=""),l&&l.parentNode&&l.remove(),l=null,m&&m.parentNode&&m.remove(),m=null,f=null,y=null,v=null,this._activeDragCleanup=null};this._activeDragCleanup=de,window.addEventListener("pointermove",W),window.addEventListener("pointerup",Y),window.addEventListener("pointercancel",U),window.addEventListener("touchmove",L,{passive:!1})}};function Mn(a){if(!a||typeof a!="string")return[];const e=a.split(/\r?\n/),t=[],i=/\[(\d+):([0-5]\d)(?:[.:](\d{2,3}))?\]/g;e.forEach(n=>{if(n=n.trim(),!n||n.match(/\[[a-zA-Z]+:[^\]]+\]/)&&!n.match(i))return;let o,l=n.replace(i,"").trim();const c=[];for(i.lastIndex=0;(o=i.exec(n))!==null;){const u=parseInt(o[1],10),h=parseInt(o[2],10),p=o[3]?parseInt(o[3],10):0,_=o[3]?o[3].length===3?1e3:100:1e3,m=u*60+h+p/_;c.push(m)}c.length>0?c.forEach(u=>{t.push({time:u,text:l})}):t.push({time:null,text:l})});const s=t.filter(n=>n.text!==""||n.time===null);if(s.sort((n,o)=>n.time===null&&o.time===null?0:n.time===null?1:o.time===null?-1:n.time-o.time),s.length===1&&/^(\[|\()?instrumental(\s+track)?(\]|\))?$/i.test(s[0].text.trim()))return[{time:0,text:d("lyrics.instrumental")||"Instrumental Track",isInstrumental:!0}];const r=s.filter(n=>n.time!==null);if(r.length>0){const n=[];r[0].time>=10&&n.push({time:0,text:"",isInstrumental:!0});for(let l=0;l<r.length;l++)if(n.push(r[l]),l<r.length-1){const c=r[l],u=r[l+1].time-c.time;if(u>=10){const h=u>=6?c.time+3:c.time+u/2;n.push({time:h,text:"",isInstrumental:!0})}}const o=s.filter(l=>l.time===null);return[...n,...o]}return s}class Rd extends ct{static get properties(){return{hass:{type:Object},lyrics:{type:Array},position:{type:Number},loading:{type:Boolean},error:{type:Boolean},playing:{type:Boolean},activeThemeColor:{type:String},mode:{type:String},preRoll:{type:Number},_activeIndex:{state:!0}}}static get styles(){return jd}constructor(){super(),this.lyrics=[],this.position=0,this.loading=!1,this.error=!1,this.playing=!0,this.activeThemeColor="#ffffff",this.mode="default",this.preRoll=0,this._activeIndex=-1,this._isScrolling=!1,this._scrollTimeout=null}disconnectedCallback(){super.disconnectedCallback(),this._scrollTimeout&&(clearTimeout(this._scrollTimeout),this._scrollTimeout=null)}firstUpdated(){if(this.lyrics?.length===1&&this.lyrics[0].isInstrumental&&(this._activeIndex=0),this._activeIndex!==-1)this._scrollToActive("auto");else{const e=this.renderRoot.querySelector(".lyrics-scroll-container");e&&(e.scrollTop=0)}}updated(e){if(super.updated(e),e.has("lyrics")){this._activeIndex=-1;const t=this.lyrics?.length===1&&!!this.lyrics[0].isInstrumental,i=!t&&!this.lyrics?.some(r=>r.time!==null),s=!t&&this.mode==="text";if(i||s){const r=this.renderRoot.querySelector(".lyrics-scroll-container");r&&r.scrollTo({top:0,behavior:"auto"})}else requestAnimationFrame(()=>this._scrollToActive("auto"))}(e.has("position")||e.has("lyrics"))&&this._updateActiveLyric()}_updateActiveLyric(){if(!this.lyrics||this.lyrics.length===0)return;if(this.lyrics.length===1&&this.lyrics[0].isInstrumental){this._activeIndex!==0&&(this._activeIndex=0,this.updateComplete.then(()=>this._scrollToActive()));return}if(this.mode==="text"||!this.lyrics.some(i=>i.time!==null))return;let e=-1;const t=this.position+this.preRoll;for(let i=0;i<this.lyrics.length;i++)if(this.lyrics[i].time!==null&&this.lyrics[i].time<=t)e=i;else if(this.lyrics[i].time!==null&&this.lyrics[i].time>t)break;e!==this._activeIndex&&(this._activeIndex=e,e!==-1&&this.updateComplete.then(()=>this._scrollToActive()))}_scrollToActive(e="smooth"){if(this._isScrolling&&e==="smooth")return;const t=this.renderRoot.querySelector(".lyrics-scroll-container"),i=t?.querySelector(".lyric-line.active");if(t&&i){const s=t.clientHeight/2,r=i.offsetTop,n=i.clientHeight,o=r+n/2-s;t.scrollTo({top:o,behavior:e})}}_handleScroll(){this._isScrolling=!0,this._scrollTimeout&&clearTimeout(this._scrollTimeout),this._scrollTimeout=setTimeout(()=>{this._isScrolling=!1,this._scrollToActive()},3e3)}render(){if(this.error)return g`
        <div class="lyrics-error">
          <ha-icon icon="mdi:text-box-remove-outline"></ha-icon>
          <div>${d("lyrics.not_available")}</div>
        </div>
      `;if(this.loading)return g``;if(!this.lyrics||this.lyrics.length===0)return g`
        <div class="lyrics-empty">
          <ha-icon icon="mdi:text-box-search-outline"></ha-icon>
          <div>${d("lyrics.none_found")}</div>
        </div>
      `;const e=this.lyrics.length===1&&!!this.lyrics[0].isInstrumental,t=!e&&!this.lyrics.some(s=>s.time!==null),i=!e&&this.mode==="text";return g`
      <div
        class="lyrics-scroll-container"
        @scroll=${this._handleScroll}
        style="--yamp-primary-color: ${this.activeThemeColor}"
      >
        ${t||i?g`<div class="plain-scroll-spacer-top"></div>`:g`<div class="scroll-spacer"></div>`}
        ${this.lyrics.map((s,r)=>{const n=r===this._activeIndex||e,o=this.mode==="scroll",l={"lyric-line":!0,active:n&&!t,unsynced:t||i,"scroll-mode":o&&!t,"is-instrumental":!!s.isInstrumental};return s.isInstrumental?g`
              <div class="${us(l)}" aria-label=${s.text||"Instrumental Break"}>
                ${s.text?g`<div class="lyric-instrumental-text">${s.text}</div>`:b}
                <span class="lyrics-playing-indicator ${this.playing===!1?"paused":""}">
                  <span class="bar"></span>
                  <span class="bar"></span>
                  <span class="bar"></span>
                </span>
              </div>
            `:g` <div class="${us(l)}">${s.text}</div> `})}
        ${t||i?g`<div class="plain-scroll-spacer-bottom"></div>`:g`<div class="scroll-spacer"></div>`}
      </div>
    `}}customElements.define("yamp-lyrics-view",Rd);let Ai=null;function Od(){if(Ai)return Ai;const a=48e3,e=10,t=1,i=16,s=a*e,r=s*(i/8),n=new ArrayBuffer(44+r),o=new DataView(n);function l(u,h){for(let p=0;p<h.length;p++)o.setUint8(u+p,h.charCodeAt(p))}l(0,"RIFF"),o.setUint32(4,36+r,!0),l(8,"WAVE"),l(12,"fmt "),o.setUint32(16,16,!0),o.setUint16(20,1,!0),o.setUint16(22,t,!0),o.setUint32(24,a,!0),o.setUint32(28,a*t*(i/8),!0),o.setUint16(32,t*(i/8),!0),o.setUint16(34,i,!0),l(36,"data"),o.setUint32(40,r,!0);let c=44;for(let u=0;u<s;u++){const h=Math.round(Math.sin(2*Math.PI*24*u/a)*24);o.setInt16(c,h,!0),c+=2}try{const u=new Blob([n],{type:"audio/wav"});Ai=URL.createObjectURL(u)}catch{Ai=""}return Ai}function Ld(a){if(!a)return"";const e=typeof a=="string"?a:a?.url;if(!e||typeof e!="string")return"";try{return new URL(e,window.location.href).href}catch{return e}}let te=null,ue=null;function Pn(){if(ue){if(!ue.parentNode&&typeof document<"u"&&document.body)try{document.body.appendChild(ue)}catch{}return ue}const a=Od();if(!a||typeof document>"u")return null;if(ue=document.createElement("audio"),ue.src=a,ue.loop=!0,ue.preload="auto",ue.setAttribute("style","position:fixed;width:0;height:0;opacity:0;pointer-events:none;bottom:0;right:0;"),ue.setAttribute("playsinline",""),ue.setAttribute("webkit-playsinline",""),ue.addEventListener("timeupdate",()=>{te?._onAudioTimeUpdate()}),ue.addEventListener("playing",()=>{te?._onAudioPlaying()}),ue.addEventListener("pause",()=>{te?._onAudioPause()}),ue.addEventListener("seeked",()=>{te?._onAudioSeeked()}),document.body)try{document.body.appendChild(ue)}catch{}return ue}class qd{constructor(e){this.card=e,this._isAudioPlaying=!1,this._isInternalPause=!1,this._hasStartedPlaying=!1,this._autoplayBlocked=!1,this._wasInterrupted=!1,this._unlocked=!1,this._lastMetadata=null,this._pauseDebounceTimer=null,this._lastSeekPos=null,this._lastSeekTimeout=null,this._internalPauseTimer=null,this._isApplePlatform=typeof navigator<"u"&&/iPhone|iPod|iPad|Macintosh|MacIntel/i.test(navigator.userAgent),this._lastReportedState=null,this._wasEvicted=!1,this._hasUserInteraction=!1,this._lastTrackKey=null,this._lastPlaybackState=null,this._unlockListenersAttached=!1,this._isSeeking=!1,this._lastRegisteredTargetEntityId=null,this._lastPositionStateKey=null,this.onReadyChange=null,this._onUserInteractionUnlock=this._onUserInteractionUnlock.bind(this),this._onAudioTimeUpdate=this._onAudioTimeUpdate.bind(this),this._onAudioPlaying=this._onAudioPlaying.bind(this),this._onAudioPause=this._onAudioPause.bind(this),this._onAudioSeeked=this._onAudioSeeked.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),!this.card?._isEditorPreview&&this.card?._isMediaSessionEnabled&&(this._attachUnlockListeners(),typeof document<"u"&&document.addEventListener("visibilitychange",this._onVisibilityChange))}get _audio(){return this.card?._isEditorPreview?null:Pn()}get isSupported(){return typeof navigator<"u"&&"mediaSession"in navigator}get isReady(){return!!(this._isAudioPlaying&&this._audio&&!this._audio.paused&&!this._wasInterrupted&&this._hasStartedPlaying)}get lockScreenState(){return!this.isSupported||!this._isAudioPlaying||this._wasInterrupted?null:this.isReady?"ready":"connecting"}_notifyStateChange(){const e=this.lockScreenState;this._lastReportedState!==e&&(this._lastReportedState=e,this.onReadyChange?.(e))}_initAudio(){this.card?._isEditorPreview||Pn()}_onAudioTimeUpdate(){if(!this._isSeeking&&this._audio&&this._audio.currentTime>=8){this._isSeeking=!0,this._isInternalPause=!0;try{this._audio.currentTime=.5}catch{this._isSeeking=!1,this._isInternalPause=!1}this._internalPauseTimer&&clearTimeout(this._internalPauseTimer),this._internalPauseTimer=setTimeout(()=>{this._internalPauseTimer=null,this._isInternalPause=!1,this._isSeeking=!1},600)}}_onAudioSeeked(){this._isSeeking=!1,this._internalPauseTimer&&clearTimeout(this._internalPauseTimer),this._internalPauseTimer=setTimeout(()=>{this._internalPauseTimer=null,this._isInternalPause=!1},200)}_onAudioPlaying(){if(!this._isAudioPlaying){this._audio&&(this._isInternalPause=!0,this._audio.pause());return}this._hasStartedPlaying=!0,this._autoplayBlocked=!1,this._wasInterrupted=!1,this._notifyStateChange()}_onAudioPause(){if(this._wasEvicted||this._isInternalPause||this._isSeeking||this._audio&&this._audio.seeking){this._isInternalPause=!1;return}!this._isAudioPlaying||!this._hasStartedPlaying||(this._wasInterrupted=!0,this._hasStartedPlaying=!1,this._pauseDebounceTimer&&(clearTimeout(this._pauseDebounceTimer),this._pauseDebounceTimer=null),this.reset())}_onVisibilityChange(){typeof document<"u"&&document.visibilityState==="visible"&&(this._autoplayBlocked=!1,this._wasInterrupted&&(this._wasInterrupted=!1,setTimeout(()=>{this.card?.requestUpdate?.()},0)))}resumeFromUserGesture(){this.card?._isEditorPreview||(this._wasInterrupted=!1,this._autoplayBlocked=!1,this._wasEvicted=!1,this._hasUserInteraction=!0,this._attachUnlockListeners())}_onUserInteractionUnlock(){if(!this.card?._isEditorPreview&&(this._unlocked=!0,this._autoplayBlocked=!1,this._isAudioPlaying&&this._audio&&this._audio.paused)){if(te&&te!==this&&te._isAudioPlaying)return;te=this,this._initAudio();const e=this._audio?.play();e!==void 0&&e.then(()=>{this._hasStartedPlaying=!0,this._autoplayBlocked=!1,this._notifyStateChange(),this._detachUnlockListeners()}).catch(()=>{})}}_attachUnlockListeners(){this.card?._isEditorPreview||!this.card?._isMediaSessionEnabled||typeof window>"u"||this._unlockListenersAttached||(["pointerdown","mousedown","click","touchstart","touchend","keydown"].forEach(e=>{window.addEventListener(e,this._onUserInteractionUnlock,{capture:!0,passive:!0})}),this._unlockListenersAttached=!0)}_detachUnlockListeners(){typeof window>"u"||!this._unlockListenersAttached||(["pointerdown","mousedown","click","touchstart","touchend","keydown"].forEach(e=>{window.removeEventListener(e,this._onUserInteractionUnlock,{capture:!0})}),this._unlockListenersAttached=!1)}_startAudio(){if(this.card?._isEditorPreview||(this._initAudio(),!this._audio)||this._isAudioPlaying&&!this._audio.paused)return;if(this._autoplayBlocked){this._attachUnlockListeners();return}this._isAudioPlaying=!0,this._notifyStateChange();const e=this._audio.play();e!==void 0&&e.then(()=>{this._hasStartedPlaying=!0,this._autoplayBlocked=!1,this._notifyStateChange(),this._detachUnlockListeners()}).catch(t=>{this._autoplayBlocked=!0,this._hasStartedPlaying=!1,this._attachUnlockListeners(),this._notifyStateChange()})}_pauseAudio(e=!1){!this._isAudioPlaying&&(!this._audio||this._audio.paused)||(this._isAudioPlaying=!1,this._hasStartedPlaying=!1,this._audio&&(this._isInternalPause=!0,this._audio.pause()),e||this._notifyStateChange())}startPlaybackGesture(e){if(!this.isSupported||!this.card?._isMediaSessionEnabled||(this.resumeFromUserGesture(),this._initAudio(),!this._audio))return;te&&te!==this&&(te._wasEvicted=!0,te.reset(!0)),te=this,this._wasEvicted=!1,this._isAudioPlaying=!0,this._notifyStateChange();const t=this._audio.play();t!==void 0&&t.then(()=>{this._hasStartedPlaying=!0,this._autoplayBlocked=!1,this._notifyStateChange(),this._detachUnlockListeners()}).catch(i=>{this._autoplayBlocked=!0,this._hasStartedPlaying=!1,this._attachUnlockListeners(),this._notifyStateChange()}),e&&(this._lastRegisteredTargetEntityId=e,this._registerActionHandlers(e))}_registerActionHandlers(e){if(!this.isSupported)return;const t=navigator.mediaSession;t.setActionHandler("play",()=>{this.resumeFromUserGesture(),this.card._onControlClick?.("play_pause")}),t.setActionHandler("pause",()=>{this._wasInterrupted||this._audio&&this._audio.paused&&!this._isInternalPause||(this._pauseDebounceTimer&&clearTimeout(this._pauseDebounceTimer),this._pauseDebounceTimer=setTimeout(()=>{if(this._wasInterrupted||this._audio&&this._audio.paused&&!this._isInternalPause){this._pauseDebounceTimer=null;return}this.card._onControlClick?.("play_pause"),this._pauseDebounceTimer=null},350))}),t.setActionHandler("nexttrack",()=>{this.resumeFromUserGesture(),this.card._onControlClick?.("next")}),t.setActionHandler("previoustrack",()=>{this.resumeFromUserGesture(),this.card._onControlClick?.("prev")}),t.setActionHandler("seekto",i=>{i.seekTime!=null&&e&&this.card.hass?.callService("media_player","media_seek",{entity_id:e,seek_position:Math.round(i.seekTime)})}),this._isApplePlatform||(t.setActionHandler("seekforward",i=>{const s=i.seekOffset||10;this._handleRelativeSeek(e,s)}),t.setActionHandler("seekbackward",i=>{const s=i.seekOffset||10;this._handleRelativeSeek(e,-s)}))}_handleRelativeSeek(e,t){if(!e)return;const i=this.card.hass?.states?.[e];if(!i?.attributes)return;const s=i.attributes.media_duration;let r=this._lastSeekPos;if(r==null&&(r=i.attributes.media_position||0,i.state==="playing"&&i.attributes.media_position_updated_at)){const l=new Date(i.attributes.media_position_updated_at).getTime();r+=Math.max(0,(Date.now()-l)/1e3)}let n=Math.max(0,r+t);s!=null&&s>0&&(n=Math.min(s,n));const o=Math.round(n);this._lastSeekPos=o,this._lastSeekTimeout&&clearTimeout(this._lastSeekTimeout),this._lastSeekTimeout=setTimeout(()=>{this._lastSeekPos=null,this._lastSeekTimeout=null},2e3),this.card.hass?.callService("media_player","media_seek",{entity_id:e,seek_position:o})}update({enabled:e,stateObj:t,targetEntityId:i,artworkUrl:s,title:r,artist:n,album:o}){if(!this.isSupported||this.card?._isEditorPreview)return;if(!e||!t){this._detachUnlockListeners(),te===this&&this.reset();return}const l=`${i}|${t.attributes?.media_title||""}|${t.attributes?.media_artist||""}`;this._lastTrackKey!==l&&(this._lastTrackKey=l,typeof document<"u"&&!document.hidden&&(this._wasInterrupted=!1,this._wasEvicted=!1));const c=t.state,u=c==="playing",h=c==="paused";if(u&&(this._lastPlaybackState==="paused"||this._lastPlaybackState==="idle"||this._lastPlaybackState==="off")&&(this._wasInterrupted=!1,this._wasEvicted=!1,this._autoplayBlocked=!1),this._lastPlaybackState=c,this._wasInterrupted)return;if(u||h){if(te&&te!==this){if(te._isAudioPlaying&&h&&!u||te._isAudioPlaying&&u&&!this._hasUserInteraction||this._wasEvicted&&!this._hasUserInteraction&&!u)return;te._wasEvicted=!0,te.reset(!0)}this._wasEvicted=!1,this._hasUserInteraction=!1,te=this}else{te===this&&this.reset();return}u?(this._startAudio(),navigator.mediaSession.playbackState="playing"):h?(this._pauseAudio(),navigator.mediaSession.playbackState="paused"):(this._pauseAudio(),navigator.mediaSession.playbackState="none"),this._lastRegisteredTargetEntityId!==i&&(this._lastRegisteredTargetEntityId=i,this._registerActionHandlers(i));const p=r||t.attributes?.media_title||je(this.card?.hass,t)||"Media",_=n||t.attributes?.media_artist||"",m=o||t.attributes?.media_album_name||"",f=(typeof s=="string"?s:s?.url)||t.attributes?.entity_picture||"",y=Ld(f),v=`${p}|${_}|${m}|${y}`;if(this._lastMetadata!==v){this._lastMetadata=v;const k=y?[{src:y,sizes:"96x96"},{src:y,sizes:"128x128"},{src:y,sizes:"192x192"},{src:y,sizes:"256x256"},{src:y,sizes:"384x384"},{src:y,sizes:"512x512"},{src:y}]:[];if(typeof MediaMetadata<"u")try{navigator.mediaSession.metadata=new MediaMetadata({title:p,artist:_,album:m,artwork:k})}catch{}}const x=t.attributes?.media_duration;if(x!=null&&Number.isFinite(x)&&x>0){const k=t.attributes?.media_position||0,E=t.attributes?.media_position_updated_at||0,S=Math.max(1,Math.round(x)),C=`${S}|${k}|${E}|${u}`;if(this._lastPositionStateKey!==C){this._lastPositionStateKey=C;let $=k;if(u&&E){const F=new Date(E).getTime();Number.isFinite(F)&&($+=Math.max(0,(Date.now()-F)/1e3))}Number.isFinite($)||($=0);const P=Math.max(0,Math.min(Math.round($),S));if(typeof navigator.mediaSession.setPositionState=="function")try{navigator.mediaSession.setPositionState({duration:S,playbackRate:1,position:P})}catch{}}}else if(this._lastPositionStateKey!=="none"&&(this._lastPositionStateKey="none",typeof navigator.mediaSession.setPositionState=="function"))try{navigator.mediaSession.setPositionState()}catch{}}reset(e=!1){const t=te===this;if(t&&(te=null),this._pauseAudio(e),this.isSupported&&t){const i=navigator.mediaSession;try{i.metadata=null,i.playbackState="none",typeof i.setPositionState=="function"&&i.setPositionState()}catch{}["play","pause","nexttrack","previoustrack","seekto","seekforward","seekbackward"].forEach(s=>{try{i.setActionHandler(s,null)}catch{}})}this._lastMetadata=null,this._lastPlaybackState=null,this._lastRegisteredTargetEntityId=null,this._lastPositionStateKey=null,this._isSeeking=!1,this._pauseDebounceTimer&&(clearTimeout(this._pauseDebounceTimer),this._pauseDebounceTimer=null),this._lastSeekTimeout&&(clearTimeout(this._lastSeekTimeout),this._lastSeekTimeout=null,this._lastSeekPos=null),this._internalPauseTimer&&(clearTimeout(this._internalPauseTimer),this._internalPauseTimer=null),e||this._notifyStateChange()}attach(){this.card?._isEditorPreview||!this.card?._isMediaSessionEnabled||(this._attachUnlockListeners(),typeof document<"u"&&document.addEventListener("visibilitychange",this._onVisibilityChange))}detach(){this.reset(),this._detachUnlockListeners(),typeof document<"u"&&document.removeEventListener("visibilitychange",this._onVisibilityChange)}destroy(){if(this.detach(),te===this&&(te=null,ue)){this._isInternalPause=!0;try{ue.pause()}catch{}}}}const Nd=()=>[{mode:"replace",icon:"mdi:playlist-remove",label:d("search.replace")},{mode:"next",icon:"mdi:playlist-play",label:d("search.play_next")},{mode:"replace_next",icon:"mdi:playlist-music",label:d("search.replace_play")},{mode:"add",icon:"mdi:playlist-plus",label:d("search.add_queue")},{mode:"add_to_playlist",icon:"mdi:plus",label:d("search.add_to_playlist")}],$i=["artist","album","track","playlist","radio","podcast","audiobook"];function bs(a){return a&&(a.media_class==="track"||a.media_content_type==="track")}function Fn(a){return a&&(a.media_class==="radio"||a.media_content_type==="radio")}function zn(a){return a==="card"||a==="card_minimal"}function Ud(a,{searchMediaClassFilter:e="all",recentlyPlayedFilterActive:t=!1,upcomingFilterActive:i=!1,recommendationsFilterActive:s=!1}={}){const r=bs(a),n=e==="track"||e==="album";return r&&a.artist&&a.album?`${a.artist} - ${a.album}`:(n||t||i||s)&&a.artist?a.artist:a.media_class?a.media_class.charAt(0).toUpperCase()+a.media_class.slice(1):""}const Nt=(a,{cap:e,floor:t}={})=>{const i=Number(a);if(!Number.isFinite(i)||i<=0)return;let s=i;return typeof t=="number"&&(s=Math.max(t,s)),typeof e=="number"&&(s=Math.min(e,s)),s},jn=3e4;let Ut=null,ma=0;function Dn(a,e=null){if(!a||typeof a!="object")return null;if(typeof a.config_entry_id=="string"&&a.config_entry_id.length>0)return a.config_entry_id;if(Array.isArray(a.config_entries)&&a.config_entries.length>0)return a.config_entries[0];if(a.parent_device_id&&e&&e[a.parent_device_id]){const t=e[a.parent_device_id];return Dn(t,null)}return null}function Rn(a,e,t){let i=null;if(a?.entities&&typeof a.entities=="object"){const s=r=>r?r.config_entry_id?r.config_entry_id:r.device_id&&a.devices&&a.devices[r.device_id]?Dn(a.devices[r.device_id],a.devices):null:null;if(e&&a.entities[e]){const r=a.entities[e];r&&t.includes(r.platform)&&(i=s(r))}if(!i){const r=Object.values(a.entities).find(n=>n&&t.includes(n.platform));r&&(i=s(r))}}return i}async function Ci(a,e=null){if(!a)return null;const t=Date.now();if(Ut&&t-ma<jn)return Ut;try{return(a.services||{}).music_assistant?(Ut=Rn(a,e,["music_assistant","mass"])||"auto",ma=t,Ut):(Ut=null,ma=t,null)}catch{return Ut=null,ma=t,null}}let ut=null,Ti=0;async function Ii(a,e=null){if(!a)return null;const t=Date.now();if(ut&&t-Ti<jn)return ut;try{if(!(a.services||{}).mass_queue)return ut=null,Ti=t,null;if(a.user&&a.user.is_admin)try{const i=await a.connection.sendMessagePromise({type:"config_entries/get",domain:"mass_queue"});if(i&&i.length>0)return ut=i[0].entry_id,Ti=t,ut}catch{}return ut=Rn(a,null,["mass_queue"])||"auto",Ti=t,ut}catch{return ut=null,Ti=t,null}}function Vt(a){return a?{title:a.name,media_content_id:a.uri,media_content_type:a.media_type,media_class:a.media_type,item_id:a.item_id,thumbnail:a.image,...a.artists&&{artist:a.artists.map(e=>e.name).join(", ")},...a.album&&{album:a.album.name,album_uri:a.album.uri},is_browsable:a.media_type==="artist"||a.media_type==="album"||a.media_type==="playlist"||a.media_type==="track",is_editable:a.is_editable===!0}:null}function On({item:a,onPlay:e,onOptionsToggle:t,upcomingFilterActive:i=!1,isMusicAssistant:s=!1,massQueueAvailable:r=!1,searchView:n="list",isInline:o=!1,queueControlsStyle:l="drag_handle",onMoveUp:c,onMoveDown:u,onMoveNext:h,onRemove:p,minimal:_=!1,hideActions:m=!1}){if(m)return b;const f=!!(i&&a.queue_item_id&&s&&r),y=zn(n),v=o?"entity-options-search-buttons":y?"card-overlay-buttons":"search-sheet-buttons",x=o?"entity-options-search-play":y?"search-sheet-play icon-only":"search-sheet-play",k=o?"entity-options-search-queue":y?"search-sheet-queue icon-only":"search-sheet-queue";return g`
    <div class="${v}">
      ${f&&o?g`
              <div class="queue-controls">
                ${l==="drag_handle"?g`
                        <div
                          class="queue-btn queue-drag-handle"
                          title="${d("search.drag_to_reorder")}"
                        >
                          <ha-icon icon="mdi:drag"></ha-icon>
                        </div>
                      `:g`
                        <button
                          class="queue-btn queue-btn-up"
                          @click=${E=>{E.stopPropagation(),c(a)}}
                          title="${d("search.move_up")}"
                        >
                          <ha-icon icon="mdi:chevron-up"></ha-icon>
                        </button>
                        <button
                          class="queue-btn queue-btn-down"
                          @click=${E=>{E.stopPropagation(),u(a)}}
                          title="${d("search.move_down")}"
                        >
                          <ha-icon icon="mdi:chevron-down"></ha-icon>
                        </button>
                        <button
                          class="queue-btn queue-btn-next"
                          @click=${E=>{E.stopPropagation(),h(a)}}
                          title="${d("search.move_next")}"
                        >
                          <ha-icon icon="mdi:playlist-play"></ha-icon>
                        </button>
                      `}
                <button
                  class="queue-btn queue-btn-remove"
                  @click=${E=>{E.stopPropagation(),p(a)}}
                  title="${d("search.remove")}"
                >
                  <ha-icon icon="mdi:close"></ha-icon>
                </button>
              </div>
            `:b}
      <button
        class="${x}"
        @click=${E=>{E.stopPropagation(),e(a)}}
        title="${d("search.play_item","{item}",a.title)}"
      >
        <ha-icon icon="mdi:play"></ha-icon>
      </button>
      ${!f&&!Fn(a)&&!_?g`
              <button
                class="${k}"
                @click=${E=>{E.preventDefault(),E.stopPropagation(),t(a)}}
                title="${d("common.more_options")}"
              >
                <ha-icon icon="mdi:dots-vertical"></ha-icon>
              </button>
            `:b}
    </div>
  `}function Vd({item:a,activeSearchRowMenuId:e,onPlayOption:t,onOptionsToggle:i,searchView:s="list",isQueueItem:r=!1,massQueueAvailable:n=!1,onMoveUp:o,onMoveDown:l,onMoveNext:c,onRemove:u,hideActions:h=!1}){if(h)return b;const p=e!=null&&a.media_content_id!=null&&e===a.media_content_id,_=zn(s);return g`
    <div class="search-row-slide-out ${p?"active":""}">
      ${r&&_?g`
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),o(a),i(null)}}
                title="${d("search.move_up")}"
              >
                ${d("search.move_up")}
              </button>
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),l(a),i(null)}}
                title="${d("search.move_down")}"
              >
                ${d("search.move_down")}
              </button>
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),c(a),i(null)}}
                title="${d("search.move_next")}"
              >
                ${d("search.move_next")}
              </button>
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),u(a),i(null)}}
                title="${d("search.remove")}"
              >
                ${d("search.remove")}
              </button>
            `:g`
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),t(a,"replace")}}
                title="${d("search.labels.replace")}"
              >
                ${_?b:g`<ha-icon icon="mdi:playlist-remove"></ha-icon>`}${d("search.labels.replace")}
              </button>
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),t(a,"next")}}
                title="${d("search.labels.next")}"
              >
                ${_?b:g`<ha-icon icon="mdi:playlist-play"></ha-icon>`}${d("search.labels.next")}
              </button>
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),t(a,"replace_next")}}
                title="${d("search.labels.replace_next")}"
              >
                ${_?b:g`<ha-icon icon="mdi:playlist-music"></ha-icon>`}${d("search.labels.replace_next")}
              </button>
              <button
                class="slide-out-button"
                @click=${m=>{m.stopPropagation(),t(a,"add")}}
                title="${d("search.labels.add")}"
              >
                ${_?b:g`<ha-icon icon="mdi:playlist-plus"></ha-icon>`}${d("search.labels.add")}
              </button>
              ${bs(a)&&n?g`
                      <button
                        class="slide-out-button"
                        @click=${m=>{m.stopPropagation(),t(a,"add_to_playlist")}}
                        title="${d("search.labels.add_to_playlist")}"
                      >
                        ${_?b:g`<ha-icon icon="mdi:plus"></ha-icon>`}${d("search.labels.add_to_playlist")}
                      </button>
                    `:b}
            `}
      <div
        class="slide-out-close"
        @click=${m=>{m.stopPropagation(),i(null)}}
      >
        <ha-icon icon="mdi:close"></ha-icon>
      </div>
    </div>
  `}function Bd({item:a,isCard:e,isMinimal:t,isGridMode:i,activeSearchRowMenuId:s,loadingSearchRowMenuId:r,errorSearchRowMenuId:n,successSearchRowMenuId:o,successSearchRowType:l,isSelectionFlow:c,massQueueAvailable:u,upcomingFilterActive:h,recentlyPlayedFilterActive:p=!1,recommendationsFilterActive:_=!1,searchMediaClassFilter:m="all",queueControlsStyle:f="drag_handle",onPlay:y,onResultClick:v,onOptionsToggle:x,onPlayOption:k,onMoveUp:E,onMoveDown:S,onMoveNext:C,onRemove:$,isMusicAssistant:P=!1,isValidArtwork:F=O=>!!O,getClickTitle:T=O=>"",artworkHostname:I=""}){if(!a)return g`<div class="yamp-search-result placeholder"></div>`;const O=P,N=!!a.is_browsable||c,W=e?t?"card_minimal":"card":"list",Y=s!=null&&a.media_content_id!=null&&s===a.media_content_id,U=c;return i?g`
      <button
        class="entity-options-item menu-action-item search-result-grid-mode ${h&&u&&f==="drag_handle"?"queue-drag-handle":"nodrag no-drag ignore-drag"} ${a._justMoved?"just-moved":""} ${Y?"menu-active":""}"
        @click=${L=>{c?v?.(a,L):y?.(a,L)}}
        title=${T(a)||a.title}
      >
        ${a.thumbnail&&F(a.thumbnail)?g`
                <img
                  class="yamp-search-result-thumb"
                  src=${ys(a.thumbnail,I)}
                  alt=${a.title}
                  onerror="this.style.display='none'"
                />
              `:g`
                <div class="yamp-search-result-thumb-placeholder">
                  <ha-icon icon="mdi:music"></ha-icon>
                </div>
              `}
        <span class="menu-action-label">${a.title}</span>
      </button>
    `:g`
    <div
      class="yamp-search-result nodrag no-drag ignore-drag ${e?"search-result-card":""} ${t?"minimal":""} ${a._justMoved?"just-moved":""} ${Y?"menu-active":""} ${N?"clickable":""}"
      @click=${L=>{c||!e&&N?v?.(a,L):e&&y?.(a,L)}}
    >
      <div class="search-sheet-thumb-container" data-clickable="${e}">
        ${a.thumbnail&&F(a.thumbnail)?g`
                <img
                  class="yamp-search-result-thumb"
                  src=${ys(a.thumbnail,I)}
                  alt=${a.title}
                  onerror="this.style.display='none'"
                />
              `:g`
                <div class="yamp-search-result-thumb-placeholder">
                  <ha-icon icon="mdi:music"></ha-icon>
                </div>
              `}
        ${e?On({item:a,onPlay:y,onOptionsToggle:x,upcomingFilterActive:!!h,isMusicAssistant:O,massQueueAvailable:u,searchView:W,queueControlsStyle:f,onMoveUp:E,onMoveDown:S,onMoveNext:C,onRemove:$,minimal:t,hideActions:U}):b}
      </div>

      ${t?b:g`
              <div class="yamp-search-result-info">
                <span
                  class="yamp-search-result-title ${N?"clickable-search-result":""}"
                  @click=${L=>{(N||c)&&(L.stopPropagation(),v&&v(a,L))}}
                  title=${T(a)}
                >
                  ${a.title}
                </span>
                <span
                  class="yamp-search-result-subtitle ${N?"clickable-search-result":""}"
                  @click=${L=>{(N||c)&&(L.stopPropagation(),v&&v(a,L))}}
                >
                  ${Ud(a,{searchMediaClassFilter:m,recentlyPlayedFilterActive:p,upcomingFilterActive:h,recommendationsFilterActive:_})}
                </span>
                ${e&&!Fn(a)&&!U?g`
                        <div
                          class="card-menu-button ${h&&u&&f==="drag_handle"?"queue-drag-handle":""}"
                          @click=${L=>{L.preventDefault(),L.stopPropagation(),x(a)}}
                        >
                          <ha-icon icon="mdi:dots-vertical"></ha-icon>
                        </div>
                      `:b}
              </div>
            `}
      ${e?b:On({item:a,onPlay:y,onOptionsToggle:x,upcomingFilterActive:!!h,isMusicAssistant:O,massQueueAvailable:u,searchView:W,isInline:!0,queueControlsStyle:f,onMoveUp:E,onMoveDown:S,onMoveNext:C,onRemove:$,hideActions:U})}
      ${Vd({item:a,activeSearchRowMenuId:s,onPlayOption:k,onOptionsToggle:x,searchView:W,isQueueItem:O&&a.queue_item_id&&h&&u,massQueueAvailable:u,onMoveUp:E,onMoveDown:S,onMoveNext:C,onRemove:$,hideActions:U})}
      ${r!=null&&a.media_content_id!=null&&r===a.media_content_id?g`
              <div class="search-row-loading-overlay">
                <ha-icon icon="mdi:loading" class="spin"></ha-icon>
                <span>${d("common.loading")}</span>
              </div>
            `:b}
      ${n!=null&&a.media_content_id!=null&&n===a.media_content_id?g`
              <div class="search-row-error-overlay">
                <ha-icon icon="mdi:alert-circle" class="error-icon"></ha-icon>
                <span>${d("common.error")||"Error"}</span>
              </div>
            `:b}
      ${o!=null&&a.media_content_id!=null&&o===a.media_content_id?g`
              <div class="search-row-success-overlay">
                <span>✅</span>
                <span
                  >${d(l==="playlist"?"search.added_to_playlist":"search.added")}</span
                >
              </div>
            `:b}
    </div>
  `}function Hd({item:a,onClose:e,onPlayOption:t,massQueueAvailable:i=!1}){return a?g`
    <div class="entity-options-overlay entity-options-overlay-opening" @click=${e}>
      <div
        class="entity-options-container entity-options-sheet-opening"
        @click=${s=>s.stopPropagation()}
      >
        <div class="entity-options-sheet">
          <div class="entity-options-title">${a.title}</div>

          ${Nd().filter(s=>s.mode==="add_to_playlist"?bs(a)&&i:!0).map(s=>g`
                <button
                  class="entity-options-item menu-action-item"
                  @click=${()=>t(a,s.mode)}
                >
                  <ha-icon class="menu-action-icon" .icon=${s.icon}></ha-icon>
                  <span class="menu-action-label">${s.label}</span>
                </button>
              `)}

          <div class="entity-options-divider"></div>

          <button class="entity-options-item close-item" @click=${e}>
            ${d("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  `:b}async function Ln(a,e,t,i=null,s={},r=20){const n=await Ci(a,e);if(n)try{if(s.favorites){const h=i&&i!=="all"?[i]:$i,p=[];return await Promise.all(h.map(async _=>{try{const m={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{...n&&n!=="auto"&&{config_entry_id:n},media_type:_,favorite:!0,search:t},return_response:!0},f=Nt(r);f!==void 0&&(m.service_data.limit=f),s.orderBy&&s.orderBy!=="default"&&(m.service_data.order_by=s.orderBy),((await a.connection.sendMessagePromise(m))?.response?.items||[]).forEach(y=>{const v=Vt(y);v&&p.push(v)})}catch(m){console.error("yamp: Error searching favorites for type",_,m)}})),{results:p,usedMusicAssistant:!0}}if((!t||t.trim()==="")&&i&&i!=="all"&&!s.favorites&&!s.album&&!s.artist){if(!$i.includes(i))return console.warn(`yamp: Unsupported media type for browsing: ${i}. Skipping get_library call.`),{results:[],usedMusicAssistant:!0};try{const h={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{...n&&n!=="auto"&&{config_entry_id:n},media_type:i},return_response:!0},p=Nt(r);p!==void 0&&(h.service_data.limit=p),s.orderBy&&s.orderBy!=="default"&&(h.service_data.order_by=s.orderBy);const _=(await a.connection.sendMessagePromise(h))?.response?.items||[],m=[];return _.forEach(f=>{const y=Vt(f);y&&m.push(y)}),{results:m,usedMusicAssistant:!0}}catch(h){return console.error("yamp: Error browsing library for type",i,h),{results:[],usedMusicAssistant:!0}}}const o={name:t&&t.trim()!==""?t:s.album||(i==="album"?"":s.artist||""),...n&&n!=="auto"&&{config_entry_id:n}},l=Nt(r,{cap:i==="all"?8:void 0});l!==void 0&&(o.limit=l),i&&i!=="all"&&(o.media_type=i),s.artist&&(o.artist=s.artist),s.album&&(o.album=s.album);const c={type:"call_service",domain:"music_assistant",service:"search",service_data:o,return_response:!0},u=(await a.connection.sendMessagePromise(c))?.response;if(u){const h=[];return Object.entries(u).forEach(([p,_])=>{Array.isArray(_)&&_.forEach(m=>{const f=Vt(m);f&&h.push(f)})}),{results:h,usedMusicAssistant:!0}}}catch(o){console.error("yamp: Error in searchMedia:",o)}return{results:await Qd(a,e,t,i,s),usedMusicAssistant:!1}}async function Gd(a,e,t=null,i=20,s={}){const r=await Ci(a,e);if(!r)return{results:[],usedMusicAssistant:!1};const n=typeof s.onChunk=="function"?s.onChunk:null,o=async(l,c={})=>{const u={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{...r&&r!=="auto"&&{config_entry_id:r},media_type:l,order_by:"last_played_desc"},return_response:!0},h=Nt(i,c);return h!==void 0&&(u.service_data.limit=h),((await a.connection.sendMessagePromise(u))?.response?.items||[]).map(Vt).filter(Boolean)};try{if(t==="all"){const c=[];return await Promise.all($i.map(async u=>{const h=await o(u,{cap:5});h.length&&(c.push(...h),n&&n(h,u))})),{results:c,usedMusicAssistant:!0}}const l=await o(t||"track");return l.length&&n&&n(l,t||"track"),{results:l,usedMusicAssistant:!0}}catch(l){return console.error("yamp: Error getting recently played from Music Assistant:",l),{results:[],usedMusicAssistant:!1}}}async function qn(a,e,t=null,i=20,s={}){const r=await Ci(a,e);if(!r)return{results:[],usedMusicAssistant:!1};const n=typeof s.onChunk=="function"?s.onChunk:null,o=async l=>{const c={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{...r&&r!=="auto"&&{config_entry_id:r},media_type:l,favorite:!0},return_response:!0},u=Nt(i,{cap:l==="all"?8:void 0});u!==void 0&&(c.service_data.limit=u),s.orderBy&&s.orderBy!=="default"&&(c.service_data.order_by=s.orderBy);try{return((await a.connection.sendMessagePromise(c))?.response?.items||[]).map(Vt).filter(Boolean)}catch(h){return console.error("yamp: Error loading favorites for type",l,h),[]}};try{if(t&&t!=="all"){const c=await o(t);return c.length&&n&&n(c,t),{results:c,usedMusicAssistant:!0}}const l=[];return await Promise.all($i.map(async c=>{const u=await o(c);u.length&&(l.push(...u),n&&n(u,c))})),{results:l,usedMusicAssistant:!0}}catch(l){return console.error("yamp: Error loading favorites",l),{results:[],usedMusicAssistant:!1}}}async function Qd(a,e,t,i,s={}){const r=t&&t.trim()!==""?t:s.album||s.artist||"",n={entity_id:e,search_query:r};i&&i!=="all"&&(n.media_content_type=i);const o={type:"call_service",domain:"media_player",service:"search_media",service_data:n,return_response:!0},l=await a.connection.sendMessagePromise(o);return l?.response?.[e]?.result||l?.result||[]}function Wd(a,e,t){return a.callService("media_player","play_media",{entity_id:e,media_content_type:t.media_content_type,media_content_id:t.media_content_id})}async function Kd(a,e,t=null,i=null,s=null,r=20){if(!e)return!1;try{const n=await Ci(a,t);if(!n)return!1;let o=t;if(!o){const c=Object.values(a.states).find(u=>Ei(u)&&u.entity_id.startsWith("media_player."));if(c)o=c.entity_id;else return!1}const l=await Ii(a,o);if(l&&e.includes("://"))try{const c={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{command:"music/item_by_uri",data:{uri:e},...l&&l!=="auto"&&{config_entry_id:l}},return_response:!0},u=await a.connection.sendMessagePromise(c),h=u?.response?.response||u?.response||u?.result;if(h&&typeof h=="object"){const p=typeof h.favorite=="boolean"?h.favorite:typeof h.is_favorite=="boolean"?h.is_favorite:null;if(p!==null)return p}}catch{}if(i||e)try{const c={type:"call_service",domain:"music_assistant",service:"get_library",service_data:{...n&&n!=="auto"&&{config_entry_id:n},media_type:"track",favorite:!0,...i&&{search:i.trim()}},return_response:!0},u=Nt(r,{cap:10});u!==void 0&&(c.service_data.limit=u);const h=await a.connection.sendMessagePromise(c),p=h?.response?.items||h?.response||[];if(Array.isArray(p)){const _=(e.split("/").pop()||"").trim();return p.some(m=>m.uri===e||m.item_id&&e.endsWith(`/${m.item_id}`)||_&&m.uri&&m.uri.endsWith(`/${_}`))}}catch{}return!1}catch{return!1}}/*! js-yaml 5.4.2 https://github.com/nodeca/js-yaml @license MIT */var G=Symbol("NOT_RESOLVED");function me(a,e){return{tagName:a,nodeKind:"scalar",implicit:e.implicit??!1,matchByTagPrefix:e.matchByTagPrefix??!1,implicitFirstChars:e.implicitFirstChars??null,resolve:e.resolve,identify:e.identify,represent:e.represent??(t=>String(t)),representTagName:e.representTagName??(()=>a)}}function xs(a,e){const t=e.finalize===void 0;return{tagName:a,nodeKind:"sequence",implicit:!1,matchByTagPrefix:e.matchByTagPrefix??!1,create:e.create,addItem:e.addItem,finalize:e.finalize??(i=>i),carrierIsResult:t,identify:e.identify,represent:e.represent??(i=>i),representTagName:e.representTagName??(()=>a)}}function ga(a,e){const t=e.finalize===void 0;return{tagName:a,nodeKind:"mapping",implicit:!1,matchByTagPrefix:e.matchByTagPrefix??!1,create:e.create,addPair:e.addPair,has:e.has,keys:e.keys,get:e.get,finalize:e.finalize??(i=>i),carrierIsResult:t,identify:e.identify,represent:e.represent??(i=>i),representTagName:e.representTagName??(()=>a)}}var Yd=me("tag:yaml.org,2002:str",{resolve:a=>a,identify:a=>typeof a=="string"}),Zd=["","~","null","Null","NULL"],Xd=me("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:a=>Zd.indexOf(a)!==-1?null:G,identify:a=>a===null,represent:()=>"null"}),Jd=me("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["n"],resolve:(a,e)=>a==="null"||e&&a===""?null:G,identify:a=>a===null,represent:()=>"null"}),eu=["","~","null","Null","NULL"],tu=me("tag:yaml.org,2002:null",{implicit:!0,implicitFirstChars:["","~","n","N"],resolve:a=>eu.indexOf(a)!==-1?null:G,identify:a=>a===null,represent:()=>"null"}),iu=["true","True","TRUE"],au=["false","False","FALSE"],su=me("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","T","f","F"],resolve:a=>iu.indexOf(a)!==-1?!0:au.indexOf(a)!==-1?!1:G,identify:a=>Object.prototype.toString.call(a)==="[object Boolean]",represent:a=>a?"true":"false"}),ru=["true"],nu=["false"],ou=me("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["t","f"],resolve:a=>ru.indexOf(a)!==-1?!0:nu.indexOf(a)!==-1?!1:G,identify:a=>Object.prototype.toString.call(a)==="[object Boolean]",represent:a=>a?"true":"false"}),lu=["true","True","TRUE","y","Y","yes","Yes","YES","on","On","ON"],cu=["false","False","FALSE","n","N","no","No","NO","off","Off","OFF"],du=me("tag:yaml.org,2002:bool",{implicit:!0,implicitFirstChars:["y","Y","n","N","t","T","f","F","o","O"],resolve:a=>lu.indexOf(a)!==-1?!0:cu.indexOf(a)!==-1?!1:G,identify:a=>Object.prototype.toString.call(a)==="[object Boolean]",represent:a=>a?"true":"false"}),uu=new RegExp("^(?:0o[0-7]+|0x[0-9a-fA-F]+|[-+]?[0-9]+)$"),hu=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function pu(a){let e=a,t=1;return(e[0]==="-"||e[0]==="+")&&(e[0]==="-"&&(t=-1),e=e.slice(1)),e.startsWith("0b")?t*parseInt(e.slice(2),2):e.startsWith("0o")?t*parseInt(e.slice(2),8):e.startsWith("0x")?t*parseInt(e.slice(2),16):t*parseInt(e,10)}function _u(a,e){if(e){if(!hu.test(a))return G}else if(!uu.test(a))return G;const t=pu(a);return Number.isFinite(t)?t:G}var Nn=me("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:_u,identify:a=>Number.isInteger(a)&&!Object.is(a,-0)&&a.toString(10).indexOf("e")<0,represent:a=>a.toString(10)}),mu=new RegExp("^-?(?:0|[1-9][0-9]*)$"),gu=new RegExp("^(?:[-+]?0b[0-1]+|[-+]?0o[0-7]+|[-+]?0x[0-9a-fA-F]+|[-+]?[0-9]+)$");function fu(a){let e=a,t=1;return(e[0]==="-"||e[0]==="+")&&(e[0]==="-"&&(t=-1),e=e.slice(1)),e.startsWith("0b")?t*parseInt(e.slice(2),2):e.startsWith("0o")?t*parseInt(e.slice(2),8):e.startsWith("0x")?t*parseInt(e.slice(2),16):t*parseInt(e,10)}function yu(a,e){if(e){if(!gu.test(a))return G}else if(!mu.test(a))return G;const t=fu(a);return Number.isFinite(t)?t:G}var vu=me("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:yu,identify:a=>Number.isInteger(a)&&!Object.is(a,-0)&&a.toString(10).indexOf("e")<0,represent:a=>a.toString(10)}),bu=new RegExp("^(?:[-+]?0b[0-1_]+|[-+]?0[0-7_]+|[-+]?0x[0-9a-fA-F_]+|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+|[-+]?(?:0|[1-9][0-9_]*))$");function xu(a){let e=a.replace(/_/g,""),t=1;if((e[0]==="-"||e[0]==="+")&&(e[0]==="-"&&(t=-1),e=e.slice(1)),e.startsWith("0b"))return t*parseInt(e.slice(2),2);if(e.startsWith("0x"))return t*parseInt(e.slice(2),16);if(e.includes(":")){let i=0;for(const s of e.split(":"))i=i*60+Number(s);return t*i}return e!=="0"&&e[0]==="0"?t*parseInt(e,8):t*parseInt(e,10)}function wu(a){if(!bu.test(a))return G;const e=xu(a);return Number.isFinite(e)?e:G}var ws=me("tag:yaml.org,2002:int",{implicit:!0,implicitFirstChars:["-","+",..."0123456789"],resolve:wu,identify:a=>Number.isInteger(a)&&!Object.is(a,-0)&&a.toString(10).indexOf("e")<0,represent:a=>a.toString(10)}),ku=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Eu=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Su(a){if(!ku.test(a))return G;let e=a.toLowerCase();const t=e[0]==="-"?-1:1;if("+-".includes(e[0])&&(e=e.slice(1)),e===".inf")return t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(e===".nan")return NaN;const i=t*parseFloat(e);return Number.isFinite(i)||Eu.test(a)?i:G}function Au(a){if(isNaN(a))return".nan";if(a===Number.POSITIVE_INFINITY)return".inf";if(a===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(a,-0))return"-0.0";const e=a.toString(10);return/^[-+]?[0-9]+e/.test(e)?e.replace("e",".e"):e}var Un=me("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:Su,identify:a=>typeof a=="number"&&(!Number.isInteger(a)||Object.is(a,-0)||a.toString(10).indexOf("e")>=0),represent:Au}),$u=new RegExp("^-?(?:0|[1-9][0-9]*)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$"),Cu=new RegExp("^(?:[-+]?[0-9]+(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|[-+]?\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Tu(a,e){if(e){if(!Cu.test(a))return G;let i=a.toLowerCase();const s=i[0]==="-"?-1:1;if("+-".includes(i[0])&&(i=i.slice(1)),i===".inf")return s===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(i===".nan")return NaN;const r=s*parseFloat(i);return Number.isFinite(r)?r:G}if(!$u.test(a))return G;const t=Number(a);return Number.isFinite(t)?t:G}function Iu(a){if(isNaN(a))return".nan";if(a===Number.POSITIVE_INFINITY)return".inf";if(a===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(a,-0))return"-0.0";const e=a.toString(10);return/^[-+]?[0-9]+e/.test(e)?e.replace("e",".e"):e}var Mu=me("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-",..."0123456789"],resolve:Tu,identify:a=>typeof a=="number"&&(!Number.isInteger(a)||Object.is(a,-0)||a.toString(10).indexOf("e")>=0),represent:Iu}),Pu=new RegExp("^(?:[-+]?(?:(?:[0-9][0-9_]*)?\\.[0-9_]*)(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"),Fu=new RegExp("^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function zu(a){if(!Pu.test(a))return G;let e=a.toLowerCase().replace(/_/g,"");const t=e[0]==="-"?-1:1;if("+-".includes(e[0])&&(e=e.slice(1)),e===".inf")return t===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY;if(e===".nan")return NaN;let i=0;if(e.includes(":")){for(const s of e.split(":"))i=i*60+Number(s);i*=t}else i=t*parseFloat(e);return Number.isFinite(i)||Fu.test(a)?i:G}function ju(a){if(isNaN(a))return".nan";if(a===Number.POSITIVE_INFINITY)return".inf";if(a===Number.NEGATIVE_INFINITY)return"-.inf";if(Object.is(a,-0))return"-0.0";const e=a.toString(10);return/^[-+]?[0-9]+e/.test(e)?e.replace("e",".e"):e}var ks=me("tag:yaml.org,2002:float",{implicit:!0,implicitFirstChars:["-","+",".",..."0123456789"],resolve:zu,identify:a=>typeof a=="number"&&(!Number.isInteger(a)||Object.is(a,-0)||a.toString(10).indexOf("e")>=0),represent:ju}),Du=me("tag:yaml.org,2002:merge",{implicit:!0,implicitFirstChars:["<"],resolve:(a,e)=>a==="<<"||e&&a===""?"<<":G,identify:()=>!1}),Ru=/^[A-Za-z0-9+/]*={0,2}$/;function Ou(a){const e=a.replace(/\s/g,"");if(e.length%4!==0||!Ru.test(e))return G;const t=atob(e),i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}function Lu(a){let e="";for(let t=0;t<a.length;t++)e+=String.fromCharCode(a[t]);return btoa(e)}var qu=me("tag:yaml.org,2002:binary",{resolve:Ou,identify:a=>Object.prototype.toString.call(a)==="[object Uint8Array]",represent:Lu}),Nu=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Uu=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function Vn(a,e,t,i=0,s=0,r=0,n=0){const o=new Date(Date.UTC(a,e,t,i,s,r,n));return o.setUTCFullYear(a,e,t),o}function Vu(a){let e=Nu.exec(a);if(e===null&&(e=Uu.exec(a)),e===null)return G;const t=+e[1],i=+e[2]-1,s=+e[3];if(!e[4]){const u=Vn(t,i,s);return u.getUTCFullYear()!==t||u.getUTCMonth()!==i||u.getUTCDate()!==s?G:u}const r=+e[4],n=+e[5],o=+e[6];let l=0;if(r>23||n>59||o>59)return G;if(e[7]){let u=e[7].slice(0,3);for(;u.length<3;)u+="0";l=+u}const c=Vn(t,i,s,r,n,o,l);if(c.getUTCFullYear()!==t||c.getUTCMonth()!==i||c.getUTCDate()!==s)return G;if(e[9]){const u=+e[10],h=+(e[11]||0);if(u>23||h>59)return G;const p=(u*60+h)*6e4;c.setTime(c.getTime()-(e[9]==="-"?-p:p))}return c}var Bu=me("tag:yaml.org,2002:timestamp",{implicit:!0,implicitFirstChars:[..."0123456789"],resolve:Vu,identify:a=>a instanceof Date,represent:a=>a.toISOString()}),Hu=xs("tag:yaml.org,2002:seq",{create:()=>[],addItem:(a,e)=>{a.push(e)},identify:Array.isArray});function fa(a){if(a===null||typeof a!="object"||Array.isArray(a))return!1;const e=Object.getPrototypeOf(a);return e===null||e===Object.prototype}function Es(a,e){const t={};for(const i of e)a[i]!==void 0&&(t[i]=a[i]);return t}var Gu=xs("tag:yaml.org,2002:omap",{create:()=>({list:[],seen:new Set}),addItem:(a,e)=>{let t;if(e instanceof Map){if(e.size!==1)return"cannot resolve an ordered map item";t=e.keys().next().value}else if(fa(e)){const i=Object.keys(e);if(i.length!==1)return"cannot resolve an ordered map item";t=i[0]}else return"cannot resolve an ordered map item";return a.seen.has(t)?"duplicate key in ordered map":(a.seen.add(t),a.list.push(e),"")},finalize:a=>a.list,identify:()=>!1}),Qu=xs("tag:yaml.org,2002:pairs",{create:()=>[],addItem:(a,e)=>{if(e instanceof Map)return e.size!==1?"cannot resolve a pairs item":(a.push(e.entries().next().value),"");if(Object.prototype.toString.call(e)!=="[object Object]")return"cannot resolve a pairs item";const t=e,i=Object.keys(t);return i.length!==1?"cannot resolve a pairs item":(a.push([i[0],t[i[0]]]),"")},identify:()=>!1}),Wu=ga("tag:yaml.org,2002:map",{create:()=>({}),identify:fa,represent:a=>{const e=new Map;for(const t of Object.keys(a))e.set(t,a[t]);return e},addPair:(a,e,t)=>{if(e!==null&&typeof e=="object")return"object-based map does not support complex keys";const i=String(e);return i==="__proto__"?Object.defineProperty(a,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[i]=t,""},has:(a,e)=>e!==null&&typeof e=="object"?!1:Object.prototype.hasOwnProperty.call(a,String(e)),keys:a=>Object.keys(a),get:(a,e)=>{const t=String(e);return Object.prototype.hasOwnProperty.call(a,t)?a[t]:null}}),Ku=ga("tag:yaml.org,2002:set",{create:()=>new Set,identify:a=>a instanceof Set,represent:a=>{const e=new Map;for(const t of a)e.set(t,null);return e},addPair:(a,e,t)=>t!==null?"cannot resolve a set item":(a.add(e),""),has:(a,e)=>a.has(e),keys:a=>a.keys(),get:()=>null});function Yu(){return{scalar:Object.create(null),sequence:Object.create(null),mapping:Object.create(null)}}function Zu(){return{scalar:[],sequence:[],mapping:[]}}function Xu(a){const e=[];for(const t of a){let i=e.length;for(let s=0;s<e.length;s++){const r=e[s];if(r.nodeKind===t.nodeKind&&r.tagName===t.tagName&&r.matchByTagPrefix===t.matchByTagPrefix){i=s;break}}e[i]=t}return e}var ya=class ml{constructor(e){Fe(this,"tags");Fe(this,"implicitScalarTags");Fe(this,"implicitScalarByFirstChar");Fe(this,"implicitScalarAnyFirstChar");Fe(this,"defaultScalarTag");Fe(this,"defaultSequenceTag");Fe(this,"defaultMappingTag");Fe(this,"exact");Fe(this,"prefix");const t=Xu(e),i=[],s=Yu(),r=Zu();for(const u of t){if(u.nodeKind==="scalar"&&u.implicit){if(u.matchByTagPrefix)throw new Error("Implicit scalar tags cannot match by tag prefix");i.push(u)}switch(u.nodeKind){case"scalar":u.matchByTagPrefix?r.scalar.push(u):s.scalar[u.tagName]=u;break;case"sequence":u.matchByTagPrefix?r.sequence.push(u):s.sequence[u.tagName]=u;break;case"mapping":u.matchByTagPrefix?r.mapping.push(u):s.mapping[u.tagName]=u;break}}const n=i.filter(u=>u.implicitFirstChars===null),o=new Set;for(const u of i)if(u.implicitFirstChars!==null)for(const h of u.implicitFirstChars)o.add(h);const l=new Map;for(const u of o)l.set(u,i.filter(h=>h.implicitFirstChars===null||h.implicitFirstChars.indexOf(u)!==-1));const c=s.scalar["tag:yaml.org,2002:str"];if(!c)throw new Error("schema does not define the default scalar tag (tag:yaml.org,2002:str)");this.tags=t,this.implicitScalarTags=i,this.implicitScalarByFirstChar=l,this.implicitScalarAnyFirstChar=n,this.defaultScalarTag=c,this.defaultSequenceTag=s.sequence["tag:yaml.org,2002:seq"],this.defaultMappingTag=s.mapping["tag:yaml.org,2002:map"],this.exact=s,this.prefix=r}lookupScalarTag(e){const t=this.exact.scalar[e];if(t)return t;for(const i of this.prefix.scalar)if(e.startsWith(i.tagName))return i}lookupSequenceTag(e){const t=this.exact.sequence[e];if(t)return t;for(const i of this.prefix.sequence)if(e.startsWith(i.tagName))return i}lookupMappingTag(e){const t=this.exact.mapping[e];if(t)return t;for(const i of this.prefix.mapping)if(e.startsWith(i.tagName))return i}resolveImplicitScalarTag(e){const t=this.implicitScalarByFirstChar.get(e.charAt(0))??this.implicitScalarAnyFirstChar;for(const s of t){const r=s.resolve(e,!1,s.tagName);if(r!==G)return{value:r,tag:s}}const i=this.defaultScalarTag;return{value:i.resolve(e,!1,i.tagName),tag:i}}withTags(...e){let t=[];for(const i of e)t=t.concat(i);return new ml([...this.tags,...t])}},Ss=new ya([Yd,Hu,Wu]);new ya([...Ss.tags,Jd,ou,vu,Mu]);var Ju=new ya([...Ss.tags,Xd,su,Nn,Un]),eh=new ya([...Ss.tags,tu,du,ws,ks,Bu,Du,qu,Gu,Qu,Ku]),th=eh.withTags({...ws,resolve:(a,e,t)=>{const i=ws.resolve(a,e,t);return i===G?Nn.resolve(a,e,t):i}},{...ks,resolve:(a,e,t)=>{const i=ks.resolve(a,e,t);return i===G?Un.resolve(a,e,t):i}});ga("tag:yaml.org,2002:map",{create:()=>new Map,addPair:(a,e,t)=>(a.set(e,t),""),has:(a,e)=>a.has(e),keys:a=>a.keys(),get:(a,e)=>a.get(e),identify:a=>a instanceof Map||fa(a),represent:a=>{if(a instanceof Map)return a;const e=new Map,t=a;for(const i of Object.keys(t))e.set(i,t[i]);return e}});function Bn(a){if(Array.isArray(a)){const e=Array.prototype.slice.call(a);for(let t=0;t<e.length;t++){if(Array.isArray(e[t]))return null;typeof e[t]=="object"&&Object.prototype.toString.call(e[t])==="[object Object]"&&(e[t]="[object Object]")}return String(e)}return typeof a=="object"&&Object.prototype.toString.call(a)==="[object Object]"?"[object Object]":String(a)}ga("tag:yaml.org,2002:map",{create:()=>({}),identify:fa,represent:a=>{const e=new Map;for(const t of Object.keys(a))e.set(t,a[t]);return e},addPair:(a,e,t)=>{const i=Bn(e);return i===null?"nested arrays are not supported inside keys":(i==="__proto__"?Object.defineProperty(a,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[i]=t,"")},has:(a,e)=>{const t=Bn(e);return t!==null&&Object.prototype.hasOwnProperty.call(a,t)},keys:a=>Object.keys(a),get:(a,e)=>{const t=String(e);return Object.prototype.hasOwnProperty.call(a,t)?a[t]:null}});var ih={maxLength:79,indent:1,linesBefore:3,linesAfter:2};function As(a,e,t,i,s){let r="",n="";const o=Math.floor(s/2)-1;return i-e>o&&(r=" ... ",e=i-o+r.length),t-i>o&&(n=" ...",t=i+o-n.length),{str:r+a.slice(e,t).replace(/\t/g,"\u2192")+n,pos:i-e+r.length}}function $s(a,e){return" ".repeat(Math.max(e-a.length,0))+a}function ah(a,e){if(!a.buffer)return null;const t={...ih,...e},i=/\r?\n|\r|\0/g,s=[0],r=[];let n,o=-1;for(;n=i.exec(a.buffer);)r.push(n.index),s.push(n.index+n[0].length),a.position<=n.index&&o<0&&(o=s.length-2);o<0&&(o=s.length-1);let l="";const c=Math.min(a.line+t.linesAfter,r.length).toString().length,u=t.maxLength-(t.indent+c+3);for(let p=1;p<=t.linesBefore&&!(o-p<0);p++){const _=As(a.buffer,s[o-p],r[o-p],a.position-(s[o]-s[o-p]),u);l=`${" ".repeat(t.indent)}${$s((a.line-p+1).toString(),c)} | ${_.str}
${l}`}const h=As(a.buffer,s[o],r[o],a.position,u);l+=`${" ".repeat(t.indent)}${$s((a.line+1).toString(),c)} | ${h.str}
`,l+=`${"-".repeat(t.indent+c+3+h.pos)}^
`;for(let p=1;p<=t.linesAfter&&!(o+p>=r.length);p++){const _=As(a.buffer,s[o+p],r[o+p],a.position-(s[o]-s[o+p]),u);l+=`${" ".repeat(t.indent)}${$s((a.line+p+1).toString(),c)} | ${_.str}
`}return l.replace(/\n$/,"")}function Hn(a,e){let t="";return a.mark?(a.mark.name&&(t+=`in "${a.mark.name}" `),t+=`(${a.mark.line+1}:${a.mark.column+1})`,!e&&a.mark.snippet&&(t+=`

${a.mark.snippet}`),`${a.reason} ${t}`):a.reason}var ht=class gl extends Error{constructor(t,i){super();Fe(this,"reason");Fe(this,"mark");this.name="YAMLException",this.reason=t,this.mark=i,this.message=Hn(this,!1),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}toString(t){return`${this.name}: ${Hn(this,t)}`}static throwAt(t,i,s,r=""){let n=0,o=0;for(let c=0;c<i;c++){const u=t.charCodeAt(c);u===10?(n++,o=c+1):u===13&&(n++,t.charCodeAt(c+1)===10&&c++,o=c+1)}const l={name:r,buffer:t,position:i,line:n,column:i-o};throw l.snippet=ah(l),new gl(s,l)}},ge={DOCUMENT:1,SEQUENCE:2,MAPPING:3,SCALAR:4,ALIAS:5,POP:6},z={PLAIN:1,SINGLE_QUOTED:2,DOUBLE_QUOTED:3,LITERAL_BLOCK:4,FOLDED_BLOCK:5},De={BLOCK:1,FLOW:2},Ge={CLIP:1,STRIP:2,KEEP:3},sh=-1;function Gn(a){switch(a){case 48:return"\0";case 97:return"\x07";case 98:return"\b";case 116:return"	";case 9:return"	";case 110:return`
`;case 118:return"\v";case 102:return"\f";case 114:return"\r";case 101:return"\x1B";case 32:return" ";case 34:return'"';case 47:return"/";case 92:return"\\";case 78:return"\x85";case 95:return"\xA0";case 76:return"\u2028";case 80:return"\u2029";default:return""}}var Qn=new Array(256),Wn=new Array(256);for(let a=0;a<256;a++)Qn[a]=Gn(a)?1:0,Wn[a]=Gn(a);function rh(a){return a<=65535?String.fromCharCode(a):String.fromCharCode((a-65536>>10)+55296,(a-65536&1023)+56320)}function nh(a){return a>=48&&a<=57?a-48:(a|32)-97+10}function oh(a){return a===120?2:a===117?4:8}function va(a,e,t){let i=0;for(;e<t;){const s=a.charCodeAt(e);if(s===10)i++,e++;else if(s===13)i++,e++,a.charCodeAt(e)===10&&e++;else if(s===32||s===9)e++;else break}return{position:e,breaks:i}}function Cs(a){return a===1?" ":`
`.repeat(a-1)}function lh(a,e,t){let i="",s=e,r=e,n=e;for(;s<t;){const o=a.charCodeAt(s);if(o===10||o===13){i+=a.slice(r,n);const l=va(a,s,t);i+=Cs(l.breaks),s=r=n=l.position}else s++,o!==32&&o!==9&&(n=s)}return i+a.slice(r,n)}function ch(a,e,t){let i="",s=e,r=e,n=e;for(;s<t;){const o=a.charCodeAt(s);if(o===39)i+=a.slice(r,s)+"'",s+=2,r=n=s;else if(o===10||o===13){i+=a.slice(r,n);const l=va(a,s,t);i+=Cs(l.breaks),s=r=n=l.position}else s++,o!==32&&o!==9&&(n=s)}return i+a.slice(r,t)}function dh(a,e,t){let i="",s=e,r=e,n=e;for(;s<t;){const o=a.charCodeAt(s);if(o===92){i+=a.slice(r,s),s++;const l=a.charCodeAt(s);if(l===10||l===13)s=va(a,s,t).position;else if(l<256&&Qn[l])i+=Wn[l],s++;else{let c=oh(l),u=0;for(;c>0;c--){s++;const h=nh(a.charCodeAt(s));u=(u<<4)+h}i+=rh(u),s++}r=n=s}else if(o===10||o===13){i+=a.slice(r,n);const l=va(a,s,t);i+=Cs(l.breaks),s=r=n=l.position}else s++,o!==32&&o!==9&&(n=s)}return i+a.slice(r,t)}function Kn(a,e,t,i,s,r){const n=i<0?0:i,o=a.slice(e,t).replace(/\r\n?/g,`
`),l=o===""?[]:(o.endsWith(`
`)?o.slice(0,-1):o).split(`
`);let c="",u=!1,h=0,p=!1;for(const _ of l){let m=0;for(;m<n&&_.charCodeAt(m)===32;)m++;if(i<0||m>=_.length){h++;continue}const f=_.slice(n),y=f.charCodeAt(0);r?y===32||y===9?(p=!0,c+=`
`.repeat(u?1+h:h)):p?(p=!1,c+=`
`.repeat(h+1)):h===0?u&&(c+=" "):c+=`
`.repeat(h):c+=`
`.repeat(u?1+h:h),c+=f,u=!0,h=0}return s===Ge.KEEP?c+=`
`.repeat(u?1+h:h):s!==Ge.STRIP&&u&&(c+=`
`),c}function uh(a,e){if(e.valueStart===sh)return"";const{valueStart:t,valueEnd:i}=e;if(e.fast)return a.slice(t,i);switch(e.style){case z.SINGLE_QUOTED:return ch(a,t,i);case z.DOUBLE_QUOTED:return dh(a,t,i);case z.LITERAL_BLOCK:return Kn(a,t,i,e.indent,e.chomping,!1);case z.FOLDED_BLOCK:return Kn(a,t,i,e.indent,e.chomping,!0);default:return lh(a,t,i)}}var hh=Object.assign(Object.create(null),{"!":"!","!!":"tag:yaml.org,2002:"});function Ts(a){return encodeURI(a).replace(/!/g,"%21")}function Yn(a,e){if(a.startsWith("!<")&&a.endsWith(">"))return decodeURIComponent(a.slice(2,-1));const t=a.indexOf("!",1),i=t===-1?"!":a.slice(0,t+1),s=e?.[i]??hh[i]??i;return decodeURIComponent(s)+decodeURIComponent(a.slice(i.length))}function Zn(a){let e=a;return e.charCodeAt(0)===33?(e=e.slice(1),`!${Ts(e)}`):e.slice(0,18)==="tag:yaml.org,2002:"?`!!${Ts(e.slice(18))}`:`!<${Ts(e)}>`}var Bt=-1,ph="tag:yaml.org,2002:merge",Is={filename:"",schema:Ju,json:!1,maxTotalMergeKeys:1e4,maxAliases:-1};function _h(a){return"tagStart"in a&&a.tagStart!==Bt?a.tagStart:"anchorStart"in a&&a.anchorStart!==Bt?a.anchorStart:"valueStart"in a&&a.valueStart!==Bt?a.valueStart:"start"in a?a.start:0}function pe(a,e){ht.throwAt(a.source,a.position,e,a.filename)}function Xn(a,e,t,i){try{return t.finalize(i)}catch(s){if(s instanceof ht)throw s;ht.throwAt(a.source,e,s instanceof Error?s.message:String(s),a.filename)}}function mh(a,e){const t=uh(a.source,e),i=e.tagStart===Bt?"":a.source.slice(e.tagStart,e.tagEnd),s=a.schema.defaultScalarTag;if(i!==""){if(i==="!")return{value:t,tag:s};const r=Yn(i,a.tagHandlers),n=a.schema.lookupScalarTag(r);if(n){const l=n.resolve(t,!0,r);return l===G&&pe(a,`cannot resolve a node with !<${r}> explicit tag`),{value:l,tag:n}}const o=a.schema.lookupMappingTag(r)??a.schema.lookupSequenceTag(r);if(o){t!==""&&pe(a,`cannot resolve a node with !<${r}> explicit tag`);const l=o.create(r);return{value:o.carrierIsResult?l:Xn(a,a.position,o,l),tag:o}}pe(a,`unknown scalar tag !<${r}>`)}return e.style===z.PLAIN?a.schema.resolveImplicitScalarTag(t):{value:s.resolve(t,!1,s.tagName),tag:s}}function Jn(a,e,t){const i=e.tagStart===Bt?"":a.source.slice(e.tagStart,e.tagEnd);return i===""||i==="!"?t:Yn(i,a.tagHandlers)}function eo(a){return a.nodeKind==="mapping"}function to(a){a.totalMergeKeys++,a.maxTotalMergeKeys!==-1&&a.totalMergeKeys>a.maxTotalMergeKeys&&pe(a,`merge keys exceeded maxTotalMergeKeys (${a.maxTotalMergeKeys})`)}function io(a,e,t,i){to(a);for(const s of i.keys(t)){if(to(a),e.tag.has(e.value,s))continue;const r=e.tag.addPair(e.value,s,i.get(t,s));r&&pe(a,r),e.overridable??=new Set,e.overridable.add(s)}}function gh(a,e,t,i){if(a.position=e.keyPosition,eo(i))io(a,e,t,i);else if(i.nodeKind==="sequence"&&Array.isArray(t)){t.length>100&&pe(a,"abnormal merge sequence size");for(const s of t){const r=a.nodeTags.get(s);r||pe(a,"cannot merge mappings; the provided source object is unacceptable"),io(a,e,s,r)}}else pe(a,"cannot merge mappings; the provided source object is unacceptable")}function fh(a,e,t,i,s){if(a.position=e.keyPosition,e.keyIsMerge){gh(a,e,i,s);return}!a.json&&e.tag.has(e.value,t)&&!e.overridable?.has(t)&&pe(a,"duplicated mapping key");const r=e.tag.addPair(e.value,t,i);r&&pe(a,r),e.overridable?.delete(t)}function Ms(a,e,t){const i=a.frames[a.frames.length-1];if(i.kind==="document")i.value=e,i.hasValue=!0;else if(i.kind==="sequence"){eo(t)&&a.nodeTags.set(e,t);const s=i.tag.addItem(i.value,e,i.index++);s&&pe(a,s)}else if(i.hasKey){const s=i.key;i.key=void 0,i.hasKey=!1,fh(a,i,s,e,t)}else i.key=e,i.keyPosition=a.position,i.hasKey=!0,i.keyIsMerge=t.tagName===ph}function Ps(a,e,t,i,s){if(e.anchorStart!==Bt){const r={value:t,tag:i,isValueFinal:s};return a.anchors.set(a.source.slice(e.anchorStart,e.anchorEnd),r),r}return null}function yh(a,e){const t={...Is,...e,events:a,documents:[],eventIndex:0,position:0,frames:[],anchors:new Map,nodeTags:new Map,tagHandlers:Object.create(null),totalMergeKeys:0,aliasCount:0};for(;t.eventIndex<t.events.length;){const i=t.events[t.eventIndex++];switch(t.position=_h(i),i.type){case ge.DOCUMENT:t.anchors=new Map,t.nodeTags=new Map,t.aliasCount=0,t.tagHandlers=Object.create(null);for(const s of i.directives)s.kind==="tag"&&(t.tagHandlers[s.handle]=s.prefix);t.frames.push({kind:"document",position:t.position,value:void 0,hasValue:!1});break;case ge.SCALAR:{const{value:s,tag:r}=mh(t,i);Ps(t,i,s,r,!0),Ms(t,s,r);break}case ge.SEQUENCE:{const s=Jn(t,i,"tag:yaml.org,2002:seq"),r=t.schema.lookupSequenceTag(s);r||pe(t,`unknown sequence tag !<${s}>`);const n=r.create(s),o=Ps(t,i,n,r,r.carrierIsResult);t.frames.push({kind:"sequence",position:t.position,value:n,tag:r,anchor:o,index:0});break}case ge.MAPPING:{const s=Jn(t,i,"tag:yaml.org,2002:map"),r=t.schema.lookupMappingTag(s);r||pe(t,`unknown mapping tag !<${s}>`);const n=r.create(s),o=Ps(t,i,n,r,r.carrierIsResult);t.frames.push({kind:"mapping",position:t.position,value:n,tag:r,anchor:o,key:void 0,keyPosition:t.position,hasKey:!1,keyIsMerge:!1,overridable:null});break}case ge.ALIAS:{t.maxAliases!==-1&&++t.aliasCount>t.maxAliases&&pe(t,`aliases exceeded maxAliases (${t.maxAliases})`);const s=t.source.slice(i.anchorStart,i.anchorEnd),r=t.anchors.get(s);r||pe(t,`unidentified alias "${s}"`),r.isValueFinal||pe(t,`recursive alias "${s}" is not supported for tag ${r.tag.tagName} because it uses finalize()`),Ms(t,r.value,r.tag);break}case ge.POP:{const s=t.frames.pop();if(s.kind==="mapping"&&s.hasKey&&(t.position=s.keyPosition,pe(t,"incomplete mapping pair in event stream")),s.kind==="document")t.documents.push(s.value);else{const r=s.tag.carrierIsResult?s.value:Xn(t,s.position,s.tag,s.value);s.anchor&&(s.anchor.value=r,s.anchor.isValueFinal=!0),Ms(t,r,s.tag)}break}}}return t.documents}var Q=-1,ao=Object.prototype.hasOwnProperty,Ht=1,Fs=2,so=3,ba=4,vh=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,bh=/[,\[\]{}]/,ro=/^(?:!|!!|![0-9A-Za-z-]+!)$/,zs=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$,_.!~*'()\[\]])`,no=String.raw`(?:%[0-9A-Fa-f]{2}|[0-9A-Za-z\-#;/?:@&=+$.~*'()_])`,xh=new RegExp(`^(?:${zs})*$`),wh=new RegExp(`^(?:${no})+$`),kh=new RegExp(`^(?:!(?:${zs})*|${no}(?:${zs})*)$`),js={filename:"",maxDepth:100};function Eh(a,e,t){a.events.push({type:ge.DOCUMENT,explicitStart:e,explicitEnd:t,directives:a.directives})}function oo(a,e,t,i,s,r,n){a.events.push({type:ge.SEQUENCE,start:e,anchorStart:t,anchorEnd:i,tagStart:s,tagEnd:r,style:n})}function Ds(a,e,t,i,s,r,n){a.events.push({type:ge.MAPPING,start:e,anchorStart:t,anchorEnd:i,tagStart:s,tagEnd:r,style:n})}function lo(a,e){a.events.splice(e.eventsLength,0,{type:ge.MAPPING,start:e.position,anchorStart:Q,anchorEnd:Q,tagStart:Q,tagEnd:Q,style:De.FLOW})}function Gt(a,e,t,i,s,r,n,o,l=Ge.CLIP,c=-1,u=!1){a.events.push({type:ge.SCALAR,valueStart:e,valueEnd:t,anchorStart:i,anchorEnd:s,tagStart:r,tagEnd:n,style:o,chomping:l,indent:c,fast:u})}function Sh(a,e,t){a.events.push({type:ge.ALIAS,anchorStart:e,anchorEnd:t})}function Qt(a){a.events.push({type:ge.POP})}function we(a){Gt(a,Q,Q,Q,Q,Q,Q,z.PLAIN)}function co(){return{anchorStart:Q,anchorEnd:Q,tagStart:Q,tagEnd:Q}}function Wt(a){return{position:a.position,line:a.line,lineStart:a.lineStart,lineIndent:a.lineIndent,firstTabInLine:a.firstTabInLine,eventsLength:a.events.length}}function At(a,e){a.position=e.position,a.line=e.line,a.lineStart=e.lineStart,a.lineIndent=e.lineIndent,a.firstTabInLine=e.firstTabInLine,a.events.length=e.eventsLength}function M(a,e){ht.throwAt(a.input.slice(0,a.length),a.position,e,a.filename)}function he(a){return a===10||a===13}function $t(a){return a===9||a===32}function qe(a){return $t(a)||he(a)}function tt(a){return a===0||qe(a)}function Ct(a){return a===44||a===91||a===93||a===123||a===125}function Ah(a){return a>=48&&a<=57?a-48:-1}function $h(a){if(a>=48&&a<=57)return a-48;const e=a|32;return e>=97&&e<=102?e-97+10:-1}function Ch(a){return a===120?2:a===117?4:a===85?8:0}function Th(a){return a===48||a===97||a===98||a===116||a===9||a===110||a===118||a===102||a===114||a===101||a===32||a===34||a===47||a===92||a===78||a===95||a===76||a===80}function xa(a){a.input.charCodeAt(a.position)===10?a.position++:(a.position++,a.input.charCodeAt(a.position)===10&&a.position++),a.line++,a.lineStart=a.position,a.lineIndent=0,a.firstTabInLine=-1}function fe(a,e){let t=0,i=a.input.charCodeAt(a.position),s=a.position===a.lineStart||qe(a.input.charCodeAt(a.position-1));for(;i!==0;){for(;$t(i);)s=!0,i===9&&a.firstTabInLine===-1&&(a.firstTabInLine=a.position),i=a.input.charCodeAt(++a.position);if(e&&s&&i===35)do i=a.input.charCodeAt(++a.position);while(!he(i)&&i!==0);if(!he(i))break;for(xa(a),t++,s=!0,i=a.input.charCodeAt(a.position);i===32;)a.lineIndent++,i=a.input.charCodeAt(++a.position)}return t}function Kt(a,e=a.position){const t=a.input.charCodeAt(e);if((t===45||t===46)&&t===a.input.charCodeAt(e+1)&&t===a.input.charCodeAt(e+2)){const i=a.input.charCodeAt(e+3);return i===0||qe(i)}return!1}function uo(a){a.position===a.lineStart&&a.input.charCodeAt(a.position)===65279&&(a.position++,a.lineStart=a.position)}function Rs(a){if(a.position!==a.lineStart)return!1;if(Kt(a))return!0;if(a.input.charCodeAt(a.position)!==65279)return!1;const e=Wt(a);uo(a),fe(a,!0);const t=a.input.charCodeAt(a.position),i=a.position===a.lineStart&&(t===37||t===45&&Kt(a));return At(a,e),i}function ho(a){let e=a.input.charCodeAt(a.position);for(;e!==0&&!he(e);)e=a.input.charCodeAt(++a.position)}function po(a,e,t){vh.test(a.input.slice(e,t))&&M(a,"the stream contains non-printable characters")}function Ih(a,e,t){if(a.input.charCodeAt(a.position)!==33)return!1;e.tagStart!==Q&&M(a,"duplication of a tag property");const i=a.position;let s=!1,r=!1,n="!",o=a.input.charCodeAt(++a.position);o===60?(s=!0,o=a.input.charCodeAt(++a.position)):o===33&&(r=!0,n="!!",o=a.input.charCodeAt(++a.position));let l=a.position,c;if(s){for(;o!==0&&o!==62;)o=a.input.charCodeAt(++a.position);o!==62&&M(a,"unexpected end of the stream within a verbatim tag"),c=a.input.slice(l,a.position),a.position++}else{for(;o!==0&&!qe(o)&&!(t&&Ct(o));)o===33&&(r?M(a,"tag suffix cannot contain exclamation marks"):(n=a.input.slice(l-1,a.position+1),ro.test(n)||M(a,"named tag handle cannot contain such characters"),r=!0,l=a.position+1)),o=a.input.charCodeAt(++a.position);c=a.input.slice(l,a.position),bh.test(c)&&M(a,"tag suffix cannot contain flow indicator characters")}return c&&!(s?xh.test(c):wh.test(c))&&M(a,`tag name cannot contain such characters: ${c}`),!s&&n!=="!"&&n!=="!!"&&!ao.call(a.tagHandlers,n)&&M(a,`undeclared tag handle "${n}"`),e.tagStart=i,e.tagEnd=a.position,!0}function Mh(a,e){if(a.input.charCodeAt(a.position)!==38)return!1;e.anchorStart!==Q&&M(a,"duplication of an anchor property"),a.position++;const t=a.position;for(;a.input.charCodeAt(a.position)!==0&&!qe(a.input.charCodeAt(a.position))&&!Ct(a.input.charCodeAt(a.position));)a.position++;return a.position===t&&M(a,"name of an anchor node must contain at least one character"),e.anchorStart=t,e.anchorEnd=a.position,!0}function Ph(a,e){if(a.input.charCodeAt(a.position)!==42)return!1;(e.anchorStart!==Q||e.tagStart!==Q)&&M(a,"alias node should not have any properties"),a.position++;const t=a.position;for(;a.input.charCodeAt(a.position)!==0&&!qe(a.input.charCodeAt(a.position))&&!Ct(a.input.charCodeAt(a.position));)a.position++;return a.position===t&&M(a,"name of an alias node must contain at least one character"),Sh(a,t,a.position),!0}function Os(a,e){fe(a,!1),a.lineIndent<e&&M(a,"deficient indentation")}function Fh(a,e,t){if(a.input.charCodeAt(a.position)!==39)return!1;a.position++;const i=a.position;let s=!0;for(;a.input.charCodeAt(a.position)!==0;){const r=a.input.charCodeAt(a.position);if(r===39){if(a.input.charCodeAt(a.position+1)===39){s=!1,a.position+=2;continue}const n=a.position;return a.position++,Gt(a,i,n,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,z.SINGLE_QUOTED,Ge.CLIP,-1,s),!0}he(r)?(s=!1,Os(a,e)):a.position===a.lineStart&&Kt(a)?M(a,"unexpected end of the document within a single quoted scalar"):r!==9&&r<32?M(a,"expected valid JSON character"):a.position++}M(a,"unexpected end of the stream within a single quoted scalar")}function zh(a,e,t){if(a.input.charCodeAt(a.position)!==34)return!1;a.position++;const i=a.position;let s=!0;for(;a.input.charCodeAt(a.position)!==0;){const r=a.input.charCodeAt(a.position);if(r===34){const n=a.position;return a.position++,Gt(a,i,n,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,z.DOUBLE_QUOTED,Ge.CLIP,-1,s),!0}if(r===92){s=!1;const n=a.input.charCodeAt(++a.position);if(he(n))Os(a,e);else if(Th(n))a.position++;else{let o=Ch(n);for(o===0&&M(a,"unknown escape sequence");o-- >0;)a.position++,$h(a.input.charCodeAt(a.position))<0&&M(a,"expected hexadecimal character");a.position++}}else he(r)?(s=!1,Os(a,e)):a.position===a.lineStart&&Kt(a)?M(a,"unexpected end of the document within a double quoted scalar"):r!==9&&r<32?M(a,"expected valid JSON character"):a.position++}M(a,"unexpected end of the stream within a double quoted scalar")}function jh(a,e,t){const i=a.input.charCodeAt(a.position);let s=Ge.CLIP,r=-1,n=!1;if(i!==124&&i!==62)return!1;const o=i===124?z.LITERAL_BLOCK:z.FOLDED_BLOCK;for(a.position++;a.input.charCodeAt(a.position)!==0;){const _=a.input.charCodeAt(a.position),m=Ah(_);if(_===43||_===45)s!==Ge.CLIP&&M(a,"repeat of a chomping mode identifier"),s=_===43?Ge.KEEP:Ge.STRIP,a.position++;else if(m>=0)m===0&&M(a,"bad explicit indentation width of a block scalar; it cannot be less than one"),n&&M(a,"repeat of an indentation width identifier"),r=e+m-1,n=!0,a.position++;else break}let l=!1;for(;$t(a.input.charCodeAt(a.position));)l=!0,a.position++;l&&a.input.charCodeAt(a.position)===35&&ho(a),he(a.input.charCodeAt(a.position))?xa(a):a.input.charCodeAt(a.position)!==0&&M(a,"a line break is expected");let c=n?r:-1,u=0;const h=a.position;let p=a.position;for(;a.input.charCodeAt(a.position)!==0;){const _=a.position;let m=0;for(;a.input.charCodeAt(_+m)===32;)m++;const f=a.input.charCodeAt(_+m);if(f===0){c>=0?m>c&&(p=_+m):m>0&&(p=_+m);break}if(Rs(a))break;if(!n&&c===-1&&he(f)&&(u=Math.max(u,m)),!n&&c===-1&&!he(f)&&(f===9&&m<e&&(a.position=_+m,M(a,"tab characters must not be used in indentation")),m<u&&(a.position=_+m,M(a,"bad indentation of a mapping entry"))),c===-1&&f!==0&&!he(f)&&m<e){a.lineIndent=m,a.position=_+m;break}!n&&f!==0&&!he(f)&&c===-1&&(c=m);const y=c===-1?e+1:c;if(f!==0&&!he(f)&&m<y){a.lineIndent=m,a.position=_+m;break}ho(a),p=a.position,he(a.input.charCodeAt(a.position))&&(xa(a),p=a.position)}return po(a,h,p),Gt(a,h,p,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,o,s,c),!0}function Dh(a,e){const t=a.input.charCodeAt(a.position),i=e===Ht;if(t===0||qe(t)||t===35||t===38||t===42||t===33||t===124||t===62||t===39||t===34||t===37||t===64||t===96||i&&Ct(t))return!1;if(t===63||t===45){const s=a.input.charCodeAt(a.position+1);if(tt(s)||i&&Ct(s))return!1}return!0}function Rh(a,e,t,i){if(!Dh(a,t))return!1;const s=a.position;let r=a.position,n=a.input.charCodeAt(a.position);const o=t===Ht;let l=!1;for(;n!==0&&!Rs(a);){if(n===58){const c=a.input.charCodeAt(a.position+1);if(tt(c)||o&&Ct(c))break}else if(n===35){if(qe(a.input.charCodeAt(a.position-1)))break}else{if(o&&Ct(n))break;if(he(n)){const c=a.position,u=a.line,h=a.lineStart,p=a.lineIndent;if(fe(a,!1),a.lineIndent>=e){l=!0,n=a.input.charCodeAt(a.position);continue}a.position=c,a.line=u,a.lineStart=h,a.lineIndent=p;break}}$t(n)||(r=a.position+1),n=a.input.charCodeAt(++a.position)}return r===s?!1:(po(a,s,r),Gt(a,s,r,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,z.PLAIN,Ge.CLIP,-1,!l),!0)}function Mi(a,e){const t=a.line;fe(a,!0),(a.line>t&&a.lineIndent<e||a.firstTabInLine!==-1&&a.lineIndent<e)&&M(a,"deficient indentation")}function Oh(a,e,t){const i=a.input.charCodeAt(a.position),s=i===123,r=a.position;let n=!0;if(i!==91&&i!==123)return!1;const o=s?125:93;for(s?Ds(a,r,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,De.FLOW):oo(a,r,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,De.FLOW),a.position++;a.input.charCodeAt(a.position)!==0;){Mi(a,e);let l=a.input.charCodeAt(a.position);if(l===o)return a.position++,Qt(a),!0;n?l===44&&M(a,"expected the node content, but found ','"):M(a,"missed comma between flow collection entries");let c=!1,u=!1;l===63&&qe(a.input.charCodeAt(a.position+1))&&(c=u=!0,a.position+=1,Mi(a,e));const h=a.line,p=Wt(a),_=Tt(a,e,Ht,!1,!0);Mi(a,e),l=a.input.charCodeAt(a.position),(s||u||a.line===h)&&l===58?(c=!0,a.position++,Mi(a,e),s||lo(a,p),_||we(a),Tt(a,e,Ht,!1,!0)||we(a),Mi(a,e),s||Qt(a)):s&&c?(_||we(a),we(a)):s?we(a):c&&(lo(a,p),_||we(a),we(a),Qt(a)),l=a.input.charCodeAt(a.position),l===44?(n=!0,a.position++):n=!1}M(a,"unexpected end of the stream within a flow collection")}function _o(a,e,t){if(a.firstTabInLine!==-1||a.input.charCodeAt(a.position)!==45||!tt(a.input.charCodeAt(a.position+1)))return!1;for(oo(a,a.position,t.anchorStart,t.anchorEnd,t.tagStart,t.tagEnd,De.BLOCK);a.input.charCodeAt(a.position)===45&&tt(a.input.charCodeAt(a.position+1));){a.firstTabInLine!==-1&&(a.position=a.firstTabInLine,M(a,"tab characters must not be used in indentation"));const i=a.line;a.position++;const s=fe(a,!0)>0;if(a.firstTabInLine!==-1&&a.input.charCodeAt(a.position)===45&&tt(a.input.charCodeAt(a.position+1))&&M(a,"bad indentation of a sequence entry"),s&&a.lineIndent<=e?we(a):Tt(a,e,so,!1,!0),fe(a,!0),a.lineIndent<e||a.position>=a.length)break;a.lineIndent>e&&M(a,"bad indentation of a sequence entry"),a.line===i&&a.input.charCodeAt(a.position)===45&&tt(a.input.charCodeAt(a.position+1))&&M(a,"bad indentation of a sequence entry")}return Qt(a),!0}function Ls(a,e,t,i){let s=!1,r=!1,n=!1,o=!1;if(a.firstTabInLine!==-1)return!1;let l=a.input.charCodeAt(a.position);for(;l!==0;){!s&&a.firstTabInLine!==-1&&(a.position=a.firstTabInLine,M(a,"tab characters must not be used in indentation"));const c=a.input.charCodeAt(a.position+1),u=a.line;if((l===63||l===58)&&tt(c))n||(Ds(a,a.position,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,De.BLOCK),n=!0),l===63?(s&&we(a),r=!0,s=!0):(s||(we(a),r=!0),s=!1),a.position+=1,o=!0;else{s&&(we(a),s=!1);const h=Wt(a);if(!Tt(a,t,Fs,!1,!0))break;if(a.line===u){for(l=a.input.charCodeAt(a.position);$t(l);)l=a.input.charCodeAt(++a.position);if(l===58){if(l=a.input.charCodeAt(++a.position),tt(l)||M(a,"a whitespace character is expected after the key-value separator within a block mapping"),!n){for(At(a,h),Ds(a,h.position,i.anchorStart,i.anchorEnd,i.tagStart,i.tagEnd,De.BLOCK),n=!0,Tt(a,t,Fs,!1,!0),l=a.input.charCodeAt(a.position);$t(l);)l=a.input.charCodeAt(++a.position);a.position++}r=!0,s=!1,o=!1}else if(r)M(a,"expected ':' after a mapping key");else return i.anchorStart!==Q||i.tagStart!==Q?(At(a,h),!1):!0}else if(r)M(a,"can not read a block mapping entry; a multiline key may not be an implicit key");else return i.anchorStart!==Q||i.tagStart!==Q?(At(a,h),!1):!0}if(Tt(a,e,ba,!0,o)&&(o=!1),s||o&&(we(a),o=!1),fe(a,!0),l=a.input.charCodeAt(a.position),(a.line===u||a.lineIndent>e)&&l!==0)M(a,"bad indentation of a mapping entry");else if(a.lineIndent<e)break}return r?(s&&we(a),n&&Qt(a),!0):!1}function Tt(a,e,t,i,s,r=!0){a.depth>=a.maxDepth&&M(a,`nesting exceeded maxDepth (${a.maxDepth})`),a.depth++;let n=1,o=!1,l=!1,c=null;const u=co();let h=t===ba||t===so,p=h;const _=h;if(i&&fe(a,!0)&&(o=!0,a.lineIndent>e?n=1:a.lineIndent===e?n=0:n=-1),n===1)for(;;){const m=a.input.charCodeAt(a.position),f=Wt(a);if(o&&n!==1&&(m===33||m===38))break;if(o&&_&&(u.tagStart!==Q||u.anchorStart!==Q)&&(m===33||m===38)){const y=Wt(a),v=e+1;if(Ls(a,a.position-a.lineStart,v,u)&&a.events[y.eventsLength]?.type===ge.MAPPING)return a.depth--,!0;At(a,y)}if(o&&(m===33&&u.tagStart!==Q||m===38&&u.anchorStart!==Q)||!Ih(a,u,t===Ht)&&!Mh(a,u))break;c===null&&(c=f),fe(a,!0)?(o=!0,p=_,a.lineIndent>e?n=1:a.lineIndent===e?n=0:n=-1):p=!1}if(p&&(p=o||s),n===1||t===ba){const m=t===Ht||t===Fs?e:e+1,f=a.position-a.lineStart;if(n===1)if(p&&(_o(a,f,u)||Ls(a,f,m,u))||Oh(a,m,u))l=!0;else{const y=a.input.charCodeAt(a.position);if(c!==null&&r&&_&&!p&&y!==124&&y!==62){const v=Wt(a),x=c.position-c.lineStart;At(a,c),Ls(a,x,m,co())&&a.events[v.eventsLength]?.type===ge.MAPPING?l=!0:At(a,v)}!l&&(h&&jh(a,m,u)||Fh(a,m,u)||zh(a,m,u)||Ph(a,u)||Rh(a,m,t,u))&&(l=!0)}else n===0&&(l=p&&_o(a,f,u))}return h=h&&!l,!l&&(u.anchorStart!==Q||u.tagStart!==Q||h)&&(Gt(a,Q,Q,u.anchorStart,u.anchorEnd,u.tagStart,u.tagEnd,z.PLAIN),l=!0),a.depth--,l||u.anchorStart!==Q||u.tagStart!==Q}function Lh(a){if(a.lineIndent>0||a.input.charCodeAt(a.position)!==37)return!1;a.position++;const e=a.position;for(;a.input.charCodeAt(a.position)!==0&&!qe(a.input.charCodeAt(a.position));)a.position++;const t=a.input.slice(e,a.position),i=[];for(t.length===0&&M(a,"directive name must not be less than one character in length");a.input.charCodeAt(a.position)!==0&&!he(a.input.charCodeAt(a.position));){for(;$t(a.input.charCodeAt(a.position));)a.position++;if(a.input.charCodeAt(a.position)===35||he(a.input.charCodeAt(a.position))||a.input.charCodeAt(a.position)===0)break;const s=a.position;for(;a.input.charCodeAt(a.position)!==0&&!qe(a.input.charCodeAt(a.position));)a.position++;i.push(a.input.slice(s,a.position))}if(he(a.input.charCodeAt(a.position))&&xa(a),t==="YAML"){a.directives.some(r=>r.kind==="yaml")&&M(a,"duplication of %YAML directive"),i.length!==1&&M(a,"YAML directive accepts exactly one argument");const s=/^([0-9]+)\.([0-9]+)$/.exec(i[0]);s===null&&M(a,"ill-formed argument of the YAML directive"),parseInt(s[1],10)!==1&&M(a,"unacceptable YAML version of the document"),a.directives.push({kind:"yaml",version:i[0]})}else if(t==="TAG"){i.length!==2&&M(a,"TAG directive accepts exactly two arguments");const[s,r]=i;ro.test(s)||M(a,"ill-formed tag handle (first argument) of the TAG directive"),ao.call(a.tagHandlers,s)&&M(a,`there is a previously declared suffix for "${s}" tag handle`),kh.test(r)||M(a,"ill-formed tag prefix (second argument) of the TAG directive"),a.tagHandlers[s]=r,a.directives.push({kind:"tag",handle:s,prefix:r})}return!0}function qh(a){a.directives=[],a.tagHandlers=Object.create(null);let e=!1;for(fe(a,!0);Lh(a);)e=!0,fe(a,!0);let t=!1,i=!1,s=!0;if(a.lineIndent===0&&a.input.charCodeAt(a.position)===45&&a.input.charCodeAt(a.position+1)===45&&a.input.charCodeAt(a.position+2)===45&&tt(a.input.charCodeAt(a.position+3))){t=!0;const o=a.line;a.position+=3,fe(a,!0),s=a.line>o}else e&&M(a,"directives end mark is expected");const r=a.events.length;if(!t&&a.position===a.lineStart&&a.input.charCodeAt(a.position)===46&&Kt(a)){a.position+=3,fe(a,!0);return}if(Eh(a,t,!1),Tt(a,a.lineIndent-1,ba,!1,s,s)||we(a),fe(a,!0),a.position===a.lineStart&&Kt(a)&&(i=a.input.charCodeAt(a.position)===46,i)){const o=a.line;a.position+=3,fe(a,!0),a.line===o&&a.position<a.length&&M(a,"end of the stream or a document separator is expected")}const n=a.events[r];n?.type===ge.DOCUMENT&&(n.explicitEnd=i),Qt(a),!i&&a.position<a.length&&!Rs(a)&&M(a,"end of the stream or a document separator is expected")}function Nh(a,e){const t=a.length,i={...js,...e,input:`${a}\0`,length:t,position:0,line:0,lineStart:0,lineIndent:0,firstTabInLine:-1,depth:0,directives:[],tagHandlers:Object.create(null),events:[]},s=a.indexOf("\0");for(s!==-1&&ht.throwAt(a,s,"null byte is not allowed in input",i.filename);i.position<i.length&&(uo(i),fe(i,!0),!(i.position>=i.length));){const r=i.position;qh(i),i.position===r&&M(i,"can not read a document")}return i.events}var Uh={...js,...Is};function Vh(a,e={}){const t={...Uh,...e},i=String(a),s=Object.keys(js),r=Object.keys(Is);return yh(Nh(i,Es(t,s)),{...Es(t,r),source:i})}function Bh(a,e){const t=Vh(a,e);if(t.length===0)throw new ht("expected a document, but the input is empty");if(t.length===1)return t[0];throw new ht("expected a single document in the stream, but found more")}var It=Symbol("INVALID");function Hh(a){const e=new Set([a.defaultScalarTag,a.defaultSequenceTag,a.defaultMappingTag].filter(r=>r!==void 0)),t=a.implicitScalarTags,i=a.tags.filter(r=>!(r.nodeKind==="scalar"&&r.implicit)&&!e.has(r)),s=a.tags.filter(r=>e.has(r));return[...t.map(r=>({tag:r,implicitTag:!0})),...i.map(r=>({tag:r,implicitTag:!1})),...s.map(r=>({tag:r,implicitTag:!0}))]}function Gh(a,e){for(let t=0,i=a.representTypes.length;t<i;t+=1){const{tag:s,implicitTag:r}=a.representTypes[t];if(s.identify(e)){let n;return s.matchByTagPrefix?n=s.representTagName(e):n=s.tagName,{tag:s,tagName:n,implicitTag:r}}}return null}function Pi(a,e){if(!a.noRefs&&e!==null&&typeof e=="object"){const c=a.refs.get(e);if(c)return c.anchor===void 0&&(c.anchor=`ref_${a.refCounter++}`),{kind:"alias",anchor:c.anchor}}const t=Gh(a,e);if(!t){if(e===void 0||a.skipInvalid)return It;throw new ht(`unacceptable kind of an object to dump ${Object.prototype.toString.call(e)}`)}const{tag:i,tagName:s,implicitTag:r}=t,n=r?s:Zn(s);if(i.nodeKind==="scalar")return{kind:"scalar",tag:n,tagged:!r,style:z.PLAIN,value:i.represent(e)};if(i.nodeKind==="sequence"){const c=i.represent(e),u={kind:"sequence",tag:n,tagged:!r,style:De.BLOCK,items:[]};a.noRefs||a.refs.set(e,u);for(let h=0,p=c.length;h<p;h+=1){let _=Pi(a,c[h]);_===It&&c[h]===void 0&&(_=Pi(a,null)),_!==It&&u.items.push(_)}return u}const o=i.represent(e),l={kind:"mapping",tag:n,tagged:!r,style:De.BLOCK,items:[]};a.noRefs||a.refs.set(e,l);for(const[c,u]of o){const h=Pi(a,c);if(h===It)continue;const p=Pi(a,u);p!==It&&l.items.push({key:h,value:p})}return l}function Qh(a,e,t={}){const i=Pi({representTypes:Hh(e),noRefs:t.noRefs??!1,skipInvalid:t.skipInvalid??!1,refs:new Map,refCounter:0},a);return[{contents:i===It?null:i,directives:[]}]}var Wh=Symbol("visit:break"),mo=Symbol("visit:skip");function wa(a,e,t){const i=e(a,t);if(i===Wh)return!0;if(i===mo)return!1;const s=t.depth+1;switch(a.kind){case"sequence":for(const r of a.items)if(wa(r,e,{depth:s,parent:a,isKey:!1}))return!0;break;case"mapping":for(const{key:r,value:n}of a.items)if(wa(r,e,{depth:s,parent:a,isKey:!0})||wa(n,e,{depth:s,parent:a,isKey:!1}))return!0;break}return!1}function go(a,e){for(const t of a)if(t.contents&&wa(t.contents,e,{depth:0,parent:null,isKey:!1}))return}function ka(a,e){return(a&1<<e)!==0}var fo={applyQuoteFlowKeysOption:Kh,doubleQuoteForInvisibles:Yh,doubleQuoteWhitespaceOnly:Zh,applyForceQuotesOption:Xh,tryLongOrMultilineAsBlock:Jh,quoteInvalidPlain:ep,fallbackToDoubleQuoted:tp};function yo(a){return a.presenterOptions.quoteStyle==="single"&&ka(a.allowedStylesMask,z.SINGLE_QUOTED)?z.SINGLE_QUOTED:z.DOUBLE_QUOTED}function Kh(a){a.presenterOptions.quoteFlowKeys&&(!a.isKey||!a.flowOnly||a.style!==z.PLAIN||(a.style=z.DOUBLE_QUOTED))}function Yh(a){a.style===z.PLAIN&&/[\t\x7F-\xA0\u2028\u2029\uFEFF\uFFFE\uFFFF]/.test(a.node.value)&&(a.style=z.DOUBLE_QUOTED)}function Zh(a){a.style===z.PLAIN&&/^\s+$/.test(a.node.value)&&(a.style=z.DOUBLE_QUOTED)}function Xh(a){a.presenterOptions.forceQuotes&&(a.isKey||a.style!==z.PLAIN||a.node.tag===a.presenterOptions.schema.defaultScalarTag.tagName&&(a.style=a.node.value.includes(`
`)?z.DOUBLE_QUOTED:yo(a)))}function Jh(a){if(a.style!==z.PLAIN||a.isKey)return;const e=a.node.value,t=e.indexOf(`
`)!==-1;if(!ka(a.allowedStylesMask,z.LITERAL_BLOCK)){t&&(a.style=z.DOUBLE_QUOTED);return}const i=a.presenterOptions.lineWidth;if(i===-1){t&&(a.style=z.LITERAL_BLOCK);return}const s=Math.max(Math.min(i,40),i-a.shiftOfContent);let r=0,n=!1;for(;r<=e.length;){let o=e.length;const l=e.indexOf(`
`,r);l!==-1&&(o=l);const c=e.slice(r,o);if(c.length>s&&c[0]!==" "&&/ [^ \t]/.test(c)&&(n=!0),l===-1)break;r=l+1}n?a.style=z.FOLDED_BLOCK:t&&(a.style=z.LITERAL_BLOCK)}function ep(a){a.style===z.PLAIN&&!ka(a.allowedStylesMask,z.PLAIN)&&(a.style=yo(a))}function tp(a){ka(a.allowedStylesMask,a.style)||(a.style=z.DOUBLE_QUOTED)}function Fi(a,e){return a|1<<e}var ip="[\\x09\\x0A\\x0D\\x20-\\x7E\\x85\\xA0-\\uD7FF\\uE000-\\uFFFD\\u{10000}-\\u{10FFFF}]",ap="[\\n\\r]",sp="\\uFEFF",qs="[ \\t]",vo=`(?:(?!(?:${ap}|${sp}))${ip})`,Ea=`(?:(?!${qs})${vo})`,bo="[\\x09\\x20-\\uD7FF\\uE000-\\uFFFF\\u{10000}-\\u{10FFFF}]",xo="[-?:,\\[\\]{}#&*!|>'\"%@`]",rp="[,\\[\\]{}]",Ns=Ea,Us=`(?:(?!${rp})${Ea})`,np=`(?:(?:(?!${xo})${Ea})|[?:-](?=${Ns}))`,op=`(?:(?:(?!${xo})${Ea})|[?:-](?=${Us}))`,wo=`(?:(?:(?![:#])${Ns})|:(?=${Ns}))#*`,ko=`(?:(?:(?![:#])${Us})|:(?=${Us}))#*`,Eo=`(?:${qs}*${wo})*`,So=`(?:${qs}*${ko})*`,Ao=`${np}#*${Eo}`,$o=`${op}#*${So}`,lp=Ao,cp=$o,dp=`\\n+${wo}${Eo}`,up=`\\n+${ko}${So}`,hp=`${Ao}(?:${dp})*`,pp=`${$o}(?:${up})*`,_p=new RegExp(`^(?:${hp})$`,"u"),mp=new RegExp(`^(?:${pp})$`,"u"),gp=new RegExp(`^(?:${lp})$`,"u"),fp=new RegExp(`^(?:${cp})$`,"u"),yp=new RegExp(`^(?:${bo})*$`,"u"),vp=new RegExp(`^(?:${bo}|\\n)*$`,"u"),bp=new RegExp(`^(?:${vo}|\\n)*$`,"u"),xp=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/,Vs=/^(?:---|\.\.\.)(?=$|[ \t\n\r])/m;function wp(a){const e=a.node.value;if(e!==""){if(!(a.isKey?a.flowOnly?fp:gp:a.flowOnly?mp:_p).test(e)||a.shiftOfFirstLine===0&&xp.test(e))return!1;if(a.shiftOfContent===0){const i=e.indexOf(`
`);if(i!==-1){const s=e.slice(i+1);if(Vs.test(s))return!1}}}const t=a.presenterOptions.schema.resolveImplicitScalarTag(e).tag.tagName;return!(!a.node.tagged&&t!==a.node.tag||!a.node.tagged&&e==="="&&t===a.presenterOptions.schema.defaultScalarTag.tagName)}function kp(a){const e=a.node.value;if(!(a.isKey?yp:vp).test(e)||/[ \t]\n|\n[ \t]/.test(e))return!1;if(!a.isKey&&a.shiftOfContent===0){const t=e.indexOf(`
`);if(t!==-1&&Vs.test(e.slice(t+1)))return!1}return!0}function Ep(a){if(a.flowOnly||!bp.test(a.node.value))return!1;const e=a.shiftOfContent-a.shiftOfParent;return!(e<1||e>9&&/^\n* /.test(a.node.value)||a.shiftOfContent===0&&Vs.test(a.node.value))}function Sp(a){let e=Fi(0,z.DOUBLE_QUOTED);wp(a)&&(e=Fi(e,z.PLAIN)),kp(a)&&(e=Fi(e,z.SINGLE_QUOTED)),Ep(a)&&(e=Fi(Fi(e,z.LITERAL_BLOCK),z.FOLDED_BLOCK)),a.allowedStylesMask=e}function Ap(a){switch(a.style){case z.PLAIN:return $p(a);case z.SINGLE_QUOTED:return Cp(a);case z.LITERAL_BLOCK:return Tp(a);case z.FOLDED_BLOCK:return Ip(a);case z.DOUBLE_QUOTED:return Mp(a)}}function $p(a){return Co(a.node.value,a.shiftOfContent)}function Cp(a){return`'${Co(a.node.value,a.shiftOfContent).replace(/'/g,"''")}'`}function Tp(a){const e=a.node.value;return"|"+Io(e,a.shiftOfParent,a.shiftOfContent)+Mo(To(e,a.shiftOfContent))}function Ip(a){const e=a.node.value,t=a.presenterOptions.lineWidth;let i=1/0;return t!==-1&&(i=Math.max(Math.min(t,40),t-a.shiftOfContent)),">"+Io(e,a.shiftOfParent,a.shiftOfContent)+Mo(To(Fp(e,i),a.shiftOfContent))}function Mp(a){return`"${Dp(a.node.value)}"`}function Co(a,e){let t=a.indexOf(`
`);if(t===-1)return a;const i=" ".repeat(e);let s=a.slice(0,t);const r=/(\n+)([^\n]*)/g;r.lastIndex=t;let n;for(;n=r.exec(a);){const o=n[1].length,l=n[2];s+=`
`.repeat(o+1)+i+l}return s}function To(a,e){const t=" ".repeat(e);let i=0,s="";const r=a.length;for(;i<r;){let n;const o=a.indexOf(`
`,i);o===-1?(n=a.slice(i),i=r):(n=a.slice(i,o+1),i=o+1),n.length&&n!==`
`&&(s+=t),s+=n}return s}function Pp(a){return/^\n* /.test(a)}function Io(a,e,t){const i=Pp(a)?String(t-e):"",s=a[a.length-1]===`
`;return`${i}${s&&(a[a.length-2]===`
`||a===`
`)?"+":s?"":"-"}
`}function Mo(a){return a[a.length-1]===`
`?a.slice(0,-1):a}function Bs(a){return a===" "||a==="	"}function Po(a,e){if(a===""||Bs(a[0]))return a;const t=/ [^ \t]/g;let i,s=0,r,n=0,o=0,l="";for(;i=t.exec(a);)o=i.index,o-s>e&&(r=n>s?n:o,l+=`
${a.slice(s,r)}`,s=r+1),n=o;return l+=`
`,a.length-s>e&&n>s?l+=`${a.slice(s,n)}
${a.slice(n+1)}`:l+=a.slice(s),l.slice(1)}function Fp(a,e){const t=/(\n+)([^\n]*)/g;let i=a.indexOf(`
`);i===-1&&(i=a.length),t.lastIndex=i;let s=Po(a.slice(0,i),e),r=a[0]===`
`||Bs(a[0]),n,o;for(;o=t.exec(a);){const l=o[1],c=o[2];n=c!==""&&Bs(c[0]),s+=l+(!r&&!n&&c!==""?`
`:"")+Po(c,e),r=n}return s}var zp=/["\\\x00-\x1F\x7F-\xA0\u2028\u2029\uD800-\uDFFF\uFEFF\uFFFE\uFFFF]/gu;function jp(a){switch(a){case"\0":return"\\0";case"\x07":return"\\a";case"\b":return"\\b";case"	":return"\\t";case`
`:return"\\n";case"\v":return"\\v";case"\f":return"\\f";case"\r":return"\\r";case"\x1B":return"\\e";case'"':return'\\"';case"\\":return"\\\\";case"\x85":return"\\N";case"\xA0":return"\\_";case"\u2028":return"\\L";case"\u2029":return"\\P"}const e=a.charCodeAt(0),t=e.toString(16).toUpperCase();return e<=255?`\\x${"0".repeat(2-t.length)}${t}`:`\\u${"0".repeat(4-t.length)}${t}`}function Dp(a){return a.replace(zp,jp)}var Sa=10,Hs={indent:2,seqNoIndent:!1,seqInlineFirst:!0,lineWidth:80,flowBracketPadding:!1,flowSkipCommaSpace:!1,flowSkipColonSpace:!1,quoteFlowKeys:!1,quoteStyle:"single",forceQuotes:!1,scalarStyleRules:Object.keys(fo).map(a=>Reflect.get(fo,a)),tagBeforeAnchor:!1};function Rp(a){return a.tagged?a.tag:Zn(a.tag)}function Op(a){const e={...Hs,...a};return e.flowSkipColonSpace&&(e.quoteFlowKeys=!0),{...e,defaultScalarTagName:e.schema.defaultScalarTag.tagName,openEnded:!1}}function Gs(a,e){return`
${" ".repeat(a.indent*e)}`}function Lp(a,e,t,i,s,r){return{node:e,parent:t,level:i,isKey:s,flowOnly:r,shiftOfParent:i===0?-1:a.indent*(i-1),shiftOfContent:a.indent*Math.max(1,i),shiftOfFirstLine:i===0?0:a.indent*i,presenterOptions:a,allowedStylesMask:0,style:e.style}}function qp(a,e,t){let i="";for(let r=0,n=t.items.length;r<n;r+=1){const o=it(a,e,t.items[r],t,{}).text;r>0&&(i+=`,${a.flowSkipCommaSpace?"":" "}`),i+=o}const s=a.flowBracketPadding&&t.items.length>0?" ":"";return`[${s}${i}${s}]`}function Fo(a,e,t,i){let s="";for(let r=0,n=t.items.length;r<n;r+=1){const o=it(a,e+1,t.items[r],t,{block:!0,compact:a.seqInlineFirst,isblockseq:!0}).text;(!i||s!=="")&&(s+=Gs(a,e)),o===""||Sa===o.charCodeAt(0)?s+="-":s+="- ",s+=o}return s}function Np(a,e,t){let i="";for(const{key:r,value:n}of t.items){let o="";i!==""&&(o+=`,${a.flowSkipCommaSpace?"":" "}`);const l=it(a,e,r,t,{iskey:!0}),c=l.text,u=it(a,e,n,t,{}).text,h=a.flowSkipColonSpace||u===""?"":" ",p=r.kind==="scalar"&&l.noBody&&(r.tagged||r.anchor!==void 0),_=r.kind==="alias"||p?" ":"";o+=`${c}${_}:${h}${u}`,i+=o}const s=a.flowBracketPadding&&i!==""?" ":"";return`{${s}${i}${s}}`}function Up(a,e,t,i){let s="";for(let r=0,n=t.items.length;r<n;r+=1){let o="";(!i||s!=="")&&(o+=Gs(a,e));const{key:l,value:c}=t.items[r],u=(l.kind==="mapping"||l.kind==="sequence")&&l.style===De.BLOCK&&l.items.length!==0||l.kind==="scalar"&&(l.style===z.LITERAL_BLOCK||l.style===z.FOLDED_BLOCK),h=u?it(a,e+1,l,t,{block:!0,compact:!0,isblockseq:!Qs(a,l,e+1)}):it(a,e+1,l,t,{block:!0,compact:!0,iskey:!0}),p=h.text,_=l.kind==="scalar"&&l.value.indexOf(`
`)!==-1,m=p.length>1024&&/^[\s\S]{1025}/u.test(p),f=u||_||m;f&&(p&&Sa===p.charCodeAt(0)?o+="?":o+="? "),o+=p,f&&(o+=Gs(a,e));const y=it(a,e+1,c,t,{block:!0,compact:f,isblockseq:f&&!Qs(a,c,e+1)}).text,v=l.kind==="scalar"&&h.noBody&&(l.tagged||l.anchor!==void 0),x=!f&&(l.kind==="alias"||v)?" ":"";y===""||Sa===y.charCodeAt(0)?o+=`${x}:`:o+=`${x}: `,o+=y,s+=o}return s}function Qs(a,e,t){return e.kind==="alias"?!0:e.tagged||e.anchor!==void 0||a.indent<2&&t>0}function it(a,e,t,i,s){if(t.kind==="alias")return a.openEnded=!1,{text:`*${t.anchor}`,noBody:!1};const{block:r=!1,iskey:n=!1,isblockseq:o=!1}=s;let l=s.compact??!1;const c=t.anchor!==void 0;Qs(a,t,e)&&(l=!1);let u,h=t.tagged;const p=r&&(t.kind==="mapping"||t.kind==="sequence")&&t.style===De.BLOCK&&t.items.length!==0;if(t.kind==="mapping")p?u=Up(a,e,t,l):u=Np(a,e,t);else if(t.kind==="sequence")p?a.seqNoIndent&&!o&&e>0?u=Fo(a,e-1,t,l):u=Fo(a,e,t,l):u=qp(a,e,t);else{const f=Lp(a,t,i,e,n,!r);Sp(f);for(const y of a.scalarStyleRules)y(f);u=Ap(f),a.openEnded=(f.style===z.LITERAL_BLOCK||f.style===z.FOLDED_BLOCK)&&(t.value===`
`||t.value.endsWith(`

`)),h=t.tagged||u===""&&f.flowOnly&&i?.kind==="sequence"&&!c||f.style!==z.PLAIN&&t.tag!==a.defaultScalarTagName}(t.kind==="mapping"||t.kind==="sequence")&&!p&&(a.openEnded=!1),p&&l&&e>0&&a.indent>2&&(u=`${" ".repeat(a.indent-2)}${u}`);const _=u==="";let m=u;if(h||c){const f=[],y=h?Rp(t):null,v=c?`&${t.anchor}`:null;a.tagBeforeAnchor?(y!==null&&f.push(y),v!==null&&f.push(v)):(v!==null&&f.push(v),y!==null&&f.push(y));const x=u===""||u.charCodeAt(0)===Sa?"":" ";m=`${f.join(" ")}${x}${u}`}return{text:m,noBody:_}}function Vp(a){return(a.kind==="sequence"||a.kind==="mapping")&&a.style===De.BLOCK&&a.items.length!==0&&!a.tagged&&a.anchor===void 0}function Bp(a){let e="";for(const t of a.directives){if(t.kind==="yaml"){e+=`%YAML ${t.version}
`;continue}const{handle:i,prefix:s}=t;e+=`%TAG ${i} ${s}
`}return e}function Hp(a,e){const t=Op(e);let i="",s=!1;for(let r=0;r<a.length;r+=1){const n=a[r];t.openEnded=!1;const o=Bp(n),l=o!=="",c=n.explicitStart||l||r>0&&!s;if(i+=o,n.contents===null)c&&(i+=`---
`);else if(c){const u=it(t,0,n.contents,null,{block:!0,compact:!0}).text,h=u===""?"":l||Vp(n.contents)?`
`:" ";i+=`---${h}${u}
`}else i+=it(t,0,n.contents,null,{block:!0,compact:!0}).text+`
`;s=n.explicitEnd||t.openEnded,s&&(i+=`...
`)}return i}var Gp={...Hs,schema:th,skipInvalid:!1,noRefs:!1,flowLevel:-1,sortKeys:!1,transform:()=>{}};function Qp(a,e){const t=String(a),i=String(e);return t<i?-1:t>i?1:0}function Wp(a,e={}){const t={...Gp,...e},i=Qh(a,t.schema,{noRefs:t.noRefs,skipInvalid:t.skipInvalid});if(t.flowLevel>=0&&go(i,(s,r)=>{if(!(r.depth<t.flowLevel))return(s.kind==="sequence"||s.kind==="mapping")&&(s.style=De.FLOW),mo}),t.sortKeys){const s=t.sortKeys===!0?Qp:t.sortKeys;go(i,r=>{r.kind==="mapping"&&r.items.sort((n,o)=>s(n.key.kind==="scalar"?n.key.value:"",o.key.kind==="scalar"?o.key.value:""))})}return t.transform(i),Hp(i,{...Es(t,Object.keys(Hs)),schema:t.schema})}/**!
 * Sortable 1.15.7
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */function Kp(a,e,t){return(e=Jp(e))in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function at(){return at=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var i in t)({}).hasOwnProperty.call(t,i)&&(a[i]=t[i])}return a},at.apply(null,arguments)}function zo(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(a);e&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(a,s).enumerable})),t.push.apply(t,i)}return t}function Qe(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?zo(Object(t),!0).forEach(function(i){Kp(a,i,t[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):zo(Object(t)).forEach(function(i){Object.defineProperty(a,i,Object.getOwnPropertyDescriptor(t,i))})}return a}function Yp(a,e){if(a==null)return{};var t,i,s=Zp(a,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);for(i=0;i<r.length;i++)t=r[i],e.indexOf(t)===-1&&{}.propertyIsEnumerable.call(a,t)&&(s[t]=a[t])}return s}function Zp(a,e){if(a==null)return{};var t={};for(var i in a)if({}.hasOwnProperty.call(a,i)){if(e.indexOf(i)!==-1)continue;t[i]=a[i]}return t}function Xp(a,e){if(typeof a!="object"||!a)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var i=t.call(a,e);if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function Jp(a){var e=Xp(a,"string");return typeof e=="symbol"?e:e+""}function Ws(a){"@babel/helpers - typeof";return Ws=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ws(a)}var e_="1.15.7";function st(a){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(a)}var rt=st(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),zi=st(/Edge/i),jo=st(/firefox/i),ji=st(/safari/i)&&!st(/chrome/i)&&!st(/android/i),Ks=st(/iP(ad|od|hone)/i),Do=st(/chrome/i)&&st(/android/i),Ro={capture:!1,passive:!1};function B(a,e,t){a.addEventListener(e,t,!rt&&Ro)}function V(a,e,t){a.removeEventListener(e,t,!rt&&Ro)}function Aa(a,e){if(e){if(e[0]===">"&&(e=e.substring(1)),a)try{if(a.matches)return a.matches(e);if(a.msMatchesSelector)return a.msMatchesSelector(e);if(a.webkitMatchesSelector)return a.webkitMatchesSelector(e)}catch{return!1}return!1}}function Oo(a){return a.host&&a!==document&&a.host.nodeType&&a.host!==a?a.host:a.parentNode}function Ne(a,e,t,i){if(a){t=t||document;do{if(e!=null&&(e[0]===">"?a.parentNode===t&&Aa(a,e):Aa(a,e))||i&&a===t)return a;if(a===t)break}while(a=Oo(a))}return null}var Lo=/\s+/g;function Ie(a,e,t){if(a&&e)if(a.classList)a.classList[t?"add":"remove"](e);else{var i=(" "+a.className+" ").replace(Lo," ").replace(" "+e+" "," ");a.className=(i+(t?" "+e:"")).replace(Lo," ")}}function j(a,e,t){var i=a&&a.style;if(i){if(t===void 0)return document.defaultView&&document.defaultView.getComputedStyle?t=document.defaultView.getComputedStyle(a,""):a.currentStyle&&(t=a.currentStyle),e===void 0?t:t[e];!(e in i)&&e.indexOf("webkit")===-1&&(e="-webkit-"+e),i[e]=t+(typeof t=="string"?"":"px")}}function Yt(a,e){var t="";if(typeof a=="string")t=a;else do{var i=j(a,"transform");i&&i!=="none"&&(t=i+" "+t)}while(!e&&(a=a.parentNode));var s=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return s&&new s(t)}function qo(a,e,t){if(a){var i=a.getElementsByTagName(e),s=0,r=i.length;if(t)for(;s<r;s++)t(i[s],s);return i}return[]}function We(){var a=document.scrollingElement;return a||document.documentElement}function le(a,e,t,i,s){if(!(!a.getBoundingClientRect&&a!==window)){var r,n,o,l,c,u,h;if(a!==window&&a.parentNode&&a!==We()?(r=a.getBoundingClientRect(),n=r.top,o=r.left,l=r.bottom,c=r.right,u=r.height,h=r.width):(n=0,o=0,l=window.innerHeight,c=window.innerWidth,u=window.innerHeight,h=window.innerWidth),(e||t)&&a!==window&&(s=s||a.parentNode,!rt))do if(s&&s.getBoundingClientRect&&(j(s,"transform")!=="none"||t&&j(s,"position")!=="static")){var p=s.getBoundingClientRect();n-=p.top+parseInt(j(s,"border-top-width")),o-=p.left+parseInt(j(s,"border-left-width")),l=n+r.height,c=o+r.width;break}while(s=s.parentNode);if(i&&a!==window){var _=Yt(s||a),m=_&&_.a,f=_&&_.d;_&&(n/=f,o/=m,h/=m,u/=f,l=n+u,c=o+h)}return{top:n,left:o,bottom:l,right:c,width:h,height:u}}}function No(a,e,t){for(var i=pt(a,!0),s=le(a)[e];i;){var r=le(i)[t],n=void 0;if(n=s>=r,!n)return i;if(i===We())break;i=pt(i,!1)}return!1}function Zt(a,e,t,i){for(var s=0,r=0,n=a.children;r<n.length;){if(n[r].style.display!=="none"&&n[r]!==D.ghost&&(i||n[r]!==D.dragged)&&Ne(n[r],t.draggable,a,!1)){if(s===e)return n[r];s++}r++}return null}function Ys(a,e){for(var t=a.lastElementChild;t&&(t===D.ghost||j(t,"display")==="none"||e&&!Aa(t,e));)t=t.previousElementSibling;return t||null}function Re(a,e){var t=0;if(!a||!a.parentNode)return-1;for(;a=a.previousElementSibling;)a.nodeName.toUpperCase()!=="TEMPLATE"&&a!==D.clone&&(!e||Aa(a,e))&&t++;return t}function Uo(a){var e=0,t=0,i=We();if(a)do{var s=Yt(a),r=s.a,n=s.d;e+=a.scrollLeft*r,t+=a.scrollTop*n}while(a!==i&&(a=a.parentNode));return[e,t]}function t_(a,e){for(var t in a)if(a.hasOwnProperty(t)){for(var i in e)if(e.hasOwnProperty(i)&&e[i]===a[t][i])return Number(t)}return-1}function pt(a,e){if(!a||!a.getBoundingClientRect)return We();var t=a,i=!1;do if(t.clientWidth<t.scrollWidth||t.clientHeight<t.scrollHeight){var s=j(t);if(t.clientWidth<t.scrollWidth&&(s.overflowX=="auto"||s.overflowX=="scroll")||t.clientHeight<t.scrollHeight&&(s.overflowY=="auto"||s.overflowY=="scroll")){if(!t.getBoundingClientRect||t===document.body)return We();if(i||e)return t;i=!0}}while(t=t.parentNode);return We()}function i_(a,e){if(a&&e)for(var t in e)e.hasOwnProperty(t)&&(a[t]=e[t]);return a}function Zs(a,e){return Math.round(a.top)===Math.round(e.top)&&Math.round(a.left)===Math.round(e.left)&&Math.round(a.height)===Math.round(e.height)&&Math.round(a.width)===Math.round(e.width)}var Di;function Vo(a,e){return function(){if(!Di){var t=arguments,i=this;t.length===1?a.call(i,t[0]):a.apply(i,t),Di=setTimeout(function(){Di=void 0},e)}}}function a_(){clearTimeout(Di),Di=void 0}function Bo(a,e,t){a.scrollLeft+=e,a.scrollTop+=t}function Ho(a){var e=window.Polymer,t=window.jQuery||window.Zepto;return e&&e.dom?e.dom(a).cloneNode(!0):t?t(a).clone(!0)[0]:a.cloneNode(!0)}function Go(a,e,t){var i={};return Array.from(a.children).forEach(function(s){var r,n,o,l;if(!(!Ne(s,e.draggable,a,!1)||s.animated||s===t)){var c=le(s);i.left=Math.min((r=i.left)!==null&&r!==void 0?r:1/0,c.left),i.top=Math.min((n=i.top)!==null&&n!==void 0?n:1/0,c.top),i.right=Math.max((o=i.right)!==null&&o!==void 0?o:-1/0,c.right),i.bottom=Math.max((l=i.bottom)!==null&&l!==void 0?l:-1/0,c.bottom)}}),i.width=i.right-i.left,i.height=i.bottom-i.top,i.x=i.left,i.y=i.top,i}var Ce="Sortable"+new Date().getTime();function s_(){var a=[],e;return{captureAnimationState:function(){if(a=[],!!this.options.animation){var i=[].slice.call(this.el.children);i.forEach(function(s){if(!(j(s,"display")==="none"||s===D.ghost)){a.push({target:s,rect:le(s)});var r=Qe({},a[a.length-1].rect);if(s.thisAnimationDuration){var n=Yt(s,!0);n&&(r.top-=n.f,r.left-=n.e)}s.fromRect=r}})}},addAnimationState:function(i){a.push(i)},removeAnimationState:function(i){a.splice(t_(a,{target:i}),1)},animateAll:function(i){var s=this;if(!this.options.animation){clearTimeout(e),typeof i=="function"&&i();return}var r=!1,n=0;a.forEach(function(o){var l=0,c=o.target,u=c.fromRect,h=le(c),p=c.prevFromRect,_=c.prevToRect,m=o.rect,f=Yt(c,!0);f&&(h.top-=f.f,h.left-=f.e),c.toRect=h,c.thisAnimationDuration&&Zs(p,h)&&!Zs(u,h)&&(m.top-h.top)/(m.left-h.left)===(u.top-h.top)/(u.left-h.left)&&(l=n_(m,p,_,s.options)),Zs(h,u)||(c.prevFromRect=u,c.prevToRect=h,l||(l=s.options.animation),s.animate(c,m,h,l)),l&&(r=!0,n=Math.max(n,l),clearTimeout(c.animationResetTimer),c.animationResetTimer=setTimeout(function(){c.animationTime=0,c.prevFromRect=null,c.fromRect=null,c.prevToRect=null,c.thisAnimationDuration=null},l),c.thisAnimationDuration=l)}),clearTimeout(e),r?e=setTimeout(function(){typeof i=="function"&&i()},n):typeof i=="function"&&i(),a=[]},animate:function(i,s,r,n){if(n){j(i,"transition",""),j(i,"transform","");var o=Yt(this.el),l=o&&o.a,c=o&&o.d,u=(s.left-r.left)/(l||1),h=(s.top-r.top)/(c||1);i.animatingX=!!u,i.animatingY=!!h,j(i,"transform","translate3d("+u+"px,"+h+"px,0)"),this.forRepaintDummy=r_(i),j(i,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),j(i,"transform","translate3d(0,0,0)"),typeof i.animated=="number"&&clearTimeout(i.animated),i.animated=setTimeout(function(){j(i,"transition",""),j(i,"transform",""),i.animated=!1,i.animatingX=!1,i.animatingY=!1},n)}}}}function r_(a){return a.offsetWidth}function n_(a,e,t,i){return Math.sqrt(Math.pow(e.top-a.top,2)+Math.pow(e.left-a.left,2))/Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))*i.animation}var Xt=[],Xs={initializeByDefault:!0},Ri={mount:function(e){for(var t in Xs)Xs.hasOwnProperty(t)&&!(t in e)&&(e[t]=Xs[t]);Xt.forEach(function(i){if(i.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),Xt.push(e)},pluginEvent:function(e,t,i){var s=this;this.eventCanceled=!1,i.cancel=function(){s.eventCanceled=!0};var r=e+"Global";Xt.forEach(function(n){t[n.pluginName]&&(t[n.pluginName][r]&&t[n.pluginName][r](Qe({sortable:t},i)),t.options[n.pluginName]&&t[n.pluginName][e]&&t[n.pluginName][e](Qe({sortable:t},i)))})},initializePlugins:function(e,t,i,s){Xt.forEach(function(o){var l=o.pluginName;if(!(!e.options[l]&&!o.initializeByDefault)){var c=new o(e,t,e.options);c.sortable=e,c.options=e.options,e[l]=c,at(i,c.defaults)}});for(var r in e.options)if(e.options.hasOwnProperty(r)){var n=this.modifyOption(e,r,e.options[r]);typeof n<"u"&&(e.options[r]=n)}},getEventProperties:function(e,t){var i={};return Xt.forEach(function(s){typeof s.eventProperties=="function"&&at(i,s.eventProperties.call(t[s.pluginName],e))}),i},modifyOption:function(e,t,i){var s;return Xt.forEach(function(r){e[r.pluginName]&&r.optionListeners&&typeof r.optionListeners[t]=="function"&&(s=r.optionListeners[t].call(e[r.pluginName],i))}),s}};function o_(a){var e=a.sortable,t=a.rootEl,i=a.name,s=a.targetEl,r=a.cloneEl,n=a.toEl,o=a.fromEl,l=a.oldIndex,c=a.newIndex,u=a.oldDraggableIndex,h=a.newDraggableIndex,p=a.originalEvent,_=a.putSortable,m=a.extraEventProperties;if(e=e||t&&t[Ce],!!e){var f,y=e.options,v="on"+i.charAt(0).toUpperCase()+i.substr(1);window.CustomEvent&&!rt&&!zi?f=new CustomEvent(i,{bubbles:!0,cancelable:!0}):(f=document.createEvent("Event"),f.initEvent(i,!0,!0)),f.to=n||t,f.from=o||t,f.item=s||t,f.clone=r,f.oldIndex=l,f.newIndex=c,f.oldDraggableIndex=u,f.newDraggableIndex=h,f.originalEvent=p,f.pullMode=_?_.lastPutMode:void 0;var x=Qe(Qe({},m),Ri.getEventProperties(i,e));for(var k in x)f[k]=x[k];t&&t.dispatchEvent(f),y[v]&&y[v].call(e,f)}}var l_=["evt"],Te=function(e,t){var i=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},s=i.evt,r=Yp(i,l_);Ri.pluginEvent.bind(D)(e,t,Qe({dragEl:A,parentEl:re,ghostEl:R,rootEl:ie,nextEl:Mt,lastDownEl:$a,cloneEl:se,cloneHidden:_t,dragStarted:Li,putSortable:_e,activeSortable:D.active,originalEvent:s,oldIndex:Jt,oldDraggableIndex:Oi,newIndex:Me,newDraggableIndex:mt,hideGhostForTarget:Jo,unhideGhostForTarget:el,cloneNowHidden:function(){_t=!0},cloneNowShown:function(){_t=!1},dispatchSortableEvent:function(o){ke({sortable:t,name:o,originalEvent:s})}},r))};function ke(a){o_(Qe({putSortable:_e,cloneEl:se,targetEl:A,rootEl:ie,oldIndex:Jt,oldDraggableIndex:Oi,newIndex:Me,newDraggableIndex:mt},a))}var A,re,R,ie,Mt,$a,se,_t,Jt,Me,Oi,mt,Ca,_e,ei=!1,Ta=!1,Ia=[],Pt,Ue,Js,er,Qo,Wo,Li,ti,qi,Ni=!1,Ma=!1,Pa,ye,tr=[],ir=!1,Fa=[],za=typeof document<"u",ja=Ks,Ko=zi||rt?"cssFloat":"float",c_=za&&!Do&&!Ks&&"draggable"in document.createElement("div"),Yo=(function(){if(za){if(rt)return!1;var a=document.createElement("x");return a.style.cssText="pointer-events:auto",a.style.pointerEvents==="auto"}})(),Zo=function(e,t){var i=j(e),s=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),r=Zt(e,0,t),n=Zt(e,1,t),o=r&&j(r),l=n&&j(n),c=o&&parseInt(o.marginLeft)+parseInt(o.marginRight)+le(r).width,u=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+le(n).width;if(i.display==="flex")return i.flexDirection==="column"||i.flexDirection==="column-reverse"?"vertical":"horizontal";if(i.display==="grid")return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(r&&o.float&&o.float!=="none"){var h=o.float==="left"?"left":"right";return n&&(l.clear==="both"||l.clear===h)?"vertical":"horizontal"}return r&&(o.display==="block"||o.display==="flex"||o.display==="table"||o.display==="grid"||c>=s&&i[Ko]==="none"||n&&i[Ko]==="none"&&c+u>s)?"vertical":"horizontal"},d_=function(e,t,i){var s=i?e.left:e.top,r=i?e.right:e.bottom,n=i?e.width:e.height,o=i?t.left:t.top,l=i?t.right:t.bottom,c=i?t.width:t.height;return s===o||r===l||s+n/2===o+c/2},u_=function(e,t){var i;return Ia.some(function(s){var r=s[Ce].options.emptyInsertThreshold;if(!(!r||Ys(s))){var n=le(s),o=e>=n.left-r&&e<=n.right+r,l=t>=n.top-r&&t<=n.bottom+r;if(o&&l)return i=s}}),i},Xo=function(e){function t(r,n){return function(o,l,c,u){var h=o.options.group.name&&l.options.group.name&&o.options.group.name===l.options.group.name;if(r==null&&(n||h))return!0;if(r==null||r===!1)return!1;if(n&&r==="clone")return r;if(typeof r=="function")return t(r(o,l,c,u),n)(o,l,c,u);var p=(n?o:l).options.group.name;return r===!0||typeof r=="string"&&r===p||r.join&&r.indexOf(p)>-1}}var i={},s=e.group;(!s||Ws(s)!="object")&&(s={name:s}),i.name=s.name,i.checkPull=t(s.pull,!0),i.checkPut=t(s.put),i.revertClone=s.revertClone,e.group=i},Jo=function(){!Yo&&R&&j(R,"display","none")},el=function(){!Yo&&R&&j(R,"display","")};za&&!Do&&document.addEventListener("click",function(a){if(Ta)return a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.stopImmediatePropagation&&a.stopImmediatePropagation(),Ta=!1,!1},!0);var Ft=function(e){if(A){e=e.touches?e.touches[0]:e;var t=u_(e.clientX,e.clientY);if(t){var i={};for(var s in e)e.hasOwnProperty(s)&&(i[s]=e[s]);i.target=i.rootEl=t,i.preventDefault=void 0,i.stopPropagation=void 0,t[Ce]._onDragOver(i)}}},h_=function(e){A&&A.parentNode[Ce]._isOutsideThisEl(e.target)};function D(a,e){if(!(a&&a.nodeType&&a.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(a));this.el=a,this.options=e=at({},e),a[Ce]=this;var t={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(a.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Zo(a,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(n,o){n.setData("Text",o.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:D.supportPointer!==!1&&"PointerEvent"in window&&(!ji||Ks),emptyInsertThreshold:5};Ri.initializePlugins(this,a,t);for(var i in t)!(i in e)&&(e[i]=t[i]);Xo(e);for(var s in this)s.charAt(0)==="_"&&typeof this[s]=="function"&&(this[s]=this[s].bind(this));this.nativeDraggable=e.forceFallback?!1:c_,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?B(a,"pointerdown",this._onTapStart):(B(a,"mousedown",this._onTapStart),B(a,"touchstart",this._onTapStart)),this.nativeDraggable&&(B(a,"dragover",this),B(a,"dragenter",this)),Ia.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),at(this,s_())}D.prototype={constructor:D,_isOutsideThisEl:function(e){!this.el.contains(e)&&e!==this.el&&(ti=null)},_getDirection:function(e,t){return typeof this.options.direction=="function"?this.options.direction.call(this,e,t,A):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,i=this.el,s=this.options,r=s.preventOnFilter,n=e.type,o=e.touches&&e.touches[0]||e.pointerType&&e.pointerType==="touch"&&e,l=(o||e).target,c=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||l,u=s.filter;if(b_(i),!A&&!(/mousedown|pointerdown/.test(n)&&e.button!==0||s.disabled)&&!c.isContentEditable&&!(!this.nativeDraggable&&ji&&l&&l.tagName.toUpperCase()==="SELECT")&&(l=Ne(l,s.draggable,i,!1),!(l&&l.animated)&&$a!==l)){if(Jt=Re(l),Oi=Re(l,s.draggable),typeof u=="function"){if(u.call(this,e,l,this)){ke({sortable:t,rootEl:c,name:"filter",targetEl:l,toEl:i,fromEl:i}),Te("filter",t,{evt:e}),r&&e.preventDefault();return}}else if(u&&(u=u.split(",").some(function(h){if(h=Ne(c,h.trim(),i,!1),h)return ke({sortable:t,rootEl:h,name:"filter",targetEl:l,fromEl:i,toEl:i}),Te("filter",t,{evt:e}),!0}),u)){r&&e.preventDefault();return}s.handle&&!Ne(c,s.handle,i,!1)||this._prepareDragStart(e,o,l)}}},_prepareDragStart:function(e,t,i){var s=this,r=s.el,n=s.options,o=r.ownerDocument,l;if(i&&!A&&i.parentNode===r){var c=le(i);if(ie=r,A=i,re=A.parentNode,Mt=A.nextSibling,$a=i,Ca=n.group,D.dragged=A,Pt={target:A,clientX:(t||e).clientX,clientY:(t||e).clientY},Qo=Pt.clientX-c.left,Wo=Pt.clientY-c.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,A.style["will-change"]="all",l=function(){if(Te("delayEnded",s,{evt:e}),D.eventCanceled){s._onDrop();return}s._disableDelayedDragEvents(),!jo&&s.nativeDraggable&&(A.draggable=!0),s._triggerDragStart(e,t),ke({sortable:s,name:"choose",originalEvent:e}),Ie(A,n.chosenClass,!0)},n.ignore.split(",").forEach(function(u){qo(A,u.trim(),ar)}),B(o,"dragover",Ft),B(o,"mousemove",Ft),B(o,"touchmove",Ft),n.supportPointer?(B(o,"pointerup",s._onDrop),!this.nativeDraggable&&B(o,"pointercancel",s._onDrop)):(B(o,"mouseup",s._onDrop),B(o,"touchend",s._onDrop),B(o,"touchcancel",s._onDrop)),jo&&this.nativeDraggable&&(this.options.touchStartThreshold=4,A.draggable=!0),Te("delayStart",this,{evt:e}),n.delay&&(!n.delayOnTouchOnly||t)&&(!this.nativeDraggable||!(zi||rt))){if(D.eventCanceled){this._onDrop();return}n.supportPointer?(B(o,"pointerup",s._disableDelayedDrag),B(o,"pointercancel",s._disableDelayedDrag)):(B(o,"mouseup",s._disableDelayedDrag),B(o,"touchend",s._disableDelayedDrag),B(o,"touchcancel",s._disableDelayedDrag)),B(o,"mousemove",s._delayedDragTouchMoveHandler),B(o,"touchmove",s._delayedDragTouchMoveHandler),n.supportPointer&&B(o,"pointermove",s._delayedDragTouchMoveHandler),s._dragStartTimer=setTimeout(l,n.delay)}else l()}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){A&&ar(A),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;V(e,"mouseup",this._disableDelayedDrag),V(e,"touchend",this._disableDelayedDrag),V(e,"touchcancel",this._disableDelayedDrag),V(e,"pointerup",this._disableDelayedDrag),V(e,"pointercancel",this._disableDelayedDrag),V(e,"mousemove",this._delayedDragTouchMoveHandler),V(e,"touchmove",this._delayedDragTouchMoveHandler),V(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||e.pointerType=="touch"&&e,!this.nativeDraggable||t?this.options.supportPointer?B(document,"pointermove",this._onTouchMove):t?B(document,"touchmove",this._onTouchMove):B(document,"mousemove",this._onTouchMove):(B(A,"dragend",this),B(ie,"dragstart",this._onDragStart));try{document.selection?Ra(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(ei=!1,ie&&A){Te("dragStarted",this,{evt:t}),this.nativeDraggable&&B(document,"dragover",h_);var i=this.options;!e&&Ie(A,i.dragClass,!1),Ie(A,i.ghostClass,!0),D.active=this,e&&this._appendGhost(),ke({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(Ue){this._lastX=Ue.clientX,this._lastY=Ue.clientY,Jo();for(var e=document.elementFromPoint(Ue.clientX,Ue.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(Ue.clientX,Ue.clientY),e!==t);)t=e;if(A.parentNode[Ce]._isOutsideThisEl(e),t)do{if(t[Ce]){var i=void 0;if(i=t[Ce]._onDragOver({clientX:Ue.clientX,clientY:Ue.clientY,target:e,rootEl:t}),i&&!this.options.dragoverBubble)break}e=t}while(t=Oo(t));el()}},_onTouchMove:function(e){if(Pt){var t=this.options,i=t.fallbackTolerance,s=t.fallbackOffset,r=e.touches?e.touches[0]:e,n=R&&Yt(R,!0),o=R&&n&&n.a,l=R&&n&&n.d,c=ja&&ye&&Uo(ye),u=(r.clientX-Pt.clientX+s.x)/(o||1)+(c?c[0]-tr[0]:0)/(o||1),h=(r.clientY-Pt.clientY+s.y)/(l||1)+(c?c[1]-tr[1]:0)/(l||1);if(!D.active&&!ei){if(i&&Math.max(Math.abs(r.clientX-this._lastX),Math.abs(r.clientY-this._lastY))<i)return;this._onDragStart(e,!0)}if(R){n?(n.e+=u-(Js||0),n.f+=h-(er||0)):n={a:1,b:0,c:0,d:1,e:u,f:h};var p="matrix(".concat(n.a,",").concat(n.b,",").concat(n.c,",").concat(n.d,",").concat(n.e,",").concat(n.f,")");j(R,"webkitTransform",p),j(R,"mozTransform",p),j(R,"msTransform",p),j(R,"transform",p),Js=u,er=h,Ue=r}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!R){var e=this.options.fallbackOnBody?document.body:ie,t=le(A,!0,ja,!0,e),i=this.options;if(ja){for(ye=e;j(ye,"position")==="static"&&j(ye,"transform")==="none"&&ye!==document;)ye=ye.parentNode;ye!==document.body&&ye!==document.documentElement?(ye===document&&(ye=We()),t.top+=ye.scrollTop,t.left+=ye.scrollLeft):ye=We(),tr=Uo(ye)}R=A.cloneNode(!0),Ie(R,i.ghostClass,!1),Ie(R,i.fallbackClass,!0),Ie(R,i.dragClass,!0),j(R,"transition",""),j(R,"transform",""),j(R,"box-sizing","border-box"),j(R,"margin",0),j(R,"top",t.top),j(R,"left",t.left),j(R,"width",t.width),j(R,"height",t.height),j(R,"opacity","0.8"),j(R,"position",ja?"absolute":"fixed"),j(R,"zIndex","100000"),j(R,"pointerEvents","none"),D.ghost=R,e.appendChild(R),j(R,"transform-origin",Qo/parseInt(R.style.width)*100+"% "+Wo/parseInt(R.style.height)*100+"%")}},_onDragStart:function(e,t){var i=this,s=e.dataTransfer,r=i.options;if(Te("dragStart",this,{evt:e}),D.eventCanceled){this._onDrop();return}Te("setupClone",this),D.eventCanceled||(se=Ho(A),se.removeAttribute("id"),se.draggable=!1,se.style["will-change"]="",this._hideClone(),Ie(se,this.options.chosenClass,!1),D.clone=se),i.cloneId=Ra(function(){Te("clone",i),!D.eventCanceled&&(i.options.removeCloneOnHide||ie.insertBefore(se,A),i._hideClone(),ke({sortable:i,name:"clone"}))}),!t&&Ie(A,r.dragClass,!0),t?(Ta=!0,i._loopId=setInterval(i._emulateDragOver,50)):(V(document,"mouseup",i._onDrop),V(document,"touchend",i._onDrop),V(document,"touchcancel",i._onDrop),s&&(s.effectAllowed="move",r.setData&&r.setData.call(i,s,A)),B(document,"drop",i),j(A,"transform","translateZ(0)")),ei=!0,i._dragStartId=Ra(i._dragStarted.bind(i,t,e)),B(document,"selectstart",i),Li=!0,window.getSelection().removeAllRanges(),ji&&j(document.body,"user-select","none")},_onDragOver:function(e){var t=this.el,i=e.target,s,r,n,o=this.options,l=o.group,c=D.active,u=Ca===l,h=o.sort,p=_e||c,_,m=this,f=!1;if(ir)return;function y(de,Z){Te(de,m,Qe({evt:e,isOwner:u,axis:_?"vertical":"horizontal",revert:n,dragRect:s,targetRect:r,canSort:h,fromSortable:p,target:i,completed:x,onMove:function(J,ee){return Da(ie,t,A,s,J,le(J),e,ee)},changed:k},Z))}function v(){y("dragOverAnimationCapture"),m.captureAnimationState(),m!==p&&p.captureAnimationState()}function x(de){return y("dragOverCompleted",{insertion:de}),de&&(u?c._hideClone():c._showClone(m),m!==p&&(Ie(A,_e?_e.options.ghostClass:c.options.ghostClass,!1),Ie(A,o.ghostClass,!0)),_e!==m&&m!==D.active?_e=m:m===D.active&&_e&&(_e=null),p===m&&(m._ignoreWhileAnimating=i),m.animateAll(function(){y("dragOverAnimationComplete"),m._ignoreWhileAnimating=null}),m!==p&&(p.animateAll(),p._ignoreWhileAnimating=null)),(i===A&&!A.animated||i===t&&!i.animated)&&(ti=null),!o.dragoverBubble&&!e.rootEl&&i!==document&&(A.parentNode[Ce]._isOutsideThisEl(e.target),!de&&Ft(e)),!o.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),f=!0}function k(){Me=Re(A),mt=Re(A,o.draggable),ke({sortable:m,name:"change",toEl:t,newIndex:Me,newDraggableIndex:mt,originalEvent:e})}if(e.preventDefault!==void 0&&e.cancelable&&e.preventDefault(),i=Ne(i,o.draggable,t,!0),y("dragOver"),D.eventCanceled)return f;if(A.contains(e.target)||i.animated&&i.animatingX&&i.animatingY||m._ignoreWhileAnimating===i)return x(!1);if(Ta=!1,c&&!o.disabled&&(u?h||(n=re!==ie):_e===this||(this.lastPutMode=Ca.checkPull(this,c,A,e))&&l.checkPut(this,c,A,e))){if(_=this._getDirection(e,i)==="vertical",s=le(A),y("dragOverValid"),D.eventCanceled)return f;if(n)return re=ie,v(),this._hideClone(),y("revert"),D.eventCanceled||(Mt?ie.insertBefore(A,Mt):ie.appendChild(A)),x(!0);var E=Ys(t,o.draggable);if(!E||g_(e,_,this)&&!E.animated){if(E===A)return x(!1);if(E&&t===e.target&&(i=E),i&&(r=le(i)),Da(ie,t,A,s,i,r,e,!!i)!==!1)return v(),E&&E.nextSibling?t.insertBefore(A,E.nextSibling):t.appendChild(A),re=t,k(),x(!0)}else if(E&&m_(e,_,this)){var S=Zt(t,0,o,!0);if(S===A)return x(!1);if(i=S,r=le(i),Da(ie,t,A,s,i,r,e,!1)!==!1)return v(),t.insertBefore(A,S),re=t,k(),x(!0)}else if(i.parentNode===t){r=le(i);var C=0,$,P=A.parentNode!==t,F=!d_(A.animated&&A.toRect||s,i.animated&&i.toRect||r,_),T=_?"top":"left",I=No(i,"top","top")||No(A,"top","top"),O=I?I.scrollTop:void 0;ti!==i&&($=r[T],Ni=!1,Ma=!F&&o.invertSwap||P),C=f_(e,i,r,_,F?1:o.swapThreshold,o.invertedSwapThreshold==null?o.swapThreshold:o.invertedSwapThreshold,Ma,ti===i);var N;if(C!==0){var W=Re(A);do W-=C,N=re.children[W];while(N&&(j(N,"display")==="none"||N===R))}if(C===0||N===i)return x(!1);ti=i,qi=C;var Y=i.nextElementSibling,U=!1;U=C===1;var L=Da(ie,t,A,s,i,r,e,U);if(L!==!1)return(L===1||L===-1)&&(U=L===1),ir=!0,setTimeout(__,30),v(),U&&!Y?t.appendChild(A):i.parentNode.insertBefore(A,U?Y:i),I&&Bo(I,0,O-I.scrollTop),re=A.parentNode,$!==void 0&&!Ma&&(Pa=Math.abs($-le(i)[T])),k(),x(!0)}if(t.contains(A))return x(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){V(document,"mousemove",this._onTouchMove),V(document,"touchmove",this._onTouchMove),V(document,"pointermove",this._onTouchMove),V(document,"dragover",Ft),V(document,"mousemove",Ft),V(document,"touchmove",Ft)},_offUpEvents:function(){var e=this.el.ownerDocument;V(e,"mouseup",this._onDrop),V(e,"touchend",this._onDrop),V(e,"pointerup",this._onDrop),V(e,"pointercancel",this._onDrop),V(e,"touchcancel",this._onDrop),V(document,"selectstart",this)},_onDrop:function(e){var t=this.el,i=this.options;if(Me=Re(A),mt=Re(A,i.draggable),Te("drop",this,{evt:e}),re=A&&A.parentNode,Me=Re(A),mt=Re(A,i.draggable),D.eventCanceled){this._nulling();return}ei=!1,Ma=!1,Ni=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),sr(this.cloneId),sr(this._dragStartId),this.nativeDraggable&&(V(document,"drop",this),V(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),ji&&j(document.body,"user-select",""),j(A,"transform",""),e&&(Li&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),R&&R.parentNode&&R.parentNode.removeChild(R),(ie===re||_e&&_e.lastPutMode!=="clone")&&se&&se.parentNode&&se.parentNode.removeChild(se),A&&(this.nativeDraggable&&V(A,"dragend",this),ar(A),A.style["will-change"]="",Li&&!ei&&Ie(A,_e?_e.options.ghostClass:this.options.ghostClass,!1),Ie(A,this.options.chosenClass,!1),ke({sortable:this,name:"unchoose",toEl:re,newIndex:null,newDraggableIndex:null,originalEvent:e}),ie!==re?(Me>=0&&(ke({rootEl:re,name:"add",toEl:re,fromEl:ie,originalEvent:e}),ke({sortable:this,name:"remove",toEl:re,originalEvent:e}),ke({rootEl:re,name:"sort",toEl:re,fromEl:ie,originalEvent:e}),ke({sortable:this,name:"sort",toEl:re,originalEvent:e})),_e&&_e.save()):Me!==Jt&&Me>=0&&(ke({sortable:this,name:"update",toEl:re,originalEvent:e}),ke({sortable:this,name:"sort",toEl:re,originalEvent:e})),D.active&&((Me==null||Me===-1)&&(Me=Jt,mt=Oi),ke({sortable:this,name:"end",toEl:re,originalEvent:e}),this.save()))),this._nulling()},_nulling:function(){Te("nulling",this),ie=A=re=R=Mt=se=$a=_t=Pt=Ue=Li=Me=mt=Jt=Oi=ti=qi=_e=Ca=D.dragged=D.ghost=D.clone=D.active=null;var e=this.el;Fa.forEach(function(t){e.contains(t)&&(t.checked=!0)}),Fa.length=Js=er=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":A&&(this._onDragOver(e),p_(e));break;case"selectstart":e.preventDefault();break}},toArray:function(){for(var e=[],t,i=this.el.children,s=0,r=i.length,n=this.options;s<r;s++)t=i[s],Ne(t,n.draggable,this.el,!1)&&e.push(t.getAttribute(n.dataIdAttr)||v_(t));return e},sort:function(e,t){var i={},s=this.el;this.toArray().forEach(function(r,n){var o=s.children[n];Ne(o,this.options.draggable,s,!1)&&(i[r]=o)},this),t&&this.captureAnimationState(),e.forEach(function(r){i[r]&&(s.removeChild(i[r]),s.appendChild(i[r]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return Ne(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var i=this.options;if(t===void 0)return i[e];var s=Ri.modifyOption(this,e,t);typeof s<"u"?i[e]=s:i[e]=t,e==="group"&&Xo(i)},destroy:function(){Te("destroy",this);var e=this.el;e[Ce]=null,V(e,"mousedown",this._onTapStart),V(e,"touchstart",this._onTapStart),V(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(V(e,"dragover",this),V(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Ia.splice(Ia.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!_t){if(Te("hideClone",this),D.eventCanceled)return;j(se,"display","none"),this.options.removeCloneOnHide&&se.parentNode&&se.parentNode.removeChild(se),_t=!0}},_showClone:function(e){if(e.lastPutMode!=="clone"){this._hideClone();return}if(_t){if(Te("showClone",this),D.eventCanceled)return;A.parentNode==ie&&!this.options.group.revertClone?ie.insertBefore(se,A):Mt?ie.insertBefore(se,Mt):ie.appendChild(se),this.options.group.revertClone&&this.animate(A,se),j(se,"display",""),_t=!1}}};function p_(a){a.dataTransfer&&(a.dataTransfer.dropEffect="move"),a.cancelable&&a.preventDefault()}function Da(a,e,t,i,s,r,n,o){var l,c=a[Ce],u=c.options.onMove,h;return window.CustomEvent&&!rt&&!zi?l=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(l=document.createEvent("Event"),l.initEvent("move",!0,!0)),l.to=e,l.from=a,l.dragged=t,l.draggedRect=i,l.related=s||e,l.relatedRect=r||le(e),l.willInsertAfter=o,l.originalEvent=n,a.dispatchEvent(l),u&&(h=u.call(c,l,n)),h}function ar(a){a.draggable=!1}function __(){ir=!1}function m_(a,e,t){var i=le(Zt(t.el,0,t.options,!0)),s=Go(t.el,t.options,R),r=10;return e?a.clientX<s.left-r||a.clientY<i.top&&a.clientX<i.right:a.clientY<s.top-r||a.clientY<i.bottom&&a.clientX<i.left}function g_(a,e,t){var i=le(Ys(t.el,t.options.draggable)),s=Go(t.el,t.options,R),r=10;return e?a.clientX>s.right+r||a.clientY>i.bottom&&a.clientX>i.left:a.clientY>s.bottom+r||a.clientX>i.right&&a.clientY>i.top}function f_(a,e,t,i,s,r,n,o){var l=i?a.clientY:a.clientX,c=i?t.height:t.width,u=i?t.top:t.left,h=i?t.bottom:t.right,p=!1;if(!n){if(o&&Pa<c*s){if(!Ni&&(qi===1?l>u+c*r/2:l<h-c*r/2)&&(Ni=!0),Ni)p=!0;else if(qi===1?l<u+Pa:l>h-Pa)return-qi}else if(l>u+c*(1-s)/2&&l<h-c*(1-s)/2)return y_(e)}return p=p||n,p&&(l<u+c*r/2||l>h-c*r/2)?l>u+c/2?1:-1:0}function y_(a){return Re(A)<Re(a)?1:-1}function v_(a){for(var e=a.tagName+a.className+a.src+a.href+a.textContent,t=e.length,i=0;t--;)i+=e.charCodeAt(t);return i.toString(36)}function b_(a){Fa.length=0;for(var e=a.getElementsByTagName("input"),t=e.length;t--;){var i=e[t];i.checked&&Fa.push(i)}}function Ra(a){return setTimeout(a,0)}function sr(a){return clearTimeout(a)}za&&B(document,"touchmove",function(a){(D.active||ei)&&a.cancelable&&a.preventDefault()}),D.utils={on:B,off:V,css:j,find:qo,is:function(e,t){return!!Ne(e,t,e,!1)},extend:i_,throttle:Vo,closest:Ne,toggleClass:Ie,clone:Ho,index:Re,nextTick:Ra,cancelNextTick:sr,detectDirection:Zo,getChild:Zt,expando:Ce},D.get=function(a){return a[Ce]},D.mount=function(){for(var a=arguments.length,e=new Array(a),t=0;t<a;t++)e[t]=arguments[t];e[0].constructor===Array&&(e=e[0]),e.forEach(function(i){if(!i.prototype||!i.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(i));i.utils&&(D.utils=Qe(Qe({},D.utils),i.utils)),Ri.mount(i)})},D.create=function(a,e){return new D(a,e)},D.version=e_;var ce=[],Ui,rr,nr=!1,or,lr,Oa,Vi;function x_(){function a(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var e in this)e.charAt(0)==="_"&&typeof this[e]=="function"&&(this[e]=this[e].bind(this))}return a.prototype={dragStarted:function(t){var i=t.originalEvent;this.sortable.nativeDraggable?B(document,"dragover",this._handleAutoScroll):this.options.supportPointer?B(document,"pointermove",this._handleFallbackAutoScroll):i.touches?B(document,"touchmove",this._handleFallbackAutoScroll):B(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var i=t.originalEvent;!this.options.dragOverBubble&&!i.rootEl&&this._handleAutoScroll(i)},drop:function(){this.sortable.nativeDraggable?V(document,"dragover",this._handleAutoScroll):(V(document,"pointermove",this._handleFallbackAutoScroll),V(document,"touchmove",this._handleFallbackAutoScroll),V(document,"mousemove",this._handleFallbackAutoScroll)),tl(),La(),a_()},nulling:function(){Oa=rr=Ui=nr=Vi=or=lr=null,ce.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,i){var s=this,r=(t.touches?t.touches[0]:t).clientX,n=(t.touches?t.touches[0]:t).clientY,o=document.elementFromPoint(r,n);if(Oa=t,i||this.options.forceAutoScrollFallback||zi||rt||ji){cr(t,this.options,o,i);var l=pt(o,!0);nr&&(!Vi||r!==or||n!==lr)&&(Vi&&tl(),Vi=setInterval(function(){var c=pt(document.elementFromPoint(r,n),!0);c!==l&&(l=c,La()),cr(t,s.options,c,i)},10),or=r,lr=n)}else{if(!this.options.bubbleScroll||pt(o,!0)===We()){La();return}cr(t,this.options,pt(o,!1),!1)}}},at(a,{pluginName:"scroll",initializeByDefault:!0})}function La(){ce.forEach(function(a){clearInterval(a.pid)}),ce=[]}function tl(){clearInterval(Vi)}var cr=Vo(function(a,e,t,i){if(e.scroll){var s=(a.touches?a.touches[0]:a).clientX,r=(a.touches?a.touches[0]:a).clientY,n=e.scrollSensitivity,o=e.scrollSpeed,l=We(),c=!1,u;rr!==t&&(rr=t,La(),Ui=e.scroll,u=e.scrollFn,Ui===!0&&(Ui=pt(t,!0)));var h=0,p=Ui;do{var _=p,m=le(_),f=m.top,y=m.bottom,v=m.left,x=m.right,k=m.width,E=m.height,S=void 0,C=void 0,$=_.scrollWidth,P=_.scrollHeight,F=j(_),T=_.scrollLeft,I=_.scrollTop;_===l?(S=k<$&&(F.overflowX==="auto"||F.overflowX==="scroll"||F.overflowX==="visible"),C=E<P&&(F.overflowY==="auto"||F.overflowY==="scroll"||F.overflowY==="visible")):(S=k<$&&(F.overflowX==="auto"||F.overflowX==="scroll"),C=E<P&&(F.overflowY==="auto"||F.overflowY==="scroll"));var O=S&&(Math.abs(x-s)<=n&&T+k<$)-(Math.abs(v-s)<=n&&!!T),N=C&&(Math.abs(y-r)<=n&&I+E<P)-(Math.abs(f-r)<=n&&!!I);if(!ce[h])for(var W=0;W<=h;W++)ce[W]||(ce[W]={});(ce[h].vx!=O||ce[h].vy!=N||ce[h].el!==_)&&(ce[h].el=_,ce[h].vx=O,ce[h].vy=N,clearInterval(ce[h].pid),(O!=0||N!=0)&&(c=!0,ce[h].pid=setInterval(function(){i&&this.layer===0&&D.active._onTouchMove(Oa);var Y=ce[this.layer].vy?ce[this.layer].vy*o:0,U=ce[this.layer].vx?ce[this.layer].vx*o:0;typeof u=="function"&&u.call(D.dragged.parentNode[Ce],U,Y,a,Oa,ce[this.layer].el)!=="continue"||Bo(ce[this.layer].el,U,Y)}.bind({layer:h}),24))),h++}while(e.bubbleScroll&&p!==l&&(p=pt(p,!1)));nr=c}},30),il=function(e){var t=e.originalEvent,i=e.putSortable,s=e.dragEl,r=e.activeSortable,n=e.dispatchSortableEvent,o=e.hideGhostForTarget,l=e.unhideGhostForTarget;if(t){var c=i||r;o();var u=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,h=document.elementFromPoint(u.clientX,u.clientY);l(),c&&!c.el.contains(h)&&(n("spill"),this.onSpill({dragEl:s,putSortable:i}))}};function dr(){}dr.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,i=e.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var s=Zt(this.sortable.el,this.startIndex,this.options);s?this.sortable.el.insertBefore(t,s):this.sortable.el.appendChild(t),this.sortable.animateAll(),i&&i.animateAll()},drop:il},at(dr,{pluginName:"revertOnSpill"});function ur(){}ur.prototype={onSpill:function(e){var t=e.dragEl,i=e.putSortable,s=i||this.sortable;s.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),s.animateAll()},drop:il},at(ur,{pluginName:"removeOnSpill"}),D.mount(new x_),D.mount(ur,dr);class w_ extends ct{static get properties(){return{disabled:{type:Boolean},handleSelector:{type:String},draggableSelector:{type:String}}}constructor(){super(),this.disabled=!1,this.handleSelector=".handle",this.draggableSelector=".sortable-item",this._sortable=null}createRenderRoot(){return this}render(){return g` <slot></slot> `}connectedCallback(){super.connectedCallback(),this.disabled||this._createSortable()}disconnectedCallback(){super.disconnectedCallback(),this._destroySortable()}updated(e){e.has("disabled")&&(this.disabled?this._destroySortable():this._createSortable())}_createSortable(){if(this._sortable)return;const e=this.children[0];if(!e)return;const t={scroll:!0,forceAutoScrollFallback:!0,scrollSpeed:20,animation:150,draggable:this.draggableSelector,handle:this.handleSelector||void 0,fallbackTolerance:3,fallbackOnBody:!0,fallbackClass:"sortable-fallback",forceFallback:!0,onChoose:this._handleChoose.bind(this),onStart:this._handleStart.bind(this),onEnd:this._handleEnd.bind(this),onUpdate:this._handleUpdate.bind(this)};this._sortable=new D(e,t),this._stopBubble=i=>{i.target.closest&&i.target.closest("button, ha-icon, ha-svg-icon")||i.stopPropagation()},e.addEventListener("mousedown",this._stopBubble),e.addEventListener("touchstart",this._stopBubble,{passive:!0}),e.addEventListener("pointerdown",this._stopBubble),e.addEventListener("dragstart",this._stopBubble),e.addEventListener("dragend",this._stopBubble),e.addEventListener("drop",this._stopBubble)}_handleUpdate(e){this.dispatchEvent(new CustomEvent("item-moved",{detail:{oldIndex:e.oldIndex,newIndex:e.newIndex},bubbles:!0,composed:!0}))}_handleEnd(e){this._cleanupGhostElements(),e.item.placeholder&&(e.item.placeholder.replaceWith(e.item),delete e.item.placeholder),this.dispatchEvent(new CustomEvent("drag-end",{bubbles:!0,composed:!0}))}_handleStart(e){this._cleanupGhostElements(),this.dispatchEvent(new CustomEvent("drag-start",{bubbles:!0,composed:!0}))}_handleChoose(e){e.item.placeholder=document.createComment("sort-placeholder"),e.item.after(e.item.placeholder)}_cleanupGhostElements(){document.querySelectorAll(".sortable-fallback, .sortable-ghost").forEach(e=>{e.parentNode&&e.parentNode.removeChild(e)})}_destroySortable(){if(!this._sortable)return;this._sortable.destroy(),this._sortable=null;const e=this.children[0];e&&this._stopBubble&&(e.removeEventListener("mousedown",this._stopBubble),e.removeEventListener("touchstart",this._stopBubble),e.removeEventListener("pointerdown",this._stopBubble),e.removeEventListener("dragstart",this._stopBubble),e.removeEventListener("dragend",this._stopBubble),e.removeEventListener("drop",this._stopBubble)),this._cleanupGhostElements()}}customElements.define("yamp-sortable",w_);var k_=Object.defineProperty,E_=(a,e,t)=>e in a?k_(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,S_=(a,e,t)=>E_(a,e+"",t);const A_=()=>[{value:"details",label:d("card.sections.details")},{value:"menu",label:d("card.sections.menu")},{value:"action_chips",label:d("card.sections.action_chips")},{value:"lyrics",label:d("card.sections.lyrics")}],hr=Object.freeze(["details","menu","action_chips","lyrics"]),al=Object.freeze({select:{mode:"dropdown",options:[{value:"slider",label:"Slider"},{value:"stepper",label:"Stepper"},{value:"hidden",label:"Hidden"}]}}),sl=Object.freeze({number:{min:.01,max:1,step:.01,unit_of_measurement:"",mode:"box"}}),$_=Object.freeze({number:{min:0,max:100,step:1,unit_of_measurement:"%",mode:"slider"}});class rl extends ct{constructor(){super(),this.hass=void 0,this._config=void 0,this._yamlConfig={},this._preTemplateConfig={},this._templateModes={},this._serviceItems=[],this._searchTerm="",this._actionMode=void 0,this._activeTab="entities",this._entityEditorIndex=null,this._actionEditorIndex=null,this._tempEntityIndex=null,this._tempActionIndex=null,this._isInternalUpdate=!1,this._yamlDraft=void 0,this._yamlError=null,this._yamlConfig={},this._serviceItems=[],this._templateModes={},this._artworkOverrides=[],this._preTemplateConfig=null}firstUpdated(){this._serviceItems=this._getServiceItems(),this.addEventListener("value-changed",e=>this._captureEditorIndex(e),!0),this.addEventListener("change",e=>this._captureEditorIndex(e),!0),this.addEventListener("click",e=>this._captureEditorIndex(e),!0)}_captureEditorIndex(e){const t=e.composedPath(),i=t.find(r=>r.classList?.contains?.("entity-group"));if(i){const r=Number(i.getAttribute("data-index"));if(Number.isInteger(r)){this._tempEntityIndex=r;return}}this._tempEntityIndex=null;const s=t.find(r=>r.classList?.contains?.("action-group"));if(s){const r=Number(s.getAttribute("data-index"));if(Number.isInteger(r)){this._tempActionIndex=r;return}}this._tempActionIndex=null}shouldUpdate(e){if(e.has("_config")||e.has("_yamlConfig")||e.has("_activeTab")||e.has("_entityEditorIndex")||e.has("_actionEditorIndex")||e.has("_actionMode")||e.has("_templateModes")||e.has("_serviceItems")||e.has("_searchTerm"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;const i=t.selectedLanguage||t.language||t.locale?.language,s=this.hass?.selectedLanguage||this.hass?.language||this.hass?.locale?.language;return i!==s||t.services!==this.hass?.services||t.themes!==this.hass?.themes}return!0}updated(e){if(e.has("hass")){const t=this.hass?.selectedLanguage||this.hass?.language||this.hass?.locale?.language;t&&da(t);const i=e.get("hass");this.hass?.services!==i?.services&&(this._serviceItems=this._getServiceItems()),this._fetchAspectRatios()}(e.has("_searchTerm")||this._searchTerm)&&this._applySearchFilter()}_supportsFeature(e,t){return!e||typeof e.attributes.supported_features!="number"?!1:(e.attributes.supported_features&t)!==0}_isGroupCapable(e){return e?this._supportsFeature(e,fn)?!0:Array.isArray(e.attributes?.group_members):!1}_normalizeArtworkOverrides(e){if(!Array.isArray(e))return[];const t=["media_title","media_artist","media_album_name","media_content_id","media_channel","app_name","media_content_type","entity_id","aspect_ratio"];return e.map(i=>{if(!i||typeof i!="object")return{match_type:"media_title",match_value:"",image_url:"",size_percentage:void 0,object_fit:void 0};const s=i.size_percentage;if(i.missing_art_url!==void 0)return{match_type:"missing_art",match_value:"",image_url:i.missing_art_url??"",size_percentage:s,object_fit:i.object_fit,object_position:i.object_position};if(i.idle_image===!0||i.idle_image_url!==void 0)return{match_type:"idle_image",match_value:"",image_url:i.idle_image_url??i.image_url??"",size_percentage:s,object_fit:i.object_fit,object_position:i.object_position};let r="media_title",n="";for(const o of t){if(i[o]!==void 0){r=o,n=i[o]??"";break}const l=`${o}_equals`;if(i[l]!==void 0){r=o,n=i[l]??"";break}}return{match_type:r,match_value:n??"",image_url:i.image_url??"",size_percentage:s,object_fit:i.object_fit,object_position:i.object_position}})}_serializeArtworkOverride(e){if(!e)return null;const t=(e.image_url??"").trim(),i=e.object_fit==="default"?void 0:e.object_fit;if(e.match_type==="missing_art")return t?{missing_art_url:t,...e.size_percentage!==void 0?{size_percentage:Number(e.size_percentage)}:{},...i!==void 0?{object_fit:i}:{},...e.object_position!==void 0&&e.object_position!=="default"?{object_position:e.object_position}:{}}:null;if(e.match_type==="idle_image")return{idle_image:!0,...t?{idle_image_url:t}:{},...e.size_percentage!==void 0?{size_percentage:Number(e.size_percentage)}:{},...i!==void 0?{object_fit:i}:{},...e.object_position!==void 0&&e.object_position!=="default"?{object_position:e.object_position}:{}};const s=(e.match_value??"").trim();return s?{...t?{image_url:t}:{},[e.match_type]:s,...e.size_percentage!==void 0?{size_percentage:Number(e.size_percentage)}:{},...i!==void 0?{object_fit:i}:{},...e.object_position!==void 0&&e.object_position!=="default"?{object_position:e.object_position}:{}}:null}_writeArtworkOverrides(e){this._artworkOverrides=e;const t=e.map(i=>this._serializeArtworkOverride(i)).filter(i=>i);this._updateConfig("media_artwork_overrides",t.length?t:void 0)}_getServiceItems(){return this.hass?.services?Object.entries(this.hass.services).flatMap(([e,t])=>Object.keys(t).map(i=>({label:`${e}.${i}`,value:`${e}.${i}`}))):[]}_getEntityItems(e=[],t=[]){const i=e.join(","),s=t.join(","),r=this.hass?.states,n=r?Object.keys(r).length:0,o=`${i}|${s}|${n}`;if(this._entityItemsCacheKey===o&&this._cachedEntityItemsFn)return this._cachedEntityItemsFn;const l=()=>this.hass?.states?Object.keys(this.hass.states).filter(c=>{const u=c.split(".")[0];return!(e.length&&!e.includes(u)||t.includes(c))}).map(c=>{const u=this.hass.states[c];return{id:c,primary:je(this.hass,u||c),secondary:c}}):[];return e.length<=1&&t.length===0&&(this._entityItemsCacheKey=o,this._cachedEntityItemsFn=l),l}_entityValueRenderer(e){if(!e)return"";const t=this.hass?.states?.[e];return je(this.hass,t||e)}_entityRowRenderer(e){return g`
      <ha-list-item twoline graphic="icon">
        <ha-state-icon
          slot="graphic"
          .hass=${this.hass}
          .stateObj=${this.hass?.states?.[e.id]}
        ></ha-state-icon>
        <span>${e.primary}</span>
        <span slot="secondary">${e.secondary}</span>
      </ha-list-item>
    `}_getAdaptiveTextTargetsValue(){return Array.isArray(this._config?.adaptive_text_targets)?this._config.adaptive_text_targets.filter(e=>hr.includes(e)):this._config?.adaptive_text===!0?[...hr]:[]}_onAdaptiveTextTargetsChanged(e){const t=Array.isArray(e)?e.filter(i=>hr.includes(i)):[];this._updateConfig("adaptive_text_targets",t)}_looksLikeTemplate(e){if(typeof e!="string")return!1;const t=e.trim();return t.includes("{{")||t.includes("{%")||t.startsWith("[[[")&&t.endsWith("]]]")}_isTemplateValue(e){return this._looksLikeTemplate(e)}_isTemplateMode(e,t){return this._templateModes?.[e]!==void 0?this._templateModes[e]:this._looksLikeTemplate(t)}_toggleTemplateMode(e,t,i){const s=!this._isTemplateMode(e,t);this._templateModes={...this._templateModes,[e]:s},!s&&this._looksLikeTemplate(t)?i(void 0):this.requestUpdate()}_renderTemplateToggle(e,t,i,s=!1){const r=this._isTemplateMode(e,t);return g`
      <ha-icon
        class="icon-button-small icon-button-toggle ${r?"active":""} ${s?"icon-button-disabled":""}"
        icon="mdi:code-braces"
        title="${d("editor.labels.toggle_template_mode")}"
        @click=${()=>{s||this._toggleTemplateMode(e,t,i)}}
      ></ha-icon>
    `}_isEntityId(e){return typeof e=="string"&&/^[a-z_]+\.[a-zA-Z0-9_]+$/.test(e.trim())}_toHexColor(e){if(!e||typeof e!="string")return"#ffffff";const t=e.trim().toLowerCase();if(/^#[0-9a-f]{6}$/.test(t))return t;if(/^#[0-9a-f]{3}$/.test(t))return"#"+t[1]+t[1]+t[2]+t[2]+t[3]+t[3];const i={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#008000",blue:"#0000ff",yellow:"#ffff00",cyan:"#00ffff",magenta:"#ff00ff",orange:"#ffa500",gray:"#808080",grey:"#808080"};if(i[t])return i[t];const s=t.match(/^rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);if(s){const r=Math.min(255,parseInt(s[1],10)).toString(16).padStart(2,"0"),n=Math.min(255,parseInt(s[2],10)).toString(16).padStart(2,"0"),o=Math.min(255,parseInt(s[3],10)).toString(16).padStart(2,"0");return`#${r}${n}${o}`}return"#ffffff"}setConfig(e){this._yamlConfig={...e};const t=(e.entities??[]).map(r=>typeof r=="string"?{entity_id:r}:r),i=e.template||"custom",s=wi[i]||{};this._config={...s,...e,entities:t},this._isInternalUpdate?this._isInternalUpdate=!1:(this._actionEditorIndex=null,this._entityEditorIndex=null),this._artworkOverrides=this._normalizeArtworkOverrides(e.media_artwork_overrides),this._fetchAspectRatios()}_fetchAspectRatios(){if(!this.hass||!this._config||!(this._artworkOverrides||[]).some(t=>t.match_type==="aspect_ratio"))return;let e=[];this._config.entity&&e.push(this._config.entity),this._config.entities&&Array.isArray(this._config.entities)&&(e=[...e,...this._config.entities.map(t=>typeof t=="string"?t:t.entity||t.entity_id)]),e=[...new Set(e)].filter(t=>t),this._entityRatios||(this._entityRatios={}),e.forEach(t=>{if(this._entityRatios[t]!==void 0)return;const i=this.hass.states[t];if(!i)return;const s=i.attributes||{},r=s.entity_picture_local||s.entity_picture||s.album_art;if(!r)return;let n=r.trim();(n.startsWith("'")&&n.endsWith("'")||n.startsWith('"')&&n.endsWith('"'))&&(n=n.slice(1,-1).trim());const o=n.match(/^url\((.*)\)$/i);o&&o[1]&&(n=o[1].trim(),(n.startsWith("'")&&n.endsWith("'")||n.startsWith('"')&&n.endsWith('"'))&&(n=n.slice(1,-1).trim())),this._entityRatios[t]="loading";const l=new window.Image;l.src=n,l.onload=()=>{l.naturalWidth&&l.naturalHeight?(this._entityRatios[t]=(l.naturalWidth/l.naturalHeight).toFixed(2),this.requestUpdate()):this._entityRatios[t]=null},l.onerror=()=>{this._entityRatios[t]=null}})}_formatRatio(e){if(!e||e==="loading")return"";const t=parseFloat(e);return isNaN(t)?` (${e})`:Math.abs(t-1.77)<=.05||Math.abs(t-1.78)<=.05?" (16:9)":Math.abs(t-1.33)<=.05?" (4:3)":Math.abs(t-1)<=.05?" (1:1)":Math.abs(t-2.33)<=.05||Math.abs(t-2.35)<=.05?" (21:9)":` (${e})`}_updateConfig(e,t){if(e==="template"){this._changeTemplate(t);return}const i={...this._yamlConfig,[e]:t};this._yamlConfig=i;const s={...this._config,[e]:t};this._config=s,this._isInternalUpdate=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}_changeTemplate(e){let t={...this._yamlConfig};if(e!=="custom"&&(!t.template||t.template==="custom")&&(this._preTemplateConfig={...t}),e==="custom")this._preTemplateConfig?t={...this._preTemplateConfig,...t,template:"custom"}:t.template="custom";else{const s=wi[e]||{};for(const r of Object.keys(s))delete t[r];t.template=e}this._yamlConfig=t;const i=wi[e]||{};this._config={...i,...t,entities:this._config.entities},this._isInternalUpdate=!0,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}_addArtworkOverride(){const e=[...this._artworkOverrides??[]];e.push({match_type:"media_title",match_value:"",image_url:"",size_percentage:void 0,object_fit:void 0}),this._writeArtworkOverrides(e)}_removeArtworkOverride(e){const t=[...this._artworkOverrides??[]];e<0||e>=t.length||(t.splice(e,1),this._writeArtworkOverrides(t))}_onArtworkMatchTypeChange(e,t){if(!t)return;const i=[...this._artworkOverrides??[]];if(!i[e])return;const s={...i[e],match_type:t};(t==="missing_art"||t==="idle_image")&&(s.match_value=""),i[e]=s,this._writeArtworkOverrides(i)}_setCurrentAspectRatioForMatch(e,t){if(!this._config||!this.hass||(t||(t=this._config.entity||this._config.entities&&(typeof this._config.entities[0]=="string"?this._config.entities[0]:this._config.entities[0]?.entity||this._config.entities[0]?.entity_id)),!t||!this.hass.states[t]))return;const i=this.hass.states[t].attributes||{},s=i.entity_picture_local||i.entity_picture||i.album_art;if(!s)return;let r=s.trim();(r.startsWith("'")&&r.endsWith("'")||r.startsWith('"')&&r.endsWith('"'))&&(r=r.slice(1,-1).trim());const n=r.match(/^url\((.*)\)$/i);n&&n[1]&&(r=n[1].trim(),(r.startsWith("'")&&r.endsWith("'")||r.startsWith('"')&&r.endsWith('"'))&&(r=r.slice(1,-1).trim()));const o=new window.Image;o.src=r,o.onload=()=>{if(o.naturalWidth&&o.naturalHeight){const l=(o.naturalWidth/o.naturalHeight).toFixed(2);this._onArtworkMatchValueChange(e,l)}}}_onArtworkMatchValueChange(e,t){const i=[...this._artworkOverrides||[]];i[e]={...i[e],match_value:t},this._writeArtworkOverrides(i)}_onArtworkImageUrlChange(e,t){const i=[...this._artworkOverrides??[]];i[e]&&(i[e]={...i[e],image_url:t},this._writeArtworkOverrides(i))}_onArtworkSizePercentageChange(e,t){const i=[...this._artworkOverrides??[]];if(i[e]){if(t==="")i[e]={...i[e],size_percentage:void 0};else{const s=Number(t);if(Number.isFinite(s))i[e]={...i[e],size_percentage:s};else return}this._writeArtworkOverrides(i)}}_onArtworkObjectFitChange(e,t){const i=[...this._artworkOverrides??[]];if(!i[e])return;const s=t==="default"?void 0:t;i[e]={...i[e],object_fit:s},this._writeArtworkOverrides(i)}_onArtworkMoved(e){const{oldIndex:t,newIndex:i}=e.detail??{},s=[...this._artworkOverrides??[]];if(t===void 0||i===void 0||t<0||i<0||t>=s.length||i>=s.length)return;const[r]=s.splice(t,1);s.splice(i,0,r),this._writeArtworkOverrides(s)}_updateEntityProperty(e,t){this._updateEntityProperties({[e]:t})}_updateEntityProperties(e){const t=[...this._config.entities??[]],i=this._tempEntityIndex!==null?this._tempEntityIndex:this._entityEditorIndex;if(t[i]){const s=typeof t[i]=="string"?{entity:t[i]}:t[i];t[i]={...s,...e},this._updateConfig("entities",t)}}_updateActionProperty(e,t){this._updateActionProperties({[e]:t})}_updateActionProperties(e){const t=[...this._config.actions??[]],i=this._tempActionIndex!==null?this._tempActionIndex:this._actionEditorIndex;if(t[i]){e.card_trigger&&e.card_trigger!=="none"&&t.forEach((r,n)=>{n!==i&&r.card_trigger===e.card_trigger&&(t[n]={...r,card_trigger:"none"})});const s={...t[i],...e};"in_menu"in e&&delete s.placement,"placement"in e&&delete s.in_menu,t[i]=s,this._updateConfig("actions",t)}}_deriveActionMode(e){if(!e)return"service";if(e.action==="prev_entity")return"prev_entity";if(e.action==="next_entity")return"next_entity";if(e.action==="select_entity")return"select_entity";if(e.action==="sync_selected_entity"||e.sync_entity_helper)return"sync_selected_entity";if(typeof e.menu_item=="string"&&e.menu_item.trim()!=="")return"menu";const t=typeof e.navigation_path=="string"?e.navigation_path.trim():"";return e.action==="navigate"||t?"navigate":e.action==="toggle_lyrics"?"toggle_lyrics":e.action==="remote_control"?"remote_control":e.action==="toggle_media_session"||e.action==="toggle_lock_screen_controls"?"toggle_media_session":"service"}static get styles(){return ze`
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
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
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
          min-width: 0;
          box-sizing: border-box;
        }
        /* wraps the action icon, name textbox and edit button */
        .action-row-inner {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 6px 0px 6px 6px;
          margin: 0px -14px 0px 0px;
          min-width: 0;
          box-sizing: border-box;
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
          max-width: 100%;
          box-sizing: border-box;
        }
        .grow-children > * {
          flex: 1;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
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
        .field-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0px;
          flex-shrink: 0;
          height: 56px;
        }
        .editor-field-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        ha-code-editor {
          display: block;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        .icon-button-small {
          display: inline-flex;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          --mdc-icon-size: 20px;
          width: 28px;
          height: 28px;
          transition: color 0.2s;
        }
        .icon-button-small ha-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }
        .icon-button-small:hover {
          color: var(--primary-color, #2196f3);
        }
        .icon-button-small.active {
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
        .artwork-row {
          margin: 0;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        .artwork-row + .artwork-row {
          border-top: 1px solid var(--yamp-section-divider, rgba(255, 255, 255, 0.06));
        }
        .artwork-row .artwork-fields {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
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
      `}render(){if(!this._config)return g``;if(this.hass){const s=this.hass?.selectedLanguage||this.hass?.language||this.hass?.locale?.language;s&&da(s)}const e=this._yamlConfig.template||"custom",t=this._entityEditorIndex!==null,i=this._actionEditorIndex!==null;return g`
      <div class="config-section" style="margin-top: 0; margin-bottom: 12px;">
        <div
          class="form-row"
          style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;"
        >
          <div>
            <ha-selector
              .hass=${this.hass}
              label=${d("editor.template_label")}
              .selector=${{select:{mode:"dropdown",options:Object.keys(wi).map(s=>({value:s,label:d(`editor.templates.${s}.label`)}))}}}
              .value=${e}
              @value-changed=${s=>this._updateConfig("template",s.detail.value)}
            ></ha-selector>
            <div class="config-subtitle small" style="margin-top: 8px;">
              ${d(`editor.templates.${e}.description`)}
            </div>
          </div>
          <div style="position: relative;">
            <ha-selector
              .required=${!1}
              .hass=${this.hass}
              .selector=${{text:{type:"search"}}}
              .value=${this._searchTerm||""}
              @value-changed=${s=>{this._searchTerm=s.detail.value}}
              label="${d("editor.search_placeholder")||"Search configuration options..."}"
            ></ha-selector>
            ${this._searchTerm?g`
                    <ha-icon
                      icon="mdi:close"
                      @click=${()=>{this._searchTerm=""}}
                      style="position: absolute; right: 12px; top: 28px; transform: translateY(-50%); cursor: pointer; color: var(--secondary-text-color);"
                    ></ha-icon>
                  `:b}
          </div>
        </div>
      </div>
      ${this._searchTerm&&!t&&!i?this._renderActiveTab():g`
              ${this._searchTerm?b:g`
                      <div class="tabs">
                        ${["entities","behavior","look_and_feel","artwork","actions"].map(s=>{const r=d(`editor.tabs.${s}`);return g`
                              <button
                                class="tab"
                                ${this._activeTab===s?"selected":""}
                                @click=${()=>{this._activeTab=s,this._entityEditorIndex=null,this._actionEditorIndex=null,this._useTemplate=null,this._useVolTemplate=null}}
                                ?selected=${this._activeTab===s}
                              >
                                ${r}
                              </button>
                            `})}
                      </div>
                    `}
              <div class="tab-content">
                ${t?this._renderEntityEditor(this._config.entities?.[this._entityEditorIndex]):i?this._renderActionEditor(this._config.actions?.[this._actionEditorIndex]):this._renderActiveTab()}
              </div>
            `}
    `}_renderArtworkTab(){const e=[...this._artworkOverrides??[]],t=[{value:"media_title",label:"Media Title"},{value:"media_artist",label:"Media Artist"},{value:"media_album_name",label:"Album Name"},{value:"media_content_id",label:"Content ID"},{value:"media_channel",label:"Channel"},{value:"app_name",label:"App Name"},{value:"media_content_type",label:"Content Type"},{value:"entity_id",label:"Entity ID"},{value:"aspect_ratio",label:"Aspect Ratio"},{value:"missing_art",label:"Missing Artwork"},{value:"idle_image",label:d("editor.fields.idle_image")||"Idle Image"}];return g`
        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${d("editor.sections.artwork.general.title")}</div>
            <div class="section-description">${d("editor.sections.artwork.general.description")}</div>
          </div>

          <div class="form-row form-row-multi-column">
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                label="${d("editor.fields.artwork_fit")}"
                .selector=${{select:{mode:"dropdown",options:[{value:"cover",label:d("editor.artwork_fit.cover")},{value:"contain",label:d("editor.artwork_fit.contain")},{value:"fill",label:d("editor.artwork_fit.fill")},{value:"scale-down",label:d("editor.artwork_fit.scale-down")},{value:"scaled-contain",label:d("editor.artwork_fit.scaled-contain")},{value:"scaled-contain-alternate",label:d("editor.artwork_fit.scaled-contain-alternate")},{value:"none",label:d("editor.artwork_fit.none")},{value:"no_artwork",label:d("editor.fields.no_artwork_option")}]}}}
                .value=${this._config.artwork_object_fit??"cover"}
                @value-changed=${i=>{const s=i.detail.value;this._updateConfig("artwork_object_fit",s==="cover"?void 0:s)}}
              ></ha-selector>
            </div>
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                label="${d("editor.fields.artwork_position")}"
                .selector=${{select:{mode:"dropdown",options:[{value:"top center",label:(d("editor.artwork_position.top")||"Top")+" (default)"},{value:"center center",label:d("editor.artwork_position.center")||"Center"},{value:"bottom center",label:d("editor.artwork_position.bottom")||"Bottom"}]}}}
                .value=${this._config.artwork_position??"top center"}
                @value-changed=${i=>{const s=i.detail.value;this._updateConfig("artwork_position",s==="top center"?void 0:s)}}
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
                <label for="extend-artwork-toggle" style="font-weight: 500;">${d("editor.subtitles.artwork_extend_label")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${d("editor.subtitles.artwork_extend")}</div>
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
                <label for="blurred-artwork-toggle" style="font-weight: 500;">${d("editor.labels.blurred_artwork")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${d("editor.subtitles.blurred_artwork")}</div>
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
                <label for="hide-collapsed-artwork-toggle" style="font-weight: 500;">${d("editor.labels.hide_collapsed_artwork")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${d("editor.subtitles.hide_collapsed_artwork")}</div>
              </div>
            </div>
          </div>
          <div class="form-row form-row-multi-column">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="disable-artwork-gradient-toggle"
                .checked=${this._config.disable_artwork_gradient===!0}
                @change=${i=>this._updateConfig("disable_artwork_gradient",i.target.checked)}
              ></ha-switch>
              <div style="display: flex; flex-direction: column;">
                <label for="disable-artwork-gradient-toggle" style="font-weight: 500;">${d("editor.labels.disable_artwork_gradient")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${d("editor.subtitles.disable_artwork_gradient")}</div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <ha-selector
              .hass=${this.hass}
              class="full-width"
              label="${d("editor.fields.artwork_hostname")}"
              .selector=${{text:{}}}
              .value=${this._config.artwork_hostname??""}
              @value-changed=${i=>this._updateConfig("artwork_hostname",i.detail.value)}
              helper="e.g. http://192.168.1.50:8123"
            ></ha-selector>
          </div>
        </div>

        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${d("editor.sections.artwork.background.title")}</div>
            <div class="section-description">${d("editor.sections.artwork.background.description")}</div>
          </div>
          ${this._isTemplateMode("background_image",this._config.background_image)?g`
                  <div class="form-row">
                    <div class="editor-field-wrapper">
                      <div class="grow-children" style="flex-direction: column;">
                        <span class="form-label"
                          >${d("editor.fields.background_image_entity")}</span
                        >
                        <ha-code-editor
                          lint
                          .hass=${this.hass}
                          mode="jinja2"
                          autocomplete-entities
                          label="${d("editor.sections.artwork.background.title")}"
                          .value=${this._config.background_image??""}
                          @value-changed=${i=>this._updateConfig("background_image",i.detail.value)}
                        ></ha-code-editor>
                      </div>
                      <div class="field-actions">
                        ${this._renderTemplateToggle("background_image",this._config.background_image,i=>this._updateConfig("background_image",i))}
                      </div>
                    </div>
                  </div>
                `:g`
                  <div class="form-row form-row-multi-column">
                    <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                      <ha-switch
                        id="background-image-url-toggle"
                        .checked=${this._useBackgroundImageUrl??this._looksLikeUrlOrPath(this._config.background_image)}
                        @change=${i=>{this._useBackgroundImageUrl=i.target.checked,this._updateConfig("background_image","")}}
                      ></ha-switch>
                      <label for="background-image-url-toggle"
                        >${d("editor.labels.use_url_path")}</label
                      >
                    </div>
                    <div style="flex: 2; display: flex; align-items: center; gap: 8px;">
                      <div class="editor-field-wrapper">
                        <div class="grow-children">
                          ${this._useBackgroundImageUrl??this._looksLikeUrlOrPath(this._config.background_image)?g`
                                  <ha-selector
                                    .hass=${this.hass}
                                    class="full-width"
                                    .selector=${{text:{}}}
                                    .value=${this._config.background_image??""}
                                    @value-changed=${i=>this._updateConfig("background_image",i.detail.value)}
                                    .label=${d("editor.fields.image_url")}
                                    placeholder="https://... or /local/..."
                                    helper="${d("editor.subtitles.image_url_helper")}"
                                  ></ha-selector>
                                `:g`
                                  <ha-generic-picker
                                    class="full-width"
                                    .hass=${this.hass}
                                    .value=${this._config.background_image??""}
                                    .label=${d("editor.fields.background_image_entity")}
                                    .valueRenderer=${i=>this._entityValueRenderer(i)}
                                    .rowRenderer=${i=>this._entityRowRenderer(i)}
                                    .getItems=${this._getEntityItems(["camera","image"])}
                                    @value-changed=${i=>this._updateConfig("background_image",i.detail.value)}
                                    allow-custom-value
                                  ></ha-generic-picker>
                                `}
                        </div>
                        <div class="field-actions">
                          ${this._renderTemplateToggle("background_image",this._config.background_image,i=>this._updateConfig("background_image",i))}
                        </div>
                      </div>
                    </div>
                  </div>
                `}
          <div class="form-row form-row-multi-column" style="${this._config.background_image?"":"opacity: 0.4; pointer-events: none;"}">
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                label="${d("editor.fields.background_fit")}"
                .disabled=${!this._config.background_image}
                .selector=${{select:{mode:"dropdown",options:[{value:"cover",label:(d("editor.background_fit.cover")||"Cover")+" (default)"},{value:"contain",label:d("editor.background_fit.contain")||"Contain"},{value:"fill",label:d("editor.background_fit.fill")||"Fill"},{value:"scale-down",label:d("editor.background_fit.scale-down")||"Scale Down"},{value:"none",label:d("editor.background_fit.none")||"None"}]}}}
                .value=${this._config.background_fit??"cover"}
                @value-changed=${i=>{const s=i.detail.value;this._updateConfig("background_fit",s==="cover"?void 0:s)}}
              ></ha-selector>
            </div>
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                label="${d("editor.fields.background_position")}"
                .disabled=${!this._config.background_image}
                .selector=${{select:{mode:"dropdown",options:[{value:"center center",label:(d("editor.background_position.center")||"Center")+" (default)"},{value:"top center",label:d("editor.background_position.top")||"Top"},{value:"bottom center",label:d("editor.background_position.bottom")||"Bottom"},{value:"center left",label:d("editor.background_position.center left")||"Center Left"},{value:"center right",label:d("editor.background_position.center right")||"Center Right"},{value:"top left",label:d("editor.background_position.top left")||"Top Left"},{value:"top right",label:d("editor.background_position.top right")||"Top Right"},{value:"bottom left",label:d("editor.background_position.bottom left")||"Bottom Left"},{value:"bottom right",label:d("editor.background_position.bottom right")||"Bottom Right"}]}}}
                .value=${this._config.background_position??"center center"}
                @value-changed=${i=>{const s=i.detail.value;this._updateConfig("background_position",s==="center center"?void 0:s)}}
              ></ha-selector>
            </div>
          </div>


        </div>
        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${d("editor.sections.artwork.idle.title")}</div>
            <div class="section-description">${d("editor.sections.artwork.idle.description")}</div>
          </div>
          ${this._isTemplateMode("idle_image",this._config.idle_image)?g`
                  <div class="form-row">
                    <div class="editor-field-wrapper">
                      <div class="grow-children" style="flex-direction: column;">
                        <span class="form-label"
                          >${d("editor.fields.idle_image_entity")}</span
                        >
                        <ha-code-editor
                          lint
                          .hass=${this.hass}
                          mode="jinja2"
                          autocomplete-entities
                          label="${d("editor.sections.artwork.idle.title")}"
                          .value=${this._config.idle_image??""}
                          @value-changed=${i=>this._updateConfig("idle_image",i.detail.value)}
                        ></ha-code-editor>
                      </div>
                      <div class="field-actions">
                        ${this._renderTemplateToggle("idle_image",this._config.idle_image,i=>this._updateConfig("idle_image",i))}
                      </div>
                    </div>
                  </div>
                `:g`
                  <div class="form-row form-row-multi-column">
                    <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                      <ha-switch
                        id="idle-image-url-toggle"
                        .checked=${this._useIdleImageUrl??this._looksLikeUrlOrPath(this._config.idle_image)}
                        @change=${i=>{this._useIdleImageUrl=i.target.checked,this._updateConfig("idle_image","")}}
                      ></ha-switch>
                      <label for="idle-image-url-toggle"
                        >${d("editor.labels.use_url_path")}</label
                      >
                    </div>
                    <div style="flex: 2; display: flex; align-items: center; gap: 8px;">
                      <div class="editor-field-wrapper">
                        <div class="grow-children">
                          ${this._useIdleImageUrl?g`
                                  <ha-selector
                                    .hass=${this.hass}
                                    class="full-width"
                                    .selector=${{text:{}}}
                                    .value=${this._config.idle_image??""}
                                    @value-changed=${i=>this._updateConfig("idle_image",i.detail.value)}
                                    .label=${d("editor.fields.image_url")}
                                    placeholder="https://... or /local/..."
                                    helper="${d("editor.subtitles.image_url_helper")}"
                                  ></ha-selector>
                                `:g`
                                  <ha-generic-picker
                                    class="full-width"
                                    .hass=${this.hass}
                                    .value=${this._config.idle_image??""}
                                    .label=${d("editor.fields.idle_image_entity")}
                                    .valueRenderer=${i=>this._entityValueRenderer(i)}
                                    .rowRenderer=${i=>this._entityRowRenderer(i)}
                                    .getItems=${this._getEntityItems(["camera","image"])}
                                    @value-changed=${i=>this._updateConfig("idle_image",i.detail.value)}
                                    allow-custom-value
                                  ></ha-generic-picker>
                                `}
                        </div>
                        <div class="field-actions">
                          ${this._renderTemplateToggle("idle_image",this._config.idle_image,i=>this._updateConfig("idle_image",i))}
                        </div>
                      </div>
                    </div>
                  </div>
                `}
          <div class="form-row form-row-multi-column" style="${this._config.idle_image?"":"opacity: 0.4; pointer-events: none;"}">
            <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
              <ha-switch
                id="show-idle-artwork-toggle"
                .checked=${this._config.show_idle_artwork_when_not_playing===!0}
                .disabled=${!this._config.idle_image}
                @change=${i=>this._updateConfig("show_idle_artwork_when_not_playing",i.target.checked)}
              ></ha-switch>
              <div style="display: flex; flex-direction: column;">
                <label for="show-idle-artwork-toggle" style="font-weight: 500;">${d("editor.labels.show_idle_artwork_when_not_playing")}</label>
                <div style="font-size: 0.85em; opacity: 0.7;">${d("editor.subtitles.show_idle_artwork_when_not_playing")}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="config-section">
          <div class="section-header">
            <div class="section-title">${d("editor.sections.artwork.overrides.title")}</div>
            <div class="section-description">${d("editor.sections.artwork.overrides.description")}</div>
          </div>
          <yamp-sortable @item-moved=${i=>this._onArtworkMoved(i)}>
            <div class="sortable-container">
              ${e.length?e.map((i,s)=>g`
                        <div class="action-row-inner sortable-item artwork-row">
                          <div class="handle action-handle">
                            <ha-icon icon="mdi:drag"></ha-icon>
                          </div>
                          <div class="artwork-fields">
                            <ha-selector
                              .hass=${this.hass}
                              class="full-width"
                              label="${d("editor.fields.match_field")}"
                              .required=${!0}
                              .selector=${{select:{mode:"dropdown",options:t}}}
                              .value=${i.match_type??"media_title"}
                              @value-changed=${r=>this._onArtworkMatchTypeChange(s,r.detail.value)}
                            ></ha-selector>
                            ${i.match_type==="missing_art"?g`
                                    <div class="config-subtitle small">
                                      ${d("editor.descriptions.missing_art_match")}
                                    </div>
                                  `:i.match_type==="idle_image"?g`
                                      <div class="config-subtitle small">
                                        ${d("editor.descriptions.idle_image_match")}
                                      </div>
                                    `:i.match_type==="entity_id"?g`
                                        <ha-generic-picker
                                          class="full-width"
                                          .hass=${this.hass}
                                          .value=${i.match_value??""}
                                          .label=${d("editor.fields.match_entity")}
                                          .required=${!0}
                                          .valueRenderer=${r=>this._entityValueRenderer(r)}
                                          .rowRenderer=${r=>this._entityRowRenderer(r)}
                                          .getItems=${this._getEntityItems(["media_player"])}
                                          @value-changed=${r=>this._onArtworkMatchValueChange(s,r.detail.value)}
                                          allow-custom-value
                                        ></ha-generic-picker>
                                      `:i.match_type==="aspect_ratio"?g`
                                          <div
                                            style="display: flex; flex-direction: column; width: 100%;"
                                          >
                                            ${(()=>{const r=[];if(this._config?.entity&&r.push(this._config.entity),this._config?.entities&&Array.isArray(this._config.entities))for(const n of this._config.entities){const o=typeof n=="string"?n:n.entity||n.entity_id;o&&!r.includes(o)&&r.push(o)}return r.length>1?g`
                                                  <select
                                                    style="width: 100%; padding: 8px 16px; border-radius: 4px; border: 1px solid var(--divider-color, #ccc); background: var(--mdc-text-field-fill-color, var(--secondary-background-color, rgba(127,127,127,0.05))); color: var(--primary-text-color, #000); font-family: inherit; font-size: 14px; margin-bottom: 8px; outline: none;"
                                                    @change=${n=>{const o=n.target.value;o&&(this._setCurrentAspectRatioForMatch(s,o),n.target.selectedIndex=0)}}
                                                  >
                                                    <option value="" disabled selected>
                                                      Get current ratio from...
                                                    </option>
                                                    ${r.map(n=>{const o=this.hass.states[n],l=o?.attributes?.entity_picture||o?.attributes?.entity_picture_local||o?.attributes?.album_art,c=je(this.hass,o||n),u=this._entityRatios&&this._entityRatios[n],h=this._formatRatio(u);return g`<option
                                                        value="${n}"
                                                        ?disabled=${!l}
                                                      >
                                                        ${c}${h}
                                                      </option>`})}
                                                  </select>
                                                `:b})()}
                                            <div style="display: flex; width: 100%;">
                                              <ha-selector
                                                .hass=${this.hass}
                                                style="flex: 1;"
                                                .selector=${{text:{}}}
                                                label="${d("editor.fields.match_value")}"
                                                .required=${!0}
                                                .value=${i.match_value??""}
                                                @value-changed=${r=>this._onArtworkMatchValueChange(s,r.detail.value)}
                                              ></ha-selector>
                                              ${(()=>{const r=[];if(this._config?.entity&&r.push(this._config.entity),this._config?.entities&&Array.isArray(this._config.entities))for(const n of this._config.entities){const o=typeof n=="string"?n:n.entity||n.entity_id;o&&!r.includes(o)&&r.push(o)}return r.length<=1?g`
                                                    <ha-icon-button
                                                      style="margin-left: 8px;"
                                                      title="get current"
                                                      @click=${()=>this._setCurrentAspectRatioForMatch(s)}
                                                    >
                                                      <ha-icon icon="mdi:target"></ha-icon>
                                                    </ha-icon-button>
                                                  `:b})()}
                                            </div>
                                          </div>
                                        `:g`
                                          <ha-selector
                                            .hass=${this.hass}
                                            class="full-width"
                                            .selector=${{text:{}}}
                                            label="${d("editor.fields.match_value")}"
                                            .required=${!0}
                                            .value=${i.match_value??""}
                                            @value-changed=${r=>this._onArtworkMatchValueChange(s,r.detail.value)}
                                          ></ha-selector>
                                        `}
                            ${i.match_type==="idle_image"?b:g`
                                    <div class="editor-field-wrapper">
                                      ${this._isTemplateMode(`artwork_image_url_${s}`,i.image_url)?g`
                                              <div
                                                class="grow-children"
                                                style="flex-direction: column;"
                                              >
                                                <span class="form-label"
                                                  >${i.match_type==="missing_art"?d("editor.fields.fallback_image_url"):d("editor.fields.image_url").replaceAll("*","")}</span
                                                >
                                                <ha-code-editor
                                                  lint
                                                  .hass=${this.hass}
                                                  mode="jinja2"
                                                  autocomplete-entities
                                                  label=${i.match_type==="missing_art"?d("editor.fields.fallback_image_url"):d("editor.fields.image_url")}
                                                  .value=${i.image_url??""}
                                                  @value-changed=${r=>this._onArtworkImageUrlChange(s,r.detail.value)}
                                                ></ha-code-editor>
                                              </div>
                                              <div class="field-actions">
                                                ${this._renderTemplateToggle(`artwork_image_url_${s}`,i.image_url,r=>this._onArtworkImageUrlChange(s,r))}
                                              </div>
                                            `:g`
                                              <div class="grow-children">
                                                <ha-selector
                                                  .hass=${this.hass}
                                                  class="full-width"
                                                  .selector=${{text:{}}}
                                                  label=${i.match_type==="missing_art"?d("editor.fields.fallback_image_url"):d("editor.fields.image_url")}
                                                  .required=${!1}
                                                  .value=${i.image_url??""}
                                                  @value-changed=${r=>this._onArtworkImageUrlChange(s,r.detail.value)}
                                                ></ha-selector>
                                              </div>
                                              <div class="field-actions">
                                                ${this._renderTemplateToggle(`artwork_image_url_${s}`,i.image_url,r=>this._onArtworkImageUrlChange(s,r))}
                                              </div>
                                            `}
                                    </div>
                                  `}
                            <div class="form-row-multi-column" style="align-items:flex-start;">
                              <div class="grow-children" style="flex:1; min-width: 100px;">
                                <ha-selector
                                  .hass=${this.hass}
                                  class="full-width"
                                  label="${d("editor.fields.size_percent")}"
                                  .required=${!1}
                                  .selector=${{number:{min:1,max:100,mode:"box"}}}
                                  .value=${i.size_percentage??""}
                                  @value-changed=${r=>this._onArtworkSizePercentageChange(s,r.detail.value)}
                                ></ha-selector>
                              </div>
                              <div class="grow-children" style="flex:1.5; min-width: 120px;">
                                <ha-selector
                                  .hass=${this.hass}
                                  class="full-width"
                                  label="${d("editor.fields.object_fit")}"
                                  .required=${!1}
                                  .selector=${{select:{mode:"dropdown",options:[{value:"default",label:d("editor.artwork_fit.default")},{value:"cover",label:d("editor.artwork_fit.cover")},{value:"contain",label:d("editor.artwork_fit.contain")},{value:"fill",label:d("editor.artwork_fit.fill")},{value:"scale-down",label:d("editor.artwork_fit.scale-down")},{value:"scaled-contain",label:d("editor.artwork_fit.scaled-contain")},{value:"scaled-contain-alternate",label:d("editor.artwork_fit.scaled-contain-alternate")},{value:"none",label:d("editor.artwork_fit.none")},{value:"no_artwork",label:d("editor.fields.no_artwork_option")}]}}}
                                  .value=${i.object_fit||"default"}
                                  @value-changed=${r=>this._onArtworkObjectFitChange(s,r.detail.value)}
                                ></ha-selector>
                              </div>
                              <div class="grow-children" style="flex:1.5; min-width: 120px;">
                                <ha-selector
                                  .hass=${this.hass}
                                  class="full-width"
                                  label="${d("editor.fields.artwork_position")}"
                                  .required=${!1}
                                  .selector=${{select:{mode:"dropdown",options:[{value:"default",label:d("editor.artwork_position.default")||"Global"},{value:"top center",label:d("editor.artwork_position.top")||"Top"},{value:"center center",label:d("editor.artwork_position.center")||"Center"},{value:"bottom center",label:d("editor.artwork_position.bottom")||"Bottom"}]}}}
                                  .value=${i.object_position||"default"}
                                  @value-changed=${r=>{const n=[...this._artworkOverrides];n[s]={...n[s],object_position:r.detail.value},this._writeArtworkOverrides(n)}}
                                ></ha-selector>
                              </div>
                            </div>
                          </div>
                          <div class="action-row-actions">
                            <ha-icon
                              class="icon-button"
                              icon="mdi:trash-can"
                              title="Delete Override"
                              @click=${()=>this._removeArtworkOverride(s)}
                            ></ha-icon>
                          </div>
                        </div>
                      `):g`<div class="config-subtitle" style="padding:12px 0;text-align:center;">
                      ${d("editor.subtitles.no_artwork_overrides")}
                    </div>`}
            </div>
          </yamp-sortable>
          <div class="add-action-button-wrapper">
            <ha-icon
              class="icon-button"
              icon="mdi:plus"
              title="${d("editor.titles.add_artwork_override")}"
              @click=${this._addArtworkOverride}
            ></ha-icon>
          </div>
        </div>
        </div>

      `}_applySearchFilter(){if(!this.shadowRoot)return;const e=(this._searchTerm||"").toLowerCase().trim().replace(/[_ ]/g,""),t=this.shadowRoot.querySelector(".search-results, .tab-content");if(!t)return;const i=this._entityEditorIndex!==null||this._actionEditorIndex!==null,s=["name","hidden controls","music assistant entity","ma entity","ma template","hidden search filter chips","hidden chips","prefer music assistant metadata","prefer ma metadata","disable auto select","group volume","volume entity follows active entity","volume entity","sync power"],r=["name","icon","in menu","card trigger","action type","menu item","navigation path","navigation new tab","sync entity helper","sync entity type","service","script variable"],n=o=>{let l=o.textContent.toLowerCase();if(!i){if(o.classList.contains("entity-row-inner")){if(s.some(h=>h.replace(/[_ ]/g,"").includes(e)))return o.style.display="",!0}else if(o.classList.contains("action-row-inner")&&r.some(h=>h.replace(/[_ ]/g,"").includes(e)))return o.style.display="",!0}const c=o.getAttribute("data-search-keys");c&&(l+=" "+c.toLowerCase().replace(/_/g," ")),o.querySelectorAll("ha-selector").forEach(h=>{const p=h.selector?.select?.options;Array.isArray(p)&&p.length<=15&&p.forEach(_=>{_.label&&(l+=" "+String(_.label).toLowerCase()),_.value&&(l+=" "+String(_.value).toLowerCase())})}),o.querySelectorAll("[label]").forEach(h=>{const p=h.getAttribute("label");p&&(l+=" "+String(p).toLowerCase())});const u=l.replace(/[_ ]/g,"").includes(e);return o.style.display=u?"":"none",u};i?t.querySelectorAll(".form-row, .artwork-row, .entity-row-inner, .action-row-inner").forEach(n):t.querySelectorAll(".config-section, .entity-group, .action-group").forEach(o=>{let l=!1;o.querySelectorAll(".form-row, .artwork-row, .entity-row-inner, .action-row-inner").forEach(c=>{n(c)&&(l=!0)}),o.style.display=l?"":"none"})}_renderActiveTab(){if(this._searchTerm){const e=this._config?.entities??[],t=this._config?.actions??[];return g`
        <div class="search-results is-searching" style="padding-top: 4px;">
          ${this._renderBehaviorTab()} ${this._renderVisualTab()} ${this._renderArtworkTab()}
          ${e.map((i,s)=>g`
              <div class="entity-group" data-index="${s}">
                ${this._renderEntityEditor(i,s,!0)}
              </div>
            `)}
          ${t.map((i,s)=>g`
              <div class="action-group config-section" data-index="${s}">
                ${this._renderActionEditor(i,s,!0)}
              </div>
            `)}
        </div>
      `}switch(this._activeTab){case"entities":return this._renderEntitiesTab();case"behavior":return this._renderBehaviorTab();case"look_and_feel":return this._renderVisualTab();case"artwork":return this._renderArtworkTab();case"actions":return this._renderActionsTab();default:return this._renderEntitiesTab()}}_renderEntitiesTab(){if(!this._config)return g``;const e=i=>typeof i=="string"?i:i?.entity||i?.entity_id||"";let t=[...this._config.entities??[]];return(t.length===0||e(t[t.length-1]))&&t.push({entity:""}),g`
      <div class="entity-group">
        <div class="entity-group-header section-header">
          <div class="entity-group-title section-title">
            ${d("editor.sections.entities.title")}
          </div>
          <div class="section-description">${d("editor.sections.entities.description")}</div>
        </div>
        <div class="form-row">
          <yamp-sortable @item-moved=${i=>this._onEntityMoved(i)}>
            <div class="sortable-container">
              ${t.map((i,s)=>g`
                  <div
                    class="entity-row-inner ${s<t.length-1?"sortable-item":""}"
                    data-index="${s}"
                  >
                    <div class="handle ${s===t.length-1?"handle-disabled":""}">
                      <ha-icon icon="mdi:drag"></ha-icon>
                    </div>
                    <div class="grow-children">
                      <ha-generic-picker
                        class="full-width"
                        style="display: block; width: 100%;"
                        .hass=${this.hass}
                        .value=${e(i)}
                        .label=${d("common.media_player")}
                        .valueRenderer=${r=>this._entityValueRenderer(r)}
                        .rowRenderer=${r=>this._entityRowRenderer(r)}
                        .getItems=${this._getEntityItems(["media_player"],s===t.length-1&&!e(i)?this._config.entities?.map(e)??[]:[])}
                        @value-changed=${r=>this._onEntityChanged(s,r.detail.value)}
                        allow-custom-value
                      ></ha-generic-picker>
                    </div>
                    <div class="entity-row-actions">
                      <ha-icon
                        class="icon-button ${e(i)?"":"icon-button-disabled"}"
                        icon="mdi:pencil"
                        title="${d("common.edit_entity")}"
                        @click=${()=>this._onEditEntity(s)}
                      ></ha-icon>
                    </div>
                  </div>
                `)}
            </div>
          </yamp-sortable>
        </div>
      </div>
    `}_renderBehaviorTab(){return g`
      <div class="config-section">
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:d("editor.card_type_options.default")},{value:"search",label:d("editor.card_type_options.search")},{value:"group_players",label:d("editor.card_type_options.group_players")},{value:"up_next",label:d("editor.card_type_options.up_next")},{value:"remote_control",label:d("editor.card_type_options.remote_control")}]}}}
            .value=${this._config.card_type??"default"}
            label="${d("editor.fields.card_type")}"
            @value-changed=${e=>this._updateConfig("card_type",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${d("editor.subtitles.card_type")}</div>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">${d("editor.sections.behavior.idle_chips.title")}</div>
          <div class="section-description">
            ${d("editor.sections.behavior.idle_chips.description")}
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:0,step:1e3,unit_of_measurement:"ms",mode:"box"}}}
              .value=${this._config.idle_timeout_ms??6e4}
              label="${d("editor.fields.idle_timeout")}"
              @value-changed=${e=>this._updateConfig("idle_timeout_ms",e.detail.value)}
            ></ha-selector>
            <div class="config-subtitle">${d("editor.subtitles.idle_timeout")}</div>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${d("common.reset_default")}"
            @click=${()=>this._updateConfig("idle_timeout_ms",6e4)}
          ></ha-icon>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"auto",label:"Auto"},{value:"always",label:"Always"},{value:"in_menu",label:"In Menu"},{value:"in_menu_on_idle",label:"In Menu on Idle"}]}}}
            .value=${this._config.show_chip_row??"auto"}
            label="${d("editor.fields.show_chip_row")}"
            @value-changed=${e=>this._updateConfig("show_chip_row",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${d("editor.subtitles.show_chip_row")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="dim-chips-on-idle-toggle"
              .checked=${this._config.dim_chips_on_idle??!0}
              @change=${e=>this._updateConfig("dim_chips_on_idle",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.dim_chips")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.dim_chips")}</div>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${d("editor.sections.behavior.interactions_search.title")}
          </div>
          <div class="section-description">
            ${d("editor.sections.behavior.interactions_search.description")}
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
              >${d("editor.labels.always_show_group")}</label
            >
          </div>
          <div class="config-subtitle">${d("editor.subtitles.always_show_group")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="hold-to-pin-toggle"
              .checked=${this._config.hold_to_pin??!1}
              @change=${e=>this._updateConfig("hold_to_pin",e.target.checked)}
            ></ha-switch>
            <label for="hold-to-pin-toggle">${d("editor.labels.hold_to_pin")}</label>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.hold_to_pin")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="show-volume-overlay-toggle"
              .checked=${this._config.show_volume_overlay??!1}
              @change=${e=>this._updateConfig("show_volume_overlay",e.target.checked)}
            ></ha-switch>
            <label for="show-volume-overlay-toggle"
              >${d("editor.labels.show_volume_overlay")}</label
            >
          </div>
          <div class="config-subtitle">${d("editor.subtitles.show_volume_overlay")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              .checked=${this._config.disable_autofocus??!1}
              @change=${e=>this._updateConfig("disable_autofocus",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.disable_autofocus")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.disable_autofocus")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="default-search-favorites-toggle"
              .checked=${this._config.default_search_favorites??!1}
              @change=${e=>this._updateConfig("default_search_favorites",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.default_search_favorites")}</span>
          </div>
          <div class="config-subtitle">
            ${d("editor.subtitles.default_search_favorites")}
          </div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              .checked=${this._config.keep_filters_on_search??!1}
              @change=${e=>this._updateConfig("keep_filters_on_search",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.keep_filters")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.search_within_filter")}</div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="dismiss-search-on-play-toggle"
              .checked=${this._config.dismiss_search_on_play??!0}
              @change=${e=>this._updateConfig("dismiss_search_on_play",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.dismiss_on_play")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.close_search_on_play")}</div>
        </div>

        <div
          data-search-keys="always_collapsed expand_on_search pin_search_headers"
          class="form-row form-row-multi-column"
        >
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
            <span>${d("editor.labels.pin_headers")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.pin_search_headers")}</div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="hide-search-headers-on-idle-toggle"
              .checked=${this._config.hide_search_headers_on_idle??!1}
              @change=${e=>this._updateConfig("hide_search_headers_on_idle",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.hide_search_headers_on_idle")}</span>
          </div>
          <div class="config-subtitle">
            ${d("editor.subtitles.hide_search_headers_on_idle")}
          </div>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="disable-mass-queue-toggle"
              .checked=${this._config.disable_mass_queue??!1}
              @change=${e=>this._updateConfig("disable_mass_queue",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.disable_mass")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.disable_mass")}</div>
        </div>
        <div data-search-keys="hide_reorder_progress" class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="hide-reorder-progress-toggle"
              .checked=${this._config.hide_reorder_progress??!1}
              @change=${e=>this._updateConfig("hide_reorder_progress",e.target.checked)}
            ></ha-switch>
            <label for="hide-reorder-progress-toggle"
              >${d("editor.labels.hide_reorder_progress_toggle")}</label
            >
          </div>
          <div class="config-subtitle">${d("editor.subtitles.hide_reorder_progress")}</div>
        </div>

        <div data-search-keys="search_results_limit" class="form-row form-row-multi-column">
          <div class="grow-children number-input-with-note">
            <ha-selector
              .selector=${{number:{min:0,max:1e3,step:1,mode:"box"}}}
              .value=${this._config.search_results_limit??20}
              label="${d("editor.fields.search_limit")}"
              helper="${d("editor.subtitles.search_limit_full")}"
              @value-changed=${e=>this._updateConfig("search_results_limit",e.detail.value)}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            id="search-limit-reset"
            icon="mdi:restore"
            title="${d("common.reset_default")}"
            @click=${()=>this._updateConfig("search_results_limit",20)}
          ></ha-icon>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"all",label:d("search.filters.all")},{value:"artist",label:d("search.filters.artist")},{value:"album",label:d("search.filters.album")},{value:"track",label:d("search.filters.track")},{value:"playlist",label:d("search.filters.playlist")},{value:"radio",label:d("search.filters.radio")},{value:"podcast",label:d("search.filters.podcast")},{value:"audiobook",label:d("search.filters.audiobook")}]}}}
            .value=${this._config.default_search_filter??"all"}
            label="${d("editor.labels.default_search_filter")}"
            helper="${d("editor.subtitles.default_search_filter_full")}"
            @value-changed=${e=>this._updateConfig("default_search_filter",e.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:"Default"},{value:"name",label:"Name (A\u2192Z)"},{value:"name_desc",label:"Name (Z\u2192A)"},{value:"sort_name",label:"Sort Name (A\u2192Z)"},{value:"sort_name_desc",label:"Sort Name (Z\u2192A)"},{value:"timestamp_added",label:"Date Added (Oldest)"},{value:"timestamp_added_desc",label:"Date Added (Newest)"},{value:"last_played",label:"Last Played (Oldest)"},{value:"last_played_desc",label:"Last Played (Recent)"},{value:"play_count",label:"Play Count (Low\u2192High)"},{value:"play_count_desc",label:"Play Count (High\u2192Low)"},{value:"year",label:"Year (Oldest)"},{value:"year_desc",label:"Year (Newest)"},{value:"position",label:"Position (Asc)"},{value:"position_desc",label:"Position (Desc)"},{value:"artist_name",label:"Artist (A\u2192Z)"},{value:"artist_name_desc",label:"Artist (Z\u2192A)"},{value:"random",label:"Random"},{value:"random_play_count",label:"Random + Least Played"}]}}}
            .value=${this._config.search_results_sort??"default"}
            label="${d("editor.fields.result_sorting")}"
            helper="${d("editor.subtitles.result_sorting_full")}"
            @value-changed=${e=>this._updateConfig("search_results_sort",e.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">${d("editor.sections.behavior.lyrics.title")}</div>
          <div class="section-description">
            ${d("editor.sections.behavior.lyrics.description")}
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
              >${d("editor.labels.always_show_lyrics")}</label
            >
          </div>
          <div class="config-subtitle">${d("editor.subtitles.always_show_lyrics")}</div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:d("lyrics_modes.default")},{value:"scroll",label:d("lyrics_modes.scroll")},{value:"text",label:d("lyrics_modes.text")}]}}}
            .value=${this._config.lyrics_mode??"default"}
            label="${d("editor.labels.lyrics_mode")}"
            @value-changed=${e=>this._updateConfig("lyrics_mode",e.detail.value)}
          ></ha-selector>
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"mass_lrclib",label:d("lyrics_sources.mass_lrclib")},{value:"mass",label:d("lyrics_sources.mass")},{value:"lrclib",label:d("lyrics_sources.lrclib")},{value:"lrclib_mass",label:d("lyrics_sources.lrclib_mass")}]}}}
            .value=${this._config.lyrics_source??"mass_lrclib"}
            label="${d("editor.labels.lyrics_source")}"
            @value-changed=${e=>this._updateConfig("lyrics_source",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${d("editor.subtitles.lyrics_source")}</div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:-5,max:5,step:.1,unit_of_measurement:"s",mode:"box"}}}
              .value=${this._config.lyrics_pre_roll??0}
              label="${d("editor.labels.lyrics_pre_roll")}"
              helper="${d("editor.subtitles.lyrics_pre_roll")}"
              @value-changed=${e=>this._updateConfig("lyrics_pre_roll",e.detail.value)}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${d("common.reset_default")}"
            @click=${()=>this._updateConfig("lyrics_pre_roll",0)}
          ></ha-icon>
        </div>
      </div>
    `}_renderVisualTab(){return g`
      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${d("editor.sections.look_and_feel.theme_layout.title")}
          </div>
          <div class="section-description">
            ${d("editor.sections.look_and_feel.theme_layout.description")}
          </div>
        </div>

        <div
          data-search-keys="match_theme alternate_progress_bar"
          class="form-row form-row-multi-column"
        >
          <div>
            <ha-switch
              id="match-theme-toggle"
              .checked=${this._config.match_theme??!1}
              @change=${e=>this._updateConfig("match_theme",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.match_theme")}</span>
          </div>
          <div>
            <ha-switch
              id="alternate-progress-bar-toggle"
              .checked=${this._config.alternate_progress_bar??!1}
              @change=${e=>this._updateConfig("alternate_progress_bar",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.alt_progress")}</span>
          </div>
        </div>
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              .selector=${{number:{min:2,max:48,step:2,unit_of_measurement:"px",mode:"box"}}}
              .value=${this._config.progress_bar_height??6}
              label="${d("editor.labels.progress_bar_height")}"
              @value-changed=${e=>this._updateConfig("progress_bar_height",e.detail.value)}
            ></ha-selector>
          </div>
          <ha-icon
            class="icon-button"
            icon="mdi:restore"
            title="${d("common.reset_default")}"
            @click=${()=>this._updateConfig("progress_bar_height",6)}
          ></ha-icon>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"automatic",label:d("editor.appearance_options.automatic")},{value:"light",label:d("editor.appearance_options.light")},{value:"dark",label:d("editor.appearance_options.dark")}]}}}
            .value=${this._config.appearance??"automatic"}
            label="${d("editor.fields.appearance")}"
            @value-changed=${e=>this._updateConfig("appearance",e.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row" data-search-keys="font_color font color appearance text_color">
          <div class="editor-field-wrapper">
            ${this._isTemplateMode("font_color",this._config.font_color)?g`
                    <div class="grow-children" style="flex-direction: column;">
                      <span class="form-label">${d("editor.fields.font_color_entity")}</span>
                      <ha-code-editor
                        lint
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        label="${d("editor.fields.font_color")}"
                        .value=${this._config.font_color??""}
                        @value-changed=${e=>this._updateConfig("font_color",e.detail.value)}
                      ></ha-code-editor>
                    </div>
                  `:g`
                    <div
                      class="grow-children"
                      style="display: flex; align-items: flex-start; gap: 12px;"
                    >
                      <div
                        style="position: relative; width: 36px; height: 36px; border-radius: 50%; overflow: hidden; border: 2px solid var(--divider-color, rgba(255,255,255,0.2)); flex: 0 0 36px; cursor: pointer; margin-top: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.2);"
                        title="${d("editor.fields.font_color")}"
                      >
                        <input
                          type="color"
                          .value=${this._toHexColor(this._config.font_color)}
                          @input=${e=>this._updateConfig("font_color",e.target.value)}
                          style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; cursor: pointer; border: none; padding: 0; background: transparent;"
                        />
                      </div>
                      <ha-selector
                        .hass=${this.hass}
                        class="full-width"
                        style="flex: 1;"
                        .selector=${{text:{}}}
                        .value=${this._config.font_color??""}
                        label="${d("editor.fields.font_color")}"
                        helper="${d("editor.subtitles.font_color_helper")||"e.g., #ffffff, rgba(255, 255, 255, 0.9), white"}"
                        @value-changed=${e=>this._updateConfig("font_color",e.detail.value)}
                      ></ha-selector>
                    </div>
                  `}
            <div class="field-actions">
              ${this._renderTemplateToggle("font_color",this._config.font_color,e=>this._updateConfig("font_color",e))}
              <ha-icon
                class="icon-button-small ${this._config.font_color?"":"icon-button-disabled"}"
                icon="mdi:restore"
                title="${d("common.reset_default")}"
                @click=${()=>this._updateConfig("font_color",void 0)}
              ></ha-icon>
            </div>
          </div>
        </div>

        <div
          data-search-keys="alternate_progress_bar always_collapsed display_timestamps"
          class="form-row form-row-multi-column"
        >
          <div
            title=${this._config.alternate_progress_bar||!this._isTemplateValue(this._config.always_collapsed)&&this._config.always_collapsed?d("editor.subtitles.not_available_alt_collapsed"):""}
          >
            <ha-switch
              id="display-timestamps-toggle"
              .checked=${this._config.display_timestamps??!1}
              @change=${e=>this._updateConfig("display_timestamps",e.target.checked)}
              .disabled=${this._config.alternate_progress_bar||!this._isTemplateValue(this._config.always_collapsed)&&this._config.always_collapsed}
            ></ha-switch>
            <span>${d("editor.labels.display_timestamps")}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="editor-field-wrapper">
            ${this._isTemplateMode("card_height",this._config.card_height)?g`
                    <div class="grow-children" style="flex-direction: column;">
                      <span class="form-label">${d("editor.fields.card_height")}</span>
                      <ha-code-editor
                        lint
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        label="${d("editor.fields.card_height")}"
                        .value=${this._config.card_height!==void 0&&this._config.card_height!==null?String(this._config.card_height):""}
                        @value-changed=${e=>this._updateConfig("card_height",e.detail.value)}
                      ></ha-code-editor>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("card_height",this._config.card_height,e=>this._updateConfig("card_height",e))}
                      <ha-icon
                        class="icon-button-small"
                        icon="mdi:restore"
                        title="${d("common.reset_default")}"
                        @click=${()=>this._updateConfig("card_height",void 0)}
                      ></ha-icon>
                    </div>
                  `:g`
                    <div class="grow-children">
                      <ha-selector
                        .hass=${this.hass}
                        class="full-width"
                        .selector=${{number:{min:0,max:2e3,mode:"box"}}}
                        label="${d("editor.fields.card_height")}"
                        .value=${this._config.card_height??""}
                        helper="${d("editor.subtitles.card_height_full")}"
                        @value-changed=${e=>{const t=e.detail.value;if(t===""||t===void 0){this._updateConfig("card_height",void 0);return}const i=Number(t);this._updateConfig("card_height",Number.isFinite(i)&&i>0?i:void 0)}}
                      ></ha-selector>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("card_height",this._config.card_height,e=>this._updateConfig("card_height",e))}
                      <ha-icon
                        class="icon-button-small"
                        icon="mdi:restore"
                        title="${d("common.reset_default")}"
                        @click=${()=>this._updateConfig("card_height",void 0)}
                      ></ha-icon>
                    </div>
                  `}
          </div>
        </div>
        <div
          class="form-row"
          data-search-keys="lyrics_background_fade lyrics background fade overlay"
          style="${!this._isTemplateValue(this._config.always_collapsed)&&this._config.always_collapsed===!0?"opacity: 0.5;":""}"
          title="${!this._isTemplateValue(this._config.always_collapsed)&&this._config.always_collapsed===!0?d("editor.subtitles.not_available_collapsed"):""}"
        >
          ${this._isTemplateMode("lyrics_background_fade",this._config.lyrics_background_fade)?g`
                  <div class="editor-field-wrapper">
                    <div class="grow-children" style="flex-direction: column;">
                      <span class="form-label"
                        >${d("editor.labels.lyrics_background_fade")}</span
                      >
                      <ha-code-editor
                        lint
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        label="${d("editor.labels.lyrics_background_fade")}"
                        .value=${this._config.lyrics_background_fade!==void 0&&this._config.lyrics_background_fade!==null?String(this._config.lyrics_background_fade):""}
                        @value-changed=${e=>this._updateConfig("lyrics_background_fade",e.detail.value)}
                      ></ha-code-editor>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("lyrics_background_fade",this._config.lyrics_background_fade,e=>this._updateConfig("lyrics_background_fade",e))}
                      <ha-icon
                        class="icon-button-small"
                        icon="mdi:restore"
                        title="${d("common.reset_default")}"
                        @click=${()=>this._updateConfig("lyrics_background_fade",et)}
                      ></ha-icon>
                    </div>
                  </div>
                `:g`
                  <span class="form-label"
                    >${d("editor.labels.lyrics_background_fade")}</span
                  >
                  <div class="editor-field-wrapper">
                    <div class="grow-children">
                      <ha-selector
                        .hass=${this.hass}
                        class="full-width"
                        .selector=${$_}
                        helper="${d("editor.subtitles.lyrics_background_fade")}"
                        .value=${this._config.lyrics_background_fade??et}
                        .disabled=${!this._isTemplateValue(this._config.always_collapsed)&&this._config.always_collapsed===!0}
                        @value-changed=${e=>{const t=e.detail.value;if(t===""||t===void 0){this._updateConfig("lyrics_background_fade",et);return}const i=Number(t);this._updateConfig("lyrics_background_fade",Number.isFinite(i)?i:et)}}
                      ></ha-selector>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("lyrics_background_fade",this._config.lyrics_background_fade,e=>this._updateConfig("lyrics_background_fade",e))}
                      <ha-icon
                        class="icon-button-small"
                        icon="mdi:restore"
                        title="${d("common.reset_default")}"
                        @click=${()=>this._updateConfig("lyrics_background_fade",et)}
                      ></ha-icon>
                    </div>
                  </div>
                `}
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"list",label:d("editor.search_view_options.list")},{value:"card",label:d("editor.search_view_options.card")},{value:"card_minimal",label:d("editor.search_view_options.card_minimal")}]}}}
            .value=${this._config.search_view??"list"}
            label="${d("editor.fields.search_view")}"
            helper="${d("editor.subtitles.search_view")}"
            @value-changed=${e=>this._updateConfig("search_view",e.detail.value)}
          ></ha-selector>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{number:{min:1,max:12,step:1,mode:"box"}}}
            .value=${this._config.search_card_columns??4}
            .disabled=${this._config.search_view!=="card"&&this._config.search_view!=="card_minimal"}
            label="${d("editor.fields.search_card_columns")}"
            helper="${d("editor.subtitles.search_card_columns")}"
            @value-changed=${e=>this._updateConfig("search_card_columns",e.detail.value)}
          ></ha-selector>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"drag_handle",label:d("editor.queue_controls_style_options.drag_handle")},{value:"icons",label:d("editor.queue_controls_style_options.icons")}]}}}
            .value=${this._config.queue_controls_style??"drag_handle"}
            label="${d("editor.fields.queue_controls_style")}"
            helper="${d("editor.subtitles.queue_controls_style")}"
            @value-changed=${e=>this._updateConfig("queue_controls_style",e.detail.value)}
          ></ha-selector>
        </div>
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${d("editor.sections.look_and_feel.controls_typography.title")}
          </div>
          <div class="section-description">
            ${d("editor.sections.look_and_feel.controls_typography.description")}
          </div>
        </div>
        <div class="form-row" data-search-keys="control_layout classic modern">
          <div class="editor-field-wrapper">
            ${this._isTemplateMode("control_layout",this._config.control_layout)?g`
                    <div class="grow-children" style="flex-direction: column;">
                      <span class="form-label">${d("editor.fields.control_layout")}</span>
                      <ha-code-editor
                        lint
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        label="${d("editor.fields.control_layout")}"
                        .value=${this._config.control_layout??""}
                        @value-changed=${e=>this._updateConfig("control_layout",e.detail.value)}
                      ></ha-code-editor>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("control_layout",this._config.control_layout,e=>this._updateConfig("control_layout",e))}
                    </div>
                  `:g`
                    <div class="grow-children">
                      <ha-selector
                        .hass=${this.hass}
                        class="full-width"
                        .selector=${{select:{mode:"dropdown",options:[{value:"classic",label:"Classic"},{value:"modern",label:"Modern"}]}}}
                        .value=${this._config.control_layout??"classic"}
                        label="${d("editor.fields.control_layout")}"
                        helper="${d("editor.subtitles.control_layout_full")}"
                        @value-changed=${e=>this._updateConfig("control_layout",e.detail.value)}
                      ></ha-selector>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("control_layout",this._config.control_layout,e=>this._updateConfig("control_layout",e))}
                    </div>
                  `}
          </div>
        </div>
        <div
          class="form-row"
          style="${this._isTemplateValue(this._config.control_layout)||(this._config.control_layout??"classic")==="modern"?"":"opacity: 0.5;"}"
          title="${this._isTemplateValue(this._config.control_layout)||(this._config.control_layout??"classic")==="modern"?"":d("editor.subtitles.only_available_modern")}"
          }
        >
          <div>
            <ha-switch
              .checked=${this._config.swap_pause_for_stop??!1}
              @change=${e=>this._updateConfig("swap_pause_for_stop",e.target.checked)}
              .disabled=${!this._isTemplateValue(this._config.control_layout)&&(this._config.control_layout??"classic")!=="modern"}
            ></ha-switch>
            <span>${d("editor.labels.swap_pause_stop")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.swap_pause_stop")}</div>
        </div>
        <div class="form-row">
          <div>
            <ha-switch
              id="adaptive-controls-toggle"
              .checked=${this._config.adaptive_controls??!1}
              @change=${e=>this._updateConfig("adaptive_controls",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.adaptive_controls")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.adaptive_controls")}</div>
        </div>
        <div class="form-row">
          <div>
            <ha-switch
              id="show-album-toggle"
              .checked=${this._config.show_album??!0}
              @change=${e=>this._updateConfig("show_album",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.show_album")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.show_album")}</div>
        </div>
        ${this._isTemplateMode("lock_screen_controls",this._config.lock_screen_controls)?g`
                <div
                  class="form-row"
                  data-search-keys="lock_screen_controls media_session lock screen ios controls experimental"
                >
                  <div class="editor-field-wrapper">
                    <div class="grow-children" style="flex-direction: column;">
                      <span class="form-label"
                        >${d("editor.labels.lock_screen_controls")}</span
                      >
                      <ha-code-editor
                        lint
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        label="${d("editor.labels.lock_screen_controls")}"
                        .value=${typeof this._config.lock_screen_controls=="string"?this._config.lock_screen_controls:""}
                        @value-changed=${e=>this._updateConfig("lock_screen_controls",e.detail.value)}
                      ></ha-code-editor>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("lock_screen_controls",this._config.lock_screen_controls,e=>this._updateConfig("lock_screen_controls",e))}
                    </div>
                  </div>
                  <div class="config-subtitle">
                    ${d("editor.subtitles.lock_screen_controls")}
                  </div>
                </div>
              `:g`
                <div
                  class="form-row"
                  data-search-keys="lock_screen_controls media_session lock screen ios controls experimental"
                >
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <ha-switch
                      id="lock-screen-controls-toggle"
                      .checked=${this._config.lock_screen_controls===!0}
                      @change=${e=>this._updateConfig("lock_screen_controls",e.target.checked)}
                    ></ha-switch>
                    <span>${d("editor.labels.lock_screen_controls")}</span>
                    ${this._renderTemplateToggle("lock_screen_controls",this._config.lock_screen_controls,e=>this._updateConfig("lock_screen_controls",e))}
                  </div>
                  <div class="config-subtitle">
                    ${d("editor.subtitles.lock_screen_controls")}
                  </div>
                </div>
              `}
        <div class="form-row">
          <div>
            <ha-switch
              id="hide-active-entity-label-toggle"
              .checked=${this._config.hide_active_entity_label??!1}
              @change=${e=>this._updateConfig("hide_active_entity_label",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.hide_active_entity")}</span>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.hide_menu_player")}</div>
        </div>
        <div class="form-row">
          <div>
            <ha-switch
              id="hide-active-entity-label-on-idle-toggle"
              .checked=${this._config.hide_active_entity_label_on_idle??!1}
              @change=${e=>this._updateConfig("hide_active_entity_label_on_idle",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.hide_active_entity_on_idle")}</span>
          </div>
          <div class="config-subtitle">
            ${d("editor.subtitles.hide_active_entity_on_idle")}
          </div>
        </div>
        <div class="form-row">
          <div class="full-width">
            <span class="form-label">${d("editor.labels.adaptive_text_elements")}</span>
            <div class="config-subtitle">${d("editor.subtitles.adaptive_text")}</div>
            <ha-selector
              .hass=${this.hass}
              .selector=${{select:{multiple:!0,options:A_()}}}
              .value=${this._getAdaptiveTextTargetsValue()}
              @value-changed=${e=>this._onAdaptiveTextTargetsChanged(e.detail.value)}
            ></ha-selector>
          </div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"},{value:"none",label:"None"}]}}}
            .value=${this._config.details_alignment??"left"}
            label="${d("editor.fields.details_alignment")}"
            @value-changed=${e=>this._updateConfig("details_alignment",e.detail.value)}
          ></ha-selector>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${al}
            .value=${this._config.volume_mode??"slider"}
            label="${d("editor.fields.volume_mode")}"
            @value-changed=${e=>this._updateConfig("volume_mode",e.detail.value)}
          ></ha-selector>
        </div>
        ${g`
          <div class="form-row form-row-multi-column">
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                .selector=${sl}
                .value=${this._config.volume_step??.05}
                .disabled=${this._config.volume_mode!=="stepper"}
                label="${d("editor.fields.vol_step")}"
                @value-changed=${e=>this._updateConfig("volume_step",e.detail.value)}
              ></ha-selector>
            </div>
            <ha-icon
              class="icon-button"
              icon="mdi:restore"
              title="${d("common.reset_default")}"
              @click=${()=>this._updateConfig("volume_step",.05)}
            ></ha-icon>
          </div>
        `}
      </div>

      <div class="config-section">
        <div class="section-header">
          <div class="section-title">
            ${d("editor.sections.look_and_feel.collapsed_idle.title")}
          </div>
          <div class="section-description">
            ${d("editor.sections.look_and_feel.collapsed_idle.description")}
          </div>
        </div>

        <div
          data-search-keys="collapse_on_idle always_collapsed hide_menu_player pin_search_headers expand_on_search"
          class="form-row form-row-multi-column"
        >
          <div>
            <ha-switch
              id="collapse-on-idle-toggle"
              .checked=${this._config.collapse_on_idle??!1}
              @change=${e=>this._updateConfig("collapse_on_idle",e.target.checked)}
            ></ha-switch>
            <span>${d("editor.labels.collapse_on_idle")}</span>
          </div>
          <div
            style="${this._isTemplateValue(this._config.always_collapsed)||!this._config.always_collapsed?"":"opacity: 0.5;"}"
            title="${this._isTemplateValue(this._config.always_collapsed)||!this._config.always_collapsed?"":d("editor.subtitles.not_available_collapsed")}"
          >
            <ha-switch
              id="hide-menu-player-toggle"
              .checked=${this._config.hide_menu_player??!1}
              @change=${e=>this._updateConfig("hide_menu_player",e.target.checked)}
              .disabled=${!this._isTemplateValue(this._config.always_collapsed)&&!!this._config.always_collapsed||this._config.always_collapsed===!0&&this._config.pin_search_headers===!0&&this._config.expand_on_search===!0}
            ></ha-switch>
            <span>${d("editor.labels.hide_menu_player_toggle")}</span>
          </div>
        </div>
        ${this._isTemplateMode("always_collapsed",this._config.always_collapsed)?g`
                <div class="form-row">
                  <div class="editor-field-wrapper">
                    <div class="grow-children" style="flex-direction: column;">
                      <span class="form-label">${d("editor.labels.always_collapsed")}</span>
                      <ha-code-editor
                        lint
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        label="${d("editor.labels.always_collapsed")}"
                        .value=${this._config.always_collapsed!==void 0&&this._config.always_collapsed!==null?String(this._config.always_collapsed):""}
                        @value-changed=${e=>this._updateConfig("always_collapsed",e.detail.value)}
                      ></ha-code-editor>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("always_collapsed",this._config.always_collapsed,e=>this._updateConfig("always_collapsed",e))}
                    </div>
                  </div>
                </div>
              `:g`
                <div
                  data-search-keys="always_collapsed expand_on_search"
                  class="form-row form-row-multi-column"
                >
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <ha-switch
                      id="always-collapsed-toggle"
                      .checked=${this._config.always_collapsed===!0}
                      @change=${e=>this._updateConfig("always_collapsed",e.target.checked)}
                    ></ha-switch>
                    <span>${d("editor.labels.always_collapsed")}</span>
                    ${this._renderTemplateToggle("always_collapsed",this._config.always_collapsed,e=>this._updateConfig("always_collapsed",e))}
                  </div>
                  <div
                    style="${this._config.always_collapsed?"":"opacity: 0.5;"}"
                    title="${this._config.always_collapsed?"":d("editor.subtitles.only_available_collapsed")}"
                  >
                    <ha-switch
                      id="expand-on-search-toggle"
                      .checked=${this._config.expand_on_search??!1}
                      @change=${e=>this._updateConfig("expand_on_search",e.target.checked)}
                      .disabled=${!this._config.always_collapsed}
                    ></ha-switch>
                    <span>${d("editor.labels.expand_on_search")}</span>
                  </div>
                </div>
              `}
        <div class="form-row">
          <div class="config-subtitle">${d("editor.subtitles.collapse_expand")}</div>
        </div>
        <div
          data-search-keys="disable_mini_menu"
          class="form-row"
          style="${this._config.always_collapsed===!0&&!this._config.expand_on_search?"":"opacity: 0.5;"}"
          title="${this._config.always_collapsed===!0&&!this._config.expand_on_search?"":d("editor.subtitles.only_available_mini_menu")}"
        >
          <div style="display: flex; align-items: center; gap: 8px;">
            <ha-switch
              id="disable-mini-menu-toggle"
              .checked=${this._config.disable_mini_menu===!0}
              @change=${e=>this._updateConfig("disable_mini_menu",e.target.checked)}
              .disabled=${!(this._config.always_collapsed===!0&&!this._config.expand_on_search)}
            ></ha-switch>
            <span>${d("editor.labels.disable_mini_menu")}</span>
          </div>
        </div>
        <div class="form-row">
          <div class="config-subtitle">${d("editor.subtitles.disable_mini_menu")}</div>
        </div>
        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{mode:"dropdown",options:[{value:"default",label:"Default"},{value:"search",label:"Search"},{value:"search-recently-played",label:"Recently Played"},{value:"search-next-up",label:"Next Up"}]}}}
            .value=${this._config.idle_screen??"default"}
            label="${d("editor.fields.idle_screen")}"
            @value-changed=${e=>this._updateConfig("idle_screen",e.detail.value)}
          ></ha-selector>
          <div class="config-subtitle">${d("editor.subtitles.idle_screen")}</div>
        </div>
      </div>
    `}_renderActionsTab(){let e=[...this._config.actions??[]];return g`
      <div class="action-group config-section">
        <div class="action-group-header section-header">
          <div class="action-group-title section-title">
            ${d("editor.sections.actions.title")}
          </div>
          <div class="section-description">${d("editor.sections.actions.description")}</div>
        </div>
        <div class="form-row">
          <yamp-sortable @item-moved=${t=>this._onActionMoved(t)}>
            <div class="sortable-container">
              ${e.map((t,i)=>g`
                  <div class="action-row-inner sortable-item">
                    <div class="handle action-handle">
                      <ha-icon icon="mdi:drag"></ha-icon>
                    </div>
                    ${t?.icon?g`
                            <ha-icon
                              class="action-icon"
                              icon="${t?.icon}"
                              title="Action Icon"
                            ></ha-icon>
                          `:g`<span class="action-icon-placeholder"></span>`}
                    <div class="grow-children">
                      <ha-selector
                        .hass=${this.hass}
                        .selector=${{text:{}}}
                        label="(Icon Only)"
                        .value=${t?.name??""}
                        .helper=${this._getActionHelperText(t)}
                        @value-changed=${s=>this._onActionChanged(i,s.detail.value)}
                      ></ha-selector>
                    </div>
                    <div class="action-row-actions">
                      <ha-icon
                        class="icon-button icon-button-compact"
                        icon="mdi:pencil"
                        title="${d("common.edit_action")}"
                        @click=${()=>this._onEditAction(i)}
                      ></ha-icon>
                      ${t?.action!=="sync_selected_entity"&&t?.action!=="select_entity"?g`
                              <ha-icon
                                class="icon-button icon-button-compact icon-button-toggle ${(()=>{const s=t?.placement!==void 0?t.placement:t?.in_menu;return s==="hidden"?"icon-button-disabled":s==="menu"||s===!0||s==="replace_search"||s==="replace_power"||s==="replace_mute"||s==="replace_favorite"?"active":""})()}"
                                icon="${(()=>{const s=t?.placement!==void 0?t.placement:t?.in_menu;return s==="menu"||s===!0?"mdi:menu":s==="hidden"?t?.card_trigger&&t.card_trigger!=="none"?"mdi:image-outline":"mdi:eye-off-outline":s==="replace_search"||s==="replace_power"||s==="replace_mute"||s==="replace_favorite"?"mdi:dock-bottom":"mdi:view-grid-outline"})()}"
                                title="${(()=>{const s=t?.placement!==void 0?t.placement:t?.in_menu;return s==="hidden"?t?.card_trigger&&t.card_trigger!=="none"?d("editor.placements.hidden"):`${d("editor.placements.hidden")} (${d("editor.placements.not_triggerable")})`:d(s==="replace_search"||s==="replace_power"||s==="replace_mute"||s==="replace_favorite"?`editor.placements.${s}`:s==="menu"||s===!0?"editor.fields.move_to_main":"editor.fields.move_to_menu")})()}"
                                role="button"
                                aria-label="${(()=>{const s=t?.placement!==void 0?t.placement:t?.in_menu;return d(s==="replace_search"||s==="replace_power"||s==="replace_mute"||s==="replace_favorite"?`editor.placements.${s}`:s==="menu"||s===!0?"editor.fields.move_to_main":"editor.fields.move_to_menu")})()}"
                                @click=${()=>{const s=t?.placement!==void 0?t.placement:t?.in_menu;s!=="hidden"&&s!=="replace_search"&&s!=="replace_power"&&s!=="replace_mute"&&s!=="replace_favorite"&&this._toggleActionInMenu(i)}}
                              ></ha-icon>
                            `:g`
                              <ha-icon
                                class="icon-button icon-button-compact icon-button-disabled"
                                icon="mdi:eye-off-outline"
                                title="${d(`editor.action_types.${t?.action}`)}"
                              ></ha-icon>
                            `}
                      <ha-icon
                        class="icon-button icon-button-compact"
                        icon="mdi:trash-can"
                        title="${d("editor.fields.delete_action")}"
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
    `}_renderEntityEditor(e,t=this._entityEditorIndex,i=!1){typeof e=="string"&&(e={entity_id:e});const s=e?.volume_entity&&e.volume_entity!==e.entity_id&&!(e?.follow_active_volume??!1);return g`
        ${i?g`
                <div
                  class="entity-group-header section-header"
                  style="padding-top: 16px; border-top: 1px solid var(--divider-color);"
                >
                  <div
                    class="entity-group-title section-title"
                    style="color: var(--custom-accent, var(--accent-color, #ff9800));"
                  >
                    ${e?.name||this._entityValueRenderer(e?.entity_id)||"Entity"}
                    (${e?.entity_id||"No ID"})
                  </div>
                </div>
              `:g`
                <div class="entity-editor-header">
                  <ha-icon
                    class="icon-button"
                    icon="mdi:chevron-left"
                    title="${d("common.back")}"
                    @click=${this._onBackFromEntityEditor}
                  >
                  </ha-icon>
                  <div class="entity-editor-title">${d("editor.titles.edit_entity")}</div>
                </div>
              `}

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
            label="${d("editor.fields.name")}"
            .value=${e?.name??""}
            @value-changed=${r=>this._updateEntityProperty("name",r.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row" data-search-keys="hidden_controls previous play_pause stop next shuffle repeat favorite power">
          <div class="editor-field-wrapper">
            ${this._isTemplateMode("hidden_controls",e?.hidden_controls)?g`
                    <div class="grow-children">
                      <div
                        class=${this._yamlError&&typeof e?.hidden_controls=="string"&&e.hidden_controls.trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                        style="width: 100%;"
                      >
                        <span class="form-label">${d("editor.fields.hidden_controls")}</span>
                        <ha-code-editor
                          lint
                          id="hidden-controls-template-editor"
                          label="${d("editor.fields.hidden_controls")}"
                          .hass=${this.hass}
                          mode="jinja2"
                          autocomplete-entities
                          .value=${typeof e?.hidden_controls=="string"?e.hidden_controls:""}
                          @value-changed=${r=>this._updateEntityProperty("hidden_controls",r.detail.value)}
                        ></ha-code-editor>
                        <div class="help-text">${d("editor.subtitles.hide_controls")}</div>
                      </div>
                    </div>
                  `:g`
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{select:{mode:"dropdown",multiple:!0,options:[{value:"previous",label:"Previous Track"},{value:"play_pause",label:"Play/Pause"},{value:"stop",label:"Stop"},{value:"next",label:"Next Track"},{value:"shuffle",label:"Shuffle"},{value:"repeat",label:"Repeat"},{value:"favorite",label:"Favorite"},{value:"power",label:"Power"}]}}}
                      .value=${(()=>{let r=e?.hidden_controls;if(typeof r=="string")try{r=JSON.parse(r.replace(/'/g,'"'))}catch{r=r.split(",").map(n=>n.trim()).filter(n=>n!=="")}return Array.isArray(r)?r:[]})()}
                      label="${d("editor.fields.hidden_controls")}"
                      helper="${d("editor.subtitles.hide_controls")}"
                      @value-changed=${r=>this._updateEntityProperty("hidden_controls",r.detail.value)}
                    ></ha-selector>
                  `}
            ${this._renderTemplateToggle("hidden_controls",e?.hidden_controls,r=>this._updateEntityProperty("hidden_controls",r))}
          </div>
        </div>

        <div class="form-row" data-search-keys="hide_remote_buttons back menu home power">
          <div class="editor-field-wrapper">
            ${this._isTemplateMode("hide_remote_buttons",e?.hide_remote_buttons)?g`
                    <div class="grow-children">
                      <div
                        class=${this._yamlError&&typeof e?.hide_remote_buttons=="string"&&e.hide_remote_buttons.trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                        style="width: 100%;"
                      >
                        <span class="form-label"
                          >${d("editor.fields.hide_remote_buttons")}</span
                        >
                        <ha-code-editor
                          lint
                          id="hidden-remote-buttons-template-editor"
                          label="${d("editor.fields.hide_remote_buttons")}"
                          .hass=${this.hass}
                          mode="jinja2"
                          autocomplete-entities
                          .value=${typeof e?.hide_remote_buttons=="string"?e.hide_remote_buttons:""}
                          @value-changed=${r=>this._updateEntityProperty("hide_remote_buttons",r.detail.value)}
                        ></ha-code-editor>
                        <div class="help-text">
                          ${d("editor.subtitles.hide_remote_buttons")}
                        </div>
                      </div>
                    </div>
                  `:g`
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{select:{mode:"dropdown",multiple:!0,options:[{value:"back",label:"Back"},{value:"menu",label:"Menu"},{value:"home",label:"Home"},{value:"power",label:"Power"}]}}}
                      .value=${(()=>{let r=e?.hide_remote_buttons;if(typeof r=="string")try{r=JSON.parse(r.replace(/'/g,'"'))}catch{r=r.split(",").map(n=>n.trim()).filter(n=>n!=="")}return Array.isArray(r)?r:[]})()}
                      label="${d("editor.fields.hide_remote_buttons")}"
                      helper="${d("editor.subtitles.hide_remote_buttons")}"
                      @value-changed=${r=>this._updateEntityProperty("hide_remote_buttons",r.detail.value)}
                    ></ha-selector>
                  `}
            ${this._renderTemplateToggle("hide_remote_buttons",e?.hide_remote_buttons,r=>this._updateEntityProperty("hide_remote_buttons",r))}
          </div>
        </div>

 

        <div class="form-row">
          <div class="editor-field-wrapper">
            ${this._isTemplateMode("music_assistant_entity",e?.music_assistant_entity)?g`
                  <div class="grow-children">
                    <div class=${this._yamlError&&(e?.music_assistant_entity??"").trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"} style="width: 100%;">
                      <span class="form-label">${d("editor.fields.ma_template")}</span>
                      <ha-code-editor lint
                        id="ma-template-editor"
                        label="${d("editor.fields.ma_template")}"
                        .hass=${this.hass}
                        mode="jinja2"
                        autocomplete-entities
                        .value=${e?.music_assistant_entity??""}
                        @value-changed=${r=>this._updateEntityProperty("music_assistant_entity",r.detail.value)}
                      ></ha-code-editor>
                      <div class="help-text">
                        <ha-icon icon="mdi:information-outline"></ha-icon>
                        ${d("editor.subtitles.jinja_template_hint")}
                        <pre style="margin:6px 0; white-space:pre-wrap;">{% if is_state('input_select.kitchen_stream_source','Music Stream 1') %}
  media_player.picore_house
{% else %}
  media_player.ma_wiim_mini
{% endif %}</pre>
                       </pre>
                      </div>
                    </div>
                  </div>
                  <div class="field-actions">
                    ${this._renderTemplateToggle("music_assistant_entity",e?.music_assistant_entity,r=>this._updateEntityProperty("music_assistant_entity",r))}
                  </div>
                `:g`
                    <div class="grow-children">
                      <ha-generic-picker
                        .hass=${this.hass}
                        .value=${this._isEntityId(e?.music_assistant_entity)?e.music_assistant_entity:""}
                        .label=${d("editor.fields.ma_entity")}
                        .valueRenderer=${r=>this._entityValueRenderer(r)}
                        .rowRenderer=${r=>this._entityRowRenderer(r)}
                        .getItems=${this._getEntityItems(["media_player"])}
                        @value-changed=${r=>this._updateEntityProperty("music_assistant_entity",r.detail.value)}
                        allow-custom-value
                      ></ha-generic-picker>
                    </div>
                    <div class="field-actions">
                      ${this._renderTemplateToggle("music_assistant_entity",e?.music_assistant_entity,r=>this._updateEntityProperty("music_assistant_entity",r))}
                    </div>
                  `}
          </div>
        </div>
        ${(()=>{if(this._isTemplateMode("music_assistant_entity",e?.music_assistant_entity))return b;const r=e?.entity_id,n=r?this.hass?.states?.[r]:void 0,o=n?Ei(n):!1,l=e?.music_assistant_entity,c=this._looksLikeTemplate?.(l),u=typeof l=="string"&&!c?l:void 0,h=u?this.hass?.states?.[u]:void 0,p=h?Ei(h):!1;return o||p?g`
            <div class="form-row">
              <ha-selector
                .hass=${this.hass}
                .selector=${{select:{mode:"dropdown",multiple:!0,options:[{value:"artist",label:"Artist"},{value:"album",label:"Album"},{value:"track",label:"Track"},{value:"playlist",label:"Playlist"},{value:"radio",label:"Radio"},{value:"podcast",label:"Podcast"},{value:"episode",label:"Episode"}]}}}
                .value=${Array.isArray(e?.hidden_filter_chips)?e.hidden_filter_chips:[]}
                label="${d("editor.fields.hidden_chips")}"
                helper="${d("editor.subtitles.hide_search_chips")}"
                @value-changed=${_=>this._updateEntityProperty("hidden_filter_chips",_.detail.value)}
              ></ha-selector>
            </div>
          `:b})()}

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="prefer-ma-metadata-toggle"
              .checked=${e?.prefer_ma_metadata??!1}
              .disabled=${!e?.music_assistant_entity||e.music_assistant_entity.trim()===""}
              @change=${r=>this._updateEntityProperty("prefer_ma_metadata",r.target.checked)}
            ></ha-switch>
            <label for="prefer-ma-metadata-toggle">${d("editor.labels.prefer_ma_metadata")}</label>
          </div>
          <div class="config-subtitle">${d("editor.subtitles.prefer_ma_metadata")}</div>
        </div>

        <div class="form-row">
          <ha-switch
            id="disable-auto-select-toggle"
            .checked=${e?.disable_auto_select??!1}
            @change=${r=>this._updateEntityProperty("disable_auto_select",r.target.checked)}
          ></ha-switch>
          <label for="disable-auto-select-toggle">${d("editor.labels.disable_auto_select")}</label>
          <div class="config-subtitle">${d("editor.subtitles.disable_auto_select")}</div>
        </div>

        <div class="form-row">
          <ha-switch
            id="group-volume-toggle"
            .checked=${e?.group_volume??!0}
            .disabled=${!e?.music_assistant_entity}
            @change=${r=>this._updateEntityProperty("group_volume",r.target.checked)}
          ></ha-switch>
          <label for="group-volume-toggle">Group Volume</label>
        </div>

        <div class="form-row form-row-multi-column">
          <div>
            <ha-switch
              id="follow-active-toggle"
              .checked=${e?.follow_active_volume??!1}
              @change=${r=>this._updateEntityProperty("follow_active_volume",r.target.checked)}
            ></ha-switch>
            <label for="follow-active-toggle">${d("editor.labels.follow_active_entity")}</label>
          </div>
        </div>

        ${e?.follow_active_volume??!1?b:g`
                <div class="form-row">
                  <div class="editor-field-wrapper">
                    ${this._isTemplateMode("volume_entity",e?.volume_entity)?g`
                            <div class="grow-children">
                              <div
                                class=${this._yamlError&&(e?.volume_entity??"").trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                                style="width: 100%;"
                              >
                                <span class="form-label"
                                  >${d("editor.fields.vol_template")}</span
                                >
                                <ha-code-editor
                                  lint
                                  id="vol-template-editor"
                                  label="${d("editor.fields.vol_template")}"
                                  .hass=${this.hass}
                                  mode="jinja2"
                                  autocomplete-entities
                                  .value=${e?.volume_entity??""}
                                  @value-changed=${r=>this._updateEntityProperty("volume_entity",r.detail.value)}
                                ></ha-code-editor>
                                <div class="help-text">
                                  <ha-icon icon="mdi:information-outline"></ha-icon>
                                  ${d("editor.subtitles.jinja_template_vol_hint")}
                                  <pre style="margin:6px 0; white-space:pre-wrap;">
{% if is_state('input_boolean.tv_volume','on') %}
  remote.soundbar
{% else %}
  media_player.office_homepod
{% endif %}</pre>
                                </div>
                              </div>
                            </div>
                            <div class="field-actions">
                              ${this._renderTemplateToggle("volume_entity",e?.volume_entity,r=>{const n={volume_entity:r};r||(n.sync_power=!1),this._updateEntityProperties(n)})}
                            </div>
                          `:g`
                            <div class="grow-children">
                              <ha-generic-picker
                                .hass=${this.hass}
                                .value=${this._isEntityId(e?.volume_entity)?e.volume_entity:e?.entity_id??""}
                                .label=${d("editor.fields.vol_entity")}
                                .valueRenderer=${r=>this._entityValueRenderer(r)}
                                .rowRenderer=${r=>this._entityRowRenderer(r)}
                                .getItems=${this._getEntityItems(["media_player","remote"])}
                                @value-changed=${r=>{const n=r.detail.value,o={volume_entity:n};(!n||n===e.entity_id)&&(o.sync_power=!1),this._updateEntityProperties(o)}}
                                allow-custom-value
                              ></ha-generic-picker>
                            </div>
                            <div class="field-actions">
                              ${this._renderTemplateToggle("volume_entity",e?.volume_entity,r=>{const n={volume_entity:r};r||(n.sync_power=!1),this._updateEntityProperties(n)})}
                            </div>
                          `}
                  </div>
                </div>
              `}

        ${e?g`
                <div class="form-row" data-search-keys="remote_entity">
                  <div class="editor-field-wrapper">
                    ${this._isTemplateMode("remote_entity",e?.remote_entity)?g`
                            <div class="grow-children">
                              <div
                                class=${this._yamlError&&(e?.remote_entity??"").trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                                style="width: 100%;"
                              >
                                <span class="form-label"
                                  >${d("editor.fields.remote_template")}</span
                                >
                                <ha-code-editor
                                  lint
                                  id="remote-template-editor"
                                  label="${d("editor.fields.remote_template")}"
                                  .hass=${this.hass}
                                  mode="jinja2"
                                  autocomplete-entities
                                  .value=${typeof e?.remote_entity=="string"?e.remote_entity:""}
                                  @value-changed=${r=>this._updateEntityProperty("remote_entity",r.detail.value)}
                                ></ha-code-editor>
                                <div class="help-text">
                                  <ha-icon icon="mdi:information-outline"></ha-icon>
                                  ${d("editor.subtitles.jinja_template_remote_hint")}
                                  <pre style="margin:6px 0; white-space:pre-wrap;">
{% if is_state('input_boolean.living_room_tv','on') %}
  remote.living_room_tv
{% else %}
  remote.bedroom_tv
{% endif %}</pre>
                                </div>
                              </div>
                            </div>
                            <div class="field-actions">
                              ${this._renderTemplateToggle("remote_entity",e?.remote_entity,r=>this._updateEntityProperty("remote_entity",r))}
                            </div>
                          `:g`
                            <div class="grow-children">
                              <ha-generic-picker
                                .hass=${this.hass}
                                .value=${this._isEntityId(e?.remote_entity)?e.remote_entity:""}
                                .label=${d("editor.fields.remote_entity")}
                                .valueRenderer=${r=>this._entityValueRenderer(r)}
                                .rowRenderer=${r=>this._entityRowRenderer(r)}
                                .getItems=${this._getEntityItems(["remote"])}
                                @value-changed=${r=>this._updateEntityProperty("remote_entity",r.detail.value||void 0)}
                                allow-custom-value
                              ></ha-generic-picker>
                            </div>
                            <div class="field-actions">
                              ${this._renderTemplateToggle("remote_entity",e?.remote_entity,r=>this._updateEntityProperty("remote_entity",r))}
                            </div>
                          `}
                  </div>
                </div>
              `:b}

        ${g`
          <div class="form-row form-row-multi-column">
            <div>
              <ha-switch
                id="sync-power-toggle"
                .checked=${e?.sync_power??!1}
                .disabled=${!s}
                @change=${r=>this._updateEntityProperty("sync_power",r.target.checked)}
              ></ha-switch>
              <label for="sync-power-toggle">Sync Power</label>
            </div>
          </div>
        `}
        ${g`
          <div class="form-row form-row-multi-column">
            <div class="grow-children">
              <ha-selector
                .hass=${this.hass}
                .selector=${al}
                .value=${e?.entity_volume_mode??this._config.volume_mode??"slider"}
                label="${d("editor.fields.volume_mode")}"
                @value-changed=${r=>{const n=r.detail.value,o={entity_volume_mode:n||void 0};n!=="stepper"&&(o.entity_volume_step=void 0),this._updateEntityProperties(o)}}
              ></ha-selector>
            </div>
            <ha-icon
              class="icon-button ${e?.entity_volume_mode?"":"icon-button-disabled"}"
              icon="mdi:restore"
              title="${d("common.reset_default")}"
              @click=${()=>{this._updateEntityProperties({entity_volume_mode:void 0,entity_volume_step:void 0})}}
            ></ha-icon>
          </div>
          ${g`
            <div class="form-row form-row-multi-column">
              <div class="grow-children">
                <ha-selector
                  .hass=${this.hass}
                  .selector=${sl}
                  .value=${e?.entity_volume_step??this._config.volume_step??.05}
                  .disabled=${(e?.entity_volume_mode??this._config.volume_mode??"slider")!=="stepper"}
                  label="${d("editor.fields.vol_step")}"
                  @value-changed=${r=>this._updateEntityProperty("entity_volume_step",r.detail.value)}
                ></ha-selector>
              </div>
              <ha-icon
                class="icon-button ${e?.entity_volume_step===void 0?"icon-button-disabled":""}"
                icon="mdi:restore"
                title="${d("common.reset_default")}"
                @click=${()=>this._updateEntityProperty("entity_volume_step",void 0)}
              ></ha-icon>
            </div>
          `}
        `}

        ${e?.follow_active_volume?g`
                <div class="help-text">
                  <ha-icon icon="mdi:information-outline"></ha-icon>
                  ${d("editor.subtitles.follow_active_entity")}
                  <br /><br />
                </div>
              `:b}
        </div>
      `}_renderActionEditor(e,t=this._actionEditorIndex,i=!1){const s=this._actionMode??this._deriveActionMode(e),r=ha(e);return g`
        ${i?g`
                <div
                  class="action-group-header section-header"
                  style="padding-top: 16px; border-top: 1px solid var(--divider-color);"
                >
                  <div
                    class="action-group-title section-title"
                    style="color: var(--custom-accent, var(--accent-color, #ff9800));"
                  >
                    Action: ${e?.name||`Action #${t+1}`}
                  </div>
                </div>
              `:g`
                <div class="action-editor-header">
                  <ha-icon
                    class="icon-button"
                    icon="mdi:chevron-left"
                    @click=${this._onBackFromActionEditor}
                  >
                  </ha-icon>
                  <div class="action-editor-title">${d("editor.titles.edit_action")}</div>
                </div>
              `}

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            class="full-width"
            .selector=${{text:{}}}
            label="${d("editor.fields.name")} (Icon Only)"
            .value=${e?.name??""}
            @value-changed=${n=>this._updateActionProperty("name",n.detail.value)}
          ></ha-selector>
        </div>

        <div class="form-row">
          <ha-icon-picker
            label="${d("editor.fields.icon")}"
            .hass=${this.hass}
            .value=${e?.icon??""}
            @value-changed=${n=>this._updateActionProperty("icon",n.detail.value)}
          ></ha-icon-picker>
        </div>
 
        <div class="form-row form-row-multi-column">
          <div class="grow-children">
            <div class="editor-field-wrapper">
              ${this._isTemplateMode("placement",r)?g`
                      <div class="grow-children" style="flex-direction: column;">
                        <span class="form-label">${d("editor.fields.placement")}</span>
                        <ha-code-editor
                          lint
                          .hass=${this.hass}
                          mode="jinja2"
                          autocomplete-entities
                          label="${d("editor.fields.placement")}"
                          .value=${typeof e?.placement=="string"?e.placement:typeof e?.in_menu=="string"?e.in_menu:typeof r=="string"?r:""}
                          @value-changed=${n=>this._updateActionProperty("placement",n.detail.value)}
                        ></ha-code-editor>
                      </div>
                      <div class="field-actions">
                        ${this._renderTemplateToggle("placement",r,n=>{const o={placement:n};n!=="hidden"&&(o.card_trigger="none"),this._updateActionProperties(o)},s==="sync_selected_entity"||s==="select_entity")}
                      </div>
                    `:g`
                      <div class="grow-children">
                        <ha-selector
                          .hass=${this.hass}
                          label="${d("editor.fields.placement")}"
                          .disabled=${s==="sync_selected_entity"||s==="select_entity"}
                          .selector=${{select:{mode:"dropdown",options:[{value:"chip",label:d("editor.placements.chip")},{value:"menu",label:d("editor.placements.menu")},{value:"hidden",label:d("editor.placements.hidden")},{value:"replace_search",label:d("editor.placements.replace_search")},{value:"replace_power",label:d("editor.placements.replace_power")},{value:"replace_mute",label:d("editor.placements.replace_mute")},{value:"replace_favorite",label:d("editor.placements.replace_favorite")}]}}}
                          .value=${r}
                          @value-changed=${n=>{const o=n.detail.value,l={placement:o};o!=="hidden"&&(l.card_trigger="none"),this._updateActionProperties(l)}}
                        ></ha-selector>
                      </div>
                      <div class="field-actions">
                        ${this._renderTemplateToggle("placement",r,n=>{const o={placement:n};n!=="hidden"&&(o.card_trigger="none"),this._updateActionProperties(o)},s==="sync_selected_entity"||s==="select_entity")}
                      </div>
                    `}
            </div>
          </div>
          <div class="grow-children">
            <ha-selector
              .hass=${this.hass}
              label="${d("editor.fields.card_trigger")}"
              .disabled=${s==="sync_selected_entity"||s==="select_entity"||!this._isTemplateValue(r)&&r!=="hidden"}
              .selector=${{select:{mode:"dropdown",options:[{value:"none",label:d("editor.triggers.none")},{value:"tap",label:d("editor.triggers.tap")},{value:"hold",label:d("editor.triggers.hold")},{value:"double_tap",label:d("editor.triggers.double_tap")},{value:"swipe_left",label:d("editor.triggers.swipe_left")},{value:"swipe_right",label:d("editor.triggers.swipe_right")}]}}}
              .value=${e?.card_trigger||"none"}
              @value-changed=${n=>this._updateActionProperty("card_trigger",n.detail.value)}
            ></ha-selector>
          </div>
        </div>
        ${r==="hidden"&&(!e?.card_trigger||e?.card_trigger==="none")&&s!=="sync_selected_entity"&&s!=="select_entity"?g`
                <div class="help-text">
                  <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                  ${d("editor.placements.hidden")}
                  (${d("editor.placements.not_triggerable")})
                </div>
              `:b}

        <div class="form-row">
          <ha-selector
            .hass=${this.hass}
            label="${d("editor.fields.action_type")}"
            .selector=${{select:{mode:"dropdown",options:[{value:"menu",label:d("editor.action_types.menu")},{value:"service",label:d("editor.action_types.service")},{value:"navigate",label:d("editor.action_types.navigate")},{value:"sync_selected_entity",label:d("editor.action_types.sync_selected_entity")},{value:"select_entity",label:d("editor.action_types.select_entity")},{value:"prev_entity",label:d("editor.action_types.prev_entity")||"Previous Entity Chip"},{value:"next_entity",label:d("editor.action_types.next_entity")||"Next Entity Chip"},{value:"toggle_lyrics",label:d("editor.action_types.toggle_lyrics")||"Toggle Lyrics Overlay"},{value:"remote_control",label:d("editor.action_types.remote_control")||"Open Remote Controls Overlay"},{value:"toggle_media_session",label:d("editor.action_types.toggle_media_session")||"Toggle Media Session Controls (Experimental)"}]}}}
            .value=${this._actionMode??this._deriveActionMode(e)}
            @value-changed=${n=>{const o=n.detail.value;if(this._actionMode=o,o==="service"){const l={menu_item:void 0,navigation_path:void 0,navigation_new_tab:void 0,action:void 0};this._config.actions?.[this._actionEditorIndex]?.service||(l.service=""),this._updateActionProperties(l)}else if(o==="menu")this._updateActionProperties({service:void 0,service_data:void 0,script_variable:void 0,navigation_path:void 0,navigation_new_tab:void 0,action:void 0});else if(o==="navigate"){const l={menu_item:void 0,service:void 0,service_data:void 0,script_variable:void 0,action:"navigate"};e?.navigation_path||(l.navigation_path=""),this._updateActionProperties(l)}else if(o==="sync_selected_entity"){const l={menu_item:void 0,service:void 0,service_data:void 0,script_variable:void 0,navigation_path:void 0,navigation_new_tab:void 0,action:"sync_selected_entity",in_menu:"hidden",card_trigger:"none"};e?.sync_entity_type||(l.sync_entity_type="yamp_entity"),this._updateActionProperties(l)}else if(o==="select_entity"){const l={menu_item:void 0,service:void 0,service_data:void 0,script_variable:void 0,navigation_path:void 0,navigation_new_tab:void 0,action:"select_entity",in_menu:"hidden",card_trigger:"none"};e?.sync_entity_type||(l.sync_entity_type="yamp_entity"),this._updateActionProperties(l)}else o==="prev_entity"||o==="next_entity"?this._updateActionProperties({menu_item:void 0,service:void 0,service_data:void 0,script_variable:void 0,navigation_path:void 0,navigation_new_tab:void 0,action:o}):(o==="toggle_lyrics"||o==="remote_control"||o==="toggle_media_session")&&this._updateActionProperties({menu_item:void 0,service:void 0,service_data:void 0,script_variable:void 0,navigation_path:void 0,navigation_new_tab:void 0,action:o})}}
          ></ha-selector>
        </div>

        
        ${s==="toggle_media_session"?g`
                <div class="form-row">
                  <div class="config-subtitle">
                    ${d("editor.subtitles.toggle_media_session")||"Note: Lock screen and media session controls are experimental."}
                  </div>
                </div>
              `:b}
        ${s==="menu"?g`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    label="${d("editor.fields.menu_item")}"
                    .selector=${{select:{mode:"dropdown",options:[{value:"",label:""},{value:"search",label:d("card.menu.search")},{value:"search-recently-played",label:d("search.recently_played")},{value:"search-next-up",label:d("search.next_up")},{value:"source",label:d("card.menu.source")},{value:"more-info",label:d("card.menu.more_info")},{value:"group-players",label:d("card.menu.group_players")},{value:"transfer-queue",label:d("card.menu.transfer_queue")},{value:"main-menu",label:d("card.menu.main_menu")}]}}}
                    .value=${e?.menu_item??""}
                    @value-changed=${n=>this._updateActionProperty("menu_item",n.detail.value||void 0)}
                  ></ha-selector>
                </div>
              `:b} 
        ${s==="navigate"?g`
                <div class="form-row">
                  <div class="editor-field-wrapper">
                    ${this._isTemplateMode("navigation_path",e?.navigation_path)?g`
                            <div class="grow-children" style="flex-direction: column;">
                              <span class="form-label">${d("editor.fields.nav_path")}</span>
                              <ha-code-editor
                                lint
                                .hass=${this.hass}
                                mode="jinja2"
                                autocomplete-entities
                                label="${d("editor.fields.nav_path")}"
                                .value=${e?.navigation_path??""}
                                @value-changed=${n=>{this._updateActionProperties({navigation_path:n.detail.value,action:"navigate"})}}
                              ></ha-code-editor>
                            </div>
                            <div class="field-actions">
                              ${this._renderTemplateToggle("navigation_path",e?.navigation_path,n=>{this._updateActionProperties({navigation_path:n,action:"navigate"})})}
                            </div>
                          `:g`
                            <div class="grow-children">
                              <ha-selector
                                .hass=${this.hass}
                                class="full-width"
                                .selector=${{text:{}}}
                                label="${d("editor.fields.nav_path")} (/lovelace/music or #popup)"
                                .value=${e?.navigation_path??""}
                                @value-changed=${n=>{this._updateActionProperties({navigation_path:n.detail.value,action:"navigate"})}}
                              ></ha-selector>
                            </div>
                            <div class="field-actions">
                              ${this._renderTemplateToggle("navigation_path",e?.navigation_path,n=>{this._updateActionProperties({navigation_path:n,action:"navigate"})})}
                            </div>
                          `}
                  </div>
                </div>
                <div class="form-row form-row-multi-column">
                  <div>
                    <ha-switch
                      id="navigation-new-tab-toggle"
                      .checked=${e?.navigation_new_tab??!1}
                      @change=${n=>this._updateActionProperty("navigation_new_tab",n.target.checked)}
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
              `:b}
        ${s==="sync_selected_entity"||s==="select_entity"?g`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{entity:{domain:"input_text"}}}
                    .value=${e?.sync_entity_helper??""}
                    label="${d("editor.fields.selected_entity_helper")}"
                    @value-changed=${n=>this._updateActionProperty("sync_entity_helper",n.detail.value)}
                  ></ha-selector>
                  <div class="config-subtitle">
                    ${d(s==="select_entity"?"editor.subtitles.select_entity_helper":"editor.subtitles.selected_entity_helper")}
                  </div>
                </div>
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    label="${d("editor.fields.sync_entity_type")}"
                    .selector=${{select:{mode:"dropdown",options:[{value:"yamp_entity",label:d("editor.sync_entity_options.yamp_entity")},{value:"yamp_main_entity",label:d("editor.sync_entity_options.yamp_main_entity")},{value:"yamp_playback_entity",label:d("editor.sync_entity_options.yamp_playback_entity")}]}}}
                    .value=${e?.sync_entity_type??"yamp_entity"}
                    @value-changed=${n=>this._updateActionProperty("sync_entity_type",n.detail.value)}
                  ></ha-selector>
                  <div class="config-subtitle">
                    ${d("editor.subtitles.sync_entity_type")}
                  </div>
                </div>
              `:b}
        ${s==="service"?g`
                <div class="form-row">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{select:{mode:"dropdown",custom_value:!0,options:this._serviceItems||[]}}}
                    .value=${e.service??""}
                    label="${d("editor.fields.service")}"
                    @value-changed=${n=>this._updateActionProperty("service",n.detail.value)}
                  ></ha-selector>
                </div>

                ${typeof e.service=="string"&&e.service.startsWith("script.")?g`
                        <div
                          data-search-keys="script_variable"
                          class="form-row form-row-multi-column"
                        >
                          <div>
                            <ha-switch
                              id="script-variable-toggle"
                              .checked=${e?.script_variable??!1}
                              @change=${n=>this._updateActionProperty("script_variable",n.target.checked)}
                            ></ha-switch>
                            <span>${d("editor.labels.script_var")}</span>
                          </div>
                        </div>
                      `:b}
                ${typeof e.service=="string"?g`
                        <div class="help-text">
                          <ha-icon icon="mdi:information-outline"></ha-icon>

                          ${d("editor.subtitles.entity_current_hint")}
                        </div>
                        <div class="form-row">
                          <div
                            class=${this._yamlError&&this._yamlDraft?.trim()!==""?"code-editor-wrapper error":"code-editor-wrapper"}
                          >
                            <span class="form-label"
                              >${d("editor.fields.service_data")}</span
                            >
                            <ha-code-editor
                              lint
                              id="service-data-editor"
                              label="${d("editor.fields.service_data")}"
                              autocomplete-entities
                              autocomplete-icons
                              .hass=${this.hass}
                              mode="yaml"
                              .value=${this._yamlDraft!==void 0?this._yamlDraft:e?.service_data?Wp(e.service_data):""}
                              @value-changed=${n=>{if(this._yamlDraft!==n.detail.value){this._yamlDraft=n.detail.value;try{if(this._yamlDraft.trim()==="")this._yamlError=null,this._updateActionProperty("service_data",{});else{const o=Bh(this._yamlDraft);o&&typeof o=="object"?(this._yamlError=null,this._updateActionProperty("service_data",o)):this._yamlError="Invalid YAML"}}catch(o){this._yamlError=o.message}}}}
                            ></ha-code-editor>
                            ${this._yamlError&&this._yamlDraft?.trim()!==""?g`<div class="yaml-error-message">${this._yamlError}</div>`:b}
                          </div>
                        </div>
                      `:b}
              `:b}
      </div>`}_onEntityChanged(e,t){const i=[...this._config.entities??[]];if(!t)i.splice(e,1);else{const r=typeof i[e]=="string"?{entity:i[e]}:i[e];i[e]={...r,entity:t,entity_id:t}}const s=i.filter(r=>{const n=typeof r=="string"?r:r?.entity||r?.entity_id;return n&&n.trim()!==""});this._updateConfig("entities",s)}_onActionChanged(e,t){const i=[...this._config.actions??[]];i[e]={...i[e],name:t},this._updateConfig("actions",i)}_getActionHelperText(e){const t=ha(e),i=e?.card_trigger;let s="";t==="menu"?s=" \u2022 In Menu":t==="hidden"?e?.action!=="sync_selected_entity"&&e?.action!=="select_entity"&&(!i||i==="none"?s=` \u2022 ${d("editor.placements.hidden")} (${d("editor.placements.not_triggerable")})`:s=` \u2022 ${d("editor.placements.hidden")}`):t==="replace_search"?s=` \u2022 ${d("editor.placements.replace_search")}`:t==="replace_power"?s=` \u2022 ${d("editor.placements.replace_power")}`:t==="replace_mute"?s=` \u2022 ${d("editor.placements.replace_mute")}`:t==="replace_favorite"&&(s=` \u2022 ${d("editor.placements.replace_favorite")}`);let r="";if(i&&i!=="none"&&(r=` \u2022 Trigger: ${d(`editor.triggers.${i}`)}`),e?.action==="select_entity")return`${d("editor.action_helpers.select_entity")} ${e.sync_entity_helper||d("editor.action_helpers.select_helper")}${s}${r}`;if(e?.action==="sync_selected_entity")return`${d("editor.action_helpers.sync_selected_entity")} ${e.sync_entity_helper||d("editor.action_helpers.select_helper")}${s}${r}`;if(e?.action==="prev_entity")return`${d("editor.action_types.prev_entity")||"Previous Entity Chip"}${s}${r}`;if(e?.action==="next_entity")return`${d("editor.action_types.next_entity")||"Next Entity Chip"}${s}${r}`;if(e?.action==="toggle_lyrics")return`${d("editor.action_types.toggle_lyrics")||"Toggle Lyrics Overlay"}${s}${r}`;if(e?.action==="remote_control")return`${d("editor.action_types.remote_control")||"Open Remote Controls Overlay"}${s}${r}`;if(e?.action==="toggle_media_session"||e?.action==="toggle_lock_screen_controls")return`${d("editor.action_types.toggle_media_session")||"Toggle Media Session Controls (Experimental)"}${s}${r}`;if(e?.menu_item)return`Open Menu Item: ${e.menu_item}${s}${r}`;if(e?.service)return`Call Service: ${e.service}${s}${r}`;if(e?.navigation_path||e?.action==="navigate"){const n=e?.navigation_new_tab?" (New Tab)":"";return`Navigate to ${e.navigation_path||"(missing path)"}${n}${s}${r}`}return s||r?`Not Configured${s}${r}`:"Not Configured"}_onEditEntity(e){this._entityEditorIndex=e,this._templateModes={}}_onEditAction(e){this._actionEditorIndex=e,this._templateModes={},this._yamlDraft=void 0,this._yamlError=null;const t=this._config.actions?.[e];this._actionMode=this._deriveActionMode(t),this._actionMode==="service"&&typeof t?.service!="string"&&this._updateActionProperty("service","")}_onBackFromEntityEditor(){this._entityEditorIndex=null,this._templateModes={}}_onBackFromActionEditor(){this._actionEditorIndex=null,this._actionMode=null,this._templateModes={}}_onEntityMoved(e){const{oldIndex:t,newIndex:i}=e.detail,s=[...this._config.entities];if(t>=s.length||i>=s.length)return;const[r]=s.splice(t,1);s.splice(i,0,r),this._updateConfig("entities",s)}_onActionMoved(e){const{oldIndex:t,newIndex:i}=e.detail,s=[...this._config.actions];if(t>=s.length||i>=s.length)return;const[r]=s.splice(t,1);s.splice(i,0,r),this._updateConfig("actions",s)}_removeAction(e){const t=[...this._config.actions??[]];e<0||e>=t.length||(t.splice(e,1),this._updateConfig("actions",t))}_toggleActionInMenu(e){const t=[...this._config.actions??[]];if(!t[e])return;const i=!!t[e].in_menu,s={...t[e],in_menu:!i};delete s.placement,t[e]=s,this._updateConfig("actions",t)}_onToggleChanged(e){const t={...this._config,always_collapsed:e.target.checked};this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t}}))}_looksLikeUrlOrPath(e){return e?e.startsWith("http://")||e.startsWith("https://")||e.startsWith("/")||e.includes(".jpg")||e.includes(".jpeg")||e.includes(".png")||e.includes(".gif")||e.includes(".webp"):!1}}S_(rl,"properties",{hass:{},_config:{},_yamlConfig:{},_activeTab:{type:String},_entityEditorIndex:{type:Number},_actionEditorIndex:{type:Number},_actionMode:{type:String},_templateModes:{type:Object},_serviceItems:{type:Array},_searchTerm:{type:String}}),customElements.define("yet-another-media-player-editor",rl);var C_=Object.defineProperty,T_=(a,e,t)=>e in a?C_(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,zt=(a,e,t)=>T_(a,typeof e!="symbol"?e+"":e,t);const I_=500,nl=3e3,M_=30,ol=Object.freeze(["details","menu","action_chips","lyrics"]),P_=Object.freeze([...ol]),F_=Object.freeze({details:"--yamp-text-scale-details",menu:"--yamp-text-scale-menu",action_chips:"--yamp-text-scale-action-chips"}),ll=500,ii=15,cl=300,z_=500,j_=300,dl=50;window.customCards=window.customCards||[],window.customCards.some(a=>a.type==="yet-another-media-player")||window.customCards.push({type:"yet-another-media-player",name:"Yet Another Media Player",description:"YAMP is a multi-entity media card with custom actions",preview:!0,getEntitySuggestion:(a,e)=>e.split(".")[0]!=="media_player"?null:{config:{type:"custom:yet-another-media-player",entities:[e]}}}),console.info("%c YET-ANOTHER-MEDIA-PLAYER %c 2026.10.1 ","color: white; background: #ff9800; font-weight: bold; border-radius: 4px 0 0 4px; padding: 1px 5px;","color: #ff9800; background: white; font-weight: bold; border-radius: 0 4px 4px 0; padding: 1px 5px; border: 1px solid #ff9800; border-left: none;");class pr extends Dd(ct){constructor(){super(),zt(this,"_lastChipDoubleTapTime",0),zt(this,"_hoveredSourceLetterIndex",null),zt(this,"_lastGroupingMasterId",null),zt(this,"_cardTriggers",{tap:null,hold:null,double_tap:null,swipe_left:null,swipe_right:null}),zt(this,"_debouncedVolumeTimer",null),this._mediaSessionOverride=null,this._mediaSessionUpdatePending=!1,this._mediaSessionManager=new qd(this),this._mediaSessionManager.onReadyChange=()=>{this._isMediaSessionEnabled&&!this._isEditorPreview&&(this._mediaSessionUpdatePending||(this._mediaSessionUpdatePending=!0,this._mediaSessionUpdateTimer=setTimeout(()=>{this._mediaSessionUpdateTimer=null,this._mediaSessionUpdatePending=!1,this._isMediaSessionEnabled&&!this._isEditorPreview&&this.requestUpdate()},50)))},this._selectedIndex=0,this._lastSyncedEntityId=null,this._lastPlaying=null,this._manualSelect=!1,this._lastActiveEntityId=null,this._playTimestamps={},this._lastMediaTitle=null,this._showSourceMenu=!1,this._shouldDropdownOpenUp=!1,this._collapsedArtDominantColor="#444",this._lastArtworkUrl=null,this._aspectRatioCache={},this._addToPlaylistTarget=null,this._progressTimer=null,this._progressValue=null,this._lastProgressEntityId=null,this._pinnedIndex=null,this._sourceDropdownOutsideHandler=null,this._isIdle=!1,this._idleTimeout=null,this._showEntityOptions=!1,this._showMediaTitleOptions=!1,this._dismissMenuAfterPlaylistAdd=!1,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showRemoteControl=!1,this._cardHeightTemplateValue={},this._cardHeightResolveCache={},this._lastCardHeightContextKey=null,this._lyricsBackgroundFadeTemplateValue={},this._lyricsBackgroundFadeResolveCache={},this._lastLyricsBackgroundFadeContextKey=null,this._lockScreenControlsTemplateValue={},this._lockScreenControlsResolveCache={},this._lastLockScreenControlsContextKey=null,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._hasTransferQueueForCurrent=!1,this._transferQueueAutoCloseTimer=null,this._alternateProgressBar=!1,this._lastSpacerRendered=!0,this._lastVolumeRendered=!0,this._groupBaseVolume=null,this._searchQuery="",this._searchLoading=!1,this._searchResults=[],this._searchDisplaySortOverride=null,this._searchError="",this._searchTotalRows=15,this._searchResultsByType={},this._currentSearchQuery="",this._latestSearchToken=0,this._latestManualShiftTime=0,this._searchTimeoutHandle=null,this._swapPauseForStop=!1,this._controlLayoutTemplateValue={},this._controlLayoutResolveCache={},this._searchHierarchy=[],this._searchBreadcrumb="",this._playbackLingerByIdx={},this._lastResolvedEntityIdByChip={},this._showSearchInSheet=!1,this._searchHeadersRetracted=!1,this._searchHeaderOffset=0,this._searchHeaderNaturalHeight=0,this._lastSearchResultsScrollTop=0,this._showResolvedEntities=!1,this._showQueueSuccessMessage=!1,this._searchActiveOptionsItem=null,this._volumeDraggingEntity=null,this._dragVolume=0,this._activeSearchRowMenuId=null,this._loadingSearchRowMenuId=null,this._errorSearchRowMenuId=null,this._successSearchRowMenuId=null,this._successSearchRowType=null,this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._radioModeActive=!1,this._massQueueAvailable=!1,this._hasMassQueueIntegration=null,this._checkingMassQueueIntegration=!1,this._lyricsCache=new Map,this._quickMenuInvoke=!1,this._collapsedBaselineHeight=220,this._lastRenderedCollapsed=!1,this._lastRenderedHideControls=!1,this._baseArtworkObjectFit="cover",this._idleScreen="default",this._idleScreenApplied=!1,this._hasSeenPlayback=!1,this._adaptiveText=!1,this._textResizeObserver=null,this._currentTextScale=null,this._adaptiveTextTargets=new Set,this._idleImageTemplate=null,this._idleImageTemplateResult="",this._resolvingIdleImageTemplate=!1,this._idleImageTemplateNeedsResolve=!1,this._backgroundImageTemplate=null,this._backgroundImageTemplateResult="",this._resolvingBackgroundImageTemplate=!1,this._backgroundImageTemplateNeedsResolve=!1,this._fontColorTemplate=null,this._fontColorTemplateResult="",this._resolvingFontColorTemplate=!1,this._fontColorTemplateNeedsResolve=!1,this._artworkOverrideTemplateCache={},this._artworkOverrideIndexMap=null,this._hideActiveEntityLabel=!1,this._hideActiveEntityLabelOnIdle=!1,this._currentDetailsScale=null,this._lastNonLyricsLowerContentHeight=null,this._lowerControlsHeight=null,this._massLyrics=[],this._lastLyricsTrackId=null,this._lastLyricsArtist=null,this._lastLyricsTitle=null,this._lastLyricsEntityId=null,this._lyricsActive=!1,this._fetchingLyrics=!1,this._fetchingCacheKey=null,this._lyricsError=!1,this._suspendAdaptiveScaling=!1,this._pendingAdaptiveScaleUpdate=!1,this._adaptiveScrollTimer=null,this._marqueeSequentialTimer=null,this._marqueeAnimationEndHandler=null,this._marqueeObservedElements=null,this._lastMarqueeKey=null,this._marqueeCleanups=[],this._marqueeManualResetTimers=new Map,this._suppressMarqueeClick=!1,this._suppressMarqueeClickTimer=null,this._lyricsFetchTimeout=null,this._handleGlobalScroll=this._handleGlobalScroll.bind(this),this._handleViewportResize=this._handleViewportResize.bind(this),this._isNarrowViewport=!1,this._lastIsMobile=!1,setTimeout(()=>{if(this._cardType==="search"){this._showEntityOptions=!0,this._setIdleState(!1),this._showSearchSheetInOptions(),this.requestUpdate();return}if(this._cardType==="up_next"){this._showEntityOptions=!0,this._setIdleState(!1),this._showSearchSheetInOptions("next-up"),this.requestUpdate();return}if(this._cardType==="remote_control"){this._showEntityOptions=!0,this._showRemoteControl=!0,this._setIdleState(!1),this.requestUpdate();return}if(this._cardType==="group_players"){this._showEntityOptions=!0,this._setIdleState(!1),this._showGrouping=!0,this.requestUpdate();return}if(this.hass&&this.entityIds&&this.entityIds.length>0){const e=this.hass.states[this.entityIds[this._selectedIndex]],t=this._playbackLingerByIdx?.[this._selectedIndex]&&this._playbackLingerByIdx[this._selectedIndex].until>Date.now(),i=this.entityIds.some((n,o)=>{if(this._isAutoSelectDisabled(o))return!1;const l=this.hass.states[n];return this._isEntityPlaying(l)}),s=this._isAutoSelectDisabled(this._selectedIndex),r=this._isEntityPlaying(e)&&(!s||this._manualSelect);e&&!r&&!i&&!t&&this._idleTimeoutMs>0&&(this._setIdleState(!0),this.requestUpdate())}},0),this._prevCollapsed=null,this._searchAttempted=!1,this._searchMediaClassFilter="all",this._keepFiltersOnSearch=!1,this._lastSearchChipClasses="",this._swipeStartX=null,this._searchSwipeAttached=!1,this._manualSelectPlayingSet=null,this._idleTimeoutMs=6e4,this._volumeStep=.05,this._searchInputAutoFocused=!1,this._disableSearchAutofocus=!1,this._optimisticPlayback=null,this._lastPlaybackEntityId=null,this._entitySwitchDebounceTimer=null,this._lastMainState=null,this._lastMaState=null,this._maResolveCache={},this._maResolveTtlMs=7e3,this._manualSelectTimeout=null,this._templateSubscriptions={},this._activeSubscriptionTokens={},this._maTemplateValues={},this._volTemplateValues={},this._actionInMenuTemplateValues={},this._actionInMenuResolveCache={},this._alwaysCollapsedTemplateValue={},this._alwaysCollapsedResolveCache={},this._hiddenControlsTemplateValues={},this._hiddenControlsResolveCache={},this._lastActionEntityId=null,this._volResolveCache={},this._volResolveTtlMs=7e3,this._remoteResolveCache={},this._remoteTemplateValues={},this._lastPlayingEntityId=null,this._controlFocusEntityId=null,this._lastActiveEntityIdByChip={},this._playerStateCache={},this._volumeOverlayActive=!1,this._volumeOverlayValue=0,this._volumeOverlayTimer=null,this._internalVolumeSuppressTimer=null,this._lastTrackedVolumeLevel=null,this._lastTrackedVolEntityId=null,this._volumeOverlayMuted=!1,this._internalVolumeChangeFlag=!1,this._showVolumeOverlay=!1,this._queueOperationPromise=Promise.resolve(),this._queueOpsTotal=0,this._queueOpsCompleted=0,this._queueOpsTimeout=null}_handleChipPointerDown(e,t){this._chipGestureStartX=e.clientX,this._chipGestureStartY=e.clientY,this._holdToPin&&this._holdHandler&&this._holdHandler.pointerDown(e,t)}_applyIdleScreen(){if(!this._idleScreenApplied){switch(this._idleScreen||"default"){case"search":this._showEntityOptions=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showResolvedEntities=!1,this._showSearchSheetInOptions("default");break;case"search-recently-played":this._showEntityOptions=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showResolvedEntities=!1,this._showSearchSheetInOptions("recently-played");break;case"search-next-up":this._showEntityOptions=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showResolvedEntities=!1,this._showSearchSheetInOptions("next-up");break;default:return}this._idleScreenApplied=!0}}_getSearchDismissBehavior(){const e=this.config.dismiss_search_on_play!==!1,t=this._cardType==="search";return{shouldDismiss:!t&&e,shouldReset:t&&e}}_resetIdleScreen(){if(!this._idleScreenApplied)return;const{shouldDismiss:e,shouldReset:t}=this._getSearchDismissBehavior();switch(this._idleScreen){case"search":case"search-recently-played":case"search-next-up":if(e)this._hideSearchSheetInOptions(),this._showEntityOptions=!1;else if(t)this._showSearchSheetInOptions();else{this._idleScreenApplied=!1;return}break}this._idleScreenApplied=!1,this.requestUpdate()}_handleChipPointerMove(e,t){this._holdToPin&&this._holdHandler&&this._holdHandler.pointerMove(e,t)}_handleChipPointerUp(e,t){if(this._holdToPin&&this._holdHandler&&this._holdHandler.pointerUp(e,t),e.pointerType!=="touch"&&e.pointerType!=="pen"||e.type!=="pointerup")return;const i=e.clientX-this._chipGestureStartX,s=e.clientY-this._chipGestureStartY,r=Math.abs(i),n=Math.abs(s);if(r>ii||n>ii)return;const o=Date.now(),l=o-(this._lastChipTapTime||0);this._lastChipTapTime=o,l<cl&&this._lastChipTapIdx===t&&(this._lastChipTapTime=0,this._lastChipDoubleTapTime=o,this._quickGroupingMode=!this._quickGroupingMode,this.requestUpdate()),this._lastChipTapIdx=t}_supportsFeature(e,t){return!e||typeof e.attributes.supported_features!="number"?!1:(e.attributes.supported_features&t)!==0}_isGroupCapable(e){return!e||e.attributes?.mass_player_type==="group"?!1:this._supportsFeature(e,fn)?!0:Array.isArray(e.attributes?.group_members)}_isCurrentlyGrouped(e){return this._isGroupCapable(e)?Array.isArray(e?.attributes?.group_members)&&e.attributes.group_members.length>1:!1}_findAssociatedButtonEntities(e){return kd(this.hass,e)}_cleanTrackMetadata(e){return!e||typeof e!="string"?"":e.split(" - ")[0].replace(/\(feat\..*?\)/gi,"").replace(/\(with.*?\)/gi,"").replace(/\[.*?\]/g,"").replace(/\(.*?\)/g,"").replace(/- \d{4} Remaster.*/gi,"").replace(/- Remastered.*/gi,"").replace(/- Single.*/gi,"").trim()}_getFavoriteButtonEntity(){if(!this.entityObjs[this._selectedIndex])return null;const e=this._getActivePlaybackEntityId(this._selectedIndex);return!e||!this.hass?.states?.[e]?null:this._findAssociatedButtonEntities(e).find(t=>t.friendly_name.toLowerCase().includes("favorite")||t.friendly_name.toLowerCase().includes("like")||t.device_class==="favorite"||t.entity_id.toLowerCase().includes("favorite"))?.entity_id||null}_getMusicAssistantState(){const e=this._getActivePlaybackEntityId(this._selectedIndex);return e?Ed(this.hass,e):null}_isCurrentTrackFavorited(){if(!this.entityObjs[this._selectedIndex])return!1;const e=this._getMusicAssistantState();if(!e)return!1;const t=e.attributes?.media_content_id;if(!t)return!1;if(typeof e.attributes?.is_favorite=="boolean")return e.attributes.is_favorite;if(this._favoriteStatusCache&&this._favoriteStatusCache[t]!==void 0){const i=this._favoriteStatusCache[t];if(typeof i=="object"&&i.isFavorited!==void 0)return i.isFavorited;if(typeof i=="boolean")return i}return(!this._checkingFavorites||this._checkingFavorites!==t)&&(this._checkingFavorites=t,this._checkFavoriteStatusAsync(t)),!1}async _checkFavoriteStatusAsync(e){if(!(!e||!this.hass))try{const t=this._getMusicAssistantState(),i=t?.entity_id,s=t.attributes?.media_title,r=t.attributes?.media_artist,n=Math.min(this._getSearchResultsLimit(),10),o=await Kd(this.hass,e,i,s,r,n);this._favoriteStatusCache||(this._favoriteStatusCache={}),this._favoriteStatusCache[e]={isFavorited:o},this._checkingFavorites=null,this.requestUpdate()}catch{this._checkingFavorites=null}}connectedCallback(){super.connectedCallback(),this._isEditorPreviewCached=void 0,window.addEventListener("scroll",this._handleGlobalScroll,{passive:!0}),window.addEventListener("resize",this._handleViewportResize,{passive:!0}),this._updateViewportFlags(),this._updateAdaptiveTextObserverState(),this._mediaSessionManager&&this._isMediaSessionEnabled&&this._mediaSessionManager.attach()}_scrollToSourceLetter(e){const t=this.renderRoot.querySelector(".entity-options-sheet");if(!t)return;const i=Array.from(t.querySelectorAll(".entity-options-item")).find(s=>(s.textContent||"").trim().toUpperCase().startsWith(e));i&&i.scrollIntoView({behavior:"smooth",block:"center"})}_shouldShowStopButton(e){if(!this._supportsFeature(e,xd))return!1;const t=this.renderRoot?.querySelector(".controls-row");if(!t)return!0;const i=t.offsetWidth>480,s=!!this._getFavoriteButtonEntity()&&!this._getHiddenControlsForCurrentEntity().favorite,r=vs(e,(n,o)=>this._supportsFeature(n,o),s,this._getHiddenControlsForCurrentEntity(),!0,this._controlLayout);return i||r<=5}_isAutoSelectDisabled(e){const t=this.config.entities[e];return typeof t=="string"?!1:!!t.disable_auto_select}get sortedEntityIds(){return this.entityIds.map((e,t)=>{const i=this._isAutoSelectDisabled(t),s=i?0:this._playTimestamps[e]||0;return{id:e,idx:t,ts:s,disabled:i}}).sort((e,t)=>e.disabled!==t.disabled?e.disabled-t.disabled:e.ts===t.ts?e.idx-t.idx:t.ts-e.ts).map(e=>e.id)}get groupedSortedEntityIds(){const e=this.entityIds;if(!e||!Array.isArray(e))return[];const t=new Set(e),i={};for(let s=0;s<e.length;s++){const r=e[s];let n=this._getGroupKey(r);(this._quickGroupingMode||!t.has(n))&&(n=r),i[n]||(i[n]={ids:[],ts:0,minIdx:s,allDisabled:!0}),i[n].ids.push(r);const o=this._isAutoSelectDisabled(s),l=o?0:this._playTimestamps[r]||0;o||(i[n].allDisabled=!1),i[n].ts=Math.max(i[n].ts,l)}return Object.values(i).sort((s,r)=>s.allDisabled!==r.allDisabled?s.allDisabled-r.allDisabled:r.ts===s.ts?s.minIdx-r.minIdx:r.ts-s.ts).map(s=>s.ids.sort())}get _controlLayout(){const e=this.config?.control_layout;let t=e;if(typeof e=="string"&&(e.includes("{{")||e.includes("{%")||e.trim().startsWith("[[["))){const i=this._controlLayoutResolveCache?.card?.value;if(i!=null&&i!=="")t=i;else return"classic"}return(typeof t=="string"?t.trim().toLowerCase():"classic")==="modern"?"modern":"classic"}get _cardHeight(){const e=this.config?.card_height;if(typeof e=="string"&&(e.includes("{{")||e.includes("{%")||e.trim().startsWith("[[["))){let t=this._cardHeightResolveCache?.card?.value;if(t===void 0&&e.trim().startsWith("[[["))try{t=dt(this.hass,e,this._getTemplateContext())}catch{}return t!=null&&t!==""?t:null}return e}get _alwaysCollapsed(){const e=this.config?.always_collapsed;if(typeof e=="string"&&(e.includes("{{")||e.includes("{%")||e.trim().startsWith("[[["))){const t=this._alwaysCollapsedResolveCache?.card?.value;if(t!=null&&t!==""){if(typeof t=="boolean")return t;const i=String(t).trim().toLowerCase();return i==="true"||i==="1"||i==="on"||i==="yes"}return!1}return!!e}get _lyricsBackgroundFade(){const e=this.config?.lyrics_background_fade;if(typeof e=="string"&&(e.includes("{{")||e.includes("{%")||e.trim().startsWith("[[["))){let i=this._lyricsBackgroundFadeResolveCache?.card?.value;if(i===void 0&&e.trim().startsWith("[[["))try{i=dt(this.hass,e,this._getTemplateContext())}catch{}if(i!=null&&i!==""){const s=Number(i);return Number.isFinite(s)?Math.max(0,Math.min(100,s)):et}return et}if(e==null||e==="")return et;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(100,t)):et}_getLyricsBackgroundFade(){return this._lyricsBackgroundFade}get _artworkGradientDisabled(){return this.config?.disable_artwork_gradient===!0}get _artworkObjectFit(){const e=this._baseArtworkObjectFit||"cover";return e==="scaled-contain-alternate"&&this._alwaysCollapsed?"scaled-contain":e}get _cardType(){return this.config?.card_type||"default"}get _isSpecializedCard(){return this._cardType!=="default"}get _isEditorPreview(){if(this._isEditorPreviewCached!==void 0)return this._isEditorPreviewCached;if(this.preview===!0)return this._isEditorPreviewCached=!0;if(!this.isConnected)return!1;const e=!!(typeof this.closest=="function"&&this.closest("hui-card-preview")||this.parentElement&&this.parentElement.tagName&&this.parentElement.tagName.toLowerCase()==="hui-card-preview"||this.getRootNode&&this.getRootNode()?.host?.closest?.("hui-card-preview")||this.getRootNode&&this.getRootNode()?.host?.parentElement?.tagName?.toLowerCase()==="hui-card-preview");return this._isEditorPreviewCached=e,e}get _lockScreenControls(){const e=this.config?.lock_screen_controls;if(typeof e=="string"&&(e.includes("{{")||e.includes("{%")||e.trim().startsWith("[[["))){const t=this._lockScreenControlsResolveCache?.card?.value;if(t!=null&&t!==""){if(typeof t=="boolean")return t;const i=String(t).trim().toLowerCase();return i==="true"||i==="1"||i==="on"||i==="yes"}return!1}return e===!0}get _isMediaSessionEnabled(){return this._isEditorPreview?!1:this._mediaSessionOverride!==null?this._mediaSessionOverride:this._lockScreenControls}_subscribeToTemplate(e,t,i){if(!this.hass||!this.hass.connection)return;const s=`${e}_${t}`;let r,n,o;if(t==="ma"?(r=this._maTemplateValues[e],n=this._maTemplateValues,o=this._maResolveCache):t==="vol"?(r=this._volTemplateValues[e],n=this._volTemplateValues,o=this._volResolveCache):t==="remote"?(r=this._remoteTemplateValues[e],n=this._remoteTemplateValues,o=this._remoteResolveCache):t==="action_in_menu"?(r=this._actionInMenuTemplateValues[e],n=this._actionInMenuTemplateValues,o=this._actionInMenuResolveCache):t==="always_collapsed"?(r=this._alwaysCollapsedTemplateValue[e],n=this._alwaysCollapsedTemplateValue,o=this._alwaysCollapsedResolveCache):t==="hidden_controls"?(r=this._hiddenControlsTemplateValues[e],n=this._hiddenControlsTemplateValues,o=this._hiddenControlsResolveCache):t==="control_layout"?(r=this._controlLayoutTemplateValue[e],n=this._controlLayoutTemplateValue,o=this._controlLayoutResolveCache):t==="card_height"?(r=this._cardHeightTemplateValue[e],n=this._cardHeightTemplateValue,o=this._cardHeightResolveCache):t==="lyrics_background_fade"?(r=this._lyricsBackgroundFadeTemplateValue[e],n=this._lyricsBackgroundFadeTemplateValue,o=this._lyricsBackgroundFadeResolveCache):t==="lock_screen_controls"&&(r=this._lockScreenControlsTemplateValue[e],n=this._lockScreenControlsTemplateValue,o=this._lockScreenControlsResolveCache),this._templateSubscriptions[s]&&r?.template===i)return;this._unsubscribeFromTemplate(e,t),n[e]={template:i,resolved:null};const l=Symbol("subToken");this._activeSubscriptionTokens[s]=l,this._templateSubscriptions[s]=l;try{const c=this._getTemplateContext(),u=`${Object.entries(c).map(([h,p])=>`{% set ${h} = ${JSON.stringify(p)} %}`).join(" ")} ${i}`;this.hass.connection.subscribeMessage(h=>{if(this._activeSubscriptionTokens[s]!==l)return;const p=(h.result||"").toString().trim();let _=!1;t==="ma"||t==="vol"||t==="remote"?_=p&&/^([a-z0-9_]+)\.[a-zA-Z0-9_]+$/.test(p):(t==="action_in_menu"||t==="always_collapsed"||t==="control_layout"||t==="card_height"||t==="lyrics_background_fade"||t==="lock_screen_controls"||t==="hidden_controls")&&(_=!0);let m=!1;if(n[e]&&(n[e].resolved=_?p:null),t==="ma"||t==="vol"||t==="remote"){const f=o[e]?.id;_&&f!==p&&(o[e]={id:p,ts:Date.now()},m=!0)}else if(t==="action_in_menu"||t==="always_collapsed"||t==="control_layout"||t==="card_height"||t==="lyrics_background_fade"||t==="lock_screen_controls"||t==="hidden_controls"){const f=o[e]?.value;_&&f!==p&&(o[e]={value:p,ts:Date.now()},m=!0)}m&&this.requestUpdate()},{type:"render_template",template:u}).then(h=>{if(this._activeSubscriptionTokens[s]!==l)try{h()}catch{}else this._templateSubscriptions[s]=h})}catch(c){console.warn("yamp: failed to subscribe to template:",c)}}_unsubscribeFromTemplate(e,t){const i=`${e}_${t}`,s=this._templateSubscriptions[i];if(s){if(typeof s=="function")try{s()}catch{}delete this._templateSubscriptions[i],delete this._activeSubscriptionTokens[i]}}async _ensureResolvedTemplateForIndex(e,t,i,s,r,n={}){const{allowObject:o=!1,cacheStaticString:l=!1}=n;if(!i||typeof i!="string"&&!(o&&typeof i=="object")){delete s[e],this._unsubscribeFromTemplate(e,t),r[e]&&delete r[e];return}if(typeof i=="string"){if(i.trim().startsWith("[[[")){this._unsubscribeFromTemplate(e,t),r[e]&&delete r[e];const c=this._evaluateJsTemplate(i),u=o?s[e]?.value:s[e]?.id;let h;typeof c=="object"&&c!==null?h=JSON.stringify(u)!==JSON.stringify(c):Number.isNaN(c)&&Number.isNaN(u)?h=!1:h=u!==c,h&&(o?s[e]={value:c,ts:Date.now()}:s[e]={id:c,ts:Date.now()},this.requestUpdate());return}if(!(i.includes("{{")||i.includes("{%"))){this._unsubscribeFromTemplate(e,t),r[e]&&delete r[e],l?s[e]={id:i,ts:Date.now()}:delete s[e];return}this._subscribeToTemplate(e,t,i)}else o&&typeof i=="object"&&(delete s[e],this._unsubscribeFromTemplate(e,t),r[e]&&delete r[e])}async _ensureResolvedMaForIndex(e){const t=this.entityObjs?.[e];if(t)return this._ensureResolvedTemplateForIndex(e,"ma",t.music_assistant_entity,this._maResolveCache,this._maTemplateValues,{cacheStaticString:!0})}async _ensureResolvedVolForIndex(e){const t=this.entityObjs?.[e];if(t){if(t.follow_active_volume){delete this._volResolveCache[e],this._unsubscribeFromTemplate(e,"vol"),this._volTemplateValues[e]&&delete this._volTemplateValues[e];return}return this._ensureResolvedTemplateForIndex(e,"vol",t.volume_entity,this._volResolveCache,this._volTemplateValues,{cacheStaticString:!0})}}async _ensureResolvedRemoteForIndex(e){const t=this.entityObjs?.[e];if(t)return this._ensureResolvedTemplateForIndex(e,"remote",t.remote_entity,this._remoteResolveCache,this._remoteTemplateValues,{cacheStaticString:!0})}async _ensureResolvedHiddenControlsForIndex(e){const t=this.entityObjs?.[e];if(t)return this._ensureResolvedTemplateForIndex(e,"hidden_controls",t.hidden_controls,this._hiddenControlsResolveCache,this._hiddenControlsTemplateValues,{allowObject:!0})}_evaluateJsTemplate(e){if(typeof e!="string")return e;const t=e.trim();if(!t.startsWith("[[[")||!t.endsWith("]]]"))return e;const i=t.substring(3,t.length-3).trim();try{const s=this.hass;if(!s)return;const r=s.states,n=s.user,o=(u,h)=>r[u]?.state===h,l=(u,h)=>r[u]?.attributes?.[h],c=this._getTemplateContext();if(this._compiledJsTemplates||(this._compiledJsTemplates={}),!this._compiledJsTemplates[i]){const u=i.includes("return")?i:`return (${i});`;this._compiledJsTemplates[i]=new Function("hass","states","user","is_state","state_attr","context","current","is_idle","is_playing","is_search","is_grouping","is_source","is_lyrics","is_options","is_transfer_queue","is_any_menu_open","is_dark_mode","is_mobile","is_music_assistant","is_music",u)}return this._compiledJsTemplates[i](s,r,n,o,l,c,c.current,c.is_idle,c.is_playing,c.is_search,c.is_grouping,c.is_source,c.is_lyrics,c.is_options,c.is_transfer_queue,c.is_any_menu_open,c.is_dark_mode,c.is_mobile,c.is_music_assistant,c.is_music)}catch(s){console.warn("yamp: failed to evaluate JS template:",e,s);return}}_syncTemplateSubscriptions(e,t,i){if(!this.hass)return;let s,r,n;if(e==="always_collapsed")s=this._alwaysCollapsedTemplateValue,r=this._alwaysCollapsedResolveCache,n="_lastAlwaysCollapsedContextKey";else if(e==="action_in_menu")s=this._actionInMenuTemplateValues,r=this._actionInMenuResolveCache,n="_lastActionTemplateContextKey";else if(e==="control_layout")s=this._controlLayoutTemplateValue,r=this._controlLayoutResolveCache,n="_lastControlLayoutContextKey";else if(e==="card_height")s=this._cardHeightTemplateValue,r=this._cardHeightResolveCache,n="_lastCardHeightContextKey";else if(e==="lyrics_background_fade")s=this._lyricsBackgroundFadeTemplateValue,r=this._lyricsBackgroundFadeResolveCache,n="_lastLyricsBackgroundFadeContextKey";else if(e==="lock_screen_controls")s=this._lockScreenControlsTemplateValue,r=this._lockScreenControlsResolveCache,n="_lastLockScreenControlsContextKey";else return;const o=this[n]!==t;o&&(this[n]=t);const l=(c,u)=>{if(typeof u=="string"&&u.trim().startsWith("[[[")){this._unsubscribeFromTemplate(c,e);const h=this._evaluateJsTemplate(u),p=r[c]?.value;let _;typeof h=="object"&&h!==null?_=JSON.stringify(p)!==JSON.stringify(h):Number.isNaN(h)&&Number.isNaN(p)?_=!1:_=p!==h,_&&(r[c]={value:h,ts:Date.now()},this.requestUpdate())}else typeof u=="string"&&(u.includes("{{")||u.includes("{%"))?(o&&(this._unsubscribeFromTemplate(c,e),s[c]&&delete s[c],r[c]&&delete r[c]),this._subscribeToTemplate(c,e,u)):(this._unsubscribeFromTemplate(c,e),s[c]&&delete s[c],delete r[c])};if(e==="always_collapsed"||e==="control_layout"||e==="card_height"||e==="lyrics_background_fade"||e==="lock_screen_controls")l("card",i);else if(e==="action_in_menu"){const c=i||[];c.forEach((h,p)=>l(p,ha(h)));let u=c.length;for(;this._templateSubscriptions[`${u}_${e}`]||s[u]||r[u];)this._unsubscribeFromTemplate(u,e),delete s[u],delete r[u],u++}}_syncEntityTemplateSubscriptions(e,t){if(!this.hass||!this.entityObjs)return;const i=`_lastEntity_${e}ContextKey`;this[i]!==t&&(this[i]=t,this.entityObjs.forEach((s,r)=>{this._templateSubscriptions[`${r}_${e}`]&&this._unsubscribeFromTemplate(r,e),e==="ma"?this._ensureResolvedMaForIndex(r):e==="vol"?this._ensureResolvedVolForIndex(r):e==="remote"?this._ensureResolvedRemoteForIndex(r):e==="hidden_controls"&&this._ensureResolvedHiddenControlsForIndex(r)}))}_getResolvedPlaybackEntityIdSync(e){return this._getEntityForPurpose(e,"playback_control")}_getResolvedVolumeEntityIdSync(e){const t=this.entityObjs[e];if(!t)return null;if(t.follow_active_volume)return this._getActivePlaybackEntityId();const i=this._volResolveCache?.[e]?.id;if(i&&typeof i=="string")return i;const s=t.volume_entity;return s&&typeof s=="string"&&!(s.includes("{{")||s.includes("{%")||s.trim().startsWith("[[["))?s:t.entity_id}_getActualResolvedMaEntityForState(e){const t=this.entityObjs[e];if(!t)return null;const i=this._maResolveCache?.[e]?.id;if(i&&typeof i=="string")return i;const s=t.music_assistant_entity;return s&&typeof s=="string"&&!s.includes("{{")&&!s.includes("{%")&&!s.trim().startsWith("[[[")?s:t.entity_id}_isEntityPlaying(e){if(!e)return!1;const t=e.state?.toLowerCase();return t==="playing"||t==="buffering"}_isCurrentEntityPlaying(){const e=this.currentEntityId,t=this._getActualResolvedMaEntityForState(this._selectedIndex),i=e?this.hass?.states?.[e]:null,s=t?this.hass?.states?.[t]:null;return this._isEntityPlaying(i)||this._isEntityPlaying(s)}async _resolveTemplateAtActionTime(e,t){return wd(this.hass,e,t)}_attachSearchSwipe(){if(this._searchSwipeAttached)return;const e=this.renderRoot.querySelector(".entity-options-search-results");if(!e||this._searchHierarchy.length>0)return;this._searchSwipeAttached=!0;const t=40,i=r=>{r.touches.length===1&&(this._swipeStartX=r.touches[0].clientX)},s=r=>{if(this._swipeStartX===null)return;const n=r.changedTouches&&r.changedTouches[0].clientX||null;if(n===null){this._swipeStartX=null;return}const o=n-this._swipeStartX;if(Math.abs(o)>t){const l=new Set;Object.values(this._searchResultsByType).forEach(y=>{y.forEach(v=>{v.media_class&&l.add(v.media_class)})});const c=this.entityObjs?.[this._selectedIndex]||null,u=new Set(c?.hidden_filter_chips||[]),h=["all",...Array.from(l).filter(y=>!u.has(y))],p=h.indexOf(this._searchMediaClassFilter||"all"),_=o<0?1:-1;let m=(p+_+h.length)%h.length;const f=h[m];this._doSearch(f==="all"?null:f)}this._swipeStartX=null};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",s,{passive:!0}),e._searchSwipeHandlers={touchstart:i,touchend:s}}_getMockItemFromCurrentTrack(){const e=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;return!e||!e.attributes||!e.attributes.media_title?null:{title:e.attributes.media_title,media_title:e.attributes.media_title,media_content_id:e.attributes.media_content_id||e.attributes.media_title,media_artist:e.attributes.media_artist||"",media_content_type:"track",media_type:"track"}}_isCurrentlyPlayingRadio(){const e=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;if(!e?.attributes)return!1;const t=(e.attributes.media_content_type||"").toLowerCase(),i=(e.attributes.media_content_id||"").toLowerCase();return t==="radio"||i.startsWith("library://radio/")}_handlePlaySimilar(){const e=this._getMockItemFromCurrentTrack();e&&(this._showMediaTitleOptions=!1,this._radioModeActive=!0,this._playMediaFromSearch(e))}async _handleAddCurrentToPlaylist(){const e=this._getMockItemFromCurrentTrack();if(e){if(this._showMediaTitleOptions=!1,this._showEntityOptions=!0,this._showSearchInSheet=!0,this._dismissMenuAfterPlaylistAdd=!0,this._isCurrentlyPlayingRadio()){const t=e.title;this._addToPlaylistTarget=null,this._searchHierarchy.push({type:"select_track_for_playlist",name:d("search.select_track_for_playlist",{"{track}":e.title,"{artist}":e.media_artist}),query:this._searchQuery,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=d("search.select_track_for_playlist",{"{track}":e.title,"{artist}":e.media_artist}),this._searchQuery=t,this._currentSearchQuery=t,this._searchMediaClassFilter="track",this._resetSearchContext(),this._removeSearchSwipeHandlers(),await this._doSearch("track",{clearFilters:!0,artist:e.media_artist});return}this._performSearchOptionAction(e,"add_to_playlist")}}async _searchArtistFromNowPlaying(){const e=(this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj)?.attributes?.media_artist||"";if(!e)return;this._openedSearchFromNowPlaying=!0,this._showEntityOptions=!0,this._showSearchInSheet=!0,this._searchInputAutoFocused=!1,this._searchError="",this._searchResults=[],this._searchQuery="",this._searchAttempted=!1,this._searchResultsByType={},this._currentSearchQuery="",this._searchHierarchy=[],this._searchBreadcrumb="",this._usingMusicAssistant=!1,this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this._lastSearchUsedServerFavorites=!1,this.requestUpdate();let t=null;if(this._isMusicAssistantEntity())try{const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId);t=await this._resolveArtistUri(e,s)}catch(i){console.warn("yamp: error resolving artist URI:",i)}this._searchArtistAlbums(e,t).catch(i=>{console.error("yamp: artist quick-search failed:",i)})}async _resolveMediaUri(e,t,i={},s){if(!t||!this.hass)return null;try{const r=await Ci(this.hass,s);if(!r)return null;const n={type:"call_service",domain:"music_assistant",service:"search",service_data:{name:t,media_type:[e],...r&&r!=="auto"&&{config_entry_id:r},...i},return_response:!0},o=(await this.hass.connection.sendMessagePromise(n))?.response?.[`${e}s`]||[];if(!o.length)return null;const l=t.trim().toLowerCase(),c=(i.artist||"").trim().toLowerCase();if(e==="album"){const p=o.find(_=>{const m=(_.name||"").toLowerCase(),f=c?_.artists?.some(y=>{const v=(y.name||"").toLowerCase();return v.includes(c)||c.includes(v)}):!0;return(m===l||m.includes(l)||l.includes(m))&&f});if(p?.uri)return p.uri}const u=o.find(p=>(p.name||"").toLowerCase()===l);if(u?.uri)return u.uri;const h=o.find(p=>{const _=(p.name||"").toLowerCase();return _===l||_.includes(l)||l.includes(_)});return h?.uri?h.uri:o[0]?.uri||null}catch(r){return console.warn(`yamp: Failed to resolve ${e} URI:`,r),null}}_resolveAlbumUri(e,t,i){return this._resolveMediaUri("album",e,t?{artist:t}:{},i)}_resolveArtistUri(e,t){return this._resolveMediaUri("artist",e,{},t)}_resolvePlaylistUri(e,t){return this._resolveMediaUri("playlist",e,{},t)}async _searchAlbumFromNowPlaying(){const e=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj,t=e?.attributes?.media_album_name||"",i=e?.attributes?.media_artist||"";if(!t)return;this._openedSearchFromNowPlaying=!0,this._showEntityOptions=!0,this._showSearchInSheet=!0,this._searchInputAutoFocused=!1,this._searchError="",this._searchResults=[],this._searchQuery="",this._searchAttempted=!1,this._searchResultsByType={},this._currentSearchQuery="",this._searchHierarchy=[],this._searchBreadcrumb="",this._usingMusicAssistant=!1,this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this._lastSearchUsedServerFavorites=!1,this.requestUpdate();let s=null;if(this._isMusicAssistantEntity())try{const r=this._getSearchEntityId(this._selectedIndex),n=await this._resolveTemplateAtActionTime(r,this.currentEntityId);s=await this._resolveAlbumUri(t,i,n)}catch(r){console.warn("yamp: error resolving album URI:",r)}this._searchAlbumTracks(t,i,s).catch(r=>{console.error("yamp: album quick-search failed:",r)})}_showSearchSheetInOptions(e="default"){if(this._showSearchInSheet=!0,this._searchHeadersRetracted=!1,this._searchHeaderOffset=0,this._searchHeaderNaturalHeight=0,this._lastSearchResultsScrollTop=0,this._searchInputAutoFocused=!1,this._searchError="",this._searchResults=[],this._searchQuery="",this._searchAttempted=!1,this._searchResultsByType={},this._currentSearchQuery="",this._searchHierarchy=[],this._searchBreadcrumb="",this._usingMusicAssistant=!1,this._favoritesFilterActive=this.config.default_search_favorites===!0,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this.requestUpdate(),setTimeout(()=>{let t;switch(e){case"recently-played":t=this._toggleRecentlyPlayedFilter(!0);break;case"next-up":t=this._toggleUpcomingFilter(!0);break;case"recommendations":t=this._toggleRecommendationsFilter(!0);break;default:{const i=this.config.default_search_filter==="all"?null:this.config.default_search_filter;t=this._doSearch(i)}break}t?.catch&&t.catch(i=>{console.error("yamp: search initialization failed:",i)})},100),!this._disableSearchAutofocus){const t=this._alwaysCollapsed&&this._expandOnSearch?300:200;setTimeout(()=>{const i=this.renderRoot.querySelector("#search-input-box");i?i.focus():setTimeout(()=>{const s=this.renderRoot.querySelector("#search-input-box");s&&s.focus()},200)},t)}}_openQuickSearchOverlay(e="default"){this._quickMenuInvoke=!0,this._showEntityOptions=!0,this._showSearchSheetInOptions(e),setTimeout(()=>{this._notifyResize()},0)}_handleNavigate(e,t=!1){if(typeof e!="string"||!e.trim())return;const i=e.trim(),s=new CustomEvent("hass-navigate",{detail:{path:i},bubbles:!0,composed:!0});if(this.dispatchEvent(s),s.defaultPrevented)return;let r;if(i.startsWith("#"))window.location.hash=i,r=!0;else if(/^https?:\/\//i.test(i)){if(t){window.open(i,"_blank","noopener,noreferrer");return}window.location.assign(i),r=!0}else this.hass?.navigate?(this.hass.navigate(i),r=!0):(window.history.pushState(null,"",i),r=!0);r&&window.dispatchEvent(new CustomEvent("location-changed",{detail:{replace:!1}}))}_hideSearchSheetInOptions(){this._cardType==="search"||this._cardType==="up_next"||(this._openedSearchFromNowPlaying=!1,this._showSearchInSheet=!1,this._searchHeadersRetracted=!1,this._searchHeaderOffset=0,this._searchHeaderNaturalHeight=0,this._lastSearchResultsScrollTop=0,this._searchError="",this._searchResults=[],this._searchQuery="",this._searchDisplaySortOverride=null,this._searchInputAutoFocused=!1,this._searchLoading=!1,this._searchAttempted=!1,this._searchResultsByType={},this._currentSearchQuery="",this._searchHierarchy=[],this._searchBreadcrumb="",this._addToPlaylistTarget=null,this._dismissMenuAfterPlaylistAdd=!1,this._recommendationsFilterActive=!1,this._lastSearchUsedServerFavorites=!1,this._quickMenuInvoke&&(this._showEntityOptions=!1,this._quickMenuInvoke=!1),this.requestUpdate(),setTimeout(()=>{this._notifyResize()},0))}_closeMenuIfOpen(){this._queueActionsMenuOpenId&&this._closeQueueActionsMenu()}_sortSearchResults(e,t=null){if(this._upcomingFilterActive||this._recentlyPlayedFilterActive||this._recommendationsFilterActive)return Array.isArray(e)?[...e]:[];const i=t??this._getConfiguredSearchResultsSortMode(),s=Array.isArray(e)?[...e]:[];if(i==="random"){for(let r=s.length-1;r>0;r--){const n=Math.floor(Math.random()*(r+1));[s[r],s[n]]=[s[n],s[r]]}return s}return s}_getConfiguredSearchResultsSortMode(){const e=this.config?.search_results_sort,t=typeof e=="string"?e:"default";return this._mapLegacySortOption(t)}_mapLegacySortOption(e){return e?{title_asc:"name",title_desc:"name_desc",artist_asc:"artist_name",artist_desc:"artist_name_desc"}[e]||e:"default"}_isSortableSearchMode(e){return!(!e||e==="default"||e==="random"||e==="random_play_count")}_getOppositeSearchSortMode(e){return!e||e==="default"||e==="random"||e==="random_play_count"?null:e.endsWith("_desc")?e.replace(/_desc$/,""):`${e}_desc`}_shouldShowSearchSortToggle(){return this._upcomingFilterActive||this._recentlyPlayedFilterActive||this._recommendationsFilterActive?!1:this._isSortableSearchMode(this._getConfiguredSearchResultsSortMode())}_toggleSearchResultsSortDirection(){if(!this._shouldShowSearchSortToggle()){this._searchDisplaySortOverride=null;return}const e=this._getConfiguredSearchResultsSortMode(),t=this._getOppositeSearchSortMode(e);if(!t){this._searchDisplaySortOverride=null;return}this._searchDisplaySortOverride===t?this._searchDisplaySortOverride=null:this._searchDisplaySortOverride=t,this._searchResultsByType={},this._doSearch(this._searchMediaClassFilter==="all"?null:this._searchMediaClassFilter,{orderBy:this._getActiveSearchDisplaySortMode()}),this.requestUpdate()}_getActiveSearchDisplaySortMode(){if(this._upcomingFilterActive||this._recentlyPlayedFilterActive||this._recommendationsFilterActive)return"default";if(!this._shouldShowSearchSortToggle())return this._getConfiguredSearchResultsSortMode();const e=this._searchDisplaySortOverride;return e&&this._isSortableSearchMode(e)?e:this._getConfiguredSearchResultsSortMode()}_getSearchSortToggleIcon(){const e=this._getActiveSearchDisplaySortMode();return this._isSortableSearchMode(e)?e.endsWith("_desc")?"mdi:sort-descending":"mdi:sort-ascending":"mdi:sort-variant"}_getSearchSortToggleTitle(){const e=this._getActiveSearchDisplaySortMode();if(!this._isSortableSearchMode(e))return"Toggle search result order";const t=e.endsWith("_desc");return`Sort by ${(t?e.replace(/_desc$/,""):e).replace(/_/g," ")} ${t?"descending":"ascending"}`}_getDisplaySearchResults(){const e=Array.isArray(this._searchResults)?this._searchResults:[];if(this._searchHierarchy.some(t=>t.type==="album"||t.type==="playlist"||t.type==="artist")&&this._searchQuery&&this._searchQuery.trim()!==""){const t=this._searchQuery.trim().toLowerCase();return e.filter(i=>{const s=(i.title||i.name||"").toLowerCase(),r=(i.artist||"").toLowerCase();return s.includes(t)||r.includes(t)})}return e}_getSearchResultsLimit(){const e=Number(this.config?.search_results_limit);return Number.isFinite(e)?e===0?0:Math.min(Math.max(e,1),1e3):20}_getSearchResultsCount(){return this._getDisplaySearchResults().length}_shouldShowSearchResultsCount(){return this._isNarrowViewport||!this._usingMusicAssistant||this._searchLoading?!1:this._getSearchResultsCount()>0?!0:this._searchAttempted||this._initialFavoritesLoaded||this._favoritesFilterActive||this._recentlyPlayedFilterActive||this._upcomingFilterActive||this._recommendationsFilterActive}_getSearchResultsCountLabel(){const e=this._getSearchResultsCount();return`${e} ${d(e===1?"search.result":"search.results")}`}async _doSearch(e=null,t={}){this._searchAttempted=!0,this._closeMenuIfOpen(),this._setSearchHeadersRetracted(!1),this._lastSearchResultsScrollTop=0,this._searchMediaClassFilter=e&&e!=="favorites"?e:"all";const i=!!(t.favorites||(this._favoritesFilterActive||this._initialFavoritesLoaded||this._lastSearchUsedServerFavorites)&&!t.clearFilters);i&&(this._favoritesFilterActive=!0);const s=!!(t.isRecentlyPlayed||this._recentlyPlayedFilterActive&&!t.clearFilters),r=!!(t.isUpcoming||this._upcomingFilterActive&&!t.clearFilters),n=!!(t.isRecommendations||this._recommendationsFilterActive&&!t.clearFilters);this._currentSearchQuery!==this._searchQuery&&(this._searchResultsByType={},this._currentSearchQuery=this._searchQuery);const o=this._getActiveSearchDisplaySortMode(),l=`${e||"all"}${i?"_favorites":""}${s?"_recently_played":""}${r?"_upcoming":""}${n?"_recommendations":""}_sort_${o}`,c=!!t.force;if(this._searchResultsByType[l]&&!c){this._searchTimeoutHandle&&(clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=null),this._latestSearchToken=0,this._searchResults=this._sortSearchResults(this._searchResultsByType[l]),this._searchLoading=!1,this._searchError="",this.requestUpdate();return}t.silent||(this._searchLoading=!0,this._searchError="",this._searchResults=[],this.requestUpdate());const u=t.token||Date.now();this._latestSearchToken=u;const h=p=>this._handleProgressiveSearchResults(p,l,u);this._searchTimeoutHandle&&clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=window.setTimeout(()=>{this._latestSearchToken===u&&this._searchLoading&&(this._searchLoading=!1,this._searchError="Search timed out. Try again.",this.requestUpdate())},this.config?.search_timeout_ms?Number(this.config.search_timeout_ms):15e3);try{const p=this._getSearchEntityId(this._selectedIndex),_=await this._resolveTemplateAtActionTime(p,this.currentEntityId);let m;if(this._addToPlaylistTarget&&e==="playlist"&&this._massQueueAvailable){this._initialFavoritesLoaded=!1;try{const k=await Ii(this.hass,_);if(k){const E={limit:I_};this._searchQuery&&this._searchQuery.trim().length>0&&(E.search=this._searchQuery.trim());const S=this._getActiveSearchDisplaySortMode();S&&S!=="default"&&(E.order_by=S);const C={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{...k&&k!=="auto"&&{config_entry_id:k},command:"music/playlists/library_items",data:E},return_response:!0},$=await this.hass.connection.sendMessagePromise(C);let P=[];if(Array.isArray($?.response)?P=$.response:Array.isArray($?.response?.response)?P=$.response.response:Array.isArray($?.response?.items)?P=$.response.items:Array.isArray($?.response?.results)&&(P=$.response.results),Array.isArray(P)){const F=this._getSearchResultsLimit()||30;m={results:P.filter(T=>T.is_editable===!0).map(T=>Vt(T)).filter(Boolean).slice(0,F),usedMusicAssistant:!0}}}}catch(k){console.warn("yamp: error fetching direct native playlists for add-to-target logic",k)}m||(m={results:[],usedMusicAssistant:!0}),this._lastSearchUsedServerFavorites=!1}else if(s)this._initialFavoritesLoaded=!1,m=await Gd(this.hass,_,e,this._getSearchResultsLimit(),{onChunk:h}),this._lastSearchUsedServerFavorites=!1;else if(r){this._initialFavoritesLoaded=!1;const k=Math.min(250,this._getSearchResultsLimit());m=await this._getUpcomingQueue(this.hass,_,k),this._lastSearchUsedServerFavorites=!1}else if(n)this._initialFavoritesLoaded=!1,m=await this._getRecommendations(this.hass,_,e,this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!1;else if(i){this._initialFavoritesLoaded=!1;const k=this._getActiveSearchDisplaySortMode();m=await Ln(this.hass,_,this._searchQuery,e,{...t,favorites:!0,orderBy:k!=="default"?k:void 0},this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!0}else if((!this._searchQuery||this._searchQuery.trim()==="")&&!i&&!s&&(e==="all"||!e)){const k=this._getActiveSearchDisplaySortMode();m=await qn(this.hass,_,e==="favorites"?null:e,this._getSearchResultsLimit(),{onChunk:h,orderBy:k!=="default"?k:void 0}),(!this._searchQuery||this._searchQuery.trim()==="")&&(this._initialFavoritesLoaded=!0),this._lastSearchUsedServerFavorites=!0}else{this._initialFavoritesLoaded=!1;const k=this._getActiveSearchDisplaySortMode();m=await Ln(this.hass,_,this._searchQuery,e,{...t,orderBy:k!=="default"?k:void 0},this._getSearchResultsLimit()),this._lastSearchUsedServerFavorites=!1}let f=m.results||[];this._usingMusicAssistant=m.usedMusicAssistant||!1;const y=this._currentSearchQuery!==this._searchQuery;y&&(this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1);let v=Array.isArray(f)?f:[];if(this._latestSearchToken!==u)return;if((s||r||n)&&this._searchQuery&&this._searchQuery.trim()!==""){const k=this._searchQuery.trim().toLowerCase();v=v.filter(E=>{const S=(E.title||"").toLowerCase(),C=(E.artist||"").toLowerCase(),$=(E.album||"").toLowerCase();return S.includes(k)||C.includes(k)||$.includes(k)})}if(!y&&this._favoritesFilterActive&&!this._lastSearchUsedServerFavorites&&(v=await this._applyLocalFavoritesFilter(v),this._latestSearchToken!==u))return;this._searchResultsByType[l]=v,this._searchResults=this._sortSearchResults(v);const x=Array.isArray(this._searchResults)?this._searchResults.length:0;this._searchTotalRows=Math.max(15,x)}catch(p){this._searchError=p&&p.message||"Unknown error",this._searchResults=[],this._searchTotalRows=0}this._latestSearchToken===u&&this._searchTimeoutHandle&&(clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=null),this._latestSearchToken===u&&(this._latestSearchToken=0),this._searchLoading=!1,this.requestUpdate(),setTimeout(()=>this._notifyResize(),0)}async _playCurrentCollection(){if(this._searchHierarchy.length===0)return;const e=this._searchHierarchy[this._searchHierarchy.length-1];if(!e||!e.uri){this._searchError=d("search.play_collection_error"),this.requestUpdate();return}const t={media_content_id:e.uri,media_content_type:e.type};await this._playMediaFromSearch(t)}_handleSearchSubmit(){if(this._searchHierarchy.some(i=>i.type==="album"||i.type==="playlist"||i.type==="artist"))return;const e=this._keepFiltersOnSearch;e||(this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1);const t=!e;this._doSearch(this._searchMediaClassFilter==="all"?null:this._searchMediaClassFilter,{clearFilters:t})}_handleProgressiveSearchResults(e,t,i){if(!Array.isArray(e)||!e.length||this._latestSearchToken!==i)return;const s=(this._searchResultsByType[t]||[]).concat(e);this._searchResultsByType[t]=s,this._searchResults=this._sortSearchResults(s);const r=Array.isArray(s)?s.length:0;this._searchTotalRows=Math.max(15,r),this.requestUpdate()}_getVisibleSearchFilterClasses(){const e=this.entityObjs?.[this._selectedIndex]||null,t=new Set(e?.hidden_filter_chips||[]);return $i.filter(i=>!t.has(i))}async _playMediaFromSearch(e,t){if(this._isDragging){t&&(t.stopPropagation(),t.preventDefault());return}const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId);if(this._mediaSessionManager?.startPlaybackGesture(s),this._searchError="",!await this._performSearchPlayback(e,s)){this._searchError="Unable to start playback. Please try again.",this.requestUpdate();return}const{shouldDismiss:r,shouldReset:n}=this._getSearchDismissBehavior();r?(this._showSearchInSheet&&(this._closeEntityOptions(),this._showSearchInSheet=!1),this._hideSearchSheetInOptions()):n?this._showSearchSheetInOptions():this.requestUpdate()}async _performSearchPlayback(e,t){if(e.queue_item_id&&this._upcomingFilterActive&&this._isMusicAssistantEntity()&&this._massQueueAvailable)try{const n=this._getMusicAssistantState()?.entity_id;if(n)return await this.hass.callService("mass_queue","play_queue_item",{entity:n,queue_item_id:e.queue_item_id}),this._advanceQueueInUI(e.queue_item_id,!0),!0}catch(n){return console.error("yamp: Error playing queue item:",n),await this.hass.callService("media_player","media_next_track",{entity_id:t}),!0}if(!t)return!1;const i=this._collectPlaybackMonitorIds(t),s=this._snapshotPlaybackState(i);if(!await this._invokePlayMedia(t,e))return!1;if(await this._waitForPlaybackChange(s,i))return!0;const r=this._snapshotPlaybackState(i);return await this._invokePlayMedia(t,e)?await this._waitForPlaybackChange(r,i):!1}_collectPlaybackMonitorIds(e){const t=new Set;e&&t.add(e);const i=this._getPlaybackEntityId(this._selectedIndex);i&&t.add(i);const s=this.currentEntityId;s&&t.add(s);const r=this._getActualResolvedMaEntityForState(this._selectedIndex);return r&&t.add(r),Array.from(t).filter(Boolean)}_snapshotPlaybackState(e){const t={};return Array.isArray(e)&&e.forEach(i=>{const s=i?this.hass?.states?.[i]:null;t[i]={state:s?.state??null,mediaId:s?.attributes?.media_content_id??null,mediaTitle:s?.attributes?.media_title??null}}),t}async _waitForPlaybackChange(e,t,i=2500){if(!Array.isArray(t)||t.length===0)return!0;const s=Date.now();for(;Date.now()-s<i;){await this._delay(150);for(const r of t){if(!r)continue;const n=this.hass?.states?.[r];if(!n)continue;if(this._isEntityPlaying(n))return!0;const o=e[r]||{},l=n.attributes?.media_content_id??null,c=n.attributes?.media_title??null;if(l&&l!==o.mediaId||c&&c!==o.mediaTitle||!o.mediaId&&l||!o.mediaTitle&&c)return!0}}return!1}async _performSearchOptionAction(e,t){if(t==="add_to_playlist"){this._addToPlaylistTarget=e,this._searchHierarchy.push({type:"select_playlist",name:d("search.add_to_playlist"),query:this._searchQuery,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=d("search.select_playlist").replace("{track}",e.title),this._searchQuery="",this._currentSearchQuery="",this._searchMediaClassFilter="playlist",this._resetSearchContext(),this._removeSearchSwipeHandlers(),await this._doSearch("playlist",{clearFilters:!0});return}const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId);try{const r={entity_id:s,media_id:e.media_content_id,media_type:e.media_content_type,enqueue:t};if(this._radioModeActive&&(r.radio_mode=!0),await this.hass.callService("music_assistant","play_media",r),this._invalidateUpcomingCache(),t==="replace"){const{shouldDismiss:n,shouldReset:o}=this._getSearchDismissBehavior();n?this._closeEntityOptions():o&&this._showSearchSheetInOptions(),this._activeSearchRowMenuId=null}else{this._successSearchRowMenuId=e.media_content_id,this.requestUpdate();const n=this._dismissMenuAfterPlaylistAdd&&t==="add_to_playlist";setTimeout(()=>{this._successSearchRowMenuId=null,this._activeSearchRowMenuId=null,n&&(this._closeEntityOptions(),this._dismissMenuAfterPlaylistAdd=!1),this.requestUpdate()},2e3)}}catch(r){console.error("Failed to perform search option action:",r),this._searchError="Action failed: "+r.message,this.requestUpdate()}}async _invokePlayMedia(e,t){try{return this._mediaSessionManager?.startPlaybackGesture(e),this._radioModeActive?await this.hass.callService("music_assistant","play_media",{entity_id:e,media_id:t.media_content_id,media_type:t.media_content_type,radio_mode:!0}):await Wd(this.hass,e,t),!0}catch(i){return console.error("yamp: Error starting playback from search:",i),!1}}_delay(e){return new Promise(t=>{(typeof window<"u"?window:globalThis).setTimeout(t,e)})}async _queueMediaFromSearch(e){const t=this._getSearchEntityId(this._selectedIndex),i=await this._resolveTemplateAtActionTime(t,this.currentEntityId);this._radioModeActive?this.hass.callService("music_assistant","play_media",{entity_id:i,media_id:e.media_content_id,media_type:e.media_content_type,enqueue:"add",radio_mode:!0}):this.hass.callService("media_player","play_media",{entity_id:i,media_content_type:e.media_content_type,media_content_id:e.media_content_id,enqueue:"next"}),this._invalidateUpcomingCache(),this._showSearchSuccessToast()}async _searchArtistAlbums(e,t=null){if(this._searchHierarchy.push({type:"artist",name:e,query:this._searchQuery,uri:t,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=`Albums by ${e}`,this._searchResultsByType={},this._currentSearchQuery="",this._searchMediaClassFilter="album",this._searchResults=[],this._searchLoading=!0,this._searchQuery="",this.requestUpdate(),this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._initialFavoritesLoaded=!1,this._removeSearchSwipeHandlers(),t&&this._isMusicAssistantEntity())try{const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId),r={type:"call_service",domain:"media_player",service:"browse_media",service_data:{entity_id:s,media_content_id:t},return_response:!0},n=await this.hass.connection.sendMessagePromise(r),o=((n?.response?.[s]?.result||n?.result||{}).children||[]).filter(l=>l.media_class==="album"||l.media_content_type==="album");if(o.length>0){this._searchQuery="",this._searchResults=this._sortSearchResults(o),this._searchTotalRows=Math.max(15,o.length),this._searchAttempted=!0,this._searchLoading=!1,this.requestUpdate();return}}catch{}await this._doSearch("album",{artist:e,clearFilters:!0})}_goBackInSearch(){if(this._dismissMenuAfterPlaylistAdd){this._closeEntityOptions(),this._dismissMenuAfterPlaylistAdd=!1;return}if(this._searchHierarchy.length===0)return;this._searchResults=[],this._searchLoading=!0,this.requestUpdate();const e=this._searchHierarchy.pop();if((e.type==="select_playlist"||e.type==="select_track_for_playlist")&&(this._addToPlaylistTarget=null),this._searchQuery=e.query,this._currentSearchQuery=e.query,this._searchResultsByType={},this._searchMediaClassFilter=e.filter||"all",this._searchHierarchy.length===0){if(this._openedSearchFromNowPlaying){this._openedSearchFromNowPlaying=!1,this._closeEntityOptions();return}this._searchBreadcrumb="",this._doSearch(this._searchMediaClassFilter==="all"?null:this._searchMediaClassFilter)}else{const t=this._searchHierarchy[this._searchHierarchy.length-1];if(t.type==="artist")this._searchBreadcrumb=`Albums by ${t.name}`,this._searchMediaClassFilter="album",this._doSearch("album",{artist:t.name});else if(t.type==="album"){this._searchBreadcrumb=`Tracks from ${t.name}`,this._searchMediaClassFilter="track";const i=this._searchHierarchy.find(n=>n.type==="artist"),s=i?i.name:null;if(t.uri&&this._isMusicAssistantEntity()){this._searchQuery="",this._currentSearchQuery="",this._searchResults=[],this._searchLoading=!0,this.requestUpdate(),this._loadAlbumTracks(t.uri,t.name,s).then(()=>{this._scrollToTop()});return}const r={album:t.name};s&&(r.artist=s),this._doSearch("track",r)}else if(t.type==="playlist"){if(this._searchBreadcrumb=`Tracks from ${t.name}`,this._searchMediaClassFilter="track",t.uri&&this._isMusicAssistantEntity()){this._searchQuery="",this._currentSearchQuery="",this._searchResults=[],this._searchLoading=!0,this.requestUpdate(),this._loadPlaylistTracks(t.uri,t.name).then(()=>{this._scrollToTop()});return}this._doSearch("track")}}}_scrollToTop(){const e=this.shadowRoot?.querySelector(".search-sheet-results");e&&(e.scrollTop=0),this._updateSearchHeaderPosition(0,!0),this._lastSearchResultsScrollTop=0}_getSearchHeaderHeight(){const e=this.shadowRoot?.querySelector(".search-header-panel");if(!e)return this._searchHeaderNaturalHeight||120;const t=e.offsetHeight;return t>0?(this._searchHeaderNaturalHeight=t,t):this._searchHeaderNaturalHeight||120}_updateSearchHeaderPosition(e,t=!1){const i=this._getSearchHeaderHeight(),s=Math.max(0,Math.min(i,e));this._searchHeaderOffset=s;const r=s>=i&&i>0;this._searchHeadersRetracted=r;const n=this.shadowRoot?.querySelector(".search-header-panel");if(!n)return;t?(n.classList.add("smooth-transition"),clearTimeout(this._searchHeaderTransitionTimer),this._searchHeaderTransitionTimer=setTimeout(()=>{n.classList.remove("smooth-transition")},280)):n.classList.remove("smooth-transition"),n.classList.toggle("retracted",r),n.style.marginTop=s>0?`-${s}px`:"0px";const o=i>0?s/i:0,l=Math.max(0,Math.min(1,1-o));if(n.style.opacity=s>0?l.toFixed(3):"",r){n.style.pointerEvents="none";const c=n.querySelector("#search-input-box");c&&document.activeElement===c&&c.blur()}else n.style.pointerEvents=""}_getSearchResultsElement(){return(!this._cachedSearchResultsElement||!this._cachedSearchResultsElement.isConnected)&&(this._cachedSearchResultsElement=this.shadowRoot?.querySelector(".virtualized-results-wrapper, .queue-results-wrapper, .search-sheet-results, .entity-options-search-results")),this._cachedSearchResultsElement}_applySearchHeaderDelta(e){if(this.config?.pin_search_headers===!0)return;const t=this._getSearchHeaderHeight();if(t<=0)return;const i=this._searchHeaderOffset||0,s=Math.max(0,Math.min(t,i+e));s!==i&&this._updateSearchHeaderPosition(s,!1)}_setSearchHeadersRetracted(e,t=!0){const i=this._getSearchHeaderHeight(),s=e?i:0;this._updateSearchHeaderPosition(s,t)}_handleSearchResultsScroll(e,t){if(t||this.config?.pin_search_headers===!0||this._isDragging)return;const i=e.currentTarget||e.target;if(!i)return;const s=i.scrollTop,r=this._lastSearchResultsScrollTop??s,n=s-r;this._lastSearchResultsScrollTop=s;const o=Math.max(0,i.scrollHeight-i.clientHeight);if(o<=0){(this._searchHeaderOffset||0)!==0&&this._updateSearchHeaderPosition(0,!1);return}if(s<=0){this._updateSearchHeaderPosition(0,!1);return}s>=o-6||n!==0&&this._applySearchHeaderDelta(n)}_handleHeaderWheel(e,t){if(e.cancelable&&e.preventDefault(),e.stopPropagation(),t||this.config?.pin_search_headers===!0){const i=this._getSearchResultsElement();i&&(i.scrollTop+=e.deltaY);return}this._applySearchHeaderDelta(e.deltaY)}_handleHeaderTouchStart(e){e.touches&&e.touches.length===1&&(this._headerTouchStartY=e.touches[0].clientY,this._headerTouchStartX=e.touches[0].clientX)}_handleHeaderTouchMove(e,t){if(t||this.config?.pin_search_headers===!0||this._headerTouchStartY==null||!e.touches||e.touches.length!==1)return;const i=e.touches[0].clientY,s=e.touches[0].clientX,r=i-this._headerTouchStartY,n=s-this._headerTouchStartX;Math.abs(r)>Math.abs(n)&&(e.cancelable&&e.preventDefault(),this._applySearchHeaderDelta(-r),this._headerTouchStartY=i,this._headerTouchStartX=s)}_handleHeaderTouchEnd(){this._headerTouchStartY=null,this._headerTouchStartX=null}_handleSearchContainerWheel(e,t){if(t||this.config?.pin_search_headers===!0)return;const i=this._getSearchHeaderHeight(),s=this._searchHeaderOffset||0;if(e.deltaY<0){const r=this._getSearchResultsElement();(!r||r.scrollTop<=5)&&(e.cancelable&&e.preventDefault(),this._applySearchHeaderDelta(e.deltaY))}else e.deltaY>0&&s<i&&(e.cancelable&&e.preventDefault(),this._applySearchHeaderDelta(e.deltaY))}_handleSearchResultsWheel(e,t){if(t||this.config?.pin_search_headers===!0)return;const i=e.currentTarget||e.target,s=i?i.scrollTop:0;e.deltaY<0&&s<=5&&((this._searchHeaderOffset||0)>0&&e.cancelable&&e.preventDefault(),this._applySearchHeaderDelta(e.deltaY))}_handleResultsTouchStart(e){e.touches&&e.touches.length===1&&(this._resultsTouchStartY=e.touches[0].clientY,this._resultsTouchStartX=e.touches[0].clientX)}_handleResultsTouchMove(e,t){if(t||this.config?.pin_search_headers===!0||this._resultsTouchStartY==null||!e.touches||e.touches.length!==1)return;const i=e.currentTarget,s=i?i.scrollTop:0,r=e.touches[0].clientY-this._resultsTouchStartY,n=e.touches[0].clientX-this._resultsTouchStartX;Math.abs(r)>Math.abs(n)&&r>0&&s<=5&&((this._searchHeaderOffset||0)>0&&e.cancelable&&e.preventDefault(),this._applySearchHeaderDelta(-r),this._resultsTouchStartY=e.touches[0].clientY,this._resultsTouchStartX=e.touches[0].clientX)}_handleResultsTouchEnd(){this._resultsTouchStartY=null,this._resultsTouchStartX=null}_isClickableSearchResult(e){return e?this._addToPlaylistTarget||this._searchHierarchy[this._searchHierarchy.length-1]?.type==="select_track_for_playlist"?!0:!!e.is_browsable:!1}_getSearchResultClickTitle(e){if(!this._isClickableSearchResult(e))return"";if(this._addToPlaylistTarget&&e.media_class==="playlist")return d("search.add_to_playlist");if(this._searchHierarchy[this._searchHierarchy.length-1]?.type==="select_track_for_playlist"&&(e.media_class==="track"||e.media_content_type==="track")){const t=this._getMockItemFromCurrentTrack();return d("search.select_track_for_playlist",{"{track}":t?.title||"","{artist}":t?.media_artist||""})}return Sd(e)}_invalidateUpcomingCache(){if(!this._upcomingFilterActive){const e=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`;this._searchResultsByType&&delete this._searchResultsByType[e],this.requestUpdate()}}_toggleRadioMode(){this._radioModeActive=!this._radioModeActive,this.requestUpdate()}async _toggleFavoritesFilter(){const e=this._favoritesFilterActive||this._initialFavoritesLoaded;if(this._favoritesFilterActive=!e,this._favoritesFilterActive&&(this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1),this._favoritesFilterActive){const t=this._searchMediaClassFilter;try{await this._doSearch(t,{favorites:!0})}catch(i){console.error("yamp: Error searching favorites:",i)}}else{const t=this._searchMediaClassFilter;this._lastSearchUsedServerFavorites=!1,this._initialFavoritesLoaded=!1,await this._doSearch(t,{clearFilters:!0})}}async _toggleRecentlyPlayedFilter(e=null){const t=typeof e=="boolean"?e:!this._recentlyPlayedFilterActive;if(this._recentlyPlayedFilterActive=t,this._recentlyPlayedFilterActive&&(this._favoritesFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1),this._recentlyPlayedFilterActive){this._searchQuery="";try{const i=this._searchMediaClassFilter||"all",s=this._keepFiltersOnSearch&&i!=="favorites"?i:"all";await this._doSearch(s,{isRecentlyPlayed:!0,clearFilters:!0})}catch(i){console.error("yamp: Error in _doSearch for recently played:",i)}}else if(this._searchQuery&&this._searchQuery.trim()!==""){const i=this._searchMediaClassFilter;await this._doSearch(i)}else{const i=this._searchMediaClassFilter||"all";this._restoreSearchResultsFromCache(i)||(this._keepFiltersOnSearch&&i!=="all"?await this._doSearch(i):await this._doSearch("favorites"))}}async _toggleUpcomingFilter(e=null){if(this.hass)if(e!==null?this._upcomingFilterActive=e:this._upcomingFilterActive=!this._upcomingFilterActive,this._upcomingFilterActive&&(this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1),this._upcomingFilterActive){this._searchQuery="";const t=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`;delete this._searchResultsByType[t],await this._subscribeToQueueUpdates();try{const i=this._searchMediaClassFilter||"all",s=this._keepFiltersOnSearch&&i!=="favorites"?i:"all";await this._doSearch(s,{isUpcoming:!0,clearFilters:!0})}catch(i){console.error("yamp: Error in _doSearch for upcoming queue:",i)}}else if(this._unsubscribeFromQueueUpdates(),this._searchQuery&&this._searchQuery.trim()!==""){const t=this._searchMediaClassFilter;await this._doSearch(t)}else{const t=this._searchMediaClassFilter||"all";this._restoreSearchResultsFromCache(t)||(this._keepFiltersOnSearch&&t!=="all"?await this._doSearch(t):await this._doSearch("favorites"))}}async _toggleRecommendationsFilter(e=null){const t=typeof e=="boolean"?e:!this._recommendationsFilterActive;if(this._recommendationsFilterActive=t,this._recommendationsFilterActive){this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._initialFavoritesLoaded=!1,this._searchQuery="";try{const i=await this._isMassQueueIntegrationAvailable(this.hass);if(this._hasMassQueueIntegration=i,this._massQueueAvailable=i,!i){this._recommendationsFilterActive=!1,this._searchError="Recommendations require the Music Assistant queue integration.",this.requestUpdate();return}const s=this._keepFiltersOnSearch&&this._searchMediaClassFilter&&this._searchMediaClassFilter!=="favorites"?this._searchMediaClassFilter:"all";await this._doSearch(s,{isRecommendations:!0,clearFilters:!0})}catch(i){console.error("yamp: Error in _doSearch for recommendations:",i),this._searchError="Unable to load recommendations.",this._recommendationsFilterActive=!1,this.requestUpdate()}}else if(this._searchQuery&&this._searchQuery.trim()!==""){const i=this._searchMediaClassFilter;await this._doSearch(i)}else{const i=this._searchMediaClassFilter||"all";this._restoreSearchResultsFromCache(i)||(this._keepFiltersOnSearch&&i!=="all"?await this._doSearch(i):await this._doSearch("favorites"))}}_restoreSearchResultsFromCache(e){const t=this._getActiveSearchDisplaySortMode(),i=`${e}_sort_${t}`;return this._searchResultsByType[i]||this._searchResultsByType[e]?(this._searchResults=this._sortSearchResults(this._searchResultsByType[i]||this._searchResultsByType[e]),this.requestUpdate(),!0):!1}async _getUpcomingQueue(e,t,i=250){try{const s=await this._isMassQueueIntegrationAvailable(e);if(this._massQueueAvailable=s,this._hasMassQueueIntegration=s,s)try{const r=await this._getUpcomingQueueWithMassQueue(e,t,i);return!r.results||r.results.length===0?(this._massQueueAvailable=!1,await this._getUpcomingQueueOriginal(e,t,i)):r}catch{return this._massQueueAvailable=!1,await this._getUpcomingQueueOriginal(e,t,i)}return await this._getUpcomingQueueOriginal(e,t,i)}catch(s){return console.error("yamp: Error getting upcoming queue:",s),this._massQueueAvailable=!1,{results:[],usedMusicAssistant:!1}}}async _getRecommendations(e,t,i=null,s=20){try{const r=await this._isMassQueueIntegrationAvailable(e);if(this._hasMassQueueIntegration=r,this._massQueueAvailable=r,!r)throw new Error("mass_queue integration unavailable");const n=Math.max(s||0,this._getSearchResultsLimit()),o={type:"call_service",domain:"mass_queue",service:"get_recommendations",service_data:{entity:t},return_response:!0},l=(await e.connection.sendMessagePromise(o))?.response;let c=[];Array.isArray(l)?c=l:l&&typeof l=="object"&&(Array.isArray(l[t])?c=l[t]:Object.values(l).forEach(y=>{Array.isArray(y)?c.push(...y):y&&typeof y=="object"&&c.push(y)}),c.length===0&&Array.isArray(l.items)&&(c=l.items));const u=y=>{if(!y||typeof y!="string")return"track";const v=y.toLowerCase();switch(v){case"song":case"music":return"track";case"podcast_episode":case"episode":return"podcast";case"station":return"radio";case"directory":case"folder":return"playlist";default:return v}},h=y=>y?y.toString().replace(/[_-]+/g," ").replace(/\s+/g," ").trim().replace(/\b\w/g,v=>v.toUpperCase()):"",p=i&&i!=="all"?u(i):null,_=[];let m=0;const f=n>0?n:1/0;for(const y of c){if(m>=f)break;const v=y?.name||y?.sort_name||"",x=typeof y?.image=="string"&&y.image.trim()!==""?y.image:null,k=Array.isArray(y?.items)&&y.items.length>0?y.items:[y];for(const E of k){if(m>=f)break;const S=E?.uri||E?.item_id;if(!S)continue;const C=typeof E?.image=="string"&&E.image.trim()!==""?E.image:null,$=E?.media_type||y?.media_type||"music",P=u($);if(p&&P!==p)continue;const F=h($)||h(P),T=h(E?.provider||y?.provider),I=F?[F]:[];v?I.push(v):T&&I.push(T),_.push({media_content_id:S,media_content_type:$||P,media_class:P,title:E?.name||E?.sort_name||v||"Recommendation",artist:I.join(" \u2022 "),thumbnail:C||x||null,provider:E?.provider||y?.provider||null}),m+=1}}return{results:_,usedMusicAssistant:!0,source:"mass_queue"}}catch(r){throw console.error("yamp: Error getting recommendations from mass_queue:",r),r}}async _isMassQueueIntegrationAvailable(e){if(this.config.disable_mass_queue===!0)return!1;try{const t=await e.callWS({type:"get_services"});let i=!1;return Array.isArray(t)?i=t.some(s=>s.domain==="mass_queue"):t&&typeof t=="object"&&(i=Object.prototype.hasOwnProperty.call(t,"mass_queue")||Object.keys(t).some(s=>s==="mass_queue")),!!i}catch{return!1}}async _getUpcomingQueueWithMassQueue(e,t,i=250){try{const s=e.states[t]?.attributes?.media_content_id,r={type:"call_service",domain:"mass_queue",service:"get_queue_items",service_data:{entity:t,limit_before:5},return_response:!0},n=Number.isFinite(i)&&i>0?i:250;r.service_data.limit_after=n,r.service_data.limit=n+6;const o=(await e.connection.sendMessagePromise(r))?.response?.[t];if(!Array.isArray(o))throw new Error("Invalid response from mass_queue");let l=o.findIndex(h=>h.active===!0||h.state==="playing");l===-1&&s&&(l=o.findIndex(h=>h.media_content_id===s||h.queue_item_id===s)),l===-1&&o.length>0&&(l=0);const c=l>=0?o.slice(l+1):o,u=(n>0?c.slice(0,n):c).map((h,p)=>({media_content_id:h.media_content_id||h.queue_item_id||`queue_${p}`,media_content_type:"track",media_class:"track",title:h.media_title||h.name||"Unknown Track",artist:h.media_artist||h.artist||"Unknown Artist",album:h.media_album_name||h.album||"Unknown Album",thumbnail:h.media_image||h.image||null,duration:h.duration||null,position:p+1,queue_item_id:h.queue_item_id||null}));return{results:u,usedMusicAssistant:!0,total:u.length,source:"mass_queue"}}catch(s){throw console.error("yamp: mass_queue service call failed:",s),s}}_enqueueQueueOperation(e){this._queueOpsTotal===this._queueOpsCompleted&&(this._queueOpsTotal=0,this._queueOpsCompleted=0),this._queueOpsTotal++,this._queueOpsTimeout&&(clearTimeout(this._queueOpsTimeout),this._queueOpsTimeout=null),this._queueOperationPromise=this._queueOperationPromise.then(async()=>{try{await e(),this._invalidateUpcomingCache()}catch(t){console.error("yamp: Queue operation failed:",t),this._refreshQueue()}finally{this._queueOpsCompleted++,this._queueOpsCompleted===this._queueOpsTotal&&(this._queueOpsTimeout&&clearTimeout(this._queueOpsTimeout),this._queueOpsTimeout=setTimeout(()=>{this._queueOpsCompleted===this._queueOpsTotal&&(this._queueOpsTotal=0,this._queueOpsCompleted=0,this._queueOpsTimeout=null)},1500))}})}async _moveQueueItemUp(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._moveQueueItemInUI(e,"up"),this._enqueueQueueOperation(async()=>{await this.hass.callService("mass_queue","move_queue_item_up",{entity:t,queue_item_id:e})})}catch{this._refreshQueue()}}async _moveQueueItemDown(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._moveQueueItemInUI(e,"down"),this._enqueueQueueOperation(async()=>{await this.hass.callService("mass_queue","move_queue_item_down",{entity:t,queue_item_id:e})})}catch{this._refreshQueue()}}async _moveQueueItemNext(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._moveQueueItemInUI(e,"next"),this._enqueueQueueOperation(async()=>{await this.hass.callService("mass_queue","move_queue_item_next",{entity:t,queue_item_id:e})})}catch{this._refreshQueue()}}async _removeQueueItem(e){try{const t=this._getMusicAssistantState()?.entity_id;if(!t)throw new Error("No Music Assistant entity found");this._removeQueueItemFromUI(e),this._enqueueQueueOperation(async()=>{await this.hass.callService("mass_queue","remove_queue_item",{entity:t,queue_item_id:e})})}catch{this._refreshQueue()}}_showQueueError(e){console.error("yamp: Queue operation failed:",e)}_moveQueueItemInUI(e,t){const i=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,s=this._searchResultsByType[i];if(!Array.isArray(s))return;const r=s.findIndex(o=>o.queue_item_id===e);if(r===-1)return;let n;switch(t){case"up":n=Math.max(0,r-1);break;case"down":n=Math.min(s.length-1,r+1);break;case"next":n=0;break;default:return}this._moveQueueItemInUIByIndex(r,n)}async _onQueueItemMoved(e){const{oldIndex:t,newIndex:i}=e.detail;if(t===i)return;const s=this._getDisplaySearchResults();if(!s||t<0||t>=s.length||i<0||i>=s.length)return;const r=s[t],n=r?.queue_item_id;if(!n){console.error("yamp: No queue_item_id found on dragged item",r);return}try{const o=this._getMusicAssistantState()?.entity_id;if(!o)throw new Error("No Music Assistant entity found");this._moveQueueItemInUIByIndex(t,i),this._enqueueQueueOperation(async()=>{const l=Math.abs(i-t);if(1+i<l){await this.hass.callService("mass_queue","move_queue_item_next",{entity:o,queue_item_id:n});for(let c=0;c<i;c++)await this.hass.callService("mass_queue","move_queue_item_down",{entity:o,queue_item_id:n})}else{const c=i<t?"move_queue_item_up":"move_queue_item_down";for(let u=0;u<l;u++)await this.hass.callService("mass_queue",c,{entity:o,queue_item_id:n})}})}catch(o){console.error("yamp: Failed to move queue item via drag and drop:",o),this._refreshQueue()}}_moveQueueItemInUIByIndex(e,t){const i=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,s=this._searchResultsByType[i];if(!Array.isArray(s)||e<0||e>=s.length||t<0||t>=s.length)return;const r=s.splice(e,1)[0];s.splice(t,0,r),this._searchResults=[...s],s.forEach((n,o)=>{n.position=o+1}),r._justMoved=!0,setTimeout(()=>{delete r._justMoved,this.requestUpdate()},1e3),this._latestSearchToken=Date.now(),this.requestUpdate()}_advanceQueueInUI(e=null,t=!1){if(!this._upcomingFilterActive)return;t&&(this._latestManualShiftTime=Date.now());const i=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`;let s=this._searchResultsByType[i];if(!(!Array.isArray(s)||s.length===0)){if(e){const r=s.findIndex(n=>n.queue_item_id===e);r>=0&&(s=s.slice(r+1))}else s=s.slice(1);this._searchResultsByType[i]=s,this._searchResults=s,this._latestSearchToken=Date.now(),this.requestUpdate()}}_removeQueueItemFromUI(e){const t=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,i=this._searchResultsByType[t];if(!Array.isArray(i))return;const s=i.filter(r=>r.queue_item_id!==e);this._searchResultsByType[t]=s,this._searchResults=s,this.requestUpdate()}_isMusicAssistantEntity(){const e=this.currentActivePlaybackStateObj||this.currentStateObj;if(this._looksLikeMusicAssistantState(e))return!0;const t=this._getMusicAssistantState();return t?!!(Ei(t)||t.attributes?.mass_player_id||t.attributes?.active_queue||this._upcomingFilterActive&&this._searchResultsByType[`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`]?.some(i=>i.queue_item_id)):!1}_looksLikeMusicAssistantState(e){return e?Ei(e):!1}_isMusicContentType(){const e=[this.metadataStateObj,this.currentActivePlaybackStateObj,this.currentPlaybackStateObj,this.currentStateObj,this._getMusicAssistantState()];for(const t of e){const i=t?.attributes?.media_content_type;if(typeof i=="string"&&i.trim().length>0)return i.trim().toLowerCase()==="music"}return!1}_getTransferQueueTargets(){if(!this.hass?.services?.music_assistant?.transfer_queue)return[];const e=this._selectedIndex;if(e==null||e<0)return[];const t=this._getActualResolvedMaEntityForState(e);if(!t)return[];const i=new Set([t]),s=[];for(let r=0;r<this.entityObjs.length;r++){const n=this.entityObjs[r];if(!n)continue;const o=this._getActualResolvedMaEntityForState(r);if(!o||i.has(o))continue;const l=this.hass?.states?.[o],c=this.hass?.states?.[n.entity_id];if(!this._looksLikeMusicAssistantState(l)&&!this._looksLikeMusicAssistantState(c))continue;i.add(o);const u=l||c,h=n?.name||je(this.hass,c)||je(this.hass,l)||n.entity_id;s.push({index:r,entityId:n.entity_id,maEntityId:o,name:h,subtitle:o!==n.entity_id?o:n.entity_id,state:u?.state,icon:u?.attributes?.icon||"mdi:music"})}return s}_hasQueueInState(e){if(!e)return!1;const t=e.attributes||{},i=["queue_items","queue","media_queue","mass_queue_items"];for(const o of i){const l=t[o];if(Array.isArray(l)&&l.length>0)return!0}const s=["queue_length","queue_size","queue_total_items","queue_pending","queue_remaining","items_in_queue"];for(const o of s){const l=t[o];if(typeof l=="number"&&l>0)return!0}if(t.next_item||t.current_queue_item||t.queue_item_id||t.media_content_id)return!0;const r=`${this._searchMediaClassFilter||"all"}_upcoming_sort_default`,n=this._searchResultsByType?.[r];return!!(Array.isArray(n)&&n.length>0)}async _updateTransferQueueAvailability({refresh:e=!1}={}){const t=this._getMusicAssistantState(),i=this._looksLikeMusicAssistantState(t);if(!t||!i)return this._hasTransferQueueForCurrent&&(this._hasTransferQueueForCurrent=!1,this.requestUpdate()),!1;let s=this._hasQueueInState(t);if(!s&&e&&this.hass){const r=this._getActualResolvedMaEntityForState(this._selectedIndex);if(r)try{const n=await this._getUpcomingQueue(this.hass,r,2);(Array.isArray(n?.results)&&n.results.length>0||this._isEntityPlaying(t)||t.state==="paused"||t.attributes?.media_content_id)&&(s=!0)}catch{}}return this._hasTransferQueueForCurrent!==s&&(this._hasTransferQueueForCurrent=s,this.requestUpdate()),s}_canShowTransferQueueOption(){return this._hasTransferQueueForCurrent?this._getTransferQueueTargets().length>0:!1}_openTransferQueue(){this._showEntityOptions=!0,this._showTransferQueue=!0,this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),this.requestUpdate()}_closeTransferQueue(){this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),this.requestUpdate()}async _transferQueueTo(e){if(!e)return;const t=this._getActualResolvedMaEntityForState(this._selectedIndex);if(t){this._transferQueuePendingTarget=e.maEntityId,this._transferQueueStatus=null,this.requestUpdate();try{const i=this._buildTransferQueuePayload(t,e.maEntityId);await this.hass.callService("music_assistant","transfer_queue",i),this._transferQueueStatus={type:"success",message:`Queue sent to ${e.name}.`};const s=typeof e.index=="number"?e.index:this.entityIds.indexOf(e.entityId);if(s!=null&&s>=0){const r=this._pinnedIndex;if(r===null||r===s){this._selectedIndex=s,this._manualSelect=!0,this._manualSelectPlayingSet=null,r===s&&(this._pinnedIndex=s);const n=e.maEntityId||this.entityObjs[s]?.entity_id;n&&(this._playbackLingerByIdx||(this._playbackLingerByIdx={}),this._playbackLingerByIdx[s]={entityId:n,until:Date.now()+5e3},this._lastPlayingEntityIdByChip||(this._lastPlayingEntityIdByChip={}),this._lastPlayingEntityIdByChip[s]=n),this._ensureResolvedMaForIndex(s),this._ensureResolvedVolForIndex(s),this._ensureResolvedHiddenControlsForIndex(s)}}await this._updateTransferQueueAvailability({refresh:!0}),this._transferQueueAutoCloseTimer&&clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=setTimeout(()=>{this._transferQueueAutoCloseTimer=null,this._showEntityOptions&&this._showTransferQueue&&this._dismissWithAnimation()},2e3)}catch(i){console.error("yamp: Error transferring queue:",i),this._transferQueueStatus={type:"error",message:i?.message||"Failed to transfer queue."},this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null)}finally{this._transferQueuePendingTarget=null,this.requestUpdate()}}}_buildTransferQueuePayload(e,t){const i=this.hass?.services?.music_assistant?.transfer_queue?.fields||{},s={},r=(l,c)=>{for(const u of l)if(i[u]!==void 0)return s[u]=c,!0;return!1},n=r(["source_player","source_player_id","player_id","source"],e),o=r(["target_player","target_player_id","target","entity_id"],t);if(!n){const l=o?"source_player":"entity_id";s[l]=e}return o||(s.entity_id===e?(s.entity_id=t,s.source_player=e):(s.source_player,s.entity_id=t)),s}_refreshQueue({delayMs:e=50}={}){this._upcomingFilterActive&&(this._queueRefreshTimer&&clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=setTimeout(()=>{if(this._queueRefreshTimer=null,!this._upcomingFilterActive)return;const t=Date.now();this._latestSearchToken=t,this._doSearch("all",{isUpcoming:!0,clearFilters:!0,silent:!0,force:!0,token:t}).catch(i=>{console.error("yamp: Error refreshing queue:",i)})},e))}async _subscribeToQueueUpdates(){if(!this._queueEventSubscription)try{this._queueEventSubscription=await this.hass.connection.subscribeEvents(e=>{e.data.type},"mass_queue")}catch(e){console.error("yamp: Failed to subscribe to queue updates:",e)}}_unsubscribeFromQueueUpdates(){this._queueEventSubscription&&(this._queueEventSubscription(),this._queueEventSubscription=null)}async _getUpcomingQueueOriginal(e,t,i=20){try{const s={type:"call_service",domain:"music_assistant",service:"get_queue",service_data:{entity_id:t},return_response:!0},r=(await e.connection.sendMessagePromise(s))?.response?.[t];if(!r)return{results:[],usedMusicAssistant:!0};const n=[];if(!r)return{results:[],usedMusicAssistant:!0};if(r.next_item){const o=r.next_item;n.push({media_content_id:o.media_item?.uri||"queue_next",media_content_type:o.media_item?.media_type||"track",media_class:"track",title:o.name||o.media_item?.name||"Unknown Track",artist:o.media_item?.artists?.[0]?.name||"Unknown Artist",album:o.media_item?.album?.name||"Unknown Album",thumbnail:o.media_item?.image||null,duration:o.duration||null,position:1,queue_item_id:o.queue_item_id||null})}return{results:n,usedMusicAssistant:!0,total:n.length,source:"music_assistant"}}catch(s){throw console.error("yamp: Error in original queue method:",s),s}}async _applyLocalFavoritesFilter(e=[]){if(!this._favoritesFilterActive)return e;const t=this._getSearchEntityId(this._selectedIndex),i=await this._resolveTemplateAtActionTime(t,this.currentEntityId);try{const s=(await qn(this.hass,i,this._searchMediaClassFilter,this._getSearchResultsLimit())).results||[],r=new Set(s.map(n=>n.media_content_id));return e.filter(n=>r.has(n.media_content_id))}catch{return e}}async _handleSearchResultClick(e,t){if(this._isDragging){t&&(t.stopPropagation(),t.preventDefault());return}if(this._isClickableSearchResult(e)){if(this._searchHierarchy[this._searchHierarchy.length-1]?.type==="select_track_for_playlist"&&(e.media_class==="track"||e.media_content_type==="track")){this._performSearchOptionAction(e,"add_to_playlist");return}if(this._addToPlaylistTarget&&e.media_class==="playlist"){this._loadingSearchRowMenuId=e.media_content_id,this.requestUpdate();try{const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId),r=await Ii(this.hass,s);if(r){const n={command:"music/playlists/add_playlist_tracks",data:{db_playlist_id:e.item_id||e.media_content_id?.split("/").pop(),uris:[this._addToPlaylistTarget.media_content_id]}};r&&r!=="auto"&&(n.config_entry_id=r),await this.hass.callService("mass_queue","send_command",n),this._showSearchSuccessToast(e.media_content_id,"playlist")}}catch(i){console.error("Failed to add to playlist:",i),this._errorSearchRowMenuId=e.media_content_id,this.requestUpdate(),setTimeout(()=>{this._errorSearchRowMenuId=null,this.requestUpdate()},3e3)}finally{this._loadingSearchRowMenuId=null,this.requestUpdate()}this._addToPlaylistTarget=null,setTimeout(()=>{this._dismissMenuAfterPlaylistAdd?(this._closeEntityOptions(),this._dismissMenuAfterPlaylistAdd=!1):this._goBackInSearch()},nl);return}if(e.media_class==="artist")await this._searchArtistAlbums(e.title,e.media_content_id);else if(e.media_class==="album"){let i=null;this._searchHierarchy.length>0&&this._searchHierarchy[this._searchHierarchy.length-1].type==="artist"?i=this._searchHierarchy[this._searchHierarchy.length-1].name:e.artist&&(i=e.artist),await this._searchAlbumTracks(e.title,i,e.media_content_id)}else if(e.media_class==="track")e.album&&await this._searchAlbumTracks(e.album,e.artist,e.album_uri);else if(e.media_class==="playlist"){let i=e.media_content_id||e.uri||null;if(!i&&this._isMusicAssistantEntity())try{const s=this._getSearchEntityId(this._selectedIndex),r=await this._resolveTemplateAtActionTime(s,this.currentEntityId);i=await this._resolvePlaylistUri(e.title,r)}catch(s){console.warn("yamp: error resolving playlist URI:",s)}await this._searchPlaylistTracks(e.title,i)}}}async _loadAlbumTracks(e,t,i=null){if(e&&await this._isMassQueueIntegrationAvailable(this.hass)){const r=await this._fetchMassQueueTracks(e,"get_album_tracks");if(r&&r.length>0){this._setSearchResultsFromMassQueue(r,"");return}}if(e&&this._isMusicAssistantEntity())try{const r=this._getSearchEntityId(this._selectedIndex),n=await this._resolveTemplateAtActionTime(r,this.currentEntityId),o={type:"call_service",domain:"media_player",service:"browse_media",service_data:{entity_id:n,media_content_id:e},return_response:!0},l=await this.hass.connection.sendMessagePromise(o),c=(l?.response?.[n]?.result||l?.result||{}).children||[];if(c.length>0){this._searchQuery="",this._searchResults=this._sortSearchResults(c),this._searchTotalRows=Math.max(15,c.length),this._searchAttempted=!0,this._searchLoading=!1,this.requestUpdate();return}}catch(r){console.error("yamp: Failed to browse album tracks:",r)}this._searchQuery="",this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._initialFavoritesLoaded=!1;const s={album:t,clearFilters:!0};i&&(s.artist=i),await this._doSearch("track",s)}async _searchAlbumTracks(e,t,i=null){this._searchHierarchy.push({type:"album",name:e,query:this._searchQuery,uri:i,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=`Tracks from ${e}`,this._searchResultsByType={},this._currentSearchQuery="",this._searchMediaClassFilter="track",this._searchResults=[],this._searchLoading=!0,this._searchQuery="",this.requestUpdate(),this._removeSearchSwipeHandlers(),await this._loadAlbumTracks(i,e,t)}async _loadPlaylistTracks(e,t){if(e&&await this._isMassQueueIntegrationAvailable(this.hass)){const i=await this._fetchMassQueueTracks(e,"get_playlist_tracks");if(i&&i.length>0)return this._setSearchResultsFromMassQueue(i,""),!0}if(e&&this._isMusicAssistantEntity())try{const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId),r={type:"call_service",domain:"media_player",service:"browse_media",service_data:{entity_id:s,media_content_id:e},return_response:!0},n=await this.hass.connection.sendMessagePromise(r),o=(n?.response?.[s]?.result||n?.result||{}).children||[];if(o.length>0)return this._searchQuery="",this._searchResults=this._sortSearchResults(o),this._searchTotalRows=Math.max(15,o.length),this._searchAttempted=!0,this._searchLoading=!1,this.requestUpdate(),!0}catch(i){console.error("yamp: Failed to browse playlist tracks:",i)}return this._searchQuery="",this._searchResults=[],this._searchAttempted=!0,this._searchLoading=!1,this.requestUpdate(),!1}async _searchPlaylistTracks(e,t){this._searchHierarchy.push({type:"playlist",name:e,query:this._searchQuery,uri:t,filter:this._searchMediaClassFilter}),this._searchBreadcrumb=`Tracks from ${e}`,this._searchResultsByType={},this._currentSearchQuery="",this._searchMediaClassFilter="track",this._searchResults=[],this._searchLoading=!0,this._searchQuery="",this.requestUpdate(),this._removeSearchSwipeHandlers(),await this._loadPlaylistTracks(t,e)}async _fetchMassQueueTracks(e,t){try{if(!await this._isMassQueueIntegrationAvailable(this.hass))return null;const i=await Ii(this.hass);let s=[];if(i&&e)try{const r={type:"call_service",domain:"mass_queue",service:t,service_data:{...i&&i!=="auto"&&{config_entry_id:i},uri:e},return_response:!0},n=await this.hass.connection.sendMessagePromise(r);n?.response?.tracks&&(s=n.response.tracks)}catch(r){console.warn(`yamp: mass_queue.${t} failed with config_entry_id, trying fallback with entity_id`,r);const n=this._getMusicAssistantState()?.entity_id;if(n)try{const o={type:"call_service",domain:"mass_queue",service:t,service_data:{entity:n,uri:e},return_response:!0},l=await this.hass.connection.sendMessagePromise(o);l?.response?.tracks&&(s=l.response.tracks)}catch(o){throw console.warn(`yamp: mass_queue.${t} fallback with entity_id also failed.`,o),r}else throw r}return s}catch(i){return console.error(`yamp: Error fetching ${t} via mass_queue:`,i),null}}_setSearchResultsFromMassQueue(e,t){this._searchResults=e.map(i=>({media_content_id:i.media_content_id,media_content_type:"track",media_class:"track",title:i.media_title,artist:i.media_artist,album:i.media_album_name,thumbnail:i.media_image,duration:i.duration,is_browsable:!1,favorite:i.favorite})),this._searchQuery=t,this._searchTotalRows=Math.max(15,e.length),this._searchAttempted=!0,this._searchLoading=!1,this.requestUpdate()}_notifyResize(){this.dispatchEvent(new Event("iron-resize",{bubbles:!0,composed:!0}))}_setupAdaptiveTextObserver(){!this._adaptiveText||this._textResizeObserver||typeof ResizeObserver>"u"||!this.isConnected||(this._textResizeObserver=new ResizeObserver(()=>this._updateAdaptiveTextScale()),this._textResizeObserver.observe(this),this._updateAdaptiveTextScale())}_teardownAdaptiveTextObserver(){this._textResizeObserver&&(this._textResizeObserver.disconnect(),this._textResizeObserver=null),this._currentTextScale=null,this._setAdaptiveTextVars(1,new Set)}_setAdaptiveTextVars(e,t,i){if(!this.style)return;const s=t||this._adaptiveTextTargets,r=Number.isFinite(e)?e:1,n=r.toFixed(2);this.style.setProperty("--yamp-text-scale",n);for(const[_,m]of Object.entries(F_)){const f=!!s?.has(_);this.style.setProperty(m,f?n:"1")}const o=!!s?.has("details"),l=Number.isFinite(i)?i:r,c=o?l.toFixed(2):"1",u=o?this._calculateDetailsLineHeight(l):1.2;this.style.setProperty("--yamp-details-scale",c),this.style.setProperty("--yamp-details-line-height",u.toFixed(2));const h=o?1:3;this.style.setProperty("--yamp-details-max-lines",h.toString()),this.style.setProperty("--yamp-details-line-clamp",o?"unset":"3"),this.style.setProperty("--yamp-details-display",o?"block":"-webkit-box"),this.style.setProperty("--yamp-details-white-space",o?"nowrap":"normal");const p=!!s?.has("lyrics");this.style.setProperty("--yamp-text-scale-lyrics",p?l.toFixed(2):"1")}_updateAdaptiveTextObserverState(){this._adaptiveText&&this.isConnected?this._setupAdaptiveTextObserver():this._teardownAdaptiveTextObserver()}_handleGlobalScroll(){this._adaptiveText&&(this._suspendAdaptiveScaling=!0,this._pendingAdaptiveScaleUpdate=!0,clearTimeout(this._adaptiveScrollTimer),this._adaptiveScrollTimer=setTimeout(()=>{this._suspendAdaptiveScaling=!1,this._pendingAdaptiveScaleUpdate&&(this._pendingAdaptiveScaleUpdate=!1,this._updateAdaptiveTextScale(!0))},400))}_handleViewportResize(){this._updateViewportFlags()}_updateViewportFlags(){if(typeof window>"u")return;const e=typeof document<"u"?document.documentElement?.clientWidth:0,t=window.innerWidth||e||0,i=t>0?t<=520:this._isNarrowViewport,s=this._isMobile;let r=!1;i!==this._isNarrowViewport&&(this._isNarrowViewport=i,r=!0),s!==this._lastIsMobile&&(this._lastIsMobile=s,this._idleImageTemplate&&(this._idleImageTemplateNeedsResolve=!0),this._backgroundImageTemplate&&(this._backgroundImageTemplateNeedsResolve=!0),this._fontColorTemplate&&(this._fontColorTemplateNeedsResolve=!0),r=!0),r&&this.requestUpdate()}_updateAdaptiveTextScale(e=!1){if(!this._adaptiveText)return;if(this._suspendAdaptiveScaling&&!e){this._pendingAdaptiveScaleUpdate=!0;return}const t=this.getBoundingClientRect(),i=t?.width||0;if(!i)return;const s=this._getAdaptiveBaselineHeight(this._lastRenderedCollapsed||!1),r=t?.height&&t.height>0?t.height:s||i,n=i/360,o=r/360,l=n*.8+o*.2,c=Math.max(.85,Math.min(1.4,l)),u=this._calculateDetailsScale(i,r),h=this._currentTextScale===null||Math.abs(this._currentTextScale-c)>.01,p=this._currentDetailsScale===null||Math.abs(this._currentDetailsScale-u)>.02;if(!this._lyricsActive){const _=this.shadowRoot?.querySelector(".card-lower-content");_&&_.offsetHeight>50&&(this._lastNonLyricsLowerContentHeight=_.offsetHeight)}(h||p)&&(this._currentTextScale=c,this._currentDetailsScale=u,this._setAdaptiveTextVars(c,void 0,u),this.requestUpdate()),this._updateMarquee()}_getTranslateX(e){if(!e)return 0;const t=window.getComputedStyle(e),i=t.transform||t.webkitTransform;if(!i||i==="none")return 0;try{return new DOMMatrix(i).m41}catch{const s=i.match(/matrix\(([^)]+)\)/);if(s){const r=s[1].split(",");return parseFloat(r[4])||0}return 0}}_clearMarqueeResetTimer(e){this._marqueeManualResetTimers?.has(e)&&(clearTimeout(this._marqueeManualResetTimers.get(e)),this._marqueeManualResetTimers.delete(e))}_resetMarqueeManual(e,t,i=!0){if(!e||!t)return;if(this._clearMarqueeResetTimer(e),!e.hasAttribute("data-marquee-manual")){e.removeAttribute("data-marquee-paused"),e.removeAttribute("data-marquee-dragging");return}t.style.transition="transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",t.style.transform="translateX(0px)";let s=!1;const r=()=>{s||(s=!0,t.removeEventListener("transitionend",n),t.style.transition="",t.style.transform="",t.style.opacity="",e.removeAttribute("data-marquee-manual"),e.removeAttribute("data-marquee-paused"),e.removeAttribute("data-marquee-dragging"),this._clearMarqueeResetTimer(e),i&&this.isConnected&&e.hasAttribute("data-marquee")&&e.hasAttribute("data-marquee-sequential")&&(e.getAttribute("data-marquee-active")==="true"?(e.removeAttribute("data-marquee-active"),e.offsetWidth,e.setAttribute("data-marquee-active","true")):this.renderRoot?.querySelector(".details [data-marquee-sequential='true'][data-marquee-active='true']")||e.setAttribute("data-marquee-active","true")))},n=l=>{l.target!==t||l.propertyName!=="transform"||r()};t.addEventListener("transitionend",n);const o=setTimeout(r,450);this._marqueeManualResetTimers.set(e,o)}_setupMarqueeManualInteraction(e){const{container:t,inner:i,overflow:s}=e;if(!t||!i||s<=4)return;let r=!1,n=null,o=0,l=0,c=0,u=0,h=!1,p=!1,_=0,m=0,f=0;const y=S=>{S.button!==void 0&&S.button!==0||(this._clearMarqueeResetTimer(t),i._clearMomentum&&i._clearMomentum(),r=!0,n=S.pointerId,o=S.clientX,l=S.clientY,_=S.clientX,m=Date.now(),f=0,h=!1,p=!1,t.hasAttribute("data-marquee-manual")?(i.style.transition="",u=this._getTranslateX(i)):(u=this._getTranslateX(i),t.setAttribute("data-marquee-paused","true")),c=u)},v=S=>{if(!r||S.pointerId!==n||p)return;const C=S.clientX-o,$=S.clientY-l;if(!h){if(Math.abs($)>6&&Math.abs($)>Math.abs(C)){p=!0,t.removeAttribute("data-marquee-paused");return}if(Math.abs(C)>6){h=!0,t.setAttribute("data-marquee-manual","true"),t.setAttribute("data-marquee-dragging","true"),i.style.transition="",i.style.opacity="1";try{t.setPointerCapture&&t.setPointerCapture(S.pointerId)}catch{}}}if(h){S.cancelable&&S.preventDefault();const P=Date.now(),F=P-m;F>0&&(f=(S.clientX-_)/F,_=S.clientX,m=P);const T=-Math.ceil(s),I=Math.min(0,Math.max(T,u+C));c=I,i.style.transform=`translateX(${I}px)`}},x=S=>{if(!(!r||S.pointerId!==n)){r=!1,t.removeAttribute("data-marquee-dragging");try{t.hasPointerCapture&&t.hasPointerCapture(n)&&t.releasePointerCapture(n)}catch{}if(h){this._suppressMarqueeClick=!0,this._suppressMarqueeClickTimer&&clearTimeout(this._suppressMarqueeClickTimer),this._suppressMarqueeClickTimer=setTimeout(()=>{this._suppressMarqueeClick=!1},350);const C=-Math.ceil(s);if(Math.abs(f)>.25){const $=f*160,P=Math.min(0,Math.max(C,c+$));c=P,i.style.transition="transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",i.style.transform=`translateX(${P}px)`,i._clearMomentum=()=>{i.removeEventListener("transitionend",i._clearMomentum),i.style.transition="",i._clearMomentum=null},i.addEventListener("transitionend",i._clearMomentum)}if(S.pointerType==="touch"){this._clearMarqueeResetTimer(t);const $=setTimeout(()=>{this._resetMarqueeManual(t,i)},3e3);this._marqueeManualResetTimers.set(t,$)}else if(!(this.renderRoot?.querySelector(".details")?.matches(":hover")||t.matches(":hover"))){this._clearMarqueeResetTimer(t);const $=setTimeout(()=>{this._resetMarqueeManual(t,i)},3e3);this._marqueeManualResetTimers.set(t,$)}}else t.removeAttribute("data-marquee-paused")}},k=S=>{if(!(Math.abs(S.deltaX)>Math.abs(S.deltaY)))return;this._clearMarqueeResetTimer(t);const C=S.deltaX;if(C===0)return;let $=1;S.deltaMode===1?$=20:S.deltaMode===2&&($=100);const P=C*$;S.cancelable&&S.preventDefault(),t.hasAttribute("data-marquee-manual")||(c=this._getTranslateX(i),t.setAttribute("data-marquee-manual","true"),i.style.transition="",i.style.opacity="1",i.style.transform=`translateX(${c}px)`);const F=-Math.ceil(s),T=Math.min(0,Math.max(F,c-P));if(c=T,i.style.transform=`translateX(${T}px)`,!(this.renderRoot?.querySelector(".details")?.matches(":hover")||t.matches(":hover"))){const I=setTimeout(()=>{this._resetMarqueeManual(t,i)},3e3);this._marqueeManualResetTimers.set(t,I)}},E=S=>{this._suppressMarqueeClick&&(S.stopImmediatePropagation(),S.preventDefault())};t.addEventListener("pointerdown",y),t.addEventListener("pointermove",v),t.addEventListener("pointerup",x),t.addEventListener("pointercancel",x),t.addEventListener("wheel",k,{passive:!1}),t.addEventListener("click",E,!0),this._marqueeCleanups.push(()=>{t.removeEventListener("pointerdown",y),t.removeEventListener("pointermove",v),t.removeEventListener("pointerup",x),t.removeEventListener("pointercancel",x),t.removeEventListener("wheel",k),t.removeEventListener("click",E,!0)})}_cleanupMarquee(){this._marqueeSequentialTimer&&(clearTimeout(this._marqueeSequentialTimer),this._marqueeSequentialTimer=null),this._marqueeAnimationEndHandler&&this._marqueeObservedElements&&(this._marqueeObservedElements.forEach(e=>{e.removeEventListener("animationend",this._marqueeAnimationEndHandler)}),this._marqueeObservedElements=null),this._marqueeCleanups&&(this._marqueeCleanups.forEach(e=>e()),this._marqueeCleanups=[]),this._marqueeManualResetTimers&&(this._marqueeManualResetTimers.forEach(e=>clearTimeout(e)),this._marqueeManualResetTimers.clear()),this._suppressMarqueeClickTimer&&(clearTimeout(this._suppressMarqueeClickTimer),this._suppressMarqueeClickTimer=null),this._suppressMarqueeClick=!1,this.renderRoot&&this.renderRoot.querySelectorAll(".details [data-marquee='true']").forEach(e=>{e.removeAttribute("data-marquee-manual"),e.removeAttribute("data-marquee-paused"),e.removeAttribute("data-marquee-dragging");const t=e.querySelector(".marquee-inner");t&&(t.style.transform="",t.style.transition="",t.style.opacity="")}),this._lastMarqueeKey=null}_updateMarquee(){if(!this.isConnected||!this.renderRoot)return;const e=this.renderRoot.querySelector(".details .track-options-title"),t=this.renderRoot.querySelector(".details .artist"),i=_=>{if(!_)return{container:null,inner:null,overflow:0,text:""};const m=_.querySelector(".marquee-inner");if(!m)return{container:_,inner:null,overflow:0,text:""};const f=_.clientWidth,y=m.scrollWidth-f,v=m.textContent||"";return{container:_,inner:m,overflow:y,text:v}},s=i(e),r=i(t),n=s.overflow>4,o=r.overflow>4,l=`${s.text}:${Math.round(s.overflow/2)*2}:${n}|${r.text}:${Math.round(r.overflow/2)*2}:${o}`;if(this._lastMarqueeKey===l)return;this._cleanupMarquee(),this._lastMarqueeKey=l;const c=30,u=_=>{const m=_.overflow/c,f=Math.max(5,Math.round((m+4.3)*10)/10);_.container.style.setProperty("--yamp-marquee-distance",`-${Math.ceil(_.overflow)}px`),_.container.style.setProperty("--yamp-marquee-duration",`${f}s`),_.container.setAttribute("data-marquee","true")},h=_=>{_.container&&(_.container.removeAttribute("data-marquee"),_.container.removeAttribute("data-marquee-sequential"),_.container.removeAttribute("data-marquee-active"),_.container.removeAttribute("data-marquee-manual"),_.container.removeAttribute("data-marquee-paused"),_.container.removeAttribute("data-marquee-dragging"),_.container.style.removeProperty("--yamp-marquee-distance"),_.container.style.removeProperty("--yamp-marquee-duration"),_.inner&&(_.inner.style.transform="",_.inner.style.transition="",_.inner.style.opacity=""))};if(n&&o){u(s),u(r),s.container.setAttribute("data-marquee-sequential","true"),r.container.setAttribute("data-marquee-sequential","true"),s.container.setAttribute("data-marquee-active","true"),r.container.removeAttribute("data-marquee-active"),this._setupMarqueeManualInteraction(s),this._setupMarqueeManualInteraction(r);const _=[s,r];let m=0;this._marqueeAnimationEndHandler=f=>{if(f.animationName!=="yamp-marquee"||!this.isConnected||this._lastMarqueeKey!==l)return;const y=_[m];y?.container&&y.container.removeAttribute("data-marquee-active"),m=(m+1)%_.length;const v=_[m];this._marqueeSequentialTimer=setTimeout(()=>{!this.isConnected||this._lastMarqueeKey!==l||v?.container&&v.container.setAttribute("data-marquee-active","true")},600)},this._marqueeObservedElements=[s.inner,r.inner].filter(Boolean),this._marqueeObservedElements.forEach(f=>{f.addEventListener("animationend",this._marqueeAnimationEndHandler)})}else n?(u(s),s.container.removeAttribute("data-marquee-sequential"),s.container.removeAttribute("data-marquee-active"),h(r),this._setupMarqueeManualInteraction(s)):o?(u(r),r.container.removeAttribute("data-marquee-sequential"),r.container.removeAttribute("data-marquee-active"),h(s),this._setupMarqueeManualInteraction(r)):(h(s),h(r));const p=this.renderRoot.querySelector(".details");if(p&&(n||o)){const _=()=>{[s,r].forEach(m=>{m.container?.hasAttribute("data-marquee-manual")&&this._resetMarqueeManual(m.container,m.inner)})};p.addEventListener("mouseleave",_),this._marqueeCleanups.push(()=>{p.removeEventListener("mouseleave",_)})}}_calculateDetailsScale(e,t){if(!this._adaptiveTextTargets?.has("details"))return 1;const i=e/360,s=Math.min(3.25,Math.max(1,i*.85+.15)),r=this._lastSpacerRendered!==!1,n=this._lastVolumeRendered!==!1;let o=144;if(!this._alternateProgressBar){const h=this.config?.progress_bar_height??16;o+=Number(h)}r&&(o+=48),n&&(o+=72);const l=Math.max(1,1+(t-o)/56),c=Math.min(3.25,l);let u=Math.min(s,c);return r||(u=c),Math.max(1,u)}_calculateDetailsLineHeight(e){const t=Math.max(1,Math.min(e,2.6)),i=Math.max(0,t-1);return Math.min(1.55,1.2+i*.35)}_getAdaptiveBaselineHeight(e=!1){const t=this._cardHeight;if(typeof t=="number"&&Number.isFinite(t)&&t>0)return t;if(typeof t=="string"){const i=t.trim();if(i){const s=Number(i);if(Number.isFinite(s)&&s>0)return s}}return e||this._alwaysCollapsed?this._collapsedBaselineHeight||220:350}async _resolveIdleImageTemplate(){if(!(!this._idleImageTemplate||this._resolvingIdleImageTemplate||!this.hass)){this._resolvingIdleImageTemplate=!0;try{const e=this._getTemplateContext(),t=await ki(this.hass,this._idleImageTemplate,e);this._idleImageTemplateResult=(t??"").toString().trim()}catch{this._idleImageTemplateResult=""}finally{this._resolvingIdleImageTemplate=!1,this._idleImageTemplateNeedsResolve=!1,this.requestUpdate()}}}async _resolveBackgroundImageTemplate(){if(!(!this._backgroundImageTemplate||this._resolvingBackgroundImageTemplate||!this.hass)){this._resolvingBackgroundImageTemplate=!0;try{const e=this._getTemplateContext(),t=await ki(this.hass,this._backgroundImageTemplate,e);this._backgroundImageTemplateResult=(t??"").toString().trim()}catch{this._backgroundImageTemplateResult=""}finally{this._resolvingBackgroundImageTemplate=!1,this._backgroundImageTemplateNeedsResolve=!1,this.requestUpdate()}}}async _resolveFontColorTemplate(){if(!(!this._fontColorTemplate||this._resolvingFontColorTemplate||!this.hass)){this._resolvingFontColorTemplate=!0;try{const e=this._getTemplateContext(),t=await ki(this.hass,this._fontColorTemplate,e);this._fontColorTemplateResult=(t??"").toString().trim()}catch{this._fontColorTemplateResult=""}finally{this._resolvingFontColorTemplate=!1,this._fontColorTemplateNeedsResolve=!1,this.requestUpdate()}}}get _isMobile(){if(typeof window>"u")return!1;const e=typeof document<"u"?document.documentElement?.clientWidth:0,t=window.innerWidth||e||0,i=t>0?t<=768:!1,s=typeof navigator<"u"&&(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent||"")||!!(navigator.maxTouchPoints&&navigator.maxTouchPoints>1)&&/Macintosh/i.test(navigator.userAgent||""));return!!(i||s)}_getTemplateContext(){const e=!!(this.hass?.themes?.darkMode??(typeof window<"u"&&window.matchMedia?.("(prefers-color-scheme: dark)")?.matches));return{entity:this.currentEntityId||"",is_idle:this._isIdle,is_playing:this._isCurrentEntityPlaying(),is_search:this._showSearchInSheet,is_grouping:this._showGrouping,is_source:this._showSourceList||this._showSourceMenu,is_lyrics:this._lyricsActive,is_options:this._showEntityOptions,is_transfer_queue:this._showTransferQueue,is_any_menu_open:this.isAnyMenuOpen,is_dark_mode:e,is_mobile:this._isMobile,is_music_assistant:this._isMusicAssistantEntity(),is_music:this._isMusicContentType(),current:this.currentActivePlaybackEntityId||this.currentEntityId||""}}_setIdleState(e){const t=this._idleTimeoutMs===0?!1:e;this._isIdle!==t&&(this._isIdle=t,this._cardHeightTemplate&&(this._cardHeightTemplateNeedsResolve=!0))}_ensureArtworkOverrideIndexMap(){this._artworkOverrideIndexMap||(this._artworkOverrideIndexMap=new WeakMap,(Array.isArray(this.config?.media_artwork_overrides)?this.config.media_artwork_overrides:[]).forEach((e,t)=>{e&&typeof e=="object"&&this._artworkOverrideIndexMap.set(e,t)}))}_getArtworkOverrideCacheKey(e,t="image",i=null){this._ensureArtworkOverrideIndexMap();const s=i?.attributes?.media_title||"",r=i?.attributes?.media_artist||"",n=`${s}:${r}`,o=e&&this._artworkOverrideIndexMap?.get(e);return`${typeof o=="number"?o:"generic"}:${t}:${n}`}_getResolvedArtworkOverrideSource(e,t,i="image",s=null){if(!t||typeof t!="string")return null;const r=this._normalizeImageSourceValue(t);if(!r)return null;const n=typeof t=="string"&&t.trim().startsWith("[[["),o=typeof t=="string"&&(t.includes("{{")||t.includes("{%"));if(!n&&!o)return r;if(n)return this._normalizeImageSourceValue(this._evaluateJsTemplate(t));this._artworkOverrideTemplateCache||(this._artworkOverrideTemplateCache={});const l=this._getArtworkOverrideCacheKey(e,i,s);this._artworkOverrideTemplateCache[l]||(this._artworkOverrideTemplateCache[l]={value:null,resolving:!1});const c=this._artworkOverrideTemplateCache[l];if(c.value)return c.value;if(!c.resolving&&this.hass){c.resolving=!0;const u=this._getTemplateContext();ki(this.hass,t,u).then(h=>{c.value=this._normalizeImageSourceValue((h??"").toString())}).catch(()=>{c.value=""}).finally(()=>{c.resolving=!1,this.requestUpdate()})}return c.value}_getCollapsedArtworkStyle(){if(this._alwaysCollapsed){const e=!!this._getFavoriteButtonEntity()&&!this._getHiddenControlsForCurrentEntity().favorite;if(vs(this.currentActivePlaybackStateObj,(t,i)=>this._supportsFeature(t,i),e,this._getHiddenControlsForCurrentEntity(),!0,this._controlLayout)>6&&this._isMobile)return"width: 60px; height: 60px; object-fit: var(--yamp-artwork-fit, cover); border-radius: 8px;"}return""}_getArtworkUrl(e,t=!1,i=!1){const s=!i&&(this._isIdle||t)&&!!this.config?.idle_image,r=fs(e,{hostname:this.config?.artwork_hostname||"",overrides:Array.isArray(this.config?.media_artwork_overrides)?this.config.media_artwork_overrides:[],fallbackArtwork:this.config?.fallback_artwork,artworkObjectFit:this._artworkObjectFit,aspectRatioCache:this._aspectRatioCache,isIdleImageActive:s,resolveOverrideSource:(u,h,p,_)=>this._getResolvedArtworkOverrideSource(u,h,p,_)});if(!r)return null;let{url:n,sizePercentage:o,objectFit:l,objectPosition:c}=r;return n&&!Si(n)&&(n=null),l||(l=this._artworkObjectFit),c||(c=this.config?.artwork_position||"top center"),{url:n,sizePercentage:o,objectFit:l,objectPosition:c}}_resolveSelectedArtwork({metadataArtwork:e,playbackArtwork:t,mainArtwork:i,displayTitle:s,playbackStateObj:r,mainState:n,isPlayingSameMedia:o=!1}){let l=e;return s&&(!l||!l.url)&&(t?.url&&(r?.attributes?.media_title===s||o)?l=t:i?.url&&(n?.attributes?.media_title===s||o)&&(l=i)),(!l||!l.url)&&(t?.url?l=t:i?.url?l=i:l=t||i||null),l}_getBackgroundSizeForFit(e){switch(e){case"contain":return"contain";case"fill":return"100% 100%";case"scale-down":return"contain";case"none":return"auto";case"scaled-contain":case"scaled-contain-alternate":return"80%";default:return"cover"}}_isExternalImageUrl(e){return/^https?:\/\//i.test(e)&&window.location?.origin&&!e.startsWith(window.location.origin)}async _extractDominantColor(e){return new Promise(t=>{if(!e||typeof e!="string"){t("#888");return}const i=new window.Image;this._isExternalImageUrl(e)&&(i.crossOrigin="Anonymous"),i.src=e,i.onload=function(){try{const s=document.createElement("canvas");s.width=1,s.height=1;const r=s.getContext("2d");r.drawImage(i,0,0,1,1);const[n,o,l]=r.getImageData(0,0,1,1).data;t(`rgb(${n},${o},${l})`)}catch{t("#888")}},i.onerror=function(){t("#888")}})}_updateArtworkAspectRatios(){this.hass&&this.entityIds.forEach(e=>{const t=this.hass.states[e];if(t?.attributes){const i=t.attributes,s=be(i,"entity_picture_local")||be(i,"entity_picture")||be(i,"album_art");s&&this._calculateAspectRatio(this._normalizeImageSourceValue(s))}})}_calculateAspectRatio(e){if(!e||typeof e!="string"||this._aspectRatioCache[e]!==void 0)return;this._aspectRatioCache[e]=null;const t=new window.Image;this._isExternalImageUrl(e)&&(t.crossOrigin="Anonymous"),t.src=e,t.onload=()=>{t.naturalWidth&&t.naturalHeight&&(this._aspectRatioCache[e]=t.naturalWidth/t.naturalHeight,this.requestUpdate())},t.onerror=()=>{this._aspectRatioCache[e]=null}}_normalizeAdaptiveTextTargets(e){return Array.isArray(e?.adaptive_text_targets)?e.adaptive_text_targets.map(t=>typeof t=="string"?t.trim().toLowerCase():"").filter(t=>ol.includes(t)):e?.adaptive_text===!0?[...P_]:[]}_normalizeImageSourceValue(e){if(!e||typeof e!="string")return"";let t=e.trim();if(!t)return"";(t.startsWith("'")&&t.endsWith("'")||t.startsWith('"')&&t.endsWith('"'))&&t.length>=2&&(t=t.slice(1,-1).trim());const i=t.match(/^url\((.*)\)$/i);if(i&&i[1]!==void 0){let s=i[1].trim();return(s.startsWith("'")&&s.endsWith("'")||s.startsWith('"')&&s.endsWith('"'))&&(s=s.slice(1,-1).trim()),s}return t}_resolveImageUrlFromInput(e){const t=this._normalizeImageSourceValue(e);if(!t||!this.hass)return null;if(this.hass.states?.[t]){const i=this.hass.states[t];return i.attributes?.entity_picture_local||i.attributes?.entity_picture||(i.state&&typeof i.state=="string"&&(i.state.startsWith("http")||i.state.startsWith("/"))?i.state:null)}return t.startsWith("http")||t.startsWith("/")?t:null}setConfig(e){if(!e.entities||!Array.isArray(e.entities)||e.entities.length===0)throw new Error("You must define at least one media_player entity.");const t=this.config,i=e.template||"custom",s={...wi[i]||{},...e};t?.lock_screen_controls!==s.lock_screen_controls&&(this._mediaSessionOverride=null),this.config=s,this._swapPauseForStop=s.swap_pause_for_stop===!0,this._holdToPin=!!s.hold_to_pin,this._disableSearchAutofocus=s.disable_autofocus===!0,this._holdToPin&&(this._holdHandler=Id({onPin:c=>this._pinChip(c),onHoldEnd:()=>{},holdTime:650,moveThreshold:8}));const r=this._selectedIndex||0;this._selectedIndex=r<this.entityIds.length?r:0,this._lastPlaying=null,this._lastActiveEntityId=null;const n=new Set(["cover","contain","fill","scale-down","none","scaled-contain","scaled-contain-alternate","no_artwork"]);this._baseArtworkObjectFit=n.has(s.artwork_object_fit)?s.artwork_object_fit:"cover",this._extendArtwork=s.extend_artwork===!0,this._idleScreen=s.idle_screen||"default",this._idleScreenApplied=!1,this._hasSeenPlayback=!1,this._appearance=s.appearance||"automatic",this._isIdle&&this._applyIdleScreen(),this._updateHostAttributes(),this._showVolumeOverlay=!!s.show_volume_overlay,this._collapseOnIdle=!!s.collapse_on_idle,this._expandOnSearch=!!s.expand_on_search,this._alternateProgressBar=!!s.alternate_progress_bar,this._displayTimestamps=!!s.display_timestamps,this._keepFiltersOnSearch=!!s.keep_filters_on_search,this._adaptiveControls=s.adaptive_controls===!0;const o=this._normalizeAdaptiveTextTargets(s);if(this._adaptiveTextTargets=new Set(o),this._adaptiveText=this._adaptiveTextTargets.size>0,this._currentDetailsScale=null,this._updateAdaptiveTextObserverState(),s.always_show_quick_group!==t?.always_show_quick_group&&(this._quickGroupingMode=!!s.always_show_quick_group),this._adaptiveText){const c=this._currentTextScale??1,u=this._currentDetailsScale??1;this._setAdaptiveTextVars(c,void 0,u),this._updateAdaptiveTextScale()}else this._setAdaptiveTextVars(1,new Set,1);this._hideActiveEntityLabel=s.hide_active_entity_label===!0,this._hideActiveEntityLabelOnIdle=s.hide_active_entity_label_on_idle===!0,this._artworkOverrideTemplateCache={},this._artworkOverrideIndexMap=null,Array.isArray(s.media_artwork_overrides)&&(this.config.media_artwork_overrides=s.media_artwork_overrides.map(c=>({...c})),this.config.media_artwork_overrides.forEach(c=>{!c||typeof c!="object"||(c.__cachedRegexes={},vn.forEach(u=>{const h=c[u];if(typeof h=="string"&&h.includes("*")&&h!=="*")try{const p=h.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/\\\*/g,".*");c.__cachedRegexes[u]=new RegExp(`^${p}$`,"i")}catch{console.warn("yamp: Failed to compile artwork override regex for",u,h)}}))})),typeof s.idle_image=="string"&&(s.idle_image.includes("{{")||s.idle_image.includes("{%"))?(this._idleImageTemplate=s.idle_image,this._idleImageTemplateResult="",this._idleImageTemplateNeedsResolve=!0):(this._idleImageTemplate=null,this._idleImageTemplateResult="",this._idleImageTemplateNeedsResolve=!1),typeof s.background_image=="string"&&(s.background_image.includes("{{")||s.background_image.includes("{%"))?(this._backgroundImageTemplate=s.background_image,this._backgroundImageTemplateResult="",this._backgroundImageTemplateNeedsResolve=!0):(this._backgroundImageTemplate=null,this._backgroundImageTemplateResult="",this._backgroundImageTemplateNeedsResolve=!1),typeof s.font_color=="string"&&(s.font_color.includes("{{")||s.font_color.includes("{%"))?(this._fontColorTemplate=s.font_color,this._fontColorTemplateResult="",this._fontColorTemplateNeedsResolve=!0):(this._fontColorTemplate=null,this._fontColorTemplateResult="",this._fontColorTemplateNeedsResolve=!1);let l=6e4;if(s.idle_timeout_ms!==void 0&&s.idle_timeout_ms!==null&&s.idle_timeout_ms!==""){const c=Number(s.idle_timeout_ms);isNaN(c)||(l=Math.max(0,c))}this._idleTimeoutMs=l,this._idleTimeoutMs===0&&(this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate())),this._volumeStep=typeof s.volume_step=="number"?s.volume_step:.05,this._volumeMode=s.volume_mode??"slider",s.always_show_lyrics===!0&&(this._lyricsActive=!0)}get entityObjs(){return this.config.entities.map((e,t)=>{const i=typeof e=="string"?e:e.entity_id,s=typeof e=="string"?"":e.name||"",r=typeof e=="string"?void 0:e.volume_entity,n=typeof e=="string"?void 0:e.remote_entity,o=typeof e=="string"?void 0:e.music_assistant_entity,l=typeof e=="string"?!1:!!e.sync_power,c=typeof e=="string"?!1:!!e.follow_active_volume,u=typeof e=="string"?void 0:e.hidden_controls;let h;if(typeof e=="object"&&typeof e.group_volume<"u")h=e.group_volume;else{const m=this.hass?.states?.[i];if(m&&Array.isArray(m.attributes.group_members)&&m.attributes.group_members.length>0){const f=m.attributes.group_members.filter(v=>v!==i),y=this.config.entities.map(v=>typeof v=="string"?v:v.entity_id);h=f.filter(v=>y.includes(v)).length>0}}const p=typeof e=="string"?void 0:e.entity_volume_mode,_=typeof e=="string"?void 0:e.entity_volume_step;return{entity_id:i,name:s,volume_entity:r,remote_entity:n,music_assistant_entity:o,sync_power:l,follow_active_volume:c,hidden_controls:u,hidden_filter_chips:typeof e=="string"?void 0:e.hidden_filter_chips,hide_remote_buttons:typeof e=="string"?void 0:e.hide_remote_buttons,disable_auto_select:this._isAutoSelectDisabled(t),prefer_ma_metadata:typeof e=="string"?!1:!!e.prefer_ma_metadata,...typeof h<"u"?{group_volume:h}:{},...p?{entity_volume_mode:p}:{},...typeof _=="number"?{entity_volume_step:_}:{}}})}_getEntityForPurpose(e,t){const i=this.entityObjs[e];if(!i)return null;switch(t){case"volume_control":return i.follow_active_volume?this._getActivePlaybackEntityForIndex(e)||i.entity_id:this._resolveEntity(i.volume_entity,i.entity_id,e,"vol")||i.entity_id;case"playback_control":return this._getActivePlaybackEntityForIndex(e)||i.entity_id;case"sorting":return this._getActivePlaybackEntityForIndex(e)||i.entity_id;case"metadata":return i.prefer_ma_metadata?this._resolveEntity(i.music_assistant_entity,i.entity_id,e)||i.entity_id:this._getActivePlaybackEntityForIndex(e)||i.entity_id;default:return i.entity_id}}_resolveEntity(e,t,i,s="ma"){return e?typeof e=="string"&&(e.includes("{{")||e.includes("{%")||e.trim().startsWith("[[["))?(s==="vol"?this._volResolveCache:s==="remote"?this._remoteResolveCache:this._maResolveCache)?.[i]?.id||t:e:null}_areEntitiesPlayingSameMedia(e,t){return $d(e,t)}_getActivePlaybackEntityForIndex(e){const t=this.entityObjs[e];if(!t)return null;const i=t.entity_id,s=this._resolveEntity(t.music_assistant_entity,t.entity_id,e),r=i?this.hass?.states?.[i]:null,n=s?this.hass?.states?.[s]:null;return s===i?i:this._getActivePlaybackEntityForIndexInternal(e,i,s,r,n)}_getActivePlaybackEntityForIndexInternal(e,t,i,s,r){const n=this._lastResolvedEntityIdByChip[e],o=_=>(this._lastResolvedEntityIdByChip[e]=_,_),l=this._playbackLingerByIdx?.[e],c=Date.now();if(l&&l.until>c){if(this._isEntityPlaying(s)&&this._lastPlayingEntityIdByChip?.[e]===t)return o(t);if(this.hass?.states?.[l.entityId])return o(l.entityId)}l&&l.until<=c&&delete this._playbackLingerByIdx[e];const u=this._isEntityPlaying(r),h=this._isEntityPlaying(s);if(u&&h)return this._areEntitiesPlayingSameMedia(s,r)||n===t?o(t):o(i);if(u)return o(i);if(h)return o(t);const p=this._lastPlayingEntityIdByChip?.[e];if(p===i&&r)return o(i);if(p===t)return o(t);if(i&&i!==t){const _=i===n;return t===n&&s&&s.state!=="off"&&s.state!=="unavailable"?o(t):_&&r&&r.state!=="off"&&r.state!=="unavailable"?o(i):o(r?i:t)}else return o(t)}_getVolumeEntity(e){return this._getEntityForPurpose(e,"volume_control")}_getEffectiveVolumeMode(){return this.entityObjs?.[this._selectedIndex]?.entity_volume_mode||this._volumeMode}_getEffectiveVolumeStep(){const e=this.entityObjs?.[this._selectedIndex];return typeof e?.entity_volume_step=="number"?e.entity_volume_step:this._volumeStep}_resolveEntityIdxByGroupingId(e){const t=this.entityObjs;for(let i=0;i<t.length;i++)if(this._resolveMaEntityForObj(t[i],i)===e)return i;return-1}_resolveMaEntityForObj(e,t){return e?this._resolveEntity(e.music_assistant_entity,e.entity_id,t)||e.entity_id:null}_getSearchEntityId(e){const t=this.entityObjs[e];return!t||!t.music_assistant_entity?t?.entity_id:(typeof t.music_assistant_entity=="string"&&(t.music_assistant_entity.includes("{{")||t.music_assistant_entity.includes("{%")||t.music_assistant_entity.trim().startsWith("[[[")),t.music_assistant_entity)}_getPlaybackEntityId(e){return this._getEntityForPurpose(e,"playback_control")}_getActivePlaybackEntityId(e=this._selectedIndex){const t=this.entityObjs?.[e];if(!t)return null;const i=t.entity_id,s=this._getActualResolvedMaEntityForState(e),r=i?this.hass?.states?.[i]:null,n=s?this.hass?.states?.[s]:null;return this._getActivePlaybackEntityIdInternal(e,i,s,r,n)}_getActivePlaybackEntityIdInternal(e,t,i,s,r){if(i===t)return t;const n=Date.now(),o=this._playTimestamps?.[i]||0,l=this._playTimestamps?.[t]||0,c=this._playerStateCache[i]==="playing"&&r?.state!=="playing",u=this._playerStateCache[t]==="playing"&&s?.state!=="playing",h=c||n-o<5e3,p=u||n-l<5e3,_=this._isEntityPlaying(r),m=this._isEntityPlaying(s);if(_&&m&&this._areEntitiesPlayingSameMedia(s,r))return this._lastActiveEntityIdByChip[e]=t,t;if(_)return this._lastActiveEntityIdByChip[e]=i,i;if(h&&r?.state!=="playing")return i;if(this._isEntityPlaying(s))return this._lastActiveEntityIdByChip[e]=t,t;if(p&&s?.state!=="playing")return t;const f=this._lastActiveEntityIdByChip?.[e];return f&&(f===i||f===t)?f:i&&i!==t?i:t}_getHiddenControlsForCurrentEntity(){let e=this.entityObjs[this._selectedIndex]?.hidden_controls;const t=this._hiddenControlsResolveCache?.[this._selectedIndex]?.value;if(t!==void 0&&(e=t),!e)return{};if(typeof e=="string")try{e=JSON.parse(e.replace(/'/g,'"'))}catch{e=e.split(",").map(s=>s.trim())}const i={};return Array.isArray(e)?e.forEach(s=>{i[s]=!0}):typeof e=="object"&&Object.assign(i,e),i}_getActivePlaybackEntityIdForIndex(e){return this._getActivePlaybackEntityId(e)}_getGroupingEntityId(e){const t=this.entityObjs[e];return t?t.music_assistant_entity?typeof t.music_assistant_entity=="string"&&(t.music_assistant_entity.includes("{{")||t.music_assistant_entity.includes("{%")||t.music_assistant_entity.trim().startsWith("[[["))?this._maResolveCache?.[e]?.id||t.entity_id:t.music_assistant_entity:t.entity_id:null}_getGroupingEntityIdByEntityId(e){const t=this.entityIds.indexOf(e);return t<0?e:this._getGroupingEntityId(t)}_findEntityObjByAnyId(e){return this.entityObjs.find(t=>t.entity_id===e||t.music_assistant_entity===e)||null}_resolveMusicAssistantEntity(e){const t=this.entityObjs[e];if(!t||!t.music_assistant_entity)return t?.entity_id;try{return typeof t.music_assistant_entity=="string"&&(t.music_assistant_entity.includes("{{")||t.music_assistant_entity.includes("{%")),t.music_assistant_entity}catch{return t.entity_id}}_getGroupKey(e){const t=this._getGroupingEntityIdByEntityId(e),i=this.hass?.states?.[t];if(!i||!this._isGroupCapable(i))return e;const s=Array.isArray(i.attributes.group_members)?i.attributes.group_members:[];if(s.length<=1)return e;const r=s[0],n=this.hass?.states?.[r];return this._isGroupCapable(n)?this.entityIds.find(o=>this._getGroupingEntityIdByEntityId(o)===r)||r:e}get entityIds(){return this.entityObjs.map(e=>e.entity_id)}getChipName(e){const t=this.entityObjs.find(s=>s.entity_id===e);if(t&&t.name)return t.name;const i=this.hass?.states?.[e];return je(this.hass,i||e)}_getActualGroupMaster(e){if(!e||!e.length)return null;if(!this.hass||e.length===1)return e[0];if(this._lastGroupingMasterId&&e.includes(this._lastGroupingMasterId))return this._lastGroupingMasterId;const t=e.map(i=>{const s=this._getGroupingEntityIdByEntityId(i),r=s?this.hass.states[s]:null;return r?{id:i,groupingId:s,state:r}:null}).filter(Boolean);if(!t.length)return e[0];for(const i of t){const s=i.state?.attributes?.group_members;if(Array.isArray(s)&&s.length>0){const r=s[0],n=t.find(o=>o.groupingId===r);if(n)return n.id}}return e[0]}_getGroupingMasterId(){if(!this.entityIds||!this.entityIds.length)return null;const e=this.groupedSortedEntityIds||[],t=this.currentEntityId||this.entityIds[0];let i=t;if(this._lastGroupingMasterId&&this.entityIds.includes(this._lastGroupingMasterId)){const r=e.find(n=>n.includes(this._lastGroupingMasterId));r&&r.length>1&&r.includes(t)&&(i=this._lastGroupingMasterId)}const s=i?e.find(r=>r.includes(i)):null;if(s&&s.length>1){const r=this._getActualGroupMaster(s);if(r&&this.entityIds.includes(r))return r}return i}_getGroupingMasterIndex(){const e=this._getGroupingMasterId();return e?this.entityIds.indexOf(e):-1}_getGroupingMasterObj(){const e=this._getGroupingMasterIndex();return e>=0?this.entityObjs[e]:null}_isActiveChipGrouped(e){if(!this.entityIds||e<0||e>=this.entityIds.length)return!1;const t=this.entityIds[e];if(!t)return!1;const i=(this.groupedSortedEntityIds||[]).find(s=>s.includes(t));return!!(i&&i.length>1)}_resolveGroupingEntityId(e,t){if(!e?.music_assistant_entity)return t;if(typeof e.music_assistant_entity=="string"&&(e.music_assistant_entity.includes("{{")||e.music_assistant_entity.includes("{%")||e.music_assistant_entity.trim().startsWith("[[["))){const i=this.entityIds.indexOf(t);return this._maResolveCache?.[i]?.id||t}return e.music_assistant_entity}get currentEntityId(){return this.entityIds[this._selectedIndex]}get currentStateObj(){return!this.hass||!this.currentEntityId?null:this.hass.states[this.currentEntityId]}get currentPlaybackEntityId(){return this._getPlaybackEntityId(this._selectedIndex)}get currentPlaybackStateObj(){const e=this._getResolvedPlaybackEntityIdSync(this._selectedIndex);return!this.hass||!e?this.currentStateObj:this.hass.states[e]}get currentActivePlaybackEntityId(){const e=`${this._selectedIndex}-${this.hass?.states?.[this.currentEntityId]?.state}-${this.hass?.states?.[this._getSearchEntityId(this._selectedIndex)]?.state}`;return(this._cachedActivePlaybackEntityId===void 0||this._cachedActivePlaybackEntityKey!==e)&&(this._cachedActivePlaybackEntityId=this._getActivePlaybackEntityId(this._selectedIndex),this._cachedActivePlaybackEntityKey=e),this._cachedActivePlaybackEntityId}get metadataStateObj(){const e=this._getEntityForPurpose(this._selectedIndex,"metadata");return e?this.hass?.states?.[e]:null}get currentActivePlaybackStateObj(){const e=this.currentActivePlaybackEntityId;return e?this.hass?.states?.[e]:null}get currentVolumeStateObj(){const e=this._getVolumeEntity(this._selectedIndex);return e?this.hass.states[e]:null}get isAnyMenuOpen(){return this._showEntityOptions||this._showGrouping||this._showSourceList||this._showTransferQueue||this._showResolvedEntities||this._showSearchInSheet||this._showSourceMenu||!!this._searchActiveOptionsItem||!!this._activeSearchRowMenuId||!!this._queueActionsMenuOpenId}get _isSelectionFlow(){return!!this._addToPlaylistTarget||!!this._searchHierarchy.some(e=>e.type==="select_track_for_playlist")}get _isGridMode(){return this._alwaysCollapsed&&(!this._expandOnSearch||!this._showSearchInSheet)&&!this.config.disable_mini_menu}_renderMainMenu(e,t,i){const s=this._isGridMode,r=(n,o,l)=>s?g`
          <button class="entity-options-item menu-action-item" @click=${l}>
            <ha-icon class="menu-action-icon" icon=${o}></ha-icon>
            <span class="menu-action-label">${n}</span>
          </button>
        `:g`
        <button class="entity-options-item" @click=${l}>${n}</button>
      `;return g`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>this._closeEntityOptions()}>
          ${d("common.close")}
        </button>
        <div class="entity-options-divider"></div>
      </div>
      <div class="entity-options-menu ${i?"chips-in-menu":""} ${s?"grid-menu":"entity-options-scroll"}" style="${s?"":"display:flex; flex-direction:column;"}">
        ${r(d("card.menu.more_info"),"mdi:information-outline",()=>{const n=this._getResolvedEntitiesForCurrentChip();n.length===1?(this._openMoreInfoForEntity(n[0]),this._showEntityOptions=!1):this._showResolvedEntities=!0,this.requestUpdate()})}
        ${r(d("common.search"),"mdi:magnify",()=>{this._showSearchSheetInOptions()})}

        ${Array.isArray(e)&&e.length>0?r(d("card.menu.source"),"mdi:import",()=>this._openSourceList()):b}
        
        ${this._canShowTransferQueueOption()?r(d("card.menu.transfer_queue"),"mdi:swap-horizontal",()=>this._openTransferQueue()):b}
        
        ${this._renderGroupingMenuOption(s)}
        
        ${this._hasRemoteControlSupport()?r(d("card.menu.remote_controls"),"mdi:remote",()=>this._openRemoteControl()):b}
        
        ${this._alwaysCollapsed?b:r(d(this._lyricsActive?"card.menu.hide_lyrics":"card.menu.show_lyrics"),"mdi:script-text-outline",()=>{this._lyricsActive=!this._lyricsActive,this._lyricsActive||(this._lastLyricsTrackId=null,this._lastLyricsEntityId=null,this._lastLyricsArtist=null,this._lastLyricsTitle=null),this._showEntityOptions=!1,this.requestUpdate()})}
        
        ${t.length?g`
          ${t.map(({action:n,idx:o})=>{const l=this._getActionLabel(n);return g`
                <button
                  class="entity-options-item menu-action-item"
                  @click=${()=>this._onMenuActionClick(o)}
                >
                  ${n.icon?g`
                    <ha-icon
                      class="menu-action-icon"
                      .icon=${n.icon}
                    ></ha-icon>
                  `:b}
                  ${l?g`<span class="menu-action-label">${l}</span>`:b}
                </button>
              `})}
        `:b}
      </div>
    `}_getChipRowProps(){return{groupedSortedEntityIds:this.groupedSortedEntityIds,entityIds:this.entityIds,selectedEntityId:this.currentEntityId,pinnedIndex:this._pinnedIndex,holdToPin:this._holdToPin,getChipName:e=>this.getChipName(e),getActualGroupMaster:e=>this._getActualGroupMaster(e),artworkHostname:this.config?.artwork_hostname||"",mediaArtworkOverrides:this.config?.media_artwork_overrides||[],fallbackArtwork:this.config?.fallback_artwork||null,getIsChipPlaying:(e,t)=>{const i=this.entityIds.indexOf(e);if(i<0)return!1;const s=this._getEntityForPurpose(i,"playback_control"),r=this.hass?.states?.[s];return this._isEntityPlaying(r)},getChipArt:e=>{const t=this.entityIds.indexOf(e);if(t<0)return null;const i=this._getEntityForPurpose(t,"metadata"),s=this.hass?.states?.[i],r=this._getEntityForPurpose(t,"playback_control"),n=this.hass?.states?.[r],o=this.hass?.states?.[e],l=this._getArtworkUrl(s),c=this._getArtworkUrl(n),u=this._getArtworkUrl(o),h=this._areEntitiesPlayingSameMedia(o,n),p=s?.attributes?.media_title,_=(!xn(p,s?.attributes?.friendly_name)&&p?p:null)||n?.attributes?.media_title||o?.attributes?.media_title||p;return this._resolveSelectedArtwork({metadataArtwork:l,playbackArtwork:c,mainArtwork:u,displayTitle:_,playbackStateObj:n,mainState:o,isPlayingSameMedia:h})},getIsMaActive:e=>{const t=this.entityIds.indexOf(e);if(t<0)return!1;const i=this.entityObjs[t];if(!i?.music_assistant_entity)return!1;const s=this._getEntityForPurpose(t,"playback_control"),r=this.hass?.states?.[s];return s===this._resolveEntity(i.music_assistant_entity,i.entity_id,t)&&this._isEntityPlaying(r)},isIdle:this._isIdle,hass:this.hass,onChipClick:e=>this._onChipClick(e),onIconClick:(e,t)=>{const i=this.entityIds[e],s=this.groupedSortedEntityIds.find(r=>r.includes(i));s&&s.length>1&&(this._selectedIndex=e,this._showEntityOptions=!0,this._showGrouping=!0,this.requestUpdate())},onPinClick:(e,t)=>{t.stopPropagation(),this._onPinClick(t)},onPointerDown:(e,t)=>this._handleChipPointerDown(e,t),onPointerMove:(e,t)=>this._handleChipPointerMove(e,t),onPointerUp:(e,t)=>this._handleChipPointerUp(e,t),quickGroupingMode:this._quickGroupingMode,getQuickGroupingState:e=>{const t=this.currentEntityId,i=this.entityIds.indexOf(t),s=i>=0?this._getGroupingEntityId(i):t,r=s?this.hass.states[s]:null,n=this._getGroupKey(this.currentEntityId);return this._getGroupPlayerState(e,t,null,r,n)},onQuickGroupClick:(e,t)=>{const i=this.entityIds[e];i&&this._toggleGroup(i)},onDoubleClick:e=>{e.stopPropagation(),!(Date.now()-this._lastChipDoubleTapTime<z_)&&(this._quickGroupingMode=!this._quickGroupingMode,this.requestUpdate())}}}_renderInlineChipRow(e,t){return e?g`
      <div class="chip-row" style="${t?"visibility: hidden; pointer-events: none;":""}">
        ${kn(this._getChipRowProps())}
      </div>
    `:b}_renderInlineActionRow(e){return!e||!e.length?b:g`
      <div style="${this._showEntityOptions?"visibility: hidden; pointer-events: none;":""}">
        ${Md({actions:e.map(({action:t})=>t),onActionChipClick:t=>{const i=e[t];i&&this._onActionChipClick(i.idx)}})}
      </div>
    `}_renderGroupingMenuOption(e=!1){if(this.entityIds.length<=1)return b;const t=this.entityIds.reduce((o,l,c)=>{const u=this._getGroupingEntityId(c),h=this.hass.states[u];return o+(this._isGroupCapable(h)?1:0)},0),i=this._getGroupingEntityId(this._selectedIndex),s=this.hass.states[i],r=this.currentEntityId,n=this._getGroupKey(r)!==r;return t>1&&this._isGroupCapable(s)&&!n?e?g`
          <button class="entity-options-item menu-action-item" @click=${()=>this._openGrouping()}>
            <ha-icon class="menu-action-icon" icon="mdi:speaker-multiple"></ha-icon>
            <span class="menu-action-label">${d("card.menu.group_players")}</span>
          </button>
        `:g`
        <button class="entity-options-item" @click=${()=>this._openGrouping()}>${d("card.menu.group_players")}</button>
      `:b}_getGroupPlayerState(e,t,i,s,r){const n=this.entityIds.indexOf(e);if(n<0)return{isGroupable:!1,isBusy:!1,busyLabel:"",grouped:!1};const o=this._getGroupingEntityId(n),l=this.hass.states[o];if(!l||!this._isGroupCapable(l))return{isGroupable:!1,isBusy:!1,busyLabel:"",grouped:!1};const c=this._getGroupKey(e);let u=!1,h="";(c!==e&&c!==r||c===e&&c!==r&&l.attributes?.group_members?.length>1)&&(u=!0,h=d("common.unavailable"));const p=(Array.isArray(s?.attributes?.group_members)?s.attributes.group_members:[]).includes(o),_=e===r,m=this.getChipName(t);let f;return _?f=d("card.grouping.master"):p?(f=d("card.grouping.unjoin_from","{master}",m),f==="card.grouping.unjoin_from"&&(f=`Unjoin from ${m}`)):(f=d("card.grouping.join_with","{master}",m),f==="card.grouping.join_with"&&(f=`Join with ${m}`)),{isGroupable:!0,isBusy:u,busyLabel:h,grouped:p,isPrimary:_,entityToCheck:o,tooltip:f}}_renderGroupingSheet(){const e=this._isGridMode,t=this._getGroupingMasterId(),i=t?this.entityIds.indexOf(t):-1,s=i>=0?this._getGroupingEntityId(i):t,r=s?this.hass.states[s]:null,n=Array.isArray(r?.attributes?.group_members)&&r.attributes.group_members.length>1,o=[],l=this._getGroupKey(this.currentEntityId);this.entityIds.forEach(y=>{const v=this._getGroupPlayerState(y,this.currentEntityId,null,r,l);v.isGroupable&&o.push({id:y,groupId:v.entityToCheck,isBusy:v.isBusy,busyLabel:v.busyLabel})});const c=this.currentEntityId,u=this.entityIds.indexOf(c),h=u>=0?this._getGroupingEntityId(u):null,p=h?this.hass.states[h]:null,_=p?this._isGroupCapable(p):!1,m=this._getGroupKey(c)!==c;if(!n&&(!_||m))return g`
        <div class="entity-options-header">
          ${this._cardType!=="group_players"&&this._cardType!=="remote_control"?g`
            <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeGrouping()}}>
              ${d("common.back")}
            </button>
          `:b}
          <div class="entity-options-divider"></div>
        </div>
        ${b}
        <div class="entity-options-item" style="padding:12px; opacity:0.75; text-align:center;">
          ${d(m?"card.grouping.unavailable":"card.grouping.no_players")}
        </div>
      `;const f=[...o].sort((y,v)=>{if(n){if(y.id===t)return-1;if(v.id===t)return 1}else{if(y.id===c)return-1;if(v.id===c)return 1}return y.isBusy===v.isBusy?0:y.isBusy?1:-1});return g`
      <div class="entity-options-header grouping-header group-list-header">
        ${this._cardType!=="group_players"&&this._cardType!=="remote_control"?g`
          <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeGrouping()}}>
            ${d("common.back")}
          </button>
        `:b}
        <div class="entity-options-divider"></div>
      </div>
      ${b}
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
        ${n?g`
          <button class="entity-options-item"
            @click=${()=>this._syncGroupVolume()}
            style="flex:0 0 auto; min-width:140px; text-align:center;">
            ${d("card.grouping.sync_volume")}
          </button>
        `:b}
        <button class="entity-options-item"
          @click=${()=>n?this._ungroupAll():this._groupAll()}
          style="flex:0 0 auto; min-width:140px; text-align:center; margin-left:auto;">
          ${d(n?"card.grouping.ungroup_all":"card.grouping.group_all")}
        </button>
      </div>
      <div class="group-list-scroll ${e?"grid-menu":""}">
        ${f.length===0?g`
          <div class="entity-options-item" style="padding:12px; opacity:0.75; text-align:center;">
            ${d("card.grouping.no_players")}
          </div>
        `:g`
          <div class="${e?"grid-menu-items":""}">
            ${f.map(y=>{const v=y.id,x=y.groupId,k=(Array.isArray(r?.attributes?.group_members)?r.attributes.group_members:[]).includes(x),E=this.getChipName(v),S=y.isBusy,C=y.busyLabel,$=this.entityIds.indexOf(v),P=this._getVolumeEntity($)||x,F=this.hass.states[P],T=P?.startsWith&&P.startsWith("remote."),I=Number(F?.attributes?.volume_level||0),O=v===t,N=!O,W=v===c,Y=t?this.getChipName(t):d("card.grouping.master");let U=d(n?O?"card.grouping.master":k?"card.grouping.joined":"card.grouping.available":W?"card.grouping.current":"card.grouping.available");if(S&&(U=C||"Unavailable"),e){const L=S||!N,de=k?d("card.grouping.unjoin_from").replace("{master}",Y):d("card.grouping.join_with").replace("{master}",Y);return g`
                  <button class="entity-options-item menu-action-item group-toggle-btn ${!N||k?"grid-active":""}" 
                    ?disabled=${L}
                    @click=${()=>!L&&this._toggleGroup(v)}
                    title=${S?d("card.grouping.unavailable"):N?de:U}>
                    <ha-icon class="menu-action-icon" icon=${O?"mdi:star":k?"mdi:speaker-multiple":"mdi:speaker"}></ha-icon>
                    <span class="menu-action-label">${E}</span>
                  </button>
                `}return g`
                    <div class="entity-options-item group-player-row" style="
                      display:flex;
                      align-items:center;
                      gap:6px;
                      padding: 12px 8px 4px 8px;
                      margin-bottom: 1px;
                      ${S?"opacity: 0.5;":""}
                    ">
                      <div style="flex:1; min-width:120px;">
                        <div style="text-align:left;">${E}</div>
                        <div style="font-size:0.8em; opacity:0.7; text-align:left;">${U}</div>
                      </div>
                      <div style="flex:1.8;display:flex;align-items:center;gap:4px;margin:0 6px; min-width:160px;">
                        ${T?g`
                            <div class="vol-stepper" style="display:flex;align-items:center;gap:4px;">
                              <button @click=${()=>this._onGroupVolumeStep(P,-1)} title="${d("common.vol_down")}" style="background:none;border:none;padding:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:inherit;">
                                <ha-icon icon="mdi:minus"></ha-icon>
                              </button>
                              <button @click=${()=>this._onGroupVolumeStep(P,1)} title="${d("common.vol_up")}" style="background:none;border:none;padding:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:inherit;">
                                <ha-icon icon="mdi:plus"></ha-icon>
                              </button>
                            </div>
                          `:g`
                            <div class="volume-slider-container grouping-vol-slider-container" style="flex:1; padding: 0 4px; position: relative; display: flex; align-items: center;">
                              <div class="volume-percentage-indicator ${this._volumeDraggingEntity===v?"visible":""}" style="left: calc(13px + ${this._dragVolume} * (100% - 26px))">
                                ${Math.round(this._dragVolume*100)}%
                              </div>
                              <input
                                class="vol-slider"
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                .value=${I}
                                @mousedown=${L=>this._onVolumeDragStart(L,v)}
                                @touchstart=${L=>this._onVolumeDragStart(L,v)}
                                @input=${L=>this._onVolumeInput(L)}
                                @mouseup=${L=>this._onVolumeDragEnd(L)}
                                @touchend=${L=>this._onVolumeDragEnd(L)}
                                @change=${L=>this._onGroupVolumeChange(v,P,L)}
                                title="${d("common.volume")}"
                                style="width:100%;max-width:260px;"
                              />
                            </div>
                          `}
                        <span style="min-width:36px;display:inline-block;text-align:right;">${typeof I=="number"?Math.round(I*100)+"%":"--"}</span>
                      </div>
                      ${N?g`
                            <button class="group-toggle-btn"
                                    @click=${()=>!S&&this._toggleGroup(v)}
                                    title=${S?d("card.grouping.unavailable"):k?d("card.grouping.unjoin_from").replace("{master}",Y):d("card.grouping.join_with").replace("{master}",Y)}
                                    style="margin-left:4px; ${S?"cursor: not-allowed; opacity: 0.5;":""}">
                              <ha-icon icon=${k?"mdi:minus-circle-outline":"mdi:plus-circle-outline"}></ha-icon>
                            </button>
                          `:g`<span style="margin-left:4px;margin-right:10px;width:32px;display:inline-block;"></span>`}
                    </div>
                  `})}
          </div>
        `}
      </div>
    `}_renderTransferQueueSheet(){const e=this._isGridMode,t=this._getTransferQueueTargets();return g`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeTransferQueue()}}>
          ${d("common.back")}
        </button>
        <div class="entity-options-divider"></div>
        ${e?b:g`<div class="entity-options-title" style="margin-bottom:12px;">${d("card.menu.transfer_to")}</div>`}
      </div>
      <div class="entity-options-scroll ${e?"grid-menu":""}">
        ${t.length?g`
          <div class="${e?"grid-menu-items":"transfer-queue-list"}">
            ${t.map(i=>e?g`
                  <button class="entity-options-item menu-action-item" 
                    ?disabled=${this._transferQueuePendingTarget===i.maEntityId}
                    @click=${()=>this._transferQueueTo(i)}>
                    <ha-icon class="menu-action-icon" .icon=${i.icon}></ha-icon>
                    <span class="menu-action-label">${i.name}</span>
                  </button>
                `:g`
                <button
                  class="entity-options-item transfer-queue-item"
                  ?disabled=${this._transferQueuePendingTarget===i.maEntityId}
                  @click=${()=>this._transferQueueTo(i)}>
                  <ha-icon .icon=${i.icon} style="margin-right:4px;"></ha-icon>
                  <div style="display:flex;flex-direction:column;align-items:flex-start;">
                    <div>${i.name}</div>
                    <div style="font-size:0.82em;opacity:0.7;">${i.subtitle}</div>
                  </div>
                  ${i.state?g`<div style="margin-left:auto;font-size:0.82em;opacity:0.7;text-transform:capitalize;">${i.state}</div>`:b}
                </button>
              `)}
          </div>
        `:g`
          <div style="padding: 12px; opacity: 0.75;">${d("card.menu.no_players")}</div>
        `}
        ${this._transferQueueStatus?g`
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
        `:b}
      </div>
    `}_renderResolvedEntitiesSheet(){const e=this._isGridMode;return g`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>{this._showResolvedEntities=!1,this.requestUpdate()}}>
          ${d("common.back")}
        </button>
        <div class="entity-options-divider"></div>
        <div class="entity-options-resolved-entities" style="margin-top:12px;">
          ${e?b:g`<div class="entity-options-title">${d("card.menu.select_entity")}</div>`}
          <div class="entity-options-resolved-entities-list ${e?"grid-menu":""}">
            ${this._getResolvedEntitiesForCurrentChip().map(t=>{const i=this.hass?.states?.[t],s=je(this.hass,i||t),r=i?.attributes?.icon||"mdi:help-circle",n=this._selectedIndex,o=this.entityObjs[n];let l="Main Entity",c=!1;if(o){const u=this._getActualResolvedMaEntityForState(n),h=this._getVolumeEntity(n);c=(this._getActivePlaybackEntityForIndex(n)||o.entity_id)===t,t===u&&u!==o.entity_id?l="Music Assistant Entity":t===h&&h!==o.entity_id&&h!==u&&(l="Volume Entity")}return e?g`
            <button class="entity-options-item menu-action-item" @click=${()=>{this._openMoreInfoForEntity(t),this._showEntityOptions=!1,this._showResolvedEntities=!1,this.requestUpdate()}}>
              <ha-icon class="menu-action-icon" .icon=${r}></ha-icon>
              <span class="menu-action-label">${c?`${s} (Active)`:s}</span>
            </button>
          `:g`
                <button class="entity-options-item" @click=${()=>{this._openMoreInfoForEntity(t),this._showEntityOptions=!1,this._showResolvedEntities=!1,this.requestUpdate()}}>
                  <ha-icon .icon=${r} style="margin-right: 8px;"></ha-icon>
                  <div style="display: flex; flex-direction: column; align-items: flex-start;">
                    <div>${c?`${s} (Active)`:s}</div>
                    <div style="font-size: 0.85em; opacity: 0.7;">${l}</div>
                  </div>
                </button>
              `})}
          </div>
        </div>
      </div>
    `}async _fetchLyrics(){if(!this._lyricsActive||this._isIdle||this.isAnyMenuOpen){this._fetchingLyrics=!1,this.requestUpdate();return}this._lyricsError=!1;let e=this.config.lyrics_source||"mass_lrclib";if(this.hass?.user?.is_admin!==!0&&e!=="lrclib")if(e==="mass"){console.warn(`YAMP: ${d("lyrics.admin_only_mass")}`);const h=new CustomEvent("hass-notification",{bubbles:!0,composed:!0,detail:{message:d("lyrics.admin_only_mass")}});this.dispatchEvent(h),this._fetchingLyrics=!1,this._lyricsError=!0,this.requestUpdate();return}else console.log(`YAMP: ${d("lyrics.fallback_to_lrclib_non_admin")}`),e="lrclib";const t=this.metadataStateObj||this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;if(!t){this._massLyrics=[],this.requestUpdate();return}const i=t.attributes.media_artist,s=t.attributes.media_title,r=t.attributes.media_album_name,n=t.attributes.media_duration,o=t.attributes.media_content_id,l=o?`${o}:${i}:${s}`:`${i}:${s}`;if(this._fetchingLyrics&&this._fetchingCacheKey===l)return;if(this._lyricsCache.has(l)){const h=this._lyricsCache.get(l);this._lyricsCache.delete(l),this._lyricsCache.set(l,h),this._massLyrics=h,this._fetchingLyrics=!1,this.requestUpdate();return}const c=Symbol();this._currentFetchToken=c,this._fetchingLyrics=!0,this._fetchingCacheKey=l,this._massLyrics=[],this.requestUpdate();let u;try{if(e==="mass")u=await this._getMassLyrics(t,c);else if(e==="lrclib")u=await this._getLrclibLyrics(i,s,r,n,c);else{const h=this._getMassLyrics(t,c),p=this._getLrclibLyrics(i,s,r,n,c),_=e==="mass_lrclib",m=async(v,x)=>{const k=await v;if(this._currentFetchToken!==c)return null;if(k&&k.length>0){const E=x==="mass"&&_||x==="lrclib"&&!_;(!this._massLyrics||this._massLyrics.length===0||E)&&(this._massLyrics=k||[],this._fetchingLyrics=!1,this.requestUpdate())}return k},[f,y]=await Promise.all([m(h,"mass"),m(p,"lrclib")]);if(this._currentFetchToken!==c)return;_?u=f&&f.length>0?f:y:u=y&&y.length>0?y:f}if(this._currentFetchToken===c){if(this._massLyrics=u||[],u&&u.length>0){if(this._lyricsCache.size>=M_){const h=this._lyricsCache.keys().next().value;this._lyricsCache.delete(h)}this._lyricsCache.set(l,u)}else u===null&&(this._lyricsError=!0);this._fetchingLyrics=!1,this._fetchingCacheKey=null,this.requestUpdate()}}catch(h){this._currentFetchToken===c&&(console.error("YAMP: Failed to fetch lyrics:",h),this._lyricsError=!0,this._fetchingLyrics=!1,this._fetchingCacheKey=null,this.requestUpdate())}}async _getMassLyrics(e,t){if(this._hasMassQueueIntegration===!1)return[];if(!this._massQueueAvailable){if(this._massQueueAvailable=await this._isMassQueueIntegrationAvailable(this.hass),this._hasMassQueueIntegration=this._massQueueAvailable,!this._massQueueAvailable)return[];if(this._currentFetchToken!==t)return[]}try{const i=this._getSearchEntityId(this._selectedIndex),s=await this._resolveTemplateAtActionTime(i,this.currentEntityId),r=await Ii(this.hass,s);if(!r)return[];const n=e.attributes.media_content_id;if(!n||!n.includes("://"))return[];const o={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{command:"music/item_by_uri",data:{uri:n},...r&&r!=="auto"&&{config_entry_id:r}},return_response:!0},l=await this.hass.connection.sendMessagePromise(o);if(this._currentFetchToken!==t)return[];const c=l?.response?.response||l?.response||l?.result;if(!c)return[];const u={type:"call_service",domain:"mass_queue",service:"send_command",service_data:{command:"metadata/get_track_lyrics",data:{track:c},...r&&r!=="auto"&&{config_entry_id:r}},return_response:!0},h=await this.hass.connection.sendMessagePromise(u);if(this._currentFetchToken!==t)return[];const p=h?.response?.response||h?.response||h?.result;if(p){let _="";if(Array.isArray(p))_=p[1]||p[0]||"";else if(typeof p=="string")_=p;else if(typeof p=="object"){if(p.instrumental)return[{time:0,text:d("lyrics.instrumental")||"Instrumental Track",isInstrumental:!0}];_=p.lyrics||p.text||""}return _?Mn(_):[]}}catch(i){console.warn("YAMP: MA Lyrics fetch failed:",i)}return[]}async _getLrclibLyrics(e,t,i,s,r){if(!e||!t)return[];const n=this._cleanTrackMetadata(e),o=this._cleanTrackMetadata(t),l=i?this._cleanTrackMetadata(i):"";try{const c={"Lrclib-Client":"yet-another-media-player/2026.10.1 (https://github.com/jianyu-li/yet-another-media-player)"};let u=`https://lrclib.net/api/get?artist_name=${encodeURIComponent(n)}&track_name=${encodeURIComponent(o)}`;l&&(u+=`&album_name=${encodeURIComponent(l)}`),s&&(u+=`&duration=${Math.round(s)}`);let h=await fetch(u,{headers:c});if(this._currentFetchToken!==r)return[];if(!h.ok&&h.status!==404)throw new Error(`LRCLIB error: ${h.status}`);let p=null;if(h.ok)p=await h.json();else{const _=`https://lrclib.net/api/search?artist_name=${encodeURIComponent(n)}&track_name=${encodeURIComponent(o)}`,m=await fetch(_,{headers:c});if(this._currentFetchToken!==r)return[];if(m.ok){const f=await m.json();f&&f.length>0&&(p=f[0])}}if(p){if(p.instrumental)return[{time:0,text:d("lyrics.instrumental")||"Instrumental Track",isInstrumental:!0}];const _=p.syncedLyrics||p.plainLyrics||"";return _?Mn(_):[]}}catch(c){console.warn("YAMP: LRCLIB Lyrics fetch failed:",c)}return[]}updated(e){if(e.has("hass")&&this.hass){const c=this.hass.selectedLanguage||this.hass.language||this.hass.locale?.language;c&&da(c)}this._updateHostAttributes(),this._idleImageTemplate&&e.has("hass")&&(this._idleImageTemplateNeedsResolve=!0),this._backgroundImageTemplate&&e.has("hass")&&(this._backgroundImageTemplateNeedsResolve=!0),this._fontColorTemplate&&e.has("hass")&&(this._fontColorTemplateNeedsResolve=!0);const t=JSON.stringify(this._getTemplateContext());if(this._syncTemplateSubscriptions("action_in_menu",t,this.config?.actions),this._syncTemplateSubscriptions("always_collapsed",t,this.config?.always_collapsed),this._syncTemplateSubscriptions("control_layout",t,this.config?.control_layout),this._syncTemplateSubscriptions("card_height",t,this.config?.card_height),this._syncTemplateSubscriptions("lyrics_background_fade",t,this.config?.lyrics_background_fade),this._syncTemplateSubscriptions("lock_screen_controls",t,this.config?.lock_screen_controls),this._syncEntityTemplateSubscriptions("ma",t),this._syncEntityTemplateSubscriptions("vol",t),this._syncEntityTemplateSubscriptions("remote",t),this._syncEntityTemplateSubscriptions("hidden_controls",t),e.has("_selectedIndex")&&(this._lastMediaTitle=null,this._searchResultsByType={},this._upcomingFilterActive&&(this._searchResults=[],this._refreshQueue({delayMs:50}))),(e.has("_selectedIndex")||e.has("hass"))&&this._updateTransferQueueAvailability({refresh:!1}),(e.has("hass")||e.has("config"))&&this._updateArtworkAspectRatios(),this.hass&&this._hasMassQueueIntegration===null&&!this._checkingMassQueueIntegration&&(this._checkingMassQueueIntegration=!0,this._isMassQueueIntegrationAvailable(this.hass).then(c=>{this._hasMassQueueIntegration=c,c&&(this._massQueueAvailable=this._massQueueAvailable||c)}).catch(()=>{this._hasMassQueueIntegration=!1}).finally(()=>{this._checkingMassQueueIntegration=!1,this.requestUpdate()})),this.hass&&this.entityIds){if(this._upcomingFilterActive){const p=this._getEntityForPurpose(this._selectedIndex,"metadata");if(p){const _=this.hass.states[p]?.attributes?.media_title;if(_&&_!==this._lastMediaTitle){const m=e.has("_selectedIndex");if(this._lastMediaTitle=_,this._upcomingFilterActive&&!m){const f=Date.now();this._latestManualShiftTime&&f-this._latestManualShiftTime<4e3||this._advanceQueueInUI(null,!1),this._refreshQueue({delayMs:2e4})}}}}const c=Date.now();for(let p=0;p<this.entityIds.length;p++){const _=this.entityIds[p],m=this.entityObjs[p];if(!m)continue;const f=m.entity_id,y=this._getActualResolvedMaEntityForState(p),v=this.hass.states[f]?.state,x=this._playerStateCache[f];if(v==="playing"?(this._playTimestamps[f]=c,this._lastActiveEntityIdByChip[p]=f):x==="playing"&&v!=="playing"&&(this._playTimestamps[f]=c),this._playerStateCache[f]=v,y&&y!==f){const E=this.hass.states[y]?.state,S=this._playerStateCache[y];E==="playing"?(this._playTimestamps[y]=c,this._lastActiveEntityIdByChip[p]=y):S==="playing"&&E!=="playing"&&(this._playTimestamps[y]=c),this._playerStateCache[y]=E}const k=this._getEntityForPurpose(p,"sorting");k&&this.hass.states[k]?.state==="playing"&&(this._playTimestamps[_]=c)}if(this._manualSelect&&this._pinnedIndex===null&&this._manualSelectPlayingSet){for(const p of[...this._manualSelectPlayingSet]){const _=this.hass.states[p];this._isEntityPlaying(_)||this._manualSelectPlayingSet.delete(p)}for(const p of this.entityIds){const _=this.hass.states[p];if(this._isEntityPlaying(_)&&!this._manualSelectPlayingSet.has(p)){this._manualSelect=!1,this._manualSelectPlayingSet=null;break}}}if(this._updateIdleState(e),!this._manualSelect&&!this.isAnyMenuOpen){const p=this.sortedEntityIds;if(p.length>0){let _=p[0];const m=_?(this.groupedSortedEntityIds||[]).find(S=>S.includes(_)):null;if(m&&m.length>1){const S=this._getActualGroupMaster(m);S&&(_=S)}const f=this.entityIds.indexOf(_),y=f>=0?this._getEntityForPurpose(f,"sorting"):null,v=y?this.hass.states[y]:null,x=this._isCurrentEntityPlaying(),k=this.entityObjs[this._selectedIndex]?.disable_auto_select,E=x&&!k;(this._isEntityPlaying(v)||k)&&this.entityIds[this._selectedIndex]!==_&&(!this._idleTimeout||!this._hasSeenPlayback)&&!E&&!this.entityObjs[f]?.disable_auto_select&&(this._selectedIndex=f)}}const u=this.entityIds[this._selectedIndex],h=u?(this.groupedSortedEntityIds||[]).find(p=>p.includes(u)):null;if(h&&h.length>1){const p=this._getActualGroupMaster(h);if(p&&p!==u){const _=this.entityIds.indexOf(p);_>=0&&!this.entityObjs[_]?.disable_auto_select&&(this._selectedIndex=_,this._lastGroupingMasterId=p)}}this._ensureResolvedMaForIndex(this._selectedIndex),this._ensureResolvedVolForIndex(this._selectedIndex),this._ensureResolvedHiddenControlsForIndex(this._selectedIndex),this._updateSelectedEntityHelper(),this._handleSelectEntityFromHelper()}this._handleVolumeOverlayDetection(e),e.has("_lyricsActive")&&this._adaptiveText&&(this._setAdaptiveTextVars(this._currentTextScale,void 0,this._currentDetailsScale),this._updateMarquee());const i=this.shadowRoot?.querySelector(".card-lower-content");this._lyricsActive||i&&i.offsetHeight>50&&(this._lastNonLyricsLowerContentHeight=i.offsetHeight);const s=this.shadowRoot?.querySelector(".details"),r=s||this.shadowRoot?.querySelector(".progress-bar-container:not(.alternate)")||this.shadowRoot?.querySelector(".controls-row")||this.shadowRoot?.querySelector(".volume-row");let n=0;if(i&&r&&i.contains(r)&&(n=i.offsetHeight-r.offsetTop),n<=0){s&&(n+=s.offsetHeight);const c=this.shadowRoot?.querySelector(".progress-bar-container:not(.alternate)");c&&(n+=c.offsetHeight);const u=this.shadowRoot?.querySelector(".controls-row");u&&(n+=u.offsetHeight);const h=this.shadowRoot?.querySelector(".volume-row");h&&(n+=h.offsetHeight)}if(n>30&&this._lowerControlsHeight!==n&&(this._lowerControlsHeight=n,this._lyricsActive&&this.requestUpdate()),this._lyricsActive){const c=this.metadataStateObj||this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj,u=c?.attributes?.media_content_id||null,h=c?.attributes?.media_artist||null,p=c?.attributes?.media_title||null,_=this.currentActivePlaybackEntityId||this.currentEntityId||null,m=!!(u||h||p),f=u!==this._lastLyricsTrackId||h!==this._lastLyricsArtist||p!==this._lastLyricsTitle||_!==this._lastLyricsEntityId;m&&f&&!this._isIdle&&!this.isAnyMenuOpen?(this._lastLyricsTrackId=u,this._lastLyricsArtist=h,this._lastLyricsTitle=p,this._lastLyricsEntityId=_,this._fetchingLyrics=!0,this._lyricsError=!1,this._lyricsFetchTimeout&&clearTimeout(this._lyricsFetchTimeout),this._lyricsFetchTimeout=setTimeout(()=>{this._fetchLyrics(),this._lyricsFetchTimeout=null},500)):!m&&f&&(this._lastLyricsTrackId=null,this._lastLyricsArtist=null,this._lastLyricsTitle=null,this._lastLyricsEntityId=_,this._lyricsFetchTimeout&&clearTimeout(this._lyricsFetchTimeout),this._massLyrics=[],this._fetchingLyrics=!1,this._lyricsError=!1,this.requestUpdate())}super.updated?.(e),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=null);const o=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj;if(this._isEntityPlaying(o)&&o.attributes.media_duration&&(this._progressTimer=setInterval(()=>{this.requestUpdate()},500)),this._mediaSessionManager){const c=this.currentActivePlaybackEntityId||this.currentEntityId,u=this.metadataStateObj,h=this.currentStateObj,p=this._getArtworkUrl(u,!1),_=this._getArtworkUrl(o,!1),m=this._getArtworkUrl(h,!1),f=p?.url||_?.url||m?.url||u?.attributes?.entity_picture||o?.attributes?.entity_picture||h?.attributes?.entity_picture||"",y=u?.attributes?.media_title||o?.attributes?.media_title||h?.attributes?.media_title||je(this.hass,o)||je(this.hass,h)||"",v=u?.attributes?.media_artist||o?.attributes?.media_artist||h?.attributes?.media_artist||"",x=u?.attributes?.media_album_name||o?.attributes?.media_album_name||h?.attributes?.media_album_name||"";this._isEditorPreview||this._mediaSessionManager.update({enabled:this._isMediaSessionEnabled,stateObj:o,targetEntityId:c,artworkUrl:f,title:y,artist:v,album:x})}if(this._alwaysCollapsed&&this._expandOnSearch&&this._showSearchInSheet){this._prevCollapsed!==!1&&(this._prevCollapsed=!1,this._notifyResize());return}const l=this._alwaysCollapsed?!0:this._collapseOnIdle?this._isIdle:!1;if(this._prevCollapsed!==l&&(this._prevCollapsed=l,this._notifyResize()),this._addGrabScroll(".chip-row"),this._addGrabScroll(".action-chip-row"),this._addGrabScroll(".search-filter-chips"),this._addVerticalGrabScroll(".floating-source-index"),this._lastRenderedCollapsed&&!this._lastRenderedHideControls){const c=this.renderRoot?.querySelector(".card-lower-content");if(c){const u=c.offsetHeight;if(u&&u>0){const h=typeof this.config?.card_height=="string"&&(this.config.card_height.includes("{{")||this.config.card_height.includes("{%")||this.config.card_height.trim().startsWith("[[["))?this._cardHeightResolveCache?.card?.value:this.config?.card_height,p=Number(h);Number.isFinite(p)&&p>0?(!this._collapsedBaselineHeight||u<this._collapsedBaselineHeight-1)&&(this._collapsedBaselineHeight=u):this._collapsedBaselineHeight=u}}}if(this._showSearchInSheet){const c=this._alwaysCollapsed&&this._expandOnSearch?300:200;setTimeout(()=>{const u=()=>{const _=this.renderRoot.querySelector("#search-input-box");return _?(_.focus(),this._searchInputAutoFocused=!0,!0):!1};!this._disableSearchAutofocus&&!this._searchInputAutoFocused&&(u()||setTimeout(()=>{this._showSearchInSheet&&!this._disableSearchAutofocus&&!this._searchInputAutoFocused&&u()},200));const h=this._getVisibleSearchFilterClasses().join(",");if((!this._searchLoading||h)&&this._lastSearchChipClasses!==h){const _=this.renderRoot.querySelector(".search-filter-chips");_&&(_.scrollLeft=0);const m=this.renderRoot.querySelector(".entity-options-overlay");m&&(m.scrollTop=0);const f=this.renderRoot.querySelector(".entity-options-sheet");f&&(f.scrollTop=0),this._lastSearchChipClasses=h}const p=this.renderRoot.querySelector("#search-filter-chip-row");p&&(p.scrollWidth>p.clientWidth+2?p.style.justifyContent="flex-start":p.style.justifyContent="center")},c)}this._showSourceList&&setTimeout(()=>{const c=this.renderRoot.querySelector(".entity-options-overlay");c&&(c.scrollTop=0)},0),this.updateComplete.then(()=>this._updateMarquee())}_toggleSourceMenu(){this._showSourceMenu=!this._showSourceMenu,this._showSourceMenu?(this._manualSelect=!0,setTimeout(()=>{this._shouldDropdownOpenUp=!0,this.requestUpdate(),this._addSourceDropdownOutsideHandler()},0)):(this._manualSelect=!1,this._removeSourceDropdownOutsideHandler())}_addSourceDropdownOutsideHandler(){this._sourceDropdownOutsideHandler||(this._sourceDropdownOutsideHandler=e=>{const t=this.renderRoot.querySelector(".source-dropdown"),i=this.renderRoot.querySelector(".source-menu-btn"),s=e.composedPath?e.composedPath():[];t&&s.includes(t)||i&&s.includes(i)||(this._showSourceMenu=!1,this._manualSelect=!1,this._removeSourceDropdownOutsideHandler(),this.requestUpdate())},window.addEventListener("mousedown",this._sourceDropdownOutsideHandler,!0),window.addEventListener("touchstart",this._sourceDropdownOutsideHandler,!0))}_removeSourceDropdownOutsideHandler(){this._sourceDropdownOutsideHandler&&(window.removeEventListener("mousedown",this._sourceDropdownOutsideHandler,!0),window.removeEventListener("touchstart",this._sourceDropdownOutsideHandler,!0),this._sourceDropdownOutsideHandler=null)}_selectSource(e){const t=this.currentEntityId;!t||!e||(this.hass.callService("media_player","select_source",{entity_id:t,source:e}),this._closeEntityOptions())}_onPinClick(e){e.stopPropagation(),this._manualSelect=!1,this._pinnedIndex=null,this._manualSelectPlayingSet=null}_onChipClick(e){if(this._mediaSessionManager?.resumeFromUserGesture(),this._holdToPin&&this._justPinned){this._justPinned=!1;return}if(this._selectedIndex=e,this._isIdle){const t=this.entityIds[e],i=this._getEntityForPurpose(e,"sorting"),s=this.hass?.states?.[i]||this.hass?.states?.[t];this._isEntityPlaying(s)&&(this._setIdleState(!1),this._hasSeenPlayback=!0,this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),this._resetIdleScreen())}if(this._lastActiveEntityId=null,clearTimeout(this._manualSelectTimeout),this._holdToPin)if(this._pinnedIndex!==null)this._manualSelect=!0;else{this._manualSelect=!0,this._manualSelectPlayingSet=new Set;for(const t of this.entityIds){const i=this.hass?.states?.[t];this._isEntityPlaying(i)&&this._manualSelectPlayingSet.add(t)}}else this._manualSelect=!0,this._pinnedIndex=e;this.requestUpdate()}_pinChip(e){this._justPinned=!0,clearTimeout(this._manualSelectTimeout),this._manualSelectPlayingSet=null,this._pinnedIndex=e,this._manualSelect=!0,this.requestUpdate()}async _onActionChipClick(e){const t=this.config.actions[e];t&&await this._handleAction(t)}async _handleAction(e){if(!e)return;if(e.menu_item){switch(this._quickMenuInvoke=!0,e.menu_item){case"more-info":this._openMoreInfo(),this._showEntityOptions=!1,this.requestUpdate();break;case"group-players":this._showEntityOptions=!0,this._showGrouping=!0,this.requestUpdate();break;case"search":this._openQuickSearchOverlay();break;case"search-recently-played":this._showEntityOptions=!0,this._showSearchSheetInOptions("recently-played"),setTimeout(()=>{this._notifyResize()},0);break;case"search-next-up":this._showEntityOptions=!0,this._showSearchSheetInOptions("next-up"),setTimeout(()=>{this._notifyResize()},0);break;case"source":this._showEntityOptions=!0,this._showSourceList=!0,this._showGrouping=!1,this.requestUpdate();break;case"transfer-queue":this._showEntityOptions=!0,this._openTransferQueue();break;case"main-menu":this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._showTransferQueue=!1,await this._openEntityOptions();break}return}if(typeof e.navigation_path=="string"&&e.navigation_path.trim()!==""||e.action==="navigate"){let r=(typeof e.navigation_path=="string"?e.navigation_path:e.path||"").trim();const n=e.navigation_new_tab===!0,o=this._getTemplateContext();let l=null;n&&(l=dt(this.hass,r,o)),l!=null?this._handleNavigate(l,n):(r=await ki(this.hass,r,o),this._handleNavigate(r,n));return}if(e.action==="toggle_lyrics"){this._lyricsActive=!this._lyricsActive,this.requestUpdate();return}if(e.action==="remote_control"){this._openRemoteControl();return}if(e.action==="toggle_media_session"||e.action==="toggle_lock_screen_controls"){const r=this._isMediaSessionEnabled;this._mediaSessionOverride=!r,this._mediaSessionOverride?this._mediaSessionManager?.startPlaybackGesture(this.currentEntityId):this._mediaSessionManager?.reset(),this.requestUpdate();return}if(e.action==="prev_entity"||e.action==="next_entity"){const r=this.sortedEntityIds;if(r&&r.length>0){const n=this.entityIds[this._selectedIndex],o=r.indexOf(n);if(o!==-1){let l;if(e.action==="prev_entity"?l=Math.max(0,o-1):l=Math.min(r.length-1,o+1),l!==o){const c=r[l],u=this.entityIds.indexOf(c);u!==-1&&u!==this._selectedIndex&&this._onChipClick(u)}}}return}if(!e.service)return;const[t,i]=e.service.split(".");let s={...e.service_data||{}};if(t==="script"&&e.script_variable===!0){const r=this.currentEntityId,n=this._getSearchEntityId(this._selectedIndex),o=await this._resolveTemplateAtActionTime(n,r),l=this.currentActivePlaybackEntityId||this._getPlaybackEntityId(this._selectedIndex),c=await this._resolveTemplateAtActionTime(l,r);(s.entity_id==="current"||s.entity_id==="$current"||s.entity_id==="this")&&delete s.entity_id,s.yamp_entity=o||r,s.yamp_main_entity=r,s.yamp_playback_entity=c}else if(!(t==="script"&&e.script_variable===!0)&&(s.entity_id==="current"||s.entity_id==="$current"||s.entity_id==="this"||!s.entity_id))if(t==="music_assistant"){const r=this._getSearchEntityId(this._selectedIndex);s.entity_id=await this._resolveTemplateAtActionTime(r,this.currentEntityId)}else if(t==="media_player"){const r=this.currentActivePlaybackEntityId||this._getPlaybackEntityId(this._selectedIndex);s.entity_id=await this._resolveTemplateAtActionTime(r,this.currentEntityId)}else s.entity_id=this.currentEntityId;t==="media_player"&&(i==="media_play"||i==="media_play_pause")&&this._mediaSessionManager?.startPlaybackGesture(s.entity_id||this.currentEntityId),this.hass.callService(t,i,s)}_onTapAreaPointerDown(e){this.isAnyMenuOpen||e.composedPath().some(t=>t.tagName==="BUTTON"||t.tagName==="HA-ICON"||t.tagName==="INPUT"||t.classList&&t.classList.contains("clickable-artist")||t.classList&&t.classList.contains("details")&&!this._isIdle)||(this._gestureActive=!0,this._gestureStartTime=Date.now(),this._gestureStartX=e.clientX,this._gestureStartY=e.clientY,this._gestureHoldTriggered=!1,this._gestureTapArea=e.currentTarget,this._cardTriggers?.hold&&(this._gestureHoldTimer=setTimeout(()=>{this._gestureActive&&(this._gestureHoldTriggered=!0,this._showGestureFeedback("hold",this._gestureStartX,this._gestureStartY),this._handleAction(this._cardTriggers.hold))},ll)))}_onTapAreaPointerMove(e){if(this.isAnyMenuOpen||!this._gestureActive)return;const t=Math.abs(e.clientX-this._gestureStartX),i=Math.abs(e.clientY-this._gestureStartY);(t>ii||i>ii)&&clearTimeout(this._gestureHoldTimer)}_onTapAreaPointerUp(e){if(this.isAnyMenuOpen||!this._gestureActive||(this._gestureActive=!1,clearTimeout(this._gestureHoldTimer),this._gestureHoldTriggered)||Date.now()-this._gestureStartTime>ll)return;const t=e.clientX-this._gestureStartX,i=e.clientY-this._gestureStartY,s=Math.abs(t),r=Math.abs(i);if(s>=dl&&r<dl){clearTimeout(this._tapTimer);const u=e.clientX,h=e.clientY;if(t<0&&this._cardTriggers?.swipe_left){this._showGestureFeedback("swipe_left",u,h),this._handleAction(this._cardTriggers.swipe_left);return}else if(t>0&&this._cardTriggers?.swipe_right){this._showGestureFeedback("swipe_right",u,h),this._handleAction(this._cardTriggers.swipe_right);return}}if(s>ii||r>ii)return;const n=Date.now(),o=n-(this._lastTapTime||0);this._lastTapTime=n;const l=e.clientX,c=e.clientY;o<cl?(clearTimeout(this._tapTimer),this._cardTriggers?.double_tap&&(this._showGestureFeedback("double_tap",l,c),this._handleAction(this._cardTriggers.double_tap))):this._tapTimer=setTimeout(()=>{this._cardTriggers?.tap&&(this._showGestureFeedback("tap",l,c),this._handleAction(this._cardTriggers.tap))},j_)}_onTapAreaPointerCancel(e){this._gestureActive=!1,clearTimeout(this._gestureHoldTimer)}_onIdleTapAreaPointerDown(e){this._isIdle&&this._onTapAreaPointerDown(e)}_onIdleTapAreaPointerMove(e){this._isIdle&&this._onTapAreaPointerMove(e)}_onIdleTapAreaPointerUp(e){this._isIdle&&this._onTapAreaPointerUp(e)}_onIdleTapAreaPointerCancel(e){this._isIdle&&this._onTapAreaPointerCancel(e)}_hasGestureTriggers(){return!!(this._cardTriggers?.tap||this._cardTriggers?.hold||this._cardTriggers?.double_tap||this._cardTriggers?.swipe_left||this._cardTriggers?.swipe_right)}_getGestureStyles(e=!0){return e&&this._hasGestureTriggers()?"cursor:pointer; pointer-events:auto;":""}_showGestureFeedback(e,t,i){const s=this.shadowRoot?.querySelector(".yamp-card-inner"),r=this._gestureTapArea||this.shadowRoot?.querySelector(".card-artwork-spacer")||this.shadowRoot?.querySelector(".collapsed-artwork-container")||this.shadowRoot?.querySelector(".media-artwork-placeholder")||s;if(!r)return;const n=(r.shadowRoot||r.tagName==="YAMP-LYRICS-VIEW")&&s||r,o=n.getBoundingClientRect(),l=t-o.left,c=i-o.top,u=document.createElement("div");u.className=`gesture-ripple ${e}`,u.style.left=`${l}px`,u.style.top=`${c}px`;let h=n.querySelector(".gesture-feedback-container");h||(h=document.createElement("div"),h.className="gesture-feedback-container",n.appendChild(h)),u.addEventListener("animationend",()=>u.remove()),h.appendChild(u)}_onMenuActionClick(e){const t=this.config.actions?.[e];t&&(t.menu_item||(this._quickMenuInvoke=!0),this._onActionChipClick(e),t.menu_item||this._dismissWithAnimation())}_getActionLabel(e){if(!e)return"";if(typeof e.name=="string"&&e.name.trim()!=="")return e.name.trim();const t=!!e.icon;return e.menu_item?t?"":{search:d("card.menu.search"),"search-recently-played":d("search.recently_played"),"search-next-up":d("search.next_up"),source:d("card.menu.source"),"more-info":d("card.menu.more_info"),"group-players":d("card.menu.group_players"),"transfer-queue":d("card.menu.transfer_queue"),"main-menu":d("card.menu.main_menu")}[e.menu_item]??e.menu_item:typeof e.navigation_path=="string"&&e.navigation_path.trim()!==""||e.action==="navigate"?t?"":"Navigate":e.action==="toggle_lyrics"?t?"":d("editor.action_types.toggle_lyrics")||"Toggle Lyrics Overlay":e.action==="remote_control"?t?"":d("editor.action_types.remote_control")||"Open Remote Controls Overlay":e.action==="toggle_media_session"||e.action==="toggle_lock_screen_controls"?t?"":d("editor.action_types.toggle_media_session")||"Toggle Media Session Controls":e.service?t?"":e.service:t?"":"Action"}async _onControlClick(e){this._mediaSessionManager?.resumeFromUserGesture();const t=this._getEntityForPurpose(this._selectedIndex,"playback_control");if(!t)return;const i=this.hass?.states?.[t]||this.currentStateObj;switch(e){case"play_pause":this._isEntityPlaying(i)?(this.hass.callService("media_player","media_pause",{entity_id:t}),this._lastPlayingEntityIdByChip||(this._lastPlayingEntityIdByChip={}),this._lastPlayingEntityIdByChip[this._selectedIndex]=t,this._pauseTimestamps||(this._pauseTimestamps={}),this._pauseTimestamps[this._selectedIndex]=Date.now(),this._controlFocusEntityId=t,this._optimisticPlayback={entity_id:t,state:"paused",ts:Date.now()},this.requestUpdate(),setTimeout(()=>{this._optimisticPlayback=null,this.requestUpdate()},1200)):(this._mediaSessionManager?.startPlaybackGesture(t),this.hass.callService("media_player","media_play",{entity_id:t}),this._lastPlayingEntityIdByChip&&delete this._lastPlayingEntityIdByChip[this._selectedIndex],this._pauseTimestamps&&delete this._pauseTimestamps[this._selectedIndex],this._controlFocusEntityId=t,this._optimisticPlayback={entity_id:t,state:"playing",ts:Date.now()},this.requestUpdate(),setTimeout(()=>{this._optimisticPlayback=null,this.requestUpdate()},1200));break;case"next":this._mediaSessionManager?.startPlaybackGesture(t),this._advanceQueueInUI(null,!0),this.hass.callService("media_player","media_next_track",{entity_id:t});break;case"prev":this._mediaSessionManager?.startPlaybackGesture(t),this.hass.callService("media_player","media_previous_track",{entity_id:t});break;case"stop":if(this.hass.callService("media_player","media_stop",{entity_id:t}),i){const s=t;this._optimisticPlayback={entity_id:s,state:"idle",ts:Date.now()},this.requestUpdate(),setTimeout(()=>{this._optimisticPlayback=null,this.requestUpdate()},1200)}break;case"shuffle":{const s=!!i.attributes.shuffle;this.hass.callService("media_player","shuffle_set",{entity_id:t,shuffle:!s});break}case"repeat":{let s=i.attributes.repeat||"off",r;s==="off"?r="all":s==="all"?r="one":r="off",this.hass.callService("media_player","repeat_set",{entity_id:t,repeat:r});break}case"power":{const s=this.currentEntityId,r=(this.hass?.states?.[s]||i)?.state==="off"?"turn_on":"turn_off";this.hass.callService("media_player",r,{entity_id:s});const n=this.entityObjs[this._selectedIndex];if(n&&n.sync_power){const o=this._getVolumeEntity(this._selectedIndex);o&&o!==n.entity_id&&this.hass.callService("media_player",r,{entity_id:o})}break}case"favorite":{const s=this._getFavoriteButtonEntity(),r=this.hass?.states?.[t]?.attributes?.media_content_id,n=this._isCurrentTrackFavorited(),o=await this._isMassQueueIntegrationAvailable(this.hass);if(n&&o){const l=this._getMusicAssistantState()?.entity_id;if(l)try{const c={type:"call_service",domain:"mass_queue",service:"unfavorite_current_item",service_data:{entity:l}};await this.hass.connection.sendMessagePromise(c),r&&(this._favoriteStatusCache||(this._favoriteStatusCache={}),this._favoriteStatusCache[r]={isFavorited:!1}),this._searchResultsByType&&Object.keys(this._searchResultsByType).forEach(u=>{(u.includes("_favorites")||u==="favorites")&&delete this._searchResultsByType[u]}),this._checkingFavorites=null,this.requestUpdate()}catch(c){console.error("yamp: Failed to unfavorite current item:",c)}}else s&&(this.hass.callService("button","press",{entity_id:s}),r&&(this._favoriteStatusCache||(this._favoriteStatusCache={}),this._favoriteStatusCache[r]={isFavorited:!0},this._checkingFavorites=null,this._searchResultsByType&&Object.keys(this._searchResultsByType).forEach(l=>{(l.includes("_favorites")||l==="favorites")&&delete this._searchResultsByType[l]}),this.requestUpdate()));break}}}_onVolumeChange(e){this._suppressVolumeOverlay();const t=this._selectedIndex,i=this._getGroupingEntityId(t)||this.currentEntityId,s=this.hass.states[i],r=Number(e.target.value),n=this.entityObjs[t],o=typeof n.group_volume=="boolean"?n.group_volume:!0,l=this._isActiveChipGrouped(t);if(!o||!l){this.hass.callService("media_player","volume_set",{entity_id:this._getVolumeEntity(t),volume_level:r});return}if(this._isCurrentlyGrouped(s)){const c=this.entityObjs[t].entity_id,u=[...new Set([c,...s.attributes.group_members])],h=typeof this._groupBaseVolume=="number"?this._groupBaseVolume:Number(this.currentVolumeStateObj?.attributes.volume_level||0),p=r-h,_=new Set;for(const m of u){const f=this._resolveEntityIdxByGroupingId(m);if(f>=0&&f!==t){const k=this.entityObjs[f];if(k&&k.group_volume===!1)continue}const y=f>=0?this._getVolumeEntity(f):m;if(_.has(y))continue;_.add(y);const v=this.hass.states[y];if(!v)continue;let x=Number(v.attributes.volume_level||0)+p;x=Math.max(0,Math.min(1,x)),x=Math.round(x*1e4)/1e4,this.hass.callService("media_player","volume_set",{entity_id:y,volume_level:x})}this._groupBaseVolume=r}else{const c=this._getVolumeEntity(t);this.hass.callService("media_player","volume_set",{entity_id:c,volume_level:r})}}_onVolumeStep(e){this._suppressVolumeOverlay();const t=this._selectedIndex,i=this._getVolumeEntity(t);if(!i)return;const s=i.startsWith&&i.startsWith("remote."),r=this.currentVolumeStateObj;if(!r)return;if(s){this.hass.callService("remote","send_command",{entity_id:i,command:e>0?"volume_up":"volume_down"});return}const n=this._getGroupingEntityId(t)||this.currentEntityId,o=this.hass.states[n],l=this.entityObjs[t],c=typeof l.group_volume=="boolean"?l.group_volume:!0,u=this._isActiveChipGrouped(t);if(c&&u&&this._isCurrentlyGrouped(o)){const h=this.entityObjs[t].entity_id,p=[...new Set([h,...o.attributes.group_members])],_=this._getEffectiveVolumeStep()*e,m=new Set;for(const f of p){const y=this._resolveEntityIdxByGroupingId(f);if(y>=0&&y!==t){const E=this.entityObjs[y];if(E&&E.group_volume===!1)continue}const v=y>=0?this._getVolumeEntity(y):f;if(m.has(v))continue;m.add(v);const x=this.hass.states[v];if(!x)continue;let k=Number(x.attributes.volume_level||0)+_;k=Math.max(0,Math.min(1,k)),k=Math.round(k*1e4)/1e4,this.hass.callService("media_player","volume_set",{entity_id:v,volume_level:k})}}else{let h=Number(r.attributes.volume_level||0);h+=this._getEffectiveVolumeStep()*e,h=Math.max(0,Math.min(1,h)),h=Math.round(h*1e4)/1e4,this.hass.callService("media_player","volume_set",{entity_id:i,volume_level:h})}}_onMuteToggle(){this._suppressVolumeOverlay();const e=this._selectedIndex,t=this._getVolumeEntity(e);if(!t)return;const i=t.startsWith&&t.startsWith("remote."),s=this.currentVolumeStateObj;if(!s)return;const r=s.attributes.is_volume_muted??!1,n=s.attributes.volume_level??0;if(i){r?this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:.5}):this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:0});return}if(!this._supportsFeature(s,_s)){if(n>0)this._previousVolume=n,this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:0});else{const p=this._previousVolume??.5;this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:p}),this._previousVolume=null}return}const o=this._getGroupingEntityId(e)||this.currentEntityId,l=this.hass.states[o],c=this.entityObjs[e],u=typeof c.group_volume=="boolean"?c.group_volume:!0,h=this._isActiveChipGrouped(e);if(u&&h&&this._isCurrentlyGrouped(l)){const p=this.entityObjs[e].entity_id,_=[...new Set([p,...l.attributes.group_members])],m=new Set;for(const f of _){const y=this._resolveEntityIdxByGroupingId(f);if(y>=0&&y!==e){const k=this.entityObjs[y];if(k&&k.group_volume===!1)continue}const v=y>=0?this._getVolumeEntity(y):f;if(m.has(v))continue;m.add(v);const x=this.hass.states[v];x&&this._supportsFeature(x,_s)?this.hass.callService("media_player","volume_mute",{entity_id:v,is_volume_muted:!r}):(x?.attributes?.volume_level??0)>0?this.hass.callService("media_player","volume_set",{entity_id:v,volume_level:0}):this.hass.callService("media_player","volume_set",{entity_id:v,volume_level:.5})}}else this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!r})}_onVolumeDragStart(e,t="main"){if(!this.hass)return;const i=this.currentVolumeStateObj;this._groupBaseVolume=i?Number(i.attributes.volume_level||0):0,this._volumeDraggingEntity=t,this._dragVolume=Number(e.target.value)}_onVolumeDragEnd(e){this._groupBaseVolume=null,this._volumeDraggingEntity=null}_onVolumeInput(e){this._dragVolume=Number(e.target.value)}_handleVolumeOverlayDetection(e){if(this._showVolumeOverlay&&e.has("hass")&&this.hass&&!this.isAnyMenuOpen){const t=this._getVolumeEntity(this._selectedIndex),i=t?this.hass.states[t]:null,s=i?.attributes?.volume_level??null,r=i?.attributes?.is_volume_muted??!1;t!==this._lastTrackedVolEntityId?(this._lastTrackedVolumeLevel=s,this._lastTrackedVolEntityId=t):s!==null&&this._lastTrackedVolumeLevel!==null&&s!==this._lastTrackedVolumeLevel&&!this._internalVolumeChangeFlag&&!this._volumeDraggingEntity&&this._showVolumeOverlayBriefly(s,r),this._lastTrackedVolumeLevel=s}}_showVolumeOverlayBriefly(e,t){this._volumeOverlayValue=Math.round(e*100),this._volumeOverlayMuted=t,this._volumeOverlayActive=!0,this._volumeOverlayTimer&&clearTimeout(this._volumeOverlayTimer),this._volumeOverlayTimer=setTimeout(()=>{this._volumeOverlayActive=!1,this._volumeOverlayTimer=null,this.requestUpdate()},3e3),this.requestUpdate()}_suppressVolumeOverlay(){this._internalVolumeChangeFlag=!0,this._internalVolumeSuppressTimer&&clearTimeout(this._internalVolumeSuppressTimer),this._internalVolumeSuppressTimer=setTimeout(()=>{this._internalVolumeChangeFlag=!1,this._internalVolumeSuppressTimer=null},1500)}_getVolumeOverlayIcon(){return this._volumeOverlayMuted||this._volumeOverlayValue===0?"mdi:volume-off":this._volumeOverlayValue<20?"mdi:volume-low":this._volumeOverlayValue<50?"mdi:volume-medium":"mdi:volume-high"}_dismissVolumeOverlay(){this._volumeOverlayActive=!1,this._volumeOverlayTimer&&(clearTimeout(this._volumeOverlayTimer),this._volumeOverlayTimer=null),this.requestUpdate()}_onGroupVolumeChange(e,t,i){this._suppressVolumeOverlay();const s=Number(i.target.value);this.hass.callService("media_player","volume_set",{entity_id:t,volume_level:s}),this.requestUpdate()}_onGroupVolumeStep(e,t){this._suppressVolumeOverlay(),this.hass.callService("remote","send_command",{entity_id:e,command:t>0?"volume_up":"volume_down"}),this.requestUpdate()}_onSourceChange(e){const t=this.currentEntityId,i=e.target.value;!t||!i||this.hass.callService("media_player","select_source",{entity_id:t,source:i})}_openMoreInfo(){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:this.currentEntityId},bubbles:!0,composed:!0}))}async _onProgressBarClick(e){try{e.stopPropagation();const t=this.currentEntityId,i=this._getActualResolvedMaEntityForState(this._selectedIndex),s=t?this.hass?.states?.[t]:null,r=i?this.hass?.states?.[i]:null;let n;if(this._controlFocusEntityId&&(this._controlFocusEntityId===i||this._controlFocusEntityId===t))n=this._controlFocusEntityId;else if(this._isEntityPlaying(r)&&this._isEntityPlaying(s)&&this._areEntitiesPlayingSameMedia(s,r))n=t;else if(this._isEntityPlaying(r))n=i;else if(this._isEntityPlaying(s))n=t;else{const p=this._lastPlayingEntityIdByChip?.[this._selectedIndex];if(p&&(p===i||p===t))n=p;else{const _=this._getPlaybackEntityId(this._selectedIndex);n=await this._resolveTemplateAtActionTime(_,this.currentEntityId)}}const o=this.hass?.states?.[n]||this.currentStateObj;if(!n||!o||!o.attributes){console.warn("YAMP: Cannot seek - invalid target or state",n,o);return}const l=o.attributes.media_duration;if(!l)return;const c=e.target.getBoundingClientRect(),u=(e.clientX-c.left)/c.width,h=Math.floor(u*l);this._seekAnchor={position:h,timestamp:Date.now(),trackId:o.attributes.media_content_id||o.attributes.media_title},this._seekConvergenceLock=Date.now()+2e3,this._seekOffset=null,this.requestUpdate(),this.hass.callService("media_player","media_seek",{entity_id:n,seek_position:h})}catch(t){console.error("YAMP: Error in _onProgressBarClick",t)}}_resetSearchContext(){this._searchResultsByType={},this._favoritesFilterActive=!1,this._recentlyPlayedFilterActive=!1,this._upcomingFilterActive=!1,this._recommendationsFilterActive=!1,this._initialFavoritesLoaded=!1,this._loadingSearchRowMenuId=null,this._errorSearchRowMenuId=null}_showSearchSuccessToast(e=null,t=null){this._showQueueSuccessMessage=!0,e&&(this._successSearchRowMenuId=e),t&&(this._successSearchRowType=t),this.requestUpdate(),this._successToastHandle&&clearTimeout(this._successToastHandle),this._successToastHandle=setTimeout(()=>{this._showQueueSuccessMessage=!1,this._successSearchRowMenuId=null,this._successSearchRowType=null,this._successToastHandle=null,this.requestUpdate()},nl)}render(){if(!this.hass||!this.config)return b;const e=this.hass.selectedLanguage||this.hass.language||this.hass.locale?.language;e&&da(e);const t=typeof this.config.card_height=="string"&&(this.config.card_height.includes("{{")||this.config.card_height.includes("{%")||this.config.card_height.trim().startsWith("[[["))?this._cardHeightResolveCache?.card?.value:this.config.card_height,i=typeof t=="string"&&t.includes("px")?parseFloat(t):Number(t),s=typeof i=="number"&&Number.isFinite(i)&&i>0||typeof t=="string"&&t.trim()!==""&&t!=="auto",r=this._collapsedBaselineHeight||220,n=this.entityObjs.length===1,o=n&&this._alwaysCollapsed&&this.config.expand_on_search!==!0,l=this.config.pin_search_headers===!0&&!o,c=!(this.config.hide_search_headers_on_idle===!0&&this._isIdle),u=this.config.show_chip_row||"auto",h=this.entityObjs.length>1,p=(u==="in_menu"||u==="in_menu_on_idle"&&this._isIdle)&&h,_=u!=="in_menu"&&(h||u==="always"),m=u==="in_menu_on_idle"&&this._isIdle&&h,f=u==="in_menu_on_idle"&&h&&!this._showSearchInSheet,y=(this.config.actions??[]).map((w,H)=>({action:w,idx:H})).filter(({action:w})=>w?.action!=="sync_selected_entity"&&w?.action!=="select_entity");let v=null;const x=(w,H)=>{let ne=ha(w);if(typeof ne=="string"&&(ne.includes("{{")||ne.includes("{%")||ne.trim().startsWith("[[["))){const Ae=this._actionInMenuResolveCache?.[H]?.value;if(Ae!==void 0)ne=Ae;else if(ne.trim().startsWith("[[[")){const $e=this._evaluateJsTemplate(ne);$e!==void 0&&(ne=$e)}else{v||(v={...this._getTemplateContext(),state:this.hass?.states[this.currentEntityId]?.state||"unknown",attributes:this.hass?.states[this.currentEntityId]?.attributes||{}});const $e=dt(this.hass,ne,v);$e!==null&&(ne=$e)}}return typeof ne=="string"?(ne=ne.trim(),ne):ne===!0?"menu":"chip"},k=y.filter(({action:w,idx:H})=>x(w,H)==="chip"),E=y.filter(({action:w,idx:H})=>x(w,H)==="menu"),S=y.find(({action:w})=>w?.card_trigger==="tap"),C=y.find(({action:w})=>w?.card_trigger==="hold"),$=y.find(({action:w})=>w?.card_trigger==="double_tap"),P=y.find(({action:w})=>w?.card_trigger==="swipe_left"),F=y.find(({action:w})=>w?.card_trigger==="swipe_right");this._cardTriggers={tap:S?.action,hold:C?.action,double_tap:$?.action,swipe_left:P?.action,swipe_right:F?.action};const T=this.currentActivePlaybackStateObj||this.currentPlaybackStateObj||this.currentStateObj,I=this.getChipName(this.currentEntityId);if(!T)return g`<div class="details">${d("common.not_found")}</div>`;const O=this._getHiddenControlsForCurrentEntity(),N=!!this._getFavoriteButtonEntity()&&!O.favorite,W=this._isCurrentTrackFavorited(),Y=!O.power&&(this._supportsFeature(T,gs)||this._supportsFeature(T,ms)),U=this._controlLayout==="modern"&&Y,L=this._controlLayout==="modern"&&N,de=y.find(({action:w,idx:H})=>x(w,H)==="replace_search"),Z=y.find(({action:w,idx:H})=>x(w,H)==="replace_power"),X=y.find(({action:w,idx:H})=>x(w,H)==="replace_mute"),J=y.find(({action:w,idx:H})=>x(w,H)==="replace_favorite"),ee=({action:w,idx:H})=>{if(!w)return b;const ne=this._getActionLabel(w);let Ae=w.icon_color||"";typeof Ae=="string"&&(Ae.includes("{{")||Ae.includes("{%")||Ae.trim().startsWith("[[["))&&(Ae=dt(this.hass,Ae,this._getTemplateContext())||"");let $e=w.icon;return $e||(w.action==="toggle_media_session"||w.action==="toggle_lock_screen_controls"?$e=this._isMediaSessionEnabled?"mdi:cellphone-lock":"mdi:cellphone-wireless":w.action==="toggle_lyrics"?$e="mdi:script-text-outline":w.action==="remote_control"?$e="mdi:remote":$e="mdi:rhombus-outline"),!Ae&&(w.action==="toggle_media_session"||w.action==="toggle_lock_screen_controls")&&this._isMediaSessionEnabled&&(Ae="var(--custom-accent, var(--accent-color, #ff9800))"),g`
        <button
          class="volume-icon-btn favorite-volume-btn custom-bottom-action"
          @click=${Ji=>{Ji.stopPropagation(),this._onActionChipClick(H)}}
          title="${ne}"
        >
          <ha-icon style=${Pc({color:Ae||void 0})} .icon=${$e}></ha-icon>
        </button>
      `};let ae=b;U?Z?ae=ee(Z):ae=g`
          <button
            class="volume-icon-btn favorite-volume-btn${T?.state!=="off"?" active":""}"
            @click=${()=>this._onControlClick("power")}
            title="${d("common.power")}"
          >
            <ha-icon .icon=${"mdi:power"}></ha-icon>
          </button>
        `:this._controlLayout==="modern"&&(de?ae=ee(de):ae=g`
          <button
            class="volume-icon-btn favorite-volume-btn"
            @click=${()=>this._openQuickSearchOverlay()}
            title="${d("common.search")}"
          >
            <ha-icon .icon=${"mdi:magnify"}></ha-icon>
          </button>
        `);let Pe=b;J?Pe=ee(J):L&&(Pe=g`
        <button
          class="volume-icon-btn favorite-volume-btn${W?" active":""}"
          @click=${()=>this._onControlClick("favorite")}
          title="${d("common.favorite")}"
        >
          <ha-icon
            style=${W?"color: var(--custom-accent);":b}
            .icon=${W?"mdi:heart":"mdi:heart-outline"}
          ></ha-icon>
        </button>
      `);let Ke=b;X&&(Ke=ee(X));const nt=T.attributes.source_list||[],gt=new Set(nt.map(w=>w&&w[0]?w[0].toUpperCase():"")),Ye="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");this._idleImageTemplate&&this._idleImageTemplateNeedsResolve&&!this._resolvingIdleImageTemplate&&this._isIdle&&this._resolveIdleImageTemplate(),this._backgroundImageTemplate&&this._backgroundImageTemplateNeedsResolve&&!this._resolvingBackgroundImageTemplate&&this._resolveBackgroundImageTemplate(),this._fontColorTemplate&&this._fontColorTemplateNeedsResolve&&!this._resolvingFontColorTemplate&&this._resolveFontColorTemplate();const fl=typeof this.config.idle_image=="string"&&this.config.idle_image.trim().startsWith("[[[")?this._evaluateJsTemplate(this.config.idle_image):this._idleImageTemplate?this._idleImageTemplateResult:this.config.idle_image,Va=this._normalizeImageSourceValue(fl),Bi=typeof this.config.background_image=="string"&&this.config.background_image.trim().startsWith("[[[")?this._evaluateJsTemplate(this.config.background_image):this._backgroundImageTemplate?this._backgroundImageTemplateResult:this.config.background_image,Hi=this._resolveImageUrlFromInput(Bi),Oe=typeof Bi=="string"&&Bi.trim().length>0?Bi.trim():"",Ba=!Hi&&Oe.length>0&&(Oe.startsWith("#")||Oe.startsWith("rgb")||Oe.startsWith("hsl")||Oe.startsWith("linear-gradient")||Oe.startsWith("radial-gradient")||/^[a-zA-Z]+$/.test(Oe)),Gi=!!(Hi||Ba),Ha=typeof this.config.font_color=="string"&&this.config.font_color.trim().startsWith("[[[")?this._evaluateJsTemplate(this.config.font_color):this._fontColorTemplate?this._fontColorTemplateResult:this.config.font_color,jt=typeof Ha=="string"&&Ha.trim().length>0?Ha.trim():null,_r=!!jt,yl=this._getEntityForPurpose(this._selectedIndex,"playback_control"),Le=this.hass?.states?.[yl],vl=this._isEntityPlaying(Le),ai=!!(this.config.show_idle_artwork_when_not_playing===!0&&!vl&&Va);let Ve=null;Va&&(this._isIdle||ai)&&(Ve=this._resolveImageUrlFromInput(Va));const mr=!!Ve,ot=this._idleTimeoutMs===0?!1:this._isIdle,bl=this._idleTimeoutMs===0?!1:this._isIdle,xl=this._artworkObjectFit==="scaled-contain"||this._artworkObjectFit==="scaled-contain-alternate",Ga=this.config.extend_artwork===!0||m||xl,gr=this.currentStateObj,si=this._getActualResolvedMaEntityForState(this._selectedIndex),wl=si?this.hass?.states?.[si]:null,kl=this._lastMainState,fr=this._lastMaState;this._lastMainState=gr?.state,this._lastMaState=wl?.state;const Ee=this._selectedIndex;if(fr==="playing"&&this._lastMaState!=="playing"){const w=Math.max(Number(this._idleTimeoutMs||this.config?.idle_timeout_ms||6e4),500);this._playbackLingerByIdx[Ee]={entityId:si,until:Date.now()+w}}if(fr==="playing"&&this._lastMaState==="paused"&&this._lastPlayingEntityIdByChip?.[Ee]===si||kl==="playing"&&this._lastMainState==="paused"&&this._lastPlayingEntityIdByChip?.[Ee]===gr?.entity_id){const w=this._lastPlayingEntityIdByChip[Ee],H=Math.max(Number(this._idleTimeoutMs||this.config?.idle_timeout_ms||6e4),500);this._playbackLingerByIdx[Ee]={entityId:w,until:Date.now()+H}}this._lastMaState==="playing"&&this._playbackLingerByIdx?.[Ee]&&delete this._playbackLingerByIdx[Ee];const El=this.config.entities[Ee]?.music_assistant_entity,Sl=this._getEntityForPurpose(Ee,"ma_resolve"),ri=this._lastPlayingEntityIdByChip?.[Ee],Al=this._maResolveCache?.[Ee]?.id,$l=!!(ri&&(ri===Al||ri===Sl||ri===El||ri===si));this._lastMainState==="playing"&&this._playbackLingerByIdx?.[Ee]&&!$l&&delete this._playbackLingerByIdx[Ee];const ft=Le,Cl=!!ft?.attributes?.shuffle,Tl=ft?.attributes?.repeat&&ft?.attributes?.repeat!=="off",yt=this.metadataStateObj,ni=this._idleTimeoutMs===0?this._isEntityPlaying(Le):!this._isIdle&&this._isEntityPlaying(Le),Ze=this.currentStateObj,Il=this._getArtworkUrl(yt,ai),Ml=this._getArtworkUrl(Le,ai),Pl=this._getArtworkUrl(Ze,ai),yr=this._areEntitiesPlayingSameMedia(Ze,Le),Qi=yt?.attributes?.media_title,vr=!xn(Qi,yt?.attributes?.friendly_name)&&Qi?Qi:null,br=vr||ft?.attributes?.media_title||Ze?.attributes?.media_title||Qi||"",Be=this._resolveSelectedArtwork({metadataArtwork:Il,playbackArtwork:Ml,mainArtwork:Pl,displayTitle:br,playbackStateObj:Le,mainState:Ze,isPlayingSameMedia:yr}),xr=this._resolveSelectedArtwork({metadataArtwork:this._getArtworkUrl(yt,!1,!0),playbackArtwork:this._getArtworkUrl(Le,!1,!0),mainArtwork:this._getArtworkUrl(Ze,!1,!0),displayTitle:br,playbackStateObj:Le,mainState:Ze,isPlayingSameMedia:yr}),Xe=this._idleTimeoutMs===0?!0:ni,ve=vr&&yt?.attributes?.media_title?yt:ft?.attributes?.media_title?ft:Ze?.attributes?.media_title?Ze:yt||ft||Ze,oi=Xe&&ve?.attributes?.media_title||"",li=Xe&&(ve?.attributes?.media_artist||ve?.attributes?.media_series_title||ve?.attributes?.app_name)||"",Fl=this.config.show_album!==!1,ci=Xe&&Fl&&ve?.attributes?.media_album_name||"",di=!!(ve?.attributes?.media_artist||T?.attributes?.media_artist),wr=d("search.search_album")||d("search.browse_album",{"{album}":ci}),kr=di?d("search.browse_artist",{"{artist}":li})||d("search.search_artist"):"";this._adaptiveText&&this._updateAdaptiveTextScale(!0);let vt=ve?.attributes?.media_position||0;const ui=ve?.attributes?.media_duration||0;let Wi=vt;if(ni&&ve){const w=ve.attributes?.media_position_updated_at?Date.parse(ve.attributes.media_position_updated_at):ve.last_changed?Date.parse(ve.last_changed):Date.now(),H=(Date.now()-w)/1e3;Wi+=H}const zl=ve?.attributes?.media_content_id||ve?.attributes?.media_title,Er=Date.now();if(this._seekAnchor&&this._seekAnchor.trackId===zl){let w=this._seekAnchor.position;ni&&(w+=(Er-this._seekAnchor.timestamp)/1e3);const H=this._seekConvergenceLock&&Er<this._seekConvergenceLock,ne=Math.abs(Wi-w);!H&&ne<2?(this._seekAnchor=null,this._seekConvergenceLock=null,vt=Wi):vt=w}else this._seekAnchor=null,this._seekConvergenceLock=null,vt=Wi;const Sr=ui?Math.min(1,vt/ui):0,Qa=this._getVolumeEntity(Ee),jl=Qa&&Qa.startsWith&&Qa.startsWith("remote."),Dl=Number(this.currentVolumeStateObj?.attributes.volume_level||0),Rl=this._getEffectiveVolumeMode()!=="stepper";let K;this._alwaysCollapsed&&this._expandOnSearch&&this._showSearchInSheet?K=!1:K=this._alwaysCollapsed?!0:this._collapseOnIdle?this._isIdle:!1;const Wa=K&&this._alwaysCollapsed&&s?i-r:0,Ol=K&&_?48:0,Ll=K&&k.length>0?40:0,Ar=Ol+Ll,ql=_&&!m?K?48:58:0,Nl=k.length>0?K?40:42:0,Ul=ql+Nl,Ka=s?Math.max(0,i-Ul):null,Vl=s?Math.max(100,i-Ar):this._collapsedBaselineHeight||220;let Se=Math.round(Vl*.48);this.config.hide_collapsed_artwork===!0&&(Se=0);const Bl=this.offsetWidth||0;if(s&&Se>0)if(i<230)Se=0;else{const w=this._getMaxCollapsedArtworkWidth(Bl);Se=Math.max(40,Math.min(w,Se)),i>=320&&(Se=Math.max(102,Se))}else!s&&Se>0&&(Se=102);const hi=Math.max(-60,Wa-Ar),Ya=48,Hl=hi>0?Math.min(hi*.45,96):0,Gl=hi>0?Math.round(Ya+Hl):hi<-20?36:Ya,Ql=this._adaptiveTextTargets?.has("details")&&this._currentDetailsScale||1,Wl=Math.round((K?Gl:Ya)*Ql);let Za;const $r=350,Kl=(K?s?i:this._collapsedBaselineHeight||220:$r)>=$r,Xa=this.config.hide_menu_player===!0?!1:!K||Kl,Ja=s&&i<280,Cr=s&&i<320&&!this._alwaysCollapsed,Ki=ot||this._showEntityOptions||Cr;let oe=null,Yi=null,es=this._artworkObjectFit,Zi;if(!this._isIdle&&!ai){const w=Be;oe=w?.url||null,Yi=w?.sizePercentage,w?.objectFit&&(es=w.objectFit),w?.objectPosition&&(Zi=w.objectPosition)}else Be?.url&&(Ve=Be.url),Be?.objectFit&&(es=Be.objectFit),Be?.objectPosition&&(Zi=Be.objectPosition),Be?.sizePercentage!==void 0&&(Yi=Be.sizePercentage);Za=K&&!oe&&!Ve&&hi>=40,K&&oe&&oe!==this._lastArtworkUrl&&(this._extractDominantColor(oe).then(w=>{this._collapsedArtDominantColor=w,this.requestUpdate()}),this._lastArtworkUrl=oe);const Tr=ot?K?this._collapsedBaselineHeight||220:s?Ka:325:null;this._lastRenderedCollapsed=K,this._lastRenderedHideControls=ot;const Je=es||this._artworkObjectFit,ts=Je==="scaled-contain-alternate",bt=(Je==="scaled-contain"||ts)&&!K&&!this._alwaysCollapsed,Yl=bt&&oe||!bt&&!oe&&!Ve,Zl=(Je==="scaled-contain"||ts)&&(u==="in_menu"||n&&u!=="always");let Ir=this._getBackgroundSizeForFit(Je);Yi&&(Ir=`${Yi}%`);const Mr=Je==="no_artwork"?"none":Ve||ts?Ve?`url('${Ve}')`:"none":oe?`url('${oe}')`:"none",is=Mr!=="none",Xl=oe&&(this.config.blurred_artwork===!0||this.config.blurred_artwork!==!1&&(K||bt&&Je==="scaled-contain"))?"blur(18px) brightness(0.7) saturate(1.15)":"none";let xt=(typeof Zi<"u"?Zi:null)||this.config.artwork_position||"top center";Ga&&(xt==="top center"||xt==="center top"?xt="center 50px":(xt==="bottom center"||xt==="center bottom")&&(xt="center calc(100% - 50px)"));const Pr=[`background-image: ${Mr}`,`background-size: ${bt?"cover":Ir}`,`background-position: ${xt}`,"background-repeat: no-repeat",`filter: ${Xl}`].join("; "),Jl=this.config.background_fit||"cover",ec=this.config.background_position||"center center",tc=this._getBackgroundSizeForFit(Jl),ic=Hi?[`background-image: url('${Hi}')`,`background-size: ${tc}`,`background-position: ${ec}`,"background-repeat: no-repeat"].join("; "):Ba?[Oe.startsWith("linear-gradient")||Oe.startsWith("radial-gradient")?`background-image: ${Oe}`:`background-color: ${Oe}`,"background-repeat: no-repeat"].join("; "):"",Fr=ot||this._getEffectiveVolumeMode()==="hidden"||Cr||s&&i<260&&K,ac=Ki||Fr,sc=this._controlLayout==="modern",pi=Fr&&!(ae!==b&&ae!==void 0&&ae!==null)&&!sc,rc=!!this._adaptiveTextTargets?.has("details");this._lastSpacerRendered=!!(Za||!K&&(!rc||Yl)),this._lastVolumeRendered=!pi;const zr=this._lowerControlsHeight||72+(this._alternateProgressBar?0:24)+(ot?0:56)+(pi?0:56),Xi=this._getLyricsBackgroundFade(),jr=Xi===0?0:Math.min(5,Number((Xi/80*5).toFixed(1))),Dr=jr===0?"none":`blur(${jr}px)`,Rr=this._artworkGradientDisabled||this._isIdle&&!is&&!oe&&!Ve?"color: var(--yamp-icon-color, var(--primary-text, #444));":"";return g`
        <ha-card class="yamp-card" 
          style=${s&&(!K||this._alwaysCollapsed)?`height:${i}px;`:b}>
          <div
            data-match-theme="${String(this.config.match_theme===!0)}"
            data-has-font-color="${String(_r)}"
            data-artwork-fit="${Je}"
            data-has-background-image="${String(Gi)}"
            data-lyrics-active="${String(this._lyricsActive===!0)}"
            style=${[s&&(!K||this._alwaysCollapsed)?`height:${i}px;`:null,this._lyricsActive?`--yamp-lyrics-fade: ${Xi}%; --yamp-lyrics-backdrop-filter: ${Dr}`:null,_r?`--primary-text: ${jt}; --primary-text-color: ${jt}; --secondary-text: ${jt}; --secondary-text-color: ${jt}; --yamp-icon-color: ${jt};`:null].filter(Boolean).join("; ")||b}
            class=${us({"yamp-card-inner":!0,"compact-collapsed":Ja&&K,"dim-idle":bl,"no-chip-dim":this.config.dim_chips_on_idle===!1,collapsed:K})}
          >
            ${Gi?g`
              <div class="card-background-image-layer" style="${ic}"></div>
              ${!this._artworkGradientDisabled&&!Ba?g`<div class="card-background-image-overlay"></div>`:b}
            `:b}
            ${Ga&&is?g`
              <div class="full-bleed-artwork-bg" style="${Pr}"></div>
              ${!this._artworkGradientDisabled&&!(mr||this._isIdle||this._lyricsActive)?g`<div class="full-bleed-artwork-fade"></div>`:b}
            `:b}
            ${!bt&&!oe&&!Ve&&!Gi?g`
              <div class="media-artwork-placeholder"
                @pointerdown=${this._onTapAreaPointerDown}
                @pointermove=${this._onTapAreaPointerMove}
                @pointerup=${this._onTapAreaPointerUp}
                @pointercancel=${this._onTapAreaPointerCancel}
                style="${this._getGestureStyles()}"
              >
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
            `:b}
            ${this._lyricsActive&&!this._isIdle?g`
              <yamp-lyrics-view
                data-match-theme="${String(this.config.match_theme===!0)}"
                data-artwork-fit="${Je}"
                data-playing="${String(this._isCurrentEntityPlaying())}"
                .hass=${this.hass}
                .lyrics=${this._massLyrics}
                .position=${vt}
                .loading=${this._fetchingLyrics}
                .error=${this._lyricsError}
                .playing=${this._isCurrentEntityPlaying()}
                .activeThemeColor=${this.config.match_theme===!0?"var(--custom-accent, var(--state-media_player-active-color, var(--primary-color, #ffffff)))":"var(--custom-accent, #ffffff)"}
                .mode=${this._isCurrentlyPlayingRadio()?"text":this.config.lyrics_mode||"default"}
                .preRoll=${this.config.lyrics_pre_roll??0}
                @pointerdown=${this._onTapAreaPointerDown}
                @pointermove=${this._onTapAreaPointerMove}
                @pointerup=${this._onTapAreaPointerUp}
                @pointercancel=${this._onTapAreaPointerCancel}
                style="${[`--yamp-lyrics-top-offset: ${_?48:0}px`,`--yamp-lyrics-bottom-offset: ${zr}px`,`--yamp-lyrics-fade: ${Xi}%`,`--yamp-lyrics-backdrop-filter: ${Dr}`,this._getGestureStyles()].filter(Boolean).join("; ")}"
              ></yamp-lyrics-view>
            `:b}
            ${m?g`${this._renderInlineActionRow(k)}${this._renderInlineChipRow(_,m)}`:g`${this._renderInlineChipRow(_,m)}${this._renderInlineActionRow(k)}`}
            ${this._volumeOverlayActive?g`
              <div class="volume-overlay" @click=${()=>this._dismissVolumeOverlay()}>
                <ha-icon icon=${this._getVolumeOverlayIcon()}></ha-icon>
                <span class="volume-overlay-text">${this._volumeOverlayValue}%</span>
              </div>
            `:b}
            <div class="card-lower-content-container" style="${Tr?`min-height:${Tr}px;`:""}">
              <div class="card-lower-content-bg"
                style="${(()=>{const w=[];return Ga&&is?w.push("background-image: none","filter: none"):w.push(Pr),w.push(`min-height: ${K?ot?`${this._collapsedBaselineHeight||220}px`:"0px":s?`${Ka}px`:"350px"}`),w.push("transition: min-height 0.4s cubic-bezier(0.6,0,0.4,1), background 0.4s"),w.join("; ")})()}"
              ></div>
              ${!this._artworkGradientDisabled&&!(mr||this._isIdle||this._lyricsActive||!oe&&Gi)&&(!bt||Je==="scaled-contain")?g`<div class="card-lower-fade" style="--yamp-lyrics-bottom-offset: ${zr}px;"></div>`:b}
              <div class="card-lower-content${K?" collapsed transitioning":" transitioning"}${K&&oe&&Se>0?" has-artwork":""}" style="${ot?K?`min-height: ${this._collapsedBaselineHeight||220}px;`:`min-height: ${s?`${Ka}px`:`${this._lastNonLyricsLowerContentHeight||350}px`};`:""}">
                ${K&&oe&&Se>0&&Si(oe)?g`
                  <div
                    class="collapsed-artwork-container"
                    @pointerdown=${this._onTapAreaPointerDown}
                    @pointermove=${this._onTapAreaPointerMove}
                    @pointerup=${this._onTapAreaPointerUp}
                    @pointercancel=${this._onTapAreaPointerCancel}
                    style="${[`background: linear-gradient(120deg, ${this._collapsedArtDominantColor}bb 60%, transparent 100%)`,Wa>0?`width:${Math.round(Se+8)}px`:"",Ja&&K?"top: -2px; height: auto !important; overflow: visible !important;":"",this._getGestureStyles()].filter(Boolean).join("; ")}"
                  >
                    <img
                      class="collapsed-artwork"
                      src="${oe}" 
                      style="${[this._getCollapsedArtworkStyle(),Wa>0?`width:${Math.round(Se)}px; height:${Math.round(Se)}px;`:""].filter(Boolean).join(" ")}" 
                      onload="this.style.display='block'"
                      onerror="this.style.display='none'" />
                  </div>
                `:b}
                ${this._lastSpacerRendered?g`
                  <div class="card-artwork-spacer${Za?" show-placeholder":""}"
                    @pointerdown=${this._lyricsActive?b:this._onTapAreaPointerDown}
                    @pointermove=${this._lyricsActive?b:this._onTapAreaPointerMove}
                    @pointerup=${this._lyricsActive?b:this._onTapAreaPointerUp}
                    @pointercancel=${this._lyricsActive?b:this._onTapAreaPointerCancel}
                    style="${[this._lyricsActive?"pointer-events: none;":"",this._getGestureStyles(!this._lyricsActive)].filter(Boolean).join("; ")}"
                  >
                    ${bt&&oe?g`
                      <div style="position: absolute; ${Zl?"top: 20px; right: 0; bottom: 0; left: 0;":"inset: 0;"} display: flex; align-items: center; justify-content: center; pointer-events: none; box-sizing: border-box; padding: 0 5px;">
                        <img 
                          class="inset-artwork"
                          src="${oe}" 
                          style="max-width: 100%; max-height: 100%; object-fit: contain; pointer-events: none;" 
                          onload="this.style.display='block'"
                          onerror="this.style.display='none'"
                        />
                      </div>
                    `:b}
                  </div>
                `:b}
                ${this.config.details_alignment!=="none"?g`
                  <div class="details" 
                    @pointerdown=${this._onIdleTapAreaPointerDown}
                    @pointermove=${this._onIdleTapAreaPointerMove}
                    @pointerup=${this._onIdleTapAreaPointerUp}
                    @pointercancel=${this._onIdleTapAreaPointerCancel}
                    style="${Ja&&K?"margin-top: -12px; padding-bottom: 2px; min-height: 0; gap: 1px;":""} ${(()=>{const w=[];this._showEntityOptions&&(w.push("opacity:0"),w.push("pointer-events:none")),w.push(`min-height:${Wl}px`),Xe||w.push("opacity:0"),this._lastSpacerRendered||(this._lyricsActive?w.push("margin-top: auto"):w.push("flex: 1"),w.push("justify-content: flex-end"));const H=this._getGestureStyles(this._isIdle);return H&&!this._showEntityOptions&&w.push(H),w.join(";")})()}">
                    ${this._showMediaTitleOptions?g`
                      <div class="title track-options-row" style="display: flex; gap: 16px; align-items: center; cursor: pointer;">
                        ${this._massQueueAvailable?g`
                          <div class="track-options-btn" @click=${w=>{w.stopPropagation(),this._handleAddCurrentToPlaylist()}} title="${d("search.labels.add_to_playlist")}">
                            <ha-icon icon="mdi:playlist-plus"></ha-icon>
                            <span>${d("search.add_to_playlist")}</span>
                          </div>
                        `:b}
                        <div class="track-options-btn" @click=${w=>{w.stopPropagation(),this._handlePlaySimilar()}} title="${d("search.play_similar")}">
                          <ha-icon icon="mdi:radio"></ha-icon>
                          <span>${d("search.play_similar")}</span>
                        </div>
                        <div class="track-options-btn track-options-close" @click=${w=>{w.stopPropagation(),this._showMediaTitleOptions=!1}} title="${d("common.close")}">
                          <ha-icon icon="mdi:close"></ha-icon>
                        </div>
                      </div>
                    `:g`
                      <div class="title track-options-title" @click=${w=>{!this._suppressMarqueeClick&&Xe&&oi&&(w.stopPropagation(),this._showMediaTitleOptions=!0)}} style="${Xe&&oi?"cursor: pointer;":""}" title="${Xe&&oi?d("search.show_track_options"):""}">
                        <span class="marquee-inner">${Xe&&oi?oi:g`&nbsp;`}</span>
                      </div>
                    `}
                    <div class="artist">
                      <span class="marquee-inner">${Xe?li&&ci?g`
                          <span
                            class="artist-name ${di?"clickable-artist":""}"
                            @click=${w=>{this._suppressMarqueeClick||di&&(w.stopPropagation(),this._searchArtistFromNowPlaying())}}
                            title=${kr}
                          >${li}</span><span class="artist-album-separator"> - </span><span
                            class="album-name clickable-album"
                            @click=${w=>{this._suppressMarqueeClick||(w.stopPropagation(),this._searchAlbumFromNowPlaying())}}
                            title=${wr}
                          >${ci}</span>
                        `:li?g`
                          <span
                            class="artist-name ${di?"clickable-artist":""}"
                            @click=${w=>{this._suppressMarqueeClick||di&&(w.stopPropagation(),this._searchArtistFromNowPlaying())}}
                            title=${kr}
                          >${li}</span>
                        `:ci?g`
                          <span
                            class="album-name clickable-album"
                            @click=${w=>{this._suppressMarqueeClick||(w.stopPropagation(),this._searchAlbumFromNowPlaying())}}
                            title=${wr}
                          >${ci}</span>
                        `:g`&nbsp;`:g`&nbsp;`}</span>
                    </div>
                  </div>
                `:b}
                ${!K&&!this._alternateProgressBar?pa(ni&&ui?{progress:Sr,seekEnabled:!0,onSeek:w=>this._onProgressBarClick(w),collapsed:!1,style:this._showEntityOptions?"visibility:hidden; opacity:0":"",displayTimestamps:this._displayTimestamps,currentTime:vt,duration:ui,customHeight:this.config.progress_bar_height??Lt}:{progress:0,seekEnabled:!1,collapsed:!1,style:"visibility:hidden; opacity:0",displayTimestamps:this._displayTimestamps,currentTime:0,duration:0,customHeight:this.config.progress_bar_height??Lt}):b}
                ${K||this._alternateProgressBar?pa(ni&&ui?{progress:Sr,collapsed:!0,style:this._showEntityOptions?"visibility:hidden; opacity:0":"",customHeight:this.config.progress_bar_height??Lt}:{progress:0,collapsed:!0,style:"visibility:hidden; opacity:0",customHeight:this.config.progress_bar_height??Lt}):b}

                <div style="${ot||this._showEntityOptions?"visibility:hidden; opacity:0; pointer-events:none;":""}">
                    ${Pd({stateObj:Le,showStop:this._shouldShowStopButton(Le),shuffleActive:Cl,repeatActive:Tl,onControlClick:w=>this._onControlClick(w),supportsFeature:(w,H)=>this._supportsFeature(w,H),showFavorite:N,favoriteActive:W,hiddenControls:O,adaptiveControls:this._adaptiveControls,controlLayout:this._controlLayout,swapPauseForStop:this._controlLayout==="modern"&&this._swapPauseForStop,lockScreenState:this._isMediaSessionEnabled?this._mediaSessionManager?.lockScreenState:null})}
                </div>
                ${Fd({isRemoteVolumeEntity:jl,showSlider:Rl,vol:Dl,isDragging:this._volumeDraggingEntity==="main",dragVol:this._dragVolume,isMuted:this.currentVolumeStateObj?.attributes?.is_volume_muted??!1,supportsMute:this.currentVolumeStateObj?this._supportsFeature(this.currentVolumeStateObj,_s):!1,onVolumeDragStart:w=>this._onVolumeDragStart(w),onVolumeDragEnd:w=>this._onVolumeDragEnd(w),onVolumeInput:w=>this._onVolumeInput(w),onVolumeChange:w=>this._onVolumeChange(w),onVolumeStep:w=>this._onVolumeStep(w),onMuteToggle:()=>this._onMuteToggle(),leadingControlTemplate:Ki?ae!==b?g`<div style="visibility:hidden; opacity:0; pointer-events:none;">${ae}</div>`:b:ae,reserveLeadingControlSpace:this._controlLayout==="modern",showRightPlaceholder:this._controlLayout==="modern",rightSlotTemplate:Ki?Pe!==b?g`<div style="visibility:hidden; opacity:0; pointer-events:none;">${Pe}</div>`:b:Pe,muteSlotTemplate:Ki?Ke!==b?g`<div style="visibility:hidden; opacity:0; pointer-events:none;">${Ke}</div>`:b:Ke,hideVolume:ac,collapseRow:pi,moreInfoMenu:!this._showEntityOptions&&!pi?g`
          <div class="more-info-menu">
            <button class="more-info-btn" @click=${async()=>await this._openEntityOptions()}>
              <span class="more-info-icon" style="${Rr}">&#9776;</span>
            </button>
          </div>
        `:b})}
            ${pi&&!this._showEntityOptions?g`
              <div class="more-info-menu volume-collapsed">
                <button class="more-info-btn" @click=${async()=>await this._openEntityOptions()}>
                  <span class="more-info-icon" style="${Rr}">&#9776;</span>
                </button>
              </div>
            `:b}
            ${p&&!this._hideActiveEntityLabel&&!(this._hideActiveEntityLabelOnIdle&&this._isIdle)?g`
              <div class="in-menu-active-label" style="${this._showEntityOptions?"visibility:hidden; opacity:0; pointer-events:none;":""}">${I}</div>
            `:b}
          </div>
        </div>


      ${this._showEntityOptions?g`
      <div class="entity-options-overlay entity-options-overlay-opening" @click=${w=>this._closeEntityOptions(w)}>
        <div class="entity-options-container entity-options-container-opening" style="${this._showSearchInSheet?"height:100%;":""}">
          <div class="entity-options-sheet${p||f?" chips-mode":""}${this._showSearchInSheet?" search-mode":""} entity-options-sheet-opening" 
               @click=${w=>w.stopPropagation()}
               data-pin-search-headers="${l}">
            ${p||f?g`
                <div class="entity-options-chips-wrapper" style="${f&&!p?"visibility:hidden;pointer-events:none;":""}" @click=${w=>w.stopPropagation()}>
                <div class="chip-row entity-options-chips-strip">
                  ${kn(this._getChipRowProps())}
                </div>
              </div>
            `:b}
              ${!this._showGrouping&&!this._showSourceList&&!this._showSearchInSheet&&!this._showResolvedEntities&&!this._showTransferQueue&&!this._showRemoteControl?this._renderMainMenu(nt,E,p):this._showRemoteControl?this._renderRemoteControlSheet():this._showGrouping?this._renderGroupingSheet():this._showTransferQueue?this._renderTransferQueueSheet():this._showResolvedEntities?this._renderResolvedEntitiesSheet():this._showSearchInSheet?this._renderSearchInOptions(c,l):this._renderSourceListSheet(nt,Ye,gt)}
              </div>
            </div>
            <!-- Persistent Media Controls Section - Outside Scrollable Area -->
            ${Xa?g`
              <div class="persistent-media-controls" @click=${w=>w.stopPropagation()}>
                <div class="persistent-controls-artwork">
                  ${(()=>{const w=xr?.url?xr:Be;return w?.url&&Si(w.url)?g`
                      <img src="${w.url}" alt="${d("common.album_art")}" class="persistent-artwork" onerror="this.style.display='none'">
                    `:g`
                      <div class="persistent-artwork-placeholder">
                        <ha-icon icon="mdi:music"></ha-icon>
                      </div>
                    `})()}
                </div>
                <div class="persistent-controls-buttons" style="position: relative;">
                  <button class="persistent-control-btn" @click=${()=>this._onControlClick("prev")} title="${d("card.media_controls.previous")}">
                    <ha-icon icon="mdi:skip-previous"></ha-icon>
                  </button>
                  <button class="persistent-control-btn" @click=${()=>this._onControlClick("play_pause")} title="${d("card.media_controls.play_pause")}">
                    <ha-icon icon=${this._isEntityPlaying(this.currentPlaybackStateObj)?"mdi:pause":"mdi:play"}></ha-icon>
                  </button>
                  <button class="persistent-control-btn" @click=${()=>this._onControlClick("next")} title="${d("card.media_controls.next")}">
                    <ha-icon icon="mdi:skip-next"></ha-icon>
                  </button>
                  ${!this.config.hide_reorder_progress&&!this.config.hide_menu_player&&this._queueOpsTotal>0?g`
                    <div class="queue-ops-progress" style="position: absolute !important; bottom: -20px !important; left: 50% !important; transform: translate(-50%, 0) !important; z-index: 1000 !important; width: max-content !important; pointer-events: none !important; color: var(--search-text-secondary) !important;">
                      Re-ordering ${this._queueOpsCompleted} / ${this._queueOpsTotal}
                    </div>
                  `:b}
                  ${this._lyricsActive&&!this._isIdle&&this._fetchingLyrics?g`
                    <div class="queue-ops-progress" style="position: absolute !important; bottom: -20px !important; left: 50% !important; transform: translate(-50%, 0) !important; z-index: 1000 !important; width: max-content !important; pointer-events: none !important; color: var(--search-text-secondary) !important;">
                      ${d("lyrics.finding")}
                    </div>
                  `:b}
                </div>
                ${(()=>{const w=this._selectedIndex,H=this._getVolumeEntity(w);if(!H)return b;const ne=H.startsWith&&H.startsWith("remote."),Ae=this.currentVolumeStateObj,$e=Number(Ae?.attributes?.volume_level??0),Ji=ne?null:`${Math.round(($e||0)*100)}%`;return this._getEffectiveVolumeMode()==="hidden"?b:g`
                    <div class="persistent-volume-stepper">
                      <button class="stepper-btn" @click=${()=>this._onVolumeStep(-1)} title="${d("common.vol_down")}">–</button>
                      ${Ji?g`<span class="stepper-value">${Ji}</span>`:b}
                      <button class="stepper-btn" @click=${()=>this._onVolumeStep(1)} title="${d("common.vol_up")}">+</button>
                    </div>
                  `})()}
              </div>
            `:b}
          </div>
        `:b}
          ${this._searchActiveOptionsItem?Hd({item:this._searchActiveOptionsItem,onClose:()=>{this._searchActiveOptionsItem=null,this.requestUpdate()},onPlayOption:(w,H)=>this._performSearchOptionAction(w,H),massQueueAvailable:this._massQueueAvailable}):b}
          ${!Xa&&!this.config.hide_reorder_progress&&!this.config.hide_menu_player&&this._queueOpsTotal>0?g`
            <div class="queue-ops-progress" style="position: absolute !important; bottom: 12px !important; left: 50% !important; transform: translate(-50%, 0) !important; z-index: 1000 !important; width: max-content !important; pointer-events: none !important; color: var(--search-text-secondary) !important;">
              Re-ordering ${this._queueOpsCompleted} / ${this._queueOpsTotal}
            </div>
          `:""}
          ${(!this._showEntityOptions||!Xa)&&this._lyricsActive&&!this._isIdle&&this._fetchingLyrics?g`
            <div class="queue-ops-progress" style="position: absolute !important; bottom: 2px !important; left: 50% !important; transform: translate(-50%, 0) !important; z-index: 1000 !important; width: max-content !important; pointer-events: none !important; color: var(--search-text-secondary) !important;">
              ${d("lyrics.finding")}
            </div>
          `:""}
          </div>
    </ha-card>
  `}_getCardHeightMetrics(e){const t=this._cardHeight,i=typeof t=="string"?parseFloat(t):Number(t),s=typeof i=="number"&&Number.isFinite(i)&&i>0;return{customCardHeight:i,hasCustomCardHeight:s}}_getMaxCollapsedArtworkWidth(e){const t=e>0?Math.max(64,e-220):102;return Math.min(t,160)}_setHostDataAttributes(e,t,i){const s=this._appearance||"automatic";e.setAttribute("data-match-theme",String(t.match_theme===!0)),e.setAttribute("data-appearance",s),e.setAttribute("data-always-collapsed",String(this._alwaysCollapsed));const r=(this.entityObjs||[]).length>1,n=this._alwaysCollapsed&&!r&&!this._showGrouping;e.setAttribute("data-hide-menu-player",String(t.hide_menu_player===!0||n)),e.setAttribute("data-extend-artwork",String(this._extendArtwork)),e.setAttribute("data-disable-artwork-gradient",String(this._artworkGradientDisabled)),e.setAttribute("data-control-layout",this._controlLayout||"classic"),e.setAttribute("data-details-alignment",t.details_alignment||"left");const o=(this.entityObjs||[]).length===1&&this._alwaysCollapsed&&t.expand_on_search!==!0,l=t.pin_search_headers===!0&&!o;e.setAttribute("data-pin-search-headers",String(l)),e.setAttribute("data-in-search",String(this._showSearchInSheet)),i?e.setAttribute("data-has-custom-height","true"):e.removeAttribute("data-has-custom-height")}_getPlaybackAndCollapseState(e){const t=this._getEntityForPurpose(this._selectedIndex,"playback_control"),i=this.hass&&this.hass.states&&t?this.hass.states[t]:void 0,s=i?this._isEntityPlaying(i):!1,r=typeof e.idle_image=="string"&&e.idle_image.trim().startsWith("[[[")?this._evaluateJsTemplate(e.idle_image):this._idleImageTemplate?this._idleImageTemplateResult:e.idle_image?dt(this.hass,e.idle_image,this._getTemplateContext()):null,n=this._normalizeImageSourceValue(r),o=!!(e.show_idle_artwork_when_not_playing===!0&&!s&&n),l=this._isCurrentEntityPlaying(),c=this._alwaysCollapsed||this._isIdle&&e.collapse_on_idle===!0&&!l;return{playbackStateObj:i,collapsed:c,forceIdleImage:o}}_updatePersistentControlsVisibility(e,t,i,s,r){const n=(i?r?s:this._collapsedBaselineHeight||220:350)>=350;t.hide_menu_player!==!0&&(!i||n)?e.removeAttribute("data-hide-persistent-controls"):e.setAttribute("data-hide-persistent-controls","true")}_updateHostLayoutStyles(e,t,i,s,r){const n=r&&s<280,o=t.show_chip_row||"auto",l=(this.entityObjs||[]).length>1,c=(o==="in_menu"||o==="in_menu_on_idle"&&this._isIdle)&&l,u=o!=="hidden"&&!c&&l,h=t.action_chips&&t.action_chips.length>0,p=this.offsetWidth||0,_=u?58:0,m=_+(h?42:0),f=r?Math.max(0,s-m):0,y=[p,s,i,o,l,this._isIdle,h,this._artworkObjectFit,this._collapsedBaselineHeight,this._alwaysCollapsed,this._getEffectiveVolumeMode(),this._showEntityOptions].join("_");if(this._lastLayoutStateKey!==y)if(this._lastLayoutStateKey=y,i){let v;if(r){const Y=this._getMaxCollapsedArtworkWidth(p);v=Math.max(0,Math.min(Y,Math.round((s-(n?90:130))*.95)))}else v=this._artworkObjectFit==="no_artwork"?0:64;const x=this._collapsedBaselineHeight||220,k=r?s-x:0,E=v>0?Math.round(v+(n?12:24)+Math.min(40,Math.max(0,k)*.12)):0,S=r?s-240:0,C=Math.max(0,S-_),$=Math.min(90,C*.45),P=(C>0?Math.max(0,C-$):0)>=48?0:E,F=p>380?Math.min(1.6,1+(p-380)/520):1,T=k>0?Math.min(1.45,1+C/180):n?.9:1,I=T>1||F>1?Math.min(1.6,Math.max(T,F)):n?.95:1,O=n?.85:Math.min(1.5,Math.max(T*.92,F*.92)),N=r&&s<320&&!this._alwaysCollapsed,W=this._getEffectiveVolumeMode()==="hidden"||N||r&&s<260&&!this._showEntityOptions?54:100;k!==0||n?(e.style.setProperty("--yamp-collapsed-details-offset",`${E}px`),e.style.setProperty("--yamp-collapsed-controls-offset",`${P}px`),e.style.setProperty("--yamp-collapsed-title-scale",I.toFixed(3)),e.style.setProperty("--yamp-collapsed-artist-scale",O.toFixed(3)),e.style.setProperty("--yamp-collapsed-artwork-size",`${v}px`),e.style.setProperty("--yamp-collapsed-artwork-clearance",`${W}px`)):(e.style.removeProperty("--yamp-collapsed-controls-offset"),e.style.removeProperty("--yamp-collapsed-details-offset"),e.style.removeProperty("--yamp-collapsed-artwork-size"),e.style.removeProperty("--yamp-collapsed-title-scale"),e.style.removeProperty("--yamp-collapsed-artist-scale"),e.style.removeProperty("--yamp-collapsed-artwork-clearance"))}else{if(r){let v=70,x=50,k=42,E=36,S=28,C=24,$="16px",P="20px",F="10px 16px 14px 16px";if(f<380){const T=Math.max(.6,f/380);v=Math.max(48,Math.round(70*T)),x=Math.max(36,Math.round(50*T)),k=Math.max(32,Math.round(42*T)),E=Math.max(24,Math.round(36*T)),S=Math.max(20,Math.round(28*T)),C=Math.max(18,Math.round(24*T)),$=`${Math.max(4,Math.round(16*T))}px 16px`,P=`${Math.max(8,Math.round(20*T))}px`,F=`${Math.max(4,Math.round(10*T))}px 16px ${Math.max(8,Math.round(14*T))}px 16px`}e.style.setProperty("--yamp-modern-primary-size",`${v}px`),e.style.setProperty("--yamp-modern-medium-size",`${x}px`),e.style.setProperty("--yamp-modern-small-size",`${k}px`),e.style.setProperty("--yamp-modern-primary-icon-size",`${E}px`),e.style.setProperty("--yamp-modern-medium-icon-size",`${S}px`),e.style.setProperty("--yamp-modern-small-icon-size",`${C}px`),e.style.setProperty("--yamp-modern-padding",$),e.style.setProperty("--yamp-modern-gap",P),e.style.setProperty("--yamp-volume-row-padding",F)}else e.style.removeProperty("--yamp-modern-primary-size"),e.style.removeProperty("--yamp-modern-medium-size"),e.style.removeProperty("--yamp-modern-small-size"),e.style.removeProperty("--yamp-modern-primary-icon-size"),e.style.removeProperty("--yamp-modern-medium-icon-size"),e.style.removeProperty("--yamp-modern-small-icon-size"),e.style.removeProperty("--yamp-modern-padding"),e.style.removeProperty("--yamp-modern-gap"),e.style.removeProperty("--yamp-volume-row-padding");e.style.removeProperty("--yamp-collapsed-controls-offset"),e.style.removeProperty("--yamp-collapsed-details-offset"),e.style.removeProperty("--yamp-collapsed-artwork-size"),e.style.removeProperty("--yamp-collapsed-title-scale"),e.style.removeProperty("--yamp-collapsed-artist-scale"),e.style.removeProperty("--yamp-collapsed-artwork-clearance")}}_updateHostArtworkStyles(e,t,i){const s=this.metadataStateObj,r=this._getArtworkUrl(s,i),n=this._getArtworkUrl(t,i),o=this.currentStateObj,l=this._getArtworkUrl(o,i),c=s?.attributes?.media_title||t?.attributes?.media_title||o?.attributes?.media_title,u=this._resolveSelectedArtwork({metadataArtwork:r,playbackArtwork:n,mainArtwork:l,displayTitle:c,playbackStateObj:t,mainState:o});let h=this._artworkObjectFit;u?.objectFit&&(h=u.objectFit);const p=h||"cover",_=this._getBackgroundSizeForFit(p);e.style.setProperty("--yamp-artwork-fit",p),e.style.setProperty("--yamp-artwork-bg-size",_),u?.objectPosition?e.style.setProperty("--yamp-artwork-position",u.objectPosition):this.config?.artwork_position?e.style.setProperty("--yamp-artwork-position",this.config.artwork_position):e.style.setProperty("--yamp-artwork-position","top center")}_updateHostAttributes(){if(!this.shadowRoot||!this.shadowRoot.host||!this.hass||!this.config)return;const e=this.shadowRoot.host,t=this.config,{customCardHeight:i,hasCustomCardHeight:s}=this._getCardHeightMetrics(t);this._setHostDataAttributes(e,t,s);const{playbackStateObj:r,collapsed:n,forceIdleImage:o}=this._getPlaybackAndCollapseState(t);this._updatePersistentControlsVisibility(e,t,n,i,s),this._updateHostLayoutStyles(e,t,n,i,s),this._updateHostArtworkStyles(e,r,o)}_renderSearchSubFilters(e){return!e||!this._usingMusicAssistant||this._searchLoading?b:g`
      <div class="search-sub-filters" style="display: flex; align-items: center; margin-bottom: 2px; margin-top: 4px; padding-left: 3px; width: 100%; gap: 8px;">
        <div style="display: flex; align-items: center; flex-wrap: wrap; flex: 1; min-width: 0;">
          ${this._cardType!=="up_next"?g`
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
            title="${d("search.favorites")}"
          >
            <ha-icon .icon=${this._initialFavoritesLoaded||this._favoritesFilterActive?"mdi:cards-heart":"mdi:cards-heart-outline"}></ha-icon>
            ${this._initialFavoritesLoaded||this._favoritesFilterActive?g`
              <span style="margin-left:6px;font-size:0.82em;font-weight:600;white-space:nowrap;">
                ${d("search.favorites")}
              </span>
            `:b}
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
            title="${d("search.recently_played")}"
          >
            <ha-icon .icon=${this._recentlyPlayedFilterActive?"mdi:clock":"mdi:clock-outline"}></ha-icon>
            ${this._recentlyPlayedFilterActive?g`
              <span style="margin-left:6px;font-size:0.82em;font-weight:600;white-space:nowrap;">
                ${d("search.recently_played")}
              </span>
            `:b}
          </button>
          ${this._isMusicAssistantEntity()?g`
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
              title="${d("search.next_up")}"
            >
              <ha-icon .icon=${this._upcomingFilterActive?"mdi:playlist-music":"mdi:playlist-music-outline"}></ha-icon>
              ${this._upcomingFilterActive?g`
                <span style="margin-left:6px;font-size:0.82em;font-weight:600;white-space:nowrap;">
                  ${d("search.next_up")}
                </span>
              `:b}
            </button>
            ${this._hasMassQueueIntegration?g`
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
                title="${d("search.recommendations")}"
              >
                <ha-icon .icon=${this._recommendationsFilterActive?"mdi:creation":"mdi:creation-outline"}></ha-icon>
                ${this._recommendationsFilterActive?g`
                  <span style="margin-left:6px;font-size:0.81em;font-weight:600;white-space:nowrap;">
                    ${d("search.recommendations")}
                  </span>
                `:b}
              </button>
            `:b}
          `:b}
          <button
            class="radio-mode-button${this._radioModeActive?" active":""}"
            @click=${()=>this._toggleRadioMode()}
            title="${d("search.radio_mode")}"
          >
            <ha-icon .icon=${this._radioModeActive?"mdi:radio":"mdi:radio-off"}></ha-icon>
          </button>
          ${this._shouldShowSearchSortToggle()?g`
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
          `:b}
          `:b}
          ${this._shouldShowSearchResultsCount()?g`
            <span class="search-results-count" style="${this._cardType==="up_next"?"padding-top: 15px; display: inline-block;":""}">
              ${this._getSearchResultsCountLabel()}
            </span>
          `:b}
        </div>
      </div>
    `}_renderSearchInOptions(e,t=!1){const i=t||this.config?.pin_search_headers===!0,s=i?0:this._searchHeaderOffset||0,r=this._searchHeaderNaturalHeight||120,n=r>0?s/r:0,o=Math.max(0,Math.min(1,1-n)),l=!i&&(this._searchHeadersRetracted||s>=r&&r>0),c=!i&&s>0?`margin-top: -${s}px; opacity: ${o.toFixed(3)};${l?" pointer-events: none;":""}`:"";return g`
      <div class="entity-options-search"
           @wheel=${u=>this._handleSearchContainerWheel(u,t)}
           style="margin-top:${this._cardType==="up_next"?"0":"12px"};">
        <div class="search-header-panel ${l?"retracted":""}"
             style="${c}"
             @wheel=${u=>this._handleHeaderWheel(u,t)}
             @touchstart=${u=>this._handleHeaderTouchStart(u)}
             @touchmove=${u=>this._handleHeaderTouchMove(u,t)}
             @touchend=${()=>this._handleHeaderTouchEnd()}>
          ${this._searchHierarchy.length>0?g`
              <button class="entity-options-item close-item" @click=${()=>this._goBackInSearch()}>
                ${d("common.back")}
              </button>
              <div class="entity-options-divider"></div>
            `:b}
          ${this._searchBreadcrumb?g`
              <div class="entity-options-search-breadcrumb">
                <div class="entity-options-search-breadcrumb-text">${this._searchBreadcrumb}</div>
                ${this._isSelectionFlow?b:g`
                  <button class="entity-options-search-breadcrumb-play" @click=${()=>this._playCurrentCollection()} title="${d("search.play_collection")}">
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>
                `}
              </div>
            `:e&&this._cardType!=="up_next"?g`<div class="entity-options-search-skeleton"></div>`:b}
          ${e&&this._cardType!=="up_next"?g`
            <div class="entity-options-search-row">
              <div class="search-input-wrapper">
                <input
                  type="text"
                  id="search-input-box"
                  ?autofocus=${!this._disableSearchAutofocus}
                  class="entity-options-search-input"
                  .value=${this._searchQuery}
                  @focus=${()=>{(this._searchHeaderOffset||0)>0&&this._updateSearchHeaderPosition(0,!0)}}
                  @input=${u=>{this._searchQuery=u.target.value,this.requestUpdate()}}
                  @keydown=${u=>{u.key==="Enter"?(u.preventDefault(),this._handleSearchSubmit()):u.key==="Escape"&&(u.preventDefault(),this._hideSearchSheetInOptions())}}
                  placeholder="${d("editor.placeholders.search")}"
                />
                ${this._searchQuery?g`
                  <button
                    class="search-input-clear"
                    @click=${()=>{this._searchHierarchy.length>0?(this._searchQuery="",this.requestUpdate()):this._showSearchSheetInOptions()}}
                    title="${d("common.clear")}">
                    <ha-icon icon="mdi:close"></ha-icon>
                  </button>
                `:b}
              </div>
              <button
                class="entity-options-item icon-only"
                style="min-width:48px; padding: 0;"
                @click=${()=>this._handleSearchSubmit()}
                title="${d("common.search")}"
                aria-label="${d("common.search")}"
                ?disabled=${this._searchLoading}>
                <ha-icon icon="mdi:magnify"></ha-icon>
              </button>
              ${this._cardType!=="search"&&this._cardType!=="up_next"?g`
              <button
                class="entity-options-item icon-only"
                style="min-width:48px; padding: 0;"
                title="${d("common.cancel")}"
                aria-label="${d("common.cancel")}"
                @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._hideSearchSheetInOptions()}}>
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
              `:b}
            </div>
          `:b}
          <!--FILTER CHIPS-->
          ${e&&this._cardType!=="up_next"?(()=>{const u=this._getVisibleSearchFilterClasses(),h=this._searchMediaClassFilter||"all";return this._searchHierarchy.length>0||u.length<2&&!this._usingMusicAssistant?b:g`
              <div class="chip-row search-filter-chips" id="search-filter-chip-row" style="margin-bottom:4px; justify-content: center; align-items: center;">
                  <button
                    class="chip"
                    ?selected=${h==="all"}
                    @click=${()=>this._doSearch()}
                  >${d("search.filters.all")}</button>
                  ${u.map(p=>g`
                    <button
                      class="chip"
                      ?selected=${h===p}
                      @click=${()=>this._doSearch(p)}
                    >
                      ${d(`search.filters.${p}`)}
                    </button>
                  `)}
              </div>
            `})():b}
          
          ${this._searchLoading?g`<div class="entity-options-search-loading">${d("common.loading")}</div>`:b}
          ${this._searchError?g`<div class="entity-options-search-error">${this._searchError}</div>`:b}
          
          ${this._renderSearchSubFilters(e)}
        </div>
 
        ${(()=>{const u=this._upcomingFilterActive&&this._massQueueAvailable,h=this._getDisplaySearchResults(),p=this.config.search_view==="card"||this.config.search_view==="card_minimal",_=this.config.search_view==="card_minimal",m=this._isGridMode,f=y=>Bd({item:y,isCard:p,isMinimal:_,isGridMode:m,activeSearchRowMenuId:this._activeSearchRowMenuId,loadingSearchRowMenuId:this._loadingSearchRowMenuId,errorSearchRowMenuId:this._errorSearchRowMenuId,successSearchRowMenuId:this._successSearchRowMenuId,successSearchRowType:this._successSearchRowType,isSelectionFlow:this._isSelectionFlow,massQueueAvailable:this._massQueueAvailable,upcomingFilterActive:!!this._upcomingFilterActive,recentlyPlayedFilterActive:!!this._recentlyPlayedFilterActive,recommendationsFilterActive:!!this._recommendationsFilterActive,searchMediaClassFilter:this._searchMediaClassFilter,queueControlsStyle:this.config.queue_controls_style||"drag_handle",onPlay:(v,x)=>this._playMediaFromSearch(v,x),onResultClick:(v,x)=>this._handleSearchResultClick(v,x),onOptionsToggle:v=>{this._activeSearchRowMenuId=v?.media_content_id||null,this.requestUpdate()},onPlayOption:(v,x)=>this._performSearchOptionAction(v,x),onMoveUp:v=>this._moveQueueItemUp(v.queue_item_id),onMoveDown:v=>this._moveQueueItemDown(v.queue_item_id),onMoveNext:v=>this._moveQueueItemNext(v.queue_item_id),onRemove:v=>this._removeQueueItem(v.queue_item_id),isMusicAssistant:this._isMusicAssistantEntity(),isValidArtwork:v=>Si(v),getClickTitle:v=>this._getSearchResultClickTitle(v),artworkHostname:this.config?.artwork_hostname||""});if(this._searchAttempted&&h.length===0&&!this._searchLoading)return g`
              <div class="${this._showSearchInSheet?"search-sheet-results":"entity-options-search-results"}"
                   @wheel=${y=>this._handleSearchResultsWheel(y,t)}
                   @touchstart=${y=>this._handleResultsTouchStart(y)}
                   @touchmove=${y=>this._handleResultsTouchMove(y,t)}
                   @touchend=${()=>this._handleResultsTouchEnd()}>
                <div class="entity-options-search-empty">${d("common.no_results")}</div>
              </div>
            `;if(u)return g`
              <div class="${this._showSearchInSheet?"search-sheet-results":"entity-options-search-results"} queue-results-wrapper ${m?"grid-mode":""}"
                   @scroll=${y=>this._handleSearchResultsScroll(y,t)}
                   @wheel=${y=>this._handleSearchResultsWheel(y,t)}
                   @touchstart=${y=>this._handleResultsTouchStart(y)}
                   @touchmove=${y=>this._handleResultsTouchMove(y,t)}
                   @touchend=${()=>this._handleResultsTouchEnd()}
                   style="${this.config.search_view==="card"||this.config.search_view==="card_minimal"||m?`--search-card-columns: ${m?5:this.config.search_card_columns||4};`:""}">
                <div class="queue-sortable-container ${p||m?"is-card-layout":""} ${m?"grid-mode":""}"
                  @pointerdown=${y=>this._onQueueDragStart(y)}
                >
                  ${h.map((y,v)=>g`
                    <div class="queue-drag-wrapper" data-queue-idx="${v}">
                      ${f(y)}
                    </div>
                  `)}
                </div>
              </div>
            `;if(!this._cachedSearchGridLayout||this._cachedSearchGridLayoutColumns!==(m?5:this.config.search_card_columns||4)||this._cachedSearchGridLayoutIsMinimal!==_||this._cachedSearchGridLayoutIsGridMode!==m){const y=m?5:this.config.search_card_columns||4;this._cachedSearchGridLayoutColumns=y,this._cachedSearchGridLayoutIsMinimal=_,this._cachedSearchGridLayoutIsGridMode=m,this._cachedSearchGridLayout=ld({columns:y,gap:m?"0px":"12px",padding:m?"0px":"12px",itemSize:m?{width:70,height:85}:_?{width:150,height:150}:{width:150,height:244}})}return g`
            <div class="${this._showSearchInSheet?"search-sheet-results":"entity-options-search-results"} virtualized-results-wrapper ${m?"grid-mode":""}"
                 @scroll=${y=>this._handleSearchResultsScroll(y,t)}
                 @wheel=${y=>this._handleSearchResultsWheel(y,t)}
                 @touchstart=${y=>this._handleResultsTouchStart(y)}
                 @touchmove=${y=>this._handleResultsTouchMove(y,t)}
                 @touchend=${()=>this._handleResultsTouchEnd()}
                 style="${this.config.search_view==="card"||this.config.search_view==="card_minimal"||m?`--search-card-columns: ${m?5:this.config.search_card_columns||4};`:""}">
              ${dn(p||m?{items:h,renderItem:f,layout:this._cachedSearchGridLayout,scroller:!0}:{items:h,renderItem:f,scroller:!0})}
            </div>
          `})()}
      </div>
    `}_renderSourceListSheet(e,t,i){const s=this._isGridMode;return g`
      <div class="entity-options-header">
        <button class="entity-options-item close-item" @click=${()=>{this._quickMenuInvoke?this._dismissWithAnimation():this._closeSourceList()}}>
          ${d("common.back")}
        </button>
        <div class="entity-options-divider"></div>
      </div>
      <div class="entity-options-scroll source-list-centering-wrapper">
        <div class="source-list-sheet">
          <div class="source-list-scroll ${s?"grid-menu":""}">
            ${e.map(r=>s?g`
                  <button class="entity-options-item menu-action-item" @click=${()=>this._selectSource(r)}>
                    <ha-icon class="menu-action-icon" icon="mdi:login"></ha-icon>
                    <span class="menu-action-label">${r}</span>
                  </button>
                `:g`
                <div class="entity-options-item" data-source-name="${r}" @click=${()=>this._selectSource(r)}>${r}</div>
              `)}
          </div>
        </div>
      </div>
      ${s?b:g`
        <div class="floating-source-index">
          ${t.map((r,n)=>{const o=i.has(r),l=this._hoveredSourceLetterIndex;let c="";if(o&&l!==null&&l!==void 0){const u=Math.abs(l-n);u===0?c="max":u===1?c="large":u===2&&(c="med")}return g`
              <button
                class="source-index-letter"
                ?disabled=${!o}
                data-scale=${c}
                @mouseenter=${o?()=>{this._hoveredSourceLetterIndex=n,this.requestUpdate()}:b}
                @mouseleave=${()=>{this._hoveredSourceLetterIndex=null,this.requestUpdate()}}
                @click=${o?()=>this._scrollToSourceLetter(r):b}
              >
                ${r}
              </button>
            `})}
        </div>
      `}
    `}_updateIdleState(e){const t=this.entityIds.some((o,l)=>{if(this._isAutoSelectDisabled(l))return!1;const c=this._getEntityForPurpose(l,"sorting");return this._isEntityPlaying(this.hass?.states?.[c])}),i=this._isCurrentEntityPlaying(),s=this._isAutoSelectDisabled(this._selectedIndex),r=i&&(!s||this._manualSelect);let n;if(this._isIdle||!this._hasSeenPlayback?n=t||i:n=r,n){this._idleTimeout&&clearTimeout(this._idleTimeout),this._idleTimeout=null,this._hasSeenPlayback=!0,this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate());return}if(this.isAnyMenuOpen){this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null);return}if(!this._hasSeenPlayback){this._idleTimeoutMs>0?this._isIdle||(this._setIdleState(!0),this._idleScreenApplied=!1,this._applyIdleScreen(),this.requestUpdate()):this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate());return}!this._isIdle&&this._idleTimeoutMs>0&&(e&&e.has("_selectedIndex")?(this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),!t&&this._idleTimeoutMs>0?(this._setIdleState(!0),this._idleScreenApplied=!1,this._pinnedIndex===null&&(this._manualSelect=!1,this._manualSelectPlayingSet=null),this._applyIdleScreen(),this.requestUpdate()):this._idleTimeout=setTimeout(()=>{this._handleIdleTimeoutCallback()},this._idleTimeoutMs)):this._idleTimeout||(this._idleTimeout=setTimeout(()=>{this._handleIdleTimeoutCallback()},this._idleTimeoutMs))),this._idleTimeoutMs===0&&this._isIdle&&(this._setIdleState(!1),this._resetIdleScreen(),this.requestUpdate())}_handleIdleTimeoutCallback(){if(this._cardType==="search"||this._cardType==="up_next"){if(this._idleTimeout=null,this._searchHierarchy.length>0){this._searchHierarchy=[],this._searchBreadcrumb="",this._searchResultsByType={};const t=this.config?.default_search_filter==="all"?null:this.config?.default_search_filter;this._doSearch(t).catch(()=>{}),this.requestUpdate()}return}const e=this.entityIds.some((t,i)=>{if(this._isAutoSelectDisabled(i))return!1;const s=this._getEntityForPurpose(i,"sorting"),r=this.hass?.states?.[s];return r&&this._isEntityPlaying(r)});if(this._idleTimeout=null,this._pinnedIndex===null&&(this._manualSelect=!1,this._manualSelectPlayingSet=null),e){const t=this.sortedEntityIds;if(t.length>0){let i=t[0];const s=i?(this.groupedSortedEntityIds||[]).find(n=>n.includes(i)):null;if(s&&s.length>1){const n=this._getActualGroupMaster(s);n&&(i=n)}const r=this.entityIds.indexOf(i);r>=0&&r!==this._selectedIndex&&(this._selectedIndex=r)}this.requestUpdate();return}this._setIdleState(!0),this._idleScreenApplied=!1,this._applyIdleScreen(),this.requestUpdate()}getGridOptions(){let e;return this._alwaysCollapsed&&this._expandOnSearch&&this._showSearchInSheet?e=!1:e=this._alwaysCollapsed?!0:this._collapseOnIdle?this._isIdle:!1,{min_rows:e?2:4,columns:12}}static get _schema(){return[{name:"entities",selector:{entity:{multiple:!0,domain:"media_player"}},required:!0},{name:"show_chip_row",selector:{select:{options:[{value:"auto",label:"Auto"},{value:"always",label:"Always"},{value:"in_menu",label:"In Menu"},{value:"in_menu_on_idle",label:"In Menu on Idle"}]}},required:!1},{name:"idle_screen",selector:{select:{options:[{value:"default",label:"Default"},{value:"search",label:"Search"},{value:"source",label:"Source"},{value:"more-info",label:"More Info"},{value:"group-players",label:"Group Players"},{value:"transfer-queue",label:"Transfer Queue"}]}},required:!1},{name:"hold_to_pin",selector:{boolean:{}},required:!1},{name:"disable_autofocus",selector:{boolean:{}},required:!1},{name:"idle_image",selector:{entity:{domain:"",multiple:!1}},required:!1},{name:"background_image",selector:{text:{}},required:!1},{name:"match_theme",selector:{boolean:{}},required:!1},{name:"collapse_on_idle",selector:{boolean:{}},required:!1},{name:"always_collapsed",selector:{boolean:{}},required:!1},{name:"expand_on_search",selector:{boolean:{}},required:!1},{name:"alternate_progress_bar",selector:{boolean:{}},required:!1},{name:"idle_timeout_ms",selector:{number:{min:0,step:1e3,unit_of_measurement:"ms",mode:"box"}},required:!1},{name:"volume_step",selector:{number:{min:.01,max:1,step:.01,unit_of_measurement:"",mode:"box"}},required:!1},{name:"volume_mode",selector:{select:{options:[{value:"slider",label:"Slider"},{value:"stepper",label:"Stepper"}]}},required:!1},{name:"actions",selector:{object:{}},required:!1},{name:"dim_chips_on_idle",selector:{boolean:{}},required:!1},{name:"pin_search_headers",selector:{boolean:{}},required:!1}]}firstUpdated(){super.firstUpdated?.();const e=this.renderRoot.querySelector(".floating-source-index");e&&e.addEventListener("wheel",function(t){const{scrollTop:i,scrollHeight:s,clientHeight:r}=e,n=t.deltaY;(n<0&&i===0||n>0&&i+r>=s)&&(t.preventDefault(),t.stopPropagation())},{passive:!1})}_addGrabScroll(e){const t=this.renderRoot.querySelector(e);if(!t||t._grabScrollAttached)return;let i=!1,s,r;const n=h=>{i=!0,t._dragged=!1,t.classList.add("grab-scroll-active"),s=h.pageX-t.offsetLeft,r=t.scrollLeft,h.preventDefault()},o=()=>{i=!1,t.classList.remove("grab-scroll-active")},l=()=>{i=!1,t.classList.remove("grab-scroll-active")},c=h=>{if(!i)return;const p=h.pageX-t.offsetLeft-s;Math.abs(p)>5&&(t._dragged=!0),h.preventDefault(),t.scrollLeft=r-p},u=h=>{t._dragged&&(h.stopPropagation(),h.preventDefault(),t._dragged=!1)};t.addEventListener("mousedown",n),t.addEventListener("mouseleave",o),t.addEventListener("mouseup",l),t.addEventListener("mousemove",c),t.addEventListener("click",u,!0),t._grabScrollHandlers={mousedown:n,mouseleave:o,mouseup:l,mousemove:c,click:u},t._grabScrollAttached=!0}_addVerticalGrabScroll(e){const t=this.renderRoot.querySelector(e);if(!t||t._grabScrollAttached)return;let i=!1,s,r;const n=h=>{i=!0,t._dragged=!1,t.classList.add("grab-scroll-active"),s=h.pageY-t.getBoundingClientRect().top,r=t.scrollTop,h.preventDefault()},o=()=>{i=!1,t.classList.remove("grab-scroll-active")},l=()=>{i=!1,t.classList.remove("grab-scroll-active")},c=h=>{if(!i)return;const p=h.pageY-t.getBoundingClientRect().top-s;Math.abs(p)>5&&(t._dragged=!0),h.preventDefault(),t.scrollTop=r-p},u=h=>{t._dragged&&(h.stopPropagation(),h.preventDefault(),t._dragged=!1)};t.addEventListener("mousedown",n),t.addEventListener("mouseleave",o),t.addEventListener("mouseup",l),t.addEventListener("mousemove",c),t.addEventListener("click",u,!0),t._grabScrollHandlers={mousedown:n,mouseleave:o,mouseup:l,mousemove:c,click:u},t._grabScrollAttached=!0}_removeGrabScrollHandlers(){this.renderRoot.querySelectorAll(".chip-row, .action-chip-row, .floating-source-index, .search-filter-chips").forEach(e=>{if(e._grabScrollHandlers){const t=e._grabScrollHandlers;e.removeEventListener("mousedown",t.mousedown),e.removeEventListener("mouseleave",t.mouseleave),e.removeEventListener("mouseup",t.mouseup),e.removeEventListener("mousemove",t.mousemove),e.removeEventListener("click",t.click,!0),delete e._grabScrollHandlers,e._grabScrollAttached=!1}})}_removeSearchSwipeHandlers(){const e=this.renderRoot.querySelector(".entity-options-search-results");if(e&&e._searchSwipeHandlers){const t=e._searchSwipeHandlers;e.removeEventListener("touchstart",t.touchstart),e.removeEventListener("touchend",t.touchend),delete e._searchSwipeHandlers,this._searchSwipeAttached=!1}}disconnectedCallback(){this._isEditorPreviewCached=void 0,this._activeDragCleanup&&this._activeDragCleanup(),this._idleTimeout&&(clearTimeout(this._idleTimeout),this._idleTimeout=null),this._dragClickCaptureTimeout&&(clearTimeout(this._dragClickCaptureTimeout),this._dragClickCaptureTimeout=null),this._dragClickCaptureFn&&(window.removeEventListener("click",this._dragClickCaptureFn,!0),this._dragClickCaptureFn=null),this._unsubscribeFromQueueUpdates(),this._lyricsFetchTimeout&&(clearTimeout(this._lyricsFetchTimeout),this._lyricsFetchTimeout=null),this._mediaSessionManager&&this._mediaSessionManager.destroy(),this._mediaSessionUpdateTimer&&(clearTimeout(this._mediaSessionUpdateTimer),this._mediaSessionUpdateTimer=null),this._searchHeaderTransitionTimer&&(clearTimeout(this._searchHeaderTransitionTimer),this._searchHeaderTransitionTimer=null),super.disconnectedCallback?.(),this._progressTimer&&(clearInterval(this._progressTimer),this._progressTimer=null),this._debouncedVolumeTimer&&(clearTimeout(this._debouncedVolumeTimer),this._debouncedVolumeTimer=null),this._volumeOverlayTimer&&(clearTimeout(this._volumeOverlayTimer),this._volumeOverlayTimer=null),this._internalVolumeSuppressTimer&&(clearTimeout(this._internalVolumeSuppressTimer),this._internalVolumeSuppressTimer=null),this._manualSelectTimeout&&(clearTimeout(this._manualSelectTimeout),this._manualSelectTimeout=null),this._searchTimeoutHandle&&!this._searchLoading&&(clearTimeout(this._searchTimeoutHandle),this._searchTimeoutHandle=null),this._queueRefreshTimer&&(clearTimeout(this._queueRefreshTimer),this._queueRefreshTimer=null),this._gestureHoldTimer&&(clearTimeout(this._gestureHoldTimer),this._gestureHoldTimer=null),this._tapTimer&&(clearTimeout(this._tapTimer),this._tapTimer=null),this._successToastHandle&&(clearTimeout(this._successToastHandle),this._successToastHandle=null),this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),this._queueOpsTimeout&&(clearTimeout(this._queueOpsTimeout),this._queueOpsTimeout=null),this._removeSourceDropdownOutsideHandler(),this._removeGrabScrollHandlers(),this._removeSearchSwipeHandlers(),window.removeEventListener("scroll",this._handleGlobalScroll),window.removeEventListener("resize",this._handleViewportResize),typeof this._teardownAdaptiveTextObserver=="function"&&this._teardownAdaptiveTextObserver(),Object.values(this._templateSubscriptions).forEach(e=>{try{typeof e=="function"&&e()}catch(t){console.warn("yamp: Error during template unsubscription:",t)}}),this._templateSubscriptions={},this._activeSubscriptionTokens={},this._adaptiveScrollTimer&&(clearTimeout(this._adaptiveScrollTimer),this._adaptiveScrollTimer=null),this._cleanupMarquee(),this._lastPlayingEntityId=null,this._controlFocusEntityId=null}_applyClosingAnimations(){const e=this.renderRoot.querySelector(".entity-options-overlay"),t=this.renderRoot.querySelector(".entity-options-container"),i=this.renderRoot.querySelector(".entity-options-sheet");e&&(e.classList.remove("entity-options-overlay-opening"),e.classList.add("entity-options-overlay-closing")),t&&(t.classList.remove("entity-options-container-opening"),t.classList.add("entity-options-container-closing")),i&&(i.classList.remove("entity-options-sheet-opening"),i.classList.add("entity-options-sheet-closing"))}_dismissWithAnimation(){if(this._cardType==="search"||this._cardType==="up_next"){this._showGrouping=!1,this._showSourceList=!1,this._showResolvedEntities=!1,this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._showEntityOptions=!0,this._showSearchInSheet=!0,this._quickMenuInvoke=!1,this.requestUpdate();return}this._applyClosingAnimations(),this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),setTimeout(()=>{this._showEntityOptions=!1,this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._quickMenuInvoke=!1,this.requestUpdate()},200)}_closeEntityOptions(e){if(this._isDragging){e&&(e.stopPropagation(),e.preventDefault());return}if(this._cardType==="search"||this._cardType==="up_next"){this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._showResolvedEntities=!1,this.requestUpdate();return}this._applyClosingAnimations(),this._transferQueueAutoCloseTimer&&(clearTimeout(this._transferQueueAutoCloseTimer),this._transferQueueAutoCloseTimer=null),setTimeout(()=>{if(this._showTransferQueue=!1,this._transferQueuePendingTarget=null,this._transferQueueStatus=null,this._showGrouping){this._showGrouping=!1,this._showEntityOptions=!1;const t=this.groupedSortedEntityIds,i=this.currentEntityId,s=t.find(r=>r.includes(i));if(s&&s.length>1){const r=this._getActualGroupMaster(s),n=this.entityIds.indexOf(r);n>=0&&(this._selectedIndex=n)}this.requestUpdate()}else this._showEntityOptions=!1,this._showGrouping=!1,this._showSourceList=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this._cardType!=="remote_control"&&(this._showRemoteControl=!1),this._openedSearchFromNowPlaying=!1,this._searchInputAutoFocused=!1,this._searchHierarchy=[],this._searchBreadcrumb="",this._addToPlaylistTarget=null,this._lastSearchUsedServerFavorites=!1,this.requestUpdate();this._quickMenuInvoke=!1},200)}async _openEntityOptions(){for(let e=0;e<this.entityObjs.length;e++)await this._ensureResolvedMaForIndex(e),await this._ensureResolvedVolForIndex(e),await this._ensureResolvedRemoteForIndex(e),await this._ensureResolvedHiddenControlsForIndex(e);await this._updateTransferQueueAvailability({refresh:!0}),this._showEntityOptions=!0,this.requestUpdate(),this.updateComplete.then(()=>{const e=this.renderRoot?.querySelector(".entity-options-chips-strip");e&&(e.scrollLeft=0)})}_openGrouping(){this._showEntityOptions=!0,this._showGrouping=!0;const e=this.currentEntityId;let t=e;if(e){const i=(this.groupedSortedEntityIds||[]).find(s=>s.includes(e));if(i&&i.length){const s=this._getActualGroupMaster(i);s&&(t=s)}}!t&&this.entityIds&&this.entityIds.length&&(t=this.entityIds[0]),this._lastGroupingMasterId=t,this.requestUpdate()}_hasRemoteControlSupport(){const e=this._selectedIndex;return(this.entityObjs||[])[e]?.remote_entity===!1?!1:!!this._getRemoteControlEntity(!0)}_getRemoteControlEntity(e=!1){const t=this._selectedIndex,i=(this.entityObjs||[])[t];if(i?.remote_entity){const r=this._resolveEntity(i.remote_entity,null,t,"remote")||dt(this.hass,i.remote_entity,this._getTemplateContext());if(r&&typeof r=="string"&&r.trim()!=="")return r.trim()}const s=this.currentEntityId;if(!s)return null;if(s.startsWith("remote."))return s;if(s.startsWith("media_player.")){const r=`remote.${s.replace("media_player.","")}`;if(this.hass?.states?.[r])return r}return e?null:s}_sendRemoteCommand(e){const t=this._getRemoteControlEntity();if(t){if(t.startsWith("remote.")){this.hass.callService("remote","send_command",{entity_id:t,command:e});return}switch(e){case"up":case"down":case"left":case"right":case"select":case"back":case"menu":case"home":this.hass.callService("remote","send_command",{entity_id:t,command:e});break;case"play_pause":this.hass.callService("media_player","media_play_pause",{entity_id:t});break;case"previous":case"rewind":this.hass.callService("media_player","media_previous_track",{entity_id:t});break;case"next":case"fast_forward":this.hass.callService("media_player","media_next_track",{entity_id:t});break;case"volume_up":this.hass.callService("media_player","volume_up",{entity_id:t});break;case"volume_down":this.hass.callService("media_player","volume_down",{entity_id:t});break;case"mute":this.hass.callService("media_player","volume_mute",{entity_id:t,is_volume_muted:!this.currentVolumeStateObj?.attributes?.is_volume_muted});break;case"power":this.hass.callService("media_player","toggle",{entity_id:t});break;default:this.hass.callService("remote","send_command",{entity_id:t,command:e})}}}_openRemoteControl(){this._showEntityOptions=!0,this._showRemoteControl=!0,this._showGrouping=!1,this._showSourceList=!1,this._showTransferQueue=!1,this._showSearchInSheet=!1,this._showResolvedEntities=!1,this.requestUpdate()}_closeRemoteControl(){this._cardType!=="remote_control"&&(this._showRemoteControl=!1,this.requestUpdate())}_getHiddenRemoteButtons(){const e=this._selectedIndex;let t=(this.entityObjs||[])[e]?.hide_remote_buttons??this.config.hide_remote_buttons;if(typeof t=="string"&&(t.includes("{{")||t.includes("{%")||t.includes("[[["))&&(t=dt(this.hass,t,this._getTemplateContext())),typeof t=="string")try{t=JSON.parse(t.replace(/'/g,'"'))}catch{t=t.split(",").map(i=>i.trim()).filter(i=>i!=="")}return Array.isArray(t)?t:[]}_renderRemoteControlSheet(){const e=this._getHiddenRemoteButtons();return g`
      <style>
        .remote-control-container {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          padding: 12px 16px 24px 16px !important;
          gap: 16px !important;
          box-sizing: border-box !important;
          width: 100% !important;
          flex: 1 !important;
          margin: 0 auto !important;
        }
        .remote-dpad-wrapper {
          position: relative !important;
          width: 200px !important;
          height: 200px !important;
          flex-shrink: 0 !important;
          margin: 4px auto 12px auto !important;
        }
        .remote-dpad-cross {
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
          border-radius: 50% !important;
          background: var(--yamp-overlay-divider, rgba(255, 255, 255, 0.08)) !important;
          border: 1px solid var(--yamp-overlay-divider, rgba(255, 255, 255, 0.18)) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.3), 0 6px 18px rgba(0, 0, 0, 0.25) !important;
          overflow: hidden !important;
          box-sizing: border-box !important;
        }
        .dpad-btn {
          appearance: none !important;
          -webkit-appearance: none !important;
          position: absolute !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: transparent !important;
          border: none !important;
          color: var(--yamp-overlay-text, var(--primary-text-color, #fff)) !important;
          cursor: pointer !important;
          transition: background 0.15s ease, transform 0.1s ease, color 0.15s ease !important;
          padding: 0 !important;
          margin: 0 !important;
          outline: none !important;
          box-sizing: border-box !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .dpad-btn:not(.dpad-center) {
          -webkit-mask-image: radial-gradient(closest-side circle at 50% 50%, transparent 47%, black 49%) !important;
          mask-image: radial-gradient(closest-side circle at 50% 50%, transparent 47%, black 49%) !important;
        }
        .dpad-btn:hover {
          background: rgba(255, 255, 255, 0.16) !important;
          color: var(--custom-accent, var(--accent-color, #ff9800)) !important;
        }
        .dpad-btn:active {
          background: rgba(255, 255, 255, 0.28) !important;
          transform: scale(0.92) !important;
        }
        .dpad-btn ha-icon {
          --mdc-icon-size: 28px !important;
          pointer-events: none !important;
        }
        .dpad-btn.dpad-up {
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          clip-path: polygon(0 0, 100% 0, 50% 50%) !important;
          align-items: flex-start !important;
          padding-top: 12% !important;
        }
        .dpad-btn.dpad-down {
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          clip-path: polygon(100% 100%, 0 100%, 50% 50%) !important;
          align-items: flex-end !important;
          padding-bottom: 12% !important;
        }
        .dpad-btn.dpad-left {
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          clip-path: polygon(0 100%, 0 0, 50% 50%) !important;
          justify-content: flex-start !important;
          padding-left: 12% !important;
        }
        .dpad-btn.dpad-right {
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          clip-path: polygon(100% 0, 100% 100%, 50% 50%) !important;
          justify-content: flex-end !important;
          padding-right: 12% !important;
        }
        .dpad-btn.dpad-center {
          top: 28% !important;
          left: 28% !important;
          width: 44% !important;
          height: 44% !important;
          border-radius: 50% !important;
          background: rgba(255, 255, 255, 0.12) !important;
          border: 1px solid var(--yamp-overlay-divider, rgba(255, 255, 255, 0.25)) !important;
          font-weight: 600 !important;
          font-size: 0.88rem !important;
          letter-spacing: 0.03em !important;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3) !important;
          z-index: 3 !important;
        }
        .dpad-btn.dpad-center:hover {
          background: rgba(255, 255, 255, 0.25) !important;
          color: var(--custom-accent, var(--accent-color, #ff9800)) !important;
        }
        .remote-control-row {
          display: flex !important;
          align-items: center !important;
          justify-content: space-around !important;
          gap: 12px !important;
          width: 100% !important;
          max-width: 320px !important;
          margin: 0 auto !important;
        }
        .remote-control-btn {
          appearance: none !important;
          -webkit-appearance: none !important;
          display: flex !important;
          flex: 1 !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          height: 48px !important;
          max-width: 72px !important;
          border-radius: 14px !important;
          background: var(--yamp-overlay-divider, rgba(255, 255, 255, 0.08)) !important;
          border: 1px solid var(--yamp-overlay-divider, rgba(255, 255, 255, 0.15)) !important;
          color: var(--yamp-overlay-text, var(--primary-text-color, #fff)) !important;
          cursor: pointer !important;
          transition: all 0.15s ease !important;
          outline: none !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .remote-control-btn:hover {
          background: rgba(255, 255, 255, 0.18) !important;
          border-color: var(--custom-accent, var(--accent-color, #ff9800)) !important;
          color: var(--custom-accent, var(--accent-color, #ff9800)) !important;
          transform: translateY(-1px) !important;
        }
        .remote-control-btn:active {
          transform: scale(0.93) !important;
        }
        .remote-control-btn ha-icon {
          --mdc-icon-size: 22px !important;
          pointer-events: none !important;
        }
      </style>
      ${this._cardType!=="remote_control"?g`
        <div class="entity-options-header">
          <button class="entity-options-item close-item" @click=${()=>this._closeRemoteControl()}>
            ${d("common.back")}
          </button>
        </div>
        <div class="entity-options-divider"></div>
      `:b}
      <div class="entity-options-scroll remote-control-container">
        <!-- D-Pad Directional Pad -->
        <div class="remote-dpad-wrapper">
          <div class="remote-dpad-cross">
            <button class="dpad-btn dpad-up" @click=${()=>this._sendRemoteCommand("up")} title="${d("card.remote.up")}">
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </button>
            <button class="dpad-btn dpad-down" @click=${()=>this._sendRemoteCommand("down")} title="${d("card.remote.down")}">
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </button>
            <button class="dpad-btn dpad-left" @click=${()=>this._sendRemoteCommand("left")} title="${d("card.remote.left")}">
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
            <button class="dpad-btn dpad-right" @click=${()=>this._sendRemoteCommand("right")} title="${d("card.remote.right")}">
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
            <button class="dpad-btn dpad-center" @click=${()=>this._sendRemoteCommand("select")} title="${d("card.remote.select")}">
              ${d("card.remote.select")}
            </button>
          </div>
        </div>

        <!-- Navigation Row -->
        <div class="remote-control-row">
          ${e.includes("back")?b:g`
            <button class="remote-control-btn" @click=${()=>this._sendRemoteCommand("back")} title="${d("card.remote.back")}">
              <ha-icon icon="mdi:arrow-left"></ha-icon>
            </button>
          `}
          ${e.includes("menu")?b:g`
            <button class="remote-control-btn" @click=${()=>this._sendRemoteCommand("menu")} title="${d("card.remote.menu")}">
              <ha-icon icon="mdi:menu"></ha-icon>
            </button>
          `}
          ${e.includes("home")?b:g`
            <button class="remote-control-btn" @click=${()=>this._sendRemoteCommand("home")} title="${d("card.remote.home")}">
              <ha-icon icon="mdi:home"></ha-icon>
            </button>
          `}
          ${e.includes("power")?b:g`
            <button class="remote-control-btn" @click=${()=>this._onControlClick("power")} title="${d("card.remote.power")}">
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          `}
        </div>
      </div>
    `}_openSourceList(){this._showEntityOptions=!0,this._showSourceList=!0,this._showGrouping=!1,this.requestUpdate()}_closeSourceList(){this._showSourceList=!1,this.requestUpdate()}_closeGrouping(){this._showGrouping=!1}async _toggleGroup(e){const t=this._getGroupingMasterId(),i=t?this.entityIds.indexOf(t):-1,s=i>=0?this.entityObjs[i]:null;if(!s)return;const r=await this._resolveGroupingEntityId(s,t);if(!r)return;const n=this.entityObjs.find(c=>c.entity_id===e);if(!n)return;const o=await this._resolveGroupingEntityId(n,e);if(!o)return;const l=r?this.hass.states[r]:null;Array.isArray(l?.attributes?.group_members)&&l.attributes.group_members.includes(o)?await this.hass.callService("media_player","unjoin",{entity_id:o}):await this.hass.callService("media_player","join",{entity_id:r,group_members:[o]}),this._lastGroupingMasterId=t||e}static getConfigElement(){return document.createElement("yet-another-media-player-editor")}static getStubConfig(e,t){return{entities:(t||[]).filter(i=>i.startsWith("media_player.")).slice(0,2),disable_mass_queue:!1}}async _groupAll(){const e=this._getGroupingMasterId(),t=e?this.entityIds.indexOf(e):-1,i=t>=0?this.entityObjs[t]:null;if(!i)return;const s=await this._resolveGroupingEntityId(i,e);if(!s)return;const r=this.hass.states[s];if(!this._isGroupCapable(r))return;const n=Array.isArray(r.attributes?.group_members)?r.attributes.group_members:[],o=[];for(const l of this.entityIds){if(l===e)continue;const c=this.entityObjs.find(p=>p.entity_id===l);if(!c)continue;const u=await this._resolveGroupingEntityId(c,l);if(!u)continue;const h=this.hass.states[u];this._isGroupCapable(h)&&!n.includes(u)&&o.push(u)}o.length>0&&await this.hass.callService("media_player","join",{entity_id:s,group_members:o}),this._lastGroupingMasterId=e||this.currentEntityId}async _ungroupAll(){const e=this._getGroupingMasterId(),t=e?this.entityIds.indexOf(e):-1,i=t>=0?this.entityObjs[t]:null;if(!i)return;const s=await this._resolveGroupingEntityId(i,e);if(!s)return;const r=this.hass.states[s];if(!this._isGroupCapable(r))return;const n=(Array.isArray(r.attributes?.group_members)?r.attributes.group_members:[]).filter(o=>{const l=this.hass.states[o];return this._isGroupCapable(l)});for(const o of n)await this.hass.callService("media_player","unjoin",{entity_id:o});this._lastGroupingMasterId=e||this.currentEntityId}_syncGroupVolume(){const e=this._getGroupingMasterId();if(!e)return;const t=this.entityIds.indexOf(e);if(t===-1)return;const i=this._getGroupingEntityId(t),s=i?this.hass.states[i]:null;if(!s||!this._isGroupCapable(s))return;const r=this._getVolumeEntity(t)||i,n=this.hass.states[r],o=Number(n?.attributes?.volume_level);if(isNaN(o))return;const l=Array.isArray(s.attributes.group_members)?s.attributes.group_members:[],c=new Map;this.entityObjs.forEach((u,h)=>{c.set(this._getGroupingEntityId(h),h)});for(const u of l){if(u===i)continue;const h=c.get(u);if(h!==void 0){const p=this._getVolumeEntity(h)||u;this.hass.callService("media_player","volume_set",{entity_id:p,volume_level:o})}else this.hass.callService("media_player","volume_set",{entity_id:u,volume_level:o})}}_getResolvedEntitiesForCurrentChip(){const e=new Set,t=this._selectedIndex,i=this.entityObjs[t];if(!i)return[];e.add(i.entity_id);const s=this._getActualResolvedMaEntityForState(t);s&&s!==i.entity_id&&e.add(s);const r=this._getVolumeEntity(t);return r&&r!==i.entity_id&&r!==s&&e.add(r),Array.from(e)}_openMoreInfoForEntity(e){this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_handleSelectEntityFromHelper(){if(!this.hass||!this.config?.actions)return;this._lastSelectEntityValues||(this._lastSelectEntityValues=new Map);const e=this.config.actions.filter(t=>t.action==="select_entity"&&t.sync_entity_helper);if(e.length!==0)for(const t of e){const i=t.sync_entity_helper,s=t.sync_entity_type||"yamp_entity",r=this.hass.states[i]?.state;if(!r||r==="unknown"||r==="unavailable")continue;const n=`${i}-${s}`;if(this._lastSelectEntityValues.get(n)===r)continue;this._lastSelectEntityValues.set(n,r);let o=-1;for(let l=0;l<this.entityIds.length;l++){let c;if(s==="yamp_main_entity"?c=this.entityIds[l]:s==="yamp_playback_entity"?c=this._getActivePlaybackEntityId(l):c=this._getActualResolvedMaEntityForState(l)||this.entityIds[l],c===r){o=l;break}}o>=0&&o!==this._selectedIndex&&this._onChipClick(o)}}_updateSelectedEntityHelper(){if(!this.hass||!this.config?.actions)return;const e=this._selectedIndex;if(e==null||!this.entityObjs[e])return;this._lastSyncedActionValues||(this._lastSyncedActionValues=new Map);const t=this.config.actions.filter(i=>i.action==="sync_selected_entity"&&i.sync_entity_helper);if(t.length!==0)for(const i of t){const s=i.sync_entity_helper,r=i.sync_entity_type||"yamp_entity";let n;if(r==="yamp_main_entity"?n=this.entityIds[e]:r==="yamp_playback_entity"?n=this._getActivePlaybackEntityId(e):n=this._getActualResolvedMaEntityForState(e)||this.entityIds[e],!n)continue;const o=`${s}-${r}`;this._lastSyncedActionValues.get(o)!==n&&(this.hass.states[s]?.state!==n&&this.hass.callService("input_text","set_value",{entity_id:s,value:n}),this._lastSyncedActionValues.set(o,n))}}}zt(pr,"properties",{_aspectRatioCache:{state:!0},_quickGroupingMode:{state:!0},hass:{},config:{},_selectedIndex:{state:!0},_lastPlaying:{state:!0},_shouldDropdownOpenUp:{state:!0},_pinnedIndex:{state:!0},_showSourceList:{state:!0},_holdToPin:{state:!0},_showQueueSuccessMessage:{state:!0},_searchActiveOptionsItem:{state:!0},_activeSearchRowMenuId:{state:!0},_loadingSearchRowMenuId:{state:!0},_errorSearchRowMenuId:{state:!0},_successSearchRowMenuId:{state:!0},_successSearchRowType:{state:!0},_radioModeActive:{state:!0},_showEntityOptions:{state:!0},_showGrouping:{state:!0},_showRemoteControl:{state:!0},_showTransferQueue:{state:!0},_queueOpsTotal:{state:!0},_queueOpsCompleted:{state:!0},_showResolvedEntities:{state:!0},_showSearchInSheet:{state:!0},_addToPlaylistTarget:{state:!0},_showMediaTitleOptions:{state:!0},_dismissMenuAfterPlaylistAdd:{state:!1},_lyricsActive:{state:!0},_massLyrics:{state:!0},_fetchingLyrics:{state:!0},_lyricsError:{state:!0},_lastLyricsTrackId:{state:!0},_lastLyricsEntityId:{state:!0},_showSourceMenu:{state:!0},_volumeDraggingEntity:{state:!0},_dragVolume:{state:!0},_mediaSessionOverride:{state:!0}}),zt(pr,"styles",zd),customElements.define("yet-another-media-player",pr);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ul{constructor(e){this._map=new Map,this._roundAverageSize=!1,this.totalSize=0,e?.roundAverageSize===!0&&(this._roundAverageSize=!0)}set(e,t){const i=this._map.get(e)||0;this._map.set(e,t),this.totalSize+=t-i}get averageSize(){if(this._map.size>0){const e=this.totalSize/this._map.size;return this._roundAverageSize?Math.round(e):e}return 0}getSize(e){return this._map.get(e)}clear(){this._map.clear(),this.totalSize=0}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function hl(a){return a==="horizontal"?"marginLeft":"marginTop"}function D_(a){return a==="horizontal"?"marginRight":"marginBottom"}function R_(a){return a==="horizontal"?"xOffset":"yOffset"}function O_(a,e){const t=[a,e].sort();return t[1]<=0?Math.min(...t):t[0]>=0?Math.max(...t):t[0]+t[1]}class L_{constructor(){this._childSizeCache=new ul,this._marginSizeCache=new ul,this._metricsCache=new Map}update(e,t){const i=new Set;Object.keys(e).forEach(s=>{const r=Number(s);this._metricsCache.set(r,e[r]),this._childSizeCache.set(r,e[r][Ot(t)]),i.add(r),i.add(r+1)});for(const s of i){const r=this._metricsCache.get(s)?.[hl(t)]||0,n=this._metricsCache.get(s-1)?.[D_(t)]||0;this._marginSizeCache.set(s,O_(r,n))}}get averageChildSize(){return this._childSizeCache.averageSize}get totalChildSize(){return this._childSizeCache.totalSize}get averageMarginSize(){return this._marginSizeCache.averageSize}get totalMarginSize(){return this._marginSizeCache.totalSize}getLeadingMarginValue(e,t){return this._metricsCache.get(e)?.[hl(t)]||0}getChildSize(e){return this._childSizeCache.getSize(e)}getMarginSize(e){return this._marginSizeCache.getSize(e)}clear(){this._childSizeCache.clear(),this._marginSizeCache.clear(),this._metricsCache.clear()}}class q_ extends hn{constructor(){super(...arguments),this._itemSize={width:100,height:100},this._physicalItems=new Map,this._newPhysicalItems=new Map,this._metricsCache=new L_,this._anchorIdx=null,this._anchorPos=null,this._stable=!0,this._measureChildren=!0,this._estimate=!0}get measureChildren(){return this._measureChildren}updateItemSizes(e){this._metricsCache.update(e,this.direction),this._scheduleReflow()}_getPhysicalItem(e){return this._newPhysicalItems.get(e)??this._physicalItems.get(e)}_getSize(e){return this._getPhysicalItem(e)&&this._metricsCache.getChildSize(e)}_getAverageSize(){return this._metricsCache.averageChildSize||this._itemSize[this._sizeDim]}_estimatePosition(e){const t=this._metricsCache;if(this._first===-1||this._last===-1)return t.averageMarginSize+e*(t.averageMarginSize+this._getAverageSize());if(e<this._first){const i=this._first-e;return this._getPhysicalItem(this._first).pos-(t.getMarginSize(this._first-1)||t.averageMarginSize)-(i*t.averageChildSize+(i-1)*t.averageMarginSize)}else{const i=e-this._last;return this._getPhysicalItem(this._last).pos+(t.getChildSize(this._last)||t.averageChildSize)+(t.getMarginSize(this._last)||t.averageMarginSize)+i*(t.averageChildSize+t.averageMarginSize)}}_getPosition(e){const t=this._getPhysicalItem(e),{averageMarginSize:i}=this._metricsCache;return e===0?this._metricsCache.getMarginSize(0)??i:t?t.pos:this._estimatePosition(e)}_calculateAnchor(e,t){return e<=0?0:t>this._scrollSize-this._viewDim1?this.items.length-1:Math.max(0,Math.min(this.items.length-1,Math.floor((e+t)/2/this._delta)))}_getAnchor(e,t){if(this._physicalItems.size===0)return this._calculateAnchor(e,t);if(this._first<0)return this._calculateAnchor(e,t);if(this._last<0)return this._calculateAnchor(e,t);const i=this._getPhysicalItem(this._first),s=this._getPhysicalItem(this._last),r=i.pos;if(s.pos+this._metricsCache.getChildSize(this._last)<e)return this._calculateAnchor(e,t);if(r>t)return this._calculateAnchor(e,t);let l=this._firstVisible-1,c=-1/0;for(;c<e;)c=this._getPhysicalItem(++l).pos+this._metricsCache.getChildSize(l);return l}_getActiveItems(){this._viewDim1===0||this.items.length===0?this._clearItems():this._getItems()}_clearItems(){this._first=-1,this._last=-1,this._physicalMin=0,this._physicalMax=0;const e=this._newPhysicalItems;this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e,this._stable=!0}_getItems(){const e=this._newPhysicalItems;this._stable=!0;let t,i;if(this.pin!==null){const{index:c}=this.pin;this._anchorIdx=c,this._anchorPos=this._getPosition(c)}if(t=this._scrollPosition-this._overhang,i=this._scrollPosition+this._viewDim1+this._overhang,i<0||t>this._scrollSize){this._clearItems();return}(this._anchorIdx===null||this._anchorPos===null)&&(this._anchorIdx=this._getAnchor(t,i),this._anchorPos=this._getPosition(this._anchorIdx));let s=this._getSize(this._anchorIdx);s===void 0&&(this._stable=!1,s=this._getAverageSize());const r=this._metricsCache.getMarginSize(this._anchorIdx)??this._metricsCache.averageMarginSize,n=this._metricsCache.getMarginSize(this._anchorIdx+1)??this._metricsCache.averageMarginSize;this._anchorIdx===0&&(this._anchorPos=r),this._anchorIdx===this.items.length-1&&(this._anchorPos=this._scrollSize-n-s);let o=0;for(this._anchorPos+s+n<t&&(o=t-(this._anchorPos+s+n)),this._anchorPos-r>i&&(o=i-(this._anchorPos-r)),o&&(this._scrollPosition-=o,t-=o,i-=o,this._scrollError+=o),e.set(this._anchorIdx,{pos:this._anchorPos,size:s}),this._first=this._last=this._anchorIdx,this._physicalMin=this._anchorPos-r,this._physicalMax=this._anchorPos+s+n;this._physicalMin>t&&this._first>0;){let c=this._getSize(--this._first);c===void 0&&(this._stable=!1,c=this._getAverageSize());let u=this._metricsCache.getMarginSize(this._first);u===void 0&&(this._stable=!1,u=this._metricsCache.averageMarginSize),this._physicalMin-=c;const h=this._physicalMin;if(e.set(this._first,{pos:h,size:c}),this._physicalMin-=u,this._stable===!1&&this._estimate===!1)break}for(;this._physicalMax<i&&this._last<this.items.length-1;){let c=this._getSize(++this._last);c===void 0&&(this._stable=!1,c=this._getAverageSize());let u=this._metricsCache.getMarginSize(this._last);u===void 0&&(this._stable=!1,u=this._metricsCache.averageMarginSize);const h=this._physicalMax;if(e.set(this._last,{pos:h,size:c}),this._physicalMax+=c+u,!this._stable&&!this._estimate)break}const l=this._calculateError();l&&(this._physicalMin-=l,this._physicalMax-=l,this._anchorPos-=l,this._scrollPosition-=l,e.forEach(c=>c.pos-=l),this._scrollError+=l),this._stable&&(this._newPhysicalItems=this._physicalItems,this._newPhysicalItems.clear(),this._physicalItems=e)}_calculateError(){return this._first===0?this._physicalMin:this._physicalMin<=0?this._physicalMin-this._first*this._delta:this._last===this.items.length-1?this._physicalMax-this._scrollSize:this._physicalMax>=this._scrollSize?this._physicalMax-this._scrollSize+(this.items.length-1-this._last)*this._delta:0}_reflow(){const{_first:e,_last:t}=this;super._reflow(),(this._first===-1&&this._last==-1||this._first===e&&this._last===t)&&this._resetReflowState()}_resetReflowState(){this._anchorIdx=null,this._anchorPos=null,this._stable=!0}_updateScrollSize(){const{averageMarginSize:e}=this._metricsCache;this._scrollSize=Math.max(1,this.items.length*(e+this._getAverageSize())+e)}get _delta(){const{averageMarginSize:e}=this._metricsCache;return this._getAverageSize()+e}_getItemPosition(e){return{[this._positionDim]:this._getPosition(e),[this._secondaryPositionDim]:0,[R_(this.direction)]:-(this._metricsCache.getLeadingMarginValue(e,this.direction)??this._metricsCache.averageMarginSize)}}_getItemSize(e){return{[this._sizeDim]:this._getSize(e)||this._getAverageSize(),[this._secondarySizeDim]:this._itemSize[this._secondarySizeDim]}}_viewDim2Changed(){this._metricsCache.clear(),this._scheduleReflow()}}var N_=Object.freeze({__proto__:null,FlowLayout:q_});
