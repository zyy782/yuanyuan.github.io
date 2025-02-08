**优化 CSS 和 JS** 是前端性能优化中的关键步骤，因为它们是页面渲染和交互的核心资源。以下是详细的优化方法和实践：

---

### **1. 优化 CSS**

#### **1.1 减少 CSS 文件大小**
- **压缩 CSS**：使用工具（如 [CSSNano](https://cssnano.co/)）去除空格、注释和无效代码。
  ```bash
  cssnano input.css output.min.css
  ```
- **删除未使用的 CSS**：使用工具（如 [PurgeCSS](https://purgecss.com/)）移除未使用的 CSS 代码。
  ```javascript
  const purgecss = require('@fullhuman/purgecss');
  purgecss({
      content: ['**/*.html'],
      css: ['**/*.css']
  });
  ```

#### **1.2 避免阻塞渲染**
- **将 CSS 放在 `<head>` 中**：确保浏览器尽早加载 CSS，避免页面闪烁（FOUC）。
  ```html
  <head>
      <link rel="stylesheet" href="styles.css">
  </head>
  ```
- **内联关键 CSS**：将首屏所需的关键 CSS 直接内联到 HTML 中，减少渲染阻塞。
  ```html
  <style>
      /* 关键 CSS */
      body { font-family: Arial, sans-serif; }
  </style>
  ```

#### **1.3 优化 CSS 选择器**
- **避免深层嵌套**：减少选择器的复杂度，提高渲染性能。
  ```css
  /* 不推荐 */
  div ul li a { color: red; }

  /* 推荐 */
  .link { color: red; }
  ```
- **避免通用选择器**：通用选择器（如 `*`）会匹配所有元素，影响性能。
  ```css
  /* 不推荐 */
  * { margin: 0; padding: 0; }

  /* 推荐 */
  body, h1, p { margin: 0; padding: 0; }
  ```

#### **1.4 使用 CSS 动画**
- **优先使用 `transform` 和 `opacity`**：这些属性不会触发重排和重绘，性能更高。
  ```css
  .box {
      transform: translateX(100px);
      opacity: 0.5;
  }
  ```
- **避免使用 `@keyframes` 和 `left/top`**：这些属性会触发重排，性能较差。

#### **1.5 使用媒体查询**
- **按需加载 CSS**：通过媒体查询加载特定设备所需的 CSS。
  ```html
  <link rel="stylesheet" href="mobile.css" media="(max-width: 600px)">
  <link rel="stylesheet" href="desktop.css" media="(min-width: 601px)">
  ```

---

### **2. 优化 JavaScript**

#### **2.1 减少 JS 文件大小**
- **压缩 JS**：使用工具（如 [Terser](https://github.com/terser/terser)）去除空格、注释和无效代码。
  ```bash
  terser input.js -o output.min.js -c -m
  ```
- **Tree Shaking**：移除未使用的代码（适用于 ES6 模块）。
  ```javascript
  // Webpack 配置
  module.exports = {
      mode: 'production',
      optimization: {
          usedExports: true,
      },
  };
  ```

#### **2.2 避免阻塞渲染**
- **将 JS 放在 `<body>` 末尾**：确保 HTML 和 CSS 先加载，避免阻塞页面渲染。
  ```html
  <body>
      <!-- 页面内容 -->
      <script src="script.js"></script>
  </body>
  ```
- **使用 `async` 或 `defer`**：异步加载 JS 文件，避免阻塞 HTML 解析。
  ```html
  <!-- async：加载完成后立即执行 -->
  <script src="script.js" async></script>

  <!-- defer：HTML 解析完成后执行 -->
  <script src="script.js" defer></script>
  ```

#### **2.3 减少 DOM 操作**
- **缓存 DOM 查询结果**：避免重复查找 DOM 元素。
  ```javascript
  // 不推荐
  for (let i = 0; i < 100; i++) {
      document.querySelector('.element').style.color = 'red';
  }

  // 推荐
  const element = document.querySelector('.element');
  for (let i = 0; i < 100; i++) {
      element.style.color = 'red';
  }
  ```
- **批量更新 DOM**：使用文档片段（`DocumentFragment`）或虚拟 DOM 批量更新。
  ```javascript
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 100; i++) {
      const div = document.createElement('div');
      fragment.appendChild(div);
  }
  document.body.appendChild(fragment);
  ```

#### **2.4 使用事件委托**
- **减少事件监听器数量**：将事件监听器绑定到父元素，通过事件冒泡处理子元素事件。
  ```javascript
  // 不推荐
  document.querySelectorAll('.item').forEach(item => {
      item.addEventListener('click', handleClick);
  });

  // 推荐
  document.querySelector('.container').addEventListener('click', event => {
      if (event.target.classList.contains('item')) {
          handleClick(event);
      }
  });
  ```

#### **2.5 使用 Web Workers**
- **将耗时任务放到后台线程**：避免阻塞主线程。
  ```javascript
  // main.js
  const worker = new Worker('worker.js');
  worker.postMessage('start');
  worker.onmessage = event => {
      console.log('Result:', event.data);
  };

  // worker.js
  self.onmessage = event => {
      const result = heavyCalculation();
      self.postMessage(result);
  };
  ```

#### **2.6 使用代码分割**
- **按需加载 JS**：将代码拆分为多个文件，按需加载。
  ```javascript
  // 动态导入
  import('./module.js').then(module => {
      module.run();
  });
  ```

---

### **3. 工具和最佳实践**

#### **3.1 使用构建工具**
- **Webpack**：支持代码压缩、Tree Shaking、代码分割等功能。
- **Vite**：默认支持 ES 模块和按需加载。

#### **3.2 性能监控**
- **Lighthouse**：分析页面性能并提供优化建议。
- **WebPageTest**：测试页面加载速度和水位线。

#### **3.3 持续优化**
- **定期分析性能**：使用工具监控关键指标（如 FCP、TTI）。
- **A/B 测试**：测试不同优化策略的效果。

---

通过以上方法，可以显著优化 CSS 和 JS 的性能，提升页面加载速度和用户体验。