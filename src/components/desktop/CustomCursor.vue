<template lang="pug">
  div(:class="[ 'custom-cursor', { back: isBackImg, loading: loading }]")
    transition(:css="false" @before-enter="handleBeforeEnter" @enter="handleEnter" @leave="handleLeave")
      div(v-if="loading" key="progress") {{ progress }}
      img(v-else-if="isBackImg" src="../../assets/img/icon/arrow-back--desk.png" alt="" key="back")
      div.circle(v-else key="point")
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'CustomCursor',
  data () {
    return {
      // todo when loading window size change, position won't be correct
      cursor: { x: this.$root.deskData.ww / 2, y: this.$root.deskData.wh / 2 },
      mouse: { x: this.$root.deskData.ww / 2, y: this.$root.deskData.wh / 2 },
      progress: 0,
      loading: this.$root.deskData.inLoadingCover
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
    const speed = 0.15
    const setCursorX = gsap.quickSetter(this.$el, 'x', 'px')
    const setCursorY = gsap.quickSetter(this.$el, 'y', 'px')
    gsap.ticker.add(() => {
      if (this.loading) { return }
      this.cursor.x += ((this.mouse.x - this.cursor.x) * speed)
      this.cursor.y += ((this.mouse.y - this.cursor.y) * speed)
      setCursorX(Number(this.cursor.x).toFixed(2))
      setCursorY(Number(this.cursor.y).toFixed(2))
    })
  },
  methods: {
    moveCursor (evt) {
      if (this.loading) { return }
      this.mouse.x = evt.clientX
      this.mouse.y = evt.clientY
    },
    handleBeforeEnter (el) {
      gsap.set(el, {
        scale: 0,
        xPercent: -50,
        yPercent: -50
      })
    },
    handleEnter (el, done) {
      gsap.to(el, {
        scale: 1,
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
@import "../../util/global.styl"

.custom-cursor
  position fixed
  z-index 999
  top 0
  left 0
  pointer-events none
  user-select none
  width 44px
  height 44px
  margin-top -22px
  margin-left -22px
  border-radius 50%
  background-color rgba(#fff, 0.4)
  color #fff
  font-size 1.4rem
  transition background-color 0.9s $easeInOutCubic
  &.loading
    top 50%
    left 50%
    transform translateY(80%)
    opacity 0
    background-color transparent
    border 1px solid #fff
  &.back
    mix-blend-mode normal
  &.hide
    visibility hidden
  & > *
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
  & .circle
    background-color #fff
    width 6px
    height 6px
    border-radius 50%
  & img
    width 32px
    display block
</style>
