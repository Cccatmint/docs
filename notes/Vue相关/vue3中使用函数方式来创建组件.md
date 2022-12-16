# Vue3使用函数方法来调用组件

重点是使用createApp() 创建并且挂载组件

createApp(xxx.vue, 组件的props)

以消息框举例

Message.vue 文件内容

```html
<template>
  <div class="message"
    :class="classObj"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message: String,
    type: {
      type: String,
      default: 'info'
    }
  },
  setup (props) {
    const classObj = {
      'message-success': props.type === 'success',
      'message-info': props.type === 'info',
      'message-warning': props.type === 'warning',
      'message-danger': props.type === 'danger'
    }

    return { classObj }
  }
}
</script>

<style lang="scss" scoped>
 .message {
   position: fixed;
   top: calc(50% - .3rem);
   left: calc(50% - 1.5rem);
   width: 3rem;
   height: .6rem;
   background-color: #424242;
   text-align: center;
   line-height: .6rem;
 }
 .message-success {
   color: #3c763d;
   background-color: #dff0d8;
   border-color: #d6e9c6;
 }
 .message-info {
   color: #31708f;
   background-color: #d9edf7;
   border-color: #bce8f1;
 }
 .message-warning {
   color: #8a6d3b;
   background-color: #fcf8e3;
   border-color: #faebcc;
 }
 .message-danger {
   color: #a94442;
   background-color: #f2dede;
   border-color: #ebccd1;
 }
</style>

```

Message.js

```js
import { createApp } from 'vue'
import Message from './Message.vue'

function createMessage (message, type) {
  // 接受第二个参数 是 props 创建实例
  const messageInstance = createApp(Message, { message, type })
	// 挂载实例
  const moutNode = document.createElement('div')
  document.body.appendChild(moutNode)
  messageInstance.mount(moutNode)
  // 自动卸载
  setTimeout(() => {
    messageInstance.unmount(moutNode)
    document.body.removeChild(moutNode)
  }, 2000)
}

export default createMessage
```

应用 example.vue

```js
import createMessage from '../../Message.js'
...
const handleClikc = () => {
	createMessage('内容','info')
}
```

