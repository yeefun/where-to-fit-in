import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    inReportCover: true,
    baseReports: 1,
    currentReport: '',
    removedReportIdx: NaN
  }
  // computed: {
  //   currentReport () {
  //   }
  // },
}).$mount('#app')
