在 Koa2 中使用路径别名，可以使用 `module-alias` 模块。

首先，安装 `module-alias`：

```
npm install module-alias --save
```

然后，在项目的根目录下新建一个 `package.json` 文件，并在里面配置路径别名，例如：

```
  "_moduleAliases": {
    "@db": "db",
    "@models": "db/models"
  }
```

接着，在你的项目入口文件（例如 `app.js`）中，加载 `module-alias` 模块：

```
require('module-alias/register')
```

这样，你就可以在代码中使用路径别名了。例如：

```
const Controller = require('@controllers/Controller')
```

这样，就可以使用路径别名来简化文件路径的书写，使代码更加简洁易读。

