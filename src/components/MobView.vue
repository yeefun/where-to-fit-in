<template lang="pug">
  div.mob-view
    img.icon.icon--back-to(src="../assets/img/icon/arrow-back--mob.svg" alt="" @click="moveBack" v-show="mobData.isReportContent")

    div.home-wrapper
      HomeCover
      ReportsList
    BaseReport

    transition(name="fadeMask" @after-enter="handleFadeInAfter")
      TransitionMask(v-show="mobData.isTransition")

    div.share(:class="{ active: isShare }" @click.stop)
      a.share__fb(:href="`https://www.facebook.com/share.php?u=${shareURL}`" target="_blank")
      a.share__line(:href="`https://line.me/R/msg/text/?${shareURL}`" target="_blank")
      img(src="../assets/img/icon/share.svg" alt="" @click="isShare = !isShare")
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
  mounted () {
    this.$root.wEl.addEventListener('click', () => {
      this.isShare = false
    })
  },
  data () {
    return {
      isShare: false
    }
  },
  computed: {
    mobData () {
      return this.$root.mobData
    },
    shareURL () {
      const { origin } = this.$root.wEl.location
      if (this.mobData.isReportContent) {
        return `${origin}${this.$root.publicPath}report${this.mobData.currentReportId}`
      }
      return origin
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
        if (!this.$root.isPopState) history.pushState({ place: 'home' }, '', this.$root.publicPath)
        else this.$root.isPopState = false
        return
      }

      if (this.mobData.isShowingRelatedReport) this.mobData.currentReportId = this.mobData.relatedReportId
      else this.mobData.isReportContent = true

      const id = this.mobData.currentReportId
      if (!this.$root.isPopState) history.pushState({ place: 'report', id }, '', `${this.$root.publicPath}report${id}`)
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
    top 10px
    left 14px
    padding 4px
    @media (min-width $tablet)
      padding 8px
      top 14px
      left 26px
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
