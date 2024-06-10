---
title: interview-react-native
date: 2024-05-30 22:59:22
cover: https://th.bing.com/th/id/OIP.nRIgHuMZj0mcah5j0knFAQHaEK?w=284&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7
tags:
---


# React Native
##  React Native (RN) 的主要优势有哪些？

- **跨平台开发**：允许使用单一代码库为iOS和Android创建原生应用，显著降低开发成本和时间。
- **原生性能**：虽然使用JavaScript编写，但通过桥接调用原生代码，能够接近原生应用的性能体验。
- **热重载**：提高开发效率，修改代码后几乎即时查看效果，无需频繁构建和部署。
- **强大的生态系统**：背靠React社区，拥有丰富的第三方库和插件，解决各种开发需求。
- **React一致性**：对于熟悉React.js的Web开发者来说，学习曲线较低，可以快速上手移动开发。
- **组件化开发**：支持组件复用，提高代码可维护性和开发效率。

##  React Native与原生客户端应用之间的关系是什么？

React Native不是替代原生开发的工具，而是与之协同工作。RN应用的核心逻辑和UI用JavaScript编写，然后通过JavaScript桥接调用原生API和模块，实现与原生平台的交互。这意味着RN应用能够利用原生平台的所有功能，同时享受跨平台开发的好处。原生客户端应用可以包含React Native模块作为其中一部分，实现特定功能或页面。

##  React Native存在哪些劣势？

- **性能限制**：虽然接近原生，但在复杂动画或大规模列表渲染等场景下，性能可能不如纯原生应用。
- **调试难度**：跨平台特性增加了调试的复杂度，特别是涉及到原生模块和桥接代码的问题。
- **第三方库依赖**：由于不是所有功能都内置，对第三方库的依赖较高，可能导致版本兼容性问题。
- **更新问题**：原生依赖的更新可能需要手动集成，尤其是操作系统大版本升级时。
- **学习曲线**：对于没有React经验的开发者来说，需要同时学习React、React Native以及原生开发知识。

##  React Native中基础样式（Style）的使用方法

React Native使用JavaScript对象来定义样式，类似于CSS，但有其独特之处。样式属性通常为驼峰命名，如`backgroundColor`而非`background-color`。样式可以直接作为组件的属性，或者通过`StyleSheet.create`批量定义。

```jsx
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'blue',
    fontSize: 20,
  },
});
```

##  FlexBox在React Native中的基本用法

FlexBox是React Native布局的核心，用于创建响应式和灵活的界面布局。关键属性包括：

- `flex`: 控制元素在父容器中的占比。
- `flexDirection`: 决定主轴的方向（row, row-reverse, column, column-reverse）。
- `justifyContent`: 控制主轴上的对齐方式（flex-start, center, flex-end, space-between, space-around）。
- `alignItems`: 控制交叉轴上的对齐方式（flex-start, center, flex-end, stretch）。

示例代码：

```jsx
<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
  <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
  <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
  <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
</View>
```

##  React Native的核心组件有哪些？

- **View**: 布局的基本容器，相当于HTML的`div`。
- **Text**: 用于展示文本，替代HTML的`<p>`、`<span>`等。
- **Image**: 用于显示图片资源。
- **TextInput**: 提供文本输入功能。
- **ScrollView**: 允许内容滚动的容器。
- **FlatList**: 高效渲染长列表数据。
- **TouchableOpacity/TouchableWithoutFeedback/TouchableHighlight**: 提供触摸反馈的组件。
- **SafeAreaView**: 确保内容不会被设备的刘海屏或导航栏遮挡。

##  React Native中的路由和导航解决方案

React Native本身不直接提供路由系统，但推荐使用第三方库，如`react-navigation`。`react-navigation`支持多种导航模式，包括：

- **Stack Navigator**：实现堆栈式的页面导航，有后退历史记录。
- **Tab Navigator**：底部选项卡切换多个页面。
- **Drawer Navigator**：侧滑菜单导航。
- **Switch Navigator**：用于不保留状态的页面跳转。

在React Native中，编程式路由导航主要是通过`react-navigation`库来实现的。`react-navigation`是React Native应用中最常用的导航解决方案，它提供了一系列导航器（Navigators）来管理屏幕（Screens）的堆叠、切换和导航。下面是一个基本的实现步骤和概念介绍：

### 安装和配置

首先，你需要安装`react-navigation`及其依赖库：

```bash
npm install @react-navigation/native react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

然后安装适合的导航器，例如堆栈导航（Stack）：

```bash
npm install @react-navigation/stack
```

### 创建StackNavigator

接着，在你的应用中创建一个StackNavigator，这是最基础的导航方式，可以管理多个屏幕，并且允许用户通过“后退”操作返回之前的屏幕。

```javascript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

### 编程式导航实现

在任一屏幕组件内部，你可以通过导航道具（navigation prop）来进行编程式导航。当你想要从一个屏幕导航到另一个屏幕时，可以调用`navigation.navigate()`方法。

例如，在`HomeScreen`中有一个按钮，点击后导航到`DetailsScreen`：

```javascript
import React from 'react';
import { Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <Button
      title="Go to Details"
      onPress={() => navigation.navigate('Details')}
    />
  );
}
```

### 参数传递

你还可以向下一个屏幕传递参数，这在`navigate`方法的第二个参数中完成：

```javascript
navigation.navigate('Details', { itemId: 86, otherParam: 'anything' });
```

在`DetailsScreen`中，可以通过`route.params`访问这些参数：

```javascript
function DetailsScreen({ route }) {
  /* ... */
  console.log(route.params.itemId, route.params.otherParam);
  /* ... */
}
```

### 结论

编程式导航允许开发者根据特定条件或用户交互动态改变应用程序的导航状态，提供了高度的灵活性和控制力。通过使用`react-navigation`及其各种导航器，React Native应用可以构建复杂的导航流程，同时保持代码的清晰和可维护性。

##  React Native的架构原理概述

React Native的架构设计围绕着跨平台开发的核心理念，旨在提供一种高效的方式来构建原生级别的移动应用程序，同时保持代码的可复用性和开发效率。以下是React Native架构的更详细说明：

### 1. **核心组件与层次**

- **JavaScript层**：
  - **React组件**: 开发者编写的业务逻辑和UI组件，使用React语法，运行在JavaScript虚拟机中（通常是JavaScriptCore或V8）。
  - **React Native库**: 提供了一套与原生平台交互的API，允许JavaScript代码控制原生组件和系统功能。

- **原生层**：
  - **原生模块**: 实现具体平台功能的原生代码（Objective-C/Swift在iOS上，Java/Kotlin在Android上），这些模块通过Bridge暴露给JavaScript调用。
  - **UI组件**: 每个原生平台都有对应的一套UI组件，如`UIView`和`UIViewController`在iOS，`View`和`Activity`在Android，它们接收来自JavaScript的指令并渲染界面。

- **Bridge (桥接)**:
  - 负责JavaScript和原生代码之间的通信，实现了双向消息传递。使用异步消息队列来处理跨语言的调用，确保两个线程（JavaScript线程和原生主线程）之间的安全交互。

### 2. **线程模型**

- **JavaScript线程**：运行React组件的更新逻辑和用户代码。
- **主线程**（UI线程）：在iOS上是主线程，在Android上是UI线程，负责处理UI更新、事件分发等。
- **Shadow Thread（影子线程）**：在某些版本中存在，主要用于计算布局，生成Shadow Tree（影子树），这是一个轻量级的原生表示，用于优化布局计算，减少主线程负担。新架构可能对此有所调整。

### 3. **渲染机制**

- **Reconciliation & Virtual DOM**：React Native利用React的虚拟DOM思想，通过Diff算法计算出最小变更集，决定哪些UI需要更新。
- **Shadow Tree**：计算视图布局，生成一个即将渲染的视图结构的表示，不涉及实际渲染，优化布局计算。
- **原生渲染**：最终的UI更新指令由JavaScript线程通过Bridge传递给原生线程，原生线程根据这些指令创建或更新实际的原生视图组件。

### 4. **新架构（Fabric & TurboModule）**

近年来，React Native引入了Fabric和TurboModule等新特性，旨在进一步优化架构，提升性能和开发体验：
- **Fabric**：新的渲染引擎，它改变了React Native的渲染和布局系统，减少了渲染层级，提高了性能，简化了渲染逻辑。
- **TurboModule**：更快的原生模块加载和调用机制，通过预编译和直接调用原生代码，减少了Bridge的开销，提升了调用速度。

### 5. **事件处理**

- 事件由原生端捕获并通过Bridge传递给JavaScript线程处理，使用`RCTEventDispatcher`来分发事件到对应的React组件。

综上所述，React Native的架构设计高度关注于如何高效地在JavaScript和原生环境之间架起沟通的桥梁，同时保持应用的高性能和开发的灵活性。随着技术的演进，React Native不断引入新的特性来克服传统架构的限制，优化开发者体验并提升应用质量。

##  常见的React Native第三方库有哪些？

- **React Navigation**: 导航解决方案。
- **Redux / MobX / Context API**: 状态管理库。
- **axios**: 网络请求库。
- **styled-components**: 动态样式库。
- **lodash**: JavaScript实用函数库。
- **React Native Elements / Native Base**: UI组件库。
- **React Native Vector Icons**: 图标库。
- **react-native-image-picker**: 图片选择器。
- **react-native-push-notification**: 本地和远程通知支持。
- **react-native-webview**: 渲染网页内容。


## RN中有哪些原生的API可供调用
React Native 提供了一系列原生模块，允许开发者通过JavaScript调用底层原生平台（iOS和Android）的功能。以下是一些常用的React Native原生API示例，包括获取地理位置等：

### 1. 地理位置（Geolocation）
React Native 自带了`Geolocation`模块，用于获取设备的地理位置信息，包括经度、纬度、海拔、速度等。

```javascript
import { Geolocation } from 'react-native';

Geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  },
  (error) => console.error(error),
  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);
```

### 2. 网络请求（fetch）
虽然不是严格意义上的原生模块，但`fetch` API是React Native中用于执行网络请求的标准方法，它基于原生平台的网络栈。

```javascript
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

### 3. 存储（AsyncStorage）
`AsyncStorage`是React Native提供的一个简单的异步键值存储系统，用于在设备上持久化数据。

```javascript
import { AsyncStorage } from 'react-native';

AsyncStorage.setItem('key', 'value')
  .then(() => console.log('Data saved'))
  .catch((error) => console.log('Error saving data', error));

AsyncStorage.getItem('key')
  .then((value) => console.log(value))
  .catch((error) => console.log('Error getting data', error));
```

### 4. 设备信息（DeviceInfo）
可以获取设备的硬件和操作系统信息。

```javascript
import { DeviceInfo } from 'react-native';

console.log(DeviceInfo.getUniqueID()); // 获取设备唯一标识符
```

### 5. 相机与相册（CameraRoll）
访问设备的相册和照片。

```javascript
import { CameraRoll } from '@react-native-community/cameraroll';

CameraRoll.getPhotos({
  first: 20,
  assetType: 'Photos',
})
  .then((data) => {
    console.log(data.edges.map((e) => e.node.image.uri));
  })
  .catch((err) => {
    // Handle error
  });
```

### 6. 用户权限（Permissions）
请求访问如相机、位置、通知等权限。

```javascript
import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}
```

除了上述API，React Native还支持更多原生模块，如`ImagePicker`、`NetInfo`（网络状态）、`PushNotificationIOS`（iOS推送通知）、`Linking`（打开URL或拨打电话）等，以及通过自定义原生模块来扩展功能。