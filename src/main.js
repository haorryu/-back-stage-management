// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由 +挂载vue
import router from './router/router.js'

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import './assets/common.css'
import Axios from 'axios'

// 解决axios的三个问题
// 1: 基准路径
Axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 解决每次使用都要引用axios
Axios.prototype.$axios = Axios
// 请求拦截器
Axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 使用use安装一下
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
