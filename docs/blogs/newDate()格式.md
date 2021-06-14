```js
const a = new Date()
console.log(a)
Wed May 26 2021 23:11:28 GMT+0800 (中国标准时间)
```

| method                | show                                               |
| --------------------- | -------------------------------------------------- |
| new Date()            | Wed May 26 2021 23:11:28 GMT+0800 (中国标准时间)   |
| .toDateString()       | "Wed May 26 2021"                                  |
| .toGMTString()        | "Wed, 26 May 2021 15:11:28 GMT"                    |
| .toISOString()        | "2021-05-26T15:11:28.013Z"                         |
| .toJSON()             | "2021-05-26T15:11:28.013Z"                         |
| .toLocaleDateString() | "2021/5/26"                                        |
| .toLocaleString()     | "2021/5/26下午11:11:28"                            |
| .toLocaleTimeString() | "下午11:11:28"                                     |
| .toString()           | "Wed May 26 2021 23:11:28 GMT+0800 (中国标准时间)" |
| .toTimeString()       | "23:11:28 GMT+0800 (中国标准时间)"                 |
| .toUTCString()        | "Wed, 26 May 2021 15:11:28 GMT"                    |

```html
<input type="date" >
.value => 
2021-05-26

new Date(value) √
```

| a                        | new Date()    |
| ------------------------ | ------------- |
| a.getTime()              | 1622086914843 |
| Date.parse(a)            | 1622086914000 |
| Date.parse('2021-05-01') | 1619827200000 |

