#### [API文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 
+ Promise.all()  
  需要注意的是：   
  **结果数组中元素的顺序与其在源 promise 中的顺序相同。** 即使第一个 promise 花费了最长的时间才 resolve，但它仍是结果数组中的第一个。
  ```
  Promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000)) // 3
  ]).then(value => {
    console.log(value)
  }); // [ 1, 2, 3 ]当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
  
  ```
  **如果任意一个 promise 被 reject，由 Promise.all 返回的 promise 就会立即 reject，并且带有的就是这个 error。**
  ```
  // 如果出现 error，其他 promise 将被忽略
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise((resolve, reject) => {
      setTimeout(() => {
          reject(new Error("promise3出错啦"))
      }, 1000)
  });

  Promise.all([promise1, promise2, promise3]).catch((error) => {
      console.log(error);
  });
  // Error: promise3出错啦
  ```

  Promise.all **当且仅当传入的可迭代对象为空时为同步**   
如下：p中传入的可迭代对象为空，为同步，立即执行：状态为fulfilled（操作成功）   
而p2传入的可迭代对象不为空，为异步，执行到异步操作时状态才为fulfilled
  ```
    var p = Promise.all([]); 
    var p2 = Promise.all([1337, "hi"]); // non-promise values will be ignored, but the evaluation will be done asynchronously
    console.log(p);//Promise {<fulfilled>: Array(0)}
    console.log(p2)//Promise {<pending>}
    setTimeout(function() {
        console.log('the stack is now empty');
        console.log(p2);//Promise {<fulfilled>: Array(2)}
    });

  ``` 

2. [Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)