### 透传attribute
##### 1. 啥是透传？
透传attribute就是将一个组件的==未被声明为== **props** 或 **emits** 的 属性 或者 **v-on** 监听的事件 传给另一个组件。
##### 2.举个例子
当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上   

```js
// 子组件 myComponent.vue:
<template>
    <div class="box">
        <button>click</button>
    </div>
</template>
```
```js
// 父组件中添加自定义属性 father
<myComponent class="father" father="father"></myComponent>
```
由于子组件的根组件是class为box的div，此时father属性会被透传到根组件上，最终的渲染结果如下：

```js
<div class="box father" father="father">
     <button>click</button>
</div>
```
##### 3.不想透传怎么办？
如果想要阻止这种透传，可以在组件选项中设置 ```inheritAttrs: false```, 另外 透传过来的属性可以用 $attrs 访问。

```
// 子组件 myComponent.vue:
<template>
    <div class="box">
        <button>click</button>
    </div>
</template>

<script>
export default {
    name: 'myComponent',
    inheritAttrs: false,
    created() {
        console.log(this.$attrs)  // {father: 'father'}
    },
}
</script>
```
那么最终的渲染结果就会变为
```js
<div class="box father">
     <button>click</button>
</div>
```  
##### 4.透传用于组件通信
> v-on="\$listeners" 用于从下往上传，比如 子传父
> v-bind="\$attrs" 用于从上往下传， 比如 父传子
> 
> 这两个常用于多组件传值，以```<A> <B> <C></C> </B> </A>``` 为例：
> + A->B->C , 则可以借助中间组件，在 B 中的C组件标签中设置 v-bind="$attrs"，在C组件中用props接受来自A的信息。
> + C->B->A , 在C组件中将要传递的信息，emit出去，借助中间组件 B ，在 B 中的C组件标签中设置 v-on="$listeners"，在A组件中用C转递的方法拿到来自C的信息。
> 

###### ==父组件传值给孙组件 v-bind="$attrs"==
1. 父组件 A
   ```
   <componentA class="father" father="父组件给孙组件的信息"></componentA>
   ```
2. 子组件
   ```
   <componentB  v-bind="$attrs"></componentB>
   ```
3. 孙组件
   ```
   <template>
     <h1>{{father}}</h1>
     <!-- 父组件给孙组件的信息 -->
   </template>

   <script>
   export default {

   props: {
       father: String 
     }
   }
   </script>
   ```
##### ==孙组件传值给父组件 v-on="$listeners"==
1. 孙组件 C
   ```
   <h3 @click="grandClick">点击孙组件</h3>

   methods:{
     grandClick () {
        this.$emit('grandMsg','我是孙子组件的信息')
    }
   }
   ```
2. 子组件 B
   ```
   <componentC v-on="$listeners"></componentC>
   ```
3. 父组件 A
   ```
   <componentB @grandMsg="fathergetMsg"></componentB>

   methods: {
    fathergetMsg(msg) {
        console.log(msg) // 我是孙子组件的信息
     }
   }
   ```

##### 5.总结一下⑧
透传在封装基础组件时可以发挥很大的作用，比如对element UI的组件进行二次封装时，一个组件拥有的参数很多，如果用props或者emit会很繁琐，用透传进行传参就会显得更加简洁、易于维护。
<img src="https://img-blog.csdnimg.cn/img_convert/c191a7838ff3cac55557a5bd9752a74c.png"/>
[参考：:heart_decoration:	](https://blog.csdn.net/qq_39933787/article/details/122346772)