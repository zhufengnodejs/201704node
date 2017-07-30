/**
 * async是一个异步流程控制库
 **/
let async = require('async');
//现在有两个任务，需要串行执行,先执行第一个异步任务，第一个异步任务完成后再执行第二个异步任务
console.time('cost');
series([
  function(callback){
    setTimeout(function(){
      console.log(1);
      //只有当调用了callback函数后才会向后执行下一个异步任务
      //1参数是错误对象 2参数是返回值
      callback(1,'1');
    },2000)
  },
  function(callback){
    setTimeout(function(){
      console.log(2);
      callback(null,'2');
    },3000)
  }
],function(err,result){//["1","2"]
  console.log(err);
  console.log(result);
  console.timeEnd('cost');
});

function series(tasks,callback){

}