/*
 * @Author: your name
 * @Date: 2019-09-17 12:35:45
 * @LastEditTime: 2019-11-25 11:29:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\util\index.js
 */
// 工具类注册
import axios from './axios'
import popUp from '_c/popUp'
import { Toast } from 'vant'
import { loading} from './util.js'
const Utils = {
  $axios: axios,
  $Modal: popUp,
  $Toast: Toast,
  $loading:loading
}
const util = {
  install(Vue) {
    for (let i in Utils) {
      Vue.prototype[i] = Utils[i]
    }
  }
}
export default util