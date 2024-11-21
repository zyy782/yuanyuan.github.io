
## Diff 算法
#### 关于 Snabbdom
> Snabbdom 是一个轻量级的虚拟 DOM 库，用于高效地更新 DOM。它以简单、快速和模块化著称，是许多现代前端框架（如 Vue.js）的灵感来源之一。以下是 Snabbdom 的一些关键特性和概念：
> 
> **主要特性**
> 1. 轻量级：Snabbdom 的核心库非常小，只有几百行代码，适合需要高性能和小体积的应用。
> 2. 模块化设计：Snabbdom 提供了一个核心库和一组可选的模块。核心库负责最基本的虚拟 DOM 操作，而模块则提供额外的功能，如属性设置、事件处理、样式管理等。
> 3. 高效的 diff 算法：Snabbdom 使用了一种高效的 diff 算法来比较新旧虚拟 DOM 树，并生成最小的更新操作集合，从而高效地更新真实 DOM。
> 4. 灵活性：由于其模块化设计，开发者可以根据需要选择和定制模块，甚至可以编写自己的模块来扩展 Snabbdom 的功能。
> 
> **工作原理**
> Snabbdom 的工作流程主要包括以下几个步骤：
> 1. 创建虚拟节点：
> 使用 Snabbdom 提供的 h 函数创建虚拟节点（VNode）。这些节点是 JavaScript 对象，描述了 DOM 结构。
> 2. 渲染虚拟 DOM：
> 通过 patch 函数将虚拟 DOM 渲染为真实 DOM。初次渲染时，Snabbdom 会将虚拟节点转换为真实 DOM 节点并插入到页面中。
> 3. 更新虚拟 DOM：
> 当数据发生变化时，创建新的虚拟节点，并使用 patch 函数将新旧虚拟节点进行比较。
> 4. 应用最小更新：
> Snabbdom 的 diff 算法会计算出最小的更新操作集合，并将这些操作应用到真实 DOM 上，从而高效地更新界面。
> 
> **使用示例**
> 以下是一个简单的 Snabbdom 使用示例：
> 通过 Snabbdom，开发者可以以声明式的方式构建和更新用户界面，享受高效的 DOM 操作和灵活的模块化设计。
> ```
> import { init } from 'snabbdom';
> import { h } from 'snabbdom/h';
> import { styleModule } from 'snabbdom/modules/style';
> import { eventListenersModule } from 'snabbdom/modules/eventlisteners';
> 
> // 初始化 Snabbdom，选择需要的模块
> const patch = init([styleModule, eventListenersModule]);
> 
> // 创建初始虚拟节点
> let vnode = h('div#container', { style: { fontWeight: 'bold' } }, [
>   h('h1', 'Hello Snabbdom'),
>   h('p', 'This is a paragraph')
> ]);
> 
> // 将虚拟节点渲染为真实 DOM
> const container = document.getElementById('app');
> patch(container, vnode);
> 
> // 创建新的虚拟节点
> const newVnode = h('div#container', { style: { fontWeight: 'normal' } }, [
>   h('h1', 'Hello Snabbdom'),
>   h('p', 'This is an updated paragraph')
> ]);
> 
> // 更新真实 DOM
> patch(vnode, newVnode);
> ```

#### 关于 虚拟DOM
Vue 使用虚拟 DOM 来减少直接操作真实 DOM 的次数，因为频繁的操作会导致性能下降。
虚拟 DOM 是一个轻量级的 JavaScript 对象结构，它表示了真实的 DOM 结构。

真实DOM结构：
```
<template>
  <div class="menu">
    <h2>菜单</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: ['拿铁', '美食', '果汁']
    };
  }
}
</script>
```
生成的虚拟DOM
```
{
  tag: 'div',
  data: { class: 'menu' },
  children: [
    {
      tag: 'h2',
      children: [
        { text: '菜单' }
      ]
    },
    {
      tag: 'ul',
      children: [
        { tag: 'li', key: 0, children: [{ text: '拿铁' }] },
        { tag: 'li', key: 1, children: [{ text: '美食' }] },
        { tag: 'li', key: 2, children: [{ text: '果汁' }] }
      ]
    }
  ]
}
```   
虚拟DOM 包含以下属性：
1. tag
   表示节点的标签名，例如 div、span 等。
   如果是文本节点，tag 通常为 undefined 或 null。
2. data
   包含节点的数据，如属性、事件监听器等。
   例如，class、style、attrs（属性）、on（事件监听器）等。
3. children
   一个数组，包含子节点的虚拟节点。
    如果节点没有子节点，这个属性可能是空数组或 undefined
4. text
   如果节点是文本节点，text 属性包含文本内容。
   如果节点是元素节点，text 通常为 undefined。
5. elm
   对应的真实 DOM 元素的引用。
   在虚拟 DOM 被渲染到真实 DOM 后，这个属性会被设置。
6. context
   在 Vue.js 中，表示当前组件实例的上下文。
7. key
   用于标识节点的唯一性，帮助框架在更新时高效地复用和重新排序节点。
   在列表渲染中尤其重要。
8. componentOptions
   - 如果节点是一个组件，这个属性包含组件的选项信息。


#### vue2 的 diff 算法
1. **基于 Snabbdom**：
   Vue 2 的 diff 算法 称为 patching 算法，是基于 Snabbdom 的实现，虚拟 DOM 要想转化为真实 DOM 就需要通过 patch 方法转换；采用深度优先、同层比较的策略。
2. **组件Watcher更新机制**：
   最初 Vue1.x 视图中每个依赖均有更新函数对应，可以做到精准更新，因此并不需要虚拟 DOM 和 patching 算法支持，但是这样粒度过细导致 Vue1.x 无法承载较大应用;
   Vue 2 为了降低 Watcher 粒度，让**每个组件**只有一个 Watcher，当组件内的响应式数据发生变化时，Watcher 会触发组件的更新，为了能精确找到发生变化的地方并高效更新，引入了 patching 算法。
3. **无静态节点优化**：
   Vue 2 中没有对静态节点进行特殊优化，**所有节点都参与 diff 过程**。
4. **指令方式事件处理**：
   在 Vue 2 中，事件处理是通过指令的方式进行的，这意味着在模板中使用 v-on 指令来绑定事件处理器。
   例如，v-on:click="handleClick" 用于绑定点击事件。
   > 在 Vue 的 diff 算法中，事件处理是一个重要的部分，因为当虚拟 DOM 发生变化时，可能需要更新事件绑定。具体来说，diff 算法需要处理以下几种情况：
   > + **事件绑定**：
   >     当一个新的虚拟节点被创建时，diff 算法会检查该节点是否有事件绑定。如果有，它会在真实 DOM 上添加相应的事件监听器。
   > + **事件解绑**：
   >     当一个虚拟节点被移除时，diff 算法会在真实 DOM 上移除相应的事件监听器，以防止内存泄漏。
   > + **事件更新**：
   >     如果一个虚拟节点的事件处理器发生了变化，diff 算法会更新真实 DOM 上的事件监听器，以确保事件处理器是最新的。

#### vue3 的 diff 算法
1. **重写 diff**：
   Vue 3 重写了虚拟 DOM 和 diff 算法，提升了整体性能。
2. **静态提升**：
   Vue 3 引入了静态提升的概念，将不变的静态节点在编译时 **提升到渲染函数之外**，避免在每次渲染时重新创建。
3. **静态标记**：
   Vue 3 会在**编译阶段 标记静态节点**，diff 过程中可以跳过这些节点的比较。
4. **Watcher事件缓存**：
   Vue 3 对事件侦听器进行了缓存，减少了事件处理的开销。
5. **Fragment 支持**：
   Vue 3 支持 Fragment，可以在不增加额外 DOM 元素的情况下返回多个根节点。
   > Fragment 是vue3新特性，允许组件在不增加额外 DOM 元素的情况下返回多个根节点。
   > 传统上，Vue 组件的模板必须有一个单一的根节点，使用 Fragment，开发者可以直接返回多个根节点，而不需要额外的包裹元素。这不仅简化了模板结构，还可以减少不必要的 DOM 元素，从而提高性能。
   > 例如，假设你有一个组件需要返回一个标题和一个段落：
   > ```
   > <template>
   >   <h1>标题</h1>
   >   <p>段落</p>
   > </template>
   > ```
6. **更细粒度的更新**：
   Vue 3 的响应式系统更为细粒度，能够更精确地追踪数据变化，减少不必要的更新。
   > Vue 3 的更新更为细粒度主要是因为其响应式系统的改进。
   > 以下是一些关键原因：
   > + Proxy 机制：
   > Vue 3 使用 JavaScript 的 Proxy 对象来实现响应式系统，取代了 Vue 2 中的 Object.defineProperty。Proxy 可以直接监听对象的属性读写操作，包括新增和删除属性，这使得 Vue 3 能够更精确地追踪数据变化。
   > + 更细粒度的依赖追踪：
   > Vue 3 的响应式系统能够在更细的粒度上追踪数据的依赖关系。每个响应式数据的变化只会触发与之相关的更新，而不会影响不相关的部分。这种精确的依赖追踪减少了不必要的更新，提高了性能。
   > + 优化的渲染机制：
   > Vue 3 在渲染机制上进行了优化，能够更高效地处理组件的更新。通过静态提升和静态标记等技术，Vue 3 可以在编译阶段识别出不变的静态节点，从而在运行时跳过这些节点的更新。
   > + 更高效的调度器：
   > Vue 3 引入了一个新的调度器来管理更新任务。这个调度器能够批量处理更新任务，并在合适的时机执行，避免了不必要的重复渲染。     


#### diff 算法流程:
1. vue 中 diff 执行的时刻是**组件内响应式数据变更触发实例执行其更新函数时**，更新函数会再次执行 render 函数获得最新的虚拟 DOM，然后执行 patch 函数，并传入新旧两次虚拟 DOM，通过比对两者找到变化的地方，最后将其转化为对应的 DOM 操作
2. patch 过程是一个递归过程， 遵循深度优先、同层比较的策略；以 Vue3 为例：
   + 首先判断两个节点是否为相同同类节点（根据 key 判断），不同则删除重新创建
   + 如果 两个节点 都是文本节点，则更新文本内容
   + 如果 两个节点 都是元素节点，则更新元素节点的属性 并 递归更新子节点（相同则递归子节点====> 深度优先）
   + 更新子节点时：
     + 如果新子节点是文本， 旧子节点是元素，则清空旧子节点，并设置文本
     + 如果新子节点是文本， 旧子节点也是文本，则直接设置文本
     + 如果新子节点是元素， 旧子节点也是元素，则递归更新子节点
     + 如果新子节点是元素， 旧子节点是文本，则清空文本并创建新子节点元素数组中的子元素




