# promise

是解决异步流程化的一种手段

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



promise 有三个状态 `pending` `reject` `resolve`

可以由 pending -> reject 或者 pending -> resolve

但不能反过来



**reject的传递**

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(()=>{},(err)=>{ console.log(err) }) // 打印 reject
```

 **只要reject没有被收就能一直传递下去**

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(() => {}).then(() => {},(err) => {console.log(err)}) // 打印 reject
```

**catch 捕获reject**

```js
let promise = new Promise((resolve, reject) => {
	console.log('excutor !')
    reject('reject')
})

promise.then(() => {}).then(() => {}).catch(err=> { console.log(err)}) // 打印 reject
```

**如果错误被捕获，就不会继续向下传递**

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

