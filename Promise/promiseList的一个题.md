#### 题目描述
```
const promise1 = () => Promise.resolve(1);

const promise2 = () =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(2)
        }, 1000)
    });

const promise3 = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(3)
    }, 1000)
});

const promiseList = [promise1, promise2, promise3];


function promiseChain(promiseList) {
    // 要求在这里写一段代码  实现输出 1 2 3 所有promise执行完毕
    ....
}
promiseChain(promiseList).then(() => {
    console.log("所有promise执行完毕")
})
```

刚开始我用了[for循环遍历的方法](test.html)来解决，但是for循环无法保证调用的顺序，会里脊输出所有的结果   

使用递归的方法来保证promiseList里的执行顺序，如下：
```
function promiseChain(promiseList) {
    // 要求在这里写一段代码  实现输出 1 2 3 所有promise执行完毕
    return new Promise((resolve, reject) => {
        let i = 0

        function step() {
            if (i === promiseList.length) {
                return resolve()
            }
            promiseList[i]().then(
                value => {
                    console.log(value)
                    i++
                    step()
                },
                err => reject(err)
            )
        }
        try {
            step()
        } catch (err) {
            return reject(err)
        }
    })
}
```
[完整代码](07一个题目.js)
