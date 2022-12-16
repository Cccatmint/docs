# Node.js 后端解决跨域问题

## 1.1 JSONP

JSONP 是JSON with padding 的缩写，即带填充的JSON

前端代码 index.html

```html
<!DOCTYPE html>
<body>
  <div id="infobox">string...</div>
</body>

<script>
  const infobox = document.querySelector('#infobox')

  const jsonCallbackFunction = function (data) {
    infobox.innerHTML = `<p>${JSON.stringify(data)}</p>`
  }

</script>

<script src="http://localhost:7777/api?callback=jsonCallbackFunction"></script>
</html>
```

后端代码 server.js

```js
const http = require('http')
const url = require('url')
const querystring = require('querystring')

const data = JSON.stringify({
  name: 'foo',
  address: 'bar'
})

const app = http.createServer((req, res) => {
  const urlObj = url.parse(req.url)
  const callbackName = querystring.parse(urlObj.query).callback
  res.end(`${callbackName}(${data})`)
})

app.listen(7777, () => {
  console.log('localhost:7777')
})
```

## 1.2 CORS

CORS 是 Cross-origin resource sharing 的缩写，即跨域资源共享

前端代码 index.html

```html

<body>
  <button id="btn">click here to build a request!</button>
</body>
<script>
  const getData = () => {
    fetch('http://localhost:7777/api/data')
    .then(response => {
      return response.json() // json() 方法接收一个 Response 流，并将其读取完成,返回一个 Promise
    })
    .then(myJson => {
      console.log(myJson)
    })
  }

  const btn = document.querySelector('#btn')
  btn.addEventListener('click', getData)
 
</script>

```

后端代码 server.js

```js
const http = require('http')
const url = require('url')

const app = http.createServer((req, res) => {

  let urlObj = url.parse(req.url)
  switch (urlObj.pathname) {
    case '/api/data':
      res.writeHead(200, {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
      res.write('{"name": "foo", "address": "bar"}')
      break;
  
    default:
      break;
  }
  res.end()
})

app.listen(7777, () => {
  console.log('监听7777端口')
})
```



## 1.3 中间件代理

`npm i http-proxy-middleware`

前端代码 index.html

```html
<body>
  <button id="btn">click here to build a request!</button>
</body>
<script>
  const getData = () => {

    fetch('http://localhost:7777/api/constellation/getAll?consName=%E7%8B%AE%E5%AD%90%E5%BA%A7&type=today&key=0ac3681d7f0b5891db9279534193b815')
    .then(response => {
      return response.json() // json() 方法接收一个 Response 流，并将其读取完成,返回一个 Promise
    })
    .then(myJson => {
      console.log(myJson)
    })
  }

  const btn = document.querySelector('#btn')
  btn.addEventListener('click', getData)
  
  
</script>
```

后端代码 server.js

```js
const http = require('http')
const { createProxyMiddleware }  = require('http-proxy-middleware')

const apiProxy = createProxyMiddleware('/api/constellation', {
  target: 'http://web.juhe.cn:8080',
  changeOrigin: true,
  pathRewrite: {
    '^/api/constellation': '/constellation', // rewrite path (这里是移除)
  }
})

const app = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'application/json;charset:utf-8',
    'Access-Control-Allow-Origin': '*'
  })
  console.log(req.url)
  if (/^\/api\/constellation/.test(req.url)) {
    apiProxy(req, res)
  }
})



app.listen(7777, () => {
  console.log('监听7777端口')
})
```

