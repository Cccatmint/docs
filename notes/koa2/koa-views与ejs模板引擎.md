# 使用koa-views配置模板引擎



## 安装koa-views第三方中间件

`npm i koa-views --save`



## 安装需要的模板引擎

此处举例使用的是ejs模板引擎

`npm i ejs --save`



## 配置并指定模板引擎

此处指定的引擎为ejs

两种配置方式

- 配置方式1要求被渲染的文件后缀名是ejs

- 配置方式2要求被渲染的文件后缀名是html

```js
const koa = require('koa')
const app = new koa()
const router = require('koa-router')()

const views = require('koa-views');

// // ! 指定模板引擎方式1
// const render = views(__dirname + '/views', { extension: 'ejs' })

// ! 指定模板引擎方式2
const render = views(__dirname + '/views', {
    map: {
        html: 'ejs'
    }
})

app.use(render)

router.get('/', async (ctx, next) => {
    // // 配置方式1
    // await ctx.render('index.ejs')
    
    // 配置方式2
    await ctx.render('index.html')
})


app.use(router.routes())

app.use(router.allowedMethods())

app.listen(3000, () => {
    console.log('listening at port 3000')
})
```



## ejs引擎

> npm https://www.npmjs.com/package/ejs

### 公共数据

- 数据写在路由中，其他路由不能共享这些数据

  ```js
  router.get('/', async (ctx, next) => {
      await ctx.render('index.ejs',{
          title: "This is title.",
          arr: ["a", "b", "c", "d"],
          htmlStr: "<h3>h3标签内容</h3>",
          isShow: false
      })
  })
  ```

  



- 可以写一个中间件配置公共的信息,所有ejs模板可以获取

  app.js

  ```js
  app.use(async (ctx, next) => {
      ctx.state.userInfo = {
          name: 'userName',
          age: 999
      }
      console.log(ctx.state)
      await next()
  })
  
  router.get('/', async (ctx, next) => {
      await ctx.render('index.ejs')
  })
  ```

  index.ejs

  ```ejs
  <%=userInfo.name%>
  ```

  

### 绑定数据

```ejs
<%=title%>
```

### 绑定html数据

```ejs
<%-htmlStr%>
```

### 循环渲染

```ejs
<%for(let i = 0; i<arr.length; i++){%>
        <li><%=arr[i]%></li>
<%}%>
```

### 条件判断

```ejs
<%if(isShow){%>
        <div>isShow == true</div>
    <%} else {%>
        <div>isShow == true</div>
<%}%>
```

### 公共模板

h.ejs

```ejs
<h1>
    ???
</h1>
<p><%=userInfo.age%></p>
```

引入到Index.ejs中

```ejs
<%- include('h.ejs', {})%>
```

