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
      cursor: { x: this.$root.ww / 2, y: this.$root.wh / 2 },
      mouse: { x: 0, y: 0 }
    }
  },
  created () {
    this.$root.wEl.addEventListener('mousemove', this.moveCursor)
  },
  computed: {
    deskData () {
      return this.$root.deskData
    },
    isBackImg () {
      return !this.deskData.inHome && this.deskData.inReportCover
    }
  },
  mounted () {
    this.mouse.x = this.cursor.x
    this.mouse.y = this.cursor.y
    const speed = 0.15
    const setCursorX = gsap.quickSetter(this.$el, 'x', 'px')
    const setCursorY = gsap.quickSetter(this.$el, 'y', 'px')

    gsap.ticker.add(() => {
      this.cursor.x += (this.mouse.x - this.cursor.x) * speed
      this.cursor.y += (this.mouse.y - this.cursor.y) * speed
      setCursorX(this.cursor.x)
      setCursorY(this.cursor.y)
      // gsap.set(this.$el, {
      //   x: this.cursor.x,
      //   y: this.cursor.y
      // })
    })
  },
  methods: {
    moveCursor (evt) {
      this.mouse.x = evt.clientX
      this.mouse.y = evt.clientY
    },
    handleEnter (el, done) {
      gsap.from(el, {
        scale: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.inOut',
        onComplete: done
      })
    },
    handleLeave (el, done) {
      gsap.to(el, {
        scale: 0,
        duration: 0.6,
        ease: 'power2.inOut',
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
