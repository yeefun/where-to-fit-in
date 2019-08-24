<template lang="pug">
  #app
    img#logo(src="../assets/img/logo.png" alt="胖子之大，何處可容身？" @click="backToHome")
    HomeCover
    BaseReport(v-for="report in $root.baseReports" :key="report" ref="baseReports")
</template>

<script>
import HomeCover from '../components/HomeCover.vue'
import BaseReport from '../components/BaseReport.vue'

export default {
  name: 'app',
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
            ease: Power3.easeIn,
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
  components: {
    HomeCover,
    BaseReport
  },
  methods: {
    backToHome () {
      if (this.$root.inHome) return
      this.$root.inHome = true
      this.$root.curtReport = null
      this.$root.removedRelatedReportId = 0
      TweenLite.to('#reports', 0.8, {
        css: {
          opacity: 0
        },
        ease: Power3.easeIn,
        onComplete: () => {
          this.$root.inReportCover = true
          this.$root.baseReports.splice(0)
          TweenLite.to('#home-cover', 0.8, {
            css: {
              opacity: 1
            },
            ease: Power3.easeIn,
            onComplete: () => {
              this.$root.baseReports.push(this.$root.seenReports)
            }
          })
        }
      })
      history.pushState({ place: 'home' }, '', '/')
    }
  }
}
</script>

<style lang="stylus">
html
  font-size 10px
// body
//   font-family "Noto Sans TC", sans-serif
//   // font-family "PT Serif", "Noto Serif CJK TC", serif
//
#app
  overflow hidden
#logo
  position absolute
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
// .in-home-cover
//   height 0
//   transform translateY(100vh)
//
button
  border 0
  outline 0
  cursor pointer
  // font-family "Noto Sans TC", sans-serif
  // font-family "PT Serif", "Noto Serif CJK TC", serif
  user-select none
img
  height auto
</style>
