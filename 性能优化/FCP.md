FCP（First Contentful Paint，**首次内容绘制**）是衡量 **用户感知加载速度** 的关键指标，用于记录页面从开始加载到 **浏览器首次渲染任意文本、图片（包括背景图）、非空白 canvas 或 SVG 内容** 的时间点。以下是 FCP 的详细衡量内容和优化要点：

---

### 一、FCP **衡量的具体内容**
FCP 关注的是 **首次有效内容的渲染**，包括以下元素类型的首次出现：

| **元素类型**               | **示例**                                | **说明**                              |
|----------------------------|----------------------------------------|---------------------------------------|
| **文本节点**               | `<h1>标题</h1>`、`<p>段落</p>`         | 包括任何可见的 DOM 文本               |
| **图片**                   | `<img src="logo.png">`                 | 含 `<picture>` 和 SVG 中的 `<image>`  |
| **背景图片**               | `div { background-image: url(bg.jpg) }`| 需实际加载完成并渲染                  |
| **非空白 Canvas**          | `<canvas id="myCanvas"></canvas>`      | 通过 JavaScript 绘制内容后触发        |
| **SVG 矢量图形**           | `<svg><circle cx="50" cy="50" r="40"/></svg>` | 不含空 SVG 容器       |

---

### 二、FCP **不包含的内容**
以下情况 **不会** 触发 FCP：
1. **默认浏览器控件**（如地址栏、按钮）
2. **占位符或骨架屏**（如 `loading...` 文本）
3. **不可见或尺寸为 0 的元素**（如 `opacity: 0`）
4. **iframe 内容**（除非同源且同步加载）

---

### 三、FCP **的性能标准**
| **FCP 时间**       | **评级**               | **用户体验**                         |
|--------------------|------------------------|--------------------------------------|
| **≤ 1.8 秒**       | Good（优秀）           | 用户立即感知到内容加载               |
| **1.8 - 3.0 秒**   | Needs Improvement（需改进） | 加载延迟较明显                      |
| **> 3.0 秒**      | Poor（差）             | 用户可能认为页面卡死                 |

---

### 四、影响 FCP 的 **关键因素**
#### 1. **网络与服务器响应**
   - **TTFB（Time To First Byte）**：服务器响应首字节时间
   - **资源阻塞**：未优化的 CSS/JS 文件阻塞渲染

#### 2. **资源加载**
   - **关键路径资源**：阻塞渲染的 CSS、字体、脚本
   - **图片/字体预加载**：未优先加载首屏内容

#### 3. **渲染流程**
   - **DOM 复杂度**：嵌套过深的 HTML 结构
   - **同步 JavaScript**：`<script>` 标签未异步加载

---

### 五、FCP 与 LCP 的区别
| **对比项**       | **FCP**                          | **LCP**                          |
|------------------|----------------------------------|----------------------------------|
| **测量目标**     | 首次任意内容的渲染               | 视口内最大内容的渲染完成         |
| **触发时机**     | 最早的可视内容出现               | 页面主要内容稳定渲染             |
| **优化重点**     | 减少渲染阻塞资源                 | 优先加载最大内容元素             |
| **典型场景**     | 白屏阶段结束                     | 用户感知“页面已可用”             |

---

### 六、测量 FCP 的方法
#### 1. **实验室工具**
   - **Lighthouse**（Chrome DevTools）
   - **WebPageTest**
   ```bash
   # WebPageTest 命令行示例
   webpagetest test https://example.com --metrics FCP
   ```

#### 2. **真实用户监控（RUM）**
   - 使用 `web-vitals` 库：
     ```javascript
     import { getFCP } from 'web-vitals';
     getFCP(console.log); // 输出 { name: 'FCP', value: 1234 }
     ```
   - 上报到分析平台：
     ```javascript
     getFCP((metric) => {
       Sentry.captureMessage('FCP', {
         tags: { type: 'web-vital' },
         extra: { value: metric.value }
       });
     });
     ```

---

### 七、优化 FCP 的 **具体措施**
#### 1. **减少渲染阻塞资源**
   ```html
   <!-- 异步加载非关键 CSS -->
   <link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
   
   <!-- 延迟加载 JS -->
   <script src="app.js" defer></script>
   ```

#### 2. **预加载关键资源**
   ```html
   <!-- 预加载首屏字体 -->
   <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
   
   <!-- 预加载首屏图片 -->
   <link rel="preload" href="hero.jpg" as="image" imagesrcset="hero-480w.jpg 480w, hero-800w.jpg 800w">
   ```

#### 3. **服务端优化**
   - 启用 **Brotli/Gzip 压缩**
   - 使用 **HTTP/2 或 HTTP/3** 加速资源并行加载
   - 配置 **CDN 缓存** 静态资源

#### 4. **内联关键 CSS**
   ```html
   <style>
     /* 内联首屏必要样式 */
     h1 { color: #333; }
     .hero-image { width: 100%; }
   </style>
   ```

---

### 八、常见误区与验证
| **误区**                | **验证方法**                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| “FCP 只测量文本”        | 使用 `performance.getEntriesByName('first-contentful-paint')[0]` 查看触发元素 |
| “骨架屏能改善 FCP”      | 骨架屏本身不触发 FCP，需确保其包含实际内容（如文本或图片）                   |
| “FCP 越快越好”          | 需结合 LCP 评估（避免 FCP 快但 LCP 慢导致“内容闪烁”问题）                    |

---

通过优化 FCP，可以显著减少用户面对“白屏”的时间，提升早期交互体验。建议结合 **LCP** 和 **CLS** 综合优化核心 Web 指标。