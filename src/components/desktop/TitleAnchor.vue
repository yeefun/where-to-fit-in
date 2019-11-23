<template lang="pug">
  ul.title-anchor#title-anchor
    li(v-for="(anchor, idx) in anchors" @click="scrollToTitle(`title${idx + 1}`)" :key="anchor")
      .title-anchor__line-wrapper
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
.title-anchor
  position fixed
  top 50%
  right 0
  z-index 999
  transform translateY(-50%)
  & li
    margin-top 8px
    margin-bottom 8px
    cursor pointer
    position relative
  &__line-wrapper
    width 64px
    padding-top 11px
    padding-bottom 11px
    padding-left 24px
    right 0
    position absolute
    top 50%
    transform translateY(-50%)
    &:hover
      & .line
        width 80px
        background-color #003152
      & + .title-anchor__txt
        opacity 1
    & .line
      width 16px
      height 2px
      background-color #5c94d1
      transition all 0.45s cubic-bezier(0.645, 0.045, 0.355, 1)
  &__txt
    color #003152
    font-size 1.6rem
    text-align right
    // 64 + 16
    margin-right 80px
    // text-shadow -8px 16px 16px rgba(#000, 0.2)
    opacity 0
</style>
