/**
 * 统计每位客户端访问服务器的次数
 * 当这个客户端第一次访问服务器的时候，服务器返回，欢迎你的第1次访问
 * /visit
 */
let http = require('http');
let querystring = require('querystring');
let server = http.createServer(function(req,res){
  let url = req.url;
  if(url == '/visit'){
    //先取得请求头中的cookie字段
    let cookie = req.headers.cookie;
    //把它转成对象
    let cookieObj = querystring.parse(cookie,'; ');
    //取得cookie对象的visit属性
    let visit = cookieObj.visit;
    let count = 1;//默认是第一次
    //如果有值则以前服务器向客户写入过此cookie
    if(visit){
      //把旧的值+1
      count = parseInt(visit) +1;
    }
    //通过Set-Cookie设置响应头给客户端
    res.setHeader('Content-Type','text/html;charset=utf-8');
    res.setHeader('Set-Cookie',`visit=${count}`);
    res.end(`欢迎你的第${count}次光临`);
  }else{
    res.end('404');
  }
}).listen(8080);