exports.keys = '自定义的cookie安全字符串'

// 添加view 配置
// 模板渲染引擎设置为nunjucks
exports.view = {
    // defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
        '.html': 'ejs'
    }
}

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

// egg-static 配置静态资源文件夹
exports.static = {
    prefix: "/public"
}

// 关闭csrf 安全策略方便跨域
exports.security = {
    csrf: {
        enable: false
    }
}

// session相关的配置
exports.session = {
    key :"session xxxxxxxxxxxxxxxxxxxxxxxxxxxx",   // 设置Key的默认值 (cookie 的name)
    httpOnly:true,      // 设置服务端操作
    maxAge:1000*60  ,   // 设置最大有效时间
    renew: true,        // 页面有访问动作自动刷新session 
}

// // 全局挂在中间件counter.js
// exports.middleware = ['counter']