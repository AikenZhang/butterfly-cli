/*
 * @Author: your name
 * @Date: 2019-09-26 22:04:08
 * @LastEditTime: 2019-11-25 11:38:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \bqs-app\mockServer\controller\inquiries\controller.js
 */
const {
  Controller,
  Post,
  Get,
  Log
} = require('../BaseController.js')
const {
  Result
} = require('../../common/Result.js')
const {
  amount
} = require('../../mock/mock.js')
@Controller('/inquiries')
export class UserController {
  @Get('/xxx')
  @Log
  async login(ctx, next) {
    ctx.body = new Result({
      result: amount
    })
  }
}