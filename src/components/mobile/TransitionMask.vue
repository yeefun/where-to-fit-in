<template lang="pug">
  .transition-mask
    img(src="../../assets/img/logo.png" alt="")
</template>

<script>
export default {
  name: 'TransitionMask'
}
</script>

<style lang="stylus">
.transition-mask
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(#003152, 1)
  z-index 999
  display flex
  justify-content center
  align-items center
  // &.show
  //   opacity 1
  //   visibility visible
  //   & img
  //     transition transform 0.4s
  //     transform translateX(0vw)
  & img
    width 51.2vw
    min-width 192px
    // transform translateX(100vw)
</style>
