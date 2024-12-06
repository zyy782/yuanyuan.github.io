### 实现手写 call
[call的作用与使用](./07改变this指向的几种方法.md)
实现手写call的几个关键点：
1. call的第一个参数是上下文对象，如果传入的是null或undefined，则使用全局对象
2. call的第二个参数是调用call的函数的参数，这些参数将作为调用call的函数的参数
3. 运行调用call的函数，并返回其结果
4. 函数内部的 this 指向的是 调用该函数的对象
```
function getGlobal() {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw new Error('无法找到全局对象')
}
Function.prototype.myCall = function (context, ...args) {
  // 如果没有传入上下文，默认为全局对象（在浏览器中是 window）
  context = context || getGlobal()
  // 因为是在 Function 的原型链 上添加方法，为了 避免 其余 函数对象 的属性名 与 该方法的属性名 冲突，所以需要创建一个唯一的属性名
  const fnSymbol = Symbol()
  // context[fnSymbol] = this
  Object.defineProperty(context, fnSymbol, {
    enumerable: false,
    value: this
  })
  const result = context[fnSymbol](...args)
  delete context[fnSymbol]
  return result
}
```
> **为什么 用 Object.defineProperty 来定义属性，而不是直接赋值？**
> 因为如果直接赋值，context 对象的属性会变成可枚举的，这样在打印 context 对象时，JavaScript 引擎会显示所有属性，包括 Symbol 属性,与原生 call 方法的行为不一致。(demo1)
> 为了与原生 call 方法的行为一致，myCall 的实现中使用了 Object.defineProperty 来确保 Symbol 属性是不可枚举的，这样在大多数情况下不会影响 context 对象的其他属性。  
> :smiling_imp:**demo1** **-**  ```context[fnSymbol] = this``` 直接复制:
> ```
> function greet (greeting, punctuation) {
>    console.log(this)
>  }
>  const person = { name: 'Alice' }
>  greet.myCall(person)  // { name: 'Alice', [Symbol()]: [Function: greet] }
>  greet.call(person) // { name: 'Alice' }
> ```
### 实现手写 apply
```
Function.prototype.myApply = function(context, argArr) {
  context = context || getGlobal()
  const key = Symbol()
  Object.defineProperty(context, key, {
    enumerable: false,
    value: this
  })
  let res = context[key](...argArr)
  delete context[key]
  return res
}
```

### 实现手写 bind
bind 方法用于创建一个新的函数，并绑定该函数在调用时的 this ，同时可以给这个函数传参
```
function myBind(context, ...args) {
    let fn = this
    return function(...newArgs) {
        return fn.apply(context, [...args, ...newArgs]);
    };
}
```