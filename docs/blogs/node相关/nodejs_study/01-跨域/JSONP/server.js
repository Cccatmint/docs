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