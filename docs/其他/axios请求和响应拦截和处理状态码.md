# axios请求和相应拦截和处理HTTP状态码

`npm i axios`

> https://www.npmjs.com/package/axios#interceptors

```js
import axios from 'axios'
import store from '@/store'
import router from '@/router'

import { Notify } from 'vant'

const request = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/m/v_0/api' : 'http://1.116.13.77:3000/m/v_0/api'
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(function (config) {
  // 添加token
  const { tokenInfo } = store.state
  if (tokenInfo) {
    config.headers.Authorization = `Bearer ${tokenInfo.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
/**
 * 响应拦截器
 */
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  const status = error.response.status

  if (status === 400) {
    // 请求参数错误
    Notify({ type: 'danger', message: `${error.response.data.msg}` })
  } else if (status === 401) {
    // token 无效
    redirectLogin()
    Notify({ type: 'danger', message: '登录状态失效，请重新登录' })
  } else if (status === 403) {
    // 无操作权限
    Notify({ type: 'danger', message: '无操作权限' })
  } else if (status >= 500) {
    // 服务器异常
    Notify({ type: 'danger', message: '服务器异常' })
  } else {
    Notify({ type: 'danger', message: 'error' })
  }
  return Promise.reject(error)
})

function redirectLogin () {
  router.push({ name: 'Login' })
}

export { request, upload }

```


