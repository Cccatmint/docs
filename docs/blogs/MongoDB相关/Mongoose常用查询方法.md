> https://www.cnblogs.com/suoking/p/5151501.html

​		mongoose查询特定时间段文档的方法

```js
db.collection.find({
  time:{
    "$gte": new Date('2014-01-24'),
    "$lte":new Date('2014-01-25')
  }
})
```

```js
    const documents = await User.find({
    createdAt: {
      "$gte": new Date(startTime),
      "$lte": new Date(endTime)
    },
    document_title: { $regex: eval(`/${query}/ig`) }
  }).skip((pageNum - 1) * pageSize).limit(parseInt(pageSize)).sort({ 'created': -1 })
}
```

