import load from './loading.vue'
import Vue from 'vue'
let _loading = null
const loading = {
  show (con = {}) {
    let Instance = Vue.extend(load)
    let vm = new Instance()
    for (let i in con) {
      vm[i] = con[i]
    }
    _loading = vm.$mount().$el
    document.body.appendChild(_loading)
  },
  clear () {
    if(_loading && _loading.contains && document.body.contains(_loading)){
      document.body.removeChild(_loading)
      _loading = null
    } 
  }
}
export default loading