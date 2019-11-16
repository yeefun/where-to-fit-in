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
.color-white
  color #fff !important
.jcc
  justify-content center !important
.h-100p
  height 100% !important
</style>
