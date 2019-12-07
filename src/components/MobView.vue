<template lang="pug">
  div.mob-view
    img.icon.icon--back-to(src="../assets/img/icon/arrow-back--mob.png" alt="" @click="moveBack" v-show="mobData.isReportContent")

    div.home-wrapper
      HomeCover
      ReportsList
    BaseReport

    transition(name="fadeMask" @after-enter="handleFadeInAfter")
      TransitionMask(v-show="mobData.isTransition")
</template>

<script>
import HomeCover from './mobile/HomeCover.vue'
import ReportsList from './mobile/ReportsList.vue'
import BaseReport from './mobile/BaseReport.vue'
import TransitionMask from './mobile/TransitionMask.vue'

export default {
  name: 'MobView',
  components: {
    HomeCover,
    ReportsList,
    BaseReport,
    TransitionMask
  },
  created () {
    this.$root.wEl.addEventListener('popstate', this.handlePopState)
  },
  computed: {
    mobData () {
      return this.$root.mobData
    }
  },
  methods: {
    moveBack () {
      this.mobData.isMovingBack = true
      this.mobData.isTransition = true
    },
    handleFadeInAfter () {
      if (this.mobData.isMovingBack) {
        this.mobData.isReportContent = false
        this.mobData.isMovingBack = false
        if (!this.$root.isPopState) history.pushState({ place: 'home' }, '', this.$root.pathname)
        else this.$root.isPopState = false
        return
      }

      if (this.mobData.isShowingRelatedReport) this.mobData.currentReportId = this.mobData.relatedReportId
      else this.mobData.isReportContent = true

      const id = this.mobData.currentReportId
      if (!this.$root.isPopState) history.pushState({ place: 'report', id }, '', `${this.$root.pathname}report${id}`)
      else this.$root.isPopState = false
    },
    handlePopState (evt) {
      this.$root.isPopState = true
      const state = evt.state
      // from report to home
      if (!state || state.place === 'home') {
        this.moveBack()
      } else {
        const id = state.id
        // from report to report : from home to report
        const type = (this.mobData.isReportContent ? 'related' : 'home')
        document.getElementById(`${type}ReportBtn${id}`).click()
      }
    }
  },
  beforeDestroy () {
    this.$root.wEl.removeEventListener('popstate', this.handlePopState)
  }
}
</script>

<style lang="stylus">
@import '../util/global.styl'
@import '../util/reports-list.styl'
@import '../util/report-content.styl'
@import '../util/report-content--mob.styl'

body
  &.no-scroll
    overflow hidden
.icon
  &--back-to
    top 0
    left 0
    padding 8px 5px 5px 8px
    @media (min-width $tablet)
      padding-top 24px
      padding-left 32px
.color-white
  &--tablet
    @media (min-width $tablet)
      color #fff !important

.fadeMask
  &-enter, &-leave-to
    background-color rgba(#003152, 0)
  &-enter-active
    transition background-color 0.3s $easeInOutCubic
    & img
      transition transform 0.3s $easeInOutSine
  &-leave-active
    transition background-color 0.3s 0.3s $easeInOutCubic
    & img
      transition transform 0.3s 0.3s $easeInOutSine
  &-enter img
    transform translateX(100vw)
  &-leave-to img
    transform translateX(-100vw)
</style>
