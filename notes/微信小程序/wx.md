## 	WXML & HTML 区别
### HTML
div span img a(href)
### WXML
view text image navigator(url)

## WXSS & CSS
- 新增了rpx 尺寸单位，在不同尺寸的屏幕上小程序会自动进行换算

- 提供了全局样式和局部样式

- 仅支持部分的CSS选择器

## 小程序中js文件分类

- app.js文件:项目入口文件

- 页面.js

- 普通的.js文件

## 宿主环境

### 通信模型

#### 渲染层和逻辑层通信
微信客户端进行转发

#### 逻辑层和第三方服务器之间的通信
微信客户端进行转发

## 改变data的值
```
  handleTap(e) {
    this.setData({
      msg: this.data.msg + 'abc'
    })
  }
```

## 事件绑定

### 传参
```

<button bindtap="handleTap" data-info="{{ num }}">按钮</button>

```

### 参数获取
```
  handleTap(e) {
    console.log(e.target.dataset.info)
  }
```

## input
```

<input type="text" bindinput="handleInput"/>

```

```

  handleInput(e) {
    console.log(e.detail.value)
  }

```

## input 实现input 与 data 数据同步
```

<input type="text" value="{{msg}}" bindinput="handleInput"/>

```

```

  handleInput(e) {
    this.setData({
      msg: e.detail.value
    })
  }

```


## 条件渲染

`wx:if="{{ condition1 }}"`

`wx:elif="{{ condition2 }}"`

`wx:else`


```
 data: {
    type: 1
  }
```

```
<view wx:if="{{ type === 1 }}"> 1 </view>
<view wx:elif="{{ type === 2 }}"> 2 </view>
<view wx:else> other </view>
```


### 结合 `block`标签进行条件渲染
类似于`template`标签`block`不会被渲染成元素

```
<block wx:if="{{ show }}">
  <view> 1 </view>
  <view> 2 </view>
  <view> 3 </view>
</block>
```

### hidden

`hidden` 与 `wx:if` 区别 类似于 `v-show` 与 `v-if` 的区别

```
<view hidden="{{ show }}">显示与隐藏</view>
```


## 列表渲染
- `wx:for`


```js
  data: {
    list: [
      '苯',
      '甲苯',
      '氯苯'
    ]
  }
```

```
<view wx:for="{{ list }}">
  索引： {{ index }}
  item项: {{ item }}
</view>
```

- 可以使用`wx:for-index` 和 `wx:for-item` 替换默认的名称

```
<view wx:for="{{ list }}" wx:for-index="idx" wx:for-item="itemValue">
  索引： {{ idx }}
  item项: {{ itemValue }}
</view>
```

- `wx:key` 类似于 `v-bind:key`
```js
data: {
    list: [
      {cas: "71-43-2", name: "苯" },
      {cas: "108-88-3", name: "甲苯" },
      {cas: "108-90-7", name: "氯苯" },
    ]
  }
```

```
<view wx:for="{{ list }}" wx:key="cas">
  {{ item.name }}
</view>
```


## wxss
wxss & css
- wxss 只含有常用的css选择器

- wxss 拥有 `@import`: 
```
@import "/common/common.wxss";
```

- wxss 拥有 `rpx` 单位，其将屏幕宽度划分为750份，每份的宽度对应 `1rpx`


## app.json 配置
值得注意的是配置`pages`时需要将有tabBar的页面防止在前才能显示tabBar

```json
{
  "pages": [
    "pages/index/index",
    "pages/list/list",
    "pages/logs/logs"
  ],
  "window": {
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "全局BAR TITLE",
    "navigationBarTextStyle": "black",

    "backgroundTextStyle": "light",
    "backgroundColor": "#ae1fee",

    "enablePullDownRefresh": true,
    "onReachBottomDistance": 50
  },
  "tabBar": {
    "list": [
      {
        "text": "Home",
        "pagePath": "pages/index/index",
        "iconPath": "/images/icon-home.jpg",
        "selectedIconPath": "/images/icon-home-act.jpg"
      },
      {
        "text": "logs",
        "pagePath": "pages/logs/logs"
      },
      {
        "text": "logs",
        "pagePath": "pages/list/list"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json"
}
```





## 网络数据请求

只能请求HTTPS 类型的接口 并且将接口的域名添加到信任列表中

（可以在开发者工具 - 详情 - 本地设置 - 不校验合法域名 即可使用HTTP接口，但仅限在开发和调试阶段使用）

### 发起请求

GET / POST

```
wx.request({
  url: 'https://cccatmint.fun/api',
  method: 'GET', // 'POST'
  data: {
    a: 1,
    b: 2
  },
  success: res => {
    console.log(res.data)
  }
})
```



### 在页面刚加载时请求数据

在`onLoad`（生命周期函数--监听页面加载）中发起请求即可 



### 跨域

跨域问题只存在于基于浏览器的Web开发中，小程序宿主环境不是浏览器而是微信客户端所以小程序中**不存在跨域**的问题




## 导航

### 页面导航

- 声明式导航

  在页面上声明一个`<navigator>`导航组件，通过点击该组件导航

  必须指定**`url`** 和**`open-type`**

  ```html
  <navigator url="/pages/search/search" open-type="switchTab">导航跳转</navigator>
  ```

  

- 编程式导航

  通过调用小程序API进行导航

  - 跳转到tabBar页面 `wx.switchTab`
  
  ```js
  
      wx.switchTab({
        url: '/pages/search/search',
      })
  ```
  
  - 跳转到非tabBar页面 `wx.navigateTo`
  
  ```js
      wx.navigateTo({
      url: '/pages/info/info',
    })
  ```

  - 后退导航
  ```js
  wx.navigateBack({
    delta:
  })
  ```
  
### 导航传参

- 声明式传参
  与网页url路径相似
  ```html
  <navigator url="/pages/info/info?name=abc&age=99">导航跳转</navigator>
  ```


- 编程式导航传参
  ```js
  wx.navigateTo({
      url: '/pages/info/info?name=dd&gender=male',
    })
  ```

- 参数的获取

  ```js
    onLoad(options) {
    console.log(options)
    // 获取页面参数后转存到data对象中
    this.setData({
      query: options
    })
  },
  ```

## 页面事件

### 下拉刷新
可以全局开启和局部开启
在`app.json` 或者 页面的json文件中 `enablePullDownRefresh` 设置为 `true`

下拉刷新事件监听函数 `onPullDownRefresh`
```js
onPullDownRefresh() {
    console.log('refresh')

    wx.stopPullDownRefresh() // 处理完下拉刷新的操作后关闭页面的下拉刷新loading效果
  }
```

### 上拉触底
通常用于加载更多数据的行为

监听事件 `onReachBottom`
```js
  onReachBottom() {
    console.log('上拉触底')
  }
```

配置下拉刷新的触发距离，在`.json`文件中配置`onReachBottomDistance`


## 生命周期

### 应用的生命周期

在 `app.js` 中
```js
  // app.js
App({
  onLaunch() {
    console.log('小程序初始化完成，全局只触发一次')
  },

  onShow() {
    console.log('小程序启动或从后台进入前台显示')
  },
  onHide() {
    console.log('小程序进入后台')
  }
})
```



### 页面的生命周期

在页面的`.js文件中`
```js
// pages/info/info.js
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad，监听页面加载,只会触发一次')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log('onReady，一个页面只会调用一次')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log('onUnload')
  }
})
```


## WXS
WXS(WeiXin Script) 是小程序独有的一套脚本语言,结合WXML 可以构建页面的结构
典型应用场景是 `过滤器`,经常配合小胡子语法使用
不能作为组件的事件回调函数
wxs不能调用js中定义的函数
wxs不能调用微信的api
在IOS设备上WXS比JS快2~20倍，但在Android设备上效率无差异

### 与js的关系
- 有自己的数据类型
  number、string、boolean、object、function、array、date、regexp

- 不支持类似ES6及以上的语法形式
  不支持let、const、解构赋值、展开运算符、箭头函数、对象属性简写
  支持var定义变量

- 遵循CommonJS规范
  module对象
  require()函数
  module.exports对象


### 基础语法

#### 内嵌wxs脚本
可以编写在wxml文件的 `wxs` 标签中，**必须提供module属性**以提供**模块的名称**
```js
// msg 定义在页面的js中
<text>{{ m1.toUpper(msg) }}</text>

<wxs module="m1">
  module.exports.toUpper = function(str) {
    return str.toUpperCase()
  }
</wxs>
```

#### 外联的wxs脚本
必须添加`module`模块名称和 `src`属性必须是**相对路径**

```js
// utils/tool.wxs
function toLower(str) {
  return str.toLowerCase()
}

module.exports = {
  toLower: toLower // wxs中不能使用对象简写
}
```

```js
// 页面.wxml
<text>{{ myTool.toLower(msg) }}</text>
<wxs src="../../utils/tool.wxs" module="myTool"/>
```


## 自定义组件


### 组件的创建
自定义组件:
  在根目录中添加components文件夹,新建test文件夹,右击test文件夹选择新建component,之后会自动生成js、json、wxml、wxss 文件

### 引用组件


#### 局部引入

在**页面的.json**文件中`usingComponents`以键值对的形式引入
```json
{
  ...
  "usingComponents": {
    "my-test":"/components/test/test"
  },
  ...
}
```


#### 全局引入

与页面引入相似，但是在**app.json**文件中引入


### 组件与页面的区别

- 组件.json文件需要声明 `component: true`
- 组件的.js文件中调用的是`Component({})`,页面是`Page({})`
- 组件的事件处理函数需要定义到`methods`节点中


### 组件的样式

组件样式隔离: 

  app.wxss 中的全局样式对组件无效

  只有class选择器会有样式隔离效果,id选择器、属性选择器、标签选择器不受样式隔离影响，所以在组件和引用组建的页面中建议使用class选择器