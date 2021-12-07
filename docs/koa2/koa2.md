# Koa2

## install

`npm i koa --save`

`npm i koa-router --save`

```js
const koa = require("koa")
const app = new koa()
const router = require('koa-router')() // 注意()

router.get('/', function(ctx, next) {
    ctx.body = "hello koa"
})	

app.use(router.routes())

app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('listening at port 3000')
})
```



## 从ctx或者ctx.request中获取

```js
router.get('/from_request', function(ctx, next) {
    const { url, request, query, querystring } = ctx
    ctx.body = {url, request, query, querystring}
})

router.get('/from_ctx', function(ctx, next) {
    const {query, querystring } = ctx.request
    ctx.body = {query, querystring}
})
```



## 动态路由

```js
router.get('/user/:uid', async ctx => {
    console.log(ctx.params) // { uid: '123456' }
    ctx.body = '动态路由'
})
```



## 中间件

### 1 应用级中间件

```js
app.use(async (ctx, next) => {
    console.log(new Date())
    await next()
})
```



### 2 路由级中间件

```js
router.get('/rt', async (ctx, next) => {
    console.log('rt1')
    await next()
})

router.get('/rt', async (ctx, next) => {
    console.log('rt2')
    ctx.body = '路由rt'
})
```



### 3 错误处理中间件

```js
app.use(async (ctx, next) => {
    next()
    if (ctx.status === 404) {
        ctx.status = 404
        ctx.body = "这是一个404页面"
    }
})
```



### 4 第三方中间件

#### koa-views

koa-views对需要进行视图模板渲染的应用是个不可缺少的中间件，支持ejs, nunjucks等众多模板引擎。



#### koa-bordyparser

koa.js并没有内置Request Body的解析器，当我们需要解析请求体时需要加载额外的中间件，官方提供的koa-bodyparser是个很不错的选择，支持x-www-form-urlencoded, application/json等格式的请求体，但不支持form-data的请求体，需要借助 [formidable](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Ffelixge%2Fnode-formidable) 这个库，也可以直接使用 [koa-body](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2Fdlau%2Fkoa-body) 或 [koa-better-body](https://link.jianshu.com?t=https%3A%2F%2Fgithub.com%2FtunnckoCore%2Fkoa-better-body)



...
