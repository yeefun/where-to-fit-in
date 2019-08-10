import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    inReportCover: true,
    totalClickedReports: 0,
    baseReports: [0],
    currentReport: null,
    removedReportIdx: -1
  }
}).$mount('#app')
