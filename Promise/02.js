const p = new Promise((resolve, reject) => {
    console.log("执行器excutor")
    setTimeout(() => {
        const time = Date.now()
        if (time % 2 == 0) {
            resolve(' 成功的数据:time=' + time) //成功, 调用 resolve(value)
        } else {
            reject(' 失败的数据:time=' + time) //失败, 调用 reject(reason)
        }
    }, 1000)
})

console.log("异步任务之后的代码")

p.then(value => { //onResolved
    console.log("成功的回调" + value)
}, reason => { //onRejected
    console.log("失败的回调" + reason)
}).catch(reason => {
    console.log("接收到失败的reason数据" + reason)
})



// 执行器excutor
// 异步任务之后的代码
// 失败的回调 失败的数据:time=1631166686875
// let show = true
// function  func1(val1,val2) {
//     return new Promise((resolve,reject) => {
//         if(val1 === val2){
//             resolve(1)
//         }else {
//             reject()
//         }
//     })
// }
// console.log(func1(1,1))
