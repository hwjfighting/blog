//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    //标识 表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //接收客户端传递过来的页码
    const page = req.query.page;

    // page指当前页，
    // size指定每页的显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec向数据库中发送查询请求 多集合联合查询popoulate
    // let articles = await pagination(Article).find().page(page).size(2).display(2).populate('author').exec();
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();
    let str = JSON.stringify(articles);
    articles = JSON.parse(str);
    // let articles = await Article.find().populate('author').lean();
    // let articles = await Article.find();


    // res.send(articles);
    // 渲染文章列表页面模板
    res.render('admin/article.art', {
        articles
    })

}