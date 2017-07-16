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
//当请求路径是/user/signup的时候会执行第二个参数的函数
router.get('/signup',function(req,res){
  //渲染一个模板，返回一个空白的注册表单
  //1参数是模板的相对路径，相对模板的根目录
  res.render('signup',{});
});
router.post('/signup',function(req,res){
  res.send('注册');
});
router.get('/signin',function(req,res){
  res.send('登录')
});
router.post('/signin',function(req,res){
  res.send('登录')
});
router.get('/welcome',function(req,res){
  res.send('欢迎')
});
module.exports = router;