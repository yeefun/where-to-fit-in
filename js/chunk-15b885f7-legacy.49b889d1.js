(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-15b885f7"],{"06d8":function(t,e,o){},"095a":function(t,e,o){"use strict";var r=o("06d8"),a=o.n(r);a.a},"2c05":function(t,e,o){},"3c88":function(t,e,o){},6081:function(t,e,o){"use strict";var r=o("3c88"),a=o.n(r);a.a},"620c":function(t,e,o){},8527:function(t,e,o){"use strict";var r=o("2c05"),a=o.n(r);a.a},a243:function(t,e,o){"use strict";var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("picture",[o("source",{attrs:{type:"image/jpg",media:"(min-width: 460px) and (max-width: 719.98px)",srcset:t.$root.imgSrc("cover/report"+t.reportId+"-tab-s.jpg")}}),o("source",{attrs:{type:"image/jpg",media:"(min-width: 720px) and (max-width: 999.98px)",srcset:t.$root.imgSrc("cover/report"+t.reportId+"-tab-l.jpg")}}),o("source",{attrs:{type:"image/jpg",media:"(min-width: 1000px) and (max-width: 1599.98px)",srcset:t.$root.imgSrc("cover/report"+t.reportId+"-desk-s.jpg")}}),o("source",{attrs:{type:"image/jpg",media:"(min-width: 1600px)",srcset:t.$root.imgSrc("cover/report"+t.reportId+"-desk-l.jpg")}}),o("img",{attrs:{src:t.$root.imgSrc("cover/report"+t.reportId+"-mob.jpg"),alt:""}})])},a=[],n=(o("c5f6"),{name:"ReportCoverPicture",props:{reportId:{type:[Number,String],required:!0}}}),i=n,s=o("2877"),c=Object(s["a"])(i,r,a,!1,null,null,null);e["a"]=c.exports},b68b:function(t,e,o){"use strict";var r=o("bc05"),a=o.n(r);a.a},b72b:function(t,e,o){"use strict";var r=o("620c"),a=o.n(r);a.a},bc05:function(t,e,o){},ddcd:function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mob-view"},[r("img",{directives:[{name:"show",rawName:"v-show",value:t.mobData.isReportContent,expression:"mobData.isReportContent"}],staticClass:"icon icon--back-to",attrs:{src:o("663f"),alt:""},on:{click:t.moveBack}}),r("div",{staticClass:"home-wrapper"},[r("HomeCover"),r("ReportsList")],1),r("BaseReport"),r("transition",{attrs:{name:"fadeMask"},on:{"after-enter":t.handleFadeInAfter}},[r("TransitionMask",{directives:[{name:"show",rawName:"v-show",value:t.mobData.isTransition,expression:"mobData.isTransition"}]})],1),r("div",{staticClass:"share",class:{active:t.isShare},on:{click:function(t){t.stopPropagation()}}},[r("a",{staticClass:"share__fb",attrs:{href:"https://www.facebook.com/share.php?u="+t.shareURL,target:"_blank"}}),r("a",{staticClass:"share__line",attrs:{href:"https://line.me/R/msg/text/?"+t.shareURL,target:"_blank"}}),r("img",{attrs:{src:o("7345"),alt:""},on:{click:function(e){t.isShare=!t.isShare}}})])],1)},a=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",{staticClass:"home-cover",style:{height:t.$root.mobData.wh+"px"}},[r("div",{staticClass:"home-cover__intro"},[r("picture",[r("source",{attrs:{type:"image/png",media:"(min-width: 460px) and (max-width: 719.98px)",srcset:t.$root.imgSrc("logo-shadow-tab-s.png")}}),r("source",{attrs:{type:"image/png",media:"(min-width: 720px)",srcset:t.$root.imgSrc("logo-shadow-tab-l.png")}}),r("img",{attrs:{src:t.$root.imgSrc("logo-shadow-mob.png"),alt:""}})]),r("p",[t._v("超出常規的胖子該如何改變自己，才能找到容身立足的位置？")])]),r("img",{staticClass:"home-cover__arrow",attrs:{src:o("a39b"),alt:""}})])},i=[],s={name:"HomeCover"},c=s,p=(o("095a"),o("2877")),u=Object(p["a"])(c,n,i,!1,null,null,null),l=u.exports,m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"reports-list"},t._l(t.mobData.reports,function(e){return o("div",{key:e.id,staticClass:"reports-list__report"},[o("ReportCoverPicture",{attrs:{reportId:e.id}}),o("h1",{class:t.$root.white(e.id)},[t._v(t._s(e.title))]),o("p",{class:t.$root.white(e.id)},[t._v(t._s(e.intro))]),o("button",{attrs:{id:"homeReportBtn"+e.id},on:{click:function(o){return t.showReportContent(e.id)}}},[t._v("繼續閱讀")])],1)}),0)},h=[],d=o("a243"),b={name:"ReportsList",components:{ReportCoverPicture:d["a"]},methods:{showReportContent:function(t){this.mobData.isTransition=!0,this.mobData.currentReportId=t,this.$root.mobMethods().backToTop()}},computed:{mobData:function(){return this.$root.mobData}}},f=b,g=(o("6081"),Object(p["a"])(f,m,h,!1,null,null,null)),v=g.exports,w=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"base-report",class:{show:t.mobData.isReportContent},attrs:{id:"base-report"}},[o("ReportContent"+t.mobData.currentReportId,{tag:"component"}),o("RelatedReports")],1)},R=[],$={name:"BaseReport",components:{ReportContent1:function(){return o.e("chunk-30aa8b4c").then(o.bind(null,"a8be"))},ReportContent2:function(){return o.e("chunk-0968d8bd").then(o.bind(null,"b3dc"))},ReportContent3:function(){return o.e("chunk-5e4d57ce").then(o.bind(null,"5990"))},ReportContent4:function(){return o.e("chunk-0bd549c0").then(o.bind(null,"5def"))},ReportContent5:function(){return o.e("chunk-20c10ba8").then(o.bind(null,"277f"))},RelatedReports:function(){return o.e("chunk-99d875d6").then(o.bind(null,"7252"))}},computed:{mobData:function(){return this.$root.mobData}}},k=$,C=(o("8527"),Object(p["a"])(k,w,R,!1,null,null,null)),_=C.exports,D=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"transition-mask"},[o("picture",[o("source",{attrs:{type:"image/png",media:"(min-width: 460px) and (max-width: 719.98px)",srcset:t.$root.imgSrc("logo-tab-s.png")}}),o("source",{attrs:{type:"image/png",media:"(min-width: 720px)",srcset:t.$root.imgSrc("logo-tab-l.png")}}),o("img",{attrs:{src:t.$root.imgSrc("logo-mob.png"),alt:""}})])])},x=[],S={name:"TransitionMask"},I=S,j=(o("b72b"),Object(p["a"])(I,D,x,!1,null,null,null)),y=j.exports,P={name:"MobView",components:{HomeCover:l,ReportsList:v,BaseReport:_,TransitionMask:y},created:function(){this.$root.wEl.addEventListener("popstate",this.handlePopState)},mounted:function(){var t=this;this.$root.wEl.addEventListener("click",function(){t.isShare=!1})},data:function(){return{isShare:!1}},computed:{mobData:function(){return this.$root.mobData},shareURL:function(){var t=this.$root.wEl.location.origin;return this.mobData.isReportContent?"".concat(t).concat(this.$root.publicPath,"report").concat(this.mobData.currentReportId):t}},methods:{moveBack:function(){this.mobData.isMovingBack=!0,this.mobData.isTransition=!0},handleFadeInAfter:function(){if(this.mobData.isMovingBack)return this.mobData.isReportContent=!1,this.mobData.isMovingBack=!1,void(this.$root.isPopState?this.$root.isPopState=!1:history.pushState({place:"home"},"",this.$root.publicPath));this.mobData.isShowingRelatedReport?this.mobData.currentReportId=this.mobData.relatedReportId:this.mobData.isReportContent=!0;var t=this.mobData.currentReportId;this.$root.isPopState?this.$root.isPopState=!1:history.pushState({place:"report",id:t},"","".concat(this.$root.publicPath,"report").concat(t))},handlePopState:function(t){this.$root.isPopState=!0;var e=t.state;if(e&&"home"!==e.place){var o=e.id,r=this.mobData.isReportContent?"related":"home";document.getElementById("".concat(r,"ReportBtn").concat(o)).click()}else this.moveBack()}},beforeDestroy:function(){this.$root.wEl.removeEventListener("popstate",this.handlePopState)}},E=P,B=(o("b68b"),Object(p["a"])(E,r,a,!1,null,null,null));e["default"]=B.exports}}]);
//# sourceMappingURL=chunk-15b885f7-legacy.49b889d1.js.map