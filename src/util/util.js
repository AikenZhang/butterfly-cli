import {Notify} from 'vant'
import router from '@/router'
import _loading from '_c/loading'
export const redirectError = () =>{
  loading().clear()
  router.push({
    path: '/error500'
  })
}
//跳转网络超时
export const redirectTimeout = () =>{
  loading().clear()
  router.push({
    path: '/timeout'
  })
}
export const loading = (con = {
  duration: 0,
  mask: true,
  message: '加载中...'
}) => {
  return {
    show() {
      _loading.show()
    },
    clear() {
      _loading.clear()
    }
  }
}

// notify
export const Message = (message, type = 'error') => {
  if (type === 'error') {
    Notify({
      message: message,
      duration: 2000,
      background: '#ff0000'
    })
  }else{
    Notify({
      message: message,
      duration: 2000,
      background: '#2ecc71'
    })
  }
}
// 时间format
export const dateFormat = (date,type) =>{
  let _date = new Date(date)
    if(type === 'string'){
      let year = _date.getFullYear()+'年';
      let month = _date.getMonth()+1+'月';
      let __date = _date.getDate()+'日';
      return year+month+__date
    }
    let o = { 
        "M+" : _date.getMonth()+1,                 //月份 
        "d+" : _date.getDate(),                    //日 
        "h+" : _date.getHours(),                   //小时 
        "m+" : _date.getMinutes(),                 //分 
        "s+" : _date.getSeconds(),                 //秒 
        "q+" : Math.floor((_date.getMonth()+3)/3), //季度 
        "S"  : _date.getMilliseconds()             //毫秒 
    }
    if(/(y+)/.test(type)) {
      type=type.replace(RegExp.$1, (_date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(type)){
          type = type.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return type
}
export const getTime = (type,time) =>{
  let _time = time
  let flag  = null
  return {
    pre () {
      if (type === 'day'){
         _time = time.subtract(1, 'month')
         return this
      }
      if ( type === 'month'){
        _time = time.subtract(1,'year')
        return this
      }
      if ( type === 'year'){
        _time = time.subtract(12,'year')
        flag = 'subtract'
        return this
      }
    },
    next () {
      if (type === 'day'){
        _time = time.add(1, 'month')
        return this
      }
      if ( type === 'month'){
        _time = time.add(1,'year')
        return this
      }
      if ( type === 'year'){
        _time = time.add(12,'year')
        flat = 'add'
        return this
      }
    },
    // 获取这个月的所有日期
    getDays () {
      let length = _time.daysInMonth()
      let month = _time.format('YYYYMM')
      let _arr = []
      for(let i = 1;i<=length;i++){
        if(i<10){
          _arr.push(`${month}0${i}`)
        }else{
          _arr.push(month+i)
        }
      }
      return _arr
    },
    // 获取这一年的月份
    getMonth () {
      let year = _time.format('YYYY')
      let _arr = []
      for(let i = 1;i<=12;i++){
        if(i<10){
          _arr.push(`${year}0${i}`)
        }else{
          _arr.push(year+i)
        }
      }
      return _arr
    },
    // 获取年份
    getYear () {
      let year = _time.format('YYYY')
      let _arr = []
      if (flag === 'subtract'){
        for(let i = 1;i<=12;i++){
          _arr.push(String(Number(year)+i))
        }
      }
      else if (flag === 'add'){
        for(let i = 12;i>=1;i--){
          _arr.push(String(Number(year)-i))
        }
      }
      else {
        for(let i = 1;i<=6;i++){
          _arr.push(String(Number(year)+i))
        }
        for(let i =0;i<5;i++){
          _arr.unshift(String(Number(year)-i))
        }
      }
      return _arr
    }
  }
}
// 深拷贝
export const deepClone = (obj) => {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  var objClone = Array.isArray(obj) ? [] : {};
  //进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone
}
// merge
export const merge = (target,source) =>{
  let _target = deepClone(target)
  let _source = deepClone(source)
  const _merge = (_target,_source) =>{
    if(Object.prototype.toString.call(_target) !== '[object Object]' || Object.prototype.toString.call(_source) !== '[object Object]'){
      return target
    }
    Object.keys(_source).forEach((i) =>{
      if(Object.prototype.toString.call(_target[i]) === '[object Object]' && Object.prototype.toString.call(_source[i]) === '[object Object]'){
        _merge(_target[i],_source[i])
      }else{
        _target[i] = _source[i]
      }
    })
  }
  _merge(_target,_source)
  return _target
}
// 水印 生成
export const waterMark = (text) =>{
  let _wm = document.createElement('canvas')
  _wm.setAttribute('width',200)
  _wm.setAttribute('height',200)
  let ctx = _wm.getContext('2d')
  ctx.fillStyle = '#eee'
  ctx.font= "13px 宋体"
  ctx.translate(60,50)
  ctx.rotate(-0.5)
  //ctx.fillRect()
  ctx.fillText(text,0,0)
  ctx.fillText(text,40,100)
  return _wm.toDataURL()
}
// 千位符
export const formatMoney = (value,num = 2) =>{
  let _a = num > 0 ? '.' : ''
  for(let i =0;i<num;i++){
    _a+='0'
  }
  if (!value) {
    return '0'+ _a
  }
  if (value.replace) {
    value = value.replace(/,/g, '')
  }
  let val = String(value)
  if (val.indexOf('.') < 0) {
    return val.replace(/(?=\B(?:\d{3})+\b)(\d{3}(\.\d+$)?)/g, ',$1') + _a
  } else {
    return Number(value).toFixed(num).replace(/(?=\B(?:\d{3})+\b)(\d{3}(\.\d+$)?)/g, ',$1')
  }
}

// 金额转换为 亿 万 格式
export const turnMoney = (value, type) => {
  if (value === 0) {
    return 0
  } else if (value < 999) {
    return value + '万'
  } else if (value < 10000 && value > 999) {
    return value + '万'
  } else {
    if (type) {
      return Math.round(value / 1000) / 10 + '亿'
    } else {
      return value % 10000 === 0 ?
            `${Math.floor(value / 10000)}亿`
          : `${Math.floor(value / 10000)}亿${Math.round(value % 10000)}万`
    }
  }
}
// js gropBy
export const groupBy = ( array , f ) => {
  let groups = {};
  array.forEach( function( o ) {
      let group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );
  });
  return Object.keys(groups).map( function( group ) {
      return groups[group];
  })
}
// 防抖函數
export const debounce = (fn, interval = 300) => {
  let timeout = null;
  return function () {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
          fn.apply(this, arguments);
      }, interval);
  };
}