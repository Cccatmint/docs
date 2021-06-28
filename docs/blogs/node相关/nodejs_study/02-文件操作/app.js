const fs = require('fs')

// 创建文件夹
fs.mkdir('./logs', (err) => {
  if(err) throw err
  console.log('create done.')
})

// 更改文件夹名称
fs.rename('./logs', './newName', (err) => {
  if(err) throw err
  console.log('change done.')
})

// 删除文件夹
fs.rmdir('./logs', () => {
  console.log('remove done.');
})

// 读取文件夹
fs.readdir('./logs', (err, result) => {
  if (err) throw err
  console.log(result)
  console.log('read done.')
})

// 写文件
fs.writeFile('./logs/test.log', 'test test\nabaaba', (err) => {
  if (err) throw err
})

// 给文件追加内容
fs.appendFile('./logs/test.log', 'add message', err => {
  if (err) throw err
  console.log('append done.')
})

// 删除文件
fs.unlink('./logs/toremove.txt', err => {
  if (err) throw err
  console.log('unlink done.')
})

// 读取操作
fs.readFile('./logs/test.log', 'utf-8', (err, content) => {
  if (err) throw err
  console.log(content)
})

fs.readFile('./logs/test.log', (err, content) => {
  if (err) throw err
  console.log(content.toString())
})