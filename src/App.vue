<template lang="pug">
  #app
    HomeCover
    BaseReport(v-for="report in $root.baseReports" :key="report.id")
</template>

<script>
import HomeCover from './components/HomeCover.vue'
import BaseReport from './components/BaseReport.vue'

export default {
  name: 'app',
  beforeCreate () {
    TweenLite.selector = function (val) {
      return document.querySelectorAll(val)
    }
  },
  mounted () {
    TweenLite.set('.report', {
      css: {
        height: 0,
        y: '100vh'
        // className: '+=in-home-cover'
      }
    })
  },
  components: {
    HomeCover,
    BaseReport
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
#app {
  overflow: hidden;
}
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
// .in-home-cover {
//   height: 0;
//   transform: translateY(100vh);
// }
button {
  border: 0;
  outline: 0;
  cursor: pointer;
  // font-family: "Noto Sans TC", sans-serif;
  // font-family: "PT Serif", "Noto Serif CJK TC", serif;
  user-select: none;
}
</style>
