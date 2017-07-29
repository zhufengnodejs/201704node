let express = require('express');
let path = require('path');
let app = express();
app.use(express.static(path.resolve('../node_modules')));
//当客户端访问/的时候，需要返回一个聊天页面
app.get('/',function(req,res){
  //用当前路径(__dirname)(当前文件所在的目录)+参数路径
 res.sendFile(path.resolve('index.html'));
});
//创建一个http服务器，把app当成参数传进去了。当服务器收到客户端请求的时候，会执行app函数。app函数就是请求监听函数
let server = require('http').createServer(app);
//引入socket.io模块并传入server的实例
//因为websocket的握手需要借助HTTP协议来实现
//io就相当于websocket服务器
let io = require('socket.io')(server);
//服务器端监听客户端的连接
//每当有一个客户端连接上来后，会为这个客户端分配一个socket对象，然后就可以通过这个socket对象来进行通信
io.on('connection',function(socket){
  //如果客户端发消息过来了，就会执行对应的监听函数
  socket.on('message',function(msg){
    //向客户端发送消息
    socket.send('服务器:'+msg);
  });
});
/*Socket.prototype.send = function(){
    var args = Array.prototype.slice.call(arguments); //args= ["服务器:xx"]
    args.unshift('message');  //args= ['message',"服务器:xx"]
    this.emit.apply(this, args);
    //socket.emit('message',"服务器:xx");
    return this;
  };*/
server.listen(8080);

