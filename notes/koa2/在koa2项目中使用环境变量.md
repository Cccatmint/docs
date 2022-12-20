在 Koa2 中，你可以使用 dotenv 模块来加载环境变量。

首先，安装 dotenv：

```
npm install dotenv
```
然后，在你的项目根目录中创建一个名为 .env 的文件，并在其中定义你的环境变量。例如：

```
PORT=3000
MONGODB_URI=mongodb://localhost/my-app
```
接下来，在你的 Koa2 应用的入口文件（通常是 index.js 或 app.js）中，加载 dotenv 并调用 config() 方法：

```
require('dotenv').config();
```
这样，你就可以在你的 Koa2 应用中使用环境变量了。例如：

```
const port = process.env.PORT;
```
注意，你应该在加载环境变量之前做任何其他事情，因为环境变量可能会被用于配置其他部分的应用程序。

另外，你可以使用 dotenv-safe 模块来保证环境变量的安全性，它可以检查是否缺少必需的环境变量，并在找不到 .env 文件时引发错误。