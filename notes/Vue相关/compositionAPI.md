| vue2       | vue2            |
| ---------- | --------------- |
| option API | composition API |

### setup() 调用时机:

​	在初始化属性之后，beforeCreate 之前



setup() 返回的对象会合并到render 函数的context ，所以在模板中能够使用



### ref

// 修改 或 获取 都需要.value ,但在模板中会自动展开，不需要.value

```js
<template>
	{{count}}
</template>

export default {
	setup() {
		const count = ref(0)
		count.value = 2
		console.log(count.value)
		
		return { count }
	}
}
```

#### unref 语法糖
unref(obj) 返回一个普通对象
是以下语句的语法糖

```
const result = isRef(obj)?obj.value:obj
```

#### ref 在template 和 在composition中使用

- 用在元素上

本质是一样的，用ref(null) 初始值一般给null

```js
<template>
	<div ref="root">xxx</div>
</template>
...
import { ref } from 'vue'
export default {
	setup() {
		const root = ref(null)
		
		return { root }
	}
}
```

- 用在子组件上 获取到的是组件实例，可以通过.value.function() 调用组件上的方法

```
<Child ref="child" />

...

const child = ref(null)
child.value.myFunction()
```

- 在v-for中使用 用于获取动态渲染出来的dom节点

```html
<template>
  <ul v-for="(item, index) in items" :key="item">
    <li :ref="el => { if(el) {list[index] = el}}">{{item.name}}</li>
  </ul>
</template>
...
  setup () {
    const items = [
      { name: 'aaaa', age: 1 },
      { name: '2aaf', age: 65 },
      { name: 'zaf', age: 2 },
      { name: 'eyeaf', age: 6 }
    ]
    const list = ref([])
    onMounted(() => console.log(list.value))
    return { items, list }
    
  }
}
```

  

### h

当setup() return 一个h 函数

```JS
import { ref, h } from 'vue'
export default {
  setup() {
    const count = ref(0)

    return () => h('h1',[count.value])
  }
}
```



### setup() 接收被解析过的props 作为第一个参数

props 已经是响应式的了

通过console.log(props) 可以看到它是proxy包装过的



 - 不要解构 props ,否则props 会丧失响应性
 - 不要更改props 的值，而应该更改提供方的数据



### setup() 接收context作为第一个参数
context 包括 { attrs, slots, emit }
不像props ，context 是一个普通的JavaScript对象，所以可以安全的解构

### props 和 context 分开的原因
props 比context 更加常用，而且很多组件只需要props
单独拿出props可以方便的进行类型校验

### setup()中 this 指向问题
setup() 在 onCreated 之前，所以不能像vue2.x 一样使用this 



### provide/injection

#### 使用例子

在祖先组件中provide

```
import { provide } from 'vue'
...
setup () {
	provide(key, value)
	provide('name','张三')
	provide('age', 99)
}
```

在子孙组件中inject

- option API 形式接收

```
export default {
	inject: [key, 'name', 'age']
}
```

- composition API 形式接收

```
import { inject } from 'vue'
...
setup() {
	const key = inject(key, '可选的默认值')
	const name = inject('name')
	const age = inject('age',0)
	
	return { key, name, age }
}
```



#### 增加响应

使用ref 或者 reactive 包裹原数据即可

```
- 祖先组件 
const name = ref('张三')
provide('name', name)
- 子孙组件
const name = inject('name')

```

#### 子组件如何改变数据

祖先组件应该提供改变数据的方法通过provide 提供给子组件，然后子组件inject接收这个方法来改变数据，

并且为了确保提供的数据不被子孙组件更改，应使用`readonly`包裹提供的数据(就像去租车公司租车，不能让租客随意改装车辆)

比如：

祖先组件,

```
import { readonly } from 'vue'
...
const name = ref('张三')
const changeName = () => { name.value = '李四' }
provide('name',readonly(name))
provide ('changeName', readonly(changeName))
```

子孙组件

```
const name = inject ('name')
const changeName = inject('changeName')
changeName()
```

