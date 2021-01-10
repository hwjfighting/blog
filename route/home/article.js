//导入文章集合构造函数
const { Article } = require('../../model/article')
    //导入评论集合构造函数
const { Comment } = require('../../model/comment')
module.exports = async(req, res) => {
    // res.send('欢迎来到文章详情页面')

    //接收客户端传递过来的文章id
    const id = req.query.id;
    //根据id查询文章详细信息
    let article = await Article.findOne({ _id: id }).populate('author');
    let str = JSON.stringify(article);
    article = JSON.parse(str);

    //查询当前文章所对应的评论信息
    let comments = await Comment.find({ aid: id }).populate('uid');
    let string = JSON.stringify(comments);
    comments = JSON.parse(string);

    // res.send(article);
    // res.send(comments);
    // return;
    res.render('home/article.art', {
        article,
        comments
    })
}