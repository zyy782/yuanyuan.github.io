// Map

// let m1 = new Map([
//     ['key1','value1'],
//     ['key2','value2'],
// ])
let m1 = new Map({
    [Symbol.iterator]: function* () {
        yield ['key1','value1'],
        yield ['key2','value2']
    }
})
console.log(m1.size) // 2
m1.set('key3','value3')
console.log(m1.size,m1.has('key3'),m1.get('key3')) // 3 true value3
m1.delete('key1')
console.log(m1.size) // 2
m1.forEach((k,v) => console.log(k,'--',v))
m1.clear()
console.log(m1.size) // 0

let func1 = function() {
    console.log('111')
}
let func2 = function() {
    console.log('222')
}

let m2 = new Map([
    [func1,'func1'],
    [func2,'func2']
])
console.log(m2.get(func1))

// WeakMap 弱映射--->  不会阻止垃圾回收    不可迭代
let k1 = {id: 1}
let k2 = {id: 2}
let k3 = {id: 3}
let wmap = new WeakMap([
    [k1, "val1"],
    [k2, "val2"],
    [k3, "val3"]
])
console.log(wmap.get(k1))

// values是默认迭代器
let set1 = new Set([1,4,2,5])
console.log(set1.values === set1[Symbol.iterator]) // true
console.log([...set1]) // [ 1, 4, 2, 5 ]
for(let k of set1.values()) {
    console.log(k) // 1 4 2 5
}
// 集合的 entries() 方法返回一个迭代器，可以按照插入顺序产生包含两个元素的数组，这两个元素是集合中每个值的重复出现
for( k of set1.entries()) {
    console.log(k)
}
// [ 1, 1 ]
// [ 4, 4 ]
// [ 2, 2 ]
// [ 5, 5 ]