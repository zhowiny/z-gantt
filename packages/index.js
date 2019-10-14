import gantt from './gantt/index.vue'

const components = [
  gantt,
]

const install = Vue => {
  if (install.installed) return
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  window.gantt = gantt
}

export default gantt
