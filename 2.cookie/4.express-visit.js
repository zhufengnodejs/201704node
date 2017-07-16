let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
//使用此中间件以后会在req.cookies属性
app.use(cookieParser());
app.get('/visit',function(req,res){
  //取得cookie中的visit字段
  let zz = req.cookies.yy;
  console.log(zz);
  if(zz){
    zz = parseInt(zz)+1;
  }else{
    zz = 1;
  }
  res.cookie('yy',zz);
  res.send(`亲,欢迎你的第${zz}次访问`);

});
app.listen(8080,function(){
  console.log('server started on 8080');
});