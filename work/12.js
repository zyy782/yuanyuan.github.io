// // 将字符串 转换为 数组
// console.log(Array.from("Matt")); // [ 'M', 'a', 't', 't' ]

// const m = new Map().set(1, 2).set(3, 4); // Map(2) { 1 => 2, 3 => 4 }
// const s = new Set().add(1).add(2).add(3).add(4); // Set(4) { 1, 2, 3, 4 }
// // 将 映射 和 集合 转换为一个 新数组
// console.log(Array.from(m)); // [[1, 2], [3, 4]]
// console.log(Array.from(s)); // [1, 2, 3, 4]

// // Array.from()对现有数组执行 浅复制
// const a1 = [1, 2, 3, 4];
// const a2 = Array.from(a1);
// console.log(a2, a1 === a2); // [ 1, 2, 3, 4 ] false

// // 迭代对象转换为数组
// const iter = {
//   *[Symbol.iterator]() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//   },
// };
// console.log(Array.from(iter)); // [ 1, 2, 3, 4 ]

// // arguments对象转换为数组
// function func() {
//   return Array.from(arguments);
// }
// console.log(func(1, 2, 3)); // [ 1, 2, 3 ]

// // from()也能转换带有必要属性的 自定义对象
// const arrayLikeObject = {
//   0: 1,
//   1: 2,
//   2: 3,
//   3: 4,
//   length: 4,
// };
// console.log(Array.from(arrayLikeObject)); // [ 1, 2, 3, 4 ]

// // 第二个可选参数：映射函数
// const b1 = [1, 2, 3, 4];
// const b2 = Array.from(b1, (x) => x + 10);
// console.log(b2);
// // 第三个可选参数：用于指定映射函数中 this 的值。但这个重写的 this 值在箭头函数中不适用
// const b3 = Array.from(
//   b1,
//   function (x) {
//     return x * this.val;
//   },
//   { val: 3 }
// );
// console.log(b3); // [ 3, 6, 9, 12 ]

// console.log(Array.of(1,2,3,4)) // [ 1, 2, 3, 4 ]

// const arr = ['11','22','33']
// console.log(arr.keys(), '转换为数组：', Array.from(arr.keys()))
// console.log(arr.values(), '转换为数组：', Array.from(arr.values()))
// console.log(arr.entries(), '转换为数组：', Array.from(arr.entries()))
// // Object [Array Iterator] {} 转换为数组： [ 0, 1, 2 ]
// // Object [Array Iterator] {} 转换为数组： [ '11', '22', '33' ]
// // Object [Array Iterator] {} 转换为数组： [ [ 0, '11' ], [ 1, '22' ], [ 2, '33' ] ]

// // 用解构方法拆分键值对
// for(let [id,element] of arr.entries()) {
//     console.log(id, '--', element)
// }
// // 0 -- 11
// // 1 -- 22
// // 2 -- 33

// let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
// let res1 = numbers.every((item) => item > 2)
// console.log(res1) // false
// let res2 = numbers.some(item => item > 2)
// console.log(res2) // true
// let res3 = numbers.filter(item => item > 2)
// console.log(res3) // [ 3, 4, 5, 4, 3 ] 
// let res4 = numbers.map(item => item * 2)
// console.log(res4) //[ 2, 4, 6, 8, 10, 8, 6, 4, 2]
// numbers.forEach(item => {
//   console.log(item*2) // 2 4 6 8 10 8 6 4 2
// })

let nmu = [1,2,3,4,5]
let sum = nmu.reduce((prev,cur,index,arr)=>{
  console.log(prev,cur,index,arr);
  return prev + cur
},3)
console.log(sum) // 15
// 1 2 1 [ 1, 2, 3, 4, 5 ]
// 3 3 2 [ 1, 2, 3, 4, 5 ]
// 6 4 3 [ 1, 2, 3, 4, 5 ]
// 10 5 4 [ 1, 2, 3, 4, 5 ]
// 15