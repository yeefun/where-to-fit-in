<template lang="pug">
  figure.report-img
    img(:src="figure.src" alt="")
    figcaption(v-if="figure.caption") {{ figure.caption }}
</template>

<script>
export default {
  name: 'ReportFigure',
  props: ['figure']
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.report-img
  margin 48px -24px
  @media (min-width $tablet)
    margin 64px -80px
  & img
    width 100%
    display block
    @media (min-width $tablet)
      border-radius 2px
  & figcaption
    font-size 1.4rem
    line-height 1.5
    color #08517c
    padding-left 24px
    padding-right 24px
    margin-top 12px
    @media (min-width $tablet)
      font-size 1.6rem
      line-height 1.4
      padding-left 40px
      padding-right 40px
      margin-top 16px
</style>
