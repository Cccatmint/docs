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