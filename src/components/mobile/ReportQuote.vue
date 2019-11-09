<template lang="pug">
  .report-quote
    .report-quote__txt(v-html="quote.txt")
    p.report-quote__name(v-if="quote.name") {{ quote.name }}
</template>

<script>
export default {
  name: 'ReportQuote',
  props: ['quote']
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.report-quote
  margin-top 48px
  margin-bottom 48px
  color #003152
  @media (min-width $tablet)
    margin-top 64px
    margin-bottom 64px
  &__txt
    font-size 2.0rem
    line-height 1.6
    // font-weight 500
    padding-top 8px
    padding-bottom 8px
    padding-left 18px
    border-left 6px solid #003152
    margin-left -24px
    @media (min-width $tablet)
      font-size 2.4rem
      padding-left 24px
      margin-left 0
    & p + p
      margin-top 12px
      @media (min-width $tablet)
        margin-top 16px
  &__name
    font-size 1.8rem
    line-height 1.5
    margin-top 16px
    text-align right
    @media (min-width $tablet)
      font-size 2.0rem
      line-height 1.2
      margin-top 8px
</style>
