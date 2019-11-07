<template lang="pug">
  #app
    component(:is="$root.isMob ? 'MobView' : 'DeskView'")
</template>

<script>
export default {
  name: 'app',
  components: {
    DeskView: () => import('./components/DeskView.vue'),
    MobView: () => import('./components/MobView.vue')
  }
}
</script>

<style lang="stylus">
@import './util/report.styl'

$ff--sans-serif = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Heiti TC", "PingFang TC", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
body
  font-family $ff--sans-serif
  background-color #f6f6f6
  overflow-y scroll
#logo
  position fixed
  z-index 99
  width 176px
  margin-top 24px
  margin-left 32px
  cursor pointer
.full-page
  position absolute
  width 100%
  height 100vh
  top 0
  left 0
.full-img
  background-position top center
  background-size cover
  background-repeat no-repeat
button
  border 0
  outline 0
  cursor pointer
  font-family $ff--sans-serif
  user-select none
img
  height auto
</style>
