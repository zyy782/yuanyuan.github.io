# CSS Modules

CSS Modules 是一种**本地化 CSS 类名**的技术，通过构建工具（如 Webpack、Vite）自动将 CSS 类名转换为唯一哈希值，解决全局样式污染问题。  
**核心特性**：
- **类名局部作用域**：每个组件的 CSS 类名独立，避免命名冲突
- **显式依赖管理**：通过 `import` 引入样式，确保样式与组件强关联
- **支持预处理器**：可与 Sass/Less/Stylus 结合使用

---

### **2. 使用场景**
| **场景**                | **传统 CSS 痛点**          | **CSS Modules 解决方案**            |
|-------------------------|---------------------------|------------------------------------|
| 大型项目样式冲突         | 全局类名污染              | 自动生成唯一类名（如 `.button_1x2y3`） |
| 组件化开发              | 样式与组件分离困难        | 样式文件与组件文件一一对应          |
| 动态类名控制            | 手动拼接类名易出错        | 通过 `styles[className]` 动态获取哈希类名 |

---

### **3. 配置与使用**
#### **基础配置（以 Webpack 为例）**
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]' // 自定义类名格式
              }
            }
          }
        ]
      }
    ]
  }
}
```


#### **Vue 单文件组件**
```vue
<template>
  <button :class="$style.primaryButton">Click Me</button>
</template>

<style module>
.primaryButton {
  padding: 8px 16px;
  background: #007bff;
}
</style>
```

---

### **4. 最佳实践**
1. **文件命名规范**  
   - 使用 `.module.css` 后缀明确模块化样式文件
   - 示例：`Header.module.css`、`Button.module.scss`

2. **类名管理技巧**  
   ```javascript
   // 多类名组合
   const classNames = `${styles.button} ${styles.isActive ? styles.active : ''}`;

   // 使用第三方库（classnames）
   import cn from 'classnames';
   const className = cn(styles.button, { [styles.active]: isActive });
   ```

3. **全局样式覆盖**  
   ```css
   /* 使用 :global 定义全局样式 */
   :global(.ant-modal) {
     z-index: 1000;
   }
   ```

---

### **5. 与其他方案对比**
| **方案**        | **作用域** | **可维护性** | **动态样式** | **学习成本** |
|-----------------|-----------|-------------|-------------|-------------|
| CSS Modules     | 局部      | 高          | 中等        | 低          |
| CSS-in-JS       | 局部      | 高          | 强          | 中          |
| BEM 命名规范    | 人工维护  | 中          | 弱          | 中          |
| Shadow DOM      | 严格隔离  | 低          | 弱          | 高          |

---

### **6. 常见问题**
**Q：如何与第三方 UI 库样式兼容？**  
A：使用 `:global` 包裹第三方库的类名：
```css
:global(.ant-btn) {
  margin-left: 8px;
}
```

**Q：如何共享变量？**  
A：通过预处理器变量 + `:export` 语法：
> :export 语法用于在 CSS Modules 中导出变量，使其可以在 JavaScript 中使用。通常与预处理器（如 Sass、Less）结合使用，以便在样式文件中定义变量，然后在 JavaScript 中引用这些变量。
```scss
// variables.module.scss
$primary-color: #1890ff;

:export {
  primaryColor: $primary-color;
}

// React 组件
import variables from './variables.module.scss';
console.log(variables.primaryColor); // #1890ff
```

**Q：是否支持 TypeScript 类型提示？**  
A：使用 `typed-css-modules` 自动生成 `.d.ts` 文件：
```bash
npm install -D typed-css-modules
# 监听文件变化
tcm -w src/**/*.module.css
```
---

### **7. 优点与缺点**
优点：
- 自动生成唯一类名，彻底避免冲突
- 天然适配组件化开发（React/Vue）
- 支持预处理器（Sass/Less）

缺点：
- 需要构建工具支持（Webpack/Vite）
- 动态类名需依赖 classnames 库