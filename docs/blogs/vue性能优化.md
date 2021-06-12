## v-for 

设置`key`值, 便于快速定位和虚拟节点的diff算法使用



## 组件化、模块化

1 封装具有高度复用性的模块和组件

2 拆分高度复用性的组件

3 组件可配置性强

## 路由懒加载

首屏加快渲染

## production SourceMap

SourceMap用于生产环境定位源码，如果不设置成false会生成map文件，增大打包体积，而且生产环境能定位源码，有安全隐患

设置成false

生成map文件、定位源码



## production Gzip

true

启用gzip压缩功能，打包体积更小



## keep-alive

缓存组件（不活跃的组件）

```
<keep-alive includ="组件名">
	<router-view />
</keep-alive>
```



## 插件CDN 引入

减少打包体积，只需要configureWebpack中注册



## 图片CDN

图片使用远程CDN地址

图标使用CSS图标



## 图片懒加载

vue-lazyload 插件



## 组件按需导入