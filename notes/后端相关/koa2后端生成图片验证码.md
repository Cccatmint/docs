# Koa2后端生成图片验证码基于svg-captcha

主要依赖于svg-captcha这个库

`npm i svg-captcha --save`

```js
const svgCaptcha = require('svg-captcha')

router.get('/yanzhengma', async (ctx, next) => {
 
  const cap = svgCaptcha.create({
    size: 4, // 验证码长度
    width:160,
    height:60,
    fontSize: 50,
    ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
    noise: 2, // 干扰线条的数量
    color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    background: '#eee' // 验证码图片背景颜色
  })
  
  let img = cap.data // 验证码
  let text = cap.text.toLowerCase() // 验证码字符，忽略大小写
 
  // 设置响应头
  ctx.response.type = 'image/svg+xml';
 
  ctx.body = img;
    
    // 或者 
    // ctx.body = {img, text} 不设置响应头，图片以svg格式返回
}
});

```

 