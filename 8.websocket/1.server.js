/**
 *通过node来启动一个websocket服务器
 */
let Server = require('ws').Server;
//创建一个websocket服务器，监听8080端口 websocket http可以共有同一个端口号
let server = new Server({port:8080});
//监听客户端的连接，客户端连接上来之后执行对应的函数
server.on('connection',function(socket){
  console.log('客户端连接成功');
  //socket是一个连接对象,通过监听message事件可以接收对方的消息
  socket.on('message',function(msg){//msg就是客户端发过来的消息
    //把消息发给客户端
    socket.send('服务器说:'+msg);
  });
});

