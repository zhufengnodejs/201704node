let express = require('express');
/**
 * 注册登录案例
 *
 * @type {*}
 */
//app是请求监听函数,当服务器收到客户端的请求后执行的函数
let app = express();
let path = require('path');
//请求体解析器
let bodyParser = require('body-parser');
let session = require('express-session');
//使用中间件来解析请求体，并把请求体的内容转成对象并挂载到req.body上
//基本上所有的中间件都是一个函数，都需要执行
//此中间件可以解析编码后的url的请求体,把请求体转成对象 req.body={}
app.use(bodyParser.urlencoded({extended:true}));
//设置模板的类型，它可以决定添加的模板后缀
app.set('view engine','html');
//设置模板存放的根目录，根路径
app.set('views',path.resolve('views'));
//用来指定某种模板的渲染方法
app.engine('.html',require('ejs').__express);
//有了session中间件之后会在req.session
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:'zfpx'
}));
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
//user是个变量，它的值指向的是模块的导出对象 module.exports
app.use('/user',user);
//如果请求的URL路径是以/user开头的话，会交由user中间件来进行匹配子路径

app.listen(8081);
