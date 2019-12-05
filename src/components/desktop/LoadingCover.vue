<template lang="pug">
  div.loading-cover.full-page(ref="loadingCover" v-if="isLoadingCover")
    div.loading-cover__prompt(ref="prompt" v-if="deskData.inLoadingCover" )
      p 進入首頁後<br>找出胖子並點擊<br>聽聽他們的聲音
      button(type="button" @click="closeLoadingCover") 我知道了
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
      gsap.to(this.$refs.loadingCover, {
        y: '-100%',
        opacity: 0.16,
        duration: 0.45,
        delay: 0.6,
        ease: 'circ.inOut',
        onComplete: () => { this.isLoadingCover = false }
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
      transition all 0.3s $easeInOutCubic
      &:hover
        background-color #fff
        color rgba(#0a2d4f, 0.8)
</style>
