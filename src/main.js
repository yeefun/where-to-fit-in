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
    ww: window.innerWidth,
    wh: window.innerHeight,
    beginningReportId: 0
  },
  created () {
    const regexp = /^\/report[1-5]$/i
    const pathname = window.location.pathname
    if (regexp.test(pathname)) {
      this.beginningReportId = Number(pathname[7])
    }
  },
  mounted () {
    window.addEventListener('resize', this.alterWindowSize)
  },
  methods: {
    alterWindowSize () {
      this.ww = window.innerWidth
      this.wh = window.innerHeight
    }
  }
}).$mount('#app')
