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
img
  height auto
  max-width 100%

</style>
