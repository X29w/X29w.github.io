---
title: Pinia
date: 2023-03-21 23:21:53
cover: 'https://pinia.vuejs.org/social.png'
tags:
- tecnology
categories: 
- Tecnology
- Gadgets
---


## 介绍

但 Pinia 适用于 _Vue 2_ 和 _Vue 3_ ，并且不需要您使用组合 API。

### Benefit

- 开发工具支持
  - 跟踪操作、突变的时间表
  - 商店出现在使用它们的组件中
  - 时间旅行和更容易的调试
- 热模块更换
  - 无需重新加载页面即可修改您的商店
  - 在开发时保持任何现有状态
- 为 JS 用户提供适当的 `TypeScript` 支持或自动补全
- 服务器端渲染支持

### 与 VueX ≤ 4 对比

- `Mutation`不再存在。他们经常被认为非常冗长。他们最初带来了 devtools 集成，但这不再是问题。
- 无需创建自定义的复杂包装器来支持`TypeScript`，所有内容都是类型化的，并且 API 的设计方式尽可能地利用 TS 类型推断。
- 不再需要注入、导入函数、调用它们，享受自动补全！
- 无需动态添加`store`，默认情况下它们都是动态的
- 不再有模块的嵌套结构。您仍然可以通过在另一个`store`中导入和使用`store`来隐式嵌套`store`

## 安装

```JavaScript
yarn add pinia
// or with npm
npm install pinia
```

> 如果使用的是*Vue2*，但还是想用 pinia，就要
> `npm install @vue/composition-api`

## 项目引入

### Vue2

```JavaScript
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // other options...
  // ...
  // note the same `pinia` instance can be used across multiple Vue apps on
  // the same page
  pinia,
})
```

### Vue3

```JavaScript
import { createPinia } from 'pinia'

app.use(createPinia())
```

## 核心概念

Pinia 中的 Store 是一个保存状态和业务逻辑的实体，它不绑定到你的组件树。
换句话说，它承载全局 state。它有点像一个始终存在的组件，每个人都可以读取和写入。
它有三个概念，_state_, _getters_ and _actions_
可以看作为*Vue2*中的`data(){return{}}`、`Computed()`、`Methods`相对应

## 具体实例运用

**在 Store/index.js 中**

:::details 具体写法代码
```JavaScript
import { defineStore } from 'pinia'

/*  useStore could be anything like useUser, useCart
 [以use开头命名接收【defineStore】的返回值的变量] */
/* the first argument is a unique id of the store across your application
[【defineStore】函数中需要放入的第一个参数必须是唯一的名字在当前的所有项目中，起到了一个ID的作用] */
export const useStore = defineStore('main', {
/* 第一种：以options的方式使用 */
    //推荐箭头函数的形式，有利于TypeScript推断变量类型
      state:() =>{
        return{
            age:30
        }
    },
    getters:{
        ageComputed(state){
            return state.age + 5
        }
    },
    actions:{
        ageMethod(){
            this.age += 5
        }
    }
})
/* 第一种：以options的方式使用 */

/* 第二种：以setup(){}的方式使用 */
export const useConterStore = defineStore('countStore',()=>{
    const counter = ref(30)
    const getterCounter = computed(()=>{
        return counter.value + 5
    })
    const addCounter = () =>{
        counter.value += 5
    }
    return{
        counter,
        getterCounter,
        addCounter
    }
})
/* 第二种：以setup(){}的方式使用 */
```
:::
- 可以根据需要定义任意数量的商店，并且您应该在不同的文件中定义每个商店以充分利用 pinia
- 一旦商店被实例化，你可以访问定义的任何财产`state`，`getters`以及`actions`直接在店里。
- 直接解构赋值是不被允许的需要借助`storeToRefs()`

> 为了保证结构之后仍具有响应式数据的特点需要用到`storeToRefs()`

```html
<script setup>
  import { storeToRefs } from 'pinia';
  import { useStore } from '/Stroes/index.js'

  const store = useStore();
  const { name, doubleCount } = storeToRefs(store);
</script>
```

## State
### 定义
state是store的核心部分
在 Pinia 中，state被定义为返回初始状态的函数。
这样Pinia 在服务器端和客户端都工作。
使用箭头函数返回状态 更好的有利于`TypeScript`进行 类型推断

``` JavaScript
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
})
```

### 访问State
```js [setup]
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
// 方式1,计算属性方式
const userid = computed(() => useUserStore().userid)
// 方式2, 通过user.userid的方式使用
const user = useUserStore()
// 方式3, 使用toRef获取userid
const userid = toRef(useUserStore(), 'userid')
// 方式4, 借助pinia提供的api: storeToRefs 实现
const { userid } = storeToRefs(useUserStore())

```

### 重置状态
通过调用store 上的方法将状态重置为其初始值$reset()：
``` JavaScript
const store = useStore()

store.$reset()
```

### 修改状态
```js [setup]
import { useUserStore } from '@/stores/user'

const user = useUserStore()
// 方式1: 直接修改,vuex不允许这种方式(需要提交mutation),但pinia是允许的
user.userid = 'xxx'
// 方式2: 
user.$patch({userid: 'xxx'})
// 方式3: 
user.$patch((state) => { state.userid = 'xxx' })
// 方式4:
user.$state = { userid:'xxx' }
// 方式5: 使用actions
user.setUserId('xxx')
```

## Actions
- 像getters ，actions行动可以访问到整个存储实例 通过this与全类型（和自动完成✨）的支持。
- 与它们不同，actions可以是异步的，您可以await在它们内部进行任何 API 调用甚至其他操作！

### 访问其他store中的acttion
``` js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

## Getter
- 接收 "state" 作为第一个参数 
``` js 
state: () => ({
  userid: localStorage.getItem('userid') || '',
  counter: 0
}),
getters: {
  doubleCount: (state) => state.counter * 2,
},
```

### 常规函数使用this的注意事项
> 定义常规函数时可以通过 this 访问到 整个 store 的实例, 但是需要定义返回类型（在 TypeScript 中）。 这是由于 TypeScript 中的一个已知限制，并且不会影响使用箭头函数定义的 getter，也不会影响不使用 this 的 getter： 
``` js 
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2
    },
    // 返回类型必须明确设置
    doublePlusOne() {
      // 调用其他getter: 
      return this.doubleCount + 1
      // 等同于:
      return this.counter * 2 + 1
    },
  },
})
```

### 接收参数传递(不常用)
- Getters 只是幕后的 computed 属性，因此无法向它们传递任何参数。 但是，您可以从 getter 返回一个函数以接受任何参数： 
- 这种操作getter不再缓存，只相当于在调用函数(从store 的解构中可以看出) 
:::details Example
```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

```js 组件中
// store
getters: {
  doubleCount: (state) => state.counter * 2,
  doublePlusOne(): number {
    // 等同于调用其他getter: return this.doubleCount + 1
    return this.counter * 2 + 1
  },
  payloadCount() {
    return (payload) => this.doublePlusOne + payload
  }
},

// 组件
const { userid, payloadCount } = storeToRefs(user)
```
:::


## Store中的其他API
### $reset 重置状态
```js
store.$reset()
// PS: Setup 方式的 Store 不支持 $reset
```

### $state 访问 store 状态
```js
conosle.log(store.$state)

store.$state = { counter: 666, name: 'Paimon' }
```
### $onAction 监听 action 触发

:::details Example
```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动删除监听器
unsubscribe()
```
:::

## 插件
由于有了底层 API 的支持，Pinia store 现在完全支持扩展。以下是你可以扩展的内容：
- 为 store 添加新的属性
- 定义 store 时增加新的选项
- 为 store 增加新的方法
- 包装现有的方法
- 改变甚至取消 action
- 实现副作用，如本地存储
- 仅应用插件于特定 store

插件是通过 pinia.use() 添加到 pinia 实例的。最简单的例子是通过返回一个对象将一个静态属性添加到所有 store。
```js
import { createPinia } from 'pinia'

// 在安装此插件后创建的每个 store 中都会添加一个名为 `secret` 的属性。
// 插件可以保存在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将该插件交给 Pinia
pinia.use(SecretPiniaPlugin)

// 在另一个文件中
const store = useStore()
store.secret // 'the cake is a lie'
```


### 简介
Pinia 插件是一个函数，可以选择性地返回要添加到 store 的属性。它接收一个可选参数，即 context。
```js
export function myPiniaPlugin(context) {
  context.pinia // 用 `createPinia()` 创建的 pinia。 
  context.app // 用 `createApp()` 创建的当前应用(仅 Vue 3)。
  context.store // 该插件想扩展的 store
  context.options // 定义传给 `defineStore()` 的 store 的可选对象。
  // ...
}
```

然后用 pinia.use() 将这个函数传给 pinia：
```js
pinia.use(myPiniaPlugin)
```


### 持久化存储
```js
function persistenceStatePlugin(context) {
  const { store } = context;
  const storage = localStorage.getItem("pinia")
    ? JSON.parse(localStorage.getItem("pinia"))
    : null;
  
  if (storage) {
    store.$patch(storage[store.$id]);
  }

  store.$subscribe((mutation, state) => {
    const storage = localStorage.getItem("pinia")
      ? JSON.parse(localStorage.getItem("pinia"))
      : {};
    storage[store.$id] = state;
    localStorage.setItem("pinia", JSON.stringify(storage));
  });
}
```

