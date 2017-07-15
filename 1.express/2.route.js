let express = require('express');
//express是一个方法，或者说是一个函数,执行此函数可以得到app
//app本质上是一个请求监听函数，会在客户端提交请求到服务器的时候执行
let app = express();
//如何定义路由
//app的方法名和http的请求方法名是一一对应的
//GET POST DELETE PUT OPTIONS HEAD
//第一个参数是URL路径 第二个参数是请求监听函数
//sign sing
//all代表能匹配所有的方法 * 能匹配所有的路径
//路由只要能匹配一个，就不会再向下匹配了

app.get('/signup',function(req,res){
  res.setHeader('Content-Type','text/html;charset=utf-8');
  res.end('注册');
});
//所有的路径永远是以/开头的
app.get('/signin',function(req,res){
  res.setHeader('Content-Type','text/html;charset=utf-8');
  res.end('登录');
});
app.all('*',function(req,res){
  res.setHeader('Content-Type','text/html;charset=utf-8');
  res.end('你访问的页面不存在');
});
//Cannot GET /signin3
//如果说没有任何一个路由能匹配到的话，则会返回404，并且返回响应体 Cannot GET /signin3
//监听8080端口，启动一个http服务器
app.listen(8080);
