/*
 * @Author: your name
 * @Date: 2019-09-26 22:04:13
 * @LastEditTime: 2019-11-25 11:28:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\util\axios\axios.js
 */
import axios from 'axios'
import { Message, redirectError , redirectTimeout } from '../util.js'
import codeConfig from './config.js'
export const baseURL = '/xxx/'
const http = axios.create({
  baseURL,
  timeout: 180000,
  headers: {
    'X-Requested-With':'XMLHttpRequest'
  }
})
// 请求前的钩子函数
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 请求后的钩子函数
http.interceptors.response.use(function (res) {
  return codeConfig(res.data).catch((msg) => {
    Message(msg)
  })
}, function (error) {
  if(String(error).indexOf('timeout') > -1) {
    redirectTimeout()
  }
  else if (error.response && error.response.status === 401) {
      window.location = error.response.data
  }
  else{
    redirectError()
  }
  return Promise.reject(error);
})

export default http