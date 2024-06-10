---
title: interview-mobx
date: 2024-06-04 14:32:54
tags:
---
# Mobx

## Mobx的原理是什么，为什么选择Mobx作为状态管理工具
### 原理
MobX 6版本的核心原理仍然是基于其反应式编程模型，但在此版本中，一些实现细节和推荐的最佳实践有所变化。MobX的工作原理主要涉及以下几个关键点：

1. **可观察状态（Observables）**: MobX使用`makeObservable`方法或者在类构造函数中定义可观察属性，将普通JavaScript对象的属性转化为可观察的。这一转变允许MobX追踪这些属性的读取和修改。在MobX 4和5中，这是通过`Object.defineProperty`或在MobX 5中引入的`Proxy`来实现的，而在MobX 6中，这一基础机制保持不变，但推荐的实践是使用`makeObservable`而不是装饰器。

2. **自动追踪（Automatic Tracking）**: 当访问或修改可观察状态时，MobX会自动追踪这些操作，并建立一个依赖关系图。这意味着它知道哪些计算值（Computed Values）和React组件依赖于哪些状态。

3. **计算值（Computed Values）**: 计算值是基于可观察状态的衍生值，它们会在依赖的状态发生改变时自动重新计算。MobX会记住这些计算值的计算过程，并在下次访问时，如果依赖未变，则直接返回缓存的结果，从而提高效率。

4. **动作（Actions）**: MobX鼓励通过`action`来修改状态。`action`是一个特殊的函数，它包裹状态修改的逻辑，确保这些改变是可预测的、可追踪的，并且可以在事务中执行。这有助于维护状态的一致性，并使得状态变更易于调试。

5. **响应式渲染（Reactive Rendering）**: MobX与React等框架的集成（如通过`mobx-react`或直接使用`observer`）使得组件能够自动响应状态变化并重新渲染。当可观察状态变化时，MobX会通知相关组件，触发必要的重渲染，而无需手动比较props或state。

6. **优化和最小化重渲染**: MobX通过其高效的依赖追踪系统，确保只有真正依赖于改变状态的组件才会被重渲染。这减少了不必要的计算和DOM操作，提高了应用性能。

尽管MobX 6推荐避免使用装饰器语法并引入了新的API，但其背后的原理——即通过自动追踪依赖、自动计算和自动更新UI——仍然保持一致，使得状态管理变得更加简单和高效。

### MobX 6 版本的核心特点和更新

MobX 6 引入了一些关键的变化和改进，使其成为一个更加现代化和高效的状态管理库。主要特点包括：

1. **装饰器的非推荐使用**：尽管装饰器语法在MobX早期版本中很流行，但在MobX 6中官方不再推荐使用装饰器，因为它们不是ES标准的一部分，且标准化过程缓慢。尽管如此，通过适当的配置（如使用Babel插件），仍然可以启用装饰器语法。

2. **`makeObservable` 方法**：为了替代装饰器，MobX 6 引入了 `makeObservable` 方法。在类的构造函数中调用此方法来定义哪些属性应该是可观察的、哪些是计算值、哪些是可自动运行的副作用等。例如：
   ```javascript
   import { observable, action, makeObservable } from 'mobx';

   class Counter {
     count = 0;

     constructor() {
       makeObservable(this, {
         count: observable,
         increment: action,
       });
     }

     increment() {
       this.count++;
     }
   }
   ```

3. **更好的Tree-shaking和性能**：MobX 6进行了优化，提高了Tree-shaking能力，这意味着在打包过程中未使用的代码会被更有效地剔除，从而减小最终应用的体积。此外，它还进行了性能优化，提升了运行时效率。

4. **更好的TypeScript支持**：MobX 6增强了对TypeScript的支持，提供了更丰富的类型定义，帮助开发者在使用静态类型时获得更好的开发体验。

5. **新的API**：除了 `makeObservable` 外，MobX 6 还引入了 `runInAction`、`flow` 等新API，以及对现有的API进行了调整，以更好地支持函数式编程风格和副作用管理。

### 为什么选择 MobX 6 作为状态管理工具

1. **简易性**：MobX 以其声明式的风格和最少的样板代码而闻名，使得状态管理变得直观且易于理解。即使在不使用装饰器的情况下，通过 `makeObservable` 的方式也能保持代码简洁。

2. **高效性**：自动追踪依赖和优化的变更检测机制保证了只有在状态真正变化时才触发必要的更新，这大大提高了应用的性能。

3. **灵活性**：MobX 支持多种编程范式，无论是面向对象还是函数式编程，都能很好地适应，提供灵活的状态管理解决方案。

4. **集成性**：MobX 与React等主流前端框架有着很好的集成，特别是通过 `mobx-react` 库，使得状态管理和组件更新无缝连接。

5. **学习曲线低**：相对于Redux等其他状态管理库，MobX的学习曲线相对平缓，开发者可以快速上手并开始构建功能。

综上所述，MobX 6 以其简洁性、高效性和灵活性成为了很多开发者选择的状态管理工具，尤其适合那些希望快速迭代、保持代码可维护性并追求高性能的应用开发场景。

## 什么是MobX及其主要特点？

MobX是一个用于JavaScript应用程序的状态管理库，特别适合React和其他前端框架。它采用声明式的方法，让状态管理变得直观且易于理解。MobX的主要特点包括：

- **简单易用**：通过自动跟踪依赖关系和自动优化，MobX几乎不需要手动管理状态的更新逻辑。
- **声明式**：开发者只需声明状态、衍生值和更新逻辑，无需关注何时何地执行更新。
- **高性能**：利用高效的反应式编程模型，仅在状态真正变化时触发最小化更新。
- **集成友好**：与React等库深度集成，支持透明的性能优化和组件重渲染控制。
- **可扩展性**：适用于从小型到大型应用的各种规模，易于测试和调试。

## 如何在MobX 6中创建一个可观察的状态（observable state）

在MobX 6中，推荐避免使用装饰器语法，转而使用 `makeObservable` 函数来定义可观察状态。以下是一个示例：

```javascript
import { observable, makeObservable } from 'mobx';

class Todo {
  id = Math.random();
  title = "";
  completed = false;

  constructor() {
    makeObservable(this, {
      title: observable,
      completed: observable,
    });
  }
}
```

## MobX中的计算值（computed values）是如何工作的？

计算值（Computed Values）是基于其他状态（包括其他计算值）派生的值，MobX会自动跟踪这些依赖关系，并在依赖项改变时重新计算它们。计算值是惰性的，只在被访问时计算，并且结果会被缓存直到依赖项变化。

```javascript
import { computed } from 'mobx';

class TodoList {
  @observable todos = []; // 假设todos是一个可观察数组

  get completedCount() {
    return computed(() => {
      return this.todos.filter(todo => todo.completed).length;
    });
  }
}
```
注意：在MobX 6中，由于装饰器的非推荐使用，上面的代码应该改写为使用 `makeObservable`：

```javascript
import { computed, makeObservable } from 'mobx';

class TodoList {
  todos = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      completedCount: computed,
    });
  }

  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
}
```

### MobX中的`action`是什么？为什么在修改状态时推荐使用它？

`action`是MobX提供的一个用于修改状态的函数。它确保状态更改在一个原子操作中完成，可以被跟踪、记录、延迟执行或撤销。使用`action`修改状态，而非直接修改，有几个好处：

- **事务性**：确保状态的多个更改作为一个不可分割的整体执行，防止中间状态被外部观察到。
- **可追踪性**：便于调试，因为所有的状态改变都有迹可循。
- **可撤销和重做**：配合MobX的额外工具，可以实现状态更改的历史管理。
- **兼容性**：确保与其他MobX特性（如 reactions 和 computed values）正确交互。

在MobX 6中，创建一个action如下所示：

```javascript
import { action } from 'mobx';

class Todo {
  @observable title = "";

  constructor() {
    makeObservable(this, {
      title: observable,
      setTitle: action,
    });
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }
}
```
或在不使用装饰器的情况下：

```javascript
import { observable, action } from 'mobx';

class Todo {
  title = "";

  constructor() {
    makeObservable(this, {
      title: observable,
      setTitle: action.bound, // 使用bound确保this被正确绑定
    });
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }
}
```
使用`action`确保状态修改遵循MobX的最佳实践，提高应用的稳定性和可维护性。

当然，很高兴继续探讨MobX 6版本的更多细节。请问您具体想了解哪些方面的问题呢？如果您没有特定问题，我可以根据MobX 6的一些高级特性和最佳实践提出并解答一些示例问题。

## MobX 6 中如何处理异步操作？

在MobX 6中，处理异步操作推荐使用`async/await`结合`actions`和`flow`函数。`flow`是MobX提供的一个特殊的函数，用来创建可取消的、可追踪的异步流程。

**示例回答**:

```javascript
import { flow, action } from 'mobx';

class UserStore {
    @observable user = null;

    constructor() {
        makeObservable(this, {
            user: observable,
            fetchUser: action,
        });
    }

    fetchUser = flow(function* fetchUser(userId) {
        try {
            const response = yield fetch(`https://api.example.com/users/${userId}`);
            const userData = yield response.json();
            this.user = userData;
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    });
}
```

在这个例子中，`fetchUser`是一个由`flow`定义的异步action，它可以像普通函数一样被调用，但同时支持取消、重试等高级特性，并且它的执行会被MobX自动跟踪。

## MobX 6 中如何实现状态的持久化？

虽然MobX本身不直接提供状态持久化的功能，但你可以结合其他库（如`localstorage`或`mobx-persist`)来实现。

**示例回答**:

使用`mobx-persist`库可以轻松地将MobX状态保存到本地存储中，实现状态持久化。

首先安装`mobx-persist`:

```bash
npm install mobx-persist --save
```

然后在你的应用中使用:

```javascript
import { persist } from 'mobx-persist';
import { observable, autorun } from 'mobx';

class AppState {
    @persist('list') @observable todos = [];

    constructor() {
        makeObservable(this);
        // 从localStorage恢复状态
        persist.recover(this);
        
        // 自动保存状态到localStorage
        autorun(() => {
            persist.save(this);
        });
    }
}
```

在这个例子中，`@persist('list')`装饰器告诉`mobx-persist`如何序列化和反序列化`todos`数组。

## 如何在React组件中使用MobX 6的状态？

在React中使用MobX 6，通常会用到`observer`高阶组件和`useObserver`钩子来让组件响应MobX状态的变化。

**示例回答**:

使用`observer`高阶组件:

```javascript
import React from 'react';
import { observer } from 'mobx-react-lite';
import { TodoStore } from './TodoStore';

const TodoListView = observer(function TodoListView() {
    const store = new TodoStore();

    return (
        <div>
            {store.todos.map(todo => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
});
```

或使用`useObserver`钩子:

```javascript
import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { TodoStore } from './TodoStore';

function TodoListView() {
    const store = new TodoStore();

    return useObserver(() => (
        <div>
            {store.todos.map(todo => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    ));
}
```

通过上述方式，React组件会自动响应MobX状态的改变并重新渲染。

当然，继续深入探讨MobX 6版本的其他方面：

## MobX 6中如何进行状态的细粒度控制，比如只观察某个对象的特定属性变化？

在复杂的项目中，可能需要对状态的特定部分进行更精细的控制。可以通过`observe`函数或者在`reaction`、`autorun`中指定更具体的依赖来实现这一点。

**示例回答**:

```javascript
import { observe } from 'mobx';

class User {
    @observable name = "";
    @observable email = "";
    
    constructor() {
        makeObservable(this);
        
        // 监听name属性变化
        observe(this, "name", change => {
            console.log("Name changed to", change.newValue);
        });
    }
}
```

## 如何在MobX 6中处理并发和冲突？

虽然MobX本身主要用于状态管理，并不直接提供并发控制机制，但在处理复杂应用中的并发修改时，可以通过组合使用`action`、乐观更新、以及客户端/服务器端的冲突解决策略来管理。

**示例回答**:

对于简单的并发控制，可以在`action`内部实施逻辑来检查和处理可能的冲突：

```javascript
class ShoppingCart {
    @observable items = [];

    @action addItem(item) {
        // 检查是否已存在相同的物品
        if (!this.items.some(i => i.id === item.id)) {
            this.items.push(item);
        } else {
            console.warn("Item already in the cart");
        }
    }
}
```

对于更复杂的并发场景，可能需要结合后端的事务处理或版本控制机制。

## MobX 6如何与其他状态管理库或工具集成，比如Redux或Context API？

尽管MobX自身是一个完整的状态管理解决方案，但它也可以与其他技术栈混合使用，以适应特定项目需求。

**示例回答**:

与Redux结合使用，你可能会选择将MobX用于某些组件或功能的状态管理，而全局应用状态依然由Redux管理。这通常涉及在Redux的Reducer或Actions中使用MobX状态，或者反之，确保两者之间的数据同步。

与React的Context API结合时，MobX的Store可以直接作为Context的Provider值传递给组件树，使得子组件能够访问和使用MobX状态，而无需显式传递props。

## 如何在MobX 6中实现状态的懒加载？

懒加载是一种优化策略，用于在实际需要时才加载数据。结合MobX，可以通过条件性地创建或获取数据来实现。

**示例回答**:

```javascript
class DataLoader {
    @observable data = null;
    @observable isLoading = false;

    @action loadData = flow(function*() {
        if (this.isLoading || this.data) return;
        this.isLoading = true;
        
        try {
            const response = yield fetch('data-source-url');
            this.data = yield response.json();
        } catch(error) {
            console.error("Error loading data", error);
        } finally {
            this.isLoading = false;
        }
    });
}
```

在组件中，首次访问数据时触发`loadData`，实现按需加载。

