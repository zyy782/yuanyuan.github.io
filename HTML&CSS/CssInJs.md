# CSS in JS

CSS in JS 是一种将 CSS 样式直接写在 JavaScript 中的技术，它允许开发者将样式与组件逻辑紧密结合，提高代码的可维护性和可读性。
---

### 核心特性：
- 样式与组件共存：样式定义在组件内部，天然支持高内聚
- 动态样式：基于 JS 逻辑动态生成 CSS（如主题切换、响应式设计）
- 自动厂商前缀：工具自动处理浏览器兼容性

### 用法
以下是一些流行的 CSS in JS 库：

#### 1. styled-components
styled-components 是一个流行的 CSS-in-JS 库，允许你使用 ES6 模板字符串来定义样式。

```javascript
import styled from 'styled-components';

const Button = styled.button`
  background-color: #1890ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }
`;

function App() {
  return <Button>点击我</Button>;
}
```

#### 2. Emotion
Emotion 是另一个强大的 CSS-in-JS 库，提供了类似的功能。

```javascript
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyle = css`
  background-color: #1890ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }
`;

function App() {
  return <button css={buttonStyle}>点击我</button>;
}
```

#### 3. JSS
JSS 是一个用于 JavaScript 的 CSS 编写工具，允许你以 JavaScript 对象的形式定义样式。

```javascript
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    backgroundColor: '#1890ff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#40a9ff',
    },
  },
});

function App() {
  const classes = useStyles();
  return <button className={classes.button}>点击我</button>;
}
```

### 优点
- **模块化**：样式与组件逻辑紧密结合，易于维护。
- **动态样式**：可以根据组件的状态或属性动态生成样式。
- **避免全局污染**：样式默认是局部的，避免了全局命名冲突。

### 缺点
- **性能**：在某些情况下，可能会影响性能，尤其是在大量动态样式的情况下。
- **学习曲线**：需要学习新的语法和工具。

CSS-in-JS 提供了一种现代化的样式管理方式，适合于需要高度动态和模块化的项目。









