import Vue from 'vue'
import App from './App.vue'

import { mobData, mobMethods } from './util/mobile.js'
import { deskData, deskMethods } from './util/desktop.js'
import { isTouchDevice, isMobileOrTablet } from './util/tool.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    mobData,
    deskData,
    // common
    isMob: isTouchDevice() || isMobileOrTablet(),
    pathname: process.env.NODE_ENV === 'production' ? '/where-to-fit-in/' : '/',
    isPopState: false,
    // mob
    bodyEl: null,
    // desk
    wEl: window,
    htmlEl: document.documentElement,
    ww: Math.min(document.documentElement.clientWidth, window.innerWidth),
    wh: window.innerHeight
  },
  created () {
    if (this.isMob) this.mobMethods().checkBeginningReportId()
    else this.deskMethods().checkReportId()
  },
  beforeMount () {
    if (this.isMob) {
      this.bodyEl = document.body
      this.mobMethods().toggleBodyScrollBar()
    }
  },
  mounted () {
    if (this.isMob) this.mobData.baseReportEl = document.getElementById('base-report')
    else window.addEventListener('resize', this.alterWindowSize)
  },
  methods: {
    mobMethods,
    deskMethods,
    // desk
    alterWindowSize () {
      this.ww = this.htmlEl.clientWidth
      this.wh = this.wEl.innerHeight
    }
  },
  // todo
  watch: {
    // mob
    'mobData.isReportContent' () {
      this.mobData.isTransition = false
    },
    'mobData.isTransition' () {
      this.mobMethods().toggleBodyScrollBar()
    }
    // isReportContent () {
    //   this.isTransition = false
    // },
    // isTransition () {
    //   this.toggleBodyScrollBar()
    // }
  }
}).$mount('#app')
