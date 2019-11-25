<template lang="pug">
  ul.title-anchor
    li(v-for="(anchor, idx) in anchors" :key="anchor")
      .title-anchor__line-wrapper(@click="scrollToTitle(`title${idx + 1}`)")
        .line
      .title-anchor__txt {{ anchor }}
</template>

<script>
const scrollIntoView = require('scroll-into-view')

export default {
  name: 'TitleAnchor',
  props: [ 'anchors' ],
  methods: {
    scrollToTitle (title) {
      scrollIntoView(document.getElementById(title), {
        time: 900,
        align: { top: 0.1, left: 0.1 },
        ease: (t) => t * t * t * t
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.title-anchor
  position fixed
  top 50%
  right 0
  z-index 199
  transform translateY(-50%)
  & li
    padding-top 8px
    padding-bottom 8px
    position relative
  &__line-wrapper
    width 64px
    padding-top 15px
    padding-bottom 15px
    padding-left 16px
    right 0
    position absolute
    top 50%
    transform translateY(-50%)
    cursor pointer
    &:hover
      & .line
        width 80px
        background-color #08517c
      & + .title-anchor__txt
        visibility visible
    & .line
      width 16px
      height 2px
      background-color #003152
      border-radius 4px
      transition all 0.45s $easeOutSine
  &__txt
    color #08517c
    font-size 1.6rem
    text-align right
    // 64 + 16
    margin-right 80px
    visibility hidden
    // letter-spacing 1px
</style>
