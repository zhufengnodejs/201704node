/**
 * 并行
 */
let async = require('async');
console.time('cost1');
console.time('cost2');
async.parallel([
  function(callback){
    setTimeout(function(){
      console.log(1);
      callback('第一个任务出错',new Date());
    },2000);
  },
  function(callback){
    setTimeout(function(){
      console.log(2);
      callback(null,{age:8});
    },3000);
  }
  //同时开始，但是需要全部异步任务执行完毕后才会执行最终的回调
],function(err,result){
  console.log(err);
  console.log(result);
  console.timeEnd('cost2');
});
/*
有两种情况能导致任务结束
1. 有一个任务出错了
2. 全部任务正常结束
**/
console.timeEnd('cost1');