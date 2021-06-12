Promise.all([p1,p2,p3])

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



当有任意一个P1 处于reject 状态，则Promise.all处于失败状态

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

