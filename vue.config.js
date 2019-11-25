/*
 * @Author: your name
 * @Date: 2019-11-25 11:24:37
 * @LastEditTime: 2019-11-25 13:54:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\vue.config.js
 */
const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config  => {
    config.resolve.alias
    .set('@', resolve('./src'))
    .set('_c',resolve('./src/components'))
    .set('_img',resolve('./src/assets/img'))
    .set('echarts',resolve('./src/lib/echarts'))
  },
  css:{
    loaderOptions:{
      sass:{
        data:`@import '@/assets/css/config.scss';`
      },
      postcss:{
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      } 
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xxx.net',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}