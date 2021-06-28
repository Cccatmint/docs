# nodejs 静态资源目录搭建

## 说明: 用到的第三方库 mime

`npm i mime`

`mime` 可以把文件类型和文件mime类型互相转换用mime.getType() 和 mime. getExtension() 

通过这个库可以得到的mime 类型，更方便的写`Content-Type`

```js
const mime = require('mime');

mime.getType('txt');                    // ⇨ 'text/plain'
mime.getExtension('text/plain');        // ⇨ 'txt'
```



## 正式内容

readStaticFile.js

```js
// 引入依赖的模块
var path = require('path')
var fs = require('fs')
var mime = require('mime')

function readStaticFile(res, filePathname) {
  // 获取文件后缀名
  var ext = path.parse(filePathname).ext
  // 通过文件后缀名获得mime类型
  var mimeType = mime.getType(ext)

  // 判断路径是否有后缀, 有的话则说明客户端要请求的是一个文件 
  if (ext) {
    // 根据传入的目标文件路径来读取对应文件
    fs.readFile(filePathname, (err, data) => {
    // 错误处理
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.write("404 - NOT FOUND")
        res.end()
      } else {
        res.writeHead(200, { "Content-Type": mimeType })
        res.write(data)
        res.end()
      }
    });
    // 返回 true 表示, 客户端想要的 是 静态文件
    return true
  } else {
    // 返回 false 表示, 客户端想要的 不是 静态文件
    return false
  }
}

// 导出函数
module.exports = readStaticFile
```



server.js

```js
// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
// 引入自定义的模块
var readStaticFile = require('./readStaticFile.js');

// 搭建 HTTP 服务器
var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url);
  var urlPathname = urlObj.pathname;
  // 设置server.js目录下的public文件夹为静态资源目录
  var filePathname = path.join(__dirname, "/public", urlPathname);

  // 读取静态文件
  readStaticFile(res, filePathname);
});

// 在 3000 端口监听请求
server.listen(7777, () => {
  console.log("正在监听 7777 端口:")
})
```

