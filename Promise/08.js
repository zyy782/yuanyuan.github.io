setTimeout(() => { // 会立即放入宏列队
    console.log('timeout callback1()')
    Promise.resolve(3).then(
        value => { // 会立即放入微列队
            console.log('Promise onResolved3()', value)
        }
    )
}, 0)
setTimeout(() => { // 会立即放入宏列队
    console.log('timeout callback2()')
}, 0)
Promise.resolve(1).then(
    value => { // 会立即放入微列队
        console.log('Promise onResolved1()', value)
    }
)
Promise.resolve(2).then(
        value => { // 会立即放入微列队
            console.log('Promise onResolved2()', value)
        }
    )
    /***
     * Promise onResolved1() 1
       Promise onResolved2() 2
       timeout callback1()
       Promise onResolved3() 3
       timeout callback2()
     */