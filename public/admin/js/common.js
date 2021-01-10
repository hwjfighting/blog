//serializeArray 获取到的是包含对象的数组[{name:'email',value:'12356@qq.com'},{...}]
//该方法使其变为：{email:'12356@qq.com',password:'123456'}
function serializeToJson(form) {
    var result = {};
    // [{name: 'email', value: '用户输入的内容'}]
    var f = form.serializeArray();
    f.forEach(function(item) {
        // result.email 
        result[item.name] = item.value;
    });
    return result;
}