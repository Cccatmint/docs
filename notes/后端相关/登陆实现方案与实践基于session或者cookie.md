# 登陆实现方案与实践基于session或者cookie

## cookie

### 1. nodejs操作http 原生

```javascript
// 服务端操作cookie
const http = require('http')

const server = http.createServer((req, res) => {

    // // ---设置 cookie 到 res
    res.setHeader('Set-Cookie', 'b=5')

    // // ---获取 cookie 从 req
    const cookieStr = req.headers.cookie
    console.log('cookie is', req.headers.cookie)

    // --- 结构化 cookie
    // cookieStr: 'a=100; b=5' --> { a:100, b=5 }
    const cookieObject = {}
    cookieStr.split(';').forEach(cookieItemStr => {
        const arr = cookieItemStr.trim().split('=')
        const key =arr[0] // 'a'
        const val = arr[1]  // '100'
        cookieObject[key] = val
    })
    console.log(cookieObject)


    res.end('cookie test')
})

server.listen(3000)

console.log('server listening on 300 port')
```

### 2. koa2 操作 cookie
```javascript
// koa2 操作cookie
const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
    
    // ---设置 cookie
    ctx.cookies.set('a',101)

    // ---获取 cookie
    console.log('cookie a is ', ctx.cookies.get('a'))

    // cookie 的结构化 koa2 已经做好了

    ctx.body = 'cookie test by Koa2'
    
})


app.listen(3000)

console.log('server listening on 300 port')
```

## session

因为 cookie 中不宜存储用户的真实敏感信息，所以储存一个 userId 标识，userId 标识对应着 session 里的用户信息

### 使用koa2 实现登录

<b>用npm 安装插件 koa-generic-session</b>来方便的操作session

`npm install koa-generic-session --save`

在koa2 脚手架创建的app.js 中引入改功能

```javascript
const session = require('koa-generic-session') //---引入koa session 插件


// ---使用koa session 中间件
app.keys = ['akdfaiekUdafsdfiIOUSdU%$&#'] // 密钥
// 自动配置了 cookie 和 session

app.use(session({
  // 配置 cookie
  cookie: {
    path: '/', // 配置 cookie在根目录下有效 
    httpOnly: true, // cookie 只允许服务端来操作
    maxAge: 24*60*60*1000 // 规定cookie 的过期时间，单位ms
  }
}))
```

在routes/index.js 中创建路由来操作session

```javascript
// ---测试 session, 记录访问次数,自定义一个viewcount 来存储登录次数
// ---session 常用于登录，储存登录信息(cookie对应)
router.get('/session-test', async(ctx, next) => {
  if (ctx.session.viewcount == null) {
    // 用户尚未访问，初始化次数0
    ctx.session.viewcount = 0
  }
  // 用户访问过了，次数递增
  ctx.session.viewcount++ 

  // 返回
  ctx.body = {
    title: 'session-test',
    viewcount : ctx.session.viewcount
  }
})
```

在routes/users.js 中模拟登录成功和登录失败以及登录验证(记得访问时要加 `/users`前缀)

```javascript
// 模拟登录
router.get('/login-mock',async(ctx, next) => {
  const query = ctx.query // url 参数，querystring
  if (query.username) {
    // 模拟登录成功
    ctx.session.userInfo = {
      username: query.username
    } 
    str = '登陆成功'
  } else {
    // 模拟登录失败,不用处理session
    str = '登陆失败'
    }
  ctx.body = str
})

// 模拟登录验证
router.get('/login-check-mock', async(ctx, next) => {
  ctx.body = ctx.session.userInfo || {}
})
```

### 登录对接数据库

以上都是模拟登录，接下来真实连接数据库

回顾 mongodb 和 mongoose

首先需要连接数据库: 在根目录下创建`db`文件夹

#### 1 在`db`文件夹下创建db.js 来连接数据库

``` javascript
// 连接数据库 (mongodb 的服务端)

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'comment2'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', true)

// 开始连接数据库
mongoose.connect(`${url}/${dbName}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const conn = mongoose.connection

conn.on('error', err => {
  console.errer('mongoose 连接出错', err)
})

module.exports = mongoose
```

#### 2 规范数据模型

```javascript
// 数据模型 (规范数据格式)

const mongoose = require('./db.js')

// 定义 Schema (数据规范)
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // 唯一，不重复
  },
  password: String,
  age: Number,
  city: String,
  gender: {
    type: Number,
    default: 0 // 默认值 0 保密， 1 男， 2 女   
  }
}, {
    timestamps: true // 时间戳，自动添加文档的创建时间
})

// 定义 Model
const User = mongoose.model('user', UserSchema)

module.exports = {
  User
}
```

#### 3 可以使用mongodb compass 通过图形界面操作数据库

#### 4 在routes/users下创建 连接数据库的登录路由

```javascript
// 登录 (对接数据库的)-------
// 暂时使用get 代替，这样不用跨域
router.get('/login', async (ctx, next) => {
  const { username, password } = ctx.query // get请求
  // const { username, password } = ctx.request.body // post请求

  const user = await User.findOne({
    username: username,
    password: password
  })

  if (user != null) {
    // 登录成功
    ctx.session.userInfo = user // 所有的用户信息
    // 登录成功后返回的数据
    ctx.body = {
      errno: 0,
      data: user
    }
  } else {
    // 登录失败，不用操作session
    ctx.body = {
      errno: -1,
      message: '用户名或密码错误'
    }
  }
})
```

#### 5 创建登录校验中间件

在根目录下创建`midlewares`文件夹

文件夹下创建`loginCheck.js`中间件文件，内容如下

```javascript
async function loginCheck (ctx, next) {
    const userInfo = ctx.session.userInfo
    if (ctx.session && userInfo.username) {
        // 登录验证成功
        await next()
    } else
    {
        ctx.body = {
            errno: -1,
            message: '请登录'
        }
    }
}

module.exports = loginCheck
```

#### 6 使用自定义中间件的方法

```javascript
// 先在路由中引入自定义的中间件
const loginCheck = require('../middlewares/loginCheck.js')

// 然后定义路由时， 直接插在中间作为参数即可
router.get('/list',loginCheck, async (ctx) => {
    ctx.body = 'api list'
})

```

