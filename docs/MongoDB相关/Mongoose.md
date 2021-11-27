# Mongoose

Node.js访问MongoDB的js库



#### 索引

索引是对数据库表中的一列或多列值进行排序的一种结构，可以让查询数据库的操作变得更快。

MongDB： `db.collection.createIndex()` 3.0版本前卫`db.collection.ensureIndex()`

Mongoose: 除了MongoDB的上述方法，也可以在Schema的时候指定创建索引

```js
const DeviceSchema = new mongoose.Schema({
    sn: {
        type: Number,
        unique: true  // 唯一索引
    },
    name: {
        type: String,
        index: true // 普通索引
    }
})
```



#### MongoDB 内置的CRUD方法

> 官方文档 https://mongoosejs.com/docs/queries.html

- [`Model.deleteMany()`](https://mongoosejs.com/docs/api.html#model_Model.deleteMany)
- [`Model.deleteOne()`](https://mongoosejs.com/docs/api.html#model_Model.deleteOne)
- [`Model.find()`](https://mongoosejs.com/docs/api.html#model_Model.find)
- [`Model.findById()`](https://mongoosejs.com/docs/api.html#model_Model.findById)
- [`Model.findByIdAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndDelete)
- [`Model.findByIdAndRemove()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove)
- [`Model.findByIdAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
- [`Model.findOne()`](https://mongoosejs.com/docs/api.html#model_Model.findOne)
- [`Model.findOneAndDelete()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete)
- [`Model.findOneAndRemove()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndRemove)
- [`Model.findOneAndReplace()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndReplace)
- [`Model.findOneAndUpdate()`](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate)
- [`Model.replaceOne()`](https://mongoosejs.com/docs/api.html#model_Model.replaceOne)
- [`Model.updateMany()`](https://mongoosejs.com/docs/api.html#model_Model.updateMany)
- [`Model.updateOne()`](https://mongoosejs.com/docs/api.html#model_Model.updateOne)





#### 自定义的Mongoose CRUD扩展方法

```js
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// 静态方法
UserSchema.statics.findByUid = function (uid, cb) {
    this.find({ "_id": uid }, function (err, docs) {
        cb(err, docs)
    })
}

// 实例方法
UserSchema.methods.print = function () {
    console.log("这是一个实例方法")
    console.log(this)
}
```

