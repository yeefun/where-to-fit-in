const deskData = {
  inHome: true,
  inReportCover: true,
  switchTimes: 0,
  baseReports: [ 0 ],
  currentPerson: null,
  currentReport: null,
  removedRelatedReportId: 0,
  beginningReportId: 0,
  isBeginning: false,
  htmlEl: document.documentElement,
  ww: document.documentElement.clientWidth,
  wh: window.innerHeight,
  inLoadingCover: true,
  isMuted: true,
  isMRTBgImgLoad: false,
  isLogoLoad: false
}

function deskMethods () {
  return {
    checkReportId: () => {
      const regexp = /^\/report[1-5](\/?)/i
      const state = window.history.state
      const pathname = window.location.pathname

      if (regexp.test(pathname)) {
        this.deskData.inLoadingCover = false
        this.deskData.beginningReportId = Number(pathname[ 7 ])
      }
      if (state && state.place === 'report cover') { this.deskData.inLoadingCover = false }
    },
    alterWindowSize: () => {
      this.deskData.ww = this.deskData.htmlEl.clientWidth
      this.deskData.wh = this.wEl.innerHeight
    }
  }
}

export {
  deskData,
  deskMethods
}
