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
    isPopState: false
  }
}).$mount('#app')
