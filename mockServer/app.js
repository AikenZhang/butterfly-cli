require('babel-core/register')()
require('babel-polyfill')
const bodyParser = require('koa-bodyparser')
const Koa = require('koa')
const {
    resolve
} = require('path')
const {
    BaseController
} = require('./controller/BaseController.js')
//启动监听
const app = new Koa()
//添加body 解析
app.use(bodyParser())
const apiPath = resolve(__dirname, './controller')
const route = new BaseController(app, apiPath)
route.init()
app.listen(8081)
console.log('starting in listen 8081')