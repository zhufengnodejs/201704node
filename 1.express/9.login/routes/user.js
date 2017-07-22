let express = require('express');
/**
 * GET /user/signup 注册
 * POST /user/signup
 * GET /user/signin 登录
 * POST /user/signin
 * GET /user/welcome  欢迎
 **/
//返回一个路由中间件
let router = express.Router();
//定义一个数组,保存所有的用户
let users = [];
//当请求路径是/user/signup的时候会执行第二个参数的函数
router.get('/signup',function(req,res){
  //渲染一个模板，返回一个空白的注册表单
  //1参数是模板的相对路径，相对模板的根目录
  let error = req.session.error;
  req.session.error = '';
  res.render('signup',{error});
});
router.post('/signup',function(req,res){
  //因为我们已经引用过了bodyParser中间件，所以req多了一个body属性
  let user = req.body;//{username:'zfpx',password:123}
  //在老的用户数组找一找有没有跟本次用户名相同的用户，如果有的话，则表示注册失改，如果没有则可以成功注册
  //find就是循环数组中的每个元素，并依次传入item,如果有一个函数的执行结果是true,那么就表示找到了。赋给oldUser
  let oldUser = users.find(function(item){
    return item.username == user.username;
  });
  //如果找到了老用户，注册失败, 返回注册页面重新填写注册表单
  if(oldUser){
    //back是表示返回上一个页面，从哪来回哪里
    req.session.error = '此用户名已经被使用，请你换个用户名吧';
    res.redirect('back');
  }else{
    //向用户数组中添加新的用户
    users.push(user);
    //注册成功之后要跳到登录页  re direct 重新指向
    //所有的路径都必须以/开头
    res.redirect('/user/signin');
  }
});
router.get('/signin',function(req,res){
  res.render('signin');
});
router.post('/signin',function(req,res){
  //因为使用了bodyparser中间件，所以请求对象上有body属性 req.body
  let user = req.body;
  //在老的用户数组查找有没有跟本次提交过来的用户名和密码都匹配的用户，如果有则认为登录成功，跳到欢迎页。如果没有，则认为登录失败，跳回登录页
  let oldUser = users.find(function(item){
    return item.username == user.username && item.password == user.password;
  });
  if(oldUser){
    res.redirect('/user/welcome');
  }else{
    res.redirect('back')
  }
});
router.get('/welcome',function(req,res){
  res.send('欢迎')
});
module.exports = router;