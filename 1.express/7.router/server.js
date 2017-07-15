let express = require('express');
let app = express();
//用户 路由中间件
let user = require('./routes/user');
//分类 路由中间件
let category = require('./routes/category');
//现在use里传入了二个参数，第一个参数是路径前缀，第二个参数才是路由中间件.
//当客户端请求url地址 /user/signup的话，也就是说是以/user开头的话，才会走user中间件
app.use('/user',user);
//当客户端请求的地址是以/category开头的话，才会走category中间件
app.use('/category',category);
app.get('/other',function(req,res){
  res.send('other');
});
app.listen(8080);
//端口号的取值范围0-65535