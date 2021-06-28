const crypto = require('crypto')

const password = 'cccatmint haha!'
const hash = crypto
  .createHash('sha256') // 加密算法
  .update(password) // 待加密内容
  .digest('hex') // 16进制

  console.log(hash)
// 2e87660e91e15f376bd2883bc95dafe8d38e5a7ee5af5dc5386d241219b1461a