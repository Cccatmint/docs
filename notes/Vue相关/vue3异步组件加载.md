# Vue3中组件异步加载

> https://blog.csdn.net/weixin_39841838/article/details/109326857 

## 简单使用方法

```vue
<template>
  <div class="home">
    <button @click="handleClick">加载List组件</button>
    <template v-if="show">
      <List />
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
export default {
  name: 'Home',
  components: {
    List: defineAsyncComponent(() => import(/* webpackChunkName: "ListComponent" */ '../components/List'))
  },
  setup () {
    const show = ref(false)
    const handleClick = () => { show.value = !show.value }

    return {
      show,
      handleClick
    }
  }
}
</script>
```



## 高级用法（由loadingComponent 和 errorComponent）

```vue
<template>
  <div class="home">
    <button @click="handleClick">加载List组件</button>
    <template v-if="show">
      <AsyncList />
    </template>
  </div>
</template>

<script>
import LoadingCmp from '../components/LoadingCmp'
import ErrorCmp from '../components/ErrorCmp'
import { defineAsyncComponent, ref } from 'vue'

const AsyncList = defineAsyncComponent({
  loader: () => import('../components/List'),
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorCmp,
  loadingComponent: LoadingCmp
})

export default {
  name: 'Home',
  components: {
    AsyncList
  },
  setup () {
    const show = ref(false)
    const handleClick = () => { show.value = !show.value }

    return {
      show,
      handleClick
    }
  }
}
</script>

```
