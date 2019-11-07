<template lang="pug">
  .custom-cursor
    .custom-cursor__inner
      transition(:css="false" @enter="handleEnter" @leave="handleLeave")
        //- template(v-if="isCrossCursor")
        div(v-if="isCrossCursor" key="cross")
          .custom-cursor__cross.custom-cursor__cross--left
          .custom-cursor__cross.custom-cursor__cross--right
        .custom-cursor__circle(v-else key="circle")
    //- .custom-cursor__circle#circle-cursor
</template>

<script>
export default {
  name: 'CustomCursor',
  data () {
    return {
      pageX: 0,
      pageY: 0,
      x: 0,
      y: 0
      // isCrossCursor: false
    }
  },
  created () {
    window.addEventListener('mousemove', this.moveCursor)
  },
  computed: {
    isCrossCursor () {
      return !this.$root.desk.inHome && this.$root.desk.inReportCover
    }
  },
  mounted () {
    TweenLite.ticker.addEventListener('tick', () => {
      this.x += (this.pageX - this.x) / 8
      this.y += (this.pageY - this.y) / 8
      TweenLite.set(this.$el, {
        css: {
          x: this.x,
          y: this.y
        }
      })
    })
  },
  methods: {
    moveCursor (evt) {
      this.pageX = evt.pageX
      this.pageY = evt.pageY
    },
    handleEnter (el, done) {
      TweenLite.from(el, 0.6, {
        css: {
          scale: 0
        },
        delay: 0.3,
        ease: Power3.easeInOut,
        onComplete: done
      })
    },
    handleLeave (el, done) {
      TweenLite.to(el, 0.6, {
        css: {
          scale: 0
        },
        ease: Power2.easeInOut,
        onComplete: done
      })
    }
  }
}
</script>

<style lang="stylus">
.custom-cursor
  // todo absolute or fixed?
  position absolute
  // position fixed
  z-index 999
  top 0
  left 0
  pointer-events none
  user-select none
  width 32px
  height 32px
  margin-top -16px
  margin-left -16px
  border-radius 50%
  // background-color rgba(#d5e6f0, 0.4)
  background-color rgba(#fff, 0.4)
  box-sizing border-box
  // mix-blend-mode overlay
  &__inner
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  &__circle
    position absolute
    background-color #fff
    // background-color #d5e6f0
    width 6px
    height 6px
    top 50%
    left 50%
    transform translate(-50%, -50%)
    border-radius 50%
  &__cross
    // visibility hidden
    // opacity 0
    width 28px
    height 8px
    // background-color rgba(#144e79, 0.6)
    background-color #fff
    // background-color #d5e6f0
    // background-color rgba(10, 45, 79, 1)
    position absolute
    top 50%
    left 50%
    &--left
      transform translate(-50%, -50%) rotate(45deg)
    &--right
      transform translate(-50%, -50%) rotate(-45deg)
  // &__circle
  //   width 32px
  //   height 32px
  //   border-radius 50%
  //   background-color rgba(#d5e6f0, 0.4)
  //   box-sizing border-box
</style>
