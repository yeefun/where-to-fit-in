<template lang="pug">
  #app
    img#logo(src="../assets/img/logo.png" alt="胖子之大，何處可容身？" @click="backToHome")
    HomeCover
    BaseReport(v-for="report in $root.baseReports" :key="report" ref="baseReports")
    //- TitleAnchor(:anchors="theAnchors" v-if="theAnchors")
</template>

<script>
import HomeCover from '../components/HomeCover.vue'
import BaseReport from '../components/BaseReport.vue'
// import TitleAnchor from '../components/TitleAnchor.vue'

export default {
  name: 'app',
  components: {
    HomeCover,
    BaseReport
    // TitleAnchor
  },
  beforeCreate () {
    TweenLite.selector = function (val) {
      return document.querySelectorAll(val)
    }
    window.addEventListener('popstate', (evt) => {
      const state = evt.state
      if (!state || state.place === 'home') {
        this.backToHome()
      } else {
        const id = state.id
        if (this.$root.inHome) {
          TweenLite.to('#home-cover', 0.8, {
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
      this.$root.inHome = true
      this.$root.currentReport = null
      this.$root.removedRelatedReportId = 0
      TweenLite.to('#reports', 0.8, {
        css: {
          opacity: 0
        }
        // ease: Power3.easeIn
      })
      TweenLite.to('#home-cover', 0.8, {
        css: {
          opacity: 1
        },
        // ease: Power3.easeIn,
        onComplete: () => {
          this.$root.inReportCover = true
          this.$root.baseReports.splice(0)
          this.$root.switchTimes += 1
          this.$root.baseReports.push(this.$root.switchTimes)
        }
      })
      history.pushState({ place: 'home' }, '', '/')
    }
  }
}
</script>

<style lang="stylus">
@import '../util/report.styl'

html
  font-size 10px
body
  font-family "Noto Sans TC", sans-serif
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
  font-family "Noto Sans TC", sans-serif
  user-select none
img
  height auto
</style>
