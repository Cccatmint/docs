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



## 3.封装工具函数

extractors.js 

获取请求头中的token

```js
/**
 * @description 提取token 的工具函数
 * @see 参考 https://blog.csdn.net/weixin_30505751/article/details/101312342
 */
let extractors = {}

extractors.fromHeader = function (header_name = 'authorization') {
  return function (ctx) {
    let token = null,
      request = ctx.request;
    if (request.header[header_name]) {
      token = header_name === 'authorization' ?
        request.header[header_name].replace('Bearer ', '') :
        request.header[header_name];
    } else {
      ctx.throw(401, '请求头 Authorization 无token数据')
    }
    return token;
  }
}

module.exports = extractors
```

index.js

token验证 [配置安全路由，即不需要进行token验证的路由]

 将解析后的token信息添加到上下文ctx.payload



```js
const jwt = require('jsonwebtoken')
const extractors = require('./extractors')

/**
 * 
 * @param {object} options 
 *    @jwtFromRequest {function} jwtFromRequest
 *    @safetyRoutes {array} safetyRoutes
 *    @secretOrKey {string} secretOrKey 
 */

function checkJwt({ jwtFromRequest, safetyRoutes, secretOrKey } = {}) {
  return async function (ctx, next) {
    if (typeof safetyRoutes !== 'undefined') {
      let url = ctx.request.url
      //对安全的路由 不验证token
      if (Array.isArray(safetyRoutes)) {
        for (let i = 0, len = safetyRoutes.length; i < len; i++) {
          let route = safetyRoutes[i],
            reg = new RegExp(`^${route}`);
          //若匹配到当前路由 则直接跳过  不开启验证                
          if (reg.test(url)) {
            return await next()
          }
        }
      } else {
        throw new TypeError('safetyRoute 接收类型为数组')
      }
    }
    if (typeof secretOrKey === 'undefined') {
      throw new Error('secretOrKey 为空')
    }
    if (typeof jwtFromRequest === 'undefined') {
      jwtFromRequest = extractors.fromHeader()
    }
    let token = jwtFromRequest(ctx)
    if (token) {
      //token验证
      let err = await new Promise(resolve => {
        jwt.verify(token, secretOrKey, function (err, payload) {
          if (!err) {
            //将token解码后的内容 添加到上下文
            ctx.payload = payload
          }
          resolve(err)
        })
      })
      if (err) {
        ctx.throw(401, '身份验证不通过')
        return
      }
      await next()
    }
  }
}

module.exports = {
  checkJwt,
  extractors
}
```



## 4.在app.js中使用

```js
// 加密密钥
const SECRET = 'anyString'
// 安全路由
const NOTOKENROUTES = [
  '/v_0/api/authorization',
  '/m/v_0/api/authorization'
]
// jwt token验证
app.use(checkJwt({
  jwtFromRequest: extractors.fromHeader('authorization'),
　secretOrKey: SECRET,
  safetyRoutes: NOTOKENROUTES
}))
```

