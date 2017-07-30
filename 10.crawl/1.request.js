let request = require('request');
//可以帮我们把GBK转成UTF8
let iconv = require('iconv-lite');
//request是一个异步的方法，当读取URL完成后会执行对应的回调函数
//如果我们设置encoding=null,那么request将不再对响应体进行转字符串操作，body就会保留Buffer类型
//request接收到的原始类型肯定是Buffer,
request({url:'http://top.baidu.com/category?c=1',encoding:null},function(err,response,body){
  //err错误对象 response 响应对象 body 响应体
  if(!err && response.statusCode == 200){
    //把一个GBK类型的buffer转成utf8字符串
    body = iconv.decode(body,'gbk');
    console.log(body);
  }
});