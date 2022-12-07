## Vue的内置元素 \<component>
[API快车:ambulance:](https://cn.vuejs.org/api/built-in-special-elements.html#component)
##### 用途： 组件的动态渲染
##### 属性 is ：决定当前渲染的组件是哪一个  
##### :memo: 使用方法
```js
// 1.动态指定要渲染的组件
<component :is="currentComponent"></component>

import ComponentA from '....'
import ComponentB from '....'

data() {
    return {
        // 2. 当前渲染的组件
        currentComponent : 'ComponentA'
    }
}

//3.点击按钮，动态切换组件的名称
<button @click="currentComponent = 'ComponentA'">展示 ComponentA 组件</button>
<button @click="currentComponent = 'ComponentB'">展示 ComponentB 组件</button>
```
在上面的例子中，被传给 :is 的值可以是以下几种：
1. 被注册的组件名
2. 导入的组件对象

当使用 ```<component :is="..."> ```来在多个组件间作切换时，被切换掉的组件会被卸载。我们可以通过 ```<KeepAlive>``` 组件强制被切换掉的组件仍然保持“存活”的状态。


##### :rotating_light:一个应用
由父组件决定子组件动态加载哪一个孙组件
```js
// 1.子组件中动态指定要渲染的孙组件 和 组件数据
<component 
   :is="currentComponent.name"
   :data="currentComponent.data"
></component>

// 2.在子组件中引入所需全部孙组件
import Components from './components'
export default {
    name: 'sonComponent',
    components: {
        ...Components
    },
    // 3. 用于接收父组件传过来的参数
    props: {
        currentComponent: {
            type: Object,
            default: () => {}
        }
    }
}s

// 4.父组件中引入子组件，讲要渲染的孙组件传给子组件
<son-component :currentComponent="currentComponent"></son-component>

methods: {
    hadleCurrentComponent() {
        this.currentComponent = {
            name: 'ComponentA',
            data: {}
        }
    }
}



最终的结果：
<father-component>
       <son-component>
             <ComponentA>
       </son-component>
</father-component>

```