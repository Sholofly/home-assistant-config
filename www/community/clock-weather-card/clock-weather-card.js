import{A as t,B as e,D as r,E as i,F as s,I as a,L as o,M as n,N as c,O as l,P as h,R as d,T as u,_ as p,a as m,c as b,f as w,g,h as f,j as v,k as y,l as k,m as _,o as $,p as x,r as C,v as S,w as A,z as I}from"./config-UOhet33m.js";var E=class extends Event{constructor(t,e,r,i){super("context-request",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e,this.callback=r,this.subscribe=null!=i&&i}};var D=class{constructor(t,e,r,i){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(t,e)=>{this.unsubscribe&&(this.unsubscribe!==e&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=t,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(t,e)),this.unsubscribe=e},this.host=t,void 0!==e.context){var s;const t=e;this.context=t.context,this.callback=t.callback,this.subscribe=null!==(s=t.subscribe)&&void 0!==s&&s}else this.context=e,this.callback=r,this.subscribe=null!=i&&i;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new E(this.context,this.host,this.t,this.subscribe))}},T=class{get value(){return this.o}set value(t){this.setValue(t)}setValue(t,e=!1){const r=e||!Object.is(t,this.o);this.o=t,r&&this.updateObservers()}constructor(t){this.subscriptions=/* @__PURE__ */new Map,this.updateObservers=()=>{for(const[t,{disposer:e}]of this.subscriptions)t(this.o,e)},void 0!==t&&(this.value=t)}addCallback(t,e,r){if(!r)return void t(this.value);this.subscriptions.has(t)||this.subscriptions.set(t,{disposer:()=>{this.subscriptions.delete(t)},consumerHost:e});const{disposer:i}=this.subscriptions.get(t);t(this.value,i)}clearCallbacks(){this.subscriptions.clear()}},M=class extends Event{constructor(t,e){super("context-provider",{bubbles:!0,composed:!0}),this.context=t,this.contextTarget=e}},N=class extends T{constructor(t,e,r){var i,s;super(void 0!==e.context?e.initialValue:r),this.onContextRequest=t=>{var e;if(t.context!==this.context)return;const r=null!==(e=t.contextTarget)&&void 0!==e?e:t.composedPath()[0];r!==this.host&&(t.stopPropagation(),this.addCallback(t.callback,r,t.subscribe))},this.onProviderRequest=t=>{var e;if(t.context!==this.context)return;if((null!==(e=t.contextTarget)&&void 0!==e?e:t.composedPath()[0])===this.host)return;const r=/* @__PURE__ */new Set;for(const[i,{consumerHost:s}]of this.subscriptions)r.has(i)||(r.add(i),s.dispatchEvent(new E(this.context,s,i,!0)));t.stopPropagation()},this.host=t,void 0!==e.context?this.context=e.context:this.context=e,this.attachListeners(),null===(i=(s=this.host).addController)||void 0===i||i.call(s,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new M(this.context,this.host))}};function U({context:t}){return(e,r)=>{const i=/* @__PURE__ */new WeakMap;if("object"==typeof r)return{get(){return e.get.call(this)},set(t){return i.get(this).setValue(t),e.set.call(this,t)},init(e){return i.set(this,new N(this,{context:t,initialValue:e})),e}};{e.constructor.addInitializer(e=>{i.set(e,new N(e,{context:t}))});const s=Object.getOwnPropertyDescriptor(e,r);let a;if(void 0===s){const t=/* @__PURE__ */new WeakMap;a={get(){return t.get(this)},set(e){i.get(this).setValue(e),t.set(this,e)},configurable:!0,enumerable:!0}}else{const t=s.set;a={...s,set(e){i.get(this).setValue(e),null==t||t.call(this,e)}}}return void Object.defineProperty(e,r,a)}}}function z({context:t,subscribe:e}){return(r,i)=>{"object"==typeof i?i.addInitializer(function(){new D(this,{context:t,callback:t=>{r.set.call(this,t)},subscribe:e})}):r.constructor.addInitializer(r=>{new D(r,{context:t,callback:t=>{r[i]=t},subscribe:e})})}}var F=class extends a{createRenderRoot(){return this}},O=Symbol("clock-weather-card-config"),P=Symbol("clock-weather-card-hass"),L=Symbol("clock-weather-card-error-message"),R=class extends F{constructor(...t){super(...t),this.errorMessage=!1,this.severity="error",this._errorCard=null}render(){var t;return this._errorCard||(this._errorCard=document.createElement("hui-error-card")),this._errorCard.setConfig({type:"error",message:(t=this.message,d`${t.split(/"([^"]*)"/).map((t,e)=>e%2==1?d`<code>${t}</code>`:t)}`),origConfig:this.config}),this._errorCard.hass=this.hass,this._errorCard.preview=this.errorMessage,this._errorCard.severity=this.severity,d`${this._errorCard}`}};t([s({attribute:!1})],R.prototype,"message",void 0),t([z({context:P,subscribe:!0}),h()],R.prototype,"hass",void 0),t([z({context:L,subscribe:!0}),h()],R.prototype,"errorMessage",void 0),t([s({attribute:!1})],R.prototype,"config",void 0),t([s()],R.prototype,"severity",void 0),R=t([v("clock-weather-card-error")],R);var W=class extends F{constructor(...t){super(...t),this._settled=!1}render(){var t;const e=`weather.${"sunny"===this.weatherState&&this.isNight?"clear-night":this.weatherState}`,r=l.has(e)?l.t(this.config.locale,e):"";return d`<img src="${null!==(t=this._src)&&void 0!==t?t:o}" alt=${r} @load=${this._onImageDone} @error=${this._onImageDone} />`}willUpdate(t){if(!(t.has("weatherState")||t.has("isNight")||t.has("animatedIcon")||t.has("weatherIconType")))return;const{weatherIconType:e,weatherState:r,isNight:i,animatedIcon:s}=this,a=y.getWeatherIcon(e,s,r,i);a?a!==this._src&&(this._src=a,this._settled=!1):(n.warn(`No "${e}" icon for weather state "${r}", keeping the previous icon`),this._settled=!0)}_onImageDone(){this._settled=!0}};t([s()],W.prototype,"weatherState",void 0),t([s()],W.prototype,"isNight",void 0),t([s()],W.prototype,"animatedIcon",void 0),t([s()],W.prototype,"weatherIconType",void 0),t([z({context:O,subscribe:!0}),h()],W.prototype,"config",void 0),t([h()],W.prototype,"_src",void 0),t([s({type:Boolean,reflect:!0,attribute:"data-settled"})],W.prototype,"_settled",void 0),W=t([v("clock-weather-card-icon")],W);var j=class extends F{render(){return d`<span>${this.currentDate.toFormat(this.datePattern||"DDD")}</span>`}};function q(t,e){const r=t[e];return"number"==typeof r&&Number.isFinite(r)?r:null}function H(t,e){return e?/^\p{L}/u.test(e)?`${t} ${e}`:`${t}${e}`:t}t([s({attribute:!1})],j.prototype,"currentDate",void 0),t([s({attribute:!1})],j.prototype,"datePattern",void 0),j=t([v("clock-weather-card-date-segment")],j);var G={comma_decimal:["en-US","en"],decimal_comma:["de","es","it"],space_comma:["fr","sv","cs"],quote_decimal:["de-CH"],system:void 0};function V(t,{locale:e,numberFormat:r},i=null){const s=0===Number(t.toFixed(null!=i?i:3))?0:t;if("none"===r)return null===i?String(t):s.toFixed(i);const a=null===i?{}:{minimumFractionDigits:i,maximumFractionDigits:i};return new Intl.NumberFormat(r in G?G[r]:e,a).format(s)}var B=class extends F{constructor(...t){super(...t),this.showUnit=!0}render(){const t=this.attribute?f.getEntityAttribute(this.hass,this.entityId,this.attribute):f.getEntityState(this.hass,this.entityId);if(null==t)return d``;const e=this.resolveUnit(),{temperatureUnit:r}=this.config,i=S(t,e,r),s=this.attribute?null:f.getDisplayPrecision(this.hass,this.entityId);if(null!==i)return this.renderValue(V(i,this.config,s),r);var a;this.showUnit&&void 0===this.unit&&null===e&&n.warn(`Unit attribute "${null!==(a=this.unitAttribute)&&void 0!==a?a:"unit_of_measurement"}" not found for entity "${this.entityId}"`);const o=this.isNumeric(t,e,s)?V(Number(t),this.config,s):String(t);return this.renderValue(o,e)}renderValue(t,e){return this.showUnit?d`<span>${void 0===this.unit?H(t,e):`${t}${this.unit}`}</span>`:d`<span>${t}</span>`}isNumeric(t,e,r){if("number"==typeof t)return!0;if(""===t||Number.isNaN(Number(t)))return!1;const i=void 0!==f.getEntityAttribute(this.hass,this.entityId,"state_class");return null!==e||i||null!==r}resolveUnit(){const t=this.unitAttribute?f.getEntityAttribute(this.hass,this.entityId,this.unitAttribute):f.getEntityUnitOfMeasurement(this.hass,this.entityId);return null==t||""===t?null:String(t)}};t([z({context:P,subscribe:!0}),h()],B.prototype,"hass",void 0),t([z({context:O,subscribe:!0}),h()],B.prototype,"config",void 0),t([s()],B.prototype,"entityId",void 0),t([s()],B.prototype,"attribute",void 0),t([s({type:Boolean})],B.prototype,"showUnit",void 0),t([s()],B.prototype,"unit",void 0),t([s()],B.prototype,"unitAttribute",void 0),B=t([v("clock-weather-card-entity-segment")],B);var Z=class extends F{render(){return d`<ha-icon icon="${this.icon}" style="--mdc-icon-size: 1em"></ha-icon>`}};t([s()],Z.prototype,"icon",void 0),Z=t([v("clock-weather-card-icon-segment")],Z);var K=class extends F{render(){return d`<span></span>`}};K=t([v("clock-weather-card-spacer-segment")],K);var Q=class extends F{constructor(...t){super(...t),this.result=null,this.unsubscribe=null}render(){return null===this.result?d`<span class="skeleton skeleton--text"></span>`:d`<span>${this.result}</span>`}shouldUpdate(t){return[...t.keys()].some(t=>"hass"!==t)||this.connectionChanged(t)}updated(t){(t.has("template")||this.connectionChanged(t))&&this.subscribe()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.subscribe()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeTemplate()}connectionChanged(t){var e,r;return t.has("hass")&&(null===(e=t.get("hass"))||void 0===e?void 0:e.connection)!==(null===(r=this.hass)||void 0===r?void 0:r.connection)}subscribe(){if(this.unsubscribeTemplate(),!this.hass)return;const{template:t}=this;this.unsubscribe=f.subscribeTemplate(this.hass,t,e=>{var r,i;"error"in e?(n.warn(`Template "${t}" failed to render: ${e.error}`),null!==(i=this.result)&&void 0!==i||(this.result="")):this.result=String(null!==(r=e.result)&&void 0!==r?r:"")}).catch(e=>{var r;return n.error(`Error subscribing to template "${t}"`,e),null!==(r=this.result)&&void 0!==r||(this.result=""),null})}unsubscribeTemplate(){var t;null===(t=this.unsubscribe)||void 0===t||t.then(async t=>null==t?void 0:t()).catch(t=>n.debug("Error unsubscribing from template, connection may already be closed",t)),this.unsubscribe=null}};t([z({context:P,subscribe:!0}),h()],Q.prototype,"hass",void 0),t([s()],Q.prototype,"template",void 0),t([h()],Q.prototype,"result",void 0),Q=t([v("clock-weather-card-template-segment")],Q);var X=class extends F{render(){return d`<span>${this.text}</span>`}};t([s()],X.prototype,"text",void 0),X=t([v("clock-weather-card-text-segment")],X);var J=class extends F{render(){return d`<span>${this.currentDate.toFormat(this.timePattern||"t")}</span>`}};t([s({attribute:!1})],J.prototype,"currentDate",void 0),t([s({attribute:!1})],J.prototype,"timePattern",void 0),J=t([v("clock-weather-card-time-segment")],J);var Y=class extends F{render(){var t;const e=f.getEntityState(this.hass,null!==(t=this.entityId)&&void 0!==t?t:this.config.entity);if(!e)return d``;const r=f.isNight(this.hass,this.config.sun_entity),i=y.getWeatherMdiIcon(e,r);return d`<clock-weather-card-icon-segment .icon=${i}></clock-weather-card-icon-segment>`}};t([z({context:P,subscribe:!0}),h()],Y.prototype,"hass",void 0),t([z({context:O,subscribe:!0}),h()],Y.prototype,"config",void 0),t([s()],Y.prototype,"entityId",void 0),Y=t([v("clock-weather-card-weather-icon-segment")],Y);var tt=class extends F{constructor(...t){super(...t),this.showUnit=!0}render(){const{entity:t,locale:e,temperatureUnit:r,temperatureSensor:i,sun_entity:s,header:a}=this.config,o=(t,e=null)=>V(a.round_temperatures&&null===e?Math.round(t):t,this.config,e);if(this.attribute){var c;if(!this.unitAttribute&&f.isWeatherTemperatureAttribute(this.attribute)){var h;const e="temperature"===this.attribute?f.getCurrentTemperature(this.hass,t,i,r):f.getWeatherTemperature(this.hass,t,this.attribute,r);if(null===e)return d``;const s="temperature"===this.attribute&&i?f.getDisplayPrecision(this.hass,i):null;return d`<span>${o(e,s)}${this.showUnit?null!==(h=this.unit)&&void 0!==h?h:r:""}</span>`}const e=f.getEntityAttribute(this.hass,t,this.attribute);if(void 0===e&&n.warn(`Attribute "${this.attribute}" not found on weather entity "${t}"`),null==e)return d``;const s=this.unitAttribute?f.getEntityAttributeString(this.hass,t,this.unitAttribute):f.getWeatherAttributeUnit(this.hass,t,this.attribute),a=S(e,s,r);if(null!==a)return d`<span>${o(a)}${this.showUnit?null!==(c=this.unit)&&void 0!==c?c:r:""}</span>`;const l="number"==typeof e?V(e,this.config):String(e);return this.showUnit?d`<span>${void 0===this.unit?H(l,s):`${l}${this.unit}`}</span>`:d`<span>${l}</span>`}const u=f.getEntityState(this.hass,t);if(!u)return d``;const p="sunny"===u||"clear-night"===u?f.isNight(this.hass,s)?"clear-night":"sunny":u,m=l.t(e,`weather.${p}`);return d`<span>${m}</span>`}};t([z({context:P,subscribe:!0}),h()],tt.prototype,"hass",void 0),t([z({context:O,subscribe:!0}),h()],tt.prototype,"config",void 0),t([s()],tt.prototype,"attribute",void 0),t([s({type:Boolean})],tt.prototype,"showUnit",void 0),t([s()],tt.prototype,"unit",void 0),t([s()],tt.prototype,"unitAttribute",void 0),tt=t([v("clock-weather-card-weather-segment")],tt);var et=class extends F{render(){return d`${this.rowConfig.segments.map(t=>this.renderSegment(t))}`}renderSegment(t){switch(t.type){case"time":return d`<clock-weather-card-time-segment
          .currentDate=${this.currentDate}
          .timePattern=${t.time_pattern}
        ></clock-weather-card-time-segment>`;case"date":return d`<clock-weather-card-date-segment
          .currentDate=${this.currentDate}
          .datePattern=${t.date_pattern}
        ></clock-weather-card-date-segment>`;case"weather":var e;return d`<clock-weather-card-weather-segment
          .attribute=${t.attribute}
          .showUnit=${null===(e=t.show_unit)||void 0===e||e}
          .unit=${t.unit}
          .unitAttribute=${t.unit_attribute}
        ></clock-weather-card-weather-segment>`;case"entity":var r;return d`<clock-weather-card-entity-segment
          .entityId=${t.entity_id}
          .attribute=${t.attribute}
          .showUnit=${null===(r=t.show_unit)||void 0===r||r}
          .unit=${t.unit}
          .unitAttribute=${t.unit_attribute}
        ></clock-weather-card-entity-segment>`;case"icon":return d`<clock-weather-card-icon-segment
          .icon=${t.icon}
        ></clock-weather-card-icon-segment>`;case"weather_icon":return d`<clock-weather-card-weather-icon-segment
          .entityId=${t.entity_id}
        ></clock-weather-card-weather-icon-segment>`;case"text":return d`<clock-weather-card-text-segment
          .text=${t.text}
        ></clock-weather-card-text-segment>`;case"template":return d`<clock-weather-card-template-segment
          .template=${t.template}
        ></clock-weather-card-template-segment>`;case"spacer":return d`<clock-weather-card-spacer-segment></clock-weather-card-spacer-segment>`}}};t([s({attribute:!1})],et.prototype,"rowConfig",void 0),t([s({attribute:!1})],et.prototype,"currentDate",void 0),et=t([v("clock-weather-card-header-details-row")],et);var rt=class extends F{render(){return d`${this.config.header.rows.map(t=>{var e,r;return d`
        <clock-weather-card-header-details-row
          style="font-size: ${null!==(e=t.font_size)&&void 0!==e?e:""}; justify-content: ${null!==(r=t.alignment)&&void 0!==r?r:""}"
          .rowConfig=${t}
          .currentDate=${this.currentDate}
        ></clock-weather-card-header-details-row>
      `})}`}};t([z({context:O,subscribe:!0}),h()],rt.prototype,"config",void 0),t([s({attribute:!1})],rt.prototype,"currentDate",void 0),rt=t([v("clock-weather-card-header-details")],rt);var{I:it}=I,st=2,at=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},ot=(t,e)=>{var r;const i=t._$AN;if(void 0===i)return!1;for(const s of i)null===(r=s._$AO)||void 0===r||r.call(s,e,!1),ot(s,e);return!0},nt=t=>{let e,r;do{if(void 0===(e=t._$AM))break;r=e._$AN,r.delete(t),t=e}while(0===(null==r?void 0:r.size))},ct=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(void 0===r)e._$AN=r=/* @__PURE__ */new Set;else if(r.has(t))break;r.add(t),dt(e)}};function lt(t){void 0!==this._$AN?(nt(this),this._$AM=t,ct(this)):this._$AM=t}function ht(t,e=!1,r=0){const i=this._$AH,s=this._$AN;if(void 0!==s&&0!==s.size)if(e)if(Array.isArray(i))for(let a=r;a<i.length;a++)ot(i[a],!1),nt(i[a]);else null!=i&&(ot(i,!1),nt(i));else ot(this,t)}var dt=t=>{var e,r;t.type==st&&(null!==(e=t._$AP)&&void 0!==e||(t._$AP=ht),null!==(r=t._$AQ)&&void 0!==r||(t._$AQ=lt))},ut=class extends at{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),ct(this),this.isConnected=t._$AU}_$AO(t,e=!0){var r,i;t!==this.isConnected&&(this.isConnected=t,t?null===(r=this.reconnected)||void 0===r||r.call(this):null===(i=this.disconnected)||void 0===i||i.call(this)),e&&(ot(this,t),nt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}},pt=/* @__PURE__ */new WeakMap,mt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ut{render(t){return o}update(t,[e]){var r;const i=e!==this.G;return i&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=null===(r=t.options)||void 0===r?void 0:r.host,this.rt(this.ct=t.element)),o}rt(t){if(void 0!==this.G)if(this.isConnected||(t=void 0),"function"==typeof this.G){var e;const r=null!==(e=this.ht)&&void 0!==e?e:globalThis;let i=pt.get(r);void 0===i&&(i=/* @__PURE__ */new WeakMap,pt.set(r,i)),void 0!==i.get(this.G)&&this.G.call(this.ht,void 0),i.set(this.G,t),void 0!==t&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){var t,e,r;return"function"==typeof this.G?null===(t=pt.get(null!==(e=this.ht)&&void 0!==e?e:globalThis))||void 0===t?void 0:t.get(this.G):null===(r=this.G)||void 0===r?void 0:r.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),bt=class extends F{constructor(...t){super(...t),this.resizeObserver=new ResizeObserver(([t])=>{this.style.setProperty("--cwc-header-rows-height",`${t.target.offsetHeight}px`)}),this.observeDetails=t=>{this.resizeObserver.disconnect(),t&&this.resizeObserver.observe(t)}}render(){const t=f.getEntityState(this.hass,this.config.entity),e=f.isNight(this.hass,this.config.sun_entity),{weather_icon_size:r,animated_icons:i,weather_icon_type:s}=this.config.header;return d`
      <clock-weather-card-icon
        style=${r?`--cwc-header-icon-size: ${r}`:o}
        .weatherState=${t}
        .isNight=${e}
        .animatedIcon=${i}
        .weatherIconType=${s}
      ></clock-weather-card-icon>
      <clock-weather-card-header-details ${mt(this.observeDetails)} .currentDate=${this.currentDate}></clock-weather-card-header-details>
    `}};t([z({context:P,subscribe:!0}),h()],bt.prototype,"hass",void 0),t([z({context:O,subscribe:!0}),h()],bt.prototype,"config",void 0),t([s({attribute:!1})],bt.prototype,"currentDate",void 0),bt=t([v("clock-weather-card-header")],bt);var wt=class extends F{render(){const{label:t,condition:e,isNight:r,animatedIcon:i,weatherIconType:s,temperature:a,temperatureLow:n,temperatureUnit:c,sunEvent:l,attribute:h}=this.item,u="monochrome"===s?"attribute attribute--monochrome":"attribute";return d`
      <span class="time" title=${t}>${t}</span>
      <clock-weather-card-icon
        .weatherState=${e}
        .isNight=${r}
        .animatedIcon=${i}
        .weatherIconType=${s}
      ></clock-weather-card-icon>
      ${l?d`<span class="label"><ha-icon icon=${"sunrise"===l.kind?"mdi:arrow-up":"mdi:arrow-down"} title=${l.label} aria-label=${l.label}></ha-icon></span>`:d`<span class="label">${null===a?"–":`${a}${c}`}</span>`}
      ${null==n?o:d`<span class="temperature-low">${n}${c}</span>`}
      ${h?d`<span class=${u} style=${h.color?`color: ${h.color}`:o}>${null!==h.value?d`${h.icon?d`<ha-icon icon=${h.icon}></ha-icon>`:o}<span class="attribute-value">${h.value}</span>`:o}</span>`:o}
    `}};t([s({attribute:!1})],wt.prototype,"item",void 0),wt=t([v("clock-weather-card-forecast-strip-item")],wt);var gt=class extends F{render(){return d``}};gt=t([v("clock-weather-card-divider")],gt);var ft=new class{constructor(){this.registries=/* @__PURE__ */new WeakMap}subscribe(t,e,r,i){var s;const a=this.entriesFor(t),o=`${e}|${r}`,c=null!==(s=a.get(o))&&void 0!==s?s:this.open(t,a,o,e,r);return c.latest&&i(c.latest),c.listeners.add(i),()=>{!c.listeners.delete(i)||c.listeners.size>0||(a.get(o)===c&&a.delete(o),n.debug(`Unsubscribing from ${r} forecast`,e),c.unsubscribe.then(async t=>{try{await(null==t?void 0:t())}catch(i){n.debug(`Error unsubscribing from ${r} forecast, connection may already be closed`,e,i)}}))}}open(t,e,i,s,a){const o={listeners:/* @__PURE__ */new Set,latest:null,unsubscribe:Promise.resolve(null)};return o.unsubscribe=f.subscribeForecast(t,s,a,t=>{var e;t.forecast||n.warn(`Received ${a} forecast event without forecast entries`,s);const i=(null!==(e=t.forecast)&&void 0!==e?e:[]).filter(t=>!!r.fromISO(t.datetime).isValid||(n.warn(`Ignoring ${a} forecast entry of "${s}" with invalid datetime "${t.datetime}"`),!1));o.latest=i,o.listeners.forEach(t=>t(i))}).then(t=>(n.debug(`Subscribed to ${a} forecast`,s),t)).catch(t=>(n.error(`Error subscribing to ${a} forecast`,t),e.get(i)===o&&e.delete(i),o.listeners.forEach(t=>t(null)),null)),e.set(i,o),o}entriesFor(t){let e=this.registries.get(t.connection);return e||(e=/* @__PURE__ */new Map,this.registries.set(t.connection,e)),e}},vt=class extends F{constructor(...t){super(...t),this.forecasts=[],this._loaded=!1,this.unsubscribe=null,this.subscribedKey=null,this.failedEntityState=null}render(){const t=this.resolveEntityId(),e=this.resolveForecastType();if(!this._sourceForecastType(t,e))return this._renderWarning(x(t,e));if(!this._loaded)return this.renderSkeleton();const r=this.requiredAttribute();return null!==r&&this.forecasts.length>0&&!this.forecasts.some(t=>r in t)?this._renderWarning(w(t,r)):this.renderForecast(t,e)}connectedCallback(){super.connectedCallback(),this._syncSubscription()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribe()}willUpdate(t){(t.has("config")||t.has("hass"))&&this._syncSubscription()}visibleRows(t,e){const i=this.currentDate,{locale:s,timeZone:a,sun_entity:o,temperatureUnit:c}=this.config,h=f.getEntityAttributeString(this.hass,this.resolveEntityId(),"temperature_unit"),d=t=>g(t,h,c),u=this.forecasts.map(t=>({forecast:Object.fromEntries(Object.entries(t).map(([t,e])=>[t,"number"!=typeof e||"templow"!==t&&!f.isWeatherTemperatureAttribute(t)?e:d(e)])),at:r.fromISO(t.datetime).setLocale(s).setZone(a)})),p=t=>{t>0||0===u.length||n.warn(`No current or upcoming ${this.resolveForecastType()} forecast entries for "${this.resolveEntityId()}"`)};if("hourly"===this.resolveForecastType()){const r=u.findIndex(({at:t})=>t>i);if(-1===r)return p(0),[];const a=Math.max(0,r-1),n=l.t(s,"misc.now");return u.slice(a,a+t).map(({forecast:t,at:r})=>{const s=r<=i;return{forecast:t,at:r,isCurrent:s,label:s?n:r.toFormat(e),isNight:f.isNight(this.hass,o,s?void 0:r)}})}const m=i.toISODate(),b=l.t(s,"misc.today"),w=u.filter(({at:t})=>t.toISODate()>=m);return p(w.length),w.slice(0,t).map(({forecast:t,at:e})=>{const r=e.toISODate()===m;return{forecast:t,at:e,isCurrent:r,label:r?b:e.toFormat("ccc"),isNight:r&&f.isNight(this.hass,o)}})}forecastAttributeUnit(t){return f.isWeatherTemperatureAttribute(t)?this.config.temperatureUnit:f.getForecastAttributeUnit(this.hass,this.resolveEntityId(),t)}_renderWarning(t){return d`
      <clock-weather-card-divider></clock-weather-card-divider>
      <clock-weather-card-error severity="warning" .message=${t.message}></clock-weather-card-error>
    `}_syncSubscription(){if(!this.isConnected||!this.hass||!this.config)return;const t=this.resolveEntityId(),e=this.resolveForecastType(),i=this._sourceForecastType(t,e);if(!i)return n.debug(`"${t}" does not support ${e} forecasts, skipping subscription`),this.unsubscribe&&(this._unsubscribe(),this.forecasts=[]),void(this._loaded=!0);const s=`${t}|${i}`;(!this.unsubscribe||this.subscribedKey!==s||this.failedEntityState&&this.failedEntityState!==this.hass.states[t])&&(this._unsubscribe(),this.forecasts=[],this._loaded=!1,this.unsubscribe=ft.subscribe(this.hass,t,i,s=>{const a=s&&"twice_daily"===i?(t=>{const e=/* @__PURE__ */new Map;for(const o of t){var i,s,a;const t=r.fromISO(o.datetime,{setZone:!0}).startOf("day").toISO(),n=null!==(i=e.get(t))&&void 0!==i?i:{};null!==(a=n[s=!1===o.is_daytime?"night":"day"])&&void 0!==a||(n[s]=o),e.set(t,n)}return[...e].map(([t,{day:e,night:r}])=>{var i;const s={...r,...e};delete s.is_daytime;const a=[e,r].map(t=>null==t?void 0:t.precipitation_probability).filter(t=>"number"==typeof t);return{...s,datetime:t,temperature:(null!=e?e:r).temperature,templow:e?null==r?void 0:r.temperature:void 0,condition:null!==(i=null==e?void 0:e.condition)&&void 0!==i?i:null==r?void 0:r.condition,precipitation_probability:a.length>0?Math.max(...a):s.precipitation_probability}})})(s):s;a?n.debug(`Received ${a.length} ${e} forecast entries`,t):this.failedEntityState=this.hass.states[t],null==a||a.filter(t=>"number"!=typeof t.temperature||"string"!=typeof t.condition).forEach(r=>n.warn(`${e} forecast entry of "${t}" at ${r.datetime} has no temperature or condition`)),this.forecasts=null!=a?a:[],this._loaded=!0}),this.subscribedKey=s)}_sourceForecastType(t,e){return f.supportsForecast(this.hass,t,e)?e:"daily"===e&&f.supportsForecast(this.hass,t,"twice_daily")?"twice_daily":null}_unsubscribe(){var t;null===(t=this.unsubscribe)||void 0===t||t.call(this),this.unsubscribe=null,this.subscribedKey=null,this.failedEntityState=null}};t([z({context:P,subscribe:!0}),h()],vt.prototype,"hass",void 0),t([z({context:O,subscribe:!0}),h()],vt.prototype,"config",void 0),t([s({attribute:!1,hasChanged:u})],vt.prototype,"currentDate",void 0),t([h()],vt.prototype,"forecasts",void 0),t([s({type:Boolean,reflect:!0,attribute:"data-loaded"})],vt.prototype,"_loaded",void 0);var yt=class extends vt{resolveForecastType(){return this.config.forecast_strip.forecast_type}resolveEntityId(){return this.config.forecast_strip.weather_entity}requiredAttribute(){const{attribute:t,attributeRequired:e}=this.config.forecast_strip;return e?t:null}renderSkeleton(){return d`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="strip" aria-busy="true">
        ${Array.from({length:this.config.forecast_strip.count},()=>d`
          <div class="skeleton-item">
            <span class="skeleton skeleton--time"></span>
            <span class="skeleton skeleton--icon"></span>
            <span class="skeleton skeleton--label"></span>
            ${this.config.forecast_strip.hide_attribute?o:d`<span class="skeleton skeleton--attribute"></span>`}
          </div>
        `)}
      </div>
    `}renderForecast(t,e){const{sun_entity:r,timeZone:i,locale:s,temperatureUnit:a,temperatureSensor:o}=this.config,{count:n,animated_icons:c,weather_icon_type:h,round_temperatures:u,hide_sunrise_sunset:p,time_pattern:m,attribute:b,hide_attribute:w,attribute_icon:g,attribute_color:v,attribute_unit:y}=this.config.forecast_strip,k=this.currentDate,_=this.visibleRows(n,m);if(0===_.length)return d``;const $=t=>null===t?null:V(u?Math.round(t):t,this.config),x=null!=y?y:this.forecastAttributeUnit(b),C="precipitation"===b||"precipitation_probability"===b,S=_.map(({forecast:t})=>(t=>null!==t&&"precipitation_probability"===b?10*Math.round(t/10):t)(q(t,b))).map(t=>C&&0===t?null:t),A=t=>w?null:{icon:g,color:v,value:null===t?null:H(V(t,this.config),x)},I="hourly"===e?f.getSensorTemperature(this.hass,o,a):null,E=_.map(({forecast:t,at:r,label:i,isNight:s,isCurrent:o},n)=>{var l,d,u;const p="daily"===e&&null!==(l=t.templow)&&void 0!==l?l:null,m=o&&null!==I?I:null!==(d=t.temperature)&&void 0!==d?d:null;return{at:r,item:{label:i,condition:null!==(u=t.condition)&&void 0!==u?u:"",isNight:s,animatedIcon:c,weatherIconType:h,temperature:$(null===p||null===m?m:Math.max(m,p)),temperatureLow:null===p?null:$(null===m?p:Math.min(m,p)),temperatureUnit:a,attribute:A(S[n])}}}),D=_[_.length-1].at,{sunrise:T,sunset:M}=p||"hourly"!==e?{sunrise:null,sunset:null}:f.getNextSunEvents(this.hass,r,i),N=[...E,...[["sunrise",T],["sunset",M]].flatMap(([t,e])=>e&&e.startOf("minute")>=k.startOf("minute")&&e<=D?[{kind:t,at:e}]:[]).map(({kind:t,at:e})=>({at:e,item:{label:e.setLocale(s).toFormat(m),condition:t,isNight:!1,animatedIcon:c,weatherIconType:h,sunEvent:{kind:t,label:l.t(s,"sunrise"===t?"misc.sunrise":"misc.sunset")},attribute:A(null)}}))].sort((t,e)=>t.at.toMillis()-e.at.toMillis()).slice(0,n);return d`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="strip">
        ${N.map(({item:t})=>d`<clock-weather-card-forecast-strip-item .item=${t}></clock-weather-card-forecast-strip-item>`)}
      </div>
    `}};yt=t([v("clock-weather-card-forecast-strip")],yt);var kt=class extends F{render(){const{label:t,condition:e,isNight:r,animatedIcon:i,weatherIconType:s,lowLabel:a,highLabel:n,barLowPercent:c,barHighPercent:l,gradientStops:h,showCurrentIndicator:u,currentTempPercent:p}=this.item,m=h.map(t=>`${t.color} ${t.percent}%`).join(", ");return d`
      <span class="label" title=${t}>${t}</span>
      <clock-weather-card-icon
        .weatherState=${e}
        .isNight=${r}
        .animatedIcon=${i}
        .weatherIconType=${s}
      ></clock-weather-card-icon>
      <span class="temperature-low">${null!=a?a:o}</span>
      <div class="bar-track">
        <div class="bar-fill" style=${`left: ${c}%; right: ${100-l}%; background: linear-gradient(to right, ${m});`}></div>
        ${u?d`<div class="dot" style=${`--_dot-left: ${p}%;`}></div>`:o}
      </div>
      <span class="temperature-high">${null!=n?n:o}</span>
    `}};t([s({attribute:!1})],kt.prototype,"item",void 0),kt=t([v("clock-weather-card-forecast-list-item")],kt);var _t=class extends vt{resolveForecastType(){return this.config.forecast_list.forecast_type}resolveEntityId(){return this.config.forecast_list.weather_entity}requiredAttribute(){return this.config.forecast_list.attribute}renderSkeleton(){return d`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="rows" aria-busy="true" style=${this._rowsStyle()}>
        ${Array.from({length:this.config.forecast_list.count},()=>d`
          <span class="skeleton skeleton--label"></span>
          <span class="skeleton skeleton--icon"></span>
          <span class="skeleton skeleton--temperature"></span>
          <span class="skeleton skeleton--bar"></span>
          <span class="skeleton skeleton--temperature"></span>
        `)}
      </div>
    `}renderForecast(t,e){const{gradient:r,animated_icons:i,weather_icon_type:s,attribute:a}=this.config.forecast_list,o="temperature"===a?this._temperatureBars(t,e):this._attributeBars(a);if(0===o.length)return d``;const n=k(r),c=o.flatMap(t=>t.span?[t.span.from,t.span.to]:[]),l=Math.min(...c),h=Math.max(...c)-l,u=t=>0===h?50:Math.max(0,Math.min(100,(t-l)/h*100));return d`
      <clock-weather-card-divider></clock-weather-card-divider>
      <div class="rows" style=${this._rowsStyle()}>
        ${o.map(({row:t,lowLabel:e,highLabel:r,span:a,current:o})=>{var c;const l={label:t.label,condition:null!==(c=t.forecast.condition)&&void 0!==c?c:"",isNight:t.isNight,animatedIcon:i,weatherIconType:s,lowLabel:e,highLabel:r,barLowPercent:a?u(a.from):0,barHighPercent:a?u(a.to):0,gradientStops:a?b(n,a.from,a.to):[],showCurrentIndicator:null!==o,currentTempPercent:null===o?0:u(o)};return d`<clock-weather-card-forecast-list-item .item=${l}></clock-weather-card-forecast-list-item>`})}
      </div>
    `}_rowsStyle(){const{row_height:t,bar_thickness:e}=this.config.forecast_list;return`--cwc-list-row-height: ${t}; --cwc-list-bar-thickness: ${(t=>{const e=/^(\d+(?:\.\d+)?)%$/.exec(t.trim());return e?`calc(var(--cwc-list-row-height) * ${Number(e[1])/100})`:t})(e)}`}_temperatureBars(t,e){const{count:r,round_temperatures:i,hide_current_temp_indicator:s,attribute_unit:a,time_pattern:o}=this.config.forecast_list,{temperatureUnit:c,temperatureSensor:l}=this.config,h=f.getCurrentTemperature(this.hass,t,l,c);null!==h||s||n.debug(`Temperature of "${null!=l?l:t}" is not numeric, hiding the current temperature indicator`);const d=null===h?null:p(h,c),u="hourly"===e,m=t=>H(V(i?Math.round(t):t,this.config),null!=a?a:c);return this.visibleRows(r,o).map((t,e,r)=>{var i;const a=(u?[t.forecast.temperature,0===e?null!=h?h:t.forecast.temperature:r[e-1].forecast.temperature]:[null!==(i=t.forecast.templow)&&void 0!==i?i:t.forecast.temperature,t.forecast.temperature]).filter(t=>"number"==typeof t);if(!u&&t.isCurrent&&null!==h&&a.push(h),0===a.length)return{row:t,lowLabel:"–",highLabel:"–",span:null,current:null};const o=Math.min(...a),n=Math.max(...a);return{row:t,lowLabel:m(o),highLabel:m(n),span:{from:p(o,c),to:p(n,c)},current:t.isCurrent&&!s?d:null}})}_attributeBars(t){const{attribute_unit:e,count:r,time_pattern:i}=this.config.forecast_list,s=null!=e?e:this.forecastAttributeUnit(t);return this.visibleRows(r,i).map(e=>{const r=q(e.forecast,t);return{row:e,lowLabel:null,highLabel:null===r?null:H(V(r,this.config),s),span:null===r?null:{from:Math.min(0,r),to:Math.max(0,r)},current:null}})}};_t=t([v("clock-weather-card-forecast-list")],_t);var $t=e`

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
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    container-type: inline-size;
  }

  clock-weather-card-header > clock-weather-card-icon {
    display: block;
    justify-self: center;
    /* The glyph fills the middle 80% of the box; the img's -10% margins crop the rest. */
    width: min(50cqi, var(--cwc-header-icon-size, max(var(--cwc-header-rows-height, 0px), 9rem)) / 0.8);
  }

  /* Meteocons clouds are near-white and vanish on light backgrounds without an outline. */
  clock-weather-card-icon img {
    filter: drop-shadow(0 0 1px rgb(0 0 0 / 0.35));
  }

  clock-weather-card-header > clock-weather-card-icon img {
    display: block;
    width: 100%;
    margin: -10% 0;
    /* Meteocons sit low in their canvas; raindrops would otherwise touch the divider below. */
    translate: 0 -4%;
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
  clock-weather-card-entity-segment {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
    padding-block: 0.2em;
    margin-block: -0.2em;
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

  clock-weather-card-forecast-strip .strip {
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
  }

  clock-weather-card-forecast-strip-item,
  clock-weather-card-forecast-strip .skeleton-item {
    flex: 0 0 auto;
    min-width: 40px;
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
    font-size: 0.8rem;
    opacity: 0.7;
    line-height: 1;
    max-width: 5em;
    overflow-x: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  clock-weather-card-forecast-strip-item clock-weather-card-icon {
    width: 40px;
    height: 40px;
    display: block;
  }

  clock-weather-card-forecast-strip-item clock-weather-card-icon img {
    width: 100%;
    height: 100%;
    display: block;
  }

  clock-weather-card-forecast-strip-item .label {
    display: inline-flex;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1;
    --mdc-icon-size: 1em;
  }

  clock-weather-card-forecast-strip-item .temperature-low {
    font-size: 0.8rem;
    opacity: 0.6;
    line-height: 1;
    margin-top: 2px;
  }

  clock-weather-card-forecast-strip-item .attribute {
    font-size: 0.72rem;
    opacity: 0.65;
    color: var(--info-color, #4a90d9);
    line-height: 1;
    min-height: 0.72rem;
    display: flex;
    max-width: 5rem;
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
    grid-template-columns: max-content var(--cwc-list-row-height) max-content 1fr max-content;
    grid-auto-rows: minmax(var(--cwc-list-row-height), auto);
    align-items: center;
    column-gap: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1;
  }

  clock-weather-card-forecast-list-item {
    --_bar-thickness: var(--cwc-list-bar-thickness);
    --_dot-size: max(14px, calc(var(--_bar-thickness) + 8px));
    display: contents;
  }

  clock-weather-card-forecast-list-item .label {
    max-width: 5em;
    overflow-x: clip;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  clock-weather-card-forecast-list-item clock-weather-card-icon {
    width: var(--cwc-list-row-height);
    height: var(--cwc-list-row-height);
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
    background-color: var(--clock-weather-card-bar-track-color, color-mix(in srgb, var(--secondary-text-color, #727272) 10%, transparent));
    border-radius: 999px;
    box-shadow: 0 0 1px rgb(0 0 0 / 0.35);
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
    left: clamp(calc(var(--_dot-size) / 2), var(--_dot-left), calc(100% - var(--_dot-size) / 2));
    width: var(--_dot-size);
    height: var(--_dot-size);
    border-radius: 50%;
    background: var(--card-background-color, var(--ha-card-background, #fff));
    border: 2px solid var(--primary-text-color, currentColor);
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    z-index: 1;
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
    width: 1.6rem;
    height: 0.8rem;
  }

  clock-weather-card-forecast-strip .skeleton--icon {
    width: 28px;
    height: 28px;
    margin: 6px;
    border-radius: 50%;
  }

  clock-weather-card-forecast-strip .skeleton--label {
    width: 1.8rem;
    height: 0.9rem;
  }

  clock-weather-card-forecast-strip .skeleton--attribute {
    width: 1.6rem;
    height: 0.72rem;
    margin-top: 2px;
  }

  clock-weather-card-forecast-list .skeleton--label {
    width: 2.4rem;
    height: 0.9rem;
  }

  clock-weather-card-forecast-list .skeleton--icon {
    width: 70%;
    aspect-ratio: 1;
    justify-self: center;
    border-radius: 50%;
  }

  clock-weather-card-forecast-list .skeleton--temperature {
    width: 1.8rem;
    height: 0.9rem;
  }

  clock-weather-card-forecast-list .skeleton--bar {
    height: var(--cwc-list-bar-thickness);
    min-height: 8px;
  }

`,xt=t=>{const e=/^([\d.]+)(px|r?em)$/.exec(null!=t?t:"");return e?Number(e[1])*("px"===e[2]?1:16):null};window.customCards=window.customCards||[],window.customCards.some(t=>"clock-weather-card"===t.type)||window.customCards.push({type:"clock-weather-card",name:"Clock Weather Card",description:"Shows the current date/time in combination with the current weather and an iOS inspired weather forecast.",preview:!0,documentationURL:"https://github.com/pkissling/clock-weather-card",getEntitySuggestion:(t,e)=>e.startsWith("weather.")?{config:{type:"custom:clock-weather-card",entity:e}}:null}),console.info(`%c  CLOCK-WEATHER-CARD \n%c Version: ${c}`,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");var Ct=class extends a{constructor(...t){super(...t),this.preview=!1,this.currentDate=r.now(),this._clock=null}render(){if(!this.hass||!this.config)return d`<ha-card></ha-card>`;if(!this.resolved)return d`
        <clock-weather-card-error
          .message=${this.error}
          .config=${this.config}
        ></clock-weather-card-error>
      `;const{title:t,header:e,forecast_strip:r,forecast_list:i}=this.resolved,s="none"!==this.tapAction.action;return d`
      <ha-card
        class=${s?"clickable":""}
        role=${s?"button":o}
        tabindex=${s?0:o}
        @click=${s?this.handleTap:o}
        @keydown=${s?t=>{"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this.handleTap())}:o}
      >
        ${t?d`<h1 class="card-header">${t}</h1>`:""}
        <div class="card-content">
          ${e.hide?"":d`
            <clock-weather-card-header .currentDate=${this.currentDate}></clock-weather-card-header>
          `}
          ${r.hide?"":d`
            <clock-weather-card-forecast-strip .currentDate=${this.currentDate}></clock-weather-card-forecast-strip>
          `}
          ${i.hide?"":d`
            <clock-weather-card-forecast-list .currentDate=${this.currentDate}></clock-weather-card-forecast-list>
          `}
        </div>
      </ha-card>
      `}get tapAction(){var t,e;return null!==(t=null===(e=this.config)||void 0===e?void 0:e.tap_action)&&void 0!==t?t:C}handleTap(){var t;this.dispatchEvent(new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:{entity:null===(t=this.config)||void 0===t?void 0:t.entity,tap_action:this.tapAction},action:"tap"}}))}setConfig(t){if(!(null==t?void 0:t.entity))throw _("entity");this.config=t}getCardSize(){return this._resolveConfig(),this.resolved?(({title:t,header:e,forecast_strip:r,forecast_list:i})=>{var s;const a=e.rows.reduce((t,e)=>{var r;return t+(null!==(r=xt(e.font_size))&&void 0!==r?r:17)},0),o=36+(t?24:0)+(e.hide?0:Math.max(126,a))+(r.hide?0:88)+(i.hide?0:i.count*(null!==(s=xt(i.row_height))&&void 0!==s?s:28));return Math.round(o/50)})(this.resolved):1}getGridOptions(){return{columns:12,min_columns:6}}static getStubConfig(t,e,r){var i;const s=t=>t.startsWith("weather."),a=null!==(i=e.find(s))&&void 0!==i?i:r.find(s);return a||n.warn("No weather entity found for the stub config"),{entity:a}}connectedCallback(){super.connectedCallback(),this._tryStart()}disconnectedCallback(){super.disconnectedCallback(),this._stopClock()}willUpdate(t){if(!t.has("config")&&!t.has("hass"))return;if(!t.has("config")&&this.resolved&&!this._relevantHassChanged())return;const e=this.resolved;this._resolveConfig(),this._relevantHassChanged()&&(this.providedHass=this.hass),this.resolved!==e&&this._stopClock(),this._tryStart()}_resolveConfig(){if(this.hass&&this.config)try{const t=m(this.config,this.hass);$(t,this.resolved)||(n.debug("Resolved config",t),this.resolved=t),this.providedConfig=this.resolved,this.error=void 0}catch(t){this.resolved=void 0,this.error=t instanceof Error?t.message:String(t),n.warn(`Invalid config: ${this.error}`)}}_relevantHassChanged(){const t=this.providedHass,e=this.hass;if(!t||!this.resolved)return!0;if(t.connection!==e.connection||t.config!==e.config||t.language!==e.language||t.locale!==e.locale)return!0;const{entity:r,sun_entity:i,temperatureSensor:s,forecast_strip:a,forecast_list:o,header:n}=this.resolved,c=n.rows.flatMap(t=>t.segments.map(t=>"entity_id"in t?t.entity_id:void 0)),l=[r,i,s,a.weather_entity,o.weather_entity,...c].filter(t=>null!=t);return l.some(r=>(r=>t.states[r]!==e.states[r])(r)||(r=>f.getDisplayPrecision(t,r)!==f.getDisplayPrecision(e,r))(r))}_tryStart(){if(this.resolved&&null===this._clock){const{header:t,locale:e,timeZone:s}=this.resolved,a=A(t);n.debug(`Starting clock with ${a?"per-second":"per-minute"} ticks`),this._clock=i(a,()=>{this.currentDate=r.now().setLocale(e).setZone(s)})}}_stopClock(){this._clock&&(n.debug("Stopping clock"),this._clock.stop()),this._clock=null}static async getConfigElement(){const{ClockWeatherCardEditor:t}=await(import("./clock-weather-card-editor-DLv-Lm8G.js"));return new t}static get styles(){return $t}};t([s({attribute:!1})],Ct.prototype,"hass",void 0),t([U({context:P})],Ct.prototype,"providedHass",void 0),t([U({context:L}),s({type:Boolean})],Ct.prototype,"preview",void 0),t([h()],Ct.prototype,"config",void 0),t([h()],Ct.prototype,"resolved",void 0),t([U({context:O})],Ct.prototype,"providedConfig",void 0),t([h()],Ct.prototype,"error",void 0),t([h()],Ct.prototype,"currentDate",void 0),Ct=t([v("clock-weather-card")],Ct);export{Ct as ClockWeatherCard};