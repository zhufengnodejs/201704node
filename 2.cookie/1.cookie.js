let http = require('http');
let querystring = require('querystring');
let server = http.createServer(function (req, res) {
  let url = req.url;
  //当url地址是/write的话就需要写cookie
  if(url=='/write'){
    //Set-Cookie:name=zfpx
    //第一次客户端访问服务器的时候，服务器通过响应头向客户端种植cookie
    res.setHeader('Set-Cookie',['k1=v1','k2=v2']);
    res.end('write ok');
  }else if(url == '/read'){
    //当第二次客户端访问服务器的时候，客户端会把本机上次保存的cookie带回给服务器。放在请求头
    //req.headers是一个对象，这个对象是从请求头中解析出来的。{host:'http://localhost:8080',cookie:'name=zfpx'}
    //Cookie:name=zfpx; age=8
    let cookie = req.headers.cookie;
    let cookieObj = querystring.parse(cookie,'; ');
    console.log(cookieObj);//{ k1: 'v1', k2: 'v2' }
    res.end('k1: '+cookieObj.k1)
  }else{
    res.end('404');
  }
}).listen(8080);