/**
 * 有些时候多个异步任务之间是有关系的
 * 上一个任务的输出结果是下一个任务的输入参数
 */
let async = require('async');
console.time('cost');
async.waterfall([
  //第一个函数有一个参数 callback
  function(callback){
    setTimeout(function(){
      console.log('买菜');
      callback('钱丢了','菜');//callback的第二个参数是输出的结果
    },2000)
  },
  //从第二个函数开始有二个参数
  function(data,callback){
    setTimeout(function(){
      console.log('炒菜');
      callback(null,'炒'+data);//callback的第二个参数是输出的结果
    },3000)
  },function(data,callback){
    setTimeout(function(){
      console.log('吃'+data);
      callback(null,'吃'+data);//callback的第二个参数是输出的结果
    },3000)
  }
],function(err,result){//result是最后 一个任务返回值
  console.log(err);
  console.log(result);
  console.timeEnd('cost');
});
