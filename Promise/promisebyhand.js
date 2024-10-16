// let promise = new Promise((resolve, reject) => {
//   resolve('success')
// })

class MyPromise1 {
  // this._status 和 this._result 改为私有属性
  #status = 'pending'
  #result = undefined
  constructor(executor) {
    // this._status = 'pending'
    // this._result = undefined
    const resolve = (data) => {
      // resolve 方法只能由pending状态变为fulfilled状态，且状态一旦改变，就不会再改变
      if (this.#status !== 'pending') return
      this.#status = 'fulfilled'
      this.#result = data
    }
    const reject = (reason) => {
      // reject 方法只能由pending状态变为rejected状态，且状态一旦改变，就不会再改变
      if (this.#status !== 'pending') return
      this.#status = 'rejected'
      this.#result = reason
    }

    executor(resolve, reject)
  }
}

// 进一步优化，把resolve和reject方法的重复逻辑提取到类的私有方法中
class MyPromise2 {
  #status = 'pending'
  #result = undefined
  #changeStatus(state, result) {
    if (this.#status !== 'pending') return
    this.#status = state
    this.#result = result
  }
  constructor(executor) {
    const resolve = (data) => {
      this.#changeStatus('fulfilled', data)
    }
    const reject = (reason) => {
      this.#changeStatus('rejected', reason)
    }
    executor(resolve, reject)
  }
}

// 优化：用常量定义状态，便于维护
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise3 {
  #status = PENDING
  #result = undefined
  #changeStatus(state, result) {
    if (this.#status !== PENDING) return
    this.#status = state
    this.#result = result
  }
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

  // then
  then(onFulfilled, onRejected) {
    return new MyPromise3((resolve, reject) => {
      if (this.#status === FULFILLED) {
        onFulfilled(this.#result)
      }
      if (this.#status === REJECTED) {
        onRejected(this.#result)
      }
    })
  }
}

let p1 = new MyPromise3((resolve, reject) => {
  resolve('success')
})

let p2 = new MyPromise3((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

p1.then(
  (data) => {
    console.log('p1成功', data)
  },
  (reason) => {
    console.log('p1失败', reason)
  }
)

p2.then(
  (data) => {
    console.log('p2成功', data)
  },
  (reason) => {
    console.log('p2失败', reason)
  }
)
console.log(p1, p2) // p1成功 success

// 进一步优化,解决then不能处理异步的问题
class MyPromise4 {
  #status = PENDING
  #result = undefined
  #changeStatus(state, result) {
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

  #run() {
    if (this.#status === PENDING) return
    while (this.#handlePromise.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlePromise.shift()
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
    return new MyPromise4((resolve, reject) => {
      this.#handlePromise.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      })
      this.#run()
    })
  }
}

let p3 = new MyPromise4((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

p3.then(
  (data) => {
    console.log('p3成功11111', data)
  },
  (reason) => {
    console.log('p3失败11111', reason)
  }
)

p3.then(
  (data) => {
    console.log('p3成功22222', data)
  },
  (reason) => {
    console.log('p3失败22222', reason)
  }
)

console.log(p3) // p3成功11111 success    p3成功22222 success

// 使用Promise来实现图片的异步加载。Promise是一种表示异步操作可能完成（或失败）的对象。

// loadImage 函数用于异步加载图片
function loadImage(url) {
  // 返回一个新的 Promise 对象
  return new Promise((resolve, reject) => {
    // 创建一个新的 Image 对象
    let img = new Image()

    // 设置图片加载成功的回调函数
    img.onload = () => {
      // 当图片成功加载时，调用 resolve 并传入 img 对象
      resolve(img)
    }

    // 设置图片加载失败的回调函数
    img.onerror = (error) => {
      // 当图片加载失败时，调用 reject 并传入错误信息
      reject(error)
    }

    // 设置图片的 src 属性，开始加载图片
    img.src = url
  })
}
// 使用方式
loadImage('../pictures/02.png')
  .then((img) => {
    document.body.appendChild(img)
    console.log('图片加载成功')
  })
  .catch((error) => {
    console.error('图片加载失败', error)
  })
