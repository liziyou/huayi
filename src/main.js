import Vue from 'vue'
import App from './App'
import { router } from './router'
import { Lazyload } from 'vant'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.use(Lazyload) // 指令
import store from './store/index'
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App)
})
