<template lang="pug">
  #app
    HomeCover
    BaseReport
</template>

<script>
import HomeCover from './components/HomeCover.vue'
import BaseReport from './components/BaseReport.vue'

export default {
  name: 'app',
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
.full-img {
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
}
.full-page {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}
.fade-in {
  opacity: 1;
}
button {
  border: 0;
  outline: 0;
  cursor: pointer;
  // font-family: "Noto Sans TC", sans-serif;
  // font-family: "PT Serif", "Noto Serif CJK TC", serif;
  user-select: none;
}
</style>
