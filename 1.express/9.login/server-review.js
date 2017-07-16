/**
 * 路由 根据不同路径返回不同内容
 *      方法名+路径名 => 函数
 */
let express = require('express');
//app是请求监听函数,当服务器收到客户端的请求后执行的函数
let app = express();
//中间件的本质是一个函数。是匹配路由之前执行
app.use(function(req,res,next){
  console.log(1);
  next();
});
//当客户端GET请求/home路径的时候
//这里的路径是路径名(pathname,也就是端口号和问号中间的部分)

app.listen(8080);
