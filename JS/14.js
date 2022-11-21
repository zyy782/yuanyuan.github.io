// // 《你不知道的JavaScript（中）》学习草纸

// var sym = Symbol("sym");
// console.log(sym, "----", sym.toString());
// console.log(
//   "JSON.stringify(33) = ",
//   JSON.stringify(33),
//   typeof JSON.stringify(33)
// );
// var a = {
//   b: 42,
//   c: "42",
//   d: [1, 2, 3],
// };
// let res0 = JSON.stringify(a, ["b", "c"]); //第二个参数为要处理的对象属性名称
// console.log(res0); // {"b":42,"c":"42"}

// let res1 = JSON.stringify(a, function (key, value) {
//   if (key != "c") return value;
// });
// console.log(res1); // {"b":42,"d":[1,2,3]}

// let res2 = JSON.stringify(a, null, 3);
// console.log(res2);
// // {
// //     "b": 42,
// //     "c": "42",
// //     "d": [
// //        1,
// //        2,
// //        3
// //     ]
// //  }

// let res3 = JSON.stringify(a, null, "-----");
// console.log(res3);
// // {
// //     -----"b": 42,
// //     -----"c": "42",
// //     -----"d": [
// //     ----------1,
// //     ----------2,
// //     ----------3
// //     -----]
// // }

// // 假值对象
// // 所有对象都是真值,除了null;   所有字符串都是真值，除了""
// let a0 = new Boolean(false);
// let a1 = new Number(0);
// let a2 = new String("");
// console.log(Boolean(a0 && a1 && a2)); // true
// console.log(Boolean(false && 0 && "")); // false

// // -----------  类型转换  "+"  -----------
// let b0 = "22";
// let b1 = +b0;
// console.log(typeof b0, b0, typeof b1, b1); // string 22 number 22
// // let timestamp = new Date // 没有参数时可以省略括号
// // console.log(typeof(timestamp),timestamp) // object 2022-10-09T08:31:06.155Z
// let timestamp = +new Date();
// console.log(typeof timestamp, timestamp); // number 1665304334862

// let c0 = [1, 2];
// let c1 = [3, 4];
// console.log(c0 + c1); // 1,23,4
// // c0被解析为1,2   c1被解析为3,4    最终拼接为1,23,4
// console.log([] + {}); // [object Object]
// console.log({} + []);

// // -----------  类型转换  "-"  -----------
// let d0 = "3.14";
// let d1 = d0 - 0; // 效果等同于 d0 * 1 和 d0 / 1
// // let d1 = d0 * 1
// // let d1 = d0 / 1
// console.log(typeof d1, d1); //number 3.14
// let d2 = [3];
// let d3 = [1];
// console.log(d2 - d3); //  2

// console.log(NaN === NaN); // false
// console.log(NaN == NaN); // false
// console.log(+0 === -0); // true
// console.log(+0 == -0); // true

// var f = 1;
// console.log(f + f++ + ++f + f++ + ++f); // 13
// //          1 + 1   + 3   + 3   + 5

// function foo() {
//   try {
//     return 20
//   }
//   finally {
//     console.log("finally")
//   }
//   console.log("never runs")
// }
// console.log(foo())
// // finally
// // 20
// function foo() {
//   try {
//     // return 20
//     throw 20
//   }
//   finally {
//     console.log("finally")
//   }
//   console.log("never runs")
// }
// console.log(foo())
// // finally
// // throw 20


// var a = "hello world";
// var b = 10;
// switch(true) {
//   case !!(a||b == 10):
//     console.log('1111') //1111
//     break
//   default:
//     console.log('2222')
// }
// console.log(!!(a||b == 10),(a||b),a|| (b == 10))

// var text;
// switch (3) {
//   default:
//     text = "期待周末";
//     break;
//   case 6:
//     text = "今天是周六";
//     break;
//   case 0:
//     text = "今天是周日";
// }
// console.log(text) // 期待周末

// var x = "10"
// switch(true) {
//   case x == 10:
//     console.log('--1---');
//     // break;
//   case x == 42:
//     console.log('---2--') //---2--
//     // break;
//   default:
//     console.log('---3---')
// }
// --1---
// ---2--
// ---3---
// let someDate = new Date(Date.parse("May 22, 2020"))
// console.log(someDate)

// let ss = new Date(2000,0,0)
// console.log(ss)
// let a = new Date()
// console.log(a.getMonth())

let pattern = /\<\=/g
let str = "1<=2"
console.log(pattern.test(str)) //true


