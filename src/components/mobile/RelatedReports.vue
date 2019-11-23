<template lang="pug">
  section.reports-list
    .reports-list__report(
      v-for="report in relatedReports"
      :key="report.id"
      :style="{ backgroundImage: `url(${report.img})` }"
    )
      h1(:class="$root.white(report.id)") {{ report.title }}
      p(:class="$root.white(report.id)") {{ report.intro }}
      button(@click="showRelatedReport(report.id)" :id="`relatedReportBtn${report.id}`") 看更多⋯
</template>

<script>
export default {
  name: 'RelatedReports',
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
