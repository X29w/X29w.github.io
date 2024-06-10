---
title: Redux
date: 2023-03-24 20:29:23
cover: 'https://th.bing.com/th/id/R.a3118e1ca33fffdf56eb9f49842e2779?rik=PXEmnkjI%2f6z19w&riu=http%3a%2f%2fninjadolinux.com.br%2fwp-content%2fuploads%2f2020%2f06%2fredux-cover-imgage.jpg&ehk=rKuob5QbPfHZBBYTxsJ5dPI3MoSbsY7oZ6cqUZi02sk%3d&risl=&pid=ImgRaw&r=0'
tags:
- tecnology
categories: 
- Tecnology
- React
---


## Redux
- 我们先明晰 Redux 的作用 ，实现集中式状态管理。
- Redux 适用于多交互、多数据源的场景。简单理解就是复杂
- 从组件角度去考虑的话，当我们有以下的应用场景时，我们可以尝试采用 Redux 来实现
- 某个组件的状态需要共享时
- 一个组件需要改变其他组件的状态时
- 一个组件需要改变全局的状态时
- 除此之外，还有很多情况都需要使用 Redux 来实现

<img src="https://camo.githubusercontent.com/fff0da4b9407b914a56a380f29d84e77e873081ff4ee074256952cc850b29e4e/68747470733a2f2f6c6a63696d672e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f696d672f696d6167652d32303231303930393139343434363938382e706e67"/>

这张图，非常形象的将纯 React 和 采用 Redux 的区别体现了出来

## Redux 的工作流程
<img src="https://camo.githubusercontent.com/2812b487bd1531f405247c152855fe2eff3d1a5705e78f811d29f43e95376d27/68747470733a2f2f6c6a63696d672e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f696d672f696d6167652d32303231303930393139343930303533322e706e67"/>

首先组件会在 `Redux` 中派发一个 `action` 方法，通过调用 `store.dispatch` 方法，将 `action` 对象派发给 `store` ，当 `store` 接收到 `action` 对象时，会将先前的 `state` 与传来的 `action` 一同发送给 `reducer` `，reducer` 在接收到数据后，进行数据的更改，返回一个新的状态给 `store` ，最后由 `store` 更改 `state`

<img src="https://camo.githubusercontent.com/40847f53b451a68ad0e0e600352512f9effb957378a2206de49f66815d978373/68747470733a2f2f70312d6a6a2e62797465696d672e636f6d2f746f732d636e2d692d74326f616761326173782f676f6c642d757365722d6173736574732f323031392f31312f31322f313665356664313539376661656334647e74706c762d74326f616761326173782d77617465726d61726b2e6177656270" />

## Redux 三个核心概念
### Store
>`store` 是 `Redux` 的核心，可以理解为是 `Redux` 的数据中台，我们可以将任何我们想要存放的数据放在 `store` 中，在我们需要使用这些数据时，我们可以从中取出相应的数据。因此我们需要先创建一个 `store` ，在 Redux 中可以使用 `createStore API` 来创建一个 `store`

在生产中，我们需要在 `src` 目录下的 `redux` 文件夹中新增一个 `store.js` 文件，在这个文件中，创建一个 `store` 对象，并暴露它

因此我们需要从 redux 中暴露两个方法

``` jsx
import {
    createStore,
    applyMiddleware
} from 'redux'
```

并引入为 count 组件服务的 reducer

``` jsx
import countReducer from './count_reducer'
```
最后调用 createStore 方法来暴露 store

``` jsx
export default createStore(countReducer, applyMiddleware(thunk))
```

在 `store` 对象下有一些常用的内置方法

获取当前时刻的 `store` ，我们可以采用 `getStore` 方法

``` jsx
const state = store.getState();
```

在前面我们的流程图中，我们需要通过 store 中的 dispatch 方法来派生一个 `action` 对象给 `store`
``` jsx
store.dispatch(`action对象`)
```

最后还有一个 `subscribe` 方法，这个方法可以帮助我们订阅 `store` 的改变，只要 `store` 发生改变，这个方法的回调就会执行

为了监听数据的更新，我们可以将 `subscribe` 方法绑定在组件挂载完毕生命周期函数上，但是这样，当我们的组件数量很多时，会比较的麻烦，因此我们可以直接将 `subscribe` 函数用来监听整个 App组件的变化

``` jsx
store.subscribe(() => {
    ReactDOM.render( < App /> , document.getElementById('root'))
})
```

### Action

`action` 是 `store` 中唯一的数据来源，一般来说，我们会通过调用 `store.dispatch` 将 `action` 传到 `store`
我们需要传递的 `action` 是一个对象，它必须要有一个 type 值
例如，这里我们暴露了一个用于返回一个 `action` 对象的方法

``` jsx
export const createIncrementAction = data => ({
    type: INCREMENT,
    data
})
```
我们调用它时，会返回一个 action 对象

### Reducer
在 `Reducer` 中，我们需要指定状态的操作类型，要做怎样的数据更新，因此这个类型是必要的。
`reducer` 会根据 `action` 的指示，对 `state` 进行对应的操作，然后返回操作后的 `state`
如下，我们对接收的 `action` 中传来的 `type` 进行判断

``` jsx
export default function countReducer(preState = initState, action) {
    const {
        type,
        data
    } = action;
    switch (type) {
        case INCREMENT:
            return preState + data
        case DECREMENT:
            return preState - data
        default:
            return preState
    }
}
```
更改数据，返回新的状态

## 创建 constant 文件
在我们正常的编码中，有可能会出现拼写错误的情况，但是我们会发现，拼写错误了不一定会报错，因此就会比较难搞。

我们可以在 redux 目录下，创建一个 constant 文件，这个文件用于定义我们代码中常用的一些变量，例如

``` jsx
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

将这两个单词写在 constant 文件中，并对外暴露，当我们需要使用时，我们可以引入这个文件，并直接使用它的名称即可

直接使用 INCREMENT 即可

## 实现异步 action
一开始，我们直接调用一个异步函数，这虽然没有什么问题，但是难道 redux 就不可以实现了吗？

``` jsx
incrementAsync = () => {
    const { value } = this.selectNumber
    const { count } = this.state;
    setTimeout(() => {
        this.setState({ count: count + value * 1 })
    }, 500);
}
```

我们可以先尝试将它封装到 action 对象中调用

``` jsx
export const createIncrementAsyncAction = (data, time) => {
    // 无需引入 store ，在调用的时候是由 store 调用的
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}
```

当我们点击异步加操作时，我们会调用这个函数，在这个函数里接收一个延时加的时间，还有action所需的数据，和原先的区别只在于返回的时一个定时器函数

但是如果仅仅这样，很显然是会报错的，它默认需要接收一个对象

如果我们需要实现传入函数，那我们就需要告诉：你只需要默默的帮我执行以下这个函数就好！

这时我们就需要引入中间件，在原生的 redux 中暴露出 applyMiddleware 中间件执行函数，并引入 redux-thunk 中间件（需要手动下载）


``` jsx
import thunk from 'redux-thunk'
```

通过第二个参数传递下去就可以了

```jsx
export default createStore(countReducer, applyMiddleware(thunk))
```

>注意：异步 action 不是必须要写的，完全可以自己等待异步任务的结果后再去分发同步action


::: warn
采用 react-thunk 能让异步代码像同步代码一样执行，在 redux 中我们也是可以实现异步的，但是这样我们的代码中会有很多异步的细节，这不是我们想看到的，利用 react-thunk 之类的库，就能让我们只关心我们的业务
:::

## Redux 三大原则
**第一个原则**
单向数据流：整个 `Redux` 中，数据流向是单向的

UI 组件 ---> `action` ---> `store` ---> `reducer` ---> `store`

**第二个原则**
`state` 只读：在 Redux 中不能通过直接改变 `state` ，来控制状态的改变，如果想要改变 `state` ，则需要触发一次 `action。通过` `action` 执行 `reducer`

**第三个原则**
纯函数执行：每一个`reducer` 都是一个纯函数，不会有任何副作用，返回是一个新的 `state`，`state` 改变会触发 `store` 中的 `subscribe`

## 容器组件和 UI 组件
- 所有的 UI 组件都需要有一个容器组件包裹
- 容器组件来负责和 Redux 打交道，可以随意使用 Redux 的API
- UI 组件无任何 Redux API
- 容器组件用于处理逻辑，UI 组件只会负责渲染和交互，不处理逻辑

<img src="https://camo.githubusercontent.com/40d68ea709c3da5c5f6076b277e9cf365e87cf931fb1a69389ccdc0a7bb2ac53/68747470733a2f2f6c6a63696d672e6f73732d636e2d6265696a696e672e616c6979756e63732e636f6d2f696d672f696d6167652d32303231303931303039343432363236382e706e67"/>

在我们的生产当中，我们可以直接将 UI 组件写在容器组件的代码文件当中，这样就无需多个文件

首先，我们在 src 目录下，创建一个 containers 文件夹，用于存放各种容器组件，在该文件夹内创建 Count 文件夹，即表示即将创建 Count 容器组件，再创建 index.jsx 编写代码

要实现容器组件和 UI 组件的连接，我们需要通过 connect 来实现

```jsx
// 引入UI组件
import CountUI from '../../components/Count'
// 引入 connect 连接UI组件
import {connect} from 'react-redux'
// 建立连接
export default connect()(CountUI)
```

## Provider
由于我们的状态可能会被很多组件使用，所以 React-Redux 给我们提供了一个 Provider 组件，可以全局注入 redux 中的 store ，只需要把 Provider 注册在根部组件即可

例如，当以下组件都需要使用 store 时，我们需要这么做，但是这样徒增了工作量，很不便利

``` jsx
<Count store={store}/>
{/* 示例 */}
<Demo1 store={store}/>
<Demo1 store={store}/>
<Demo1 store={store}/>
<Demo1 store={store}/>
<Demo1 store={store}/>
```

我们可以这么做：在 src 目录下的 index.js 文件中，引入 Provider ，直接用 Provider 标签包裹 App 组件，将 store 写在 Provider 中即可

``` jsx
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

这样我们在 App.jsx 文件中，组件无需手写指定 store ，即可使用 store

## Connect
在前面我们看到的 react-redux 原理图时，我们会发现容器组件需要给 UI 组件传递状态和方法，并且是通过 props 来传递，看起来很简单。但是，我们会发现容器组件中似乎没有我们平常传递 props 的情形

这时候就需要继续研究一下容器组件中的唯一一个函数 connect

connect 方法是一个连接器，用于连接容器组件和 UI 组件，它第一次执行时，接收4个参数，这些参数都是可选的，它执行的执行的结果还是一个函数，第二次执行接收一个 UI 组件

第一次执行时的四个参数：*mapStateToProps* 、*mapDispatchToProps* 、*mergeProps*、*options*

### mapStateToProps

``` jsx
const mapStateToProps = state => ({ count: state })
```

它接收 state 作为参数，并且返回一个对象，这个对象标识着 UI 组件的同名参数，

返回的对象中的 key 就作为传递给 UI 组件 props 的 key，value 就作为 props 的 value

如上面的代码，我们可以在 UI 组件中直接通过 props 来读取 count 值

``` jsx
<h1>当前求和为：{this.props.count}</h1>
```

### mapDispatchToProps
connect 接受的第二个参数是 mapDispatchToProps 它是用于建立 UI 组件的参数到 store.dispacth 方法的映射

我们可以把参数写成对象形式，在这里面定义 action 执行的方法，例如 jia 执行什么函数，jian 执行什么函数？

我们都可以在这个参数中定义，如下定义了几个方法对应的操作函数

``` jsx
{
    jia: createIncrementAction,
    jian: createDecrementAction,
    jiaAsync: createIncrementAsyncAction
}
```

似乎少了点什么，我们在这里调用了函数，创建了 action 对象，但是好像 store 并没有执行 dispatch ，那是不是断了呢？执行不了呢？

其实这里 react-redux 已经帮我们做了优化，当调用 actionCreator 的时候，会立即发送 action 给 store 而不用手动的 dispatch
- 自动调用 dispatch

### 完整开发

首先我们在 containers 文件夹中，直接编写我们的容器组件，无需编写 UI 组件

先打 rcc 打出指定代码段，然后暴露出 connect 方法

``` jsx
import { connect } from 'react-redux'
```

从 action 文件中暴露创建 action 的方法

``` jsx
import {createIncrementAction} from '../../redux/count_action'
```

编写 UI 组件，简单写个 demo，绑定 props 和方法

``` jsx
return (
    <div>
        <h2>当前求和为：{this.props.count}</h2>
        <button onClick={this.add}>点我加1</button>
    </div>
);
```

调用 connect 包装暴露 UI 组件

``` jsx
export default connect(
    state => ({ count: state }),// 状态
    { jia: createIncrementAction } // 方法
)(Count);
```

第一次执行的参数就直接传递 state 和一个指定 action 的对象

## 数据共享

###  编写 Person 组件

首先我们需要编写 index.jsx 文件，在这个文件里面编写 Person 组件的 UI 组件，并使用 connect 函数将它包装，映射它的状态和方法

``` jsx
<div>
    <h2>我是 Person 组件,上方组件求和为:{this.props.countAll}</h2>
    <input ref={c => this.nameNode = c} type="text" placeholder="输入名字" />
    <input ref={c => this.ageNode = c} type="text" placeholder="输入年龄" />
    <button onClick={this.addPerson}>添加</button>
    <ul>
        {
            this.props.persons.map((p) => {
                return <li key={p.id}> {p.name}--{p.age}</li>
            })
        }
    </ul>
</div>
```

我们可以看到这里采用了 ref 来获取到当前事件触发的节点，并通过 this.addPerson 的方式给按钮绑定了一个点击事件

**编写点击事件回调**

``` jsx
addPerson = () => {
    const name = this.nameNode.value
    const age = this.ageNode.value
    const personObj = { id: nanoid(), name, age }
    this.props.add(personObj)
    this.nameNode.value = ''
    this.ageNode.value = ''
}
```

在这里我们需要处理输入框中的数据，并且将这些数据用于创建一个 action 对象，传递给 store 进行状态的更新

在这里我们需要回顾的是，这里我们使用了一个 nanoid 库，这个库我们之前也有使用过

**下载，引入，暴露**

``` jsx
import { nanoid } from 'nanoid'
```

暴露的 nanoid 是一个函数，我们每一次调用时，都会返回一个不重复的数，用于确保 id 的唯一性，同时在后面的 map 遍历的过程中，我们将 id 作为了 key 值，这样也确保了 key 的唯一性，关于 key 的作用，可以看看 diffing 算法的文章

**状态管理**
在这里我们需要非常熟练的采用 this.props.add 的方式来更新状态

那么它是如何实现状态更新的呢？我们来看看

在我们调用 connect 函数时，我们第一次调用时传入的第二个参数，就是用于传递方法的，我们传递了一个 add 方法

``` jsx
export default connect(
    state => ({ persons: state.person, countAll: state.count }),//映射状态
    { add: createAddPersonAction }
)(Person);
```

它的原词是：mapDispatchToProps

我的理解是，传入的东西会被映射映射成 props 对象下的方法，这也是我们能够在 props 下访问到 add 方法的原因

>对于这一块 connect ，我们必须要能够形成自己的理解，这里非常的重要，它实现了数据的交互，不至于一个组件，而是全部组件

>想象一个 store 仓库，在我们这个案例当中，Count 组件需要存放 count 值在 store 中，Person 组件需要存放新增用户对象在 store 中，我们要把这两个数据存放在一个对象当中。当某个组件需要使用 store 中的值时，可以通过 connect 中的两个参数来获取，例如这里我们需要使用到 Count 组件的值，可以通过 .count 来从 store 中取值。

也就是说，所有的值都存放在 store 当中，通过点运算符来获取，所有的操作 store 的方法都需要通过 action 来实现。当前组件需要使用的数据都需要在 connect 中暴露

### 编写 reducer
首先，我们需要明确 reducer 的作用，它是用来干什么的？

根据操作类型来指定状态的更新

也就是说当我们点击了添加按钮后，会将输入框中的数据整合成一个对象，作为当前 action 对象的 data 传递给 reducer

我们可以看看我们编写的 action 文件，和我们想的一样

``` jsx
import { ADD_PERSON } from "../constant";
// 创建一个人的action 对象
export const createAddPersonAction = (personObj) => ({
  type: ADD_PERSON,
  data: personObj,
});
```

当 reducer 接收到 action 对象时，会对 type 进行判断

``` jsx
export default function personReducer(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_PERSON:
      return [data,...preState]
    default:
      return preState
  }
}
```

一般都采用 switch 来编写

这里有个值得注意的地方是，这个 personReducer 函数是一个纯函数，什么是纯函数呢？这个是高阶函数部分的知识了，纯函数是一个不改变参数的函数，也就是说，传入的参数是不能被改变的。

为什么要提这个呢？在我们 return 时，有时候会想通过数组的 API 来在数组前面塞一个值，不也可以吗？

但是我们要采用 unshirt 方法，这个方法是会改变原数组的，也就是我们传入的参数会被改变，因此这样的方法是不可行的！


### 打通数据共享

采用 Redux 来进行组件的数据交互真的挺方便。

我们可以在 Count 组件中引入 Person 组件存在 store 中的状态。

``` jsx
export default connect(state => ({ count: state.count, personNum: state.person.length }),
    {
       ...
    }
)(Count)
```

在这里我们将 store 中的 person 数组的长度暴露出来这样 Count 组件就可以直接通过 props 来使用了

同样的我们也可以在 Person 组件中使用 Count 组件的值

从而实现了我们的这个 Demo

###  最终优化
- 利用对象的简写方法，将键名和键值同名，从而只写一个名即可
- 合并 reducer ，我们可以将多个 reducer文件 写在一个 index 文件当中，需要采用 combineReducers 来合并


