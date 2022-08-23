
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
<br>
<br>
<hr>
简单理解， async 就是用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。  

关于await的理解：   
Promise是立即执行的，返回一个Promise对象，并且绝对不会阻塞后面的语句。
await的作用就是等待一个async函数完成，等待的是一个表达式，这个表达式的计算结果一般是Promise或其他值    所以它实际上等待的是一个返回值      
如下面的代码，
```
var x = await resolveAfter2Seconds(10);若去掉await
输出结果将变为Promise {<pending>}    
所以说，await等到的是返回值，也就是then里的结果
```

如果想下面的代码一样，等待到的是一个值，await的远算结果就是这个值   
但是如果像f1()里面一样，**等待到的是Promise对象，await就会阻塞后面的代码，直到等到Promise执行完成**，然后得到resolve的值并把它作为await的运算结果。    
这也是await必须在async函数中用的原因，因为async函数调用不会造成阻塞，它内部的所有阻塞都被封装在一个Promise对象中异步执行。


```
    function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(x);
            }, 2000);
        });
    }

    async function f1() {
        // await 将等待 Promise 正常处理完成并返回其处理结果
        var x = await resolveAfter2Seconds(10);
        console.log(x); // 2秒后 打印10
    }
    f1();

    async function f2() {
        var y = await 20;
        console.log(y); //立即输出 20
    }
    f2();
```   

#### async/await的优势：处理then链
Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它    
单一的 Promise 链并不能发现 async/await 的优势，但是，如果需要处理由多个 Promise 组成的 then 链的时候优势就体现出来了：  
1. 使用async/await会让代码更加清晰  
   ```
           /**
         * 传入参数 n，表示这个函数执行的时间（毫秒）
         * 执行的结果是 n + 200，这个值将用于下一步骤
         */
        function takeLongTime(n) {
            return new Promise(resolve => {
                setTimeout(() => resolve(n + 200), n);
            });
        }

        function step1(n) {
            console.log(`step1 with ${n}`);
            return takeLongTime(n);
        }

        function step2(n) {
            console.log(`step2 with ${n}`);
            return takeLongTime(n);
        }

        function step3(n) {
            console.log(`step3 with ${n}`);
            return takeLongTime(n);
        }


        // function doIt() {
        //     console.time("doIt"); //对function doIt()执行 计时开始
        //     const time1 = 300;
        //     step1(time1)
        //         .then(time2 => step2(time2))
        //         .then(time3 => step3(time3))
        //         .then(result => {
        //             console.log(`result is ${result}`);
        //             console.timeEnd("doIt"); //计时结束  输出：doIt: 1520.115234375 ms
        //         });
        // }
        // doIt();

        async function doIt() {
            console.time('doIt')
            const time1 = 300;
            const time2 = await step1(time1)
            const time3 = await step2(time2)
            const result = await step3(time3)
            console.log(`result is ${result}`)
            console.timeEnd('doIt')
        }
        doIt();
   ```
2. 解决Promise传参麻烦的问题   
[案例](03.html)