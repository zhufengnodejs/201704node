let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
/**
 * *能匹配任意文件名，但不能匹配路径分隔符
 * **能匹配任意文件名，包括子路径
 * npm install gulp-less gulp-minify-css -D
 */
gulp.task('css',function(){
  gulp.src(['./src/less/main/c.less','./src/less/a.less','./src/less/b.less'])
    .pipe($.less())
    .pipe($.concat('all.css'))
    .pipe(gulp.dest('./buld/css'))
    .pipe($.minifyCss())
    //all.css  all.min.css
    .pipe($.rename(function(obj){
      obj.basename += '.min';
    }))
    .pipe(gulp.dest('./buld/css'))
});