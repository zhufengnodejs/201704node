let express = require('express');
/**
 * 注册登录案例
 *
 * @type {*}
 */
//app是请求监听函数,当服务器收到客户端的请求后执行的函数
let app = express();
let path = require('path');
//设置模板的类型，它可以决定添加的模板后缀
app.set('view engine','html');
//设置模板存放的根目录，根路径
app.set('views',path.resolve('views'));
//用来指定某种模板的渲染方法
app.engine('.html',require('ejs').__express);
/**
 * 静态文件 不会动的文件 不会动态改变的文件 html css js 图片 图标
 */
// app.get('/bootstrap/dist/css/bootstrap.css',function(req,res){
//   //sendFile发送文件 把一个路径里的文件读出来发送给客户端,注意路径必须是绝对路径
//   //path.resolve用于把相对路径转换成绝对路径
//   res.sendFile(path.resolve('../../node_modules/bootstrap/dist/css/bootstrap.css'));
// });
//使用一个静态文件中间件 参数是一个静态文件根目录
///bootstrap/dist/css/bootstrap.css
//当服务器收到客户端的请求之后，会拼出一个绝对路径，找到这个静态文件
//先得到绝对根目录+路径名
// /user/signup
let user = require('./routes/user');
app.use(express.static(path.resolve('../../node_modules')));
app.use(express.static(path.resolve('./public')));
//user是个变量，它的值指向的是模块的导出对象 module.exports
app.use('/user',user);
//如果请求的URL路径是以/user开头的话，会交由user中间件来进行匹配子路径

app.listen(8080);
