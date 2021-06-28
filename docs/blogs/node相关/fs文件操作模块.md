# fs文件操作模块

*错误优先的回调* `(err, foo)=> { if(err) throw err }`

## 1.文件夹

### 1.1 新建文件夹 
`fs.mkdir` make directory

```js
const fs = require('fs')

fs.mkdir('./logs', (err) => {
  if(err) throw err
  console.log('create done.')
})
```

### 1.2 更改文件夹名称

`fs.rename`

```js
const fs = require('fs')

fs.rename('./logs', './newName', (err) => {
  if(err) throw err
  console.log('change done.')
})
```
### 1.3 删除文件夹

`fs.rmdir` remove directory

```js
const fs = require('fs')

fs.rmdir('./logs', (err) => {
 if(err) throw err
  console.log('remove done.');
})
```

### 1.5 读取文件夹内容

`fs.readdir`

```js
const fs = require('fs')

fs.readdir('./logs', (err, result) => {
 if(err) throw err
  console.log(result) // ['xxx', 'xxxxx', 'xxx']
  console.log('remove done.'); 
})
```

## 2. 文件

### 2.1 写文件

`fs.writeFile`

```js
const fs = require('fs')

fs.writeFile('./logs/test.log', 'test test\nabaaba', (err) => {
  if (err) throw err
})

```

### 2.2 给文件追加内容

`fs.appendFile

```js
const fs = require('fs')

fs.appendFile('./logs/test.log', 'add message', err => {
  if (err) throw err
  console.log('append done.')
})
```

### 2.3 删除文件

`fs.unlink`

```js
const fs = require('fs')

fs.unlink('./logs/toremove.txt', err => {
  if (err) throw err
  console.log('unlink done.')
})
```

### 2.4 读取操作

#### 2.4.1 异步读取

`fs.readFile`

下面content 读取内容为Buffer 格式

使用下面utf-8 转码 或者 .toString() 获得文件内容

```js
const fs = require('fs')

// 异步读取文件：方法一
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
  console.log(content)
  console.log(0)
})
console.log(1)

// 异步读取文件：方法二
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
  console.log(result)
})

// 异步读取文件：方法三
function getFile() {
  return new Promise((resolve) => {
    fs.readFile('./logs/log-0.txt', 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

;(async () => {
  console.log(await getFile())
})()

// 异步读取文件：方法四
const fsp = fsP.readFile('./logs/log-1.txt', 'utf-8').then((result) => {
  console.log(result)
})

console.log(fsP)
```

#### 2.4.2 同步读取

```js
const fs = require('fs')

try {
  const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
  console.log(content)
  console.log(0)
} catch (e) {
  console.log(e.message)
}

console.log(1)

```







### 2.5 watch 监听文件变化

```js
const fs = require('fs')

fs.watch('./logs/log-0.txt', () => {
  console.log('file changed.')
})
```