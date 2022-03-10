## 什么是Render函数
render函数与template一样都是创建HTML模板的，它的参数也是个函数，即createElement;render函数的返回值是Vnode，也就是需要渲染的虚拟节点。
> 参数createElement  
 它本身也是一个函数，包括3个参数：   
    1. 一个HTML标签字符串、组件选项对象或者解析上述任何一种的一个async异步函数   {String|Object|Function}     
     通俗地讲就是**要渲染的标签名称**（必需参数）   
    2. 一个包含 模板相关属性 的 数据对象
      {Object}    
      通俗地讲就是**要渲染的标签属性**（可选参数）   
    3. 子虚拟节点（Vnode）    
      通俗地讲就是**要渲染的标签的子元素数组**（可选参数）

举个栗子   
```

<body>
    <div id="demo">
        <render-demo>
            <p slot="header">我属于header</p>
            <h2>我谁都不属于，会被放到default</h2>
            <h4>我谁都不属于，会被放到default</h4>
            <p slot="footer">我属于footer</p>
            <p slot="footer">我属于footer</p>

        </render-demo>

    </div>

    <script>
        Vue.component('render-demo', {
            render: function(createElement) {
                //通过slot获取节点内容
                var header = this.$slots.header
                var main = this.$slots.default
                var footer = this.$slots.footer
                //console.log(header)
                //console.log(main)
                //console.log(footer)
                return createElement(
                    'div', {
                        style: {
                            color: 'blue'
                        }
                    }, [
                        createElement('header', header),
                        createElement('main', main),
                        createElement('footer', footer)
                    ]
                )
            }
        })

        var app = new Vue({
            el: '#demo',
            data: {}
        })
    </script>
</body>
```
> createElement(html标签名, VNode节点数组)会编译出一个指定的html标签，然后把VNode节点数组里非空的VNode节点编译回原来的html内容。其结果就相当于把原来的那些`<render-demo>`标签之间的内容根据它们的slot属性，放进了指定的标签里。

注释掉的三行输出结果如下：   
<img>
最终渲染出的HTML结构如下：   
页面如下：
