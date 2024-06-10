---
title: interview-browser-principles
date: 2024-05-30 23:01:58
tags:
---

# 浏览器原理
## 什么是 XSS 攻击？

XSS（Cross-Site Scripting）攻击，即跨站脚本攻击，是指攻击者通过在目标网站上注入恶意脚本，当用户浏览该页面时，恶意脚本会在用户的浏览器上执行，从而盗取用户信息、篡改网页内容、进行钓鱼攻击等。

## 如何防御 XSS 攻击？

1. **输入验证与过滤**：对用户提交的所有数据进行严格的输入验证，过滤特殊字符和脚本标签。
2. **输出编码**：对输出到HTML中的数据进行适当的HTML实体编码，如`<`转换为`&lt;`，防止脚本执行。
3. **使用HTTP头部安全策略**：设置`Content-Security-Policy`（CSP）来限制加载外部资源，减少XSS风险。
4. **Cookie安全**：对敏感的Cookie设置`HttpOnly`标志，禁止JavaScript访问，防止通过脚本窃取。
5. **DOM安全处理**：使用安全的DOM操作方法，避免直接拼接字符串生成HTML。

## 什么是 CSRF 攻击？

CSRF（Cross-Site Request Forgery）跨站请求伪造，是一种攻击者利用用户已登录的身份，在用户不知情的情况下，诱使用户浏览器向目标网站发送恶意请求，执行操作如转账、修改密码等。

## 如何防御 CSRF 攻击？

1. **Token验证**：在表单或Ajax请求中加入一个随机生成且难以预测的Token，服务器验证每次请求携带的Token是否有效。
2. **Referer检查**：检查请求的来源Referer头部，确认是否来自可信域名，但此方法不完全可靠，因为Referer可以被伪造或禁用。
3. **SameSite Cookie属性**：为Cookie设置`SameSite=Lax`或`SameSite=Strict`，限制第三方上下文中的Cookie发送。
4. **双重认证**：对敏感操作要求用户提供额外的身份验证信息，如短信验证码。

## 什么是中间人攻击？

中间人攻击（Man-in-the-Middle Attack, MITM）发生在攻击者拦截并可能篡改通信双方之间的数据传输过程中，通常通过监听、篡改或插入数据包来窃取敏感信息或误导通信双方。

## 如何防范中间人攻击？

1. **HTTPS加密**：强制使用HTTPS协议，SSL/TLS加密通信，确保数据在传输过程中的保密性和完整性。
2. **证书验证**：确保服务器证书有效且来自于受信任的CA，客户端验证服务器证书以防止中间人替换证书。
3. **公共Wi-Fi谨慎使用**：在不安全的公共网络下尽量避免进行敏感操作。
4. **DNS安全**：使用DNSSEC等技术防止DNS欺骗，确保域名解析的正确性。

## 有哪些可能引起前端安全的问题?

1. **不安全的API使用**：如未验证的第三方API调用。
2. **敏感信息泄露**：在错误信息或日志中泄露敏感数据。
3. **不安全的存储**：在本地存储中保存敏感信息而未加密。
4. **点击劫持**：缺乏X-Frame-Options头部保护，导致页面被嵌入iframe中进行点击劫持。
5. **不安全的CORS配置**：错误的CORS策略可能允许恶意站点访问API。

## 网络劫持有哪几种，如何防范？

### DNS劫持
- **防范**：使用DNSSEC，选择信誉良好的DNS服务商，定期检查DNS设置。

### ARP欺骗
- **防范**：使用静态ARP绑定，部署ARP防护设备或软件，定期检查网络设备。

### IP Spoofing
- **防范**：实施IP源地址验证，使用入侵检测系统（IDS）和防火墙规则。

### SSLStrip
- **防范**：全面采用HTTPS，启用HSTS（HTTP Strict Transport Security）策略，教育用户注意地址栏的HTTPS标志。

### Session Hijacking
- **防范**：使用安全的Session管理，定期更换Session ID，实施TLS客户端证书验证。

通过这些措施，可以大大增强系统的安全性，减少被攻击的风险。


## 对浏览器的缓存机制的理解

浏览器缓存机制是基于HTTP协议实现的一种提高网页加载速度的技术，通过存储用户访问过的网页资源（如HTML、CSS、JavaScript文件、图片等），在后续请求时直接从本地缓存读取，无需再次向服务器发起请求，从而减少网络延迟和带宽消耗。

## 浏览器资源缓存的位置有哪些？

浏览器缓存可以存储在多个位置，主要包括：

1. **内存缓存**：最快速的缓存方式，位于RAM中，用于存储最近和频繁访问的资源，关闭浏览器后清空。
2. **磁盘缓存**：持久化存储，如硬盘上的某个目录，用于长期存储资源，重启浏览器后依然可用。
3. **Service Worker缓存**：一种特殊的浏览器缓存机制，允许开发者编写脚本控制缓存逻辑，为离线访问和性能优化提供更多灵活性。
4. **Application Cache（AppCache，已废弃）**：旧版的离线缓存机制，已被Service Worker取代，但仍可能在一些老网站中见到。

## 协商缓存和强缓存的区别

**强缓存**（也称作无条件缓存）：
- 浏览器在本地有资源副本，且根据资源的`Cache-Control`或`Expires`头部判断该副本仍然有效时，直接使用本地缓存，无需向服务器发出请求。
- 提高效率，减少不必要的网络交互。

**协商缓存**（也称作有条件缓存）：
- 当强缓存未命中时，浏览器会发送请求到服务器，并带上上次请求得到的`ETag`或`Last-Modified`等验证信息。
- 服务器根据这些验证信息判断资源是否更新，如果资源未变，则返回一个304状态码，告诉浏览器继续使用本地缓存；如果资源已更新，则返回新的资源和新的验证信息。

## 为什么需要浏览器缓存？

1. **加速页面加载**：减少资源下载时间，提高用户体验。
2. **节省带宽**：重复利用已下载的资源，减少数据传输量。
3. **减轻服务器压力**：减少对服务器的请求次数，特别是在高流量时段。
4. **提升应用可用性**：在弱网或无网络环境下，可依赖缓存资源提供基本功能。

## 点击刷新按钮或者按 F5、按 Ctrl+F5（强制刷新）、地址栏回车有什么区别？

### 点击刷新按钮或按 F5

- 正常刷新页面，浏览器首先尝试使用强缓存，如果强缓存未命中，则进行协商缓存。这通常意味着如果资源没有改变，页面部分或全部内容可以从本地缓存加载。

### 按 Ctrl+F5（强制刷新）

- 强制刷新，绕过浏览器的强缓存和协商缓存机制，直接从服务器重新下载页面所有资源，确保获取最新版本。适用于开发中检查页面更新的情况。

### 地址栏回车

- 类似于点击刷新按钮或F5，执行普通刷新操作。浏览器会根据资源的缓存策略判断是否使用缓存。如果缓存有效（根据强缓存或协商缓存），则直接使用缓存资源；否则，从服务器重新请求资源。

总结而言，正常刷新（F5或刷新按钮）和地址栏回车会遵循浏览器的缓存策略，可能使用缓存；而Ctrl+F5强制刷新则跳过这些策略，确保从服务器拉取所有内容的新鲜副本。


## 对浏览器的理解

浏览器是用户访问互联网内容的主要工具，它将从服务器接收的HTML、CSS、JavaScript等文件解析、渲染，并展示为可视化的网页。浏览器不仅负责页面展示，还提供了一个运行环境来执行JavaScript代码，支持用户与网页的交互，管理cookies和存储，以及实现网络通信等功能。

## 对浏览器内核的理解

浏览器内核，也称为渲染引擎，是浏览器的核心组件，负责解析网页内容（HTML、CSS）并将其转换为用户可见的界面。它主要由两个部分构成：渲染引擎（负责布局和绘制）和JavaScript引擎（负责执行脚本）。内核决定了浏览器如何处理网页代码，影响页面的加载速度、兼容性和渲染效果。

## 常见的浏览器内核比较

- **Trident（Internet Explorer）**：早期Windows系统上的IE浏览器使用的内核，已逐渐被淘汰。
- **Gecko（Firefox）**：Mozilla Firefox浏览器的内核，支持高级网页标准和较好的兼容性。
- **WebKit**：最初由苹果开发，用于Safari浏览器，后来成为许多移动浏览器的基础，如早期的Android浏览器。
- **Blink**：Google从WebKit分支出来的一个项目，现用于Chrome、Opera等现代浏览器，特点是快速迭代和高性能。

## 常见浏览器所用内核

- Chrome / Opera：Blink
- Firefox：Gecko
- Safari：WebKit
- Edge（新版本）：Blink
- Internet Explorer（旧版本）：Trident

## 浏览器的主要组成部分

1. **用户界面**：地址栏、前进/后退按钮、书签菜单等。
2. **浏览器引擎**：协调用户界面与渲染引擎之间的交互。
3. **渲染引擎**：解析HTML和CSS，构建页面布局并渲染。
4. **网络模块**：处理网络请求，如HTTP/HTTPS请求。
5. **JavaScript引擎**：解析和执行JavaScript代码。
6. **数据存储**：Cookie、LocalStorage、IndexedDB等。

## 浏览器渲染原理

浏览器渲染过程大致分为以下几个阶段：

1. **解析HTML**：构建DOM树。
2. **解析CSS**：构建CSSOM（CSS对象模型）。
3. **合并DOM与CSSOM**：生成Render Tree（渲染树）。
4. **布局**：计算每个节点的几何信息。
5. **绘制**：将Render Tree渲染到屏幕上。

## 浏览器渲染过程

1. **加载资源**：请求HTML文档，然后根据文档内的引用加载CSS、JavaScript、图片等资源。
2. **解析与构建**：解析HTML生成DOM树，解析CSS生成CSSOM，结合两者构建Render Tree。
3. **布局与绘制**：计算布局（Layout），确定元素在视口中的位置和尺寸，然后绘制到屏幕。

## 浏览器渲染优化

- **减少HTTP请求**：合并文件、使用雪碧图、开启HTTP2等。
- **资源压缩**：减小文件大小，如GZIP压缩。
- **懒加载**：只在需要时加载图片或其他资源。
- **使用CDN**：减少资源加载延迟。
- **预加载与预读取**：提前请求可能需要的资源。

## 渲染过程中遇到 JS 文件如何处理？

当浏览器遇到JavaScript文件时，通常会暂停HTML解析，加载并执行JS，这是因为JS可能修改DOM结构或CSSOM。这种行为被称为“JavaScript阻塞”，为减少其负面影响，可以使用`async`或`defer`属性异步加载脚本。

## 什么是文档的预解析？

文档预解析（Pre-parser）是浏览器的一个优化策略，它在主线程执行JavaScript之前，提前分析HTML文档，识别并开始加载外部资源（如CSS和JS），从而减少实际解析时的等待时间。

## CSS 如何阻塞文档解析？

外部CSS文件默认是阻塞的，意味着浏览器遇到`<link>`标签加载CSS时，会暂停HTML解析，直到CSSOM构建完成，因为CSS可能影响到元素的布局。内联样式不会阻塞解析，因为它不需要额外的HTTP请求。

## 如何优化关键渲染路径？

- **减少关键资源数量**：确保首屏加载所需资源尽可能少。
- **优先加载关键CSS**：内联关键CSS或使用媒体类型`print`加载非关键CSS。
- **异步加载JavaScript**：避免阻塞渲染的关键路径。
- **避免使用@import**：因为它会导致CSS加载延迟。
- **优化图片和图标**：使用合适的格式和尺寸，考虑懒加载。

## 什么情况会阻塞渲染？

- **解析中的JavaScript**：同步脚本会阻塞HTML解析。
- **等待外部CSS**：构建Render Tree需要完整的CSSOM。
- **大型图片和媒体文件**：下载时间长，影响首屏渲染。
- **重排与重绘**：频繁的DOM操作可能导致页面多次渲染。
- **网络拥塞**：资源加载慢也会延后渲染过程。


## 浏览器本地存储方式及使用场景

浏览器提供了多种本地存储技术，以便开发者在客户端存储数据。这些技术包括Cookie、LocalStorage、SessionStorage和IndexedDB，每种都有其特定的用途和限制。

### Cookie

**使用场景**：
- 会话管理：跟踪用户会话状态，如登录状态。
- 用户偏好设置：存储用户的界面偏好，如语言选择。
- 跨页面数据传递：在不同页面间共享少量数据。

### LocalStorage

**使用场景**：
- 持久化存储：适合长期存储大量用户数据，如用户配置。
- 离线应用：缓存用户数据，支持离线浏览功能。
- 客户端数据缓存：存储不敏感的应用数据，提高应用性能。

### SessionStorage

**使用场景**：
- 临时会话数据：存储仅在当前会话中有效的数据，如表单暂存。
- 单页应用状态：在SPA中存储页面间跳转的状态信息。

### IndexedDB

**使用场景**：
- 大量结构化数据存储：适合存储大量复杂数据，如图片库、用户生成的内容。
- 离线应用数据库：为离线应用提供数据存储解决方案。
- 高性能数据检索：利用索引实现快速查询。

## Cookie有哪些字段及其作用

Cookie由多个字段组成，每个字段都有其特定的意义：

- **Name**：键名，用于标识存储的数据项。
- **Value**：键值，存储的具体数据。
- **Expires/Max-Age**：定义Cookie的有效期，过期后浏览器会自动删除。
- **Domain**：指定Cookie所属的域名，决定了哪些站点可以访问该Cookie。
- **Path**：定义了Cookie的路径，指定了浏览器发送Cookie的条件，只有访问匹配该路径的URL时才会发送Cookie。
- **Secure**：指示浏览器仅在HTTPS连接下发送Cookie。
- **HttpOnly**：标记为HttpOnly的Cookie不能被JavaScript访问，增加了安全性。

## Cookie、LocalStorage、SessionStorage区别

- **存储容量**：Cookie通常限制在4KB左右，LocalStorage和SessionStorage则远大于此，通常为5MB或更多。
- **有效期**：Cookie可以设置过期时间，LocalStorage持久存储除非手动删除，SessionStorage仅在当前会话有效，关闭浏览器即清除。
- **作用域**：Cookie可跨域名（需正确设置Domain），LocalStorage和SessionStorage限于同源策略下，不能跨域。
- **与服务器通信**：Cookie随每次HTTP请求自动发送到服务器，LocalStorage和SessionStorage不参与网络请求。

## 前端储存的方式

前端储存方式主要包括：

1. **Cookie**：最早的传统存储方式，主要用于会话管理和用户偏好设置。
2. **LocalStorage**：HTML5引入的持久化本地存储，适合长期存储大量数据。
3. **SessionStorage**：HTML5引入的会话存储，数据仅在当前浏览器会话中有效。
4. **IndexedDB**：一种客户端存储大量结构化数据的数据库。
5. **Web SQL**（已废弃）：曾是HTML5标准的一部分，但现在不推荐使用。
6. **Cache API**：用于存储资源的缓存机制，改善网页性能。
7. **Service Worker Cache**：配合Service Worker使用，为离线体验和网络请求优化提供缓存。

## IndexedDB的特点

- **异步API**：所有操作都是异步的，不会阻塞UI线程，提升用户体验。
- **事务处理**：支持事务，确保数据的一致性和完整性。
- **灵活的数据模型**：可以存储复杂的结构化数据，包括对象和数组。
- **索引支持**：提供索引功能，加速数据检索。
- **大容量存储**：能够处理大量数据，适合存储多媒体文件等大数据量。
- **同源策略**：遵循同源策略，但可以通过IndexedDB的API在Service Workers中实现跨域数据访问。


## 什么是同源策略

同源策略（Same-Origin Policy）是浏览器为了保证安全，实施的一种重要安全策略。它规定了一个网页脚本只能读取来自同一源（即协议、域名、端口号相同的源）的资源，而对不同源的资源进行访问则会受到限制。这意味着，一个网页上的脚本不能随意读取另一个网页的数据，除非这两个网页满足同源条件。这样做可以有效防止恶意网站通过脚本读取其他网站的敏感信息，如 cookie、localStorage 等。

## 如何解决跨域问题

解决跨域问题的常见方法有以下几种：

1. **CORS（跨源资源共享）**：服务器通过在响应头中添加特定的 `Access-Control-Allow-Origin` 字段，允许特定源的请求。
2. **JSONP（JSON with Padding）**：利用 `<script>` 标签没有同源限制的特性，通过动态插入 `<script>` 来实现跨域请求。
3. **代理服务器**：设置一个代理服务器，将请求转发到目标服务器，从而绕过浏览器的同源策略限制。
4. **WebSocket**：WebSocket 协议本身不遵循同源策略，可以用于跨域实时通信。
5. **使用 `postMessage` API**：允许来自不同源的脚本采用异步方式进行有限制的通信。

## 事件是什么？事件模型？

事件是在用户与网页交互或在网页内部发生某些改变时，浏览器生成并传递给JavaScript代码的信号。事件模型描述了事件如何在DOM树中传播和处理，主要分为两种模型：

1. **捕获阶段**：事件从根节点开始，向下传播到目标元素。
2. **目标阶段**：事件到达实际的目标元素，并触发相应的事件处理器。
3. **冒泡阶段**：事件从目标元素开始，向外层元素传播，直到根节点。

## 如何阻止事件冒泡

在JavaScript中，可以通过调用事件对象的 `stopPropagation()` 方法来阻止事件向上冒泡。例如，在事件处理函数中：

```javascript
element.addEventListener('click', function(event) {
    event.stopPropagation();
    // 处理点击事件的代码...
}, false);
```

## 对事件委托的理解

事件委托（Event Delegation）是一种高效的事件处理模式，它允许将事件监听器添加到一个父元素上，而不是每个子元素上。当事件在子元素上触发时，通过判断事件对象（如 `event.target`）来确定实际的目标元素，并执行相应逻辑。这种方法减少了内存消耗，提高了性能，特别是在动态添加或删除子元素的场景下特别有用。

## 事件委托的使用场景

- **大量动态生成的元素**：如列表项、表格行等，无需为每个元素单独绑定事件监听器。
- **减少内存占用**：适用于需要绑定大量事件处理器的场景。
- **简化DOM操作**：避免频繁地添加和移除事件监听器。

## 同步和异步的区别

- **同步**：程序按照代码的编写顺序依次执行，每个任务必须等待前一个任务完成才能开始。这会阻塞后续任务，直到当前任务结束。
- **异步**：任务不立即等待结果，而是继续执行后续代码，当任务完成时通过回调、Promise、async/await等方式通知主线程，实现非阻塞操作。

## 对事件循环的理解

事件循环（Event Loop）是JavaScript运行环境（如浏览器和Node.js）处理异步操作的核心机制。它不断地检查是否有待处理的任务，包括宏观任务（Macro Task）和微观任务（Micro Task）。执行流程大致如下：

1. 执行当前宏任务队列中的所有任务。
2. 清空当前微任务队列中的所有任务。
3. 如果还有未处理的宏任务或新的微任务产生，重复步骤1和2。
4. 当所有任务执行完毕，进入休眠，等待下一轮事件触发。

## 宏任务和微任务分别有哪些

- **宏任务**：包括setTimeout、setInterval、I/O、UI渲染、事件处理（如click事件）、setImmediate（Node.js特有）等。
- **微任务**：包括Promise的回调、MutationObserver、process.nextTick（Node.js特有）、queueMicrotask（ES2019引入）等。

## 什么是执行栈

执行栈（Call Stack）是编程中的一个概念，用于跟踪函数的调用过程和执行顺序。每当函数被调用时，都会创建一个新的栈帧（包含函数的局部变量、参数等信息）并压入栈顶；函数执行完毕后，其对应的栈帧会被弹出栈。JavaScript是单线程且使用执行栈来管理函数调用，确保函数按照调用顺序执行。

## Node.js 中的 Event Loop 和浏览器中的有什么区别？process.nextTick 执行顺序？

Node.js的Event Loop和浏览器中的Event Loop的主要区别在于它们处理任务队列的方式和特定的宏任务类型。Node.js中特有的宏任务类型包括I/O操作和`setImmediate`，而浏览器中没有`setImmediate`，但有`requestAnimationFrame`。

`process.nextTick`是Node.js中的一个特殊API，它将任务安排在当前执行栈的末尾，但在任何其他微任务之前执行。这意味着即使在当前函数还没有完全返回，`process.nextTick`的回调也会在当前事件循环迭代结束前被执行，这使得它比Promise的回调或`setImmediate`更快执行。

## 事件触发的过程是怎样的

事件触发的基本过程包括：

1. **事件产生**：用户交互（如点击、键盘输入）或系统行为（如页面加载完成）导致事件产生。
2. **事件捕获/目标阶段判断**：根据事件模型，事件可能先经过捕获阶段向目标元素传播，然后在目标元素触发事件处理函数，最后进入冒泡阶段向上回传。
3. **查找事件监听器**：在事件到达相应的阶段时，查找该阶段注册的事件监听器。
4. **调用事件处理函数**：执行找到的事件处理函数，可能包括阻止默认行为、阻止事件传播等操作。
5. **事件循环处理**：对于异步事件，事件处理可能涉及事件循环，等待特定时机执行。
6. **后续任务执行**：事件处理完成后，根据事件循环机制继续执行其他排队的任务。


## V8的垃圾回收机制是怎样的

V8引擎的垃圾回收机制是其高效执行JavaScript代码的关键部分，主要包括以下几个方面：

### 1. 分代回收机制

V8将内存分为新生代（Young Generation）和老生代（Old Generation）两部分，依据对象的生命周期长短进行管理。

- **新生代**：主要用于存放新创建的对象。新生代又分为两个子区域：From Space和To Space。当From Space区域填满时，垃圾回收器会执行Scavenge算法，将存活的对象复制到To Space，并清空From Space。这个过程会重复进行，From Space和To Space的角色会互换，以此方式快速回收短期存活的对象。
  
- **老生代**：长期存活或体积较大的对象会被晋升到老生代。老生代的回收相对复杂，使用标记-清除（Mark-and-Sweep）或标记-整理（Mark-Compact）算法。标记阶段遍历所有可达对象并打标记，清除阶段回收未标记的对象。整理阶段则在回收后整理内存碎片，避免内存碎片化。

### 2. 引用计数

虽然V8主要依赖分代回收，但它也使用引用计数作为辅助手段。引用计数会追踪每个对象的引用数量，当一个对象的引用数变为0时，该对象就被认为是不可达的，可以被回收。然而，引用计数法容易导致循环引用问题，因此在V8中不是主要的回收策略。

### 3. 并发与增量回收

为了减少垃圾回收对JavaScript执行的影响，V8引入了并发（Concurrent）、增量（Incremental）和并行（Parallel）回收技术。这些技术允许垃圾回收在主线程执行代码的同时进行，比如并发标记可以在主线程暂停之外的时间进行，而增量标记和清理则把回收过程分成多个小步骤，穿插在JS代码执行之间，以此减少因垃圾回收造成的页面卡顿现象。

### 4. 停顿（Stop-The-World）

尽管V8努力减少垃圾回收带来的暂停时间，但在某些情况下，如老生代的完整标记清除操作，仍然需要“停顿”主线程，暂停JavaScript执行以完成垃圾回收。这是因为在单线程环境下，为了保证数据一致性，回收操作必须在一个无干扰的环境中进行。

## 哪些操作会造成内存泄漏

### 1. 全局变量

- **说明**：将对象直接赋值给全局变量，或在闭包中不恰当地引用对象，会导致这些对象一直保持可达状态，无法被垃圾回收。
  
### 2. 循环引用

- **说明**：两个或多个对象互相引用，形成闭环，即使这些对象不再被外部引用，只要闭环存在，垃圾回收器就不会回收它们。
  
### 3. 未清理的事件监听器

- **说明**：为DOM元素或其他对象添加事件监听器后忘记移除，特别是当监听器引用了外部作用域的变量时，会导致这些变量和相关对象无法被回收。
  
### 4. 被遗忘的定时器或回调

- **说明**：设置的`setTimeout`、`setInterval`或其它异步操作的回调函数中引用了不再需要的对象，若不取消这些定时器或清除回调，对象会持续被引用。
  
### 5. DOM元素引用

- **说明**：即使从DOM树中移除了元素，但如果JavaScript中还保留着对该元素的引用，元素及其相关的子元素和数据仍然不会被回收。
  
### 6. 缓存不当

- **说明**：无限制或不当管理的缓存（如使用Map或WeakMap存储大量对象）可能导致大量不再使用的数据占用内存，尤其是当缓存对象包含了大量子对象时。
  
### 7. V8的特殊情况

- **如**：使用`v8::Persistent`对象时，如果未正确管理，可能会导致对象无法被垃圾回收，因为`Persistent`对象会保持对象的引用直到显式释放。

解决内存泄漏通常需要识别并修正上述问题，使用开发工具（如Chrome DevTools）监控内存使用情况，定期审查代码，及时解除不再需要的引用，以及合理管理事件监听器和定时器等。

