const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  #status = PENDING
  #result = undefined
  #changeStatus (state, result) {
    if (this.#status !== PENDING) return
    this.#status = state
    this.#result = result
    this.#run()
  }

  #handlePromise = []
  constructor(executor) {
    const resolve = (data) => {
      this.#changeStatus(FULFILLED, data)
    }
    const reject = (reason) => {
      this.#changeStatus(REJECTED, reason)
    }
    // try catch 只能捕获同步异常, 如果executor内部是异步代码，则无法捕获
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  #run () {
    if (this.#status === PENDING) return
    while (this.#handlePromise.length) {
      const { onFulfilled, onRejected, resolve, reject } = this.#handlePromise.shift()
      if (this.#status === FULFILLED) {
        if (typeof onFulfilled === 'function') {
          try {
            const result = onFulfilled(this.#result)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        } else {
          resolve(this.#result)
        }
      } else {
        if (typeof onRejected === 'function') {
          try {
            const result = onRejected(this.#result)
            reject(result)
          } catch (error) {
            reject(error)
          }
        } else {
          reject(this.#result)
        }
      }
    }
  }
   // then
   then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlePromise.push({
        onFulfilled,
        onRejected,
        resolve,
        reject
      })
      this.#run()
    })
  }
}

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000);
})

let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000);
})

p1.then((data) => {
  console.log('p1成功', data)
}, (reason) => {
  console.log('p1失败', reason)
}).then((data, reason) => {
  console.log('p1', data, reason)
})

p2.then((data) => {
  console.log('p2成功', data)
}, (reason) => {
  console.log('p2失败', reason)
}).then((data, reason) => {
  console.log('p2', data, reason)
})

console.log(p1,'----',p2)