<template lang="pug">
  section
    .report-cover.full-page.full-img#report1
    .report-cover.full-page.full-img#report2
    .report-cover.full-page.full-img#report3
    .report-cover.full-page.full-img#report4
    .report-cover.full-page.full-img#report5
</template>

<script>
export default {
  name: 'ReportCover'
}
</script>

<style lang="scss">
.report-cover {
  transform: translateY(-100vh);
  z-index: 19;
  transition: transform 0.8s;
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
#report3 {
  background-image: url(../assets/img/cover/lap/report3.jpg);
}
#report4 {
  background-image: url(../assets/img/cover/lap/report4.jpg);
}
#report5 {
  background-image: url(../assets/img/cover/lap/report5.jpg);
}
</style>
