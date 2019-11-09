<template lang="pug">
  section.reports-list
    .reports-list__report(
      v-for="report in $root.mobData.reports"
      :key="report.id"
      :style="{ backgroundImage: `url(${report.img})` }"
    )
      h1(:class="$root.mobMethods().white(report.id)") {{ report.title }}
      p(:class="$root.mobMethods().white(report.id)") {{ report.intro }}
      button(@click="showReportContent(report.id)" :id="`homeReportBtn${report.id}`") 繼續閱讀
</template>

<script>
export default {
  name: 'ReportsList',
  methods: {
    showReportContent (id) {
      this.$root.mobData.isTransition = true
      this.$root.mobData.currentReportId = id
      this.$root.mobMethods().applyCurrentReportScrollTop()
    }
  }
}
</script>

<style lang="stylus">
</style>
