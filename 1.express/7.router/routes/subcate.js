let express = require('express');
let router = express.Router();
// // /me
router.get('/me',function(req,res){
  res.send('删除我');
});
module.exports = router;