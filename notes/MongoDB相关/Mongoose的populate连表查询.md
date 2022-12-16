Mongoose 的 `populate()` 可以连表查询，即在另外的集合中引用其文档。

> https://segmentfault.com/a/1190000021151338

`Populate()` 可以自动替换 `document` 中的指定字段，替换内容从其他 `collection` 中获取。

## ref

创建 `Model` 的时候，可给该 `Model` 中关联存储其它集合 `_id` 的字段设置 `ref` 选项。`ref` 选项告诉 Mongoose 在使用 `populate()` 填充的时候使用哪个 `Model`。

```js
const authorSchema = new Schema({
  name: String,
  age: Number,
  story: { type: Schema.Types.ObjectId, ref: 'Story' }
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

let Author = mongoose.model('Author', authorSchema);
```

上例中 `Author` model 的 `friends` 字段设为 `ObjectId` 数组。 `ref` 选项告诉 Mongoose 在填充的时候使用 `User` model。所有储存在 `friends` 中的 `_id` 都必须是 `User` model 中 `document` 的 `_id`。



`ObjectId`、`Number`、`String` 以及 `Buffer` 都可以作为 `refs` 使用。 但是最好还是使用 `ObjectId`。

在创建文档时，保存 `refs` 字段与保存普通属性一样，把 `_id` 的值赋给它就好了。



## populate(path[, select])

```js
let author = await Author.findOne({ name: 'dora' }).populate('story');

author.story   // {...} 从 Story 表中查到的文档
```

被填充的 `story` 字段已经不是原来的 `_id`，而是被指定的 `document` 代替。这个 `document` 由另一条 query 从数据库返回。

`refs` 数组返回存储对应 `_id` 的 `document` 数组。



- 第一步查询没有关联的 document 的情况

如果没有关联的文档，则返回值为 `null`，即 `author.story` 为 `null`；如果字段是数组，则返回 `[]` 空数组即 `author.friends` 为 `[]`。

- 关联的表填充字段选择

如果只需要填充 `document` 中一部分字段，可给 `populate()` 传入第二个参数，参数形式即 **返回字段字符串**，同 [`Query.prototype.select()`](https://link.segmentfault.com/?enc=zFxMdZGad1wvORkM4Ux6Qg%3D%3D.1bnSFV366xtdXI34zdVq1t4hDGRd8oXkof5s7VBr1KZAlfsXBlTbkffUHhoS7eqBWj%2Bm2XgEY4TLeMVUxZs49g%3D%3D)。

```javascript
let author = await Author.findOne({ name: 'dora' }).populate('story', 'title -_id');
// 只显示title 字段，_id是默认带的所以用"-"删除

author.story           // {title: ...}  只返回 title 字段
author.story.content   // null  其余字段为 null
```

### populate 多个字段

```javascript
let author = await Author.findOne({ name: 'dora' }).populate('story').populate('friends');
```

如果对同一字段 `populate()` 两次，只有最后一次生效。



### populate({ objParam })

`objParam`:

- `path`：需要 `populate` 的字段。
- `populate`：多级填充。
- `select`：从 `populate` 的文档中选择返回的字段。
- `model`：用于 `populate` 的关联 `model`。如果没有指定，`populate` 将根据 `schema` 中定义的 `ref` 字段中的名称查找 `model`。可指定跨数据库的 `model`。
- `match`：`populate` 连表查询的条件，符合条件的会用文档替换 `_id`，不符合条件的会用 `null` 替换 `_id`。
- `options`：`populate` 查询的选项。
  - `sort`：排序。
  - `limit`：限制数量。

### 多级填充

```javascript
// 查询 friends 的 friends
Author.findOne({ name: 'dora' }).
populate({
  path: 'friends',
  populate: { path: 'friends' }
});
```

###  跨数据库填充等

...见参考链接