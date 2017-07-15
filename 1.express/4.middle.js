let express = require('express');
let app = express();
//使用中间件函数
//没有路径，则意味着它可以匹配所有的路径
//也没有方法，则意味着它可以匹配所有的方法
//中间件和路由规则的执行顺序跟排列顺序严格相等
app.use(function(req,res,next){
  console.log('1');
  res.end('go back');
  //next是一个函数，调用它的话可以让请求向下继续执行
  //next();
});
//中间件其实是一个函数，每当请求到来的时候会执行。
app.use(function(req,res,next){
  console.log('2');
  //next是一个函数，调用它的话可以让请求向下继续执行
  next();
});
//一旦遇到路由匹配，则绝不会再住下执行了
app.get('/home',function(req,res){
  res.end('首页');
});

app.listen(8080);