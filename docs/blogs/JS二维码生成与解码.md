# JavaScript 二维码生成与解码

<em>仅提供简单例子，详细请查看官网</em>

## 生成

依赖于第三方库qrcode 

>https://www.npmjs.com/package/qrcode

`npm i qrcode`

### ES6/ES7

```
// With promises
QRCode.toDataURL('I am a pony!')
  .then(url => {
    console.log(url)
  })
  .catch(err => {
    console.error(err)
  })
  
// With async/await
const generateQR = async text => {
  try {
    console.log(await QRCode.toDataURL(text))
  } catch (err) {
    console.error(err)
  }
}
```

生成的图片base64给img标签的src即可展示



## 解码 依赖于jsQR 和 jimp

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