## MongoDB

> https://docs.mongoing.com/mongodb-crud-operations

```
安装MongoDB
安装MongoDB Compass 图形界面
```

### mongodb 连接 nodejs     ( mongodb 服务默认端口27017)

```javascript
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017' // ---本地启动的 mongodb 服务
// ---连接数据库
MongoClient.connect(url, {
  // ---两个默认要求true的参数
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    console.error('mongodb 连接出错', err)
    return
  }
  console.log('mongodb 连接成功')
```

###  切换到指定数据库和集合

```javascript
const dbName = 'comment1' // 数据库
// ---切换到名为 bdName 的数据库
const db = client.db(dbName)

// ---切换到名为 users 的集合 collection
const userCollection = db.collection('users')
```


###  数据的增删改查（原始方法，实际开发用 mongoose ）
查询数据

  ```javascript
    //----------------------------------------------
    // ---------查询数据 ,在 finde 中可以筛选数据 find({city: "beijing"}) ------
    // ----排序 ，find().sort(1)toArray   用sort({_id:-1})可以按插入顺序进行排序
    userCollection.find().sort({_id:-1}).toArray((err, result) => {
      if (err) {
        console.error('查询数据出错', err)
        return
      }
      console.log('查询结果', result)
    })
  ```

  新增数据

  ```javascript
    userCollection.insertOne({
      username: 'caowei',
      password: '3323',
      age: 24,
      city: 'changsha'
    },(err, result) => {
      if (err) {
        console.error('插入数据出错', err)
        return
      }
      // console.log('插入数据成功', result)
      console.log('插入数据成功', result.insertedCount, result.insertedId)
    })
  ```

  修改数据

  ```javascript
    userCollection.updateOne(
      { username: 'zhangsan' },    // 修改的条件
      { $set: { age: 0, city: 'penglai' } },   // 修改的内容
      (err, result) => {
        if (err) {
          console.error('修改数据出错', err)
          return
        }
        console.log('修改数据成功', result.modifiedCount)
      }
  
    )
  ```

  删除数据

  ```javascript
    userCollection.deleteOne(
      { username: "wangwu" },
      (err, result) => {
        if (err) {
          console.error('删除数据出错', err)
          return
        }
        console.log('删除数据成功', result)
      }
    )
  ```



## mongoose 连接数据库的终极方法

> https://mongoosejs.com/docs/guide.html

mongodb 数据格式过于灵活 ，可以插入任何数据，不受限制，实际开发项目中要有数据格式的规范，特别是多人协作的时候。

`mongoose` 可提供规范

`Schema `定义数据格式的规范

以`Model` 规范 Collection

规范数据操作的API



安装mongoose `npm i mongoose --save`

#### 流程 - 详见当前文件夹下 myproject 的演示代码

```
全局安装了 koa2 脚手架(若没装则 npm install -g koa-generator)
koa2 myproject // 创建 myproject 项目
cd myproject // 进入项目文件夹
npm i // 安装依赖
npm install mongoose --save // 安装mongoose 包
在myproject 项目文件夹下依次按下面操作
```



##### 1.连接数据库: 

创建 `db.js` 文件,内容

```javascript
// 连接数据库 (mongodb 的服务端)

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'comment2'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', true)

// 开始连接数据库
mongoose.connect(`${url}/${dbName}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const conn = mongoose.connection

conn.on('error', err => {
  console.errer('mongoose 连接出错', err)
})

module.exports = mongoose
```

##### 2.数据模型和数据规范，定义model：

创建`model.js`文件，内容

```javascript
// 数据模型 (规范数据格式)

const mongoose = require('./db.js')

// 定义 Schema (数据规范)
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // 唯一，不重复
  },
  password: String,
  age: Number,
  city: String,
  gender: {
    type: Number,
    default: 0 // 默认值 0 保密， 1 男， 2 女   
  }
}, {
    timestamps: true // 时间戳，自动添加文档的创建时间
})

// 定义 Model
const User = mongoose.model('user', UserSchema)

module.exports = {
  User
}
```

##### 3.使用 model 进行增(2种)、查、改、删



> https://www.cnblogs.com/w-jinfeng/articles/4772514.html
>
> https://segmentfault.com/a/1190000021010300
>
> 这篇文章有很多其他方法

创建`test1.js`用于演示增(2种)、查

```javascript
// 使用 model
const { User } = require('./model')

console.log('ok 成功引入model')

// 定义一个匿名立即执行函数，为了里面能用await
!(async () => {
  //  新增数据 - 1 -通过new User 创建， 并且需要zhangsan.save()
  const zhangsan = new User({
    username: 'zhangsan',
    password: 'abc123',
    age: 12,
    city: "changsha",
    gender: 1
  })
  zhangsan.save()

  // 新增数据 - 2 - 通过User.create 创建，不需要lisi.save()
    const lisi = await User.create({
      username: 'lisi',
      password: '1598753a',
      age: 10,
      city: "shanghai"
    })
    console.log('lisi 创建完成',lisi)

  //  查询数据 - 列表数据，返回数组
  // find 条件筛选
  // const userList = await User.find({ username: "zhangsan" })
  // sort 排序
  const userList = await User.find().sort({ _id:-1 })
  console.log('userList 查询结果', userList)

  // 查询数据 - 单条数据，返回对象
  const user = await User.findOne({ username: 'zhangsan' })
  console.log('user 查询结果', user)

})()
```

创建`test2.js`用于改删

```javascript
// 使用model 操作数据

const { User } = require('./model.js')

console.log('ok 成功引入model')

// 定义一个匿名立即执行函数，为了里面能用await
!(async () => {
  // 更新数据
  const updataResult = await User.findOneAndUpdate(
    { username: "zhangsan" }, // 条件
    { age: 1000 }, // 更新的内容
    {
      new: true // 配置项  返回更新后的数据
    }
  )
  console.log('更新的返回结果', updataResult)

  // 删除数据
  const removeResult = await User.remove({ username: "lisi" }) // 删除额的条件
  console.log('删除的返回结果', removeResult)
})()
```

4. 使用model进行分页查询

```js
// 获取文档分类列表
/**
 * 
 * @param { String } query 查询字符串，在modelName中进行匹配查询
 * @param { String | Number } pagenum 当前页
 * @param { String | Number } pagesize 每页大小
 * @returns
 */
const getDocModelList = async (query, pagenum, pagesize) => {
  let docModelList = []
  let total = 0
  if (query === '') {
    docModelList = await DocModel.find({}).skip((pagenum - 1) * pagesize).limit(parseInt(pagesize)||20).sort({'updatedAt':-1})
    total = await DocModel.count({})
  } else {
    docModelList = await DocModel.find({ modelName: {$regex: eval(`/${query}/ig`)}}).skip((pagenum - 1) * pagesize).limit(parseInt(pagesize)||20).sort({'updatedAt':-1})
    total = await DocModel.count({ modelName: {$regex: eval(`/${query}/ig`)}})
  }
  const totalPage = docModelList.length % pagesize === 0 ? docModelList.length / pagesize : (Math.floor(docModelList.length / pagesize) + 1)
  const result = {
    totalPage,
    pagenum,
    total,
    docModelList
  }
  return result
}
```

