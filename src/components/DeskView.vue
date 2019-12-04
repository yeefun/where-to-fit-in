<template lang="pug">
  div.desk-view
    LoadingCover(ref="loadingCover")
    div(@click="backToHome" :class="[ 'logo', { 'in-loading-cover': deskData.inLoadingCover } ]")
      img(src="../assets/img/logo-shadow.png" alt="" ref="logo")

    CustomCursor(ref="cursor" v-if="$root.deskData.inHome || $root.deskData.inReportCover")

    HomeCover(ref="homeCover" :class="{ hide: !isHomeCover }")
    BaseReport(v-for="report in $root.deskData.baseReports" :key="report" ref="baseReports" :backToHome="backToHome")

    TitleAnchor(:anchors="reportAnchors" v-if="deskData.ww >= 992")
</template>

<script>
import { gsap } from 'gsap'

import LoadingCover from './desktop/LoadingCover.vue'
import HomeCover from './desktop/HomeCover.vue'
import BaseReport from './desktop/BaseReport.vue'
import CustomCursor from './desktop/CustomCursor.vue'
import TitleAnchor from './desktop/TitleAnchor.vue'

export default {
  name: 'DeskView',
  components: {
    LoadingCover,
    HomeCover,
    BaseReport,
    CustomCursor,
    TitleAnchor
  },
  created () {
    if (this.deskData.beginningReportId) {
      this.isHomeCover = false
    }
    this.$root.wEl.addEventListener('popstate', this.handlePopState)
  },
  data () {
    return {
      isHomeCover: true,
      anchors: {
        report1: [],
        report2: [
          '不健康的身體不只有胖',
          '健康大旗打翻一船胖子',
          '胖子減肥不擇手段',
          '減肥並非以胖為恥'
        ],
        report3: [
          '你這麼胖不行',
          '胖孩子的教育',
          '樂觀的隱形斗篷',
          '不用胖定義胖子'
        ],
        report4: [
          '以肥胖污名規範社會秩序',
          '穿不下的代價太大',
          '超出標準的胖子坐立難安',
          '胖子努力縮小改變人生'
        ],
        report5: [
          '直美熱潮影響有限',
          '胖子的網路逆襲',
          '臺灣的解放胖女體行動',
          '鼓勵胖子現身說法',
          '自信內在胖也美麗'
        ]
      }
    }
  },
  mounted () {
    // this.$refs.homeCover.$el.classList.add('blur')
    const tl = gsap.timeline()
    tl.to(this.$refs.logo, {
      y: 0,
      duration: 1.8,
      ease: 'power3.out'
    }, 0.75)
    tl.to(this.$refs.cursor.$el, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power2.inOut'
    }, '>-0.6')
    tl.to(this.$refs.cursor, {
      progress: 100,
      duration: 2.4,
      snap: { progress: 1 },
      ease: 'steps(8)'
    }, '>0.15')
    tl.to(this.$refs.loadingCover.$el, {
      opacity: 0.8,
      duration: 2.4,
      ease: 'steps(4)'
    }, '<')
    tl.set(this.$refs.cursor, {
      loading: false
    }, '>')
    tl.to(this.$refs.loadingCover.$refs.prompt, {
      autoAlpha: 1,
      y: 0,
      duration: 0.9,
      ease: 'power1.inOut'
    }, '<1.2')
  },
  computed: {
    reportAnchors () {
      return this.anchors[`report${this.deskData.removedRelatedReportId}`]
    },
    deskData () {
      return this.$root.deskData
    }
  },
  methods: {
    backToHome () {
      if (this.deskData.inHome) return
      this.deskData.inHome = true
      this.deskData.removedRelatedReportId = 0
      this.deskData.htmlEl.scrollTop = 0
      this.$root.bodyEl.scrollTop = 0

      gsap.to('.reports', {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      })
      gsap.to(this.$refs.homeCover.$el, {
        autoAlpha: 1,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          this.deskData.inReportCover = true

          this.deskData.baseReports.splice(0)
          this.deskData.switchTimes += 1
          this.deskData.baseReports.push(this.deskData.switchTimes)
          this.deskData.currentReport = null
        }
      })
      if (!this.$root.isPopState) {
        history.pushState({ place: 'home' }, '', this.$root.pathname)
      } else {
        this.$root.isPopState = false
      }
    },
    handlePopState (evt) {
      const state = evt.state
      this.$root.isPopState = true
      if (!state || state.place === 'home') {
        this.backToHome()
      } else if (state.place === 'report cover') {
        this.$refs.homeCover.showReportCover(null, state.id)
      } else {
        const id = state.id
        if (this.deskData.inHome) {
          gsap.to(this.$refs.homeCover.$el, {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              this.$refs.baseReports[0].showReportFromHome(id)
              this.deskData.inHome = false
            }
          })
        } else {
          document.getElementById(`report${id}`).click()
        }
      }
    }
  },
  beforeDestroy () {
    this.$root.wEl.removeEventListener('popstate', this.handlePopState)
  }
}
</script>

<style lang="stylus">
@import '../util/report-content.styl'
@import '../util/report-content--desk.styl'

body
  background-color #f6f6f6
.logo
  position fixed
  z-index 399
  top 24px
  left 32px
  mix-blend-mode difference
  overflow hidden
  &.in-loading-cover
    mix-blend-mode normal
    & img
      transform translateY(100%)
  & img
    width 176px
    vertical-align middle
    cursor pointer
.full-page
  position absolute
  width 100%
  height 100vh
  top 0
  left 0
.full-img
  background-position top center
  background-size cover
  background-repeat no-repeat
</style>
