// // Symbol.hasInstance
// // 方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
// class Even {
//   static [Symbol.hasInstance](obj:Number) {
//     return Number(obj) % 2 === 0;
//   }
// }

// // 等同于
// const Even1 = {
//   [Symbol.hasInstance](obj:Number) {
//     return Number(obj) % 2 === 0;
//   }
// };

// 1 instanceof Even // false
// 2 instanceof Even // true
// 12345 instanceof Even // fals



// Symbol.isConcatSpreadable
// // 布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。
const symArr1 = [1, 2, 3]
const symArr2:any = [4, 5, 6]
console.log(symArr1.concat(symArr2))
symArr2[Symbol.isConcatSpreadable] = false
console.log(symArr1.concat(symArr2))












// Symbol.iterator
// // 方法，被for-of语句调用。返回对象的默认迭代器。

// Symbol.match
// // 方法，被String.prototype.match调用。正则表达式用来匹配字符串。

// Symbol.replace
// // 方法，被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

// Symbol.search
// 方法，被String.prototype.search调用。正则表达式返回被匹配部分在字符串中的索引。

// Symbol.species
// 函数值，为一个构造函数。用来创建派生对象。

// Symbol.split
// 方法，被String.prototype.split调用。正则表达式来用分割字符串。

// Symbol.toPrimitive
// 方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。

// Symbol.toStringTag
// 方法，被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。

// Symbol.unscopables
// 对象，它自己拥有的属性会被with作用域排除在外