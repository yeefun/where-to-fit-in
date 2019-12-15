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
    isMob: isTouchDevice() || isMobileOrTablet(),
    publicPath: process.env.BASE_URL,
    isPopState: false,
    wEl: window,
    bodyEl: null
  },
  created () {
    if (this.isMob) {
      this.mobMethods().checkBeginningReportId()
    } else {
      this.deskMethods().checkReportId()
    }
  },
  beforeMount () {
    this.bodyEl = document.body
    if (this.isMob) {
      this.mobMethods().toggleBodyScrollBar()
    }
  },
  mounted () {
    if (!this.isMob) {
      this.wEl.addEventListener('resize', this.deskMethods().alterWindowSize)
    }
  },
  methods: {
    mobMethods,
    deskMethods,
    white (id) {
      return { 'color-white': (id === 2 || id === 5) }
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
