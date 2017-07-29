let Socket = require('ws');
//创建一个ws的客户端，请求连接服务器
let socket = new Socket('ws://localhost:8080');
//当连接已经建立，或者说连接已经打开
socket.on('open',function(){
  console.log('连接已经建立');
  socket.send('服务器你好!');
});
//监听服务器发过来的消息
socket.on('message',function(msg){
  console.log(msg);
});
