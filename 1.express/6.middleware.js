/**
 * 编写一个请求日志中间件
 * 不管客户端访问什么路径，都在控制台打印出 方法名 路径
 **/
let app = require('express')();
/**
 * 中间件的作用是什么
 * 1. 编写一些公用的逻辑,所有的路由都需要处理的只需要写一次就够了
 * 2. 添加一些公用的属性和方法
 *    公用的属性 req.path req.query
 *    公用的方法 res.send
 */
app.use(function(req,res,next){
  res.setHeader('Content-Type','text/html');
  console.log(1);
  next();
});
//为响应对象添加send属性
//send和end一样都会结束写入响应体，一旦调用之后，则不能再次调用write或end方法了 ,其实在 send方法里面会调用end方法
app.use(function(req,res,next){
  //不管你传的是什么类型，都转成字符串，然后调用end方法
   res.send = function(){

   }
   next();
});
app.get('/',function(req,res){
  //send方法用来向客户端(浏览器)发送响应体的
  //end只能接收字符串或Buffer
  //send可以接收任意类型 字符串 Buffer 对象 数组 数字
  //send也是通过中间件给res对象添加上去的
  res.send({name:'首页'});
});
app.use(function(req,res,next){
  //如果设置两个相同的key的话，后面的会覆盖前面的设置
  //在调用setHeader的时候响应头并没有发送，响应头会在第一次调用write的时候发送
  res.setHeader('Content-Type','text/css');
  console.log(2);
  next();
});
app.get('/user',function(req,res){
  res.send(["zfpx1",'zfpx2']);
});
app.listen(8080);