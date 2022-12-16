# FORM 表单上传 【同步】
```html
<!-- 上传单个文件 -->
  <form action="server/upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="file">
    <input type="submit" value="上传" />
  </form>
<!-- 上传多个文件 -->
  <form action="server/upload.php" method="post" enctype="multipart/form-data">
    <input type="file" name="file[]" multiple>
    <input type="submit" value="上传" />
  </form>
```

:warning:
  form 若不设置`enctype="multipart/form-data"` 使用二进制传输
  则默认为`enctype="application/x-www-form-urlencoded"`
  此`application/x-www-form-urlencoded`会 键值对化，文件的标识是文件名，所以会传递如下数据：
  ```js
    file = xxxx.xx
  ```
  从而导致文件上传失败

  ## FormData
  FormData 实例对象有如下方法
  `.append(key, value)`
  `.get('key')`
  `.set(key, value)`
  `.has(key)` 返回布尔值
  `.delete(key)`

  ```js
  const fd = new FormData()
  fd.append('name', '张三')
  let name = fd.get('name')
  console.log(name) // '张三'
  fd.set('age', 99)
  fd.has('age') // return true
  fd.delete('name')
  console.log(fd.get('name')) // null 而不是undefined
  ```