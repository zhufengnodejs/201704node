let str = 'name=zfpx; age=i@you';
/*
let reg = /age=([^;]+)/;
console.log(str.match(reg)[1]);*/
let querystring = require('querystring');
let obj = querystring.parse(str,'; ');
console.log(obj.age);

