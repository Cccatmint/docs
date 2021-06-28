const path = require('path')
// mime 第三方包 可以根据扩展名获得mimeType类型 比如：mime.getType('txt')  return 'text/plain'
// 用于设置content-Type
const mime = require('mime')
const fs = require('fs')

function readStaticFile (filePathName) {
  let ext = path.parse(filePathName).ext // 获取扩展名
  let mimeType = mime.getType(ext)
  
  // 判断文件是否存在
  if (fs.existsSync(filePathName)) {
    console.log('文件存在')
  } else {
    console.log('文件不存在')

  }
  
  return 'hellxo'
}

module.exports = readStaticFile