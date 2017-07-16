/**
 * 如何在express中读写cookie
 */
let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser());
app.get('/write',function(req,res){
  //cookie的方法是express为我们提供，让我们更方便写入cookie
  //res.cookie('name','zfpx');
 /* res.cookie('name','zfpx',{
    //域名的意思就是说此cookie归哪个域名所有，规定只有在向指定域名发起请求的时候才会发送cookie
    domain:'a.zfpx.cn'
  });*/
 /*res.cookie('name','zfpx',{
   //规定此cookie属于哪个路径的，只有当客户端访问哪个路径的时候才会发送此cookie
   path:'/read2'
 });*/
 res.cookie('name','zfpx',{
   //设置cookie的过期时间，只要到了指定的时间之后，此cookie会立刻被销毁
   //expires:new Date(Date.now()+10*1000)
   maxAge:10*1000
 });
  res.send('ok');
});
app.get('/read',function(req,res){
  //req.cookies就是req.headers.cookie字符串转成的对象
   res.send(req.cookies);
});
app.get('/read2',function(req,res){
  //req.cookies就是req.headers.cookie字符串转成的对象
  res.send(req.cookies);
});
app.listen(8080);
