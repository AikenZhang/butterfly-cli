export default {
  name:'popUpRender',
  props:{
    options:{
      type:Object,
      default () {
        return {}
      }
    },
    renderFun:{
      type:Function
    }
  },
  render (h) {
    if (Object.prototype.toString.call(this.renderFun) === '[object Function]') {
      return this.renderFun(h,this.options)
    }
  }
}