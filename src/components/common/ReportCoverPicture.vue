<template lang="pug">
  picture
    source(type="image/jpeg" media="(min-width: 460px) and (max-width: 719.98px)" :srcset="$root.imgSrc(`cover/report${reportId}-tab-s.jpg`)")
    source(type="image/jpeg" media="(min-width: 720px) and (max-width: 999.98px)" :srcset="$root.imgSrc(`cover/report${reportId}-tab-l.jpg`)")
    source(type="image/jpeg" media="(min-width: 1000px) and (max-width: 1599.98px)" :srcset="$root.imgSrc(`cover/report${reportId}-desk-s.jpg`)")
    source(type="image/jpeg" media="(min-width: 1600px)" :srcset="$root.imgSrc(`cover/report${reportId}-desk-l.jpg`)")
    img(:src="$root.imgSrc(`cover/report${reportId}-mob.jpg`)" alt="")
</template>

<script>
export default {
  name: 'ReportCoverPicture',
  props: {
    reportId: {
      type: [ Number, String ],
      required: true
    }
  }
}
</script>

<style lang="stylus">
</style>
