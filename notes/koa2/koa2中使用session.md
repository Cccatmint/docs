# Koa2中使用session

## 1. 安装

`npm i koa-session`



## 2. 基本使用

```js
ctx.session.xxxx = xxxxxx
```



```js
const session = require('koa-session')
const Koa = require('koa')

const app = new Koa()

app.keys = ['some secret hurr']; // 加密 cookie 的密钥

const CONFIG = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
  };

  app.use(session(CONFIG, app))

  app.use(ctx => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;
  
    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
  });

  app.listen(3000, () => {
      console.log('PORT 3000');
  })
```



## 3. session 与 cookie的区别

1、cookie 数据存放在客户的浏览器上，session 数据放在服务器上。 

2、cookie 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗 

考虑到安全应当使用 session。 

3、session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 

考虑到减轻服务器性能方面，应当使用 COOKIE。 

4、单个 cookie 保存的数据不能超过 4K，很多浏览器都限制一个站点最多保存 20 个 cookie
