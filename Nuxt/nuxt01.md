## Nuxt小记
 Nuxt SSR 的工作机制和流程：

### 1. **什么是服务端渲染（SSR）？**
- **传统客户端渲染（CSR）**：浏览器加载一个空的 HTML 文件，然后通过 JavaScript 在客户端生成页面内容。
> 在网页中检查源代码只能看到js不能看到html结构
- **服务端渲染（SSR）**：在服务器端生成完整的 HTML 页面，并将其直接发送到客户端，浏览器只需渲染 HTML。
> 可以通过检察院代码看到完整的html结构。爬虫爬取得就是源代码，所以SSR才有利于SEO


### 2. **Nuxt SSR 的工作流程**
1. **请求到达服务器**：
   - 当用户访问一个页面时，浏览器向服务器发送 HTTP 请求。

2. **服务器端渲染页面**：
   - Nuxt 在服务器端运行 Vue.js 应用程序，解析路由和组件，生成对应的 HTML 页面。
   - 服务器会根据页面的逻辑（如数据获取、状态管理等）生成完整的 HTML。

3. **返回 HTML 页面**：
   - 服务器将生成的 HTML 页面返回给浏览器，浏览器直接渲染页面内容。

4. **客户端激活（Hydration）**：
   - 浏览器加载页面后，客户端的 JavaScript 会运行，并将 Vue 应用程序挂载到服务端生成的 HTML 上。
   - Vue 会对比服务端生成的 DOM 和客户端的虚拟 DOM，确保两者一致，然后激活页面的交互功能（如事件监听器）。

   > Hydration 的特点
   > - 静态到动态：
   > 服务端生成的 HTML 是静态的，Hydration 使其变为动态的、可交互的 Vue 应用。
   > - 性能优化：
   > 用户可以快速看到页面内容（因为 HTML 是服务端生成的），而交互功能稍后通过 Hydration 激活。
   > - 一致性要求：
   > ==服务端生成的 HTML 和客户端的虚拟 DOM 必须完全一致==，否则会导致 Hydration 失败或页面重新渲染。报错信息一般为 Hydration completed but contains mismatches.
---

### 3. **Nuxt SSR 的核心组件**
- **`asyncData`**：
  - 用于在组件加载前获取数据，数据会在服务端渲染时注入到页面中。
  - setup 执行时，组件的 data 已经包含了 asyncData 返回的数据。
  ```javascript
  export default {
    async asyncData({ $axios }) {
      const data = await $axios.get('/api/data');
      return { data };
    }
  }
  ```

- **`fetch`**：
  - 类似于 `asyncData`，但不会阻塞页面渲染，适合在客户端和服务端都运行。
  ```javascript
  export default {
    async fetch({ store }) {
      await store.dispatch('fetchData');
    }
  }
  ```

    >Nuxt钩子执行顺序：
        asyncData → fetch → setup → 组件生命周期钩子（如 onBeforeMount 等）


- **onServerPrefetch**
  - 服务端数据预取：在服务端渲染时获取数据，确保页面在服务端生成的 HTML 中包含完整的数据。
  - SEO 友好：通过服务端渲染完整的页面内容，提升搜索引擎优化（SEO）效果。
  - 与客户端共享数据：预取的数据会自动序列化并注入到客户端，避免重复请求。

  ```vue
  <!-- filepath: /pages/example.vue -->
  <script setup>
  import { ref, onServerPrefetch, useState } from 'vue';

  // 使用 useState 定义一个全局状态
  const data = useState('exampleData', () => null);

  // 使用 onServerPrefetch 钩子在服务端预取数据
  onServerPrefetch(async () => {
    if (!data.value) {
      const response = await fetch('https://api.example.com/data');
      data.value = await response.json();
    }
  });
  </script>

  <template>
    <div>
      <h1>Example Page</h1>
      <p>服务端预取的数据：</p>
      <pre>{{ data }}</pre>
    </div>
  </template>
  ```


- **`nuxtServerInit`**：
  - 当用户**首次访问**页面时，nuxtServerInit 会在服务端执行
  - 在 Vuex 中定义，用于在服务端初始化全局状态。
  ```javascript
  export const actions = {
    async nuxtServerInit({ commit }, { $axios }) {
      const data = await $axios.get('/api/data');
      commit('setData', data);
    }
  }
  ```



### 4. `asyncData`、`onServerPrefetch`  和 `fetch` 的区别

| 特性                  | `asyncData`                          | `onServerPrefetch`                   | `fetch`                              |
|-----------------------|---------------------------------------|---------------------------------------|---------------------------------------|
| **执行时机**          | 在组件实例化之前                     | 在组件实例化之前                     | 在组件实例化之后                     |
| **返回值**            | **必须返回对象**，合并到组件的 `data` 中 | 无需返回值，直接操作状态             | 无需返回值，直接操作状态             |
| **作用范围**          | ==仅限页面组件==（`pages` 目录）         | ==页面组件和普通组件都可以使用==         | ==页面组件和普通组件都可以使用==         |
| **访问组件实例**      | 无法访问 `this`                      | 可以访问 `this`                      | 可以访问 `this`                      |
| **适合场景**          | 获取数据并注入到 `data` 中           | 服务端渲染时预取数据，适合复杂逻辑   | 操作 Vuex 或组件状态                 |
| **运行环境**          | 服务端和客户端均可运行               | 仅在服务端渲染时运行                 | 服务端和客户端均可运行               |
| **阻塞渲染**          | 会阻塞页面渲染                       | 会阻塞页面渲染                       | 不会阻塞页面渲染                     |



使用建议
- **`asyncData`**：
  - 用于简单的数据获取和注入，适合页面级别的数据加载。
  - 如果数据只需要注入到 `data` 中，优先使用 `asyncData`。
    ```typescript
    export default {
    async asyncData({ $axios }) {
        const data = await $axios.get('/api/data');
        return { data }; // 返回的数据会被注入到组件的 data 中
    }
    };
    ```
- **`fetch`**：
  - 用于复杂的数据操作，例如需要调用 Vuex 的 `action` 或直接修改组件状态。
  - 如果需要访问组件实例（`this`），优先使用 `fetch`。
    ```typescript
    export default {
    async fetch({ store }) {
        await store.dispatch('fetchData'); // 调用 Vuex 的 action
    }
    };
    ```

- **`onServerPrefetch`**
- 用于服务端渲染时的数据预取，适合需要在服务端生成完整 HTML 的场景。
- 如果需要在服务端获取数据并在客户端共享，优先使用 `onServerPrefetch`。
  ```typescript
  <script setup>
  import { ref, onServerPrefetch, useState } from 'vue';

  // 使用 useState 定义一个全局状态
  const data = useState('exampleData', () => null);

  onServerPrefetch(async () => {
    if (!data.value) {
      const response = await fetch('https://api.example.com/data');
      data.value = await response.json();
    }
  });
  </script>
  ```

### 5. `asyncData` 与 `useAsyncData`
#### **1. 定义与使用场景**
- **`asyncData`**：
  - 是 Nuxt 提供的页面级别钩子。
  - 用于在页面组件加载前获取数据，并将返回的数据合并到组件的 `data` 中。
  - 仅适用于页面组件（`pages` 目录）。

- **`useAsyncData`**：
  - 是 Nuxt 3 中的组合式 API。
  - 用于在任意组件中获取异步数据（不仅限于页面组件）。
  - 更灵活，适合组合式 API 的使用场景。

---

#### **2. 使用方法**

##### **`asyncData` 示例**
```javascript
export default {
  async asyncData({ $axios }) {
    const data = await $axios.get('/api/data');
    return { data }; // 返回的数据会被注入到组件的 data 中
  }
};
```

- 数据会自动注入到组件的 `data` 中，直接通过 `this.data` 或模板中使用。

---

##### **`useAsyncData` 示例**
```vue
<!-- filepath: /pages/example.vue -->
<script setup>
import { useAsyncData } from '#app';

const { data, pending, error } = await useAsyncData('exampleData', async () => {
  const response = await $fetch('/api/data');
  return response;
});
</script>

<template>
  <div>
    <h1>Example Page</h1>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>Data: {{ data }}</div>
  </div>
</template>
```

- `useAsyncData` 返回一个响应式对象，包含：
  - `data`：获取到的数据。
  - `pending`：数据是否正在加载。
  - `error`：请求是否出错。

---

#### **3. 主要区别**

| 特性                  | `asyncData`                          | `useAsyncData`                       |
|-----------------------|---------------------------------------|---------------------------------------|
| **适用范围**          | 仅限页面组件（`pages` 目录）         | **页面组件和普通组件都可以使用**         |
| **返回值**            | 返回对象，合并到组件的 `data` 中     | 返回响应式对象，包含 `data`、`pending`、`error` 等 |
| **运行环境**          | 服务端和客户端均可运行               | 服务端和客户端均可运行               |
| **灵活性**            | 仅支持简单的数据获取                 | 支持更复杂的逻辑和组合式 API         |
| **使用方式**          | 传统选项式 API                      | 组合式 API                           |

---

#### **4. 使用建议**
- **`asyncData`**：
  - 适合简单的数据获取和注入，优先用于页面级别的数据加载。
  - 如果数据只需要注入到 `data` 中，使用 `asyncData` 更简单。

- **`useAsyncData`**：
  - 适合复杂的数据获取逻辑，或需要在普通组件中加载数据。
  - 更灵活，适合与组合式 API 搭配使用。