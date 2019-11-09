<template lang="pug">
  #app
    component(:is="$root.isMob ? 'MobView' : 'DeskView'")
</template>

<script>
import MobView from './components/MobView.vue'

export default {
  name: 'app',
  components: {
    DeskView: () => import('./components/DeskView.vue'),
    // MobView: () => import('./components/MobView.vue'),
    MobView
  }
}
</script>

<style lang="stylus">

</style>
