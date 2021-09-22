# call、 apply、 bind 异同

## call 

`function.call(thisArg, arg1, arg2, ...)`

使用一个指定的this来调用函数

```js
const docwrite = document.write
docwrite(1) // Error 非法调用
docwrite.call(window.document, 1) // 正确
```



## apply 

与call的区别是它接收的参数是数组形式

`func.apply(thisArg, [argsArray])`

```js
const docwrite = document.write
docwrite(1) // Error 非法调用
docwrite.apply(window.document, [1]) // 正确
```



## bind

bind方法创建一个新的函数，并且这个新的函数的this值指定为bind()中的第一个参数

```js
const docwrite = document.write.bind(document)
docwrite(1) // 正确
```