let express = require('express');
let app = express();
app.get('/clock',function(req,res){
 //跨域资源共享  访问控制允许的来源 域(协议://域名:端口)
 res.setHeader('Access-Control-Allow-Origin','http://localhost:63342');
 res.send(new Date().toLocaleString());
});
let path = require('path');
app.get('/',function(req,res){
 res.sendFile(path.resolve('./3.iframe.html'));
});
app.get('/clock2',function(req,res){
  setInterval(()=>{
  let script = (
    `
    <script>
          parent.showTime('${new Date().toLocaleString()}');
    </script>
    `
  )
  res.write(script);
  },1000)
});
app.listen(3000);