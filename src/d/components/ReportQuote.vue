<template lang="pug">
  .report-quote
    .report-quote__txt(v-html="quote.txt")
      //- p {{ quote.txt }}
    p.report-quote__name(v-if="quote.name") {{ quote.name }}
</template>

<script>
export default {
  name: 'ReportQuote',
  props: ['quote']
}
</script>

<style lang="stylus">
.report-quote
  color #08517c
  // border-left 6px solid #08517c
  margin-top 64px
  margin-bottom 64px
  &__txt
    font-size 2.4rem
    line-height 1.6
    font-weight 500
    border-left 4px solid #08517c
    padding-top 8px
    padding-bottom 8px
    padding-left 24px
    border-radius 8px
    & p + p
      margin-top 16px
  &__name
    font-size 2.0rem
    line-height 1.2
    text-align right
    margin-top 8px
</style>
