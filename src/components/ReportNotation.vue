<template lang="pug">
  //- todo 去除 abbr 中的 p tag
  abbr.report-notation(:title="notation.txt" @click="toggleNotation")
    span.report-notation__wrapped
      slot
    img(:src="arrowImg" :class="[isInline ? 'inline' : 'block', isNotation ? 'active' : '']")
    template(v-if="isNotation")
      span.report-notation__txt(v-if="isInline") {{ notation.txt }}
      .report-notation__txt.report-notation__txt--block(v-else v-html="notation.txt")
</template>

<script>
import arrowImgX from '../assets/img/arrow-x.png'
import arrowImgY from '../assets/img/arrow-y.png'

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
    position relative
    margin-right 2px
    transition transform 0.2s ease-in-out
    &.inline
      top 6px
      margin-left 2px
      &.active
        transform scaleX(-1)
    &.block
      top 4px
      &.active
        transform scaleY(-1)
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
