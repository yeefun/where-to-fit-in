<template lang="pug">
  section.reports-list
    .reports-list__report(
      v-for="report in relatedReports"
      :key="report.id"
      :style="{ backgroundImage: `url(${report.img})` }"
    )
      h1(:class="$root.mobMethods().white(report.id)") {{ report.title }}
      p(:class="$root.mobMethods().white(report.id)") {{ report.intro }}
      button(@click="showRelatedReport(report.id)" :id="`relatedReportBtn${report.id}`") 看更多⋯
</template>

<script>
export default {
  name: 'RelatedReports',
  computed: {
    relatedReports () {
      const reports = []
      const reportNum = this.$root.mobData.reports.length
      for (let i = 0; i < (reportNum - 1); i++) {
        const idx = this.$root.mobData.currentReportId + i
        reports.push(this.$root.mobData.reports[`${(idx > (reportNum - 1)) ? (idx - reportNum) : idx}`])
      }
      return reports
    }
  },
  methods: {
    showRelatedReport (id) {
      this.$root.mobData.isShowingRelatedReport = true
      this.$root.mobMethods().getCurrentReportScrollTop()
      this.$root.mobData.relatedReportId = id
      this.$root.mobData.isTransition = true
    }
  }
}
</script>

<style lang="stylus">

</style>
