
1. async 函数  
函数的返回值为promise对象
promise对象的结果由async函数执行的返回值决定
2. await 表达式    
await右侧的表达式一般为promise对象, 但也可以是其它的值    
如果表达式是promise对象, await返回的是promise成功的值    
如果表达式是其它值, 直接将此值作为await的返回值    
3. 注意:   
await必须写在async函数中, 但async函数中可以没有await    
如果await的promise失败了, 就会抛出异常, 需要通过try...catch来捕获处理   

### [async函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)
async和await关键字让我们可以用一种更简洁的方式写出基于Promise的异步行为，而无需刻意地链式调用promise   
async function 关键字用来在表达式中定义异步函数。当然，也可以用 异步函数语句 来定义。


### [await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)
await  操作符用于等待一个Promise 对象。它只能在异步函数 async function 中使用。   
```
[返回值] = await 表达式;
```