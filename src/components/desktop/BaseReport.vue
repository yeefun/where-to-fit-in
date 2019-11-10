<template lang="pug">
  section.reports(:class="{ hide: $root.deskData.inReportCover }")
    article.report(
      v-for="report in relatedReports"
      v-if="isReport(report.id)"
      @click="handleClick($event, report.id)"
      :key="report.id"
      :style="{ 'justify-content': $root.deskData.inReportCover ? 'center' : '' }"
      :id="`report${report.id}`"
      :class="reportClass(report.id)"
    )
      .report__cover-img.full-page.full-img(
        :id="`report${report.id}__cover`"
        :style="{ height: currentReportId !== report.id ? '100%' : '' }"
      )
      .report__cover-txt(:id="`report-cover-txt${report.id}`")
        //- todo #f6f6f6 or #fff
        //- #fff need text-shadow
        h1(:style="{ color: (report.id === 5 || report.id === 2) ? '#fff' : '#090909'}") {{ report.title }}
        .report__intro(
          v-if="!isReportContent"
          v-show="isReportIntro"
          :style="introStyle(report.id)"
          :id="`report-intro${report.id}`"
          :class="[ $root.deskData.inReportCover ? 'cover' : 'related' ]"
        )
          .report__intro--cover(v-if="$root.deskData.inReportCover")
            div(v-html="report.introCover")
            button(type="button" @click.stop="loadReportContent(report.id)") {{ report.btnTxt }}
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
    if (!this.showReportFromBeginning()) this.loadRelatedReports()
  },
  // mounted () {
  //   this.bindMouseEventsToCursor()
  // },
  data () {
    return {
      isReportContent: false,
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
      isShowingReport: false,
      isReportIntro: true,
      isBeginning: false
    }
  },
  methods: {
    isReport (id) {
      return !this.currentReportId || (this.currentReportId === id)
    },
    reportClass (id) {
      return {
        'report--current': this.currentReportId === id
        // clickable: !this.$root.deskData.inReportCover
      }
    },
    introStyle (id) {
      return {
        // marginTop: this.$root.deskData.inReportCover ? '32px' : '24px',
        color: (id === 5 || id === 2) ? '#fff' : '#1b2733'
      }
    },
    loadRelatedReports () {
      const id = this.$root.deskData.removedRelatedReportId
      if (id) {
        for (let i = 1; i <= 4; i++) {
          const idx = id + i
          this.relatedReports.push(this.allReports[`report${idx > 5 ? (idx - 5) : idx}`])
        }
      } else {
        this.relatedReports = this.allReports
      }
    },
    handleClick (evt, id) {
      if (!this.$root.deskData.inHome && this.$root.deskData.inReportCover) {
        this.backToHome()
        return
      }
      this.showReportFromRelated(evt, id)
      // if (!this.$root.deskData.inHome && this.$root.deskData.inReportCover) this.backToHome()
    },
    showReportFromBeginning () {
      const id = this.$root.deskData.beginningReportId
      if (id) {
        this.isShowingReport = true
        this.isBeginning = true
        this.$root.deskData.inHome = false
        this.$root.deskData.inReportCover = false

        this.currentReportId = id
        this.$root.deskData.removedRelatedReportId = id

        this.relatedReports.push(this.allReports[`report${id}`])

        this.isReportContent = true

        this.$root.deskData.beginningReportId = 0
      }
      return id
    },
    showReportFromHome (id) {
      this.$root.deskData.currentReport = document.getElementById(`report${id}`)
      this.isReportIntro = false

      TweenLite.set(this.$root.deskData.currentReport, {
        css: {
          position: 'absolute',
          height: '100vh',
          cursor: 'auto'
        }
      })

      this.currentReportId = id
      this.$root.deskData.removedRelatedReportId = id
      this.$root.deskData.inReportCover = false
      this.isReportContent = true
    },
    showReportFromRelated (evt, id) {
      const self = evt.currentTarget
      if ((this.$root.deskData.currentReport === self) || this.isShowingReport) return

      this.isShowingReport = true

      if (!this.$root.isPopState) {
        const otherReports = [1, 2, 3, 4, 5].filter((num) => num !== id).map((num) => `#report${num}`)
        const selfT = self.getBoundingClientRect().top
        TweenLite.to(self, 0.45, {
          css: {
            y: -selfT,
            height: '100vh'
          },
          ease: Circ.easeInOut,
          onComplete: () => {
            TweenLite.set(self, {
              css: {
                position: 'fixed',
                y: 0,
                cursor: 'auto'
              }
            })
            this.$root.deskData.baseReports.shift()
            this.$root.htmlEl.scrollTop = 0
            this.$root.bodyEl.scrollTop = 0
            // this.animateCursorOut()
          }
        })
        TweenLite.to(otherReports, 0.45, {
          css: {
            autoAlpha: 0
          },
          ease: Circ.easeInOut,
          onComplete: () => {
            this.$root.deskData.currentReport = self
            this.isShowingReport = false
            this.loadReportContent(id)
          }
        })
      } else {
        TweenLite.set(self, {
          css: {
            position: 'fixed',
            height: '100vh',
            cursor: 'auto'
          }
        })
        this.$root.htmlEl.scrollTop = 0
        this.$root.bodyEl.scrollTop = 0
        this.$root.deskData.baseReports.shift()

        this.$root.deskData.currentReport = self
        this.isShowingReport = false
        this.loadReportContent(id)
      }
    },
    loadReportContent (id) {
      if (this.$root.deskData.inHome) return
      this.currentReportId = id
      this.$root.deskData.removedRelatedReportId = id
      TweenLite.to(`#report-intro${id}`, 0.6, {
        css: {
          autoAlpha: 0,
          y: 24
        },
        ease: Circ.easeInOut,
        onComplete: () => {
          this.$root.deskData.inReportCover = false
          this.isReportContent = true
        }
      })
    },
    fadeInReportContent () {
      const id = this.currentReportId
      if (!this.isBeginning) {
        TweenLite.set(this.$root.deskData.currentReport, {
          position: '',
          height: ''
        })
        TweenLite.to(`#report-content${id}`, 0.9, {
          css: {
            opacity: 1,
            y: 0
          },
          ease: Circ.easeInOut,
          onComplete: () => {
            this.$root.deskData.switchTimes += 1
            this.$root.deskData.baseReports.push(this.$root.deskData.switchTimes)
          }
        })
      } else {
        this.$root.deskData.currentReport = document.getElementById(`report${id}`)
        TweenLite.set(`#report-content${id}`, {
          css: {
            opacity: 1,
            y: 0
          }
        })
        TweenLite.set(this.$root.deskData.currentReport, {
          css: {
            cursor: 'auto'
          }
        })
        this.$root.deskData.switchTimes += 1
        this.$root.deskData.baseReports.push(this.$root.deskData.switchTimes)
      }
      if (this.isBeginning) {
        history.replaceState(
          {
            place: 'report',
            id
          },
          '',
          `${this.$root.pathname}report${id}`
        )
        this.isBeginning = false
      } else if (!this.$root.isPopState) {
        history.pushState(
          {
            place: 'report',
            id
          },
          '',
          `${this.$root.pathname}report${id}`
        )
      } else {
        this.$root.isPopState = false
        // this.isBeginning = false
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.reports
  &.hide
    overflow hidden
    height 0
.report
  display flex
  align-items center
  position relative
  width 100%
  top 0
  left 0
  z-index 19
  flex-direction column
  padding-top 64px
  padding-bottom 64px
  box-sizing border-box
  overflow hidden
  cursor pointer
  // transition transform 0.3s ease-in-out
  // &:hover
  //   transform translateY(-16px)
  &--current
    padding-top 24vh
    padding-bottom 80px
  & h1
    max-width 992px
    font-size 3.2rem
    font-weight 700
    line-height 1.5
    padding-left 24px
    padding-right 24px
    @media (min-width $tablet)
      font-size 4.8rem
      padding-left 40px
      padding-right 40px
  &__cover
    &-img
      z-index -9
    &-txt
      text-align center
  &__intro
    max-width 768px
    font-size 2rem
    padding-left 32px
    padding-right 32px
    @media (min-width $mobile)
      padding-left 40px
      padding-right 40px
    @media (min-width $tablet)
      font-size 2.4rem
    &.cover
      margin-top 24px
      @media (min-width $tablet)
        margin-top 32px
    &.related
      margin-top 16px
      @media (min-width $tablet)
        margin-top 24px
    &--cover
      line-height 1.8
      & p + p
        margin-top 12px
        @media (min-width $tablet)
          margin-top 16px
      & button
        color #fff
        font-size 1.8rem
        margin-top 40px
        line-height 1.8
        // todo try 漸層色
        // background-color #003152
        // background-color #08517c
        // background-color #2e5a7e
        // background-color rgba(#08517c, 0.88)
        background-color #2f5b7f
        // border 1px solid darken(#2f5b7f, 8%)
        // background-color #5d7090
        // background-color #787676
        // background-color #6dabcb
        // border 1px solid darken(#2c5666, 24%)
        // border 1px solid darken(#54626c, 16%)
        // background-image linear-gradient(to right, #08517c, #003152)
        // background-image linear-gradient(to right, #314755 0%, #26a0da 51%, #314755 100%)
        // border-radius 200px
        // border-top-left-radius 20px
        // border-bottom-right-radius 20px
        padding 14px 32px
        @media (min-width $tablet)
          // line-height 1.8
          font-size 2rem
    &--related
      line-height 1.6

#report1__cover
  // todo one or tow img?
  // background-image url(../../assets/img/cover/report1-bottom.png), url(../../assets/img/cover/report1-top.jpg)
  background-image url(../../assets/img/cover/report1.jpg)
  // background-position center bottom, center top
  // background-size cover
  // background-size 1280px
  // background-repeat no-repeat
  // background-attachment fixed, scroll
#report2__cover
  background-image url(../../assets/img/cover/report2.jpg)
#report3__cover
  background-image url(../../assets/img/cover/report3.jpg)
#report4__cover
  background-image url(../../assets/img/cover/report4.jpg)
#report5__cover
  background-image url(../../assets/img/cover/report5.jpg)
</style>