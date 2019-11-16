<template lang="pug">
  //- todo touchstart or click
  .mob-view
    img.icon.icon--back-to(src="../assets/img/icon/arrow-back--mob.png" alt="" @click="moveBack" v-show="$root.mobData.isReportContent")

    transition(name="fadeNormal")
      img.icon.icon--cancel(src="../assets/img/icon/cancel.png" alt="" v-if="isCredit" @click="toggleCredit" key="cancel")
      img.icon.icon--credit(src="../assets/img/icon/info.png" alt="" v-else @click="toggleCredit" key="credit")

    img.icon.icon--audio(src="../assets/img/icon/audio.png" alt="")

    //- .home-wrapper(:class="{ blur: this.isCredit }")
    .home-wrapper
      HomeCover
      ReportsList
    BaseReport
    transition(name="fadeNormal")
      TheCredit(v-if="isCredit")
    transition(name="fadeMask" @after-enter="handleFadeInAfter")
      TransitionMask(v-show="$root.mobData.isTransition")
</template>

<script>
import HomeCover from './mobile/HomeCover.vue'
import ReportsList from './mobile/ReportsList.vue'
import BaseReport from './mobile/BaseReport.vue'
import TheCredit from './mobile/TheCredit.vue'
import TransitionMask from './mobile/TransitionMask.vue'

export default {
  name: 'MobView',
  components: {
    HomeCover,
    ReportsList,
    BaseReport,
    TheCredit,
    TransitionMask
  },
  created () {
    this.$root.wEl.addEventListener('popstate', this.handlePopState)
  },
  data () {
    return {
      isCredit: false
    }
  },
  methods: {
    moveBack () {
      this.$root.mobData.isMovingBack = true
      // this.$root.mobMethods().getCurrentReportScrollTop()
      this.$root.mobData.isTransition = true
    },
    handleFadeInAfter () {
      if (this.$root.mobData.isMovingBack) {
        this.$root.mobData.isReportContent = false
        this.$root.mobData.isMovingBack = false
        if (!this.$root.isPopState) history.pushState({ place: 'home' }, '', `${this.$root.pathname}`)
        else this.$root.isPopState = false
        return
      }

      if (this.$root.mobData.isShowingRelatedReport) this.$root.mobData.currentReportId = this.$root.mobData.relatedReportId
      else this.$root.mobData.isReportContent = true

      const id = this.$root.mobData.currentReportId
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
        const type = (this.$root.mobData.isReportContent ? 'related' : 'home')
        document.getElementById(`${type}ReportBtn${id}`).click()
      }
    },
    toggleCredit () {
      this.isCredit = !this.isCredit
    }
  },
  beforeDestroy () {
    this.$root.wEl.removeEventListener('popstate', this.handlePopState)
  }
}
</script>

<style lang="stylus">
@import '../util/reports-list.styl'
@import '../util/report-content.styl'
@import '../util/report-content--mob.styl'

$ff--sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Heiti TC", "PingFang TC", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
body
  font-family $ff--sans-serif
  // background-color #6b8ba3
  &.no-scroll
    overflow hidden
img
  height auto
  max-width 100%
.icon
  position fixed
  z-index 99
  width 20px
  cursor pointer
  mix-blend-mode color-burn
  user-select none
  &--credit
    top 0
    right 0
    padding 8px 8px 5px 5px
    @media (min-width $tablet)
      padding-top 24px
      padding-right 32px
  &--cancel
    top 0
    right 0
    padding 8px 8px 5px 5px
    z-index 299
    mix-blend-mode normal
    @media (min-width $tablet)
      padding-top 24px
      padding-right 32px
  &--audio
    bottom 0
    left 0
    padding 5px 5px 8px 12px
    @media (min-width $tablet)
      padding-bottom 24px
      padding-left 32px
  &--back-to
    top 0
    left 0
    padding 8px 5px 5px 8px
    @media (min-width $tablet)
      padding-top 24px
      padding-left 32px
#app
  overflow hidden
button
  border 0
  outline 0
  cursor pointer
  font-family $ff--sans-serif
.color-white
  &--tablet
    @media (min-width $tablet)
      color #fff !important
// transition
// todo
.fadeMask
  &-enter, &-leave-to
    background-color rgba(#003152, 0)
  &-enter-active
    transition background-color 0.24s
    & img
      transition transform 0.32s
  &-leave-active
    transition background-color 0.24s 0.24s
    & img
      transition transform 0.32s 0.24s
  &-enter img
    transform translateX(100vw)
  &-leave-to img
    transform translateX(-100vw)
.fadeNormal
  &-enter, &-leave-to
    opacity 0
  &-enter-active, &-leave-active
    transition opacity 0.24s
</style>
