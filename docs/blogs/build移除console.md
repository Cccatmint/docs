# build 打包移除console

`babel-plugin-transform-remove-console`



* babel.config.js 文件内容

```js
// 发布阶段需要使用的babel 插件
const prodPlugins = []

if (process.env.NODE_ENV === 'production') {
  // 处于发布模式 build
  // npm install babel-plugin-transform-remove-console --dev--save
  // 在build 命令后移除 console
  const removeConsolePlugin = ['transform-remove-console', { exclude: ['error', 'warn'] }]
  prodPlugins.push(removeConsolePlugin)
} else {
  // 不处于发布模式 build
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
       // 其他插件
    ],
    // 引入发布阶段需要使用的babel 插件
    ...prodPlugins
  ]
}

```

