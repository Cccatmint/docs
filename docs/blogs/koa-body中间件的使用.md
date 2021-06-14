## 步骤
### 安装依赖与初始化项目文件夹

```js
npm i koa@next
npm i -g koa-generator // koa脚手架 koa2 --version 验证
koa2 myproject // 使用脚手架创建项目文件
npm i // 安装依赖
npm i koa-body // 中间件

```

### server

```js
const koaBody  = require('koa-body') // 引入中间件koa-body处理文件
// 配置中间件 更详细的访问文档 https://www.npmjs.com/package/koa-body
app.use(koaBody({
  multipart:true,
  formidable: {
    maxFieldsSize: 1000*1024*1024 // 设置上传文件大小限制10M
      // 此处可以使用onFileBegin:()=>{} 对文件的储存名字进行更改

  }
}))
```

路由配置（单个文件与多个文件的上传，多个文件使用for ... of 循环）

```js
const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

router.prefix('/files') // 设置公共路由前缀

router.post('/upload', async (ctx, next) => {
  // 上传单个文件
  const file = ctx.request.files.file // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  // 配置文件储存位置
  let filePath = path.join(__dirname, 'public/upload/') + `${file.name}`
  // 创建可写流
  const upStream = fs.createWriteStream(filePath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  return ctx.body = `上传文件 ${file.name} 成功`
})


router.post('/uploads', async (ctx, next) => {
  // 上传多个文件 （使用循环）

  const files = ctx.request.files.file // 获取上传文件
  // 创建可读流
  for (let file of files) {
    let reader = fs.createReadStream(file.path)
    
    // 创建可写流
    let filePath = path.join(__dirname, 'public/upload/') + `${file.name}`
    let upStream = fs.createWriteStream(filePath)
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
  }
  
  // return ctx.body = `上传文件 ${files} 成功`
  return ctx.body = `上传文件成功`
})

module.exports = router

```

### client

```html
  <form
    action="http://localhost:3000/files/uploads"
    method="post"
    enctype="multipart/form-data"
  >
    <input type="file" name="file" id="file" value="" multiple="multiple"/>
    <input type="submit" value="提交文件"/>
</form>
```

