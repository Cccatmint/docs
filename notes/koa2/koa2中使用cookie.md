# koa2 中使用cookie

## 1.设置cookie

`ctx.cookies.set(key, value, [options])`

```js
router.get('/set_cookie', async ctx => {
    // ! 在koa中设置cookie
    ctx.cookies.set('cookieName', 'cookieValue', {
        maxAge:  24*60*60*1000, // 秒数为 0 或 -1 将会使 cookie 直接过期  Max-Age 优先级比expires更高
        expires:  'Date: Wed, 21 Oct 2025 07:28:00 GMT', // cookie 的最长有效时间，形式为符合 HTTP-date 规范的时间戳
        path:  '/', // cookie 路径, 默认是'/'
        domain:  "localhost", // 指定 cookie 可以送达的主机名。假如没有指定，那么默认值为当前文档访问地址中的主机部分（但是不包含子域名）
        secure:  false, // 只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器
        httpOnly:  true, // 设置了 HttpOnly 属性的 cookie 不能使用 JavaScript 经由  Document.cookie 属性、XMLHttpRequest 和  Request APIs 进行访问，以防范跨站脚本攻击。
        // overwrite: false
    })
    ctx.body  = "cooKie"
})
```



## 2.获取cookie

`ctx.cookies.get(key)`

```js
router.get('/get_cookie', async ctx => {
    // ! 在koa中获取cookie
    ctx.body  = ctx.cookies.get('cookieName')
})
```



## 3.中文cookie

如果直接设置中文cookie会报错 ”TypeError: argument value is invalid“

需要base64转换一遍

使用Buffer.from() 替换new Buffer()

> (node:17104) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.

```js
// ! 中文cookie
router.get('/set_chinese_cookie', async ctx => {
    ctx.cookies.set('chineseCookie', Buffer.from('中文Cookie').toString('base64'))
})

router.get('/get_chinese_cookie', async ctx => {
    ctx.body = Buffer.from(ctx.cookies.get('chineseCookie'), 'base64').toString()
})
```

