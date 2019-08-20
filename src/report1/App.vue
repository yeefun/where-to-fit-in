<template lang="pug">
  #app
    img#logo(src="../assets/img/logo.png" alt="胖子之大，何處可容身？" @click="backToHome")
    HomeCover
    BaseReport(v-for="rpt in $root.baseRpts" :key="rpt" ref="baseRpts")
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
              this.$refs.baseRpts[0].showRptFromHome(id)
              this.$root.inHome = false
            }
          })
        } else {
          this.$root.isPopState = true
          document.getElementById(`rpt${id}`).click()
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
      this.$root.curtRpt = null
      this.$root.removedRelatedRptId = 0
      TweenLite.to('#rpts', 0.8, {
        css: {
          opacity: 0
        },
        ease: Power3.easeIn,
        onComplete: () => {
          this.$root.inRptCover = true
          this.$root.baseRpts.splice(0)
          TweenLite.to('#home-cover', 0.8, {
            css: {
              opacity: 1
            },
            ease: Power3.easeIn,
            onComplete: () => {
              this.$root.baseRpts.push(this.$root.seenRpts)
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
  height 100%
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
