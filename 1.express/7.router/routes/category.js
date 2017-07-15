//文章分类相关的路由放在这里写
/**
 * /category/add 增加分类
 * /category/delete 删除分类
 */
let express = require('express');
let router = express.Router();
let subcate = require('./subcate');
// /add/me
router.use('/add',subcate);
router.get('/add',function(req,res){
  res.send('增加分类');
});
router.get('/delete',function(req,res){
  res.send('删除分类');
});

module.exports = router;