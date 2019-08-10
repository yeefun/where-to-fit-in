import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    inHome: true,
    inReportCover: true,
    totalClickedReports: 0,
    baseReports: [0],
    currentPerson: null,
    currentReport: null,
    removedReportId: 0
  }
}).$mount('#app')
