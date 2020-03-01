<template lang="pug">
  section(:class="[ 'reports', { hide: $root.deskData.inReportCover } ]")
    article(
      v-for="(report, idx) in relatedReports"
      :key="`report${report.id}`"
      v-if="isReport(report.id)"
      :id="`report${report.id}`"
      :class="[ 'report', reportClass(report.id) ]"
      @click="handleClick($event, report.id)"
    )
      div(
        v-if="isMask && !isReportContent"
        :class="[ 'report__mask', (report.id === 5 || report.id === 2) ? 'dark' : 'light' ]"
      )
      div(
        :id="`report${report.id}__cover`"
        :class="[ 'report__cover-img', { 'h-100p': currentReportId !== report.id }, 'full-img', 'full-page' ]"
      )
      div.report__cover-txt(:id="`report-cover-txt${report.id}`")
        h1(:class="$root.white(report.id)") {{ report.title }}
        div(
          v-if="!isReportContent"
          v-show="isReportIntro"
          :id="`report-intro${report.id}`"
          :class="[ 'report__intro', introClass(report.id) ]"
        )
          div.report__intro--cover(v-if="$root.deskData.inReportCover")
            div(v-html="report.introCover")
            button(type="button" @click.stop="loadReportContent(report.id)" @mouseover="toggleCursor" @mouseout="toggleCursor") {{ report.btnTxt }}
          div.report__intro--related(v-else)
            p {{ report.introRelated }}
      component(
        :is="`ReportContent${report.id}`"
        v-if="isReportContent"
        :id="`report-content${report.id}`"
        @loaded="fadeInReportContent"
      )
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'BaseReport',
  components: {
    ReportContent1: () => import('./ReportContent1'),
    ReportContent2: () => import('./ReportContent2'),
    ReportContent3: () => import('./ReportContent3'),
    ReportContent4: () => import('./ReportContent4'),
    ReportContent5: () => import('./ReportContent5')
  },
  created () {
    if (!this.showReportFromBeginning()) {
      this.loadRelatedReports()
    }
  },
  data () {
    return {
      isReportContent: false,
      currentReportId: 0,
      allReports: [
        {
          id: 1,
          title: '為什麼我們懼／拒胖？',
          introCover: '<p>我們正處在一個懼怕肥胖、拒絕變胖的時代。因為深怕與不健康、難看、懶惰等肥胖污名連結，人們多少對身材和體重感到焦慮。</p><p>事實上，1940 年代以前的臺灣社會認為，「胖」象徵一個人身強體壯、能力好⋯⋯臺灣人身材審美觀的轉變經歷了什麼？</p>',
          introRelated: '處在一個懼怕肥胖、拒絕變胖的時代，是誰定義胖就不好？',
          btnTxt: '為什麼怕胖？'
        },
        {
          id: 2,
          title: '「胖不健康」是提醒，還是詛咒？',
          introCover: '<p>「胖不健康」是發自內心的關心，或是用自己的健康標準來期待胖子？不健康的身體樣貌很多種，肥胖卻最容易遭到嚴厲批評，甚至人身攻擊。</p><p>「我替自己推拿，推到肚子時一邊推、一邊哭，一邊跟它說『對不起』，我還是瘦不下來。」140 公斤的張凱鈞多次節食，卻從未減重成功⋯⋯</p>',
          introRelated: '不健康的身體樣貌有很多種，「肥胖」就真的是「病態」？',
          btnTxt: '張凱鈞健康嗎？'
        },
        {
          id: 3,
          title: '不想瘦？胖子：想被當成普通人看待',
          introCover: '<p>許多胖子從小就胖，長大過程中常遭家人和同儕的指指點點。但胖子最大的期望不是瘦下來，而是得到與普通人同等的對待。</p><p>90 公斤的舞蹈老師黃冠潔在高中時愛上跳舞，是熱舞社裡最胖的女生，當她鼓起自信站上舞台時，卻有人說：「妳這麼胖，怎麼還敢跳舞？」</p>',
          introRelated: '許多胖子從小就胖，要怎麼教育胖孩子？該如何蛻變成長？',
          btnTxt: '黃冠潔如何蛻變？'
        },
        {
          id: 4,
          title: '縮小人生：胖子之大，何處可容身？',
          introCover: '<p>「坐在捷運的座位上時，我的身體會超出一格。」145 公斤的簡秀娟在人滿為患的車廂裡總是坐立難安。在臺灣人的日常生活中，充斥著沈默的社會規範與空間規則，無意冒犯常規的胖子顯得格格不入，過著被標準排擠的縮小人生。</p>',
          introRelated: '討厭被胖子擠壓？空間需求和身障相同，卻得不到同理。',
          btnTxt: '尋找胖子的容身處'
        },
        {
          id: 5,
          title: '胖網紅現身：渡邊直美改變了什麼？',
          introCover: '<p>身形肥胖的搞笑女星、IG 女神渡邊直美，是時下許多胖男胖女心中的偶像，她啟發粉絲對身材有自信、擁抱美麗。大大小小的胖網紅如雨後春筍般出現，在臺灣也不例外，他們呼籲大眾無論高矮胖瘦，尊重多元身體的存在。</p>',
          introRelated: '胖直美啟發粉絲擁抱身材，想問她如何成為有自信的胖子！',
          btnTxt: '如何成為有自信的胖子？'
        }
      ],
      isMask: true,
      relatedReports: [],
      isShowingReport: false,
      isReportIntro: true,
      isBeginning: false,
      isTransition: false,
      isFromRelated: false
    }
  },
  computed: {
    deskData () {
      return this.$root.deskData
    }
  },
  methods: {
    isReport (id) {
      return !this.currentReportId || (this.currentReportId === id)
    },
    reportClass (id) {
      return {
        'report--current': this.currentReportId === id,
        'related': !this.isReportContent && !this.deskData.inReportCover,
        'jcc': this.deskData.inReportCover
      }
    },
    introClass (id) {
      return [
        this.deskData.inReportCover ? 'cover' : 'related',
        this.$root.white(id)
      ]
    },
    loadRelatedReports () {
      const id = this.deskData.removedRelatedReportId
      if (id) {
        for (let i = 1; i <= 4; i++) {
          const idx = (id - 1) + i
          this.relatedReports.push(this.allReports[(idx >= 5 ? (idx - 5) : idx)])
        }
      } else {
        this.relatedReports = this.allReports
      }
    },
    handleClick (evt, id) {
      if (!this.deskData.inHome && this.deskData.inReportCover) {
        this.$parent.backToHome()
        return
      }
      this.showReportFromRelated(evt, id)
    },
    showReportFromBeginning () {
      const id = this.deskData.beginningReportId
      if (id) {
        this.isShowingReport = true
        this.isBeginning = true
        this.deskData.inHome = false
        this.deskData.inReportCover = false

        this.currentReportId = id
        this.deskData.removedRelatedReportId = id

        this.relatedReports.push(this.allReports[id - 1])

        this.isReportContent = true

        this.deskData.beginningReportId = 0
      }
      return id
    },
    showReportFromHome (id) {
      this.isMask = false
      this.deskData.currentReport = document.getElementById(`report${id}`)
      this.isReportIntro = false

      gsap.set(this.deskData.currentReport, {
        position: 'absolute',
        height: '100vh',
        cursor: 'auto'
      })

      this.currentReportId = id
      this.deskData.removedRelatedReportId = id
      this.deskData.inReportCover = false
      this.isReportContent = true
    },
    showReportFromRelated (evt, id) {
      const self = evt ? evt.currentTarget : document.getElementById(`report${id}`)

      if ((this.deskData.currentReport === self) || this.isShowingReport) { return }

      this.isMask = false
      this.isShowingReport = true

      if (!this.$root.isPopState) {
        const otherReports = [ 1, 2, 3, 4, 5 ].filter((num) => num !== id).map((num) => `#report${num}`)
        const selfT = self.getBoundingClientRect().top
        gsap.to(self, {
          y: -selfT,
          height: '100vh',
          duration: 0.45,
          ease: 'circ.inOut',
          onComplete: () => {
            gsap.set(self, {
              position: 'fixed',
              y: 0,
              cursor: 'auto'
            })
            this.deskData.baseReports.shift()
            this.deskData.htmlEl.scrollTop = 0
            this.$root.bodyEl.scrollTop = 0
          }
        })
        gsap.to(otherReports, {
          autoAlpha: 0,
          duration: 0.45,
          ease: 'circ.inOut',
          onComplete: () => {
            this.deskData.currentReport = self
            this.isShowingReport = false
            this.loadReportContent(id, true)
          }
        })
      } else {
        gsap.set(self, {
          position: 'fixed',
          height: '100vh',
          cursor: 'auto'
        })
        this.deskData.htmlEl.scrollTop = 0
        this.$root.bodyEl.scrollTop = 0
        this.deskData.baseReports.shift()

        this.deskData.currentReport = self
        this.isShowingReport = false
        this.loadReportContent(id, true)
      }
    },
    loadReportContent (id, isFromRelated = false) {
      if (this.deskData.inHome) return

      this.isFromRelated = isFromRelated
      this.isMask = false
      this.isTransition = true

      this.currentReportId = id
      this.deskData.removedRelatedReportId = id
      gsap.to(`#report-intro${id}`, {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: 'circ.inOut',
        onComplete: () => {
          this.deskData.inReportCover = false
          this.isReportContent = true
          this.isTransition = false
        }
      })
    },
    fadeInReportContent () {
      const id = this.currentReportId
      const state = { place: 'report', id }
      const url = `${this.$root.publicPath}report${id}`

      if (!this.isBeginning) {
        gsap.set(this.deskData.currentReport, {
          position: '',
          height: ''
        })
        gsap.to(`#report-content${id}`, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'circ.inOut',
          onComplete: () => {
            this.deskData.switchTimes += 1
            this.deskData.baseReports.push(this.deskData.switchTimes)
          }
        })
      } else {
        this.deskData.currentReport = document.getElementById(`report${id}`)
        gsap.set(`#report-content${id}`, {
          opacity: 1,
          y: 0
        })
        gsap.set(this.deskData.currentReport, {
          cursor: 'auto'
        })
        this.deskData.switchTimes += 1
        this.deskData.baseReports.push(this.deskData.switchTimes)
      }

      if (this.isBeginning) {
        history.replaceState(state, '', url)
        this.isBeginning = false
      } else if (!this.$root.isPopState) {
        if (this.isFromRelated) {
          history.pushState(state, '', url)
        } else {
          history.replaceState(state, '', url)
        }
      } else {
        this.$root.isPopState = false
      }
    },
    toggleCursor () {
      const cursor = this.$parent.$refs.cursor
      if (this.isTransition || !cursor) return

      cursor.$el.classList.toggle('hide')
    }
  }
}
</script>

<style lang="stylus">
@import "../../util/global.styl"

.reports
  background-color #f6f6f6
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
  & .report__mask
    height 100vh
  &.related
    & .report__mask
      height 100%
    &:hover .report__mask
      &.dark
        background-color rgba(#090909, 0.7)
      &.light
        background-color rgba(#fff, 0.7)
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
    color #090909
    @media (min-width $tablet)
      font-size 4.8rem
      padding-left 40px
      padding-right 40px
  &__mask
    position absolute
    top 0
    left 0
    width 100%
    transition background-color 0.45s $easeInOutCubic
    &.dark
      background-color rgba(#090909, 0.4)
    &.light
      background-color rgba(#fff, 0.4)
  &__cover
    &-img
      z-index -9
    &-txt
      text-align center
      position relative
  &__intro
    max-width 768px
    font-size 2rem
    padding-left 32px
    padding-right 32px
    color #1b2733
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
        background-color #2f5b7f
        padding 14px 32px
        transition all 0.3s $easeInOutCubic
        border-radius 4px
        box-shadow 0 8px 16px rgba(#1b2733, 0.2)
        @media (min-width $tablet)
          font-size 2rem
        &:hover
          letter-spacing 2px
          background-color darken(#2f5b7f, 8%)
        &:active
          background-color darken(#2f5b7f, 16%)
    &--related
      line-height 1.6

#report1__cover
  background-image url(../../assets/img/cover/report1.jpg)
#report2__cover
  background-image url(../../assets/img/cover/report2.jpg)
#report3__cover
  background-image url(../../assets/img/cover/report3.jpg)
#report4__cover
  background-image url(../../assets/img/cover/report4.jpg)
#report5__cover
  background-image url(../../assets/img/cover/report5.jpg)
</style>
