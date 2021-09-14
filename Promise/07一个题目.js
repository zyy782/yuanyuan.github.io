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