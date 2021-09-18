# Promise相关

## 基本
promise是解决异步流程化的一种手段

Promise 构造函数 需要new

Promise 参数 是 excutor(执行器)

excutor 的两个参数  -> resolve reject 函数

**excutor 是同步执行的，then是异步调用的**

```js
let promise = new Promise((resolve, reject) => {
    console.log('excutor!')
	resolve('success!')
})

promise.then((res) => {
    console.log(res)
})

console.log('Global')

// 执行打印结果 excutor! Global success!
```



## Promise的3种状态

promise 有三个状态 `pending` `reject` `resolve`

可以由 pending -> reject 或者 pending -> resolve

但不能反过来

## Promise运行

reject的传递

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(()=>{},(err)=>{ console.log(err) }) // 打印 reject
```

 只要reject没有被收就能一直传递下去****

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(() => {}).then(() => {},(err) => {console.log(err)}) // 打印 reject
```

catch 捕获reject

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(() => {}).then(() => {}).catch(err=> { console.log(err)}) // 打印 reject
```

如果错误被捕获，就不会继续向下传递

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(() => {})
    .then(() => {},(err) => {console.log('then',err)})
    .catch(err=> { console.log('catch', err)}) 
// 打印 then reject
```

## Promise.race([p1, p2, p3])

p1,p2,p3 谁先完成就返回哪个promise的结果，无论是失败还是成功

```js
let P1 = new Promise((resolve, reject)=>{
   ...
})
let P2 = new Promise((resolve, reject)=>{
    ...
})
let P3 = new Promise((resolve, reject)=>{
    ...
})

Promise.race([P1,P2,P3]).then(
	(res)=>{ console.log(res) },
    (err)=>{ console.log(err) }
)
```

### 应用

不常用,一般用于测试资源或者接口的响应速度，下面用请求一张图片作为例子

```js
let P1 = new Promise((resolve, reject)=>{
   ...
})
let P2 = new Promise((resolve, reject)=>{
    ...
})
let P3 = new Promise((resolve, reject)=>{
    ...
})

Promise.race([P1,P2,P3]).then(
	(res)=>{ console.log(res) },
    (err)=>{ console.log(err) }
)
```

## Promise.all([p1, p2, p3])

用多个异步任务并发运行，他的结果创建承诺之后使用，并等待所有任务结果的完成

```js
let P1 = new Promise((resolve, reject)=>{
    resolve('p1 resolve')
})
let P2 = new Promise((resolve, reject)=>{
    resolve('p2 resolve')
})
let P3 = new Promise((resolve, reject)=>{
    resolve('p3 resolve')
})

Promise.all([P1,P2,P3]).then((res)=>{ console.log(res) }) 
// 打印 ['p1 resolve','p2 resolve','p3 resolve'] 

```

Promise.all（）参数必须是interabel(可迭代的) ,比如 `Array` `Set` `Map`

而interabel 对象中**不一定需要**是promise对象

比如

```js
let P1 = new Promise((resolve, reject)=>{
    resolve('p1 resolve')
})

Promise.all([P1, 123]).then((res)=>{ console.log(res) }) 
// 打印 ['p1 resolve', 123] 
```

甚至不需要传递参数，

比如

```js
Promise.all([]).then((res)=>{ console.log(res) })
// 打印 []
```

当有任意一个p处于reject 状态，Promise.all就处于失败状态

```js
let P1 = new Promise((resolve, reject)=>{
    reject('p1 reject')
})
let P2 = new Promise((resolve, reject)=>{
    reject('p2 reject')
})

Promise.all([P1,P2]).then((res)=>{ console.log(res) },(err)=>{console.log(err)}) 
// 打印 p1 reject
```

