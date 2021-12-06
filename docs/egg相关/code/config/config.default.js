exports.keys = '自定义的cookie安全字符串'

// 添加view 配置
// 模板渲染引擎设置为nunjucks
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks'
    }
}

exports.news = {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };