let express = require('express');
/**
 * 注册登录案例
 *
 * @type {*}
 */
//app是请求监听函数,当服务器收到客户端的请求后执行的函数
let app = express();
//user是个变量，它的值指向的是模块的导出对象 module.exports
let user = require('./routes/user');
//如果请求的URL路径是以/user开头的话，会交由user中间件来进行匹配子路径
app.use('/user',user);
app.listen(8080);
