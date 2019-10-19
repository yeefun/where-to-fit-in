import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    inHome: true,
    inReportCover: true,
    switchTimes: 0,
    baseReports: [0],
    currentPerson: null,
    currentReport: null,
    removedRelatedReportId: 0,
    isPopState: false,
    wEl: window,
    htmlEl: document.documentElement,
    ww: Math.min(document.documentElement.clientWidth, window.innerWidth),
    wh: window.innerHeight,
    beginningReportId: 0
  },
  created () {
    this.checkReportId()
  },
  mounted () {
    window.addEventListener('resize', this.alterWindowSize)
  },
  methods: {
    alterWindowSize () {
      this.ww = this.htmlEl.clientWidth
      this.wh = this.wEl.innerHeight
    },
    checkReportId () {
      const regexp = /^\/report[1-5](\/?)$/i
      const pathname = window.location.pathname
      if (regexp.test(process.env.NODE_ENV === 'production' ? pathname.split('where-to-fit-in')[1] : pathname)) {
        this.beginningReportId = Number(pathname[7])
      }
    }
  }
}).$mount('#app')
