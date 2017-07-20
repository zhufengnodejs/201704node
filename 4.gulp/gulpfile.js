let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
gulp.task('serve',function(){
  $.connect.server({
    port:9090,
    root:'./build',//静态文件根目录
    livereload:true//启动自动刷新
  });
});
gulp.task('html',function(){
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
    // 通知浏览器自动刷新
    .pipe($.connect.reload())
});
gulp.task('watch',function(){
  gulp.watch('./src/index.html',['html']);
});
//此数组是依赖的任务
gulp.task('default',['serve','watch']);