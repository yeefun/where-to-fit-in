<template lang="pug">
  #app
    HomeCover/
    ReportCover/
    //- <img alt="Vue logo" src="./assets/logo.png">
    //- <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomeCover from './components/HomeCover.vue'
import ReportCover from './components/ReportCover.vue'

export default {
  name: 'app',
  components: {
    HomeCover,
    ReportCover
    // HelloWorld
  }
}
</script>

<style lang="scss">
html {
  font-size: 10px;
}
.full-img {
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
}
.full-page {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.fade-in {
  opacity: 1;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
