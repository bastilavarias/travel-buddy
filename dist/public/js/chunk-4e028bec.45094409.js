(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e028bec","chunk-5401af03"],{"0bc6":function(t,e,i){},"2a7f":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var s=i("71d9"),n=i("80d2"),a=Object(n["i"])("v-toolbar__title"),o=Object(n["i"])("v-toolbar__items");s["a"]},"2fa4":function(t,e,i){"use strict";i("20f6");var s=i("80d2");e["a"]=Object(s["i"])("spacer","div","v-spacer")},"36a7":function(t,e,i){},"3a2f":function(t,e,i){"use strict";i("a9e3");var s=i("ade3"),n=(i("9734"),i("4ad4")),a=i("a9ad"),o=i("16b7"),r=i("b848"),c=i("75eb"),l=i("f573"),h=i("f2e7"),d=i("80d2"),u=i("d9bd"),p=i("58df");e["a"]=Object(p["a"])(a["a"],o["a"],r["a"],c["a"],l["a"],h["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,i=t.content,s=!this.bottom&&!this.left&&!this.top&&!this.right,n=!1!==this.attach?e.offsetLeft:e.left,a=0;return this.top||this.bottom||s?a=n+e.width/2-i.width/2:(this.left||this.right)&&(a=n+(this.right?e.width:-i.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(a,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,i=t.content,s=!1!==this.attach?e.offsetTop:e.top,n=0;return this.top||this.bottom?n=s+(this.bottom?e.height:-i.height)+(this.bottom?10:-10):(this.left||this.right)&&(n=s+e.height/2-i.height/2),this.nudgeTop&&(n-=parseInt(this.nudgeTop)),this.nudgeBottom&&(n+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(n+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(d["g"])(this.maxWidth),minWidth:Object(d["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(d["t"])(this,"activator",!0)&&Object(u["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=n["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===d["y"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(s["a"])(t,this.contentClass,!0),Object(s["a"])(t,"menuable__content__active",this.isActive),Object(s["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));var s=i("fe6c"),n=i("58df");function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(n["a"])(Object(s["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"40dc":function(t,e,i){"use strict";i("a9e3"),i("b680"),i("c7cd");var s=i("5530"),n=(i("8b0d"),i("71d9")),a=i("53ca");function o(t,e){var i=e.modifiers||{},s=i.self,n=void 0!==s&&s,o=e.value,r="object"===Object(a["a"])(o)&&o.options||{passive:!0},c="function"===typeof o||"handleEvent"in o?o:o.handler,l=n?t:e.arg?document.querySelector(e.arg):window;l&&(l.addEventListener("scroll",c,r),t._onScroll={handler:c,options:r,target:n?void 0:l})}function r(t){if(t._onScroll){var e=t._onScroll,i=e.handler,s=e.options,n=e.target,a=void 0===n?t:n;a.removeEventListener("scroll",i,s),delete t._onScroll}}var c={inserted:o,unbind:r},l=c,h=i("3a66"),d=i("d9bd"),u=i("2b0e"),p=u["a"].extend({name:"scrollable",directives:{Scroll:c},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(d["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}}),v=i("d10f"),f=i("f2e7"),m=i("80d2"),g=i("58df"),b=Object(g["a"])(n["a"],p,v["a"],f["a"],Object(h["a"])("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"]));e["a"]=b.extend({name:"v-app-bar",directives:{Scroll:l},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return p.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(s["a"])(Object(s["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},computedContentHeight:function(){if(!this.shrinkOnScroll)return n["a"].options.computed.computedContentHeight.call(this);var t=this.computedOriginalHeight,e=this.dense?48:56,i=t,s=i-e,a=s/this.computedScrollThreshold,o=this.currentScroll*a;return Math.max(e,i-o)},computedFontSize:function(){if(this.isProminent){var t=this.dense?96:128,e=t-this.computedContentHeight,i=.00347;return Number((1.5-e*i).toFixed(2))}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll){var t=Math.max((this.computedScrollThreshold-this.currentScroll)/this.computedScrollThreshold,0);return Number(parseFloat(t).toFixed(2))}},computedOriginalHeight:function(){var t=n["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:n["a"].options.computed.isCollapsed.call(this)},isProminent:function(){return n["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(s["a"])(Object(s["a"])({},n["a"].options.computed.styles.call(this)),{},{fontSize:Object(m["g"])(this.computedFontSize,"rem"),marginTop:Object(m["g"])(this.computedMarginTop),transform:"translateY(".concat(Object(m["g"])(this.computedTransform),")"),left:Object(m["g"])(this.computedLeft),right:Object(m["g"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=n["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render:function(t){var e=n["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}})},"5e23":function(t,e,i){},"606c":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("footer",{staticClass:"secondary"},[i("v-container",[i("div",{staticClass:"white--text"},[i("div",{staticClass:"pt-2 text-center"},[i("p",{staticClass:"caption"},[t._v(" lorem ipsum dolor sit amet, consectetur adipisicing elit. eligendi, quisquam. ")])]),i("v-divider",{attrs:{dark:""}}),i("div",{staticClass:"py-5"},[i("div",{staticClass:"d-flex align-center justify-space-between"},[i("v-list",{attrs:{dark:"",color:"transparent"}},[i("v-subheader",[t._v("company")]),t._l(5,(function(e){return[i("v-list-item",{key:e,staticClass:"subtitle-2"},[t._v("link "+t._s(e))])]}))],2),i("v-list",{attrs:{dark:"",color:"transparent"}},[i("v-subheader",[t._v("resources")]),t._l(5,(function(e){return[i("v-list-item",{key:e,staticClass:"subtitle-2"},[t._v("link "+t._s(e))])]}))],2),i("v-list",{attrs:{dark:"",color:"transparent"}},[i("v-subheader",[t._v("advertisement")]),t._l(5,(function(e){return[i("v-list-item",{key:e,staticClass:"subtitle-2"},[t._v("link "+t._s(e))])]}))],2)],1)]),i("v-divider",{attrs:{dark:""}}),i("div",{staticClass:"py-3"},[i("div",{staticClass:"d-flex align-content-center align-center"},[i("span",{staticClass:"caption mr-5"},[t._v("follow us")]),t._l(5,(function(e){return[i("v-btn",{key:e,staticClass:"mr-2",attrs:{"x-small":"",fab:"",color:"primary"}},[i("v-icon",[t._v("mdi-facebook")])],1)]}))],2)]),i("v-divider",{attrs:{dark:""}}),i("div",{staticClass:"py-5 text-center"},[i("span",{staticClass:"caption"},[t._v(" © 2020 Travel Buddy® ")])])],1)])],1)},n=[],a={name:"generic-basic-footer"},o=a,r=i("2877"),c=i("6544"),l=i.n(c),h=i("8336"),d=i("a523"),u=i("ce7e"),p=i("132d"),v=i("8860"),f=i("da13"),m=i("e0c7"),g=Object(r["a"])(o,s,n,!1,null,null,null);e["a"]=g.exports;l()(g,{VBtn:h["a"],VContainer:d["a"],VDivider:u["a"],VIcon:p["a"],VList:v["a"],VListItem:f["a"],VSubheader:m["a"]})},"71d9":function(t,e,i){"use strict";i("0481"),i("4160"),i("4069"),i("a9e3");var s=i("3835"),n=i("5530"),a=(i("5e23"),i("8dd9")),o=i("adda"),r=i("80d2"),c=i("d9bd");e["a"]=a["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(n["a"])(Object(n["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(n["a"])(Object(n["a"])({},this.measurableStyles),{},{height:Object(r["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var i=Object(s["a"])(e,2),n=i[0],a=i[1];t.$attrs.hasOwnProperty(n)&&Object(c["a"])(n,a,t)}))},methods:{genBackground:function(){var t={height:Object(r["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(o["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(r["g"])(this.computedContentHeight)}},Object(r["s"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(r["g"])(this.extensionHeight)}},Object(r["s"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}})},7496:function(t,e,i){"use strict";var s=i("5530"),n=(i("df86"),i("7560")),a=i("58df");e["a"]=Object(a["a"])(n["a"]).extend({name:"v-app",props:{dark:{type:Boolean,default:void 0},id:{type:String,default:"app"},light:{type:Boolean,default:void 0}},computed:{isDark:function(){return this.$vuetify.theme.dark}},beforeCreate:function(){if(!this.$vuetify||this.$vuetify===this.$root)throw new Error("Vuetify is not properly initialized, see https://vuetifyjs.com/getting-started/quick-start#bootstrapping-the-vuetify-object")},render:function(t){var e=t("div",{staticClass:"v-application--wrap"},this.$slots.default);return t("div",{staticClass:"v-application",class:Object(s["a"])({"v-application--is-rtl":this.$vuetify.rtl,"v-application--is-ltr":!this.$vuetify.rtl},this.themeClasses),attrs:{"data-app":!0},domProps:{id:this.id}},[e])}})},"8b0d":function(t,e,i){},"8ce9":function(t,e,i){},"8e31":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",{style:{backgroundColor:"#ECEFF3"}},[i("v-app-bar",{staticStyle:{"z-index":"5"},attrs:{app:"",color:"secondary",fixed:"",dark:""}},[i("v-toolbar-title",{staticClass:"mr-5"},[i("custom-router-link",{attrs:{to:{name:"feed-page"}}},[i("span",{staticClass:"font-weight-bold white--text"},[t._v(" Travel "),i("span",{staticClass:"primary--text"},[t._v("Buddy")])])])],1),i("v-text-field",{attrs:{"hide-details":"","single-line":"",label:"Search",rounded:"",dense:"",filled:"","append-icon":"mdi-magnify"}}),i("v-spacer"),i("main-layout-toolbar-account-button-menu")],1),i("v-main",[i("router-view"),i("generic-basic-footer")],1)],1)},n=[],a=i("91be"),o=i("ba4f"),r=i("606c"),c={name:"main-layout",components:{GenericBasicFooter:r["a"],MainLayoutToolbarAccountButtonMenu:o["a"],CustomRouterLink:a["a"]}},l=c,h=i("2877"),d=i("6544"),u=i.n(d),p=i("7496"),v=i("40dc"),f=i("f6c4"),m=i("2fa4"),g=i("8654"),b=i("2a7f"),S=Object(h["a"])(l,s,n,!1,null,null,null);e["default"]=S.exports;u()(S,{VApp:p["a"],VAppBar:v["a"],VMain:f["a"],VSpacer:m["a"],VTextField:g["a"],VToolbarTitle:b["a"]})},"8efc":function(t,e,i){},"91be":function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("router-link",{style:{textDecoration:"none"},attrs:{to:t.to}},[t._t("default")],2)},n=[],a={name:"custom-router-link",props:{to:{type:Object,required:!0}}},o=a,r=i("2877"),c=Object(r["a"])(o,s,n,!1,null,null,null);e["a"]=c.exports},9734:function(t,e,i){},adda:function(t,e,i){"use strict";i("a15b"),i("a9e3");var s=i("53ca"),n=(i("8efc"),i("90a2")),a=(i("36a7"),i("24b2")),o=i("58df"),r=Object(o["a"])(a["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),c=r,l=i("7560"),h=i("d9f7"),d=i("d9bd"),u="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=Object(o["a"])(c,l["a"]).extend({name:"v-img",directives:{intersect:n["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0,hasError:!1}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return this.src&&"object"===Object(s["a"])(this.src)?{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}:{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}},__cachedImage:function(){if(!(this.normalisedSrc.src||this.normalisedSrc.lazySrc||this.gradient))return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!u||i||this.eager){if(this.normalisedSrc.lazySrc){var s=new Image;s.src=this.normalisedSrc.lazySrc,this.pollForSize(s,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){this.hasError=!0,this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(d["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,this.hasError=!1,e.src=this.normalisedSrc.src,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,s=function s(){var n=t.naturalHeight,a=t.naturalWidth;n||a?(e.naturalWidth=a,e.calculatedAspectRatio=a/n):null!=i&&!e.hasError&&setTimeout(s,i)};s()},genContent:function(){var t=c.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=c.options.render.call(this,t),i=Object(h["a"])(e.data,{staticClass:"v-image",attrs:{"aria-label":this.alt,role:this.alt?"img":void 0},class:this.themeClasses,directives:u?[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]:void 0});return e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,i,e.children)}})},ba4f:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[i("v-btn",t._g(t._b({class:t.buttonClassName,attrs:{color:"transparent",depressed:""}},"v-btn",n,!1),Object.assign({},a,s)),[i("v-avatar",{staticClass:"mr-2",attrs:{size:30}},[i("v-img",{attrs:{src:"https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg","lazy-src":"https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"}})],1),i("span",{staticClass:"text-capitalize mr-1"},[t._v("Cardo D.")]),i("v-icon",{attrs:{small:""}},[t._v("mdi-menu-down")])],1)]}}],null,!0)},[i("span",[t._v("Profile")])])]}}])},[i("v-card",[i("v-list",{attrs:{flat:""}},[i("v-list-item",{attrs:{"two-line":""}},[i("v-list-item-avatar",{attrs:{size:50}},[i("v-img",{attrs:{src:"https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg","lazy-src":"https://images.generated.photos/0kaPE29NyIpDnse_CZlvGFct1V_GbYwneRYswJJ9kzE/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyNTA0NTguanBn.jpg"}})],1),i("v-list-item-content",[i("v-list-item-title",[i("span",{staticClass:"font-weight-bold secondary--text"},[t._v("Cardo D.")])]),i("v-list-item-subtitle",[i("span",{staticClass:"secondary--text"},[t._v("See Profile")])])],1)],1)],1),i("v-divider"),t._l(t.actions,(function(e,s){return[i("v-list-item",{key:s,attrs:{to:e.to,"exact-active-class":"secondary--text",exact:""}},[i("v-list-item-title",{staticClass:"font-weight-bold"},[t._v(t._s(e.title))]),i("v-list-item-action-text",[i("v-icon",{attrs:{color:"secondary"}},[t._v(t._s(e.icon))])],1)],1)]}))],2)],1)},n=[],a={name:"main-layout-toolbar-account-button-menu",props:{buttonClassName:{type:String,required:!1}},data:function(){return{actions:[{title:"Administrator Panel",icon:"mdi-view-dashboard-outline",to:{name:"booking-management-page/table"}},{title:"Tour Guide Panel",icon:"mdi-view-dashboard-outline",to:{name:"tour-guide-personal-bookings-page/table"}},{title:"Sign Out",icon:"mdi-logout",to:{name:"home-page"}}]}}},o=a,r=i("2877"),c=i("6544"),l=i.n(c),h=i("8212"),d=i("8336"),u=i("b0af"),p=i("ce7e"),v=i("132d"),f=i("adda"),m=i("8860"),g=i("da13"),b=i("5d23"),S=i("8270"),y=i("e449"),_=i("3a2f"),O=Object(r["a"])(o,s,n,!1,null,null,null);e["a"]=O.exports;l()(O,{VAvatar:h["a"],VBtn:d["a"],VCard:u["a"],VDivider:p["a"],VIcon:v["a"],VImg:f["a"],VList:m["a"],VListItem:g["a"],VListItemActionText:b["a"],VListItemAvatar:S["a"],VListItemContent:b["b"],VListItemSubtitle:b["c"],VListItemTitle:b["d"],VMenu:y["a"],VTooltip:_["a"]})},bd0c:function(t,e,i){},ce7e:function(t,e,i){"use strict";var s=i("5530"),n=(i("8ce9"),i("7560"));e["a"]=n["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(s["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(s["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})},d10f:function(t,e,i){"use strict";var s=i("2b0e");e["a"]=s["a"].extend({name:"ssr-bootable",data:function(){return{isBooted:!1}},mounted:function(){var t=this;window.requestAnimationFrame((function(){t.$el.setAttribute("data-booted","true"),t.isBooted=!0}))}})},df86:function(t,e,i){},e0c7:function(t,e,i){"use strict";var s=i("5530"),n=(i("0bc6"),i("7560")),a=i("58df");e["a"]=Object(a["a"])(n["a"]).extend({name:"v-subheader",props:{inset:Boolean},render:function(t){return t("div",{staticClass:"v-subheader",class:Object(s["a"])({"v-subheader--inset":this.inset},this.themeClasses),attrs:this.$attrs,on:this.$listeners},this.$slots.default)}})},f6c4:function(t,e,i){"use strict";i("bd0c");var s=i("d10f");e["a"]=s["a"].extend({name:"v-main",props:{tag:{type:String,default:"main"}},computed:{styles:function(){var t=this.$vuetify.application,e=t.bar,i=t.top,s=t.right,n=t.footer,a=t.insetFooter,o=t.bottom,r=t.left;return{paddingTop:"".concat(i+e,"px"),paddingRight:"".concat(s,"px"),paddingBottom:"".concat(n+a+o,"px"),paddingLeft:"".concat(r,"px")}}},render:function(t){var e={staticClass:"v-main",style:this.styles,ref:"main"};return t(this.tag,e,[t("div",{staticClass:"v-main__wrap"},this.$slots.default)])}})}}]);
//# sourceMappingURL=chunk-4e028bec.45094409.js.map