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
  ww: Math.min(document.documentElement.clientWidth, window.innerWidth),
  wh: window.innerHeight,
  // loading: true,
  inLoadingCover: true
}

function deskMethods () {
  return {
    checkReportId: () => {
      const regexp = /^\/report[1-5](\/?)/i
      let pathname = window.location.pathname
      if (process.env.NODE_ENV === 'production') pathname = pathname.split('where-to-fit-in')[1]
      if (regexp.test(pathname)) this.deskData.beginningReportId = Number(pathname[7])
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
