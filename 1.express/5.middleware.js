/**
 * 编写一个请求日志中间件
 * 不管客户端访问什么路径，都在控制台打印出 方法名 路径
 **/
let app = require('express')();
/**
 * 中间件的作用是什么
 * 1. 编写一些公用的逻辑,所有的路由都需要处理的只需要写一次就够了
 */
app.use(function(req,res,next){
  console.log(req.method,req.path);
  next();
});
app.use(function(req,res,next){
  res.setHeader('Content-Type','text/html;charset=utf-8');
  next();
});
app.get('/',function(req,res){
  res.end('首页');
});
app.get('/user',function(req,res){
  res.end('用户');
});
app.listen(8080);