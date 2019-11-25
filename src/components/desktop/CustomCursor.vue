<template lang="pug">
  .custom-cursor(:class="{ back: isBackImg }")
    .custom-cursor__inner
      transition(:css="false" @enter="handleEnter" @leave="handleLeave")
        img.custom-cursor__home(v-if="isBackImg" src="../../assets/img/icon/arrow-back--desk.png" alt="")
        .custom-cursor__circle(v-else)
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'CustomCursor',
  data () {
    return {
      cursor: { x: 0, y: 0 },
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
    this.cursor.x = this.deskData.ww / 2
    this.cursor.y = this.deskData.wh / 2
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
  background-color rgba(#fff, 0.4)
  box-sizing border-box
  mix-blend-mode overlay
  &.back
    mix-blend-mode normal
  &.hide
    visibility hidden
  &__inner
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  &__circle
    position absolute
    background-color #fff
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
</style>
