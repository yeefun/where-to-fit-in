<template lang="pug">
  #app
    HomeCover
    BaseReport
    TheRelated(v-if="$root.isReportContent" v-for="component in $root.TheRelatedComponentNum")
</template>

<script>
import HomeCover from './components/HomeCover.vue'
import BaseReport from './components/BaseReport.vue'
import TheRelated from './components/TheRelated.vue'

export default {
  name: 'app',
  components: {
    HomeCover,
    BaseReport,
    TheRelated
  }
}
</script>

<style lang="scss">
html {
  font-size: 10px;
}
// body {
//   font-family: "Noto Sans TC", sans-serif;
//   // font-family: "PT Serif", "Noto Serif CJK TC", serif;
// }
.full-page {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.full-img {
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
}
button {
  border: 0;
  outline: 0;
  cursor: pointer;
  // font-family: "Noto Sans TC", sans-serif;
  // font-family: "PT Serif", "Noto Serif CJK TC", serif;
  user-select: none;
}
// .fade-in {
//   opacity: 1 !important;
// }
</style>
