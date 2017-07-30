/**
 * 开启一个计划任务
 * CronJob 是一个构造函数，通过它可以创建一个任务
 */
let CronJob = require('cron').CronJob;
//1 参数是任务的执行时机
//2 参数是任务的定义
/**
 * * 代表所有可能出现的值
 * 固定值
 * 枚举值 表示枚举的任何一个值都可以
 * - 区间 区间范围内都是合法的
 * *除以5 每隔5秒一次
 *
 * 每周一或周五晚上10点执行命令
 */
let job = new CronJob("00 00 22 * * 1,5",function(){
  console.log(new Date().toLocaleString());
});
job.start();
