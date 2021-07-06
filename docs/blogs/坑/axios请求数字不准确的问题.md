# axios 请求数字不准确的问题

## 1. 知识点

> https://www.cnblogs.com/zhaozhou/p/12834811.html

- JS最大安全整数
- 后端返回的JSON字符串会被axios默认的使用`JSPN.parse()`转换成JavaScript对象



## 2. 错误重现

在此进行原理上的错误重现，为方便起见不发起真实的请求。



代码如下

```js
// 模拟后端数据
const a = { id: 9007199254740995 } 
// 服务器实际接收到的JSON字符串
const data = JSON.stringify(a)
// 模拟axios 内部默认进行的处理
const res = JSON.parse(data)

console.log(res)
// 期望输出: {id: 9007199254740995}
// 实际输出：{id: 9007199254740996}
// 发生了精度丢失
```



## 3. 解决办法

### 3.1 手写方案推荐使用该字段做字符串处理



### 3.2 使用第三方库，有bignum, bigint 等

此处使用`json-bigint`第三方包处理

> https://www.npmjs.com/package/json-bigint

#### 安装 ` npm i json-bigint `

#### json-bigint包的作用

```js
// 将数字转化成bigNumber的形式(包自定义的数据格式，是一个对象形式的数据)
// 需要使用toString方法将其转化成字符串
import JSONbig from 'json-bigint'

const a =  '{"id": 1531313847841341846846}'
const b = JSONbig.parse(a).id.toString() // '1531313847841341846846'
```



#### 在axios中使用

使用 json-bigint 包与 axios

> https://www.npmjs.com/package/axios 使用axios的API变更默认的数据转换

```js
import axios from 'axios'
import JSONbig from 'json-bigint'

const myAxios = axios.create({
    baseUrl = 'http:www.example.com/api',
    transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // 因为可能后端返回的不是JSON字符串，所以使用try catch ,如果是不是JSON字符串则返回真实数据
	try {
        return JSONbig.parse(data)
    } catch () {
 		return data       
    }
	}]
})

```

当需要使用到被转化的数据时，就使用 xxx.toString()获得其原始值的字符串