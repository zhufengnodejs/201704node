let gulp = require('gulp');
// let babel = require('gulp-babel');
// let concat = require('gulp-concat');
//帮助我们自动加载所有的插件
let $ = require('gulp-load-plugins')();
gulp.task('js',function(){
  gulp.src('./src/js/*.js')
    .pipe($.babel()) //es6转es5
    .pipe($.concat('all.js'))//把多个JS文件合并成一个JS文件
    .pipe(gulp.dest('./build/js'))
    .pipe($.uglify())//压缩JS文件
    .pipe($.rename('all.min.js'))
    .pipe(gulp.dest('./build/js'))
});