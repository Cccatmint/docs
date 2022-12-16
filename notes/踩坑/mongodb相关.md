## mongodb ObjectId 需要`.toString()`转化为字符串



## 在使用Mongoose获取数据时，若需要对获取的数据进行加工需要使用.lean()方法转化为js对象才能操作，比如:

```js
const { Model } = require('./xxx/Model.js')

const getData = async () => {
	let result = await Model.find({...}).lean()
	result.xxx = yyy
	return result
}
```





## ObjectId相关

在聚合管道查询中_id需要使用mongoose.Types.ObjectId()进行转化

```
$match: {
	_id: mongoose.Types.ObjectId('xxxaf1as3f1asf35as1xxx')
}
```

