import popUp from './modal.vue'
import Vue from 'vue'
import store from '@/store'
const PopUp = (options = {}) => {
  let vm = null
  let ios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  // let vmId = String(new Date().getTime())
  return {
    show() {
      let Instance = Vue.extend(popUp)
      vm = new Instance()
      console.log(options)
      for (let i in options) {
        vm[i] = options[i]
      }
      let el = vm.$mount().$el
      document.body.appendChild(el)
      vm.show()
      // 解决兼容问题
      //console.log('ios',ios)
      // if (ios && store.state.modalArray.length < 1) {
      //   window.history.pushState(null, null, '')
      // }
      // if (!ios) {
      //   window.history.pushState(null, null, '')
      // }
      window.history.pushState(null, null, '')
      store.commit('addPropArry', vm)
      return this
    },
    close() {
      // window.history.popState()
      // 解决苹果兼容性问题
      store.commit('deletePropArry')
      // if (ios && store.state.modalArray.length > 1) {
      //   store.commit('deletePropArry')
      // } else {
      //   window.history.go(-1)
      // }
    }
  }
}
export default PopUp
