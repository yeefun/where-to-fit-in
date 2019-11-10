<template lang="pug">
  .custom-cursor(:class="{ back: isBackImg }")
    .custom-cursor__inner
      transition(:css="false" @enter="handleEnter" @leave="handleLeave")
        //- template(v-if="isCrossCursor")
        //- div(v-if="isCrossCursor" key="cross")
        //-   .custom-cursor__cross.custom-cursor__cross--left
        //-   .custom-cursor__cross.custom-cursor__cross--right
        //- .custom-cursor__circle(v-else key="circle")
        img.custom-cursor__home(src="../../assets/img/icon/arrow-back--desk.png" v-if="isBackImg" alt="")
        .custom-cursor__circle(v-else)
    //- .custom-cursor__circle#circle-cursor
</template>

<script>
export default {
  name: 'CustomCursor',
  data () {
    return {
      clientX: 0,
      clientY: 0,
      x: 0,
      y: 0
      // isCrossCursor: false
    }
  },
  created () {
    this.$root.wEl.addEventListener('mousemove', this.moveCursor)
  },
  computed: {
    // isCrossCursor () {
    //   return !this.$root.deskData.inHome && this.$root.deskData.inReportCover
    // }
    isBackImg () {
      return !this.$root.deskData.inHome && this.$root.deskData.inReportCover
    }
  },
  mounted () {
    TweenLite.ticker.addEventListener('tick', () => {
      this.x += (this.clientX - this.x) / 8
      this.y += (this.clientY - this.y) / 8
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
      this.clientX = evt.clientX
      this.clientY = evt.clientY
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
  },
  beforeDestroy () {
    this.$root.wEl.removeEventListener('mousemove', this.moveCursor)
  }
}
</script>

<style lang="stylus">
.custom-cursor
  position fixed
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
  mix-blend-mode overlay
  &.back
    mix-blend-mode normal
  &.hide
    visibility hidden
  // easeInOutQuart
  // transition background-color 0.3s 0.6s cubic-bezier(0.77, 0, 0.175, 1)
  // &.hide
  //   // background-color rgba(#fff, 0)
  //   mix-blend-mode normal
  //   easeInOutCubic
  //   transition background-color 0.3s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
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
  &__home
    width 40px
    height 40px
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  // &__cross
  //   width 28px
  //   height 8px
  //   background-color #fff
  //   position absolute
  //   top 50%
  //   left 50%
  //   &--left
  //     transform translate(-50%, -50%) rotate(45deg)
  //   &--right
  //     transform translate(-50%, -50%) rotate(-45deg)
</style>
