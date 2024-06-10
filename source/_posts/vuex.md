---
title: Vuex
date: 2023-03-21 23:29:07
cover: 'https://developer.johncayde.com/img/tech/vuex.png'
tags:
- tecnology
categories: 
- Tecnology
- Vue
- Gadgets
---



## Vuex介绍
### What's the Vuex?
>概念：专门在Vue中实现集中式状态（数据）管理的一个Vue插，对Vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7b77fdcf29d410eb74f4872dd9c82fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" />


### 核心流程
- store： 每一个Vuex应用的核心就是store(仓库),store基本上就是一个容器，它包含着应用中大部分的状态 (state)。
- state ： 共同维护的一个状态，state里面可以是很多个全局状态
- getters：获取数据并渲染
- actions：数据的异步操作
- mutations：处理数据的唯一途径，state的改变或赋值只能在这里

## 实际体验
### 配置vuex
- 下载安装vuex  `npm install vuex`
- 创建`src/store/index.js`*该文件用于创建Vuex最为核心的store*

``` js src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex' //引入Vuex

Vue.use(Vuex) //应用Vuex插件

const actions = {}      // 准备actions用于响应组件中的动作
const mutations = {}    // 准备mutations用于操作数据state
const state = {}        // 准备state用于存储数据

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    getters,
    state
})
```

- 在src/main.js中创建vm时传入store配置项
``` js src/store/index.js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
    el:'#app',
    render:h => h(App),
    store,

})
```

### 使用Vuex
- 初始化数据`state`、配置`actions`、`mutations`、操作文件`store.js`
- 组件中*读取*`Vuex`中的数据：`$store.state.数据`
- 组件中*修改*`Vuex`中的数据：`this.$store.dispatch('action中的方法名',数据)`或者`this.$store.commit('mutations中的方法名',数据)`
>如果没有网络请求或其他业务逻辑，组件中也可以 越过`actions`，即不写`dispatch`,直接写`commmit`


## Getters 配置项
>当`state`中的数据需要经过加工后再使用是，可以使用`getters`加工,，相当于全局计算属性
- 组件中想读取getters中的数据则`$store.getters.函数名`


## MapState 辅助函数
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。可以使用`mapstate()`辅助函数帮助生成计算属性
*Example*
```js
export default {
    comuted:{
        ...mapState({sum:'sum',school:'school',subject:'subject'})//写法一 对象
        ...mapState(['sum','school','subject'])//写法二 数组
    }
}
```

## MapGetters
*Example*
```js
export default {
    comuted:{
        ...mapGetters({bigSum:'bigSum'})//写法一 对象

        ...mapGetters(['bigSum'])//写法二 数组
    }
}
```

## MapActions 
用于帮助生成与`actions`对话的方法，即包含了$store.dispatch(xx)的函数
```js
export default {
    methods:{
        //靠mapActions生成：incrementOdd、incrementWait（对象形式）
        ...mapActions({incrementOdd:'jiaOdd'},incrementWait:'jiaWait')

        //靠mapActions生成：incrementOdd、incrementWait（数组形式）
         ...mapActions(['jiaOdd','jiaWait'])
    }
}
```

## MapMutations
用于帮助生成与`mutations`对话的方法，即包含`$store.commit(xx)`的函数
```js
export default {
    methods:{
        //靠mapMutations生成：increment、decreament（对象形式）
        ...mapMutations({increment:'JIA'},decreament:'JIAN')

        //靠mapMutations生成：increment、decreament（数组形式）
         ...mapMutations(['JIA','JIAN'])
    }
}
```

## 模块化&命名空间
- 目的：让代码更好维护，让多种数据分类更加明确
- 修改`store.js`：为了解决不同模块命名冲突的问题，设置不同模块的`namespaced:true`,之后在不同页面引入`geeter`、`actions`、`mutations`时，需要加上所属模块名

*Example*

:::details 
```js
const countAbout = {
    naspaced:true,
    state:{},
    mutaitons:{},
    actions:{},
    getters:{}
}
const personAbout = {
    naspaced:true,
    state:{},
    mutaitons:{},
    actions:{},
    getters:{}
}
const store = new Vuex.Store({
    modules:{
        countAbout,
        personAbout
    }
})
```
:::

### 开启命名空间后组件中读取state数据
```js
// 方式一：直接读取
this.$store.state.personAbout.list
// 方式二：mapState
...mapState('countAbout',['sum','school','subject'])
```

### 开启命名空间后组件中读取getters数据
```js
// 方式一：直接读取
this.$store.getters['perAbout/firstPersonName']
// mapGetters
...mapGetters('countAbout',['bigSum'])
```

### 开启命名空间后组件中调用dispatch
```js
// 方式一：直接读取
this.$store.getters['perAbout/addPersonWang',person]
// mapActions
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiawait'})
```

### 开启命名空间后组件中调用commit
```js
// 方式一：直接读取
this.$store.commit['perAbout/ADD_PERSON',person]
// mapActions
...mapActions('countAbout',{increment:'JIA',decrement:'JIAN'})
```
