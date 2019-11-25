/*
 * @Author: your name
 * @Date: 2019-11-03 14:26:06
 * @LastEditTime: 2019-11-25 11:31:32
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { flexible } from '@/lib/flexible.js'
import vant from '@/lib/vant.js'
import util from '@/util'
import 'vant/lib/icon/local.css'
import '@/assets/css/base.scss'
import store from '@/store'
//import vCharts from 'v-charts'
//rem 适配
flexible(window, document)
Vue.config.productionTip = true
//工具类注册
Vue.use(util)
Vue.use(vant)
export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')