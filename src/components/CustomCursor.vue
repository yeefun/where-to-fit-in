<template lang="pug">
  .custom-cursor(:style="{ marginTop: isCrossCursor ? 0 : '-16px', marginLeft: isCrossCursor ? 0 : '-16px' }")
    .custom-cursor__circle#circle-cursor(v-show="!isCrossCursor")
    //- template(v-show="isCrossCursor")
    .custom-cursor__cross.custom-cursor__cross--left(v-show="isCrossCursor")
    .custom-cursor__cross.custom-cursor__cross--right(v-show="isCrossCursor")
</template>

<script>
export default {
  name: 'CustomCursor',
  data () {
    return {
      x: 0,
      y: 0,
      top: 0,
      left: 0
      // isCrossCursor: false
    }
  },
  created () {
    window.addEventListener('mousemove', this.moveCursor)
  },
  computed: {
    isCrossCursor () {
      return !this.$root.inHome && this.$root.inReportCover
    }
  },
  mounted () {
    TweenLite.ticker.addEventListener('tick', () => {
      this.left += (this.x - this.left) / 8
      this.top += (this.y - this.top) / 8
      TweenLite.set(this.$el, {
        css: {
          left: this.left,
          top: this.top
        }
      })
    })
  },
  methods: {
    moveCursor (evt) {
      this.x = evt.pageX
      this.y = evt.pageY
    }
  }
}
</script>

<style lang="stylus">
.custom-cursor
  position absolute
  z-index 999
  top 0
  left 0
  pointer-events none
  user-select none
  // margin-top -16px
  // margin-left -16px
  &__circle
    width 32px
    height 32px
    // width 24px
    // height 24px
    border-radius 50%
    // border 1px solid #2198cb
    background-color rgba(#d5e6f0, 0.4)
    box-sizing border-box
  &__cross
    width 28px
    height 4px
    // background-color rgba(#144e79, 0.6)
    background-color rgba(#598cc4, 0.6);
    position absolute
    top 50%
    left 50%
    &--left
      transform translate(-50%, -50%) rotate(45deg)
    &--right
      transform translate(-50%, -50%) rotate(-45deg)
  // &__circle
  //   width 20px
  //   height 20px
  //   background-color #2198cb
  //   border-radius 50%
  //   position absolute
  //   top 50%
  //   left 50%
  //   transform translate(-50%, -50%)
  // &.link
  //   transform scale(1.2)
</style>
