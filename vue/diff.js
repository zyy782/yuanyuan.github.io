class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }
}

// 用js对象模拟dom节点
const ul = new Element('ul', { id: 'list' }, [
  new Element('li', { class: 'item' }, ['Item 1']),
  new Element('li', { class: 'item' }, ['Item 2']),
  new Element('li', { class: 'item' }, ['Item 3']),
]);

// 根据虚拟dom构建真正的dom
Element.prototype.render = function () {
  const el = document.createElement(this.tagName); // 根据tagName构建
  const props = this.props;

  for (const propName in props) {
    // 设置节点的DOM属性
    const propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  const children = this.children || [];

  children.forEach(child => {
    const childEl =
      child instanceof Element
        ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
        : document.createTextNode(child); // 如果字符串，只构建文本节点
    el.appendChild(childEl);
  });

  return el;
};

const ulRoot = ul.render();
document.body.appendChild(ulRoot);