# koa第三方中间件



## 1.koa-router

`npm i koa-router`

### 基本使用

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

### 获取请求参数（从ctx或者ctx.request）

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

### 动态路由

```js
router.get('/user/:uid', async ctx => {
    console.log(ctx.params) // { uid: '123456' }
    ctx.body = '动态路由'
})
```



## 2.koa-bodyparser

`npm i koa-bodyparser`

koa.js没有内置Request Body的解析器，当我们需要解析请求体时需要加载额外的中间件，官方提供的koa-bodyparser是个很不错的选择，支持x-www-form-urlencoded, application/json等格式的请求体，但不支持form-data的请求体，需要借助 formidable这个库，也可以直接使用 koa-body或 koa-better-body

### 基本使用

app.js

```js
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())

app.use(async ctx => {
    console.log(ctx.request.body) //{ ac: 'xxxxx', pw: 'xxxxx' }
})

app.listen(3000, () => {
    console.log("listening at port 3000")
})
```

用于提交的index.html

```html
<form action="http://localhost:3000" method="post">
        <input type="text" name="ac">
        <input type="password" name="pw">
        <button>提交</button>
</form>
```

