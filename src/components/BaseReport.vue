<template lang="pug">
  section#reports
    //- .report-cover.full-page#report1
    //- .report-cover.full-page.full-img#report2
    article.report#report3
      .full-page.full-img#report-cover3
      ReportText(reportNum="3")
    //- .report-cover.full-page.full-img#report4
    //- .report-cover.full-page.full-img#report5
</template>

<script>
import ReportText from './ReportText'

export default {
  name: 'BaseReport',
  components: {
    ReportText
  }
}
</script>

<style lang="scss">
// .report-cover {
//   transform: translateY(-100vh);
//   z-index: 19;
// }
#reports {
  position: absolute;
  width: 100%;
}
.report {
  position: relative;
  transform: translateY(-100vh);
  // opacity: 0;
  z-index: 19;
  height: 100vh;
}
#report1 {
  background-image: url(../assets/img/cover/lap/report1_bottom.png), url(../assets/img/cover/lap/report1_top.jpg);
  background-position: center bottom, center top;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed, scroll;
}
#report2 {
  background-image: url(../assets/img/cover/lap/report2.jpg);
}
#report-cover3 {
  background-image: url(../assets/img/cover/lap/report3.jpg);
}
#report4 {
  background-image: url(../assets/img/cover/lap/report4.jpg);
}
#report5 {
  background-image: url(../assets/img/cover/lap/report5.jpg);
}
</style>
