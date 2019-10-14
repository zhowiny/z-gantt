import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview/dist/iview'
import 'iview/dist/styles/iview.css'

import Gantt from '../packages/gantt'

Vue.use(iView)
Vue.use(Gantt)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
