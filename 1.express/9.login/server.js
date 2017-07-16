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
//user是个变量，它的值指向的是模块的导出对象 module.exports
let user = require('./routes/user');
//如果请求的URL路径是以/user开头的话，会交由user中间件来进行匹配子路径
app.use('/user',user);
app.listen(8080);
