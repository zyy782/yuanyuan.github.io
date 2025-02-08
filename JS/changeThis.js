// 实现手写call
function getGlobal() {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw new Error('无法找到全局对象')
}

/**
 * 
 * 实现手写call，首先明确 入参包括：
 *   1. 调用myCall的函数 的 this指向的上下文对象
 *      如果 传入了 context，则使用传入的 context
 *      如果 没有传入 context，则使用全局对象
 *   2. 调用myCall的函数 的 参数
 *      这些参数将作为调用myCall的函数的参数
 * 
 * 然后，我们要实现 运行这个调用 myCall 的函数，并返回其结果
 *    myCall 内部的 this 就是调用 myCall 的函数，
 *    但是如果直接执行 this(...args)，this 指向的是全局对象，而不是 context
 *    所以，我们需要 将 this 用唯一的key 附加到 context 上，然后 运行 context[key](...args)
 *    最后，删除 context 上临时的属性
 * 得到以下的版本：
 */

// Function.prototype.myCall：在 Function 的原型上定义一个新的方法 myCall，这意味着所有函数都可以使用这个方法。
Function.prototype.myCall = function (context, ...args) {
  // 如果没有传入上下文，默认为全局对象（在浏览器中是 window）
  // context = context || globalThis
  context = context || getGlobal()
  // 因为是在 Function 的原型链 上添加方法，为了 避免 其余 函数对象 的属性名 与 该方法的属性名 冲突，所以需要创建一个唯一的属性名
  const fnSymbol = Symbol()
  context[fnSymbol] = this
  const result = context[fnSymbol](...args)
  delete context[fnSymbol]
  return result
}
// 示例使用
function greet (greeting, punctuation) {
  console.log(this)
}

const person = { name: 'Alice' }

// greet 函数调用时，this 指向 person 对象
greet.myCall(person)  // { name: 'Alice', [Symbol()]: [Function: greet] }

greet.call(person) // { name: 'Alice' }


/**
 * 当我们运行 greet.myCall(person, 'Hello', '!') 和 greet.call(person, 'Hello', '!') 时，
 * 发现 greet 函数内部打印的 this 有所不同：
 *   调用 myCall 打印的是 { name: 'Alice', [Symbol()]: [Function: greet] }
 *   调用 call 打印的是{ name: 'Alice' }
 *
 * 为保证和 call 的行为一致， 我们不能通过 context[fnSymbol] = this 直接赋值 
 */

