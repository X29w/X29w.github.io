---
title: Vue3
date: 2023-02-25 23:36:05
cover: https://www.nickagas.com/wp-content/uploads/60fca23c22c4.jpg
tags:
- tecnology
categories: 
- Tecnology
- Vue
---


## 创建工程

### 使用 vite

> 创建工程
> npm init vite-app <project-name>
> 进入工程目录
> cd <project-name>
> 安装依赖
> npm install
> 运行
> npm run dev

## 常用的 Composition Api

### setup()

setup 函数的两种返回值：

- 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。
- 若返回一个渲染函数：则可以自定义渲染内容。

_Pay Attention!_

- 尽量不要与 Vue2.x 配置混用 Vue2.x 配置（data、methos、computed...）中可以访问到 setup 中的属性、方法。
- 但在 setup 中不能访问到 Vue2.x 配置（data、methos、computed...）
- 如果有重名, setup 优先。
- setup 不能是一个 async 函数，因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性。（后期也可以返回一个 Promise 实例，但需要 Suspense 和异步组件的配合）
- setup 执行的时机：在 beforeCreate 之前执行一次，this 是 undefined。

:::warning
  _setup 的参数_
- props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
- context：上下文对象
- attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 this.$attrs。
- slots: 收到的插槽内容, 相当于 this.$slots。
- emit: 分发自定义事件的函数, 相当于 this.$emit。

:::

### ref()

作用: 定义一个响应式的数据
语法:

- const xxx = ref(initValue)
- 创建一个包含响应式数据的引用对象（reference 对象，简称 ref 对象）。
- JS 中操作数据： xxx.value
- 模板中读取数据: 不需要.value，直接：<div></div>
  备注：
- 接收的数据可以是：基本类型、也可以是对象类型。
- 基本类型的数据：响应式依然是靠 Object.defineProperty()的 get 与 set 完成的。
- 对象类型的数据：内部 “ 求助 ” 了 Vue3.0 中的一个新函数—— reactive 函数。

### reactive()

作用: 定义一个对象类型的响应式数据（基本类型不要用它，要用 ref 函数）
语法：

- const 代理对象= reactive(源对象)接收一个对象（或数组），返回一个代理对象（Proxy 的实例对象，简称 proxy 对象）
- reactive 定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

## 不常用的 Composition Api

### toRef()

作用：

- 创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
  语法：
- const name = toRef(person,'name')
  应用:
- 要将响应式对象中的某个属性单独提供给外部使用时。
  扩展：
- toRefs 与 toRef 功能一致，但可以批量创建多个 ref 对象，语法：toRefs(person)

### shallowReactive() 与 shallowRef()

shallowReactive：

- 只处理对象最外层属性的响应式（浅响应式）。

shallowRef：

- 只处理基本数据类型的响应式, 不进行对象的响应式处理。

什么时候使用?

如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。

### readonly() 与 shallowReadonly()

readonly:

- 让一个响应式数据变为只读的（深只读）。
  shallowReadonly：
- 让一个响应式数据变为只读的（浅只读）。
  应用场景: 不希望数据被修改时。

### toRaw() 与 markRaw()

toRaw：
作用：

- 将一个由 reactive 生成的响应式对象转为普通对象。
  使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
  markRaw：
  作用：
- 标记一个对象，使其永远不会再成为响应式对象。
  应用场景:
  有些值不应被设置为响应式的，例如复杂的第三方类库等。
  当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

### customRef()

作用：

- 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
  _Example↓_

```js 实现输入框的防抖
<template>
	<input type="text" v-model="keyword">
	<h3>{{keyword}}</h3>
</template>

<script>
	import {ref,customRef} from 'vue'
	export default {
		name:'Demo',
		setup(){
			// let keyword = ref('hello') //使用Vue准备好的内置ref
			//自定义一个myRef
			function myRef(value,delay){
				let timer
				//通过customRef去实现自定义
				return customRef((track,trigger)=>{
					return{
						get(){
							track() //告诉Vue这个value值是需要被“追踪”的
							return value
						},
						set(newValue){
							clearTimeout(timer)
							timer = setTimeout(()=>{
								value = newValue
								trigger() //告诉Vue去更新界面
							},delay)
						}
					}
				})
			}
			let keyword = myRef('hello',500) //使用程序员自定义的ref
			return {
				keyword
			}
		}
	}
</script>
```

### 检测型 Api

isRef:

- 检查一个值是否为一个 ref 对象
  isReactive:
- 检查一个对象是否是由 reactive 创建的响应式代理
  isReadonly:
- 检查一个对象是否是由 readonly 创建的只读代理
  isProxy:
- 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

## Computed & Watch & WatchEffect

### Computed

写法如下：

```js
import {computed} from 'vue'

setup(){
    ...
	//计算属性——简写
    let fullName = computed(()=>{
        return person.firstName + '-' + person.lastName
    })
    //计算属性——完整
    let fullName = computed({
        get(){
            return person.firstName + '-' + person.lastName
        },
        set(value){
            const nameArr = value.split('-')
            person.firstName = nameArr[0]
            person.lastName = nameArr[1]
        }
    })
}
```

### Watch

:::warning
**监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置失效）。**
**监视 reactive 定义的响应式数据中某个属性时：deep 配置有效。**
:::

```js
//情况一：监视ref定义的响应式数据
watch(
  sum,
  (newValue, oldValue) => {
    console.log("sum变化了", newValue, oldValue);
  },
  { immediate: true }
);

//情况二：监视多个ref定义的响应式数据
watch([sum, msg], (newValue, oldValue) => {
  console.log("sum或msg变化了", newValue, oldValue);
});

/* 情况三：监视reactive定义的响应式数据
			若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
			若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
*/
watch(
  person,
  (newValue, oldValue) => {
    console.log("person变化了", newValue, oldValue);
  },
  { immediate: true, deep: false }
); //此处的deep配置不再奏效

//情况四：监视reactive定义的响应式数据中的某个属性
watch(
  () => person.job,
  (newValue, oldValue) => {
    console.log("person的job变化了", newValue, oldValue);
  },
  { immediate: true, deep: true }
);

//情况五：监视reactive定义的响应式数据中的某些属性
watch(
  [() => person.job, () => person.name],
  (newValue, oldValue) => {
    console.log("person的job变化了", newValue, oldValue);
  },
  { immediate: true, deep: true }
);

//特殊情况
watch(
  () => person.job,
  (newValue, oldValue) => {
    console.log("person的job变化了", newValue, oldValue);
  },
  { deep: true }
); //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```

### WatchEffect

watch 的套路是：

- 既要指明监视的属性，也要指明监视的回调。

watchEffect 的套路是：

- 不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

watchEffect 有点像 computed：

- 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
- 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

```js
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(() => {
  const x1 = sum.value;
  const x2 = person.age;
  console.log("watchEffect配置的回调执行了");
});
```

## 生命周期

mounted=======>**onMounted**
beforeUpdate===>**onBeforeUpdate**
updated =======>**onUpdated**
beforeUnmount ==>**onBeforeUnmount**
unmounted =====>**onUnmounted**
beforeCreate===>**setup()**
created=======>**setup()**

## 自定义 Hook 函数

- 什么是 hook？—— 本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于 vue2.x 中的 mixin。
- 自定义 hook 的优势: 复用代码, 让 setup 中的逻辑更清楚易懂。

## 好用的传值

provide 与 inject
作用：

- 实现祖与后代组件间通信
  套路：
- 父组件有一个 provide 选项来提供数据，后代组件有一个 inject 选项来开始使用这些数据,其实子组件可以用，但是 prop 更简单，别给自己找麻烦

```js 具体写法——祖组件
setup(){
    ......
    let car = reactive({name:'奔驰',price:'40万'})
    provide('car',car)
    ......
}
```

```js 具体写法——后代组件
setup(props,context){
    ......
    const car = inject('car')
    return {car}
    ......
}
```

## 新的组件/标签

### Fragment

<Fragment></Fragment>

- 在 Vue2 中: 组件必须有一个根标签
- 在 Vue3 中: 组件可以没有根标签, 内部会将多个标签包含在一个 Fragment 虚拟元素中
- 好处: 减少标签层级, 减小内存占用

### Teleport

<Teleport></Teleport>
一种能够将我们的组件 html 结构移动到指定位置的技术。
_无视所在盒子的 position，指哪打哪，其中“to”属性就是告诉代码依托于谁定位_

```js Example
<teleport to="body">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

> 此例中，就直接将 body 作为参考位置

### Suspense

<Suspense></Suspense>
等待异步组件时渲染一些额外内容，让应用有更好的用户体验

_异步引入组件_
import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))

:::warning
使用 Suspense 包裹组件，并配置好 default 与 fallback
:::

```html
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <Child />
      </template>
      <template v-slot:fallback>
        <h3>加载中.....</h3>
      </template>
    </Suspense>
  </div>
</template>
```

## 全局 Api 的转移

|   2.x 全局 API（Vue）   | 3.x 实例 API (app)  |
|  ----  | ----  |
| Vue.config.xxxx  | app.config.xxxx |
| Vue.config.productionTip  | 移除 |
| Vue.component | app.component|
| Vue.directive | app.directive |
| Vue.mixin | app.mixin |
| Vue.use | app.use |
| Vue.prototype | app.config.globalProperties |

