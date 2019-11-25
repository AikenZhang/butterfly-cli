/*
 * @Author: your name
 * @Date: 2019-09-26 22:04:13
 * @LastEditTime: 2019-11-25 11:28:22
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\util\axios\config.js
 */
import router from '@/router'
import {
  Message,
  redirectError
} from '../util.js'
const codeConfig = (res) => {
  return new Promise((resolve, reject) => {
    switch (res.code) {
      case '200':
        if (res.result) {
          resolve(res.result)
        }
        break;
      case '4001': {
        router.push({
          path: '/401'
        })
      }
      break;
    default:
      redirectError()
      break;
    }
  })
}
export default codeConfig