const mobData = {
  currentReportId: 1,
  relatedReportId: 0,
  isReportContent: false,
  isTransition: false,
  isMovingBack: false,
  isShowingRelatedReport: false,
  reports: [
    {
      id: 1,
      title: '為什麼我們懼／拒胖？',
      intro: '處在一個懼怕肥胖、拒絕變胖的時代，是誰定義胖就不好？'
    },
    {
      id: 2,
      title: '「胖不健康」是提醒，還是詛咒？',
      intro: '不健康的身體樣貌有很多種，「肥胖」就真的是「病態」？'
    },
    {
      id: 3,
      title: '不想瘦？胖子：想被當成普通人看待',
      intro: '許多胖子從小就胖，要怎麼教育胖孩子？該如何蛻變成長？'
    },
    {
      id: 4,
      title: '縮小人生：胖子之大，何處可容身？',
      intro: '討厭被胖子擠壓？空間需求和身障相同，卻得不到同理。'
    },
    {
      id: 5,
      title: '胖網紅現身：渡邊直美改變了什麼？',
      intro: '胖直美啟發粉絲擁抱身材，想問她如何成為有自信的胖子！'
    }
  ],
  wh: window.innerHeight
}

function mobMethods () {
  return {
    toggleBodyScrollBar: () => {
      (this.mobData.isTransition || this.mobData.isReportContent) ? this.bodyEl.classList.add('no-scroll') : this.bodyEl.classList.remove('no-scroll')
    },
    checkBeginningReportId: () => {
      const regexp = /^\/report[1-5](\/?)/i
      const pathname = window.location.pathname

      if (regexp.test(pathname)) {
        this.mobData.currentReportId = Number(pathname[ 7 ])
        this.mobData.isReportContent = true
        history.replaceState({
          place: 'report',
          id: this.mobData.currentReportId
        }, '', `${this.$root.publicPath}report${this.mobData.currentReportId}`)
      }
    },
    backToTop: () => {
      document.getElementById('base-report').scrollTop = 0
    },
    alterWh: () => {
      this.mobData.wh = this.wEl.innerHeight
    }
  }
}

export {
  mobData,
  mobMethods
}
