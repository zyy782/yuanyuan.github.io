### `setPageLayout` 介绍与使用案例

在 Nuxt 中，`setPageLayout` 是一个用于动态设置页面布局的功能。它允许你根据页面的需求动态切换布局，而不是固定使用默认的布局。

#### **`setPageLayout` 的作用**
- **动态布局切换**：可以根据页面的逻辑动态选择不同的布局。
- **灵活性**：适合需要在运行时根据条件切换布局的场景，例如根据用户角色、设备类型或路由参数。

---

#### **使用方法**

1. **定义布局文件**  
   在 `layouts` 目录下创建多个布局文件，例如 `default.vue` 和 `admin.vue`。

   ```html
   <!-- filepath: /layouts/default.vue -->
   <template>
     <div>
       <header>Default Layout</header>
       <nuxt />
     </div>
   </template>
   ```

   ```html
   <!-- filepath: /layouts/admin.vue -->
   <template>
     <div>
       <header>Admin Layout</header>
       <nuxt />
     </div>
   </template>
   ```

2. **在页面组件中使用 `setPageLayout`**  
   在页面组件的 `setup` 函数中调用 `setPageLayout`，动态设置布局。

   ```typescript
   <!-- filepath: /pages/example.vue -->
   <script setup>
   import { useRoute, usePageLayout } from '#app';

   const route = useRoute();
   const setPageLayout = usePageLayout();

   // 根据路由参数动态设置布局
   if (route.query.layout === 'admin') {
     setPageLayout('admin');
   } else {
     setPageLayout('default');
   }
   </script>

   <template>
     <div>
       <h1>Example Page</h1>
       <p>当前布局根据路由参数动态切换。</p>
     </div>
   </template>
   ```

3. **运行效果**  
   - 如果访问 `/example?layout=admin`，页面会使用 `admin` 布局。
   - 如果访问 `/example` 或未指定 `layout` 参数，页面会使用 `default` 布局。

