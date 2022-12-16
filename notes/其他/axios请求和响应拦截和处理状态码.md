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





## 无感刷新Token

```js
import axios from 'axios'
import { getItem, setItem, removeItem } from '@/utils/storage.js'
import { NEED_ACCESS_API, BASE_URL, ERROR_CODE } from '@/config/apiConfig.js'
import router from '@/router'
import { Message } from 'element-ui'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@/config/constName.js'

// 实例化
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30 * 1000,
  withCredentials: true
})

let retryList = []
let isRefreshing = false

// 请求拦截器 ===================================================

request.interceptors.request.use(config => {
  delete config.headers['Access-Token']
  // 判断config.url 是否需要token， 如果需要则带上
  if (NEED_ACCESS_API.includes(config.url)) {
    const AccessToken = getItem(ACCESS_TOKEN_NAME)
    AccessToken && Object.assign(config.headers, { 'Access-Token': AccessToken })
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器 ===================================================
request.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 0) {
    switch (res.code) {
      case ERROR_CODE.ACCESS_TOKEN_EXPIRE:
        if (!isRefreshing) {
          // 进入刷新流程
          console.log('需要刷新，正在进入刷新流程')
          isRefreshing = true
          return refreshToken().then(res => {
            if (res.data && res.data.code === 0) {
              setItem(ACCESS_TOKEN_NAME, res.data.data.access_token)
              setItem(REFRESH_TOKEN_NAME, res.data.data.refresh_token)
              response.headers['Access-Token'] = getItem(ACCESS_TOKEN_NAME)
              console.log('%c刷新成功', 'color: white;background-color: green;')
              retryList.forEach((cb) => cb())
              retryList = [] // 重新请求完清空
              return request(response.config)
            }
          }).catch(err => {
            removeToken()
            router.push({ name: 'Login' })
            return Promise.reject(err)
          }).finally(() => {
            isRefreshing = false
          })
        } else {
          // 返回未执行 resolve 的 Promise
          return new Promise(resolve => {
            // 用函数形式将 resolve 存入，等待刷新后再执行
            retryList.push(() => {
              resolve(request(response.config))
            })
          })
        }
      case ERROR_CODE.REFRESH_TOKEN_EXPIRE:
        Message({
          message: `刷新失败${ERROR_CODE.REFRESH_TOKEN_EXPIRE}`
        })
        router.push({ name: 'Login' })
        retryList = []
        isRefreshing = false
        break

      default:
        return Promise.resolve(response)
    }
  }
  return response
}, error => {
  return Promise.reject(error)
})

// common ===================================================
function refreshToken () {
  const refresh_token = getItem(REFRESH_TOKEN_NAME) || ''
  return request({
    method: 'POST',
    url: '/access/refresh',
    headers: {
      'Refresh-Token': refresh_token
    }
  })
}

function removeToken () {
  removeItem(ACCESS_TOKEN_NAME)
  removeItem(REFRESH_TOKEN_NAME)
}

export { request }

```

