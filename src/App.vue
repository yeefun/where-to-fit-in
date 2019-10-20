<template lang="pug">
  #app
    HomeCover
</template>

<script>
import HomeCover from './components/HomeCover.vue'

export default {
  name: 'app',
  components: {
    HomeCover
  }
}
</script>

<style lang="stylus">
$font-family = -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans CJK TC", "Noto Sans CJK", "Source Han Sans", "Heiti TC", "PingFang TC", "Hiragino Sans GB", "Microsoft JhengHei", sans-serif

html
  font-size 10px
body
  font-family $font-family
img
  height auto
  max-width 100%

</style>
