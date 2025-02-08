**Webpack 打包优化** 是前端性能优化的重要环节，通过合理配置和优化 Webpack，可以显著减少打包体积、提升构建速度，并改善应用性能。以下是详细的 Webpack 打包优化方法和实践：

---

### **1. 减少打包体积**

#### **1.1 代码压缩**
- **压缩 JavaScript**：使用 `TerserPlugin` 压缩 JS 代码。
  ```javascript
  const TerserPlugin = require('terser-webpack-plugin');
  module.exports = {
      optimization: {
          minimize: true,
          minimizer: [new TerserPlugin({
            terserOptions: {
              // 压缩配置
              compress: {
                arrows: false,  // 将箭头函数转换为普通函数
                collapse_vars: true, // 变量折叠优化。变量折叠会将多个变量合并为一个，以减少代码体积。
                comparisons: true,  // 比较优化。比较优化会优化代码中的比较操作，以减少代码体积。
                computed_props: true,  // 计算属性优化。计算属性优化会优化代码中的计算属性操作，以减少代码体积。
                hoist_funs: true, // 提升函数优化。 
                hoist_props: true,  // 提升属性优化。 
                hoist_vars: true,  // 提升变量优化。 
                inline: true, // 内联优化。 
                loops: true, // 循环优化。 
                negate_iife: true, // 立即执行函数优化。 
                properties: true, // 属性优化。 
                reduce_funcs: true, // 函数减少优化。 
                reduce_vars: true, // 变量减少优化。 
                switches: true, // 开关优化。 
                toplevel: true, // 顶层优化。对顶级作用域的变量和函数进行压缩和混淆。这可以进一步减少代码的体积，但可能会影响全局变量的可访问性。
                typeofs: true, // 类型优化。 
                booleans: true, // 布尔值优化。 
                if_return: true, // 对代码中包含 if 和 return 的结构进行优化
                sequences: true, // 将多个语句合并为一个语句
                unused: true, // 移除未使用的代码
                conditionals: true, // 将条件语句转换为布尔值
                dead_code: true, // 移除死代码
                evaluate: true, // 将代码中的表达式转换为常量
                drop_console: true, //  移除所有 console 调用。
                drop_debugger: true, // 移除所有 debugger 语句。
                pure_funcs: ['console.log'] // 将 console.log 视为纯函数，即在某些情况下可以安全地移除。
              },
              mangle: {
                safari10: true // 使变量名称在Safari 10中兼容
              }
            },
            sourceMap: false, // 不生成源映射文件
            cache: true, // 启用缓存以加速构建过程
            parallel: 3, // 表示并发运行3个线程进行压缩
            extractComments: false, // 不提取注释
            exclude: [ // 以下文件不进行压缩
              'sysconfig.js',
              /static/
            ]
          })
        ],
      },
  };
  ```
- **压缩 CSS**：使用 `CssMinimizerPlugin` 压缩 CSS 代码。
  ```javascript
  const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  module.exports = {
      optimization: {
          minimizer: [new CssMinimizerPlugin()],
      },
  };
  ```

#### **1.2 Tree Shaking**
- **移除未使用的代码**：确保使用 ES6 模块语法（`import/export`），并在生产模式下启用 Tree Shaking。
  ```javascript
  module.exports = {
      mode: 'production',
      optimization: {
          usedExports: true,
      },
  };
  ```

#### **1.3 代码分割（Code Splitting）**
- **按需加载**：将代码拆分为多个 chunk，按需加载。
  ```javascript
  module.exports = {
      optimization: {
          splitChunks: {
              // 指定对哪些类型的chunks应用代码分割，可选值有 'async' (默认)、'initial' 或 'all'
              chunks: 'all',
              // 最小 chunk 大小
              minSize: 20000,
              // 最大 chunk 大小
              maxSize: 0,
              // 最小 chunk 数量
              minChunks: 1,
              // 最大异步请求数量
              maxAsyncRequests: 30,
              // 最大初始请求数量
              maxInitialRequests: 30,
              // 自动生成的 chunk 名称分隔符
              automaticNameDelimiter: '~',
              // 是否使用自动生成的 chunk 名称
              name: true,
              // 缓存组
              cacheGroups: {
                // 第三方库分离
                vendors: {
                    test: /[\\/]node_modules[\\/]/, // 匹配第三方库
                    priority: -10, // 优先级，数值越大优先级越高
                    filename: 'vendors.js', // 输出文件名
                    reuseExistingChunk: true, // 如果一个模块已经在主 chunk 里，就直接使用，不会重新生成
                },
                // 默认的第三方库分离
                defaultVendors: {
                    priority: -20,
                    test: /[\\/]node_modules[\\/]/,
                    reuseExistingChunk: true,
                },
                // 默认分离
                default: {
                    minChunks: 2, // 至少被两个chunks共享才会被打包到同一chunk
                    priority: -20,
                    reuseExistingChunk: true,
                }
              },
          },
      },
  };
  ```
> vendors: 主要用于手动配置第三方库的提取。
  defaultVendors: Webpack 5 的默认行为，自动将第三方库提取到一个单独的块中。
  default: Webpack 5 的默认行为，自动处理应用程序中共享的模块,将应用程序中多次使用的模块提取到一个共享块中，以减少重复代码。
 
- **动态导入**：使用 `import()` 动态加载模块。
  ```javascript
  import('./module.js').then(module => {
      module.run();
  });
  ```

#### **1.4 移除未使用的依赖**
- **使用 `webpack-bundle-analyzer`**：分析打包结果，找出未使用的依赖。
  ```javascript
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports = {
      plugins: [new BundleAnalyzerPlugin({
        analyzerMode: 'static', // 以静态文件形式展示分析结果 可选值有 'static' (默认)、'server' (在浏览器中展示) 或 'disabled' (禁用)
        openAnalyzer: true, // 自动打开浏览器
        reportFilename: 'report.html', // 指定报告文件名
        defaultSizes: 'gzip', // 默认展示 gzip 压缩后的文件大小
        generateStatsFile: true, // 生成 stats.json 文件
        statsFilename: 'stats.json', // 指定 stats.json 文件名
        logLevel: 'info', // 指定日志级别
      })],
  };
  ```
> webpack-bundle-analyzer 是一个 Webpack 插件，用于可视化分析打包后的文件，帮助开发者了解打包结果，找出未使用的依赖，从而进行优化。
---

### **2. 提升构建速度**

#### **2.1 使用缓存**
- **缓存 Loader 结果**：使用 `cache-loader` 缓存 loader 的处理结果。
  ```javascript
  module.exports = {
      module: {
          rules: [
              {
                  test: /\.js$/,
                  use: ['cache-loader', 'babel-loader'],
              },
          ],
      },
  };
  ```
- **持久化缓存**：使用 `hard-source-webpack-plugin` 或 Webpack 5 自带的缓存功能。
  ```javascript
  const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
  module.exports = {
      plugins: [new HardSourceWebpackPlugin()],
  };
  ```

#### **2.2 多线程构建**
- **使用 `thread-loader`**：将耗时的 loader 放到多线程中执行。
  ```javascript
  module.exports = {
      module: {
          rules: [
              {
                  test: /\.js$/,
                  use: ['thread-loader', 'babel-loader'],
              },
          ],
      },
  };
  ```

#### **2.3 减少文件搜索范围**
- **配置 `resolve`**：缩小模块查找范围。
  ```javascript
  module.exports = {
      resolve: {
          alias: {
              '@': path.resolve(__dirname, 'src'), // 配置别名，将 '@' 指向 src 目录
          },
          extensions: ['.js', '.json'], // 配置文件扩展名,这意味着在导入模块时，如果没有指定扩展名，Webpack 会依次尝试添加 .js 和 .json 来解析模块。
          modules: [path.resolve(__dirname, 'node_modules')], // 配置模块查找路径,Webpack 会从这些路径中查找模块，而不是只搜索当前目录。
      },
  };
  ```

#### **2.4 使用 DLL 插件**
- **预编译依赖**：将不常变动的库（如 React、Lodash）提前打包。
  ```javascript
  const webpack = require('webpack');
  module.exports = {
      plugins: [
          new webpack.DllReferencePlugin({
              manifest: require('./dll/vendor-manifest.json'),
          }),
      ],
  };
  ```

---

### **3. 优化开发体验**

#### **3.1 热更新（HMR）**
- **启用 HMR**：在开发模式下启用热模块替换。
  ```javascript
  module.exports = {
      devServer: {
          hot: true, // 启用热更新
      },
      plugins: [new webpack.HotModuleReplacementPlugin()], // 启用热更新插件
  };
  ```

#### **3.2 提升 DevServer 性能**
- **禁用不必要的功能**：如 `source-map` 或 `minimize`。
  ```javascript
  module.exports = {
      devServer: {
          compress: true, // 启用 gzip 压缩
          hot: true, // 启用热更新
      },
      devtool: 'eval-cheap-module-source-map', // 启用 source map
  };
  ```

---

### **4. 其他优化**

#### **4.1 使用 Webpack 5 的新特性**
- **持久化缓存**：Webpack 5 默认支持持久化缓存，显著提升构建速度。
  ```javascript
  module.exports = {
      cache: {
          type: 'filesystem',
      },
  };
  ```
- **资源模块**：直接处理图片、字体等资源，无需额外 loader。
  ```javascript
  module.exports = {
      module: {
          rules: [
              {
                  test: /\.(png|jpg|gif)$/,
                  type: 'asset/resource', // 将图片资源转换为 base64 编码
              },
          ],
      },
  };
  ```

#### **4.2 使用 CDN**
- **将静态资源上传到 CDN**：减少服务器压力，提升加载速度。
  ```javascript
  module.exports = {
      output: {
          publicPath: 'https://cdn.example.com/', // 配置公共路径
      },
  };
  ```

#### **4.3 优化 Source Map**
- **选择合适的 Source Map 类型**：在开发和生产模式下使用不同的配置。
  ```javascript
  module.exports = {
      devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-module-source-map', // 在生产模式下使用 source-map，在开发模式下使用 eval-cheap-module-source-map
  };
  ```
  > + 生产模式下使用 source-map：
  > 优点：
  > source-map 生成的 Source Map 是独立的文件，提供了完整的源代码映射。这种方式对调试生产环境中的错误非常有用，因为它提供了详细的源代码信息。
  > 缺点：
  > 生成的 Source Map 文件较大，可能会增加构建时间和文件大小。
  > + 开发模式下使用 eval-cheap-module-source-map：
  > 优点：
  > eval-cheap-module-source-map 生成的 Source Map 嵌入在打包后的文件中，构建速度快，适合开发环境。它提供了足够的源代码信息来进行调试，同时保持较快的构建速度。
  > 缺点：
  > 这种 Source Map 的精确度不如 source-map，但在开发过程中通常已经足够。

---

### **5. 示例配置**

以下是一个完整的 Webpack 优化配置示例：

```javascript
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.json'],
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['thread-loader', 'babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new HardSourceWebpackPlugin(),
    ],
    cache: {
        type: 'filesystem', // 使用文件系统缓存
    },
};
```

---

通过以上优化方法，可以显著提升 Webpack 的打包性能和构建效率，同时减少最终产物的体积。



---
## webpack-bundle-analyzer 分析打包结果
[![pEmi0dH.png](https://s21.ax1x.com/2025/02/07/pEmi0dH.png)](https://imgse.com/i/pEmi0dH)
执行 ```npm run build``` 后:
[![pEmisJI.png](https://s21.ax1x.com/2025/02/07/pEmisJI.png)](https://imgse.com/i/pEmisJI)

在这个可视化报告中，"Treemap sizes" 的选项分别代表：
1. Stat：显示打包后文件的原始大小，不进行任何压缩或处理。
2. Parsed：显示解析后的文件大小，考虑了代码的实际执行情况。
3. Gzipped：显示经过 Gzip 压缩后的文件大小，这通常是浏览器接收到的大小。

在进行优化时，通常关注 **Parsed** 和 **Gzipped** 大小：
Parsed 反映了代码在浏览器中实际执行时的大小。优化时关注这个可以帮助减少浏览器解析和执行的负担。
Gzipped 反映了传输到客户端的大小。优化这个可以减少网络传输时间，提高加载速度。
Stat 大小虽然也有参考价值，但通常不作为主要优化目标，因为它不直接影响用户体验。

根据 Parsed 显示的结果，可以看到 打包后的总大小为 6.1 MB，其中 chunk-vendors 占了 4.2 MB，是最大的部分。
chunk-vendors：这个 chunk 包含了第三方库，主要是 vue-pdf 和 element-ui。pdfjs-dist 也占据了较大空间，特别是 cmap 文件；

因此可以通过以下几个方面进行优化：

#### 1. **减少 `chunk-vendors.js` 的体积**
   - **问题**：`chunk-vendors.js` 文件体积较大（4.2 MB），通常包含第三方库。
   - **优化建议**：
     - **按需加载**：检查是否所有第三方库都是必需的，移除未使用的库。
     - **代码分割**：将较大的第三方库拆分为单独的 chunk，按需加载。
     - **使用 CDN**：将一些稳定的第三方库（如 Vue、Element-UI）通过 CDN 引入，减少打包体积。

这里通过代码分割，将 vue-pdf 和 element-ui、echarts 抽离为单独的chunk，单独打包，减少 chunk-vendors 的体积。抽离出的 chunk-ui 和 chunk-pdf ,只有在被需要时才会动态加载。
[![pEm8lPx.png](https://s21.ax1x.com/2025/02/08/pEm8lPx.png)](https://imgse.com/i/pEm8lPx)
#### 2. **优化 `chunk-common.js`**
   - **问题**：`chunk-common.js` 文件体积较大（1.25 MB），包含公共代码。
   - **优化建议**：
     - **Tree Shaking**：确保启用了 Tree Shaking，移除未使用的代码。
     - **公共代码提取**：检查是否有重复的公共代码，进一步优化提取策略。

#### 3. **优化 Worker 文件**
   - **问题**：`ff12658959df082916C2.worker.js` 文件体积较大（649.58 KB）。
   - **优化建议**：
     - **压缩 Worker 代码**：确保 Worker 代码经过压缩和优化。
     - **按需加载**：仅在需要时加载 Worker 文件。

#### 4. **优化应用代码**
   - **问题**：`app.js` 文件体积较小（3.14 KB），但可能包含未优化的代码。
   - **优化建议**：
     - **代码分割**：将应用代码按路由或功能拆分为多个 chunk，实现按需加载。
     - **移除未使用的代码**：检查并移除未使用的代码和依赖。

#### 5. **优化 404 页面**
   - **问题**：`404.js` 文件体积较小（1.34 KB），但可以进一步优化。
   - **优化建议**：
     - **延迟加载**：将 404 页面设置为延迟加载，减少初始加载时间。

#### 6. **优化较小的 chunk**
   - **问题**：`chunk-260aea8b.js` 和 `chunk-260b2136.js` 文件体积较小（约 560 B）。
   - **优化建议**：
     - **合并较小的 chunk**：如果这些 chunk 体积较小，可以考虑合并到其他 chunk 中，减少 HTTP 请求数量。

### 7. **使用 Gzip/Brotli 压缩**
   - **问题**：所有文件体积较大。
   - **优化建议**：
     - **启用 Gzip/Brotli 压缩**：在服务器端启用 Gzip 或 Brotli 压缩，减少传输体积。

#### 8. **分析 `node_modules` 依赖**
   - **问题**：`node_modules` 中包含大量依赖。
   - **优化建议**：
     - **移除未使用的依赖**：使用工具（如 `depcheck`）检查并移除未使用的依赖。
     - **优化依赖版本**：确保使用的依赖版本是最新的，避免包含不必要的代码。

#### 9. **使用 Webpack 插件**
   - **问题**：打包体积较大。
   - **优化建议**：
     - **使用 `CompressionPlugin`**：在 Webpack 中启用 Gzip/Brotli 压缩。
     - **使用 `TerserPlugin`**：进一步压缩 JavaScript 代码。

#### 10. **持续监控和优化**
   - **问题**：打包体积和性能需要持续优化。
   - **优化建议**：
     - **定期分析打包结果**：使用 `webpack-bundle-analyzer` 定期分析打包结果，持续优化。
     - **性能监控**：使用工具（如 Lighthouse）监控页面性能，发现并解决性能瓶颈。

通过以上优化措施，可以有效减少打包体积，提升应用性能。