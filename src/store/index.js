/*
 * @Author: your name
 * @Date: 2019-09-26 22:04:13
 * @LastEditTime: 2019-11-25 11:35:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\store\index.js
 */
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    modalArray: [],
  },
  mutations:{
    // 添加Modal彈窗
    addPropArry(state, vm) {
      state.modalArray.push(vm)
    },
    deletePropArry(state) {
      state.modalArray.pop().close()
    }
  }
})