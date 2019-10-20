<template lang="pug">
  section.home-cover
    //- todo <a target="_blank" href="https://icons8.com/icons/set/double-up">Double Up</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    .home-cover__intro
      img(src="../assets/img/logo-shadow.png" alt="")
      p 超出常規的胖子該如何改變自己，才能找到容身立足的位置？
    img.home-cover__arrow(src="../assets/img/double-up-glyph.png" alt)
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
  &__intro
    position absolute
    color #fff
    font-size 1.8rem
    line-height 1.5
    // bottom 22.79%
    // left 6.4%
    padding-left 6.4%
    top 50.3%
    font-weight 500
    & img
      width 66.67%
      display block
      margin-bottom 24px
      // position absolute
      // bottom 22.79%
      // left 6.4%
    & p
      border-left 1px solid #fff
      padding-left 16px
      // padding-right 24px
      padding-right 16.53%
      margin-left 16px
  &__arrow
    width 32px
    position absolute
    left 50%
    bottom 16px
    transform translateX(-50%)
</style>
