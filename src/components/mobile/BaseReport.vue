<template lang="pug">
  .base-report#base-report(:class="{ show: mobData.isReportContent }")
    component(:is="`ReportContent${mobData.currentReportId}`")
    RelatedReports
</template>

<script>
export default {
  name: 'BaseReport',
  components: {
    ReportContent1: () => import('./ReportContent1.vue'),
    ReportContent2: () => import('./ReportContent2.vue'),
    ReportContent3: () => import('./ReportContent3.vue'),
    ReportContent4: () => import('./ReportContent4.vue'),
    ReportContent5: () => import('./ReportContent5.vue'),
    RelatedReports: () => import('./RelatedReports.vue')
  },
  computed: {
    mobData () {
      return this.$root.mobData
    }
  }
}
</script>

<style lang="stylus">
.base-report
  position fixed
  z-index 9
  top 0
  width 100%
  height 100%
  background-color #f6f6f6
  overflow-y auto
  visibility hidden
  &.show
    visibility visible
</style>
