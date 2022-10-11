function tranferWeekday(day) {
    const map = {
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六',
      7: '星期日',
    }
  
    return map[day] ?? '不要开玩笑，没有这个日子哦~'
  }
let res = tranferWeekday(9)
console.log(res)


let n = 3;
(n == 1) && console.log(1);
(n == 2) && console.log(2);
(n == 3) && console.log(3);
( ! n ) && console.log("null");
// 如果读取对象内部的某个属性，往往需要判断一下，属性的上层对象是否存在
// name在第5层，所以要判断5次
let obj = {
    a: {
        b: {
            c: {
                name: 'ccc'
            }
        }
    }
}
// let objname = obj&&obj.a&&obj.a.b&&obj.a.b.c&&obj.a.b.c.name || 'defauleName';
let objname = obj?.a?.b?.c?.name
console.log(objname)

// let currentTopLevel = '3'
// function currentLevel() {
//     if (currentTopLevel === '1') {
//       return '白银会员';
//     } else if (currentTopLevel === '2') {
//       return '黄金会员';
//     } else if (currentTopLevel === '3') {
//       return '铂金会员';
//     } else if (currentTopLevel === '4') {
//       return '黑金会员';
//     } else if (currentTopLevel === '5') {
//       return '钻石会员';
//     } else {
//       return '黑钻会员';
//     }
//   }
//   console.log(currentLevel(3)) // 铂金会员
//   function newcurrentLevel(currentTopLevel) {
//     const map = {
//         '1': '白银会员',
//         '2':'黄金会员',
//         '3':'铂金会员',
//         '4':'黑金会员',
//         '5':'钻石会员',
//     }
//     return map[currentTopLevel] ?? '黑钻会员'
//   }
//   console.log(newcurrentLevel(6)) // 黑钻会员
console.log(0.1+0.2 === 0.3) // false
let a = (0.1+0.2).toFixed(1)
let b = 0.3
console.log(a==b) //true
console.log(a===b) //false
console.log(typeof a) //string
console.log(typeof b) //number
let c = parseFloat(a)
console.log(c === b) //true
/**
 * 简单来说：
 * == 代表相等， === 代表严格相等
 * 当进行双等号比较时候： 先检查两个操作数数据类型，
 * 如果相同， 则进行 === 比较， 如果不同， 则愿意为你进行一次类型转换，
 * 转换成相同类型后再进行比较
 * 
 * 而===比较时， 如果类型不同，直接就是false.
 */


var x1 = [1, 2, 3] // x1 是 [1, 2, 3] 的一个引用， 指向[1, 2, 3] 而不是持有[1, 2, 3]
var y1 = x1 // y1 是 [1, 2, 3] 的一个引用， 指向[1, 2, 3] 而不是持有[1, 2, 3]
y1.push(4)
console.log(x1) // [ 1, 2, 3, 4 ]
console.log(y1) // [ 1, 2, 3, 4 ]
y1 = [5, 6, 7] // y1 变为 [5, 6, 7] 的一个引用 ，指向 [5, 6, 7]  x1的指向不受影响
// 一个引用无法改变另一个引用的指向
console.log(y1) // [5, 6, 7]
console.log(x1)  // [ 1, 2, 3, 4 ]

console.log('-------')
function foo(x) {
    x.push(4)
    console.log(x) // [ 1, 2, 3, 4 ]
    x=[4,5,6] // 不影响 aa 的指向
    x.push(7)
    console.log(x)  // [ 4, 5, 6, 7 ]
}
var aa = [1,2,3]
foo(aa)
/**
 * 向函数foo传递 aa 的时候，实际是将 aa 的副本赋值给 x 
 * aa 依旧指向 [1,2,3]
 */
console.log(aa) // [ 1, 2, 3, 4 ]

function foo2(wrapper) {
    wrapper.a = 42
}
var obj2 = {
    a: 2
}
foo2(obj2)
console.log(obj2.a) //42


let testA = new Boolean( false )
console.log(testA)
// testA始终为 真
if (!testA) {
    console.log('+++++')
} else {
    console.log('----')
}
console.log(testA.valueOf()) // false
