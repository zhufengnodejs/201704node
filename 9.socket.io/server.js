let express = require('express');
let path = require('path');
let app = express();
app.use(express.static(path.resolve('../node_modules')));
app.use(express.static(__dirname));
//当客户端访问/的时候，需要返回一个聊天页面
app.get('/', function (req, res) {
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
// io.emit('message')向所有的客户端发消息
// socket.emit('message')向某个客户端发消息
const SYSTEM = '系统';
//这个对象记录着所有的用户名和它们的socket之间的关联
const sockets = {};
io.on('connection', function (socket) {
  //定义一个私有变量，用来存放每个用户的用户名
  let username;
  socket.send({author: SYSTEM, content: '欢迎光临，给你自己起个好听的呢称吧!', createAt: new Date().toLocaleString()});
  //如果客户端发消息过来了，就会执行对应的监听函数
  socket.on('message', function (msg) {
    if (username) {//如果呢称设置过了
      //           @系统 hel中 lo
      let regex = /@([^ ]+) (.+)/;
      let result = msg.match(regex);
      if(result){//如果能匹配上的话就是私聊
        let toUser = result[1];//对方的用户名
        let content = result[2];//这是私聊的内容
        //先拿到toUser对应的socket对象
        sockets[toUser].send({
          author:username,
          content,
          createAt:new Date().toLocaleString()
        });
        socket.send({
          author:username,
          content,
          createAt:new Date().toLocaleString()
        });
      }else{
        io.emit('message',{//正常的具名聊天
          author:username,//发言人就是当前用户
          content:msg,//内容就是本次提交过来的消息
          createAt:new Date().toLocaleString()
        });
      }

    } else {
      username = msg;
      //在用户设置完用户名之后，把用户名和它对应的sockets对象关联起来
      sockets[username] = socket;
      //服务器收到消息后向所有的客户端发送消息
      io.emit('message', {author: SYSTEM, content: `欢迎${username}来到聊天室`, createAt: new Date().toLocaleString()});
    }
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

/**
 一、实现匿名聊天
   1. 向服务器发送消息
   2. 服务器向所有的客户端进行广播
   3. 所有的客户端收到消息后在列表中显示
 二、 具名聊天
   1. 当连接上来的用户第一次发言的时候，服务器把发言的内容当成用户名
   2. 那么以后此用户再发言的话就会显示用户名发言
 三、 私聊

 **/