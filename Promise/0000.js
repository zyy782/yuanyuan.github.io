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
    var promiseChain = promiseList.reduce((prev, next) =>
        prev.then((res) => {
            if (res !== undefined)
                console.log(res);
            return next()
        }),
        Promise.resolve());

    promiseChain.then((res) => {
        console.log(res)
        console.log("所有promise执行完毕")
    })
}