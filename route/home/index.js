const { Article } = require('../../model/article')
    //导入mongoose-sex-page模块 进行分页
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    //获取页码值
    const page = req.query.page;

    // res.send('欢迎来到博客首页')
    // let result = await Article.find().populate('author');
    //从数据库中查询数据
    let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    let str = JSON.stringify(result);
    result = JSON.parse(str);
    // res.send(result);
    //渲染模板并渲染数据
    res.render('home/default.art', {
        result
    })
}