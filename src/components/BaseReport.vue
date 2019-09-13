<template lang="pug">
  //- todo 無法全部動畫結束後才觸發 after-leave
  //- transition-group#reports(
  //-   tag="section"
  //-   @leave="hideRelatedReport"
  //-   @after-leave="$root.inReportCover = false"
  //-   :css="false"
  //- )
  //- :class="{ 'report--home': $root.inReportCover }"
  section.reports(:style="{ height: $root.inReportCover ? 0 : '' }")
    article.report(
      v-for="report in relatedReports"
      :key="report.id"
      :id="`report${report.id}`"
      v-if="isReport(report.id)"
      @click="handleClick($event, report.id)"
      :style="{ 'justify-content': $root.inReportCover ? 'center' : ''}"
      :class="{ 'report--normal': (currentReportId === report.id) || $root.inReportCover }"
    )
      .report__cover-img.full-page.full-img(:id="`report${report.id}__cover`" :style="{ height: currentReportId !== report.id ? '100%' : '' }")
      //- transition(:css="false" @enter="fadeReportCoverTxt")
      .report__cover-txt(:id="`report-cover-txt${report.id}`")
        h1(:style="{ color: (report.id === 5 || report.id === 2) ? '#f6f6f6' : '#090909'}") {{ report.title }}
        .report__intro(
          v-if="!isReportContent"
          :style="introStyle(report.id)"
          :id="`report-intro${report.id}`"
        )
          .report__intro--cover(v-if="$root.inReportCover")
            div(v-html="report.introCover")
            button.clickable(type="button" @click.stop="loadReportContent(report.id)") {{ report.btnTxt }}
          .report__intro--related(v-else)
            p {{ report.introRelated }}
      component(
        :is="`ReportContent${report.id}`"
        v-if="isReportContent"
        @loaded="fadeInReportContent"
        :id="`report-content${report.id}`"
      )
</template>

<script>
// import ReportContent3 from './ReportContent3.vue'

export default {
  name: 'BaseReport',
  components: {
    ReportContent1: () => import('./ReportContent1'),
    ReportContent2: () => import('./ReportContent2'),
    ReportContent3: () => import('./ReportContent3'),
    ReportContent4: () => import('./ReportContent4'),
    ReportContent5: () => import('./ReportContent5')
  },
  props: ['backToHome'],
  created () {
    const id = this.$root.removedRelatedReportId
    if (id) {
      for (let i = 1; i <= 4; i++) {
        const idx = id + i
        this.relatedReports.push(this.allReports[`report${idx > 5 ? (idx - 5) : idx}`])
      }
    } else {
      this.relatedReports = this.allReports
    }
  },
  data () {
    return {
      // isReportIntro: true,
      isReportContent: false,
      // isReportCoverTxt: false,
      currentReportId: 0,
      allReports: {
        report1: {
          id: 1,
          title: '為什麼我們懼／拒胖？',
          introCover: '<p>我們正處在一個懼怕肥胖、拒絕變胖的時代。因為深怕與不健康、難看、懶惰等肥胖污名連結，人們多少對身材和體重感到焦慮。</p><p>事實上，1940 年代以前的臺灣社會認為，「胖」象徵一個人身強體壯、能力好⋯⋯臺灣人身材審美觀的轉變經歷了什麼？</p>',
          introRelated: '處在一個懼怕肥胖、拒絕變胖的時代，是誰定義胖就不好？',
          btnTxt: '為什麼怕胖？'
        },
        report2: {
          id: 2,
          title: '「胖不健康」是提醒，還是詛咒？',
          introCover: '<p>「胖不健康」是發自內心的關心，或是用自己的健康標準來期待胖子？不健康的身體樣貌很多種，肥胖卻最容易遭到嚴厲批評，甚至人身攻擊。</p><p>「我替自己推拿，推到肚子時一邊推、一邊哭，一邊跟它說『對不起』，我還是瘦不下來。」140 公斤的張凱鈞多次節食，卻從未減重成功⋯⋯</p>',
          introRelated: '不健康的身體樣貌有很多種，「肥胖」就真的是「病態」？',
          btnTxt: '張凱鈞健康嗎？'
        },
        report3: {
          id: 3,
          title: '不想瘦？胖子：想被當成普通人看待',
          introCover: '<p>許多胖子從小就胖，長大過程中常遭家人和同儕的指指點點。但胖子最大的期望不是瘦下來，而是得到與普通人同等的對待。</p><p>90 公斤的舞蹈老師黃冠潔在高中時愛上跳舞，是熱舞社裡最胖的女生，當她鼓起自信站上舞台時，卻有人說：「妳這麼胖，怎麼還敢跳舞？」</p>',
          introRelated: '許多胖子從小就胖，要怎麼教育胖孩子？該如何蛻變成長？',
          btnTxt: '黃冠潔如何蛻變？'
        },
        report4: {
          id: 4,
          title: '縮小人生：胖子之大，何處可容身？',
          introCover: '<p>「坐在捷運的座位上時，我的身體會超出一格。」145 公斤的簡秀娟在人滿為患的車廂裡總是坐立難安。在臺灣人的日常生活中，充斥著沈默的社會規範與空間規則，無意冒犯常規的胖子顯得格格不入，過著被標準排擠的縮小人生。</p>',
          introRelated: '討厭被胖子擠壓？空間需求和身障相同，卻得不到同理。',
          btnTxt: '尋找胖子的容身處'
        },
        report5: {
          id: 5,
          title: '胖網紅現身：渡邊直美改變了什麼？',
          introCover: '<p>身形肥胖的搞笑女星、IG 女神渡邊直美，是時下許多胖男胖女心中的偶像，她啟發粉絲對身材有自信、擁抱美麗。大大小小的胖網紅如雨後春筍般出現，在臺灣也不例外，他們呼籲大眾無論高矮胖瘦，尊重多元身體的存在。</p>',
          introRelated: '胖直美啟發粉絲擁抱身材，想問她如何成為有自信的胖子！',
          btnTxt: '如何成為有自信的胖子？'
        }
      },
      relatedReports: [],
      isShowingReport: false
    }
  },
  methods: {
    isReport (id) {
      return !this.currentReportId || (this.currentReportId === id)
    },
    introStyle (id) {
      return {
        marginTop: this.$root.inReportCover ? '32px' : '24px',
        color: (id === 5 || id === 2) ? '#f6f6f6' : '#1b2733'
      }
    },
    handleClick (evt, id) {
      this.showReportFromRelated(evt, id)
      if (!this.$root.inHome && this.$root.inReportCover) this.backToHome()
    },
    // fadeReportCoverTxt (el, done) {
    //   TweenLite.from(el, 0.6, {
    //     css: {
    //       opacity: 0,
    //       y: 10
    //     },
    //     delay: 0.6,
    //     ease: Power3.easeInOut
    //   })
    // },
    showReportFromHome (id) {
      this.$root.currentReport = document.getElementById(`report${id}`)
      this.isReportContent = true
      this.currentReportId = id
      this.$root.removedRelatedReportId = id
      TweenLite.set(this.$root.currentReport, {
        position: '',
        height: ''
      })
      this.$root.switchTimes += 1
      this.$root.baseReports.push(this.$root.switchTimes)
    },
    loadReportContent (id) {
      const reportCoverTxt = document.getElementById(`report-cover-txt${id}`)
      this.currentReportId = id
      this.$root.removedRelatedReportId = id
      TweenLite.to(`#report-intro${id}`, 0.6, {
        css: {
          autoAlpha: 0,
          y: 20
        },
        ease: Power2.easeInOut,
        onComplete: () => {
          reportCoverTxt.style.marginTop = `${reportCoverTxt.getBoundingClientRect().top}px`
          this.$root.inReportCover = false
          this.isReportContent = true
        }
      })
    },
    fadeInReportContent () {
      const id = this.currentReportId
      TweenLite.set(this.$root.currentReport, {
        position: '',
        height: ''
      })
      TweenLite.to(`#report-content${id}`, 0.9, {
        css: {
          opacity: 1,
          y: 0
        },
        ease: Power3.easeInOut
      })
      this.$root.switchTimes += 1
      this.$root.baseReports.push(this.$root.switchTimes)
      history.pushState(
        {
          place: 'report',
          id
        },
        '',
        `./report${id}`
      )
    },
    // hideRelatedReport (el, done) {
    //   if (this.$root.inReportCover) {
    //     done()
    //   } else {
    //     TweenLite.to(el, 0.8, {
    //       css: {
    //         opacity: 0
    //       },
    //       ease: Power3.easeIn,
    //       onComplete: done
    //     })
    //   }
    // },
    showReportFromRelated (evt, id) {
      const self = evt.currentTarget
      if ((this.$root.currentReport === self) || this.isShowingReport) return
      this.isShowingReport = true
      this.currentReportId = id
      this.$root.removedRelatedReportId = id
      // MODIFY
      this.$root.currentReport.style.opacity = 0
      // MODIFY
      // TweenLite.to(this.$root.currentReport, 0.8, {
      //   css: {
      //     opacity: 0
      //   },
      //   ease: Power3.easeIn,
      //   onComplete: () => {
      this.$root.baseReports.shift()
      self.style.cursor = 'auto'
      this.$root.switchTimes += 1
      this.$root.baseReports.push(this.$root.switchTimes)
      this.isReportContent = true
      this.isShowingReport = false
      //   }
      // })
      this.$root.currentReport = self
      if (!this.$root.isPopState) {
        history.pushState(
          {
            place: 'report',
            id
          },
          '',
          `./report${id}`
        )
      }
    }
  }
}
</script>

<style lang="stylus">
.reports
  overflow hidden
.report
  display flex
  // justify-content center
  align-items center
  position relative
  width 100%
  top 0
  z-index 19
  flex-direction column
  padding-top 64px
  padding-bottom 64px
  box-sizing border-box
  overflow hidden
  cursor pointer
  &--normal
    padding-top 0
    padding-bottom 80px
    // height 0
  & h1
    font-size 4.8rem
    font-weight 700
    line-height 1.5
  &__cover
    &-img
      z-index -9
    &-txt
      max-width 768px
      text-align center
      // transform-origin center top
  &__intro
    font-size 2.4rem
    &--cover
      line-height 1.8
      & p
        font-size 2.4rem
        & + p
          margin-top 16px
      & button
        color #f6f6f6
        font-size 2.0rem
        margin-top 56px
        line-height 1.8
        background-color rgba(#0a2d4f, 0.88)
        // border 2px solid rgba(#0a2d4f, 0.9)
        // background-color transparent
        // color #0a2d4f
        border-radius 200px
        padding 12px 32px
        font-weight 500
    &--related
      line-height 1.6

// .report--home
//   height 0
//   transform translateY(100vh)
#report1__cover
  background-image url(../assets/img/cover/lap/report1_bottom.png), url(../assets/img/cover/lap/report1_top.jpg)
  background-position center bottom, center top
  background-size cover
  // background-size 1280px
  background-repeat no-repeat
  // background-attachment fixed, scroll
#report2__cover
  background-image url(../assets/img/cover/lap/report2.jpg)
#report3__cover
  background-image url(../assets/img/cover/lap/report3.jpg)
#report4__cover
  background-image url(../assets/img/cover/lap/report4.jpg)
#report5__cover
  background-image url(../assets/img/cover/lap/report5.jpg)
</style>
