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
    isPopState: false
  }
}).$mount('#app')
