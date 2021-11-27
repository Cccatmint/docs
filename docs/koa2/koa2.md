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

