// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index.js'
import axios from 'axios'
import common from './assets/public/js/common.js'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$common = common
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
