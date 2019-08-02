<template lang="pug">
  .report-text
    h1 不想瘦？胖子：想被當成普通人看待
    .report-text__intro(v-if="!$root.isReportContent")
      p 許多胖子從小就胖，長大過程中常遭家人和同儕的指指點點。但胖子最大的期望不是瘦下來，而是得到與普通人同等的對待。
      p 90 公斤的舞蹈老師黃冠潔在高中時愛上跳舞，是熱舞社裡最胖的女生，當她鼓起自信站上舞台時，卻有人說：「妳這麼胖，怎麼還敢跳舞？」
      button(type="button" @click="showReportContent") 黃冠潔如何蛻變？
    //- .report-text__content(v-else)
      h2 從小胖到大的蛻變四部曲
    ReportContent(v-else)
</template>

<script>
export default {
  name: 'ReportText',
  components: {
    ReportContent: () => import('./ReportContent.vue')
  },
  props: ['reportNum'],
  // data () {
  //   return {
  //     isReportIntro: true
  //   }
  // },
  methods: {
    showReportContent () {
      this.$root.isReportContent = true
      TweenLite.set('#reports', {
        position: 'relative'
      })
      window.history.pushState({ report: 3 }, '', 'report3.html')
      // window.addEventListener('popstate', this.backToHome)
    }
    // backToHome (evt) {
    //   const report = document.getElementById(`report${this.reportNum}`)
    //   report.style.transform = 'translateY(-100vh)'
    //   this.isReportIntro = true
    // }
  }
}
</script>

<style lang="scss">
.report-text {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  // color: #003152;
  // color: #111;
  // max-width: 768px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  // & h1 {
  //   font-size: 4.8rem;
  //   font-weight: 700;
  //   line-height: 1.5;
  //   margin-bottom: 32px;
  // }
  // &__intro {
  //   font-size: 2.4rem;
  //   line-height: 1.8;
  //   & p + p {
  //     margin-top: 24px;
  //   }
  // }
  // & button {
  //   margin-top: 48px;
  //   padding: 12px 32px;
  //   font-size: 2rem;
  //   line-height: 1.8;
  //   border-radius: 4px;
  //   background-color: rgba(#154d70, 0.72);
  //   box-shadow: 0 0 8px rgba(#003152, 0.4);
  //   color: #eee;
  //   // color: #154d70;
  //   // transition: background-color 0.2s;
  //   &:hover {
  //     background-color: rgba(#154d70, 0.8);
  //   }
  // }
  // & h2 {
  //   font-size: 3.2rem;
  //   font-weight: 500;
  //   line-height: 1.2;
  // }
}
</style>
