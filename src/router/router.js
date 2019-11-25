/*
 * @Author: your name
 * @Date: 2019-11-03 14:26:06
 * @LastEditTime: 2019-11-25 13:40:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\src\router\router.js
 */
export default [{
    path: '/',
    redirect: {
      name: 'index'
    }
  },
  {
    path:'/index',
    name:'index',
    component: () => import('@/views/index'),
    meta:{
      title: '首页'
    }
  },
  {
    // 服务器错误页面
    path: '/error500',
    component: () => import('_c/error/500.vue'),
    meta: {
      title: '服务器错误'
    }
  },
  {
    // 无权限页面
    path: '/401',
    component: () => import('_c/error/401.vue'),
    meta: {
      title: '无权限'
    }
  },
  {
    // 服务器超时页面
    path: '/timeout',
    component: () => import('_c/error/timeout.vue'),
    meta: {
      title: '网络连接失败'
    }
  }
]