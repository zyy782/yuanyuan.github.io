new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("执行任务1(异步)")
        resolve(1)
    }, 1000);
}).then(
    value => {
        console.log('任务1的结果: ', value)
        console.log('执行任务2(同步)')
        return 2
    }
).then(
    value => {
        console.log('任务2的结果:', value)

        return new Promise((resolve, reject) => {
            // 启动任务3(异步)
            setTimeout(() => {
                console.log('执行任务3(异步))')
                resolve(3)
            }, 1000);
        })
    }
).then(
    value => {
        console.log('任务3的结果: ', value)
    }
)


// 执行任务1(异步)
// 任务1的结果:  1
// 执行任务2(同步)
// 任务2的结果: 2
// 执行任务3(异步))
// 任务3的结果:  3