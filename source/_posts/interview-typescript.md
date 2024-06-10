---
title: interview-typescript
date: 2024-06-04 14:31:14
cover: https://th.bing.com/th/id/OIP.yZTi1-PTpmVRWfdIZ0Q9nAHaD4?w=330&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7
tags:
---
# TypeScript
## 为什么要使用 TypeScript?

TypeScript 是 JavaScript 的一个超集，它在 JS 的基础上添加了静态类型系统和其他一些增强功能，旨在提高代码的可维护性、可读性和开发效率。使用 TypeScript 的主要优势包括：

1. **静态类型检查**：在编码阶段就能发现类型错误，减少运行时错误。
2. **代码编辑器支持**：大多数现代IDE和编辑器对 TypeScript 提供了出色的代码补全、接口提示和错误检测。
3. **易于维护和团队协作**：类型注解使代码意图更加清晰，有助于团队成员理解代码结构。
4. **未来JavaScript特性**：TypeScript 支持很多即将成为标准的 ESNext 特性，如异步编程、装饰器等，让你提前享受新特性。
5. **模块和命名空间**：提供了更好的模块化支持，有助于组织大型代码库。

## TypeScript 相对于 JavaScript 的优势

- **类型安全性**：减少因类型错误引起的运行时bug。
- **开发工具集成**：丰富的IDE支持，如智能提示、重构支持等。
- **编译时检查**：通过编译时发现潜在错误，提高代码质量。
- **易于规模化**：适合大型项目，有利于维护和扩展。

## const 和 readonly 的区别

- **const**：是一个变量声明关键字，表示声明的变量不可重新赋值，但是如果是对象或数组，其内部属性或元素是可以修改的。
- **readonly**：是一个属性修饰符，用于类的属性上，表示该属性一旦被初始化后就不可更改。

## 枚举和常量枚举的区别

- **枚举（enum）**：提供了一种定义一组命名常量的方式。枚举值默认是从0开始递增的数字，但也可以自定义。
- **常量枚举（const enums）**：在编译阶段会被替换为字面量值，不会生成任何运行时代码，提高性能。常量枚举的成员只能是字符串或数字字面量。


### 常规枚举（Enum）示例

```typescript
// 常规枚举定义
enum Color {
  Red,
  Green,
  Blue
}

console.log(Color.Red); // 输出: 0
console.log(Color[0]); // 输出: "Red"
for (let color in Color) {
  console.log(color); // 可以遍历枚举成员
}
```

在这个例子中，`Color`是一个常规枚举，它的成员在编译后的JavaScript中会转化为一个对象，你可以在运行时通过枚举名或索引访问它们，也可以遍历枚举的所有成员。

### 常量枚举（Const Enum）示例

```typescript
// 常量枚举定义
const enum Size {
  Small = 'S',
  Medium = 'M',
  Large = 'L'
}

console.log(Size.Small); // 编译时替换为 'S'
console.log(Size.Medium); // 编译时替换为 'M'

// 尝试遍历Size会发现编译错误，因为编译后Size不会存在
// for (let size in Size) { // 这段代码会导致编译错误
//   console.log(size);
// }
```

在这个例子中，`Size`是一个常量枚举，它在编译阶段会被替换为对应的字面量值，比如`Size.Small`会被替换为`'S'`。这意味着在生成的JavaScript代码中，`Size`这个枚举本身不存在，你不能在运行时访问它或遍历其成员，但这样做的好处是减小了代码体积并提高了执行效率。

通过这两个例子，你可以直观地看到常规枚举和常量枚举在使用和行为上的不同。

## 接口和类型别名的区别

- **接口（interface）**：用于描述对象的形状，可以用来定义函数参数、返回值类型或实现类的契约。接口可以被继承和实现。
- **类型别名（type alias）**：为已存在的类型提供一个新的名字，可以是任何类型表达式，包括联合类型、元组类型等。类型别名不支持实现或继承。

## TypeScript 中 any 类型的作用

`any` 类型表示可以是任意类型，使用它可以绕过类型检查。通常在不确定类型或需要兼容旧的 JavaScript 代码时使用，但过度使用会削弱类型安全。

## any、never、unknown、null & undefined 和 void 的区别

- **any**：可以代表任何类型，绕过类型检查。
- **never**：表示永远不会出现的值的类型，用于函数永远抛出异常或永不停止执行的情况。
- **unknown**：表示未知类型的值，比 any 更安全，因为需要显式类型断言才能使用。
- **null & undefined**：代表空值或未定义值，TypeScript 中可以单独或一起作为类型使用。
- **void**：表示没有任何返回值的函数的返回类型。

## never的使用
在TypeScript中，`never`类型是一个特殊类型，表示永远不会发生的值的类型。它是所有类型的子类型，但没有任何类型是它的子类型（除了`never`本身）。这使得它可以用于表示那些永远不应该达到的终点或者一定会抛出错误的代码路径。以下是几个使用`never`的例子：

### 1. 函数永远抛出错误

当一个函数明确地总是抛出错误，不返回任何值时，其返回类型可以标记为`never`。

```typescript
function throwError(message: string): never {
    throw new Error(message);
}

// 调用此函数会抛出错误，因此没有返回值
throwError("Something went wrong");
```

### 2. 无限循环

在理论上永远不会结束的循环也可以使用`never`来表示其循环体内的代码路径不会到达终点。

```typescript
function infiniteLoop(): never {
    while (true) {
        // 这个循环永远不会停止，所以这里的代码路径永远不会结束
    }
}

// 如果调用此函数，它将永远不会返回
// infiniteLoop();
```

### 3. 类型保护与never的配合

在类型守卫中，当你确定一个联合类型的变量不可能是任何一种类型时，可以使用`never`来表示这种不可能性。

```typescript
function isNumber(x: number | string | boolean): x is number {
    return typeof x === "number";
}

function checkValue(x: number | string | boolean) {
    if (isNumber(x)) {
        // 在这里，x被narrow到number类型
    } else if (typeof x === "string") {
        // 在这里，x被narrow到string类型
    } else {
        // 这里x只能是boolean，但为了演示never，我们假设没有这种情况
        const _exhaustiveCheck: never = x;
    }
}
```

在上面的`checkValue`函数中，虽然实际情况下`x`可能是`number`、`string`或`boolean`，但在示例的最后else分支中，为了演示，我们假设已经排除了所有可能的类型，这时可以用`never`类型来表示这种情况，但实际上这会导致类型检查错误，因为我们没有排除`boolean`类型。正确的做法是在实际代码中处理所有可能的类型，或者确保逻辑上能够覆盖所有情况。

### 4. 作为泛型约束

`never`还可以用作泛型约束，帮助确保某些操作不可能发生。

```typescript
function combine<A, B>(a: A, b: B): A & B {
    return { ...a, ...b };
}

// 如果两个类型没有交集，结果类型将是never
type Result = Combine<'a', 1>;
// Result 类型为 never，因为字符串和数字没有公共属性
```

通过这些示例，可以看到`never`类型主要用于静态类型检查，帮助开发者捕捉潜在的编程错误和逻辑不一致。

## TypeScript 中 type 和 interface 的区别

- **type**：更灵活，可以定义更复杂的类型，如联合类型、元组类型、映射类型等，但不能用于实现或继承。
- **interface**：主要用于描述对象结构，可以实现和继承，更适合定义对象、类或函数的形状。

在TypeScript中，`type`和`interface`都用于定义类型，但它们之间存在一些关键差异，这些差异决定了在不同场景下使用它们的合适性：

### 1. 声明合并（Merging）
- **Interface**: 支持声明合并（declaration merging），意味着如果你在不同的地方声明了同名的接口，TypeScript会自动将它们合并成一个接口，包含所有声明的成员。这对于逐步定义或扩展第三方库的接口非常有用。
  
- **Type Alias (`type`)**: 不支持声明合并。如果尝试在不同位置定义同名的类型别名，TypeScript会报错。每个`type`必须是唯一的，不允许重复定义。

### 2. 应用范围
- **Interface**: 更倾向于描述对象的结构，可以用于类的实现，定义方法签名、属性等。可以用来描述JavaScript中的对象字面量、类以及函数的类型。

- **Type Alias**: 更灵活，可以用来定义任何类型，包括但不限于对象类型、联合类型（unions）、交叉类型（intersections）、元组（tuples）、原始类型别名等。它提供了更广泛的应用场景，比如重命名现有类型、创建复杂类型等。

### 3. 继承与实现
- **Interface**: 可以使用`extends`关键字实现接口间的继承，从而组合多个接口定义。类可以实现接口来强制遵循接口规定的形状。

- **Type Alias**: 虽然直接的继承行为不如接口灵活，但可以通过交叉类型（`&`）来组合类型，达到类似的效果。Type alias不支持直接继承另一个类型别名，但可以使用交叉类型来组合类型。

### 4. 基础类型重命名
- **Type Alias**: 允许你为现有的类型（如`number`、`string`等原始类型）创建别名，这是接口所不能做到的。

### 5. 映射类型与高级类型
- **Type Alias**: 提供了更强大的类型操作能力，如映射类型（mapped types）和条件类型（conditional types），使得创建复杂和动态类型成为可能。

### 使用场景
- 当你需要描述一个对象的结构或实现类的接口时，通常首选`interface`。
- 当你需要定义更复杂或更灵活的类型，包括联合类型、交叉类型、类型重命名等，或需要利用TypeScript的高级类型特性时，使用`type`更为适合。

总的来说，`interface`和`type`各有千秋，选择哪个取决于你要解决的具体问题和想要达到的类型设计目标。

## 工具类型的作用

- **Exclude<T, U>** ：从类型T中排除类型U的所有子类型。
- **Omit<T, K>** ：从类型T中移除指定的一组键K。
- **Pick<T, K>** ：从类型T中选取指定的一组键K组成新的类型。
- **Merge<T, U>** ：合并类型T和U的属性，如果有同名属性，则U的属性会覆盖T的属性。
- **Intersection<T, U>** ：取类型T和U的交集，即同时满足T和U的所有属性。
- **Overwrite<T, U>** ：类似Merge，但U的属性会完全覆盖T的相同属性，而不是仅仅在冲突时覆盖。

## 方法重载

方法重载允许在同一个类或接口中定义多个同名方法，但这些方法的参数列表必须不同（数量或类型），从而实现不同的功能。编译器会根据调用时的实际参数自动匹配合适的方法签名。

## 泛型

泛型允许你在定义函数、接口或类的时候不预先指定具体的类型，而是在使用时根据传入的参数类型来推断或指定类型。这提高了代码的复用性和灵活性，减少了类型转换的需求。

## TypeScript 底层转为JS

TypeScript 通过编译器（tsc）将 TypeScript 代码转换为纯 JavaScript。这个过程包括：
- **类型检查**：编译器首先检查代码中的类型错误。
- **类型擦除**：由于JavaScript是动态类型语言，编译后的代码会移除所有的类型注解，确保JavaScript引擎能正确执行。
- **代码转换**：将TypeScript的高级语法（如箭头函数、async/await等）转换为ES5或ES6及以下版本的JavaScript，以保证浏览器或Node.js环境的兼容性。
- **输出**：最终生成的JavaScript代码可以直接在浏览器或Node环境中运行，无需额外的TypeScript运行时支持。