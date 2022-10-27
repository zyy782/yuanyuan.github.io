// function makeFunc() {
//     var name = "Mozilla";

//     function displayName() {
//         console.log(name);
//     }
//     return displayName;
// }
// // 内部函数 displayName() 在执行前，从外部函数返回。
// var myFunc = makeFunc();
// console.log(myFunc) //[Function: displayName]
// myFunc();

// // Mozilla
// /***
//  * 闭包是由函数以及声明该函数的词法环境组合而成的。
//  * 该环境包含了这个闭包创建时作用域内的任何局部变量。
//  * 在本例子中，myFunc 是执行 makeFunc 时
//  * 创建的 displayName 函数实例的引用。displayName 的实例
//  * 维持了一个对它的词法环境（变量 name 存在于其中）的引用。
//  * 因此，当 myFunc 被调用时，
//  * 变量 name 仍然可用，其值 Mozilla 就被传递到console.log中。
//  */




// function makeAdder(x) {
//     return function(y) {
//         return x + y;
//     };
// }
// // add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。
// // 在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。
// var add5 = makeAdder(5);
// console.log(add5) //[Function (anonymous)]   也就是return function(y) return x + y;};
// var add10 = makeAdder(10);

// console.log(add5(2)); // 7
// console.log(add10(2)); // 12


// console.log("--------------")




// var data = [];

// for (var i = 0; i < 3; i++) {
//     data[i] = (function(i) {
//         return function() {
//             console.log(i);
//         }
//     })(i);
// }
// // for (let i = 0; i < data.length; i++) {
// //     console.log(data[i]())
// // }
// data[0](); //0
// data[1](); //1
// data[2](); //2


// (function () {
//     console.log('自执行函数');
// })();

// console.log('----借助闭包保存状态-----');
// for (var i = 0; i < 3; i++) {
//     setTimeout(function () {
//         console.log(i);  // 3 3 3
//         //在执行到这一行时，发现匿名函数里没有i，然后向往外部作用域找，然后找到的其实是for循环执行完了的i，也就是2++，3
//         // 参考事件循环机制
//     }, 1000);
// }

// for (var i = 0; i < 3; i++) {
//     (function (x) {
//         setTimeout(function () {
//             console.log(x);  // 0 1 2
//         }, 1000);
//     })(i)
//     //i传给了x，并且锁在内存中，所以不会变
// }

// function makeAdder(x) {
//     function add(y) {
//         return x + y;
//     }
//     return add;
// }
// // makeAdder( 1 ) 返回一个add() 的一个引用，它记忆了 x = 1 ，将这个引用赋值给 plusOne
// var plusOne = makeAdder( 1 )
// // 调用plusOne，并传入参数 3 ，此时 3 传给了 记忆了 x = 1 的 add() 的这个引用
// console.log(plusOne( 3 )) // 4

// var plusTen = makeAdder( 10 )

// console.log(plusOne( 6 )) // 7
// console.log(plusTen( 20 )) //30

// function User() {
//     var userName;
//     var passWord;
//     function doLogin(user,pw) {
//         userName = user;
//         passWord = pw;
//         // 形成一个在userName和passWord上的闭包
//         // console.log(user,pw)
//         console.log(userName,passWord)
//     }
//     // login是对内层函数doLogin的引用
//     var publicAPI = {
//         login: doLogin
//     }
//     return publicAPI;
// }
// var test = User();
// test.login('test','111111')

var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = function() {
        console.log(i);
    };
}

data[0](); //3
data[1](); //3
data[2](); //3