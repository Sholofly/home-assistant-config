/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}var e=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,i="[^\\s]+",s=/\[([^]*?)\]/gm;function r(t,e){for(var i=[],s=0,r=t.length;s<r;s++)i.push(t[s].substr(0,e));return i}var o=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})).indexOf(e.toLowerCase());return s>-1?s:null}};function n(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,r=e;s<r.length;s++){var o=r[s];for(var n in o)t[n]=o[n]}return t}var a=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],d=["January","February","March","April","May","June","July","August","September","October","November","December"],h=r(d,3),l={dayNamesShort:r(a,3),dayNames:a,monthNamesShort:h,monthNames:d,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},c=n({},l),u=function(t,e){for(void 0===e&&(e=2),t=String(t);t.length<e;)t="0"+t;return t},p={D:function(t){return String(t.getDate())},DD:function(t){return u(t.getDate())},Do:function(t,e){return e.DoFn(t.getDate())},d:function(t){return String(t.getDay())},dd:function(t){return u(t.getDay())},ddd:function(t,e){return e.dayNamesShort[t.getDay()]},dddd:function(t,e){return e.dayNames[t.getDay()]},M:function(t){return String(t.getMonth()+1)},MM:function(t){return u(t.getMonth()+1)},MMM:function(t,e){return e.monthNamesShort[t.getMonth()]},MMMM:function(t,e){return e.monthNames[t.getMonth()]},YY:function(t){return u(String(t.getFullYear()),4).substr(2)},YYYY:function(t){return u(t.getFullYear(),4)},h:function(t){return String(t.getHours()%12||12)},hh:function(t){return u(t.getHours()%12||12)},H:function(t){return String(t.getHours())},HH:function(t){return u(t.getHours())},m:function(t){return String(t.getMinutes())},mm:function(t){return u(t.getMinutes())},s:function(t){return String(t.getSeconds())},ss:function(t){return u(t.getSeconds())},S:function(t){return String(Math.round(t.getMilliseconds()/100))},SS:function(t){return u(Math.round(t.getMilliseconds()/10),2)},SSS:function(t){return u(t.getMilliseconds(),3)},a:function(t,e){return t.getHours()<12?e.amPm[0]:e.amPm[1]},A:function(t,e){return t.getHours()<12?e.amPm[0].toUpperCase():e.amPm[1].toUpperCase()},ZZ:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+u(100*Math.floor(Math.abs(e)/60)+Math.abs(e)%60,4)},Z:function(t){var e=t.getTimezoneOffset();return(e>0?"-":"+")+u(Math.floor(Math.abs(e)/60),2)+":"+u(Math.abs(e)%60,2)}},g=function(t){return+t-1},m=[null,"[1-9]\\d?"],y=[null,i],f=["isPm",i,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],v=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}],_=(o("monthNamesShort"),o("monthNames"),{default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",isoDate:"YYYY-MM-DD",isoDateTime:"YYYY-MM-DDTHH:mm:ssZ",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"});var b=function(t,i,r){if(void 0===i&&(i=_.default),void 0===r&&(r={}),"number"==typeof t&&(t=new Date(t)),"[object Date]"!==Object.prototype.toString.call(t)||isNaN(t.getTime()))throw new Error("Invalid Date pass to format");var o=[];i=(i=_[i]||i).replace(s,(function(t,e){return o.push(e),"@@@"}));var a=n(n({},c),r);return(i=i.replace(e,(function(e){return p[e](t,a)}))).replace(/@@@/g,(function(){return o.shift()}))},w=(function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}(),function(t){return"function"==typeof t.getCardSize?t.getCardSize():4});var S=function(t,e,i,s){s=s||{},i=null==i?{}:i;var r=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,t.dispatchEvent(r),r
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */};const x="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,P=(t,e,i=null,s=null)=>{for(;e!==i;){const i=e.nextSibling;t.insertBefore(e,s),e=i}},M=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},C=`{{lit-${String(Math.random()).slice(2)}}}`,z=`\x3c!--${C}--\x3e`,N=new RegExp(`${C}|${z}`);class H{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],r=document.createTreeWalker(e.content,133,null,!1);let o=0,n=-1,a=0;const{strings:d,values:{length:h}}=t;for(;a<h;){const t=r.nextNode();if(null!==t){if(n++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)k(e[t].name,"$lit$")&&s++;for(;s-- >0;){const e=d[a],i=T.exec(e)[2],s=i.toLowerCase()+"$lit$",r=t.getAttribute(s);t.removeAttribute(s);const o=r.split(N);this.parts.push({type:"attribute",index:n,name:i,strings:o}),a+=o.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),r.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(C)>=0){const s=t.parentNode,r=e.split(N),o=r.length-1;for(let e=0;e<o;e++){let i,o=r[e];if(""===o)i=$();else{const t=T.exec(o);null!==t&&k(t[2],"$lit$")&&(o=o.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),i=document.createTextNode(o)}s.insertBefore(i,t),this.parts.push({type:"node",index:++n})}""===r[o]?(s.insertBefore($(),t),i.push(t)):t.data=r[o],a+=o}}else if(8===t.nodeType)if(t.data===C){const e=t.parentNode;null!==t.previousSibling&&n!==o||(n++,e.insertBefore($(),t)),o=n,this.parts.push({type:"node",index:n}),null===t.nextSibling?t.data="":(i.push(t),n--),a++}else{let e=-1;for(;-1!==(e=t.data.indexOf(C,e+1));)this.parts.push({type:"node",index:-1}),a++}}else r.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const k=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},E=t=>-1!==t.index,$=()=>document.createComment(""),T=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function D(t,e){const{element:{content:i},parts:s}=t,r=document.createTreeWalker(i,133,null,!1);let o=O(s),n=s[o],a=-1,d=0;const h=[];let l=null;for(;r.nextNode();){a++;const t=r.currentNode;for(t.previousSibling===l&&(l=null),e.has(t)&&(h.push(t),null===l&&(l=t)),null!==l&&d++;void 0!==n&&n.index===a;)n.index=null!==l?-1:n.index-d,o=O(s,o),n=s[o]}h.forEach(t=>t.parentNode.removeChild(t))}const Y=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,133,null,!1);for(;i.nextNode();)e++;return e},O=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(E(e))return i}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const R=new WeakMap,L=t=>(...e)=>{const i=t(...e);return R.set(i,!0),i},A=t=>"function"==typeof t&&R.has(t),V={},X={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class W{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=x?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,s=document.createTreeWalker(t,133,null,!1);let r,o=0,n=0,a=s.nextNode();for(;o<i.length;)if(r=i[o],E(r)){for(;n<r.index;)n++,"TEMPLATE"===a.nodeName&&(e.push(a),s.currentNode=a.content),null===(a=s.nextNode())&&(s.currentNode=e.pop(),a=s.nextNode());if("node"===r.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(a,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return x&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const j=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:t=>t}),I=` ${C} `;class U{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],r=t.lastIndexOf("\x3c!--");i=(r>-1||i)&&-1===t.indexOf("--\x3e",r+1);const o=T.exec(t);e+=null===o?t+(i?I:z):t.substr(0,o.index)+o[1]+o[2]+"$lit$"+o[3]+C}return e+=this.strings[t],e}getTemplateElement(){const t=document.createElement("template");let e=this.getHTML();return void 0!==j&&(e=j.createHTML(e)),t.innerHTML=e,t}}class B extends U{getHTML(){return`<svg>${super.getHTML()}</svg>`}getTemplateElement(){const t=super.getTemplateElement(),e=t.content,i=e.firstChild;return e.removeChild(i),P(e,i.firstChild),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const F=t=>null===t||!("object"==typeof t||"function"==typeof t),q=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class Z{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new J(this)}_getValue(){const t=this.strings,e=t.length-1,i=this.parts;if(1===e&&""===t[0]&&""===t[1]){const t=i[0].value;if("symbol"==typeof t)return String(t);if("string"==typeof t||!q(t))return t}let s="";for(let r=0;r<e;r++){s+=t[r];const e=i[r];if(void 0!==e){const t=e.value;if(F(t)||!q(t))s+="string"==typeof t?t:String(t);else for(const e of t)s+="string"==typeof e?e:String(e)}}return s+=t[e],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class J{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===V||F(t)&&t===this.value||(this.value=t,A(t)||(this.committer.dirty=!0))}commit(){for(;A(this.value);){const t=this.value;this.value=V,t(this)}this.value!==V&&this.committer.commit()}}class G{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild($()),this.endNode=t.appendChild($())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=$()),t.__insert(this.endNode=$())}insertAfterPart(t){t.__insert(this.startNode=$()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){if(null===this.startNode.parentNode)return;for(;A(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=V,t(this)}const t=this.__pendingValue;t!==V&&(F(t)?t!==this.value&&this.__commitText(t):t instanceof U?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):q(t)?this.__commitIterable(t):t===X?(this.value=X,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling,i="string"==typeof(t=null==t?"":t)?t:String(t);e===this.endNode.previousSibling&&3===e.nodeType?e.data=i:this.__commitNode(document.createTextNode(i)),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof W&&this.value.template===e)this.value.update(t.values);else{const i=new W(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const r of t)i=e[s],void 0===i&&(i=new G(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(r),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){M(this.startNode.parentNode,t.nextSibling,this.endNode)}}class K{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;A(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=V,t(this)}if(this.__pendingValue===V)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=V}}class Q extends Z{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new tt(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class tt extends J{}let et=!1;(()=>{try{const t={get capture(){return et=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class it{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=t=>this.handleEvent(t)}setValue(t){this.__pendingValue=t}commit(){for(;A(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=V,t(this)}if(this.__pendingValue===V)return;const t=this.__pendingValue,e=this.value,i=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),s=null!=t&&(null==e||i);i&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=st(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=V}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const st=t=>t&&(et?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function rt(t){let e=ot.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},ot.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(C);return i=e.keyString.get(s),void 0===i&&(i=new H(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const ot=new Map,nt=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const at=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,e,i,s){const r=e[0];if("."===r){return new Q(t,e.slice(1),i).parts}if("@"===r)return[new it(t,e.slice(1),s.eventContext)];if("?"===r)return[new K(t,e.slice(1),i)];return new Z(t,e,i).parts}handleTextExpression(t){return new G(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.3.0");const dt=(t,...e)=>new U(t,e,"html",at),ht=(t,...e)=>new B(t,e,"svg",at)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,lt=(t,e)=>`${t}--${e}`;let ct=!0;void 0===window.ShadyCSS?ct=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),ct=!1);const ut=t=>e=>{const i=lt(e.type,t);let s=ot.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},ot.set(i,s));let r=s.stringsArray.get(e.strings);if(void 0!==r)return r;const o=e.strings.join(C);if(r=s.keyString.get(o),void 0===r){const i=e.getTemplateElement();ct&&window.ShadyCSS.prepareTemplateDom(i,t),r=new H(e,i),s.keyString.set(o,r)}return s.stringsArray.set(e.strings,r),r},pt=["html","svg"],gt=new Set,mt=(t,e,i)=>{gt.add(t);const s=i?i.element:document.createElement("template"),r=e.querySelectorAll("style"),{length:o}=r;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(s,t);const n=document.createElement("style");for(let t=0;t<o;t++){const e=r[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}(t=>{pt.forEach(e=>{const i=ot.get(lt(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),D(t,i)})})})(t);const a=s.content;i?function(t,e,i=null){const{element:{content:s},parts:r}=t;if(null==i)return void s.appendChild(e);const o=document.createTreeWalker(s,133,null,!1);let n=O(r),a=0,d=-1;for(;o.nextNode();){d++;for(o.currentNode===i&&(a=Y(e),i.parentNode.insertBefore(e,i));-1!==n&&r[n].index===d;){if(a>0){for(;-1!==n;)r[n].index+=a,n=O(r,n);return}n=O(r,n)}}}(i,n,a.firstChild):a.insertBefore(n,a.firstChild),window.ShadyCSS.prepareTemplateStyles(s,t);const d=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)e.insertBefore(d.cloneNode(!0),e.firstChild);else if(i){a.insertBefore(n,a.firstChild);const t=new Set;t.add(n),D(i,t)}};window.JSCompiler_renameProperty=(t,e)=>t;const yt={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},ft=(t,e)=>e!==t&&(e==e||t==t),vt={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:ft};class _t extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=vt){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdateInternal(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||vt}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=ft){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||yt,r="function"==typeof s?s:s.fromAttribute;return r?r(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||yt.toAttribute)(t,i)}initialize(){this._updateState=0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=vt){const s=this.constructor,r=s._attributeNameForProperty(t,i);if(void 0!==r){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(r):this.setAttribute(r,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,e){if(8&this._updateState)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=-17&this._updateState}}requestUpdateInternal(t,e,i){let s=!0;if(void 0!==t){const r=this.constructor;i=i||r.getPropertyOptions(t),r._valueHasChanged(this[t],e,i.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==i.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,i))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,e){return this.requestUpdateInternal(t,e),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{t=this.shouldUpdate(e),t?this.update(e):this._markUpdated()}catch(e){throw t=!1,this._markUpdated(),e}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}_t.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const bt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),wt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?Object.assign(Object.assign({},e),{finisher(i){i.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function St(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):wt(t,e)}function xt(t){return St({attribute:!1,hasChanged:null==t?void 0:t.hasChanged})}const Pt=(t,e,i)=>{Object.defineProperty(e,i,t)},Mt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),Ct=Element.prototype,zt=Ct.msMatchesSelector||Ct.webkitMatchesSelector;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
const Nt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ht=Symbol();class kt{constructor(t,e){if(e!==Ht)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(Nt?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const Et=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof kt)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new kt(i,Ht)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.4.0");const $t={};class Tt extends _t{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(Array.isArray(t)){const e=(t,i)=>t.reduceRight((t,i)=>Array.isArray(i)?e(i,t):(t.add(i),t),i),i=e(t,new Set),s=[];i.forEach(t=>s.unshift(t)),this._styles=s}else this._styles=void 0===t?[]:[t];this._styles=this._styles.map(t=>{if(t instanceof CSSStyleSheet&&!Nt){const e=Array.prototype.slice.call(t.cssRules).reduce((t,e)=>t+e.cssText,"");return new kt(String(e),Ht)}return t})}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?Nt?this.renderRoot.adoptedStyleSheets=t.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const e=this.render();super.update(t),e!==$t&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){return $t}}function Dt(t){if(!t||"object"!=typeof t)return t;if("[object Date]"==Object.prototype.toString.call(t))return new Date(t.getTime());if(Array.isArray(t))return t.map(Dt);var e={};return Object.keys(t).forEach((function(i){e[i]=Dt(t[i])})),e}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */Tt.finalized=!0,Tt.render=(t,e,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const s=i.scopeName,r=nt.has(e),o=ct&&11===e.nodeType&&!!e.host,n=o&&!gt.has(s),a=n?document.createDocumentFragment():e;if(((t,e,i)=>{let s=nt.get(e);void 0===s&&(M(e,e.firstChild),nt.set(e,s=new G(Object.assign({templateFactory:rt},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,a,Object.assign({templateFactory:ut(s)},i)),n){const t=nt.get(a);nt.delete(a);const i=t.value instanceof W?t.value.template:void 0;mt(s,a,i),M(e,e.firstChild),e.appendChild(a),nt.set(e,t)}!r&&o&&window.ShadyCSS.styleElement(e.host)};const Yt=(t,e)=>{const i=t.startNode.parentNode,s=void 0===e?t.endNode:e.startNode,r=i.insertBefore($(),s);i.insertBefore($(),s);const o=new G(t.options);return o.insertAfterNode(r),o},Ot=(t,e)=>(t.setValue(e),t.commit(),t),Rt=(t,e,i)=>{const s=t.startNode.parentNode,r=i?i.startNode:t.endNode,o=e.endNode.nextSibling;o!==r&&P(s,e.startNode,o,r)},Lt=t=>{M(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},At=(t,e,i)=>{const s=new Map;for(let r=e;r<=i;r++)s.set(t[r],r);return s},Vt=new WeakMap,Xt=new WeakMap,Wt=L((t,e,i)=>{let s;return void 0===i?i=e:void 0!==e&&(s=e),e=>{if(!(e instanceof G))throw new Error("repeat can only be used in text bindings");const r=Vt.get(e)||[],o=Xt.get(e)||[],n=[],a=[],d=[];let h,l,c=0;for(const e of t)d[c]=s?s(e,c):c,a[c]=i(e,c),c++;let u=0,p=r.length-1,g=0,m=a.length-1;for(;u<=p&&g<=m;)if(null===r[u])u++;else if(null===r[p])p--;else if(o[u]===d[g])n[g]=Ot(r[u],a[g]),u++,g++;else if(o[p]===d[m])n[m]=Ot(r[p],a[m]),p--,m--;else if(o[u]===d[m])n[m]=Ot(r[u],a[m]),Rt(e,r[u],n[m+1]),u++,m--;else if(o[p]===d[g])n[g]=Ot(r[p],a[g]),Rt(e,r[p],r[u]),p--,g++;else if(void 0===h&&(h=At(d,g,m),l=At(o,u,p)),h.has(o[u]))if(h.has(o[p])){const t=l.get(d[g]),i=void 0!==t?r[t]:null;if(null===i){const t=Yt(e,r[u]);Ot(t,a[g]),n[g]=t}else n[g]=Ot(i,a[g]),Rt(e,i,r[u]),r[t]=null;g++}else Lt(r[p]),p--;else Lt(r[u]),u++;for(;g<=m;){const t=Yt(e,n[m+1]);Ot(t,a[g]),n[g++]=t}for(;u<=p;){const t=r[u++];null!==t&&Lt(t)}Vt.set(e,n),Xt.set(e,d)}});
/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class jt{constructor(t){this.classes=new Set,this.changed=!1,this.element=t;const e=(t.getAttribute("class")||"").split(/\s+/);for(const t of e)this.classes.add(t)}add(t){this.classes.add(t),this.changed=!0}remove(t){this.classes.delete(t),this.changed=!0}commit(){if(this.changed){let t="";this.classes.forEach(e=>t+=e+" "),this.element.setAttribute("class",t)}}}const It=new WeakMap,Ut=L(t=>e=>{if(!(e instanceof J)||e instanceof tt||"class"!==e.committer.name||e.committer.parts.length>1)throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");const{committer:i}=e,{element:s}=i;let r=It.get(e);void 0===r&&(s.setAttribute("class",i.strings.join(" ")),It.set(e,r=new Set));const o=s.classList||new jt(s);r.forEach(e=>{e in t||(o.remove(e),r.delete(e))});for(const e in t){const i=t[e];i!=r.has(e)&&(i?(o.add(e),r.add(e)):(o.remove(e),r.delete(e)))}"function"==typeof o.commit&&o.commit()}),Bt=(t,e,i={})=>{t.dispatchEvent(new CustomEvent(e,{detail:i}))},Ft=(t,e)=>{if(t.type.startsWith("touch")){if(void 0===e)return;const i=qt(t,e);return{x:i.x,y:i.y}}return{x:t.clientX,y:t.clientY}},qt=(t,e)=>{const i=t.targetTouches&&Array.prototype.find.call(t.targetTouches,t=>e===t.identifier)||t.changedTouches&&Array.prototype.find.call(t.changedTouches,t=>e===t.identifier);return{x:i.clientX,y:i.clientY}};let Zt="";const Jt=(t,e)=>(Zt||(Zt=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].find(e=>Gt(t[e]))),!(!Zt||!Gt(t[Zt]))&&t[Zt](e)),Gt=t=>"function"==typeof t||"[object Function]"===Object.prototype.toString.call(t);var Kt=function(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let Qt=class extends Tt{constructor(){super(...arguments),this.disabled=!1,this._dragging=!1}firstUpdated(){this.addEventListener("mousedown",this._dragStart.bind(this),{capture:!0,passive:!1}),this.addEventListener("touchstart",this._dragStart.bind(this),{capture:!0,passive:!1}),document.addEventListener("mousemove",this._drag.bind(this),{capture:!0,passive:!1}),document.addEventListener("touchmove",this._drag.bind(this),{capture:!0,passive:!1}),document.addEventListener("mouseup",this._dragEnd.bind(this),{capture:!0,passive:!1}),document.addEventListener("touchcancel",this._dragEnd.bind(this),{capture:!0,passive:!1}),document.addEventListener("touchend",this._dragEnd.bind(this),{capture:!0,passive:!1})}render(){return dt`<slot></slot>`}_dragStart(t){if(t.type.startsWith("mouse")&&0!==t.button||this.disabled)return;if(this.handle&&!((t,e,i)=>{const s=t.composedPath().reverse();for(;s.length;){const t=s.pop();if(Jt(t,e))return!0;if(t===i)return!1}return!1})(t,this.handle,this.offsetParent))return;var e;t.preventDefault(),t.stopPropagation(),"touchstart"===t.type&&(this._touchIdentifier=(e=t).targetTouches&&e.targetTouches[0]?e.targetTouches[0].identifier:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0].identifier:0);const i=Ft(t,this._touchIdentifier);i&&(this.startX=i.x,this.startY=i.y,this._dragging=!0,Bt(this,"dragStart",{startX:this.startX,startY:this.startY}))}_drag(t){if(!this._dragging||this.disabled)return;t.preventDefault(),t.stopPropagation();const e=Ft(t,this._touchIdentifier);if(!e)return;let i=e.x-this.startX,s=e.y-this.startY;this.grid&&(i=Math.round(i/this.grid[0])*this.grid[0],s=Math.round(s/this.grid[1])*this.grid[1]),(i||s)&&Bt(this,"dragging",{deltaX:i,deltaY:s})}_dragEnd(t){this._dragging&&!this.disabled&&(t.preventDefault(),t.stopPropagation(),this._touchIdentifier=void 0,this._dragging=!1,Bt(this,"dragEnd"))}};Kt([St({type:Array})],Qt.prototype,"grid",void 0),Kt([St({type:Boolean,reflect:!0})],Qt.prototype,"disabled",void 0),Kt([St()],Qt.prototype,"handle",void 0),Qt=Kt([bt("lit-draggable")],Qt);var te=function(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let ee=class extends Tt{constructor(){super(...arguments),this.disabled=!1}render(){return dt`
      <slot></slot>

      ${this.disabled?"":dt`
            <lit-draggable
              @dragging=${this._resize}
              @dragStart=${this._resizeStart}
              @dragEnd=${this._resizeEnd}
            >
              ${this.handle?dt`${this.handle}`:ht`
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-tabler-arrows-diagonal-2"
                      viewBox="0 0 24 24"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <polyline points="16 20 20 20 20 16" />
                      <line x1="14" y1="14" x2="20" y2="20" />
                      <polyline points="8 4 4 4 4 8" />
                      <line x1="4" y1="4" x2="10" y2="10" />
                    </svg>
                  `}
            </lit-draggable>
          `}
    `}_resizeStart(t){t.preventDefault(),t.stopPropagation(),this.startWidth=this.clientWidth,this.startHeight=this.clientHeight,Bt(this,"resizeStart")}_resize(t){if(t.preventDefault(),t.stopPropagation(),void 0===this.startWidth||void 0===this.startHeight)return;const{deltaX:e,deltaY:i}=t.detail;if(0===i&&0===e)return;const s=this.startWidth+e,r=this.startHeight+i;Bt(this,"resize",{width:s,height:r,deltaX:e,deltaY:i})}_resizeEnd(t){t.preventDefault(),t.stopPropagation(),this.startWidth=void 0,this.startHeight=void 0,Bt(this,"resizeEnd")}static get styles(){return Et`
      :host {
        position: relative;
        display: block;
      }

      lit-draggable {
        position: absolute;
        left: var(--resize-handle-position-left, unset);
        top: var(--resize-handle-postion-top, unset);
        bottom: var(--resize-handle-position-bottom, 0);
        right: var(--resize-handle-postion-right, 0);
        width: var(--resize-handle-size, 18px);
        height: var(--resize-handle-size, 18px);
        z-index: var(--resize-handle-z-index, 5);
        opacity: var(--resize-handle-opacity, 1);
        user-select: none;
      }

      .icon-tabler-arrows-diagonal-2 {
        width: 100%;
        height: 100%;
        stroke-width: 1.5;
        stroke: #607d8b;
        fill: none;
        stroke-linecap: round;
        stroke-linejoin: round;
        cursor: se-resize;
      }
    `}};te([St({attribute:!1})],ee.prototype,"handle",void 0),te([St({type:Boolean})],ee.prototype,"disabled",void 0),ee=te([bt("lit-resizable")],ee);var ie=function(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let se=class extends Tt{constructor(){super(...arguments),this.minWidth=1,this.minHeight=1,this.isDraggable=!0,this.isResizable=!0,this._isDragging=!1,this._isResizing=!1,this._firstLayoutFinished=!1}updated(t){if(t.has("parentWidth")||t.has("margin")||t.has("columns")||t.has("containerPadding")||t.has("minHeight")||t.has("minWidth")||t.has("maxWidth")||t.has("maxHeight")||t.has("rowHeight")||t.has("posX")||t.has("_isDragging")&&!this._isDragging){this._columnWidth=(this.parentWidth-this.margin[0]*(this.columns-1)-2*this.containerPadding[0])/this.columns,this._fullColumnWidth=this._columnWidth+this.margin[0],this._fullRowHeight=this.rowHeight+this.margin[1],this._minWidthPX=this._fullColumnWidth*this.minWidth-this.margin[0];const t=void 0!==this.maxWidth?Math.min(this.maxWidth,this.columns-this.posX):this.columns-this.posX;this._maxWidthPX=this._fullColumnWidth*t-this.margin[0],this._minHeightPX=this._fullRowHeight*this.minHeight-this.margin[1],this._maxHeightPX=this._fullRowHeight*(this.maxHeight||1/0)-this.margin[1]}this._isDragging||(this._itemLeftPX=Math.round(this.posX*this._fullColumnWidth+this.containerPadding[0]),this._itemTopPX=this.parentWidth?Math.round(this.posY*this._fullRowHeight+this.containerPadding[1]):0,this._isResizing||(this._itemWidthPX=this.width*this._columnWidth+Math.max(0,this.width-1)*this.margin[0],this._itemHeightPX=this.height*this.rowHeight+Math.max(0,this.height-1)*this.margin[1],!this._firstLayoutFinished&&this.parentWidth>0&&setTimeout(()=>this._firstLayoutFinished=!0,200)))}render(){var t;let e=dt`<slot></slot>`;if(this.isDraggable&&(e=dt`
        <lit-draggable
          .handle=${this.dragHandle}
          @dragStart=${this._dragStart}
          @dragging=${this._drag}
          @dragEnd=${this._dragEnd}
        >
          ${e}
        </lit-draggable>
      `),this.isResizable){const i=null===(t=this.resizeHandle)||void 0===t?void 0:t.cloneNode(!0);e=dt`
        <lit-resizable
          .handle=${i}
          @resizeStart=${this._resizeStart}
          @resize=${this._resize}
          @resizeEnd=${this._resizeEnd}
        >
          ${e}
        </lit-resizable>
      `}return dt`
      <div
        class="grid-item-wrapper ${Ut({dragging:this._isDragging,resizing:this._isResizing,finished:this._firstLayoutFinished})}"
        style="transform: translate(${this._itemLeftPX}px, ${this._itemTopPX}px); width: ${this._itemWidthPX}px; height: ${this._itemHeightPX}px"
      >
        ${e}
      </div>
    `}_resizeStart(){this.isDraggable=!1,this._isResizing=!0,this._isDragging=!1,Bt(this,"resizeStart")}_resize(t){if(!this._isResizing)return;let{width:e,height:i}=t.detail;e=Math.max(this._minWidthPX,e),e=Math.min(this._maxWidthPX,e),i=Math.max(this._minHeightPX,i),i=Math.min(this._maxHeightPX,i),this._itemWidthPX=e,this._itemHeightPX=i;const s=Math.round((e+this.margin[0])/this._fullColumnWidth),r=Math.round((i+this.margin[1])/this._fullRowHeight);s===this.width&&r===this.height||Bt(this,"resize",{newWidth:s,newHeight:r})}_resizeEnd(){this.isDraggable=!0,this._isResizing=!1,Bt(this,"resizeEnd")}_dragStart(){if(!this.isDraggable)return;const t=this.gridItem.getBoundingClientRect(),e=this.offsetParent.getBoundingClientRect();this._startLeft=t.left-e.left,this._startTop=t.top-e.top,this._startPosX=this.posX,this._startPosY=this.posY,this._isDragging=!0,Bt(this,"dragStart")}_drag(t){if(void 0===this._startPosX||void 0===this._startPosY||void 0===this._startLeft||void 0===this._startTop||!this.isDraggable)return;const{deltaX:e,deltaY:i}=t.detail;this._itemLeftPX=this._startLeft+e,this._itemTopPX=this._startTop+i;const s=Math.round(e/this._fullColumnWidth),r=Math.round(i/this._fullRowHeight);if(!r&&!s)return;let o=this._startPosX+s,n=this._startPosY+r;o=Math.max(0,o),n=Math.max(0,n),o=Math.min(this.columns-this.width,o),Bt(this,"dragging",{newPosX:o,newPosY:n})}_dragEnd(){this._isDragging=!1,this._startLeft=void 0,this._startTop=void 0,this._startPosX=void 0,this._startPosY=void 0,Bt(this,"dragEnd")}static get styles(){return Et`
      .grid-item-wrapper {
        position: absolute;
        transition: var(--grid-item-transition, all 200ms);
        z-index: 2;
        opacity: 0;
      }

      .grid-item-wrapper.dragging {
        transition: none;
        z-index: 3;
        opacity: var(--grid-item-dragging-opacity, 0.8) !important;
      }

      .grid-item-wrapper.resizing {
        transition-property: transform;
        z-index: 3;
        opacity: var(--grid-item-resizing-opacity, 0.8) !important;
      }

      .grid-item-wrapper.finished {
        opacity: 1;
      }

      :host([placeholder]) .grid-item-wrapper {
        background-color: var(--placeholder-background-color, red);
        opacity: var(--placeholder-background-opacity, 0.2);
        z-index: 1;
      }

      lit-resizable {
        width: 100%;
        height: 100%;
      }
    `}};var re,oe;ie([St({type:Number})],se.prototype,"width",void 0),ie([St({type:Number})],se.prototype,"height",void 0),ie([St({type:Number})],se.prototype,"posX",void 0),ie([St({type:Number})],se.prototype,"posY",void 0),ie([St({type:Number})],se.prototype,"rowHeight",void 0),ie([St({type:Number})],se.prototype,"columns",void 0),ie([St({type:Number})],se.prototype,"parentWidth",void 0),ie([St({type:Array})],se.prototype,"margin",void 0),ie([St({type:Array})],se.prototype,"containerPadding",void 0),ie([St({type:Number})],se.prototype,"minWidth",void 0),ie([St({type:Number})],se.prototype,"minHeight",void 0),ie([St({type:Number})],se.prototype,"maxWidth",void 0),ie([St({type:Number})],se.prototype,"maxHeight",void 0),ie([St({type:Boolean})],se.prototype,"isDraggable",void 0),ie([St({type:Boolean})],se.prototype,"isResizable",void 0),ie([St({type:Boolean})],se.prototype,"_isDragging",void 0),ie([St({type:Boolean})],se.prototype,"_isResizing",void 0),ie([St({type:Boolean})],se.prototype,"_firstLayoutFinished",void 0),ie([St({attribute:!1})],se.prototype,"resizeHandle",void 0),ie([St({attribute:!1})],se.prototype,"dragHandle",void 0),ie([St()],se.prototype,"key",void 0),ie([(re=".grid-item-wrapper",(t,e)=>{const i={get(){return this.renderRoot.querySelector(re)},enumerable:!0,configurable:!0};if(oe){const t="symbol"==typeof e?Symbol():"__"+e;i.get=function(){return void 0===this[t]&&(this[t]=this.renderRoot.querySelector(re)),this[t]}}return void 0!==e?Pt(i,t,e):Mt(i,t)})],se.prototype,"gridItem",void 0),ie([xt()],se.prototype,"_itemTopPX",void 0),ie([xt()],se.prototype,"_itemLeftPX",void 0),ie([xt()],se.prototype,"_itemWidthPX",void 0),ie([xt()],se.prototype,"_itemHeightPX",void 0),se=ie([bt("lit-grid-item")],se);const ne=(t,e)=>t.key!==e.key&&(!(t.posX+t.width<=e.posX)&&(!(t.posX>=e.posX+e.width)&&(!(t.posY+t.height<=e.posY)&&!(t.posY>=e.posY+e.height)))),ae=(t,e)=>{for(const i of t)if(ne(i,e))return i},de=(t,e,i)=>{e.posY+=1;for(let s=t.map(t=>t.key).indexOf(e.key)+1;s<t.length;s++){const r=t[s];if(r.posY>e.posY+e.height)break;ne(e,r)&&de(t,r,i+e.height)}e.posY=i},he=t=>t.slice(0).sort((function(t,e){return t.posY>e.posY||t.posY===e.posY&&t.posX>e.posX?1:t.posY===e.posY&&t.posX===e.posX?0:-1})),le=(t,e,i=!1)=>{let s;return function(...r){const o=this,n=i&&!s;clearTimeout(s),s=setTimeout(()=>{s=null,i||t.apply(o,r)},e),n&&t.apply(o,r)}},ce=(t,e,i)=>{if(1===t.width){const t=Math.min(...e);return{posX:e.indexOf(t),posY:t}}const s=[],r=i+1-t.width;for(let i=0;i<r;i++){const r=e.slice(i,i+t.width);s[i]=Math.max(...r)}const o=Math.min(...s);return{posX:s.indexOf(o),posY:o}},ue=(t,e,i,s,r)=>{if(r){r=!1;const o={posX:i.posX,posY:Math.max(i.height-e.posY,0),width:i.width,height:i.height,key:"-1"};if(!ae(t,o))return pe(t,i,void 0,o.posY,s,r)}return pe(t,i,void 0,i.posY+1,s,r)},pe=(t,e,i,s,r,o)=>{if(e.posY===s&&e.posX===i)return t;const n=e.posY;void 0!==i&&(e.posX=i),void 0!==s&&(e.posY=s),e.hasMoved=!0;let a=he(t);void 0!==s&&n>=s&&(a=a.reverse());const d=((t,e)=>t.filter(t=>ne(t,e)))(a,e),h=t.findIndex(t=>t.key===e.key);t[h]=e;for(let i=0,s=d.length;i<s;i++){const s=d[i];s.hasMoved||(t=ue([...t],e,s,r,o))}return t};var ge=function(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n};let me=class extends Tt{constructor(){super(...arguments),this.sortStyle="masonry",this.margin=[10,10],this.containerPadding=[20,20],this.rowHeight=30,this.columns=12,this.dragDisabled=!1,this.resizeDisabled=!1,this.resizing=!1,this.dragging=!1,this._width=0,this._layout=[]}get _layoutHeight(){const t=(t=>{let e=0;for(const i of t){const t=i.posY+i.height;e=t>e?t:e}return e})(this._layout);return t*this.rowHeight+(t-1)*this.margin[1]+2*this.containerPadding[1]}disconnectedCallback(){this._resizeObserver&&this._resizeObserver.disconnect()}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>this._attachObserver())}updated(t){super.updated(t),t.has("layout")?this._setupLayout():t.has("columns")&&this.layout&&this._updateLayout(Dt(this.layout)),this.style.height=this._layoutHeight+"px"}render(){var t;return(null===(t=this._layout)||void 0===t?void 0:t.length)&&this.itemRenderer?dt`
      ${Wt(this._layout,t=>t.key,t=>t&&this._layout.some(e=>e.key===t.key)?dt`
            <lit-grid-item
              .width=${t.width}
              .height=${t.height}
              .posY=${t.posY}
              .posX=${t.posX}
              .minWidth=${t.minWidth||1}
              .minHeight=${t.minHeight||1}
              .maxWidth=${t.maxHeight}
              .maxHeight=${t.maxHeight}
              .key=${t.key}
              .parentWidth=${this._width}
              .columns=${this.columns}
              .rowHeight=${this.rowHeight}
              .margin=${this.margin}
              .containerPadding=${this.containerPadding}
              .isDraggable=${!this.dragDisabled}
              .isResizable=${!this.resizeDisabled}
              .resizeHandle=${this.resizeHandle}
              .dragHandle=${this.dragHandle}
              @resizeStart=${this._itemResizeStart}
              @resize=${this._itemResize}
              @resizeEnd=${this._itemResizeEnd}
              @dragStart=${this._itemDragStart}
              @dragging=${this._itemDrag}
              @dragEnd=${this._itemDragEnd}
            >
              ${this.itemRenderer(t.key)}
            </lit-grid-item>
          `:X)}
      ${this._renderPlaceHolder()}
    `:dt``}_setupLayout(){if(!this.layout)throw new Error("Missing layout");((t,e)=>t!==e&&(t.length!==e.length||t.some((t,i)=>{const s=e[i],r=Object.keys(t);return r.length!==Object.keys(s).length||r.some(e=>t[e]!==s[e])})))(this.layout,this._layout)&&(this._updateLayout(this.layout,!0),Bt(this,"layout-changed",{layout:this._layout}))}_updateLayout(t,e=!1,i=this.sortStyle){if("masonry"===i)this._layout=((t,e)=>{const i=[],s=he(t),r=new Array(e).fill(0);for(const t of s){t.width>e&&(t.width=e);const s=ce(t,r,e),o=Object.assign(Object.assign({},t),s);i.push(o);for(let e=s.posX;e<s.posX+t.width;e++)r[e]+=t.height}return i})(t,this.columns);else{const i=e?((t,e)=>{for(const i of t)i.width>e&&(i.width=e),i.posX+i.width>e&&(i.posX=e-i.width),i.posX<0&&(i.posX=0);return t})(t,this.columns):t;this._layout=(t=>{const e=[],i=[],s=he(t);for(const r of s){for(;r.posY>0&&!ae(e,r);)r.posY--;let o;for(;o=ae(e,r);)de(s,r,o.posY+o.height);delete r.hasMoved,e.push(r),i[t.indexOf(r)]=r}return i})(i)}}_itemResizeStart(t){this._oldItemIndex=this._layout.findIndex(e=>e.key===t.currentTarget.key),this._placeholder=this._layout[this._oldItemIndex],this._oldItemLayout=this._layout[this._oldItemIndex]}_itemResize(t){if(!this._oldItemLayout||void 0===this._oldItemIndex)return;const{newWidth:e,newHeight:i}=t.detail,s=Object.assign(Object.assign({},this._oldItemLayout),{width:e,height:i});this._layout[this._oldItemIndex]=s,this._placeholder=s,this._updateLayout(this._layout,!1,"default")}_itemResizeEnd(){const t=this._layout.find(t=>{var e;return t.key===(null===(e=this._oldItemLayout)||void 0===e?void 0:e.key)});this.layout&&this._oldItemLayout!==t&&(Bt(this,"item-changed",{item:this._placeholder,layout:this._layout}),this._placeholder=void 0,this._oldItemLayout=void 0,this._oldItemIndex=void 0)}_itemDragStart(t){const e=this._layout.findIndex(e=>e.key===t.currentTarget.key);this._placeholder=this._layout[e],this._oldItemLayout=this._layout.find(e=>e.key===t.currentTarget.key)}_itemDrag(t){if(!this._oldItemLayout)return;t.stopPropagation(),t.preventDefault();const{newPosX:e,newPosY:i}=t.detail;if(this._prevPosX===e&&this._prevPosY===i)return;this._prevPosX=e,this._prevPosY=i;const s=pe([...this._layout],Object.assign({},this._oldItemLayout),e,i,this.columns,!0);this._updateLayout(s,!1,"default"),this._placeholder=this._layout.find(t=>t.key===this._oldItemLayout.key)}_itemDragEnd(){const t=this._layout.find(t=>t.key===this._oldItemLayout.key);this.layout&&this._oldItemLayout!==t&&(Bt(this,"item-changed",{item:this._placeholder,layout:this._layout}),this._placeholder=void 0,this._oldItemLayout=void 0,this._oldItemIndex=void 0)}_renderPlaceHolder(){return this._placeholder?dt`
      <lit-grid-item
        .width=${this._placeholder.width}
        .height=${this._placeholder.height}
        .posY=${this._placeholder.posY}
        .posX=${this._placeholder.posX}
        .key=${this._placeholder.key}
        .parentWidth=${this.clientWidth}
        .columns=${this.columns}
        .rowHeight=${this.rowHeight}
        .margin=${this.margin}
        .containerPadding=${this.containerPadding}
        .isDraggable=${!1}
        .isResizable=${!1}
        placeholder
      >
      </lit-grid-item>
    `:dt``}async _attachObserver(){this._resizeObserver||(await(async()=>{"function"!=typeof ResizeObserver&&(window.ResizeObserver=(await import("resize-observer-polyfill")).default)})(),this._resizeObserver=new ResizeObserver(le(()=>this._measureLayoutWidth(),250,!1))),this._resizeObserver.observe(this)}_measureLayoutWidth(){this.offsetParent&&(this._width=this.offsetParent.clientWidth)}static get styles(){return Et`
      :host {
        display: block;
        position: relative;
      }

      :host([dragging]),
      :host([resizing]),
      :host([dragging]) lit-grid-item,
      :host([resizing]) lit-grid-item {
        user-select: none;
        touch-action: none;
      }
    `}};ge([St({type:Array})],me.prototype,"layout",void 0),ge([St()],me.prototype,"sortStyle",void 0),ge([St({type:Array})],me.prototype,"margin",void 0),ge([St({type:Array})],me.prototype,"containerPadding",void 0),ge([St({type:Number})],me.prototype,"rowHeight",void 0),ge([St({type:Number})],me.prototype,"columns",void 0),ge([St({type:Boolean})],me.prototype,"dragDisabled",void 0),ge([St({type:Boolean})],me.prototype,"resizeDisabled",void 0),ge([St({attribute:!1})],me.prototype,"resizeHandle",void 0),ge([St({attribute:!1})],me.prototype,"dragHandle",void 0),ge([St({type:Boolean,attribute:!0,reflect:!0})],me.prototype,"resizing",void 0),ge([St({type:Boolean,attribute:!0,reflect:!0})],me.prototype,"dragging",void 0),ge([St()],me.prototype,"itemRenderer",void 0),ge([xt()],me.prototype,"_width",void 0),ge([xt()],me.prototype,"_layout",void 0),ge([xt()],me.prototype,"_placeholder",void 0),me=ge([bt("lit-grid-layout")],me);var ye="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),fe=new Uint8Array(16);function ve(){if(!ye)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return ye(fe)}var _e=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function be(t){return"string"==typeof t&&_e.test(t)}for(var we=[],Se=0;Se<256;++Se)we.push((Se+256).toString(16).substr(1));function xe(t,e,i){var s=(t=t||{}).random||(t.rng||ve)();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,e){i=i||0;for(var r=0;r<16;++r)e[i+r]=s[r];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=(we[t[e+0]]+we[t[e+1]]+we[t[e+2]]+we[t[e+3]]+"-"+we[t[e+4]]+we[t[e+5]]+"-"+we[t[e+6]]+we[t[e+7]]+"-"+we[t[e+8]]+we[t[e+9]]+"-"+we[t[e+10]]+we[t[e+11]]+we[t[e+12]]+we[t[e+13]]+we[t[e+14]]+we[t[e+15]]).toLowerCase();if(!be(i))throw TypeError("Stringified UUID is invalid");return i}(s)}const Pe=(t,e,i)=>Object.assign(Object.assign({},t),{views:t.views.map((t,s)=>s===e?i:t)}),Me=()=>new Promise(t=>{var e;e=t,requestAnimationFrame(()=>setTimeout(e,0))});let Ce=class extends Tt{getCardSize(){return this._assignedNodes?w(this._assignedNodes[0]):1}render(){return dt`
      <slot></slot>
      <div class="parent-card-actions">
        <div class="overlay"></div>
        <div class="card-actions">
          <mwc-icon-button
            .title=${this.hass.localize("ui.panel.lovelace.editor.edit_card.edit")}
            @click=${this._editCard}
          >
            <ha-svg-icon .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"}></ha-svg-icon>
          </mwc-icon-button>
          <mwc-icon-button
            .title=${this.hass.localize("ui.panel.lovelace.editor.edit_card.delete")}
            @click=${this._deleteCard}
          >
            <ha-svg-icon .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}></ha-svg-icon>
          </mwc-icon-button>
        </div>
      </div>
    `}_editCard(){S(this,"ll-edit-card",{path:this.path})}_deleteCard(){S(this,"ll-delete-card",{path:this.path})}static get styles(){return Et`
      slot {
        pointer-events: none;
        z-index: 0;
      }

      .overlay {
        transition: all 0.25s;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        opacity: 0;
        cursor: move;
      }

      .parent-card-actions:hover .overlay {
        outline: 2px solid var(--primary-color);
        background: rgba(0, 0, 0, 0.3);
        /* background-color: grey; */
        opacity: 1;
      }

      .parent-card-actions {
        transition: all 0.25s;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
      }

      .parent-card-actions:hover {
        opacity: 1;
      }

      .card-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        z-index: 2;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 24px;
        color: white;
      }

      .card-actions > * {
        margin: 0 4px;
        border-radius: 24px;
        background: rgba(0, 0, 0, 0.7);
      }

      mwc-list-item {
        cursor: pointer;
        white-space: nowrap;
      }

      mwc-list-item.delete-item {
        color: var(--error-color);
      }

      .drag-handle {
        cursor: move;
      }
    `}};t([St({attribute:!1})],Ce.prototype,"hass",void 0),t([St({attribute:!1})],Ce.prototype,"lovelace",void 0),t([St({type:Array})],Ce.prototype,"path",void 0),t([function(t="",e=!1,i=""){return(s,r)=>{const o={get(){const s="slot"+(t?`[name=${t}]`:":not([name])"),r=this.renderRoot.querySelector(s);let o=r&&r.assignedNodes({flatten:e});return o&&i&&(o=o.filter(t=>t.nodeType===Node.ELEMENT_NODE&&t.matches?t.matches(i):zt.call(t,i))),o},enumerable:!0,configurable:!0};return void 0!==r?Pt(o,s,r):Mt(o,s)}}()],Ce.prototype,"_assignedNodes",void 0),Ce=t([bt("hui-grid-card-options")],Ce);const ze=[2,6,9,12],Ne=document.createElement("div");Ne.style.cssText="width: 100%; height: 100%; cursor: se-resize; fill: var(--primary-text-color)",Ne.innerHTML='\n  <svg\n    viewBox="0 0 24 24"\n    preserveAspectRatio="xMidYMid meet"\n    focusable="false"\n  >\n    <g><path d=M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z></path></g>\n  </svg>\n';let He=class extends Tt{constructor(){super(),this.cards=[],this.badges=[],this._cards={},this._createColumnsIteration=0,this._itemRenderer=t=>this._cards?dt`
      ${this._cards[t]}
    `:dt``,this.addEventListener("iron-resize",t=>t.stopPropagation())}setConfig(t){this._config=t}render(){var t,e,i,s,r;return dt`
      ${this.lovelace.editMode?dt`
            <div class="toolbar">
              <mwc-button @click=${this._saveView} raised>Save Layout</mwc-button>
            </div>
          `:""}
      <div id="badges" style=${this.badges.length>0?"display: block":"display: none"}>
        ${this.badges.map(t=>dt`
              ${t}
            `)}
      </div>
      <lit-grid-layout
        rowHeight="40"
        .containerPadding=${[8,8]}
        .margin=${[8,8]}
        .resizeHandle=${Ne}
        .itemRenderer=${this._itemRenderer}
        .layout=${this._layout}
        .columns=${this._columns}
        .dragHandle=${".overlay"}
        .dragDisabled=${!(null===(t=this.lovelace)||void 0===t?void 0:t.editMode)}
        .resizeDisabled=${!(null===(e=this.lovelace)||void 0===e?void 0:e.editMode)}
        @item-changed=${this._saveLayout}
      ></lit-grid-layout>
      ${(null===(i=this.lovelace)||void 0===i?void 0:i.editMode)?dt`
            <mwc-fab
              class=${Ut({rtl:(s=this.hass,r=s.language||"en",s.translationMetadata.translations[r]&&s.translationMetadata.translations[r].isRTL||!1)})}
              .title=${this.hass.localize("ui.panel.lovelace.editor.edit_card.add")}
              @click=${this._addCard}
            >
              <ha-svg-icon slot="icon" .path=${"M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"}></ha-svg-icon>
            </mwc-fab>
          `:""}
    `}firstUpdated(){this._updateColumns=this._updateColumns.bind(this),this._mqls=[300,600,900,1200].map(t=>{const e=matchMedia(`(min-width: ${t}px)`);return e.addEventListener("change",this._updateColumns),e}),this._updateCardsWithID(),this._updateColumns()}updated(t){var e,i,s;if(super.updated(t),t.has("hass")){const e=t.get("hass");if((e&&this.hass.dockedSidebar!==e.dockedSidebar||!e&&this.hass)&&this._updateColumns(),1===t.size)return}const r=t.get("lovelace");if(t.has("lovelace")&&((null==r?void 0:r.config)!==(null===(e=this.lovelace)||void 0===e?void 0:e.config)||(null==r?void 0:r.editMode)!==(null===(i=this.lovelace)||void 0===i?void 0:i.editMode))||t.has("_columns")){if(!(null===(s=this._layout)||void 0===s?void 0:s.length))return void this._createLayout();this._createCards()}t.has("lovelace")&&this.lovelace.editMode&&!r.editMode&&(this._layoutEdit=this._layout),t.has("lovelace")&&!this.lovelace.editMode&&r.editMode&&(this._layout=this._config.layout)}_updateCardsWithID(){if(!this._config)return;if(0===this._config.cards.filter(t=>{var e;return!(null===(e=t.layout)||void 0===e?void 0:e.key)}).length)return;const t=this._config.cards.map(t=>{var e,i;return(null===(e=t.layout)||void 0===e?void 0:e.key)?t:t=Object.assign(Object.assign({},t),{layout:{key:(null===(i=t.layout)||void 0===i?void 0:i.key)||xe()}})}),e=Object.assign(Object.assign({},this._config),{cards:t});this.lovelace.saveConfig(Pe(this.lovelace.config,this.index,e))}async _createLayout(){var t,e,i;this._createColumnsIteration++;const s=this._createColumnsIteration;if(null===(t=this._layout)||void 0===t?void 0:t.length)return;const r=[];let o,n;for(const[t,a]of this.cards.entries()){const d=this._config.cards[t],h=null===(e=this._config.layout)||void 0===e?void 0:e.find(t=>{var e;return t.key===(null===(e=d.layout)||void 0===e?void 0:e.key)});if(h){r.push(h);continue}let l;console.log("not in current layout: ",d),void 0===o&&(o=Me().then(()=>{o=void 0,n=void 0})),void 0===n?n=new Date:(new Date).getTime()-n.getTime()>16&&(l=o);const c=w(a),[u]=await Promise.all([c,l]);if(s!==this._createColumnsIteration)return;const p={width:3,height:u,key:null===(i=d.layout)||void 0===i?void 0:i.key};r.push(Object.assign(Object.assign({},p),h))}this._layout=r,this._createCards()}_createCards(){const t={};this.cards.forEach((e,i)=>{var s,r;const o=this._layout[i];if(!o)return;e.editMode=null===(s=this.lovelace)||void 0===s?void 0:s.editMode;let n=e;if(null===(r=this.lovelace)||void 0===r?void 0:r.editMode){const t=document.createElement("hui-grid-card-options");t.hass=this.hass,t.lovelace=this.lovelace,t.path=[this.index,i],t.appendChild(e),n=t}t[o.key]=n}),this._cards=t}_saveLayout(t){this._layoutEdit=t.detail.layout}async _saveView(){var t;const e=Object.assign(Object.assign({},this._config),{layout:this._layoutEdit});await(null===(t=this.lovelace)||void 0===t?void 0:t.saveConfig(Pe(this.lovelace.config,this.index,e)))}_addCard(){S(this,"ll-create-card")}_updateColumns(){if(!this._mqls)return;const t=this._mqls.reduce((t,e)=>t+Number(e.matches),0);this._columns=Math.max(1,ze[t-1])}static get styles(){return Et`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 4px 4px env(safe-area-inset-bottom);
        transform: translateZ(0);
        position: relative;
        color: var(--primary-text-color);
        background: var(--lovelace-background, var(--primary-background-color));
      }

      lit-grid-layout {
        --placeholder-background-color: var(--accent-color);
        --resize-handle-size: 32px;
      }

      #badges {
        margin: 8px 16px;
        font-size: 85%;
        text-align: center;
      }

      mwc-fab {
        position: sticky;
        float: right;
        right: calc(16px + env(safe-area-inset-right));
        bottom: calc(16px + env(safe-area-inset-bottom));
        z-index: 5;
      }

      mwc-fab.rtl {
        float: left;
        right: auto;
        left: calc(16px + env(safe-area-inset-left));
      }

      .toolbar {
        background-color: var(--divider-color);
        border-bottom-left-radius: var(--ha-card-border-radius, 4px);
        border-bottom-right-radius: var(--ha-card-border-radius, 4px);
        padding: 8px;
      }
    `}};t([St({attribute:!1})],He.prototype,"hass",void 0),t([St({attribute:!1})],He.prototype,"lovelace",void 0),t([St({type:Number})],He.prototype,"index",void 0),t([St({attribute:!1})],He.prototype,"cards",void 0),t([St({attribute:!1})],He.prototype,"badges",void 0),t([xt()],He.prototype,"_columns",void 0),t([xt()],He.prototype,"_layout",void 0),t([xt()],He.prototype,"_cards",void 0),He=t([bt("grid-dnd")],He);export{He as GridView};
//# sourceMappingURL=grid-view.js.map
