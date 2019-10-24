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
.report-img
  margin 64px -80px
  & img
    width 100%
    display block
    border-radius 2px
  & figcaption
    font-size 1.8rem
    line-height 1.4
    // color #031b37
    color #08517c
    padding-left 40px
    padding-right 40px
    margin-top 16px
</style>
