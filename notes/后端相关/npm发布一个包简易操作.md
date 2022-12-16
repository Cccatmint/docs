node packpage version

- 13.4.6
- major: 13, minor: 4, patch: 6

## npm 版本符号

- `^` 锁定 major
- `~ ` 锁定minor
- `空` 锁定patch
- `*` 锁定最新

搭配 `npm update` 使用更新为最新的包



## 发npm 包

举例

### 1.先写一个包

`npm init`

package.json 内容

```json
{
  "name": "xzczxczxc",
  "version": "1.0.0",
  "description": "",
  "main": "xxzx.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "xxzx": "^1.0.0"
  }
}
```

入口文件内容 xxzx.js

```js
const _ = require('lodash')

function myChunk (arr){
  return _.chunk(arr,2)
}

module.exports = myChunk
```

### 2. 发出去

执行 `npm adduser`

输入username password mail

再执行 `npm bulish`

- 坑：

  npm 的源需要使用https://registry.npmjs.org/

  输入如下内容配置

  npm config get registry // 查看npm当前镜像源

  npm config set registry https://registry.npmjs.org/ // 配置为官方的源