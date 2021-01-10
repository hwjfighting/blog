//引用express框架
const express = require('express');
//处理路径
const path = require('path');
//引入body-parser模块，用来处理post请求参数
const bodyPaser = require('body-parser');
//导入express-session模块
const session = require('express-session');
//导入art-template模板引擎
const template = require('art-template');
//导入dataformat 第三方模块
const dateFormat = require('dateformat');
//导入morgan 第三方模块
const morgan = require('morgan');
//导入config模块
const config = require('config');
//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');

//处理post请求参数 use会拦截请求 设置参数为false后系统会用queryString来处理post请求参数的格式
app.use(bodyPaser.urlencoded({ extended: false }));
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }

}));

//告诉express框架模板所在的位置  __dirname是当前文件所在的绝对目录 也就是blog目录
app.set('views', path.join(__dirname, 'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时，所使用的模板引擎是什么  express-art-template依赖的是art-template 所以express-art-template下载好后，art-template也下载好了
app.engine('art', require('express-art-template'));
//向模板内导入dataFormate变量 这样可以在模板内部直接使用dataFormat
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

//process.env 获取系统环境变量 
if (process.env.NODE_ENV == 'development') {
    console.log('当前是开发环境');
    //在开发环境中 将客户端发送到服务器端的请求信息打印到控制台
    app.use(morgan('dev'));
} else {
    console.log('当前是生产环境')
}
// console.log(process.env.NODE_ENV)


//引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

//拦截请求 判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'))

//为路由匹配一级请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误请求处理中间件
app.use((err, req, res, next) => {
    //JSON.parse() 将字符串对象转换为对象类型
    const result = JSON.parse(err);
    // res.redirect(`${result.path}?message=${result.message}`)
    let params = [];
    for (attr in result) {
        if (attr != 'path') {
            params.push(attr + "=" + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(80);
console.log('网站服务器启动成功，请访问locallhost');