<template lang="pug">
  section.the-credit
    div
      div.the-credit__container
        div
          div.the-credit__wrapper
            div.the-credit__title 採訪報導
            div.the-credit__name 林梵謹
          div.the-credit__wrapper
            div.the-credit__title 網頁製作
            div.the-credit__name 林昱帆
        div
          div.the-credit__wrapper
            div.the-credit__title 網頁設計
            div.the-credit__name 林梵謹、林昱帆
          div.the-credit__wrapper
            div.the-credit__title 聲音作曲
            div.the-credit__name 蔡昀恬
      div
        div.the-credit__title 特別感謝
        div.the-credit__name 張錦華、謝吉隆、方念萱、董谷音<br>歐成予、沈佩泠、Xavier Wang
      picture
        source(media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc('logo-shadow-tab-s.png')")
        source(media="(min-width: 720px)" :srcset="$root.imgSrc('logo-shadow-tab-l.png')")
        img(:src="$root.imgSrc('logo-shadow-mob.png')" alt="")
      div.the-credit__name © 2017-2020 林梵謹
</template>

<script>
export default {
  name: 'TheCredit'
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.the-credit
  position fixed
  z-index 299
  left 0
  right 0
  top 0
  bottom 0
  background-color rgba(#08517C, 0.96)
  color #fff
  font-size 1.8rem
  line-height 1.6
  text-align center
  display flex
  flex-direction column
  justify-content center
  align-items center
  overflow auto
  @media (min-width $tablet)
    font-size 2.0rem
  & > div
    min-width 270px
  &__container
    display flex
    margin-bottom 20px
    justify-content center
    @media (min-width $tablet)
      margin-bottom 32px
    & > div
      &:first-child
        padding-right 20px
        @media (min-width $tablet)
          padding-right 32px
      &:last-child
        padding-left 20px
        @media (min-width $tablet)
          padding-left 32px
  &__wrapper
    & + .the-credit__wrapper
      margin-top 20px
      @media (min-width $tablet)
        margin-top 32px
  &__title
    font-size 2.2rem
    line-height 1.5
    font-weight 700
    margin-bottom 4px
    @media (min-width $tablet)
      font-size 2.4rem
      margin-bottom 8px
  &__name
    color #f6f6f6
  & picture
    max-width 192px
    margin 40px auto
    @media (min-width $tablet)
      margin-top 56px
      margin-bottom 56px
  & img
    width 100%
    vertical-align middle
</style>
