import{A as t,B as e,D as r,F as i,I as s,L as a,M as o,N as n,O as c,P as l,R as h,V as d,_ as u,b as p,c as m,d as b,f as w,h as f,i as g,j as v,k as y,l as k,m as _,o as $,r as x,s as C,t as S,u as I,v as A,x as z,y as E,z as T}from"./index.m-D-OWBoON.js";var D=class extends Event{constructor(t,e,r,i){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e,this.callback=r,this.subscribe=null!=i&&i}};var M=class{constructor(t,e,r,i){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(t,e)=>{this.unsubscribe&&(this.unsubscribe!==e&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=t,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(t,e)),this.unsubscribe=e},this.host=t,void 0!==e.context){var s;const t=e;this.context=t.context,this.callback=t.callback,this.subscribe=null!==(s=t.subscribe)&&void 0!==s&&s}else this.context=e,this.callback=r,this.subscribe=null!=i&&i;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new D(this.context,this.host,this.t,this.subscribe))}},N=class{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,e=!1){const r=e||!Object.is(t,this.o);this.o=t,r&&this.updateObservers()}constructor(t){this.subscriptions=/* @__PURE__ */new Map,this.updateObservers=()=>{for(const[t,{disposer:e}]of this.subscriptions)t(this.o,e)},void 0!==t&&(this.value=t)}addCallback(t,e,r){if(!r)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:e});const{disposer:i}=this.subscriptions.get(t);t(this.value,i)}clearCallbacks(){this.subscriptions.clear()}},U=class extends Event{constructor(t,e){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e}},F=class extends N{constructor(t,e,r){var i,s;super(void 0!==e.context?e.initialValue:r),this.onContextRequest=t=>{var e;if(t.context!==this.context)return;const r=null!==(e=t.contextTarget)&&void 0!==e?e:t.composedPath()[0];r!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,r,t.subscribe))},this.onProviderRequest=t=>{var e;if(t.context!==this.context)return;if((null!==(e=t.contextTarget)&&void 0!==e?e:t.composedPath()[0])===this.host)return;const r=/* @__PURE__ */new Set;for(const[i,{consumerHost:s}]of this.subscriptions)r.has(i)||(r.add(i),s.dispatchEvent(new D(this.context,s,i,!0)));t.stopPropagation()},this.host=t,void 0!==e.context?this.context=e.context:this.context=e,this.attachListeners(),null===(i=(s=this.host).addController)||void 0===i||i.call(s,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new U(this.context,this.host))}};function O({context:t}){return(e,r)=>{const i=/* @__PURE__ */new WeakMap;if("object"==typeof r)return{get(){return e.get.call(this)},set(t){return i.get(this).setValue(t),e.set.call(this,t)},init(e){return i.set(this,new F(this,{context:t,initialValue:e})),e}};{e.constructor.addInitializer(e=>{i.set(e,new F(e,{context:t}))});const s=Object.getOwnPropertyDescriptor(e,r);let a;if(void 0===s){const t=/* @__PURE__ */new WeakMap;a={get(){return t.get(this)},set(e){i.get(this).setValue(e),t.set(this,e)},configurable:!0,enumerable:!0}}else{const t=s.set;a={...s,set(e){i.get(this).setValue(e),null==t||t.call(this,e)}}}return void Object.defineProperty(e,r,a)}}}function P({context:t,subscribe:e}){return(r,i)=>{"object"==typeof i?i.addInitializer(function(){new M(this,{context:t,callback:t=>{r.set.call(this,t)},subscribe:e})}):r.constructor.addInitializer(r=>{new M(r,{context:t,callback:t=>{r[i]=t},subscribe:e})})}}var L=class extends s{createRenderRoot(){return this}},W=Symbol("clock-weather-card-config"),j=Symbol("clock-weather-card-hass"),R=Symbol("clock-weather-card-error-message"),q=class extends L{constructor(...t){super(...t),this.errorMessage=!1,this.severity="error",this._errorCard=null}render(){var t;return this._errorCard||(this._errorCard=document.createElement("hui-error-card")),this._errorCard.setConfig({type:"error",message:(t=this.message,T`${t.split(/"([^"]*)"/).map((t,e)=>e%2==1?T`<code>${t}</code>`:t)}`),origConfig:this.config}),this._errorCard.hass=this.hass,this._errorCard.preview=this.errorMessage,this._errorCard.severity=this.severity,T`${this._errorCard}`}};t([i({attribute:!1})],q.prototype,"message",void 0),t([P({context:j,subscribe:!0}),l()],q.prototype,"hass",void 0),t([P({context:R,subscribe:!0}),l()],q.prototype,"errorMessage",void 0),t([i({attribute:!1})],q.prototype,"config",void 0),t([i()],q.prototype,"severity",void 0),q=t([v("clock-weather-card-error")],q);var H=class extends L{constructor(...t){super(...t),this._settled=!1}render(){var t;const e=`weather.${"sunny"===this.weatherState&&this.isNight?"clear-night":this.weatherState}`,r=c.has(e)?c.t(this.config.locale,e):"";return T`<img src="${null!==(t=this._src)&&void 0!==t?t:a}" alt=${r} @load=${this._onImageDone} @error=${this._onImageDone} />`}willUpdate(t){if(!(t.has("weatherState")||t.has("isNight")||t.has("animatedIcon")||t.has("weatherIconType")))return;const{weatherIconType:e,weatherState:r,isNight:i,animatedIcon:s}=this,a=y.getWeatherIcon(e,s,r,i);a?a!==this._src&&(this._src=a,this._settled=!1):(o.warn(`No "${e}" icon for weather state "${r}", keeping the previous icon`),this._settled=!0)}_onImageDone(){this._settled=!0}};t([i()],H.prototype,"weatherState",void 0),t([i()],H.prototype,"isNight",void 0),t([i()],H.prototype,"animatedIcon",void 0),t([i()],H.prototype,"weatherIconType",void 0),t([P({context:W,subscribe:!0}),l()],H.prototype,"config",void 0),t([l()],H.prototype,"_src",void 0),t([i({type:Boolean,reflect:!0,attribute:"data-settled"})],H.prototype,"_settled",void 0),H=t([v("clock-weather-card-icon")],H);var V=1,G=2,B=t=>(...e)=>({_$litDirective$:t,values:e}),Z=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},K="important",Q=" !"+K,X=B(class extends Z{constructor(t){var e;if(super(t),t.type!==V||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,r)=>{const i=t[r];return null==i?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const i of this.ft)null==e[i]&&(this.ft.delete(i),i.includes("-")?r.removeProperty(i):r[i]=null);for(const i in e){const t=e[i];if(null!=t){this.ft.add(i);const e="string"==typeof t&&t.endsWith(Q);i.includes("-")||e?r.setProperty(i,e?t.slice(0,-11):t,e?K:""):r[i]=t}}return h}});function J(t,e){const r=t[e];return"number"==typeof r&&Number.isFinite(r)?r:null}function Y(t,e){return e?/^\p{L}/u.test(e)?`${t} ${e}`:`${t}${e}`:t}var tt={comma_decimal:["en-US","en"],decimal_comma:["de","es","it"],space_comma:["fr","sv","cs"],quote_decimal:["de-CH"],system:void 0};function et(t,{locale:e,numberFormat:r},i=null){const s=0===Number(t.toFixed(null!=i?i:3))?0:t;if("none"===r)return null===i?String(t):s.toFixed(i);const a=null===i?{}:{minimumFractionDigits:i,maximumFractionDigits:i};return new Intl.NumberFormat(r in tt?tt[r]:e,a).format(s)}var rt=class extends L{constructor(...t){super(...t),this.showUnit=!0}render(){const t=this.attribute?A.getEntityAttribute(this.hass,this.entityId,this.attribute):A.getEntityState(this.hass,this.entityId);if(null==t)return T``;const e=this.resolveUnit(),{temperatureUnit:r}=this.config,i=z(t,e,r),s=this.attribute?null:A.getDisplayPrecision(this.hass,this.entityId);if(null!==i)return this.renderValue(et(i,this.config,s),r);var a;this.showUnit&&void 0===this.unit&&null===e&&o.warn(`Unit attribute "${null!==(a=this.unitAttribute)&&void 0!==a?a:"unit_of_measurement"}" not found for entity "${this.entityId}"`);const n=this.isNumeric(t,e,s)?et(Number(t),this.config,s):String(t);return this.renderValue(n,e)}renderValue(t,e){return this.showUnit?T`<span>${void 0===this.unit?Y(t,e):`${t}${this.unit}`}</span>`:T`<span>${t}</span>`}isNumeric(t,e,r){if("number"==typeof t)return!0;if(""===t||Number.isNaN(Number(t)))return!1;const i=void 0!==A.getEntityAttribute(this.hass,this.entityId,"state_class");return null!==e||i||null!==r}resolveUnit(){const t=this.unitAttribute?A.getEntityAttribute(this.hass,this.entityId,this.unitAttribute):A.getEntityUnitOfMeasurement(this.hass,this.entityId);return null==t||""===t?null:String(t)}};t([P({context:j,subscribe:!0}),l()],rt.prototype,"hass",void 0),t([P({context:W,subscribe:!0}),l()],rt.prototype,"config",void 0),t([i()],rt.prototype,"entityId",void 0),t([i()],rt.prototype,"attribute",void 0),t([i({type:Boolean})],rt.prototype,"showUnit",void 0),t([i()],rt.prototype,"unit",void 0),t([i()],rt.prototype,"unitAttribute",void 0),rt=t([v("clock-weather-card-entity-segment")],rt);var it=class extends rt{render(){var t,e;const r=this.attribute?A.getEntityAttribute(this.hass,this.entityId,this.attribute):A.getEntityState(this.hass,this.entityId),i=function(t,e){var r,i;return null===e?null:null!==(r=null===(i=f(t).filter(t=>e>=t.temp).pop())||void 0===i?void 0:i.color)&&void 0!==r?r:null}(this.backgroundColor,(t=>{if("number"==typeof t)return Number.isFinite(t)?t:null;if("string"!=typeof t||""===t.trim())return null;const e=Number(t);return Number.isFinite(e)?e:null})(r));if(null===i)return super.render();const s=null!==(t=null!==(e=this.textColor)&&void 0!==e?e:function(t){const e=u(t);if(!e)return null;const r=(([t,e,r])=>{const i=t=>(t/=255)<=.03928?t/12.92:((t+.055)/1.055)**2.4;return.2126*i(t)+.7152*i(e)+.0722*i(r)})(e);return(r+.05)/.05>=1.05/(r+.05)?"#000000":"#ffffff"}(i))&&void 0!==t?t:void 0;return T`<span class="badge" style=${X({backgroundColor:i,color:s})}>${super.render()}</span>`}};t([i({attribute:!1})],it.prototype,"backgroundColor",void 0),t([i()],it.prototype,"textColor",void 0),it=t([v("clock-weather-card-badge-segment")],it);var st=class extends L{render(){return T`<span>${this.currentDate.toFormat(this.datePattern||"DDD")}</span>`}};t([i({attribute:!1})],st.prototype,"currentDate",void 0),t([i({attribute:!1})],st.prototype,"datePattern",void 0),st=t([v("clock-weather-card-date-segment")],st);var at=class extends L{render(){return this.entityId?T`<ha-state-icon .hass=${this.hass} .stateObj=${this.hass.states[this.entityId]} style="--mdc-icon-size: 1em"></ha-state-icon>`:T`<ha-icon icon="${this.icon}" style="--mdc-icon-size: 1em"></ha-icon>`}};t([P({context:j,subscribe:!0}),l()],at.prototype,"hass",void 0),t([i()],at.prototype,"icon",void 0),t([i()],at.prototype,"entityId",void 0),at=t([v("clock-weather-card-icon-segment")],at);var ot=class extends L{render(){return T`<span></span>`}};ot=t([v("clock-weather-card-spacer-segment")],ot);var nt=class extends L{constructor(...t){super(...t),this.result=null,this.unsubscribe=null}render(){return null===this.result?T`<span class="skeleton skeleton--text"></span>`:T`<span>${this.result}</span>`}shouldUpdate(t){return[...t.keys()].some(t=>"hass"!==t)||this.connectionChanged(t)}updated(t){(t.has("template")||this.connectionChanged(t))&&this.subscribe()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.subscribe()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeTemplate()}connectionChanged(t){var e,r;return t.has("hass")&&(null===(e=t.get("hass"))||void 0===e?void 0:e.connection)!==(null===(r=this.hass)||void 0===r?void 0:r.connection)}subscribe(){if(this.unsubscribeTemplate(),!this.hass)return;const{template:t}=this;this.unsubscribe=A.subscribeTemplate(this.hass,t,e=>{var r,i;"error"in e?(o.warn(`Template "${t}" failed to render: ${e.error}`),null!==(i=this.result)&&void 0!==i||(this.result="")):this.result=String(null!==(r=e.result)&&void 0!==r?r:"")}).catch(e=>{var r;return o.error(`Error subscribing to template "${t}"`,e),null!==(r=this.result)&&void 0!==r||(this.result=""),null})}unsubscribeTemplate(){var t;null===(t=this.unsubscribe)||void 0===t||t.then(async t=>null==t?void 0:t()).catch(t=>o.debug("Error unsubscribing from template, connection may already be closed",t)),this.unsubscribe=null}};t([P({context:j,subscribe:!0}),l()],nt.prototype,"hass",void 0),t([i()],nt.prototype,"template",void 0),t([l()],nt.prototype,"result",void 0),nt=t([v("clock-weather-card-template-segment")],nt);var ct=class extends L{render(){return T`<span>${this.text}</span>`}};t([i()],ct.prototype,"text",void 0),ct=t([v("clock-weather-card-text-segment")],ct);var lt=class extends L{render(){return T`<span>${this.currentDate.toFormat(this.timePattern||"t")}</span>`}};t([i({attribute:!1})],lt.prototype,"currentDate",void 0),t([i({attribute:!1})],lt.prototype,"timePattern",void 0),lt=t([v("clock-weather-card-time-segment")],lt);var ht=class extends L{render(){var t;const e=A.getEntityState(this.hass,null!==(t=this.entityId)&&void 0!==t?t:this.config.entity);if(!e)return T``;const r=A.isNight(this.hass,this.config.sun_entity),i=y.getWeatherMdiIcon(e,r);return T`<clock-weather-card-icon-segment .icon=${i}></clock-weather-card-icon-segment>`}};t([P({context:j,subscribe:!0}),l()],ht.prototype,"hass",void 0),t([P({context:W,subscribe:!0}),l()],ht.prototype,"config",void 0),t([i()],ht.prototype,"entityId",void 0),ht=t([v("clock-weather-card-weather-icon-segment")],ht);var dt=class extends L{constructor(...t){super(...t),this.showUnit=!0}render(){const{entity:t,locale:e,temperatureUnit:r,temperatureSensor:i,sun_entity:s,header:a}=this.config,n=(t,e=null)=>et(a.round_temperatures&&null===e?Math.round(t):t,this.config,e);if(this.attribute){var l;if(!this.unitAttribute&&A.isWeatherTemperatureAttribute(this.attribute)){var h;const e="temperature"===this.attribute?A.getCurrentTemperature(this.hass,t,i,r):A.getWeatherTemperature(this.hass,t,this.attribute,r);if(null===e)return T``;const s="temperature"===this.attribute&&i?A.getDisplayPrecision(this.hass,i):null;return T`<span>${n(e,s)}${this.showUnit?null!==(h=this.unit)&&void 0!==h?h:r:""}</span>`}const e=A.getEntityAttribute(this.hass,t,this.attribute);if(void 0===e&&o.warn(`Attribute "${this.attribute}" not found on weather entity "${t}"`),null==e)return T``;const s=this.unitAttribute?A.getEntityAttributeString(this.hass,t,this.unitAttribute):A.getWeatherAttributeUnit(this.hass,t,this.attribute),a=z(e,s,r);if(null!==a)return T`<span>${n(a)}${this.showUnit?null!==(l=this.unit)&&void 0!==l?l:r:""}</span>`;const c="number"==typeof e?et(e,this.config):String(e);return this.showUnit?T`<span>${void 0===this.unit?Y(c,s):`${c}${this.unit}`}</span>`:T`<span>${c}</span>`}const d=A.getEntityState(this.hass,t);if(!d)return T``;const u="sunny"===d||"clear-night"===d?A.isNight(this.hass,s)?"clear-night":"sunny":d,p=c.t(e,`weather.${u}`);return T`<span>${p}</span>`}};t([P({context:j,subscribe:!0}),l()],dt.prototype,"hass",void 0),t([P({context:W,subscribe:!0}),l()],dt.prototype,"config",void 0),t([i({reflect:!0})],dt.prototype,"attribute",void 0),t([i({type:Boolean})],dt.prototype,"showUnit",void 0),t([i()],dt.prototype,"unit",void 0),t([i()],dt.prototype,"unitAttribute",void 0),dt=t([v("clock-weather-card-weather-segment")],dt);var ut=class extends L{render(){return T`${this.rowConfig.segments.map(t=>this.renderSegment(t))}`}renderSegment(t){switch(t.type){case"time":return T`<clock-weather-card-time-segment
          .currentDate=${this.currentDate}
          .timePattern=${t.time_pattern}
        ></clock-weather-card-time-segment>`;case"date":return T`<clock-weather-card-date-segment
          .currentDate=${this.currentDate}
          .datePattern=${t.date_pattern}
        ></clock-weather-card-date-segment>`;case"weather":var e;return T`<clock-weather-card-weather-segment
          .attribute=${t.attribute}
          .showUnit=${null===(e=t.show_unit)||void 0===e||e}
          .unit=${t.unit}
          .unitAttribute=${t.unit_attribute}
        ></clock-weather-card-weather-segment>`;case"entity":var r;return T`<clock-weather-card-entity-segment
          .entityId=${t.entity_id}
          .attribute=${t.attribute}
          .showUnit=${null===(r=t.show_unit)||void 0===r||r}
          .unit=${t.unit}
          .unitAttribute=${t.unit_attribute}
        ></clock-weather-card-entity-segment>`;case"badge":var i;return T`<clock-weather-card-badge-segment
          .entityId=${t.entity_id}
          .attribute=${t.attribute}
          .showUnit=${null===(i=t.show_unit)||void 0===i||i}
          .unit=${t.unit}
          .unitAttribute=${t.unit_attribute}
          .backgroundColor=${t.background_color}
          .textColor=${t.text_color}
        ></clock-weather-card-badge-segment>`;case"icon":return T`<clock-weather-card-icon-segment
          .icon=${t.icon}
          .entityId=${t.entity_id}
        ></clock-weather-card-icon-segment>`;case"weather_icon":return T`<clock-weather-card-weather-icon-segment
          .entityId=${t.entity_id}
        ></clock-weather-card-weather-icon-segment>`;case"text":return T`<clock-weather-card-text-segment
          .text=${t.text}
        ></clock-weather-card-text-segment>`;case"template":return T`<clock-weather-card-template-segment
          .template=${t.template}
        ></clock-weather-card-template-segment>`;case"spacer":return T`<clock-weather-card-spacer-segment></clock-weather-card-spacer-segment>`}}};t([i({attribute:!1})],ut.prototype,"rowConfig",void 0),t([i({attribute:!1})],ut.prototype,"currentDate",void 0),ut=t([v("clock-weather-card-header-details-row")],ut);var pt=class extends L{render(){return T`${this.config.header.rows.map(t=>{var e,r;return T`
        <clock-weather-card-header-details-row
          style="font-size: ${null!==(e=t.font_size)&&void 0!==e?e:""}; justify-content: ${null!==(r=t.alignment)&&void 0!==r?r:""}"
          ?default-rows=${this.config.header.rows===x}
          .rowConfig=${t}
          .currentDate=${this.currentDate}
        ></clock-weather-card-header-details-row>
      `})}`}};t([P({context:W,subscribe:!0}),l()],pt.prototype,"config",void 0),t([i({attribute:!1})],pt.prototype,"currentDate",void 0),pt=t([v("clock-weather-card-header-details")],pt);var{I:mt}=e,bt=(t,e)=>{var r;const i=t._$AN;if(void 0===i)return!1;for(const s of i)null===(r=s._$AO)||void 0===r||r.call(s,e,!1),bt(s,e);return!0},wt=t=>{let e,r;do{if(void 0===(e=t._$AM))break;r=e._$AN,r.delete(t),t=e}while(0===(null==r?void 0:r.size))},ft=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(void 0===r)e._$AN=r=/* @__PURE__ */new Set;else if(r.has(t))break;r.add(t),yt(e)}};function gt(t){void 0!==this._$AN?(wt(this),this._$AM=t,ft(this)):this._$AM=t}function vt(t,e=!1,r=0){const i=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(i))for(let a=r;a<i.length;a++)bt(i[a],!1),wt(i[a]);else null!=i&&(bt(i,!1),wt(i));else bt(this,t)}var yt=t=>{var e,r;t.type==G&&(null!==(e=t._$AP)&&void 0!==e||(t._$AP=vt),null!==(r=t._$AQ)&&void 0!==r||(t._$AQ=gt))},kt=class extends Z{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),ft(this),this.isConnected=t._$AU}_$AO(t,e=!0){var r,i;t!==this.isConnected&&(this.isConnected=t,t?null===(r=this.reconnected)||void 0===r||r.call(this):null===(i=this.disconnected)||void 0===i||i.call(this)),e&&(bt(this,t),wt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}},_t=/* @__PURE__ */new WeakMap,$t=B(class extends kt{render(t){return a}update(t,[e]){var r;const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=null===(r=t.options)||void 0===r?void 0:r.host,this.rt(this.ct=t.element)),a}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){var e;const r=null!==(e=this.ht)&&void 0!==e?e:globalThis;let i=_t.get(r);void 0===i&&(i=/* @__PURE__ */new WeakMap,_t.set(r,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){var t,e,r;return"function"==typeof this.G?null===(t=_t.get(null!==(e=this.ht)&&void 0!==e?e:globalThis))||void 0===t?void 0:t.get(this.G):null===(r=this.G)||void 0===r?void 0:r.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),xt=class extends L{constructor(...t){super(...t),this.resizeObserver=new ResizeObserver(([t])=>{this.style.setProperty("--cwc-header-rows-height",`${t.target.offsetHeight}px`)}),this.observeDetails=t=>{this.resizeObserver.disconnect(),t&&this.resizeObserver.observe(t)}}render(){const t=A.getEntityState(this.hass,this.config.entity),e=A.isNight(this.hass,this.config.sun_entity),{weather_icon_size:r,animated_icons:i,weather_icon_type:s}=this.config.header;return T`
      <clock-weather-card-icon
        style=${r?`--cwc-header-icon-size: ${r}`:a}
        .weatherState=${t}
        .isNight=${e}
        .animatedIcon=${i}
        .weatherIconType=${s}
      ></clock-weather-card-icon>
      <clock-weather-card-header-details ${$t(this.observeDetails)} .currentDate=${this.currentDate}></clock-weather-card-header-details>
    `}};t([P({context:j,subscribe:!0}),l()],xt.prototype,"hass",void 0),t([P({context:W,subscribe:!0}),l()],xt.prototype,"config",void 0),t([i({attribute:!1})],xt.prototype,"currentDate",void 0),xt=t([v("clock-weather-card-header")],xt);var Ct=class extends L{render(){const{label:t,condition:e,isNight:r,animatedIcon:i,weatherIconType:s,temperature:o,temperatureLow:n,temperatureUnit:c,sunEvent:l,attribute:h}=this.item,d="monochrome"===s?"attribute attribute--monochrome":"attribute";return T`
      <span class="time" title=${t}>${t}</span>
      <clock-weather-card-icon
        .weatherState=${e}
        .isNight=${r}
        .animatedIcon=${i}
        .weatherIconType=${s}
      ></clock-weather-card-icon>
      ${l?T`<span class="label"><ha-icon icon=${"sunrise"===l.kind?"mdi:arrow-up":"mdi:arrow-down"} title=${l.label} aria-label=${l.label}></ha-icon></span>`:T`<span class="label">${null===o?"–":`${o}${c}`}</span>`}
      ${null==n?a:T`<span class="temperature-low">${n}${c}</span>`}
      ${h?T`<span class=${d} style=${h.color?`color: ${h.color}`:a}>${null!==h.value?T`${h.icon?T`<ha-icon icon=${h.icon}></ha-icon>`:a}<span class="attribute-value">${h.value}</span>`:a}</span>`:a}
    `}};t([i({attribute:!1})],Ct.prototype,"item",void 0),Ct=t([v("clock-weather-card-forecast-strip-item")],Ct);var St=class extends L{render(){return T``}};St=t([v("clock-weather-card-divider")],St);var It=new class{constructor(){this.registries=/* @__PURE__ */new WeakMap}subscribe(t,e,r,i){var s;const a=this.entriesFor(t),n=`${e}|${r}`,c=null!==(s=a.get(n))&&void 0!==s?s:this.open(t,a,n,e,r);return c.latest&&i(c.latest),c.listeners.add(i),()=>{!c.listeners.delete(i)||c.listeners.size>0||(a.get(n)===c&&a.delete(n),o.debug(`Unsubscribing from ${r} forecast`,e),c.unsubscribe.then(async t=>{try{await(null==t?void 0:t())}catch(i){o.debug(`Error unsubscribing from ${r} forecast, connection may already be closed`,e,i)}}))}}open(t,e,i,s,a){const n={listeners:/* @__PURE__ */new Set,latest:null,unsubscribe:Promise.resolve(null)};return n.unsubscribe=A.subscribeForecast(t,s,a,t=>{var e;t.forecast||o.warn(`Received ${a} forecast event without forecast entries`,s);const i=(null!==(e=t.forecast)&&void 0!==e?e:[]).filter(t=>!!r.fromISO(t.datetime).isValid||(o.warn(`Ignoring ${a} forecast entry of "${s}" with invalid datetime "${t.datetime}"`),!1));n.latest=i,n.listeners.forEach(t=>t(i))}).then(t=>(o.debug(`Subscribed to ${a} forecast`,s),t)).catch(t=>(o.error(`Error subscribing to ${a} forecast of "${s}"`,t),e.get(i)===n&&e.delete(i),n.listeners.forEach(t=>t(null)),null)),e.set(i,n),n}entriesFor(t){let e=this.registries.get(t.connection);return e||(e=/* @__PURE__ */new Map,this.registries.set(t.connection,e)),e}},At=t=>t.filter(t=>"number"==typeof t),zt=t=>{var e;const r=/* @__PURE__ */new Map;return t.forEach(t=>{var e;return r.set(t,(null!==(e=r.get(t))&&void 0!==e?e:0)+1)}),null===(e=[...r].reduce((t,e)=>!t||e[1]>t[1]?e:t,void 0))||void 0===e?void 0:e[0]},Et=(t,e)=>{const r=/* @__PURE__ */new Map;for(const s of t){var i;const t=e(s.datetime).toISO();r.set(t,[...null!==(i=r.get(t))&&void 0!==i?i:[],s])}return[...r].map(([t,e])=>{var r,i;const s=e.filter(t=>!1!==t.is_daytime),a=Object.assign({},...[...e].reverse(),...[...s].reverse());delete a.is_daytime;const o=At(e.map(t=>t.temperature)),n=At(e.map(t=>{var e;return null!==(e=t.templow)&&void 0!==e?e:t.temperature})),c=At(e.map(t=>t.precipitation_probability)),l=At(e.map(t=>t.precipitation)),h=t=>t.map(t=>t.condition).filter(t=>"string"==typeof t);return{...a,datetime:t,temperature:o.length>0?Math.max(...o):a.temperature,templow:e.length>1&&n.length>0?Math.min(...n):void 0,condition:null!==(r=null!==(i=zt(h(s)))&&void 0!==i?i:zt(h(e)))&&void 0!==r?r:a.condition,precipitation_probability:c.length>0?Math.max(...c):a.precipitation_probability,...l.length>0&&{precipitation:l.reduce((t,e)=>t+e)}}})},Tt=class extends L{constructor(...t){super(...t),this.forecasts=[],this._loaded=!1,this.unsubscribe=null,this.subscribedKey=null,this.failedEntityState=null}render(){const t=this.resolveEntityId(),e=this.resolveForecastType();if(!this._sourceForecastType(t,e))return this._renderWarning(m(t,e));if(!this._loaded)return this.renderSkeleton();const r=this.requiredAttribute();return null!==r&&this.forecasts.length>0&&!this.forecasts.some(t=>r in t)?this._renderWarning(C(t,r)):this.renderForecast(t,e)}connectedCallback(){super.connectedCallback(),this._syncSubscription()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe()}willUpdate(t){(t.has("config")||t.has("hass"))&&this._syncSubscription()}visibleRows(t,e){const i=this.currentDate,{locale:s,timeZone:a,sun_entity:n,temperatureUnit:l}=this.config,h=A.getEntityAttributeString(this.hass,this.resolveEntityId(),"temperature_unit"),d=t=>E(t,h,l),u=this.forecasts.map(t=>({forecast:Object.fromEntries(Object.entries(t).map(([t,e])=>[t,"number"!=typeof e||"templow"!==t&&!A.isWeatherTemperatureAttribute(t)?e:d(e)])),at:r.fromISO(t.datetime).setLocale(s).setZone(a)})),p=t=>{t>0||0===u.length||o.warn(`No current or upcoming ${this.resolveForecastType()} forecast entries for "${this.resolveEntityId()}"`)};if("hourly"===this.resolveForecastType()){const r=u.findIndex(({at:t})=>t>i);if(-1===r)return p(0),[];const a=Math.max(0,r-1),o=c.t(s,"misc.now");return u.slice(a,a+t).map(({forecast:t,at:r})=>{const s=r<=i;return{forecast:t,at:r,isCurrent:s,label:s?o:r.toFormat(e),isNight:A.isNight(this.hass,n,s?void 0:r)}})}const m=i.toISODate(),b=c.t(s,"misc.today"),w=u.filter(({at:t})=>t.toISODate()>=m);return p(w.length),w.slice(0,t).map(({forecast:t,at:e})=>{const r=e.toISODate()===m;return{forecast:t,at:e,isCurrent:r,label:r?b:e.toFormat("ccc"),isNight:r&&A.isNight(this.hass,n)}})}forecastAttributeUnit(t){return A.isWeatherTemperatureAttribute(t)?this.config.temperatureUnit:A.getForecastAttributeUnit(this.hass,this.resolveEntityId(),t)}_renderWarning(t){return T`
      <clock-weather-card-divider></clock-weather-card-divider>
      <clock-weather-card-error severity="warning" .message=${t.message}></clock-weather-card-error>
    `}_syncSubscription(){if(!this.isConnected||!this.hass||!this.config)return;const t=this.resolveEntityId(),e=this.resolveForecastType(),r=this._sourceForecastType(t,e);if(!r)return o.debug(`"${t}" does not support ${e} forecasts, skipping subscription`),this.unsubscribe&&(this._unsubscribe(),this.forecasts=[]),void(this._loaded=!0);const{timeZone:i}=this.config,s=`${t}|${r}|${i}`;(!this.unsubscribe||this.subscribedKey!==s||this.failedEntityState&&this.failedEntityState!==this.hass.states[t])&&(this._unsubscribe(),this.forecasts=[],this._loaded=!1,this.unsubscribe=It.subscribe(this.hass,t,r,s=>{const a=s&&this._toSectionForecasts(s,r,e,i);a?o.debug(`Received ${a.length} ${e} forecast entries`,t):this.failedEntityState=this.hass.states[t],null==a||a.filter(t=>"number"!=typeof t.temperature||"string"!=typeof t.condition).forEach(r=>o.warn(`${e} forecast entry of "${t}" at ${r.datetime} has no temperature or condition`)),this.forecasts=null!=a?a:[],this._loaded=!0}),this.subscribedKey=s)}_sourceForecastType(t,e){var r;return A.supportsForecast(this.hass,t,e)?e:"daily"!==e?null:null!==(r=["twice_daily","hourly"].find(e=>A.supportsForecast(this.hass,t,e)))&&void 0!==r?r:null}_toSectionForecasts(t,e,i,s){return e===i?t:"twice_daily"===e?Et(t,t=>r.fromISO(t,{setZone:!0}).set({hour:12,minute:0,second:0,millisecond:0})):((t,e)=>Et(t,t=>r.fromISO(t,{zone:e}).startOf("day")))(t,s)}_unsubscribe(){var t;null===(t=this.unsubscribe)||void 0===t||t.call(this),this.unsubscribe=null,this.subscribedKey=null,this.failedEntityState=null}};t([P({context:j,subscribe:!0}),l()],Tt.prototype,"hass",void 0),t([P({context:W,subscribe:!0}),l()],Tt.prototype,"config",void 0),t([i({attribute:!1,hasChanged:b})],Tt.prototype,"currentDate",void 0),t([l()],Tt.prototype,"forecasts",void 0),t([i({type:Boolean,reflect:!0,attribute:"data-loaded"})],Tt.prototype,"_loaded",void 0);var Dt=class extends Tt{resolveForecastType(){return this.config.forecast_strip.forecast_type}resolveEntityId(){return this.config.forecast_strip.weather_entity}requiredAttribute(){const{attribute:t,attributeRequired:e}=this.config.forecast_strip;return e?t:null}renderSkeleton(){return T`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="strip" aria-busy="true" style=${this._stripStyle()}>
        ${Array.from({length:this.config.forecast_strip.count},()=>T`
          <div class="skeleton-item">
            <span class="skeleton skeleton--time"></span>
            <span class="skeleton skeleton--icon"></span>
            <span class="skeleton skeleton--label"></span>
            ${this.config.forecast_strip.hide_attribute?a:T`<span class="skeleton skeleton--attribute"></span>`}
          </div>
        `)}
      </div>
    `}renderForecast(t,e){const{sun_entity:r,timeZone:i,locale:s,temperatureUnit:a,temperatureSensor:o}=this.config,{count:n,animated_icons:l,weather_icon_type:h,round_temperatures:d,hide_sunrise_sunset:u,time_pattern:p,attribute:m,hide_attribute:b,attribute_icon:w,attribute_color:f,attribute_unit:g}=this.config.forecast_strip,v=this.currentDate,y=this.visibleRows(n,p);if(0===y.length)return T``;const k=t=>null===t?null:et(d?Math.round(t):t,this.config),_=null!=g?g:this.forecastAttributeUnit(m),$="precipitation"===m||"precipitation_probability"===m,x=y.map(({forecast:t})=>(t=>null!==t&&"precipitation_probability"===m?10*Math.round(t/10):t)(J(t,m))).map(t=>$&&0===t?null:t),C=t=>b?null:{icon:w,color:f,value:null===t?null:Y(et(t,this.config),_)},S="hourly"===e?A.getSensorTemperature(this.hass,o,a):null,I=y.map(({forecast:t,at:r,label:i,isNight:s,isCurrent:o},n)=>{var c,d,u;const p="daily"===e&&null!==(c=t.templow)&&void 0!==c?c:null,m=o&&null!==S?S:null!==(d=t.temperature)&&void 0!==d?d:null;return{at:r,item:{label:i,condition:null!==(u=t.condition)&&void 0!==u?u:"",isNight:s,animatedIcon:l,weatherIconType:h,temperature:k(null===p||null===m?m:Math.max(m,p)),temperatureLow:null===p?null:k(null===m?p:Math.min(m,p)),temperatureUnit:a,attribute:C(x[n])}}}),z=y[y.length-1].at,{sunrise:E,sunset:D}=u||"hourly"!==e?{sunrise:null,sunset:null}:A.getNextSunEvents(this.hass,r,i),M=[...I,...[["sunrise",E],["sunset",D]].flatMap(([t,e])=>e&&e.startOf("minute")>=v.startOf("minute")&&e<=z?[{kind:t,at:e}]:[]).map(({kind:t,at:e})=>({at:e,item:{label:e.setLocale(s).toFormat(p),condition:t,isNight:!1,animatedIcon:l,weatherIconType:h,sunEvent:{kind:t,label:c.t(s,"sunrise"===t?"misc.sunrise":"misc.sunset")},attribute:C(null)}}))].sort((t,e)=>t.at.toMillis()-e.at.toMillis()).slice(0,n);return T`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="strip" style=${this._stripStyle()}>
        ${M.map(({item:t})=>T`<clock-weather-card-forecast-strip-item .item=${t}></clock-weather-card-forecast-strip-item>`)}
      </div>
    `}_stripStyle(){const{font_size:t}=this.config.forecast_strip;return t?`font-size: ${t}; --cwc-strip-icon-size: 2.5em`:""}};Dt=t([v("clock-weather-card-forecast-strip")],Dt);var Mt=class extends L{render(){const{label:t,condition:e,isNight:r,animatedIcon:i,weatherIconType:s,lowLabel:o,highLabel:n,barLowPercent:c,barHighPercent:l,gradientStops:h,showCurrentIndicator:d,currentTempPercent:u}=this.item,p=h.map(t=>`${t.color} ${t.percent}%`).join(", ");return T`
      <span class="label" title=${t}>${t}</span>
      <clock-weather-card-icon
        .weatherState=${e}
        .isNight=${r}
        .animatedIcon=${i}
        .weatherIconType=${s}
      ></clock-weather-card-icon>
      <span class="temperature-low">${null!=o?o:a}</span>
      <div class="bar-track">
        <div class="bar-fill" style=${`left: ${c}%; right: ${100-l}%; background: linear-gradient(to right, ${p});`}></div>
        ${d?T`<div class="dot" style=${`--_dot-left: ${u}%;`}></div>`:a}
      </div>
      <span class="temperature-high">${null!=n?n:a}</span>
    `}};t([i({attribute:!1})],Mt.prototype,"item",void 0),Mt=t([v("clock-weather-card-forecast-list-item")],Mt);var Nt=class extends Tt{resolveForecastType(){return this.config.forecast_list.forecast_type}resolveEntityId(){return this.config.forecast_list.weather_entity}requiredAttribute(){return this.config.forecast_list.attribute}renderSkeleton(){return T`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="rows" aria-busy="true" style=${this._rowsStyle()}>
        ${Array.from({length:this.config.forecast_list.count},()=>T`
          <span class="skeleton skeleton--label"></span>
          <span class="skeleton skeleton--icon"></span>
          <span class="skeleton skeleton--temperature"></span>
          <span class="skeleton skeleton--bar"></span>
          <span class="skeleton skeleton--temperature"></span>
        `)}
      </div>
    `}renderForecast(t,e){const{gradient:r,animated_icons:i,weather_icon_type:s,attribute:a}=this.config.forecast_list,o="temperature"===a?this._temperatureBars(t,e):this._attributeBars(a);if(0===o.length)return T``;const n=f(r),c=o.flatMap(t=>t.span?[t.span.from,t.span.to]:[]),l=Math.min(...c),h=Math.max(...c)-l,d=t=>0===h?50:Math.max(0,Math.min(100,(t-l)/h*100));return T`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="rows" style=${this._rowsStyle()}>
        ${o.map(({row:t,lowLabel:e,highLabel:r,span:a,current:o})=>{var c;const l={label:t.label,condition:null!==(c=t.forecast.condition)&&void 0!==c?c:"",isNight:t.isNight,animatedIcon:i,weatherIconType:s,lowLabel:e,highLabel:r,barLowPercent:a?d(a.from):0,barHighPercent:a?d(a.to):0,gradientStops:a?_(n,a.from,a.to):[],showCurrentIndicator:null!==o,currentTempPercent:null===o?0:d(o)};return T`<clock-weather-card-forecast-list-item .item=${l}></clock-weather-card-forecast-list-item>`})}
      </div>
    `}_rowsStyle(){const{row_height:t,bar_thickness:e,font_size:r}=this.config.forecast_list,i=r?`; --cwc-list-font-size: ${r}; --cwc-list-icon-size: max(${t}, 2em)`:"";return`--cwc-list-row-height: ${t}; --cwc-list-bar-thickness: ${(t=>{const e=/^(\d+(?:\.\d+)?)%$/.exec(t.trim());return e?`calc(var(--cwc-list-row-height) * ${Number(e[1])/100})`:t})(e)}${i}`}_temperatureBars(t,e){const{count:r,round_temperatures:i,hide_current_temp_indicator:s,attribute_unit:a,time_pattern:n}=this.config.forecast_list,{temperatureUnit:c,temperatureSensor:l}=this.config,h=A.getCurrentTemperature(this.hass,t,l,c);null!==h||s||o.debug(`Temperature of "${null!=l?l:t}" is not numeric, hiding the current temperature indicator`);const d=null===h?null:p(h,c),u="hourly"===e,m=t=>Y(et(i?Math.round(t):t,this.config),null!=a?a:c);return this.visibleRows(r,n).map((t,e,r)=>{var i;const a=(u?[t.forecast.temperature,0===e?null!=h?h:t.forecast.temperature:r[e-1].forecast.temperature]:[null!==(i=t.forecast.templow)&&void 0!==i?i:t.forecast.temperature,t.forecast.temperature]).filter(t=>"number"==typeof t);if(!u&&t.isCurrent&&null!==h&&a.push(h),0===a.length)return{row:t,lowLabel:"–",highLabel:"–",span:null,current:null};const o=Math.min(...a),n=Math.max(...a);return{row:t,lowLabel:m(o),highLabel:m(n),span:{from:p(o,c),to:p(n,c)},current:t.isCurrent&&!s?d:null}})}_attributeBars(t){const{attribute_unit:e,count:r,time_pattern:i}=this.config.forecast_list,s=null!=e?e:this.forecastAttributeUnit(t);return this.visibleRows(r,i).map(e=>{const r=J(e.forecast,t);return{row:e,lowLabel:null,highLabel:null===r?null:Y(et(r,this.config),s),span:null===r?null:{from:Math.min(0,r),to:Math.max(0,r)},current:null}})}};Nt=t([v("clock-weather-card-forecast-list")],Nt);var Ut=d`

  ha-card.clickable {
    cursor: pointer;
  }

  h1.card-header {
    padding-bottom: 0px;
  }

  clock-weather-card-error hui-error-card {
    overflow-wrap: anywhere;
  }

  clock-weather-card-header {
    display: grid;
    /* Spare width is spread evenly around icon and text; once it runs out, the text shrinks next to the icon. */
    grid-template-columns: auto minmax(0, max-content);
    justify-content: space-evenly;
    column-gap: 8px;
    align-items: center;
    container-type: inline-size;
  }

  clock-weather-card-header > clock-weather-card-icon {
    display: block;
    justify-self: center;
    /* The box fits the painted area of all header icons: x 16-112, y 16-114 of the 128-unit canvas (wind-alert overflows to 116.5). */
    width: calc(var(--cwc-header-icon-size, 9rem) * 96 / 98);
  }

  @supports (width: 1cqi) {
    clock-weather-card-header > clock-weather-card-icon {
      /* By default about 35% of the card at most; a configured weather_icon_size takes whatever width it needs. */
      width: calc(var(--cwc-header-icon-size, min(35cqi * 98 / 96, max(var(--cwc-header-rows-height, 0px), 9rem))) * 96 / 98);
    }
  }

  /* Meteocons clouds are near-white and vanish on light backgrounds without an outline. */
  clock-weather-card-icon img {
    filter: drop-shadow(0 0 1px rgb(0 0 0 / 0.35));
  }

  clock-weather-card-header > clock-weather-card-icon img {
    display: block;
    /* Margins are relative to the 96-unit box width: crop 16 units left, top and right, 14 at the bottom. */
    width: calc(100% * 128 / 96);
    margin: calc(-100% * 16 / 96) calc(-100% * 16 / 96) calc(-100% * 14 / 96);
  }

  clock-weather-card-header-details {
    display: flex;
    flex-direction: column;
    row-gap: 2px;
    justify-self: center;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
  }

  clock-weather-card-header-details-row {
    display: flex;
    align-items: center;
  }

  /* A flex gap would also pad around spacers, widening the row beyond its content. */
  clock-weather-card-header-details-row > :not(clock-weather-card-spacer-segment) ~ :not(clock-weather-card-spacer-segment) {
    margin-inline-start: 8px;
  }

  clock-weather-card-header-details-row > :is(clock-weather-card-icon-segment, clock-weather-card-weather-icon-segment) + :not(clock-weather-card-spacer-segment),
  clock-weather-card-header-details-row > :not(clock-weather-card-spacer-segment) + :is(clock-weather-card-icon-segment, clock-weather-card-weather-icon-segment) {
    margin-inline-start: 4px;
  }

  clock-weather-card-header-details-row > :not(clock-weather-card-spacer-segment) ~ clock-weather-card-spacer-segment + :not(clock-weather-card-spacer-segment) {
    margin-inline-start: 16px;
  }

  clock-weather-card-spacer-segment {
    flex: 1;
  }

  clock-weather-card-time-segment,
  clock-weather-card-date-segment,
  clock-weather-card-weather-segment,
  clock-weather-card-entity-segment,
  clock-weather-card-badge-segment {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
    padding-block: 0.2em;
    margin-block: -0.2em;
  }

  /* The default clock shrinks with the card: it is ~2.5em wide and the rows get 65% of the header minus the gap. */
  @supports (width: 1cqi) {
    clock-weather-card-header-details-row[default-rows] > clock-weather-card-time-segment {
      font-size: min(1em, 24cqi);
    }
  }

  /* Values such as the temperature never truncate; the condition text gives way instead. */
  clock-weather-card-weather-segment[attribute] {
    flex-shrink: 0;
  }

  /* rem, not em: padding that grows with the font makes large badges bulky. */
  clock-weather-card-badge-segment .badge {
    display: inline-block;
    padding: 0.125rem 0.375rem;
    border-radius: 0.375rem;
  }

  clock-weather-card-icon-segment {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  clock-weather-card-divider {
    display: block;
    background-color: var(--divider-color, rgba(127, 127, 127, 0.2));
    height: 1px;
    margin: 2px 0;
  }

  .card-content > :first-child > clock-weather-card-divider:first-child {
    display: none;
  }

  clock-weather-card-forecast-strip {
    display: block;
  }

  /* Text sizes are in em so sections.forecast_strip.font_size scales them; the icon follows only when it is set. */
  clock-weather-card-forecast-strip .strip {
    --_icon-size: var(--cwc-strip-icon-size, 40px);
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    /* Without it, the strip's min-content width is all its items, widening 1fr grid columns. */
    contain: inline-size;
  }

  clock-weather-card-forecast-strip-item,
  clock-weather-card-forecast-strip .skeleton-item {
    flex: 0 0 auto;
    min-width: var(--_icon-size);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 7px;
  }

  clock-weather-card-forecast-strip-item:first-of-type,
  clock-weather-card-forecast-strip .skeleton-item:first-of-type {
    padding-inline-start: 0;
  }

  clock-weather-card-forecast-strip-item:last-of-type {
    padding-inline-end: 0;
  }

  clock-weather-card-forecast-strip-item .time {
    font-size: 0.8em;
    opacity: 0.7;
    line-height: 1;
    max-width: 5em;
    overflow-x: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  clock-weather-card-forecast-strip-item clock-weather-card-icon {
    width: var(--_icon-size);
    height: var(--_icon-size);
    display: block;
  }

  clock-weather-card-forecast-strip-item clock-weather-card-icon img {
    width: 100%;
    height: 100%;
    display: block;
  }

  clock-weather-card-forecast-strip-item .label {
    display: inline-flex;
    font-size: 1em;
    font-weight: 500;
    line-height: 1;
    --mdc-icon-size: 1em;
  }

  clock-weather-card-forecast-strip-item .temperature-low {
    font-size: 0.8em;
    opacity: 0.6;
    line-height: 1;
    margin-top: 2px;
  }

  clock-weather-card-forecast-strip-item .attribute {
    font-size: 0.72em;
    opacity: 0.65;
    color: var(--info-color, #4a90d9);
    line-height: 1;
    min-height: 1em;
    display: flex;
    max-width: calc(5em / 0.72);
    align-items: center;
    gap: 2px;
    margin-top: 2px;
  }

  clock-weather-card-forecast-strip-item .attribute-value {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  clock-weather-card-forecast-strip-item .attribute--monochrome {
    color: inherit;
  }

  clock-weather-card-forecast-strip-item .attribute ha-icon {
    --mdc-icon-size: 1em;
    display: inline-flex;
    flex: none;
  }

  clock-weather-card-forecast-list {
    display: block;
  }

  /* One grid shared by all rows so text columns size to their widest cell while staying aligned. */
  clock-weather-card-forecast-list .rows {
    display: grid;
    --_icon-size: var(--cwc-list-row-height);
    grid-template-columns: max-content var(--_icon-size) max-content 1fr max-content;
    grid-auto-rows: minmax(var(--cwc-list-row-height), auto);
    align-items: center;
    column-gap: 8px;
    font-size: var(--cwc-list-font-size, 1rem);
    font-weight: 500;
    line-height: 1;
  }

  /* --cwc-list-icon-size is a max() set by font_size. */
  @supports (width: max(1px, 2px)) {
    clock-weather-card-forecast-list .rows {
      --_icon-size: var(--cwc-list-icon-size, var(--cwc-list-row-height));
    }
  }

  clock-weather-card-forecast-list-item {
    --_bar-thickness: var(--cwc-list-bar-thickness);
    --_dot-size: calc(var(--_bar-thickness) + 8px);
    display: contents;
  }

  @supports (width: max(1px, 2px)) {
    clock-weather-card-forecast-list-item {
      --_dot-size: max(14px, calc(var(--_bar-thickness) + 8px));
    }
  }

  clock-weather-card-forecast-list-item .label {
    max-width: 5em;
    overflow-x: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  clock-weather-card-forecast-list-item clock-weather-card-icon {
    width: var(--_icon-size);
    height: var(--_icon-size);
    display: block;
  }

  clock-weather-card-forecast-list-item clock-weather-card-icon img {
    width: 100%;
    height: 100%;
    display: block;
  }

  clock-weather-card-forecast-list-item .temperature-low,
  clock-weather-card-forecast-list-item .temperature-high {
    font-variant-numeric: tabular-nums;
    line-height: 1;
  }

  clock-weather-card-forecast-list-item .temperature-low {
    text-align: end;
  }

  clock-weather-card-forecast-list-item .temperature-high {
    text-align: start;
  }

  clock-weather-card-forecast-list-item .bar-track {
    position: relative;
    height: var(--_bar-thickness);
    min-height: 8px;
    background-color: var(--clock-weather-card-bar-track-color, rgba(114, 114, 114, 0.1));
    border-radius: 999px;
    box-shadow: 0 0 1px rgb(0 0 0 / 0.35);
  }

  @supports (color: color-mix(in srgb, red, red)) {
    clock-weather-card-forecast-list-item .bar-track {
      background-color: var(--clock-weather-card-bar-track-color, color-mix(in srgb, var(--secondary-text-color, #727272) 10%, transparent));
    }
  }

  clock-weather-card-forecast-list-item:dir(rtl) .bar-track {
    transform: scaleX(-1);
  }

  clock-weather-card-forecast-list-item .bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 999px;
  }

  clock-weather-card-forecast-list-item .dot {
    position: absolute;
    top: 50%;
    left: var(--_dot-left);
    width: var(--_dot-size);
    height: var(--_dot-size);
    border-radius: 50%;
    background: var(--card-background-color, var(--ha-card-background, #fff));
    border: 2px solid var(--primary-text-color, currentColor);
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    z-index: 1;
  }

  @supports (left: clamp(1px, 2px, 3px)) {
    clock-weather-card-forecast-list-item .dot {
      left: clamp(calc(var(--_dot-size) / 2), var(--_dot-left), calc(100% - var(--_dot-size) / 2));
    }
  }

  .skeleton {
    display: block;
    border-radius: 999px;
    background-color: var(--divider-color, rgba(127, 127, 127, 0.2));
    animation: cwc-skeleton-pulse 1.5s ease-in-out infinite;
  }

  @keyframes cwc-skeleton-pulse {
    50% {
      opacity: 0.4;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none;
    }
  }

  clock-weather-card-template-segment .skeleton--text {
    width: 4em;
    height: 0.8em;
  }

  clock-weather-card-forecast-strip .skeleton--time {
    width: 1.6em;
    height: 0.8em;
  }

  clock-weather-card-forecast-strip .skeleton--icon {
    width: calc(var(--_icon-size) * 0.7);
    height: calc(var(--_icon-size) * 0.7);
    margin: calc(var(--_icon-size) * 0.15);
    border-radius: 50%;
  }

  clock-weather-card-forecast-strip .skeleton--label {
    width: 1.8em;
    height: 1em;
  }

  clock-weather-card-forecast-strip .skeleton--attribute {
    width: 1.6em;
    height: 0.72em;
    margin-top: 2px;
  }

  clock-weather-card-forecast-list .skeleton--label {
    width: 2.4em;
    height: 1em;
  }

  clock-weather-card-forecast-list .skeleton--icon {
    width: 70%;
    aspect-ratio: 1;
    justify-self: center;
    border-radius: 50%;
  }

  clock-weather-card-forecast-list .skeleton--temperature {
    width: 1.8em;
    height: 1em;
  }

  clock-weather-card-forecast-list .skeleton--bar {
    height: var(--cwc-list-bar-thickness);
    min-height: 8px;
  }

`,Ft=t=>{const e=/^([\d.]+)(px|r?em)$/.exec(null!=t?t:"");return e?Number(e[1])*("px"===e[2]?1:14):null},Ot=({title:t,header:e,forecast_strip:r,forecast_list:i})=>{var s,a;const o=e.rows.reduce((t,e)=>{var r;return t+(null!==(r=Ft(e.font_size))&&void 0!==r?r:17)},0),n=36+(t?24:0)+(e.hide?0:Math.max(126,o))+(r.hide?0:88*(null!==(s=Ft(null!==(a=r.font_size)&&void 0!==a?a:void 0))&&void 0!==s?s:14)/14)+(i.hide?0:i.count*(({row_height:t,font_size:e})=>{var r,i;return Math.max(null!==(r=Ft(t))&&void 0!==r?r:28,2*(null!==(i=Ft(null!=e?e:void 0))&&void 0!==i?i:0))})(i));return Math.round(n/50)};window.customCards=window.customCards||[],window.customCards.some(t=>"clock-weather-card"===t.type)||window.customCards.push({type:"clock-weather-card",name:"Clock Weather Card",description:"Shows the current date/time in combination with the current weather and an iOS inspired weather forecast.",preview:!0,documentationURL:"https://github.com/pkissling/clock-weather-card",getEntitySuggestion:(t,e)=>e.startsWith("weather.")?{config:{type:"custom:clock-weather-card",entity:e}}:null}),console.info(`%c  CLOCK-WEATHER-CARD \n%c Version: ${n}`,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");var Pt=class extends s{constructor(...t){super(...t),this.preview=!1,this.currentDate=r.now(),this._clock=null}render(){if(!this.hass||!this.config)return T`<ha-card></ha-card>`;if(!this.resolved)return T`
        <clock-weather-card-error
          .message=${this.error}
          .config=${this.config}
        ></clock-weather-card-error>
      `;const{title:t,header:e,forecast_strip:r,forecast_list:i}=this.resolved,s="none"!==this.tapAction.action;return T`
      <ha-card
        class=${s?"clickable":""}
        role=${s?"button":a}
        tabindex=${s?0:a}
        @click=${s?this.handleTap:a}
        @keydown=${s?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.handleTap())}:a}
      >
        ${t?T`<h1 class="card-header">${t}</h1>`:""}
        <div class="card-content">
          ${e.hide?"":T`
            <clock-weather-card-header .currentDate=${this.currentDate}></clock-weather-card-header>
          `}
          ${r.hide?"":T`
            <clock-weather-card-forecast-strip .currentDate=${this.currentDate}></clock-weather-card-forecast-strip>
          `}
          ${i.hide?"":T`
            <clock-weather-card-forecast-list .currentDate=${this.currentDate}></clock-weather-card-forecast-list>
          `}
        </div>
      </ha-card>
      `}get tapAction(){var t,e;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.tap_action)&&void 0!==t?t:g}handleTap(){var t;this.dispatchEvent(new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:{entity:null===(t=this.config)||void 0===t?void 0:t.entity,tap_action:this.tapAction},action:"tap"}}))}setConfig(t){if(!(null==t?void 0:t.entity))throw k("entity");this.config=t}getCardSize(){return this._resolveConfig(),this.resolved?Ot(this.resolved):1}getGridOptions(){return{columns:12,min_columns:6}}static getStubConfig(t,e,r){var i;const s=t=>t.startsWith("weather."),a=null!==(i=e.find(s))&&void 0!==i?i:r.find(s);return a||o.warn("No weather entity found for the stub config"),{entity:a}}connectedCallback(){super.connectedCallback(),this._tryStart()}disconnectedCallback(){super.disconnectedCallback(),this._stopClock()}willUpdate(t){if(!t.has("config")&&!t.has("hass"))return;if(!t.has("config")&&this.resolved&&!this._relevantHassChanged())return;const e=this.resolved;this._resolveConfig(),this._relevantHassChanged()&&(this.providedHass=this.hass),this.resolved!==e&&this._stopClock(),this._tryStart()}_resolveConfig(){if(this.hass&&this.config)try{const t=$(this.config,this.hass);S(t,this.resolved)||(o.debug("Resolved config",t),this.resolved=t),this.providedConfig=this.resolved,this.error=void 0}catch(t){this.resolved=void 0,this.error=t instanceof Error?t.message:String(t),o.warn(`Invalid config: ${this.error}`)}}_relevantHassChanged(){const t=this.providedHass,e=this.hass;if(!t||!this.resolved)return!0;if(t.connection!==e.connection||t.config!==e.config||t.language!==e.language||t.locale!==e.locale)return!0;const{entity:r,sun_entity:i,temperatureSensor:s,forecast_strip:a,forecast_list:o,header:n}=this.resolved,c=n.rows.flatMap(t=>t.segments.map(t=>"entity_id"in t?t.entity_id:void 0)),l=[r,i,s,a.weather_entity,o.weather_entity,...c].filter(t=>null!=t);return l.some(r=>(r=>t.states[r]!==e.states[r])(r)||(r=>A.getDisplayPrecision(t,r)!==A.getDisplayPrecision(e,r))(r))}_tryStart(){if(this.resolved&&this.isConnected&&null===this._clock){const{header:t,locale:e,timeZone:i}=this.resolved,s=I(t);o.debug(`Starting clock with ${s?"per-second":"per-minute"} ticks`),this._clock=w(s,()=>{this.currentDate=r.now().setLocale(e).setZone(i)})}}_stopClock(){this._clock&&(o.debug("Stopping clock"),this._clock.stop()),this._clock=null}static async getConfigElement(){const{ClockWeatherCardEditor:t}=await(import("./clock-weather-card-editor-B-AnynEq.js"));return new t}static get styles(){return Ut}};t([i({attribute:!1})],Pt.prototype,"hass",void 0),t([O({context:j})],Pt.prototype,"providedHass",void 0),t([O({context:R}),i({type:Boolean})],Pt.prototype,"preview",void 0),t([l()],Pt.prototype,"config",void 0),t([l()],Pt.prototype,"resolved",void 0),t([O({context:W})],Pt.prototype,"providedConfig",void 0),t([l()],Pt.prototype,"error",void 0),t([l()],Pt.prototype,"currentDate",void 0),Pt=t([v("clock-weather-card")],Pt);export{Pt as ClockWeatherCard};