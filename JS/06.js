// function clone(obj) {
//     var _obj = JSON.stringify(obj),
//         objClone = JSON.parse(_obj);
//     return objClone;
// }

function clone(obj) {
  if (typeof obj == 'object') {
    let cloneObj = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      cloneObj[key] = clone(obj[key])
    }
    return cloneObj
  } else {
    return obj
  }
}

const res = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  sayhi() {
    console.log('hi')
  },
}
console.log(clone(res))

// 下面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况
const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  // field5: target.field1
}
target.field5 = target

// console.log(clone(target)) // 报错信息： Maximum call stack size exceeded

/**
 * 解决循环引用
 * 额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，
 * 当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，
 * 如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。
 */

function clone2(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return target
    }
    map.set(target, cloneTarget)
    for (let key in target) {
      cloneTarget[key] = clone2(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}
console.log(clone2(target))
/**
 * {
  field1: 1,
  field2: undefined,
  field3: { child: 'child' },
  field4: [ 2, 4, 8 ],
  sayhi: [Function: sayhi]
}
{
  field1: 1,
  field2: undefined,
  field3: { child: 'child' },
  field4: [ 2, 4, 8 ],
  field5: <ref *1> {
    field1: 1,
    field2: undefined,
    field3: { child: 'child' },
    field4: [ 2, 4, 8 ],
    field5: [Circular *1]
  }
}
 */

/**
 * target属性，变为了一个 Circular类型，即循环应用的意思。
 * 解决方法：用 WeakMap 代替 Map
 * WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
 * 弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。
 */

function clone3(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return target
    }
    map.set(target, cloneTarget)
    for (let key in target) {
      cloneTarget[key] = clone3(target[key], map)
    }
    return cloneTarget
  } else {
    return target
  }
}
console.log(clone3(target))

const unip = (arr) => {
  let res = new Set(arr)
  return Array.from(res)
}
let arr = [1, 1, 2, 3, 4, 4]
console.log(unip(arr))

const obj = {}
const list = [] //放去重后的数组
const arrs = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 2 }, { id: 1 }]
arrs.forEach((item) => {
  if (obj[item.id]) {
    return
  } else {
    list.push(item)
    obj[item.id] = true
  }
})
console.log(list)

