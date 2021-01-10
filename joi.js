//引入joi的模块
const Joi = require('joi');
// 定义验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证'))
};
async function run() {
    try {
        //实现验证
        await Joi.validate({ username: 'aa' }, schema);
    } catch (ex) {
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}
run();