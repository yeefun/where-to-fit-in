<template lang="pug">
  div.desk-view
    LoadingCover(ref="loadingCover")
    div(@click="backToHome" :class="[ 'logo', { 'in-loading-cover': deskData.inLoadingCover } ]")
      picture
        source(type="image/png" media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc('logo-shadow-tab-s.png')")
        source(type="image/png" media="(min-width: 720px)" :srcset="$root.imgSrc('logo-shadow-tab-l.png')")
        img(:src="$root.imgSrc('logo-shadow-mob.png')" alt="" ref="logo")

    CustomCursor(ref="cursor" v-if="$root.deskData.inHome || $root.deskData.inReportCover")

    HomeCover(ref="homeCover" :class="{ hide: !isHomeCover }")
    BaseReport(v-for="report in $root.deskData.baseReports" :key="report" ref="baseReports")

    TitleAnchor(:anchors="reportAnchors" v-if="deskData.ww >= 992")

    audio(loop ref="mainBGM")
      source(src="../assets/audio/main.mp3" type="audio/mpeg")

    img.icon.icon--audio(:src="audioIconSrc" alt="" @click="toggleMuted" :class="{ 'in-loading-cover': deskData.inLoadingCover }")

    div.share(:class="{ active: isShare, 'in-loading-cover': deskData.inLoadingCover }" @click.stop)
      a.share__fb(:href="`https://www.facebook.com/share.php?u=${shareURL}`" target="_blank")
      a.share__line(:href="`https://line.me/R/msg/text/?${shareURL}`" target="_blank")
      img(src="../assets/img/icon/share.svg" alt="" @click="isShare = !isShare")
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
      isShare: false,
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
    if (this.deskData.inLoadingCover) { this.loading() }
    this.$root.wEl.addEventListener('click', () => {
      this.isShare = false
    })
  },
  computed: {
    reportAnchors () {
      return this.anchors[ `report${this.deskData.removedRelatedReportId}` ]
    },
    deskData () {
      return this.$root.deskData
    },
    audioIconSrc () {
      return require(`../assets/img/icon/audio${this.deskData.isMuted ? '-muted' : ''}.svg`)
    },
    shareURL () {
      const { origin } = this.$root.wEl.location
      if (!this.deskData.inHome && !this.deskData.inReportCover) {
        return `${origin}${this.$root.publicPath}report${this.deskData.removedRelatedReportId}`
      }
      return origin
    }
  },
  methods: {
    backToHome () {
      if (this.deskData.inHome) { return }
      this.deskData.inHome = true
      this.deskData.removedRelatedReportId = 0
      this.deskData.htmlEl.scrollTop = 0
      this.$root.bodyEl.scrollTop = 0

      this.$refs.mainBGM.play()

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
        history.pushState({ place: 'home' }, '', this.$root.publicPath)
      } else {
        this.$root.isPopState = false
      }
    },
    handlePopState (evt) {
      const { state } = evt
      const { place, id } = state || {}

      this.$root.isPopState = true
      if (!state || place === 'home') {
        this.backToHome()
      } else if (place === 'report cover') {
        this.$refs.homeCover.showReportCover(null, id)
      } else {
        if (this.deskData.inHome) {
          gsap.to(this.$refs.homeCover.$el, {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              this.$refs.baseReports[ 0 ].showReportFromHome(id)
              this.deskData.inHome = false
            }
          })
        } else {
          this.$refs.baseReports[ 1 ].handleClick(null, id)
        }
      }
    },
    loading () {
      const { loadingCover, logo } = this.$refs

      gsap.to(loadingCover.$el, {
        scaleX: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: () => {
          if (logo.complete) {
            this.loadLogo()
          } else {
            logo.addEventListener('load', this.loadLogo)
          }
        }
      })
    },
    loadLogo () {
      const { logo, homeCover, cursor } = this.$refs
      const tl = gsap.timeline()

      tl.to(logo, {
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, 0)
      tl.set(homeCover.$el, {
        visibility: 'visible',
        webkitFilter: 'blur(8px)',
        filter: 'blur(8px)'
      }, '>')
      tl.to(cursor.$el, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          this.deskData.isLogoLoad = true
          if (this.deskData.isMRTBgImgLoad) {
            this.loadProgress()
          }
        }
      }, '>-0.6')
    },
    loadProgress () {
      const { cursor, loadingCover } = this.$refs
      const tl = gsap.timeline()

      tl.to(cursor, {
        progress: 100,
        duration: 1.8,
        snap: { progress: 2 },
        ease: 'power3.in'
      }, 0)
      tl.to(loadingCover.$el, {
        opacity: 0.8,
        duration: 1.8,
        ease: 'power3.in'
      }, '<')
      tl.set(cursor, {
        loading: false
      }, '>0.15')
      tl.to(loadingCover.$refs.prompt, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power1.out'
      }, '<0.75')
    },
    toggleMuted () {
      const { mainBGM } = this.$refs
      mainBGM.muted = !mainBGM.muted
      this.deskData.isMuted = !this.deskData.isMuted
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
  overflow hidden
  &.in-loading-cover img
    transform translateY(100%)
  & picture
    max-width 176px
    cursor pointer
  & img
    width 100%
    vertical-align middle
.icon
  &--audio
    bottom 12px
    left 12px
    padding 4px
    @media (min-width $tablet)
      bottom 16px
      left 24px
      padding 8px
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
