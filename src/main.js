import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/font/iconfont.css'
// 导入全局样式
import './assets/css/global.css'
// 导入表格树
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入接口
import CONST from './assets/MAIN_CONST.js';

import axios from 'axios'
console.log(CONST.BASE_URL);

Vue.prototype.BASE_URL = CONST.BASE_URL;

Vue.prototype.$http = CONST.BASE_URL;

// 配置请求的根路径
// axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/'
axios.defaults.baseURL = CONST.BASE_URL;

// axios.defaults.headers.Authorization = window.sessionStorage.getItem('token');

axios.interceptors.request.use(config => {
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
})

Vue.prototype.$http = axios;
// import axios from 'axios'
// axios.defaults.headers['Authorization'] = 'application/json'
// axios.defaults.baseURL = 'https://efile.iclass365.com/auth'

Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
// 全局注册富文本
Vue.use(VueQuillEditor)
// 全局时间过滤器
Vue.filter('dataFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
