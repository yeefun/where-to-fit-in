<template lang="pug">
  abbr.report-notation
    span.report-notation__wrapped(@click="toggleNotation" :class="[isNotation ? 'active' : '', isInline ? 'inline' : '' ]")
      slot
    template(v-if="isNotation")
      span.report-notation__txt(v-if="isInline") {{ notation.txt }}
      .report-notation__txt.report-notation__txt--block(v-else v-html="notation.txt")
</template>

<script>
export default {
  name: 'ReportNotation',
  props: ['notation'],
  data () {
    return {
      isNotation: false
    }
  },
  computed: {
    isInline () {
      return this.notation.display === 'inline'
    }
  },
  methods: {
    toggleNotation () {
      this.isNotation = !this.isNotation
    }
  }
}
</script>

<style lang="stylus">
.report-notation
  color #08517c
  &__wrapped
    position relative
    padding-right 16px
    cursor pointer
    user-select none
    &:after
      content ''
      position absolute
      top 2px
      right 6px
      width 0
      height 0
      display block
      border-style solid
      border-width 0 4px 6.9px 4px
      border-color transparent transparent #053050 transparent
      transition transform 0.2s
    &.active:after
      transform rotate(180deg)
    &.inline
      &:after
        transform rotate(-30deg)
      &.active:after
        transform rotate(30deg)
        // right 2px
  &__txt
    font-size 1.6rem
    line-height 1.5
    &--block
      display inline-block
      width 100%
      background-color #d7e9f3
      padding 16px 24px
      color: #1b2733
      box-sizing border-box
      border-radius 3px
      margin-top 12px
      margin-bottom 12px
      & p + p
        margin-top 12px !important
</style>
