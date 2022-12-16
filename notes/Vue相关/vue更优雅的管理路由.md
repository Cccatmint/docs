# vue管理路由（大量路由的情况下）

## 目的：

​	拆分多个文件管理大量路由，使之维护更加方便



## 知识点:

webpack API `require.context()`

> https://webpack.docschina.org/guides/dependency-management/#context-module-api



## 代码:

├─router
│      index.js
│      login.routes.js
│
└─views
        demo.vue
        Home.vue



**src/router/index.js**

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routerList = []

// 引入路由
function importAll(r) {
  r.keys().forEach(key => {
    routerList.push(r(key).default)
  })
}

// 动态引入
// > https://webpack.docschina.org/guides/dependency-management/#context-module-api
//   => 是webpack API 用于动态的引入文件
// require.context() 接受三个参数1.路径 2.是否匹配子级文件 3.匹配规则
importAll(require.context('./', false, /\.routes\.js/))

const routes = [
  ...routerList,
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

export default router
```



**src/router/login.routes.js**

```js
// 子模块
export default {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue'),
    children: []
}
```



**之后其他的路由都可以写成 xxx.routes.js的形式用于分块管理**