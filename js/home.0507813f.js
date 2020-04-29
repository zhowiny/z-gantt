(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{5222:function(e,t,a){"use strict";var n=a("6d58"),r=a.n(n);r.a},"6d58":function(e,t,a){},"73f4":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"form"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{type:"radio",id:"hour",value:"hour"},domProps:{checked:e._q(e.type,"hour")},on:{change:function(t){e.type="hour"}}}),a("label",{attrs:{for:"hour"}},[e._v("hour")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{type:"radio",id:"day",value:"day"},domProps:{checked:e._q(e.type,"day")},on:{change:function(t){e.type="day"}}}),a("label",{attrs:{for:"day"}},[e._v("day")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{type:"radio",id:"month",value:"month"},domProps:{checked:e._q(e.type,"month")},on:{change:function(t){e.type="month"}}}),a("label",{attrs:{for:"month"}},[e._v("month")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{type:"radio",id:"year",value:"year"},domProps:{checked:e._q(e.type,"year")},on:{change:function(t){e.type="year"}}}),a("label",{attrs:{for:"year"}},[e._v("year")]),a("span",[e._v("当前类型: "+e._s(e.type))])]),a("div",{staticClass:"form"},[e._v("\n      隐藏假期： "),a("i-switch",{staticStyle:{"margin-right":"20px"},model:{value:e.hideHoliday,callback:function(t){e.hideHoliday=t},expression:"hideHoliday"}}),e._v("\n\n      最多显示多少天"+e._s(e.max)+": "),a("Slider",{staticStyle:{"margin-right":"20px","margin-left":"10px",width:"200px"},attrs:{min:5,max:60,step:5},model:{value:e.max,callback:function(t){e.max=t},expression:"max"}})],1),a("div",{staticClass:"form"},[e._v("\n      单元格宽度"+e._s(e.cellWidth)+":     "),a("Slider",{staticStyle:{"margin-right":"20px","margin-left":"10px",width:"200px"},attrs:{min:50,max:200,step:10},model:{value:e.cellWidth,callback:function(t){e.cellWidth=t},expression:"cellWidth"}}),e._v("\n      单元格高度"+e._s(e.cellHeight)+":     "),a("Slider",{staticStyle:{"margin-right":"20px","margin-left":"10px",width:"200px"},attrs:{min:30,max:80,step:5},model:{value:e.cellHeight,callback:function(t){e.cellHeight=t},expression:"cellHeight"}})],1),a("div",{staticClass:"form"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.theme,expression:"theme"}],attrs:{type:"radio",id:"blue",value:"blue"},domProps:{checked:e._q(e.theme,"blue")},on:{change:function(t){e.theme="blue"}}}),a("label",{attrs:{for:"blue"}},[e._v("blue")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.theme,expression:"theme"}],attrs:{type:"radio",id:"yellow",value:"yellow"},domProps:{checked:e._q(e.theme,"yellow")},on:{change:function(t){e.theme="yellow"}}}),a("label",{attrs:{for:"yellow"}},[e._v("yellow")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.theme,expression:"theme"}],attrs:{type:"radio",id:"green",value:"green"},domProps:{checked:e._q(e.theme,"green")},on:{change:function(t){e.theme="green"}}}),a("label",{attrs:{for:"green"}},[e._v("green")]),a("span",{staticStyle:{"margin-right":"20px"}},[e._v("当前主题色: "+e._s(e.theme))]),e._v("\n      ghost： "),a("i-switch",{staticStyle:{"margin-right":"20px"},model:{value:e.ghost,callback:function(t){e.ghost=t},expression:"ghost"}}),e._v("\n      showDesc： "),a("i-switch",{staticStyle:{"margin-right":"20px"},model:{value:e.showDesc,callback:function(t){e.showDesc=t},expression:"showDesc"}}),e._v("\n      merge： "),a("i-switch",{staticStyle:{"margin-right":"20px"},model:{value:e.merge,callback:function(t){e.merge=t},expression:"merge"}})],1),a("div",{staticClass:"form"},[a("Button",{attrs:{type:"primary"},on:{click:function(t){e.start=e.dayjs(e.start).subtract(5,"day").format("YYYY-MM-DD")}}},[e._v("上一页")]),a("Button",{attrs:{type:"primary"},on:{click:function(t){e.start=e.dayjs(e.start).add(5,"day").format("YYYY-MM-DD")}}},[e._v("下一页")]),a("RadioGroup",{staticClass:"tabs",staticStyle:{"margin-left":"20px"},attrs:{type:"button"},model:{value:e.chart,callback:function(t){e.chart=t},expression:"chart"}},[a("Radio",{attrs:{label:1}},[e._v("按项目")]),a("Radio",{attrs:{label:2}},[e._v("按人员")])],1)],1),a("gantt",{directives:[{name:"show",rawName:"v-show",value:1===e.chart,expression:"chart === 1"}],attrs:{"show-tree":"",type:e.type,data:e.data,theme:e.theme,start:e.start,"hide-holiday":e.hideHoliday,loading:e.loading,max:e.max,cellWidth:e.cellWidth,cellHeight:e.cellHeight,ghost:e.ghost,"show-desc":e.showDesc,merge:e.merge,"is-holiday":e.isHoliday},on:{change:e.refresh},scopedSlots:e._u([{key:"tooltip",fn:function(t){var n=t.row,r=t.cell;return a("div",{},[a("p",[e._v("迭代名："+e._s(n.name))]),a("p",[e._v("迭代开始日期："+e._s(n.start_date))]),a("p",[e._v("迭代结束日期："+e._s(n.end_date))]),a("p",[e._v("项目名："+e._s(n.workspace_name))]),a("p",[e._v("阶段："+e._s(r.stage))]),a("p",[e._v("开始日期："+e._s(r.start))]),a("p",[e._v("结束日期："+e._s(r.end))])])}}])}),a("gantt",{directives:[{name:"show",rawName:"v-show",value:2===e.chart,expression:"chart === 2"}],attrs:{type:e.type,data:e.peopleData,theme:e.theme,start:e.start,"hide-holiday":e.hideHoliday,loading:e.loading,max:e.max,cellWidth:e.cellWidth,cellHeight:e.cellHeight,ghost:e.ghost,"show-desc":e.showDesc,merge:e.merge,colors:e.colors},on:{change:e.refresh},scopedSlots:e._u([{key:"aside-row",fn:function(t){var n=t.row;return a("div",{staticStyle:{padding:"10px"}},[e._v("\n        "+e._s(n.name)+"--"+e._s(n.department)+"\n      ")])}},{key:"desc",fn:function(t){t.row;var n=t.cell;return a("span",{},[e._v("\n        "+e._s(n.workspace_name)+"-"+e._s(n.name)+"-"+e._s(n.iteration_progress_exp)+"\n      ")])}},{key:"tooltip",fn:function(t){var n=t.row,r=t.cell,s=t.date;return a("div",{},[a("p",[e._v(e._s(s.localString))]),a("p",[e._v("姓名："+e._s(n.name))]),a("p",[e._v("项目名："+e._s(r.workspace_name))]),a("p",[e._v("迭代名："+e._s(r.name))]),a("p",[e._v("开始日期："+e._s(r.start))]),a("p",[e._v("结束日期："+e._s(r.end))]),a("p",[e._v("迭代进度："+e._s(r.iteration_progress_exp))]),a("p",[e._v("迭代状态："+e._s(r.iteration_type_exp))])])}}])})],1)},r=[],s=(a("6762"),a("2fdb"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{class:e.wrapClasses,style:e.wrapStyles,attrs:{tabindex:"0"},on:{click:e.toggle,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"space",32,t.key,[" ","Spacebar"])?null:e.toggle(t)}}},[a("input",{attrs:{type:"hidden",name:e.name},domProps:{value:e.currentValue}}),a("span",{class:e.innerClasses},[e.currentValue===e.trueValue?e._t("open"):e._e(),e.currentValue===e.falseValue?e._t("close"):e._e()],2)])}),o=[],i=a("bd86"),l=(a("c5f6"),a("2b0e"));const c=l["default"].prototype.$isServer;function d(e,t){for(let a=0;a<t.length;a++)if(e===t[a])return!0;return!1}!c&&(window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver);function h(e,t,a){this.$children.forEach(n=>{const r=n.$options.name;r===e?n.$emit.apply(n,[t].concat(a)):h.apply(n,[e,t].concat([a]))})}var u={methods:{dispatch(e,t,a){let n=this.$parent||this.$root,r=n.$options.name;while(n&&(!r||r!==e))n=n.$parent,n&&(r=n.$options.name);n&&n.$emit.apply(n,[t].concat(a))},broadcast(e,t,a){h.call(this,e,t,a)}}},p="ivu-switch",m={name:"iSwitch",mixins:[u],props:{value:{type:[String,Number,Boolean],default:!1},trueValue:{type:[String,Number,Boolean],default:!0},falseValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:!1},size:{validator:function(e){return d(e,["large","small","default"])},default:function(){return this.$IVIEW&&""!==this.$IVIEW.size?this.$IVIEW.size:"default"}},name:{type:String},loading:{type:Boolean,default:!1},trueColor:{type:String},falseColor:{type:String},beforeChange:Function},data:function(){return{currentValue:this.value}},computed:{wrapClasses:function(){var e;return["".concat(p),(e={},Object(i["a"])(e,"".concat(p,"-checked"),this.currentValue===this.trueValue),Object(i["a"])(e,"".concat(p,"-disabled"),this.disabled),Object(i["a"])(e,"".concat(p,"-").concat(this.size),!!this.size),Object(i["a"])(e,"".concat(p,"-loading"),this.loading),e)]},wrapStyles:function(){var e={};return this.trueColor&&this.currentValue===this.trueValue?(e["border-color"]=this.trueColor,e["background-color"]=this.trueColor):this.falseColor&&this.currentValue===this.falseValue&&(e["border-color"]=this.falseColor,e["background-color"]=this.falseColor),e},innerClasses:function(){return"".concat(p,"-inner")}},methods:{handleToggle:function(){var e=this.currentValue===this.trueValue?this.falseValue:this.trueValue;this.currentValue=e,this.$emit("input",e),this.$emit("on-change",e),this.dispatch("FormItem","on-form-change",e)},toggle:function(e){var t=this;if(e.preventDefault(),this.disabled||this.loading)return!1;if(!this.beforeChange)return this.handleToggle();var a=this.beforeChange();a&&a.then?a.then((function(){t.handleToggle()})):this.handleToggle()}},watch:{value:function(e){if(e!==this.trueValue&&e!==this.falseValue)throw"Value should be trueValue or falseValue.";this.currentValue=e}}},v=m,g=a("2877"),f=Object(g["a"])(v,s,o,!1,null,null,null),y=f.exports,_=y,w=a("5a0c"),b=a.n(w),x={name:"home",components:{"i-switch":_},data:function(){return{hideHoliday:!1,type:"day",theme:"blue",ghost:!1,max:20,cellWidth:80,cellHeight:30,start:"2019-10-01",loading:!1,data:[],peopleData:[],showDesc:!1,merge:!1,chart:1,colors:["#EF7F79","#F2A077","#F7C177","#FAD678","#FEF47D","#DAEF77","#A6DB74","#7ED8D2","#7BBFF9","#89A6F8","#AA84E4","#F08DBE"]}},created:function(){},methods:{dayjs:b.a,loadData:function(){var e=this;this.loading=!0,setTimeout((function(){e.data.push({data:[{start:"2019-09-12",end:"2019-09-23",msg:"第一阶段"},{start:"2019-09-20",end:"2019-09-21",msg:"第二阶段"},{start:"2019-09-21",end:"2019-09-24",msg:"第三阶段"},{start:"2019-9-18",end:"2019-9-21",msg:"第四阶段"}],parent:1,id:~~(10*Math.random()+15),name:"A"}),e.loading=!1}),1e3)},refresh:function(){},isHoliday:function(e){return[1,2,4].includes(e.day())}}},k=x,V=(a("5222"),Object(g["a"])(k,n,r,!1,null,"4d59fa04",null));t["default"]=V.exports}}]);
//# sourceMappingURL=home.0507813f.js.map