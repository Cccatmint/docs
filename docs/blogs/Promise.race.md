Promise.race([p1,p2,p3])

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

p1,p2,p3 谁先完成就返回哪个promise的结果，**无论是失败还是成功**



**不常用，常见应用**： 测试资源或者接口的响应速度，下面用请求一张图片作为例子

```js
function getImage () {
    return new Promise((resolve, reject) => {
        const oImg = new Image()
        oImg.onload = function() {
            resolve('图片加载成功')
        }
        oImg.src = 'http: //xxxxxxxxxx.png'
    })
}

function timeout () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('请求超时')
        }, 3000)
    })
}

Promise.race(getImage(), timeout())
	.then((res) => { console.log(res) })
	.cath(err => { console.log(err) })
```

