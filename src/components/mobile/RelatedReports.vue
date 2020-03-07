<template lang="pug">
  section.reports-list
    div.reports-list__report(v-for="report in relatedReports" :key="report.id")
      ReportCoverPicture(:reportId="report.id")
      h1(:class="$root.white(report.id)") {{ report.title }}
      p(:class="$root.white(report.id)") {{ report.intro }}
      button(type="button" @click="showRelatedReport(report.id)" :id="`relatedReportBtn${report.id}`") 看更多⋯
</template>

<script>
import ReportCoverPicture from '../common/ReportCoverPicture.vue'

export default {
  name: 'RelatedReports',
  components: {
    ReportCoverPicture
  },
  computed: {
    relatedReports () {
      const reports = []
      const reportNum = this.mobData.reports.length
      for (let i = 0; i < (reportNum - 1); i++) {
        const idx = this.mobData.currentReportId + i
        reports.push(this.mobData.reports[`${(idx > (reportNum - 1)) ? (idx - reportNum) : idx}`])
      }
      return reports
    },
    mobData () {
      return this.$root.mobData
    }
  },
  methods: {
    showRelatedReport (id) {
      this.mobData.isShowingRelatedReport = true
      this.mobData.relatedReportId = id
      this.mobData.isTransition = true
    }
  }
}
</script>

<style lang="stylus">
</style>
