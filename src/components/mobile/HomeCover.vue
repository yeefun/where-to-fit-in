<template lang="pug">
  section.home-cover(:style="{ height: `${$root.mobData.wh}px` }")
    div.home-cover__intro
      picture
        source(type="image/png" media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc('logo-shadow-tab-s.png')")
        source(type="image/png" media="(min-width: 720px)" :srcset="$root.imgSrc('logo-shadow-tab-l.png')")
        img(:src="$root.imgSrc('logo-shadow-mob.png')" alt="")
      p 超出常規的胖子該如何改變自己，才能找到容身立足的位置？
    img.home-cover__arrow(src="../../assets/img/icon/arrow-up-double.svg" alt)
</template>

<script>
export default {
  name: 'HomeCover'
}
</script>

<style lang="stylus">
@import '../../util/global.styl'

.home-cover
  position relative
  background-image url(../../assets/img/cover/home-mrt-spotlight-desk-s.jpg)
  background-size cover
  background-position 78% 0%
  background-repeat no-repeat
  @media (min-width $tablet)
    background-position-x 86%
  &__intro
    position absolute
    color #fff
    font-size 1.8rem
    line-height 1.5
    padding-left 6.4%
    bottom 22.79%
    font-weight 500
    box-sizing border-box
    max-width 100%
    @media (min-width $tablet)
      padding-left 9.38%
      bottom 20.31%
      font-size 3.2rem
    & picture
      max-width 66.67vw
      margin-bottom 24px
      @media (min-width $tablet)
        margin-bottom 64px
    & img
      width 100%
      vertical-align middle
    & p
      border-left 1px solid #fff
      padding-left 16px
      padding-right 16.53vw
      margin-left 20px
      @media (min-width $tablet)
        border-left-width 3px
        padding-left 32px
        margin-left 40px
        padding-right 17.71vw
  &__arrow
    width 28px
    position absolute
    left 50%
    bottom 16px
    transform translateX(-50%)
    @media (min-width $tablet)
      width 40px
      bottom 32px
</style>
