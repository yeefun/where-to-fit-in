import Vue from 'vue'
import App from './App.vue'

import { isTouchDevice, isMobileOrTablet } from './util/tool.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    isMob: isTouchDevice() || isMobileOrTablet(),
    pathname: process.env.NODE_ENV === 'production' ? '/where-to-fit-in/' : '/',
    isPopState: false,
    wEl: window,
    htmlEl: document.documentElement,
    ww: Math.min(document.documentElement.clientWidth, window.innerWidth),
    wh: window.innerHeight,
    mobData: {},
    deskData: {
      inHome: true,
      inReportCover: true,
      switchTimes: 0,
      baseReports: [ 0 ],
      currentPerson: null,
      currentReport: null,
      removedRelatedReportId: 0,
      beginningReportId: 0
    }
  },
  created () {
    this.deskMethods.checkReportId()
  },
  mounted () {
    window.addEventListener('resize', this.alterWindowSize)
  },
  methods: {
    deskMethods () {
      return {
        checkReportId () {
          const regexp = /^\/report[1-5](\/?)/i
          let pathname = window.location.pathname
          if (process.env.NODE_ENV === 'production') pathname = pathname.split('where-to-fit-in')[1]
          if (regexp.test(pathname)) this.deskData.beginningReportId = Number(pathname[7])
        }
      }
    },
    alterWindowSize () {
      this.ww = this.htmlEl.clientWidth
      this.wh = this.wEl.innerHeight
    }
  }
}).$mount('#app')
