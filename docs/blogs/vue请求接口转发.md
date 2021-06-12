目的 ： 解决跨域问题

举例

后端: http:// localhost:3000/api/blog/list

前端: http: //localhost:8000/



如果直接使用axios请求会发生跨域问题拒绝请求

**跨域报错**

```js
const getData = () => {
axios.get('http:// localhost:3000/api/blog/list')
	.then(data => console.log(data))
	.catch(err=> console.error(error))
}
```







**正确做法:**

vue.config.js内容

```js
module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000'
			}
		}
	}
}
```



```js
const getData = () => {
axios.get('/api/blog/list')
	.then(data => console.log(data))
	.catch(err=> console.error(error))
}
```

在http 请求中显示的请求地址仍然是8080端口