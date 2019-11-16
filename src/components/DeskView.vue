<template lang="pug">
  .desk-view
    img#logo(src="../assets/img/logo-shadow.png" alt="胖子之大，何處可容身？" @click="backToHome")
    //- transition
    CustomCursor(ref="cursor" v-if="$root.deskData.inHome || $root.deskData.inReportCover")

    HomeCover(ref="homeCover" :class="{ hide: !isHomeCover }")
    BaseReport(v-for="report in $root.deskData.baseReports" :key="report" ref="baseReports" :backToHome="backToHome")

    //- img(src="../assets/img/icon/home.png" v-show="!$root.deskData.inHome && $root.deskData.inReportCover" alt="")
    //- TitleAnchor(:anchors="theAnchors" v-if="theAnchors")
</template>

<script>
import HomeCover from './desktop/HomeCover.vue'
import BaseReport from './desktop/BaseReport.vue'
import CustomCursor from './desktop/CustomCursor.vue'

export default {
  name: 'DeskView',
  components: {
    HomeCover,
    BaseReport,
    CustomCursor
    // TitleAnchor
  },
  created () {
    if (this.$root.deskData.beginningReportId) this.isHomeCover = false
    this.$root.wEl.addEventListener('popstate', this.handlePopState)
  },
  // mounted () {
  //   this.bindMouseEventsToCursor()
  // },
  data () {
    return {
      isHomeCover: true
      // anchors: {
      //   report2: [
      //     '不健康的身體不只有胖',
      //     '健康大旗打翻一船胖子',
      //     '胖子減肥不擇手段',
      //     '減肥並非以胖為恥'
      //   ],
      //   report3: [
      //     '你這麼胖不行',
      //     '胖孩子的教育',
      //     '樂觀的隱形斗篷',
      //     '不用胖定義胖子'
      //   ],
      //   report4: [
      //     '以肥胖污名規範社會秩序',
      //     '穿不下的代價太大',
      //     '超出標準的胖子坐立難安',
      //     '胖子努力縮小改變人生'
      //   ],
      //   report5: [
      //     '直美熱潮影響有限',
      //     '胖子的網路逆襲',
      //     '臺灣的解放胖女體行動',
      //     '鼓勵胖子現身說法',
      //     '自信內在胖也美麗'
      //   ]
      // }
    }
  },
  // computed: {
  //   theAnchors () {
  //     const currentReportId = this.$root.deskData.removedRelatedReportId
  //     return currentReportId > 1 ? this.anchors[`report${currentReportId}`] : []
  //   }
  // },
  methods: {
    backToHome () {
      if (this.$root.deskData.inHome) return
      this.$root.deskData.inHome = true
      this.$root.deskData.removedRelatedReportId = 0
      this.$root.htmlEl.scrollTop = 0
      this.$root.bodyEl.scrollTop = 0

      TweenLite.to('.reports', 0.6, {
        css: {
          opacity: 0
        },
        ease: Power2.easeInOut
      })
      TweenLite.to(this.$refs.homeCover.$el, 0.6, {
        css: {
          autoAlpha: 1
        },
        delay: 0.3,
        ease: Power3.easeInOut,
        onComplete: () => {
          this.$root.deskData.inReportCover = true

          this.$root.deskData.baseReports.splice(0)
          this.$root.deskData.switchTimes += 1
          this.$root.deskData.baseReports.push(this.$root.deskData.switchTimes)
          this.$root.deskData.currentReport = null
        }
      })
      if (!this.$root.isPopState) history.pushState({ place: 'home' }, '', this.$root.pathname)
      else this.$root.isPopState = false
    },
    handlePopState (evt) {
      const state = evt.state
      this.$root.isPopState = true
      if (!state || state.place === 'home') {
        console.log('home')
        this.backToHome()
      } else if (state.place === 'report cover') {
        console.log('report cover')
        this.$refs.homeCover.showReportCover(null, state.id)
      } else {
        const id = state.id
        if (this.$root.deskData.inHome) {
          console.log('report inHome')
          TweenLite.to(this.$refs.homeCover.$el, 0.6, {
            css: {
              autoAlpha: 0
            },
            ease: Power2.easeInOut,
            onComplete: () => {
              this.$refs.baseReports[0].showReportFromHome(id)
              this.$root.deskData.inHome = false
            }
          })
        } else {
          console.log('report inReport')
          document.getElementById(`report${id}`).click()
        }
      }
    }
    // bindMouseEventsToCursor () {
    //   const clickableEls = document.querySelectorAll('.clickable')
    //   clickableEls.forEach((el) => {
    //     el.addEventListener('mouseover', this.animateCursorOver)
    //     el.addEventListener('mouseout', this.animateCursorOut)
    //   })
    // },
    // animateCursorOver (evt) {
    //   if (evt.currentTarget === this.$root.deskData.currentReport) return
    //   const cursor = this.$refs.cursor.$el
    //   const innerCursor = cursor.firstChild
    //   TweenLite.to(cursor, 0.3, {
    //     css: {
    //       scale: 7.2,
    //       opacity: 0.6
    //     },
    //     ease: Power3.easeInOut
    //   })
    //   TweenLite.to(innerCursor, 0.2, {
    //     css: {
    //       scale: 0
    //     },
    //     ease: Power3.easeInOut
    //   })
    // },
    // animateCursorOut () {
    //   const cursor = this.$refs.cursor.$el
    //   const innerCursor = cursor.firstChild
    //   TweenLite.to(cursor, 0.3, {
    //     css: {
    //       scale: 1,
    //       opacity: 1
    //     },
    //     ease: Power2.easeInOut
    //   })
    //   TweenLite.to(innerCursor, 0.4, {
    //     css: {
    //       scale: 1
    //     },
    //     ease: Power2.easeInOut
    //   })
    // }
  },
  beforeDestroy () {
    this.$root.wEl.removeEventListener('popstate', this.handlePopState)
  }
}
</script>

<style lang="stylus">
@import '../util/report-content.styl'
@import '../util/report-content--desk.styl'

// $ff--sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Heiti TC", "PingFang TC", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

$ff--sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang TC", "Heiti TC", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
body
  font-family $ff--sans-serif
  background-color #f6f6f6
  overflow-y scroll
#logo
  position fixed
  z-index 99
  width 176px
  margin-top 24px
  margin-left 32px
  cursor pointer
  mix-blend-mode difference
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
button
  border 0
  outline 0
  cursor pointer
  font-family $ff--sans-serif
  user-select none
img
  height auto
</style>
