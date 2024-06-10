---
title: 前端技术展望
date: 2022-11-18 22:42:46
tags:
- 前端技术栈
- 前端发展前景
categories:
  - Front-End
cover: https://images4.alphacoders.com/957/thumbbig-957231.webp
---

## Front End Development Trend Forecast
### 前端新标准
#### HTML 6.0
2014 年 10 月 28 日，W3C 正式发布 HTML5.0 推荐标准让前端技术蓬勃发展。虽然 HTML6.0 目前处于提案阶段，但是社区已经开始有了一些零星的讨论，所以可能它离我们并不太远。

HTML6.0 中，可能会新增“增强身份验证”和“集成摄像头” 两个能力，大家可以持续关注相关进展。

一直以来，浏览器由于身份验证问题导致 Web 应用在很多场景乏力，特别是目前大部分 APP 是十分“重”的，功能繁多，如果这两个能力得以普及，那么可能会有更多的 WEB 应用代替以前 APP 的极速版本。

由于新冠疫情影响，越来越多人的工作方式变成了 WFH。可以预见，疫情彻底清除以后，远程办公也许会成为不少人的选择。所以“集成摄像头”能力，很有可能在人与人线上交流场景中，发挥更大的作用。

2022 年，可能 HTML6 并不会推出，但是可能会有更多利于用户体验的提案出现。

#### Web3.0
Facebook 改名 Meta 后，元宇宙话题很火热，但突然一夜之间，讨论似乎又从元宇宙过渡到了 Web3.0。

### 前端工程化展望
#### 前端框架
在 StackOverflow 的“最受欢迎的 Web 框架”调查中，除去 SSR 渲染框架和 jQuery，上榜的前端框架共有 5 个：

:::details 前端框架排行图
![前端框架排行图](https://img-blog.csdnimg.cn/img_convert/1a1ea21b664548decfe0c1193895f647.png)
:::

而从 NPM 下载量来分析，观察到的现象是：
- React 一家独大，独自吃掉 70% 的市场份额；
- Vue 和 Angular 平分秋色打的难舍难分；
- Preact 作为“轻量版 React”在小众中最受欢迎；
- Svelte 作为无 vdom 的 MVVM 框架，艰难爬升中，甚至还没超过已经停止更新的 AngularJS。

>总的来说，React，Vue，Angular 依然是强势铁三角向前发展。在 2022 年 Vue3 会成为 Vue 的默认版本，React 18 也会发布正式版本，从目前社区关注度来看， Vue3 源码 Github star 27k+， React 18 WG Github star 3.9k+，且在 npm 的下载量上，新版本下载数目都比较可观，所以很有可能今年尝试和使用的人会变得更多。

#### 打包器
打包器大概可以分为两类：
- 传统编译：Webpack, Rollup, Parcel, Esbuild
- ESM 混合编译：Snowpack, Vite

目前是 Webpack、Rollup、Esbuild 三分天下：
- Webpack：我们的老熟人，生态最丰富、功能最多，独自吃掉 70% 的市场份额；
- Rollup：ESM 版的 Webpack，甩掉了很多历史包袱；
- Esbuild：Go 写的 Webpack，性能有数十倍提升。

#### UI框架
![UI框架排行图](https://img-blog.csdnimg.cn/img_convert/6a126c1c69400bca05d2e9ef9142c0ce.png)
由于模块化 CSS、摇树、MVVM 的流行，UI 框架的选择其实没有那么举足轻重了，针对自己选用的框架选择一个符合项目风格的 UI 即可。

#### 桌面端
值得关注的只有两个：
- Electron: 我们的老熟人，Chromium + Nodejs，深受大家喜爱；
- Tauri: 异军突起的新星，Webview + Rust。对比 Electron 因为不用打包 Chromium 和 Nodejs 运行时，产物体积小，运行性能好；

### 智能前端
#### 低代码的崛起
低代码开发平台（英语：*Low-Code Development Platform*，简称 *LCDP*），是一种方便产生应用程序的平台软件，软件会开发环境让用户以图形化接口以及配置编写程序，而不是用传统的程序设计做法。此平台是针对某些种类的应用而设计开发的，例如数据库、业务过程、以及用户界面（例如网页应用程序）。这类平台一般可以产生完整且可运作的应用程序，在一些特殊的情形下仍需要编写程序。

#### AI与图形化的探索
人工智能作为跨时代技术在各个领域大放异彩，近些年 AI 能力在前端领域的尝试与应用带来新一轮的技术革命。
前端可以依赖 D3.js，ECharts，WebGL 等进行数据可视化的显示：
![图形化](https://img-blog.csdnimg.cn/img_convert/c64ae547e4b487ef21af6acb7ac47e22.png)

### 跨平台技术
随着从 PC 时代向移动互联网时代演进，原生客户端因为自身天花板的原因也在逐渐向跨平台方案倾斜，当然这得益于跨平台方案的明显优势。对于开发者而言，可以做到一次开发多端复用，这在很大程度上能够降低研发成本，提高产品效能

![图形化](https://img-blog.csdnimg.cn/img_convert/62c11af8c02376afdcd0c1a2d6470690.png)
2020-2021 年间，有 42% 的开发者用过 React Native 进行开发，这一年内没有增长；而 Flutter 这一数据从 2020 年的 39% 上升到了 42%。

### 成为泛前端
前端研发需要掌握的技术也在迭代更新，基本可以理解为 FaaS BaaS，在 Baas 层进行存储与计算，在 Faas 层提供云函数。
#### 尽可能成为全栈
![图形化](https://img-blog.csdnimg.cn/img_convert/946fefc99a4eecd21a726f5a6a7f10e7.png)
从工程师能力模型来看，第一级需要集“天时地利人和”大成，是工程师的最高荣誉。普通人或许可以将目标聚焦在第二、三级。优秀的工程师并不是以“栈”数取胜，更重要的是拥有产品观、全局思维、沟通能力、学习能力、解决问题能力等