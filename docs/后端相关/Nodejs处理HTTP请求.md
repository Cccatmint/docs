### Requset(req) / Response(res)

要拿到request和response 需要有web服务

nodejs如何监听http请求

------

启动web server

```
本机的ip: 172.0.0.1
域名localhost
```

```javascript
// 先要启动web服务
// index.js文件内容
const http = require('http') // commonjs引入模块的方式，http为系统模块层级

const server = http.createServer((req, res) => {
  console.log('已经收到http请求')
})

server.listen(3000)  // 监听3000端口的http请求
console.log('http 请求已被监听， 3000端口，请访问http://localhost:3000')

```

```javascript
// $命令行中
node index.js 
// 这样就启动服务了，可以使用ctrl+c中断
```

```javascript
npm init
// 安装nodemon
npm install nodemon --save-dev
// 并且在package.json 中添加dev指令，这样就不需要使用node index.js了，并且能够监听nodejs源代码的修改
"dev": "nodemon index.js"
```

------

### 如何拿到req和res

请求时会自动用GET请求 favicon .ico

```javascript
const http = require('http') 
const server = http.createServer((req, res) => {
  const url = req.url //拿到req的url
  console.log(url)
  res.end('hello world') // res 返回信息给前端
})

server.listen(3000)  
```



### 定义路由

```javascript
// 从 req 中获得 method 和 url
const http = require('http') 
const server = http.createServer((req, res) => {
  // ---获取url 和 method
  const url = req.url
  // ---截取path以去除参数
  const path = url.split('?')[0]
  const method = req.method
  // ---自定义路由：模拟获取留言板列表
  // ---要求url 和 method 符合要求
  if (path === '/api/list' && method === 'GET') {
      res.end('this is list router') // res的返回
  } else {
    res.end('404') // res的返回
  }
})

server.listen(3000)  
```

拿到req中的url和method

```javascript
const server = http.createServer((req, res) => {
  // ---获取url 和 method
  const url = req.url
  // ---截取path以去除参数
  const path = url.split('?')[0]
  const method = req.method
  })
```

定义post路由（模拟留言版的获取留言列表、创建留言）

测试路由使用postman 发送post请求来测试比较简单（需要安装postman https://www.postman.com/）

```javascript
const http = require('http') 
const server = http.createServer((req, res) => {
  const url = req.url
  const path = url.split('?')[0]
  const method = req.method
  if (path === '/api/create' && method === 'POST') {
    res.end('this is create list router') // res的返回
  } 
  res.end('404') // res的返回
})
server.listen(3000)
```



------

### querystring(也叫url参数)

什么是querystring

```javascript
http://xxx.com/list.html?keyword=nba&lang=en&a=100
// url问号?后面的都是querystring(也叫url参数)
// &分割，key=value 形式，可继续扩展
```

querystrin的作用

```
动态网页的基石(web1.0 -> web2.0)
服务端拿到querystring
根据不同的querystring,返回不同的内容
```

:star:怎么获取querystring,并把数据结构化

- 方法1(自己获取并把数据结构化)

```javascript
  const queryStr = url.split('?')[1] //  a=10&b=2
  const query = {}
  // ---使用短路运算符，相当于if语句判断是否有queryStr
  queryStr&&queryStr.split('&').forEach(item => {
    // item 即 a=10 的形式
    const key = item.split('=')[0] // 'a'
    const val = item.split('=')[1] // '10'
    query[key] = val //{ a:10 }
  })
```

- 方法2 (使用自带的querystring系统模块)

```javascript
const querystring = require('querystring')  // 自带的系统模块
const queryStr = url.split('?')[1]
const query = querystring.parse(queryStr)
```

:exclamation: hash 不能被服务端获取到，所以不能再服务端根据hash 响应动态请求

```
扩展：
结构化和非结构化
结构化的数据比如：对象、数组
比如上面的 a=100&b=2 就是非结构化的
		{a:100,b:2} 就是结构化的
在编程中尽量使用结构化的数据，才能便于程序分析和判断

```

------

### res返回数据

- res.writeHead(200,{ 'Content-type': 'application/json' })
- res.end(JSON.stringify(result))

```javascript
const http = require('http') 
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  const path = url.split('?')[0]
  // ---自定义一个路由
  if (path === '/api/list' && method === 'GET') {
    const result = {
      errno: 0,
      data: [
        {user: '张三', content: '留言1'},
        {user: '李四', content: '留言2'}
      ]
    }
      // ---设置响应头状态码和相应类型
      res.writeHead(200,{ 'Content-type': 'application/json' })
      // ---JSON.sringify格式化数据
      res.end(JSON.stringify(result))
  }
})
server.listen(3000)
```

使用res设置返回的状态码，Content-type，Body

如何返回JSON数据 

```javascript
// ---设置响应头&JSON.sringify格式化数据
res.writeHead(200,{ 'Content-type': 'application/json' })
res.end(JSON.stringify(result))
```

返回简单字符串

```javascript
  // ---404
  // ---Content-type': 'text/plain 简单字符串
  res.writeHead(404,{ 'Content-type': 'text/plain' })
  res.end('404 Not Found')
```

如何返回html数据

```javascript
// --- Content-type': 'text/html 即可
res.writeHead(200,{ 'Content-type': 'text/html' })
// -------------------------------------------------------------------
res.end(`<!DOCTYPE html>
<head>
  <title>返回html格式</title>
</head>
<body>
  <h1>返回html格式的演示</h1>
</body>
</html>`)
```



### 获取req body

流      

```
流stream的概念:就像鱼缸换水时，水流一样，数据也是这样
```

```
流的表现:视频边下边播，文件上传进度条
```

服务端res.end(...),会自动以 '流' 的形式返回

浏览器会识别到流，并且持续接收数据，显示进度条



获取req body 示例

对req数据格式进行校验，接收“流”，并把“流”合称为完整的数据

```javascript
const http = require('http') 
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  const reqType = req.headers['content-type'] // 获取req的数据类型
  const path = url.split('?')[0]
  // ---自定义路由：模拟创建留言
  if (path === '/api/create' && method === 'POST') {
    
    let bodyStr = ''
    req.on('data', chunk => { // 服务端怎么识别“流”，并接收数据
      // chunk 即“流”的每一段数据
      bodyStr = bodyStr + chunk.toString()
    })
    req.on('end',() => {  // 触发end事件，服务端知道流完了
      // 对req的数据类型进行校验
      if (reqType === 'application/json'){
        const body = JSON.parse(bodyStr)
        console.log('bodyStr is', body)
        res.end('接收完成')
      }
    })
    return // 异步的，所以return 防止命中404
  } 
  res.writeHead(404,{ 'Content-type': 'text/plain' })
  res.end('404 Not Found')
})
server.listen(3000)

```

----