---
title: interview-html
date: 2024-05-30 22:53:42
tags:
---

# HTML
## src和href的区别
- 用途不同 
    `src`（Source 的缩写）用于嵌入外部资源到当前文档中。这些资源是文档结构或功能的一部分，浏览器会暂停页面渲染来加载这些资源，并将其内容直接插入到文档中相应的位置。
`href`（Hypertext Reference 的缩写）用于定义一个超链接到其他文档或资源的链接
- 引用方式和必要性
    - `src` 引用的资源对于元素是必需的，缺少 `src` 属性或其值无效，会导致元素无法正常显示或工作。
    - `href` 引用的资源在某些情况下可能是可选的，例如对于装饰性链接，即使没有 `href` 或其值为空，链接依然可以呈现并具有交互样式，尽管没有实际的跳转效果

## script标签中defer和async的区别

- defer属性:
    - 脚本的加载是异步的，不会阻塞页面的渲染。
    - 所有带有`defer`属性的脚本会在HTML解析完成后，DOMContentLoaded事件触发之前，按照在文档中出现的顺序依次执行。
    - 适合那些不依赖文档中其他元素且执行顺序重要的脚本。
- async属性:
    - 脚本的加载也是异步的，同样不会阻塞页面渲染。
    - 加载完成后，脚本会立即执行，不保证执行顺序，也不保证与HTML解析的顺序一致。
    - 适用于不需要按照特定顺序执行且不会影响DOM构建的独立脚本，比如分析脚本或延迟加载功能的脚本。

## 常⽤的meta标签有哪些
- <meta charset="UTF-8">
- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
- <meta name="description" content="页面的简短描述，用于搜索引擎摘要">
- <meta name="keywords" content="关键词1, 关键词2, 关键词3">
- <meta name="author" content="作者姓名">
- <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
- <link rel="canonical" href="https://example.com/canonical-page">

## img的srcset属性的作用？
- 用于提供图片源的集合，使得浏览器可以根据设备的特性，如视口大小、屏幕像素密度等，自动选择最合适的图片版本进行加载。这样可以实现图像的响应式加载，提升网页性能，

## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
- 行内元素 (Inline Elements)
    - <a> (锚点)
    - <b> (粗体文本，不推荐用于语义强调，可用<strong>代替)
    - <span> (通用内联容器)
    - <img> (图片)
    - <input> (各种输入控件)
    - <select> (下拉选择框)
    - <strong> (强调文本，加粗显示)
    - <label> (表单控件的关联标签)
    - <em> (强调文本，通常斜体显示)
    - <button> (可点击按钮)
    - <textarea> (多行文本输入控件)
- 块级元素 (Block-level Elements)
    - <div> (通用块级容器)
    - <ul> (无序列表)
    - <ol> (有序列表)
    - <li> (列表项)
    - <dl> (定义列表)
    - <dt> (定义术语)
    - <dd> (定义描述)
    - <h1> 至 <h6> (六级标题)
    - <p> (段落)
    - <blockquote> (块引用)
- 空(void)元素 (Void Elements)
    - <br> (换行)
    - <hr> (水平线)
    - <img> (图片，尽管是行内元素，但它也是空元素，因为它在标签内部自我闭合)
    - <meta> (页面元数据)
    - <link> (引入外部资源，如样式表)
    - <input> (某些类型的输入控件，如文本输入框，也是自封闭的)

## iframe 有那些优点和缺点？
- iframe的优点包括：
    - 独立性：`iframe`可以在页面上独立显示一个页面或内容，与主页面的其他元素相互隔离，减少样式和脚本间的冲突。
    - 可重用性：相同的`iframe`代码可以嵌套在多个页面中，便于内容的复用，减少重复代码。
    - 异步加载：`iframe`的加载不会阻塞页面主体的加载，提高了页面的初步渲染速度。
    - 跨域支持：`iframe`能够轻松实现跨域内容的嵌入，对于需要集成第三方服务或内容的场景非常有用。
    - 沙盒效应：`iframe`内的文档和脚本运行在一个独立的环境中，减少对主页面安全的影响。
- iframe的缺点包括：
    - 性能降低：每个`iframe`都是一个独立的HTTP请求，增加了页面的总加载时间和服务器负担。
    - SEO问题：搜索引擎通常不会抓取`iframe`中的内容，影响页面的搜索引擎优化。
   -  安全风险：`iframe`可能被用于点击劫持等安全攻击，尤其是在嵌入不受信任的第三方内容时。
    - 用户体验：过多的`iframe`可能导致页面布局复杂，出现滚动条，影响用户体验。同时，`iframe`内的导航不会影响浏览器的前进和后退按钮，可能造成用户困惑。
    - 兼容性问题：一些旧的或特定的移动设备可能无法很好地支持`iframe`，影响内容的正确显示。
    - 资源限制：`iframe`与主页面共享连接限制，可能影响页面其他资源的并行加载。

## HTML5有哪些更新
- 语义化标签：
    - 引入了如`<header>`、`<footer>`、`<nav>`、`<article>`、`<section>`、`<aside>`等标签，有助于搜索引擎优化（SEO）
- 多媒体支持：
    - 直接在浏览器中播放音频和视频，无需插件，通过<audio>和<video>标签实现。
- Canvas与SVG：
- 离线存储：
    - 通过localStorage和IndexedDB等Web Storage API，网站可以在用户本地存储数据，实现离线访问。
- 响应式设计支持：
    - 结合CSS3媒体查询，更容易创建适应不同屏幕尺寸和设备的响应式网页。
- Web Components：
    - 一套允许开发者创建自定义、可复用的UI组件的技术集合。
