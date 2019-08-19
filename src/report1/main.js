import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: {
    inHome: true,
    inRptCover: true,
    seenRpts: 0,
    baseRpts: [0],
    curtPerson: null,
    curtRpt: null,
    removedRelatedRptId: 0,
    isPopState: false
  }
}).$mount('#app')
