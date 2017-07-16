let obj = {
  name:'zfpx',
  home:{city:'beijing'}
}
//值 只能是字符串或者数组
let querystring = require('querystring');
console.log(querystring.stringify(obj));
//{ name: 'zfpx', age: '9' }

let qs = require('qs');
console.log(qs.parse(qs.stringify(obj)));