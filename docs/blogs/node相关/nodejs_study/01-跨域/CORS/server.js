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