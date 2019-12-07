<template lang="pug">
  //- todo icons by <a target="_blank" href="https://icons8.com">Icons8</a>
  #app
    component(:is="$root.isMob ? 'MobView' : 'DeskView'")

    transition(name="fadeCredit")
      img.icon.icon--cancel(v-if="isCredit" src="./assets/img/icon/cancel.png" alt="" @click="toggleCredit")
      img.icon.icon--credit(v-else src="./assets/img/icon/info.png" alt="" @click="toggleCredit")

    transition(name="fadeCredit")
      TheCredit(v-if="isCredit")
</template>

<script>
import TheCredit from './components/common/TheCredit.vue'

export default {
  name: 'app',
  components: {
    DeskView: () => import('./components/DeskView.vue'),
    MobView: () => import('./components/MobView.vue'),
    TheCredit
  },
  data () {
    return {
      isCredit: false
    }
  },
  methods: {
    toggleCredit () {
      this.isCredit = !this.isCredit
    }
  }
}
</script>

<style lang="stylus">
@import './util/global.styl'

html
  font-size 10px
body
  font-family $ff--sans-serif
img
  height auto
  max-width 100%
button
  border 0
  outline 0
  cursor pointer
  font-family $ff--sans-serif
  user-select none
.icon
  position fixed
  z-index 99
  width 20px
  cursor pointer
  mix-blend-mode color-burn
  user-select none
  &--credit
    top 0
    right 0
    padding 8px 8px 5px 5px
    @media (min-width $tablet)
      padding-top 24px
      padding-right 32px
  &--cancel
    top 0
    right 0
    padding 8px 8px 5px 5px
    z-index 399
    mix-blend-mode normal
    @media (min-width $tablet)
      padding-top 24px
      padding-right 32px

.color-white
  color #fff !important
.jcc
  justify-content center !important
.h-100p
  height 100% !important

.fadeCredit
  &-enter, &-leave-to
    opacity 0
  &-enter-active, &-leave-active
    transition opacity 0.15s $easeOutSine
</style>
