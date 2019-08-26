<template lang="pug">
  ul.title-anchor#title-anchor(:style="{ top: `${top}px` }")
    li
      .title-anchor__line
      .title-anchor__txt 一、你這麼胖不行
    li
      .title-anchor__line
      .title-anchor__txt 二、胖孩子的教育
    li
      .title-anchor__line
      .title-anchor__txt 三、樂觀的隱形斗篷
    li
      .title-anchor__line
      .title-anchor__txt 四、不用胖定義胖子
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

export default {
  name: 'TitleAnchor',
  computed: {
    top () {
      const wh = this.$root.wh
      const anchorH = this.$el || document.getElementById('title-anchor')
      return (wh - anchorH) / 2
    }
  }
}
</script>

<style lang="stylus">
.title-anchor
  position fixed
  // top 50%
  right 0
  // transform translateY(-50%)
  z-index 999
  // padding-right 64px
  & li
    width 80px
    // height 2px
    // height 26px
    // padding-top 12px
    // padding-bottom 12px
    display flex
    // align-items center
    flex-direction column
    cursor pointer
    // background-color #5c94d1
    // & + li
    //   margin-top 16px
    &:hover
      & .title-anchor__line
        width 80px
        background-color #003152
      & .title-anchor__txt
        display block
        // height auto
        // max-height auto
        min-height auto
  &__line
    width 16px
    height 2px
    margin-top 12px
    margin-bottom 12px
    background-color #5c94d1
    transition all 0.5s
  &__txt
    color #003152
    font-size 1.6rem
    width 16px
    line-height 1.1
    word-break break-word
    // height 0
    // max-height 0
    min-height 0
    overflow hidden
    // transition all 2s
    display none
    // line-height 1.5
</style>
