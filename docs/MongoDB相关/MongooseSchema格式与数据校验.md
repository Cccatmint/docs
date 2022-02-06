# Mongoose Schema格式

## Mongoose 内置校验参数

**required: true 表示这个数据必须传入，可以用在任意类型数据**

```js
const mongoose = require('../dblink')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true, // 必须传入
    trim: true, // 去除前后空格
    unique: true // 唯一的
  },
    age: {
        type: Number,
        min: 0, // 用于 Number 类型数据，最小值
        max: 200 // 用于 Number 类型数据，最大值
    },
    sex: {
        type: String,
        default: 'secretive', // 默认值
        enum:['male','female','secretive'] 
        // 枚举类型，要求数据必须满足枚举值 enum:['male','female','secretive']，
        // 必须用在String的数据类型中   
    },
    mail: {
        type: String,
        // 增加的数据必须符合 match（正则）的规则，适用于String类型
        match: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    }
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)

module.exports = { User }

```



## **Mongoose 自定义的验证器**

Mongoose中除了内置的校验参数，还可以自定义校验，使用validate来定义一个方法校验，如果通过验证返回 true，并且新增成功，没有通过则返回 false，新增失败

需求：定义一个字段desc,长度必须大于或等于10（数据类型可以是String和Number）

```js
let mongoose = require('./db')

let MySchema = mongoose.Schema({
  desc:{
    type:String,
    validate: (desc) => {
      return desc.length >= 10;
    }
  }
})

```

## 其他参考

> httpswww.cnblogs.comcaoleyunp12784773.html

```js
var schema = new Schema({
  name:    String,　　　　//m.name = 'Statue of Liberty';
  binary:  Buffer,　　　　//m.binary = new Buffer(0);
  living:  Boolean,　　　　　　//m.living = false;
  updated: { type: Date, default: Date.now },　　//m.updated = new Date;
  age:     { type: Number, min: 18, max: 65 },　　//m.age = 125;
  mixed:   Schema.Types.Mixed,　　　　
　　　　　　　　//m.mixed = { any: { thing: 'i want' } };
　　　　　　　　　//m.markModified('mixed');//混合值通过该方法改变

  _someId: Schema.Types.ObjectId,　　//m._someId = new mongoose.Types.ObjectId;
  array:      [],　　//m.array.push(1);
  ofString:   [String],　　//m.ofString.push("strings!");
  ofNumber:   [Number],　　//m.ofNumber.unshift(1,2,3,4);
  ofDates:    [Date],　　//m.ofDates.addToSet(new Date);
  ofBuffer:   [Buffer],　　//m.ofBuffer.pop();
  ofBoolean:  [Boolean],　　
  ofMixed:    [Schema.Types.Mixed],　　
　　　　　　　　　　//m.ofMixed = [1, [], 'three', { four: 5 }];
  ofObjectId: [Schema.Types.ObjectId],　　
  nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }　　//m.nested.stuff = 'good';
})

```

常用字段解析

```js
var schema3 = new Schema({
  test: {
    type: String,
    lowercase: true, // 总是将test的值转化为小写
    uppercase: true, // 总是将test的值转化为大写
    required:true, //设定是否必填
    default:'star', //设定默认值
    index：true, //设定索引值
    unique：true, //索引值唯一
    sparse：true, //是否启用稀疏索引
    match：RegExp, //判断是否通过正则验证
    enum：Array， //判断test值是否包含于enmu对应的数组中
    min：Number， //判断对应值是否大于等于给定值
    max：Number， //判断对应值是否小于等于给定值
    trim:true //去除数据前后的空格
    capped:1024 //限定大小最大为1024字节
    validate：function，为此属性添加一个验证器函数，如demo1所示
    get：function，//为这个属性定义一个定制的getter Object.defineProperty()。如demo2所示
    set：function，//定义此属性的自定义设置Object.defineProperty()。如demo2所示
  }
});

```

demo1: validate

```js
//初始化schema对象
var EmailTemplateSchema = new Schema({
fileName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    }
});
//初始化对象时添加验证，验证传入的值是否合法
var validateLocalStrategyProperty = function (property) {
    return (!this.updated || property.length);
};
```

demo2: get/set

```js
//将传入的值四舍五入后存储
var numberSchema = new Schema({
  integerOnly: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v)，
    require:true
  }
});
```

> https://blog.csdn.net/dbp5156/article/details/102380497

# Array Schema 

> https://www.cnblogs.com/le0zh/p/add-update-delete-object-array-schema-mongoosemongodb.html
