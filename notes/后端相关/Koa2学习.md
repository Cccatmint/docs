### koa2 是什么

 <details> 
 <summary>什么是框架，框架和库的区别</summary>
 封装原生代码的API；规范流程和格式；让开发者更加专注于业务代码，提高开发效率; 
框架是唯一的，库可以共存;框架关注全流程，库关注单个功能;比如 框架:Vue , 库：lodash</details>

koa2 是nodejs web server 框架

通过async/await语法高效编写 web server

官网https://koa.bootcss.com

下载 

```
npm install koa --save
```



### koa2 环境搭建

使用脚手架koa-generator 创建koa2项目

```javascript
// 下载脚手架
npm install -g koa-generator
// 验证版本
koa2 --version
// 创建项目
koa2 myproject
// 进入创建的项目文件夹
cd myproject
// npm安装依赖
npm install
// 启动项目,看package.json 里有默认的nodemon的dev命令
npm run dev
```

项目文件目录 初步 介绍

```
bin/www 
	获取app.js的koa实例，可以配置监听端口，默认3000
```

- 创建路由

  1. ./routes/comments.js 创建路由文件并输出

  ```javascript
  // 创建  留言板的例子
  
  const router = require('koa-router')()
  
  router.prefix('/api') // ---前缀,访问下面时需要访问 http://xxxxxxx.com/api/xxxx
  
  // ---定义路由: 模拟获取留言板列表
  router.get('/list', async (ctx) => {
      ctx.body = 'api list'
  })
    
  // ---定义路由：模拟创建留言
  router.post('/create', async (ctx) => {
      ctx.body = 'api create'
  })
  
  module.exports = router // ---输出路由
  ```

  2. 在app.js 中 引入路由 并注册

     ```javascript
     const comments =require('./routes/comments')  // ---引入路由
     app.use(comments.routes(), comments.allowedMethods()) // ---routes 注册路由
     // ---allowedMethods() 对于404 或返回为空的情况的一种补充
     ```

     

### koa2 处理http

#### koa2 获取get请求参数

```md
- 获取GET请求数据源头是koa中request对象中的query方法或querystring方法
- query返回 格式化好的参数对象
- querystring返回的是请求字符串
由于ctx对request的API有直接引用的方式，所以获取GET请求数据有两个途径
以query 为例：
	const param = ctx.query
	或者
	const parm = ctx.request.query
```



#### koa2 获取post请求参数

```
ctx.request.body
```

ctx 是req 和 res 和 querystring的集合

```
- 获取querystring
    通过const query = ctx.query 
- 获取request body
	const body = ctx.request.body
- 返回体设置
	ctx.body = {...}
```

```javascript
// ---示例

const router = require('koa-router')()

router.prefix('/api') // ---前缀,访问下面时需要访问 http://xxxxxxx.com/api/xxxx

// ---定义路由: 模拟获取留言板列表
router.get('/list', async (ctx) => {
    ctx.body = 'api list 路由'
    const query = ctx.query

})

// ---定义路由：模拟创建留言
router.post('/create', async (ctx) => {
    // ---获取请求体body
    const body = ctx.request.body
    // ---返回response的body
    ctx.body = {
        errno: 0,
        data: [
            { content: '留言1', user: '张三' },
            { content: '留言2', user: '王二' }
        ]
    }
})



module.exports = router // ---输出路由
```



### koa2 中间件

可扩展，易插拔

目的:中间件机制，能合理拆分业务代码

koa2里的app.use(...)里的都是中间件，

<font color=#008000>所有请求都经过app.use()；ctx 是req,res,querystring的集合；next是下一个中间件</font>

路由之类的也是中间件，只有符合它的规则才会进入执行内容

```javascript
const Koa = require('koa')
const app = new Koa()
// 模拟登录功能
// 登录校验，可以用中间件来实现

// ---模拟登录(为了使用中间件)
app.use(async(ctx, next) => {
  const query = ctx.query
    // ---模拟登录校验
  if (query.user === 'zhangsan') {
    // ---next是下一个中间件
    await next()
  } else {
    ctx.body = '请登录'
  }
})
```



### koa2 洋葱圈模型---中间件的运行机制

中间件机制是koa2的精髓

每个中间件都是async函数

中间件的运行机制，就像洋葱圈

<img src="https://segmentfault.com/img/bVbIngr" alt="image.png" style="zoom:33%;" />

> 下面的代码用于演示洋葱圈模型的机制

```javascript
// 演示中间件洋葱圈模型

const Koa = require('koa')
const app = new Koa()

// --- 注册中间件 logger、x-response-time、 response 

// logger
app.use(async (ctx, next) => {
    await next() // 执行下一个中间件
    const rt = ctx.response.get('X-Response-Time')  // res
    console.log(`${ctx.method} ${ctx.url} - 延迟时间${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set("X-Response-Time", `${ms}ms`)
})

// response
app.use(async (ctx, next) => {
        ctx.body = 'Hello World'
})

app.listen(3000)
console.log('koa2 已经开始监听3000端口')
```

