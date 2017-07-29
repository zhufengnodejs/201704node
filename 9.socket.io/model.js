let mongoose = require('mongoose');
mongoose.Promise = Promise;
let conn = mongoose.createConnection('mongodb://127.0.0.1/201704chat');
//定义模型骨架
let MessageSchema = new mongoose.Schema({
  author:String,
  content:String,
  createAt:{type:Date,default:Date.now}
});
//定义模型并导出
let Message = conn.model('Message',MessageSchema);
module.exports = Message;