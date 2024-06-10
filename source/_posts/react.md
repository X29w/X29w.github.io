---
title: React
date: 2023-03-22 22:07:08
cover: 'https://wallpaperaccess.com/full/3949089.jpg'
tags:
- tecnology
categories: 
- Tecnology
- React
---



## React 入门

<a href="https://reactjs.org/" title="英文网站" target="_blank">点我去官网</a>

### React 的基本使用

### 需要的相关依赖文件

- `react.js`：React 核心库。
- `react-dom.js`：提供操作 DOM 的 react 扩展库。
- `babel.min.js`：解析 JSX 语法代码转为 JS 代码的库

> 引入顺序为：
> 1.react.js
> 2.react-dom.js
> 3.babel.min.js

### 创建虚拟 DOM 的两种方式

- 纯 JS 方式(一般不用)
- JSX 方式

### 虚拟 DOM 与真实 DOM

- React 提供了一些 API 来创建一种 “特别” 的一般 js 对象
  - `const VDOM = React.createElement('xx',{id:'xx'},'xx')`
  - 上面创建的就是一个简单的虚拟 DOM 对象
- 虚拟 DOM 对象最终都会被 React 转换为真实的 DOM
- 我们编码时基本只需要操作 react 的虚拟 DOM 相关数据, react 会转换为真实 DOM 变化而更新界。

## JSX

### JSX

- 全称: JavaScript XML
- react 定义的一种类似于 XML 的 JS 扩展语法: JS + XML 本质是 React.createElement(component, props, ...children)方法的语法糖
- 作用: 用来简化创建虚拟 DOM
  - 写法：`var ele = <h1>Hello JSX!</h1>`
  - 注意 1：它不是字符串, 也不是 HTML/XML 标签
  - 注意 2：它最终产生的就是一个 JS 对象
- 标签名任意: HTML 标签或其它标签
- 标签属性任意: HTML 标签属性或其它
- 基本语法规则
  - 遇到 `<`开头的代码, 以标签的语法解析: html 同名标签转换为 html 同名元素, 其它标签需要特别解析
  - 遇到以`{` 开头的代码，以 JS 语法解析: 标签中的 js 表达式必须用`{ }`包含
- babel.js 的作用

  - 浏览器不能直接解析 JSX 代码, 需要 babel 转译为纯 JS 的代码才能运行
  - 只要用了 JSX，都要加上*type="text/babel"*, 声明需要 babel 来处理

  ### 渲染虚拟 DOM（元素）

- 语法: ReactDOM.render(virtualDOM, containerDOM)
- 作用: 将虚拟 DOM 元素渲染到页面中的真实容器 DOM 中显示
- 参数说明
  - 参数一: 纯 js 或 jsx 创建的虚拟 dom 对象
  - 参数二: 用来包含虚拟 DOM 元素的真实 dom 元素对象（一般是个`<div></div>`）
- _Example:_ `ReactDOM.render(<Test />,document.getElementById('root'))`

### JSX 语法

- 定义虚拟 DOM，不能使用`“”`
- 标签中混入 JS 表达式的时候使用`{}`
- `id = {myId.toUpperCase()}`
- 样式的类名指定不能使用`class`，使用`className`
- 内敛样式要使用`{{}}`包裹
- `style={{color:'skyblue',fontSize:'24px'}}`
- 不能有多个根标签，只能有一个根标签
- 标签必须闭合，自闭合也行
- 如果小写字母开头，就将标签转化为 html 同名元素，如果 html 中无该标签对应的元素，就报错；如果是大写字母开头，react 就去渲染对应的组件，如果没有就报错

### 注释写法

```jsx 写在大括号里
ReactDOM.render(
  <div>
    <h1>小丞</h1>
    {/*注释...*/}
  </div>,
  document.getElementById("example")
);
```

### 数组插入并遍历

- JSX 允许在模板中插入数组，数组自动展开全部成员

```jsx
var arr = [<h1>小丞</h1>, <h2>同学</h2>];
ReactDOM.render(<div>{arr}</div>, document.getElementById("example"));
```

- 根据动态数据生成 <li></li>

```jsx
const data = ["A", "B", "C"];
const VDOM = (
  <div>
    <ul>
      {data.map((item, index) => {
        return <li key={index}>{item}</li>;
      })}
    </ul>
  </div>
);
ReactDOM.render(VDOM, document.querySelector(".test"));
```

## React 面向组件编程

### Tips

- 组件名必须首字母大写
- 虚拟 DOM 元素只能有一个根元素
- 虚拟 DOM 元素必须有结束标签

### 渲染类组件标签的基本流程

- React 内部会创建组件实例对象
- 调用 render()得到虚拟 DOM, 并解析为真实 DOM
- 插入到指定的页面元素内部

### 函数式组件

```jsx
//1.先创建函数，函数可以有参数，也可以没有，但是必须要有返回值 返回一个虚拟DOM
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//2.进行渲染
ReactDOM.Render(<Welcom name="ljc" />, document.getElementById("div"));
```

### 类式组件

```jsx
class MyComponent extends React.Component {
  state = { isHot: false };
  render() {
    const { isHot } = this.state;
    return (
      <h1 onClick={this.changeWeather}>今天天气很{isHot ? "炎热" : "凉爽"}</h1>
    );
  }
  changeWeather = () => {
    const isHot = this.state.isHot;
    this.setState({ isHot: !isHot });
  };
}
ReactDOM.render(<MyComponent />, document.querySelector(".test"));
```

- 组件中的 render 方法中的 this 为组件实例对象
- 组件自定义方法中由于开启了严格模式，this 指向 undefined 如何解决
  - 通过 bind 改变 this 指向
  - 推荐采用箭头函数，箭头函数的 this 指向
- state 数据不能直接修改或者更新

### 组件实例三大属性

#### State

React 里，只需更新组件的 state，然后根据新的 state 重新渲染用户界面（不要操作 DOM）

```jsx
class Weather extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    weather: "炎热",
  };
  render() {
    return (
      <div>
        <h2>当前季节为：{this.state.weather}</h2>
      </div>
    );
  }
}
```

- 使用的时候通过`this.state`调用 state 里面的值
- 修改 state 里面的值通过调用`this.setState(partialState, [callback])`
  - `partialState`: 需要更新的状态的部分对象
  - `callback`: 更新完状态后的回调函数/直接要修改的值
  - `setState` 是一种合并操作，不是替换操作
  - 在执行 `setState` `操作后，React` 会自动调用一次 `render()`
  - `render()` 的执行次数是 _1+n_ (1 为初始化时的自动调用，n 为状态更新的次数)

#### Props

与`state`不同，`state`是组件自身的状态，而`props`则是外部传入的数据

```jsx
class Person extends React.Component {
  render() {
    return (
      <ul>
        <li>{this.props.name}</li>
        <li>{this.props.age}</li>
        <li>{this.props.sex}</li>
      </ul>
    );
  }
  // 对 props传过来的数据进行数据类型的限制
  static propTypes = {
    name: propTypes.string.isRequired,
    sex: PropTypes.string,
    speak: PropTypes.func,
  };
  // 对没有传的数据进行一个默认的填充
  static defaultProps = {
    sex: "male",
    age: 18,
  };
}
    const p ={
        name:"Lisa",
        age:{19} ,
        sex:"female"
    }

ReactDOM.render(
  <Person {...p}/>,document.getElementById("root")
);
```

- 在使用的时候可以通过 this.props 来获取值 类式组件的 props:
  - 通过在组件标签上传递值，在组件中就可以获取到所传递的值
  - 在构造器里的 props 参数里可以获取到 props
  - 可以分别设置 propTypes 和 defaultProps 两个属性来分别操作 props 的规范和默认值，两者都是直接添加在类式组件的原型对象上的（所以需要添加 static）
  - 同时可以通过...运算符来简化

#### Refs

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

- 有三种操作 refs 的方法，分别为：
  - 字符串形式
  - 回调形式
  - createRef 形式

**字符串形式 refs**

```jsx
()=>{
    alert(this.refs.inp1)
}
render(){return(<input ref="inp1" type="text" placeholder="点击弹出" />)}
```

**回调形式的 refs**
组件实例的 ref 属性传递一个回调函数 c => this.input1 = c （箭头函数简写），这样会在实例的属性中存储对 DOM 节点的引用，使用时可通过 this.input1 来使用

```jsx
<input
  ref={(c) => (this.input1 = c)}
  type="text"
  placeholder="点击按钮提示数据"
/>
```

**createRef 形式**
React 给我们提供了一个相应的 API，它会自动的将该 DOM 元素放入实例对象中

```jsx DOM
<input ref={this.MyRef} type="text" placeholder="点击弹出" />
<input ref={this.MyRef1} type="text" placeholder="点击弹出" />
```

```jsx
MyRef = React.createRef();
MyRef1 = React.createRef();
```

```jsx 使用
//调用
btnOnClick = () => {
  //创建之后，将自身节点，传入current中
  console.log(this.MyRef.current.value);
};
```

**高阶函数及函数的柯里化**
以下例子即可知道，只可意会不可言传

:::details 函数柯里化

```jsx
class MyComponent extends React.Component {
  state = {
    username: "",
    password: "",
  };
  saveFormInformation = (dataType) => {
    return (event) => {
      console.log(dataType, event.target.value);
      this.setState({ [dataType]: event.target.value });
    };
  };

  render() {
    return (
      <div>
        <h1>函数柯里化Example</h1>
        <form>
          <div>
            <input
              onChange={this.saveFormInformation("username")}
              type="text"
              placeholder="请输入用户名"
            />
            <br />
            <br />
          </div>
          <div>
            <input
              onChange={this.saveFormInformation("password")}
              type="password"
              placeholder="请输入密码"
            />
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("test"));
```

:::

:::details 避免函数柯里化

```jsx
class MyComponent extends React.Component {
  state = {
    username: "",
    password: "",
  };
  saveInfomation = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <div>
          <input
            onChange={(event) => {
              this.saveInfomation("username", event.target.value);
            }}
            type="text"
            placeholder="请输入用户名"
          />
        </div>
        <br />
        <br />
        <div>
          <input
            onChange={(event) => {
              this.saveInfomation("password", event.target.value);
            }}
            type="password"
            placeholder="请输入密码"
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<MyComponent />, document.getElementById("test"));
```

:::

## 生命周期

React 生命周期主要包括三个阶段：初始化阶段，更新阶段，销毁阶段

### 旧的生命周期流程

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e12b2e35c8444f19b795b27e38f4c149~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" />

- 初始化阶段: 由 `ReactDOM.render()`触发---初次渲染
  - constructor()
  - componentWillMount()
  - render()
  - componentDidMount()
- 更新阶段: 由组件内部 `this.setSate()`或父组件重新 render 触发
  - shouldComponentUpdate()
  - componentWillUpdate()
  - render()
  - componentDidUpdate()
- 卸载组件: 由`ReactDOM.unmountComponentAtNode()`触发
  - componentWillUnmount

### 新的生命周期流程

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7d8676f379d4d96bbf0ebd9a8528594~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp" />

- 初始化阶段: 由 ReactDOM.render()触发---初次渲染
  - constructor()
  - getDerivedStateFromProps
  - render()
  - componentDidMount()
- 更新阶段: 由组件内部 this.setSate()或父组件重新 render 触发
  - getDerivedStateFromProps
  - shouldComponentUpdate()
  - render()
  - getSnapshotBeforeUpdate
  - componentDidUpdate()
- 卸载组件: 由 ReactDOM.unmountComponentAtNode()触发
  - componentWillUnmount()

### 重要的钩子

- render：初始化渲染或更新渲染调用
- componentDidMount：开启监听, 发送 ajax 请求
- componentWillUnmount：做一些收尾工作, 如: 清理定时器

### 废弃的钩子

- componentWillMount
- componentWillReceiveProps
- componentWillUpdate

## React 脚手架

### 安装脚手架

**WebPack**

- 第一步：全局安装`create-react-app` `npm install create-react-app -g`
- 第二步：创建项目`create-react-app hello-react`

**Vite**

- `npm init vite`照着提示一步一步来就行

### 脚手架项目结构

**WebPack**

- hello-react
  - .gitignore _自动创建本地仓库_
  - package.json _相关配置文件_
  - public _公共资源_
    - favicon.ico _浏览器顶部的 icon 图标_
    - index.html _应用的 index.html 入口_
    - logo192.png _在 manifest 中使用的 logo 图_
    - logo512.png _同上_
    - manifest.json _应用加壳的配置文件_
    - robots.txt _爬虫的协议文件_
  - src _源码文件夹_
    - App.css // _pp 组件的样式_
    - App.js _App 组件_
    - App.test.js _用于给 APP 做测试_
    - index.css _样式_
    - index.js _入口文件_
    - logo.svg _logo 图_
    - reportWebVitals.js _页面性能分析文件_
    - setupTests.js _组件单元测试文件_
  - yarn.lock

## 消息订阅与发布

解决兄弟组件之间需要`<App/>`帮助的问题

- 首先安装 `pubsub-js`
  - `yarn add pubsub-js`
  - `npm install pubsub-js`
- 引入
  - `import PubSub from 'pubsub-js'`

### 订阅消息

我们通过 `subscribe` 来订阅消息，它接收两个参数，第一个参数是消息的名称，第二个是消息成功的回调，回调中也接受两个参数，一个是消息名称，一个是返回的数据

```jsx
PubSub.subscribe("search", (msg, data) => {
  console.log(msg, data);
});
```

### 发布消息

我们采用 `publish` 来发布消息

```jsx
// 之前的写法
this.props.updateAppState({ isFirst: false, isLoading: true });
// 改为发布订阅方式
PubSub.publish("search", { isFirst: false, isLoading: true });
```

这样我们就能成功的在请求之前发送消息，我们只需要在 List 组件中订阅一下这个消息即可，并将返回的数据用于更新状态即可

```jsx
PubSub.subscribe("search", (msg, stateObj) => {
  this.setState(stateObj);
});
```

同时上面的代码会返回一个 token ，这个就类似于定时器的编号的存在，我们可以通过这个 token 值，来取消对应的订阅

通过 unsubscribe 来取消指定的订阅

```jsx
PubSub.unsubscribe(this.token);
```


