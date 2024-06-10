---
title: 前端技术栈
date: 2022-11-17 00:12:10
tags:
  - 前端技术栈
categories:
  - Front-End
cover: https://i.postimg.cc/bvs3hF5w/cyber-cowboy-hq-by-artificialdesign-d4fg30e-fullview.jpg
---

## Front-End

### 技术栈概论

:::tip What's the meaning of Fronot-End
前端的意义在于创造。
:::

技术的诞生，从来不是为了获得更多的利益。树上的苹果并不会给牛顿带来新的一笔巨大财富。
如今市场的需求化已经金钱的吮吸灵魂的力量，将技术本来的面目，弄得灰头土脸。禁锢、限制、局限。
不止前端。

## Front-End Learning Path

后知后觉，如梦初醒。师从四方，自力更生。

### 学习路径

前端核心：`HTML5+CSS3`→`移动端web`→`JavaScript`→`DOM&BOM`→`Jquery`→`Ajax`
技术进阶：`ES6-ES11`→`Node.js`→`Promise`→`Axios`
前沿框架：`Typescript`→`Vue2`→`Vue3`→`React`

工程化构建：`Git`&`NPM`&`YARN`&`WebPack`
数据可视化：`Echarts`&`D3.js`&`HighCharts`&`AntV`&`Three.js`&`Ceisum`&`WebGL`
UI 库：`Element UI`&`Vuetify`&`Ant Design`&`Bottstrap`&`Vant UI`&`Framework7`&`WEUI`

## Software Development Basics

### 设计模式
降低对象之间的耦合，增加程序的可复用性、可扩展性和可维护性
常用七大设计模式：

- 创建型模式：单例模式、工厂方法模式、抽象工厂模式

- 结构型模式：代理模式、装饰器模式

- 行为型模式：观察者模式、责任链模式

### Git常用命令
:::warning
如果git命令报错，一定先检查一下是否开启VPN、节点、steam++等影响国内网络的软件
:::

>初始化本地仓库，提交代码，提交到远程git仓库

:::details Click to see more
```gitmodules

初始化代码仓库
git init
将当前目录下的所有文件放到暂存区
git add .
查看文件状态
git status
添加提交的描述信息
git commit -m '[提交的描述信息]'
远程仓库地址
git remote add origin [远程仓库地址]
推送到远程仓库
git push -u origin master

```
:::

>创建分支，提交代码到分支

:::details Click to see more
```gitmodules

创建切换分支
git checkout -b [分支名称]
将当前目录下的所有文件放到暂存区
git add .
添加提交的描述信息
git commit -m '[描述]'
将分支推送到远程仓库
git push --set-upstream origin dev1 
切换到主分支
git checkout master
将dev合并到主分支
git merge dev 
推送到远程仓库
git push origin master 

```
:::

## Front-End Optimization
通过分析和优化手段，提高网站的性能和用户体验。

### 性能优化
*FP（First Paint）*
从开始加载到浏览器首次绘制像素到屏幕上的时间，也就是页面在屏幕上首次发生视觉变化的时间。

*FCP（First Contentful Paint）*
浏览器首次绘制来自 DOM 的内容的时间。

*FMP（First Meaningful Paint）*
页面的主要内容绘制到屏幕上的时间。

*FSP（First Screen Paint）*
页面从开始加载到首屏内容全部绘制完成的时间，用户可以看到首屏的全部内容。

*TTI（Time to Interactive）*
表示网页第一次完全达到可交互状态的时间点，浏览器已经可以持续性的响应用户的输入。

### 优化手段
- 性能监控(Performance API)
- 样式优化
- 防抖 & 节流
- 代码分割
- 资源压缩
- 打包优化
- 服务器优化
- 缓存优化(Service Worker)
- 动画性能
- dns-prefetch
- Lazy loading

### 安全问题
- XSS
- CSRF
- 反爬虫
- SQL 注入
- DDoS

## Front-End Ecology

### 博客编写
- ✅ Gatsby.js
- ✅ Docusaurus
- Hugo
- Hexo

### 文档编写

- ⭐️ Docsify
- JekyII
- VuePress
- Dumi

### 移动应用
- Hybrid
- WebView
- React Native
- Flutter

### 桌面应用
- Electron
- NW.js
- Proton Native

### 小程序
- 原生
- WebView