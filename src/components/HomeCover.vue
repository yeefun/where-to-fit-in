<template lang="pug">
  section.home-cover
    img(src="../assets/img/logo-shadow.png" alt="")
</template>

<script>
export default {
  name: 'HomeCover'
}
</script>

<style lang="stylus">
.home-cover
  position relative
  height 100vh
  background-image url(../assets/img/cover/mobile/home-mrt.png)
  background-size cover
  background-position 84% 0%
  background-repeat no-repeat
  & img
    width 66.67%
    position absolute
    bottom 22.79%
    left 6.4%
</style>
