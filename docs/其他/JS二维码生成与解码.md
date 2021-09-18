# JavaScript 二维码生成与解码

<em>仅提供简单例子，详细请查看官网</em>

## 1.生成二维码 赖于qrcode 

>https://www.npmjs.com/package/qrcode

`npm i qrcode`

## 2.解码 依赖于jsQR 和 jimp

> https://github.com/soldair/node-qrcode/issues/129

<em>qrcode库没有解码功能，从issues 129找到推荐的库jsQR</em>

jsQR 

> https://github.com/cozmo/jsQR

jimp

> https://www.npmjs.com/package/jimp

```
npm i jimp
```

```
npm install jsqr --save
```

## 3.封装函数

```js
/**
 * @author cao9710@outlook.com
 * @description 使用QRCode jsQR Jimp js库创建的简陋的二维码生成与解码工具函数
 * @time 2021年9月15日
 */

// 二维码生成与解码
import QRCode from 'qrcode' // https://www.npmjs.com/package/qrcode
import jsQR from 'jsqr' // https://www.npmjs.com/package/jsqr
import Jimp from 'jimp' // https://www.npmjs.com/package/jimp
import { Notify } from 'vant'

const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text)
  } catch (error) {
    Notify({ type: 'danger', message: `生成二维码错误-${error}` })
  }
}

const downloadURI = (url, fileName) => {
  let link = document.createElement('a')
  link.download = fileName
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  link = null
}

// translate string to qrcode and download
const getQRImageFile = async (text, fileName) => {
  // uri -> download file
  // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#attr-download
  const dataUrl = await QRCode.toDataURL(text)
  downloadURI(dataUrl, fileName)
}

// file -> buffer
const fileToBuffer = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

const decodeQR = async (file) => {
  const buffer = await fileToBuffer(file)
  const imageData = await Jimp.read(buffer)
  const uint8Array = imageData.bitmap.data
  const qrResult = jsQR(uint8Array, imageData.bitmap.width, imageData.bitmap.height)
  return qrResult
}

export {
  generateQR,
  decodeQR,
  getQRImageFile,
  downloadURI
}

```

