# JS借助第三方库生成二维码与解码

参考

> https://github.com/soldair/node-qrcode/issues/129

`npm i jimp` 处理图片数据（用于生成jsqr需要的数据）
`npm i jsqr` 解码
`npm i qrcode` 生成二维码

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

// 生成
const generateQR = async text => {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
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
// 解码
const decodeQR = async (file) => {
  const buffer = await fileToBuffer(file)
  const imageData = await Jimp.read(buffer)
  const uint8Array = imageData.bitmap.data
  const qrResult = jsQR(uint8Array, imageData.bitmap.width, imageData.bitmap.height)
  return qrResult
    // get result from qrResult.data
}

export {
  generateQR,
  decodeQR
}

```



