(()=>{"use strict";var __webpack_modules__={946:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{G:()=>getIconStyles,IU:()=>createIcon,L2:()=>addStyles,_k:()=>convertToRGBA,mk:()=>getIconColor,wW:()=>isColorCloseToWhite});let timeouts={},idCounter=0;const addStyles=function(hass,context,styles,customStyles,state,entityId,stateChanged,path="",element=context.content){const id=idCounter++,key=id+styles,executeStyles=()=>{const customStylesEval=customStyles?eval("`"+customStyles+"`"):"";let styleAddedKey=styles+"Added";if(!context[styleAddedKey]||context.previousStyle!==customStylesEval||stateChanged||context.previousConfig!==context.config){if(!context[styleAddedKey]){if(context.styleElement=element.querySelector("style"),!context.styleElement){context.styleElement=document.createElement("style");const t=path?element.querySelector(path):element;t?.appendChild(context.styleElement)}context[styleAddedKey]=!0}const t=document.createElement("style");t.innerHTML=customStylesEval+styles,context.styleElement.parentNode.insertBefore(t,context.styleElement.nextSibling),context.styleElement.parentNode.removeChild(context.styleElement),context.styleElement=t,context.previousStyle=customStylesEval,context.previousConfig=context.config}};timeouts[key]?clearTimeout(timeouts[key]):executeStyles(),timeouts[key]=setTimeout(executeStyles,500)};function createIcon(t,e,n,o,i){let a=t._hass,r=!(!e||!a.states[e].attributes)&&a.states[e].attributes;t.imageUrl=!!r.entity_picture&&r.entity_picture,updateIcon(t,a,e,n,o),i||setInterval((()=>{a=t._hass,e&&a.states[e]&&(t.currentEntityPicture=a.states[e].attributes.entity_picture,t.currentEntityPicture!==t.previousEntityPicture&&(t.imageUrl=t.currentEntityPicture,updateIcon(t,a,e,n,o),t.previousEntityPicture=t.currentEntityPicture))}),1e3)}function updateIcon(t,e,n,o,i){for(;i.firstChild;)i.removeChild(i.firstChild);let a=t.config.icon&&t.config.icon.includes("/")?t.config.icon:t.imageUrl?t.imageUrl:"";if(a&&(r=e.states[n].state,n.startsWith("media_player.")&&!["off","unknown","idle",void 0].includes(r)||!n.startsWith("media_player."))){const t=document.createElement("div");t.setAttribute("class","entity-picture"),t.setAttribute("alt","Icon"),i&&(i.appendChild(t),i.style.background="center / cover no-repeat url("+a+"), var(--card-background-color,var(--ha-card-background))")}else{const t=document.createElement("ha-icon");t.setAttribute("icon",o),t.setAttribute("class","icon"),i&&i.appendChild(t)}var r}function isColorCloseToWhite(t){let e=[220,220,190];for(let n=0;n<3;n++)if(t[n]<e[n])return!1;return!0}function convertToRGBA(t,e,n=1){let o="";if(t.startsWith("#"))o=4===t.length?"rgba("+Math.min(255,parseInt(t.charAt(1).repeat(2),16)*n)+", "+Math.min(255,parseInt(t.charAt(2).repeat(2),16)*n)+", "+Math.min(255,parseInt(t.charAt(3).repeat(2),16)*n)+", "+e+")":"rgba("+Math.min(255,parseInt(t.slice(1,3),16)*n)+", "+Math.min(255,parseInt(t.slice(3,5),16)*n)+", "+Math.min(255,parseInt(t.slice(5,7),16)*n)+", "+e+")";else if(t.startsWith("rgb")){let i=t.match(/\d+/g);t.includes("rgba"),o="rgba("+Math.min(255,i[0]*n)+", "+Math.min(255,i[1]*n)+", "+Math.min(255,i[2]*n)+", "+e+")"}return o}function getIconColor(t,e,n,o,i){let a,r,s;return e&&e.startsWith("light.")?(a=(i=t.states[e].attributes.rgb_color)?o(i)?"rgba(255,220,200,0.5)":`rgba(${i}, 0.5)`:n?"rgba(255,220,200, 0.5)":"rgba(255, 255, 255, 0.5)",r=i?o(i)?"rgb(255,220,200)":`rgb(${i})`:n?"rgba(255,220,200, 1)":"rgba(255, 255, 255, 1)",s=i?o(i)?"none":"brightness(1.1)":"none"):(a="var(--accent-color)",s="brightness(1.1)"),{iconColorOpacity:a,iconColor:r,iconFilter:s}}function getIconStyles(t,e,n,o){return`\n    .icon-container {\n        position: relative;\n        display: flex;\n        flex-wrap: wrap;\n        align-content: center;\n        justify-content: center;\n        z-index: 1;\n        min-width: 38px;\n        min-height: 38px;\n        margin: 6px;\n        border-radius: 50%;\n        cursor: pointer !important;\n        background-color: var(--card-background-color,var(--ha-card-background));\n    }\n    \n    .icon-container::after {\n        content: '';\n        position: absolute;\n        display: block;\n        opacity: ${t.startsWith("light.")?"0.2":"0"};\n        width: 100%;\n        height: 100%;\n        transition: all 1s;\n        border-radius: 50%;\n        background-color: ${e?n||"var(--accent-color)":"var(--card-background-color,var(--ha-card-background))"};\n    }\n    \n    .icon {\n        display: flex;\n        width: 22px; \n        color: ${e?n||"var(--accent-color)":"inherit"} !important;\n        opacity: ${e?"1":t?"0.6":"1"};\n        filter: ${e?n?o:"brightness(1.1)":"inherit"};\n    }\n    \n    .entity-picture {\n        display: flex;\n        height: 38px;\n        width: 38px;\n        border-radius: 100%;\n    }\n    `}}},__webpack_module_cache__={};function __webpack_require__(t){var e=__webpack_module_cache__[t];if(void 0!==e)return e.exports;var n=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](n,n.exports,__webpack_require__),n.exports}__webpack_require__.d=(t,e)=>{for(var n in e)__webpack_require__.o(e,n)&&!__webpack_require__.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},__webpack_require__.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var __webpack_exports__={};(()=>{let t="v1.6.1";function e(){const t=function(){try{return document.querySelector("body > home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-drawer > partial-panel-resolver > ha-panel-lovelace").shadowRoot.querySelector("hui-root").shadowRoot.querySelector("div")}catch(t){return}}();if(t)return t.classList.contains("edit-mode")}var n=__webpack_require__(946);const o=(t,e,n,o)=>{o=o||{},n=null==n?{}:n;const i=new Event(e,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return i.detail=n,t.dispatchEvent(i),i},i=t=>{o(window,"haptic",t)},a=(t,e,n=!1)=>{n?history.replaceState(null,"",e):history.pushState(null,"",e),o(window,"location-changed",{replace:n})};function r(t,e){t.callService("homeassistant","toggle",{entity_id:e})}const s=300;let l,c,d,p,h,u=null,g=0,m=0;class b{constructor(t,e,n){this.element=t,this.config=e,this.sendActionEvent=n,this.holdDuration=300,this.holdTimeout=null,this.tapTimeout=null,this.lastTap=0,this.holdTriggered=!1}handleStart(){this.holdTriggered=!1,this.holdTimeout=setTimeout((()=>{this.sendActionEvent(this.element,this.config,"hold"),this.holdTriggered=!0}),this.holdDuration)}handleEnd(t){clearTimeout(this.holdTimeout);let e=(new Date).getTime(),n=e-this.lastTap;n<this.holdDuration&&n>0?(clearTimeout(this.tapTimeout),this.sendActionEvent(this.element,this.config,"double_tap")):this.holdTriggered||(this.tapTimeout=setTimeout((()=>{this.sendActionEvent(this.element,this.config,"tap")}),this.holdDuration)),this.lastTap=e,this.holdTriggered=!1}handleCancel(){clearTimeout(this.holdTimeout),this.holdTriggered=!1}}function f(t,e,n){const o=Date.now();if("tap"===n&&o-m<s)return;if(u===n&&o-g<s)return;let i={entity:e.entity,tap_action:e.tap_action||{action:"more-info"},double_tap_action:e.double_tap_action||{action:"toggle"},hold_action:e.hold_action||{action:"toggle"}};console.log("Action =",n,"Action config =",i),setTimeout((()=>{const e=new Event("hass-action",{bubbles:!0,composed:!0});e.detail={config:i,action:n},t.dispatchEvent(e)}),1),u=n,g=o,"double_tap"===n&&(m=o)}function _(t,e,n,o){let i=new b(t,e,f);"ontouchstart"in window?(t.addEventListener("touchstart",i.handleStart.bind(i),{passive:!0}),t.addEventListener("touchend",(t=>i.handleEnd(t)),{passive:!0}),t.addEventListener("touchcancel",i.handleCancel.bind(i),{passive:!0})):(t.addEventListener("mousedown",i.handleStart.bind(i),{passive:!0}),t.addEventListener("mouseup",(t=>i.handleEnd(t)),{passive:!0}),t.addEventListener("mouseout",i.handleCancel.bind(i),{passive:!0}))}function v(t,e,o,i){let a=e.styles?e.styles:"",r=e.entity&&o.states[e.entity]?e.entity:"",s=!e.icon&&r?o.states[r].attributes.icon||o.states[r].attributes.entity_picture||"":e.icon||"",h=e.name?e.name:r?o.states[r].attributes.friendly_name:"",u=e.width_desktop||"540px",g=u?u.match(/(\d+)(\D+)/):"",m=e.is_sidebar_hidden||!1,b=r?o.states[r].state:"";!function(t,e,n){t.hasState=e.states[n],t.hasState&&(t.newState=[t.hasState.state,t.hasState.attributes.rgb_color],t.oldState&&t.newState[0]===t.oldState[0]&&t.newState[1]===t.oldState[1]?t.stateChanged=!1:(t.oldState=t.newState,t.stateChanged=!0),t.stateChanged)}(t,o,r);let f=t.stateChanged,_=["on","open","cleaning","true","home","playing"].includes(b)||0!==Number(b)&&!isNaN(Number(b)),v=void 0===e.rise_animation||e.rise_animation,y=e.margin?"0"!==e.margin?e.margin:"0px":"7px",w=void 0!==e.bg_opacity?e.bg_opacity:"88",x=void 0!==e.shadow_opacity?e.shadow_opacity:"0",k=void 0!==e.bg_blur?e.bg_blur:"10",{iconColorOpacity:C,iconColor:$,iconFilter:S}=(0,n.mk)(o,r,_,n.wW),E=(0,n.G)(r,_,$,S),O=getComputedStyle(document.body),A=O.getPropertyValue("--ha-card-background")||O.getPropertyValue("--card-background-color"),L=e.bg_color?e.bg_color:A;if(L&&(!t.color||L!==t.color)){const e=1.02;c=(0,n._k)(L,w/100,e),document.body.style.setProperty("--bubble-pop-up-background",c),t.color=L,window.color=L}return{customStyles:a,entityId:r,icon:s,name:h,widthDesktop:u,widthDesktopDivided:g,isSidebarHidden:m,state:b,stateChanged:f,stateOn:_,formatedState:p,riseAnimation:v,marginCenter:y,popUpOpen:l,rgbaColor:c,rgbColor:d,bgOpacity:w,shadowOpacity:x,bgBlur:k,iconColorOpacity:C,iconColor:$,iconFilter:S,iconStyles:E,haStyle:O,themeBgColor:A,color:L}}function y(t){const r=t._hass;let{customStyles:s,entityId:l,icon:c,name:d,widthDesktop:p,widthDesktopDivided:u,isSidebarHidden:g,state:m,stateChanged:b,stateOn:f,riseAnimation:_,marginCenter:y,popUpOpen:w,rgbaColor:x,rgbColor:k,bgOpacity:C,shadowOpacity:$,bgBlur:S,iconColorOpacity:E,iconColor:O,iconFilter:A,iconStyles:L,haStyle:I,themeBgColor:T,color:D}=v(t,t.config,r);setInterval((()=>{h=e(),h&&!t.editorModeAdded?(t.buttonsContainer.classList.add("editor"),t.card.classList.add("editor"),t.editorModeAdded=!0):!h&&t.editorModeAdded&&(t.buttonsContainer.classList.remove("editor"),t.card.classList.remove("editor"),t.editorModeAdded=!1)}),100);if(!t.buttonsAdded){const e=document.createElement("div");e.classList.add("horizontal-buttons-stack-container"),t.content.appendChild(e),t.buttonsContainer=e}const V=(t,e,o)=>{if(r.states[e].attributes.rgb_color){const o=r.states[e].attributes.rgb_color,i=(0,n.wW)(o)?"rgba(255,220,200, 0.5)":`rgba(${o}, 0.5)`;t.style.backgroundColor=i,t.style.border="1px solid rgba(0,0,0,0)"}else r.states[e].attributes.rgb_color||"on"!=r.states[e].state?(t.style.backgroundColor="rgba(0,0,0,0)",t.style.border="1px solid var(--primary-text-color)"):(t.style.backgroundColor="rgba(255,255,255,0.5)",t.style.border="1px solid rgba(0,0,0,0)")};let M=[],z=1;for(;t.config[z+"_link"];){const e=z+"_",n=t.config[e+"name"]||"",o=t.config[e+"pir_sensor"];c=t.config[e+"icon"]||"";const i=t.config[e+"link"],a=t.config[e+"entity"];M.push({button:n,pirSensor:o,icon:c,link:i,lightEntity:a}),z++}if(t.config.auto_order&&M.sort(((t,e)=>t.pirSensor&&e.pirSensor?"on"===r.states[t.pirSensor].state&&"on"===r.states[e.pirSensor].state?r.states[t.pirSensor].last_updated<r.states[e.pirSensor].last_updated?1:-1:"on"===r.states[t.pirSensor].state?-1:"on"===r.states[e.pirSensor].state||r.states[t.pirSensor].last_updated<r.states[e.pirSensor].last_updated?1:-1:t.pirSensor?e.pirSensor?void 0:-1:1)),!t.buttonsAdded||h){if(t.card.classList.add("horizontal-buttons-stack"),h&&t.buttonsContainer)for(;t.buttonsContainer.firstChild;)t.buttonsContainer.removeChild(t.buttonsContainer.firstChild);const e={};M.forEach((n=>{const r=((e,n,r)=>{const s=document.createElement("button");return s.setAttribute("class",`button ${n.substring(1)}`),s.innerHTML=`\n            ${""!==r?`<ha-icon icon="${r}" class="icon" style="${""!==e?"margin-right: 8px;":""}"></ha-icon>`:""}\n            ${""!==e?`<p class="name">${e}</p>`:""}\n        `,s.hasListener||(s.addEventListener("click",(t=>{w=location.hash+!0,w!==n+!0?(a(0,n),w=n+!0):(history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0),w=n+!1),i("light")}),{passive:!0}),window.addEventListener("urlChanged",(()=>{t.config.highlightCurrentview&&(location.pathname===n||location.hash===n?s.classList.add("highlight"):s.classList.remove("highlight"))}),{passive:!0}),s.hasListener=!0),s})(n.button,n.link,n.icon);e[n.link]=r,t.buttonsContainer.appendChild(r)})),t.buttonsAdded=!0,t.buttons=e}let B=0;!function(t){if(t.buttonsUpdated&&!h)return;let e=[];for(let n of M)t.buttons[n.link]&&(e.push(localStorage.getItem(`buttonWidth-${n.link}`)),e.push(localStorage.getItem(`buttonContent-${n.link}`)));Promise.all(e).then((e=>{let n=0;for(let o of M){let i=t.buttons[o.link];if(i){let a=e[n],r=e[n+1];n+=2,a&&"0"!==a&&r===i.innerHTML&&!h||(a=i.offsetWidth,localStorage.setItem(`buttonWidth-${o.link}`,a),localStorage.setItem(`buttonContent-${o.link}`,i.innerHTML),t.previousConfig=t.config),i.style.transform=`translateX(${B}px)`,B+=parseInt(a)+12}o.lightEntity&&V(i,o.lightEntity,o.link)}t.buttonsAdded=!0}))}(t);const U=`\n        ha-card {\n            border-radius: 0;\n        }\n        .horizontal-buttons-stack {\n            width: 100%;\n            margin-top: 0 !important;\n            background: none !important;\n            position: fixed;\n            height: 51px;\n            bottom: 16px;\n            left: ${y};\n            z-index: 1 !important; /* Higher value hide the more-info panel */\n        }\n        @keyframes from-bottom {\n            0% {transform: translateY(200px);}\n            20% {transform: translateY(200px);}\n            46% {transform: translateY(-8px);}\n            56% {transform: translateY(1px);}\n            62% {transform: translateY(-2px);}\n            70% {transform: translateY(0);}\n            100% {transform: translateY(0);}\n        }\n        .horizontal-buttons-stack-container {\n            width: max-content;\n            position: relative;\n            height: 51px;\n        }\n        .button {\n            display: inline-flex;\n            position: absolute;\n            box-sizing: border-box !important;\n            border: 1px solid var(--primary-text-color);\n            align-items: center;\n            height: 50px;\n            line-height: 16px;\n            white-space: nowrap;\n            width: auto;\n            border-radius: 25px;\n            z-index: 1;\n            padding: 0 16px;\n            background: none;\n            transition: background-color 1s, border 1s, transform 1s;\n            color: var(--primary-text-color);\n        }\n        .highlight {\n            animation: pulse 1.4s infinite alternate;\n        }\n        @keyframes pulse {\n            0% {\n                filter: brightness(0.7);\n            }\n            100% {\n                filter: brightness(1.3);\n            }\n        }\n        .icon {\n            height: 24px;\n        }\n        .card-content {\n            width: calc(100% + 18px);\n            box-sizing: border-box !important;\n            margin: 0 -36px !important;\n            padding: 0 36px !important;\n            overflow: scroll !important;\n            -ms-overflow-style: none;\n            scrollbar-width: none;\n            -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 1) calc(0% + 28px), rgba(0, 0, 0, 1) calc(100% - 28px), transparent 100%);\n            /* mask-image: linear-gradient(90deg, transparent 2%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 96%, transparent 100%); */\n            /* -webkit-mask-image: linear-gradient(90deg, transparent 2%, rgba(0, 0, 0, 1) 6%, rgba(0, 0, 0, 1) 96%, transparent 100%); */\n        }\n        .horizontal-buttons-stack::before {\n            content: '';\n            position: absolute;\n            top: -32px;\n            left: -100%;\n            display: block;\n            background: linear-gradient(0deg, var(--background-color, var(--primary-background-color)) 50%, rgba(79, 69, 87, 0));\n            width: 200%;\n            height: 100px;\n        }\n        .card-content::-webkit-scrollbar {\n            display: none;\n        }\n        @media only screen and (min-width: 600px) {\n            .card-content {\n                position: fixed;\n                width: ${p} !important;\n                left: calc(50% - ${u[1]/2}${u[2]});\n                margin-left: -13px !important;\n                padding: 0 26px !important;\n            }\n        }\n        @media only screen and (min-width: 870px) {\n            .card-content {\n                position: fixed;\n                width: calc(${p}${"%"!==u[2]||g?"":" - var(--mdc-drawer-width)"}) !important;\n                left: calc(50% - ${u[1]/2}${u[2]} + ${!0===g?"0px":"var(--mdc-drawer-width) "+("%"===u[2]?"":"/ 2")});\n                margin-left: -13px !important;\n                padding: 0 26px !important;\n            }\n        }\n        .horizontal-buttons-stack.editor {\n            position: relative;\n            bottom: 0;\n            left: 0;\n            overflow: hidden;\n        }\n        .horizontal-buttons-stack.editor::before {\n            top: -32px;\n            left: -100%;\n            background: none;\n            width: 100%;\n            height: 0;\n        }\n        .horizontal-buttons-stack-container.editor > .button {\n            transition: background-color 0s, border 0s, transform 0s;\n        }\n        .horizontal-buttons-stack-container.editor {\n            margin-left: 1px;\n        }\n        .horizontal-buttons-stack.editor > .card-content {\n            position: relative;\n            width: calc(100% + 26px) !important;\n            left: -26px;\n            margin: 0 !important;\n            padding: 0;\n        }\n    `;!window.hasAnimated&&_&&(t.content.style.animation="from-bottom 1.3s forwards",window.hasAnimated=!0,setTimeout((()=>{t.content.style.animation="none"}),1500)),(0,n.L2)(r,t,U,s)}const w=Object.getPrototypeOf(customElements.get("ha-panel-lovelace")),x=w.prototype.html,k=w.prototype.css;let C;!function(){if(!window.eventAdded){const t=new Event("urlChanged");function e(){let e=0;window.dispatchEvent(t);const n=setInterval((()=>{e<10?(window.dispatchEvent(t),e++):clearInterval(n)}),1e3)}window.popUpInitialized=!1,["location-changed","connection-status"].forEach((t=>{window.addEventListener(t,e)}),{passive:!0});const n=()=>{window.dispatchEvent(t),window.addEventListener("popstate",e,{passive:!0})};window.addEventListener("popUpInitialized",n,{passive:!0}),window.eventAdded=!0}}();class $ extends HTMLElement{set hass(s){var l;switch(this._hass=s,C=e(),this.editor=C,async function(e){if(!window.resourcesChecked){window.resourcesChecked=!0;try{let n=t;localStorage.getItem("version")!==n&&(localStorage.setItem("version",n),location.reload());let o=(await e.callWS({type:"lovelace/resources"})).find((t=>t.url.includes("bubble-pop-up.js")));async function i(t){let e=await t.callWS({type:"lovelace/resources"}),n=e.findIndex((t=>t.url.includes("bubble-card.js"))),o=null;if(-1!==n&&0!==n){o=e.splice(n,1)[0];for(let n of e)await t.callWS({type:"lovelace/resources/delete",resource_id:n.id});o&&-1===(await t.callWS({type:"lovelace/resources"})).findIndex((t=>t.url.includes("bubble-card.js")))&&await t.callWS({type:"lovelace/resources/create",res_type:o.type,url:o.url});for(let n of e)await t.callWS({type:"lovelace/resources/create",res_type:n.type,url:n.url})}}o&&await e.callWS({type:"lovelace/resources/delete",resource_id:o.id}),i(e)}catch(a){throw a}}}(s),(l=this).content||(l.attachShadow({mode:"open"}),l.shadowRoot.innerHTML='\n            <ha-card style="background: none; border: none; box-shadow: none; border-radius: 16px;">\n                <div class="card-content" style="padding: 0;">\n                </div>\n            </ha-card>\n        ',l.card=l.shadowRoot.querySelector("ha-card"),l.content=l.shadowRoot.querySelector("div")),this.config.card_type){case"pop-up":!function(t){const e=t._hass,i=t.editor,s=t.config;if(!e)return;let l,c,d,p,{customStyles:h,entityId:u,icon:g,name:m,widthDesktop:b,widthDesktopDivided:f,isSidebarHidden:y,state:w,stateChanged:x,stateOn:k,formatedState:C,riseAnimation:$,marginCenter:S,popUpOpen:E,rgbaColor:O,rgbColor:A,bgOpacity:L,shadowOpacity:I,bgBlur:T,iconColorOpacity:D,iconColor:V,iconFilter:M,iconStyles:z,haStyle:B,themeBgColor:U,color:q}=v(t,s,e),H=s.auto_close||!1,W=s.hash,F=s.trigger_entity?s.trigger_entity:"",Y=s.trigger_state?s.trigger_state:"",P=!!s.trigger_close&&s.trigger_close,R=s.entity?"flex":"none",j=s.text||"",N=s.state,X=s.margin_top_mobile&&"0"!==s.margin_top_mobile?s.margin_top_mobile:"0px",G=s.margin_top_desktop&&"0"!==s.margin_top_desktop?s.margin_top_desktop:"0px";if(w=N&&e.states[N]?e.states[N].state:"",t.errorTriggered)return;function K(t){if(window.hash===W&&Z(),!window.justOpened)return;const e=t.composedPath();!e||e.some((t=>"HA-MORE-INFO-DIALOG"===t.nodeName))||e.some((t=>"root"===t.id&&!t.classList.contains("close-pop-up")))||E!==W+!0||setTimeout((function(){window.hash===W&&document.body.contains(t.target)&&(E=W+!1,history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0),localStorage.setItem("isManuallyClosed_"+W,!0))}),0)}function Z(){clearTimeout(d),H>0&&(d=setTimeout(J,H))}function J(){history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0)}function Q(){r(e,u)}function tt(t){"Escape"===t.key&&(E=W+!1,history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0),localStorage.setItem("isManuallyClosed_"+W,!0))}function et(t){window.hash===W&&Z(),l=t.touches[0].clientY,c=l}function nt(t){t.touches[0].clientY-l>300&&t.touches[0].clientY>c&&(E=W+!1,history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0),localStorage.setItem("isManuallyClosed_"+W,!0)),c=t.touches[0].clientY}function ot(){i||(window.hash=location.hash.split("?")[0],window.hash===W?(window.removeEventListener("click",K),t.popUp.classList.remove("close-pop-up"),t.popUp.classList.add("open-pop-up"),t.content.querySelector(".power-button").addEventListener("click",Q,{passive:!0}),window.addEventListener("keydown",tt,{passive:!0}),t.popUp.addEventListener("touchstart",et,{passive:!0}),t.popUp.addEventListener("touchmove",nt,{passive:!0}),E=W+!0,document.body.style.overflow="hidden",setTimeout((()=>{window.justOpened=!0}),10),it(t.popUp,!1),Z(),setTimeout((function(){window.addEventListener("click",K,{passive:!0})}),10)):t.popUp.classList.contains("open-pop-up")&&(t.popUp.classList.remove("open-pop-up"),t.popUp.classList.add("close-pop-up"),t.content.querySelector(".power-button").removeEventListener("click",Q),window.removeEventListener("keydown",tt),t.popUp.removeEventListener("touchstart",et),t.popUp.removeEventListener("touchmove",nt),E=W+!1,document.body.style.overflow="",window.justOpened=!1,clearTimeout(d),setTimeout((function(){it(t.popUp,!0)}),320)))}function it(t,e){for(var n=t.querySelectorAll("video"),o=0;o<n.length;o++){var i=n[o]&&n[o].currentTime>0&&!n[o].paused&&!n[o].ended&&n[o].readyState>n[o].HAVE_CURRENT_DATA;e&&i?n[o].pause():e||i||(n[o].play(),n[o].currentTime>0&&(n[o].currentTime=1e4))}var a=t.querySelectorAll("*");for(o=0;o<a.length;o++)a[o].shadowRoot&&it(a[o].shadowRoot,e)}function at(){let a=t.popUp;C=N?e.formatEntityState(e.states[N]):"",t.headerAdded?u&&(t.iconContainer.innerHTML="",(0,n.IU)(t,u,g,t.iconContainer,i),t.h2.textContent=m,t.p.textContent=C,t.haIcon2.setAttribute("style",`display: ${R};`)):(t.headerContainer=document.createElement("div"),t.headerContainer.setAttribute("id","header-container"),t.div=document.createElement("div"),t.headerContainer.appendChild(t.div),t.iconContainer=document.createElement("div"),t.iconContainer.setAttribute("class","icon-container"),t.div.appendChild(t.iconContainer),(0,n.IU)(t,u,g,t.iconContainer,i),_(t.iconContainer,s),t.h2=document.createElement("h2"),t.h2.textContent=m,t.div.appendChild(t.h2),t.p=document.createElement("p"),t.p.textContent=C,t.div.appendChild(t.p),t.haIcon2=document.createElement("ha-icon"),t.haIcon2.setAttribute("class","power-button"),t.haIcon2.setAttribute("icon","mdi:power"),t.haIcon2.setAttribute("style",`display: ${R};`),t.div.appendChild(t.haIcon2),t.button=document.createElement("button"),t.button.setAttribute("class","close-pop-up"),t.button.onclick=function(){history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0),localStorage.setItem("isManuallyClosed_"+W,!0)},t.headerContainer.appendChild(t.button),t.haIcon3=document.createElement("ha-icon"),t.haIcon3.setAttribute("icon","mdi:close"),t.button.appendChild(t.haIcon3),t.content.appendChild(t.headerContainer),t.header=t.div,t.headerAdded=!0),function(){if(u){const o=e.states[u].attributes.rgb_color;t.rgbColor=o?(0,n.wW)(o)?"rgb(255,220,200)":`rgb(${o})`:k?u.startsWith("light.")?"rgba(255,220,200, 0.5)":"var(--accent-color)":"rgba(255, 255, 255, 1",t.rgbColorOpacity=o?(0,n.wW)(o)?"rgba(255,220,200, 0.5)":`rgba(${o}, 0.5)`:u&&k?u.startsWith("light.")?"rgba(255,220,200, 0.5)":"var(--accent-color)":"var(--background-color,var(--secondary-background-color))",p=(0,n._k)(q,0),t.iconFilter=o?(0,n.wW)(o)?"none":"brightness(1.1)":"none"}else p=(0,n._k)(q,0)}(),t.eventAdded||i||(window["checkHashRef_"+W]=ot,window.addEventListener("urlChanged",window["checkHashRef_"+W],{passive:!0}),window.addEventListener("click",K,{passive:!0}),t.eventAdded=!0);const r=`                    \n            ha-card {\n                margin-top: 0 !important;\n                background: none !important;\n                border: none !important;\n            }\n            .card-content {\n                width: 100% !important;\n                padding: 0 !important;\n            }\n            #root {\n            \ttransition: transform .36s !important;\n                position: fixed !important;\n                margin: 0 -${S}; /* 7px */\n                width: 100%;\n                ${s.bg_color||s.bg_opacity?"--bubble-pop-up-background-custom: "+O:""};\n                background-color: var(--bubble-pop-up-background-custom, var(--bubble-pop-up-background));\n                box-shadow: 0px 0px 50px rgba(0,0,0,${I/100});\n                backdrop-filter: blur(${T}px);\n                -webkit-backdrop-filter: blur(${T}px);\n                border-radius: 42px;\n                box-sizing: border-box;\n                top: calc(120% + ${X} + var(--header-height));\n                grid-gap: 12px !important;\n                gap: 12px !important;\n                grid-auto-rows: min-content;\n                padding: 18px 18px 220px 18px !important;\n                height: 100% !important;\n                -ms-overflow-style: none; /* for Internet Explorer, Edge */\n                scrollbar-width: none; /* for Firefox */\n                overflow-y: auto; \n                overflow-x: hidden; \n                z-index: 1 !important; /* Higher value hide the more-info panel */\n                /* For older Safari but not working with Firefox */\n                /* display: grid !important; */  \n            }\n            #root.hidden {\n            \tdisplay: none !important;\n            }\n            #root > :first-child::after {\n                content: '';\n                display: block;\n                position: sticky;\n                top: 0;\n                left: -50px;\n                margin: -70px 0 -36px -36px;\n                overflow: visible;\n                width: 200%;\n                height: 100px;\n                background: linear-gradient(0deg, ${p} 0%, ${O} 80%);\n                z-index: 0;\n            } \n            #root::-webkit-scrollbar {\n                display: none; /* for Chrome, Safari, and Opera */\n            }\n            #root > :first-child {\n                position: sticky;\n                top: 0;\n                z-index: 1;\n                background: none !important;\n                overflow: visible;\n            }\n            #root.open-pop-up {\n                transform: translateY(-120%);\n            }\n            #root.open-pop-up > * {\n              /* Block child items to overflow and if they do clip them */\n              /*max-width: calc(100vw - 38px);*/\n              max-width: 100% !important;\n              /*overflow-x: clip;*/\n            }\n            #root.close-pop-up { \n                transform: translateY(-20%);\n                box-shadow: none;\n            }\n            @media only screen and (min-width: 600px) {\n                #root {\n                    top: calc(120% + ${G} + var(--header-height));\n                    width: calc(${b}${"%"!==f[2]||y?"":" - var(--mdc-drawer-width)"}) !important;\n                    left: calc(50% - ${f[1]/2}${f[2]});\n                    margin: 0 !important;\n                }\n            }  \n            @media only screen and (min-width: 870px) {\n                #root {\n                    left: calc(50% - ${f[1]/2}${f[2]} + ${y?"0px":"var(--mdc-drawer-width) "+("%"===f[2]?"":"/ 2")});\n                }\n            }  \n            #root.editor {\n                position: inherit !important;\n                width: 100% !important;\n                padding: 18px !important;\n                backdrop-filter: none !important;\n            }\n        `,l=`\n            ${z}\n\n            ha-card {\n                margin-top: 0 !important;\n            }\n            #header-container {\n                display: inline-flex;\n                ${g||m||u||w||j?"":"flex-direction: row-reverse;"}\n                height: 50px;\n                width: 100%;\n                margin: 0;\n                padding: 0;\n            }\n            #header-container > div {\n                display: ${g||m||u||w||j?"inline-flex":"none"};\n                align-items: center;\n                position: relative;\n                padding-right: 6px;\n                z-index: 1;\n                flex-grow: 1;\n                background-color: ${u?t.rgbColorOpacity:"var(--background-color,var(--secondary-background-color))"};\n                transition: background 1s;\n                border-radius: 25px;\n                margin-right: 14px;\n                backdrop-filter: blur(14px);\n                -webkit-backdrop-filter: blur(14px);\n            }\n            #header-container h2 {\n                display: inline-flex;\n                margin: 0 18px 0 0;\n                padding: 4px;\n                z-index: 1;\n                font-size: 18px;\n            }\n            #header-container p {\n                display: inline-flex;\n                font-size: 16px;\n                min-width: fit-content ;\n            }\n            .power-button {\n                cursor: pointer; \n                flex-grow: inherit; \n                width: 24px;\n                height: 24px;\n                border-radius: 12px;\n                margin: 0 10px;\n                background: none !important;\n                justify-content: flex-end;\n                background-color: var(--background-color,var(--secondary-background-color));\n            }\n            .close-pop-up {\n                height: 50px;\n                width: 50px;\n                border: none;\n                border-radius: 50%;\n                z-index: 1;\n                background: var(--background-color,var(--secondary-background-color));\n                color: var(--primary-text-color);\n                flex-shrink: 0;\n                cursor: pointer;\n            }\n        `;(0,n.L2)(e,t,r,h,w,u,"","",a),(0,n.L2)(e,t,l,h,w,u,x)}t.initStyleAdded||t.popUp||i||(t.card.style.marginTop="4000px",t.initStyleAdded=!0);const rt=setTimeout((()=>{if(t.element||(t.element=t.getRootNode().querySelector("#root")),t.element&&(!t.popUp||x||i&&!t.editorModeAdded)){if(t.popUp=t.element,i&&t.popUp&&!t.editorModeAdded)return t.popUp.classList.add("editor"),t.popUp.classList.remove("close-pop-up","open-pop-up","hide-pop-up"),t.editorModeAdded=!0,void at();at(),clearTimeout(rt);const e=new Event("popUpInitialized");window.dispatchEvent(e)}else!i&&t.popUp&&t.editorModeAdded&&(t.popUp.classList.remove("editor"),t.editorModeAdded=!1)}),0);t.popUp&&F&&x&&(()=>{null===localStorage.getItem("previousTriggerState_"+W)&&localStorage.setItem("previousTriggerState_"+W,""),null===localStorage.getItem("isManuallyClosed_"+W)&&localStorage.setItem("isManuallyClosed_"+W,"false"),null===localStorage.getItem("isTriggered_"+W)&&localStorage.setItem("isTriggered_"+W,"false");let n=localStorage.getItem("previousTriggerState_"+W),i="true"===localStorage.getItem("isManuallyClosed_"+W),r="true"===localStorage.getItem("isTriggered_"+W);e.states[F].state!==Y||null!==n||r||(a(0,W),r=!0,localStorage.setItem("isTriggered_"+W,r)),e.states[F].state!==n&&(i=!1,localStorage.setItem("previousTriggerState_"+W,e.states[F].state),localStorage.setItem("isManuallyClosed_"+W,i)),e.states[F].state!==Y||i?e.states[F].state!==Y&&P&&t.popUp.classList.contains("open-pop-up")&&r&&!i&&(history.replaceState(null,null,location.href.split("#")[0]),o(window,"location-changed",!0),E=W+!1,r=!1,i=!0,localStorage.setItem("isManuallyClosed_"+W,i),localStorage.setItem("isTriggered_"+W,r)):(a(0,W),r=!0,localStorage.setItem("isTriggered_"+W,r))})()}(this);break;case"horizontal-buttons-stack":y(this);break;case"button":!function(t){const e=t._hass,o=t.editor;let{customStyles:a,entityId:s,icon:l,name:c,widthDesktop:d,widthDesktopDivided:p,isSidebarHidden:h,state:u,stateChanged:g,stateOn:m,formatedState:b,riseAnimation:f,marginCenter:y,popUpOpen:w,rgbaColor:x,rgbColor:k,bgOpacity:C,shadowOpacity:$,bgBlur:S,iconColorOpacity:E,iconColor:O,iconFilter:A,iconStyles:L,haStyle:I,themeBgColor:T,color:D}=v(t,t.config,e);b=s&&(g||o)?e.formatEntityState(e.states[s]):"";const V=t.config.button_type||"switch",M=!!t.config.show_state&&t.config.show_state;let z=s?e.states[s].attributes.brightness||0:"",B=s?e.states[s].attributes.volume_level||0:"",U=!1,q=z,H=B,W=0,F=0,Y=0,P=!1,R=null;if(!t.buttonAdded){const e=document.createElement("div");e.setAttribute("class","button-container"),t.content.appendChild(e)}const j=document.createElement("div");j.setAttribute("class","icon-container"),t.iconContainer=j;const N=document.createElement("div");N.setAttribute("class","name-container");const X=document.createElement("div");X.setAttribute("class","switch-button");const G=document.createElement("div");G.setAttribute("class","range-slider");const K=document.createElement("div");if(K.setAttribute("class","range-fill"),!t.buttonContainer||o){if(o&&t.buttonContainer){for(;t.buttonContainer.firstChild;)t.buttonContainer.removeChild(t.buttonContainer.firstChild);t.eventAdded=!1,t.wasEditing=!0}t.buttonContainer=t.content.querySelector(".button-container"),"slider"!==V||t.buttonAdded&&!o?("switch"===V||"custom"===V||o)&&(t.buttonContainer.appendChild(X),X.appendChild(j),X.appendChild(N),t.switchButton=t.content.querySelector(".switch-button")):(t.buttonContainer.appendChild(G),G.appendChild(j),G.appendChild(N),G.appendChild(K),t.rangeFill=t.content.querySelector(".range-fill")),(0,n.IU)(t,s,l,j,o),N.innerHTML=`\n            <p class="name">${c}</p>\n            ${M?`<p class="state">${b}</p>`:""}\n        `,t.buttonAdded=!0}function Z(t){i("success");let e=t.querySelector(".feedback-element");e||(e=document.createElement("div"),e.setAttribute("class","feedback-element"),t.appendChild(e)),e.style.animation="tap-feedback .5s",setTimeout((()=>{e.style.animation="none",t.removeChild(e)}),500)}function J(t){W=t.pageX||(t.touches?t.touches[0].pageX:0),F=t.pageY||(t.touches?t.touches[0].pageY:0),Y=G.value,t.target!==j&&t.target!==j.querySelector("ha-icon")&&(U=!0,document.addEventListener("mouseup",tt,{passive:!0}),document.addEventListener("touchend",tt,{passive:!0}),document.addEventListener("mousemove",Q,{passive:!0}),document.addEventListener("touchmove",Q,{passive:!0}),R=setTimeout((()=>{ot(t.pageX||t.touches[0].pageX),et(),R=null}),200))}function Q(t){const e=t.pageX||(t.touches?t.touches[0].pageX:0),n=t.pageY||(t.touches?t.touches[0].pageY:0);Math.abs(n-F)>Math.abs(e-W)?(clearTimeout(R),tt()):(document.removeEventListener("mousemove",Q),document.removeEventListener("touchmove",Q),document.addEventListener("mousemove",nt,{passive:!0}),document.addEventListener("touchmove",nt,{passive:!0}))}function tt(){U=!1,P=!1,et(),document.removeEventListener("mouseup",tt),document.removeEventListener("touchend",tt),document.removeEventListener("mousemove",nt),document.removeEventListener("touchmove",nt)}function et(){s.startsWith("light.")?(z=q,e.callService("light","turn_on",{entity_id:s,brightness:z})):s.startsWith("media_player.")&&(B=H,e.callService("media_player","volume_set",{entity_id:s,volume_level:B}))}function nt(t){const e=t.pageX||(t.touches?t.touches[0].pageX:0),n=t.pageY||(t.touches?t.touches[0].pageY:0);U&&Math.abs(e-W)>10?(i("light"),ot(e)):U&&Math.abs(n-F)>10&&(U=!1,G.value=Y)}function ot(t){const e=G.getBoundingClientRect(),n=Math.min(Math.max(t-e.left,0),e.width)/e.width;s.startsWith("light.")?q=Math.round(255*n):s.startsWith("media_player.")&&(H=n),K.style.transition="none",K.style.transform=`translateX(${100*n}%)`}M&&b&&(t.content.querySelector(".state").textContent=b),t.eventAdded||"switch"!==V?t.eventAdded||"slider"!==V?t.eventAdded||"custom"!==V||(X.addEventListener("click",(()=>Z(t.switchButton)),{passive:!0}),_(j,t.config),t.eventAdded=!0):(G.addEventListener("mousedown",J,{passive:!0}),G.addEventListener("touchstart",J,{passive:!0}),_(j,t.config),t.eventAdded=!0):(X.addEventListener("click",(()=>Z(t.switchButton)),{passive:!0}),X.addEventListener("click",(function(t){t.target!==j&&t.target!==j.querySelector("ha-icon")&&r(e,s)}),{passive:!0}),_(j,t.config),t.eventAdded=!0),t.isDragging||"slider"!==V||(t.rangeFill.style.transition="all .3s",s.startsWith("light.")?t.rangeFill.style.transform=`translateX(${z/255*100}%)`:s.startsWith("media_player.")&&(t.rangeFill.style.transform=`translateX(${100*B}%)`));const it=`\n        ha-card {\n            margin-top: 0 !important;\n            background: none !important;\n            opacity: ${"unavailable"!==u?"1":"0.5"};\n        }\n        \n        .button-container {\n            position: relative;\n            width: 100%;\n            height: 50px;\n            z-index: 0;\n            background-color: var(--background-color-2,var(--secondary-background-color));\n            border-radius: 25px;\n            mask-image: radial-gradient(white, black);\n            -webkit-mask-image: radial-gradient(white, black);\n            -webkit-backface-visibility: hidden;\n            -moz-backface-visibility: hidden;\n            -webkit-transform: translateZ(0);\n            overflow: hidden;\n        }\n        \n        .switch-button,\n        .range-slider {\n            display: inline-flex;\n            position: absolute;\n            height: 100%;\n            width: 100%;\n            transition: background-color 1.5s;\n            background-color: ${m&&["switch","custom"].includes(V)?"var(--accent-color)":"rgba(0,0,0,0)"};\n        }\n\n        .range-fill {\n            z-index: -1;\n            position: absolute;\n            top: 0;\n            bottom: 0;\n            left: 0;\n            background-color: ${E};\n            width: 100%;\n            left: -100%;\n        }\n        \n        .switch-button {\n            cursor: pointer !important;\n        }\n        \n        .range-slider {\n            cursor: ew-resize;\n        }\n        \n        .name-container {\n            position: relative;\n            display: ${M?"block":"inline-flex"};\n            margin-left: 4px;\n            z-index: 1;\n            font-weight: 600;\n            align-items: center;\n            line-height: ${M?"4px":"16px"};\n            padding-right: 16px;\n        }\n        \n        .state {\n            font-size: 12px;\n            opacity: 0.7;\n        }\n        \n        .feedback-element {\n            position: absolute;\n            top: 0;\n            left: 0;\n            opacity: 0;\n            width: 100%;\n            height: 100%;\n            background-color: rgb(0,0,0);\n        }\n        \n        @keyframes tap-feedback {\n            0% {transform: translateX(-100%); opacity: 0;}\n            64% {transform: translateX(0); opacity: 0.1;}\n            100% {transform: translateX(100%); opacity: 0;}\n        }\n\n        ${L}\n    `;(0,n.L2)(e,t,it,a,u,s,g)}(this);break;case"separator":!function(t){const e=t._hass,o=t.editor,i=t.config;let{customStyles:a,entityId:r,icon:s,name:l,widthDesktop:c,widthDesktopDivided:d,isSidebarHidden:p,state:h,stateChanged:u,stateOn:g,formatedState:m,riseAnimation:b,marginCenter:f,popUpOpen:_,rgbaColor:y,rgbColor:w,bgOpacity:x,shadowOpacity:k,bgBlur:C,iconColorOpacity:$,iconColor:S,iconFilter:E,iconStyles:O,haStyle:A,themeBgColor:L,color:I}=v(t,i,e);if(!t.separatorAdded||o){if(o&&t.separatorContainer)for(;t.separatorContainer.firstChild;)t.separatorContainer.removeChild(t.separatorContainer.firstChild);t.separatorAdded||(t.separatorContainer=document.createElement("div"),t.separatorContainer.setAttribute("class","separator-container")),t.separatorContainer.innerHTML=`\n            <div>\n                <ha-icon icon="${s}"></ha-icon>\n                <h4>${l}</h4>\n            </div>\n            <div></div>\n        `,t.content.appendChild(t.separatorContainer),t.separatorAdded=!0}(0,n.L2)(e,t,"\n        .separator-container {\n            display: inline-flex;\n            width: 100%;\n            margin-top: 12px;\n        }\n        .separator-container div:first-child {\n            display: inline-flex;\n            max-width: calc(100% - 38px);\n        }\n        .separator-container div ha-icon {\n            display: inline-flex;\n            height: 24px;\n            width: 24px;\n            margin: 0 22px 0 8px;\n            transform: translateY(-2px);\n        }\n        .separator-container div h4 {\n            display: inline-flex;\n            margin: 0 20px 0 0;\n            font-size: 16px;\n            white-space: nowrap;\n            overflow: hidden;\n            text-overflow: ellipsis;\n        }\n        .separator-container div:last-child {\n            display: inline-flex; \n            border-radius: 6px; \n            opacity: 0.5; \n            margin-left: 10px; \n            flex-grow: 1; \n            height: 6px; \n            align-self: center; \n            background-color: var(--background-color,var(--secondary-background-color));\n        }\n    ",a)}(this);break;case"cover":!function(t){const e=t._hass,o=t.editor,i=t.config;let{customStyles:a,entityId:r,icon:s,name:l,widthDesktop:c,widthDesktopDivided:d,isSidebarHidden:p,state:h,stateChanged:u,stateOn:g,formatedState:m,riseAnimation:b,marginCenter:f,popUpOpen:y,rgbaColor:w,rgbColor:x,bgOpacity:k,shadowOpacity:C,bgBlur:$,iconColorOpacity:S,iconColor:E,iconFilter:O,iconStyles:A,haStyle:L,themeBgColor:I,color:T}=v(t,i,e);const D=i.icon_open?i.icon_open:"mdi:window-shutter-open",V=i.icon_close?i.icon_close:"mdi:window-shutter",M=i.open_service?i.open_service:"cover.open_cover",z=i.close_service?i.close_service:"cover.close_cover",B=i.stop_service?i.stop_service:"cover.stop_cover",U=i.icon_up?i.icon_up:"mdi:arrow-up",q=i.icon_down?i.icon_down:"mdi:arrow-down",H=!!t.config.show_state&&t.config.show_state;if(s="open"===e.states[i.entity].state?D:V,m=u?e.formatEntityState(e.states[r]):m||"",!t.coverAdded||o){if(o&&t.coverContainer)for(;t.coverContainer.firstChild;)t.coverContainer.removeChild(t.coverContainer.firstChild);t.coverContainer=document.createElement("div"),t.coverContainer.setAttribute("class","cover-container"),t.coverContainer.innerHTML=`\n            <div class="header-container">\n                <div class="icon-container">\n                </div>\n                <div class="name-container">\n                    <p class="name">${l}</p>\n                    <p class="state"></p>\n                </div>\n            </div>\n            <div class="buttons-container">\n                <button class="button open">\n                    <ha-icon icon="${U}"></ha-icon>\n                </button>\n                <button class="button stop">\n                    <ha-icon icon="mdi:stop"></ha-icon>\n                </button>\n                <button class="button close">\n                    <ha-icon icon="${q}"></ha-icon>\n                </button>\n            </div>\n        `,t.content.appendChild(t.coverContainer);const n=t.coverContainer.querySelector(".open"),a=t.coverContainer.querySelector(".stop"),s=t.coverContainer.querySelector(".close");n.addEventListener("click",(()=>{e.callService(M.split(".")[0],M.split(".")[1],{entity_id:r})}),{passive:!0}),a.addEventListener("click",(()=>{e.callService(B.split(".")[0],B.split(".")[1],{entity_id:r})}),{passive:!0}),s.addEventListener("click",(()=>{e.callService(z.split(".")[0],z.split(".")[1],{entity_id:r})}),{passive:!0}),t.iconContainer=t.content.querySelector(".icon-container"),_(t.iconContainer,i),t.coverAdded=!0}t.iconContainer&&(u||o)&&(t.iconContainer.innerHTML=`<ha-icon icon="${s}" class="icon"></ha-icon>`,t.content.querySelector(".state").textContent=H?m:""),(0,n.L2)(e,t,"\n        ha-card {\n            margin-top: 0 !important;\n            background: none !important;\n        }\n        \n        .header-container {\n            display: flex;\n            align-items: center;\n            margin-bottom: 10px;\n        }\n        \n        .cover-container {\n            display: grid;\n        }\n        \n        .icon-container {\n            display: flex;\n            margin: 0 !important;\n            align-items: center;\n            justify-content: center;\n            cursor: pointer;\n            /*z-index: 1;*/\n            width: 48px;\n            height: 48px;\n            margin: 6px;\n            border-radius: 50%;\n            background-color: var(--card-background-color,var(--ha-card-background));\n            border: 6px solid var(--background-color-2,var(--secondary-background-color));\n            box-sizing: border-box;\n        }\n        \n        .name-container {\n            font-weight: 600;\n            margin-left: 10px;\n            line-height: 4px;\n        }\n        \n        .buttons-container {\n            display: grid;\n            align-self: center;\n            grid-auto-flow: column;\n            grid-gap: 18px;             \n        }\n        \n        .state {\n            font-size: 12px;\n            opacity: 0.7;\n        }\n        \n        ha-icon {\n            display: flex; \n            height: 24px; \n            width: 24px; \n            color: var(--primary-text-color);\n        }\n        \n        .button {\n            display: flex;\n            background: var(--background-color-2,var(--secondary-background-color));\n            height: 42px;\n            border-radius: 32px;\n            align-items: center;\n            justify-content: center;\n            cursor: pointer;\n            border: none;\n        }\n    ",a,h,r)}(this);break;case"empty-column":!function(t){if(!t.emptyCollumnAdded){const e=document.createElement("div");e.setAttribute("class","empty-column"),e.innerHTML='\n            <div style="display: flex; width: 100%;"></div>\n        ',t.content.appendChild(e),t.emptyColumnAdded=!0}}(this)}}setConfig(t){if("pop-up"===t.card_type){if(!t.hash)throw new Error("You need to define an hash. Please note that this card must be placed inside a vertical_stack to work as a pop-up.")}else if("horizontal-buttons-stack"===t.card_type){var e={};for(var n in t)if(n.match(/^\d+_icon$/)){var o=n.replace("_icon","_link");if(void 0===t[o])throw new Error("You need to define "+o);if(e[t[o]])throw new Error("You can't use "+t[o]+" twice");e[t[o]]=!0}}else if(("button"===t.card_type||"cover"===t.card_type)&&!t.entity)throw new Error("You need to define an entity");if(window.entityError)throw new Error("You need to define a valid entity");this.config=t}getCardSize(){return-1e4}static getConfigElement(){return document.createElement("bubble-card-editor")}}customElements.define("bubble-card",$),customElements.define("bubble-card-editor",class extends w{setConfig(t){this._config={...t}}static get properties(){return{hass:{},_config:{}}}get _card_type(){return this._config.card_type||""}get _button_type(){return this._config.button_type||"switch"}get _entity(){return this._config.entity||""}get _name(){return this._config.name||""}get _icon(){return this._config.icon||""}get _state(){return this._config.state||""}get _text(){return this._config.text||""}get _hash(){return this._config.hash||"#pop-up-name"}get _trigger_entity(){return this._config.trigger_entity||""}get _trigger_state(){return this._config.trigger_state||""}get _trigger_close(){return this._config.trigger_close||!1}get _margin(){return this._config.margin||"7px"}get _margin_top_mobile(){return this._config.margin_top_mobile||"0px"}get _margin_top_desktop(){return this._config.margin_top_desktop||"0px"}get _width_desktop(){return this._config.width_desktop||"540px"}get _bg_color(){return this._config.bg_color||window.color}get _bg_opacity(){return void 0!==this._config.bg_opacity?this._config.bg_opacity:"88"}get _bg_blur(){return void 0!==this._config.bg_blur?this._config.bg_blur:"14"}get _shadow_opacity(){return void 0!==this._config.shadow_opacity?this._config.shadow_opacity:"0"}get _is_sidebar_hidden(){return this._config.is_sidebar_hidden||!1}get _rise_animation(){return void 0===this._config.rise_animation||this._config.rise_animation}get _auto_close(){return this._config.auto_close||""}get _back_open(){return this._config.back_open||!1}get _icon_open(){return this._config.icon_open||""}get _icon_close(){return this._config.icon_close||""}get _open_service(){return this._config.open_service||"cover.open_cover"}get _close_service(){return this._config.open_service||"cover.close_cover"}get _stop_service(){return this._config.open_service||"cover.stop_cover"}get _auto_order(){return this._config.auto_order||!1}get _highlightCurrentview(){return this._config.highlightCurrentview||!1}get _show_state(){return this._config.show_state||!1}render(){if(!this.hass)return x``;if(!this.listsUpdated){const t=t=>({label:t,value:t});this.allEntitiesList=Object.keys(this.hass.states).map(t),this.lightList=Object.keys(this.hass.states).filter((t=>"light"===t.substr(0,t.indexOf(".")))).map(t),this.sensorList=Object.keys(this.hass.states).filter((t=>"sensor"===t.substr(0,t.indexOf(".")))).map(t),this.binarySensorList=Object.keys(this.hass.states).filter((t=>"binary_sensor"===t.substr(0,t.indexOf(".")))).map(t),this.coverList=Object.keys(this.hass.states).filter((t=>"cover"===t.substr(0,t.indexOf(".")))).map(t),this.cardTypeList=[{label:"Button",value:"button"},{label:"Cover",value:"cover"},{label:"Empty column",value:"empty-column"},{label:"Horizontal buttons stack",value:"horizontal-buttons-stack"},{label:"Pop-up",value:"pop-up"},{label:"Separator",value:"separator"}],this.buttonTypeList=[{label:"Switch",value:"switch"},{label:"Slider",value:"slider"}],this.listsUpdated=!0}const e=this.allEntitiesList,n=(this.lightList,this.sensorList,this.coverList),o=this.cardTypeList,i=this.buttonTypeList;if("pop-up"===this._config.card_type)return x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <h3>Pop-up 
                        <span style="
                            font-size: 10px !important;
                            color: #fff;
                            background: rgb(0,90,140);
                            padding: 2px 6px;
                            border-radius: 8px;
                        ">
                            Regular mode
                        </span>
                    </h3>
                    <ha-alert alert-type="info">This card allows you to convert any vertical stack into a pop-up. Each pop-up can be opened by targeting its link (e.g. '#pop-up-name'), with navigation_path or with the horizontal buttons stack that is included.<br><b>It must be placed within a vertical-stack card at the top most position to function properly. The pop-up will be hidden by default until you open it.</b><br><br><a style="color: #fff" href="https://github.com/Clooos/Bubble-Card#pop-up-optimization">How to get the optimized mode?</a></ha-alert>
                    <ha-textfield
                        label="Hash (e.g. #kitchen)"
                        .value="${this._hash}"
                        .configValue="${"hash"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Name"
                        .value="${this._name}"
                        .configValue="${"name"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    ${this.makeDropdown("Optional - Icon","icon")}
                    ${this.makeDropdown("Optional - Entity to toggle (e.g. room light group)","entity",e)}
                    ${this.makeDropdown("Optional - Entity state to display (e.g. room temperature)","state",e)}
                    <ha-textfield
                        label="Optional - Additional text"
                        .value="${this._text}"
                        .configValue="${"text"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Auto close in milliseconds (e.g. 15000)"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        step="1000"
                        .value="${this._auto_close}"
                        .configValue="${"auto_close"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <h3>Pop-up trigger</h3>
                    <ha-alert alert-type="info">This allows you to open this pop-up based on the state of any entity, for example you can open a "Security" pop-up with a camera when a person is in front of your house. You can also create a toggle helper (input_boolean) and trigger its opening/closing in an automation.</ha-alert>
                    ${this.makeDropdown("Optional - Entity to open the pop-up based on its state","trigger_entity",e)}
                    <ha-textfield
                        label="Optional - State to open the pop-up"
                        .value="${this._trigger_state}"
                        .configValue="${"trigger_state"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-formfield .label="Optional - Close when the state is different">
                        <ha-switch
                            aria-label="Optional - Close when the state is different"
                            .checked=${this._trigger_close}
                            .configValue="${"trigger_close"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Close when the state is different</label> 
                        </div>
                    </ha-formfield>
                    <h3>Styling options</h3>
                    <ha-textfield
                        label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                        .value="${this._margin}"
                        .configValue="${"margin"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Top margin on mobile (e.g. -56px if your header is hidden)"
                        .value="${this._margin_top_mobile}"
                        .configValue="${"margin_top_mobile"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Top margin on desktop (e.g. 50% for an half sized pop-up)"
                        .value="${this._margin_top_desktop}"
                        .configValue="${"margin_top_desktop"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Width on desktop (100% by default on mobile)"
                        .value="${this._width_desktop}"
                        .configValue="${"width_desktop"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-formfield .label="Optional - Fix when the sidebar is hidden on desktop (turn this to false if your sidebar is unmodified)">
                        <ha-switch
                            aria-label="Optional - Fix when the sidebar is hidden on desktop (turn this to false if your sidebar is unmodified)"
                            .checked=${this._is_sidebar_hidden}
                            .configValue="${"is_sidebar_hidden"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Fix when the sidebar is hidden on desktop (turn this to false if your sidebar is unmodified)</label> 
                        </div>
                    </ha-formfield>
                    <ha-textfield
                        label="Optional - Background color (any hex, rgb or rgba value)"
                        .value="${this._bg_color}"
                        .configValue="${"bg_color"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Background opacity (0-100 range)"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max="100"
                        .value="${this._bg_opacity}"
                        .configValue="${"bg_opacity"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Background blur (0-100 range)"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max="100"
                        .value="${this._bg_blur}"
                        .configValue="${"bg_blur"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Shadow opacity (0-100 range)"
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max="100"
                        .configValue="${"shadow_opacity"}"
                        .value="${this._shadow_opacity}""
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-alert alert-type="info">Set ‘Background blur’ to 0 if your pop-up animations are rendering at low FPS.</ha-alert>
                    ${this.makeVersion()}
              </div>
            `;if("button"===this._config.card_type)return x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <h3>Button</h3>
                    <ha-alert alert-type="info">This card can be a slider or a button, allowing you to toggle your entities, control the brightness of your lights and the volume of your media players. To access color / control of an entity, simply tap on the icon.</ha-alert>
                    ${this.makeDropdown("slider"!==this._button_type?"Entity (toggle)":"Entity (light or media_player)","entity",e)}
                     <ha-formfield .label="Optional - Show entity state">
                        <ha-switch
                            aria-label="Optional - Show entity state"
                            .checked=${this._show_state}
                            .configValue="${"show_state"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Show entity state</label> 
                        </div>
                    </ha-formfield>
                    ${this.makeDropdown("Button type","button_type",i)}
                    <ha-textfield
                        label="Optional - Name"
                        .value="${this._name}"
                        .configValue="${"name"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    ${this.makeDropdown("Optional - Icon","icon")}
                    ${this.makeVersion()}
                </div>
            `;if("separator"===this._config.card_type)return x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <h3>Separator</h3>
                    <ha-alert alert-type="info">This card is a simple separator for dividing your pop-up into categories / sections. e.g. Lights, Devices, Covers, Settings, Automations...</ha-alert>
                    <ha-textfield
                        label="Name"
                        .value="${this._name}"
                        .configValue="${"name"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    ${this.makeDropdown("Icon","icon")}
                    ${this.makeVersion()}
              </div>
            `;if("horizontal-buttons-stack"===this._config.card_type){if(!this.buttonAdded&&this.shadowRoot.querySelector("#add-button")){this.buttonAdded=!0;const t=this.shadowRoot.querySelector("#add-button");for(this.buttonIndex=0;this._config[this.buttonIndex+1+"_link"];)this.buttonIndex++;t.addEventListener("click",(()=>{this.buttonIndex++;const e=t.style.opacity,n=t.innerText;t.style.opacity="0.6",t.style.transition="opacity 1s",t.innerText="Loading...",setTimeout((()=>{t.style.opacity=e,t.innerText=n}),5e3)}),{passive:!0})}return x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <h3>Horizontal buttons stack</h3>
                    <ha-alert alert-type="info">This card is the companion to the pop-up card, allowing you to open the corresponding pop-ups. It also allows you to open any page of your dashboard. In addition, you can add your motion sensors so that the order of the buttons adapts according to the room you just entered. This card is scrollable, remains visible and acts as a footer.<br><br><b>Please note that this card may take some time to load in edit mode.</b></ha-alert>
                    <ha-formfield .label="Auto order">
                        <ha-switch
                            aria-label="Toggle auto order"
                            .checked=${this._auto_order}
                            .configValue="${"auto_order"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Auto order (Presence/occupancy sensors needed)</label> 
                        </div>
                    </ha-formfield>
                    <div id="buttons-container">
                        ${this.makeButton()}
                    </div>
                    <button id="add-button">Add Button</button>
                    <h3>Styling options</h3>
                    <ha-textfield
                        label="Optional - Margin (fix centering on some themes) (e.g. 13px)"
                        .value="${this._margin}"
                        .configValue="${"margin"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Width on desktop (100% by default on mobile)"
                        .value="${this._width_desktop}"
                        .configValue="${"width_desktop"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-formfield .label="Optional - Fix when the sidebar hidden on desktop">
                        <ha-switch
                            aria-label="Optional - Fix when the sidebar hidden on desktop"
                            .checked=${this._is_sidebar_hidden}
                            .configValue="${"is_sidebar_hidden"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Fix when the sidebar is hidden on desktop</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="Optional - Rise animation (Displays an animation once the page has loaded)">
                        <ha-switch
                            aria-label="Optional - Rise animation (Displays an animation once the page has loaded)"
                            .checked=${this._rise_animation}
                            .configValue="${"rise_animation"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Rise animation (Displays an animation once the page has loaded)</label> 
                        </div>
                    </ha-formfield>
                    <ha-formfield .label="Optional - Highlight current hash / view">
                        <ha-switch
                            aria-label="Toggle "Highlight current view"
                            .checked=${this._highlightCurrentview}
                            .configValue="${"highlightCurrentview"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Highlight current hash / view</label> 
                        </div>
                    </ha-formfield>
                    ${this.makeVersion()}
                </div>
            `}return"cover"===this._config.card_type?x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <h3>Cover</h3>
                    <ha-alert alert-type="info">This card allows you to control your covers.</ha-alert>
                    ${this.makeDropdown("Entity","entity",n)}
                    <ha-formfield .label="Optional - Show entity state">
                        <ha-switch
                            aria-label="Optional - Show entity state"
                            .checked=${this._show_state}
                            .configValue="${"show_state"}"
                            @change=${this._valueChanged}
                        ></ha-switch>
                        <div class="mdc-form-field">
                            <label class="mdc-label">Optional - Show entity state</label> 
                        </div>
                    </ha-formfield>
                    <ha-textfield
                        label="Optional - Name"
                        .value="${this._name||""}"
                        .configValue="${"name"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Open service (cover.open_cover by default)"
                        .value="${this._open_service}"
                        .configValue="${"open_service"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Stop service (cover.stop_cover by default)"
                        .value="${this._stop_service}"
                        .configValue="${"stop_service"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Close service (cover.close_cover by default)"
                        .value="${this._close_service}"
                        .configValue="${"close_service"}"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    ${this.makeDropdown("Optional - Open icon","icon_open")}
                    ${this.makeDropdown("Optional - Closed icon","icon_close")}
                    <h3>Styling options</h3>
                    ${this.makeDropdown("Optional - Arrow down icon","icon_down")}
                    ${this.makeDropdown("Optional - Arrow up icon","icon_up")}
                    ${this.makeVersion()}
                </div>
            `:"empty-column"===this._config.card_type?x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <h3>Empty column</h3>
                    <ha-alert alert-type="info">Just an empty card to fill any empty column.</ha-alert>
                    ${this.makeVersion()}
                </div>
            `:this._config.card_type?void 0:x`
                <div class="card-config">
                    ${this.makeDropdown("Card type","card_type",o)}
                    <ha-alert alert-type="info">You need to add a card type first.</ha-alert>
                    <img style="width: 100%" src="https://user-images.githubusercontent.com/36499953/268039672-6dd13476-42c5-427c-a4d8-ad4981fc2db7.gif">
                    <p>The <b>Bubble Card ${t}</b> changelog is available <a href="https://github.com/Clooos/Bubble-Card/releases/tag/${t}"><b>here</b></a>.
                    <hr />
                    <p>Almost everything is available in the GUI editor, but in the YAML editor you can add your own <b>custom styles</b>, create <b>custom buttons</b> or modify the <b>tap actions</b> of all cards. You can find more details on my GitHub page.</p>
                    <a href="https://github.com/Clooos/Bubble-Card"><img src="https://img.shields.io/badge/GitHub-Documentation-blue?logo=github"></a>
                    <hr />
                    <p>And if you like my project and want to support me, please consider making a donation. Any amount is welcome and very much appreciated! 🍻</p>
                    <div style="display: inline-block;">
                        <a href="https://www.buymeacoffee.com/clooos"><img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20beer-yellow?logo=buy-me-a-coffee"></a> 
                        <a href="https://www.paypal.com/donate/?business=MRVBV9PLT9ZPL&no_recurring=0&item_name=Hi%2C+I%27m+Clooos+the+creator+of+Bubble+Card.+Thank+you+for+supporting+me+and+my+passion.+You+are+awesome%21+%F0%9F%8D%BB&currency_code=EUR"><img src="https://img.shields.io/badge/Donate-PayPal-blue?logo=paypal"></img></a>
                    </div>
                    ${this.makeVersion()}
                </div>
            `}makeDropdown(t,e,n){return this.hass,t.includes("icon")||t.includes("Icon")?x`
                <div>
                    <ha-icon-picker
                        label="${t}"
                        .value="${this["_"+e]}"
                        .configValue="${e}"
                        item-label-path="label"
                        item-value-path="value"
                        @value-changed="${this._valueChanged}"
                    ></ha-icon-picker>
                </div>
            `:x`
            <div>
                <ha-combo-box
                    label="${t}"
                    .value="${this["_"+e]}"
                    .configValue="${e}"
                    .items="${n}"
                    @value-changed="${this._valueChanged}"
                ></ha-combo-box>
            </div>
          `}makeButton(){let t=[];for(let e=1;e<=this.buttonIndex;e++)t.push(x`
                <div class="${e}_button">
                    <div class="button-header">
                        <ha-icon class="remove-button" icon="mdi:close" @click=${()=>this.removeButton(e)}></ha-icon>
                        <span class="button-number">Button ${e}</span>
                    </div>
                    <ha-textfield
                        label="Link / Hash to pop-up (e.g. #kitchen)"
                        .value="${this._config[e+"_link"]||""}"
                        .configValue="${e}_link"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-textfield
                        label="Optional - Name"
                        .value="${this._config[e+"_name"]||""}"
                        .configValue="${e}_name"
                        @input="${this._valueChanged}"
                        style="width: 100%;"
                    ></ha-textfield>
                    <ha-icon-picker
                        label="Optional - Icon"
                        .value="${this._config[e+"_icon"]||""}"
                        .configValue="${e}_icon"
                        item-label-path="label"
                        item-value-path="value"
                        @value-changed="${this._valueChanged}"
                    ></ha-icon-picker>
                    <ha-combo-box
                        label="Optional - Light / Light group (For background color)"
                        .value="${this._config[e+"_entity"]||""}"
                        .configValue="${e}_entity"
                        .items="${this.allEntitiesList}"
                        @value-changed="${this._valueChanged}"
                    ></ha-combo-box>
                    <ha-combo-box
                        label="Optional - Presence / Occupancy sensor (For button auto order)"
                        .value="${this._config[e+"_pir_sensor"]||""}"
                        .configValue="${e}_pir_sensor"
                        .disabled=${!this._config.auto_order}
                        .items="${this.binarySensorList}"
                        @value-changed="${this._valueChanged}"
                    ></ha-combo-box>
                </div>
            `);return t}makeVersion(){return x`
            <h4 style="
                font-size: 12px !important;
                color: #fff;
                background: rgba(0,0,0,0.1);
                padding: 8px 16px;
                border-radius: 32px;
            ">
                Bubble Card 
                <span style="
                    font-size: 10px;
                    background: rgba(0,120,180,1);
                    padding: 0px 8px;
                    border-radius: 12px;
                    margin-right: -6px;
                    float: right;
                ">
                    ${t}
                </span>
            </h4>
        `}removeButton(t){delete this._config[t+"_name"],delete this._config[t+"_icon"],delete this._config[t+"_link"],delete this._config[t+"_entity"],delete this._config[t+"_pir_sensor"];for(let e=t;e<this.buttonIndex;e++)this._config[e+"_name"]=this._config[e+1+"_name"],this._config[e+"_icon"]=this._config[e+1+"_icon"],this._config[e+"_link"]=this._config[e+1+"_link"],this._config[e+"_entity"]=this._config[e+1+"_entity"],this._config[e+"_pir_sensor"]=this._config[e+1+"_pir_sensor"];delete this._config[this.buttonIndex+"_name"],delete this._config[this.buttonIndex+"_icon"],delete this._config[this.buttonIndex+"_link"],delete this._config[this.buttonIndex+"_entity"],delete this._config[this.buttonIndex+"_pir_sensor"],this.buttonIndex--,o(this,"config-changed",{config:this._config})}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target,n=t.detail;let i,a="string"==typeof e.value?e.value.replace(",","."):e.value;("string"!=typeof a||!a.endsWith(".")&&"-"!==a)&&(e.configValue&&("ha-switch"===e.type?i=e.checked:(""!==a&&(!isNaN(parseFloat(a))&&isFinite(a)?(i=parseFloat(a),isNaN(i)&&(i=void 0)):i=a),i=void 0!==i?i:void 0===e.checked&&n.value?e.checked||n.value:e.value||e.checked),this._config[e.configValue]!==i&&(this._config={...this._config,[e.configValue]:i},o(this,"config-changed",{config:this._config}))),"HA-COMBO-BOX"===e.tagName&&n.value&&(this._config={...this._config,[e.configValue]:n.value},o(this,"config-changed",{config:this._config})))}static get styles(){return k`
          div {
            display: grid;
            grid-gap: 12px;
          }
          #add-button {
            margin-top: 12px;
            color: var(--text-primary-color);
            width: 100%;
            height: 32px;
            border-radius: 16px;
            border: none;
            background-color: var(--accent-color);
            cursor: pointer;
          }
          a {
            color: var(--primary-text-color);
          }
          p {
            margin-bottom: 4px;
          }
          hr {
            display: inline-block;
            width: 100%;
            background-color: var(--text-primary-color);
            opacity: .15;
            margin: 8px 0 0 0;
          }
          .button-header {
            height: auto;
            width: 100%;
            display: inline-flex;
            align-items: center;

          }
          .button-number {
            display: inline-flex;
            width: auto;
          }
          .remove-button {
            display: inline-flex;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            vertical-align: middle;
            cursor: pointer;
          }
        `}}),window.customCards=window.customCards||[],window.customCards.push({type:"bubble-card",name:"Bubble Card",preview:!1,description:"A minimalist card collection with a nice pop-up touch."}),console.info(`%c Bubble Card %c ${t} `,"background-color: #555;color: #fff;padding: 3px 2px 3px 3px;border-radius: 14px 0 0 14px;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)","background-color: #506eac;color: #fff;padding: 3px 3px 3px 2px;border-radius: 0 14px 14px 0;font-family: DejaVu Sans,Verdana,Geneva,sans-serif;text-shadow: 0 1px 0 rgba(1, 1, 1, 0.3)")})()})();