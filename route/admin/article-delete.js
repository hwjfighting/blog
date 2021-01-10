const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //根据id删除文章
    await Article.findOneAndDelete({ _id: req.query.id })
        //将页面重定向到文章列表页面
    res.redirect('/admin/article');
}