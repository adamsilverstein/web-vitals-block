var t,n,e=function(){return"".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)},i=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;return{name:t,value:n,delta:0,entries:[],id:e(),isFinal:!1}},a=function(e,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var n=new PerformanceObserver((function(e){return e.getEntries().map(t)}));return n.observe({type:e,buffered:!0}),n}}catch(e){}},r=!1,o=!1,s=function(e){r=!e.persisted},u=function(){addEventListener("pagehide",s),addEventListener("unload",(function(){}))},c=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];o||(u(),o=!0),addEventListener("visibilitychange",(function(t){var n=t.timeStamp;"hidden"===document.visibilityState&&e({timeStamp:n,isUnloading:r})}),{capture:!0,once:t})},l=function(e,t,n,i){var r;return function(){n&&t.isFinal&&n.disconnect(),t.value>=0&&(i||t.isFinal||"hidden"===document.visibilityState)&&(t.delta=t.value-(r||0),(t.delta||t.isFinal||void 0===r)&&(e(t),r=t.value))}},p=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i("CLS",0),s=function(e){e.hadRecentInput||(r.value+=e.value,r.entries.push(e),t())},o=a("layout-shift",s);o&&(t=l(e,r,o,n),c((function(e){var n=e.isUnloading;o.takeRecords().map(s),n&&(r.isFinal=!0),t()})))},d=function(){return void 0===t&&(t="hidden"===document.visibilityState?0:1/0,c((function(e){var n=e.timeStamp;return t=n}),!0)),{get timeStamp(){return t}}},v=function(e){var t,n=i("FCP"),r=d(),s=a("paint",(function(e){"first-contentful-paint"===e.name&&e.startTime<r.timeStamp&&(n.value=e.startTime,n.isFinal=!0,n.entries.push(e),t())}));s&&(t=l(e,n,s))},m=function(e){var t=i("FID"),n=d(),r=function(e){e.startTime<n.timeStamp&&(t.value=e.processingStart-e.startTime,t.entries.push(e),t.isFinal=!0,o())},s=a("first-input",r),o=l(e,t,s);s?c((function(){s.takeRecords().map(r),s.disconnect()}),!0):window.perfMetrics&&window.perfMetrics.onFirstInputDelay&&window.perfMetrics.onFirstInputDelay((function(e,i){i.timeStamp<n.timeStamp&&(t.value=e,t.isFinal=!0,t.entries=[{entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+e}],o())}))},f=function(){return n||(n=new Promise((function(e){return["scroll","keydown","pointerdown"].map((function(t){addEventListener(t,e,{once:!0,passive:!0,capture:!0})}))}))),n},g=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i("LCP"),s=d(),o=function(e){var n=e.startTime;n<s.timeStamp?(r.value=n,r.entries.push(e)):r.isFinal=!0,t()},u=a("largest-contentful-paint",o);if(u){t=l(e,r,u,n);var p=function(){r.isFinal||(u.takeRecords().map(o),r.isFinal=!0,t())};f().then(p),c(p,!0)}},h=function(e){var t,n=i("TTFB");t=function(){try{var t=performance.getEntriesByType("navigation")[0]||function(){var e=performance.timing,t={entryType:"navigation",startTime:0};for(var n in e)"navigationStart"!==n&&"toJSON"!==n&&(t[n]=Math.max(e[n]-e.navigationStart,0));return t}();n.value=n.delta=t.responseStart,n.entries=[t],n.isFinal=!0,e(n)}catch(e){}},"complete"===document.readyState?setTimeout(t,0):addEventListener("pageshow",t)},webVitals=Object.freeze({__proto__:null,getCLS:p,getFCP:v,getFID:m,getLCP:g,getTTFB:h});const MS_UNIT="ms",METRIC_CONFIG=new Map([["CLS",{thresholds:{good:.1,needsImprovement:.25},observerEntryType:"layout-shift",explainerURL:"https://web.dev/cls/"}],["FCP",{thresholds:{good:2500},observerEntryType:"paint",explainerURL:"https://web.dev/fcp/",unit:"ms"}],["FID",{thresholds:{good:100,needsImprovement:300},observerEntryType:"first-input",explainerURL:"https://web.dev/fid/",unit:"ms"}],["LCP",{thresholds:{good:2500,needsImprovement:4e3},observerEntryType:"paint",explainerURL:"https://web.dev/lcp/",unit:"ms"}],["TTFB",{thresholds:{good:2500},explainerURL:"https://web.dev/time-to-first-byte/",unit:"ms"}]]),GENERAL_ATTRIBUTES=["class","style"],CONFIG_ATTRIBUTES=["show-unsupported"];class WebVitals extends HTMLElement{constructor(){super(),this.unsupportedMetrics=[],this.metrics=new Map}connectedCallback(){const e=this.getMetricAttributes(),t=e.length?e:[...METRIC_CONFIG.keys()];this.metrics=this.getMetrics(t),this.render();for(let e of this.metrics.values()){const{name:t,getWebVitalsValue:n}=e;n(n=>{this.metrics.set(t,{...e,...n}),this.render()},!0)}}getMetricAttributes(){return this.getAttributeNames().filter(e=>!GENERAL_ATTRIBUTES.includes(e)&&!CONFIG_ATTRIBUTES.includes(e)).map(e=>e.toUpperCase())}getMetrics(e){return new Map(e.reduce((e,t)=>{const n=webVitals["get"+t];if(!n)return console.error(t+" is not supported by '<web-vitals />'"),this.unsupportedMetrics.push(t),e;const i=METRIC_CONFIG.get(t),{observerEntryType:r}=i;return r&&!PerformanceObserver.supportedEntryTypes.includes(r)?(console.error(t+" is not supported by your browser"),this.unsupportedMetrics.push(t),e):[...e,[t,{...METRIC_CONFIG.get(t),getWebVitalsValue:n,name:t}]]},[]))}render(){this.innerHTML=`<div class="web-vitals">\n      <dl>\n        ${[...this.metrics].map(([e,t])=>{const{explainerURL:n,isFinal:i,thresholds:r,unit:s,value:a}=t;let o="";const{good:u,needsImprovement:c}=r;if(i){o+="is-final ";let e="is-poor";c&&a<=c&&(e="needs-improvement"),a<=u&&(e="is-good"),o+=e}return`\n            <div class="${o}">\n              <dt><a href="${n}">${e}</a></dt>\n              <dd>${a?`${Math.floor(a)}${s||""}`:"..."}</dd>\n            </div>\n          `}).join("")}\n      </dl>\n        ${this.unsupportedMetrics.length&&this.hasAttribute("show-unsupported")?`<p>Not supported: ${this.unsupportedMetrics.join(", ")}</p>`:""}\n    </div>`}}customElements.define("web-vitals",WebVitals);