import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入全局样式

import './assets/css/global.css'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'

// axios.defaults.headers.Authorization = window.sessionStorage.getItem('token');

axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

Vue.prototype.$http = axios;
// import axios from 'axios'
// axios.defaults.headers['Authorization'] = 'application/json'
// axios.defaults.baseURL = 'https://efile.iclass365.com/auth'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
