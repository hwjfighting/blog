const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    //标识 表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    //获取即将要修改的文章id
    const id = req.query.id;

    if (id) {
        //修改操作
        const article = await Article.findOne({ _id: id });
        res.render('admin/article-edit', {
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        })

    } else {
        //添加操作
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '添加'
        })
    }

}