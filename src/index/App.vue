<template lang="pug">
  #app
    img#logo.clickable(src="../assets/img/logo.png" alt="胖子之大，何處可容身？" @click="backToHome")
    CustomCursor(ref="cursor")
    HomeCover(ref="homeCover")
    //- .close
    //-   .close__cross.close__cross--left
    //-   .close__cross.close__cross--right
    BaseReport(v-for="report in $root.baseReports" :key="report" ref="baseReports" :backToHome="backToHome")
    //- TitleAnchor(:anchors="theAnchors" v-if="theAnchors")
</template>

<script>
import HomeCover from '../components/HomeCover.vue'
import BaseReport from '../components/BaseReport.vue'
import CustomCursor from '../components/CustomCursor.vue'
// import TitleAnchor from '../components/TitleAnchor.vue'

export default {
  name: 'app',
  components: {
    HomeCover,
    BaseReport,
    CustomCursor
    // TitleAnchor
  },
  created () {
    // TweenLite.selector = (val) => document.querySelectorAll(val)
    window.addEventListener('popstate', this.handlePopState)
  },
  mounted () {
    // todo 要動態綁定
    const clickableEls = document.querySelectorAll('.clickable')
    clickableEls.forEach((el) => {
      el.addEventListener('mouseenter', this.animateCursorEnter)
      el.addEventListener('mouseleave', this.animateCursorLeave)
      // el.addEventListener('click', this.animateCursorClick)
    })
  },
  data () {
    return {
      anchors: {
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
  computed: {
    theAnchors () {
      const currentReportId = this.$root.removedRelatedReportId
      return currentReportId > 1 ? this.anchors[`report${currentReportId}`] : []
    }
  },
  methods: {
    backToHome () {
      if (this.$root.inHome) return
      const homeCover = this.$refs.homeCover.$el
      this.$root.inHome = true
      this.$root.currentReport = null
      this.$root.removedRelatedReportId = 0
      TweenLite.to('.reports', 0.6, {
        css: {
          autoAlpha: 0
        },
        ease: Power2.easeInOut
      })
      TweenLite.to(homeCover, 0.6, {
        css: {
          autoAlpha: 1
        },
        delay: 0.3,
        ease: Power3.easeInOut,
        onComplete: () => {
          this.$root.inReportCover = true
          this.$root.baseReports.splice(0)
          this.$root.switchTimes += 1
          this.$root.baseReports.push(this.$root.switchTimes)
        }
      })
      history.pushState({ place: 'home' }, '', './')
    },
    handlePopState (evt) {
      const state = evt.state
      if (!state || state.place === 'home') {
        this.backToHome()
      } else {
        const id = state.id
        const homeCover = this.$refs.homeCover.$el
        if (this.$root.inHome) {
          TweenLite.to(homeCover, 0.8, {
            css: {
              opacity: 0
            },
            // ease: Power3.easeIn,
            onComplete: () => {
              this.$refs.baseReports[0].showReportFromHome(id)
              this.$root.inHome = false
            }
          })
        } else {
          this.$root.isPopState = true
          document.getElementById(`report${id}`).click()
          this.$root.isPopState = false
        }
      }
    },
    animateCursorEnter () {
      const cursor = this.$refs.cursor.$el
      const innerCursor = cursor.firstChild
      TweenLite.to(cursor, 0.3, {
        css: {
          scale: 7.2,
          opacity: 0.6
        },
        ease: Power3.easeInOut
      })
      TweenLite.to(innerCursor, 0.2, {
        css: {
          scale: 0
        },
        ease: Power3.easeInOut
      })
    },
    animateCursorLeave () {
      const cursor = this.$refs.cursor.$el
      const innerCursor = cursor.firstChild
      TweenLite.to(cursor, 0.3, {
        css: {
          scale: 1,
          opacity: 1
        },
        ease: Power2.easeInOut
      })
      TweenLite.to(innerCursor, 0.4, {
        css: {
          scale: 1
        },
        ease: Power2.easeInOut
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../util/report.styl'

html
  font-size 10px
body
  font-family "Noto Sans CJK TC", sans-serif
  background-color #f6f6f6
// #app
//   overflow hidden
#logo
  position fixed
  z-index 99
  width 176px
  margin-top 24px
  margin-left 32px
  cursor pointer
// .close
//   width 32px
//   height 32px
//   position absolute
//   left 50%
//   transform translateX(-50%)
//   z-index 999
//   bottom 100px
  // &__cross
  //   width 32px
  //   height 4px
  //   background-color rgba(#fff, 0.8)
  //   position absolute
  //   top 50%
  //   left 50%
  //   &--left
  //     transform translate(-50%, -50%) rotate(45deg)
  //   &--right
  //     transform translate(-50%, -50%) rotate(-45deg)
.full-page
  position absolute
  width 100%
  // height 100%
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
  font-family "Noto Sans CJK TC", sans-serif
  user-select none
img
  height auto
</style>
