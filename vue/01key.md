### v-for中key的作用
首先需要了解一下vue的“**就地更新**”策略   
官方给出的解释是：   
当Vue正在更新使用v-for渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。
****
一个例子：  
不使用key（同index作为key同样）
```
<template>
  <div id="app">
    <div>
      <input type="text" v-model="name" />
      <button @click="addItem">添加</button>
    </div>
    <ul>
      <li v-for="item in list" >
        <input type="checkbox" />
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      newId: 3,
      list: [
        { id: 1, name: '吃饭' },
        { id: 2, name: '睡觉' },
        { id: 3, name: '打豆豆' }
      ]
    }
  },
  methods: {
    addItem () {
      this.list.unshift({ id: ++this.newId, name: this.name })
    }
  }
}
</script>
```
添加key后
```
<template>
  <div id="app">
    <div>
      <input type="text" v-model="name" />
      <button @click="addItem">添加</button>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <input type="checkbox" />
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      newId: 3,
      list: [
        { id: 1, name: '吃饭' },
        { id: 2, name: '睡觉' },
        { id: 3, name: '打豆豆' }
      ]
    }
  },
  methods: {
    addItem () {
      this.list.unshift({ id: ++this.newId, name: this.name })
    }
  }
}
</script>
```

一般我们使用数组中不会变的那一项作为key值，如上面的例子中，我们用惟一的id来作为key。   
有时候我们也会用下标index来作为key，但是使用index作为key虽然消除了语法提示的错误，但是**使用index作为key和不使用key是一样的**，他依旧会就地更新。   
vue官网的说明：**index作为key，只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**



参考：    
https://www.cnblogs.com/youhong/p/11327062.html