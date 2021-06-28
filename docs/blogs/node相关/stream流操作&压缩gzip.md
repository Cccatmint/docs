# 流的操作Stream 与压缩 Zlib



[zlib中文文档]: https://www.nodeapp.cn/zlib.html

 `zlib`模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能，可以通过这样使用它： 

```js
const fs = require('fs')

const zlib = require('zlib')
const gzip = zlib.createGzip()

const inp = fs.createReadStream('./note.txt')
const out = fs.createWriteStream('./note.gzip')

inp
  .pipe(gzip)
  .pipe(out)
```



数据的压缩或者解压也可以用一个步骤完成

```js
const input = '.................................';
zlib.deflate(input, (err, buffer) => {
  if (!err) {
    console.log(buffer.toString('base64'));
  } else {
    // 错误处理
  }
});

const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
zlib.unzip(buffer, (err, buffer) => {
  if (!err) {
    console.log(buffer.toString());
  } else {
    // 错误处理
  }
});
```

