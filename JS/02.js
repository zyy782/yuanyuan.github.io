function makeFunc() {
    var name = "Mozilla";

    function displayName() {
        console.log(name);
    }
    return displayName;
}
// 内部函数 displayName() 在执行前，从外部函数返回。
var myFunc = makeFunc();
console.log(myFunc) //[Function: displayName]
myFunc();

// Mozilla
/***
 * 闭包是由函数以及声明该函数的词法环境组合而成的。
 * 该环境包含了这个闭包创建时作用域内的任何局部变量。
 * 在本例子中，myFunc 是执行 makeFunc 时
 * 创建的 displayName 函数实例的引用。displayName 的实例
 * 维持了一个对它的词法环境（变量 name 存在于其中）的引用。
 * 因此，当 myFunc 被调用时，
 * 变量 name 仍然可用，其值 Mozilla 就被传递到console.log中。
 */




function makeAdder(x) {
    return function(y) {
        return x + y;
    };
}
// add5 和 add10 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。
// 在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10。
var add5 = makeAdder(5);
console.log(add5) //[Function (anonymous)]   也就是return function(y) return x + y;};
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12



function debounce(fn, delay) {
    let timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay);
    }
}
// this.debounce(this.handleScroll, 300)
console.log(debounce(this.handleScroll, 300)) //[Function (anonymous)]

let flag = true;

function throttle(fn, delay) {
    return function() {
        if (flag) {
            setTimeout(() => {
                fn.call(this);
                flag = true;
            }, delay)
        }
        flag = false;
    }
}