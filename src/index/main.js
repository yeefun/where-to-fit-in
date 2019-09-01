import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    inHome: true,
    inReportCover: true,
    seenReports: 0,
    baseReports: [0],
    curtPerson: null,
    curtReport: null,
    removedRelatedReportId: 0,
    isPopState: false,
    ww: window.innerWidth,
    wh: window.innerHeight,
    isMounted: false
  },
  mounted () {
    this.isMounted = true
    window.addEventListener('resize', this.alterWindowSize)
  },
  methods: {
    alterWindowSize () {
      this.ww = window.innerWidth
      this.wh = window.innerHeight
    }
  }
}).$mount('#app')
