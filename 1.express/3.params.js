/**
 * 如何在服务器获取请求中的参数
 * 请求行 方法名 路径(用?隔开的两部分)路径名+查询字符串
 * 请求头
 *
 */
let express = require('express');
let app = express();
let url = require('url');
/// k1=v1&k2=v2
// http://localhost:8080/user?id=1&name=zfpx
//req res和原生http服务器的请求响应对象是同一个，只不过增加了一些额外的自定义属性
app.get('/user',function(req,res){
  let method = req.method;
  console.log(req.url);
  console.log(method);
  //pathname=/user query= id=1 或 {id:1}
  //let {pathname,query} = url.parse(req.url,true);
  //console.log('pathname=',pathname);//?号前面的路径名
  //req.path req.query 它们都是express添加的
  console.log('pathname=',req.path);//?号前面的路径名
  console.log('query=',req.query);//?号后面的查询字符串对象
  console.log(req.headers);
  //{host:'http://localhost'}
  res.end('ok');
});
let users = [
  {id:1,name:'zfpx1'},{id:2,name:'zfpx2'},{id:3,name:'zfpx3'}
]
//路径参数
// /users/1
//req.params= {id:1}
app.get('/users/:xxx',function(req,res){
  //先拿到路径参数里面的ID
  let id = req.params.xxx;
  let user = users.find(item=>item.id === parseInt(id));
  res.end(user.name);
});

app.listen(8080);

