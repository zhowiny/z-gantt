import gantt from './index.vue'

gantt.install = function (Vue) {
  Vue.component(gantt.name, gantt)
}

export default gantt
