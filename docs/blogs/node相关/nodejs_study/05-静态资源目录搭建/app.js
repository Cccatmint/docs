const http = require('http')
const url = require('url')
const path = require('path')
const readStaticFile = require('./fileStatic.js')

const app = http.createServer((req, res) => {

  let urlString = req.url
  let filePathName = path.join(__dirname, './public', urlString)
  let fileData = readStaticFile(filePathName)

  res.write(fileData)
  res.end()
})

app.listen(7777, () => {
  console.log('监听7777端口')
})