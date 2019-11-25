import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.js'
import {
  loading
} from '@/util/util.js'
Vue.use(Router)
const router = new Router({
  routes
})
router.afterEach((to, from) => {
  loading().clear()
  let meta = to.meta
  if (meta && meta.title) {
    window.document.title = meta.title
  }
})
export default router