let gulp = require('gulp');
//定义一个任务 gulp方法一共有四个
gulp.task('hello',function(){
  console.log('hello');
});
/**
 * gulp.src可以获得一个可读流
 * gulp.dest可以获得一个可写流
 * 对象流 {filename:'文件名',content:'文件内容'}
 */
gulp.task('html',function(){
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
});
//监听源文件的变化，当源文件发生变化 之后会自动行对应的任务
gulp.task('watch',function(){
 gulp.watch('./src/index.html',['html'])
})