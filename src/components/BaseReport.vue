<template lang="pug">
  section.reports
    transition-group(tag="div" @leave="hideRelatedReport" :css="false")
      article.report(v-for="report in reports" :key="report.id" :id="`report${report.id}`" v-if="isShowReport(report.id)" @click="showReportFromRelated($event, report.id)" :style="reportStyle")
        .full-page.full-img.report__cover(:id="`report${report.id}__cover`")
        h1 {{report.title}}
        .report__preface
          .report__preface--cover(v-if="isShowReportPrefaceCover")
            div(v-html="report.prefaceCover")
            button(type="button" @click="showReportContent(report.id)") {{report.btnText}}
          .report__preface--related(v-if="isShowReportPrefaceRelated")
            p {{report.prefaceRelated}}
        component(:is="`ReportContent${report.id}`" v-if="isShowReportContent")
</template>

<script>
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
    const id = this.$root.removedReportId
    const allReports = {
      report1: {
        id: 1,
        title: '為什麼我們懼／拒胖？',
        prefaceCover: '<p>我們正處在一個懼怕肥胖、拒絕變胖的時代。因為深怕與不健康、難看、懶惰等肥胖污名連結，人們多少對身材和體重感到焦慮。</p><p>事實上，1940 年代以前的臺灣社會認為，「胖」象徵一個人身強體壯、能力好⋯⋯臺灣人身材審美觀的轉變經歷了什麼？</p>',
        prefaceRelated: '處在一個懼怕肥胖、拒絕變胖的時代，是誰定義胖就不好？',
        btnText: '為什麼怕胖？'
      },
      report2: {
        id: 2,
        title: '「胖不健康」是提醒，還是詛咒？',
        prefaceCover: '<p>「胖不健康」是發自內心的關心，或是用自己的健康標準來期待胖子？不健康的身體樣貌很多種，肥胖卻最容易遭到嚴厲批評，甚至人身攻擊。</p><p>「我替自己推拿，推到肚子時一邊推、一邊哭，一邊跟它說『對不起』，我還是瘦不下來。」140 公斤的張凱鈞多次節食，卻從未減重成功⋯⋯</p>',
        prefaceRelated: '不健康的身體樣貌有很多種，「肥胖」就真的是「病態」？',
        btnText: '張凱鈞健康嗎？'
      },
      report3: {
        id: 3,
        title: '不想瘦？胖子：想被當成普通人看待',
        prefaceCover: '<p>「許多胖子從小就胖，長大過程中常遭家人和同儕的指指點點。但胖子最大的期望不是瘦下來，而是得到與普通人同等的對待。</p><p>90 公斤的舞蹈老師黃冠潔在高中時愛上跳舞，是熱舞社裡最胖的女生，當她鼓起自信站上舞台時，卻有人說：「妳這麼胖，怎麼還敢跳舞？」</p>',
        prefaceRelated: '許多胖子從小就胖，要怎麼教育胖孩子？該如何蛻變成長？',
        btnText: '黃冠潔如何蛻變？'
      },
      report4: {
        id: 4,
        title: '縮小人生：胖子之大，何處可容身？',
        prefaceCover: '<p>「坐在捷運的座位上時，我的身體會超出一格。」145 公斤的簡秀娟在人滿為患的車廂裡總是坐立難安。在臺灣人的日常生活中，充斥著沈默的社會規範與空間規則，無意冒犯常規的胖子顯得格格不入，過著被標準排擠的縮小人生。</p>',
        prefaceRelated: '討厭被胖子擠壓？空間需求和身障相同，卻得不到同理。',
        btnText: '尋找胖子的容身處'
      },
      report5: {
        id: 5,
        title: '胖網紅現身：渡邊直美改變了什麼？',
        prefaceCover: '<p>身形肥胖的搞笑女星、IG 女神渡邊直美，是時下許多胖男胖女心中的偶像，她啟發粉絲對身材有自信、擁抱美麗。大大小小的胖網紅如雨後春筍般出現，在臺灣也不例外，他們呼籲大眾無論高矮胖瘦，尊重多元身體的存在。</p>',
        prefaceRelated: '胖直美啟發粉絲擁抱身材，想問她如何成為有自信的胖子！',
        btnText: '如何成為有自信的胖子？'
      }
    }
    if (id) {
      for (let i = 1; i <= 4; i++) {
        const idx = id + i
        this.reports.push(allReports[`report${idx > 5 ? (idx - 5) : idx}`])
      }
    } else {
      this.reports.push(allReports.report1, allReports.report2, allReports.report3, allReports.report4, allReports.report5)
    }
  },
  data () {
    return {
      isShowReportContent: false,
      currentReportId: 0,
      reports: [],
      isShowingReport: false
    }
  },
  computed: {
    isShowReportPrefaceCover () {
      return this.$root.inReportCover && !this.isShowReportContent
    },
    isShowReportPrefaceRelated () {
      return !this.$root.inReportCover && !this.isShowReportContent
    },
    reportStyle () {
      if (this.$root.inReportCover) {
        return {
          height: 0,
          transform: 'translateY(100vh)'
        }
      }
      return {}
    }
  },
  methods: {
    isShowReport (id) {
      return !this.currentReportId || this.currentReportId === id
    },
    showReportContent (id) {
      this.isShowReportContent = true
      this.currentReportId = id
      this.$root.removedReportId = id
      TweenLite.set(this.$root.currentReport, {
        css: {
          position: '',
          height: ''
        }
      })
      this.$root.totalClickedReports += 1
      this.$root.baseReports.push(this.$root.totalClickedReports)
    },
    hideRelatedReport (el, done) {
      if (this.$root.inReportCover) {
        setTimeout(() => {
          this.$root.inReportCover = false
        }, 0)
        done()
      } else {
        TweenLite.to(el, 0.8, {
          css: {
            opacity: 0
          },
          ease: Power3.easeIn,
          onComplete: done
        })
      }
    },
    showReportFromRelated (evt, id) {
      const self = evt.currentTarget
      if (this.$root.currentReport === self || this.isShowingReport) return
      this.isShowingReport = true
      this.currentReportId = id
      this.$root.removedReportId = id
      TweenLite.to(this.$root.currentReport, 0.8, {
        css: {
          opacity: 0
        },
        ease: Power3.easeIn,
        onComplete: () => {
          this.$root.baseReports.shift()
          TweenLite.set(self, {
            className: '+=report--current'
          })
          this.$root.totalClickedReports += 1
          this.$root.baseReports.push(this.$root.totalClickedReports)
          this.isShowReportContent = true
          this.isShowingReport = false
        }
      })
      this.$root.currentReport = self
    }
  }
}
</script>

<style lang="scss">
.reports {
  text-align: center;
}
.report {
  position: relative;
  width: 100%;
  top: 0;
  // height: 0;
  // transform: translateY(100vh);
  z-index: 19;
  cursor: pointer;
  &__cover {
    z-index: -9;
  }
}
.report--current {
  cursor: auto;
}
#report1__cover {
  background-image: url(../assets/img/cover/lap/report1_bottom.png), url(../assets/img/cover/lap/report1_top.jpg);
  background-position: center bottom, center top;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed, scroll;
}
#report2__cover {
  background-image: url(../assets/img/cover/lap/report2.jpg);
}
#report3__cover {
  background-image: url(../assets/img/cover/lap/report3.jpg);
}
#report4__cover {
  background-image: url(../assets/img/cover/lap/report4.jpg);
}
#report5__cover {
  background-image: url(../assets/img/cover/lap/report5.jpg);
}
</style>
