# crypto (加密)

> 官方中文文档 https://www.nodeapp.cn/crypto.html

`crypto` 模块提供了加密功能，包含对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

使用 `require('crypto')` 来访问该模块。

example 1

```js
const crypto = require('crypto');

const secret = 'abcdefg';
const hash = crypto
	.createHmac('sha256', secret) // 定义算法
    .update('I love cupcakes') // 定义需要加密的内容
    .digest('hex'); // 定义加密的形状
console.log(hash);
// Prints:
//   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
```



example 2

```js
const crypto = require('crypto')

const password = 'cccatmint haha!'
const hash = crypto
  .createHash('sha256') // 加密算法
  .update(password) // 待加密内容
  .digest('hex') // 16进制

  console.log(hash)
// 2e87660e91e15f376bd2883bc95dafe8d38e5a7ee5af5dc5386d241219b1461a
```

