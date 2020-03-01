<template lang="pug">
  section.reports-list
    div.reports-list__report(v-for="report in mobData.reports" :key="report.id")
      ReportCoverPicture(:reportId="report.id")
      h1(:class="$root.white(report.id)") {{ report.title }}
      p(:class="$root.white(report.id)") {{ report.intro }}
      button(@click="showReportContent(report.id)" :id="`homeReportBtn${report.id}`") 繼續閱讀
</template>

<script>
import ReportCoverPicture from '../common/ReportCoverPicture.vue'

export default {
  name: 'ReportsList',
  components: {
    ReportCoverPicture
  },
  methods: {
    showReportContent (id) {
      this.mobData.isTransition = true
      this.mobData.currentReportId = id
      this.$root.mobMethods().backToTop()
    }
  },
  computed: {
    mobData () {
      return this.$root.mobData
    }
  }
}
</script>

<style lang="stylus">
</style>
