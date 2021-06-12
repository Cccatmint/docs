

需要在生命周期钩子中写

这里是写在setup()中

返回config是固定写法

axios.interceptors.request.use()

axios.interceptors.response.use()





```vue
<template>
  <div class="home">
    <button @click="handleClick">添加Item</button>
    <div v-if="loading">loading</div>
    <div class="content" v-if="message" >{{ message }}</div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
  name: 'Home',
  components: {

  },
  setup () {
    const message = ref('')
    const loading = ref(false)
    const handleClick = () => {
      axios.get('https://www.fastmock.site/mock/a5f5496ab0316a4d732fa55a2ca0c1f6/study/api/test')
        .then(response => {
          console.log(response.data)
          message.value = response.data.message
        }).catch(err => console.error(err))
    }

    axios.interceptors.request.use((config) => {
      loading.value = true
      console.log('我要请求拉')
      return config
    })

    axios.interceptors.response.use((config) => {
      loading.value = false
      console.log('收到响应啦')
      return config
    })

    return {
      message,
      loading,

      handleClick
    }
  }
}
</script>

```

