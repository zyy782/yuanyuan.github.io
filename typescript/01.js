var a = 6;
var a2 = 0xf00d;
console.log(a, a2);
var str = 'typescript';
// let num: number[] = [1, 2, 3, 4]
var num = [1, 2, 3, 4];
console.log(str, num[2]);
// 元组
var x;
x = ['num', 10];
console.log(x[1]);
// 枚举
var Color;
(function (Color) {
    Color[Color["Blue"] = 0] = "Blue";
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
var b = Color.Blue;
// 默认情况下，从0开始为元素编号
console.log(b, Color.Red, Color.Green); // 0 1 2
// 可手动改变编号数值
var Size;
(function (Size) {
    Size[Size["Small"] = 3] = "Small";
    Size[Size["Middle"] = 6] = "Middle";
    Size[Size["Large"] = 7] = "Large";
})(Size || (Size = {}));
console.log(Size.Small, Size.Middle, Size.Large); // 3 6 7
// 通过枚举的编号获取值
console.log(Size[7]); // Large
// Any
// 在编程阶段还不清楚类型的变量
var notSure = '888';
notSure = 888;
console.log(typeof notSure); // number
//void
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型
function test() {
    console.log('俺没有返回值');
}
test();
