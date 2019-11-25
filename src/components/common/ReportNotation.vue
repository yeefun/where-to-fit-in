<template lang="pug">
  abbr.report-notation(:title="title")
    span.report-notation__wrapped(@click="toggleNotation")
      slot
    img(:src="arrowImg" @click="toggleNotation" :class="[isInline ? 'inline' : 'block', isNotation ? 'active' : '']")
    template(v-if="isNotation")
      span.report-notation__txt(v-if="isInline") {{ notation.txt }}
      .report-notation__txt.report-notation__txt--block(v-else v-html="notation.txt")
</template>

<script>
import arrowImgX from '../../assets/img/icon/arrow-x.png'
import arrowImgY from '../../assets/img/icon/arrow-y.png'

export default {
  name: 'ReportNotation',
  props: ['notation'],
  data () {
    return {
      isNotation: false
    }
  },
  computed: {
    title () {
      return this.notation.txt.replace(/<p>|<\/p>/gmi, '')
    },
    isInline () {
      return this.notation.display === 'inline'
    },
    arrowImg () {
      return this.isInline ? arrowImgX : arrowImgY
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
@import "../../util/global.styl"

.report-notation
  color #08517c
  text-decoration none
  &__wrapped
    position relative
    cursor pointer
    user-select none
  & img
    width 12px
    vertical-align top
    padding-right 4px
    padding-left 2px
    transition transform 0.15s $easeInOutSine
    cursor pointer
    user-select none
    &.inline
      padding-top 4px
      @media (min-width $tablet)
        padding-top 6px
      &.active
        transform scaleX(-1)
    &.block
      padding-top 2px
      @media (min-width $tablet)
        padding-top 4px
      &.active
        transform scaleY(-1)
  &__txt
    font-size 1.4rem
    line-height 1.5
    @media (min-width $tablet)
      font-size 1.6rem
    &--block
      display inline-block
      width 100%
      background-color #d7e9f3
      padding 12px 16px
      color: #1b2733
      box-sizing border-box
      border-radius 3px
      margin-top 12px
      margin-bottom 12px
      @media (min-width $tablet)
        padding 16px 24px
      & p + p
        margin-top 12px !important
</style>
