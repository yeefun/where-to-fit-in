<template lang="pug">
  div.transition-mask
    picture
      source(media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc('logo-tab-s.png')")
      source(media="(min-width: 720px)" :srcset="$root.imgSrc('logo-tab-l.png')")
      img(:src="$root.imgSrc('logo-mob.png')" alt="")
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
  & picture
    width 51.2vw
    min-width 192px
  & img
    width 100%
</style>
