import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    baseReports: 1,
    displayedReport: ''
  //   TheRelatedComponentNum: 1,
  //   isReportContent: false
  }
}).$mount('#app')
