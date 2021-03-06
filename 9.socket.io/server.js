let express = require('express');
let path = require('path');
let Message = require('./model');
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
  let currentRoom;//记录当前客户端在哪个房间内
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
        sockets[toUser] && sockets[toUser].send({
          author:username,
          content,
          createAt:new Date().toLocaleString()
        });
      }else{
        //先把此对象保存到数据库中
        Message.create({//正常的具名聊天
          author:username,//发言人就是当前用户
          content:msg,//内容就是本次提交过来的消息
        },function(err,message){
          if(currentRoom){//意味着用户在某个房间内
            io.in(currentRoom).emit('message',message);
          }else{
            io.emit('message',message);
          }
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
  //监听客户端发过来的getAllMessages事件
  socket.on('getAllMessages',function(){
    Message.find().sort({createAt:-1}).limit(20).exec(function(err,messages){
      messages.reverse();
      //向客户端发送allMessages事件，客户端需要监听allMessages事件
       socket.emit('allMessages',messages);
      socket.send({author: SYSTEM, content: '欢迎光临，给你自己起个好听的呢称吧!', createAt: new Date().toLocaleString()});
    });
  });
  socket.on('join',function(roomName){
    if(currentRoom){//如果当前客户端在某个房间内，则需要退出当前房间
      socket.leave(currentRoom);
    }
    if(currentRoom != roomName){
    //让某个客户端进入某个房间
      socket.join(roomName);
      currentRoom = roomName;//把新房间赋给当前房间
      //我已经成功进入你指定的房间了
    }else{
      currentRoom = '';
    }
    socket.emit('joined',currentRoom);
  });
  socket.on('delete',function(_id){
    Message.remove({_id},function(err,result){
      io.emit('deleted',_id);
    });
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
 四、 持续消息到数据库中
 五、 分房间聊天
 六、 删除消息/撤消消息

 **/