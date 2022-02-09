# 使用vue自定义指令进行按钮级别的权限管理

## 知识点：

vue自定义指令

> https://cn.vuejs.org/v2/guide/custom-directive.html



## 代码:

**main.js**

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

function checkArray(key) {
  // arr为模拟权限(从后端获取)
  let arr = ["roleA"]
  return arr.includes(key)
}

Vue.config.productionTip = false

Vue.directive('display-key', {
  // 元素插入
  inserted(el, binding) {
    let displayKey = binding.value
    if(displayKey) {
      // 权限校验
      let hasPermission = checkArray(displayKey)
      if(!hasPermission) {
        // 无权限 则删除DOM
        el.remove()
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## 在组件中使用:

```vue
<template>
  <div>
    <p>{{ msg }}This is demo page.</p>
    <button v-display-key="'roleA'">需要roleA才可见的按钮</button>
    <button v-display-key="'roleB'">需要roleB才可见的按钮</button>
    <button>都可见的按钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello,",
    };
  },
};
</script>
```



## 表现

![aeFma.png](https://u.vmpic.cn/2022/02/10/aeFma.png)

