export default {
  name: 'popUpRender',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    render_fun: {
      type: Function
    }
  },
  render(h, context) {
    if (Object.prototype.toString.call(this.render_fun) === '[object Function]') {
      return this.render_fun(h, context)
    }
  },
  methods: {
    ok() {
      if (this.$children[0].ok) {
        return this.$children[0].ok()
      }
    },
    cancel() {
      if (this.$children[0].cancel) {
       return this.$children[0].cancel()
      }
    },
    refresh () {
      
    }
  }
}