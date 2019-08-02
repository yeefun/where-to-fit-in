<template lang="pug">
  .related-reports
    article.related-report#related-report4(@click="showReport($event, 4)")
      .full-page.full-img.related-report__cover#related-report__cover4
      h1 縮小人生：胖子之大，何處可容身？
      p 討厭被胖子擠壓？空間需求和身障相同，卻得不到同理。
    article.related-report#related-report5
      .full-page.full-img.related-report__cover#related-report__cover5
      h1 胖網紅現身：渡邊直美改變了什麼？
      p 胖直美啟發粉絲擁抱身材，想問她如何成為有自信的胖子！
    article.related-report#related-report1
      .full-page.related-report__cover#related-report__cover1
      h1 為什麼我們懼／拒胖？
      p 處在一個懼怕肥胖、拒絕變胖的時代，是誰定義胖就不好？
    article.related-report#related-report2
      .full-page.full-img.related-report__cover#related-report__cover2
      h1 「胖不健康」是提醒，還是詛咒？
      p 不健康的身體樣貌有很多種，「肥胖」就真的是「病態」？
</template>

<script>
export default {
  name: 'TheRelated',
  methods: {
    showReport (evt, num) {
      const self = evt.currentTarget
      const relatedReport1 = document.getElementById('related-report1')
      const relatedReport2 = document.getElementById('related-report2')
      const relatedReport5 = document.getElementById('related-report5')
      TweenLite.to('#report3, #related-report1, #related-report2, #related-report5', 0.2, {
        opacity: 0,
        onComplete: () => {
          TweenLite.set('#report3', {
            y: '-100vh'
          })
          TweenLite.set('#reports', {
            position: 'absolute'
          })
        }
      })
      TweenLite.set(self, {
        position: 'absolute'
      })
      TweenLite.to(self, 0.4, {
        top: 0,
        height: '100vh',
        onComplete: () => {
          TweenLite.set(self, {
            position: 'relative'
          })
          relatedReport1.parentNode.removeChild(relatedReport1)
          relatedReport2.parentNode.removeChild(relatedReport2)
          relatedReport5.parentNode.removeChild(relatedReport5)
          this.$root.TheRelatedComponentNum += 1
          const state = {
            report: 4,
            component: 'related'
          }
          window.history.pushState(state, '', 'report4.html')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.related-reports {
  // display: flex;
  text-align: center;
}
.related-report {
  position: relative;
  width: 100%;
  padding-top: 64px;
  padding-bottom: 64px;
  cursor: pointer;
  z-index: 19;
  &__cover {
    z-index: -9;
  }
}
#related-report__cover1 {
  background-image: url(../assets/img/cover/lap/report1_bottom.png), url(../assets/img/cover/lap/report1_top.jpg);
  background-position: center bottom, center top;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed, scroll;
}
#related-report__cover2 {
  background-image: url(../assets/img/cover/lap/report2.jpg);
}
#related-report__cover3 {
  background-image: url(../assets/img/cover/lap/report3.jpg);
}
#related-report__cover4 {
  background-image: url(../assets/img/cover/lap/report4.jpg);
}
#related-report__cover5 {
  background-image: url(../assets/img/cover/lap/report5.jpg);
}
</style>
