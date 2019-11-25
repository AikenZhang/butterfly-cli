import popUp from './popUp.vue'
import Vue from 'vue'
const PopUp = (options ={}) =>{
  let Instance = Vue.extend(popUp)
  let vm = new Instance()
  for (let i in options){
    vm[i]=options[i]
  }
  let el = vm.$mount().$el
  document.body.appendChild(el)
  return vm
}
export default PopUp