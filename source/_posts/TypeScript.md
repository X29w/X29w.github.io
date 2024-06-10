---
title: TypeScript
date: 2023-03-05 12:07:57
cover: https://static.frontendmasters.com/resources/2017-09-15-typescript/thumb.jpg
tags:
- tecnology
categories: 
- Tecnology
- Gadgets
---

## TS 简介

- TypeScript 是 JavaScript 的超集。
- 它对 JS 进行了扩展，向 JS 中引入了类型的概念，并添加了许多新的特性。
- TS 代码需要通过编译器编译为 JS，然后再交由 JS 解析器执行。
- TS 完全兼容 JS，换言之，任何的 JS 代码都可以直接当成 JS 使用。
- 相较于 JS 而言，TS 拥有了静态类型，更加严格的语法，更强大的功能；TS 可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；TS 代码可以编译为任意版本的 JS 代码，可有效解决不同 JS 运行环境的兼容问题；同样的功能，TS 的代码量要大于 JS，但由于 TS 的代码结构更加清晰，变量类型更加明确，在后期代码的维护中 TS 却远远胜于 JS。

## 开发环境搭建

### 单文件

1. 下载 Node.js
   ○ 64 位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   ○ 32 位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi

2. 安装 Node.js
3. 使用 npm 全局安装 typescript
   ○ 进入命令行
   ○ 输入：npm i -g typescript

4. 创建一个 ts 文件
5. 使用 tsc 对 ts 文件进行编译
   ○ 进入命令行
   ○ 进入 ts 文件所在目录
   ○ 执行命令：tsc xxx.ts

#### 脚手架

直接内置，无需多管

## 基本类型

### 类型声明

类型声明给变量设置了类型，使得变量只能存储某种类型的值
语法：

```Typescript
let 变量: 类型;

let 变量: 类型 = 值;

function fn(参数: 类型, 参数: 类型): 类型{
    ...
}
```

| 类型    | 例子              | 描述                            |
| ------- | ----------------- | ------------------------------- |
| number  | 1, -33, 2.5       | 任意数字                        |
| string  | 'hi', "hi", hi    | 任意字符串                      |
| boolean | true、false       | 布尔值 true 或 false            |
| 字面量  | 其本身            | 限制变量的值就是该字面量的值    |
| any     | \*                | 任意类型                        |
| unknown | \*                | 类型安全的 any                  |
| void    | 空值（undefined） | 没有值（或 undefined）          |
| never   | 没有值            | 不能是任何值                    |
| object  | {name:'孙悟空'}   | 任意的 JS 对象                  |
| array   | [1,2,3]           | 任意 JS 数组                    |
| tuple   | [4,5]             | 元素，TS 新增类型，固定长度数组 |
| enum    | enum{A, B}        | 枚举，TS 中新增类型             |


*Number*

:::details Click to see more

```Typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```

:::


*Boolean*

:::details Click to see more

```Typescript
let isDone: boolean = false;
```

:::

*String*

:::details Click to see more

```Typescript
let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;
```

:::

*字面量*

:::details Click to see more
- 言外之意取值只能从规定的几个里面取
```Typescript
let color: 'red' | 'blue' | 'black';
let num: 1 | 2 | 3 | 4 | 5;
```

:::

*Any*

:::details Click to see more
- 相当于变成JavaScript
```Typescript
let color: 'red' | 'blue' | 'black';
let num: 1 | 2 | 3 | 4 | 5;
```

:::


*Unknown*

:::details Click to see more
```Typescript
let notSure: unknown = 4;
notSure = 'hello';
```

:::


*void*

:::details Click to see more
```Typescript
let unusable: void = undefined;
```

:::

*Never*

:::details Click to see more
```Typescript
function error(message: string): never {
  throw new Error(message);
}
```

:::


*Object*

:::details Click to see more
```Typescript
let obj: object = {};
```
:::



*Array*

:::details Click to see more
```Typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```
:::

*Tuple*

:::details Click to see more
```Typescript
let x: [string, number];
x = ["hello", 10];
```
:::


*Enum*
- 枚举（Enum）类型用于取值被限定在一定范围内的场景
- 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
- 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉
- 除了普通枚举，还有常量枚举、外部枚举等
- 枚举成员只读，不可修改

- 普通枚举：做了反向映射，可双向访问，会编译到JS代码中；使用场景：状态的判断、状态码
- 字符串枚举：枚举的是字符串
- 常量枚举：不会被编译到JS中。使用场景：如果某个变量你确定只有几种值，那么就可以使用常枚举去规定，超出规定就会提示报错；

:::details Click to see more
- 相当于变成JavaScript
```Typescript
// 普通枚举 | 数字枚举
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
console.log(Days["Sun"] === 0); // true
console.log(Days[0] === "Sun"); // true
enum Color {
  Red, // 0
  Green, // 1
  Blue, // 2
}
enum Color {
  Red = 1, // 1
  Green = 7, // 7
  Blue, // 8
}
enum Color {
  Red = 1,
  Green = 2,
  Blue = 4,
}
enum Demo {
    // const
    a,                  // 没有初始值
    b = Demo.a,         // 对已有枚举成员的引用
    c = 1 + 2,          // 常量的表达式
    // computed
    d = Math.random(),  // 需要被计算的枚举成员
    e = 'abc'.length    // 需要被计算的枚举成员
}
// 字符串枚举
enum orderStatusDesc {
    UN_PAYED = '未支付',
    PAYED = '已支付',
    CANCELED = '已取消',
    CLOSED = '已关闭'
}
// 常量枚举
const enum Month {
    Jan,
    Feb,
    Mar
}
// 异构枚举：字符串与数字枚举混合，不推荐
enum Status{
    UN_PAYED,
    PAYED = '已支付'
}
```
:::


### 类型断言
有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，可以通过类型断言来告诉编译器变量的类型

*第一种*
```Typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;
```

*第二种*
```Typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```


## 编译选项
- 自动监视文件并编译：tsc xxx.ts -w 
- 自动编译整个项目：tsc

:::details tsconfig.json文件配置
```Typescript
// tsconfig.json
{
  "files": ["src/a.ts"], // 需要编译的单个文件列表
  "include": ["src/*"], // 编译某个文件夹下的一级所有文件
  "exclude": ["src/lib"], // 需要排除的文件、文件夹
  "extends": "./tsconfig.base", // 需继承的配置文件tsconfig.base.json
  "compileOnSave": true, //保存文件的时候自动编译，但当前vscode不支持
  "compilerOptions": {
    "incremental": true, // 增量编译，第一次编译生成一个文件，使得第二次编译速度会提高
    "tsBuildInfoFile": ".tsbuildinfo", // 增量编译文件的存储位置
    "module": "commonjs", // 生成代码的模块标准
    "target": "ES3", // 生成代码目标语言的版本
    "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可用在AMD模块中
    "lib": [], // ts需要引用的库，即声明文件，target=es5则默认引用dom, es5,scripthost
    "allowJs": true, // 允许编译JS文件
    "checkJs": true, // 与allowJs配合使用，对JS文件进行语法检查
    "outDir": "./out", // 指定输出目录
    "rootDir": "./src", // 指定输入文件目录
    "declaration": false, // 生成声明文件
    "declarationDir": "./d", // 声明文件的路径
    "emitDeclarationOnly": false, // 只生成声明文件
    "sourceMap": false, // 生成目标文件的sourceMap
    "inlineSourceMap": false, // 生成目标文件的inlineSourceMap
    "declarationMap": false, // 生成目标文件的declarationMap
    "typeRoots": [], // 声明文件目录，默认node_modules/@types
    "types": [], // 声明文件包
    "removeComments": false, // 删除注释
    "noEmit": false, // 不输出文件
    "noEmitOnError": false, // 发生错误时不输出文件
    "noEmitHelpers": false, // 不生成helper函数，需额外安装ts-helpers
    "importHelpers": false, // 通过tslib引入helper函数，文件必须是模块
    "downlevelIteration": false, // 降级遍历器的实现(es3/5)
    "strict": false, // 开启所有严格的类型检查
    "alwaysStrict": false, // 在代码中注入"use strict"
    "noImplicitAny": false, // 不允许隐式的any类型
    "strictNullChecks": false, // 不允许把null、undefined赋值给其它类型变量
    "strictFunctionTypes": false, // 不允许函数参数双向协变
    "strictPropertyInitialization": false, // 类的实例属性必须初始化
    "strictBindCallApply": false, // 严格的bind/call/apply检查
    "noImplicitThis": false, // 不允许this有隐式的any类型
    "noUnusedLocals": false, // 检查只声明，未使用的局部变量
    "noUnusedParameters": false, // 检查未使用的函数参数
    "noFallthroughCasesInSwitch": false, // 防止Switch语句贯穿
    "noImplicitReturns": false, // 每个分支都要有返回值
    "esModuleInterop": false, // 允许export = 导出，由import from导入
    "allowUmdGlobalAccess": false, // 允许在模块中访问UMD全局变量
    "moduleResolution": "classic", // 模块解析策略
    "baseUrl": "./", // 解析非相对模块的基地址
    "paths": {}, // 路径映射，相对于baseUrl
    "rootDirs": [], // 将多个目录放在一个虚拟目录下，用于运行时
    "listEmittedFiles": false, // 打印输出的文件
    "listFiles": false // 打印编译的文件（包括引用的声明文件）
  }
}
```
:::

- 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。 
- 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json 
- tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc - 