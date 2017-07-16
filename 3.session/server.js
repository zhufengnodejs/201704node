let express = require('express');
let session = require('express-session');

let app = express();
app.use(session({
  resave:true,//每次客户端请求服务器的时候，都要重新保存session
  saveUninitialized:true,//保存未初始化的session
  secret:'zfpx'//加密的秘钥
}));
//name=zfpx
//req.session 就是客户端在服务器端对应的对象
app.get('/write',function(req,res){
//每当使用了session中间件之后，会在请求对象req上多一个session属性。 {name:'zfpx'}
    req.session.name = 'zfpx';
    res.end('write ok');
});
app.get('/read',function(req,res){
    res.end(req.session.name);
});
app.listen(8080);