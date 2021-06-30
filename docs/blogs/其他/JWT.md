# jwt

## 1. 介绍 

JWT即 jsonwebtoken 由header , payload,  signature组成

其中header 与 signature为安全性组成部分

数据加密后在payload中

三者用`.`分隔

## 2. 使用方法

`npm i jsonwebtoken`

> https://www.npmjs.com/package/jsonwebtoken

### 2.1nodejs 环境中

#### 2.1.1加密

```js
const { sign } = require('jsonwebtoken')
const SECRET = '自定义随机字符串'

const user = { username: 'cccatmint', role: 'admin'}
// 签发token
const token = sign(user, SECRET, { expiresIn: '1h' })
console.log(token)
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNjY2F0bWludCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNTAxNjg1OSwiZXhwIjoxNjI1MDIwNDU5fQ.6vOTzb6NN0soAIZDOsrzONHOFD7DRxZaPaNytmqNFQU
```

#### 2.1.2 解码

```js
// 同步 解码 不会验证是否有效
// 详情访问 https://www.npmjs.com/package/jsonwebtoken
const { decode } = require('jsonwebtoken')

const Info = decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNjY2F0bWludCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYyNTAxNjg1OSwiZXhwIjoxNjI1MDIwNDU5fQ.6vOTzb6NN0soAIZDOsrzONHOFD7DRxZaPaNytmqNFQU')

console.log(Info)
{
//   username: 'cccatmint',
//   role: 'admin',
//   iat: 1625016859,
//   exp: 1625020459
// }
```

### 2.2 结合koa2 使用

> https://www.npmjs.com/package/koa-jwt

`npm i koa-jwt`

```js
const Koa = require('koa')
const app = new Koa()

const SECRET = '自定义随机字符串'
const koaJwt = require('koa-jwt')({ secret: SECRET })

const myrouter = require('koa-router')()
router.post('/api/user', koaJwt, async (ctx, next) => {
    console.log(ctx.state)
})

app.use(myrouter.routes(), myrouter.allowedMethods())

const http = require('http')
const server = http.createServer(app.callback())
server.listen(3000, () => {console.log('listen port 3000')})

```

此处SECRET 常量需要与 签发token 时使用的一致

```js
 sign(info, SECRET, { expiresIn: '1h' })
```

使用koa-jwt 中间件后，token中的信息被解码放到`ctx.state`中