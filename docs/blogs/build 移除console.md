# build 打包移除console

`babel-plugin-transform-remove-console`



babel.config.js

```js
module.exports = {
  plugins: [
    // babel-plugin-transform-remove-console
    // 在build 命令后移除console
   // babel-plugin-transform-remove-console
    // 在build 命令后移除console
    ['transform-remove-console', { exclude: ['error', 'warn'] }]
}
```

