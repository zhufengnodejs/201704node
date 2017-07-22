//mongoose可以实现对数据库集合的增删改查
//1. 引入mongoose模块
let mongoose = require('mongoose');
//连接数据库 数据库的名字可以随意写，不需要事先创建好
//monogdb://IP:端口号/数据库名称
//2. 返回连接对象
let conn = mongoose.createConnection('mongodb://127.0.0.1/201704node');
//3.创建数据库的骨架模型，规定集合文档中的字段名称和字段类型
//这就是规定了集合中文档的名称为name age,类型分别是字符串和数字
let UserSchema = new mongoose.Schema({
  name:String,//用户名称
  age:Number//用户年龄
  //collection可以用来指定集合的名称
});
//4.定义模型 2个参数表示定义一个模块 1个参数表示获取一个模型
//如果不通过collection指定集合的名称，那么集合名称=模型名=> 小写->复数
let User = conn.model('User',UserSchema);
//把这个对象保存到数据库中
//err错误对象 doc是保存成功之后的文档对象
//_id是一个对象，类型是ObjectId
//如果保存的字段在Schema中没有定义，会被忽略掉
//如果没有提供完整的所有字段，那么只会保存给定的字段
//如果类型不匹配，mongodb会尝试进行类型转换，如果转换成功则保存，如果转换失败则报错
User.create({name:'zfpx',age:"a300"},function(err,doc){
  if(err){
    console.error(err);
  }else{
    //__v: 0 版本号，解决并发问题
    //_id 是文档的主键, 1.唯一的 2 没什么太多业务含义，所以永远不需要修改
    //{ __v: 0, name: 'zfpx', age: 8, _id: 5972c54c4735381708af182d }
    console.log(doc);
  }
});




