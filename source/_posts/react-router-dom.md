---
title: React-Router-Dom
date: 2023-03-22 22:10:34
cover: 'https://blog.mycode.website/wp-content/uploads/2017/10/complex-layouts.jpg'
tags:
- tecnology
categories: 
- Tecnology
- React
---



## React-Router-Dom 5

<a href="https://react-router.docschina.org/">查看印记中文网站关于 React-Router-Dom 的介绍</a>

### 路由的基本使用

index.js/index.ts 入口文件中

```jsx
ReactDOM.render(
  <React.StrictMode>
    {/* <App> 外侧包裹一个 <BrowserRouter> 或 <HashRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
```

App.jsx 中

```jsx
<div className="container-wrap">
  <div className="left">
    <Link to="/about">about</Link>
    <hr />
    <Link to="/home">home</Link>
  </div>
  <div className="main">
    <Route path="/about" component={About}></Route>
    <Route path="/home" component={Home}></Route>
  </div>
</div>
```

### 路由组件与一般组件

- 写法不同：
  - 一般组件：<Demo/>
  - 路由组件：<Route path="/about" component={About}></Route>
- 存放位置不同：
  - 一般组件：components
  - 路由组件：pages
- 接收到的 props 不同：
  - 一般组件：写组件时传递什么就收到什么
  - 路由组件：
    - history:
      - go、goBack、goForward、push、replace
    - location：
      - pathname、search、state
    - match：
      - params、path、url

### <NavLink/> 的使用及其封装

导航链接如果使用 <NavLink>，那么跳转到当前页面时，会自动给当前 <NavLink> 添加一个 `class：active`
也可以通过 `activeClassName` 属性指定 class

**使用**

```jsx
<NavLink to="/about">about</NavLink>

<NavLink activeClassName="current" to="/about">about</NavLink>
```

**封装**
标签体内容是一个特殊的标签属性，可以通过 this.props.children 拿到，设置 children 属性相当于设置了标签体内容

```jsx
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MyNavLink extends Component {
  render() {
    return <NavLink className="link" {...this.props} />;
  }
}
```

**封装后使用**

```jsx
<MyNavLink to="/about">about</MyNavLink>
```

### <Switch/>的使用

```jsx
// 2个组件都会展示
<Route path="/home" component={Home}></Route>
<Route path="/home" component={Test}></Route>

// 用 <Switch> 包裹一下，匹配到了就不继续匹配了
<Switch>
  <Route path="/about" component={About}></Route>
  <Route path="/home" component={Home}></Route>
</Switch>
```

### 路由的模糊匹配与严格匹配

默认模糊匹配，尽量不开启严格匹配
`/home/a/b `可以匹配 `/home`
`/a/home/b` 不能匹配 `/home`
<NavLink> 中的 to 属性，必须以 <Route> 中指定的 path 开头，才能匹配成功

```jsx
// 开启严格匹配，必须完全相等
<Route exact path="/home" component={Home}></Route>
```

### Redirect 的使用

```jsx
<Switch>
  <Route path="/about" component={About}></Route>
  <Route path="/home" component={Home}></Route>
	// 重定向 写在最下面  如果前面的都没匹配到，就重定向到 <Redirect> 指定的路径，兜底作用
  <Redirect to="/about"/>
</Switch>
```

### 嵌套路由

注册子路由时要在前面加上父路由
路由的匹配顺序是按注册顺序进行的

```jsx
<>
  <div>
    <h3>home</h3>
    <MyNavLink to="/home/message">message</MyNavLink>
    <MyNavLink to="/home/news">news</MyNavLink>
  </div>
  <Switch>
    <Route path="/home/message" component={Message}></Route>
    <Route path="/home/news" component={News}></Route>
  </Switch>
</>
```

### 向路由组件传递参数

- params 参数 路由中包含参数， `/xx/val1/val2`
- search 参数 `/xx?key1=val1&key2=val2`
- state 参数 路由中不显示参数 `HashRouter` 时，刷新页面会丢失参数

:::details 三种参数的举例

```jsx
<div>
  {messageArr.map((msg) => {
    return (
      <div key={msg.id}>
        {/* 传递 params 参数 */}
        {/* <Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link> */}

        {/* 传递 search 参数 */}
        {/* <Link to={`/home/message/detail?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link> */}

        {/* 传递 state 参数 */}
        <Link
          to={{
            pathname: "/home/message/detail",
            state: { id: msg.id, title: msg.title },
          }}
        >
          {msg.title}
        </Link>
      </div>
    );
  })}
  <hr />
  {/* 声明接收 params 参数 */}
  {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

  {/* search 参数无需声明接收 */}
  {/* <Route path="/home/message/detail" component={Detail}/> */}

  {/* state 参数无需声明接收 */}
  <Route path="/home/message/detail" component={Detail} />
</div>;

// 接收 params 参数
// const {id, title} = this.props.match.params

// 接收 search 参数
// const {search} = this.props.location
// const {id, title} = qs.parse(search.slice(1))

// 接收 search 参数
const { id, title } = this.props.location.state || {};
```

:::

`key=value&key2=value2` 形式叫 `urlencode` 编码

```jsx
import qs from "querystring";

let obj = { a: 1, b: 2 };

let str = qs.string(obj);

obj = qs.parse(str);
```

**Push&Replace**

```jsx
<Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>

<Link replace={true} to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>
```

### 编程式路由导航

:::details 编程式路由导航举例

```jsx
pushShow = (id, title) => {
    // push 跳转 + 携带 params 参数
    // this.props.history.push(`/home/message/detail/${id}/${title}`)

    // push 跳转 + 携带 search 参数
    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

    // push 跳转 + 携带 state 参数
    this.props.history.push(`/home/message/detail`, {id, title})
}

replaceShow = (id, title) => {
    // replace 跳转 + 携带 params 参数
    // this.props.history.replace(`/home/message/detail/${id}/${title}`)

    // replace 跳转 + 携带 search 参数
    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

    // replace 跳转 + 携带 state 参数
    this.props.history.replace(`/home/message/detail`, {id, title})
}

<button onClick={() => this.pushShow(msg.id, msg.title)}>push 查看</button>
<button onClick={() => this.replaceShow(msg.id, msg.title)}>replace 查看</button>

// 前进一步
this.props.history.goForward()
// 后退一步
this.props.history.goBack()
// 前进一步
this.props.history.go(1)
```

:::

### WitshRouter 的使用

withRouter 可以加工一般组件，让一般组件具有路由组件特有的 API，history 等
withRouter 返回值是一个新组件

:::details WitshRouter 的使用

```jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Header extends Component {
  go = () => {
    this.props.history.goForward();
  };

  back = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <h2>react-router-dom</h2>
        <button onClick={this.go}>前进</button>
        <button onClick={this.back}>后退</button>
      </div>
    );
  }
}

export default withRouter(Header);
```

:::

### BrowserRouter 与 HashRouter

- 底层原理不一样：
  - BrowserRouter 使用的是 H5 的 history API，不兼容 IE9 及以下版本
  - HashRouter 使用的是 URL 的哈希值
- path 表现形式不一样：
  - BrowserRouter 的路径中没有 #
  - HashRouter 的路径中包含 #
- 刷新后对 state 参数的影响：
  - BrowserRouter 没有任何影响，因为 state 保存在 history 对象中
  - HashRouter 刷新后会导致路由 state 参数的丢失
- HashRouter 可以解决一些路径错误相关的问题，比如多级路径刷新页面后样式丢失

## React-Router-Dom 6

### 与 v5 版本区别

- 内置组件的变化：移除<Switch/> ,新增<Routes/>
- 语法的变化：注册组件时，component={Demo} 变为 element={<Demo/>}
- 新增多个 hook:useParams,useNavigate,useMatch 等
- 官方推荐使用函数式组件了

```jsx
<Routes>
  {/* caseSensitive 设置path是否大小写敏感 */}
  <Route path="/EXTENSION" caseSensitive={true} element={<LazyDemo />}></Route>
  <Route path="/extension" element={<ExtensionDemo />}></Route>
  <Route path="/lazy-demo" element={<LazyDemo />}></Route>
  <Route path="/react-router-v6" element={<ReactRouterDomV6 />}></Route>
  {/* 这里不会继续往下匹配 */}
  <Route path="/react-router-v6" element={<ExtensionDemo />}></Route>
</Routes>
```

### 路由懒加载

```jsx
import Loading from "./components/Loading";
import {lazy()} from 'react'
// 路由懒加载 1. 调用lazy
const LazyDemo = lazy(() => import("./pages/ExtensionDemo/02_lazy"));
{
  /* 路由懒加载 2.使用Suspense */
}
<Suspense fallback={<Loading />}>
  {/* v5:使用的是 Switch */}
  <Routes>
    <Route path="/lazy-demo" element={<LazyDemo />}></Route>
  </Routes>
</Suspense>;
```

### 重定向

v6 使用<Navigator to="/xxx">替代 v5 的<Redirect to="/xxx" />

```jsx
<Route path="/" element={<Navigate to="react-router-v6"></Navigate>}></Route>
```

### 使用 useRoutes 配置路由链路表

```jsx
// 根据配置生成链路表
const allElement = useRoutes(routes);
<Suspense fallback={<Loading />}>
  {/* 路由链路表 */}
  {allElement}
</Suspense>;
```

### 嵌套路由

路由链路表父路由添加 children 字段（和 vue-router 类似）

```jsx
{
  path: '/react-router-v6',
    element: <ReactRouterDomV6 />,
    // 嵌套路由，父组件需要一个位置<Outlet />来展示
    children: [
      {
        path: 'child',
        element: <Child />,
      },
    ],
  },
```

### 路由传参 params

**定义路由参数**

```jsx
 {
    path: 'use-params/:id/:name',
    element: <UseParamsDemo />,
  }
```

**获取路由参数**
第一种：`useParams()`

```json
// 返回值：
{
  "id": "id1",
  "name": "name2"
}
```

第二种：`useMatch()`

```json
// 返回值
{
  "params": {
    "id": "id1",
    "name": "name2"
  },
  "pathname": "/react-router-v6/use-params/id1/name2",
  "pathnameBase": "/react-router-v6/use-params/id1/name2",
  "pattern": {
    "path": "/react-router-v6/use-params/:id/:name",
    "caseSensitive": false,
    "end": true
  }
}
```

### 路由参数 search

**传参**

```jsx
<NavLink className={linkClass} to="./use-search-params?id=1&name=abc&title=xxx">
  useSearchParams
</NavLink>
```

**取值**

:::details 取值示例

```jsx
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function useSearchParamsDemo() {
  const [search, setSearch] = useSearchParams();
  const id = search.get("id");
  const name = search.get("name");
  const title = search.get("title");
  console.log(id, name, title);
  // 也可从location获取
  const location = useLocation();
  console.log(location);
  const handleClick = () => {
    // 会替换url?后面所有参数
    setSearch("id=1&name=abc&title=xxx");
  };
  return (
    <div>
      <h3>useSearchParams</h3>
      <div>
        {id},{name},{title}
      </div>
      <div>
        <button onClick={handleClick}>设置search</button>
      </div>
    </div>
  );
}
```

:::

### 路由参数 state

**传参**

```jsx
<NavLink
  className={linkClass}
  to={{ pathname: "./state-params", state: { name: "curry" } }}
>
  传入state路由参数
</NavLink>
```

**取值**
通过 `useLocation().state`获取

### 编程式导航

v6 版本中，不区分普通组件还是路由组件，都使用 `const navigete = useNavigete()`,普通组件不再使用`withRouter()`

### 额外的 Hooks

- useInRouterContext()：判断是否在路由环境下，一般用于第三方组件库封装
- useNavigeteType(): 返回跳转模式 PUSH | REPLACE | POP (刷新时)
- useOutlet():用来呈现当前组件中渲染的嵌套路由（路由对象）
- useResolvedPath('/react-router-v6/use-params/id1/name2?title=解析 url#hashcode123'),用来解析任何路径

```json
{
  "pathname": "/react-router-v6/use-params/id1/name2",
  "search": "?title=解析url",
  "hash": "#hashcode123"
}
```

