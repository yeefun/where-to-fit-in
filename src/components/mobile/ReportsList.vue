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
@import '../../util/global.styl'

.reports-list
  &__report
    & h1
      margin-bottom 8px
    & p
      font-size 1.8rem
      line-height 1.8
      font-weight 500
      color #1b2733
      margin-right auto
      margin-left auto
      margin-bottom 24px
      padding-left 32px
      padding-right 32px
      max-width 311px
      @media (min-width $tablet)
        line-height 1.6
        font-size 2.4rem
        max-width 456px
        margin-bottom 48px
        padding-left 0
        padding-right 0
      @media (min-width $desktop)
        max-width 768px
</style>
