<template lang="pug">
  //- todo icons by <a target="_blank" href="https://icons8.com">Icons8</a>
  #app
    component(:is="$root.isMob ? 'MobView' : 'DeskView'")

    transition(name="fadeCredit")
      img.icon.icon--credit(:src="creditIconSrc" alt="" @click="toggleCredit" :class="{ cancel: this.isCredit, 'in-loading-cover': $root.deskData.inLoadingCover && !$root.isMob}" :key="this.isCredit ? 'cancel' : 'info'")

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
  computed: {
    creditIconSrc () {
      return require(`./assets/img/icon/${this.isCredit ? 'cancel' : 'info'}.svg`)
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
  font-weight 300
img
  height auto
button
  border 0
  outline 0
  cursor pointer
  font-family $ff--sans-serif
  user-select none
picture
  display block
.icon
  position fixed
  z-index 99
  width 22px
  cursor pointer
  user-select none
  display block
  @media (min-width $tablet)
    width 24px
  &.in-loading-cover
    visibility hidden
  &--credit
    width 20px
    // (30 - 20) / 2
    padding 5px
    // 16 - 5
    top 11px
    // 16 - 5
    right 11px
    @media (min-width $tablet)
      width 22px
      // (40 - 22) / 2
      padding 9px
      // 24 - 9
      top 15px
      // 32 - 9
      right 23px
    &.cancel
      z-index 399
.share
  position fixed
  z-index 99
  user-select none
  bottom 12px
  right 16px
  width 30px
  height 30px
  &.in-loading-cover
    visibility hidden
  @media (min-width $tablet)
    bottom 16px
    right 28px
    width 40px
    height 40px
  &.active
    & a
      opacity 1
    & .share__fb
      transform translateY(-200%)
    & .share__line
      transform translateY(-100%)
  & *
    display block
    width 100%
    height 100%
    padding 4px
    cursor pointer
    position absolute
    box-sizing border-box
    @media (min-width $tablet)
      padding 8px
  & a
    background-position center
    background-size 22px 22px
    background-repeat no-repeat
    opacity 0
    transition opacity 0.3s $easeInOutSine, transform 0.3s $easeInOutSine
    @media (min-width $tablet)
      background-size 24px 24px
  &__fb
    background-image url(./assets/img/icon/share-fb.svg)
  &__line
    background-image url(./assets/img/icon/share-line.svg)

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
