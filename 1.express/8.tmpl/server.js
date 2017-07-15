let express = require('express');
let path = require('path');
let app = express();
//1.设置模板引擎 ejs jade
app.set('view engine','ejs');
//2.设置模板的存放目录
//如果存放模板的文件夹名称叫views,那么这句话可以不写，但如果不叫views的话，必须提供
//resolve是从当前路径出发，解析路径
app.set('views',path.resolve('xxx'));
app.get('/',function(req,res){
  //render渲染，绘制. express为请求对象res添加了一个render方法
  //第1个参数放模板的相对路径,所以不要以/开头，也不要以./开头
  //渲染就是把静态的模板和动态的数据对象进行混合生成HTML代码的过程
  //.就代表views目录 .指的是模板根目录
  //1.读取模板存放根目录下面的index.ejs文件内容
  //2.用数据对象把模板里的内容替换掉
  //3.把得到的HTML内容发送给客户端
  res.render('./index',{title:'首页'});
});
app.listen(8080);