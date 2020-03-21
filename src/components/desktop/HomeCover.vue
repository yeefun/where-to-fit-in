<template lang="pug">
  section.home-cover(:class="{ 'in-loading-cover': deskData.inLoadingCover }")
    picture.home-cover__mrt
      img(:src="$root.imgSrc('cover/home-mrt-desk-s.jpg')" alt="" @load="detectMRTImgLoad")
    div.home-cover__mask.full-page(ref="mask")
    div.home-cover__clickable-persons
      svg(viewBox="0 0 2000 1299" :style="clickablePersonsSize")
        g(v-for="(path, idx) in paths" :data-person="idx + 1" @mouseenter="showPerson" @mouseleave="hidePerson" @click="showReportCover")
          path(:d="path" @mouseover="animateCursorOver" @mouseout="animateCursorOut")
    div.full-page
      picture.home-cover__person(v-for="id in 5" :ref="`person${id}`")
        img(:src="$root.imgSrc(`cover/home-person${id}-desk-s.png`)" alt="")

    audio(ref="personBGM1")
      source(src="../../assets/audio/person1.mp3" type="audio/mpeg")
    audio(ref="personBGM2")
      source(src="../../assets/audio/person2.mp3" type="audio/mpeg")
    audio(ref="personBGM3")
      source(src="../../assets/audio/person3.mp3" type="audio/mpeg")
    audio(ref="personBGM4")
      source(src="../../assets/audio/person4.mp3" type="audio/mpeg")
    audio(ref="personBGM5")
      source(src="../../assets/audio/person5.mp3" type="audio/mpeg")
</template>

<script>
import { gsap } from 'gsap'
import paths from '../data/persons.js'

export default {
  name: 'HomeCover',
  data () {
    return {
      // (2000 / 1299).toFixed(2) = 1.54
      clickablePersonsAspectRatio: 1.54,
      isGoingReportCover: false,
      paths
    }
  },
  mounted () {
    const state = window.history.state
    if (state && state.place === 'report cover') {
      this.deskData.isBeginning = true
      this.showReportCover(null, state.id)
    }
  },
  computed: {
    clickablePersonsSize () {
      const windowAspectRatio = this.deskData.ww / this.deskData.wh
      return this.clickablePersonsAspectRatio > windowAspectRatio ? { width: `${2000 * (this.deskData.wh / 1299).toFixed(2)}px` } : { height: `${1299 * (this.deskData.ww / 2000).toFixed(2)}px` }
    },
    deskData () {
      return this.$root.deskData
    }
  },
  methods: {
    showPerson (evt) {
      if (this.isGoingReportCover) { return }

      const self = evt.currentTarget
      const idx = self.dataset.person
      const audio = this.$refs[ `personBGM${idx}` ]
      if (!this.deskData.isMuted) {
        audio.currentTime = 0
        audio.play()
      }
      this.deskData.currentPerson = this.$refs[ `person${idx}` ][ 0 ]
      gsap.to(this.deskData.currentPerson, {
        opacity: 1,
        x: 8,
        y: 8,
        duration: 0.6,
        ease: 'power3.out'
      })
      gsap.to(this.$refs.mask, {
        opacity: 0.88,
        duration: 0.75,
        ease: 'expo.out'
      })
    },
    hidePerson () {
      if (this.isGoingReportCover) { return }

      gsap.to(this.deskData.currentPerson, {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      })
      gsap.to(this.$refs.mask, {
        opacity: 0,
        duration: 0.75,
        ease: 'expo.out'
      })
    },
    showReportCover (evt, reportId) {
      const id = (evt ? evt.currentTarget.dataset.person : reportId)
      this.deskData.currentReport = document.getElementById(`report${id}`)
      this.isGoingReportCover = true
      this.deskData.inHome = false

      gsap.set(this.deskData.currentReport, {
        position: 'absolute',
        height: '100vh',
        cursor: 'auto'
      })

      gsap.to(this.$el, {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      })

      gsap.from(this.deskData.currentReport, {
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          if (this.deskData.currentPerson) {
            gsap.set([this.deskData.currentPerson, this.$refs.mask], {
              opacity: 0
            })
          }
          this.isGoingReportCover = false
        }
      })

      gsap.from(`#report-cover-txt${id}`, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        delay: 0.6,
        ease: 'expo.out'
      })

      if (this.deskData.isBeginning) {
        this.deskData.isBeginning = false
        return
      } else {
        // for Safari
        this.animateCursorOut()
      }

      if (!this.$root.isPopState) {
        history.pushState({ place: 'report cover', id }, '', this.$root.publicPath)
      } else {
        this.$root.isPopState = false
      }
    },
    animateCursorOver () {
      const cursor = this.$parent.$refs.cursor.$el
      const innerCursor = cursor.firstChild

      gsap.to(cursor, {
        scale: 6.4,
        mixBlendMode: 'overlay',
        duration: 0.3,
        ease: 'power3.inOut'
      })
      gsap.to(innerCursor, {
        scale: 0,
        duration: 0.15,
        ease: 'power3.inOut',
        overwrite: 'auto'
      })
    },
    animateCursorOut () {
      const cursor = this.$parent.$refs.cursor.$el
      const innerCursor = cursor.firstChild

      gsap.to(cursor, {
        scale: 1,
        mixBlendMode: 'normal',
        duration: 0.3,
        ease: 'power2.inOut'
      })
      gsap.to(innerCursor, {
        scale: 1,
        duration: 0.45,
        ease: 'power2.inOut'
      })
    },
    detectMRTImgLoad () {
      this.deskData.isMRTBgImgLoad = true
      if (this.deskData.isLogoLoad && this.deskData.inLoadingCover) {
        this.$parent.loadProgress()
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.home-cover
  position absolute
  top 0
  left 0
  width 100%
  height 100vh
  overflow hidden
  &.in-loading-cover
    visibility hidden
  &.hide
    opacity 0
    visibility hidden
  &__mrt
    height 100%
    & img
      object-fit cover
      object-position top center
      width 100%
      height 100%
  &__mask
    background-color #0a2d4f
    opacity 0
  &__clickable-persons
    position absolute
    top 0
    left 50%
    transform translateX(-50%)
    z-index 9
    opacity 0
    & g
      cursor pointer
  &__person
    opacity 0
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    & img
      width 100%
      height 100%
      object-fit cover
      object-position center top
</style>
