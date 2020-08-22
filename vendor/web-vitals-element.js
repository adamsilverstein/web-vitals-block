var t,n,e=function(){return "".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)},i=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1;return {name:t,value:n,delta:0,entries:[],id:e(),isFinal:!1}},a=function(t,n){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){var e=new PerformanceObserver((function(t){return t.getEntries().map(n)}));return e.observe({type:t,buffered:!0}),e}}catch(t){}},r=!1,o=!1,s=function(t){r=!t.persisted;},u=function(){addEventListener("pagehide",s),addEventListener("unload",(function(){}));},c=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];o||(u(),o=!0),addEventListener("visibilitychange",(function(n){var e=n.timeStamp;"hidden"===document.visibilityState&&t({timeStamp:e,isUnloading:r});}),{capture:!0,once:n});},l=function(t,n,e,i){var a;return function(){e&&n.isFinal&&e.disconnect(),n.value>=0&&(i||n.isFinal||"hidden"===document.visibilityState)&&(n.delta=n.value-(a||0),(n.delta||n.isFinal||void 0===a)&&(t(n),a=n.value));}},p=function(t){var n,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i("CLS",0),o=function(t){t.hadRecentInput||(r.value+=t.value,r.entries.push(t),n());},s=a("layout-shift",o);s&&(n=l(t,r,s,e),c((function(t){var e=t.isUnloading;s.takeRecords().map(o),e&&(r.isFinal=!0),n();})));},d=function(){return void 0===t&&(t="hidden"===document.visibilityState?0:1/0,c((function(n){var e=n.timeStamp;return t=e}),!0)),{get timeStamp(){return t}}},v=function(t){var n,e=i("FCP"),r=d(),o=a("paint",(function(t){"first-contentful-paint"===t.name&&t.startTime<r.timeStamp&&(e.value=t.startTime,e.isFinal=!0,e.entries.push(t),n());}));o&&(n=l(t,e,o));},m=function(t){var n=i("FID"),e=d(),r=function(t){t.startTime<e.timeStamp&&(n.value=t.processingStart-t.startTime,n.entries.push(t),n.isFinal=!0,s());},o=a("first-input",r),s=l(t,n,o);o?c((function(){o.takeRecords().map(r),o.disconnect();}),!0):window.perfMetrics&&window.perfMetrics.onFirstInputDelay&&window.perfMetrics.onFirstInputDelay((function(t,i){i.timeStamp<e.timeStamp&&(n.value=t,n.isFinal=!0,n.entries=[{entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+t}],s());}));},f=function(){return n||(n=new Promise((function(t){return ["scroll","keydown","pointerdown"].map((function(n){addEventListener(n,t,{once:!0,passive:!0,capture:!0});}))}))),n},g=function(t){var n,e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=i("LCP"),o=d(),s=function(t){var e=t.startTime;e<o.timeStamp?(r.value=e,r.entries.push(t)):r.isFinal=!0,n();},u=a("largest-contentful-paint",s);if(u){n=l(t,r,u,e);var p=function(){r.isFinal||(u.takeRecords().map(s),r.isFinal=!0,n());};f().then(p),c(p,!0);}},h=function(t){var n,e=i("TTFB");n=function(){try{var n=performance.getEntriesByType("navigation")[0]||function(){var t=performance.timing,n={entryType:"navigation",startTime:0};for(var e in t)"navigationStart"!==e&&"toJSON"!==e&&(n[e]=Math.max(t[e]-t.navigationStart,0));return n}();e.value=e.delta=n.responseStart,e.entries=[n],e.isFinal=!0,t(e);}catch(t){}},"complete"===document.readyState?setTimeout(n,0):addEventListener("pageshow",n);};

var webVitals = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getCLS: p,
  getFCP: v,
  getFID: m,
  getLCP: g,
  getTTFB: h
});

const MS_UNIT = 'ms';

// borrowed from the vitals extension
// https://github.com/GoogleChrome/web-vitals-extension/blob/master/src/browser_action/vitals.js#L20-L23
const METRIC_CONFIG = new Map([
  [
    'CLS',
    {
      threshold: 0.1,
      observerEntryType: 'layout-shift',
      explainerURL: 'https://web.dev/cls/',
    },
  ],
  [
    'FCP',
    {
      threshold: 2500,
      observerEntryType: 'paint',
      explainerURL: 'https://web.dev/fcp/',
      unit: MS_UNIT,
    },
  ],
  [
    'FID',
    {
      threshold: 100,
      observerEntryType: 'first-input',
      explainerURL: 'https://web.dev/fid/',
      unit: MS_UNIT,
    },
  ],
  [
    'LCP',
    {
      threshold: 2500,
      observerEntryType: 'paint',
      explainerURL: 'https://web.dev/lcp/',
      unit: MS_UNIT,
    },
  ],
  [
    'TTFB',
    {
      threshold: 2500,
      explainerURL: 'https://web.dev/time-to-first-byte/',
      unit: MS_UNIT,
    },
  ],
]);

const GENERAL_ATTRIBUTES = ['class', 'style'];
const CONFIG_ATTRIBUTES = ['show-unsupported'];

class WebVitals extends HTMLElement {
  constructor() {
    super();

    this.unsupportedMetrics = [];
    this.metrics = new Map();
  }

  connectedCallback() {
    const metricAttributes = this.getMetricAttributes();
    const metricList = metricAttributes.length
      ? metricAttributes
      : [...METRIC_CONFIG.keys()];

    this.metrics = this.getMetrics(metricList);

    //
    this.render();

    for (let metricConfig of this.metrics.values()) {
      const { name, getWebVitalsValue } = metricConfig;

      getWebVitalsValue((metric) => {
        this.metrics.set(name, {
          ...metricConfig,
          ...metric,
        });
        this.render();
      }, true);
    }
  }

  getMetricAttributes() {
    return this.getAttributeNames()
      .filter(
        (attr) =>
          !GENERAL_ATTRIBUTES.includes(attr) &&
          !CONFIG_ATTRIBUTES.includes(attr)
      )
      .map((attr) => attr.toUpperCase());
  }

  getMetrics(metricList) {
    return new Map(
      metricList.reduce((acc, metricName) => {
        // exclude metric when it's not support by web-vitals
        const getWebVitalsValue = webVitals[`get${metricName}`];
        if (!getWebVitalsValue) {
          console.error(`${metricName} is not supported by '<web-vitals />'`);
          this.unsupportedMetrics.push(metricName);
          return acc;
        }

        // exclude metric when it's not supported
        const metricConfig = METRIC_CONFIG.get(metricName);
        const { observerEntryType } = metricConfig;
        if (
          observerEntryType &&
          !PerformanceObserver.supportedEntryTypes.includes(observerEntryType)
        ) {
          console.error(`${metricName} is not supported by your browser`);
          this.unsupportedMetrics.push(metricName);
          return acc;
        }

        return [
          ...acc,
          [
            metricName,
            {
              ...METRIC_CONFIG.get(metricName),
              getWebVitalsValue,
              name: metricName,
            },
          ],
        ];
      }, [])
    );
  }

  render() {
    this.innerHTML = `<div class="web-vitals">
      <dl>
        ${[...this.metrics]
          .map(([key, metric]) => {
            const { explainerURL, isFinal, threshold, unit, value } = metric;
            let classes = '';

            if (isFinal) {
              classes += 'is-final ';
              classes += value > threshold ? 'is-poor' : 'is-great';
            }

            return `
            <div class="${classes}">
              <dt><a href="${explainerURL}">${key}</a></dt>
              <dd>${
                value ? `${Math.floor(value)}${unit ? unit : ''}` : '...'
              }</dd>
            </div>
          `;
          })
          .join('')}
      </dl>
        ${
          this.unsupportedMetrics.length &&
          this.hasAttribute('show-unsupported')
            ? `<p>Not supported: ${this.unsupportedMetrics.join(', ')}</p>`
            : ''
        }
    </div>`;
  }
}

customElements.define('web-vitals', WebVitals);
