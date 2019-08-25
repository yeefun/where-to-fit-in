<template lang="pug">
  figure.report-img
    img(:src="figure.src" alt="")
    figcaption {{ figure.caption }}
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
    margin-bottom 16px
    display block
  & figcaption
    font-size 1.8rem
    line-height 1.4
    color #031b37
    padding-left 40px
    padding-right 40px
</style>
