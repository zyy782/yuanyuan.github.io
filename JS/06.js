var name = "ww";

(function() {
    console.log("bye" + name);
    if (typeof name === "undefined") {
        var name = "Jack"
        console.log("bye" + name) //byeJack
    } else {
        console.log("hello" + name)
    }
})()


var bo = 10;

(function() {
    console.log(bo);
})();


var a = [1, 2, 3];
var b = a.slice();
b.push(4);
console.log(b)