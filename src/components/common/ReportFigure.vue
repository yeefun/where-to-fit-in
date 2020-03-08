<template lang="pug">
  figure.report-img
    picture
      source(type="image/webp" media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc(`${src}-tab-s.webp`)")
      source(type="image/jpg" media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc(`${src}-tab-s.jpg`)")

      source(type="image/webp" media="(min-width: 720px)" :srcset="$root.imgSrc(`${src}-tab-l.webp`)")
      source(type="image/jpg" media="(min-width: 720px)" :srcset="$root.imgSrc(`${src}-tab-l.jpg`)")

      source(type="image/webp" :srcset="$root.imgSrc(`${src}-mob.webp`)")
      img(:src="$root.imgSrc(`${src}-mob.jpg`)" alt="")
    figcaption(v-if="caption") {{ caption }}
</template>

<script>
export default {
  name: 'ReportFigure',
  props: {
    src: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
@import "../../util/report-figure.styl"
</style>
