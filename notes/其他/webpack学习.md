# webpack学习

## 基本安装 

首先我们创建一个目录，初始化 npm，然后 [在本地安装 webpack](https://webpack.docschina.org/guides/installation#local-installation)，接着安装 [`webpack-cli`](https://github.com/webpack/webpack-cli)（此工具用于在命令行中运行 webpack）：

```
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

## npm 脚本

**package.json**

使用 `--config webpack.config.js` 来使用配置文件

```
{
  "name": "webpackdemo",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "build": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.46.0",
    "webpack-cli": "^4.7.2"
  }
}

```



## 使用一个配置文件 

在 webpack v4 中，可以无须任何配置，然而大多数项目会需要很复杂的设置，这就是为什么 webpack 仍然要支持 [配置文件](https://webpack.docschina.org/concepts/configuration)。这比在 terminal(终端) 中手动输入大量命令要高效的多，所以让我们创建一个配置文件：

（ 如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它 ，其他名字需要 使用 `--config` 选项 ）

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```



