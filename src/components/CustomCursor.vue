<template lang="pug">
  <div class="custom-cursor">
    //- .custom-cursor__circle
  </div>
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
    }
  },
  created () {
    window.addEventListener('mousemove', this.moveCursor)
  },
  mounted () {
    TweenLite.ticker.addEventListener('tick', () => {
      this.left += (this.x - this.left) / 16
      this.top += (this.y - this.top) / 16
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
  width 36px
  height 36px
  border-radius 50%
  border 1px solid #2198cb
  pointer-events none
  user-select none
  box-sizing border-box
  margin-top -18px
  margin-left -18px
  // easeOutQuint easeOutQuint easeInOutCubic
  // transition left 1.2s cubic-bezier(0.23, 1, 0.32, 1), top 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.65s cubic-bezier(0.645, 0.045, 0.355, 1)
  // &.link
    // transform scale(1.2)
    // easeOutQuint easeOutQuint easeInOutQuart
    // transition left 1.2s cubic-bezier(0.23, 1, 0.32, 1), top 1.2s cubic-bezier(0.23, 1, 0.32, 1), transform 0.65s cubic-bezier(0.77, 0, 0.175, 1)
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
