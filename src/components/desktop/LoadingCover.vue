<template lang="pug">
  div.loading-cover.full-page(ref="loadingCover" v-if="isLoadingCover")
    div.loading-cover__prompt(ref="prompt" v-if="deskData.inLoadingCover" )
      p 找出捷運中的胖子<br>點擊後聽聽他們的心聲<br>（音量注意）
      button(type="button" @click="closeLoadingCover") 進入捷運
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'LoadingCover',
  data () {
    return {
      isLoadingCover: this.$root.deskData.inLoadingCover
    }
  },
  computed: {
    deskData () {
      return this.$root.deskData
    }
  },
  methods: {
    closeLoadingCover () {
      this.deskData.inLoadingCover = false
      const parentRefs = this.$parent.$refs
      const homeCover = parentRefs.homeCover.$el
      parentRefs.mainBGM.play()
      gsap.to(this.$refs.loadingCover, {
        scaleY: 0,
        opacity: 0.16,
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: () => { this.isLoadingCover = false }
      })
      gsap.to(homeCover, {
        webkitFilter: 'blur(0px)',
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'sine.inOut',
        onComplete: () => {
          gsap.set(homeCover, {
            webkitFilter: '',
            filter: ''
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.loading-cover
  background-color #0a2d4f
  z-index 389
  transform scaleX(0)
  opacity 0.16
  &__prompt
    font-size 1.8rem
    color #fff
    position absolute
    // 22 + 32
    top calc(50% + 54px)
    left 50%
    transform translate(-50%, 24px)
    font-weight 300
    text-align center
    line-height 1.8
    opacity 0
    visibility hidden
    & p
      margin-bottom 24px
      letter-spacing 0.8px
    & button
      font-weight 300
      background-color transparent
      color #fff
      font-size 1.8rem
      line-height 1.8
      padding 14px 32px
      border 1px solid #fff
      border-radius 4px
      letter-spacing 0.8px
      user-select none
      transition all 0.3s $easeInOutCubic
      &:hover
        background-color #fff
        color rgba(#0a2d4f, 0.8)
</style>
