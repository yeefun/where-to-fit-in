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
    wEl: window,
    bodyEl: null,
    // desk
    htmlEl: document.documentElement,
    ww: Math.min(document.documentElement.clientWidth, window.innerWidth),
    wh: window.innerHeight
  },
  created () {
    if (this.isMob) this.mobMethods().checkBeginningReportId()
    else this.deskMethods().checkReportId()
  },
  beforeMount () {
    this.bodyEl = document.body
    if (this.isMob) {
      this.mobMethods().toggleBodyScrollBar()
    }
  },
  mounted () {
    if (!this.isMob) {
      this.wEl.addEventListener('resize', this.alterWindowSize)
    }
  },
  methods: {
    mobMethods,
    deskMethods,
    // common
    white (id) {
      return { 'color-white': (id === 2 || id === 5) }
    },
    // desk
    alterWindowSize () {
      this.ww = this.htmlEl.clientWidth
      this.wh = this.wEl.innerHeight
    }
  },
  watch: {
    'mobData.isReportContent' () {
      this.mobData.isTransition = false
    },
    'mobData.isTransition' () {
      this.mobMethods().toggleBodyScrollBar()
    }
  }
}).$mount('#app')
